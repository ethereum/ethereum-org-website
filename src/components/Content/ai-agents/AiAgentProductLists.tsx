import { useTranslations } from "next-intl"

import { Strong } from "@/components/IntlStringElements"
import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"
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
        description: "",
        image: luna,
        contentItems: [
          <p key="luna-description-1">
            {t.rich("luna-description-1", {
              strong: Strong,
              a: (chunks) => (
                <InlineLink href="https://www.tiktok.com/@aidolofficial">
                  {chunks}
                </InlineLink>
              ),
            })}
          </p>,
          <p key="luna-description-2">{t("luna-description-2")}</p>,
          <div key="luna-button">
            <ButtonLink
              href="https://app.virtuals.io/virtuals/68"
              variant="outline"
            >
              {t("chat-with-brand", { brand: t("luna-brand") })}
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: t("aixbt-title"),
        description: "",
        image: aixbt,
        contentItems: [
          <p key="aixbt-description-1">{t("aixbt-description-1")}</p>,
          <p key="aixbt-description-2">{t("aixbt-description-2")}</p>,
          <div key="aixbt-button">
            <ButtonLink href="https://x.com/aixbt_agent" variant="outline">
              {t("visit-brand", { brand: t("aixbt-brand") })}
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: t("botto-title"),
        description: "",
        image: botto,
        contentItems: [
          <p key="botto-description">{t("botto-description")}</p>,
          <div key="botto-button">
            <ButtonLink href="https://botto.com/" variant="outline">
              {t("visit-brand", { brand: t("botto-brand") })}
            </ButtonLink>
          </div>,
        ],
      },
    ],
    chat: [
      {
        title: t("bankr-title"),
        description: "",
        image: bankr,
        contentItems: [
          <p key="bankr-description">{t("bankr-description")}</p>,
          <div key="bankr-button">
            <ButtonLink href="https://bankr.bot/" variant="outline">
              {t("bankr-button")}
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: t("heyanon-title"),
        description: "",
        image: heyanon,
        contentItems: [
          <p key="heyanon-description">{t("heyanon-description")}</p>,
          <div key="heyanon-button">
            <ButtonLink href="https://heyanon.ai/" variant="outline">
              {t("visit-brand", { brand: t("heyanon-brand") })}
            </ButtonLink>
          </div>,
        ],
      },
    ],
    "dive-deeper": [
      {
        title: t("aiagenttoolkit-title"),
        description: t("aiagenttoolkit-description"),
        image: aiagenttoolkit,
        link: "https://www.aiagenttoolkit.xyz/t/frameworks",
      },
      {
        title: t("cookiefun-title"),
        description: t("cookiefun-description"),
        image: cookiefun,
        link: "https://cookie.fun/",
      },
      {
        title: t("clanker-title"),
        description: t("clanker-description"),
        image: clanker,
        link: "https://farcaster.xyz/clanker",
      },
    ],
  }

  return (
    <ProductListComponent
      content={productListSets[list]}
      actionLabel={t("action-label")}
    />
  )
}

export default AiAgentProductLists
