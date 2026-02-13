---
title: "Chytrý kontrakt Hello World pro začátečníky – Fullstack"
description: "Úvodní tutoriál k psaní a nasazení jednoduchého chytrého kontraktu na Ethereum."
author: "nstrike2"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "smart kontrakt účty",
    "nasazování",
    "průzkumník bloků",
    "frontend",
    "transakce"
  ]
skill: beginner
lang: cs
published: 2021-10-25
---

Tento průvodce je pro vás, pokud jste v blockchainovém vývoji nováčkem a nevíte, kde začít nebo jak nasadit chytré kontrakty a interagovat s nimi. Projdeme si vytvoření a nasazení jednoduchého chytrého kontraktu v testovací síti Goerli pomocí [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) a [Alchemy](https://alchemy.com/eth).

K dokončení tohoto tutoriálu budete potřebovat účet Alchemy. [Zaregistrujte si bezplatný účet](https://www.alchemy.com/).

Pokud budete mít kdykoli nějaké otázky, neváhejte se na nás obrátit na [Discordu Alchemy](https://discord.gg/gWuC7zB)!

## Část 1 – Vytvoření a nasazení chytrého kontraktu pomocí Hardhat {#part-1}

### Připojení k síti Ethereum {#connect-to-the-ethereum-network}

Existuje mnoho způsobů, jak posílat požadavky na blockchain Etherea. Pro zjednodušení použijeme bezplatný účet na Alchemy, vývojářské platformě a API pro blockchain, která nám umožňuje komunikovat s ethereovým chainem, aniž bychom museli sami provozovat uzel. Alchemy má také vývojářské nástroje pro monitorování a analýzu; v tomto tutoriálu je využijeme, abychom pochopili, co se děje pod pokličkou při nasazení našeho chytrého kontraktu.

### Vytvoření aplikace a klíče API {#create-your-app-and-api-key}

Jakmile si vytvoříte účet Alchemy, můžete si vygenerovat API klíč vytvořením aplikace. To vám umožní zadávat požadavky do testovací sítě Goerli. Pokud testovací sítě neznáte, můžete si přečíst [průvodce Alchemy výběrem sítě](https://www.alchemy.com/docs/choosing-a-web3-network).

Na řídicím panelu Alchemy najděte v navigační liště rozevírací seznam **Aplikace** a klikněte na **Vytvořit aplikaci**.

![Vytvoření aplikace Hello World](./hello-world-create-app.png)

Pojmenujte svou aplikaci „_Hello World_“ a napište krátký popis. Jako prostředí vyberte **Staging** a jako síť **Goerli**.

![Pohled na vytvoření aplikace Hello World](./create-app-view-hello-world.png)

_Poznámka: Nezapomeňte vybrat **Goerli**, jinak tento tutoriál nebude fungovat._

Klikněte na **Vytvořit aplikaci**. Vaše aplikace se objeví v tabulce níže.

### Vytvoření účtu Ethereum {#create-an-ethereum-account}

Potřebujete účet Ethereum pro odesílání a přijímání transakcí. Použijeme MetaMask, virtuální peněženku v prohlížeči, která umožňuje uživatelům spravovat adresu svého ethereového účtu.

Účet MetaMask si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu nebo pokud již účet máte, nezapomeňte se vpravo nahoře přepnout na „testovací síť Goerli“ (abychom nepracovali se skutečnými penězi).

### Krok 4: Přidejte ether z Faucetu {#step-4-add-ether-from-a-faucet}

Chcete-li nasadit chytrý kontrakt do testovací sítě, budete potřebovat nějaké falešné ETH. Chcete-li získat ETH v síti Goerli, přejděte na faucet Goerli a zadejte adresu svého účtu Goerli. Upozorňujeme, že faucety Goerli mohou být v poslední době trochu nespolehlivé – podívejte se na [stránku testovacích sítí](/developers/docs/networks/#goerli), kde najdete seznam možností k vyzkoušení:

_Poznámka: Kvůli přetížení sítě to může chvíli trvat._
``

### Krok 5: Zkontrolujte si zůstatek {#step-5-check-your-balance}

Chcete-li si dvakrát ověřit, že máte ETH v peněžence, zadejte požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje Alchemy Composer](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Tím se vrátí množství ETH v naší peněžence. Chcete-li se dozvědět více, podívejte se na [krátký tutoriál od Alchemy o tom, jak používat nástroj Composer](https://youtu.be/r6sjRxBZJuU).

Zadejte adresu svého účtu MetaMask a klikněte na **Odeslat požadavek**. Zobrazí se odpověď, která vypadá jako úryvek kódu níže.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Poznámka: Tento výsledek je ve wei, nikoliv v ETH. Wei je nejmenší jednotkou etheru._

Uf! Naše falešné peníze jsou všechny tam.

### Krok 6: Inicializace našeho projektu {#step-6-initialize-our-project}

Nejprve musíme pro náš projekt vytvořit složku. Přejděte na příkazový řádek a zadejte následující.

```
mkdir hello-world
cd hello-world
```

Nyní, když jsme uvnitř složky našeho projektu, použijeme `npm init` k inicializaci projektu.

> Pokud ještě nemáte nainstalovaný npm, postupujte podle [těchto pokynů k instalaci Node.js a npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Pro účely tohoto tutoriálu nezáleží na tom, jak na inicializační otázky odpovíte. Zde je pro referenci, jak jsme to udělali my:

```
název balíčku: (hello-world)
verze: (1.0.0)
popis: chytrý kontrakt hello world
vstupní bod: (index.js)
příkaz k testování:
repositář git:
klíčová slova:
autor:
licence: (ISC)

Chystá se zápis do /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "chytrý kontrakt hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Chyba: není zadán žádný test\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Schvalte package.json a můžeme pokračovat!

### Krok 7: Stažení nástroje Hardhat {#step-7-download-hardhat}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním budování chytrých kontraktů a dapps před jejich nasazením na živý řetězec.

Uvnitř našeho projektu `hello-world` spusťte:

```
npm install --save-dev hardhat
```

Další podrobnosti o [instalačních pokynech](https://hardhat.org/getting-started/#overview) naleznete na této stránce.

### Krok 8: Vytvoření projektu Hardhat {#step-8-create-hardhat-project}

Uvnitř složky projektu `hello-world` spusťte:

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

Co chcete udělat? …
Vytvořit vzorový projekt
❯ Vytvořit prázdný soubor hardhat.config.js
Ukončit
```

Tím se v projektu vygeneruje soubor `hardhat.config.js`. Ten použijeme později v tomto tutoriálu k určení nastavení našeho projektu.

### Krok 9: Přidání složek projektu {#step-9-add-project-folders}

Aby byl projekt přehledný, vytvoříme dvě nové složky. V příkazovém řádku přejděte do kořenového adresáře projektu `hello-world` a zadejte:

```
mkdir contracts
mkdir scripts
```

- `contracts/` je místo, kam uložíme soubor s kódem našeho chytrého kontraktu Hello World
- `scripts/` je místo, kam uložíme skripty pro nasazení našeho kontraktu a interakci s ním

### Krok 10: Napsání našeho kontraktu {#step-10-write-our-contract}

Možná si říkáte, kdy budeme psát kód? Je čas!

Otevřete si projekt hello-world ve svém oblíbeném editoru. Chytré kontrakty se nejčastěji píší v Solidity, který použijeme i my.‌

1. Přejděte do složky `contracts` a vytvořte nový soubor s názvem `HelloWorld.sol`
2. Níže je ukázka chytrého kontraktu Hello World, který budeme v tomto tutoriálu používat. Zkopírujte níže uvedený obsah do souboru `HelloWorld.sol`.

_Poznámka: Nezapomeňte si přečíst komentáře, abyste pochopili, co tento kontrakt dělá._

```
// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je soubor funkcí a dat (jeho stav). Po nasazení se kontrakt nachází na určité adrese na blockchainu Ethereum. Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emituje se při zavolání funkce update
   // Události chytrého kontraktu jsou způsob, jakým může váš kontrakt sdělit vašemu front-endu, že se na blockchainu něco stalo, což může „naslouchat“ určitým událostem a při jejich výskytu provést akci.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu a vytváří funkci, kterou mohou volat jiné kontrakty nebo klienti pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha třídních objektově orientovaných jazycích je konstruktor speciální funkce, která se provádí pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Více informací:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá řetězcový argument `initMessage` a nastavuje hodnotu do úložné proměnné kontraktu `message`).
      message = initMessage;
   }

   // Veřejná funkce, která přijímá řetězcový argument a aktualizuje úložnou proměnnou `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Jedná se o základní chytrý kontrakt, který při vytvoření ukládá zprávu. Lze jej aktualizovat voláním funkce `update`.

### Krok 11: Připojení MetaMask a Alchemy k vašemu projektu {#step-11-connect-metamask-alchemy-to-your-project}

Vytvořili jsme si peněženku MetaMask, účet Alchemy a napsali jsme náš chytrý kontrakt, nyní je čas je všechny tři propojit.

Každá transakce odeslaná z vaší peněženky vyžaduje podpis s použitím vašeho jedinečného privátního klíče. Abychom programu toto oprávnění poskytli, můžeme náš privátní klíč bezpečně uložit do souboru prostředí. Zde také uložíme API klíč pro Alchemy.

> Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [tento tutoriál](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) o odesílání transakcí pomocí Web3.

Nejprve nainstalujte balíček dotenv do adresáře vašeho projektu:

```
npm install dotenv --save
```

Poté vytvořte v kořenovém adresáři projektu soubor `.env`. Přidejte do něj svůj privátní klíč MetaMask a URL adresa Alchemy API pro HTTP.

Váš soubor prostředí se musí jmenovat `.env`, jinak nebude rozpoznán jako soubor prostředí.

Nenazývejte jej `process.env` ani `.env-custom` ani nijak jinak.

- Postupujte podle [těchto pokynů](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) a exportujte svůj privátní klíč
- Níže naleznete postup, jak získat URL pro HTTP API Alchemy

![](./get-alchemy-api-key.gif)

Váš soubor `.env` by měl vypadat takto:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Abychom je skutečně propojili s naším kódem, budeme na tyto proměnné odkazovat v našem souboru `hardhat.config.js` v kroku 13.

### Krok 12: Instalace Ethers.js {#step-12-install-ethersjs}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) uživatelsky přívětivějšími metodami.

Hardhat umožňuje integrovat [pluginy](https://hardhat.org/plugins/) pro další nástroje a rozšířenou funkčnost. Pro nasazení kontraktu využijeme [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers).

V adresáři projektu zadejte:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Krok 13: Aktualizace souboru hardhat.config.js {#step-13-update-hardhat-configjs}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat `hardhat.config.js`, aby o nich náš projekt věděl.

Aktualizujte svůj soubor `hardhat.config.js`, aby vypadal takto:

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

Abychom se ujistili, že zatím vše funguje, zkompilujeme si náš kontrakt. Úkol `compile` je jedním z vestavěných úkolů Hardhatu.

Z příkazového řádku spusťte:

```bash
npx hardhat compile
```

Může se zobrazit varování o `SPDX license identifier not provided in source file`, ale nemusíte se tím znepokojovat – doufejme, že vše ostatní vypadá dobře! Pokud ne, vždy můžete napsat zprávu na [discordu Alchemy](https://discord.gg/u72VCg3).

### Krok 15: Napsání našeho skriptu pro nasazení {#step-15-write-our-deploy-script}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/`, vytvořte nový soubor s názvem `deploy.js` a přidejte do něj následující obsah:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Spusťte nasazení, vrátí se promise, která se vyřeší na objekt kontraktu
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

Hardhat skvěle vysvětluje, co každý z těchto řádků kódu dělá ve svém [výukovém programu Kontrakty](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my jsme zde jejich vysvětlení převzali.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` v ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže `HelloWorld` je zde [továrna](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) pro instance našeho kontraktu hello world. Při použití pluginu `hardhat-ethers` jsou instance `ContractFactory` a `Contract` ve výchozím nastavení připojeny k prvnímu podepisujícímu (vlastníkovi).

```javascript
const hello_world = await HelloWorld.deploy()
```

Volání `deploy()` na `ContractFactory` spustí nasazení a vrátí `Promise`, která se vyřeší na objekt `Contract`. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu.

### Krok 16: Nasazení našeho kontraktu {#step-16-deploy-our-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte na příkazový řádek a spusťte:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Měli byste pak vidět něco takového:

```bash
Kontrakt nasazen na adresu: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Tuto adresu si prosím uložte**. Budeme ji používat později v tomto tutoriálu.

Pokud přejdeme na [Goerli Etherscan](https://goerli.etherscan.io) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Transakce bude vypadat nějak takto:

![](./etherscan-contract.png)

Adresa `From` by se měla shodovat s adresou vašeho účtu MetaMask a v adrese `To` bude uvedeno **Vytvoření kontraktu**. Pokud klikneme na transakci, uvidíme v poli `To` adresu našeho kontraktu.

![](./etherscan-transaction.png)

Výborně! Právě jste nasadili chytrý kontrakt do testovací sítě Ethereum.

Abyste pochopili, co se děje pod pokličkou, přejděte na kartu Průzkumník v našem [řídicím panelu Alchemy](https://dashboard.alchemy.com/explorer). Pokud máte více aplikací Alchemy, nezapomeňte filtrovat podle aplikace a vybrat **Hello World**.

![](./hello-world-explorer.png)

Zde uvidíte několik metod JSON-RPC, které pro nás Hardhat/Ethers vytvořil pod pokličkou, když jsme volali funkci `.deploy()`. Dvě důležité metody jsou zde [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), což je požadavek na zapsání našeho kontraktu do chainu Goerli, a [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě daného haše. Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [náš tutoriál o odesílání transakcí pomocí Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Část 2: Interakce s vaším chytrým kontraktem {#part-2-interact-with-your-smart-contract}

Nyní, když jsme úspěšně nasadili chytrý kontrakt do sítě Goerli, se naučíme, jak s ním interagovat.

### Vytvoření souboru interact.js {#create-a-interactjs-file}

Toto je soubor, do kterého napíšeme náš interakční skript. Budeme používat knihovnu Ethers.js, kterou jste si nainstalovali v části 1.

Uvnitř složky `scripts/` vytvořte nový soubor s názvem `interact.js` a přidejte následující kód:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aktualizujte svůj soubor .env {#update-your-env-file}

Budeme používat nové proměnné prostředí, takže je musíme definovat v souboru `.env`, který [jsme vytvořili dříve](#step-11-connect-metamask-&-alchemy-to-your-project).

Budeme muset přidat definici pro náš Alchemy `API_KEY` a `CONTRACT_ADDRESS`, kde byl váš chytrý kontrakt nasazen.

Váš soubor `.env` by měl vypadat nějak takto:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Získání ABI kontraktu {#grab-your-contract-ABI}

Naše [ABI (Application Binary Interface)](/glossary/#abi) kontraktu je rozhraní pro interakci s naším chytrým kontraktem. Hardhat automaticky generuje ABI a ukládá ho do `HelloWorld.json`. Pro použití ABI budeme muset analyzovat obsah přidáním následujících řádků kódu do našeho souboru `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Pokud chcete vidět ABI, můžete si ho vytisknout do konzole:

```javascript
console.log(JSON.stringify(contract.abi))
```

Abyste viděli své ABI vytištěné v konzoli, přejděte do terminálu a spusťte:

```bash
npx hardhat run scripts/interact.js
```

### Vytvoření instance vašeho kontraktu {#create-an-instance-of-your-contract}

Pro interakci s naším kontraktem musíme v našem kódu vytvořit instanci kontraktu. Abychom tak učinili s Ethers.js, budeme muset pracovat se třemi koncepty:

1. Provider - poskytovatel uzlu, který vám dává přístup ke čtení a zápisu do blockchainu
2. Signer - představuje účet Ethereum, který může podepisovat transakce
3. Contract - objekt Ethers.js představující konkrétní kontrakt nasazený na blockchainu

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

Více se o Providerech, Signerech a Kontraktech dozvíte v [dokumentaci ethers.js](https://docs.ethers.io/v5/).

### Přečtěte si úvodní zprávu {#read-the-init-message}

Pamatujete si, když jsme nasadili náš kontrakt s `initMessage = "Hello world!"`? Nyní se chystáme přečíst zprávu uloženou v našem chytrém kontraktu a vytisknout ji do konzole.

V JavaScriptu se při interakci se sítěmi používají asynchronní funkce. Chcete-li se dozvědět více o asynchronních funkcích, [přečtěte si tento článek na Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Použijte níže uvedený kód pro volání funkce `message` v našem chytrém kontraktu a přečtení úvodní zprávy:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Zpráva zní: " + message)
}
main()
```

Po spuštění souboru pomocí `npx hardhat run scripts/interact.js` v terminálu bychom měli vidět tuto odpověď:

```
Zpráva zní: Hello world!
```

Výborně! Právě jste úspěšně přečetli data chytrého kontraktu z blockchainu Ethereum, skvělá práce!

### Aktualizovat zprávu {#update-the-message}

Místo pouhého čtení zprávy můžeme také aktualizovat zprávu uloženou v našem chytrém kontraktu pomocí funkce `update`! Docela super, že?

Pro aktualizaci zprávy můžeme přímo zavolat funkci `update` na našem instancovaném objektu Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Zpráva zní: " + message)

  console.log("Aktualizace zprávy...")
  const tx = await helloWorldContract.update("Toto je nová zpráva.")
  await tx.wait()
}
main()
```

Všimněte si, že na řádku 11 voláme `.wait()` na vráceném objektu transakce. To zajišťuje, že náš skript počká, až se transakce vytěží na blockchainu, než opustí funkci. Pokud není zahrnuto volání `.wait()`, skript nemusí vidět aktualizovanou hodnotu `message` v kontraktu.

### Přečtěte si novou zprávu {#read-the-new-message}

Měli byste být schopni zopakovat [předchozí krok](#read-the-init-message) a přečíst aktualizovanou hodnotu `message`. Chvilku se zamyslete a zkuste provést změny potřebné k vytištění této nové hodnoty!

Pokud potřebujete nápovědu, takto by měl v tuto chvíli vypadat váš soubor `interact.js`:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instance kontraktu
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Zpráva zní: " + message)

  console.log("Aktualizace zprávy...")
  const tx = await helloWorldContract.update("toto je nová zpráva")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Nová zpráva zní: " + newMessage)
}

main()
```

Nyní stačí spustit skript a měli byste vidět starou zprávu, stav aktualizace a novou zprávu vytištěnou ve vašem terminálu!

`npx hardhat run scripts/interact.js --network goerli`

```
Zpráva zní: Hello World!
Aktualizace zprávy...
Nová zpráva zní: Toto je nová zpráva.
```

Při spouštění tohoto skriptu si můžete všimnout, že krok `Updating the message...` (Aktualizace zprávy...) chvíli trvá, než se načte nová zpráva. Je to kvůli procesu těžby; pokud jste zvědaví na sledování transakcí během jejich těžby, navštivte [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) a podívejte se na stav transakce. Pokud je transakce zrušena, je také užitečné zkontrolovat [Goerli Etherscan](https://goerli.etherscan.io) a vyhledat haš vaší transakce.

## Část 3: Zveřejnění vašeho chytrého kontraktu na Etherscanu {#part-3-publish-your-smart-contract-to-etherscan}

Odvedli jste veškerou těžkou práci, abyste svůj chytrý kontrakt přivedli k životu; nyní je čas podělit se o něj se světem!

Ověřením vašeho chytrého kontraktu na Etherscanu si může kdokoli prohlédnout váš zdrojový kód a interagovat s vaším chytrým kontraktem. Začínáme!

### Krok 1: Vygenerování API klíče na vašem účtu Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Klíč Etherscan API je nezbytný k ověření, že vlastníte chytrý kontrakt, který se pokoušíte publikovat.

Pokud ještě nemáte účet Etherscan, [zaregistrujte si jej](https://etherscan.io/register).

Po přihlášení najděte své uživatelské jméno v navigační liště, najeďte na něj a vyberte tlačítko **Můj profil**.

Na stránce vašeho profilu byste měli vidět boční navigační lištu. Z boční navigační lišty vyberte **API klíče**. Dále stiskněte tlačítko „Přidat“ pro vytvoření nového API klíče, pojmenujte svou aplikaci **hello-world** a stiskněte tlačítko **Vytvořit nový API klíč**.

Váš nový API klíč by se měl objevit v tabulce API klíčů. Zkopírujte API klíč do schránky.

Dále musíme přidat Etherscan API klíč do našeho souboru `.env`.

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

Publikování vašeho kontraktu na Etherscan pomocí Hardhat je jednoduché. Nejprve budete muset nainstalovat plugin `hardhat-etherscan`, abyste mohli začít. `hardhat-etherscan` automaticky ověří zdrojový kód a ABI chytrého kontraktu na Etherscanu. Pro jeho přidání spusťte v adresáři `hello-world`:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Po instalaci vložte následující příkaz na začátek souboru `hardhat.config.js` a přidejte možnosti konfigurace Etherscanu:

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
    // Získejte jej na https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Ověření vašeho chytrého kontraktu na Etherscanu {#verify-your-smart-contract-on-etherscan}

Ujistěte se, že jsou všechny soubory uloženy a všechny proměnné v souboru `.env` jsou správně nakonfigurovány.

Spusťte úlohu `verify`, předejte adresu kontraktu a síť, kde je nasazen:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Ujistěte se, že `DEPLOYED_CONTRACT_ADDRESS` je adresa vašeho nasazeného chytrého kontraktu v testovací síti Goerli. Také poslední argument (`'Hello World!'`) musí být stejná řetězcová hodnota, která byla použita [během kroku nasazení v části 1](#write-our-deploy-script).

Pokud vše půjde dobře, uvidíte ve svém terminálu následující zprávu:

```text
Zdrojový kód pro kontrakt byl úspěšně odeslán
contracts/HelloWorld.sol:HelloWorld na 0xdeployed-contract-address
k ověření na Etherscanu. Čekání na výsledek ověření...


Kontrakt HelloWorld byl úspěšně ověřen na Etherscanu.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Výborně! Kód vašeho chytrého kontraktu je na Etherscanu!

### Podívejte se na svůj chytrý kontrakt na Etherscanu! {#check-out-your-smart-contract-on-etherscan}

Když přejdete na odkaz uvedený ve vašem terminálu, měli byste vidět svůj kód chytrého kontraktu a ABI publikované na Etherscanu!

**Paráda – dokázali jste to, šampione! Nyní může kdokoli volat nebo zapisovat do vašeho chytrého kontraktu! Těšíme se, co postavíte příště!**

## Část 4 – Integrace vašeho chytrého kontraktu s frontendem {#part-4-integrating-your-smart-contract-with-the-frontend}

Na konci tohoto tutoriálu budete vědět, jak:

- Připojit peněženku MetaMask k vaší dapp
- Číst data z vašeho chytrého kontraktu pomocí [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
- Podepisovat transakce Ethereum pomocí MetaMask

Pro tuto dapp budeme jako frontendový framework používat [React](https://react.dev/); je však důležité si uvědomit, že nebudeme trávit mnoho času rozebíráním jeho základů, protože se budeme soustředit hlavně na přenesení funkčnosti Web3 do našeho projektu.

Jako předpoklad byste měli mít základní znalosti Reactu. Pokud ne, doporučujeme dokončit oficiální [tutoriál Úvod do Reactu](https://react.dev/learn).

### Naklonujte si startovací soubory {#clone-the-starter-files}

Nejprve přejděte do [GitHub repozitáře hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial), abyste získali startovací soubory pro tento projekt, a naklonujte tento repozitář na váš lokální počítač.

Otevřete si naklonovaný repozitář lokálně. Všimněte si, že obsahuje dvě složky: `starter-files` a `completed`.

- `starter-files`- **budeme pracovat v tomto adresáři**, propojíme UI s vaší peněženkou Ethereum a s chytrým kontraktem, který jsme publikovali na Etherscanu v [Části 3](#part-3).
- `completed` obsahuje celý dokončený tutoriál a měl by být použit pouze jako reference, pokud se zaseknete.

Dále si otevřete vaši kopii `starter-files` ve vašem oblíbeném editoru kódu a poté přejděte do složky `src`.

Veškerý kód, který napíšeme, bude umístěn ve složce `src`. Budeme upravovat komponentu `HelloWorld.js` a javascriptové soubory `util/interact.js`, abychom našemu projektu dodali funkčnost Web3.

### Prozkoumejte startovací soubory {#check-out-the-starter-files}

Než začneme kódovat, prozkoumejme, co nám startovací soubory poskytují.

#### Spusťte svůj projekt v Reactu {#get-your-react-project-running}

Začněme spuštěním projektu React v našem prohlížeči. Krása Reactu spočívá v tom, že jakmile náš projekt běží v prohlížeči, veškeré uložené změny se v prohlížeči projeví v reálném čase.

Aby projekt fungoval, přejděte do kořenového adresáře složky `starter-files` a spusťte v terminálu `npm install` pro instalaci závislostí projektu:

```bash
cd starter-files
npm install
```

Jakmile se dokončí instalace, spusťte v terminálu `npm start`:

```bash
npm start
```

Tím by se měla ve vašem prohlížeči otevřít adresa [http://localhost:3000/](http://localhost:3000/), kde uvidíte frontend našeho projektu. Měl by se skládat z jednoho pole (místo pro aktualizaci zprávy uložené ve vašem chytrém kontraktu), tlačítka „Připojit peněženku“ a tlačítka „Aktualizovat“.

Pokud zkusíte kliknout na kterékoli tlačítko, zjistíte, že nefungují – je to proto, že jejich funkčnost musíme teprve naprogramovat.

#### Komponenta `HelloWorld.js` {#the-helloworld-js-component}

Vraťme se zpět do složky `src` v našem editoru a otevřeme si soubor `HelloWorld.js`. Je nesmírně důležité, abychom všemu v tomto souboru rozuměli, protože se jedná o primární komponentu Reactu, na které budeme pracovat.

Na začátku tohoto souboru si všimnete, že máme několik importních příkazů, které jsou nezbytné pro spuštění našeho projektu, včetně knihovny React, hooků useEffect a useState, některých položek z `./util/interact.js` (popíšeme je podrobněji brzy!) a loga Alchemy.

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

Dále máme naše stavové proměnné, které budeme aktualizovat po konkrétních událostech.

```javascript
// HelloWorld.js

//Stavové proměnné
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Žádné spojení se sítí.")
const [newMessage, setNewMessage] = useState("")
```

Zde je, co každá proměnná představuje:

- `walletAddress` – řetězec, který ukládá adresu peněženky uživatele
- `status` – řetězec, který uchovává užitečnou zprávu, jež uživatele navádí, jak s dapp interagovat
- `message` - řetězec, který ukládá aktuální zprávu v chytrém kontraktu
- `newMessage` - řetězec, který ukládá novou zprávu, která bude zapsána do chytrého kontraktu

Po stavových proměnných uvidíte pět neimplementovaných funkcí: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` a `onUpdatePressed`. Níže vysvětlíme, co dělají:

```javascript
// HelloWorld.js

//voláno pouze jednou
useEffect(async () => {
  //TODO: implement
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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- toto je React hook, který se volá po vykreslení vaší komponenty. Protože má prázdné pole `[]` jako prop (viz řádek 4), bude volán pouze při _prvním_ vykreslení komponenty. Zde načteme aktuální zprávu uloženou v našem chytrém kontraktu, zavoláme naše posluchače chytrého kontraktu a peněženky a aktualizujeme naše UI tak, aby odráželo, zda je peněženka již připojena.
- `addSmartContractListener`- tato funkce nastaví posluchače, který bude sledovat událost `UpdatedMessages` našeho kontraktu HelloWorld a aktualizuje naše UI, když se zpráva v našem chytrém kontraktu změní.
- `addWalletListener`- tato funkce nastaví posluchače, který detekuje změny ve stavu peněženky MetaMask uživatele, například když uživatel odpojí svou peněženku nebo přepne adresy.
- `connectWalletPressed`- tato funkce bude volána pro připojení peněženky MetaMask uživatele k naší dapp.
- `onUpdatePressed` – tato funkce bude volána, když uživatel bude chtít aktualizovat zprávu uloženou v chytrém kontraktu.

Na konci tohoto souboru máme uživatelské rozhraní naší komponenty.

```javascript
// HelloWorld.js

//UI naší komponenty
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Připojeno: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Připojit peněženku</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Aktuální zpráva:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nová zpráva:</h2>

    <div>
      <input
        type="text"
        placeholder="Aktualizujte zprávu ve svém chytrém kontraktu."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Aktualizovat
      </button>
</div>
 
</div>
)
```

Pokud si tento kód pozorně prostudujete, zjistíte, kde v našem UI používáme naše různé stavové proměnné:

- Na řádcích 6-12, pokud je peněženka uživatele připojena (tj. `walletAddress.length > 0`), zobrazíme zkrácenou verzi adresy uživatele `walletAddress` v tlačítku s ID „walletButton;“ jinak se jednoduše zobrazí „Připojit peněženku“.
- Na řádku 17 zobrazujeme aktuální zprávu uloženou v chytrém kontraktu, která je zachycena v řetězci `message`.
- Na řádcích 23-26 používáme [řízenou komponentu](https://legacy.reactjs.org/docs/forms.html#controlled-components) k aktualizaci naší stavové proměnné `newMessage`, když se změní vstup v textovém poli.

Kromě našich stavových proměnných také uvidíte, že funkce `connectWalletPressed` a `onUpdatePressed` jsou volány při kliknutí na tlačítka s ID `publishButton` a `walletButton`.

Nakonec se podívejme, kam se tato komponenta `HelloWorld.js` přidává.

Pokud přejdete do souboru `App.js`, který je hlavní komponentou v Reactu a slouží jako kontejner pro všechny ostatní komponenty, uvidíte, že naše komponenta `HelloWorld.js` je vložena na řádku 7.

V neposlední řadě se podívejme na ještě jeden soubor, který máte k dispozici, a to `interact.js`.

#### Soubor `interact.js` {#the-interact-js-file}

Protože se chceme řídit paradigmatem [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), budeme chtít samostatný soubor, který bude obsahovat všechny naše funkce pro správu logiky, dat a pravidel naší dapp, a poté budeme moci tyto funkce exportovat do našeho frontendu (naší komponenty `HelloWorld.js`).

👆🏽Toto je přesně účel našeho souboru `interact.js`!

Přejděte do složky `util` ve vašem adresáři `src` a všimnete si, že jsme zahrnuli soubor s názvem `interact.js`, který bude obsahovat všechny naše funkce a proměnné pro interakci s chytrým kontraktem a peněženkou.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Na začátku souboru si všimnete, že jsme zakomentovali objekt `helloWorldContract`. Později v tomto tutoriálu tento objekt odkomentujeme a instancujeme náš chytrý kontrakt do této proměnné, kterou pak exportujeme do naší komponenty `HelloWorld.js`.

Čtyři neimplementované funkce za naším objektem `helloWorldContract` dělají následující:

- `loadCurrentMessage` – tato funkce se stará o logiku načítání aktuální zprávy uložené v chytrém kontraktu. Provede volání _čtení_ na chytrý kontrakt Hello World pomocí [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - tato funkce připojí peněženku MetaMask uživatele k naší dapp.
- `getCurrentWalletConnected` – tato funkce zkontroluje, zda je účet Ethereum již připojen k naší dapp při načítání stránky a podle toho aktualizuje naše UI.
- `updateMessage` – tato funkce aktualizuje zprávu uloženou v chytrém kontraktu. Provede _zápisové_ volání na chytrý kontrakt Hello World, takže peněženka MetaMask uživatele bude muset podepsat transakci Ethereum k aktualizaci zprávy.

Nyní, když rozumíme tomu, s čím pracujeme, pojďme zjistit, jak číst z našeho chytrého kontraktu!

### Krok 3: Čtení z vašeho chytrého kontraktu {#step-3-read-from-your-smart-contract}

Chcete-li číst ze svého chytrého kontraktu, musíte úspěšně nastavit:

- API připojení k řetězci Ethereum
- Načtenou instanci vašeho chytrého kontraktu
- Funkci pro volání funkce vašeho chytrého kontraktu
- Posluchače pro sledování aktualizací, když se změní data, která čtete z chytrého kontraktu

To může znít jako mnoho kroků, ale nebojte se! Provedeme vás každým z nich krok za krokem! :\)

#### Vytvoření API spojení s Ethereum chainem {#establish-an-api-connection-to-the-ethereum-chain}

Vzpomínáte si, jak jsme v části 2 tohoto tutoriálu použili náš [Alchemy Web3 klíč k čtení z našeho chytrého kontraktu](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Ve své dapp budete také potřebovat klíč Alchemy Web3, abyste mohli číst z chainu.

Pokud jej ještě nemáte, nejprve si nainstalujte [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) tak, že přejdete do kořenového adresáře vašich `starter-files` a spustíte v terminálu následující příkaz:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) je nadstavba nad [Web3.js](https://docs.web3js.org/), která poskytuje vylepšené metody API a další klíčové výhody, které vám usnadní život vývojáře web3. Je navržen tak, aby vyžadoval minimální konfiguraci, takže jej můžete ve své aplikaci začít používat okamžitě!

Poté nainstalujte balíček [dotenv](https://www.npmjs.com/package/dotenv) do adresáře svého projektu, abychom měli bezpečné místo pro uložení našeho API klíče po jeho získání.

```text
npm install dotenv --save
```

Pro naši dapp **budeme používat náš API klíč pro Websockets** namísto našeho API klíče pro HTTP, protože nám to umožní nastavit posluchače, který detekuje, kdy se změní zpráva uložená v chytrém kontraktu.

Jakmile budete mít svůj API klíč, vytvořte v kořenovém adresáři soubor `.env` a přidejte do něj svou Alchemy Websockets URL. Poté by měl váš soubor `.env` vypadat takto:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Nyní jsme připraveni nastavit náš Alchemy Web3 endpoint v naší dapp! Vraťme se k našemu souboru `interact.js`, který je vnořený do naší složky `util` a přidejme následující kód na začátek souboru:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Výše jsme nejprve importovali klíč Alchemy z našeho souboru `.env` a poté jsme předali náš `alchemyKey` do `createAlchemyWeb3`, abychom vytvořili náš Alchemy Web3 endpoint.

S tímto připraveným koncovým bodem je čas načíst náš chytrý kontrakt!

#### Načítání vašeho chytrého kontraktu Hello World {#loading-your-hello-world-smart-contract}

K načtení vašeho chytrého kontraktu Hello World budete potřebovat jeho adresu kontraktu a ABI, obojí lze najít na Etherscanu, pokud jste dokončili [Část 3 tohoto tutoriálu.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Jak získat ABI kontraktu z Etherscanu {#how-to-get-your-contract-abi-from-etherscan}

Pokud jste přeskočili Část 3 tohoto tutoriálu, můžete použít kontrakt HelloWorld s adresou [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Jeho ABI lze nalézt [zde](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontraktu je nezbytné pro určení, kterou funkci bude kontrakt volat, a také pro zajištění, že funkce vrátí data ve formátu, který očekáváte. Jakmile jsme zkopírovali naše ABI kontraktu, uložme ho jako JSON soubor s názvem `contract-abi.json` do vašeho adresáře `src`.

Váš contract-abi.json by měl být uložen ve složce src.

Vyzbrojeni adresou kontraktu, ABI a Alchemy Web3 koncovým bodem můžeme použít [metodu kontraktu](https://docs.web3js.org/api/web3-eth-contract/class/Contract) k načtení instance našeho chytrého kontraktu. Importujte ABI vašeho kontraktu do souboru `interact.js` a přidejte adresu svého kontraktu.

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

Abychom to shrnuli, prvních 12 řádků vašeho souboru `interact.js` by nyní mělo vypadat takto:

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

#### Implementace `loadCurrentMessage` ve vašem souboru `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Tato funkce je super jednoduchá. Provedeme jednoduché asynchronní volání web3 pro čtení z našeho kontraktu. Naše funkce vrátí zprávu uloženou v chytrém kontraktu:

Aktualizujte `loadCurrentMessage` ve vašem souboru `interact.js` na následující:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Protože chceme zobrazit tento chytrý kontrakt v našem UI, aktualizujme funkci `useEffect` v naší komponentě `HelloWorld.js` na následující:

```javascript
// HelloWorld.js

//voláno pouze jednou
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Všimněte si, že chceme, aby byla naše funkce `loadCurrentMessage` volána pouze jednou během prvního vykreslení komponenty. Brzy implementujeme `addSmartContractListener` pro automatickou aktualizaci UI po změně zprávy v chytrém kontraktu.

Než se pustíme do našeho posluchače, podívejme se, co jsme zatím dokázali! Uložte si soubory `HelloWorld.js` a `interact.js` a přejděte na [http://localhost:3000/](http://localhost:3000/)

Všimnete si, že aktuální zpráva již neříká „Žádné spojení se sítí“. Místo toho odráží zprávu uloženou v chytrém kontraktu. Super!

#### Vaše UI by nyní mělo odrážet zprávu uloženou v chytrém kontraktu {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

A teď k tomu posluchači...

#### Implementace `addSmartContractListener` {#implement-addsmartcontractlistener}

Pokud si vzpomenete na soubor `HelloWorld.sol`, který jsme napsali v [části 1 této série tutoriálů](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), vzpomenete si, že existuje událost chytrého kontraktu s názvem `UpdatedMessages`, která je emitována po vyvolání funkce `update` našeho chytrého kontraktu (viz řádky 9 a 27):

```javascript
// HelloWorld.sol

// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je soubor funkcí a dat (jeho stav). Po nasazení se kontrakt nachází na určité adrese na blockchainu Ethereum. Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emituje se při zavolání funkce update
   // Události chytrého kontraktu jsou způsob, jakým může váš kontrakt sdělit vašemu front-endu, že se na blockchainu něco stalo, což může „naslouchat“ určitým událostem a při jejich výskytu provést akci.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu a vytváří funkci, kterou mohou volat jiné kontrakty nebo klienti pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha třídních objektově orientovaných jazycích je konstruktor speciální funkce, která se provádí pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Více informací:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá řetězcový argument `initMessage` a nastavuje hodnotu do úložné proměnné kontraktu `message`).
      message = initMessage;
   }

   // Veřejná funkce, která přijímá řetězcový argument a aktualizuje úložnou proměnnou `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Události chytrého kontraktu jsou způsob, jakým může váš kontrakt komunikovat, že se na blockchainu něco stalo (tj. došlo k _události_) vaší front-endové aplikaci, která může „naslouchat“ konkrétním událostem a při jejich výskytu provádět akce.

Funkce `addSmartContractListener` bude specificky naslouchat události `UpdatedMessages` našeho chytrého kontraktu Hello World a aktualizovat naše UI, aby zobrazilo novou zprávu.

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
      setStatus("🎉 Vaše zpráva byla aktualizována!")
    }
  })
}
```

Pojďme si rozebrat, co se stane, když posluchač detekuje událost:

- Pokud dojde k chybě při emisi události, projeví se to v UI prostřednictvím naší stavové proměnné `status`.
- V opačném případě použijeme vrácený objekt `data`. `data.returnValues` je pole indexované od nuly, kde první prvek pole ukládá předchozí zprávu a druhý prvek ukládá aktualizovanou. Celkově při úspěšné události nastavíme náš řetězec `message` na aktualizovanou zprávu, vymažeme řetězec `newMessage` a aktualizujeme naši stavovou proměnnou `status`, aby odrážela, že byla na našem chytrém kontraktu publikována nová zpráva.

Nakonec zavoláme našeho posluchače ve funkci `useEffect`, aby byl inicializován při prvním vykreslení komponenty `HelloWorld.js`. Celkově by vaše funkce `useEffect` měla vypadat takto:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Nyní, když umíme číst z našeho chytrého kontraktu, bylo by skvělé zjistit, jak do něj také zapisovat! Abychom však mohli do naší dapp zapisovat, musíme k ní mít nejprve připojenou peněženku Ethereum.

Takže dále se budeme zabývat nastavením naší peněženky Ethereum (MetaMask) a jejím připojením k naší dapp!

### Krok 4: Nastavení vaší peněženky Ethereum {#step-4-set-up-your-ethereum-wallet}

Aby mohli uživatelé cokoliv zapsat na Ethereum chain, musí podepisovat transakce pomocí privátních klíčů své virtuální peněženky. Pro tento tutoriál použijeme [MetaMask](https://metamask.io/), virtuální peněženku v prohlížeči, která slouží ke správě vaší adresy účtu Ethereum, protože to pro koncového uživatele velmi usnadňuje podepisování transakcí.

Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/) od Nadace Ethereum.

#### Stáhněte si MetaMask {#download-metamask}

Účet MetaMask si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu nebo pokud již účet máte, nezapomeňte se vpravo nahoře přepnout na „testovací síť Goerli“ (abychom nepracovali se skutečnými penězi).

#### Přidání etheru z faucetu {#add-ether-from-a-faucet}

K podepsání transakce na blockchainu Ethereum budeme potřebovat nějaký falešný ETH. Pro získání ETH můžete jít na [FaucETH](https://fauceth.komputing.org) a zadat adresu svého účtu Goerli, kliknout na „Požádat o prostředky“, poté v rozevíracím seznamu vybrat „Ethereum Testnet Goerli“ a nakonec znovu kliknout na tlačítko „Požádat o prostředky“. Krátce poté byste měli vidět Eth ve svém účtu MetaMask!

#### Zkontrolujte si zůstatek {#check-your-balance}

Abychom si ověřili, že náš zůstatek je k dispozici, proveďte požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje Composer od Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Tím získáte množství Eth ve vaší peněžence. Po zadání adresy vašeho účtu MetaMask a kliknutí na „Send Request“ byste měli vidět takovouto odpověď:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**POZNÁMKA:** Tento výsledek je ve wei, nikoli v eth. Wei se používá jako nejmenší denominace etheru. Převod z wei na eth je: 1 eth = 10¹⁸ wei. Takže pokud převedeme 0xde0b6b3a7640000 na desetinné číslo, dostaneme 1\*10¹⁸, což se rovná 1 eth.

Uf! Naše falešné peníze jsou všechny tam! 🤑

### Krok 5: Připojení MetaMask k vašemu UI {#step-5-connect-metamask-to-your-UI}

Nyní, když je naše peněženka MetaMask nastavena, připojme k ní naši dapp!

#### Funkce `connectWallet` {#the-connectWallet-function}

V našem souboru `interact.js` implementujeme funkci `connectWallet`, kterou pak můžeme zavolat v naší komponentě `HelloWorld.js`.

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
        status: "👆🏽 Napište zprávu do textového pole výše.",
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
              Musíte si do prohlížeče nainstalovat MetaMask, virtuální peněženku Ethereum.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Co přesně tedy tento obrovský blok kódu dělá?

Nejprve zkontroluje, zda je ve vašem prohlížeči povoleno `window.ethereum`.

`window.ethereum` je globální API, které vkládá MetaMask a další poskytovatelé peněženek a které webovým stránkám umožňuje žádat o účty uživatelů Etherea. Pokud je schváleno, může číst data z blockchainů, ke kterým je uživatel připojen, a navrhovat uživateli podepisování zpráv a transakcí. Pro více informací se podívejte do [dokumentace MetaMasku](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Pokud `window.ethereum` _není_ přítomno, znamená to, že MetaMask není nainstalován. Výsledkem je vrácení objektu JSON, kde vrácená `adresa` je prázdný řetězec a objekt JSX `status` sděluje, že uživatel si musí nainstalovat MetaMask.

Pokud `window.ethereum` _je_ přítomno, pak to začne být zajímavé.

Pomocí smyčky try/catch se pokusíme připojit k MetaMasku voláním [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Volání této funkce otevře MetaMask v prohlížeči, kde bude uživatel vyzván k připojení své peněženky k vaší dapp.

- Pokud se uživatel rozhodne připojit, `method: "eth_requestAccounts"` vrátí pole obsahující všechny adresy účtů uživatele, které se k dapp připojily. Celkově naše funkce `connectWallet` vrátí objekt JSON, který obsahuje _první_ `adresu` v tomto poli (viz řádek 9) a zprávu `status`, která vyzve uživatele k napsání zprávy do chytrého kontraktu.
- Pokud uživatel spojení odmítne, objekt JSON bude obsahovat prázdný řetězec pro vrácenou `adresu` a zprávu `status`, která odráží, že uživatel spojení odmítl.

Nyní, když jsme napsali tuto funkci `connectWallet`, je dalším krokem její zavolání v naší komponentě `HelloWorld.js`.

#### Přidání funkce `connectWallet` do vaší UI komponenty `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Přejděte na funkci `connectWalletPressed` v `HelloWorld.js` a aktualizujte ji na následující:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Všimli jste si, jak je většina naší funkčnosti abstrahována od naší komponenty `HelloWorld.js` do souboru `interact.js`? To proto, abychom dodrželi paradigma M-V-C!

V `connectWalletPressed` jednoduše provedeme await volání naší importované funkce `connectWallet` a pomocí její odpovědi aktualizujeme naše proměnné `status` a `walletAddress` prostřednictvím jejich stavových háků (hooks).

Nyní si oba soubory (`HelloWorld.js` a `interact.js`) uložme a otestujme naše UI.

Otevřete si prohlížeč na stránce [http://localhost:3000/](http://localhost:3000/) a stiskněte tlačítko „Připojit peněženku“ vpravo nahoře.

Pokud máte nainstalovaný MetaMask, měli byste být vyzváni k připojení své peněženky k vaší dapp. Přijměte výzvu k připojení.

Měli byste vidět, že tlačítko peněženky nyní ukazuje, že je vaše adresa připojena! Super! 🔥

Dále zkuste obnovit stránku... to je divné. Naše tlačítko peněženky nás vyzývá k připojení MetaMasku, i když už je připojen...

Ale žádný strach! To snadno vyřešíme (chápete?). implementací `getCurrentWalletConnected`, která zkontroluje, zda je adresa již připojena k naší dapp, a podle toho aktualizuje naše UI!

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
          status: "👆🏽 Napište zprávu do textového pole výše.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Připojte se k MetaMask pomocí tlačítka vpravo nahoře.",
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
              Musíte si do prohlížeče nainstalovat MetaMask, virtuální peněženku Ethereum.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Tento kód je _velmi_ podobný funkci `connectWallet`, kterou jsme právě napsali v předchozím kroku.

Hlavní rozdíl je v tom, že místo volání metody `eth_requestAccounts`, která otevře MetaMask, aby si uživatel mohl připojit svou peněženku, zde voláme metodu `eth_accounts`, která jednoduše vrací pole obsahující adresy MetaMask aktuálně připojené k naší dapp.

Abychom tuto funkci viděli v akci, zavoláme ji ve funkci `useEffect` naší komponenty `HelloWorld.js`:

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

Všimněte si, že odpověď z našeho volání `getCurrentWalletConnected` používáme k aktualizaci našich stavových proměnných `walletAddress` a `status`.

Nyní, když jste přidali tento kód, zkusme obnovit okno našeho prohlížeče.

Paráda! Tlačítko by mělo hlásit, že jste připojeni, a zobrazovat náhled adresy vaší připojené peněženky – i po obnovení!

#### Implementace `addWalletListener` {#implement-addwalletlistener}

Posledním krokem v nastavení peněženky naší dapp je implementace posluchače peněženky, aby se naše uživatelské rozhraní aktualizovalo, když se změní stav naší peněženky, například když se uživatel odpojí nebo přepne účty.

Ve vašem souboru `HelloWorld.js` upravte svou funkci `addWalletListener` na následující:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Napište zprávu do textového pole výše.")
      } else {
        setWallet("")
        setStatus("🦊 Připojte se k MetaMask pomocí tlačítka vpravo nahoře.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Musíte si do prohlížeče nainstalovat MetaMask, virtuální peněženku Ethereum.
        </a>
      </p>
    )
  }
}
```

Vsadím se, že už ani nepotřebujete naši pomoc, abyste pochopili, co se zde děje, ale pro úplnost si to rychle rozebereme:

- Nejprve naše funkce zkontroluje, zda je `window.ethereum` povoleno (tj. zda je MetaMask nainstalován).
  - Pokud není, jednoduše nastavíme naši stavovou proměnnou `status` na řetězec JSX, který uživatele vyzve k instalaci MetaMasku.
  - Pokud je povoleno, nastavíme na řádku 3 posluchače `window.ethereum.on(\"accountsChanged\")`, který naslouchá změnám stavu v peněžence MetaMask, což zahrnuje případy, kdy uživatel připojí další účet k dapp, přepne účty nebo odpojí účet. Pokud je připojen alespoň jeden účet, stavová proměnná `walletAddress` se aktualizuje jako první účet v poli `accounts` vráceném posluchačem. V opačném případě je `walletAddress` nastaveno jako prázdný řetězec.

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

A to je vše! Úspěšně jsme dokončili programování veškeré funkčnosti naší peněženky! Nyní k našemu poslednímu úkolu: aktualizaci zprávy uložené v našem chytrém kontraktu!

### Krok 6: Implementace funkce `updateMessage` {#step-6-implement-the-updateMessage-function}

Tak jo, lidi, jsme v cílové rovince! Ve funkci `updateMessage` vašeho souboru `interact.js` uděláme následující:

1. Ujistěte se, že zpráva, kterou chceme publikovat v našem chytrém kontraktu, je platná
2. Podepište naši transakci pomocí MetaMask
3. Zavolejte tuto funkci z naší frontendové komponenty `HelloWorld.js`

Nebude to trvat dlouho; pojďme tuto dapp dokončit!

#### Zpracování chyb na vstupu {#input-error-handling}

Je přirozené, že na začátku funkce je nějaké zpracování chyb vstupů.

Budeme chtít, aby se naše funkce vrátila dříve, pokud není nainstalováno rozšíření MetaMask, není připojena žádná peněženka (tj. předaná `adresa` je prázdný řetězec) nebo je `zpráva` prázdný řetězec. Přidejme následující zpracování chyb do `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Připojte svou peněženku MetaMask pro aktualizaci zprávy na blockchainu.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Vaše zpráva nemůže být prázdný řetězec.",
    }
  }
}
```

Nyní, když máme správné zpracování chyb vstupů, je čas podepsat transakci přes MetaMask!

#### Podepisování naší transakce {#signing-our-transaction}

Pokud jste již obeznámeni s tradičními web3 Ethereum transakcemi, kód, který napíšeme dále, vám bude velmi povědomý. Pod kód pro zpracování chyb vstupů přidejte do `updateMessage` následující:

```javascript
// interact.js

//nastavení parametrů transakce
const transactionParameters = {
  to: contractAddress, // Vyžadováno kromě publikací kontraktů.
  from: address, // musí se shodovat s aktivní adresou uživatele.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//podepsání transakce
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
          Zobrazte stav své transakce na Etherscanu!
        </a>
        <br />
        ℹ️ Jakmile bude transakce ověřena sítí, zpráva bude
        aktualizována automaticky.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Rozeberme si, co se děje. Nejprve nastavíme parametry naší transakce, kde:

- `to` určuje adresu příjemce (náš chytrý kontrakt)
- `from` určuje podepisujícího transakce, proměnnou `address`, kterou jsme předali do naší funkce
- `data` obsahuje volání metody `update` našeho chytrého kontraktu Hello World, která přijímá naši řetězcovou proměnnou `message` jako vstup

Poté provedeme await volání `window.ethereum.request`, kde požádáme MetaMask o podepsání transakce. Všimněte si, že na řádcích 11 a 12 určujeme naši metodu eth, `eth_sendTransaction`, a předáváme naše `transactionParameters`.

V tomto okamžiku se v prohlížeči otevře MetaMask a vyzve uživatele k podepsání nebo zamítnutí transakce.

- Pokud je transakce úspěšná, funkce vrátí JSON objekt, kde `status` JSX řetězec vyzve uživatele, aby se podíval na Etherscan pro více informací o své transakci.
- Pokud transakce selže, funkce vrátí JSON objekt, kde řetězec `status` předá chybovou zprávu.

Celkově by naše funkce `updateMessage` měla vypadat takto:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //zpracování chyb vstupů
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Připojte svou peněženku MetaMask pro aktualizaci zprávy na blockchainu.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Vaše zpráva nemůže být prázdný řetězec.",
    }
  }

  //nastavení parametrů transakce
  const transactionParameters = {
    to: contractAddress, // Vyžadováno kromě publikací kontraktů.
    from: address, // musí se shodovat s aktivní adresou uživatele.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //podepsání transakce
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
            Zobrazte stav své transakce na Etherscanu!
          </a>
          <br />
          ℹ️ Jakmile bude transakce ověřena sítí, zpráva bude
          aktualizována automaticky.
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

V neposlední řadě musíme naši funkci `updateMessage` propojit s naší komponentou `HelloWorld.js`.

#### Propojení `updateMessage` s frontendem `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Naše funkce `onUpdatePressed` by měla provést await volání na importovanou funkci `updateMessage` a upravit stavovou proměnnou `status`, aby odrážela, zda naše transakce uspěla nebo selhala:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Je to super čisté a jednoduché. A hádejte co... VAŠE DAPP JE HOTOVÁ!!!

Jděte do toho a otestujte tlačítko **Aktualizovat**!

### Vytvořte si vlastní dapp {#make-your-own-custom-dapp}

Skvělé, dostali jste se až na konec tutoriálu! Abychom to shrnuli, naučili jste se:

- Připojit peněženku MetaMask k vašemu projektu dapp
- Číst data z vašeho chytrého kontraktu pomocí [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
- Podepisovat transakce Ethereum pomocí MetaMask

Nyní jste plně vybaveni k tomu, abyste dovednosti z tohoto tutoriálu uplatnili při vytváření vlastního projektu dapp! Jako vždy, pokud máte nějaké otázky, neváhejte se na nás obrátit s žádostí o pomoc na [Discordu Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Jakmile dokončíte tento tutoriál, dejte nám vědět, jaké byly vaše zkušenosti, nebo pokud máte nějakou zpětnou vazbu, tak nás označte na Twitteru [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
