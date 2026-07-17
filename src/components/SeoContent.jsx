export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white">

            <div className="container-custom">

                {/* Heading */}

                <div className="max-w-4xl mx-auto text-center mb-16">

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Trusted Healthcare Partner
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                        Biomedical Equipment Supplier in{" "}
                        <span className="text-emerald-600">
                            {location}
                        </span>
                    </h2>

                    <div className="w-28 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-6"></div>

                </div>

                {/* Content */}

                <div className="grid lg:grid-cols-2 gap-8">

                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <p className="text-slate-600 leading-8 text-lg">
                            Central Biomedicals is a trusted supplier of biomedical
                            and laboratory equipment in <strong>{location}</strong>.
                            We provide CBC Machines, Hematology Analyzers,
                            Biochemistry Analyzers, Urine Analyzers, ELISA Readers,
                            and diagnostic instruments for hospitals, pathology labs,
                            and healthcare facilities.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <p className="text-slate-600 leading-8 text-lg">
                            Our mission is to provide reliable and high-quality
                            laboratory equipment to healthcare professionals across
                            India. We work with diagnostic centres, hospitals,
                            research laboratories, and medical institutions to deliver
                            advanced biomedical solutions.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <p className="text-slate-600 leading-8 text-lg">
                            We offer installation assistance, product guidance, AMC
                            services, and technical support for a wide range of
                            laboratory instruments. Whether you are setting up a new
                            diagnostic laboratory or upgrading existing equipment, our
                            team can help you choose the right solution.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <p className="text-slate-600 leading-8 text-lg">
                            Central Biomedicals supplies biomedical equipment across
                            multiple districts and cities, helping healthcare
                            providers improve testing efficiency, workflow, and
                            diagnostic accuracy with reliable solutions.
                        </p>
                    </div>

                </div>

                {/* FAQ */}

                <div className="mt-24">

                    <div className="text-center mb-14">

                        <h2 className="text-4xl font-extrabold text-slate-900">
                            Frequently Asked Questions
                        </h2>

                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-5"></div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-white rounded-2xl border border-emerald-100 p-7 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="text-slate-600 leading-7">
                                Yes, we supply biomedical and laboratory equipment
                                across multiple districts and cities throughout India.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-emerald-100 p-7 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="text-slate-600 leading-7">
                                We provide CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers, Urine
                                Analyzers, and many other diagnostic instruments.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-emerald-100 p-7 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Do you provide installation support?
                            </h3>

                            <p className="text-slate-600 leading-7">
                                Yes, installation assistance, user training, and
                                technical support are available depending on the
                                equipment and location.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-emerald-100 p-7 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="text-slate-600 leading-7">
                                Hospitals, pathology laboratories, diagnostic centres,
                                research institutions, and healthcare facilities can
                                purchase biomedical equipment from us.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}