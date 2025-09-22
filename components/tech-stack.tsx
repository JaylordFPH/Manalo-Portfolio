import { Badge } from "@/components/ui/badge"

export function TechStack() {
  const technologies = [
    { name: "Figma", level: "Expert", certified: true },
    { name: "Adobe XD", level: "Advanced", certified: false },
    { name: "Sketch", level: "Intermediate", certified: false },
    { name: "Prototyping", level: "Expert", certified: false },
    { name: "User Research", level: "Advanced", certified: true },
    { name: "Wireframing", level: "Expert", certified: false },
    { name: "Design Systems", level: "Advanced", certified: false },
    { name: "Usability Testing", level: "Advanced", certified: true },
  ]

  return (
    <section id="tech-stack" className="py-20 px-4 bg-gradient-to-b from-[#010326] to-[#2D0140]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#A305A6] to-[#660273] bg-clip-text text-transparent">
            Tech Stack & Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#660273] to-[#A305A6] mx-auto rounded-full"></div>
        </div>

        {/* Featured Figma Certification */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#660273] to-[#A305A6] p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-[#660273]">F</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Figma Certified Professional</h3>
              <p className="text-sm text-gray-200">Advanced UI/UX Design & Prototyping</p>
            </div>
            <Badge className="bg-white text-[#660273] font-semibold">Certified</Badge>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#00010D]/50 border border-[#660273]/20 hover:border-[#A305A6]/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{tech.level}</p>
                {tech.certified && <Badge className="bg-[#A305A6] text-white text-xs">Certified</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
