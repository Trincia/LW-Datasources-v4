"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CatalogCloudIcon, TableIcon, WorkflowsIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { PAGE_TITLE_SEMIBOLD } from "@/components/lakewatch/pageTitleStyles"

type SourceId = "cloud" | "table" | "lakeflow"

const SOURCE_OPTIONS: {
  id: SourceId
  title: string
  description: string | string[]
  Icon: React.ComponentType<{ size?: number; className?: string }>
}[] = [
  {
    id: "cloud",
    title: "Cloud storage",
    description: ["Unity Catalog external locations and", "volumes"],
    Icon: CatalogCloudIcon,
  },
  {
    id: "table",
    title: "Existing table",
    description: "An existing table in your workspace",
    Icon: TableIcon,
  },
  {
    id: "lakeflow",
    title: "Lakeflow connect",
    description: "An existing table in your workspace",
    Icon: WorkflowsIcon,
  },
]

export function IngestVariant1() {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")
  const [selectedSource, setSelectedSource] = React.useState<SourceId | null>(null)

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources">Current datasources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>

            <h2 className={PAGE_TITLE_SEMIBOLD}>
              Ingest
            </h2>
            <h2 className="text-lg font-semibold leading-6 text-foreground">
              Select source data location
            </h2>
            <p className="max-w-2xl text-sm leading-5 text-foreground">
              Ingest and parse any datasource with support from Genie
            </p>
          </div>

          <div className="shrink-0 sm:pt-1">
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger className="h-8 min-w-[240px] rounded border-border font-normal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
                <SelectItem value="main-warehouse">main-warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          {SOURCE_OPTIONS.map(({ id, title, description, Icon }) => {
            const tileClass = cn(
              "flex h-auto min-h-40 w-full max-w-[240px] flex-col items-center gap-3 rounded-md border border-border bg-background p-2.5 shadow-[var(--shadow-db-sm)]",
              "whitespace-normal hover:bg-secondary/60",
              selectedSource === id && "border-primary ring-2 ring-primary/20"
            )
            const inner = (
              <>
                <Icon size={35} className="shrink-0 text-muted-foreground" />
                <div className="flex w-full flex-col gap-1.5 px-3 text-center">
                  <span className="text-sm font-semibold text-foreground">{title}</span>
                  {Array.isArray(description) ? (
                    <span className="text-hint text-foreground">
                      {description.map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="text-hint text-foreground">{description}</span>
                  )}
                </div>
              </>
            )
            if (id === "cloud") {
              return (
                <Button key={id} type="button" variant="ghost" asChild className={tileClass}>
                  <Link href="/lakewatch/datasources/ingest/cloud">{inner}</Link>
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
