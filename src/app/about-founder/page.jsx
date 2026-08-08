import React from "react";
import Image from "next/image";

//internal import
import { showingTranslateValue } from "@lib/translate";
import PageHeader from "@components/header/PageHeader";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import { getStoreCustomizationSetting } from "@services/SettingServices";

export const metadata = {
  title: "Tarun (Tejpal) Soni | Founder of UrbanYouth Skincare",
  description:
    "Meet Tarun (Tejpal) Soni, founder of UrbanYouth Skincare and a Full Stack Developer turned entrepreneur from Rajasthan. Discover his journey from technology to building an Indian skincare brand.",
  keywords: [
    "Tarun Soni",
    "Tejpal Soni",
    "Tarun Tejpal Soni",
    "Tarun Soni founder",
    "UrbanYouth founder",
    "UrbanYouth Skincare founder",
    "Indian skincare entrepreneur",
    "skincare entrepreneur India",
    "Rajasthan entrepreneur",
    "Jayal Nagaur entrepreneur",
    "Full Stack Developer entrepreneur",
  ],
  alternates: {
    canonical: "https://urbanyuth.com/about-founder",
  },
  openGraph: {
    title: "Tarun (Tejpal) Soni | Founder of UrbanYouth Skincare",
    description:
      "The story of Tarun (Tejpal) Soni — from Full Stack Developer to founder of UrbanYouth Skincare.",
    url: "https://urbanyuth.com/about-founder",
    siteName: "UrbanYouth Skincare",
    type: "profile",
    images: [
      {
        url: "https://urbanyuth.com/tarunsoni.jpeg",
        width: 1200,
        height: 630,
        alt: "Tarun (Tejpal) Soni - Founder of UrbanYouth Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarun (Tejpal) Soni | Founder of UrbanYouth Skincare",
    description: "From Full Stack Developer to founder of UrbanYouth Skincare.",
    images: ["https://urbanyuth.com/tarunsoni.jpeg"],
  },
};

const AboutFounder = async ({}) => {
  const { storeCustomizationSetting, error } =
    await getStoreCustomizationSetting();
  const about_us = storeCustomizationSetting?.about_us;
  // console.log("about_us", about_us);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#fafafa]">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gray-200/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Founder • Entrepreneur • Developer
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
              Founder of UrbanYouth Skincare
            </p>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Tarun{" "}
              <span className="bg-gradient-to-r from-gray-500 to-black bg-clip-text text-transparent">
                (Tejpal)
              </span>{" "}
              Soni
            </h1>

            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-gray-600">
              From building digital products as a Full Stack Developer to
              building an Indian skincare brand from the ground up.
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
              I am Tarun (Tejpal) Soni, founder of UrbanYouth Skincare. My
              journey combines technology, entrepreneurship, product development
              and a growing passion for the skincare industry.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#my-story"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Discover My Story →
              </a>

              <a
                href="https://urbanyuth.com/"
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-black hover:shadow-md"
              >
                Visit UrbanYouth
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.instagram.com/thats_tarun.soni/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-gray-600 transition hover:text-black"
                aria-label="Follow Tarun Soni on Instagram"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition group-hover:border-black">
                  ◎
                </span>
                Follow my journey on Instagram
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gray-200 via-white to-gray-300 opacity-70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-3 shadow-2xl">
              <img
                src="/tarunsoni.jpeg"
                alt="Tarun (Tejpal) Soni, Founder of UrbanYouth Skincare"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Founder
                </p>

                <p className="mt-1 text-lg font-bold">UrbanYouth Skincare</p>

                <p className="mt-1 text-sm text-gray-500">
                  Building a modern Indian skincare brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gray-100 lg:grid-cols-4">
          <div className="px-6 py-8 text-center">
            <p className="text-3xl font-black">2026</p>
            <p className="mt-1 text-sm text-gray-500">UrbanYouth Journey</p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-3xl font-black">29 Apr</p>
            <p className="mt-1 text-sm text-gray-500">Brand Launch</p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-3xl font-black">Tech</p>
            <p className="mt-1 text-sm text-gray-500">Developer Background</p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-3xl font-black">India</p>
            <p className="mt-1 text-sm text-gray-500">
              Building From Rajasthan
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
            Meet the Founder
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            The Story Behind UrbanYouth
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Every brand starts with an idea. UrbanYouth started with a desire to
            learn, build and create something meaningful in the Indian skincare
            industry.
          </p>
        </div>
      </section>

      {/* ================= MY STORY ================= */}
      <section id="my-story" className="bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
              My Story
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              From Full Stack Developer to Skincare Entrepreneur
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-600">
            <p>
              My name is{" "}
              <strong className="text-black">Tarun (Tejpal) Soni</strong>, and I
              am the founder of{" "}
              <strong className="text-black">UrbanYouth Skincare</strong>. I
              come from Jayal, Nagaur, Rajasthan.
            </p>

            <p>
              Before starting UrbanYouth, I worked as a{" "}
              <strong className="text-black">Full Stack Developer</strong>.
              Technology taught me how to solve problems, build products,
              understand users and continuously learn.
            </p>

            <p>
              Over time, I wanted to move beyond building products for others. I
              wanted to create something of my own — a brand that could grow,
              evolve and become useful to people in their everyday lives.
            </p>

            <p>
              That idea eventually became{" "}
              <strong className="text-black">UrbanYouth Skincare</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BEGINNING ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
              January 2026
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Why I Started UrbanYouth Skincare
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-600">
            <p>
              The idea of starting my own skincare brand began in{" "}
              <strong className="text-black">January 2026</strong>.
            </p>

            <p>
              I didn't want to launch a skincare business without understanding
              the industry first. I spent time learning about skincare
              ingredients, formulations, product development, customer needs and
              the everyday problems people face with their skincare routines.
            </p>

            <p>
              During this process, I learned more about ingredients including
              Vitamin C, Niacinamide, Hyaluronic Acid, Rice Water, Aloe Vera and
              SPF.
            </p>

            <p>
              The goal was simple: build a skincare brand focused on everyday
              skincare, simple routines and products people can comfortably
              understand and use.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LAUNCH ================= */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
            The Beginning of UrbanYouth
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            29 April 2026
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            After months of research, learning, planning and preparation,
            UrbanYouth Skincare officially launched on 29 April 2026.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 text-left sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-2xl">01</p>
              <h3 className="mt-4 font-bold">Learn</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Understand skincare, ingredients and customer needs.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-2xl">02</p>
              <h3 className="mt-4 font-bold">Build</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Turn an idea into products, branding and a digital experience.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-2xl">03</p>
              <h3 className="mt-4 font-bold">Grow</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Keep improving by listening to customers and learning every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="rounded-[2rem] bg-gray-50 p-8 sm:p-12 lg:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
            My Vision
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Building a Skincare Brand People Can Trust
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600">
            My vision for UrbanYouth Skincare is to build a trusted Indian
            skincare brand that makes everyday skincare simple and accessible.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            I want UrbanYouth to become more than a product brand. I want it to
            become a place where people can learn about skincare, understand
            ingredients and make better decisions about their daily skincare
            routine.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Building a successful brand takes time. My focus is on continuously
            learning, improving our products, listening to customers and
            building UrbanYouth step by step.
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS / INTERNAL LINKS ================= */}
      <section className="border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
                Explore UrbanYouth
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Everyday Skincare, Made Simple
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Explore the UrbanYouth skincare collection and discover products
                designed for simple everyday skincare routines.
              </p>
            </div>

            <a
              href="https://urbanyuth.com/"
              className="font-bold underline underline-offset-8"
            >
              Visit UrbanYouth →
            </a>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Face Wash",
                text: "Explore the UrbanYouth face wash range.",
                href: "/products/face-wash",
              },
              {
                title: "Vitamin C Serum",
                text: "Discover Vitamin C skincare for your routine.",
                href: "/products/vitamin-c-serum",
              },
              {
                title: "Moisturizer",
                text: "Explore everyday hydration and moisturization.",
                href: "/products/moisturizer",
              },
              {
                title: "Sunscreen",
                text: "Add daily SPF protection to your routine.",
                href: "/products/sunscreen",
              },
            ].map((product) => (
              <a
                key={product.title}
                href={product.href}
                className="group rounded-3xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-black transition group-hover:bg-black group-hover:text-white">
                  →
                </div>

                <h3 className="mt-6 text-xl font-black">{product.title}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {product.text}
                </p>

                <span className="mt-5 inline-block text-sm font-bold">
                  Explore product →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
              The Journey
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              From Idea to UrbanYouth
            </h2>
          </div>

          <div className="relative mt-14 space-y-10 border-l border-gray-300 pl-8 sm:ml-10">
            {[
              {
                date: "5 September 2002",
                title: "Born in Rajasthan",
                text: "Born and raised in Rajasthan, with roots in Jayal, Nagaur.",
              },
              {
                date: "Before 2026",
                title: "Full Stack Developer",
                text: "Built digital products, solved technical problems and gained experience in software development.",
              },
              {
                date: "January 2026",
                title: "The UrbanYouth Idea",
                text: "Started researching the skincare industry, ingredients, products and customer needs.",
              },
              {
                date: "29 April 2026",
                title: "UrbanYouth Skincare Launch",
                text: "Officially launched UrbanYouth Skincare and began the journey of building an Indian skincare brand.",
              },
            ].map((item) => (
              <div key={item.date} className="relative">
                <span className="absolute -left-[2.35rem] top-1 h-4 w-4 rounded-full border-4 border-gray-50 bg-black" />

                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  {item.date}
                </p>

                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>

                <p className="mt-2 max-w-2xl leading-7 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AUTHOR ================= */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl">
          <div className="grid items-center gap-8 p-8 sm:p-10 md:grid-cols-[auto_1fr]">
            <img
              src="/tarun-tejpal-soni-founder.jpg"
              alt="Tarun (Tejpal) Soni - Founder of UrbanYouth Skincare"
              className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100"
            />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                About the Author
              </p>

              <h2 className="mt-2 text-3xl font-black">Tarun (Tejpal) Soni</h2>

              <p className="mt-1 font-semibold text-gray-600">
                Founder of UrbanYouth Skincare
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                Full Stack Developer turned entrepreneur and founder of
                UrbanYouth Skincare. I write about skincare, entrepreneurship,
                technology, product development and the journey of building a
                modern Indian skincare brand.
              </p>

              <a
                href="https://www.instagram.com/thats_tarun.soni/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex font-bold underline underline-offset-4"
              >
                Follow me on Instagram →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
            Connect
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Follow the Journey
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Follow Tarun Soni on Instagram for updates about entrepreneurship,
            skincare, UrbanYouth and the journey behind the brand.
          </p>

          <a
            href="https://www.instagram.com/thats_tarun.soni/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-gray-200"
          >
            Instagram @thats_tarun.soni →
          </a>
        </div>
      </section>

      {/* ================= BLOG BACKLINKS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
              From the Founder
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Stories, Skincare & Entrepreneurship
            </h2>
          </div>

          <a href="/blog" className="font-bold underline underline-offset-8">
            View all articles →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <a
            href="/blog/founder-tarun-tejpal-soni"
            className="group rounded-3xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-bold text-gray-400">Founder Story</p>

            <h3 className="mt-3 text-2xl font-black">
              From Full Stack Developer to Skincare Founder
            </h3>

            <p className="mt-4 leading-7 text-gray-500">
              Discover the journey behind Tarun Soni and the creation of
              UrbanYouth Skincare.
            </p>

            <span className="mt-6 inline-block font-bold">Read story →</span>
          </a>

          <a
            href="/blog/vitamin-c-serum-benefits"
            className="group rounded-3xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-bold text-gray-400">Skincare Guide</p>

            <h3 className="mt-3 text-2xl font-black">
              Vitamin C Serum Benefits for Glowing Skin
            </h3>

            <p className="mt-4 leading-7 text-gray-500">
              Learn more about Vitamin C and how it can fit into a daily
              skincare routine.
            </p>

            <span className="mt-6 inline-block font-bold">Read article →</span>
          </a>

          <a
            href="/blog"
            className="group rounded-3xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-bold text-gray-400">UrbanYouth Blog</p>

            <h3 className="mt-3 text-2xl font-black">
              Skincare Tips & Founder Insights
            </h3>

            <p className="mt-4 leading-7 text-gray-500">
              Explore skincare guides, ingredient information and stories from
              the UrbanYouth journey.
            </p>

            <span className="mt-6 inline-block font-bold">Explore blog →</span>
          </a>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              About Tarun (Tejpal) Soni
            </h2>
          </div>

          <div className="mt-12 divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white px-6 sm:px-8">
            <details className="py-6">
              <summary className="cursor-pointer text-lg font-bold">
                Who is Tarun (Tejpal) Soni?
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                Tarun (Tejpal) Soni is the founder of UrbanYouth Skincare. He
                previously worked as a Full Stack Developer before starting his
                entrepreneurial journey in the skincare industry.
              </p>
            </details>

            <details className="py-6">
              <summary className="cursor-pointer text-lg font-bold">
                Who is the founder of UrbanYouth Skincare?
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                UrbanYouth Skincare was founded by Tarun (Tejpal) Soni.
              </p>
            </details>

            <details className="py-6">
              <summary className="cursor-pointer text-lg font-bold">
                When was UrbanYouth Skincare launched?
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                UrbanYouth Skincare was officially launched on 29 April 2026.
              </p>
            </details>

            <details className="py-6">
              <summary className="cursor-pointer text-lg font-bold">
                Where is Tarun Soni from?
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                Tarun (Tejpal) Soni is from Jayal, Nagaur, Rajasthan, India.
              </p>
            </details>

            <details className="py-6">
              <summary className="cursor-pointer text-lg font-bold">
                What did Tarun Soni do before UrbanYouth?
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                Before starting UrbanYouth Skincare, Tarun (Tejpal) Soni worked
                as a Full Stack Developer.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-28">
        <div className="rounded-[2rem] bg-black px-7 py-16 text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
            The Journey Continues
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            This Is Only the Beginning.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            From a small idea in January 2026 to the launch of UrbanYouth
            Skincare, the journey is just getting started.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="https://urbanyuth.com/"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              Explore UrbanYouth
            </a>

            <a
              href="/blog"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Read the Blog
            </a>

            <a
              href="https://www.instagram.com/thats_tarun.soni/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Instagram →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutFounder;
