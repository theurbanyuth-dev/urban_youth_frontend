import { Suspense } from "react";

//internal import
import Banner from "@components/banner/Banner";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import FeatureCategory from "@components/category/FeatureCategory";
import { getShowingStoreProducts } from "@services/ProductServices";
import Link from "next/link";
import { getShowingAttributes } from "@services/AttributeServices";
import img1 from "../images/Neutral Simple Skincare Routine Infographic.png";
import { FaStar, FaRegStar, FaCheck } from "react-icons/fa";
import product1 from "../images/6.png";
import product2 from "../images/7.png";
import product3 from "../images/8.png";
import product4 from "../images/9.png";

import icon1 from "../images/11.png";
import icon2 from "../images/12.png";
import icon3 from "../images/13.png";
import icon4 from "../images/14.png";

import banner1 from "../images/1.png";
import banner2 from "../images/2.png";
import banner3 from "../images/3.png";
import banner4 from "../images/4.png";

import off1 from "../images/imgtext.png";
import offergif1 from "../images/offer/offergif1.gif";

import tag1 from "../images/tag1.png";

import ComboBanner from "@components/combo/ComboBanner";

import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import DiscountedCard from "@components/product/DiscountedCard";
import Image from "next/image";
import Combo from "@components/banner/Combo";

const Home = async () => {
  const { attributes } = await getShowingAttributes();
  const { storeCustomizationSetting, error: storeCustomizationError } =
    await getStoreCustomizationSetting();
  const { popularProducts, discountedProducts, error } =
    await getShowingStoreProducts({
      category: "",
      title: "",
    });

  const { globalSetting } = await getGlobalSetting();
  const currency = globalSetting?.default_currency || "₹";

  // console.log("storeCustomizationSetting", storeCustomizationSetting);

  const features = [
    {
      title: "Clinically Tested",
      bg: "bg-indigo-50 group-hover:bg-indigo-600",
      stroke: "stroke-indigo-600 group-hover:stroke-white",
      image: icon1,
    },
    {
      title: "AYUSH Approved",
      bg: "bg-green-50 group-hover:bg-green-600",
      stroke: "stroke-green-600 group-hover:stroke-white",
      image: icon2,
    },
    {
      title: "Toxin Free",
      bg: "bg-yellow-50 group-hover:bg-yellow-600",
      stroke: "stroke-yellow-600 group-hover:stroke-white",
      image: icon3,
    },
    {
      title: "Ethically Made",
      bg: "bg-red-50 group-hover:bg-red-600",
      stroke: "stroke-red-600 group-hover:stroke-white",
      image: icon4,
    },
  ];

  const videos = [
    { id: 2, src: "/video/2.mp4" },
    { id: 4, src: "/video/4.mp4" },
    { id: 6, src: "/video/6.mp4" },
    { id: 3, src: "/video/3.mp4" },
    { id: 1, src: "/video/7.mp4" },
    { id: 5, src: "/video/5.mp4" },
  ];

  return (
    <div className="min-h-screen  bg-[#fffaf0] relative  max-w-[590px] m-auto">
      {/* sticky cart section */}
      <StickyCart currency={currency} />

      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto  max-w-screen-2xl   sm:px-10">
          <div className="flex w-full">
            {/* Home page main carousel */}
            <div className="flex-shrink-0 xl:pr-6 lg:block w-full  ">
              <Suspense fallback={<p>Loading carousel...</p>}>
                <MainCarousel />
              </Suspense>
            </div>
            {/* Coupon Offer Card */}
            {/* <div className="w-full hidden lg:flex ">
              <Suspense fallback={<p>Loading coupons...</p>}>
                <OfferCard />
              </Suspense>
            </div> */}
          </div>

          {/* Banner */}
          <div className="bg-orange-100 p-4 lg:px-10 lg:py-6 rounded-lg mt-6 dark:bg-slate-600 hidden lg:block">
            <Banner storeCustomizationSetting={storeCustomizationSetting} />
          </div>
        </div>
      </div>

      <section className="py-8 pb-4">
        <div className="mx-auto max-w-7xl   sm:px-6 lg:px-8">
          <div className="flex  flex-row justify-around  gap-2 lg:justify-between px-2">
            {features.map((item, index) => (
              <div
                key={index}
                className="relative pt-10 rounded text-center max-md:max-w-sm max-md:mx-auto group bg-[#2d5f7b] pb-2 px-2 w-[95%]"
                // #833434
              >
                <div
                  className={`${item.bg} absolute -top-6 left-0 right-0 rounded-full border-[1px] border-gray-400 flex justify-center items-center mb-4 mx-auto cursor-pointer transition-all duration-500 w-14 h-14 `}
                >
                  <Image src={item.image} className="w-full" alt="icon" />
                </div>

                <h4 className="text-base font-bold text-gray-100 capitalize text-xs w-full">
                  {item.title.split(" ").map((word, index) => (
                    <span key={index}>
                      {word}
                      <br />
                    </span>
                  ))}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-2">
        <Image alt="offfer gif" src={offergif1} className="border"/>
      </div>

      <div className="px-2   mb-4 ">
        <Image
          src={off1}
          width={600}
          height={300}
          layout="responsive"
          alt="35% off"
        />
      </div>

      {/* videos */}
      <section className="w-full px-0 pr-2">
        <div className="overflow-x-auto no-scrollbar  py-2 rounded-md">
          <div className="flex gap-4 px-2 ">
            {videos.map((video) => (
              <div
                key={video.id}
                className="
            flex-shrink-0
            w-[35%]  
            sm:w-[40%]
            md:w-[25%]
            lg:w-[16%]
            aspect-[9/16]
            rounded-md
            overflow-hidden
            shadow-md
            bg-black
          "
              >
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComboBanner products={popularProducts || []} />

      {/* product card  */}
      <div className="flex">
        <div className="w-full">
          {error ? (
            <CMSkeletonTwo
              count={20}
              height={20}
              error={error}
              loading={false}
            />
          ) : (
            <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-3 px-2 mt-4">
              {popularProducts
                ?.filter((product) => product?.prices?.price !== 0)
                .slice(
                  0,
                  storeCustomizationSetting?.home
                    ?.latest_discount_product_limit,
                )
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    attributes={attributes}
                    currency={currency}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Image
          src={banner1}
          alt="banner"
          className="w-[95%] m-auto rounded-md mb-4 shadow"
        />
        <Image
          src={banner2}
          alt="banner"
          className="w-[95%] m-auto rounded-md mb-4 shadow"
        />
        <Image
          src={banner3}
          alt="banner"
          className="w-[95%] m-auto rounded-md mb-4 shadow"
        />
        <Image
          src={banner4}
          alt="banner"
          className="w-[95%] m-auto rounded-md mb-4 shadow"
        />
      </div>

      <Image
        src={img1}
        alt="Banner Image"
        width={1200}
        height={400}
        className="mt-4 px-2"
      />

      {/* Sticky Offer Image */}
      {/* <Combo /> */}
    </div>
  );
};

export default Home;
