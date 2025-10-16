"use client"

import { Stack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

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
import type { SimulatorData } from "../components/Simulator/types"

export const walletOnboardingSimData: SimulatorData = {
  [CREATE_ACCOUNT]: {
    title: "Create account",
    Icon: CreateAccountIcon,
    Screen: CreateAccount,
    explanations: [
      {
        header: "🟪 Step 1 · Install a wallet",
        description: (
          <>
            <p>Pick a mobile wallet app to get started.</p>
            <p>
              Install it on your phone and we will guide you the rest of the
              way.
            </p>
          </>
        ),
      },
      {
        header: "🟪 Step 2 · Open your wallet",
        description: (
          <>
            <p>
              Your new wallet is ready to go—no account form or sign-up needed.
            </p>
            <p>Open it so we can set everything up together.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 3 · Create your account",
        description: (
          <>
            <p>One tap creates your Ethereum account.</p>
            <p>No email, approvals, or personal details required.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 4 · See your new account",
        description: (
          <>
            <p>This account belongs to you—and only you.</p>
            <p>No wallet provider or company can access it.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 5 · Back up your recovery phrase",
        description: (
          <>
            <p>This phrase is the only way to recover your wallet.</p>
            <p>Do not share it. Do not lose it.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 6 · Save it safely",
        description: (
          <>
            <Stack>
              <UnorderedList className="ms-0 list-none">
                <ListItem>
                  <Emoji text="✅" className="me-2" />
                  Write the phrase on paper.
                </ListItem>
                <ListItem>
                  <Emoji text="✅" className="me-2" />
                  Store it somewhere secure—and keep a spare copy.
                </ListItem>
                <ListItem>
                  <Emoji text="❌" className="me-2" />
                  Do not text it, email it, or keep a screenshot.
                </ListItem>
              </UnorderedList>
            </Stack>
          </>
        ),
      },
      {
        header: "🟪 Step 7 · Confirm your recovery phrase",
        description: (
          <>
            <p>
              Tap the words in the right order to prove you saved the phrase.
            </p>
            <p>
              This check only happens during setup—you will not do it again.
            </p>
          </>
        ),
      },
      {
        header: "🟪 Step 8 · You're all set 🎉",
        description: (
          <p>
            Your wallet is ready. Next, we will show you how to send and receive
            crypto.
          </p>
        ),
      },
    ],
    ctaLabels: [
      "Install wallet",
      "Open wallet",
      "Create account",
      "Next",
      "I understand",
      "Next",
      "Confirm phrase",
    ],
    finalCtaLink: {
      label: "Get a real wallet",
      href: "/wallets/find-wallet/",
    },
    nextPathId: SEND_RECEIVE,
  },
  [SEND_RECEIVE]: {
    title: "Send / receive tokens",
    Icon: SendReceiveIcon,
    Screen: SendReceive,
    explanations: [
      {
        header: "🟪 Step 1 · Receive some tokens",
        description: (
          <>
            <p>Your wallet can hold ETH, tokens, and NFTs.</p>
            <p>
              Tap &quot;Receive&quot; to see how easy it is to accept assets—no
              cost, no approval needed.
            </p>
          </>
        ),
      },
      {
        header: "🟪 Step 2 · Share your address",
        description: (
          <>
            <p>Your wallet address is safe to share.</p>
            <p>Give it to anyone who wants to send you tokens.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 3 · Now try sending some",
        description: (
          <>
            <p>You just received some ETH. Let&apos;s send a little back.</p>
            <p>Tap &quot;Send&quot; to give it a try.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 4 · Choose how much to send",
        description: (
          <>
            <p>Pick an amount—five dollars, ten dollars, or more.</p>
            <p>There is no middleman. It just works.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 5 · Pick who to send it to",
        description: (
          <>
            <p>Enter a wallet address or choose a recent contact.</p>
            <p>You can save trusted addresses so they are ready next time.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 6 · Confirm and send",
        description: (
          <>
            <p>You will see the fee before you send.</p>
            <p>
              That small fee—called{" "}
              <GlossaryTooltip termKey="gas">gas</GlossaryTooltip>—pays{" "}
              <GlossaryTooltip termKey="validator">validators</GlossaryTooltip>{" "}
              to keep Ethereum running. Think of it like postage that delivers
              your transaction.
            </p>
          </>
        ),
      },
      {
        header: "🟪 Step 7 · You sent crypto instantly 🎉",
        description: (
          <p>No banks. No borders. You are ready for the next lesson.</p>
        ),
      },
    ],
    ctaLabels: [
      "Receive",
      "Share address",
      "Send",
      "Select recipient",
      "Review and send",
      "Send now",
    ],
    finalCtaLink: {
      label: "Get a real wallet",
      href: "/wallets/find-wallet/",
    },
    nextPathId: CONNECT_WEB3,
  },
  [CONNECT_WEB3]: {
    title: "Connect to Ethereum",
    Icon: ConnectWeb3Icon,
    Screen: ConnectWeb3,
    explanations: [
      {
        header: "🟪 Step 1 · Visit an NFT market",
        description: (
          <>
            <p>Your wallet unlocks apps like marketplaces, games, and more.</p>
            <p>Let&apos;s open one and check out the NFT your friend sent.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 2 · Connect wallet",
        description: (
          <>
            <p>No sign-up required.</p>
            <p>Tap once and your account works across every Ethereum app.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 3 · Authorize the connection",
        description: (
          <>
            <p>Approve the request in your wallet.</p>
            <p>The app does not see your private information.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 4 · Go to your account",
        description: (
          <>
            <p>You are signed in—no email, no password, just your wallet.</p>
            <p>Browse around like you would in any other app.</p>
          </>
        ),
      },
      {
        header: "🟪 Step 5 · View your NFT",
        description: (
          <>
            <p>There it is.</p>
            <p>
              Your wallet shows what lives on the blockchain—it does not store
              the assets itself.
            </p>
          </>
        ),
      },
      {
        header: "🟪 Step 6 · Get a wallet for real use",
        description: (
          <>
            <p>You are ready to explore Ethereum apps on your own.</p>
            <p>
              Stay safe, and discover even more experiences in the{" "}
              <Link href="/apps/">Ethereum apps directory</Link>.
            </p>
          </>
        ),
      },
    ],
    ctaLabels: [
      "Visit NFT market",
      "Connect wallet",
      "Connect to app",
      "Go to account",
      "Finished",
    ],
    finalCtaLink: {
      label: "Get a real wallet",
      href: "/wallets/find-wallet/",
      isPrimary: true,
    },
  },
}
