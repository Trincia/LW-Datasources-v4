"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import {
  ExternalDatasourcePageChrome,
} from "@/components/lakewatch/ingest-v4/ExternalDatasourcePageChrome"
import {
  IngestDatasourceSection,
  TableConfigurationCollapsed,
} from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"

/** Figma 715:54169 */
export default function ExternalDatasourceIngestPage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ExternalDatasourcePageChrome activeStep="ingest">
        <div className="mx-auto flex w-full max-w-[686px] flex-col gap-[18px]">
          <IngestDatasourceSection />
          <TableConfigurationCollapsed />
        </div>
      </ExternalDatasourcePageChrome>
    </LakewatchAppShell>
  )
}
