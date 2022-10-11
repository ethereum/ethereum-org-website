import React, { ReactNode } from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  BackgroundProps,
  Box,
  Center,
  ChakraProps,
  Collapse,
  forwardRef,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { MdExpandMore } from "react-icons/md"

export interface IProps extends ChakraProps {
  children?: React.ReactNode
  image?: IGatsbyImageData
  title: ReactNode
  contentPreview: ReactNode
  background: BackgroundProps["background"]
  forceOpen?: boolean
  className?: string
}

const ExpandableInfo = forwardRef<IProps, "div">(
  (
    {
      image,
      title,
      contentPreview,
      children,
      background,
      forceOpen,
      className,
      ...rest
    },
    ref
  ) => {
    const { isOpen, getButtonProps, getDisclosureProps } = useDisclosure({
      defaultIsOpen: forceOpen,
    })

    const chevronFlip = {
      collapsed: {
        rotate: 0,
        transition: {
          duration: 0.1,
        },
      },
      expanded: {
        rotate: 180,
        transition: {
          duration: 0.4,
        },
      },
    }

    const animateToggle = isOpen ? "expanded" : "collapsed"

    return (
      <VStack
        border="1px solid"
        borderColor="border"
        borderRadius="2px"
        p="1.5rem"
        mb="1rem"
        spacing="0"
        background={background ?? "background"}
        position="relative"
        _hover={{
          "& img": {
            transform: "scale(1.08)",
            transition: "transform 0.1s",
          },
        }}
        ref={ref}
        {...rest}
      >
        <Stack
          justify="space-between"
          gap={{ base: "2rem", md: "3rem" }}
          flexDirection={{ base: "column", md: "row" }}
          width="full"
        >
          {image && <GatsbyImage image={image} alt="" />}
          <HStack gap="3rem" width="full">
            <Box mr="1rem">
              <HStack
                width="full"
                m="1rem 0"
                sx={{
                  img: {
                    mr: "1.5rem",
                  },
                }}
              >
                <Heading mt="0rem" mb="0.5rem" size="md" fontWeight="600">
                  {title}
                </Heading>
              </HStack>
              <Text color="text200" mb="0">
                {contentPreview}
              </Text>
            </Box>
          </HStack>
          {!forceOpen && (
            <Center
              as={motion.div}
              variants={chevronFlip}
              animate={animateToggle}
              initial={false}
              {...getButtonProps()}
              width={{ base: "full", md: "5rem" }}
              minHeight={{ base: "full", md: "10rem" }}
              cursor="pointer"
              _hover={{
                "& svg": {
                  transform: "scale(1.25)",
                  transition: "transform 0.1s",
                },
              }}
            >
              <Icon as={MdExpandMore} boxSize="initial" size="36" />
            </Center>
          )}
        </Stack>
        <Collapse
          {...getDisclosureProps()}
          in={isOpen}
          startingHeight="0"
          endingHeight="100%"
          initial={false}
        >
          <Box
            color="text"
            mt="2rem"
            borderTop="1px solid"
            borderColor="border"
            paddingTop="1.5rem"
          >
            {children}
          </Box>
        </Collapse>
      </VStack>
    )
  }
)

export default ExpandableInfo
