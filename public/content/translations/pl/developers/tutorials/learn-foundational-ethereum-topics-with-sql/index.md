---
title: "Poznaj podstawowe zagadnienia Ethereum za pomocą SQL"
description: "Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych onchain za pomocą języka SQL (Structured Query Language)."
author: "Paul Apivat"
tags: ["SQL", "odpytywanie", "transakcje", "dane-i-analityka"]
skill: beginner
breadcrumb: Ethereum z SQL
lang: pl
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Wiele samouczków Ethereum jest skierowanych do programistów, ale brakuje materiałów edukacyjnych dla analityków danych lub osób, które chcą zobaczyć dane onchain bez uruchamiania klienta lub węzła.

Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych onchain za pomocą języka SQL (Structured Query Language) za pośrednictwem interfejsu dostarczonego przez [Dune](https://dune.com/). Zapytania wykorzystują [DuneSQL](https://docs.dune.com/query-engine/overview), dialekt SQL platformy Dune.

Dane onchain mogą pomóc nam zrozumieć Ethereum, sieć oraz ekonomię mocy obliczeniowej i powinny służyć jako podstawa do zrozumienia wyzwań stojących dziś przed Ethereum (np. rosnące ceny gazu) oraz, co ważniejsze, dyskusji na temat rozwiązań skalujących.

### Transakcje {#transactions}

Podróż użytkownika w Ethereum zaczyna się od zainicjowania konta kontrolowanego przez użytkownika lub podmiotu z saldem ETH. Istnieją dwa typy kont - kontrolowane przez użytkownika lub inteligentny kontrakt (zobacz [ethereum.org](/developers/docs/accounts/)).

Każde konto można wyświetlić w eksploratorze bloków, takim jak [Etherscan](https://etherscan.io/) lub [Blockscout](https://eth.blockscout.com/). Eksploratory bloków to portal do danych Ethereum. Wyświetlają one w czasie rzeczywistym dane o blokach, transakcjach, walidatorach, kontach i innej aktywności onchain (zobacz [tutaj](/developers/docs/data-and-analytics/block-explorers/)).

Użytkownik może jednak chcieć odpytać dane bezpośrednio, aby zweryfikować informacje dostarczane przez zewnętrzne eksploratory bloków. [Dune](https://dune.com/) zapewnia tę możliwość każdemu, kto posiada pewną wiedzę na temat SQL.

Dla porównania, konto inteligentnego kontraktu Fundacji Ethereum (EF) można zobaczyć na [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Należy zauważyć, że wszystkie konta, w tym konto EF, mają publiczny adres, który może być używany do wysyłania i odbierania transakcji.

Saldo konta na Etherscan obejmuje zwykłe transakcje i transakcje wewnętrzne. Transakcje wewnętrzne, wbrew nazwie, nie są _rzeczywistymi_ transakcjami, które zmieniają stan łańcucha. Są to transfery wartości inicjowane przez wykonanie kontraktu ([źródło](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Ponieważ transakcje wewnętrzne nie mają podpisu, **nie** są one uwzględniane na blockchainie jako transakcje. Dune rejestruje je oddzielnie, w tabeli `ethereum.traces`.

Dlatego ten samouczek skupi się na zwykłych transakcjach. Można je odpytać w następujący sposób:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Zauważ, że adresy są zapisywane jako literały `0x...` bez cudzysłowów. W DuneSQL adresy i hashe są wartościami binarnymi, a nie ciągami znaków.

Przyniesie to te same informacje, co na stronie transakcji Etherscan. Dla porównania, oto dwa źródła:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Strona kontraktu EF na Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Pulpit nawigacyjny można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum). Kliknij tabelę, aby zobaczyć zapytanie (zobacz również powyżej).

### Analiza transakcji {#breaking-down-transactions}

Przesłana transakcja zawiera kilka informacji, w tym ([źródło](/developers/docs/transactions/)):

- **Odbiorca**: Adres odbiorczy (odpytywany jako "to")
- **Podpis**: Chociaż klucze prywatne nadawcy podpisują transakcję, to co możemy odpytać za pomocą SQL, to publiczny adres nadawcy ("from").
- **Wartość**: Jest to ilość przesłanego ETH (zobacz kolumnę `ether`).
- **Dane**: Są to dowolne dane, które zostały zahashowane (zobacz kolumnę `data`)
- **gasLimit** – maksymalna ilość jednostek gazu, która może zostać zużyta przez transakcję. Jednostki gazu reprezentują kroki obliczeniowe
- **maxPriorityFeePerGas** - maksymalna ilość gazu, która ma zostać uwzględniona jako opłata priorytetowa dla walidatora
- **maxFeePerGas** - maksymalna ilość gazu, jaką użytkownik jest skłonny zapłacić za transakcję (w tym baseFeePerGas i maxPriorityFeePerGas)

Możemy odpytać te konkretne informacje dla transakcji na publiczny adres Fundacji Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

`CAST` jest konieczne, ponieważ dzielenie jednej liczby całkowitej przez drugą w DuneSQL daje wynik całkowity, co zaokrągliłoby prawie każdy procent w dół do zera.

### Bloki {#blocks}

Każda transakcja zmieni stan Maszyny Wirtualnej Ethereum ([EVM](/developers/docs/evm/)) ([źródło](/developers/docs/transactions/)). Transakcje są rozgłaszane w sieci w celu weryfikacji i włączenia do bloku. Każda transakcja jest powiązana z numerem bloku. Aby zobaczyć dane, moglibyśmy odpytać konkretny numer bloku: 12396854 (najnowszy blok wśród transakcji Fundacji Ethereum w momencie pisania tego tekstu, w maju 2021 r.).

Co więcej, gdy odpytamy dwa kolejne bloki, zobaczymy, że każdy blok zawiera hash poprzedniego bloku (tj. hash rodzica), co ilustruje, jak powstaje blockchain.

Każdy blok zawiera odniesienie do swojego bloku rodzica. Pokazano to poniżej między kolumnami `hash` i `parent_hash` ([źródło](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Oto zapytanie:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

Możemy zbadać blok, odpytując czas, numer bloku, hash, hash rodzica i nonce. Blok 12396854 został wyprodukowany przed [The Merge](/roadmap/merge/), kiedy bloki były kopane za pomocą dowodu pracy (PoW), a nonce miało znaczenie. W blokach dowodu stawki (PoS) nonce zawsze wynosi zero.

Jedyną rzeczą, której to zapytanie nie obejmuje, jest _lista transakcji_, która wymaga osobnego zapytania poniżej, oraz _korzeń stanu_ (state root). Pełny lub archiwalny węzeł będzie przechowywał wszystkie transakcje i przejścia stanów, umożliwiając klientom odpytywanie stanu łańcucha w dowolnym momencie. Ponieważ wymaga to dużej przestrzeni dyskowej, możemy oddzielić dane łańcucha od danych stanu:

- Dane łańcucha (lista bloków, transakcje)
- Dane stanu (wynik przejścia stanu każdej transakcji)

Korzeń stanu należy do tej drugiej kategorii i jest daną _niejawną_ (nieprzechowywaną onchain), podczas gdy dane łańcucha są jawne i przechowywane w samym łańcuchu ([źródło](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

W tym samouczku skupimy się na danych onchain, które _mogą_ być odpytywane za pomocą SQL przez Dune.

Jak wspomniano powyżej, każdy blok zawiera listę transakcji, możemy to odpytać, filtrując pod kątem konkretnego bloku. Spróbujemy z blokiem 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Oto wynik SQL w Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Ten pojedynczy blok dodany do łańcucha zmienia stan Maszyny Wirtualnej Ethereum ([EVM](/developers/docs/evm/)). Dziesiątki, a czasem setki transakcji są weryfikowane jednocześnie. W tym konkretnym przypadku uwzględniono 222 transakcje.

Aby zobaczyć, ile z nich faktycznie zakończyło się sukcesem, dodalibyśmy kolejny filtr do zliczania udanych transakcji:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Dla bloku 12396854, z 222 wszystkich transakcji, 204 zostały pomyślnie zweryfikowane:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Żądania transakcji występują dziesiątki razy na sekundę, ale bloki są dodawane tylko okresowo ([źródło](/developers/docs/blocks/)). W ramach dowodu pracy (PoW) blok był kopany średnio co 13 do 15 sekund, z dużą zmiennością. Od czasu [The Merge](/roadmap/merge/) we wrześniu 2022 r., dowód stawki (PoS) dzieli czas na 12-sekundowe sloty, a każdy slot może mieć co najwyżej jeden blok.

Więc dzisiaj może być co najwyżej 86400 / 12 = 7200 bloków dziennie. W praktyce jest ich nieco mniej, ponieważ walidator czasami omija swój slot.

Wykres bloków Ethereum produkowanych dziennie (2016 - 2021) to:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Średnia liczba bloków produkowanych dziennie w tym okresie wynosi ~5 874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Zapytania to:

Oto zapytanie do wizualizacji liczby bloków produkowanych dziennie. Klauzula `WHERE` wyklucza bieżący dzień, który jeszcze się nie skończył.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

A to zapytanie oblicza średnią liczbę bloków produkowanych dziennie, przed i po The Merge. Blok 15537394 to pierwszy blok dowodu stawki (PoS).

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

Kiedy ten samouczek został po raz pierwszy napisany w maju 2021 r., średnia wynosiła 5 874 bloki dziennie, czyli jeden blok co 14,7 sekundy. Po The Merge średnia jest tuż poniżej maksimum 7200, czyli około jednego bloku co 12 sekund.

### Gaz {#gas}

Bloki mają ograniczony rozmiar. Każdy blok ma limit gazu, a od czasu [EIP-1559](/developers/docs/gas/#base-fee) każdy blok ma również cel gazowy, który stanowi połowę limitu. Kiedy bloki zużywają więcej gazu niż wynosi cel, opłata podstawowa rośnie, a kiedy zużywają mniej, spada. Sam limit gazu jest dostosowywany przez walidatorów i na przestrzeni lat był kilkakrotnie podnoszony. Limity są wymagane, aby zapobiec arbitralnie dużym rozmiarom bloków, które obciążałyby pełne węzły pod względem przestrzeni dyskowej i wymagań dotyczących szybkości ([źródło](/developers/docs/blocks/)).

Jednym ze sposobów na konceptualizację limitu gazu w bloku jest myślenie o nim jako o **podaży** dostępnej przestrzeni bloku, w której można grupować transakcje. Limit gazu w bloku można odpytać i zwizualizować od 2016 roku do dnia dzisiejszego:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Następnie mamy rzeczywisty gaz zużywany codziennie do opłacania obliczeń wykonywanych w łańcuchu Ethereum (tj. wysyłanie transakcji, wywoływanie inteligentnego kontraktu, wybijanie niewymiennego tokena (NFT)). Jest to **popyt** na dostępną przestrzeń bloków Ethereum:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Możemy również zestawić te dwa wykresy razem, aby zobaczyć, jak układają się **popyt i podaż**:

![gas_demand_supply](./gas_demand_supply.png)

Dlatego możemy rozumieć ceny gazu jako funkcję popytu na przestrzeń bloków Ethereum, przy danej dostępnej podaży.

Na koniec możemy chcieć odpytać średnie dzienne ceny gazu dla łańcucha Ethereum, jednak zrobienie tego spowoduje wyjątkowo długi czas zapytania, więc przefiltrujemy nasze zapytanie do średniej ilości gazu płaconej za transakcję przez Fundację Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Możemy zobaczyć ceny gazu zapłacone za wszystkie transakcje dokonane na adres Fundacji Ethereum na przestrzeni lat. Oto zapytanie:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Podsumowanie {#summary}

Dzięki temu samouczkowi rozumiemy podstawowe koncepcje Ethereum i to, jak działa blockchain Ethereum, poprzez odpytywanie i zapoznawanie się z danymi onchain.

Pulpit nawigacyjny zawierający cały kod użyty w tym samouczku można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum).

Aby dowiedzieć się więcej o wykorzystaniu danych do eksploracji Web3, [znajdź mnie na Twitterze](https://twitter.com/paulapivat).
