"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDownIcon, Info, Plus } from "lucide-react"
import { ArrowInIcon, TableIcon } from "@/components/icons"
import {
  ActiveBadge,
  PipelineEdgeConnector,
  PipelineNodeCard,
  PipelineTableCard,
  PreviewAvailableRow,
  PreviewErrorsRow,
  S3_CLOUDTRAIL_PATH,
  SavedPipelineDotGrid,
  PIPELINE_CARD_WIDTH_PX,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { SaveDatasourceSplitButton } from "@/components/lakewatch/ingest-v4/SaveDatasourceSplitButton"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import { Switch } from "@/components/ui/switch"

const INGEST_CARD_HEIGHT_PX = 198
const BRONZE_CARD_HEIGHT_PX = 226
const INGEST_BRONZE_GAP_PX = 30
const BRONZE_SILVER_GAP_PX = 48
const SILVER_CARD_HEIGHT_PX = 147
const GOLD_CARD_HEIGHT_PX = 161

function DatasourceDetailWorkspaceActions() {
  const [viewMode, setViewMode] = React.useState("ui")

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <div className="flex h-8 min-w-[240px] items-center gap-2 rounded border border-border bg-background px-3 shadow-xs">
        <span className="size-2 shrink-0 rounded-full bg-green-500" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">Lakewatch Warehouse</span>
        <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground" />
      </div>
      <SegmentedControl value={viewMode} onValueChange={setViewMode} className="h-8">
        <SegmentedItem value="ui" className="px-3 text-[13px]">
          UI
        </SegmentedItem>
        <SegmentedItem value="yaml" className="px-3 text-[13px]">
          YAML
        </SegmentedItem>
      </SegmentedControl>
      <Button variant="default" size="sm" className="shadow-xs" type="button">
        Permissions
      </Button>
      <Button variant="default" size="sm" className="shadow-xs" asChild>
        <Link href="/lakewatch/datasources/ingest/external">Cancel</Link>
      </Button>
      <SaveDatasourceSplitButton disabled={false} />
    </div>
  )
}

/** Figma 841:48115 — CloudTrail preset full medallion pipeline */
export function CloudTrailPresetPipelineView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources" className="text-primary hover:text-primary/90">
                      Datasources
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className={PAGE_TITLE_BOLD}>CloudTrail 1</h1>
          </div>
          <DatasourceDetailWorkspaceActions />
        </div>

        <div className="rounded-md border border-border bg-background px-4 py-3 shadow-[var(--shadow-db-sm)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[13px] font-semibold leading-5 text-foreground">
              Processing schedule
            </span>
            <Select defaultValue="at-least">
              <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="at-least">At least every</SelectItem>
              </SelectContent>
            </Select>
            <Input
              readOnly
              defaultValue="10"
              className="h-8 w-[65px] rounded border-border text-center shadow-xs"
              aria-label="Interval value"
            />
            <Select defaultValue="minutes">
              <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
            <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold leading-5 text-foreground">Active</span>
              <Switch size="sm" aria-label="Schedule active" />
            </div>
            <Button variant="link" size="sm" className="h-8 px-2 text-primary" type="button">
              Advanced options
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
          <SavedPipelineDotGrid />
          <div className="relative z-[1] flex flex-1 items-center justify-center overflow-x-auto p-6">
            <div className="relative inline-flex items-start">
              <PipelineNodeCard
                height={INGEST_CARD_HEIGHT_PX}
                icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
                title="Ingest source"
                subtitle="S3 Bucket"
              >
                <ActiveBadge />
                <div className="h-4 shrink-0" />
                <p className="truncate px-4 pb-2 text-[13px] leading-5 text-foreground">
                  {S3_CLOUDTRAIL_PATH}
                </p>
              </PipelineNodeCard>

              <div
                className="ml-[30px] flex flex-col items-center gap-4"
                style={{ width: PIPELINE_CARD_WIDTH_PX }}
              >
                <PipelineNodeCard
                  height={BRONZE_CARD_HEIGHT_PX}
                  icon={<TableIcon size={16} className="shrink-0 text-foreground" />}
                  title="Bronze"
                  subtitle="S3 Bucket"
                >
                  <ActiveBadge />
                  <div className="h-4 shrink-0" />
                  <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                    Current field list: 27 fields added
                  </p>
                  <PreviewAvailableRow />
                </PipelineNodeCard>
                <Button
                  variant="default"
                  size="sm"
                  className="w-fit gap-1 border border-border bg-background text-muted-foreground shadow-xs"
                  type="button"
                >
                  <Plus className="size-4" aria-hidden />
                  Add enrichments
                </Button>
              </div>

              <div className="flex flex-col gap-12" style={{ marginLeft: BRONZE_SILVER_GAP_PX }}>
                <PipelineTableCard title="Cloud_trail_events_silver_3" height={SILVER_CARD_HEIGHT_PX}>
                  <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                    Current field list: 37 fields added
                  </p>
                  <PreviewAvailableRow />
                </PipelineTableCard>
                <PipelineTableCard title="Cloud_trail_events_silver_4" height={SILVER_CARD_HEIGHT_PX}>
                  <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                    Current field list: 56 fields added
                  </p>
                  <PreviewAvailableRow />
                </PipelineTableCard>
              </div>

              <div className="ml-12 flex flex-col gap-4">
                <PipelineTableCard title="Cloud_trail_events_gold_3">
                  <div className="px-4 py-3">
                    <p className="text-xs leading-4 text-foreground">Source silver table:</p>
                    <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">Silver_table_4</p>
                  </div>
                  <PreviewAvailableRow />
                </PipelineTableCard>
                <PipelineTableCard title="Cloud_trail_events_gold_3">
                  <div className="px-4 py-3">
                    <p className="text-xs leading-4 text-foreground">Source silver table:</p>
                    <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">Silver_table_4</p>
                  </div>
                  <PreviewAvailableRow />
                </PipelineTableCard>
                <PipelineTableCard title="Cloud_trail_events_gold_4" height={GOLD_CARD_HEIGHT_PX}>
                  <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                    Current field list: 27 fields added
                  </p>
                  <PreviewErrorsRow />
                </PipelineTableCard>
                <div className="flex overflow-hidden rounded shadow-xs">
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1 rounded-r-none border border-border bg-background shadow-xs"
                    type="button"
                  >
                    <Plus className="size-4" aria-hidden />
                    Add transform
                  </Button>
                  <Button
                    variant="default"
                    size="icon-sm"
                    className="rounded-l-none border border-l-0 border-border"
                    aria-label="Add transform options"
                    type="button"
                  >
                    <ChevronDownIcon size={16} />
                  </Button>
                </div>
              </div>

              <PipelineEdgeConnector
                style={{ left: PIPELINE_CARD_WIDTH_PX, width: INGEST_BRONZE_GAP_PX }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
