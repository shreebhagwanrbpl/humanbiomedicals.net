"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
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
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-6 lg:mt-10 px-4 lg:px-0 relative">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) =>
              setProductSearch(e.target.value)
            }
            className="w-full h-16 pl-14 pr-5 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
lg:sticky
lg:top-24
self-start
rounded-2xl lg:rounded-3xl
border
border-slate-200
bg-white
shadow-lg lg:shadow-xl
p-4 lg:p-6
"
          >
            <h3 className="text-2xl font-bold mb-6">
              Categories
            </h3>

            <div className="space-y-3">
              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(
                      categorySearch.toLowerCase()
                    )
                )
                .map((category) => (
                  <div
                    key={category}
                    className="border rounded-2xl overflow-hidden border-slate-200"
                  >
                    <button
                      onClick={() =>
                        toggleCategory(category)
                      }
                      className={`w-full px-5 py-4 flex justify-between items-center transition-all

                        ${activeCategory ===
                          category
                          ? "bg-sky-700 text-white"
                          : "bg-white hover:bg-slate-50"
                        }
                        `}
                    >

                      <span className="flex items-center gap-3">

                        {openedCategory ===
                          category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span className="text-sm font-semibold">

                        {
                          groupedProducts[
                            category
                          ].length
                        }

                      </span>

                    </button>

                    <div
                      className={`overflow-y-auto transition-all duration-300 ${openedCategory === category
                        ? "max-h-72"
                        : "max-h-0 overflow-hidden"
                        } custom-scrollbar`}
                    >

                      {groupedProducts[
                        category
                      ].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(
                              item.slug,
                              category
                            )
                          }
                          className="block w-full text-left px-6 py-3 border-t border-slate-100 hover:bg-slate-50"
                        >

                          {item.title}

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white p-10 lg:p-16 text-center shadow-[0_20px_60px_rgba(16,185,129,0.08)]">

                {/* Background Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-100 blur-3xl opacity-70"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-100 blur-3xl opacity-70"></div>

                {/* Icon */}
                <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-5xl text-white shadow-lg mb-8">
                  🔍
                </div>

                {/* Title */}
                <h2 className="relative z-10 text-3xl lg:text-4xl font-extrabold text-slate-900">
                  Product Not Found
                </h2>

                {/* Description */}
                <p className="relative z-10 mt-5 text-slate-600 max-w-2xl mx-auto leading-8 text-lg">
                  We couldn't find any biomedical products matching

                  <span className="font-bold text-emerald-600">
                    {" "} "{productSearch}"{" "}
                  </span>

                  Please try another keyword, browse a different category, or view all available products.
                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="relative z-10 mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 hover:-translate-y-1 transition-all duration-300"
                >
                  View All Products
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-100 pb-5 mb-8">

                      <div>

                        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                          {category}
                        </h2>

                        <div className="mt-3 w-24 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                      </div>

                      <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold shadow-sm">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="group relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >

                          {/* Top Gradient */}
                          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_190px] gap-6 lg:gap-8 items-center p-8">

                            {/* Image */}
                            <div className="relative h-[220px] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-100 flex items-center justify-center">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 bg-emerald-100 animate-pulse" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`max-h-[190px] object-contain p-5 transition-all duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}
                            <div>

                              <h3 className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                                {product.title}
                              </h3>

                              <p className="mt-5 text-slate-600 leading-8">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for hospitals, pathology laboratories, diagnostic centres, and healthcare professionals."}
                              </p>

                              {/* Details */}
                              <div className="grid md:grid-cols-2 gap-4 mt-8">

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Brand
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.brand || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Model
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.model || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Instrument
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.instrument || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                                    Category
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.category}
                                  </p>
                                </div>

                              </div>

                            </div>

                            {/* Action */}
                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="w-full lg:w-auto"
                              >

                                <button className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 hover:-translate-y-1 transition-all duration-300">
                                  Get Quote
                                </button>

                              </Link>

                            </div>

                          </div>

                          {/* Bottom Glow */}
                          <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-emerald-100 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products engineered for precision, reliability, and long-term healthcare performance."
            center
          />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
                desc: "Products manufactured under strict international quality standards."
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
                desc: "Quick and secure delivery across hospitals and laboratories."
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
                desc: "Dedicated technical guidance and after-sales assistance."
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
                desc: "High-performance biomedical instruments built for reliability."
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] bg-white border border-emerald-100 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >

                {/* Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">

                  {item.title}

                </h3>

                {/* Description */}
                <p className="mt-4 text-slate-600 leading-7">

                  {item.desc}

                </p>

                {/* Glow */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-emerald-100 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_20px_45px_rgba(16,185,129,0.45)]"
          aria-label="Scroll to top"
        >

          <ChevronUp
            size={24}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />

        </button>

      )}

    </>

  );

}