import React from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"

import NavDropdown from "./Dropdown"
import Translation from "../Translation"
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
  const intl = useIntl()
  const direction = getDirection(intl.locale as Lang)
  const shouldShowSubNav = path.includes("/developers/")

  const { useEthereum, learn, ...restSections } = sections

  const [start, basics, protocol] = learn.items

  return (
    <>
      <NavDropdown section={useEthereum} hasSubNav={shouldShowSubNav}>
        {useEthereum.items.map((item, index) => (
          <NavDropdown.Item isLast={index === useEthereum.items.length - 1}>
            <NavDropdown.Link to={item.to} isPartiallyActive={false}>
              <Translation id={item.text} />
            </NavDropdown.Link>
          </NavDropdown.Item>
        ))}
      </NavDropdown>

      <NavDropdown section={learn} hasSubNav={shouldShowSubNav}>
        <TwoColumns dir={direction}>
          <div>
            {[start, basics].map((section) => (
              <>
                <NavDropdown.Title>{section.text}</NavDropdown.Title>
                {(section.items || []).map((item) => (
                  <NavDropdown.Item>
                    <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                      <Translation id={item.text} />
                    </NavDropdown.Link>
                  </NavDropdown.Item>
                ))}
              </>
            ))}
          </div>
          <div>
            <NavDropdown.Title>{protocol.text}</NavDropdown.Title>
            {(protocol.items || []).map((item, index) => (
              <NavDropdown.Item
                isLast={index === (protocol.items || []).length - 1}
              >
                <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                  <Translation id={item.text} />
                </NavDropdown.Link>
              </NavDropdown.Item>
            ))}
          </div>
        </TwoColumns>
      </NavDropdown>

      {Object.keys(restSections).map((sectionKey) => {
        const section = restSections[sectionKey]

        return (
          <NavDropdown section={section} hasSubNav={shouldShowSubNav}>
            {section.items.map((item, index) => (
              <NavDropdown.Item isLast={index === section.items.length - 1}>
                <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                  <Translation id={item.text} />
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
