"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLakewatchPrototypeVariant } from "./lakewatch-prototype-variant"

/**
 * Floating prototype switcher (Figma Lakewatch Datasources — white pill, light elevation).
 * Sits outside the app chrome as a fixed overlay.
 */
export function LakewatchVariantToggle() {
  const { variant, setVariant } = useLakewatchPrototypeVariant()
  const router = useRouter()
  const pathname = usePathname()

  const select = React.useCallback(
    (next: 1 | 2) => {
      setVariant(next)
      if (next === 2) {
        if (pathname === "/lakewatch" || pathname === "/lakewatch/datasources") {
          router.push("/lakewatch/datasources/ingest")
        }
      } else if (next === 1) {
        if (
          pathname !== "/lakewatch/datasources/ingest" &&
          pathname !== "/lakewatch/datasources/ingest/"
        ) {
          router.push("/lakewatch/datasources/ingest")
        }
      }
    },
    [pathname, router, setVariant]
  )

  return (
    <div
      className={cn(
        "pointer-events-auto fixed bottom-6 left-1/2 z-[100] -translate-x-1/2",
        "rounded-md border border-border bg-background px-1 py-1",
        "shadow-[0_1px_0_rgba(0,0,0,0.02),0_2px_3px_-1px_rgba(0,0,0,0.05)]"
      )}
      role="radiogroup"
      aria-label="Prototype variant"
    >
      <div className="flex items-center rounded-[4px] bg-muted/50 p-0.5">
        <button
          type="button"
          role="radio"
          aria-checked={variant === 1}
          onClick={() => select(1)}
          className={cn(
            "rounded px-3 py-1.5 text-sm font-semibold transition-colors",
            variant === 1
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Variant 1
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={variant === 2}
          onClick={() => select(2)}
          className={cn(
            "rounded px-3 py-1.5 text-sm font-semibold transition-colors",
            variant === 2
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Variant 2
        </button>
      </div>
    </div>
  )
}
