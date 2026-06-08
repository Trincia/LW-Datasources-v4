"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { CloudStorageConfiguredSavedPipelineView } from "@/components/lakewatch/ingest-v4/CloudStorageConfiguredSavedPipelineView"

/** Figma 903:17108 — cloud storage saved after configure */
export default function CloudStorageConfiguredSavedPage() {
  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="flex flex-col overflow-hidden"
    >
      <CloudStorageConfiguredSavedPipelineView />
    </LakewatchAppShell>
  )
}
