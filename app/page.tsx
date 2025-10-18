"use client"

import { Navigation } from "@/components/navigation"
import { AnimatedRobot } from "@/components/animated-robot"
import { RobotProcessFlow } from "@/components/robot-process-flow"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, Star, TrendingUp, Sparkles, ArrowRight, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <title>ATS Tracker + Resume Builder</title>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              transition: "transform 0.3s ease-out",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-bounce"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-300/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full text-purple-700 text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Star className="mr-2 h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} strokeWidth={2} />
                <span className="group-hover:text-purple-800 transition-colors">#1 ATS Resume Analyzer</span>
                <Sparkles className="ml-2 h-4 w-4 animate-pulse" strokeWidth={2} />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Get Your Resume
                </span>{" "}
                <span
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x inline-block animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  ATS Score
                </span>{" "}
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  Instantly
                </span>
              </h1>

              <p
                className={`text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                Upload your resume and get an instant ATS compatibility score with detailed feedback. Or build a new
                resume using our professional templates.
              </p>

              {/* Animated Robot Hero */}
              <div className="flex justify-center mb-12">
                <AnimatedRobot size="xl" className="animate-bounce-in" />
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <Button
                  size="lg"
                  asChild
                  className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                >
                  <Link href="/upload">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Upload className="mr-3 h-6 w-6 group-hover:animate-bounce" strokeWidth={2} />
                    <span className="relative z-10">Upload & Analyze Resume</span>
                    <ArrowRight
                      className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                      strokeWidth={2}
                    />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-12 py-6 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Link href="/builder">
                    <FileText
                      className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300"
                      strokeWidth={2}
                    />
                    <span>Build New Resume</span>
                    <Zap className="ml-3 h-5 w-5 group-hover:animate-pulse" strokeWidth={2} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Robot Process Flow Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                How Our ATS Robot Works
              </h2>
              <p className="text-lg text-gray-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Watch our AI-powered robot analyze your resume in real-time
              </p>
            </div>
            <RobotProcessFlow />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-lg relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                Powerful ATS Analysis Tools
              </h2>
              <p
                className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Everything you need to create and optimize resumes that pass ATS systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "Instant ATS Scoring",
                  description: "Upload your resume and get an instant ATS compatibility score with detailed analysis",
                  gradient: "from-purple-500 to-indigo-500",
                  features: [
                    "Real-time ATS score calculation",
                    "Detailed improvement suggestions",
                    "Keyword optimization analysis",
                  ],
                  delay: "0s",
                },
                {
                  icon: FileText,
                  title: "Professional Templates",
                  description: "Choose from ATS-optimized templates designed by career experts",
                  gradient: "from-green-500 to-teal-500",
                  features: ["20+ professional templates", "Industry-specific designs", "ATS-friendly formatting"],
                  delay: "0.2s",
                },
                {
                  icon: TrendingUp,
                  title: "Smart Analytics",
                  description: "Get detailed insights and recommendations to improve your resume",
                  gradient: "from-orange-500 to-red-500",
                  features: [
                    "Comprehensive resume analysis",
                    "Section-by-section feedback",
                    "Improvement recommendations",
                  ],
                  delay: "0.4s",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white/80 backdrop-blur-lg animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: feature.delay }}
                >
                  {/* Animated tech elements in corner */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-all duration-300">
                    {index === 0 && (
                      <div className="relative">
                        <div
                          className="w-8 h-8 border-2 border-purple-300 rounded-full animate-spin"
                          style={{ animationDuration: "3s" }}
                        >
                          <div className="absolute inset-1 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-6 bg-green-400 rounded animate-pulse"
                          style={{ animationDelay: "0s" }}
                        ></div>
                        <div
                          className="w-2 h-4 bg-green-300 rounded animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-8 bg-green-500 rounded animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <div
                          className="w-2 h-3 bg-green-300 rounded animate-pulse"
                          style={{ animationDelay: "0.6s" }}
                        ></div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="relative">
                        <div className="w-8 h-8 border-2 border-orange-300 rounded-lg rotate-45 animate-bounce">
                          <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-red-400 rounded animate-pulse"></div>
                        </div>
                        <div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white group-hover:animate-pulse" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-700 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-600">
                      {feature.features.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                          <CheckCircle
                            className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 group-hover:animate-pulse"
                            strokeWidth={2}
                          />
                          <span className="group-hover:text-gray-700 transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-indigo-50 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 animate-pulse"
            style={{ animationDuration: "4s" }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">How It Works</h2>
              <p
                className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Get your ATS score in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  title: "Upload Resume",
                  description:
                    "Simply drag and drop your resume file or click to upload. We support PDF, DOC, and DOCX formats.",
                  delay: "0s",
                },
                {
                  step: "2",
                  title: "Get ATS Score",
                  description:
                    "Our AI analyzes your resume against ATS requirements and provides an instant compatibility score.",
                  delay: "0.3s",
                },
                {
                  step: "3",
                  title: "Improve & Download",
                  description: "Follow our recommendations to improve your score, then download your optimized resume.",
                  delay: "0.6s",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`text-center animate-fade-in-up group`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="relative mb-8">
                    <div className="relative w-24 h-24 mx-auto">
                      {/* Animated progress ring */}
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="0"
                          className="animate-pulse"
                          style={{
                            animation: `drawCircle 2s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`,
                          }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600 group-hover:animate-pulse">
                          {item.step}
                        </span>
                      </div>
                      {/* Floating particles around step */}
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
                        <div
                          className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                    </div>
                    {index < 2 && (
                      <div
                        className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-indigo-300 animate-pulse"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Success achievement animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Main trophy/success icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Celebration sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                      style={{
                        top: `${20 + Math.sin((i * 45 * Math.PI) / 180) * 40}px`,
                        left: `${20 + Math.cos((i * 45 * Math.PI) / 180) * 40}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>

                {/* Success rays */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
                  <div className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-t from-yellow-400 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-b from-yellow-400 to-transparent transform -translate-x-1/2"></div>
                  <div className="absolute left-0 top-1/2 h-1 w-8 bg-gradient-to-l from-yellow-400 to-transparent transform -translate-y-1/2"></div>
                  <div className="absolute right-0 top-1/2 h-1 w-8 bg-gradient-to-r from-yellow-400 to-transparent transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to Optimize Your Resume?
            </h2>
            <p
              className="text-xl text-gray-300 mb-12 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Join thousands of job seekers who have improved their ATS scores and landed their dream jobs.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up`}
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                asChild
                className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <Link href="/upload">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  <span className="relative z-10">Start Free Analysis</span>
                  <Sparkles className="ml-3 h-5 w-5 group-hover:animate-spin" strokeWidth={2} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-12 py-6 border-2 border-gray-400 text-white hover:bg-white hover:text-gray-900 bg-transparent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/builder">
                  <FileText
                    className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300"
                    strokeWidth={2}
                  />
                  <span>Build New Resume</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/90 backdrop-blur-lg border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <FileText className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ATS Tracker + Resume Builder
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The most accurate ATS resume analyzer and builder. Get instant scores and build professional resumes.
                </p>
                {/* Animated company badge */}
                <div className="flex justify-start">
                  <div className="relative group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded animate-pulse"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {[
                {
                  title: "Product",
                  links: [
                    { name: "Resume Analyzer", href: "/upload" },
                    { name: "Resume Builder", href: "/builder" },
                    { name: "Templates", href: "/templates" },
                  ],
                },
                {
                  title: "Support",
                  links: [
                    { name: "Help Center", href: "/help" },
                    { name: "Contact Us", href: "/contact" },
                    { name: "Career Guides", href: "/guides" },
                    { name: "User Manual", href: "/manual" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { name: "About", href: "/about" },
                    { name: "Privacy", href: "/privacy" },
                    { name: "Terms", href: "/terms" },
                  ],
                },
              ].map((section, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                  <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <p>&copy; 2024 ATS Tracker + Resume Builder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
          }
          70% {
            transform: scale(0.9) rotate(-2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        @keyframes drawCircle {
          0% { strokeDashoffset: 251.2; }
          50% { strokeDashoffset: 0; }
          100% { strokeDashoffset: -251.2; }
        }
      `}</style>
    </>
  )
}
