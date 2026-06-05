"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PREVIEW_ROWS = [
  {
    eventTime: "2024-03-15T10:23:45Z",
    eventName: "ConsoleLogin",
    eventSource: "signin.amazonaws.com",
    awsRegion: "us-east-1",
  },
  {
    eventTime: "2024-03-15T10:24:12Z",
    eventName: "GetObject",
    eventSource: "s3.amazonaws.com",
    awsRegion: "us-west-2",
  },
  {
    eventTime: "2024-03-15T10:25:01Z",
    eventName: "AssumeRole",
    eventSource: "sts.amazonaws.com",
    awsRegion: "us-east-1",
  },
]

/** Figma 718:95762 — bottom data preview panel */
export function DataPreviewBottomPanel() {
  return (
    <div className="fixed inset-x-[200px] bottom-1 z-10 mx-1 rounded-t-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
      <Tabs defaultValue="preview" className="gap-0">
        <TabsList variant="line" className="h-8 w-full justify-start rounded-none border-b border-border px-2">
          <TabsTrigger value="preview" className="text-sm">
            Preview
          </TabsTrigger>
          <TabsTrigger value="schema" className="text-sm">
            Schema
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="max-h-[235px] overflow-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">eventTime</TableHead>
                <TableHead className="w-[160px]">eventName</TableHead>
                <TableHead className="w-[200px]">eventSource</TableHead>
                <TableHead className="w-[120px]">awsRegion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PREVIEW_ROWS.map((row) => (
                <TableRow key={row.eventTime}>
                  <TableCell className="font-mono text-[13px] text-foreground">{row.eventTime}</TableCell>
                  <TableCell className="text-foreground">{row.eventName}</TableCell>
                  <TableCell className="text-foreground">{row.eventSource}</TableCell>
                  <TableCell className="text-foreground">{row.awsRegion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="schema" className="p-4 text-sm text-muted-foreground">
          VARIANT column <span className="font-mono text-foreground">data</span> with nested CloudTrail
          fields.
        </TabsContent>
      </Tabs>
    </div>
  )
}
