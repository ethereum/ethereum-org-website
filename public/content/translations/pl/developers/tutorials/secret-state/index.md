---
title: Wykorzystanie wiedzy zerowej do tajnego stanu
description: "Gry onchain są ograniczone, ponieważ nie mogą przechowywać żadnych ukrytych informacji. Po przeczytaniu tego samouczka czytelnik będzie w stanie połączyć dowody z wiedzą zerową i komponenty serwerowe, aby tworzyć weryfikowalne gry z tajnym stanem, komponentem pozałańcuchowym. Technika ta zostanie zademonstrowana poprzez stworzenie gry w sapera."
author: Ori Pomerantz
tags: ["serwer", "pozałańcuchowy", "scentralizowany", "wiedza zerowa", "zokrates", "mud", "prywatność"]
skill: advanced
breadcrumb: Tajny stan ZK
lang: pl
published: 2025-03-15
---

_Na blockchainie nie ma tajemnic_. Wszystko, co jest publikowane na blockchainie, jest otwarte dla każdego do przeczytania. Jest to konieczne, ponieważ blockchain opiera się na tym, że każdy może go zweryfikować. Jednak gry często opierają się na tajnym stanie. Na przykład gra w [sapera](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) nie ma absolutnie żadnego sensu, jeśli możesz po prostu wejść do eksploratora blockchain i zobaczyć mapę.

Najprostszym rozwiązaniem jest użycie [komponentu serwerowego](/developers/tutorials/server-components/) do przechowywania tajnego stanu. Jednak powodem, dla którego używamy blockchaina, jest zapobieganie oszustwom ze strony twórcy gry. Musimy zapewnić uczciwość komponentu serwerowego. Serwer może dostarczyć hash stanu i użyć [dowodów z wiedzą zerową](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important), aby udowodnić, że stan użyty do obliczenia wyniku ruchu jest prawidłowy.

Po przeczytaniu tego artykułu dowiesz się, jak stworzyć tego rodzaju serwer przechowujący tajny stan, klienta do wyświetlania stanu oraz komponent onchain do komunikacji między nimi. Główne narzędzia, których użyjemy, to:

| Narzędzie                                     | Cel                                                     | Zweryfikowano na wersji |
| --------------------------------------------- | ------------------------------------------------------- | ----------------------: |
| [Zokrates](https://zokrates.github.io/)       | Dowody z wiedzą zerową i ich weryfikacja                |                   1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Język programowania zarówno dla serwera, jak i klienta  |                   5.4.2 |
| [Node](https://nodejs.org/en)                 | Uruchamianie serwera                                    |                 20.18.2 |
| [Foundry](https://getfoundry.sh/)             | Lokalny blockchain i wdrażanie kontraktów               |                   1.0.0 |
| [Viem](https://viem.sh/)                      | Komunikacja z blockchainem                              |                  2.9.20 |
| [MUD](https://mud.dev/)                       | Zarządzanie danymi onchain                              |                  2.0.12 |
| [React](https://react.dev/)                   | Interfejs użytkownika klienta                           |                  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Serwowanie kodu klienta                                 |                   4.2.1 |

## Przykład Minesweeper {#minesweeper}

[Minesweeper (Saper)](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) to gra, która zawiera tajną mapę z polem minowym. Gracz decyduje się kopać w określonym miejscu. Jeśli w tym miejscu znajduje się mina, gra się kończy. W przeciwnym razie gracz otrzymuje informację o liczbie min na ośmiu polach otaczających to miejsce.

Ta aplikacja została napisana przy użyciu [MUD](https://mud.dev/), frameworka, który pozwala nam przechowywać dane onchain za pomocą [bazy danych klucz-wartość](https://aws.amazon.com/nosql/key-value/) i automatycznie synchronizować te dane z komponentami pozałańcuchowymi. Oprócz synchronizacji, MUD ułatwia zapewnienie kontroli dostępu, a innym użytkownikom [rozszerzanie](https://mud.dev/guides/extending-a-world) naszej aplikacji w sposób niewymagający zezwolenia.

### Uruchamianie przykładu sapera {#running-minesweeper-example}

Aby uruchomić przykład sapera:

1. Upewnij się, że [masz zainstalowane wymagane oprogramowanie](https://mud.dev/quickstart#prerequisites): [Node](https://nodejs.org/en), [Foundry](https://getfoundry.sh/introduction/installation), [`git`](https://git-scm.com/downloads) oraz [`pnpm`](https://pnpm.io/installation).

   Ten przykład używa MUD 2.0.12, który wymaga określonych wersji Node i Foundry:

   - **Node 20**. Narzędzie wiersza poleceń MUD 2.0.12 używa [asercji importu JSON](https://v8.dev/features/import-attributes), których nowsze wersje Node już nie obsługują, więc w Node 22 lub nowszym kończy się to błędem `SyntaxError: Unexpected identifier 'assert'`. Node 20 [osiągnął koniec cyklu życia](https://nodejs.org/en/about/previous-releases) w kwietniu 2026 r. i nie otrzymuje już aktualizacji zabezpieczeń, więc używaj go tylko do tego lokalnego przykładu. Menedżer wersji Node, taki jak [`fnm`](https://github.com/Schniz/fnm) lub [`nvm`](https://github.com/nvm-sh/nvm), pozwala przełączyć się na Node 20 tylko dla tego katalogu, na przykład:

     ```sh copy
     fnm install 20
     fnm use 20
     ```

   - **Foundry 1.0.0**. W obecnych wersjach Foundry skrypt po wdrożeniu kończy się błędem _Usage of `address(this)` detected in script contract_. Zainstaluj przetestowaną wersję za pomocą:

     ```sh copy
     foundryup -i 1.0.0
     ```

     Po zakończeniu tego samouczka możesz powrócić do najnowszej wersji za pomocą `foundryup`.

2. Sklonuj repozytorium.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Zainstaluj pakiety.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   ```

   [`mprocs`](https://github.com/pvolok/mprocs), który uruchamia wszystkie procesy w jednym terminalu, jest instalowany jako jeden z pakietów.

4. Skompiluj kontrakty

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Uruchom program (w tym blockchain [anvil](https://getfoundry.sh/anvil/overview)) i poczekaj.

   ```sh copy
   pnpm dev
   ```

   Zauważ, że uruchamianie trwa długo. Aby zobaczyć postęp, najpierw użyj strzałki w dół, aby przewinąć do zakładki _contracts_, aby zobaczyć wdrażane kontrakty MUD. Kiedy otrzymasz wiadomość _Waiting for file changes…_, kontrakty są wdrożone, a dalszy postęp będzie miał miejsce w zakładce _server_. Tam czekasz, aż otrzymasz wiadomość _Verifier address: 0x...._.

   Jeśli ten krok zakończy się pomyślnie, zobaczysz ekran `mprocs`, z różnymi procesami po lewej stronie i wyjściem konsoli dla aktualnie wybranego procesu po prawej stronie.

   ![Ekran mprocs](./mprocs.png)

   Jeśli wystąpi problem z `mprocs`, możesz uruchomić cztery procesy ręcznie, każdy we własnym oknie wiersza poleceń:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Teraz możesz przejść do [klienta](http://localhost:3000), kliknąć **New Game** i zacząć grać.

### Tabele {#tables}

Potrzebujemy [kilku tabel](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Ta tabela to singleton, nie ma klucza i zawiera pojedynczy rekord. Służy do przechowywania informacji o konfiguracji gry:
  - `height`: Wysokość pola minowego
  - `width`: Szerokość pola minowego
  - `numberOfBombs`: Liczba bomb na każdym polu minowym
- `VerifierAddress`: Ta tabela to również singleton. Służy do przechowywania jednej części konfiguracji, adresu kontraktu weryfikatora (`verifier`). Moglibyśmy umieścić te informacje w tabeli `Configuration`, ale są one ustawiane przez inny komponent, serwer, więc łatwiej jest umieścić je w osobnej tabeli.

- `PlayerGame`: Kluczem jest adres gracza. Dane to:

  - `gameId`: 32-bajtowa wartość, która jest hashem mapy, na której gra gracz (identyfikator gry).
  - `win`: wartość logiczna określająca, czy gracz wygrał grę.
  - `lose`: wartość logiczna określająca, czy gracz przegrał grę.
  - `digNumber`: liczba udanych wykopów w grze.

- `GamePlayer`: Ta tabela przechowuje odwrotne mapowanie, z `gameId` na adres gracza.

- `Map`: Kluczem jest krotka trzech wartości:

  - `gameId`: 32-bajtowa wartość, która jest hashem mapy, na której gra gracz (identyfikator gry).
  - współrzędna `x`
  - współrzędna `y`

  Wartością jest pojedyncza liczba. Wynosi 255, jeśli wykryto bombę. W przeciwnym razie jest to liczba bomb wokół tej lokalizacji plus jeden. Nie możemy po prostu użyć liczby bomb, ponieważ domyślnie cała pamięć w EVM i wszystkie wartości wierszy w MUD wynoszą zero. Musimy odróżnić sytuację „gracz jeszcze tu nie kopał” od „gracz tu kopał i odkrył, że wokół nie ma żadnych bomb”.

Ponadto komunikacja między klientem a serwerem odbywa się za pośrednictwem komponentu onchain. Jest to również zaimplementowane przy użyciu tabel.

- `PendingGame`: Nieobsłużone żądania rozpoczęcia nowej gry.
- `PendingDig`: Nieobsłużone żądania kopania w określonym miejscu w określonej grze. Jest to [tabela pozałańcuchowa](https://mud.dev/store/tables#types-of-tables), co oznacza, że nie jest zapisywana w pamięci EVM, a jedynie odczytywana pozałańcuchowo przy użyciu zdarzeń.

### Przepływy wykonywania i danych {#execution-data-flows}

Te przepływy koordynują wykonywanie między klientem, komponentem onchain i serwerem.

#### Inicjalizacja {#initialization-flow}

Kiedy uruchamiasz `pnpm dev` (co uruchamia `mprocs`), zachodzą następujące kroki:

1. [`mprocs`](https://github.com/pvolok/mprocs) uruchamia cztery komponenty:

   - [Anvil](https://getfoundry.sh/anvil/overview), który uruchamia lokalny blockchain
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), który kompiluje (w razie potrzeby) i wdraża kontrakty dla MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), który uruchamia [Vite](https://vitejs.dev/), aby serwować interfejs użytkownika i kod klienta do przeglądarek internetowych.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), który wykonuje akcje serwera

2. Pakiet `contracts` wdraża kontrakty MUD, a następnie uruchamia [skrypt `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Ten skrypt ustawia konfigurację. Kod z GitHuba określa [pole minowe 10x5 z ośmioma minami](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Serwer](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) zaczyna od [skonfigurowania MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Między innymi aktywuje to synchronizację danych, dzięki czemu kopia odpowiednich tabel istnieje w pamięci serwera.

4. Serwer subskrybuje funkcję, która ma zostać wykonana, [gdy zmieni się tabela `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Ta funkcja](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) jest wywoływana po wykonaniu `PostDeploy.s.sol` i modyfikacji tabeli.

5. Kiedy funkcja inicjalizacji serwera ma już konfigurację, [wywołuje `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35), aby zainicjować [część serwera z wiedzą zerową](#using-zokrates-from-typescript). Nie może się to wydarzyć, dopóki nie otrzymamy konfiguracji, ponieważ funkcje z wiedzą zerową muszą mieć szerokość i wysokość pola minowego jako stałe.

6. Po zainicjowaniu części serwera z wiedzą zerową, następnym krokiem jest [wdrożenie kontraktu weryfikacji z wiedzą zerową na blockchainie](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) i ustawienie adresu weryfikatora w MUD.

7. Na koniec subskrybujemy aktualizacje, abyśmy widzielieli, kiedy gracz zażąda [rozpoczęcia nowej gry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) lub [kopania w istniejącej grze](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nowa gra {#new-game-flow}

Oto co się dzieje, gdy gracz żąda nowej gry.

1. Jeśli dla tego gracza nie ma trwającej gry lub istnieje gra, ale z gameId równym zero, klient wyświetla [przycisk nowej gry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Gdy użytkownik naciśnie ten przycisk, [React uruchamia funkcję `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) to wywołanie `System`. W MUD wszystkie wywołania są kierowane przez kontrakt `World`, a w większości przypadków wywołujesz `<namespace>__<function name>`. W tym przypadku wywołanie dotyczy `app__newGame`, które MUD następnie kieruje do [`newGame` w `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Funkcja onchain sprawdza, czy gracz nie ma trwającej gry, a jeśli jej nie ma, [dodaje żądanie do tabeli `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Serwer wykrywa zmianę w `PendingGame` i [uruchamia zasubskrybowaną funkcję](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Ta funkcja wywołuje [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), która z kolei wywołuje [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Pierwszą rzeczą, którą robi `createGame`, jest [utworzenie losowej mapy z odpowiednią liczbą min](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Następnie wywołuje [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166), aby utworzyć mapę z pustymi krawędziami, co jest niezbędne dla Zokrates. Na koniec `createGame` wywołuje [`calculateMapHash`](#calculatemaphash), aby uzyskać hash mapy, który jest używany jako identyfikator gry.

6. Funkcja `newGame` dodaje nową grę do `gamesInProgress`.

7. Ostatnią rzeczą, którą robi serwer, jest wywołanie [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), które jest onchain. Ta funkcja znajduje się w innym `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), aby umożliwić kontrolę dostępu. Kontrola dostępu jest zdefiniowana w [pliku konfiguracyjnym MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Lista dostępu pozwala tylko jednemu adresowi na wywołanie `System`. Ogranicza to dostęp do funkcji serwera do pojedynczego adresu, więc nikt nie może podszywać się pod serwer.

8. Komponent onchain aktualizuje odpowiednie tabele:

   - Tworzy grę w `PlayerGame`.
   - Ustawia odwrotne mapowanie w `GamePlayer`.
   - Usuwa żądanie z `PendingGame`.

9. Serwer identyfikuje zmianę w `PendingGame`, ale nic nie robi, ponieważ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) ma wartość false.

10. W kliencie [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) jest ustawione na wpis `PlayerGame` dla adresu gracza. Kiedy `PlayerGame` się zmienia, `gameRecord` również ulega zmianie.

11. Jeśli w `gameRecord` znajduje się wartość, a gra nie została wygrana ani przegrana, klient [wyświetla mapę](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Kopanie {#dig-flow}

1. Gracz [klika przycisk komórki mapy](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), co wywołuje [funkcję `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Ta funkcja wywołuje [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Komponent onchain [przeprowadza szereg podstawowych testów poprawności (sanity checks)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), a jeśli zakończą się one pomyślnie, dodaje żądanie kopania do [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Serwer [wykrywa zmianę w `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Jeśli jest ona prawidłowa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [wywołuje kod z wiedzą zerową](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (wyjaśniony poniżej), aby wygenerować zarówno wynik, jak i dowód jego poprawności.

4. [Serwer](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) wywołuje [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain.

5. `digResponse` robi dwie rzeczy. Najpierw sprawdza [dowód z wiedzą zerową](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Następnie, jeśli dowód jest poprawny, wywołuje [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86), aby faktycznie przetworzyć wynik.

6. `processDigResult` sprawdza, czy gra została [przegrana](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) lub [wygrana](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), i [aktualizuje `Map`, mapę onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Klient automatycznie odbiera aktualizacje i [aktualizuje mapę wyświetlaną graczowi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), a w stosownych przypadkach informuje gracza o wygranej lub przegranej.

## Korzystanie z Zokrates {#using-zokrates}

W przepływach opisanych powyżej pominęliśmy części związane z wiedzą zerową, traktując je jako czarną skrzynkę. Teraz otwórzmy ją i zobaczmy, jak napisany jest ten kod.

### Haszowanie mapy {#hashing-map}

Możemy użyć [tego kodu JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise), aby zaimplementować [Poseidon](https://www.poseidon-hash.info), funkcję skrótu Zokrates, której używamy. Jednak chociaż byłoby to szybsze, byłoby również bardziej skomplikowane niż po prostu użycie funkcji skrótu Zokrates do tego celu. To jest samouczek, więc kod jest zoptymalizowany pod kątem prostoty, a nie wydajności. Dlatego potrzebujemy dwóch różnych programów Zokrates: jednego do samego obliczenia hasha mapy (`hash`) i drugiego do faktycznego utworzenia dowodu z wiedzą zerową dla wyniku kopania w danej lokalizacji na mapie (`dig`).

### Funkcja skrótu {#hash-function}

To jest funkcja, która oblicza hash mapy. Przeanalizujemy ten kod linijka po linijce.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Te dwie linie importują dwie funkcje z [biblioteki standardowej Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Pierwsza funkcja](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) to [hash Poseidon](https://www.poseidon-hash.info/). Przyjmuje ona tablicę [elementów `field`](https://zokrates.github.io/language/types.html#field) i zwraca `field`.

Element pola w Zokrates ma zazwyczaj mniej niż 256 bitów długości, ale niewiele mniej. Aby uprościć kod, ograniczamy mapę do maksymalnie 512 bitów i haszujemy tablicę czterech pól, a w każdym polu używamy tylko 128 bitów. [Funkcja `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) zamienia w tym celu tablicę 128 bitów na `field`.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Ta linia rozpoczyna definicję funkcji. `hashMap` przyjmuje pojedynczy parametr o nazwie `map`, dwuwymiarową tablicę typu `bool`(ean). Rozmiar mapy to `width+2` na `height+2` z powodów, które [wyjaśniono poniżej](#why-map-border).

Możemy użyć `${width+2}` i `${height+2}`, ponieważ programy Zokrates są przechowywane w tej aplikacji jako [ciągi znaków szablonu (template strings)](https://www.w3schools.com/js/js_string_templates.asp). Kod między `${` a `}` jest ewaluowany przez JavaScript, dzięki czemu program może być używany dla różnych rozmiarów map. Parametr mapy ma dookoła obramowanie o szerokości jednej lokalizacji bez żadnych bomb, co jest powodem, dla którego musimy dodać dwa do szerokości i wysokości.

Wartością zwracaną jest `field`, które zawiera hash.

```
   bool[512] mut map1d = [false; 512];
```

Mapa jest dwuwymiarowa. Jednak funkcja `pack128` nie działa z tablicami dwuwymiarowymi. Dlatego najpierw spłaszczamy mapę do 512-bajtowej tablicy, używając `map1d`. Domyślnie zmienne Zokrates są stałymi, ale musimy przypisać wartości do tej tablicy w pętli, więc definiujemy ją jako [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Musimy zainicjować tablicę, ponieważ Zokrates nie ma `undefined`. Wyrażenie `[false; 512]` oznacza [tablicę 512 wartości `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Potrzebujemy również licznika, aby odróżnić bity, które już wypełniliśmy w `map1d`, od tych, których jeszcze nie wypełniliśmy.

```
   for u32 x in 0..${width+2} {
```

W ten sposób deklaruje się [pętlę `for`](https://zokrates.github.io/language/control_flow.html#for-loops) w Zokrates. Pętla `for` w Zokrates musi mieć stałe granice, ponieważ chociaż wydaje się być pętlą, kompilator w rzeczywistości ją „rozwija”. Wyrażenie `${width+2}` jest stałą w czasie kompilacji, ponieważ `width` jest ustawiane przez kod TypeScript przed wywołaniem kompilatora.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Dla każdej lokalizacji na mapie umieść tę wartość w tablicy `map1d` i zwiększ licznik.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Używamy `pack128`, aby utworzyć tablicę czterech wartości `field` z `map1d`. W Zokrates `array[a..b]` oznacza wycinek tablicy, który zaczyna się od `a` i kończy na `b-1`.

```
    return poseidon(hashMe);
}
```

Użyj `poseidon`, aby przekonwertować tę tablicę na hash.

### Program haszujący {#hash-program}

Serwer musi wywołać `hashMap` bezpośrednio, aby utworzyć identyfikatory gry. Jednak Zokrates może wywołać tylko funkcję `main` w programie, aby go uruchomić, więc tworzymy program z funkcją `main`, która wywołuje funkcję skrótu.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Program kopania {#dig-program}

To jest serce części aplikacji opartej na wiedzy zerowej, gdzie generujemy dowody używane do weryfikacji wyników kopania.

```
${hashFragment}

// Liczba min w lokalizacji (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Dlaczego obramowanie mapy {#why-map-border}

Dowody z wiedzą zerową wykorzystują [obwody arytmetyczne](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), które nie mają prostego odpowiednika dla instrukcji `if`. Zamiast tego używają odpowiednika [operatora warunkowego](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Jeśli `a` może wynosić zero lub jeden, możesz obliczyć `if a { b } else { c }` jako `ab+(1-a)c`.

Z tego powodu instrukcja `if` w Zokrates zawsze ewaluuje obie gałęzie. Na przykład, jeśli masz taki kod:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Zwróci on błąd, ponieważ musi obliczyć `arr[10]`, mimo że ta wartość zostanie później pomnożona przez zero.

To jest powód, dla którego potrzebujemy obramowania o szerokości jednej lokalizacji dookoła mapy. Musimy obliczyć całkowitą liczbę min wokół danej lokalizacji, a to oznacza, że musimy widzieć lokalizację jeden wiersz powyżej i poniżej, po lewej i po prawej stronie od miejsca, w którym kopiemy. Oznacza to, że te lokalizacje muszą istnieć w tablicy mapy dostarczonej do Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Domyślnie dowody Zokrates zawierają swoje dane wejściowe. Wiedza o tym, że wokół danego miejsca znajduje się pięć min, na nic się nie zda, jeśli nie wiesz, które to miejsce (i nie możesz po prostu dopasować tego do swojego żądania, ponieważ wtedy prover mógłby użyć innych wartości i ci o tym nie powiedzieć). Musimy jednak utrzymać mapę w tajemnicy, jednocześnie dostarczając ją do Zokrates. Rozwiązaniem jest użycie parametru `private`, który _nie_ jest ujawniany przez dowód.

Otwiera to kolejną drogę do nadużyć. Prover mógłby użyć poprawnych współrzędnych, ale utworzyć mapę z dowolną liczbą min wokół lokalizacji, a być może w samej lokalizacji. Aby zapobiec temu nadużyciu, sprawiamy, że dowód z wiedzą zerową zawiera hash mapy, który jest identyfikatorem gry.

```
   return (hashMap(map),
```

Wartością zwracaną jest tutaj krotka (tuple), która zawiera tablicę hasha mapy, a także wynik kopania.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Używamy 255 jako wartości specjalnej w przypadku, gdy w samej lokalizacji znajduje się bomba.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Jeśli gracz nie trafił na minę, dodaj liczbę min dla obszaru wokół lokalizacji i zwróć ją.

### Używanie Zokrates z TypeScript {#using-zokrates-from-typescript}

Zokrates posiada interfejs wiersza poleceń, ale w tym programie używamy go w [kodzie TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Biblioteka zawierająca definicje Zokrates nazywa się [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Zaimportuj [wiązania JavaScript dla Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Potrzebujemy tylko funkcji [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), ponieważ zwraca ona obietnicę (promise), która rozwiązuje się do wszystkich definicji Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Podobnie jak sam Zokrates, eksportujemy również tylko jedną funkcję, która również jest [asynchroniczna](https://www.w3schools.com/js/js_async.asp). Kiedy w końcu zwróci wynik, udostępnia kilka funkcji, jak zobaczymy poniżej.

```typescript
const zokrates = await zokratesInitialize()
```

Zainicjuj Zokrates, pobierz wszystko, czego potrzebujemy z biblioteki.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Następnie mamy funkcję skrótu i dwa programy Zokrates, które widzieliśmy powyżej.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Tutaj kompilujemy te programy.

```typescript
// Utwórz klucze do weryfikacji z wiedzą zerową.
// W systemie produkcyjnym należałoby użyć ceremonii konfiguracji.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

W systemie produkcyjnym moglibyśmy użyć bardziej skomplikowanej [ceremonii konfiguracji (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), ale to wystarczy do celów demonstracyjnych. To nie problem, że użytkownicy mogą znać klucz provera – nadal nie mogą go użyć do udowodnienia rzeczy, chyba że są one prawdziwe. Ponieważ określamy entropię (drugi parametr, `""`), wyniki zawsze będą takie same.

**Uwaga:** Kompilacja programów Zokrates i tworzenie kluczy to powolne procesy. Nie ma potrzeby powtarzania ich za każdym razem, a jedynie wtedy, gdy zmienia się rozmiar mapy. W systemie produkcyjnym wykonałbyś je raz, a następnie zapisał wynik. Jedynym powodem, dla którego nie robię tego tutaj, jest chęć zachowania prostoty.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Funkcja [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) faktycznie uruchamia program Zokrates. Zwraca strukturę z dwoma polami: `output`, które jest wynikiem programu jako ciąg JSON, oraz `witness`, które zawiera informacje potrzebne do utworzenia dowodu z wiedzą zerową dla wyniku. Tutaj potrzebujemy tylko wyniku.

Wynikiem jest ciąg znaków w postaci `"31337"`, liczba dziesiętna ujęta w cudzysłów. Ale wynik, którego potrzebujemy dla `viem`, to liczba szesnastkowa w postaci `0x60A7`. Używamy więc `.slice(1,-1)`, aby usunąć cudzysłowy, a następnie `BigInt`, aby przekształcić pozostały ciąg znaków, który jest liczbą dziesiętną, na [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` konwertuje ten `BigInt` na ciąg szesnastkowy, a `"0x"+` dodaje znacznik dla liczb szesnastkowych.

```typescript
// Wykop i zwróć dowód z wiedzą zerową wyniku
// (kod po stronie serwera)
```

Dowód z wiedzą zerową obejmuje publiczne dane wejściowe (`x` i `y`) oraz wyniki (hash mapy i liczba bomb).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Sprawdzenie, czy indeks wykracza poza granice w Zokrates, jest problematyczne, więc robimy to tutaj.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Wykonaj program kopania.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Użyj [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) i zwróć dowód.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Weryfikator Solidity, inteligentny kontrakt, który możemy wdrożyć na blockchain i użyć do weryfikacji dowodów wygenerowanych przez `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Na koniec zwróć wszystko, czego może potrzebować inny kod.

## Testy bezpieczeństwa {#security-tests}

Testy bezpieczeństwa są ważne, ponieważ błąd funkcjonalności w końcu sam się ujawni. Jeśli jednak aplikacja jest niezabezpieczona, prawdopodobnie pozostanie to w ukryciu przez długi czas, zanim zostanie ujawnione przez kogoś, kto oszukuje i ucieka z zasobami należącymi do innych.

### Uprawnienia {#permissions}

W tej grze istnieje jeden uprzywilejowany podmiot, serwer. Jest to jedyny użytkownik, który może wywoływać funkcje w [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Możemy użyć [`cast`](https://getfoundry.sh/cast/overview), aby zweryfikować, czy wywołania funkcji wymagających zezwolenia są dozwolone tylko dla konta serwera.

[Klucz prywatny serwera znajduje się w `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Na komputerze, na którym działa `anvil` (blockchain), ustaw te zmienne środowiskowe.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

   Ten `WORLD_ADDRESS` to adres, pod którym MUD wdraża na świeżym `anvil`. Jeśli twój `World` znajduje się pod innym adresem, użyj wartości z `packages/contracts/worlds.json`.

2. Użyj `cast`, aby spróbować ustawić adres weryfikatora jako nieautoryzowany adres.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Nie tylko `cast` zgłasza błąd, ale możesz otworzyć **MUD Dev Tools** w grze w przeglądarce, kliknąć **Tables** i wybrać **app\_\_VerifierAddress**. Zobaczysz, że adres nie jest zerowy.

3. Ustaw adres weryfikatora jako adres serwera.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Adres w **app\_\_VerifierAddress** powinien teraz wynosić zero.

Wszystkie funkcje MUD w tym samym `System` przechodzą przez tę samą kontrolę dostępu, więc uważam ten test za wystarczający. Jeśli uważasz inaczej, możesz sprawdzić inne funkcje w [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Nadużycia związane z wiedzą zerową {#zero-knowledge-abuses}

Matematyka potrzebna do weryfikacji Zokrates wykracza poza zakres tego samouczka (i moje umiejętności). Możemy jednak przeprowadzić różne testy kodu z wiedzą zerową, aby zweryfikować, czy w przypadku nieprawidłowego wykonania zakończy się on niepowodzeniem. Wszystkie te testy będą wymagały od nas zmiany [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) i ponownego uruchomienia całej aplikacji. Nie wystarczy zrestartować procesu serwera, ponieważ wprowadza to aplikację w niemożliwy stan (gracz ma grę w toku, ale gra nie jest już dostępna dla serwera).

#### Błędna odpowiedź {#wrong-answer}

Najprostszą możliwością jest podanie błędnej odpowiedzi w dowodzie z wiedzą zerową. Aby to zrobić, wchodzimy do `zkDig` i [modyfikujemy linię 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Oznacza to, że zawsze będziemy twierdzić, że jest jedna bomba, niezależnie od prawidłowej odpowiedzi. Spróbuj zagrać w tę wersję, a na karcie **server** na ekranie `mprocs` zobaczysz ten błąd:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Więc tego rodzaju oszustwo się nie udaje.

#### Błędny dowód {#wrong-proof}

Co się stanie, jeśli podamy prawidłowe informacje, ale po prostu będziemy mieli błędne dane dowodu? Teraz zamień linię 91 na:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Nadal kończy się to niepowodzeniem, ale teraz bez podania przyczyny, ponieważ dzieje się to podczas wywołania weryfikatora.

### Jak użytkownik może zweryfikować kod zero trust? {#user-verify-zero-trust}

Inteligentne kontrakty są stosunkowo łatwe do zweryfikowania. Zazwyczaj deweloper publikuje kod źródłowy w eksploratorze bloków, a eksplorator bloków weryfikuje, czy kod źródłowy kompiluje się do kodu w [transakcji wdrożenia kontraktu](/developers/docs/smart-contracts/deploying/). W przypadku MUD `System` jest to [nieco bardziej skomplikowane](https://mud.dev/cli/verify), ale niewiele.

Jest to trudniejsze w przypadku wiedzy zerowej. Weryfikator zawiera pewne stałe i wykonuje na nich pewne obliczenia. To nie mówi ci, co jest dowodzone.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Rozwiązaniem, przynajmniej dopóki eksploratory bloków nie dodadzą weryfikacji Zokrates do swoich interfejsów użytkownika, jest udostępnienie programów Zokrates przez deweloperów aplikacji, aby przynajmniej niektórzy użytkownicy mogli je samodzielnie skompilować z odpowiednim kluczem weryfikacyjnym.

Aby to zrobić:

1. [Zainstaluj Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Utwórz plik `dig.zok` z programem Zokrates. Poniższy kod zakłada, że zachowałeś oryginalny rozmiar mapy, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Liczba min w lokalizacji (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Skompiluj kod Zokrates i utwórz klucz weryfikacyjny. Klucz weryfikacyjny musi zostać utworzony z tą samą entropią, która została użyta w oryginalnym serwerze, [w tym przypadku z pustym ciągiem znaków](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Utwórz samodzielnie weryfikator w Solidity i zweryfikuj, czy jest on funkcjonalnie identyczny z tym na blockchainie (serwer dodaje komentarz, ale nie jest to ważne).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Decyzje projektowe {#design}

W każdej wystarczająco złożonej aplikacji istnieją konkurujące ze sobą cele projektowe, które wymagają kompromisów. Przyjrzyjmy się niektórym z nich i dowiedzmy się, dlaczego obecne rozwiązanie jest lepsze od innych opcji.

### Dlaczego wiedza zerowa {#why-zero-knowledge}

W przypadku sapera tak naprawdę nie potrzebujesz wiedzy zerowej. Serwer może zawsze przechowywać mapę, a następnie po prostu ujawnić ją w całości po zakończeniu gry. Następnie, na koniec gry, inteligentny kontrakt może obliczyć hash mapy, zweryfikować, czy się zgadza, a jeśli nie, ukarać serwer lub całkowicie zignorować grę.

Nie użyłem tego prostszego rozwiązania, ponieważ sprawdza się ono tylko w przypadku krótkich gier z dobrze zdefiniowanym stanem końcowym. Kiedy gra jest potencjalnie nieskończona (jak ma to miejsce w przypadku [autonomicznych światów](https://0xparc.org/blog/autonomous-worlds)), potrzebujesz rozwiązania, które udowadnia stan _bez_ jego ujawniania.

Jako samouczek, ten artykuł wymagał krótkiej gry, która jest łatwa do zrozumienia, ale ta technika jest najbardziej przydatna w przypadku dłuższych gier.

### Dlaczego Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) nie jest jedyną dostępną biblioteką z wiedzą zerową, ale jest podobny do normalnego, [imperatywnego](https://en.wikipedia.org/wiki/Imperative_programming) języka programowania i obsługuje zmienne logiczne.

Jednak ZoKrates nie jest już aktywnie rozwijany. Jego najnowsze wydanie, 0.8.8 (i pasujący `zokrates-js` 1.1.9), pochodzi z listopada 2023 r., a główna gałąź nie miała żadnych commitów od kwietnia 2024 r. Kod w tym samouczku nadal działa, ale nie oczekuj poprawek błędów ani aktualizacji zabezpieczeń. W przypadku nowego projektu rozważ utrzymywany język, taki jak [Noir](https://noir-lang.org/), który jest używany w [tym samouczku](/developers/tutorials/app-plasma/).

W przypadku twojej aplikacji, o innych wymaganiach, możesz woleć użyć [Circom](https://docs.circom.io/getting-started/installation/) lub [Cairo](https://www.cairo-lang.org/).

### Kiedy kompilować Zokratesa {#when-compile-zokrates}

W tym programie kompilujemy programy Zokratesa [za każdym razem, gdy serwer się uruchamia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Jest to wyraźne marnowanie zasobów, ale to jest samouczek, zoptymalizowany pod kątem prostoty.

Gdybym pisał aplikację na poziomie produkcyjnym, sprawdziłbym, czy mam plik ze skompilowanymi programami Zokratesa dla tego rozmiaru pola minowego, a jeśli tak, użyłbym go. To samo dotyczy wdrożenia kontraktu weryfikatora onchain.

### Tworzenie kluczy weryfikatora i provera {#key-creation}

[Tworzenie kluczy](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) to kolejna czysta kalkulacja, której nie trzeba wykonywać więcej niż raz dla danego rozmiaru pola minowego. Ponownie, ze względu na prostotę, jest to robione tylko raz.

Dodatkowo moglibyśmy użyć [ceremonii konfiguracji (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Zaletą ceremonii konfiguracji jest to, że aby oszukać dowód z wiedzą zerową, potrzebujesz entropii lub pewnego wyniku pośredniego od każdego uczestnika. Jeśli przynajmniej jeden uczestnik ceremonii jest uczciwy i usunie te informacje, dowody z wiedzą zerową są bezpieczne przed pewnymi atakami. Nie ma jednak _żadnego mechanizmu_, aby zweryfikować, czy informacje zostały usunięte z każdego miejsca. Jeśli dowody z wiedzą zerową są krytycznie ważne, warto wziąć udział w ceremonii konfiguracji.

Tutaj polegamy na [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), w którym brały udział dziesiątki uczestników. Jest to prawdopodobnie wystarczająco bezpieczne i znacznie prostsze. Nie dodajemy również entropii podczas tworzenia klucza, co ułatwia użytkownikom [weryfikację konfiguracji z wiedzą zerową](#user-verify-zero-trust).

### Gdzie weryfikować {#where-verification}

Możemy weryfikować dowody z wiedzą zerową onchain (co kosztuje gaz) lub w kliencie (używając [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Wybrałem to pierwsze, ponieważ pozwala to [zweryfikować weryfikatora](#user-verify-zero-trust) raz, a następnie ufać, że się nie zmieni, dopóki adres kontraktu dla niego pozostanie taki sam. Gdyby weryfikacja była przeprowadzana w kliencie, musiałbyś weryfikować otrzymywany kod za każdym razem, gdy pobierasz klienta.

Ponadto, chociaż ta gra jest dla jednego gracza, wiele gier blockchain jest wieloosobowych. Weryfikacja onchain oznacza, że weryfikujesz dowód z wiedzą zerową tylko raz. Robienie tego w kliencie wymagałoby od każdego klienta niezależnej weryfikacji.

### Spłaszczyć mapę w TypeScript czy Zokratesie? {#where-flatten}

Ogólnie rzecz biorąc, gdy przetwarzanie może być wykonane w TypeScript lub Zokratesie, lepiej jest to zrobić w TypeScript, który jest znacznie szybszy i nie wymaga dowodów z wiedzą zerową. Z tego powodu na przykład nie dostarczamy Zokratesowi hasha i nie każemy mu weryfikować, czy jest poprawny. Haszowanie musi być wykonane wewnątrz Zokratesa, ale dopasowanie między zwróconym hashem a hashem onchain może nastąpić poza nim.

Jednak nadal [spłaszczamy mapę w Zokratesie](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), podczas gdy moglibyśmy to zrobić w TypeScript. Powodem jest to, że inne opcje są, moim zdaniem, gorsze.

- Dostarczenie jednowymiarowej tablicy wartości logicznych do kodu Zokratesa i użycie wyrażenia takiego jak `x*(height+2)+y`, aby uzyskać dwuwymiarową mapę. To sprawiłoby, że [kod](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) byłby nieco bardziej skomplikowany, więc uznałem, że zysk wydajności nie jest tego wart w przypadku samouczka.

- Wysłanie Zokratesowi zarówno jednowymiarowej, jak i dwuwymiarowej tablicy. Jednak to rozwiązanie nic nam nie daje. Kod Zokratesa musiałby zweryfikować, czy dostarczona mu jednowymiarowa tablica jest rzeczywiście poprawną reprezentacją dwuwymiarowej tablicy. Nie byłoby więc żadnego zysku wydajności.

- Spłaszczenie dwuwymiarowej tablicy w Zokratesie. Jest to najprostsza opcja, więc ją wybrałem.

### Gdzie przechowywać mapy {#where-store-maps}

W tej aplikacji [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) jest po prostu zmienną w pamięci. Oznacza to, że jeśli serwer ulegnie awarii i będzie musiał zostać zrestartowany, wszystkie przechowywane przez niego informacje zostaną utracone. Gracze nie tylko nie będą mogli kontynuować swojej gry, ale nawet nie będą mogli rozpocząć nowej, ponieważ komponent onchain uważa, że ich gra wciąż trwa.

Jest to wyraźnie zły projekt dla systemu produkcyjnego, w którym przechowywałbyś te informacje w bazie danych. Jedynym powodem, dla którego użyłem tutaj zmiennej, jest to, że jest to samouczek, a prostota jest głównym czynnikiem.

## Wniosek: W jakich warunkach jest to odpowiednia technika? {#conclusion}

Więc teraz wiesz, jak napisać grę z serwerem, który przechowuje tajny stan, który nie powinien znajdować się onchain. Ale w jakich przypadkach należy to zrobić? Należy wziąć pod uwagę dwie główne kwestie.

- _Długotrwała gra_: [Jak wspomniano powyżej](#why-zero-knowledge), w krótkiej grze możesz po prostu opublikować stan po jej zakończeniu i wtedy wszystko zweryfikować. Ale nie jest to opcja, gdy gra trwa długo lub w nieskończoność, a stan musi pozostać tajny.

- _Pewna centralizacja jest akceptowalna_: Dowody z wiedzą zerową mogą zweryfikować integralność, czyli to, że dany podmiot nie fałszuje wyników. Nie mogą jednak zagwarantować, że podmiot ten nadal będzie dostępny i będzie odpowiadał na wiadomości. W sytuacjach, w których dostępność również musi być zdecentralizowana, dowody z wiedzą zerową nie są wystarczającym rozwiązaniem i potrzebne są [obliczenia wielostronne](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).

### Podziękowania {#acknowledgements}

- Alvaro Alonso przeczytał wersję roboczą tego artykułu i wyjaśnił niektóre z moich nieporozumień dotyczących Zokratesa.

Za wszelkie pozostałe błędy ponoszę odpowiedzialność.
