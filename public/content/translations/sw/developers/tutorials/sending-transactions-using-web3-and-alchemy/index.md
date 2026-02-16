---
title: Kutuma Miamala Kwa Kutumia Web3
description: "Huu ni mwongozo rahisi kwa wanaoanza wa kutuma miamala ya Ethereum kwa kutumia Web3. Kuna hatua tatu kuu ili kutuma muamala kwa mnyororo wa bloku wa Ethereum: tengeneza, saini, na tangaza. Tutapitia zote tatu."
author: "Elan Halpern"
tags: [ "miamala", "web3.js", "alchemy" ]
skill: beginner
lang: sw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Huu ni mwongozo rahisi kwa wanaoanza wa kutuma miamala ya Ethereum kwa kutumia Web3. Kuna hatua tatu kuu ili kutuma muamala kwa mnyororo wa bloku wa Ethereum: tengeneza, saini, na tangaza. Tutapitia zote tatu, tunatumai tutajibu maswali yoyote ambayo unaweza kuwa nayo! Katika somo hili, tutatumia [Alchemy](https://www.alchemy.com/) kutuma miamala yetu kwa mnyororo wa Ethereum. Unaweza [kufungua akaunti ya Alchemy bila malipo hapa](https://auth.alchemyapi.io/signup).

**KUMBUKA:** Mwongozo huu ni wa kusaini miamala yako kwenye _backend_ ya programu yako. Ikiwa unataka kuunganisha kusaini miamala yako kwenye frontend, angalia kuunganisha [Web3 na mtoa huduma wa kivinjari](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Mambo ya Msingi {#the-basics}

Kama wasanidi programu wengi wa mnyororo wa bloku wanapoanza, huenda umefanya utafiti fulani kuhusu jinsi ya kutuma muamala (kitu ambacho kinapaswa kuwa rahisi sana) na ukakutana na miongozo mingi, kila mmoja ukisema mambo tofauti na kukuacha ukiwa umezidiwa na kuchanganyikiwa. Ikiwa uko katika hali hiyo, usijali; sote tulikuwa hapo wakati fulani! Kwa hivyo, kabla hatujaanza, hebu tuweke mambo machache sawa:

### 1. Alchemy haihifadhi funguo zako za binafsi {#alchemy-does-not-store-your-private-keys}

- Hii inamaanisha kuwa Alchemy haiwezi kusaini na kutuma miamala kwa niaba yako. Sababu ya hii ni kwa madhumuni ya usalama. Alchemy haitakuuliza kamwe kushiriki ufunguo wako binafsi, na hupaswi kamwe kushiriki ufunguo wako binafsi na nodi iliyohifadhiwa (au mtu yeyote kwa jambo hilo).
- Unaweza kusoma kutoka kwenye mnyororo wa bloku kwa kutumia API ya msingi ya Alchemy, lakini ili kuandika humo utahitaji kutumia kitu kingine kusaini miamala yako kabla ya kuituma kupitia Alchemy (hii ni sawa kwa huduma nyingine yoyote ya [nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. “Signer” ni nini? {#what-is-a-signer}

- Signers watasaini miamala kwa ajili yako kwa kutumia ufunguo wako binafsi. Katika somo hili tutakuwa tukitumia [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) kusaini muamala wetu, lakini unaweza pia kutumia maktaba nyingine yoyote ya web3.
- Kwenye frontend, mfano mzuri wa signer itakuwa [MetaMask](https://metamask.io/), ambayo itasaini na kutuma miamala kwa niaba yako.

### 3. Kwa nini ninahitaji kusaini miamala yangu? {#why-do-i-need-to-sign-my-transactions}

- Kila mtumiaji anayetaka kutuma muamala kwenye mtandao wa Ethereum lazima asaini muamala (kwa kutumia ufunguo wake binafsi), ili kuthibitisha kuwa chimbuko la muamala huo ndilo linavyodaiwa kuwa.
- Ni muhimu sana kulinda ufunguo huu binafsi, kwani kuwa na ufikiaji kwayo kunatoa udhibiti kamili juu ya akaunti yako ya Ethereum, kukuruhusu wewe (au mtu yeyote mwenye ufikiaji) kufanya miamala kwa niaba yako.

### 4. Ninalindaje ufunguo wangu binafsi? {#how-do-i-protect-my-private-key}

- Kuna njia nyingi za kulinda ufunguo wako binafsi na kuutumia kutuma miamala. Katika somo hili tutakuwa tukitumia faili ya `.env`. Hata hivyo, unaweza pia kutumia mtoa huduma tofauti anayehifadhi funguo za binafsi, kutumia faili ya keystore, au chaguo zingine.

### 5. Kuna tofauti gani kati ya `eth_sendTransaction` na `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` na `eth_sendRawTransaction` zote ni kazi za API za Ethereum zinazotangaza muamala kwa mtandao wa Ethereum ili uongezwe kwenye bloku ya baadaye. Zinatofautiana katika jinsi zinavyoshughulikia usainishaji wa miamala.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) hutumika kwa kutuma miamala _isiyosainiwa_, ambayo inamaanisha nodi unayoituma lazima idhibiti ufunguo wako binafsi ili iweze kusaini muamala kabla ya kuutangaza kwenye mnyororo. Kwa kuwa Alchemy haishikilii funguo za binafsi za mtumiaji, hawasaidii njia hii.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) hutumika kutangaza miamala ambayo tayari imesainiwa. Hii inamaanisha kwanza lazima utumie [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), kisha upitishe matokeo katika `eth_sendRawTransaction`.

Unapotumia web3, `eth_sendRawTransaction` hupatikana kwa kuita kazi [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Hiki ndicho tutakachokuwa tukitumia katika somo hili.

### 6. Maktaba ya web3 ni nini? {#what-is-the-web3-library}

- Web3.js ni maktaba inayofunika miito ya kawaida ya JSON-RPC ambayo ni ya kawaida sana kutumika katika usanidi programu wa Ethereum.
- Kuna maktaba nyingi za web3 za lugha tofauti. Katika somo hili tutakuwa tukitumia [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) ambayo imeandikwa kwa JavaScript. Unaweza kuangalia chaguo zingine [hapa](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) kama [ethers.js](https://docs.ethers.org/v5/).

Sawa, sasa kwa kuwa tumeshughulikia baadhi ya maswali haya, hebu tuendelee na somo. Jisikie huru kuuliza maswali wakati wowote katika [discord](https://discord.gg/gWuC7zB) ya Alchemy!

### 7. Jinsi ya kutuma miamala salama, iliyoboreshwa kwa gesi, na ya faragha? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ina seti ya APIs za Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Unaweza kutumia hizi kutuma miamala iliyoimarishwa, kuiga miamala kabla haijatokea, kutuma miamala ya faragha, na kutuma miamala iliyoboreshwa kwa gesi
- Unaweza pia kutumia [API ya Notify](https://docs.alchemy.com/docs/alchemy-notify) kuarifiwa muamala wako unapotolewa kwenye mempool na kuongezwa kwenye mnyororo

**KUMBUKA:** Mwongozo huu unahitaji akaunti ya Alchemy, anwani ya Ethereum au mkoba wa MetaMask, NodeJs, na npm zilizosakinishwa. Ikiwa sivyo, fuata hatua hizi:

1. [Fungua akaunti ya Alchemy bila malipo](https://auth.alchemyapi.io/signup)
2. [Fungua akaunti ya MetaMask](https://metamask.io/) (au pata anwani ya Ethereum)
3. [Fuata hatua hizi ili kusakinisha NodeJs na NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Hatua za Kutuma Muamala wako {#steps-to-sending-your-transaction}

### 1. Fungua programu ya Alchemy kwenye testnet ya Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Nenda kwenye [Dashibodi yako ya Alchemy](https://dashboard.alchemyapi.io/) na uunde programu mpya, ukichagua Sepolia (au testnet nyingine yoyote) kwa mtandao wako.

### 2. Omba ETH kutoka kwa bomba la Sepolia {#request-eth-from-sepolia-faucet}

Fuata maagizo kwenye [bomba la Sepolia la Alchemy](https://www.sepoliafaucet.com/) ili kupokea ETH. Hakikisha unajumuisha anwani yako ya Ethereum ya **Sepolia** (kutoka MetaMask) na si mtandao mwingine. Baada ya kufuata maagizo, hakikisha tena kuwa umepokea ETH kwenye mkoba wako.

### 3. Unda saraka mpya ya mradi na `cd` ndani yake {#create-a-new-project-direction}

Unda saraka mpya ya mradi kutoka kwa mstari wa amri (terminal kwa macs) na uingie ndani yake:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Sakinisha Alchemy Web3 (au maktaba yoyote ya web3) {#install-alchemy-web3}

Endesha amri ifuatayo katika saraka yako ya mradi ili kusakinisha [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Kumbuka, ikiwa ungependa kutumia maktaba ya ethers.js, [fuata maagizo hapa](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Sakinisha dotenv {#install-dotenv}

Tutatumia faili ya `.env` kuhifadhi kwa usalama ufunguo wetu wa API na ufunguo binafsi.

```
npm install dotenv --save
```

### 6. Tengeneza faili ya `.env` {#create-the-dotenv-file}

Tengeneza faili ya `.env` katika saraka yako ya mradi na uongeze yafuatayo (ukibadilisha "`your-api-url`" na "`your-private-key`")

- Ili kupata URL yako ya API ya Alchemy, nenda kwenye ukurasa wa maelezo ya programu uliyotengeneza kwenye dashibodi yako, bofya "View Key" kwenye kona ya juu kulia, na uchukue URL ya HTTP.
- Ili kupata ufunguo wako binafsi kwa kutumia MetaMask, angalia [mwongozo huu](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usitume <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili yako ya <code>.env</code> na mtu yeyote, kwani unahatarisha siri zako kwa kufanya hivyo. Ikiwa unatumia udhibiti wa toleo, ongeza <code>.env</code> yako kwenye faili ya <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Tengeneza faili ya `sendTx.js` {#create-sendtx-js}

Safi, sasa kwa kuwa data yetu nyeti imelindwa katika faili ya `.env`, hebu tuanze kuandika msimbo. Kwa mfano wetu wa kutuma muamala, tutakuwa tukituma ETH kurudi kwenye bomba la Sepolia.

Tengeneza faili ya `sendTx.js`, ambapo tutasanidi na kutuma muamala wetu wa mfano, na kuongeza mistari ifuatayo ya msimbo ndani yake:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: badilisha anwani hii na anwani yako ya umma

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce huanza kuhesabu kutoka 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // anwani ya bomba la kurudisha eth
     'value': 1000000000000000000, // ETH 1
     'gas': 30000,
     'nonce': nonce,
     // sehemu ya data ya hiari kutuma ujumbe au kutekeleza mkataba-erevu
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Hashi ya muamala wako ni: ", hash, "\n Angalia Mempool ya Alchemy ili kuona hali ya muamala wako!");
    } else {
      console.log("❗Kitu kilienda mrama wakati wa kuwasilisha muamala wako:", error)
    }
   });
}

main();
```

Hakikisha unabadilisha anwani kwenye **mstari wa 6** na anwani yako mwenyewe ya umma.

Sasa, kabla ya kuanza kuendesha msimbo huu, hebu tuzungumzie baadhi ya vipengele hapa.

- `nonce` : Ufafanuzi wa nonce hutumika kufuatilia idadi ya miamala iliyotumwa kutoka kwa anwani yako. Tunahitaji hii kwa madhumuni ya usalama na kuzuia [mashambulizi ya kurudia](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Ili kupata idadi ya miamala iliyotumwa kutoka kwa anwani yako tunatumia [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Kitu cha muamala kina vipengele vichache tunavyohitaji kubainisha
  - `to`: Hii ni anwani tunayotaka kutuma ETH. Katika kesi hii, tunatuma ETH kurudi kwenye [bomba la Sepolia](https://sepoliafaucet.com/) ambalo tuliomba awali.
  - `value`: Hii ni kiasi tunachotaka kutuma, kilichoainishwa katika Wei ambapo Wei 10^18 = ETH 1
  - `gas`: Kuna njia nyingi za kuamua kiasi sahihi cha gesi cha kujumuisha na muamala wako. Alchemy hata ina [webhook ya bei ya gesi](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) kukuarifu bei ya gesi inaposhuka ndani ya kizingiti fulani. Kwa miamala ya Mtandao Mkuu, ni mazoea mazuri kuangalia kikadiriaji cha gesi kama [ETH Gas Station](https://ethgasstation.info/) ili kuamua kiasi sahihi cha gesi cha kujumuisha. 21000 ni kiasi cha chini cha gesi ambacho operesheni kwenye Ethereum itatumia, kwa hivyo ili kuhakikisha muamala wetu utatekelezwa tunaweka 30000 hapa.
  - `nonce`: tazama ufafanuzi wa nonce hapo juu. Nonce huanza kuhesabu kutoka sifuri.
  - [SI LAZIMA] data: Hutumika kutuma taarifa za ziada na uhamisho wako, au kuita mkataba-erevu, hauhitajiki kwa uhamisho wa salio, angalia dokezo hapa chini.
- `signedTx`: Ili kusaini kitu chetu cha muamala tutatumia mbinu ya `signTransaction` na `PRIVATE_KEY` yetu
- `sendSignedTransaction`: Mara tu tunapokuwa na muamala uliosainiwa, tunaweza kuutuma ili ujumuishwe katika bloku inayofuata kwa kutumia `sendSignedTransaction`

**Dokezo kuhusu data**
Kuna aina mbili kuu za miamala zinazoweza kutumwa katika Ethereum.

- Uhamisho wa salio: Tuma ETH kutoka anwani moja kwenda nyingine. Hakuna sehemu ya data inayohitajika, hata hivyo, ikiwa ungependa kutuma taarifa za ziada pamoja na muamala wako, unaweza kujumuisha taarifa hiyo katika umbizo la HEX katika sehemu hii.
  - Kwa mfano, tuseme tulitaka kuandika hashi ya hati ya IPFS kwenye mnyororo wa Ethereum ili kuipa muhuri wa muda usioweza kubadilika. Sehemu yetu ya data inapaswa kuonekana kama data: `web3.utils.toHex('hashi ya IPFS')`. Na sasa mtu yeyote anaweza kuuliza mnyororo na kuona ni lini hati hiyo iliongezwa.
- Muamala wa mkataba-erevu: Tekeleza msimbo fulani wa mkataba-erevu kwenye mnyororo. Katika kesi hii, sehemu ya data inapaswa kuwa na kazi mahiri unayotaka kutekeleza, pamoja na vigezo vyovyote.
  - Kwa mfano wa vitendo, angalia Hatua ya 8 katika [Somo hili la Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Endesha msimbo kwa kutumia `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Rudi kwenye terminal yako au mstari wa amri na uendeshe:

```
node sendTx.js
```

### 9. Angalia muamala wako katika Mempool {#see-your-transaction-in-the-mempool}

Fungua [ukurasa wa Mempool](https://dashboard.alchemyapi.io/mempool) kwenye dashibodi yako ya Alchemy na uchuje kwa programu uliyounda ili kupata muamala wako. Hapa ndipo tunaweza kutazama mpito wa muamala wetu kutoka hali ya kusubiri hadi hali ya kuchimbwa (ikiwa imefanikiwa) au hali ya kuachwa ikiwa haikufanikiwa. Hakikisha unaiweka kwenye "All" ili uweze kunasa miamala ya "mined", "pending", na "dropped". Unaweza pia kutafuta muamala wako kwa kutafuta miamala iliyotumwa kwa anwani `0x31b98d14007bdee637298086988a0bbd31184523` .

Ili kuona maelezo ya muamala wako mara tu umeupata, chagua hashi ya tx, ambayo inapaswa kukupeleka kwenye mwonekano unaofanana na huu:

![Picha ya skrini ya mfuatiliaji wa Mempool](./mempool.png)

Kutoka hapo unaweza kuona muamala wako kwenye Etherscan kwa kubofya ikoni iliyozungushiwa duara nyekundu!

**Yippieeee!** Umetuma muamala wako wa kwanza wa Ethereum kwa kutumia Alchemy 🎉\*\*

_Kwa maoni na mapendekezo kuhusu mwongozo huu, tafadhali mtumie Elan ujumbe kwenye [Discord](https://discord.gg/A39JVCM) ya Alchemy!_

_Ilichapishwa awali katika [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
