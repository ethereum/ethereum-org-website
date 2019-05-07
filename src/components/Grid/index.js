import React from "react";
import { Flex } from "rebass";

const Row = props => <Flex {...props} />;

Row.defaultProps = {
  mx: ["unset", -3],
  flexDirection: ["column", "row"]
};

const Col = props => <Flex {...props} />;

Col.defaultProps = {
  px: ["unset", 3],
  flexDirection: "column",
  width: [null, 1 / 2]
};

export { Row, Col };
