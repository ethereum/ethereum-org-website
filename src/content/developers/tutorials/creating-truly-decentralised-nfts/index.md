---
title: Creating Truly Decentralised NFTs - A Comprehensive Guide to ERC721 & IPFS
description: Securing off-chain data via on-chain NFTs. Blockchain memory is expensive but IPFS enables data to be economically stored off-chain while its provenance is still secured on-chain.
author: "AwKaiShin"
tags: ["ipfs", "erc-721", "hardhat"]
skill: intermediate
lang: en
source: medium.com
sourceUrl: https://medium.com/@kaishinaw/creating-truly-decentralised-nfts-a-comprehensive-guide-to-erc721-ipfs-b2ae60e312b6
published: 2022-08-31
---

## Introduction {#introduction}

While NFTs are a great tool for uniquely identifying digital assets and ownership, storing data on the blockchain comes with a much higher cost relative to traditional databases (data has to be processed and replicated across nodes). Consequently, a common pattern which emerged in the NFT space was for the NFT to instead hold a link to the target asset rather than the actual asset itself. As such, absent a reliable decentralised storage alternative, many NFTs are actually still very reliant on traditional web infrastructure.

For example, a high-res image would be stored on a centralised server while only the link (i.e. `https://www.domain.com/subdomain/imgLink`) would be stored in the NFT. Those familiar with web2.0 architecture will be able to easily recognise that there is nothing stopping the image host from changing the image which the URL points to. Decentralised storage technologies such as IPFS (InterPlanetary File System) aims to solve exactly this by enabling such data to be securely replicated across multiple nodes while minimising the risk of being censored or tampered with.

Instead of addresses which are based on the location of a file, IPFS redefines the address based on the file content. While not in the scope of this guide, this definition is made possible through [cryptographic hashing](https://www.youtube.com/watch?v=b4b8ktEV4Bg), [Directed Acyclic Graphs](https://www.youtube.com/watch?v=1Yh5S-S6wsI), and [Merkle Trees](https://www.youtube.com/watch?v=fB41w3JcR7U). From a data perspective, the combination of the above enables:

- **Resilience:** Data will always be available as long as even a single node hosts the data. This also makes it harder to censor.
- **Reliability:** As any change to the file itself will change the hashed address, there are less trust assumptions when navigating to an address. Users can always compute the hash themselves to verify authenticity. This also minimizes risk around version control.
- **Deduplication:** If some data forms part of multiple datasets, each dataset only needs to link to one version of the data. Consequently, nobody has to store the entire dataset as links can be used to pull sections of data from across the network.

I highly recommend checking out [Proto.school](https://proto.school/) if you want to wrap your head around all the concepts. For our purposes, IPFS enables the data our NFT is pointing to to be truly decentralised. To this end, I have compiled an end-to-end guide on how to integrate IPFS and ERC721 using Hardhat. This includes:

- Hardhat & IPFS Environment Setup & Configuration
- Extending OpenZeppelin’s ERC721 Contract & Helper Contracts
- Deploying Token Contract to Goerli Testnet (getting test ETH, connecting to node, private key exporting)
- Uploading Data to IPFS and Writing Response to the Blockchain
- Interacting Programatically with a Local Contract Instance
- Sending Created ERC721 Tokens on Goerli Testnet via Metamask

Although targeted at those starting out in the space, this guide requires some basic familiarity with [Node.js](https://nodejs.org/en/) and [Solidity](https://docs.soliditylang.org/en/v0.8.13/introduction-to-smart-contracts.html) concepts. Of note, I have also skipped the testing section for this guide as the focus is on IPFS integration. All the code used in this guide can be found on [github](https://github.com/0xKai27/ERC721-IPFS).

Related Guides:

- [`ERC721 Using Hardhat: An Updated Comprehensive Guide To NFTs`](https://medium.com/@kaishinaw/erc721-using-hardhat-an-updated-comprehensive-guide-to-nfts-ce5b211a5c3)
- [`ERC20 Using Hardhat: An Updated Comprehensive Guide`](https://medium.com/@kaishinaw/erc20-using-hardhat-a-comprehensive-guide-3211efba98d4)

## Hardhat Setup {#hardhat-setup}

We first need to create a project directory and install Hardhat:

```bash
mkdir ERC721-IPFS
cd ERC721-IPFS
npm install --save-dev hardhat
```

Once the `hardhat` package has been installed, we can then run npx hardhat which will bring up some options for bootstrapping the project:

![Hardhat Setup](https://miro.medium.com/max/720/1*UKcb4qiYXXa2gXlUyAla2w.webp)

For this tutorial, we will select the `Create a JavaScript` project option. You will be prompted with a series of questions which you can continuously select enter to. The last of which will install the project dependencies.

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox@^1.0.1
```

Following the `npx hardhat` command, the project will have 3 folders:

- `contracts/` is where the source files for your contracts should be.
- `test/` is where your tests should go.
- `scripts/` is where simple automation scripts go.

Additionally, a `hardhat.config.js` file will have been generated. This file will manage the plugins and dependencies viewable by hardhat. Plugins and dependencies will have to be installed first followed by requiring it in the `hardhat.config.js` file.

The `npx hardhat` command will have also created a sample Lock contract which we will not require for this guide so you can go ahead and remove them:

```bash
rm contracts/Lock.sol test/Lock.js
```

Now that Hardhat has been setup, we can begin creating our ERC721 token.

## ERC721 Contract {#erc721-contract}

OpenZeppelin, which spearheads the advancement of the ERC721 standard, provides a comprehensive library for secure smart contract development which we will be using to implement our token. To do this, we need to first install the OpenZeppelin contracts package.

```bash
npm install @openzeppelin/contracts
```

We can then import the OpenZeppelin contracts into our own contract by prefixing its path with `@openzeppelin/contracts/...`.

Before starting our first ERC721 token contract, we need to complete the most important step: naming your token collection! This differs from the ERC20 implementation where the name is given to the token instead of a token collection. For ERC721 tokens which are non-fungible, each NFT has to have a different identifier but we can still group them together under the same collection. Hence, for ERC721 tokens, the smart contract represents the token collection where new NFTs from the collection can be minted by passing a unique identifier to the token collection contract.

The standard practice is to match the smart contract file name with that of your token collection. For this guide, I will be naming the token collection `DecentralisedNFT` (decentralised non-fungible token) with a symbol of DNFT and hence my smart contract file name will be `DecentralisedNFT.sol`. Feel free to choose your own collection name but do remember to replace any instance of `DecentralisedNFT` with your own specially crafted name.

The new contract will be placed in the `contracts/` folder:

```bash
touch contracts/DecentralisedNFT.sol
```

Open `DecentraliseNFT.sol` in your code editor and add the following code. The code will utilise the Solidity’s constructor function to give the token collection a `name` and `symbol` upon deployment.

```solidity
// contracts/DecentralisedNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DecentralisedNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Base URI required to interact with IPFS
    string private _baseURIExtended;

    constructor() ERC721("DecentralisedNFT", "DNFT") {
        _setBaseURI("ipfs://");
    }

    // Sets the base URI for the collection
    function _setBaseURI(string memory baseURI) private {
        _baseURIExtended = baseURI;
    }

    // Overrides the default function to enable ERC721URIStorage to get the updated baseURI
    function _baseURI() internal view override returns (string memory) {
        return _baseURIExtended;
    }

    // Allows minting of a new NFT
    function mintCollectionNFT(address collector, string memory metadataURI) public onlyOwner() {
        _tokenIds.increment(); // NFT IDs start at 1

        uint256 tokenId = _tokenIds.current();
        _safeMint(collector, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
}
```

We will be importing OpenZeppelin’s `ERC721URIStorage` via the path `@openzeppelin/contracts/token/ERC721/ERC721.sol`. This contract implements additional functions on top of the standard ERC721 which will help us to manage the NFT metadata. You can find the path for the contract via OpenZeppelin’s [docs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721URIStorage) or their [github](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol).

As the core set of ERC721 contracts are unopinionated, we have also declared a custom mint function `mintCollectionNFT()` in order to implement NFT minting for the collection using the ERC721 internal functions. This includes the standard `_safeMint()` from ERC721 as well as `_setTokenURI()` from `ERC721URIStorage`.

Do note that we are also using the `Ownable` contract to ensure that only the `contractOwner` can mint NFTs. Additionally, the `Counters` contract ensures a unique auto-incrementing ID for each NFT created. Save the `DecentralisedNFT.sol` contract and we can now compile the completed contract.

## Compiling The Contract {#compiling-the-contract}

For the Ethereum Virtual Machine (EVM) to run our code, we need to compile our Solidity code into the EVM compatible bytecode. To ensure there are no versioning issues, we can specify a Solidity version in the provided `hardhat.config.js file`.

```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-chai-matchers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
}
```

To compile the `DecentralisedNFT` contract, we can use Hardhat’s handy compile command.

```bash
npx hardhat compile
```

![Hardhat Compile](https://miro.medium.com/max/720/1*aI2psV9Fie2fES3XdEOnRQ.webp)

Hardhat will have compiled the contract into a newly created `artifacts/` folder. Although we only wrote the code for `DecentralisedNFT.sol`, the console shows that there were 13 compiled files. This is because of how Solidity handles the importing of `@openzeppelin/contracts` and its dependencies.

## Deploying The Contract Locally {#deploying-the-contract-locally}

Before deploying the contract to a public network, it is best practice to test the contract on a local blockchain first. Hardhat simplifies the process of setting this up by having an in-built local blockchain which can be easily run through a single line of code:

```bash
npx hardhat node
```

Run the above command in a separate command window.

![Hardhat Test Network](https://miro.medium.com/max/720/1*3TD1Rihd1uqdMm41cqXiCQ.webp)

The Hardhat network will print out the address as well as a list of locally generated accounts. Do take note that this local blockchain only stores the interactions until the console is closed hence the state is not preserved between runs. Additionally, take the time to read through the details of the accounts as it is important that you do not use these sample accounts for sending any real money. With the local blockchain up and running, we can then start writing our deployment scripts. Hardhat currently does not have a native deployment system and hence the need for scripts.

For our deployment script, we will be making use of the `hardhat-ethers` plugin. You can find the documentation for the [plugin](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-ethers) here. To use it in the project, we need to first install it:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

Navigating to the `scripts/` directory, you will be able to see that a `deploy.js` file was previously created. We can replace the `main()` function with the following:

```javascript
// scripts/deploy.js
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat")

async function main() {
  // Get the contract owner
  const contractOwner = await ethers.getSigners()
  console.log(`Deploying contract from: ${contractOwner[0].address}`)

  // Hardhat helper to get the ethers contractFactory object
  const DecentralisedNFT = await ethers.getContractFactory("DecentralisedNFT")

  // Deploy the contract
  console.log("Deploying DecentralisedNFT...")
  const decentralisedNFT = await DecentralisedNFT.deploy()
  await decentralisedNFT.deployed()
  console.log(`DecentralisedNFT deployed to: ${decentralisedNFT.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
```

Hardhat will deploy the contract using the first account created when we started up the node above. The `mintCollectionNFT()` function in `DecentralisedNFT.sol` will allow us to externally call the contract in order to mint `DNFT` NFTs. To access the array of accounts created, we can use the `getSigners()` helper function provided by the `hardhat-ethers` plugin.

Save the file and we are now ready to deploy our `DecentralisedNFT` contract!

```bash
npx hardhat run --network localhost scripts/deploy.js
```

![Hardhat Deplot To Test Network](https://miro.medium.com/max/720/1*b5odHRgtGDEODvgBUwYwEg.webp)

As mentioned, we are deploying the contract to our `localhost`. Do take note of the deployed contract address as we will need it in the next section for interacting with our contract programatically.

## Configuring IPFS {#configuring-ipfs}

Before we start minting NFTs, we must first setup your IPFS environment as this will allow the IPFS data to be stored on the blockchain. The easiest way to get started is to install IPFS Desktop which is a GUI to host and interact with the IPFS node. You can find the installation guide [here](https://docs.ipfs.tech/install/ipfs-desktop/#windows).

![IPFS GUI](https://miro.medium.com/max/720/1*iJ_EO4YfT0CsGRZ3-jzkSA.webp)

Once installed, you will be able to see the IPFS instance running in your taskbar. By clicking on the `Advanced` arrow, you should also see the connection options for your IPFS node. Note the default API address which we will be connecting to shortly.

## Interacting With The Contract (with IPFS) {#interacting-with-the-contract}

With our IPFS node setup, we can now proceed to create a script to interact with our DecentralisedNFT smart contract. The full script can be found [here](https://github.com/0xKai27/ERC721-IPFS/blob/main/scripts/interact.js).

We will be relying on the following dependencies for our script and hence will need to install it into our working folder:

```bash
npm install --save-dev ipfs-http-client
npm install --save-dev it-to-buffer
```

In order to keep track of all the linked data, we will also create an `imagesSummary` array which will hold objects representing a specific NFT/image. This includes the following data:

- **imageCID:** The identifier representing the image uploaded to IPFS
- **metadataCID:** The identifier representing the image metadata uploaded to IPFS. This includes the name, description, as well as the imageCID
- **mintedNFTId:** The token ID for the newly minted NFT which contains the NFT metadata link/URI
- **metadataURI:** The IPFS link where the NFT metadata is stored
- **metadataJSON:** The metadata object that is stored by IPFS

The `imagesSummary` array will be added to whenever new information on the NFT is generated. The script will also log the `imagesSummary` array at the end. As a preview, below is a screenshot of the `imagesSummary` generated when running the code locally:

![Images Metadata Summary](https://miro.medium.com/max/720/1*vAiZO65XydD9N0rNBVh3mQ.webp)

### Getting the deployed contract {#getting-the-deployed-contract}

In order to get the instance of our deployed contract, you will need the contract address returned from the deployment command. You can replace the `contractAddress` in the code below with the one provided by your local machine.

```javascript
// scripts/interact.js
const { ethers } = require("hardhat")
const path = require("path")
const fs = require("fs")
const fsPromises = fs.promises
const toBuffer = require("it-to-buffer")

async function main() {
  console.log("Getting the DecentralisedNFT contract...\n")
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const decentralisedNFT = await ethers.getContractAt(
    "DecentralisedNFT",
    contractAddress
  )
  const signers = await ethers.getSigners()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
```

With that, we have set up our `decentralisedNFT` object which is an abstraction of a contract deployed on the Ethereum network, in this case a local network. This `decentralisedNFT` object enables a simple way to serialize calls and transactions to an on-chain contract and deserialize their result logs. You can refer to the ethers [documentation](https://docs.ethers.io/v5/api/contract/) for more info.

### Configure the local IPFS node object {#configure-the-local-IPFS-node-object}

To interact with our local IPFS node programatically, we will need to create an IPFS instance to interact with. As mentioned in the above section, we will be using the default IPFS configuration.

```javascript
// scripts/interact.js
// Configure the local IPFS node
console.log(`Configuring the IPFS instance...`)
const { create } = await import("ipfs-http-client")
const ipfs = create()
const endpointConfig = await ipfs.getEndpointConfig()
console.log(`IPFS configured to connect via: `)
console.debug(endpointConfig)
console.log(` `)
```

![IPFS Configuration](https://miro.medium.com/max/640/1*hftCHHAtLAlqGCT7tsT87w.webp)

### Importing Images {#importing-images}

For this guide, we will be uploading images to IPFS and as such, we will need a folder to store all the images to be uploaded.

```bash
mkdir images
```

You can drag and drop the images to upload into the newly created folder and we should be good to go. In the interest of simplicity, do note that the code filters the folder for `.png` images.

```javascript
// Get the images to upload from the local filesystem (/images)
console.log(`Importing images from the images/ directory...`)
const imgDirPath = path.join(path.resolve(__dirname, ".."), "images")

const filesName = await fsPromises.readdir(imgDirPath, (err) => {
  if (err) {
    console.log("Import from directory failed: ", err)
  }
})

const imagesName = filesName.filter((fileName) => fileName.includes(".png"))

let imagesData = []
for await (const imageName of imagesName) {
  let imageFilePath = path.join(
    path.resolve(__dirname, ".."),
    "images",
    imageName
  )
  let imageData = await fsPromises.readFile(imageFilePath)
  imagesData.push(imageData)
}

console.log(`Imported images as buffered data\n`)
```

Running the script, the images should now be imported as buffered data objects which you can then handle in your code.

![Import Images](https://miro.medium.com/max/720/1*bTtjR2KsUl6B4DqgaC9hfA.webp)

### Uploading images to IPFS {#uploading-images-to-ipfs}

We can then upload the image buffered data to IPFS via our locally configured IPFS instance. In order to do this, we use the `ipfs.add` function which will return us the CID (content identifier) of the uploaded image.

```javascript
// Uploading images to IPFS
console.log(`Uploading image data to IPFS...`)
let imageCIDs = []
for await (const imageData of imagesData) {
  let { cid: imageCID } = await ipfs.add({
    content: imageData,
  })
  imageCIDs.push(imageCID)
  imagesSummary.push({ imageCID })
  console.log(`Image added to IPFS with CID of ${imageCID}`)
}
console.log(` `)
```

![Upload Images To IPFS](https://miro.medium.com/max/720/1*amcIbmhtMxgQe69OaN0Z3A.webp)

### Uploading metadata to IPFS {#uploading-metadata-to-ipfs}

Once we have obtained the image CID, we can then add additional metadata to link the image with our soon to be created NFT. For this guide, we will be implementing a simplified version of the recommended metadata JSON schema per the [EIP-721 specification](https://eips.ethereum.org/EIPS/eip-721).

![EIP721](https://miro.medium.com/max/720/1*e_z4IA9PCNWZ_VX21at8nQ.webp)

We will create a helper function to create our metadata object.

```javascript
// Helper function to form the metadata JSON object
function populateNFTMetadata(name, description, CID) {
  return {
    name,
    description,
    image: CID,
  }
}
```

Note that for simplicity, I have decided to keep the same `name` and `description` for all the images but you could implement your own form of input to change this accordingly.

```javascript
// Add the metadata to IPFS
console.log(`Adding metadata to IPFS...`)
let metadataCIDs = []
for await (const imageCID of imageCIDs) {
  console.log(imageCID)
  const { cid: metadataCID } = await ipfs.add({
    // NOTE: You can implement different name & descriptions for each metadata
    content: JSON.stringify(
      populateNFTMetadata(
        "Screenshots",
        "Medium & Twitter Screenshots",
        imageCID.toString()
      )
    ),
  })
  metadataCIDs.push(metadataCID)
  for (let i = 0; i < imagesSummary.length; i++) {
    if (imagesSummary[i].imageCID == imageCID) {
      imagesSummary[i].metadataCID = metadataCID
    }
  }
  console.log(
    `Metadata with image CID ${imageCID} added to IPFS with CID of ${metadataCID}`
  )
}
console.log(` `)
```

Similar to the uploading of images, we will also receive a CID when the metadata is uploaded to IPFS.

![IPFS Uploaded Metadata](https://miro.medium.com/max/720/1*OkhNNruConJu1pouWyPl1Q.webp)

### Mint NFTs with metadata stored on-chain {#mint-nfts-with-metadata-stored-onchain}

Now that we have the metadata CID (which includes the image CID), we can then mint a NFT for each image which includes its metadata. For this, we will be making use of the custom `mintCollectionNFT()` function which we implemented in our `DecentralisedNFT.sol` contract. This function utilises the `ERC721URIStorage` contract to store additional NFT metadata on the blockchain.

```javascript
// scripts/interact.js
// Mint new NFTs from the collection using custom function mintCollectionNFT()
console.log("Minting new NFTs from the collection to the contractOwner...")
const contractOwner = signers[0].address
let mintedNFTIds = []
for await (const metadataCID of metadataCIDs) {
  const deployedTokenId = await decentralisedNFT.mintCollectionNFT(
    contractOwner,
    metadataCID.toString()
  )
  await deployedTokenId.wait()
  console.log(`NFT with CID ${metadataCID} minted to ${contractOwner}`)

  // Querying the latest transfer event to get the minted token ID
  console.log(`Getting the latest Transfer event...`)
  const transferEvents = await decentralisedNFT.queryFilter("Transfer") // Logs will be ordered by earliest, assumes no other transfers while running
  const mintedNFTId =
    transferEvents[transferEvents.length - 1].args.tokenId.toString()
  mintedNFTIds.push(mintedNFTId)
  for (let i = 0; i < imagesSummary.length; i++) {
    if (imagesSummary[i].metadataCID == metadataCID) {
      imagesSummary[i].mintedNFTId = mintedNFTId
    }
  }
  console.log(
    `NFT with CID ${metadataCID} was minted with token ID ${mintedNFTId}`
  )
}
console.log(` `)
```

Additionally, we are also listening for any `Transfer` event which is emitted upon a NFT mint in order to get the `tokenId` created by the `Counters` contract. Do note that the code here assumes that there are no concurrent transfers for the NFT. For simplicity, I have left out more complex event querying (ie. filter for transfers originating from the zero address).

![NFT Mint Events](https://miro.medium.com/max/720/1*6Ia0OrsNn7S-YQaydD1LWg.webp)

### Get the on-chain stored data {#get-the-onchain-stored-data}

With the `tokenId`, we can then query the blockchain for the stored data using the `tokenURI()` function from the `ERC721URIStorage` contract.

```javascript
// scripts/interact.js
// Get the URI stored on the blockchain
console.log(`Getting URI stored on blockchain...`)
let metadataURIs = []
for await (const mintedNFTId of mintedNFTIds) {
  console.log(`Querying blockchain for tokenURI of token ID ${mintedNFTId}`)
  const metadataURI = await decentralisedNFT.tokenURI(mintedNFTId)
  metadataURIs.push(metadataURI)
  for (let i = 0; i < imagesSummary.length; i++) {
    if (imagesSummary[i].mintedNFTId == mintedNFTId) {
      imagesSummary[i].metadataURI = metadataURI
    }
  }
  console.log(`Token ID ${mintedNFTId} tokenURI: ${metadataURI}`)
}
console.log(` `)
```

This call should return the URI prefixed with `ipfs://` to indicate that the hash is a IPFS content identifier.

![Blockchain URI Data](https://miro.medium.com/max/720/1*PUsjywXZzf7c-s4ZqvNDxA.webp)

### Get the IPFS stored data {#get-the-ipfs-stored-data}

Given the URI obtained from the blockchain, we can then query IPFS for the relevant metadata.

```javascript
// scripts/interact.js
// Query IPFS based on the blockchain stored URI
console.log(`Using queried URI to check metadata on IPFS...`)
for await (const metadataURI of metadataURIs) {
  const bufferedQuery = await toBuffer(
    ipfs.cat(metadataURI.replace("ipfs://", ""))
  )
  const metadataJSON = JSON.parse(bufferedQuery)
  console.log(`IPFS metadata based on metadata CID ${metadataURI}: `)
  console.log(metadataJSON)
  for (let i = 0; i < imagesSummary.length; i++) {
    if (imagesSummary[i].metadataURI == metadataURI) {
      imagesSummary[i].metadataJSON = metadataJSON
    }
  }
}
console.log(` `)
```

If all goes well, you should expect to see the JSON metadata which was created for each NFT.

![IPFS JSON Metadata](https://miro.medium.com/max/720/1*OyxLQyBZm1rCHhnYQOGAvg.webp)

## Deploying the Contract Publicly {#deploying-the-contract-publicly}

Given the length of this guide, I have opted to skip writing automated tests but this is definitely something which should be done before deploying your code into production. With that disclaimer out of the way, it’s finally time to deploy `DecentralisedNFT` onto a public network! This is the exciting part, as anybody connected to the network will be able to interact with your NFT collection.

For the purpose of this guide, we will be deploying the contract onto the Goerli testnet. The Goerli testnet functions identical to the mainnet minus the dollar value attached to ETH. As such, it is the perfect environment to experiment with your contracts prior to deploying to the mainnet. Do note that we are also deploying to Goerli as many of the other testnets (Ropsten, Rinkeby, Kiln) will be stopped following ETH merge.

In order to deploy to Goerli, we will need to first source some Goerli ETH, hereon referred to just ETH. This is required as transactions on the public network need to be processed by a miner which demands a gas fee to be paid. So far, we have been testing the contract on our local network where all the accounts were locally generated with a set amount of ETH. On public networks, all the new ETH generated are minted to the miners and hence we need to source ETH in order to run our contract code.

The easiest way to procure some ETH is via faucets. Faucets are community funded websites where users can request for ETH to be sent to a privately owned wallet. Do note, it is best to send these funds to a separate dev wallet as the private keys will be needed in plain text later. Faucets are used in the test environment as a way to circulate testnet ETH for developers to use. You can easily find such sites by doing a search but I have linked 2 such sites below:

- [goerlifaucet.com](https://goerlifaucet.com/): Requires an Alchemy account
- [goerli-faucet.pk910.de](https://goerli-faucet.pk910.de/): Uses computing power to mitigate spam

Once you’ve got some ETH, let’s go ahead and add the network to our `hardhat.config.js` so that Hardhat knows where to deploy to.

```javascript
//hardhat.config.js
require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "YOUR OWN API KEY HERE"

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "YOUR OWN PRIVATE KEY HERE"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
}
```

In order for Hardhat to deploy the contract to Goerli, it needs two additional things:

- A Goerli node which it can connect to in order to send the transaction to the network
- The wallet which will be used for deploying the contract

For the API to connect to the node, you can generate one by signing up on [alchemy.io](https://www.alchemy.com/), creating a new app and copying the API KEY under the “VIEW KEY” on the app dashboard. Do note, you only need to sign up for the free account so you can just skip the payment information.

![Alchemy Dashboard](https://miro.medium.com/max/720/0*JzfhSMiB6KbtLOED.webp)

Next up, we will need the private key of the account that is going to pay for the deployment of the contract. In order to get the private key for the account which received the faucet ETH, you can export it directly from Metamask under the “Account details”. Copy and paste that private key into the config file.

![Metamask Account Details](https://miro.medium.com/max/720/0*Kf5LZHP9TV3Y8JjO.webp)

With that, we are now ready to to deploy the contract by using the following command:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

You would have noticed that, in contrast to our local environment, transaction confirmation was not instant and this is because the transaction had to be processed by the Goerli testnet. This gives you a taste of how time-consuming the dev cycle can be if not for a local environment. Also note that the ETH balances in the specified account has decreased by a small amount due to gas fees.

Once deployed, your console should output the newly deployed contract address:

![Deployed Contract Address](https://miro.medium.com/max/720/1*6dVYzdAL1QYAh-fXeMswSw.webp)

Remember that the `DecentralisedNFT` contract requires us to mint NFTs from the collection after the contract has been deployed. We can reuse the `interact.js` script which we ran in the previous section for this. In order for `interact.js` to interact with our Goerli deployed contract, we just need to change the `contractAddress` to the address above, save and Hardhat will do the rest of the heavy-lifting. We can now run the `interact.js` script on the Goerli testnet by running the following command:

```bash
npx hardhat run --network goerli scripts/interact.js
```

This will then return all the following logs:

![Logs 1](https://miro.medium.com/max/720/1*pNYvRM-QXo4GvOJlWYxHwQ.webp)
![Logs 2](https://miro.medium.com/max/720/1*jWVXTpbekIRnG403nPs--A.webp)
![Logs 3](https://miro.medium.com/max/720/1*9qko696LwouS-vR1SnaWfQ.webp)

As part of our script, we have minted 3 NFTs to the testnet, each containing the metadata for the image. As the metadata is an IPFS address, we can also paste the data into a IPFS enabled [browser](https://api.ipfsbrowser.com/ipfs/get.php?hash=) to get the IPFS stored data. Do note that the data is being distributed from your local IPFS node hence your node needs to be online for the link to work. For a shameless self-plug example, below is the data for `tokenId` 3 which was [minted](https://api.ipfsbrowser.com/ipfs/get.php?hash=QmUsjZWmJNpqaRq6RWmrDebngVHy7ugMJA9AbfquDsw53f):

![IPFS Browser](https://miro.medium.com/max/720/1*d03MxX_qTxMcOdkbGFBEMA.webp)

And pasting the image URI into the same browser:

![IPFS Browser Image](https://miro.medium.com/max/720/1*bgCFrG7YCooEV3yEgaqfqw.webp)

That’s a one-of-one screenshot of my Twitter account: https://twitter.com/kai27_crypto! Maybe one-day it will be worth millions. Follow for more crypto related analysis & guides ;)

Jokes aside, that covers the IPFS side of things but we still need to view our token to validate that it is really on-chain. We can do this by adding our token contract to Metamask. Open Metamask and navigate to the assets tab where you will see an “Import tokens” link. Select the link and enter the contract address, the “Token Symbol” field should be auto-populated but you will need to enter `0` for the decimal field.

![Metamask Import Tokens](https://miro.medium.com/max/720/1*IFPXB18OGChgBqTbUArzvg.webp)

Once imported, you should be able to see the 3 `DNFT` in your wallet.

![Metamask Balance](https://miro.medium.com/max/720/1*_ldBUbNDL5nNncw9uZuQ4Q.webp)

You might have noticed that unlike the ERC20 implementation, the send button for our ERC721 NFT has been disabled. Unfortunately, Metamask desktop extension does not currently support [`additional NFT functionalities`](https://metamask.zendesk.com/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet). In order to see our NFT being transferred, we can either interact with our contract via NFT wallets which support such functions or create another script to interact programmatically. As an example of the latter, `transfer.js` showcases a simple transfer of an NFT from the collection.

```javascript
// scripts/transfer.js
const { ethers } = require("hardhat")

async function main() {
  console.log("Getting the DecentralisedNFT contract...\n")
  const contractAddress = "0x131060B1A88Eebb934FD427C114Acdc819C68d40"
  const decentralisedNFT = await ethers.getContractAt(
    "DecentralisedNFT",
    contractAddress
  )
  const signers = await ethers.getSigners()
  const contractOwner = signers[0].address

  // Transfer tokenId 1 to another account
  console.log(`Transferring NFT...`)
  const recipient = "0x2bfc3A4Ef52Fe6cD2c5236dA08005C59EaFB43a7"
  const tokenId = "1"
  let tx = await decentralisedNFT["safeTransferFrom(address,address,uint256)"](
    contractOwner,
    recipient,
    tokenId
  )
  await tx.wait()
  console.log(
    `NFT ${tokenId} transferred from ${contractOwner} to ${recipient}`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
```

```bash
npx hardhat run --network goerli scripts/transfer.js
```

![Transfer NFT](https://miro.medium.com/max/720/1*sGdke0rtAo6EqXZATcPybg.webp)

Running the above, NFT `1` has been sent to my other dev wallet:

![Metamask Transferred NFT](https://miro.medium.com/max/640/1*UgIJ8H11QDxNmUPTc7cfZQ.webp)

All these transactions are publicly viewable hence you can use tools such as Etherscan to view and analyse transactions. For example, the transaction which I just sent can be found [here](https://goerli.etherscan.io/tx/0x274fec2143ec94037a6fce594285c52ea1711a73c9afc75ef2569b3dad1ad77b):

![Etherscan Transaction](https://miro.medium.com/max/720/1*HOsZ_B01nMlOoImNeclCHA.webp)

For NFTs, you can also view all the NFTs in the collection by using the [token tracker](https://goerli.etherscan.io/token/0x131060b1a88eebb934fd427c114acdc819c68d40) which can be accessed from the main contract [overview page](https://goerli.etherscan.io/address/0x131060b1a88eebb934fd427c114acdc819c68d40).

![Etherscan NFT Collection Overview](https://miro.medium.com/max/720/1*sQ5RMMP2vLL27QRKLGcMrQ.webp)

Congrats, you have successfully created your very own ERC721 NFT which links to an image stored on IPFS! Remember that if the image on IPFS changes by even a single pixel, the CID will also change hence nullifying the authenticity of the NFT. This framework is not limited to just image data and hence paves the way forward to decentralised ownership for any kind of data!
