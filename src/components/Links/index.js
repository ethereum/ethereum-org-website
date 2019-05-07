import React from "react";
import styled from "styled-components";
import { Link as RebassLink } from "rebass";
import { Link as GatsbyLink } from "gatsby";
import {
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf
} from "styled-system";

const linkStyles = {
  textDecoration: "none"
};

const ExternalLink = props => (
  <RebassLink
    {...props}
    target="_blank"
    rel="noopener noreferrer"
    css={linkStyles}
  />
);

const InternalLink = styled(GatsbyLink)(
  { ...linkStyles, color: "inherit" },
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf
);

export { InternalLink, ExternalLink };
