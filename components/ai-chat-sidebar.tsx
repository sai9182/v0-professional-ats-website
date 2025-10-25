"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Minimize2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChatSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Resume Coach. I can help you:\n\n• Optimize your resume for ATS systems\n• Tailor resumes for specific job postings\n• Improve your professional summary\n• Suggest better keywords and action verbs\n• Answer career development questions\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-40 animate-pulse"
        title="Open AI Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 right-0 w-96 h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-l border-purple-500/30 flex flex-col shadow-2xl transform transition-all duration-300 z-50",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between border-b border-purple-400/30">
          <div className="flex items-center gap-2 text-white">
            <div className="animate-pulse">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-bold">AI Resume Coach</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("animate-fade-in", message.role === "user" ? "flex justify-end" : "flex justify-start")}
            >
              <div
                className={cn(
                  "max-w-xs rounded-lg p-4 text-sm leading-relaxed shadow-lg",
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                    : "bg-slate-800 text-purple-100 rounded-bl-none border border-purple-500/20",
                )}
              >
                {message.content.split("\n").map((line, i) => (
                  <div key={i}>{line || " "}</div>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-slate-800 text-purple-100 rounded-lg p-3 rounded-bl-none border border-purple-500/20">
                <div className="flex gap-2">
                  <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500/30 bg-slate-900/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything..."
              className="bg-slate-800 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500/60"
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Toggle Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-40 group"
          title="Open AI Chat"
        >
          <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-pulse opacity-50"></div>
          <MessageCircle className="h-6 w-6 relative z-10 group-hover:animate-bounce" />
        </button>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
