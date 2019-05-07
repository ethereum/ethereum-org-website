import React from "react";
import { Image } from "rebass";

import developers from "../../images/developers.svg";
import learn from "../../images/learn.svg";
import news from "../../images/news.svg";

import logo from "../../images/ethereum-logo.svg";
// import logo from "../../images/ethereum-logo-better.svg";

const Developers = props => <Image src={developers} {...props} />;

const Learn = props => <Image src={learn} {...props} />;

const News = props => <Image src={news} {...props} />;

const Logo = props => <Image src={logo} height={60} {...props} />;

export { Developers, Learn, News, Logo };
