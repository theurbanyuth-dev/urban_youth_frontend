"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";

//internal imports
import { getUserSession } from "@lib/auth-client";
import PagesDrawer from "@components/drawer/PagesDrawer";
import CartDrawer from "@components/drawer/CartDrawer";

const MobileFooter = ({ globalSetting, categories, categoryError }) => {
  const [openPageDrawer, setOpenPageDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const { totalItems } = useCart();
  const userInfo = getUserSession();

  const currency = globalSetting?.default_currency || "₹";
 

  return (
    <>
      <CartDrawer
        currency={currency}
        open={openCartDrawer}
        setOpen={setOpenCartDrawer}
      />

      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <PagesDrawer
          open={openPageDrawer}
          setOpen={setOpenPageDrawer}
          categories={categories}
          categoryError={categoryError}
        />
      </div>
      <footer className="sm:hidden fixed z-30 bottom-0 bg-white flex items-center justify-around border-t-[2px] border-gray-300  w-full py-2 px-6 sm:px-10">
        {/* More */}
        <button
          aria-label="More"
          onClick={() => setOpenPageDrawer(true)}
          className="flex flex-col items-center justify-center text-black"
        >
          <FiAlignLeft className="w-[20px] h-6 drop-shadow-xl" />
          <span className="text-xs mt-0.5">More</span>
        </button>

        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-black"
          rel="noreferrer"
          aria-label="Home"
        >
          <FiHome className="w-[20px] h-6 drop-shadow-xl" />
          <span className="text-xs mt-0.5">Home</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setOpenCartDrawer(!openCartDrawer)}
          className="flex flex-col items-center justify-center text-white relative"
          aria-label="Cart"
        >
          <div className="relative">
            <span className="absolute -top-2 -right-3 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-red-100 bg-red-500 rounded-full">
              {totalItems}
            </span>
            <FiShoppingCart className="w-[20px] h-6 drop-shadow-xl text-black" />
          </div>
          <span className="text-xs mt-0.5 text-black">Cart</span>
        </button>

        {/* Account */}
        <button
          aria-label="Account"
          type="button"
          className="flex flex-col items-center justify-center text-black"
        >
          {userInfo?.image ? (
            <Link href="/user/dashboard" className="flex flex-col items-center">
              <Image
                width={29}
                height={29}
                src={userInfo.image}
                alt="user"
                className="rounded-full text-black"
              />
              <span className="text-xs mt-0.5">Account</span>
            </Link>
          ) : userInfo?.name ? (
            <Link href="/user/dashboard" className="flex flex-col items-center">
              <span className="font-bold">{userInfo?.name[0]}</span>
              <span className="text-xs mt-0.5">Account</span>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex flex-col items-center">
              <FiUser className="w-[20px] h-6 drop-shadow-xl text-black" />
              <span className="text-xs mt-0.5">Account</span>
            </Link>
          )}
        </button>
      </footer>
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileFooter), { ssr: false });
