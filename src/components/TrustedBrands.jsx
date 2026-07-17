export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 border-y border-emerald-100">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-200/20 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 font-semibold shadow-sm">

            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

            Trusted Partners

          </div>

          <h2 className="mt-6 text-3xl lg:text-4xl font-extrabold text-slate-900">
            Trusted by Healthcare &
            <br />
            Biomedical Organizations
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We proudly work with hospitals, pathology laboratories,
            diagnostic centres, medical institutions, and healthcare
            professionals across India.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>

        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-3xl border border-emerald-100 p-8 text-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              {/* Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

              {/* Logo Circle */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                {brand.charAt(0)}
              </div>

              {/* Brand Name */}
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                {brand}
              </h3>

              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-emerald-100 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}