"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export const S3_CLOUDTRAIL_PATH = "s3://aws-cloudtrail-logs-905418055418-719340f6/"
export const PIPELINE_CARD_WIDTH_PX = 280
export const PIPELINE_CARD_GAP_PX = 45
export const PIPELINE_EDGE_STROKE = "#445461"

export const CLOUDTRAIL_PRESET_PIPELINE_HREF =
  "/lakewatch/datasources/ingest/external/cloudtrail-pipeline"

export function SavedPipelineDotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: "url(/lakewatch/saved-pipeline/dot-grid.png)",
          backgroundSize: "50px 50px",
          backgroundPosition: "top left",
        }}
      />
    </div>
  )
}

export function PipelineEdgeConnector({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 z-[2] h-2 -translate-y-1/2",
        className
      )}
      style={style}
      aria-hidden
    >
      <span
        className="absolute left-[-4px] top-1/2 z-[1] size-2 -translate-y-1/2 rounded-full border bg-background"
        style={{ borderColor: PIPELINE_EDGE_STROKE }}
      />
      <span
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{ backgroundColor: PIPELINE_EDGE_STROKE }}
      />
      <span
        className="absolute right-[-4px] top-1/2 z-[1] size-2 -translate-y-1/2 rounded-full border bg-background"
        style={{ borderColor: PIPELINE_EDGE_STROKE }}
      />
    </div>
  )
}

export function ActiveBadge() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5">
      <span className="size-[10px] shrink-0 rounded-full bg-[color:var(--success)]" aria-hidden />
      <span className="text-xs font-bold leading-4 text-foreground">Active</span>
    </div>
  )
}

export function PipelineNodeFooter() {
  return (
    <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
      <Button variant="default" size="xs" className="h-6 shadow-xs" type="button">
        View & edit
      </Button>
      <Switch size="sm" defaultChecked aria-label="Node active" />
    </div>
  )
}

export function PreviewAvailableRow() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <span
        className="flex size-[18px] shrink-0 items-center justify-center rounded border border-primary bg-primary text-primary-foreground shadow-xs"
        aria-hidden
      >
        <Check className="size-3.5 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" />
      </span>
      <span className="text-xs font-bold leading-4 text-foreground">Preview available</span>
    </div>
  )
}

export function PreviewErrorsRow({ count = 2 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-4">
      <span className="size-[10px] shrink-0 rounded-full bg-destructive" aria-hidden />
      <span className="text-xs font-bold leading-4 text-foreground">{count} errors</span>
    </div>
  )
}

export function PipelineNodeCard({
  icon,
  title,
  subtitle,
  children,
  className,
  height,
}: {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  height?: number
}) {
  return (
    <article
      className={cn(
        "relative z-[1] flex w-[280px] shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xs",
        className
      )}
      style={height ? { height } : undefined}
    >
      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {icon}
            <span className="text-[13px] font-semibold leading-5 text-foreground">{title}</span>
          </div>
          {subtitle ? (
            <span className="truncate text-[13px] font-semibold leading-5 text-foreground">{subtitle}</span>
          ) : null}
        </div>
        <div className="h-px w-full bg-border" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <PipelineNodeFooter />
    </article>
  )
}

export function PipelineTableCard({
  title,
  children,
  className,
  height,
}: {
  title: string
  children: React.ReactNode
  className?: string
  height?: number
}) {
  return (
    <article
      className={cn(
        "relative z-[1] flex w-[280px] shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xs",
        className
      )}
      style={height ? { height } : undefined}
    >
      <div className="px-4 py-2">
        <p className="truncate text-[13px] font-semibold leading-5 text-foreground">{title}</p>
        <div className="mt-2 h-px w-full bg-border" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <PipelineNodeFooter />
    </article>
  )
}