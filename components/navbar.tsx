"use client"

import { useEffect, useState } from "react"
import { Menu, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { navigationLinks } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  /* ── Track scroll position for background transition ── */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ── Section observer ── */
  useEffect(() => {
    const sections = navigationLinks
      .map((l) => document.getElementById(l.sectionId))
      .filter((s): s is HTMLElement => Boolean(s))
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActiveSection(vis[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.35, 0.6] }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-[rgba(125,203,168,0.14)] bg-[rgba(14,26,20,0.82)] shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-transparent shadow-none"
      )}
      style={{
        backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "blur(0px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-6">

        {/* Brand — logo mark + name */}
        <a
          href="#home"
          className="group flex items-center gap-2.5"
        >
          {/* Monogram circle */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(125,203,168,0.12)] border border-[rgba(125,203,168,0.22)] text-[0.65rem] font-bold text-[#7dcba8] transition-all duration-300 group-hover:bg-[rgba(125,203,168,0.20)] group-hover:scale-105">
            JM
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] mn-glass-title transition-colors duration-200 group-hover:text-[#7dcba8]">
            Jenelyn Manalo
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link, i) => {
            const isActive = activeSection === link.sectionId
            return (
              <motion.a
                key={link.sectionId}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 + i * 0.05 }}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-[0.74rem] font-medium transition-all duration-250",
                  isActive
                    ? "text-[#7dcba8] bg-[rgba(125,203,168,0.10)]"
                    : "mn-glass-body hover:text-[#e8f4ee] hover:bg-[rgba(125,203,168,0.06)]"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-[rgba(125,203,168,0.22)]"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </motion.a>
            )
          })}

          {/* CTA button */}
          <a
            href="#contact"
            className="ml-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[0.72rem] font-semibold text-white transition-all duration-250 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(61,122,98,0.5)]"
            style={{ background: "linear-gradient(135deg, #4a9a6a, #3d7a52)" }}
          >
            <Send className="h-3 w-3" />
            Let&apos;s Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(125,203,168,0.18)] bg-[rgba(125,203,168,0.06)] mn-glass-body hover:text-[#7dcba8] hover:border-[rgba(125,203,168,0.35)] transition-all duration-200 md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mn-mobile-nav"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-4.5 w-4.5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="h-4.5 w-4.5" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {/* Mobile Menu — full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mn-mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 border-t border-[rgba(125,203,168,0.12)] bg-[rgba(12,22,18,0.96)] backdrop-blur-2xl md:hidden"
            style={{ height: "calc(100dvh - 4rem)" }}
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {navigationLinks.map((link, i) => {
                const isActive = activeSection === link.sectionId
                return (
                  <motion.a
                    key={link.sectionId}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 + i * 0.05 }}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-5 py-4 text-[0.88rem] font-medium transition-all duration-200",
                      isActive
                        ? "bg-[rgba(125,203,168,0.10)] text-[#7dcba8] border border-[rgba(125,203,168,0.18)]"
                        : "mn-glass-body hover:bg-[rgba(125,203,168,0.06)] hover:text-[#e8f4ee] border border-transparent"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7dcba8]" />
                    )}
                  </motion.a>
                )
              })}

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.04 + navigationLinks.length * 0.05 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-[0.82rem] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #4a9a6a, #3d7a52)" }}
              >
                <Send className="h-3.5 w-3.5" />
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
