"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Loader2, Download, Eye, Target, Zap, FileText, Copy, Check } from "lucide-react"
import Link from "next/link"

interface GeneratedResume {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  experiences: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    graduationDate: string
  }>
  skills: string[]
}

export default function AIResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("")
  const [yourBackground, setYourBackground] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null)
  const [atsScore, setAtsScore] = useState(0)
  const [copied, setCopied] = useState(false)

  const generateResume = async () => {
    if (!jobDescription.trim() || !yourBackground.trim()) {
      alert("Please fill in both the job description and your background")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          background: yourBackground,
        }),
      })

      const data = await response.json()
      setGeneratedResume(data.resume)
      setAtsScore(data.atsScore)
    } catch (error) {
      console.error("Error generating resume:", error)
      alert("Error generating resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

      {/* Navigation */}
      <nav className="bg-black/40 border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-lg group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Resume Generator
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/upload">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  <Target className="mr-2 h-4 w-4" />
                  ATS Analyzer
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
            AI-Powered Resume Generator
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl">
            Paste a job description and your background. Our AI will create an optimized resume tailored to the role.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description Input */}
            <Card className="border-purple-500/30 bg-slate-900/40 backdrop-blur-xl hover:border-purple-500/60 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Job Description
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Paste the full job posting you're targeting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here... Include title, responsibilities, requirements, and qualifications..."
                  className="bg-slate-800 border-purple-500/30 text-white placeholder-gray-500 min-h-[250px] resize-none focus:border-purple-500/60"
                  rows={10}
                />
              </CardContent>
            </Card>

            {/* Background Input */}
            <Card className="border-purple-500/30 bg-slate-900/40 backdrop-blur-xl hover:border-purple-500/60 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-400" />
                  Your Professional Background
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Describe your experience, skills, and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={yourBackground}
                  onChange={(e) => setYourBackground(e.target.value)}
                  placeholder="Describe your career highlights, technical skills, project experience, education, certifications, and any relevant achievements with metrics..."
                  className="bg-slate-800 border-purple-500/30 text-white placeholder-gray-500 min-h-[250px] resize-none focus:border-purple-500/60"
                  rows={10}
                />
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={generateResume}
              disabled={loading || !jobDescription.trim() || !yourBackground.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-8 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  <span>Generating Your AI-Optimized Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-6 w-6" />
                  Generate Resume with AI
                  <Zap className="ml-2 h-6 w-6" />
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {generatedResume ? (
              <>
                {/* ATS Score Card */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur animate-scale-in shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      ATS Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                        {atsScore}%
                      </div>
                      <Progress value={atsScore} className="mb-4 h-4 bg-slate-700" />
                      <p className="text-purple-200 text-sm font-semibold">
                        {atsScore >= 85
                          ? "✅ Excellent - Highly optimized"
                          : atsScore >= 70
                            ? "⚠️ Good - Room for improvement"
                            : "❌ Needs optimization"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Resume Preview */}
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur max-h-[600px] overflow-y-auto">
                  <CardHeader className="sticky top-0 bg-slate-800/80 backdrop-blur border-b border-purple-500/30">
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-400" />
                        Preview
                      </span>
                      <Button
                        onClick={() => copyToClipboard(JSON.stringify(generatedResume, null, 2))}
                        size="sm"
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-950/50"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-white text-gray-900 rounded-lg p-6 text-sm space-y-4">
                      <div className="border-b pb-4">
                        <h2 className="text-2xl font-bold">{generatedResume.fullName}</h2>
                        <p className="text-lg font-semibold text-purple-600">{generatedResume.title}</p>
                        <div className="text-gray-600 text-xs space-y-1 mt-2">
                          <div>📧 {generatedResume.email}</div>
                          <div>📱 {generatedResume.phone}</div>
                          <div>📍 {generatedResume.location}</div>
                        </div>
                      </div>

                      {generatedResume.summary && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 text-purple-700">PROFESSIONAL SUMMARY</h3>
                          <p className="text-gray-700 text-xs leading-relaxed">{generatedResume.summary}</p>
                        </div>
                      )}

                      {generatedResume.skills.length > 0 && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 text-purple-700">TECHNICAL SKILLS</h3>
                          <div className="flex flex-wrap gap-1">
                            {generatedResume.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {generatedResume.experiences.length > 0 && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 text-purple-700">PROFESSIONAL EXPERIENCE</h3>
                          <div className="space-y-3">
                            {generatedResume.experiences.map((exp, idx) => (
                              <div key={idx} className="text-xs">
                                <div className="font-bold text-gray-900">{exp.position}</div>
                                <div className="text-gray-600">
                                  {exp.company} | {exp.startDate} - {exp.endDate}
                                </div>
                                <p className="text-gray-700 mt-1">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {generatedResume.education.length > 0 && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 text-purple-700">EDUCATION</h3>
                          <div className="space-y-2">
                            {generatedResume.education.map((edu, idx) => (
                              <div key={idx} className="text-xs">
                                <div className="font-bold text-gray-900">
                                  {edu.degree} in {edu.field}
                                </div>
                                <div className="text-gray-600">
                                  {edu.school} | {edu.graduationDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50">
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-950/50 bg-transparent"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Edit in Builder
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6 opacity-50" />
                  <p className="text-purple-300 text-lg font-semibold">Your AI Resume will appear here</p>
                  <p className="text-purple-400 text-sm mt-2">Fill in both sections and click generate to begin</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
