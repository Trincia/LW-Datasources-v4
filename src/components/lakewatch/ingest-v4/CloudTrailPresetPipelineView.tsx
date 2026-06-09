"use client"

import { Plus } from "lucide-react"
import { ArrowInIcon, TableIcon } from "@/components/icons"
import {
  ActiveBadge,
  CloudTrailPresetPipelineEdges,
  PipelineNodeCard,
  PipelineTableCard,
  PreviewAvailableRow,
  PreviewErrorsRow,
  S3_CLOUDTRAIL_PATH,
  SavedPipelineCanvas,
  PIPELINE_CARD_WIDTH_PX,
  CLOUDTRAIL_PIPELINE_LAYOUT,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { AddTransformSplitButton } from "@/components/lakewatch/ingest-v4/AddTransformSplitButton"
import { SavedDatasourcePageHeader } from "@/components/lakewatch/ingest-v4/SavedDatasourcePageHeader"
import { SavedPipelineProcessingSchedule } from "@/components/lakewatch/ingest-v4/SavedPipelineProcessingSchedule"
import { CLOUDTRAIL_PRESET_PREVIEW_PROFILES } from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import {
  SavedPipelinePageShell,
  useSavedPipelineCardFocus,
} from "@/components/lakewatch/ingest-v4/useSavedPipelineCardFocus"
import { Button } from "@/components/ui/button"

const INGEST_CARD_HEIGHT_PX = CLOUDTRAIL_PIPELINE_LAYOUT.ingestHeight
const BRONZE_CARD_HEIGHT_PX = CLOUDTRAIL_PIPELINE_LAYOUT.bronzeHeight
const BRONZE_SILVER_GAP_PX = CLOUDTRAIL_PIPELINE_LAYOUT.bronzeSilverGap
const SILVER_CARD_HEIGHT_PX = CLOUDTRAIL_PIPELINE_LAYOUT.silverHeight
const GOLD_CARD_HEIGHT_PX = CLOUDTRAIL_PIPELINE_LAYOUT.goldHeight
const GOLD_CARD_4_HEIGHT_PX = CLOUDTRAIL_PIPELINE_LAYOUT.gold4Height

/** Figma 841:48115 — CloudTrail preset full medallion pipeline */
export function CloudTrailPresetPipelineView() {
  const focus = useSavedPipelineCardFocus({
    availableTiers: ["ingest", "bronze", "silver"],
    previews: CLOUDTRAIL_PRESET_PREVIEW_PROFILES,
  })

  return (
    <SavedPipelinePageShell
      focus={focus}
      header={
        <SavedDatasourcePageHeader
          defaultName="CloudTrail 1"
          draft
          cancelHref="/lakewatch/datasources/ingest/external"
        />
      }
      schedule={<SavedPipelineProcessingSchedule />}
    >
      <SavedPipelineCanvas>
        <div className="relative inline-flex items-start">
            <CloudTrailPresetPipelineEdges />
            <PipelineNodeCard
              height={INGEST_CARD_HEIGHT_PX}
              icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
              title="Ingest source"
              subtitle="S3 Bucket"
              focused={focus.isFocused("ingest")}
              onFocusSelect={() => focus.selectTier("ingest")}
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
                focused={focus.isFocused("bronze")}
                onFocusSelect={() => focus.selectTier("bronze")}
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
              <PipelineTableCard
                title="Cloud_trail_events_silver_3"
                height={SILVER_CARD_HEIGHT_PX}
                focused={focus.isFocused("silver")}
                onFocusSelect={() => focus.selectTier("silver")}
              >
                <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                  Current field list: 37 fields added
                </p>
                <PreviewAvailableRow />
              </PipelineTableCard>
              <PipelineTableCard
                title="Cloud_trail_events_silver_4"
                height={SILVER_CARD_HEIGHT_PX}
                focused={focus.isFocused("silver")}
                onFocusSelect={() => focus.selectTier("silver")}
              >
                <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                  Current field list: 56 fields added
                </p>
                <PreviewAvailableRow />
              </PipelineTableCard>
            </div>

            <div className="ml-12 flex flex-col gap-4">
              <PipelineTableCard title="Cloud_trail_events_gold_3" height={GOLD_CARD_HEIGHT_PX}>
                <div className="px-4 py-3">
                  <p className="text-xs leading-4 text-foreground">Source silver table:</p>
                  <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">Silver_table_4</p>
                </div>
                <PreviewAvailableRow />
              </PipelineTableCard>
              <PipelineTableCard title="Cloud_trail_events_gold_3" height={GOLD_CARD_HEIGHT_PX}>
                <div className="px-4 py-3">
                  <p className="text-xs leading-4 text-foreground">Source silver table:</p>
                  <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">Silver_table_4</p>
                </div>
                <PreviewAvailableRow />
              </PipelineTableCard>
              <PipelineTableCard title="Cloud_trail_events_gold_4" height={GOLD_CARD_4_HEIGHT_PX}>
                <p className="px-4 pb-2 text-xs leading-4 text-foreground">
                  Current field list: 27 fields added
                </p>
                <PreviewErrorsRow />
              </PipelineTableCard>
              <AddTransformSplitButton className="w-fit shrink-0" />
            </div>
        </div>
      </SavedPipelineCanvas>
    </SavedPipelinePageShell>
  )
}
