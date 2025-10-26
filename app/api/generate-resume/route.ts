import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { userDetails, jobDescription } = await request.json()

    if (!userDetails || !jobDescription) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `You are an expert resume writer. Create a professional, ATS-optimized resume based on the following information:

**User Details:**
- Name: ${userDetails.name}
- Email: ${userDetails.email}
- Phone: ${userDetails.phone}
- Address: ${userDetails.address}
- Education: ${userDetails.education}
- Experience: ${userDetails.experience}
- Skills: ${userDetails.skills}

**Target Job Description:**
${jobDescription}

Please create a professional resume that:
1. Is tailored to match the job requirements
2. Highlights relevant skills and experience
3. Uses professional formatting
4. Includes all contact information
5. Is optimized for ATS (Applicant Tracking Systems)
6. Uses action verbs and quantifiable achievements where possible

Format the resume in a clean, readable text format with clear sections for Contact Info, Summary, Experience, Education, and Skills.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert resume writer who creates ATS-optimized, professional resumes tailored to specific job requirements.",
    })

    return Response.json({ resume: text })
  } catch (error) {
    console.error("Resume generation error:", error)
    return Response.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}
