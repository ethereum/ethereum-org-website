import { Meta, StoryObj } from "@storybook/nextjs"

import GlossaryDefinitionComponent from "."

const meta = {
  title: "Components / Content / Glossary / Definition",
  component: GlossaryDefinitionComponent,
  tags: ["autodocs"],
} as Meta<typeof GlossaryDefinitionComponent>

export default meta

export const GlossaryDefinition: StoryObj<typeof meta> = {
  args: {
    term: "51%-attack",
  },
}
