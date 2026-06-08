"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { ExternalDatasourcePageChrome } from "@/components/lakewatch/ingest-v4/ExternalDatasourcePageChrome"
import {
  IngestDatasourceSection,
} from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import { BronzeTableConfiguration } from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

/** Figma 718:100065 */
export default function ExternalDatasourceBronzePage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ExternalDatasourcePageChrome activeStep="bronze" showBronzeStep ingested>
        <IngestDatasourceSection showIngestedState />
        <BronzeTableConfiguration />
      </ExternalDatasourcePageChrome>
    </LakewatchAppShell>
  )
}
