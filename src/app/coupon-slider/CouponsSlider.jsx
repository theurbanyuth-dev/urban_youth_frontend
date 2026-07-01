"use client";

import React from "react";
import offerLogo from "../../images/discountpng.png";
import Image from "next/image";

const CouponsSlider = ({ coupons = [], onApplyCoupon }) => {
  const formatDiscount = (discount) => {
    if (!discount) return "";

    if (discount.type === "percentage") {
      return `${discount.value}% OFF`;
    }
    return `₹${discount.value} OFF`;
  };

  const handleCoupon = (coupon) => {
    onApplyCoupon(null, coupon); // 👈 pass coupon directly
  };

  return (
    <div className="w-full">
      <h2 className="text-md ml-1 font-semibold mb-0">Available Coupons</h2>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {coupons?.map((coupon) => {
          const isFeatured = coupon.couponCode === "GLOW";

          return (
            <div
              key={coupon._id}
              className={`min-w-[260px] p-[2px] rounded-xl ${
                isFeatured
                  ? "bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500  "
                  : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full w-full bg-white rounded-xl shadow-sm p-3 flex gap-3 transition-transform duration-300 ${
                  isFeatured ? "  shadow-lg" : ""
                }`}
              >
                {/* Image */}
                <Image
                  src={offerLogo}
                  width={24}
                  height={40}
                  alt="offer"
                  className="h-6 rounded-lg"
                />

                {/* Content */}
                <div className="flex flex-col justify-between w-full relative">
                  {/* 🔥 Badge */}
                  {isFeatured && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">
                      BEST DEAL
                    </span>
                  )}

                  <div>
                    <h3 className="font-semibold text-sm">
                      {isFeatured
                        ? "COMBO OFFER"
                        : formatDiscount(coupon.discountType)}
                    </h3>

                    <p className="text-xs text-gray-500  ">
                      {isFeatured
                        ? "Get combo @999" 
                        : `Min order ₹${coupon.minimumAmount}`}
                    </p>

                    {/* <p
                      className={`text-xs -mt-2 font-medium ${
                        isFeatured ? "text-pink-600" : "text-gray-400"
                      }`}
                    >
                      Code: {coupon.couponCode}
                    </p> */}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCoupon(coupon)}
                    className={`mt-2 text-xs py-1.5 rounded-md transition ${
                      isFeatured
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                        : "bg-black text-white hover:opacity-90"
                    }`}
                  >
                    Apply Code
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CouponsSlider;
