"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        " Human Biomedical has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by hospitals, pathology laboratories, diagnostic centres, and healthcare professionals across India."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.95,
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
              className="group relative overflow-hidden bg-white rounded-[32px] p-8 border border-emerald-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

              {/* Quote Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-3xl shadow-lg mb-6">
                ❝
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-amber-400 text-xl mb-5 tracking-wide">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-8 italic">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-slate-200 my-7"></div>

              {/* User */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {item.name.charAt(0)}
                </div>

                <div>

                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h4>

                  <p className="text-slate-500">
                    {item.role}
                  </p>

                </div>

              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}