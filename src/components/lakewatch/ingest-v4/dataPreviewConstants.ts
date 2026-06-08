import { EXISTING_TABLE_LOCATION } from "@/components/lakewatch/ingest-v4/existingTableConstants"

export type DataPreviewVariant = "ingest" | "configured"

export type IngestPreviewLayout = "multi-column" | "single-data-column"

export type IngestPreviewColumn = {
  id: string
  label: string
  minWidth?: number
}

export type IngestPreviewConfig = {
  title: string
  layout?: IngestPreviewLayout
  columns?: IngestPreviewColumn[]
  rows?: Record<string, string>[]
  dataRows?: string[]
}

/** Figma 731:27617 / 730:25221 — raw existing-table preview after ingest */
export const EXISTING_TABLE_INGEST_PREVIEW: IngestPreviewConfig = {
  title: EXISTING_TABLE_LOCATION,
  layout: "multi-column",
  columns: [
    { id: "time", label: `"time"`, minWidth: 215 },
    { id: "event_platform", label: `"event_platform"`, minWidth: 127 },
    { id: "hostname", label: `"hostname"`, minWidth: 121 },
    { id: "load_timestamp", label: `"load_timestamp"`, minWidth: 160 },
    { id: "sensor_id", label: `"sensor_id"`, minWidth: 120 },
    { id: "severity", label: `"severity"`, minWidth: 88 },
    { id: "severity_name", label: `"severity_name"`, minWidth: 120 },
    { id: "source", label: `"source"`, minWidth: 100 },
    { id: "source_ip", label: `"source_ip"`, minWidth: 120 },
    { id: "user_id", label: `"user_id"`, minWidth: 100 },
  ],
  rows: [
    {
      time: `"2025-02-24T05:51:59.000Z"`,
      event_platform: `"Win"`,
      hostname: `"WORKSTATION-042"`,
      load_timestamp: `"2025-02-24T05:52:01.000Z"`,
      sensor_id: `"a1b2c3d4e5f64789"`,
      severity: `"3"`,
      severity_name: `"Low"`,
      source: `"CrowdStrike"`,
      source_ip: `"10.0.14.22"`,
      user_id: `"svc-backup"`,
    },
    {
      time: `"2025-02-24T05:52:14.000Z"`,
      event_platform: `"Mac"`,
      hostname: `"MBP-DESIGN-17"`,
      load_timestamp: `"2025-02-24T05:52:16.000Z"`,
      sensor_id: `"f9e8d7c6b5a43210"`,
      severity: `"2"`,
      severity_name: `"Informational"`,
      source: `"CrowdStrike"`,
      source_ip: `"192.168.4.88"`,
      user_id: `"jordan.lee"`,
    },
    {
      time: `"2025-02-24T05:53:02.000Z"`,
      event_platform: `"Linux"`,
      hostname: `"prod-api-03"`,
      load_timestamp: `"2025-02-24T05:53:04.000Z"`,
      sensor_id: `"1122334455667788"`,
      severity: `"4"`,
      severity_name: `"Medium"`,
      source: `"CrowdStrike"`,
      source_ip: `"172.16.8.14"`,
      user_id: `"root"`,
    },
    {
      time: `"2025-02-24T05:54:18.000Z"`,
      event_platform: `"Win"`,
      hostname: `"FIN-WS-019"`,
      load_timestamp: `"2025-02-24T05:54:20.000Z"`,
      sensor_id: `"9988776655443322"`,
      severity: `"5"`,
      severity_name: `"High"`,
      source: `"CrowdStrike"`,
      source_ip: `"10.12.3.45"`,
      user_id: `"admin.finance"`,
    },
    {
      time: `"2025-02-24T05:55:41.000Z"`,
      event_platform: `"Win"`,
      hostname: `"ENG-LT-221"`,
      load_timestamp: `"2025-02-24T05:55:43.000Z"`,
      sensor_id: `"abcd1234efgh5678"`,
      severity: `"3"`,
      severity_name: `"Low"`,
      source: `"CrowdStrike"`,
      source_ip: `"10.44.2.91"`,
      user_id: `"dev.user"`,
    },
  ],
}

/** Figma 903:14673 / 903:14711 — raw cloud storage preview after ingest (single data column) */
export const CLOUD_STORAGE_PREVIEW_TITLE = "aws-cloudtrail-logs-905418055418-719340f6/"

export const EXTERNAL_INGEST_PREVIEW: IngestPreviewConfig = {
  title: CLOUD_STORAGE_PREVIEW_TITLE,
  layout: "single-data-column",
  dataRows: [
    `"time": "2025-02-24T05:51:59.000Z","data": {"awsRegion": "ap-northeast-1","eventCategory": "Management","eventID": "dce958ed-aead-4d36-be71-4cfdce6ab787eInstanceStatus","eventSource": "ec2.amazonaws.com",`,
    `"time": "2025-02-24T05:52:00.000Z", "data": {"awsRegion": "ap-northeast-1", "eventCategory": "Management" "eventID": "86774789-fa34-4c3f-a2d3-c76ac2dea86f","eventName": DescribeInstanceStatus",`,
    `"time": "2025-02-24T05:51:59.000Z", "data": {"awsRegion": "ap-northeast-1", "eventCategory": "Management", "eventID": "f54af1b7-40f5-426a-955f-8619a14963f2", "eventName": "DescribeInstances",`,
    `"time": "2025-02-24T05:51:59.000Z", "data": {"awsRegion": "ap-northeast-1", "eventCategory": "Management", "eventID": "f54af1b7-40f5-426a-955f-8619a14963f2", "eventName": "DescribeInstances",`,
    `"time": "2025-02-24T05:52:00.000Z", "data": {"awsRegion": "ap-northeast-1", "eventCategory": "Management" "eventID": "86774789-fa34-4c3f-a2d3-c76ac2dea86f","eventName": DescribeInstanceStatus",`,
  ],
}

export const CONFIGURED_PREVIEW_TITLE = "aws_cloudtrail_1"
export const EXISTING_CONFIGURED_PREVIEW_TITLE = "crowdstrike_fdr_bronze"

export const CONFIGURED_PREVIEW_ROWS = [
  {
    eventTime: "2025-10-31T08:42:10Z",
    eventData:
      '{"user_id": "u123", "action": "login", "device": "iPhone", "ip": "73.45.221.12"} 4b2c6b9e-32e3-4a77-a7b1-8cce7a19e83a',
  },
  {
    eventTime: "2025-10-31T08:44:32Z",
    eventData:
      '{"user_id": "u456", "action": "view_page", "page": "/pricing", "referrer": "google"} 1d4f2a1c-ed30-4b2e-b1e9-5b99c2b3a88f',
  },
  {
    eventTime: "2025-10-31T08:47:12Z",
    eventData:
      '{"user_id": "u123", "action": "add_to_cart", "item_id": "sku-9081", "quantity": 2, "price": 39.99, 9a5e1d77-de20-4423-b8ab-120a8a53c147}',
  },
  {
    eventTime: "2025-10-31T08:50:45Z",
    eventData:
      '{"user_id": "u789", "action": "login", "device": "Android", "ip": "104.31.66.5", 47ce9b92-22a8-4a63-9373-d5a13b7a5e93}',
  },
  {
    eventTime: "2025-10-31T08:53:01Z",
    eventData:
      '{"user_id": "u789", "action": "view_page", "page": "/home", "referrer": "direct", 2bcb87f3-9237-4c02-8c39-ff5f1d19f8ee}',
  },
] as const

export const DEFAULT_PREVIEW_PANEL_HEIGHT = 267
export const MIN_PREVIEW_PANEL_HEIGHT = 160
export const MAX_PREVIEW_PANEL_HEIGHT = 560
