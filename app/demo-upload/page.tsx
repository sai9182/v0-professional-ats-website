"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DemoUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileSelect = (file: File) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "text/plain"
    ) {
      setUploadedFile(file)
      console.log("File uploaded:", file.name, file.size, file.type)
    } else {
      alert("Please upload a PDF, DOC, DOCX, or TXT file")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Sai.dev ATS Tracker
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">File Upload Demo</h1>
          <p className="text-gray-600">Test the file upload functionality</p>
        </div>

        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragOver ? "border-purple-400 bg-purple-50" : "border-purple-200"
          }`}
        >
          <CardContent className="p-12">
            <div className="text-center" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
              {!uploadedFile ? (
                <>
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your File</h3>
                  <p className="text-gray-600 mb-8">Drag and drop your file here, or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="mr-2 h-5 w-5" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                  <p className="text-sm text-gray-500 mt-4">Supports PDF, DOC, DOCX, TXT files</p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">File Uploaded Successfully!</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600">Size: {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                    <p className="text-sm text-gray-600">Type: {uploadedFile.type}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => setUploadedFile(null)} variant="outline">
                      Upload Another File
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Link href="/upload">Analyze Resume</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
