"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedRobot } from "@/components/animated-robot"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  User,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  FileQuestion,
} from "lucide-react"
import Link from "next/link"
import { analyzeResume, extractTextFromPDF, extractTextFromDOCX } from "@/lib/ats-analyzer"
import { generateReportPDF } from "@/lib/pdf-generator"

interface AnalysisResult {
  score: number
  summary: string
  resumeSummary: {
    name: string
    title: string
    experience: string
    education: string
    skills: string[]
    contact: {
      email: string
      phone: string
      location: string
    }
  }
  strengths: string[]
  improvements: string[]
  keywords: {
    found: string[]
    missing: string[]
  }
  sections: {
    name: string
    score: number
    feedback: string
  }[]
}

export default function UploadPageClient() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValidResume, setIsValidResume] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (
      uploadedFile &&
      (uploadedFile.type === "application/pdf" ||
        uploadedFile.type === "application/msword" ||
        uploadedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        uploadedFile.name.endsWith(".pdf") ||
        uploadedFile.name.endsWith(".doc") ||
        uploadedFile.name.endsWith(".docx"))
    ) {
      setFile(uploadedFile)
      setError(null)
      setIsValidResume(true)
      analyzeResumeFile(uploadedFile)
    } else {
      setError("❌ Invalid file type. Please upload a PDF, DOC, or DOCX file.")
      setIsValidResume(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.name.endsWith(".pdf") ||
        droppedFile.name.endsWith(".doc") ||
        droppedFile.name.endsWith(".docx")
      ) {
        setFile(droppedFile)
        setError(null)
        setIsValidResume(true)
        analyzeResumeFile(droppedFile)
      } else {
        setError("❌ Invalid file type. Please upload a PDF, DOC, or DOCX file.")
        setIsValidResume(false)
      }
    }
  }

  const validateResume = (text: string): boolean => {
    const resumeKeywords = ["experience", "education", "skills", "summary", "objective", "work", "employment"]
    const textLower = text.toLowerCase()
    const keywordMatch = resumeKeywords.filter((keyword) => textLower.includes(keyword)).length

    // Must have at least 3 resume-related keywords
    if (keywordMatch < 3) {
      return false
    }

    // Must have minimum text length (at least 100 characters)
    if (text.trim().length < 100) {
      return false
    }

    return true
  }

  const analyzeResumeFile = async (file: File) => {
    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval)
          return 85
        }
        return prev + Math.random() * 20
      })
    }, 300)

    try {
      let text = ""

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        text = await extractTextFromPDF(file)
      } else {
        text = await extractTextFromDOCX(file)
      }

      if (!text || text.trim().length === 0) {
        throw new Error("Could not extract text from the file. File may be empty or corrupted.")
      }

      // Validate if it's actually a resume
      if (!validateResume(text)) {
        setIsValidResume(false)
        setError(
          "❌ This does not appear to be a resume. Please ensure the file contains:\n• Professional experience\n• Education details\n• Skills section\n• Contact information",
        )
        setIsAnalyzing(false)
        clearInterval(progressInterval)
        return
      }

      setIsValidResume(true)
      setProgress(90)

      const result = await analyzeResume(text, file.name)
      setProgress(100)

      setTimeout(() => {
        setAnalysisResult(result)
        setIsAnalyzing(false)
        clearInterval(progressInterval)
      }, 500)
    } catch (err) {
      console.error("Error analyzing resume:", err)
      setError(
        `❌ Error: ${err instanceof Error ? err.message : "Please try another file or ensure it's a valid resume format."}`,
      )
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 65) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600 animate-pulse" />
    if (score >= 65) return <AlertCircle className="h-5 w-5 text-yellow-600 animate-pulse" />
    return <XCircle className="h-5 w-5 text-red-600 animate-pulse" />
  }

  const handleDownloadReport = () => {
    if (analysisResult && file) {
      generateReportPDF(analysisResult, `ATS-Report-${analysisResult.resumeSummary.name}.pdf`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse top-0 left-0" />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0"
          style={{ animationDelay: "1s" }}
        />
      </div>

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 text-sm font-medium mb-6 border border-purple-500/30 animate-pulse">
            <Sparkles className="mr-2 h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} />
            AI-Powered ATS Analysis Engine
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume ATS Analyzer
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Upload your resume and get instant ATS compatibility score with detailed feedback and actionable insights
          </p>
        </div>

        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            <Card
              className={`border-2 border-dashed transition-all duration-500 backdrop-blur-xl ${
                isDragOver
                  ? "border-purple-400 bg-purple-900/30 scale-105 shadow-2xl shadow-purple-500/50"
                  : isAnalyzing
                    ? "border-purple-400/50 bg-purple-900/20"
                    : "border-purple-500/30 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/20 bg-slate-900/40"
              }`}
            >
              <CardContent className="p-12">
                <div
                  className="text-center"
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragOver(true)
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    setIsDragOver(false)
                  }}
                >
                  {!isAnalyzing && !error ? (
                    <div className="animate-fade-in">
                      <div className="flex justify-center mb-6">
                        <AnimatedRobot size="lg" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">Upload Your Resume</h3>
                      <p className="text-purple-200 mb-8 text-lg">
                        Drag and drop your resume here, or click to browse files. Our AI will analyze it instantly.
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer shadow-lg hover:shadow-purple-500/50 text-white font-bold py-6 text-lg transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                          asChild
                        >
                          <span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Upload className="mr-2 h-6 w-6 group-hover:animate-bounce relative z-10" />
                            <span className="relative z-10">Choose Resume File</span>
                            <Zap className="ml-2 h-6 w-6 group-hover:animate-pulse relative z-10" />
                          </span>
                        </Button>
                      </label>
                      <p className="text-sm text-purple-400 mt-6">Supports PDF, DOC, DOCX files up to 10MB</p>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="space-y-8 animate-fade-in">
                      <div className="flex justify-center">
                        <AnimatedRobot size="lg" showProcess={true} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Resume</h3>
                        <p className="text-purple-300 mb-8">
                          Our AI is scanning for ATS compatibility, keywords, and optimization opportunities...
                        </p>
                        <div className="w-full max-w-md mx-auto space-y-3">
                          <Progress value={progress} className="w-full h-4 bg-purple-900/50" />
                          <div className="flex justify-between text-sm text-purple-400">
                            <span className="font-semibold">Scanning Resume Content</span>
                            <span className="font-bold">{Math.round(progress)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {error && !isValidResume && (
              <Card className="border-red-500/30 bg-red-900/20 backdrop-blur mt-6 animate-bounce-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <FileQuestion className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-red-300 mb-2">Not a Resume</h4>
                      <p className="text-red-200 mb-3">{error}</p>
                      <p className="text-sm text-red-300">
                        A valid resume should include professional experience, education, and skills sections.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && isValidResume && (
              <Card className="border-yellow-500/30 bg-yellow-900/20 backdrop-blur mt-6 animate-bounce-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-yellow-300 mb-2">Processing Error</h4>
                      <p className="text-yellow-200">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Main Score Card */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-purple-400" />
                        ATS Compatibility Score
                      </CardTitle>
                      <CardDescription className="text-purple-300 text-base mt-2">
                        Real-time analysis based on resume content
                      </CardDescription>
                    </div>
                    {getScoreIcon(analysisResult.score)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8 mb-6">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {analysisResult.score}
                    </div>
                    <div className="flex-1">
                      <Progress value={analysisResult.score} className="w-full h-4 bg-slate-700" />
                      <div className="mt-3 text-sm text-purple-300">
                        {analysisResult.score >= 80
                          ? "✅ Excellent - Your resume is well-optimized"
                          : analysisResult.score >= 65
                            ? "⚠️ Good - Room for improvement"
                            : "❌ Needs work - Apply suggestions below"}
                      </div>
                    </div>
                  </div>
                  <p className="text-purple-200 leading-relaxed">{analysisResult.summary}</p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleDownloadReport}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 text-white font-bold"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-950/50 bg-transparent"
                  >
                    <Link href="/ai-generator">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-950/50 bg-transparent"
                  >
                    <Link href="/builder">
                      <FileText className="mr-2 h-4 w-4" />
                      Use Builder
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Resume Summary */}
            <Card className="border-purple-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-6 w-6 text-purple-400" />
                  Extracted Resume Information
                </CardTitle>
                <CardDescription className="text-purple-300">Key details our AI found in your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-400 font-semibold mb-1">Full Name</p>
                      <h3 className="text-xl font-bold text-white">{analysisResult.resumeSummary.name}</h3>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-400 font-semibold mb-1">Professional Title</p>
                      <p className="text-white font-semibold">{analysisResult.resumeSummary.title}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-400 font-semibold mb-1">Experience Level</p>
                      <p className="text-white">{analysisResult.resumeSummary.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-400 font-semibold mb-2">Contact Information</p>
                      <div className="space-y-2">
                        <p className="text-sm text-purple-300">📧 {analysisResult.resumeSummary.contact.email}</p>
                        <p className="text-sm text-purple-300">📱 {analysisResult.resumeSummary.contact.phone}</p>
                        <p className="text-sm text-purple-300">📍 {analysisResult.resumeSummary.contact.location}</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-400 font-semibold mb-2">Education</p>
                      <p className="text-white">{analysisResult.resumeSummary.education}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-sm text-purple-400 font-semibold mb-3">Top Skills Found</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.resumeSummary.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths and Improvements */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-500/30 bg-green-950/20 backdrop-blur-xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    What You're Doing Well
                  </CardTitle>
                  <CardDescription className="text-green-300">Keep these strengths in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-green-200 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-950/20 backdrop-blur-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <AlertCircle className="h-6 w-6" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription className="text-orange-300">Apply these changes to boost your score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.improvements.map((improvement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-orange-200 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section Scores */}
            <Card className="border-purple-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-400" />
                  Detailed Section Analysis
                </CardTitle>
                <CardDescription className="text-purple-300">Score breakdown for each resume section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {analysisResult.sections.map((section, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-white text-lg">{section.name}</h4>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {section.score}%
                        </div>
                      </div>
                      <Progress value={section.score} className="mb-3 h-3 bg-slate-700" />
                      <p className="text-sm text-purple-200">{section.feedback}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keyword Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-500/30 bg-green-950/20 backdrop-blur-xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Found Keywords ({analysisResult.keywords.found.length})
                  </CardTitle>
                  <CardDescription className="text-green-300">ATS-friendly keywords in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.found.map((keyword, index) => (
                      <Badge
                        key={index}
                        className="bg-green-900 text-green-200 border border-green-500/50 hover:bg-green-800 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-500/30 bg-red-950/20 backdrop-blur-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Missing Keywords ({analysisResult.keywords.missing.length})
                  </CardTitle>
                  <CardDescription className="text-red-300">Consider adding these to improve ATS score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.missing.map((keyword, index) => (
                      <Badge
                        key={index}
                        className="bg-red-900 text-red-200 border border-red-500/50 hover:bg-red-800 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-400 animate-spin" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-purple-200">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-purple-400">1.</span>
                    <span>Incorporate missing keywords naturally into your resume</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-purple-400">2.</span>
                    <span>Enhance low-scoring sections with more detail and quantifiable metrics</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-purple-400">3.</span>
                    <span>Use our AI Generator to create multiple optimized versions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-purple-400">4.</span>
                    <span>Tailor your resume for specific job postings</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-purple-400">5.</span>
                    <span>Re-upload to verify improvements</span>
                  </li>
                </ol>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => {
                      setAnalysisResult(null)
                      setFile(null)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Another Resume
                  </Button>
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <Link href="/ai-generator">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate New Resume
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
