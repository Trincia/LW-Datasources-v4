"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { SaveToSilverPipelineView } from "@/components/lakewatch/ingest-v4/SaveToSilverPipelineView"

/** Figma 725:96679 — existing table save to silver pipeline view */
export default function ExistingSaveToSilverPage() {
  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="flex flex-col overflow-hidden"
    >
      <SaveToSilverPipelineView />
    </LakewatchAppShell>
  )
}
