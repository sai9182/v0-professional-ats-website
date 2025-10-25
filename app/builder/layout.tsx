"use client"

import type React from "react"

import { AIChatSidebar } from "@/components/ai-chat-sidebar"

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <AIChatSidebar />
    </>
  )
}
