"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CheckCircleIcon,
  ChevronDownIcon,
  DragIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import { Tree, type TreeNode } from "@/components/ui/tree"
import { cn } from "@/lib/utils"

const TIME_COLUMN_TREE: TreeNode[] = [
  {
    id: "row",
    label: "row",
    defaultExpanded: true,
    children: [
      {
        id: "data",
        label: "data",
        defaultExpanded: true,
        children: [
          { id: "awsRegion", label: "awsRegion" },
          { id: "eventCategory", label: "eventCategory" },
          { id: "eventID", label: "eventID" },
          { id: "eventName", label: "eventName" },
          { id: "eventSource", label: "eventSource" },
          { id: "eventTime", label: "eventTime" },
          { id: "eventType", label: "eventType" },
          { id: "eventVersion", label: "eventVersion" },
          { id: "managementEvent", label: "managementEvent" },
          { id: "readOnly", label: "readOnly" },
          { id: "recipientAccountId", label: "recipientAccountId" },
          { id: "requestID", label: "requestID" },
        ],
      },
    ],
  },
]

function AutoConfigureSplitButton({
  disabled = false,
  onAutoConfigure,
}: {
  disabled?: boolean
  onAutoConfigure?: () => void
}) {
  return (
    <div className="flex shrink-0 overflow-hidden rounded shadow-xs">
      <Button
        variant="primary"
        size="sm"
        disabled={disabled}
        className="rounded-r-none"
        onClick={onAutoConfigure}
      >
        Auto-configure
      </Button>
      <Button
        variant="primary"
        size="icon-sm"
        disabled={disabled}
        className="rounded-l-none border-l border-primary-foreground/20"
        aria-label="Auto-configure options"
      >
        <ChevronDownIcon size={16} />
      </Button>
    </div>
  )
}

function FieldLabel({
  label,
  hint,
  required,
}: {
  label: string
  hint?: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="space-y-1">
      <Label>
        {label}
        {required ? "*" : ""}
      </Label>
      {hint ? <p className="text-hint text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function ValidatedInput({
  value,
  placeholder,
  validated = false,
  readOnly = false,
  className,
}: {
  value?: string
  placeholder?: string
  validated?: boolean
  readOnly?: boolean
  className?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Input
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn("flex-1", className)}
      />
      {validated ? <CheckCircleIcon size={16} className="shrink-0 text-[var(--success)]" /> : null}
    </div>
  )
}

function FormatSelect({
  value,
  placeholder = "Select data format",
  validated = false,
}: {
  value?: string
  placeholder?: string
  validated?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Input
          readOnly
          value={value}
          placeholder={placeholder}
          className={cn("pr-9", !value && "text-muted-foreground")}
        />
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {validated ? <CheckCircleIcon size={16} className="shrink-0 text-[var(--success)]" /> : null}
    </div>
  )
}

function TimeColumnSection({
  selectedField = "eventType",
}: {
  selectedField?: string
}) {
  const [mode, setMode] = React.useState("picker")

  return (
    <div className="space-y-2">
      <FieldLabel label="Time column" />
      <SegmentedControl value={mode} onValueChange={setMode}>
        <SegmentedItem value="picker">Time column picker</SegmentedItem>
        <SegmentedItem value="expression">Expression</SegmentedItem>
      </SegmentedControl>
      <p className="text-hint text-muted-foreground">
        By default, data is loaded into a single column named &quot;data&quot; of type VARIANT.
        Select the field from this data that represents the time column for the bronze table.
      </p>
      <Tree
        nodes={TIME_COLUMN_TREE}
        selectedId={selectedField}
        size="default"
        className="max-h-[280px] w-full max-w-[560px] overflow-auto rounded border border-border"
      />
    </div>
  )
}

function PreTransformsSection() {
  return (
    <div className="space-y-2">
      <FieldLabel
        label="Pre-transforms"
        hint="[EXPLODE(`Records`) AS data]"
      />
      <div className="flex items-center gap-2 rounded-md border border-border bg-background p-2">
        <Button variant="ghost" size="icon-xs" type="button" aria-label="Reorder transform">
          <DragIcon size={16} className="text-muted-foreground" />
        </Button>
        <code className="flex-1 truncate font-mono text-[13px] leading-5">
          <span className="text-[#BE501E]">EXPLODE</span>
          <span className="text-foreground">(</span>
          <span className="text-primary">`Records`</span>
          <span className="text-foreground">) </span>
          <span className="text-[#BE501E]">AS</span>
          <span className="text-foreground"> </span>
          <span className="text-primary">data</span>
        </code>
        <Button variant="ghost" size="icon-xs" type="button" aria-label="Remove transform">
          <TrashIcon size={16} className="text-muted-foreground" />
        </Button>
      </div>
      <Button variant="ghost" size="icon-xs" type="button" aria-label="Add transform">
        <PlusIcon size={16} />
      </Button>
    </div>
  )
}

function SchemaHintsSection({ value }: { value?: string }) {
  return (
    <div className="space-y-2">
      <FieldLabel
        label="Schema hints"
        hint="Enter schema hints to customize how columns are mapped and typed."
      />
      <Input defaultValue={value} readOnly={Boolean(value)} className="font-mono text-sm" />
    </div>
  )
}

/** Figma 718:99837 — Table configuration expanded (empty fields) */
export function TableConfigurationExpanded({
  onAutoConfigure,
}: {
  onAutoConfigure?: () => void
}) {
  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Table configuration</h3>
        <AutoConfigureSplitButton onAutoConfigure={onAutoConfigure} />
      </div>
      <p className="mt-3 text-sm leading-5 text-foreground">
        Choose to automatically handle the tasks below or you can optionally select them manually.
      </p>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel
              required
              label="Source"
              hint="The name of the vendor, service, or application (e.g. Cloudflare, Okta, Akamai)."
            />
            <Input placeholder="Enter data source" />
          </div>
          <div className="space-y-2">
            <FieldLabel
              label="Source type"
              hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            />
            <Input placeholder="Enter data source type" />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel label="Format" />
          <FormatSelect />
        </div>
        <div className="space-y-2">
          <FieldLabel
            label="Bronze table name"
            hint={
              <>
                Enter a fully qualified table name in the format{" "}
                <span className="font-mono text-[13px]">catalog.schema.table</span>
              </>
            }
          />
          <Input placeholder="Enter bronze table name" />
        </div>
        <TimeColumnSection />
        <SchemaHintsSection />
        <PreTransformsSection />
      </div>
    </section>
  )
}

/** Figma 718:100201 — Bronze table configuration (filled + validated) */
export function BronzeTableConfiguration({
  onContinue,
}: {
  onContinue?: () => void
}) {
  const router = useRouter()

  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Bronze table configuration</h3>
        <AutoConfigureSplitButton disabled />
      </div>
      <p className="mt-3 text-sm leading-5 text-foreground">
        Choose to automatically handle the tasks below or you can optionally select them manually.
      </p>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel
              required
              label="Source"
              hint="The name of the vendor, service, or application (e.g. Cloudflare, Okta, Akamai)."
            />
            <ValidatedInput value="aws" validated readOnly />
          </div>
          <div className="space-y-2">
            <FieldLabel
              label="Source type"
              hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            />
            <ValidatedInput value="CloudTrail" validated readOnly />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel label="Format" />
          <FormatSelect
            validated
            value="JSON - JavaScript Object Notation, a lightweight data interchange format"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel
            label="Bronze table name"
            hint={
              <>
                Enter a fully qualified table name in the format{" "}
                <span className="font-mono text-[13px]">catalog.schema.table</span>
              </>
            }
          />
          <ValidatedInput value="aws_cloudtrail_1" readOnly />
        </div>
        <TimeColumnSection selectedField="eventType" />
        <SchemaHintsSection value="`Records` ARRAY<VARIANT>" />
        <PreTransformsSection />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            if (onContinue) onContinue()
            else router.push("/lakewatch/datasources/ingest/cloud/pipeline-preview?from=external")
          }}
        >
          Continue
        </Button>
      </div>
    </section>
  )
}
