import { cn } from "@/lib/utils"
import type { NormalizationPreset } from "@/components/lakewatch/ingest-v4/normalizationPresets"

export function NormalizationPresetLogo({ preset }: { preset: NormalizationPreset }) {
  const wrap = cn(
    "relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded",
    preset.containerClass
  )
  const style = preset.logoBackground ? { backgroundColor: preset.logoBackground } : undefined

  if (preset.layout.type === "sprite") {
    return (
      <div className={wrap} style={style} aria-hidden>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={preset.logoSrc}
            alt=""
            className={cn("pointer-events-none max-w-none", preset.layout.imgClassName)}
            draggable={false}
          />
        </div>
      </div>
    )
  }

  const imgClass =
    preset.layout.type === "contain"
      ? cn("h-full w-full", preset.layout.imgClassName ?? "object-contain")
      : "h-full w-full object-cover"

  return (
    <div className={wrap} style={style} aria-hidden>
      <img src={preset.logoSrc} alt="" className={imgClass} draggable={false} />
    </div>
  )
}
