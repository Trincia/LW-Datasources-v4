"use client"

import * as React from "react"
import { CheckCircleFillIcon, CloseIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Figma 718:96214 — Ingest successful notification */
export function IngestSuccessNotification({
  open,
  locationPath = "aws-cloudtrail-logs-905418055418-719340f6/",
  onClose,
  className,
  style,
}: {
  open: boolean
  locationPath?: string
  onClose?: () => void
  className?: string
  style?: React.CSSProperties
}) {
  if (!open) return null

  return (
    <div
      role="status"
      style={style}
      className={cn(
        "flex max-w-[360px] gap-1 rounded border border-border bg-background py-1 pl-3 pr-1 shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="flex shrink-0 pt-2">
        <CheckCircleFillIcon size={16} className="text-[var(--success)]" ariaLabel="Success" />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden pt-1.5 pb-3">
        <p className="text-[13px] font-semibold leading-5 text-foreground">Ingest successful</p>
        <p className="text-[13px] leading-5 text-foreground">
          {locationPath} is now in Lakewatch
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="shrink-0 self-start"
        aria-label="Dismiss notification"
        onClick={onClose}
      >
        <CloseIcon size={16} className="text-muted-foreground" />
      </Button>
    </div>
  )
}
