"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Plus, Trash2, FileText, Palette, Camera } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  category: "modern" | "classic" | "creative" | "minimal" | "photo"
  hasPhoto: boolean
  preview: React.ReactNode
}

const templates: Template[] = [
  {
    id: "modern-1",
    name: "Modern Professional",
    description: "Clean, modern design perfect for tech and business roles",
    category: "modern",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="text-center border-b pb-2 mb-2">
          <div className="font-bold text-sm text-gray-900">RICHARD SANCHEZ</div>
          <div className="text-xs text-gray-600">Marketing Director</div>
          <div className="text-xs text-gray-500">richard@email.com • +1 234 567 8900</div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1">PROFESSIONAL SUMMARY</div>
            <div className="text-xs text-gray-600 leading-tight">
              Results-driven marketing professional with 8+ years of experience...
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1">WORK EXPERIENCE</div>
            <div className="text-xs text-gray-700">
              <div className="font-medium">Senior Marketing Manager</div>
              <div className="text-gray-500">Tech Corp • 2020-Present</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1">EDUCATION</div>
            <div className="text-xs text-gray-700">MBA Marketing • State University</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "photo-1",
    name: "Executive Profile",
    description: "Professional template with photo for senior positions",
    category: "photo",
    hasPhoto: true,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="flex items-start space-x-3 border-b pb-2 mb-2">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <Camera className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-gray-900">OLIVIA SCHACHER</div>
            <div className="text-xs text-gray-600">Software Engineer</div>
            <div className="text-xs text-gray-500">olivia@email.com • LinkedIn</div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1">ABOUT</div>
            <div className="text-xs text-gray-600 leading-tight">
              Passionate software engineer with expertise in full-stack development...
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1">EXPERIENCE</div>
            <div className="text-xs text-gray-700">
              <div className="font-medium">Senior Developer</div>
              <div className="text-gray-500">Innovation Labs • 2021-Present</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative-1",
    name: "Creative Designer",
    description: "Eye-catching design for creative professionals",
    category: "creative",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 p-3 text-xs overflow-hidden border rounded">
        <div className="bg-white rounded p-2 mb-2">
          <div className="font-bold text-sm text-purple-800">ESTELLE DARCY</div>
          <div className="text-xs text-purple-600">UX/UI Designer</div>
          <div className="text-xs text-gray-600">estelle@email.com • Portfolio: estelledesign.com</div>
        </div>
        <div className="space-y-2">
          <div className="bg-white/70 rounded p-2">
            <div className="font-semibold text-xs text-purple-700 mb-1">CREATIVE EXPERIENCE</div>
            <div className="text-xs text-gray-700">
              <div className="font-medium">Lead UX Designer</div>
              <div className="text-gray-600">Creative Agency • 2019-Present</div>
            </div>
          </div>
          <div className="bg-white/70 rounded p-2">
            <div className="font-semibold text-xs text-purple-700 mb-1">SKILLS</div>
            <div className="text-xs text-gray-700">Figma • Adobe Creative Suite • Prototyping</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "photo-2",
    name: "Modern Portrait",
    description: "Contemporary design with integrated photo section",
    category: "photo",
    hasPhoto: true,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded flex">
        <div className="w-1/3 bg-gray-800 text-white p-2 rounded-l">
          <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Camera className="h-6 w-6 text-gray-300" />
          </div>
          <div className="text-center">
            <div className="font-bold text-xs">OLIVIA SCHACHER</div>
            <div className="text-xs text-gray-300">Software Engineer</div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-xs font-semibold text-gray-300">CONTACT</div>
            <div className="text-xs text-gray-400">olivia@email.com</div>
            <div className="text-xs text-gray-400">+1 234 567 8900</div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="space-y-2">
            <div>
              <div className="font-semibold text-xs text-gray-800 mb-1">WORK EXPERIENCE</div>
              <div className="text-xs text-gray-700">
                <div className="font-medium">Senior Software Engineer</div>
                <div className="text-gray-500">Tech Solutions Inc.</div>
                <div className="text-gray-500">2020 - Present</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800 mb-1">EDUCATION</div>
              <div className="text-xs text-gray-700">
                <div className="font-medium">Computer Science</div>
                <div className="text-gray-500">University of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "minimal-1",
    name: "Minimal Clean",
    description: "Simple, ATS-friendly format",
    category: "minimal",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="border-b-2 border-gray-200 pb-2 mb-3">
          <div className="font-bold text-lg text-gray-900">Sebastian Bennett</div>
          <div className="text-sm text-gray-600">Project Manager</div>
          <div className="text-xs text-gray-500 mt-1">
            sebastian@email.com • +1 234 567 8900 • LinkedIn: /in/sebastian-bennett
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="font-bold text-xs text-gray-800 mb-1 uppercase tracking-wide">Professional Summary</div>
            <div className="text-xs text-gray-600 leading-relaxed">
              Experienced project manager with 6+ years leading cross-functional teams...
            </div>
          </div>
          <div>
            <div className="font-bold text-xs text-gray-800 mb-1 uppercase tracking-wide">Work Experience</div>
            <div className="text-xs text-gray-700">
              <div className="font-semibold">Senior Project Manager</div>
              <div className="text-gray-600">Global Solutions Ltd. | 2021 - Present</div>
              <div className="text-gray-600 mt-1">• Led 15+ successful project implementations</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "classic-1",
    name: "Classic Executive",
    description: "Traditional format ideal for senior positions",
    category: "classic",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="text-center border-b border-gray-300 pb-3 mb-3">
          <div className="font-bold text-base text-gray-900">RICHARD SANCHEZ</div>
          <div className="text-sm text-gray-700 mt-1">Marketing Director</div>
          <div className="text-xs text-gray-600 mt-1">
            123 Business Ave, City, State 12345 • (555) 123-4567 • richard.sanchez@email.com
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-bold text-xs text-gray-800 mb-1 text-center uppercase">Objective</div>
            <div className="text-xs text-gray-700 text-center leading-tight">
              Seasoned marketing executive seeking to leverage 10+ years of experience...
            </div>
          </div>
          <div>
            <div className="font-bold text-xs text-gray-800 mb-1 text-center uppercase">Professional Experience</div>
            <div className="text-xs text-gray-700">
              <div className="font-semibold">Marketing Director</div>
              <div className="italic">Fortune 500 Company, New York, NY</div>
              <div className="text-gray-600">January 2020 - Present</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "photo-3",
    name: "Corporate Profile",
    description: "Professional corporate template with photo",
    category: "photo",
    hasPhoto: true,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="flex items-center space-x-4 bg-blue-50 p-2 rounded mb-2">
          <div className="w-14 h-14 bg-blue-200 rounded flex items-center justify-center flex-shrink-0">
            <Camera className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-blue-900">WAHANA PRIMA</div>
            <div className="text-xs text-blue-700">Business Development Manager</div>
            <div className="text-xs text-blue-600">wahana@email.com • +62 123 456 789</div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-xs text-blue-800 mb-1">PROFESSIONAL SUMMARY</div>
            <div className="text-xs text-gray-700 leading-tight">
              Dynamic business development professional with proven track record...
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-blue-800 mb-1">CORE COMPETENCIES</div>
            <div className="text-xs text-gray-700">
              Strategic Planning • Client Relations • Market Analysis • Team Leadership
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-blue-800 mb-1">EXPERIENCE</div>
            <div className="text-xs text-gray-700">
              <div className="font-medium">Business Development Manager</div>
              <div className="text-gray-600">Corporate Solutions • 2019-Present</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative-2",
    name: "Portfolio Style",
    description: "Perfect for designers and creative professionals",
    category: "creative",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-pink-100 p-3 text-xs overflow-hidden border rounded">
        <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
          <div className="font-bold text-sm text-orange-800">JULIANA SILVA</div>
          <div className="text-xs text-orange-600 font-medium">Graphic Designer & Illustrator</div>
          <div className="text-xs text-gray-600 mt-1">juliana@creative.com • behance.com/juliana</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/80 rounded p-2">
            <div className="font-semibold text-xs text-orange-700 mb-1">EXPERIENCE</div>
            <div className="text-xs text-gray-700">
              <div className="font-medium">Senior Designer</div>
              <div className="text-gray-600">Creative Studio</div>
              <div className="text-gray-500">2020-Present</div>
            </div>
          </div>
          <div className="bg-white/80 rounded p-2">
            <div className="font-semibold text-xs text-orange-700 mb-1">SKILLS</div>
            <div className="text-xs text-gray-700">
              <div>• Adobe Creative Suite</div>
              <div>• Brand Identity</div>
              <div>• Digital Illustration</div>
            </div>
          </div>
        </div>
        <div className="bg-white/80 rounded p-2 mt-2">
          <div className="font-semibold text-xs text-orange-700 mb-1">PORTFOLIO HIGHLIGHTS</div>
          <div className="text-xs text-gray-700">Award-winning brand campaigns for Fortune 500 companies</div>
        </div>
      </div>
    ),
  },
  {
    id: "photo-4",
    name: "Professional Headshot",
    description: "Clean template highlighting your professional photo",
    category: "photo",
    hasPhoto: true,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="flex space-x-3">
          <div className="w-1/3">
            <div className="w-full aspect-square bg-gray-300 rounded-lg flex items-center justify-center mb-2">
              <Camera className="h-8 w-8 text-gray-500" />
            </div>
            <div className="text-center">
              <div className="font-bold text-xs text-gray-900">LORNA ALVARADO</div>
              <div className="text-xs text-gray-600">Data Analyst</div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <div className="font-semibold text-xs text-gray-800 mb-1">CONTACT</div>
              <div className="text-xs text-gray-600">
                <div>lorna@email.com</div>
                <div>+1 234 567 8900</div>
                <div>San Francisco, CA</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800 mb-1">EXPERIENCE</div>
              <div className="text-xs text-gray-700">
                <div className="font-medium">Senior Data Analyst</div>
                <div className="text-gray-600">Analytics Corp</div>
                <div className="text-gray-500">2021 - Present</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800 mb-1">SKILLS</div>
              <div className="text-xs text-gray-700">Python • SQL • Tableau • Machine Learning</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modern-2",
    name: "Tech Specialist",
    description: "Perfect for software engineers and developers",
    category: "modern",
    hasPhoto: false,
    preview: (
      <div className="w-full h-64 bg-white p-3 text-xs overflow-hidden border rounded">
        <div className="bg-gray-900 text-white p-2 rounded mb-2">
          <div className="font-bold text-sm">OLIVIA WILSON</div>
          <div className="text-xs text-gray-300">Full Stack Developer</div>
          <div className="text-xs text-gray-400">olivia.wilson@tech.com • github.com/oliviawilson</div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              TECHNICAL SKILLS
            </div>
            <div className="text-xs text-gray-700 ml-4">
              JavaScript, React, Node.js, Python, PostgreSQL, AWS, Docker
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              EXPERIENCE
            </div>
            <div className="text-xs text-gray-700 ml-4">
              <div className="font-medium">Senior Full Stack Developer</div>
              <div className="text-gray-600">TechStart Inc. • 2022-Present</div>
              <div className="text-gray-600 mt-1">• Built scalable web applications serving 100K+ users</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs text-gray-800 mb-1 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              PROJECTS
            </div>
            <div className="text-xs text-gray-700 ml-4">E-commerce Platform • Real-time Chat App</div>
          </div>
        </div>
      </div>
    ),
  },
]

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export default function BuilderPageClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showTemplates, setShowTemplates] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    photoUrl: "",
  })

  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((template) => template.category === selectedCategory)

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setExperiences([...experiences, newExp])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  if (showTemplates) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ATS Tracker + Resume Builder
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <Link href="/upload">Analyze Resume</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select from our collection of ATS-optimized templates designed by career experts
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2 bg-white rounded-lg p-1 shadow-sm border">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                All Templates ({templates.length})
              </Button>
              <Button
                variant={selectedCategory === "modern" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("modern")}
                className={selectedCategory === "modern" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                Modern ({templates.filter((t) => t.category === "modern").length})
              </Button>
              <Button
                variant={selectedCategory === "photo" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("photo")}
                className={selectedCategory === "photo" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                With Photo ({templates.filter((t) => t.category === "photo").length})
              </Button>
              <Button
                variant={selectedCategory === "classic" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("classic")}
                className={selectedCategory === "classic" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                Classic ({templates.filter((t) => t.category === "classic").length})
              </Button>
              <Button
                variant={selectedCategory === "creative" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("creative")}
                className={selectedCategory === "creative" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                Creative ({templates.filter((t) => t.category === "creative").length})
              </Button>
              <Button
                variant={selectedCategory === "minimal" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("minimal")}
                className={selectedCategory === "minimal" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
              >
                Minimal ({templates.filter((t) => t.category === "minimal").length})
              </Button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Actual Template Preview */}
                    <div className="w-full h-64 overflow-hidden rounded-t-lg bg-gray-50">{template.preview}</div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-t-lg" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700 capitalize text-xs">
                        {template.category}
                      </Badge>
                      {template.hasPhoto && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          Photo
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{template.description}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        onClick={() => {
                          console.log("Selected template:", template.name)
                          setSelectedTemplate(template)
                          setShowTemplates(false)
                        }}
                      >
                        <Palette className="mr-2 h-4 w-4" strokeWidth={2} />
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-gray-400" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ATS Tracker + Resume Builder
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                <Palette className="mr-2 h-4 w-4" strokeWidth={2} />
                Change Template
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" strokeWidth={2} />
                Preview
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Download className="mr-2 h-4 w-4" strokeWidth={2} />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Builder Form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
              <p className="text-gray-600">
                Using template:{" "}
                <span className="font-semibold text-purple-600">{selectedTemplate?.name || "None selected"}</span>
                {selectedTemplate?.hasPhoto && <Badge className="ml-2 bg-blue-100 text-blue-800">With Photo</Badge>}
              </p>
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Add your contact details and professional summary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTemplate?.hasPhoto && (
                      <div>
                        <Label htmlFor="photoUrl" className="flex items-center">
                          <Camera className="mr-2 h-4 w-4" strokeWidth={2} />
                          Professional Photo URL
                        </Label>
                        <Input
                          id="photoUrl"
                          value={personalInfo.photoUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, photoUrl: e.target.value })}
                          placeholder="https://example.com/your-photo.jpg"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Add a professional headshot URL for templates with photo support
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                          placeholder="New York, NY"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={personalInfo.summary}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                        placeholder="Write a compelling professional summary..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>Add your professional experience</CardDescription>
                      </div>
                      <Button
                        onClick={addExperience}
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        <Plus className="mr-2 h-4 w-4" strokeWidth={2} />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Experience {index + 1}</h3>
                          <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                            <Trash2 className="h-4 w-4" strokeWidth={2} />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    {experiences.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No experience added yet. Click "Add Experience" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Add your technical and soft skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button
                        onClick={addSkill}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm bg-purple-100 text-purple-800">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-500">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {skills.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No skills added yet. Add your skills to make your resume stand out.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Resume Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>
                  Template: {selectedTemplate?.name || "None selected"}
                  {selectedTemplate?.hasPhoto && " (With Photo)"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 text-sm space-y-4 min-h-[600px] shadow-sm">
                  {personalInfo.fullName && (
                    <div
                      className={`${selectedTemplate?.hasPhoto ? "flex items-start space-x-4" : "text-center"} border-b pb-4`}
                    >
                      {selectedTemplate?.hasPhoto && personalInfo.photoUrl && (
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                            <img
                              src={personalInfo.photoUrl || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                                e.currentTarget.nextElementSibling!.style.display = "flex"
                              }}
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full hidden items-center justify-center">
                              <Camera className="h-8 w-8 text-gray-500" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className={selectedTemplate?.hasPhoto ? "flex-1" : ""}>
                        <h2 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h2>
                        <div className="text-gray-600 space-y-1 mt-2">
                          {personalInfo.email && <div>{personalInfo.email}</div>}
                          {personalInfo.phone && <div>{personalInfo.phone}</div>}
                          {personalInfo.location && <div>{personalInfo.location}</div>}
                          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {personalInfo.summary && (
                    <div>
                      <h3 className="font-bold text-purple-700 mb-2 text-sm uppercase tracking-wide">
                        Professional Summary
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                    </div>
                  )}

                  {experiences.length > 0 && (
                    <div>
                      <h3 className="font-bold text-purple-700 mb-3 text-sm uppercase tracking-wide">Experience</h3>
                      {experiences.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <div className="font-semibold text-gray-900">{exp.position}</div>
                          <div className="text-purple-600 font-medium">{exp.company}</div>
                          <div className="text-sm text-gray-500 mb-2">
                            {exp.startDate} - {exp.endDate || "Present"}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {skills.length > 0 && (
                    <div>
                      <h3 className="font-bold text-purple-700 mb-2 text-sm uppercase tracking-wide">Skills</h3>
                      <div className="text-sm text-gray-700">{skills.join(" • ")}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Ready to Download?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Your resume will be optimized for ATS systems
                  {selectedTemplate?.hasPhoto && " with professional photo integration"}
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <Download className="mr-2 h-4 w-4" strokeWidth={2} />
                  Download PDF Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
