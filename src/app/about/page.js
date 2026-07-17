"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Central Biomedicals"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Image Frame */}
            <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-100 p-5 shadow-2xl">

              <div className="rounded-[30px] overflow-hidden bg-white h-[600px] flex items-center justify-center">

                <Image
                  src={DDS}
                  alt="About Central Biomedicals"
                  width={1200}
                  height={900}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />

              </div>

            </div>

            {/* Floating Experience Card */}
            <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-3xl px-6 py-5 shadow-2xl">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                10+
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Years
                </h3>

                <p className="text-slate-500">
                  of Excellence
                </p>
              </div>

            </div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 text-slate-600 leading-8 text-lg">
              At <strong className="text-emerald-600">Central Biomedicals</strong>,
              we are committed to delivering premium-quality healthcare and
              biomedical technologies that improve diagnostics, laboratory
              performance, and overall medical efficiency.
            </p>

            <p className="mt-6 text-slate-600 leading-8 text-lg">
              Our mission is to empower hospitals, pathology laboratories,
              diagnostic centres, and healthcare professionals with trusted
              equipment, expert consultation, installation support, and
              innovative biomedical solutions.
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              <div className="group bg-white border border-emerald-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-5 shadow-lg">
                  ✓
                </div>

                <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Premium Equipment
                </h4>

                <p className="text-slate-500 mt-3 leading-7">
                  High-quality diagnostic and laboratory technologies from trusted manufacturers.
                </p>

              </div>

              <div className="group bg-white border border-emerald-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-5 shadow-lg">
                  ★
                </div>

                <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Expert Support
                </h4>

                <p className="text-slate-500 mt-3 leading-7">
                  Professional consultation, installation assistance, AMC, and technical support.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>
    </>
  );
}