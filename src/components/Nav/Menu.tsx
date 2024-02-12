import { Flex, FlexProps, List } from "@chakra-ui/react"

import NavDropdown from "./Dropdown"
// import { getDirection } from "../../utils/translations"
// import { Lang } from "../../utils/languages"
import { ISections } from "./types"

export type MenuProps = FlexProps & {
  path: string
  sections: ISections
}

const Menu = ({ path, sections, ...props }: MenuProps) => {
  // const { locale } = useRouter()
  const direction = "ltr"
  // const direction = getDirection(language as Lang)
  const shouldShowSubNav = path.includes("/developers/")

  const { useEthereum, learn, ...restSections } = sections

  const [start, basics, protocol] = learn.items

  return (
    <Flex
      as={List}
      alignItems="center"
      m={0}
      gap={{ base: 3, xl: 6 }}
      {...props}
    >
      <NavDropdown section={useEthereum}>
        {useEthereum.items.map((item, index) => (
          <NavDropdown.Item
            key={index}
            isLast={index === useEthereum.items.length - 1}
          >
            <NavDropdown.Link to={item.to} isPartiallyActive={false}>
              {item.text}
            </NavDropdown.Link>
          </NavDropdown.Item>
        ))}
      </NavDropdown>

      <NavDropdown section={learn}>
        <Flex flexDir={direction === "ltr" ? "row" : "row-reverse"}>
          <Flex flexDir="column" gap={4}>
            {[start, basics].map((section, index) => (
              <List m={0} key={index}>
                <NavDropdown.Title>{section.text}</NavDropdown.Title>
                {(section.items || []).map((item, index) => (
                  <NavDropdown.Item key={index}>
                    <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                      {item.text}
                    </NavDropdown.Link>
                  </NavDropdown.Item>
                ))}
              </List>
            ))}
          </Flex>
          <div>
            <List m={0}>
              <NavDropdown.Title>{protocol.text}</NavDropdown.Title>
              {(protocol.items || []).map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  isLast={index === (protocol.items || []).length - 1}
                >
                  <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                    {item.text}
                  </NavDropdown.Link>
                </NavDropdown.Item>
              ))}
            </List>
          </div>
        </Flex>
      </NavDropdown>

      {Object.keys(restSections).map((sectionKey) => {
        const section = restSections[sectionKey]

        return (
          <NavDropdown key={sectionKey} section={section}>
            {section.items.map((item, index) => (
              <NavDropdown.Item
                key={index}
                isLast={index === section.items.length - 1}
              >
                <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                  {item.text}
                </NavDropdown.Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        )
      })}
    </Flex>
  )
}

export default Menu
