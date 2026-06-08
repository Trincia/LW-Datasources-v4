"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { SavedDatasourcePipelineView } from "@/components/lakewatch/ingest-v4/SavedDatasourcePipelineView"

/** Figma 731:26707 — saved datasource pipeline view */
export default function SavedDatasourcePage() {
  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="flex flex-col overflow-hidden"
    >
      <SavedDatasourcePipelineView />
    </LakewatchAppShell>
  )
}
