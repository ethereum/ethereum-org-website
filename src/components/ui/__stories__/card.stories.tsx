import { Shield, User } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Tag } from "@/components/ui/tag"

import heroLandscape from "@/public/images/heroes/guides-hub-hero.jpg"

const meta = {
  title: "UI / Primitives / Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    // Variant-axis stories are dev-facing references; opt them out of Chromatic
    // by default. Composites overrides this to keep snapshot coverage on
    // production-shape card compositions.
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component: [
          "Composable card primitive. Build cards by composing the parts (`CardHeader`, `CardContent`, `CardFooter`, `CardBanner`, `CardTitle`, `CardParagraph`) and picking `variant`/`size` -- reach for a variant before `className`.",
          "**Two hover signals that can stack.** An **outline ring** (or, on a `ghost` card, a **background fill**) is added automatically by an `href` `Card` and marks the *whole card* as the click target. **`hoverLift`** (the card raises on hover) means the card carries an action; an `href` `Card` applies it **automatically**, so you pass it by hand only on a non-link card that carries an action.",
          "**Links & actions** (see the *Interaction Patterns* story):",
          "- **One CTA** -> `href` + `CardButtonFake` (or `CardLinkFake` for a text link). The `href` makes the whole card clickable and auto-applies the outline/fill *and* lift; the fake CTA avoids nesting a real `ButtonLink`/`Button`/`LinkWithArrow` anchor inside the card's anchor.",
          "- **Two or more CTAs** -> no `href` (the card can't be one link); real `ButtonLink`s, each its own target, + `hoverLift`.",
          "- **No button, the action is a text link in the copy** -> no `href`; an `InlineLink` in the copy + `hoverLift`. No outline ring, which would imply the whole card is a single link.",
          "Any `href` card needs interior padding, so wrap a `CardBanner` in a `CardHeader` rather than dropping it in bare -- the inset keeps the banner clear of the hover treatment and its corners concentric with the card.",
        ].join("\n\n"),
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

// Helper labels reused across the variant grids. Defaults are marked explicitly.
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 font-mono text-xs text-body-medium">{children}</p>
)

// Reusable "standard" inner content for variant-axis stories where the focus
// is the wrapper (variant, size, etc.), not the body. Includes a banner since
// banner-plus-content is the most common card composition in production.
// The footer uses CardButtonFake, so every consumer must set `href` on the
// Card -- a single-CTA card is a whole-card link (see InteractionPatterns).
const StandardBody = () => (
  <>
    <CardHeader>
      <CardBanner>
        <Image
          src={heroLandscape}
          alt=""
          sizes="(min-width: 768px) 400px, 100vw"
        />
      </CardBanner>
    </CardHeader>
    <CardContent>
      <CardTitle>Card title</CardTitle>
      <CardParagraph>
        Body copy that fills the card with realistic content so spacing and
        background colors can be evaluated.
      </CardParagraph>
      <CardParagraph>
        Second paragraph so the inter-element rhythm inside CardContent is
        visible.
      </CardParagraph>
    </CardContent>
    <CardFooter>
      <CardButtonFake>Call to action</CardButtonFake>
    </CardFooter>
  </>
)

// ---------- Variants ----------

export const Variants: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      <div>
        <Label>variant=&quot;base&quot; (default)</Label>
        <Card href="#" variant="base" hoverLift>
          <StandardBody />
        </Card>
      </div>

      <div className="rounded-lg bg-background-highlight p-4">
        <Label>
          variant=&quot;nested&quot; (shown inside a tinted container)
        </Label>
        <Card href="#" variant="nested" hoverLift>
          <StandardBody />
        </Card>
      </div>

      <div>
        <Label>
          variant=&quot;ghost&quot; (no bg; --banner-radius widens to 16px)
        </Label>
        <Card href="#" variant="ghost" hoverLift>
          <StandardBody />
        </Card>
      </div>

      <div>
        <Label>
          variant=&quot;header-bar&quot; (header layout baked in — just drop a
          CardHeader inside)
        </Label>
        <Card href="#" variant="header-bar" hoverLift>
          <CardHeader>
            <Shield className="text-accent-a" />
            <CardTitle size="sm">Header-bar card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              The highlight color applies only to the header; the body is
              bordered. Common pattern for icon + label bars.
            </CardParagraph>
          </CardContent>
          <CardFooter>
            <CardButtonFake>Call to action</CardButtonFake>
          </CardFooter>
        </Card>
      </div>
    </Grid>
  ),
}

// ---------- Sizes ----------

const SIZE_LABELS = {
  lg: "lg (24/32px pad, 32px content)",
  base: "base (16/24px pad, 1lh content) [default]",
  md: "md (16px pad, 16px content)",
  sm: "sm (10px pad, 10px content)",
  xs: "xs (0 pad, 4px content)",
} as const

const SIZE_VARIANTS = ["lg", "base", "md", "sm", "xs"] as const

export const Sizes: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      {SIZE_VARIANTS.map((size) => (
        <div key={size}>
          <Label>
            size=&quot;{size}&quot; - {SIZE_LABELS[size]}
            {size === "xs" ? ' (paired with variant="ghost")' : ""}
          </Label>
          {size === "xs" ? (
            <Card size="xs" variant="ghost">
              <CardHeader>
                <CardBanner>
                  <Image
                    src={heroLandscape}
                    alt=""
                    sizes="(min-width: 768px) 400px, 100vw"
                  />
                </CardBanner>
              </CardHeader>
              <CardContent>
                <CardTitle>Card title</CardTitle>
                <CardParagraph>
                  Body copy that fills the card with realistic content so
                  spacing and background colors can be evaluated.
                </CardParagraph>
                <CardParagraph>
                  Second paragraph so the inter-element rhythm inside
                  CardContent is visible.
                </CardParagraph>
              </CardContent>
            </Card>
          ) : (
            <Card href="#" size={size} hoverLift>
              <StandardBody />
            </Card>
          )}
        </div>
      ))}
    </Grid>
  ),
}

// ---------- Content Spacing Override ----------
// Demonstrates how CardContent's own spacing variant can override the parent
// Card's --content-space without changing the outer --card-pad. Common when
// the outer card needs lg padding for breathing room but the inner content
// reads tighter. Omitting CardContent spacing inherits from the parent size.

const CONTENT_SPACING_VARIANTS = ["lg", "md", "sm", "xs"] as const

const CONTENT_SPACING_LABELS = {
  lg: "lg (16/24px)",
  md: "md (16px)",
  sm: "sm (10px)",
  xs: "xs (4px)",
} as const

export const ContentSpacingOverride: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      {CONTENT_SPACING_VARIANTS.map((contentSpacing) => (
        <div key={contentSpacing}>
          <Label>
            Card size=&quot;lg&quot;, CardContent spacing=&quot;
            {contentSpacing}&quot; - {CONTENT_SPACING_LABELS[contentSpacing]}
          </Label>
          <Card href="#" size="lg" hoverLift>
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent spacing={contentSpacing}>
              <CardTitle>Card title</CardTitle>
              <CardParagraph>
                Outer Card uses size=&quot;lg&quot; (wide --card-pad). The inner
                CardContent rhythm is overridden per-cell so the paragraphs sit
                tighter or looser than the parent default.
              </CardParagraph>
              <CardParagraph>
                Second paragraph so the inter-element gap is observable.
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <CardButtonFake>Call to action</CardButtonFake>
            </CardFooter>
          </Card>
        </div>
      ))}
    </Grid>
  ),
}

// ---------- Title Sizes (size x spacing matrix) ----------
// CardTitle weight is always font-black (inherited from the base heading
// style); `size` controls text size only. Default (no `size`) is text-2xl.

const TITLE_SIZES = [undefined, "sm", "lg"] as const
const TITLE_SPACINGS = ["quarter", "none", "inherit"] as const

export const TitleVariants: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      {TITLE_SIZES.map((size) => (
        <div key={size ?? "default"} className="space-y-6">
          <Label>
            {size ? `CardTitle size="${size}"` : "CardTitle (default size)"}
          </Label>
          {TITLE_SPACINGS.map((spacing) => (
            <Card key={spacing}>
              <CardHeader>
                <CardBanner>
                  <Image
                    src={heroLandscape}
                    alt=""
                    sizes="(min-width: 768px) 400px, 100vw"
                  />
                </CardBanner>
              </CardHeader>
              <CardContent>
                <CardTitle size={size} spacing={spacing}>
                  Title spacing={spacing}
                  {spacing === "quarter" ? " (default)" : ""}
                </CardTitle>
                <CardParagraph>
                  Body paragraph immediately following the title. The gap above
                  reflects the spacing variant; compare against the
                  banner-to-title gap which uses the default --content-space.
                </CardParagraph>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </Grid>
  ),
}

// ---------- Banner Placement ----------

export const BannerPlacement: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      <div>
        <Label>Inside CardHeader (padded; default --banner-radius)</Label>
        <Card>
          <CardHeader>
            <CardBanner>
              <Image
                src={heroLandscape}
                alt=""
                sizes="(min-width: 768px) 400px, 100vw"
              />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle>Padded banner</CardTitle>
            <CardParagraph>
              Banner sits inside CardHeader. Inset by --card-pad, corners use
              the default --banner-radius.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>
          Bare direct child of Card + size=&quot;xs&quot; (edge-to-edge; radii
          match)
        </Label>
        <Card variant="ghost" size="xs">
          <CardBanner>
            <Image
              src={heroLandscape}
              alt=""
              sizes="(min-width: 768px) 400px, 100vw"
            />
          </CardBanner>
          <CardContent>
            <CardTitle>Edge-to-edge banner</CardTitle>
            <CardParagraph>
              Banner is a bare direct child of Card, flush to the edges.
              size=&quot;xs&quot; zeroes --card-pad so the banner radius equals
              the card&apos;s outer radius. On a padded size, or an href card,
              wrap the banner in a CardHeader instead (see the banner gotcha).
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>
          fit=&quot;contain&quot; (auto-blur backdrop from single child)
        </Label>
        <Card>
          <CardHeader>
            <CardBanner fit="contain" background="accent-a">
              <Image src="/images/mainnet.png" alt="" width={368} height={92} />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle>Auto-blur backdrop</CardTitle>
            <CardParagraph>
              Single Image child with fit=&quot;contain&quot; gets cloned as a
              blurred backdrop behind the sharp foreground.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>
    </Grid>
  ),
}

// ---------- Banner Variants (background + size) ----------

const BANNER_BACKGROUNDS = ["accent-a", "primary", "body", "none"] as const

const BANNER_SIZES = [
  "full",
  "lg",
  "base",
  "sm",
  "thumbnail-lg",
  "thumbnail",
] as const

export const BannerBackgrounds: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      {BANNER_BACKGROUNDS.map((bg) => (
        <div key={bg}>
          <Label>
            CardBanner background=&quot;{bg}&quot;
            {bg === "body" ? " [default]" : ""}
          </Label>
          <CardBanner background={bg} />
        </div>
      ))}
    </Grid>
  ),
}

export const BannerSizes: Story = {
  parameters: { layout: "fullscreen " },
  render: () => (
    <Grid className="p-8">
      {BANNER_SIZES.map((size) => (
        <div key={size}>
          <Label>
            CardBanner size=&quot;{size}&quot;
            {size === "base" ? " [default]" : ""}
          </Label>
          <CardBanner size={size} background="accent-a">
            <Image
              src="/images/dapps/uni.png"
              alt=""
              width={400}
              height={200}
            />
          </CardBanner>
        </div>
      ))}
    </Grid>
  ),
}

// ---------- Header Layouts ----------
// CardHeader itself has no variants. The bar-style header (row layout with
// bottom border) is driven entirely by the parent Card variant="header-bar".

export const HeaderLayouts: Story = {
  render: () => (
    <Grid columns={2} size="wide">
      <div>
        <Label>Default header (Card variant=&quot;base&quot;)</Label>
        <Card>
          <CardHeader>
            <CardTitle>Default header</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              Default vertical container with padding-bottom zeroed so the only
              gap to the content comes from CardContent&apos;s padding-top.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>
          Bar-style header via Card variant=&quot;header-bar&quot; (no props on
          CardHeader)
        </Label>
        <Card variant="header-bar">
          <CardHeader>
            <Shield className="text-accent-a" />
            <CardTitle size="sm">Bar header</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              The parent Card supplies the row layout, bottom border, and
              restored padding via descendant selectors. CardHeader stays
              prop-less.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>
    </Grid>
  ),
}

// ---------- Footer Buttons ----------

export const FooterButtons: Story = {
  render: () => (
    <Grid columns={2} size="wide">
      <div>
        <Label>CardFooter buttons=&quot;full&quot; (default)</Label>
        <Card href="#" hoverLift>
          <CardContent>
            <CardTitle>Full-width buttons</CardTitle>
            <CardParagraph>
              CardButtonFakes (and real buttons) stretch to the card width with
              centered text.
            </CardParagraph>
          </CardContent>
          <CardFooter>
            <CardButtonFake>Primary CTA</CardButtonFake>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Label>CardFooter buttons=&quot;compact&quot;</Label>
        <Card href="#" hoverLift>
          <CardContent>
            <CardTitle>Compact buttons</CardTitle>
            <CardParagraph>
              Buttons size to fit their content. Used for trailing-link style
              footers.
            </CardParagraph>
          </CardContent>
          <CardFooter buttons="compact">
            <CardButtonFake>Primary CTA</CardButtonFake>
          </CardFooter>
        </Card>
      </div>
    </Grid>
  ),
}

// ---------- Linkable (Card href) ----------

export const Linkable: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="max-w-3xl text-sm text-body-medium">
        On an href card the whole card is the link, so its contents must sit
        inset from the hover edge: wrap the CardBanner in a CardHeader — the
        --card-pad inset keeps the banner clear of the hover treatment and its
        corners concentric with the card. Don&apos;t drop a bare CardBanner
        straight into an href Card.
      </p>
      <Grid columns={3} size="wide">
        <div>
          <Label>
            Card href=&quot;...&quot; + CardBanner zoom=&#123;true&#125;
            (default)
          </Label>
          <Card href="#">
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Linkable with banner zoom</CardTitle>
              <CardParagraph>
                Hover the card: the banner image scales via the group/link
                propagation from the wrapping BaseLink.
              </CardParagraph>
            </CardContent>
          </Card>
        </div>

        <div>
          <Label>
            Card href=&quot;...&quot; + CardBanner zoom=&#123;false&#125;
          </Label>
          <Card href="#">
            <CardHeader>
              <CardBanner zoom={false}>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Linkable, banner zoom disabled</CardTitle>
              <CardParagraph>
                Same hover/focus behavior on the card, but the banner image
                stays static. Useful when the banner art shouldn&apos;t move.
              </CardParagraph>
            </CardContent>
          </Card>
        </div>

        <div>
          <Label>Card href=&quot;...&quot; (no banner)</Label>
          <Card href="#">
            <CardContent>
              <CardTitle>Linkable without banner</CardTitle>
              <CardParagraph>
                Hover the card to see the title underline propagate via the
                group/link class.
              </CardParagraph>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  ),
}

// ---------- Link hover by variant ----------
// Every Card with an href gets a hover affordance automatically, chosen by
// variant: ghost link cards fill with bg-background-highlight (no outline)
// while base/nested/header-bar keep the primary outline ring. Hover each cell.

export const LinkHoverByVariant: Story = {
  render: () => (
    <Grid columns={3} size="wide">
      <div>
        <Label>
          href + variant=&quot;ghost&quot; (hover: highlight fill, no ring)
        </Label>
        <Card href="#" variant="ghost" size="sm">
          <CardHeader>
            <CardBanner size="sm">
              <Image
                src={heroLandscape}
                alt=""
                sizes="(min-width: 768px) 400px, 100vw"
              />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle size="sm">Ghost link card</CardTitle>
            <CardParagraph size="sm">
              Transparent at rest; hovering fills the whole card with
              bg-background-highlight and shows no outline. This is the
              media/link card treatment (video, hackathon, story, latest grids).
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>
          href + variant=&quot;base&quot; (hover: primary outline ring)
        </Label>
        <Card href="#" variant="base" size="sm">
          <CardHeader>
            <CardBanner size="sm">
              <Image
                src={heroLandscape}
                alt=""
                sizes="(min-width: 768px) 400px, 100vw"
              />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle size="sm">Base link card</CardTitle>
            <CardParagraph size="sm">
              Already sits on a fill, so a hover fill would be invisible;
              hovering shows the ring-primary-hover outline instead.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg bg-background-highlight p-4">
        <Label>
          href + variant=&quot;nested&quot; (hover: primary outline ring)
        </Label>
        <Card href="#" variant="nested" size="sm">
          <CardHeader>
            <CardBanner size="sm">
              <Image
                src={heroLandscape}
                alt=""
                sizes="(min-width: 768px) 400px, 100vw"
              />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle size="sm">Nested link card</CardTitle>
            <CardParagraph size="sm">
              Shown inside a tinted container. Keeps the outline ring on hover;
              the bg-highlight fill is reserved for ghost.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>
    </Grid>
  ),
}

// ---------- Interaction Patterns (single CTA / two CTAs / text link) ----------
// The number of actions decides whether the whole card is clickable. The intro
// paragraph below states the rule for viewers (rendered, not just a comment).

export const InteractionPatterns: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="max-w-3xl text-sm text-body-medium">
        Two hover signals that can stack. An <strong>outline ring</strong> (or,
        on a ghost card, a <strong>background fill</strong>) is added
        automatically by an href Card and marks the whole card as the click
        target. <strong>hoverLift</strong> (the card raises on hover) means the
        card carries an action; an href Card applies it automatically, so you
        pass it by hand only on a non-link card. So: <strong>one CTA</strong> →
        href + CardButtonFake (or CardLinkFake for a text-link CTA), which
        auto-applies ring/fill and lift; <strong>two or more CTAs</strong> → no
        href, real ButtonLinks + hoverLift (the card isn&apos;t one link);{" "}
        <strong>no button</strong> (the action is a text link in the copy) → no
        href, InlineLink + hoverLift.
      </p>
      <Grid columns={3} size="wide">
        <div>
          <Label>
            Single CTA — href + CardButtonFake (auto ring/fill + lift)
          </Label>
          <Card href="#">
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Single call to action</CardTitle>
              <CardParagraph>
                One CTA, so the whole card is the link (href → outline ring).
                The footer uses CardButtonFake — a presentational button that
                inherits the card&apos;s hover, with no interactive element
                nested inside the anchor — and the href auto-raises the card
                (lift) to signal the action it carries.
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <CardButtonFake>Call to action</CardButtonFake>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Label>
            Single CTA (text link) — href + CardLinkFake (auto ring/fill + lift)
          </Label>
          <Card href="#">
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Single call to action</CardTitle>
              <CardParagraph>
                Same whole-card link, but the CTA reads as a text link.
                CardLinkFake mirrors LinkWithArrow as a non-interactive div —
                the trailing arrow and the underline both fire off the
                card&apos;s hover, so nothing interactive nests inside the
                anchor.
              </CardParagraph>
            </CardContent>
            <CardFooter buttons="inherit">
              <CardLinkFake withForwardArrow>Learn more</CardLinkFake>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Label>
            Two CTAs — hoverLift (actions inside; card is not a link)
          </Label>
          <Card hoverLift>
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Two calls to action</CardTitle>
              <CardParagraph>
                Two independent actions can&apos;t both be the card link, so the
                card itself is not clickable (no href). Use real ButtonLinks —
                each its own target — and hoverLift so the card raises on hover
                to signal the actions inside, without the whole-card-link
                outline.
              </CardParagraph>
            </CardContent>
            <CardFooter buttons="compact">
              <ButtonLink href="#">Primary</ButtonLink>
              <ButtonLink href="#" variant="outline">
                Secondary
              </ButtonLink>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Label>
            No button — text link in body + hoverLift (no href, no outline)
          </Label>
          <Card hoverLift>
            <CardHeader>
              <CardBanner>
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>Action lives in the text</CardTitle>
              <CardParagraph>
                This card has no button; the action is an{" "}
                <InlineLink href="#">inline link</InlineLink> in the copy.
                hoverLift raises the whole card on hover to signal it&apos;s
                interactive — without an outline ring, which would imply the
                entire card is a single link.
              </CardParagraph>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  ),
}

// ---------- Composites (production-shape representatives) ----------

export const Composites: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    // Real production intl keys so the Storybook locale toolbar exercises RTL
    // and verbose-language layout. Story-only copy is intentionally NOT
    // promoted to new keys — that would add translation pipeline cost for
    // strings no user sees.
    const tWie = useTranslations("page-what-is-ethereum")
    const tDev = useTranslations("page-developers-index")

    return (
      <Grid columns={2} size="wide">
        {/* Image-banner card (BuilderCard shape) -- single CTA, whole card links */}
        <div>
          <Label>Image-banner card (BuilderCard shape)</Label>
          <Card href="#" variant="ghost" border hoverLift>
            <CardHeader>
              <CardBanner fit="contain" background="none">
                <Image
                  src="/images/developers/speedrun-stablecoins.png"
                  alt=""
                  width={400}
                  height={200}
                />
              </CardBanner>
            </CardHeader>
            <CardContent spacing="xs">
              <Tag
                status="warning"
                size="small"
                className="rounded-sm px-1 py-px font-bold normal-case"
              >
                New
              </Tag>
              <CardTitle size="sm">{tDev("page-developers-learn")}</CardTitle>
              <CardParagraph size="sm">
                {tDev("page-developers-learn-desc")}
              </CardParagraph>
            </CardContent>
            <CardFooter buttons="compact">
              <CardButtonFake>
                {tDev("page-developers-read-docs")}
              </CardButtonFake>
            </CardFooter>
          </Card>
        </div>

        {/* Media link card (video / hackathon / story / latest grid shape) */}
        <div>
          <Label>Media link card (video / hackathon / story shape)</Label>
          <Card href="#" variant="ghost" size="sm">
            <CardHeader>
              <CardBanner className="aspect-video h-auto">
                <Image
                  src={heroLandscape}
                  alt=""
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle size="sm">
                {tDev("page-developers-learn-tutorials")}
              </CardTitle>
              <CardParagraph size="sm">
                {tDev("page-developers-learn-tutorials-desc")}
              </CardParagraph>
            </CardContent>
          </Card>
        </div>

        {/* Icon highlight card (HighlightCard shape) */}
        <div>
          <Label>Icon highlight card (HighlightCard shape)</Label>
          <Card>
            <CardHeader>
              <Shield className="size-8 text-accent-a" />
            </CardHeader>
            <CardContent spacing="md">
              <CardTitle>
                {tWie("page-what-is-ethereum-network-censorship-title")}
              </CardTitle>
              <CardParagraph>
                {tWie("page-what-is-ethereum-network-censorship-desc-1")}
              </CardParagraph>
              <CardParagraph>
                {tWie("page-what-is-ethereum-network-censorship-desc-2")}
              </CardParagraph>
            </CardContent>
          </Card>
        </div>

        {/* Header-bar card (what-is-ethereum start sections) -- two CTAs, not a link */}
        <div>
          <Label>Header-bar card (two CTAs → hoverLift, not a link)</Label>
          <Card variant="header-bar" size="lg" hoverLift>
            <CardHeader>
              <User className="size-8 text-accent-a" />
              <CardTitle>
                {tWie("page-what-is-ethereum-start-individuals-title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardParagraph>
                <strong>
                  {tWie("page-what-is-ethereum-start-individuals-desc-1")}
                </strong>
              </CardParagraph>
              <UnorderedList className="space-y-0!">
                <ListItem>
                  {tWie("page-what-is-ethereum-start-individuals-step-1")}
                </ListItem>
                <ListItem>
                  {tWie("page-what-is-ethereum-start-individuals-step-2")}
                </ListItem>
              </UnorderedList>
            </CardContent>
            <CardFooter buttons="compact">
              <ButtonLink href="#">
                {tWie("page-what-is-ethereum-start-individuals-cta-1")}
              </ButtonLink>
              <ButtonLink href="#" variant="outline">
                {tWie("page-what-is-ethereum-start-individuals-cta-2")}
              </ButtonLink>
            </CardFooter>
          </Card>
        </div>

        {/* Emoji card (MarkdownCard shape) */}
        <div>
          <Label>Emoji card (MarkdownCard shape)</Label>
          <Card>
            <CardHeader>
              <CardEmoji text=":rocket:" />
            </CardHeader>
            <CardContent>
              <CardTitle>{tDev("page-developers-learn-tutorials")}</CardTitle>
              <CardParagraph>
                {tDev("page-developers-learn-tutorials-desc")}
              </CardParagraph>
            </CardContent>
          </Card>
        </div>
      </Grid>
    )
  },
}
