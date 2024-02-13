import { calc, Flex, type FlexProps, type HeadingProps } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import ButtonDropdown, {
  ButtonDropdownProps,
  List as ButtonDropdownList,
} from "@/components/ButtonDropdown"
import OldHeading from "@/components/OldHeading"
import Translation from "@/components/Translation"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"

export const H2 = (props: HeadingProps) => (
  <OldHeading
    fontWeight={700}
    lineHeight={1.4}
    size="lg"
    textAlign="start"
    mt={0}
    {...props}
  />
)

export const StyledButtonDropdown = ({
  list,
  ...rest
}: FlexProps & Pick<ButtonDropdownProps, "list">) => (
  <Flex align="flex-end" justify="flex-end" mb={8} {...rest} pos="relative">
    <ButtonDropdown list={list} w="full" minW="240px" />
  </Flex>
)

type LeftNavBarProps = FlexProps & {
  dropdownLinks?: ButtonDropdownList
  maxDepth?: number
  tocItems: ToCItem[]
}

const LeftNavBar = ({
  dropdownLinks,
  maxDepth = 1,
  tocItems,
  ...props
}: LeftNavBarProps) => {
  return (
    <Flex
      as="aside"
      flexDirection="column"
      flex="0 1 400px"
      ms={8}
      me={16}
      position="sticky"
      top="6.25rem"
      height={calc("100vh").subtract("80px").toString()}
      zIndex={99}
      {...props}
    >
      {dropdownLinks && <StyledButtonDropdown list={dropdownLinks} />}
      <H2>
        <Translation id="on-this-page" />
      </H2>
      {tocItems && (
        <UpgradeTableOfContents items={tocItems} maxDepth={maxDepth} />
      )}
    </Flex>
  )
}

export default LeftNavBar
