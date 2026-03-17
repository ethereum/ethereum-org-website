---
title: "Chytrý kontrakt Hello World pro začátečníky"
description: "Úvodní tutoriál k psaní a nasazení jednoduchého chytrého kontraktu na Ethereum."
author: "elanh"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "smart kontrakt účty",
    "nasazování"
  ]
skill: beginner
lang: cs
published: 2021-03-31
---

Pokud s vývojem na blockchainu teprve začínáte a nevíte, kde začít, nebo pokud jen chcete pochopit, jak nasadit chytré kontrakty a interagovat s nimi, je tento průvodce určen právě vám. Provedeme vás vytvořením a nasazením jednoduchého chytrého kontraktu na testovací síti Sepolia pomocí virtuální peněženky [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) a [Alchemy](https://www.alchemy.com/eth) (nebojte se, pokud ještě ničemu z toho nerozumíte, všechno si vysvětlíme).

Ve [2. části](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) tohoto tutoriálu si projdeme, jak můžeme s naším nasazeným chytrým kontraktem interagovat, a ve [3. části](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) si ukážeme, jak ho publikovat na Etherscanu.

Pokud budete mít v kterémkoliv bodě dotazy, neváhejte se zeptat na [Discordu Alchemy](https://discord.gg/gWuC7zB)!

## Krok 1: Připojení k síti Ethereum {#step-1}

Existuje mnoho způsobů, jak posílat požadavky na blockchain Etherea. Pro zjednodušení použijeme bezplatný účet na Alchemy, vývojářské platformy a API pro blockchain, která nám umožňuje komunikovat s blockchainem Etherea, aniž bychom museli provozovat vlastní uzly. Tato platforma má také vývojářské nástroje pro monitorování a analýzu, které v tomto tutoriálu využijeme, abychom pochopili, co se děje „pod kapotou“ při nasazení našeho chytrého kontraktu. Pokud ještě nemáte účet Alchemy, [můžete se zdarma zaregistrovat zde](https://dashboard.alchemy.com/signup).

## Krok 2: Vytvořte svou aplikaci (a klíč API) {#step-2}

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat klíč API vytvořením aplikace. To nám umožní posílat požadavky do testovací sítě Sepolia. Pokud neznáte testovací sítě, podívejte se na [tuto stránku](/developers/docs/networks/).

1. Přejděte na stránku „Vytvořit novou aplikaci“ na vašem řídicím panelu Alchemy tak, že na navigační liště vyberete možnost „Vybrat aplikaci“ a kliknete na „Vytvořit novou aplikaci“

![Vytvoření aplikace Hello World](./hello-world-create-app.png)

2. Pojmenujte svou aplikaci „Hello World“, uveďte krátký popis a vyberte případ použití, např. „Infra & nástroje“. Dále vyhledejte „Ethereum“ a vyberte síť.

![Pohled na vytvoření aplikace Hello World](./create-app-view-hello-world.png)

3. Kliknutím na „Další“ pokračujte, poté na „Vytvořit aplikaci“ a je to! Vaše aplikace by se měla objevit v rozevírací nabídce na navigační liště s klíčem API, který si můžete zkopírovat.

## Krok 3: Vytvoření účtu Ethereum (adresy) {#step-3}

K odesílání a přijímání transakcí potřebujeme ethereový účet. Pro tento výukový program použijeme MetaMask, virtuální peněženku v prohlížeči, která slouží ke správě adresy vašeho ethereového účtu. Více o [transakcích](/developers/docs/transactions/).

Můžete si stáhnout MetaMask a zdarma si vytvořit účet Ethereum [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste se přepnuli na testovací síť „Sepolia“ pomocí rozevírací nabídky sítě (abychom nepracovali se skutečnými penězi).

Pokud síť Sepolia v seznamu nevidíte, přejděte do nabídky, poté do „Pokročilé“ a sjeďte dolů, abyste zapnuli možnost „Zobrazit testovací sítě“. V nabídce pro výběr sítě zvolte záložku „Vlastní“, kde najdete seznam testovacích sítí a vyberete „Sepolia“.

![Příklad sítě Sepolia v MetaMask](./metamask-sepolia-example.png)

## Krok 4: Přidání etheru z faucetu {#step-4}

Abychom mohli náš chytrý kontrakt nasadit na testovací síť, budeme potřebovat nějaké falešné ETH. Pro získání ETH na síti Sepolia můžete přejít na [podrobnosti o síti Sepolia](/developers/docs/networks/#sepolia) a zobrazit si seznam různých faucetů. Pokud jeden nefunguje, zkuste jiný, protože jim někdy mohou dojít prostředky. Může chvíli trvat, než obdržíte své falešné ETH, kvůli vytížení sítě. Brzy poté byste měli vidět ETH ve svém účtu MetaMask!

## Krok 5: Kontrola zůstatku {#step-5}

Abychom si ověřili, že máme zůstatek, provedeme požadavek [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) pomocí [nástroje Composer od Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Tím se vrátí množství ETH v naší peněžence. Po zadání adresy vašeho účtu MetaMask a kliknutí na „Send Request“ byste měli vidět takovouto odpověď:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **POZNÁMKA:** Tento výsledek je ve wei, nikoliv v ETH. Wei se používá jako nejmenší denominace etheru. Převod z wei na ETH je: 1 ETH = 10<sup>18</sup> wei. Takže když převedeme 0x2B5E3AF16B1880000 na desetinné číslo, dostaneme 5\*10¹⁸, což se rovná 5 ETH.
>
> Uf! Naše falešné peníze jsou všechny tady <Emoji text=":money_mouth_face:" size={1} />.

## Krok 6: Inicializace našeho projektu {#step-6}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte na příkazový řádek a zadejte:

```
mkdir hello-world
cd hello-world
```

Nyní, když jsme uvnitř složky našeho projektu, použijeme `npm init` k inicializaci projektu. Pokud ještě nemáte nainstalovaný npm, postupujte podle [těchto pokynů](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (budeme také potřebovat Node.js, takže si ho také stáhněte!).

```
npm init
```

Nezáleží na tom, jak odpovíte na instalační otázky, zde je pro referenci, jak jsme to udělali my:

```
název balíčku: (hello-world)
verze: (1.0.0)
popis: chytrý kontrakt hello world
vstupní bod: (index.js)
testovací příkaz:
git repozitář:
klíčová slova:
autor:
licence: (ISC)
Chystáte se zapsat do /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "chytrý kontrakt hello world",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Schvalte package.json a můžeme pokračovat!

## Krok 7: Stažení [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním budování chytrých kontraktů a dapps před jejich nasazením na živý řetězec.

Uvnitř našeho projektu `hello-world` spusťte:

```
npm install --save-dev hardhat
```

Další podrobnosti o [instalačních pokynech](https://hardhat.org/getting-started/#overview) naleznete na této stránce.

## Krok 8: Vytvoření projektu Hardhat {#step-8}

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

👷 Vítejte v Hardhat v2.0.11 👷‍?

Co chcete udělat? …
Vytvořit vzorový projekt
❯ Vytvořit prázdný hardhat.config.js
Ukončit
```

Tím se nám vygeneruje soubor `hardhat.config.js`, ve kterém specifikujeme veškeré nastavení našeho projektu (v kroku 13).

## Krok 9: Přidání složek projektu {#step-9}

Abychom si v našem projektu udrželi pořádek, vytvoříme dvě nové složky. Přejděte do kořenového adresáře projektu v příkazovém řádku a zadejte:

```
mkdir contracts
mkdir scripts
```

- `contracts/` je místo, kam uložíme soubor s kódem našeho chytrého kontraktu Hello World
- `scripts/` je místo, kam uložíme skripty pro nasazení našeho kontraktu a interakci s ním

## Krok 10: Napsání našeho kontraktu {#step-10}

Možná si říkáte, kdy už konečně budeme psát nějaký kód?? Tak jsme tady, v kroku 10.

Otevřete projekt hello-world ve svém oblíbeném editoru (my máme rádi [VSCode](https://code.visualstudio.com/)). Chytré kontrakty se píší v jazyce zvaném Solidity, který použijeme k napsání našeho chytrého kontraktu HelloWorld.sol.‌

1. Přejděte do složky „contracts“ a vytvořte nový soubor s názvem HelloWorld.sol
2. Níže je ukázkový chytrý kontrakt Hello World od Nadace Ethereum, který budeme používat pro tento tutoriál. Zkopírujte a vložte níže uvedený obsah do souboru HelloWorld.sol a nezapomeňte si přečíst komentáře, abyste pochopili, co tento kontrakt dělá:

```solidity
// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je soubor funkcí a dat (jeho stav). Po nasazení se kontrakt nachází na určité adrese na blockchainu Etherea. Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné z vnějšku kontraktu a vytváří funkci, kterou mohou jiné kontrakty nebo klienti volat pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha objektově orientovaných jazycích založených na třídách je konstruktor speciální funkce, která se provede pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Více informací:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá argument řetězce `initMessage` a nastavuje hodnotu do úložné proměnné `message` kontraktu).
      message = initMessage;
   }

   // Veřejná funkce, která přijímá argument řetězce a aktualizuje úložnou proměnnou `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Jedná se o super jednoduchý chytrý kontrakt, který při vytvoření uloží zprávu a lze jej aktualizovat voláním funkce `update`.

## Krok 11: Připojení MetaMask a Alchemy k vašemu projektu {#step-11}

Vytvořili jsme si peněženku MetaMask, účet Alchemy a napsali jsme náš chytrý kontrakt, nyní je čas je všechny tři propojit.

Každá transakce odeslaná z vaší virtuální peněženky vyžaduje podpis pomocí vašeho jedinečného privátního klíče. Abychom našemu programu poskytli toto oprávnění, můžeme bezpečně uložit náš privátní klíč (a klíč API od Alchemy) do souboru prostředí.

> Chcete-li se dozvědět více o odesílání transakcí, podívejte se na [tento výukový program](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) o odesílání transakcí pomocí web3.

Nejprve nainstalujte balíček dotenv do adresáře vašeho projektu:

```
npm install dotenv --save
```

Poté vytvořte soubor `.env` v kořenovém adresáři našeho projektu a přidejte do něj svůj privátní klíč MetaMask a adresu URL rozhraní HTTP API od Alchemy.

- Pro exportování soukromého klíče postupujte podle [těchto pokynů](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)
- Níže naleznete postup, jak získat URL pro HTTP API Alchemy

![Získání klíče API Alchemy](./get-alchemy-api-key.png)

Zkopírujte URL API Alchemy

Váš soubor `.env` by měl vypadat takto:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/váš-api-klíč"
PRIVATE_KEY = "váš-soukromý-klíč-metamask"
```

Abychom je skutečně propojili s naším kódem, budeme na tyto proměnné odkazovat v našem souboru `hardhat.config.js` v kroku 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nenahrávejte `<code>.env</code>`! Prosím, ujistěte se, že nikdy nesdílíte ani nezveřejňujete svůj soubor `<code>.env</code>` s nikým, protože tím ohrožujete svá tajemství. Pokud používáte správu verzí, přidejte svůj soubor `<code>.env</code>` do souboru <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Krok 12: Instalace Ethers.js {#step-12-install-ethersjs}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](/developers/docs/apis/json-rpc/) uživatelsky přívětivějšími metodami.

Hardhat velmi usnadňuje integraci [pluginů](https://hardhat.org/plugins/) pro další nástroje a rozšířenou funkčnost. Pro nasazení kontraktu využijeme [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) ([Ethers.js](https://github.com/ethers-io/ethers.js/) má několik velmi čistých metod pro nasazení kontraktu).

V adresáři projektu zadejte:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

V dalším kroku také budeme vyžadovat Ethers v našem souboru `hardhat.config.js`.

## Krok 13: Aktualizace souboru hardhat.config.js {#step-13-update-hardhatconfigjs}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat `hardhat.config.js`, aby o nich náš projekt věděl.

Aktualizujte svůj soubor `hardhat.config.js`, aby vypadal takto:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## Krok 14: Kompilace našeho kontraktu {#step-14-compile-our-contracts}

Abychom se ujistili, že zatím vše funguje, zkompilujeme si náš kontrakt. Úkol `compile` je jedním z vestavěných úkolů Hardhatu.

Z příkazového řádku spusťte:

```
npx hardhat compile
```

Může se vám zobrazit varování `SPDX license identifier not provided in source file`, ale nemusíte se tím znepokojovat – doufejme, že všechno ostatní vypadá dobře! Pokud ne, vždy můžete napsat zprávu na [discordu Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napsání našeho skriptu pro nasazení {#step-15-write-our-deploy-scripts}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/`, vytvořte nový soubor s názvem `deploy.js` a přidejte do něj následující obsah:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Spustí nasazení a vrátí příslib, který se vyřeší na objekt kontraktu
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Kontrakt nasazen na adresu:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat skvěle vysvětluje, co každý z těchto řádků kódu dělá ve svém [výukovém programu Kontrakty](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my jsme zde jejich vysvětlení převzali.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` v ethers.js je abstrakce, která se používá k nasazování nových chytrých kontraktů, takže `HelloWorld` je zde továrna pro instance našeho kontraktu hello world. Při použití pluginu `hardhat-ethers` jsou instance `ContractFactory` a `Contract` ve výchozím nastavení připojeny k prvnímu podepisujícímu.

```
const hello_world = await HelloWorld.deploy();
```

Volání `deploy()` na `ContractFactory` spustí nasazení a vrátí `Promise`, který se vyřeší na `Contract`. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu.

## Krok 16: Nasazení našeho kontraktu {#step-16-deploy-our-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte na příkazový řádek a spusťte:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Měli byste pak vidět něco takového:

```
Kontrakt nasazen na adresu: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Pokud přejdeme na [Etherscan sítě Sepolia](https://sepolia.etherscan.io/) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Transakce bude vypadat nějak takto:

![Kontrakt na Etherscanu](./etherscan-contract.png)

Adresa `From` by se měla shodovat s adresou vašeho účtu MetaMask a u adresy „To“ bude uvedeno „Vytvoření kontraktu“, ale pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli `To`:

![Transakce na Etherscanu](./etherscan-transaction.png)

Výborně! Právě jste nasadili chytrý kontrakt na blockchain Etherea 🎉

Abychom pochopili, co se děje „pod pokličkou“, přejděme na kartu Explorer v našem [ovládacím panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Pokud máte více aplikací Alchemy, ujistěte se, že filtrujete podle aplikace a vyberete „Hello World“.
![Průzkumník Hello World](./hello-world-explorer.png)

Zde uvidíte několik volání JSON-RPC, které za nás Hardhat/Ethers provedly „pod kapotou“, když jsme zavolali funkci `.deploy()`. Dvě důležité, které je třeba zmínit, jsou [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), což je požadavek na skutečný zápis našeho kontraktu do blockchainu Sepolia, a [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), což je požadavek na čtení informací o naší transakci na základě haše (typický vzor u
transakcí). Chcete-li se dozvědět více o odesílání transakcí, podívejte se na tento tutoriál o [odesílání transakcí pomocí Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

To je vše k 1. části tohoto tutoriálu, ve 2. části budeme s naším chytrým kontraktem skutečně [interagovat](https://www.alchemy.com/docs/interacting-with-a-smart-contract) aktualizací naší původní zprávy a ve 3. části náš chytrý kontrakt [publikujeme na Etherscanu](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), aby každý věděl, jak s ním interagovat.

**Chcete se o Alchemy dozvědět více?** Podívejte se na náš [web](https://www.alchemy.com/eth). Nechcete si nechat ujít žádnou aktualizaci? Přihlaste se k odběru našeho newsletteru [zde](https://www.alchemy.com/newsletter)! Nezapomeňte se také připojit na náš [Discord](https://discord.gg/u72VCg3).\*\*.
