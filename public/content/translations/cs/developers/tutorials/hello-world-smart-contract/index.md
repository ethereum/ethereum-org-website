---
title: "Chytrý kontrakt Hello World pro začátečníky"
description: "Úvodní tutoriál o psaní a nasazení jednoduchého chytrého kontraktu na Ethereu."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "chytré kontrakty", "nasazení"]
skill: beginner
breadcrumb: Kontrakt Hello World
lang: cs
published: 2021-03-31
---

Pokud jste ve vývoji na blockchainu nováčkem a nevíte, kde začít, nebo pokud jen chcete pochopit, jak nasadit chytré kontrakty a jak s nimi interagovat, je tento průvodce určen právě vám. Projdeme si vytvoření a nasazení jednoduchého chytrého kontraktu v testovací síti Sepolia pomocí virtuální peněženky [MetaMask](https://metamask.io/), jazyka [Solidity](https://docs.soliditylang.org/), nástroje [Hardhat](https://hardhat.org/) a platformy [Alchemy](https://www.alchemy.com/eth) (nebojte se, pokud zatím nerozumíte tomu, co to všechno znamená, vysvětlíme si to).

Jakmile bude váš kontrakt nasazen, můžete pro něj [vytvořit uživatelské rozhraní](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Pokud budete mít v jakémkoli okamžiku dotazy, neváhejte se ozvat na [Discordu Alchemy](https://discord.gg/gWuC7zB)!

## Krok 1: Připojení k síti Ethereum {#step-1}

Existuje mnoho způsobů, jak zadávat požadavky na řetězec Ethereum. Pro jednoduchost použijeme bezplatný účet na Alchemy, vývojářské platformě pro blockchain a API, která nám umožňuje komunikovat s řetězcem Ethereum, aniž bychom museli provozovat vlastní uzly. Platforma má také vývojářské nástroje pro monitorování a analytiku, které v tomto tutoriálu využijeme k pochopení toho, co se děje pod pokličkou při nasazení našeho chytrého kontraktu. Pokud ještě nemáte účet na Alchemy, [můžete se zde zdarma zaregistrovat](https://dashboard.alchemy.com/signup).

## Krok 2: Vytvoření aplikace (a API klíče) {#step-2}

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat API klíč vytvořením aplikace. To nám umožní zadávat požadavky do testovací sítě Sepolia. Pokud nejste obeznámeni s testovacími sítěmi, podívejte se na [tuto stránku](/developers/docs/networks/).

1.  Přejděte na stránku „Create new app“ (Vytvořit novou aplikaci) na svém panelu Alchemy tak, že v navigačním panelu vyberete „Select an app“ (Vybrat aplikaci) a kliknete na „Create new app“.

![Hello world create app](./hello-world-create-app.png)

2. Pojmenujte svou aplikaci „Hello World“, přidejte krátký popis a vyberte případ použití, např. „Infra & Tooling“. Dále vyhledejte „Ethereum“ a vyberte síť.

![create app view hello world](./create-app-view-hello-world.png)

3. Pokračujte kliknutím na „Next“ (Další), poté na „Create app“ (Vytvořit aplikaci) a to je vše! Vaše aplikace by se měla objevit v rozbalovací nabídce navigačního panelu s API klíčem, který si můžete zkopírovat.

## Krok 3: Vytvoření účtu (adresy) na Ethereu {#step-3}

K odesílání a přijímání transakcí potřebujeme účet na Ethereu. Pro tento tutoriál použijeme MetaMask, virtuální peněženku v prohlížeči, která se používá ke správě adresy vašeho účtu na Ethereu. Více o [transakcích](/developers/docs/transactions/).

MetaMask si můžete stáhnout a účet na Ethereu si zdarma vytvořit [zde](https://metamask.io/download). Když si vytváříte účet, nebo pokud už účet máte, nezapomeňte přepnout na testovací síť „Sepolia“ pomocí rozbalovací nabídky sítí (abychom nepracovali se skutečnými penězi).

Pokud v seznamu nevidíte síť Sepolia, otevřete nabídku v pravém horním rohu, vyberte „Networks“ (Sítě) a ve spodní části seznamu sítí zapněte možnost „Show test networks“ (Zobrazit testovací sítě) (viz [průvodce MetaMasku pro zobrazení testovacích sítí](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Poté v nabídce výběru sítě vyberte „Sepolia“.

![metamask sepolia example](./metamask-sepolia-example.png)

## Krok 4: Přidání etheru z faucetu {#step-4}

Abychom mohli nasadit náš chytrý kontrakt do testovací sítě, budeme potřebovat nějaké falešné ETH. Chcete-li získat Sepolia ETH, můžete přejít na [podrobnosti o síti Sepolia](/developers/docs/networks/#sepolia), kde najdete seznam různých faucetů. Pokud jeden nefunguje, zkuste jiný, protože někdy mohou vyschnout. Některé faucety mají pravidla způsobilosti; například faucet Sepolia od Alchemy vyžaduje, aby přijímající adresa držela alespoň 0,001 ETH na síti Ethereum Mainnet. Přijetí falešných ETH může nějakou dobu trvat kvůli provozu v síti. Brzy poté byste měli vidět ETH na svém účtu MetaMask!

## Krok 5: Kontrola zůstatku {#step-5}

Abychom si ověřili, že tam náš zůstatek je, vytvořme požadavek [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) pomocí [nástroje composer od Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Tím se vrátí množství ETH v naší peněžence. Po zadání adresy vašeho účtu MetaMask a kliknutí na „Send Request“ (Odeslat požadavek) byste měli vidět podobnou odpověď:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **POZNÁMKA:** Tento výsledek je ve Wei, nikoli v ETH. Wei se používá jako nejmenší nominální hodnota etheru. Převod z Wei na ETH je: 1 eth = 10<sup>18</sup> Wei. Pokud tedy převedeme 0x2B5E3AF16B1880000 do desítkové soustavy, dostaneme 5\*10¹⁸, což se rovná 5 ETH.
>
> Uf! Naše falešné peníze tam všechny jsou <Emoji text=":money_mouth_face:" size={1} />.

## Krok 6: Inicializace našeho projektu {#step-6}

Nejprve budeme muset vytvořit složku pro náš projekt. Přejděte do příkazového řádku a zadejte:

```sh
mkdir hello-world
cd hello-world
```

Nyní, když jsme ve složce našeho projektu, použijeme `npm init` k inicializaci projektu. Pokud ještě nemáte nainstalovaný npm, postupujte podle [pokynů k instalaci Node.js](https://nodejs.org/en/download/) (pro tento tutoriál budeme potřebovat Node.js a npm).

```sh
npm init
```

Nezáleží na tom, jak odpovíte na instalační otázky, zde je pro referenci ukázka, jak jsme to udělali my:

```console
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

Schvalte soubor package.json. Hardhat 3, který nainstalujeme vzápětí, podporuje pouze projekty s ES moduly, takže projekt jako takový označte:

```sh
npm pkg set type=module
```

A můžeme začít!

## Krok 7: Stažení nástroje [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat je vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum. Pomáhá vývojářům při lokálním vytváření chytrých kontraktů a decentralizovaných aplikací (dapp) před jejich nasazením do živého řetězce.

Hardhat 3 vyžaduje Node.js v22.13.0 nebo novější. Uvnitř našeho projektu `hello-world` spusťte:

```sh
npm install --save-dev hardhat
```

Další podrobnosti o [pokynech k instalaci](https://hardhat.org/docs/getting-started) najdete na této stránce.

## Krok 8: Vytvoření projektu Hardhat {#step-8}

Spuštění `npx hardhat --init` by vygenerovalo kompletní ukázkový projekt, ale pro tento tutoriál vše nastavíme ručně, abyste viděli každou část. V kořenovém adresáři složky vašeho projektu vytvořte soubor s názvem `hardhat.config.js` s následujícím obsahem:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Zde specifikujeme veškeré nastavení pro náš projekt (v kroku 13). Prozatím to jen říká nástroji Hardhat, kterou verzi kompilátoru Solidity má použít.

## Krok 9: Přidání složek projektu {#step-9}

Abychom udrželi náš projekt organizovaný, vytvoříme dvě nové složky. Přejděte do kořenového adresáře vašeho projektu v příkazovém řádku a zadejte:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` je místo, kde budeme uchovávat soubor s kódem našeho chytrého kontraktu hello world
- `scripts/` je místo, kde budeme uchovávat skripty pro nasazení a interakci s naším kontraktem

## Krok 10: Napsání našeho kontraktu {#step-10}

Možná se ptáte sami sebe, kdy už sakra budeme psát kód?? No, jsme tady, u kroku 10.

Otevřete projekt hello-world ve svém oblíbeném editoru (my máme rádi [VSCode](https://code.visualstudio.com/)). Chytré kontrakty se píší v jazyce zvaném Solidity, který použijeme k napsání našeho chytrého kontraktu HelloWorld.sol.‌

1.  Přejděte do složky „contracts“ a vytvořte nový soubor s názvem HelloWorld.sol
2.  Níže je ukázkový chytrý kontrakt Hello World od Nadace Ethereum, který budeme používat pro tento tutoriál. Zkopírujte a vložte níže uvedený obsah do souboru HelloWorld.sol a nezapomeňte si přečíst komentáře, abyste pochopili, co tento kontrakt dělá:

```solidity
// SPDX-License-Identifier: MIT
// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je soubor funkcí a dat (jeho stavu). Po nasazení se kontrakt nachází na konkrétní adrese na blockchainu Etherea. Více informací: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Deklaruje stavovou proměnnou `message` typu `string`.
   // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu. Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu a vytváří funkci, kterou mohou volat jiné kontrakty nebo klienti pro přístup k hodnotě.
   string public message;

   // Podobně jako v mnoha třídně orientovaných objektových jazycích je konstruktor speciální funkce, která se provede pouze při vytvoření kontraktu.
   // Konstruktory se používají k inicializaci dat kontraktu. Více informací: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Přijímá řetězcový argument `initMessage` a nastavuje hodnotu do úložné proměnné kontraktu `message`).
      message = initMessage;
   }

   // Veřejná funkce, která přijímá řetězcový argument a aktualizuje úložnou proměnnou `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Jedná se o super jednoduchý chytrý kontrakt, který při vytvoření uloží zprávu a lze jej aktualizovat zavoláním funkce `update`.

## Krok 11: Připojení MetaMask a Alchemy k vašemu projektu {#step-11}

Vytvořili jsme peněženku MetaMask, účet na Alchemy a napsali náš chytrý kontrakt, nyní je čas tyto tři věci propojit.

Každá transakce odeslaná z vaší virtuální peněženky vyžaduje podpis pomocí vašeho jedinečného soukromého klíče. Abychom našemu programu poskytli toto oprávnění, můžeme bezpečně uložit náš soukromý klíč (a API klíč Alchemy) do souboru prostředí.

> Chcete-li se dozvědět více o odesílání transakcí, podívejte se do [dokumentace k transakcím](/developers/docs/transactions/).

Vytvořte soubor `.env` v kořenovém adresáři našeho projektu a přidejte do něj svůj soukromý klíč MetaMask a HTTP Alchemy API URL.

- Postupujte podle [těchto pokynů](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) pro export vašeho soukromého klíče
- Níže se podívejte, jak získat HTTP Alchemy API URL

![get alchemy api key](./get-alchemy-api-key.png)

Zkopírujte Alchemy API URL

Váš soubor `.env` by měl vypadat takto:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Abychom je skutečně propojili s naším kódem, budeme na tyto proměnné odkazovat v našem souboru `hardhat.config.js` v kroku 13. Node.js umí číst soubory `.env` sám o sobě, takže není nutné instalovat žádný další balíček.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nepřidávejte <code>.env</code> do gitu (commit)! Ujistěte se, že svůj soubor <code>.env</code> nikdy s nikým nesdílíte ani ho nevystavujete, protože byste tím ohrozili svá tajemství. Pokud používáte správu verzí, přidejte svůj <code>.env</code> do souboru <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Krok 12: Instalace Ethers.js {#step-12-install-ethersjs}

Ethers.js je knihovna, která usnadňuje interakci a zadávání požadavků na Ethereum tím, že obaluje [standardní metody JSON-RPC](/developers/docs/apis/json-rpc/) uživatelsky přívětivějšími metodami.

Hardhat velmi usnadňuje integraci [pluginů](https://hardhat.org/docs/plugins/official-plugins) pro další nástroje a rozšířenou funkcionalitu. Využijeme [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) pro nasazení kontraktu ([Ethers.js](https://docs.ethers.org/v6/) má několik super čistých metod pro nasazení kontraktu).

V adresáři vašeho projektu zadejte:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Plugin také přidáme do našeho `hardhat.config.js` v dalším kroku.

## Krok 13: Aktualizace hardhat.config.js {#step-13-update-hardhatconfigjs}

Zatím jsme přidali několik závislostí a pluginů, nyní musíme aktualizovat `hardhat.config.js`, aby o nich náš projekt věděl.

Aktualizujte svůj `hardhat.config.js` tak, aby vypadal takto:

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

`configVariable` říká nástroji Hardhat, aby četl každou hodnotu z proměnné prostředí pouze tehdy, když je to potřeba, takže příkazy jako `compile` fungují ještě před nastavením hodnot. Pokud byste raději neuchovávali svůj soukromý klíč v prostém textovém souboru, Hardhat může také číst [konfigurační proměnné ze zašifrovaného úložiště klíčů](https://hardhat.org/docs/guides/configuration-variables).

## Krok 14: Kompilace našeho kontraktu {#step-14-compile-our-contracts}

Abychom se ujistili, že zatím vše funguje, zkompilujme náš kontrakt. Úloha `compile` je jednou z vestavěných úloh nástroje Hardhat.

Z příkazového řádku spusťte:

```sh
npx hardhat compile
```

Při první kompilaci si Hardhat stáhne kompilátor Solidity. Poté byste měli vidět něco jako `Compiled 1 Solidity file with solc 0.8.34`. Pokud ne, můžete vždy napsat na [Discord Alchemy](https://discord.gg/gWuC7zB).

## Krok 15: Napsání našeho skriptu pro nasazení {#step-15-write-our-deploy-scripts}

Nyní, když je náš kontrakt napsán a náš konfigurační soubor je připraven, je čas napsat náš skript pro nasazení kontraktu.

Přejděte do složky `scripts/` a vytvořte nový soubor s názvem `deploy.js`, do kterého přidejte následující obsah:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Spustí nasazení a vrátí promise, který se vyhodnotí jako objekt kontraktu
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Pojďme si projít, co dělá každý z těchto řádků kódu.

```js
const { ethers } = await network.create()
```

V Hardhat 3 skript otevírá připojení k síti explicitně. `network.create()` se připojí k síti, kterou vyberete pomocí volby `--network` při spuštění skriptu, a plugin `hardhat-ethers` přidá k tomuto připojení objekt `ethers`.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` v ethers.js je abstrakce používaná k nasazení nových chytrých kontraktů, takže `HelloWorld` je zde továrna pro instance našeho kontraktu hello world. Při použití pluginu `hardhat-ethers` jsou instance `ContractFactory` a `Contract` ve výchozím nastavení připojeny k prvnímu podepisujícímu (signer).

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Zavoláním `deploy()` na `ContractFactory` se zahájí nasazení a vrátí se `Promise`, který se vyřeší na `Contract`. Toto je objekt, který má metodu pro každou z funkcí našeho chytrého kontraktu. Argumenty, které předáte do `deploy()`, jdou do konstruktoru kontraktu, zde je to počáteční zpráva.

`waitForDeployment()` čeká, dokud není transakce nasazení zahrnuta do bloku, a `getAddress()` vrací adresu nového kontraktu. Další podrobnosti najdete v [dokumentaci ke kontraktům ethers.js](https://docs.ethers.org/v6/api/contract/).

## Krok 16: Nasazení našeho kontraktu {#step-16-deploy-our-contract}

Konečně jsme připraveni nasadit náš chytrý kontrakt! Přejděte do příkazového řádku a spusťte:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Poté byste měli vidět něco jako:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Pokud přejdeme na [Etherscan sítě Sepolia](https://sepolia.etherscan.io/) a vyhledáme adresu našeho kontraktu, měli bychom vidět, že byl úspěšně nasazen. Transakce bude vypadat nějak takto:

![etherscan contract](./etherscan-contract.png)

Adresa `From` by se měla shodovat s adresou vašeho účtu MetaMask a adresa `To` bude říkat „Contract Creation“, ale pokud klikneme na transakci, uvidíme adresu našeho kontraktu v poli `To`:

![etherscan transaction](./etherscan-transaction.png)

Gratulujeme! Právě jste nasadili chytrý kontrakt do řetězce Ethereum 🎉

Abyste pochopili, co se děje pod pokličkou, můžete se podívat na požadavky, které vaše aplikace „Hello World“ obdržela na vašem [panelu Alchemy](https://dashboard.alchemy.com/).

Tam uvidíte hrstku volání JSON-RPC, která pro nás Hardhat/Ethers pod pokličkou provedly, když jsme zavolali funkci `.deploy()`. Dvě důležitá volání, která zde stojí za zmínku, jsou [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), což je požadavek na skutečný zápis našeho kontraktu do řetězce Sepolia, a [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), což je požadavek na přečtení informací o naší transakci na základě hashe (typický vzor při odesílání transakcí). Chcete-li se dozvědět více o odesílání transakcí, podívejte se do [dokumentace k transakcím](/developers/docs/transactions/).

To je pro tento tutoriál vše. Dále můžete [vytvořit uživatelské rozhraní pro váš kontrakt](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
