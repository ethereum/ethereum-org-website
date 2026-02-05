---
title: "Vytvoření uživatelského rozhraní pro váš kontrakt"
description: Pomocí moderních komponent, jako jsou TypeScript, React, Vite a Wagmi, si projdeme moderní, ale minimální, uživatelské rozhraní a naučíme se, jak k němu připojit peněženku, jak volat chytrý kontrakt pro čtení informací, jak poslat transakci na chytrý kontrakt a jak sledovat události z chytrého kontraktu a identifikovat změny.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: cs
sidebarDepth: 3
---

Našli jste funkci, kterou v ekosystému Etherea potřebujeme. Napsali jste chytré kontrakty k jeho implementaci a možná i nějaký související kód, který běží offchain. To je skvělé! Bohužel bez uživatelského rozhraní nebudete mít žádné uživatele a naposledy, když jste psali webové stránky, lidé používali dial-up modemy a JavaScript byl novinkou.

Tento článek je pro vás. Předpokládám, že umíte programovat a možná trochu JavaScript a HTML, ale vaše dovednosti v oblasti uživatelského rozhraní jsou zrezivělé a zastaralé. Společně si projdeme jednoduchou moderní aplikaci, abyste viděli, jak se to dnes dělá.

## Proč je to důležité {#why-important}

Teoreticky byste mohli nechat lidi používat [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) nebo [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) k interakci s vašimi kontrakty. To bude skvělé pro zkušené příznivce Etherea. My se ale snažíme sloužit [další miliardě lidí](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). To se nestane bez skvělého uživatelského zážitku a přátelské uživatelské rozhraní je jeho velkou součástí.

## Aplikace Greeter {#greeter-app}

Za moderním uživatelským rozhraním je spousta teorie a [mnoho dobrých stránek](https://react.dev/learn/thinking-in-react), [které to vysvětlují](https://wagmi.sh/core/getting-started). Místo opakování skvělé práce, kterou odvedly tyto stránky, budu předpokládat, že se raději učíte praxí a začnete s aplikací, se kterou si můžete hrát. Stále potřebujete teorii, abyste mohli věci dotáhnout do konce, a k tomu se dostaneme - projdeme si zdrojový soubor po zdrojovém souboru a probereme věci, jakmile na ně narazíme.

### Instalace {#installation}

1. V případě potřeby si přidejte [blockchain Holesky](https://chainlist.org/?search=holesky&testnets=true) do své peněženky a [získejte testovací ETH](https://www.holeskyfaucet.io/).

2. Klonujte repozitář z githubu.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Nainstalujte potřebné balíčky.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Spusťte aplikaci.

   ```sh
   pnpm dev
   ```

5. Přejděte na adresu URL zobrazenou aplikací. Ve většině případů je to [http://localhost:5173/](http://localhost:5173/).

6. Zdrojový kód kontraktu, mírně upravenou verzi Greeter od Hardhat, si můžete prohlédnout [v průzkumníku blockchainu](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Procházení souborů {#file-walk-through}

#### `index.html` {#index-html}

Tento soubor je standardní HTML šablona s výjimkou tohoto řádku, který importuje soubor se skriptem.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Přípona souboru nám říká, že tento soubor je [komponenta React](https://www.w3schools.com/react/react_components.asp) napsaná v [TypeScriptu](https://www.typescriptlang.org/), rozšíření JavaScriptu, které podporuje [kontrolu typů](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript je kompilován do JavaScriptu, takže ho můžeme použít pro spuštění na straně klienta.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importujte kód knihovny, který potřebujeme.

```tsx
import { App } from './App'
```

Importujte komponentu React, která implementuje aplikaci (viz níže).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Vytvořte kořenovou komponentu React. Parametrem `render` je [JSX](https://www.w3schools.com/react/react_jsx.asp), jazykové rozšíření, které používá jak HTML, tak JavaScript/TypeScript. Vykřičník zde říká komponentě TypeScript: "nevíte, že `document.getElementById('root')` bude platný parametr pro `ReactDOM.createRoot`, ale nebojte se – já jsem vývojář a říkám vám, že bude".

```tsx
  <React.StrictMode>
```

Aplikace se nachází uvnitř [komponenty `React.StrictMode`](https://react.dev/reference/react/StrictMode). Tato komponenta říká knihovně React, aby vložila další kontrolu ladění, což je užitečné během vývoje.

```tsx
    <WagmiConfig config={config}>
```

Aplikace je také uvnitř [komponenty `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Knihovna wagmi (we are going to make it)](https://wagmi.sh/) propojuje definice UI v Reactu s [knihovnou viem](https://viem.sh/) pro psaní decentralizovaných aplikací na Ethereu.

```tsx
      <RainbowKitProvider chains={chains}>
```

A nakonec [komponenta `RainbowKitProvider`](https://www.rainbowkit.com/). Tato komponenta zpracovává přihlašování a komunikaci mezi peněženkou a aplikací.

```tsx
        <App />
```

Nyní můžeme mít komponentu pro aplikaci, která skutečně implementuje UI. Znak `/>` na konci komponenty říká Reactu, že tato komponenta v sobě nemá žádné definice, podle standardu XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Samozřejmě musíme uzavřít i ostatní komponenty.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Toto je standardní způsob, jak vytvořit komponentu React – definovat funkci, která se volá pokaždé, když je třeba ji vykreslit. Tato funkce má obvykle nahoře nějaký kód v TypeScriptu nebo JavaScriptu, za nímž následuje příkaz `return`, který vrací kód JSX.

```tsx
  const { isConnected } = useAccount()
```

Zde používáme [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) ke kontrole, zda jsme připojeni k blockchainu prostřednictvím peněženky.

Podle konvence jsou v Reactu funkce nazvané `use...` [hooky](https://www.w3schools.com/react/react_hooks.asp), které vracejí nějaký druh dat. Když použijete takové hooky, vaše komponenta nejenže získá data, ale když se tato data změní, komponenta se znovu vykreslí s aktualizovanými informacemi.

```tsx
  return (
    <>
```

JSX komponenty React _musí_ vracet jednu komponentu. Když máme více komponent a nemáme nic, co by je "přirozeně" zabalilo, použijeme prázdnou komponentu (`<> ... </>`), abychom z nich vytvořili jedinou komponentu.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Komponentu [`ConnectButton`](https://www.rainbowkit.com/docs/connect-button) získáváme z RainbowKit. Když nejsme připojeni, zobrazí se nám tlačítko `Připojit peněženku`, které otevře modální okno, které vysvětluje peněženky a umožňuje vám vybrat, kterou používáte. Když jsme připojeni, zobrazí se používaný blockchain, adresa našeho účtu a náš zůstatek ETH. Tato zobrazení můžeme použít k přepnutí sítě nebo k odpojení.

```tsx
      {isConnected && (
```

Když potřebujeme vložit skutečný JavaScript (nebo TypeScript, který bude zkompilován do JavaScriptu) do JSX, použijeme závorky (`{}`).

Syntaxe `a && b` je zkratka pro [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). To znamená, že pokud je `a`pravda, vyhodnotí se jako`b`a jinak se vyhodnotí jako`a`(což může být`false`, `0\` atd.). To je snadný způsob, jak sdělit Reactu, že se komponenta má zobrazit pouze v případě, že je splněna určitá podmínka.

V tomto případě chceme uživateli zobrazit `Greeter` pouze v případě, že je uživatel připojen k blockchainu.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Tento soubor obsahuje většinu funkcí uživatelského rozhraní. Obsahuje definice, které by se normálně nacházely ve více souborech, ale jelikož se jedná o tutoriál, program je optimalizován pro snadné pochopení na první pokus, spíše než pro výkon nebo snadnou údržbu.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Používáme tyto funkce knihovny. Opět jsou vysvětleny níže, kde jsou použity.

```tsx
import { AddressType } from 'abitype'
```

[Knihovna `abitype`](https://abitype.dev/) nám poskytuje definice TypeScriptu pro různé datové typy Etherea, jako je [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI pro kontrakt `Greeter`.
Pokud vyvíjíte kontrakty a UI zároveň, obvykle je umístíte do stejného repozitáře a ABI vygenerované kompilátorem Solidity použijete jako soubor ve vaší aplikaci. To však zde není nutné, protože kontrakt je již vyvinut a nebude se měnit.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript je silně typovaný. Tuto definici používáme k určení adresy, na které je kontrakt `Greeter` nasazen na různých řetězcích. Klíčem je číslo (ID řetězce) a hodnotou je `AddressType` (adresa).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Adresa kontraktu na dvou podporovaných sítích: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) a [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Poznámka: Ve skutečnosti existuje ještě třetí definice pro Redstone Holesky, která bude vysvětlena níže.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Tento typ se používá jako parametr pro komponentu `ShowObject` (vysvětleno později). Obsahuje název objektu a jeho hodnotu, které se zobrazují pro účely ladění.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

V každém okamžiku můžeme buď vědět, jaký je pozdrav (protože jsme ho přečetli z blockchainu), nebo nevědět (protože jsme ho ještě neobdrželi). Je tedy užitečné mít typ, který může být buď řetězec, nebo nic.

##### Komponenta `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Konečně se dostáváme k definici komponenty.

```tsx
  const { chain } = useNetwork()
```

Informace o řetězci, který používáme, s laskavým svolením [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Protože se jedná o hook (`use...`), při každé změně této informace se komponenta překreslí.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Adresa kontraktu Greeter, která se liší podle řetězce (a která je `undefined`, pokud nemáme informace o řetězci nebo jsme na řetězci bez tohoto kontraktu).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) čte informace z kontraktu. Přesné informace, které vrací, uvidíte, když v UI rozbalíte `readResults`. V tomto případě chceme, aby stále hledal, takže budeme informováni, když se pozdrav změní.

**Poznámka:** Mohli bychom naslouchat [událostem `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs), abychom věděli, kdy se pozdrav změní, a tímto způsobem ho aktualizovali. Ačkoli to může být efektivnější, nebude to platit ve všech případech. Když uživatel přepne na jiný řetězec, pozdrav se také změní, ale tato změna není doprovázena událostí. Mohli bychom mít jednu část kódu, která naslouchá událostem, a druhou, která identifikuje změny řetězce, ale to by bylo složitější než jen nastavit [parametr `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Hook [`useState` v Reactu](https://www.w3schools.com/react/react_usestate.asp) nám umožňuje specifikovat proměnnou stavu, jejíž hodnota přetrvává z jednoho vykreslení komponenty na druhé. Počáteční hodnota je parametr, v tomto případě prázdný řetězec.

Hook `useState` vrací seznam se dvěma hodnotami:

1. Aktuální hodnota proměnné stavu.
2. Funkce pro úpravu proměnné stavu v případě potřeby. Protože se jedná o hook, pokaždé, když je volán, komponenta se znovu vykreslí.

V tomto případě používáme proměnnou stavu pro nový pozdrav, který chce uživatel nastavit.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Toto je obsluha události, která se spustí při změně vstupního pole pro nový pozdrav. Typ [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) specifikuje, že se jedná o obsluhu pro změnu hodnoty vstupního prvku HTML. Část `<HTMLInputElement>` se používá, protože se jedná o [generický typ](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Toto je proces odeslání blockchainové transakce z pohledu klienta:

1. Odešlete transakci uzlu v blockchainu pomocí [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Počkejte na odpověď z uzlu.
3. Po obdržení odpovědi požádejte uživatele o podepsání transakce prostřednictvím peněženky. Tento krok se _musí_ provést až po obdržení odpovědi z uzlu, protože uživateli se před podpisem zobrazí náklady na transakci za palivo.
4. Počkejte na schválení uživatele.
5. Odešlete transakci znovu, tentokrát pomocí [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Krok 2 pravděpodobně zabere znatelné množství času, během kterého by se uživatelé divili, zda byl jejich příkaz skutečně přijat uživatelským rozhraním a proč ještě nejsou požádáni o podepsání transakce. To vede ke špatnému uživatelskému zážitku (UX).

Řešením je použití [přípravných hooků](https://wagmi.sh/react/prepare-hooks). Pokaždé, když se změní parametr, okamžitě odešlete uzlu požadavek `eth_estimateGas`. Poté, když uživatel skutečně chce odeslat transakci (v tomto případě stisknutím **Aktualizovat pozdrav**), náklady na palivo jsou známé a uživatel může okamžitě vidět stránku peněženky.

```tsx
  return (
```

Nyní můžeme konečně vytvořit skutečné HTML, které se má vrátit.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Vytvořte komponentu `ShowGreeting` (vysvětleno níže), ale pouze pokud byl pozdrav úspěšně přečten z blockchainu.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Toto je vstupní textové pole, kde si uživatel může nastavit nový pozdrav. Pokaždé, když uživatel stiskne klávesu, zavoláme `greetingChange`, které zavolá `setNewGreeting`. Protože `setNewGreeting` pochází z hooku `useState`, způsobí to opětovné vykreslení komponenty `Greeter`. To znamená, že:

- Musíme specifikovat `value`, abychom zachovali hodnotu nového pozdravu, protože jinak by se vrátila zpět na výchozí hodnotu, prázdný řetězec.
- `usePrepareContractWrite` se volá pokaždé, když se `newGreeting` změní, což znamená, že v připravené transakci bude vždy nejnovější `newGreeting`.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

Pokud `workingTx.write` neexistuje, stále čekáme na informace potřebné k odeslání aktualizace pozdravu, takže je tlačítko zakázáno. Pokud hodnota `workingTx.write` existuje, je to funkce, která se má volat k odeslání transakce.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Nakonec, abychom vám pomohli vidět, co děláme, ukážeme tři objekty, které používáme:

- `readResults`
- `preparedTx`
- `workingTx`

##### Komponenta `ShowGreeting` {#showgreeting-component}

Tato komponenta zobrazuje

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Funkce komponenty přijímá parametr se všemi atributy komponenty.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Komponenta `ShowObject` {#showobject-component}

Pro informační účely používáme komponentu `ShowObject` k zobrazení důležitých objektů (`readResults` pro čtení pozdravu a `preparedTx` a `workingTx` pro transakce, které vytváříme).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Nechceme zaplnit UI všemi informacemi, takže abychom je mohli zobrazit nebo zavřít, používáme značku [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Většina polí se zobrazuje pomocí [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

Výjimkou jsou funkce, které nejsou součástí [standardu JSON](https://www.json.org/json-en.html), takže se musí zobrazovat samostatně.

```tsx
          {funs.map((f, i) =>
```

V rámci JSX je kód uvnitř `{` složených závorek `}` interpretován jako JavaScript. Poté je kód uvnitř `(` kulatých závorek `)` interpretován znovu jako JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React vyžaduje, aby značky ve [stromu DOM](https://www.w3schools.com/js/js_htmldom.asp) měly jedinečné identifikátory. To znamená, že potomci stejné značky (v tomto případě [neuspořádaný seznam](https://www.w3schools.com/tags/tag_ul.asp)) potřebují různé atributy `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Ukončete různé značky HTML.

##### Konečný `export` {#the-final-export}

```tsx
export { Greeter }
```

Komponenta `Greeter` je ta, kterou potřebujeme exportovat pro aplikaci.

#### `src/wagmi.ts` {#wagmi-ts}

Nakonec jsou různé definice související s WAGMI v `src/wagmi.ts`. Nebudu zde vše vysvětlovat, protože většina z toho je šablona, kterou pravděpodobně nebudete muset měnit.

Kód zde není úplně stejný jako [na githubu](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts), protože později v článku přidáme další řetězec ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importujte blockchainy, které aplikace podporuje. Seznam podporovaných řetězců si můžete prohlédnout [v githubu viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Abyste mohli používat [WalletConnect](https://walletconnect.com/), potřebujete ID projektu pro vaši aplikaci. Můžete jej získat na [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

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

### Přidání dalšího blockchainu {#add-blockchain}

V dnešní době existuje mnoho [řešení pro škálování L2](/layer-2/) a možná budete chtít podporovat některá, která viem ještě nepodporuje. K tomu upravte `src/wagmi.ts`. Tyto pokyny vysvětlují, jak přidat [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Importujte typ `defineChain` z viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Přidejte definici sítě.

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

3. Přidejte nový řetězec do volání `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Zajistěte, aby aplikace znala adresu vašich kontraktů na nové síti. V tomto případě upravíme `src/components/Greeter.tsx`:

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

## Závěr {#conclusion}

Samozřejmě vás nezajímá poskytování uživatelského rozhraní pro `Greeter`. Chcete vytvořit uživatelské rozhraní pro své vlastní kontrakty. Chcete-li vytvořit vlastní aplikaci, proveďte tyto kroky:

1. Určete, že chcete vytvořit aplikaci wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Pojmenujte aplikaci.

3. Vyberte framework **React**.

4. Vyberte variantu **Vite**.

5. Můžete [přidat Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Nyní jděte a zpřístupněte své kontrakty širokému světu.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

