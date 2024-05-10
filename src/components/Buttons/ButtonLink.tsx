import Button, { type ButtonProps } from "@/components/Buttons/Button"
import { BaseLink, type LinkProps } from "@/components/Link"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type ButtonLinkProps = LinkProps &
  Omit<ButtonProps, "toId"> & {
    customEventOptions?: MatomoEventOptions
  }

const ButtonLink = ({ ...props }: ButtonLinkProps) => {
  return <Button as={BaseLink} activeStyle={{}} {...props} />
}

export default ButtonLink
