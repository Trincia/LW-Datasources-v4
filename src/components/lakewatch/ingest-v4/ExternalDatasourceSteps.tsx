"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowInIcon, TableIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type ExternalStep = "ingest" | "bronze"

const STEP_BUTTON_CLASS =
  "flex h-[34px] min-w-0 flex-1 items-center justify-center gap-3 rounded border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-xs transition-colors hover:text-foreground"

export function ExternalDatasourceSteps({
  activeStep,
  showBronzeStep = false,
}: {
  activeStep: ExternalStep
  showBronzeStep?: boolean
}) {
  const steps: {
    id: ExternalStep
    label: string
    href: string
    icon: ReactNode
  }[] = [
    {
      id: "ingest",
      label: "Ingest source",
      href: "/lakewatch/datasources/ingest/external",
      icon: <ArrowInIcon size={16} className="shrink-0 text-foreground" aria-hidden />,
    },
    {
      id: "bronze",
      label: "Bronze",
      href: "/lakewatch/datasources/ingest/external/bronze",
      icon: <TableIcon size={16} className="shrink-0 text-[#b45309]" />,
    },
  ]

  const visibleSteps = steps.filter(
    (step) => step.id === "ingest" || showBronzeStep
  )

  return (
    <div className="flex w-full items-stretch gap-2">
      {visibleSteps.map((step) => {
        const isActive = step.id === activeStep

        return (
          <Link
            key={step.id}
            href={step.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(STEP_BUTTON_CLASS, !isActive && "hover:bg-background")}
          >
            {step.icon}
            {step.label}
          </Link>
        )
      })}
    </div>
  )
}
