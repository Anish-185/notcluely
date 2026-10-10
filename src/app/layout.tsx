import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Doto, Geist } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"] });
const doto = Doto({ variable: "--font-doto", subsets: ["latin"], weight: ["600", "800", "900"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://notcluely.app"),
  title: "Notcluely: the quiet copilot for every call",
  description:
    "Notcluely listens to your meetings, reads your screen, and slips you the right answer in a private overlay. Live transcripts, notes, follow-ups and memory, with no bot in the call.",
  openGraph: {
    title: "Notcluely",
    description: "Say the right thing while it still matters.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#071033",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-active-room="ink"
      suppressHydrationWarning
      className={`${bodoni.variable} ${doto.variable} ${geist.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
