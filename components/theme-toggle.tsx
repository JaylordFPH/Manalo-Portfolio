"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full border border-[#660273]/20 bg-gradient-to-br from-[#010326]/50 to-[#2d0140]/30 backdrop-blur-sm transition-all duration-300 hover:border-[#a305a6]/40 hover:shadow-lg hover:shadow-[#a305a6]/20"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 text-[#a305a6] transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 text-[#a305a6] transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
