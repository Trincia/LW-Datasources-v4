"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CloseIcon,
  DragIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons"
import { AutoConfigureSplitButton, type AutoConfigureMenuItemId } from "@/components/lakewatch/ingest-v4/AutoConfigureSplitButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { Tree, type TreeNode } from "@/components/ui/tree"
import { cn } from "@/lib/utils"

export const AUTO_CONFIGURE_FIELD_COUNT = 7
export const AUTO_CONFIGURE_STEP_MS = 1500
export const AUTO_CONFIGURE_DURATION_MS =
  AUTO_CONFIGURE_STEP_MS * AUTO_CONFIGURE_FIELD_COUNT
export const PREVIEW_DATA_DELAY_MS = 3000

export const TABLE_CONFIGURATION_EXPLAINER =
  "In order to query or detect on this data source, you will need to configure this table to have a time column and ID column."

const EMPTY_TIME_COLUMN_TREE: TreeNode[] = [
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
        ],
      },
    ],
  },
]

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

const AUTO_CONFIGURE_VALUES = {
  source: "aws",
  sourceType: "CloudTrail",
  format: "JSON - JavaScript Object Notation, a lightweight data interchange format",
  bronzeTableName: "aws_cloudtrail_1",
  timeColumn: "eventType",
  schemaHints: "`Records` ARRAY<VARIANT>",
} as const

const PREVIEW_ROWS = [
  {
    eventTime: "2025-10-31T08:42:10Z",
    eventData:
      '{"user_id": "u123", "action": "login", "device": "iPhone", "ip": "73.45.221.12"} 4b2c6b9e-32e3-4a77-a7b1-8cce7a19e83a',
  },
  {
    eventTime: "2025-10-31T08:44:32Z",
    eventData:
      '{"user_id": "u456", "action": "view_page", "page": "/pricing", "referrer": "google"} 1d4f2a1c-ed30-4b2e-b1e9-5b99c2b3a88f',
  },
  {
    eventTime: "2025-10-31T08:47:12Z",
    eventData:
      '{"user_id": "u123", "action": "add_to_cart", "item_id": "sku-9081", "quantity": 2, "price": 39.99, 9a5e1d77-de20-4423-b8ab-120a8a53c147}',
  },
  {
    eventTime: "2025-10-31T08:50:45Z",
    eventData:
      '{"user_id": "u789", "action": "login", "device": "Android", "ip": "104.31.66.5", 47ce9b92-22a8-4a63-9373-d5a13b7a5e93}',
  },
  {
    eventTime: "2025-10-31T08:53:01Z",
    eventData:
      '{"user_id": "u789", "action": "view_page", "page": "/home", "referrer": "direct", 2bcb87f3-9237-4c02-8c39-ff5f1d19f8ee}',
  },
] as const

const DEFAULT_PANEL_HEIGHT = 275
const MIN_PANEL_HEIGHT = 160
const MAX_PANEL_HEIGHT = 560

function FieldStatusIcon({
  loading = false,
  validated = false,
}: {
  loading?: boolean
  validated?: boolean
}) {
  if (loading) {
    return <Spinner size="small" className="shrink-0 text-primary" />
  }
  if (validated) {
    return (
      <CheckCircleIcon
        size={16}
        className="shrink-0 text-[var(--success)]"
        ariaLabel="Validated"
      />
    )
  }
  return null
}

function getFieldState(
  fieldStep: number,
  autoConfigureStep: number,
  isAutoConfiguring: boolean,
  manuallyFilled = false
) {
  return {
    loading: isAutoConfiguring && autoConfigureStep === fieldStep - 1,
    validated: autoConfigureStep >= fieldStep || manuallyFilled,
  }
}

type FieldFillControl = {
  filled: boolean
  value: string
  onFill: () => void
  onValueChange: (value: string) => void
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
  fieldStep,
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  className,
  fill,
}: {
  value?: string
  placeholder?: string
  fieldStep: number
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  className?: string
  fill?: FieldFillControl
}) {
  const defaultValue = value ?? ""
  const { loading, validated } = getFieldState(
    fieldStep,
    autoConfigureStep,
    isAutoConfiguring,
    fill?.filled
  )
  const interactive = Boolean(fill)
  const displayValue = validated
    ? fill?.value ?? defaultValue
    : fill?.value ?? ""

  return (
    <div className="flex items-center gap-2">
      <Input
        value={displayValue}
        placeholder={placeholder}
        readOnly={!interactive || loading}
        onFocus={() => {
          if (interactive && !validated && !loading) {
            fill?.onFill()
          }
        }}
        onChange={(event) => {
          if (interactive && validated) {
            fill?.onValueChange(event.target.value)
          }
        }}
        className={cn("flex-1", className)}
      />
      <FieldStatusIcon loading={loading} validated={validated} />
    </div>
  )
}

function FormatSelect({
  value,
  placeholder = "Select data format",
  fieldStep,
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  fill,
}: {
  value?: string
  placeholder?: string
  fieldStep: number
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  fill?: FieldFillControl
}) {
  const defaultValue = value ?? ""
  const { loading, validated } = getFieldState(
    fieldStep,
    autoConfigureStep,
    isAutoConfiguring,
    fill?.filled
  )
  const interactive = Boolean(fill)
  const displayValue = validated
    ? fill?.value ?? defaultValue
    : fill?.value ?? ""

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Input
          readOnly={!interactive || loading}
          value={displayValue}
          placeholder={placeholder}
          onFocus={() => {
            if (interactive && !validated && !loading) {
              fill?.onFill()
            }
          }}
          onChange={(event) => {
            if (interactive && validated) {
              fill?.onValueChange(event.target.value)
            }
          }}
          className={cn("pr-9", !validated && !displayValue && "text-muted-foreground")}
        />
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      <FieldStatusIcon loading={loading} validated={validated} />
    </div>
  )
}

function TimeColumnSection({
  selectedField = "eventType",
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  fill,
}: {
  selectedField?: string
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  fill?: FieldFillControl
}) {
  const [mode, setMode] = React.useState("picker")
  const fieldStep = 5
  const { loading, validated } = getFieldState(
    fieldStep,
    autoConfigureStep,
    isAutoConfiguring,
    fill?.filled
  )
  const treeNodes = validated ? TIME_COLUMN_TREE : EMPTY_TIME_COLUMN_TREE

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FieldLabel label="Time column" />
        <FieldStatusIcon loading={loading} validated={validated} />
      </div>
      <SegmentedControl value={mode} onValueChange={setMode}>
        <SegmentedItem value="picker">Time column picker</SegmentedItem>
        <SegmentedItem value="expression">Expression</SegmentedItem>
      </SegmentedControl>
      <p className="text-hint text-muted-foreground">
        By default, data is loaded into a single column named &quot;data&quot; of type VARIANT.
        Select the field from this data that represents the time column for the bronze table.
      </p>
      <div
        className={cn(!validated && fill && "cursor-text")}
        onClick={() => {
          if (fill && !validated && !loading) {
            fill.onFill()
          }
        }}
        onKeyDown={(event) => {
          if (fill && !validated && !loading && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault()
            fill.onFill()
          }
        }}
        role={fill && !validated ? "button" : undefined}
        tabIndex={fill && !validated ? 0 : undefined}
      >
        <Tree
          nodes={treeNodes}
          selectedId={validated ? selectedField : undefined}
          size="default"
          className="max-h-[280px] w-full max-w-[560px] overflow-auto rounded border border-border"
        />
      </div>
    </div>
  )
}

function PreTransformsSection({
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  fill,
  visible = false,
}: {
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  fill?: FieldFillControl
  visible?: boolean
}) {
  const fieldStep = 7
  const { loading, validated } = getFieldState(
    fieldStep,
    autoConfigureStep,
    isAutoConfiguring,
    fill?.filled
  )

  if (!visible) return null

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex items-center gap-2",
          fill && !validated && "cursor-text"
        )}
        onClick={() => {
          if (fill && !validated && !loading) {
            fill.onFill()
          }
        }}
        onKeyDown={(event) => {
          if (fill && !validated && !loading && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault()
            fill.onFill()
          }
        }}
        role={fill && !validated ? "button" : undefined}
        tabIndex={fill && !validated ? 0 : undefined}
      >
        <FieldLabel label="Pre-transforms" hint="[EXPLODE(`Records`) AS data]" />
        <FieldStatusIcon loading={loading} validated={validated} />
      </div>
      {validated ? (
        <>
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
        </>
      ) : null}
    </div>
  )
}

function SchemaHintsSection({
  value,
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  fill,
  visible = false,
}: {
  value?: string
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  fill?: FieldFillControl
  visible?: boolean
}) {
  const fieldStep = 6
  const defaultValue = value ?? ""
  const { loading, validated } = getFieldState(
    fieldStep,
    autoConfigureStep,
    isAutoConfiguring,
    fill?.filled
  )
  const interactive = Boolean(fill)
  const displayValue = validated
    ? fill?.value ?? defaultValue
    : fill?.value ?? ""

  if (!visible) return null

  return (
    <div className="space-y-2">
      <FieldLabel
        label="Schema hints"
        hint="Enter schema hints to customize how columns are mapped and typed."
      />
      <div className="flex items-center gap-2">
        <Input
          value={displayValue}
          placeholder="Enter schema hints"
          readOnly={!interactive || loading}
          onFocus={() => {
            if (interactive && !validated && !loading) {
              fill?.onFill()
            }
          }}
          onChange={(event) => {
            if (interactive && validated) {
              fill?.onValueChange(event.target.value)
            }
          }}
          className="font-mono text-sm"
        />
        <FieldStatusIcon loading={loading} validated={validated} />
      </div>
    </div>
  )
}

function useTableConfigurationFieldFill(
  autoConfigureStep: number,
  isAutoConfiguring: boolean
) {
  const [manualFilled, setManualFilled] = React.useState<Set<number>>(() => new Set())
  const [fieldValues, setFieldValues] = React.useState<Record<number, string>>({})

  const isFieldFilled = React.useCallback(
    (fieldStep: number) =>
      autoConfigureStep >= fieldStep || manualFilled.has(fieldStep),
    [autoConfigureStep, manualFilled]
  )

  const fillField = React.useCallback(
    (fieldStep: number, defaultValue: string) => {
      if (isAutoConfiguring || isFieldFilled(fieldStep)) return
      setManualFilled((current) => new Set(current).add(fieldStep))
      setFieldValues((current) => ({
        ...current,
        [fieldStep]: current[fieldStep] ?? defaultValue,
      }))
    },
    [isAutoConfiguring, isFieldFilled]
  )

  const updateFieldValue = React.useCallback((fieldStep: number, value: string) => {
    setFieldValues((current) => ({ ...current, [fieldStep]: value }))
  }, [])

  const getFillControl = React.useCallback(
    (fieldStep: number, defaultValue: string): FieldFillControl => ({
      filled: manualFilled.has(fieldStep),
      value: manualFilled.has(fieldStep)
        ? fieldValues[fieldStep] ?? defaultValue
        : "",
      onFill: () => fillField(fieldStep, defaultValue),
      onValueChange: (value) => updateFieldValue(fieldStep, value),
    }),
    [fieldValues, fillField, manualFilled, updateFieldValue]
  )

  const allFieldsFilled = React.useMemo(
    () =>
      Array.from({ length: AUTO_CONFIGURE_FIELD_COUNT }, (_, index) =>
        isFieldFilled(index + 1)
      ).every(Boolean),
    [isFieldFilled]
  )

  const schemaHintsVisible =
    isFieldFilled(5) ||
    autoConfigureStep >= 6 ||
    (isAutoConfiguring && autoConfigureStep >= 5)

  const preTransformsVisible =
    isFieldFilled(6) ||
    autoConfigureStep >= 6 ||
    (isAutoConfiguring && autoConfigureStep >= 6)

  const allManualFieldsFilled = React.useMemo(
    () =>
      Array.from({ length: AUTO_CONFIGURE_FIELD_COUNT }, (_, index) =>
        manualFilled.has(index + 1)
      ).every(Boolean),
    [manualFilled]
  )

  return {
    getFillControl,
    allFieldsFilled,
    allManualFieldsFilled,
    schemaHintsVisible,
    preTransformsVisible,
  }
}

/** Figma 718:99839 / 718:99837 — Table configuration empty + incremental auto-configure */
export function TableConfigurationExpanded({
  onAutoConfigure,
  onAutoConfigureMenuSelect,
  onManualConfigure,
  autoConfigureStep = 0,
  isAutoConfiguring = false,
  autoConfigureLabel = "Auto-configure",
}: {
  onAutoConfigure?: () => void
  onAutoConfigureMenuSelect?: (id: AutoConfigureMenuItemId) => void
  onManualConfigure?: () => void
  autoConfigureStep?: number
  isAutoConfiguring?: boolean
  autoConfigureLabel?: string
}) {
  const step = autoConfigureStep
  const {
    getFillControl,
    allFieldsFilled,
    allManualFieldsFilled,
    schemaHintsVisible,
    preTransformsVisible,
  } = useTableConfigurationFieldFill(step, isAutoConfiguring)

  const handleMenuSelect = (id: AutoConfigureMenuItemId) => {
    if (id === "manual") {
      if (!allManualFieldsFilled) return
      onManualConfigure?.()
    }
    onAutoConfigureMenuSelect?.(id)
  }

  return (
    <section className="rounded border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-normal leading-6 text-foreground">Table configuration</h3>
        <AutoConfigureSplitButton
          disabled={isAutoConfiguring || allFieldsFilled}
          dropdownDisabled={isAutoConfiguring}
          menuItemDisabled={{ manual: !allManualFieldsFilled }}
          label={autoConfigureLabel}
          onAutoConfigure={onAutoConfigure}
          onMenuSelect={handleMenuSelect}
        />
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
            <ValidatedInput
              fieldStep={1}
              autoConfigureStep={step}
              isAutoConfiguring={isAutoConfiguring}
              value={AUTO_CONFIGURE_VALUES.source}
              placeholder="Enter data source"
              fill={getFillControl(1, AUTO_CONFIGURE_VALUES.source)}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel
              label="Source type"
              hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            />
            <ValidatedInput
              fieldStep={2}
              autoConfigureStep={step}
              isAutoConfiguring={isAutoConfiguring}
              value={AUTO_CONFIGURE_VALUES.sourceType}
              placeholder="Enter data source type"
              fill={getFillControl(2, AUTO_CONFIGURE_VALUES.sourceType)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel label="Format" />
          <FormatSelect
            fieldStep={3}
            autoConfigureStep={step}
            isAutoConfiguring={isAutoConfiguring}
            value={AUTO_CONFIGURE_VALUES.format}
            fill={getFillControl(3, AUTO_CONFIGURE_VALUES.format)}
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
          <ValidatedInput
            fieldStep={4}
            autoConfigureStep={step}
            isAutoConfiguring={isAutoConfiguring}
            value={AUTO_CONFIGURE_VALUES.bronzeTableName}
            placeholder="Enter bronze table name"
            fill={getFillControl(4, AUTO_CONFIGURE_VALUES.bronzeTableName)}
          />
        </div>
        <TimeColumnSection
          selectedField={AUTO_CONFIGURE_VALUES.timeColumn}
          autoConfigureStep={step}
          isAutoConfiguring={isAutoConfiguring}
          fill={getFillControl(5, AUTO_CONFIGURE_VALUES.timeColumn)}
        />
        <SchemaHintsSection
          value={AUTO_CONFIGURE_VALUES.schemaHints}
          autoConfigureStep={step}
          isAutoConfiguring={isAutoConfiguring}
          visible={schemaHintsVisible}
          fill={getFillControl(6, AUTO_CONFIGURE_VALUES.schemaHints)}
        />
        <PreTransformsSection
          autoConfigureStep={step}
          isAutoConfiguring={isAutoConfiguring}
          visible={preTransformsVisible}
          fill={getFillControl(7, "EXPLODE")}
        />
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
            <ValidatedInput
              fieldStep={1}
              autoConfigureStep={7}
              value="aws"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel
              label="Source type"
              hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            />
            <ValidatedInput
              fieldStep={2}
              autoConfigureStep={7}
              value="CloudTrail"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel label="Format" />
          <FormatSelect
            fieldStep={3}
            autoConfigureStep={7}
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
          <ValidatedInput
            fieldStep={4}
            autoConfigureStep={7}
            value="aws_cloudtrail_1"
          />
        </div>
        <TimeColumnSection selectedField="eventType" autoConfigureStep={7} />
        <SchemaHintsSection value="`Records` ARRAY<VARIANT>" autoConfigureStep={7} visible />
        <PreTransformsSection autoConfigureStep={7} visible />
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

function PreviewTableSkeleton() {
  const skeletonBar = "h-2 rounded-full bg-[rgba(144,164,181,0.16)]"
  return (
    <div className="space-y-0">
      <div className="flex h-10 items-center border-b border-border px-2">
        <div className={cn(skeletonBar, "w-24")} />
        <div className={cn(skeletonBar, "ml-[180px] w-20")} />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex h-10 items-center border-b border-border px-2">
          <div className={cn(skeletonBar, "w-[180px]")} />
          <div className={cn(skeletonBar, "ml-4 w-full max-w-[520px]")} />
        </div>
      ))}
    </div>
  )
}

/** Figma 718:101161 — resizable bottom data preview panel */
export function DataPreviewBottomPanel({
  open,
  loading = false,
  height = DEFAULT_PANEL_HEIGHT,
  onHeightChange,
  onClose,
}: {
  open: boolean
  loading?: boolean
  height?: number
  onHeightChange?: (height: number) => void
  onClose?: () => void
}) {
  const dragState = React.useRef<{ startY: number; startHeight: number } | null>(null)

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    dragState.current = { startY: event.clientY, startHeight: height }

    const handleMove = (moveEvent: PointerEvent) => {
      if (!dragState.current) return
      const delta = dragState.current.startY - moveEvent.clientY
      const nextHeight = Math.min(
        MAX_PANEL_HEIGHT,
        Math.max(MIN_PANEL_HEIGHT, dragState.current.startHeight + delta)
      )
      onHeightChange?.(nextHeight)
    }

    const handleUp = () => {
      dragState.current = null
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  if (!open) return null

  const contentHeight = Math.max(120, height - 40)

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 flex flex-col border-t border-[#d1d9e1] bg-[#f6f7f9] shadow-[var(--shadow-db-sm)]"
      style={{ height }}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize preview panel"
        onPointerDown={handleResizeStart}
        className="group absolute -top-1.5 left-0 right-0 z-10 flex h-3 cursor-ns-resize items-center justify-center"
      >
        <div className="h-1 w-12 rounded-full bg-border opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#d1d9e1] bg-[#f6f7f9] px-2">
        <p className="text-[13px] font-semibold leading-5 text-foreground">
          {AUTO_CONFIGURE_VALUES.bronzeTableName}
        </p>
        <div className="flex items-center">
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Collapse preview">
            <ChevronDownIcon size={16} className="text-muted-foreground" />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Close preview" onClick={onClose}>
            <CloseIcon size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-background" style={{ height: contentHeight }}>
        {loading ? (
          <PreviewTableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-10 w-[212px] min-w-[212px] border-b border-border px-2 text-sm font-bold text-foreground">
                  event_time
                </TableHead>
                <TableHead className="h-10 min-w-[320px] border-b border-border px-2 text-sm font-bold text-foreground">
                  event_data
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PREVIEW_ROWS.map((row) => (
                <TableRow key={row.eventTime} className="hover:bg-transparent">
                  <TableCell className="h-10 border-b border-border px-2 py-0 text-sm text-foreground">
                    {row.eventTime}
                  </TableCell>
                  <TableCell className="h-10 border-b border-border px-2 py-0 font-mono text-sm text-foreground">
                    <span className="block truncate">{row.eventData}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export function useAutoConfigureSequence(onComplete?: () => void) {
  const [step, setStep] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const timersRef = React.useRef<number[]>([])

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  React.useEffect(() => clearTimers, [clearTimers])

  const start = React.useCallback(() => {
    clearTimers()
    setIsRunning(true)
    setStep(0)

    const interval = AUTO_CONFIGURE_STEP_MS
    for (let i = 1; i <= AUTO_CONFIGURE_FIELD_COUNT; i += 1) {
      const id = window.setTimeout(() => setStep(i), interval * i)
      timersRef.current.push(id)
    }

    const completeId = window.setTimeout(() => {
      setIsRunning(false)
      onComplete?.()
    }, AUTO_CONFIGURE_DURATION_MS)
    timersRef.current.push(completeId)
  }, [clearTimers, onComplete])

  const reset = React.useCallback(() => {
    clearTimers()
    setStep(0)
    setIsRunning(false)
  }, [clearTimers])

  return { step, isRunning, start, reset }
}
