"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-black/40 border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-lg group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
              <FileText className="h-6 w-6 text-white group-hover:animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ATS Resume Analyzer
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/ai-generator">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                AI Generator
              </Button>
            </Link>
            <Link href="/builder">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-950/50 bg-transparent"
              >
                Resume Builder
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
