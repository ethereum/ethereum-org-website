---
title: Mafunzo ya Kufua NFT
description: Katika mafunzo haya, utaunda kifua NFT na kujifunza jinsi ya kuunda programu tumizi iliyogatuliwa (dapp) kamili kwa kuunganisha mkataba mahiri wako kwenye mbele ya React ukitumia MetaMask na zana za Web3.
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "mikataba mahiri", "mbele", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: dapp ya kufua NFT
lang: sw
published: 2021-10-06
---

Moja ya changamoto kubwa kwa wasanidi programu wanaotoka kwenye usuli wa Web2 ni kujua jinsi ya kuunganisha mkataba mahiri wako kwenye mradi wa mbele na kuingiliana nao.

Kwa kuunda kifua NFT — kiolesura rahisi cha mtumiaji (UI) ambapo unaweza kuweka kiungo cha rasilimali ya dijitali yako, kichwa, na maelezo — utajifunza jinsi ya:

- Kuunganisha kwenye MetaMask kupitia mradi wako wa mbele
- Kuita mbinu za mkataba mahiri kutoka kwenye mbele yako
- Kutia sahihi miamala ukitumia MetaMask

Katika mafunzo haya, tutakuwa tukitumia [React](https://react.dev/) kama mfumo wetu wa mbele. Kwa sababu mafunzo haya yanalenga zaidi usanidi wa Web3, hatutatumia muda mwingi kuchambua misingi ya React. Badala yake, tutazingatia kuleta utendaji kwenye mradi wetu.

Kama sharti, unapaswa kuwa na uelewa wa kiwango cha mwanzilishi wa React—kujua jinsi vijenzi, props, useState/useEffect, na uitaaji wa msingi wa utendaji unavyofanya kazi. Ikiwa haujawahi kusikia kuhusu maneno hayo hapo awali, unaweza kutaka kuangalia [mafunzo haya ya Utangulizi wa React](https://react.dev/learn/tutorial-tic-tac-toe). Kwa wanaojifunza zaidi kwa kuona, tunapendekeza sana mfululizo huu bora wa video wa [Mafunzo Kamili ya Kisasa ya React](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) na Net Ninja.

Na ikiwa bado hujafanya hivyo, hakika utahitaji akaunti ya Alchemy ili kukamilisha mafunzo haya na pia kuunda chochote kwenye mnyororo wa vitalu. Jisajili kwa akaunti ya bure [hapa](https://alchemy.com/).

Bila kupoteza wakati, tuanze!

## Kutengeneza NFT 101 {#making-nfts-101}

Kabla hata hatujaanza kuangalia msimbo wowote, ni muhimu kuelewa jinsi kutengeneza NFT kunavyofanya kazi. Inahusisha hatua mbili:

### Kuchapisha mkataba mahiri wa NFT kwenye mnyororo wa vitalu wa Ethereum {#publish-nft}

Tofauti kubwa kati ya viwango viwili vya mkataba mahiri wa NFT ni kwamba ERC-1155 ni kiwango cha tokeni nyingi na inajumuisha utendaji wa kundi, wakati ERC-721 ni kiwango cha tokeni moja na kwa hivyo inasaidia tu kuhamisha tokeni moja kwa wakati.

### Ita utendaji wa ufuzi

Kwa kawaida, utendaji huu wa ufuzi unahitaji upitishe vigezo viwili kama parameta, kwanza `recipient`, ambayo inabainisha anwani itakayopokea NFT yako iliyofufuliwa hivi punde, na pili `tokenURI` ya NFT, mfuatano unaotatua kwenye hati ya JSON inayoelezea data fafanuzi ya NFT.

Data fafanuzi ya NFT ndiyo hasa inayoipa uhai, na kuiruhusu kuwa na sifa, kama vile jina, maelezo, picha (au rasilimali ya dijitali tofauti), na sifa zingine. Hapa kuna [mfano wa tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), ambayo ina data fafanuzi ya NFT.

Katika mafunzo haya, tutazingatia sehemu ya 2, kuita utendaji wa ufuzi wa mkataba mahiri wa NFT kwa kutumia UI yetu ya React.

Utahitaji mkataba mahiri wa NFT wa ERC-721 uliosambazwa kwenye mtandao wa majaribio unaotumika kama vile Sepolia. Ikiwa ungependa kusambaza mmoja wewe mwenyewe, tunapendekeza mwongozo wa Alchemy wa [kusambaza mkataba mahiri kwenye Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

Sawa, sasa kwa kuwa tunaelewa jinsi kutengeneza NFT kunavyofanya kazi, hebu tunakili faili zetu za kuanzia!
## Kunakili faili za kuanzia {#clone-the-starter-files}

Kwanza, nenda kwenye [hifadhi ya GitHub ya nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) ili kupata faili za kuanzia za mradi huu. Nakili hifadhi hii kwenye mazingira yako ya ndani.

Unapofungua hifadhi hii iliyonakiliwa ya `nft-minter-tutorial`, utagundua kuwa ina folda mbili: `minter-starter-files` na `nft-minter`.

- `minter-starter-files` ina faili za kuanzia (kimsingi UI ya React) kwa mradi huu. Katika mafunzo haya, **tutakuwa tukifanya kazi katika saraka hii**, unapojifunza jinsi ya kuleta UI hii kuwa hai kwa kuiunganisha kwenye mkoba wako wa Ethereum na mkataba mahiri wa NFT.
- `nft-minter` ina mafunzo yote yaliyokamilika na ipo kwa ajili yako kama **rejeleo** **ikiwa utakwama.**

Kisha, fungua nakala yako ya `minter-starter-files` katika kihariri chako cha msimbo, na kisha nenda kwenye folda yako ya `src`.

Msimbo wote tutakaouandika utaishi chini ya folda ya `src`. Tutakuwa tukihariri kijenzi cha `Minter.js` na kuandika faili za ziada za JavaScript ili kuupa mradi wetu utendaji wa Web3.

## Hatua ya 2: Angalia faili zetu za kuanzia {#step-2-check-out-our-starter-files}

Kabla hatujaanza kuandika msimbo, ni muhimu kuangalia kile ambacho tayari kimetolewa kwetu katika faili za kuanzia.

### Fanya mradi wako wa React uanze kufanya kazi {#get-your-react-project-running}

Tuanze kwa kuendesha mradi wa React kwenye kivinjari chetu. Uzuri wa React ni kwamba mara tu tunapokuwa na mradi wetu unaoendeshwa kwenye kivinjari chetu, mabadiliko yoyote tunayohifadhi yatasasishwa moja kwa moja kwenye kivinjari chetu.

Ili kufanya mradi uanze kufanya kazi, nenda kwenye saraka ya mzizi ya folda ya `minter-starter-files`, na uendeshe `npm install` kwenye terminal yako ili kusakinisha vitegemezi vya mradi:

```bash
cd minter-starter-files
npm install
```

Mara tu hizo zitakapomaliza kusakinishwa, endesha `npm start` kwenye terminal yako:

```bash
npm start
```

Kufanya hivyo kunapaswa kufungua http://localhost:3000/ kwenye kivinjari chako, ambapo utaona mbele ya mradi wetu. Inapaswa kuwa na sehemu 3: mahali pa kuweka kiungo cha rasilimali ya NFT yako, kuingiza jina la NFT yako, na kutoa maelezo.

Ukijaribu kubofya vitufe vya "Connect Wallet" au "Mint NFT", utagundua havifanyi kazi—hiyo ni kwa sababu bado tunahitaji kupanga utendaji wao! :\)

### Kijenzi cha Minter.js {#minter-js}

**KUMBUKA:** Hakikisha uko kwenye folda ya `minter-starter-files` na sio folda ya `nft-minter`!

Turudi kwenye folda ya `src` katika kihariri chetu na tufungue faili ya `Minter.js`. Ni muhimu sana tuelewe kila kitu katika faili hii, kwani ndicho kijenzi kikuu cha React tutakachokuwa tukifanyia kazi.

Juu ya faili hii yetu, tuna vigezo vyetu vya hali ambavyo tutavisasisha baada ya matukio maalum.

```javascript
//Vigezo vya hali
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Hujawahi kusikia kuhusu vigezo vya hali vya React au ndoano za hali? Angalia hati [hizi](https://legacy.reactjs.org/docs/hooks-state.html).

Hapa kuna kile kila moja ya vigezo inawakilisha:

- `walletAddress` - mfuatano unaohifadhi anwani ya mkoba wa mtumiaji
- `status` - mfuatano ulio na ujumbe wa kuonyesha chini ya UI
- `name` - mfuatano unaohifadhi jina la NFT
- `description` - mfuatano unaohifadhi maelezo ya NFT
- `url` - mfuatano ambao ni kiungo cha rasilimali ya dijitali ya NFT

Baada ya vigezo vya hali, utaona utendaji tatu ambazo hazijatekelezwa: `useEffect`, `connectWalletPressed`, na `onMintPressed`. Utagundua kuwa utendaji hizi zote ni `async`, hiyo ni kwa sababu tutakuwa tukifanya miito ya API isiyolingana ndani yake! Majina yao yanafanana na utendaji wao:

```javascript
useEffect(async () => {
  //TODO: tekeleza
}, [])

const connectWalletPressed = async () => {
  //TODO: tekeleza
}

const onMintPressed = async () => {
  //TODO: tekeleza
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - hii ni ndoano ya React inayoitwa baada ya kijenzi chako kutolewa. Kwa sababu ina propu ya safu tupu `[]` iliyopitishwa ndani yake (tazama mstari wa 3), itaitwa tu kwenye utoaji wa _kwanza_ wa kijenzi. Hapa tutaita msikilizaji wetu wa mkoba na utendaji mwingine wa mkoba ili kusasisha UI yetu ili kuonyesha ikiwa mkoba tayari umeunganishwa.
- `connectWalletPressed` - utendaji huu utaitwa ili kuunganisha mkoba wa MetaMask wa mtumiaji kwenye programu tumizi iliyogatuliwa (dapp) yetu.
- `onMintPressed` - utendaji huu utaitwa ili kufua NFT ya mtumiaji.

Karibu na mwisho wa faili hii, tuna UI ya kijenzi chetu. Ukichanganua msimbo huu kwa uangalifu, utagundua kuwa tunasasisha vigezo vyetu vya hali vya `url`, `name`, na `description` wakati ingizo katika sehemu zao za maandishi zinazolingana zinabadilika.

Utaona pia kwamba `connectWalletPressed` na `onMintPressed` zinaitwa wakati vitufe vilivyo na vitambulisho `mintButton` na `walletButton` vinabofya mtawalia.

```javascript
//UI ya kijenzi chetu
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Hatimaye, hebu tushughulikie wapi kijenzi hiki cha Minter kinaongezwa.

Ukienda kwenye faili ya `App.js`, ambayo ni kijenzi kikuu katika React kinachofanya kazi kama chombo cha vijenzi vingine vyote, utaona kwamba kijenzi chetu cha Minter kimeingizwa kwenye mstari wa 7.

**Katika mafunzo haya, tutakuwa tukihariri tu `Minter.js file` na kuongeza faili kwenye folda yetu ya `src`.**

Sasa kwa kuwa tunaelewa kile tunachofanyia kazi, hebu tuweke mkoba wetu wa Ethereum!

## Weka mkoba wako wa Ethereum {#set-up-your-ethereum-wallet}

Ili watumiaji waweze kuingiliana na mkataba mahiri wako watahitaji kuunganisha mkoba wao wa Ethereum kwenye programu tumizi iliyogatuliwa (dapp) yako.

### Pakua MetaMask

Kwa mafunzo haya, tutatumia MetaMask, mkoba pepe katika kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Ikiwa unataka kuelewa zaidi kuhusu jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/).

Unaweza kupakua na kuunda akaunti ya MetaMask bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha unabadilisha kwenda kwenye mtandao wa majaribio unaotumika kama vile Sepolia \(ili tusiwe tunashughulika na pesa halisi\).
### Ongeza Etha kutoka kwenye Bomba

Ili kufua NFT zetu (au kutia sahihi miamala yoyote kwenye mnyororo wa vitalu wa Ethereum), tutahitaji ETH bandia. Ili kupata ETH ya mtandao wa majaribio, tumia bomba linalodumishwa kama vile [bomba la Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) na uweke anwani ya akaunti yako ya Sepolia. Unapaswa kuona ETH kwenye akaunti yako ya MetaMask punde tu baada ya hapo!
### Angalia salio lako

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) tukitumia [zana ya sandbox ya Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Hii itarudisha kiasi cha ETH kwenye mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Send Request”, unapaswa kuona jibu kama hili:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**KUMBUKA:** Matokeo haya yapo katika Wei na si ETH. Wei inatumika kama kizio kidogo zaidi cha etha. Ubadilishaji kutoka Wei kwenda ETH ni: ETH 1 = Wei 10¹⁸. Kwa hivyo tukibadilisha 0xde0b6b3a7640000 kuwa desimali tunapata 1\*10¹⁸ ambayo ni sawa na ETH 1.

Afadhali! Pesa yetu bandia yote ipo! <Emoji text=":money_mouth_face:" size={1} />
## Unganisha MetaMask kwenye UI yako {#connect-metamask-to-your-ui}

Sasa kwa kuwa mkoba wetu wa MetaMask umewekwa, hebu tuunganishe programu tumizi iliyogatuliwa (dapp) yetu kwake!

Kwa sababu tunataka kufuata dhana ya [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), tutaunda faili tofauti iliyo na utendaji wetu wa kudhibiti mantiki, data, na sheria za programu tumizi iliyogatuliwa (dapp) yetu, na kisha kupitisha utendaji hizo kwenye mbele yetu (kijenzi chetu cha Minter.js).

### Utendaji wa `connectWallet` {#connect-wallet-function}

Ili kufanya hivyo, hebu tuunde folda mpya inayoitwa `utils` katika saraka yako ya `src` na tuongeze faili inayoitwa `interact.js` ndani yake, ambayo itakuwa na utendaji wetu wote wa mwingiliano wa mkoba na mkataba mahiri.

Katika faili yetu ya `interact.js`, tutaandika utendaji wa `connectWallet`, ambao kisha tutauingiza na kuuita katika kijenzi chetu cha `Minter.js`.

Katika faili yako ya `interact.js`, ongeza yafuatayo

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Hebu tuchambue kile msimbo huu unafanya:

Kwanza, utendaji wetu unaangalia ikiwa `window.ethereum` imewezeshwa kwenye kivinjari chako.

`window.ethereum` ni API ya kimataifa inayoingizwa by MetaMask na watoa huduma wengine wa mkoba ambayo inaruhusu tovuti kuomba akaunti za Ethereum za watumiaji. Ikiidhinishwa, inaweza kusoma data kutoka kwenye minyororo ya vitalu ambayo mtumiaji ameunganishwa nayo, na kupendekeza kwamba mtumiaji atie sahihi jumbe na miamala. Angalia [hati za MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) kwa maelezo zaidi!

Ikiwa `window.ethereum` _haipo_, basi hiyo inamaanisha MetaMask haijasakinishwa. Hii inasababisha kipengee cha JSON kurudishwa, ambapo `address` iliyorudishwa ni mfuatano tupu, na kipengee cha JSX cha `status` kinawasilisha kwamba mtumiaji lazima asakinishe MetaMask.

**Nyingi ya utendaji tunazoandika zitarudisha vipengee vya JSON ambavyo tunaweza kutumia kusasisha vigezo vyetu vya hali na UI.**

Sasa ikiwa `window.ethereum` _ipo_, basi hapo ndipo mambo yanapovutia.

Kwa kutumia kitanzi cha try/catch, tutajaribu kuunganisha kwenye MetaMask kwa kuita [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Kuita utendaji huu kutafungua MetaMask kwenye kivinjari, ambapo mtumiaji ataombwa kuunganisha mkoba wao kwenye programu tumizi iliyogatuliwa (dapp) yako.

- Ikiwa mtumiaji atachagua kuunganisha, `method: "eth_requestAccounts"` itarudisha safu iliyo na anwani zote za akaunti za mtumiaji ambazo zimeunganishwa kwenye programu tumizi iliyogatuliwa (dapp). Kwa ujumla, utendaji wetu wa `connectWallet` utarudisha kipengee cha JSON ambacho kina `address` ya _kwanza_ katika safu hii \(tazama mstari wa 9\) na ujumbe wa `status` unaomwomba mtumiaji kuandika ujumbe kwenye mkataba mahiri.
- Ikiwa mtumiaji atakataa muunganisho, basi kipengee cha JSON kitakuwa na mfuatano tupu kwa `address` iliyorudishwa na ujumbe wa `status` unaoonyesha kwamba mtumiaji alikataa muunganisho.

### Ongeza utendaji wa connectWallet kwenye Kijenzi chako cha UI cha Minter.js {#add-connect-wallet}

Sasa kwa kuwa tumeandika utendaji huu wa `connectWallet`, hebu tuunganishe kwenye kijenzi chetu cha `Minter.js.`.

Kwanza, itabidi tuingize utendaji wetu kwenye faili yetu ya `Minter.js` kwa kuongeza `import { connectWallet } from "./utils/interact.js";` juu ya faili ya `Minter.js`. Mistari yako 11 ya kwanza ya `Minter.js` sasa inapaswa kuonekana hivi:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Vigezo vya hali
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Kisha, ndani ya utendaji wetu wa `connectWalletPressed`, tutaita utendaji wetu ulioingizwa wa `connectWallet`, kama hivi:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Unaona jinsi utendaji wetu mwingi umetenganishwa na kijenzi chetu cha `Minter.js` kutoka kwenye faili ya `interact.js`? Hii ni ili tuzingatie dhana ya M-V-C!

Katika `connectWalletPressed`, tunafanya tu mwito wa await kwenye utendaji wetu ulioingizwa wa `connectWallet`, na kwa kutumia jibu lake, tunasasisha vigezo vyetu vya `status` na `walletAddress` kupitia ndoano zao za hali.

Sasa, hebu tuhifadhi faili zote mbili `Minter.js` na `interact.js` na tujaribu UI yetu hadi sasa.

Fungua kivinjari chako kwenye localhost:3000, na ubonyeze kitufe cha "Connect Wallet" upande wa juu kulia wa ukurasa.

Ikiwa umesakinisha MetaMask, unapaswa kuombwa kuunganisha mkoba wako kwenye programu tumizi iliyogatuliwa (dapp) yako. Kubali mwaliko wa kuunganisha.

Unapaswa kuona kwamba kitufe cha mkoba sasa kinaonyesha kwamba anwani yako imeunganishwa.

Kisha, jaribu kuonyesha upya ukurasa... hii ni ajabu. Kitufe chetu cha mkoba kinatuomba tuunganishe MetaMask, ingawa tayari imeunganishwa...

Usijali hata hivyo! Tunaweza kurekebisha hilo kwa urahisi kwa kutekeleza utendaji unaoitwa `getCurrentWalletConnected`, ambao utaangalia ikiwa anwani tayari imeunganishwa kwenye programu tumizi iliyogatuliwa (dapp) yetu na kusasisha UI yetu ipasavyo!

### Utendaji wa getCurrentWalletConnected {#get-current-wallet}

Katika faili yako ya `interact.js`, ongeza utendaji ufuatao wa `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Msimbo huu unafanana _sana_ na utendaji wa `connectWallet` tulioandika hivi punde.

Tofauti kuu ni kwamba badala ya kuita mbinu ya `eth_requestAccounts`, ambayo inafungua MetaMask kwa mtumiaji kuunganisha mkoba wao, hapa tunaita mbinu ya `eth_accounts`, ambayo inarudisha tu safu iliyo na anwani za MetaMask zilizounganishwa kwa sasa kwenye programu tumizi iliyogatuliwa (dapp) yetu.

Ili kuona utendaji huu ukifanya kazi, hebu tuuite katika utendaji wa `useEffect` wa kijenzi chetu cha `Minter.js`.

Kama tulivyofanya kwa `connectWallet`, lazima tuingize utendaji huu kutoka kwenye faili yetu ya `interact.js` hadi kwenye faili yetu ya `Minter.js` kama hivi:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //ingiza hapa
} from "./utils/interact.js"
```

Sasa, tunauita tu katika utendaji wetu wa `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Kumbuka, tunatumia jibu la mwito wetu kwa `getCurrentWalletConnected` kusasisha vigezo vyetu vya hali vya `walletAddress` na `status`.

Mara tu unapoongeza msimbo huu, jaribu kuonyesha upya dirisha la kivinjari chetu. Kitufe kinapaswa kusema kwamba umeunganishwa, na kuonyesha onyesho la awali la anwani ya mkoba wako uliounganishwa - hata baada ya kuonyesha upya!

### Tekeleza addWalletListener {#implement-add-wallet-listener}

Hatua ya mwisho katika usanidi wa mkoba wa programu tumizi iliyogatuliwa (dapp) yetu ni kutekeleza msikilizaji wa mkoba ili UI yetu isasishwe wakati hali ya mkoba wetu inabadilika, kama vile wakati mtumiaji anakata muunganisho au kubadilisha akaunti.

Katika faili yako ya `Minter.js`, ongeza utendaji wa `addWalletListener` unaoonekana kama ufuatao:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Hebu tuchambue haraka kile kinachotokea hapa:

- Kwanza, utendaji wetu unaangalia ikiwa `window.ethereum` imewezeshwa \(yaani, MetaMask imesakinishwa\).
  - Ikiwa sivyo, tunaweka tu kigezo chetu cha hali cha `status` kuwa mfuatano wa JSX unaomwomba mtumiaji kusakinisha MetaMask.
  - Ikiwa imewezeshwa, tunaweka msikilizaji `window.ethereum.on("accountsChanged")` kwenye mstari wa 3 ambaye anasikiliza mabadiliko ya hali katika mkoba wa MetaMask, ambayo yanajumuisha wakati mtumiaji anaunganisha akaunti ya ziada kwenye programu tumizi iliyogatuliwa (dapp), anabadilisha akaunti, au anakata muunganisho wa akaunti. Ikiwa kuna angalau akaunti moja iliyounganishwa, kigezo cha hali cha `walletAddress` kinasasishwa kama akaunti ya kwanza katika safu ya `accounts` iliyorudishwa na msikilizaji. Vinginevyo, `walletAddress` inawekwa kama mfuatano tupu.

Hatimaye, lazima tuuite katika utendaji wetu wa `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Na voila! Tumekamilisha kupanga utendaji wote wa mkoba wetu! Sasa kwa kuwa mkoba wetu umewekwa, hebu tujue jinsi ya kufua NFT yetu!

## Data Fafanuzi ya NFT 101 {#nft-metadata-101}

Kwa hivyo kumbuka data fafanuzi ya NFT tuliyozungumzia hivi punde katika Hatua ya 0 ya mafunzo haya—inaipa NFT uhai, na kuiruhusu kuwa na sifa, kama vile rasilimali ya dijitali, jina, maelezo, na sifa zingine.

Tutahitaji kusanidi data fafanuzi hii kama kipengee cha JSON na kuihifadhi, ili tuweze kuipitisha kama kigezo cha `tokenURI` wakati wa kuita utendaji wa `mintNFT` wa mkataba mahiri wetu.

Maandishi katika sehemu za "Link to Asset", "Name", "Description" yatajumuisha sifa tofauti za data fafanuzi ya NFT yetu. Tutaunda data fafanuzi hii kama kipengee cha JSON, lakini kuna chaguo kadhaa za wapi tunaweza kuhifadhi kipengee hiki cha JSON:

- Tunaweza kuihifadhi kwenye mnyororo wa vitalu wa Ethereum; hata hivyo, kufanya hivyo kungekuwa ghali sana.
- Tunaweza kuihifadhi kwenye seva kuu, kama AWS au Firebase. Lakini hiyo ingeshinda maadili yetu ya ugatuzi.
- Tunaweza kutumia IPFS, itifaki iliyogatuliwa na mtandao wa rika-kwa-rika kwa ajili ya kuhifadhi na kushiriki data katika mfumo wa faili uliosambazwa. Kwa kuwa itifaki hii imegatuliwa na ni ya bure, ni chaguo letu bora!

Ili kuhifadhi data fafanuzi yetu kwenye IPFS, tutatumia [Pinata](https://pinata.cloud/), API na zana rahisi ya IPFS. Katika hatua inayofuata, tutaelezea haswa jinsi ya kufanya hivi!

## Tumia Pinata kubandika data fafanuzi yako kwenye IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Ikiwa huna akaunti ya [Pinata](https://pinata.cloud/), jisajili kwa akaunti ya bure [hapa](https://app.pinata.cloud/auth/signup) na ukamilishe hatua za kuthibitisha barua pepe na akaunti yako.

### Unda ufunguo wako wa API wa Pinata {#create-pinata-api-key}

Nenda kwenye ukurasa wa [https://pinata.cloud/keys](https://pinata.cloud/keys), kisha uchague kitufe cha "New Key" juu, weka wijeti ya Msimamizi kama imewezeshwa, na upe jina ufunguo wako.

Kisha utaonyeshwa dirisha ibukizi lenye maelezo yako ya API. Hakikisha unaweka hii mahali salama.

Sasa kwa kuwa ufunguo wetu umewekwa, hebu tuuongeze kwenye mradi wetu ili tuweze kuutumia.

### Unda faili ya .env {#create-a-env}

Tunaweza kuhifadhi ufunguo wetu wa Pinata na siri kwa usalama katika faili ya mazingira. Hebu tusakinishe [kifurushi cha dotenv](https://www.npmjs.com/package/dotenv) katika saraka yako ya mradi.

Fungua kichupo kipya kwenye terminal yako \(tofauti na ile inayoendesha mwenyeji wa ndani\) na uhakikishe uko kwenye folda ya `minter-starter-files`, kisha uendeshe amri ifuatayo kwenye terminal yako:

```text
npm install dotenv --save
```

Kisha, unda faili ya `.env` katika saraka ya mzizi ya `minter-starter-files` yako kwa kuingiza yafuatayo kwenye mstari wako wa amri:

```javascript
vim.env
```

Hii itafungua faili yako ya `.env` katika vim \(kihariri cha maandishi\). Ili kuihifadhi bonyeza "esc" + ":" + "q" kwenye kibodi yako kwa mpangilio huo.

Kisha, katika VSCode, nenda kwenye faili yako ya `.env` na uongeze ufunguo wako wa API wa Pinata na siri ya API kwake, kama hivi:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Hifadhi faili, na kisha uko tayari kuanza kuandika utendaji wa kupakia data fafanuzi yako ya JSON kwenye IPFS!

### Tekeleza pinJSONToIPFS {#pin-json-to-ipfs}

Kwa bahati nzuri kwetu, Pinata ina [API mahususi kwa ajili ya kupakia data ya JSON kwenye IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) na mfano rahisi wa JavaScript na axios ambao tunaweza kutumia, na marekebisho madogo.

Katika folda yako ya `utils`, hebu tuunde faili nyingine inayoitwa `pinata.js` na kisha tuingize siri yetu ya Pinata na ufunguo kutoka kwenye faili ya .env kama hivi:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Kisha, bandika msimbo wa ziada kutoka hapa chini kwenye faili yako ya `pinata.js`. Usijali, tutachambua kile kila kitu kinamaanisha!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //kufanya ombi la POST la axios kwa Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Kwa hivyo msimbo huu unafanya nini haswa?

Kwanza, inaingiza [axios](https://www.npmjs.com/package/axios), mteja wa HTTP anayetegemea ahadi kwa kivinjari na Node.js, ambayo tutatumia kufanya ombi kwa Pinata.

Kisha tuna utendaji wetu usiolingana wa `pinJSONToIPFS`, ambao unachukua `JSONBody` kama ingizo lake na ufunguo wa API wa Pinata na siri katika kichwa chake, yote ili kufanya ombi la POST kwenye API yao ya `pinJSONToIPFS`.

- Ikiwa ombi hili la POST limefanikiwa, basi utendaji wetu unarudisha kipengee cha JSON na boolean ya `success` kama kweli na `pinataUrl` ambapo data fafanuzi yetu ilibandikwa. Tutatumia `pinataUrl` hii iliyorudishwa kama ingizo la `tokenURI` kwenye utendaji wa ufuzi wa mkataba mahiri wetu.
- Ikiwa ombi hili la post litashindwa, basi utendaji wetu unarudisha kipengee cha JSON na boolean ya `success` kama uongo na mfuatano wa `message` unaowasilisha kosa letu.

Kama ilivyo kwa aina za kurudisha za utendaji wetu wa `connectWallet`, tunarudisha vipengee vya JSON ili tuweze kutumia vigezo vyao kusasisha vigezo vyetu vya hali na UI.

## Pakia mkataba mahiri wako {#load-your-smart-contract}

Sasa kwa kuwa tuna njia ya kupakia data fafanuzi ya NFT yetu kwenye IPFS kupitia utendaji wetu wa `pinJSONToIPFS`, tutahitaji njia ya kupakia mfano wa mkataba mahiri wetu ili tuweze kuita utendaji wake wa `mintNFT`.

Kama tulivyotaja hapo awali, katika mafunzo haya tutakuwa tukitumia [mkataba mahiri huu wa NFT uliopo](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); hata hivyo, ikiwa ungependa kujifunza jinsi tulivyouunda, au kuunda mmoja wewe mwenyewe, tunapendekeza sana uangalie mafunzo yetu mengine, ["Jinsi ya Kuunda NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI ya mkataba {#contract-abi}

Ikiwa ulichunguza faili zetu kwa karibu, utakuwa umegundua kuwa katika saraka yetu ya `src`, kuna faili ya `contract-abi.json`. ABI ni muhimu kwa kubainisha ni utendaji gani mkataba utaita na pia kuhakikisha kwamba utendaji utarudisha data katika muundo unaotarajia.

Pia tutahitaji ufunguo wa API wa Alchemy na API ya Alchemy Web3 ili kuunganisha kwenye mnyororo wa vitalu wa Ethereum na kupakia mkataba mahiri wetu.

### Unda ufunguo wako wa API wa Alchemy

Ikiwa bado huna akaunti ya Alchemy, [jisajili bila malipo hapa.](https://alchemy.com/?a=eth-org-nft-minter)

Mara tu unapounda akaunti ya Alchemy, unaweza kuzalisha ufunguo wa API kwa kuunda programu. Hii itaturuhusu kufanya maombi kwenye mtandao wa majaribio wa Sepolia.

Nenda kwenye ukurasa wa “Create App” katika Dashibodi yako ya Alchemy kwa kuelea juu ya “Apps” kwenye upau wa kusogeza na kubofya “Create App”.

Ipe jina programu yako tulichagua "My First NFT!", toa maelezo mafupi, chagua “Staging” kwa Mazingira yanayotumika kwa uwekaji hesabu wa programu yako, na uchague “Sepolia” kwa mtandao wako.

Bofya “Create app” na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye jedwali hapa chini.

Safi sana kwa hivyo sasa kwa kuwa tumeunda URL yetu ya HTTP ya API ya Alchemy, inakili kwenye ubao wako wa kunakili...

…na kisha tuiongeze kwenye faili yetu ya `.env`. Kwa ujumla, faili yako ya .env inapaswa kuonekana hivi:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

Sasa kwa kuwa tuna ABI ya mkataba wetu na ufunguo wetu wa API wa Alchemy, tuko tayari kupakia mkataba mahiri wetu kwa kutumia [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
### Weka mwisho wako wa Alchemy Web3 na mkataba {#setup-alchemy-endpoint}

Kwanza, ikiwa bado huna, utahitaji kusakinisha [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kwa kwenda kwenye saraka ya nyumbani: `nft-minter-tutorial` kwenye terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Kisha hebu turudi kwenye faili yetu ya `interact.js`. Juu ya faili, ongeza msimbo ufuatao ili kuingiza ufunguo wako wa Alchemy kutoka kwenye faili yako ya .env na uweke mwisho wako wa Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ni kanga karibu na [Web3.js](https://docs.web3js.org/), inayotoa mbinu zilizoboreshwa za API na faida zingine muhimu ili kurahisisha maisha yako kama msanidi programu wa Web3. Imeundwa kuhitaji usanidi mdogo ili uweze kuanza kuitumia kwenye programu yako mara moja!

Kisha, hebu tuongeze ABI ya mkataba wetu na anwani ya mkataba kwenye faili yetu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Mara tu tunapokuwa na hizo zote mbili, tuko tayari kuanza kuandika msimbo wa utendaji wetu wa ufuzi!

## Tekeleza utendaji wa mintNFT {#implement-the-mintnft-function}

Ndani ya faili yako ya `interact.js`, hebu tufafanue utendaji wetu, `mintNFT`, ambao kwa jina lake utafua NFT yetu.

Kwa sababu tutakuwa tukifanya miito mingi isiyolingana \(kwa Pinata kubandika data fafanuzi yetu kwenye IPFS, Alchemy Web3 kupakia mkataba mahiri wetu, na MetaMask kutia sahihi miamala yetu\), utendaji wetu pia utakuwa usiolingana.

Ingizo tatu kwenye utendaji wetu zitakuwa `url` ya rasilimali ya dijitali yetu, `name`, na `description`. Ongeza saini ifuatayo ya utendaji chini ya utendaji wa `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Ushughulikiaji wa makosa ya ingizo {#input-error-handling}

Kwa kawaida, inaeleweka kuwa na aina fulani ya ushughulikiaji wa makosa ya ingizo mwanzoni mwa utendaji, ili tutoke kwenye utendaji huu ikiwa vigezo vyetu vya ingizo si sahihi. Ndani ya utendaji wetu, hebu tuongeze msimbo ufuatao:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa makosa
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Kimsingi, ikiwa vigezo vyovyote vya ingizo ni mfuatano tupu, basi tunarudisha kipengee cha JSON ambapo boolean ya `success` ni uongo, na mfuatano wa `status` unawasilisha kwamba sehemu zote katika UI yetu lazima zikamilike.

### Pakia data fafanuzi kwenye IPFS {#upload-metadata-to-ipfs}

Mara tu tunapojua data fafanuzi yetu imeundwa vizuri, hatua inayofuata ni kuifunga kwenye kipengee cha JSON na kuipakia kwenye IPFS kupitia `pinJSONToIPFS` tuliyoandika!

Ili kufanya hivyo, kwanza tunahitaji kuingiza utendaji wa `pinJSONToIPFS` kwenye faili yetu ya `interact.js`. Juu kabisa ya `interact.js`, hebu tuongeze:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Kumbuka kwamba `pinJSONToIPFS` inachukua mwili wa JSON. Kwa hivyo kabla hatujafanya mwito kwake, tutahitaji kuunda vigezo vyetu vya `url`, `name`, na `description` kuwa kipengee cha JSON.

Hebu tusasishe msimbo wetu ili kuunda kipengee cha JSON kinachoitwa `metadata` na kisha tufanye mwito kwa `pinJSONToIPFS` na kigezo hiki cha `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa makosa
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //tengeneza data fafanuzi
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //fanya wito wa Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Kumbuka, tunahifadhi jibu la mwito wetu kwa `pinJSONToIPFS(metadata)` katika kipengee cha `pinataResponse`. Kisha, tunachanganua kipengee hiki kwa makosa yoyote.

Ikiwa kuna kosa, tunarudisha kipengee cha JSON ambapo boolean ya `success` ni uongo na mfuatano wetu wa `status` unawasilisha kwamba mwito wetu ulishindwa. Vinginevyo, tunatoa `pinataURL` kutoka kwenye `pinataResponse` na kuihifadhi kama kigezo chetu cha `tokenURI`.

Sasa ni wakati wa kupakia mkataba mahiri wetu kwa kutumia API ya Alchemy Web3 ambayo tulianzisha juu ya faili yetu. Ongeza mstari ufuatao wa msimbo chini ya utendaji wa `mintNFT` ili kuweka mkataba kwenye kigezo cha kimataifa cha `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Kitu cha mwisho cha kuongeza katika utendaji wetu wa `mintNFT` ni muamala wetu wa Ethereum:

```javascript
//sanidi muamala wako wa Ethereum
const transactionParameters = {
  to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
  from: window.ethereum.selectedAddress, // lazima ilingane na anwani inayotumika ya mtumiaji.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //fanya wito kwa mkataba mahiri wa NFT
}

//saini muamala kupitia MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Ikiwa tayari unafahamu miamala ya Ethereum, utagundua kuwa muundo unafanana sana na kile ulichoona.

- Kwanza, tunaweka vigezo vyetu vya miamala.
  - `to` inabainisha anwani ya mpokeaji \(mkataba mahiri wetu\)
  - `from` inabainisha mtia sahihi wa muamala \(anwani iliyounganishwa ya mtumiaji kwenye MetaMask: `window.ethereum.selectedAddress`\)
  - `data` ina mwito kwa mbinu ya `mintNFT` ya mkataba mahiri wetu, ambayo inapokea `tokenURI` yetu na anwani ya mkoba wa mtumiaji, `window.ethereum.selectedAddress`, kama ingizo
- Kisha, tunafanya mwito wa await, `window.ethereum.request,` ambapo tunaomba MetaMask kutia sahihi muamala. Kumbuka, katika ombi hili, tunabainisha mbinu yetu ya eth \(eth_SentTransaction\) na kupitisha `transactionParameters` yetu. Katika hatua hii, MetaMask itafunguka kwenye kivinjari, na kumwomba mtumiaji kutia sahihi au kukataa muamala.
  - Ikiwa muamala umefanikiwa, utendaji utarudisha kipengee cha JSON ambapo boolean ya `success` imewekwa kuwa kweli na mfuatano wa `status` unamwomba mtumiaji kuangalia Etherscan kwa maelezo zaidi kuhusu muamala wao.
  - Ikiwa muamala utashindwa, utendaji utarudisha kipengee cha JSON ambapo boolean ya `success` imewekwa kuwa uongo, na mfuatano wa `status` unawasilisha ujumbe wa kosa.

Kwa ujumla, utendaji wetu wa `mintNFT` unapaswa kuonekana hivi:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa makosa
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //tengeneza data fafanuzi
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //ombi la kubandika la Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //pakia mkataba mahiri
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //sanidi muamala wako wa Ethereum
  const transactionParameters = {
    to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
    from: window.ethereum.selectedAddress, // lazima ilingane na anwani inayotumika ya mtumiaji.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //fanya wito kwa mkataba mahiri wa NFT
  }

  //saini muamala kupitia MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Huo ni utendaji mmoja mkubwa! Sasa, tunahitaji tu kuunganisha utendaji wetu wa `mintNFT` kwenye kijenzi chetu cha `Minter.js`...

## Unganisha mintNFT kwenye mbele yetu ya Minter.js {#connect-our-frontend}

Fungua faili yako ya `Minter.js` na usasishe mstari wa `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` juu kuwa:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Hatimaye, tekeleza utendaji wa `onMintPressed` ili kufanya mwito wa await kwenye utendaji wako ulioingizwa wa `mintNFT` na usasishe kigezo cha hali cha `status` ili kuonyesha ikiwa muamala wetu ulifanikiwa au ulishindwa:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Sambaza NFT yako kwenye tovuti iliyo hewani

Uko tayari kuweka mradi wako hewani ili watumiaji waingiliane nao? Angalia [nyaraka za usambazaji za React](https://create-react-app.dev/docs/deployment/) kwa ajili ya kusambaza Minter yako kwenye tovuti iliyo hewani.

Hatua moja ya mwisho...
## Tikisa ulimwengu wa mnyororo wa vitalu {#take-the-blockchain-world-by-storm}

Utani tu, umefika mwisho wa mafunzo!

Kwa muhtasari, kwa kuunda kifua NFT, umejifunza kwa mafanikio jinsi ya:

- Kuunganisha kwenye MetaMask kupitia mradi wako wa mbele
- Kuita mbinu za mkataba mahiri kutoka kwenye mbele yako
- Kutia sahihi miamala ukitumia MetaMask

Yamkini, ungependa kuweza kuonyesha NFT zilizofufuliwa kupitia programu tumizi iliyogatuliwa (dapp) yako kwenye mkoba wako — kwa hivyo hakikisha unaangalia mafunzo yetu ya haraka ya [Jinsi ya Kutazama NFT Yako Kwenye Mkoba Wako](/developers/tutorials/how-to-view-nft-in-metamask/)!

Na, kama kawaida, ikiwa una maswali yoyote, tuko hapa kusaidia katika [Discord ya Alchemy](https://discord.gg/gWuC7zB). Tunatarajia kuona jinsi unavyotumia dhana kutoka kwenye mafunzo haya kwenye miradi yako ya baadaye!
