---
title: Mafunzo ya Muunda wa NFT
description: Katika mafunzo haya, utaunda muunda wa NFT na kujifunza jinsi ya kuunda mfumo kamili uliotawanywa kwa kuunganisha mkataba wako erevu kwenye frontend ya React kwa kutumia zana za MetaMask na Web3.
author: "smudgil"
tags:
  [
    "uimara",
    "NFT",
    "alchemy",
    "mikataba erevu",
    "frontend",
    "Pinata"
  ]
skill: intermediate
lang: sw
published: 2021-10-06
---

Mojawapo ya changamoto kubwa zaidi kwa wasanidi programu wanaotoka katika historia ya Web2 ni kugundua jinsi ya kuunganisha mkataba wako erevu kwenye mradi wa frontend na kuingiliana nao.

Kwa kuunda muunda wa NFT — UI rahisi ambapo unaweza kuingiza kiungo cha mali yako ya kidijitali, jina, na maelezo — utajifunza jinsi ya:

- Unganisha kwenye MetaMask kupitia mradi wako wa frontend
- Ita mbinu za mkataba erevu kutoka kwa frontend yako
- Saini miamala kwa kutumia MetaMask

Katika mafunzo haya, tutatumia [React](https://react.dev/) kama mfumo wetu wa frontend. Kwa sababu mafunzo haya yanalenga hasa uundaji wa Web3, hatutatumia muda mwingi kuchanganua misingi ya React. Badala yake, tutaangazia kuleta utendakazi kwenye mradi wetu.

Kama sharti, unapaswa kuwa na uelewa wa kiwango cha mwanzo cha React—jua jinsi vijenzi, props, useState/useEffect, na uendeshaji msingi wa utendakazi hufanya kazi. Ikiwa hujawahi kusikia kuhusu masharti yoyote kati ya hayo hapo awali, unaweza kutaka kuangalia [mafunzo haya ya Utangulizi wa React](https://react.dev/learn/tutorial-tic-tac-toe). Kwa wanaojifunza zaidi kwa kuona, tunapendekeza sana mfululizo huu bora wa video wa [Mafunzo Kamili ya Kisasa ya React](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) na Net Ninja.

Na kama bado, hakika utahitaji akaunti ya Alchemy ili kukamilisha mafunzo haya pamoja na kuunda chochote kwenye mnyororo wa bloku. Jisajili kwa akaunti isiyolipishwa [hapa](https://alchemy.com/).

Bila kuchelewa zaidi, tuanze!

## Kuunda NFTs 101 {#making-nfts-101}

Kabla hata hatujaanza kuangalia msimbo wowote, ni muhimu kuelewa jinsi uundaji wa NFT unavyofanya kazi. Inahusisha hatua mbili:

### Chapisha mkataba erevu wa NFT kwenye mnyororo wa bloku wa Ethereum {#publish-nft}

Tofauti kubwa kati ya viwango viwili vya mkataba erevu wa NFT ni kwamba ERC-1155 ni kiwango cha ishara nyingi na inajumuisha utendakazi wa bechi, ilhali ERC-721 ni kiwango cha ishara moja na kwa hivyo inasaidia tu kuhamisha ishara moja kwa wakati mmoja.

### Ita kazi ya uundaji {#minting-function}

Kawaida, kazi hii ya uundaji inakuhitaji kupitisha vigezo viwili kama vigezo, kwanza `mpokeaji`, ambayo inabainisha anwani itakayopokea NFT yako mpya iliyoundwa, na pili `tokenURI` ya NFT, mfuatano unaotatuliwa hadi hati ya JSON inayoelezea metadata ya NFT.

Metadata ya NFT ndiyo hasa inayoipa uhai, kuiruhusu iwe na sifa, kama vile jina, maelezo, picha (au mali tofauti ya kidijitali), na sifa zingine. Huu ni [mfano wa tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), ambayo ina metadata ya NFT.

Katika mafunzo haya, tutazingatia sehemu ya 2, kuita kazi ya uundaji ya mkataba erevu wa NFT uliopo kwa kutumia React UI yetu.

[Hapa kuna kiungo](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) cha mkataba erevu wa ERC-721 NFT tutakaouita katika mafunzo haya. Ikiwa ungependa kujifunza jinsi tulivyoiunda, tunapendekeza sana uangalie mafunzo yetu mengine, ["Jinsi ya Kuunda NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Safi, sasa kwa kuwa tunaelewa jinsi uundaji wa NFT unavyofanya kazi, hebu tunakili faili zetu za kuanzia!

## Nakili faili za kuanzia {#clone-the-starter-files}

Kwanza, nenda kwenye [hifadhi ya GitHub ya nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) ili kupata faili za kuanzia za mradi huu. Nakili hifadhi hii kwenye mazingira yako ya ndani.

Unapofungua hifadhi hii iliyonakiliwa ya `nft-minter-tutorial`, utagundua kuwa ina folda mbili: `minter-starter-files` na `nft-minter`.

- `minter-starter-files` ina faili za kuanzia (kimsingi React UI) kwa mradi huu. Katika mafunzo haya, **tutafanyia kazi katika saraka hii**, unapojifunza jinsi ya kuipa uhai UI hii kwa kuiunganisha kwenye pochi yako ya Ethereum na mkataba erevu wa NFT.
- `nft-minter` ina mafunzo yote yaliyokamilika na iko kwa ajili yako kama **rejeleo** **ukikwama.**

Kisha, fungua nakala yako ya `minter-starter-files` katika kihariri chako cha msimbo, kisha nenda kwenye folda yako ya `src`.

Msimbo wote tutakaouandika utakuwa chini ya folda ya `src`. Tutakuwa tukihariri kijenzi cha `Minter.js` na kuandika faili za ziada za javascript ili kuupa mradi wetu utendakazi wa Web3.

## Hatua ya 2: Angalia faili zetu za kuanzia {#step-2-check-out-our-starter-files}

Kabla ya kuanza kuandika msimbo, ni muhimu kuangalia kile ambacho tayari kimetolewa kwetu katika faili za kuanzia.

### Fanya mradi wako wa react uendeshwe {#get-your-react-project-running}

Tuanze kwa kuendesha mradi wa React katika kivinjari chetu. Uzuri wa React ni kwamba mara tu mradi wetu unapokuwa ukifanya kazi katika kivinjari chetu, mabadiliko yoyote tunayohifadhi yatasasishwa moja kwa moja kwenye kivinjari chetu.

Ili kuendesha mradi, nenda kwenye saraka kuu ya folda ya `minter-starter-files`, na kisha endesha `npm install` kwenye terminal yako ili kusakinisha vitegemezi vya mradi:

```bash
cd minter-starter-files
npm install
```

Mara tu hizo zikimaliza kusakinisha, endesha `npm start` kwenye terminal yako:

```bash
npm start
```

Kufanya hivyo kunapaswa kufungua http://localhost:3000/ kwenye kivinjari chako, ambapo utaona frontend ya mradi wetu. Inapaswa kuwa na sehemu 3: mahali pa kuingiza kiungo cha mali ya NFT yako, ingiza jina la NFT yako, na utoe maelezo.

Ukijaribu kubofya vitufe vya "Unganisha Pochi" au "Unda NFT", utagundua havifanyi kazi—hiyo ni kwa sababu bado tunahitaji kupanga utendakazi wao! :\)

### Kijenzi cha Minter.js {#minter-js}

**KUMBUKA:** Hakikisha uko kwenye folda ya `minter-starter-files` na si folda ya `nft-minter`!

Turudi kwenye folda ya `src` katika kihariri chetu na tufungue faili ya `Minter.js`. Ni muhimu sana tuelewe kila kitu katika faili hii, kwani ndicho kijenzi kikuu cha React tutakachokuwa tukifanyia kazi.

Juu ya faili hii yetu, tuna vigezo vyetu vya hali ambavyo tutasasisha baada ya matukio maalum.

```javascript
//Vigezo vya hali
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Hujawahi kusikia kuhusu vigeu vya hali vya React au ndoana za hali? Angalia hati [hizi](https://legacy.reactjs.org/docs/hooks-state.html).

Hivi ndivyo kila kigeu kinawakilisha:

- `walletAddress` - mfuatano unaohifadhi anwani ya pochi ya mtumiaji
- `status` - mfuatano ulio na ujumbe wa kuonyeshwa chini ya UI
- `name` - mfuatano unaohifadhi jina la NFT
- `description` - mfuatano unaohifadhi maelezo ya NFT
- `url` - mfuatano ambao ni kiungo cha mali ya kidijitali ya NFT

Baada ya vigezo vya hali, utaona kazi tatu ambazo hazijatekelezwa: `useEffect`, `connectWalletPressed`, na `onMintPressed`. Utaona kwamba kazi hizi zote ni `async`, hiyo ni kwa sababu tutakuwa tukifanya miito ya API isiyolingana ndani yao! Majina yao yanalingana na utendakazi wao:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - hii ni ndoana ya React inayoitwa baada ya kijenzi chako kutolewa. Kwa sababu ina propu ya safu tupu `[]` iliyopitishwa ndani yake (tazama mstari wa 3), itaitwa tu kwenye utoaji wa _kwanza_ wa kijenzi. Hapa tutaita msikilizaji wetu wa pochi na kazi nyingine ya pochi ili kusasisha UI yetu ili kuonyesha kama pochi tayari imeunganishwa.
- `connectWalletPressed` - kazi hii itaitwa ili kuunganisha pochi ya MetaMask ya mtumiaji kwenye mfumo wetu uliotawanywa.
- `onMintPressed` - kazi hii itaitwa ili kuunda NFT ya mtumiaji.

Karibu na mwisho wa faili hii, tuna UI ya kijenzi chetu. Ukichanganua msimbo huu kwa makini, utaona kwamba tunasasisha vigezo vyetu vya hali vya `url`, `name`, na `description` wakati ingizo katika sehemu zao za maandishi zinazolingana zinabadilika.

Pia utaona kwamba `connectWalletPressed` na `onMintPressed` huitwa wakati vitufe vyenye vitambulisho `mintButton` na `walletButton` vinapobofyewa mtawalia.

```javascript
//UI ya kijenzi chetu
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Imeunganishwa: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Unganisha Pochi</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Muumba wa Alchemy NFT</h1>
    <p>
      Ongeza tu kiungo cha mali yako, jina, na maelezo, kisha bonyeza "Unda."
    </p>
    <form>
      <h2>🖼 Kiungo cha mali: </h2>
      <input
        type="text"
        placeholder="k.m., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Jina: </h2>
      <input
        type="text"
        placeholder="k.m., NFT yangu ya kwanza!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Maelezo: </h2>
      <input
        type="text"
        placeholder="k.m., Baridi zaidi kuliko cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Unda NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Mwishowe, hebu tushughulikie mahali ambapo kijenzi hiki cha Minter kinaongezwa.

Ukienda kwenye faili ya `App.js`, ambayo ni kijenzi kikuu katika React ambacho hufanya kazi kama kontena kwa vijenzi vingine vyote, utaona kwamba kijenzi chetu cha Minter kinaingizwa kwenye mstari wa 7.

**Katika mafunzo haya, tutakuwa tukihariri faili ya `Minter.js` pekee na kuongeza faili kwenye folda yetu ya `src`.**

Sasa kwa kuwa tunaelewa tunachofanyia kazi, hebu tusanidi pochi yetu ya Ethereum!

## Sanidi pochi yako ya Ethereum {#set-up-your-ethereum-wallet}

Ili watumiaji waweze kuingiliana na mkataba wako erevu, watahitaji kuunganisha pochi yao ya Ethereum kwenye mfumo wako uliotawanywa.

### Pakua MetaMask {#download-metamask}

Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni katika kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Ikiwa unataka kuelewa zaidi kuhusu jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/).

Unaweza kupakua na kuunda akaunti ya MetaMask bure [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadilisha hadi "Ropsten Test Network" upande wa juu kulia (ili tusiwe tunashughulika na pesa halisi).

### Ongeza ether kutoka kwa Bomba {#add-ether-from-faucet}

Ili kuunda NFT zetu (au kusaini miamala yoyote kwenye mnyororo wa bloku wa Ethereum), tutahitaji Eth bandia. Ili kupata Eth unaweza kwenda kwenye [Bomba la Ropsten](https://faucet.ropsten.be/) na uingize anwani ya akaunti yako ya Ropsten, kisha bofya "Tuma Ropsten Eth." Unapaswa kuona Eth katika akaunti yako ya MetaMask muda mfupi baadaye!

### Angalia salio lako {#check-your-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) kwa kutumia [zana ya mtunzi ya Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha Eth katika pochi yetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi”, unapaswa kuona jibu kama hili:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**KUMBUKA:** Matokeo haya yako katika wei si eth. Wei hutumika kama denomina ndogo zaidi ya ether. Ubadilishaji kutoka wei hadi eth ni: 1 eth = 10¹⁸ wei. Kwa hivyo, tukibadilisha 0xde0b6b3a7640000 hadi desimali tunapata 1\*10¹⁸ ambayo ni sawa na eth 1.

Phew! Pesa zetu bandia zote zipo! <Emoji text=":money_mouth_face:" size={1} />

## Unganisha MetaMask kwenye UI yako {#connect-metamask-to-your-UI}

Sasa kwa kuwa pochi yetu ya MetaMask imesanidiwa, hebu tuunganishe mfumo wetu uliotawanywa nayo!

Kwa sababu tunataka kufuata dhana ya [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), tutaunda faili tofauti ambayo ina kazi zetu za kudhibiti mantiki, data, na sheria za mfumo wetu uliotawanywa, na kisha kupitisha kazi hizo kwenye frontend yetu (kijenzi chetu cha Minter.js).

### Kazi ya `connectWallet` {#connect-wallet-function}

Ili kufanya hivyo, hebu tuunde folda mpya inayoitwa `utils` katika saraka yako ya `src` na tuongeze faili inayoitwa `interact.js` ndani yake, ambayo itakuwa na kazi zetu zote za mwingiliano wa pochi na mkataba erevu.

Katika faili yetu ya `interact.js`, tutaandika kazi ya `connectWallet`, ambayo tutaiingiza na kuiita katika kijenzi chetu cha `Minter.js`.

Katika faili yako ya `interact.js`, ongeza yafuatayo

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Andika ujumbe katika sehemu ya maandishi hapo juu.",
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
              Lazima usakinishe MetaMask, pochi pepe ya Ethereum, kwenye kivinjari chako.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Hebu tuchanganue msimbo huu unafanya nini:

Kwanza, kazi yetu inakagua ikiwa `window.ethereum` imewezeshwa kwenye kivinjari chako.

`window.ethereum` ni API ya kimataifa inayoingizwa na MetaMask na watoa huduma wengine wa pochi ambayo inaruhusu tovuti kuomba akaunti za Ethereum za watumiaji. Ikiidhinishwa, inaweza kusoma data kutoka kwenye minyororo ya bloku ambayo mtumiaji ameunganishwa nayo, na kupendekeza mtumiaji asaini ujumbe na miamala. Angalia [hati za MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) kwa maelezo zaidi!

Ikiwa `window.ethereum` _haipo_, basi hiyo inamaanisha kuwa MetaMask haijasakinishwa. Hii inasababisha kurudishwa kwa kitu cha JSON, ambapo `anwani` iliyorudishwa ni mfuatano tupu, na kitu cha `status` cha JSX kinaeleza kuwa mtumiaji lazima asakinishe MetaMask.

**Kazi nyingi tutakazoandika zitakuwa zikirudisha vitu vya JSON ambavyo tunaweza kutumia kusasisha vigeu vyetu vya hali na UI.**

Sasa ikiwa `window.ethereum` _ipo_, hapo ndipo mambo yanapopendeza.

Kwa kutumia kitanzi cha kujaribu/kukamatwa, tutajaribu kuunganisha kwenye MetaMask kwa kuita [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Kuita kazi hii kutafungua MetaMask kwenye kivinjari, ambapo mtumiaji ataombwa kuunganisha pochi yake kwenye mfumo wako uliotawanywa.

- Ikiwa mtumiaji atachagua kuunganisha, `method: "eth_requestAccounts"` itarudisha safu iliyo na anwani zote za akaunti za mtumiaji ambazo zimeunganishwa kwenye mfumo uliotawanywa. Kwa pamoja, kazi yetu ya `connectWallet` itarudisha kitu cha JSON kilicho na `anwani` ya _kwanza_ katika safu hii (tazama mstari wa 9) na ujumbe wa `status` unaomwomba mtumiaji aandike ujumbe kwenye mkataba erevu.
- Ikiwa mtumiaji atakataa muunganisho, basi kitu cha JSON kitakuwa na mfuatano tupu kwa `anwani` iliyorudishwa na ujumbe wa `status` unaoonyesha kuwa mtumiaji alikataa muunganisho.

### Ongeza kazi ya connectWallet kwenye Kijenzi chako cha UI cha Minter.js {#add-connect-wallet}

Sasa kwa kuwa tumeandika kazi hii ya `connectWallet`, hebu tuiunganishe kwenye kijenzi chetu cha `Minter.js`.

Kwanza, itabidi tuingize kazi yetu kwenye faili yetu ya `Minter.js` kwa kuongeza `import { connectWallet } from "./utils/interact.js";` juu ya faili ya `Minter.js`. Mistari yako 11 ya kwanza ya `Minter.js` sasa inapaswa kuonekana hivi:

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

Kisha, ndani ya kazi yetu ya `connectWalletPressed`, tutaita kazi yetu iliyoingizwa ya `connectWallet`, kama ifuatavyo:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Je, unaona jinsi utendakazi wetu mwingi unavyofichwa kutoka kwa kijenzi chetu cha `Minter.js` kutoka kwenye faili ya `interact.js`? Hii ni ili tuendane na dhana ya M-V-C!

Katika `connectWalletPressed`, tunafanya tu wito wa kusubiri kwa kazi yetu iliyoingizwa ya `connectWallet`, na kwa kutumia jibu lake, tunasasisha vigezo vyetu vya `status` na `walletAddress` kupitia ndoana zao za hali.

Sasa, hebu tuhifadhi faili zote mbili `Minter.js` na `interact.js` na tujaribu UI yetu hadi sasa.

Fungua kivinjari chako kwenye localhost:3000, na ubonyeze kitufe cha "Unganisha Pochi" upande wa juu kulia wa ukurasa.

Ikiwa umesakinisha MetaMask, unapaswa kuombwa kuunganisha pochi yako kwenye mfumo wako uliotawanywa. Kubali mwaliko wa kuunganisha.

Unapaswa kuona kwamba kitufe cha pochi sasa kinaonyesha kwamba anwani yako imeunganishwa.

Kisha, jaribu kuonyesha upya ukurasa... hii ni ajabu. Kitufe chetu cha pochi kinatuomba tuunganishe MetaMask, ingawa tayari imeunganishwa...

Lakini usijali! Tunaweza kurekebisha hilo kwa urahisi kwa kutekeleza kazi inayoitwa `getCurrentWalletConnected`, ambayo itakagua ikiwa anwani tayari imeunganishwa kwenye mfumo wetu uliotawanywa na kusasisha UI yetu ipasavyo!

### Kazi ya getCurrentWalletConnected {#get-current-wallet}

Katika faili yako ya `interact.js`, ongeza kazi ifuatayo ya `getCurrentWalletConnected`:

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
          status: "👆🏽 Andika ujumbe katika sehemu ya maandishi hapo juu.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Unganisha kwenye MetaMask ukitumia kitufe cha juu kulia.",
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
              Lazima usakinishe MetaMask, pochi pepe ya Ethereum, kwenye kivinjari chako.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Msimbo huu _unafanana sana_ na kazi ya `connectWallet` tuliyoiandika mapema.

Tofauti kuu ni kwamba badala ya kuita mbinu ya `eth_requestAccounts`, ambayo inafungua MetaMask kwa mtumiaji kuunganisha pochi yake, hapa tunaita mbinu ya `eth_accounts`, ambayo inarudisha tu safu iliyo na anwani za MetaMask zilizounganishwa kwa sasa kwenye mfumo wetu uliotawanywa.

Ili kuona kazi hii ikifanya kazi, hebu tuiite katika kazi ya `useEffect` ya kijenzi chetu cha `Minter.js`.

Kama tulivyofanya kwa `connectWallet`, lazima tuingize kazi hii kutoka kwenye faili yetu ya `interact.js` hadi kwenye faili yetu ya `Minter.js` kama ifuatavyo:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //ingiza hapa
} from "./utils/interact.js"
```

Sasa, tunaiita tu katika kazi yetu ya `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Kumbuka, tunatumia jibu la wito wetu kwa `getCurrentWalletConnected` kusasisha vigezo vyetu vya hali vya `walletAddress` na `status`.

Mara tu umeongeza msimbo huu, jaribu kuonyesha upya dirisha la kivinjari chetu. Kitufe kinapaswa kusema kuwa umeunganishwa, na kuonyesha hakikisho la anwani ya pochi yako iliyounganishwa - hata baada ya kuonyesha upya!

### Tekeleza addWalletListener {#implement-add-wallet-listener}

Hatua ya mwisho katika usanidi wa pochi ya mfumo wetu uliotawanywa ni kutekeleza msikilizaji wa pochi ili UI yetu isasishwe wakati hali ya pochi yetu inabadilika, kama vile mtumiaji anapokatisha muunganisho au kubadilisha akaunti.

Katika faili yako ya `Minter.js`, ongeza kazi `addWalletListener` inayoonekana kama ifuatavyo:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Andika ujumbe katika sehemu ya maandishi hapo juu.")
      } else {
        setWallet("")
        setStatus("🦊 Unganisha kwenye MetaMask ukitumia kitufe cha juu kulia.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Lazima usakinishe MetaMask, pochi pepe ya Ethereum, kwenye kivinjari chako.
        </a>
      </p>
    )
  }
}
```

Hebu tuchanganue kwa haraka kile kinachotokea hapa:

- Kwanza, kazi yetu inakagua ikiwa `window.ethereum` imewezeshwa (yaani, MetaMask imesakinishwa).
  - Ikiwa sivyo, tunaweka tu kigezo chetu cha hali cha `status` kuwa mfuatano wa JSX unaomwomba mtumiaji asakinishe MetaMask.
  - Ikiwa imewezeshwa, tunaweka msikilizaji `window.ethereum.on("accountsChanged")` kwenye mstari wa 3 anayesikiliza mabadiliko ya hali katika pochi ya MetaMask, ambayo ni pamoja na wakati mtumiaji anapounganisha akaunti ya ziada kwenye mfumo uliotawanywa, anapobadilisha akaunti, au anapokatisha muunganisho wa akaunti. Ikiwa kuna angalau akaunti moja iliyounganishwa, kigezo cha hali cha `walletAddress` kinasasishwa kama akaunti ya kwanza katika safu ya `accounts` iliyorudishwa na msikilizaji. Vinginevyo, `walletAddress` huwekwa kama mfuatano tupu.

Mwishowe, lazima tuiite katika kazi yetu ya `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Na voilà! Tumekamilisha kupanga utendakazi wote wa pochi yetu! Sasa kwa kuwa pochi yetu imesanidiwa, hebu tujue jinsi ya kuunda NFT yetu!

## Metadata ya NFT 101 {#nft-metadata-101}

Kwa hivyo kumbuka metadata ya NFT tuliyozungumzia katika Hatua ya 0 ya mafunzo haya—inaipa NFT uhai, na kuiruhusu iwe na sifa, kama vile mali ya kidijitali, jina, maelezo, na sifa zingine.

Tutahitaji kusanidi metadata hii kama kitu cha JSON na kuihifadhi, ili tuweze kuipitisha kama kigezo cha `tokenURI` wakati wa kuita kazi ya `mintNFT` ya mkataba wetu erevu.

Maandishi katika sehemu za "Kiungo cha Mali", "Jina", "Maelezo" yatajumuisha sifa tofauti za metadata ya NFT yetu. Tutaumbiza metadata hii kama kitu cha JSON, lakini kuna chaguzi kadhaa za mahali tunaweza kuhifadhi kitu hiki cha JSON:

- Tunaweza kuihifadhi kwenye mnyororo wa bloku wa Ethereum; hata hivyo, kufanya hivyo kungegharimu sana.
- Tunaweza kuihifadhi kwenye seva ya kati, kama AWS au Firebase. Lakini hiyo ingepinga ethos yetu ya ugatuzi.
- Tunaweza kutumia IPFS, itifaki iliyogatuliwa na mtandao wa rika-kwa-rika wa kuhifadhi na kushiriki data katika mfumo wa faili uliosambazwa. Kwa kuwa itifaki hii imegatuliwa na ni ya bure, ndiyo chaguo letu bora!

Ili kuhifadhi metadata yetu kwenye IPFS, tutatumia [Pinata](https://pinata.cloud/), API na zana rahisi ya IPFS. Katika hatua inayofuata, tutaelezea hasa jinsi ya kufanya hivi!

## Tumia Pinata kubandika metadata yako kwenye IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Ikiwa huna akaunti ya [Pinata](https://pinata.cloud/), jisajili kwa akaunti ya bure [hapa](https://app.pinata.cloud/auth/signup) na ukamilishe hatua za kuthibitisha barua pepe na akaunti yako.

### Tengeneza ufunguo wako wa API wa Pinata {#create-pinata-api-key}

Nenda kwenye ukurasa wa [https://pinata.cloud/keys](https://pinata.cloud/keys), kisha chagua kitufe cha "Ufunguo Mpya" juu, weka wijeti ya Msimamizi kama imewezeshwa, na upe ufunguo wako jina.

Kisha utaonyeshwa ibukizi na maelezo yako ya API. Hakikisha unaiweka mahali salama.

Sasa kwa kuwa ufunguo wetu umesanidiwa, hebu tuuongeze kwenye mradi wetu ili tuweze kuutumia.

### Unda faili ya .env {#create-a-env}

Tunaweza kuhifadhi ufunguo na siri yetu ya Pinata kwa usalama katika faili ya mazingira. Hebu tusakinishe [kifurushi cha dotenv](https://www.npmjs.com/package/dotenv) katika saraka ya mradi wako.

Fungua kichupo kipya kwenye terminal yako (tofauti na ile inayoendesha local host) na hakikisha uko kwenye folda ya `minter-starter-files`, kisha endesha amri ifuatayo kwenye terminal yako:

```text
npm install dotenv --save
```

Kisha, tengeneza faili ya `.env` kwenye saraka ya mizizi ya `minter-starter-files` yako kwa kuingiza yafuatayo kwenye mstari wako wa amri:

```javascript
vim.env
```

Hii itafungua faili yako ya `.env` kwenye vim (kihariri cha maandishi). Ili kuihifadhi, bonyeza "esc" + ":" + "q" kwenye kibodi yako kwa mpangilio huo.

Kisha, katika VSCode, nenda kwenye faili yako ya `.env` na uongeze ufunguo wako wa API wa Pinata na siri ya API kwake, kama ifuatavyo:

```text
REACT_APP_PINATA_KEY = <ufunguo-wa-api-wa-pinata>
REACT_APP_PINATA_SECRET = <siri-ya-api-ya-pinata>
```

Hifadhi faili, na kisha uko tayari kuanza kuandika kazi ya kupakia metadata yako ya JSON kwenye IPFS!

### Tekeleza pinJSONToIPFS {#pin-json-to-ipfs}

Kwa bahati nzuri kwetu, Pinata ina [API mahususi ya kupakia data ya JSON kwenye IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) na mfano rahisi wa JavaScript na axios ambao tunaweza kutumia, pamoja na marekebisho madogo.

Katika folda yako ya `utils`, hebu tuunde faili nyingine inayoitwa `pinata.js` na kisha tuingize siri na ufunguo wetu wa Pinata kutoka kwenye faili ya .env kama ifuatavyo:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Kisha, bandika msimbo wa ziada kutoka chini hadi kwenye faili yako ya `pinata.js`. Usijali, tutachanganua maana ya kila kitu!

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

Kwa hivyo msimbo huu unafanya nini hasa?

Kwanza, inaingiza [axios](https://www.npmjs.com/package/axios), mteja wa HTTP anayetegemea ahadi kwa kivinjari na node.js, ambayo tutatumia kufanya ombi kwa Pinata.

Kisha tuna kazi yetu isiyolingana ya `pinJSONToIPFS`, ambayo inachukua `JSONBody` kama ingizo lake na ufunguo wa api wa Pinata na siri katika kichwa chake, yote kufanya ombi la POST kwa API yao ya `pinJSONToIPFS`.

- Ikiwa ombi hili la POST litafanikiwa, basi kazi yetu inarudisha kitu cha JSON na boolean ya `success` kama kweli na `pinataUrl` ambapo metadata yetu ilibandikwa. Tutatumia `pinataUrl` hii iliyorudishwa kama ingizo la `tokenURI` kwa kazi ya uundaji ya mkataba wetu erevu.
- Ikiwa chapisho hili litashindwa, basi kazi yetu inarudisha kitu cha JSON na boolean ya `success` kama uongo na mfuatano wa `message` unaoeleza kosa letu.

Kama ilivyo kwa aina zetu za kurudi za kazi ya `connectWallet`, tunarudisha vitu vya JSON ili tuweze kutumia vigezo vyao kusasisha vigeu vyetu vya hali na UI.

## Pakia mkataba wako erevu {#load-your-smart-contract}

Sasa kwa kuwa tuna njia ya kupakia metadata yetu ya NFT kwenye IPFS kupitia kazi yetu ya `pinJSONToIPFS`, tutahitaji njia ya kupakia mfano wa mkataba wetu erevu ili tuweze kuita kazi yake ya `mintNFT`.

Kama tulivyotaja awali, katika mafunzo haya tutatumia [mkataba erevu uliopo wa NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); hata hivyo, ikiwa ungependa kujifunza jinsi tulivyoiunda, au kuunda moja wewe mwenyewe, tunapendekeza sana uangalie mafunzo yetu mengine, ["Jinsi ya Kuunda NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI ya mkataba {#contract-abi}

Ikiwa umechunguza faili zetu kwa karibu, utakuwa umegundua kuwa katika saraka yetu ya `src`, kuna faili ya `contract-abi.json`. ABI ni muhimu kwa kubainisha kazi ipi mkataba utaomba na pia kuhakikisha kuwa kazi hiyo itarudisha data katika umbizo unalotarajia.

Pia tutahitaji ufunguo wa API wa Alchemy na API ya Alchemy Web3 ili kuunganisha kwenye mnyororo wa bloku wa Ethereum na kupakia mkataba wetu erevu.

### Tengeneza ufunguo wako wa API wa Alchemy {#create-alchemy-api}

Ikiwa bado huna akaunti ya Alchemy, [jisajili bila malipo hapa.](https://alchemy.com/?a=eth-org-nft-minter)

Mara tu unapounda akaunti ya Alchemy, unaweza kutengeneza ufunguo wa API kwa kuunda programu. Hii itaturuhusu kufanya maombi kwa mtandao wa majaribio wa Ropsten.

Nenda kwenye ukurasa wa "Tengeneza Programu" kwenye Dashibodi yako ya Alchemy kwa kuelea juu ya "Programu" kwenye upau wa kusogeza na kubofya "Tengeneza Programu".

Ipe programu yako jina, tulichagua "NFT Yangu ya Kwanza!", toa maelezo mafupi, chagua "Staging" kwa Mazingira yanayotumika kwa uwekaji hesabu wa programu yako, na uchague "Ropsten" kwa mtandao wako.

Bofya “Unda programu” na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye jedwali lililo hapa chini.

Safi sana, sasa kwa kuwa tumeunda URL yetu ya API ya HTTP Alchemy, inakili kwenye ubao wako wa kunakili...

…na kisha tuiongeze kwenye faili yetu ya `.env`. Kwa pamoja, faili yako ya .env inapaswa kuonekana hivi:

```text
REACT_APP_PINATA_KEY = <ufunguo-wa-pinata>
REACT_APP_PINATA_SECRET = <siri-ya-pinata>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<ufunguo-wa-alchemy>
```

Sasa kwa kuwa tuna ABI ya mkataba wetu na ufunguo wetu wa API wa Alchemy, tuko tayari kupakia mkataba wetu erevu kwa kutumia [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Sanidi sehemu yako ya mwisho ya Alchemy Web3 na mkataba {#setup-alchemy-endpoint}

Kwanza, ikiwa bado huna, utahitaji kusakinisha [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kwa kwenda kwenye saraka ya nyumbani: `nft-minter-tutorial` kwenye terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Kisha turudi kwenye faili yetu ya `interact.js`. Juu ya faili, ongeza msimbo ufuatao ili kuingiza ufunguo wako wa Alchemy kutoka kwenye faili yako ya .env na kusanidi sehemu yako ya mwisho ya Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ni kifuniko karibu na [Web3.js](https://docs.web3js.org/), inayotoa mbinu za API zilizoboreshwa na manufaa mengine muhimu ili kurahisisha maisha yako kama msanidi programu wa web3. Imeundwa kuhitaji usanidi mdogo ili uweze kuanza kuitumia katika programu yako mara moja!

Kisha, hebu tuongeze ABI ya mkataba wetu na anwani ya mkataba kwenye faili yetu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Mara tu tunapokuwa na zote mbili, tuko tayari kuanza kuandika kazi yetu ya uundaji!

## Tekeleza kazi ya mintNFT {#implement-the-mintnft-function}

Ndani ya faili yako ya `interact.js`, hebu tufafanue kazi yetu, `mintNFT`, ambayo itaunda NFT yetu.

Kwa sababu tutakuwa tukifanya simu nyingi zisizolingana (kwa Pinata kubandika metadata yetu kwenye IPFS, Alchemy Web3 kupakia mkataba wetu erevu, na MetaMask kusaini miamala yetu), kazi yetu pia itakuwa isiyolingana.

Maingizo matatu kwa kazi yetu yatakuwa `url` ya mali yetu ya kidijitali, `name`, na `description`. Ongeza saini ifuatayo ya kazi chini ya kazi ya `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Ushughulikiaji wa hitilafu ya ingizo {#input-error-handling}

Kwa kawaida, inaleta maana kuwa na aina fulani ya ushughulikiaji wa hitilafu ya ingizo mwanzoni mwa kazi, ili tuondoke kwenye kazi hii ikiwa vigezo vyetu vya ingizo si sahihi. Ndani ya kazi yetu, hebu tuongeze msimbo ufuatao:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa hitilafu
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Tafadhali hakikisha sehemu zote zimekamilika kabla ya kuunda.",
    }
  }
}
```

Kimsingi, ikiwa kigezo chochote cha ingizo ni mfuatano tupu, basi tunarudisha kitu cha JSON ambapo boolean ya `success` ni uongo, na mfuatano wa `status` unaeleza kuwa sehemu zote katika UI yetu lazima zikamilike.

### Pakia metadata kwenye IPFS {#upload-metadata-to-ipfs}

Mara tu tunapojua metadata yetu imeumbizwa ipasavyo, hatua inayofuata ni kuifunga katika kitu cha JSON na kuipakia kwenye IPFS kupitia `pinJSONToIPFS` tuliyoiandika!

Ili kufanya hivyo, kwanza tunahitaji kuingiza kazi ya `pinJSONToIPFS` kwenye faili yetu ya `interact.js`. Juu kabisa ya `interact.js`, hebu tuongeze:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Kumbuka kwamba `pinJSONToIPFS` inachukua mwili wa JSON. Kwa hivyo kabla ya kuifanyia wito, tutahitaji kuumbiza vigezo vyetu vya `url`, `name`, na `description` kuwa kitu cha JSON.

Hebu tusasishe msimbo wetu ili kuunda kitu cha JSON kinachoitwa `metadata` na kisha kufanya wito kwa `pinJSONToIPFS` na kigezo hiki cha `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa hitilafu
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Tafadhali hakikisha sehemu zote zimekamilika kabla ya kuunda.",
    }
  }

  //tengeneza metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //fanya wito wa pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Kitu kiliharibika wakati wa kupakia tokenURI yako.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Kumbuka, tunahifadhi jibu la wito wetu kwa `pinJSONToIPFS(metadata)` katika kitu cha `pinataResponse`. Kisha, tunachanganua kitu hiki kwa makosa yoyote.

Ikiwa kuna hitilafu, tunarudisha kitu cha JSON ambapo boolean ya `success` ni uongo na mfuatano wetu wa `status` unaeleza kuwa wito wetu umeshindwa. Vinginevyo, tunatoa `pinataURL` kutoka kwa `pinataResponse` na kuihifadhi kama kigezo chetu cha `tokenURI`.

Sasa ni wakati wa kupakia mkataba wetu erevu kwa kutumia API ya Alchemy Web3 ambayo tuliianzisha juu ya faili yetu. Ongeza mstari ufuatao wa msimbo chini ya kazi ya `mintNFT` ili kuweka mkataba kwenye kigezo cha kimataifa cha `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Jambo la mwisho la kuongeza katika kazi yetu ya `mintNFT` ni muamala wetu wa Ethereum:

```javascript
//weka muamala wako wa Ethereum
const transactionParameters = {
  to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
  from: window.ethereum.selectedAddress, // lazima ifanane na anwani amilifu ya mtumiaji.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //fanya wito kwa mkataba erevu wa NFT
}

//tia saini muamala kupitia MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Angalia muamala wako kwenye Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Kitu kiliharibika: " + error.message,
  }
}
```

Ikiwa tayari unafahamu miamala ya Ethereum, utagundua kuwa muundo unafanana sana na ule uliouona.

- Kwanza, tunaweka vigezo vyetu vya miamala.
  - `to` inabainisha anwani ya mpokeaji (mkataba wetu erevu)
  - `from` inabainisha mtia saini wa muamala (anwani iliyounganishwa ya mtumiaji kwenye MetaMask: `window.ethereum.selectedAddress`)
  - `data` ina wito kwa mbinu yetu ya `mintNFT` ya mkataba erevu, ambayo inapokea `tokenURI` yetu na anwani ya pochi ya mtumiaji, `window.ethereum.selectedAddress`, kama maingizo
- Kisha, tunafanya wito wa kusubiri, `window.ethereum.request,` ambapo tunaiomba MetaMask isaini muamala. Kumbuka, katika ombi hili, tunabainisha mbinu yetu ya eth (eth_SentTransaction) na kupitisha vigezo vyetu vya `transactionParameters`. Katika hatua hii, MetaMask itafunguka kwenye kivinjari, na kumwomba mtumiaji asaini au kukataa muamala.
  - Ikiwa muamala utafanikiwa, kazi hiyo itarudisha kitu cha JSON ambapo boolean `success` imewekwa kuwa kweli na mfuatano wa `status` unamwomba mtumiaji aangalie Etherscan kwa maelezo zaidi kuhusu muamala wao.
  - Ikiwa muamala utashindwa, kazi hiyo itarudisha kitu cha JSON ambapo boolean `success` imewekwa kuwa uongo, na mfuatano wa `status` unaeleza ujumbe wa hitilafu.

Kwa pamoja, kazi yetu ya `mintNFT` inapaswa kuonekana hivi:

```javascript
export const mintNFT = async (url, name, description) => {
  //ushughulikiaji wa hitilafu
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Tafadhali hakikisha sehemu zote zimekamilika kabla ya kuunda.",
    }
  }

  //tengeneza metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //ombi la kubandika la pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Kitu kiliharibika wakati wa kupakia tokenURI yako.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //pakia mkataba erevu
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //weka muamala wako wa Ethereum
  const transactionParameters = {
    to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
    from: window.ethereum.selectedAddress, // lazima ifanane na anwani amilifu ya mtumiaji.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //fanya wito kwa mkataba erevu wa NFT
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
        "✅ Angalia muamala wako kwenye Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Kitu kiliharibika: " + error.message,
    }
  }
}
```

Hiyo ni kazi kubwa sana! Sasa, tunahitaji tu kuunganisha kazi yetu ya `mintNFT` kwenye kijenzi chetu cha `Minter.js`...

## Unganisha mintNFT kwenye frontend yetu ya Minter.js {#connect-our-frontend}

Fungua faili yako ya `Minter.js` na usasishe mstari wa `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` juu ili uwe:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Mwishowe, tekeleza kazi ya `onMintPressed` ili kufanya wito wa kusubiri kwa kazi yako iliyoingizwa ya `mintNFT` na usasishe kigezo cha hali cha `status` ili kuonyesha kama muamala wetu ulifanikiwa au ulishindwa:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Sambaza NFT yako kwenye tovuti ya moja kwa moja {#deploy-your-NFT}

Uko tayari kupeleka mradi wako moja kwa moja ili watumiaji waingiliane nao? Angalia [mafunzo haya](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) kwa ajili ya kusambaza Minter yako kwenye tovuti ya moja kwa moja.

Hatua moja ya mwisho...

## Tikisa ulimwengu wa mnyororo wa bloku {#take-the-blockchain-world-by-storm}

Utani tu, umefika mwisho wa mafunzo!

Kwa muhtasari, kwa kuunda muunda wa NFT, umefanikiwa kujifunza jinsi ya:

- Unganisha kwenye MetaMask kupitia mradi wako wa frontend
- Ita mbinu za mkataba erevu kutoka kwa frontend yako
- Saini miamala kwa kutumia MetaMask

Labda, ungependa kuweza kuonyesha NFT zilizoundwa kupitia mfumo wako uliotawanywa kwenye pochi yako — kwa hivyo hakikisha unaangalia mafunzo yetu ya haraka [Jinsi ya Kuona NFT Yako Kwenye Pochi Yako](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

Na, kama kawaida, ikiwa una maswali yoyote, tuko hapa kusaidia katika [Alchemy Discord](https://discord.gg/gWuC7zB). Hatuwezi kusubiri kuona jinsi utakavyotumia dhana kutoka kwa mafunzo haya kwenye miradi yako ya baadaye!
