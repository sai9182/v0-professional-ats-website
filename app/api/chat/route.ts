import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const systemPrompt = `You are an expert career coach and resume specialist with years of experience helping professionals optimize their resumes for ATS systems and job applications. 

Your expertise includes:
- ATS optimization and keyword placement
- Resume formatting and structure
- Career advancement strategies
- Interview preparation
- Job search tactics
- Skills development

Provide concise, actionable advice. If someone asks about their resume, ask specific questions to understand their situation better. Always give practical tips they can implement immediately.`

    const response = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    let fullText = ""
    for await (const chunk of response.textStream) {
      fullText += chunk
    }

    return Response.json({ message: fullText })
  } catch (error) {
    console.error("Error in chat:", error)
    return Response.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
