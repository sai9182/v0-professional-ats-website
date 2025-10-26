import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://sai-ats-analyzer.vercel.app"),
  title: {
    default: "SAI - Professional ATS Resume Analyzer",
    template: "%s | SAI Resume Analyzer",
  },
  description:
    "Professional ATS resume analyzer and builder. Get real-time ATS scores, AI-powered suggestions, and build optimized resumes for your dream job.",
  keywords: "ATS resume analyzer, resume builder, ATS score, job application, resume optimization",
  authors: [{ name: "SAI.dev" }],
  creator: "SAI.dev",
  publisher: "SAI.dev",
  openGraph: {
    title: "SAI - Professional ATS Resume Analyzer",
    description: "Get instant ATS compatibility scores and build professional resumes with AI assistance.",
    siteName: "SAI Resume Analyzer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAI - Professional ATS Resume Analyzer",
    description: "Get instant ATS compatibility scores and AI-powered resume optimization.",
    creator: "@saidev",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={`${inter.className} bg-slate-950`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
