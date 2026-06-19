---
title: Naučte se základní témata Etherea pomocí SQL
description: Tento tutoriál pomáhá čtenářům pochopit základní koncepty Etherea, včetně transakcí, bloků a gasu, pomocí dotazování na onchain data prostřednictvím jazyka SQL (Structured Query Language).
author: "Paul Apivat"
tags: ["SQL", "dotazování", "transakce", "data a analytika"]
skill: beginner
breadcrumb: Ethereum pomocí SQL
lang: cs
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Mnoho tutoriálů o Ethereu cílí na vývojáře, ale chybí vzdělávací zdroje pro datové analytiky nebo pro lidi, kteří chtějí vidět onchain data bez spuštění klienta nebo uzlu.

Tento tutoriál pomáhá čtenářům pochopit základní koncepty Etherea, včetně transakcí, bloků a gasu, pomocí dotazování na onchain data prostřednictvím jazyka SQL (Structured Query Language) přes rozhraní, které poskytuje [Dune Analytics](https://dune.com/).

Onchain data nám mohou pomoci pochopit Ethereum, síť a ekonomiku výpočetního výkonu a měla by sloužit jako základ pro pochopení výzev, kterým Ethereum dnes čelí (např. rostoucí ceny gasu), a co je důležitější, diskusí o řešeních škálování.

### Transakce {#transactions}

Cesta uživatele na Ethereu začíná inicializací uživatelem ovládaného účtu nebo entity se zůstatkem ETH. Existují dva typy účtů – uživatelem ovládané nebo chytrý kontrakt (viz [ethereum.org](/developers/docs/accounts/)).

Jakýkoli účet lze zobrazit v prohlížeči bloků, jako je [Etherscan](https://etherscan.io/) nebo [Blockscout](https://eth.blockscout.com/). Prohlížeče bloků jsou portálem k datům Etherea. V reálném čase zobrazují data o blocích, transakcích, těžařích, účtech a další onchain aktivitě (viz [zde](/developers/docs/data-and-analytics/block-explorers/)).

Uživatel však může chtít dotazovat data přímo, aby si ověřil informace poskytované externími prohlížeči bloků. [Dune Analytics](https://dune.com/) poskytuje tuto možnost každému s určitou znalostí SQL.

Pro referenci, účet chytrého kontraktu pro Nadaci Ethereum (EF) lze zobrazit na [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Je třeba poznamenat, že všechny účty, včetně účtu EF, mají veřejnou adresu, kterou lze použít k odesílání a přijímání transakcí.

Zůstatek účtu na Etherscanu se skládá z běžných transakcí a interních transakcí. Interní transakce, navzdory svému názvu, nejsou _skutečné_ transakce, které by měnily stav řetězce. Jsou to převody hodnoty iniciované spuštěním kontraktu ([zdroj](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Vzhledem k tomu, že interní transakce nemají žádný podpis, **nejsou** zahrnuty na blockchainu a nelze je dotazovat pomocí Dune Analytics.

Proto se tento tutoriál zaměří na běžné transakce. Ty lze dotazovat takto:

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

To přinese stejné informace, jaké jsou uvedeny na stránce transakcí Etherscanu. Pro srovnání, zde jsou oba zdroje:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Stránka kontraktu EF na Blockscoutu.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Nástěnku (dashboard) najdete [zde](https://dune.com/paulapivat/Learn-Ethereum). Kliknutím na tabulku zobrazíte dotaz (viz také výše).

### Rozbor transakcí {#breaking-down-transactions}

Odeslaná transakce obsahuje několik informací, včetně ([zdroj](/developers/docs/transactions/)):

- **Příjemce**: Přijímající adresa (dotazováno jako "to")
- **Podpis**: Zatímco soukromé klíče odesílatele podepisují transakci, to, co můžeme dotazovat pomocí SQL, je veřejná adresa odesílatele ("from").
- **Hodnota**: Toto je množství převedených ETH (viz sloupec `ether`).
- **Data**: Jedná se o libovolná data, která byla zahašována (viz sloupec `data`)
- **gasLimit** – maximální množství jednotek gasu, které může transakce spotřebovat. Jednotky gasu představují výpočetní kroky
- **maxPriorityFeePerGas** - maximální množství gasu, které má být zahrnuto jako prioritní poplatek pro těžaře
- **maxFeePerGas** - maximální množství gasu, které je odesílatel ochoten zaplatit za transakci (včetně baseFeePerGas a maxPriorityFeePerGas)

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

Každá transakce změní stav virtuálního stroje Etherea ([EVM](/developers/docs/evm/)) ([zdroj](/developers/docs/transactions/)). Transakce jsou vysílány do sítě, aby byly ověřeny a zahrnuty do bloku. Každá transakce je spojena s číslem bloku. Abychom viděli data, mohli bychom se dotázat na konkrétní číslo bloku: 12396854 (nejnovější blok mezi transakcemi Nadace Ethereum v době psaní tohoto článku, 11. 5. 2021).

Navíc, když se dotážeme na další dva bloky, vidíme, že každý blok obsahuje hash předchozího bloku (tj. parent hash), což ilustruje, jak se blockchain tvoří.

Každý blok obsahuje odkaz na svůj nadřazený blok. To je znázorněno níže mezi sloupci `hash` a `parent_hash` ([zdroj](/developers/docs/blocks/)):

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

Blok můžeme prozkoumat dotazováním na čas, číslo bloku, obtížnost, hash, parent hash a nonce.

Jediná věc, kterou tento dotaz nepokrývá, je _seznam transakcí_, který vyžaduje samostatný dotaz níže, a _state root_ (kořen stavu). Plný nebo archivní uzel bude ukládat všechny transakce a přechody stavu, což klientům umožňuje kdykoli dotazovat stav řetězce. Protože to vyžaduje velký úložný prostor, můžeme oddělit data řetězce od dat stavu:

- Data řetězce (seznam bloků, transakce)
- Data stavu (výsledek přechodu stavu každé transakce)

State root spadá do druhé kategorie a jedná se o _implicitní_ data (nejsou uložena onchain), zatímco data řetězce jsou explicitní a uložena přímo na samotném řetězci ([zdroj](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

V tomto tutoriálu se zaměříme na onchain data, která _lze_ dotazovat pomocí SQL přes Dune Analytics.

Jak bylo uvedeno výše, každý blok obsahuje seznam transakcí, který můžeme dotazovat filtrováním konkrétního bloku. Zkusíme nejnovější blok, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Zde je výstup SQL na Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Přidání tohoto jediného bloku do řetězce mění stav virtuálního stroje Etherea ([EVM](/developers/docs/evm/)). Najednou jsou ověřovány desítky, někdy i stovky transakcí. V tomto konkrétním případě bylo zahrnuto 222 transakcí.

Abychom viděli, kolik jich bylo skutečně úspěšných, přidali bychom další filtr pro počítání úspěšných transakcí:

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

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Požadavky na transakce se vyskytují desítkykrát za sekundu, ale bloky jsou potvrzovány přibližně jednou za 15 sekund ([zdroj](/developers/docs/blocks/)).

Abychom viděli, že se přibližně každých 15 sekund vyprodukuje jeden blok, mohli bychom vzít počet sekund za den (86400) a vydělit ho 15, abychom získali odhadovaný průměrný počet bloků za den (~ 5760).

Graf pro vyprodukované bloky Etherea za den (2016 - současnost) je:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Průměrný počet denně vyprodukovaných bloků za toto časové období je ~5 874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Dotazy jsou:

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

Průměrný počet vyprodukovaných bloků za den od roku 2016 je mírně nad tímto číslem, a to 5 874. Alternativně, vydělením 86400 sekund průměrným počtem 5874 bloků vyjde 14,7 sekundy, tedy přibližně jeden blok každých 15 sekund.

### Gas {#gas}

Bloky mají omezenou velikost. Maximální velikost bloku je dynamická a mění se podle poptávky v síti mezi 12 500 000 a 25 000 000 jednotkami. Limity jsou nutné, aby se zabránilo libovolně velkým velikostem bloků, které by zatěžovaly plné uzly z hlediska požadavků na místo na disku a rychlost ([zdroj](/developers/docs/blocks/)).

Jeden ze způsobů, jak si představit limit plynu bloku (block gas limit), je uvažovat o něm jako o **nabídce** dostupného prostoru v bloku, do kterého lze dávkovat transakce. Limit plynu bloku lze dotazovat a vizualizovat od roku 2016 do současnosti:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Pak je tu skutečný gas denně spotřebovaný k zaplacení výpočtů provedených na řetězci Etherea (tj. odeslání transakce, volání chytrého kontraktu, ražení NFT). To představuje **poptávku** po dostupném prostoru v blocích Etherea:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Můžeme také tyto dva grafy postavit vedle sebe, abychom viděli, jak se **poptávka a nabídka** shodují:

![gas_demand_supply](./gas_demand_supply.png)

Ceny gasu tedy můžeme chápat jako funkci poptávky po prostoru v blocích Etherea při dané dostupné nabídce.

Nakonec bychom mohli chtít dotazovat průměrné denní ceny gasu pro řetězec Etherea, nicméně to by vedlo k obzvláště dlouhé době dotazu, takže náš dotaz vyfiltrujeme na průměrné množství gasu zaplaceného za transakci Nadací Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Můžeme vidět ceny gasu zaplacené za všechny transakce provedené na adresu Nadace Ethereum v průběhu let. Zde je dotaz:

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

Díky tomuto tutoriálu chápeme základní koncepty Etherea a to, jak funguje blockchain Etherea, a to prostřednictvím dotazování a seznámení se s onchain daty.

Nástěnku (dashboard), která obsahuje veškerý kód použitý v tomto tutoriálu, najdete [zde](https://dune.com/paulapivat/Learn-Ethereum).

Pro další využití dat k prozkoumání Web3 [mě najdete na Twitteru](https://twitter.com/paulapivat).