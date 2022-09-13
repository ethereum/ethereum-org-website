import React from "react"
import { useTheme } from "@emotion/react"
import {
  Icon,
  Box,
  Container,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { AiOutlineArrowRight } from "react-icons/ai"
import Emoji from "./Emoji"

export interface IProps {
  children?: React.ReactNode
  to: string
  isExternal?: boolean
}

const DocLink: React.FC<IProps> = ({ to, children, isExternal = false }) => {
  const theme = useTheme()

  return (
    <LinkBox>
      <LinkOverlay href={to} isExternal={isExternal}>
        <Container
          textDecoration="none"
          width="100%"
          padding={4}
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
          <Flex
            position="relative"
            zIndex={1}
            display="flex"
            flexDirection="row"
            flex={1}
            justifyContent="space-between"
          >
            <Flex align="center">
              <Emoji fontSize="md" mr={4} text=":page_with_curl:" />
            </Flex>
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
              marginX={6}
              _groupHover={{
                fill: "primary",
                transition: "transform 0.1s",
                transform: "scale(1.2)",
                rotate: isExternal ? "-45deg" : "0",
              }}
            />
          </Flex>
        </Container>
      </LinkOverlay>
    </LinkBox>
  )
}

export default DocLink
