"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const PIPELINE_LOAD_MS = 5000

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-sm bg-[length:200%_100%] bg-gradient-to-r from-muted via-muted-foreground/20 to-muted",
        "animate-lk-genie-shimmer",
        className
      )}
      aria-hidden
    />
  )
}

function TableNameSkeletonRow() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <ShimmerLine className="h-5 min-w-0 flex-1 max-w-[min(280px,85%)]" />
      <span className="size-4 shrink-0 rounded-sm bg-muted/80" aria-hidden />
      <span className="size-4 shrink-0 rounded-sm bg-muted/80" aria-hidden />
    </div>
  )
}

function PreviewStateSkeletonRow() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <ShimmerLine className="size-[18px] shrink-0 rounded-[2px]" />
      <ShimmerLine className="h-4 w-[132px] shrink-0" />
    </div>
  )
}

function TableNameRow({ ready, name }: { ready: boolean; name: string }) {
  if (!ready) return <TableNameSkeletonRow />
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <p className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-5 text-foreground">
        {name}
      </p>
    </div>
  )
}

function PreviewAvailableRow({ ready }: { ready: boolean }) {
  if (!ready) return <PreviewStateSkeletonRow />
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <span
        className="flex size-[18px] shrink-0 items-center justify-center rounded border border-primary bg-primary text-primary-foreground shadow-xs"
        aria-hidden
      >
        <Check className="size-3.5 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" />
      </span>
      <span className="text-hint font-semibold leading-4 text-foreground">Preview available</span>
    </div>
  )
}

function PreviewErrorsRow({ ready }: { ready: boolean }) {
  if (!ready) return <PreviewStateSkeletonRow />
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span
        className="size-[10px] shrink-0 rounded-full bg-destructive"
        aria-hidden
      />
      <span className="text-hint font-semibold leading-4 text-foreground">2 errors</span>
    </div>
  )
}

function CardFooterActions({ interactive }: { interactive: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
      <Button
        variant="default"
        size="xs"
        className="h-6 shadow-xs"
        disabled={!interactive}
        type="button"
      >
        View & edit
      </Button>
      <Switch
        size="sm"
        defaultChecked
        disabled={!interactive}
        aria-label="Table active"
      />
    </div>
  )
}

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
        backgroundSize: "12px 12px",
      }}
    />
  )
}

const cardShell =
  "relative z-[1] flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-xs"

export function MedallionPipelineLoading() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from")
  const backHref =
    from === "cloudtrail-intro"
      ? "/lakewatch/datasources/ingest"
      : from === "genie"
        ? "/lakewatch/datasources/ingest/cloud/genie-progress"
        : "/lakewatch/datasources/ingest/cloud"

  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), PIPELINE_LOAD_MS)
    return () => window.clearTimeout(t)
  }, [])

  const interactive = ready

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8"
        aria-busy={!ready}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources">Current datasources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources/ingest">Ingest</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>CloudTrail 1</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-2xl font-semibold leading-none tracking-tight text-foreground">
              CloudTrail 1
            </h2>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger className="h-8 min-w-[240px] rounded border-border font-normal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
                <SelectItem value="main-warehouse">main-warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="default" size="sm" className="shadow-xs" asChild>
            <Link href={backHref}>Back</Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded border border-border p-0.5 shadow-xs">
              <Button variant="default" size="sm" className="h-7 rounded px-3 text-xs" disabled={!interactive}>
                UI
              </Button>
              <Button variant="ghost" size="sm" className="h-7 rounded px-3 text-xs" disabled={!interactive}>
                YAML
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-foreground" disabled={!interactive}>
              Permissions
            </Button>
            <Button variant="ghost" size="sm" disabled={!interactive}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" disabled={!interactive} className="gap-1">
              Apply changes
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-auto pb-2">
          <div className="flex min-w-[min(100%,1080px)] flex-1 gap-4">
            {/* Bronze */}
            <section className="flex min-h-[520px] w-[min(100%,380px)] shrink-0 flex-col rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 shrink-0 rounded-full bg-[color:var(--chart-3)]"
                    aria-hidden
                  />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Bronze</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    disabled={!interactive}
                    aria-label="Column options"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch
                  size="sm"
                  defaultChecked
                  disabled={!interactive}
                  aria-label="Bronze layer active"
                />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={cardShell}>
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <p className="text-[13px] font-semibold leading-5 text-foreground">S3 Bucket</p>
                    <div className="h-px w-full bg-border" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2.5">
                    <span
                      className="size-[10px] shrink-0 rounded-full bg-[color:var(--success)]"
                      aria-hidden
                    />
                    <span className="text-hint font-semibold leading-4 text-foreground">Active</span>
                  </div>
                  <div className="h-4 shrink-0" />
                  <TableNameRow ready={ready} name="aws_sec_lake_bronze" />
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <div className="h-px w-full bg-border" />
                  </div>
                  <p className="px-4 pb-1 text-hint leading-4 text-foreground">
                    Current field list: 27 fields added
                  </p>
                  <PreviewAvailableRow ready={ready} />
                  <CardFooterActions interactive={interactive} />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="relative z-[1] w-fit gap-1 border border-border bg-background shadow-xs"
                  disabled={!interactive}
                  type="button"
                >
                  <Plus className="size-4" aria-hidden />
                  Add enrichments
                </Button>
              </div>
            </section>

            {/* Silver */}
            <section className="flex min-h-[520px] w-[min(100%,380px)] shrink-0 flex-col rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Silver</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    disabled={!interactive}
                    aria-label="Column options"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch
                  size="sm"
                  defaultChecked
                  disabled={!interactive}
                  aria-label="Silver layer active"
                />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={cardShell}>
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <TableNameRow ready={ready} name="Cloud_trail_events_silver_3" />
                    <div className="h-px w-full bg-border" />
                  </div>
                  <p className="px-4 py-2 text-hint leading-4 text-foreground">
                    Current field list: 37 fields added
                  </p>
                  <PreviewAvailableRow ready={ready} />
                  <CardFooterActions interactive={interactive} />
                </div>
                <div className={cardShell}>
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <TableNameRow ready={ready} name="Cloud_trail_events_silver_4" />
                    <div className="h-px w-full bg-border" />
                  </div>
                  <p className="px-4 py-2 text-hint leading-4 text-foreground">
                    Current field list: 27 fields added
                  </p>
                  <div className="px-4 py-3">
                    <PreviewAvailableRow ready={ready} />
                  </div>
                  <CardFooterActions interactive={interactive} />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="relative z-[1] w-fit gap-1 border border-border bg-background shadow-xs"
                  disabled={!interactive}
                  type="button"
                >
                  <Plus className="size-4" aria-hidden />
                  Add transform
                </Button>
              </div>
            </section>

            {/* Gold */}
            <section className="flex min-h-[520px] w-[min(100%,380px)] shrink-0 flex-col rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 shrink-0 rounded-full bg-[color:var(--warning)]"
                    aria-hidden
                  />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Gold</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    disabled={!interactive}
                    aria-label="Column options"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch
                  size="sm"
                  defaultChecked
                  disabled={!interactive}
                  aria-label="Gold layer active"
                />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={cardShell}>
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <TableNameRow ready={ready} name="Cloud_trail_events_gold_3" />
                    <div className="h-px w-full bg-border" />
                  </div>
                  <p className="px-4 py-2 text-hint leading-4 text-foreground">
                    Current field list: 31 fields added
                  </p>
                  <PreviewAvailableRow ready={ready} />
                  <CardFooterActions interactive={interactive} />
                </div>
                <div className={cardShell}>
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <TableNameRow ready={ready} name="Cloud_trail_events_gold_4" />
                    <div className="h-px w-full bg-border" />
                  </div>
                  <p className="px-4 py-2 text-hint leading-4 text-foreground">
                    Current field list: 27 fields added
                  </p>
                  <PreviewErrorsRow ready={ready} />
                  <CardFooterActions interactive={interactive} />
                </div>
                <div className="relative z-[1] flex flex-col gap-3">
                  <div className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-[var(--shadow-db-sm)]">
                    <div className="p-4">
                      <p className="text-hint leading-4 text-foreground">Source silver table:</p>
                      {ready ? (
                        <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">
                          Silver_table_4
                        </p>
                      ) : (
                        <ShimmerLine className="mt-1 h-4 w-[min(100%,160px)]" />
                      )}
                    </div>
                    <PreviewAvailableRow ready={ready} />
                    <CardFooterActions interactive={interactive} />
                  </div>
                  <div className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-[var(--shadow-db-sm)]">
                    <div className="p-4">
                      <p className="text-hint leading-4 text-foreground">Source silver table:</p>
                      {ready ? (
                        <p className="mt-1 text-[13px] font-semibold leading-5 text-foreground">
                          Silver_table_4
                        </p>
                      ) : (
                        <ShimmerLine className="mt-1 h-4 w-[min(100%,160px)]" />
                      )}
                    </div>
                    <PreviewAvailableRow ready={ready} />
                    <CardFooterActions interactive={interactive} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
