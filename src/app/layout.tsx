import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Holesky App",
  description: "Created by Akshit Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
