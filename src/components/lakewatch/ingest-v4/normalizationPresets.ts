export type NormalizationPreset = {
  id: string
  label: string
  logoSrc: string
  logoBackground?: string
  layout:
    | { type: "cover" }
    | { type: "contain"; imgClassName?: string }
    | { type: "sprite"; imgClassName: string }
  containerClass?: string
  recommended?: boolean
  /** Show bronze / silver / gold table icons (Figma 722:23730). */
  showMedallionIcons?: boolean
}

export const CLOUDTRAIL_PRESET_ID = "cloudtrail"
export const PRESET_APPLY_DELAY_MS = 3000

export const NORMALIZATION_PRESETS: NormalizationPreset[] = [
  {
    id: CLOUDTRAIL_PRESET_ID,
    label: "Amazon CloudTrail IAM",
    logoSrc: "/lakewatch/preset-logos/cloudtrail.png",
    logoBackground: "#cc2264",
    layout: { type: "cover" },
    recommended: true,
    showMedallionIcons: true,
  },
  {
    id: "lambda",
    label: "Amazon Lambda Functions",
    logoSrc: "/lakewatch/preset-logos/lambda.png",
    logoBackground: "#d96612",
    layout: { type: "cover" },
  },
  {
    id: "route53",
    label: "AWS Route 53",
    logoSrc: "/lakewatch/preset-logos/route53.png",
    logoBackground: "#693cc5",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[254.47%] left-[-82.86%] top-[-74.85%] w-[424.11%] max-w-none",
    },
  },
  {
    id: "s3",
    label: "AWS S3 Buckets",
    logoSrc: "/lakewatch/preset-logos/s3.svg",
    logoBackground: "#6cae3e",
    layout: { type: "cover" },
  },
  {
    id: "security-hub",
    label: "Amazon Security Hub",
    logoSrc: "/lakewatch/preset-logos/security-hub.png",
    logoBackground: "#ce282c",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[195.11%] left-[-20.76%] top-[-48.01%] w-[375.69%] max-w-none",
    },
  },
  {
    id: "vpc",
    label: "AWS VPC",
    logoSrc: "/lakewatch/preset-logos/vpc.png",
    logoBackground: "#693cc5",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[614.97%] left-[-631.21%] top-[-370.14%] w-[1613.83%] max-w-none",
    },
  },
  {
    id: "waf",
    label: "AWS WAF",
    logoSrc: "/lakewatch/preset-logos/waf.png",
    logoBackground: "#d7242e",
    layout: {
      type: "sprite",
      imgClassName:
        "absolute h-[223.24%] left-[-44.87%] top-[-60.89%] w-[407.75%] max-w-none",
    },
  },
  {
    id: "slack",
    label: "Slack",
    logoSrc: "/lakewatch/preset-logos/slack.png",
    layout: { type: "contain", imgClassName: "object-contain p-1.5" },
    containerClass: "bg-neutral-200",
  },
]
