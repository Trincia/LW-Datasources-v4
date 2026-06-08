"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { CloudStorageIngestSavedPipelineView } from "@/components/lakewatch/ingest-v4/CloudStorageIngestSavedPipelineView"

/** Figma 903:16972 — cloud storage saved after ingest-only */
export default function SavedDatasourcePage() {
  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="flex flex-col overflow-hidden"
    >
      <CloudStorageIngestSavedPipelineView />
    </LakewatchAppShell>
  )
}
