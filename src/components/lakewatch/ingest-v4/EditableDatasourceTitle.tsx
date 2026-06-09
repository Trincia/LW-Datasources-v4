"use client"

import * as React from "react"
import { PAGE_TITLE_BOLD } from "@/components/lakewatch/pageTitleStyles"
import { cn } from "@/lib/utils"

/** Left cluster in datasource detail headers — breadcrumb inline with the title on one row */
export const DATASOURCE_PAGE_HEADER_LEFT_CLASS =
  "flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1"

export function formatDatasourceDisplayTitle(name: string, draft = false) {
  return `${draft ? "New " : ""}${name}`
}

export function EditableDatasourceTitle({
  defaultName,
  draft = false,
  className,
  onDisplayTitleChange,
}: {
  defaultName: string
  draft?: boolean
  className?: string
  onDisplayTitleChange?: (displayTitle: string) => void
}) {
  const [name, setName] = React.useState(defaultName)
  const [isEditing, setIsEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const displayTitle = formatDatasourceDisplayTitle(name, draft)

  React.useEffect(() => {
    onDisplayTitleChange?.(displayTitle)
  }, [displayTitle, onDisplayTitleChange])

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const finishEditing = React.useCallback(() => {
    setName((current) => current.trim() || defaultName)
    setIsEditing(false)
  }, [defaultName])

  if (isEditing) {
    return (
      <div className="flex w-fit items-baseline gap-0">
        {draft ? (
          <span className={cn(PAGE_TITLE_BOLD, "shrink-0", className)}>New </span>
        ) : null}
        <input
          ref={inputRef}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={finishEditing}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              finishEditing()
            }
            if (event.key === "Escape") {
              setName(defaultName)
              setIsEditing(false)
            }
          }}
          aria-label="Datasource name"
          className={cn(
            PAGE_TITLE_BOLD,
            "min-w-[12ch] bg-transparent p-0 outline-none ring-2 ring-primary/30 rounded-sm",
            className
          )}
        />
      </div>
    )
  }

  return (
    <h1
      role="button"
      tabIndex={0}
      title="Click to edit name"
      aria-label={`${displayTitle}. Click to edit name.`}
      className={cn(
        PAGE_TITLE_BOLD,
        "w-fit cursor-text rounded-sm outline-none hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/30",
        className
      )}
      onClick={() => setIsEditing(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setIsEditing(true)
        }
      }}
    >
      {displayTitle}
    </h1>
  )
}
