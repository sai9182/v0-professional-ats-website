import UploadClientWrapper from "./upload-client-wrapper"

export const metadata = {
  title: "Resume ATS Analyzer - Upload & Get Score",
  description: "Upload your resume and get instant ATS compatibility score with detailed feedback",
}

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse top-0 left-0" />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="bg-black/40 border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-lg group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ATS Resume Analyzer
              </span>
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="/ai-generator"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold transition-all"
              >
                ✨ AI Generator
              </a>
              <a
                href="/builder"
                className="px-4 py-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-950/50 bg-transparent transition-all"
              >
                🏗️ Builder
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 text-sm font-medium mb-6 border border-purple-500/30 animate-pulse">
            <span className="mr-2">✨</span>
            AI-Powered ATS Analysis Engine
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume ATS Analyzer
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Upload your resume and get instant ATS compatibility score with detailed feedback to optimize for applicant
            tracking systems
          </p>
        </div>

        {/* Upload Component */}
        <UploadClientWrapper />
      </main>
    </div>
  )
}
