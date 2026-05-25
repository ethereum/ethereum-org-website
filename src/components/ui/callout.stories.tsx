import Image from "next/image"
import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout, {
  CalloutBanner,
  CalloutButtons,
  CalloutContent,
  CalloutDescription,
  CalloutRoot,
  CalloutTitle,
} from "@/components/ui/callout"

import developersEthBlocks from "@/public/images/developers-eth-blocks.png"
import manAndDog from "@/public/images/man-and-dog-playing.png"
import walking from "@/public/images/walking.png"

const meta = {
  title: "UI / Primitives / Callout",
  component: Callout,
  parameters: {
    // Default preview is layout: "centered" (flex-centered, content-width).
    // Callout has no intrinsic width — it relies on its parent in real pages —
    // so override to padded block flow here so max-w-5xl wrappers fill out.
    layout: "padded",
    // Variant-axis stories are dev-facing references; opt them out of Chromatic
    // by default. Composites overrides this to keep snapshot coverage on
    // production-shape callout compositions.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof Callout>

export default meta

type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 font-mono text-xs text-body-medium">{children}</p>
)

// ---------- Variants (size axis) ----------

const VARIANTS = ["large", "medium", "small"] as const

export const Variants: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <Label>
            variant=&quot;{variant}&quot;
            {variant === "large" ? " [default]" : ""}
          </Label>
          <Callout
            variant={variant}
            image={developersEthBlocks}
            title="Try smart contracts"
            description="Smart contracts let you write programs that run on Ethereum and settle without a trusted intermediary."
          >
            <ButtonLink href="#">Learn more</ButtonLink>
          </Callout>
        </div>
      ))}
    </div>
  ),
}

// ---------- Banner shape (image vs emoji vs neither) ----------

export const BannerShapes: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <div>
        <Label>
          image — banner overflows above the gradient card via paired mt/-mt-24
        </Label>
        <Callout
          image={developersEthBlocks}
          alt="Developer blocks illustration"
          title="Image banner"
          description="Image floats above the gradient card. The aside reserves matching space so preceding DOM elements don't overlap."
        >
          <ButtonLink href="#">Action</ButtonLink>
        </Callout>
      </div>

      <div>
        <Label>emoji — no banner, no overflow reservation</Label>
        <Callout
          emoji=":classical_building:"
          title="Emoji form"
          description="Without an image, the banner reservation collapses (gated via has-[[data-label=callout-banner]]) and the content sits flush at the top."
        >
          <ButtonLink href="#">Action</ButtonLink>
        </Callout>
      </div>

      <div>
        <Label>neither image nor emoji</Label>
        <Callout
          title="Plain title"
          description="No optical anchor at the top — content-only card."
        >
          <ButtonLink href="#">Action</ButtonLink>
        </Callout>
      </div>
    </div>
  ),
}

// ---------- Heading element (`as`) ----------

export const HeadingLevels: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <div>
        <Label>as omitted → renders &lt;h2&gt; [default]</Label>
        <Callout
          emoji=":1234:"
          title="Default heading"
          description="CalloutTitle defaults to h2."
        />
      </div>
      <div>
        <Label>as=&quot;h3&quot;</Label>
        <Callout
          as="h3"
          emoji=":1234:"
          title="h3 heading"
          description="For callouts nested inside sections already introduced by an h2."
        />
      </div>
      <div>
        <Label>as=&quot;h4&quot;</Label>
        <Callout
          as="h4"
          emoji=":1234:"
          title="h4 heading"
          description="For deeper nesting inside h3-introduced subsections."
        />
      </div>
    </div>
  ),
}

// ---------- Children variations ----------

export const ChildrenVariations: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <div>
        <Label>single button</Label>
        <Callout
          image={developersEthBlocks}
          title="Single CTA"
          description="Most common shape — one primary action."
        >
          <ButtonLink href="#">Primary action</ButtonLink>
        </Callout>
      </div>
      <div>
        <Label>two buttons (wrap; full-width on narrow screens)</Label>
        <Callout
          image={developersEthBlocks}
          title="Two CTAs"
          description="Buttons wrap. Below the sm viewport breakpoint they stack full-width; above, they sit side-by-side at content width."
        >
          <ButtonLink href="#">Primary</ButtonLink>
          <ButtonLink variant="outline" href="#">
            Secondary
          </ButtonLink>
        </Callout>
      </div>
      <div>
        <Label>no children — CalloutButtons doesn&apos;t render</Label>
        <Callout
          image={developersEthBlocks}
          title="No actions"
          description="When no children are passed, the buttons slot is omitted entirely."
        />
      </div>
    </div>
  ),
}

// ---------- Side-by-side (equal-height + bottom-aligned buttons) ----------

export const SideBySide: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <>
      <Label>
        Two callouts in a md:grid-cols-2 layout. Banners equalize to 16rem
        height via the sibling-aware min-h gate, content stretches to fill, and
        buttons mt-auto to the bottom padding.
      </Label>
      <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-8">
        <Callout
          image={manAndDog}
          alt=""
          title="Use layer 2"
          description="Short copy."
        >
          <ButtonLink href="#">Use layer 2</ButtonLink>
        </Callout>
        <Callout
          image={walking}
          alt=""
          title="Try some dapps"
          description="A longer description that wraps to multiple lines and demonstrates the equal-height behavior — the shorter callout's banner grows to match, and its button aligns to the bottom padding."
        >
          <ButtonLink href="#">Explore dapps</ButtonLink>
        </Callout>
      </div>
    </>
  ),
}

// ---------- Primitives (direct sub-component composition) ----------

export const Primitives: Story = {
  render: () => (
    <div className="max-w-5xl">
      <Label>
        Manual composition with CalloutRoot + parts. Prefer the default Callout
        wrapper unless you need to interleave custom children.
      </Label>
      <CalloutRoot>
        <CalloutBanner>
          <Image
            src={developersEthBlocks}
            alt=""
            sizes="(min-width: 768px) 400px, calc(100vw - 64px)"
          />
        </CalloutBanner>
        <CalloutContent>
          <CalloutTitle>Composed manually</CalloutTitle>
          <CalloutDescription>
            Use the primitives when you need a custom child between standard
            parts, or to add classNames on individual slots.
          </CalloutDescription>
          <CalloutButtons>
            <ButtonLink href="#">Continue</ButtonLink>
          </CalloutButtons>
        </CalloutContent>
      </CalloutRoot>
    </div>
  ),
}

// ---------- Composites (production-shape, intl-wired) ----------

export const Composites: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    // Real production intl keys so the Storybook locale toolbar exercises RTL
    // and verbose-language layout. Story-only copy is intentionally NOT
    // promoted to new keys — that would add translation pipeline cost for
    // strings no user sees.
    const tGas = useTranslations("page-gas")
    const tCommunity = useTranslations("page-community")

    return (
      <div className="max-w-5xl space-y-8">
        <Callout
          image={manAndDog}
          alt=""
          title={tGas("page-gas-how-do-i-pay-less-gas-card-3-title")}
          description={tGas(
            "page-gas-how-do-i-pay-less-gas-card-3-description"
          )}
        >
          <ButtonLink href="/layer-2/">
            {tGas("page-gas-use-layer-2")}
          </ButtonLink>
        </Callout>

        <Callout
          image={walking}
          alt=""
          title={tCommunity("page-community-explore-dapps-title")}
          description={tCommunity("page-community-explore-dapps-description")}
        >
          <ButtonLink href="/dapps/">
            {tCommunity("page-community-explore-dapps")}
          </ButtonLink>
        </Callout>
      </div>
    )
  },
}
