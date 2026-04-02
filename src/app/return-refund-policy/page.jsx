import React from "react";

//internal import

import PageHeader from "@components/header/PageHeader";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";

export const metadata = {
  title: "Return & Refund Policy |UrbanYouth",
  description:
    "Learn about our privacy practices and how we protect your information.",
  keywords: ["privacy", "policy", "data protection", "user rights"],
  openGraph: {
    title: "Privacy Policy |UrbanYouth",
    description:
      "Learn about our privacy practices and how we protect your information.",
    url: "https://kachabazar-store-nine.vercel.app/privacy-policy",
    images: [
      {
        url: "https://kachabazar-store-nine.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Privacy Policy Page",
      },
    ],
  },
};

const RefundPolicy = async () => {
  return (
    <div className="">
      <PageHeader title={"Return & Refund Policy"} />
      <div className="max-w-4xl mx-auto   py-6">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please read our policy carefully before making a purchase.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-xl font-semibold">1. No Return Policy</h2>
              <p className="text-gray-600 mt-2">
                We do{" "}
                <span className="font-semibold text-red-600">
                  not accept returns
                </span>{" "}
                on any products once they have been delivered. All sales are
                final.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-xl font-semibold">2. Refund Policy</h2>
              <p className="text-gray-600 mt-2">
                Refunds are only applicable if the request is made{" "}
                <span className="font-semibold">
                  before the order is dispatched
                </span>
                . Once dispatched, no refunds will be issued.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold">3. How to Request a Refund</h2>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Contact our support team with your order details.</li>
                <li>
                  Email: <span className="font-medium">theurbanyuth@gmail.com</span>
                </li>
                <li>
                  Phone/WhatsApp:{" "}
                  <span className="font-medium">+91 6376534562</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h2 className="text-xl font-semibold">4. Refund Processing</h2>
              <p className="text-gray-600 mt-2">
                Approved refunds will be processed within{" "}
                <span className="font-semibold">5–7 business days</span> and
                credited to your original payment method.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-xl font-semibold">5. Order Cancellation</h2>
              <p className="text-gray-600 mt-2">
                Orders can only be cancelled before dispatch. Once cancelled,
                the refund will be initiated as per the timeline.
              </p>
            </div>

            <div className="border-l-4 border-gray-700 pl-4">
              <h2 className="text-xl font-semibold">
                6. Non-Refundable Situations
              </h2>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Order already dispatched</li>
                <li>Customer refuses delivery</li>
                <li>Incorrect shipping address provided</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            Last updated: 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
