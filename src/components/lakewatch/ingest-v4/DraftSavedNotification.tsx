"use client"

import * as React from "react"
import { CheckCircleFillIcon, CloseIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Shown below Save datasource when first arriving on a saved pipeline view */
export function DraftSavedNotification({
  open,
  datasourceName,
  onClose,
  className,
}: {
  open: boolean
  datasourceName: string
  onClose?: () => void
  className?: string
}) {
  if (!open) return null

  return (
    <div
      role="status"
      className={cn(
        "flex max-w-[360px] gap-1 rounded border border-border bg-background py-1 pl-3 pr-1 shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="flex shrink-0 pt-2">
        <CheckCircleFillIcon size={16} className="text-[var(--success)]" ariaLabel="Success" />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden py-1.5">
        <p className="text-[13px] leading-5 text-foreground">
          A draft of {datasourceName} datasource has been saved.
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
