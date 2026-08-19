import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductCard = React.memo(function ProductCard({ product, district }) {
  const imgSrc = product.images?.[0] || product.image || "/placeholder.jpg";
  const altText = `${product.title || "Biomedical Equipment"} - ${product.brand || "Human Biomedical"}`;
  const targetHref = district
    ? `/${district}/items/${product.slug}`
    : `/items/${product.slug}`;

  return (
    <article
      id={product.slug}
      className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_180px] gap-5 lg:gap-8 items-center">
        {/* Image */}
        <Link href={targetHref} className="relative h-[180px] sm:h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center group">
          {imgSrc.startsWith("http") ? (
            <img
              src={imgSrc}
              alt={altText}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <Image
              src={imgSrc}
              alt={altText}
              width={240}
              height={220}
              className="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors">
            <Link href={targetHref}>{product.title}</Link>
          </h3>
          <p className="mt-4 text-slate-600 leading-8">
            {product.description ||
              product.desc ||
              "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase text-slate-400">Brand</p>
              <p className="font-semibold mt-1 text-slate-800">{product.brand || "N/A"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase text-slate-400">Model</p>
              <p className="font-semibold mt-1 text-slate-800">{product.model || "N/A"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase text-slate-400">Instrument</p>
              <p className="font-semibold mt-1 text-slate-800">{product.instrument || "N/A"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase text-slate-400">Category</p>
              <p className="font-semibold mt-1 text-slate-800">{product.category || "Biomedical"}</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center lg:justify-end">
          <Link
            href={targetHref}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 !text-white font-semibold shadow-md hover:shadow-emerald-300/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
