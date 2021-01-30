import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { IconContext } from "react-icons"
import { FaGithub, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa"
import {
  MdAdd,
  MdBrightness2,
  MdClose,
  MdExpandMore,
  MdArrowForward,
  MdInfoOutline,
  MdLanguage,
  MdMenu,
  MdSearch,
  MdWbSunny,
} from "react-icons/md"
import { BsQuestionSquareFill } from "react-icons/bs"
import { IoCodeDownload } from "react-icons/io5"
import { IoCodeOutline } from "react-icons/io5"

const Icon = ({ name, size, className }) => {
  return (
    <IconContext.Provider value={{ size: size, className: className }}>
      {name === "add" && <MdAdd />}
      {name === "chevronDown" && <MdExpandMore />}
      {name === "arrowRight" && <MdArrowForward />}
      {name === "close" && <MdClose />}
      {name === "darkTheme" && <MdBrightness2 />}
      {name === "github" && <FaGithub />}
      {name === "info" && <MdInfoOutline />}
      {name === "language" && <MdLanguage />}
      {name === "lightTheme" && <MdWbSunny />}
      {name === "menu" && <MdMenu />}
      {name === "twitter" && <FaTwitter />}
      {name === "search" && <MdSearch />}
      {name === "youtube" && <FaYoutube />}
      {name === "discord" && <FaDiscord />}
      {name === "glossary" && <BsQuestionSquareFill />}
      {name === "codeDownload" && <IoCodeDownload />}
      {name === "code" && <IoCodeOutline />}
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
