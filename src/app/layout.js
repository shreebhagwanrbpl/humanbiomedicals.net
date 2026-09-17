import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://humanbiomedicals.net"),

  title: {
    default: "Human Biomedical | Leading Biomedical Equipment Supplier & Dealer in India",
    template: "%s | Human Biomedical",
  },

  description:
    "Human Biomedical is a premier supplier and dealer of CBC machines, 3-Part & 5-Part hematology cell counters, biochemistry analyzers, ELISA readers, electrolyte analyzers, and pathology laboratory equipment across India.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier India",
    "CBC Machine Supplier",
    "Hematology Analyzer Dealer",
    "Biochemistry Analyzer Supplier",
    "Electrolyte Analyzer Dealer",
    "Diagnostic Equipment Supplier",
    "Medical Equipment Supplier India",
    "Pathology Lab Equipment Dealer",
    "ELISA Reader Supplier",
    "Biomedical Equipment in Jaipur",
    "Biomedical Equipment in Rajasthan",
    "Biomedical Equipment Price India",
  ],

  authors: [{ name: "Human Biomedical" }],
  creator: "Human Biomedical",
  publisher: "Human Biomedical",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "Human Biomedical | Premier Biomedical & Diagnostic Equipment Supplier in India",
    description:
      "Authorized distributor of hematology analyzers, biochemistry systems, and pathology laboratory equipment across India.",
    url: "https://humanbiomedicals.net",
    siteName: "Human Biomedical",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Human Biomedical Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Human Biomedical | Biomedical & Diagnostic Equipment Supplier",
    description:
      "Supplier of medical laboratory equipment, cell counters, and biochemistry analyzers across India.",
    images: ["/logo.png"],
  },

  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/logo.png", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/logo.png",
  },

  alternates: {
    canonical: "https://humanbiomedicals.net",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Human Biomedical",
    url: "https://humanbiomedicals.net",
    logo: "https://humanbiomedicals.net/logo.png",
    description:
      "Premier supplier and distributor of biomedical equipment, pathology laboratory instruments, hematology analyzers, and biochemistry systems across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "F-4, 1st Floor, Plot No. 16, D-Block Tagore Nagar, 200 Feet Bypass Rd",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN",
    },
    telephone: ["+91 9983123469", "+91 9983333489"],
    email: "rajbiosis@yahoo.in",
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased font-sans text-slate-900 bg-slate-50">
        <Navbar />

        <main>{children}</main>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />

        <Footer />
      </body>
    </html>
  );
}