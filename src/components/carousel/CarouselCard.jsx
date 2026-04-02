"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination"; 
import "swiper/css/navigation";

const CarouselCard = ({ storeCustomizationSetting, sliderData }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, 
      }}
      loop={true}
      pagination={
        (storeCustomizationSetting?.slider?.bottom_dots ||
          storeCustomizationSetting?.slider?.both_slider) && {
          clickable: true,
        }
      }
      navigation={
        (storeCustomizationSetting?.slider?.left_right_arrow ||
          storeCustomizationSetting?.slider?.both_slider) && {
          clickable: true,
        }
      } 
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {sliderData?.map((item, i) => (
        <SwiperSlide
          className="h-full relative   overflow-hidden dark:bg-zinc-900" 
          key={i + 1}
        >
          <div className="text-sm text-gray-600 hover:text-emerald-dark dark:bg-zinc-900">
            <div className="relative w-full h-[500px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority 
              />
            </div>
          </div>
           
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselCard;
