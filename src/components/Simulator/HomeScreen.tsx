import React from "react"
import { Flex, type FlexProps, Grid, Icon } from "@chakra-ui/react"
import { MdArrowDownward } from "react-icons/md"
import type { SimulatorStateProps } from "../../interfaces"

interface IProps extends FlexProps, SimulatorStateProps {}
export const HomeScreen: React.FC<IProps> = ({ state, ...props }) => {
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
            _last={{
              border: "2px dashed",
              borderColor: "primary.hover",
              bg: "none",
            }}
          >
            {/* Insert down-arrow icon */}
            {i === ICON_COUNT - 1 && (
              <Icon as={MdArrowDownward} color="primary.hover" />
            )}
          </Grid>
        ))}
    </Flex>
  )
}
