"use client"

import dynamic from "next/dynamic"

const UploadPageClient = dynamic(() => import("./UploadPageClient"), {
  ssr: false,
  loading: () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/20 rounded-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading analyzer...</p>
        </div>
      </div>
    </div>
  ),
})

export default function UploadClientWrapper() {
  return <UploadPageClient />
}
