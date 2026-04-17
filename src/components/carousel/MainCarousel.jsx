//internal import

import useUtilsFunction from "@hooks/useUtilsFunction";
import CarouselCard from "@components/carousel/CarouselCard";
import { getStoreCustomizationSetting } from "@services/SettingServices";
import { showingTranslateValue } from "@lib/translate";

const MainCarousel = async () => {
  const { showingUrl, showingImage } = useUtilsFunction();

  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const slider = storeCustomizationSetting?.slider;

  const sliderData = [
    {
      id: 1,
      title: showingTranslateValue(slider?.first_title),
      info: showingTranslateValue(slider?.first_description),
      buttonName: showingTranslateValue(slider?.first_button),
      url: showingUrl(slider?.first_link), 
      mobileImage: "/slider/bannernew1.png",
      desktopImage: "/slider/pc1.png", 
    },
    // {
    //   id: 2, 
    //   title: showingTranslateValue(slider?.second_title),
    //   info: showingTranslateValue(slider?.second_description),
    //   buttonName: showingTranslateValue(slider?.second_button),
    //   url: showingUrl(slider?.second_link),
    //   mobileImage: "/slider/s2.png",
    //   desktopImage: "/slider/pc2.png",
    // },
    // {
    //   id: 3,
    //   title: showingTranslateValue(slider?.second_title),
    //   info: showingTranslateValue(slider?.second_description),
    //   buttonName: showingTranslateValue(slider?.second_button),
    //   url: showingUrl(slider?.second_link),
    //   mobileImage: "/slider/s3.png",
    //   desktopImage: "/slider/pc3.png",
    // },
  ];

  return (
    <>
      <CarouselCard
        sliderData={sliderData}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default MainCarousel;
