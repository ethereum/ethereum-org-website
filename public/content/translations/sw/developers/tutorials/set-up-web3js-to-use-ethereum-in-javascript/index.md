---
title: Sanidi Web3.js ili kutumia mnyororo wa vitalu wa Ethereum katika JavaScript
description: Jifunze jinsi ya kusanidi na kuweka maktaba ya Web3.js ili kuingiliana na mnyororo wa vitalu wa Ethereum kutoka kwenye programu za JavaScript.
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: usanidi wa web3.js
lang: sw
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo haya, tutaona jinsi ya kuanza na [Web3.js](https://web3js.readthedocs.io/) ili kuingiliana na mnyororo wa vitalu wa Ethereum. Web3.js inaweza kutumika katika mazingira ya mbele (frontends) na ya nyuma (backends) kusoma data kutoka kwenye mnyororo wa vitalu au kufanya miamala na hata kusambaza mikataba mahiri.

Hatua ya kwanza ni kujumuisha Web3.js katika mradi wako. Ili kuitumia katika ukurasa wa wavuti, unaweza kuingiza maktaba moja kwa moja ukitumia CDN kama JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Ikiwa unapendelea kusakinisha maktaba ili kuitumia katika mazingira yako ya nyuma au mradi wa mazingira ya mbele unaotumia muundo (build), unaweza kuisakinisha ukitumia npm:

```bash
npm install web3 --save
```

Kisha ili kuingiza Web3.js kwenye hati ya Node.js au mradi wa mazingira ya mbele wa Browserify, unaweza kutumia mstari ufuatao wa JavaScript:

```js
const Web3 = require("web3")
```

Sasa kwa kuwa tumejumuisha maktaba katika mradi tunahitaji kuianzisha. Mradi wako unahitaji kuweza kuwasiliana na mnyororo wa vitalu. Maktaba nyingi za Ethereum huwasiliana na [nodi](/developers/docs/nodes-and-clients/) kupitia miito ya RPC. Ili kuanzisha mtoa huduma wetu wa Web3, tutaunda mfano wa Web3 kwa kupitisha URL ya mtoa huduma kama konstrukta. Ikiwa una nodi au [mfano wa ganache unaoendeshwa kwenye kompyuta yako](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) itaonekana hivi:

```js
const web3 = new Web3("http://localhost:8545")
```

Ikiwa ungependa kufikia moja kwa moja nodi iliyopangishwa unaweza kupata chaguo kwenye [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Ili kujaribu kwamba tumesanidi kwa usahihi mfano wetu wa Web3, tutajaribu kupata nambari ya kitalu cha hivi karibuni kwa kutumia kipengele cha `getBlockNumber`. Kipengele hiki kinakubali mwito wa kurudi (callback) kama kigezo na kurejesha nambari ya kitalu kama nambari kamili (integer).

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Ikiwa utaendesha programu hii, itachapisha tu nambari ya kitalu cha hivi karibuni: juu ya mnyororo wa vitalu. Unaweza pia kutumia miito ya kipengele cha `await/async` ili kuepuka kuweka miito ya kurudi ndani ya msimbo wako:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Unaweza kuona vipengele vyote vinavyopatikana kwenye mfano wa Web3 katika [nyaraka rasmi za Web3.js](https://docs.web3js.org/).

Maktaba nyingi za Web3 hazilandani (asynchronous) kwa sababu katika mandharinyuma maktaba hufanya miito ya JSON-RPC kwenye nodi ambayo hutuma majibu.

<Divider />

Ikiwa unafanya kazi kwenye kivinjari, baadhi ya mikoba huingiza moja kwa moja mfano wa Web3 na unapaswa kujaribu kuitumia wakati wowote inapowezekana hasa ikiwa unapanga kuingiliana na anwani ya Ethereum ya mtumiaji ili kufanya miamala.

Hiki ni kijisehemu cha kugundua ikiwa mkoba wa MetaMask unapatikana na kujaribu kuuwezesha ikiwa upo. Baadaye itakuruhusu kusoma salio la mtumiaji na kuwawezesha kuthibitisha miamala ambayo ungependa wafanye kwenye mnyororo wa vitalu wa Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Omba ufikivu wa akaunti ikiwa inahitajika
    await window.ethereum.enable()
    // Akaunti sasa zinaonekana
  } catch (error) {
    // Mtumiaji amekataa ufikivu wa akaunti...
  }
}
```

Njia mbadala za Web3.js kama [Ethers.js](https://docs.ethers.io/) zipo na pia hutumiwa sana. Katika mafunzo yajayo tutaona [jinsi ya kusikiliza kwa urahisi vitalu vipya vinavyoingia kwenye mnyororo wa vitalu na kuona kile kilichomo](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).