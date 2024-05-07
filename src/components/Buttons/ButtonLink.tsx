import Button, { type ButtonProps } from "@/components/Buttons/Button"
import { BaseLink, type LinkProps } from "@/components/Link"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type ButtonLinkProps = LinkProps &
  Omit<ButtonProps, "toId" | "onClick"> & {
    customEventOptions?: MatomoEventOptions
  }

const ButtonLink = ({ customEventOptions, ...props }: ButtonLinkProps) => {
  const handleClick = () => {
    customEventOptions && trackCustomEvent(customEventOptions)
  }
  return (
    <Button as={BaseLink} activeStyle={{}} {...props} onClick={handleClick} />
  )
}

export default ButtonLink
