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
  // TODO: LOGOS, extract intl strings
  const productListSets = {
    "ai-agents": [
      {
        title: "Luna: The Virtual Influencer",
        description: "",
        image: luna,
        alt: "Luna logo",
        contentItems: [
          <p key="luna-description">
            Luna is a fully autonomous digital influencer & entertainer that
            blends music, pop culture, and AI tech. As a virtual idol Luna
            attracted over{" "}
            <strong>
              one million{" "}
              <InlineLink
                href="https://www.tiktok.com/@aidolofficial"
                target="_blank"
              >
                TikTok followers
              </InlineLink>
            </strong>{" "}
            and performed live in a music festival.{" "}
          </p>,
          <p key="luna-description">
            Luna engages with users constantly through own X account and live
            stream. You might receive an X reply if you tag her handle or a
            voice message if you comment on her stream and own her token! Luna
            controls own onchain wallet.
          </p>,
          <div key="luna-button">
            <ButtonLink
              href="https://app.virtuals.io/virtuals/68"
              target="_blank"
              variant="outline"
            >
              Chat with Luna
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: "AIXBT: Market Intelligence",
        description: "",
        image: aixbt,
        alt: "AIXBT logo",
        contentItems: [
          <p key="aixbt-description">
            AIXBT provides crypto market analysis. This AI Agent autonomously
            delivers actionable insights, witty commentary, and market sentiment
            analysis on Twitter/X, where it gathered almost 500k followers in
            just 4 months.
          </p>,
          <p key="aixbt-description">
            $AIXBT token holders have access to premium real-time market
            intelligence tool that identifies the best opportunities and market
            shifts.
          </p>,
          <div key="aixbt-button">
            <ButtonLink
              href="https://x.com/aixbt_agent"
              target="_blank"
              variant="outline"
            >
              Visit AIXBT
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: "Botto: Decentralized autonomous artist",
        description: "",
        image: botto,
        alt: "Botto logo",
        contentItems: [
          <p key="botto-description">
            Botto creates art and NFTs, with the community voting on its best
            work. Users formed a DAO that guides Botto’s artistic evolution
            while also earning token rewards for participation.
          </p>,
          <div key="botto-button">
            <ButtonLink
              href="https://botto.com/"
              target="_blank"
              variant="outline"
            >
              Visit Botto
            </ButtonLink>
          </div>,
        ],
      },
    ],
    chat: [
      {
        title: "Bankr",
        description: "",
        image: bankr,
        alt: "Bankr logo",
        contentItems: [
          <p key="bankr-description">
            Bankr simplifies cryptocurrency trading and wallet management.
            Instead of navigating through dozens of apps, users can connect
            their wallets and execute actions using simple chat commands.
          </p>,
          <div key="bankr-button">
            <ButtonLink
              href="https://bankr.bot/"
              target="_blank"
              variant="outline"
            >
              Visit Bankr terminal
            </ButtonLink>
          </div>,
        ],
      },
      {
        title: "HeyAnon",
        description: "",
        image: heyanon,
        alt: "HeyAnon logo",
        contentItems: [
          <p key="heyanon-description">
            HeyAnon simplifies using a wallet with one-click swaps, asset
            bridging, and trading via a chat interface. This saves people a lot
            of time. It automates tasks, reduces transaction fees, and optimizes
            portfolios, making it easier to manage assets without requiring
            technical expertise.
          </p>,
          <div key="heyanon-button">
            <ButtonLink
              href="https://heyanon.ai/"
              target="_blank"
              variant="outline"
            >
              Visit HeyAnon
            </ButtonLink>
          </div>,
        ],
      },
    ],
    "dive-deeper": [
      {
        title: "Aiagenttoolkit.xyz",
        description:
          "A curated list of AI agents, frameworks, launchpads & resources",
        image: aiagenttoolkit,
        alt: "Aiagenttoolkit logo",
        link: "https://www.aiagenttoolkit.xyz/t/frameworks",
      },
      {
        title: "Cookie.fun",
        description: "AI agents tracker",
        image: cookiefun,
        alt: "Cookie.fun logo",
        link: "https://cookie.fun/",
      },
      {
        title: "Clanker",
        description:
          "AI that can create a token for you by tagging it on farcaster",
        image: clanker,
        alt: "Clanker logo",
        link: "https://warpcast.com/clanker",
      },
    ],
  }

  return (
    <ProductListComponent content={productListSets[list]} actionLabel="Go" />
  )
}

export default AiAgentProductLists
