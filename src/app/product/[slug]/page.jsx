//internal import

import ProductScreen from "@components/slug-card/ProductScreen";
import { showingTranslateValue } from "@lib/translate";
import { getShowingAttributes } from "@services/AttributeServices";
import { getShowingStoreProducts } from "@services/ProductServices";

// This async function generates the metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { products } = await getShowingStoreProducts({
    category: "",
    slug: slug,
  });

  const product = products?.find((p) => p.slug === slug);

  return {
    title: `${product?.title?.en} |UrbanYouth`,
    description: product?.description?.en,
    keywords: [product?.tags],
    openGraph: {
      images: [product?.image],
    },
  };
}

const ProductSlug = async ({ params }) => {
  const { slug } = await params;

  const { attributes } = await getShowingAttributes();

  const { relatedProducts, products, reviews, error } =
    await getShowingStoreProducts({
      category: "",
      slug: slug,
    });

  let product = {};

  // console.log("products", products);

  if (slug) {
    product = products?.find((p) => p.slug === slug);
  }

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product?.title],
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "UrbanYouth",
    },
    offers: {
      "@type": "Offer",
      url: `https://urbanyuth.com/product/${slug}`,
      priceCurrency: "INR",
      price: product?.prices?.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      {/* ✅ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductScreen
        product={product}
        reviews={reviews}
        attributes={attributes}
        relatedProducts={relatedProducts}
      />
    </>
  );
};

export default ProductSlug;
