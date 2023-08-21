import React from "react"
import { Flex, type FlexProps, Grid, Icon, createIcon } from "@chakra-ui/react"
import { MdArrowDownward } from "react-icons/md"
import type { SimulatorStateProps } from "../../interfaces"
import { EthGlyphIcon } from "./icons"

interface IProps extends FlexProps, SimulatorStateProps {}
export const HomeScreen: React.FC<IProps> = ({ state, ...props }) => {
  const { step } = state
  const ICON_COUNT = 9 as const
  // TODO: Import simulator step data, use to update this component view
  return (
    <Flex
      px={4}
      py={8}
      maxW="full"
      gap={5}
      justify="space-between"
      flexWrap="wrap"
      {...props}
    >
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <Grid
            key={i}
            minW="44px"
            aspectRatio={1}
            borderRadius="xl"
            placeItems="center"
            bg="body.light"
            {...props}
          />
        ))}
      <Grid
        minW="44px"
        aspectRatio={1}
        borderRadius="xl"
        placeItems="center"
        bg={step === 1 ? "body.base" : "none"}
        transition="background-color 2000ms ease-in-out, border 200ms ease-in--out"
        border={step === 1 ? "none" : "2px dashed"}
        borderColor="primary.hover"
        boxShadow={
          step === 1
            ? "0 0 7px 0 #000000C0"
            : "" /* TODO: Add shadow as token? */
        }
      >
        {step === 1 ? (
          <Icon as={EthGlyphIcon} color="background.base" height="26px" />
        ) : (
          <Icon as={MdArrowDownward} color="primary.hover" />
        )}
      </Grid>
    </Flex>
  )
}
