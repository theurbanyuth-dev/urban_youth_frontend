import Image from "next/image";

// 🔥 Dynamic SEO Metadata (Server Side)
export async function generateMetadata({ params }) {
  const combo = await getComboData(params.slug);

  return {
    title: `UrbanYouth Combo Pack`,
    description: combo.description,
    keywords: [
      "skincare combo",
      "face care kit",
      "glowing skin combo",
      "UrbanYouth combo",
      "skincare bundle India",
    ],
    openGraph: {
      title: combo.name,
      description: combo.description,
      images: [combo.image],
    },
  };
}

// 🔥 Fetch combo data (replace with API)
async function getComboData(slug) {
  return {
    name: "Glow Essentials Combo",
    description:
      "Complete skincare combo with Facewash, Vitamin C Serum, Moisturizer & Sunscreen for glowing healthy skin.",
    image: "/combo.jpg",
    price: 999,
    products: ["Facewash", "Vitamin C Serum", "Moisturizer", "Sunscreen"],
    benefits: [
      "Deep cleansing",
      "Brightens skin",
      "Hydrates & moisturizes",
      "UV protection",
    ],
  };
}

// 🔥 Server Component Page
export default async function ComboPage({ params }) {
  const combo = await getComboData(params.slug);

  return (
    <div className="bg-white min-h-screen max-w-2xl md:px-20 m-auto relative pb-20">
      <Image
        src="/comboimage.png"
        className="w-full h-auto"
        width={0}
        height={0}
        sizes="100vw"
        alt="combo image"
      />

      {/* Fixed Add to Cart Button */}
      <div className="fixed bottom-[60px] left-0 w-full bg-white border-t shadow-lg p-4 z-[9]">
        <div className="max-w-2xl mx-auto">
          <button className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold active:scale-95 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
