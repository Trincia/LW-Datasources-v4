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
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewLoading, setPreviewLoading] = React.useState(false)
  const [previewHeight, setPreviewHeight] = React.useState(275)
  const notificationTimerRef = React.useRef<number | null>(null)

  const { step, isRunning, start } = useAutoConfigureSequence(() => {
    setPreviewOpen(true)
    setPreviewLoading(true)
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
        <ExternalDatasourcePageChrome
          activeStep="ingest"
          showBronzeStep={isRunning || step > 0 || previewOpen}
          ingested={ingested}
          onSaveDatasource={() => router.push("/lakewatch/datasources/ingest/external/saved")}
          headerNotification={
            <IngestSuccessNotification
              open={showIngestNotification}
              onClose={() => setShowIngestNotification(false)}
            />
          }
        >
          <IngestDatasourceSection
            showIngestedState={ingested}
            onIngest={handleIngest}
          />
          {ingested ? (
            <TableConfigurationExpanded
              autoConfigureStep={step}
              isAutoConfiguring={isRunning}
              onAutoConfigure={handleAutoConfigure}
              onManualConfigure={handleManualConfigure}
            />
          ) : (
            <TableConfigurationCollapsed />
          )}
        </ExternalDatasourcePageChrome>
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
