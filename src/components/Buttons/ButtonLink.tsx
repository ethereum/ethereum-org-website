import Button, { type ButtonProps } from "@/components/Buttons/Button"
import { BaseLink, type LinkProps } from "@/components/Link"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type ButtonLinkProps = LinkProps &
  Omit<ButtonProps, "toId" | "onClick"> & {
    customEventOptions?: MatomoEventOptions
  }

const ButtonLink = ({ customEventOptions, ...props }: ButtonLinkProps) => {
  const matomoEvent = customEventOptions ?? {
    eventCategory: "Link",
    eventAction: "clicked",
    eventName: "ButtonLink clicked",
    eventValue: (props.to ?? props.href) as string,
  }
  return (
    <Button
      as={BaseLink}
      activeStyle={{}}
      {...props}
      onClick={() => trackCustomEvent(matomoEvent)}
    />
  )
}

export default ButtonLink
