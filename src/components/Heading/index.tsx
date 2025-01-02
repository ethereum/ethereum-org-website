import {
  forwardRef,
  Heading as ChakraHeading,
  type HeadingProps,
  type ThemingProps,
} from "@chakra-ui/react"

export type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const HEADING_SIZE_DEFAULTS: Record<
  HeadingTags,
  ThemingProps<"Heading">["size"]
> = {
  h1: "2xl",
  h2: "xl",
  h3: "lg",
  h4: "md",
  h5: "sm",
  h6: "xs",
}

/**
 * This is a wrapper component for the Chakra `Heading` component, and forwards its ref and props.
 *
 * This supplies a default `size` theme token based on the
 * heading tag being passed to the `as` prop. Defaults to `h2` with the `xl`
 * tag, per the Chakra default.
 */
const Heading = forwardRef<HeadingProps, "h2">((props, ref) => {
  const { as = "h2", size: sizeProp, ...rest } = props

  let size: typeof sizeProp

  if (sizeProp) {
    // If a `size` value is passed to this wrapper, send it on through!
    size = sizeProp
  } else {
    // If a `size` value is not passed to this wrapper, set a default based on the element
    // provided to the `as` prop
    // Only heading elements will set the defaults (Default heading is `h2`)
    const headingDefaultKeys = Object.keys(HEADING_SIZE_DEFAULTS)

    if (typeof as === "string" && headingDefaultKeys.includes(as)) {
      size = HEADING_SIZE_DEFAULTS[as]
    }
  }

  return <ChakraHeading ref={ref} as={as} size={size} {...rest} />
})

export default Heading
