import Link from "next/link";
import Image from "next/image";
import { FiXCircle } from "react-icons/fi";

export const metadata = {
  title: "Payment Failed | UrbanYouth",
  description: "Payment failed. Please try again or return to checkout.",
};

const PaymentFail = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-3 sm:px-10">
      <div className="mx-auto max-w-screen-2xl flex flex-col items-center justify-center py-20 text-center">
        {/* Error Icon */}
        <div className="mb-8 p-4 bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
          <FiXCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-md leading-relaxed">
          Sorry, there was an issue processing your payment. Please try again or
          contact support if the problem persists.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/checkout"
            className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-emerald-600 hover:to-emerald-500 text-white px-8 py-4 rounded-md font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
          >
            Go to Checkout
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-900 px-8 py-4 rounded-md font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            Go to Home 
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Your cart is safe. You can retry payment anytime.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;
