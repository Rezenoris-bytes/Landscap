import "./globals.css";
import Layout from "@/components/site/Layout";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  metadataBase: new URL("https://blueheavenlandscape.com"),
  title: {
    default: "Blue Heaven Landscape (BHL) — Landscaping Design, Build & Irrigation in Tamil Nadu",
    template: "%s | Blue Heaven Landscape",
  },
  description:
    "Blue Heaven Landscape designs, builds and maintains green spaces for resorts, offices and homes across Tamil Nadu. See your 3D design before we break ground. Call +91 63806 56237.",
  keywords: [
    "landscaping company Tamil Nadu",
    "landscape design Tamil Nadu",
    "landscaping company Coimbatore",
    "landscaping company Chennai",
    "resort landscaping Tamil Nadu",
    "commercial landscaping Tamil Nadu",
    "residential landscaping Tamil Nadu",
    "vertical garden Tamil Nadu",
    "living wall installation Tamil Nadu",
    "terrace garden design Tamil Nadu",
    "lawn development Tamil Nadu",
    "artificial turf installation Tamil Nadu",
    "drip irrigation systems Tamil Nadu",
    "rock garden design",
    "annual maintenance contract landscaping",
    "landscape contractor Coimbatore",
    "landscape contractor Chennai",
    "BHL Blue Heaven Landscape",
  ],
  authors: [{ name: "Blue Heaven Landscape", url: "https://blueheavenlandscape.com" }],
  creator: "Blue Heaven Landscape",
  publisher: "Blue Heaven Landscape",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://blueheavenlandscape.com",
    siteName: "Blue Heaven Landscape",
    title: "Blue Heaven Landscape (BHL) — Landscaping Design, Build & Irrigation in Tamil Nadu",
    description:
      "We design, build and maintain green spaces for resorts, offices and homes across Tamil Nadu. See your 3D design before we break ground. 30+ projects. 50,000+ sq ft.",
    images: [
      {
        url: "/img/bhl-banner.webp",
        width: 1200,
        height: 630,
        alt: "Blue Heaven Landscape — Resort, Commercial & Residential Landscaping in Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Heaven Landscape (BHL) — Design, Build & Irrigation in Tamil Nadu",
    description:
      "30+ projects, 50,000+ sq ft across Tamil Nadu. Resorts, offices and homes. 3D design you approve before we build.",
    images: ["/img/bhl-banner.webp"],
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
  icons: {
    icon: "/img/logo-dark.png",
    apple: "/img/logo-dark.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://blueheavenlandscape.com/#organization",
      name: "Blue Heaven Landscape (BHL)",
      url: "https://blueheavenlandscape.com",
      logo: "https://blueheavenlandscape.com/img/logo-dark.png",
      image: "https://blueheavenlandscape.com/img/bhl-banner.webp",
      description:
        "Landscapes you see before we build them. 3D designs, turnkey execution and smart irrigation for resorts, commercial spaces and homes across Tamil Nadu.",
      telephone: "+91 63806 56237",
      email: "hello@blueheavenlandscape.com",
      priceRange: "₹₹ - ₹₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Coimbatore" },
        { "@type": "City", name: "Madurai" },
        { "@type": "City", name: "Trichy" },
        { "@type": "City", name: "Salem" },
        { "@type": "City", name: "Bengaluru" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://blueheavenlandscape.com/#website",
      url: "https://blueheavenlandscape.com",
      name: "Blue Heaven Landscape",
      publisher: {
        "@id": "https://blueheavenlandscape.com/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-lime selection:text-forest">
        <Layout>
          {children}
        </Layout>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
