import React from "react";
import { configure, addDecorator } from "@storybook/react";

import Theme from "../src/components/Theme";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(storyFn => <Theme>{storyFn()}</Theme>);

configure(loadStories, module);
