"use client"

import { Monitor, Palette, Search, Smartphone, Users, Zap } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "motion/react"

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interface and experience design grounded in clarity, hierarchy, and user-centered presentation.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    glow: "rgba(125,203,168,0.18)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description: "Responsive, mobile-first concepts shaped for smooth navigation and consistent user flows.",
    features: ["iOS Patterns", "Android Patterns", "Responsive Layouts", "Interaction Polish"],
    glow: "rgba(106,170,138,0.15)",
  },
  {
    icon: Monitor,
    title: "Web Design",
    description: "Clean, conversion-aware web experiences with strong structure and purposeful visual rhythm.",
    features: ["Landing Pages", "E-Commerce", "Dashboards", "Portfolio Sites"],
    glow: "rgba(90,138,114,0.14)",
  },
  {
    icon: Users,
    title: "User Research",
    description: "Design decisions supported by discovery, feedback, and closer attention to user needs.",
    features: ["User Interviews", "Usability Testing", "Competitive Review", "Journey Mapping"],
    glow: "rgba(125,203,168,0.18)",
  },
  {
    icon: Search,
    title: "Design Audit",
    description: "Thoughtful review of an interface to identify friction, gaps, and improvement opportunities.",
    features: ["Heuristic Evaluation", "Accessibility Review", "Interface Cleanup", "Recommendations"],
    glow: "rgba(106,170,138,0.15)",
  },
  {
    icon: Zap,
    title: "Design Systems",
    description: "Reusable visual rules and component thinking that help products stay consistent as they grow.",
    features: ["Component Libraries", "Visual Tokens", "Style Guides", "Pattern Consistency"],
    glow: "rgba(90,138,114,0.14)",
  },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" })

  return (
    <section id="services" className="mn-scene-section">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <FadeUp>
          <p className="mn-glass-label mb-4">What I offer</p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title mb-12">
            Services
          </h2>
        </FadeUp>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 18 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.04 + i * 0.07 }}
                className="mn-glass-light p-6 group cursor-default"
                style={{ boxShadow: `inset 0 0 0 1px ${svc.glow}` }}
              >
                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{ background: svc.glow }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#7dcba8" }} />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-[0.96rem] font-semibold tracking-[-0.02em] mn-glass-title">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-[0.82rem] leading-[1.65] mn-glass-body">
                  {svc.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[0.72rem] mn-glass-muted">
                      <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#7dcba8" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
