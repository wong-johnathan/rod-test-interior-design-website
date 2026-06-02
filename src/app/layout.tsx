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
    default: "Studio Rod — Interior Design Portfolio",
    template: "%s | Studio Rod",
  },
  description:
    "Award-winning interior design studio crafting inspiring residential and commercial spaces. Based in New York, working worldwide.",
  keywords: [
    "interior design",
    "interior designer",
    "home decor",
    "residential design",
    "commercial design",
    "New York interior design",
    "Studio Rod",
  ],
  openGraph: {
    title: "Studio Rod — Interior Design Portfolio",
    description:
      "Award-winning interior design studio crafting inspiring residential and commercial spaces.",
    url: "https://studiorod.com",
    siteName: "Studio Rod",
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
