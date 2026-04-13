// internal imports
import React, { Suspense, cache } from "react";
import "@styles/custom.css";

import Providers from "./provider";
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import FooterTop from "@layout/footer/FooterTop";
import FeatureCard from "@components/feature-card/FeatureCard";
import { Analytics } from "@vercel/analytics/next";

import {
  getStoreSetting,
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

import { SettingProvider } from "@context/SettingContext";

// ✅ Enable caching (ISR)
export const revalidate = 60;

// ✅ Cache API calls
const getCachedSettings = cache(async () => {
  const [globalRes, storeRes, customizationRes] = await Promise.all([
    getGlobalSetting(),
    getStoreSetting(),
    getStoreCustomizationSetting(),
  ]);

  return {
    globalSetting: globalRes?.globalSetting || {},
    storeSetting: storeRes?.storeSetting || {},
    storeCustomizationSetting:
      customizationRes?.storeCustomizationSetting || {},
    error: customizationRes?.error || null,
  };
});

// ✅ Metadata
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
        url: "https://urbanyuth.com/facewash.png",
        width: 800,
        height: 800,
        alt: "UrbanYouth Facewash for clear glowing skin",
      },
      {
        url: "https://urbanyuth.com/serum.png",
        width: 800,
        height: 800,
        alt: "UrbanYouth Vitamin C Serum for bright skin",
      },
      {
        url: "https://urbanyuth.com/moisturizer.png",
        width: 800,
        height: 800,
        alt: "UrbanYouth Moisturizer for hydrated skin",
      },
      {
        url: "https://urbanyuth.com/sunscreen.png",
        width: 800,
        height: 800,
        alt: "UrbanYouth Sunscreen SPF protection",
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

export default async function RootLayout({ children }) {
  const { globalSetting, storeSetting, storeCustomizationSetting, error } =
    await getCachedSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload font */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          as="style"
          crossOrigin="anonymous"
        />

        {/* Load stylesheet */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          crossOrigin="anonymous"
        />
      </head>

      <body className="bg-white antialiased dark:bg-zinc-900">
        {/* Analytics */}
        <Analytics />

        <SettingProvider
          initialGlobalSetting={globalSetting}
          initialStoreSetting={storeSetting}
          initialCustomizationSetting={storeCustomizationSetting}
        >
          <Providers storeSetting={storeSetting}>
            {/* Navbar */}
            <Suspense fallback={<div className="h-16" />}>
              <Navbar
                globalSetting={globalSetting}
                storeCustomization={storeCustomizationSetting}
              />
            </Suspense>

            {/* Main content */}
            <main className="z-10">{children}</main>

            {/* Footer */}
            <Suspense fallback={<div className="h-40" />}>
              <div className="w-full">
                <FooterTop
                  error={error}
                  storeCustomizationSetting={storeCustomizationSetting}
                />

                <div className="relative mx-auto max-w-screen-2xl py-6 px-3 sm:px-10 bg-[#0097b2]">
                  <FeatureCard
                    storeCustomizationSetting={storeCustomizationSetting}
                  />
                </div>

                <hr className="hr-line" />

                <div className="border-t border-gray-100 w-full">
                  <Footer
                    error={error}
                    storeCustomizationSetting={storeCustomizationSetting}
                  />
                </div>
              </div>
            </Suspense>
          </Providers>
        </SettingProvider>
      </body>
    </html>
  );
}
