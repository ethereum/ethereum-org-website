---
title: Start Building
meta:
  - name: description
    content: Learn the basics of Ethereum with Ethereum Studio, our web-based IDE for building and testing smart contracts.
  - property: og:title
    content: Start Building | Ethereum.org
  - property: og:description
    content: Learn the basics of Ethereum with Ethereum Studio, our web-based IDE for building and testing smart contracts.
sidebar: false
layout: home
hideHero: true
lang: en-US
base:
  - title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      to: https://studio.ethereum.org/1
  - title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      to: https://studio.ethereum.org/2
  - title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      to: 'https://studio.ethereum.org/1'
link:
  - title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      text: Run hello world
      to: https://studio.ethereum.org/1
  - title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      text: Mint your token
      to: https://studio.ethereum.org/2
  - title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      text: See crypto-pizza
      to: 'https://studio.ethereum.org/1'
img:
  - header: https://source.unsplash.com/featured?waving
    title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      text: Run hello world
      to: https://studio.ethereum.org/1
  - header: https://source.unsplash.com/featured?coins
    title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      text: Mint your token
      to: https://studio.ethereum.org/2
  - header: https://source.unsplash.com/featured?pizza
    title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      text: See crypto-pizza
      to: 'https://studio.ethereum.org/1'
leftimg:
  - header: https://source.unsplash.com/featured?waving
    leftimg: true
    title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      text: Run hello world
      to: https://studio.ethereum.org/1
  - header: https://source.unsplash.com/featured?coins
    leftimg: true
    title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      text: Mint your token
      to: https://studio.ethereum.org/2
  - header: https://source.unsplash.com/featured?pizza
    leftimg: true
    title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      text: See crypto-pizza
      to: 'https://studio.ethereum.org/1'
button:
  - title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      button: true
      text: Run hello world
      to: https://studio.ethereum.org/1
  - title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      button: true
      text: Mint your token
      to: https://studio.ethereum.org/2
  - title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      button: true
      text: See crypto-pizza
      to: https://studio.ethereum.org/1
twobutton:
  - title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      - button: true
        text: Run hello world
        to: https://studio.ethereum.org/1
      - button: true
        text: Other
        to: 'https://studio.ethereum.org/1'
  - title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      - button: true
        text: Mint your token
        to: https://studio.ethereum.org/2
      - button: true
        text: Other
        to: 'https://studio.ethereum.org/1'
  - title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      - button: true
        text: See crypto-pizza
        to: 'https://studio.ethereum.org/1'
      - button: true
        text: Other
        to: 'https://studio.ethereum.org/1'
emoji:
  - header: 👋
    title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      text: Run hello world
      to: https://studio.ethereum.org/1
  - header: 🗝
    title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      text: Mint your token
      to: https://studio.ethereum.org/2
  - header: 🍕
    title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      text: See crypto-pizza
      to: 'https://studio.ethereum.org/1'
hero:
  - header: https://source.unsplash.com/featured?waving
    hero: true
    title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      text: Run hello world
      to: https://studio.ethereum.org/1
  - header: https://source.unsplash.com/featured?coins
    hero: true
    title: Coin contract
    content: A starter dapp template that defines a basic fungible token you can create and send to others.
    link:
      text: Mint your token
      to: https://studio.ethereum.org/2
  - header: https://source.unsplash.com/featured?pizza
    hero: true
    title: Crypto Pizza
    content: A collectibles game built on top of the ERC-721 standard for creating unique tokens.
    link:
      text: See crypto-pizza
      to: 'https://studio.ethereum.org/1'
---

<div class="page">

### Cards {.mt-4}

<CardList :items="$page.frontmatter.base" />

### Cards With Link Text {.mt-4}

<CardList :items="$page.frontmatter.link" />

### Cards With One Button {.mt-4}

<CardList :items="$page.frontmatter.button" />

### Cards With Two Buttons {.mt-4}

<CardList :items="$page.frontmatter.twobutton" />

### Cards with emoji header {.mt-4}

<CardList :items="$page.frontmatter.emoji" />

<!-- ### Cards with image header {.mt-4}
<CardList :items="$page.frontmatter.emoji" /> -->

### Cards with small image header {.mt-4}

<CardList :items="$page.frontmatter.img" />

### Cards with small image on the left {.mt-4}

<CardList :items="$page.frontmatter.leftimg" />

### Cards with hero header {.mt-4}

<CardList :items="$page.frontmatter.hero" />
</div>

<BuildPage />
