import { Boxes, GraduationCap, Layers, Users } from "lucide-react"
import type { FC, SVGProps } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import SvgButtonLink from "../buttons/SvgButtonLink"
import { HStack } from "../flex"

type SvgIcon = FC<SVGProps<SVGElement>>
const asIcon = (icon: unknown) => icon as SvgIcon

const meta = {
  title: "UI / SvgButtonLink",
  component: SvgButtonLink,
  args: {
    Svg: asIcon(Layers),
    href: "/layer-2",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Iconic link card with a box-shadow halo on hover. `variant: row` lays the icon and copy horizontally; `variant: col` stacks them vertically and centers text. The icon transforms (scale + rotate) on hover and focus.",
      },
    },
  },
} satisfies Meta<typeof SvgButtonLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Layer 2",
    children: <p className="text-sm text-body-medium">Scale Ethereum.</p>,
  },
}

export const VariantRow: Story = {
  args: {
    label: "Layer 2",
    variant: "row",
    children: (
      <p className="text-sm text-body-medium">
        Scale Ethereum with rollups and sidechains.
      </p>
    ),
  },
}

export const VariantCol: Story = {
  args: {
    label: "Layer 2",
    variant: "col",
    children: (
      <p className="text-sm text-body-medium">
        Scale Ethereum with rollups and sidechains.
      </p>
    ),
  },
}

export const VariantsCompared: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`row` and `col` side-by-side. `row` is the default; `col` is useful for grids of feature highlights.",
      },
    },
  },
  render: () => (
    <HStack className="items-start gap-12">
      <SvgButtonLink
        Svg={asIcon(Layers)}
        label="row"
        href="/layer-2"
        variant="row"
      >
        <p className="text-sm text-body-medium">Horizontal layout.</p>
      </SvgButtonLink>
      <SvgButtonLink
        Svg={asIcon(Layers)}
        label="col"
        href="/layer-2"
        variant="col"
      >
        <p className="text-sm text-body-medium">Stacked layout.</p>
      </SvgButtonLink>
    </HStack>
  ),
}

export const VariousIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass any SVG component (lucide-react, custom SVGRs, etc.) via the `Svg` prop.",
      },
    },
  },
  render: () => (
    <HStack className="items-start gap-12">
      <SvgButtonLink
        Svg={asIcon(Layers)}
        label="Layer 2"
        href="/layer-2"
        variant="col"
      >
        <p className="text-sm text-body-medium">Scale Ethereum.</p>
      </SvgButtonLink>
      <SvgButtonLink
        Svg={asIcon(Boxes)}
        label="Apps"
        href="/dapps"
        variant="col"
      >
        <p className="text-sm text-body-medium">Discover dapps.</p>
      </SvgButtonLink>
      <SvgButtonLink
        Svg={asIcon(GraduationCap)}
        label="Learn"
        href="/learn"
        variant="col"
      >
        <p className="text-sm text-body-medium">Get started.</p>
      </SvgButtonLink>
      <SvgButtonLink
        Svg={asIcon(Users)}
        label="Community"
        href="/community"
        variant="col"
      >
        <p className="text-sm text-body-medium">Get involved.</p>
      </SvgButtonLink>
    </HStack>
  ),
}

export const LabelOnly: Story = {
  args: {
    label: "Layer 2",
  },
}

export const ChildrenOnly: Story = {
  args: {
    children: (
      <>
        <p className="text-xl font-bold">Custom heading</p>
        <p className="text-sm text-body-medium">
          Skip `label` and pass your own structured content as `children`.
        </p>
      </>
    ),
  },
}
