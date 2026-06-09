"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Info, MoreHorizontal, Plus, Save } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/** Figma skeleton fill — BuildingBlocks / skeleton */
const skeletonPill = "h-2 rounded-full bg-[rgba(144,164,181,0.16)]"

const INTRO_BEFORE_PIPELINE_MS = 4000

const columnShell =
  "flex min-h-[520px] w-[min(100%,380px)] shrink-0 flex-col rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]"

const presetCardIntro =
  "relative z-[1] flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-xs"

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

function SkeletonLineBlock({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 py-1", className)} aria-hidden>
      <div className={cn(skeletonPill, "w-full max-w-[210px]")} />
      <div className={cn(skeletonPill, "w-full max-w-[180px]")} />
    </div>
  )
}

function IntroCardFooter() {
  return (
    <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
      <Button
        variant="default"
        size="xs"
        className="h-6 text-muted-foreground shadow-none"
        disabled
        type="button"
      >
        View & edit
      </Button>
      <Switch size="sm" checked disabled aria-label="Active (disabled)" />
    </div>
  )
}

export function CloudtrailPipelineIntro() {
  const router = useRouter()

  React.useEffect(() => {
    const t = window.setTimeout(() => {
      router.replace(
        "/lakewatch/datasources/ingest/cloud/pipeline-preview?from=cloudtrail-intro"
      )
    }, INTRO_BEFORE_PIPELINE_MS)
    return () => window.clearTimeout(t)
  }, [router])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6 md:p-8" aria-busy>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/lakewatch/datasources"
                      className="text-primary hover:text-primary/90"
                    >
                      Datasources
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-[15px] font-semibold leading-5 text-foreground">
              CloudTrail 1
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
            <Button variant="default" size="sm" className="shadow-xs" asChild>
              <Link href="/lakewatch/datasources/ingest">Back</Link>
            </Button>
            <div className="flex h-8 min-w-[200px] items-center gap-2 rounded border border-border bg-background px-3 shadow-xs">
              <span
                className="size-2 shrink-0 rounded-full bg-[color:var(--success)]"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
                Lakewatch Warehouse
              </span>
              <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground" aria-hidden />
            </div>
            <div className="flex rounded border border-border p-0.5 shadow-xs">
              <Button
                variant="default"
                size="sm"
                className="h-7 rounded px-3 text-xs ring-1 ring-primary/40"
                disabled
                type="button"
              >
                UI
              </Button>
              <Button variant="ghost" size="sm" className="h-7 rounded px-3 text-xs" disabled type="button">
                YAML
              </Button>
            </div>
            <Button variant="ghost" size="sm" disabled type="button">
              Permissions
            </Button>
            <Button variant="ghost" size="sm" disabled type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" disabled className="gap-1" type="button">
              Apply changes
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Figma 200:40516 — Processing schedule */}
        <div className="flex flex-col gap-3 rounded border border-border bg-background px-3 py-1.5 shadow-[var(--shadow-db-sm)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[13px] font-semibold leading-5 text-foreground">
              Processing schedule
            </span>
            <Select defaultValue="at-least">
              <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs" disabled>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="at-least">At least every</SelectItem>
              </SelectContent>
            </Select>
            <Input
              readOnly
              defaultValue="10"
              className="h-8 w-[65px] rounded border-border text-center text-muted-foreground shadow-xs"
              aria-label="Interval value"
            />
            <Select defaultValue="minutes">
              <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs" disabled>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
            <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold leading-5 text-foreground">Active</span>
              <Switch size="sm" defaultChecked disabled aria-label="Schedule active" />
            </div>
            <Button variant="link" size="sm" className="h-8 px-2 text-primary" disabled type="button">
              Advanced options
            </Button>
            <div className="flex flex-1 justify-end">
              <Button variant="link" size="sm" className="h-8 gap-1 px-2 text-primary" disabled type="button">
                <Save className="size-4" aria-hidden />
                Save transformations
              </Button>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-auto pb-2">
          <div className="flex min-w-[min(100%,1080px)] flex-1 gap-4">
            {/* Bronze */}
            <section className={columnShell}>
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 shrink-0 rounded-full bg-[color:var(--chart-3)]"
                    aria-hidden
                  />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Bronze</span>
                  <Button variant="ghost" size="icon-xs" disabled aria-label="Column options">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch size="sm" checked disabled aria-label="Bronze layer" />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={presetCardIntro}>
                  <div className="px-4 py-2">
                    <p className="text-[13px] font-semibold leading-5 text-foreground">S3 Bucket</p>
                    <div className="mt-2 h-px w-full bg-border" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2">
                    <span
                      className="size-[10px] shrink-0 rounded-full bg-[color:var(--success)]"
                      aria-hidden
                    />
                    <span className="text-hint font-semibold leading-4 text-foreground">Active</span>
                  </div>
                  <div className="px-4 py-2">
                    <SkeletonLineBlock />
                    <div className="my-2 h-px w-full bg-border" />
                    <SkeletonLineBlock className="max-w-[210px]" />
                  </div>
                  <IntroCardFooter />
                </div>
                <Button variant="default" size="sm" className="relative z-[1] w-fit gap-1 border border-dashed border-border bg-background shadow-xs" disabled type="button">
                  <Plus className="size-4" aria-hidden />
                  Add enrichments
                </Button>
              </div>
            </section>

            {/* Silver */}
            <section className={columnShell}>
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Silver</span>
                  <Button variant="ghost" size="icon-xs" disabled aria-label="Column options">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch size="sm" checked disabled aria-label="Silver layer" />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={presetCardIntro}>
                  <div className="px-4 py-3">
                    <SkeletonLineBlock />
                    <div className="my-2 h-px w-full bg-border" />
                  </div>
                  <IntroCardFooter />
                </div>
                <div className={presetCardIntro}>
                  <div className="px-4 py-3">
                    <SkeletonLineBlock />
                    <div className="my-2 h-px w-full bg-border" />
                  </div>
                  <IntroCardFooter />
                </div>
                <Button variant="default" size="sm" className="relative z-[1] w-fit gap-1 border border-border bg-background shadow-xs" disabled type="button">
                  <Plus className="size-4" aria-hidden />
                  Add transform
                </Button>
              </div>
            </section>

            {/* Gold */}
            <section className={columnShell}>
              <div className="flex h-8 items-center justify-between border-b border-border px-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 shrink-0 rounded-full bg-[color:var(--warning)]"
                    aria-hidden
                  />
                  <span className="text-[13px] font-semibold leading-5 text-foreground">Gold</span>
                  <Button variant="ghost" size="icon-xs" disabled aria-label="Column options">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
                <Switch size="sm" checked disabled aria-label="Gold layer" />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-3">
                <DotGrid />
                <div className={presetCardIntro}>
                  <div className="px-4 py-3">
                    <SkeletonLineBlock />
                    <div className="my-2 h-px w-full bg-border" />
                  </div>
                  <IntroCardFooter />
                </div>
                <div className={presetCardIntro}>
                  <div className="px-4 py-3">
                    <SkeletonLineBlock />
                    <div className="my-2 h-px w-full bg-border" />
                  </div>
                  <IntroCardFooter />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col overflow-hidden rounded-md border border-border bg-card p-4 shadow-[var(--shadow-db-sm)]">
                    <SkeletonLineBlock />
                    <div className="h-5 shrink-0" />
                    <IntroCardFooter />
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
