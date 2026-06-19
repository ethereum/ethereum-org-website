---
title: Kuanza na Uendelezaji wa Ethereum
description: "Huu ni mwongozo wa wanaoanza kuanza na uendelezaji wa Ethereum. Tutakuchukua kuanzia kuanzisha mwisho wa API, hadi kufanya ombi la mstari wa amri, hadi kuandika hati yako ya kwanza ya Web3! Hakuna uzoefu wa uendelezaji wa mnyororo wa vitalu unaohitajika!"
author: "Elan Halpern"
tags: ["javascript", "ethers.js", "nodi", "kuuliza", "alchemy"]
skill: beginner
breadcrumb: Kuanza
lang: sw
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Huu ni mwongozo wa wanaoanza kuanza na uendelezaji wa Ethereum. Kwa mafunzo haya tutatumia [Alchemy](https://alchemyapi.io/), jukwaa linaloongoza la waendelezaji wa mnyororo wa vitalu linalowezesha mamilioni ya watumiaji kutoka 70% ya programu bora za mnyororo wa vitalu, ikiwa ni pamoja na Maker, 0x, MyEtherWallet, Dharma, na Kyber. Alchemy itatupa ufikiaji wa mwisho wa API kwenye mnyororo wa Ethereum ili tuweze kusoma na kuandika miamala.

Tutakuchukua kuanzia kujisajili na Alchemy hadi kuandika hati yako ya kwanza ya Web3! Hakuna uzoefu wa uendelezaji wa mnyororo wa vitalu unaohitajika!

## 1. Jisajili kwa Akaunti ya Alchemy ya Bure {#sign-up-for-a-free-alchemy-account}

Kufungua akaunti na Alchemy ni rahisi, [jisajili bure hapa](https://auth.alchemy.com/).

## 2. Unda Programu ya Alchemy {#create-an-alchemy-app}

Ili kuwasiliana na mnyororo wa Ethereum na kutumia bidhaa za Alchemy, unahitaji ufunguo wa API ili kuthibitisha maombi yako.

Unaweza [kuunda funguo za API kutoka kwenye dashibodi](https://dashboard.alchemy.com/). Ili kutengeneza ufunguo mpya, nenda kwenye “Create App” kama inavyoonyeshwa hapa chini:

Shukrani za pekee kwa [_ShapeShift_](https://shapeshift.com/) _kwa kuturuhusu kuonyesha dashibodi yao!_

![Alchemy dashboard](./alchemy-dashboard.png)

Jaza maelezo chini ya “Create App” ili kupata ufunguo wako mpya. Unaweza pia kuona programu ulizotengeneza hapo awali na zile zilizotengenezwa na timu yako hapa. Vuta funguo zilizopo kwa kubofya “View Key” kwa programu yoyote.

![Create app with Alchemy screenshot](./create-app.png)

Unaweza pia kuvuta funguo za API zilizopo kwa kuelea juu ya “Apps” na kuchagua moja. Unaweza “View Key” hapa, pamoja na “Edit App” ili kuidhinisha vikoa maalum, kuona zana kadhaa za waendelezaji, na kutazama uchanganuzi.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Fanya Ombi kutoka kwenye Mstari wa Amri {#make-a-request-from-the-command-line}

Wasiliana na mnyororo wa vitalu wa Ethereum kupitia Alchemy ukitumia JSON-RPC na curl.

Kwa maombi ya mwongozo, tunapendekeza kuwasiliana na `JSON-RPC` kupitia maombi ya `POST`. Pitisha tu kichwa cha `Content-Type: application/json` na swali lako kama kiwiliwili cha `POST` chenye sehemu zifuatazo:

- `jsonrpc`: Toleo la JSON-RPC—kwa sasa, ni `2.0` pekee linalotumika.
- `method`: Mbinu ya API ya ETH. [Tazama rejeleo la API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Orodha ya vigezo vya kupitisha kwenye mbinu.
- `id`: Kitambulisho cha ombi lako. Kitarudishwa na jibu ili uweze kufuatilia jibu ni la ombi gani.

Huu hapa ni mfano unaoweza kuendesha kutoka kwenye mstari wa amri ili kupata bei ya gesi ya sasa:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**KUMBUKA:** Badilisha [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) na ufunguo wako wa API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Matokeo:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Sanidi Mteja wako wa Web3 {#set-up-your-web3-client}

**Ikiwa una mteja aliyepo,** badilisha URL ya mtoa huduma wako wa nodi wa sasa kuwa URL ya Alchemy yenye ufunguo wako wa API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_KUMBUKA:_** Hati zilizo hapa chini zinahitaji kuendeshwa katika **muktadha wa nodi** au **kuhifadhiwa kwenye faili**, sio kuendeshwa kutoka kwenye mstari wa amri. Ikiwa bado hujasakinisha Node au npm, angalia [mwongozo huu wa haraka wa usanidi kwa macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Kuna maktaba nyingi za [Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) unazoweza kuunganisha na Alchemy, hata hivyo, tunapendekeza kutumia [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), mbadala wa moja kwa moja wa Web3.js, iliyojengwa na kusanidiwa kufanya kazi bila mshono na Alchemy. Hii inatoa faida nyingi kama vile majaribio ya kiotomatiki na usaidizi thabiti wa WebSocket.

Ili kusakinisha AlchemyWeb3.js, **nenda kwenye saraka ya mradi wako** na uendeshe:

**Kwa Yarn:**

```
yarn add @alch/alchemy-web3
```

**Kwa NPM:**

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

Sasa ili kuanza kwa vitendo na programu kidogo ya Web3 tutaandika hati rahisi inayochapisha nambari ya kitalu cha hivi punde kutoka kwenye Mtandao Mkuu wa Ethereum.

**1. Ikiwa bado hujafanya hivyo, kwenye terminal yako unda saraka mpya ya mradi na uingie ndani yake (cd):**

```
mkdir web3-example
cd web3-example
```

**2. Sakinisha utegemezi wa Alchemy Web3 (au Web3 yoyote) kwenye mradi wako ikiwa bado hujafanya hivyo:**

```
npm install @alch/alchemy-web3
```

**3. Unda faili inayoitwa `index.js` na uongeze yaliyomo yafuatayo:**

> Hatimaye unapaswa kubadilisha `demo` na ufunguo wako wa API ya HTTP ya Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Hujazoea mambo ya async? Angalia [chapisho hili la Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Iendeshe kwenye terminal yako ukitumia node**

```
node index.js
```

**5. Sasa unapaswa kuona pato la nambari ya kitalu cha hivi punde kwenye kiweko chako!**

```
The latest block number is 11043912
```

**Hongera! Umeandika hati yako ya kwanza ya Web3 ukitumia Alchemy 🎉**

Huna uhakika wa kufanya nini baadaye? Jaribu kusambaza mkataba mahiri wako wa kwanza na uanze kwa vitendo na programu ya Solidity katika [Mwongozo wetu wa Mkataba Mahiri wa Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), au jaribu ujuzi wako wa dashibodi na [Programu ya Onyesho ya Dashibodi](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Jisajili na Alchemy bure](https://auth.alchemy.com/), angalia [nyaraka](https://www.alchemy.com/docs/) zetu, na kwa habari za hivi punde, tufuate kwenye [Twitter](https://twitter.com/AlchemyPlatform)_.