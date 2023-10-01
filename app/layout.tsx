import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import UserDetails from '@/components/UserDetails';
import AuthProvider from '@/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leonardo.ai sandbox',
  description: 'Leonardo.ai sandbox',
};

function Header() {
  return (
    <div className="mb-16 w-full flex items-center justify-between border-b-2 border-black pb-4">
      <p className="text-2xl font-semibold">
        <Link href="/" className="hover:underline mr-8">
          Home
        </Link>
        <Link href="/gallery" className="hover:underline mr-8">
          Gallery {/* <span className="text-sm">(coming soon)</span> */}
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
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="container px-8 relative">
            <UserDetails />
          </div>
          <div className="container py-10 relative">
            <Header />
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
