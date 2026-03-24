---
title: "Jak napsat a nasadit NFT (část 1/3 ze série výukových programů o NFT)"
description: "Tento výukový program je první částí série o NFT, která vás krok za krokem provede tím, jak napsat a nasadit chytrý kontrakt nefunkčního tokenu (token ERC-721) pomocí Etherea a systému souborů Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "chytré kontrakty" ]
skill: beginner
breadcrumb: "Vytvořit a nasadit NFT"
lang: cs
published: 2021-04-22
---

Jelikož NFT přibližují blockchain široké veřejnosti, je to skvělá příležitost, abyste pochopili ten humbuk kolem a sami si publikovali svůj vlastní NFT kontrakt (token ERC-721) na ethereovém blockchainu!

Společnost Alchemy je nesmírně hrdá na to, že pohání největší jména v oblasti NFT, včetně Makersplace (nedávno stanovila rekord v prodeji digitálních uměleckých děl v aukční síni Christie's za 69 milionů dolarů), Dapper Labs (tvůrci NBA Top Shot a Crypto Kitties), OpenSea (největší světové NFT tržiště), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable a dalších.

V tomto výukovém programu si projdeme vytvoření a nasazení chytrého kontraktu ERC-721 v testovací síti Sepolia pomocí [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) a [Alchemy](https://alchemy.com/signup/eth) (nebojte se, pokud zatím nechápete, co z toho co znamená – všechno vám vysvětlíme!).

Ve 2. části tohoto výukového programu si projdeme, jak můžeme pomocí našeho chytrého kontraktu razit NFT, a ve 3. části si vysvětlíme, jak si své NFT zobrazit v MetaMask.

A samozřejmě, pokud budete mít v kterémkoli bodě dotazy, neváhejte se ozvat na [Alchemy Discord](https://discord.gg/gWuC7zB) nebo navštivte [dokumentaci NFT API od Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Krok 1: Připojte se k síti Ethereum {#connect-to-ethereum}

Existuje spousta způsobů, jak posílat požadavky na ethereový blockchain, ale abychom si to zjednodušili, použijeme bezplatný účet na [Alchemy](https://alchemy.com/signup/eth), což je blockchainová vývojářská platforma a API, která nám umožňuje komunikovat s řetězcem Etherea, aniž bychom museli provozovat vlastní uzly.

V tomto výukovém programu také využijeme vývojářské nástroje společnosti Alchemy pro monitorování a analýzu, abychom pochopili, co se děje „pod pokličkou“ při nasazování našeho chytrého kontraktu. Pokud ještě nemáte účet Alchemy, můžete se zdarma zaregistrovat [zde](https://alchemy.com/signup/eth).

## Krok 2: Vytvořte si aplikaci (a klíč API) {#make-api-key}

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat klíč API vytvořením aplikace. To nám umožní posílat požadavky do testovací sítě Sepolia. Pokud se chcete o testovacích sítích dozvědět více, podívejte se na [tuto příručku](https://docs.alchemyapi.io/guides/choosing-a-network).

1. Přejděte na stránku „Create App“ ve svém ovládacím panelu Alchemy tak, že v navigační liště najedete na „Apps“ a kliknete na „Create App“

![Vytvořte si svou aplikaci](./create-your-app.png)

2. Pojmenujte svou aplikaci (my jsme zvolili „Moje první NFT!“), nabídněte krátký popis, pro řetězec vyberte „Ethereum“ a pro síť zvolte „Sepolia“. Od Sloučení jsou ostatní testovací sítě zastaralé.

![Nakonfigurujte a publikujte svou aplikaci](./alchemy-explorer-sepolia.png)

3. Klikněte na „Create app“ a to je vše! Vaše aplikace by se měla objevit v tabulce níže.

## Krok 3: Vytvořte si ethereový účet (adresu) {#create-eth-address}

K odesílání a přijímání transakcí potřebujeme ethereový účet. Pro tento výukový program použijeme MetaMask, virtuální peněženku v prohlížeči, která slouží ke správě adresy vašeho ethereového účtu. Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/) od Nadace Ethereum.

Účet MetaMask si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste se vpravo nahoře přepnuli na „Sepolia Test Network“ (abychom nepracovali se skutečnými penězi).

![Nastavte Sepolia jako vaši síť](./metamask-goerli.png)

## Krok 4: Přidejte ether z Faucetu {#step-4-add-ether-from-a-faucet}

Abychom mohli náš chytrý kontrakt nasadit do testovací sítě, budeme potřebovat nějaké falešné ETH. Pro získání ETH můžete jít na [Sepolia Faucet](https://sepoliafaucet.com/) hostovaný společností Alchemy, přihlásit se, zadat adresu svého účtu a kliknout na „Send Me ETH“. Krátce poté byste měli vidět ETH ve svém účtu MetaMask!

## Krok 5: Zkontrolujte svůj zůstatek {#check-balance}

Abychom si dvakrát zkontrolovali, že tam náš zůstatek je, udělejme požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje pro sestavování od Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Tím se vrátí množství ETH v naší peněžence. Po zadání adresy vašeho účtu MetaMask a kliknutí na „Send Request“ byste měli vidět takovouto odpověď:

    ````
    ```json
    {"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
    ```
    ````

> **Poznámka** Tento výsledek je ve wei, ne v ETH. Wei se používá jako nejmenší denominace etheru. Převod z wei na ETH je 1 eth = 10<sup>18</sup> wei. Pokud tedy převedeme 0xde0b6b3a7640000 na desetinné číslo, dostaneme 1\*10<sup>18</sup> wei, což se rovná 1 ETH.

Uf! Naše falešné peníze jsou všechny tam.

## Krok 6: Inicializujte náš projekt {#initialize-project}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte na příkazový řádek a zadejte:

    ```
    mkdir my-nft
    cd my-nft
    ```

Nyní, když jsme uvnitř složky našeho projektu, použijeme k inicializaci projektu npm init. Pokud ještě nemáte nainstalovaný npm, postupujte podle [těchto pokynů](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (budeme potřebovat také [Node.js](https://nodejs.org/en/download/), takže si ho také stáhněte!).

    ```
    npm init
    ```

Nezáleží na tom, jak odpovíte na instalační otázky; zde je pro informaci, jak jsme to udělali my:

```json
    název balíčku: (my-nft)
    verze: (1.0.0)
    popis: Moje první NFT!
    vstupní bod: (index.js)
    testovací příkaz:
    repozitář git:
    klíčová slova:
    autor:
    licence: (ISC)
    Chystáte se zapsat do /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "Moje první NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Schvalte soubor package.json a můžeme pokračovat!

## Krok 7: Instalace [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním budování chytrých kontraktů a dapps před jejich nasazením na živý řetězec.

Uvnitř našeho projektu my-nft spusťte:

    ```
    npm install --save-dev hardhat
    ```

Další podrobnosti o [instalačních pokynech](https://hardhat.org/getting-started/#overview) naleznete na této stránce.

## Krok 8: Vytvoření projektu Hardhat {#create-hardhat-project}

Uvnitř složky našeho projektu spusťte:

    ```
    npx hardhat
    ```

Poté by se vám měla zobrazit uvítací zpráva a možnost vybrat si, co chcete dělat. Vyberte „create an empty hardhat.config.js“:

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Vítejte v Hardhat v2.0.11 👷‍
    ? Co chcete dělat? …
    Vytvořit vzorový projekt
    ❯ Vytvořit prázdný hardhat.config.js
    Ukončit
    ```

Tím se nám vygeneruje soubor hardhat.config.js, kde v kroku 13 specifikujeme všechna nastavení našeho projektu.

## Krok 9: Přidání složek projektu {#add-project-folders}

Abychom měli v projektu pořádek, vytvoříme si dvě nové složky. Přejděte do kořenového adresáře projektu v příkazovém řádku a zadejte:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ je místo, kde budeme uchovávat kód našeho NFT chytrého kontraktu

- scripts/ je místo, kde budeme uchovávat skripty pro nasazení a interakci s naším chytrým kontraktem

## Krok 10: Napište náš kontrakt {#write-contract}

Nyní, když máme nastavené prostředí, přejděme k zajímavějším věcem: _psaní kódu našeho chytrého kontraktu!_

Otevřete projekt my-nft ve svém oblíbeném editoru (my máme rádi [VSCode](https://code.visualstudio.com/)). Chytré kontrakty se píší v jazyce zvaném Solidity, který použijeme k napsání našeho chytrého kontraktu MyNFT.sol.‌

1. Přejděte do složky `contracts` a vytvořte nový soubor s názvem MyNFT.sol

2. Níže je kód našeho NFT chytrého kontraktu, který jsme založili na implementaci ERC-721 z knihovny [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Zkopírujte a vložte níže uvedený obsah do souboru MyNFT.sol.

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

3. Protože dědíme třídy z knihovny kontraktů OpenZeppelin, spusťte v příkazovém řádku `npm install @openzeppelin/contracts^4.0.0`, abyste knihovnu nainstalovali do naší složky.

Co přesně tedy tento kód _dělá_? Pojďme si to rozebrat, řádek po řádku.

V horní části našeho chytrého kontraktu importujeme tři třídy chytrých kontraktů [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol obsahuje implementaci standardu ERC-721, kterou bude náš NFT chytrý kontrakt dědit. (Aby byl chytrý kontrakt platným NFT, musí implementovat všechny metody standardu ERC-721.) Chcete-li se dozvědět více o zděděných funkcích ERC-721, podívejte se na definici rozhraní [zde](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol poskytuje čítače, které lze zvýšit nebo snížit pouze o jedna. Náš chytrý kontrakt používá čítač ke sledování celkového počtu ražených NFT a k nastavení jedinečného ID na našem novém NFT. (Každému NFT raženému pomocí chytrého kontraktu musí být přiděleno jedinečné ID – zde je naše jedinečné ID určeno pouze celkovým počtem existujících NFT. Například první NFT, které razíme s naším chytrým kontraktem, má ID „1“, naše druhé NFT má ID „2“ atd.)

- @openzeppelin/contracts/access/Ownable.sol nastavuje [řízení přístupu](https://docs.openzeppelin.com/contracts/3.x/access-control) k našemu chytrému kontraktu, takže NFT může razit pouze vlastník chytrého kontraktu (vy). (Poznámka: Zahrnutí řízení přístupu je zcela na preferencích. Pokud chcete, aby kdokoli mohl razit NFT pomocí vašeho chytrého kontraktu, odstraňte slovo Ownable na řádku 10 a onlyOwner na řádku 17.)

Po našich příkazech pro import máme náš vlastní NFT chytrý kontrakt, který je překvapivě krátký – obsahuje pouze čítač, konstruktor a jednu funkci! Je to díky našim zděděným kontraktům OpenZeppelin, které implementují většinu metod, které potřebujeme k vytvoření NFT, jako je `ownerOf`, která vrací vlastníka NFT, a `transferFrom`, která převádí vlastnictví NFT z jednoho účtu na druhý.

V našem konstruktoru ERC-721 si všimnete, že předáváme 2 řetězce, „MyNFT“ a „NFT“. První proměnná je název chytrého kontraktu a druhá je jeho symbol. Každou z těchto proměnných si můžete pojmenovat, jak chcete!

Nakonec máme naši funkci `mintNFT(address recipient, string memory tokenURI)`, která nám umožňuje razit NFT! Všimnete si, že tato funkce přebírá dvě proměnné:

- `address recipient` určuje adresu, která obdrží vaše čerstvě ražené NFT

- `string memory tokenURI` je řetězec, který by se měl přeložit na dokument JSON, který popisuje metadata NFT. Metadata NFT jsou to, co ho skutečně oživuje a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy. Ve 2. části tohoto výukového programu si popíšeme, jak tato metadata nakonfigurovat.

`mintNFT` volá některé metody ze zděděné knihovny ERC-721 a nakonec vrací číslo, které představuje ID čerstvě raženého NFT.

## Krok 11: Připojte MetaMask a Alchemy ke svému projektu {#connect-metamask-and-alchemy}

Nyní, když jsme vytvořili peněženku MetaMask, účet Alchemy a napsali náš chytrý kontrakt, je čas tyto tři věci propojit.

Každá transakce odeslaná z vaší virtuální peněženky vyžaduje podpis pomocí vašeho jedinečného privátního klíče. Abychom našemu programu poskytli toto oprávnění, můžeme bezpečně uložit náš privátní klíč (a klíč API od Alchemy) do souboru prostředí.

Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [tento výukový program](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) o odesílání transakcí pomocí web3.

Nejprve nainstalujte balíček dotenv do adresáře vašeho projektu:

    ```
    npm install dotenv --save
    ```

Poté vytvořte soubor `.env` v kořenovém adresáři našeho projektu a přidejte do něj svůj privátní klíč MetaMask a adresu URL rozhraní HTTP API od Alchemy.

- Postupujte podle [těchto pokynů](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pro export vašeho privátního klíče z MetaMask

- Níže se podívejte, jak získat URL API HTTP od Alchemy, a zkopírujte si ji do schránky

![Zkopírujte URL vašeho API od Alchemy](./copy-alchemy-api-url.gif)

Váš soubor `.env` by nyní měl vypadat takto:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Abychom je skutečně propojili s naším kódem, budeme na tyto proměnné odkazovat v našem souboru hardhat.config.js v kroku 13.

<EnvWarningBanner />

## Krok 12: Instalace Ethers.js {#install-ethers}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](/developers/docs/apis/json-rpc/) uživatelsky přívětivějšími metodami.

Hardhat velmi usnadňuje integraci [pluginů](https://hardhat.org/plugins/) pro další nástroje a rozšířenou funkčnost. Pro nasazení kontraktu využijeme [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) ([Ethers.js](https://github.com/ethers-io/ethers.js/) má několik velmi čistých metod pro nasazení kontraktu).

V adresáři projektu zadejte:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

V dalším kroku budeme také vyžadovat ethers v našem souboru hardhat.config.js.

## Krok 13: Aktualizace souboru hardhat.config.js {#update-hardhat-config}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat hardhat.config.js, aby o nich všech náš projekt věděl.

Aktualizujte svůj soubor hardhat.config.js tak, aby vypadal takto:

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

## Krok 14: Zkompilujte náš kontrakt {#compile-contract}

Abychom se ujistili, že zatím vše funguje, zkompilujeme si náš kontrakt. Úkol kompilace je jedním z vestavěných úkolů Hardhat.

Z příkazového řádku spusťte:

    ```
    npx hardhat compile
    ```

Můžete dostat varování o tom, že v zdrojovém souboru není uveden identifikátor licence SPDX, ale s tím si nemusíte dělat starosti – doufejme, že vše ostatní vypadá dobře! Pokud ne, vždy můžete napsat zprávu na [discordu Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napište náš skript pro nasazení {#write-deploy}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/` a vytvořte nový soubor s názvem `deploy.js` a přidejte do něj následující obsah:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Spusťte nasazení, vrátí se promise, která se vyřeší na objekt kontraktu
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

Hardhat skvěle vysvětluje, co každý z těchto řádků kódu dělá ve svém [výukovém programu Kontrakty](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my jsme zde jejich vysvětlení převzali.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ContractFactory v ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže MyNFT je zde továrnou pro instance našeho NFT kontraktu. Při použití pluginu hardhat-ethers jsou instance ContractFactory a Contract ve výchozím nastavení připojeny k prvnímu podepisujícímu.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Volání deploy() na ContractFactory spustí nasazení a vrátí Promise, která se vyřeší na Contract. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu.

## Krok 16: Nasaďte náš kontrakt {#deploy-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Vraťte se do kořenového adresáře projektu a v příkazovém řádku spusťte:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Měli byste pak vidět něco takového:

    ```
    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Pokud přejdeme na [Sepolia etherscan](https://sepolia.etherscan.io/) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Pokud ji nevidíte okamžitě, chvíli prosím počkejte, protože to může nějakou dobu trvat. Transakce bude vypadat nějak takto:

![Zobrazení adresy transakce na Etherscanu](./etherscan-sepoila-contract-creation.png)

Adresa „Od“ by měla odpovídat adrese vašeho účtu MetaMask a adresa „Pro“ bude říkat „Contract Creation“. Pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli „Pro“:

![Zobrazte adresu svého kontraktu na Etherscanu](./etherscan-sepolia-tx-details.png)

Paráda! Právě jste nasadili svůj NFT chytrý kontrakt na řetězec Ethereum (testnet)!

Abychom pochopili, co se děje „pod pokličkou“, přejděme na kartu Explorer v našem [ovládacím panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Pokud máte více aplikací Alchemy, ujistěte se, že filtrujete podle aplikace a vyberete „MyNFT“.

![Zobrazení volání provedených „pod pokličkou“ pomocí ovládacího panelu Explorer od Alchemy](./alchemy-explorer-goerli.png)

Zde uvidíte hrstku volání JSON-RPC, která pro nás Hardhat/Ethers provedly „pod pokličkou“, když jsme volali funkci .deploy(). Dvě důležité, které je třeba zde zmínit, jsou [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), což je požadavek na skutečný zápis našeho chytrého kontraktu na řetězec Sepolia, a [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě haše (typický vzorec při odesílání transakcí). Chcete-li se dozvědět více o odesílání transakcí, podívejte se na tento výukový program o [odesílání transakcí pomocí Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

To je vše k 1. části tohoto výukového programu. V [části 2 budeme skutečně interagovat s naším chytrým kontraktem ražbou NFT](/developers/tutorials/how-to-mint-an-nft/) a v [části 3 si ukážeme, jak si své NFT zobrazit ve své ethereové peněžence](/developers/tutorials/how-to-view-nft-in-metamask/)!
