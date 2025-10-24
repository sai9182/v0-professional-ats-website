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

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-12 text-gray-900 min-h-screen">
      {/* Header */}
      <div className="border-b-4 border-purple-600 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.fullName}</h1>
        <p className="text-2xl text-purple-600 font-semibold mt-1">{data.title}</p>
        <div className="flex gap-6 text-sm text-gray-600 mt-4">
          <span>📧 {data.email}</span>
          <span>📱 {data.phone}</span>
          <span>📍 {data.location}</span>
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-600 mb-3">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-purple-600 mb-4">WORK EXPERIENCE</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-purple-600 font-semibold">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate || "Present"}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-purple-600 mb-4">EDUCATION</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-purple-600 font-semibold">{edu.school}</p>
              </div>
              <span className="text-sm text-gray-600">{edu.graduationDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-purple-600 mb-3">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
