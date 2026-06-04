import { Meta, StoryObj } from "@storybook/nextjs"

import { Blockquote } from "@/components/MdComponents"
import { Button } from "@/components/ui/buttons/Button"

/**
 * Flow Rhythm -- POC for the typography & spacing unification effort.
 *
 * Renders a representative article inside a `.flow` container so the vertical
 * rhythm can be eyeballed and locked. One base unit (--space: 16px mobile /
 * 24px desktop); every gap is a multiple of it, all margin-top:
 *   - 1x default (heading->content, p->p, p->list, image->p)
 *   - 2x above a subsection heading (h3/h4) and above a CTA group
 *   - 3x above a section boundary (h1/h2, or a <section> element)
 *   - 0.5x between list items
 *
 * View at the `md` (mobile) and `2xl` (desktop) viewports to confirm the
 * single-variable rescale.
 *
 * Spec: .claude/skills/design-system/references/typography-spacing-flow-spec.md
 */
const meta = {
  title: "Atoms / Typography / Flow Rhythm",
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        md: { viewport: "md" },
        "2xl": { viewport: "2xl" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl px-8 py-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Placeholder standing in for a content image -- the rhythm around it is what
// we're evaluating (an image preceding an h2 sits 3x above the heading, while
// the heading sits 1x above the paragraph that follows it).
const ImagePlaceholder = ({ label = "Image" }: { label?: string }) => (
  <div className="grid aspect-video w-full place-items-center rounded-2xl bg-background-medium text-body-medium">
    {label}
  </div>
)

/**
 * The full kitchen sink: every adjacency the flow rules care about, in one
 * realistic article.
 */
export const KitchenSink: Story = {
  render: () => (
    <article className="flow">
      <p className="text-sm font-bold text-body-medium uppercase">Eyebrow</p>
      <h1>The page title as an h1</h1>
      <p className="text-lg text-body-medium">
        A lead paragraph introducing the article. It sits 1x (the default gap)
        below the title; headings read as grouped with their content because the
        larger gaps sit above headings, not below.
      </p>

      <ImagePlaceholder />

      <h2>A section heading after an image</h2>
      <p>
        This h2 sits 3x below the image above (a section break), while this
        paragraph sits 1x below the h2. Close below, far above -- that is what
        makes a heading read as grouped with the content it introduces.
      </p>
      <p>
        A second paragraph. The gap between these two paragraphs is the 1x
        default -- the same gap used between most block-level elements.
      </p>

      <h3>A subsection heading</h3>
      <p>Body copy under a subsection. Followed by a list:</p>
      <ul>
        <li>First item in an unordered list</li>
        <li>Second item, spaced tighter than block-level elements</li>
        <li>
          Third item with a longer line of text to show how multi-line items
          breathe against their siblings
        </li>
      </ul>
      <p>And an ordered list:</p>
      <ol>
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
      </ol>

      <h4>A sub-subsection heading</h4>
      <p>
        Smaller heading level, same relational rules. The before-heading gap
        keeps it visually grouped with the content that follows.
      </p>
      <Blockquote>
        A blockquote, treated as a single flow element like any other block.
      </Blockquote>

      <h2>A section with buttons</h2>
      <p>
        Some final copy before a call to action. The button group below follows
        as an ordinary block at the 1x default.
      </p>

      <div data-flow="cta" className="flex flex-col gap-4 md:flex-row">
        <Button>Primary action</Button>
        <Button variant="outline">Secondary action</Button>
      </div>

      {/* A nested <section> needs no `flow` class of its own: the parent
          `.flow` reaches one level into any <section> (the shipped
          section-descendant scoping), so its children get the same rhythm. */}
      <section>
        <h2>
          A <code className="text-[1em]">&lt;section&gt;</code> with buttons
        </h2>
        <p>
          Some final copy before a call to action. The button group below
          follows as an ordinary block at the 1x default.
        </p>
        <ul>
          <li>First item in an unordered list</li>
          <li>Second item, spaced tighter than block-level elements</li>
          <li>
            Third item with a longer line of text to show how multi-line items
            breathe against their siblings
          </li>
        </ul>
        <div data-flow="cta" className="flex flex-col gap-4 md:flex-row">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
        </div>
      </section>

      <h2>A closing section with buttons</h2>
      <p>
        Some final copy before a call to action. The button group below follows
        as an ordinary block at the 1x default.
      </p>

      <div data-flow="cta" className="flex flex-col gap-4 md:flex-row">
        <Button>Primary action</Button>
        <Button variant="outline">Secondary action</Button>
      </div>
    </article>
  ),
}

/**
 * A compact reference showing each gap in isolation rather than reading them
 * out of a full article.
 */
export const RatioReference: Story = {
  render: () => (
    <div className="flow">
      <ImagePlaceholder label="preceding content" />
      <h2>section heading (h1/h2): 3x above</h2>
      <p>heading to content: 1x (the default gap)</p>
      <p>paragraph to paragraph: 1x (the default gap)</p>
      <ul>
        <li>list item: 0.5x between items</li>
        <li>list item</li>
        <li>list item</li>
      </ul>
      <h3>subsection heading (h3/h4): 2x above</h3>
      <p>heading to content: 1x</p>
    </div>
  ),
}
