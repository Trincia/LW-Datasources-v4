"use client"

import * as React from "react"
import { LakewatchAppShell } from "@/components/lakewatch"
import { ExistingTablePageChrome } from "@/components/lakewatch/ingest-v4/ExistingTablePageChrome"
import { ExistingTableIngestSection } from "@/components/lakewatch/ingest-v4/ExistingTableIngestSection"
import { TableConfigurationCollapsed } from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import {
  DataPreviewBottomPanel,
  PREVIEW_DATA_DELAY_MS,
  TableConfigurationExpanded,
  useAutoConfigureSequence,
} from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

const AUTO_CONFIGURE_LABEL = "Auto-configure to bronze"

/** Figma 728:24314 — existing table ingest with three-state table configuration */
export default function ExistingTableIngestPage() {
  const [ingested, setIngested] = React.useState(false)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewLoading, setPreviewLoading] = React.useState(false)
  const [previewHeight, setPreviewHeight] = React.useState(275)

  const { step, isRunning, start } = useAutoConfigureSequence(() => {
    setPreviewOpen(true)
    setPreviewLoading(true)
    window.setTimeout(() => setPreviewLoading(false), PREVIEW_DATA_DELAY_MS)
  })

  const handleAutoConfigure = () => {
    start()
  }

  const handleManualConfigure = () => {
    setPreviewOpen(true)
    setPreviewLoading(true)
    window.setTimeout(() => setPreviewLoading(false), PREVIEW_DATA_DELAY_MS)
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewLoading(false)
  }

  return (
    <LakewatchAppShell
      activeItem="datasources"
      workspace="Production"
      userInitial="J"
      mainClassName="relative flex flex-col overflow-hidden"
    >
      <div
        className="min-h-0 flex-1 overflow-y-auto"
        style={{ paddingBottom: previewOpen ? previewHeight : undefined }}
      >
        <ExistingTablePageChrome>
          <ExistingTableIngestSection
            showIngestedState={ingested}
            onIngest={() => setIngested(true)}
          />
          {ingested ? (
            <TableConfigurationExpanded
              autoConfigureLabel={AUTO_CONFIGURE_LABEL}
              autoConfigureStep={step}
              isAutoConfiguring={isRunning}
              onAutoConfigure={handleAutoConfigure}
              onManualConfigure={handleManualConfigure}
            />
          ) : (
            <TableConfigurationCollapsed autoConfigureLabel={AUTO_CONFIGURE_LABEL} />
          )}
        </ExistingTablePageChrome>
      </div>

      <DataPreviewBottomPanel
        open={previewOpen}
        loading={previewLoading}
        height={previewHeight}
        onHeightChange={setPreviewHeight}
        onClose={handleClosePreview}
      />
    </LakewatchAppShell>
  )
}
