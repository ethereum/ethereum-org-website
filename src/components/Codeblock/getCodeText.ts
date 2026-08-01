import { isValidElement, type ReactNode } from "react"

export const getCodeText = (child: unknown): string => {
  if (child == null || typeof child === "boolean") return ""

  if (
    typeof child === "string" ||
    typeof child === "number" ||
    typeof child === "bigint"
  ) {
    return String(child)
  }

  if (Array.isArray(child)) {
    return child.map(getCodeText).join("")
  }

  if (isValidElement<{ children?: ReactNode }>(child)) {
    return getCodeText(child.props.children)
  }

  const childType =
    typeof child === "object"
      ? Object.prototype.toString.call(child)
      : typeof child

  throw new TypeError(
    `Codeblock children must resolve to text; received ${childType}`
  )
}
