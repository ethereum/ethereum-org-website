import React from "react";
import { Text } from "rebass";

const Caps = props => <Text {...props} css={{ textTransform: "uppercase" }} />;

Caps.defaultProps = {
  as: "p",
  color: "text",
  fontSize: "small",
  fontWeight: "bold",
  fontFamily: "worksans",
  letterSpacing: "0.24em",
  lineHeight: "solid"
};

export default Caps;
