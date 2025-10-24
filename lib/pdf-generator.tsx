import jsPDF from "jspdf"

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

export async function generateReportPDF(analysisResult: AnalysisResult, fileName: string, downloadName: string) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Title
  doc.setFontSize(24)
  doc.setTextColor(124, 58, 237) // Purple
  doc.text("ATS Analysis Report", 20, yPosition)
  yPosition += 15

  // Score section
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text(`ATS Score: ${analysisResult.score}/100`, 20, yPosition)
  yPosition += 10

  // Summary
  doc.setFontSize(11)
  doc.setTextColor(80, 80, 80)
  const summaryLines = doc.splitTextToSize(analysisResult.summary, pageWidth - 40)
  doc.text(summaryLines, 20, yPosition)
  yPosition += summaryLines.length * 5 + 10

  // Resume Summary
  doc.setFontSize(12)
  doc.setTextColor(124, 58, 237)
  doc.text("Resume Summary", 20, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text(`Name: ${analysisResult.resumeSummary.name}`, 20, yPosition)
  yPosition += 6
  doc.text(`Title: ${analysisResult.resumeSummary.title}`, 20, yPosition)
  yPosition += 6
  doc.text(`Experience: ${analysisResult.resumeSummary.experience}`, 20, yPosition)
  yPosition += 6
  doc.text(`Education: ${analysisResult.resumeSummary.education}`, 20, yPosition)
  yPosition += 6
  doc.text(`Email: ${analysisResult.resumeSummary.contact.email}`, 20, yPosition)
  yPosition += 6
  doc.text(`Phone: ${analysisResult.resumeSummary.contact.phone}`, 20, yPosition)
  yPosition += 10

  // Skills
  doc.setFontSize(12)
  doc.setTextColor(124, 58, 237)
  doc.text("Skills", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  const skillsText = analysisResult.resumeSummary.skills.join(", ")
  const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 40)
  doc.text(skillsLines, 20, yPosition)
  yPosition += skillsLines.length * 5 + 10

  // Strengths
  doc.setFontSize(12)
  doc.setTextColor(34, 197, 94) // Green
  doc.text("Strengths", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  analysisResult.strengths.forEach((strength) => {
    const strengthLines = doc.splitTextToSize(`• ${strength}`, pageWidth - 40)
    doc.text(strengthLines, 20, yPosition)
    yPosition += strengthLines.length * 5
  })
  yPosition += 5

  // Check if we need a new page
  if (yPosition > pageHeight - 40) {
    doc.addPage()
    yPosition = 20
  }

  // Improvements
  doc.setFontSize(12)
  doc.setTextColor(251, 146, 60) // Orange
  doc.text("Areas for Improvement", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  analysisResult.improvements.forEach((improvement) => {
    const improvementLines = doc.splitTextToSize(`• ${improvement}`, pageWidth - 40)
    doc.text(improvementLines, 20, yPosition)
    yPosition += improvementLines.length * 5
  })
  yPosition += 5

  if (yPosition > pageHeight - 40) {
    doc.addPage()
    yPosition = 20
  }

  // Keywords Found
  doc.setFontSize(12)
  doc.setTextColor(34, 197, 94)
  doc.text("Keywords Found", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  const foundKeywordsText = analysisResult.keywords.found.join(", ")
  const foundKeywordsLines = doc.splitTextToSize(foundKeywordsText, pageWidth - 40)
  doc.text(foundKeywordsLines, 20, yPosition)
  yPosition += foundKeywordsLines.length * 5 + 10

  // Keywords Missing
  doc.setFontSize(12)
  doc.setTextColor(239, 68, 68) // Red
  doc.text("Missing Keywords", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  const missingKeywordsText = analysisResult.keywords.missing.join(", ")
  const missingKeywordsLines = doc.splitTextToSize(missingKeywordsText, pageWidth - 40)
  doc.text(missingKeywordsLines, 20, yPosition)
  yPosition += missingKeywordsLines.length * 5 + 10

  if (yPosition > pageHeight - 40) {
    doc.addPage()
    yPosition = 20
  }

  // Section Scores
  doc.setFontSize(12)
  doc.setTextColor(124, 58, 237)
  doc.text("Section Scores", 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  analysisResult.sections.forEach((section) => {
    doc.text(`${section.name}: ${section.score}/100`, 20, yPosition)
    yPosition += 5
    const feedbackLines = doc.splitTextToSize(section.feedback, pageWidth - 40)
    doc.text(feedbackLines, 25, yPosition)
    yPosition += feedbackLines.length * 5 + 5

    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = 20
    }
  })

  // Save PDF
  doc.save(downloadName)
}

export async function extractTextFromPDF(file: File): Promise<string> {
  // This is a simplified version - for production, use pdfjs-dist
  const text = await file.text()
  return text
}

export async function extractTextFromDOCX(file: File): Promise<string> {
  // This is a simplified version - for production, use docx library
  const text = await file.text()
  return text
}
