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
      title: "100% Tested Quality",
      desc: "Every blood counter and testing machine is thoroughly checked before delivery so it works perfectly in your lab.",
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Official Factory Warranty",
      desc: "All our medical devices come with real manufacturer warranty and transparent repair agreements.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
      title: "Fast Engineer Visit",
      desc: "If any issue occurs, our trained technical team reaches your clinic quickly to restore your machine.",
    },
    {
      icon: <Microscope className="w-8 h-8 text-teal-600" />,
      title: "Modern Testing Tools",
      desc: "We supply easy-to-use 3-Part & 5-Part blood counters, biochemistry units, and automated testing tools.",
    },
  ];

  const milestones = [
    { number: "10+", label: "Years Helping Hospitals" },
    { number: "500+", label: "Pathology Labs Served" },
    { number: "100%", label: "Real Factory Products" },
    { number: "50+", label: "Cities & Districts Covered" },
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Human Biomedical"
        subtitle="Helping pathology laboratories, hospitals, and clinics with easy-to-use medical testing machines and quick repair support."
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
                <span>Our Goal & Vision</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Bringing Simple & Accurate Testing Tools To Every Lab
              </h3>

              <p className="text-slate-600 leading-relaxed text-base">
                Established with a mission to simplify healthcare testing,{" "}
                <strong className="text-emerald-700 font-semibold">Human Biomedical</strong> is a dependable supplier of blood counters, biochemistry testing units, electrolyte analyzers, and lab supplies.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital Devices</h4>
                    <p className="text-xs text-slate-500 mt-0.5">ICU & Operation Theater Equipment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Pathology Tools</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Blood Cell & Organ Testers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Setup & Repair</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Trained Engineer Visits</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Quick Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Fast Response Across Districts</p>
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
              title="Your Friendly Partner For Lab Success"
              description="We deliver easy-to-use testing instruments designed to help medical teams deliver fast and correct health reports."
            />

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              At <strong className="text-emerald-700">Human Biomedical</strong>, we know how important accurate diagnostic reports are for patient health. Our goal is to equip pathology labs, hospitals, and diagnostic centers with reliable machines backed by full technical support.
            </p>

            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              Whether you need a compact semi-automated biochemistry analyzer or a high-speed 5-part blood cell counter, we guide you to choose the exact machine that fits your daily workload and budget.
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">500+</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Labs & Clinics Partnered</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <h4 className="text-2xl font-extrabold text-emerald-600">24/7</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Helpdesk Technical Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50 border-t border-emerald-100">
        <div className="container-custom">
          <SectionTitle
            badge="Our Work Standards"
            title="What Makes Our Service Special"
            description="We focus on simple communication, original products, and fast engineer visits."
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