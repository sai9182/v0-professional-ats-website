import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, userBackground } = await request.json()

    if (!jobDescription || !userBackground) {
      return NextResponse.json({ error: "Missing job description or user background" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an expert resume writer and ATS optimization specialist. 
      
Create a professional, ATS-optimized resume based on the following:

JOB DESCRIPTION:
${jobDescription}

APPLICANT BACKGROUND:
${userBackground}

Generate a complete resume that:
1. Matches the job description requirements
2. Uses ATS-friendly formatting (simple structure, no columns)
3. Incorporates relevant keywords from the job posting
4. Highlights achievements with metrics and numbers
5. Uses strong action verbs
6. Follows standard resume sections: Contact, Professional Summary, Experience, Education, Skills

Format the resume professionally with clear sections. Make it compelling and tailored to the job.`,
      system:
        "You are a professional resume writer who creates ATS-optimized resumes. Always provide well-structured, keyword-rich resumes that pass ATS systems.",
    })

    return NextResponse.json({ resume: text })
  } catch (error) {
    console.error("Resume generation error:", error)
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}
