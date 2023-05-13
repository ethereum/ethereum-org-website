import { IProps as IButtonProps } from "../components/Button"
import { IProps as IButtonLinkProps } from "../components/ButtonLink"

export default function isButtonLink(
  button: IButtonProps | IButtonLinkProps
): button is IButtonLinkProps {
  return (button as IButtonLinkProps).to !== undefined
}
