---
title: "Začínáme s vývojem pro Ethereum"
description: "Toto je příručka pro začátečníky, jak začít s vývojem pro Ethereum. Provedeme vás od vytvoření koncového bodu API přes vytvoření požadavku z příkazového řádku až po napsání vašeho prvního web3 skriptu! Nejsou nutné žádné zkušenosti s vývojem na blockchainu!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "uzly",
    "dotazování",
    "alchemy"
  ]
skill: beginner
lang: cs
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Loga Etherea a Alchemy](./ethereum-alchemy.png)

Toto je příručka pro začátečníky, jak začít s vývojem pro Ethereum. V tomto tutoriálu budeme používat [Alchemy](https://alchemyapi.io/), přední vývojářskou platformu pro blockchain, která pohání miliony uživatelů ze 70 % nejlepších blockchainových aplikací, včetně Maker, 0x, MyEtherWallet, Dharma a Kyber. Alchemy nám poskytne přístup ke koncovému bodu API v řetězci Ethereum, abychom mohli číst a zapisovat transakce.

Provedeme vás od registrace u Alchemy až po napsání vašeho prvního web3 skriptu! Nejsou nutné žádné zkušenosti s vývojem na blockchainu!

## 1. Zaregistrujte si bezplatný účet Alchemy {#sign-up-for-a-free-alchemy-account}

Vytvoření účtu u Alchemy je snadné, [zaregistrujte se zdarma zde](https://auth.alchemy.com/).

## 2. Vytvořte aplikaci Alchemy {#create-an-alchemy-app}

Pro komunikaci s řetězcem Ethereum a pro používání produktů Alchemy potřebujete API klíč k ověření vašich požadavků.

API klíče můžete [vytvořit na řídicím panelu](https://dashboard.alchemy.com/). Chcete-li vytvořit nový klíč, přejděte na „Vytvořit aplikaci“, jak je ukázáno níže:

Zvláštní poděkování patří [_ShapeShift_](https://shapeshift.com/) _za to, že nám umožnili ukázat jejich řídicí panel!_

![Řídicí panel Alchemy](./alchemy-dashboard.png)

Vyplňte podrobnosti v sekci „Vytvořit aplikaci“, abyste získali svůj nový klíč. Můžete zde také vidět aplikace, které jste dříve vytvořili, a ty, které vytvořil váš tým. Stávající klíče získáte kliknutím na „Zobrazit klíč“ u kterékoli aplikace.

![Snímek obrazovky vytvoření aplikace s Alchemy](./create-app.png)

Stávající API klíče můžete také získat tak, že najedete kurzorem na „Aplikace“ a jednu vyberete. Zde můžete „zobrazit klíč“, a také „upravit aplikaci“ pro zařazení konkrétních domén na seznam povolených, prohlédnout si několik vývojářských nástrojů a zobrazit analytiku.

![Gif, který ukazuje uživateli, jak získat API klíče](./pull-api-keys.gif)

## 3. Vytvoření požadavku z příkazového řádku {#make-a-request-from-the-command-line}

S blockchainem Etherea můžete prostřednictvím Alchemy interagovat pomocí JSON-RPC a curl.

Pro ruční požadavky doporučujeme interagovat s `JSON-RPC` prostřednictvím požadavků `POST`. Jednoduše předejte hlavičku `Content-Type: application/json` a váš dotaz jako tělo `POST` s následujícími poli:

- `jsonrpc`: Verze JSON-RPC – v současné době je podporována pouze verze `2.0`.
- `method`: Metoda ETH API. [Viz reference API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Seznam parametrů, které se mají předat metodě.
- `id`: ID vašeho požadavku. Bude vráceno odpovědí, abyste mohli sledovat, ke kterému požadavku odpověď patří.

Zde je příklad, který můžete spustit z příkazového řádku pro získání aktuální ceny gasu:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**POZNÁMKA:** Nahraďte [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) svým vlastním API klíčem `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Výsledky:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Nastavte si svého Web3 klienta {#set-up-your-web3-client}

**Pokud již máte existujícího klienta,** změňte URL adresu svého současného poskytovatele uzlů na URL adresu Alchemy s vaším API klíčem: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_POZNÁMKA:_** Níže uvedené skripty je třeba spustit v **kontextu Node** nebo **uložit do souboru**, nikoli z příkazového řádku. Pokud ještě nemáte nainstalovaný Node nebo npm, podívejte se na tohoto rychlého [průvodce nastavením pro Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Existuje spousta [knihoven Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), které můžete integrovat s Alchemy, my však doporučujeme používat [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), přímou náhradu za web3.js, vytvořenou a nakonfigurovanou tak, aby bezproblémově fungovala s Alchemy. To poskytuje řadu výhod, jako jsou automatické opakované pokusy a robustní podpora WebSocketů.

Chcete-li nainstalovat AlchemyWeb3.js, **přejděte do adresáře svého projektu** a spusťte:

**S Yarn:**

```
yarn add @alch/alchemy-web3
```

**S NPM:**

```
npm install @alch/alchemy-web3
```

Chcete-li interagovat s infrastrukturou uzlů Alchemy, spusťte v NodeJS nebo přidejte toto do souboru JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Napište svůj první Web3 skript! {#write-your-first-web3-script}

Nyní si trochu „ušpiníme ruce“ programováním ve web3 a napíšeme jednoduchý skript, který vypíše číslo posledního bloku z hlavní sítě Ethereum (mainnetu).

**1.** Pokud jste tak ještě neučinili, ve svém terminálu vytvořte nový adresář projektu a přejděte do něj:\*\*

```
mkdir web3-example
cd web3-example
```

**2.** Nainstalujte si do projektu závislost Alchemy web3 (nebo jakoukoli jinou web3), pokud jste tak ještě neučinili:\*\*

```
npm install @alch/alchemy-web3
```

**3.** Vytvořte soubor s názvem `index.js` a přidejte do něj následující obsah:\*\*

> Nakonec byste měli `demo` nahradit svým HTTP API klíčem Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Číslo posledního bloku je " + blockNumber)
}
main()
```

Nevyznáte se v asynchronních věcech? Podívejte se na tento [příspěvek na serveru Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Spusťte jej ve svém terminálu pomocí node**

```
node index.js
```

**5. Nyní byste měli ve vaší konzoli vidět výstup s číslem posledního bloku!**

```
Číslo posledního bloku je 11043912
```

**Paráda! Výborně! Právě jste napsali svůj první web3 skript pomocí Alchemy 🎉**

Nevíte, co dál? Zkuste nasadit svůj první chytrý kontrakt a ponořte se do programování v Solidity v našem [Průvodci chytrým kontraktem Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), nebo si otestujte své znalosti řídicího panelu s [Demo aplikací řídicího panelu](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Zaregistrujte se zdarma u Alchemy](https://auth.alchemy.com/), prohlédněte si naši [dokumentaci](https://www.alchemy.com/docs/) a pro nejnovější zprávy nás sledujte na [Twitteru](https://twitter.com/AlchemyPlatform)_.
