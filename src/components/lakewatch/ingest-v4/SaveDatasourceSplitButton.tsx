"use client"

import { ChevronDownIcon, PlusIcon, SaveIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** Figma 719:96511 */
export const SAVE_DATASOURCE_MENU_ITEMS = [
  { id: "save", label: "Save datasource", Icon: SaveIcon },
  { id: "add-normalization", label: "Add normalization", Icon: PlusIcon },
] as const

/** Figma 718:104334 (disabled) / 718:104314 (active) */
export function SaveDatasourceSplitButton({
  disabled = true,
  onSave,
  onMenuSelect,
}: {
  disabled?: boolean
  onSave?: () => void
  onMenuSelect?: (id: (typeof SAVE_DATASOURCE_MENU_ITEMS)[number]["id"]) => void
}) {
  const handleMenuSelect = (id: (typeof SAVE_DATASOURCE_MENU_ITEMS)[number]["id"]) => {
    if (id === "save") {
      onSave?.()
      return
    }
    onMenuSelect?.(id)
  }

  return (
    <div className="flex shrink-0 overflow-hidden rounded shadow-xs">
      <Button
        variant="primary"
        size="sm"
        disabled={disabled}
        className="rounded-r-none"
        onClick={onSave}
      >
        Save datasource
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="primary"
            size="icon-sm"
            disabled={disabled}
            className="rounded-l-none border-l border-primary-foreground/20"
            aria-label="Save datasource options"
          >
            <ChevronDownIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px] p-1 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
          {SAVE_DATASOURCE_MENU_ITEMS.map(({ id, label, Icon }) => (
            <DropdownMenuItem
              key={id}
              className="gap-2 py-1.5 pl-2 pr-3"
              onSelect={() => handleMenuSelect(id)}
            >
              <Icon size={16} className="shrink-0 text-muted-foreground" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
