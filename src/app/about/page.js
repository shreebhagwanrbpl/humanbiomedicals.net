"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import {
  ShieldCheck,
  Award,
  Microscope,
  Stethoscope,
  HeartHandshake,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Quality Assurance",
      desc: "Every hematology analyzer, biochemistry system, and diagnostic instrument undergoes rigorous ISO-standard quality verification.",
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Certified Excellence",
      desc: "Authorized distribution and installation of world-class biomedical equipment with comprehensive warranty and AMC coverage.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
      title: "Client-Centric Support",
      desc: "24/7 technical consultation, prompt engineer visits, and rapid spare parts delivery for hospitals and pathology labs.",
    },
    {
      icon: <Microscope className="w-8 h-8 text-teal-600" />,
      title: "Cutting-Edge Tech",
      desc: "Empowering diagnostic centers across India with 3-Part & 5-Part hematology, ISE electrolytes, and automated ELISA systems.",
    },
  ];

  const milestones = [
    { number: "10+", label: "Years Industry Leadership" },
    { number: "500+", label: "Hospitals & Laboratories Served" },
    { number: "100%", label: "Genuine Product Guarantee" },
    { number: "50+", label: "Districts Covered Across India" },
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Human Biomedical"
        subtitle="Empowering healthcare providers, pathology laboratories, and diagnostic centers with world-class biomedical equipment and technical support."
      />

      {/* Main Overview Section (Light Theme) */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-200/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Interactive Feature Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative rounded-[36px] bg-white border border-emerald-100 shadow-[0_20px_60px_rgba(0,183,160,0.08)] p-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-sm">
                <Building2 size={16} className="text-emerald-600" />
                <span>Our Corporate Vision</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Pioneering Precision Medical Equipment & Diagnostic Solutions
              </h3>

              <p className="text-slate-600 leading-relaxed text-base">
                Established with a vision to revolutionize medical diagnostics,{" "}
                <strong className="text-emerald-700 font-semibold">Human Biomedical</strong> is a trusted supplier and provider of advanced biomedical systems, hematology analyzers, biochemistry units, and pathology laboratory instruments.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital Equipment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">ICU, OT & Diagnostic Units</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Pathology Labs</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Blood Cell & Biochemistry</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Installation & AMC</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Certified Engineers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Pan-India Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Rapid On-site Service</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission Text & Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              badge="Who We Are"
              title="Your Trusted Partner in Medical Excellence"
              description="We deliver high-precision diagnostic instruments and biomedical technologies tailored for modern healthcare facilities."
            />

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              At <strong className="text-emerald-700">Human Biomedical</strong>, we understand that accurate diagnostics are the cornerstone of effective healthcare. Our mission is to equip pathology labs, hospitals, and diagnostic centers with reliable, high-performance analyzers supported by end-to-end technical assistance.
            </p>

            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              From semi-automated biochemistry analyzers to high-throughput 5-part differential cell counters, our catalog features verified technologies designed to minimize turnaround time and maximize analytical accuracy.
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">500+</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Diagnostic Centers Partnered</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">24/7</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Dedicated Service Assistance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50 border-t border-emerald-100">
        <div className="container-custom">
          <SectionTitle
            badge="Core Principles"
            title="Why Healthcare Leaders Choose Us"
            description="Our commitment to quality, transparency, and rapid service drives everything we do."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 w-fit mb-5 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {v.title}
                </h4>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Counter */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {milestones.map((m, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{m.number}</h3>
              <p className="text-emerald-100 text-sm font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}