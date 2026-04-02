import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import CMSkeletonTwo from "@components/preloader/CMSkeleton";

const FooterTop = async ({ error, storeCustomizationSetting }) => {
  // console.log("storeCustomizationSetting", storeCustomizationSetting?.footer);

  const home = storeCustomizationSetting?.home;

  return (
    <div
      id="downloadApp"
       
    >
      
    </div>
  );
};

export default FooterTop;
