import type { Decorator } from "@storybook/react"

import { Phone } from "../Phone"
import { Template } from "../Template"

export const PhoneDecorator: Decorator = (Story) => {
  return (
    <div className="mx-auto mt-8">
      <Template>
        <Phone>
          <Story />
        </Phone>
      </Template>
    </div>
  )
}
