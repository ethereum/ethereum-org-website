import React, { ReactNode, useState } from "react"
import styled from "styled-components"

const TabList = styled.ul`
  display: flex;
  margin: 0;
  list-style-type: none;
  list-style-image: none;
`

const Tab = styled.li`
  border-bottom: 1px solid #f4d0a7;
  margin: 0;
`

const TabButton = styled.button<{ selected: boolean }>`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.selectActive : "transparent"};
  border: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  padding: 0.3rem 1rem;
`

const TabPanel = styled.div<{ display: boolean }>`
  display: ${({ display }) => (display ? "block" : "none")};
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  margin-top: 1rem;
  padding: 1.5rem;
`

interface Tab {
  title: string
  content: ReactNode
}

export interface IProps {
  tabs: Array<Tab>
}

/**
 * Minimal & temp Tab component until we migrate over a UI lib
 */
const Tabs = ({ tabs }) => {
  const [selected, setSelected] = useState(0)

  const handleTabClick = (index: number) => {
    setSelected(index)
  }

  if (!tabs.length) {
    return null
  }

  return (
    <div>
      <div>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index} onClick={() => handleTabClick(index)}>
              <TabButton selected={index === selected}>{tab.title}</TabButton>
            </Tab>
          ))}
        </TabList>
      </div>
      <div>
        {tabs.map((tab, index) => (
          <TabPanel display={index === selected}>{tab.content}</TabPanel>
        ))}
      </div>
    </div>
  )
}

export default Tabs
