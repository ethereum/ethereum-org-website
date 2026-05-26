import { Shield, User } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Tag } from "@/components/ui/tag"

import heroLandscape from "@/public/images/heroes/guides-hub-hero.jpg"

const meta = {
  title: "UI / Primitives / Card",
  component: Card,
  parameters: {
    // Variant-axis stories are dev-facing references; opt them out of Chromatic
    // by default. Composites overrides this to keep snapshot coverage on
    // production-shape card compositions.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

// Helper labels reused across the variant grids. Defaults are marked explicitly.
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 font-mono text-xs text-body-medium">{children}</p>
)

// Reusable "standard" inner content for variant-axis stories where the focus
// is the wrapper (background, spacing, etc.), not the body. Includes a banner
// since banner-plus-content is the most common card composition in production.
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
      <ButtonLink href="#">Call to action</ButtonLink>
    </CardFooter>
  </>
)

// ---------- Backgrounds ----------

export const Backgrounds: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <Label>background=&quot;base&quot; (default)</Label>
        <Card variant="base">
          <StandardBody />
        </Card>
      </div>

      <div className="rounded-lg bg-background-highlight p-4">
        <Label>
          background=&quot;nested&quot; (shown inside a tinted container)
        </Label>
        <Card variant="nested">
          <StandardBody />
        </Card>
      </div>

      <div>
        <Label>
          background=&quot;header-bar&quot; (pair with CardHeader
          variant=&quot;bar&quot; and spacing=&quot;inherit&quot;)
        </Label>
        <Card variant="header-bar">
          <CardHeader variant="bar" spacing="inherit">
            <Shield className="text-accent-a" />
            <CardTitle variant="semibold">Header-bar card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              The highlight color applies only to the header; the body is
              bordered. Common pattern for icon + label bars.
            </CardParagraph>
          </CardContent>
          <CardFooter>
            <ButtonLink href="#">Call to action</ButtonLink>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Label>
          background=&quot;none&quot; (note: --banner-radius widens to 16px)
        </Label>
        <Card variant="ghost">
          <StandardBody />
        </Card>
      </div>

      <div>
        <Label>
          background=&quot;gradient&quot; (avoid unless designers ask)
        </Label>
        {/* // TODO: Remove gradient */}
        <Card variant="gradient">
          <StandardBody />
        </Card>
      </div>

      <div>
        <Label>
          background=&quot;radial-a&quot; (avoid unless designers ask)
        </Label>
        {/* // TODO: Remove radial-a */}
        <Card variant="radial-a">
          <StandardBody />
        </Card>
      </div>
    </div>
  ),
}

// ---------- Spacing ----------

const SPACING_LABELS = {
  lg: "lg (24/32px pad, 32px content)",
  base: "base (16/24px pad, 1lh content) [default]",
  md: "md (16px pad, 16px content)",
  sm: "sm (10px pad, 10px content)",
  xs: "xs (0 pad, 4px content)",
} as const

const SPACING_VARIANTS = ["lg", "base", "md", "sm", "xs"] as const

export const Spacing: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {SPACING_VARIANTS.map((spacing) => (
        <div key={spacing}>
          <Label>
            spacing=&quot;{spacing}&quot; - {SPACING_LABELS[spacing]}
          </Label>
          <Card size={spacing}>
            <StandardBody />
          </Card>
        </div>
      ))}
    </div>
  ),
}

// ---------- Content Spacing Override ----------
// Demonstrates how CardContent's own spacing variant can override the parent
// Card's --content-space without changing the outer --card-pad. Common when
// the outer card needs lg padding for breathing room but the inner content
// reads tighter.

const CONTENT_SPACING_VARIANTS = ["base", "lg", "md", "sm", "xs"] as const

const CONTENT_SPACING_LABELS = {
  base: "base (inherits parent's --content-space) [default]",
  lg: "lg (16/24px)",
  md: "md (16px)",
  sm: "sm (10px)",
  xs: "xs (4px)",
} as const

export const ContentSpacingOverride: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {CONTENT_SPACING_VARIANTS.map((contentSpacing) => (
        <div key={contentSpacing}>
          <Label>
            Card spacing=&quot;lg&quot;, CardContent spacing=&quot;
            {contentSpacing}&quot; - {CONTENT_SPACING_LABELS[contentSpacing]}
          </Label>
          <Card size="lg">
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
                Outer Card uses spacing=&quot;lg&quot; (wide --card-pad). The
                inner CardContent rhythm is overridden per-cell so the
                paragraphs sit tighter or looser than the parent default.
              </CardParagraph>
              <CardParagraph>
                Second paragraph so the inter-element gap is observable.
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <ButtonLink href="#">Call to action</ButtonLink>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  ),
}

// ---------- Title Variants (variant x spacing matrix) ----------

const TITLE_VARIANTS = ["semibold", "bold", "black"] as const
const TITLE_SPACINGS = ["half", "quarter", "none", "inherit"] as const

export const TitleVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {TITLE_VARIANTS.map((variant) => (
        <div key={variant} className="space-y-6">
          <Label>
            CardTitle variant=&quot;{variant}&quot;
            {variant === "bold" ? " [default]" : ""}
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
                <CardTitle variant={variant} spacing={spacing}>
                  Title spacing={spacing}
                  {spacing === "half" ? " (default)" : ""}
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
    </div>
  ),
}

// ---------- Banner Placement ----------

export const BannerPlacement: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          Direct child of Card + background=&quot;none&quot; (widened
          --banner-radius)
        </Label>
        <Card variant="ghost">
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
              Banner is a direct child of Card so it sits flush against the card
              edges. background=&quot;none&quot; removes the surrounding tint
              and widens --banner-radius to match the card&apos;s outer corners.
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
    </div>
  ),
}

// ---------- Banner Variants (background + size) ----------

const BANNER_BACKGROUNDS = [
  "accent-a",
  "accent-b",
  "accent-c",
  "primary",
  "body",
  "none",
] as const

const BANNER_SIZES = ["full", "lg", "base", "sm", "thumbnail"] as const

export const BannerBackgrounds: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {BANNER_BACKGROUNDS.map((bg) => (
        <div key={bg}>
          <Label>
            CardBanner background=&quot;{bg}&quot;
            {bg === "body" ? " [default]" : ""}
          </Label>
          <CardBanner background={bg} />
        </div>
      ))}
    </div>
  ),
}

export const BannerSizes: Story = {
  parameters: { layout: "fullscreen " },
  render: () => (
    <div className="grid grid-cols-fill-4 gap-8 p-8">
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
    </div>
  ),
}

// ---------- Header Variants ----------

export const HeaderVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Label>CardHeader (default; no variant)</Label>
        <Card>
          <CardHeader>
            <CardTitle>Default header</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              The default header is a vertical container with padding-bottom
              zeroed so the only gap to the content comes from
              CardContent&apos;s padding-top.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>
          CardHeader variant=&quot;bar&quot; spacing=&quot;inherit&quot; (pair
          with Card background=&quot;header-bar&quot;)
        </Label>
        <Card variant="header-bar">
          <CardHeader variant="bar" spacing="inherit">
            <Shield className="text-accent-a" />
            <CardTitle variant="semibold">Bar header</CardTitle>
          </CardHeader>
          <CardContent>
            <CardParagraph>
              variant=&quot;bar&quot; arranges the header in a row with a bottom
              border. Almost always paired with Card
              background=&quot;header-bar&quot;.
            </CardParagraph>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

// ---------- Footer Buttons ----------

export const FooterButtons: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Label>CardFooter buttons=&quot;full&quot; (default)</Label>
        <Card>
          <CardContent>
            <CardTitle>Full-width buttons</CardTitle>
            <CardParagraph>
              Buttons and ButtonLinks stretch to the card width with centered
              text.
            </CardParagraph>
          </CardContent>
          <CardFooter>
            <ButtonLink href="#">Primary CTA</ButtonLink>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Label>CardFooter buttons=&quot;compact&quot;</Label>
        <Card>
          <CardContent>
            <CardTitle>Compact buttons</CardTitle>
            <CardParagraph>
              Buttons size to fit their content. Used for trailing-link style
              footers.
            </CardParagraph>
          </CardContent>
          <CardFooter buttons="compact">
            <ButtonLink href="#">Primary CTA</ButtonLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
}

// ---------- Linkable (Card href) ----------

export const Linkable: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <Label>
          Card href=&quot;...&quot; + CardBanner zoom=&#123;true&#125; (default)
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
              Same hover/focus behavior on the card, but the banner image stays
              static. Useful when the banner art shouldn&apos;t move.
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Image-banner card (BuilderCard shape) */}
        <div>
          <Label>Image-banner card (BuilderCard shape)</Label>
          <Card variant="ghost">
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
              <CardTitle variant="semibold">
                {tDev("page-developers-learn")}
              </CardTitle>
              <CardParagraph size="sm">
                {tDev("page-developers-learn-desc")}
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <ButtonLink href="#" className="sm:w-fit">
                {tDev("page-developers-read-docs")}
              </ButtonLink>
            </CardFooter>
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

        {/* Header-bar card (what-is-ethereum start sections) */}
        <div>
          <Label>Header-bar card (icon bar + content + footer)</Label>
          <Card variant="header-bar" size="lg">
            <CardHeader variant="bar" spacing="inherit">
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
            <CardFooter spacing="inherit">
              <ButtonLink href="#">
                {tWie("page-what-is-ethereum-start-individuals-cta-1")}
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
      </div>
    )
  },
}
