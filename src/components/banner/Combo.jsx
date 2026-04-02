"use client"

import { useState } from "react";

export default function Combo() {
   
  return (
    <div className="  z-50 relative">
      <button
        // onClick={() => setShowOffer(false)}
        className="absolute -top-3 -left-3 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md hover:bg-red-600"
      >
        ×
      </button>

      <img
        src="/offer1.png"
        alt="Special Offer"
        className="w-28 md:w-36 lg:w-40 cursor-pointer hover:scale-105 transition-transform duration-300 rounded-l-lg shadow-lg"
      />
    </div>
  );
}