"use client"

import * as React from "react"
import {
  DEFAULT_INGEST_ADVANCED_OPTIONS,
  type IngestAdvancedOptions,
} from "@/components/lakewatch/ingest-v4/ingestAdvancedOptionsTypes"
import { RunAsPicker } from "@/components/lakewatch/ingest-v4/RunAsPicker"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Hint } from "@/components/ui/hint"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function IngestAdvancedOptionsModal({
  open,
  onOpenChange,
  options,
  onOptionsChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  options: IngestAdvancedOptions
  onOptionsChange: (options: IngestAdvancedOptions) => void
}) {
  const update = (patch: Partial<IngestAdvancedOptions>) => {
    onOptionsChange({ ...options, ...patch })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 sm:max-w-[520px]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold">Advanced options</DialogTitle>
        </DialogHeader>

        <DialogBody className="mt-4 gap-6 p-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="managed-file-notifications" className="text-sm font-semibold">
                Use managed file notifications
              </Label>
              <Switch
                id="managed-file-notifications"
                size="sm"
                checked={options.useManagedFileNotifications}
                onCheckedChange={(checked) =>
                  update({ useManagedFileNotifications: checked })
                }
              />
            </div>
            <Hint>
              When enabled, uses managed file events configured on the external location for
              file notification instead of directory.
            </Hint>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingest-range-advanced">Ingest range</Label>
            <Select
              value={options.ingestRange}
              onValueChange={(value: IngestAdvancedOptions["ingestRange"]) =>
                update({
                  ingestRange: value,
                  ingestSinceDate: value === "all-data" ? "" : options.ingestSinceDate,
                })
              }
            >
              <SelectTrigger id="ingest-range-advanced" className="h-8 w-full border-border shadow-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-data">All data</SelectItem>
                <SelectItem value="since-date">Data since a specific date</SelectItem>
              </SelectContent>
            </Select>
            {options.ingestRange === "since-date" ? (
              <Input
                type="date"
                value={options.ingestSinceDate}
                onChange={(event) => update({ ingestSinceDate: event.target.value })}
                className="h-8 w-full max-w-[220px] border-border shadow-xs"
                aria-label="Ingest since date"
              />
            ) : null}
          </div>

          <RunAsPicker
            value={options.runAs}
            onChange={(runAs) => update({ runAs })}
          />
        </DialogBody>

        <DialogFooter className="mt-6 gap-2 sm:justify-end">
          <Button type="button" variant="default" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function IngestAdvancedOptionsControls() {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState(DEFAULT_INGEST_ADVANCED_OPTIONS)

  return (
    <>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-8 px-0 text-[13px] font-normal text-primary"
        onClick={() => setOpen(true)}
      >
        Advanced options
      </Button>
      <IngestAdvancedOptionsModal
        open={open}
        onOpenChange={setOpen}
        options={options}
        onOptionsChange={setOptions}
      />
    </>
  )
}
