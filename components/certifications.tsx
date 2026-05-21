"use client"

import { ExternalLink, Award } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "motion/react"

const certifications = [
  {
    title: "Six Sigma Yellow Belt",
    issuer: "Six Sigma Study Targeting Success",
    date: "2025",
    featured: true,
    link: "/pdf/Six-Sigma.pdf",
  },
  {
    title: "Designer Core Micro-Credential",
    issuer: "Alteryx Certification",
    date: "2025",
    featured: true,
    link: "/pdf/Designer-Core.pdf",
  },
  {
    title: "Automation Business Analysis Fundamentals",
    issuer: "UiPath",
    date: "2025",
    featured: false,
    link: "/pdf/Automation-Business.pdf",
  },
  {
    title: "UiPath Automation Implementation Methodology Fundamentals",
    issuer: "UiPath",
    date: "2025",
    featured: false,
    link: "/pdf/Automation-Implementation.pdf",
  },
  {
    title: "Computer Systems Servicing",
    issuer: "Tesda National Certificate II",
    date: "2025",
    featured: false,
    link: "/pdf/NC.pdf",
  },
]

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
        >
          <p className="mn-glass-label mb-4">Credentials</p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title mb-10">
            Certifications
          </h2>
        </motion.div>

        {/* Glass panel with list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mn-glass overflow-hidden"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.07 }}
              className="group flex items-center justify-between gap-4 border-b border-[rgba(125,203,168,0.10)] px-7 py-5 last:border-none transition-colors duration-200 hover:bg-[rgba(125,203,168,0.06)]"
            >
              {/* Left */}
              <div className="flex items-start gap-4 min-w-0">
                {/* Icon */}
                <div className="mt-0.5 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(125,203,168,0.10)]">
                  <Award className="h-4 w-4 text-[#7dcba8]" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h3 className="text-[0.92rem] font-semibold mn-glass-title leading-snug">
                      {cert.title}
                    </h3>
                    {cert.featured && (
                      <span className="rounded-full bg-[rgba(125,203,168,0.12)] px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#7dcba8] border border-[rgba(125,203,168,0.2)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-[0.78rem] mn-glass-muted">{cert.issuer}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-shrink-0 items-center gap-4">
                <span className="hidden text-[0.72rem] mn-glass-muted sm:block">{cert.date}</span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(125,203,168,0.2)] px-3.5 py-1.5 text-[0.7rem] font-medium text-[#7dcba8] transition-all duration-200 hover:border-[#7dcba8] hover:bg-[rgba(125,203,168,0.10)] md:opacity-0 md:group-hover:opacity-100"
                >
                  View <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
