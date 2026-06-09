"use client"

import { Plus } from "lucide-react"
import { ArrowInIcon } from "@/components/icons"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import { AddTransformSplitButton } from "@/components/lakewatch/ingest-v4/AddTransformSplitButton"
import {
  PipelineInlineEdge,
  PipelineIngestDetailCard,
  PIPELINE_ADD_TRANSFORM_GAP_PX,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_CARD_WIDTH_PX,
  SavedMedallionPipelineCard,
  SavedPipelineCanvas,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  SAVED_SILVER_FIELD_LIST_TEXT,
  SAVED_SILVER_TABLE_NAME,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { SavedDatasourcePageHeader } from "@/components/lakewatch/ingest-v4/SavedDatasourcePageHeader"
import { SavedPipelineProcessingSchedule } from "@/components/lakewatch/ingest-v4/SavedPipelineProcessingSchedule"
import { EXISTING_SAVE_TO_SILVER_PREVIEW_PROFILES } from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import {
  SavedPipelinePageShell,
  useSavedPipelineCardFocus,
} from "@/components/lakewatch/ingest-v4/useSavedPipelineCardFocus"
import { Button } from "@/components/ui/button"

/** Figma 725:96679 — existing table saved to silver pipeline view */
export function SaveToSilverPipelineView() {
  const focus = useSavedPipelineCardFocus({
    availableTiers: ["ingest", "silver"],
    previews: EXISTING_SAVE_TO_SILVER_PREVIEW_PROFILES,
  })

  return (
    <SavedPipelinePageShell
      focus={focus}
      header={
        <SavedDatasourcePageHeader
          defaultName="CrowdStrike FDR"
          draft
          cancelHref="/lakewatch/datasources/ingest/existing"
        />
      }
      schedule={<SavedPipelineProcessingSchedule interval="30" scheduleActive />}
    >
      <SavedPipelineCanvas>
        <div className="inline-flex flex-col">
            <div className="inline-flex items-center">
              <PipelineIngestDetailCard
                title="Ingest"
                icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
                sourceLabel="Existing table"
                location={EXISTING_TABLE_LOCATION}
                fieldListText={SAVED_BRONZE_FIELD_LIST_TEXT}
                activeLabel="Ingest active"
                focused={focus.isFocused("ingest")}
                onFocusSelect={() => focus.selectTier("ingest")}
              />

              <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />

              <SavedMedallionPipelineCard
                tier="Silver"
                tableName={SAVED_SILVER_TABLE_NAME}
                fieldListText={SAVED_SILVER_FIELD_LIST_TEXT}
                sourceLabel="Existing table"
                focused={focus.isFocused("silver")}
                onFocusSelect={() => focus.selectTier("silver")}
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
      </SavedPipelineCanvas>
    </SavedPipelinePageShell>
  )
}
