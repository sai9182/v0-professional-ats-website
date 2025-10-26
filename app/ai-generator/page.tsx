"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { AIChatSidebar } from "@/components/ai-chat-sidebar"
import { Wand2, Loader2, Download } from "lucide-react"
import jsPDF from "jspdf"

export default function AIGeneratorPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [userBackground, setUserBackground] = useState("")
  const [generatedResume, setGeneratedResume] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateResume = async () => {
    if (!jobDescription.trim() || !userBackground.trim()) {
      alert("Please fill in both job description and background")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          userBackground,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate resume")

      const data = await response.json()
      setGeneratedResume(data.resume)
    } catch (error) {
      console.error("Generation error:", error)
      alert("Failed to generate resume. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadResume = () => {
    if (!generatedResume) return

    const pdf = new jsPDF()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 15
    const maxWidth = pageWidth - margin * 2

    let yPosition = margin

    // Add gradient header
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(20)
    pdf.text("AI-Generated Resume", margin, yPosition)

    yPosition += 15

    // Split text into pages
    const lines = pdf.splitTextToSize(generatedResume, maxWidth)

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(11)

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 7
    })

    pdf.save("ai-generated-resume.pdf")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
      <Navigation />
      <AIChatSidebar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            AI Resume Generator
          </h1>
          <p className="text-xl text-slate-300 animate-fade-in-delay">
            Generate a tailored resume using AI based on job description and your background
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-6 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Wand2 className="text-purple-400" size={24} />
                Job Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Description</label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="min-h-[150px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Background</label>
                  <Textarea
                    value={userBackground}
                    onChange={(e) => setUserBackground(e.target.value)}
                    placeholder="Tell us about your experience, skills, and achievements..."
                    className="min-h-[150px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
                  />
                </div>

                <Button
                  onClick={handleGenerateResume}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Generate Resume
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {generatedResume ? (
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Generated Resume</h2>
                  <Button
                    onClick={downloadResume}
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/10 bg-transparent"
                  >
                    <Download size={18} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 text-slate-100 text-sm leading-relaxed max-h-[600px] overflow-y-auto prose prose-invert">
                  <div className="whitespace-pre-wrap text-xs font-mono">{generatedResume}</div>
                </div>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-purple-500/20 border-dashed p-8 h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <Wand2 className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">
                    Fill in the job details and click generate to create your AI-powered resume
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
