import React from "react";
import { Box, Card as RebassCard } from "rebass";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const GradientBar = ({ gradient, gradientHeight, ...rest }) => {
  const gradientTypes = {
    gossamer: "linear-gradient(to left, #1D566D, #44EBA5);",
    richblue: "linear-gradient(to right, #6672E5, #43458A);",
    tapestry: "linear-gradient(to right, #F67180, #6B567A);"
  };

  const gradientHeights = {
    thin: "2px",
    thick: "6px"
  };

  return (
    <Box
      css={css`
        position: ${props => (props.sticky ? "fixed" : "absolute")};
        z-index: ${props => (props.sticky ? 99999 : "unset")};
        left: 0;
        right: 0;
        top: 0;
        height: ${gradientHeights[gradientHeight]};
        background-image: ${gradientTypes[gradient]};
        pointer-events: none;
      `}
      {...rest}
    />
  );
};

GradientBar.propTypes = {
  gradient: PropTypes.oneOf(["gossamer", "richblue", "tapestry"]),
  gradientHeight: PropTypes.oneOf(["thin", "thick"])
};

GradientBar.defaultProps = {
  gradientHeight: "thick"
};

const Card = styled(RebassCard)`
  position: relative;

  /* BEEG Shadow Style */
  ${props =>
    props.shadow &&
    css`
      &:hover::after {
        opacity: 1;
      }

      &::after {
        transition: opacity 250ms;
        position: absolute;
        opacity: 0;
        content: "";
        left: 5%;
        right: 5%;
        top: 5%;
        bottom: 5%;
        z-index: -1;
        box-shadow: 0 10px 40px 10px #000000;
      }
    `}
`;

Card.propTypes = {
  shadow: PropTypes.bool
};

export { GradientBar };

export default Card;
