"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, User, LogOut, Settings, Menu, X } from "lucide-react"

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check login state from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const name = localStorage.getItem("userName") || ""
    const email = localStorage.getItem("userEmail") || ""

    setIsLoggedIn(loggedIn)
    setUserName(name)
    setUserEmail(email)

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    setIsLoggedIn(false)
    setUserName("")
    setUserEmail("")
    window.location.href = "/"
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-lg shadow-purple-500/10"
          : "bg-white/90 backdrop-blur-lg border-b border-purple-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <FileText className="h-6 w-6 text-white group-hover:animate-pulse" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-indigo-700 transition-all duration-300">
              ATS Tracker + Resume Builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Features", href: "#features" },
              { name: "How It Works", href: "#how-it-works" },
              { name: "Upload Resume", href: "/upload" },
              { name: "Resume Builder", href: "/builder" },
              { name: "User Manual", href: "/manual" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-purple-50 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <User className="h-4 w-4 text-white group-hover:animate-pulse" strokeWidth={2} />
                    </div>
                    <span className="text-gray-700 group-hover:text-purple-700 transition-colors duration-300">
                      {userName || userEmail.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/95 backdrop-blur-lg border border-purple-100 shadow-xl"
                >
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="hover:bg-purple-50 transition-colors duration-200">
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" strokeWidth={2} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-purple-50 transition-colors duration-200">
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" strokeWidth={2} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" strokeWidth={2} />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  <Link href="/signup">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Get Started Free</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-purple-50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" strokeWidth={2} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 bg-white/95 backdrop-blur-lg rounded-lg mt-2 border border-purple-100 shadow-xl">
            {[
              { name: "Features", href: "#features" },
              { name: "How It Works", href: "#how-it-works" },
              { name: "Upload Resume", href: "/upload" },
              { name: "Resume Builder", href: "/builder" },
              { name: "User Manual", href: "/manual" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-purple-100 pt-4 px-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300 bg-transparent"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full hover:bg-purple-50 transition-all duration-300 bg-transparent"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
