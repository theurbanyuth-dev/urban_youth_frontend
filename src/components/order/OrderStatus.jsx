"use client";

import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaUndo } from "react-icons/fa";

const steps = ["order_placed", "shipped", "delivered"];

export default function OrderStatus({ status }) {
  const getStepIndex = () => {
    if (status === "cancelled" || status === "returned") return 1;
    return steps.indexOf(status);
  };

  const currentStep = getStepIndex();

  const renderIcon = (step) => {
    if (step === "order_placed") return <FaBox />;
    if (step === "shipped") return <FaTruck />;
    if (step === "delivered") return <FaCheckCircle />;
  };

  const renderFinalIcon = () => {
    if (status === "cancelled" || status === "cancel") return <FaTimesCircle className="text-red-500" />;
    if (status === "returned") return <FaUndo className="text-yellow-500" />;
    return <FaCheckCircle className="text-green-500" />;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex items-center justify-between relative">
        
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300">
          <div
            className="h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center z-10">
            
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white
              ${
                index <= currentStep
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            >
              {renderIcon(step)}
            </div>

            <p className="text-sm mt-2 capitalize">{step === "order_placed" ? "Ordered" : step}</p>
          </div>
        ))}
      </div>

      {/* Final Status */}
      {(status === "cancelled" || status === "returned") && (
        <div className="flex items-center justify-center mt-4 gap-2">
          {renderFinalIcon()}
          <p className="capitalize text-sm font-medium">{status}</p>
        </div>
      )}
    </div>
  );
}