import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import BreadcrumbsComponent from "."

type BreadcumbsType = typeof BreadcrumbsComponent

const meta: Meta<BreadcumbsType> = {
  title: "Molecules / Navigation / Breadcrumbs",
  component: BreadcrumbsComponent,
}

export default meta

type Story = StoryObj<typeof meta>

export const Breadcrumbs: Story = {
  render: () => (
    <>
      <BreadcrumbsComponent slug="/en/staking/" />
      <BreadcrumbsComponent slug="/en/staking/solo/" />
      <BreadcrumbsComponent slug="/en/roadmap/merge/issuance/" />
    </>
  ),
}
