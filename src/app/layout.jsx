//internal imports
import React from "react";
import "@styles/custom.css";
import Providers from "./provider";
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@components/feature-card/FeatureCard";
import {
  getStoreSetting,
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

import { SettingProvider } from "@context/SettingContext";

export const metadata = {
  title: "UrbanYouth | Premium Skincare for Healthy Glowing Skin",
  description: "UrbanYouth offers premium skincare products including facewash, vitamin C serum, moisturizer, and sunscreen designed to keep your skin healthy, bright, and protected every day.",
};

export default async function RootLayout({ children }) {
  const { globalSetting } = await getGlobalSetting();
  const { storeSetting } = await getStoreSetting();

  // Fetch all customization data at once (adjust your API to return full data)
  const { storeCustomizationSetting, error } =
    await getStoreCustomizationSetting();

  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-white antialiased dark:bg-zinc-900"
      >
        <div>
          <SettingProvider
            initialGlobalSetting={globalSetting}
            initialStoreSetting={storeSetting}
            initialCustomizationSetting={storeCustomizationSetting}
          >
            <Providers storeSetting={storeSetting}>
              <Navbar
                globalSetting={globalSetting}
                storeCustomization={storeCustomizationSetting}
              />
              <main className="   z-10">
                {children}
              </main>
              {/* <div className="bg-gray-50 dark:bg-zinc-900 z-10">{children}</div> */}
              {/* <MobileFooter globalSetting={globalSetting} /> */}
              <div className="w-full">
                <FooterTop
                  error={error}
                  storeCustomizationSetting={storeCustomizationSetting}
                />
                <div className="  relative  mx-auto max-w-screen-2xl py-6 px-3 sm:px-10 bg-[#0097b2]">
                  <FeatureCard
                    storeCustomizationSetting={storeCustomizationSetting}
                  />
                </div>
                <hr className="hr-line"></hr>
                <div className="border-t border-gray-100 w-full">
                  <Footer
                    error={error}
                    storeCustomizationSetting={storeCustomizationSetting}
                  />
                </div>
              </div>
            </Providers>
          </SettingProvider>
        </div>
      </body>
    </html>
  );
}
