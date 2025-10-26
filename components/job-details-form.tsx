"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Wand2, Loader2 } from "lucide-react"
import React from "react"

interface JobDetailsFormProps {
  onSubmit: (jobDescription: string) => void
  onBack: () => void
  isLoading?: boolean
}

export function JobDetailsForm({ onSubmit, onBack, isLoading }: JobDetailsFormProps) {
  const [jobDescription, setJobDescription] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!jobDescription.trim()) {
      alert("Please enter the job description")
      return
    }

    onSubmit(jobDescription)
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-8">
      <h2 className="text-2xl font-bold text-white mb-2">Job Description</h2>
      <p className="text-slate-400 mb-6">
        Paste the job description below. We'll tailor your resume to match the requirements.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Job Description *</label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here... Include responsibilities, requirements, qualifications, etc."
            className="min-h-[300px] bg-slate-800 border-purple-500/30 text-white placeholder-slate-400"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 border-purple-500/30 hover:bg-purple-500/10 bg-transparent text-white"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Resume...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Resume
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
