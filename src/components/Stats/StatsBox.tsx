import React from "react"
import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react"

import Icon from "../Icon"
import Tooltip from "../Tooltip"

interface Stat {
  number: String
  label: String
  tooltip: String
  tooltipUrl: String
}

interface IProps {
  stats: Stat[]
}

const StatsBox: React.FC<IProps> = ({ stats }) => {
  const tooltipContent = () => {
    return <p>test</p>
  }

  return (
    <Flex flexDirection={{ base: "column", md: "row" }} gap={8}>
      {stats.map((stat: Stat, idx) => (
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          flex={{ base: "100%", md: "33%" }}
          p="0 5"
          borderRight={
            idx === stats.length - 1
              ? "none"
              : { base: "none", md: "2px solid white" }
          }
          borderBottom={
            idx === stats.length - 1
              ? "none"
              : { base: "2px solid white", md: "none" }
          }
          pr={{ base: 0, md: 5 }}
          pb={{ base: 8, md: 0 }}
        >
          <Flex flexDirection="column">
            <Heading
              fontWeight={600}
              fontSize="6xl"
              color="primary"
              fontFamily="Inter"
              m={0}
            >
              {stat.number}
            </Heading>
            <Flex justifyContent="center" gap={2}>
              <Box w={40}>
                <Text opacity={"0.8"} m={0}>
                  {stat.label}
                </Text>
              </Box>
              <Center>
                <Tooltip content={tooltipContent()}>
                  <Icon name="info" size="16" />
                </Tooltip>
              </Center>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default StatsBox
