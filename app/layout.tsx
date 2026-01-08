import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Halaman Utama X402 - Decentralized Content Protocol",
  description: "Monetize your content with X402 Protocol - Pay-per-view articles, podcasts, and videos on Base and Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/x402-icon-black.png" />
        <link rel="apple-touch-icon" href="/x402-icon-black.png" />
        <meta name="apple-mobile-web-app-title" content="x402" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "primary": "#3713ec",
                    "background-light": "#f6f6f8",
                    "background-dark": "#131022",
                    "card-dark": "#1e1933",
                    "text-muted": "#9b92c9",
                  },
                  fontFamily: {
                    "display": ["Inter", "sans-serif"]
                  },
                  borderRadius: {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
                  },
                },
              },
            }
          `}
        </Script>
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

