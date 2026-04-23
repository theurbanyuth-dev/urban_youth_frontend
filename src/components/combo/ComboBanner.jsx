"use client";

import { useCart } from "react-use-cart";
import Image from "next/image";
import { useState } from "react";
import { notifySuccess, notifyError } from "@utils/toast";
import combobanner from "../../images/combo.png";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Link from "next/link";

const ComboBanner = ({ products }) => {
  const { addItem, items, updateItemQuantity } = useCart();
  const { showingTranslateValue } = useUtilsFunction();

  const [loading, setLoading] = useState(false);

  const handleComboAdd = async () => {
    setLoading(true);
    let addedCount = 0;
    let errorCount = 0;
    for (const p of products) {
      const { variants, categories, description, slug, ...updatedProduct } = p;

      const formattedProduct = {
        ...updatedProduct,
        id: p._id,
        title: showingTranslateValue(p.title),
        image: p.image,
        price: p.prices?.price,
        originalPrice: p.prices?.originalPrice || p.prices?.price,
      };

      const existingItem = items.find((i) => i.id === formattedProduct.id);

      const stock = p.stock || 999;
      const newQuantity = (existingItem?.quantity || 0) + 1;
 
      const isFreebie = formattedProduct.price === 0;

      // 👉 FREEBIE LOGIC
      if (isFreebie) {
        if (!existingItem) {
          addItem(formattedProduct, 1);
          addedCount++;
        }
        // ❌ do nothing if already exists (prevents quantity increase)
        continue;
      }

      // 👉 NORMAL PRODUCT LOGIC
      if (newQuantity <= stock) {
        if (existingItem) {
          updateItemQuantity(formattedProduct.id, newQuantity);
        } else {
          addItem(formattedProduct, 1);
        } 
        addedCount++;
      } else {
        errorCount++;
        notifyError(`${formattedProduct.title} - Insufficient stock!`);
      }
    }
    setLoading(false);
    if (addedCount > 0) {
      notifySuccess(
        `${addedCount} popular products added to cart! (save ₹200)${errorCount > 0 ? ` (${errorCount} stock issues)` : ""}`,
      );
    }
  };

  return (
    <div className="relative m-auto max-w-screen-2xl   px-2 py-2     shadow-lg bg-[#bbdce0]">
      <div className="bg-white rounded-md flex flex-col justify-center items-center">
        <Link href="/combo">
          <Image
            src={combobanner}
            alt="banner1"
            className="m-auto rounded-t-md md:hidden"
          />
        </Link>

        <Link href="/combo">
          <Image
            src={require("../../images/pc4.png")}
            alt="banner1"
            className="rounded-t-md m-auto w-[80%] shadow-lg border border-gray-500 hidden md:block"
          />
        </Link>

        <button
          onClick={handleComboAdd}
          disabled={loading}
          className={`rounded-b-md w-full md:w-[80%] m-auto bg-gradient-to-r from-gray-900 to-gray-800 
        hover:from-emerald-600 hover:to-emerald-500
        text-white px-8 py-4 font-semibold tracking-wide transition duration-300 
        shadow-lg hover:shadow-2xl active:scale-95 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        >
          {loading ? "Adding to cart..." : "Add to cart & Save More"}
        </button>
      </div>
    </div>
  );
};

export default ComboBanner;
