---
title: "Poznaj podstawowe zagadnienia Ethereum za pomocą SQL"
description: "Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych onchain za pomocą języka SQL (Structured Query Language)."
author: "Paul Apivat"
tags: ["SQL", "zapytania", "transakcje", "dane i analityka"]
skill: beginner
breadcrumb: Ethereum z SQL
lang: pl
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Wiele samouczków dotyczących Ethereum jest skierowanych do programistów, ale brakuje materiałów edukacyjnych dla analityków danych lub osób, które chcą przeglądać dane onchain bez uruchamiania klienta lub węzła.

Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych onchain za pomocą języka SQL (Structured Query Language) przez interfejs udostępniany przez [Dune Analytics](https://dune.com/).

Dane onchain mogą pomóc nam zrozumieć Ethereum, sieć oraz ekonomię mocy obliczeniowej, a także powinny służyć jako podstawa do zrozumienia wyzwań stojących dziś przed Ethereum (np. rosnące ceny gazu) i, co ważniejsze, dyskusji na temat rozwiązań skalujących.

### Transakcje {#transactions}

Podróż użytkownika w Ethereum zaczyna się od zainicjowania konta kontrolowanego przez użytkownika lub podmiotu z saldem ETH. Istnieją dwa typy kont – kontrolowane przez użytkownika lub inteligentny kontrakt (zobacz [ethereum.org](/developers/docs/accounts/)).

Każde konto można wyświetlić w eksploratorze bloków, takim jak [Etherscan](https://etherscan.io/) lub [Blockscout](https://eth.blockscout.com/). Eksploratory bloków to portal do danych Ethereum. Wyświetlają one w czasie rzeczywistym dane o blokach, transakcjach, górnikach, kontach i innej aktywności onchain (zobacz [tutaj](/developers/docs/data-and-analytics/block-explorers/)).

Użytkownik może jednak chcieć bezpośrednio odpytywać dane, aby zweryfikować informacje dostarczane przez zewnętrzne eksploratory bloków. [Dune Analytics](https://dune.com/) zapewnia taką możliwość każdemu, kto posiada pewną wiedzę na temat SQL.

Dla porównania, konto inteligentnego kontraktu Fundacji Ethereum (EF) można zobaczyć w [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Należy zauważyć, że wszystkie konta, w tym konto EF, mają publiczny adres, który może być używany do wysyłania i odbierania transakcji.

Saldo konta w Etherscan obejmuje zwykłe transakcje i transakcje wewnętrzne. Transakcje wewnętrzne, wbrew nazwie, nie są _rzeczywistymi_ transakcjami, które zmieniają stan łańcucha. Są to transfery wartości inicjowane przez wykonanie kontraktu ([źródło](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Ponieważ transakcje wewnętrzne nie mają podpisu, **nie** są one uwzględniane w blockchainie i nie można ich odpytywać za pomocą Dune Analytics.

Dlatego ten samouczek skupi się na zwykłych transakcjach. Można je odpytywać w następujący sposób:

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
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
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

Przyniesie to te same informacje, co na stronie transakcji Etherscan. Dla porównania, oto dwa źródła:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Strona kontraktu EF w Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Pulpit nawigacyjny można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum). Kliknij tabelę, aby zobaczyć zapytanie (zobacz również powyżej).

### Analiza transakcji {#breaking-down-transactions}

Przesłana transakcja zawiera kilka informacji, w tym ([źródło](/developers/docs/transactions/)):

- **Odbiorca (Recipient)**: Adres odbierający (odpytywany jako „to”).
- **Podpis (Signature)**: Chociaż klucze prywatne nadawcy podpisują transakcję, to, co możemy odpytać za pomocą SQL, to publiczny adres nadawcy („from”).
- **Wartość (Value)**: Jest to ilość przesłanego ETH (zobacz kolumnę `ether`).
- **Dane (Data)**: Są to dowolne dane, które zostały zahashowane (zobacz kolumnę `data`).
- **gasLimit** – maksymalna ilość jednostek gazu, która może zostać zużyta przez transakcję. Jednostki gazu reprezentują kroki obliczeniowe.
- **maxPriorityFeePerGas** – maksymalna ilość gazu, która ma zostać uwzględniona jako opłata priorytetowa dla górnika.
- **maxFeePerGas** – maksymalna ilość gazu, jaką użytkownik jest skłonny zapłacić za transakcję (łącznie z baseFeePerGas i maxPriorityFeePerGas).

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
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Bloki {#blocks}

Każda transakcja zmieni stan Wirtualnej Maszyny Ethereum ([EVM](/developers/docs/evm/)) ([źródło](/developers/docs/transactions/)). Transakcje są rozgłaszane w sieci w celu weryfikacji i włączenia do bloku. Każda transakcja jest powiązana z numerem bloku. Aby zobaczyć dane, moglibyśmy odpytać konkretny numer bloku: 12396854 (najnowszy blok wśród transakcji Fundacji Ethereum w momencie pisania tego tekstu, 11.05.2021 r.).

Co więcej, gdy odpytamy dwa kolejne bloki, zobaczymy, że każdy blok zawiera hash poprzedniego bloku (tj. hash rodzica), co ilustruje, w jaki sposób powstaje blockchain.

Każdy blok zawiera odniesienie do swojego bloku nadrzędnego (rodzica). Pokazano to poniżej między kolumnami `hash` i `parent_hash` ([źródło](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Oto [zapytanie](https://dune.com/queries/44856/88292) w Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Możemy zbadać blok, odpytując czas, numer bloku, trudność, hash, hash rodzica i nonce.

Jedyną rzeczą, której to zapytanie nie obejmuje, jest _lista transakcji_, która wymaga osobnego zapytania poniżej, oraz _korzeń stanu (state root)_. Pełny lub archiwalny węzeł będzie przechowywał wszystkie transakcje i przejścia stanów, umożliwiając klientom odpytywanie stanu łańcucha w dowolnym momencie. Ponieważ wymaga to dużej przestrzeni dyskowej, możemy oddzielić dane łańcucha od danych stanu:

- Dane łańcucha (lista bloków, transakcje)
- Dane stanu (wynik przejścia stanu każdej transakcji)

Korzeń stanu należy do tej drugiej kategorii i jest daną _niejawną_ (nieprzechowywaną onchain), podczas gdy dane łańcucha są jawne i przechowywane w samym łańcuchu ([źródło](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

W tym samouczku skupimy się na danych onchain, które _mogą_ być odpytywane za pomocą SQL przez Dune Analytics.

Jak wspomniano powyżej, każdy blok zawiera listę transakcji, którą możemy odpytać, filtrując pod kątem konkretnego bloku. Wypróbujemy najnowszy blok, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Oto wynik SQL w Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Ten pojedynczy blok dodany do łańcucha zmienia stan Wirtualnej Maszyny Ethereum ([EVM](/developers/docs/evm/)). Dziesiątki, a czasem setki transakcji są weryfikowane jednocześnie. W tym konkretnym przypadku uwzględniono 222 transakcje.

Aby zobaczyć, ile z nich faktycznie zakończyło się sukcesem, dodalibyśmy kolejny filtr do zliczania udanych transakcji:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Dla bloku 12396854, z 222 wszystkich transakcji, 204 zostały pomyślnie zweryfikowane:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Żądania transakcji występują dziesiątki razy na sekundę, ale bloki są zatwierdzane mniej więcej raz na 15 sekund ([źródło](/developers/docs/blocks/)).

Aby zobaczyć, że jeden blok jest produkowany mniej więcej co 15 sekund, moglibyśmy wziąć liczbę sekund w dniu (86400) i podzielić przez 15, aby uzyskać szacunkową średnią liczbę bloków dziennie (~ 5760).

Wykres bloków Ethereum produkowanych dziennie (od 2016 r. do chwili obecnej) to:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Średnia liczba bloków produkowanych dziennie w tym okresie wynosi ~5874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Zapytania to:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

Średnia liczba bloków produkowanych dziennie od 2016 roku jest nieco wyższa i wynosi 5874. Alternatywnie, podzielenie 86400 sekund przez średnio 5874 bloki daje 14,7 sekundy, czyli w przybliżeniu jeden blok co 15 sekund.

### Gaz {#gas}

Bloki mają ograniczony rozmiar. Maksymalny rozmiar bloku jest dynamiczny i zmienia się w zależności od zapotrzebowania sieci od 12 500 000 do 25 000 000 jednostek. Limity są wymagane, aby zapobiec obciążaniu pełnych węzłów przez arbitralnie duże rozmiary bloków pod względem wymagań dotyczących przestrzeni dyskowej i szybkości ([źródło](/developers/docs/blocks/)).

Jednym ze sposobów na konceptualizację limitu gazu w bloku jest myślenie o nim jako o **podaży** dostępnej przestrzeni bloku, w której można grupować transakcje. Limit gazu w bloku można odpytywać i wizualizować od 2016 roku do dnia dzisiejszego:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Następnie mamy rzeczywisty gaz zużywany codziennie do opłacania obliczeń wykonywanych w łańcuchu Ethereum (tj. wysyłanie transakcji, wywoływanie inteligentnego kontraktu, wybijanie NFT). Jest to **popyt** na dostępną przestrzeń bloków Ethereum:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Możemy również zestawić te dwa wykresy razem, aby zobaczyć, jak kształtują się **popyt i podaż**:

![gas_demand_supply](./gas_demand_supply.png)

Dlatego możemy rozumieć ceny gazu jako funkcję popytu na przestrzeń bloków Ethereum przy danej dostępnej podaży.

Na koniec możemy chcieć odpytać średnie dzienne ceny gazu dla łańcucha Ethereum, jednak zrobienie tego spowoduje wyjątkowo długi czas zapytania, więc przefiltrujemy nasze zapytanie do średniej ilości gazu płaconej za transakcję przez Fundację Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Możemy zobaczyć ceny gazu płacone za wszystkie transakcje dokonane na adres Fundacji Ethereum na przestrzeni lat. Oto zapytanie:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Podsumowanie {#summary}

Dzięki temu samouczkowi rozumiemy podstawowe koncepcje Ethereum i sposób działania blockchaina Ethereum poprzez odpytywanie i zapoznanie się z danymi onchain.

Pulpit nawigacyjny zawierający cały kod użyty w tym samouczku można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum).

Aby dowiedzieć się więcej o wykorzystaniu danych do eksploracji Web3, [znajdź mnie na Twitterze](https://twitter.com/paulapivat).