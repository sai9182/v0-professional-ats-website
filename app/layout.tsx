import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "sai",
    template: "sai",
  },
  description:
    "Get instant ATS compatibility scores for your resume. Build professional resumes with our ATS-optimized templates. Powered by Sai.dev",
  keywords: "ATS resume analyzer, resume builder, ATS score, job application tracker, resume optimization, sai.dev",
  authors: [{ name: "Sai.dev" }],
  creator: "Sai.dev",
  publisher: "Sai.dev",
  openGraph: {
    title: "sai",
    description:
      "Get instant ATS compatibility scores for your resume. Build professional resumes with our ATS-optimized templates.",
    siteName: "sai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sai",
    description:
      "Get instant ATS compatibility scores for your resume. Build professional resumes with our ATS-optimized templates.",
    creator: "@saidev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>sai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
