"use client"

import { Mail, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useRef, useState, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/placeholder" },
  { label: "Behance",  href: "https://behance.net/placeholder" },
  { label: "Dribbble", href: "https://dribbble.com/placeholder" },
]

// ── Contact form state ──────────────────────────────────────────────────────
type FormState = "idle" | "sending" | "sent" | "error"
type FormErrors = { name?: string; email?: string; message?: string }

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function ContactForm({ inView }: { inView: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, setState] = useState<FormState>("idle")

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!validateEmail(form.email)) e.email = "Enter a valid email"
    if (!form.message.trim()) e.message = "Message is required"
    else if (form.message.trim().length < 10) e.message = "At least 10 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setState("sending")

    // Simulate network request — replace with real API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800))
      // Uncomment below for a real endpoint:
      // const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      // if (!res.ok) throw new Error('Failed to send')
      setState("sent")
      setForm({ name: "", email: "", message: "" })
      setErrors({})
      setTimeout(() => setState("idle"), 4000)
    } catch {
      setState("error")
      setTimeout(() => setState("idle"), 3500)
    }
  }

  function onChange(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const inputBase =
    "w-full rounded-xl border bg-[rgba(14,26,20,0.6)] px-4 py-3 text-[0.88rem] font-medium mn-glass-title placeholder:text-[rgba(125,203,168,0.30)] outline-none transition-all duration-300"
  const inputIdle = "border-[rgba(125,203,168,0.14)] focus:border-[#7dcba8] focus:shadow-[0_0_0_3px_rgba(125,203,168,0.12)]"
  const inputError = "border-red-500/50 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="space-y-5"
    >
      {/* Name + Email row */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] mn-glass-muted">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={`${inputBase} ${errors.name ? inputError : inputIdle}`}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-400">
                <AlertCircle className="h-3 w-3" /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] mn-glass-muted">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`${inputBase} ${errors.email ? inputError : inputIdle}`}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-400">
                <AlertCircle className="h-3 w-3" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] mn-glass-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          className={`${inputBase} resize-none ${errors.message ? inputError : inputIdle}`}
        />
        <div className="mt-1 flex items-center justify-between">
          <AnimatePresence>
            {errors.message && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1 text-[0.68rem] text-red-400">
                <AlertCircle className="h-3 w-3" /> {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
          <span className={`ml-auto text-[0.65rem] transition-colors ${form.message.length >= 10 ? "text-[#7dcba8]" : "mn-glass-muted"}`}>
            {form.message.length}/500
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "sending" || state === "sent"}
        className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_36px_rgba(61,122,98,0.5)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        style={{ background: state === "sent" ? "linear-gradient(135deg, #2d8a4e, #1e6a35)" : state === "error" ? "linear-gradient(135deg, #9a4a4a, #7a3535)" : "linear-gradient(135deg, #4a9a6a, #3d7a52)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "sending" ? (
            <motion.span key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </motion.span>
          ) : state === "sent" ? (
            <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Message Sent!
            </motion.span>
          ) : state === "error" ? (
            <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Failed — Try Again
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
              <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.form>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <footer id="contact" className="mn-scene-section">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        <div className="mn-glass p-8 md:p-14">

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">

            {/* Left — headline + info */}
            <div>
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mn-glass-label mb-5"
              >
                Get in Touch
              </motion.p>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                className="text-[clamp(1.8rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.08] mn-glass-title"
              >
                Let&apos;s build something{" "}
                <span className="text-[#7dcba8]">thoughtful</span>{" "}
                together.
              </motion.h2>

              {/* Email link */}
              <motion.a
                href="mailto:manalojenelyn02@designer.com"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-medium mn-glass-body hover:text-[#7dcba8] transition-colors"
              >
                <Mail className="h-4 w-4 text-[#7dcba8]" />
                manalojenelyn02@designer.com
              </motion.a>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-6 flex flex-wrap gap-2"
              >
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
              </motion.div>
            </div>

            {/* Right — contact form */}
            <ContactForm inView={inView} />

          </div>

          {/* Bottom divider + footer row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-12 border-t border-[rgba(125,203,168,0.15)] pt-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[0.65rem] mn-glass-muted">
                © {new Date().getFullYear()} Jenelyn Manalo · UI/UX Designer
              </span>
              <a
                href="#home"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] mn-glass-muted hover:text-[#7dcba8] transition-colors"
              >
                Back to top ↑
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  )
}
