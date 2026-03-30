import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALLENTOWN - Executive Summary",
  description: "Investment opportunity for Allentown, a $2.3M feature film based on the incredible true story of the greatest radio contest of all time.",
  openGraph: {
    title: "ALLENTOWN - Executive Summary",
    description: "Investment opportunity for Allentown, a $2.3M feature film.",
    images: [{ url: "/og/og-investors.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLENTOWN - Executive Summary",
    description: "Investment opportunity for Allentown, a $2.3M feature film.",
    images: ["/og/og-investors.png"],
  },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
