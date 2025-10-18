"use client"

import { AnimatedRobot } from "./animated-robot"
import { Handshake, Upload, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function RobotProcessFlow() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-8 md:space-x-16 py-12">
      {/* Step 1: Resume Upload */}
      <div
        className={`flex flex-col items-center transition-all duration-500 ${currentStep === 0 ? "scale-110 opacity-100" : "scale-100 opacity-70"}`}
      >
        <div className="relative">
          <div className="w-20 h-24 bg-white rounded-lg shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center mb-4 hover:shadow-xl transition-all duration-300">
            <div className="space-y-1">
              <div className="w-12 h-1 bg-blue-400 rounded animate-pulse"></div>
              <div className="w-10 h-1 bg-blue-300 rounded animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-12 h-1 bg-blue-400 rounded animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              <div className="w-8 h-1 bg-blue-300 rounded animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              <div className="w-11 h-1 bg-blue-400 rounded animate-pulse" style={{ animationDelay: "0.8s" }}></div>
            </div>
          </div>
          {currentStep === 0 && (
            <div className="absolute -top-2 -right-2">
              <Upload className="w-6 h-6 text-blue-500 animate-bounce" />
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-gray-700">Upload Resume</p>
      </div>

      {/* Arrow 1 */}
      <div className="hidden md:block">
        <svg
          width="60"
          height="30"
          viewBox="0 0 60 30"
          className={`transition-all duration-500 ${currentStep === 0 ? "animate-pulse" : ""}`}
        >
          <path
            d="M10 15 L45 15 M40 10 L45 15 L40 20"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={currentStep === 0 ? "animate-pulse" : ""}
          />
        </svg>
      </div>

      {/* Step 2: ATS Robot Analysis */}
      <div
        className={`flex flex-col items-center transition-all duration-500 ${currentStep === 1 ? "scale-110 opacity-100" : "scale-100 opacity-70"}`}
      >
        <div className="mb-4">
          <AnimatedRobot size="lg" showProcess={currentStep === 1} />
        </div>
        <p className="text-sm font-medium text-gray-700">ATS Analysis</p>
      </div>

      {/* Arrow 2 */}
      <div className="hidden md:block">
        <svg
          width="60"
          height="30"
          viewBox="0 0 60 30"
          className={`transition-all duration-500 ${currentStep === 1 ? "animate-pulse" : ""}`}
        >
          <path
            d="M10 15 L45 15 M40 10 L45 15 L40 20"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={currentStep === 1 ? "animate-pulse" : ""}
          />
        </svg>
      </div>

      {/* Step 3: Success/Handshake */}
      <div
        className={`flex flex-col items-center transition-all duration-500 ${currentStep === 2 ? "scale-110 opacity-100" : "scale-100 opacity-70"}`}
      >
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <Handshake className="w-10 h-10 text-white animate-pulse" />
          </div>
          {currentStep === 2 && (
            <div className="absolute -top-2 -right-2">
              <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />
            </div>
          )}
          {/* Success Sparkles */}
          {currentStep === 2 && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div
                className="absolute top-2 right-0 w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-0 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-gray-700">Job Success</p>
      </div>
    </div>
  )
}
