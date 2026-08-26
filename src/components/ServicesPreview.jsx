"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Medical Machine Supply",
      description:
        "High-performance blood cell counters, biochemistry units, and laboratory testing machines.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Lab Chemical Supplies",
      description:
        "Top-grade test reagents, diluents, and sample controls for everyday diagnostic testing.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Machine Repair & AMC",
      description:
        "Fast breakdown assistance, preventive maintenance, and yearly service plans by trained engineers.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Lab Setup Guidance",
      description:
        "Helpful consultation to select the right machines according to your daily patient test count.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-custom relative z-10">

        {/* Section Heading */}
        <SectionTitle
          badge="What We Do"
          title="Complete Services For Your Diagnostic Center"
          description="From choosing modern testing tools to installation, supply of testing chemicals, and ongoing maintenance, we support your lab every step."
          center
        />

        {/* Services Grid */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
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
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}