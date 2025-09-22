"use client";

import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function Hero() {
  const handleViewProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#00010D] via-[#010326] to-[#2D0140] dark:from-[#00010D] dark:via-[#010326] dark:to-[#2D0140] light:from-slate-50 light:via-slate-100 light:to-slate-200">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white dark:bg-white light:bg-[#A305A6] rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-[#A305A6] rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#660273] rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white dark:bg-white light:bg-[#660273] rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-[#A305A6] rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-[#A305A6] shadow-2xl shadow-[#A305A6]/20">
            <Image
              src="/image/profile.png"
              alt="UI/UX Designer Profile"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#660273] to-[#A305A6] opacity-20 blur-xl"></div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-[#A305A6] to-[#660273] bg-clip-text text-transparent leading-tight">
          UI/UX Designer
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Crafting designs that connect people and technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex fles-col justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/pdf/Manalo-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#660273] to-[#A305A6] hover:from-[#A305A6] hover:to-[#660273] text-white border-0 px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </Link>

            <Button
              onClick={handleViewProjects}
              variant="outline"
              size="lg"
              className="border-[#A305A6] text-[#A305A6] hover:bg-[#A305A6] hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              View Projects
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-[#A305A6]" />
          </div>
        </div>
      </div>
    </section>
  );
}
