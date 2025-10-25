import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { jobDescription, background } = await request.json()

    const prompt = `You are an expert resume writer and ATS specialist. Based on the job description and user background provided, generate a tailored resume that will score highly with ATS systems.

Job Description:
${jobDescription}

User Background:
${background}

Generate a JSON resume with the following structure:
{
  "fullName": "string",
  "title": "string (professional title matching the job)",
  "email": "string",
  "phone": "string",
  "location": "string",
  "summary": "string (2-3 sentences tailored to the job)",
  "experiences": [
    {
      "company": "string",
      "position": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string (2-3 bullet points with metrics)"
    }
  ],
  "education": [
    {
      "school": "string",
      "degree": "string",
      "field": "string",
      "graduationDate": "string"
    }
  ],
  "skills": ["array of relevant skills from job description"]
}

Make sure to:
1. Extract keywords from the job description
2. Highlight relevant experience with metrics
3. Include technical skills that match the job
4. Use action verbs (Led, Implemented, Developed, etc.)
5. Optimize for ATS (no graphics, clear formatting)

Return only the valid JSON, no additional text.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    const resume = JSON.parse(text)

    // Calculate ATS score based on keyword matches
    const keywords = jobDescription.toLowerCase().match(/\b\w+\b/g) || []
    const resumeText = JSON.stringify(resume).toLowerCase()
    const matchedKeywords = keywords.filter((k) => resumeText.includes(k)).length
    const atsScore = Math.min(95, Math.floor((matchedKeywords / keywords.length) * 100))

    return Response.json({
      resume,
      atsScore,
    })
  } catch (error) {
    console.error("Error generating resume:", error)
    return Response.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}
