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
import bannernew1 from "../../public/slider/bannernew2.png";
import bannernew2 from "../images/bannernew2.png";
import trustimg from "../images/trust.png";
import productheading from "../images/skin.png";

// metadata
export const metadata = {
  title:
    "UrbanYouth Skincare | Facewash, Vitamin C Serum, Moisturizer & Sunscreen for Glowing Skin",

  description:
    "Shop UrbanYouth premium skincare products including facewash, vitamin C serum, moisturizer, and sunscreen. Achieve healthy, glowing, bright, and protected skin every day with dermatologist-inspired formulas.",

  keywords: [
    "UrbanYouth skincare",
    "best skincare products India",
    "facewash for glowing skin",
    "vitamin C serum benefits",
    "moisturizer for dry skin",
    "sunscreen SPF protection",
    "daily skincare routine",
    "skincare for men and women",
    "brightening skincare products",
    "healthy skin products",
    "anti-aging skincare",
    "hydrating face products",
  ],

  openGraph: {
    title: "UrbanYouth Skincare | Healthy Glowing Skin Everyday",
    description:
      "Discover UrbanYouth premium skincare range – facewash, vitamin C serum, moisturizer, and sunscreen for radiant, healthy skin.",

    url: "https://urbanyuth.com",
    siteName: "UrbanYouth",

    images: [
      {
        url: "https://urbanyuth.com/combopng.png",
        width: 800,
        height: 800,
        alt: "UrbanYouth Premium Skincare for clear glowing skin",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://urbanyuth.com",
  },
};

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
        </div>
      </div>

      <Image alt="trust " src={trustimg} className="w-full h-auto" />

      {/* videos */}
      <section className="w-full bg-[#bbdce0] py-6 px-2">
        <video
          src="/video1.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="w-full"
        />
      </section>

      {/* product card  */}
      {/* <Image 
        alt="productheading"
        src={productheading}
        className="w-full h-auto"
      /> */}
      <ComboBanner products={popularProducts || []} />

      {/* animated slider */}
      <div className="">
        <video src="/video2.mp4" loop autoPlay muted className="w-full" />
      </div>

      <div className="flex bg-[#bbdce0] py-6 pt-2">
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

      <div className="w-full  ">
        <Image
          alt="banner"
          src="/Stopcovering.png"
          width={1200}
          height={600}
          className="w-full border h-auto"
        />
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
