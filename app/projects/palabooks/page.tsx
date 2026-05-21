import type { Metadata } from "next"

import { PalaBooksDashboard } from "@/components/palabooks-dashboard"

export const metadata: Metadata = {
  title: "PalaBooks Dashboard | Jenelyn Manalo",
  description:
    "A responsive implementation of the PalaBooks dashboard concept with circulation metrics, queue insights, and library operations visuals.",
}

export default function PalaBooksPage() {
  return <PalaBooksDashboard />
}
