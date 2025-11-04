import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "folio | WebArk",
  description: "A WebArk Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://www.webark.in" />
        <meta
          property="og:image"
          content="https://www.webark.in/og-image.png"
        />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://www.webark.in/og-image.png"
        />
        <meta name="twitter:creator" content="@arkorty" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="android-chrome-192x192"
          sizes="180x180"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="android-chrome-512x512"
          sizes="180x180"
          href="/android-chrome-512x512.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="canonical" href="https://www.webark.in" />

        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Portfolio, Web Development, Projects, Showcase, folio"
        />
        <meta name="author" content="Arkaprabha Chakraborty" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
