"use client"

import Link from "next/link"
import { ArrowInIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type ExternalStep = "ingest" | "bronze"

export function ExternalDatasourceSteps({
  activeStep,
}: {
  activeStep: ExternalStep
}) {
  const steps: { id: ExternalStep; label: string; href: string; icon?: boolean }[] = [
    {
      id: "ingest",
      label: "Ingest source",
      href: "/lakewatch/datasources/ingest/external",
      icon: true,
    },
    {
      id: "bronze",
      label: "Bronze",
      href: "/lakewatch/datasources/ingest/external/bronze",
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => {
        const isActive = step.id === activeStep
        const isPast = activeStep === "bronze" && step.id === "ingest"
        const show = step.id === "ingest" || activeStep === "bronze"
        if (!show) return null

        return (
          <div key={step.id} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="text-muted-foreground" aria-hidden>
                ›
              </span>
            ) : null}
            <Link
              href={step.href}
              className={cn(
                "inline-flex h-[34px] items-center gap-3 rounded border px-4 py-2 text-sm font-semibold transition-colors",
                isActive || isPast
                  ? "border-border bg-background text-foreground shadow-xs"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {step.icon ? <ArrowInIcon size={16} className="shrink-0 text-foreground" /> : null}
              {step.label}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
