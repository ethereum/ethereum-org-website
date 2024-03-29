import React, { ReactNode } from "react"
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as ChakraTabs,
} from "@chakra-ui/react"

interface Tab {
  title: string
  content: ReactNode
}

export type TabsProps = {
  tabs: Array<Tab>
  onTabClick?: (tabIndex: number) => void
}

const Tabs = ({ tabs, onTabClick }: TabsProps) => {
  const handleTabClick = (index: number) => {
    if (onTabClick) {
      onTabClick(index)
    }
  }

  return (
    <ChakraTabs as="nav">
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index} onClick={() => handleTabClick(index)}>
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels as="main">
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  )
}

export default Tabs
