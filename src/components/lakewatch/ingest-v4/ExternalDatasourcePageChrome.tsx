"use client"

import * as React from "react"
import { ExternalDatasourceSteps, type ExternalStep } from "./ExternalDatasourceSteps"
import { IngestBreadcrumb, IngestWarehouseSelector } from "./IngestPageHeader"

export function ExternalDatasourcePageChrome({
  activeStep,
  showBronzeStep = false,
  children,
}: {
  activeStep: ExternalStep
  showBronzeStep?: boolean
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
          <h1 className="text-2xl font-bold leading-none tracking-tight text-foreground">
            New external datasource
          </h1>
          <ExternalDatasourceSteps activeStep={showBronzeStep ? activeStep : "ingest"} />
        </div>
        <div className="shrink-0 sm:pt-1">
          <IngestWarehouseSelector value={warehouse} onValueChange={setWarehouse} />
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}
