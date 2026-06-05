"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useLakewatchPrototypeVariant } from "@/components/lakewatch/lakewatch-prototype-variant"

export default function LakewatchIndexPage() {
  const router = useRouter()
  const { hydrated } = useLakewatchPrototypeVariant()

  React.useEffect(() => {
    if (!hydrated) return
    router.replace("/lakewatch/datasources/ingest")
  }, [hydrated, router])

  return null
}
