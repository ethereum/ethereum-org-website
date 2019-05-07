import React from "react";
import { Heading, Text } from "rebass";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = () => (
  <Layout>
    <SEO title="Something went wrong" />

    <Heading as="h1">This page doesn’t exist</Heading>
    <Text as="p">
      You might have mistyped the address, or the page might have moved.
    </Text>
  </Layout>
);

export default NotFoundPage;
