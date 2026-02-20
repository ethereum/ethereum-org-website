---
title: "Tworzenie interfejsu użytkownika dla Twojego kontraktu"
description: "Korzystając z nowoczesnych komponentów, takich jak TypeScript, React, Vite i Wagmi, omówimy nowoczesny, ale minimalistyczny interfejs użytkownika i dowiemy się, jak połączyć portfel z interfejsem użytkownika, wywołać inteligentny kontrakt w celu odczytania informacji, wysłać transakcję do inteligentnego kontraktu i monitorować zdarzenia z inteligentnego kontraktu w celu identyfikacji zmian."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: pl
sidebarDepth: 3
---

Znalazłeś funkcję, której potrzebujemy w ekosystemie Ethereum. Napisałeś inteligentne kontrakty, aby go zaimplementować, a może nawet powiązany kod, który działa offchain. To świetnie! Niestety, bez interfejsu użytkownika nie będziesz mieć żadnych użytkowników, a ostatnim razem, gdy pisałeś stronę internetową, ludzie używali modemów dial-up, a JavaScript był nowością.

Ten artykuł jest dla Ciebie. Zakładam, że znasz programowanie i może trochę JavaScript i HTML, ale Twoje umiejętności w zakresie interfejsu użytkownika są przestarzałe i nieaktualne. Razem przeanalizujemy prostą, nowoczesną aplikację, abyś zobaczył, jak się to robi w dzisiejszych czasach.

## Dlaczego jest to ważne {#why-important}

Teoretycznie możesz po prostu kazać ludziom używać [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) lub [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract), aby wchodzić w interakcję z Twoimi kontraktami. To będzie świetne dla doświadczonych Eterean. Ale my staramy się służyć [kolejnemu miliardowi ludzi](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Nie stanie się to bez wspaniałego doświadczenia użytkownika, a przyjazny interfejs użytkownika jest tego dużą częścią.

## Aplikacja Greeter {#greeter-app}

Istnieje wiele teorii na temat działania nowoczesnego interfejsu użytkownika i [wiele dobrych stron](https://react.dev/learn/thinking-in-react), [które to wyjaśniają](https://wagmi.sh/core/getting-started). Zamiast powtarzać świetną pracę wykonaną przez te strony, założę, że wolisz uczyć się przez działanie i zaczniesz od aplikacji, którą możesz się pobawić. Nadal potrzebujesz teorii, aby załatwić sprawy, i do tego dojdziemy - po prostu przejdziemy plik źródłowy po pliku źródłowym i omówimy sprawy, gdy do nich dojdziemy.

### Instalacja {#installation}

1. W razie potrzeby dodaj [blockchain Holesky](https://chainlist.org/?search=holesky&testnets=true) do swojego portfela i [pobierz testowe ETH](https://www.holeskyfaucet.io/).

2. Sklonuj repozytorium na GitHubie.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Zainstaluj niezbędne pakiety.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Uruchom aplikację.

   ```sh
   pnpm dev
   ```

5. Przejdź do adresu URL wyświetlanego przez aplikację. W większości przypadków jest to [http://localhost:5173/](http://localhost:5173/).

6. Możesz zobaczyć kod źródłowy kontraktu, nieco zmodyfikowaną wersję Greeter od Hardhat, [na eksploratorze blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Przegląd plików {#file-walk-through}

#### `index.html` {#index-html}

Ten plik jest standardowym szablonem HTML, z wyjątkiem tej linii, która importuje plik skryptu.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Rozszerzenie pliku mówi nam, że ten plik jest [komponentem React](https://www.w3schools.com/react/react_components.asp) napisanym w [TypeScript](https://www.typescriptlang.org/), rozszerzeniem JavaScriptu, które obsługuje [sprawdzanie typów](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript jest kompilowany do JavaScriptu, więc możemy go używać do wykonywania po stronie klienta.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importuj kod biblioteki, którego potrzebujemy.

```tsx
import { App } from './App'
```

Importuj komponent React, który implementuje aplikację (patrz poniżej).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Utwórz główny komponent React. Parametr `render` to [JSX](https://www.w3schools.com/react/react_jsx.asp), język rozszerzeń, który używa zarówno HTML, jak i JavaScript/TypeScript. Wykrzyknik tutaj mówi komponentowi TypeScript: "nie wiesz, że `document.getElementById('root')` będzie prawidłowym parametrem dla `ReactDOM.createRoot`, ale nie martw się - jestem deweloperem i mówię ci, że będzie".

```tsx
  <React.StrictMode>
```

Aplikacja znajduje się wewnątrz [komponentu `React.StrictMode`](https://react.dev/reference/react/StrictMode). Ten komponent informuje bibliotekę React o wstawieniu dodatkowych kontroli debugowania, co jest przydatne podczas tworzenia.

```tsx
    <WagmiConfig config={config}>
```

Aplikacja znajduje się również wewnątrz [komponentu `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Biblioteka wagmi (we are going to make it)](https://wagmi.sh/) łączy definicje interfejsu użytkownika React z [biblioteką viem](https://viem.sh/) do pisania zdecentralizowanej aplikacji Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

I wreszcie [komponent `RainbowKitProvider`](https://www.rainbowkit.com/). Ten komponent obsługuje logowanie i komunikację między portfelem a aplikacją.

```tsx
        <App />
```

Teraz możemy mieć komponent dla aplikacji, który faktycznie implementuje interfejs użytkownika. Znak `/>` na końcu komponentu informuje React, że ten komponent nie ma w sobie żadnych definicji, zgodnie ze standardem XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Oczywiście musimy zamknąć pozostałe komponenty.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

To jest standardowy sposób tworzenia komponentu React – zdefiniowanie funkcji, która jest wywoływana za każdym razem, gdy musi zostać wyrenderowana. Ta funkcja zazwyczaj ma na górze kod TypeScript lub JavaScript, po którym następuje instrukcja `return`, która zwraca kod JSX.

```tsx
  const { isConnected } = useAccount()
```

Tutaj używamy [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount), aby sprawdzić, czy jesteśmy połączeni z blockchainem przez portfel, czy nie.

Zgodnie z konwencją, w React funkcje o nazwie `use...` są [hookami](https://www.w3schools.com/react/react_hooks.asp), które zwracają pewien rodzaj danych. Kiedy używasz takich hooków, nie tylko Twój komponent otrzymuje dane, ale gdy te dane się zmieniają, komponent jest ponownie renderowany z zaktualizowanymi informacjami.

```tsx
  return (
    <>
```

JSX komponentu React _musi_ zwrócić jeden komponent. Gdy mamy wiele komponentów i nie mamy niczego, co "naturalnie" je opakowuje, używamy pustego komponentu (`<> ...` </>`), aby uczynić je pojedynczym komponentem.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Komponent [`ConnectButton`](https://www.rainbowkit.com/docs/connect-button) otrzymujemy z RainbowKit. Gdy nie jesteśmy połączeni, daje nam przycisk `Connect Wallet`, który otwiera okno modalne, które wyjaśnia działanie portfeli i pozwala wybrać, którego używasz. Gdy jesteśmy połączeni, wyświetla używany przez nas blockchain, adres naszego konta i saldo ETH. Możemy użyć tych wyświetlaczy, aby przełączyć sieć lub się rozłączyć.

```tsx
      {isConnected && (
```

Gdy musimy wstawić rzeczywisty JavaScript (lub TypeScript, który zostanie skompilowany do JavaScriptu) do JSX, używamy nawiasów (`{}`).

Składnia `a && b` jest skrótem od [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Oznacza to, że jeśli `a`jest prawdziwe, wynikiem jest`b`, a w przeciwnym razie wynikiem jest `a`(które może być`false`, `0` itp.). Jest to łatwy sposób, aby powiedzieć React, że komponent powinien być wyświetlany tylko wtedy, gdy spełniony jest określony warunek.

W tym przypadku chcemy pokazać użytkownikowi `Greeter` tylko wtedy, gdy użytkownik jest połączony z blockchainem.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Ten plik zawiera większość funkcjonalności interfejsu użytkownika. Zawiera definicje, które normalnie znajdowałyby się w wielu plikach, ale ponieważ jest to samouczek, program jest zoptymalizowany pod kątem łatwości zrozumienia za pierwszym razem, a nie wydajności czy łatwości konserwacji.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Używamy tych funkcji bibliotecznych. Ponownie, są one wyjaśnione poniżej, w miejscu ich użycia.

```tsx
import { AddressType } from 'abitype'
```

[Biblioteka `abitype`](https://abitype.dev/) dostarcza nam definicje TypeScript dla różnych typów danych Ethereum, takich jak [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI - binarny interfejs aplikacji dla kontraktu `Greeter`.
Jeśli tworzysz kontrakty i interfejs użytkownika w tym samym czasie, normalnie umieszczasz je w tym samym repozytorium i używasz ABI wygenerowanego przez kompilator Solidity jako pliku w swojej aplikacji. Jednak nie jest to tutaj konieczne, ponieważ kontrakt jest już opracowany i nie ulegnie zmianie.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript jest silnie typowany. Używamy tej definicji do określenia adresu, na którym kontrakt `Greeter` jest wdrożony na różnych łańcuchach. Kluczem jest liczba (chainId), a wartością jest `AddressType` (adres).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Adres kontraktu na dwóch obsługiwanych sieciach: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) i [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Uwaga: W rzeczywistości istnieje trzecia definicja, dla Redstone Holesky, zostanie ona wyjaśniona poniżej.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Ten typ jest używany jako parametr komponentu `ShowObject` (wyjaśnionego później). Zawiera nazwę obiektu i jego wartość, które są wyświetlane w celach debugowania.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

W dowolnym momencie możemy wiedzieć, jakie jest powitanie (ponieważ odczytaliśmy je z blockchainu) lub nie wiedzieć (ponieważ jeszcze go nie otrzymaliśmy). Dlatego warto mieć typ, który może być albo ciągiem znaków, albo niczym.

##### Komponent `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Wreszcie możemy zdefiniować komponent.

```tsx
  const { chain } = useNetwork()
```

Informacje o łańcuchu, którego używamy, dzięki uprzejmości [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Ponieważ jest to hak (`use...`), za każdym razem, gdy ta informacja się zmienia, komponent jest ponownie rysowany.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Adres kontraktu Greeter, który różni się w zależności od łańcucha (i który jest `undefined`, jeśli nie mamy informacji o łańcuchu lub jesteśmy na łańcuchu bez tego kontraktu).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Brak argumentów
    watch: true
  })
```

Hak [`useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) odczytuje informacje z kontraktu. Możesz zobaczyć dokładnie, jakie informacje zwraca, rozwijając `readResults` w interfejsie użytkownika. W tym przypadku chcemy, aby nadal szukał, abyśmy byli informowani o zmianie powitania.

**Uwaga:** Moglibyśmy nasłuchiwać [zdarzeń `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs), aby wiedzieć, kiedy zmienia się powitanie i aktualizować je w ten sposób. Jednak, chociaż może to być bardziej wydajne, nie będzie miało zastosowania we wszystkich przypadkach. Gdy użytkownik przełącza się na inny łańcuch, powitanie również się zmienia, ale tej zmianie nie towarzyszy zdarzenie. Moglibyśmy mieć jedną część kodu nasłuchującą zdarzeń, a drugą do identyfikowania zmian łańcucha, ale byłoby to bardziej skomplikowane niż tylko ustawienie [parametru `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Hook [`useState`](https://www.w3schools.com/react/react_usestate.asp) React pozwala nam zdefiniować zmienną stanu, której wartość utrzymuje się od jednego renderowania komponentu do drugiego. Wartością początkową jest parametr, w tym przypadku pusty ciąg znaków.

Hook `useState` zwraca listę z dwiema wartościami:

1. Bieżąca wartość zmiennej stanu.
2. Funkcja do modyfikowania zmiennej stanu w razie potrzeby. Ponieważ jest to hak, za każdym razem, gdy jest wywoływany, komponent jest ponownie renderowany.

W tym przypadku używamy zmiennej stanu dla nowego powitania, które użytkownik chce ustawić.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Jest to procedura obsługi zdarzeń dla zmiany pola wprowadzania nowego powitania. Typ [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) określa, że jest to procedura obsługi zmiany wartości elementu wejściowego HTML. Część `<HTMLInputElement>` jest używana, ponieważ jest to [typ generyczny](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

To jest proces przesyłania transakcji blockchain z perspektywy klienta:

1. Wyślij transakcję do węzła w łańcuchu bloków za pomocą [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Poczekaj na odpowiedź z węzła.
3. Po otrzymaniu odpowiedzi, poproś użytkownika o podpisanie transakcji za pośrednictwem portfela. Ten krok _musi_ nastąpić po otrzymaniu odpowiedzi węzła, ponieważ użytkownikowi wyświetlany jest koszt gazu transakcji przed jej podpisaniem.
4. Poczekaj na zatwierdzenie przez użytkownika.
5. Wyślij transakcję ponownie, tym razem za pomocą [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Krok 2 prawdopodobnie zajmie zauważalną ilość czasu, podczas którego użytkownicy zastanawialiby się, czy ich polecenie zostało naprawdę odebrane przez interfejs użytkownika i dlaczego nie są jeszcze proszeni o podpisanie transakcji. To powoduje złe doświadczenie użytkownika (UX).

Rozwiązaniem jest użycie [hooków przygotowawczych](https://wagmi.sh/react/prepare-hooks). Za każdym razem, gdy parametr się zmienia, natychmiast wysyłaj do węzła żądanie `eth_estimateGas`. Następnie, gdy użytkownik faktycznie chce wysłać transakcję (w tym przypadku przez naciśnięcie **Update greeting**), koszt gazu jest znany, a użytkownik może natychmiast zobaczyć stronę portfela.

```tsx
  return (
```

Teraz możemy wreszcie utworzyć rzeczywisty kod HTML do zwrócenia.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Utwórz komponent `ShowGreeting` (wyjaśniony poniżej), ale tylko wtedy, gdy powitanie zostało pomyślnie odczytane z blockchainu.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Jest to pole tekstowe, w którym użytkownik może ustawić nowe powitanie. Za każdym razem, gdy użytkownik naciśnie klawisz, wywołujemy `greetingChange`, które wywołuje `setNewGreeting`. Ponieważ `setNewGreeting` pochodzi z hooka `useState`, powoduje to ponowne renderowanie komponentu `Greeter`. Oznacza to, że:

- Musimy określić `value`, aby zachować wartość nowego powitania, ponieważ w przeciwnym razie powróciłoby ono do wartości domyślnej, czyli pustego ciągu znaków.
- `usePrepareContractWrite` jest wywoływane za każdym razem, gdy `newGreeting` się zmienia, co oznacza, że zawsze będzie miało najnowsze `newGreeting` w przygotowanej transakcji.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

Jeśli nie ma `workingTx.write`, oznacza to, że wciąż czekamy na informacje niezbędne do wysłania aktualizacji powitania, więc przycisk jest wyłączony. Jeśli istnieje wartość `workingTx.write`, to jest to funkcja do wywołania w celu wysłania transakcji.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Na koniec, aby pomóc Ci zobaczyć, co robimy, pokaż trzy obiekty, których używamy:

- `readResults`
- `preparedTx`
- `workingTx`

##### Komponent `ShowGreeting` {#showgreeting-component}

Ten komponent pokazuje

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Funkcja komponentu otrzymuje parametr ze wszystkimi atrybutami komponentu.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Komponent `ShowObject` {#showobject-component}

W celach informacyjnych używamy komponentu `ShowObject` do pokazania ważnych obiektów (`readResults` do odczytywania powitania oraz `preparedTx` i `workingTx` do transakcji, które tworzymy).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Nie chcemy zaśmiecać interfejsu użytkownika wszystkimi informacjami, więc aby umożliwić ich przeglądanie lub zamykanie, używamy znacznika [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Większość pól jest wyświetlana za pomocą [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

Wyjątkiem są funkcje, które nie są częścią [standardu JSON](https://www.json.org/json-en.html), więc muszą być wyświetlane osobno.

```tsx
          {funs.map((f, i) =>
```

Wewnątrz JSX kod w nawiasach klamrowych `{` `}` jest interpretowany jako JavaScript. Następnie kod w nawiasach zwykłych `(` `)` jest ponownie interpretowany jako JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React wymaga, aby znaczniki w [drzewie DOM](https://www.w3schools.com/js/js_htmldom.asp) miały odrębne identyfikatory. Oznacza to, że dzieci tego samego znacznika (w tym przypadku [lista nieuporządkowana](https://www.w3schools.com/tags/tag_ul.asp)) potrzebują różnych atrybutów `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Zakończ różne znaczniki HTML.

##### Ostateczny `export` {#the-final-export}

```tsx
export { Greeter }
```

Komponent `Greeter` jest tym, który musimy wyeksportować dla aplikacji.

#### `src/wagmi.ts` {#wagmi-ts}

Na koniec, różne definicje związane z WAGMI znajdują się w `src/wagmi.ts`. Nie będę tutaj wszystkiego wyjaśniać, ponieważ większość z tego to szablon, którego prawdopodobnie nie będziesz musiał zmieniać.

Kod tutaj nie jest dokładnie taki sam jak [na GitHubie](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts), ponieważ w dalszej części artykułu dodajemy kolejny łańcuch ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importuj łańcuchy bloków, które obsługuje aplikacja. Listę obsługiwanych łańcuchów można zobaczyć [w viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Aby móc korzystać z [WalletConnect](https://walletconnect.com/), potrzebujesz identyfikatora projektu dla swojej aplikacji. Możesz go uzyskać na stronie [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

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

### Dodawanie kolejnego blockchaina {#add-blockchain}

Obecnie istnieje wiele [rozwiązań skalujących L2](/layer-2/) i możesz chcieć obsługiwać niektóre, których viem jeszcze nie obsługuje. Aby to zrobić, zmodyfikuj `src/wagmi.ts`. Te instrukcje wyjaśniają, jak dodać [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Zaimportuj typ `defineChain` z viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Dodaj definicję sieci.

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

3. Dodaj nowy łańcuch do wywołania `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Upewnij się, że aplikacja zna adres Twoich kontraktów w nowej sieci. W tym przypadku modyfikujemy `src/components/Greeter.tsx`:

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

## Wnioski {#conclusion}

Oczywiście, tak naprawdę nie zależy Ci na udostępnieniu interfejsu użytkownika dla `Greeter`. Chcesz stworzyć interfejs użytkownika dla własnych kontraktów. Aby utworzyć własną aplikację, wykonaj następujące kroki:

1. Określ, aby utworzyć aplikację wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Nazwij aplikację.

3. Wybierz framework **React**.

4. Wybierz wariant **Vite**.

5. Możesz [dodać zestaw Rainbow](https://www.rainbowkit.com/docs/installation#manual-setup).

Teraz idź i spraw, aby Twoje kontrakty były użyteczne dla całego świata.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).

