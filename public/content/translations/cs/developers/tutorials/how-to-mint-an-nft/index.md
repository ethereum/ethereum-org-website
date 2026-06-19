---
title: "Jak razit NFT (Část 2/3 ze série tutoriálů o NFT)"
description: "Tento tutoriál popisuje, jak razit NFT na blockchainu Etherea pomocí našeho chytrého kontraktu a Web3."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "chytré kontrakty"]
skill: beginner
breadcrumb: "Ražení NFT"
lang: cs
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milionů dolarů
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milionů dolarů
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milionů dolarů

Všichni z nich razili svá NFT pomocí výkonného API od Alchemy. V tomto tutoriálu vás naučíme, jak udělat to samé za méně než 10 minut.

„Ražení NFT“ je proces publikování unikátní instance vašeho tokenu ERC-721 na blockchainu. Pomocí našeho chytrého kontraktu z [1. části této série tutoriálů o NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/) si procvičíme naše dovednosti s Web3 a vyrazíme NFT. Na konci tohoto tutoriálu budete schopni razit tolik NFT, kolik si jen vaše srdce (a peněženka) bude přát!

Pojďme na to!

## Krok 1: Instalace Web3 {#install-web3}

Pokud jste postupovali podle prvního tutoriálu o vytváření chytrého kontraktu pro NFT, už máte zkušenosti s používáním Ethers.js. Web3 je podobné jako Ethers, protože jde o knihovnu, která usnadňuje vytváření požadavků na blockchain [Etherea](/). V tomto tutoriálu budeme používat [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), což je vylepšená knihovna Web3, která nabízí automatické opakování a robustní podporu WebSocketů.

V domovském adresáři vašeho projektu spusťte:

```
npm install @alch/alchemy-web3
```

## Krok 2: Vytvoření souboru `mint-nft.js` {#create-mintnftjs}

Ve vašem adresáři scripts vytvořte soubor `mint-nft.js` a přidejte následující řádky kódu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Krok 3: Získání ABI vašeho kontraktu {#contract-abi}

ABI (Application Binary Interface) našeho kontraktu je rozhraní pro interakci s naším chytrým kontraktem. Více se o ABI kontraktů můžete dozvědět [zde](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat pro nás automaticky generuje ABI a ukládá ho do souboru `MyNFT.json`. Abychom ho mohli použít, budeme muset analyzovat jeho obsah přidáním následujících řádků kódu do našeho souboru `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Pokud chcete vidět ABI, můžete si ho vypsat do konzole:

```js
console.log(JSON.stringify(contract.abi))
```

Chcete-li spustit `mint-nft.js` a vidět vaše ABI vypsané v konzoli, přejděte do terminálu a spusťte:

```js
node scripts/mint-nft.js
```

## Krok 4: Konfigurace metadat pro vaše NFT pomocí IPFS {#config-meta}

Pokud si pamatujete z našeho tutoriálu v 1. části, funkce našeho chytrého kontraktu `mintNFT` přijímá parametr tokenURI, který by měl odkazovat na JSON dokument popisující metadata NFT – což je to, co NFT skutečně oživuje a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy.

> _Interplanetary File System (IPFS) je decentralizovaný protokol a peer-to-peer síť pro ukládání a sdílení dat v distribuovaném souborovém systému._

K uložení našeho NFT aktiva a metadat použijeme Pinata, pohodlné IPFS API a sadu nástrojů, abychom zajistili, že naše NFT bude skutečně decentralizované. Pokud nemáte účet na Pinata, zaregistrujte si bezplatný účet [zde](https://app.pinata.cloud) a dokončete kroky k ověření vašeho e-mailu.

Jakmile si vytvoříte účet:

- Přejděte na stránku „Files“ a klikněte na modré tlačítko „Upload“ v levém horním rohu stránky.

- Nahrajte obrázek na Pinata – to bude obrazové aktivum pro vaše NFT. Aktivum si můžete pojmenovat, jak chcete.

- Po nahrání uvidíte informace o souboru v tabulce na stránce „Files“. Uvidíte také sloupec CID. CID můžete zkopírovat kliknutím na tlačítko kopírování vedle něj. Své nahrané soubory si můžete prohlédnout na adrese: `https://gateway.pinata.cloud/ipfs/<CID>`. Obrázek, který jsme použili na IPFS, najdete například [zde](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Pro ty, kteří se učí spíše vizuálně, jsou výše uvedené kroky shrnuty zde:

![How to upload your image to Pinata](./instructionsPinata.gif)

Nyní budeme chtít na Pinata nahrát ještě jeden dokument. Ale než to uděláme, musíme ho vytvořit!

V kořenovém adresáři vytvořte nový soubor s názvem `nft-metadata.json` a přidejte následující kód ve formátu JSON:

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

Data v JSON souboru můžete libovolně měnit. Můžete odebírat nebo přidávat položky do sekce atributů. Nejdůležitější je ujistit se, že pole image ukazuje na umístění vašeho obrázku na IPFS – jinak bude vaše NFT obsahovat fotku (velmi roztomilého!) psa.

Jakmile dokončíte úpravy JSON souboru, uložte jej a nahrajte na Pinata podle stejných kroků, které jsme provedli při nahrávání obrázku.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Krok 5: Vytvoření instance vašeho kontraktu {#instance-contract}

Nyní, abychom mohli interagovat s naším kontraktem, musíme v našem kódu vytvořit jeho instanci. K tomu budeme potřebovat adresu našeho kontraktu, kterou můžeme získat z nasazení nebo z [Blockscout](https://eth-sepolia.blockscout.com/) vyhledáním adresy, kterou jste použili k nasazení kontraktu.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Ve výše uvedeném příkladu je adresa našeho kontraktu 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Dále použijeme [metodu contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) z Web3 k vytvoření našeho kontraktu pomocí ABI a adresy. Do souboru `mint-nft.js` přidejte následující:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Krok 6: Aktualizace souboru `.env` {#update-env}

Nyní, abychom mohli vytvářet a odesílat transakce do řetězce Etherea, použijeme adresu vašeho veřejného účtu na Ethereu k získání nonce účtu (vysvětlíme níže).

Přidejte svůj veřejný klíč do souboru `.env` – pokud jste dokončili 1. část tutoriálu, náš soubor `.env` by měl nyní vypadat takto:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Krok 7: Vytvoření vaší transakce {#create-txn}

Nejprve definujme funkci s názvem `mintNFT(tokenData)` a vytvořme naši transakci provedením následujícího:

1. Získejte svůj _PRIVATE_KEY_ a _PUBLIC_KEY_ ze souboru `.env`.

1. Dále budeme muset zjistit nonce účtu. Specifikace nonce se používá ke sledování počtu transakcí odeslaných z vaší adresy – což potřebujeme z bezpečnostních důvodů a k zabránění [útokům typu replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). K získání počtu transakcí odeslaných z vaší adresy použijeme [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Nakonec nastavíme naši transakci s následujícími informacemi:

- `'from': PUBLIC_KEY` — Původem naší transakce je naše veřejná adresa

- `'to': contractAddress` — Kontrakt, se kterým chceme interagovat a odeslat mu transakci

- `'nonce': nonce` — Nonce účtu s počtem transakcí odeslaných z naší adresy

- `'gas': estimatedGas` — Odhadovaný gas potřebný k dokončení transakce

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Výpočet, který chceme v této transakci provést – což je v tomto případě ražení NFT

Váš soubor `mint-nft.js` by měl nyní vypadat takto:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //získat nejnovější nonce

   //transakce
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Krok 8: Podepsání transakce {#sign-txn}

Nyní, když jsme vytvořili naši transakci, musíme ji podepsat, abychom ji mohli odeslat. Zde použijeme náš soukromý klíč.

`web3.eth.sendSignedTransaction` nám poskytne hash transakce, který můžeme použít k ověření, že naše transakce byla vytěžena a nebyla sítí zahozena. Všimnete si, že v sekci podepisování transakce jsme přidali kontrolu chyb, abychom věděli, zda naše transakce úspěšně prošla.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //získat nejnovější nonce

  //transakce
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

## Krok 9: Zavolání `mintNFT` a spuštění node `mint-nft.js` {#call-mintnft-fn}

Pamatujete si na `metadata.json`, který jste nahráli na Pinata? Získejte jeho hash kód z Pinata a předejte následující jako parametr funkci `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Zde je návod, jak získat hash kód:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Jak získat hash kód metadat vašeho NFT na Pinata_

> Dvakrát zkontrolujte, že zkopírovaný hash kód odkazuje na váš **metadata.json** načtením `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` do samostatného okna. Stránka by měla vypadat podobně jako na snímku obrazovky níže:

![Your page should display the json metadata](./metadataJSON.png)_Vaše stránka by měla zobrazovat metadata ve formátu JSON_

Celkově by váš kód měl vypadat nějak takto:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //získat nejnovější nonce

  //transakce
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

Nyní spusťte `node scripts/mint-nft.js` pro nasazení vašeho NFT. Po několika sekundách byste měli ve svém terminálu vidět podobnou odpověď:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Dále navštivte svůj [mempool na Alchemy](https://dashboard.alchemyapi.io/mempool), abyste viděli stav vaší transakce (zda čeká na vyřízení, byla vytěžena, nebo byla sítí zahozena). Pokud byla vaše transakce zahozena, je také užitečné zkontrolovat [Blockscout](https://eth-sepolia.blockscout.com/) a vyhledat hash vaší transakce.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Zobrazení hashe vaší transakce NFT na Etherscan_

A to je vše! Nyní jste nasadili A vyrazili NFT na blockchainu Etherea <Emoji text=":money_mouth_face:" size={1} />

Pomocí `mint-nft.js` můžete razit tolik NFT, kolik si jen vaše srdce (a peněženka) bude přát! Jen se ujistěte, že předáváte nové tokenURI popisující metadata NFT (jinak prostě vytvoříte spoustu identických s různými ID).

Pravděpodobně byste se chtěli svým NFT pochlubit ve své peněžence – takže se určitě podívejte na [Část 3: Jak si zobrazit NFT ve vaší peněžence](/developers/tutorials/how-to-view-nft-in-metamask/)!