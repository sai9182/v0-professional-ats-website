"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Target,
  Plus,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  company: string
  position: string
  location: string
  salary: string
  appliedDate: string
  status: "applied" | "interview" | "offer" | "rejected"
  notes: string
  jobUrl: string
}

const statusConfig = {
  applied: { color: "bg-blue-500", icon: Clock, label: "Applied" },
  interview: { color: "bg-yellow-500", icon: AlertCircle, label: "Interview" },
  offer: { color: "bg-green-500", icon: CheckCircle, label: "Offer" },
  rejected: { color: "bg-red-500", icon: XCircle, label: "Rejected" },
}

export default function ATSTracker() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      company: "Google",
      position: "Software Engineer",
      location: "Mountain View, CA",
      salary: "$120,000 - $180,000",
      appliedDate: "2024-01-15",
      status: "interview",
      notes: "Phone screening scheduled for next week",
      jobUrl: "https://careers.google.com/jobs/123",
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Product Manager",
      location: "Seattle, WA",
      salary: "$130,000 - $200,000",
      appliedDate: "2024-01-10",
      status: "applied",
      notes: "Applied through LinkedIn",
      jobUrl: "https://careers.microsoft.com/jobs/456",
    },
  ])

  const [isAddingApplication, setIsAddingApplication] = useState(false)
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    company: "",
    position: "",
    location: "",
    salary: "",
    appliedDate: "",
    status: "applied",
    notes: "",
    jobUrl: "",
  })

  const addApplication = () => {
    if (newApplication.company && newApplication.position) {
      const application: Application = {
        id: Date.now().toString(),
        company: newApplication.company || "",
        position: newApplication.position || "",
        location: newApplication.location || "",
        salary: newApplication.salary || "",
        appliedDate: newApplication.appliedDate || new Date().toISOString().split("T")[0],
        status: (newApplication.status as Application["status"]) || "applied",
        notes: newApplication.notes || "",
        jobUrl: newApplication.jobUrl || "",
      }
      setApplications([...applications, application])
      setNewApplication({
        company: "",
        position: "",
        location: "",
        salary: "",
        appliedDate: "",
        status: "applied",
        notes: "",
        jobUrl: "",
      })
      setIsAddingApplication(false)
    }
  }

  const updateApplicationStatus = (id: string, status: Application["status"]) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  const getStatusStats = () => {
    const stats = {
      applied: applications.filter((app) => app.status === "applied").length,
      interview: applications.filter((app) => app.status === "interview").length,
      offer: applications.filter((app) => app.status === "offer").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    }
    return stats
  }

  const stats = getStatusStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Sai.dev ATS Tracker</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddingApplication} onOpenChange={setIsAddingApplication}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Job Application</DialogTitle>
                    <DialogDescription>Track a new job application to monitor your progress</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={newApplication.company || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position *</Label>
                        <Input
                          id="position"
                          value={newApplication.position || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })}
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newApplication.location || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, location: e.target.value })}
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <Label htmlFor="salary">Salary Range</Label>
                        <Input
                          id="salary"
                          value={newApplication.salary || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, salary: e.target.value })}
                          placeholder="$80,000 - $120,000"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="appliedDate">Applied Date</Label>
                        <Input
                          id="appliedDate"
                          type="date"
                          value={newApplication.appliedDate || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, appliedDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newApplication.status || "applied"}
                          onValueChange={(value) =>
                            setNewApplication({ ...newApplication, status: value as Application["status"] })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="jobUrl">Job URL</Label>
                      <Input
                        id="jobUrl"
                        value={newApplication.jobUrl || ""}
                        onChange={(e) => setNewApplication({ ...newApplication, jobUrl: e.target.value })}
                        placeholder="https://company.com/jobs/123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newApplication.notes || ""}
                        onChange={(e) => setNewApplication({ ...newApplication, notes: e.target.value })}
                        placeholder="Add any notes about this application..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingApplication(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addApplication}>Add Application</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h1>
          <p className="text-gray-600">Monitor and manage all your job applications in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.applied}</div>
                  <div className="text-sm text-gray-600">Applied</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.interview}</div>
                  <div className="text-sm text-gray-600">Interviews</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.offer}</div>
                  <div className="text-sm text-gray-600">Offers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
            <CardDescription>{applications.length} total applications tracked</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-4">Start tracking your job applications to stay organized</p>
                <Button onClick={() => setIsAddingApplication(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Application
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => {
                  const StatusIcon = statusConfig[app.status].icon
                  return (
                    <div key={app.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{app.position}</h3>
                            <Badge variant="secondary" className={`${statusConfig[app.status].color} text-white`}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {statusConfig[app.status].label}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Building className="mr-1 h-4 w-4" />
                              {app.company}
                            </div>
                            {app.location && (
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {app.location}
                              </div>
                            )}
                            {app.salary && (
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {app.salary}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              Applied {new Date(app.appliedDate).toLocaleDateString()}
                            </div>
                          </div>

                          {app.notes && <p className="text-sm text-gray-700 mb-3">{app.notes}</p>}

                          <div className="flex items-center space-x-2">
                            <Select
                              value={app.status}
                              onValueChange={(value) => updateApplicationStatus(app.id, value as Application["status"])}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="applied">Applied</SelectItem>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="offer">Offer</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                            {app.jobUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">
                                  View Job
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
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
  )
}
