import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdArrowDownward } from "react-icons/md"
import { Box, Grid, GridProps, Icon, useColorModeValue } from "@chakra-ui/react"

import type { SimulatorNavProps } from "@/lib/types"

import { EthGlyphIcon } from "../../icons"

type HomeScreenProps = GridProps & SimulatorNavProps

export const HomeScreen = ({ nav, ...props }: HomeScreenProps) => {
  const gridShadow = useColorModeValue(
    "0 0 7px 0 var(--eth-colors-blackAlpha-800)",
    "0 0 7px 0 var(--eth-colors-whiteAlpha-800)"
  )

  const { step } = nav
  const ICON_COUNT = 8
  const sharedIconStyles = {
    w: "full",
    aspectRatio: 1,
    borderRadius: "xl",
    placeItems: "center",
    transition:
      "background-color 2000ms ease-in-out, border 200ms ease-in--out",
    border: "2px solid transparent",
  } as const
  return (
    <Grid
      px={6}
      py={8}
      w="full"
      gap={5}
      templateColumns="repeat(4, 1fr)"
      {...props}
    >
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <Box key={i} {...sharedIconStyles} bg="body.light" />
        ))}
      <AnimatePresence>
        {step === 1 ? (
          <Grid
            as={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...sharedIconStyles}
            onClick={nav.progressStepper}
            transitionDuration="0.3s"
            bg="body.base"
            borderColor="body.base"
            boxShadow={gridShadow}
            _hover={{
              outline: "2px solid var(--eth-colors-primary-hover)",
              outlineOffset: "2px",
            }}
          >
            <Icon
              as={EthGlyphIcon}
              color="background.base"
              fontSize={{ base: "2xl", sm: "3xl" }}
            />
          </Grid>
        ) : (
          <Grid
            as={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transitionDuration="0.2s"
            {...sharedIconStyles}
            bg="background.base"
            borderStyle="dashed"
            borderColor="disabled"
          >
            <Icon
              as={MdArrowDownward}
              color="disabled"
              fontSize={{ base: "2xl", sm: "3xl" }}
            />
          </Grid>
        )}
      </AnimatePresence>
    </Grid>
  )
}
