import React from "react";
import Image from "next/image";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

//internal import

import Label from "@components/form/Label";
import { notifySuccess } from "@utils/toast";
import { showingTranslateValue } from "@lib/translate";
import PageHeader from "@components/header/PageHeader";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import { getStoreCustomizationSetting } from "@services/SettingServices";

export const metadata = {
  title: "Contact Us | UrbanYouth",
  description:
    "Get in touch with us! Find our contact information and fill out our contact form.",
  keywords: ["contact", "email", "phone", "location"],
  // You can also add more advanced metadata here
  openGraph: {
    title: "Contact Us | UrbanYouth",
    description:
      "Get in touch with us! Find our contact information and fill out our contact form.",
    url: "https://kachabazar-store-nine.vercel.app/contact-us",
    images: [
      {
        url: "https://urbanyuth.com/logo2.png",
        width: 800,
        height: 600,
        alt: "Contact Us Page",
      },
    ],
  },
};

const ContactUs = async () => {
  const { storeCustomizationSetting, error } =
    await getStoreCustomizationSetting();

  const contact_us = storeCustomizationSetting?.contact_us;

  const submitHandler = async () => {
    notifySuccess(
      "your message sent successfully. We will contact you shortly."
    );
  };

  return (
    <div className="">
      <PageHeader headerBg={contact_us?.header_bg} title={contact_us?.title} />

      <div className="bg-white dark:bg-zinc-900">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          {/* contact promo */}
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 ">
            {error ? (
              <CMSkeletonTwo
                count={10}
                height={20}
                error={error}
                loading={false}
              />
            ) : (
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <FiMail />
                </span>
                <h5 className="text-xl mb-2 font-bold">
                  {showingTranslateValue(contact_us?.email_box_title)}
                </h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <a
                    href={`mailto:${contact_us?.email_box_email}`}
                    className="text-emerald-500"
                  >
                    {showingTranslateValue(contact_us?.email_box_email)}
                  </a>{" "}
                  {showingTranslateValue(contact_us?.email_box_text)}
                </p>
              </div>
            )}

            {error ? (
              <CMSkeletonTwo
                count={10}
                height={20}
                error={error}
                loading={false}
              />
            ) : (
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <FiBell />
                </span>
                <h5 className="text-xl mb-2 font-bold">
                  {showingTranslateValue(contact_us?.call_box_title)}
                </h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <a
                    href={`mailto:${contact_us?.call_box_phone}`}
                    className="text-emerald-500"
                  >
                    {showingTranslateValue(contact_us?.call_box_phone)}
                  </a>{" "}
                  {showingTranslateValue(contact_us?.call_box_text)}
                </p>
              </div>
            )}
            {error ? (
              <CMSkeletonTwo
                count={10}
                height={20}
                error={error}
                loading={false}
              />
            ) : (
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <FiMapPin />
                </span>
                <h5 className="text-xl mb-2 font-bold">
                  {showingTranslateValue(contact_us?.address_box_title)}
                </h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <span>
                    {showingTranslateValue(
                      storeCustomizationSetting?.contact_us
                        ?.address_box_address_one
                    )}
                  </span>{" "}
                  <br />
                  {/* {showingTranslateValue(
                    storeCustomizationSetting?.contact_us
                      ?.address_box_address_two
                  )}{" "} */}
                  <br />
                  {/* {showingTranslateValue(
                    storeCustomizationSetting?.contact_us
                      ?.address_box_address_three
                  )} */}
                </p>
              </div>
            )}
          </div>

          {/* contact form */}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
