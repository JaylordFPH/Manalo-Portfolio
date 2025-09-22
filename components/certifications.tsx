import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";

export function Certifications() {
  // DITO LANG GAGALAWIN NYO FOR MODIYING DETAILS
  const certifications = [
    {
      title: "Six Sigma Yellow Belt",
      issuer: "Six Sigma Study Targeting Success",
      date: "2025",
      verified: true,
      featured: true,
      link: "/pdf/Six-Sigma.pdf",
    },
    {
      title: "Designer Core Micro-Credential",
      issuer: "Alteryx Certification",
      date: "2025",
      verified: true,
      featured: true,
      link: "/pdf/Designer-Core.pdf",
    },
    {
      title: "Automation Business Analysis Fundamentals",
      issuer: "UiPath",
      date: "2025",
      verified: true,
      featured: false,
      link: "/pdf/Automation-Business.pdf",
    },
    {
      title: "UiPath Automation Implementation Methodology Fundamentals",
      issuer: "UiPath",
      date: "2025",
      verified: true,
      featured: false,
      link: "/pdf/Automation-Implementation.pdf",
    },
    {
      title: "Computer Systems Servicing",
      issuer: "Tesda National Certificate II",
      date: "2025",
      verified: true,
      featured: false,
      link: "/pdf/NC.pdf",
    },
  ];

  return (
    <section
      id="certifications"
      className="py-20 px-4 bg-gradient-to-b from-[#660273] to-[#A305A6]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Certifications & Credentials
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-200">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {cert.featured && (
                      <Badge className="bg-white text-[#660273] font-semibold">
                        Featured
                      </Badge>
                    )}
                    {cert.verified && (
                      <Badge
                        variant="outline"
                        className="border-white text-white"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <div className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
