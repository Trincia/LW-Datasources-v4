"use client"

import * as React from "react"
import { SearchIcon, TableIcon } from "@/components/icons"
import {
  CLOUDTRAIL_PRESET_ID,
  NORMALIZATION_PRESETS,
  PRESET_APPLY_DELAY_MS,
  type NormalizationPreset,
} from "@/components/lakewatch/ingest-v4/normalizationPresets"
import { NormalizationPresetLogo } from "@/components/lakewatch/ingest-v4/NormalizationPresetLogo"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

/** Figma 722:23710 — managed normalization preset picker */
export function NormalizationPresetModal({
  open,
  onOpenChange,
  onSelectPreset,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPreset?: (preset: NormalizationPreset) => void
}) {
  const [query, setQuery] = React.useState("")
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [applyingId, setApplyingId] = React.useState<string | null>(null)
  const applyTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (applyTimerRef.current) {
        window.clearTimeout(applyTimerRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      setHoveredId(null)
      setSelectedId(null)
      setApplyingId(null)
      if (applyTimerRef.current) {
        window.clearTimeout(applyTimerRef.current)
        applyTimerRef.current = null
      }
    }
  }, [open])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return NORMALIZATION_PRESETS
    return NORMALIZATION_PRESETS.filter((preset) =>
      preset.label.toLowerCase().includes(q)
    )
  }, [query])

  const resetAndClose = () => {
    onOpenChange(false)
    setQuery("")
    setHoveredId(null)
    setSelectedId(null)
    setApplyingId(null)
  }

  const handleSelect = (preset: NormalizationPreset) => {
    if (applyingId) return

    setSelectedId(preset.id)

    if (preset.id === CLOUDTRAIL_PRESET_ID) {
      setApplyingId(preset.id)
      applyTimerRef.current = window.setTimeout(() => {
        onSelectPreset?.(preset)
        resetAndClose()
      }, PRESET_APPLY_DELAY_MS)
      return
    }

    onSelectPreset?.(preset)
    resetAndClose()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="z-[110] flex max-h-[85vh] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] sm:max-w-[520px] sm:rounded-lg"
      >
        <DialogHeader className="gap-1.5 pr-8 text-left">
          <DialogTitle className="text-2xl font-bold leading-none text-foreground">
            Managed normalization presets
          </DialogTitle>
          <p className="text-base font-medium leading-none text-foreground">
            Select a preset to apply field mappings, schema hints, and normalization rules.
          </p>
        </DialogHeader>

        <DialogBody className="mt-6 min-h-0 flex-1 gap-5 overflow-y-auto p-0">
          <div className="relative w-full max-w-[459px]">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-8 border-border pl-9 shadow-xs"
              placeholder="Search datasource presets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search datasource presets"
            />
          </div>

          <div className="flex w-full max-w-[459px] flex-col gap-1.5">
            {filtered.map((preset) => (
              <PresetRow
                key={preset.id}
                preset={preset}
                selected={selectedId === preset.id}
                hovered={hoveredId === preset.id}
                applying={applyingId === preset.id}
                disabled={!!applyingId && applyingId !== preset.id}
                onHover={setHoveredId}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function PresetRow({
  preset,
  selected,
  hovered,
  applying,
  disabled,
  onHover,
  onSelect,
}: {
  preset: NormalizationPreset
  selected: boolean
  hovered: boolean
  applying: boolean
  disabled: boolean
  onHover: (id: string | null) => void
  onSelect: (preset: NormalizationPreset) => void
}) {
  const isActive = selected || applying

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex min-h-[58px] w-full items-center gap-2 rounded-lg border p-2 text-left transition-colors",
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : hovered
            ? "border-primary/40 bg-primary/[0.04]"
            : "border-border bg-background hover:border-primary/40 hover:bg-primary/[0.04]",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onMouseEnter={() => onHover(preset.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(preset.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(preset)}
    >
      <NormalizationPresetLogo preset={preset} />
      <span className="min-w-0 flex-1 text-[13px] leading-5 text-foreground">{preset.label}</span>
      {preset.recommended ? (
        <Badge variant="purple" className="shrink-0 rounded-lg px-1 text-xs leading-4">
          Recommended
        </Badge>
      ) : null}
      {applying ? (
        <Spinner size="small" className="shrink-0 text-primary" />
      ) : preset.showMedallionIcons ? (
        <div className="flex shrink-0 items-center gap-1" aria-hidden>
          <TableIcon size={16} className="text-[#b45309]" />
          <TableIcon size={16} className="text-muted-foreground" />
          <TableIcon size={16} className="text-[#ca8a04]" />
        </div>
      ) : null}
    </button>
  )
}
