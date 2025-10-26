"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, AlertCircle, CheckCircle, Loader2, Upload } from "lucide-react"
import jsPDF from "jspdf"

interface AnalysisResult {
  isResume: boolean
  atsScore: number
  summary: string
  strengths: string[]
  improvements: string[]
  keywords: string[]
  missingKeywords: string[]
  feedback: string
}

// Extract text from DOCX
const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    const mammoth = await import("mammoth")
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value || ""
  } catch (error) {
    console.error("DOCX extraction error:", error)
    throw new Error("Failed to extract text from DOCX file")
  }
}

// Extract text from TXT
const extractTextFromTXT = async (file: File): Promise<string> => {
  try {
    return await file.text()
  } catch (error) {
    console.error("TXT extraction error:", error)
    throw new Error("Failed to extract text from TXT file")
  }
}

// Extract text from PDF
const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const text = new TextDecoder().decode(arrayBuffer)

    const lines = text
      .split(/[\n\r]+/)
      .filter((line) => line.trim().length > 0)
      .filter((line) => /[a-zA-Z0-9]/.test(line))
      .map((line) => line.replace(/[^\x20-\x7E]/g, ""))
      .filter((line) => line.trim().length > 0)

    return lines.join("\n")
  } catch (error) {
    console.error("PDF extraction error:", error)
    return ""
  }
}

const validateAndAnalyzeResume = async (fileContent: string): Promise<AnalysisResult> => {
  const resumeKeywords = [
    "experience",
    "education",
    "skills",
    "work",
    "employment",
    "degree",
    "qualification",
    "contact",
    "email",
    "phone",
  ]

  const contentLower = fileContent.toLowerCase()
  const resumeKeywordCount = resumeKeywords.filter((keyword) => contentLower.includes(keyword)).length

  if (resumeKeywordCount < 3 || fileContent.trim().length < 100) {
    return {
      isResume: false,
      atsScore: 0,
      summary: "❌ This does not appear to be a valid resume.",
      strengths: [],
      improvements: [],
      keywords: [],
      missingKeywords: [],
      feedback:
        "Please upload a valid resume file with standard sections like experience, education, and skills. A resume should contain contact information, work experience, education details, and skills.",
    }
  }

  const atsKeywords = [
    "managed",
    "developed",
    "implemented",
    "led",
    "designed",
    "achieved",
    "improved",
    "certified",
    "award",
    "responsible",
    "created",
    "delivered",
  ]

  const keywordsFound = atsKeywords.filter((keyword) => contentLower.includes(keyword))

  const sections = {
    hasContact: contentLower.includes("email") || contentLower.includes("phone") || contentLower.includes("@"),
    hasSummary:
      contentLower.includes("professional summary") ||
      contentLower.includes("objective") ||
      contentLower.includes("about"),
    hasExperience:
      contentLower.includes("experience") || contentLower.includes("work") || contentLower.includes("employment"),
    hasEducation:
      contentLower.includes("education") || contentLower.includes("degree") || contentLower.includes("university"),
    hasSkills: contentLower.includes("skills") || contentLower.includes("technical"),
    hasCertifications: contentLower.includes("certification") || contentLower.includes("certified"),
  }

  const sectionScore = Object.values(sections).filter(Boolean).length
  const baseScore = 30 + sectionScore * 10
  const keywordBonus = Math.min(keywordsFound.length * 3, 30)
  const atsScore = Math.min(100, Math.round(baseScore + keywordBonus))

  const strengths: string[] = []
  const improvements: string[] = []

  if (sections.hasContact) strengths.push("✓ Clear contact information included")
  else improvements.push("Add contact information (email, phone, location)")

  if (sections.hasSummary) strengths.push("✓ Professional summary present")
  else improvements.push("Consider adding a professional summary or objective")

  if (sections.hasExperience) strengths.push("✓ Work experience well documented")
  else improvements.push("Include detailed work experience with achievements")

  if (sections.hasEducation) strengths.push("✓ Education section included")
  else improvements.push("Add your education details and degrees")

  if (sections.hasSkills) strengths.push("✓ Skills section present")
  else improvements.push("Create a dedicated skills section with relevant technologies")

  if (sections.hasCertifications) strengths.push("✓ Certifications and credentials included")
  else improvements.push("Add relevant professional certifications if applicable")

  if (keywordsFound.length > 5) strengths.push("✓ Strong action verbs and achievements")
  else improvements.push("Use more action verbs (managed, developed, led, designed) and quantifiable achievements")

  if (contentLower.includes("linkedin") || contentLower.includes("github"))
    strengths.push("✓ Professional profiles linked")
  else improvements.push("Add links to professional profiles (LinkedIn, GitHub, Portfolio)")

  if (contentLower.includes("%") || contentLower.includes("increased") || contentLower.includes("decreased"))
    strengths.push("✓ Quantified metrics and results")
  else improvements.push("Add metrics and percentages to demonstrate impact")

  const missingKeywords = [
    "leadership",
    "teamwork",
    "communication",
    "problem-solving",
    "analysis",
    "collaboration",
    "project management",
  ].filter((keyword) => !contentLower.includes(keyword))

  const statusMessage =
    atsScore >= 80
      ? "✓ Excellent - Your resume is well-optimized for ATS systems"
      : atsScore >= 60
        ? "◐ Good - Some improvements needed for better ATS compatibility"
        : "✗ Needs Work - Apply the suggestions below to improve your score"

  return {
    isResume: true,
    atsScore,
    summary: `Your resume has been analyzed. ATS Score: ${atsScore}/100. ${statusMessage}`,
    strengths,
    improvements,
    keywords: keywordsFound,
    missingKeywords,
    feedback: `Your resume contains ${sectionScore} out of 6 recommended sections. ${
      atsScore >= 80
        ? "Great job! Your resume is well-structured and highly optimized for ATS systems."
        : atsScore >= 60
          ? "Your resume has good structure but needs optimization in the areas mentioned above."
          : "Apply the improvements above to increase your ATS compatibility score and improve your chances of passing through ATS filters."
    }`,
  }
}

export default function UploadPageClient() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (!uploadedFile) return

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (!validTypes.includes(uploadedFile.type) && !uploadedFile.name.match(/\.(pdf|docx|txt)$/i)) {
      setError("❌ Invalid file type. Please upload a PDF, DOCX, or TXT file.")
      return
    }

    setFile(uploadedFile)
    setError(null)
    setAnalysis(null)
    setIsAnalyzing(true)

    try {
      let fileContent = ""

      if (uploadedFile.type === "application/pdf" || uploadedFile.name.endsWith(".pdf")) {
        fileContent = await extractTextFromPDF(uploadedFile)
      } else if (
        uploadedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        uploadedFile.name.endsWith(".docx")
      ) {
        fileContent = await extractTextFromDOCX(uploadedFile)
      } else {
        fileContent = await extractTextFromTXT(uploadedFile)
      }

      if (!fileContent || fileContent.trim().length < 50) {
        setError(
          "❌ Could not extract enough text from file. Please ensure:\n• The file is not empty\n• The file is readable and not corrupted\n• The file contains at least 50 characters of text",
        )
        setIsAnalyzing(false)
        return
      }

      const result = await validateAndAnalyzeResume(fileContent)
      setAnalysis(result)

      if (!result.isResume) {
        setError("❌ This does not appear to be a valid resume.\n\n" + result.feedback)
      }
    } catch (err) {
      console.error("Error processing file:", err)
      setError(
        `❌ Error processing file: ${err instanceof Error ? err.message : "Unknown error"}\n\nPlease try another file.`,
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  const downloadAnalysisReport = () => {
    if (!analysis) return

    const pdf = new jsPDF()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 15
    const maxWidth = pageWidth - margin * 2

    let yPosition = margin

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(20)
    pdf.setTextColor(99, 102, 241)
    pdf.text("Resume ATS Analysis Report", margin, yPosition)

    yPosition += 15

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`ATS Score: ${analysis.atsScore}/100`, margin, yPosition)

    yPosition += 12

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(12)
    pdf.text("Summary:", margin, yPosition)

    yPosition += 6

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(11)
    const summaryLines = pdf.splitTextToSize(analysis.summary, maxWidth)
    summaryLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 5
    })

    yPosition += 8

    if (analysis.strengths.length > 0) {
      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(12)
      pdf.setTextColor(34, 197, 94)
      pdf.text("Strengths:", margin, yPosition)
      yPosition += 6

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(11)
      pdf.setTextColor(0, 0, 0)
      analysis.strengths.forEach((strength) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        const lines = pdf.splitTextToSize(strength, maxWidth - 10)
        lines.forEach((line: string) => {
          pdf.text(`• ${line}`, margin + 5, yPosition)
          yPosition += 5
        })
      })
    }

    yPosition += 6

    if (analysis.improvements.length > 0) {
      if (yPosition > pageHeight - margin * 2) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(12)
      pdf.setTextColor(245, 158, 11)
      pdf.text("Areas for Improvement:", margin, yPosition)
      yPosition += 6

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(11)
      pdf.setTextColor(0, 0, 0)
      analysis.improvements.forEach((improvement) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        const lines = pdf.splitTextToSize(improvement, maxWidth - 10)
        lines.forEach((line: string) => {
          pdf.text(`• ${line}`, margin + 5, yPosition)
          yPosition += 5
        })
      })
    }

    yPosition += 6

    if (yPosition > pageHeight - margin * 2) {
      pdf.addPage()
      yPosition = margin
    }
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text("Keywords Found:", margin, yPosition)
    yPosition += 6

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(10)
    const keywordText = analysis.keywords.join(", ") || "None detected"
    const keywordLines = pdf.splitTextToSize(keywordText, maxWidth)
    keywordLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 4
    })

    yPosition += 6

    if (yPosition > pageHeight - margin * 2) {
      pdf.addPage()
      yPosition = margin
    }
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text("Detailed Feedback:", margin, yPosition)
    yPosition += 6

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(11)
    const feedbackLines = pdf.splitTextToSize(analysis.feedback, maxWidth)
    feedbackLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 5
    })

    pdf.save(`Resume-Analysis-${Date.now()}.pdf`)
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Upload Your Resume</h2>
          <p className="text-slate-300 mb-8">Drag and drop or click to upload your resume for instant ATS analysis</p>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.classList.add("bg-purple-500/10")
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("bg-purple-500/10")
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove("bg-purple-500/10")
              const droppedFile = e.dataTransfer.files?.[0]
              if (droppedFile) {
                handleFileUpload({ target: { files: e.dataTransfer.files } } as any)
              }
            }}
            className="border-2 border-dashed border-purple-500/50 hover:border-purple-500 rounded-lg p-12 cursor-pointer transition-all duration-300 hover:bg-purple-500/5"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-semibold mb-2">Click to upload or drag and drop</p>
              <p className="text-slate-400">PDF, DOCX or TXT (Max. 10MB)</p>
            </div>
          </div>

          {file && (
            <div className="mt-4 text-sm text-slate-300">
              Selected file: <span className="font-semibold text-purple-400">{file.name}</span>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <AlertDescription className="text-red-200 whitespace-pre-wrap">{error}</AlertDescription>
        </Alert>
      )}

      {isAnalyzing && (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
          <div className="flex items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <div>
              <p className="text-white font-semibold">Analyzing your resume...</p>
              <p className="text-slate-400 text-sm">Our AI is scanning your resume for ATS compatibility</p>
            </div>
          </div>
        </Card>
      )}

      {analysis && !isAnalyzing && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">ATS Compatibility Score</h3>
                <p className="text-slate-400">
                  {analysis.atsScore >= 80
                    ? "✓ Excellent - Your resume is well-optimized"
                    : analysis.atsScore >= 60
                      ? "◐ Good - Room for improvements"
                      : "✗ Needs Work - Apply suggestions below"}
                </p>
              </div>
              <Button
                onClick={downloadAnalysisReport}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 whitespace-nowrap"
              >
                <Download size={18} className="mr-2" />
                Download PDF Report
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {analysis.atsScore}
                </span>
                <span className="text-slate-400 text-xl">/100</span>
              </div>
              <Progress value={analysis.atsScore} className="h-4 bg-slate-700" />
            </div>

            <p className="text-slate-300 leading-relaxed">{analysis.summary}</p>
          </Card>

          {analysis.strengths.length > 0 && (
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-emerald-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-emerald-500" size={24} />
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-500 font-bold text-lg leading-none mt-1">✓</span>
                    <span className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20 flex-1">
                      {strength}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {analysis.improvements.length > 0 && (
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="text-amber-500" size={24} />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-amber-500 font-bold text-lg leading-none mt-1">◐</span>
                    <span className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/20 flex-1">
                      {improvement}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Keywords Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300 font-semibold mb-3">Found Keywords ({analysis.keywords.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.length > 0 ? (
                    analysis.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30 font-medium"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">None detected</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-300 font-semibold mb-3">
                  Missing Keywords ({analysis.missingKeywords.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 6).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30 font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-blue-500/20 p-8">
            <h3 className="text-xl font-bold text-white mb-4">Detailed Feedback</h3>
            <p className="text-slate-300 leading-relaxed mb-6">{analysis.feedback}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setAnalysis(null)
                  setFile(null)
                  setError(null)
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                Analyze Another Resume
              </Button>
              <a href="/builder" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Build Better Resume
                </Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
