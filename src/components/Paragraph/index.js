import React from "react";
import { Text } from "rebass";

const Paragraph = props => <Text {...props} as="p" />;

Paragraph.defaultProps = {
  color: "text",
  fontSize: "medium",
  fontFamily: "worksans",
  lineHeight: "copy"
};

export default Paragraph;
