import React, { useState } from "react";
import { Flex, Text, Box, Image } from "rebass";
import styled from "styled-components";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Card, { GradientBar } from "../components/Card";
import Paragraph from "../components/Paragraph";
import Caps from "../components/Caps";
import Header from "../components/Header";
import Container from "../components/Container";
import { Row, Col } from "../components/Grid";
import { Learn } from "../components/Images";
import Stunt from "../components/Stunt";
import { ExternalLink } from "../components/Links";
import theme from "../components/Theme/theme";
import { useSiteMetadata } from "../hooks";

const ResourceCard = styled(Card).attrs({
  p: 3,
  as: "article",
  shadow: true,
  color: "text",
  bg: "primarydark"
})`
  height: 100%;

  transition-property: background-color;
  transition-duration: 250ms;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.gossamerlight};
  }

  /* Allow nested Header component to animate  */
  > * {
    transition-property: color;
    transition-duration: 250ms;
  }

  img {
    vertical-align: middle;
  }
`;

const Sidebar = styled(Box).attrs({
  mr: [0, 4],
  mb: 4
})`
  @media screen and (min-width: 64em) {
    position: sticky;
    position: --webkit-sticky;
    top: calc(16px + 6px);
    height: 100%;
  }
`;

const LearnArticles = ({ category }) => {
  const { learn } = useSiteMetadata();

  return (
    <Row flexWrap="wrap">
      {learn[category].map((article, index) => (
        <Col key={index} mb={4}>
          <ExternalLink href={article.link} css={{ height: "100%" }}>
            <ResourceCard>
              <Box
                mx={-3}
                mt={-3}
                flex={1}
                css={{
                  height: 200,
                  backgroundImage: "linear-gradient(to left, #1D566D, #44EBA5)"
                }}
              >
                {article.image !== "" && (
                  <Image
                    css={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      objectPosition: "center"
                    }}
                    src={article.image}
                  />
                )}
              </Box>
              <Header lineHeight="title" color="inherit" mt={3}>
                {article.title}
              </Header>
              <Paragraph mt={3} mb={0}>
                {article.subtitle}
              </Paragraph>
            </ResourceCard>
          </ExternalLink>
        </Col>
      ))}
    </Row>
  );
};

const LearnTopic = ({ active, children, ...rest }) => (
  <Flex {...rest} mb={2} css={{ cursor: "pointer" }}>
    {active && <Box width={4} mr={3} bg="gossamerlight" />}
    <Paragraph
      fontWeight={active && "bold"}
      color={active ? "gossamerlight" : "text"}
      my={1}
    >
      {children}
    </Paragraph>
  </Flex>
);

const LearnTabs = () => {
  const [activeTab, setActiveTab] = useState("Current_Applications");

  return (
    <Flex flexDirection={["column", null, null, "row"]}>
      {/* Sidebar */}
      <Sidebar flex={1/4}>
        <Paragraph mt={0} mb={3} lineHeight="double">
          <Text fontWeight="bold" as="span">
            The how and the why
          </Text>
          <Text as="br" />
          Community resources:
        </Paragraph>

        <LearnTopic
          onClick={() => setActiveTab("Current_Applications")}
          active={activeTab === "Current_Applications" && true}
        >
          Current Applications
        </LearnTopic>

        <LearnTopic
          onClick={() => setActiveTab("Value_Exchange")}
          active={activeTab === "Value_Exchange" && true}
        >
          Value Exchange
        </LearnTopic>

        <LearnTopic
          onClick={() => setActiveTab("Censorship")}
          active={activeTab === "Censorship" && true}
        >
          Censorship
        </LearnTopic>
      </Sidebar>

      {/* Content */}
      <Box flex={3/4}>
        <LearnArticles category={activeTab} />
      </Box>
    </Flex>
  );
};

const IndexPage = () => (
  <Layout>
    <SEO title="Learn" />

    <GradientBar gradient="gossamer" sticky />

    <Box as="section" my={[5, 6]}>
      <Container>
        <Box>
          <Learn />
          <Caps mt={4} mb={2}>
            learn
          </Caps>
          <Header fontSize="xxlarge">Why Ethereum?</Header>
        </Box>
      </Container>
    </Box>

    <Box my={[5, 6]}>
      <Container>
        <LearnTabs />
      </Container>
    </Box>

    <Stunt />
  </Layout>
);

export default IndexPage;
