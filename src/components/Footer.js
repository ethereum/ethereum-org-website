import React from "react"
import styled from "styled-components"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"

import { getLangVersion, getDefaultMessage } from "../utils/translations"
import Link from "./Link"
import { Mixins } from "./Theme"

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 3rem;
  padding-bottom: 4rem;
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 0 auto;
`

const FooterTop = styled.div`
  ${Mixins.textLevel8}
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const LinkSection = styled.div`
  min-width: 300px;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    min-width: initial;
  }
`

const SectionHeader = styled.h3`
  ${Mixins.textLevel8}
  font-weight: bold;
`

const List = styled.ul`
  ${Mixins.textLevel8}
  margin: 0;
  list-style-type: none;
  list-style-image: none;
`

const ListItem = styled.li`
  margin-bottom: 1rem;
`

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.text200};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Footer = () => {
  const intl = useIntl()

  const contentVersion = getLangVersion(intl.locale)

  const linkSections = [
    {
      title: "page-individuals",
      links: [
        {
          to: `/what-is-ethereum/`,
          text:
            contentVersion > 1
              ? "page-home-section-individuals-item-one"
              : "page-home-section-beginners-item-two",
          shouldDisplay: true,
        },
        {
          to: `/use/`,
          text: "page-use",
          shouldDisplay: contentVersion < 1.1,
        },
        {
          to: `/eth/`,
          text: "page-home-section-individuals-item-four",
          shouldDisplay: contentVersion >= 1.1,
        },
        {
          to: `/dapps/`,
          text: "page-home-section-individuals-item-two",
          shouldDisplay: contentVersion >= 1.1,
        },
        {
          to: `/wallets/`,
          text: "page-home-section-individuals-item-five",
          shouldDisplay: contentVersion >= 1.1,
        },
        {
          to: `/learn/`,
          text:
            contentVersion > 1
              ? "page-home-section-individuals-item-three"
              : "page-learn",
          shouldDisplay: true,
        },
        {
          to: `/community/`,
          text: "page-community",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      title: "page-developers",
      links: [
        {
          to: `/build/`,
          text: "get-started",
          shouldDisplay: contentVersion >= 1.1,
        },
        {
          to: "https://studio.ethereum.org/",
          text: "footer-ethereum-studio",
          shouldDisplay: true,
        },
        {
          to: `/developers/`,
          text: contentVersion > 1 ? "developer-resources" : "page-developers",
          shouldDisplay: true,
        },
        {
          to: "/whitepaper/",
          text: "footer-ethereum-whitepaper",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      title: "footer-ecosystem",
      links: [
        {
          to: "/foundation/",
          text: "ethereum-foundation",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          to: "https://blog.ethereum.org/",
          text: "footer-blog",
          shouldDisplay: true,
        },
        {
          to: "https://esp.ethereum.foundation",
          text: "footer-esp",
          shouldDisplay: true,
        },
        {
          to: "/eips/",
          text: "footer-eips",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          to: "/assets/",
          text: "ethereum-brand-assets",
          shouldDisplay: true,
        },
        {
          to: "https://devcon.org/",
          text: "devcon",
          shouldDisplay: true,
        },
      ],
    },
    {
      title: "footer-about",
      links: [
        {
          to: "/en/about/",
          text: "footer-about-us",
          shouldDisplay: true,
        },
        {
          to: "/en/languages/",
          text: "language-support",
          shouldDisplay: true,
        },
        {
          to: "/en/privacy-policy/",
          text: "privacy-policy",
          shouldDisplay: true,
        },
        {
          to: "/en/terms-of-use/",
          text: "terms-of-use",
          shouldDisplay: true,
        },
        {
          to: "/en/cookie-policy/",
          text: "cookie-policy",
          shouldDisplay: true,
        },
        {
          to: "mailto:press@ethereum.org",
          text: "contact",
          shouldDisplay: true,
        },
      ],
    },
  ]

  return (
    <StyledFooter>
      <FooterTop>
        {/* TODO need last updated. */}
        <div>Last updated: Today</div>
        {/* TODO add icons */}
        <div>Social icons</div>
      </FooterTop>
      {linkSections.map((section, idx) => {
        return (
          <LinkSection key={idx}>
            <SectionHeader>
              <FormattedMessage
                id={section.title}
                defaultMessage={getDefaultMessage(section.title)}
              />
            </SectionHeader>
            <List>
              {section.links
                .filter((link) => link.shouldDisplay)
                .map((link, linkIdx) => {
                  return (
                    <ListItem key={linkIdx}>
                      <FooterLink to={link.to}>
                        <FormattedMessage
                          id={link.text}
                          defaultMessage={getDefaultMessage(link.text)}
                        />
                      </FooterLink>
                    </ListItem>
                  )
                })}
            </List>
          </LinkSection>
        )
      })}
    </StyledFooter>
  )
}

export default Footer
