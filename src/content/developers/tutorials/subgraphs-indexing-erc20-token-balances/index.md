---
title: Indexing ERC-20 token balance using Subgraphs
description: Learn how to use subgraphs to easily fetch, process, and organize data that is as scattered as ERC-20 token balances across Ethereum accounts.
author: Sethu Raman Omanakuttan
lang: en
tags: ["chainstack", "the graph", "querying", "tokens"]
skill: intermediate
published: 2023-04-10
source: Chainstack
sourceUrl: https://docs.chainstack.com/docs/subgraphs-tutorial-indexing-erc-20-token-balance
---
## Introduction

Before the Bored Apes and decentralized loans, there was a time when people were obsessed with creating tokens for everything that moved. This phase turned the Ethereum ecosystem into the Wild West of the cryptocurrency world—with new tokens popping up faster than you can say “to the moon.” The main ingredient of this frenzy was an implementation standard for creating fungible tokens, the ERC-20. 

ERC-20 was designed to provide a consistent set of rules and standards for developers to follow when creating new tokens on the Ethereum blockchain. This made it easier for people to understand how to create new tokens and for users to understand how to interact with them. Since its introduction in 2015, the ERC-20 has become the most widely used standard for creating new tokens on the Ethereum blockchain. So, it means that if you have dabbled in Ethereum, chances are you have either used, created, or even hoarded tokens made using the ERC-20 standard, and this article is aimed at the hoarders… I mean HODLers of ERC-20 tokens.

In this article, you will use subgraphs to index Ethereum accounts and their ERC-20 token balances.

> 📘 
> 
> Check out [A beginner’s guide to getting started with The Graph](doc:subgraphs-tutorial-a-beginners-guide-to-getting-started-with-the-graph) and [Indexing Uniswap data with Subgraphs](doc:subgraphs-tutorial-indexing-uniswap-data) to learn more about developing Subgraphs.

## The modus operandi

As compared to other exercises using subgraphs, indexing the ERC-20 token balances presents quite a bit of a challenge. You see while trying to gather this data, you won’t be focusing on a particular account or a contract. Here, you are trying to get the details of all the accounts that house any and all ERC-20 tokens. So where do we start? 

From what we know, every ERC-20 token is controlled by a smart contract that implements the ERC-20 standard on the Ethereum blockchain. The ERC-20 standard defines a set of mandatory and optional functions that a contract must implement in order to be considered an ERC-20 token. Of the many mandatory functions that should be implemented while creating an ERC-20 token, the `transfer()` function directly affects the token balance of an account. 

> 📘 
> 
> Here’s a complete overview of the ERC-20 token standard: [OpenZeppelin ERC-20 Doc](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20)

The `transfer()` function facilitates the transfer of tokens from one account to another. By mandate, the function must also emit a `Transfer` event that carries the details of the accounts involved in the transfer and the value of the tokens that were transferred.

By capturing and processing the `Transfer` events that were emitted, we could get to access all the above-mentioned transfer information plus the address of the token (contract). With all data, I say we could create a nice index of token balances. So, let’s get to it.

## Prerequisites

Before we start scanning the Ethereum network for token balances, make sure you have installed the following on your computer:

- Node (version ≥ 16) and the corresponding npm
- A reasonably useful code editor

To develop and deploy subgraphs, you also need the graph-cli package ([v0.37.2 or greater](https://www.npmjs.com/package/@graphprotocol/graph-cli/v/0.37.2)). To install this package on your computer, open a terminal and use the following command:

```sh
npm install -g @graphprotocol/graph-cli

#for the specific package
npm install -g @graphprotocol/graph-cli@0.37.2
```

That takes care of all the requirements, now, let’s set up a subgraph project.

## Setting up the project

> 📘 
> 
> To write the code used in this article, the following Graph protocol repository was referred to:
> 
> [graphprotocol/erc20-subgraph](https://github.com/graphprotocol/erc20-subgraph).

To quickly spin up a subgraph project:

1. Create a new directory.
2. Open a terminal in the directory.
3. Use the following command:

   ```sh
   graph init
   ```

The command will prompt you for the following information:

| Detail                              | Provided value                            |
| ----------------------------------- | ----------------------------------------- |
| Protocol                            | Ethereum                                  |
| Product for which to initialize     | subgraph-studio                           |
| Subgraph slug                       | ERC20-Balance\*\*                         |
| Directory to create the subgraph in | ERC20-Balance\*\*                         |
| Ethereum network                    | mainnet                                   |
| Contract address                    | Any ERC-20 token contract address will do |
| Contract name                       | ERC20                                     |
| Index contract events as entities   | Yes                                       |

Here, as you can see, when it comes to providing the contract address for the project, you can use any given ERC-20 token contract address. This is due to the fact that the `transfer()` function and the associated event are mandatory, meaning that every ERC-20 token contract would have to implement them, and they would do so in a uniform format. 

The graph-cli uses the contract address to fetch the contract ABI, which is required for accessing the contract functions. Since every ERC-20 token contract will have the `transfer()` function and the `Transfer` event, we can use the ABI of any given ERC-20 token contract for accessing them. 

You can get the token contract address from Etherscan. To avoid confusion, you can set the contract name as `ERC20`, as a nod to the generic nature in which we will be using its ABI.

> 📘 Note
> 
> Here’s a list of ERC-20 tokens to choose from [Etherscan Token Tracker](https://etherscan.io/tokens).

Once you provide all the information, the CLI tool will set up a well-structured project with some template code.

```sh
.
├── abis
│   └── ERC20.json
├── networks.json
├── package.json
├── schema.graphql
├── src
│   ├── erc-20.ts
├── subgraph.yaml
├── tests
│   ├── erc-20.test.ts
│   └── erc-20-utils.ts
└── tsconfig.json
```

Here, you can see that inside the `/abis` directory, the contract ABI is saved as `ERC20.json` (based on the contract name that we provided).

## Writing the schema

Now that we have the base template for our project, we can start working on our [schema file](doc:subgraphs-tutorial-working-with-schemas), `schema.graphql`. Within this file, we will be defining the data objects or entities that we need. When you analyze our use case, you can see that in order to access the token balance, we also need information regarding the account and the token involved. Based on this requirement, let’s model our schema file:

```graphql
# Token details
type Token @entity {
  id: ID!
  #token name
  name: String!
  #token symbol
  symbol: String!
  #decimals used
  decimals: BigDecimal!
}

# account details
type Account @entity {
  #account address
  id: ID!
  #balances
  balances: [TokenBalance!]! @derivedFrom(field: "account")
}
# token balance details
type TokenBalance @entity {
  id: ID!
  #token
  token: Token!
  #account
  account: Account!
  #amount
  amount: BigDecimal!
}
```

Here, apart from the `Token` and `Account` entities, we have also modeled the token balance as a separate entity, `TokenBalance`. Since the token balance is associated with an account, we have declared a `balances` field inside the `Account` entity and declared it as a list of token balances; `[TokenBalance!]`. This represents the fact that a single account can have multiple token balances. The `@derivedFrom` directive in the field is used to declare it as a reverse lookup. By doing so, we have created a virtual field on the `Account` entity (`Balances`) that is derived from the relationship defined on the `TokenBalance` entity (`account`). Thus, the `Balances` field need not be set manually using the mapping file.

Now that we are done with the schema let’s work on the [manifest file](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

> 📘 
> 
> Learn more about the schema by reading [Explaining Subgraph schemas](doc:subgraphs-tutorial-working-with-schemas).

## Modifying the manifest

If you open the auto-generated manifest file `subgraph.yaml` in your code editor, you will see that it is populated with many details pertaining to the contract that we mentioned while setting up the project. For our project, we won't be needing many of these details as most of them are specific to that contract. So, edit the file in the following way:

```yaml subgraph.yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: ERC20
    network: mainnet
    source:
      abi: ERC20
      startBlock: 16482000 
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Token
        - Account
        - TokenBalance
      abis:
        - name: ERC20
          file: ./abis/ERC20.json
      eventHandlers:
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: ./src/erc-20.ts
```

In the updated manifest file, we have replaced the `entities` with the ones that we have defined. We have also removed all the `eventHandlers` except the one for the `Transfer` event and in the `source` section, we have removed the contract address, as our subgraph is not directed towards any particular address. 

We have also added the `startBlock` parameter in the `source` section. This will specify the block from which we wish to start the indexing.

And with that, we have our new and improved manifest file.

## Code generation

Once you have the schema and the manifest files, you can use the following command to generate the required AssemblyScript code:

```shell
graph codegen
```

This will generate an AssemblyScript class for every smart contract in the ABI files mentioned in our manifest file and also for its events. The generated code will be stored inside the `/generated` directory:

```sh
.
├── abis
│   └── ERC20.json
├── generated
│   ├── ERC20
│   │   └── ERC20.ts
│   └── schema.ts
├── networks.json
├── package.json
├── schema.graphql
├── src
│   ├── erc-20.ts
├── subgraph.yaml
├── tests
│   ├── erc-20.test.ts
│   └── erc-20-utils.ts
└── tsconfig.json
```

## Creating the mappings

The mapping file is where we actually associate the blockchain data to the entities that we have defined in our schema. They contain the code for the `eventHandlers`, mentioned in our manifest file. As with the manifest file, if you open the auto-generated mapping file `erc-20.ts` inside the `/src` directory, you will find out that it contains the code for various `eventHandlers`, but we can remove most of them and work on the `handleTransfer` event handler. 

Now, before we start editing our core mapping file, I would like you to create a separate file in the `/src` directory. Within this file, we will be defining the code for:

- Fetching the token details
- Fetching the account details
- Getting the token balance

> 📘 Pro tip
> 
> You can include all these functions in the core mapping file itself, but keeping it in a separate file promotes modularity and makes the code more readable.

So, create a new file `utils.ts` inside our `/src` directory and add the following code:

```js utils.ts
//import smart contract class from generated files
import {ERC20} from "../generated/ERC20/ERC20"
//import entities
import {Account,Token,} from "../generated/schema"
//import datatypes
import { BigDecimal, ethereum, Address } from "@graphprotocol/graph-ts";
//fetch token details
export function fetchTokenDetails(event: ethereum.Event): Token | null {
  //check if token details are already saved
  let token = Token.load(event.address.toHex()); 
  if (!token) { //if token details are not available
    //create a new token
    token = new Token(event.address.toHex());

    //set some default values
    token.name = "N/A"
    token.symbol = "N/A"
    token.decimals = BigDecimal.fromString("0")

    //bind the contract
    let erc20 = ERC20.bind(event.address);

    //fetch name
    let tokenName = erc20.try_name();
    if (!tokenName.reverted) {
        token.name = tokenName.value;
    }

    //fetch symbol
    let tokenSymbol = erc20.try_symbol();
    if (!tokenSymbol.reverted) {
        token.symbol = tokenSymbol.value;
    }

    //fetch decimals
    let tokenDecimal = erc20.try_decimals();
    if (!tokenDecimal.reverted) {
        token.decimals = tokenDecimal.value.toBigDecimal();
    }

    //save the details
    token.save();
  }
  return token;
}

//fetch account details
export function fetchAccount(address: string): Account | null {
  //check if account details are already saved
  let account = Account.load(address);
  if (!account) { //if account details are not available
    //create new account
    account = new Account(address);
    account.save();
  }
  return account;
}

//fetch the current balance of a particular token
//in the given account
export function fetchBalance(tokenAddress: Address, accountAddress: Address): BigDecimal{
  let erc20 = ERC20.bind(tokenAddress); //bind token
  //set default value
  let amount = BigDecimal.fromString("0")
  //get balance
  let tokenBalance = erc20.try_balanceOf(accountAddress);
  if (!tokenBalance.reverted) {
        amount = tokenBalance.value.toBigDecimal()
  }
  return amount
}
```

In this code, the `fetchTokenDetails()` gets us the details of a token. It does so by accessing the token address from the `event` parameter and binding it with the `ERC20` (token contract ABI) class. This will let us access all the public, read-only functions from the token contract, and using those functions we can retrieve the details like token name, symbol, and decimals. The `fetchAccount()` function fetches the details of the account.

The `fetchBalance()` function retrieves the balance of a particular token in a given account. To fetch the balance, the function uses the token address, which is given as a function parameter, and binds it with the `ERC20` class. This allows you to access the `balanceOf()` function, which takes the account address as the parameter and returns the token balance. The `balanceOf()` is a read-only function that is implemented as part of the ERC-20 token standard. 

In the code, we also use the graph-ts library to import certain useful data types. This library is automatically installed when we set up the project.

Once you add the new code, your project structure should look like this:

```sh
├── abis
│   └── ERC20.json
├── generated
│   ├── ERC20
│   │   └── ERC20.ts
│   └── schema.ts
├── networks.json
├── package.json
├── schema.graphql
├── src
│   ├── erc-20.ts
│   └── utils.ts
├── subgraph.yaml
├── tests
│   ├── erc-20.test.ts
│   └── erc-20-utils.ts
└── tsconfig.json
```

Now, let’s work on our core mapping file `/src/erc-20.ts`.

## Handling `Transfer` event

Within the mapping file, you will be writing the code for the `handleTransfer` event handler. The code should be defined as a function of the same name, `handleTransfer()`:

```js /src/erc-20.ts
//import event class from generated files
import {Transfer} from "../generated/ERC20/ERC20"
//import entities
import {TokenBalance} from "../generated/schema"
//import the functions defined in utils.ts
import {
  fetchTokenDetails,
  fetchAccount,
  fetchBalance
} from "./utils"
//import datatype
import { BigDecimal} from "@graphprotocol/graph-ts";

export function handleTransfer(event: Transfer): void {
    let token = fetchTokenDetails(event);
    if (!token) { //if token == null
        return
      }

    //get account addresses from event
    let fromAddress = event.params.from.toHex();
    let toAddress = event.params.to.toHex();

    //fetch account details
    let fromAccount = fetchAccount(fromAddress);
    let toAccount = fetchAccount(toAddress);

    if (!fromAccount || !toAccount) {
    return;
    }

    //setting the token balance of the 'from' account
    let fromTokenBalance = TokenBalance.load(token.id + "-" + fromAccount.id);
    if (!fromTokenBalance) { //if balance is not already saved
					//create a new TokenBalance instance
					// while creating the new token balance,
					// the combination of the token address 
					// and the account address is  
					// passed as the identifier value
          fromTokenBalance = new TokenBalance(token.id + "-" + fromAccount.id);
          fromTokenBalance.token = token.id;
          fromTokenBalance.account = fromAccount.id;
    }

    fromTokenBalance.amount = fetchBalance(event.address,event.params.from)
		//filtering out zero-balance tokens - optional
    if(fromTokenBalance.amount != BigDecimal.fromString("0")){
      fromTokenBalance.save();
    }
    
    //setting the token balance of the 'to' account
    let toTokenBalance = TokenBalance.load(token.id + "-" + toAccount.id);
    if (!toTokenBalance) {
        toTokenBalance = new TokenBalance(token.id + "-" + toAccount.id);
        toTokenBalance.token = token.id;
        toTokenBalance.account = toAccount.id;
      }
    toTokenBalance.amount = fetchBalance(event.address,event.params.to)
    if(toTokenBalance.amount != BigDecimal.fromString("0")){
      toTokenBalance.save();
    }
}
```

The `handleTransfer()` function takes the `Transfer` event as the parameter. From the event, the code retrieves the address of the token and the addresses of accounts involved in the transfer. These addresses are used to fetch the details of the token and the accounts respectively. For retrieving the details, we make use of the functions that we defined in the `utils.ts` file. Once we have all the information, we use it to set the token balances of both accounts involved in the transfer.

With that, we have everything that we need to deploy our subgraph, so let’s build our code and deploy the subgraph using [Chainstack](https://chainstack.com/subgraphs/).

## Building the code

To build the code, open a terminal in the root directory of the project and type:

```sh
graph codegen &&  graph build
```

The command will compile your code and create corresponding WebAssembly files of `.wasm` format. The build outputs will be stored inside the `/build` directory.

Now, let's deploy the subgraph.

## Deploying the subgraph

To deploy your subgraph:

1. Head over to [Chainstack](https://chainstack.com/).
2. Create a new project.
3. Go to the **Subgraphs** section.
4. Click **Add subgraph**. The **Add subgraph** page is displayed.
5. In the **Create subgraph** section:
   - Enter a **Name** for the subgraph
   - Select the **Project** you created
   - Click **Add subgraph**. The details page of the new subgraph is displayed.

Once the subgraph is deployed, on the subgraph details page: 

1. Scroll down to the part where it shows the **Subgraph deployment command**.
2. Copy the command.
3. Open a terminal in your project directory.
4. Paste and run the deployment command.

The command will prompt you for the version labeling and once you provide that, the command will automatically deploy your subgraph. Once the subgraph is deployed, the command will give you the GraphQL UI URL to interact with your subgraph.

> 📘 Note
> 
> Given the scale of the data that we are trying to index, the subgraph can take multiple days to synchronize.

## Querying the data

The GraphQL UI URL provides a neat interface for querying and viewing the data. For fetching the list of all the accounts and their token balances, use the following query:

```js
{
  accounts{
    id
    balances{
      id
      token{
        id
        name
        symbol
        decimals
      }
      amount
    }
  }
}
```

And that is how you use subgraphs to index all the token balances of Ethereum accounts.

## Conclusion

Chainstack Subgraphs is a powerful tool that allows Web3 developers to index and query data from decentralized networks like Ethereum. They allow developers to easily access and use the data stored on these networks in their decentralized applications without having to build and maintain their own infrastructure for data indexing and querying. This can save significant time and resources for developers and make it easier to BUIDL efficient DApps. 

The aim of this article was to showcase the scale of these subgraphs by using them to easily fetch, process, and organize data that is as scattered as ERC-20 token balances.