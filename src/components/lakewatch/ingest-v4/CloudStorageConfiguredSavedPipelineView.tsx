"use client"

import * as React from "react"
import { Info, Plus } from "lucide-react"
import { ArrowInIcon, TableIcon } from "@/components/icons"
import {
  ActiveBadge,
  PipelineInlineEdge,
  PipelineNodeCard,
  PreviewAvailableRow,
  S3_CLOUDTRAIL_PATH,
  SavedPipelineDotGrid,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_DETAIL_CARD_WIDTH_PX,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { SavedDatasourcePageHeader } from "@/components/lakewatch/ingest-v4/SavedDatasourcePageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

/** Figma 903:17108 — cloud storage saved after auto-configure or manual configure */
export function CloudStorageConfiguredSavedPipelineView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
        <SavedDatasourcePageHeader
          defaultName="CloudTrail 1"
          draft
          cancelHref="/lakewatch/datasources/ingest/external"
        />

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
              <Switch size="sm" defaultChecked aria-label="Schedule active" />
            </div>
            <Button variant="link" size="sm" className="h-8 px-2 text-primary" type="button">
              Advanced options
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
          <SavedPipelineDotGrid />
          <div className="relative z-[1] flex flex-1 items-center justify-center overflow-x-auto p-6">
            <div className="inline-flex flex-col">
              <div className="inline-flex items-center">
                <PipelineNodeCard
                  width={PIPELINE_DETAIL_CARD_WIDTH_PX}
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

                <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />

                <PipelineNodeCard
                  width={PIPELINE_DETAIL_CARD_WIDTH_PX}
                  icon={
                    <TableIcon
                      size={16}
                      className="shrink-0 text-[#b45309]"
                      ariaLabel="Bronze table"
                    />
                  }
                  title="Bronze"
                  subtitle="S3 Bucket"
                >
                  <ActiveBadge />
                  <div className="h-4 shrink-0" />
                  <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                    {SAVED_BRONZE_FIELD_LIST_TEXT}
                  </p>
                  <PreviewAvailableRow />
                </PipelineNodeCard>
              </div>

              <div
                className="mt-4 flex justify-center"
                style={{
                  marginLeft: PIPELINE_DETAIL_CARD_WIDTH_PX + PIPELINE_CARD_GAP_PX,
                  width: PIPELINE_DETAIL_CARD_WIDTH_PX,
                }}
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
