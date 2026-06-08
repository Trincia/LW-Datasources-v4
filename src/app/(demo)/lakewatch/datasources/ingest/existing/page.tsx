"use client"

import * as React from "react"
import { LakewatchAppShell } from "@/components/lakewatch"
import { ExistingTablePageChrome } from "@/components/lakewatch/ingest-v4/ExistingTablePageChrome"
import {
  ExistingTableConfigurationSection,
  ExistingTableIngestSection,
} from "@/components/lakewatch/ingest-v4/ExistingTableIngestSection"

/** Figma 728:24314 */
export default function ExistingTableIngestPage() {
  const [ingested, setIngested] = React.useState(false)

  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ExistingTablePageChrome>
        <div className="mx-auto flex w-full max-w-[686px] flex-col gap-[18px]">
          <ExistingTableIngestSection
            showIngestedState={ingested}
            onIngest={() => setIngested(true)}
          />
          <ExistingTableConfigurationSection enabled={ingested} />
        </div>
      </ExistingTablePageChrome>
    </LakewatchAppShell>
  )
}
