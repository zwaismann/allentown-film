import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALLENTOWN - Brand Guidelines",
  description: "Brand guidelines for Allentown - color palette, typography, logo downloads, and best practices.",
  openGraph: {
    title: "ALLENTOWN - Brand Guidelines",
    description: "Brand guidelines for Allentown.",
    images: [{ url: "/og/og-brand.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLENTOWN - Brand Guidelines",
    description: "Brand guidelines for Allentown.",
    images: ["/og/og-brand.png"],
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
