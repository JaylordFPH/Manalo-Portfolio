import { Card, CardContent } from "@/components/ui/card";
import { Palette, Smartphone, Monitor, Users, Search, Zap } from "lucide-react";

export function Services() {
  // DITO LANG KAYO GAGALAW FOR MODIFYING
  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Complete user interface and experience design from wireframes to high-fidelity prototypes.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description:
        "Native and cross-platform mobile application design with focus on usability and performance.",
      features: [
        "iOS Design",
        "Android Design",
        "Responsive Design",
        "App Store Optimization",
      ],
    },
    {
      icon: Monitor,
      title: "Web Design",
      description:
        "Modern, responsive web design that converts visitors into customers.",
      features: [
        "Landing Pages",
        "E-commerce",
        "SaaS Platforms",
        "Corporate Websites",
      ],
    },
    {
      icon: Users,
      title: "User Research",
      description:
        "In-depth user research and testing to validate design decisions and improve user satisfaction.",
      features: [
        "User Interviews",
        "Usability Testing",
        "A/B Testing",
        "Analytics Review",
      ],
    },
    {
      icon: Search,
      title: "Design Audit",
      description:
        "Comprehensive analysis of existing designs with actionable recommendations for improvement.",
      features: [
        "Heuristic Evaluation",
        "Accessibility Audit",
        "Performance Review",
        "Competitive Analysis",
      ],
    },
    {
      icon: Zap,
      title: "Design Systems",
      description:
        "Scalable design systems and component libraries for consistent brand experience.",
      features: [
        "Component Library",
        "Style Guide",
        "Design Tokens",
        "Documentation",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-4 bg-gradient-to-b from-[#A305A6] to-[#2D0140]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Services & Expertise
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="p-3 bg-white/20 rounded-lg w-fit mb-4 group-hover:bg-white/30 transition-colors">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
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
