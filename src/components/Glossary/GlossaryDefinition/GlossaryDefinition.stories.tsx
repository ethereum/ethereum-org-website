import { Meta, StoryObj } from "@storybook/react"

import GlossaryDefinitionComponent from "."

const meta = {
  title: "GlossaryDefinition",
  component: GlossaryDefinitionComponent,
} as Meta<typeof GlossaryDefinitionComponent>

export default meta

export const GlossaryDefinition: StoryObj<typeof meta> = {
  args: {
    term: "51%-attack",
  },
}
