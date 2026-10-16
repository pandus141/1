import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marka – wzór strony",
  description: "Szablon strony w stylu minimalistycznego portalu technologicznego.",
};

// Ustawia motyw przed pierwszym renderem (bez migania).
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-primary-12 focus:px-4 focus:py-2 focus:text-cta"
        >
          Przejdź do treści głównej
        </a>
        <Header />
        <main id="main" className="pt-header-h">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
