import * as React from "react"
import { Stack } from "@chakra-ui/react"
import { Meta } from "@storybook/react"

import BreadcrumbsComponent from "."

const meta = {
  title: "Molecules / Navigation / Breadcrumbs",
  component: BreadcrumbsComponent,
} satisfies Meta<typeof BreadcrumbsComponent>

export default meta

export const Breadcrumbs = {
  render: () => (
    <Stack spacing="8">
      <BreadcrumbsComponent slug="/en/staking/" />
      <BreadcrumbsComponent slug="/en/staking/solo/" />
      <BreadcrumbsComponent slug="/en/roadmap/merge/issuance/" />
    </Stack>
  ),
}
