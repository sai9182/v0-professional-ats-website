"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Target, Plus, Building, FileText, TrendingUp, Eye, Download, Upload } from "lucide-react"
import Link from "next/link"

interface Resume {
  id: string
  name: string
  version: string
  uploadDate: string
  applications: number
  responses: number
  successRate: number
  lastUsed: string
  fileSize: string
}

interface ATSResult {
  id: string
  resumeId: string
  company: string
  atsSystem: string
  score: number
  feedback: string[]
  submissionDate: string
  status: "passed" | "failed" | "pending"
}

export default function ResumeTracker() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: "1",
      name: "Software Engineer Resume",
      version: "v2.1",
      uploadDate: "2024-01-15",
      applications: 12,
      responses: 8,
      successRate: 67,
      lastUsed: "2024-01-20",
      fileSize: "245 KB",
    },
    {
      id: "2",
      name: "Full Stack Developer Resume",
      version: "v1.3",
      uploadDate: "2024-01-10",
      applications: 8,
      responses: 3,
      successRate: 38,
      lastUsed: "2024-01-18",
      fileSize: "198 KB",
    },
  ])

  const [atsResults, setATSResults] = useState<ATSResult[]>([
    {
      id: "1",
      resumeId: "1",
      company: "Google",
      atsSystem: "Workday",
      score: 85,
      feedback: ["Strong keyword match", "Good formatting", "Missing some technical skills"],
      submissionDate: "2024-01-20",
      status: "passed",
    },
    {
      id: "2",
      resumeId: "1",
      company: "Microsoft",
      atsSystem: "Greenhouse",
      score: 72,
      feedback: ["Adequate keyword match", "Format issues detected", "Experience section needs improvement"],
      submissionDate: "2024-01-18",
      status: "passed",
    },
    {
      id: "3",
      resumeId: "2",
      company: "Amazon",
      atsSystem: "BambooHR",
      score: 45,
      feedback: ["Low keyword match", "Poor formatting", "Missing required sections"],
      submissionDate: "2024-01-16",
      status: "failed",
    },
  ])

  const [isAddingResume, setIsAddingResume] = useState(false)
  const [newResume, setNewResume] = useState({
    name: "",
    version: "",
  })

  const addResume = () => {
    if (newResume.name && newResume.version) {
      const resume: Resume = {
        id: Date.now().toString(),
        name: newResume.name,
        version: newResume.version,
        uploadDate: new Date().toISOString().split("T")[0],
        applications: 0,
        responses: 0,
        successRate: 0,
        lastUsed: "Never",
        fileSize: "0 KB",
      }
      setResumes([...resumes, resume])
      setNewResume({ name: "", version: "" })
      setIsAddingResume(false)
    }
  }

  const getOverallStats = () => {
    const totalApplications = resumes.reduce((sum, resume) => sum + resume.applications, 0)
    const totalResponses = resumes.reduce((sum, resume) => sum + resume.responses, 0)
    const avgSuccessRate =
      resumes.length > 0 ? Math.round(resumes.reduce((sum, resume) => sum + resume.successRate, 0) / resumes.length) : 0
    const avgATSScore =
      atsResults.length > 0
        ? Math.round(atsResults.reduce((sum, result) => sum + result.score, 0) / atsResults.length)
        : 0

    return { totalApplications, totalResponses, avgSuccessRate, avgATSScore }
  }

  const stats = getOverallStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Sai.dev Resume Tracker</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddingResume} onOpenChange={setIsAddingResume}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Resume
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Resume</DialogTitle>
                    <DialogDescription>Add a new resume version to track its ATS performance</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="resumeName">Resume Name</Label>
                      <Input
                        id="resumeName"
                        value={newResume.name}
                        onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
                        placeholder="e.g., Software Engineer Resume"
                      />
                    </div>
                    <div>
                      <Label htmlFor="version">Version</Label>
                      <Input
                        id="version"
                        value={newResume.version}
                        onChange={(e) => setNewResume({ ...newResume, version: e.target.value })}
                        placeholder="e.g., v1.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="file">Upload File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingResume(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addResume}>Upload Resume</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume ATS Tracker</h1>
          <p className="text-gray-600">Monitor how your resumes perform across different ATS systems</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{resumes.length}</div>
                  <div className="text-sm text-gray-600">Resume Versions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.avgSuccessRate}%</div>
                  <div className="text-sm text-gray-600">Avg Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.avgATSScore}</div>
                  <div className="text-sm text-gray-600">Avg ATS Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Building className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Versions */}
          <Card>
            <CardHeader>
              <CardTitle>Your Resume Versions</CardTitle>
              <CardDescription>Track performance across different resume versions</CardDescription>
            </CardHeader>
            <CardContent>
              {resumes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes uploaded</h3>
                  <p className="text-gray-600 mb-4">Upload your first resume to start tracking ATS performance</p>
                  <Button onClick={() => setIsAddingResume(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resume
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                          <p className="text-sm text-gray-600">
                            {resume.version} • {resume.fileSize}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Applications</div>
                          <div className="font-semibold">{resume.applications}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Responses</div>
                          <div className="font-semibold">{resume.responses}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Success Rate</div>
                          <div className="font-semibold text-green-600">{resume.successRate}%</div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        Last used: {resume.lastUsed} • Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ATS Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent ATS Results</CardTitle>
              <CardDescription>See how your resumes performed in different ATS systems</CardDescription>
            </CardHeader>
            <CardContent>
              {atsResults.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No ATS results yet</h3>
                  <p className="text-gray-600">Submit your resumes to job applications to see ATS performance</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {atsResults.map((result) => {
                    const resume = resumes.find((r) => r.id === result.resumeId)
                    return (
                      <div key={result.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{result.company}</h3>
                            <p className="text-sm text-gray-600">
                              {resume?.name} • {result.atsSystem}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                result.status === "passed"
                                  ? "default"
                                  : result.status === "failed"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {result.status}
                            </Badge>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">{result.score}</div>
                              <div className="text-xs text-gray-500">ATS Score</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3">
                          {result.feedback.slice(0, 2).map((feedback, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {feedback}
                            </div>
                          ))}
                        </div>

                        <div className="text-xs text-gray-500">
                          Submitted: {new Date(result.submissionDate).toLocaleDateString()}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
