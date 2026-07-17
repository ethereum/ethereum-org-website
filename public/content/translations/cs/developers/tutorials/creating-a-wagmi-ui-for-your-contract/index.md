---
title: "Vytvoření uživatelského rozhraní pro váš kontrakt"
description: "Pomocí moderních komponent, jako jsou TypeScript, React, Vite a Wagmi, si projdeme moderní, ale minimalistické uživatelské rozhraní a naučíme se, jak k němu připojit peněženku, volat chytrý kontrakt pro čtení informací, odeslat transakci do chytrého kontraktu a sledovat události z chytrého kontraktu pro identifikaci změn."
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: UI s WAGMI
published: 2023-11-01
lang: cs
sidebarDepth: 3
---

Našli jste funkci, kterou v ekosystému Etherea potřebujeme. Napsali jste chytré kontrakty k její implementaci a možná i nějaký související kód, který běží offchain. To je skvělé! Bohužel bez uživatelského rozhraní nebudete mít žádné uživatele a naposledy, když jste psali webové stránky, lidé používali vytáčené modemy a JavaScript byl novinkou.

Tento článek je pro vás. Předpokládám, že umíte programovat a možná znáte trochu JavaScript a HTML, ale vaše dovednosti v oblasti uživatelského rozhraní jsou zrezivělé a zastaralé. Společně si projdeme jednoduchou moderní aplikaci, abyste viděli, jak se to dělá dnes.

## Proč je to důležité {#why-important}

Teoreticky byste mohli nechat lidi používat [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) nebo [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) k interakci s vašimi kontrakty. To je skvělé pro zkušené uživatele Etherea. My se ale snažíme obsloužit [další miliardu lidí](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). To se nestane bez skvělého uživatelského zážitku a přívětivé uživatelské rozhraní je jeho velkou součástí.

## Aplikace Greeter {#greeter-app}

Za tím, jak funguje moderní uživatelské rozhraní, je spousta teorie a existuje [mnoho dobrých stránek](https://react.dev/learn/thinking-in-react), [které to vysvětlují](https://wagmi.sh/core/getting-started). Místo opakování skvělé práce, kterou tyto stránky odvedly, budu předpokládat, že se raději učíte praxí, a začneme s aplikací, se kterou si můžete hrát. K dokončení věcí stále potřebujete teorii a dostaneme se k ní – jen půjdeme zdrojový soubor po zdrojovém souboru a budeme diskutovat o věcech, jak na ně narazíme.

### Instalace {#installation}

1. Aplikace používá testovací síť [Sepolia](https://sepolia.dev/). Pokud je to nutné, [získejte testovací ETH na síti Sepolia](/developers/docs/networks/#sepolia) a [přidejte si síť Sepolia do své peněženky](https://chainlist.org/chain/11155111).

2. Naklonujte repozitář na GitHubu a nainstalujte potřebné balíčky.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Aplikace používá bezplatné přístupové body, které mají výkonnostní omezení. Pokud chcete použít poskytovatele [uzlu jako služby (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/), nahraďte adresy URL v [`src/wagmi.ts`](#wagmi-ts).

4. Spusťte aplikaci.

   ```sh
   npm run dev
   ```

5. Přejděte na adresu URL zobrazenou aplikací. Ve většině případů je to [http://localhost:5173/](http://localhost:5173/).

6. Zdrojový kód kontraktu, upravenou verzi Greeteru z Hardhat, si můžete prohlédnout [v prohlížeči blockchainu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Průvodce soubory {#file-walk-through}

#### `index.html` {#index-html}

Tento soubor je standardní HTML šablona s výjimkou tohoto řádku, který importuje soubor skriptu.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Přípona souboru naznačuje, že se jedná o [komponentu React](https://www.w3schools.com/react/react_components.asp) napsanou v [TypeScript](https://www.typescriptlang.org/), což je rozšíření JavaScriptu, které podporuje [typovou kontrolu](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript se kompiluje do JavaScriptu, takže jej můžeme použít na straně klienta.

Tento soubor je vysvětlen hlavně pro případ, že by vás to zajímalo. Obvykle tento soubor neupravujete, ale upravujete [`src/App.tsx`](#app-tsx) a soubory, které importuje.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importujte kód knihovny, který potřebujeme.

```tsx
import App from './App.tsx'
```

Importujte komponentu React, která implementuje aplikaci (viz níže).

```tsx
import { config } from './wagmi.ts'
```

Importujte konfiguraci [Wagmi](https://wagmi.sh/), která zahrnuje konfiguraci blockchainu.

```tsx
const queryClient = new QueryClient()
```

Vytvoří novou instanci správce mezipaměti [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Tento objekt bude ukládat:

- RPC volání uložená v mezipaměti
- Čtení z kontraktu
- Stav opětovného načítání na pozadí

Správce mezipaměti potřebujeme, protože Wagmi v3 interně používá React Query.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Vytvořte kořenovou komponentu React. Parametrem pro `render` je [JSX](https://www.w3schools.com/react/react_jsx.asp), rozšiřující jazyk, který používá jak HTML, tak JavaScript/TypeScript. Vykřičník zde říká komponentě TypeScript: „nevíš, že `document.getElementById('root')` bude platným parametrem pro `ReactDOM.createRoot`, ale neboj se – já jsem vývojář a říkám ti, že bude“.

```tsx
  <React.StrictMode>
```

Aplikace se vkládá do [komponenty `React.StrictMode`](https://react.dev/reference/react/StrictMode). Tato komponenta říká knihovně React, aby vložila další ladicí kontroly, což je užitečné během vývoje.

```tsx
    <WagmiProvider config={config}>
```

Aplikace je také uvnitř [komponenty `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Knihovna Wagmi (kterou vytvoříme)](https://wagmi.sh/) propojuje definice uživatelského rozhraní React s [knihovnou Viem](https://viem.sh/) pro psaní decentralizované aplikace (dapp) na Ethereu.

```tsx
      <QueryClientProvider client={queryClient}>
```

A nakonec přidejte poskytovatele React Query, aby jakákoli komponenta aplikace mohla používat dotazy uložené v mezipaměti.

```tsx
        <App />
```

Nyní můžeme mít komponentu pro aplikaci, která skutečně implementuje uživatelské rozhraní. `/>` na konci komponenty říká Reactu, že tato komponenta uvnitř nemá žádné definice, v souladu se standardem XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Samozřejmě musíme uzavřít ostatní komponenty.

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

Importujte knihovny, které potřebujeme, a také [komponentu `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

ID řetězce Sepolia.

```
function App() {
```

Toto je standardní způsob vytvoření komponenty React: definujte funkci, která se volá, kdykoli je potřeba ji vykreslit. Tato funkce obvykle obsahuje kód v TypeScript nebo JavaScript, následovaný příkazem `return`, který vrací kód JSX.

```tsx
  const connection = useConnection()
```

Použijte [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) k získání informací souvisejících s aktuálním připojením, jako je adresa a `chainId`.

Podle konvence se v Reactu funkce nazývané `use...` označují jako [hooky](https://www.w3schools.com/react/react_hooks.asp). Tyto funkce nejenže vracejí data komponentě; také zajišťují její opětovné vykreslení (funkce komponenty se znovu spustí a její výstup nahradí ten předchozí v HTML), když se tato data změní.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Použijte [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) k získání informací o připojení peněženky.

```tsx
  const { disconnect } = useDisconnect()
```

[Tento hook](https://wagmi.sh/react/api/hooks/useDisconnect) nám poskytuje funkci pro odpojení od peněženky.

```tsx
  const { switchChain } = useSwitchChain()
```

[Tento hook](https://wagmi.sh/react/api/hooks/useSwitchChain) nám umožňuje přepínat řetězce.

```tsx
  useEffect(() => {
```

Hook Reactu [`useEffect`](https://react.dev/reference/react/useEffect) vám umožňuje spustit funkci, kdykoli se změní hodnota proměnné, za účelem synchronizace externího systému.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Pokud jsme připojeni, ale ne k blockchainu Sepolia, přepněte na síť Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Znovu spusťte funkci pokaždé, když se změní stav připojení nebo chainId připojení.

```tsx
  return (
    <>
```

JSX komponenty React _musí_ vracet jedinou HTML komponentu. Když máme více komponent a nepotřebujeme kontejner, který by je všechny obalil, použijeme prázdnou komponentu (`<> ... </>`), abychom je spojili do jedné komponenty.

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

Poskytněte informace o aktuálním připojení. V rámci JSX znamená `{<expression>}` vyhodnotit výraz jako JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Syntaxe `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`“.

Toto je standardní způsob, jak vkládat podmínky if do JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX se řídí standardem XML, který je přísnější než HTML. Pokud značka nemá odpovídající koncovou značku, _musí_ mít na konci lomítko (`/`), které ji ukončí.

Zde máme dvě takové značky, `<Greeter />` (která ve skutečnosti obsahuje HTML kód komunikující s kontraktem) a [`<hr />` pro vodorovnou čáru](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Pokud uživatel klikne na toto tlačítko, zavolejte funkci `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Pokud _nejsme_ připojeni, zobrazte potřebné možnosti pro připojení k peněžence.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

V `connectors` máme seznam konektorů. Použijeme [`map`](https://www.w3schools.com/jsref/jsref_map.asp), abychom jej přeměnili na seznam JSX tlačítek k zobrazení.

```tsx
            <button
              key={connector.uid}
```

V JSX je nutné, aby „sourozenecké“ značky (značky, které pocházejí od stejného rodiče) měly různé identifikátory.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Tlačítka konektorů.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Poskytněte další informace. Syntaxe výrazu `<variable>?.<field>` říká JavaScriptu, že pokud je proměnná definována, má se vyhodnotit na toto pole. Pokud proměnná definována není, pak se tento výraz vyhodnotí jako `undefined`.

Výraz `error.message` by v případě, že nedojde k žádné chybě, vyvolal výjimku. Použití `error?.message` nám umožňuje tomuto problému předejít.

#### `src/Greeter.tsx` {#greeter-tsx}

Tento soubor obsahuje většinu funkcí uživatelského rozhraní. Zahrnuje definice, které by normálně byly ve více souborech, ale protože se jedná o tutoriál, je program optimalizován tak, aby byl snadno pochopitelný napoprvé, spíše než pro výkon nebo snadnou údržbu.

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

Používáme tyto funkce knihovny. Opět jsou vysvětleny níže tam, kde se používají.

```tsx
import { AddressType } from 'abitype'
```

[Knihovna `abitype`](https://abitype.dev/) nám poskytuje definice TypeScript pro různé datové typy Etherea, jako je [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI pro kontrakt `Greeter`.
Pokud vyvíjíte kontrakty a uživatelské rozhraní současně, normálně byste je umístili do stejného repozitáře a použili ABI vygenerované kompilátorem Solidity jako soubor ve vaší aplikaci. Zde to však není nutné, protože kontrakt je již vyvinut a nebude se měnit.

Používáme [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions), abychom TypeScriptu řekli, že se jedná o _skutečnou_ konstantu. Normálně, když v JavaScriptu zadáte `const x = {"a": 1}`, můžete změnit hodnotu v `x`, jen do ní nemůžete přiřazovat.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript je silně typovaný. Tuto definici používáme k určení adresy, kde je kontrakt `Greeter` nasazen napříč různými řetězci. Klíčem je číslo (chainId) a hodnotou je `AddressType` (adresa).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Adresa kontraktu na síti [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Komponenta `Timer` {#timer-component}

Komponenta `Timer` zobrazuje počet sekund od daného času. To je důležité z hlediska použitelnosti. Když uživatelé něco udělají, očekávají okamžitou reakci. V blockchainech je to často nemožné, protože se nic nestane, dokud není transakce umístěna do bloku. Jedním z řešení je ukázat, jak dlouho to je, co uživatel akci provedl, aby se mohl rozhodnout, zda je požadovaný čas přiměřený.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Komponenta `Timer` přijímá jeden parametr, `lastUpdate`, což je čas poslední akce.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Potřebujeme mít stav (proměnnou vázanou na komponentu) a aktualizovat jej, aby komponenta fungovala správně. Nikdy jej ale nepotřebujeme číst, takže se neobtěžujte vytvářet proměnnou.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Funkce [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) nám umožňuje naplánovat pravidelné spouštění funkce. V tomto případě každou sekundu. Funkce volá `setNow` pro aktualizaci stavu, takže komponenta `Timer` bude znovu vykreslena. Zabalíme to do [`useEffect`](https://react.dev/reference/react/useEffect) s prázdným seznamem závislostí, takže se to stane jen jednou, a ne při každém vykreslení komponenty.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Vypočítejte počet sekund od poslední aktualizace a vraťte jej.

##### Komponenta `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Konečně se dostáváme k definici komponenty.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informace o řetězci a účtu, který používáme, díky [Wagmi](https://wagmi.sh/). Protože se jedná o hook (`use...`), komponenta se znovu vykreslí, kdykoli se tyto informace změní.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Adresa kontraktu Greeter, která je `undefined`, pokud nemáme informace o řetězci nebo jsme na řetězci bez tohoto kontraktu.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Žádné argumenty
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) volá funkci `greet` [kontraktu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

Hook Reactu [`useState`](https://www.w3schools.com/react/react_usestate.asp) nám umožňuje specifikovat stavovou proměnnou, jejíž hodnota přetrvává z jednoho vykreslení komponenty do druhého. Počáteční hodnota je parametr, v tomto případě prázdný řetězec.

Hook `useState` vrací seznam se dvěma hodnotami:

1. Aktuální hodnota stavové proměnné.
2. Funkce pro úpravu stavové proměnné v případě potřeby. Protože se jedná o hook, při každém jeho zavolání se komponenta znovu vykreslí.

V tomto případě používáme stavovou proměnnou pro nový pozdrav, který chce uživatel nastavit.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Pokud více uživatelů používá stejný kontrakt současně, mohou si navzájem přepisovat pozdravy. Uživatelům by to připadalo, jako by aplikace nefungovala správně. Pokud aplikace ukáže, kdo naposledy nastavil pozdrav, uživatel bude vědět, že to byl někdo jiný a že aplikace funguje správně.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Uživatelé rádi vidí, že jejich akce mají okamžitý účinek. Na blockchainu tomu tak ale není. Tyto stavové proměnné nám umožňují alespoň něco uživatelům zobrazit, aby věděli, že jejich akce probíhá.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Pokud výše uvedený `readResults` změní data a není nastaven na nepravdivou hodnotu (například `undefined`), aktualizujte aktuální pozdrav na ten přečtený z blockchainu. Také aktualizujte stav.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Poslouchejte události `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` znamená, že pokud je hodnota `false` nebo hodnota, která se vyhodnotí jako nepravda, jako je `undefined`, `0` nebo prázdný řetězec, celkový výraz je `false`. Pro jakoukoli jinou hodnotu je to `true`. Je to způsob, jak převést hodnoty na booleovské hodnoty, protože pokud neexistuje žádná `greeterAddr`, nechceme poslouchat události.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Když vidíme protokoly (což se stane, když vidíme novou událost), znamená to, že pozdrav byl upraven. V takovém případě můžeme aktualizovat `currentGreeting` a `lastSetterAddress` na nové hodnoty. Také chceme aktualizovat zobrazení stavu.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Když aktualizujeme stav, chceme udělat dvě věci:

1. Aktualizovat řetězec stavu (`status`)
2. Aktualizovat čas poslední aktualizace stavu (`statusTime`) na aktuální čas.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Toto je obslužná rutina události pro změny ve vstupním poli nového pozdravu. Mohli bychom specifikovat typ parametru `evt`, ale TypeScript je jazyk s volitelným typováním. Vzhledem k tomu, že se tato funkce volá pouze jednou, v obslužné rutině události HTML, nemyslím si, že je to nutné.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Funkce pro zápis do kontraktu. Je podobná [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), ale umožňuje lepší aktualizace stavu.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Toto je proces odeslání blockchainové transakce z pohledu klienta:

1. Odešlete transakci do uzlu v blockchainu pomocí [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Počkejte na odpověď od uzlu.
3. Po obdržení odpovědi požádejte uživatele, aby transakci podepsal prostřednictvím peněženky. Tento krok se _musí_ stát po obdržení odpovědi uzlu, protože uživateli se před podpisem zobrazí náklady na plyn (gas) transakce.
4. Počkejte na schválení uživatelem.
5. Odešlete transakci znovu, tentokrát pomocí [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Krok 2 pravděpodobně zabere znatelné množství času, během kterého se uživatelé mohou divit, zda byl jejich příkaz přijat uživatelským rozhraním a proč ještě nejsou požádáni o podepsání transakce. To vytváří špatný uživatelský zážitek (UX).

Jedním z řešení je odeslat `eth_estimateGas` pokaždé, když se změní parametr. Pak, když uživatel skutečně chce odeslat transakci (v tomto případě stisknutím **Update greeting**), jsou náklady na plyn známé a uživatel může okamžitě vidět stránku peněženky.

```tsx
  return (
```

Nyní můžeme konečně vytvořit skutečné HTML, které se má vrátit.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Zobrazte aktuální pozdrav.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Pokud víme, kdo naposledy nastavil pozdrav, zobrazte tuto informaci. `Greeter` tyto informace neuchovává a my se nechceme ohlížet zpět na události `SetGreeting`, takže je získáme pouze tehdy, když se pozdrav změní během našeho běhu.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Toto je vstupní textové pole, kde může uživatel nastavit nový pozdrav. Pokaždé, když uživatel stiskne klávesu, zavoláme `greetingChange`, což zavolá `setNewGreeting`. Protože `setNewGreeting` pochází z `useState`, způsobí to opětovné vykreslení komponenty `Greeter`. To znamená, že:

- Musíme specifikovat `value`, abychom zachovali hodnotu nového pozdravu, protože jinak by se vrátil zpět na výchozí hodnotu, prázdný řetězec.
- `simulation` se také aktualizuje pokaždé, když se změní `newGreeting`, což znamená, že získáme simulaci se správným pozdravem. To by mohlo být relevantní, protože náklady na plyn závisí na velikosti dat volání, která závisí na délce řetězce.

```tsx
      <button disabled={!simulation.data}
```

Tlačítko povolte až poté, co budeme mít informace potřebné k odeslání transakce.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Aktualizujte stav. V tomto okamžiku musí uživatel potvrdit akci v peněžence.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` se vrátí až po skutečném odeslání transakce. To nám umožňuje ukázat uživateli, jak dlouho transakce čeká na zahrnutí do blockchainu.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Zobrazte stav a jak dlouho to je od jeho aktualizace.

```
export {Greeter}
```

Exportujte komponentu.

#### `src/wagmi.ts` {#wagmi-ts}

Nakonec jsou v `src/wagmi.ts` různé definice související s Wagmi. Nebudu zde vysvětlovat vše, protože většina z toho je šablona, kterou pravděpodobně nebudete muset měnit.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Konfigurace Wagmi zahrnuje řetězce podporované touto aplikací. Můžete se podívat na [seznam dostupných řetězců](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Tento konektor](https://wagmi.sh/core/api/connectors/injected) nám umožňuje komunikovat s peněženkou nainstalovanou v prohlížeči.

```ts
  transports: {
    [sepolia.id]: http()
```

Výchozí HTTP koncový bod, který je dodáván s Viem, je dostatečně dobrý. Pokud chceme jinou adresu URL, můžeme použít `http("https:// hostname ")` nebo `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Přidání dalšího blockchainu {#add-blockchain}

V dnešní době existuje spousta [řešení škálování na 2. vrstvě (L2)](https://ethereum.org/layer-2/) a možná budete chtít podpořit některá, která Viem ještě nepodporuje. Chcete-li to provést, upravte `src/wagmi.ts`. Tyto pokyny vysvětlují, jak přidat [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Upravte `src/wagmi.ts`

    A. Importujte typ `defineChain` z Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Přidejte definici sítě. Pro Optimism Sepolia to ve skutečnosti dělat nemusíte, [už je v `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), ale tímto způsobem se naučíte, jak přidat blockchain, který v `viem` není.

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

    C. Přidejte nový řetězec do volání `createConfig`.

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

2.  Upravte `src/App.tsx` tak, abyste zakomentovali automatické přepnutí na síť Sepolia. V produkčním systému byste pravděpodobně zobrazili tlačítka s odkazy na každý z blockchainů, které podporujete.

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

3.  Upravte `src/Greeter.tsx`, abyste zajistili, že aplikace zná adresu pro vaše kontrakty na nové síti.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  Ve vašem prohlížeči.

    A. Přejděte na [ChainList](https://chainlist.org/chain/11155420?testnets=true) a klikněte na jedno z tlačítek na pravé straně tabulky, abyste přidali řetězec do své peněženky.

    B. V aplikaci klikněte na **Disconnect** (Odpojit) a poté se znovu připojte, abyste změnili blockchain. Existují hezčí způsoby, jak to vyřešit, ale vyžadovaly by změny v aplikaci.

## Závěr {#conclusion}

Samozřejmě vás ve skutečnosti nezajímá poskytování uživatelského rozhraní pro `Greeter`. Chcete vytvořit uživatelské rozhraní pro své vlastní kontrakty. Chcete-li vytvořit vlastní aplikaci, proveďte tyto kroky:

1. Zadejte vytvoření aplikace Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Napište `y` pro pokračování.

3. Pojmenujte aplikaci.

4. Vyberte framework **React**.

5. Vyberte variantu **Vite**.

Nyní běžte a udělejte své kontrakty použitelné pro celý svět.

[Zde najdete více z mé práce](https://cryptodocguy.pro/).