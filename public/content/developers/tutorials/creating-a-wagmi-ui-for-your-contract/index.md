---
title: "Building a user interface for your contract"
description: Using modern components such as TypeScript, React, Vite, and Wagmi, we will go over a modern, but minimal, user interface and learn how to connect a wallet to the user interface, call a smart contract to read information, send a transaction to a smart contract, and monitor events from a smart contract to identify changes.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-11-01
lang: en
sidebarDepth: 3
---

You found a feature we need in the Ethereum ecosystem. You wrote the smart contracts to implement it, and maybe even some related code that runs offchain. This is great! Unfortunately, without a user interface you aren't going to have any users, and the last time you wrote a web site people used dial-up modems and JavaScript was new.

This article is for you. I assume you know programming, and maybe a bit of JavaScript and HTML, but that your user interface skills are rusty and out of date. Together we will go over a simple modern application so you'll see how it's done these days.

## Why is this important {#why-important}

In theory, you could just have people use [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) or [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) to interact with your contracts. That will be great for the experienced Ethereans. But we are trying to serve [another billion people](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). This won't happen without a great user experience, and a friendly user interface is a big part of that.

## Greeter application {#greeter-app}

There is a lot of theory behind for a modern UI works, and [a lot of good sites](https://react.dev/learn/thinking-in-react) [that explain it](https://wagmi.sh/core/getting-started). Instead of repeating the fine work done by those sites, I'm going to assume you prefer to learn by doing and start with an application you can play with. You still need the theory to get things done, and we'll get to it - we'll just go source file by source file, and discuss things as we get to them.

### Installation {#installation}

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

1. You can see the contract source code, a slightly modified version of Hardhat's Greeter, [on a blockchain explorer](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### File walk through {#file-walk-through}

#### `index.html` {#index-html}

This file is standard HTML boilerplate except for this line, which imports the script file.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

The file extension tells us that this file is a [React component](https://www.w3schools.com/react/react_components.asp) written in [TypeScript](https://www.typescriptlang.org/), an extension of JavaScript that supports [type checking](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript is compiled into JavaScript, so we can use it for client-side execution.

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

Create the root React component. The parameter to `render` is [JSX](https://www.w3schools.com/react/react_jsx.asp), an extension language that uses both HTML and JavaScript/TypeScript. The exclamation point here tells the TypeScript component: "you don't know that `document.getElementById('root')` will be a valid parameter to `ReactDOM.createRoot`, but don't worry - I'm the developer and I'm telling you there will be".

```tsx
  <React.StrictMode>
```

The application is going inside [a `React.StrictMode` component](https://react.dev/reference/react/StrictMode). This component tells the React library to insert additional debugging checks, which is useful during development.

```tsx
    <WagmiConfig config={config}>
```

The application is also inside [a `WagmiConfig` component](https://wagmi.sh/react/WagmiConfig). [The wagmi (we are going to make it) library](https://wagmi.sh/) connects the React UI definitions with [the viem library](https://viem.sh/) for writing an Ethereum decentralized application.

```tsx
      <RainbowKitProvider chains={chains}>
```

And finally, [a `RainbowKitProvider` component](https://www.rainbowkit.com/). This component handles logging on and the communication between the wallet and the application.

```tsx
        <App />
```

Now we can have the component for the application, which actually implements the UI. The `/>` at the end of the component tells React that this component doesn't have any definitions inside it, as per the XML standard.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Of course, we have to close off the other components.

#### `src/App.tsx` {#app-tsx}

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

Here we use [`useAccount`](https://wagmi.sh/react/hooks/useAccount) to check if we are connected to a blockchain through a wallet or not.

By convention, in React functions called `use...` are [hooks](https://www.w3schools.com/react/react_hooks.asp) that return some kind of data. When you use such hooks, not only does your component get the data, but when that data changes the component is re-rendered with the updated information.

```tsx
  return (
    <>
```

The JSX of a React component _has_ to return one component. When we have multiple components and we don't have anything that wraps up "naturally" we use an empty component (`<> ... </>`) to make them into a single component.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

We get [the `ConnectButton` component](https://www.rainbowkit.com/docs/connect-button) from RainbowKit. When we are not connected, it gives us a `Connect Wallet` button that opens a modal that explains wallets and lets you choose which one you use. When we are connected, it displays the blockchain we use, our account address, and our ETH balance. We can use these displays to switch network or to disconnect.

```tsx
      {isConnected && (
```

When we need to insert actual JavaScript (or TypeScript that will be compiled to JavaScript) into a JSX, we use brackets (`{}`).

The syntax `a && b` is short for [`a ? b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). That is, if `a` is true it evaluates to `b` and otherwise it evaluates to `a` (which can be `false`, `0`, etc). This is an easy way to tell React that a component should only be displayed if a certain condition is fulfilled.

In this case, we only want to show the user `Greeter` if the user is connected to a blockchain.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

This file contains most of the UI functionality. It includes definitions that would normally be in multiple files, but as this is a tutorial the program is optimized for being easy to understand the first time, rather than performance or ease of maintenance.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork, 
          useContractRead, 
          usePrepareContractWrite, 
          useContractWrite, 
          useContractEvent 
        } from 'wagmi'
```

We use these library functions. Again, they are explained below where they are used.

```tsx
import { AddressType } from 'abitype'
```

[The `abitype` library](https://abitype.dev/) provides us with TypeScript definitions for various Ethereum data types, such as [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

The ABI for the `Greeter` contract.
If you are developing the contracts and UI at the same time you'd normally put them in the same repository and use the ABI generated by the Solidity compiler as a file in your application. However, this is not necessary here because the contract is already developed and not going to change.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript is strongly typed. We use this definition to specify the address in which the `Greeter` contract is deployed on different chains. The key is a number (the chainId), and the value is an `AddressType` (an address).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

The address of the contract on the two supported networks: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) and [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Note: There is actually a third definition, for Redstone Holesky, it will be explained below.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

This type is used as a parameter to the `ShowObject` component (explained later). It includes the name of the object and its value, which are displayed for debugging purposes.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

At any moment in time we may either know what the greeting is (because we read it from the blockchain) or not know (because we haven't received it yet). So it is useful to have a type that can be either a string or nothing.

##### `Greeter` component {#greeter-component}

```tsx
const Greeter = () => {
```

Finally, we get the define the component.

```tsx
  const { chain } = useNetwork()
```

Information about the chain we are using, courtesy of [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Because this is a hook (`use...`), every time this information changes the component gets redrawn.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

The address of the Greeter contract, which varies by chain (and which is `undefined` if we don't have chain information or we are on a chain without that contract).

```tsx
  const readResults = useContractRead({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true    
  })
```

[The `useContractRead` hook](https://wagmi.sh/react/hooks/useContractRead) reads information from a contract. You can see exactly what information it returns expand `readResults` in the UI. In this case we want it to keep looking so we'll be informed when the greeting changes.

**Note:** We could listen to [`setGreeting` events](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) to know when the greeting changes and update that way. However, while it may be more efficient, it will not apply in all cases. When the user switches to a different chain the greeting also changes, but that change is not accompanied by an event. We could have one part of the code listening for events and another to identify chain changes, but that would be more complicated than just setting [the `watch` parameter](https://wagmi.sh/react/hooks/useContractRead#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React's [`useState` hook](https://www.w3schools.com/react/react_usestate.asp) lets us specify a state variable, whose value persists from one rendering of the component to another. The initial value is the parameter, in this case the empty string.

The `useState` hook returns a list with two values:

1. The current value of the state variable.
2. A function to modify the state variable when needed. As this is a hook, every time it is called the component is rendered again.

In this case, we are using a state variable for the new greeting the user wants to set.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) => 
    setNewGreeting(evt.target.value)
```

This is the event handler for when the new greeting input field changes. The type, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), specifies that this is handler for a value change of an HTML input element. The `<HTMLInputElement>` part is used because this is a [generic type](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)  
```

This is the process to submit a blockchain transaction from the client perspective:

1. Send the transaction to a node in the blockchain using [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Wait for a response from the node.
3. When the response is received, ask the user to sign the transaction through the wallet. This step _has_ to happen after the node response is received because the user is shown the gas cost of the transaction before signing it.
4. Wait for the user for approve.
5. Send the transaction again, this time using [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Step 2 is likely to take a perceptible amount of time, during which users would wonder if their command was really received by the user interface and why they aren't being asked to sign the transaction already. That makes for bad user experience (UX).

The solution is to use [prepare hooks](https://wagmi.sh/react/prepare-hooks). Every time that a parameter changes, immediately send the node the `eth_estimateGas` request. Then, when the user actually wants to send the transaction (in this case by pressing **Update greeting**), the gas cost is known and the user can see the wallet page immediately.

```tsx
  return (
```

Now we can finally create the actual HTML to return.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Create a `ShowGreeting` component (explained below), but only if the greeting was read successfully from the blockchain.

```tsx     
      <input type="text" 
        value={newGreeting}
        onChange={greetingChange}
      />
```

This is the input text field where the user can set a new greeting. Every time the user presses a key, we call `greetingChange` which calls `setNewGreeting`. As `setNewGreeting` comes from the `useState` hook, it causes the `Greeter` component to be rendered again. This means that:

- We need to specify `value` to keep the value of the new greeting, because otherwise it would turn back into the default, the empty string.
- `usePrepareContractWrite` is called every time `newGreeting` changes, which means it is always going to have the latest `newGreeting` in the prepared transaction.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

If there is no `workingTx.write` then we are still waiting for information necessary for sending the greeting update, so the button is disabled. If there is a `workingTx.write` value then that is the function to call to send the transaction.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Finally, to help you see what we're doing, show the three objects we use:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` component {#showgreeting-component}

This component shows

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

A component function receives a parameter with all the attributes of the component.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` component {#showobject-component}

For information purposes, we use the `ShowObject` component to show the important objects (`readResults` for reading the greeting and `preparedTx` and `workingTx` for transactions we create).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

We don't want to clutter the UI with all the information, so to make it possible to view them or close them, we use a [`details`](https://www.w3schools.com/tags/tag_details.asp) tag.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Most of the fields are displayed using [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

The exception is functions, which aren't part of [the JSON standard](https://www.json.org/json-en.html), so they have to be displayed separately.

```tsx
          {funs.map((f, i) =>
```

Within JSX, code inside `{` curly brackets `}` is interpreted as JavaScript. Then, the code inside the `(` regular brackets `)`, is interpreted again as JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React requires tags in the [DOM Tree](https://www.w3schools.com/js/js_htmldom.asp) to have distinct identifiers. This means that children of the same tag (in this case, [the unordered list](https://www.w3schools.com/tags/tag_ul.asp)), need different `key` attributes.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

End the various HTML tags.

##### The final `export` {#the-final-export}

```tsx
export { Greeter }
```

The `Greeter` component is the one we need to export for the application.

#### `src/wagmi.ts` {#wagmi-ts}

Finally, various definitions related to WAGMI are in `src/wagmi.ts`. I am not going to explain everything here, because most of it is boilerplate you are unlikely to need to change.

The code here isn't exactly the same as [on github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) because later in the article we add another chain ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Import the blockchains the application supports. You can see the list of supported chains [in the viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

To be able to use [WalletConnect](https://walletconnect.com/) you need a project ID for your application. You can get it [on cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
) 

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Adding another blockchain {#add-blockchain}

These days there are a lot of [L2 scaling solution](https://ethereum.org/en/layer-2/), and you might want to support some that viem does not support yet. To do it, you modify `src/wagmi.ts`. These instructions explain how to add [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Import the `defineChain` type from viem.

   ```ts
   import { defineChain } from 'viem'
   ```

1. Add the network definition.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {  
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

1. Add the new chain to the `configureChains` call.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    ) 
   ```

1. Ensure that the application knows the address for your contracts on the new network. In this case, we modify `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
        
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
        
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }    
    ```

# Conclusion {#conclusion}

Of course, you don't really care about providing a user interface for `Greeter`. You want to create a user interface for your own contracts. To create your own application, run these steps:

1. Specify to create a wagmi application.

   ```sh copy
   pnpm create wagmi
   ```

1. Name the application.

1. Select **React** framework.

1. Select the **Vite** variant.

1. You can [add Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Now go and make your contracts usable for the wide world.
