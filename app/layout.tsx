import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  // <CHANGE> Add font-display swap for faster text rendering
  display: "swap",
})
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
})

// <CHANGE> Add viewport configuration for better mobile rendering
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#16a34a",
}

export const metadata: Metadata = {
  title: "CareFlow - AI Customer Engagement Platform",
  description: "Transform your business with intelligent automation for customer interactions",
  generator: "v0.app",
  // <CHANGE> Add preconnect hints for faster external resource loading
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <CHANGE> Add preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
