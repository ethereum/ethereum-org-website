import React from "react";
import { Box, Flex } from "rebass";
import PropTypes from "prop-types";
import useMedia from "react-use/lib/useMedia";

import Caps from "../Caps";
import { GradientBar } from "../Card";
import { InternalLink } from "../Links";

const Nav = ({ page }) => {
  const isNotMobile = useMedia("(min-width: 40em)");

  return (
    <Box
      css={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999
      }}
    >
      <Box css={{ maxWidth: 960 - 32 * 2 }} mx="auto">
        <Flex bg="primary" color="text">
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            css={{ position: "relative" }}
          >
            {page === "developers" && <GradientBar gradient="richblue" />}
            <InternalLink to="/developers/">
              <Caps m={0} py={4}>
                {isNotMobile ? "Developers" : "Devs"}
              </Caps>
            </InternalLink>
          </Flex>
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            css={{ position: "relative" }}
          >
            {page === "learn" && <GradientBar gradient="gossamer" />}
            <InternalLink to="/learn/">
              <Caps m={0} py={4}>
                Learn
              </Caps>
            </InternalLink>
          </Flex>
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            css={{ position: "relative" }}
          >
            {page === "news" && <GradientBar gradient="tapestry" />}
            <InternalLink to="/news/">
              <Caps m={0} py={4}>
                News
              </Caps>
            </InternalLink>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

Nav.propTypes = {
  page: PropTypes.oneOf("developers", "learn", "news")
};

export default Nav;
