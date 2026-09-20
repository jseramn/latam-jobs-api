import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LatamJobs API — Una API. Todas las bolsas de LATAM.",
  description:
    "API REST que une Computrabajo, Bumeran, OCC, ZonaJobs y Laborum en una sola llamada. JSON limpio, deduplicado, con salario parseado a número y moneda. Hecho para recruiters y HR-tech en LATAM.",
  keywords: [
    "API jobs LATAM",
    "Computrabajo API",
    "Bumeran API",
    "OCC API",
    "recruiters LATAM",
    "HR tech",
  ],
  authors: [{ name: "Manuel" }],
  openGraph: {
    title: "LatamJobs API",
    description:
      "Una API. Todas las bolsas de trabajo de LATAM. Sueldo parseado, deduplicado, listo para integrar.",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "LatamJobs API",
    description:
      "Una API. Todas las bolsas de trabajo de LATAM. Sueldo parseado, deduplicado, listo para integrar.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
