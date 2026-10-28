import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://spheralive.architecture"),
  title: "SPHERA&LIVE — Modern Minimal Residential Architecture",
  description:
    "Designing architecture for life. Modern minimalist residential projects, custom luxury cottages, townhouses, and architectural master planning where clean architecture meets quality of living.",
  keywords: [
    "SPHERA LIVE",
    "architecture studio",
    "modern residential design",
    "luxury cottages",
    "minimalist villa architecture",
    "architectural visualization",
  ],
  authors: [{ name: "SPHERA&LIVE Architectural Studio" }],
  openGraph: {
    title: "SPHERA&LIVE | Designing architecture for life",
    description:
      "Where clean architecture meets living. Explore modern minimalist residential projects, cottages, and private master-planned settlements.",
    url: "https://spheralive.architecture",
    siteName: "SPHERA&LIVE",
    images: [
      {
        url: "/images/sphera-hero.jpg",
        width: 1920,
        height: 1080,
        alt: "SPHERA&LIVE Modern Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
