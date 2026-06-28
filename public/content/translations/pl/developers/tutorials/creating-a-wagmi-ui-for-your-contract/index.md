---
title: "Tworzenie interfejsu użytkownika dla twojego kontraktu"
description: "Używając nowoczesnych komponentów, takich jak TypeScript, React, Vite i Wagmi, omówimy nowoczesny, ale minimalistyczny interfejs użytkownika i dowiemy się, jak podłączyć portfel do interfejsu, wywołać inteligentny kontrakt w celu odczytania informacji, wysłać transakcję do inteligentnego kontraktu oraz monitorować zdarzenia z inteligentnego kontraktu w celu identyfikacji zmian."
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: "Interfejs użytkownika z WAGMI"
published: 2023-11-01
lang: pl
sidebarDepth: 3
---

Znalazłeś funkcję, której potrzebujemy w ekosystemie Ethereum. Napisałeś inteligentne kontrakty, aby ją zaimplementować, a może nawet powiązany kod, który działa jako pozałańcuchowy. To świetnie! Niestety, bez interfejsu użytkownika nie będziesz miał żadnych użytkowników, a ostatnim razem, gdy pisałeś stronę internetową, ludzie używali modemów telefonicznych, a JavaScript był nowością.

Ten artykuł jest dla ciebie. Zakładam, że znasz się na programowaniu, a może trochę na JavaScript i HTML, ale twoje umiejętności tworzenia interfejsów użytkownika są zardzewiałe i przestarzałe. Razem przeanalizujemy prostą, nowoczesną aplikację, abyś zobaczył, jak to się robi w dzisiejszych czasach.

## Dlaczego to jest ważne {#why-important}

W teorii mógłbyś po prostu kazać ludziom używać [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) lub [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) do interakcji z twoimi kontraktami. To świetne rozwiązanie dla doświadczonych użytkowników Ethereum. Ale my staramy się obsłużyć [kolejny miliard ludzi](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). To się nie wydarzy bez świetnego doświadczenia użytkownika, a przyjazny interfejs użytkownika jest jego dużą częścią.

## Aplikacja Greeter {#greeter-app}

Istnieje wiele teorii na temat tego, jak działa nowoczesny interfejs użytkownika, oraz [wiele dobrych stron](https://react.dev/learn/thinking-in-react), [które to wyjaśniają](https://wagmi.sh/core/getting-started). Zamiast powtarzać świetną pracę wykonaną przez te strony, założę, że wolisz uczyć się w praktyce i zaczniesz od aplikacji, którą możesz się pobawić. Nadal potrzebujesz teorii, aby coś osiągnąć, i dojdziemy do niej – po prostu przejdziemy plik źródłowy po pliku źródłowym i omówimy wszystko po kolei.

### Instalacja {#installation}

1. Aplikacja używa sieci testowej [Sepolia](https://sepolia.dev/). W razie potrzeby [zdobądź testowe ETH w sieci Sepolia](/developers/docs/networks/#sepolia) i [dodaj sieć Sepolia do swojego portfela](https://chainlist.org/chain/11155111).

2. Sklonuj repozytorium GitHub i zainstaluj niezbędne pakiety.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Aplikacja korzysta z darmowych punktów dostępu, które mają ograniczenia wydajnościowe. Jeśli chcesz użyć dostawcy [węzła jako usługi (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/), zamień adresy URL w [`src/wagmi.ts`](#wagmi-ts).

4. Uruchom aplikację.

   ```sh
   npm run dev
   ```

5. Przejdź pod adres URL wyświetlony przez aplikację. W większości przypadków jest to [http://localhost:5173/](http://localhost:5173/).

6. Możesz zobaczyć kod źródłowy kontraktu, zmodyfikowaną wersję Greeter z Hardhata, [w eksploratorze blockchain](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Przegląd plików {#file-walk-through}

#### `index.html` {#index-html}

Ten plik to standardowy szablon HTML, z wyjątkiem tej linii, która importuje plik skryptu.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Rozszerzenie pliku wskazuje, że jest to [komponent React](https://www.w3schools.com/react/react_components.asp) napisany w [TypeScript](https://www.typescriptlang.org/), rozszerzeniu JavaScript, które obsługuje [sprawdzanie typów](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript jest kompilowany do JavaScript, więc możemy go używać po stronie klienta.

Ten plik jest wyjaśniony głównie na wypadek, gdybyś był zainteresowany. Zazwyczaj nie modyfikuje się tego pliku, lecz [`src/App.tsx`](#app-tsx) oraz pliki, które on importuje.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importujemy potrzebny kod biblioteki.

```tsx
import App from './App.tsx'
```

Importujemy komponent React, który implementuje aplikację (zobacz poniżej).

```tsx
import { config } from './wagmi.ts'
```

Importujemy konfigurację [Wagmi](https://wagmi.sh/), która zawiera konfigurację blockchaina.

```tsx
const queryClient = new QueryClient()
```

Tworzy nową instancję menedżera pamięci podręcznej [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Ten obiekt będzie przechowywać:

- Zbuforowane wywołania RPC
- Odczyty z kontraktu
- Stan ponownego pobierania w tle

Potrzebujemy menedżera pamięci podręcznej, ponieważ Wagmi v3 używa wewnętrznie React Query.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Tworzymy główny komponent React. Parametrem dla `render` jest [JSX](https://www.w3schools.com/react/react_jsx.asp), język rozszerzeń, który używa zarówno HTML, jak i JavaScript/TypeScript. Wykrzyknik w tym miejscu mówi komponentowi TypeScript: „nie wiesz, że `document.getElementById('root')` będzie prawidłowym parametrem dla `ReactDOM.createRoot`, ale nie martw się – jestem programistą i mówię ci, że tak będzie”.

```tsx
  <React.StrictMode>
```

Aplikacja znajduje się wewnątrz [komponentu `React.StrictMode`](https://react.dev/reference/react/StrictMode). Ten komponent mówi bibliotece React, aby wstawiła dodatkowe kontrole debugowania, co jest przydatne podczas programowania.

```tsx
    <WagmiProvider config={config}>
```

Aplikacja znajduje się również wewnątrz [komponentu `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Biblioteka Wagmi (którą zaraz stworzymy)](https://wagmi.sh/) łączy definicje interfejsu użytkownika React z [biblioteką Viem](https://viem.sh/) w celu napisania zdecentralizowanej aplikacji (dapp) na Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

I na koniec dodajemy dostawcę React Query, aby każdy komponent aplikacji mógł korzystać z buforowanych zapytań.

```tsx
        <App />
```

Teraz możemy dodać komponent dla aplikacji, który faktycznie implementuje interfejs użytkownika. `/>` na końcu komponentu mówi Reactowi, że ten komponent nie ma w sobie żadnych definicji, zgodnie ze standardem XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Oczywiście musimy zamknąć pozostałe komponenty.

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

Importujemy potrzebne biblioteki, a także [komponent `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Identyfikator łańcucha Sepolia.

```
function App() {
```

To standardowy sposób tworzenia komponentu React: definiujemy funkcję, która jest wywoływana za każdym razem, gdy musi zostać wyrenderowana. Ta funkcja zazwyczaj zawiera kod TypeScript lub JavaScript, po którym następuje instrukcja `return` zwracająca kod JSX.

```tsx
  const connection = useConnection()
```

Używamy [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection), aby uzyskać informacje związane z bieżącym połączeniem, takie jak adres i `chainId`.

Zgodnie z konwencją, w React funkcje nazywane `use...` to [hooki](https://www.w3schools.com/react/react_hooks.asp). Te funkcje nie tylko zwracają dane do komponentu; zapewniają również jego ponowne wyrenderowanie (funkcja komponentu jest wykonywana ponownie, a jej wynik zastępuje poprzedni w HTML), gdy te dane ulegną zmianie.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Używamy [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect), aby uzyskać informacje o połączeniu z portfelem.

```tsx
  const { disconnect } = useDisconnect()
```

[Ten hook](https://wagmi.sh/react/api/hooks/useDisconnect) daje nam funkcję do rozłączenia się z portfelem.

```tsx
  const { switchChain } = useSwitchChain()
```

[Ten hook](https://wagmi.sh/react/api/hooks/useSwitchChain) pozwala nam przełączać łańcuchy.

```tsx
  useEffect(() => {
```

Hook Reacta [`useEffect`](https://react.dev/reference/react/useEffect) pozwala na uruchomienie funkcji za każdym razem, gdy zmienia się wartość zmiennej, w celu synchronizacji systemu zewnętrznego.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Jeśli jesteśmy połączeni, ale nie z blockchainem Sepolia, przełączamy się na sieć Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Uruchamiamy funkcję ponownie za każdym razem, gdy zmienia się status połączenia lub chainId połączenia.

```tsx
  return (
    <>
```

JSX komponentu React _musi_ zwracać pojedynczy komponent HTML. Kiedy mamy wiele komponentów i nie potrzebujemy kontenera, aby je wszystkie owinąć, używamy pustego komponentu (`<> ... </>`), aby połączyć je w jeden komponent.

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

Dostarczamy informacje o bieżącym połączeniu. W JSX `{<expression>}` oznacza ewaluację wyrażenia jako JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Składnia `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

To standardowy sposób umieszczania instrukcji warunkowych if wewnątrz JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX jest zgodny ze standardem XML, który jest bardziej rygorystyczny niż HTML. Jeśli znacznik nie ma odpowiadającego mu znacznika zamykającego, _musi_ mieć ukośnik (`/`) na końcu, aby go zakończyć.

Tutaj mamy dwa takie znaczniki: `<Greeter />` (który w rzeczywistości zawiera kod HTML komunikujący się z kontraktem) oraz [`<hr />` dla linii poziomej](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Jeśli użytkownik kliknie ten przycisk, wywołujemy funkcję `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Jeśli _nie_ jesteśmy połączeni, pokazujemy niezbędne opcje do połączenia z portfelem.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

W `connectors` mamy listę konektorów. Używamy [`map`](https://www.w3schools.com/jsref/jsref_map.asp), aby zamienić ją w listę przycisków JSX do wyświetlenia.

```tsx
            <button
              key={connector.uid}
```

W JSX konieczne jest, aby znaczniki „rodzeństwa” (znaczniki pochodzące od tego samego rodzica) miały różne identyfikatory.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Przyciski konektorów.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Dostarczamy dodatkowe informacje. Składnia wyrażenia `<variable>?.<field>` mówi JavaScriptowi, że jeśli zmienna jest zdefiniowana, ma ewaluować do tego pola. Jeśli zmienna nie jest zdefiniowana, to wyrażenie ewaluuje do `undefined`.

Wyrażenie `error.message`, gdy nie ma błędu, zgłosiłoby wyjątek. Użycie `error?.message` pozwala nam uniknąć tego problemu.

#### `src/Greeter.tsx` {#greeter-tsx}

Ten plik zawiera większość funkcjonalności interfejsu użytkownika. Obejmuje definicje, które normalnie znajdowałyby się w wielu plikach, ale ponieważ jest to samouczek, program jest zoptymalizowany pod kątem łatwości zrozumienia za pierwszym razem, a nie wydajności czy łatwości utrzymania.

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

Używamy tych funkcji bibliotecznych. Ponownie, są one wyjaśnione poniżej, w miejscach, gdzie są używane.

```tsx
import { AddressType } from 'abitype'
```

[Biblioteka `abitype`](https://abitype.dev/) dostarcza nam definicje TypeScript dla różnych typów danych Ethereum, takich jak [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI dla kontraktu `Greeter`.
Jeśli tworzysz kontrakty i interfejs użytkownika w tym samym czasie, normalnie umieściłbyś je w tym samym repozytorium i użył ABI wygenerowanego przez kompilator Solidity jako pliku w swojej aplikacji. Jednak tutaj nie jest to konieczne, ponieważ kontrakt jest już opracowany i nie ulegnie zmianie.

Używamy [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions), aby powiedzieć TypeScriptowi, że jest to _prawdziwa_ stała. Normalnie, gdy określasz w JavaScript `const x = {"a": 1}`, możesz zmienić wartość w `x`, po prostu nie możesz do niej przypisać nowej wartości.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript jest silnie typowany. Używamy tej definicji, aby określić adres, pod którym kontrakt `Greeter` jest wdrożony w różnych łańcuchach. Kluczem jest liczba (chainId), a wartością jest `AddressType` (adres).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Adres kontraktu w sieci [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Komponent `Timer` {#timer-component}

Komponent `Timer` pokazuje liczbę sekund od danego momentu. Jest to ważne ze względów użyteczności. Kiedy użytkownicy coś robią, oczekują natychmiastowej reakcji. W blockchainach jest to często niemożliwe, ponieważ nic się nie dzieje, dopóki transakcja nie zostanie umieszczona w bloku. Jednym z rozwiązań jest pokazanie, ile czasu minęło od wykonania akcji przez użytkownika, aby mógł on zdecydować, czy wymagany czas jest rozsądny.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Komponent `Timer` przyjmuje jeden parametr, `lastUpdate`, który jest czasem ostatniej akcji.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Musimy mieć stan (zmienną powiązaną z komponentem) i aktualizować go, aby komponent działał poprawnie. Ale nigdy nie musimy go odczytywać, więc nie zawracamy sobie głowy tworzeniem zmiennej.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Funkcja [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) pozwala nam zaplanować okresowe uruchamianie funkcji. W tym przypadku co sekundę. Funkcja wywołuje `setNow` w celu aktualizacji stanu, więc komponent `Timer` zostanie ponownie wyrenderowany. Owijamy to w [`useEffect`](https://react.dev/reference/react/useEffect) z pustą listą zależności, aby stało się to tylko raz, a nie za każdym razem, gdy komponent jest renderowany.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Obliczamy liczbę sekund od ostatniej aktualizacji i zwracamy ją.

##### Komponent `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Wreszcie możemy zdefiniować komponent.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informacje o łańcuchu i koncie, którego używamy, dzięki uprzejmości [Wagmi](https://wagmi.sh/). Ponieważ jest to hook (`use...`), komponent jest ponownie renderowany za każdym razem, gdy te informacje ulegną zmianie.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Adres kontraktu Greeter, który wynosi `undefined`, jeśli nie mamy informacji o łańcuchu lub jesteśmy w łańcuchu bez tego kontraktu.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Brak argumentów
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) wywołuje funkcję `greet` [kontraktu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Hook `useState`](https://www.w3schools.com/react/react_usestate.asp) Reacta pozwala nam określić zmienną stanu, której wartość utrzymuje się od jednego renderowania komponentu do drugiego. Wartością początkową jest parametr, w tym przypadku pusty ciąg znaków.

Hook `useState` zwraca listę z dwiema wartościami:

1. Bieżąca wartość zmiennej stanu.
2. Funkcja do modyfikacji zmiennej stanu w razie potrzeby. Ponieważ jest to hook, za każdym razem, gdy jest wywoływany, komponent jest renderowany ponownie.

W tym przypadku używamy zmiennej stanu dla nowego powitania, które użytkownik chce ustawić.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Jeśli wielu użytkowników korzysta z tego samego kontraktu w tym samym czasie, mogą nadpisywać nawzajem swoje powitania. Dla użytkowników wyglądałoby to tak, jakby aplikacja działała nieprawidłowo. Jeśli aplikacja pokaże, kto ostatnio ustawił powitanie, użytkownik będzie wiedział, że to był ktoś inny i że aplikacja działa poprawnie.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Użytkownicy lubią widzieć, że ich działania przynoszą natychmiastowy efekt. Jednak w blockchainie tak nie jest. Te zmienne stanu pozwalają nam przynajmniej wyświetlić coś użytkownikom, aby wiedzieli, że ich akcja jest w toku.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Jeśli `readResults` powyżej zmieni dane i nie jest ustawione na wartość fałszywą (na przykład `undefined`), aktualizujemy bieżące powitanie na to odczytane z blockchaina. Aktualizujemy również status.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Nasłuchujemy zdarzeń `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` oznacza, że jeśli wartość to `false` lub wartość, która ewaluuje jako fałsz, taka jak `undefined`, `0` lub pusty ciąg znaków, całe wyrażenie to `false`. Dla każdej innej wartości jest to `true`. Jest to sposób na konwersję wartości na typ logiczny (boolean), ponieważ jeśli nie ma `greeterAddr`, nie chcemy nasłuchiwać zdarzeń.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Kiedy widzimy logi (co dzieje się, gdy widzimy nowe zdarzenie), oznacza to, że powitanie zostało zmodyfikowane. W takim przypadku możemy zaktualizować `currentGreeting` i `lastSetterAddress` do nowych wartości. Chcemy również zaktualizować wyświetlany status.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Kiedy aktualizujemy status, chcemy zrobić dwie rzeczy:

1. Zaktualizować ciąg znaków statusu (`status`)
2. Zaktualizować czas ostatniej aktualizacji statusu (`statusTime`) na teraz.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

To jest procedura obsługi zdarzeń dla zmian w polu wprowadzania nowego powitania. Moglibyśmy określić typ parametru `evt`, ale TypeScript jest językiem z opcjonalnym typowaniem. Ponieważ ta funkcja jest wywoływana tylko raz, w procedurze obsługi zdarzeń HTML, nie sądzę, aby było to konieczne.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Funkcja do zapisu w kontrakcie. Jest podobna do [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), ale umożliwia lepsze aktualizacje statusu.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Oto proces przesyłania transakcji blockchain z perspektywy klienta:

1. Wysłanie transakcji do węzła w blockchainie za pomocą [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Oczekiwanie na odpowiedź z węzła.
3. Po otrzymaniu odpowiedzi, poproszenie użytkownika o podpisanie transakcji przez portfel. Ten krok _musi_ nastąpić po otrzymaniu odpowiedzi z węzła, ponieważ użytkownikowi wyświetlany jest koszt gazu transakcji przed jej podpisaniem.
4. Oczekiwanie na zatwierdzenie przez użytkownika.
5. Ponowne wysłanie transakcji, tym razem za pomocą [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Krok 2 prawdopodobnie zajmie zauważalną ilość czasu, podczas którego użytkownicy mogą zastanawiać się, czy ich polecenie zostało odebrane przez interfejs użytkownika i dlaczego nie są jeszcze proszeni o podpisanie transakcji. Tworzy to słabe doświadczenie użytkownika (UX).

Jednym z rozwiązań jest wysyłanie `eth_estimateGas` za każdym razem, gdy zmienia się parametr. Wtedy, gdy użytkownik faktycznie chce wysłać transakcję (w tym przypadku naciskając **Update greeting**), koszt gazu jest znany, a użytkownik może natychmiast zobaczyć stronę portfela.

```tsx
  return (
```

Teraz możemy wreszcie utworzyć właściwy kod HTML do zwrócenia.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Pokazujemy bieżące powitanie.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Jeśli wiemy, kto ostatnio ustawił powitanie, wyświetlamy tę informację. `Greeter` nie śledzi tych informacji, a my nie chcemy szukać wstecz zdarzeń `SetGreeting`, więc otrzymujemy je tylko wtedy, gdy powitanie zostanie zmienione podczas działania naszej aplikacji.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

To jest pole tekstowe, w którym użytkownik może ustawić nowe powitanie. Za każdym razem, gdy użytkownik naciska klawisz, wywołujemy `greetingChange`, co z kolei wywołuje `setNewGreeting`. Ponieważ `setNewGreeting` pochodzi z `useState`, powoduje to ponowne wyrenderowanie komponentu `Greeter`. Oznacza to, że:

- Musimy określić `value`, aby zachować wartość nowego powitania, ponieważ w przeciwnym razie powróciłoby ono do wartości domyślnej, czyli pustego ciągu znaków.
- `simulation` jest również aktualizowane za każdym razem, gdy zmienia się `newGreeting`, co oznacza, że otrzymamy symulację z prawidłowym powitaniem. Może to być istotne, ponieważ koszt gazu zależy od rozmiaru danych wywołania, który zależy od długości ciągu znaków.

```tsx
      <button disabled={!simulation.data}
```

Włączamy przycisk dopiero wtedy, gdy mamy informacje potrzebne do wysłania transakcji.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Aktualizujemy status. W tym momencie użytkownik musi potwierdzić operację w portfelu.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` zwraca wynik dopiero po faktycznym wysłaniu transakcji. Pozwala nam to pokazać użytkownikowi, jak długo transakcja czeka na włączenie do blockchaina.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Pokazujemy status i czas, jaki upłynął od jego aktualizacji.

```
export {Greeter}
```

Eksportujemy komponent.

#### `src/wagmi.ts` {#wagmi-ts}

Na koniec, różne definicje związane z Wagmi znajdują się w `src/wagmi.ts`. Nie będę tutaj wszystkiego wyjaśniać, ponieważ większość z tego to standardowy kod (boilerplate), którego prawdopodobnie nie będziesz musiał zmieniać.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Konfiguracja Wagmi obejmuje łańcuchy obsługiwane przez tę aplikację. Możesz zobaczyć [listę dostępnych łańcuchów](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Ten konektor](https://wagmi.sh/core/api/connectors/injected) pozwala nam komunikować się z portfelem zainstalowanym w przeglądarce.

```ts
  transports: {
    [sepolia.id]: http()
```

Domyślny punkt końcowy HTTP dostarczany z Viem jest wystarczająco dobry. Jeśli chcemy użyć innego adresu URL, możemy użyć `http("https:// hostname ")` lub `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Dodawanie kolejnego blockchaina {#add-blockchain}

Obecnie istnieje wiele [rozwiązań skalujących warstwy 2 (L2)](https://ethereum.org/layer-2/) i możesz chcieć obsługiwać niektóre z nich, których Viem jeszcze nie obsługuje. Aby to zrobić, modyfikujesz `src/wagmi.ts`. Te instrukcje wyjaśniają, jak dodać sieć [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Edytuj `src/wagmi.ts`

    A. Zaimportuj typ `defineChain` z Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Dodaj definicję sieci. Właściwie nie musisz tego robić dla Optimism Sepolia, [jest ona już w `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), ale w ten sposób dowiesz się, jak dodać blockchain, którego nie ma w `viem`.

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

    C. Dodaj nowy łańcuch do wywołania `createConfig`.

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

2.  Edytuj `src/App.tsx`, aby zakomentować automatyczne przełączanie na sieć Sepolia. W systemie produkcyjnym prawdopodobnie pokazałbyś przyciski z linkami do każdego z obsługiwanych blockchainów.

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

3.  Edytuj `src/Greeter.tsx`, aby upewnić się, że aplikacja zna adres twoich kontraktów w nowej sieci.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  W twojej przeglądarce.

    A. Przejdź do [ChainList](https://chainlist.org/chain/11155420?testnets=true) i kliknij jeden z przycisków po prawej stronie tabeli, aby dodać łańcuch do swojego portfela.

    B. W aplikacji kliknij **Disconnect** (Rozłącz), a następnie połącz się ponownie, aby zmienić blockchain. Istnieją lepsze sposoby na obsługę tego, ale wymagałyby one zmian w aplikacji.

## Podsumowanie {#conclusion}

Oczywiście, tak naprawdę nie zależy ci na dostarczeniu interfejsu użytkownika dla `Greeter`. Chcesz stworzyć interfejs użytkownika dla własnych kontraktów. Aby stworzyć własną aplikację, wykonaj następujące kroki:

1. Określ, że chcesz utworzyć aplikację Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Wpisz `y`, aby kontynuować.

3. Nazwij aplikację.

4. Wybierz framework **React**.

5. Wybierz wariant **Vite**.

Teraz idź i spraw, aby twoje kontrakty były użyteczne dla całego świata.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).