// Shared fixture content for the layout stories. Layouts are mostly chrome --
// TOC, contributor footer, edit banner, nav rails -- so the body has to be
// long and varied enough that the chrome has something real to sit against.

import type { Lang, ToCItem } from "@/lib/types"

export const LANG: Lang = "en"

export const TOC_ITEMS: ToCItem[] = [
  {
    title: "What you'll learn",
    url: "#what-youll-learn",
    items: [],
  },
  {
    title: "Prerequisites",
    url: "#prerequisites",
    items: [
      { title: "A wallet", url: "#a-wallet" },
      { title: "Test ETH", url: "#test-eth" },
    ],
  },
  {
    title: "Walkthrough",
    url: "#walkthrough",
    items: [
      { title: "Connect", url: "#connect" },
      { title: "Sign", url: "#sign" },
      { title: "Verify", url: "#verify" },
    ],
  },
  { title: "Next steps", url: "#next-steps", items: [] },
]

export const CONTRIBUTORS = [
  {
    login: "samajammin",
    avatar_url: "https://avatars.githubusercontent.com/u/8097623?v=4",
    html_url: "https://github.com/samajammin",
    date: "2025-04-20T12:00:00.000Z",
  },
  {
    login: "wackerow",
    avatar_url: "https://avatars.githubusercontent.com/u/54227730?v=4",
    html_url: "https://github.com/wackerow",
    date: "2025-05-02T12:00:00.000Z",
  },
]

export const LAST_EDIT = "April 20, 2025"

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4">{children}</p>
)

/**
 * Article body with real headings, so the TOC anchors in `TOC_ITEMS` resolve
 * and the scroll-spy behavior is exercisable.
 */
export const ArticleBody = () => (
  <>
    <Paragraph>
      Every layout on this site wraps the same shape: a heading, a run of prose
      and headings deep enough to scroll, and a footer of provenance. This
      fixture supplies that so the surrounding chrome can be judged.
    </Paragraph>

    <h2 id="what-youll-learn">What you&apos;ll learn</h2>
    <Paragraph>
      How the layout allocates space between the article column and its rails,
      and where the table of contents docks as the viewport narrows.
    </Paragraph>

    <h2 id="prerequisites">Prerequisites</h2>
    <h3 id="a-wallet">A wallet</h3>
    <Paragraph>
      A wallet is the account you use to interact with Ethereum applications. It
      holds your keys, not your funds -- the funds live on the network.
    </Paragraph>
    <h3 id="test-eth">Test ETH</h3>
    <Paragraph>
      Testnet ETH has no market value and is handed out by faucets, so you can
      practice a transaction before spending anything real.
    </Paragraph>

    <h2 id="walkthrough">Walkthrough</h2>
    <h3 id="connect">Connect</h3>
    <Paragraph>
      Connecting shares your public address with the application. It does not
      grant permission to move anything.
    </Paragraph>
    <h3 id="sign">Sign</h3>
    <Paragraph>
      Signing proves the request came from your key. Read what you are signing:
      a signature can authorize a transfer as easily as it can prove identity.
    </Paragraph>
    <h3 id="verify">Verify</h3>
    <Paragraph>
      Once included in a block, the transaction is public. Any block explorer
      will show it, and so will your wallet.
    </Paragraph>

    <h2 id="next-steps">Next steps</h2>
    <Paragraph>
      Repeat the same flow on mainnet with a small amount, then read about how
      fees are set so the cost stops being a surprise.
    </Paragraph>
  </>
)
