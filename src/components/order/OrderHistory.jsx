"use client";
import React from "react";
import dayjs from "dayjs";
import { useSetting } from "@context/SettingContext";
import Image from "next/image";

const OrderHistory = ({ order }) => {
  const { globalSetting } = useSetting();
  const currency = globalSetting?.default_currency || "$";

  const getStatusStyle = () => {
    const status = order.status?.toLowerCase();

    if (status === "delivered") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "cancel") return "bg-red-100 text-red-700";
    if (status === "processing") return "bg-blue-100 text-blue-700";
    if (status === "order_placed") return "bg-indigo-100 text-indigo-700";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900 text-sm tracking-wide">
            #{order?.invoice}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {dayjs(order.createdAt).format("MMM D, YYYY")}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyle()}`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>

      {/* Product Images */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex -space-x-3">
          {order?.cart?.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-gray-100"
            >
              <Image
                src={item.image[0]}
                alt={`Product ${index + 1}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {/* More Items Indicator */}
          {order?.cart?.length > 4 && (
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-200 text-xs font-semibold text-gray-700 border-2 border-white">
              +{order.cart.length - 4}
            </div>
          )}
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="font-bold text-gray-900 text-sm">
            {currency}
            {parseFloat(order?.total).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
        <span>
          {order.paymentMethod === "PayU"
            ? "💳 Paid Online"
            : "💵 Cash on Delivery"}
        </span>

        <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default OrderHistory;
