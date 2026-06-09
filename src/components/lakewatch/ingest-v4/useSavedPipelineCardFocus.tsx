"use client"

import * as React from "react"
import { DataPreviewBottomPanel } from "@/components/lakewatch/ingest-v4/TableConfigurationForm"
import { DEFAULT_PREVIEW_PANEL_HEIGHT } from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import type {
  PipelineCardTier,
  SavedPipelinePreviewProfiles,
} from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import { resolveDefaultPipelineFocus } from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import { cn } from "@/lib/utils"

const PREVIEW_DRAWER_GAP_PX = 24

export function useSavedPipelineCardFocus({
  availableTiers,
  previews,
}: {
  availableTiers: PipelineCardTier[]
  previews: SavedPipelinePreviewProfiles
}) {
  const [focusedTier, setFocusedTier] = React.useState<PipelineCardTier>(() =>
    resolveDefaultPipelineFocus(availableTiers)
  )
  const [previewOpen, setPreviewOpen] = React.useState(true)
  const [previewHeight, setPreviewHeight] = React.useState(DEFAULT_PREVIEW_PANEL_HEIGHT)

  const isFocused = React.useCallback((tier: PipelineCardTier) => focusedTier === tier, [focusedTier])

  const selectTier = React.useCallback(
    (tier: PipelineCardTier) => {
      if (!availableTiers.includes(tier)) return
      setFocusedTier(tier)
      setPreviewOpen(true)
    },
    [availableTiers]
  )

  const previewPanelProps = React.useMemo(() => {
    if (focusedTier === "ingest" && previews.ingest) {
      return {
        open: previewOpen,
        loading: false,
        variant: "ingest" as const,
        ingestConfig: previews.ingest,
        configuredTitle: previews.ingest.title,
        height: previewHeight,
        onHeightChange: setPreviewHeight,
        onClose: () => setPreviewOpen(false),
      }
    }

    if (focusedTier === "silver" && previews.silver) {
      return {
        open: previewOpen,
        loading: false,
        variant: "ingest" as const,
        ingestConfig: previews.silver,
        configuredTitle: previews.silver.title,
        height: previewHeight,
        onHeightChange: setPreviewHeight,
        onClose: () => setPreviewOpen(false),
      }
    }

    return {
      open: previewOpen,
      loading: false,
      variant: "configured" as const,
      configuredTitle: previews.bronze?.title ?? previews.ingest?.title ?? "",
      height: previewHeight,
      onHeightChange: setPreviewHeight,
      onClose: () => setPreviewOpen(false),
    }
  }, [focusedTier, previewHeight, previewOpen, previews])

  return {
    focusedTier,
    isFocused,
    selectTier,
    previewOpen,
    previewHeight,
    previewPanelProps,
  }
}

export type SavedPipelineCardFocus = ReturnType<typeof useSavedPipelineCardFocus>

export function SavedPipelinePageShell({
  focus,
  header,
  schedule,
  children,
}: {
  focus: SavedPipelineCardFocus
  header: React.ReactNode
  schedule: React.ReactNode
  children: React.ReactNode
}) {
  const previewReserve = focus.previewOpen
    ? focus.previewHeight + PREVIEW_DRAWER_GAP_PX
    : undefined

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 flex-col gap-2 px-6 pt-4 md:px-8 md:pt-4">
          {header}
          {schedule}
        </div>
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden px-6 pt-3 md:px-8 md:pt-3",
            !focus.previewOpen && "pb-6 md:pb-8"
          )}
          style={{ paddingBottom: previewReserve }}
        >
          {children}
        </div>
      </div>
      <DataPreviewBottomPanel {...focus.previewPanelProps} />
    </div>
  )
}
