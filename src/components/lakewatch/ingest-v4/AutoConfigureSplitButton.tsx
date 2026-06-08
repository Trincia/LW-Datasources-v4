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
import { cn } from "@/lib/utils"

export const AUTO_CONFIGURE_MENU_ITEMS = [
  { id: "normalize-preset", label: "Normalize with preset" },
  { id: "manual", label: "Configure with manual input" },
] as const

export const SAVE_TO_SILVER_MENU_ITEM = {
  id: "save-to-silver",
  label: "Save to Silver table",
} as const

export type AutoConfigureMenuItemId =
  | (typeof AUTO_CONFIGURE_MENU_ITEMS)[number]["id"]
  | typeof SAVE_TO_SILVER_MENU_ITEM.id

type AutoConfigureMenuItem = {
  id: AutoConfigureMenuItemId
  label: string
}

export function AutoConfigureSplitButton({
  disabled = false,
  dropdownDisabled = false,
  menuItemDisabled,
  menuItems = AUTO_CONFIGURE_MENU_ITEMS,
  label = "Auto-configure",
  onAutoConfigure,
  onMenuSelect,
  onNormalizePresetSelect,
}: {
  disabled?: boolean
  dropdownDisabled?: boolean
  menuItemDisabled?: Partial<Record<AutoConfigureMenuItemId, boolean>>
  menuItems?: readonly AutoConfigureMenuItem[]
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

  const effectiveDropdownDisabled = dropdownDisabled ?? disabled
  const primaryNativeDisabled = disabled && effectiveDropdownDisabled
  const primaryLocked = disabled && !effectiveDropdownDisabled

  return (
    <>
      <div className="flex shrink-0 overflow-hidden rounded shadow-xs">
        <Button
          variant="primary"
          size="sm"
          disabled={primaryNativeDisabled}
          className={cn(
            "rounded-r-none",
            primaryLocked && "pointer-events-none disabled:opacity-100"
          )}
          onClick={primaryLocked ? undefined : onAutoConfigure}
        >
          {label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="primary"
              size="icon-sm"
              disabled={effectiveDropdownDisabled}
              className="rounded-l-none border-l border-primary-foreground/20"
              aria-label="Auto-configure options"
            >
              <ChevronDownIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[220px]">
            {menuItems.map(({ id, label: itemLabel }) => (
              <DropdownMenuItem
                key={id}
                disabled={menuItemDisabled?.[id]}
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
