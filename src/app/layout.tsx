import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { Header } from "./_components/header";

import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "T3 Harmony",
  description: "T3 Harmony Educational Services",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children, modal, }: Readonly<{ 
  children: React.ReactNode;
	modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable}`}>
          <Header />
          {children}
					<div id="modal-root">
            {modal}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
