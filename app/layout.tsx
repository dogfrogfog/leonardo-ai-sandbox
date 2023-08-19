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
    <div className="z-10 mb-24 w-full items-center justify-between font-mono text-sm lg:flex">
      <p className="text-2xl">
        <Link href="/">Leonardo.ai sandbox</Link>
      </p>
      <div className="text-3xl fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://github.com/dogfrogfog"
          target="_blank"
          rel="noopener noreferrer"
        >
          by <span className="hover:underline font-bold">@dogfrogfog</span>
        </a>
      </div>
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
      <body className={inter.className + " min-h-screen p-24 contaienr"}>
        <Header />
        {children}
      </body>
    </html>
  );
}
