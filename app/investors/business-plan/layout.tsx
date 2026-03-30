import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALLENTOWN - Business Plan",
  description: "Full investor business plan for Allentown - financial projections, waterfall analysis, and investment terms.",
  openGraph: {
    title: "ALLENTOWN - Business Plan",
    description: "Full investor business plan for Allentown.",
    images: [{ url: "/og/og-business-plan.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLENTOWN - Business Plan",
    description: "Full investor business plan for Allentown.",
    images: ["/og/og-business-plan.png"],
  },
};

export default function BusinessPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
