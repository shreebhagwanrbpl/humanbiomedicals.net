"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  HeartPulse,
  Truck,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fallback services if database record is empty or loading
  const fallbackServices = [
    {
      title: "Medical Equipment Supply",
      desc: "Supply of tested 3-part & 5-part blood cell counters, biochemistry analyzers, and electrolyte testing tools.",
      icon: <Activity size={32} className="text-emerald-600" />,
    },
    {
      title: "Machine Installation & Tuning",
      desc: "On-site machine setup, exact calibration of testing settings, and test report checks by certified engineers.",
      icon: <Wrench size={32} className="text-teal-600" />,
    },
    {
      title: "Yearly Maintenance Contracts",
      desc: "Regular machine checkups, preventive servicing, and fast breakdown repairs to keep your lab running continuously.",
      icon: <ShieldCheck size={32} className="text-emerald-600" />,
    },
    {
      title: "Lab Planning Assistance",
      desc: "Expert advice to pick the right machines according to your daily test volume, budget, and available lab space.",
      icon: <Microscope size={32} className="text-teal-600" />,
    },
    {
      title: "Testing Reagents & Chemicals",
      desc: "Reliable supply of diluents, lyse solutions, biochemistry reagents, and control samples.",
      icon: <FlaskConical size={32} className="text-emerald-600" />,
    },
    {
      title: "Staff Training & Helpdesk",
      desc: "Friendly training for lab technicians and quick phone/visit assistance whenever you face machine questions.",
      icon: <Stethoscope size={32} className="text-teal-600" />,
    },
  ];

  const defaultIcons = [
    <Activity size={32} className="text-emerald-600" />,
    <FlaskConical size={32} className="text-teal-600" />,
    <ShieldCheck size={32} className="text-emerald-600" />,
    <Stethoscope size={32} className="text-teal-600" />,
    <Wrench size={32} className="text-emerald-600" />,
    <Microscope size={32} className="text-teal-600" />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "humanbiomedicalsnet", "pages", "services")
        );

        if (snap.exists() && snap.data().services?.length > 0) {
          setServices(snap.data().services);
        } else {
          setServices(fallbackServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Medical & Diagnostic Services"
        subtitle="Complete lab solutions including machine supply, setup, technician training, and fast repair support across India."
      />

      {/* Services Grid (Light Theme) */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        {/* Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-200/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="What We Offer"
            title="Complete Support For Medical Testing Labs"
            description="We help you select, install, and maintain all diagnostic testing instruments with zero stress."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[32px] p-8 border border-emerald-100 shadow-sm animate-pulse"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 mb-6" />
                  <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded-full w-full" />
                    <div className="h-4 bg-slate-200 rounded-full w-5/6" />
                  </div>
                </div>
              ))
              : services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon || defaultIcons[index % defaultIcons.length]}
                  title={service.title}
                  description={service.desc || service.description}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Structured 3-Step Work Process */}
      <section className="relative overflow-hidden py-20 bg-slate-50 border-t border-emerald-100">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Simple 3-Step Process"
            title="How We Work With Your Lab"
            description="We make getting and maintaining medical machines easy and straightforward."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
                title: "Understand Your Needs",
                desc: "We check your lab size, budget, and daily test count to recommend the best machines for your clinic.",
              },
              {
                step: "02",
                icon: <Truck className="w-8 h-8 text-teal-600" />,
                title: "Delivery, Setup & Training",
                desc: "Safe delivery to your clinic, complete machine installation, and easy training for your lab staff.",
              },
              {
                step: "03",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
                title: "Lifetime Repair & AMC",
                desc: "Regular checkups, continuous supply of test chemicals, and quick engineer visits whenever needed.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-[32px] border border-emerald-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-emerald-600/30 group-hover:text-emerald-600 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
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