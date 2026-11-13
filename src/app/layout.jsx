import "./globals.css";
import Layout from "@/components/site/Layout";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Blue Heaven Landscape (BHL) — Design, Build & Irrigation in Tamil Nadu",
  description: "Landscapes you see before we build them. 3D designs, turnkey execution and smart irrigation for resorts, commercial spaces and homes across Tamil Nadu.",
  icons: {
    icon: "/img/logo-dark.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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

