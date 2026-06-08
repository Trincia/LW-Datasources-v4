"use client"

import * as React from "react"
import { Info, Plus } from "lucide-react"
import { ArrowInIcon } from "@/components/icons"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import {
  ActiveBadge,
  PipelineInlineEdge,
  PipelineNodeCard,
  SavedMedallionPipelineCard,
  SavedPipelineDotGrid,
  PIPELINE_CARD_WIDTH_PX,
  PIPELINE_CARD_GAP_PX,
  PIPELINE_ADD_TRANSFORM_GAP_PX,
  SAVED_BRONZE_FIELD_LIST_TEXT,
  SAVED_BRONZE_TABLE_NAME,
} from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { AddTransformSplitButton } from "@/components/lakewatch/ingest-v4/AddTransformSplitButton"
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

const INGEST_CARD_HEIGHT_PX = 198

type TransformNode = {
  id: string
  tier: "Silver" | "Gold"
  tableName: string
  configured: boolean
}

function SavedTransformCard({ node }: { node: TransformNode }) {
  if (node.configured) {
    return (
      <SavedMedallionPipelineCard
        tier={node.tier}
        tableName={node.tableName}
        fieldListText={SAVED_BRONZE_FIELD_LIST_TEXT}
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
    />
  )
}

/** Figma 731:26707 — saved existing-table pipeline (CrowdStrike FDR) */
export function SavedDatasourcePipelineView() {
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
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
        <SavedDatasourcePageHeader
          defaultName="CrowdStrike FDR"
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
                  height={INGEST_CARD_HEIGHT_PX}
                  icon={<ArrowInIcon size={16} className="shrink-0 text-foreground" />}
                  title="Ingest source"
                  subtitle="Existing table"
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
                />

                {transformNodes.map((node) => (
                  <React.Fragment key={node.id}>
                    <PipelineInlineEdge width={PIPELINE_CARD_GAP_PX} />
                    <SavedTransformCard node={node} />
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
          </div>
        </div>
      </div>
    </div>
  )
}
