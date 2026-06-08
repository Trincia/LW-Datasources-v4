"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"
import { DraftSavedNotification } from "@/components/lakewatch/ingest-v4/DraftSavedNotification"
import { SaveDatasourceSplitButton } from "@/components/lakewatch/ingest-v4/SaveDatasourceSplitButton"
import { Button } from "@/components/ui/button"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"

export function SavedDatasourceWorkspaceActions({
  datasourceDisplayName,
  cancelHref,
}: {
  datasourceDisplayName: string
  cancelHref: string
}) {
  const [viewMode, setViewMode] = React.useState("ui")
  const [showDraftNotification, setShowDraftNotification] = React.useState(true)

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div className="flex h-8 min-w-[240px] items-center gap-2 rounded border border-border bg-background px-3 shadow-xs">
          <span className="size-2 shrink-0 rounded-full bg-green-500" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
            Lakewatch Warehouse
          </span>
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
          <Link href={cancelHref}>Cancel</Link>
        </Button>
        <SaveDatasourceSplitButton disabled />
      </div>
      <DraftSavedNotification
        open={showDraftNotification}
        datasourceName={datasourceDisplayName}
        onClose={() => setShowDraftNotification(false)}
      />
    </div>
  )
}
