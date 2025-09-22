import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export function Projects() {
  // DITO LANG KAYO GAGALAW FOR MODIFYING TITLE, DESCRIPTION, AND ADDING IMAGE [TAGS FOR HIGHLIGHT OF THE PROJECT LIKE TOOLS USED] [FEATURED, TRUE OR FALSE]
  const projects = [
    {
      title: "Thrift Market Mobile App",
      description:
        "Complete redesign of a fashion e-commerce platform focusing on user journey optimization and conversion rate improvement.",
      image: "/modern-e-commerce-mobile-app-design.jpg",
      tags: ["Mobile Design", "E-commerce", "User Research"],
      featured: true,
    },
    {
      title: "PalaBooks Web System",
      description:
        "Analytics dashboard for a B2B SaaS platform with complex data visualization and user management features.",
      image: "/modern-saas-dashboard-design.jpg",
      tags: ["Web Design", "Dashboard", "Data Viz"],
      featured: true,
    },
    {
      title: "School Management System",
      description:
        "Patient management system with appointment scheduling and telemedicine capabilities.",
      image: "/healthcare-app-interface.png",
      tags: ["Healthcare", "Mobile", "Accessibility"],
      featured: false,
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-gradient-to-b from-[#2D0140] to-[#660273]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A305A6] to-white mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-[#00010D]/30 border-[#A305A6]/20 hover:border-[#A305A6]/60 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00010D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-2">
                    <div className="p-2 bg-[#A305A6] rounded-full hover:bg-[#660273] transition-colors cursor-pointer">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                    <div className="p-2 bg-[#A305A6] rounded-full hover:bg-[#660273] transition-colors cursor-pointer">
                      <Github className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge className="bg-[#A305A6] text-white">Featured</Badge>
                  )}
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-[#660273] text-[#A305A6] hover:bg-[#660273] hover:text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
