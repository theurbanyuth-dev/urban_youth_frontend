"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
import Image from "next/image";

const MapSelector = dynamic(() => import("../Map/MapSelector"), {
  ssr: false,
});

const CheckoutForm = ({ shippingAddress }) => {
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [marker, setMarker] = useState(null);

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
    // track shipping cost according to payment method. If COD is selected then shipping cost will be 60 otherwise it will be 0
    if (showCard) {
      handleShippingCost(0);
    } else {
      handleShippingCost(40);
    }
  }, [showCard, handleShippingCost]);

  const checkout = storeCustomization?.checkout;

  if (!mounted) return null;

  return (
    <div className="pb-28 px-3 max-w-screen-xl mx-auto bg-[#e1e1e1] pt-4 relative">
      {/* 🛒 CART ITEMS (TOP) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6 ">
        <h2 className="text-lg font-semibold mb-2">Your Items</h2>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {items.map((item) => (
            <CartItem key={item.id} item={item} currency={currency} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {/* PERSONAL DETAILS */}
        <div className="bg-white p-4 rounded-2xl border">
          <h2 className="font-semibold mb-4">01. Details</h2>

          <div className="flex gap-3">
            <div className="w-1/2">
              <InputArea
                register={register}
                label="Full Name"
                name="firstName"
                autocomplete="name"
                required
              />
              <Error errorMessage={errors.firstName} />
            </div>

            <div className="w-1/2">
              <InputArea register={register} label="Phone" name="contact" />
              <Error errorMessage={errors.contact} />
            </div>
          </div>

          <div className="mt-3">
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

        {/* SHIPPING */}
        <div className="bg-white p-4 rounded-2xl border">
          <h2 className="font-semibold mb-4">02. Address</h2>

          <Button
            type="button"
            onClick={() => setShowMap(true)}
            className="w-full"
          >
            Select Location
          </Button>

          {selectedAddress && (
            <div className="mt-4 text-sm bg-gray-50 p-3 rounded-xl">
              <p>{selectedAddress.address}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.state}
              </p>
              <p>
                {selectedAddress.country} - {selectedAddress.zipCode}
              </p>

              <div className="mt-3">
                <InputArea
                  register={register}
                  label="House / Flat No."
                  name="houseNumber"
                  autocomplete="address"
                />
              </div>
            </div>
          )}
        </div>

        <input
          type="hidden"
          {...register("address", { required: "Address is required" })}
        />
        <Error errorMessage={errors.address} />

        {/* PAYMENT */}
        <div className="bg-white p-4 rounded-2xl border">
          <h2 className="font-semibold mb-4">03. Payment</h2>

          {/* {showCard && (
            <div className="mb-4 p-3 border rounded-lg bg-gray-50">
              <CardElement />
              <p className="text-red-400 text-sm mt-2">{error}</p>
            </div>
          )} */}

          <div className="grid grid-cols-2 gap-3">
            {storeSetting?.cod_status && (
              <InputPayment
                setShowCard={setShowCard}
                register={register}
                name="Cash"
                value="Cash"
                Icon={IoWalletSharp}
              />
            )}

            {storeSetting?.razorpay_status && ( // its written razorpay but will use for payu
              <div className="w-full relative">
                <InputPayment
                  setShowCard={setShowCard}
                  register={register}
                  name="PayU"
                  value="PayU"
                  Icon={ImCreditCard}
                />

                <p className="absolute -top-3 text-center text-gray-100 py-0.5 text-xs font-semibold bg-red-600 w-full rounded-t-lg">
                  Free shipping
                </p>
              </div>
            )}
          </div>
        </div>

        {/* coupon */}
        <div className=" ">
          <CouponsSlider coupons={coupons} onApplyCoupon={handleCouponCode} />
        </div>

        {/* <div className="grid grid-cols-6 gap-6 hidden">
          <h2 className="font-semibold mb-4">04. Shipping</h2>
          <div className="col-span-6 sm:col-span-3">
            <InputShipping
              currency={currency}
              register={register}
              handleShippingCost={handleShippingCost}
              name={showingTranslateValue(checkout?.shipping_name_two)}
              description={showingTranslateValue(checkout?.shipping_one_desc)}
              value={Number(checkout?.shipping_one_cost) || 60}
            />
            <Error errorMessage={errors.shippingOption} />
          </div>
        </div> */}

        {/* 💸 COUPON + TOTAL (BOTTOM) */}
        <div className="bg-white p-4 rounded-2xl border">
          <div className="flex gap-2">
            <Input ref={couponRef} placeholder="Coupon Code" />
            <Button onClick={handleCouponCode}>Apply</Button>
          </div>

          <div className="mt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal?.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {shippingCost === 0 ? (
                  <span className=" text-green-600">Free</span>
                ) : (
                  <span>₹{Math.floor(Number(shippingCost))}</span>
                )}
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{Math.floor(Number(discountAmount))}</span>
            </div>
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{Math.floor(Number(total))}</span>
          </div>
        </div>
      </form>

      {/* 🔥 FIXED PLACE ORDER BAR */}
      <div className="fixed bottom-[60px] left-0 w-full bg-white border-t p-4 flex justify-between items-center z-10">
        <div>
          <p className="text-sm text-gray-500">
            Total <del>₹{cartTotal?.toFixed(2)}</del>
          </p>
          <p className="font-bold text-lg -mt-4">
            ₹{Math.floor(Number(total))}
          </p>
        </div>

        <Button
          onClick={handleSubmit(submitHandler)}
          disabled={isEmpty || isCheckoutSubmit}
          className="h-12 px-6 rounded-md bg-[#905844] w-[60%]"
        >
          {isCheckoutSubmit ? "Processing..." : "Place Order"}
        </Button>
      </div>

      {/* MAP MODAL */}
      {showMap && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full h-[80%] rounded-t-3xl p-4">
            <div className="flex justify-between mb-3">
              <h3>Select Location</h3>
              <button onClick={() => setShowMap(false)}>✕</button>
            </div>

            <div className="w-full h-[60%] rounded-xl overflow-hidden">
              <MapSelector marker={marker} setMarker={setMarker} />
            </div>

            <Button
              className="w-full mt-4"
              onClick={async () => {
                if (!marker) return alert("Select location");

                const res = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${marker.lat}&lon=${marker.lng}`,
                );
                const data = await res.json();

                const mapLink = `https://www.google.com/maps?q=${marker.lat},${marker.lng}`;

                const addressData = {
                  address: data.display_name,
                  city: data.address?.city || data.address?.town || "",
                  state: data.address?.state || "",
                  country: data.address?.country || "",
                  zipCode: data.address?.postcode || "",
                  mapLink,
                };

                setSelectedAddress(addressData);

                setValue("address", addressData.address);
                setValue("city", addressData.city);
                setValue("state", addressData.state);
                setValue("country", addressData.country);
                setValue("zipCode", addressData.zipCode);
                setValue("mapLink", addressData.mapLink);

                setShowMap(false);
              }}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      )}

       
    </div>
  );
};

export default CheckoutForm;
