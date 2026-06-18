---
title: "Komponenty serwerowe i agenci dla aplikacji web3"
description: "Po przeczytaniu tego samouczka będziesz w stanie pisać serwery w języku TypeScript, które nasłuchują zdarzeń na blockchainie i odpowiednio na nie reagują za pomocą własnych transakcji. Pozwoli to na pisanie scentralizowanych aplikacji (ponieważ serwer jest punktem awarii), które mogą wchodzić w interakcje z podmiotami web3. Te same techniki można również wykorzystać do napisania agenta, który reaguje na zdarzenia onchain bez udziału człowieka."

author: Ori Pomerantz
lang: pl
tags: ["agent", "serwer", "offchain", "dapps"]
skill: beginner
breadcrumb: Komponenty serwerowe
published: 2024-07-15
---

## Wprowadzenie {#introduction}

W większości przypadków zdecentralizowana aplikacja (dapp) używa serwera do dystrybucji oprogramowania, ale cała rzeczywista interakcja odbywa się między klientem (zazwyczaj przeglądarką internetową) a blockchainem.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Istnieją jednak przypadki, w których aplikacja zyskałaby na posiadaniu niezależnie działającego komponentu serwerowego. Taki serwer byłby w stanie reagować na zdarzenia oraz na żądania pochodzące z innych źródeł, takich jak API, poprzez wysyłanie transakcji.

![The interaction with the addition of a server](./fig-2.svg)

Istnieje kilka możliwych zadań, które taki serwer mógłby realizować.

- Przechowywanie tajnego stanu. W grach często przydatne jest, aby nie wszystkie informacje znane grze były dostępne dla graczy. Jednak _na blockchainie nie ma tajemnic_, każda informacja znajdująca się na blockchainie jest łatwa do odczytania dla każdego. Dlatego też, jeśli część stanu gry ma pozostać tajna, musi być przechowywana gdzie indziej (a efekty tego stanu mogą być weryfikowane za pomocą [dowodów z wiedzą zerową](/zero-knowledge-proofs)).

- Scentralizowana wyrocznia. Jeśli stawki są wystarczająco niskie, zewnętrzny serwer, który odczytuje pewne informacje z internetu, a następnie publikuje je w łańcuchu, może być wystarczająco dobry, aby pełnić rolę [wyroczni](/developers/docs/oracles/).

- Agent. Nic nie dzieje się na blockchainie bez transakcji, która to aktywuje. Serwer może działać w imieniu użytkownika, wykonując działania takie jak [arbitraż](/developers/docs/mev/#mev-examples-dex-arbitrage), gdy nadarzy się ku temu okazja.

## Przykładowy program {#sample-program}

Przykładowy serwer możesz zobaczyć [na GitHubie](https://github.com/qbzzt/20240715-server-component). Serwer ten nasłuchuje zdarzeń pochodzących z [tego kontraktu](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), zmodyfikowanej wersji Greeter z Hardhata. Kiedy powitanie zostanie zmienione, serwer zmienia je z powrotem.

Aby go uruchomić:

1. Sklonuj repozytorium.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Zainstaluj niezbędne pakiety. Jeśli jeszcze go nie masz, [najpierw zainstaluj Node.js](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Edytuj plik `.env`, aby podać klucz prywatny konta, które posiada ETH w sieci testowej Holesky. Jeśli nie masz ETH w sieci Holesky, możesz [skorzystać z tego kranika](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Uruchom serwer.

   ```sh copy
   npm start
   ```

5. Przejdź do [eksploratora bloków](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) i używając innego adresu niż ten, do którego masz klucz prywatny, zmodyfikuj powitanie. Zobaczysz, że powitanie zostanie automatycznie zmienione z powrotem.

### Jak to działa? {#how-it-works}

Najprostszym sposobem na zrozumienie, jak napisać komponent serwerowy, jest przeanalizowanie przykładowego kodu linijka po linijce.

#### `src/app.ts` {#src-app-ts}

Zdecydowana większość programu znajduje się w pliku [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Tworzenie wymaganych obiektów

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Są to potrzebne nam encje [Viem](https://viem.sh/), funkcje oraz [typ `Address`](https://viem.sh/docs/glossary/types#address). Ten serwer jest napisany w języku [TypeScript](https://www.typescriptlang.org/), który jest rozszerzeniem języka JavaScript, wprowadzającym [silne typowanie](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Ta funkcja](https://viem.sh/docs/accounts/privateKey) pozwala nam wygenerować informacje o portfelu, w tym adres, odpowiadające kluczowi prywatnemu.

```typescript
import { holesky } from "viem/chains"
```

Aby użyć blockchaina w Viem, musisz zaimportować jego definicję. W tym przypadku chcemy połączyć się z testowym blockchainem [Holesky](https://github.com/eth-clients/holesky).

```typescript
// W ten sposób dodajemy definicje z .env do process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

W ten sposób wczytujemy plik `.env` do środowiska. Potrzebujemy go do klucza prywatnego (zobacz poniżej).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Aby użyć kontraktu, potrzebujemy jego adresu oraz [ABI](/glossary/#abi). Podajemy tutaj oba te elementy.

W języku JavaScript (a tym samym w TypeScript) nie można przypisać nowej wartości do stałej, ale _można_ modyfikować obiekt, który jest w niej przechowywany. Używając sufiksu `as const`, mówimy TypeScriptowi, że sama lista jest stała i nie może zostać zmieniona.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Utwórz [klienta publicznego](https://viem.sh/docs/clients/public.html) Viem. Klienci publiczni nie mają dołączonego klucza prywatnego, a zatem nie mogą wysyłać transakcji. Mogą wywoływać [funkcje `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), odczytywać salda kont itp.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Zmienne środowiskowe są dostępne w [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Jednak TypeScript jest silnie typowany. Zmienna środowiskowa może być dowolnym ciągiem znaków lub być pusta, więc typem zmiennej środowiskowej jest `string | undefined`. Z kolei klucz jest zdefiniowany w Viem jako `0x${string}` (`0x` z następującym po nim ciągiem znaków). W tym miejscu mówimy TypeScriptowi, że zmienna środowiskowa `PRIVATE_KEY` będzie tego typu. Jeśli tak nie będzie, otrzymamy błąd w czasie wykonywania.

Funkcja [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) używa następnie tego klucza prywatnego do utworzenia pełnego obiektu konta.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Następnie używamy obiektu konta do utworzenia [klienta portfela](https://viem.sh/docs/clients/wallet). Ten klient posiada klucz prywatny i adres, więc może być używany do wysyłania transakcji.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Teraz, gdy mamy już wszystkie wymagane elementy, możemy w końcu utworzyć [instancję kontraktu](https://viem.sh/docs/contract/getContract). Użyjemy tej instancji kontraktu do komunikacji z kontraktem onchain.

##### Odczyt z blockchaina

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Funkcje kontraktu, które służą tylko do odczytu ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) i [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), są dostępne pod `read`. W tym przypadku używamy go, aby uzyskać dostęp do funkcji [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), która zwraca powitanie.

JavaScript jest jednowątkowy, więc kiedy uruchamiamy długotrwały proces, musimy [określić, że robimy to asynchronicznie](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Wywołanie blockchaina, nawet w przypadku operacji tylko do odczytu, wymaga komunikacji w obie strony między komputerem a węzłem blockchaina. Z tego powodu określamy tutaj, że kod musi poczekać (`await`) na wynik.

Jeśli interesuje Cię, jak to działa, możesz [przeczytać o tym tutaj](https://www.w3schools.com/js/js_promise.asp), ale w praktyce wszystko, co musisz wiedzieć, to to, że używasz `await` dla wyników, jeśli rozpoczynasz operację, która zajmuje dużo czasu, a każda funkcja, która to robi, musi być zadeklarowana jako `async`.

##### Wysyłanie transakcji

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Jest to funkcja, którą wywołujesz, aby wysłać transakcję zmieniającą powitanie. Ponieważ jest to długa operacja, funkcja jest zadeklarowana jako `async`. Ze względu na wewnętrzną implementację, każda funkcja `async` musi zwracać obiekt `Promise`. W tym przypadku `Promise<any>` oznacza, że nie określamy, co dokładnie zostanie zwrócone w `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Pole `write` instancji kontraktu zawiera wszystkie funkcje, które zapisują do stanu blockchaina (te, które wymagają wysłania transakcji), takie jak [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Parametry, jeśli występują, są podawane jako lista, a funkcja zwraca hash transakcji.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Zgłoś hash transakcji (jako część adresu URL do eksploratora bloków, aby go wyświetlić) i zwróć go.

##### Reagowanie na zdarzenia

```typescript
greeter.watchEvent.SetGreeting({
```

[Funkcja `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) pozwala określić, że funkcja ma zostać uruchomiona po wyemitowaniu zdarzenia. Jeśli interesuje Cię tylko jeden typ zdarzenia (w tym przypadku `SetGreeting`), możesz użyć tej składni, aby ograniczyć się do tego typu zdarzenia.

```typescript
    onLogs: logs => {
```

Funkcja `onLogs` jest wywoływana, gdy pojawiają się wpisy logów. W Ethereum terminy „log” i „zdarzenie” są zazwyczaj używane zamiennie.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Może wystąpić wiele zdarzeń, ale dla uproszczenia interesuje nas tylko pierwsze z nich. `logs[0].args` to argumenty zdarzenia, w tym przypadku `sender` i `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Jeśli nadawcą _nie_ jest ten serwer, użyj `setGreeting`, aby zmienić powitanie.

#### `package.json` {#package-json}

[Ten plik](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) kontroluje konfigurację [Node.js](https://nodejs.org/en). Ten artykuł wyjaśnia tylko najważniejsze definicje.

```json
{
  "main": "dist/index.js",
```

Ta definicja określa, który plik JavaScript ma zostać uruchomiony.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Skrypty to różne akcje aplikacji. W tym przypadku jedynym, jaki mamy, jest `start`, który kompiluje, a następnie uruchamia serwer. Polecenie `tsc` jest częścią pakietu `typescript` i kompiluje TypeScript do JavaScriptu. Jeśli chcesz uruchomić je ręcznie, znajduje się ono w `node_modules/.bin`. Drugie polecenie uruchamia serwer.

```json
  "type": "module",
```

Istnieje wiele typów aplikacji węzła JavaScript. Typ `module` pozwala nam na użycie `await` w kodzie najwyższego poziomu, co jest ważne, gdy wykonujesz powolne (i tym samym asynchroniczne) operacje.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Są to pakiety, które są wymagane tylko do programowania. Tutaj potrzebujemy `typescript`, a ponieważ używamy go z Node.js, pobieramy również typy dla zmiennych i obiektów węzła, takich jak `process`. [Notacja `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) oznacza tę wersję lub wyższą wersję, która nie wprowadza zmian psujących kompatybilność. Zobacz [tutaj](https://semver.org), aby uzyskać więcej informacji na temat znaczenia numerów wersji.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Są to pakiety, które są wymagane w czasie wykonywania, podczas uruchamiania `dist/app.js`.

## Podsumowanie {#conclusion}

Scentralizowany serwer, który tutaj stworzyliśmy, spełnia swoje zadanie, którym jest działanie jako agent dla użytkownika. Każdy inny, kto chce, aby dapp nadal funkcjonował i jest skłonny wydać gaz, może uruchomić nową instancję serwera z własnym adresem.

Działa to jednak tylko wtedy, gdy działania scentralizowanego serwera można łatwo zweryfikować. Jeśli scentralizowany serwer posiada jakiekolwiek tajne informacje o stanie lub wykonuje trudne obliczenia, jest to scentralizowany podmiot, któremu musisz zaufać, aby korzystać z aplikacji, a tego właśnie blockchainy starają się unikać. W przyszłym artykule planuję pokazać, jak używać [dowodów z wiedzą zerową](/zero-knowledge-proofs), aby obejść ten problem.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).