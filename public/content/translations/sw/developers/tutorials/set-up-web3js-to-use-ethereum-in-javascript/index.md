---
title: Sanidi web3.js ili kutumia mnyororo wa bloku wa Ethereum katika JavaScript
description: Jifunze jinsi ya kuweka na kusanidi maktaba ya web3.js ili kuingiliana na mnyororo wa bloku wa Ethereum kutoka kwa programu za JavaScript.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: sw
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika somo hili, tutaona jinsi ya kuanza na [web3.js](https://web3js.readthedocs.io/) ili kuingiliana na mnyororo wa bloku wa Ethereum. Web3.js inaweza kutumika katika sehemu zote mbili za mbele na za nyuma ili kusoma data kutoka kwenye mnyororo wa bloku au kufanya miamala na hata kupeleka mikataba-erevu.

Hatua ya kwanza ni kujumuisha web3.js katika mradi wako. Ili kuitumia kwenye ukurasa wa wavuti, unaweza kuagiza maktaba moja kwa moja kwa kutumia CDN kama JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Ukipenda kusakinisha maktaba ili kuitumia katika sehemu ya nyuma au mradi wa mbele unaotumia muundo unaweza kuisakinisha kwa kutumia npm:

```bash
npm install web3 --save
```

Kisha ili kuagiza Web3.js katika hati ya Node.js au mradi wa mbele wa Browserify, unaweza kutumia mstari ufuatao wa JavaScript:

```js
const Web3 = require("web3")
```

Sasa kwa kuwa tumejumuisha maktaba katika mradi tunahitaji kuianzisha. Mradi wako unahitaji kuwa na uwezo wa kuwasiliana na mnyororo wa bloku. Maktaba nyingi za Ethereum huwasiliana na [nodi](/developers/docs/nodes-and-clients/) kupitia simu za RPC. Ili kuanzisha mtoa huduma wetu wa Web3, tutaanzisha mfano wa Web3 kwa kupitisha URL ya mtoa huduma kama kiunda. Ikiwa una nodi au [mfano wa ganache unaoendeshwa kwenye kompyuta yako](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) itaonekana kama hivi:

```js
const web3 = new Web3("http://localhost:8545")
```

Ikiwa ungependa kufikia moja kwa moja nodi iliyohifadhiwa unaweza kupata chaguo kwenye [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Ili kujaribu kwamba tumesanidi mfano wetu wa Web3 ipasavyo, tutajaribu kupata nambari ya bloku ya hivi karibuni kwa kutumia utendaji wa `getBlockNumber`. Utendaji huu unakubali simu ya kurudi kama kigezo na hurudisha nambari ya bloku kama nambari kamili.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Ukiendesha programu hii, itachapisha tu nambari ya bloku ya hivi karibuni: juu ya mnyororo wa bloku. Unaweza pia kutumia miito ya utendaji ya `await/async` ili kuepuka miito ya kurudi iliyopachikwa katika msimbo wako:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Unaweza kuona utendaji wote unaopatikana kwenye mfano wa Web3 katika [nyaraka rasmi za web3.js](https://docs.web3js.org/).

Maktaba nyingi za Web3 hazifanani kwa sababu chinichini maktaba hupiga simu za JSON-RPC kwa nodi ambayo hurudisha matokeo.

<Divider />

Ikiwa unafanya kazi kwenye kivinjari, baadhi ya pochi huweka mfano wa Web3 moja kwa moja na unapaswa kujaribu kuitumia kila inapowezekana hasa ikiwa unapanga kuingiliana na anwani ya Ethereum ya mtumiaji ili kufanya miamala.

Hii hapa ni sehemu fupi ya kugundua ikiwa pochi ya MetaMask inapatikana na kujaribu kuiwasha ikiwa ipo. Baadaye itakuruhusu kusoma salio la mtumiaji na kuwawezesha kuhalalisha miamala ambayo ungependa wafanye kwenye mnyororo wa bloku wa Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Omba ufikiaji wa akaunti ikiwa inahitajika
    await window.ethereum.enable()
    // Akaunti sasa zimefichuliwa
  } catch (error) {
    // Mtumiaji amekataa ufikiaji wa akaunti...
  }
}
```

Njia mbadala za web3.js kama [Ethers.js](https://docs.ethers.io/) zipo na pia hutumiwa kwa kawaida. Katika somo linalofuata tutaona [jinsi ya kusikiliza kwa urahisi bloku mpya zinazoingia kwenye mnyororo wa bloku na kuona yaliyomo ndani yake](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
