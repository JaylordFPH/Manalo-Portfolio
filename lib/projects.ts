export type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  placeholderStyle: string
  featured: boolean
  previewUrl?: string
  caseStudyUrl?: string
}

export const projects: Project[] = [
  {
    title: "E-Commerce",
    description:
      "A UI/UX concept for a modern shopping experience focused on intuitive browsing, strong product hierarchy, and a smoother checkout journey. The design explores trust-building visuals, responsive layouts, and clearer flow decisions from discovery to purchase.",
    tags: [
      "UI/UX Design",
      "E-commerce",
      "Figma",
      "Responsive Design",
      "User Flow",
      "Checkout UX",
      "Design System",
    ],
    image: "/projects/e-commerce-showcase.png",
    imageAlt:
      "Placeholder storefront interface showing a hero banner, product cards, cart summary, and mobile preview.",
    placeholderStyle:
      "Desktop and mobile storefront mockup with a hero banner, product grid, cart drawer, and checkout summary.",
    featured: true,
  },
  {
    title: "Background Remover",
    description:
      "A product design concept for a background removal tool that prioritizes clarity, speed, and confidence during image editing. The experience focuses on intuitive upload states, before-and-after comparison, and streamlined actions for creators who need clean results without a complicated workflow.",
    tags: [
      "UI/UX Design",
      "Image Editing",
      "Interaction Design",
      "Figma",
      "Usability",
      "Visual Design",
      "Product Tool",
    ],
    image: "/projects/background-remover-showcase.png",
    imageAlt:
      "Placeholder before and after editor showing an uploaded portrait with the background removed.",
    placeholderStyle:
      "Split before and after composition with an upload panel, processing indicator, and clean subject cutout.",
    featured: true,
  },
  {
    title: "Thrift Market Mobile App",
    description:
      "A mobile-first thrift marketplace concept centered on discovery, trust signals, and frictionless browsing for style-conscious shoppers.",
    tags: [
      "Mobile Design",
      "E-commerce",
      "User Research",
      "Visual Hierarchy",
    ],
    image: "/projects/thrift-market-showcase.png",
    imageAlt:
      "Placeholder mobile commerce interface featuring curated fashion listings and category cards.",
    placeholderStyle:
      "Mobile shopping experience with product cards, category chips, and a bold editorial hero.",
    featured: true,
  },
  {
    title: "PalaBooks Web System",
    description:
      "A clean web system concept for managing records, insights, and day-to-day workflows with a dashboard-led information architecture.",
    tags: ["Web Design", "Dashboard UX", "Data Visualization", "Admin Flow"],
    image: "/projects/palabooks-showcase.png",
    imageAlt:
      "Placeholder dashboard interface with charts, stats cards, and management panels.",
    placeholderStyle:
      "Desktop dashboard layout with charts, side navigation, and data-driven management cards.",
    featured: false,
  },
  {
    title: "School Management System",
    description:
      "An admin-focused platform concept for organizing student records, schedules, and school operations through a clearer workflow and interface structure.",
    tags: [
      "Admin Dashboard",
      "Responsive UI",
      "Workflow Design",
      "Information Architecture",
    ],
    image: "/projects/school-management-showcase.png",
    imageAlt:
      "Placeholder school management dashboard showing attendance, schedules, and student activity panels.",
    placeholderStyle:
      "Education dashboard with attendance summaries, scheduling widgets, and student management tables.",
    featured: false,
  },
]
