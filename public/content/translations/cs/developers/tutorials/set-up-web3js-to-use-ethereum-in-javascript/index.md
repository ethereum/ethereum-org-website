---
title: Nastavení Web3.js pro použití blockchainu Etherea v JavaScriptu
description: Naučte se, jak nastavit a nakonfigurovat knihovnu Web3.js pro interakci s blockchainem Etherea z aplikací v JavaScriptu.
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: Nastavení Web3.js
lang: cs
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V tomto tutoriálu se podíváme, jak začít s [Web3.js](https://web3js.readthedocs.io/) pro interakci s blockchainem Etherea. Web3.js lze použít jak ve frontendu, tak v backendu ke čtení dat z blockchainu, provádění transakcí a dokonce i k nasazení chytrých kontraktů.

Prvním krokem je zahrnutí Web3.js do vašeho projektu. Chcete-li jej použít na webové stránce, můžete knihovnu importovat přímo pomocí CDN, jako je JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Pokud dáváte přednost instalaci knihovny pro použití ve vašem backendu nebo frontendovém projektu, který využívá sestavení (build), můžete ji nainstalovat pomocí npm:

```bash
npm install web3 --save
```

Poté pro import Web3.js do skriptu Node.js nebo frontendového projektu Browserify můžete použít následující řádek JavaScriptu:

```js
const Web3 = require("web3")
```

Nyní, když jsme knihovnu zahrnuli do projektu, musíme ji inicializovat. Váš projekt musí být schopen komunikovat s blockchainem. Většina knihoven Etherea komunikuje s [uzlem](/developers/docs/nodes-and-clients/) prostřednictvím RPC volání. K inicializaci našeho poskytovatele Web3 vytvoříme instanci Web3, přičemž jako konstruktor předáme URL poskytovatele. Pokud máte na svém počítači spuštěný uzel nebo [instanci Ganache](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), bude to vypadat takto:

```js
const web3 = new Web3("http://localhost:8545")
```

Pokud byste chtěli přistupovat přímo k hostovanému uzlu, můžete najít možnosti v sekci [uzly jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Abychom otestovali, že jsme naši instanci Web3 nakonfigurovali správně, pokusíme se získat číslo nejnovějšího bloku pomocí funkce `getBlockNumber`. Tato funkce přijímá jako parametr callback a vrací číslo bloku jako celé číslo (integer).

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Pokud tento program spustíte, jednoduše vypíše číslo nejnovějšího bloku: vrchol blockchainu. Můžete také použít volání funkcí `await/async`, abyste se vyhnuli vnořování callbacků ve vašem kódu:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Všechny dostupné funkce instance Web3 si můžete prohlédnout v [oficiální dokumentaci Web3.js](https://docs.web3js.org/).

Většina knihoven Web3 je asynchronní, protože na pozadí knihovna provádí JSON-RPC volání na uzel, který odesílá zpět výsledek.

<Divider />

Pokud pracujete v prohlížeči, některé peněženky přímo vkládají (inject) instanci Web3 a měli byste se ji snažit použít, kdykoli je to možné, zejména pokud plánujete interagovat s adresou Etherea uživatele za účelem provádění transakcí.

Zde je úryvek kódu pro detekci, zda je k dispozici peněženka MetaMask, a pokus o její povolení, pokud ano. Později vám to umožní číst zůstatek uživatele a umožní mu ověřovat transakce, které byste po něm chtěli provést na blockchainu Etherea:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // V případě potřeby vyžádat přístup k účtu
    await window.ethereum.enable()
    // Účty jsou nyní přístupné
  } catch (error) {
    // Uživatel odmítl přístup k účtu...
  }
}
```

Existují i alternativy k Web3.js, jako je [Ethers.js](https://docs.ethers.io/), které se také běžně používají. V dalším tutoriálu uvidíme, [jak snadno naslouchat nově příchozím blokům na blockchainu a zjistit, co obsahují](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).