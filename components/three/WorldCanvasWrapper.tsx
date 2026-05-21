"use client"

import dynamic from "next/dynamic"

const WorldCanvas = dynamic(
  () => import("./WorldCanvas").then((m) => m.WorldCanvas),
  { ssr: false }
)

export function WorldCanvasWrapper() {
  return <WorldCanvas />
}
