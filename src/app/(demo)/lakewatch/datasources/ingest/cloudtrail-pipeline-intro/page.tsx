"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { CloudtrailPipelineIntro } from "@/components/lakewatch/CloudtrailPipelineIntro"

export default function LakewatchCloudtrailPipelineIntroPage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <CloudtrailPipelineIntro />
    </LakewatchAppShell>
  )
}
