"use client";

import React, { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { IoWalletSharp } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

import Label from "@components/form/Label";
import Error from "@components/form/Error";
import CartItem from "@components/cart/CartItem";
import InputArea from "@components/form/InputArea";
import InputPayment from "@components/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import { useCart } from "react-use-cart";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import InputShipping from "@components/form/InputShipping";
import CouponsSlider from "@app/coupon-slider/CouponsSlider";
import { getShowingCoupons } from "@services/CouponServices";
import { getGlobalSetting } from "@services/SettingServices";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const requiredTrim = (fieldName) => ({
  required: `${fieldName} is required`,
  validate: (value) =>
    value?.trim()?.length > 0 || `${fieldName} cannot be blank`,
});

const CheckoutForm = ({ shippingAddress }) => {
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    error,
    stripe,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    register,
    errors,
    showCard,
    setShowCard,
    handleSubmit,
    submitHandler,
    handleCouponCode,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    storeSetting,
    storeCustomization,
    handleShippingCost,
    showingTranslateValue,
    setValue,
  } = useCheckoutSubmit({ shippingAddress });

  const { removeItem, totalItems, cartItems } = useCart();

  const [globalSetting, setGlobalSetting] = useState(null);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const gs = await getGlobalSetting();
      const cp = await getShowingCoupons();

      setGlobalSetting(gs?.globalSetting || null);
      setCoupons(cp?.coupons || []);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (items.length < 5) {
      const zeroPriceItems = items.filter((item) => item.price === 0);
      zeroPriceItems.forEach((item) => {
        removeItem(item.id);
      });
    }
  }, [totalItems, items, removeItem]);

  useEffect(() => {
    if (showCard) {
      handleShippingCost(0);
    } else {
      handleShippingCost(40);
    }
  }, [showCard, handleShippingCost]);

  const checkout = storeCustomization?.checkout;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f6f1ec] pb-32">
      <div className="max-w-6xl mx-auto px-2 sm:px-5 pt-5">
        {/* Header */}
        <div className="mb-5 rounded-xl bg-gradient-to-r from-[#2b1d18] via-[#5d382d] to-[#9b6a55] p-5 sm:p-7 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">
            Secure Checkout
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
            Complete Your Order
          </h1>
          {/* <p className="mt-2 text-sm text-white/75 max-w-xl">
            Enter your details carefully for smooth and fast delivery.
          </p> */}
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Section */}
            <div className="lg:col-span-7 space-y-5">
              {/* Personal Details */}
              <div className="bg-white rounded-xl border border-[#eaded6] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f0e6df] flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#905844]/10 text-[#905844] flex items-center justify-center font-bold">
                    01
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Personal Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      Basic details for order confirmation
                    </p>
                  </div>
                </div>

                <div className="p-3">
                  <div className="grid  grid-cols-2 gap-4">
                    <div>
                      <InputArea
                        register={register}
                        label="Full Name"
                        name="firstName"
                        autocomplete="name"
                        required
                      />
                      <Error errorMessage={errors.firstName} />
                    </div>

                    <div>
                      <InputArea
                        register={register}
                        label="Phone"
                        name="contact"
                      />
                      <Error errorMessage={errors.contact} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <InputArea
                      register={register}
                      label="Email"
                      name="email"
                      autocomplete="email"
                      type="email"
                    />
                    <Error errorMessage={errors.email} />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-xl border border-[#eaded6] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f0e6df] flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#905844]/10 text-[#905844] flex items-center justify-center font-bold">
                    02
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-gray-500">
                      Add your complete delivery address
                    </p>
                  </div>
                </div>

                <div className="p-3 space-y-4">
                  <div>
                    <textarea
                      rows={2}
                      placeholder="House no, street, landmark, area"
                      {...register("address", requiredTrim("Address"))}
                      className="w-full rounded-lg border border-[#ded2c9] bg-[#fffdfb] px-4 py-2 text-sm outline-none transition focus:border-[#905844] focus:ring-4 focus:ring-[#905844]/10 resize-none"
                    />
                    <Error errorMessage={errors.address} />
                  </div>

                  <div className="grid  grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter city"
                        {...register("city", requiredTrim("City"))}
                        className="w-full rounded-lg border border-[#ded2c9] bg-[#fffdfb] px-4 py-2 text-sm outline-none transition focus:border-[#905844] focus:ring-4 focus:ring-[#905844]/10"
                      />
                      <Error errorMessage={errors.city} />
                    </div>

                    <div>
                      <select
                        defaultValue=""
                        {...register("state", {
                          required: "State is required",
                          validate: (value) =>
                            indianStates.includes(value) ||
                            "Please select a valid Indian state",
                        })}
                        className="w-full rounded-lg border border-[#ded2c9] bg-[#fffdfb] px-4 py-2 text-sm outline-none transition focus:border-[#905844] focus:ring-4 focus:ring-[#905844]/10"
                      >
                        <option value="" disabled>
                          Select state
                        </option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <Error errorMessage={errors.state} />
                    </div>
                  </div>

                  <div className="grid  grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value="India"
                        readOnly
                        {...register("country", {
                          required: "Country is required",
                          validate: (value) =>
                            value === "India" || "Country must be India",
                        })}
                        className="w-full rounded-lg border border-[#e5ded8] bg-gray-100 px-4 py-2 text-sm text-gray-600 cursor-not-allowed"
                      />
                      <Error errorMessage={errors.country} />
                    </div>

                    <div>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Pincode"
                        {...register("zipCode", {
                          required: "Pincode is required",
                          validate: {
                            notBlank: (value) =>
                              value?.trim()?.length > 0 ||
                              "Pincode cannot be blank",
                            sixDigit: (value) =>
                              /^[1-9][0-9]{5}$/.test(value?.trim()) ||
                              "Enter a valid 6 digit Indian pincode",
                          },
                        })}
                        className="w-full rounded-lg border border-[#ded2c9] bg-[#fffdfb] px-4 py-2 text-sm outline-none transition focus:border-[#905844] focus:ring-4 focus:ring-[#905844]/10"
                      />
                      <Error errorMessage={errors.zipCode} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl border border-[#eaded6] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f0e6df] flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#905844]/10 text-[#905844] flex items-center justify-center font-bold">
                    03
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-xs text-gray-500">
                      Choose your preferred payment option
                    </p>
                  </div>
                </div>

                <div className="p-3">
                  <div className="grid  grid-cols-2 gap-2">
                    {storeSetting?.cod_status && (
                      <div className="rounded-xl   bg-[#fffdfb] p-1">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name="Cash"
                          value="Cash"
                          Icon={IoWalletSharp}
                        />
                      </div>
                    )}

                    {storeSetting?.razorpay_status && (
                      <div className="w-full relative rounded-xl   bg-[#fffdfb] p-1">
                        <p className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 text-[11px] font-semibold bg-green-600 text-white rounded-full shadow-sm z-10">
                          Free shipping
                        </p>

                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name="PayU"
                          value="PayU"
                          Icon={ImCreditCard}
                        />
                      </div>
                    )}
                  </div>

                  {/* {showCard && (
                    <div className="mt-4 p-4 border border-[#eaded6] rounded-xl bg-[#fffdfb]">
                      <CardElement />
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Coupons */}
              <div className="bg-white rounded-xl border border-[#eaded6] shadow-sm p-4">
                <CouponsSlider
                  coupons={coupons}
                  onApplyCoupon={handleCouponCode}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-5 space-y-5">
              {/* Cart Items */}
              <div className="bg-white rounded-3xl border border-[#eaded6] shadow-sm overflow-hidden lg:sticky lg:top-5">
                <div className="px-5 py-4 border-b border-[#f0e6df]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Your Items
                      </h2>
                      <p className="text-xs text-gray-500">
                        {totalItems} item{totalItems > 1 ? "s" : ""} in your
                        cart
                      </p>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-[#905844]/10 flex items-center justify-center text-[#905844] font-bold">
                      {totalItems}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} currency={currency} />
                    ))}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="px-4 pb-4">
                  <div className="rounded-xl bg-[#f8f3ef] border border-[#eaded6] p-3">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      Have a coupon?
                    </p>
                    <div className="flex gap-2">
                      <Input
                        ref={couponRef}
                        placeholder="Coupon Code"
                        className="rounded-xl bg-white border-[#ded2c9]"
                      />
                      <Button
                        type="button"
                        onClick={handleCouponCode}
                        className="rounded-xl bg-[#905844] hover:bg-[#7d4c3b] text-white px-5"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="px-5 py-4 border-t border-[#f0e6df] bg-[#fffdfb]">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Order Summary
                  </h3>

                  <div className="text-sm space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ₹{cartTotal?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <span className="text-gray-900">
                            ₹{Math.floor(Number(shippingCost))}
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">
                        -₹{Math.floor(Number(discountAmount))}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#eaded6] mt-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#905844]">
                      ₹{Math.floor(Number(total))}
                    </span>
                  </div>

                  <Button
                    onClick={handleSubmit(submitHandler)}
                    disabled={isEmpty || isCheckoutSubmit}
                    className="hidden lg:flex mt-5 h-13 w-full rounded-xl bg-[#905844] hover:bg-[#7d4c3b] text-white font-semibold shadow-md"
                  >
                    {isCheckoutSubmit ? "Processing..." : "Place Order"}
                  </Button>

                  <p className="hidden lg:block text-center text-xs text-gray-500 mt-3">
                    Safe checkout. Fast delivery. Trusted skincare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-[60px] left-0 w-full bg-white/95 backdrop-blur border-t border-[#eaded6] p-4 flex justify-between items-center z-10 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div>
          <p className="text-xs text-gray-500">
            Total <del className="text-gray-400">₹{cartTotal?.toFixed(2)}</del>
          </p>
          <p className="font-bold text-xl text-[#905844] leading-tight">
            ₹{Math.floor(Number(total))}
          </p>
        </div>

        <Button
          onClick={handleSubmit(submitHandler)}
          disabled={isEmpty || isCheckoutSubmit}
          className="h-12 px-6 rounded-xl bg-[#905844] hover:bg-[#7d4c3b] w-[60%] text-white font-semibold shadow-md"
        >
          {isCheckoutSubmit ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
