"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LakewatchAppShell } from "@/components/lakewatch"
import { ExternalDatasourcePageChrome } from "@/components/lakewatch/ingest-v4/ExternalDatasourcePageChrome"
import { IngestSuccessNotification } from "@/components/lakewatch/ingest-v4/IngestSuccessNotification"
import {
  IngestDatasourceSection,
  TableConfigurationCollapsed,
} from "@/components/lakewatch/ingest-v4/IngestDatasourceSection"
import {
  DataPreviewBottomPanel,
  PREVIEW_DATA_DELAY_MS,
  TableConfigurationExpanded,
  useAutoConfigureSequence,
} from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

const INGEST_NOTIFICATION_DELAY_MS = 3000

/** Figma 715:54169 → 718:95869 → auto-configure + preview */
export default function ExternalDatasourceIngestPage() {
  const router = useRouter()
  const [ingested, setIngested] = React.useState(false)
  const [showIngestNotification, setShowIngestNotification] = React.useState(false)
  const [showTableConfig, setShowTableConfig] = React.useState(false)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewLoading, setPreviewLoading] = React.useState(false)
  const [previewHeight, setPreviewHeight] = React.useState(275)
  const notificationTimerRef = React.useRef<number | null>(null)

  const { step, isRunning, start, reset } = useAutoConfigureSequence(() => {
    window.setTimeout(() => setPreviewLoading(false), PREVIEW_DATA_DELAY_MS)
  })

  React.useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current)
      }
    }
  }, [])

  const handleIngest = () => {
    setIngested(true)
    if (notificationTimerRef.current) {
      window.clearTimeout(notificationTimerRef.current)
    }
    notificationTimerRef.current = window.setTimeout(() => {
      setShowIngestNotification(true)
    }, INGEST_NOTIFICATION_DELAY_MS)
  }

  const handleAutoConfigure = () => {
    setShowTableConfig(true)
    setPreviewOpen(true)
    setPreviewLoading(true)
    start()
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewLoading(false)
    reset()
    setShowTableConfig(false)
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
        <ExternalDatasourcePageChrome
          activeStep="ingest"
          ingested={ingested}
          onSaveDatasource={() => router.push("/lakewatch/datasources/ingest/external/saved")}
        >
          <div className="mx-auto flex w-full max-w-[686px] flex-col gap-[18px]">
            <IngestDatasourceSection
              showIngestedState={ingested}
              onIngest={handleIngest}
            />
            {showTableConfig ? (
              <TableConfigurationExpanded
                autoConfigureStep={step}
                isAutoConfiguring={isRunning || step > 0}
                onAutoConfigure={handleAutoConfigure}
              />
            ) : (
              <TableConfigurationCollapsed
                enabled={ingested}
                configuring={isRunning}
                onAutoConfigure={handleAutoConfigure}
              />
            )}
          </div>
        </ExternalDatasourcePageChrome>
      </div>

      <IngestSuccessNotification
        open={showIngestNotification}
        onClose={() => setShowIngestNotification(false)}
        className="absolute z-30"
        style={{
          right: 24,
          bottom: previewOpen ? previewHeight + 24 : 24,
        }}
      />

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
