import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import { projects } from "@/lib/projects"

export function FeaturedShowcase() {
  const primary = projects[0]
  const secondaryLeft = projects[2]
  const secondaryRight = projects[1]
  const featuredDescription =
    primary.description.length > 118
      ? `${primary.description.slice(0, 115).trimEnd()}...`
      : primary.description

  return (
    <section className="overflow-hidden">
      <div className="h-24 bg-[linear-gradient(90deg,#850f43_0%,#5f0a2c_100%)] md:h-28" />

      <div className="relative bg-[radial-gradient(circle_at_center,#171328_0%,#090915_62%,#05050d_100%)] px-4 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(167,95,46,0.16),transparent_36%)]" />

        <div className="mx-auto max-w-6xl">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 top-6 hidden w-56 rounded-[1.7rem] bg-white/8 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.3)] lg:block">
              <div className="overflow-hidden rounded-[1.2rem]">
                <Image
                  src={secondaryLeft.image}
                  alt={secondaryLeft.imageAlt}
                  width={500}
                  height={420}
                  className="h-80 w-full object-cover opacity-85"
                />
              </div>
            </div>

            <div className="absolute right-0 top-6 hidden w-56 rounded-[1.7rem] bg-white/8 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.3)] lg:block">
              <div className="overflow-hidden rounded-[1.2rem]">
                <Image
                  src={secondaryRight.image}
                  alt={secondaryRight.imageAlt}
                  width={500}
                  height={420}
                  className="h-80 w-full object-cover opacity-85"
                />
              </div>
            </div>

            <article className="relative z-10 w-full max-w-3xl rounded-[2.1rem] bg-white/6 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.44)] backdrop-blur-sm md:p-4">
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <Image
                  src={primary.image}
                  alt={primary.imageAlt}
                  width={1200}
                  height={900}
                  className="h-[24rem] w-full object-cover md:h-[34rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090915] via-[#090915]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#d8bf91]">
                    Selected project
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                    {primary.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/78 md:text-base">
                    {featuredDescription}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-white/70">
            <button
              type="button"
              disabled
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/6"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/6"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
