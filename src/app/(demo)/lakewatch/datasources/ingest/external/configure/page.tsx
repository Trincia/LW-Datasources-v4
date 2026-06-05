"use client"

import { useRouter } from "next/navigation"
import { LakewatchAppShell } from "@/components/lakewatch"
import { DataPreviewBottomPanel } from "@/components/lakewatch/ingest-v4/DataPreviewBottomPanel"
import { ExternalDatasourcePageChrome } from "@/components/lakewatch/ingest-v4/ExternalDatasourcePageChrome"
import {
  IngestDatasourceSection,
} from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import { TableConfigurationExpanded } from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

/** Figma 718:95762 */
export default function ExternalDatasourceConfigurePage() {
  const router = useRouter()

  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ExternalDatasourcePageChrome activeStep="ingest">
        <div className="relative mx-auto flex w-full max-w-[686px] flex-col gap-[18px] pb-[280px]">
          <IngestDatasourceSection showIngestedState />
          <TableConfigurationExpanded
            onAutoConfigure={() => router.push("/lakewatch/datasources/ingest/external/bronze")}
          />
        </div>
      </ExternalDatasourcePageChrome>
      <DataPreviewBottomPanel />
    </LakewatchAppShell>
  )
}
