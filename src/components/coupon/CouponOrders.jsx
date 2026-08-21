"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const CouponOrders = () => {
  const [couponCode, setCouponCode] = useState("");
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      setError("Please enter a coupon code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrders([]);
      setSummary(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupon/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            couponCode: couponCode.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
      setSummary(data.summary || null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Coupon Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Search delivered orders using a coupon code.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <label
                htmlFor="couponCode"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Coupon Code
              </label>

              <input
                id="couponCode"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium uppercase text-gray-900 outline-none transition placeholder:normal-case placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <div className="sm:flex sm:items-end">
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-green-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Searching...
                  </span>
                ) : (
                  "Search Orders"
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Summary */}
        {summary && !loading && (
          <div className="mt-6 grid   gap-4  grid-cols-2">
            {/* Total Orders */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Delivered Orders
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {summary.totalOrders}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                  📦
                </div>
              </div>
            </div>

            {/* Total Sales */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Sales
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {formatCurrency(summary.totalSales)}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  ₹
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {orders.length > 0 && !loading && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Table Header */}
            <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Delivered Orders
                </h2>
                <p className="text-sm text-gray-500">
                  Orders using{" "}
                  <span className="font-semibold text-gray-800">
                    {couponCode.toUpperCase()}
                  </span>
                </p>
              </div>

              <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {orders.length} Orders
              </span>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Invoice
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Name
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Mobile
                    </th>

                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Total
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr
                      key={order.invoice || index}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {order.invoice || "-"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {order?.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {order?.contact}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        {formatCurrency(order.total)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-gray-100 md:hidden">
              {orders.map((order, index) => (
                <div
                  key={order.invoice || index}
                  className="p-5 transition hover:bg-gray-50"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Invoice
                      </p>
                      <p className="mt-1 font-bold text-gray-900">
                        {order.invoice || "-"}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Delivered
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Order Date</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Name</p>
                      <p className="mt-1 text-sm font-medium capitalize text-gray-800">
                        {order.name || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Mobile</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {order.contact}
                      </p>
                    </div>

                  

                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="mt-1 text-lg font-bold text-green-600">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && summary && orders.length === 0 && (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              📦
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No delivered orders found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              There are no delivered orders associated with this coupon code.
            </p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !summary && !error && (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl">
              🔎
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              Search by coupon code
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Enter a coupon code above to see all delivered orders that used
              that coupon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CouponOrders), {
  ssr: false,
});
