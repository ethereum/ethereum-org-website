# Chakra migration guide

This is a reference for migrating our current `styled` components from `emotion` to [Chakra](https://chakra-ui.com/) components.

This is part of our [UI library implementation epic](https://github.com/ethereum/ethereum-org-website/issues/6374).

## Replace styled components with Chakra components

All `styled` components need to be removed and replaced with the corresponded Chakra component. [See the list of components](https://chakra-ui.com/docs/components).

Use as much native Chakra components as possible.

### Wrappers or layout divs

Use the [native layouts components](https://chakra-ui.com/docs/components/box)

```tsx
// before
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

// now
<Stack direction='row'>
```

Center things using the `<Center />` component

```tsx
// before
const Center = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// now
<Center h="100px">
```

Group buttons using `<ButtonGroup />` or `<Wrap />`

```tsx
// before
const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

// now
<ButtonGroup variant='outline' spacing={2}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>

// or
<Wrap spacing={2}>
  <WrapItem><Button variant="outline">Button 1</Button></WrapItem>
  <WrapItem><Button variant="outline">Button 2</Button></WrapItem>
</Wrap>
```

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

## Breakpoints

We will use [the Chakra default breakpoints](https://chakra-ui.com/docs/styled-system/theme#breakpoints) from now on. Check the following table to do the conversion:
| old breakpoints | new breakpoints |
|-----------------|-----------------|
| xs | - |
| s | sm |
| m | md |
| l | lg |
| xl | xl |
| - | 2xl |

```tsx
// before
const Container = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: block;
  }
`

// now
<Container display={{ base: 'block', sm: 'flex' }} />
```

## Theme colors

All the previous colors defined in the old theme `src/theme.ts` were ported into the new theme as well. Use the same color variables.

```tsx
// before
const Text = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.colors.background};
`

// now
<Text color="primary" bg="background" />
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

- [Deprecated]`src/components/SharedStyledComponents` - we are not using this anymore, replace everything with Chakra components.

```tsx
// before
import { ButtonPrimary, ButtonSecondary } from "../SharedStyledComponents"

// now
import Button from "../Button" // <-- use the new Button component built with Chakra

// use our primary button (uses the default `solid` variant)
<Button />
// or the outline version
<Button variant="outline" />
```

- [Deprecated] `src/components/OldEmoji` - replace it with the new `src/components/Emoji`

```tsx
// before
<Emoji size={3} mr="1rem" text=":star:">

// now
<Emoji fontSize="5xl" mr={4} text=":star:">
```

Note: check out the [`fontSize`](https://chakra-ui.com/docs/styled-system/theme#typography) and [`spacing`](https://chakra-ui.com/docs/styled-system/theme#spacing) possible values.

## Do you have any other question?

Ping us in Discord, in the `#ui-library-migration` channel, or leave a comment here or in your opened PR, and we can help you out 💪
