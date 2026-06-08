"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { ExternalDatasourcePageChrome } from "@/components/lakewatch/ingest-v4/ExternalDatasourcePageChrome"
import { IngestDatasourceSection } from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import { TableConfigurationExpanded } from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

/** Figma 718:95762 — static configure view for prototype nav */
export default function ExternalDatasourceConfigurePage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ExternalDatasourcePageChrome activeStep="ingest" showBronzeStep ingested>
        <IngestDatasourceSection showIngestedState />
        <TableConfigurationExpanded autoConfigureStep={7} />
      </ExternalDatasourcePageChrome>
    </LakewatchAppShell>
  )
}
