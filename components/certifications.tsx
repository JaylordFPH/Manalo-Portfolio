"use client"

import { ExternalLink, Award, ShieldCheck, BookOpen, Cpu, Palette } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "motion/react"

// ── Data — easy to extend, just add objects ──────────────────────────────────
const certifications = [
  {
    title: "Six Sigma Yellow Belt",
    issuer: "Six Sigma Study Targeting Success",
    date: "2025",
    category: "Process",
    icon: ShieldCheck,
    accent: "#e8c44a",
    link: "/pdf/Six-Sigma.pdf",
  },
  {
    title: "Designer Core Micro-Credential",
    issuer: "Alteryx Certification",
    date: "2025",
    category: "Analytics",
    icon: Palette,
    accent: "#5ab8e8",
    link: "/pdf/Designer-Core.pdf",
  },
  {
    title: "Automation Business Analysis Fundamentals",
    issuer: "UiPath",
    date: "2025",
    category: "Automation",
    icon: Cpu,
    accent: "#f07a52",
    link: "/pdf/Automation-Business.pdf",
  },
  {
    title: "UiPath Automation Implementation Methodology",
    issuer: "UiPath",
    date: "2025",
    category: "Automation",
    icon: Cpu,
    accent: "#f07a52",
    link: "/pdf/Automation-Implementation.pdf",
  },
  {
    title: "Computer Systems Servicing NC II",
    issuer: "Tesda National Certificate",
    date: "2025",
    category: "Technical",
    icon: BookOpen,
    accent: "#7dcba8",
    link: "/pdf/NC.pdf",
  },
]

// ── Cert card ────────────────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  triggered,
}: {
  cert: typeof certifications[0]
  index: number
  triggered: boolean
}) {
  const Icon = cert.icon

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 + index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(125,203,168,0.12)] bg-[rgba(18,34,26,0.62)] backdrop-blur-lg p-6 transition-all duration-350 hover:border-[rgba(125,203,168,0.35)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.42)] hover:-translate-y-1"
    >
      {/* Accent glow — top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)` }}
      />

      {/* Header: icon + category + date */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${cert.accent}18`,
            border: `1px solid ${cert.accent}30`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: cert.accent }} />
        </div>
        <span className="rounded-full border border-[rgba(125,203,168,0.14)] bg-[rgba(125,203,168,0.06)] px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] mn-glass-muted">
          {cert.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[0.95rem] font-semibold tracking-[-0.02em] leading-snug mn-glass-title mb-2 group-hover:text-[#7dcba8] transition-colors duration-200">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="text-[0.76rem] mn-glass-muted mb-4">{cert.issuer}</p>

      {/* Footer: date + view link */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(125,203,168,0.10)]">
        <span className="flex items-center gap-1.5 text-[0.68rem] mn-glass-muted">
          <Award className="h-3 w-3" />
          {cert.date}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full text-[0.68rem] font-semibold text-[#7dcba8] opacity-0 -translate-x-2 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0">
          View <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </motion.a>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="certifications" className="mn-scene-section">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="mn-glass-label mb-3">Credentials</p>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title">
              Certifications
            </h2>
          </div>
          <span className="text-[0.72rem] font-medium text-[#6a9080] tracking-[0.04em]">
            {certifications.length} earned
          </span>
        </motion.div>

        {/* Card grid — responsive, scales with any count */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} triggered={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
