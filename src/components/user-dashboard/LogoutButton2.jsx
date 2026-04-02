"use client";
import React from "react";

import { FiUnlock } from "react-icons/fi";
import { signOut } from "next-auth/react";

//internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import { Button } from "@components/ui/button";

const LogoutButton2 = () => {
  return (
    <Button
      onClick={() => {
        signOut();
        Cookies.remove("couponInfo");
      }}
      type="submit"
      className=" text-center items-center  bg-red-400 mt-6 text-sm font-medium w-full hover:text-emerald-600"
    >
      Logout
    </Button>
  );
};

export default LogoutButton2;
