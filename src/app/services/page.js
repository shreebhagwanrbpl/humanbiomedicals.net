"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Activity,
  Truck,
  FileCheck,
  Settings2,
  Award,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultIcons = [
    <Activity key="1" size={32} className="text-emerald-600" />,
    <Settings2 key="2" size={32} className="text-teal-600" />,
    <ShieldCheck key="3" size={32} className="text-emerald-600" />,
    <Microscope key="4" size={32} className="text-teal-600" />,
    <FlaskConical key="5" size={32} className="text-emerald-600" />,
    <Stethoscope key="6" size={32} className="text-teal-600" />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/site-data?type=services");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data.services)) {
            setServices(json.data.services);
          } else if (Array.isArray(json.data)) {
            setServices(json.data);
          } else {
            setServices([]);
          }
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
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
        title="Biomedical Engineering & Laboratory Services"
        subtitle="End-to-end technical support including diagnostic machine supply, precise calibration, technician training, and 24/7 breakdown assistance."
      />

      {/* Services Grid (Light Theme) */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        {/* Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-200/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Engineering Solutions"
            title="Comprehensive Technical Care For Diagnostic Laboratories"
            description="We support clinical laboratories, hospital ICUs, and pathology centers with calibrated medical equipment, OEM reagents, and expert field engineers."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
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
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon || defaultIcons[index % defaultIcons.length]}
                  title={service.title}
                  description={service.desc || service.description}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-emerald-100">
                <p className="text-base font-semibold">Services list updating from admin...</p>
                <p className="text-xs text-slate-400 mt-1">Please contact our support desk for comprehensive service catalog details.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Structured 4-Stage Technical Workflow */}
      <section className="relative overflow-hidden py-20 bg-slate-50 border-t border-emerald-100">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Engineering Support Protocol"
            title="Our 4-Stage Equipment Implementation Workflow"
            description="From initial clinical consultation to lifetime annual maintenance contracts, we guarantee zero downtime for your medical laboratory."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              {
                step: "01",
                icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
                title: "Needs & Throughput Audit",
                desc: "We evaluate your daily test volumes, space constraints, and clinical requirements to recommend optimal analyzer capacity.",
              },
              {
                step: "02",
                icon: <Truck className="w-8 h-8 text-teal-600" />,
                title: "Setup & Calibration",
                desc: "Certified technicians install the unit, establish drain/waste lines, configure liquid reagents, and perform multi-point calibration.",
              },
              {
                step: "03",
                icon: <Award className="w-8 h-8 text-emerald-600" />,
                title: "Staff Protocol Training",
                desc: "Hands-on operator training covering daily start-up cycles, sample loading, software QC tracking, and routine cleaning maintenance.",
              },
              {
                step: "04",
                icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
                title: "Lifetime PMC & Emergency Visit",
                desc: "Scheduled preventive maintenance visits, cold-chain reagent restocks, and rapid emergency breakdown engineering visits.",
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

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
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