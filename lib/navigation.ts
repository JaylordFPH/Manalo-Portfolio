export type NavigationLink = {
  label: string
  href: `#${string}`
  sectionId: string
}

export const navigationLinks: NavigationLink[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  {
    label: "Certifications",
    href: "#certifications",
    sectionId: "certifications",
  },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
]
