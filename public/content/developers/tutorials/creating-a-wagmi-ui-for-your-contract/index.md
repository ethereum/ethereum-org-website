---
title: "Building a user interface for your contract"
description: Using modern components such as TypeScript, React, Vite, and Wagmi, we will go over a modern, but minimal, user interface and learn how to connect a wallet to the user interface, call a smart contract to read information, send a transaction to a smart contract, and monitor events from a smart contract to identify changes.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-11-01
updated: 2026-03-01
lang: en
sidebarDepth: 3
---

You found a feature we need in the Ethereum ecosystem. You wrote the smart contracts to implement it, and maybe even some related code that runs offchain. This is great! Unfortunately, without a user interface you aren't going to have any users, and the last time you wrote a website people used dial-up modems and JavaScript was new.

This article is for you. I assume you know programming, and maybe a bit of JavaScript and HTML, but that your user interface skills are rusty and outdated. Together we will go over a simple modern application so you'll see how it's done these days.

## Why is this important {#why-important}

In theory, you could just have people use [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) or [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) to interact with your contracts. That is great for the experienced Ethereans. But we are trying to serve [another billion people](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). This won't happen without a great user experience, and a friendly user interface is a big part of that.

## Greeter application {#greeter-app}

There is a lot of theory behind how modern UI works, and [a lot of good sites](https://react.dev/learn/thinking-in-react) [that explain it](https://wagmi.sh/core/getting-started). Instead of repeating the fine work done by those sites, I'm going to assume you prefer to learn by doing and start with an application you can play with. You still need the theory to get things done, and we'll get to it - we'll just go source file by source file, and discuss things as we get to them.

### Installation {#installation}

1. The application uses the [Sepolia](https://sepolia.dev/) test network. If necessary, [get Sepolia test ETH](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) and [add Sepolia to your wallet](https://chainlist.org/chain/11155111).

2. Clone the GitHub repository and install the necessary packages.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. The application uses free access points, which have performance limitations. If you want to use a [Node as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) provider, replace the URLs in [`src/wagmi.ts`](#wagmi-ts).

4. Start the application.

   ```sh
   npm run dev
   ```

5. Browse to the URL shown by the application. In most cases, that is [http://localhost:5173/](http://localhost:5173/).

6. You can see the contract source code, a modified version of Hardhat's Greeter, [on a blockchain explorer](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### File walk through {#file-walk-through}

#### `index.html` {#index-html}

This file is a standard HTML boilerplate except for this line, which imports the script file.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

The file extension indicates that this is a [React component](https://www.w3schools.com/react/react_components.asp) written in [TypeScript](https://www.typescriptlang.org/), an extension of JavaScript that supports [type checking](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript is compiled to JavaScript, so we can use it on the client side.

This file is mostly explained in case you are interested. Usually you do not modify this file, but [`src/App.tsx`](#app-tsx) and the files it imports.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Import the library code we need.

```tsx
import App from './App.tsx'
```

Import the React component that implements the application (see below).

```tsx
import { config } from './wagmi.ts'
```

Import the [wagmi](https://wagmi.sh/) configuration, which includes the blockchain configuration.

```tsx
const queryClient = new QueryClient()
```

Creates a new instance of [React Query’s](https://tanstack.com/query/latest/docs/framework/react/overview) cache manager. This object will store:
- Cached RPC calls
- Contract reads
- Background refetching state

We need the cache manager because wagmi v3 uses React Query internally.

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

The application is also inside [a `WagmiConfig` component](https://wagmi.sh/react/api/WagmiProvider). [The wagmi (we are going to make it) library](https://wagmi.sh/) connects the React UI definitions with [the viem library](https://viem.sh/) for writing an Ethereum decentralized application.

```tsx
      <QueryClientProvider client={queryClient}>
```

And finally, add a React Query provider so any application component can use cached queries.

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
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Import the libraries we need, as well as [the `Greeter` component](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

The Sepolia chain ID.

```
function App() {
```

This is the standard way to create a React component: define a function that is called whenever it needs to be rendered. This function typically contains TypeScript or JavaScript code, followed by a `return` statement that returns the JSX code.

```tsx
  const connection = useConnection()
```

Use [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) to get information related to the current connection, such as the address and `chainId`.

By convention, in React functions called `use...` are [hooks](https://www.w3schools.com/react/react_hooks.asp). These functions don't just return data to the component; they also ensure it is re-rendered (the component function is executed again, and its output replaces the previous one in the HTML) when that data changes. 

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Use [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) to get information about the wallet connection.

```tsx
  const { disconnect } = useDisconnect()
```

[This hook](https://wagmi.sh/react/api/hooks/useDisconnect) gives us the function to disconnect from the wallet.

```tsx
  const { switchChain } = useSwitchChain()
```

[This hook](https://wagmi.sh/react/api/hooks/useSwitchChain) lets us switch chains.

```tsx
  useEffect(() => {
```

The React hook [`useEffect`](https://react.dev/reference/react/useEffect) lets you run a function whenever the value of a variable changes to synchronize an external system.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

If we are connected, but not to the Sepolia blockchain, switch to Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Rerun the function every time either the connection status or the connection chainId changes.

```tsx
  return (
    <>
```

The JSX of a React component _must_ return a single HTML component. When we have multiple components and don't need a container to wrap them all, we use an empty component (`<> ... </>`) to combine them into a single component.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
      </div>
```

Provide information about the current connection. Within JSX, `{<expression>}` means to evaluate the expression as JavaScript. 

```tsx
      {connection.status === 'connected' && (
```

The syntax `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

This is the standard way to put if statements inside JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX follows the XML standard, which is stricter than HTML. If a tag does not have a corresponding end tag, it _must_ have a slash (`/`) at the end to terminate it.

Here we have two such tags, `<Greeter />` (which actually contains the HTML code that talks to the contract) and [`<hr />` for a horizontal line](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

If the user clicks this button, call the `disconnect` function.

```tsx
      {connection.status !== 'connected' && (
```

If we are _not_ connected, show the necessary options to connect to the wallet.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

In `connectors` we have a list of connectors. We use [`map`](https://www.w3schools.com/jsref/jsref_map.asp) to turn it into a list of JSX buttons to display.

```tsx
            <button
              key={connector.uid}
```

In JSX it is necessary for "sibling" tags (tags that descend from the same parent) to have different identifiers.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

The connector buttons.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

Provide additional information. The expression syntax `<variable>?.<field>` tells JavaScript that if the variable is defined, evaluate to that field. If the variable is not defined, then this expression evaluates to `undefined`.

The expression `error.message`, when there is no error, would raise an exception. Using `error?.message` lets us avoid this issue.

#### `src/Greeter.tsx` {#greeter-tsx}

This file contains most of the UI functionality. It includes definitions that would normally be in multiple files, but as this is a tutorial, the program is optimized for being easy to understand the first time, rather than performance or ease of maintenance.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

We use these library functions. Again, they are explained below where they are used.

```tsx
import { AddressType } from 'abitype'
```

[The `abitype` library](https://abitype.dev/) provides us with TypeScript definitions for various Ethereum data types, such as [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
]  // greeterABI
] as const   // greeterABI
```

The ABI for the `Greeter` contract.
If you are developing the contracts and UI at the same time, you'd normally put them in the same repository and use the ABI generated by the Solidity compiler as a file in your application. However, this is not necessary here because the contract is already developed and will not change.

We use [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to tell TypeScript that this is a *real* constant. Normally, when you specify in JavaScript `const x = {"a": 1}`, you can change the value in `x`, you just can't assign to it.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript is strongly typed. We use this definition to specify the address where the `Greeter` contract is deployed across different chains. The key is a number (the chainId), and the value is an `AddressType` (an address).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

The address of the contract on [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### `Timer` component {#timer-component}

The `Timer` component shows the number of seconds since a given time. This is important for usability purposes. When users do something, they expect an immediate reaction. In blockchains, this is often impossible because nothing happens until a transaction is placed in a block. One solution is to show how long it has been since the user performed the action, so the user can decide whether the time required is reasonable.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

The `Timer` component takes one parameter, `lastUpdate`, which is the time of the last action.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

We need to have state (a variable tied to the component) and update it for the component to work correctly. But we never need to read it, so don't bother to do a variable.

```tsx
  setInterval(() => setNow(new Date), 1000)
```

The [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) function lets us schedule a function to run periodically. In this case, every second. The function calls `setNow` to update the state, so the `Timer` component will be re-rendered.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```
Calculate the number of seconds since the last update and return it.

##### `Greeter` component {#greeter-component}

```tsx
const Greeter = () => {
```

Finally, we get to define the component.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Information about the chain and account we are using, courtesy of [wagmi]. Because this is a hook (`use...`), the component is re-rendered whenever this information changes.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

The address of the Greeter contract, which is `undefined` if we don't have chain information, or we are on a chain without that contract.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // No arguments
  })
```

[The `useReadContract` hook](https://wagmi.sh/react/api/hooks/useReadContract) calls the `greet` function of [the contract](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract). 

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React's [`useState` hook](https://www.w3schools.com/react/react_usestate.asp) lets us specify a state variable, whose value persists from one rendering of the component to another. The initial value is the parameter, in this case the empty string.

The `useState` hook returns a list with two values:

1. The current value of the state variable.
2. A function to modify the state variable when needed. As this is a hook, every time it is called the component is rendered again.

In this case, we are using a state variable for the new greeting the user wants to set.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

If multiple users are using the same contract at the same time, they might overwrite each other's greetings. This would look to the users as if the application is malfunctioning. If the application shows who last set the greeting, the user will know it was someone else and that the application is working correctly.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Users like to see that their actions have an immediate effect. However, on a blockchain, this is not the case. These state variables let us at least display something to users so they'll know their action is in progress.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

If `readResults` above changes the data and it's not set to a false value (`undefined`, for example), update the current greeting to the one read from the blockchain. Also, update the status.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Listen to `SetGreeting` events. 

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` means that if the value is `false`, or a value that evaluates as false, such as `undefined`, `0`, or an empty string, the expression overall is `false`. For any other value, it is `true`. It's a way to convert values to booleans, because if there is no `greeterAddr`, we don't want to listen to events. 

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

When we see logs (which happens when we see a new event), it means that the greeting has been modified. In that case, we can update `currentGreeting` and `lastSetterAddress` to the new values. Also, we want to update the status display.

```tsx
  const updateStatus = newStatus: string => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

When we update the status we want to do two things:

1. Update the status string (`status`)
2. Update the time of last status update (`statusTime`) to now.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

This is the event handler for changes to the new greeting input field. We could specify the type of the `evt` parameter, but TypeScript is a type option language. As this function is called only once, in an HTML event handler, I don't think it is necessary.

```tsx
  const { writeContractAsync } = useWriteContract()
```

The function to write to a contract. It is similar to [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), but enables better status updates.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

This is the process to submit a blockchain transaction from the client perspective:

1. Send the transaction to a node in the blockchain using [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Wait for a response from the node.
3. When the response is received, ask the user to sign the transaction through the wallet. This step _has_ to happen after the node response is received because the user is shown the gas cost of the transaction before signing it.
4. Wait for the user to approve.
5. Send the transaction again, this time using [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Step 2 is likely to take a perceptible amount of time, during which users may wonder whether their command was received by the user interface and why they aren't being asked to sign the transaction yet. That creates a poor user experience (UX).

One solution is to send out `eth_estimateGas` every time that a parameter changes. Then, when the user actually wants to send the transaction (in this case by pressing **Update greeting**), the gas cost is known, and the user can see the wallet page immediately.

```tsx
  return (
```

Now we can finally create the actual HTML to return.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Show the current greeting.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress == account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

If we know who set the greeting last, displayed that information. `Greeter` does not keep track of this information, and we don't want to look back for `SetGreeting` events, so we only get it once the greeting is changed while we are running.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

This is the input text field where the user can set a new greeting. Every time the user presses a key, we call `greetingChange`, which calls `setNewGreeting`. Since `setNewGreeting` comes from `useState`, it causes the `Greeter` component to be re-rendered. This means that:

- We need to specify `value` to keep the value of the new greeting, because otherwise it would turn back into the default, the empty string.
- `simulation` is also updated every time `newGreeting` changes, which means that we'll get a simulation with the correct greeting. This could be relevant because the gas cost depends on the size of the call data, which depends on the length of the string.

```tsx
      <button disabled={!simulation.data}
```

Only enable the button once we have the information we need to send the transaction.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Update the status. At this point, the user needs to confirm in the wallet.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` only returns after the transaction is actually sent. This lets us show the user how long the transaction has been waiting to be included in the blockchain. 

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Show the status and how long it has been since it was updated.

```
export {Greeter}
```

Export the component.

#### `src/wagmi.ts` {#wagmi-ts}

Finally, various definitions related to wagmi are in `src/wagmi.ts`. I am not going to explain everything here, because most of it is boilerplate you are unlikely to need to change.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

The wagmi configuration includes the chains supported by this application. You can see the [list of available chains](https://wagmi.sh/core/api/chains).


```ts
  connectors: [
    injected(),
  ],
```

[This connector](https://wagmi.sh/core/api/connectors/injected) lets us talk to a wallet installed in the browser. 

```ts
  transports: {
    [sepolia.id]: fallback([
      webSocket("wss://ethereum-sepolia-rpc.publicnode.com"),
      http("https://ethereum-sepolia.gateway.tatum.io"),
    ]),
```

To communicate with the blockchain, we will try each access URL in turn. We can use either [WebSockets](/developers/tutorials/using-websockets/) or HTTP. If you have better access URLs, for example, from a [Node as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) provider, add them at the beginning of the list.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Conclusion {#conclusion}

Of course, you don't really care about providing a user interface for `Greeter`. You want to create a user interface for your own contracts. To create your own application, run these steps:

1. Specify to create a wagmi application.

   ```sh copy
   npm create wagmi
   ```

1. Type `y` to proceed.

2. Name the application.

3. Select **React** framework.

4. Select the **Vite** variant.

Now go and make your contracts usable for the wide world.

[See here for more of my work](https://cryptodocguy.pro/).

