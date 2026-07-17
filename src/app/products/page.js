"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function ProductsPage() {

  const products = [

    {
      category: "Electrolyte Reagents",
      title: "Roche 9180 Electrolyte Reagent",
      image: "/images/product-1.jpg",
      description:
        "High precision electrolyte reagent for Roche analyzers.",
      brand: "Roche",
      model: "9180",
      slug: "roche-9180-electrolyte-reagent",
    },

    {
      category: "Electrolyte Reagents",
      title: "ERBA EC 90 Reagent",
      image: "/images/product-2.jpg",
      description:
        "Premium quality electrolyte reagent.",
      brand: "ERBA",
      model: "EC90",
      slug: "erba-ec90",
    },

    {
      category: "Rapid Test Kits",
      title: "COVID Rapid Test Kit",
      image: "/images/product-3.jpg",
      description:
        "Fast and reliable rapid testing solution.",
      brand: "Bio",
      model: "RT-100",
      slug: "covid-kit",
    },

    {
      category: "Rapid Test Kits",
      title: "Dengue Rapid Kit",
      image: "/images/product-4.jpg",
      description:
        "High sensitivity dengue rapid test.",
      brand: "Bio",
      model: "DG200",
      slug: "dengue-kit",
    },

    {
      category: "Hematology",
      title: "Hematology Reagent",
      image: "/images/product-5.jpg",
      description:
        "Premium hematology solution.",
      brand: "Mindray",
      model: "BC5300",
      slug: "hematology",
    },

  ];

  const [search, setSearch] =
    useState("");

  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const filteredProducts =
    useMemo(() => {

      return products.filter((item) => {

        const text = `
        ${item.title}
        ${item.brand}
        ${item.category}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [search]);

  const groupedProducts =
    useMemo(() => {

      const obj = {};

      filteredProducts.forEach((item) => {

        if (!obj[item.category]) {

          obj[item.category] = [];

        }

        obj[item.category].push(item);

      });

      return obj;

    }, [filteredProducts]);

  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {

    if (openedCategory === category) {

      setOpenedCategory("");

      return;

    }

    setOpenedCategory(category);

  };

  const scrollToProduct = (
    slug,
    category
  ) => {

    setOpenedCategory(category);

    setActiveCategory(category);

    setTimeout(() => {

      const el =
        document.getElementById(slug);

      if (el) {

        el.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

      }

    }, 250);

  };

  return (
    <>
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover premium diagnostic products for hospitals and laboratories."
            center
          />

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-16">

            {/* ======================
                LEFT SIDEBAR
          ====================== */}

            <aside className="sticky top-28 h-fit rounded-[32px] border border-emerald-100 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(16,185,129,0.08)] overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-6">

                <h2 className="text-2xl font-bold text-white">
                  Categories
                </h2>

                {/* Search */}
                <div className="relative mt-5">

                  <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white border border-white/20 px-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-white focus:ring-4 focus:ring-white/30"
                  />

                </div>

              </div>

              {/* Categories */}
              <div className="p-5 space-y-3">

                {categories.map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
                  >

                    <button
                      onClick={() => toggleCategory(category)}
                      className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-300 ${activeCategory === category
                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                        : "hover:bg-emerald-50 text-slate-700"
                        }`}
                    >

                      <span className="flex items-center gap-3 font-semibold">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`min-w-8 h-8 px-2 rounded-full flex items-center justify-center text-sm font-bold ${activeCategory === category
                          ? "bg-white/20 text-white"
                          : "bg-emerald-100 text-emerald-700"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight:
                          openedCategory === category
                            ? groupedProducts[category].length * 48 + "px"
                            : "0px",
                      }}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.slug}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="group flex w-full items-center justify-between border-t border-emerald-50 px-6 py-3 text-left text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                        >

                          <span className="truncate">
                            {item.title}
                          </span>

                          <ChevronRight
                            size={15}
                            className="opacity-0 group-hover:opacity-100 transition"
                          />

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </aside>

            {/* ======================
                RIGHT SIDE
          ====================== */}

            <div>

              <div className="space-y-16">

                {Object.entries(groupedProducts).map(([category, list]) => (

                  <section
                    key={category}
                    id={category.replace(/\s+/g, "-").toLowerCase()}
                  >

                    {/* Category Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-5 border-b border-emerald-100">

                      <div>

                        <h2 className="text-4xl font-extrabold text-slate-900">
                          {category}
                        </h2>

                        <div className="mt-3 w-24 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                      </div>

                      <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Products */}
                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.slug}
                          id={product.slug}
                          className="group bg-white border border-emerald-100 rounded-[32px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >

                          <div className="grid lg:grid-cols-[260px_1fr_190px] gap-8 items-center p-8">

                            {/* Product Image */}
                            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-100 h-[230px] flex items-center justify-center overflow-hidden">

                              <Image
                                src={product.image}
                                alt={product.title}
                                width={220}
                                height={220}
                                className="object-contain max-h-[190px] transition-transform duration-500 group-hover:scale-105"
                              />

                            </div>

                            {/* Product Content */}
                            <div>

                              <h3 className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                {product.title}
                              </h3>

                              <p className="mt-5 text-slate-600 leading-8">
                                {product.description}
                              </p>

                              <div className="grid sm:grid-cols-2 gap-4 mt-8">

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">

                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Brand
                                  </p>

                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.brand}
                                  </p>

                                </div>

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">

                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Model
                                  </p>

                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.model}
                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* Action */}
                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={`/products/${product.slug}`}
                                className="w-full lg:w-auto"
                              >

                                <button className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 hover:-translate-y-1 transition-all duration-300">
                                  View Details
                                </button>

                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===========================
            WHY CHOOSE US
      =========================== */}

      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Choose Our Products"
            title="Trusted Quality & Innovation"
            description="Every biomedical product is designed to deliver exceptional quality, reliable performance, and long-term support for healthcare professionals."
            center
          />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "Certified Quality",
                desc: "Premium biomedical equipment manufactured and tested according to international quality standards.",
              },
              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Safe, secure, and timely delivery across India with reliable logistics support.",
              },
              {
                icon: <BadgeCheck size={32} />,
                title: "Trusted Support",
                desc: "Expert consultation, installation guidance, and responsive after-sales assistance.",
              },
              {
                icon: <PackageCheck size={32} />,
                title: "Premium Equipment",
                desc: "High-performance laboratory and diagnostic equipment built for accuracy and durability.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] bg-white border border-emerald-100 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >

                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">

                  {item.title}

                </h3>

                {/* Description */}
                <p className="mt-4 text-slate-600 leading-8">

                  {item.desc}

                </p>

                {/* Background Glow */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-emerald-100 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

    </>

  );

}