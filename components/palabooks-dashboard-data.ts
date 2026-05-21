export type SectionKey =
  | "overview"
  | "inventory"
  | "members"
  | "circulation"
  | "reports"
  | "settings"

export type RangeKey = "week" | "month" | "semester"

export type MetricCardData = {
  eyebrow: string
  value: string
  detail: string
  note: string
  surfaceClass: string
  textClass: string
  trend: string
  bars: number[]
  markers?: string[]
}

export type QueueItem = {
  label: string
  value: string
  meta: string
}

export type SupportItem = {
  label: string
  value: string
  progress: number
}

export type GenreItem = {
  label: string
  value: string
  color: string
}

export type ChartData = {
  eyebrow: string
  title: string
  description: string
  labels: string[]
  primary: number[]
  secondary: number[]
  legendPrimary: string
  legendSecondary: string
}

export type RangeContent = {
  metrics: MetricCardData[]
  chart: ChartData
  queue: {
    eyebrow: string
    items: QueueItem[]
  }
  support: {
    eyebrow: string
    items: SupportItem[]
  }
  genres: {
    eyebrow: string
    title: string
    items: GenreItem[]
  }
  recommendation: {
    eyebrow: string
    title: string
    body: string
    impactLabel: string
    impactValue: string
    impactBody: string
  }
}

export type SectionContent = {
  header: {
    eyebrow: string
    title: string
    description: string
  }
  sidebar: {
    eyebrow: string
    title: string
    body: string
    stats: Array<{ label: string; value: string }>
    footer: {
      title: string
      meta: string
    }
  }
  ranges: Record<RangeKey, RangeContent>
}

export const primaryDot = "#390517"
export const secondaryDot = "#A38560"
export const accentDot = "#16302b"
export const mutedDot = "#dccfc2"

const labels: Record<RangeKey, string[]> = {
  week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  month: ["W1", "W2", "W3", "W4", "W5", "W6"],
  semester: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
}

function tone(t: "tan" | "burgundy" | "fog") {
  if (t === "tan") {
    return { surfaceClass: "bg-[#a38560]", textClass: "text-white" }
  }

  if (t === "burgundy") {
    return { surfaceClass: "bg-[#390517]", textClass: "text-white" }
  }

  return { surfaceClass: "bg-[#d6c8b8]", textClass: "text-[#16302b]" }
}

function m(
  eyebrow: string,
  value: string,
  detail: string,
  note: string,
  trend: string,
  t: "tan" | "burgundy" | "fog",
  bars: number[],
  markers?: string[]
): MetricCardData {
  return { eyebrow, value, detail, note, trend, bars, markers, ...tone(t) }
}

export const rangeOptions: Array<{ key: RangeKey; label: string }> = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "semester", label: "Semester" },
]

export const dashboardContent = {} as Record<SectionKey, SectionContent>

Object.assign(dashboardContent, {
  overview: {
    header: {
      eyebrow: "Circulation overview",
      title: "Good evening, Jenelyn.",
      description: "Borrowing, returns, and shelf readiness in one calm view.",
    },
    sidebar: {
      eyebrow: "Today at a glance",
      title: "Afternoon demand is still running hot.",
      body: "Fiction and research shelves are carrying most of the pressure.",
      stats: [
        { label: "Open tasks", value: "19" },
        { label: "Due in 24h", value: "31" },
      ],
      footer: {
        title: "Closing checklist",
        meta: "Ready at 7:45 PM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Borrowed today", "148", "45 requests cleared early.", "Peak demand still sits after lunch.", "+12%", "tan", [48, 66, 80, 62, 84, 96]),
          m("Returns pending", "23", "6 titles still need manual desk review.", "Turnaround is down to 3h 12m.", "-8%", "burgundy", [86, 74, 68, 54, 44, 38]),
          m("Shelf health", "98%", "Core shelves are staying above target.", "Only 3 aisles need a final sweep.", "+4%", "fog", [40, 44, 56, 72, 78, 90], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Activity trend",
          title: "Borrowing is holding above the weekly baseline.",
          description: "The demand curve remains healthy enough to keep restocking manageable.",
          labels: labels.week,
          primary: [58, 72, 78, 75, 96, 108],
          secondary: [46, 57, 63, 68, 79, 85],
          legendPrimary: "Same-day loans",
          legendSecondary: "Processed returns",
        },
        queue: {
          eyebrow: "Queue snapshot",
          items: [
            { label: "Catalog updates", value: "12 titles", meta: "Metadata sync lands at 4:30 PM." },
            { label: "Membership approvals", value: "8 requests", meta: "2 still need manual review." },
            { label: "Overdue follow-up", value: "31 members", meta: "Reminder batch is ready tonight." },
          ],
        },
        support: {
          eyebrow: "Shelf utilization",
          items: [
            { label: "Mon", value: "92%", progress: 92 },
            { label: "Tue", value: "84%", progress: 84 },
            { label: "Wed", value: "88%", progress: 88 },
            { label: "Thu", value: "79%", progress: 79 },
            { label: "Fri", value: "96%", progress: 96 },
          ],
        },
        genres: {
          eyebrow: "Top genres",
          title: "Core demand still stays surprisingly balanced.",
          items: [
            { label: "Fiction", value: "34%", color: primaryDot },
            { label: "Research", value: "28%", color: secondaryDot },
            { label: "Reference", value: "22%", color: accentDot },
            { label: "Periodicals", value: "16%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Extend Friday staffing by 30 minutes.",
          body: "Late borrowing keeps showing up after the desk should already be tapering down.",
          impactLabel: "Expected impact",
          impactValue: "17% faster",
          impactBody: "return processing during the Friday rush.",
        },
      },
      month: {
        metrics: [
          m("Loans this month", "2.8k", "Borrowing stayed above the rolling target.", "Three weeks closed above baseline.", "+9%", "tan", [56, 70, 82, 88, 94, 102]),
          m("Returns cleared", "2.5k", "Desk recovery kept pace with inflow.", "Only one weekend created visible drag.", "+6%", "burgundy", [52, 58, 71, 77, 83, 96]),
          m("Collection uptime", "97.6%", "Availability remains very stable.", "Reference and fiction are the strongest shelves.", "+2%", "fog", [44, 48, 54, 68, 74, 80], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Monthly rhythm",
          title: "Borrowing and returns stayed tightly coupled.",
          description: "The month moved steadily without one disruptive spike.",
          labels: labels.month,
          primary: [68, 73, 79, 86, 95, 104],
          secondary: [60, 66, 72, 78, 84, 92],
          legendPrimary: "Loans issued",
          legendSecondary: "Returns processed",
        },
        queue: {
          eyebrow: "Queue snapshot",
          items: [
            { label: "Exception handling", value: "14 cases", meta: "Damage checks clustered in week four." },
            { label: "Vendor receiving", value: "26 copies", meta: "New arrivals land tomorrow morning." },
            { label: "Policy reminders", value: "3 batches", meta: "Reminder pacing is on track." },
          ],
        },
        support: {
          eyebrow: "Shelf utilization",
          items: [
            { label: "Wk 1", value: "78%", progress: 78 },
            { label: "Wk 2", value: "83%", progress: 83 },
            { label: "Wk 3", value: "89%", progress: 89 },
            { label: "Wk 4", value: "91%", progress: 91 },
            { label: "Wk 5", value: "87%", progress: 87 },
          ],
        },
        genres: {
          eyebrow: "Top genres",
          title: "The month still leans toward practical reading.",
          items: [
            { label: "Fiction", value: "31%", color: primaryDot },
            { label: "Research", value: "27%", color: secondaryDot },
            { label: "Professional", value: "24%", color: accentDot },
            { label: "Reference", value: "18%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Move end-of-month reminders 24 hours earlier.",
          body: "Earlier reminders would smooth the final-week desk spike.",
          impactLabel: "Expected impact",
          impactValue: "11% lower",
          impactBody: "queue pressure in the last week.",
        },
      },
      semester: {
        metrics: [
          m("Semester loans", "18.4k", "Usage stayed strong through finals.", "Demand never fell below the planning floor.", "+14%", "tan", [60, 72, 84, 96, 108, 116]),
          m("Processed returns", "17.1k", "Recovery held through the term.", "October staffing changes helped most.", "+10%", "burgundy", [58, 69, 77, 86, 98, 108]),
          m("Availability score", "96.9%", "Access stayed resilient all term.", "Only two shelves dipped below target.", "+3%", "fog", [42, 47, 56, 64, 73, 78], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Semester trend",
          title: "Demand expanded steadily into finals season.",
          description: "Borrowing outpaced returns without producing a damaging backlog.",
          labels: labels.semester,
          primary: [54, 61, 72, 84, 98, 112],
          secondary: [46, 55, 63, 74, 86, 101],
          legendPrimary: "Borrowing volume",
          legendSecondary: "Returned volume",
        },
        queue: {
          eyebrow: "Queue snapshot",
          items: [
            { label: "Archive prep", value: "4 shelves", meta: "Semester-end boxing starts next week." },
            { label: "High-demand titles", value: "37 copies", meta: "Review materials are leading repeats." },
            { label: "Exception review", value: "9 cases", meta: "These can close before break." },
          ],
        },
        support: {
          eyebrow: "Shelf utilization",
          items: [
            { label: "Aug", value: "68%", progress: 68 },
            { label: "Sep", value: "74%", progress: 74 },
            { label: "Oct", value: "81%", progress: 81 },
            { label: "Nov", value: "89%", progress: 89 },
            { label: "Dec", value: "94%", progress: 94 },
          ],
        },
        genres: {
          eyebrow: "Top genres",
          title: "Academic demand overtook fiction by finals.",
          items: [
            { label: "Research", value: "33%", color: secondaryDot },
            { label: "Reviewers", value: "24%", color: primaryDot },
            { label: "Fiction", value: "23%", color: accentDot },
            { label: "Reference", value: "20%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Stage finals reserves one week earlier.",
          body: "The same shelves get hit every term, and they need earlier protection.",
          impactLabel: "Expected impact",
          impactValue: "13% higher",
          impactBody: "availability for priority titles in finals week.",
        },
      },
    },
  },
})

Object.assign(dashboardContent, {
  inventory: {
    header: {
      eyebrow: "Inventory command",
      title: "Collection health is steady, but restock pressure is shifting.",
      description: "Inventory focus keeps stock, intake, and aisle readiness in one flow.",
    },
    sidebar: {
      eyebrow: "Inventory focus",
      title: "Research and reference still need the most attention.",
      body: "Barcode intake is stable, but reorder pressure keeps clustering in the same aisles.",
      stats: [
        { label: "Low stock", value: "14" },
        { label: "Inbound titles", value: "38" },
      ],
      footer: {
        title: "Restock prep",
        meta: "Receiving opens at 8:30 AM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Titles processed", "186", "Weekly cataloging stayed above target.", "Research shelves drove most intake.", "+7%", "tan", [42, 52, 64, 72, 86, 92]),
          m("Low-stock alerts", "14", "Reference and law shelves lead the alerts.", "Pressure is clustered, not widespread.", "+3%", "burgundy", [30, 34, 40, 48, 58, 68]),
          m("Catalog accuracy", "99.1%", "Mismatch fixes stayed very low.", "Receiving is catching issues early.", "+1%", "fog", [44, 50, 54, 58, 66, 74], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Inventory movement",
          title: "Restock velocity is strongest where demand already peaks.",
          description: "New intake and shelf recovery are still staying close enough together.",
          labels: labels.week,
          primary: [34, 42, 55, 66, 75, 88],
          secondary: [28, 36, 46, 57, 62, 70],
          legendPrimary: "New barcodes",
          legendSecondary: "Restocked copies",
        },
        queue: {
          eyebrow: "Catalog queue",
          items: [
            { label: "Metadata review", value: "9 titles", meta: "Publisher fields need cleanup." },
            { label: "Receiving handoff", value: "22 copies", meta: "Aisle B and D are ready to shelf." },
            { label: "Replacement requests", value: "6 items", meta: "Most are worn reference copies." },
          ],
        },
        support: {
          eyebrow: "Aisle readiness",
          items: [
            { label: "Aisle A", value: "88%", progress: 88 },
            { label: "Aisle B", value: "73%", progress: 73 },
            { label: "Aisle C", value: "91%", progress: 91 },
            { label: "Aisle D", value: "69%", progress: 69 },
            { label: "Aisle E", value: "84%", progress: 84 },
          ],
        },
        genres: {
          eyebrow: "Restock pressure",
          title: "Practical shelves drive most of the replacement work.",
          items: [
            { label: "Research", value: "30%", color: secondaryDot },
            { label: "Reference", value: "26%", color: accentDot },
            { label: "Professional", value: "24%", color: primaryDot },
            { label: "Fiction", value: "20%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Batch restocks by aisle, not by receipt.",
          body: "Floor-based recovery would shorten the time between intake and shelf availability.",
          impactLabel: "Expected impact",
          impactValue: "15% faster",
          impactBody: "restock completion on high-demand aisles.",
        },
      },
      month: {
        metrics: [
          m("Titles cataloged", "742", "Monthly intake stayed above forecast.", "Professional references led additions.", "+10%", "tan", [54, 60, 72, 81, 90, 100]),
          m("Reorder requests", "58", "Requests are still clustered in practical shelves.", "Research demand is leading repeats.", "+6%", "burgundy", [36, 42, 48, 57, 66, 74]),
          m("Receiving accuracy", "98.8%", "Cleanup stayed low even at volume.", "Barcode prep is preventing duplicates.", "+2%", "fog", [42, 48, 56, 60, 68, 76], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Inventory rhythm",
          title: "Receiving and shelf recovery stayed balanced this month.",
          description: "Restock trailed intake slightly late in the cycle, but stayed inside tolerance.",
          labels: labels.month,
          primary: [44, 53, 62, 72, 84, 95],
          secondary: [38, 47, 58, 65, 74, 86],
          legendPrimary: "Inbound titles",
          legendSecondary: "Recovered stock",
        },
        queue: {
          eyebrow: "Catalog queue",
          items: [
            { label: "Shelf map updates", value: "4 zones", meta: "Reference shifts still need signage." },
            { label: "Binding replacements", value: "17 copies", meta: "Review materials lead the list." },
            { label: "Acquisition review", value: "12 proposals", meta: "Selection review is tomorrow." },
          ],
        },
        support: {
          eyebrow: "Aisle readiness",
          items: [
            { label: "Wk 1", value: "81%", progress: 81 },
            { label: "Wk 2", value: "85%", progress: 85 },
            { label: "Wk 3", value: "87%", progress: 87 },
            { label: "Wk 4", value: "79%", progress: 79 },
            { label: "Wk 5", value: "83%", progress: 83 },
          ],
        },
        genres: {
          eyebrow: "Restock pressure",
          title: "Reference and professional stock led the monthly mix.",
          items: [
            { label: "Reference", value: "29%", color: accentDot },
            { label: "Professional", value: "26%", color: primaryDot },
            { label: "Research", value: "25%", color: secondaryDot },
            { label: "Fiction", value: "20%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Pre-allocate barcode prep for repeat deliveries.",
          body: "Recurring shipments are predictable enough to prep ahead of time.",
          impactLabel: "Expected impact",
          impactValue: "12% faster",
          impactBody: "receiving-to-shelf turnaround each month.",
        },
      },
      semester: {
        metrics: [
          m("Titles added", "4.3k", "Semester acquisitions kept pace with demand.", "Academic priorities led the adds.", "+18%", "tan", [58, 68, 78, 88, 102, 116]),
          m("Low-stock incidents", "219", "Pressure spiked around review materials.", "Alerts stayed targeted, not chaotic.", "+9%", "burgundy", [38, 48, 58, 67, 79, 90]),
          m("Catalog confidence", "98.4%", "Volume introduced very few regressions.", "Checks held through peak intake.", "+2%", "fog", [40, 44, 53, 59, 66, 72], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Semester movement",
          title: "Inventory pressure rose gradually with the academic term.",
          description: "Restock work stayed close enough behind intake to keep shelves stable.",
          labels: labels.semester,
          primary: [39, 47, 58, 71, 88, 104],
          secondary: [32, 41, 50, 63, 79, 95],
          legendPrimary: "Intake volume",
          legendSecondary: "Restock recovery",
        },
        queue: {
          eyebrow: "Catalog queue",
          items: [
            { label: "Archive migration", value: "3 collections", meta: "Semester-end archiving starts soon." },
            { label: "Condition review", value: "28 copies", meta: "Wear checks focus on review titles." },
            { label: "Replacement planning", value: "16 requests", meta: "Prioritize academic copies first." },
          ],
        },
        support: {
          eyebrow: "Aisle readiness",
          items: [
            { label: "Aug", value: "72%", progress: 72 },
            { label: "Sep", value: "77%", progress: 77 },
            { label: "Oct", value: "82%", progress: 82 },
            { label: "Nov", value: "86%", progress: 86 },
            { label: "Dec", value: "79%", progress: 79 },
          ],
        },
        genres: {
          eyebrow: "Restock pressure",
          title: "Academic shelves drew the most semester attention.",
          items: [
            { label: "Research", value: "31%", color: secondaryDot },
            { label: "Reviewers", value: "24%", color: primaryDot },
            { label: "Reference", value: "24%", color: accentDot },
            { label: "Professional", value: "21%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Protect finals-period stock with an early reserve window.",
          body: "A short reserve window would reduce emergency replacement work.",
          impactLabel: "Expected impact",
          impactValue: "19% fewer",
          impactBody: "low-stock incidents during finals season.",
        },
      },
    },
  },
  members: {
    header: {
      eyebrow: "Member activity",
      title: "Borrower engagement is healthy, but renewals are bunching.",
      description: "Accounts, renewals, and support demand in one member-focused view.",
    },
    sidebar: {
      eyebrow: "Member focus",
      title: "Renewals keep arriving in the same tight window.",
      body: "New signups remain strong, but late-day renewal demand still bunches.",
      stats: [
        { label: "New signups", value: "27" },
        { label: "Renewals", value: "43" },
      ],
      footer: {
        title: "Reminder batch",
        meta: "Next send at 6:15 PM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Active borrowers", "642", "Usage stayed ahead of forecast.", "Follow-up kept engagement from dipping.", "+8%", "tan", [46, 57, 69, 74, 83, 92]),
          m("Renewal requests", "118", "Most renewals hit late in the day.", "The desk is still clearing them on time.", "+11%", "burgundy", [40, 44, 50, 62, 70, 82]),
          m("Profile completion", "96%", "New accounts are arriving cleaner.", "Staff intervention is dropping.", "+3%", "fog", [42, 48, 56, 60, 69, 74], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Member rhythm",
          title: "Borrower activity held while renewals rose late-week.",
          description: "The member curve is still strong enough to keep retention healthy.",
          labels: labels.week,
          primary: [51, 58, 67, 74, 86, 93],
          secondary: [34, 39, 44, 55, 64, 78],
          legendPrimary: "Active borrowers",
          legendSecondary: "Completed renewals",
        },
        queue: {
          eyebrow: "Member support",
          items: [
            { label: "Manual verifications", value: "7 accounts", meta: "Address mismatches are the main blocker." },
            { label: "Renewal follow-up", value: "15 members", meta: "Fee confirmation is still pending." },
            { label: "Welcome outreach", value: "12 messages", meta: "New borrowers get the next batch." },
          ],
        },
        support: {
          eyebrow: "Engagement cadence",
          items: [
            { label: "Mon", value: "76%", progress: 76 },
            { label: "Tue", value: "82%", progress: 82 },
            { label: "Wed", value: "79%", progress: 79 },
            { label: "Thu", value: "88%", progress: 88 },
            { label: "Fri", value: "91%", progress: 91 },
          ],
        },
        genres: {
          eyebrow: "Member segments",
          title: "Core usage still comes from a few reliable cohorts.",
          items: [
            { label: "Frequent", value: "37%", color: primaryDot },
            { label: "Returning", value: "29%", color: secondaryDot },
            { label: "New", value: "19%", color: accentDot },
            { label: "Dormant", value: "15%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Trigger renewal reminders one hour earlier.",
          body: "Earlier reminders would spread the service spike more evenly.",
          impactLabel: "Expected impact",
          impactValue: "14% smoother",
          impactBody: "renewal distribution on busy weekdays.",
        },
      },
      month: {
        metrics: [
          m("Monthly borrowers", "2.3k", "Usage stayed above the last cycle.", "Returning borrowers still drive the most volume.", "+9%", "tan", [54, 62, 73, 78, 87, 95]),
          m("Renewals completed", "486", "Completion stayed strong despite clusters.", "Only one batch spilled into the next day.", "+7%", "burgundy", [42, 48, 58, 66, 74, 85]),
          m("Profile quality", "97.2%", "Onboarding data stayed clean this month.", "Manual edits fell again.", "+2%", "fog", [43, 47, 52, 61, 68, 76], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Member rhythm",
          title: "Borrower activity remained durable all month.",
          description: "Borrowing and renewals are rising together, not drifting apart.",
          labels: labels.month,
          primary: [49, 58, 67, 76, 88, 97],
          secondary: [37, 45, 54, 63, 73, 84],
          legendPrimary: "Borrower activity",
          legendSecondary: "Renewals closed",
        },
        queue: {
          eyebrow: "Member support",
          items: [
            { label: "Account cleanups", value: "18 profiles", meta: "Legacy address formatting leads the fixes." },
            { label: "Fee clarifications", value: "22 requests", meta: "Clearer messaging already helped." },
            { label: "Dormant outreach", value: "41 members", meta: "The next win-back batch is ready." },
          ],
        },
        support: {
          eyebrow: "Engagement cadence",
          items: [
            { label: "Wk 1", value: "71%", progress: 71 },
            { label: "Wk 2", value: "77%", progress: 77 },
            { label: "Wk 3", value: "84%", progress: 84 },
            { label: "Wk 4", value: "88%", progress: 88 },
            { label: "Wk 5", value: "82%", progress: 82 },
          ],
        },
        genres: {
          eyebrow: "Member segments",
          title: "Returning and frequent members still anchor demand.",
          items: [
            { label: "Frequent", value: "35%", color: primaryDot },
            { label: "Returning", value: "31%", color: secondaryDot },
            { label: "New", value: "20%", color: accentDot },
            { label: "Dormant", value: "14%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Bundle welcome prompts into the first checkout.",
          body: "That would improve first-month completion without adding email noise.",
          impactLabel: "Expected impact",
          impactValue: "9% better",
          impactBody: "first-month profile completion.",
        },
      },
      semester: {
        metrics: [
          m("Semester borrowers", "8.7k", "Borrower activity expanded all term.", "Retention stayed strongest in academic cohorts.", "+15%", "tan", [58, 66, 75, 88, 100, 112]),
          m("Renewals closed", "1.9k", "The desk absorbed renewals without major drift.", "Automated prompts removed manual work.", "+12%", "burgundy", [44, 52, 61, 70, 81, 92]),
          m("Trust score", "97.8%", "Member records stayed reliable at scale.", "ID mismatches remained low all term.", "+2%", "fog", [44, 49, 55, 62, 69, 77], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Semester rhythm",
          title: "Borrower demand expanded gradually through the term.",
          description: "Engagement and renewals grew together, which is the healthy signal.",
          labels: labels.semester,
          primary: [45, 54, 66, 78, 92, 108],
          secondary: [34, 42, 53, 66, 79, 94],
          legendPrimary: "Member activity",
          legendSecondary: "Renewals closed",
        },
        queue: {
          eyebrow: "Member support",
          items: [
            { label: "Graduating members", value: "63 accounts", meta: "Exit reminders are queued before break." },
            { label: "Account exceptions", value: "11 cases", meta: "Most are stale contact details." },
            { label: "Retention outreach", value: "52 members", meta: "Reactivation list is ready for review." },
          ],
        },
        support: {
          eyebrow: "Engagement cadence",
          items: [
            { label: "Aug", value: "68%", progress: 68 },
            { label: "Sep", value: "74%", progress: 74 },
            { label: "Oct", value: "80%", progress: 80 },
            { label: "Nov", value: "87%", progress: 87 },
            { label: "Dec", value: "92%", progress: 92 },
          ],
        },
        genres: {
          eyebrow: "Member segments",
          title: "The term skewed toward returning power users.",
          items: [
            { label: "Returning", value: "34%", color: secondaryDot },
            { label: "Frequent", value: "32%", color: primaryDot },
            { label: "New", value: "18%", color: accentDot },
            { label: "Dormant", value: "16%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Split semester-end reminders into two cohorts.",
          body: "That would let staff answer the highest-risk members first.",
          impactLabel: "Expected impact",
          impactValue: "16% lower",
          impactBody: "support congestion at term end.",
        },
      },
    },
  },
})

Object.assign(dashboardContent, {
  circulation: {
    header: {
      eyebrow: "Circulation flow",
      title: "Desk throughput is healthy, but hold demand is rising.",
      description: "Desk movement, holds, and handoff speed in one place.",
    },
    sidebar: {
      eyebrow: "Desk focus",
      title: "Hold demand is starting earlier than usual.",
      body: "The desk is clearing returns well, but holds are arriving before the usual rush.",
      stats: [
        { label: "Hold requests", value: "29" },
        { label: "Desk SLA", value: "96%" },
      ],
      footer: {
        title: "Desk handoff",
        meta: "Shift overlap starts at 5:30 PM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Loans issued", "911", "Weekly front-desk output stayed consistent.", "Borrowing never outpaced the desk.", "+10%", "tan", [48, 58, 67, 74, 88, 96]),
          m("Returns cleared", "867", "Return recovery stayed close behind issues.", "Only one afternoon created a visible pileup.", "+8%", "burgundy", [42, 50, 61, 69, 79, 89]),
          m("Hold fulfillment", "94%", "Most holds were filled on time.", "Rush-hour holds still miss the most often.", "+5%", "fog", [40, 46, 51, 61, 68, 76], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Desk movement",
          title: "Issued loans stayed ahead while returns kept pace.",
          description: "The two curves stay close enough to protect desk quality.",
          labels: labels.week,
          primary: [53, 60, 72, 79, 90, 99],
          secondary: [46, 54, 64, 70, 81, 90],
          legendPrimary: "Loans issued",
          legendSecondary: "Returns cleared",
        },
        queue: {
          eyebrow: "Desk queue",
          items: [
            { label: "Hold staging", value: "29 requests", meta: "Most were placed before 4:00 PM." },
            { label: "Exception returns", value: "11 items", meta: "Damage checks cause most delays." },
            { label: "Pickup reminders", value: "14 notices", meta: "The next reminder batch is ready." },
          ],
        },
        support: {
          eyebrow: "Desk throughput",
          items: [
            { label: "Mon", value: "84%", progress: 84 },
            { label: "Tue", value: "86%", progress: 86 },
            { label: "Wed", value: "89%", progress: 89 },
            { label: "Thu", value: "91%", progress: 91 },
            { label: "Fri", value: "95%", progress: 95 },
          ],
        },
        genres: {
          eyebrow: "Rush categories",
          title: "High-demand titles are still clustered in a few shelves.",
          items: [
            { label: "Fiction", value: "29%", color: primaryDot },
            { label: "Research", value: "28%", color: secondaryDot },
            { label: "Reference", value: "24%", color: accentDot },
            { label: "Reviewers", value: "19%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Stage hold pickups in two desk waves.",
          body: "Splitting hold prep would reduce congestion during the rush.",
          impactLabel: "Expected impact",
          impactValue: "12% faster",
          impactBody: "hold fulfillment during busy periods.",
        },
      },
      month: {
        metrics: [
          m("Loans issued", "3.6k", "Monthly desk output stayed above forecast.", "Demand built steadily, not chaotically.", "+11%", "tan", [54, 62, 73, 81, 92, 104]),
          m("Returns cleared", "3.3k", "Return clearance stayed within SLA.", "Only the final wave created lag.", "+9%", "burgundy", [47, 55, 64, 73, 84, 93]),
          m("Hold fill rate", "95.4%", "Fulfillment stayed reliable at higher traffic.", "Late-day holds still miss most often.", "+4%", "fog", [42, 48, 54, 61, 70, 79], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Desk movement",
          title: "Monthly circulation held shape even as holds climbed.",
          description: "Issue and clearance volume rose together in a healthy way.",
          labels: labels.month,
          primary: [58, 66, 74, 82, 91, 102],
          secondary: [50, 58, 67, 74, 82, 92],
          legendPrimary: "Loans issued",
          legendSecondary: "Returns cleared",
        },
        queue: {
          eyebrow: "Desk queue",
          items: [
            { label: "Pickup expiries", value: "17 holds", meta: "Most expiries happened in the last week." },
            { label: "Desk exceptions", value: "24 items", meta: "Manual checks stayed low overall." },
            { label: "Rush reminders", value: "5 batches", meta: "Timed reminders softened the final spike." },
          ],
        },
        support: {
          eyebrow: "Desk throughput",
          items: [
            { label: "Wk 1", value: "81%", progress: 81 },
            { label: "Wk 2", value: "85%", progress: 85 },
            { label: "Wk 3", value: "88%", progress: 88 },
            { label: "Wk 4", value: "92%", progress: 92 },
            { label: "Wk 5", value: "89%", progress: 89 },
          ],
        },
        genres: {
          eyebrow: "Rush categories",
          title: "Rush behavior stayed centered on practical shelves.",
          items: [
            { label: "Research", value: "30%", color: secondaryDot },
            { label: "Fiction", value: "27%", color: primaryDot },
            { label: "Reference", value: "24%", color: accentDot },
            { label: "Professional", value: "19%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Add one pre-close hold reminder.",
          body: "A final reminder would convert more staged holds before expiry.",
          impactLabel: "Expected impact",
          impactValue: "8% higher",
          impactBody: "same-day hold pickup completion.",
        },
      },
      semester: {
        metrics: [
          m("Loans issued", "22.1k", "Semester issue volume expanded with the term.", "The desk handled growth without a major dip.", "+16%", "tan", [60, 70, 80, 92, 106, 118]),
          m("Returns cleared", "20.8k", "Return recovery improved with staffing rhythm.", "The widest gap only appeared during finals.", "+13%", "burgundy", [52, 61, 71, 82, 96, 108]),
          m("Hold fill rate", "95.9%", "Desk fulfillment stayed reliable all term.", "Late-day holds still account for most misses.", "+5%", "fog", [42, 47, 55, 63, 71, 80], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Semester movement",
          title: "Circulation rose without overwhelming desk recovery.",
          description: "The desk stayed responsive even during finals-heavy traffic.",
          labels: labels.semester,
          primary: [56, 64, 75, 88, 101, 115],
          secondary: [48, 55, 66, 77, 91, 104],
          legendPrimary: "Loans issued",
          legendSecondary: "Returns cleared",
        },
        queue: {
          eyebrow: "Desk queue",
          items: [
            { label: "Semester holds", value: "63 requests", meta: "Board review materials led the spikes." },
            { label: "Exception returns", value: "31 items", meta: "Most were cleared within a day." },
            { label: "Pickup expiries", value: "42 holds", meta: "Finals timing drove the highest count." },
          ],
        },
        support: {
          eyebrow: "Desk throughput",
          items: [
            { label: "Aug", value: "78%", progress: 78 },
            { label: "Sep", value: "82%", progress: 82 },
            { label: "Oct", value: "86%", progress: 86 },
            { label: "Nov", value: "91%", progress: 91 },
            { label: "Dec", value: "94%", progress: 94 },
          ],
        },
        genres: {
          eyebrow: "Rush categories",
          title: "Academic demand overtook fiction during peak term moments.",
          items: [
            { label: "Research", value: "32%", color: secondaryDot },
            { label: "Reviewers", value: "25%", color: primaryDot },
            { label: "Reference", value: "23%", color: accentDot },
            { label: "Fiction", value: "20%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Create a finals-only express hold shelf.",
          body: "A dedicated shelf would absorb the most predictable rush cleanly.",
          impactLabel: "Expected impact",
          impactValue: "18% faster",
          impactBody: "hold completion during finals demand.",
        },
      },
    },
  },
})

Object.assign(dashboardContent, {
  reports: {
    header: {
      eyebrow: "Reporting layer",
      title: "Reporting usage is climbing with stronger staff adoption.",
      description: "Exports, reviews, and follow-up load in one reporting view.",
    },
    sidebar: {
      eyebrow: "Reporting focus",
      title: "Staff are pulling more exports without losing discipline.",
      body: "The reporting layer is becoming part of the daily workflow now.",
      stats: [
        { label: "Exports today", value: "16" },
        { label: "Pending reviews", value: "7" },
      ],
      footer: {
        title: "Report digest",
        meta: "Next summary sends at 8:00 AM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Exports generated", "61", "Weekly reporting stayed ahead of schedule.", "Operational packs lead the mix.", "+14%", "tan", [40, 48, 58, 69, 79, 88]),
          m("Reviews completed", "47", "Insight review kept up with exports.", "Only a few packs still need signoff.", "+10%", "burgundy", [34, 41, 50, 58, 68, 78]),
          m("Data confidence", "99.3%", "Validation stayed high across exports.", "Checks caught issues before release.", "+1%", "fog", [44, 50, 55, 60, 67, 74], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Reporting trend",
          title: "Export demand rose while review cadence held.",
          description: "Output is growing without turning into noisy reporting debt.",
          labels: labels.week,
          primary: [39, 46, 55, 67, 76, 85],
          secondary: [31, 37, 45, 52, 61, 72],
          legendPrimary: "Exports generated",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Reporting queue",
          items: [
            { label: "Scheduled digests", value: "5 packs", meta: "Two packs still need notes." },
            { label: "Ad hoc exports", value: "7 requests", meta: "Most are circulation comparisons." },
            { label: "Validation checks", value: "3 runs", meta: "No failed checks remain open." },
          ],
        },
        support: {
          eyebrow: "Review cadence",
          items: [
            { label: "Mon", value: "72%", progress: 72 },
            { label: "Tue", value: "79%", progress: 79 },
            { label: "Wed", value: "81%", progress: 81 },
            { label: "Thu", value: "87%", progress: 87 },
            { label: "Fri", value: "90%", progress: 90 },
          ],
        },
        genres: {
          eyebrow: "Reporting focus",
          title: "Operational packs dominate the weekly reporting mix.",
          items: [
            { label: "Circulation", value: "33%", color: primaryDot },
            { label: "Inventory", value: "27%", color: secondaryDot },
            { label: "Members", value: "22%", color: accentDot },
            { label: "Settings", value: "18%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Auto-stage the top weekly report bundle.",
          body: "That frees staff to interpret the data instead of rebuilding the same pack.",
          impactLabel: "Expected impact",
          impactValue: "21% faster",
          impactBody: "turnaround for recurring weekly reports.",
        },
      },
      month: {
        metrics: [
          m("Exports generated", "238", "Monthly reporting demand expanded.", "Audit and ops packs led the rise.", "+16%", "tan", [48, 57, 66, 74, 85, 97]),
          m("Reviews completed", "204", "Review discipline stayed strong.", "Most overdue packs resolved next cycle.", "+12%", "burgundy", [39, 46, 54, 63, 74, 86]),
          m("Report accuracy", "99.0%", "Validation held under a heavier load.", "Only a small number needed correction.", "+2%", "fog", [43, 47, 54, 61, 67, 75], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Reporting trend",
          title: "Export volume rose without overwhelming reviewers.",
          description: "Adoption is increasing in a stable way, not a chaotic way.",
          labels: labels.month,
          primary: [44, 52, 60, 69, 79, 92],
          secondary: [34, 42, 50, 58, 69, 83],
          legendPrimary: "Exports generated",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Reporting queue",
          items: [
            { label: "Audit packs", value: "8 reports", meta: "Quarter-close context is driving demand." },
            { label: "Custom snapshots", value: "11 requests", meta: "Most relate to staffing decisions." },
            { label: "Validation reruns", value: "4 jobs", meta: "All reruns are back within SLA." },
          ],
        },
        support: {
          eyebrow: "Review cadence",
          items: [
            { label: "Wk 1", value: "74%", progress: 74 },
            { label: "Wk 2", value: "78%", progress: 78 },
            { label: "Wk 3", value: "84%", progress: 84 },
            { label: "Wk 4", value: "89%", progress: 89 },
            { label: "Wk 5", value: "86%", progress: 86 },
          ],
        },
        genres: {
          eyebrow: "Reporting focus",
          title: "Circulation and audit views dominated the month.",
          items: [
            { label: "Circulation", value: "31%", color: primaryDot },
            { label: "Audit", value: "25%", color: secondaryDot },
            { label: "Inventory", value: "24%", color: accentDot },
            { label: "Members", value: "20%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Cache the top monthly report queries before open.",
          body: "Pre-building the heaviest queries would shrink peak wait times.",
          impactLabel: "Expected impact",
          impactValue: "18% faster",
          impactBody: "monthly report generation during peak use.",
        },
      },
      semester: {
        metrics: [
          m("Exports generated", "1.4k", "Semester reporting adoption improved.", "Planning reviews drove the biggest gain.", "+22%", "tan", [54, 64, 74, 85, 98, 112]),
          m("Reviews completed", "1.2k", "Review throughput expanded with demand.", "The backlog stayed controlled all term.", "+17%", "burgundy", [44, 52, 63, 72, 84, 97]),
          m("Data confidence", "98.9%", "Semester reporting stayed reliable.", "Validation caught drift before release.", "+2%", "fog", [44, 50, 56, 61, 68, 75], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "Semester trend",
          title: "Reporting usage grew alongside operational maturity.",
          description: "Teams are using reporting more often without creating noise.",
          labels: labels.semester,
          primary: [42, 49, 59, 72, 88, 103],
          secondary: [33, 40, 49, 61, 75, 91],
          legendPrimary: "Exports generated",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Reporting queue",
          items: [
            { label: "Term-end packs", value: "14 reports", meta: "Leadership reviews cluster in January." },
            { label: "Historical comparisons", value: "9 requests", meta: "Most compare finals performance." },
            { label: "Validation checks", value: "6 jobs", meta: "All packs remain inside threshold." },
          ],
        },
        support: {
          eyebrow: "Review cadence",
          items: [
            { label: "Aug", value: "69%", progress: 69 },
            { label: "Sep", value: "74%", progress: 74 },
            { label: "Oct", value: "80%", progress: 80 },
            { label: "Nov", value: "86%", progress: 86 },
            { label: "Dec", value: "91%", progress: 91 },
          ],
        },
        genres: {
          eyebrow: "Reporting focus",
          title: "Operational and planning views led semester demand.",
          items: [
            { label: "Circulation", value: "29%", color: primaryDot },
            { label: "Planning", value: "26%", color: secondaryDot },
            { label: "Audit", value: "24%", color: accentDot },
            { label: "Inventory", value: "21%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Preset a finals-ready executive dashboard bundle.",
          body: "That would reduce repetitive export work when timing is tightest.",
          impactLabel: "Expected impact",
          impactValue: "24% faster",
          impactBody: "semester-end reporting turnaround.",
        },
      },
    },
  },
  settings: {
    header: {
      eyebrow: "System settings",
      title: "Automation is stable, but policy changes need more visibility.",
      description: "Automations, access reviews, and policy changes in one layer.",
    },
    sidebar: {
      eyebrow: "Settings focus",
      title: "Automation is reliable, but access reviews are stacking up.",
      body: "The system layer is healthy overall, though policy and access changes are bunching together.",
      stats: [
        { label: "Policy edits", value: "6" },
        { label: "Access reviews", value: "13" },
      ],
      footer: {
        title: "Maintenance window",
        meta: "Quiet period begins at 9:30 PM",
      },
    },
    ranges: {
      week: {
        metrics: [
          m("Automation runs", "214", "Weekly jobs completed cleanly.", "Only a few retries were needed.", "+5%", "tan", [44, 50, 61, 70, 78, 88]),
          m("Permission reviews", "13", "Access requests cluster near shift changes.", "Most are waiting on manager confirmation.", "+4%", "burgundy", [28, 31, 36, 44, 52, 61]),
          m("Uptime confidence", "99.7%", "Availability stayed near the ceiling.", "Retries resolved without staff help.", "+1%", "fog", [46, 49, 53, 60, 66, 72], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "System rhythm",
          title: "Automation stayed smooth while review work rose.",
          description: "The platform is calm, but the approval path deserves more room.",
          labels: labels.week,
          primary: [46, 52, 61, 69, 77, 86],
          secondary: [24, 28, 33, 40, 47, 58],
          legendPrimary: "Automation runs",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Settings queue",
          items: [
            { label: "Policy approvals", value: "6 changes", meta: "Three edits still need final sign-off." },
            { label: "Access requests", value: "13 reviews", meta: "Most tie back to coverage shifts." },
            { label: "Retry monitoring", value: "4 jobs", meta: "All retries completed overnight." },
          ],
        },
        support: {
          eyebrow: "System confidence",
          items: [
            { label: "Mon", value: "96%", progress: 96 },
            { label: "Tue", value: "97%", progress: 97 },
            { label: "Wed", value: "98%", progress: 98 },
            { label: "Thu", value: "97%", progress: 97 },
            { label: "Fri", value: "99%", progress: 99 },
          ],
        },
        genres: {
          eyebrow: "Configuration focus",
          title: "Review work still concentrates in access and policy updates.",
          items: [
            { label: "Access", value: "32%", color: primaryDot },
            { label: "Policies", value: "28%", color: secondaryDot },
            { label: "Automations", value: "23%", color: accentDot },
            { label: "Notifications", value: "17%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Move permission reviews away from shift overlap.",
          body: "That would shorten approval times without raising risk.",
          impactLabel: "Expected impact",
          impactValue: "18% faster",
          impactBody: "access review completion on busy days.",
        },
      },
      month: {
        metrics: [
          m("Automation runs", "918", "Monthly automation stayed dependable.", "Only a few flows needed a retry.", "+7%", "tan", [50, 58, 67, 77, 87, 98]),
          m("Policy changes", "24", "Most updates were small and contained.", "The challenge is timing, not complexity.", "+5%", "burgundy", [31, 36, 42, 48, 56, 66]),
          m("System confidence", "99.5%", "The settings layer stayed resilient.", "No change caused a visible regression.", "+1%", "fog", [45, 49, 54, 60, 67, 74], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "System rhythm",
          title: "Automation stayed stable as policy work increased.",
          description: "The operating layer is calm, and review work is still manageable.",
          labels: labels.month,
          primary: [52, 59, 67, 76, 86, 96],
          secondary: [29, 34, 40, 47, 54, 63],
          legendPrimary: "Automation runs",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Settings queue",
          items: [
            { label: "Role cleanups", value: "18 changes", meta: "Legacy mappings are the main target." },
            { label: "Notification tuning", value: "9 rules", meta: "Most reduce duplicate reminder traffic." },
            { label: "Policy sign-off", value: "5 edits", meta: "Monthly changes still need final confirmation." },
          ],
        },
        support: {
          eyebrow: "System confidence",
          items: [
            { label: "Wk 1", value: "96%", progress: 96 },
            { label: "Wk 2", value: "97%", progress: 97 },
            { label: "Wk 3", value: "98%", progress: 98 },
            { label: "Wk 4", value: "98%", progress: 98 },
            { label: "Wk 5", value: "97%", progress: 97 },
          ],
        },
        genres: {
          eyebrow: "Configuration focus",
          title: "Access and policy work continue to lead settings activity.",
          items: [
            { label: "Access", value: "30%", color: primaryDot },
            { label: "Policies", value: "27%", color: secondaryDot },
            { label: "Automations", value: "25%", color: accentDot },
            { label: "Notifications", value: "18%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Group monthly approvals into one guided review pack.",
          body: "A single approval pack would reduce context switching for reviewers.",
          impactLabel: "Expected impact",
          impactValue: "10% fewer",
          impactBody: "approval delays across the month.",
        },
      },
      semester: {
        metrics: [
          m("Automation runs", "5.7k", "Semester automation volume stayed stable.", "Background reliability improved term-long.", "+9%", "tan", [58, 66, 76, 86, 98, 110]),
          m("Access reviews", "94", "Review work expanded with staffing shifts.", "Most approvals still closed on time.", "+8%", "burgundy", [36, 42, 48, 56, 64, 74]),
          m("System confidence", "99.4%", "The platform stayed reliable all term.", "Retries and failed jobs remained very low.", "+1%", "fog", [45, 50, 55, 61, 67, 73], ["#E0E0E0", secondaryDot, primaryDot]),
        ],
        chart: {
          eyebrow: "System rhythm",
          title: "The operating layer stayed calm through the term.",
          description: "Automation scaled with the academic calendar without losing control.",
          labels: labels.semester,
          primary: [55, 62, 70, 80, 92, 106],
          secondary: [30, 36, 42, 50, 60, 70],
          legendPrimary: "Automation runs",
          legendSecondary: "Reviews closed",
        },
        queue: {
          eyebrow: "Settings queue",
          items: [
            { label: "Term-end permissions", value: "21 reviews", meta: "Graduating and seasonal roles drive most changes." },
            { label: "Automation audits", value: "8 checks", meta: "Semester close requires extra verification." },
            { label: "Policy refreshes", value: "11 edits", meta: "Carry these into the pre-term maintenance window." },
          ],
        },
        support: {
          eyebrow: "System confidence",
          items: [
            { label: "Aug", value: "96%", progress: 96 },
            { label: "Sep", value: "97%", progress: 97 },
            { label: "Oct", value: "97%", progress: 97 },
            { label: "Nov", value: "98%", progress: 98 },
            { label: "Dec", value: "99%", progress: 99 },
          ],
        },
        genres: {
          eyebrow: "Configuration focus",
          title: "Long-term settings work stayed concentrated and calm.",
          items: [
            { label: "Access", value: "29%", color: primaryDot },
            { label: "Automations", value: "27%", color: accentDot },
            { label: "Policies", value: "25%", color: secondaryDot },
            { label: "Notifications", value: "19%", color: mutedDot },
          ],
        },
        recommendation: {
          eyebrow: "Recommendation",
          title: "Reserve one quiet maintenance window per term.",
          body: "That would close settings debt before it compounds into cleanup work.",
          impactLabel: "Expected impact",
          impactValue: "22% lower",
          impactBody: "carryover settings debt next term.",
        },
      },
    },
  },
})
