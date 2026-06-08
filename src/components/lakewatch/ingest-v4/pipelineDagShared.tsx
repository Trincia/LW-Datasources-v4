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

export const CLOUDTRAIL_PIPELINE_LAYOUT = {
  cardWidth: 280,
  ingestHeight: 198,
  bronzeHeight: 226,
  silverHeight: 147,
  silverGap: 48,
  goldHeight: 147,
  goldGap: 16,
  gold4Height: 161,
  ingestBronzeGap: 30,
  bronzeSilverGap: 48,
  silverGoldGap: 48,
} as const

const FORK_PATHS = {
  short: {
    width: 48,
    height: 57,
    d: "M0 0.5 H8 C16.8366 0.5 24 7.66344 24 16.5 V40.5 C24 49.3366 31.1634 56.5 40 56.5 H48",
  },
  long: {
    width: 48,
    height: 133,
    d: "M0 0.5 H8 C16.8366 0.5 24 7.66345 24 16.5 V116.5 C24 125.337 31.1634 132.5 40 132.5 H48",
  },
  gold: {
    width: 57,
    height: 72,
    d: "M0 0.5 H12.5 C21.3366 0.5 28.5 7.66344 28.5 16.5 V55.5 C28.5 64.3366 35.6634 71.5 44.5 71.5 H57",
  },
  goldLong: {
    width: 45,
    height: 110,
    d: "M0 0.5 H6.5 C15.3366 0.5 22.5 7.66344 22.5 16.5 V93.5 C22.5 102.337 29.6634 109.5 38.5 109.5 H45",
  },
} as const

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
  top,
}: {
  className?: string
  style?: React.CSSProperties
  top?: number | string
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[2] h-2 -translate-y-1/2",
        top === undefined && "top-1/2",
        className
      )}
      style={top === undefined ? style : { top, ...style }}
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

function PipelineForkEdge({
  variant,
  left,
  top,
  flipY = false,
}: {
  variant: keyof typeof FORK_PATHS
  left: number
  top: number
  flipY?: boolean
}) {
  const { width, height, d } = FORK_PATHS[variant]

  return (
    <svg
      className="pointer-events-none absolute z-[2] overflow-visible"
      style={{
        left,
        top,
        width,
        height,
        transform: flipY ? "scaleY(-1)" : undefined,
        transformOrigin: flipY ? "50% 100%" : undefined,
      }}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      <path d={d} stroke={PIPELINE_EDGE_STROKE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <circle cx={0} cy={0.5} r={3.5} fill="white" stroke={PIPELINE_EDGE_STROKE} strokeWidth={1} />
      <circle
        cx={width}
        cy={height - 0.5}
        r={3.5}
        fill="white"
        stroke={PIPELINE_EDGE_STROKE}
        strokeWidth={1}
      />
    </svg>
  )
}

/** Figma 841:48115 — full medallion DAG connectors for CloudTrail preset pipeline */
export function CloudTrailPresetPipelineEdges() {
  const {
    cardWidth,
    bronzeHeight,
    silverHeight,
    silverGap,
    goldHeight,
    goldGap,
    gold4Height,
    ingestBronzeGap,
    bronzeSilverGap,
    silverGoldGap,
  } = CLOUDTRAIL_PIPELINE_LAYOUT

  const bronzeRight = cardWidth + ingestBronzeGap + cardWidth
  const silverRight = bronzeRight + bronzeSilverGap + cardWidth
  const goldLeft = silverRight + silverGoldGap

  const bronzeCenterY = bronzeHeight / 2
  const silver3CenterY = silverHeight / 2
  const silver4CenterY = silverHeight + silverGap + silverHeight / 2
  const gold3TopCenterY = goldHeight / 2
  const gold4CenterY = goldHeight + goldGap + goldHeight + goldGap + gold4Height / 2

  const forkShortTop = bronzeCenterY - FORK_PATHS.short.height
  const forkLongTop = bronzeCenterY
  const goldForkTop = silver4CenterY - FORK_PATHS.gold.height
  const goldForkLongTop = silver4CenterY

  const graphWidth = goldLeft + CLOUDTRAIL_PIPELINE_LAYOUT.cardWidth
  const graphHeight = goldHeight + goldGap + goldHeight + goldGap + gold4Height

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{ width: graphWidth, height: graphHeight }}
      aria-hidden
    >
      <svg
        className="absolute overflow-visible"
        width={graphWidth}
        height={graphHeight}
      >
        <line
          x1={cardWidth}
          y1={bronzeCenterY}
          x2={cardWidth + ingestBronzeGap}
          y2={bronzeCenterY}
          stroke={PIPELINE_EDGE_STROKE}
          strokeWidth={1}
        />
        <circle cx={cardWidth} cy={bronzeCenterY} r={3.5} fill="white" stroke={PIPELINE_EDGE_STROKE} strokeWidth={1} />
        <circle
          cx={cardWidth + ingestBronzeGap}
          cy={bronzeCenterY}
          r={3.5}
          fill="white"
          stroke={PIPELINE_EDGE_STROKE}
          strokeWidth={1}
        />

        <line
          x1={silverRight}
          y1={silver3CenterY}
          x2={goldLeft}
          y2={gold3TopCenterY}
          stroke={PIPELINE_EDGE_STROKE}
          strokeWidth={1}
        />
        <circle cx={silverRight} cy={silver3CenterY} r={3.5} fill="white" stroke={PIPELINE_EDGE_STROKE} strokeWidth={1} />
        <circle cx={goldLeft} cy={gold3TopCenterY} r={3.5} fill="white" stroke={PIPELINE_EDGE_STROKE} strokeWidth={1} />
      </svg>

      <PipelineForkEdge variant="short" left={bronzeRight} top={forkShortTop} flipY />
      <PipelineForkEdge variant="long" left={bronzeRight} top={forkLongTop} />
      <PipelineForkEdge variant="gold" left={silverRight} top={goldForkTop} flipY />
      <PipelineForkEdge variant="goldLong" left={silverRight} top={goldForkLongTop} />
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