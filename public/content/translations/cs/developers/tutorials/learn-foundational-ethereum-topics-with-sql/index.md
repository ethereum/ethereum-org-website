---
title: Naučte se základní témata Etherea pomocí SQL
description: Tento tutoriál pomáhá čtenářům pochopit základní koncepty Etherea, včetně transakcí, bloků a paliva, a to pomocí dotazování na onchain data pomocí jazyka SQL (Structured Query Language).
author: "Paul Apivat"
tags: [ "SQL", "Dotazování", "Transakce" ]
skill: beginner
lang: cs
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Mnoho tutoriálů o Ethereu se zaměřuje na vývojáře, ale chybí vzdělávací zdroje pro datové analytiky nebo pro lidi, kteří chtějí vidět onchain data bez spuštění klienta nebo uzlu.

Tento tutoriál pomáhá čtenářům pochopit základní koncepty Etherea, včetně transakcí, bloků a paliva, a to pomocí dotazování na onchain data pomocí jazyka SQL (structured query language) přes rozhraní poskytované [Dune Analytics](https://dune.com/).

Onchain data nám může pomoci pochopit Ethereum, síť a jako ekonomiku pro výpočetní výkon a mělo by sloužit jako základ pro pochopení výzev, kterým Ethereum dnes čelí (tj. rostoucí ceny paliva) a co je důležitější, diskusí o řešeních škálování.

### Transakce {#transactions}

Cesta uživatele v síti Ethereum začíná inicializací účtu ovládaného uživatelem nebo entity se zůstatkem v ETH. Existují dva typy účtů – ovládané uživatelem nebo chytrým kontraktem (viz [ethereum.org](/developers/docs/accounts/)).

Jakýkoli účet lze zobrazit v prohlížeči bloků, jako je [Etherscan](https://etherscan.io/) nebo [Blockscout](https://eth.blockscout.com/). Prohlížeče bloků jsou portálem k datům Etherea. Zobrazují v reálném čase data o blocích, transakcích, těžařích, účtech a dalších onchain aktivitách (viz [zde](/developers/docs/data-and-analytics/block-explorers/)).

Uživatel si však může přát dotazovat se na data přímo, aby si ověřil informace poskytované externími prohlížeči bloků. [Dune Analytics](https://dune.com/) poskytuje tuto možnost každému, kdo má alespoň nějaké znalosti SQL.

Pro informaci, účet chytrého kontraktu Nadace Ethereum (EF) si můžete prohlédnout na [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Jedna věc, kterou je třeba poznamenat, je, že všechny účty, včetně účtu EF, mají veřejnou adresu, kterou lze použít k odesílání a přijímání transakcí.

Zůstatek na účtu na Etherscanu se skládá z běžných transakcí a interních transakcí. Interní transakce, navzdory svému názvu, nejsou _skutečnými_ transakcemi, které mění stav řetězce. Jedná se o převody hodnot iniciované provedením kontraktu ([zdroj](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Vzhledem k tomu, že interní transakce nemají podpis, **nejsou** zahrnuty v blockchainu a nelze je dotazovat pomocí Dune Analytics.

Tento tutoriál se proto zaměří na běžné transakce. Lze se na ně dotazovat takto:

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

Tím získáte stejné informace, jaké jsou uvedeny na stránce transakcí na Etherscanu. Pro srovnání, zde jsou dva zdroje:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Stránka kontraktu EF na Blockscoutu.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Řídicí panel najdete [zde](https://dune.com/paulapivat/Learn-Ethereum). Kliknutím na tabulku zobrazíte dotaz (viz také výše).

### Rozbor transakcí {#breaking_down_transactions}

Odeslaná transakce obsahuje několik informací, včetně ([zdroj](/developers/docs/transactions/)):

- **Příjemce**: Přijímající adresa (v dotazu jako \"to\")
- **Podpis**: Zatímco transakci podepisují soukromé klíče odesílatele, my můžeme pomocí SQL dotazovat veřejnou adresu odesílatele (\"from\").
- **Hodnota**: Jedná se o množství převedených ETH (viz sloupec `ether`).
- **Data**: Jedná se o libovolná data, která byla zahašována (viz sloupec `data`)
- **gasLimit** – maximální množství jednotek paliva, které může být transakcí spotřebováno. Jednotky paliva představují výpočetní kroky
- **maxPriorityFeePerGas** – maximální množství paliva, které bude zahrnuto jako spropitné pro těžaře
- **maxFeePerGas** – maximální množství paliva, které je uživatel ochoten zaplatit za transakci (včetně baseFeePerGas a maxPriorityFeePerGas)

Tyto konkrétní informace můžeme dotazovat pro transakce na veřejnou adresu Nadace Ethereum:

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

### Bloky {#blocks}

Každá transakce změní stav Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) ([zdroj](/developers/docs/transactions/)). Transakce jsou vysílány do sítě, aby byly ověřeny a zahrnuty do bloku. Každá transakce je spojena s číslem bloku. Abychom viděli data, mohli bychom se dotázat na konkrétní číslo bloku: 12396854 (nejnovější blok mezi transakcemi Nadace Ethereum v době psaní tohoto článku, 11/5/21).

Když se navíc dotážeme na další dva bloky, uvidíme, že každý blok obsahuje haš předchozího bloku (tj. rodičovský haš), což ukazuje, jak se blockchain tvoří.

Každý blok obsahuje odkaz na svůj rodičovský blok. To je ukázáno níže mezi sloupci `hash` a `parent_hash` ([zdroj](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Zde je [dotaz](https://dune.com/queries/44856/88292) na Dune Analytics:

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

Blok můžeme prozkoumat dotazováním na čas, číslo bloku, obtížnost, haš, rodičovský haš a nonce.

Jediná věc, kterou tento dotaz nepokrývá, je _seznam transakcí_, který vyžaduje samostatný dotaz níže, a _kořen stavu_. Plný nebo archivní uzel ukládá všechny transakce a přechody stavů, což klientům umožňuje kdykoli dotazovat stav řetězce. Protože to vyžaduje velký úložný prostor, můžeme oddělit data řetězce od dat stavu:

- Data řetězce (seznam bloků, transakcí)
- Data stavu (výsledek přechodu stavu každé transakce)

Kořen stavu spadá do druhé kategorie a je _implicitními_ daty (není uložen onchain), zatímco data řetězce jsou explicitní a uložena na samotném řetězci ([zdroj](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

V tomto tutoriálu se zaměříme na onchain data, na která _se lze_ dotazovat pomocí SQL přes Dune Analytics.

Jak bylo uvedeno výše, každý blok obsahuje seznam transakcí, které můžeme dotazovat filtrováním pro konkrétní blok. Zkusíme nejnovější blok, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Zde je výstup SQL na Dune:

![](./list_of_txn.png)

Tento jediný blok přidaný do řetězce mění stav Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Najednou se ověřují desítky, někdy i stovky transakcí. V tomto konkrétním případě bylo zahrnuto 222 transakcí.

Abychom viděli, kolik jich bylo skutečně úspěšných, přidáme další filtr pro počítání úspěšných transakcí:

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

Pro blok 12396854 bylo z celkových 222 transakcí úspěšně ověřeno 204:

![](./successful_txn.png)

Požadavky na transakce se objevují desítkykrát za sekundu, ale bloky jsou zapisovány přibližně jednou za 15 sekund ([zdroj](/developers/docs/blocks/)).

Abychom viděli, že se jeden blok vyprodukuje přibližně každých 15 sekund, můžeme vzít počet sekund za den (86400) a vydělit jej 15, abychom získali odhadovaný průměrný počet bloků za den (~ 5760).

Graf pro vyprodukované bloky Etherea za den (2016 - současnost) je:

![](./daily_blocks.png)

Průměrný počet denně vyprodukovaných bloků za toto období je ~5 874:

![](./avg_daily_blocks.png)

Dotazy jsou:

```sql
# dotaz pro vizualizaci počtu denně vytvořených bloků od roku 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# průměrný počet denně vytvořených bloků

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

Průměrný počet denně vytvořených bloků od roku 2016 je mírně nad tímto číslem, a to 5 874. Alternativně, vydělením 86 400 sekund 5 874 průměrnými bloky získáme 14,7 sekundy, tedy přibližně jeden blok každých 15 sekund.

### Gas {#gas}

Bloky mají omezenou velikost. Maximální velikost bloku je dynamická a liší se podle poptávky v síti mezi 12 500 000 a 25 000 000 jednotkami. Limity jsou nutné k tomu, aby se zabránilo libovolně velkým blokům, které by zatěžovaly plné uzly z hlediska požadavků na diskový prostor a rychlost ([zdroj](/developers/docs/blocks/)).

Jeden ze způsobů, jak si představit palivový limit bloku, je vnímat ho jako **nabídku** dostupného prostoru v bloku, do kterého se dávkují transakce. Palivový limit bloku lze dotazovat a vizualizovat od roku 2016 do současnosti:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Dále je tu skutečné množství paliva použitého denně k placení za výpočty prováděné v řetězci Ethereum (tj. odeslání transakce, volání chytrého kontraktu, ražba NFT). Toto je **poptávka** po dostupném prostoru v bloku Etherea:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Můžeme také postavit tyto dva grafy vedle sebe, abychom viděli, jak se shoduje **poptávka a nabídka**:

![gas_demand_supply](./gas_demand_supply.png)

Proto můžeme ceny paliva chápat jako funkci poptávky po prostoru v bloku Etherea při dané dostupné nabídce.

Nakonec bychom se mohli chtít dotázat na průměrné denní ceny paliva pro řetězec Ethereum, nicméně to by vedlo k obzvláště dlouhé době dotazu, takže náš dotaz omezíme na průměrné množství paliva zaplaceného za transakci Nadací Ethereum.

![](./ef_daily_gas.png)

Můžeme vidět ceny paliva zaplacené za všechny transakce provedené na adresu Nadace Ethereum v průběhu let. Zde je dotaz:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Shrnutí {#summary}

Díky tomuto tutoriálu rozumíme základním konceptům Etherea a tomu, jak funguje blockchain Etherea, a to díky dotazování a získávání přehledu o onchain datech.

Řídicí panel, který obsahuje veškerý kód použitý v tomto tutoriálu, naleznete [zde](https://dune.com/paulapivat/Learn-Ethereum).

Pro další využití dat k prozkoumání web3 mě [najdete na Twitteru](https://twitter.com/paulapivat).
