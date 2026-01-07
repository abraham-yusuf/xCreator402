import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "xCreator402 - Web3 Creator Platform",
  description: "Monetize your content with X402 Protocol - Pay-per-view articles, podcasts, and videos on Base and Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/x402-icon-black.png" />
        <link rel="apple-touch-icon" href="/x402-icon-black.png" />
        <meta name="apple-mobile-web-app-title" content="x402" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

