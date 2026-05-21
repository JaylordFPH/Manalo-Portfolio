import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { WorldCanvasWrapper } from "@/components/three/WorldCanvasWrapper"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jenelyn Manalo | Portfolio",
  description:
    "Portfolio showcasing thoughtful UI/UX work, featured case studies, and polished interface concepts.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Fixed 3D world — always behind content */}
        <WorldCanvasWrapper />
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
