---
title: Jifunze Mada za Msingi za Ethereum kwa SQL
description: Mafunzo haya yanasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwa ni pamoja na miamala, vitalu na gesi kwa kuhoji data za mnyororoni kwa kutumia Lugha ya Maswali Iliyoundwa (SQL).
author: "Paul Apivat"
tags: ["SQL", "Kuhoji", "Miamala", "data-na-uchanganuzi"]
skill: beginner
breadcrumb: Ethereum kwa SQL
lang: sw
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Mafunzo mengi ya Ethereum yanalenga wasanidi programu, lakini kuna ukosefu wa rasilimali za elimu kwa wachanganuzi wa data au kwa watu wanaotaka kuona data za mnyororoni bila kuendesha mteja au nodi.

Mafunzo haya yanasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwa ni pamoja na miamala, vitalu na gesi kwa kuhoji data za mnyororoni kwa kutumia lugha ya maswali iliyoundwa (SQL) kupitia kiolesura kinachotolewa na [Dune Analytics](https://dune.com/).

Data za mnyororoni zinaweza kutusaidia kuelewa Ethereum, mtandao, na kama uchumi wa nguvu za kompyuta na zinapaswa kutumika kama msingi wa kuelewa changamoto zinazoikabili Ethereum leo (k.m., kupanda kwa bei za gesi) na, muhimu zaidi, majadiliano kuhusu suluhisho za kuongeza viwango.

### Miamala {#transactions}

Safari ya mtumiaji kwenye Ethereum inaanza kwa kuanzisha akaunti inayodhibitiwa na mtumiaji au huluki yenye salio la ETH. Kuna aina mbili za akaunti - inayodhibitiwa na mtumiaji au mkataba mahiri (tazama [ethereum.org](/developers/docs/accounts/)).

Akaunti yoyote inaweza kutazamwa kwenye kichunguza bloku kama [Etherscan](https://etherscan.io/) au [Blockscout](https://eth.blockscout.com/). Vichunguzi vya bloku ni lango la data za Ethereum. Vinaonyesha, kwa wakati halisi, data kuhusu vitalu, miamala, wachimbaji, akaunti na shughuli nyingine za mnyororoni (tazama [hapa](/developers/docs/data-and-analytics/block-explorers/)).

Hata hivyo, mtumiaji anaweza kutaka kuhoji data moja kwa moja ili kupatanisha taarifa zinazotolewa na vichunguzi vya bloku vya nje. [Dune Analytics](https://dune.com/) inatoa uwezo huu kwa mtu yeyote aliye na ujuzi kiasi wa SQL.

Kwa marejeleo, akaunti ya mkataba mahiri ya Taasisi ya Ethereum (EF) inaweza kutazamwa kwenye [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Jambo moja la kuzingatia ni kwamba akaunti zote, ikiwa ni pamoja na za EF, zina anwani ya umma inayoweza kutumika kutuma na kupokea miamala.

Salio la akaunti kwenye Etherscan linajumuisha miamala ya kawaida na miamala ya ndani. Miamala ya ndani, licha ya jina lake, si miamala _halisi_ inayobadilisha hali ya mnyororo. Ni uhamishaji wa thamani ulioanzishwa kwa kutekeleza mkataba ([chanzo](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Kwa kuwa miamala ya ndani haina sahihi, **haijajumuishwa** kwenye mnyororo wa vitalu na haiwezi kuhojiwa kwa Dune Analytics.

Kwa hivyo, mafunzo haya yataangazia miamala ya kawaida. Hii inaweza kuhojiwa kama ifuatavyo:

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

Hii itatoa taarifa sawa na iliyotolewa kwenye ukurasa wa miamala wa Etherscan. Kwa ulinganisho, hapa kuna vyanzo viwili:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Ukurasa wa mkataba wa EF kwenye Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Unaweza kupata dashibodi [hapa](https://dune.com/paulapivat/Learn-Ethereum). Bofya kwenye jedwali ili kuona swali (pia tazama hapo juu).

### Kuchanganua Miamala {#breaking-down-transactions}

Muamala uliowasilishwa unajumuisha vipande kadhaa vya taarifa ikiwa ni pamoja na ([chanzo](/developers/docs/transactions/)):

- **Mpokeaji**: Anwani inayopokea (iliyohojiwa kama "to")
- **Sahihi**: Ingawa funguo za faragha za mtumaji hutia sahihi muamala, kile tunachoweza kuhoji kwa SQL ni anwani ya umma ya mtumaji ("from").
- **Thamani**: Hiki ni kiasi cha ETH kilichohamishwa (tazama safu wima ya `ether`).
- **Data**: Hizi ni data za kiholela ambazo zimefanyiwa heshi (tazama safu wima ya `data`)
- **gasLimit** – kiwango cha juu cha uniti za gesi zinazoweza kutumiwa na muamala. Uniti za gesi zinawakilisha hatua za kimahesabu
- **maxPriorityFeePerGas** - kiwango cha juu cha gesi kitakachojumuishwa kama ada ya kipaumbele kwa mchimbaji
- **maxFeePerGas** - kiwango cha juu cha gesi kilicho tayari kulipwa kwa ajili ya muamala (ikijumuisha baseFeePerGas na maxPriorityFeePerGas)

Tunaweza kuhoji vipande hivi maalum vya taarifa kwa miamala kwenda kwenye anwani ya umma ya Taasisi ya Ethereum:

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

### Vitalu {#blocks}

Kila muamala utabadilisha hali ya mashine pepe ya Ethereum ([EVM](/developers/docs/evm/)) ([chanzo](/developers/docs/transactions/)). Miamala inatangazwa kwenye mtandao ili kuthibitishwa na kujumuishwa kwenye kitalu. Kila muamala unahusishwa na nambari ya kitalu. Ili kuona data, tunaweza kuhoji nambari maalum ya kitalu: 12396854 (kitalu cha hivi karibuni zaidi kati ya miamala ya Taasisi ya Ethereum wakati wa kuandika haya, 11/5/21).

Zaidi ya hayo, tunapohoji vitalu viwili vinavyofuata, tunaweza kuona kwamba kila kitalu kina heshi ya kitalu kilichotangulia (yaani, heshi mzazi), ikionyesha jinsi mnyororo wa vitalu unavyoundwa.

Kila kitalu kina rejeleo la kitalu chake mzazi. Hili linaonyeshwa hapa chini kati ya safu wima za `hash` na `parent_hash` ([chanzo](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Hili hapa ni [swali](https://dune.com/queries/44856/88292) kwenye Dune Analytics:

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

Tunaweza kuchunguza kitalu kwa kuhoji muda, nambari ya kitalu, ugumu, heshi, heshi mzazi, na nonsi.

Kitu pekee ambacho swali hili halijumuishi ni _orodha ya miamala_ ambayo inahitaji swali tofauti hapa chini na _mzizi wa hali_. Nodi kamili au ya kumbukumbu itahifadhi miamala yote na mabadiliko ya hali, ikiruhusu wateja kuhoji hali ya mnyororo wakati wowote. Kwa sababu hii inahitaji nafasi kubwa ya kuhifadhi, tunaweza kutenganisha data za mnyororo na data za hali:

- Data za mnyororo (orodha ya vitalu, miamala)
- Data za hali (matokeo ya mabadiliko ya hali ya kila muamala)

Mzizi wa hali unaangukia katika kundi la pili na ni data _isiyo dhahiri_ (haijahifadhiwa mnyororoni), wakati data za mnyororo ni dhahiri na zimehifadhiwa kwenye mnyororo wenyewe ([chanzo](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Kwa mafunzo haya, tutaangazia data za mnyororoni ambazo _zinaweza_ kuhojiwa kwa SQL kupitia Dune Analytics.

Kama ilivyoelezwa hapo juu, kila kitalu kina orodha ya miamala, tunaweza kuhoji hili kwa kuchuja kitalu maalum. Tutajaribu kitalu cha hivi karibuni zaidi, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Haya hapa ni matokeo ya SQL kwenye Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Kitalu hiki kimoja kinachoongezwa kwenye mnyororo kinabadilisha hali ya mashine pepe ya Ethereum ([EVM](/developers/docs/evm/)). Makumi wakati mwingine, mamia ya miamala inathibitishwa kwa wakati mmoja. Katika kisa hiki maalum, miamala 222 ilijumuishwa.

Ili kuona ni mingapi iliyofanikiwa kweli, tungeongeza kichujio kingine ili kuhesabu miamala iliyofanikiwa:

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

Kwa kitalu 12396854, kati ya jumla ya miamala 222, 204 ilithibitishwa kwa ufanisi:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Maombi ya miamala hutokea makumi ya mara kwa sekunde, lakini vitalu huwekwa takriban mara moja kila sekunde 15 ([chanzo](/developers/docs/blocks/)).

Ili kuona kwamba kuna kitalu kimoja kinachozalishwa takriban kila sekunde 15, tunaweza kuchukua idadi ya sekunde katika siku (86400) na kugawanya kwa 15 ili kupata makadirio ya wastani wa idadi ya vitalu kwa siku (~ 5760).

Chati ya vitalu vya Ethereum vinavyozalishwa kwa siku (2016 - sasa) ni:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Wastani wa idadi ya vitalu vinavyozalishwa kila siku katika kipindi hiki ni ~5,874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Maswali ni:

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

Wastani wa idadi ya vitalu vinavyozalishwa kwa siku tangu 2016 iko juu kidogo ya nambari hiyo kwa 5,874. Vinginevyo, kugawanya sekunde 86400 kwa wastani wa vitalu 5874 kunaleta sekunde 14.7 au takriban kitalu kimoja kila sekunde 15.

### Gesi {#gas}

Vitalu vina kikomo cha ukubwa. Ukubwa wa juu wa kitalu unabadilika na hutofautiana kulingana na mahitaji ya mtandao kati ya uniti 12,500,000 na 25,000,000. Vikomo vinahitajika ili kuzuia ukubwa wa vitalu vikubwa kiholela kuweka mzigo kwenye nodi kamili kwa upande wa nafasi ya diski na mahitaji ya kasi ([chanzo](/developers/docs/blocks/)).

Njia moja ya kufikiria kikomo cha gesi cha kitalu ni kukichukulia kama **usambazaji** wa nafasi ya kitalu inayopatikana ambamo miamala inaweza kuwekwa pamoja. Kikomo cha gesi cha kitalu kinaweza kuhojiwa na kuonyeshwa kuanzia 2016 hadi leo:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Kisha kuna gesi halisi inayotumika kila siku kulipia ukokotoaji unaofanywa kwenye mnyororo wa Ethereum (k.m., kutuma muamala, kuita mkataba mahiri, ufuzi wa NFT). Haya ni **mahitaji** ya nafasi ya kitalu cha Ethereum inayopatikana:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Tunaweza pia kuweka chati hizi mbili pamoja ili kuona jinsi **mahitaji na usambazaji** vinavyolingana:

![gas_demand_supply](./gas_demand_supply.png)

Kwa hivyo tunaweza kuelewa bei za gesi kama matokeo ya mahitaji ya nafasi ya kitalu cha Ethereum, kulingana na usambazaji unaopatikana.

Hatimaye, tunaweza kutaka kuhoji wastani wa bei za gesi za kila siku kwa mnyororo wa Ethereum, hata hivyo, kufanya hivyo kutasababisha muda mrefu sana wa kuhoji, kwa hivyo tutachuja swali letu kwa wastani wa kiasi cha gesi kinacholipwa kwa kila muamala na Taasisi ya Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Tunaweza kuona bei za gesi zilizolipwa kwa miamala yote iliyofanywa kwenye anwani ya Taasisi ya Ethereum kwa miaka mingi. Hili hapa ni swali:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Muhtasari {#summary}

Kwa mafunzo haya, tunaelewa dhana za msingi za Ethereum na jinsi mnyororo wa vitalu wa Ethereum unavyofanya kazi kwa kuhoji na kupata hisia ya data za mnyororoni.

Dashibodi inayoshikilia msimbo wote uliotumika katika mafunzo haya inaweza kupatikana [hapa](https://dune.com/paulapivat/Learn-Ethereum).

Kwa matumizi zaidi ya data kuchunguza Web3 [nitafute kwenye Twitter](https://twitter.com/paulapivat).