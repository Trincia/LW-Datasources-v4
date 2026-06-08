"use client"

import * as React from "react"
import { CheckCircleIcon, FolderIcon } from "@/components/icons"
import { AutoConfigureSplitButton } from "@/components/lakewatch/ingest-v4/AutoConfigureSplitButton"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import { IngestAdvancedOptionsControls } from "@/components/lakewatch/ingest-v4/IngestAdvancedOptionsModal"
import { SelectTableModal } from "@/components/lakewatch/ingest-v4/SelectTableModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function IngestSummaryField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 space-y-1">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <p className="min-w-0 truncate text-hint text-muted-foreground">{value}</p>
        <CheckCircleIcon size={16} className="shrink-0 text-[var(--success)]" ariaLabel="Validated" />
      </div>
    </div>
  )
}

/** Figma 728:24428 — ingest datasource card for existing table flow */
export function ExistingTableIngestSection({
  onIngest,
  showIngestedState = false,
}: {
  onIngest?: () => void
  showIngestedState?: boolean
}) {
  const [dataLocation, setDataLocation] = React.useState("")
  const [locationModalOpen, setLocationModalOpen] = React.useState(false)

  const fillSuggestedLocation = () => {
    setDataLocation((current) => current || EXISTING_TABLE_LOCATION)
  }

  if (showIngestedState) {
    return (
      <section className="rounded border border-border p-4">
        <h3 className="text-lg font-semibold leading-6 text-foreground">Ingest datasource</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <IngestSummaryField label="Data location" value={dataLocation || EXISTING_TABLE_LOCATION} />
          <IngestSummaryField label="Ingest range" value="All data" />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="rounded border border-border p-4">
        <h3 className="text-lg font-semibold leading-6 text-foreground">Ingest datasource</h3>
        <div className="mt-3">
          <div className="min-w-0 space-y-2">
            <Label htmlFor="existing-table-data-location">Data location</Label>
            <div className="flex items-stretch">
              <Input
                id="existing-table-data-location"
                value={dataLocation}
                onChange={(e) => setDataLocation(e.target.value)}
                onFocus={fillSuggestedLocation}
                onClick={fillSuggestedLocation}
                placeholder="Enter a table or browse"
                className="rounded-r-none border-r-0 placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                variant="default"
                size="icon-sm"
                className="rounded-l-none border border-border"
                aria-label="Browse tables"
                onClick={() => setLocationModalOpen(true)}
              >
                <FolderIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <IngestAdvancedOptionsControls />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setDataLocation((current) => current || EXISTING_TABLE_LOCATION)
              onIngest?.()
            }}
          >
            Ingest
          </Button>
        </div>
      </section>

      <SelectTableModal
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onSelect={setDataLocation}
        mode="existing-table"
      />
    </>
  )
}

/** Figma 728:24447 — collapsed table configuration for existing table flow */
export function ExistingTableConfigurationSection({
  enabled = false,
}: {
  enabled?: boolean
}) {
  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Table configuration</h3>
        <AutoConfigureSplitButton disabled={!enabled} label="Auto-configure to bronze" />
      </div>
    </section>
  )
}
