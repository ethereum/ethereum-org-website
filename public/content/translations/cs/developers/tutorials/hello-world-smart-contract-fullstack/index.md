---
title: "Chytrý kontrakt Hello World pro začátečníky – Fullstack"
description: "Úvodní tutoriál o psaní a nasazení jednoduchého chytrého kontraktu na Ethereu."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "chytré kontrakty",
    "nasazení",
    "průzkumník bloků",
    "frontend",
    "transakce",
    "framework",
  ]
skill: beginner
lang: cs
published: 2021-10-25
---

Tento průvodce je pro vás, pokud jste ve vývoji na blockchainu noví a nevíte, kde začít nebo jak nasadit chytré kontrakty a jak s nimi interagovat. Projdeme si vytvoření a nasazení jednoduchého chytrého kontraktu na testovací síti Goerli pomocí [MetaMasku](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhatu](https://hardhat.org) a [Alchemy](https://alchemy.com/eth).

K dokončení tohoto tutoriálu budete potřebovat účet na Alchemy. [Zaregistrujte si účet zdarma](https://www.alchemy.com/).

Pokud budete mít kdykoli nějaké dotazy, neváhejte se ozvat na [Discordu Alchemy](https://discord.gg/gWuC7zB)!

## Část 1 – Vytvoření a nasazení vašeho chytrého kontraktu pomocí Hardhat {#part-1}

### Připojení k síti Ethereum {#connect-to-the-ethereum-network}

Existuje mnoho způsobů, jak zadávat požadavky na řetězec Ethereum. Pro zjednodušení použijeme bezplatný účet na Alchemy, což je vývojářská platforma a API pro blockchain, která nám umožňuje komunikovat s řetězcem Ethereum, aniž bychom museli sami provozovat uzel. Alchemy má také vývojářské nástroje pro monitorování a analytiku; v tomto tutoriálu je využijeme k tomu, abychom pochopili, co se děje pod pokličkou při nasazení našeho chytrého kontraktu.

### Vytvoření aplikace a klíče API {#create-your-app-and-api-key}

Jakmile si vytvoříte účet na Alchemy, můžete si vytvořením aplikace vygenerovat klíč API. To vám umožní zadávat požadavky na testnet Goerli. Pokud testnety neznáte, můžete si [přečíst průvodce Alchemy pro výběr sítě](https://www.alchemy.com/docs/choosing-a-web3-network).

Na řídicím panelu Alchemy najděte v navigačním panelu rozbalovací nabídku **Apps** a klikněte na **Create App**.

![Hello world create app](./hello-world-create-app.png)

Pojmenujte svou aplikaci „_Hello World_“ a napište krátký popis. Jako prostředí (environment) vyberte **Staging** a jako síť (network) **Goerli**.

![create app view hello world](./create-app-view-hello-world.png)

_Poznámka: ujistěte se, že jste vybrali **Goerli**, jinak tento tutoriál nebude fungovat._

Klikněte na **Create app**. Vaše aplikace se objeví v tabulce níže.

### Vytvoření účtu Ethereum {#create-an-ethereum-account}

K odesílání a přijímání transakcí potřebujete účet Ethereum. Použijeme MetaMask, virtuální peněženku v prohlížeči, která uživatelům umožňuje spravovat adresu jejich účtu Ethereum.

Účet MetaMask si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste vpravo nahoře přepnuli na „Goerli Test Network“ (abychom nepracovali se skutečnými penězi).

### Krok 4: Přidání etheru z faucetu {#step-4-add-ether-from-a-faucet}

K nasazení vašeho chytrého kontraktu do testovací sítě budete potřebovat nějaké falešné ETH. Chcete-li získat ETH v síti Goerli, přejděte na faucet Goerli a zadejte adresu svého účtu Goerli. Upozorňujeme, že faucety Goerli mohou být v poslední době poněkud nespolehlivé – seznam možností, které můžete vyzkoušet, najdete na [stránce testovacích sítí](/developers/docs/networks/#goerli):

_Poznámka: kvůli přetížení sítě to může chvíli trvat._
``

### Krok 5: Kontrola zůstatku {#step-5-check-your-balance}

Abychom si ověřili, že je ETH ve vaší peněžence, vytvořme požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje composer od Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Tím se vrátí množství ETH v naší peněžence. Chcete-li se dozvědět více, podívejte se na [krátký tutoriál Alchemy o tom, jak používat nástroj composer](https://youtu.be/r6sjRxBZJuU).

Zadejte adresu svého účtu MetaMask a klikněte na **Send Request**. Uvidíte odpověď, která vypadá jako fragment kódu níže.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Poznámka: Tento výsledek je ve wei, nikoli v ETH. Wei se používá jako nejmenší nominální hodnota etheru._

Uf! Naše falešné peníze jsou tam.

### Krok 6: Inicializace našeho projektu {#step-6-initialize-our-project}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte do příkazového řádku a zadejte následující.

```
mkdir hello-world
cd hello-world
```

Nyní, když jsme ve složce našeho projektu, použijeme `npm init` k inicializaci projektu.

> Pokud ještě nemáte nainstalované npm, postupujte podle [těchto pokynů k instalaci Node.js a npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Pro účely tohoto tutoriálu nezáleží na tom, jak odpovíte na inicializační otázky. Zde je pro referenci ukázka, jak jsme to udělali my:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Schvalte soubor package.json a můžeme začít!

### Krok 7: Stažení Hardhat {#step-7-download-hardhat}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním vytváření chytrých kontraktů a decentralizovaných aplikací (dapp) před jejich nasazením do živého řetězce.

Uvnitř našeho projektu `hello-world` spusťte:

```
npm install --save-dev hardhat
```

Další podrobnosti najdete na této stránce s [pokyny k instalaci](https://hardhat.org/getting-started/#overview).

### Krok 8: Vytvoření projektu Hardhat {#step-8-create-hardhat-project}

Ve složce našeho projektu `hello-world` spusťte:

```
npx hardhat
```

Poté byste měli vidět uvítací zprávu a možnost vybrat si, co chcete udělat. Vyberte „create an empty hardhat.config.js“:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Tím se v projektu vygeneruje soubor `hardhat.config.js`. Použijeme ho později v tutoriálu k určení nastavení našeho projektu.

### Krok 9: Přidání složek projektu {#step-9-add-project-folders}

Abychom udrželi projekt organizovaný, vytvořme dvě nové složky. V příkazovém řádku přejděte do kořenového adresáře vašeho projektu `hello-world` a zadejte:

```
mkdir contracts
mkdir scripts
```

- `contracts/` je místo, kde budeme uchovávat soubor s kódem našeho chytrého kontraktu hello world
- `scripts/` je místo, kde budeme uchovávat skripty pro nasazení a interakci s naším kontraktem

### Krok 10: Napsání našeho kontraktu {#step-10-write-our-contract}

Možná se ptáte, kdy už budeme psát kód? Je čas!

Otevřete projekt hello-world ve svém oblíbeném editoru. Chytré kontrakty se nejčastěji píší v jazyce Solidity, který použijeme k napsání našeho chytrého kontraktu.‌

1. Přejděte do složky `contracts` a vytvořte nový soubor s názvem `HelloWorld.sol`
2. Níže je ukázkový chytrý kontrakt Hello World, který budeme používat pro tento tutoriál. Zkopírujte níže uvedený obsah do souboru `HelloWorld.sol`.

_Poznámka: Nezapomeňte si přečíst komentáře, abyste pochopili, co tento kontrakt dělá._

```
// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je kolekce funkcí a dat (jeho stav). Po nasazení se kontrakt nachází na konkrétní adrese na blockchainu Ethereum. Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Vyvoláno při volání funkce update
   // Události chytrého kontraktu jsou způsob, jakým váš kontrakt komunikuje s frontendem vaší aplikace, že se na blockchainu něco stalo. Frontend může určitým událostem „naslouchat“ a po jejich výskytu provést akci.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu a vytváří funkci, kterou mohou jiné kontrakty nebo klienti volat pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha třídně orientovaných jazycích je konstruktor speciální funkce, která se provede pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá řetězcový argument `initMessage` a nastaví hodnotu do proměnné úložiště kontraktu `message`.
      message = initMessage;
   }

   // Veřejná funkce, která přijímá řetězcový argument a aktualizuje proměnnou úložiště `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Toto je základní chytrý kontrakt, který při vytvoření uloží zprávu. Lze ji aktualizovat voláním funkce `update`.

### Krok 11: Připojení MetaMask a Alchemy k vašemu projektu {#step-11-connect-metamask-alchemy-to-your-project}

Vytvořili jsme peněženku MetaMask, účet Alchemy a napsali náš chytrý kontrakt, nyní je čas tyto tři věci propojit.

Každá transakce odeslaná z vaší peněženky vyžaduje podpis pomocí vašeho jedinečného soukromého klíče. Abychom našemu programu poskytli toto oprávnění, můžeme náš soukromý klíč bezpečně uložit do souboru prostředí (environment file). Zde také uložíme klíč API pro Alchemy.

> Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [tento tutoriál](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) o odesílání transakcí pomocí Web3.

Nejprve nainstalujte balíček dotenv v adresáři vašeho projektu:

```
npm install dotenv --save
```

Poté vytvořte soubor `.env` v kořenovém adresáři projektu. Přidejte do něj svůj soukromý klíč MetaMask a HTTP URL API Alchemy.

Váš soubor prostředí musí být pojmenován `.env`, jinak nebude rozpoznán jako soubor prostředí.

Nepojmenovávejte ho `process.env` ani `.env-custom` ani nijak jinak.

- Postupujte podle [těchto pokynů](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pro export vašeho soukromého klíče
- Níže se dozvíte, jak získat HTTP URL API Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Váš soubor `.env` by měl vypadat takto:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Abychom je skutečně propojili s naším kódem, odkážeme na tyto proměnné v našem souboru `hardhat.config.js` v kroku 13.

### Krok 12: Instalace Ethers.js {#step-12-install-ethersjs}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) uživatelsky přívětivějšími metodami.

Hardhat nám umožňuje integrovat [pluginy](https://hardhat.org/plugins/) pro další nástroje a rozšířenou funkcionalitu. Pro nasazení kontraktu využijeme [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers).

V adresáři vašeho projektu zadejte:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Krok 13: Aktualizace hardhat.config.js {#step-13-update-hardhat-configjs}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat `hardhat.config.js`, aby o nich náš projekt věděl.

Aktualizujte svůj `hardhat.config.js` tak, aby vypadal takto:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Krok 14: Kompilace našeho kontraktu {#step-14-compile-our-contract}

Abychom se ujistili, že zatím vše funguje, zkompilujme náš kontrakt. Úloha `compile` je jednou z vestavěných úloh Hardhat.

Z příkazového řádku spusťte:

```bash
npx hardhat compile
```

Možná se vám zobrazí varování ohledně `SPDX license identifier not provided in source file`, ale s tím si nemusíte dělat starosti – doufejme, že vše ostatní vypadá dobře! Pokud ne, můžete vždy napsat na [Discord Alchemy](https://discord.gg/u72VCg3).

### Krok 15: Napsání našeho skriptu pro nasazení {#step-15-write-our-deploy-script}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/` a vytvořte nový soubor s názvem `deploy.js`, do kterého přidejte následující obsah:

```javascript
async function main() {
  const HelloWorld = await ethers.getKontraktFactory("HelloWorld")

  // Zahájí nasazení a vrátí promise, který se vyhodnotí jako objekt kontraktu
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat odvádí úžasnou práci při vysvětlování toho, co každý z těchto řádků kódu dělá, ve svém [tutoriálu o kontraktech](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), jejich vysvětlení jsme převzali zde.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` v ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže `HelloWorld` je zde [továrna](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) pro instance našeho kontraktu hello world. Při použití pluginu `hardhat-ethers` jsou instance `ContractFactory` a `Contract` ve výchozím nastavení připojeny k prvnímu podepisujícímu (vlastníkovi).

```javascript
const hello_world = await HelloWorld.deploy()
```

Volání `deploy()` na `ContractFactory` zahájí nasazení a vrátí `Promise`, který se přeloží na objekt `Contract`. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu.

### Krok 16: Nasazení našeho kontraktu {#step-16-deploy-our-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte do příkazového řádku a spusťte:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Poté byste měli vidět něco jako:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Tuto adresu si prosím uložte**. Budeme ji používat později v tutoriálu.

Pokud přejdeme na [Etherscan sítě Goerli](https://goerli.etherscan.io) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Transakce bude vypadat nějak takto:

![](./etherscan-contract.png)

Adresa `From` by se měla shodovat s adresou vašeho účtu MetaMask a adresa `To` bude uvádět **Contract Creation**. Pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli `To`.

![](./etherscan-transaction.png)

Gratulujeme! Právě jste nasadili chytrý kontrakt na testnet Etherea.

Abychom pochopili, jak to funguje uvnitř, přejděme na kartu Explorer na našem [řídicím panelu Alchemy](https://dashboard.alchemy.com/explorer). Pokud máte více aplikací Alchemy, nezapomeňte filtrovat podle aplikace a vybrat **Hello World**.

![](./hello-world-explorer.png)

Zde uvidíte hrstku metod JSON-RPC, které pro nás Hardhat/Ethers na pozadí vytvořily, když jsme zavolali funkci `.deploy()`. Dvě důležité metody jsou zde [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), což je požadavek na zápis našeho kontraktu do řetězce Goerli, a [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě hashe. Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [náš tutoriál o odesílání transakcí pomocí Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Část 2: Interakce s vaším chytrým kontraktem {#part-2-interact-with-your-smart-contract}

Nyní, když jsme úspěšně nasadili chytrý kontrakt do sítě Goerli, pojďme se naučit, jak s ním interagovat.

### Vytvořte soubor interact.js {#create-a-interactjs-file}

Toto je soubor, do kterého napíšeme náš interakční skript. Budeme používat knihovnu Ethers.js, kterou jste si nainstalovali v 1. části.

Ve složce `scripts/` vytvořte nový soubor s názvem `interact.js` a přidejte následující kód:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aktualizujte svůj soubor .env {#update-your-env-file}

Budeme používat nové proměnné prostředí, takže je musíme definovat v souboru `.env`, který [jsme vytvořili dříve](#step-11-connect-metamask-alchemy-to-your-project).

Budeme muset přidat definici pro náš Alchemy `API_KEY` a `CONTRACT_ADDRESS`, kam byl váš chytrý kontrakt nasazen.

Váš soubor `.env` by měl vypadat nějak takto:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Získejte ABI vašeho kontraktu {#grab-your-contract-abi}

Naše [ABI (Application Binary Interface)](/glossary/#abi) kontraktu je rozhraní pro interakci s naším chytrým kontraktem. Hardhat automaticky generuje ABI a ukládá ho do `HelloWorld.json`. Abychom mohli ABI použít, budeme muset analyzovat jeho obsah přidáním následujících řádků kódu do našeho souboru `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Pokud chcete vidět ABI, můžete si ho vypsat do konzole:

```javascript
console.log(JSON.stringify(contract.abi))
```

Chcete-li vidět své ABI vypsané v konzoli, přejděte do terminálu a spusťte:

```bash
npx hardhat run scripts/interact.js
```

### Vytvořte instanci vašeho kontraktu {#create-an-instance-of-your-contract}

Abychom mohli interagovat s naším kontraktem, musíme v našem kódu vytvořit instanci kontraktu. Abychom to mohli udělat pomocí Ethers.js, budeme muset pracovat se třemi koncepty:

1. Poskytovatel (poskytovatel) – poskytovatel uzlu, který vám dává přístup ke čtení a zápisu na blockchain
2. Podepisovatel (podepisovatel) – představuje účet Ethereum, který může podepisovat transakce
3. Contract (kontrakt) – objekt Ethers.js představující konkrétní kontrakt nasazený na blockchainu (onchain)

K vytvoření naší instance kontraktu použijeme ABI kontraktu z předchozího kroku:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Zjistěte více o poskytovatelích (Providers), podepisovatelích (Signers) a kontraktech (Contracts) v [dokumentaci ethers.js](https://docs.ethers.io/v5/).

### Přečtěte si inicializační zprávu {#read-the-init-message}

Pamatujete si, když jsme nasadili náš kontrakt s `initMessage = "Hello world!"`? Nyní si tuto zprávu uloženou v našem chytrém kontraktu přečteme a vypíšeme ji do konzole.

V JavaScriptu se při interakci se sítěmi používají asynchronní funkce. Chcete-li se o asynchronních funkcích dozvědět více, [přečtěte si tento článek na Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Použijte níže uvedený kód k zavolání funkce `message` v našem chytrém kontraktu a přečtení inicializační zprávy:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Po spuštění souboru pomocí `npx hardhat run scripts/interact.js` v terminálu bychom měli vidět tuto odpověď:

```
Zpráva je: Hello world!
```

Gratulujeme! Právě jste úspěšně přečetli data chytrého kontraktu z blockchainu Ethereum, jen tak dál!

### Aktualizujte zprávu {#update-the-message}

Místo pouhého čtení zprávy můžeme zprávu uloženou v našem chytrém kontraktu také aktualizovat pomocí funkce `update`! Docela super, že?

Pro aktualizaci zprávy můžeme přímo zavolat funkci `update` na našem instancovaném objektu Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Všimněte si, že na řádku 11 voláme `.wait()` na vráceném objektu transakce. To zajišťuje, že náš skript před ukončením funkce počká, až bude transakce vytěžena na blockchainu. Pokud volání `.wait()` není zahrnuto, skript nemusí v kontraktu vidět aktualizovanou hodnotu `message`.

### Přečtěte si novou zprávu {#read-the-new-message}

Měli byste být schopni zopakovat [předchozí krok](#read-the-init-message) a přečíst aktualizovanou hodnotu `message`. Udělejte si chvilku a zjistěte, zda dokážete provést změny potřebné k vypsání této nové hodnoty!

Pokud potřebujete nápovědu, zde je ukázka, jak by měl váš soubor `interact.js` v tuto chvíli vypadat:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// poskytovatel - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// podepisovatel - vy
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instance kontraktu
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Nyní stačí skript spustit a ve vašem terminálu byste měli vidět vypsanou starou zprávu, stav aktualizace a novou zprávu!

`npx hardhat run scripts/interact.js --network goerli`

```
Zpráva je: Hello World!
Aktualizuje se zpráva...
Nová zpráva je: This is the new message.
```

Při spouštění tohoto skriptu si můžete všimnout, že krok `Updating the message...` chvíli trvá, než se načte nová zpráva. Je to způsobeno procesem těžby; pokud vás zajímá sledování transakcí během jejich těžby, navštivte [mempool Alchemy](https://dashboard.alchemyapi.io/mempool), kde uvidíte stav transakce. Pokud je transakce zahozena, je také užitečné zkontrolovat [Goerli Etherscan](https://goerli.etherscan.io) a vyhledat hash vaší transakce.

## Část 3: Publikování vašeho chytrého kontraktu na Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Odvedli jste spoustu těžké práce, abyste svůj chytrý kontrakt oživili; teď je čas se o něj podělit se světem!

Ověřením vašeho chytrého kontraktu na Etherscanu si kdokoli může prohlédnout váš zdrojový kód a s vaším chytrým kontraktem interagovat. Pojďme na to!

### Krok 1: Vygenerování API klíče na vašem účtu Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

API klíč Etherscanu je nezbytný k ověření, že vlastníte chytrý kontrakt, který se snažíte publikovat.

Pokud ještě nemáte účet na Etherscanu, [zaregistrujte se](https://etherscan.io/register).

Po přihlášení najděte své uživatelské jméno v navigačním panelu, najeďte na něj myší a vyberte tlačítko **My profile**.

Na stránce svého profilu byste měli vidět boční navigační panel. Z bočního navigačního panelu vyberte **API Keys**. Dále stiskněte tlačítko „Add“ pro vytvoření nového API klíče, pojmenujte svou aplikaci **hello-world** a stiskněte tlačítko **Create New API Key**.

Váš nový API klíč by se měl objevit v tabulce API klíčů. Zkopírujte si API klíč do schránky.

Dále musíme přidat API klíč Etherscanu do našeho souboru `.env`.

Po jeho přidání by měl váš soubor `.env` vypadat takto:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Chytré kontrakty nasazené pomocí Hardhat {#hardhat-deployed-smart-contracts}

#### Instalace hardhat-etherscan {#install-hardhat-etherscan}

Publikování vašeho kontraktu na Etherscan pomocí Hardhat je přímočaré. Abyste mohli začít, budete nejprve muset nainstalovat plugin `hardhat-etherscan`. `hardhat-etherscan` automaticky ověří zdrojový kód chytrého kontraktu a ABI na Etherscanu. Pro jeho přidání spusťte v adresáři `hello-world`:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Po instalaci vložte následující příkaz na začátek vašeho `hardhat.config.js` a přidejte možnosti konfigurace Etherscanu:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Váš API klíč pro Etherscan
    // Získejte ho na https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Ověření vašeho chytrého kontraktu na Etherscanu {#verify-your-smart-contract-on-etherscan}

Ujistěte se, že jsou všechny soubory uloženy a všechny proměnné `.env` jsou správně nakonfigurovány.

Spusťte úlohu `verify` a předejte adresu kontraktu a síť, do které je nasazen:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Ujistěte se, že `DEPLOYED_CONTRACT_ADDRESS` je adresa vašeho nasazeného chytrého kontraktu v testnetu Goerli. Také poslední argument (`'Hello World!'`) musí být stejná textová hodnota, jaká byla použita [během kroku nasazení v části 1](#step-15-write-our-deploy-script).

Pokud vše půjde dobře, uvidíte ve svém terminálu následující zprávu:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Gratulujeme! Kód vašeho chytrého kontraktu je na Etherscanu!

### Prohlédněte si svůj chytrý kontrakt na Etherscanu! {#check-out-your-smart-contract-on-etherscan}

Když přejdete na odkaz uvedený ve vašem terminálu, měli byste vidět kód vašeho chytrého kontraktu a ABI publikované na Etherscanu!

**Paráda – zvládli jste to, šampioni! Nyní může kdokoli volat nebo zapisovat do vašeho chytrého kontraktu! Nemůžeme se dočkat, až uvidíme, co vytvoříte příště!**

## Část 4 – Integrace vašeho chytrého kontraktu s frontendem {#part-4-integrating-your-smart-contract-with-the-frontend}

Na konci tohoto tutoriálu budete vědět, jak:

- Připojit peněženku MetaMask k vaší decentralizované aplikaci (dapp)
- Číst data z vašeho chytrého kontraktu pomocí API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Podepisovat transakce na Ethereu pomocí MetaMasku

Pro tuto dapp budeme jako náš frontendový framework používat [React](https://react.dev/); je však důležité poznamenat, že nebudeme trávit mnoho času rozebíráním jeho základů, protože se zaměříme hlavně na to, jak do našeho projektu přinést funkcionalitu Web3.

Jako předpoklad byste měli mít alespoň začátečnické znalosti Reactu. Pokud je nemáte, doporučujeme dokončit oficiální [tutoriál Úvod do Reactu](https://react.dev/learn).

### Klonování startovacích souborů {#clone-the-starter-files}

Nejprve přejděte do [repozitáře hello-world-part-four na GitHubu](https://github.com/alchemyplatform/hello-world-part-four-tutorial), kde získáte startovací soubory pro tento projekt, a naklonujte si tento repozitář do svého lokálního počítače.

Otevřete naklonovaný repozitář lokálně. Všimněte si, že obsahuje dvě složky: `starter-files` a `completed`.

- `starter-files` – **v tomto adresáři budeme pracovat**, propojíme uživatelské rozhraní (UI) s vaší peněženkou na Ethereu a chytrým kontraktem, který jsme publikovali na Etherscanu ve [3. části](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` obsahuje celý dokončený tutoriál a měl by sloužit pouze jako reference, pokud se zaseknete.

Dále si otevřete svou kopii `starter-files` ve svém oblíbeném editoru kódu a přejděte do složky `src`.

Veškerý kód, který napíšeme, se bude nacházet ve složce `src`. Budeme upravovat komponentu `HelloWorld.js` a soubory JavaScriptu `util/interact.js`, abychom našemu projektu dodali funkcionalitu Web3.

### Prohlídka startovacích souborů {#check-out-the-starter-files}

Než začneme programovat, pojďme prozkoumat, co nám startovací soubory nabízejí.

#### Spuštění vašeho projektu v Reactu {#get-your-react-project-running}

Začněme spuštěním projektu v Reactu v našem prohlížeči. Krása Reactu spočívá v tom, že jakmile máme projekt spuštěný v prohlížeči, jakékoli uložené změny se v něm živě aktualizují.

Chcete-li projekt spustit, přejděte do kořenového adresáře složky `starter-files` a ve svém terminálu spusťte `npm install`, abyste nainstalovali závislosti projektu:

```bash
cd starter-files
npm install
```

Jakmile se instalace dokončí, spusťte ve svém terminálu `npm start`:

```bash
npm start
```

Tím by se mělo ve vašem prohlížeči otevřít [http://localhost:3000/](http://localhost:3000/), kde uvidíte frontend našeho projektu. Měl by se skládat z jednoho pole (místo pro aktualizaci zprávy uložené ve vašem chytrém kontraktu), tlačítka „Connect Wallet“ (Připojit peněženku) a tlačítka „Update“ (Aktualizovat).

Pokud zkusíte kliknout na některé z tlačítek, všimnete se, že nefungují – to proto, že jejich funkcionalitu musíme teprve naprogramovat.

#### Komponenta `HelloWorld.js` {#the-helloworld-js-component}

Vraťme se v našem editoru do složky `src` a otevřeme soubor `HelloWorld.js`. Je nesmírně důležité, abychom všemu v tomto souboru rozuměli, protože se jedná o hlavní komponentu Reactu, na které budeme pracovat.

Na začátku tohoto souboru si všimnete několika příkazů import, které jsou nezbytné pro spuštění našeho projektu, včetně knihovny React, hooků useEffect a useState, některých položek z `./util/interact.js` (brzy je popíšeme podrobněji!) a loga Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Dále tu máme naše stavové proměnné, které budeme aktualizovat po specifických událostech.

```javascript
// HelloWorld.js

//Stavové proměnné
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Zde je to, co každá z proměnných představuje:

- `walletAddress` – řetězec, který ukládá adresu peněženky uživatele
- `status` – řetězec, který ukládá užitečnou zprávu, jež uživatele navádí, jak s dapp interagovat
- `message` – řetězec, který ukládá aktuální zprávu v chytrém kontraktu
- `newMessage` – řetězec, který ukládá novou zprávu, jež bude zapsána do chytrého kontraktu

Za stavovými proměnnými uvidíte pět neimplementovaných funkcí: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` a `onUpdatePressed`. Níže si vysvětlíme, co dělají:

```javascript
// HelloWorld.js

//voláno pouze jednou
useEffect(async () => {
  //TODO: implementovatovatovatovatovat
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – toto je hook Reactu, který se volá po vykreslení vaší komponenty. Protože je mu předáno prázdné pole `[]` (viz řádek 4), bude zavolán pouze při _prvním_ vykreslení komponenty. Zde načteme aktuální zprávu uloženou v našem chytrém kontraktu, zavoláme posluchače (listeners) našeho chytrého kontraktu a peněženky a aktualizujeme naše UI tak, aby odráželo, zda je peněženka již připojena.
- `addSmartContractListener` – tato funkce nastaví posluchače, který bude sledovat událost `UpdatedMessages` našeho kontraktu HelloWorld a aktualizuje naše UI, když se zpráva v našem chytrém kontraktu změní.
- `addWalletListener` – tato funkce nastaví posluchače, který detekuje změny ve stavu uživatelovy peněženky MetaMask, například když uživatel odpojí svou peněženku nebo přepne adresy.
- `connectWalletPressed` – tato funkce bude zavolána pro připojení uživatelovy peněženky MetaMask k naší dapp.
- `onUpdatePressed` – tato funkce bude zavolána, když bude chtít uživatel aktualizovat zprávu uloženou v chytrém kontraktu.

Ke konci tohoto souboru máme UI naší komponenty.

```javascript
// HelloWorld.js

//UI naší komponenty
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Pokud si tento kód pečlivě prohlédnete, všimnete si, kde v našem UI používáme naše různé stavové proměnné:

- Na řádcích 6–12, pokud je uživatelova peněženka připojena (tj. `walletAddress.length > 0`), zobrazíme zkrácenou verzi uživatelovy `walletAddress` v tlačítku s ID „walletButton“; v opačném případě je tam jednoduše napsáno „Connect Wallet“.
- Na řádku 17 zobrazujeme aktuální zprávu uloženou v chytrém kontraktu, která je zachycena v řetězci `message`.
- Na řádcích 23–26 používáme [řízenou komponentu](https://legacy.reactjs.org/docs/forms.html#controlled-components) k aktualizaci naší stavové proměnné `newMessage`, když se změní vstup v textovém poli.

Kromě našich stavových proměnných také uvidíte, že funkce `connectWalletPressed` a `onUpdatePressed` jsou volány při kliknutí na tlačítka s ID `publishButton` a `walletButton`.

Nakonec se podívejme, kam je tato komponenta `HelloWorld.js` přidána.

Pokud přejdete do souboru `App.js`, což je hlavní komponenta v Reactu, která funguje jako kontejner pro všechny ostatní komponenty, uvidíte, že naše komponenta `HelloWorld.js` je vložena na řádku 7.

V neposlední řadě se podívejme na ještě jeden soubor, který máte k dispozici, soubor `interact.js`.

#### Soubor `interact.js` {#the-interact-js-file}

Protože se chceme držet paradigmatu [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), budeme chtít samostatný soubor, který obsahuje všechny naše funkce pro správu logiky, dat a pravidel naší dapp, a poté budeme moci tyto funkce exportovat do našeho frontendu (naší komponenty `HelloWorld.js`).

👆🏽Přesně k tomuto účelu slouží náš soubor `interact.js`!

Přejděte do složky `util` ve vašem adresáři `src` a všimnete si, že jsme zahrnuli soubor s názvem `interact.js`, který bude obsahovat všechny naše interakce s chytrým kontraktem a funkce a proměnné peněženky.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Na začátku souboru si všimnete, že jsme zakomentovali objekt `helloWorldContract`. Později v tomto tutoriálu tento objekt odkomentujeme a instancujeme náš chytrý kontrakt v této proměnné, kterou pak exportujeme do naší komponenty `HelloWorld.js`.

Čtyři neimplementované funkce za naším objektem `helloWorldContract` dělají následující:

- `loadCurrentMessage` – tato funkce zpracovává logiku načítání aktuální zprávy uložené v chytrém kontraktu. Provede volání pro _čtení_ z chytrého kontraktu Hello World pomocí [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` – tato funkce připojí uživatelův MetaMask k naší dapp.
- `getCurrentWalletConnected` – tato funkce při načtení stránky zkontroluje, zda je k naší dapp již připojen účet na Ethereu, a podle toho aktualizuje naše UI.
- `updateMessage` – tato funkce aktualizuje zprávu uloženou v chytrém kontraktu. Provede volání pro _zápis_ do chytrého kontraktu Hello World, takže uživatelova peněženka MetaMask bude muset podepsat transakci na Ethereu, aby se zpráva aktualizovala.

Nyní, když rozumíme tomu, s čím pracujeme, pojďme zjistit, jak číst z našeho chytrého kontraktu!

### Krok 3: Čtení z vašeho chytrého kontraktu {#step-3-read-from-your-smart-contract}

Abyste mohli číst ze svého chytrého kontraktu, budete muset úspěšně nastavit:

- Připojení API k řetězci Etherea
- Načtenou instanci vašeho chytrého kontraktu
- Funkci pro volání funkce vašeho chytrého kontraktu
- Posluchače, který bude sledovat aktualizace, když se data, která čtete z chytrého kontraktu, změní

Může to znít jako spousta kroků, ale nebojte se! Provedeme vás tím, jak udělat každý z nich krok za krokem! :)

#### Vytvoření připojení API k řetězci Etherea {#establish-an-api-connection-to-the-ethereum-chain}

Pamatujete si, jak jsme ve 2. části tohoto tutoriálu použili náš [klíč Alchemy Web3 ke čtení z našeho chytrého kontraktu](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Klíč Alchemy Web3 budete potřebovat i ve své dapp, abyste mohli číst z řetězce.

Pokud jej ještě nemáte, nejprve si nainstalujte [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) tak, že přejdete do kořenového adresáře vašeho `starter-files` a ve svém terminálu spustíte následující:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) je wrapper kolem [Web3.js](https://docs.web3js.org/), který poskytuje vylepšené metody API a další klíčové výhody, jež vám usnadní život jako vývojáři Web3. Je navržen tak, aby vyžadoval minimální konfiguraci, takže jej můžete začít používat ve své aplikaci hned teď!

Poté si do adresáře projektu nainstalujte balíček [dotenv](https://www.npmjs.com/package/dotenv), abychom měli bezpečné místo pro uložení našeho klíče API poté, co jej získáme.

```text
npm install dotenv --save
```

Pro naši dapp **budeme používat náš klíč Websockets API** místo našeho klíče HTTP API, protože nám to umožní nastavit posluchače, který detekuje, když se zpráva uložená v chytrém kontraktu změní.

Jakmile budete mít svůj klíč API, vytvořte ve svém kořenovém adresáři soubor `.env` a přidejte do něj svou URL adresu Alchemy Websockets. Poté by měl váš soubor `.env` vypadat takto:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<klíč>
```

Nyní jsme připraveni nastavit náš koncový bod Alchemy Web3 v naší dapp! Vraťme se k našemu `interact.js`, který je vnořený do naší složky `util`, a přidejme na začátek souboru následující kód:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Výše jsme nejprve importovali klíč Alchemy z našeho souboru `.env` a poté jsme předali náš `alchemyKey` do `createAlchemyWeb3`, abychom vytvořili náš koncový bod Alchemy Web3.

S tímto připraveným koncovým bodem je čas načíst náš chytrý kontrakt!

#### Načtení vašeho chytrého kontraktu Hello World {#loading-your-hello-world-smart-contract}

K načtení vašeho chytrého kontraktu Hello World budete potřebovat adresu jeho kontraktu a ABI, obojí lze najít na Etherscanu, pokud jste dokončili [3. část tohoto tutoriálu.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Jak získat ABI vašeho kontraktu z Etherscanu {#how-to-get-your-contract-abi-from-etherscan}

Pokud jste 3. část tohoto tutoriálu přeskočili, můžete použít kontrakt HelloWorld s adresou [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Jeho ABI naleznete [zde](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontraktu je nezbytné pro specifikaci toho, kterou funkci kontrakt vyvolá, a také pro zajištění toho, že funkce vrátí data ve formátu, který očekáváte. Jakmile zkopírujeme ABI našeho kontraktu, uložme jej jako soubor JSON s názvem `contract-abi.json` ve vašem adresáři `src`.

Váš contract-abi.json by měl být uložen ve vaší složce src.

Vyzbrojeni adresou našeho kontraktu, ABI a koncovým bodem Alchemy Web3 můžeme použít [metodu contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) k načtení instance našeho chytrého kontraktu. Importujte ABI vašeho kontraktu do souboru `interact.js` a přidejte adresu vašeho kontraktu.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Nyní můžeme konečně odkomentovat naši proměnnou `helloWorldContract` a načíst chytrý kontrakt pomocí našeho koncového bodu AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Abychom to shrnuli, prvních 12 řádků vašeho `interact.js` by nyní mělo vypadat takto:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Nyní, když máme náš kontrakt načtený, můžeme implementovat naši funkci `loadCurrentMessage`!

#### Implementace `loadCurrentMessage` ve vašem souboru `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Tato funkce je super jednoduchá. Provedeme jednoduché asynchronní volání web3 pro čtení z našeho kontraktu. Naše funkce vrátí zprávu uloženou v chytrém kontraktu:

Aktualizujte `loadCurrentMessage` ve vašem souboru `interact.js` na následující:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Protože chceme tento chytrý kontrakt zobrazit v našem UI, aktualizujme funkci `useEffect` v naší komponentě `HelloWorld.js` na následující:

```javascript
// HelloWorld.js

//voláno pouze jednou
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Všimněte si, že chceme, aby se naše `loadCurrentMessage` zavolala pouze jednou během prvního vykreslení komponenty. Brzy implementujeme `addSmartContractListener`, abychom automaticky aktualizovali UI poté, co se zpráva v chytrém kontraktu změní.

Než se ponoříme do našeho posluchače, pojďme se podívat, co zatím máme! Uložte své soubory `HelloWorld.js` a `interact.js` a poté přejděte na [http://localhost:3000/](http://localhost:3000/)

Všimnete si, že aktuální zpráva už neříká „No connection to the network“ (Žádné připojení k síti). Místo toho odráží zprávu uloženou v chytrém kontraktu. Paráda!

#### Vaše UI by nyní mělo odrážet zprávu uloženou v chytrém kontraktu {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

A když už mluvíme o tom posluchači...

#### Implementace `addSmartContractListener` {#implement-addsmartcontractlistener}

Pokud si vzpomenete na soubor `HelloWorld.sol`, který jsme napsali v [1. části této série tutoriálů](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), vybavíte si, že existuje událost chytrého kontraktu s názvem `UpdatedMessages`, která je emitována po vyvolání funkce `update` našeho chytrého kontraktu (viz řádky 9 a 27):

```javascript
// HelloWorld.sol

// Určuje verzi Solidity pomocí sémantického verzování.
// Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je sbírka funkcí a dat (jeho stavu). Po nasazení se kontrakt nachází na konkrétní adrese na blockchainu Etherea. Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitováno při volání funkce update
   //Události chytrého kontraktu jsou způsob, jakým váš kontrakt komunikuje s frontendem vaší aplikace o tom, že se na blockchainu něco stalo. Frontend může určitým událostem „naslouchat“ a po jejich výskytu provést akci.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu a vytváří funkci, kterou mohou volat jiné kontrakty nebo klienti pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha třídně orientovaných objektových jazycích je konstruktor speciální funkce, která se provede pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá řetězcový argument `initMessage` a nastaví hodnotu do proměnné úložiště `message` kontraktu).
      message = initMessage;
   }

   // Veřejná funkce, která přijímá řetězcový argument a aktualizuje proměnnou úložiště `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Události chytrého kontraktu jsou způsobem, jakým váš kontrakt komunikuje vaší front-endové aplikaci, že se na blockchainu něco stalo (tj. došlo k _události_), a ta může „naslouchat“ specifickým událostem a podniknout kroky, když k nim dojde.

Funkce `addSmartContractListener` bude specificky naslouchat události `UpdatedMessages` našeho chytrého kontraktu Hello World a aktualizuje naše UI tak, aby zobrazovalo novou zprávu.

Upravte `addSmartContractListener` na následující:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Pojďme si rozebrat, co se stane, když posluchač detekuje událost:

- Pokud při emitování události dojde k chybě, projeví se to v UI prostřednictvím naší stavové proměnné `status`.
- V opačném případě použijeme vrácený objekt `data`. `data.returnValues` je pole indexované od nuly, kde první prvek v poli ukládá předchozí zprávu a druhý prvek ukládá tu aktualizovanou. Celkově při úspěšné události nastavíme náš řetězec `message` na aktualizovanou zprávu, vymažeme řetězec `newMessage` a aktualizujeme naši stavovou proměnnou `status` tak, aby odrážela, že na našem chytrém kontraktu byla publikována nová zpráva.

Nakonec zavolejme našeho posluchače v naší funkci `useEffect`, aby se inicializoval při prvním vykreslení komponenty `HelloWorld.js`. Celkově by vaše funkce `useEffect` měla vypadat takto:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Nyní, když jsme schopni číst z našeho chytrého kontraktu, bylo by skvělé přijít na to, jak do něj také zapisovat! Abychom však mohli do naší dapp zapisovat, musíme k ní mít nejprve připojenou peněženku na Ethereu.

Takže dále se vrhneme na nastavení naší peněženky na Ethereu (MetaMask) a její následné připojení k naší dapp!

### Krok 4: Nastavení vaší peněženky na Ethereu {#step-4-set-up-your-ethereum-wallet}

Aby uživatelé mohli zapsat cokoli do řetězce Etherea, musí podepisovat transakce pomocí soukromých klíčů své virtuální peněženky. Pro tento tutoriál použijeme [MetaMask](https://metamask.io/), virtuální peněženku v prohlížeči, která se používá ke správě adresy vašeho účtu na Ethereu, protože koncovému uživateli toto podepisování transakcí nesmírně usnadňuje.

Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/) od Ethereum Foundation.

#### Stažení MetaMasku {#download-metamask}

MetaMask si můžete zdarma stáhnout a vytvořit si účet [zde](https://metamask.io/download). Když si vytváříte účet, nebo pokud již účet máte, nezapomeňte se vpravo nahoře přepnout na „Goerli Test Network“ (abychom nepracovali se skutečnými penězi).

#### Přidání etheru z faucetu {#add-ether-from-a-faucet}

K podepsání transakce na blockchainu Etherea budeme potřebovat nějaké falešné ETH. Chcete-li získat ETH, můžete přejít na [FaucETH](https://fauceth.komputing.org) a zadat adresu svého účtu na Goerli, kliknout na „Request funds“ (Požádat o prostředky), poté v rozbalovací nabídce vybrat „Ethereum Testnet Goerli“ a nakonec znovu kliknout na tlačítko „Request funds“. Brzy poté byste měli vidět ETH na svém účtu MetaMask!

#### Kontrola vašeho zůstatku {#check-your-balance}

Abychom si ověřili, že tam náš zůstatek je, proveďme požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje composer od Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). To vrátí množství ETH v naší peněžence. Poté, co zadáte adresu svého účtu MetaMask a kliknete na „Send Request“ (Odeslat požadavek), měli byste vidět odpověď jako je tato:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**POZNÁMKA:** Tento výsledek je ve wei, nikoli v ETH. Wei se používá jako nejmenší nominální hodnota etheru. Převod z wei na ETH je: 1 ETH = 10¹⁸ wei. Pokud tedy převedeme 0xde0b6b3a7640000 do desítkové soustavy, dostaneme 1\*10¹⁸, což se rovná 1 ETH.

Uf! Naše falešné peníze jsou všechny tam! 🤑

### Krok 5: Připojení MetaMasku k vašemu UI {#step-5-connect-metamask-to-your-ui}

Nyní, když je naše peněženka MetaMask nastavena, připojme k ní naši dapp!

#### Funkce `connectWallet` {#the-connectwallet-function}

V našem souboru `interact.js` implementujme funkci `connectWallet`, kterou pak můžeme zavolat v naší komponentě `HelloWorld.js`.

Upravme `connectWallet` na následující:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Co tedy tento obří blok kódu přesně dělá?

Nejprve zkontroluje, zda je ve vašem prohlížeči povoleno `window.ethereum`.

`window.ethereum` je globální API vkládané MetaMaskem a dalšími poskytovateli peněženek, které umožňuje webovým stránkám vyžádat si účty uživatelů na Ethereu. Pokud je to schváleno, může číst data z blockchainů, ke kterým je uživatel připojen, a navrhovat uživateli podepisování zpráv a transakcí. Pro více informací se podívejte do [dokumentace MetaMasku](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Pokud `window.ethereum` _není_ přítomno, znamená to, že MetaMask není nainstalován. Výsledkem je vrácení objektu JSON, kde vrácená `address` je prázdný řetězec a objekt JSX `status` sděluje, že si uživatel musí nainstalovat MetaMask.

Pokud _je_ `window.ethereum` přítomno, pak to začíná být zajímavé.

Pomocí bloku try/catch se pokusíme připojit k MetaMasku zavoláním [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Zavolání této funkce otevře MetaMask v prohlížeči, čímž bude uživatel vyzván k připojení své peněženky k vaší dapp.

- Pokud se uživatel rozhodne připojit, `method: "eth_requestAccounts"` vrátí pole, které obsahuje všechny adresy uživatelových účtů, jež se připojily k dapp. Celkově naše funkce `connectWallet` vrátí objekt JSON, který obsahuje _první_ `address` v tomto poli (viz řádek 9) a zprávu `status`, která uživatele vyzývá k zapsání zprávy do chytrého kontraktu.
- Pokud uživatel připojení odmítne, pak bude objekt JSON obsahovat prázdný řetězec pro vrácenou `address` a zprávu `status`, která odráží, že uživatel připojení odmítl.

Nyní, když jsme napsali tuto funkci `connectWallet`, je dalším krokem její zavolání v naší komponentě `HelloWorld.js`.

#### Přidání funkce `connectWallet` do vaší UI komponenty `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Přejděte k funkci `connectWalletPressed` v `HelloWorld.js` a aktualizujte ji na následující:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Všimli jste si, jak je většina naší funkcionality abstrahována od naší komponenty `HelloWorld.js` ze souboru `interact.js`? Je to proto, abychom dodrželi paradigma M-V-C!

V `connectWalletPressed` jednoduše provedeme volání await na naši importovanou funkci `connectWallet` a pomocí její odpovědi aktualizujeme naše proměnné `status` a `walletAddress` prostřednictvím jejich stavových hooků.

Nyní uložme oba soubory (`HelloWorld.js` a `interact.js`) a otestujme naše dosavadní UI.

Otevřete svůj prohlížeč na stránce [http://localhost:3000/](http://localhost:3000/) a stiskněte tlačítko „Connect Wallet“ vpravo nahoře na stránce.

Pokud máte nainstalovaný MetaMask, měli byste být vyzváni k připojení vaší peněženky k vaší dapp. Přijměte pozvání k připojení.

Měli byste vidět, že tlačítko peněženky nyní odráží, že je vaše adresa připojena! Jupííí 🔥

Dále zkuste obnovit stránku... to je zvláštní. Naše tlačítko peněženky nás vyzývá k připojení MetaMasku, i když už je připojený...

Nicméně, nemějte strach! Můžeme to snadno vyřešit implementací `getCurrentWalletConnected`, která zkontroluje, zda je adresa již připojena k naší dapp, a podle toho aktualizuje naše UI!

#### Funkce `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Aktualizujte svou funkci `getCurrentWalletConnected` v souboru `interact.js` na následující:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Tento kód je _velmi_ podobný funkci `connectWallet`, kterou jsme právě napsali v předchozím kroku.

Hlavní rozdíl je v tom, že místo volání metody `eth_requestAccounts`, která otevře MetaMask, aby uživatel mohl připojit svou peněženku, zde voláme metodu `eth_accounts`, která jednoduše vrátí pole obsahující adresy MetaMasku aktuálně připojené k naší dapp.

Abychom viděli tuto funkci v akci, zavolejme ji v naší funkci `useEffect` naší komponenty `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Všimněte si, že používáme odpověď našeho volání `getCurrentWalletConnected` k aktualizaci našich stavových proměnných `walletAddress` a `status`.

Nyní, když jste přidali tento kód, zkusme obnovit okno našeho prohlížeče.

Paráda! Tlačítko by mělo říkat, že jste připojeni, a zobrazovat náhled adresy vaší připojené peněženky – a to i po obnovení!

#### Implementace `addWalletListener` {#implement-addwalletlistener}

Posledním krokem v nastavení peněženky naší dapp je implementace posluchače peněženky, aby se naše UI aktualizovalo, když se změní stav naší peněženky, například když se uživatel odpojí nebo přepne účty.

Ve svém souboru `HelloWorld.js` upravte svou funkci `addWalletListener` následovně:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Vsadím se, že v tuto chvíli už ani nepotřebujete naši pomoc, abyste pochopili, co se tu děje, ale pro úplnost si to pojďme rychle rozebrat:

- Nejprve naše funkce zkontroluje, zda je povoleno `window.ethereum` (tj. zda je nainstalován MetaMask).
  - Pokud není, jednoduše nastavíme naši stavovou proměnnou `status` na řetězec JSX, který uživatele vyzve k instalaci MetaMasku.
  - Pokud je povoleno, nastavíme na řádku 3 posluchače `window.ethereum.on("accountsChanged")`, který naslouchá změnám stavu v peněžence MetaMask, což zahrnuje situace, kdy uživatel připojí k dapp další účet, přepne účty nebo účet odpojí. Pokud je připojen alespoň jeden účet, stavová proměnná `walletAddress` se aktualizuje jako první účet v poli `accounts` vráceném posluchačem. V opačném případě je `walletAddress` nastavena jako prázdný řetězec.

V neposlední řadě ji musíme zavolat v naší funkci `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

A to je vše! Úspěšně jsme dokončili programování veškeré funkcionality naší peněženky! Nyní k našemu poslednímu úkolu: aktualizaci zprávy uložené v našem chytrém kontraktu!

### Krok 6: Implementace funkce `updateMessage` {#step-6-implement-the-updatemessage-function}

Tak jo, lidi, jsme v cílové rovince! Ve funkci `updateMessage` vašeho souboru `interact.js` uděláme následující:

1. Ujistíme se, že zpráva, kterou chceme publikovat v našem chytrém kontraktu, je platná
2. Podepíšeme naši transakci pomocí MetaMasku
3. Zavoláme tuto funkci z naší frontendové komponenty `HelloWorld.js`

Nebude to trvat dlouho; pojďme tuto dapp dokončit!

#### Zpracování chyb vstupu {#input-error-handling}

Přirozeně dává smysl mít na začátku funkce nějaký druh zpracování chyb vstupu.

Budeme chtít, aby se naše funkce vrátila předčasně, pokud není nainstalováno rozšíření MetaMask, není připojena žádná peněženka (tj. předaná `address` je prázdný řetězec) nebo je `message` prázdný řetězec. Přidejme do `updateMessage` následující zpracování chyb:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Nyní, když má správné zpracování chyb vstupu, je čas podepsat transakci přes MetaMask!

#### Podepsání naší transakce {#signing-our-transaction}

Pokud jste již obeznámeni s tradičními transakcemi na Ethereu ve Web3, kód, který napíšeme dále, vám bude velmi povědomý. Pod kód pro zpracování chyb vstupu přidejte do `updateMessage` následující:

```javascript
// interact.js

//nastavení parametrů transakce
const transactionParameters = {
  to: contractAddress, // Vyžadováno kromě publikování kontraktu.
  from: address, // musí odpovídat aktivní adrese uživatele.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//podepsat transakci
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Pojďme si rozebrat, co se děje. Nejprve nastavíme parametry naší transakce, kde:

- `to` specifikuje adresu příjemce (náš chytrý kontrakt)
- `from` specifikuje podepisujícího transakce, proměnnou `address`, kterou jsme předali do naší funkce
- `data` obsahuje volání metody `update` našeho chytrého kontraktu Hello World, která jako vstup přijímá naši řetězcovou proměnnou `message`

Poté provedeme volání await, `window.ethereum.request`, kde požádáme MetaMask o podepsání transakce. Všimněte si, že na řádcích 11 a 12 specifikujeme naši metodu eth, `eth_sendTransaction`, a předáváme naše `transactionParameters`.

V tomto okamžiku se v prohlížeči otevře MetaMask a vyzve uživatele k podepsání nebo odmítnutí transakce.

- Pokud je transakce úspěšná, funkce vrátí objekt JSON, kde řetězec JSX `status` vyzve uživatele, aby se podíval na Etherscan pro více informací o své transakci.
- Pokud transakce selže, funkce vrátí objekt JSON, kde řetězec `status` předá chybovou zprávu.

Celkově by naše funkce `updateMessage` měla vypadat takto:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //zpracování chyb vstupu
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //nastavení parametrů transakce
  const transactionParameters = {
    to: contractAddress, // Vyžadováno kromě publikování kontraktu.
    from: address, // musí odpovídat aktivní adrese uživatele.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //podepsat transakci
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

V neposlední řadě musíme propojit naši funkci `updateMessage` s naší komponentou `HelloWorld.js`.

#### Propojení `updateMessage` s frontendem `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Naše funkce `onUpdatePressed` by měla provést volání await na importovanou funkci `updateMessage` a upravit stavovou proměnnou `status` tak, aby odrážela, zda naše transakce byla úspěšná nebo selhala:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Je to super čisté a jednoduché. A hádejte co... VAŠE DAPP JE HOTOVÁ!!!

Běžte do toho a vyzkoušejte tlačítko **Update**!

### Vytvořte si vlastní dapp {#make-your-own-custom-dapp}

Jupííí, dostali jste se na konec tutoriálu! Abychom to shrnuli, naučili jste se, jak:

- Připojit peněženku MetaMask k vašemu projektu dapp
- Číst data z vašeho chytrého kontraktu pomocí API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Podepisovat transakce na Ethereu pomocí MetaMasku

Nyní jste plně vybaveni k tomu, abyste uplatnili dovednosti z tohoto tutoriálu k vybudování vlastního projektu dapp! Jako vždy, pokud máte nějaké dotazy, neváhejte se na nás obrátit s prosbou o pomoc na [Discordu Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Jakmile tento tutoriál dokončíte, dejte nám vědět, jaká byla vaše zkušenost, nebo pokud máte nějakou zpětnou vazbu, označte nás na Twitteru [@alchemyplatform](https://twitter.com/AlchemyPlatform)!