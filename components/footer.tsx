"use client"

import { Mail, ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "motion/react"

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/placeholder" },
  { label: "Behance",  href: "https://behance.net/placeholder" },
  { label: "Dribbble", href: "https://dribbble.com/placeholder" },
]

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <footer id="contact" className="mn-scene-section">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        <div className="mn-glass p-10 md:p-14">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mn-glass-label mb-6"
          >
            Contact
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold tracking-[-0.05em] leading-[1.02] mn-glass-title max-w-3xl"
          >
            Let&apos;s build something{" "}
            <span style={{ color: "#7dcba8" }}>thoughtful</span>
            {" "}together.
          </motion.h2>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            className="mt-10"
          >
            <a
              href="mailto:manalojenelyn02@designer.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#3d7a62] px-7 py-3 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:bg-[#2f6250] hover:shadow-[0_8px_28px_rgba(61,122,98,0.55)] hover:-translate-y-[1px]"
            >
              <Mail className="h-3.5 w-3.5" />
              Send a message
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="my-10 border-t border-[rgba(125,203,168,0.15)]"
          />

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(125,203,168,0.18)] px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] mn-glass-body transition-all duration-200 hover:border-[#7dcba8] hover:text-[#7dcba8] hover:bg-[rgba(125,203,168,0.08)]"
                >
                  {label}
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </a>
              ))}
            </div>

            {/* Back to top + copyright */}
            <div className="flex items-center gap-6">
              <a
                href="#home"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] mn-glass-muted hover:text-[#7dcba8] transition-colors"
              >
                Back to top ↑
              </a>
              <span className="text-[0.65rem] mn-glass-muted">
                © {new Date().getFullYear()} Jenelyn Manalo
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  )
}
