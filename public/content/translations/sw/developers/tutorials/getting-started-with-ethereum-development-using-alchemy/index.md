---
title: Kuanza na Uundaji wa Ethereum
description: "Huu ni mwongozo wa wanaoanza jinsi ya kuanza na uundaji wa Ethereum. Tutakuelekeza kutoka kuanzisha sehemu ya mwisho ya API, hadi kufanya ombi la mstari wa amri, hadi kuandika hati yako ya kwanza ya web3! Hakuna uzoefu wa uundaji wa blockchain unaohitajika!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "nodi",
    "kuuliza",
    "alchemy"
  ]
skill: beginner
lang: sw
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Nembo za Ethereum na Alchemy](./ethereum-alchemy.png)

Huu ni mwongozo wa wanaoanza jinsi ya kuanza na uundaji wa Ethereum. Kwa mafunzo haya tutakuwa tunatumia [Alchemy](https://alchemyapi.io/), jukwaa linaloongoza la wasanidi wa blockchain linalowezesha mamilioni ya watumiaji kutoka 70% ya programu za juu za blockchain, ikiwa ni pamoja na Maker, 0x, MyEtherWallet, Dharma, na Kyber. Alchemy itatupa ufikiaji wa sehemu ya mwisho ya API kwenye mnyororo wa Ethereum ili tuweze kusoma na kuandika miamala.

Tutakuelekeza kutoka kujisajili na Alchemy hadi kuandika hati yako ya kwanza ya web3! Hakuna uzoefu wa uundaji wa blockchain unaohitajika!

## 1. Jisajili kwa Akaunti ya Bure ya Alchemy {#sign-up-for-a-free-alchemy-account}

Kufungua akaunti na Alchemy ni rahisi, [jisajili bure hapa](https://auth.alchemy.com/).

## 2. Tengeneza Programu ya Alchemy {#create-an-alchemy-app}

Ili kuwasiliana na mnyororo wa Ethereum na kutumia bidhaa za Alchemy, unahitaji ufunguo wa API ili kuthibitisha maombi yako.

Unaweza [kutengeneza funguo za API kutoka kwenye dashibodi](https://dashboard.alchemy.com/). Ili kutengeneza ufunguo mpya, nenda kwa “Tengeneza Programu” kama inavyoonyeshwa hapa chini:

Shukrani za pekee kwa [_ShapeShift_](https://shapeshift.com/) _kwa kuturuhusu kuonyesha dashibodi yao!_

![Dashibodi ya Alchemy](./alchemy-dashboard.png)

Jaza maelezo chini ya “Tengeneza Programu” ili kupata ufunguo wako mpya. Unaweza pia kuona programu ulizotengeneza awali na zile zilizotengenezwa na timu yako hapa. Pata funguo zilizopo kwa kubofya “Angalia Ufunguo” kwa programu yoyote.

![Picha ya skrini ya kutengeneza programu na Alchemy](./create-app.png)

Unaweza pia kupata funguo za API zilizopo kwa kuelea juu ya “Programu” na kuchagua moja. Unaweza “Angalia Ufunguo” hapa, pamoja na “Hariri Programu” ili kuidhinisha vikoa maalum, kuona zana kadhaa za wasanidi, na kutazama takwimu.

![Gif inayoonyesha mtumiaji jinsi ya kupata funguo za API](./pull-api-keys.gif)

## 3. Fanya Ombi kutoka kwa Mstari wa Amri {#make-a-request-from-the-command-line}

Wasiliana na blockchain ya Ethereum kupitia Alchemy ukitumia JSON-RPC na curl.

Kwa maombi ya moja kwa moja, tunapendekeza kuwasiliana na `JSON-RPC` kupitia maombi ya `POST`. Peleka tu kichwa cha `Content-Type: application/json` na swali lako kama kiwiliwili cha `POST` na sehemu zifuatazo:

- `jsonrpc`: Toleo la JSON-RPC—kwa sasa, ni `2.0` pekee inayotumika.
- `method`: Mbinu ya API ya ETH. [Angalia marejeleo ya API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Orodha ya vigezo vya kupitisha kwenye mbinu.
- `id`: Kitambulisho cha ombi lako. Itarejeshwa na jibu ili uweze kufuatilia ni ombi gani jibu linahusu.

Huu ni mfano unaoweza kuendesha kutoka kwa mstari wa amri ili kupata bei ya sasa ya gesi:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**KUMBUKA:** Badilisha [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) na ufunguo wako mwenyewe wa API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Matokeo:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Sanidi Mteja wako wa Web3 {#set-up-your-web3-client}

**Ikiwa una mteja aliyepo,** badilisha URL ya mtoa huduma wako wa sasa wa nodi kuwa URL ya Alchemy na ufunguo wako wa API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_KUMBUKA:_** Hati zilizo hapa chini zinahitaji kuendeshwa katika **mazingira ya nodi** au **kuhifadhiwa kwenye faili**, sio kuendeshwa kutoka kwa mstari wa amri. Ikiwa bado hujasakinisha Node au npm, angalia [mwongozo huu wa haraka wa usanidi kwa macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Kuna maktaba nyingi za [Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) unazoweza kuunganisha na Alchemy, hata hivyo, tunapendekeza kutumia [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), mbadala wa moja kwa moja wa web3.js, iliyoundwa na kusanidiwa kufanya kazi bila mshono na Alchemy. Hii inatoa faida nyingi kama vile majaribio ya kiotomatiki na usaidizi thabiti wa WebSocket.

Ili kusakinisha AlchemyWeb3.js, **nenda kwenye saraka yako ya mradi** na endesha:

**Kwa kutumia Yarn:**

```
yarn add @alch/alchemy-web3
```

**Kwa kutumia NPM:**

```
npm install @alch/alchemy-web3
```

Ili kuwasiliana na miundombinu ya nodi ya Alchemy, endesha katika NodeJS au ongeza hii kwenye faili ya JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Andika Hati yako ya kwanza ya Web3! {#write-your-first-web3-script}

Sasa ili tuanze kufanya kazi na programu ndogo ya web3, tutaandika hati rahisi inayochapisha nambari ya bloku ya hivi karibuni kutoka kwa Mtandao Mkuu wa Ethereum.

**1. Ikiwa bado hujafanya hivyo, kwenye terminal yako tengeneza saraka mpya ya mradi na ingia ndani yake (cd):**

```
mkdir web3-example
cd web3-example
```

**2. Sakinisha tegemeo la Alchemy web3 (au web3 yoyote) kwenye mradi wako ikiwa bado hujafanya hivyo:**

```
npm install @alch/alchemy-web3
```

**3. Tengeneza faili inayoitwa `index.js` na ongeza yaliyomo yafuatayo:**

> Mwishowe unapaswa kubadilisha `demo` na ufunguo wako wa Alchemy HTTP API.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Nambari ya bloku ya hivi karibuni ni " + blockNumber)
}
main()
```

Hufahamu mambo ya async? Angalia [chapisho hili la Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4.** Endesha kwenye terminal yako ukitumia node\*\*

```
node index.js
```

**5.** Sasa unapaswa kuona tokeo la nambari ya bloku ya hivi karibuni kwenye konsoli yako!\*\*

```
Nambari ya bloku ya hivi karibuni ni 11043912
```

**Shwari! Hongera! Umeandika hati yako ya kwanza ya web3 ukitumia Alchemy 🎉**

Huna uhakika nini cha kufanya baadaye? Jaribu kuweka mkataba-erevu wako wa kwanza na uanze kufanya kazi na programu za Solidity kwenye [Mwongozo wetu wa Mkataba-erevu wa Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), au jaribu ujuzi wako wa dashibodi na [Programu ya Demo ya Dashibodi](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Jisajili na Alchemy bure](https://auth.alchemy.com/), angalia [nyaraka](https://www.alchemy.com/docs/) zetu, na kwa habari za hivi karibuni, tufuate kwenye [Twitter](https://twitter.com/AlchemyPlatform)_.
