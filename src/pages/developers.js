import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Box, Image, Flex } from "rebass";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Card, { GradientBar } from "../components/Card";
import Paragraph from "../components/Paragraph";
import Caps from "../components/Caps";
import Header from "../components/Header";
import Container from "../components/Container";
import { Row, Col } from "../components/Grid";
import { Developers } from "../components/Images";
import Stunt from "../components/Stunt";
import { ExternalLink } from "../components/Links";
import theme from "../components/Theme/theme";

import smartContractBadge from "../images/smart-contract.svg";
import solidityBadge from "../images/solidity.svg";

import bank from "../images/developers-bank.svg";
import scale from "../images/developers-scale.svg";
import virtual from "../images/developers-virtual.svg";

const CallToActionCard = ({ image, children, ...rest }) => (
  <Card {...rest} shadow bg="primary">
    <Box
      py={56}
      pl={[80, null, 120]}
      css={{ position: "relative", overflow: "hidden" }}
    >
      <GradientBar
        gradient="richblue"
        gradientHeight="thin"
        css={css`
          opacity: 0;
          transition: opacity 250ms;

          ${Card}:hover & {
            opacity: 1;
          }
        `}
      />
      <Image
        src={image}
        css={css`
          position: absolute;
          left: -64px;
          top: 50%;
          transform: translateY(-50%);

          @media screen and (min-width: 52em) {
            left: -32px;
          }
        `}
      />
      {children}
    </Box>
  </Card>
);

const HoverHeader = styled(Header)`
  transition: color 250ms;

  ${Card}:hover & {
    color: ${theme.colors.richblue};
  }
`;

const DeveloperTab = ({ active, children, ...rest }) => (
  <Flex css={{ cursor: "pointer" }} {...rest}>
    <Box
      width={6}
      bg={active ? "richblue" : "transparent"}
      css={{ transition: "background-color 250ms" }}
    />
    <Box ml={24} flex={1} color={active ? "text" : "textopaque"}>
      {children}
    </Box>
  </Flex>
);

const DeveloperImage = ({ active, ...rest }) => (
  <Image
    css={{
      opacity: active ? 1 : 0,
      verticalAlign: "middle",
      transition: "opacity 250ms 125ms ease-in-out",
      position: "absolute",
      transform: "scale(1.25)",
      zIndex: 2000
    }}
    {...rest}
  />
);

const DeveloperIdeas = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Row
        css={css`
          display: none;

          @media screen and (min-width: 52em) {
            display: flex;
          }
        `}
      >
        <Col>
          <DeveloperTab
            mb={4}
            onClick={() => setActiveTab(0)}
            active={activeTab === 0 && true}
          >
            <Header color="inherit">Scalability</Header>
            <Paragraph color="inherit" mb={0}>
              Join one of the teams working on scaling Ethereum to millions of
              transactions a second.
            </Paragraph>
          </DeveloperTab>

          <DeveloperTab
            mb={4}
            onClick={() => setActiveTab(1)}
            active={activeTab === 1 && true}
          >
            <Header color="inherit">Be your own bank</Header>
            <Paragraph color="inherit" mb={0}>
              Use Ethereum’s shared global infrastructure to create unstoppable
              finanical tools.
            </Paragraph>
          </DeveloperTab>

          <DeveloperTab
            onClick={() => setActiveTab(2)}
            active={activeTab === 2 && true}
          >
            <Header color="inherit">Virtual Organizations</Header>
            <Paragraph color="inherit" mb={0}>
              Create a democratic autonomous organization with governance
              structures.
            </Paragraph>
          </DeveloperTab>
        </Col>

        <Col>
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Box
              mt={[4, 0]}
              bg="primary"
              width={320}
              css={{ position: "relative", height: 320 }}
            >
              <DeveloperImage src={scale} active={activeTab === 0 && true} />

              <DeveloperImage src={bank} active={activeTab === 1 && true} />

              <DeveloperImage src={virtual} active={activeTab === 2 && true} />
            </Box>
          </Flex>
        </Col>
      </Row>
      <Box
        css={css`
          display: initial;

          @media screen and (min-width: 52em) {
            display: none;
          }
        `}
      >
        <Header>Scalability</Header>
        <Paragraph mb={4}>
          Join one of the teams working on scaling Ethereum to millions of
          transactions a second.
        </Paragraph>
        <Header>Be your own bank</Header>
        <Paragraph mb={4}>
          Use Ethereum’s shared global infrastructure to create unstoppable
          finanical tools.
        </Paragraph>
        <Header>Virtual Organizations</Header>
        <Paragraph mb={0}>
          Create a democratic autonomous organization with governance
          structures.
        </Paragraph>
      </Box>
    </>
  );
};

const IndexPage = () => (
  <Layout>
    <SEO title="Developers" />

    <GradientBar gradient="richblue" sticky />

    <Box as="section" my={[5, 6]}>
      <Container>
        <Box>
          <Developers />
          <Caps mt={4} mb={2}>
            Problems to solve
          </Caps>
          <Header fontSize="xxlarge">What could you build?</Header>
        </Box>
      </Container>
    </Box>

    <Box my={[5, 6]}>
      <Container>
        <Paragraph mt={0} mb={5}>
          Ideas proposed in the Ethereum community:
        </Paragraph>

        <DeveloperIdeas />
      </Container>
    </Box>

    <Box my={[5, 6]}>
      <Container>
        <Row flexDirection={["column", null, "row"]}>
          <Col mb={[4, null, 0]} width={[1, null, 1 / 2]}>
            <ExternalLink flex={1} href="http://www.ethdocs.org/en/latest/">
              <CallToActionCard image={smartContractBadge}>
                <HoverHeader>Start Building</HoverHeader>
                <Header as="p" fontWeight="medium">
                  Ethereum Docs
                </Header>
              </CallToActionCard>
            </ExternalLink>
          </Col>
          <Col width={[1, null, 1 / 2]}>
            <ExternalLink flex={1} href="https://solidity.readthedocs.io/en/v0.5.7/">
              <CallToActionCard image={solidityBadge}>
                <HoverHeader>Learn Solidity</HoverHeader>
                <Header as="p" fontWeight="medium">
                  Solidity Docs
                </Header>
              </CallToActionCard>
            </ExternalLink>
          </Col>
        </Row>
      </Container>
    </Box>

    <Stunt />
  </Layout>
);
export default IndexPage;
