"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DbIcon } from "@/components/ui/db-icon"
import { GenieCodeIcon, SearchIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type PresetOption = {
  id: string
  label: string
  /** Static path under /public (exported from Figma nodes 329:7755 … 329:7791). */
  logoSrc: string
  layout:
    | { type: "cover" }
    | { type: "contain"; imgClassName?: string }
    | { type: "sprite"; imgClassName: string }
  containerClass?: string
}

export const GENIE_PRESET_ID = "genie-bronze"

const PRESETS: PresetOption[] = [
  {
    id: "cloudtrail",
    label: "Amazon CloudTrail IAM",
    logoSrc: "/lakewatch/preset-logos/cloudtrail.png",
    layout: { type: "cover" },
  },
  {
    id: "lambda",
    label: "Amazon Lambda Functions",
    logoSrc: "/lakewatch/preset-logos/lambda.png",
    layout: { type: "cover" },
  },
  {
    id: "route53",
    label: "AWS Route 53",
    logoSrc: "/lakewatch/preset-logos/route53.png",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[254.47%] left-[-82.86%] top-[-74.85%] w-[424.11%] max-w-none",
    },
  },
  {
    id: "s3",
    label: "AWS S3 Buckets",
    logoSrc: "/lakewatch/preset-logos/s3.svg",
    layout: { type: "cover" },
  },
  {
    id: "security-hub",
    label: "Amazon Security Hub",
    logoSrc: "/lakewatch/preset-logos/security-hub.png",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[195.11%] left-[-20.76%] top-[-48.01%] w-[375.69%] max-w-none",
    },
  },
  {
    id: "vpc",
    label: "AWS VPC",
    logoSrc: "/lakewatch/preset-logos/vpc.png",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[614.97%] left-[-631.21%] top-[-370.14%] w-[1613.83%] max-w-none",
    },
  },
  {
    id: "waf",
    label: "AWS WAF",
    logoSrc: "/lakewatch/preset-logos/waf.png",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[223.24%] left-[-44.87%] top-[-60.89%] w-[407.75%] max-w-none",
    },
  },
  {
    id: "slack",
    label: "Slack",
    logoSrc: "/lakewatch/preset-logos/slack.png",
    layout: { type: "contain", imgClassName: "object-contain p-1.5" },
    containerClass: "bg-neutral-200",
  },
]

function PresetLogoSwatch({ preset }: { preset: PresetOption }) {
  const wrap = cn(
    "relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded",
    preset.containerClass
  )

  if (preset.layout.type === "sprite") {
    return (
      <div className={wrap} aria-hidden>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={preset.logoSrc}
            alt=""
            className={cn("pointer-events-none max-w-none", preset.layout.imgClassName)}
            draggable={false}
          />
        </div>
      </div>
    )
  }

  const imgClass =
    preset.layout.type === "contain"
      ? cn("h-full w-full", preset.layout.imgClassName ?? "object-contain")
      : "h-full w-full object-cover"

  return (
    <div className={wrap} aria-hidden>
      <img
        src={preset.logoSrc}
        alt=""
        className={imgClass}
        draggable={false}
      />
    </div>
  )
}

interface ParsingPresetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPreset: (label: string, id: string) => void
}

export function ParsingPresetModal({
  open,
  onOpenChange,
  onSelectPreset,
}: ParsingPresetModalProps) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PRESETS
    return PRESETS.filter((p) => p.label.toLowerCase().includes(q))
  }, [query])

  const pick = (label: string, id: string) => {
    onSelectPreset(label, id)
    onOpenChange(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[85vh] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-6 sm:max-w-[520px] sm:rounded-md"
      >
        <DialogHeader className="gap-2 pr-8">
          <DialogTitle className="text-xl font-semibold leading-snug text-foreground">
            Select a managed preset or allow Genie to convert any datasource to bronze
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="mt-2 min-h-0 flex-1 gap-4 overflow-y-auto">
          <Button
            type="button"
            variant="ghost"
            className="h-auto w-full items-stretch gap-4 rounded-md border border-border bg-background p-2 text-left shadow-xs hover:bg-muted/50"
            onClick={() =>
              pick("Genie ingest automation to bronze table", GENIE_PRESET_ID)
            }
          >
            <div className="flex size-[42px] shrink-0 items-center justify-center rounded">
              <DbIcon icon={GenieCodeIcon} color="ai" size={28} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1 py-0.5">
              <span className="text-sm font-normal leading-5 text-foreground">
                Genie ingest automation to bronze table
              </span>
              <span className="text-hint text-muted-foreground">
                Ingest any datasource automatically to bronze
              </span>
            </div>
            <Badge variant="purple" className="shrink-0 self-center">
              Recommended
            </Badge>
          </Button>

          <div className="relative">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9"
              placeholder="Search datasource presets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search datasource presets"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {filtered.map((p) => (
              <Button
                key={p.id}
                type="button"
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-start gap-2 rounded-md border border-border p-2 font-normal",
                  "hover:bg-muted/50"
                )}
                onClick={() => pick(p.label, p.id)}
              >
                <PresetLogoSwatch preset={p} />
                <span className="text-sm leading-5 text-foreground">{p.label}</span>
              </Button>
            ))}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
