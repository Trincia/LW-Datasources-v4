"use client"

import * as React from "react"
import { ExternalDatasourceSteps, type ExternalStep } from "./ExternalDatasourceSteps"
import { ExternalDatasourceWorkspaceActions } from "./ExternalDatasourceWorkspaceActions"
import { IngestBreadcrumb } from "./IngestPageHeader"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"

export function ExternalDatasourcePageChrome({
  activeStep,
  showBronzeStep = false,
  ingested = false,
  onSaveDatasource,
  children,
}: {
  activeStep: ExternalStep
  showBronzeStep?: boolean
  ingested?: boolean
  onSaveDatasource?: () => void
  children: React.ReactNode
}) {
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
          <h1 className={PAGE_TITLE_BOLD}>
            New external datasource
          </h1>
          <ExternalDatasourceSteps activeStep={showBronzeStep ? activeStep : "ingest"} />
        </div>
        <ExternalDatasourceWorkspaceActions ingested={ingested} onSave={onSaveDatasource} />
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}
