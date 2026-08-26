"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  Activity,
  FlaskConical,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const [heroData, setHeroData] = useState({
    title: "Simple & Reliable Medical Equipment For Hospitals & Labs",
    description: "We supply high-quality diagnostic machines, testing instruments, and fast repair services so your clinic can deliver fast and clear health reports every day.",
    button1Text: "View Our Products",
    button2Text: "Get Free Quote",
  });

  // Featured Product Carousel Slides (Clean, Light-Theme Interactive Cards)
  const carouselSlides = [
    {
      id: 1,
      badge: "Blood Cell Testing",
      title: "Hematology Machines",
      category: "Blood Testing",
      description: "Fast blood cell counting machines that give complete CBC reports in less than one minute with simple touch controls.",
      icon: <Activity className="w-8 h-8 text-emerald-600" />,
      color: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
      accent: "#00B7A0",
      specs: ["60 Tests Every Hour", "Tiny Sample Needed", "Easy Touch Display"],
    },
    {
      id: 2,
      badge: "Chemistry & Organ Tests",
      title: "Biochemistry Analyzers",
      category: "Organ Function Tests",
      description: "Reliable testing instruments designed to measure liver, kidney, and blood sugar levels quickly and accurately.",
      icon: <FlaskConical className="w-8 h-8 text-teal-600" />,
      color: "from-teal-500/10 via-emerald-500/5 to-emerald-500/10",
      accent: "#00A896",
      specs: ["Dual Reading Modes", "Live Test Tracking", "Built-In Ticket Printer"],
    },
    {
      id: 3,
      badge: "Instant Salts & Minerals",
      title: "Electrolyte Testers",
      category: "Critical Care Testing",
      description: "Smart sensor machines that check sodium, potassium, and calcium levels with zero hassle and low maintenance.",
      icon: <HeartPulse className="w-8 h-8 text-emerald-700" />,
      color: "from-emerald-600/10 via-cyan-500/5 to-teal-500/10",
      accent: "#028090",
      specs: ["Smart Sensor Tech", "Self Calibration", "Results in 30 Seconds"],
    },
    {
      id: 4,
      badge: "Hormone & Immunity Care",
      title: "ELISA Readers & Washers",
      category: "Immune System Testing",
      description: "High-precision microplate readers for virus testing, hormone checks, and allergy diagnostic labs.",
      icon: <Microscope className="w-8 h-8 text-teal-700" />,
      color: "from-teal-600/10 via-emerald-500/5 to-cyan-600/10",
      accent: "#05668D",
      specs: ["8 Light Sensors", "Big Memory Storage", "Simple PC Software"],
    },
  ];

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "humanbiomedicalsnet", "pages", "home")
        );

        if (snap.exists()) {
          const data = snap.data();
          setHeroData((prev) => ({
            ...prev,
            title: data.title || prev.title,
            description: data.description || prev.description,
            button1Text: data.button1Text || prev.button1Text,
            button2Text: data.button2Text || prev.button2Text,
          }));
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-advance Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // District Routing Helper
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";
  const makeLink = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Ambient Glows (Light Mode Only) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Hero Text & Call-To-Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Trusted & Verified Medical Supplier</span>
            {city && <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs">in {city}</span>}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-emerald-100/60 rounded-xl w-[85%]" />
                <div className="h-12 bg-emerald-100/60 rounded-xl w-[65%]" />
              </div>
            ) : (
              <>
                {heroData.title}
                {city && (
                  <>
                    <br />
                    <span className="text-emerald-600 font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-6 space-y-3">
              <div className="h-4 bg-emerald-100/60 rounded-full w-full" />
              <div className="h-4 bg-emerald-100/60 rounded-full w-[90%]" />
            </div>
          ) : (
            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {heroData.description}
              {city && (
                <>
                  {" "}We bring quick setup, full warranty, and friendly engineer support across{" "}
                  <strong className="text-emerald-700 font-semibold">{city}</strong>.
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href={makeLink("/items")}>
              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5">
                <span>{heroData.button1Text || "View Our Products"}</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            <Link href={makeLink("/contact")}>
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold transition-all duration-300">
                {heroData.button2Text || "Get Free Quote"}
              </button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-emerald-100">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">10+</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">Years Helping Labs</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">500+</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">Clinics Served</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">Quality Checked</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Dynamic Interactive Light-Theme Product Showcase Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Main Showcase Container */}
          <div className="relative rounded-[36px] bg-white border border-emerald-100 shadow-[0_20px_70px_rgba(0,183,160,0.12)] p-6 sm:p-8 min-h-[460px] flex flex-col justify-between overflow-hidden">
            {/* Slide Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  {carouselSlides[activeSlide].icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    {carouselSlides[activeSlide].category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {carouselSlides[activeSlide].title}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <Sparkles size={14} className="text-emerald-600" />
                <span>{carouselSlides[activeSlide].badge}</span>
              </div>
            </div>

            {/* Slide Body (Animate Presence for Smooth Slide Transition) */}
            <div className="my-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <p className="text-slate-600 text-base leading-relaxed">
                    {carouselSlides[activeSlide].description}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {carouselSlides[activeSlide].specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700"
                        >
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Footer Navigation */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Pagination Indicators */}
              <div className="flex items-center gap-2">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? "w-8 bg-emerald-600" : "w-2.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
                  }
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all duration-200"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % carouselSlides.length)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all duration-200"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>

                <Link href={makeLink("/items")}>
                  <button className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all">
                    View Catalog
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Light Badges */}
          <div className="absolute -top-5 -left-5 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl p-3 shadow-lg">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Microscope size={22} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">Modern Lab Tech</h5>
              <p className="text-[11px] text-slate-500">Precision Diagnostics</p>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl p-3 shadow-lg">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <BadgeCheck size={22} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">100% Genuine</h5>
              <p className="text-[11px] text-slate-500">Certified Warranty</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}