"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "humanbiomedicalsnet", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold mb-7 shadow-sm">
            <ShieldCheck size={18} className="text-emerald-600" />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-emerald-100 rounded-xl w-[80%]"></div>
                <div className="h-12 bg-emerald-100 rounded-xl w-[60%]"></div>
                <div className="h-12 bg-emerald-100 rounded-xl w-[70%]"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />
                    <span className="text-2xl lg:text-4xl text-emerald-600 font-semibold">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-7 space-y-3">
              <div className="h-4 bg-emerald-100 rounded-full w-full"></div>
              <div className="h-4 bg-emerald-100 rounded-full w-[90%]"></div>
              <div className="h-4 bg-emerald-100 rounded-full w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-7 text-slate-600 text-lg leading-8 max-w-xl">
              {heroData.description}
              {city && (
                <>
                  {" "}across{" "}
                  <strong className="text-emerald-700">
                    {city}
                  </strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-emerald-100 rounded-xl"></div>
                <div className="animate-pulse h-12 w-36 bg-gray-200 rounded-xl"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-300/40 transition-all duration-300 hover:-translate-y-1">
                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="px-8 py-3 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold transition-all duration-300">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}

          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14">

            <div className="bg-white border border-emerald-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-3xl font-bold text-emerald-600">
                10+
              </h3>
              <p className="text-slate-500 mt-1">
                Years Experience
              </p>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-3xl font-bold text-emerald-600">
                500+
              </h3>
              <p className="text-slate-500 mt-1">
                Products Delivered
              </p>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-3xl font-bold text-emerald-600">
                100%
              </h3>
              <p className="text-slate-500 mt-1">
                Quality Assurance
              </p>
            </div>

          </div>

        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* Main Image */}
          <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-3 shadow-2xl border border-emerald-100">

            <Image
              src={CBG}
              alt=" Human Biomedical"
              width={1200}
              height={900}
              className="rounded-[30px] object-cover object-[20%_center] h-[350px] sm:h-[450px] lg:h-[550px] w-full"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-3 rounded-[30px] bg-gradient-to-t from-slate-900/15 via-transparent to-transparent"></div>

          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute top-8 -left-10 hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-3xl px-5 py-4 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
              <Microscope size={28} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Modern Labs
              </h4>

              <p className="text-sm text-slate-500">
                Precision Equipment
              </p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div
            className="absolute bottom-8 -right-8 hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-3xl px-5 py-4 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
              <BadgeCheck size={28} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Trusted Quality
              </h4>

              <p className="text-sm text-slate-500">
                Certified Solutions
              </p>
            </div>
          </div>

          {/* Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl -z-10"></div>

          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl -z-10"></div>

        </motion.div>
      </div>
    </section>
  );
}