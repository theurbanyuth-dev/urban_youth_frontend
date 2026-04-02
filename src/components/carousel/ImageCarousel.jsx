"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ImageCarousel = ({ images, mainSwiper, activeIndex }) => {
  const handleClick = (index) => {
    if (mainSwiper) {
      mainSwiper.slideToLoop(index); // ✅ perfect sync
    }
  };

  return (
    <Swiper spaceBetween={8} slidesPerView={4} className="mt-3">
      {images?.map((img, i) => (
        <SwiperSlide key={i}>
          <button onClick={() => handleClick(i)}>
            <Image
              src={img}
              alt="thumb"
              width={100}
              height={100}
              className={`rounded-md border cursor-pointer 
                ${activeIndex === i ? "border-green-500" : "border-gray-200"}
              `}
            />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default dynamic(() => Promise.resolve(ImageCarousel), {
  ssr: false,
});
