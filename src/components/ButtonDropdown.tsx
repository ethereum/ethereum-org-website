// Libraries
import React, { useState, createRef } from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
import { motion } from "framer-motion"

// Components
import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"
import { ButtonSecondary } from "./SharedStyledComponents"

// Utils
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { translateMessageId, TranslationKey } from "../utils/translations"
import { trackCustomEvent } from "../utils/matomo"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    flex-direction: column-reverse;
  }
`

const DropdownList = styled(motion.ul)`
  min-width: 240px;
  z-index: 2;
  margin: 0;
  margin-top: 0.25rem;
  position: absolute;
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.dropdownBackground};
  border: 1px solid ${(props) => props.theme.colors.text};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    text-align: center;
    position: initial;
  }
`

const listVariants = {
  open: {
    opacity: 1,
    rotateX: 0,
    display: "block",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    rotateX: -15,
    transitionEnd: {
      display: "none",
    },
  },
}

const Button = styled(ButtonSecondary)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 240px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 1rem;
  }
`

const DropdownItem = styled.li`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.dropdownBackgroundHover};
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const NakedNavLink = styled.div`
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

export interface ListItem {
  text: TranslationKey
  to?: string
  matomo?: {
    eventCategory: string
    eventAction: string
    eventName: string
  }
  callback?: (idx: number) => void
}

export interface List {
  text: TranslationKey
  ariaLabel: string
  items: Array<ListItem>
}

export interface IProps {
  list: List
  className?: string
}

const ButtonDropdown: React.FC<IProps> = ({ list, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const intl = useIntl()
  const ref = createRef<HTMLInputElement>()

  useOnClickOutside(ref, () => setIsOpen(false))

  // Toggle on `enter` key
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "13") {
      setIsOpen(!isOpen)
    }
  }

  return (
    <Container
      className={className}
      ref={ref}
      aria-label={`Select ${translateMessageId(list.text, intl)}`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={onKeyDownHandler}
        tabIndex={0}
      >
        <StyledIcon name="menu" />
        <Translation id={list.text} />
      </Button>
      <DropdownList
        animate={isOpen ? "open" : "closed"}
        variants={listVariants}
        initial="closed"
      >
        {list.items.map(({ text, to, matomo, callback }, idx) => (
          <DropdownItem key={idx} onClick={() => setIsOpen(false)}>
            {!!to && !!matomo && (
              <NavLink
                isPartiallyActive={false}
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                to={to}
              >
                <Translation id={text} />
              </NavLink>
            )}
            {!!to && !matomo && (
              <NavLink isPartiallyActive={false} to={to}>
                <Translation id={text} />
              </NavLink>
            )}
            {!!callback && (
              <NakedNavLink onClick={() => callback(idx)}>
                <Translation id={text} />
              </NakedNavLink>
            )}
          </DropdownItem>
        ))}
      </DropdownList>
    </Container>
  )
}

export default ButtonDropdown
