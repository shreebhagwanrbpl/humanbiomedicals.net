"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-28 lg:py-36">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-300/25 rounded-full blur-[120px]" />

      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-[120px]" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center max-w-4xl mx-auto"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 px-5 py-2 rounded-full font-semibold shadow-md mb-8">

            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>

            Trusted Biomedical Solutions

          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">

            {title}

          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-slate-600 text-lg lg:text-xl leading-9 max-w-3xl mx-auto">

            {subtitle}

          </p>

          {/* Decorative Line */}
          <div className="mt-10 flex justify-center">

            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}