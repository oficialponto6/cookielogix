import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/AppShell";
import { WalletProvider } from "./context/WalletContext";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CookieLogix | Autonomous SVM Intent & Due Diligence Engine",
  description: "Next-gen Web3 security intelligence and intent cApp powered by Cookie Chain.",
  icons: {
    icon: "/cookie-logo.png",
  },
  openGraph: {
    title: "CookieLogix | Autonomous SVM Intent & Due Diligence Engine",
    description: "Next-gen Web3 security intelligence and intent cApp powered by Cookie Chain. Verified via Webacy & DD.xyz protocols.",
    url: "https://cookielogix.vercel.app",
    siteName: "CookieLogix",
    images: [
      {
        url: "https://cookielogix.vercel.app/cookie-logo.png",
        width: 512,
        height: 512,
        alt: "CookieLogix Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary", // Exibe a logo em formato de ícone/quadrado ao lado do texto
    title: "CookieLogix | Autonomous SVM Intent & Due Diligence Engine",
    description: "Next-gen Web3 security intelligence and intent cApp powered by Cookie Chain.",
    images: ["https://cookielogix.vercel.app/cookie-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#020617] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
        <WalletProvider>
          <AppShell>
            {children}
          </AppShell>
        </WalletProvider>
      </body>
    </html>
  );
}