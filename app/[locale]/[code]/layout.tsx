/**
 * Layout for precomputed A/B test pages.
 * This layout is minimal - it just passes through children.
 * The parent [locale] layout handles all the actual layout work.
 */
export default function CodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
