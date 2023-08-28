import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leonardo.ai sandbox",
  description: "Leonardo.ai sandbox",
};

function Header() {
  return (
    <div className="mb-16 w-full flex items-center justify-between border-b-2 border-black pb-4">
      <p className="text-2xl font-semibold">
        <Link href="/" className="hover:underline mr-8">
          home
        </Link>
        <Link href="/gallery" className="hover:underline">
          gallery
        </Link>
      </p>
      <a
        href="https://github.com/dogfrogfog"
        target="_blank"
        rel="noopener noreferrer"
      >
        by <span className="hover:underline font-bold">@dogfrogfog</span>
      </a>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container py-16">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
