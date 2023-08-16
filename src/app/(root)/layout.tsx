import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { metaDesc } from "@/constants/metaDesc";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: metaDesc.title,
  description: metaDesc.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
