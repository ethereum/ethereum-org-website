---
title: Naucz się podstawowych zagadnień Ethereum za pomocą SQL
description: Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych w łańcuchu za pomocą języka zapytań strukturalnych (SQL).
author: "Paul Apivat"
tags: [ "SQL", "Wykonywanie zapytań", "Transakcje" ]
skill: beginner
lang: pl
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Wiele samouczków Ethereum jest skierowanych do deweloperów, ale brakuje zasobów edukacyjnych dla analityków danych lub dla osób, które chcą zobaczyć dane w łańcuchu bez uruchamiania klienta lub węzła.

Ten samouczek pomaga czytelnikom zrozumieć podstawowe koncepcje Ethereum, w tym transakcje, bloki i gaz, poprzez odpytywanie danych w łańcuchu za pomocą języka zapytań strukturalnych (SQL) za pośrednictwem interfejsu dostarczanego przez [Dune Analytics](https://dune.com/).

Dane w łańcuchu mogą pomóc nam zrozumieć Ethereum, sieć i ekonomię mocy obliczeniowej oraz powinny służyć jako podstawa do zrozumienia wyzwań, przed którymi stoi dziś Ethereum (tj. rosnących cen gazu), a co ważniejsze, dyskusji na temat rozwiązań skalujących.

### Transakcje {#transactions}

Podróż użytkownika w Ethereum rozpoczyna się od zainicjowania konta kontrolowanego przez użytkownika lub podmiotu z saldem ETH. Istnieją dwa typy kont – kontrolowane przez użytkownika lub inteligentny kontrakt (zobacz [ethereum.org](/developers/docs/accounts/)).

Każde konto można wyświetlić w eksploratorze bloków, takim jak [Etherscan](https://etherscan.io/) lub [Blockscout](https://eth.blockscout.com/). Eksploratory bloków to portal do danych Ethereum. Wyświetlają w czasie rzeczywistym dane o blokach, transakcjach, górnikach, kontach i innej aktywności w łańcuchu (zobacz [tutaj](/developers/docs/data-and-analytics/block-explorers/)).

Jednak użytkownik może chcieć bezpośrednio odpytać dane, aby uzgodnić informacje dostarczane przez zewnętrzne eksploratory bloków. [Dune Analytics](https://dune.com/) zapewnia tę możliwość każdemu, kto ma pewną wiedzę na temat SQL.

Dla porównania, konto inteligentnego kontraktu Fundacji Ethereum (EF) można zobaczyć na [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Należy zauważyć, że wszystkie konta, w tym EF, mają publiczny adres, który może być używany do wysyłania i odbierania transakcji.

Saldo konta na Etherscan obejmuje transakcje zwykłe i transakcje wewnętrzne. Transakcje wewnętrzne, wbrew nazwie, nie są _faktycznymi_ transakcjami, które zmieniają stan łańcucha. Są to transfery wartości inicjowane przez wykonanie kontraktu ([źródło](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Ponieważ transakcje wewnętrzne nie mają podpisu, **nie** są one uwzględniane w blockchainie i nie można ich odpytywać za pomocą Dune Analytics.

Dlatego ten samouczek skupi się na zwykłych transakcjach. Można to zrobić za pomocą następującego zapytania:

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

Spowoduje to uzyskanie tych samych informacji, co na stronie transakcji Etherscan. Dla porównania, oto dwa źródła:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Strona kontraktu EF na Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Pulpit nawigacyjny można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum). Kliknij tabelę, aby zobaczyć zapytanie (zobacz również powyżej).

### Analiza transakcji {#breaking_down_transactions}

Przesłana transakcja zawiera kilka informacji, w tym ([źródło](/developers/docs/transactions/)):

- **Odbiorca**: adres odbiorcy (w zapytaniu jako "to")
- **Podpis**: chociaż klucze prywatne nadawcy podpisują transakcję, to, co możemy odpytać za pomocą SQL, to publiczny adres nadawcy ("from").
- **Wartość**: jest to ilość przesłanego ETH (zobacz kolumnę `ether`).
- **Dane**: Są to dowolne dane, które zostały zhaszowane (zobacz kolumnę `data`)
- **gasLimit** – maksymalna ilość jednostek gazu, które mogą zostać zużyte przez transakcję. Jednostki gazu reprezentują kroki obliczeniowe
- **maxPriorityFeePerGas** – maksymalna ilość gazu, która zostanie uwzględniona jako napiwek dla górnika
- **maxFeePerGas** – maksymalna kwota za gaz, jaką użytkownik jest skłonny zapłacić za transakcję (włączając baseFeePerGas i maxPriorityFeePerGas)

Możemy zapytać o te konkretne informacje dotyczące transakcji na publiczny adres Fundacji Ethereum:

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

Każda transakcja zmieni stan Wirtualnej Maszyny Ethereum ([EVM](/developers/docs/evm/)) ([źródło](/developers/docs/transactions/)). Transakcje są rozgłaszane w sieci w celu weryfikacji i włączenia do bloku. Każda transakcja jest powiązana z numerem bloku. Aby zobaczyć dane, możemy odpytać konkretny numer bloku: 12396854 (najnowszy blok wśród transakcji Fundacji Ethereum w momencie pisania tego tekstu, 11.05.21).

Co więcej, gdy wykonamy zapytanie dla dwóch kolejnych bloków, zobaczymy, że każdy blok zawiera hasz poprzedniego bloku (tj. hasz nadrzędny), co ilustruje sposób tworzenia blockchainu.

Każdy blok zawiera odniesienie do swojego bloku nadrzędnego. Jest to pokazane poniżej między kolumnami `hash` i `parent_hash` ([źródło](/developers/docs/blocks/)):

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

Możemy zbadać blok, odpytując o czas, numer bloku, trudność, hasz, hasz nadrzędny i nonce.

Jedyne, czego to zapytanie nie obejmuje, to _lista transakcji_, która wymaga osobnego zapytania poniżej, oraz _korzeń stanu_. Pełny lub archiwalny węzeł przechowuje wszystkie transakcje i przejścia stanów, pozwalając klientom na odpytywanie stanu łańcucha w dowolnym momencie. Ponieważ wymaga to dużej przestrzeni dyskowej, możemy oddzielić dane łańcucha od danych stanu:

- Dane łańcucha (lista bloków, transakcji)
- Dane stanu (wynik przejścia stanu każdej transakcji)

Korzeń stanu należy do tej drugiej kategorii i jest daną _niejawną_ (nie jest przechowywany w łańcuchu), podczas gdy dane łańcucha są jawne i przechowywane w samym łańcuchu ([źródło](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

W tym samouczku skupimy się na danych w łańcuchu, które _można_ odpytywać za pomocą SQL za pośrednictwem Dune Analytics.

Jak wspomniano powyżej, każdy blok zawiera listę transakcji, możemy to odpytać, filtrując według konkretnego bloku. Spróbujemy z najnowszym blokiem, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Oto wynik SQL w Dune:

![](./list_of_txn.png)

Ten pojedynczy blok dodany do łańcucha zmienia stan Wirtualnej Maszyny Ethereum ([EVM](/developers/docs/evm/)). Jednocześnie weryfikowane są dziesiątki, a czasem setki transakcji. W tym konkretnym przypadku uwzględniono 222 transakcje.

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

![](./successful_txn.png)

Żądania transakcji pojawiają się dziesiątki razy na sekundę, ale bloki są zatwierdzane mniej więcej raz na 15 sekund ([źródło](/developers/docs/blocks/)).

Aby zobaczyć, że jeden blok jest produkowany mniej więcej co 15 sekund, możemy wziąć liczbę sekund w ciągu dnia (86400) i podzielić ją przez 15, aby uzyskać szacunkową średnią liczbę bloków dziennie (~ 5760).

Wykres dla bloków Ethereum produkowanych dziennie (2016 – obecnie) to:

![](./daily_blocks.png)

Średnia liczba produkowanych dziennie bloków w tym okresie wynosi ~5874:

![](./avg_daily_blocks.png)

Zapytania są następujące:

```sql
# zapytanie wizualizujące liczbę bloków produkowanych dziennie od 2016 roku

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# średnia liczba bloków produkowanych dziennie

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

Średnia liczba bloków produkowanych dziennie od 2016 roku jest nieco powyżej tej liczby i wynosi 5874. Alternatywnie, podzielenie 86400 sekund przez 5874 średnich bloków daje 14,7 sekundy, czyli około jednego bloku co 15 sekund.

### Gaz {#gas}

Bloki mają ograniczony rozmiar. Maksymalny rozmiar bloku jest dynamiczny i zmienia się w zależności od zapotrzebowania sieci między 12 500 000 a 25 000 000 jednostek. Limity są wymagane, aby zapobiec arbitralnie dużym rozmiarom bloków obciążającym pełne węzły pod względem przestrzeni dyskowej i wymagań dotyczących prędkości ([źródło](/developers/docs/blocks/)).

Jednym ze sposobów konceptualizacji limitu gazu w bloku jest myślenie o nim jako o **podaży** dostępnej przestrzeni blokowej, w której można grupować transakcje. Limit gazu w bloku można odpytywać i wizualizować od 2016 roku do dnia dzisiejszego:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Następnie jest rzeczywisty gaz zużywany codziennie do opłacenia obliczeń wykonanych w łańcuchu Ethereum (tj. wysyłanie transakcji, wywoływanie inteligentnego kontraktu, mintowanie NFT). To jest **popyt** na dostępną przestrzeń blokową Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Możemy również zestawić te dwa wykresy razem, aby zobaczyć, jak układają się **popyt i podaż**:

![gas_demand_supply](./gas_demand_supply.png)

Dlatego możemy rozumieć ceny gazu jako funkcję popytu na przestrzeń blokową Ethereum, przy dostępnej podaży.

Wreszcie, możemy chcieć odpytać o średnie dzienne ceny gazu dla łańcucha Ethereum, jednak spowoduje to szczególnie długi czas zapytania, więc przefiltrujemy nasze zapytanie do średniej ilości gazu płaconego za transakcję przez Fundację Ethereum.

![](./ef_daily_gas.png)

Możemy zobaczyć ceny gazu zapłacone za wszystkie transakcje dokonane na adres Fundacji Ethereum na przestrzeni lat. Oto zapytanie:

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

Dzięki temu samouczkowi rozumiemy podstawowe koncepcje Ethereum i sposób działania blockchainu Ethereum poprzez odpytywanie i poznawanie danych w łańcuchu.

Pulpit nawigacyjny, który zawiera cały kod użyty w tym samouczku, można znaleźć [tutaj](https://dune.com/paulapivat/Learn-Ethereum).

Aby dowiedzieć się więcej o wykorzystaniu danych do eksploracji web3, [znajdź mnie na Twitterze](https://twitter.com/paulapivat).
