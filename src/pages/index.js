import React from "react";
import { Flex } from "rebass";
import { css } from "styled-components";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Card, { GradientBar } from "../components/Card";
import Paragraph from "../components/Paragraph";
import Header from "../components/Header";
import Container from "../components/Container";
import { Row, Col } from "../components/Grid";
import { Developers, Logo, Learn, News } from "../components/Images";
import { InternalLink } from "../components/Links";
import theme from "../components/Theme/theme";

const IndexPageCard = ({hoverColor, ...rest}) => (
  <Card
    {...rest}
    flex={1}
    bg="primary"
    pt={40 + 6}
    pb={4}
    px={4}
    shadow
    color="text"
    css={css`
      height: 100%;

      &:hover {
        color: ${theme.colors[hoverColor]};
      }

      /* Allow nested Header component to animate  */
      > * {
        transition-property: color;
        transition-duration: 250ms;
      }
    `}
  />
);

const IndexPage = () => (
  <Layout>
    <SEO />

    <Flex css={{ minHeight: "100vh" }} alignItems="center">
      <Container>
        <Logo mt={[4, 0]} />

        <Paragraph mt={[3, 4]} mb={[4, 5]}>
          The world's largest community solving global challenges and
          democratizing the internet.
        </Paragraph>

        <Row flexDirection={["column", null, "row"]}>
          <Col width={[1, null, 1 / 3]} mb={[4, null, 0]}>
            <InternalLink flex={1} to="/developers/">
              <IndexPageCard hoverColor="richblue">
                <GradientBar gradient="richblue" />
                <Developers mb={80} />
                <Header as="h2" color="inherit">
                  Build Unstoppable Organizations
                </Header>
                <Header as="p" fontWeight="medium" mt={2}>
                  Developer Tools
                </Header>
              </IndexPageCard>
            </InternalLink>
          </Col>

          <Col width={[1, null, 1 / 3]} mb={[4, null, 0]}>
            <InternalLink flex={1} to="/learn/">
              <IndexPageCard hoverColor="gossamer">
                <GradientBar gradient="gossamer" />
                <Learn mb={80} />
                <Header as="h2" color="inherit">
                  Why <br />
                  Ethereum?
                </Header>
                <Header as="p" fontWeight="medium" mt={2}>
                  Learn
                </Header>
              </IndexPageCard>
            </InternalLink>
          </Col>

          <Col width={[1, null, 1 / 3]} mb={[4, null, 0]}>
            <InternalLink flex={1} to="/news/">
              <IndexPageCard hoverColor="tapestry">
                <GradientBar gradient="tapestry" />
                <News mb={80} />
                <Header as="h2" color="inherit">
                  News and Community
                </Header>
                <Header as="p" fontWeight="medium" mt={2}>
                  Newsroom
                </Header>
              </IndexPageCard>
            </InternalLink>
          </Col>
        </Row>
      </Container>
    </Flex>
  </Layout>
);

export default IndexPage;
