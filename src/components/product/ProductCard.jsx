"use client";

import { useEffect, useRef, useState } from "react";
import { IoAdd, IoRemove, IoExpand, IoBagAdd } from "react-icons/io5";
import { useCart } from "react-use-cart";
import { Expand } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

//internal import
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError } from "@utils/toast";
import Rating from "@components/common/Rating";
import useAddToCart from "@hooks/useAddToCart";
import { useSetting } from "@context/SettingContext";
import Discount from "@components/common/Discount";
import { handleLogEvent } from "src/lib/analytics";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";

const ProductCard = ({ product, attributes }) => {
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { globalSetting } = useSetting();

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "$";

  const tags = JSON.parse(product?.tag[0] || "[]");

  // console.log('attributes in product cart',attributes)

  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Insufficient stock!");

    if (p?.variants?.length > 0) {
      setModalOpen(!modalOpen);
      return;
    }
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      title: showingTranslateValue(p?.title),
      id: p._id,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
    };
    addItem(newItem);
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setModalOpen]);

  return (
    <>
      {modalOpen && (
        <ProductModal
          product={product}
          modalOpen={modalOpen}
          attributes={attributes}
          globalSetting={globalSetting}
          setModalOpen={setModalOpen}
        />
      )}

      <div className="group border border-gray-700  rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        <div className="flex">
          {/* IMAGE */}
          <div className="w-[42%] relative bg-gray-50">
            <Link href={`/product/${product?.slug}`} className="block h-full">
              <ImageWithFallback
                fill
                src={product.image?.[0]}
                alt="product"
                className="object-cover  transition duration-500 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* CONTENT */}
          <div className="w-[58%] px-4 py-4 flex flex-col justify-between">
            <div>
              {/* TITLE */}
              <Link
                href={`/product/${product?.slug}`}
                className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-emerald-600 transition"
              >
                {showingTranslateValue(product?.title)}
              </Link>

              {/* RATING */}
              <div className="mt-1 opacity-80">
                <Rating
                  size="sm"
                  showReviews={true}
                  rating={product?.average_rating}
                  totalReviews={product?.total_reviews}
                />
              </div>

              {/* TAGS */}
              <div className="mt-2 flex flex-wrap gap-1">
                {tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-[2px] bg-white text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* PRICE */}
              <div className="mt-3">
                <Price
                  card
                  product={product}
                  currency={currency}
                  price={
                    product?.isCombination
                      ? product?.variants[0]?.price
                      : product?.prices?.price
                  }
                  originalPrice={
                    product?.isCombination
                      ? product?.variants[0]?.originalPrice
                      : product?.prices?.originalPrice
                  }
                />
              </div>
            </div> 

            {/* BUTTON */}
            <div className="mt-4">
              {inCart(product._id) ? (
                items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-900 text-white rounded-lg px-3 py-1.5"
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <IoRemove />
                        </button>

                        <span className="text-sm">{item.quantity}</span>

                        <button
                          onClick={() =>
                            item?.variants?.length > 0
                              ? handleAddItem(item)
                              : handleIncreaseQuantity(item)
                          }
                          disabled={item.quantity >= 5}
                        >
                          <IoAdd />
                        </button>
                      </div>
                    ),
                )
              ) : (
                <button
                  onClick={() => handleAddItem(product)}
                  className="w-full text-sm bg-gray-900 hover:bg-emerald-600 text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <IoBagAdd />
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
