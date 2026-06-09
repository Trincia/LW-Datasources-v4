"use client"

import { Plus } from "lucide-react"
import { ArrowInIcon, TableIcon } from "@/components/icons"
import {
  ActiveBadge,
  PipelineInlineEdge,
  PipelineNodeCard,
  PreviewAvailableRow,
  S3_CLOUDTRAIL_PATH,
  SavedPipelineCanvas,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_DETAIL_CARD_WIDTH_PX,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { SavedDatasourcePageHeader } from "@/components/lakewatch/ingest-v4/SavedDatasourcePageHeader"
import { SavedPipelineProcessingSchedule } from "@/components/lakewatch/ingest-v4/SavedPipelineProcessingSchedule"
import { CLOUD_STORAGE_CONFIGURED_PREVIEW_PROFILES } from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import {
  SavedPipelinePageShell,
  useSavedPipelineCardFocus,
} from "@/components/lakewatch/ingest-v4/useSavedPipelineCardFocus"
import { Button } from "@/components/ui/button"

/** Figma 903:17108 — cloud storage saved after auto-configure or manual configure */
export function CloudStorageConfiguredSavedPipelineView() {
  const focus = useSavedPipelineCardFocus({
    availableTiers: ["ingest", "bronze"],
    previews: CLOUD_STORAGE_CONFIGURED_PREVIEW_PROFILES,
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
      schedule={<SavedPipelineProcessingSchedule scheduleActive />}
    >
      <SavedPipelineCanvas>
        <div className="inline-flex flex-col">
            <div className="inline-flex items-center">
              <PipelineNodeCard
                width={PIPELINE_DETAIL_CARD_WIDTH_PX}
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
                focused={focus.isFocused("bronze")}
                onFocusSelect={() => focus.selectTier("bronze")}
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
      </SavedPipelineCanvas>
    </SavedPipelinePageShell>
  )
}
