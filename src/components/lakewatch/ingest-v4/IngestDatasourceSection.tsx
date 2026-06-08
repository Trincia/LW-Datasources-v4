"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircleIcon, FolderIcon } from "@/components/icons"
import { AutoConfigureSplitButton, type AutoConfigureMenuItemId } from "@/components/lakewatch/ingest-v4/AutoConfigureSplitButton"
import { IngestAdvancedOptionsControls } from "@/components/lakewatch/ingest-v4/IngestAdvancedOptionsModal"
import { SelectTableModal, AWS_CLOUDTRAIL_LOCATION } from "@/components/lakewatch/ingest-v4/SelectTableModal"
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

/** Figma 715:54169 / 718:95869 — Ingest datasource card */
export function IngestDatasourceSection({
  dataLocation: dataLocationProp = "",
  onIngest,
  showIngestedState = false,
}: {
  dataLocation?: string
  onIngest?: () => void
  showIngestedState?: boolean
}) {
  const router = useRouter()
  const [dataLocation, setDataLocation] = React.useState(dataLocationProp)
  const [locationModalOpen, setLocationModalOpen] = React.useState(false)

  const fillSuggestedLocation = () => {
    setDataLocation((current) => current || AWS_CLOUDTRAIL_LOCATION)
  }

  const handleIngest = () => {
    setDataLocation((current) => current || AWS_CLOUDTRAIL_LOCATION)
    if (onIngest) {
      onIngest()
      return
    }
    router.push("/lakewatch/datasources/ingest/external/configure")
  }

  if (showIngestedState) {
    return (
      <section className="rounded border border-border p-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Ingest datasource</h3>
        <div className="mt-3">
          <IngestSummaryField
            label="Data location"
            value={dataLocation || AWS_CLOUDTRAIL_LOCATION}
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="rounded border border-border p-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Ingest datasource</h3>
        <div className="mt-3">
          <div className="min-w-0 space-y-2">
            <Label htmlFor="data-location">Data location</Label>
            <div className="flex items-stretch">
              <Input
                id="data-location"
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
                aria-label="Browse location"
                onClick={() => setLocationModalOpen(true)}
              >
                <FolderIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <IngestAdvancedOptionsControls />
          <Button variant="primary" size="sm" onClick={handleIngest}>
            Ingest
          </Button>
        </div>
      </section>

      <SelectTableModal
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onSelect={setDataLocation}
      />
    </>
  )
}

/** Figma 716:7724 — title + disabled Auto-configure only (no form body) */
export function TableConfigurationCollapsed({
  onAutoConfigure,
  onAutoConfigureMenuSelect,
  autoConfigureLabel = "Auto-configure",
}: {
  enabled?: boolean
  configuring?: boolean
  onAutoConfigure?: () => void
  onAutoConfigureMenuSelect?: (id: AutoConfigureMenuItemId) => void
  autoConfigureLabel?: string
}) {
  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Table configuration</h3>
        <AutoConfigureSplitButton
          disabled
          label={autoConfigureLabel}
          onAutoConfigure={onAutoConfigure}
          onMenuSelect={onAutoConfigureMenuSelect}
        />
      </div>
    </section>
  )
}

export function ExternalDatasourceLayout({
  children,
  activeStep = "ingest",
  showBronzeStep = false,
}: {
  children: React.ReactNode
  activeStep?: "ingest" | "bronze"
  showBronzeStep?: boolean
}) {
  return (
    <div className="mx-auto flex w-full max-w-[686px] flex-col gap-[18px]">{children}</div>
  )
}

export function ExternalBackLink({ href }: { href: string }) {
  return (
    <Button variant="link" size="sm" className="h-auto p-0 text-primary" asChild>
      <Link href={href}>Back</Link>
    </Button>
  )
}
