"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowInIcon } from "@/components/icons"
import { IngestBreadcrumb, IngestWarehouseSelector } from "@/components/lakewatch/ingest-v4/IngestPageHeader"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"
import { cn } from "@/lib/utils"

/** Figma 728:24314 — page chrome for existing-table ingest */
export function ExistingTablePageChrome({
  children,
}: {
  children: React.ReactNode
}) {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <IngestBreadcrumb
            items={[
              { label: "Current datasources", href: "/lakewatch/datasources" },
              { label: "Ingest", href: "/lakewatch/datasources/ingest" },
            ]}
          />
          <h1 className={PAGE_TITLE_BOLD}>New datasource from existing table</h1>
          <Link
            href="/lakewatch/datasources/ingest/existing"
            className={cn(
              "inline-flex h-[34px] w-fit items-center gap-3 rounded border border-border",
              "bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-xs"
            )}
          >
            <ArrowInIcon size={16} className="shrink-0 text-foreground" />
            Ingest source
          </Link>
        </div>
        <div className="shrink-0 sm:pt-1">
          <IngestWarehouseSelector value={warehouse} onValueChange={setWarehouse} />
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}
