"use client"

import * as React from "react"

const STORAGE_KEY = "lakewatch-prototype-variant"

export type LakewatchPrototypeVariant = 1 | 2

type LakewatchPrototypeVariantContextValue = {
  variant: LakewatchPrototypeVariant
  setVariant: (v: LakewatchPrototypeVariant) => void
  hydrated: boolean
}

const LakewatchPrototypeVariantContext =
  React.createContext<LakewatchPrototypeVariantContextValue | null>(null)

function readStoredVariant(): LakewatchPrototypeVariant {
  if (typeof window === "undefined") return 1
  return sessionStorage.getItem(STORAGE_KEY) === "2" ? 2 : 1
}

export function LakewatchPrototypeVariantProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [variant, setVariantState] = React.useState<LakewatchPrototypeVariant>(1)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setVariantState(readStoredVariant())
    setHydrated(true)
  }, [])

  const setVariant = React.useCallback((v: LakewatchPrototypeVariant) => {
    setVariantState(v)
    sessionStorage.setItem(STORAGE_KEY, String(v))
  }, [])

  const value = React.useMemo(
    () => ({ variant, setVariant, hydrated }),
    [variant, setVariant, hydrated]
  )

  return (
    <LakewatchPrototypeVariantContext.Provider value={value}>
      {children}
    </LakewatchPrototypeVariantContext.Provider>
  )
}

export function useLakewatchPrototypeVariant() {
  const ctx = React.useContext(LakewatchPrototypeVariantContext)
  if (!ctx) {
    throw new Error(
      "useLakewatchPrototypeVariant must be used within LakewatchPrototypeVariantProvider"
    )
  }
  return ctx
}
