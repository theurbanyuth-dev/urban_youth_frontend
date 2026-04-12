import dayjs from "dayjs";
import React from "react";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import Link from "next/link";
import OrderStatus from "@components/order/OrderStatus";

const OrderTable = ({ data, currency }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0 hover:bg-gray-50 transition rounded-md px-2">
      {/* Product Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
        <ImageWithFallback
          img
          width={64}
          height={64}
          src={data.image[0] || ""}
          alt={data.title}
          className="object-cover w-full h-full p-0"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${data.slug}`}
          className="text-sm font-semibold text-gray-800 hover:text-indigo-600 line-clamp-1"
        >
          {data.title}
        </Link>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{data.price}</span>
          <span>Qty: {data.quantity}</span>
        </div>

        <p className="text-sm font-semibold text-gray-900 mt-1">
          Total: ₹{(Number(data.price) * Number(data.quantity)).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Invoice = ({ data, printRef, globalSetting }) => {
  const currency = globalSetting?.default_currency || "₹";
  const { getNumberTwo } = useUtilsFunction();

  const statusColor = {
    delivered: "bg-green-100 text-green-700",
    order_placed: "bg-green-100 text-green-700",
    "POS-Completed": "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancel: "bg-red-100 text-red-700",
    processing: "bg-blue-100 text-blue-700",
    deleted: "bg-red-200 text-red-800",
  };

  return ( 
    <div
      ref={printRef}
      className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border"
    >
      <OrderStatus status={data?.status} /> 
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">🧾 Invoice</h1>
            <p className="text-sm opacity-90 mt-1">Order Details Overview</p>
          </div>

          <div className="text-right text-sm">
            <p>
              <span className="opacity-80">Invoice:</span>{" "}
              <span className="font-semibold">{data?.invoice || "N/A"}</span>
            </p>
            <p>
              <span className="opacity-80">Date:</span>{" "}
              <span className="font-semibold">
                {data?.createdAt &&
                  dayjs(data?.createdAt).format("MMM D, YYYY")}
              </span>
            </p>
          </div>
        </div>
 
        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 text-xs font-semibold rounded-full uppercase ${
              statusColor[data?.status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {data?.status || "Unknown"}
          </span>
        </div>
      </div> */}

      {/* Products */}
      <div className="p-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1 ml-2">
          🛒 Order Items
        </h2>

        <div className="space-y-2">
          {data?.cart?.map((item, i) => (
            <OrderTable key={i} data={item} currency={currency} />
          ))}
        </div>
      </div>

      {/* Customer Info */}
      <div className="px-4 pb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          🚚 Delivery Details
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 border text-sm  ">
          <p className="font-semibold text-gray-800">
            👤 {data?.user_info?.name}
          </p>
          <p className="-mt-2">📞 {data?.user_info?.contact}</p>
          <p className="-mt-2">📧 {data?.user_info?.email}</p>
          <p className="leading-relaxed">
            🏠 {data?.user_info?.address}, {data?.city}, {data?.country}{" "}
            {data?.zipCode}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 border-t p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          💳 Payment Summary
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {currency} {getNumberTwo(data?.subTotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {currency} {getNumberTwo(data?.shippingCost)}
            </span>
          </div>

          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>
              - {currency} {getNumberTwo(data?.discount)}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>
              {currency} {getNumberTwo(data?.total)}
            </span>
          </div>

          {/* Payment Method */}
          <div className="mt-4 p-3 border rounded-md bg-white">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-800">
                {data?.paymentMethod === "PayU"
                  ? "💳 Online Payment"
                  : "💵 Cash on Delivery"}
              </span>
            </div>

            {/* Show Transaction ID only for Online Payment */}
            {data?.paymentMethod === "PayU" && (
              <>
                <hr className="my-2" />
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Trnx. Id</span>
                  <span>{data?.transactionId || "N/A"}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
