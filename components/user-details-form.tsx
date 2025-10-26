"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

export interface UserDetails {
  name: string
  email: string
  phone: string
  address: string
  education: string
  experience: string
  skills: string
}

interface UserDetailsFormProps {
  onSubmit: (details: UserDetails) => void
  isLoading?: boolean
}

export function UserDetailsForm({ onSubmit, isLoading }: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      alert("Please enter your name")
      return
    }
    if (!formData.email.trim()) {
      alert("Please enter your email")
      return
    }
    if (!formData.education.trim()) {
      alert("Please enter your education details")
      return
    }
    if (!formData.experience.trim()) {
      alert("Please enter your experience")
      return
    }

    onSubmit(formData)
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      <p className="text-slate-400 mb-6">
        Please provide your details. We'll use this information to generate your tailored resume.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className="bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="City, State, Country"
            className="bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Education *</label>
          <Textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., Bachelor's in Computer Science from XYZ University (2020)"
            className="min-h-[100px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Work Experience *</label>
          <Textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer at ABC Company (2020-2024)
- Led development of microservices architecture
- Managed team of 5 developers"
            className="min-h-[120px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
            required
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Skills</label>
          <Textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js, Python, AWS, Docker, etc. (comma separated)"
            className="min-h-[80px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
        >
          {isLoading ? "Processing..." : "Continue to Job Details"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Card>
  )
}
