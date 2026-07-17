import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden bg-white rounded-[30px] p-8 border border-emerald-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-7">
        {description}
      </p>

      {/* Background Glow */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-emerald-100 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500"></div>

    </div>
  );
}