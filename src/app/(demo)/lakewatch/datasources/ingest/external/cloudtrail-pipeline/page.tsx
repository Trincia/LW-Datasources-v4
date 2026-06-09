import { LakewatchAppShell } from "@/components/lakewatch"
import { CloudTrailPresetPipelineView } from "@/components/lakewatch/ingest-v4/CloudTrailPresetPipelineView"

/** Figma 841:48115 — CloudTrail normalization preset pipeline */
export default function CloudTrailPresetPipelinePage() {
  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="relative flex flex-col overflow-hidden"
    >
      <CloudTrailPresetPipelineView />
    </LakewatchAppShell>
  )
}
