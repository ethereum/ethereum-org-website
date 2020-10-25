import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

//IconContext For styling
import { IconContext } from "react-icons"

//FontAwesome React-Icon Footer Imports
import {
  FaGithub,
  FaTwitterSquare,
  FaSun,
  FaYoutubeSquare,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa"
//FontAwesome React-Icon Navbar Imports
import {
  FaRegArrowAltCircleRight,
  FaExclamationCircle,
  FaRegWindowClose,
  FaBars,
  FaMoon,
  FaLanguage,
} from "react-icons/fa"

// TODO better way? FontAwesome?
const Icon = ({ name, size, className }) => {
  return (
    <IconContext.Provider
      value={{ size: size, className: className, paddingTop: "2px" }}
    >
      {name === "github" && <FaGithub />}
      {name === "twitter" && <FaTwitterSquare />}
      {name === "youtube" && <FaYoutubeSquare />}
      {name === "language" && <FaLanguage size="1.6rem" />}
      {name === "darkTheme" && <FaMoon />}
      {name === "lightTheme" && <FaSun />}
      {name === "search" && <FaSearch />}
      {name === "chevronDown" && (
        <FaChevronDown size="1.5rem" style={{ padding: "0 5" }} />
      )}
      {name === "chevronRight" && <FaRegArrowAltCircleRight />}
      {name === "menu" && <FaBars />}
      {name === "close" && <FaRegWindowClose />}
      {name === "info" && <FaExclamationCircle />}
    </IconContext.Provider>
  )
}

Icon.defaultProps = {
  name: ``,
  size: `24`,
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
}

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.secondary};

  &:hover path {
    fill: ${(props) => props.theme.colors.primary};
  }
`

export default StyledIcon
