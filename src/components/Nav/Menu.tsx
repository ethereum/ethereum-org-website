import React from "react"
import styled from "@emotion/styled"
import { useI18next } from "gatsby-plugin-react-i18next"

import NavDropdown from "./Dropdown"
import { getDirection } from "../../utils/translations"

import { Lang } from "../../utils/languages"
import { Direction } from "../../types"
import { ISections } from "./types"

const TwoColumns = styled.div<{ dir: Direction }>`
  display: flex;
  flex-direction: ${({ dir }) => (dir === "rtl" ? "row-reverse" : "row")};
`

export interface IProps {
  path: string
  sections: ISections
}

const Menu: React.FC<IProps> = ({ path, sections }) => {
  const { language } = useI18next()
  const direction = getDirection(language as Lang)
  const shouldShowSubNav = path.includes("/developers/")

  const { useEthereum, learn, ...restSections } = sections

  const [start, basics, protocol] = learn.items

  return (
    <>
      <NavDropdown section={useEthereum} hasSubNav={shouldShowSubNav}>
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

      <NavDropdown section={learn} hasSubNav={shouldShowSubNav}>
        <TwoColumns dir={direction}>
          <div>
            {[start, basics].map((section, index) => (
              <React.Fragment key={index}>
                <NavDropdown.Title>{section.text}</NavDropdown.Title>
                {(section.items || []).map((item, index) => (
                  <NavDropdown.Item key={index}>
                    <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                      {item.text}
                    </NavDropdown.Link>
                  </NavDropdown.Item>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div>
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
          </div>
        </TwoColumns>
      </NavDropdown>

      {Object.keys(restSections).map((sectionKey) => {
        const section = restSections[sectionKey]

        return (
          <NavDropdown
            key={sectionKey}
            section={section}
            hasSubNav={shouldShowSubNav}
          >
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
    </>
  )
}

export default Menu
