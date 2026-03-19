import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "OASIS - Exotic Mango",
  description: "Premium tropical mango juice experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${nunito.variable}`}>{children}</body>
    </html>
  );
}
