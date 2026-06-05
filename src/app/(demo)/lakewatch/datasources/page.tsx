"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

/** Prototype: skip the empty list view; datasources hub is the ingest entry. */
export default function LakewatchDatasourcesPage() {
  const router = useRouter()

  React.useEffect(() => {
    router.replace("/lakewatch/datasources/ingest")
  }, [router])

  return null
}
