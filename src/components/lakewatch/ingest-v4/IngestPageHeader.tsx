"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function IngestWarehouseSelector({
  value,
  onValueChange,
}: {
  value: string
  onValueChange?: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-7 min-w-[240px] rounded-md border-border font-normal text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
        <SelectItem value="main-warehouse">main-warehouse</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function IngestBreadcrumb({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={item.label}>
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <span className="text-sm text-primary">{item.label}</span>
            )}
            {index < items.length - 1 ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
