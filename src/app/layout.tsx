import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { Header } from "./_components/header";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
  
import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "T3 Harmony",
  description: "T3 Harmony Educational Services",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <NextSSRPlugin
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
