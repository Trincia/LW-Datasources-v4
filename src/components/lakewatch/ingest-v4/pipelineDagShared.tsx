"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { TableIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export const S3_CLOUDTRAIL_PATH = "s3://aws-cloudtrail-logs-905418055418-719340f6/"
export const SAVED_BRONZE_TABLE_NAME = "crowdstrike_fdr"
export const SAVED_SILVER_TABLE_NAME = "crowdstrike_fdr_silver_1"
export const SAVED_BRONZE_FIELD_LIST_TEXT = "Current field list: 27 fields added"
export const SAVED_SILVER_FIELD_LIST_TEXT = "Current field list: 37 fields added"
export const CROWDSTRIKE_LOGO_SRC = "/lakewatch/preset-logos/crowdstrike-logo.png"
export const PIPELINE_CARD_WIDTH_PX = 280
export const PIPELINE_DETAIL_CARD_WIDTH_PX = 364
export const PIPELINE_CARD_GAP_PX = 45
export const CLOUD_STORAGE_INGEST_SAVED_HREF =
  "/lakewatch/datasources/ingest/external/saved"
export const CLOUD_STORAGE_CONFIGURED_SAVED_HREF =
  "/lakewatch/datasources/ingest/external/saved-bronze"
export const PIPELINE_ADD_TRANSFORM_GAP_PX = 40
export const PIPELINE_EDGE_STROKE = "#445461"

export const CLOUDTRAIL_PIPELINE_LAYOUT = {
  cardWidth: 280,
  ingestHeight: 198,
  bronzeHeight: 226,
  silverHeight: 147,
  silverGap: 48,
  goldHeight: 200,
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

export const EXISTING_SAVE_TO_SILVER_HREF =
  "/lakewatch/datasources/ingest/existing/save-to-silver"

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

function PipelineEdgeLine() {
  return (
    <>
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
    </>
  )
}

export function PipelineInlineEdge({ width = PIPELINE_CARD_GAP_PX }: { width?: number }) {
  return (
    <div
      className="relative z-[2] h-2 shrink-0 self-center"
      style={{ width }}
      aria-hidden
    >
      <PipelineEdgeLine />
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
      <PipelineEdgeLine />
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
    <div className="mt-auto flex shrink-0 items-center justify-between gap-2 border-t border-border px-4 py-3">
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

export type MedallionTier = "Bronze" | "Silver" | "Gold"

const MEDALLION_TIER_ICON_CLASS: Record<MedallionTier, string> = {
  Bronze: "text-[#b45309]",
  Silver: "text-[#64748b]",
  Gold: "text-[#ca8a04]",
}

/** CrowdStrike source icon — Figma slot-end style for medallion pipeline cards */
export function CrowdStrikeSourceIcon() {
  return (
    <div className="shrink-0 overflow-hidden rounded-sm bg-[#fc0000] p-0.5">
      <div className="relative size-4 overflow-hidden">
        <img
          src={CROWDSTRIKE_LOGO_SRC}
          alt=""
          className="absolute left-1/2 top-0 h-[140%] w-auto max-w-none -translate-x-1/2 object-cover object-top"
        />
      </div>
    </div>
  )
}

/** Figma 903:17796 — saved pipeline Bronze / Silver / Gold node card */
export function SavedMedallionPipelineCard({
  tier,
  tableName,
  fieldListText = SAVED_BRONZE_FIELD_LIST_TEXT,
  sourceLabel = "Existing table",
  showPreview = true,
  previewLabel = "Preview available",
  showFooter = true,
  fieldListClassName,
}: {
  tier: MedallionTier
  tableName: string
  fieldListText?: string
  sourceLabel?: string
  showPreview?: boolean
  previewLabel?: string
  showFooter?: boolean
  fieldListClassName?: string
}) {
  return (
    <article className="relative z-[1] flex w-[280px] shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xs">
      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 items-center gap-[13px]">
            <TableIcon
              size={16}
              className={cn("shrink-0", MEDALLION_TIER_ICON_CLASS[tier])}
              ariaLabel={`${tier} table`}
            />
            <span className="text-[13px] font-semibold leading-5 text-foreground">{tier}</span>
          </div>
          <span className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold leading-5 text-foreground">
            {sourceLabel}
          </span>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="flex h-7 items-center px-[15px]">
        <div className="flex items-center gap-[5px]">
          <span className="size-[18px] shrink-0 rounded-full bg-[color:var(--success)]" aria-hidden />
          <span className="text-xs font-bold leading-4 text-foreground">Active</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-5 text-foreground">
            {tableName}
          </span>
          <CrowdStrikeSourceIcon />
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <p
        className={cn(
          "px-[15px] pb-[19px] pt-2 text-xs leading-4 text-foreground",
          fieldListClassName
        )}
      >
        {fieldListText}
      </p>

      {showPreview ? (
        <div className="flex items-center px-[15px] py-4">
          <div className="flex items-center gap-[5px]">
            <img
              src="/lakewatch/saved-pipeline/preview-checkbox.svg"
              alt=""
              className="size-[18px] shrink-0"
              aria-hidden
            />
            <span className="text-xs font-bold leading-4 text-foreground">{previewLabel}</span>
          </div>
        </div>
      ) : null}

      {showFooter ? (
        <div className="flex h-[52px] items-center justify-between px-[15px] py-[19px]">
          <Button variant="default" size="xs" className="h-6 shadow-xs" type="button">
            View & edit
          </Button>
          <Switch size="sm" defaultChecked aria-label={`${tier} table active`} />
        </div>
      ) : null}
    </article>
  )
}

/** Figma 725:96736 — ingest detail node card (Ingest or Ingest & Bronze) */
export function PipelineIngestDetailCard({
  title = "Ingest & Bronze",
  icon,
  sourceLabel = "Existing table",
  location,
  fieldListText = SAVED_BRONZE_FIELD_LIST_TEXT,
  activeLabel = "Ingest and bronze active",
}: {
  title?: string
  icon?: React.ReactNode
  sourceLabel?: string
  location: string
  fieldListText?: string
  activeLabel?: string
}) {
  return (
    <article className="relative z-[1] flex w-[364px] shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xs">
      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 items-center gap-[13px]">
            {icon ?? (
              <TableIcon size={16} className="shrink-0 text-foreground" ariaLabel={title} />
            )}
            <span className="text-[13px] font-semibold leading-5 text-foreground">{title}</span>
          </div>
          <span className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold leading-5 text-foreground">
            {sourceLabel}
          </span>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="flex h-7 items-center px-[15px]">
        <div className="flex items-center gap-[5px]">
          <span className="size-[18px] shrink-0 rounded-full bg-[color:var(--success)]" aria-hidden />
          <span className="text-xs font-bold leading-4 text-foreground">Active</span>
        </div>
      </div>

      <div className="h-4 shrink-0" />

      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-5 text-foreground">
            {location}
          </span>
          <CrowdStrikeSourceIcon />
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <p className="px-[15px] pb-[19px] pt-2 text-xs leading-4 text-foreground">{fieldListText}</p>

      <div className="flex items-center px-[15px] py-4">
        <div className="flex items-center gap-[5px]">
          <img
            src="/lakewatch/saved-pipeline/preview-checkbox.svg"
            alt=""
            className="size-[18px] shrink-0"
            aria-hidden
          />
          <span className="text-xs font-bold leading-4 text-foreground">Preview available</span>
        </div>
      </div>

      <div className="flex h-[52px] items-center justify-between px-[15px] py-[19px]">
        <Button variant="default" size="xs" className="h-6 shadow-xs" type="button">
          View & edit
        </Button>
        <Switch size="sm" defaultChecked aria-label={activeLabel} />
      </div>
    </article>
  )
}

/** @deprecated Use PipelineIngestDetailCard with title="Ingest & Bronze" */
export function IngestBronzeCombinedCard({
  sourceLabel = "Existing table",
  location,
  fieldListText = SAVED_BRONZE_FIELD_LIST_TEXT,
}: {
  sourceLabel?: string
  location: string
  fieldListText?: string
}) {
  return (
    <PipelineIngestDetailCard
      title="Ingest & Bronze"
      sourceLabel={sourceLabel}
      location={location}
      fieldListText={fieldListText}
    />
  )
}

/** @deprecated Use SavedMedallionPipelineCard with tier="Bronze" */
export function SavedBronzePipelineCard({
  tableName = SAVED_BRONZE_TABLE_NAME,
  fieldListText = SAVED_BRONZE_FIELD_LIST_TEXT,
  sourceLabel = "Existing table",
}: {
  tableName?: string
  fieldListText?: string
  sourceLabel?: string
}) {
  return (
    <SavedMedallionPipelineCard
      tier="Bronze"
      tableName={tableName}
      fieldListText={fieldListText}
      sourceLabel={sourceLabel}
    />
  )
}

export function PipelineNodeCard({
  icon,
  title,
  subtitle,
  children,
  className,
  height,
  width = PIPELINE_CARD_WIDTH_PX,
}: {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  height?: number
  width?: number
}) {
  return (
    <article
      className={cn(
        "relative z-[1] flex shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xs",
        className
      )}
      style={{
        width,
        ...(height ? { height } : {}),
      }}
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
      style={height ? { minHeight: height } : undefined}
    >
      <div className="px-4 py-2">
        <p className="truncate text-[13px] font-semibold leading-5 text-foreground">{title}</p>
        <div className="mt-2 h-px w-full bg-border" />
      </div>
      <div className="flex shrink-0 flex-col">{children}</div>
      <PipelineNodeFooter />
    </article>
  )
}