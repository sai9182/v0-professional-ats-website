import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Target,
  CheckCircle,
  AlertCircle,
  User,
  BarChart3,
  BookOpen,
  Play,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "sai",
}

export default function UserManualPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Sai.dev ATS Tracker
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-purple-600 hover:text-purple-700">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <BookOpen className="mr-2 h-4 w-4" strokeWidth={2} />
            Complete User Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sai.dev ATS Tracker <span className="text-purple-600">User Manual</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to get the most out of our ATS resume analyzer and builder
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-12 border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-2xl">
              <Play className="mr-3 h-6 w-6" strokeWidth={2} />
              Quick Start Guide
            </CardTitle>
            <CardDescription className="text-purple-100">Get started in 3 simple steps</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Account</h3>
                <p className="text-gray-600 mb-4">Sign up for free to access all features</p>
                <Button size="sm" asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                <p className="text-gray-600 mb-4">Upload your existing resume for analysis</p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/upload">Upload Resume</Link>
                </Button>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get ATS Score</h3>
                <p className="text-gray-600 mb-4">Receive instant feedback and improvements</p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/builder">Build Resume</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Resume Analyzer */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Upload className="mr-3 h-6 w-6 text-purple-600" strokeWidth={2} />
                Resume Analyzer
              </CardTitle>
              <CardDescription>Upload and analyze your existing resume for ATS compatibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">How to Use:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Click "Upload & Analyze Resume" on the homepage</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Drag and drop your resume file (PDF, DOC, DOCX)</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Wait for AI analysis (usually takes 30-60 seconds)</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Review your ATS score and detailed feedback</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What You Get:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    <span className="text-sm">ATS compatibility score (0-100)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    <span className="text-sm">Keyword analysis and suggestions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    <span className="text-sm">Section-by-section feedback</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    <span className="text-sm">Formatting recommendations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Builder */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="mr-3 h-6 w-6 text-purple-600" strokeWidth={2} />
                Resume Builder
              </CardTitle>
              <CardDescription>Create professional resumes using ATS-optimized templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">How to Use:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Click "Build New Resume" to start</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Choose from 15+ professional templates</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Fill in your personal information and experience</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Preview and download your optimized resume</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Template Categories:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Modern
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Classic
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                    Creative
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Minimal
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Understanding ATS Scores */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Target className="mr-3 h-6 w-6 text-purple-600" strokeWidth={2} />
              Understanding Your ATS Score
            </CardTitle>
            <CardDescription>Learn what your ATS score means and how to improve it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">0-59</div>
                <div className="font-semibold text-red-800 mb-2">Needs Improvement</div>
                <div className="text-sm text-red-700">
                  Your resume may not pass ATS systems. Focus on formatting and keywords.
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">60-79</div>
                <div className="font-semibold text-yellow-800 mb-2">Good</div>
                <div className="text-sm text-yellow-700">
                  Your resume has potential. Some improvements needed for better ATS compatibility.
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">80-100</div>
                <div className="font-semibold text-green-800 mb-2">Excellent</div>
                <div className="text-sm text-green-700">
                  Your resume is well-optimized for ATS systems and likely to pass screening.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Better ATS Scores */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BarChart3 className="mr-3 h-6 w-6 text-purple-600" strokeWidth={2} />
              Tips for Better ATS Scores
            </CardTitle>
            <CardDescription>Best practices to optimize your resume for ATS systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" strokeWidth={2} />
                  Do's
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Use standard section headings (Experience, Education, Skills)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Include relevant keywords from job descriptions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Use simple, clean formatting
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Save as PDF or Word document
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Use standard fonts (Arial, Calibri, Times New Roman)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" strokeWidth={2} />
                  Don'ts
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Don't use images, graphics, or charts
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Avoid fancy fonts or decorative elements
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Don't use tables or columns for layout
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Avoid headers and footers
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    Don't use abbreviations without spelling them out
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <User className="mr-3 h-6 w-6 text-purple-600" strokeWidth={2} />
              Account Management
            </CardTitle>
            <CardDescription>Manage your account settings and subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Free Account Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />5 resume analyses per month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    Access to basic templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" strokeWidth={2} />
                    Basic ATS scoring
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Premium Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" strokeWidth={2} />
                    Unlimited resume analyses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" strokeWidth={2} />
                    All premium templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" strokeWidth={2} />
                    Advanced analytics and insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" strokeWidth={2} />
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h4>
                <p className="text-gray-700 text-sm">We support PDF, DOC, and DOCX files up to 10MB in size.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How accurate is the ATS scoring?</h4>
                <p className="text-gray-700 text-sm">
                  Our AI-powered system has a 95% accuracy rate, trained on thousands of real ATS systems used by major
                  companies.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I edit my resume after analysis?</h4>
                <p className="text-gray-700 text-sm">
                  Yes! Use our resume builder to make improvements based on the feedback, or upload a new version for
                  re-analysis.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
                <p className="text-gray-700 text-sm">
                  Absolutely. We use enterprise-grade encryption and never share your personal information or resume
                  content with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Started CTA */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their ATS scores and landed their dream jobs with Sai.dev
              ATS Tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  <User className="mr-2 h-5 w-5" strokeWidth={2} />
                  Create Free Account
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                asChild
              >
                <Link href="/upload">
                  <Upload className="mr-2 h-5 w-5" strokeWidth={2} />
                  Try Demo
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
