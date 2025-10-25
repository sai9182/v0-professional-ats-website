"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, Download, Eye, Target, Zap } from "lucide-react"
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

  const generateResume = async () => {
    if (!jobDescription.trim() || !yourBackground.trim()) {
      alert("Please fill in both fields")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/50 border-b border-purple-500/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">AI Resume Generator</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/builder">
                <Button variant="outline" size="sm">
                  Resume Builder
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="sm">
                  <Target className="mr-2 h-4 w-4" />
                  ATS Analyzer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />
                AI-Powered Resume Generator
              </h1>
              <p className="text-purple-200">
                Paste a job description and your background. Our AI will create an optimized resume.
              </p>
            </div>

            <div className="space-y-6">
              {/* Job Description Input */}
              <div className="group">
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur hover:border-purple-500/60 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      Job Description
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      Paste the job posting you're targeting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here..."
                      className="bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 min-h-[200px]"
                      rows={8}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Background Input */}
              <div className="group">
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur hover:border-purple-500/60 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      Your Background
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      Tell us about your experience and skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={yourBackground}
                      onChange={(e) => setYourBackground(e.target.value)}
                      placeholder="Describe your professional background, skills, and experience..."
                      className="bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 min-h-[200px]"
                      rows={8}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateResume}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating AI Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Resume with AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {generatedResume ? (
              <>
                {/* ATS Score Card */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="mr-2 h-5 w-5 text-purple-400" />
                      ATS Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                        {atsScore}%
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${atsScore}%` }}
                        ></div>
                      </div>
                      <p className="text-purple-200 text-sm">AI-Optimized for ATS Systems</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Card */}
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white">Generated Resume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white text-gray-900 rounded-lg p-4 text-xs space-y-3 max-h-[500px] overflow-y-auto">
                      <div className="border-b pb-3">
                        <h2 className="text-lg font-bold">{generatedResume.fullName}</h2>
                        <p className="text-purple-600 font-semibold">{generatedResume.title}</p>
                        <div className="text-gray-600 text-xs space-y-1 mt-1">
                          <div>{generatedResume.email}</div>
                          <div>{generatedResume.phone}</div>
                          <div>{generatedResume.location}</div>
                        </div>
                      </div>

                      {generatedResume.summary && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">SUMMARY</h3>
                          <p className="text-gray-700">{generatedResume.summary}</p>
                        </div>
                      )}

                      {generatedResume.skills.length > 0 && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">SKILLS</h3>
                          <div className="flex flex-wrap gap-1">
                            {generatedResume.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-white hover:bg-purple-900/30 bg-transparent"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-300">Fill in the form and click generate to create your AI resume</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
