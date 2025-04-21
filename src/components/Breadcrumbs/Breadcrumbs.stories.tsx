import { Meta, type StoryObj } from "@storybook/react"

import { Stack } from "../ui/flex"

import BreadcrumbsComponent from "."

const meta = {
  title: "Molecules / Navigation / Breadcrumbs",
  component: BreadcrumbsComponent,
} satisfies Meta<typeof BreadcrumbsComponent>

export default meta

export const Breadcrumbs: StoryObj = {
  render: () => (
    <Stack className="gap-8">
      <BreadcrumbsComponent slug="/staking/" />
      <BreadcrumbsComponent slug="/staking/solo/" />
      <BreadcrumbsComponent slug="/roadmap/merge/issuance/" />
    </Stack>
  ),
}
