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
  Eye,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { analyzeResume, extractTextFromPDF, extractTextFromDOCX } from "@/lib/ats-analyzer"

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
      analyzeResumeFile(uploadedFile)
    } else {
      setError("Please upload a PDF, DOC, or DOCX file")
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
        analyzeResumeFile(droppedFile)
      } else {
        setError("Please upload a PDF, DOC, or DOCX file")
      }
    }
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
        throw new Error("Could not extract text from the file")
      }

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
        `Failed to analyze resume: ${err instanceof Error ? err.message : "Please try another file or ensure it's a valid resume format."}`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <FileText className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ATS Tracker
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                asChild
                className="hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <Link href="/builder">Resume Builder</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6 animate-pulse">
            <Sparkles className="mr-2 h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} strokeWidth={2} />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ATS Resume Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get an instant ATS compatibility score with detailed feedback
          </p>
        </div>

        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            <Card
              className={`border-2 border-dashed transition-all duration-500 ${
                isDragOver
                  ? "border-purple-400 bg-purple-50 scale-105 shadow-2xl"
                  : isAnalyzing
                    ? "border-purple-300 bg-purple-25"
                    : "border-purple-200 hover:border-purple-300 hover:shadow-xl"
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
                  {!isAnalyzing ? (
                    <div className="animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <AnimatedRobot size="lg" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your Resume</h3>
                      <p className="text-gray-600 mb-8">Drag and drop your resume here, or click to browse files</p>
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
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                          asChild
                        >
                          <span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Upload className="mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                            <span className="relative z-10">Choose File</span>
                            <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse relative z-10" />
                          </span>
                        </Button>
                      </label>
                      <p className="text-sm text-gray-500 mt-4">Supports PDF, DOC, DOCX files up to 10MB</p>
                      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="flex justify-center">
                        <AnimatedRobot size="lg" showProcess={true} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analyzing Your Resume</h3>
                        <p className="text-gray-600 mb-6">Our AI is analyzing your resume for ATS compatibility...</p>
                        <div className="w-full max-w-md mx-auto space-y-2">
                          <Progress value={progress} className="w-full h-3 bg-purple-100" />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Processing...</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <AnimatedRobot size="md" />
                </div>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {getScoreIcon(analysisResult.score)}
                  <CardTitle className="text-4xl">
                    ATS Score:{" "}
                    <span className={`${getScoreColor(analysisResult.score)} animate-pulse`}>
                      {analysisResult.score}/100
                    </span>
                  </CardTitle>
                  <TrendingUp className="h-6 w-6 text-purple-600 animate-bounce" />
                </div>
                <div className="w-full max-w-md mx-auto mb-4">
                  <Progress value={analysisResult.score} className="w-full h-4 bg-gray-100" />
                </div>
                <CardDescription className="text-lg max-w-3xl mx-auto">{analysisResult.summary}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                    <span className="relative z-10">Download Report</span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <User className="mr-3 h-6 w-6 text-purple-600 animate-pulse" strokeWidth={2} />
                  Resume Summary
                </CardTitle>
                <CardDescription>Key information extracted from your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      {
                        icon: User,
                        title: analysisResult.resumeSummary.name,
                        subtitle: analysisResult.resumeSummary.title,
                      },
                      { icon: Briefcase, title: "Experience", subtitle: analysisResult.resumeSummary.experience },
                      { icon: GraduationCap, title: "Education", subtitle: analysisResult.resumeSummary.education },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300"
                      >
                        <item.icon className="h-5 w-5 text-purple-600 mt-1 group-hover:animate-pulse" strokeWidth={2} />
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Award className="h-5 w-5 text-purple-600 mr-2 animate-pulse" strokeWidth={2} />
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.resumeSummary.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="hover:text-purple-600 transition-colors duration-300">
                          {analysisResult.resumeSummary.contact.email}
                        </p>
                        <p className="hover:text-purple-600 transition-colors duration-300">
                          {analysisResult.resumeSummary.contact.phone}
                        </p>
                        <p className="hover:text-purple-600 transition-colors duration-300">
                          {analysisResult.resumeSummary.contact.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="mr-2 h-5 w-5 animate-pulse" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="flex items-start group hover:translate-x-2 transition-transform duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <AlertCircle className="mr-2 h-5 w-5 animate-pulse" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.improvements.map((improvement, index) => (
                        <li
                          key={index}
                          className="flex items-start group hover:translate-x-2 transition-transform duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            {improvement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Found Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.found.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.missing.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-red-100 text-red-800 hover:bg-red-200 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>Section Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.sections.map((section, index) => (
                        <div
                          key={index}
                          className="space-y-2 group hover:translate-x-1 transition-transform duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                              {section.name}
                            </span>
                            <span className={`font-bold ${getScoreColor(section.score)} group-hover:animate-pulse`}>
                              {section.score}/100
                            </span>
                          </div>
                          <Progress value={section.score} className="h-2" />
                          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                            {section.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <AnimatedRobot size="md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Improve Your Score?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Use our resume builder with ATS-optimized templates to create a better resume
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  >
                    <Link href="/builder">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <FileText className="mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                      <span className="relative z-10">Build Better Resume</span>
                      <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin relative z-10" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setFile(null)
                      setAnalysisResult(null)
                      setProgress(0)
                      setError(null)
                    }}
                    className="hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 group"
                  >
                    <Upload className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Analyze Another Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
