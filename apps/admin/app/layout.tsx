import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Raleway } from "next/font/google";

const raleway =Raleway({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800', '900'] });
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body id={'root'} className={raleway.className} suppressHydrationWarning>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
