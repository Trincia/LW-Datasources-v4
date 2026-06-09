"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { ArrowInIcon } from "@/components/icons"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import {
  ActiveBadge,
  PipelineInlineEdge,
  PipelineNodeCard,
  SavedMedallionPipelineCard,
  SavedPipelineCanvas,
  PIPELINE_CARD_WIDTH_PX,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_ADD_TRANSFORM_GAP_PX,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  SAVED_BRONZE_TABLE_NAME,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { AddTransformSplitButton } from "@/components/lakewatch/ingest-v4/AddTransformSplitButton"
import { SavedDatasourcePageHeader } from "@/components/lakewatch/ingest-v4/SavedDatasourcePageHeader"
import { SavedPipelineProcessingSchedule } from "@/components/lakewatch/ingest-v4/SavedPipelineProcessingSchedule"
import { EXISTING_FULL_PIPELINE_PREVIEW_PROFILES } from "@/components/lakewatch/ingest-v4/savedPipelinePreviewProfiles"
import {
  SavedPipelinePageShell,
  useSavedPipelineCardFocus,
  type SavedPipelineCardFocus,
} from "@/components/lakewatch/ingest-v4/useSavedPipelineCardFocus"
import { Button } from "@/components/ui/button"

const INGEST_CARD_HEIGHT_PX = 198

type TransformNode = {
  id: string
  tier: "Silver" | "Gold"
  tableName: string
  configured: boolean
}

function SavedTransformCard({
  node,
  focus,
}: {
  node: TransformNode
  focus: SavedPipelineCardFocus
}) {
  const isSilver = node.tier === "Silver"

  if (node.configured) {
    return (
      <SavedMedallionPipelineCard
        tier={node.tier}
        tableName={node.tableName}
        fieldListText={SAVED_BRONZE_FIELD_LIST_TEXT}
        focused={isSilver && focus.isFocused("silver")}
        onFocusSelect={isSilver ? () => focus.selectTier("silver") : undefined}
      />
    )
  }

  return (
    <SavedMedallionPipelineCard
      tier={node.tier}
      tableName={node.tableName}
      fieldListText="Configure transform"
      showPreview={false}
      fieldListClassName="text-muted-foreground"
      focused={isSilver && focus.isFocused("silver")}
      onFocusSelect={isSilver ? () => focus.selectTier("silver") : undefined}
    />
  )
}

/** Figma 731:26707 — saved existing-table pipeline (CrowdStrike FDR) */
export function SavedDatasourcePipelineView() {
  const focus = useSavedPipelineCardFocus({
    availableTiers: ["ingest", "bronze", "silver"],
    previews: EXISTING_FULL_PIPELINE_PREVIEW_PROFILES,
  })

  const [transformNodes, setTransformNodes] = React.useState<TransformNode[]>([
    {
      id: "silver-1",
      tier: "Silver",
      tableName: "crowdstrike_fdr_silver_1",
      configured: true,
    },
    {
      id: "gold-1",
      tier: "Gold",
      tableName: "crowdstrike_fdr_gold_1",
      configured: true,
    },
  ])
  const nextTransformIdRef = React.useRef(0)

  const handleAddTransform = React.useCallback(() => {
    nextTransformIdRef.current += 1
    const index = nextTransformIdRef.current
    setTransformNodes((current) => [
      ...current,
      {
        id: `silver-${index}`,
        tier: "Silver",
        tableName: "New transform",
        configured: false,
      },
    ])
  }, [])

  return (
    <SavedPipelinePageShell
      focus={focus}
      header={
        <SavedDatasourcePageHeader
          defaultName="CrowdStrike FDR"
          cancelHref="/lakewatch/datasources/ingest/external"
        />
      }
      schedule={<SavedPipelineProcessingSchedule scheduleActive />}
    >
      <SavedPipelineCanvas>
        <div className="inline-flex flex-col">
            <div className="inline-flex items-center">
              <PipelineNodeCard
                height={INGEST_CARD_HEIGHT_PX}
                icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
                title="Ingest source"
                subtitle="Existing table"
                focused={focus.isFocused("ingest")}
                onFocusSelect={() => focus.selectTier("ingest")}
              >
                <ActiveBadge />
                <p className="truncate px-4 pb-2 text-[13px] leading-5 text-foreground">
                  {EXISTING_TABLE_LOCATION}
                </p>
              </PipelineNodeCard>

              <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />

              <SavedMedallionPipelineCard
                tier="Bronze"
                tableName={SAVED_BRONZE_TABLE_NAME}
                fieldListText={SAVED_BRONZE_FIELD_LIST_TEXT}
                focused={focus.isFocused("bronze")}
                onFocusSelect={() => focus.selectTier("bronze")}
              />

              {transformNodes.map((node) => (
                <React.Fragment key={node.id}>
                  <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />
                  <SavedTransformCard node={node} focus={focus} />
                </React.Fragment>
              ))}

              <div
                className="shrink-0 self-center"
                style={{ marginLeft: PIPELINE_ADD_TRANSFORM_GAP_PX }}
              >
                <AddTransformSplitButton
                  className="w-fit shrink-0"
                  onAddTransform={handleAddTransform}
                />
              </div>
            </div>

            <div
              className="mt-4 flex justify-center"
              style={{
                marginLeft: PIPELINE_CARD_WIDTH_PX + PIPELINE_CARD_GAP_PX,
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
