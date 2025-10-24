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

export function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-12 text-white">
      {/* Header */}
      <div className="mb-12 pb-8 border-b-2 border-purple-500">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
          {data.fullName}
        </h1>
        <p className="text-2xl text-purple-300 mb-4">{data.title}</p>
        <div className="flex gap-4 text-sm text-gray-300">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center">✦</span>
            About
          </h2>
          <p className="text-gray-200 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
          <span className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center">✦</span>
          Experience
        </h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-6 bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-lg font-bold text-white">{exp.position}</p>
                <p className="text-purple-300">{exp.company}</p>
              </div>
              <p className="text-sm text-gray-400">
                {exp.startDate} – {exp.endDate || "Present"}
              </p>
            </div>
            <p className="text-gray-200">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
          <span className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center">✦</span>
          Education
        </h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-4 bg-slate-700 rounded-lg p-4">
            <p className="text-lg font-bold text-white">
              {edu.degree} in {edu.field}
            </p>
            <p className="text-purple-300">{edu.school}</p>
            <p className="text-gray-400">{edu.graduationDate}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center">✦</span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <span key={skill} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
