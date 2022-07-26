import React, { ReactNode, useState } from "react"
import styled from "styled-components"

const TabList = styled.ul`
  display: flex;
  margin: 0;
  list-style-type: none;
  list-style-image: none;
`

const Tab = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  margin: 0;
`

const TabButton = styled.button<{ selected: boolean }>`
  display: block;
  cursor: pointer;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.background : theme.colors.text};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "transparent"};
  border: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  padding: 0.3rem 1rem;
`

const TabPanel = styled.div`
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
  onTabClick?: (tabIndex: number) => void
}

/**
 * Minimal & temp Tab component until we migrate over a UI lib
 */
const Tabs: React.FC<IProps> = ({ tabs, onTabClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedTab = tabs[selectedIndex]

  const handleTabClick = (index: number) => {
    setSelectedIndex(index)

    if (onTabClick) {
      onTabClick(index)
    }
  }

  return (
    <div>
      <nav>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index} onClick={() => handleTabClick(index)}>
              <TabButton selected={index === selectedIndex}>
                {tab.title}
              </TabButton>
            </Tab>
          ))}
        </TabList>
      </nav>
      <main>
        <TabPanel>{selectedTab.content}</TabPanel>
      </main>
    </div>
  )
}

export default Tabs
