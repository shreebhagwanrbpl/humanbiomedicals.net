export default function SeoContent({ city = "" }) {
  const location = city || "India";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you supply biomedical equipment in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Human Biomedical is a premier supplier and dealer of hematology analyzers, biochemistry analyzers, ELISA readers, and laboratory equipment in ${location} and across all major districts.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the price of CBC Machines & Biochemistry Analyzers in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Equipment pricing depends on specifications (3-Part vs 5-Part Differential, semi vs fully automated). Contact Human Biomedical for direct quotations and best price offers in ${location}.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide installation and AMC services in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we offer complete installation, parameter calibration, user training, and Annual Maintenance Contracts (AMC/CMC) with rapid engineer support in ${location}.`
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
            <span>Authorized Medical & Laboratory Equipment Supplier</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Leading Biomedical Equipment Supplier & Dealer in{" "}
            <span className="text-emerald-600 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              {location}
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Supplying certified 3-part & 5-part hematology cell counters, fully automated biochemistry analyzers, ISE electrolyte units, ELISA readers, and pathology reagents in {location}.
          </p>

          <div className="w-28 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6" />
        </div>

        {/* SEO Grid Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              High-Precision Pathology & Diagnostic Equipment in {location}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              <strong>Human Biomedical</strong> is a trusted distributor and service provider of medical laboratory instruments in <strong>{location}</strong>. We specialize in supplying CBC Machines, 3-Part & 5-Part Hematology Analyzers, Semi & Fully Automated Biochemistry Analyzers, Electrolyte Analyzers, Urine Analyzers, and Microplate ELISA Readers for diagnostic labs, pathology centers, and hospitals.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Comprehensive Hospital & Laboratory Solutions
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Our commitment is to elevate diagnostic standards in {location}. We collaborate with clinical pathologists, lab technicians, medical directors, and healthcare institutions to deliver certified equipment, ensuring fast sample processing, minimal maintenance, and accurate test reports.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Installation, Calibration & Technical AMC Support
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Buying biomedical equipment with Human Biomedical includes comprehensive setup assistance. Our team of certified service engineers conducts on-site installation, parameter calibration, quality control verification, user operational training, and Annual Maintenance Contracts (AMC/CMC) in {location}.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Buy Certified Analyzers & Reagents in {location}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Whether you are establishing a new diagnostic pathology laboratory or upgrading your hospital testing infrastructure in {location}, Human Biomedical delivers reliable systems at competitive prices with rapid logistics support across India.
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
                Do you supply biomedical equipment in {location}?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes, Human Biomedical supplies, installs, and services complete laboratory and diagnostic equipment across {location} and neighboring districts.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Which analyzers and instruments are available?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We supply CBC Hematology Analyzers, Biochemistry Analyzers, Electrolyte Analyzers, ELISA Readers, Micro-Pipettes, Centrifuges, and laboratory reagents.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                How do I request a quotation in {location}?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                You can fill out the quote form on any product page or contact our customer desk directly to receive pricing and availability in {location}.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Do you offer warranty and maintenance support?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                All our biomedical products come with standard manufacturer warranty, optional AMC extensions, and full technical breakdown support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}