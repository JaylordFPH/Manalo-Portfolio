import Image from "next/image"

import { Button } from "@/components/ui/button"

export function AuthorNote() {
  return (
    <section id="author" className="px-4 pb-20 pt-14 md:px-5 md:pb-24 md:pt-16">
      <div className="mx-auto max-w-6xl rounded-[1.2rem] border border-[#ddd0c3] bg-[#faf6f1] px-5 py-6 shadow-[0_14px_40px_rgba(44,27,20,0.06)] md:px-10 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4 md:items-start">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#8d7342]/30">
              <Image
                src="/image/profile.png"
                alt="Jenelyn Manalo"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[-0.02em] text-[#5a5a53]">
                About the designer
              </p>
              <h3 className="mt-2 text-base font-semibold text-[#2b4c48] md:text-lg">
                Jenelyn Manalo
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.68rem] text-[#8a867e]">
                <span>UI/UX Student Designer</span>
                <span className="h-1 w-1 rounded-full bg-[#c7b5a1]" />
                <span>5 portfolio projects</span>
                <span className="h-1 w-1 rounded-full bg-[#c7b5a1]" />
                <span>Open to internships</span>
              </div>
              <p className="mt-3 max-w-3xl text-xs leading-6 text-[#61716d] md:text-sm">
                Jenelyn designs interfaces with a calm visual tone, clear
                structure, and a growing focus on user-centered presentation,
                thoughtful layouts, and polished digital storytelling.
              </p>
              <a
                href="#home"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f0a2c] hover:text-[#4a0823]"
              >
                View profile
                <span aria-hidden="true">&gt;</span>
              </a>
            </div>
          </div>

          <Button
            asChild
            variant="secondary"
            className="h-9 shrink-0 rounded-full bg-[#f16385] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#db5476]"
          >
            <a href="#contact">Say Hello</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
