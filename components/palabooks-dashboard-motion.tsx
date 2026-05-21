"use client"

import Image from "next/image"
import Link from "next/link"
import { startTransition, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Clock3,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react"

import {
  dashboardContent,
  rangeOptions,
  type ChartData,
  type MetricCardData,
  type RangeKey,
  type SectionKey,
} from "@/components/palabooks-dashboard-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NavigationItem = {
  key: SectionKey
  label: string
  icon: LucideIcon
  badge?: string
}

type InteractionTarget = {
  y?: number
  scale?: number
}

const navigationItems: NavigationItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "inventory", label: "Inventory", icon: BookOpen, badge: "42" },
  { key: "members", label: "Members", icon: Users, badge: "18" },
  { key: "circulation", label: "Circulation", icon: RefreshCcw, badge: "9" },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings2 },
]

function chartPoints(values: number[], maxValue: number) {
  const left = 36
  const right = 684
  const top = 58
  const bottom = 252
  const step = values.length > 1 ? (right - left) / (values.length - 1) : 0

  return values.map((value, index) => ({
    x: left + step * index,
    y: bottom - (value / maxValue) * (bottom - top),
  }))
}

function linePath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ")
}

function areaPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return ""
  const baseline = 252
  return `${linePath(points)} L${points[points.length - 1].x} ${baseline} L${points[0].x} ${baseline} Z`
}

function TrendAreaChart({
  chartKey,
  data,
  travelY,
  transition,
}: {
  chartKey: string
  data: ChartData
  travelY: number
  transition: Transition
}) {
  const peak = Math.max(...data.primary, ...data.secondary, 100) * 1.12
  const primaryPoints = chartPoints(data.primary, peak)
  const secondaryPoints = chartPoints(data.secondary, peak)

  return (
    <motion.svg
      key={chartKey}
      viewBox="0 0 720 320"
      aria-labelledby={`${chartKey}-title`}
      className="h-[18rem] w-full"
      role="img"
      initial={{ opacity: 0, y: travelY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -travelY / 2 }}
      transition={transition}
    >
      <title id={`${chartKey}-title`}>{data.title}</title>
      <defs>
        <linearGradient id={`${chartKey}-tan-area`} x1="0" y1="58" x2="0" y2="252">
          <stop offset="0%" stopColor="#A38560" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#A38560" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient
          id={`${chartKey}-burgundy-area`}
          x1="0"
          y1="58"
          x2="0"
          y2="252"
        >
          <stop offset="0%" stopColor="#390517" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#390517" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {[72, 116, 160, 204, 248].map((y) => (
        <line
          key={y}
          x1="36"
          y1={y}
          x2="684"
          y2={y}
          stroke="#E8E1D8"
          strokeDasharray="5 9"
        />
      ))}

      <motion.path
        d={areaPath(secondaryPoints)}
        fill={`url(#${chartKey}-tan-area)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
      />
      <motion.path
        d={areaPath(primaryPoints)}
        fill={`url(#${chartKey}-burgundy-area)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
      />

      <motion.path
        d={linePath(primaryPoints)}
        fill="none"
        stroke="#390517"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
        initial={{ pathLength: 0, opacity: 0.7 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={transition}
      />
      <motion.path
        d={linePath(secondaryPoints)}
        fill="none"
        stroke="#A38560"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
        initial={{ pathLength: 0, opacity: 0.7 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={transition}
      />

      {primaryPoints.map((point, index) => (
        <motion.circle
          key={`primary-${chartKey}-${point.x}`}
          cx={point.x}
          cy={point.y}
          r="6"
          fill="#390517"
          initial={{ opacity: 0, y: travelY / 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: transition.duration ? index * 0.04 : 0 }}
        />
      ))}
      {secondaryPoints.map((point, index) => (
        <motion.circle
          key={`secondary-${chartKey}-${point.x}`}
          cx={point.x}
          cy={point.y}
          r="6"
          fill="#A38560"
          initial={{ opacity: 0, y: travelY / 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: transition.duration ? index * 0.05 : 0 }}
        />
      ))}

      {data.labels.map((label, index) => (
        <text
          key={label}
          x={48 + index * 120}
          y="292"
          fill="#6B6155"
          fontSize="14"
          fontWeight="600"
        >
          {label}
        </text>
      ))}
    </motion.svg>
  )
}

function SidebarNavItem({
  item,
  isActive,
  onClick,
  hoverLift,
  tapPress,
}: {
  item: NavigationItem
  isActive: boolean
  onClick: () => void
  hoverLift: InteractionTarget
  tapPress: InteractionTarget
}) {
  const Icon = item.icon

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={hoverLift}
      whileTap={tapPress}
      className={cn(
        "relative flex w-full items-center justify-between overflow-hidden rounded-[1.15rem] px-4 py-3 text-left transition-colors",
        isActive ? "text-white" : "text-white/72 hover:text-white"
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="palabooks-sidebar-pill"
          className="absolute inset-0 rounded-[1.15rem] bg-[#173a33] shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-3 text-sm font-medium">
        <Icon className="h-4 w-4" />
        {item.label}
      </span>
      {item.badge ? (
        <span
          className={cn(
            "relative z-10 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold",
            isActive ? "bg-[#a38560] text-white" : "bg-white/10 text-white/74"
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </motion.button>
  )
}

function RangeChip({
  active,
  label,
  onClick,
  hoverLift,
  tapPress,
}: {
  active: boolean
  label: string
  onClick: () => void
  hoverLift: InteractionTarget
  tapPress: InteractionTarget
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={hoverLift}
      whileTap={tapPress}
      className={cn(
        "relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-white" : "bg-[#f4ede6] text-[#5a4e42] hover:bg-[#ece2d7]"
      )}
    >
      {active ? (
        <motion.span
          layoutId="palabooks-range-pill"
          className="absolute inset-0 rounded-full bg-[#16302b]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}

function DashboardMetricCard({
  card,
  delay,
  travelY,
  transition,
  hoverLift,
  tapPress,
}: {
  card: MetricCardData
  delay: number
  travelY: number
  transition: Transition
  hoverLift: InteractionTarget
  tapPress: InteractionTarget
}) {
  return (
    <motion.div
      layout
      whileHover={hoverLift}
      whileTap={tapPress}
      initial={{ opacity: 0, y: travelY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -travelY / 2 }}
      transition={{ ...transition, delay: transition.duration ? delay : 0 }}
    >
      <Card className="rounded-[1.8rem] border-transparent bg-white p-5 shadow-[0_28px_50px_rgba(22,48,43,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7b6c5d]">
              {card.eyebrow}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#6f665b]">{card.detail}</p>
          </div>
          <span className="rounded-full bg-[#f5efe8] px-3 py-1 text-xs font-semibold text-[#5f4d3a]">
            {card.trend}
          </span>
        </div>

        <div
          className={cn(
            "mt-5 rounded-[1.5rem] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
            card.surfaceClass,
            card.textClass
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold tracking-[-0.06em]">{card.value}</p>
              <p className="mt-2 text-sm opacity-90">{card.note}</p>
            </div>
            {card.markers ? (
              <div className="flex gap-2 pt-1">
                {card.markers.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ) : (
              <ArrowUpRight className="h-5 w-5 opacity-85" />
            )}
          </div>
        </div>

        <div className="mt-5 flex items-end gap-2">
          {card.bars.map((bar, index) => (
            <motion.span
              key={`${card.eyebrow}-${index}`}
              className="flex-1 rounded-full bg-[#ede5db]"
              style={{ height: `${bar}px` }}
              initial={{ opacity: 0, scaleY: 0.45 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ ...transition, delay: transition.duration ? delay + index * 0.03 : 0 }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export function PalaBooksDashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("overview")
  const [activeRange, setActiveRange] = useState<RangeKey>("month")
  const prefersReducedMotion = useReducedMotion()

  const section = dashboardContent[activeSection]
  const rangeContent = section.ranges[activeRange]
  const sectionKey = `${activeSection}-${activeRange}`
  const travelX = prefersReducedMotion ? 0 : 24
  const travelY = prefersReducedMotion ? 0 : 18
  const transition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  const hoverLift = prefersReducedMotion ? {} : { y: -4, scale: 1.01 }
  const tapPress = prefersReducedMotion ? {} : { scale: 0.985 }

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-[#e7e1d9] px-4 py-4 text-[#16302b] sm:px-6 lg:px-8 lg:py-6">
        <motion.div
          className="mx-auto max-w-[92rem] space-y-4"
          initial={{ opacity: 0, y: travelY }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              asChild
              variant="ghost"
              className="h-11 justify-start rounded-full border border-[#cfc1b1] bg-white/70 px-5 text-[#16302b] hover:bg-white"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to portfolio
              </Link>
            </Button>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#c7b7a2] bg-[#f8f3ec] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#6f5c49]">
              <Sparkles className="h-3.5 w-3.5" />
              PalaBooks live concept
            </div>
          </div>

          <motion.div
            className="overflow-hidden rounded-[2.5rem] border border-[#29473f] bg-[#16302b] p-3 shadow-[0_28px_90px_rgba(13,22,20,0.28)] md:p-4"
            initial={{ opacity: 0, y: travelY * 1.2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: transition.duration ? 0.08 : 0 }}
          >
            <div className="grid gap-4 xl:grid-cols-[17rem_minmax(0,1fr)]">
              <motion.aside
                className="flex flex-col rounded-[2rem] bg-[#0e2420] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                initial={{ opacity: 0, x: -travelX }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transition, delay: transition.duration ? 0.14 : 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-[#a38560] text-lg font-semibold text-white">
                    PB
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.04em]">PalaBooks</p>
                    <p className="text-sm text-white/64">Library operations hub</p>
                  </div>
                </div>

                <LayoutGroup id="palabooks-sidebar-nav">
                  <div className="mt-8 space-y-2">
                    {navigationItems.map((item) => (
                      <SidebarNavItem
                        key={item.key}
                        item={item}
                        isActive={item.key === activeSection}
                        hoverLift={hoverLift}
                        tapPress={tapPress}
                        onClick={() => startTransition(() => setActiveSection(item.key))}
                      />
                    ))}
                  </div>
                </LayoutGroup>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSection}
                    className="mt-8 flex flex-1 flex-col justify-between gap-8"
                    initial={{ opacity: 0, y: travelY }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -travelY / 2 }}
                    transition={transition}
                  >
                    <div className="rounded-[1.7rem] bg-[#173a33] p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d5c3ad]">
                        {section.sidebar.eyebrow}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">
                        {section.sidebar.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-white/72">
                        {section.sidebar.body}
                      </p>

                      <div className="mt-5 space-y-3">
                        {section.sidebar.stats.map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            className="rounded-[1.25rem] bg-black/14 px-4 py-3"
                            initial={{ opacity: 0, y: travelY / 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              ...transition,
                              delay: transition.duration ? 0.08 + index * 0.05 : 0,
                            }}
                          >
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/70">{stat.label}</span>
                              <span className="font-semibold text-white">{stat.value}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-3"
                      initial={{ opacity: 0, y: travelY / 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition, delay: transition.duration ? 0.12 : 0 }}
                    >
                      <Clock3 className="h-4 w-4 text-[#d5c3ad]" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {section.sidebar.footer.title}
                        </p>
                        <p className="text-xs text-white/58">
                          {section.sidebar.footer.meta}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.aside>

              <section className="space-y-4">
                <motion.header
                  className="rounded-[2rem] bg-[#e0e0e0] px-5 py-5 shadow-[0_16px_34px_rgba(0,0,0,0.08)] md:px-6"
                  initial={{ opacity: 0, y: travelY }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: transition.duration ? 0.18 : 0 }}
                >
                  <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                    <div className="max-w-2xl overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeSection}
                          initial={{ opacity: 0, y: travelY }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -travelY / 2 }}
                          transition={transition}
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#7a6c5b]">
                            {section.header.eyebrow}
                          </p>
                          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#16302b] md:text-[2.8rem]">
                            {section.header.title}
                          </h1>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5e5a53]">
                            {section.header.description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
                      <label className="flex h-12 min-w-[17rem] items-center gap-3 rounded-full border border-[#d7cdc2] bg-white px-4 shadow-[0_10px_22px_rgba(0,0,0,0.05)]">
                        <Search className="h-4 w-4 text-[#6f675c]" />
                        <input
                          aria-label="Search"
                          className="w-full bg-transparent text-sm text-[#16302b] placeholder:text-[#988d81] focus:outline-none"
                          placeholder="Search titles, members, or invoices"
                          type="search"
                        />
                      </label>

                      <motion.button
                        type="button"
                        whileHover={hoverLift}
                        whileTap={tapPress}
                        className="h-12 rounded-full bg-[#390517] px-5 text-sm font-medium text-white shadow-[0_16px_28px_rgba(57,5,23,0.22)]"
                      >
                        Generate report
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={hoverLift}
                        whileTap={tapPress}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7cdc2] bg-white text-[#16302b] shadow-[0_10px_22px_rgba(0,0,0,0.05)]"
                      >
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Notifications</span>
                      </motion.button>

                      <motion.div
                        whileHover={hoverLift}
                        className="flex items-center gap-3 rounded-full bg-white px-2 py-2 shadow-[0_10px_22px_rgba(0,0,0,0.05)]"
                      >
                        <Image
                          src="/image/profile.png"
                          alt="Jenelyn Manalo"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="hidden pr-2 text-left sm:block">
                          <p className="text-sm font-semibold text-[#16302b]">
                            Jenelyn Manalo
                          </p>
                          <p className="text-xs text-[#7b7166]">System designer</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.header>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${sectionKey}-metrics`}
                    className="grid gap-4 lg:grid-cols-3"
                    initial={{ opacity: 0, y: travelY }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -travelY / 2 }}
                    transition={transition}
                  >
                    {rangeContent.metrics.map((card, index) => (
                      <DashboardMetricCard
                        key={card.eyebrow}
                        card={card}
                        delay={0.06 + index * 0.06}
                        hoverLift={hoverLift}
                        tapPress={tapPress}
                        travelY={travelY}
                        transition={transition}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: travelY }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: transition.duration ? 0.24 : 0 }}
                >
                  <Card className="rounded-[2rem] border-transparent bg-white p-6 shadow-[0_28px_60px_rgba(22,48,43,0.08)]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${sectionKey}-chart-copy`}
                            initial={{ opacity: 0, y: travelY }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -travelY / 2 }}
                            transition={transition}
                          >
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7a6c5b]">
                              {rangeContent.chart.eyebrow}
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#16302b] md:text-[2rem]">
                              {rangeContent.chart.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#6f665b]">
                              {rangeContent.chart.description}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <LayoutGroup id="palabooks-range-chips">
                        <div className="flex flex-wrap gap-2">
                          {rangeOptions.map((option) => (
                            <RangeChip
                              key={option.key}
                              active={option.key === activeRange}
                              label={option.label}
                              hoverLift={hoverLift}
                              tapPress={tapPress}
                              onClick={() =>
                                startTransition(() => setActiveRange(option.key))
                              }
                            />
                          ))}
                        </div>
                      </LayoutGroup>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${sectionKey}-chart-block`}
                        className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]"
                        initial={{ opacity: 0, y: travelY }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -travelY / 2 }}
                        transition={transition}
                      >
                        <div>
                          <AnimatePresence mode="wait" initial={false}>
                            <TrendAreaChart
                              chartKey={`${sectionKey}-chart`}
                              data={rangeContent.chart}
                              travelY={travelY}
                              transition={transition}
                            />
                          </AnimatePresence>

                          <motion.div
                            className="mt-4 flex flex-wrap gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ...transition, delay: transition.duration ? 0.1 : 0 }}
                          >
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#f6efe7] px-3 py-2 text-sm text-[#4d4137]">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#390517]" />
                              {rangeContent.chart.legendPrimary}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#f6efe7] px-3 py-2 text-sm text-[#4d4137]">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#a38560]" />
                              {rangeContent.chart.legendSecondary}
                            </span>
                          </motion.div>
                        </div>

                        <div className="space-y-4">
                          <motion.div whileHover={hoverLift} whileTap={tapPress}>
                            <div className="rounded-[1.6rem] bg-[#f4ede6] p-4">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7a6c5b]">
                                {rangeContent.queue.eyebrow}
                              </p>
                              <div className="mt-4 space-y-3">
                                {rangeContent.queue.items.map((item, index) => (
                                  <motion.div
                                    key={item.label}
                                    className="rounded-[1.2rem] bg-white px-4 py-3 shadow-[0_12px_22px_rgba(0,0,0,0.04)]"
                                    initial={{ opacity: 0, y: travelY / 2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      ...transition,
                                      delay: transition.duration ? 0.08 + index * 0.05 : 0,
                                    }}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="text-sm font-semibold text-[#16302b]">
                                          {item.label}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#786f64]">
                                          {item.meta}
                                        </p>
                                      </div>
                                      <span className="text-xs font-semibold text-[#5f0a2c]">
                                        {item.value}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>

                          <motion.div whileHover={hoverLift} whileTap={tapPress}>
                            <div className="rounded-[1.6rem] bg-[#16302b] p-4 text-white">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#d5c3ad]">
                                {rangeContent.support.eyebrow}
                              </p>
                              <div className="mt-4 space-y-3">
                                {rangeContent.support.items.map((item, index) => (
                                  <div key={item.label} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-white/72">{item.label}</span>
                                      <span className="font-semibold text-white">
                                        {item.value}
                                      </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                      <motion.div
                                        className="h-2 rounded-full bg-[#a38560]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        transition={{
                                          duration: prefersReducedMotion ? 0 : 0.45,
                                          delay: prefersReducedMotion ? 0 : 0.12 + index * 0.05,
                                          ease: [0.22, 1, 0.36, 1],
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Card>
                </motion.div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${sectionKey}-bottom`}
                    className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
                    initial={{ opacity: 0, y: travelY }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -travelY / 2 }}
                    transition={transition}
                  >
                    <motion.div whileHover={hoverLift} whileTap={tapPress}>
                      <Card className="rounded-[1.9rem] border-transparent bg-[#f4ede6] p-5 shadow-[0_24px_48px_rgba(22,48,43,0.08)]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7a6c5b]">
                              {rangeContent.genres.eyebrow}
                            </p>
                            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#16302b]">
                              {rangeContent.genres.title}
                            </h3>
                          </div>
                          <Sparkles className="h-5 w-5 text-[#a38560]" />
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {rangeContent.genres.items.map((genre, index) => (
                            <motion.div
                              key={genre.label}
                              className="rounded-[1.35rem] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.04)]"
                              initial={{ opacity: 0, y: travelY / 2 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                ...transition,
                                delay: transition.duration ? 0.06 + index * 0.04 : 0,
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: genre.color }}
                                  />
                                  <span className="font-medium text-[#16302b]">
                                    {genre.label}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-[#5d5044]">
                                  {genre.value}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={hoverLift} whileTap={tapPress}>
                      <Card className="rounded-[1.9rem] border-transparent bg-[#390517] p-5 text-white shadow-[0_24px_48px_rgba(57,5,23,0.16)]">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#e5cfc0]">
                          {rangeContent.recommendation.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                          {rangeContent.recommendation.title}
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-white/78">
                          {rangeContent.recommendation.body}
                        </p>

                        <motion.div
                          className="mt-6 rounded-[1.4rem] bg-white/10 p-4"
                          initial={{ opacity: 0, y: travelY / 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...transition, delay: transition.duration ? 0.12 : 0 }}
                        >
                          <p className="text-xs uppercase tracking-[0.18em] text-white/56">
                            {rangeContent.recommendation.impactLabel}
                          </p>
                          <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                            {rangeContent.recommendation.impactValue}
                          </p>
                          <p className="mt-2 text-sm text-white/74">
                            {rangeContent.recommendation.impactBody}
                          </p>
                        </motion.div>
                      </Card>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </MotionConfig>
  )
}
