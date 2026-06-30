---
title: Kutuma Miamala Kwa Kutumia Web3
description: "Huu ni mwongozo rafiki kwa wanaoanza kuhusu kutuma miamala ya Ethereum kwa kutumia Web3. Kuna hatua tatu kuu ili kutuma muamala kwenye mnyororo wa vitalu wa Ethereum: kuunda, kusaini, na kutangaza. Tutapitia zote tatu."
author: "Elan Halpern"
tags: ["miamala", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: Tuma miamala
lang: sw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Huu ni mwongozo rafiki kwa wanaoanza kuhusu kutuma miamala ya Ethereum kwa kutumia Web3. Kuna hatua tatu kuu ili kutuma muamala kwenye mnyororo wa vitalu wa Ethereum: kuunda, kusaini, na kutangaza. Tutapitia zote tatu, kwa matumaini ya kujibu maswali yoyote ambayo unaweza kuwa nayo! Katika mafunzo haya, tutatumia [Alchemy](https://www.alchemy.com/) kutuma miamala yetu kwenye mnyororo wa Ethereum. Unaweza [kuunda akaunti ya bure ya Alchemy hapa](https://auth.alchemy.com/signup).

**KUMBUKA:** Mwongozo huu ni kwa ajili ya kusaini miamala yako kwenye _sehemu ya nyuma (backend)_ ya programu yako. Ikiwa unataka kujumuisha kusaini miamala yako kwenye sehemu ya mbele (frontend), angalia kujumuisha [Web3 na mtoa huduma wa kivinjari](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Mambo ya Msingi {#the-basics}

Kama watengenezaji wengi wa mnyororo wa vitalu wanapoanza kwa mara ya kwanza, unaweza kuwa umefanya utafiti kuhusu jinsi ya kutuma muamala (kitu ambacho kinapaswa kuwa rahisi sana) na kukutana na miongozo mingi, kila mmoja ukisema mambo tofauti na kukuacha ukiwa umelemewa na kuchanganyikiwa kidogo. Ikiwa uko katika hali hiyo, usijali; sote tulikuwa hapo wakati fulani! Kwa hivyo, kabla hatujaanza, hebu tuweke mambo machache sawa:

### 1\. Alchemy haihifadhi funguo zako za siri {#alchemy-does-not-store-your-private-keys}

- Hii inamaanisha kuwa Alchemy haiwezi kusaini na kutuma miamala kwa niaba yako. Sababu ya hii ni kwa madhumuni ya usalama. Alchemy haitakuuliza kamwe kushiriki ufunguo wako wa siri, na hupaswi kamwe kushiriki ufunguo wako wa siri na nodi inayopangishwa (au mtu yeyote kwa jambo hilo).
- Unaweza kusoma kutoka kwenye mnyororo wa vitalu kwa kutumia API kuu ya Alchemy, lakini ili kuandika kwake utahitaji kutumia kitu kingine kusaini miamala yako kabla ya kuituma kupitia Alchemy (hii ni sawa kwa [huduma yoyote nyingine ya nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. "Signer" (msaini) ni nini? {#what-is-a-signer}

- Wasaini (signers) watasaini miamala kwa ajili yako kwa kutumia ufunguo wako wa siri. Katika mafunzo haya tutatumia [Web3 ya Alchemy](https://github.com/alchemyplatform/alchemy-web3) kusaini muamala wetu, lakini unaweza pia kutumia maktaba nyingine yoyote ya Web3.
- Kwenye sehemu ya mbele (frontend), mfano mzuri wa msaini ungekuwa [MetaMask](https://metamask.io/), ambayo itasaini na kutuma miamala kwa niaba yako.
### 3\. Kwa nini ninahitaji kusaini miamala yangu? {#why-do-i-need-to-sign-my-transactions}

- Kila mtumiaji anayetaka kutuma muamala kwenye mtandao wa Ethereum lazima asaini muamala (kwa kutumia ufunguo wao wa siri), ili kuthibitisha kuwa asili ya muamala ni yule anayedai kuwa.
- Ni muhimu sana kulinda ufunguo huu wa siri, kwani kuwa na ufikiaji wake kunatoa udhibiti kamili juu ya akaunti yako ya Ethereum, kukurusu wewe (au mtu yeyote aliye na ufikiaji) kufanya miamala kwa niaba yako.

### 4\. Ninalindaje ufunguo wangu wa siri? {#how-do-i-protect-my-private-key}

- Kuna njia nyingi za kulinda ufunguo wako wa siri na kuutumia kutuma miamala. Katika mafunzo haya tutatumia faili la `.env`. Hata hivyo, unaweza pia kutumia mtoa huduma tofauti anayehifadhi funguo za siri, kutumia faili la hifadhi ya funguo, au chaguzi nyingine.

### 5\. Kuna tofauti gani kati ya `eth_sendTransaction` na `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` na `eth_sendRawTransaction` zote ni kazi za API za Ethereum ambazo hutangaza muamala kwenye mtandao wa Ethereum ili uongezwe kwenye kitalu cha baadaye. Zinatofautiana katika jinsi zinavyoshughulikia kusaini kwa miamala.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) inatumika kutuma miamala _ambayo haijasainiwa_, ambayo inamaanisha nodi unayotuma kwake lazima isimamie ufunguo wako wa siri ili iweze kusaini muamala kabla ya kuutangaza kwenye mnyororo. Kwa kuwa Alchemy haishikilii funguo za siri za mtumiaji, hawaungi mkono njia hii.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) inatumika kutangaza miamala ambayo tayari imesainiwa. Hii inamaanisha lazima kwanza utumie [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), kisha upitishe matokeo kwenye `eth_sendRawTransaction`.

Unapotumia Web3, `eth_sendRawTransaction` inafikiwa kwa kuita kazi ya [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Hiki ndicho tutakachotumia katika mafunzo haya.

### 6\. Maktaba ya Web3 ni nini? {#what-is-the-web3-library}

- Web3.js ni maktaba ya kanga (wrapper) inayozunguka miito ya kawaida ya JSON-RPC ambayo ni ya kawaida sana kutumia katika uundaji wa Ethereum.
- Kuna maktaba nyingi za Web3 kwa lugha tofauti. Katika mafunzo haya tutatumia [Web3 ya Alchemy](https://github.com/alchemyplatform/alchemy-web3) ambayo imeandikwa kwa JavaScript. Unaweza kuangalia chaguzi nyingine [hapa](/developers/docs/apis/javascript/) kama [Ethers.js](https://docs.ethers.org/v5/).

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

Fuata maagizo kwenye [bomba la Sepolia la Alchemy](https://www.sepoliafaucet.com/) ili kupokea ETH. Hakikisha unajumuisha anwani yako ya Ethereum ya **Sepolia** (kutoka MetaMask) na sio mtandao mwingine. Baada ya kufuata maagizo, hakikisha mara mbili kwamba umepokea ETH kwenye mkoba wako.

### 3\. Unda saraka mpya ya mradi na `cd` ndani yake {#create-a-new-project-direction}

Unda saraka mpya ya mradi kutoka kwenye mstari wa amri (terminal kwa macs) na uende ndani yake:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Sakinisha Web3 ya Alchemy (au maktaba yoyote ya Web3) {#install-alchemy-web3}

Endesha amri ifuatayo katika saraka yako ya mradi ili kusakinisha [Web3 ya Alchemy](https://github.com/alchemyplatform/alchemy-web3):

Kumbuka, ikiwa ungependa kutumia maktaba ya Ethers.js, [fuata maagizo hapa](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Sakinisha dotenv {#install-dotenv}

Tutatumia faili la `.env` kuhifadhi kwa usalama ufunguo wetu wa API na ufunguo wa siri.

```
npm install dotenv --save
```

### 6\. Unda faili la `.env` {#create-the-dotenv-file}

Unda faili la `.env` katika saraka yako ya mradi na uongeze yafuatayo (ukibadilisha "`your-api-url`" na "`your-private-key`")

- Ili kupata URL yako ya API ya Alchemy, nenda kwenye ukurasa wa maelezo ya programu ya programu uliyounda hivi punde kwenye dashibodi yako, bofya "Tazama Ufunguo" kwenye kona ya juu kulia, na uchukue URL ya HTTP.
- Ili kupata ufunguo wako wa siri kwa kutumia MetaMask, angalia [mwongozo](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) huu.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usifanye commit ya <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili lako la <code>.env</code> kwa mtu yeyote, kwani unaweka siri zako hatarini kwa kufanya hivyo. Ikiwa unatumia udhibiti wa toleo, ongeza <code>.env</code> yako kwenye faili la <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Unda faili la `sendTx.js` {#create-sendtx-js}

Vizuri, sasa kwa kuwa tuna data zetu nyeti zikilindwa katika faili la `.env`, hebu tuanze kuandika kodi. Kwa mfano wetu wa kutuma muamala, tutakuwa tunatuma ETH kurudi kwenye bomba la Sepolia.

Unda faili la `sendTx.js`, ambapo tutasanidi na kutuma mfano wetu wa muamala, na uongeze mistari ifuatayo ya kodi ndani yake:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: badilisha anwani hii na anwani yako ya umma

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonsi inaanza kuhesabu kutoka 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // anwani ya bomba ya kurudisha eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // uwanja wa data wa hiari wa kutuma ujumbe au kutekeleza mkataba mahiri
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Hakikisha unabadilisha anwani kwenye **mstari wa 6** na anwani yako ya umma.

Sasa, kabla hatujaanza kuendesha kodi hii, hebu tuzungumzie baadhi ya vipengele hapa.

- `nonce` : Uainishaji wa nonsi unatumika kufuatilia idadi ya miamala iliyotumwa kutoka kwenye anwani yako. Tunahitaji hii kwa madhumuni ya usalama na kuzuia mashambulizi ya kurudia (replay attacks). Ili kupata idadi ya miamala iliyotumwa kutoka kwenye anwani yako tunatumia [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: Kitu cha muamala kina vipengele vichache tunavyohitaji kubainisha
  - `to`: Hii ni anwani tunayotaka kutuma ETH. Katika kesi hii, tunatuma ETH kurudi kwenye [bomba la Sepolia](https://sepoliafaucet.com/) tuliloomba hapo awali.
  - `value`: Hiki ni kiasi tunachotaka kutuma, kilichobainishwa katika Wei ambapo 10^18 Wei = 1 ETH
  - `gas`: Kuna njia nyingi za kuamua kiasi sahihi cha gesi cha kujumuisha kwenye muamala wako. Alchemy inasaidia [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) zinazoweza kukuarifu kuhusu shughuli za mnyororoni. Kwa miamala ya Mtandao Mkuu, ni mazoezi mazuri kuangalia hali ya sasa ya gesi ili kuamua kiasi sahihi cha gesi cha kujumuisha. 21000 ni kiasi cha chini cha gesi ambacho operesheni kwenye Ethereum itatumia, kwa hivyo ili kuhakikisha muamala wetu utatekelezwa tunaweka 30000 hapa.
  - `nonce`: angalia ufafanuzi wa nonsi hapo juu. Nonsi inaanza kuhesabu kutoka sifuri.
  - [HIARI] data: Inatumika kwa kutuma maelezo ya ziada pamoja na hamisho lako, au kuita mkataba mahiri, haihitajiki kwa uhamisho wa salio, angalia dokezo hapa chini.
- `signedTx`: Ili kusaini kitu chetu cha muamala tutatumia mbinu ya `signTransaction` na `PRIVATE_KEY` yetu
- `sendSignedTransaction`: Mara tu tunapokuwa na muamala uliosainiwa, tunaweza kuutuma ili ujumuishwe kwenye kitalu kinachofuata kwa kutumia `sendSignedTransaction`

**Dokezo kuhusu data**
Kuna aina mbili kuu za miamala inayoweza kutumwa katika Ethereum.

- Hamisho la salio: Tuma ETH kutoka anwani moja hadi nyingine. Hakuna uwanja wa data unaohitajika, hata hivyo, ikiwa ungependa kutuma maelezo ya ziada pamoja na muamala wako, unaweza kujumuisha maelezo hayo katika umbizo la HEX kwenye uwanja huu.
  - Kwa mfano, tuseme tulitaka kuandika heshi ya hati ya IPFS kwenye mnyororo wa Ethereum ili kuipa muhuri wa muda usiobadilika. Uwanja wetu wa data unapaswa kuonekana kama data: `web3.utils.toHex(‘IPFS hash‘)`. Na sasa mtu yeyote anaweza kuuliza mnyororo na kuona ni lini hati hiyo iliongezwa.
- Muamala wa mkataba mahiri: Tekeleza kodi fulani ya mkataba mahiri mnyororoni. Katika kesi hii, uwanja wa data unapaswa kuwa na kazi mahiri unayotaka kutekeleza, pamoja na vigezo vyovyote.
  - Kwa mfano wa vitendo, angalia [mafunzo ya Mkataba Mahiri wa Hello World](/developers/tutorials/hello-world-smart-contract/).
### 8\. Endesha kodi kwa kutumia `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Nenda nyuma kwenye terminal yako au mstari wa amri na uendeshe:

```
node sendTx.js
```

### 9\. Angalia muamala wako kwenye Mempool {#see-your-transaction-in-the-mempool}

Fungua [ukurasa wa Mempool](https://dashboard.alchemy.com/mempool) kwenye dashibodi yako ya Alchemy na uchuje kwa programu uliyounda ili kupata muamala wako. Hapa ndipo tunapoweza kutazama muamala wetu ukibadilika kutoka hali ya kusubiri hadi hali ya kuchimbwa (ikiwa umefanikiwa) au hali ya kuachwa ikiwa haujafanikiwa. Hakikisha unaiweka kwenye "Zote" (All) ili unase miamala "iliyochimbwa" (mined), "inayosubiri" (pending), na "iliyoachwa" (dropped). Unaweza pia kutafuta muamala wako kwa kuangalia miamala iliyotumwa kwenye anwani `0x31b98d14007bdee637298086988a0bbd31184523` .

Ili kutazama maelezo ya muamala wako mara tu unapoupata, chagua heshi ya muamala (tx hash), ambayo inapaswa kukupeleka kwenye mwonekano unaoonekana hivi:

![Picha ya skrini ya mtazamaji wa Mempool](./mempool.png)

Kutoka hapo unaweza kutazama muamala wako kwenye Etherscan kwa kubofya ikoni iliyozungushiwa duara jekundu!

**Yippieeee! Umetuma muamala wako wa kwanza wa Ethereum kwa kutumia Alchemy 🎉**

_Kwa maoni na mapendekezo kuhusu mwongozo huu, tafadhali mtumie ujumbe Elan kwenye [Discord](https://discord.gg/A39JVCM) ya Alchemy!_

_Ilichapishwa awali na Alchemy._
