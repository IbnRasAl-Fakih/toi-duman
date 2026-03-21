import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-[radial-gradient(circle_at_top_left,rgba(202,169,128,0.18),transparent_28%),linear-gradient(180deg,#fffaf4_0%,#fbf7f2_44%,#f8f1e8_78%,#fff0e0_100%)] font-serif text-[#2d2621] antialiased">
        {children}
      </body>
    </html>
  );
}
