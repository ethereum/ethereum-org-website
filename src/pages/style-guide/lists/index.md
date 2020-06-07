---
title: Style Guide Documentation — Lists
lang: en
sampleListOne:
  - title: Getting up to speed on Ethereum
    subtitle: Matt Condon
    meta: Aug 7, 2017
    link: https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe
  - title: Ethereum In Depth, Part 1
    subtitle: Facu Spagnuolo
    meta: May 11, 2018
    link: https://blog.openzeppelin.com/ethereum-in-depth-part-1-968981e6f833/
  - title: Ethereum In Depth, Part 2
    subtitle: Facu Spagnuolo
    meta: July 24, 2018
    link: https://blog.openzeppelin.com/ethereum-in-depth-part-2-6339cf6bddb9/
sampleListTwo:
  - title: EEA
    subtitle: The Enterprise Ethereum Alliance is a member-driven standards organization whose charter is to develop open, blockchain specifications that drive harmonization and interoperability for businesses and consumers worldwide. Our global community of members is made up of leaders, adopters, innovators, developers, and businesses who collaborate to create an open, decentralized web for the benefit of everyone.
    link: https://entethalliance.org/
  - title: Hyperledger
    subtitle: Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology. The foundation has some projects in it that work with the Ethereum stack.
    link: https://hyperledger.org/
sampleListThree:
  - title: EEA
    link: https://entethalliance.org/
  - title: Hyperledger
    link: https://hyperledger.org/
sampleListFour:
  - title: EEA
    meta: John Owens
    link: https://entethalliance.org/
  - title: Hyperledger
    meta: John Owens
    link: https://hyperledger.org/
---

# Component Usage

## Standard Lists

Standard lists can be called anywhere in markdown by using

```
- Lorem ipsum
- Si dolor et amet
- nunc habitasse portitor demi
```

Ensure that the list is always preceeded with one of the following, taking care to ensure that your markup is semantic:

```
Your heading text {.list-title}
# Your heading text {.list-title}
## Your heading text {.list-title}
### Your heading text {.list-title}
#### Your heading text {.list-title}
##### Your heading text {.list-title}
###### Your heading text  {.list-title}
```

{.mb-4}

--- {.mb-4}

### Examples{.mt-8}

#### Unordered List {.list-title .mt-4}

- Lorem ipsum si dolor et amet
- Nunc habitasse et portitor demi

Markdown:

```
#### List Example One {.list-title}
- Lorem ipsum si dolor et amet
- Nunc habitasse et portitor demi
```

#### Links with descriptions {.list-title .mt-8}

- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
  {.link-list}

Markdown:

```
#### Links with descriptions {.list-title}

- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
{.link-list}
```

#### Links with descriptions without bullets {.list-title .mt-8}

- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
  {.no-bullets .link-list}

Markdown:

```
#### Links with descriptions {.list-title}

- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
- [Nunc habitasse et portitor demi](#) An example link followed by text
{.no-bullets .link-list}
```

#### Ordered List {.list-title .mt-8}

1. Lorem ipsum si dolor et amet
2. Nunc habitasse et portitor demi

Markdown:

```
#### Ordered List Example {.list-title}
1. Lorem ipsum si dolor et amet
2. Nunc habitasse et portitor demi
```

## Rich Lists

There are multiple versions of lists to be generated. To use them, create a frontmatter array of objects, with the following properties:

- `title: required` The title text
- `subtitle: optional` If used, this will render a second line below the title.
- `meta: optional` If used, this will render a new column to the right (desktop). Use for things such as dates.
- `link: required` This will be the `href`.

<br><br><br>

### Examples

#### List Example One {.list-title .mt-4}

<list-card :items="$page.frontmatter.sampleListOne" level="5"/>

##### Frontmatter:

```
sampleListOne:
  - title: Getting up to speed on Ethereum
    subtitle: Matt Condon
    meta: Aug 7, 2017
    link: https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe
  - title: Ethereum In Depth, Part 1
    subtitle: Facu Spagnuolo
    meta: May 11, 2018
    link: https://blog.openzeppelin.com/ethereum-in-depth-part-1-968981e6f833/
  - title: Ethereum In Depth, Part 2
    subtitle: Facu Spagnuolo
    meta: July 24, 2018
    link: https://blog.openzeppelin.com/ethereum-in-depth-part-2-6339cf6bddb9/
```

##### Markdown:

`level="5"` is used to show here that a `<h5>` should be rendered for each child title. Aim to output semantic markup.

```
### List Example One {.list-title}
<list-card :items="$page.frontmatter.sampleListOne" level="4"/>
```

#### List Example Two {.list-title .mt-8}

<list-card :items="$page.frontmatter.sampleListTwo" level="5"/>

##### Frontmatter:

```
sampleListTwo:
  - title: EEA
    subtitle: The Enterprise Ethereum Alliance is a member-driven standards organization whose charter is to develop open, blockchain specifications that drive harmonization and interoperability for businesses and consumers worldwide. Our global community of members is made up of leaders, adopters, innovators, developers, and businesses who collaborate to create an open, decentralized web for the benefit of everyone.
    link: https://entethalliance.org/
  - title: Hyperledger
    subtitle: Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology. The foundation has some projects in it that work with the Ethereum stack.
    link: https://hyperledger.org/
```

##### Markdown:

```
### List Example Two {.list-title}
<list-card :items="$page.frontmatter.sampleListTwo" level="5"/>
```

#### List Example Three {.list-title .mt-8}

<list-card :items="$page.frontmatter.sampleListThree" level="5"/>

##### Frontmatter:

```
sampleListThree:
  - title: EEA
    link: https://entethalliance.org/
  - title: Hyperledger
    link: https://hyperledger.org/
```

##### Markdown:

```
### List Example Three {.list-title}
<list-card :items="$page.frontmatter.sampleListThree" level="5"/>
```

#### List Example Four {.list-title .mt-8}

<list-card :items="$page.frontmatter.sampleListFour" level="5"/>

##### Frontmatter:

```
sampleListThree:
  - title: EEA
    meta: John Owens
    link: https://entethalliance.org/
  - title: Hyperledger
    meta: John Owens
    link: https://hyperledger.org/
```

##### Markdown:

```
### List Example Three {.list-title}
<list-card :items="$page.frontmatter.sampleListThree" level="5"/>
```
