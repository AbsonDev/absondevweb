import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Abson.dev | Desenvolvedor Full Stack",
  description: "Portfólio de Abson - Desenvolvedor Full Stack especializado em Flutter, Angular, .NET Core, Next.js e Microsoft Azure. Construindo soluções completas e de alta performance.",
  keywords: "desenvolvedor full stack, flutter, angular, .net core, next.js, azure, desenvolvimento mobile, desenvolvimento web",
  authors: [{ name: "Abson" }],
  creator: "Abson",
  openGraph: {
    title: "Abson.dev | Desenvolvedor Full Stack",
    description: "Construindo soluções completas e de alta performance, do mobile com Flutter à nuvem com Azure.",
    url: "https://abson.dev",
    siteName: "Abson.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abson.dev | Desenvolvedor Full Stack",
    description: "Construindo soluções completas e de alta performance, do mobile com Flutter à nuvem com Azure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
