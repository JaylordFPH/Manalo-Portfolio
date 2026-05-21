"use client"

import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { motion } from "motion/react"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
})

export function Hero() {
  return (
    <section
      id="home"
      className="mn-scene-section justify-center"
      style={{ paddingTop: "9rem" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Availability badge */}
        <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-2.5">
          <span className="mn-dot-live" style={{ backgroundColor: "#6ec6a0" }} />
          <span className="mn-glass-label">Available for opportunities</span>
        </motion.div>

        {/* Main headline — raw text on 3D, no glass card */}
        <motion.h1
          {...fadeUp(0.08)}
          className="max-w-[42rem] text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.055em] mn-glass-title"
        >
          <span className="block">Designing</span>
          <span className="block">polished digital</span>
          <span className="block" style={{ color: "#7dcba8" }}>
            experiences
          </span>
          <span className="block">with intent.</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.16)}
          className="my-8 max-w-[5rem] border-t border-[rgba(125,203,168,0.3)]"
        />

        {/* Description */}
        <motion.p
          {...fadeUp(0.2)}
          className="max-w-[30rem] text-[0.95rem] leading-[1.78] mn-glass-body"
        >
          I shape digital experiences that feel welcoming from first impression
          to final interaction — blending clarity, responsive thinking, and
          practical problem solving.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.26)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/pdf/Manalo-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#3d7a62] px-6 py-2.5 text-[0.8rem] font-semibold text-white transition-all duration-200 hover:bg-[#2f6250] hover:shadow-[0_6px_24px_rgba(61,122,98,0.5)] hover:-translate-y-[1px]"
          >
            <Download className="h-3.5 w-3.5" />
            Download CV
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(125,203,168,0.32)] px-6 py-2.5 text-[0.8rem] font-medium mn-glass-title transition-all duration-200 hover:border-[rgba(125,203,168,0.65)] hover:bg-[rgba(61,122,98,0.18)] hover:-translate-y-[1px]"
          >
            View Projects
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.33)}
          className="mt-14 flex items-center gap-10 mn-glass-edge pt-7"
        >
          {[
            { value: "5+", label: "Projects" },
            { value: "8+", label: "Tools" },
            { value: "2025", label: "Cohort" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[1.95rem] font-bold leading-none tracking-[-0.06em] mn-glass-title">
                {s.value}
              </p>
              <p className="mt-1.5 mn-glass-label">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="h-12 w-px animate-bounce bg-gradient-to-b from-[rgba(125,203,168,0.6)] to-transparent" />
        <span className="mn-glass-label" style={{ fontSize: "0.55rem" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
