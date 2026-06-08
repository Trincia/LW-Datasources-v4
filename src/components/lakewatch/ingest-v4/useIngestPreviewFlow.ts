"use client"

import * as React from "react"
import type { DataPreviewVariant } from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import {
  DEFAULT_PREVIEW_PANEL_HEIGHT,
  MAX_PREVIEW_PANEL_HEIGHT,
  MIN_PREVIEW_PANEL_HEIGHT,
} from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import { PREVIEW_DATA_DELAY_MS } from "@/components/lakewatch/ingest-v4/TableConfigurationForm"

export function useIngestPreviewFlow() {
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewLoading, setPreviewLoading] = React.useState(false)
  const [previewHeight, setPreviewHeight] = React.useState(DEFAULT_PREVIEW_PANEL_HEIGHT)
  const [previewVariant, setPreviewVariant] = React.useState<DataPreviewVariant>("ingest")
  const previewTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        window.clearTimeout(previewTimerRef.current)
      }
    }
  }, [])

  const showPreview = React.useCallback((variant: DataPreviewVariant) => {
    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current)
    }
    setPreviewVariant(variant)
    setPreviewOpen(true)
    setPreviewLoading(true)
    previewTimerRef.current = window.setTimeout(() => {
      setPreviewLoading(false)
    }, PREVIEW_DATA_DELAY_MS)
  }, [])

  const showIngestPreview = React.useCallback(() => {
    showPreview("ingest")
  }, [showPreview])

  const showConfiguredPreview = React.useCallback(() => {
    showPreview("configured")
  }, [showPreview])

  const handleClosePreview = React.useCallback(() => {
    setPreviewOpen(false)
    setPreviewLoading(false)
  }, [])

  const clampPreviewHeight = React.useCallback((height: number) => {
    setPreviewHeight(Math.min(MAX_PREVIEW_PANEL_HEIGHT, Math.max(MIN_PREVIEW_PANEL_HEIGHT, height)))
  }, [])

  return {
    previewOpen,
    previewLoading,
    previewHeight,
    previewVariant,
    showIngestPreview,
    showConfiguredPreview,
    handleClosePreview,
    setPreviewHeight: clampPreviewHeight,
  }
}
