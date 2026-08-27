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
  ShieldCheck,
  Send,
  HelpCircle,
  Headphones,
  CheckCircle2,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const pathname = usePathname();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const pathParts = pathname.split("/").filter(Boolean);
  const currentDistrict = pathParts.length > 0 ? pathParts[0] : null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Please enter your full name");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Please enter a valid email address");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    if (!form.message.trim()) {
      return toast.error("Please describe your inquiry or requirement");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "humanbiomedicalsnet",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Thank you! Your inquiry has been submitted. Our technical sales expert will call you shortly."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        "Failed to send message. Please call our hotline directly at +91 9983123469."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "humanbiomedicalsnet",
            "districts",
            currentDistrict
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log("District loading error:", err);
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
            "humanbiomedicalsnet",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.log("Contact info loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const getContactField = (labels) => {
    const found = contactInfo.find(
      (x) => labels.some((l) => x.label?.toLowerCase() === l.toLowerCase())
    );
    return found ? found.value : "";
  };

  // Robust Fallback Contact Data
  const defaultPhones = ["+91 9983123469", "+91 9983333489"];
  const defaultEmail = "rajbiosis@yahoo.in";
  const defaultAddress = "F-4, 1st Floor, Plot No. 16, D-Block Tagore Nagar, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021, India";
  const defaultHours = "Monday - Saturday: 9:00 AM - 7:00 PM (IST)";

  const phone = getContactField(["phone", "phone number", "mobile", "mobile number"]);
  const email = getContactField(["email", "email address"]) || defaultEmail;
  const address = getContactField(["address", "office address", "address/office address"]) || defaultAddress;
  const hours = getContactField(["working hours", "hours", "work hours"]) || defaultHours;

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  let phoneValues = defaultPhones;
  if (Array.isArray(phone) && phone.length > 0) {
    phoneValues = phone.map((p) => String(p).trim());
  } else if (phone !== null && phone !== undefined && phone !== "") {
    const parsed = String(phone).split(/[\n,]+/).map((p) => p.trim()).filter(Boolean);
    if (parsed.length > 0) phoneValues = parsed;
  }

  const mapAddress = encodeURIComponent(dynamicAddress);

  const contactFaqs = [
    {
      q: "What is your response time for technician service calls?",
      a: "Our dedicated field service engineers respond within 2 to 4 hours in metropolitan areas and within 24 hours across regional districts."
    },
    {
      q: "Can I request an on-site equipment demonstration before buying?",
      a: "Yes! We arrange live product demonstrations for hematology analyzers, biochemistry units, and electrolyte systems for clinical lab directors."
    },
    {
      q: "Do you supply testing reagents and consumables along with equipment?",
      a: "Absolutely. We maintain a continuous cold-chain stock of hematology diluents, lyse reagents, biochemistry controls, and calibrators."
    },
    {
      q: "How can I obtain a formal quotation for hospital procurement?",
      a: "Submit your equipment requirements using the message form on this page or email your RFP to rajbiosis@yahoo.in for instant commercial quotes."
    }
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Human Biomedical"
        subtitle="Get direct access to biomedical equipment sales specialists, engineer support desks, and fast quote generation across India."
      />

      {/* Main Contact Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        <div className="container-custom">
          
          {/* Top Intro Bar */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-2 rounded-full font-semibold text-sm shadow-sm mb-4">
              <Headphones size={18} className="text-emerald-600" />
              <span>Direct Customer & Service Desk</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Connect With Our Medical Equipment Specialists
            </h2>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether you need analyzer pricing, urgent field technician visits, AMC contract renewals, or pathology lab planning support, our team is at your service.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Cards Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Emergency Hotline Callout */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Direct Breakdown Hotline</span>
                    <h4 className="text-lg font-bold">24/7 Technician Emergency Support</h4>
                  </div>
                </div>
                <p className="text-xs text-emerald-50 leading-relaxed mb-4">
                  For immediate analyzer repairs or laboratory machine breakdowns, call our direct engineering line:
                </p>
                <div className="flex flex-wrap gap-2">
                  {phoneValues.map((num, idx) => (
                    <a
                      key={idx}
                      href={`tel:${num}`}
                      className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-50 transition shadow-sm"
                    >
                      <Phone size={16} />
                      <span>{num}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Direct Phone & WhatsApp</h4>
                  <p className="text-xs text-slate-500 mb-2">Mon - Sat from 9:00 AM to 7:00 PM</p>
                  <div className="text-slate-700 font-semibold space-y-1">
                    {phoneValues.map((num, idx) => (
                      <div key={idx}>
                        <a href={`tel:${num}`} className="hover:text-emerald-600 transition block">
                          {num}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Sales & Official Email</h4>
                  <p className="text-xs text-slate-500 mb-2">Send official RFPs, purchase orders & inquiries</p>
                  <a href={`mailto:${email}`} className="text-slate-700 font-semibold hover:text-emerald-600 transition block">
                    {email}
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Headquarters & Service Depot</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {dynamicAddress}
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Clock3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Working Hours</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    {hours}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Interactive Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[36px] p-8 sm:p-10 border border-emerald-100 shadow-[0_20px_60px_rgba(0,183,160,0.08)]">
              
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Send size={20} />
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Request Equipment Price or Service Visit
                </h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Complete the inquiry form below. Our technical consultant will evaluate your clinical lab requirements and get back to you with pricing and product availability.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@laboratory.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="e.g. 5-Part Hematology Price Quote"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Requirement Details *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Specify equipment models, daily sample volumes, clinic location, or repair service needed..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-slate-50/50 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>Your information is kept 100% confidential under our medical privacy policy.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Direct Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

          {/* Map Location Section */}
          <div className="mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Visit Our Regional Facility
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Our main service hub and equipment demonstration room in Jaipur, Rajasthan.
                </p>
              </div>

              <a
                href={`https://maps.google.com/?q=${mapAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition"
              >
                <MapPin size={16} />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="rounded-[32px] overflow-hidden border border-emerald-100 shadow-md h-[420px]">
              <iframe
                src={`https://maps.google.com/maps?q=${mapAddress}&z=14&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                title="Human Biomedical Office Location"
                className="border-0 w-full h-full"
              />
            </div>
          </div>

          {/* Contact FAQ Section */}
          <div className="mt-20 bg-slate-50 border border-emerald-100 rounded-[36px] p-8 lg:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <HelpCircle size={14} />
                <span>Help Desk FAQ</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Asked Contact Questions
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {contactFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                    <span className="text-emerald-600 font-extrabold">Q:</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}