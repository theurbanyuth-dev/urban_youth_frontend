import { getSingleBlogApi } from "@services/BlogService";

// ✅ ADD THIS AT TOP (outside component)
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX

  const blog = await getSingleBlogApi({ slug });

  if (!blog?.blog) {
    return {
      title: "Blog Not Found | UrbanYouth",
      description: "The blog you are looking for does not exist.",
    };
  }

  const data = blog.blog;

  return {
    metadataBase: new URL("https://urbanyouth.com"),
    title: `${data.title} | UrbanYouth Skincare`,
    description: data.description,
    keywords: ["skincare", "glowing skin", data.title],
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blog = await getSingleBlogApi({ slug: slug });

  if (!blog) {
    return <div className="p-10 text-center">Blog not found</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative">
        <img
          src={blog?.blog?.image}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            {blog?.blog?.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-gray-500 mb-6 text-lg">{blog?.blog?.description}</p>

        <div
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: blog?.blog?.content || "",
          }}
        />

        {/* FAQs */}
        {blog?.blog?.faqs?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">FAQs</h2>

            <div className="space-y-4">
              {blog?.blog?.faqs.map((faq, i) => (
                <div key={i} className="border rounded-xl p-4">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="text-gray-600 mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.blog.title,
            description: blog.blog.description,
            image: blog.blog.image,
            author: {
              "@type": "Organization",
              name: "UrbanYouth",
            },
            publisher: {
              "@type": "Organization",
              name: "UrbanYouth",
              logo: {
                "@type": "ImageObject",
                url: "https://urbanyouth.com/logo.png",
              },
            },
          }),
        }}
      />
    </div>
  );
}
