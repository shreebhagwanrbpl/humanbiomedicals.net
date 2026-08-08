"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-emerald-100 shadow-sm">

      <div className="container-custom h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")} className="group">

          <h1 className="text-2xl font-extrabold tracking-tight">

            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Human
            </span>

            <span className="text-slate-900">
              {" "}Biomedical
            </span>

          </h1>

        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative text-[15px] font-semibold text-slate-700 hover:text-emerald-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>

          ))}

        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 hover:scale-105 transition-all duration-300">
              Get Quote
            </button>

          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 transition hover:bg-emerald-100"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >

        <div className="bg-white border-t border-emerald-100 shadow-lg">

          <nav className="flex flex-col p-6">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b border-slate-100 text-slate-700 font-medium hover:text-emerald-600 transition"
              >
                {link.name}
              </Link>

            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
              className="mt-6"
            >

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-300/40 transition-all duration-300">
                Get Quote
              </button>

            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}