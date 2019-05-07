import React from "react";
import { Heading } from "rebass";

const Header = props => <Heading {...props} />;

Header.defaultProps = {
  fontSize: "xlarge",
  fontWeight: "extrabold",
  fontFamily: "raleway",
  lineHeight: "copy",
  color: "text"
};

export default Header;
