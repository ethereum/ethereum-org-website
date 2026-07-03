import { useTranslations } from "next-intl"

import { Strong } from "@/components/IntlStringElements"
import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"
import InlineLink from "@/components/ui/Link"

import aiagenttoolkit from "@/public/images/ai-agents/aiagenttoolkit.png"
import aixbt from "@/public/images/ai-agents/aixbt.png"
import bankr from "@/public/images/ai-agents/bankr.png"
import botto from "@/public/images/ai-agents/botto.png"
import clanker from "@/public/images/ai-agents/clanker.png"
import cookiefun from "@/public/images/ai-agents/cookiefun.png"
import heyanon from "@/public/images/ai-agents/heyanon.png"
import luna from "@/public/images/ai-agents/luna.png"

const AiAgentProductLists = ({ list }: { list: string }) => {
  const t = useTranslations("component-ai-agent-products")

  const productListSets = {
    "ai-agents": [
      {
        title: t("luna-title"),
        description: [
          t.rich("luna-description-1", {
            strong: Strong,
            a: (chunks) => (
              <InlineLink href="https://www.tiktok.com/@aidolofficial">
                {chunks}
              </InlineLink>
            ),
          }),
          t("luna-description-2"),
        ],
        image: luna,
        href: "https://app.virtuals.io/virtuals/68",
        ctaLabel: t("chat-with-brand", { brand: t("luna-brand") }),
      },
      {
        title: t("aixbt-title"),
        description: [t("aixbt-description-1"), t("aixbt-description-2")],
        image: aixbt,
        href: "https://x.com/aixbt_agent",
        ctaLabel: t("visit-brand", { brand: t("aixbt-brand") }),
      },
      {
        title: t("botto-title"),
        description: t("botto-description"),
        image: botto,
        href: "https://botto.com/",
        ctaLabel: t("visit-brand", { brand: t("botto-brand") }),
      },
    ],
    chat: [
      {
        title: t("bankr-title"),
        description: t("bankr-description"),
        image: bankr,
        href: "https://bankr.bot/",
        ctaLabel: t("bankr-button"),
      },
      {
        title: t("heyanon-title"),
        description: t("heyanon-description"),
        image: heyanon,
        href: "https://heyanon.ai/",
        ctaLabel: t("visit-brand", { brand: t("heyanon-brand") }),
      },
    ],
    "dive-deeper": [
      {
        title: t("aiagenttoolkit-title"),
        description: t("aiagenttoolkit-description"),
        image: aiagenttoolkit,
        href: "https://www.aiagenttoolkit.xyz/t/frameworks",
      },
      {
        title: t("cookiefun-title"),
        description: t("cookiefun-description"),
        image: cookiefun,
        href: "https://cookie.fun/",
      },
      {
        title: t("clanker-title"),
        description: t("clanker-description"),
        image: clanker,
        href: "https://farcaster.xyz/clanker",
      },
    ],
  } satisfies Record<string, ProductListContent[]>

  return (
    <ProductListComponent
      content={productListSets[list]}
      actionLabel={t("action-label")}
    />
  )
}

export default AiAgentProductLists
