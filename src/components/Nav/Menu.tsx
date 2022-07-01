import React from "react"
import styled from "styled-components"

import Translation from "../Translation"
import NavDropdown from "./Dropdown"

import { ISections } from "./types"

const TwoColumns = styled.div`
  display: flex;
`

export interface IProps {
  path: string
  sections: ISections
}

const Menu: React.FC<IProps> = ({ path, sections }) => {
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
        <TwoColumns>
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
