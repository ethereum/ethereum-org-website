---
title: Apprendre les sujets fondamentaux d'Ethereum avec SQL
description: Ce tutoriel a pour objectif d'aider les lecteurs à comprendre les concepts fondamentaux d'Ethereum, y compris les transactions, les blocs et le gaz en interrogeant les données sur chaîne avec le Langage de Requête Structurée (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Requêtes"
  - "Transactions"
skill: beginner
lang: fr
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

De nombreux tutoriels Ethereum ciblent les développeurs, mais il existe un manque de ressources éducatives pour les analystes de données ou pour les personnes qui souhaitent voir des données en chaîne sans faire tourner un client ou un nœud.

Ce tutoriel a pour objectif d'aider les lecteurs à comprendre les concepts fondamentaux d'Ethereum, y compris les transactions, les blocs et la notion de gaz en interrogeant les données en chaîne avec un langage SQL via une interface fournie par [Dune Analytics](https://dune.xyz/home).

Les données en chaîne (On-chain) peuvent nous aider à comprendre Ethereum, le réseau, permettre des économies de puissance informatique et devrait servir de base à la compréhension des défis auxquels Ethereum est confronté aujourd'hui (par exemple : la hausse des prix du gaz) et, plus important encore, avoir des discussions sur les solutions évolutives.

### Transactions {#transactions}

Le voyage d'un utilisateur sur Ethereum débute par l'initialisation d'un compte utilisateur contrôlé ou d'une entité avec un solde ETH. Il existe deux types de comptes - contrôlé par l'utilisateur ou un contrat intelligent (voir [ethereum.org](/developers/docs/accounts/)).

N'importe quel compte peut être consulté sur un explorateur de blocs comme [Etherscan](https://etherscan.io/). Les explorateurs de blocs sont votre portail vers les données Ethereum. Ils affichent, en temps réel, des données sur les blocs, les transactions, les mineurs, les comptes et autres activités en chaîne (voir [ici](/developers/docs/data-and-analytics/block-explorers/)).

Cependant, un utilisateur peut vouloir interroger directement les données pour reconsidérer les informations fournies par les explorateurs de blocs externes. [Dune Analytics](https://duneanalytics.com/) fournit cette capacité à quiconque ayant une certaine connaissance de SQL.

Pour référence, le compte du contrat intelligent de la Fondation Ethereum (EF) peut être consulté sur [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Une chose à noter est que tous les comptes, y compris ceux de la Fondation Ethereum, disposent d'une adresse publique qui peut être utilisée pour envoyer et recevoir des transactions.

Le solde du compte Etherscan comprend des transactions régulières et des transactions internes. Les transactions internes, malgré le nom, ne sont pas des transactions _réelles_ qui modifient l'état de la chaîne. Ce sont des transferts de valeur initiés par l'exécution d'un contrat ([source](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Étant donné que les transactions internes n'ont pas de signature, elles ne sont **PAS** incluses sur la blockchain et ne peuvent pas être interrogées avec Dune Analytics.

Ainsi, ce tutoriel se concentrera sur les transactions dites régulières. Elles peuvent être questionnées ainsi :

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

Cela donnera les mêmes informations que celles fournies sur la page de transaction Etherscan. À titre de comparaison, voici les deux sources :

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[La page du contrat de la Fondation Ethereum sur Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Vous pouvez trouver le tableau de bord [ici](https://duneanalytics.com/paulapivat/Learn-Ethereum). Cliquez sur la table pour voir la requête (voir aussi ci-dessus).

### Décortiquer les transactions {#breaking_down_transactions}

Une transaction soumise comprend plusieurs informations dont ([source](/developers/docs/transactions/) ) :

- **Recipient** : (destinataire) l'adresse de réception (requête « to »)
- **Signature** : Alors que la clé privée d'un expéditeur signe une transaction, ce que nous pouvons demander avec SQL est l'adresse publique de l'expéditeur (« from »).
- **Value** : (valeur) Il s'agit du montant d'ETH transféré (voir colonne `ether`).
- **Data** : (données) il s'agit de données arbitraires qui ont été hachées (voir colonne `data`).
- **gasLimit** : Quantité maximum d’unités de gaz pouvant être consommée par la transaction. Les unités de gaz représentent les étapes de calcul.
- **maxPriorityFeePerGas** : la quantité maximale de gaz à inclure comme un pourboire pour le mineur.
- **maxFeePerGas** - le montant maximum de gaz prêt à être payé pour la transaction (incluant baseFeePerGas et maxPriorityFeePerGas)

Nous pouvons interroger ces informations spécifiques pour les transactions à l'adresse publique de la Fondation Ethereum :

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

### Les blocs {#blocks}

Chaque transaction va changer l'état de la machine virtuelle Ethereum ([EVM](/developers/docs/evm/)) ([source](/developers/docs/transactions/)). Les transactions sont diffusées sur le réseau pour être vérifiées et incluses dans un bloc. Chaque transaction est associée à un numéro de bloc. Pour consulter les données, nous pourrions interroger un numéro de bloc spécifique : 12396854 (le bloc le plus récent parmi les transactions de la Fondation Ethereum à ce jour, 11/05/21).

De plus, lorsque nous interrogeons les deux blocs suivants, nous pouvons constater que chaque bloc contient le hachage du bloc précédent (c.-à-d. parent hash), illustrant la façon dont la blockchain est formée.

Chaque bloc contient une référence vers le bloc parent. Ceci est affiché ci-dessous entre les colonnes `hash` et `parent_hash` ([source](/developers/docs/blocks/) ) :

![parent_hash](./parent_hash.png)

Voici la [requête](https://duneanalytics.com/queries/44856/88292) sur Dune Analytics :

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

Nous pouvons examiner un bloc en interrogeant le temps, le numéro de bloc, la difficulté, l'empreinte numérique, le hachage parent et le nonce.

La seule chose que cette requête ne couvre pas est _la liste de transactions_ qui nécessite une requête séparée ci-dessous et la _racine d'état_. Un nœud complet ou archivé stockera toutes les transactions et transitions d'état, permettant aux clients d'interroger l'état de la chaîne à tout moment. Parce que cela nécessite un grand espace de stockage, nous pouvons séparer les données de la chaîne des données d'état :

- Données de chaîne (liste des blocs, transactions)
- Données d'état (résultat de la transition d'état pour chaque transaction)

La racine d'état tombe dans cette dernière et sont des données _implicites_ (non stockées sur la chaîne), alors que les données en chaîne sont explicites et stockées sur la chaîne elle-même ([source](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Pour ce tutoriel, nous nous concentrerons sur les données en chaîne que l'on _peut_ interroger avec SQL via Dune Analytics.

Comme indiqué ci-dessus, chaque bloc contient une liste de transactions, nous pouvons les consulter en filtrant un bloc spécifique. Nous allons essayer le bloc le plus récent, 12396854 :

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Voici la sortie SQL sur Dune :

![](./list_of_txn.png)

Cet unique bloc étant ajouté à la chaîne change l'état de la Machine Virtuelle Ethereum ([EVM](/developers/docs/evm/)). Des dizaines de fois, des centaines de transactions sont vérifiées en même temps. Dans ce cas précis, 222 transactions ont été incluses.

Pour voir combien de transactions ont réellement réussi, nous ajoutons un autre filtre pour compter les transactions réussies :

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

Pour le bloc 12396854, sur un total de 222 transactions, 204 ont été vérifiées avec succès :

![](./successful_txn.png)

Les requêtes de transactions se produisent des dizaines de fois par seconde, mais les blocs sont produits environ une fois toutes les 15 secondes ([source](/developers/docs/blocks/)).

Pour voir qu'un bloc est produit environ toutes les 15 secondes, nous pourrions prendre le nombre de secondes dans un jour (86400) divisé par 15 pour obtenir une estimation moyenne de blocs par jour (~ 5760).

Le graphique des blocs Ethereum produits par jour (en 2016) est :

![](./daily_blocks.png)

Le nombre moyen de blocs produits quotidiennement au cours de cette période est de ~5 874 :

![](./avg_daily_blocks.png)

Les requêtes sont :

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

Le nombre moyen de blocs produits par jour depuis 2016 est légèrement supérieur à ce nombrede 5 874. Alternativement, diviser 86 400 secondes par 5 874 blocs en moyenne donne 14,7 secondes, soit environ un bloc toutes les 15 secondes.

### Gaz {#gas}

Les blocs sont limités en taille. La taille maximale de bloc est dynamique et varie en fonction de la demande sur le réseau, entre 12 500 000 et 25 000 000 d'unités. Des limites sont requises pour éviter que des blocs de taille arbitraire puissent déformer des nœuds complets en termes d'espace disque et de vitesse requise ([source](/developers/docs/blocks/)).

Une façon de conceptualiser la limite de gaz par bloc est de la considérer comme l'**approvisionnement** de l'espace disponible d'un bloc dans lequel réaliser les transactions par lots. La limite de gaz du bloc peut être consultée et visualisée de 2016 à nos jours :

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Ensuite, il existe le gaz réellement utilisé quotidiennement pour payer les calculs effectués sur la chaîne Ethereum (par exemple en envoyant une transaction, en appelant un contrat intelligent, en frappant un NFT). Ceci est la **demande** pour l'espace disponible de bloc Ethereum :

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Nous pouvons également juxtaposer ces deux graphiques pour voir comment la ligne **demand and supply** se présente :

![gas_demand_supply](./gas_demand_supply.png)

Par conséquent, nous pouvons comprendre les prix du gaz en fonction de la demande en blocs Ethereum, au regard de l'offre disponible.

Enfin, nous pourrions vouloir interroger les prix quotidiens moyens du gaz sur la chaîne Ethereum. Cela entraînera un temps de requête particulièrement long. Nous filtrerons donc notre requête sur le montant moyen de gaz payé par la Fondation Ethereum.

![](./ef_daily_gas.png)

Nous pouvons voir les prix de gaz payés au fil des années pour les transactions à l'adresse de la Fondation Ethereum. Voici la requête :

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Résumé {#summary}

Avec ce tutoriel, nous comprenons les concepts fondateurs d'Ethereum et comment fonctionne la blockchain d'Ethereum en interrogeant et en se donnant une idée des données en chaîne.

Le tableau de bord qui contient tout le code utilisé dans ce tutoriel peut être trouvé [ici](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Pour une plus grande utilisation des données à des fins d'analyse de web3 [vous pouvez me retrouver sur Twitter](https://twitter.com/paulapivat).
