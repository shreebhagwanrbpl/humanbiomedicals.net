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
  Settings,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "CE & ISO Quality Compliance",
      desc: "Every blood counter, biochemistry analyzer, and ISE module is subjected to rigorous multi-point quality testing prior to client delivery.",
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Direct OEM Warranty Protection",
      desc: "All instruments carry authentic factory warranties, genuine replacement components, and transparent maintenance coverage agreements.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
      title: "Rapid Response Engineering Fleet",
      desc: "Our qualified field engineers provide fast 2-4 hour emergency breakdown visits to maintain zero downtime for critical diagnostic labs.",
    },
    {
      icon: <Microscope className="w-8 h-8 text-teal-600" />,
      title: "Advanced Clinical Instrumentation",
      desc: "We supply 3-Part & 5-Part hematology systems, semi & fully-automated biochemistry units, electrolyte sensors, and cold-chain IVD reagents.",
    },
  ];

  const milestones = [
    { number: "10+", label: "Years Dedicated Medical Service" },
    { number: "500+", label: "Pathology Centers Equipped" },
    { number: "100%", label: "OEM Certified Equipment" },
    { number: "50+", label: "Regional Districts Covered" },
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Human Biomedical"
        subtitle="Pioneering diagnostic instrument distribution, laboratory setup solutions, and expert field engineering support across India."
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
                <span>Our Corporate Mission & Vision</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Empowering Pathology Laboratories With Uncompromising Diagnostic Accuracy
              </h3>

              <p className="text-slate-600 leading-relaxed text-base">
                Established as a leader in healthcare technology distribution,{" "}
                <strong className="text-emerald-700 font-semibold">Human Biomedical</strong> specializes in delivering state-of-the-art hematology analyzers, clinical chemistry workstations, electrolyte modules, and certified IVD reagents.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital ICU Units</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Critical Care & Electrolyte Sensors</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Pathology Instrumentation</h4>
                    <p className="text-xs text-slate-500 mt-0.5">3-Part & 5-Part Cell Counters</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">NABL Alignment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Certified Calibration Standards</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">On-Site Field Engineers</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Rapid On-Demand Assistance</p>
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
              badge="Biomedical Excellence"
              title="Pioneering Diagnostic Reliability Across India"
              description="We bridge advanced medical engineering with practical daily healthcare needs, giving clinical teams complete confidence in every test report."
            />

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              At <strong className="text-emerald-700 font-semibold">Human Biomedical</strong>, we understand that behind every diagnostic sample lies a patient waiting for clear, timely answers. Our team works closely with hospital directors, pathologists, and lab owners to select and maintain high-precision equipment.
            </p>

            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              From initial lab room planning to electrical stabilization, liquid reagent calibration, and staff operation certification, we ensure your clinical laboratory operates at peak efficiency year after year.
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">500+</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Diagnostic Centers Equipped</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">24/7</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Field Engineer Response</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50 border-t border-emerald-100">
        <div className="container-custom">
          <SectionTitle
            badge="Engineering Guarantees"
            title="Our Quality & Field Engineering Principles"
            description="We adhere to direct OEM supplier standards, clear communication, and rapid on-site breakdown resolution."
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
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {v.title}
                </h4>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed">
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