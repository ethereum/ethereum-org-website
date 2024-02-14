import { Box, Text, Tooltip } from "@chakra-ui/react"

import DismissableBanner from "@/components/Banners/DismissableBanner"
import Emoji from "@/components/Emoji"
import Link from "@/components/Link"

const DencunBanner = () => (
  <DismissableBanner storageKey="devconGrants">
    <Text m={0}>
      <Emoji text="🚨" me="2" />
      The Deneb + Cancun network upgrade is scheduled for{" "}
      <Tooltip
        label={
          <Box bg="background.base" p="2" rounded="base">
            Epoch 269568 -{" "}
            {new Date("2024-03-13T01:55:35.000Z").toLocaleString()}
          </Box>
        }
        aria-label="Deneb/Cancun timing"
      >
        {new Date("2024-03-13T01:55:35.000Z").toLocaleDateString()}
      </Tooltip>
      . Node operators must update client software to a supported version to
      prepare.{" "}
      <Link
        href="#TODO-link-blog-announcement-when-ready"
        color="background.base !important"
      >
        Learn more
      </Link>
    </Text>
  </DismissableBanner>
)

export default DencunBanner
