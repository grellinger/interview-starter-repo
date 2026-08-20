import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Product List",
  description: "SE3 technical baseline — Next.js + Spring Boot + Postgres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
