"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, reliability, and exceptional service support for hospitals, laboratories, and healthcare institutions."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden bg-white rounded-[30px] border border-emerald-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >

              {/* Top Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-8">
                {item.description}
              </p>

              {/* Decorative Glow */}
              <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-emerald-100 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}