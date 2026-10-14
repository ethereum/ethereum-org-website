import { getTranslations } from "next-intl/server"

import { ArrowNext } from "@/components/ui/arrow"

const P = "page-privacy-public-by-default"

const Box = ({
  title,
  detail,
  tone,
}: {
  title: string
  detail: string
  tone: "neutral" | "leak" | "muted"
}) => (
  <div
    className={
      tone === "leak"
        ? "rounded-lg border-2 border-leak bg-leak-low-contrast p-3 text-leak-high-contrast"
        : tone === "muted"
          ? "rounded-lg border border-dashed p-3 text-body-medium"
          : "rounded-lg border p-3"
    }
  >
    <span className="block font-bold">{title}</span>
    <span className="block text-sm">{detail}</span>
  </div>
)

/**
 * Phone away from home: the path to your own node is blocked, so every
 * balance check goes to the default provider. Built from flex rows so it
 * reads start-to-end in both directions and stacks on small screens.
 */
const HomeNodeDiagram = async () => {
  const t = await getTranslations(P)
  const k = (key: string) => `${P}-${key}`

  return (
    <figure
      role="img"
      aria-label={t(k("rpc-home-node-aria"))}
      className="m-0 space-y-3 rounded-base border bg-background p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold">
          {t(k("rpc-home-node-demo-title"))}
        </span>
        <span className="rounded-full bg-background-highlight px-2 py-0.5 text-xs text-body-medium">
          {t(k("rpc-home-node-demo-tag"))}
        </span>
      </div>
      <div
        aria-hidden
        className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"
      >
        <Box
          title={t(k("rpc-home-node-phone"))}
          detail={t(k("rpc-home-node-phone-detail"))}
          tone="neutral"
        />
        <div className="flex flex-col gap-3 text-sm">
          <span className="flex items-center gap-2 text-body-medium line-through decoration-error">
            <ArrowNext className="size-4 max-md:rotate-90 max-md:rtl:-rotate-90" />
            {t(k("rpc-home-node-blocked"))}
          </span>
          <span className="flex items-center gap-2 font-semibold text-leak-high-contrast">
            <ArrowNext className="size-4 max-md:rotate-90 max-md:rtl:-rotate-90" />
            {t(k("rpc-home-node-path"))}
          </span>
        </div>
        <div className="grid gap-3">
          <Box
            title={t(k("rpc-home-node-node"))}
            detail={t(k("rpc-home-node-node-detail"))}
            tone="muted"
          />
          <Box
            title={t(k("nav-route-stop-rpc"))}
            detail={t(k("rpc-home-node-provider-detail"))}
            tone="leak"
          />
        </div>
      </div>
    </figure>
  )
}

export default HomeNodeDiagram
