"use client"

import { useEffect, useState } from "react"

interface AnimatedRobotProps {
  size?: "sm" | "md" | "lg" | "xl"
  showProcess?: boolean
  className?: string
}

export function AnimatedRobot({ size = "md", showProcess = false, className = "" }: AnimatedRobotProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [eyesBlink, setEyesBlink] = useState(false)
  const [screenText, setScreenText] = useState("ATS")

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  }

  useEffect(() => {
    // Blinking animation
    const blinkInterval = setInterval(() => {
      setEyesBlink(true)
      setTimeout(() => setEyesBlink(false), 150)
    }, 3000)

    // Screen text animation when analyzing
    if (showProcess) {
      const textSequence = ["ATS", "SCAN", "ANALYZE", "SCORE", "DONE!"]
      let textIndex = 0

      const textInterval = setInterval(() => {
        setScreenText(textSequence[textIndex])
        textIndex = (textIndex + 1) % textSequence.length
      }, 1000)

      return () => {
        clearInterval(blinkInterval)
        clearInterval(textInterval)
      }
    }

    return () => clearInterval(blinkInterval)
  }, [showProcess])

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full animate-float" style={{ animationDuration: "3s" }}>
        {/* Robot Body */}
        <g className="animate-pulse" style={{ animationDuration: "2s" }}>
          {/* Main Body */}
          <rect
            x="60"
            y="80"
            width="80"
            height="90"
            rx="15"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="2"
            className="drop-shadow-lg"
          />

          {/* Head */}
          <ellipse
            cx="100"
            cy="50"
            rx="35"
            ry="30"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth="2"
            className="drop-shadow-lg"
          />

          {/* Head Top Antenna */}
          <rect x="98" y="15" width="4" height="15" fill="#9CA3AF" rx="2" />
          <circle cx="100" cy="12" r="4" fill="#EF4444" className="animate-pulse" />
        </g>

        {/* Eyes */}
        <g>
          <ellipse
            cx="88"
            cy="45"
            rx="8"
            ry={eyesBlink ? "1" : "8"}
            fill="#10B981"
            className="transition-all duration-150"
          >
            <animate attributeName="fill" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse
            cx="112"
            cy="45"
            rx="8"
            ry={eyesBlink ? "1" : "8"}
            fill="#10B981"
            className="transition-all duration-150"
          >
            <animate attributeName="fill" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Screen/Chest Display */}
        <rect x="75" y="95" width="50" height="25" rx="8" fill="#1F2937" stroke="#374151" strokeWidth="1" />

        {/* Screen Text */}
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fill="#10B981"
          fontSize="12"
          fontFamily="monospace"
          fontWeight="bold"
          className="animate-pulse"
        >
          {screenText}
        </text>

        {/* Arms */}
        <g className="animate-bounce" style={{ animationDuration: "2s" }}>
          <rect x="45" y="100" width="15" height="8" rx="4" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
          <rect x="140" y="100" width="15" height="8" rx="4" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />

          {/* Hands */}
          <circle cx="42" cy="104" r="6" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
          <circle cx="158" cy="104" r="6" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
        </g>

        {/* Legs */}
        <g>
          <rect x="80" y="170" width="12" height="20" rx="6" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
          <rect x="108" y="170" width="12" height="20" rx="6" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />

          {/* Feet */}
          <ellipse cx="86" cy="195" rx="8" ry="4" fill="#374151" />
          <ellipse cx="114" cy="195" rx="8" ry="4" fill="#374151" />
        </g>

        {/* Body Details */}
        <g>
          {/* Chest Buttons */}
          <circle cx="85" cy="135" r="3" fill="#6B7280" className="animate-pulse" />
          <circle cx="100" cy="135" r="3" fill="#6B7280" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
          <circle cx="115" cy="135" r="3" fill="#6B7280" className="animate-pulse" style={{ animationDelay: "1s" }} />

          {/* Side Panels */}
          <rect x="65" y="85" width="8" height="15" rx="2" fill="#9CA3AF" />
          <rect x="127" y="85" width="8" height="15" rx="2" fill="#9CA3AF" />
        </g>

        {/* Floating Particles Around Robot */}
        <g className="animate-spin" style={{ animationDuration: "10s" }}>
          <circle cx="40" cy="60" r="2" fill="#8B5CF6" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="80" r="2" fill="#06B6D4" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="50" cy="140" r="2" fill="#10B981" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="150" cy="140" r="2" fill="#F59E0B" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
        </g>
      </svg>

      {/* Process Flow Arrows (when showProcess is true) */}
      {showProcess && (
        <>
          {/* Left Arrow */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
            <svg width="40" height="20" viewBox="0 0 40 20" className="animate-pulse">
              <path
                d="M5 10 L30 10 M25 5 L30 10 L25 15"
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right Arrow */}
          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
            <svg width="40" height="20" viewBox="0 0 40 20" className="animate-pulse" style={{ animationDelay: "1s" }}>
              <path
                d="M5 10 L30 10 M25 5 L30 10 L25 15"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}
