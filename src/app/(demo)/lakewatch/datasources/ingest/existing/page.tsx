"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LakewatchAppShell } from "@/components/lakewatch"
import {
  AUTO_CONFIGURE_MENU_ITEMS,
  SAVE_TO_SILVER_MENU_ITEM,
  type AutoConfigureMenuItemId,
} from "@/components/lakewatch/ingest-v4/AutoConfigureSplitButton"
import { ExistingTablePageChrome } from "@/components/lakewatch/ingest-v4/ExistingTablePageChrome"
import { ExistingTableIngestSection } from "@/components/lakewatch/ingest-v4/ExistingTableIngestSection"
import { TableConfigurationCollapsed } from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import {
  EXISTING_CONFIGURED_PREVIEW_TITLE,
  EXISTING_TABLE_INGEST_PREVIEW,
} from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import { EXISTING_SAVE_TO_SILVER_HREF } from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import {
  DataPreviewBottomPanel,
  TableConfigurationExpanded,
  useAutoConfigureSequence,
} from "@/components/lakewatch/ingest-v4/TableConfigurationForm"
import { useIngestPreviewFlow } from "@/components/lakewatch/ingest-v4/useIngestPreviewFlow"

const AUTO_CONFIGURE_LABEL = "Auto-configure to bronze"
const EXISTING_AUTO_CONFIGURE_MENU_ITEMS = [
  ...AUTO_CONFIGURE_MENU_ITEMS,
  SAVE_TO_SILVER_MENU_ITEM,
] as const

/** Figma 728:24314 — existing table ingest with three-state table configuration */
export default function ExistingTableIngestPage() {
  const router = useRouter()
  const [ingested, setIngested] = React.useState(false)

  const {
    previewOpen,
    previewLoading,
    previewHeight,
    previewVariant,
    showIngestPreview,
    showConfiguredPreview,
    handleClosePreview,
    setPreviewHeight,
  } = useIngestPreviewFlow()

  const { step, isRunning, start } = useAutoConfigureSequence(showConfiguredPreview)

  const handleIngest = () => {
    setIngested(true)
    showIngestPreview()
  }

  const handleAutoConfigure = () => {
    start()
  }

  const handleManualConfigure = () => {
    showConfiguredPreview()
  }

  const handleAutoConfigureMenuSelect = (id: AutoConfigureMenuItemId) => {
    if (id === "save-to-silver") {
      router.push(EXISTING_SAVE_TO_SILVER_HREF)
    }
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
        <ExistingTablePageChrome ingested={ingested}>
          <ExistingTableIngestSection
            showIngestedState={ingested}
            onIngest={handleIngest}
          />
          {ingested ? (
            <TableConfigurationExpanded
              autoConfigureLabel={AUTO_CONFIGURE_LABEL}
              autoConfigureMenuItems={EXISTING_AUTO_CONFIGURE_MENU_ITEMS}
              autoConfigureStep={step}
              isAutoConfiguring={isRunning}
              onAutoConfigure={handleAutoConfigure}
              onAutoConfigureMenuSelect={handleAutoConfigureMenuSelect}
              onManualConfigure={handleManualConfigure}
              showSaveToSilverBanner
            />
          ) : (
            <TableConfigurationCollapsed autoConfigureLabel={AUTO_CONFIGURE_LABEL} />
          )}
        </ExistingTablePageChrome>
      </div>

      <DataPreviewBottomPanel
        open={previewOpen}
        loading={previewLoading}
        variant={previewVariant}
        ingestConfig={EXISTING_TABLE_INGEST_PREVIEW}
        configuredTitle={EXISTING_CONFIGURED_PREVIEW_TITLE}
        height={previewHeight}
        onHeightChange={setPreviewHeight}
        onClose={handleClosePreview}
      />
    </LakewatchAppShell>
  )
}
