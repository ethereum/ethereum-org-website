import React from "react"
import { Grid, Icon, GridProps, Box } from "@chakra-ui/react"
import { MdArrowDownward } from "react-icons/md"
import type { SimulatorStateProps } from "../../interfaces"
import { EthGlyphIcon } from "./icons"

interface IProps extends GridProps, SimulatorStateProps {}
export const HomeScreen: React.FC<IProps> = ({ state, ...props }) => {
  const { step } = state
  const ICON_COUNT = 8 as const
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
      maxW="full"
      gap={5}
      templateColumns="repeat(4, 1fr)"
      {...props}
    >
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <Box key={i} {...sharedIconStyles} bg="body.light" {...props} />
        ))}
      <Grid
        {...sharedIconStyles}
        bg={step === 1 ? "body.base" : "none"}
        borderStyle="dashed"
        borderColor={step === 1 ? "transparent" : "primary.hover"}
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
    </Grid>
  )
}
