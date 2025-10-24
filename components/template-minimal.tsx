interface ResumeData {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  linkedin?: string
  summary: string
  experiences: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    graduationDate: string
  }>
  skills: string[]
  photoUrl?: string
}

export function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-12 text-gray-900 font-sans min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-lg text-gray-700 mt-1">{data.title}</p>
        <div className="text-sm text-gray-600 mt-3 space-y-1">
          <div>
            {data.email} • {data.phone}
          </div>
          <div>{data.location}</div>
          {data.linkedin && <div>{data.linkedin}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">Professional Experience</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-gray-900">{exp.position}</p>
                <p className="text-sm text-gray-700">{exp.company}</p>
              </div>
              <p className="text-sm text-gray-600">
                {exp.startDate} – {exp.endDate || "Present"}
              </p>
            </div>
            <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <p className="font-semibold text-gray-900">
              {edu.degree} in {edu.field}
            </p>
            <p className="text-sm text-gray-700">
              {edu.school} • {edu.graduationDate}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">Technical Skills</h2>
          <p className="text-sm text-gray-700">{data.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  )
}
