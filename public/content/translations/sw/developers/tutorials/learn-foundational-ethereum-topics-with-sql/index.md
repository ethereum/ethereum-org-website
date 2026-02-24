---
title: Jifunze Mada za Msingi za Ethereum kwa kutumia SQL
description: Mafunzo haya yanawasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwemo miamala, bloku na gesi kwa kuuliza data iliyo kwenye mtandao kwa kutumia Lugha ya Kuuliza Data Iliyopangwa (SQL).
author: "Paul Apivat"
tags: ["SQL", "Querying", "Transactions"]
skill: beginner
lang: sw
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Mafunzo mengi ya Ethereum huwalenga wasanidi programu, lakini kuna ukosefu wa rasilimali za kielimu kwa wachambuzi wa data au kwa watu wanaotaka kuona data iliyo kwenye mtandao bila kuendesha mteja au nodi.

Mafunzo haya yanawasaidia wasomaji kuelewa dhana za msingi za Ethereum ikiwemo miamala, bloku na gesi kwa kuuliza data iliyo kwenye mtandao kwa kutumia lugha ya kuuliza data iliyopangwa (SQL) kupitia kiolesura kilichotolewa na [Dune Analytics](https://dune.com/).

Data iliyo kwenye mtandao inaweza kutusaidia kuelewa Ethereum, mtandao, na kama uchumi wa nguvu za kompyuta na inapaswa kutumika kama msingi wa kuelewa changamoto zinazoikabili Ethereum leo (yaani, kupanda kwa bei za gesi) na, muhimu zaidi, majadiliano kuhusu suluhu za kuongeza uwezo.

### Miamala {#transactions}

Safari ya mtumiaji kwenye Ethereum huanza na kuanzisha akaunti inayodhibitiwa na mtumiaji au huluki yenye salio la ETH. Kuna aina mbili za akaunti - inayodhibitiwa na mtumiaji au mkataba-erevu (tazama [ethereum.org](/developers/docs/accounts/)).

Akaunti yoyote inaweza kutazamwa kwenye wachunguzi wa bloku kama [Etherscan](https://etherscan.io/) au [Blockscout](https://eth.blockscout.com/). Wachunguzi wa bloku ni lango la data ya Ethereum. Wanaonyesha, kwa wakati halisi, data kuhusu bloku, miamala, wachimbaji, akaunti na shughuli nyingine za kwenye mtandao (tazama [hapa](/developers/docs/data-and-analytics/block-explorers/)).

Hata hivyo, mtumiaji anaweza kutaka kuuliza data moja kwa moja ili kupatanisha taarifa zinazotolewa na wachunguzi wa bloku wa nje. [Dune Analytics](https://dune.com/) hutoa uwezo huu kwa yeyote aliye na ujuzi fulani wa SQL.

Kwa marejeleo, akaunti ya mkataba-erevu ya Msingi wa Ethereum (EF) inaweza kutazamwa kwenye [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Jambo moja la kuzingatia ni kwamba akaunti zote, ikiwemo ya EF, zina anwani ya umma inayoweza kutumika kutuma na kupokea miamala.

Salio la akaunti kwenye Etherscan linajumuisha miamala ya kawaida na miamala ya ndani. Miamala ya ndani, licha ya jina lake, sio miamala _halisi_ inayobadilisha hali ya mnyororo. Ni uhamisho wa thamani ulioanzishwa kwa kutekeleza mkataba ([chanzo](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Kwa kuwa miamala ya ndani haina saini, **haijumuishwi** kwenye mnyororo wa bloku na haiwezi kuulizwa na Dune Analytics.

Kwa hivyo, mafunzo haya yatazingatia miamala ya kawaida. Hii inaweza kuulizwa kama ifuatavyo:

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

Hii itatoa taarifa sawa na inayotolewa kwenye ukurasa wa miamala wa Etherscan. Kwa kulinganisha, hizi ndizo vyanzo viwili:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Ukurasa wa mkataba wa EF kwenye Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Unaweza kupata dashibodi [hapa](https://dune.com/paulapivat/Learn-Ethereum). Bofya kwenye jedwali ili kuona ulizo (pia tazama hapo juu).

### Kuchanganua Miamala {#breaking_down_transactions}

Muamala uliowasilishwa unajumuisha taarifa kadhaa ikiwemo ([chanzo](/developers/docs/transactions/)):

- **Mpokeaji**: Anwani ya kupokea (iliyoulizwa kama "to")
- **Saini**: Wakati ufunguo binafsi wa mtumaji hutia saini kwenye muamala, tunachoweza kuuliza kwa kutumia SQL ni anwani ya umma ya mtumaji ("from").
- **Thamani**: Hii ni kiasi cha ETH kilichohamishwa (tazama safu wima ya `ether`).
- **Data**: Hii ni data yoyote ambayo imefanyiwa hashi (tazama safu wima ya `data`)
- **gasLimit** – kiasi cha juu cha vitengo vya gesi kinachoweza kutumiwa na muamala. Vitengo vya gesi vinawakilisha hatua za kikokotozi
- **maxPriorityFeePerGas** - kiasi cha juu cha gesi kitakachojumuishwa kama zawadi kwa mchimbaji
- **maxFeePerGas** - kiasi cha juu cha gesi ambacho mtu yuko tayari kulipa kwa muamala (ikijumuisha baseFeePerGas na maxPriorityFeePerGas)

Tunaweza kuuliza taarifa hizi maalum kwa miamala kwenda kwa anwani ya umma ya Msingi wa Ethereum:

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

### Bloku {#blocks}

Kila muamala utabadilisha hali ya mashine halisi ya Ethereum ([EVM](/developers/docs/evm/)) ([chanzo](/developers/docs/transactions/)). Miamala hutangazwa kwenye mtandao ili ithibitishwe na ijumuishwe kwenye bloku. Kila muamala unahusishwa na nambari ya bloku. Ili kuona data, tunaweza kuuliza nambari maalum ya bloku: 12396854 (bloku ya hivi karibuni zaidi kati ya miamala ya Msingi wa Ethereum kufikia wakati wa uandishi huu, 11/5/21).

Zaidi ya hayo, tunapouliza bloku mbili zinazofuata, tunaweza kuona kwamba kila bloku ina hashi ya bloku iliyotangulia (yaani, hashi ya mzazi), kuonyesha jinsi mnyororo wa bloku unavyoundwa.

Kila bloku ina rejeleo kwa bloku yake ya mzazi. Hii inaonyeshwa hapa chini kati ya safu wima za `hash` na `parent_hash` ([chanzo](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Hili ndilo [ulizo](https://dune.com/queries/44856/88292) kwenye Dune Analytics:

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

Tunaweza kuchunguza bloku kwa kuuliza muda, nambari ya bloku, ugumu, hashi, hashi ya mzazi, na nonce.

Kitu pekee ambacho ulizo hili halishughulikii ni _orodha ya miamala_ ambayo inahitaji ulizo tofauti hapa chini na _mzizi wa hali_. Nodi kamili au ya kumbukumbu itahifadhi miamala yote na mabadiliko ya hali, kuwaruhusu wateja kuuliza hali ya mnyororo wakati wowote. Kwa sababu hii inahitaji nafasi kubwa ya kuhifadhi, tunaweza kutenganisha data ya mnyororo na data ya hali:

- Data ya mnyororo (orodha ya bloku, miamala)
- Data ya hali (matokeo ya mabadiliko ya hali ya kila muamala)

Mzizi wa hali huangukia kwenye kundi la pili na ni data _iliyodokezwa_ (haihifadhiwi kwenye mnyororo), wakati data ya mnyororo iko wazi na huhifadhiwa kwenye mnyororo wenyewe ([chanzo](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Kwa mafunzo haya, tutazingatia data ya kwenye mnyororo ambayo _inaweza_ kuulizwa kwa SQL kupitia Dune Analytics.

Kama ilivyoelezwa hapo juu, kila bloku ina orodha ya miamala, tunaweza kuuliza hili kwa kuchuja bloku maalum. Tutajaribu bloku ya hivi karibuni zaidi, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Huu ndio matokeo ya SQL kwenye Dune:

![](./list_of_txn.png)

Bloku hii moja kuongezwa kwenye mnyororo hubadilisha hali ya mashine halisi ya Ethereum ([EVM](/developers/docs/evm/)). Wakati mwingine makumi, mamia ya miamala huhakikiwa kwa wakati mmoja. Katika kisa hiki maalum, miamala 222 ilijumuishwa.

Ili kuona ni ngapi zilifanikiwa, tungeongeza kichujio kingine kuhesabu miamala iliyofanikiwa:

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

Kwa bloku 12396854, kati ya miamala 222 jumla, 204 zilihakikiwa kwa mafanikio:

![](./successful_txn.png)

Maombi ya miamala hutokea makumi ya mara kwa sekunde, lakini bloku huhifadhiwa takriban mara moja kila sekunde 15 ([chanzo](/developers/docs/blocks/)).

Ili kuona kwamba kuna bloku moja inayozalishwa takriban kila sekunde 15, tunaweza kuchukua idadi ya sekunde katika siku (86400) kugawanywa kwa 15 ili kupata wastani wa makadirio ya idadi ya bloku kwa siku (~ 5760).

Chati ya bloku za Ethereum zinazozalishwa kwa siku (2016 - sasa) ni:

![](./daily_blocks.png)

Wastani wa idadi ya bloku zinazozalishwa kila siku katika kipindi hiki ni ~5,874:

![](./avg_daily_blocks.png)

Maulizo ni:

```sql
# ulizo la kuonyesha idadi ya bloku zinazozalishwa kila siku tangu 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# wastani wa idadi ya bloku zinazozalishwa kwa siku

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

Wastani wa idadi ya bloku zinazozalishwa kwa siku tangu 2016 iko juu kidogo ya nambari hiyo kwa 5,874. Vinginevyo, kugawanya sekunde 86400 kwa wastani wa bloku 5874 hutoa sekunde 14.7 au takriban bloku moja kila sekunde 15.

### Gesi {#gas}

Bloku zina ukomo wa ukubwa. Ukubwa wa juu wa bloku hubadilika na hutofautiana kulingana na mahitaji ya mtandao kati ya vitengo 12,500,000 na 25,000,000. Vikomo vinahitajika kuzuia ukubwa wa bloku kuwa mkubwa kiholela na kuweka mzigo kwenye nodi kamili kwa upande wa nafasi ya diski na mahitaji ya kasi ([chanzo](/developers/docs/blocks/)).

Njia moja ya kufikiria kikomo cha gesi cha bloku ni kuifikiria kama **ugavi** wa nafasi ya bloku inayopatikana ambapo miamala inaweza kuwekwa kwa makundi. Kikomo cha gesi cha bloku kinaweza kuulizwa na kuonyeshwa kutoka 2016 hadi leo:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Halafu kuna gesi halisi inayotumika kila siku kulipia ukokotoaji unaofanywa kwenye mnyororo wa Ethereum (yaani, kutuma muamala, kuita mkataba-erevu, kutoa NFT). Haya ndiyo **mahitaji** ya nafasi ya bloku ya Ethereum inayopatikana:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Tunaweza pia kuweka chati hizi mbili pamoja ili kuona jinsi **mahitaji na ugavi** vinavyolingana:

![gas_demand_supply](./gas_demand_supply.png)

Kwa hivyo tunaweza kuelewa bei za gesi kama kazi ya mahitaji ya nafasi ya bloku ya Ethereum, kulingana na ugavi unaopatikana.

Mwishowe, tunaweza kutaka kuuliza wastani wa bei za gesi za kila siku kwa mnyororo wa Ethereum, hata hivyo, kufanya hivyo kutasababisha muda mrefu sana wa kuuliza, kwa hivyo tutachuja ulizo letu kwa kiasi cha wastani cha gesi kilicholipwa kwa kila muamala na Msingi wa Ethereum.

![](./ef_daily_gas.png)

Tunaweza kuona bei za gesi zilizolipwa kwa miamala yote iliyofanywa kwa anwani ya Msingi wa Ethereum kwa miaka mingi. Hili ndilo ulizo:

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

Kwa mafunzo haya, tunaelewa dhana za msingi za Ethereum na jinsi mnyororo wa bloku wa Ethereum unavyofanya kazi kwa kuuliza na kupata hisia ya data ya kwenye mnyororo.

Dashibodi inayoshikilia msimbo wote uliotumika katika mafunzo haya inaweza kupatikana [hapa](https://dune.com/paulapivat/Learn-Ethereum).

Kwa matumizi zaidi ya data kuchunguza web3 [nipate kwenye Twitter](https://twitter.com/paulapivat).
