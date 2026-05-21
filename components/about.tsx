"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const tools = [
  "Figma", "Adobe XD", "Illustrator", "Photoshop",
  "Canva", "Framer", "Notion", "Miro",
]

const stats = [
  { value: "5+", label: "Projects" },
  { value: "8+", label: "Tools" },
  { value: "1+", label: "Year" },
]

export function About() {
  return (
    <section id="about" className="mn-scene-section">
      <div className="mx-auto w-full max-w-6xl">
        {/* Glass panel */}
        <div className="mn-glass p-8 md:p-12">

          {/* Eyebrow */}
          <FadeUp>
            <p className="mn-glass-label mb-6">About me</p>
          </FadeUp>

          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-16">

            {/* Headline column */}
            <FadeUp delay={0.05}>
              <p className="text-[1.05rem] font-semibold leading-[1.45] tracking-[-0.015em] mn-glass-title md:text-[1.12rem]">
                I am an enthusiastic college student building a strong foundation
                in UI/UX design, digital presentation, and practical product
                thinking.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[rgba(125,203,168,0.14)] bg-[rgba(125,203,168,0.08)]">
                {stats.map((s) => (
                  <div key={s.label} className="bg-[rgba(22,41,31,0.5)] px-4 py-5 text-center">
                    <p className="text-[1.8rem] font-bold leading-none tracking-[-0.06em] text-[#7dcba8]">
                      {s.value}
                    </p>
                    <p className="mt-1.5 mn-glass-label" style={{ fontSize: "0.6rem" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Body column */}
            <FadeUp delay={0.1}>
              <div className="space-y-4 text-[0.93rem] leading-[1.78] mn-glass-body">
                <p>
                  My journey into design began with curiosity — wanting to
                  understand not just how things look, but how they feel to use.
                  That question drives everything I create.
                </p>
                <p>
                  I work at the intersection of aesthetics and function, turning
                  complex needs into clear, calm interfaces. Currently expanding
                  into front-end development to better bridge design and code.
                </p>
                <p>
                  Outside of work I explore type systems, obsess over product
                  details, and believe deeply that good design should feel
                  inevitable — like it could not have been any other way.
                </p>
              </div>

              {/* Tools */}
              <div className="mt-8">
                <p className="mn-glass-label mb-4">Tools &amp; Software</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[rgba(125,203,168,0.2)] px-3.5 py-1.5 text-[0.68rem] font-medium mn-glass-body bg-[rgba(125,203,168,0.06)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
