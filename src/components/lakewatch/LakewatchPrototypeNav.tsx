"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const DEMO_SCREENS = [
  {
    id: "ingest",
    label: "1. Ingest",
    href: "/lakewatch/datasources/ingest",
    figma: "728:24097",
  },
  {
    id: "existing",
    label: "1b. Existing",
    href: "/lakewatch/datasources/ingest/existing",
    figma: "728:24314",
  },
  {
    id: "external",
    label: "2. External",
    href: "/lakewatch/datasources/ingest/external",
    figma: "715:54169",
  },
  {
    id: "configure",
    label: "3. Configure",
    href: "/lakewatch/datasources/ingest/external/configure",
    figma: "718:95762",
  },
  {
    id: "bronze",
    label: "4. Bronze",
    href: "/lakewatch/datasources/ingest/external/bronze",
    figma: "718:100065",
  },
  {
    id: "saved",
    label: "5. Saved",
    href: "/lakewatch/datasources/ingest/external/saved",
    figma: "731:26707",
  },
] as const

/** Floating demo navigator for the v4 ingest flow */
export function LakewatchPrototypeNav() {
  const pathname = usePathname()

  const activeIndex = DEMO_SCREENS.findIndex(
    (screen) => pathname === screen.href || pathname === `${screen.href}/`
  )

  return (
    <div
      className={cn(
        "pointer-events-auto fixed bottom-6 left-1/2 z-[100] -translate-x-1/2",
        "rounded-md border border-border bg-background px-1 py-1",
        "shadow-[0_1px_0_rgba(0,0,0,0.02),0_2px_3px_-1px_rgba(0,0,0,0.05)]"
      )}
      role="navigation"
      aria-label="Prototype demo path"
    >
      <div className="flex items-center rounded-[4px] bg-muted/50 p-0.5">
        {DEMO_SCREENS.map((screen, index) => {
          const isActive = activeIndex === index
          return (
            <Link
              key={screen.id}
              href={screen.href}
              className={cn(
                "rounded px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap",
                isActive
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={`Figma ${screen.figma}`}
            >
              {screen.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
