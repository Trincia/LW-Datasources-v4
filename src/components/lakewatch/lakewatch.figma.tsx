/**
 * Figma Code Connect — Lakewatch Datasources (Figma file DtRlnrhUzoBLM5nXPgYvlZ).
 * Maps nodes in the Lakewatch design to this repo’s components (parallel to DuBois KHFOMM… mappings).
 *
 * Publish:  npx figma connect publish
 */
import React from "react"
import figma from "@figma/code-connect"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DbIcon } from "@/components/ui/db-icon"
import { Label } from "@/components/ui/label"
import { ListItem } from "@/components/ui/list-item"
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
import {
  BarChartIcon,
  BranchIcon,
  CatalogCloudIcon,
  ChevronDownIcon,
  DataIcon,
  DatabaseIcon,
  GearIcon,
  GenieCodeIcon,
  HomeIcon,
  NewWindowIcon,
  NotebookIcon,
  QueryIcon,
  ShieldIcon,
  StarIcon,
  TableIcon,
  UserKeyIconIcon,
  VisibleIcon,
  WorkflowsIcon,
  ZoomMarqueeSelection,
} from "@/components/icons"
import { DatabricksLogo } from "@/components/shell/DatabricksLogo"
import { AppSwitcher } from "@/components/shell/AppSwitcher"
import { LakewatchAppShell } from "./LakewatchAppShell"
import { LakewatchTopBar } from "./LakewatchTopBar"
import { LakewatchSidebar } from "./LakewatchSidebar"

const LW =
  "https://www.figma.com/design/DtRlnrhUzoBLM5nXPgYvlZ/Lakewatch-Datasources"

// ─── Shell (ingest frame + chrome) ───────────────────────────────────────────
figma.connect(LakewatchAppShell, `${LW}?node-id=324-72300`, {
  props: {},
  example: () => (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <div className="p-8 text-sm text-muted-foreground">Page content</div>
    </LakewatchAppShell>
  ),
})

figma.connect(LakewatchTopBar, `${LW}?node-id=324-72391`, {
  props: {
    workspace: figma.string("Workspace"),
    userInitial: figma.string("User Initial"),
  },
  example: ({ workspace, userInitial }) => (
    <LakewatchTopBar workspace={workspace} userInitial={userInitial} />
  ),
})

figma.connect(LakewatchSidebar, `${LW}?node-id=324-72428`, {
  props: {},
  example: () => <LakewatchSidebar open activeItem="datasources" />,
})

// ─── Top bar primitives ──────────────────────────────────────────────────────
figma.connect(DatabricksLogo, `${LW}?node-id=3-67697`, {
  props: {},
  example: () => <DatabricksLogo height={18} />,
})

figma.connect(Badge, `${LW}?node-id=3-6788`, {
  props: {},
  example: () => (
    <Badge variant="purple" className="bg-blue-200 border-0 text-[var(--tag-text-purple)]">
      Beta
    </Badge>
  ),
})

figma.connect(Button, `${LW}?node-id=3-67859`, {
  props: {},
  example: () => (
    <Button variant="ghost" size="sm" className="gap-1 font-normal">
      <span>Production</span>
      <ChevronDownIcon size={16} className="text-muted-foreground" />
    </Button>
  ),
})

figma.connect(Button, `${LW}?node-id=3-67878`, {
  props: {},
  example: () => (
    <Button variant="ghost" size="icon-sm" aria-label="Open Genie" className="bg-ai-gradient-subtle">
      <DbIcon icon={GenieCodeIcon} color="ai" size={16} />
    </Button>
  ),
})

figma.connect(DbIcon, `${LW}?node-id=3-67876`, {
  props: {},
  example: () => <DbIcon icon={GenieCodeIcon} color="ai" size={16} />,
})

figma.connect(AppSwitcher, `${LW}?node-id=3-67906`, {
  props: {},
  example: () => <AppSwitcher />,
})

figma.connect(Avatar, `${LW}?node-id=3-68218`, {
  props: {},
  example: () => (
    <Avatar size="sm">
      <AvatarFallback className="bg-teal-600 text-xs font-semibold text-white">J</AvatarFallback>
    </Avatar>
  ),
})

// ─── Sidebar ─────────────────────────────────────────────────────────────────
figma.connect(Label, `${LW}?node-id=3-71043`, {
  props: {},
  example: () => <Label className="text-hint text-muted-foreground">Configure</Label>,
})

figma.connect(ListItem, `${LW}?node-id=3-71055`, {
  props: {},
  example: () => (
    <ListItem selected icon={<DatabaseIcon size={16} />}>
      Datasources
    </ListItem>
  ),
})

figma.connect(Label, `${LW}?node-id=3-536`, {
  props: {},
  example: () => <Label className="text-hint text-muted-foreground opacity-70">Lakehouse</Label>,
})

// ─── Sidebar icons ──────────────────────────────────────────────────────────
figma.connect(DatabaseIcon, `${LW}?node-id=3-71049`, {
  props: {},
  example: () => <DatabaseIcon size={16} className="text-muted-foreground" />,
})

figma.connect(ZoomMarqueeSelection, `${LW}?node-id=3-71071`, {
  props: {},
  example: () => <ZoomMarqueeSelection size={16} className="text-muted-foreground" />,
})

figma.connect(BranchIcon, `${LW}?node-id=3-71073`, {
  props: {},
  example: () => <BranchIcon size={16} className="text-muted-foreground" />,
})

figma.connect(GearIcon, `${LW}?node-id=3-71075`, {
  props: {},
  example: () => <GearIcon size={16} className="text-muted-foreground" />,
})

figma.connect(UserKeyIconIcon, `${LW}?node-id=3-71077`, {
  props: {},
  example: () => <UserKeyIconIcon size={16} className="text-muted-foreground" />,
})

figma.connect(HomeIcon, `${LW}?node-id=3-71079`, {
  props: {},
  example: () => <HomeIcon size={16} className="text-muted-foreground" />,
})

figma.connect(QueryIcon, `${LW}?node-id=3-71081`, {
  props: {},
  example: () => <QueryIcon size={16} className="text-muted-foreground" />,
})

figma.connect(StarIcon, `${LW}?node-id=3-71083`, {
  props: {},
  example: () => <StarIcon size={16} className="text-muted-foreground" />,
})

figma.connect(VisibleIcon, `${LW}?node-id=3-13316`, {
  props: {},
  example: () => <VisibleIcon size={16} className="text-muted-foreground" />,
})

figma.connect(ShieldIcon, `${LW}?node-id=3-71085`, {
  props: {},
  example: () => <ShieldIcon size={16} className="text-muted-foreground" />,
})

figma.connect(DataIcon, `${LW}?node-id=3-969`, {
  props: {},
  example: () => <DataIcon size={16} className="text-muted-foreground" />,
})

figma.connect(NewWindowIcon, `${LW}?node-id=3-973`, {
  props: {},
  example: () => <NewWindowIcon size={16} className="text-muted-foreground" />,
})

figma.connect(BarChartIcon, `${LW}?node-id=3-975`, {
  props: {},
  example: () => <BarChartIcon size={16} className="text-muted-foreground" />,
})

figma.connect(NotebookIcon, `${LW}?node-id=3-977`, {
  props: {},
  example: () => <NotebookIcon size={16} className="text-muted-foreground" />,
})

// ─── Ingest header: warehouse select + breadcrumb ────────────────────────────
figma.connect(Select, `${LW}?node-id=3-4168`, {
  props: {},
  example: () => (
    <Select defaultValue="dedemos-serverless">
      <SelectTrigger className="h-8 min-w-[240px] rounded">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
      </SelectContent>
    </Select>
  ),
})

figma.connect(ChevronDownIcon, `${LW}?node-id=3-485`, {
  props: {},
  example: () => <ChevronDownIcon size={16} className="text-muted-foreground" />,
})

figma.connect(ChevronDownIcon, `${LW}?node-id=3-7339`, {
  props: {},
  example: () => <ChevronDownIcon size={16} className="text-muted-foreground" />,
})

figma.connect(Breadcrumb, `${LW}?node-id=3-5306`, {
  props: {},
  example: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Current datasources</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  ),
})

figma.connect(BreadcrumbLink, `${LW}?node-id=3-5295`, {
  props: {},
  example: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Current datasources</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
})

figma.connect(BreadcrumbSeparator, `${LW}?node-id=3-5304`, {
  props: {},
  example: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  ),
})

// ─── Source option cards (icons) ─────────────────────────────────────────────
figma.connect(CatalogCloudIcon, `${LW}?node-id=3-5282`, {
  props: {},
  example: () => <CatalogCloudIcon size={35} className="text-muted-foreground" />,
})

figma.connect(TableIcon, `${LW}?node-id=3-5322`, {
  props: {},
  example: () => <TableIcon size={35} className="text-muted-foreground" />,
})

figma.connect(WorkflowsIcon, `${LW}?node-id=324-72714`, {
  props: {},
  example: () => <WorkflowsIcon size={35} className="text-muted-foreground" />,
})
