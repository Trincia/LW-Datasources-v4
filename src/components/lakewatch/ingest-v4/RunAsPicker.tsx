"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, CloseSmallIcon, InfoIcon, WarningFillIcon } from "@/components/icons"
import {
  DEFAULT_USER_EMAIL,
  SERVICE_PRINCIPALS,
  type RunAsSelection,
} from "@/components/lakewatch/ingest-v4/ingestAdvancedOptionsTypes"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

function RunAsOptionRow({
  selected,
  onSelect,
  children,
  className,
}: {
  selected?: boolean
  onSelect: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-2 rounded px-2 py-2 text-left transition-colors hover:bg-muted/50",
        selected && "bg-primary/5 ring-1 ring-primary/20",
        className
      )}
    >
      {selected ? (
        <CheckIcon size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
      ) : (
        <span className="mt-0.5 size-4 shrink-0" aria-hidden />
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </button>
  )
}

export function RunAsPicker({
  value,
  onChange,
}: {
  value: RunAsSelection
  onChange: (value: RunAsSelection) => void
}) {
  const [open, setOpen] = React.useState(false)

  const displayLabel = value.label
  const showWarning = value.type === "service-principal" && value.inaccessible

  const handleClear = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    event.preventDefault()
    onChange({
      type: "user",
      id: DEFAULT_USER_EMAIL,
      label: DEFAULT_USER_EMAIL,
    })
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold leading-5 text-foreground">Run as</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 w-full items-center gap-2 rounded border border-border bg-background px-3 text-left shadow-xs",
              open && "border-primary ring-2 ring-primary/20"
            )}
          >
            <span className="shrink-0 text-[13px] text-muted-foreground">Run datasource as:</span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5">
              {showWarning ? (
                <WarningFillIcon size={16} className="shrink-0 text-[var(--warning)]" aria-hidden />
              ) : null}
              <span
                className={cn(
                  "truncate text-[13px]",
                  showWarning ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {displayLabel}
              </span>
            </span>
            {value.type !== "user" || value.id !== DEFAULT_USER_EMAIL ? (
              <span
                role="button"
                tabIndex={0}
                className="inline-flex shrink-0 rounded p-0.5 text-muted-foreground hover:bg-muted/50"
                aria-label="Clear run-as selection"
                onClick={handleClear}
                onMouseDown={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleClear(event)
                  }
                }}
              >
                <CloseSmallIcon size={16} />
              </span>
            ) : null}
            <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-1"
        >
          <div className="px-2 py-1.5">
            <p className="text-xs font-semibold leading-4 text-muted-foreground">You</p>
          </div>
          <RunAsOptionRow
            selected={value.type === "user"}
            onSelect={() => {
              onChange({
                type: "user",
                id: DEFAULT_USER_EMAIL,
                label: DEFAULT_USER_EMAIL,
              })
              setOpen(false)
            }}
          >
            <span className="text-[13px] leading-5 text-foreground">{DEFAULT_USER_EMAIL}</span>
          </RunAsOptionRow>

          <div className="mt-1 px-2 py-1.5">
            <p className="text-xs font-semibold leading-4 text-muted-foreground">
              Service Principals
            </p>
          </div>
          <div className="max-h-[240px] overflow-y-auto">
            {SERVICE_PRINCIPALS.map((sp) => {
              const selected = value.type === "service-principal" && value.id === sp.id
              return (
                <RunAsOptionRow
                  key={sp.id}
                  selected={selected}
                  onSelect={() => {
                    onChange({
                      type: "service-principal",
                      id: sp.id,
                      label: sp.label,
                      applicationId: sp.applicationId,
                      inaccessible: sp.inaccessible,
                    })
                    setOpen(false)
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        {sp.inaccessible ? (
                          <WarningFillIcon
                            size={16}
                            className="shrink-0 text-[var(--warning)]"
                            aria-hidden
                          />
                        ) : null}
                        <span
                          className={cn(
                            "text-[13px] leading-5",
                            sp.inaccessible ? "text-muted-foreground" : "text-foreground"
                          )}
                        >
                          {sp.label}
                        </span>
                      </div>
                      <p className="text-xs leading-4 text-muted-foreground">
                        Application ID: {sp.applicationId}
                      </p>
                    </div>
                    {sp.inaccessible ? (
                      <InfoIcon size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                    ) : null}
                  </div>
                </RunAsOptionRow>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
