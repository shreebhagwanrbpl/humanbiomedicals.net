"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "humanbiomedicalsnet",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
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
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare technologies, biomedical equipment, and laboratory solutions designed for modern diagnostics and medical excellence."
            center
          />

          <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (

                <div
                  key={index}
                  className="bg-white rounded-[30px] p-8 border border-emerald-100 shadow-lg animate-pulse"
                >

                  {/* Icon Skeleton */}
                  <div className="w-20 h-20 rounded-3xl bg-emerald-100 mb-8"></div>

                  {/* Title */}
                  <div className="h-7 bg-slate-200 rounded-lg w-3/4 mb-6"></div>

                  {/* Description */}
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded-full"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-11/12"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-8/12"></div>
                  </div>

                </div>

              ))
              : services.map((service, index) => (

                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />

              ))}

          </div>

        </div>

      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to deliver reliable biomedical equipment, laboratory systems, and healthcare solutions with complete customer satisfaction."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We understand your hospital, laboratory, or diagnostic centre requirements and recommend the most suitable biomedical solutions.",
              },
              {
                step: "02",
                title: "Implementation",
                desc: "Our team supplies, installs, and configures biomedical equipment to ensure smooth and efficient operation.",
              },
              {
                step: "03",
                title: "Support",
                desc: "We provide technical assistance, preventive maintenance, AMC services, and long-term customer support.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-[32px] border border-emerald-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >

                {/* Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                {/* Step Number */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-3xl font-extrabold flex items-center justify-center shadow-lg mb-8 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-8">
                  {item.desc}
                </p>

                {/* Decorative Glow */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

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