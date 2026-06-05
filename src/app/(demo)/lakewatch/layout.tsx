import LakewatchDemoProviders from "./LakewatchDemoProviders"

export default function LakewatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LakewatchDemoProviders>{children}</LakewatchDemoProviders>
}
