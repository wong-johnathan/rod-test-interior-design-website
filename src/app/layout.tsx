import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Rod's Interior — Singapore Interior Design Portfolio",
    template: "%s | Rod's Interior",
  },
  description:
    "Singapore-based interior design studio crafting inspiring residential and commercial spaces.",
  keywords: [
    "interior design",
    "interior designer",
    "home decor",
    "residential design",
    "commercial design",
    "Singapore interior design",
    "Rod's Interior",
  ],
  openGraph: {
    title: "Rod's Interior — Singapore Interior Design Portfolio",
    description:
      "Singapore-based interior design studio crafting inspiring residential and commercial spaces.",
    url: "https://rodsinterior.com",
    siteName: "Rod's Interior",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
