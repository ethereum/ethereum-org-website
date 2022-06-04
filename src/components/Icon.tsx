import React from "react"
import styled from "styled-components"
import { IconContext } from "@react-icons/all-files"

import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube"
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord"
import { FaRedditAlien } from "@react-icons/all-files/fa/FaRedditAlien"
import { FaStackExchange } from "@react-icons/all-files/fa/FaStackExchange"
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe"

import { MdAdd } from "@react-icons/all-files/md/MdAdd"
import { MdBrightness2 } from "@react-icons/all-files/md/MdBrightness2"
import { MdClose } from "@react-icons/all-files/md/MdClose"
import { MdExpandMore } from "@react-icons/all-files/md/MdExpandMore"
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward"
import { MdInfoOutline } from "@react-icons/all-files/md/MdInfoOutline"
import { MdLanguage } from "@react-icons/all-files/md/MdLanguage"
import { MdMenu } from "@react-icons/all-files/md/MdMenu"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"
import { MdWbSunny } from "@react-icons/all-files/md/MdWbSunny"
import { MdFlip } from "@react-icons/all-files/md/MdFlip"
import { MdLiveHelp } from "@react-icons/all-files/md/MdLiveHelp"

import { BsQuestionSquareFill } from "@react-icons/all-files/bs/BsQuestionSquareFill"
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff"
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn"

import { IoCodeOutline } from "@react-icons/all-files/io5/IoCodeOutline"
import { IoCodeDownload } from "@react-icons/all-files/io5/IoCodeDownload"

const socialColors = {
  reddit: "#ff4301",
  twitter: "#1da1f2",
  youtube: "#ff0000",
  discord: "#7289da",
  stackExchange: "#48a2da",
}

interface IProps {
  name?: string
  color?: string
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

const StyledIcon = styled(Icon)`
  fill: ${(props) =>
    props.color ? props.color : props.theme.colors.secondary};

  &:hover svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

export default StyledIcon
