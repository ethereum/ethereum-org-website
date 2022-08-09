# Chakra migration guide

This is a reference for migrating our current `styled` components from `emotion` to [Chakra](https://chakra-ui.com/) components.

This is part of our [UI library implementation epic](https://github.com/ethereum/ethereum-org-website/issues/6374).

## Replace styled components with Chakra components

All `styled` components need to be removed and replaced with the corresponded Chakra component. [See the list of components](https://chakra-ui.com/docs/components).

## Override styles using style props

- You can see how to use the different style props here: [https://chakra-ui.com/docs/styled-system/style-props](https://chakra-ui.com/docs/styled-system/style-props#margin-and-padding)
- Chakra default values are documented here: [https://chakra-ui.com/docs/styled-system/theme](https://chakra-ui.com/docs/styled-system/theme)

```tsx
// before
const Paragraph = styled.p`
  font-size: 1rem;
  margin: 1rem;
`

// now
<Text fontSize="md" margin={4} />
```

## Theme colors

So far, we only have the `primary` color defined in the new theme. Update it like this:

```tsx
// before
const Text = styled.p`
	color: ${({ theme }) => theme.colors.primary};
`

// now
<Text color="primary" />
```

For the rest of colors, hardcode them by using `[useColorModeValue](https://chakra-ui.com/docs/styled-system/color-mode#usecolormodevalue)`

```tsx
// before
const Container = styled.div`
  border-color: ${({ theme }) => theme.colors.lightBorder};
`
const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
`

// now
import { useColorModeValue } from "@chakra-ui/react"

function Component() {
  const textColor = useColorModeValue("#333333", "#f2f2f2")
  const borderColor = useColorModeValue("#404040", "#ececec")

  return (
    <Box borderColor={borderColor}>
      <Text color={textColor} />
    </Box>
  )
}
```

<aside>
💡 In the **next iteration** we will refactor all the colors with the correct color from the new Design System
</aside>

## Update dependencies

- [Deprecated] `src/components/Icon` - use the [Chakra Icon](https://chakra-ui.com/docs/components/icon/usage) instead.

```tsx
import { Icon } from "@chakra-ui/react"
import { BsQuestionSquareFill } from "react-icons/bs"
;<Icon as={BsQuestionSquareFill} />
```

- [Deprecated]`src/components/SharedStyledComponents` - we are not using this anymore, use Chakra components instead.

## Do you have any other question?

Ping us in Discord, in the `#ui-library-migration` channel, or leave a comment here or in your opened PR, and we can help you out 💪
