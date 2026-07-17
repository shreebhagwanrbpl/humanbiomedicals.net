"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">

        <div className="bg-white/90 backdrop-blur-xl rounded-[40px] p-10 lg:p-16 border border-emerald-100 shadow-[0_20px_60px_rgba(16,185,129,0.08)]">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
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
                className="group relative text-center bg-white rounded-3xl border border-emerald-100 p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >

                {/* Top Border */}
                <div className="absolute top-0 left-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                  {item.icon}

                </div>

                {/* Number */}
                <h3 className="mt-7 text-5xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">

                  {item.number}

                </h3>

                {/* Label */}
                <p className="mt-3 text-slate-500 text-lg">

                  {item.label}

                </p>

                {/* Glow */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-emerald-100 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500"></div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}