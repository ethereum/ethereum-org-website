---
title: "Začínáme s vývojem na Ethereu"
description: "Toto je průvodce pro začátečníky, jak začít s vývojem na Ethereu. Provedeme vás od spuštění koncového bodu API přes vytvoření požadavku z příkazové řádky až po napsání vašeho prvního Web3 skriptu! Nejsou potřeba žádné předchozí zkušenosti s vývojem na blockchainu!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "uzly", "dotazování", "Alchemy"]
skill: beginner
breadcrumb: "Začínáme"
lang: cs
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Toto je průvodce pro začátečníky, jak začít s vývojem na Ethereu. V tomto tutoriálu budeme používat [Alchemy](https://www.alchemy.com/), přední vývojářskou platformu pro blockchain, která pohání miliony uživatelů ze 70 % nejlepších blockchainových aplikací, včetně Maker, 0x, MyEtherWallet, Dharma a Kyber. Alchemy nám poskytne přístup ke koncovému bodu API na řetězci Etherea, abychom mohli číst a zapisovat transakce.

Provedeme vás od registrace na Alchemy až po napsání vašeho prvního Web3 skriptu! Nejsou potřeba žádné předchozí zkušenosti s vývojem na blockchainu!

## 1. Zaregistrujte si bezplatný účet na Alchemy {#sign-up-for-a-free-alchemy-account}

Vytvoření účtu na Alchemy je snadné, [zaregistrujte se zdarma zde](https://auth.alchemy.com/).

## 2. Vytvořte aplikaci na Alchemy {#create-an-alchemy-app}

Pro komunikaci s řetězcem Etherea a používání produktů Alchemy potřebujete API klíč k ověření vašich požadavků.

API klíče můžete [vytvořit z řídicího panelu](https://dashboard.alchemy.com/). Chcete-li vytvořit nový klíč, přejděte na „Create App“ (Vytvořit aplikaci), jak je znázorněno níže:

Zvláštní poděkování patří [_ShapeShift_](https://shapeshift.com/) _za to, že nám umožnili ukázat jejich řídicí panel!_

![Alchemy dashboard](./alchemy-dashboard.png)

Vyplňte podrobnosti v části „Create App“, abyste získali svůj nový klíč. Zde také uvidíte aplikace, které jste dříve vytvořili vy nebo váš tým. Existující klíče získáte kliknutím na „View Key“ (Zobrazit klíč) u jakékoli aplikace.

![Create app with Alchemy screenshot](./create-app.png)

Existující API klíče můžete také získat najetím myší na „Apps“ (Aplikace) a výběrem jedné z nich. Zde můžete kliknout na „View Key“, stejně jako na „Edit App“ (Upravit aplikaci) pro přidání konkrétních domén na whitelist, zobrazení několika vývojářských nástrojů a prohlížení analytiky.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Vytvořte požadavek z příkazového řádku

Komunikujte s blockchainem Etherea prostřednictvím Alchemy pomocí JSON-RPC a curl.

Pro manuální požadavky doporučujeme komunikovat s `JSON-RPC` prostřednictvím požadavků `POST`. Jednoduše předejte hlavičku `Content-Type: application/json` a váš dotaz jako tělo `POST` s následujícími poli:

- `jsonrpc`: Verze JSON-RPC – v současné době je podporována pouze verze `2.0`.
- `method`: Metoda API ETH. [Viz reference API.](/developers/docs/apis/json-rpc/)
- `params`: Seznam parametrů, které se mají předat metodě.
- `id`: ID vašeho požadavku. Bude vráceno v odpovědi, abyste mohli sledovat, ke kterému požadavku odpověď patří.

Zde je příklad, který můžete spustit z příkazového řádku pro získání aktuální ceny plynu:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**POZNÁMKA:** Nahraďte `https://eth-mainnet.alchemyapi.io/v2/demo` svým vlastním API klíčem `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Výsledky:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. Nastavte si svého Web3 klienta

**Pokud již máte existujícího klienta,** změňte aktuální URL poskytovatele uzlu na URL Alchemy s vaším API klíčem: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_POZNÁMKA:_** Níže uvedené skripty je nutné spustit v **prostředí Node.js** nebo **uložit do souboru**, nikoli spouštět z příkazového řádku. Pokud ještě nemáte nainstalovaný Node nebo npm, postupujte podle [pokynů k instalaci Node.js](https://nodejs.org/en/download/).

Existuje spousta [Web3 knihoven](/developers/docs/apis/javascript/), které můžete integrovat s Alchemy, nicméně doporučujeme použít [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), přímou náhradu za Web3.js, která je vytvořena a nakonfigurována tak, aby bezproblémově fungovala s Alchemy. To poskytuje řadu výhod, jako jsou automatické opakované pokusy a robustní podpora WebSocketů.

Chcete-li nainstalovat AlchemyWeb3.js, **přejděte do adresáře vašeho projektu** a spusťte:

**Pomocí Yarn:**

```
yarn add @alch/alchemy-web3
```

**Pomocí NPM:**

```
npm install @alch/alchemy-web3
```

Pro komunikaci s infrastrukturou uzlů Alchemy spusťte v Node.js nebo přidejte toto do souboru JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```
## 5. Napište svůj první Web3 skript!

Nyní, abychom si vyzkoušeli trochu Web3 programování v praxi, napíšeme jednoduchý skript, který vypíše číslo nejnovějšího bloku z Ethereum Mainnet.

**1. Pokud jste tak ještě neučinili, vytvořte si v terminálu nový adresář projektu a přejděte do něj pomocí cd:**

```
mkdir web3-example
cd web3-example
```

**2. Nainstalujte si do projektu závislost Alchemy Web3 (nebo jakoukoli jinou Web3), pokud jste tak ještě neučinili:**

```
npm install @alch/alchemy-web3
```

**3. Vytvořte soubor s názvem `index.js` a přidejte následující obsah:**

> Nakonec byste měli nahradit `demo` svým HTTP API klíčem Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Nejste obeznámeni s asynchronními funkcemi? Podívejte se na tento [článek na Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Spusťte jej v terminálu pomocí node**

```
node index.js
```

**5. Nyní byste měli v konzoli vidět výstup s číslem nejnovějšího bloku!**

```
The latest block number is 11043912
```

**Paráda! Gratulujeme! Právě jste napsali svůj první Web3 skript pomocí Alchemy 🎉**

Nevíte, co dál? Zkuste nasadit svůj první chytrý kontrakt a vyzkoušejte si programování v Solidity v našem [Průvodci chytrým kontraktem Hello World](/developers/tutorials/hello-world-smart-contract/), nebo pokračujte v prozkoumávání [dokumentace Alchemy](https://www.alchemy.com/docs/) pro další příklady.

_[Zaregistrujte se zdarma na Alchemy](https://auth.alchemy.com/), podívejte se na naši [dokumentaci](https://www.alchemy.com/docs/) a pro nejnovější zprávy nás sledujte na [Twitteru](https://twitter.com/AlchemyPlatform)_.
