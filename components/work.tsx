"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { projects } from "@/lib/projects"

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const truncate = (s: string, n: number) => s.length > n ? `${s.slice(0, n).trimEnd()}…` : s

export function Work() {
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" className="mn-scene-section">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <FadeUp>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mn-glass-label mb-3">Selected Work</p>
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title">
                Projects
              </h2>
            </div>
            <span className="text-[0.72rem] font-medium text-[#6a9080] tracking-[0.04em]">
              {projects.length} projects
            </span>
          </div>
        </FadeUp>

        {/* Featured card */}
        <FadeUp delay={0.06}>
          <article className="group mb-5 grid overflow-hidden rounded-2xl border border-[rgba(125,203,168,0.15)] bg-[rgba(18,34,26,0.65)] backdrop-blur-lg transition-all duration-300 hover:border-[rgba(125,203,168,0.35)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:grid-cols-[1.1fr_0.9fr]">

            {/* Image */}
            <div className="relative h-64 overflow-hidden md:h-auto md:min-h-[28rem]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(14,28,22,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(125,203,168,0.15)] border border-[rgba(125,203,168,0.4)] px-5 py-2.5 text-[0.78rem] font-semibold text-[#7dcba8] backdrop-blur-sm">
                  View Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="mn-glass-label">{featured.tags[0]}</span>
              </div>
              <h3 className="text-[1.7rem] font-semibold tracking-[-0.04em] leading-[1.1] mn-glass-title md:text-[2rem]">
                {featured.title}
              </h3>
              <p className="mt-4 text-[0.88rem] leading-[1.7] mn-glass-body">
                {truncate(featured.description, 160)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(125,203,168,0.18)] px-3 py-1 text-[0.65rem] font-medium mn-glass-body bg-[rgba(125,203,168,0.07)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-[rgba(125,203,168,0.14)] pt-6">
                <a
                  href={featured.caseStudyUrl ?? "#"}
                  className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#7dcba8] hover:text-[#a8dfc4] transition-colors group/link"
                >
                  View Case Study
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </article>
        </FadeUp>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((project, i) => (
            <FadeUp key={project.title} delay={0.08 + i * 0.07}>
              <article className="group h-full overflow-hidden rounded-xl border border-[rgba(125,203,168,0.12)] bg-[rgba(18,34,26,0.58)] backdrop-blur-lg transition-all duration-300 hover:border-[rgba(125,203,168,0.32)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(14,28,22,0.55)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(125,203,168,0.4)] bg-[rgba(125,203,168,0.12)] px-4 py-2 text-[0.72rem] font-semibold text-[#7dcba8]">
                      View <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="mn-glass-label mb-2">{project.tags[0]}</p>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.03em] mn-glass-title">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-[1.65] mn-glass-body">
                    {truncate(project.description, 100)}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full border border-[rgba(125,203,168,0.16)] px-2.5 py-0.5 text-[0.6rem] font-medium mn-glass-muted bg-[rgba(125,203,168,0.05)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.caseStudyUrl ?? "#"}
                      className="rounded-full border border-[rgba(125,203,168,0.2)] p-2 text-[#7dcba8] transition-colors hover:border-[#7dcba8] hover:bg-[rgba(125,203,168,0.1)]"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
