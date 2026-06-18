---
title: Jak napsat a nasadit NFT (Část 1/3 ze série tutoriálů o NFT)
description: Tento tutoriál je 1. částí série o NFT, která vás krok za krokem provede tím, jak napsat a nasadit chytrý kontrakt pro nezaměnitelný token (token ERC-721) pomocí Etherea a Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "chytré kontrakty"]
skill: beginner
breadcrumb: Napsání a nasazení NFT
lang: cs
published: 2021-04-22
---

Vzhledem k tomu, že NFT dostávají blockchain do povědomí veřejnosti, je nyní vynikající příležitost pochopit tento humbuk na vlastní kůži tím, že publikujete svůj vlastní NFT kontrakt (token ERC-721) na blockchainu Ethereum!

Alchemy je nesmírně hrdá na to, že pohání ta největší jména v prostoru NFT, včetně Makersplace (nedávno stanovili rekordní prodej digitálního uměleckého díla v Christie’s za 69 milionů dolarů), Dapper Labs (tvůrci NBA Top Shot a Crypto Kitties), OpenSea (největší světové tržiště s NFT), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable a dalších.

V tomto tutoriálu si projdeme vytvoření a nasazení chytrého kontraktu ERC-721 na testnetu Sepolia pomocí [MetaMasku](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhatu](https://hardhat.org/), [Pinaty](https://pinata.cloud/) a [Alchemy](https://alchemy.com/signup/eth) (nebojte se, pokud ještě nerozumíte tomu, co to všechno znamená – vysvětlíme si to!).

Ve 2. části tohoto tutoriálu si projdeme, jak můžeme náš chytrý kontrakt použít k ražení NFT, a ve 3. části si vysvětlíme, jak si své NFT zobrazit v MetaMasku.

A samozřejmě, pokud budete mít kdykoli nějaké dotazy, neváhejte se ozvat na [Discordu Alchemy](https://discord.gg/gWuC7zB) nebo navštivte [dokumentaci k NFT API od Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Krok 1: Připojení k síti Ethereum {#connect-to-ethereum}

Existuje spousta způsobů, jak zadávat požadavky na blockchain Ethereum, ale abychom si to usnadnili, použijeme bezplatný účet na [Alchemy](https://alchemy.com/signup/eth), vývojářské platformě a API pro blockchain, která nám umožňuje komunikovat s řetězcem Ethereum, aniž bychom museli provozovat vlastní uzly.

V tomto tutoriálu také využijeme vývojářské nástroje Alchemy pro monitorování a analytiku, abychom pochopili, co se děje pod pokličkou při nasazení našeho chytrého kontraktu. Pokud ještě nemáte účet na Alchemy, můžete se zdarma zaregistrovat [zde](https://alchemy.com/signup/eth).

## Krok 2: Vytvoření aplikace (a API klíče) {#make-api-key}

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat API klíč vytvořením aplikace. To nám umožní zadávat požadavky na testnet Sepolia. Pokud se chcete o testnetech dozvědět více, podívejte se na [tento průvodce](https://docs.alchemyapi.io/guides/choosing-a-network).

1. Přejděte na stránku „Create App“ (Vytvořit aplikaci) na svém panelu Alchemy tak, že najedete myší na „Apps“ (Aplikace) v navigačním panelu a kliknete na „Create App“.

![Create your app](./create-your-app.png)

2. Pojmenujte svou aplikaci (my jsme zvolili „My First NFT!“), přidejte krátký popis, jako Chain (Řetězec) vyberte „Ethereum“ a jako síť zvolte „Sepolia“. Od Merge byly ostatní testnety ukončeny.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Klikněte na „Create app“ a je to! Vaše aplikace by se měla objevit v tabulce níže.

## Krok 3: Vytvoření účtu (adresy) na Ethereu {#create-eth-address}

K odesílání a přijímání transakcí potřebujeme účet na Ethereu. Pro tento tutoriál použijeme MetaMask, virtuální peněženku v prohlížeči, která se používá ke správě adresy vašeho účtu na Ethereu. Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/) od Nadace Ethereum.

Účet na MetaMasku si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste vpravo nahoře přepnuli na „Sepolia Test Network“ (abychom nepracovali se skutečnými penězi).

![Set Sepolia as your network](./metamask-goerli.png)

## Krok 4: Přidání etheru z faucetu {#step-4-add-ether-from-a-faucet}

Abychom mohli nasadit náš chytrý kontrakt na testnet, budeme potřebovat nějaké falešné ETH. Chcete-li získat ETH, můžete přejít na [faucet Sepolia](https://sepoliafaucet.com/) hostovaný společností Alchemy, přihlásit se, zadat adresu svého účtu a kliknout na „Send Me ETH“ (Pošlete mi ETH). Brzy poté byste měli vidět ETH na svém účtu v MetaMasku!

## Krok 5: Kontrola zůstatku {#check-balance}

Abychom si ověřili, že tam náš zůstatek je, vytvořme požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje composer od Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ten nám vrátí množství ETH v naší peněžence. Po zadání adresy vašeho účtu v MetaMasku a kliknutí na „Send Request“ (Odeslat požadavek) byste měli vidět podobnou odpověď:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Poznámka** Tento výsledek je ve Wei, nikoli v ETH. Wei se používá jako nejmenší nominální hodnota etheru. Převod z Wei na ETH je 1 eth = 10<sup>18</sup> Wei. Pokud tedy převedeme 0xde0b6b3a7640000 do desítkové soustavy, dostaneme 1\*10<sup>18</sup> Wei, což se rovná 1 ETH.

Uf! Naše falešné peníze jsou všechny tam.

## Krok 6: Inicializace našeho projektu {#initialize-project}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte do příkazového řádku a zadejte:

    mkdir my-nft
    cd my-nft

Nyní, když jsme ve složce našeho projektu, použijeme npm init k inicializaci projektu. Pokud ještě nemáte nainstalované npm, postupujte podle [těchto pokynů](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (budeme také potřebovat [Node.js](https://nodejs.org/en/download/), takže si ho stáhněte také!).

    npm init

Nezáleží na tom, jak odpovíte na instalační otázky; zde je pro referenci ukázka, jak jsme to udělali my:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Schvalte soubor package.json a můžeme jít na to!

## Krok 7: Instalace [Hardhatu](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním vytváření chytrých kontraktů a decentralizovaných aplikací (dapp) před jejich nasazením do živého řetězce.

Uvnitř našeho projektu my-nft spusťte:

    npm install --save-dev hardhat

Další podrobnosti o [pokynech k instalaci](https://hardhat.org/getting-started/#overview) najdete na této stránce.

## Krok 8: Vytvoření projektu v Hardhatu {#create-hardhat-project}

Uvnitř složky našeho projektu spusťte:

    npx hardhat

Poté byste měli vidět uvítací zprávu a možnost vybrat si, co chcete udělat. Vyberte „create an empty hardhat.config.js“:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Tím se nám vygeneruje soubor hardhat.config.js, ve kterém specifikujeme veškeré nastavení pro náš projekt (v kroku 13).

## Krok 9: Přidání složek projektu {#add-project-folders}

Abychom udrželi náš projekt organizovaný, vytvoříme dvě nové složky. Přejděte do kořenového adresáře vašeho projektu v příkazovém řádku a zadejte:

    mkdir contracts
    mkdir scripts

- contracts/ je místo, kde budeme uchovávat kód našeho chytrého kontraktu pro NFT

- scripts/ je místo, kde budeme uchovávat skripty pro nasazení a interakci s naším chytrým kontraktem

## Krok 10: Napsání našeho kontraktu {#write-contract}

Nyní, když je naše prostředí nastaveno, přejdeme k zajímavějším věcem: _psaní kódu našeho chytrého kontraktu!_

Otevřete projekt my-nft ve svém oblíbeném editoru (my máme rádi [VSCode](https://code.visualstudio.com/)). Chytré kontrakty se píší v jazyce zvaném Solidity, který použijeme k napsání našeho chytrého kontraktu MyNFT.sol.‌

1. Přejděte do složky `contracts` a vytvořte nový soubor s názvem MyNFT.sol

2. Níže je kód našeho chytrého kontraktu pro NFT, který jsme založili na implementaci ERC-721 z knihovny [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Zkopírujte a vložte níže uvedený obsah do svého souboru MyNFT.sol.

   ```solidity
   //Kontrakt založený na [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Protože dědíme třídy z knihovny kontraktů OpenZeppelin, spusťte ve svém příkazovém řádku `npm install @openzeppelin/contracts^4.0.0`, abyste knihovnu nainstalovali do naší složky.

Takže, co tento kód přesně _dělá_? Pojďme si to rozebrat řádek po řádku.

Na začátku našeho chytrého kontraktu importujeme tři třídy chytrých kontraktů z [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol obsahuje implementaci standardu ERC-721, kterou náš chytrý kontrakt pro NFT zdědí. (Aby byl váš chytrý kontrakt platným NFT, musí implementovat všechny metody standardu ERC-721.) Chcete-li se dozvědět více o zděděných funkcích ERC-721, podívejte se na definici rozhraní [zde](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol poskytuje počítadla, která lze pouze inkrementovat nebo dekrementovat o jedničku. Náš chytrý kontrakt používá počítadlo ke sledování celkového počtu vyražených NFT a k nastavení jedinečného ID pro naše nové NFT. (Každému NFT vyraženému pomocí chytrého kontraktu musí být přiřazeno jedinečné ID – zde je naše jedinečné ID určeno jednoduše celkovým počtem existujících NFT. Například první NFT, které vyrazíme naším chytrým kontraktem, má ID „1“, naše druhé NFT má ID „2“ atd.)

- @openzeppelin/contracts/access/Ownable.sol nastavuje [řízení přístupu](https://docs.openzeppelin.com/contracts/3.x/access-control) k našemu chytrému kontraktu, takže NFT může razit pouze vlastník chytrého kontraktu (vy). (Poznámka: zahrnutí řízení přístupu je čistě na vašich preferencích. Pokud byste chtěli, aby kdokoli mohl razit NFT pomocí vašeho chytrého kontraktu, odstraňte slovo Ownable na řádku 10 a onlyOwner na řádku 17.)

Po našich příkazech importu následuje náš vlastní chytrý kontrakt pro NFT, který je překvapivě krátký – obsahuje pouze počítadlo, konstruktor a jedinou funkci! Je to díky našim zděděným kontraktům z OpenZeppelin, které implementují většinu metod, které potřebujeme k vytvoření NFT, jako je `ownerOf`, která vrací vlastníka NFT, a `transferFrom`, která převádí vlastnictví NFT z jednoho účtu na druhý.

V našem konstruktoru ERC-721 si všimnete, že předáváme 2 řetězce, „MyNFT“ a „NFT“. První proměnná je název chytrého kontraktu a druhá je jeho symbol. Každou z těchto proměnných si můžete pojmenovat, jak chcete!

Nakonec tu máme naši funkci `mintNFT(address recipient, string memory tokenURI)`, která nám umožňuje razit NFT! Všimnete si, že tato funkce přijímá dvě proměnné:

- `address recipient` specifikuje adresu, která obdrží vaše čerstvě vyražené NFT

- `string memory tokenURI` je řetězec, který by měl odkazovat na dokument JSON popisující metadata NFT. Metadata NFT jsou tím, co mu skutečně vdechuje život a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy. Ve 2. části tohoto tutoriálu popíšeme, jak tato metadata nakonfigurovat.

`mintNFT` volá některé metody ze zděděné knihovny ERC-721 a nakonec vrací číslo, které představuje ID čerstvě vyraženého NFT.

## Krok 11: Připojení MetaMasku a Alchemy k vašemu projektu {#connect-metamask-and-alchemy}

Nyní, když jsme si vytvořili peněženku MetaMask, účet na Alchemy a napsali náš chytrý kontrakt, je čas tyto tři věci propojit.

Každá transakce odeslaná z vaší virtuální peněženky vyžaduje podpis pomocí vašeho jedinečného soukromého klíče. Abychom našemu programu toto oprávnění poskytli, můžeme náš soukromý klíč (a API klíč Alchemy) bezpečně uložit do souboru prostředí.

Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [tento tutoriál](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) o odesílání transakcí pomocí Web3.

Nejprve nainstalujte balíček dotenv v adresáři vašeho projektu:

    npm install dotenv --save

Poté vytvořte soubor `.env` v kořenovém adresáři našeho projektu a přidejte do něj svůj soukromý klíč z MetaMasku a HTTP URL pro API Alchemy.

- Postupujte podle [těchto pokynů](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pro export vašeho soukromého klíče z MetaMasku

- Níže se podívejte, jak získat HTTP URL pro API Alchemy, a zkopírujte si ho do schránky

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Váš soubor `.env` by nyní měl vypadat takto:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Abychom je skutečně propojili s naším kódem, odkážeme se na tyto proměnné v našem souboru hardhat.config.js v kroku 13.

<EnvWarningBanner />

## Krok 12: Instalace Ethers.js {#install-ethers}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](/developers/docs/apis/json-rpc/) uživatelsky přívětivějšími metodami.

Hardhat velmi usnadňuje integraci [pluginů](https://hardhat.org/plugins/) pro další nástroje a rozšířenou funkcionalitu. Využijeme [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pro nasazení kontraktu ([Ethers.js](https://github.com/ethers-io/ethers.js/) má několik velmi čistých metod pro nasazení kontraktu).

V adresáři vašeho projektu zadejte:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

V dalším kroku budeme také vyžadovat ethers v našem souboru hardhat.config.js.

## Krok 13: Aktualizace hardhat.config.js {#update-hardhat-config}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat hardhat.config.js, aby o nich náš projekt věděl.

Aktualizujte svůj hardhat.config.js tak, aby vypadal takto:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## Krok 14: Kompilace našeho kontraktu {#compile-contract}

Abychom se ujistili, že zatím vše funguje, zkompilujme náš kontrakt. Úloha kompilace je jednou z vestavěných úloh Hardhatu.

Z příkazového řádku spusťte:

    npx hardhat compile

Možná se vám zobrazí varování o tom, že ve zdrojovém souboru není uveden identifikátor licence SPDX (SPDX license identifier not provided in source file), ale s tím si nemusíte dělat starosti – doufejme, že vše ostatní vypadá dobře! Pokud ne, vždy můžete napsat na [Discord Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napsání našeho skriptu pro nasazení {#write-deploy}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/` a vytvořte nový soubor s názvem `deploy.js`, do kterého přidejte následující obsah:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Zahájí nasazení a vrátí promise, který se vyhodnotí na objekt kontraktu
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat odvádí úžasnou práci při vysvětlování toho, co každý z těchto řádků kódu dělá, ve svém [tutoriálu o kontraktech](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), jejich vysvětlení jsme převzali i sem.

    const MyNFT = await ethers.getContractFactory("MyNFT");

ContractFactory v Ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže MyNFT je zde továrnou pro instance našeho kontraktu pro NFT. Při použití pluginu hardhat-ethers jsou instance ContractFactory a Contract ve výchozím nastavení připojeny k prvnímu podepisujícímu (signer).

    const myNFT = await MyNFT.deploy();

Zavoláním deploy() na ContractFactory se zahájí nasazení a vrátí se Promise, který se vyhodnotí jako Contract. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu.

## Krok 16: Nasazení našeho kontraktu {#deploy-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte zpět do kořenového adresáře vašeho projektu a v příkazovém řádku spusťte:

    npx hardhat --network sepolia run scripts/deploy.js

Poté byste měli vidět něco jako:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Pokud přejdeme na [Etherscan pro Sepolii](https://sepolia.etherscan.io/) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Pokud to nevidíte okamžitě, chvíli počkejte, protože to může nějakou dobu trvat. Transakce bude vypadat nějak takto:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Adresa From (Od) by se měla shodovat s adresou vašeho účtu v MetaMasku a adresa To (Komu) bude uvádět „Contract Creation“ (Vytvoření kontraktu). Pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli To:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Jupííí! Právě jste nasadili svůj chytrý kontrakt pro NFT do řetězce Ethereum (testnet)!

Abychom pochopili, co se děje pod pokličkou, přejděme na kartu Explorer (Průzkumník) na našem [panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Pokud máte více aplikací Alchemy, nezapomeňte filtrovat podle aplikace a vybrat „MyNFT“.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Zde uvidíte hrstku volání JSON-RPC, která pro nás Hardhat/Ethers provedly pod pokličkou, když jsme zavolali funkci .deploy(). Dvě důležitá volání, která zde stojí za zmínku, jsou [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), což je požadavek na skutečný zápis našeho chytrého kontraktu do řetězce Sepolia, a [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě hashe (typický vzor při odesílání transakcí). Chcete-li se dozvědět více o odesílání transakcí, podívejte se na tento tutoriál o [odesílání transakcí pomocí Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

To je pro 1. část tohoto tutoriálu vše. Ve [2. části budeme s naším chytrým kontraktem skutečně interagovat tím, že vyrazíme NFT](/developers/tutorials/how-to-mint-an-nft/), a ve [3. části vám ukážeme, jak si své NFT zobrazit ve vaší peněžence na Ethereu](/developers/tutorials/how-to-view-nft-in-metamask/)!