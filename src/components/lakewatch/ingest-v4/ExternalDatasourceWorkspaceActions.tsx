"use client"

import Link from "next/link"
import { ChevronDownIcon } from "@/components/icons"
import { SaveDatasourceSplitButton } from "@/components/lakewatch/ingest-v4/SaveDatasourceSplitButton"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/** Figma 718:104329 / 718:104309 — Lakewatch Warehouse selector */
function LakewatchWarehouseSelector({
  value = "lakewatch-warehouse",
  onValueChange,
}: {
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-9 min-w-[200px] gap-2 rounded border-border px-3 font-normal shadow-xs [&>svg:last-child]:hidden">
        <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" aria-hidden />
        <SelectValue />
        <ChevronDownIcon size={16} className="ml-auto shrink-0 text-muted-foreground" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lakewatch-warehouse">Lakewatch Warehouse</SelectItem>
        <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
      </SelectContent>
    </Select>
  )
}

/** Figma 718:104329–104334 / 718:104309–104314 — upper-right workspace actions */
export function ExternalDatasourceWorkspaceActions({
  ingested = false,
  onSave,
}: {
  ingested?: boolean
  onSave?: () => void
}) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <LakewatchWarehouseSelector />
      <Button variant="default" size="sm" className="shadow-xs" asChild>
        <Link href="/lakewatch/datasources">Cancel</Link>
      </Button>
      <SaveDatasourceSplitButton disabled={!ingested} onSave={onSave} />
    </div>
  )
}
