import { Box, Flex } from "@chakra-ui/react"

import FeedbackCard from "@/components/FeedbackCard"

export const StaticLayout = ({ children }) => (
  <Box w="full">
    <Flex
      justifyContent="space-between"
      w="full"
      // mx="auto"
      ml={24}
      mb={16}
      p={8}
      pt={{ base: 8, lg: 16 }}
      // TODO: set isRightToLeft
      // dir={isRightToLeft ? "rtl" : "ltr"}
    >
      <Box
        as="article"
        maxW="container.md"
        w="full"
        sx={{
          ".featured": {
            pl: 4,
            ml: -4,
            borderLeft: "1px dotted",
            borderLeftColor: "primary.base",
          },

          ".citation": {
            p: {
              color: "text200",
            },
          },
        }}
      >
        {children}

        <FeedbackCard />
      </Box>
    </Flex>
  </Box>
)
