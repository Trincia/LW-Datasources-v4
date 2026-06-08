"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import {
  ChevronDownIcon,
  NotebookIcon,
  SparkleRectangleIcon,
  TableIcon,
} from "@/components/icons"
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

/** Figma 733:45933 — Add transform dropdown menu */
export const ADD_TRANSFORM_MENU_ITEMS = [
  {
    id: "managed-preset",
    label: "Use managed preset",
    icon: SparkleRectangleIcon,
  },
  {
    id: "table-builder",
    label: "Add with table builder",
    icon: TableIcon,
  },
  {
    id: "notebook",
    label: "Add with notebook function",
    icon: NotebookIcon,
  },
] as const

export type AddTransformMenuItemId = (typeof ADD_TRANSFORM_MENU_ITEMS)[number]["id"]

/** Opaque canvas button surface — avoids dot-grid bleed on semi-transparent hover tints */
const ADD_TRANSFORM_BUTTON_SURFACE_CLASS =
  "border-border bg-background text-muted-foreground shadow-xs hover:!bg-secondary hover:text-foreground hover:border-primary active:!bg-secondary data-[state=open]:!bg-secondary data-[state=open]:border-primary data-[state=open]:text-foreground"

export function AddTransformSplitButton({
  className,
  onAddTransform,
  onMenuSelect,
  onManagedPresetSelect,
}: {
  className?: string
  onAddTransform?: () => void
  onMenuSelect?: (id: AddTransformMenuItemId) => void
  onManagedPresetSelect?: (preset: NormalizationPreset) => void
}) {
  const router = useRouter()
  const [presetModalOpen, setPresetModalOpen] = React.useState(false)

  const openPresetModal = React.useCallback(() => {
    window.setTimeout(() => setPresetModalOpen(true), 0)
  }, [])

  const handleMenuSelect = (id: AddTransformMenuItemId) => {
    if (id === "managed-preset") {
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
    onManagedPresetSelect?.(preset)
  }

  return (
    <>
      <div className={cn("flex overflow-hidden rounded shadow-xs", className)}>
        <Button
          variant="default"
          size="sm"
          className={cn("gap-1 rounded-r-none border", ADD_TRANSFORM_BUTTON_SURFACE_CLASS)}
          type="button"
          onClick={onAddTransform}
        >
          <Plus className="size-4" aria-hidden />
          Add transform
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="icon-sm"
              className={cn(
                "rounded-l-none border border-l-0",
                ADD_TRANSFORM_BUTTON_SURFACE_CLASS
              )}
              aria-label="Add transform options"
              type="button"
            >
              <ChevronDownIcon size={16} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[240px] rounded border-border p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            {ADD_TRANSFORM_MENU_ITEMS.map(({ id, label, icon: Icon }) => (
              <DropdownMenuItem
                key={id}
                className="gap-2 rounded-sm py-1 pl-2 pr-3 text-[13px] leading-5 text-foreground focus:bg-accent focus:text-foreground"
                onSelect={(event) => {
                  event.preventDefault()
                  handleMenuSelect(id)
                }}
              >
                <Icon size={16} className="shrink-0 text-muted-foreground" />
                {label}
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
