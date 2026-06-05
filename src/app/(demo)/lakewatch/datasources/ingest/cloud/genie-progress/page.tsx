"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { GenieIngestProgress } from "@/components/lakewatch/GenieIngestProgress"

export default function LakewatchGenieIngestProgressPage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <GenieIngestProgress />
    </LakewatchAppShell>
  )
}
