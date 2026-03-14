---
title: Jinsi ya Kutengeneza NFT (Sehemu ya 2/3 ya Mfululizo wa Mafunzo ya NFT)
description: Mafunzo haya yanaelezea jinsi ya kutengeneza NFT kwenye mnyororo wa bloku wa Ethereum kwa kutumia mkataba-erevu wetu na Web3.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "uimara", "mikataba erevu" ]
skill: beginner
lang: sw
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): Dola Milioni 69
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): Dola Milioni 11
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): Dola Milioni 6

Wote walitengeneza NFT zao kwa kutumia API yenye nguvu ya Alchemy. Katika mafunzo haya, tutakufundisha jinsi ya kufanya vivyo hivyo kwa chini ya dakika 10.

“Kutengeneza NFT” ni kitendo cha kuchapisha tokeni ya kipekee ya ERC-721 kwenye mnyororo wa bloku. Kwa kutumia mkataba-erevu wetu kutoka [Sehemu ya 1 ya mfululizo huu wa mafunzo ya NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), hebu tuonyeshe ujuzi wetu wa Web3 na tutengeneze NFT. Mwishoni mwa mafunzo haya, utaweza kutengeneza NFT nyingi kadri moyo wako (na mkoba) unavyotamani!

Tuanze!

## Hatua ya 1: Sakinisha Web3 {#install-web3}

Ikiwa ulifuata mafunzo ya kwanza kuhusu kuunda mkataba-erevu wako wa NFT, tayari una uzoefu wa kutumia Ethers.js. Web3 inafanana na Ethers, kwani ni maktaba inayotumika kurahisisha kuunda maombi kwenye mnyororo wa bloku wa Ethereum. Katika mafunzo haya tutakuwa tunatumia [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), ambayo ni maktaba ya Web3 iliyoboreshwa inayotoa majaribio ya kurudia kiotomatiki na usaidizi thabiti wa WebSocket.

Katika saraka kuu ya mradi wako, endesha:

```
npm install @alch/alchemy-web3
```

## Hatua ya 2: Tengeneza faili la `mint-nft.js` {#create-mintnftjs}

Ndani ya saraka yako ya maandishi, tengeneza faili la `mint-nft.js` na uongeze mistari ifuatayo ya msimbo:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Hatua ya 3: Pata ABI ya mkataba wako {#contract-abi}

ABI ya mkataba wetu (Kiolesura cha Mfumo wa Nambari) ni kiolesura cha kuingiliana na mkataba-erevu wetu. Unaweza kujifunza zaidi kuhusu ABI za Mkataba [hapa](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat hutengeneza ABI kiotomatiki na kuihifadhi katika faili la `MyNFT.json`. Ili kutumia hili, tutahitaji kuchanganua yaliyomo kwa kuongeza mistari ifuatayo ya msimbo kwenye faili letu la `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Ikiwa unataka kuona ABI unaweza kuichapisha kwenye koni yako:

```js
console.log(JSON.stringify(contract.abi))
```

Ili kuendesha `mint-nft.js` na kuona ABI yako ikichapishwa kwenye koni, nenda kwenye terminal yako na uendeshe:

```js
node scripts/mint-nft.js
```

## Hatua ya 4: Sanidi metadata ya NFT yako kwa kutumia IPFS {#config-meta}

Ikiwa unakumbuka kutoka kwa mafunzo yetu katika Sehemu ya 1, chaguo la kukokotoa la mkataba-erevu wa `mintNFT` huchukua kigezo cha tokenURI ambacho kinapaswa kutatua kwa hati ya JSON inayoelezea metadata ya NFT— ambayo ndiyo huleta uhai kwa NFT, na kuiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha na sifa nyingine.

> _Mfumo wa Faili baina ya Sayari (IPFS) ni itifaki iliyogatuliwa na mtandao wa rika-kwa-rika wa kuhifadhi na kushiriki data katika mfumo wa faili uliosambazwa._

Tutatumia Pinata, API na zana rahisi ya IPFS, kuhifadhi mali na metadata ya NFT yetu ili kuhakikisha kuwa NFT yetu imegatuliwa kikweli. Ikiwa huna akaunti ya Pinata, jisajili kwa akaunti ya bure [hapa](https://app.pinata.cloud) na ukamilishe hatua za kuthibitisha barua pepe yako.

Mara tu unapomaliza kuunda akaunti:

- Nenda kwenye ukurasa wa "Faili" na ubofye kitufe cha buluu cha "Pakia" kilicho juu kushoto mwa ukurasa.

- Pakia picha kwenye Pinata - hii itakuwa mali ya picha kwa NFT yako. Jisikie huru kuiita mali jina lolote unalotaka

- Baada ya kupakia, utaona maelezo ya faili katika jedwali kwenye ukurasa wa "Faili". Pia utaona safu ya CID. Unaweza kunakili CID kwa kubofya kitufe cha kunakili kilicho karibu nayo. Unaweza kutazama upakiaji wako kwenye: `https://gateway.pinata.cloud/ipfs/<CID>`. Unaweza kupata picha tuliyotumia kwenye IPFS [hapa](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), kwa mfano.

Kwa wanafunzi wanaoonekana zaidi, hatua zilizo hapo juu zimefupishwa hapa:

![Jinsi ya kupakia picha yako kwenye Pinata](./instructionsPinata.gif)

Sasa, tutataka kupakia hati moja zaidi kwenye Pinata. Lakini kabla ya kufanya hivyo, tunahitaji kuiunda!

Katika saraka yako kuu, tengeneza faili jipya liitwalo `nft-metadata.json` na uongeze msimbo ufuatao wa json:

```json
{
  "attributes": [
    {
      "trait_type": "Aina",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Rangi ya macho",
      "value": "Mocha"
    }
  ],
  "description": "Mtoto wa mbwa anayevutia na nyeti zaidi ulimwenguni.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Jisikie huru kubadilisha data kwenye json. Unaweza kuondoa au kuongeza kwenye sehemu ya sifa. Muhimu zaidi, hakikisha sehemu ya picha inaelekeza kwenye eneo la picha yako ya IPFS - vinginevyo, NFT yako itajumuisha picha ya (mrembo sana!) mbwa.

Ukishamaliza kuhariri faili la JSON, lihifadhi na ulipakie kwenye Pinata, ukifuata hatua zilezile tulizofanya kupakia picha.

![Jinsi ya kupakia nft-metadata.json yako kwenye Pinata](./uploadPinata.gif)

## Hatua ya 5: Unda kielelezo cha mkataba wako {#instance-contract}

Sasa, ili kuingiliana na mkataba wetu, tunahitaji kuunda mfano wake katika msimbo wetu. Ili kufanya hivyo tutahitaji anwani yetu ya mkataba ambayo tunaweza kuipata kutoka kwa usambazaji au [Blockscout](https://eth-sepolia.blockscout.com/) kwa kuangalia anwani uliyotumia kupeleka mkataba.

![Tazama anwani yako ya mkataba kwenye Etherscan](./view-contract-etherscan.png)

Katika mfano ulio hapo juu, anwani ya mkataba wetu ni 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Ifuatayo tutatumia [mbinu ya mkataba](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ya Web3 kuunda mkataba wetu kwa kutumia ABI na anwani. Katika faili lako la `mint-nft.js`, ongeza yafuatayo:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Hatua ya 6: Sasisha faili la `.env` {#update-env}

Sasa, ili kuunda na kutuma miamala kwenye mnyororo wa Ethereum, tutatumia anwani ya akaunti yako ya umma ya Ethereum kupata nonce ya akaunti (tutaelezea hapo chini).

Ongeza ufunguo wako wa umma kwenye faili lako la `.env` - ikiwa ulikamilisha sehemu ya 1 ya mafunzo, faili letu la `.env` linapaswa kuonekana hivi sasa:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Hatua ya 7: Tengeneza muamala wako {#create-txn}

Kwanza, hebu tufafanue chaguo la kukokotoa liitwalo `mintNFT(tokenData)` na tutengeneze muamala wetu kwa kufanya yafuatayo:

1. Pata _PRIVATE_KEY_ na _PUBLIC_KEY_ yako kutoka kwenye faili la `.env`.

2. Ifuatayo, tutahitaji kufahamu nonce ya akaunti. Vipimo vya Nonce hutumiwa kufuatilia idadi ya miamala iliyotumwa kutoka kwa anwani yako - ambayo tunahitaji kwa madhumuni ya usalama na kuzuia [mashambulizi ya kurudia](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Ili kupata idadi ya miamala iliyotumwa kutoka kwa anwani yako, tunatumia [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Mwishowe tutaweka muamala wetu na maelezo yafuatayo:

- `'from': PUBLIC_KEY` — Asili ya muamala wetu ni anwani yetu ya umma

- `'to': contractAddress` — Mkataba tunaotaka kuingiliana nao na kutuma muamala

- `'nonce': nonce` — Nonce ya akaunti na idadi ya miamala iliyotumwa kutoka kwa anwani yetu

- `'gas': estimatedGas` — Gesi inayokadiriwa inayohitajika kukamilisha muamala

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Kukokotoa tunayotaka kufanya katika muamala huu - ambayo katika hali hii ni kutengeneza NFT

Faili lako la `mint-nft.js` linapaswa kuonekana hivi sasa:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //pata nonce ya hivi karibuni

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

## Hatua ya 8: Saini muamala {#sign-txn}

Sasa kwa kuwa tumeunda muamala wetu, tunahitaji kuusaini ili kuutuma. Hapa ndipo tutatumia ufunguo wetu binafsi.

`web3.eth.sendSignedTransaction` itatupatia hashi ya muamala, ambayo tunaweza kutumia kuhakikisha muamala wetu umechimbwa na haukuachwa na mtandao. Utagundua katika sehemu ya kusaini muamala, tumeongeza ukaguzi wa hitilafu ili tujue ikiwa muamala wetu umefaulu.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pata nonce ya hivi karibuni

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
              "Hashi ya muamala wako ni: ",
              hash,
              "\nAngalia Mempool ya Alchemy kutazama hali ya muamala wako!"
            )
          } else {
            console.log(
              "Kuna kitu kilienda vibaya wakati wa kuwasilisha muamala wako:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Ahadi imeshindwa:", err)
    })
}
```

## Hatua ya 9: Ita `mintNFT` na endesha node `mint-nft.js` {#call-mintnft-fn}

Unakumbuka `metadata.json` uliyopakia kwenye Pinata? Pata msimbo wake wa hashi kutoka Pinata na upitishe yafuatayo kama kigezo kwa chaguo la kukokotoa `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Hivi ndivyo jinsi ya kupata msimbo wa hashi:

![Jinsi ya kupata msimbo wa hashi wa metadata ya nft yako kwenye Pinata](./metadataPinata.gif)_Jinsi ya kupata msimbo wa hashi wa metadata ya nft yako kwenye Pinata_

> Hakikisha mara mbili kwamba msimbo wa hashi ulionakili unaunganisha kwenye **metadata.json** yako kwa kupakia `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` kwenye dirisha tofauti. Ukurasa unapaswa kuonekana sawa na picha ya skrini hapa chini:

![Ukurasa wako unapaswa kuonyesha metadata ya json](./metadataJSON.png)_Ukurasa wako unapaswa kuonyesha metadata ya json_

Kwa pamoja, msimbo wako unapaswa kuonekana kama hivi:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pata nonce ya hivi karibuni

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
              "Hashi ya muamala wako ni: ",
              hash,
              "\nAngalia Mempool ya Alchemy kutazama hali ya muamala wako!"
            )
          } else {
            console.log(
              "Kuna kitu kilienda vibaya wakati wa kuwasilisha muamala wako:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Ahadi imeshindwa:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Sasa, endesha `node scripts/mint-nft.js` ili kupeleka NFT yako. Baada ya sekunde chache, unapaswa kuona jibu kama hili kwenye terminal yako:

    ```
    Hashi ya muamala wako ni: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Angalia Mempool ya Alchemy kutazama hali ya muamala wako!
    ```

Ifuatayo, tembelea [Mempool yako ya Alchemy](https://dashboard.alchemyapi.io/mempool) ili kuona hali ya muamala wako (kama unasubiri, umechimbwa, au umeshuka na mtandao). Ikiwa muamala wako umeshuka, inasaidia pia kuangalia [Blockscout](https://eth-sepolia.blockscout.com/) na utafute hashi ya muamala wako.

![Tazama hashi ya muamala wako wa NFT kwenye Etherscan](./view-nft-etherscan.png)_Tazama hashi ya muamala wako wa NFT kwenye Etherscan_

Na ndivyo hivyo! Sasa umeshapeleka NA kutengeneza NFT kwenye mnyororo wa bloku wa Ethereum <Emoji text=":money_mouth_face:" size={1} />

Kwa kutumia `mint-nft.js` unaweza kutengeneza NFT nyingi kadri moyo wako (na mkoba) unavyotamani! Hakikisha tu unapitia tokenURI mpya inayoelezea metadata ya NFT (vinginevyo, utaishia kutengeneza rundo la zinazofanana na vitambulisho tofauti).

Bila shaka, ungependa kuonyesha NFT yako kwenye mkoba wako - kwa hivyo hakikisha unaangalia [Sehemu ya 3: Jinsi ya Kuona NFT Yako Kwenye Mkoba wako](/developers/tutorials/how-to-view-nft-in-metamask/)!
