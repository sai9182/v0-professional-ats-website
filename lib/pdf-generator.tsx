import html2pdf from "html2pdf.js"

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

export function generateReportPDF(result: AnalysisResult, fileName: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #8b5cf6; padding-bottom: 20px;">
        <h1 style="color: #8b5cf6; margin: 0;">ATS Resume Analysis Report</h1>
        <p style="color: #666; margin: 10px 0 0 0;">Professional Assessment & Recommendations</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Overall ATS Score</h2>
        <div style="display: flex; align-items: center; gap: 20px; margin: 20px 0;">
          <div style="font-size: 48px; font-weight: bold; color: ${result.score >= 80 ? "#10b981" : result.score >= 65 ? "#f59e0b" : "#ef4444"};">
            ${result.score}/100
          </div>
          <div style="flex: 1;">
            <div style="background-color: #e5e7eb; height: 20px; border-radius: 10px; overflow: hidden;">
              <div style="background: linear-gradient(to right, #8b5cf6, #ec4899); height: 100%; width: ${result.score}%; transition: width 0.3s;"></div>
            </div>
            <p style="margin: 10px 0 0 0; color: #666;">${result.summary}</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Resume Summary</h2>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Name</p>
              <p style="font-weight: bold; margin: 0;">${result.resumeSummary.name}</p>
            </div>
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Professional Title</p>
              <p style="font-weight: bold; margin: 0;">${result.resumeSummary.title}</p>
            </div>
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Email</p>
              <p style="margin: 0;">${result.resumeSummary.contact.email}</p>
            </div>
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Phone</p>
              <p style="margin: 0;">${result.resumeSummary.contact.phone}</p>
            </div>
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Location</p>
              <p style="margin: 0;">${result.resumeSummary.contact.location}</p>
            </div>
            <div>
              <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Experience</p>
              <p style="margin: 0;">${result.resumeSummary.experience}</p>
            </div>
          </div>
          <div>
            <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Skills</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
              ${result.resumeSummary.skills.map((skill) => `<span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${skill}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div>
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Strengths</h2>
          <ul style="margin: 15px 0; padding-left: 20px; color: #333;">
            ${result.strengths.map((strength) => `<li style="margin-bottom: 8px;">${strength}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Areas for Improvement</h2>
          <ul style="margin: 15px 0; padding-left: 20px; color: #333;">
            ${result.improvements.map((improvement) => `<li style="margin-bottom: 8px;">${improvement}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Section Scores</h2>
        <div style="margin-top: 15px;">
          ${result.sections
            .map(
              (section) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-weight: bold;">${section.name}</span>
                <span style="color: ${section.score >= 80 ? "#10b981" : section.score >= 65 ? "#f59e0b" : "#ef4444"}; font-weight: bold;">${section.score}/100</span>
              </div>
              <div style="background-color: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: linear-gradient(to right, #8b5cf6, #ec4899); height: 100%; width: ${section.score}%;"></div>
              </div>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">${section.feedback}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Keyword Analysis</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
          <div>
            <h3 style="color: #10b981; margin-bottom: 10px;">Found Keywords (${result.keywords.found.length})</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${result.keywords.found.map((keyword) => `<span style="background-color: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${keyword}</span>`).join("")}
            </div>
          </div>
          <div>
            <h3 style="color: #ef4444; margin-bottom: 10px;">Missing Keywords (${result.keywords.missing.length})</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${result.keywords.missing.map((keyword) => `<span style="background-color: #fee2e2; color: #7f1d1d; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${keyword}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>

      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-top: 30px;">
        <h3 style="color: #8b5cf6; margin-top: 0;">Next Steps</h3>
        <ol style="margin: 10px 0; padding-left: 20px;">
          <li>Incorporate missing keywords naturally into your resume</li>
          <li>Improve low-scoring sections with more detail and metrics</li>
          <li>Ensure consistent formatting throughout</li>
          <li>Tailor your resume for specific job postings</li>
          <li>Use the AI Resume Generator to create optimized versions</li>
        </ol>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p>Generated on ${new Date().toLocaleDateString()} | ATS Resume Analyzer</p>
      </div>
    </div>
  `

  const element = document.createElement("div")
  element.innerHTML = html

  const options = {
    margin: 10,
    filename: `ATS-Report-${result.resumeSummary.name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
  }

  html2pdf().set(options).from(element).save()
}
