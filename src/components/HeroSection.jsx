"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHomeData } from "@/lib/data-fetcher";
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
  PhoneCall,
  Award,
  Layers,
  Clock,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const [heroData, setHeroData] = useState({
    title: "Complete Diagnostic Analyzers, Pathology Devices & Medical Equipment",
    description: "Human Biomedicals is your trusted partner for turnkey clinical laboratory setup, offering cutting-edge diagnostic analyzers, ISO-compliant calibration, certified reagents, and nationwide biomedical maintenance support.",
    button1Text: "Explore Full Catalog",
    button2Text: "Consult Our Specialists",
  });

  // Featured Medical Product Showcase Slides
  const carouselSlides = [
    {
      id: 1,
      badge: "Fast CBC & Cell Counts",
      title: "Hematology Analyzers",
      category: "Blood Diagnostics",
      description: "Automated 3-part & 5-part differential cell counters delivering precision CBC reports in under 60 seconds with micro-sample volume.",
      icon: <Activity className="w-7 h-7 text-emerald-600" />,
      color: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
      accent: "#00B7A0",
      specs: ["60+ Tests / Hour", "Micro Sample Need", "Digital Touch Control"],
      link: "/items?category=Hematology+Analyzer",
    },
    {
      id: 2,
      badge: "Clinical Chemistry & Organ Panels",
      title: "Biochemistry Analyzers",
      category: "Clinical Chemistry",
      description: "High-throughput semi & fully automated systems for accurate Liver, Kidney, Lipid profiles, and routine clinical pathology tests.",
      icon: <FlaskConical className="w-7 h-7 text-teal-600" />,
      color: "from-teal-500/10 via-emerald-500/5 to-emerald-500/10",
      accent: "#00A896",
      specs: ["Dual Flowcell Modes", "Real-time Reaction Curve", "Built-in Thermal Printer"],
      link: "/items?category=Biochemistry+Analyzer",
    },
    {
      id: 3,
      badge: "Rapid Ions & Critical Care",
      title: "Electrolyte Testers",
      category: "Critical Care Testing",
      description: "Solid-state ion-selective electrode systems measuring Na+, K+, Cl-, and iCa++ levels with rapid 30-second automated cycle times.",
      icon: <HeartPulse className="w-7 h-7 text-emerald-700" />,
      color: "from-emerald-600/10 via-cyan-500/5 to-teal-500/10",
      accent: "#028090",
      specs: ["Smart Sensor Tech", "Self Calibration", "Results in 30 Seconds"],
      link: "/items?category=Electrolyte+Analyzer",
    },
    {
      id: 4,
      badge: "Certified Test Strips & Reagents",
      title: "Diagnostic Test Strips",
      category: "Point of Care Testing",
      description: "Precision disposable reagent strips for Hemoglobin, Blood Glucose, and Urine analysis with maximum diagnostic accuracy.",
      icon: <Layers className="w-7 h-7 text-teal-700" />,
      color: "from-teal-600/10 via-emerald-500/5 to-cyan-600/10",
      accent: "#05668D",
      specs: ["Immediate Results", "NABL Standard Reagents", "Bulk Stock Available"],
      link: "/items?category=Test+Strips",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const loadHero = async () => {
      try {
        const homeData = await fetchHomeData();
        if (isMounted && homeData) {
          setHeroData((prev) => ({
            ...prev,
            title: homeData.title || homeData.heroTitle || prev.title,
            description: homeData.description || homeData.heroDesc || prev.description,
            button1Text: homeData.button1Text || prev.button1Text,
            button2Text: homeData.button2Text || prev.button2Text,
          }));
        }
      } catch (err) {
        console.warn("[HeroSection] Using default dynamic hero data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadHero();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-advance Carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";
  const makeLink = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/25 to-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Dynamic Background Ambient Blur Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/35 to-teal-100/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-teal-200/30 to-cyan-100/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column (7 cols): Hero Text & Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Top Medical Trust Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-emerald-200/80 text-emerald-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm w-fit">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Precision Diagnostics • ISO & CE Standard Equipment</span>
            {city && (
              <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-xs font-bold">
                in {city}
              </span>
            )}
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.16]">
            {loading ? (
              <div className="animate-pulse space-y-3 py-2">
                <div className="h-10 bg-emerald-100/70 rounded-xl w-[90%]" />
                <div className="h-10 bg-emerald-100/70 rounded-xl w-[75%]" />
                <div className="h-10 bg-emerald-100/70 rounded-xl w-[60%]" />
              </div>
            ) : (
              <>
                <span>Complete Diagnostic Analyzers, Pathology Devices &amp; </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-[#00B7A0] to-teal-700">
                  Medical Equipment
                </span>
                {city ? (
                  <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-800 mt-2 font-bold">
                    Supplied Across <span className="text-emerald-600 underline decoration-emerald-300 underline-offset-4">{city}</span>
                  </span>
                ) : (
                  <span className="text-slate-800"> — Human Biomedicals</span>
                )}
              </>
            )}
          </h1>

          {/* Hero Subtitle Description */}
          {loading ? (
            <div className="animate-pulse mt-5 space-y-2 max-w-xl">
              <div className="h-4 bg-emerald-100/50 rounded-full w-full" />
              <div className="h-4 bg-emerald-100/50 rounded-full w-[85%]" />
            </div>
          ) : (
            <p className="mt-5 text-slate-600 text-sm sm:text-base lg:text-[16.5px] leading-relaxed max-w-2xl font-normal">
              {heroData.description}
            </p>
          )}

          {/* Key Value Micro-Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6 max-w-2xl">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate">100% Genuine Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate">Pan-India Dispatch</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate">Engineer AMC Support</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
            <Link href={makeLink("/items")}>
              <button
                suppressHydrationWarning
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00B7A0] to-[#059669] hover:from-[#00A38E] hover:to-[#047857] text-white font-bold text-sm shadow-[0_10px_25px_rgba(0,183,160,0.3)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-0"
              >
                <span>{heroData.button1Text || "Explore Full Portfolio"}</span>
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            <Link href={makeLink("/contact")}>
              <button
                suppressHydrationWarning
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 text-slate-800 hover:text-emerald-800 font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer"
              >
                <PhoneCall size={16} className="text-emerald-600" />
                <span>{heroData.button2Text || "Consult Our Specialists"}</span>
              </button>
            </Link>
          </div>

          {/* Mini Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-slate-200/80 max-w-xl">
            <div>
              <div className="text-2xl lg:text-3xl font-black text-slate-900">10+</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Years Helping Labs</p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-black text-slate-900">500+</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Clinics Equipped</p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-black text-slate-900">100%</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Calibrated &amp; Tested</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column (5 cols): Interactive Medical Card Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Elevated Glass Card */}
          <div className="relative rounded-[32px] bg-white/95 backdrop-blur-xl border border-emerald-100/90 shadow-[0_25px_60px_rgba(0,183,160,0.14)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            {/* Slide Header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
                  {carouselSlides[activeSlide].icon}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                    {carouselSlides[activeSlide].category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {carouselSlides[activeSlide].title}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-[11px] font-bold text-emerald-800 shadow-xs">
                <Sparkles size={13} className="text-emerald-600 flex-shrink-0" />
                <span className="truncate max-w-[130px]">{carouselSlides[activeSlide].badge}</span>
              </div>
            </div>

            {/* Slide Body */}
            <div className="my-5 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {carouselSlides[activeSlide].description}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      KEY SPECIFICATIONS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {carouselSlides[activeSlide].specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-700"
                        >
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Footer Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    suppressHydrationWarning
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? "w-7 bg-[#00B7A0]" : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next & Catalog Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
                  }
                  suppressHydrationWarning
                  className="p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % carouselSlides.length)}
                  suppressHydrationWarning
                  className="p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>

                <Link href={makeLink(carouselSlides[activeSlide].link || "/items")}>
                  <button
                    suppressHydrationWarning
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00B7A0] to-[#059669] hover:from-[#00A38E] hover:to-[#047857] text-white text-xs font-bold shadow-sm transition-all cursor-pointer border-0"
                  >
                    View Catalog
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Trust Badge - Top Left */}
          <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl p-2.5 shadow-md">
            <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-700">
              <Microscope size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">Modern Lab Tech</h5>
              <p className="text-[10px] text-slate-500">Precision Diagnostics</p>
            </div>
          </div>

          {/* Floating Trust Badge - Bottom Right */}
          <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl p-2.5 shadow-md">
            <div className="p-2 rounded-xl bg-teal-100/80 text-teal-700">
              <BadgeCheck size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">100% Genuine</h5>
              <p className="text-[10px] text-slate-500">Certified Warranty</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
