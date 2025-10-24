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

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-12 text-gray-900 font-serif min-h-screen">
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold">{data.fullName}</h1>
        <p className="text-2xl text-gray-700 mt-2">{data.title}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-600 mt-4">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          {data.linkedin && (
            <>
              <span>•</span>
              <span>{data.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">
          Professional Experience
        </h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-gray-900">{exp.position}</p>
                <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
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
        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">
          Education
        </h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <p className="text-sm font-bold text-gray-900">
              {edu.degree} in {edu.field}
            </p>
            <p className="text-sm text-gray-700">{edu.school}</p>
            <p className="text-sm text-gray-600">{edu.graduationDate}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">
            Core Competencies
          </h2>
          <p className="text-sm text-gray-700">{data.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  )
}
