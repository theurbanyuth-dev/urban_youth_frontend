import { BsLeaf } from "react-icons/bs";
import icon1 from "../images/icon/glowing-skin.png";
import icon2 from "../images/icon/dark.png";
import icon3 from "../images/icon/skin-care.png";
import icon4 from "../images/icon/correct.png";
import icon5 from "../images/icon/perfume.png";
import icon6 from "../images/icon/feathers.png";
import Image from "next/image"; 

const features = [
  { icon: icon1, title: "Glowing, Bright Skin" },
  { icon: icon2, title: "Reduce Dark Spots" },
  { icon: icon3, title: "For All Skin Types" },
  { icon: icon4, title: "Beginner Friendly" },
  { icon: icon5, title: "Fresh Fragrance" },
  { icon: icon6, title: "Lightweight & Non-sticky" },
];
 
export default function FeaturesGrid() {
  return (
    <div className="max-w-5xl mx-auto  py-8">
      <div className="grid grid-cols-3  gap-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border   rounded-lg bg-gray-100    transition"
          >
            <div className="text-4xl mb-2">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
