import type { IngestPreviewConfig } from "@/components/lakewatch/ingest-v4/dataPreviewConstants"
import {
  BRONZE_CLOUD_STORAGE_PREVIEW_TITLE,
  BRONZE_EXISTING_TABLE_PREVIEW_TITLE,
  CONFIGURED_PREVIEW_TITLE,
  EXISTING_TABLE_INGEST_PREVIEW,
  EXTERNAL_INGEST_PREVIEW,
} from "@/components/lakewatch/ingest-v4/dataPreviewConstants"

export type PipelineCardTier = "ingest" | "bronze" | "silver"

export type SavedPipelinePreviewProfiles = {
  ingest?: IngestPreviewConfig
  bronze?: { title: string }
  silver?: IngestPreviewConfig
}

export function resolveDefaultPipelineFocus(tiers: PipelineCardTier[]): PipelineCardTier {
  if (tiers.includes("silver")) return "silver"
  if (tiers.includes("bronze")) return "bronze"
  return "ingest"
}

export const CLOUD_STORAGE_INGEST_ONLY_PREVIEW_PROFILES: SavedPipelinePreviewProfiles = {
  ingest: EXTERNAL_INGEST_PREVIEW,
}

export const CLOUD_STORAGE_CONFIGURED_PREVIEW_PROFILES: SavedPipelinePreviewProfiles = {
  ingest: EXTERNAL_INGEST_PREVIEW,
  bronze: { title: BRONZE_CLOUD_STORAGE_PREVIEW_TITLE },
}

export const EXISTING_SAVE_TO_SILVER_PREVIEW_PROFILES: SavedPipelinePreviewProfiles = {
  ingest: EXISTING_TABLE_INGEST_PREVIEW,
  silver: EXISTING_TABLE_INGEST_PREVIEW,
}

export const EXISTING_FULL_PIPELINE_PREVIEW_PROFILES: SavedPipelinePreviewProfiles = {
  ingest: EXISTING_TABLE_INGEST_PREVIEW,
  bronze: { title: BRONZE_EXISTING_TABLE_PREVIEW_TITLE },
  silver: EXISTING_TABLE_INGEST_PREVIEW,
}

export const CLOUDTRAIL_PRESET_PREVIEW_PROFILES: SavedPipelinePreviewProfiles = {
  ingest: EXTERNAL_INGEST_PREVIEW,
  bronze: { title: CONFIGURED_PREVIEW_TITLE },
  silver: EXISTING_TABLE_INGEST_PREVIEW,
}
