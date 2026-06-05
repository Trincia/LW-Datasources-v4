"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, CircleCheck } from "lucide-react"
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
import { Spinner } from "@/components/ui/spinner"
import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    thinking: "Detecting source and source type",
    doneTitle: "Source and source type detected",
    doneSubtitle: "WinEventLog:Security, syslog",
  },
  {
    thinking: "Data format detection",
    doneTitle: "Data format detected",
    doneSubtitle: "Parquet data format detected",
  },
  {
    thinking: "Naming bronze table",
    doneTitle: "Bronze table named",
    doneSubtitle: "aws_sec_lake_bronze",
  },
  {
    thinking: "Pre-transform detection",
    doneTitle: "Pre-transforms detected",
  },
  {
    thinking: "Time column detection",
    doneTitle: "Time column detected",
    doneSubtitle: "httpRequest.metadata.eventTime",
  },
  {
    thinking: "Unique ID detection",
    doneTitle: "Unique ID detected",
    doneSubtitle: '"event_uuid": "a3c4f2d0-98e5-11ee-b9d1-0242ac120002"',
  },
  {
    thinking: "Pulling data into preview table",
    doneTitle: "Preview table available",
  },
]

const FIRST_DONE_MS = 3000
const LAST_DONE_MS = 7000

function completionAtMs(index: number, total: number) {
  if (total <= 1) return FIRST_DONE_MS
  return FIRST_DONE_MS + (index * (LAST_DONE_MS - FIRST_DONE_MS)) / (total - 1)
}

export function GenieIngestProgress() {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")
  const [datasourceName] = React.useState("AWS Security Lakehouse -1")
  const [dataLocation] = React.useState(
    "s3://aws-cloudtrail-logs-905418055418-719340f6/"
  )
  const [parsingLabel] = React.useState("Genie ingest automation to bronze table")
  const [elapsed, setElapsed] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => {
      setElapsed(performance.now() - start)
    }, 80)
    return () => window.clearInterval(id)
  }, [])

  const n = STEPS.length
  const allDone = elapsed >= LAST_DONE_MS

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="mx-auto flex w-full max-w-[690px] flex-col gap-6">
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
            <h2 className="text-[24px] font-semibold leading-none tracking-tight text-foreground">
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
            <Link href="/lakewatch/datasources/ingest/cloud">Back</Link>
          </Button>
          {allDone ? (
            <Button variant="primary" size="sm" className="gap-1 shadow-xs" asChild>
              <Link href="/lakewatch/datasources/ingest/cloud/pipeline-preview?from=genie">
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="genie-datasource-name">Datasource name</Label>
            <Input id="genie-datasource-name" readOnly value={datasourceName} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="genie-data-location">Data location</Label>
            <Input id="genie-data-location" readOnly value={dataLocation} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold leading-5 text-foreground">
              Datasource parsing method
            </span>
            <div className="flex h-8 items-center rounded border border-grey-300 bg-muted/30 px-3 text-sm text-foreground">
              {parsingLabel}
            </div>
          </div>
        </div>

        <p className="text-sm leading-5 text-foreground">
          We will automatically handle the tasks below. You can optionally select them manually.
        </p>

        <div className="flex flex-col gap-8">
          {STEPS.map((step, i) => {
            const done = elapsed >= completionAtMs(i, n)
            const isPreviewRow = i === STEPS.length - 1
            return (
              <div
                key={step.thinking}
                className="flex gap-2 border-b border-border pb-2 last:border-b-0"
              >
                <ChevronDownIcon
                  size={16}
                  className="mt-1 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {done ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-hint font-semibold leading-4 text-foreground">
                              {step.doneTitle}
                            </span>
                            {isPreviewRow ? (
                              <Button variant="default" size="xs" type="button" className="h-6">
                                Open preview
                              </Button>
                            ) : null}
                          </div>
                          {step.doneSubtitle ? (
                            <p className="text-hint text-muted-foreground">{step.doneSubtitle}</p>
                          ) : null}
                        </div>
                      ) : (
                        <span
                          className={cn(
                            "inline bg-[length:200%_100%] bg-clip-text text-hint font-semibold leading-4 text-transparent",
                            "bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground",
                            "animate-lk-genie-shimmer"
                          )}
                        >
                          {step.thinking}
                        </span>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                      {done ? (
                        <CircleCheck
                          className="size-4 text-[color:var(--success)]"
                          aria-label="Completed"
                        />
                      ) : (
                        <Spinner size="small" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
