---
title: Kutuma Miamala kwa Kutumia viem
description: "Huu ni mwongozo rafiki kwa wanaoanza wa kutuma miamala ya Ethereum kwa kutumia maktaba ya viem. Kuna hatua tatu kuu ili kutuma muamala kwenye mnyororo wa vitalu wa Ethereum: kuunda, kusaini, na kutangaza. Tutapitia zote tatu."
author: "Elan Halpern"
tags: ["miamala", "viem", "Alchemy"]
skill: beginner
breadcrumb: Tuma miamala
lang: sw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Huu ni mwongozo rafiki kwa wanaoanza wa kutuma miamala ya Ethereum kwa kutumia maktaba ya [viem](https://viem.sh/). Kuna hatua tatu kuu ili kutuma muamala kwenye mnyororo wa vitalu wa Ethereum: kuunda, kusaini, na kutangaza. Tutapitia zote tatu, kwa matumaini ya kujibu maswali yoyote ambayo unaweza kuwa nayo! Katika mafunzo haya, tutatumia [Alchemy](https://www.alchemy.com/) kutuma miamala yetu kwenye mnyororo wa Ethereum. Unaweza [kuunda akaunti ya bure ya Alchemy hapa](https://auth.alchemy.com/signup).

**KUMBUKA:** Mwongozo huu ni kwa ajili ya kusaini miamala yako kwenye _backend_ kwa ajili ya programu yako. Ikiwa unataka kujumuisha usainiji wa miamala yako kwenye frontend, angalia [Kiolesura cha Kupanga Programu Tumizi (API) cha mtoa huduma wa MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Mambo ya Msingi {#the-basics}

Kama watengenezaji wengi wa mnyororo wa vitalu wanapoanza kwa mara ya kwanza, unaweza kuwa umefanya utafiti kuhusu jinsi ya kutuma muamala (kitu ambacho kinapaswa kuwa rahisi sana) na kukutana na miongozo mingi, kila mmoja ukisema mambo tofauti na kukuacha ukiwa umelemewa na kuchanganyikiwa kidogo. Ikiwa uko katika hali hiyo, usijali; sote tulikuwa hapo wakati fulani! Kwa hivyo, kabla hatujaanza, hebu tuweke mambo machache sawa:

### 1\. Alchemy haihifadhi funguo zako za siri {#alchemy-does-not-store-your-private-keys}

- Hii inamaanisha kuwa Alchemy haiwezi kusaini na kutuma miamala kwa niaba yako. Sababu ya hii ni kwa madhumuni ya usalama. Alchemy haitakuuliza kamwe kushiriki ufunguo wako wa siri, na hupaswi kamwe kushiriki ufunguo wako wa siri na nodi inayopangishwa (au mtu yeyote kwa jambo hilo).
- Unaweza kusoma kutoka kwenye mnyororo wa vitalu kwa kutumia API kuu ya Alchemy, lakini ili kuandika kwake utahitaji kutumia kitu kingine kusaini miamala yako kabla ya kuituma kupitia Alchemy (hii ni sawa kwa [huduma yoyote nyingine ya nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. "Msaini" ni nini? {#what-is-a-signer}

- Wasaini watasaini miamala kwa ajili yako kwa kutumia ufunguo wa siri wako. Katika mafunzo haya tutatumia [viem](https://viem.sh/) kusaini muamala wetu, lakini unaweza pia kutumia maktaba nyingine yoyote ya Web3.
- Kwenye frontend, mfano mzuri wa msaini utakuwa [MetaMask](https://metamask.io/), ambayo itasaini na kutuma miamala kwa niaba yako.

### 3\. Kwa nini ninahitaji kusaini miamala yangu? {#why-do-i-need-to-sign-my-transactions}

- Kila mtumiaji anayetaka kutuma muamala kwenye mtandao wa Ethereum lazima asaini muamala (kwa kutumia ufunguo wao wa siri), ili kuthibitisha kuwa asili ya muamala ni yule anayedai kuwa.
- Ni muhimu sana kulinda ufunguo huu wa siri, kwani kuwa na ufikiaji wake kunatoa udhibiti kamili juu ya akaunti yako ya Ethereum, kukurusu wewe (au mtu yeyote aliye na ufikiaji) kufanya miamala kwa niaba yako.

### 4\. Ninalindaje ufunguo wangu wa siri? {#how-do-i-protect-my-private-key}

- Kuna njia nyingi za kulinda ufunguo wako wa siri na kuutumia kutuma miamala. Katika mafunzo haya tutatumia faili la `.env`. Hata hivyo, unaweza pia kutumia mtoa huduma tofauti anayehifadhi funguo za siri, kutumia faili la hifadhi ya funguo, au chaguzi nyingine.

### 5\. Kuna tofauti gani kati ya `eth_sendTransaction` na `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` na `eth_sendRawTransaction` zote ni kazi za Kiolesura cha Kupanga Programu Tumizi (API) cha Ethereum ambazo hutangaza muamala kwenye mtandao wa Ethereum ili uweze kuongezwa kwenye kitalu cha baadaye. Zinatofautiana katika jinsi zinavyoshughulikia usainiji wa miamala.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) inatumika kutuma miamala _ambayo haijasainiwa_, ambayo inamaanisha nodi unayotuma kwake lazima isimamie ufunguo wa siri wako ili iweze kusaini muamala kabla ya kuutangaza kwenye mnyororo. Kwa kuwa Alchemy haishikilii funguo za siri za mtumiaji, hawaungi mkono njia hii.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) inatumika kutangaza miamala ambayo tayari imesainiwa. Hii inamaanisha kwanza unapaswa kusaini muamala kwa ufunguo wa siri wako (katika viem, kwa kutumia [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) na [akaunti ya ndani](https://viem.sh/docs/accounts/local/privateKeyToAccount)), kisha upitishe matokeo kwenye `eth_sendRawTransaction`.

Unapotumia viem, `eth_sendRawTransaction` inafikiwa kwa kuita kazi ya [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

Hiki ndicho tutakachokuwa tukitumia katika mafunzo haya.

### 6\. Maktaba ya Web3 ni nini? {#what-is-the-web3-library}

- Maktaba ya Web3 ni kanga (wrapper) inayozunguka [miito ya JSON-RPC](/developers/docs/apis/json-rpc/) ya kawaida ambayo ni ya kawaida sana kutumia katika uundaji wa Ethereum.
- Kuna maktaba nyingi za Web3 kwa lugha tofauti. Katika mafunzo haya tutatumia [viem](https://viem.sh/), ambayo imeandikwa kwa TypeScript na inafanya kazi katika mradi wowote wa JavaScript. Unaweza kuangalia chaguzi nyingine [hapa](/developers/docs/apis/javascript/) kama [Ethers.js](https://docs.ethers.org/v6/).

Sawa, sasa kwa kuwa tumejibu baadhi ya maswali haya, hebu tuendelee na mafunzo. Jisikie huru kuuliza maswali wakati wowote kwenye [Discord](https://discord.gg/gWuC7zB) ya Alchemy!

### 7\. Jinsi ya kutuma miamala salama, iliyoboreshwa kwa gesi, na ya siri? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ina seti ya rasilimali za miamala](https://www.alchemy.com/docs/sending-transactions). Unaweza kutumia hizi kutuma miamala, kuiga miamala kabla haijatokea, kutuma miamala ya siri, na kutuma miamala iliyoboreshwa kwa gesi
- Unaweza pia kutumia [webhooks za Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) ili kuarifiwa wakati muamala wako unapotolewa kwenye mempool na kuongezwa kwenye mnyororo

**KUMBUKA:** Mwongozo huu unahitaji akaunti ya Alchemy, anwani ya Ethereum au mkoba wa MetaMask, Node.js, na npm iliyosakinishwa. Ikiwa sivyo, fuata hatua hizi:

1.  [Unda akaunti ya bure ya Alchemy](https://auth.alchemy.com/signup)
2.  [Unda akaunti ya MetaMask](https://metamask.io/) (au pata anwani ya Ethereum)
3.  [Sakinisha Node.js na npm](https://nodejs.org/en/download/)
## Hatua za Kutuma Muamala Wako {#steps-to-sending-your-transaction}

### 1\. Unda programu ya Alchemy kwenye mtandao wa majaribio wa Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Nenda kwenye [Dashibodi yako ya Alchemy](https://dashboard.alchemy.com/) na uunde programu mpya, ukichagua Sepolia (au mtandao wa majaribio mwingine wowote) kwa mtandao wako.

### 2\. Omba ETH kutoka kwenye bomba la Sepolia {#request-eth-from-sepolia-faucet}

Fuata maagizo kwenye [bomba la Sepolia la Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) ili kupokea ETH, au tumia mojawapo ya [mabomba ya Sepolia](/developers/docs/networks/#sepolia) mengine. Mabomba hutoa kiasi kidogo (bomba la Alchemy hutoa 0.1 ETH kwa siku), ambacho kinatosha kwa mafunzo haya. Hakikisha unajumuisha anwani yako ya Ethereum ya **Sepolia** (kutoka MetaMask) na si mtandao mwingine. Baada ya kufuata maagizo, hakikisha mara mbili kwamba umepokea ETH kwenye mkoba wako.

### 3\. Unda saraka mpya ya mradi na `cd` ndani yake {#create-a-new-project-direction}

Unda saraka mpya ya mradi kutoka kwenye mstari wa amri (terminal kwa macs) na uende ndani yake:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Sakinisha viem (au maktaba yoyote ya Web3) {#install-alchemy-web3}

Endesha amri ifuatayo katika saraka yako ya mradi ili kusakinisha [viem](https://viem.sh/):

Kumbuka, ikiwa ungependa kutumia maktaba ya Ethers.js, [fuata maagizo hapa](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Sakinisha dotenv {#install-dotenv}

Tutatumia faili la `.env` kuhifadhi kwa usalama ufunguo wetu wa API na ufunguo wa siri.

```
npm install dotenv --save
```

### 6\. Unda faili la `.env` {#create-the-dotenv-file}

Unda faili la `.env` katika saraka yako ya mradi na uongeze yafuatayo (ukibadilisha "`your-api-url`" na "`your-private-key`")

- Ili kupata URL ya Kiolesura cha Kupanga Programu Tumizi (API) chako cha Alchemy, nenda kwenye ukurasa wa maelezo ya programu ya programu uliyounda hivi punde kwenye dashibodi yako, bofya "View Key" kwenye kona ya juu kulia, na uchukue URL ya HTTP.
- Ili kupata ufunguo wa siri wako kwa kutumia MetaMask, angalia [mwongozo](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) huu. Tumia akaunti ambayo inashikilia tu ETH ya mtandao wa majaribio.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usifanye commit ya <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili lako la <code>.env</code> kwa mtu yeyote, kwani unaweka siri zako hatarini kwa kufanya hivyo. Ikiwa unatumia udhibiti wa toleo, ongeza <code>.env</code> yako kwenye faili la <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Unda faili la `sendTx.js` {#create-sendtx-js}

Safi, sasa kwa kuwa tuna data yetu nyeti iliyolindwa katika faili la `.env`, hebu tuanze kuandika kodi. Kwa mfano wetu wa kutuma muamala, tutakuwa tukituma 0.001 ETH kwa anwani nyingine unayoidhibiti, kama vile akaunti ya pili katika MetaMask.

Unda faili la `sendTx.js`, ambalo ndipo tutakaposanidi na kutuma mfano wetu wa muamala, na uongeze mistari ifuatayo ya kodi kwake:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonsi inaanza kuhesabu kuanzia 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: badilisha na anwani unayotaka kutuma ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // sehemu ya data ya hiari kutuma ujumbe au kutekeleza mkataba mahiri
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Hakikisha unabadilisha `0xYourSecondAddress` na anwani unayotaka kutuma ETH kwake. Hati inatoa anwani yako mwenyewe (ya kutuma) kutoka kwenye `PRIVATE_KEY`, kwa hivyo huhitaji kuiingiza.

Sasa, kabla hatujaanza kuendesha kodi hii, hebu tuzungumze kuhusu baadhi ya vipengele hapa.

- `account`: Akaunti ya ndani iliyoundwa kutoka kwenye ufunguo wa siri wako na [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Kusaini kunafanyika kwenye mashine yako, na ufunguo wa siri hautumwi kamwe kwa Alchemy.
- `publicClient` na `walletClient`: wateja wa viem wanaotuma maombi ya JSON-RPC kwenye URL yako ya Alchemy. Mteja wa umma anasoma kutoka kwenye mnyororo, na mteja wa mkoba huandaa na kusaini miamala kwa ajili ya akaunti yako.
- `nonce` : Uainishaji wa nonsi unatumika kufuatilia idadi ya miamala iliyotumwa kutoka kwenye anwani yako. Tunahitaji hii kwa madhumuni ya usalama na kuzuia mashambulizi ya kurudia (replay attacks). Ili kupata idadi ya miamala iliyotumwa kutoka kwenye anwani yako tunatumia [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). viem pia ingekujazia hii, lakini tunaichukua waziwazi hapa ili kuonyesha inakotoka.
- `transaction`: Kitu cha muamala kina vipengele vichache tunavyohitaji kubainisha. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) inatujazia mengine, ikiwa ni pamoja na `chainId` na sehemu za ada za [EIP-1559](/developers/docs/gas/) `maxFeePerGas` na `maxPriorityFeePerGas`, kulingana na hali ya sasa ya mtandao
  - `to`: Hii ni anwani tunayotaka kutuma ETH kwake.
  - `value`: Hiki ni kiasi tunachotaka kutuma, kilichobainishwa katika Wei ambapo 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) inabadilisha kiasi cha ETH kuwa Wei kwa ajili yetu. Akaunti yako inahitaji zaidi kidogo ya hii, kwani pia inalipia gesi
  - `gas`: Kuna njia nyingi za kuamua kiasi sahihi cha gesi cha kujumuisha na muamala wako. Alchemy inasaidia [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) ambazo zinaweza kukuarifu kuhusu shughuli mnyororoni. Kwa miamala ya Mtandao Mkuu, ni mazoezi mazuri kuangalia hali ya sasa ya gesi ili kuamua kiasi sahihi cha gesi cha kujumuisha. Hamisho la kawaida la ETH kwa anwani ya kawaida daima hutumia gesi 21000 haswa, ambayo ni kiwango cha chini kwa muamala wowote, kwa hivyo tunaweka 21000 hapa. Ikiwa utaacha `gas` nje, viem inakadiria kwa ajili yako.
  - `nonce`: angalia ufafanuzi wa nonsi hapo juu. Nonsi inaanza kuhesabu kutoka sifuri.
  - [SI LAZIMA] data: Inatumika kwa kutuma maelezo ya ziada na hamisho lako, au kuita mkataba mahiri, haihitajiki kwa uhamisho wa salio, angalia dokezo hapa chini.
- `signedTx`: Ili kusaini kitu chetu cha muamala tutatumia mbinu ya `signTransaction`, ambayo inaisaini ndani kwa ndani na akaunti iliyoundwa kutoka kwenye `PRIVATE_KEY` yetu
- `sendRawTransaction`: Mara tu tunapokuwa na muamala uliosainiwa, tunaweza kuutuma ili ujumuishwe katika kitalu kinachofuata kwa kutumia `sendRawTransaction`, ambayo inaita `eth_sendRawTransaction`
- `waitForTransactionReceipt`: Inasubiri hadi muamala ujumuishwe katika kitalu na kurudisha stakabadhi yake

**Dokezo kuhusu data**
Kuna aina mbili kuu za miamala inayoweza kutumwa katika Ethereum.

- Hamisho la salio: Tuma ETH kutoka anwani moja hadi nyingine. Hakuna sehemu ya data inayohitajika, hata hivyo, ikiwa ungependa kutuma maelezo ya ziada pamoja na muamala wako, unaweza kujumuisha maelezo hayo katika muundo wa HEX katika sehemu hii.
  - Kwa mfano, hebu tuseme tulitaka kuandika heshi ya hati ya IPFS kwenye mnyororo wa Ethereum ili kuipa muhuri wa muda usiobadilika. Sehemu yetu ya data inapaswa kuonekana kama `data: toHex("IPFS hash")`, kwa kutumia [`toHex`](https://viem.sh/docs/utilities/toHex) ya viem. Na sasa mtu yeyote anaweza kuuliza mnyororo na kuona wakati hati hiyo ilipoongezwa.
- Muamala wa mkataba mahiri: Tekeleza baadhi ya kodi za mkataba mahiri kwenye mnyororo. Katika kesi hii, sehemu ya data inapaswa kuwa na kazi mahiri unayotaka kutekeleza, pamoja na vigezo vyovyote.
  - Kwa mfano wa vitendo, angalia [Mafunzo ya Mkataba Mahiri wa Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Endesha kodi kwa kutumia `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Nenda nyuma kwenye terminal yako au mstari wa amri na uendeshe:

```
node sendTx.js
```

### 9\. Angalia muamala wako kwenye kichunguzi cha bloku {#see-your-transaction-in-the-mempool}

Hati inachapisha heshi ya muamala mara tu nodi inapokubali muamala, kisha inasubiri hadi ujumuishwe katika kitalu (kawaida ndani ya sekunde chache) na kuchapisha matokeo. Ili kuona maelezo, bandika heshi kwenye kichunguzi cha bloku cha Sepolia kama vile [Sepolia Etherscan](https://sepolia.etherscan.io/) au [Blockscout](https://eth-sepolia.blockscout.com/). Hapo unaweza kutazama muamala ukitoka kwenye kusubiri hadi kujumuishwa, na kuona kiasi, ada na kitalu ulichotua.

Ikiwa utaona hitilafu ya `insufficient funds` badala yake, akaunti yako haina ETH ya Sepolia ya kutosha kufidia thamani pamoja na gesi. Rudi kwenye hatua ya 2 na uombe zaidi kutoka kwenye bomba.

**Yippieeee! Umetuma muamala wako wa kwanza wa Ethereum kwa kutumia Alchemy 🎉**

_Kwa maoni na mapendekezo kuhusu mwongozo huu, tafadhali mtumie ujumbe Elan kwenye [Discord](https://discord.gg/gWuC7zB) ya Alchemy!_

_Ilichapishwa awali na Alchemy._
