---
title: Jifunze Mada za Msingi za Ethereum kwa SQL
description: Mafunzo haya yanasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwa ni pamoja na miamala, vitalu na gesi kwa kuuliza data za mnyororoni kwa Lugha ya Maswali Iliyoundwa (SQL).
author: "Paul Apivat"
tags:
  - SQL
  - Kuhoji
  - Miamala
  - data-na-uchanganuzi
skill: beginner
breadcrumb: Ethereum kwa SQL
lang: sw
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Mafunzo mengi ya Ethereum yanalenga waundaji, lakini kuna ukosefu wa rasilimali za elimu kwa wachambuzi wa data au kwa watu wanaotaka kuona data za mnyororoni bila kuendesha kiteja au nodi.

Mafunzo haya yanasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwa ni pamoja na miamala, vitalu na gesi kwa kuhoji data za mnyororoni kwa lugha ya maswali iliyoundwa (SQL) kupitia kiolesura kinachotolewa na [Dune](https://dune.com/). Hoja hizo zinatumia [DuneSQL](https://docs.dune.com/query-engine/overview), lahaja ya SQL ya Dune.

Data za mnyororoni zinaweza kutusaidia kuelewa Ethereum, mtandao, na kama uchumi wa nguvu za kompyuta na zinapaswa kutumika kama msingi wa kuelewa changamoto zinazoikabili Ethereum leo (k.m., kupanda kwa bei za gesi) na, muhimu zaidi, majadiliano kuhusu suluhisho za kuongeza uwezo.

### Miamala {#transactions}

Safari ya mtumiaji kwenye Ethereum inaanza kwa kuanzisha akaunti inayodhibitiwa na mtumiaji au chombo chenye salio la ETH. Kuna aina mbili za akaunti - inayodhibitiwa na mtumiaji au mkataba mahiri (tazama [ethereum.org](/developers/docs/accounts/)).

Akaunti yoyote inaweza kutazamwa kwenye kichunguza bloku kama [Etherscan](https://etherscan.io/) au [Blockscout](https://eth.blockscout.com/). Vichunguzi vya bloku ni lango la data za Ethereum. Zinaonyesha, kwa wakati halisi, data kuhusu vitalu, miamala, wathibitishaji, akaunti na shughuli nyingine za mnyororoni (tazama [hapa](/developers/docs/data-and-analytics/block-explorers/)).

Hata hivyo, mtumiaji anaweza kutaka kuhoji data moja kwa moja ili kupatanisha taarifa zinazotolewa na vichunguzi vya bloku vya nje. [Dune](https://dune.com/) inatoa uwezo huu kwa mtu yeyote aliye na ujuzi kiasi wa SQL.

Kwa marejeleo, akaunti ya mkataba mahiri ya Taasisi ya Ethereum (EF) inaweza kutazamwa kwenye [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Jambo moja la kuzingatia ni kwamba akaunti zote, ikiwa ni pamoja na ya EF, zina anwani ya umma inayoweza kutumika kutuma na kupokea miamala.

Salio la akaunti kwenye Etherscan linajumuisha miamala ya kawaida na miamala ya ndani. Miamala ya ndani, licha ya jina lake, si miamala _halisi_ inayobadilisha hali ya mnyororo. Ni uhamishaji wa thamani ulioanzishwa kwa kutekeleza mkataba ([chanzo](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Kwa kuwa miamala ya ndani haina sahihi, **haijumuishwi** kwenye mnyororo wa vitalu kama miamala. Dune inazirekodi kando, katika jedwali la `ethereum.traces`.

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

Kumbuka kwamba anwani zinaandikwa kama thamani halisi za `0x...` bila alama za nukuu. Katika DuneSQL, anwani na heshi ni thamani za mfumo wa jozi (binary), si nyuzi (strings).

Hii itatoa taarifa sawa na zinazotolewa kwenye ukurasa wa miamala wa Etherscan. Kwa ulinganisho, hapa kuna vyanzo viwili:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Ukurasa wa mkataba wa EF kwenye Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Unaweza kupata dashibodi [hapa](https://dune.com/paulapivat/Learn-Ethereum). Bofya kwenye jedwali ili kuona hoja (pia tazama hapo juu).

### Kuchanganua Miamala {#breaking-down-transactions}

Muamala uliowasilishwa unajumuisha vipande kadhaa vya taarifa ikiwa ni pamoja na ([chanzo](/developers/docs/transactions/)):

- **Mpokeaji**: Anwani inayopokea (inayohojiwa kama "to")
- **Sahihi**: Ingawa funguo za siri za mtumaji hutia sahihi muamala, kile tunachoweza kuhoji kwa SQL ni anwani ya umma ya mtumaji ("from").
- **Thamani**: Hiki ni kiasi cha ETH kilichohamishwa (tazama safu wima ya `ether`).
- **Data**: Hizi ni data za kiholela ambazo zimefanyiwa heshi (tazama safu wima ya `data`)
- **gasLimit** – kikomo cha gesi ambacho kinaweza kutumiwa na muamala. Vipimo vya gesi vinawakilisha hatua za kimahesabu
- **maxPriorityFeePerGas** - kiasi cha juu cha gesi cha kujumuishwa kama ada ya kipaumbele kwa mthibitishaji
- **maxFeePerGas** - kiasi cha juu cha gesi kilicho tayari kulipwa kwa ajili ya muamala (ikijumuisha baseFeePerGas na maxPriorityFeePerGas)

Tunaweza kuhoji vipande hivi maalum vya taarifa kwa miamala inayoenda kwenye anwani ya umma ya Taasisi ya Ethereum:

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

`CAST` ni muhimu kwa sababu kugawanya nambari kamili moja kwa nyingine katika DuneSQL kunatoa jibu la nambari kamili, ambalo lingezungusha karibu kila asilimia kwenda chini hadi sifuri.

### Vitalu {#blocks}

Kila muamala utabadilisha hali ya Mashine Pepe ya Ethereum ([EVM](/developers/docs/evm/)) ([chanzo](/developers/docs/transactions/)). Miamala inatangazwa kwenye mtandao ili kuthibitishwa na kujumuishwa katika kitalu. Kila muamala unahusishwa na nambari ya kitalu. Ili kuona data, tunaweza kuhoji nambari maalum ya kitalu: 12396854 (kitalu cha hivi karibuni zaidi miongoni mwa miamala ya Taasisi ya Ethereum wakati wa kuandika, mnamo Mei 2021).

Zaidi ya hayo, tunapohoji vitalu viwili vinavyofuata, tunaweza kuona kwamba kila kitalu kina heshi ya kitalu kilichotangulia (yaani, heshi mzazi), ikionyesha jinsi mnyororo wa vitalu unavyoundwa.

Kila kitalu kina rejeleo la kitalu chake mzazi. Hili linaonyeshwa hapa chini kati ya safu wima za `hash` na `parent_hash` ([chanzo](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Hapa kuna hoja:

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

Tunaweza kuchunguza kitalu kwa kuhoji muda, nambari ya kitalu, heshi, heshi mzazi, na nonsi. Kitalu 12396854 kilizalishwa kabla ya [Unganisho](/roadmap/merge/), wakati vitalu vilipochimbwa kwa Uthibitisho wa Kazi (PoW) na nonsi ilikuwa na maana. Katika vitalu vya Uthibitisho wa Dau (PoS) nonsi huwa sifuri kila wakati.

Kitu pekee ambacho hoja hii haijumuishi ni _orodha ya miamala_ ambayo inahitaji hoja tofauti hapa chini na _mzizi wa hali_. Nodi kamili au ya kumbukumbu itahifadhi miamala yote na mabadiliko ya hali, ikiruhusu wateja kuhoji hali ya mnyororo wakati wowote. Kwa sababu hii inahitaji nafasi kubwa ya kuhifadhi, tunaweza kutenganisha data za mnyororo na data za hali:

- Data za mnyororo (orodha ya vitalu, miamala)
- Data za hali (matokeo ya mabadiliko ya hali ya kila muamala)

Mzizi wa hali unaangukia katika kundi la pili na ni data _isiyo dhahiri_ (haijahifadhiwa mnyororoni), wakati data za mnyororo ni dhahiri na zimehifadhiwa kwenye mnyororo wenyewe ([chanzo](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Kwa mafunzo haya, tutaangazia data za mnyororoni ambazo _zinaweza_ kuhojiwa kwa SQL kupitia Dune.

Kama ilivyoelezwa hapo juu, kila kitalu kina orodha ya miamala, tunaweza kuhoji hili kwa kuchuja kitalu maalum. Tutajaribu kitalu 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Hapa kuna matokeo ya SQL kwenye Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Kitalu hiki kimoja kinachoongezwa kwenye mnyororo kinabadilisha hali ya Mashine Pepe ya Ethereum ([EVM](/developers/docs/evm/)). Makumi wakati mwingine, mamia ya miamala inathibitishwa kwa wakati mmoja. Katika kisa hiki maalum, miamala 222 ilijumuishwa.

Ili kuona ni mingapi iliyofanikiwa kweli, tungeongeza kichujio kingine ili kuhesabu miamala iliyofanikiwa:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Kwa kitalu 12396854, kati ya jumla ya miamala 222, 204 ilithibitishwa kwa mafanikio:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Maombi ya miamala hutokea makumi ya mara kwa sekunde, lakini vitalu huongezwa mara kwa mara tu ([chanzo](/developers/docs/blocks/)). Chini ya Uthibitisho wa Kazi (PoW), kitalu kilichimbwa kwa wastani kila sekunde 13 hadi 15, kukiwa na tofauti nyingi. Tangu [Unganisho](/roadmap/merge/) mnamo Septemba 2022, Uthibitisho wa Dau (PoS) unagawa muda katika sloti za sekunde 12, na kila sloti inaweza kuwa na kitalu kimoja pekee.

Kwa hivyo leo kunaweza kuwa na vitalu visivyozidi 86400 / 12 = 7200 kwa siku. Katika uhalisia kuna vichache kidogo, kwa sababu mthibitishaji hukosa sloti yake mara kwa mara.

Chati ya vitalu vya Ethereum vinavyozalishwa kwa siku (2016 - 2021) ni:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Wastani wa idadi ya vitalu vinavyozalishwa kila siku katika kipindi hiki ni ~5,874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Hoja ni:

Hapa kuna hoja ya kuona idadi ya vitalu vinavyozalishwa kila siku. Kifungu cha `WHERE` kinatenga siku ya sasa, ambayo bado haijaisha.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Na hoja hii inakokotoa wastani wa idadi ya vitalu vinavyozalishwa kwa siku, kabla na baada ya Unganisho. Kitalu 15537394 ni kitalu cha kwanza cha Uthibitisho wa Dau (PoS).

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

Wakati mafunzo haya yalipoandikwa kwa mara ya kwanza mnamo Mei 2021, wastani ulikuwa vitalu 5,874 kwa siku, au kitalu kimoja kila sekunde 14.7. Baada ya Unganisho, wastani uko chini kidogo ya kiwango cha juu cha 7200, takriban kitalu kimoja kila sekunde 12.

### Gesi {#gas}

Vitalu vina kikomo cha ukubwa. Kila kitalu kina kikomo cha gesi, na tangu [EIP-1559](/developers/docs/gas/#base-fee) kila kitalu pia kina lengo la gesi, ambalo ni nusu ya kikomo. Wakati vitalu vinatumia gesi zaidi ya lengo, ada ya msingi inapanda, na vinapotumia kidogo, inashuka. Kikomo cha gesi chenyewe hurekebishwa na wathibitishaji, na kimepandishwa mara kadhaa kwa miaka mingi. Vikomo vinahitajika ili kuzuia ukubwa wa vitalu kuwa mkubwa kiholela na kuweka shinikizo kwenye nodi kamili kwa upande wa nafasi ya diski na mahitaji ya kasi ([chanzo](/developers/docs/blocks/)).

Njia moja ya kufikiria kikomo cha gesi cha kitalu ni kukichukulia kama **usambazaji** wa nafasi ya kitalu inayopatikana ya kuweka miamala kwa makundi. Kikomo cha gesi cha kitalu kinaweza kuhojiwa na kuonekana kuanzia 2016 hadi leo:

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

Kisha kuna gesi halisi inayotumika kila siku kulipia ukokotoaji unaofanywa kwenye mnyororo wa Ethereum (k.m., kutuma muamala, kuita mkataba mahiri, ufuzi wa tokani isiyobadilishika (NFT)). Hili ni **hitaji** la nafasi ya kitalu cha Ethereum inayopatikana:

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

Tunaweza pia kuweka chati hizi mbili pamoja ili kuona jinsi **hitaji na usambazaji** vinavyolingana:

![gas_demand_supply](./gas_demand_supply.png)

Kwa hivyo tunaweza kuelewa bei za gesi kama matokeo ya hitaji la nafasi ya kitalu cha Ethereum, kulingana na usambazaji unaopatikana.

Hatimaye, tunaweza kutaka kuhoji wastani wa bei za gesi za kila siku kwa mnyororo wa Ethereum, hata hivyo, kufanya hivyo kutasababisha muda mrefu sana wa kuhoji, kwa hivyo tutachuja hoja yetu kwa wastani wa kiasi cha gesi kinacholipwa kwa kila muamala na Taasisi ya Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Tunaweza kuona bei za gesi zilizolipwa kwa miamala yote iliyofanywa kwenye anwani ya Taasisi ya Ethereum kwa miaka mingi. Hapa kuna hoja:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Muhtasari {#summary}

Kwa mafunzo haya, tunaelewa dhana za msingi za Ethereum na jinsi mnyororo wa vitalu wa Ethereum unavyofanya kazi kwa kuhoji na kupata hisia ya data za mnyororoni.

Dashibodi inayoshikilia msimbo wote uliotumika katika mafunzo haya inaweza kupatikana [hapa](https://dune.com/paulapivat/Learn-Ethereum).

Kwa matumizi zaidi ya data kuchunguza Web3 [nitafute kwenye Twitter](https://twitter.com/paulapivat).
