import type { Meta, StoryObj } from "@storybook/nextjs"

import Checkbox from "../checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../field"
import Input from "../input"
import Switch from "../switch"

const meta = {
  title: "UI / Forms / Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Composable form-row scaffolding: label, control, description and error in one consistently spaced unit. Nothing here owns state -- wire it to whatever form library the page uses.\n\nThe pieces: `FieldSet` + `FieldLegend` for a titled group, `FieldGroup` for the spacing container, `Field` for one row, and `FieldLabel` / `FieldTitle` / `FieldDescription` / `FieldError` for the slots. `FieldSeparator` divides groups and can carry a centered word.\n\n`Field` has three orientations. `responsive` is the notable one -- it goes horizontal at the `@md` **container** query, so a field reflows on its container's width rather than the viewport's, and the same field can sit in a wide form or a narrow sidebar without a variant change.",
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default orientation -- label above control, description below.",
      },
    },
  },
  render: () => (
    <FieldGroup className="max-w-md">
      <Field>
        <FieldLabel htmlFor="node-name">Node name</FieldLabel>
        <Input id="node-name" placeholder="my-execution-client" />
        <FieldDescription>
          Shown in the client dashboard. Only you can see it.
        </FieldDescription>
      </Field>
    </FieldGroup>
  ),
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`orientation="horizontal"` puts the label and control on one row. With a `FieldContent` wrapper the control aligns to the top so a wrapping description doesn\'t drag it off-center.',
      },
    },
  },
  render: () => (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Testnet mode</FieldTitle>
          <FieldDescription>
            Point the interface at Sepolia instead of mainnet.
          </FieldDescription>
        </FieldContent>
        <Switch id="testnet" />
      </Field>
    </FieldGroup>
  ),
}

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`data-invalid` on the `Field` recolors the row, and `FieldError` renders with `role="alert"`. Pass `errors` an array and it renders a bulleted list; a single entry renders as bare text.',
      },
    },
  },
  render: () => (
    <FieldGroup className="max-w-md">
      <Field data-invalid="true">
        <FieldLabel htmlFor="address">Address</FieldLabel>
        <Input id="address" defaultValue="0xnothex" hasError />
        <FieldError
          errors={[
            { message: "Must be a 42-character hex string." },
            { message: "Checksum does not match." },
          ]}
        />
      </Field>
    </FieldGroup>
  ),
}

export const SelectableCards: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A `FieldLabel` wrapping a `Field` becomes a bordered, selectable card -- `has-data-[state=checked]:` lights up the border and tint from the control's own state, with no JS.",
      },
    },
  },
  render: () => (
    <FieldGroup className="max-w-md">
      {[
        {
          id: "solo",
          title: "Solo staking",
          description: "Run your own validator with 32 ETH.",
        },
        {
          id: "pooled",
          title: "Pooled staking",
          description: "Stake any amount through a pool.",
        },
      ].map(({ id, title, description }) => (
        <FieldLabel key={id} htmlFor={id}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{title}</FieldTitle>
              <FieldDescription>{description}</FieldDescription>
            </FieldContent>
            <Checkbox id={id} />
          </Field>
        </FieldLabel>
      ))}
    </FieldGroup>
  ),
}

export const FieldSetWithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`FieldSet` renders a real `<fieldset>` with `FieldLegend` as its `<legend>`. `FieldSeparator` divides groups, optionally with a centered word.",
      },
    },
  },
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Protocol upgrades</FieldTitle>
            <FieldDescription>Network-wide changes only.</FieldDescription>
          </FieldContent>
          <Switch id="upgrades" defaultChecked />
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Everything</FieldTitle>
            <FieldDescription>Every release note we publish.</FieldDescription>
          </FieldContent>
          <Switch id="everything" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

export const ResponsiveOrientation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The same `orientation="responsive"` field in a wide and a narrow container. It flips on the **container** query (`@md/field-group`), not the viewport -- resize nothing to see both states.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {[
        { label: "Wide container", width: "w-full max-w-2xl" },
        { label: "Narrow container", width: "w-64" },
      ].map(({ label, width }) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="text-xs text-body-medium uppercase">{label}</span>
          <FieldGroup className={width}>
            <Field orientation="responsive">
              <FieldContent>
                <FieldTitle>Auto-update</FieldTitle>
                <FieldDescription>
                  Pull new releases as they ship.
                </FieldDescription>
              </FieldContent>
              <Switch id={`auto-${label}`} />
            </Field>
          </FieldGroup>
        </div>
      ))}
    </div>
  ),
}
