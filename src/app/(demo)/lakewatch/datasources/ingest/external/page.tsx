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
  CONFIGURED_PREVIEW_TITLE,
  EXTERNAL_INGEST_PREVIEW,
} from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import {
  DataPreviewBottomPanel,
  TableConfigurationExpanded,
  useAutoConfigureSequence,
} from "@/components/lakewatch/ingest-v4/TableConfigurationForm"
import {
  CLOUD_STORAGE_CONFIGURED_SAVED_HREF,
  CLOUD_STORAGE_INGEST_SAVED_HREF,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { useIngestPreviewFlow } from "@/components/lakewatch/ingest-v4/useIngestPreviewFlow"

const INGEST_NOTIFICATION_DELAY_MS = 3000

/** Figma 715:54169 → 718:95869 → auto-configure + preview */
export default function ExternalDatasourceIngestPage() {
  const router = useRouter()
  const [ingested, setIngested] = React.useState(false)
  const [showIngestNotification, setShowIngestNotification] = React.useState(false)
  const notificationTimerRef = React.useRef<number | null>(null)

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

  React.useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current)
      }
    }
  }, [])

  const handleIngest = () => {
    setIngested(true)
    showIngestPreview()
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
    showConfiguredPreview()
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
          onSaveDatasource={() => {
            router.push(
              previewVariant === "configured"
                ? CLOUD_STORAGE_CONFIGURED_SAVED_HREF
                : CLOUD_STORAGE_INGEST_SAVED_HREF
            )
          }}
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
        variant={previewVariant}
        ingestConfig={EXTERNAL_INGEST_PREVIEW}
        configuredTitle={CONFIGURED_PREVIEW_TITLE}
        height={previewHeight}
        onHeightChange={setPreviewHeight}
        onClose={handleClosePreview}
      />
    </LakewatchAppShell>
  )
}
