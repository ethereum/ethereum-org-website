import { IProps as IButtonLinkProps } from "../components/ButtonLink"

export default function isButtonLink(button: any): button is IButtonLinkProps {
  return (
    (button as IButtonLinkProps).to !== undefined &&
    (button as IButtonLinkProps).to !== null
  )
}
