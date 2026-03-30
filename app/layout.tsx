import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALLENTOWN",
  description: "Three men. A billboard. And the American Dream.",
  openGraph: {
    title: "ALLENTOWN",
    description: "Three men. A billboard. And the American Dream.",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLENTOWN",
    description: "Three men. A billboard. And the American Dream.",
    images: ["/og/og-home.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
