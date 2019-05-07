import React from "react";
import { Box, Text } from "rebass";

import Container from "../Container";
import Paragraph from "../Paragraph";
import { ExternalLink } from "../Links";

const Stunt = () => (
  <Box bg="primary" py={[5, 6]}>
    <Container>
      <Paragraph>
        This site is a demo project by the team at Deep Work Studio
      </Paragraph>
      <Text fontFamily="worksans">
        <ExternalLink
          color="textinactive"
          href="https://medium.com/deep-work-studio/ethereum-org-needs-updating-51d22dda550a"
        >
          Learn why we did this →
        </ExternalLink>
      </Text>
    </Container>
  </Box>
);

export default Stunt;
