export const DEFAULT_USER_EMAIL = "beau.trincia@databricks.com"

export type RunAsSelection =
  | { type: "user"; id: typeof DEFAULT_USER_EMAIL; label: string }
  | {
      type: "service-principal"
      id: string
      label: string
      applicationId: string
      inaccessible?: boolean
    }

export type IngestRangeOption = "all-data" | "since-date"

export type IngestAdvancedOptions = {
  useManagedFileNotifications: boolean
  ingestRange: IngestRangeOption
  ingestSinceDate: string
  runAs: RunAsSelection
}

export const SERVICE_PRINCIPALS: Array<{
  id: string
  label: string
  applicationId: string
  inaccessible?: boolean
}> = [
  {
    id: "deleted-or-inaccessible-sp",
    label: "deleted-or-inaccessible-sp",
    applicationId: "8f3c2a1b-9d4e-4f5a-b6c7-1d2e3f4a5b6c",
    inaccessible: true,
  },
  {
    id: "lakewatch-pipeline-sp",
    label: "lakewatch-pipeline-sp",
    applicationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  },
  {
    id: "security-monitoring-sp",
    label: "security-monitoring-sp",
    applicationId: "2c4e6f8a-1b3d-5e7f-9a0b-1c2d3e4f5a6b",
  },
  {
    id: "data-ingestion-sp",
    label: "data-ingestion-sp",
    applicationId: "3d5f7a9b-2c4e-6f8a-0b1c-2d3e4f5a6b7c",
  },
]

export const DEFAULT_INGEST_ADVANCED_OPTIONS: IngestAdvancedOptions = {
  useManagedFileNotifications: false,
  ingestRange: "all-data",
  ingestSinceDate: "",
  runAs: {
    type: "user",
    id: DEFAULT_USER_EMAIL,
    label: DEFAULT_USER_EMAIL,
  },
}
