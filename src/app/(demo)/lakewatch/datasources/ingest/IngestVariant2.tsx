"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import { DbIcon } from "@/components/ui/db-icon"
import { CatalogCloudIcon, GenieCodeIcon, TableIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const cardClass =
  "flex min-h-[160px] w-full max-w-[240px] flex-col items-center gap-3 rounded-[5px] border border-border bg-background p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

const presetCardClass =
  "flex min-h-[96px] w-full max-w-[240px] flex-col items-center gap-2 rounded-[5px] border border-border bg-background p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

const lakeflowCardClass =
  "flex min-h-[133px] w-full max-w-[240px] flex-col items-center justify-center gap-2 rounded-[5px] border border-border bg-background p-2.5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

const V2 = "/lakewatch/ingest-v2-logos"

/** Figma 110:111312 / 114:113386 — magenta tile, logo centered without axis stretch */
function ManagedCloudTrailLogo() {
  return (
    <div className="relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded-[5px] bg-[#cc2264]">
      <div className="absolute inset-0 flex items-center justify-center p-1">
        <img
          src={`${V2}/cloudtrail-managed.png`}
          alt=""
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  )
}

/** Figma 114:113423 — purple tile + sprite crop for Route 53 shield */
function ManagedRoute53Logo() {
  return (
    <div className="relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded-lg bg-[#693cc5]">
      <div className="absolute left-[11px] top-[3px] h-[34.159px] w-[39.038px] overflow-hidden">
        <img
          src={`${V2}/route53-sprite.png`}
          alt=""
          className="pointer-events-none absolute max-w-none"
          style={{
            height: "254.47%",
            width: "424.11%",
            left: "-82.86%",
            top: "-74.85%",
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}

/** Figma 114:113427 — Cloudflare wordmark in fixed frame; object-contain preserves aspect */
function ManagedCloudflareLogo() {
  return (
    <div className="flex h-[39px] w-[74px] shrink-0 items-center justify-center overflow-hidden">
      <img
        src={`${V2}/cloudflare-wordmark.png`}
        alt=""
        className="max-h-full max-w-full object-contain"
        draggable={false}
      />
    </div>
  )
}

/** Figma 114:113412 — 1Password mark (~40px), no circular crop in file */
function ManagedOnePasswordLogo() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
      <img
        src={`${V2}/1password-mark.svg`}
        alt=""
        className="max-h-full max-w-full object-contain"
        draggable={false}
      />
    </div>
  )
}

/** Figma 110:111380 (g17005) — pixel-aligned Okta wordmark; two layers absolutely positioned */
function LakeflowOktaLogo() {
  return (
    <div className="flex h-[34px] w-[150px] max-w-full shrink-0 items-center justify-center">
      <div className="relative h-[29.977px] w-[88.687px] shrink-0">
        <div className="absolute left-0 top-0 h-[29.977px] w-[61.182px]">
          <img
            src={`${V2}/okta-mark-left.svg`}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            draggable={false}
          />
        </div>
        <div className="absolute left-[62.08px] top-[7.5px] h-[22.39px] w-[26.607px]">
          <img
            src={`${V2}/okta-mark-right.svg`}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

/** Figma 110:111390 — CrowdStrike wordmark */
function LakeflowCrowdStrikeLogo() {
  return (
    <div className="flex h-[34px] w-[150px] max-w-full shrink-0 items-center justify-center">
      <img
        src={`${V2}/crowdstrike-wordmark.png`}
        alt=""
        className="max-h-full max-w-full object-contain"
        draggable={false}
      />
    </div>
  )
}

/** Figma 110:111393 — Workday wordmark */
function LakeflowWorkdayLogo() {
  return (
    <div className="flex h-[39px] w-[69px] shrink-0 items-center justify-center">
      <img
        src={`${V2}/workday-wordmark.png`}
        alt=""
        className="max-h-full max-w-full object-contain"
        draggable={false}
      />
    </div>
  )
}

export function IngestVariant2() {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources">Current datasources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>

            <h2 className="text-[24px] font-semibold leading-none tracking-tight text-foreground">
              Ingest
            </h2>
          </div>

          <div className="shrink-0 sm:pt-1">
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

        {/* Universal ingest and parsing — Figma 109:80731 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <div className="flex items-center gap-2">
              <DbIcon icon={GenieCodeIcon} color="ai" size={16} className="shrink-0" />
              <h2 className="text-lg font-semibold leading-6 text-foreground">
                Universal ingest and parsing
              </h2>
            </div>
            <p className="text-sm leading-5 text-foreground">
              Ingest and parse any datasource with support from Genie
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className={cn(cardClass, "cursor-default")}>
              <CatalogCloudIcon size={35} className="shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1.5 px-3 text-center">
                <span className="text-sm font-semibold text-foreground">Cloud storage</span>
                <span className="text-hint text-foreground">
                  <span className="block">Unity Catalog external locations and</span>
                  <span className="block">volumes</span>
                </span>
              </div>
            </div>
            <div className={cn(cardClass, "cursor-default")}>
              <TableIcon size={35} className="shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1.5 px-3 text-center">
                <span className="text-sm font-semibold text-foreground">Existing table</span>
                <span className="text-hint text-foreground">
                  An existing table in your workspace
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lakewatch managed presets — Figma 110:111312 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <h2 className="text-lg font-semibold leading-6 text-foreground">
              Lakewatch managed presets
            </h2>
            <p className="text-sm leading-5 text-foreground">
              Automatic ingest and normalization for external or internal tables with full parsing
              to silver and gold tables
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Button
              type="button"
              variant="ghost"
              asChild
              className={cn(
                presetCardClass,
                "h-auto font-normal hover:bg-secondary/60",
                "whitespace-normal"
              )}
            >
              <Link
                href="/lakewatch/datasources/ingest/cloudtrail-pipeline-intro"
                className="flex flex-col items-center gap-2"
              >
                <ManagedCloudTrailLogo />
                <span className="px-3 text-center text-sm font-semibold text-foreground">
                  Amazon CloudTrail IAM
                </span>
              </Link>
            </Button>
            <div className={presetCardClass}>
              <ManagedRoute53Logo />
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                AWS Route 53
              </span>
            </div>
            <div className={presetCardClass}>
              <ManagedCloudflareLogo />
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                Cloudflare
              </span>
            </div>
            <div className={presetCardClass}>
              <ManagedOnePasswordLogo />
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                One Password
              </span>
            </div>
          </div>
        </section>

        {/* Lakeflow connect — Figma 110:111368 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <h2 className="text-lg font-semibold leading-6 text-foreground">Lakeflow connect</h2>
            <p className="text-sm leading-5 text-foreground">Managed, multi-source ingestion</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className={lakeflowCardClass}>
              <img
                src="/lakewatch/preset-logos/slack.png"
                alt=""
                className="h-9 w-auto max-w-[120px] object-contain"
                draggable={false}
              />
              <p className="text-hint text-foreground">
                Import messages and data from
                <br />
                Slack workspaces.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <LakeflowOktaLogo />
              <p className="text-hint text-foreground">
                Sync identity and access
                <br />
                management data.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <LakeflowCrowdStrikeLogo />
              <p className="text-hint text-foreground">
                Real-time security event ingestion from Crowdstrike.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <LakeflowWorkdayLogo />
              <p className="text-hint text-foreground">
                Import HR and workforce management data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
