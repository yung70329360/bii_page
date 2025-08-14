import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "突圍智創 BII",
    template: "%s | 突圍智創 BII",
  },
  description: "突圍智創：聚智而行，創領未來。專注創業、企業、二代與職涯的突破與成長。",
  openGraph: {
    title: "突圍智創 BII",
    description: "聚智而行，創領未來 — 創業、企業、二代、職涯全方位支持。",
    siteName: "突圍智創 BII",
  },
  twitter: {
    card: "summary",
    title: "突圍智創 BII",
    description: "聚智而行，創領未來 — 創業、企業、二代、職涯全方位支持。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
        <Navigator />
        {children}
        <Footer />
      </body>
    </html>
  );
}
