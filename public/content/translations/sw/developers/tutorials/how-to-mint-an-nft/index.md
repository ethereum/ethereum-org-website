---
title: Jinsi ya Kufua NFT (Sehemu ya 2/3 ya Mfululizo wa Mafunzo ya NFT)
description: Mafunzo haya yanaelezea jinsi ya kufua NFT kwenye mnyororo wa vitalu wa Ethereum kwa kutumia mkataba wetu mahiri na Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "mikataba mahiri"]
skill: beginner
breadcrumb: Fua NFT
lang: sw
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): Dola Milioni 69
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): Dola Milioni 11
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): Dola Milioni 6

Wote walifua NFT zao kwa kutumia API yenye nguvu ya Alchemy. Katika mafunzo haya, tutakufundisha jinsi ya kufanya vivyo hivyo kwa chini ya dakika 10.

"Kufua NFT" ni kitendo cha kuchapisha mfano wa kipekee wa tokeni yako ya ERC-721 kwenye mnyororo wa vitalu. Kwa kutumia mkataba wetu mahiri kutoka [Sehemu ya 1 ya mfululizo huu wa mafunzo ya NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), hebu tuonyeshe ujuzi wetu wa Web3 na tufue NFT. Mwishoni mwa mafunzo haya, utaweza kufua NFT nyingi kadri moyo wako (na mkoba wako) unavyotaka!

Hebu tuanze!

## Hatua ya 1: Sakinisha Web3 {#install-web3}

Ikiwa ulifuata mafunzo ya kwanza kuhusu kuunda mkataba wako mahiri wa NFT, tayari una uzoefu wa kutumia Ethers.js. Web3 inafanana na Ethers, kwani ni maktaba inayotumika kurahisisha uundaji wa maombi kwenye mnyororo wa vitalu wa [Ethereum](/). Katika mafunzo haya tutatumia [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), ambayo ni maktaba iliyoboreshwa ya Web3 inayotoa majaribio ya kiotomatiki na usaidizi thabiti wa WebSocket.

Katika saraka ya mwanzo ya mradi wako endesha:

```
npm install @alch/alchemy-web3
```

## Hatua ya 2: Unda faili ya `mint-nft.js` {#create-mintnftjs}

Ndani ya saraka yako ya hati (scripts), unda faili ya `mint-nft.js` na uongeze mistari ifuatayo ya msimbo:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Hatua ya 3: Pata ABI ya mkataba wako

ABI (Application Binary Interface) ya mkataba wetu ni kiolesura cha kuingiliana na mkataba mahiri wetu. Unaweza kujifunza zaidi kuhusu [ABI za mkataba](/glossary/#abi). Hardhat inatutengenezea ABI kiotomatiki na kuihifadhi katika faili ya `MyNFT.json`. Ili kutumia hii tutahitaji kuchanganua yaliyomo kwa kuongeza mistari ifuatayo ya msimbo kwenye faili yetu ya `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Ikiwa unataka kuona ABI unaweza kuichapisha kwenye kiweko (console) chako:

```js
console.log(JSON.stringify(contract.abi))
```

Ili kuendesha `mint-nft.js` na kuona ABI yako ikichapishwa kwenye kiweko nenda kwenye kituo (terminal) chako na uendeshe:

```js
node scripts/mint-nft.js
```
## Hatua ya 4: Sanidi data fafanuzi kwa ajili ya NFT yako kwa kutumia IPFS {#config-meta}

Kama unakumbuka kutoka kwenye mafunzo yetu katika Sehemu ya 1, kipengele chetu cha mkataba mahiri cha `mintNFT` kinachukua kigezo cha tokenURI ambacho kinapaswa kutatua kwenye hati ya JSON inayoelezea data fafanuzi ya NFT— ambayo ndiyo hasa inayoipa NFT uhai, na kuiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha, na sifa nyinginezo.

> _Interplanetary File System (IPFS) ni itifaki iliyogatuliwa na mtandao wa rika-kwa-rika kwa ajili ya kuhifadhi na kushiriki data katika mfumo wa faili uliosambazwa._

Tutatumia Pinata, API na zana rahisi ya IPFS, kuhifadhi rasilimali yetu ya NFT na data fafanuzi ili kuhakikisha NFT yetu imegatuliwa kweli. Ikiwa huna akaunti ya Pinata, jisajili kwa akaunti ya bure [hapa](https://app.pinata.cloud) na ukamilishe hatua za kuthibitisha barua pepe yako.

Mara tu unapounda akaunti:

- Nenda kwenye ukurasa wa "Files" na ubofye kitufe cha bluu cha "Upload" kilicho juu kushoto mwa ukurasa.

- Pakia picha kwenye Pinata — hii itakuwa rasilimali ya picha kwa ajili ya NFT yako. Jisikie huru kuipa rasilimali hiyo jina lolote unalotaka

- Baada ya kupakia, utaona maelezo ya faili kwenye jedwali katika ukurasa wa "Files". Pia utaona safu wima ya CID. Unaweza kunakili CID kwa kubofya kitufe cha kunakili kilicho kando yake. Unaweza kutazama ulichopakia kwenye: `https://gateway.pinata.cloud/ipfs/<CID>`. Unaweza kupata picha tuliyotumia kwenye IPFS [hapa](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), kwa mfano.

Kwa wale wanaojifunza zaidi kwa kuona, hatua zilizo hapo juu zimefupishwa hapa:

![How to upload your image to Pinata](./instructionsPinata.gif)

Sasa, tutataka kupakia hati moja zaidi kwenye Pinata. Lakini kabla ya kufanya hivyo, tunahitaji kuiunda!

Katika saraka yako ya mzizi (root), tengeneza faili mpya inayoitwa `nft-metadata.json` na uongeze msimbo ufuatao wa json:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Jisikie huru kubadilisha data katika json. Unaweza kuondoa au kuongeza kwenye sehemu ya sifa (attributes). Muhimu zaidi, hakikisha sehemu ya picha inaelekeza kwenye eneo la picha yako ya IPFS — vinginevyo, NFT yako itajumuisha picha ya mbwa (mzuri sana!).

Ukimaliza kuhariri faili ya JSON, ihifadhi na uipakie kwenye Pinata, ukifuata hatua zilezile tulizofanya kwa kupakia picha.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Hatua ya 5: Unda mfano wa mkataba wako {#instance-contract}

Sasa, ili kuingiliana na mkataba wetu, tunahitaji kuunda mfano wake katika msimbo wetu. Ili kufanya hivyo tutahitaji anwani ya mkataba wetu ambayo tunaweza kuipata kutoka kwenye usambazaji au [Blockscout](https://eth-sepolia.blockscout.com/) kwa kutafuta anwani uliyotumia kusambaza mkataba.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Katika mfano ulio hapo juu, anwani ya mkataba wetu ni 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Kisha tutatumia [njia ya mkataba](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ya Web3 kuunda mkataba wetu kwa kutumia ABI na anwani. Katika faili yako ya `mint-nft.js`, ongeza yafuatayo:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Hatua ya 6: Sasisha faili ya `.env` {#update-env}

Sasa, ili kuunda na kutuma miamala kwenye mnyororo wa Ethereum, tutatumia anwani ya akaunti yako ya umma ya Ethereum kupata nonsi ya akaunti (tutaelezea hapa chini).

Ongeza ufunguo wa umma wako kwenye faili yako ya `.env` — ikiwa ulikamilisha sehemu ya 1 ya mafunzo, faili yetu ya `.env` sasa inapaswa kuonekana hivi:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Hatua ya 7: Unda muamala wako

Kwanza, hebu tufafanue kipengele kinachoitwa `mintNFT(tokenData)` na tuunde muamala wetu kwa kufanya yafuatayo:

1. Pata _PRIVATE_KEY_ na _PUBLIC_KEY_ yako kutoka kwenye faili ya `.env`.

1. Kisha, tutahitaji kutambua nonsi ya akaunti. Uainishaji wa nonsi unatumika kufuatilia idadi ya miamala iliyotumwa kutoka kwenye anwani yako — ambayo tunaihitaji kwa madhumuni ya usalama na kuzuia mashambulizi ya kurudia. Ili kupata idadi ya miamala iliyotumwa kutoka kwenye anwani yako, tunatumia [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).

1. Hatimaye tutaweka muamala wetu na maelezo yafuatayo:

- `'from': PUBLIC_KEY` — Asili ya muamala wetu ni anwani yetu ya umma

- `'to': contractAddress` — Mkataba tunaotaka kuingiliana nao na kutuma muamala

- `'nonce': nonce` — Nonsi ya akaunti yenye idadi ya miamala iliyotumwa kutoka kwenye anwani yetu

- `'gas': estimatedGas` — Gesi iliyokadiriwa inayohitajika kukamilisha muamala

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Ukokotoaji tunaotaka kufanya katika muamala huu — ambao katika kesi hii ni kufua NFT

Faili yako ya `mint-nft.js` inapaswa kuonekana hivi sasa:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //pata nonsi ya hivi karibuni

   //muamala
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## Hatua ya 8: Kusaini muamala {#sign-txn}

Sasa kwa kuwa tumeunda muamala wetu, tunahitaji kuusaini ili kuutuma. Hapa ndipo tutatumia ufunguo wa siri wetu.

`web3.eth.sendSignedTransaction` itatupa heshi ya muamala, ambayo tunaweza kuitumia kuhakikisha muamala wetu ulichimbwa na haukudondoshwa na mtandao. Utagundua katika sehemu ya kusaini muamala, tumeongeza ukaguzi wa makosa ili tujue ikiwa muamala wetu ulifanikiwa kupita.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pata nonsi ya hivi karibuni

  //muamala
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Hatua ya 9: Ita `mintNFT` na uendeshe nodi `mint-nft.js` {#call-mintnft-fn}

Unakumbuka `metadata.json` uliyopakia kwenye Pinata? Pata msimbo wake wa heshi (hashcode) kutoka Pinata na upitishe yafuatayo kama kigezo kwenye kipengele cha `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Hivi ndivyo jinsi ya kupata msimbo wa heshi:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Jinsi ya kupata msimbo wa heshi wa data fafanuzi ya nft yako kwenye Pinata_

> Hakikisha mara mbili kwamba msimbo wa heshi uliyonakili unaunganisha kwenye **metadata.json** yako kwa kupakia `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` kwenye dirisha tofauti. Ukurasa unapaswa kuonekana sawa na picha ya skrini iliyo hapa chini:

![Your page should display the json metadata](./metadataJSON.png)_Ukurasa wako unapaswa kuonyesha data fafanuzi ya json_

Kwa ujumla, msimbo wako unapaswa kuonekana kama hivi:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pata nonsi ya hivi karibuni

  //muamala
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Sasa, endesha `node scripts/mint-nft.js` ili kusambaza NFT yako. Baada ya sekunde chache, unapaswa kuona jibu kama hili kwenye kituo chako:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Kisha, tembelea [mempool ya Alchemy](https://dashboard.alchemy.com/mempool) yako ili kuona hali ya muamala wako (kama unasubiri, umechimbwa, au umedondoshwa na mtandao). Ikiwa muamala wako ulidondoshwa, inasaidia pia kuangalia [Blockscout](https://eth-sepolia.blockscout.com/) na kutafuta heshi ya muamala wako.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Tazama heshi ya muamala wako wa NFT kwenye Etherscan_

Na ndivyo hivyo! Sasa umesambaza NA kufua NFT kwenye mnyororo wa vitalu wa Ethereum <Emoji text=":money_mouth_face:" size={1} />

Kwa kutumia `mint-nft.js` unaweza kufua NFT nyingi kadri moyo wako (na mkoba wako) unavyotaka! Hakikisha tu unapitisha tokenURI mpya inayoelezea data fafanuzi ya NFT (vinginevyo, utaishia kutengeneza nyingi zinazofanana zenye vitambulisho tofauti).

Bila shaka, ungependa kuweza kuonyesha NFT yako kwenye mkoba wako — kwa hivyo hakikisha unaangalia [Sehemu ya 3: Jinsi ya Kutazama NFT Yako Kwenye Mkoba Wako](/developers/tutorials/how-to-view-nft-in-metamask/)!
