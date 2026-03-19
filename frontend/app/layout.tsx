import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script"; // ✅ ADD THIS
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MG STUDIO | Premium Barber Shop & Unisex Salon",
  description:
    "Experience luxury grooming at MG STUDIO. Expert barbers, premium cuts, nail care, facials, and salon services for ladies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">

        {/* ✅ MEDIAPIPE SCRIPT (CORRECT WAY) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js"
          strategy="beforeInteractive"
        />

        {children}
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}