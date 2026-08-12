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
      title: "Diagnostic Equipment Supply",
      desc: "Authorized distribution of 3-Part & 5-Part hematology analyzers, fully automated biochemistry systems, and ISE electrolyte analyzers.",
      icon: <Activity size={32} className="text-emerald-600" />,
    },
    {
      title: "Installation & Calibration",
      desc: "Turnkey equipment installation, precise parameter calibration, and control testing carried out by certified biomedical engineers.",
      icon: <Wrench size={32} className="text-teal-600" />,
    },
    {
      title: "AMC & Preventive Maintenance",
      desc: "Comprehensive Annual Maintenance Contracts (AMC & CMC) ensuring regular inspection, zero downtime, and long equipment lifespan.",
      icon: <ShieldCheck size={32} className="text-emerald-600" />,
    },
    {
      title: "Laboratory Setup Consultation",
      desc: "Expert guidance for hospital and pathology lab layout planning, instrument selection, and regulatory compliance assistance.",
      icon: <Microscope size={32} className="text-teal-600" />,
    },
    {
      title: "Reagents & Consumables Supply",
      desc: "Continuous supply of high-grade diluents, lyse solutions, biochemistry reagents, and control serums for precise test results.",
      icon: <FlaskConical size={32} className="text-emerald-600" />,
    },
    {
      title: "Technical Support & Training",
      desc: "On-site and remote training for lab technicians, fast troubleshooting response, and 24/7 technical helpdesk.",
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
        title="Biomedical & Diagnostic Services"
        subtitle="Delivering end-to-end equipment distribution, professional installation, calibration, and 24/7 maintenance for healthcare facilities across India."
      />

      {/* Services Grid (Light Theme) */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        {/* Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-200/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="What We Offer"
            title="Comprehensive Biomedical Solutions"
            description="From initial laboratory design to continuous technical maintenance, we provide complete lifecycle support for diagnostic technologies."
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
            badge="How We Support You"
            title="Seamless & Professional Workflow"
            description="We ensure a hassle-free experience from equipment selection to operational deployment."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
                title: "Requirements & Consultation",
                desc: "We analyze your hospital or laboratory throughput requirements, budget, and space to recommend optimal analyzer configurations.",
              },
              {
                step: "02",
                icon: <Truck className="w-8 h-8 text-teal-600" />,
                title: "Supply, Setup & Calibration",
                desc: "Safe transport with protective packaging, followed by professional installation, quality control testing, and technician training.",
              },
              {
                step: "03",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
                title: "AMC & Long-Term Support",
                desc: "Continuous technical maintenance, reagent supply guarantees, and emergency engineer assistance for uninterrupted operations.",
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