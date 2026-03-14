---
title: "Kutengeneza kiolesura cha mtumiaji kwa ajili ya mkataba wako"
description: Kwa kutumia vipengele vya kisasa kama vile TypeScript, React, Vite, na Wagmi, tutapitia kiolesura cha kisasa, lakini kidogo, cha mtumiaji na kujifunza jinsi ya kuunganisha mkoba kwenye kiolesura cha mtumiaji, kupiga simu mkataba-erevu ili kusoma habari, kutuma muamala kwenye mkataba-erevu, na kufuatilia matukio kutoka kwenye mkataba-erevu ili kubaini mabadiliko.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: sw
sidebarDepth: 3
---

Umepata kipengele tunachohitaji katika mfumo ikolojia wa Ethereum. Uliandika mikataba-erevu ili kuitekeleza, na labda hata msimbo fulani unaohusiana unaoendeshwa nje ya mnyororo. Hii ni nzuri! Kwa bahati mbaya, bila kiolesura cha mtumiaji hutapata watumiaji wowote, na mara ya mwisho ulipoandika tovuti watu walitumia modemu za kupiga simu na JavaScript ilikuwa mpya.

Makala hii ni kwa ajili yako. Nadhani unajua programu, na labda kidogo ya JavaScript na HTML, lakini ujuzi wako wa kiolesura cha mtumiaji umeshuka na umepitwa na wakati. Kwa pamoja tutapitia programu rahisi ya kisasa ili uone jinsi inavyofanywa siku hizi.

## Kwa nini hii ni muhimu {#why-important}

Kinadharia, unaweza tu kuwa na watu wanaotumia [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) au [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) kuingiliana na mikataba yako. Hiyo itakuwa nzuri kwa WanaEthereum wenye uzoefu. Lakini tunajaribu kuwahudumia [watu wengine bilioni moja](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Hili halitatokea bila uzoefu mzuri wa mtumiaji, na kiolesura rafiki cha mtumiaji ni sehemu kubwa ya hiyo.

## Programu ya Greeter {#greeter-app}

Kuna nadharia nyingi nyuma ya jinsi UI ya kisasa inavyofanya kazi, na [tovuti nyingi nzuri](https://react.dev/learn/thinking-in-react) [zinazoelezea](https://wagmi.sh/core/getting-started). Badala ya kurudia kazi nzuri iliyofanywa na tovuti hizo, nitachukulia unapendelea kujifunza kwa kufanya na kuanza na programu unayoweza kucheza nayo. Bado unahitaji nadharia ili kufanikisha mambo, na tutaifikia - tutapitia faili chanzo kwa faili chanzo, na kujadili mambo tunapoyafikia.

### Usakinishaji {#installation}

1. Ikibidi, ongeza [blockchain ya Holesky](https://chainlist.org/?search=holesky&testnets=true) kwenye mkoba wako na [pata ETH ya majaribio](https://www.holeskyfaucet.io/).

2. Fanya clone ya hazina ya github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Sakinisha vifurushi vinavyohitajika.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Anzisha programu.

   ```sh
   pnpm dev
   ```

5. Vinjari hadi kwenye URL inayoonyeshwa na programu. Katika hali nyingi, hiyo ni [http://localhost:5173/](http://localhost:5173/).

6. Unaweza kuona msimbo chanzo wa mkataba, toleo lililobadilishwa kidogo la Greeter ya Hardhat, [kwenye kichunguzi cha blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Mapitio ya faili {#file-walk-through}

#### `index.html` {#index-html}

Faili hii ni kiolezo cha kawaida cha HTML isipokuwa kwa mstari huu, unaoingiza faili ya hati.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Kiendelezi cha faili kinatuambia kuwa faili hii ni [kipengele cha React](https://www.w3schools.com/react/react_components.asp) kilichoandikwa kwa [TypeScript](https://www.typescriptlang.org/), kiendelezi cha JavaScript kinachosaidia [ukaguzi wa aina](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript inakusanywa kuwa JavaScript, kwa hivyo tunaweza kuitumia kwa utekelezaji upande wa mteja.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Ingiza msimbo wa maktaba tunaouhitaji.

```tsx
import { App } from './App'
```

Ingiza kipengele cha React kinachotekeleza programu (tazama hapa chini).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Tengeneza kipengele cha msingi cha React. Kigezo cha `render` ni [JSX](https://www.w3schools.com/react/react_jsx.asp), lugha ya kiendelezi inayotumia HTML na JavaScript/TypeScript. Alama ya mshangao hapa inakiambia kipengele cha TypeScript: "hujui kama `document.getElementById('root')` itakuwa kigezo halali kwa `ReactDOM.createRoot`, lakini usijali - mimi ni msanidi programu na ninakuambia itakuwa hivyo".

```tsx
  <React.StrictMode>
```

Programu inaingia ndani ya [kipengele cha `React.StrictMode`](https://react.dev/reference/react/StrictMode). Kipengele hiki kinaambia maktaba ya React kuingiza ukaguzi wa ziada wa utatuzi, ambao ni muhimu wakati wa usanidi.

```tsx
    <WagmiConfig config={config}>
```

Programu pia iko ndani ya [kipengele cha `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Maktaba ya wagmi (we are going to make it)](https://wagmi.sh/) inaunganisha ufafanuzi wa UI wa React na [maktaba ya viem](https://viem.sh/) kwa ajili ya kuandika mfumo uliotawanywa wa Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

Na mwishowe, [kipengele cha `RainbowKitProvider`](https://www.rainbowkit.com/). Kipengele hiki hushughulikia kuingia na mawasiliano kati ya mkoba na programu.

```tsx
        <App />
```

Sasa tunaweza kuwa na kipengele cha programu, ambacho kinatengeneza UI. Ile `/>` mwishoni mwa kipengele inaiambia React kwamba kipengele hiki hakina ufafanuzi wowote ndani yake, kulingana na kiwango cha XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Bila shaka, tunapaswa kufunga vipengele vingine.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Hii ndiyo njia ya kawaida ya kuunda kipengele cha React - fafanua chaguo la kukokotoa ambalo huitwa kila wakati linapohitaji kutolewa. Chaguo hili la kukokotoa kwa kawaida huwa na msimbo fulani wa TypeScript au JavaScript juu, ikifuatiwa na taarifa ya `return` inayorejesha msimbo wa JSX.

```tsx
  const { isConnected } = useAccount()
```

Hapa tunatumia [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) kuangalia kama tumeunganishwa kwenye blockchain kupitia mkoba au la.

Kwa kimkataba, katika chaguo za kukokotoa za React zinazoitwa `use...` ni [hooks](https://www.w3schools.com/react/react_hooks.asp) zinazorejesha aina fulani ya data. Unapotumia ndoano kama hizo, si tu kwamba kipengele chako kinapata data, lakini data hiyo inapobadilika kipengele hutolewa upya na maelezo yaliyosasishwa.

```tsx
  return (
    <>
```

JSX ya kipengele cha React _lazima_ irudishe kipengele kimoja. Tunapokuwa na vipengele vingi na hatuna chochote kinachomaliza "kawaida" tunatumia kipengele tupu (`<> ...` </>) ili kuzifanya kuwa sehemu moja.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Tunapata [kipengele cha `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) kutoka kwa RainbowKit. Wakati hatujaunganishwa, inatupa kitufe cha `Connect Wallet` ambacho hufungua modali inayoelezea pochi na kukuruhusu kuchagua ni ipi unayotumia. Tunapounganishwa, inaonyesha blockchain tunayotumia, anwani ya akaunti yetu, na salio letu la ETH. Tunaweza kutumia maonyesho haya kubadili mtandao au kukata muunganisho.

```tsx
      {isConnected && (
```

Tunapohitaji kuingiza JavaScript halisi (au TypeScript ambayo itakusanywa kwa JavaScript) kwenye JSX, tunatumia mabano (`{}`).

Sintaksia `a && b` ni fupi kwa [`a ? b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Yaani, ikiwa `a` ni kweli inatathmini kuwa `b` na vinginevyo inatathmini `a` (ambayo inaweza kuwa `false`, `0`, n.k). Hii ni njia rahisi ya kuiambia React kwamba kipengele kinapaswa kuonyeshwa tu ikiwa sharti fulani limetimizwa.

Katika hali hii, tunataka tu kumwonyesha mtumiaji `Greeter` ikiwa mtumiaji ameunganishwa kwenye blockchain.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Faili hii ina utendakazi mwingi wa UI. Inajumuisha ufafanuzi ambao kwa kawaida ungekuwa katika faili nyingi, lakini kwa kuwa hii ni mafunzo, programu imeboreshwa ili iwe rahisi kuelewa kwa mara ya kwanza, badala ya utendakazi au urahisi wa matengenezo.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Tunatumia vitendaji hivi vya maktaba. Tena, zimeelezwa hapa chini zinapotumiwa.

```tsx
import { AddressType } from 'abitype'
```

[Maktaba ya `abitype`](https://abitype.dev/) inatupa ufafanuzi wa TypeScript kwa aina mbalimbali za data za Ethereum, kama vile [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI kwa mkataba wa `Greeter`.
Ikiwa unasanidi mikataba na UI kwa wakati mmoja, kwa kawaida unaweza kuziweka katika hazina moja na kutumia ABI iliyotolewa na mkusanyaji wa Solidity kama faili katika programu yako. Hata hivyo, hii si lazima hapa kwa sababu mkataba tayari umesanidiwa na hautabadilika.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript imeandikwa kwa nguvu. Tunatumia ufafanuzi huu kubainisha anwani ambamo mkataba wa `Greeter` umetumwa kwenye minyororo tofauti. Ufunguo ni nambari (chainId), na thamani ni `AddressType` (anwani).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Anwani ya mkataba kwenye mitandao miwili inayotumika: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) na [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Kumbuka: Kwa kweli kuna ufafanuzi wa tatu, kwa Redstone Holesky, utaelezwa hapa chini.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Aina hii hutumiwa kama kigezo kwa sehemu ya `ShowObject` (iliyoelezwa baadaye). Inajumuisha jina la kitu na thamani yake, ambayo huonyeshwa kwa madhumuni ya utatuzi.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

Wakati wowote tunaweza kujua salamu ni nini (kwa sababu tuliisoma kutoka kwa blockchain) au hatujui (kwa sababu bado hatujaipokea). Kwa hivyo ni muhimu kuwa na aina ambayo inaweza kuwa mfuatano au chochote.

##### Kipengele cha `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Hatimaye, tunapata kufafanua kipengele.

```tsx
  const { chain } = useNetwork()
```

Taarifa kuhusu msururu tunaotumia, kwa hisani ya [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Kwa sababu hii ni ndoano (`use...`), kila wakati habari hii inapobadilika sehemu hiyo huchorwa upya.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Anwani ya mkataba wa Greeter, ambayo hutofautiana kulingana na mnyororo (na ambayo ni `undefined` ikiwa hatuna maelezo ya mnyororo au tuko kwenye mnyororo bila mkataba huo).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[Ndoano ya `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) inasoma habari kutoka kwa mkataba. Unaweza kuona hasa ni taarifa gani inarejesha panua `readResults` katika UI. Katika kesi hii tunataka iendelee kutafuta ili tujulishwe salamu itakapobadilika.

**Kumbuka:** Tunaweza kusikiliza [matukio ya `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) ili kujua salamu inapobadilika na kusasisha kwa njia hiyo. Hata hivyo, ingawa inaweza kuwa na ufanisi zaidi, haitatumika katika hali zote. Mtumiaji anapobadilisha hadi msururu tofauti, salamu pia hubadilika, lakini mabadiliko hayo hayaambatani na tukio. Tunaweza kuwa na sehemu moja ya msimbo inayosikiliza matukio na nyingine ya kutambua mabadiliko ya msururu, lakini hilo lingekuwa gumu zaidi kuliko kuweka tu [kigezo cha `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Ndoano ya `useState` ya React](https://www.w3schools.com/react/react_usestate.asp) inaturuhusu kubainisha tofauti ya hali, ambayo thamani yake hudumu kutoka uwasilishaji mmoja wa sehemu hadi nyingine. Thamani ya awali ni kigezo, katika kesi hii mfuatano tupu.

Ndoano ya `useState` inarudisha orodha yenye thamani mbili:

1. Thamani ya sasa ya tofauti ya hali.
2. Chaguo la kukokotoa la kurekebisha tofauti ya hali inapohitajika. Kwa kuwa hii ni ndoano, kila wakati inapoitwa sehemu hutolewa tena.

Katika kesi hii, tunatumia tofauti ya hali kwa salamu mpya ambayo mtumiaji anataka kuweka.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Hiki ndicho kishughulikia tukio wakati sehemu mpya ya kuingiza salamu inapobadilika. Aina, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), inabainisha kuwa huyu ni mshughulikiaji wa mabadiliko ya thamani ya kipengele cha ingizo cha HTML. Sehemu ya `<HTMLInputElement>` inatumika kwa sababu hii ni [aina ya jumla](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Huu ndio mchakato wa kuwasilisha muamala wa blockchain kutoka kwa mtazamo wa mteja:

1. Tuma muamala kwa nodi katika blockchain kwa kutumia [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Subiri jibu kutoka kwa nodi.
3. Jibu linapopokewa, mwombe mtumiaji asaini muamala kupitia mkoba. Hatua hii _lazima_ itokee baada ya jibu la nodi kupokelewa kwa sababu mtumiaji anaonyeshwa gharama ya gesi ya muamala kabla ya kuusaini.
4. Subiri mtumiaji akubali.
5. Tuma muamala tena, wakati huu ukitumia [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Hatua ya 2 inaweza kuchukua muda unaoonekana, ambapo watumiaji wangeshangaa kama amri yao ilipokelewa na kiolesura cha mtumiaji na kwa nini hawaombwi kutia saini muamala tayari. Hiyo inafanya uzoefu mbaya wa mtumiaji (UX).

Suluhisho ni kutumia [ndoano za kuandaa](https://wagmi.sh/react/prepare-hooks). Kila wakati kigezo kinapobadilika, tuma ombi la `eth_estimateGas` kwa nodi mara moja. Kisha, mtumiaji anapotaka kutuma muamala (katika kesi hii kwa kubonyeza **Sasisha salamu**), gharama ya gesi inajulikana na mtumiaji anaweza kuona ukurasa wa mkoba mara moja.

```tsx
  return (
```

Sasa hatimaye tunaweza kuunda HTML halisi ya kurudisha.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Unda sehemu ya `ShowGreeting` (iliyoelezwa hapa chini), lakini tu ikiwa salamu ilisomwa kwa mafanikio kutoka kwa blockchain.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Hiki ndicho sehemu ya maandishi ya kuingiza ambapo mtumiaji anaweza kuweka salamu mpya. Kila wakati mtumiaji anapobonyeza kitufe, tunaita `greetingChange` ambayo huita `setNewGreeting`. Kwa vile `setNewGreeting` inatoka kwa `useState` ndoano, inasababisha `Greeter` sehemu kutolewa tena. Hii inamaanisha kuwa:

- Tunahitaji kubainisha `value` ili kuweka thamani ya salamu mpya, kwa sababu vinginevyo ingerejea kuwa chaguo-msingi, mfuatano tupu.
- `usePrepareContractWrite` inaitwa kila wakati `newGreeting` inapobadilika, ambayo ina maana kwamba daima itakuwa na `newGreeting` ya hivi karibuni zaidi katika muamala ulioandaliwa.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Sasisha salamu
      </button>
```

Ikiwa hakuna `workingTx.write` basi bado tunasubiri maelezo muhimu kwa kutuma sasisho la salamu, kwa hivyo kitufe kimezimwa. Ikiwa kuna thamani ya `workingTx.write` basi hiyo ndiyo kazi ya kuita ili kutuma muamala.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Mwishowe, kukusaidia kuona tunachofanya, onyesha vitu vitatu tunavyotumia:

- `readResults`
- `preparedTx`
- `workingTx`

##### Kipengele cha `ShowGreeting` {#showgreeting-component}

Sehemu hii inaonyesha

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Chaguo la kukokotoa la sehemu hupokea kigezo chenye sifa zote za sehemu.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Kipengele cha `ShowObject` {#showobject-component}

Kwa madhumuni ya habari, tunatumia `ShowObject` sehemu kuonyesha vitu muhimu (`readResults` kwa kusoma salamu na `preparedTx` na `workingTx` kwa miamala tunayounda).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Hatutaki kubandika UI na habari zote, kwa hivyo ili iwezekane kuzitazama au kuzifunga, tunatumia lebo ya [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Sehemu nyingi huonyeshwa kwa kutumia [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

Isipokuwa ni vitendaji, ambavyo si sehemu ya [kiwango cha JSON](https://www.json.org/json-en.html), kwa hivyo lazima zionyeshwe kando.

```tsx
          {funs.map((f, i) =>
```

Ndani ya JSX, msimbo ndani ya `{` mabano ya curly `}` hutafsiriwa kama JavaScript. Kisha, msimbo ndani ya `(` mabano ya kawaida `)`, hutafsiriwa tena kama JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React inahitaji lebo katika [DOM Tree](https://www.w3schools.com/js/js_htmldom.asp) ili kuwa na vitambulisho tofauti. Hii inamaanisha kuwa watoto wa lebo moja (katika kesi hii, [orodha isiyopangwa](https://www.w3schools.com/tags/tag_ul.asp)), wanahitaji sifa tofauti za `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Maliza lebo mbalimbali za HTML.

##### Uuzaji wa mwisho {#the-final-export}

```tsx
export { Greeter }
```

Kipengele cha `Greeter` ndicho tunachohitaji kuhamisha kwa ajili ya programu.

#### `src/wagmi.ts` {#wagmi-ts}

Hatimaye, ufafanuzi mbalimbali unaohusiana na WAGMI uko katika `src/wagmi.ts`. Sitaeleza kila kitu hapa, kwa sababu sehemu kubwa yake ni kiolezo ambacho huenda huhitaji kubadilisha.

Msimbo hapa si sawa kabisa na [kwenye github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) kwa sababu baadaye katika makala tunaongeza mnyororo mwingine ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Ingiza blockchains ambazo programu inasaidia. Unaweza kuona orodha ya minyororo inayotumika [kwenye github ya viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Ili uweze kutumia [WalletConnect](https://walletconnect.com/) unahitaji kitambulisho cha mradi kwa ajili ya programu yako. Unaweza kuipata [kwenye cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Kuongeza blockchain nyingine {#add-blockchain}

Siku hizi kuna suluhisho nyingi za [uongezaji wa L2](/layer-2/), na unaweza kutaka kusaidia baadhi ambazo viem bado haizisaidii. Ili kuifanya, unarekebisha `src/wagmi.ts`. Maagizo haya yanaelezea jinsi ya kuongeza [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Ingiza aina ya `defineChain` kutoka kwa viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Ongeza ufafanuzi wa mtandao.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Ongeza mnyororo mpya kwenye simu ya `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Hakikisha kwamba programu inajua anwani ya mikataba yako kwenye mtandao mpya. Katika kesi hii, tunarekebisha `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Hitimisho {#conclusion}

Bila shaka, hujali sana kuhusu kutoa kiolesura cha mtumiaji kwa ajili ya `Greeter`. Unataka kuunda kiolesura cha mtumiaji kwa mikataba yako mwenyewe. Ili kuunda programu yako mwenyewe, fuata hatua hizi:

1. Bainisha kuunda programu ya wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Taja jina la programu.

3. Chagua mfumo wa **React**.

4. Chagua lahaja ya **Vite**.

5. Unaweza [kuongeza kit cha Rainbow](https://www.rainbowkit.com/docs/installation#manual-setup).

Sasa nenda ukafanye mikataba yako itumike kwa ulimwengu wote.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

