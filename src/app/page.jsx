import { Suspense } from "react";

//internal import
import Banner from "@components/banner/Banner";
import StickyCart from "@components/cart/StickyCart";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import { getShowingStoreProducts } from "@services/ProductServices";
import { getShowingAttributes } from "@services/AttributeServices";
import img1 from "../images/Neutral Simple Skincare Routine Infographic.png";

import icon1 from "../images/11.png";
import icon2 from "../images/12.png";
import icon3 from "../images/13.png";
import icon4 from "../images/14.png";

import banner1 from "../images/1.png";
import banner2 from "../images/2.png";
import banner3 from "../images/3.png";
import banner4 from "../images/4.png";

import deskp1 from "../images/dskp1.png";
import deskp2 from "../images/dskp2.png";
import deskp3 from "../images/dskp3.png";
import deskp4 from "../images/dskp4.png";

import img4 from "../images/image2.png";

import ComboBanner from "@components/combo/ComboBanner";
import bannernew1 from "../images/bannernew1.png";
import bannernew2 from "../images/bannernew2.png";
import trustimg from "../images/trust.png";
import productheading from "../images/skin.png";

const desktopProductImages = [
  { id: 1, image: deskp1 },
  { id: 2, image: deskp2 },
  { id: 3, image: deskp3 },
  { id: 4, image: deskp4 },
];

import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import Image from "next/image";

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

  const products = [
    {
      id: 1,
      image: require("../images/sunscreen-product-img.png"),
      name: "Sunscreen",
    },
    {
      id: 2,
      image: require("../images/facewash-product-img.png"),
      name: "Facewash",
    },
    {
      id: 3,
      image: require("../images/serum-product-img.png"),
      name: "Serum",
    },
    {
      id: 4,
      image: require("../images/moisturizer-product-img.png"),
      name: "Moisturizer",
    },
  ];

  const videos = [
    { id: 2, src: "/video/2.mp4", title: "Facewash" },
    { id: 4, src: "/video/4.mp4", title: "Serum" },
    { id: 6, src: "/video/6.mp4", title: "Moisturizer" },
    { id: 3, src: "/video/3.mp4", title: "Sunscreen" },
  ];

  return (
    <div className="min-h-screen  relative  max-w-4xl  m-auto">
      {/* sticky cart section */}
      <StickyCart currency={currency} />

      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto  max-w-screen-2xl   ">
          <div className="flex w-full">
            {/* Home page main carousel */}
            <div className="    w-full  ">
              <Suspense fallback={<p>Loading carousel...</p>}>
                {/* <MainCarousel /> */}
                <div className="relative w-full h-[70vh] md:hidden">
                  <Image
                    alt="banner"
                    src={bannernew1}
                    className="object-cover h-[100%]"
                  />
                </div>
                <div className="relative w-full h-[40vh] hidden md:block">
                  <Image
                    alt="banner"
                    src={bannernew2}
                    className="object-cover h-[100%] w-full"
                  />
                </div>
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
          {/* <div className="bg-orange-100 p-4 lg:px-10 lg:py-6 rounded-lg mt-6 dark:bg-slate-600 hidden lg:block">
            <Banner storeCustomizationSetting={storeCustomizationSetting} />
          </div> */}
        </div>
      </div>

      <Image alt="trust " src={trustimg} className="w-full h-auto" />
      {/* <section className="py-8 pb-4">
        <div className="mx-auto max-w-screen-2xl   sm:px-6 lg:px-8">
          <div className="flex  flex-row justify-around lg:justify-between  gap-2 lg:justify-between px-2">
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
      </section> */}

      {/* <div className="px-2   mb-4 ">
        <Image
          src={off1}
          width={600}
          height={300}
          alt="35% off"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
          className="w-full h-auto"
        />
      </div> */}

      {/* videos */}
      <section className="w-full bg-[#bbdce0] py-6">
        <h1 className="px-2 text-xl sm:text-xl font-semibold text-[#b16d2f] text-center">
          Everything your skin needs is <br /> now at one place
        </h1>

        <div className="overflow-x-auto no-scrollbar mt-3 mr-2">
          <div className="flex gap-3 px-2 ">
            {videos.map((video) => (
              <div
                key={video.id}
                className="
            relative
            flex-shrink-0
            w-[40%] 
            sm:w-[55%]
            md:w-[25%] 
            aspect-[9/16]
            rounded-md
            overflow-hidden
            shadow-lg
            bg-black
          "
              >
                <video
                  src={video.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-3">
                  <p className="text-white text-xs sm:text-sm font-medium leading-tight line-clamp-2">
                    {video.title || "Sample caption text"}
                  </p>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </section>

      {/* product card  */}
      <Image
        alt="productheading"
        src={productheading}
        className="w-full h-auto"
      />
      <ComboBanner products={popularProducts || []} />
      <div className="flex bg-[#f8f2e2] py-6 pt-2">
        <div className="w-full">
          {error ? (
            <CMSkeletonTwo
              count={20}
              height={20}
              error={error}
              loading={false}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-3 px-2 mt-4">
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

      <div>
        {desktopProductImages?.map((index, image) => (
          <Image key={image} src={index.image} className="w-full h-auto" alt="desktop images" />
        ))}
      </div>

      <div className="mt-6   grid grid-cols-1 md:grid-cols-2   md:gap-3 lg:gap-3   max-w-screen-2xl m-auto">
        <Image
          src={banner1}
          alt="banner"
          width={1200}
          height={400}
          sizes="(max-width: 768px) 95vw, 50vw"
          className="m-auto rounded-md shadow"
          priority={false}
        />
        <Image
          src={banner2}
          alt="banner"
          width={1200}
          height={400}
          sizes="(max-width: 768px) 95vw, 50vw"
          className="m-auto rounded-md shadow"
          priority={false}
        />
        <Image
          src={banner3}
          alt="banner"
          width={1200}
          height={400}
          sizes="(max-width: 768px) 95vw, 50vw"
          className="m-auto rounded-md shadow"
          priority={false}
        />
        <Image
          src={banner4}
          alt="banner"
          width={1200}
          height={400}
          sizes="(max-width: 768px) 95vw, 50vw"
          className="m-auto rounded-md shadow"
          priority={false}
        />
      </div>

      <Image
        src={img1}
        alt="Banner Image"
        width={1200}
        height={400}
        className="mt-4 px-2 m-auto"
      />

      {/* Sticky Offer Image */}
      {/* <Combo /> */}
    </div>
  );
};

export default Home;
