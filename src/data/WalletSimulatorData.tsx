"use client"

import { useTranslations } from "next-intl"

import { Stack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"

import Emoji from "../components/Emoji"
import GlossaryTooltip from "../components/Glossary/GlossaryTooltip"
import {
  CONNECT_WEB3,
  CREATE_ACCOUNT,
  SEND_RECEIVE,
} from "../components/Simulator/constants"
import {
  ConnectWeb3Icon,
  CreateAccountIcon,
  SendReceiveIcon,
} from "../components/Simulator/icons"
import {
  ConnectWeb3,
  CreateAccount,
  SendReceive,
} from "../components/Simulator/screens"
import { CONTACTS } from "../components/Simulator/screens/SendReceive/constants"
import type { SimulatorData } from "../components/Simulator/types"

export function useWalletOnboardingSimData(): SimulatorData {
  const t = useTranslations("component-wallet-simulator")
  return {
    [CREATE_ACCOUNT]: {
      title: t("sim-ca-title"),
      Icon: CreateAccountIcon,
      Screen: CreateAccount,
      explanations: [
        {
          header: t("sim-ca-header-1"),
          description: (
            <>
              <p>{t("sim-ca-desc-1-p1")}</p>
              <p>{t("sim-ca-desc-1-p2")}</p>
              <p>{t("sim-ca-desc-1-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-ca-header-2"),
          description: (
            <>
              <p>{t("sim-ca-desc-2-p1")}</p>
              <p>{t("sim-ca-desc-2-p2")}</p>
              <p>{t("sim-ca-desc-2-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-ca-header-3"),
          description: (
            <>
              <p>{t("sim-ca-desc-3-p1")}</p>
              <p>{t("sim-ca-desc-3-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-ca-header-4"),
          description: <p>{t("sim-ca-desc-4-p1")}</p>,
        },
        {
          header: t("sim-ca-header-5"),
          description: (
            <>
              <p>{t("sim-ca-desc-5-p1")}</p>
              <p>{t("sim-ca-desc-5-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-ca-header-6"),
          description: (
            <>
              <Stack>
                <p className="font-bold">{t("sim-ca-desc-6-small-title")}</p>
                <UnorderedList className="leading-1 ms-0 list-none">
                  <ListItem>
                    <Emoji text="✅" className="me-2" />{" "}
                    {t("sim-ca-desc-6-small-1")}
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack>
                <p className="font-bold">
                  {t("sim-ca-desc-6-significant-title")}
                </p>
                <UnorderedList className="leading-1 ms-0 list-none">
                  <ListItem>
                    <Emoji text="✅" className="me-2" />{" "}
                    {t("sim-ca-desc-6-significant-1")}
                  </ListItem>
                  <ListItem>
                    <Emoji text="✅" className="me-2" />{" "}
                    {t("sim-ca-desc-6-significant-2")}
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack>
                <p className="font-bold">{t("sim-ca-desc-6-unsafe-title")}</p>
                <UnorderedList className="leading-1 ms-0 list-none">
                  <ListItem>
                    <Emoji text="❌" className="me-2" />
                    {t("sim-ca-desc-6-unsafe-1")}
                  </ListItem>
                  <ListItem>
                    <Emoji text="❌" className="me-2" />
                    {t("sim-ca-desc-6-unsafe-2")}
                  </ListItem>
                  <ListItem>
                    <Emoji text="❌" className="me-2" />
                    {t("sim-ca-desc-6-unsafe-3")}
                  </ListItem>
                </UnorderedList>
              </Stack>
            </>
          ),
        },
        {
          header: t("sim-ca-header-7"),
          description: (
            <>
              <p>
                {t.rich("sim-ca-desc-7-p1", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p>
                {t.rich("sim-ca-desc-7-p2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                  em: (chunks) => <em>{chunks}</em>,
                })}
              </p>
              <p>{t("sim-ca-desc-7-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-ca-header-8"),
          description: <p>{t("sim-ca-desc-8-p1")}</p>,
        },
      ],
      ctaLabels: [
        t("sim-ca-cta-1"),
        t("sim-ca-cta-2"),
        t("sim-ca-cta-3"),
        t("sim-ca-cta-4"),
        t("sim-ca-cta-5"),
        t("sim-ca-cta-6"),
        t("sim-ca-cta-7"),
      ],
      finalCtaLink: {
        label: t("sim-ca-final-cta"),
        href: "/wallets/find-wallet/",
      },
      nextPathId: SEND_RECEIVE,
    },
    [SEND_RECEIVE]: {
      title: t("sim-sr-title"),
      Icon: SendReceiveIcon,
      Screen: SendReceive,
      explanations: [
        {
          header: t("sim-sr-header-1"),
          description: (
            <>
              <p>
                {t.rich("sim-sr-desc-1-p1", {
                  nft: (chunks) => (
                    <GlossaryTooltip termKey="nft">{chunks}</GlossaryTooltip>
                  ),
                  web3: (chunks) => (
                    <GlossaryTooltip termKey="web3">{chunks}</GlossaryTooltip>
                  ),
                })}
              </p>
              <p>{t("sim-sr-desc-1-p2")}</p>
              <p>{t("sim-sr-desc-1-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-2"),
          description: (
            <>
              <p>
                {t.rich("sim-sr-desc-2-p1", {
                  em: (chunks) => <em>{chunks}</em>,
                })}
              </p>
              <p>{t("sim-sr-desc-2-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-3"),
          description: (
            <>
              <p>{t("sim-sr-desc-3-p1")}</p>
              <p>{t("sim-sr-desc-3-p2")}</p>
              <p>{t("sim-sr-desc-3-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-4"),
          description: (
            <>
              <p>{t("sim-sr-desc-4-p1")}</p>
              <p>{t("sim-sr-desc-4-p2")}</p>
              <p>{t("sim-sr-desc-4-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-5"),
          description: (
            <>
              <p>{t("sim-sr-desc-5-p1")}</p>
              <p>{t("sim-sr-desc-5-p2")}</p>
              <p>{t("sim-sr-desc-5-p3", { contactName: CONTACTS[0].name })}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-6"),
          description: (
            <>
              <p>{t("sim-sr-desc-6-p1")}</p>
              <p>{t("sim-sr-desc-6-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-7"),
          description: <p>{t("sim-sr-desc-7-p1")}</p>,
        },
      ],
      ctaLabels: [
        "",
        t("sim-sr-cta-2"),
        "",
        t("sim-sr-cta-4"),
        "",
        t("sim-sr-cta-6"),
      ],
      finalCtaLink: {
        label: t("sim-sr-final-cta"),
        href: "/wallets/find-wallet/",
      },
      nextPathId: CONNECT_WEB3,
    },
    [CONNECT_WEB3]: {
      title: t("sim-cw-title"),
      Icon: ConnectWeb3Icon,
      Screen: ConnectWeb3,
      explanations: [
        {
          header: t("sim-cw-header-1"),
          description: (
            <>
              <p>{t("sim-cw-desc-1-p1")}</p>
              <p>{t("sim-cw-desc-1-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-cw-header-2"),
          description: (
            <>
              <p>{t("sim-cw-desc-2-p1")}</p>
              <p>{t("sim-cw-desc-2-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-cw-header-3"),
          description: (
            <>
              <p>{t("sim-cw-desc-3-p1")}</p>
              <p>{t("sim-cw-desc-3-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-cw-header-4"),
          description: (
            <>
              <p>{t("sim-cw-desc-4-p1")}</p>
              <p>{t("sim-cw-desc-4-p2")}</p>
              <p>{t("sim-cw-desc-4-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-cw-header-5"),
          description: (
            <>
              <p>{t("sim-cw-desc-5-p1")}</p>
              <p>
                {t.rich("sim-cw-desc-5-p2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </>
          ),
        },
        {
          header: t("sim-cw-header-6"),
          description: (
            <>
              <p>{t("sim-cw-desc-6-p1")}</p>
              <Stack>
                <p className="font-bold">{t("sim-cw-desc-6-next")}</p>
                <OrderedList>
                  <ListItem>
                    <Link href="/security/">{t("sim-cw-desc-6-link-1")}</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/what-is-ethereum/">
                      {t("sim-cw-desc-6-link-2")}
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/apps/">{t("sim-cw-desc-6-link-3")}</Link>
                  </ListItem>
                </OrderedList>
              </Stack>
            </>
          ),
        },
      ],
      ctaLabels: [
        t("sim-cw-cta-1"),
        t("sim-cw-cta-2"),
        t("sim-cw-cta-3"),
        t("sim-cw-cta-4"),
        t("sim-cw-cta-5"),
      ],
      finalCtaLink: {
        label: t("sim-cw-final-cta"),
        href: "/wallets/find-wallet/",
        isPrimary: true,
      },
    },
  }
}
