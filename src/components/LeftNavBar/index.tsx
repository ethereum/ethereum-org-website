import React from "react"
import { calc, Flex, FlexProps, HeadingProps } from "@chakra-ui/react"

import ButtonDropdown, {
  IProps as ButtonDropdownProps,
  List as ButtonDropdownList,
} from "../ButtonDropdown"
import OldHeading from "../OldHeading"
import Translation from "../Translation"
import UpgradeTableOfContents from "../UpgradeTableOfContents"

export const H2 = (props: HeadingProps) => (
  <OldHeading
    fontWeight={700}
    lineHeight={1.4}
    size="lg"
    textAlign="left"
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

interface IProps extends FlexProps {
  dropdownLinks?: ButtonDropdownList
  maxDepth?: number
  tocItems: any[]
}

const LeftNavBar: React.FC<IProps> = ({
  dropdownLinks,
  maxDepth = 1,
  tocItems,
  ...props
}) => {
  return (
    <Flex
      as="aside"
      flexDirection="column"
      flex="0 1 400px"
      ml={8}
      mr={16}
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
