"use client"

import * as React from "react"
import {
  INGEST_FLOW_CONTENT_CLASS,
  IngestSourceStepLink,
} from "@/components/lakewatch/ingest-v4/ExternalDatasourceSteps"
import { ExternalDatasourceWorkspaceActions } from "@/components/lakewatch/ingest-v4/ExternalDatasourceWorkspaceActions"
import { IngestBreadcrumb } from "@/components/lakewatch/ingest-v4/IngestPageHeader"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"

/** Figma 728:24314 — page chrome for existing-table ingest */
export function ExistingTablePageChrome({
  children,
  ingested = false,
  onSaveDatasource,
}: {
  children: React.ReactNode
  ingested?: boolean
  onSaveDatasource?: () => void
}) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <IngestBreadcrumb
            items={[
              { label: "Current datasources", href: "/lakewatch/datasources" },
              { label: "Ingest", href: "/lakewatch/datasources/ingest" },
            ]}
          />
          <h1 className={PAGE_TITLE_BOLD}>New datasource from existing table</h1>
        </div>
        <ExternalDatasourceWorkspaceActions ingested={ingested} onSave={onSaveDatasource} />
      </div>
      <div className="mt-6">
        <div className={INGEST_FLOW_CONTENT_CLASS}>
          <IngestSourceStepLink href="/lakewatch/datasources/ingest/existing" />
          {children}
        </div>
      </div>
    </div>
  )
}
