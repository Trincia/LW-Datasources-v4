"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, FolderIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/** Figma 715:54169 — Ingest datasource card */
export function IngestDatasourceSection({
  dataLocation = "s3://aws-cloudtrail-logs-905418055418-719340f6/",
  ingestRange = "All data",
  onIngest,
  showIngestedState = false,
}: {
  dataLocation?: string
  ingestRange?: string
  onIngest?: () => void
  showIngestedState?: boolean
}) {
  const router = useRouter()

  const handleIngest = () => {
    if (onIngest) {
      onIngest()
      return
    }
    router.push("/lakewatch/datasources/ingest/external/configure")
  }

  return (
    <section className="rounded border border-border p-4">
      <h3 className="text-lg font-semibold leading-6 text-foreground">Ingest datasource</h3>
      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-5">
        <div className="min-w-0 flex-1 space-y-2">
          <Label htmlFor="data-location">Data location</Label>
          <p className="text-hint text-muted-foreground">
            Enter a location for the data (example: s3:// dbfs:/ or /Volumes/ path).
          </p>
          <div className="flex items-stretch">
            <Input
              id="data-location"
              defaultValue={dataLocation}
              readOnly={showIngestedState}
              className="rounded-r-none border-r-0"
            />
            <Button
              type="button"
              variant="default"
              size="icon-sm"
              className="rounded-l-none border border-border"
              aria-label="Browse location"
            >
              <FolderIcon size={16} />
            </Button>
          </div>
        </div>
        <div className="w-full space-y-2 lg:w-[140px] lg:shrink-0">
          <Label>Ingest range</Label>
          <Select defaultValue={ingestRange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All data">All data</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
              <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        {showIngestedState ? (
          <Button variant="primary" size="sm" disabled>
            Ingest
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={handleIngest}>
            Ingest
          </Button>
        )}
      </div>
    </section>
  )
}

export function TableConfigurationCollapsed() {
  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Table configuration</h3>
        <div className="flex shrink-0 overflow-hidden rounded">
          <Button variant="primary" size="sm" disabled className="rounded-r-none">
            Auto-configure
          </Button>
          <Button
            variant="primary"
            size="icon-sm"
            disabled
            className="rounded-l-none border-l border-primary-foreground/20"
            aria-label="Auto-configure options"
          >
            <ChevronDownIcon size={16} />
          </Button>
        </div>
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
