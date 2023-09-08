import React from "react"
import { Grid, Icon, GridProps, Box } from "@chakra-ui/react"
import { MdArrowDownward } from "react-icons/md"
import type { SimulatorNavProps } from "../../interfaces"
import { EthGlyphIcon } from "../../icons"

interface IProps extends GridProps, SimulatorNavProps {}
export const HomeScreen: React.FC<IProps> = ({ nav, ...props }) => {
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
      {step === 1 ? (
        <Grid
          key="download"
          {...sharedIconStyles}
          onClick={nav.progressStepper}
          cursor="pointer"
          as="button"
          transition={`
            background 0.8s ease-in-out,
            border-color 0.8s ease-in-out,
            box-shadow 0.8s ease-in-out
          `}
          bg="body.base"
          borderColor="body.base"
          boxShadow="0 0 7px 0 #000000C0"
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
          key="wallet-app"
          {...sharedIconStyles}
          as="button"
          bg="background.base"
          borderStyle="dashed"
          borderColor="primary.hover"
          onClick={nav.progressStepper}
          cursor="pointer"
          _hover={{
            borderColor: "primary.base",
          }}
          data-group
        >
          <Icon
            as={MdArrowDownward}
            color="primary.hover"
            _groupHover={{ color: "primary.base" }}
            fontSize={{ base: "2xl", sm: "3xl" }}
          />
        </Grid>
      )}
    </Grid>
  )
}
