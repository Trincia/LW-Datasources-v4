"use client"

import * as React from "react"
import Link from "next/link"
import {
  DATASOURCE_PAGE_HEADER_LEFT_CLASS,
  EditableDatasourceTitle,
  formatDatasourceDisplayTitle,
} from "@/components/lakewatch/ingest-v4/EditableDatasourceTitle"
import { SavedDatasourceWorkspaceActions } from "@/components/lakewatch/ingest-v4/SavedDatasourceWorkspaceActions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/** Saved pipeline page header — keeps title and draft notification in sync */
export function SavedDatasourcePageHeader({
  defaultName,
  draft = false,
  cancelHref,
}: {
  defaultName: string
  draft?: boolean
  cancelHref: string
}) {
  const [displayTitle, setDisplayTitle] = React.useState(() =>
    formatDatasourceDisplayTitle(defaultName, draft)
  )

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className={DATASOURCE_PAGE_HEADER_LEFT_CLASS}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/lakewatch/datasources" className="text-primary hover:text-primary/90">
                  Datasources
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <EditableDatasourceTitle
          defaultName={defaultName}
          draft={draft}
          className="text-[15px] font-semibold leading-5"
          onDisplayTitleChange={setDisplayTitle}
        />
      </div>
      <SavedDatasourceWorkspaceActions
        datasourceDisplayName={displayTitle}
        cancelHref={cancelHref}
      />
    </div>
  )
}
