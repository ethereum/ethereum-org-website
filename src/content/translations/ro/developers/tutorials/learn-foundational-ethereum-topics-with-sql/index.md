---
title: Învățați despre subiectele fundamentale din Ethereum cu SQL
description: Acest tutorial îi ajută pe cititori să înțeleagă conceptele fundamentale ale lui Ethereum, cum ar fi tranzacțiile, blocurile și gazul, prin interogarea datelor on-chain cu „Limbajul de interogare structurat” (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Interogarea"
  - "Date analitice"
  - "Noțiuni de bază"
  - "Dune Analytics"
  - "Blocuri"
  - "Tranzacții"
  - "Gaz"
skill: beginner
lang: ro
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Multe tutoriale Ethereum vizează dezvoltatorii, dar se simte lipsa de resurse educaționale pentru analiștii de date sau cei care doresc să vadă datele on-chain fără să ruleze un client sau un nod.

Acest tutorial îi ajută pe cititori să înțeleagă conceptele fundamentale ale lui Ethereum, ce cuprind tranzacțiile, blocurile și gazul, cu ajutorul interogărilor datelor on-chain, folosind „limbajul de interogare structurat” (SQL), printr-o interfață furnizată de [Dune Analytics](https://dune.xyz/home).

Datele on-chain ne pot face să înțelegem Ethereum, rețeaua, economisirea puterii de calcul și acestea ar trebui să servească drept bază pentru înțelegerea problemelor actuale de soluționat în Ethereum (și anume, creșterea prețului gazului) și în special a discuțiilor despre soluțiile de scalare.

### Tranzacții {#transactions}

Călătoria pe Ethereum începe prin inițializarea unui cont controlat de utilizator sau a unei entități ce dispune de un sold de ETH. Există două tipuri de conturi - conturile controlate de utilizator sau contractele inteligente (a se vedea [ethereum.org](/developers/docs/accounts/)).

Orice cont poate fi vizualizat pe un explorator de blocuri cum ar fi [Etherscan](https://etherscan.io/). Exploratorii de blocuri sunt un portal către datele din Ethereum. Ei afișează în timp real date despre blocuri, tranzacții, miner-i, conturi și alte activități on-chain (uitați-vă [aici](/developers/docs/data-and-analytics/block-explorers/)).

Totodată, un utilizator poate dori să interogheze direct datele pentru a reconcilia informațiile furnizate de exploratorii de blocuri externi. [Dune Analytics](https://duneanalytics.com/) oferă această posibilitate oricui are cunoștințe de SQL.

Ca referință, contul contractelor inteligente al Fundației Ethereum (EF) poate fi vizualizat pe [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

De remarcat că toate conturile, inclusiv cel al EF, au o adresă publică ce poate fi utilizată pentru a trimite și primi tranzacții.

Soldul contului de pe Etherscan cuprinde tranzacții obișuite și tranzacții interne. Cu toate că se numesc tranzacții interne, acestea nu sunt tranzacții _reale_ care să schimbe starea lanțului. Ele sunt transferuri de valoare inițiate prin executarea unui contract ([sursă](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Tranzacțiile interne neavând o semnătură, **nu** sunt incluse în blockchain și nu pot fi interogate cu Dune Analytics.

De aceea, acest tutorial se va axa pe tranzacțiile obișnuite. Acestea pot fi interogate astfel:

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

Această interogare va produce informații similare cu cele furnizate pe pagina de tranzacții Etherscan. Pentru a le compara, iată cele două surse:

#### Etherscan {#etherscan}

![etherscan_view](./etherscan_view.png)

[Pagina contractului EF pe Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![dune_view](./dune_view.png)

Puteți vedea tabloul de bord [aici](https://duneanalytics.com/paulapivat/Learn-Ethereum). Dați clic pe tabel pentru a vedea interogarea (a se vedea și cele de mai sus).

### Analiza conținutului tranzacțiilor {#breaking_down_transactions}

O tranzacție transmisă include mai multe informații, inclusiv ([sursă](/developers/docs/transactions/)):

- **Destinatarul**: Adresa destinatarului (interogată ca „to”)
- **Semnătura**: În timp ce expeditorul semnează o tranzacție cu cheile private, cu SQL putem interoga adresa publică a expeditorului („from”).
- **Valoarea**: Aceasta este suma de ETH transferată (a se vedea coloana `ether`).
- **Datele**: Acestea sunt date arbitrare care au fost criptate hash (a se vedea coloana `date`)
- **gasLimit**: Cantitatea maximă a gazului sau a costului de calcul pe care o poate consuma o tranzacție (a se vedea `gas_limit`).
- **gasPrice**: Taxa plătită de expeditor pentru a semna o tranzacție în blockchain. Gazul este exprimat în Gwei care este 0,000000001 ETH (nouă zecimale).

Astfel de informații specifice pentru tranzacții se pot obține printr-o interogare la adresa publică a Fundației Ethereum:

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

### Blocuri {#blocks}

Fiecare tranzacție va schimba starea mașinii virtuale Ethereum ([EVM](/developers/docs/evm/)) ([sursă](/developers/docs/transactions/)). Tranzacțiile sunt difuzate în rețea pentru a fi verificate și incluse într-un bloc. Fiecare tranzacție este asociată unui număr de bloc. Putem să vedem datele interogând un anumit număr de bloc: 12396854 (cel mai recent bloc dintre tranzacțiile Fundației Ethereum la data scrierii acestui articol, 5/11/2021).

În plus, când interogăm următoarele două blocuri, putem observa că fiecare bloc conține hash-ul blocului anterior (adică hash-ul părinte), ilustrând cum s-a format blockchain-ul.

Fiecare bloc conține o referință la blocul său părinte. Puteți vedea acest lucru mai jos, între coloanele `hash` și `parent_hash` ([sursă](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Iată [interogarea](https://duneanalytics.com/queries/44856/88292) pe Dune Analytics:

```sql
SELECT
   time,
   number,
   difficulty,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Putem să examinăm un bloc interogând momentul, numărul de bloc, dificultatea, hash-ul, hash-ul părinte și nonce-le.

Singurul lucru care nu este inclus în această interogare este _lista tranzacțiilor_, care cere o altă interogare sub acest bloc și _rădăcina stării_. Un nod complet sau de arhivare va stoca toate tranzacțiile și tranzițiile de stare, permițând clienților să interogheze starea lanțului în orice moment. Întrucât aceasta necesită un spațiu mare de stocare, putem separa datele lanțului de cele de stare:

- Datele lanțului (lista de blocuri, tranzacțiile)
- Datele de stare (rezultatul fiecărei tranziții de stare a tranzacției)

Din ultima categorie face parte „rădăcina de stare”, de tip _implicit_ (nu este stocată on-chain), iar datele lanțului sunt de tip explicit și sunt stocate pe lanțul însuși ([sursă](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

În acest tutorial ne vom axa pe datele on-chain care _pot_ fi interogate cu SQL prin intermediul Dune Analytics.

Așa cum am menționat mai sus, fiecare bloc conține o listă de tranzacții care poate fi interogată prin filtrarea pentru un anumit bloc. Vom încerca cel mai recent bloc, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Iată rezultatul SQL pe Dune:

![list_of_txn](./list_of_txn.png)

Prin adăugarea acestui singur bloc în lanț se schimbă starea mașinii virtuale Ethereum ([EVM](/developers/docs/evm/)). Zeci, uneori, sute de tranzacții sunt verificate în același timp. În cazul nostru specific au fost incluse 222 de tranzacții.

Dacă vrem să aflăm câte dintre ele au reușit, vom adăuga un alt filtru pentru a număra tranzacțiile reușite:

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

În blocul nostru 12396854, din 222 de tranzacții totale, 204 au fost verificate cu succes:

![successful_txn](./successful_txn.png)

Au loc zeci de solicitări de tranzacții în fiecare secundă, dar blocurile sunt confirmate numai câte unul la circa 15 secunde ([sursă](/developers/docs/blocks/)).

Pentru a vedea că se produce un bloc la aproximativ fiecare 15 secunde, am putea să împărțim la 15 numărul de secunde dintr-o zi (86400) pentru a obține o _estimare_ a numărului mediu de blocuri pe zi (~ 5760).

Graficul blocurilor Ethereum produse zilnic (din 2016 până în prezent) este:

![daily_blocks](./daily_blocks.png)

Numărul mediu de blocuri produse zilnic în această perioadă este de ~5.874:

![avg_daily_blocks](./avg_daily_blocks.png)

Interogările sunt:

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

Numărul mediu de blocuri produse zilnic din 2016 depășește ușor estimarea și anume este de 5.874. Ca altă metodă, dacă împărțim 86400 de secunde la 5.874 de blocuri medii, rezultă 14,7 secunde sau aproximativ un bloc la fiecare 15 secunde.

### Gaz {#gas}

Blocurile au o dimensiune limitată. Miner-ii și rețeaua stabilesc în mod colectiv o limită de gaz pentru fiecare bloc, pentru a evita ca blocurile ce au dimensiuni mari în mod arbitar să streseze un nod complet atât în ceea ce privește spațiul pe disc, cât și viteza necesară ([sursă](/developers/docs/blocks/)).

Un mod de a conceptualiza limita de gaz pe bloc este de a o considera ca **oferta** de spațiu disponibil pe bloc în care să-și poată efectua tranzacțiile în loturi. Limita de gaz pe bloc poate fi interogată și vizualizată din 2016 până în ziua de azi:

![avg_gas_limit](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Apoi mai este și gazul efectiv utilizat zilnic pentru plata calculelor efectuate în lanțul Ethereum (și anume, trimiterea de tranzacții, apelarea unui contract inteligent, emiterea unui NFT). Aceasta este **cererea** de spațiu de bloc disponibil pe Ethereum:

![daily_gas_used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Putem de asemenea să juxtapunem aceste două diagrame pentru a vedea cum se aliniază **cererea și oferta**:

![gas_demand_supply](./gas_demand_supply.png)

Așadar, prețul gazului poate fi înțeles ca o funcție de cerere de spațiu de bloc Ethereum pentru tranzacții care are ca parametru oferta disponibilă.

În cele din urmă, am vrea să interogăm prețurile medii zilnice ale gazului pentru lanțul Ethereum, însă aceasta va duce la o interogare deosebit de îndelungată, așa că ne vom filtra interogarea pe cantitatea medie de gaz plătită pe tranzacție de către Fundația Ethereum.

![ef_daily_gas](./ef_daily_gas.png)

Putem vedea prețurile gazului plătite în tranzacție de-a lungul anilor la adresa Fundației Ethereum. Iată interogarea:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Rezumat {#summary}

Acest tutorial ne ajută să înțelegem conceptele fundamentale ale lui Ethereum și cum funcționează blockchain-ul Ethereum, interogând și obișnuindu-ne cu datele on-chain.

Puteți vedea tabloul de bord care conține tot codul utilizat în acest tutorial [aici](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Ca să aflați și alte moduri de utilizare a datelor pentru a explora web3, [mă găsiți pe Twitter](https://twitter.com/paulapivat).
