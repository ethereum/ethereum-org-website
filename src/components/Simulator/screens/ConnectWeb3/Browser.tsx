import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BsTriangle } from "react-icons/bs"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { PiMagnifyingGlass } from "react-icons/pi"
import { TbWorldWww } from "react-icons/tb"
import { Box, Flex, type FlexProps, Icon, Text } from "@chakra-ui/react"

import { BASE_ANIMATION_DELAY_SEC } from "../../constants"
import { NotificationPopover } from "../../NotificationPopover"

import { EXAMPLE_APP_URL } from "./constants"

type BrowserProps = FlexProps

export const Browser = ({ ...props }: BrowserProps) => {
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyping(true)
    }, BASE_ANIMATION_DELAY_SEC * 1000)
    return () => clearTimeout(timeout)
  }, [])

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }
  const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  }

  return (
    <Flex direction="column" h="full" bg="body.light" {...props}>
      <Box bg="background.highlight" w="full" px={3} pt={9} pb={3}>
        <NotificationPopover
          title="Example walkthrough"
          content="Try logging into a real app with your wallet when finished here"
        >
          <Flex
            bg="background.base"
            borderRadius="base"
            px={3}
            py={2}
            align="center"
            color="disabled"
            cursor="default"
          >
            <Box
              borderInlineEnd="1px"
              borderColor="background.highlight"
              flex={1}
            >
              {typing ? (
                <Text
                  as={motion.p}
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                  color="body.medium"
                >
                  {EXAMPLE_APP_URL.split("").map((char, index) => (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </Text>
              ) : (
                <Text>Search or enter website</Text>
              )}
            </Box>
            <Icon as={TbWorldWww} ms={3} />
          </Flex>
        </NotificationPopover>
      </Box>

      <Flex flex={1} justify="center" pt={{ base: 20, md: 24 }}>
        <Icon as={TbWorldWww} fontSize="8xl" strokeWidth="1" color="disabled" />
      </Flex>

      <Flex
        bg="background.highlight"
        w="full"
        px={3}
        pb={9}
        pt={4}
        justify="space-around"
        fontSize="xl"
        color="disabled"
      >
        <Icon as={BsTriangle} transform="rotate(-90deg)" />
        <Icon as={BsTriangle} transform="rotate(90deg)" />
        <Icon as={PiMagnifyingGlass} />
        <Icon as={IoEllipsisHorizontalSharp} />
      </Flex>
    </Flex>
  )
}
