export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >

      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>

      {/* Decorative Line */}
      <div
        className={`mt-5 ${center ? "flex justify-center" : ""
          }`}
      >
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
      </div>

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
        {description}
      </p>

    </div>
  );
}