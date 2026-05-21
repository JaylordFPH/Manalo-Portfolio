"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "motion/react"

import { navigationLinks } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = navigationLinks
      .map((l) => document.getElementById(l.sectionId))
      .filter((s): s is HTMLElement => Boolean(s))
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActiveSection(vis[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.35, 0.6] }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-[rgba(125,203,168,0.12)] bg-[rgba(16,28,22,0.75)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between px-4 md:px-5">

        {/* Brand */}
        <a
          href="#home"
          className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] mn-glass-title hover:text-[#7dcba8] transition-colors duration-200"
        >
          Jenelyn Manalo
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link, i) => {
            const isActive = activeSection === link.sectionId
            return (
              <motion.a
                key={link.sectionId}
                href={link.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.06 }}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative text-[0.76rem] font-medium transition-colors duration-200",
                  isActive ? "text-[#7dcba8]" : "mn-glass-body hover:mn-glass-title"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#7dcba8]"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </motion.a>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="flex items-center justify-center rounded-full p-2 mn-glass-body hover:text-[#7dcba8] transition-colors duration-200 md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mn-mobile-nav"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mn-mobile-nav"
          className="border-t border-[rgba(125,203,168,0.12)] bg-[rgba(14,24,20,0.92)] backdrop-blur-xl px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.sectionId
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-[0.82rem] font-medium transition-colors duration-200",
                    isActive
                      ? "bg-[rgba(125,203,168,0.10)] text-[#7dcba8]"
                      : "mn-glass-body hover:bg-[rgba(125,203,168,0.06)] hover:text-[#e8f4ee]"
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </motion.header>
  )
}
