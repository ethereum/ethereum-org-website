---
title: Nastavení web3.js pro použití blockchainu Ethereum v JavaScriptu
description: Naučte se, jak nastavit a nakonfigurovat knihovnu web3.js pro interakci s blockchainem Etherea z javascriptových aplikací.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: cs
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V tomto tutoriálu se podíváme, jak začít s [web3.js](https://web3js.readthedocs.io/) pro interakci s blockchainem Etherea. Web3.js lze použít jak na frontendu, tak na backendu ke čtení dat z blockchainu, provádění transakcí, a dokonce i k nasazení chytrých kontraktů.

Prvním krokem je zahrnout web3.js do vašeho projektu. Chcete-li jej použít na webové stránce, můžete knihovnu importovat přímo pomocí CDN, jako je JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Pokud dáváte přednost instalaci knihovny pro použití ve vašem backendu nebo front-endovém projektu, který používá sestavení, můžete ji nainstalovat pomocí npm:

```bash
npm install web3 --save
```

Chcete-li poté importovat Web3.js do skriptu Node.js nebo front-endového projektu Browserify, můžete použít následující řádek JavaScriptu:

```js
const Web3 = require("web3")
```

Nyní, když jsme knihovnu zahrnuli do projektu, ji musíme inicializovat. Váš projekt musí být schopen komunikovat s blockchainem. Většina knihoven pro Ethereum komunikuje s [uzlem](/developers/docs/nodes-and-clients/) prostřednictvím volání RPC. Pro inicializaci poskytovatele Web3 vytvoříme instanci Web3 a jako konstruktor předáme URL adresu poskytovatele. Pokud máte na svém počítači spuštěný uzel nebo [instanci ganache](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), bude to vypadat takto:

```js
const web3 = new Web3("http://localhost:8545")
```

Pokud chcete přistupovat přímo k hostovanému uzlu, můžete najít možnosti na stránce [uzly jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Abychom otestovali, že jsme správně nakonfigurovali naši instanci Web3, zkusíme načíst číslo posledního bloku pomocí funkce `getBlockNumber`. Tato funkce přijímá jako parametr zpětné volání (callback) a vrací číslo bloku jako celé číslo.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Pokud tento program spustíte, jednoduše vypíše číslo posledního bloku: vrchol blockchainu. Můžete také použít volání funkcí `await/async`, abyste se vyhnuli vnořování zpětných volání (callbacks) ve vašem kódu:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Všechny dostupné funkce v instanci Web3 si můžete prohlédnout v [oficiální dokumentaci web3.js](https://docs.web3js.org/).

Většina knihoven Web3 je asynchronních, protože na pozadí knihovna provádí JSON-RPC volání na uzel, který posílá zpět výsledek.

<Divider />

Pokud pracujete v prohlížeči, některé peněženky přímo vkládají instanci Web3 a měli byste se ji pokusit použít, kdykoli je to možné, zejména pokud plánujete interagovat s ethereovou adresou uživatele za účelem provádění transakcí.

Zde je úryvek kódu pro zjištění, zda je k dispozici peněženka MetaMask, a pokud ano, pokus o její povolení. To vám později umožní číst zůstatek uživatele a umožní mu ověřovat transakce, které po něm chcete, aby na blockchainu Etherea provedl:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // V případě potřeby si vyžádejte přístup k účtu
    await window.ethereum.enable()
    // Účty jsou nyní odhaleny
  } catch (error) {
    // Uživatel odepřel přístup k účtu...
  }
}
```

Existují alternativy k web3.js, jako je [Ethers.js](https://docs.ethers.io/), které se také běžně používají. V dalším tutoriálu se podíváme, [jak snadno naslouchat novým příchozím blokům na blockchainu a vidět, co obsahují](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
