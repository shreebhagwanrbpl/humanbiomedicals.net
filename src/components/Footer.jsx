"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-bold">
              <span className="text-emerald-400">
                Central
              </span>{" "}
              <span className="text-white">
                Biomedicals
              </span>
            </h2>

            <p className="mt-6 text-slate-300 leading-8">
              Delivering trusted diagnostic and biomedical
              solutions with innovation, quality, precision,
              and dependable healthcare support across India.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link href={makeLink("/")} className="text-slate-300 hover:text-emerald-400 transition">
                Home
              </Link>

              <Link href={makeLink("/about")} className="text-slate-300 hover:text-emerald-400 transition">
                About
              </Link>

              <Link href={makeLink("/services")} className="text-slate-300 hover:text-emerald-400 transition">
                Services
              </Link>

              <Link href={makeLink("/items")} className="text-slate-300 hover:text-emerald-400 transition">
                Products
              </Link>

              <Link href={makeLink("/contact")} className="text-slate-300 hover:text-emerald-400 transition">
                Contact
              </Link>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Our Services
            </h3>

            <div className="space-y-4 text-slate-300">

              <p>Diagnostic Equipment</p>
              <p>Laboratory Solutions</p>
              <p>Biomedical Instruments</p>
              <p>AMC & Maintenance Support</p>
              <p>Installation & Training</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-4">

                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MapPin size={18} className="text-emerald-400" />
                </div>

                <p className="text-slate-300 leading-7">
                  {dynamicAddress}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Phone size={18} className="text-emerald-400" />
                </div>

                <p className="text-slate-300">
                  {phone}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Mail size={18} className="text-emerald-400" />
                </div>

                <p className="text-slate-300 break-all">
                  {email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-400 text-sm">
            © 2026 <span className="text-white font-semibold">Central Biomedicals</span>. All Rights Reserved.
          </p>

          <p className="text-slate-400 text-sm">
            Designed with ❤️ for Modern Healthcare & Diagnostics.
          </p>

        </div>

      </div>

    </footer>
  );
}