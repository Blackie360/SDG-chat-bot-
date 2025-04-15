import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sustainable Development Goals Assistant",
  description: "A comprehensive chatbot for information and resources on the UN Sustainable Development Goals",
  metadataBase: new URL("https://sdg-chatbot.vercel.app"),
  openGraph: {
    title: "SDG Assistant - Your Guide to Sustainable Development",
    description: "Get information, data, and resources on all 17 UN Sustainable Development Goals",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sustainable Development Goals Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDG Assistant - Your Guide to Sustainable Development",
    description: "Get information, data, and resources on all 17 UN Sustainable Development Goals",
    images: ["/og-image.png"],
    creator: "@yourusername",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'