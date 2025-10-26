"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { AIChatSidebar } from "@/components/ai-chat-sidebar"
import { UserDetailsForm, type UserDetails } from "@/components/user-details-form"
import { JobDetailsForm } from "@/components/job-details-form"
import { Download } from "lucide-react"
import jsPDF from "jspdf"

type Step = "personal" | "job" | "result"

export default function AIGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<Step>("personal")
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [generatedResume, setGeneratedResume] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUserDetailsSubmit = (details: UserDetails) => {
    setUserDetails(details)
    setCurrentStep("job")
  }

  const handleJobDetailsSubmit = async (jobDescription: string) => {
    if (!userDetails) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userDetails,
          jobDescription,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate resume")

      const data = await response.json()
      setGeneratedResume(data.resume)
      setCurrentStep("result")
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

    // Add header
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

  const handleReset = () => {
    setCurrentStep("personal")
    setUserDetails(null)
    setGeneratedResume("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
      <Navigation />
      <AIChatSidebar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            AI Resume Generator
          </h1>
          <p className="text-xl text-slate-300 animate-fade-in-delay">
            Create a tailored resume that matches job requirements perfectly
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex justify-center gap-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              currentStep === "personal"
                ? "bg-purple-600 text-white"
                : currentStep === "job" || currentStep === "result"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 text-slate-400"
            }`}
          >
            1
          </div>
          <div className={`w-12 h-1 ${currentStep !== "personal" ? "bg-purple-600" : "bg-slate-700"}`} />
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              currentStep === "job" || currentStep === "result"
                ? "bg-purple-600 text-white"
                : "bg-slate-700 text-slate-400"
            }`}
          >
            2
          </div>
          <div className={`w-12 h-1 ${currentStep === "result" ? "bg-purple-600" : "bg-slate-700"}`} />
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              currentStep === "result" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"
            }`}
          >
            3
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "personal" && <UserDetailsForm onSubmit={handleUserDetailsSubmit} />}

        {currentStep === "job" && (
          <JobDetailsForm
            onSubmit={handleJobDetailsSubmit}
            onBack={() => setCurrentStep("personal")}
            isLoading={isLoading}
          />
        )}

        {currentStep === "result" && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Generated Resume</h2>
                  <p className="text-slate-400 mt-1">Tailored for {userDetails?.name}</p>
                </div>
                <Button
                  onClick={downloadResume}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <Download size={18} className="mr-2" />
                  Download PDF
                </Button>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 text-slate-100 max-h-[600px] overflow-y-auto">
                <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{generatedResume}</div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-purple-500/30 hover:bg-purple-500/10 bg-transparent text-white"
              >
                Create Another Resume
              </Button>
              <Button
                onClick={downloadResume}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
