import * as React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Box, Flex, HStack, List, StackProps } from "@chakra-ui/react"

import { getDirection } from "../../utils/translations"

import { Lang } from "../../utils/languages"
import { ISections } from "./types"
import NavDropdown from "./Dropdown"

export interface IProps extends StackProps {
  sections: ISections
}

const Menu: React.FC<IProps> = ({ sections, ...props }) => {
  const { language } = useI18next()
  const direction = getDirection(language as Lang)

  const { useEthereum, learn, ...restSections } = sections

  const [start, basics, protocol] = learn.items
  return (
    <HStack
      as={List}
      aria-label="Main Navigation Link Groups"
      m={0}
      spacing="2"
      {...props}
    >
      <NavDropdown section={useEthereum}>
        <Box maxW="2xs" py="2">
          {useEthereum.items.map((item, idx) => (
            <NavDropdown.Item key={idx} to={item.to}>
              {item.text}
            </NavDropdown.Item>
          ))}
        </Box>
      </NavDropdown>

      <NavDropdown section={learn}>
        <Flex flexDir={direction === "rtl" ? "row-reverse" : "row"} gap="2">
          <Flex flexDir="column" gap="8" maxW="2xs">
            {[start, basics].map((section, idx) => (
              <Box py="2">
                <NavDropdown.ItemGroup key={idx} item={section} />
              </Box>
            ))}
          </Flex>
          <Box py="2" maxW="2xs">
            <NavDropdown.ItemGroup item={protocol} />
          </Box>
        </Flex>
      </NavDropdown>

      {Object.keys(restSections).map((sectionKey) => {
        const section = restSections[sectionKey]

        return (
          <NavDropdown key={sectionKey} section={section}>
            {section.items.map((item, index) => (
              <NavDropdown.Item key={index} to={item.to}>
                {item.text}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        )
      })}
    </HStack>
  )
}

export default Menu
