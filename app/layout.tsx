import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "name_kotik - Fullstack Developer",
  description: "Fullstack разработчик: JavaScript, Python, Kotlin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

