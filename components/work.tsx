"use client"

import Image from "next/image"
import { ArrowUpRight, Filter } from "lucide-react"
import { useRef, useState, useMemo } from "react"
import { motion, useInView, AnimatePresence, LayoutGroup } from "motion/react"
import { projects } from "@/lib/projects"

// ── Extract unique tags for filter ─────────────────────────────────────────
function useProjectFilters() {
  const allTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).slice(0, 8) // cap at 8 filter options
  }, [])
  return allTags
}

// ── FadeUp wrapper ──────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Project card — unified for all projects ─────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="group h-full overflow-hidden rounded-2xl border border-[rgba(125,203,168,0.12)] bg-[rgba(18,34,26,0.62)] backdrop-blur-lg transition-all duration-350 hover:border-[rgba(125,203,168,0.35)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-60">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,26,20,0.7)] via-transparent to-transparent" />

        {/* Top-right badge */}
        {project.featured && (
          <span className="absolute top-3.5 right-3.5 rounded-full bg-[rgba(125,203,168,0.18)] border border-[rgba(125,203,168,0.35)] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#7dcba8] backdrop-blur-md">
            Featured
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(14,28,22,0.55)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(125,203,168,0.45)] bg-[rgba(125,203,168,0.14)] px-5 py-2.5 text-[0.76rem] font-semibold text-[#7dcba8] backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
            View Case Study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        {/* Category label */}
        <p className="mn-glass-label mb-2.5">{project.tags[0]}</p>

        {/* Title */}
        <h3 className="text-[1.12rem] font-semibold tracking-[-0.03em] leading-snug mn-glass-title">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[0.82rem] leading-[1.7] mn-glass-body line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(125,203,168,0.14)] bg-[rgba(125,203,168,0.06)] px-2.5 py-0.5 text-[0.6rem] font-medium mn-glass-muted"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full px-2 py-0.5 text-[0.6rem] font-medium mn-glass-muted">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-5 border-t border-[rgba(125,203,168,0.10)] mt-5">
          <a
            href={project.caseStudyUrl ?? "#"}
            className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-[#7dcba8] hover:text-[#a8dfc4] transition-colors group/link"
          >
            View Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export function Work() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const filterTags = useProjectFilters()

  const filtered = useMemo(() => {
    if (!activeFilter) return projects
    return projects.filter((p) => p.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="projects" className="mn-scene-section">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <FadeUp>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="mn-glass-label mb-3">Selected Work</p>
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title">
                Projects
              </h2>
            </div>
            <span className="text-[0.72rem] font-medium text-[#6a9080] tracking-[0.04em]">
              {filtered.length} of {projects.length} projects
            </span>
          </div>
        </FadeUp>

        {/* Filter pills */}
        <FadeUp delay={0.06}>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Filter className="h-3.5 w-3.5 mr-1 mn-glass-muted" />
            <button
              onClick={() => setActiveFilter(null)}
              className={`rounded-full px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-all duration-250 border ${
                activeFilter === null
                  ? "border-[#7dcba8] bg-[rgba(125,203,168,0.14)] text-[#7dcba8]"
                  : "border-[rgba(125,203,168,0.14)] text-[#6a9080] hover:border-[rgba(125,203,168,0.30)] hover:text-[#9abfaa]"
              }`}
            >
              All
            </button>
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                className={`rounded-full px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-all duration-250 border ${
                  activeFilter === tag
                    ? "border-[#7dcba8] bg-[rgba(125,203,168,0.14)] text-[#7dcba8]"
                    : "border-[rgba(125,203,168,0.14)] text-[#6a9080] hover:border-[rgba(125,203,168,0.30)] hover:text-[#9abfaa]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Project grid — uniform cards, scales with any count */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-12 text-center"
            >
              <p className="mn-glass-body text-[0.88rem]">No projects match this filter.</p>
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-3 text-[0.78rem] font-semibold text-[#7dcba8] hover:underline"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
