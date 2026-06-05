"use client"

import * as React from "react"
import {
  LakewatchPrototypeVariantProvider,
} from "@/components/lakewatch/lakewatch-prototype-variant"
import { LakewatchPrototypeNav } from "@/components/lakewatch/LakewatchPrototypeNav"

export default function LakewatchDemoProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LakewatchPrototypeVariantProvider>
      {children}
      <LakewatchPrototypeNav />
    </LakewatchPrototypeVariantProvider>
  )
}
