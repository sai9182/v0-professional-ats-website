import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const systemPrompt = `You are an expert resume coach and career advisor. You help users:
1. Improve their resumes for ATS optimization
2. Tailor resumes for specific job postings
3. Answer questions about career development
4. Provide feedback on resume content
5. Suggest skills and keywords to add

Be concise, professional, and actionable. Provide specific recommendations when possible.`

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    })

    let fullText = ""
    for await (const chunk of result.textStream) {
      fullText += chunk
    }

    return Response.json({ message: fullText })
  } catch (error) {
    console.error("Error in chat:", error)
    return Response.json({ error: "Failed to process message" }, { status: 500 })
  }
}
