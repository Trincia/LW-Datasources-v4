"use client"

import * as React from "react"
import {
  ExternalDatasourceSteps,
  INGEST_FLOW_CONTENT_CLASS,
  type ExternalStep,
} from "./ExternalDatasourceSteps"
import { ExternalDatasourceWorkspaceActions } from "./ExternalDatasourceWorkspaceActions"
import { IngestBreadcrumb } from "./IngestPageHeader"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"

export function ExternalDatasourcePageChrome({
  activeStep,
  showBronzeStep = false,
  ingested = false,
  onSaveDatasource,
  headerNotification,
  children,
}: {
  activeStep: ExternalStep
  showBronzeStep?: boolean
  ingested?: boolean
  onSaveDatasource?: () => void
  headerNotification?: React.ReactNode
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
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <ExternalDatasourceWorkspaceActions ingested={ingested} onSave={onSaveDatasource} />
          {headerNotification}
        </div>
      </div>
      <div className="mt-6">
        <div className={INGEST_FLOW_CONTENT_CLASS}>
          <ExternalDatasourceSteps
            activeStep={showBronzeStep ? activeStep : "ingest"}
            showBronzeStep={showBronzeStep}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
