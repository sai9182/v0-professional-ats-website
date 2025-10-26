import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const formattedMessages = messages.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }))

    const { textStream } = await streamText({
      model: openai("gpt-4o"),
      system: `You are a professional resume coach and ATS optimization expert. You help users:
- Optimize their resumes for ATS systems
- Write strong bullet points with metrics
- Choose appropriate keywords
- Structure their resume effectively
- Answer questions about job applications and career development

Provide concise, actionable advice. Be encouraging and supportive.`,
      messages: formattedMessages,
    })

    let fullResponse = ""
    for await (const chunk of textStream) {
      fullResponse += chunk
    }

    return NextResponse.json({ message: fullResponse })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
