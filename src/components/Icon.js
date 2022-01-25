import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { IconContext } from "react-icons"
import {
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaRedditAlien,
  FaStackExchange,
  FaGlobe,
} from "react-icons/fa"
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
  MdFlip,
  MdLiveHelp,
} from "react-icons/md"
import { BsQuestionSquareFill, BsToggleOff, BsToggleOn } from "react-icons/bs"
import { IoCodeOutline, IoCodeDownload } from "react-icons/io5"

const socialColors = {
  reddit: "#FF4301",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  discord: "#7289da",
  stackExchange: "#48a2da",
}

const Icon = ({ name, color = false, size, className }) => (
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
    {name === "zenModeOff" && <BsToggleOff />}
    {name === "zenModeOn" && <BsToggleOn />}
    {name === "menu" && <MdMenu />}
    {name === "twitter" && (
      <FaTwitter color={color ? socialColors.twitter : undefined} />
    )}
    {name === "search" && <MdSearch />}
    {name === "youtube" && (
      <FaYoutube color={color ? socialColors.youtube : undefined} />
    )}
    {name === "discord" && (
      <FaDiscord color={color ? socialColors.discord : undefined} />
    )}
    {name === "glossary" && <BsQuestionSquareFill />}
    {name === "codeDownload" && <IoCodeDownload />}
    {name === "code" && <IoCodeOutline />}
    {name === "flip" && <MdFlip />}
    {name === "help" && <MdLiveHelp />}
    {name === "reddit" && (
      <FaRedditAlien color={color ? socialColors.reddit : undefined} />
    )}
    {name === "stackExchange" && (
      <FaStackExchange color={color ? socialColors.stackExchange : undefined} />
    )}
    {name === "webpage" && <FaGlobe />}
  </IconContext.Provider>
)

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
  fill: ${(props) =>
    props.color ? props.color : props.theme.colors.secondary};

  &:hover svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

export default StyledIcon
