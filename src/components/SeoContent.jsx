export default function SeoContent({ city = "" }) {
  const location = city || "India";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you supply medical lab machines in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes! Human Biomedical supplies, installs, and repairs blood cell counters, biochemistry units, and laboratory testing equipment in ${location} and nearby areas.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I get price details for lab equipment in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Simply contact our team via phone or fill out our quick quote form to get instant prices and special discounts for ${location}.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide machine setup and repair services in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our trained service engineers visit your lab directly to set up new machines, calibrate testing settings, and provide regular maintenance in ${location}.`
        }
      }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 border-t border-emerald-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-custom">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold shadow-sm mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Trusted Medical Machine Dealer & Service Provider</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Reliable Medical Lab Equipment & Service in{" "}
            <span className="text-emerald-600 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              {location}
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We supply high-accuracy CBC blood counters, organ function testing units, electrolyte machines, and testing chemicals for diagnostic clinics across {location}.
          </p>

          <div className="w-28 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6" />
        </div>

        {/* SEO Grid Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Accurate Laboratory Machines in {location}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              <strong>Human Biomedical</strong> is a trusted local supplier of diagnostic testing equipment in <strong>{location}</strong>. We deliver blood cell counters, biochemistry machines, electrolyte testers, centrifuges, and testing chemicals designed for quick daily patient testing.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Complete Setup Support For New Pathology Labs
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              If you are starting a new clinic or upgrading existing testing tools in {location}, our team helps you choose the right tools according to your sample volume so you get clear and reliable test reports every day.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              On-Site Machine Installation & Engineer Support
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Every equipment purchase comes with on-site installation by qualified service engineers. We handle initial machine tuning, staff training, and offer yearly maintenance plans (AMC) so your laboratory never suffers downtime in {location}.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Original Equipment & Fast Delivery in {location}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              We provide 100% genuine medical devices backed by factory warranty. Our logistics team ensures safe packaging and quick delivery straight to your laboratory in {location}.
            </p>
          </div>
        </div>

        {/* Structured FAQ Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions ({location})
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Do you deliver and install equipment in {location}?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes, we deliver, install, and service all diagnostic and pathology equipment across {location} and nearby districts.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                What kinds of diagnostic tools are available?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We supply CBC Hematology Counters, Biochemistry Testers, Electrolyte Analyzers, ELISA Readers, Pipettes, and quality testing reagents.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                How can I get price quotes in {location}?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                You can submit a inquiry form on our website or call our support desk to receive instant price details for {location}.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Do you provide warranty and machine service?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes, all devices come with standard warranty coverage, optional annual repair contracts, and fast engineer breakdown assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}