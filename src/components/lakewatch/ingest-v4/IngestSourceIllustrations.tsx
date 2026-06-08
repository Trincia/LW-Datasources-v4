import Image from "next/image"
import { cn } from "@/lib/utils"

const ICONS = "/lakewatch/ingest-v4-icons"

function SourceIllustration({
  src,
  width,
  height,
  className,
}: {
  src: string
  width: number
  height: number
  className?: string
}) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      aria-hidden
      className={cn("shrink-0", className)}
    />
  )
}

/** Figma 728:24237 — Cloud storage tile illustration */
export function CloudStorageIllustration({ className }: { className?: string }) {
  return (
    <SourceIllustration
      src={`${ICONS}/lakeflow-connect-icon.svg`}
      width={59}
      height={58}
      className={className}
    />
  )
}

/** Figma 728:24232 — Existing table tile illustration */
export function ExistingTableIllustration({ className }: { className?: string }) {
  return (
    <SourceIllustration
      src={`${ICONS}/existing-table-icon.svg`}
      width={62}
      height={60}
      className={className}
    />
  )
}

/** Figma 728:24219 — Lakeflow connect tile illustration */
export function LakeflowConnectIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[58px] w-[72px]", className)} aria-hidden>
      <Image
        src={`${ICONS}/cloud-vector-ellipse.svg`}
        alt=""
        width={14}
        height={14}
        className="absolute left-0 top-0"
      />
      <Image
        src={`${ICONS}/cloud-vector-806.svg`}
        alt=""
        width={58}
        height={25}
        className="absolute left-[13.5px] top-[7px]"
      />
      <Image
        src={`${ICONS}/cloud-vector-807.svg`}
        alt=""
        width={58}
        height={26}
        className="absolute left-0 top-[31px] rotate-180"
      />
      <Image
        src={`${ICONS}/cloud-vector-808.svg`}
        alt=""
        width={13}
        height={1}
        className="absolute left-[58px] top-[57px]"
      />
      <Image
        src={`${ICONS}/cloud-vector-810.svg`}
        alt=""
        width={27}
        height={28}
        className="absolute left-[22px] top-[17.36px]"
      />
      <Image
        src={`${ICONS}/cloud-vector-809.svg`}
        alt=""
        width={6}
        height={11}
        className="absolute left-[65.5px] top-[51.5px]"
      />
    </div>
  )
}
