---
title: "Jak napsat a nasadit NFT (Část 1/3 ze série tutoriálů o NFT)"
description: "Tento tutoriál je 1. částí série o NFT, která vás krok za krokem provede tím, jak napsat a nasadit chytrý kontrakt pro nezaměnitelný token (token ERC-721) pomocí Etherea a Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "chytré kontrakty"]
skill: beginner
breadcrumb: "Napsání a nasazení NFT"
lang: cs
published: 2021-04-22
---

Vzhledem k tomu, že nezaměnitelné tokeny (NFT) dostávají blockchain do povědomí veřejnosti, je nyní skvělá příležitost pochopit tento humbuk na vlastní kůži tím, že publikujete svůj vlastní kontrakt pro NFT (token ERC-721) na blockchainu Ethereum!

V tomto tutoriálu si projdeme vytvoření a nasazení chytrého kontraktu ERC-721 na testnetu Sepolia pomocí nástrojů [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) a [Alchemy](https://alchemy.com/signup/eth) (nebojte se, pokud zatím nerozumíte, co to všechno znamená – vysvětlíme si to!).

Ve 2. části tohoto tutoriálu si projdeme, jak můžeme náš chytrý kontrakt použít k ražení NFT, a ve 3. části si vysvětlíme, jak si své NFT zobrazit v MetaMasku.

A samozřejmě, pokud budete mít kdykoli nějaké dotazy, neváhejte se ozvat na [Discordu Alchemy](https://discord.gg/gWuC7zB) nebo navštivte [dokumentaci k rozhraní pro programování aplikací (API) pro NFT od Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Krok 1: Připojení k síti Ethereum {#connect-to-ethereum}

Existuje spousta způsobů, jak zadávat požadavky na blockchain Ethereum, ale abychom si to usnadnili, použijeme bezplatný účet na [Alchemy](https://alchemy.com/signup/eth), vývojářské platformě a API pro blockchain, která nám umožňuje komunikovat s řetězcem Ethereum, aniž bychom museli provozovat vlastní uzly.

V tomto tutoriálu také využijeme vývojářské nástroje Alchemy pro monitorování a analytiku, abychom pochopili, co se děje pod pokličkou při nasazení našeho chytrého kontraktu. Pokud ještě nemáte účet na Alchemy, můžete se zdarma zaregistrovat [zde](https://alchemy.com/signup/eth).

## Krok 2: Vytvoření aplikace (a klíče k API) {#make-api-key}

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat klíč k rozhraní pro programování aplikací (API) vytvořením aplikace. To nám umožní zadávat požadavky na testnet Sepolia. Pokud se chcete o testnetech dozvědět více, podívejte se na [tento průvodce](https://www.alchemy.com/docs/choosing-a-web3-network).

1. Přejděte na stránku „Create new app“ (Vytvořit novou aplikaci) na svém panelu Alchemy tak, že v navigačním panelu vyberete „Select an app“ (Vybrat aplikaci) a kliknete na „Create new app“.

![Vytvoření aplikace](./alchemy-create-new-app.png)

2. Pojmenujte svou aplikaci (my jsme zvolili „My First NFT!“), přidejte krátký popis a vyberte případ užití. Dále vyhledejte „Ethereum“ a vyberte síť. Použijeme Sepolia, doporučený testnet pro vývoj aplikací (viz [Sítě Etherea](/developers/docs/networks/#ethereum-testnets)).

3. Pokračujte kliknutím na „Next“ (Další), poté na „Create app“ (Vytvořit aplikaci) a je to! Vaše aplikace by se měla objevit v rozbalovací nabídce navigačního panelu s klíčem k API, který si můžete zkopírovat.

## Krok 3: Vytvoření účtu (adresy) na Ethereu {#create-eth-address}

K odesílání a přijímání transakcí potřebujeme účet na Ethereu. Pro tento tutoriál použijeme MetaMask, virtuální peněženku v prohlížeči, která se používá ke správě adresy vašeho účtu na Ethereu. Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/) od Nadace Ethereum.

Účet na MetaMasku si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste pomocí nabídky pro výběr sítě přepnuli na testnet „Sepolia“ (abychom nepracovali se skutečnými penězi). Pokud v seznamu nevidíte síť Sepolia, otevřete nabídku v pravém horním rohu, vyberte „Networks“ (Sítě) a zapněte možnost „Show test networks“ (Zobrazit testovací sítě) (viz [průvodce MetaMasku pro zobrazení testnetů](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Nastavení sítě Sepolia](./metamask-sepolia.png)

## Krok 4: Přidání etheru z faucetu {#step-4-add-ether-from-a-faucet}

Abychom mohli nasadit náš chytrý kontrakt na testnet, budeme potřebovat nějaké falešné ETH. Chcete-li získat Sepolia ETH, vyberte si jeden z faucetů uvedených v [podrobnostech o síti Sepolia](/developers/docs/networks/#sepolia) a zadejte adresu svého účtu. Pokud jeden nefunguje, zkuste jiný, protože někdy mohou vyschnout a některé mají pravidla způsobilosti: například [faucet Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) vyžaduje, aby přijímající adresa měla alespoň 0,001 ETH na síti Ethereum Mainnet. Brzy poté byste měli vidět ETH na svém účtu v MetaMasku!

## Krok 5: Kontrola zůstatku {#check-balance}

Abychom si ověřili, že tam náš zůstatek je, vytvořme požadavek [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) pomocí [nástroje sandbox od Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). To nám vrátí množství ETH v naší peněžence. Po zadání adresy vašeho účtu v MetaMasku a kliknutí na „Send Request“ byste měli vidět podobnou odpověď:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Poznámka** Tento výsledek je ve Wei, nikoli v ETH. Wei se používá jako nejmenší nominální hodnota etheru. Převod z Wei na ETH je 1 eth = 10<sup>18</sup> Wei. Pokud tedy převedeme 0xde0b6b3a7640000 do desítkové soustavy, dostaneme 1\*10<sup>18</sup> Wei, což se rovná 1 ETH.

Uf! Naše falešné peníze tam všechny jsou.

## Krok 6: Inicializace našeho projektu {#initialize-project}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte do příkazového řádku a zadejte:

```sh
mkdir my-nft
cd my-nft
```

Nyní, když jsme ve složce našeho projektu, použijeme `npm init` k inicializaci projektu. Pokud ještě nemáte nainstalované npm, postupujte podle [pokynů k instalaci Node.js](https://nodejs.org/en/download/) (pro tento tutoriál budeme potřebovat Node.js a npm).

```sh
npm init
```

Nezáleží na tom, jak odpovíte na instalační otázky; zde je pro referenci ukázka, jak jsme to udělali my:

```console
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

Schvalte soubor package.json. Hardhat 3, který nainstalujeme vzápětí, podporuje pouze projekty s moduly ES, takže projekt jako takový označte:

```sh
npm pkg set type=module
```

A můžeme začít!

## Krok 7: Instalace nástroje [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním vytváření chytrých kontraktů a decentralizovaných aplikací (dapp) před jejich nasazením do živého řetězce.

Hardhat 3 vyžaduje Node.js v22.13.0 nebo novější. Uvnitř našeho projektu my-nft spusťte:

```sh
npm install --save-dev hardhat
```

Další podrobnosti o [pokynech k instalaci](https://hardhat.org/docs/getting-started) najdete na této stránce.

## Krok 8: Vytvoření projektu Hardhat {#create-hardhat-project}

Spuštění `npx hardhat --init` by vygenerovalo kompletní ukázkový projekt, ale pro tento tutoriál vše nastavíme ručně, abyste viděli každou část. V kořenovém adresáři složky vašeho projektu vytvořte soubor s názvem `hardhat.config.js` s následujícím obsahem:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Zde specifikujeme veškeré nastavení pro náš projekt (v kroku 13). Prozatím to jen říká nástroji Hardhat, kterou verzi kompilátoru Solidity má použít.

## Krok 9: Přidání složek projektu {#add-project-folders}

Abychom udrželi náš projekt organizovaný, vytvoříme dvě nové složky. Přejděte do kořenového adresáře vašeho projektu v příkazovém řádku a zadejte:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ je místo, kde budeme uchovávat kód našeho chytrého kontraktu pro NFT

- scripts/ je místo, kde budeme uchovávat skripty pro nasazení a interakci s naším chytrým kontraktem

## Krok 10: Napsání našeho kontraktu {#write-contract}

Nyní, když je naše prostředí nastaveno, přejdeme k zajímavějším věcem: _psaní kódu našeho chytrého kontraktu!_

Otevřete projekt my-nft ve svém oblíbeném editoru (my máme rádi [VSCode](https://code.visualstudio.com/)). Chytré kontrakty se píší v jazyce zvaném Solidity, který použijeme k napsání našeho chytrého kontraktu MyNFT.sol.‌

1. Přejděte do složky `contracts` a vytvořte nový soubor s názvem MyNFT.sol

2. Níže je kód našeho chytrého kontraktu pro NFT, který jsme založili na implementaci ERC-721 z knihovny [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Zkopírujte a vložte níže uvedený obsah do souboru MyNFT.sol.

   ```solidity
   // Kontrakt založený na https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Protože dědíme třídy z knihovny kontraktů OpenZeppelin, spusťte v příkazovém řádku `npm install @openzeppelin/contracts`, abyste knihovnu nainstalovali do naší složky. Tento tutoriál používá OpenZeppelin Contracts 5.x, což vyžaduje Solidity 0.8.24 nebo novější.

Co tedy tento kód přesně _dělá_? Pojďme si to rozebrat řádek po řádku.

Na začátku našeho chytrého kontraktu importujeme tři třídy chytrých kontraktů [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol obsahuje implementaci standardu ERC-721, kterou náš chytrý kontrakt pro NFT zdědí. (Aby byl váš chytrý kontrakt platným NFT, musí implementovat všechny metody standardu ERC-721.) Chcete-li se dozvědět více o zděděných funkcích ERC-721, podívejte se na definici rozhraní [zde](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol nastavuje [řízení přístupu](https://docs.openzeppelin.com/contracts/5.x/access-control) k našemu chytrému kontraktu, takže pouze vlastník chytrého kontraktu (vy) může razit NFT. Vlastníkem je adresa `initialOwner` předaná konstruktoru. (Poznámka: zahrnutí řízení přístupu je čistě na vašich preferencích. Pokud byste chtěli, aby kdokoli mohl razit NFT pomocí vašeho chytrého kontraktu, odstraňte `Ownable` a `Ownable(initialOwner)` z definice kontraktu a konstruktoru a `onlyOwner` z funkce `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol rozšiřuje ERC-721 tak, aby každý token mohl ukládat své vlastní URI pro metadata, které nastavíme při ražení.

Po našich příkazech pro import máme náš vlastní chytrý kontrakt pro NFT, který je překvapivě krátký – obsahuje pouze počítadlo, konstruktor a jedinou funkci! Je to díky našim zděděným kontraktům OpenZeppelin, které implementují většinu metod, které potřebujeme k vytvoření NFT, jako je `ownerOf`, která vrací vlastníka NFT, a `transferFrom`, která převádí vlastnictví NFT z jednoho účtu na druhý.

Počítadlo `_nextTokenId` sleduje celkový počet vyražených NFT a nastavuje jedinečné ID našeho nového NFT. (Každému NFT vyraženému pomocí chytrého kontraktu musí být přiřazeno jedinečné ID – zde je naše jedinečné ID určeno pouze celkovým počtem existujících NFT. `++_nextTokenId` zvýší počítadlo před jeho použitím, takže první NFT, které vyrazíme pomocí našeho chytrého kontraktu, má ID „1“, naše druhé NFT má ID „2“ atd.)

V našem konstruktoru ERC-721 si všimnete, že předáváme 2 řetězce, „MyNFT“ a „NFT“. První proměnná je název chytrého kontraktu a druhá je jeho symbol. Každou z těchto proměnných můžete pojmenovat, jak chcete!

Nakonec tu máme naši funkci `mintNFT(address recipient, string memory tokenURI)`, která nám umožňuje razit NFT! Všimnete si, že tato funkce přijímá dvě proměnné:

- `address recipient` určuje adresu, která obdrží vaše čerstvě vyražené NFT

- `string memory tokenURI` je řetězec, který by měl odkazovat na dokument JSON, který popisuje metadata NFT. Metadata NFT jsou tím, co mu skutečně vdechuje život a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy. Ve 2. části tohoto tutoriálu popíšeme, jak tato metadata nakonfigurovat.

`mintNFT` volá některé metody ze zděděné knihovny ERC-721 a nakonec vrací číslo, které představuje ID čerstvě vyraženého NFT.

## Krok 11: Připojení MetaMasku a Alchemy k vašemu projektu {#connect-metamask-and-alchemy}

Nyní, když jsme vytvořili peněženku MetaMask, účet na Alchemy a napsali náš chytrý kontrakt, je čas tyto tři věci propojit.

Každá transakce odeslaná z vaší virtuální peněženky vyžaduje podpis pomocí vašeho jedinečného soukromého klíče. Abychom našemu programu poskytli toto oprávnění, můžeme bezpečně uložit náš soukromý klíč (a klíč k API Alchemy) do souboru prostředí.

Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [dokumentaci k transakcím](/developers/docs/transactions/).

Vytvořte soubor `.env` v kořenovém adresáři našeho projektu a přidejte do něj svůj soukromý klíč z MetaMasku a URL adresu HTTP API Alchemy.

- Postupujte podle [těchto pokynů](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) pro export vašeho soukromého klíče z MetaMasku

- Níže se podívejte, jak získat URL adresu HTTP API Alchemy a zkopírujte si ji do schránky

![Zkopírování URL adresy API Alchemy](./copy-alchemy-api-url.mp4#842x480)

Váš soubor `.env` by nyní měl vypadat takto:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Abychom je skutečně propojili s naším kódem, odkážeme na tyto proměnné v našem souboru hardhat.config.js v kroku 13. Node.js dokáže číst soubory `.env` sám o sobě, takže není nutné instalovat žádný další balíček.

<EnvWarningBanner />

## Krok 12: Instalace Ethers.js {#install-ethers}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](/developers/docs/apis/json-rpc/) uživatelsky přívětivějšími metodami.

Hardhat velmi usnadňuje integraci [pluginů](https://hardhat.org/docs/plugins/official-plugins) pro další nástroje a rozšířenou funkcionalitu. Využijeme [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) pro nasazení kontraktu ([Ethers.js](https://docs.ethers.org/v6/) má několik velmi čistých metod pro nasazení kontraktu).

V adresáři vašeho projektu zadejte:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

V dalším kroku také přidáme plugin do našeho souboru hardhat.config.js.

## Krok 13: Aktualizace hardhat.config.js {#update-hardhat-config}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat hardhat.config.js, aby o nich náš projekt věděl.

Aktualizujte svůj hardhat.config.js tak, aby vypadal takto:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Načte API_URL a PRIVATE_KEY ze souboru .env do process.env, pokud existuje
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` říká nástroji Hardhat, aby četl každou hodnotu z proměnné prostředí pouze tehdy, když je to potřeba, takže příkazy jako `compile` fungují ještě před nastavením hodnot. Pokud byste raději neuchovávali svůj soukromý klíč v textovém souboru, Hardhat dokáže také číst [konfigurační proměnné ze zašifrovaného úložiště klíčů](https://hardhat.org/docs/guides/configuration-variables).

## Krok 14: Kompilace našeho kontraktu {#compile-contract}

Abychom se ujistili, že zatím vše funguje, zkompilujeme náš kontrakt. Úloha kompilace je jednou z vestavěných úloh nástroje Hardhat.

Z příkazového řádku spusťte:

```sh
npx hardhat compile
```

Při první kompilaci si Hardhat stáhne kompilátor Solidity. Poté byste měli vidět něco jako `Compiled 1 Solidity file with solc 0.8.34`. Pokud ne, můžete vždy napsat na [Discord Alchemy](https://discord.gg/gWuC7zB).

## Krok 15: Napsání našeho skriptu pro nasazení {#write-deploy}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/` a vytvořte nový soubor s názvem `deploy.js`, do kterého přidejte následující obsah:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Zahájí nasazení a vrátí promise, který se vyhodnotí na objekt kontraktu
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Pojďme si projít, co každý z těchto řádků kódu dělá.

```js
const { ethers } = await network.create()
```

V Hardhat 3 skript otevírá připojení k síti explicitně. `network.create()` se připojí k síti, kterou vyberete pomocí volby `--network` při spuštění skriptu, a plugin `hardhat-ethers` přidá k tomuto připojení objekt `ethers`.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` vrací účty nakonfigurované pro danou síť. Na síti Sepolia je to účet, jehož soukromý klíč jste vložili do `.env`. Jeho adresu předáme konstruktoru, abyste se stali vlastníkem kontraktu.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ContractFactory v ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže MyNFT je zde továrnou pro instance našeho kontraktu pro NFT. Při použití pluginu hardhat-ethers jsou instance ContractFactory a Contract ve výchozím nastavení připojeny k prvnímu podepisujícímu.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Volání deploy() na ContractFactory zahájí nasazení a vrátí Promise, který se vyhodnotí jako Contract. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu. Argumenty, které předáte do deploy(), jdou do konstruktoru kontraktu, zde je to adresa `initialOwner`.

`waitForDeployment()` čeká, dokud není transakce nasazení zahrnuta do bloku, a `getAddress()` vrací adresu nového kontraktu. Další podrobnosti najdete v [dokumentaci ke kontraktům ethers.js](https://docs.ethers.org/v6/api/contract/).

## Krok 16: Nasazení našeho kontraktu {#deploy-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte zpět do kořenového adresáře vašeho projektu a v příkazovém řádku spusťte:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Poté byste měli vidět něco jako:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Pokud přejdeme na [Etherscan sítě Sepolia](https://sepolia.etherscan.io/) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Pokud jej nevidíte okamžitě, chvíli počkejte, protože to může nějakou dobu trvat. Transakce bude vypadat nějak takto:

![Zobrazení adresy vaší transakce na Etherscanu](./etherscan-sepoila-contract-creation.png)

Adresa „From“ (Od) by se měla shodovat s adresou vašeho účtu v MetaMasku a adresa „To“ (Komu) bude uvádět „Contract Creation“ (Vytvoření kontraktu). Pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli „To“:

![Zobrazení adresy vašeho kontraktu na Etherscanu](./etherscan-sepolia-tx-details.png)

Paráda! Právě jste nasadili svůj chytrý kontrakt pro NFT do řetězce Etherea (testnetu)!

Abyste pochopili, co se děje pod pokličkou, můžete se podívat na požadavky, které vaše aplikace obdržela, na vašem [panelu Alchemy](https://dashboard.alchemy.com/).

Tam uvidíte hrstku volání JSON-RPC, která pro nás Hardhat/Ethers provedly pod pokličkou, když jsme zavolali funkci .deploy(). Dvě důležitá volání, která zde stojí za zmínku, jsou [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), což je požadavek na skutečný zápis našeho chytrého kontraktu do řetězce Sepolia, a [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě hashe (typický vzorec při odesílání transakcí). Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [dokumentaci k transakcím](/developers/docs/transactions/).

To je pro 1. část tohoto tutoriálu vše. Ve [2. části budeme s naším chytrým kontraktem skutečně interagovat ražením NFT](/developers/tutorials/how-to-mint-an-nft/) a ve [3. části vám ukážeme, jak si své NFT zobrazit ve vaší peněžence na Ethereu](/developers/tutorials/how-to-view-nft-in-metamask/)!
