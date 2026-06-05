"use client"

import * as React from "react"
import { LakewatchAppShell } from "@/components/lakewatch"
import { IngestSourcePicker } from "@/components/lakewatch/ingest-v4/IngestSourcePicker"
import { useLakewatchPrototypeVariant } from "@/components/lakewatch/lakewatch-prototype-variant"
import { IngestVariant2 } from "./IngestVariant2"

export default function LakewatchIngestPage() {
  const { variant, hydrated } = useLakewatchPrototypeVariant()

  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      {!hydrated || variant === 1 ? <IngestSourcePicker /> : <IngestVariant2 />}
    </LakewatchAppShell>
  )
}
