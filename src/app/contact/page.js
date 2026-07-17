"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);
  const [contactInfo, setContactInfo] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);
  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const currentDistrict =
    pathParts.length > 0
      ? pathParts[0]
      : null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error(
        "Name is required"
      );
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "centralbiomedicals",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            currentDistrict
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
  }, [currentDistrict]);
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);



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

  const hours =
    contactInfo.find(
      (x) => x.label === "Working Hours"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>

            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with Central Biomedicals for premium diagnostic and biomedical solutions."
      />

      {/* Contact Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16">

          {/* ================= Left ================= */}
          <div>

            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2 rounded-full font-semibold shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Contact Information
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Let's Start a Conversation
            </h2>

            <p className="mt-6 text-slate-600 text-lg leading-8 max-w-xl">
              Reach out to us for healthcare consultation,
              biomedical equipment, laboratory solutions,
              installation support, and diagnostic services.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mt-12">

              {/* Phone */}
              <div className="group flex items-start gap-5 bg-white border border-emerald-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
                  <Phone size={24} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Phone Number
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {phone}
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="group flex items-start gap-5 bg-white border border-emerald-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
                  <Mail size={24} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Email Address
                  </h4>

                  <p className="text-slate-600 mt-2 break-all">
                    {email}
                  </p>
                </div>

              </div>

              {/* Address */}
              <div className="group flex items-start gap-5 bg-white border border-emerald-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
                  <MapPin size={24} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Office Address
                  </h4>

                  <p className="text-slate-600 mt-2 leading-7">
                    {dynamicAddress}
                  </p>
                </div>

              </div>

              {/* Hours */}
              <div className="group flex items-start gap-5 bg-white border border-emerald-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
                  <Clock3 size={24} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Working Hours
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {hours}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ================= Right ================= */}
          <div className="bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-[40px] p-8 lg:p-10 shadow-[0_25px_70px_rgba(16,185,129,0.12)]">

            <h3 className="text-3xl font-bold text-slate-900">
              Send Us a Message
            </h3>

            <p className="text-slate-500 mt-3">
              Fill out the form below and our biomedical
              experts will get back to you as soon as possible.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 bg-white outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 bg-white outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 bg-white outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 bg-white outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-2xl border border-slate-200 px-5 py-4 bg-white outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}