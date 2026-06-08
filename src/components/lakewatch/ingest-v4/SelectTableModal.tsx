"use client"

import * as React from "react"
import {
  CatalogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  RefreshIcon,
  SearchIcon,
  TableIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FilterPill } from "@/components/ui/filter-pill"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"

const CATALOGS = [
  "group_7_demo",
  "husky_v2",
  "intel",
  "jyuan_test",
  "lw_citadel",
  "lw_db_sentinel",
  "lw_demo_workshop",
  "lw_on_external_location",
  "lw_pentest_1",
  "lw_pentest_5",
  "aws-cloudtrail",
] as const

const AWS_CLOUDTRAIL_TABLE = "aws-cloudtrail-logs"
export const AWS_CLOUDTRAIL_LOCATION = "s3://aws-cloudtrail-logs-905418055418-719340f6/"
const SECURITY_LAKE_CATALOG = "security_lake"
const SECURITY_LAKE_TABLE = "crowdstrike_fdr"

type ModalView = "catalogs" | "aws-cloudtrail-folder" | "security-lake-folder"

export function SelectTableModal({
  open,
  onOpenChange,
  onSelect,
  mode = "cloud-storage",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect?: (location: string) => void
  mode?: "cloud-storage" | "existing-table"
}) {
  const [tab, setTab] = React.useState<"for-you" | "all">("all")
  const [search, setSearch] = React.useState("")
  const [view, setView] = React.useState<ModalView>("catalogs")
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) {
      setTab("all")
      setSearch("")
      setView("catalogs")
      setSelectedTable(null)
    }
  }, [open])

  const filteredCatalogs = React.useMemo(() => {
    const catalogs =
      mode === "existing-table"
        ? [...CATALOGS.filter((name) => name !== "aws-cloudtrail"), SECURITY_LAKE_CATALOG]
        : CATALOGS
    const q = search.trim().toLowerCase()
    if (!q) return catalogs
    return catalogs.filter((name) => name.toLowerCase().includes(q))
  }, [search, mode])

  const handleCatalogClick = (name: string) => {
    if (name === "aws-cloudtrail") {
      setView("aws-cloudtrail-folder")
      setSelectedTable(null)
    }
    if (name === SECURITY_LAKE_CATALOG) {
      setView("security-lake-folder")
      setSelectedTable(null)
    }
  }

  const handleSelect = () => {
    if (selectedTable === AWS_CLOUDTRAIL_TABLE) {
      onSelect?.(AWS_CLOUDTRAIL_LOCATION)
      onOpenChange(false)
      return
    }
    if (selectedTable === SECURITY_LAKE_TABLE) {
      onSelect?.(EXISTING_TABLE_LOCATION)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[85vh] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[480px]"
      >
        <DialogHeader className="gap-0 border-b border-border px-6 py-4">
          <DialogTitle className="text-base font-semibold leading-6 text-foreground">
            Select a table
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="flex min-h-0 flex-1 flex-col gap-3 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <SearchIcon
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                className="pl-9"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search catalogs"
              />
            </div>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Filter">
              <FilterIcon size={16} className="text-muted-foreground" />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Refresh">
              <RefreshIcon size={16} className="text-muted-foreground" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <FilterPill active={tab === "for-you"} onClick={() => setTab("for-you")}>
              For you
            </FilterPill>
            <FilterPill active={tab === "all"} onClick={() => setTab("all")}>
              All
            </FilterPill>
          </div>

          {view === "aws-cloudtrail-folder" ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-fit gap-1 px-0 text-primary hover:bg-transparent"
                onClick={() => {
                  setView("catalogs")
                  setSelectedTable(null)
                }}
              >
                <ChevronLeftIcon size={16} />
                aws-cloudtrail
              </Button>
              <p className="text-hint text-muted-foreground">Tables</p>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setSelectedTable(AWS_CLOUDTRAIL_TABLE)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition-colors hover:bg-secondary/60",
                    selectedTable === AWS_CLOUDTRAIL_TABLE && "bg-primary/5 ring-1 ring-primary/20"
                  )}
                >
                  <TableIcon size={16} className="shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate text-foreground">{AWS_CLOUDTRAIL_TABLE}</span>
                </button>
              </div>
            </div>
          ) : view === "security-lake-folder" ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-fit gap-1 px-0 text-primary hover:bg-transparent"
                onClick={() => {
                  setView("catalogs")
                  setSelectedTable(null)
                }}
              >
                <ChevronLeftIcon size={16} />
                security_lake
              </Button>
              <p className="text-hint text-muted-foreground">Tables</p>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setSelectedTable(SECURITY_LAKE_TABLE)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition-colors hover:bg-secondary/60",
                    selectedTable === SECURITY_LAKE_TABLE && "bg-primary/5 ring-1 ring-primary/20"
                  )}
                >
                  <TableIcon size={16} className="shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate text-foreground">{SECURITY_LAKE_TABLE}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <p className="text-hint text-muted-foreground">All catalogs</p>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {filteredCatalogs.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleCatalogClick(name)}
                    className="flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    <CatalogIcon size={16} className="shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 truncate text-foreground">{name}</span>
                    <ChevronRightIcon size={16} className="shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter className="border-t border-border px-6 py-4">
          <Button type="button" variant="default" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={
              selectedTable !== AWS_CLOUDTRAIL_TABLE && selectedTable !== SECURITY_LAKE_TABLE
            }
            onClick={handleSelect}
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
