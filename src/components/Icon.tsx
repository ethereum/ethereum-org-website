import React from "react"
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
  MdOutlineCancel,
  MdCircle,
  MdClose,
  MdDone,
  MdExpandLess,
  MdExpandMore,
  MdArrowForward,
  MdInfoOutline,
  MdLanguage,
  MdMenu,
  MdSearch,
  MdWbSunny,
  MdFlip,
  MdLiveHelp,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md"
import {
  BsArrowCounterclockwise,
  BsQuestionSquareFill,
  BsToggleOff,
  BsToggleOn,
} from "react-icons/bs"
import { IoCodeOutline, IoCodeDownload } from "react-icons/io5"

const socialColors = {
  reddit: "#ff4301",
  twitter: "#1da1f2",
  youtube: "#ff0000",
  discord: "#7289da",
  stackExchange: "#48a2da",
}

export interface IProps {
  name?: string
  color?: string | boolean
  size?: string
  className?: string
}

const Icon: React.FC<IProps> = ({
  name = "",
  color,
  size = "24",
  className,
}) => (
  <IconContext.Provider value={{ size: size, className }}>
    {name === "add" && <MdAdd />}
    {name === "chevronUp" && <MdExpandLess />}
    {name === "chevronDown" && <MdExpandMore />}
    {name === "circle" && <MdCircle />}
    {name === "arrowRight" && <MdArrowForward />}
    {name === "arrowRightIos" && <MdKeyboardArrowRight />}
    {name === "arrowLeftIos" && <MdKeyboardArrowLeft />}
    {name === "cancel" && <MdOutlineCancel />}
    {name === "close" && <MdClose />}
    {name === "darkTheme" && <MdBrightness2 />}
    {name === "github" && <FaGithub />}
    {name === "info" && <MdInfoOutline />}
    {name === "language" && <MdLanguage />}
    {name === "lightTheme" && <MdWbSunny />}
    {name === "toggleOff" && <BsToggleOff />}
    {name === "toggleOn" && <BsToggleOn />}
    {name === "menu" && <MdMenu />}
    {name === "check" && <MdDone />}
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
    {name === "arrowCounterClockwise" && <BsArrowCounterclockwise />}
  </IconContext.Provider>
)

const StyledIcon = styled(Icon)`
  fill: ${(props) =>
    props.color ? props.color : props.theme.colors.secondary};

  &:hover svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

export default StyledIcon
