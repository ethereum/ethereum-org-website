import React from "react"
import { useTheme } from "@emotion/react"
import { Icon, Box, Container, Text } from "@chakra-ui/react"
import { AiOutlineArrowRight } from "react-icons/ai"
import Link from "./Link"
import Emoji from "./Emoji"

export interface IProps {
  children?: React.ReactNode
  to: string
  isExternal?: boolean
}

const DocLink: React.FC<IProps> = ({ to, children, isExternal = false }) => {
  const theme = useTheme()

  return (
    <Link to={to} isExternal={isExternal} textDecoration="none" hideArrow>
      <Container
        position="relative"
        zIndex={1}
        textDecoration="none"
        display="flex"
        flexDirection="row"
        flex={1}
        width="100%"
        justifyContent="space-between"
        padding="1rem"
        borderRadius="sm"
        color="text"
        border="1px"
        borderStyle="solid"
        borderColor="border"
        _hover={{
          textDecoration: "none",
          background: "tableBackgroundHover",
          borderRadius: "base",
        }}
        role="group"
      >
        <Box display="flex" alignItems="center">
          <Emoji fontSize="md" mr={4} text=":page_with_curl:" />
        </Box>
        <Box flex={1} flexDirection="column" color="text">
          <Text color="text300" fontWeight="semibold" margin={0}>
            {children}
          </Text>
        </Box>
        <Icon
          as={AiOutlineArrowRight}
          color="text"
          alignSelf="center"
          minWidth="2rem"
          boxSize={6}
          marginX="1.5rem"
          _groupHover={{
            fill: "primary",
            transition: "transform 0.1s",
            transform: "scale(1.2)",
          }}
        />
      </Container>
    </Link>
  )
}

export default DocLink
