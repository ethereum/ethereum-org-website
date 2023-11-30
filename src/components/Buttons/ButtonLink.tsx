import Button, { type ButtonProps } from "@/components/Buttons/Button"
import { BaseLink, type LinkProps } from "@/components/Link"

export type ButtonLinkProps = LinkProps & Omit<ButtonProps, "toId">

const ButtonLink = (props: ButtonLinkProps) => (
  <Button as={BaseLink} activeStyle={{}} {...props} />
)

export default ButtonLink
