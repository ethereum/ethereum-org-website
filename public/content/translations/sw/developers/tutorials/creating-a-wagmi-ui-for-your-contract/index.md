---
title: "Kujenga kiolesura cha mtumiaji kwa ajili ya mkataba wako"
description: Kwa kutumia vijenzi vya kisasa kama vile TypeScript, React, Vite, na Wagmi, tutapitia kiolesura cha mtumiaji cha kisasa, lakini kidogo, na kujifunza jinsi ya kuunganisha mkoba kwenye kiolesura cha mtumiaji, kuita mkataba mahiri ili kusoma taarifa, kutuma muamala kwenye mkataba mahiri, na kufuatilia matukio kutoka kwenye mkataba mahiri ili kutambua mabadiliko.
author: Ori Pomerantz
tags:
  - typescript
  - react
  - vite
  - wagmi
  - kiolesura cha mbele
skill: beginner
breadcrumb: Kiolesura cha Mtumiaji (UI) na WAGMI
published: 2023-11-01
lang: sw
sidebarDepth: 3
---

Umepata kipengele tunachohitaji katika mfumo wa ikolojia wa Ethereum. Umeandika mikataba mahiri ili kukitekeleza, na labda hata baadhi ya kodi zinazohusiana zinazoendeshwa nje ya mnyororo. Hili ni jambo zuri! Kwa bahati mbaya, bila kiolesura cha mtumiaji hutakuwa na watumiaji wowote, na mara ya mwisho ulipoandika tovuti watu walitumia modemu za kupiga simu na JavaScript ilikuwa mpya.

Makala haya ni kwa ajili yako. Ninachukulia kuwa unajua upangaji programu, na labda kidogo JavaScript na HTML, lakini ujuzi wako wa kiolesura cha mtumiaji umepitwa na wakati. Pamoja tutapitia programu rahisi ya kisasa ili uone jinsi inavyofanywa siku hizi.

## Kwa nini hii ni muhimu {#why-important}

Kinadharia, unaweza tu kuwafanya watu watumie [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) au [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) ili kuingiliana na mikataba yako. Hiyo ni nzuri kwa Waethereans wenye uzoefu. Lakini tunajaribu kuhudumia [watu wengine bilioni moja](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Hili halitafanyika bila uzoefu mzuri wa mtumiaji, na kiolesura rafiki cha mtumiaji ni sehemu kubwa ya hilo.

## Programu ya Greeter {#greeter-app}

Kuna nadharia nyingi nyuma ya jinsi UI ya kisasa inavyofanya kazi, na [tovuti nyingi nzuri](https://react.dev/learn/thinking-in-react) [zinazoelezea hilo](https://wagmi.sh/core/getting-started). Badala ya kurudia kazi nzuri iliyofanywa na tovuti hizo, nitachukulia kuwa unapendelea kujifunza kwa kufanya na kuanza na programu unayoweza kucheza nayo. Bado unahitaji nadharia ili kufanya mambo, na tutaifikia - tutaenda tu faili la chanzo kwa faili la chanzo, na kujadili mambo tunapoyafikia.

### Usakinishaji {#installation}

1. Programu inatumia mtandao wa majaribio wa [Sepolia](https://sepolia.dev/). Ikiwa ni lazima, [pata ETH ya majaribio ya Sepolia](/developers/docs/networks/#sepolia) na [uongeze Sepolia kwenye mkoba wako](https://chainlist.org/chain/11155111).

2. Nakili hazina ya GitHub na usakinishe vifurushi vinavyohitajika.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Programu inatumia vituo vya ufikiaji vya bure, ambavyo vina mapungufu ya utendaji. Ikiwa unataka kutumia mtoa huduma wa [Nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/), badilisha URL katika [`src/wagmi.ts`](#wagmi-ts).

4. Anzisha programu.

   ```sh
   npm run dev
   ```

5. Vinjari kwenye URL inayoonyeshwa na programu. Katika hali nyingi, hiyo ni [http://localhost:5173/](http://localhost:5173/).

6. Unaweza kuona kodi ya chanzo ya mkataba, toleo lililobadilishwa la Greeter ya Hardhat, [kwenye kichunguzi cha mnyororo wa vitalu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Kupitia faili {#file-walk-through}

#### `index.html` {#index-html}

Faili hili ni kiolezo cha kawaida cha HTML isipokuwa kwa mstari huu, ambao unaingiza faili la hati.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Kiendelezi cha faili kinaonyesha kuwa hiki ni [kijenzi cha React](https://www.w3schools.com/react/react_components.asp) kilichoandikwa katika [TypeScript](https://www.typescriptlang.org/), kiendelezi cha JavaScript kinachounga mkono [ukaguzi wa aina](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript inakusanywa kuwa JavaScript, kwa hivyo tunaweza kuitumia upande wa mteja.

Faili hili linaelezwa zaidi ikiwa una nia. Kawaida hubadilishi faili hili, bali [`src/App.tsx`](#app-tsx) na faili inazoingiza.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Ingiza kodi ya maktaba tunayohitaji.

```tsx
import App from './App.tsx'
```

Ingiza kijenzi cha React kinachotekeleza programu (tazama hapa chini).

```tsx
import { config } from './wagmi.ts'
```

Ingiza usanidi wa [wagmi](https://wagmi.sh/), ambao unajumuisha usanidi wa mnyororo wa vitalu.

```tsx
const queryClient = new QueryClient()
```

Inaunda mfano mpya wa meneja wa kache wa [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Kitu hiki kitahifadhi:

- Wito wa RPC uliowekwa kwenye kache
- Usomaji wa mkataba
- Hali ya kuchukua tena chinichini

Tunahitaji meneja wa kache kwa sababu wagmi v3 inatumia React Query kwa ndani.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Unda kijenzi cha msingi cha React. Kigezo cha `render` ni [JSX](https://www.w3schools.com/react/react_jsx.asp), lugha ya kiendelezi inayotumia HTML na JavaScript/TypeScript. Alama ya mshangao hapa inaiambia kijenzi cha TypeScript: "hujui kwamba `document.getElementById('root')` itakuwa kigezo halali kwa `ReactDOM.createRoot`, lakini usijali - mimi ni msanidi programu na ninakuambia kutakuwa na".

```tsx
  <React.StrictMode>
```

Programu inaingia ndani ya [kijenzi cha `React.StrictMode`](https://react.dev/reference/react/StrictMode). Kijenzi hiki kinaiambia maktaba ya React kuingiza ukaguzi wa ziada wa utatuzi, ambao ni muhimu wakati wa usanidi.

```tsx
    <WagmiProvider config={config}>
```

Programu pia iko ndani ya [kijenzi cha `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Maktaba ya wagmi (tutaifanya)](https://wagmi.sh/) inaunganisha ufafanuzi wa UI wa React na [maktaba ya viem](https://viem.sh/) kwa ajili ya kuandika programu tumizi iliyogatuliwa (dapp) ya Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Na hatimaye, ongeza mtoa huduma wa React Query ili kijenzi chochote cha programu kiweze kutumia hoja zilizowekwa kwenye kache.

```tsx
        <App />
```

Sasa tunaweza kuwa na kijenzi cha programu, ambacho kwa kweli kinatekeleza UI. `/>` mwishoni mwa kijenzi inaiambia React kwamba kijenzi hiki hakina ufafanuzi wowote ndani yake, kulingana na kiwango cha XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Bila shaka, tunapaswa kufunga vijenzi vingine.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Ingiza maktaba tunazohitaji, pamoja na [kijenzi cha `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Kitambulisho cha mnyororo wa Sepolia.

```
function App() {
```

Hii ndiyo njia ya kawaida ya kuunda kijenzi cha React: fafanua chaguo la kukokotoa ambalo linaitwa wakati wowote linapohitaji kutolewa. Chaguo hili la kukokotoa kwa kawaida lina kodi ya TypeScript au JavaScript, ikifuatiwa na taarifa ya `return` inayorudisha kodi ya JSX.

```tsx
  const connection = useConnection()
```

Tumia [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) kupata taarifa zinazohusiana na muunganisho wa sasa, kama vile anwani na `chainId`.

Kwa kawaida, katika React chaguo za kukokotoa zinazoitwa `use...` ni [ndoano (hooks)](https://www.w3schools.com/react/react_hooks.asp). Chaguo hizi za kukokotoa hazirudishi tu data kwenye kijenzi; pia zinahakikisha inatolewa tena (chaguo la kukokotoa la kijenzi linatekelezwa tena, na pato lake linachukua nafasi ya lile la awali katika HTML) wakati data hiyo inabadilika.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Tumia [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) kupata taarifa kuhusu muunganisho wa mkoba.

```tsx
  const { disconnect } = useDisconnect()
```

[Ndoano hii](https://wagmi.sh/react/api/hooks/useDisconnect) inatupa chaguo la kukokotoa la kukata muunganisho kutoka kwenye mkoba.

```tsx
  const { switchChain } = useSwitchChain()
```

[Ndoano hii](https://wagmi.sh/react/api/hooks/useSwitchChain) inaturuhusu kubadili minyororo.

```tsx
  useEffect(() => {
```

Ndoano ya React [`useEffect`](https://react.dev/reference/react/useEffect) inakuruhusu kuendesha chaguo la kukokotoa wakati wowote thamani ya kigezo inabadilika ili kusawazisha mfumo wa nje.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Ikiwa tumeunganishwa, lakini si kwenye mnyororo wa vitalu wa Sepolia, badili kwenda Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Endesha tena chaguo la kukokotoa kila wakati hali ya muunganisho au chainId ya muunganisho inabadilika.

```tsx
  return (
    <>
```

JSX ya kijenzi cha React _lazima_ irudishe kijenzi kimoja cha HTML. Tunapokuwa na vijenzi vingi na hatuhitaji kontena la kuvifunga vyote, tunatumia kijenzi kitupu (`<> ... </>`) kuviunganisha kuwa kijenzi kimoja.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Toa taarifa kuhusu muunganisho wa sasa. Ndani ya JSX, `{<expression>}` inamaanisha kutathmini usemi kama JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Sintaksia `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

Hii ndiyo njia ya kawaida ya kuweka taarifa za if ndani ya JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX inafuata kiwango cha XML, ambacho ni kikali zaidi kuliko HTML. Ikiwa lebo haina lebo ya mwisho inayolingana, _lazima_ iwe na mkwaju (`/`) mwishoni ili kuikomesha.

Hapa tuna lebo mbili kama hizo, `<Greeter />` (ambayo kwa kweli ina kodi ya HTML inayozungumza na mkataba) na [`<hr />` kwa ajili ya mstari wa mlalo](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Ikiwa mtumiaji atabofya kitufe hiki, ita chaguo la kukokotoa la `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Ikiwa _hatujaunganishwa_, onyesha chaguo zinazohitajika ili kuunganisha kwenye mkoba.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

Katika `connectors` tuna orodha ya viunganishi. Tunatumia [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kuigeuza kuwa orodha ya vitufe vya JSX vya kuonyesha.

```tsx
            <button
              key={connector.uid}
```

Katika JSX ni lazima kwa lebo "ndugu" (lebo zinazotoka kwa mzazi mmoja) kuwa na vitambulisho tofauti.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Vitufe vya kiunganishi.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Toa taarifa za ziada. Sintaksia ya usemi `<variable>?.<field>` inaiambia JavaScript kwamba ikiwa kigezo kimefafanuliwa, tathmini kwenye uwanja huo. Ikiwa kigezo hakijafafanuliwa, basi usemi huu unatathminiwa kuwa `undefined`.

Usemi `error.message`, wakati hakuna hitilafu, ungeibua ubaguzi. Kutumia `error?.message` kunaturuhusu kuepuka suala hilo.

#### `src/Greeter.tsx` {#greeter-tsx}

Faili hili lina utendaji mwingi wa UI. Linajumuisha ufafanuzi ambao kwa kawaida ungekuwa katika faili nyingi, lakini kwa kuwa huu ni mafunzo, programu imeboreshwa ili iwe rahisi kueleweka mara ya kwanza, badala ya utendaji au urahisi wa matengenezo.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Tunatumia chaguo hizi za kukokotoa za maktaba. Tena, zinaelezwa hapa chini zinapotumika.

```tsx
import { AddressType } from 'abitype'
```

[Maktaba ya `abitype`](https://abitype.dev/) inatupa ufafanuzi wa TypeScript kwa aina mbalimbali za data za Ethereum, kama vile [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI kwa ajili ya mkataba wa `Greeter`.
Ikiwa unaunda mikataba na UI kwa wakati mmoja, kwa kawaida ungeziweka katika hazina moja na kutumia ABI inayozalishwa na kikusanyaji cha Solidity kama faili katika programu yako. Hata hivyo, hii si lazima hapa kwa sababu mkataba tayari umeundwa na hautabadilika.

Tunatumia [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) kuiambia TypeScript kwamba hii ni konstanti _halisi_. Kwa kawaida, unapobainisha katika JavaScript `const x = {"a": 1}`, unaweza kubadilisha thamani katika `x`, huwezi tu kuikabidhi.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript ina aina kali. Tunatumia ufafanuzi huu kubainisha anwani ambapo mkataba wa `Greeter` umesambazwa kwenye minyororo tofauti. Ufunguo ni nambari (chainId), na thamani ni `AddressType` (anwani).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Anwani ya mkataba kwenye [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Kijenzi cha `Timer` {#timer-component}

Kijenzi cha `Timer` kinaonyesha idadi ya sekunde tangu wakati fulani. Hii ni muhimu kwa madhumuni ya utumiaji. Watumiaji wanapofanya jambo, wanatarajia majibu ya haraka. Katika minyororo ya vitalu, hii mara nyingi haiwezekani kwa sababu hakuna kinachotokea hadi muamala uwekwe kwenye kitalu. Suluhisho moja ni kuonyesha muda ambao umepita tangu mtumiaji afanye kitendo, ili mtumiaji aweze kuamua ikiwa muda unaohitajika ni wa kuridhisha.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Kijenzi cha `Timer` kinachukua kigezo kimoja, `lastUpdate`, ambacho ni wakati wa kitendo cha mwisho.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Tunahitaji kuwa na hali (kigezo kilichofungwa kwenye kijenzi) na kuisasisha ili kijenzi kifanye kazi kwa usahihi. Lakini hatuhitaji kamwe kuisoma, kwa hivyo usijisumbue kufanya kigezo.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Chaguo la kukokotoa la [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) linaturuhusu kupanga chaguo la kukokotoa kuendeshwa mara kwa mara. Katika kesi hii, kila sekunde. Chaguo la kukokotoa linaita `setNow` ili kusasisha hali, kwa hivyo kijenzi cha `Timer` kitatolewa tena. Tunafunga hii ndani ya [`useEffect`](https://react.dev/reference/react/useEffect) na orodha tupu ya utegemezi ili itokee mara moja tu, badala ya kila wakati kijenzi kinapotolewa.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Kokotoa idadi ya sekunde tangu sasisho la mwisho na uirudishe.

##### Kijenzi cha `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Hatimaye, tunapata kufafanua kijenzi.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Taarifa kuhusu mnyororo na akaunti tunayotumia, kwa hisani ya [wagmi](https://wagmi.sh/). Kwa sababu hii ni ndoano (`use...`), kijenzi kinatolewa tena wakati wowote taarifa hii inabadilika.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Anwani ya mkataba wa Greeter, ambayo ni `undefined` ikiwa hatuna taarifa za mnyororo, au tuko kwenye mnyororo usio na mkataba huo.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Hakuna hoja
  })
```

[Ndoano ya `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) inaita chaguo la kukokotoa la `greet` la [mkataba](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

Ndoano ya React ya [`useState`](https://www.w3schools.com/react/react_usestate.asp) inaturuhusu kubainisha kigezo cha hali, ambacho thamani yake inadumu kutoka utoaji mmoja wa kijenzi hadi mwingine. Thamani ya awali ni kigezo, katika kesi hii mfuatano mtupu.

Ndoano ya `useState` inarudisha orodha yenye thamani mbili:

1. Thamani ya sasa ya kigezo cha hali.
2. Chaguo la kukokotoa la kurekebisha kigezo cha hali inapohitajika. Kwa kuwa hii ni ndoano, kila wakati inapoitwa kijenzi kinatolewa tena.

Katika kesi hii, tunatumia kigezo cha hali kwa ajili ya salamu mpya ambayo mtumiaji anataka kuweka.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Ikiwa watumiaji wengi wanatumia mkataba mmoja kwa wakati mmoja, wanaweza kufuta salamu za kila mmoja. Hii ingeonekana kwa watumiaji kana kwamba programu haifanyi kazi vizuri. Ikiwa programu inaonyesha ni nani aliyeweka salamu mwisho, mtumiaji atajua alikuwa mtu mwingine na kwamba programu inafanya kazi kwa usahihi.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Watumiaji wanapenda kuona kwamba vitendo vyao vina athari ya haraka. Hata hivyo, kwenye mnyororo wa vitalu, hii sivyo. Vigezo hivi vya hali vinaturuhusu angalau kuonyesha kitu kwa watumiaji ili wajue kitendo chao kinaendelea.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Ikiwa `readResults` hapo juu inabadilisha data na haijawekwa kwa thamani ya uongo (kwa mfano, `undefined`), sasisha salamu ya sasa kwa ile iliyosomwa kutoka kwenye mnyororo wa vitalu. Pia, sasisha hali.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Sikiliza matukio ya `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` inamaanisha kwamba ikiwa thamani ni `false`, au thamani inayotathminiwa kama uongo, kama vile `undefined`, `0`, au mfuatano mtupu, usemi kwa ujumla ni `false`. Kwa thamani nyingine yoyote, ni `true`. Ni njia ya kubadilisha thamani kuwa boolean, kwa sababu ikiwa hakuna `greeterAddr`, hatutaki kusikiliza matukio.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Tunapoona kumbukumbu (ambayo hutokea tunapoona tukio jipya), inamaanisha kwamba salamu imebadilishwa. Katika kesi hiyo, tunaweza kusasisha `currentGreeting` na `lastSetterAddress` kwa thamani mpya. Pia, tunataka kusasisha onyesho la hali.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Tunaposasisha hali tunataka kufanya mambo mawili:

1. Sasisha mfuatano wa hali (`status`)
2. Sasisha wakati wa sasisho la mwisho la hali (`statusTime`) kuwa sasa.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Hiki ni kidhibiti cha tukio kwa mabadiliko kwenye uwanja mpya wa kuingiza salamu. Tungeweza kubainisha aina ya kigezo cha `evt`, lakini TypeScript ni lugha ya hiari ya aina. Kwa kuwa chaguo hili la kukokotoa linaitwa mara moja tu, katika kidhibiti cha tukio cha HTML, sidhani kama ni lazima.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Chaguo la kukokotoa la kuandika kwenye mkataba. Inafanana na [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), lakini inawezesha masasisho bora ya hali.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Huu ndio mchakato wa kuwasilisha muamala wa mnyororo wa vitalu kutoka kwa mtazamo wa mteja:

1. Tuma muamala kwenye nodi katika mnyororo wa vitalu ukitumia [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Subiri majibu kutoka kwenye nodi.
3. Majibu yanapopokelewa, muombe mtumiaji atie saini muamala kupitia mkoba. Hatua hii _lazima_ ifanyike baada ya majibu ya nodi kupokelewa kwa sababu mtumiaji anaonyeshwa gharama ya gesi ya muamala kabla ya kuutia saini.
4. Subiri mtumiaji aidhinishe.
5. Tuma muamala tena, wakati huu ukitumia [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Hatua ya 2 ina uwezekano wa kuchukua muda unaoonekana, ambapo watumiaji wanaweza kujiuliza ikiwa amri yao ilipokelewa na kiolesura cha mtumiaji na kwa nini hawajaombwa kutia saini muamala bado. Hiyo inaunda uzoefu mbaya wa mtumiaji (UX).

Suluhisho moja ni kutuma `eth_estimateGas` kila wakati kigezo kinapobadilika. Kisha, wakati mtumiaji anataka kutuma muamala (katika kesi hii kwa kubonyeza **Sasisha salamu**), gharama ya gesi inajulikana, na mtumiaji anaweza kuona ukurasa wa mkoba mara moja.

```tsx
  return (
```

Sasa hatimaye tunaweza kuunda HTML halisi ya kurudisha.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Onyesha salamu ya sasa.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Ikiwa tunajua ni nani aliyeweka salamu mwisho, onyesha taarifa hiyo. `Greeter` haifuatilii taarifa hii, na hatutaki kuangalia nyuma kwa matukio ya `SetGreeting`, kwa hivyo tunaipata tu mara tu salamu inapobadilishwa wakati tunaendesha.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Huu ni uwanja wa maandishi wa kuingiza ambapo mtumiaji anaweza kuweka salamu mpya. Kila wakati mtumiaji anapobonyeza kitufe, tunaita `greetingChange`, ambayo inaita `setNewGreeting`. Kwa kuwa `setNewGreeting` inatoka kwa `useState`, inasababisha kijenzi cha `Greeter` kutolewa tena. Hii inamaanisha kwamba:

- Tunahitaji kubainisha `value` ili kuweka thamani ya salamu mpya, kwa sababu vinginevyo ingerudi kwenye chaguo-msingi, mfuatano mtupu.
- `simulation` pia inasasishwa kila wakati `newGreeting` inabadilika, ambayo inamaanisha kwamba tutapata uigaji na salamu sahihi. Hii inaweza kuwa muhimu kwa sababu gharama ya gesi inategemea ukubwa wa data ya wito, ambayo inategemea urefu wa mfuatano.

```tsx
      <button disabled={!simulation.data}
```

Wezesha kitufe tu mara tu tunapokuwa na taarifa tunayohitaji kutuma muamala.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Sasisha hali. Katika hatua hii, mtumiaji anahitaji kuthibitisha kwenye mkoba.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` inarudi tu baada ya muamala kutumwa kwa kweli. Hii inaturuhusu kumuonyesha mtumiaji muda ambao muamala umekuwa ukisubiri kujumuishwa kwenye mnyororo wa vitalu.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Onyesha hali na muda ambao umepita tangu isasishwe.

```
export {Greeter}
```

Hamisha kijenzi.

#### `src/wagmi.ts` {#wagmi-ts}

Hatimaye, ufafanuzi mbalimbali unaohusiana na wagmi uko katika `src/wagmi.ts`. Sitaelezea kila kitu hapa, kwa sababu mengi yake ni kiolezo ambacho huenda hutahitaji kubadilisha.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Usanidi wa wagmi unajumuisha minyororo inayoungwa mkono na programu hii. Unaweza kuona [orodha ya minyororo inayopatikana](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Kiunganishi hiki](https://wagmi.sh/core/api/connectors/injected) kinaturuhusu kuzungumza na mkoba uliosakinishwa kwenye kivinjari.

```ts
  transports: {
    [sepolia.id]: http()
```

Mwisho wa HTTP wa chaguo-msingi unaokuja na Viem ni mzuri vya kutosha. Ikiwa tunataka URL tofauti, tunaweza kutumia `http("https:// hostname ")` au `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Kuongeza mnyororo mwingine wa vitalu {#add-blockchain}

Siku hizi kuna [suluhu nyingi za kuongeza ukubwa za L2](https://ethereum.org/layer-2/), na unaweza kutaka kuunga mkono baadhi ambazo viem haiungi mkono bado. Ili kufanya hivyo, unarekebisha `src/wagmi.ts`. Maagizo haya yanaelezea jinsi ya kuongeza [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Hariri `src/wagmi.ts`

    A. Ingiza aina ya `defineChain` kutoka viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Ongeza ufafanuzi wa mtandao. Huhitaji kufanya hivi kwa Optimism Sepolia, [tayari iko katika `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), lakini kwa njia hii unajifunza jinsi ya kuongeza mnyororo wa vitalu ambao hauko katika `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Ongeza mnyororo mpya kwenye wito wa `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Hariri `src/App.tsx` ili kutoa maoni kuhusu ubadilishaji wa kiotomatiki kwenda Sepolia. Kwenye mfumo wa uzalishaji, labda ungeonyesha vitufe vilivyo na viungo kwa kila mnyororo wa vitalu unaounga mkono.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Hariri `src/Greeter.tsx` ili kuhakikisha kwamba programu inajua anwani ya mikataba yako kwenye mtandao mpya.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  Kwenye kivinjari chako.

    A. Vinjari kwenye [ChainList](https://chainlist.org/chain/11155420?testnets=true) na ubofye mojawapo ya vitufe upande wa kulia wa jedwali ili kuongeza mnyororo kwenye mkoba wako.

    B. Katika programu, **Kata muunganisho** na kisha uunganishe tena ili kubadilisha mnyororo wa vitalu. Kuna njia nzuri zaidi za kushughulikia hili, lakini zingehitaji mabadiliko ya programu.

## Hitimisho {#conclusion}

Bila shaka, hujali sana kuhusu kutoa kiolesura cha mtumiaji kwa ajili ya `Greeter`. Unataka kuunda kiolesura cha mtumiaji kwa ajili ya mikataba yako mwenyewe. Ili kuunda programu yako mwenyewe, endesha hatua hizi:

1. Bainisha kuunda programu ya wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Andika `y` ili kuendelea.

3. Taja programu.

4. Chagua mfumo wa **React**.

5. Chagua lahaja ya **Vite**.

Sasa nenda na ufanye mikataba yako itumike kwa ulimwengu mpana.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).