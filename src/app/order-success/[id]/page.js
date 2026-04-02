"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import gif1 from "../../../images/successgif.gif";
import Image from "next/image";
import { useCart } from "react-use-cart";
import Cookies from "js-cookie";

export default function OrderSuccessPage({ params }) {
  const router = useRouter();

  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  // ✅ unwrap params (NEW WAY)
  const { id } = use(params);

  useEffect(() => {
    emptyCart();
    Cookies.remove("couponInfo");

    const timer = setTimeout(() => {
      router.push(`/order/${id}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id, router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white">
      <Image src={gif1} alt="success" className="w-20 h-20 mb-6" />

      <h1 className="text-2xl font-semibold text-green-600">Order Placed</h1>

      <p className="text-gray-500 mt-2">Redirecting to your order...</p>
    </div>
  );
}
