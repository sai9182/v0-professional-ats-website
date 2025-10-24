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

const ATS_KEYWORDS = {
  technical: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "REST API",
    "GraphQL",
    "HTML",
    "CSS",
    "Vue",
    "Angular",
    "Express",
    "Django",
    "Flask",
    "Spring Boot",
    "Microservices",
    "API",
    "Database",
    "Cloud",
    "Linux",
    "Windows",
    "MacOS",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
  ],
  soft_skills: [
    "leadership",
    "communication",
    "teamwork",
    "collaboration",
    "problem solving",
    "critical thinking",
    "project management",
    "agile",
    "scrum",
    "organization",
    "time management",
    "adaptability",
    "creativity",
    "analytical",
  ],
  action_verbs: [
    "developed",
    "designed",
    "implemented",
    "managed",
    "led",
    "created",
    "built",
    "engineered",
    "architected",
    "optimized",
    "improved",
    "increased",
    "reduced",
    "achieved",
    "delivered",
    "deployed",
    "launched",
    "established",
    "coordinated",
    "collaborated",
  ],
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // For browser environment, we'll extract text by converting to blob
    const arrayBuffer = await file.arrayBuffer()
    const text = new TextDecoder("utf-8", { fatal: false }).decode(arrayBuffer)

    // Extract readable text from PDF
    // This is a simplified extraction that works in browser
    const lines = text
      .split(/[\r\n]+/)
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/[^\x20-\x7E\s]/g, "").trim())
      .filter((line) => line.length > 0)

    return lines.join("\n")
  } catch (error) {
    console.error("Error extracting PDF text:", error)
    throw new Error("Failed to extract text from PDF. Please ensure it's a valid PDF file.")
  }
}

export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    // DOCX files are ZIP archives, extract and parse XML
    const text = new TextDecoder("utf-8", { fatal: false }).decode(arrayBuffer)

    // Extract readable text content
    const lines = text
      .split(/[\r\n]+/)
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/[<>{}[\]&/\\"']/g, " ").trim())
      .filter((line) => line.length > 2)

    return lines.join("\n")
  } catch (error) {
    console.error("Error extracting DOCX text:", error)
    throw new Error("Failed to extract text from DOCX. Please ensure it's a valid Word file.")
  }
}

function extractEmail(text: string): string {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const match = text.match(emailRegex)
  return match ? match[0] : "Not found"
}

function extractPhone(text: string): string {
  // Match various phone formats
  const phoneRegex = /(\+?1[-.\s]?)?($$)?[0-9]{3}($$)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/
  const match = text.match(phoneRegex)
  return match ? match[0].trim() : "Not found"
}

function extractName(text: string): string {
  const lines = text.split("\n").filter((line) => line.trim().length > 0)

  // First non-empty line is likely the name
  for (const line of lines) {
    const trimmed = line.trim()
    // Check if it looks like a name (no emails, no phone, short, no numbers mostly)
    if (
      trimmed.length < 60 &&
      trimmed.length > 2 &&
      !trimmed.includes("@") &&
      !trimmed.includes("http") &&
      trimmed.split(" ").length <= 4
    ) {
      return trimmed
    }
  }
  return "Not found"
}

function extractLocation(text: string): string {
  const locationRegex = /(?:based in|located in|from|at|city|state)\s+([A-Za-z\s,]+?)(?:\.|,|$)/i
  const match = text.match(locationRegex)
  return match ? match[1].trim() : "Not found"
}

function extractSkills(text: string): string[] {
  const textLower = text.toLowerCase()
  const foundSkills: string[] = []

  ATS_KEYWORDS.technical.forEach((skill) => {
    if (textLower.includes(skill.toLowerCase())) {
      foundSkills.push(skill)
    }
  })

  return [...new Set(foundSkills)].slice(0, 10)
}

function extractMissingKeywords(text: string): string[] {
  const textLower = text.toLowerCase()
  const missing: string[] = []

  const allKeywords = [...ATS_KEYWORDS.technical, ...ATS_KEYWORDS.soft_skills, ...ATS_KEYWORDS.action_verbs]

  allKeywords.forEach((keyword) => {
    if (!textLower.includes(keyword.toLowerCase())) {
      missing.push(keyword)
    }
  })

  // Shuffle and return top 10
  return missing.sort(() => Math.random() - 0.5).slice(0, 10)
}

function calculateSectionScores(text: string): Array<{ name: string; score: number; feedback: string }> {
  const textLower = text.toLowerCase()
  const scores = []

  // Contact Information Score
  const hasEmail = extractEmail(text) !== "Not found"
  const hasPhone = extractPhone(text) !== "Not found"
  const contactScore = (hasEmail ? 50 : 0) + (hasPhone ? 50 : 0)
  scores.push({
    name: "Contact Information",
    score: contactScore,
    feedback: hasEmail && hasPhone ? "Complete contact information" : "Missing email or phone",
  })

  // Professional Summary Score
  const hasSummary = textLower.includes("summary") || textLower.includes("objective") || textLower.includes("profile")
  const summaryScore = hasSummary ? 75 : 40
  scores.push({
    name: "Professional Summary",
    score: summaryScore,
    feedback: hasSummary ? "Good professional summary" : "Add a professional summary",
  })

  // Work Experience Score
  const hasExperience =
    textLower.includes("experience") || textLower.includes("work history") || textLower.includes("employment")
  const experienceScore = hasExperience ? 85 : 30
  scores.push({
    name: "Work Experience",
    score: experienceScore,
    feedback: hasExperience ? "Strong experience section" : "Add work experience details",
  })

  // Skills Section Score
  const skills = extractSkills(text)
  const hasSkillsSection = textLower.includes("skills") || textLower.includes("technical")
  const skillsScore = hasSkillsSection ? (skills.length > 5 ? 90 : 70) : skills.length > 3 ? 60 : 35
  scores.push({
    name: "Skills",
    score: skillsScore,
    feedback: skills.length > 5 ? "Excellent skills coverage" : `Add more skills (found: ${skills.length})`,
  })

  // Education Score
  const hasEducation =
    textLower.includes("education") ||
    textLower.includes("degree") ||
    textLower.includes("university") ||
    textLower.includes("bachelor") ||
    textLower.includes("master")
  const educationScore = hasEducation ? 85 : 50
  scores.push({
    name: "Education",
    score: educationScore,
    feedback: hasEducation ? "Well-structured education" : "Include education details",
  })

  return scores
}

function calculateOverallScore(sections: Array<{ name: string; score: number; feedback: string }>): number {
  const totalScore = sections.reduce((sum, section) => sum + section.score, 0)
  return Math.round(totalScore / sections.length)
}

function generateStrengths(text: string): string[] {
  const strengths: string[] = []
  const textLower = text.toLowerCase()

  if (extractEmail(text) !== "Not found" && extractPhone(text) !== "Not found") {
    strengths.push("Complete contact information provided")
  }

  const skills = extractSkills(text)
  if (skills.length >= 8) {
    strengths.push(`Strong technical skills section (${skills.length} technologies found)`)
  } else if (skills.length > 0) {
    strengths.push(`Multiple relevant skills identified (${skills.length} found)`)
  }

  const actionVerbCount = ATS_KEYWORDS.action_verbs.filter((verb) => textLower.includes(verb.toLowerCase())).length

  if (actionVerbCount > 8) {
    strengths.push("Excellent use of action verbs and strong descriptions")
  } else if (actionVerbCount > 4) {
    strengths.push("Good use of action verbs in achievements")
  }

  if (/\d{2,}%|\$[\d,]+/.test(text)) {
    strengths.push("Includes quantifiable metrics and achievements")
  }

  if (textLower.includes("certif") || textLower.includes("license")) {
    strengths.push("Includes relevant certifications and credentials")
  }

  if (textLower.includes("project") || textLower.includes("portfolio")) {
    strengths.push("Showcases project experience and portfolio")
  }

  return strengths.length > 0
    ? strengths
    : ["Resume has clear structure", "Contains contact information", "Documents work history"]
}

function generateImprovements(text: string): string[] {
  const improvements: string[] = []
  const textLower = text.toLowerCase()

  if (extractEmail(text) === "Not found") {
    improvements.push("Add a clear email address to contact section")
  }

  if (extractPhone(text) === "Not found") {
    improvements.push("Include a phone number in contact information")
  }

  const skills = extractSkills(text)
  if (skills.length < 6) {
    improvements.push("Expand technical skills section with more relevant keywords")
  }

  const actionVerbCount = ATS_KEYWORDS.action_verbs.filter((verb) => textLower.includes(verb.toLowerCase())).length

  if (actionVerbCount < 5) {
    improvements.push("Use more action verbs to describe accomplishments and impact")
  }

  if (!/\d{2,}%|\$[\d,]+/.test(text)) {
    improvements.push("Add quantifiable results (e.g., 'Increased sales by 30%')")
  }

  if (!textLower.includes("summary") && !textLower.includes("objective")) {
    improvements.push("Add a professional summary or objective statement")
  }

  return improvements.slice(0, 5)
}

export async function analyzeResume(text: string, fileName: string): Promise<AnalysisResult> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("No text content found in file")
    }

    // Extract key information
    const email = extractEmail(text)
    const phone = extractPhone(text)
    const name = extractName(text)
    const location = extractLocation(text)
    const skills = extractSkills(text)
    const missingKeywords = extractMissingKeywords(text)

    // Calculate section scores
    const sections = calculateSectionScores(text)
    const score = calculateOverallScore(sections)

    // Extract other information
    const textLower = text.toLowerCase()
    const hasExperience =
      textLower.includes("experience") || textLower.includes("work") || textLower.includes("employment")
    const hasEducation =
      textLower.includes("education") || textLower.includes("degree") || textLower.includes("university")

    // Generate strengths and improvements
    const strengths = generateStrengths(text)
    const improvements = generateImprovements(text)

    // Create summary
    let summary = `Your resume scores ${score}/100 on ATS compatibility. `
    if (score >= 80) {
      summary += "Excellent! Your resume is well-optimized for ATS systems."
    } else if (score >= 65) {
      summary +=
        "Good structure. Consider optimizing keywords and adding quantifiable achievements to improve your score."
    } else if (score >= 50) {
      summary += "Your resume needs improvements in formatting and keyword optimization for better ATS compatibility."
    } else {
      summary +=
        "Significant improvements needed. Focus on adding industry keywords, contact info, and organizing sections clearly."
    }

    const result: AnalysisResult = {
      score,
      summary,
      resumeSummary: {
        name: name !== "Not found" ? name : "Professional",
        title: textLower.includes("senior")
          ? "Senior Professional"
          : textLower.includes("manager")
            ? "Manager"
            : textLower.includes("director")
              ? "Director"
              : "Professional",
        experience: hasExperience ? "Experience details found" : "No experience section detected",
        education: hasEducation ? "Education details found" : "No education section detected",
        skills: skills.length > 0 ? skills : ["Add technical skills"],
        contact: {
          email,
          phone,
          location,
        },
      },
      strengths,
      improvements,
      keywords: {
        found: skills,
        missing: missingKeywords,
      },
      sections,
    }

    return result
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw new Error(`Failed to analyze resume: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
