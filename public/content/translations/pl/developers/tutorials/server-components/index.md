---
title: "Komponenty serwera i agenty dla aplikacji web3"
description: Po przeczytaniu tego samouczka będziesz w stanie pisać serwery TypeScript, które nasłuchują zdarzeń w łańcuchu bloków i odpowiednio na nie reagują własnymi transakcjami. Umożliwi to pisanie scentralizowanych aplikacji (ponieważ serwer jest pojedynczym punktem awarii), które mogą wchodzić w interakcje z jednostkami web3. Te same techniki mogą być również użyte do napisania agenta, który reaguje na zdarzenia onchain bez udziału człowieka.

author: Ori Pomerantz
lang: pl
tags: [ "agent", "serwer", "offchain" ]
skill: beginner
published: 2024-07-15
---

## Wprowadzenie {#introduction}

W większości przypadków zdecentralizowana aplikacja wykorzystuje serwer do dystrybucji oprogramowania, ale cała faktyczna interakcja zachodzi między klientem (zazwyczaj przeglądarką internetową) a łańcuchem bloków.

![Normalna interakcja między serwerem internetowym, klientem a łańcuchem bloków](./fig-1.svg)

Istnieją jednak przypadki, w których aplikacja odniosłaby korzyść z posiadania niezależnie działającego komponentu serwera. Taki serwer byłby w stanie reagować na zdarzenia i żądania pochodzące z innych źródeł, takich jak API, emitując transakcje.

![Interakcja z dodanym serwerem](./fig-2.svg)

Istnieje kilka możliwych zadań, które taki serwer mógłby spełniać.

- Posiadacz tajnego stanu. W grach często przydatne jest, aby nie wszystkie informacje znane grze były dostępne dla graczy. Jednakże _w łańcuchu bloków nie ma żadnych tajemnic_, każdą informację, która się w nim znajduje, każdy może łatwo poznać. Dlatego też, jeśli część stanu gry ma pozostać tajna, musi być przechowywana gdzie indziej (a ewentualne skutki tego stanu zweryfikowane za pomocą [dowodów o wiedzy zerowej](/zero-knowledge-proofs)).

- Scentralizowana wyrocznia. Jeśli stawki są wystarczająco niskie, zewnętrzny serwer, który odczytuje pewne informacje online, a następnie publikuje je w łańcuchu, może być wystarczająco dobry, aby użyć go jako [wyroczni](/developers/docs/oracles/).

- Agent. W łańcuchu bloków nic się nie dzieje bez transakcji, która to aktywuje. Serwer może działać w imieniu użytkownika, wykonując działania takie jak [arbitraż](/developers/docs/mev/#mev-examples-dex-arbitrage), gdy nadarzy się okazja.

## Przykładowy program {#sample-program}

Przykładowy serwer można zobaczyć [na GitHubie](https://github.com/qbzzt/20240715-server-component). Ten serwer nasłuchuje zdarzeń pochodzących z [tego kontraktu](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), zmodyfikowanej wersji Greeter od Hardhat. Gdy powitanie zostanie zmienione, zmienia je z powrotem.

Aby go uruchomić:

1. Sklonuj repozytorium.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Zainstaluj niezbędne pakiety. Jeśli jeszcze go nie masz, [najpierw zainstaluj Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Edytuj plik `.env`, aby określić klucz prywatny konta, które posiada ETH w sieci testowej Holesky. Jeśli nie masz ETH na Holesky, możesz [użyć tego kraniku](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <tutaj wklej klucz prywatny>
   ```

4. Uruchom serwer.

   ```sh copy
   npm start
   ```

5. Przejdź do [eksploratora bloków](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) i używając innego adresu niż ten, który posiada klucz prywatny, zmodyfikuj powitanie. Zobacz, że powitanie jest automatycznie przywracane.

### Jak to działa? {#how-it-works}

Najłatwiejszym sposobem na zrozumienie, jak napisać komponent serwera, jest przeanalizowanie przykładu linijka po linijce.

#### `src/app.ts` {#src-app-ts}

Zdecydowana większość programu znajduje się w [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

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

Są to potrzebne nam encje [Viem](https://viem.sh/), funkcje i [typ `Address`](https://viem.sh/docs/glossary/types#address). Ten serwer jest napisany w języku [TypeScript](https://www.typescriptlang.org/), który jest rozszerzeniem języka JavaScript, czyniącym go [silnie typowanym](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Ta funkcja](https://viem.sh/docs/accounts/privateKey) pozwala nam wygenerować informacje o portfelu, w tym adres, odpowiadające kluczowi prywatnemu.

```typescript
import { holesky } from "viem/chains"
```

Aby używać blockchaina w Viem, musisz zaimportować jego definicję. W tym przypadku chcemy połączyć się z testowym łańcuchem bloków [Holesky](https://github.com/eth-clients/holesky).

```typescript
// W ten sposób dodajemy definicje z .env do process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

W ten sposób wczytujemy plik `.env` do środowiska. Potrzebujemy go do klucza prywatnego (zobacz później).

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

Aby użyć kontraktu, potrzebujemy jego adresu i [ABI](/glossary/#abi). Podajemy oba tutaj.

W języku JavaScript (a więc i w TypeScript) nie można przypisać nowej wartości do stałej, ale _można_ zmodyfikować obiekt, który jest w niej przechowywany. Używając sufiksu `as const`, informujemy TypeScript, że sama lista jest stała i nie może być zmieniana.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Utwórz [klienta publicznego](https://viem.sh/docs/clients/public.html) Viem. Klienci publiczni nie mają dołączonego klucza prywatnego, a zatem nie mogą wysyłać transakcji. Mogą wywoływać [`funkcje widoku`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), odczytywać salda kont itp.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Zmienne środowiskowe są dostępne w [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Jednak TypeScript jest silnie typowany. Zmienna środowiskowa może być dowolnym ciągiem znaków lub być pusta, więc typem zmiennej środowiskowej jest `string | undefined`. Jednak klucz jest zdefiniowany w Viem jako `0x${string}` (`0x` po którym następuje ciąg znaków). W tym miejscu informujemy TypeScript, że zmienna środowiskowa `PRIVATE_KEY` będzie tego typu. Jeśli tak nie będzie, otrzymamy błąd wykonania.

Funkcja [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) następnie używa tego klucza prywatnego do utworzenia pełnego obiektu konta.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Następnie używamy obiektu konta do utworzenia [klienta portfela](https://viem.sh/docs/clients/wallet). Ten klient ma klucz prywatny i adres, więc może być używany do wysyłania transakcji.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Teraz, gdy mamy już wszystkie wymagania wstępne, możemy wreszcie utworzyć [instancję kontraktu](https://viem.sh/docs/contract/getContract). Będziemy używać tej instancji kontraktu do komunikacji z kontraktem onchain.

##### Odczytywanie z łańcucha bloków

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Funkcje kontraktu, które są tylko do odczytu ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) i [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), są dostępne w `read`. W tym przypadku używamy jej do uzyskania dostępu do funkcji [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), która zwraca powitanie.

JavaScript jest jednowątkowy, więc gdy uruchamiamy długo działający proces, musimy [określić, że robimy to asynchronicznie](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Wywołanie łańcucha bloków, nawet w przypadku operacji tylko do odczytu, wymaga komunikacji w obie strony między komputerem a węzłem łańcucha bloków. Dlatego w tym miejscu określamy, że kod musi `await` (oczekiwać) na wynik.

Jeśli interesuje Cię, jak to działa, możesz [przeczytać o tym tutaj](https://www.w3schools.com/js/js_promise.asp), ale w praktyce wystarczy wiedzieć, że należy `await` (oczekiwać) na wyniki, jeśli rozpoczynasz operację, która trwa długo, a każda funkcja, która to robi, musi być zadeklarowana jako `async`.

##### Emitowanie transakcji

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Jest to funkcja, którą wywołujesz, aby wysłać transakcję zmieniającą powitanie. Ponieważ jest to długa operacja, funkcja jest zadeklarowana jako `async`. Ze względu na wewnętrzną implementację, każda funkcja `async` musi zwracać obiekt `Promise`. W tym przypadku `Promise<any>` oznacza, że nie określamy, co dokładnie zostanie zwrócone w `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Pole `write` instancji kontraktu zawiera wszystkie funkcje, które zapisują do stanu łańcucha bloków (te, które wymagają wysłania transakcji), takie jak [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Parametry, jeśli istnieją, są podawane w postaci listy, a funkcja zwraca hasz transakcji.

```typescript
    console.log(`Pracuję nad poprawką, zobacz https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Zgłoś hasz transakcji (jako część adresu URL do eksploratora bloków, aby go wyświetlić) i zwróć go.

##### Reagowanie na zdarzenia

```typescript
greeter.watchEvent.SetGreeting({
```

[Funkcja `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) pozwala określić, że funkcja ma być uruchamiana po wyemitowaniu zdarzenia. Jeśli interesuje Cię tylko jeden typ zdarzenia (w tym przypadku `SetGreeting`), możesz użyć tej składni, aby ograniczyć się do tego typu zdarzenia.

```typescript
    onLogs: logs => {
```

Funkcja `onLogs` jest wywoływana, gdy pojawiają się wpisy w dzienniku. W Ethereum „log” i „zdarzenie” są zwykle używane zamiennie.

```typescript
console.log(
  `Adres ${logs[0].args.sender} zmienił powitanie na ${logs[0].args.greeting}`
)
```

Może być wiele zdarzeń, ale dla uproszczenia interesuje nas tylko pierwsze z nich. `logs[0].args` to argumenty zdarzenia, w tym przypadku `sender` i `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} nalega, aby było to Hello!`)
    }
})
```

Jeśli nadawcą _nie jest_ ten serwer, użyj `setGreeting`, aby zmienić powitanie.

#### `package.json` {#package-json}

[Ten plik](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) kontroluje konfigurację [Node.js](https://nodejs.org/en). W tym artykule wyjaśniono tylko ważne definicje.

```json
{
  "main": "dist/index.js",
```

Ta definicja określa, który plik JavaScript ma być uruchomiony.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Skrypty to różne działania aplikacji. W tym przypadku jedynym, jaki mamy, jest `start`, który kompiluje, a następnie uruchamia serwer. Polecenie `tsc` jest częścią pakietu `typescript` i kompiluje TypeScript do JavaScript. Jeśli chcesz uruchomić go ręcznie, znajduje się on w `node_modules/.bin`. Drugie polecenie uruchamia serwer.

```json
  "type": "module",
```

Istnieje wiele typów aplikacji węzła JavaScript. Typ `module` pozwala nam na użycie `await` w kodzie najwyższego poziomu, co jest ważne, gdy wykonujesz wolne (i asynchroniczne) operacje.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Są to pakiety, które są wymagane tylko do programowania. W tym miejscu potrzebujemy `typescript`, a ponieważ używamy go z Node.js, otrzymujemy również typy dla zmiennych i obiektów węzła, takich jak `process`. [Notacja `^<wersja>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) oznacza tę wersję lub wyższą wersję, która nie zawiera przełomowych zmian. Więcej informacji na temat znaczenia numerów wersji można znaleźć [tutaj](https://semver.org).

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Są to pakiety wymagane w czasie wykonywania, podczas uruchamiania `dist/app.js`.

## Wnioski {#conclusion}

Scentralizowany serwer, który tu stworzyliśmy, wykonuje swoje zadanie, którym jest działanie jako agent dla użytkownika. Każdy, kto chce, aby dapka nadal funkcjonowała i jest gotów wydać gaz, może uruchomić nową instancję serwera z własnym adresem.

Działa to jednak tylko wtedy, gdy działania scentralizowanego serwera można łatwo zweryfikować. Jeśli scentralizowany serwer ma jakiekolwiek informacje o tajnym stanie lub wykonuje trudne obliczenia, jest to scentralizowany podmiot, któremu trzeba zaufać, aby korzystać z aplikacji, a tego właśnie starają się unikać łańcuchy bloków. W przyszłym artykule planuję pokazać, jak używać [dowodów o wiedzy zerowej](/zero-knowledge-proofs), aby obejść ten problem.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
