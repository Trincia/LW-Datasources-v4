"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function SavedPipelineProcessingSchedule({
  interval = "10",
  scheduleActive = false,
}: {
  interval?: string
  scheduleActive?: boolean
}) {
  return (
    <div className="rounded border border-border bg-background px-3 py-1.5 shadow-[var(--shadow-db-sm)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[13px] font-semibold leading-5 text-foreground">
          Processing schedule
        </span>
        <Select defaultValue="at-least">
          <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="at-least">At least every</SelectItem>
          </SelectContent>
        </Select>
        <Input
          readOnly
          defaultValue={interval}
          className="h-8 w-[65px] rounded border-border text-center shadow-xs"
          aria-label="Interval value"
        />
        <Select defaultValue="minutes">
          <SelectTrigger className="h-8 w-[151px] rounded border-border shadow-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minutes">Minutes</SelectItem>
          </SelectContent>
        </Select>
        <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold leading-5 text-foreground">Active</span>
          <Switch size="sm" defaultChecked={scheduleActive} aria-label="Schedule active" />
        </div>
        <Button variant="link" size="sm" className="h-8 px-2 text-primary" type="button">
          Advanced options
        </Button>
      </div>
    </div>
  )
}
