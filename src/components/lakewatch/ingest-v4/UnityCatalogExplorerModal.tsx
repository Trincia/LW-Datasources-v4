"use client"

import * as React from "react"
import { ChevronDown, Star } from "lucide-react"
import {
  CatalogGearIcon,
  CatalogIcon,
  CopyIcon,
  FilterIcon,
  OverflowIcon,
  PlusIcon,
  RefreshIcon,
  SchemaIcon,
  SearchIcon,
  TableIcon,
} from "@/components/icons"
import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FilterPill } from "@/components/ui/filter-pill"
import { Input } from "@/components/ui/input"
import { Tree, type TreeNode } from "@/components/ui/tree"
import { cn } from "@/lib/utils"

const DEMO_TABLE = EXISTING_TABLE_LOCATION
const DEFAULT_OWNER = "0a74b751-d7e8-4b9a-bc6d-e4f5g6h7i8j9"

const CATALOG_TREE: TreeNode[] = [
  {
    id: "my-org",
    label: "My organization",
    defaultExpanded: true,
    children: [
      { id: "dh_lakewatch_demo", label: "dh_lakewatch_demo", icon: CatalogIcon },
      { id: "system", label: "system", icon: CatalogIcon },
      { id: "ai_gateway", label: "ai_gateway", icon: CatalogIcon },
      { id: "ai_gateway_beta", label: "ai_gateway_beta", icon: CatalogIcon },
      {
        id: "lakewatch",
        label: "lakewatch",
        icon: CatalogIcon,
        defaultExpanded: true,
        children: [
          {
            id: "bronze",
            label: "bronze",
            icon: SchemaIcon,
            defaultExpanded: true,
            children: [
              { id: "bronze-tables", label: "Tables (50)", icon: TableIcon },
              { id: "bronze-volumes", label: "Volumes (1)", icon: CatalogIcon },
            ],
          },
          { id: "default", label: "default", icon: SchemaIcon },
          { id: "gold", label: "gold", icon: SchemaIcon },
          { id: "information_schema", label: "information_schema", icon: SchemaIcon },
          { id: "internal", label: "internal", icon: SchemaIcon },
          { id: "presets", label: "presets", icon: SchemaIcon },
          { id: "silver", label: "silver", icon: SchemaIcon },
        ],
      },
      { id: "sec_lakehouse", label: "sec_lakehouse", icon: CatalogIcon },
      { id: "security_logs", label: "security_logs", icon: CatalogIcon },
      { id: "vulnops", label: "vulnops", icon: CatalogIcon },
      { id: "acs", label: "acs", icon: CatalogIcon },
    ],
  },
  {
    id: "delta-shares",
    label: "Delta Shares Received",
    icon: CatalogIcon,
    defaultExpanded: true,
    children: [
      { id: "samples", label: "samples", icon: CatalogIcon },
      {
        id: "databricks_simulated_retail",
        label: "databricks_simulated_retail_c...",
        icon: CatalogIcon,
      },
    ],
  },
  {
    id: "outside-workspace",
    label: "Outside this workspace",
    icon: CatalogIcon,
    defaultExpanded: true,
    children: [{ id: "sat_catalog", label: "sat_catalog", icon: CatalogIcon }],
  },
]

type CatalogTableRow = {
  id: string
  name: string
  owner: string
  createdAt: string
  popularity: number[]
}

const BRONZE_TABLE_NAMES = [
  DEMO_TABLE,
  "__index-lakewatch-ai_gateway_agent_payload",
  "__index-lakewatch-ai_gateway_endpoint_usage",
  "__index-lakewatch-ai_gateway_evaluation_payload",
  "__index-lakewatch-ai_gateway_payload",
  "__index-lakewatch-ai_gateway_request_payload",
  "__index-lakewatch-ai_gateway_response_payload",
  "__index-lakewatch-ai_gateway_tool_payload",
  "__index-lakewatch-ai_gateway_trace_payload",
  "__index-lakewatch-aws_cloudtrail",
  "__index-lakewatch-c2intelfeeds",
  "__index-lakewatch-email",
  "__index-lakewatch-github_audit",
  "__index-lakewatch-linux_syslog",
  "__index-lakewatch-microsoft_winevtlog",
  "__index-lakewatch-slack_access_logs",
] as const

const CREATED_AT_VALUES = [
  "Jun 08, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "Apr 20, 2026",
  "May 26, 2026",
  "Apr 12, 2026",
  "May 26, 2026",
  "May 26, 2026",
  "May 26, 2026",
  "May 26, 2026",
  "May 26, 2026",
]

const POPULARITY_VALUES: number[][] = [
  [2, 4, 3, 5],
  [1, 3, 2, 4],
  [2, 2, 3, 3],
  [1, 2, 4, 2],
  [3, 3, 2, 5],
  [2, 1, 3, 2],
  [4, 3, 4, 3],
  [2, 4, 2, 4],
  [3, 2, 4, 3],
  [4, 4, 3, 5],
  [2, 3, 3, 2],
  [1, 2, 2, 3],
  [3, 3, 4, 4],
  [2, 4, 3, 2],
  [1, 3, 4, 3],
  [3, 2, 3, 4],
]

const BRONZE_TABLES: CatalogTableRow[] = BRONZE_TABLE_NAMES.map((name, index) => ({
  id: name,
  name,
  owner: DEFAULT_OWNER,
  createdAt: CREATED_AT_VALUES[index] ?? "Apr 20, 2026",
  popularity: POPULARITY_VALUES[index] ?? [2, 3, 2, 3],
}))

function formatOwner(owner: string) {
  if (owner.length <= 18) return owner
  return `${owner.slice(0, 13)}-...`
}

function PopularityBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex h-4 items-end gap-[2px]" aria-hidden>
      {values.map((value, index) => (
        <span
          key={index}
          className="w-[3px] rounded-[1px] bg-[#90a4b5]"
          style={{ height: `${Math.max(4, (value / max) * 14)}px` }}
        />
      ))}
    </div>
  )
}

function ObjectTypeTabs({
  active,
  onChange,
}: {
  active: "tables" | "volumes" | "models" | "functions"
  onChange: (tab: "tables" | "volumes" | "models" | "functions") => void
}) {
  const tabs = [
    { id: "tables" as const, label: "Tables 50" },
    { id: "volumes" as const, label: "Volumes 1" },
    { id: "models" as const, label: "Models 0" },
    { id: "functions" as const, label: "Functions 0" },
  ]

  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded px-2 py-1 text-[13px] leading-5 transition-colors",
            active === tab.id
              ? "bg-primary/10 font-semibold text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/** Unity Catalog Explorer — existing-table browse modal */
export function UnityCatalogExplorerModal({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect?: (location: string) => void
}) {
  const [leftTab, setLeftTab] = React.useState<"for-you" | "all">("all")
  const [treeSearch, setTreeSearch] = React.useState("")
  const [selectedTreeId, setSelectedTreeId] = React.useState("bronze")
  const [objectTab, setObjectTab] = React.useState<"tables" | "volumes" | "models" | "functions">(
    "tables"
  )
  const [tableFilter, setTableFilter] = React.useState("")
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) {
      setLeftTab("all")
      setTreeSearch("")
      setSelectedTreeId("bronze")
      setObjectTab("tables")
      setTableFilter("")
      setHoveredRowId(null)
    }
  }, [open])

  const filteredTables = React.useMemo(() => {
    const q = tableFilter.trim().toLowerCase()
    if (!q) return BRONZE_TABLES
    return BRONZE_TABLES.filter((row) => row.name.toLowerCase().includes(q))
  }, [tableFilter])

  const handleTableSelect = () => {
    onSelect?.(DEMO_TABLE)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex h-[min(820px,90vh)] max-h-[90vh] w-[min(1400px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[calc(100vw-2rem)]"
      >
        <div className="flex min-h-0 flex-1 overflow-hidden bg-background">
          {/* Left catalog panel */}
          <div className="flex w-[264px] shrink-0 flex-col border-r border-border">
            <div className="flex h-10 shrink-0 items-center justify-between px-3">
              <span className="text-sm font-semibold text-foreground">Catalog</span>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon-xs" type="button" aria-label="Settings">
                  <CatalogGearIcon size={14} className="text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon-xs" type="button" aria-label="Refresh">
                  <RefreshIcon size={14} className="text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon-xs" type="button" aria-label="New">
                  <PlusIcon size={14} className="text-muted-foreground" />
                </Button>
              </div>
            </div>

            <p className="shrink-0 px-3 pb-2 text-xs text-muted-foreground">
              No available computes found.
            </p>

            <div className="flex shrink-0 items-center gap-1 px-2 pb-2">
              <div className="relative min-w-0 flex-1">
                <SearchIcon
                  size={12}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  className="h-7 pl-7 text-xs shadow-xs"
                  placeholder="Type to search..."
                  value={treeSearch}
                  onChange={(event) => setTreeSearch(event.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon-xs" type="button" aria-label="Filter">
                <FilterIcon size={14} className="text-muted-foreground" />
              </Button>
            </div>

            <div className="flex shrink-0 items-center gap-2 px-3 pb-2">
              <FilterPill active={leftTab === "for-you"} onClick={() => setLeftTab("for-you")}>
                For you
              </FilterPill>
              <FilterPill active={leftTab === "all"} onClick={() => setLeftTab("all")}>
                All
              </FilterPill>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pb-3">
              <Tree
                nodes={CATALOG_TREE}
                selectedId={selectedTreeId}
                onSelect={setSelectedTreeId}
                size="x-small"
                variant="nav"
              />
            </div>
          </div>

          {/* Right schema explorer */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0 px-6 pb-0 pt-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="text-[13px] leading-5 text-primary">
                    Catalog Explorer &gt; lakewatch &gt;
                  </p>
                  <div className="flex items-center gap-2">
                    <SchemaIcon size={20} className="shrink-0 text-muted-foreground" />
                    <h2 className="text-[28px] font-normal leading-8 text-foreground">bronze</h2>
                    <Button variant="ghost" size="icon-xs" type="button" aria-label="Copy">
                      <CopyIcon size={14} className="text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon-xs" type="button" aria-label="Favorite">
                      <Star size={14} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-1">
                  <Button variant="ghost" size="icon-sm" type="button" aria-label="More options">
                    <OverflowIcon size={16} className="text-muted-foreground" />
                  </Button>
                  <Button variant="default" size="sm" type="button" className="shadow-xs">
                    Use
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 border-b border-border">
                {["Overview", "Details", "Permissions", "Policies"].map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={cn(
                      "-mb-px border-b-2 pb-2 text-[13px] leading-5",
                      index === 0
                        ? "border-primary font-semibold text-foreground"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-6 py-4">
              <div className="shrink-0 space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold text-foreground">Description</p>
                  <button
                    type="button"
                    className="rounded border border-dashed border-border px-3 py-2 text-[13px] text-muted-foreground"
                  >
                    Add description
                  </button>
                </div>
              </div>

              <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-background shadow-xs">
                  <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border px-3 py-2">
                    <div className="relative min-w-[220px] flex-1">
                      <SearchIcon
                        size={14}
                        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        className="h-8 border-border pl-8 text-[13px] shadow-xs"
                        placeholder="Filter tables"
                        value={tableFilter}
                        onChange={(event) => setTableFilter(event.target.value)}
                      />
                    </div>
                    <ObjectTypeTabs active={objectTab} onChange={setObjectTab} />
                    <Button
                      variant="default"
                      size="sm"
                      type="button"
                      className="ml-auto gap-1 shadow-xs"
                    >
                      Sort
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </Button>
                  </div>

                  {objectTab === "tables" ? (
                    <div className="min-h-0 flex-1 overflow-auto">
                      <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
                        <thead className="sticky top-0 z-[1] bg-muted/30">
                          <tr className="border-b border-border">
                            <th className="px-3 py-2 font-semibold text-foreground">Name</th>
                            <th className="w-[140px] px-3 py-2 font-semibold text-foreground">
                              Owner
                            </th>
                            <th className="w-[160px] px-3 py-2 font-semibold text-foreground">
                              Created at
                            </th>
                            <th className="w-[80px] px-3 py-2 font-semibold text-foreground">
                              Popularity
                            </th>
                            <th className="px-3 py-2 font-semibold text-foreground">Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTables.map((row) => (
                            <tr
                              key={row.id}
                              className={cn(
                                "cursor-pointer border-b border-border transition-colors last:border-b-0",
                                hoveredRowId === row.id && "bg-[rgba(34,114,180,0.06)]"
                              )}
                              onMouseEnter={() => setHoveredRowId(row.id)}
                              onMouseLeave={() => setHoveredRowId(null)}
                              onClick={handleTableSelect}
                            >
                              <td className="px-3 py-[9px]">
                                <span className="flex min-w-0 items-center gap-2 text-primary">
                                  <TableIcon size={14} className="shrink-0" />
                                  <span className="truncate">{row.name}</span>
                                </span>
                              </td>
                              <td className="truncate px-3 py-[9px] text-muted-foreground">
                                {formatOwner(row.owner)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-[9px] text-muted-foreground">
                                {row.createdAt}
                              </td>
                              <td className="px-3 py-[9px]">
                                <PopularityBars values={row.popularity} />
                              </td>
                              <td className="px-3 py-[9px] text-muted-foreground" />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center px-3 py-10 text-center text-[13px] text-muted-foreground">
                      No items to display.
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
