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

      <div className="bg-white/90 border border-gray-300 backdrop-blur-sm shadow-sm rounded-md overflow-hidden transition duration-500 hover:shadow-2xl hover:-translate-y-1 group">
        <div className="flex flex-row">
          {/* IMAGE SECTION */}
          <div className="w-[40%]   relative">
            {/* <Discount product={product} /> */}

            <Link
              href={`/product/${product?.slug}`}
              className="relative block w-full h-full overflow-hidden rounded-lg bg-gray-100"
            >
              <ImageWithFallback
                fill
                sizes="100%"
                alt="product"
                src={product.image?.[0]}
                className="object-cover rounded-[10px] transition duration-500  p-2"
              />
            </Link>

            {/* Quick View */}
            {/* <button
              aria-label="quick view"
              onClick={() => {
                handleModalOpen(!modalOpen, product._id);
                handleLogEvent(
                  "product",
                  `opened ${showingTranslateValue(product?.title)} product modal`,
                );
              }}
              className="absolute bottom-3 left-3 bg-white shadow-md text-gray-700 hover:text-emerald-500 hover:bg-gray-100 rounded-full px-3 py-2 text-xs flex items-center gap-1"
            >
              <IoExpand />
              <span className="hidden lg:block">Quick View</span>
            </button> */}
          </div>

          {/* CONTENT SECTION */}
          <div className="w-[60%] px-3 py-3 flex flex-col justify-between">
            <div>
              {/* PRODUCT NAME */}
              <Link
                href={`/product/${product?.slug}`}
                className="text-sm font-bold text-gray-800 capitalize leading-tight hover:text-emerald-500 line-clamp-2"
              >
                {showingTranslateValue(product?.title)}
              </Link>

              {/* RATING */}
              <div className="flex items-center mt-1">
                <Rating
                  size="md"
                  showReviews={true}
                  rating={product?.average_rating}
                  totalReviews={product?.total_reviews}
                />
              </div>

              {/* MICRO BENEFITS (optional placeholder) */}
              {/* <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>✔ Premium Quality</li>
                <li>✔ Fast Delivery</li>
                <li>✔ Best Seller</li>
              </ul> */}

              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {tags?.map((tag, index) => (
                  <li key={index}>✔ {tag}</li>
                ))}
              </ul>

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

            {/* CART BUTTON */}
            <div className="mt-4">
              {inCart(product._id) ? (
                <div>
                  {items.map(
                    (item) =>
                      item.id === product._id && (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-emerald-600 text-white rounded-xl px-4 py-2"
                        >
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <IoRemove className="text-lg" />
                          </button>

                          <span className="font-semibold">{item.quantity}</span>

                          <button
                            onClick={() =>
                              item?.variants?.length > 0
                                ? handleAddItem(item)
                                : handleIncreaseQuantity(item)
                            }
                            disabled={item.quantity >= 5}
                          >
                            <IoAdd className="text-lg" />
                          </button>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleAddItem(product)}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-emerald-600 hover:to-emerald-500 text-white px-6
                   py-2 rounded-xl font-semibold tracking-wide transition duration-300 shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <IoBagAdd className="text-lg" />
                  Add to Cart
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
