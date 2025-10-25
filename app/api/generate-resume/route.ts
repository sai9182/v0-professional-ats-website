import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { jobDescription, background } = await request.json()

    const prompt = `You are an expert resume writer. Based on the job description and candidate background, generate a professional resume in JSON format.

Job Description:
${jobDescription}

Candidate Background:
${background}

Generate a resume JSON with this exact structure:
{
  "fullName": "Full Name",
  "title": "Job Title",
  "email": "email@example.com",
  "phone": "+1-123-456-7890",
  "location": "City, State",
  "summary": "Professional summary (2-3 sentences)",
  "experiences": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "description": "Detailed description with achievements and metrics"
    }
  ],
  "education": [
    {
      "school": "School Name",
      "degree": "Degree",
      "field": "Field",
      "graduationDate": "MM/YYYY"
    }
  ],
  "skills": ["Skill1", "Skill2", "Skill3"]
}

Make sure to:
1. Tailor all content to match the job description keywords
2. Include specific metrics and achievements
3. Use action verbs
4. Highlight relevant skills
5. Make it ATS-optimized`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    const resume = JSON.parse(text)

    // Calculate ATS score based on job match
    const jobKeywords = jobDescription.toLowerCase().split(/\W+/)
    const resumeText = JSON.stringify(resume).toLowerCase()
    const matchedKeywords = jobKeywords.filter((keyword) => resumeText.includes(keyword) && keyword.length > 3)
    const atsScore = Math.min(95, 60 + matchedKeywords.length * 2)

    return Response.json({ resume, atsScore })
  } catch (error) {
    console.error("Error generating resume:", error)
    return Response.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}
