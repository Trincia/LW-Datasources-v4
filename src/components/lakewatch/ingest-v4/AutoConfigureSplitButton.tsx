"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "@/components/icons"
import { NormalizationPresetModal } from "@/components/lakewatch/ingest-v4/NormalizationPresetModal"
import {
  CLOUDTRAIL_PRESET_ID,
  type NormalizationPreset,
} from "@/components/lakewatch/ingest-v4/normalizationPresets"
import { CLOUDTRAIL_PRESET_PIPELINE_HREF } from "@/components/lakewatch/ingest-v4/pipelineDagShared"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const AUTO_CONFIGURE_MENU_ITEMS = [
  { id: "genie", label: "Auto-configure with Genie" },
  { id: "normalize-preset", label: "Normalize with preset" },
  { id: "manual", label: "Manual configuration" },
] as const

export type AutoConfigureMenuItemId = (typeof AUTO_CONFIGURE_MENU_ITEMS)[number]["id"]

export function AutoConfigureSplitButton({
  disabled = false,
  label = "Auto-configure",
  onAutoConfigure,
  onMenuSelect,
  onNormalizePresetSelect,
}: {
  disabled?: boolean
  label?: string
  onAutoConfigure?: () => void
  onMenuSelect?: (id: AutoConfigureMenuItemId) => void
  onNormalizePresetSelect?: (preset: NormalizationPreset) => void
}) {
  const router = useRouter()
  const [presetModalOpen, setPresetModalOpen] = React.useState(false)

  const openPresetModal = React.useCallback(() => {
    // Defer until after the dropdown closes so Radix focus management doesn't block the dialog.
    window.setTimeout(() => setPresetModalOpen(true), 0)
  }, [])

  const handleMenuSelect = (id: AutoConfigureMenuItemId) => {
    if (id === "genie") {
      onAutoConfigure?.()
      return
    }
    if (id === "normalize-preset") {
      openPresetModal()
      return
    }
    onMenuSelect?.(id)
  }

  const handlePresetSelect = (preset: NormalizationPreset) => {
    if (preset.id === CLOUDTRAIL_PRESET_ID) {
      router.push(CLOUDTRAIL_PRESET_PIPELINE_HREF)
      return
    }
    onNormalizePresetSelect?.(preset)
  }

  return (
    <>
      <div className="flex shrink-0 overflow-hidden rounded shadow-xs">
        <Button
          variant="primary"
          size="sm"
          disabled={disabled}
          className="rounded-r-none"
          onClick={onAutoConfigure}
        >
          {label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="primary"
              size="icon-sm"
              disabled={disabled}
              className="rounded-l-none border-l border-primary-foreground/20"
              aria-label="Auto-configure options"
            >
              <ChevronDownIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[220px]">
            {AUTO_CONFIGURE_MENU_ITEMS.map(({ id, label: itemLabel }) => (
              <DropdownMenuItem
                key={id}
                onSelect={(event) => {
                  event.preventDefault()
                  handleMenuSelect(id)
                }}
              >
                {itemLabel}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <NormalizationPresetModal
        open={presetModalOpen}
        onOpenChange={setPresetModalOpen}
        onSelectPreset={handlePresetSelect}
      />
    </>
  )
}
