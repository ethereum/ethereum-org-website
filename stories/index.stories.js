import React from "react";
import { Button, Card, Flex, Heading } from "rebass";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Header from "../src/components/Header";
import Paragraph from "../src/components/Paragraph";

const ColorToken = ({ color, ...rest }) => (
  <Card {...rest} flex={1} style={{ maxWidth: 160 }}>
    <Card bg={color} style={{ height: 100 }} />
    <Card bg="white" py={2} px={2}>
      <Paragraph m={0} color="primary" textAlign="center">
        {color}
      </Paragraph>
    </Card>
  </Card>
);

storiesOf("Colors", module).add("default", () => (
  <>
    <Heading fontSize={3} mb={2}>
      Colors
    </Heading>
    <Flex>
      <ColorToken color="gossamer" />
      <ColorToken color="richblue" />
      <ColorToken color="tapestry" />
    </Flex>

    <Heading fontSize={3} mb={2} mt={2}>
      Backgrounds
    </Heading>
    <Flex>
      <ColorToken color="primary" />
      <ColorToken color="primarydark" />
    </Flex>

    <Heading fontSize={3} mb={2} mt={2}>
      Text
    </Heading>
    <Flex>
      <ColorToken color="text" />
      <ColorToken color="textdark" />
      <ColorToken color="textinactive" />
    </Flex>
  </>
));

storiesOf("Header", module)
  .add("default", () => <Header>I'm a `Header`</Header>)
  .add("colored", () => (
    <Header color="gossamer">I'm a colored `Header`</Header>
  ));

storiesOf("Paragraph", module)
  .add("default", () => <Paragraph>I'm a `Paragraph`</Paragraph>)
  .add("colored", () => (
    <Paragraph color="richblue">I'm a colored `Paragraph`</Paragraph>
  ));

// storiesOf("Button", module)
//   .add("with text", () => (
//     <Button onClick={action("clicked")}>Hello Button</Button>
//   ))
//   .add("with some emoji", () => (
//     <Button onClick={action("clicked")}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
