import * as React from "react"
import { Meta } from "@storybook/react"
import BreadcrumbsComponent from "."

const meta = {
  title: "Molecules / Navigation / Breadcrumbs",
  component: BreadcrumbsComponent,
} satisfies Meta<typeof BreadcrumbsComponent>

export default meta

export const Breadcrumbs = {
  render: () => (
    <>
      <BreadcrumbsComponent slug="/en/staking/" />
      <BreadcrumbsComponent slug="/en/staking/solo/" />
      <BreadcrumbsComponent slug="/en/roadmap/merge/issuance/" />
    </>
  ),
}
