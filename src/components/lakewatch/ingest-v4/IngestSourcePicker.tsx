"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CloudStorageIllustration,
  ExistingTableIllustration,
  LakeflowConnectIllustration,
} from "./IngestSourceIllustrations"
import { IngestBreadcrumb, IngestWarehouseSelector } from "./IngestPageHeader"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"

type SourceId = "cloud" | "table" | "lakeflow"

const SOURCE_OPTIONS: {
  id: SourceId
  title: string
  titleClassName?: string
  description: string | string[]
  Illustration: React.ComponentType<{ className?: string }>
  href?: string
}[] = [
  {
    id: "cloud",
    title: "Cloud storage",
    description: ["Unity Catalog external locations and", "volumes"],
    Illustration: CloudStorageIllustration,
    href: "/lakewatch/datasources/ingest/external",
  },
  {
    id: "table",
    title: "Existing table",
    titleClassName: "text-xs font-semibold leading-4",
    description: "An existing table in your workspace",
    Illustration: ExistingTableIllustration,
    href: "/lakewatch/datasources/ingest/existing",
  },
  {
    id: "lakeflow",
    title: "Lakeflow connect",
    description: "Fully managed connectors for common security datasources",
    Illustration: LakeflowConnectIllustration,
  },
]

/** Figma 728:24097 — Ingest source location picker */
export function IngestSourcePicker() {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")
  const [selectedSource, setSelectedSource] = React.useState<SourceId | null>(null)

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <IngestBreadcrumb items={[{ label: "Current datasources", href: "/lakewatch/datasources" }]} />
          <h1 className={cn(PAGE_TITLE_BOLD, "w-fit")}>Ingest</h1>
            <h2 className="text-lg font-semibold leading-6 text-foreground">
              Select source data location
            </h2>
            <p className="max-w-2xl text-sm leading-5 text-foreground">
              Ingest and parse any datasource with support from Genie
            </p>
          </div>
          <div className="shrink-0 sm:pt-1">
            <IngestWarehouseSelector value={warehouse} onValueChange={setWarehouse} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-2">
          {SOURCE_OPTIONS.map(({ id, title, titleClassName, description, Illustration, href }) => {
            const tileClass = cn(
              "flex h-auto w-full max-w-[254px] flex-col items-stretch overflow-hidden rounded border border-border bg-background p-0 shadow-[0_3px_6px_rgba(0,0,0,0.05)]",
              "whitespace-normal hover:bg-secondary/40",
              selectedSource === id && "border-primary ring-2 ring-primary/20"
            )
            const inner = (
              <>
                <div className="flex h-[166px] w-full items-center justify-center">
                  <Illustration />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <span
                    className={cn(
                      "text-sm font-semibold text-foreground",
                      titleClassName
                    )}
                  >
                    {title}
                  </span>
                  {Array.isArray(description) ? (
                    <span className="text-sm leading-5 text-muted-foreground">
                      {description.map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="text-sm leading-5 text-muted-foreground">{description}</span>
                  )}
                </div>
              </>
            )
            if (href) {
              return (
                <Button key={id} type="button" variant="ghost" asChild className={tileClass}>
                  <Link href={href}>{inner}</Link>
                </Button>
              )
            }
            return (
              <Button
                key={id}
                type="button"
                variant="ghost"
                onClick={() => setSelectedSource(id)}
                className={tileClass}
              >
                {inner}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
