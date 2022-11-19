import React, { ReactNode } from "react"
import {
  Tabs as ChakraTabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"

interface Tab {
  title: string
  content: ReactNode
}

export interface IProps {
  tabs: Array<Tab>
  onTabClick?: (tabIndex: number) => void
}

const Tabs: React.FC<IProps> = ({ tabs, onTabClick }) => {
  const handleTabClick = (index: number) => {
    if (onTabClick) {
      onTabClick(index)
    }
  }

  return (
    <ChakraTabs as="nav" variant="unstyled">
      <TabList>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            px={4}
            py="0.3rem"
            borderBottom="1px solid"
            borderColor="primary"
            borderTopRadius="0.3rem"
            _selected={{ color: "background", bg: "primary" }}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels as="main" mt={4}>
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            p={6}
            bg="ednBackground"
            border="1px solid"
            borderColor="lightBorder"
            borderRadius="lg"
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  )
}

export default Tabs
