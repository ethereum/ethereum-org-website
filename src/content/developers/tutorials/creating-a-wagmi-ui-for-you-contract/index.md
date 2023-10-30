---
title: "Building a user interface for your contract"
description: Using modern components such as TypeScript, React, Vite, and Wagmi, we will go over a modern, but minimal, user interface and learn how to connect a wallet to the user interface, call a smart contract to read information, send a transaction to a smart contract, and monitor events from a smart contract to identify changes.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-11-01
lang: en
---

You found a feature we need in the Ethereum ecosystem. You wrote the smart contracts to implement it, and maybe even some related code that runs offchain. This is great! Unfortunately, without a user interface you aren't going to have any users, and the last time you wrote a web site people used dial-up modems and JavaScript was new.

This article is for you. I assume you know programming, and maybe a bit of JavaScript and HTML, but that your user interface skills are rusty and out of date. Together we will go over a simple modern application so you'll see how it's done these days.

## Why is this important {#why-important}

In theory, you could just have people use [Etherscan](https://goerli-optimism.etherscan.io/address/0x51dac29fe2da340f03ec4e4c9e3724c153314d1f#readContract) to interact with your contracts. That will be great for the experienced Ethereans. But we are trying to serve [another billion people](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). This won't happen without a great user experience, and a friendly user interface is a big part of that. 


# Greeter application {#greeter-app}

There is a lot of theory behind for a modern UI works, and [a lot of good sites](https://react.dev/learn/thinking-in-react) [that explain it](https://wagmi.sh/core/getting-started). Instead of repeating the fine work done by those sites, I'm going to assume you prefer to learn by doing and start with an application you can play with. You still need the theory to get things done, and we'll get to it - we'll just go source file by source file, and discuss things as we get to them.


## Installation

1. If necessary, add [the Holesky blockchain](https://chainlist.org/?search=holesky&testnets=true) to your wallet and [get test ETH](https://www.holeskyfaucet.io/).

1. Clone the github repository.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

1. Install the necessary packages.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

1. Start the application.

   ```sh
   pnpm dev
   ```

1. Browse to the URL shown by the application. In most cases, that is [http://localhost:5173/](http://localhost:5173/).




## The files

### `index.html`

This file is standard HTML boilerplate except for this line, which imports the script file.

```html
<script type="module" src="/src/main.tsx"></script>
```

### `src/main.tsx`

The file extension tells us that this file is a [React component]() written in [TypeScript](), an extension of JavaScript that supports checking for [data type consistency](). TypeScript is compiled into JavaScript, so we can use it for client-side execution.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Import the library code we need.

```tsx
import { App } from './App'
```

Import the React component that implements the application (see below).


```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Create the root React component. The parameter to `render` is [JSX](), an extension language that uses both HTML and JavaScript/TypeScript. () explain the exclamation point here.

```tsx
  <React.StrictMode>
```

The application is going inside [a `React.StrictMode` component](). This component controls the React library to ()

```tsx
    <WagmiConfig config={config}>
```

The application is also inside [a `WagmiConfig` component](). [The `wagmi` (we are going to make it) library]() connects the React UI definitions with [the `viem` library]() for writing an Ethereum decentralized application.

```tsx
      <RainbowKitProvider chains={chains}>
```

And finally, [a `RainbowKitProvider` component](). This component handles logging on and the communication between the wallet and the application.

```tsx
        <App />
```

Now we can have the component for the application, which actually implements the UI. The `/>` at the end of the component tells React that this component doesn't have any definitions inside it.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Of course, we have to close off the other components.

### `src/App.tsx`


```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

This is the standard way to create a React component - define a function that is called every time it needs to be rendered. This function typically has some TypeScript or JavaScript code on top, followed by a `return` statement that returns the JSX code.

```tsx
  const { isConnected } = useAccount()
```

Here we use [`useAccount`]() to check if we are connected to a blockchain through a wallet or not.

```tsx
  return (
    <>
```

The JSX of a React component *has* to return one component. When we have multiple components and we don't have anything that wraps up "naturally" we use an empty component (`<> ... </>`) to make them into a single component.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

We get [the `ConnectButton` component]() from rainbowkit. When we are not connected, it gives us a `Connect Wallet` button that opens a modal that explains wallets and lets you choose which one you use. When we are connected, it displays the blockchain we use, our account address, and our ETH balance. We can use these displays to switch network or to disconnect.

```tsx
      {isConnected && (
```

When 

```tsx
        <>
          <Greeter />
        </>
      )}
    </>
  )
}
```