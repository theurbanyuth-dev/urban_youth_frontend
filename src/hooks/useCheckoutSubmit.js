import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { baseURL, handleResponse } from "@services/CommonService";

//internal import

import { UserContext } from "@context/UserContext";
import { getAllCoupons } from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import { addNotification } from "@services/NotificationServices";
import {
  addOrder,
  addRazorpayOrder,
  createOrderByPayU,
  createOrderByRazorPay,
  createPaymentIntent,
  sendEmailInvoiceToCustomer,
  verifyCartAtCheckOut,
} from "@services/OrderServices";
import { getUserSession } from "@lib/auth-client";
import { useSetting } from "@context/SettingContext";
import useUtilsFunction from "./useUtilsFunction";
import { addShippingAddress } from "@services/ServerActionServices";
import { getHeaders } from "@lib/auth-server";

const useCheckoutSubmit = ({ shippingAddress }) => {
  const { dispatch } = useContext(UserContext);

  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const { error: razorPayError, isLoading, Razorpay } = useRazorpay();
  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  const userInfo = getUserSession();
  const { globalSetting, storeSetting, storeCustomization } = useSetting();
  const { showDateFormat, showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "$";

  // console.log("storeSetting", storeSetting);

  // console.log("res", data);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
    setValue("email", userInfo?.email);
  }, [isCouponApplied]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0,
    );

    let totalValue = 0;
    const subTotal = parseFloat(cartTotal + Number(shippingCost)).toFixed(2);
    const discountAmount =
      discountPercentage?.type === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);

    const discountAmountTotal = discountAmount ? discountAmount : 0;

    totalValue = Number(subTotal) - discountAmountTotal;

    setDiscountAmount(Math.floor(discountAmountTotal));

    // console.log("total", totalValue);

    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  const submitHandler = async (data) => {
    try {
      setIsCheckoutSubmit(true);
      // before submit the order, check and verify amount, dscount, shipping cost with backend API
      const response = await verifyCartAtCheckOut({
        data: {
          items,
          total,
          couponCode: isCouponApplied ? couponInfo.couponCode : null,
          paymentMethod: data?.paymentMethod,
        },
      });

      if (response?.error) {
        // show errro to user
        notifyError("Please review your cart and try again.");
        setIsCheckoutSubmit(false);
        return;
      }

      setError("");

      const finalAddress = `${data.houseNumber ? data.houseNumber + ", " : ""} ${data.address} ${data.landmark ? ", " + data.landmark : ""} `;

      const userDetails = {
        name: `${data.firstName}${data.lastName ? " " + data.lastName : ""}`,
        contact: data.contact,
        email: data.email,
        address: finalAddress,
        mapLink: data.mapLink,
        country: data.country,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      };

      let orderInfo = {
        user_info: userDetails,
        shippingOption: data.shippingOption,
        paymentMethod: data.paymentMethod,
        status: "order_placed",
        cart: items,
        subTotal: cartTotal,
        shippingCost: shippingCost,
        discount: discountAmount,
        total: Math.floor(Number(total)),
        mobile: userDetails.contact,
        coupon: isCouponApplied ? couponInfo.couponCode : null,
      };

      await addShippingAddress({
        userId: userInfo?.id,
        shippingAddressData: {
          ...userDetails,
        },
      });

      // Handle payment based on method
      switch (data.paymentMethod) {
        case "Card":
          await handlePaymentWithStripe(orderInfo);
          break;

        case "RazorPay":
          await handlePaymentWithRazorpay(orderInfo);
          break;

        case "PayU":
          await handlePaymentWithPayU(orderInfo);
          break;

        case "Cash":
          await handleCashPayment(orderInfo);
          break;

        default:
          throw new Error("Invalid payment method selected");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || error?.message);
      setIsCheckoutSubmit(false);
    }
  };

  // console.log("globalSetting", globalSetting?.email_to_customer);

  const handleOrderSuccess = async (orderResponse, orderInfo) => { 

    try {
      router.push(`/order-success/${orderResponse?._id}`);
      // notifySuccess(
      //   "Your Order Confirmed! The invoice will be emailed to you shortly.",
      // );
      Cookies.remove("couponInfo");
      emptyCart();
      setIsCheckoutSubmit(false);
    } catch (err) {
      console.error("Order success handling error:", err.message);
      throw new Error(err.message);
    }
  };

  //handle cash payment
  // const handleCashPayment = async (orderInfo) => {
  //   try {
  //     const { orderResponse, error } = await addOrder(orderInfo);
  //     console.log("orderResponse", orderResponse, "error", error);
  //     if (error) {
  //       setIsCheckoutSubmit(false);
  //       return notifyError(error);
  //     }

  //     await handleOrderSuccess(orderResponse, orderInfo);
  //   } catch (err) {
  //     console.error("Cash payment error:", err.message);
  //     throw new Error(err.message);
  //   }
  // };
  const handleCashPayment = async (orderInfo) => {
    try {
      const { orderResponse, error } = await addOrder(orderInfo);

      if (error) {
        setIsCheckoutSubmit(false);
        return notifyError(error);
      }

      if (!orderResponse) {
        setIsCheckoutSubmit(false);
        return notifyError("Order response is empty!");
      }

      handleOrderSuccess(orderResponse, orderInfo);
    } catch (err) {
      setIsCheckoutSubmit(false);
      notifyError(err.message);
    }
  };

  //handle stripe payment
  const handlePaymentWithStripe = async (orderInfo) => {
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe is not initialized");
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error || !paymentMethod) {
        throw new Error(error?.message || "Stripe payment failed");
      }

      const order = {
        ...orderInfo,
        cardInfo: paymentMethod,
      };

      const { stripeInfo } = await createPaymentIntent(order);
      // console.log("res", stripeInfo, "order", order);
      stripe.confirmCardPayment(stripeInfo?.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log("stripeInfo", stripeInfo);

      const orderData = { ...orderInfo, cardInfo: stripeInfo };
      const { orderResponse, error: orderError } = await addOrder(orderData);
      if (orderError) {
        setIsCheckoutSubmit(false);
        return notifyError(orderError);
      }
      await handleOrderSuccess(orderResponse, orderInfo);
    } catch (err) {
      // Instead of just throwing the error, rethrow it so that it can be caught by the main submit handler
      throw new Error(err.message); // Ensure the error is propagated properly
    }
  };

  //handle razorpay payment
  const handlePaymentWithRazorpay = async (orderInfo) => {
    try {
      const { amount, id, currency } = await createOrderByRazorPay({
        amount: Math.round(total).toString(),
      });

      const options = {
        key: storeSetting?.razorpay_id,
        amount,
        currency,
        name: "UrbanYouth Skincare",
        description: "This is the total cost of your purchase",
        order_id: id,
        handler: async (response) => {
          const razorpayDetails = {
            amount: orderInfo.total,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const orderData = { ...orderInfo, razorpay: razorpayDetails, car };
          const { orderResponse, error } = await addRazorpayOrder(orderData);
          if (error) {
            setIsCheckoutSubmit(false);
            return notifyError(error);
          }
          await handleOrderSuccess(orderResponse, orderInfo);
        },
        prefill: {
          name: orderInfo?.user_info?.name || "Customer",
          email: orderInfo?.user_info?.email || "customer@example.com",
          contact: orderInfo?.user_info?.contact || "0000000000",
        },
        theme: { color: "#10b981" },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (err) {
      console.error("Razorpay payment error:", err.message);
      throw new Error(err.message);
    }
  };

  const handlePaymentWithPayU = async (orderInfo) => {
    try {
      const data = await createOrderByPayU({
        orderInfo: {
          amount: Math.floor(Number(total)),
          name: orderInfo.user_info.name,
          email: orderInfo.user_info.email,
          phone: orderInfo.user_info.contact,
          orderDetail: orderInfo,
        },
      });

      console.log("PayU Data:", data);

      if (!data || !data.key) {
        throw new Error("Invalid PayU response");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment"; // use test first

      // REQUIRED FIELDS ONLY
      const fields = [
        "key",
        "txnid",
        "amount",
        "productinfo",
        "firstname",
        "email",
        "phone",
        "surl",
        "furl",
        "hash",
        "udf1", // 🔥 MUST ADD
      ];

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = field;
        input.value = data[field] || "";
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("PayU Error:", err);
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(Number(value));
  };

  //handle default shipping address
  const handleDefaultShippingAddress = (value) => {
    // console.log("handle default shipping", value);
    setUseExistingAddress(value);
    if (value) {
      const address = shippingAddress;
      const nameParts = address?.name?.split(" "); // Split the name into parts
      const firstName = nameParts[0]; // First name is the first element
      const lastName =
        nameParts?.length > 1 ? nameParts[nameParts?.length - 1] : ""; // Last name is the last element, if it exists
      // console.log("address", address.name.split(" "), "value", value);

      setValue("firstName", firstName);
      setValue("lastName", lastName);

      setValue("address", address.address);
      setValue("contact", address.contact);
      setValue("email", address.email);
      setValue("city", address.city);
      setValue("country", address.country);
      setValue("zipCode", address.zipCode);
    } else {
      setValue("firstName");
      setValue("lastName");
      setValue("address");
      setValue("contact");
      // setValue("email");
      setValue("city");
      setValue("country");
      setValue("zipCode");
    }
  };
  const handleCouponCode = async (e, selectedCoupon = null) => {
    if (e) e.preventDefault();

    let couponToApply = selectedCoupon;

    // If user typed manually
    if (!couponToApply) {
      if (!couponRef.current.value) {
        notifyError("Please Input a Coupon Code!");
        return;
      }

      setIsCouponAvailable(true);

      try {
        const { coupons } = await getAllCoupons();

        const result = coupons.filter(
          (coupon) => coupon.couponCode === couponRef.current.value,
        );

        setIsCouponAvailable(false);

        if (result.length < 1) {
          notifyError("Please Input a Valid Coupon!");
          return;
        }

        couponToApply = result[0];
      } catch (error) {
        return notifyError(error.message);
      }
    }

    // ✅ Common validation (for both cases)
    if (dayjs().isAfter(dayjs(couponToApply?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (cartTotal + shippingCost < couponToApply?.minimumAmount) {
      notifyError(`Minimum ₹${couponToApply.minimumAmount} shopping required!`);
      return;
    }

    // ✅ Apply coupon
    notifySuccess(`Your Coupon ${couponToApply.couponCode} is Applied!`);
    setIsCouponApplied(true);
    setMinimumAmount(couponToApply?.minimumAmount);
    setDiscountPercentage(couponToApply.discountType);

    dispatch({ type: "SAVE_COUPON", payload: couponToApply });
    Cookies.set("couponInfo", JSON.stringify(couponToApply));
  };
  return {
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    items,
    setValue,
    cartTotal,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    isCouponApplied,
    useExistingAddress,
    isCouponAvailable,
    globalSetting,
    storeSetting,
    storeCustomization,
    showingTranslateValue,
    handleDefaultShippingAddress,
  };
};

export default useCheckoutSubmit;
