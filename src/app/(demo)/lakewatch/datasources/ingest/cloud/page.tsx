"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LakewatchAppShell } from "@/components/lakewatch"
import {
  GENIE_PRESET_ID,
  ParsingPresetModal,
} from "@/components/lakewatch/ParsingPresetModal"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { ChevronDownIcon } from "@/components/icons"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LakewatchIngestCloudPage() {
  const router = useRouter()
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")
  const [datasourceName, setDatasourceName] = React.useState("AWS Security Lakehouse -1")
  const [dataLocation, setDataLocation] = React.useState(
    "s3://aws-cloudtrail-logs-905418055418-719340f6/"
  )
  const [parsingLabel, setParsingLabel] = React.useState("")
  const [parsingPresetId, setParsingPresetId] = React.useState<string | null>(null)
  const [parsingOpen, setParsingOpen] = React.useState(false)

  const canContinue = Boolean(
    datasourceName.trim() && dataLocation.trim() && parsingLabel.trim() && parsingPresetId
  )

  const nextHref =
    parsingPresetId === GENIE_PRESET_ID
      ? "/lakewatch/datasources/ingest/cloud/genie-progress"
      : "/lakewatch/datasources/ingest/cloud/pipeline-preview?from=cloud"

  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <ParsingPresetModal
        open={parsingOpen}
        onOpenChange={setParsingOpen}
        onSelectPreset={(label, id) => {
          setParsingLabel(label)
          setParsingPresetId(id)
          if (id === GENIE_PRESET_ID) {
            router.push("/lakewatch/datasources/ingest/cloud/genie-progress")
          }
        }}
      />

      <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
        <div className="flex flex-col gap-6">
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
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/lakewatch/datasources/ingest">Ingest</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              </Breadcrumb>

              <h2 className="text-2xl font-semibold leading-none tracking-tight text-foreground">
                Ingest from an external location
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

          <div className="flex items-center justify-between gap-4">
            <Button variant="default" size="sm" className="shadow-xs" asChild>
              <Link href="/lakewatch/datasources/ingest">Back</Link>
            </Button>
            {canContinue ? (
              <Button variant="primary" size="sm" className="gap-1 shadow-xs" asChild>
                <Link href={nextHref}>
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            ) : (
              <Button variant="primary" size="sm" disabled className="gap-1" type="button">
                Next
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            )}
          </div>

          <div className="flex max-w-[686px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="datasource-name">Datasource name</Label>
              <Input
                id="datasource-name"
                value={datasourceName}
                onChange={(e) => setDatasourceName(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="data-location">Data location</Label>
                <p className="text-hint text-muted-foreground">
                  Enter a location for the data (example: s3:// dbfs:/ or /Volumes/ path).
                </p>
              </div>
              <div className="relative">
                <Input
                  id="data-location"
                  value={dataLocation}
                  onChange={(e) => setDataLocation(e.target.value)}
                  className="pr-9"
                  autoComplete="off"
                />
                <ChevronDownIcon
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold leading-5 text-foreground">
                  Datasource parsing method
                </span>
                <p className="text-hint text-muted-foreground">
                  Select a managed preset or allow Genie to parse the datasource
                </p>
              </div>
              <Button
                type="button"
                variant="default"
                id="parsing-trigger"
                aria-haspopup="dialog"
                aria-expanded={parsingOpen}
                className={cn(
                  "h-8 w-full justify-between rounded border-grey-300 px-3 font-normal shadow-xs",
                  !parsingLabel && "text-muted-foreground"
                )}
                onClick={() => setParsingOpen(true)}
              >
                <span className="truncate text-left text-sm">
                  {parsingLabel || "Select datasource parsing preset"}
                </span>
                <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LakewatchAppShell>
  )
}
