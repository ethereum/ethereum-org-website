import * as React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Flex, HStack, List } from "@chakra-ui/react"

import { getDirection } from "../../utils/translations"

import { Lang } from "../../utils/languages"
import { ISections } from "./types"
import NavDropdown from "./Dropdown"

export interface IProps {
  sections: ISections
}

const Menu: React.FC<IProps> = ({ sections }) => {
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
    >
      <NavDropdown section={useEthereum}>
        {useEthereum.items.map((item, idx) => (
          <NavDropdown.Item key={idx} to={item.to}>
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>

      <NavDropdown section={learn}>
        <Flex flexDir={direction === "rtl" ? "row-reverse" : "row"} gap="8">
          <Flex flexDir="column" gap="16">
            {[start, basics].map((section, idx) => (
              <NavDropdown.ItemGroup key={idx} item={section} />
            ))}
          </Flex>
          <NavDropdown.ItemGroup item={protocol} />
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
