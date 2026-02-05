---
title: Jak vyrazit NFT (část 2/3 série tutoriálů o NFT)
description: Tento tutoriál popisuje, jak vyrazit NFT na blockchainu Etherea pomocí našeho chytrého kontraktu a Web3.
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "alchemy",
    "solidity",
    "smart kontrakt účty"
  ]
skill: beginner
lang: cs
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milionů
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milionů
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milionů

Všichni z nich vyrazili svá NFT pomocí výkonného API od Alchemy. V tomto tutoriálu vás naučíme, jak udělat to samé za \<10 minut.

„Ražba NFT“ je akt publikování jedinečné instance vašeho tokenu ERC-721 na blockchainu. Pomocí našeho chytrého kontraktu z [1. části této série tutoriálů o NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/) si procvičíme naše dovednosti s Web3 a vyrazíme si NFT. Na konci tohoto tutoriálu si budete moci vyrazit tolik NFT, kolik jen vaše srdce (a peněženka) bude chtít!

Pojďme na to!

## Krok 1: Nainstalujte si Web3 {#install-web3}

Pokud jste postupovali podle prvního tutoriálu o vytváření vašeho chytrého kontraktu pro NFT, máte již zkušenosti s používáním Ethers.js. Web3 je podobné Ethers, protože se jedná o knihovnu, která usnadňuje vytváření požadavků na blockchain Etherea. V tomto tutoriálu budeme používat [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), což je vylepšená knihovna Web3, která nabízí automatické opakování pokusů a robustní podporu WebSocket.

V domovském adresáři vašeho projektu spusťte:

```
npm install @alch/alchemy-web3
```

## Krok 2: Vytvořte soubor `mint-nft.js` {#create-mintnftjs}

V adresáři `scripts` vytvořte soubor `mint-nft.js` a přidejte následující řádky kódu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Krok 3: Získejte ABI svého kontraktu {#contract-abi}

Naše ABI kontraktu (Application Binary Interface) je rozhraní pro interakci s naším chytrým kontraktem. Více informací o ABI kontraktů se můžete dozvědět [zde](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat pro nás automaticky generuje ABI a ukládá ho do souboru `MyNFT.json`. Abychom to mohli použít, budeme muset analyzovat obsah přidáním následujících řádků kódu do našeho souboru `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Pokud chcete vidět ABI, můžete si ho vytisknout do konzole:

```js
console.log(JSON.stringify(contract.abi))
```

Chcete-li spustit `mint-nft.js` a vidět své ABI vytištěné v konzoli, přejděte do terminálu a spusťte:

```js
node scripts/mint-nft.js
```

## Krok 4: Nakonfigurujte metadata pro své NFT pomocí IPFS {#config-meta}

Pokud si pamatujete z našeho tutoriálu v části 1, naše funkce chytrého kontraktu `mintNFT` přijímá parametr tokenURI, který by se měl přeložit na dokument JSON popisující metadata NFT – což je to, co NFT skutečně oživuje a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy.

> _Interplanetary File System (IPFS) je decentralizovaný protokol a peer-to-peer síť pro ukládání a sdílení dat v distribuovaném souborovém systému._

Použijeme Pinata, pohodlné IPFS API a sadu nástrojů, k uložení našeho NFT aktiva a metadat, abychom zajistili, že naše NFT je skutečně decentralizované. Pokud nemáte účet Pinata, zaregistrujte si bezplatný účet [zde](https://app.pinata.cloud) a dokončete kroky pro ověření e-mailu.

Jakmile si vytvoříte účet:

- Přejděte na stránku „Soubory“ a klikněte na modré tlačítko „Nahrát“ v levém horním rohu stránky.

- Nahrajte obrázek do Pinaty – to bude obrazové aktivum pro vaše NFT. Aktivum si můžete pojmenovat, jak chcete

- Po nahrání uvidíte informace o souboru v tabulce na stránce „Soubory“. Uvidíte také sloupec CID. CID můžete zkopírovat kliknutím na tlačítko kopírovat vedle něj. Váš nahraný soubor si můžete prohlédnout na: `https://gateway.pinata.cloud/ipfs/<CID>`. Obrázek, který jsme použili, najdete na IPFS například [zde](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Pro vizuálněji založené studenty jsou výše uvedené kroky shrnuty zde:

![Jak nahrát obrázek do Pinaty](./instructionsPinata.gif)

Nyní budeme chtít nahrát do Pinaty ještě jeden dokument. Ale než to uděláme, musíme ho vytvořit!

Ve svém kořenovém adresáři vytvořte nový soubor s názvem `nft-metadata.json` a přidejte následující kód json:

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

Data v jsonu si můžete libovolně měnit. Do sekce atributů můžete přidávat nebo z ní odebírat. Nejdůležitější je, abyste se ujistili, že pole s obrázkem ukazuje na umístění vašeho obrázku na IPFS – jinak bude vaše NFT obsahovat fotku (velmi roztomilého!) psa.

Jakmile dokončíte úpravu souboru JSON, uložte ho a nahrajte na Pinata podle stejných kroků, jaké jsme provedli při nahrávání obrázku.

![Jak nahrát soubor nft-metadata.json do Pinaty](./uploadPinata.gif)

## Krok 5: Vytvořte instanci svého kontraktu {#instance-contract}

Nyní, abychom mohli s naším kontraktem interagovat, musíme v našem kódu vytvořit jeho instanci. K tomu budeme potřebovat účet našeho kontraktu, který můžeme získat z nasazení nebo na [Blockscoutu](https://eth-sepolia.blockscout.com/) vyhledáním adresy, kterou jste použili k nasazení kontraktu.

![Zobrazení účtu vašeho kontraktu na Etherscanu](./view-contract-etherscan.png)

Ve výše uvedeném příkladu je účet našeho kontraktu 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Dále použijeme metodu [kontraktu](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3 k vytvoření našeho kontraktu pomocí ABI a adresy. Do souboru `mint-nft.js` přidejte následující:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Krok 6: Aktualizujte soubor `.env` {#update-env}

Nyní, abychom mohli vytvářet a odesílat transakce do řetězce Etherea, použijeme adresu vašeho veřejného účtu Ethereum k získání nonce účtu (vysvětlíme níže).

Přidejte svůj veřejný klíč do souboru `.env` – pokud jste dokončili 1. část tutoriálu, náš soubor `.env` by nyní měl vypadat takto:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/váš-api-klíč"
PRIVATE_KEY = "adresa-vašeho-privátního-účtu"
PUBLIC_KEY = "adresa-vašeho-veřejného-účtu"
```

## Krok 7: Vytvořte transakci {#create-txn}

Nejprve definujme funkci s názvem `mintNFT(tokenData)` a vytvořme naši transakci následujícím postupem:

1. Získejte svůj _PRIVATE_KEY_ a _PUBLIC_KEY_ ze souboru `.env`.

2. Dále budeme muset zjistit nonce účtu. Specifikace nonce se používá ke sledování počtu transakcí odeslaných z vaší adresy – což potřebujeme z bezpečnostních důvodů a k zabránění [útokům opětovného přehrání](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). K získání počtu transakcí odeslaných z vaší adresy použijeme [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Nakonec nastavíme naši transakci s následujícími informacemi:

- `'from': PUBLIC_KEY` – Původ naší transakce je naše veřejná adresa

- `'to': contractAddress` – Kontrakt, se kterým chceme interagovat a odeslat transakci

- `'nonce': nonce` – Nonce účtu s počtem transakcí odeslaných z naší adresy

- `'gas': estimatedGas` – Odhadované palivo potřebné k dokončení transakce

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` – Výpočet, který chceme v této transakci provést – což je v tomto případě ražba NFT

Váš soubor `mint-nft.js` by nyní měl vypadat takto:

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

## Krok 8: Podepište transakci {#sign-txn}

Nyní, když jsme vytvořili naši transakci, musíme ji podepsat, abychom ji mohli odeslat. Zde použijeme náš privátní klíč.

`web3.eth.sendSignedTransaction` nám poskytne haš transakce, který můžeme použít k ujištění, že naše transakce byla vytěžena a nebyla sítí zahozená. Všimnete si, že v sekci podepisování transakcí jsme přidali kontrolu chyb, abychom věděli, zda naše transakce proběhla úspěšně.

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
              "Haš vaší transakce je: ",
              hash,
              "\nZkontrolujte Mempool Alchemy a zobrazte stav vaší transakce!"
            )
          } else {
            console.log(
              "Při odesílání transakce se něco pokazilo:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise selhal:", err)
    })
}
```

## Krok 9: Zavolejte `mintNFT` a spusťte node `mint-nft.js` {#call-mintnft-fn}

Pamatujete si na `metadata.json`, který jste nahráli do Pinaty? Získejte jeho hašovací kód z Pinaty a předejte následující jako parametr funkci `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Zde je návod, jak získat hašovací kód:

![Jak získat hašovací kód metadat vašeho NFT na Pinatě](./metadataPinata.gif)_Jak získat hašovací kód metadat vašeho NFT na Pinatě_

> Dvakrát zkontrolujte, že hašovací kód, který jste zkopírovali, odkazuje na váš **metadata.json** načtením `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` do samostatného okna. Stránka by měla vypadat podobně jako na snímku obrazovky níže:

![Vaše stránka by měla zobrazovat metadata json](./metadataJSON.png)_Vaše stránka by měla zobrazovat metadata json_

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
              "Haš vaší transakce je: ",
              hash,
              "\nZkontrolujte Mempool Alchemy a zobrazte stav vaší transakce!"
            )
          } else {
            console.log(
              "Při odesílání transakce se něco pokazilo:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise selhal:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Nyní spusťte `node scripts/mint-nft.js` pro nasazení vašeho NFT. Po několika sekundách byste měli v terminálu vidět odpověď podobnou této:

    ```
    Haš vaší transakce je: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Zkontrolujte Mempool Alchemy a zobrazte stav vaší transakce!
    ```

Dále navštivte svůj [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) a podívejte se na stav vaší transakce (zda je čekající, vytěžená, nebo ji síť zahodila). Pokud byla vaše transakce zahozená, je také užitečné zkontrolovat [Blockscout](https://eth-sepolia.blockscout.com/) a vyhledat haš vaší transakce.

![Zobrazení haše vaší NFT transakce na Etherscanu](./view-nft-etherscan.png)_Zobrazení haše vaší NFT transakce na Etherscanu_

A to je vše! Nyní jste nasadili A vyrazili NFT na blockchainu Etherea <Emoji text=":money_mouth_face:" size={1} />

Pomocí `mint-nft.js` můžete vyrazit tolik NFT, kolik jen vaše srdce (a peněženka) bude chtít! Jen se ujistěte, že předáváte nový tokenURI popisující metadata NFT (jinak skončíte výrobou spousty identických s různými ID).

Pravděpodobně byste si chtěli své NFT vystavit ve své peněžence – takže se určitě podívejte na [3. část: Jak si zobrazit své NFT ve vaší peněžence](/developers/tutorials/how-to-view-nft-in-metamask/)!
