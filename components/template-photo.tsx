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

export function PhotoTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white min-h-screen flex">
      {/* Sidebar with Photo */}
      <div className="w-1/3 bg-gray-900 text-white p-8 flex flex-col">
        {data.photoUrl && (
          <div className="mb-6">
            <img
              src={data.photoUrl || "/placeholder.svg"}
              alt={data.fullName}
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-purple-500"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2 text-center">{data.fullName}</h1>
        <p className="text-purple-400 text-center font-semibold mb-6">{data.title}</p>

        {/* Contact Info */}
        <div className="mb-8 pb-8 border-b border-gray-700">
          <h3 className="font-bold text-purple-400 mb-3">CONTACT</h3>
          <p className="text-sm text-gray-300 mb-2">{data.email}</p>
          <p className="text-sm text-gray-300 mb-2">{data.phone}</p>
          <p className="text-sm text-gray-300">{data.location}</p>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="font-bold text-purple-400 mb-3">SKILLS</h3>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <p key={skill} className="text-sm text-gray-300">
                  • {skill}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 text-gray-900">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-purple-600 pb-2">ABOUT</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">EXPERIENCE</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-gray-900">{exp.position}</p>
                  <p className="text-purple-600 font-semibold text-sm">{exp.company}</p>
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <p className="font-bold text-gray-900">
                {edu.degree} in {edu.field}
              </p>
              <p className="text-purple-600 text-sm">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
