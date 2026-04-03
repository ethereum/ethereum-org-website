import type { Decorator } from "@storybook/nextjs"

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
