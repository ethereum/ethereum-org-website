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

Huu ni mwongozo rafiki kwa wanaoanza kuhusu kutuma miamala ya Ethereum kwa kutumia Web3. Kuna hatua tatu kuu ili kutuma muamala kwenye mnyororo wa vitalu wa Ethereum: kuunda, kusaini, na kutangaza. Tutapitia zote tatu, kwa matumaini ya kujibu maswali yoyote ambayo unaweza kuwa nayo! Katika mafunzo haya, tutatumia [Alchemy](https://www.alchemy.com/) kutuma miamala yetu kwenye mnyororo wa Ethereum. Unaweza [kuunda akaunti ya bure ya Alchemy hapa](https://auth.alchemyapi.io/signup).

**KUMBUKA:** Mwongozo huu ni kwa ajili ya kusaini miamala yako kwenye _sehemu ya nyuma (backend)_ ya programu yako. Ikiwa unataka kujumuisha kusaini miamala yako kwenye sehemu ya mbele (frontend), angalia kujumuisha [Web3 na mtoa huduma wa kivinjari](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Mambo ya Msingi {#the-basics}

Kama watengenezaji wengi wa mnyororo wa vitalu wanapoanza kwa mara ya kwanza, unaweza kuwa umefanya utafiti kuhusu jinsi ya kutuma muamala (kitu ambacho kinapaswa kuwa rahisi sana) na kukutana na miongozo mingi, kila mmoja ukisema mambo tofauti na kukuacha ukiwa umelemewa na kuchanganyikiwa kidogo. Ikiwa uko katika hali hiyo, usijali; sote tulikuwa hapo wakati fulani! Kwa hivyo, kabla hatujaanza, hebu tuweke mambo machache sawa:

### 1\. Alchemy haihifadhi funguo zako za siri {#alchemy-does-not-store-your-private-keys}

- Hii inamaanisha kuwa Alchemy haiwezi kusaini na kutuma miamala kwa niaba yako. Sababu ya hii ni kwa madhumuni ya usalama. Alchemy haitakuuliza kamwe kushiriki ufunguo wako wa siri, na hupaswi kamwe kushiriki ufunguo wako wa siri na nodi inayopangishwa (au mtu yeyote kwa jambo hilo).
- Unaweza kusoma kutoka kwenye mnyororo wa vitalu kwa kutumia API kuu ya Alchemy, lakini ili kuandika kwake utahitaji kutumia kitu kingine kusaini miamala yako kabla ya kuituma kupitia Alchemy (hii ni sawa kwa [huduma yoyote nyingine ya nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. "Msaini" ni nini? {#what-is-a-signer}

- Wasaini watasaini miamala kwa ajili yako kwa kutumia ufunguo wako wa siri. Katika mafunzo haya tutatumia [Web3 ya Alchemy](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) kusaini muamala wetu, lakini unaweza pia kutumia maktaba yoyote nyingine ya Web3.
- Kwenye sehemu ya mbele, mfano mzuri wa msaini utakuwa [MetaMask](https://metamask.io/), ambayo itasaini na kutuma miamala kwa niaba yako.

### 3\. Kwa nini ninahitaji kusaini miamala yangu? {#why-do-i-need-to-sign-my-transactions}

- Kila mtumiaji anayetaka kutuma muamala kwenye mtandao wa Ethereum lazima asaini muamala (kwa kutumia ufunguo wao wa siri), ili kuthibitisha kuwa asili ya muamala ni yule anayedai kuwa.
- Ni muhimu sana kulinda ufunguo huu wa siri, kwani kuwa na ufikiaji wake kunatoa udhibiti kamili juu ya akaunti yako ya Ethereum, kukurusu wewe (au mtu yeyote aliye na ufikiaji) kufanya miamala kwa niaba yako.

### 4\. Ninalindaje ufunguo wangu wa siri? {#how-do-i-protect-my-private-key}

- Kuna njia nyingi za kulinda ufunguo wako wa siri na kuutumia kutuma miamala. Katika mafunzo haya tutatumia faili la `.env`. Hata hivyo, unaweza pia kutumia mtoa huduma tofauti anayehifadhi funguo za siri, kutumia faili la hifadhi ya funguo, au chaguzi nyingine.

### 5\. Kuna tofauti gani kati ya `eth_sendTransaction` na `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` na `eth_sendRawTransaction` zote ni kazi za API za Ethereum ambazo hutangaza muamala kwenye mtandao wa Ethereum ili uongezwe kwenye kitalu cha baadaye. Zinatofautiana katika jinsi zinavyoshughulikia kusaini kwa miamala.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) inatumika kutuma miamala _ambayo haijasainiwa_, ambayo inamaanisha nodi unayotuma kwake lazima isimamie ufunguo wako wa siri ili iweze kusaini muamala kabla ya kuutangaza kwenye mnyororo. Kwa kuwa Alchemy haishikilii funguo za siri za mtumiaji, hawaungi mkono njia hii.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) inatumika kutangaza miamala ambayo tayari imesainiwa. Hii inamaanisha lazima kwanza utumie [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), kisha upitishe matokeo kwenye `eth_sendRawTransaction`.

Unapotumia Web3, `eth_sendRawTransaction` inafikiwa kwa kuita kazi ya [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Hiki ndicho tutakachotumia katika mafunzo haya.

### 6\. Maktaba ya Web3 ni nini? {#what-is-the-web3-library}

- Web3.js ni maktaba ya kanga (wrapper) inayozunguka miito ya kawaida ya JSON-RPC ambayo ni ya kawaida sana kutumia katika uundaji wa Ethereum.
- Kuna maktaba nyingi za Web3 kwa lugha tofauti. Katika mafunzo haya tutatumia [Web3 ya Alchemy](https://docs.alchemy.com/reference/api-overview) ambayo imeandikwa kwa JavaScript. Unaweza kuangalia chaguzi nyingine [hapa](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) kama [Ethers.js](https://docs.ethers.org/v5/).

Sawa, sasa kwa kuwa tumejibu baadhi ya maswali haya, hebu tuendelee na mafunzo. Jisikie huru kuuliza maswali wakati wowote kwenye [Discord](https://discord.gg/gWuC7zB) ya Alchemy!

### 7\. Jinsi ya kutuma miamala salama, iliyoboreshwa kwa gesi, na ya faragha? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ina kundi la API za Miamala](https://docs.alchemy.com/reference/transact-api-quickstart). Unaweza kutumia hizi kutuma miamala iliyoimarishwa, kuiga miamala kabla haijatokea, kutuma miamala ya faragha, na kutuma miamala iliyoboreshwa kwa gesi.
- Unaweza pia kutumia [API ya Kuarifu](https://docs.alchemy.com/docs/alchemy-notify) ili kujulishwa wakati muamala wako unapotolewa kwenye mempool na kuongezwa kwenye mnyororo.

**KUMBUKA:** Mwongozo huu unahitaji akaunti ya Alchemy, anwani ya Ethereum au mkoba wa MetaMask, NodeJs, na npm iliyosakinishwa. Ikiwa sivyo, fuata hatua hizi:

1.  [Unda akaunti ya bure ya Alchemy](https://auth.alchemyapi.io/signup)
2.  [Unda akaunti ya MetaMask](https://metamask.io/) (au pata anwani ya Ethereum)
3.  [Fuata hatua hizi kusakinisha NodeJs na NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Hatua za Kutuma Muamala Wako {#steps-to-sending-your-transaction}

### 1\. Unda programu ya Alchemy kwenye mtandao wa majaribio wa Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Nenda kwenye [Dashibodi yako ya Alchemy](https://dashboard.alchemyapi.io/) na uunde programu mpya, ukichagua Sepolia (au mtandao wa majaribio mwingine wowote) kwa mtandao wako.

### 2\. Omba ETH kutoka kwenye bomba la Sepolia {#request-eth-from-sepolia-faucet}

Fuata maagizo kwenye [bomba la Sepolia la Alchemy](https://www.sepoliafaucet.com/) ili kupokea ETH. Hakikisha unajumuisha anwani yako ya Ethereum ya **Sepolia** (kutoka MetaMask) na sio mtandao mwingine. Baada ya kufuata maagizo, hakikisha mara mbili kwamba umepokea ETH kwenye mkoba wako.

### 3\. Unda saraka mpya ya mradi na `cd` ndani yake {#create-a-new-project-direction}

Unda saraka mpya ya mradi kutoka kwenye mstari wa amri (terminal kwa macs) na uende ndani yake:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Sakinisha Web3 ya Alchemy (au maktaba yoyote ya Web3) {#install-alchemy-web3}

Endesha amri ifuatayo katika saraka yako ya mradi ili kusakinisha [Web3 ya Alchemy](https://docs.alchemy.com/reference/api-overview):

Kumbuka, ikiwa ungependa kutumia maktaba ya Ethers.js, [fuata maagizo hapa](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

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

Vizuri, sasa kwa kuwa tuna data zetu nyeti zikilindwa katika faili la `.env`, hebu tuanze kuandika kodi. Kwa mfano wetu wa kutuma muamala, tutakuwa tukituma ETH kurudi kwenye bomba la Sepolia.

Unda faili la `sendTx.js`, ambapo tutasanidi na kutuma muamala wetu wa mfano, na uongeze mistari ifuatayo ya kodi kwake:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: badilisha anwani hii na anwani yako ya umma

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonsi inaanza kuhesabu kutoka 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // anwani ya bomba kurudisha eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // uwanja wa data wa hiari kutuma ujumbe au kutekeleza mkataba mahiri
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Heshi ya muamala wako ni: ", hash, "\n Angalia Mempool ya Alchemy ili kuona hali ya muamala wako!");
    } else {
      console.log("❗Kuna kitu kimeenda vibaya wakati wa kuwasilisha muamala wako:", error)
    }
   });
}

main();
```

Hakikisha unabadilisha anwani kwenye **mstari wa 6** na anwani yako ya umma.

Sasa, kabla hatujaruka kwenye kuendesha kodi hii, hebu tuzungumze kuhusu baadhi ya vipengele hapa.

- `nonce` : Uainishaji wa nonsi unatumika kufuatilia idadi ya miamala iliyotumwa kutoka kwenye anwani yako. Tunahitaji hii kwa madhumuni ya usalama na kuzuia [mashambulizi ya kurudia (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Ili kupata idadi ya miamala iliyotumwa kutoka kwenye anwani yako tunatumia [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Kitu cha muamala kina vipengele vichache tunavyohitaji kubainisha
  - `to`: Hii ni anwani tunayotaka kutuma ETH kwake. Katika kesi hii, tunatuma ETH kurudi kwenye [bomba la Sepolia](https://sepoliafaucet.com/) tuliloomba hapo awali.
  - `value`: Hiki ni kiasi tunachotaka kutuma, kilichobainishwa katika Wei ambapo 10^18 Wei = 1 ETH
  - `gas`: Kuna njia nyingi za kuamua kiasi sahihi cha gesi cha kujumuisha na muamala wako. Alchemy hata ina [webhook ya bei ya gesi](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) ya kukuarifu wakati bei ya gesi inapoanguka ndani ya kiwango fulani. Kwa miamala ya Mtandao Mkuu, ni mazoezi mazuri kuangalia kikadiriaji cha gesi kama [Kituo cha Gesi cha ETH](https://ethgasstation.info/) ili kuamua kiasi sahihi cha gesi cha kujumuisha. 21000 ni kiasi cha chini cha gesi ambacho operesheni kwenye Ethereum itatumia, kwa hivyo ili kuhakikisha muamala wetu utatekelezwa tunaweka 30000 hapa.
  - `nonce`: angalia ufafanuzi wa nonsi hapo juu. Nonsi inaanza kuhesabu kutoka sifuri.
  - [HIARI] data: Inatumika kwa kutuma maelezo ya ziada na hamisho lako, au kuita mkataba mahiri, haihitajiki kwa uhamisho wa salio, angalia dokezo hapa chini.
- `signedTx`: Ili kusaini kitu chetu cha muamala tutatumia mbinu ya `signTransaction` na `PRIVATE_KEY` yetu
- `sendSignedTransaction`: Mara tu tunapokuwa na muamala uliosainiwa, tunaweza kuutuma ili ujumuishwe katika kitalu kinachofuata kwa kutumia `sendSignedTransaction`

**Dokezo kuhusu data**
Kuna aina mbili kuu za miamala inayoweza kutumwa katika Ethereum.

- Uhamisho wa salio: Tuma ETH kutoka anwani moja hadi nyingine. Hakuna uwanja wa data unaohitajika, hata hivyo, ikiwa ungependa kutuma maelezo ya ziada pamoja na muamala wako, unaweza kujumuisha maelezo hayo katika muundo wa HEX katika uwanja huu.
  - Kwa mfano, tuseme tulitaka kuandika heshi ya hati ya IPFS kwenye mnyororo wa Ethereum ili kuipa muhuri wa muda usiobadilika. Uwanja wetu wa data unapaswa kuonekana kama data: `web3.utils.toHex(‘IPFS hash‘)`. Na sasa mtu yeyote anaweza kuuliza mnyororo na kuona ni lini hati hiyo iliongezwa.
- Muamala wa mkataba mahiri: Tekeleza baadhi ya kodi za mkataba mahiri kwenye mnyororo. Katika kesi hii, uwanja wa data unapaswa kuwa na kazi mahiri unayotaka kutekeleza, pamoja na vigezo vyovyote.
  - Kwa mfano wa vitendo, angalia Hatua ya 8 katika [Mafunzo haya ya Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Endesha kodi kwa kutumia `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Nenda nyuma kwenye terminal yako au mstari wa amri na uendeshe:

```
node sendTx.js
```

### 9\. Angalia muamala wako kwenye Mempool {#see-your-transaction-in-the-mempool}

Fungua [ukurasa wa Mempool](https://dashboard.alchemyapi.io/mempool) katika dashibodi yako ya Alchemy na uchuje kwa programu uliyounda ili kupata muamala wako. Hapa ndipo tunaweza kutazama muamala wetu ukibadilika kutoka hali ya kusubiri hadi hali ya kuchimbwa (ikiwa imefanikiwa) au hali ya kuachwa ikiwa haikufanikiwa. Hakikisha unaiweka kwenye "Zote" ili unase miamala "iliyochimbwa", "inayosubiri", na "iliyoachwa". Unaweza pia kutafuta muamala wako kwa kuangalia miamala iliyotumwa kwa anwani `0x31b98d14007bdee637298086988a0bbd31184523` .

Ili kutazama maelezo ya muamala wako mara tu unapoupata, chagua heshi ya tx, ambayo inapaswa kukupeleka kwenye mwonekano unaoonekana hivi:

![Mempool watcher screenshot](./mempool.png)

Kutoka hapo unaweza kutazama muamala wako kwenye Etherscan kwa kubofya ikoni iliyozungushiwa duara jekundu!

**Hongera! Umetuma muamala wako wa kwanza wa Ethereum kwa kutumia Alchemy 🎉**

_Kwa maoni na mapendekezo kuhusu mwongozo huu, tafadhali mtumie ujumbe Elan kwenye [Discord](https://discord.gg/A39JVCM) ya Alchemy!_

_Ilichapishwa awali kwenye [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_