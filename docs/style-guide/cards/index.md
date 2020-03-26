---
title: Style Guide Documentation — Cards
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
      to: https://studio.ethereum.org/1
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
        to: https://studio.ethereum.org/1
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
      to: https://studio.ethereum.org/1
---

# Component Usage

### Cards

Individual cards accept the following:

- `level: number, optional, default: 3` the h tag to use. level: 3 = h3
- `header: image url or emoji, optional, default: ''`
- `hero: boolean, optional, default: false` if a header image, then it will be displayed as a hero
- `title: string, required` the card title
- `content: string, required` the card text
- `link: object or array (max 2), optional, default: ''` the link
  - If one item:
    - `text: string, optional, default: ''` The text to display on the link
    - `to: string, required` The url
    - `button: boolean, optional, default: false` Show a button instead of a link
  - if two items
    - `text: string, required`
    - Will show buttons

### Card Lists

- `level: number, optional, default: 3` the h tag to use. level: 3 = h3
- `items: array, required` an array of card objects
- `desktopColumns: optional, default: 3` the number of desktop columns
- `tabletColumns: optional, default: 2` the number of desktop columns
- `smallTabletColumns: optional, default: 2` the number of desktop columns

## Card Lists

<div class="page">

### 1 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="1" />

### 2 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="2" />

### 3 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="3" />

### 4 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="4" />

### 5 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="5" />

### 6 Column {.mt-4}

<CardList :items="$page.frontmatter.base" desktopColumns="6" />

## Card Variants

### Basic Cards {.mt-4}

<CardList :items="$page.frontmatter.base" />

```
<CardList :items="$page.frontmatter.base" />
```

```yaml
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
```

### Cards With Link Text {.mt-4}

<CardList :items="$page.frontmatter.link" />

```
<CardList :items="$page.frontmatter.link" />
```

```yaml
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
      to: https://studio.ethereum.org/1
```

### Cards With One Button {.mt-4}

<CardList :items="$page.frontmatter.button" />

```
<CardList :items="$page.frontmatter.button" />
```

```yaml
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
```

### Cards With Two Buttons {.mt-4}

<CardList :items="$page.frontmatter.twobutton" />

```
<CardList :items="$page.frontmatter.twobutton" />
```

```yaml
twobutton:
  - title: Hello World
    content: A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.
    link:
      - button: true
        text: Run hello world
        to: https://studio.ethereum.org/1
      - button: true
        text: Other
        to: https://studio.ethereum.org/1
```

### Cards with emoji header {.mt-4}

<CardList :items="$page.frontmatter.emoji" />

```
<CardList :items="$page.frontmatter.emoji" />
```

```yaml
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
```

### Cards with small image header {.mt-4}

<CardList :items="$page.frontmatter.img" />

```
<CardList :items="$page.frontmatter.img" />
```

```yaml
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
```

### Cards with small image on the left {.mt-4}

<CardList :items="$page.frontmatter.leftimg" />

```
<CardList :items="$page.frontmatter.leftimg" />
```

```yaml
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
```

### Cards with hero header {.mt-4}

<CardList :items="$page.frontmatter.hero" />

```
<CardList :items="$page.frontmatter.hero" />
```

```yaml
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
```

</div>
