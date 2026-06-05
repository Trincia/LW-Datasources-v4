"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  HomeIcon,
  DatabaseIcon,
  ZoomMarqueeSelection,
  BranchIcon,
  GearIcon,
  UserKeyIconIcon,
  QueryIcon,
  StarIcon,
  VisibleIcon,
  ShieldIcon,
  DataIcon,
  BarChartIcon,
  NotebookIcon,
  NewWindowIcon,
} from "@/components/icons"

type NavId =
  | "overview"
  | "datasources"
  | "detection"
  | "transformations"
  | "workspace"
  | "admin"
  | "query"
  | "notables"
  | "observables"
  | "health"

interface LakewatchSidebarProps {
  open?: boolean
  activeItem?: NavId
  className?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-6 items-center px-3 py-2">
      <span className="text-hint text-muted-foreground">{children}</span>
    </div>
  )
}

function NavRow({
  href,
  icon: Icon,
  children,
  active,
  iconClassName,
}: {
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  children: React.ReactNode
  active?: boolean
  iconClassName?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-7 items-center gap-2 rounded px-3 text-sm leading-5 transition-colors",
        active
          ? "bg-primary/10 font-semibold text-primary"
          : "text-foreground hover:bg-white/25"
      )}
    >
      <Icon size={16} className={cn("shrink-0 text-muted-foreground", active && "text-primary", iconClassName)} />
      {children}
    </Link>
  )
}

function LakehouseRow({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex h-8 items-center gap-2 rounded-md px-2 text-sm text-foreground hover:bg-white/25"
    >
      <Icon size={16} className="shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <NewWindowIcon size={16} className="shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  )
}

export function LakewatchSidebar({
  open = true,
  activeItem = "datasources",
  className,
}: LakewatchSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col overflow-y-auto overflow-x-hidden transition-all duration-200",
        "bg-gradient-to-b from-blue-100 via-grey-100 to-grey-200",
        open ? "w-[200px]" : "w-0",
        className
      )}
    >
      <div className="flex flex-col gap-1 px-1.5 py-2">
        <NavRow href="/lakewatch" icon={HomeIcon} active={activeItem === "overview"}>
          Overview
        </NavRow>

        <SectionLabel>Configure</SectionLabel>
        <NavRow
          href="/lakewatch/datasources/ingest"
          icon={DatabaseIcon}
          active={activeItem === "datasources"}
        >
          Datasources
        </NavRow>
        <NavRow href="/lakewatch/detection" icon={ZoomMarqueeSelection} active={activeItem === "detection"}>
          Detection rules
        </NavRow>
        <NavRow href="/lakewatch/transformations" icon={BranchIcon} active={activeItem === "transformations"}>
          Transformations
        </NavRow>
        <NavRow href="/lakewatch/workspace" icon={GearIcon} active={activeItem === "workspace"}>
          Workspace
        </NavRow>
        <NavRow href="/lakewatch/admin" icon={UserKeyIconIcon} active={activeItem === "admin"}>
          Admin
        </NavRow>

        <div className="pt-2">
          <SectionLabel>Explore</SectionLabel>
        </div>
        <NavRow href="/lakewatch/query" icon={QueryIcon} active={activeItem === "query"}>
          Query
        </NavRow>
        <NavRow href="/lakewatch/notables" icon={StarIcon} active={activeItem === "notables"}>
          Notables
        </NavRow>
        <NavRow href="/lakewatch/observables" icon={VisibleIcon} active={activeItem === "observables"}>
          Observables
        </NavRow>
        <NavRow href="/lakewatch/health-alerts" icon={ShieldIcon} active={activeItem === "health"}>
          Health alerts
        </NavRow>

        <div className="px-2 pt-2">
          <div className="flex h-8 items-center px-2 opacity-70">
            <span className="truncate text-hint text-muted-foreground">Lakehouse</span>
          </div>
          <div className="flex flex-col gap-1">
            <LakehouseRow href="/catalog" icon={DataIcon} label="Catalog" />
            <LakehouseRow href="/dashboards" icon={BarChartIcon} label="Dashboards" />
            <LakehouseRow href="/workspace" icon={NotebookIcon} label="Workspace" />
          </div>
        </div>
      </div>
    </aside>
  )
}
