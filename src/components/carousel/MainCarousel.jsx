//internal import

import useUtilsFunction from "@hooks/useUtilsFunction";
import CarouselCard from "@components/carousel/CarouselCard";
import { getStoreCustomizationSetting } from "@services/SettingServices";
import { showingTranslateValue } from "@lib/translate";
import a1 from "../../images/a1.png"; 
import Image from "next/image"; 
 
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
      image: "/slider/s1.png",
    },
    {
      id: 2,  
      title: showingTranslateValue(slider?.second_title),
      info: showingTranslateValue(slider?.second_description),
      buttonName: showingTranslateValue(slider?.second_button),
      url: showingUrl(slider?.second_link),
      image: "/slider/s2.png",
    },
    {
      id: 3,
      title: showingTranslateValue(slider?.second_title),
      info: showingTranslateValue(slider?.second_description),
      buttonName: showingTranslateValue(slider?.second_button),
      url: showingUrl(slider?.second_link),
      image: "/slider/s3.png",
    },
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
