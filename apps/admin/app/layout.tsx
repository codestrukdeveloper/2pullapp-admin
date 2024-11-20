import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Montserrat} from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body id={'root'} className={montserrat.className}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
