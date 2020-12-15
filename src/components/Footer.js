import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { StaticQuery, graphql } from "gatsby"

import { getLocaleTimestamp } from "../utils/time"
import Translation from "./Translation"
import Link from "./Link"
import Icon from "./Icon"
import { Mixins } from "../theme"

const StyledFooter = styled.footer`
  padding-top: 3rem;
  padding-bottom: 4rem;
  padding: 1rem 2rem;
`

const FooterTop = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const LastUpdated = styled.div`
  color: ${(props) => props.theme.colors.text200};
`

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 1rem;
  justify-content: space-between;
  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, auto);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(2, auto);
  }
  @media (max-width: 500px) {
    grid-template-columns: auto;
  }
`

const LinkSection = styled.div``

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
  text-decoration: none;
  color: ${(props) => props.theme.colors.text200};
  svg {
    fill: ${(props) => props.theme.colors.text200};
  }
  &:after {
    color: ${(props) => props.theme.colors.text200};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      color: ${(props) => props.theme.colors.primary};
    }
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const SocialIcons = styled.div`
  margin: 1rem 0;
`
const SocialIcon = styled(Icon)`
  margin-left: 1rem;
  width: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 0;
    margin-right: 0.5rem;
  }
`

const socialLinks = [
  {
    icon: "github",
    to: "https://github.com/ethereum/ethereum-org-website",
  },
  {
    icon: "twitter",
    to: "https://twitter.com/ethdotorg",
  },
  {
    icon: "youtube",
    to: "https://youtube.com/channel/UCNOfzGXD_C9YMYmnefmPH0g",
  },
  {
    icon: "discord",
    to: "https://discord.gg/CetY6Y4",
  },
]

const Footer = () => {
  const intl = useIntl()

  const linkSections = [
    {
      title: "page-index-section-individuals-item-two",
      links: [
        {
          to: `/wallets/`,
          text: "page-index-section-individuals-item-five",
        },
        {
          to: `/get-eth/`,
          text: "page-index-section-individuals-item-six",
        },
        {
          to: `/dapps/`,
          text: "page-dapps-title",
        },
        {
          to: `/stablecoins/`,
          text: "page-stablecoins-title",
        },
        {
          to: `/eth2/staking/`,
          text: "page-eth2-get-involved-stake-eth",
        },
      ],
    },
    {
      title: "page-index-section-learn-title",
      links: [
        {
          to: `/what-is-ethereum/`,
          text: "page-index-section-individuals-item-one",
        },
        {
          to: `/eth/`,
          text: "page-index-section-individuals-item-four",
        },
        {
          to: `/learn/`,
          text: "page-index-section-individuals-item-three",
        },
        {
          to: "/history/",
          text: "nav-ethereum-history",
        },
        {
          to: "/whitepaper/",
          text: "nav-ethereum-whitepaper",
        },
        {
          text: "page-eth2",
          to: "/eth2/",
        },
        {
          to: `/glossary/`,
          text: "nav-glossary",
        },
        {
          to: "/eips/",
          text: "nav-eips",
        },
      ],
    },
    {
      title: "nav-developers",
      links: [
        {
          to: `/developers/`,
          text: "nav-developers-home-title",
          isPartiallyActive: false,
        },
        {
          to: `/developers/docs/`,
          text: "nav-developers-docs-title",
        },
        {
          to: `/developers/tutorials/`,
          text: "nav-developers-tutorials",
        },
        {
          to: `/developers/learning-tools/`,
          text: "nav-developers-learning-tools",
        },
        {
          to: `/developers/local-environment/`,
          text: "nav-developers-local-env",
        },
        {
          to: `/developers/`,
          text: "developer-resources",
        },
      ],
    },
    {
      title: "nav-ecosystem",
      links: [
        {
          to: `/community/`,
          text: "nav-ethereum-community",
        },
        {
          to: "/foundation/",
          text: "ethereum-foundation",
        },
        {
          to: "https://blog.ethereum.org/",
          text: "nav-blog",
        },
        {
          to: "https://esp.ethereum.foundation",
          text: "nav-esp",
        },
        {
          to: "/assets/",
          text: "ethereum-brand-assets",
        },
        {
          to: "https://devcon.org/",
          text: "devcon",
        },
      ],
    },
    {
      title: "nav-enterprise",
      links: [
        {
          to: "/enterprise/",
          text: "nav-enterprise-public",
        },
        {
          to: "/enterprise/private-ethereum/",
          text: "nav-enterprise-private",
        },
        {
          to: "/enterprise/",
          text: "nav-enterprise",
        },
      ],
    },
    {
      title: "nav-about",
      links: [
        {
          to: "/about/",
          text: "nav-about-us",
        },
        {
          to: "/contributing/",
          text: "contributing",
        },
        {
          to: "/languages/",
          text: "language-support",
        },
        {
          to: "/en/privacy-policy/",
          text: "nav-privacy-policy",
        },
        {
          to: "/en/terms-of-use/",
          text: "nav-terms-of-use",
        },
        {
          to: "/en/cookie-policy/",
          text: "cookie-policy",
        },
        {
          to: "mailto:press@ethereum.org",
          text: "contact",
        },
      ],
    },
  ]

  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          allSiteBuildMetadata {
            edges {
              node {
                buildTime
              }
            }
          }
        }
      `}
      render={(data) => (
        <StyledFooter>
          <FooterTop>
            <LastUpdated>
              <Translation id="website-last-updated" />:{" "}
              {getLocaleTimestamp(
                intl.locale,
                data.allSiteBuildMetadata.edges[0].node.buildTime
              )}
            </LastUpdated>
            <SocialIcons>
              {socialLinks.map((link, idx) => {
                return (
                  <Link to={link.to} hideArrow={true} key={idx}>
                    <SocialIcon name={link.icon} size="36" />
                  </Link>
                )
              })}
            </SocialIcons>
          </FooterTop>
          <LinkGrid>
            {linkSections.map((section, idx) => {
              return (
                <LinkSection key={idx}>
                  <SectionHeader>
                    <Translation id={section.title} />
                  </SectionHeader>
                  <List>
                    {section.links.map((link, linkIdx) => {
                      return (
                        <ListItem key={linkIdx}>
                          <FooterLink
                            to={link.to}
                            isPartiallyActive={link.isPartiallyActive}
                          >
                            <Translation id={link.text} />
                          </FooterLink>
                        </ListItem>
                      )
                    })}
                  </List>
                </LinkSection>
              )
            })}
          </LinkGrid>
        </StyledFooter>
      )}
    />
  )
}

export default Footer
