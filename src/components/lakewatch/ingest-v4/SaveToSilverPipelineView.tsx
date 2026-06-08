"use client"

import * as React from "react"
import Link from "next/link"
import { Info, Plus } from "lucide-react"
import { ArrowInIcon, ChevronDownIcon } from "@/components/icons"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import { AddTransformSplitButton } from "@/components/lakewatch/ingest-v4/AddTransformSplitButton"
import {
  PipelineInlineEdge,
  PipelineIngestDetailCard,
  PIPELINE_ADD_TRANSFORM_GAP_PX,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_CARD_WIDTH_PX,
  SavedMedallionPipelineCard,
  SavedPipelineDotGrid,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  SAVED_SILVER_FIELD_LIST_TEXT,
  SAVED_SILVER_TABLE_NAME,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { SaveDatasourceSplitButton } from "@/components/lakewatch/ingest-v4/SaveDatasourceSplitButton"
import {
  DATASOURCE_PAGE_HEADER_LEFT_CLASS,
  EditableDatasourceTitle,
} from "@/components/lakewatch/ingest-v4/EditableDatasourceTitle"
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
        <Link href="/lakewatch/datasources/ingest/existing">Cancel</Link>
      </Button>
      <SaveDatasourceSplitButton disabled={false} />
    </div>
  )
}

/** Figma 725:96679 — existing table saved to silver pipeline view */
export function SaveToSilverPipelineView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className={DATASOURCE_PAGE_HEADER_LEFT_CLASS}>
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
            <EditableDatasourceTitle defaultName="CrowdStrike FDR" draft />
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
              defaultValue="30"
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

        <div className="relative flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
          <SavedPipelineDotGrid />
          <div className="relative z-[1] flex flex-1 items-center justify-center overflow-x-auto p-6">
            <div className="inline-flex flex-col">
              <div className="inline-flex items-center">
                <PipelineIngestDetailCard
                  title="Ingest"
                  icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
                  sourceLabel="Existing table"
                  location={EXISTING_TABLE_LOCATION}
                  fieldListText={SAVED_BRONZE_FIELD_LIST_TEXT}
                  activeLabel="Ingest active"
                />

                <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />

                <SavedMedallionPipelineCard
                  tier="Silver"
                  tableName={SAVED_SILVER_TABLE_NAME}
                  fieldListText={SAVED_SILVER_FIELD_LIST_TEXT}
                  sourceLabel="Existing table"
                />

                <div
                  className="shrink-0 self-center"
                  style={{ marginLeft: PIPELINE_ADD_TRANSFORM_GAP_PX }}
                >
                  <AddTransformSplitButton className="w-fit shrink-0" />
                </div>
              </div>

              <div
                className="mt-4 flex justify-center"
                style={{
                  marginLeft: 364 + PIPELINE_CARD_GAP_PX,
                  width: PIPELINE_CARD_WIDTH_PX,
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
