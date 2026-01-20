---
title: Apprendre les sujets fondamentaux d'Ethereum avec SQL
description: Ce tutoriel aide les lecteurs à comprendre les concepts fondamentaux d'Ethereum, notamment les transactions, les blocs et le gaz, en interrogeant les données sur la chaîne avec le langage de requête structuré (SQL).
author: "Paul Apivat"
tags: [ "SQL", "Requêtes", "Transactions" ]
skill: beginner
lang: fr
published: 11/05/2021
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

De nombreux tutoriels Ethereum s'adressent aux développeurs, mais il y a un manque de ressources éducatives pour les analystes de données ou pour les personnes qui souhaitent consulter les données sur la chaîne sans exécuter un client ou un nœud.

Ce tutoriel aide les lecteurs à comprendre les concepts fondamentaux d'Ethereum, notamment les transactions, les blocs et le gaz, en interrogeant les données sur la chaîne avec le langage de requête structuré (SQL) via une interface fournie par [Dune Analytics](https://dune.com/).

Les données sur la chaîne peuvent nous aider à comprendre Ethereum, le réseau, et son rôle en tant qu'économie pour la puissance de calcul. Elles devraient servir de base à la compréhension des défis auxquels Ethereum est confronté aujourd'hui (par exemple, la hausse des prix du gaz) et, plus important encore, aux discussions sur les solutions de mise à l'échelle.

### Transactions {#transactions}

Le parcours d'un utilisateur sur Ethereum commence par l'initialisation d'un compte contrôlé par l'utilisateur ou d'une entité disposant d'un solde en ETH. Il existe deux types de comptes : les comptes contrôlés par l'utilisateur ou les contrats intelligents (voir [ethereum.org](/developers/docs/accounts/)).

N'importe quel compte peut être consulté sur un explorateur de blocs comme [Etherscan](https://etherscan.io/) ou [Blockscout](https://eth.blockscout.com/). Les explorateurs de blocs sont un portail vers les données d'Ethereum. Ils affichent, en temps réel, les données sur les blocs, les transactions, les mineurs, les comptes et autres activités sur la chaîne (voir [ici](/developers/docs/data-and-analytics/block-explorers/)).

Cependant, un utilisateur peut souhaiter interroger directement les données pour les rapprocher des informations fournies par des explorateurs de blocs externes. [Dune Analytics](https://dune.com/) offre cette possibilité à toute personne ayant quelques connaissances en SQL.

À titre de référence, le compte de contrat intelligent de l'Ethereum Foundation (EF) peut être consulté sur [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Il est à noter que tous les comptes, y compris celui de l'EF, possèdent une adresse publique qui peut être utilisée pour envoyer et recevoir des transactions.

Le solde du compte sur Etherscan comprend des transactions ordinaires et des transactions internes. Les transactions internes, malgré leur nom, ne sont pas des transactions _réelles_ qui modifient l'état de la chaîne. Ce sont des transferts de valeur initiés par l'exécution d'un contrat ([source](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Puisque les transactions internes n'ont pas de signature, elles ne sont **pas** incluses sur la blockchain et ne peuvent pas être interrogées avec Dune Analytics.

Par conséquent, ce tutoriel se concentrera sur les transactions ordinaires. Elles peuvent être interrogées comme suit :

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

Cela produira les mêmes informations que celles fournies sur la page des transactions d'Etherscan. À titre de comparaison, voici les deux sources :

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Page du contrat de l'EF sur Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Vous pouvez trouver le tableau de bord [ici](https://dune.com/paulapivat/Learn-Ethereum). Cliquez sur le tableau pour voir la requête (également visible ci-dessus).

### Analyse détaillée des transactions {#breaking_down_transactions}

Une transaction soumise comprend plusieurs informations, notamment ([source](/developers/docs/transactions/)) :

- **Destinataire** : l'adresse de réception (interrogée en tant que "to")
- **Signature** : bien que la clé privée d'un expéditeur signe une transaction, ce que nous pouvons interroger avec SQL est l'adresse publique d'un expéditeur ("from").
- **Valeur** : il s'agit du montant d'ETH transféré (voir la colonne `ether`).
- **Données** : il s'agit de données arbitraires qui ont été hachées (voir la colonne `data`)
- **gasLimit** – la quantité maximale d'unités de gaz qui peut être consommée par la transaction. Les unités de gaz représentent des étapes de calcul
- **maxPriorityFeePerGas** - le montant maximum de gaz à inclure comme pourboire pour le mineur
- **maxFeePerGas** - le montant maximum de gaz que l'on est prêt à payer pour la transaction (y compris `baseFeePerGas` et `maxPriorityFeePerGas`)

Nous pouvons interroger ces informations spécifiques pour les transactions vers l'adresse publique de l'Ethereum Foundation :

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

### Blocs {#blocks}

Chaque transaction modifiera l'état de la machine virtuelle Ethereum ([EVM](/developers/docs/evm/)) ([source](/developers/docs/transactions/)). Les transactions sont diffusées sur le réseau pour être vérifiées et incluses dans un bloc. Chaque transaction est associée à un numéro de bloc. Pour voir les données, nous pourrions interroger un numéro de bloc spécifique : 12396854 (le bloc le plus récent parmi les transactions de l'Ethereum Foundation au moment de la rédaction de cet article, 11/5/21).

De plus, lorsque nous interrogeons les deux blocs suivants, nous pouvons voir que chaque bloc contient le hachage du bloc précédent (c'est-à-dire le hachage parent), ce qui illustre la façon dont la blockchain est formée.

Chaque bloc contient une référence à son bloc parent. Ceci est illustré ci-dessous entre les colonnes `hash` et `parent_hash` ([source](/developers/docs/blocks/)) :

![parent_hash](./parent_hash.png)

Voici la [requête](https://dune.com/queries/44856/88292) sur Dune Analytics :

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

Nous pouvons examiner un bloc en interrogeant l'heure, le numéro de bloc, la difficulté, le hachage, le hachage parent et le nonce.

La seule chose que cette requête ne couvre pas est la _liste des transactions_, qui nécessite une requête distincte ci-dessous, et la _racine d'état_. Un nœud complet ou d'archivage stockera toutes les transactions et les transitions d'état, ce qui permettra aux clients d'interroger l'état de la chaîne à tout moment. Comme cela nécessite un grand espace de stockage, nous pouvons séparer les données de la chaîne des données d'état :

- Données de la chaîne (liste des blocs, transactions)
- Données d'état (résultat de la transition d'état de chaque transaction)

La racine d'état entre dans cette dernière catégorie et correspond à des données _implicites_ (non stockées sur la chaîne), tandis que les données de la chaîne sont explicites et stockées sur la chaîne elle-même ([source](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Pour ce tutoriel, nous nous concentrerons sur les données sur la chaîne qui _peuvent_ être interrogées avec SQL via Dune Analytics.

Comme indiqué ci-dessus, chaque bloc contient une liste de transactions. Nous pouvons l'interroger en filtrant sur un bloc spécifique. Essayons avec le bloc le plus récent, 12396854 :

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Voici le résultat SQL sur Dune :

![](./list_of_txn.png)

L'ajout de ce seul bloc à la chaîne modifie l'état de la machine virtuelle Ethereum ([EVM](/developers/docs/evm/)). Des dizaines, parfois des centaines de transactions sont vérifiées en une seule fois. Dans ce cas précis, 222 transactions ont été incluses.

Pour voir combien d'entre elles ont effectivement abouti, nous ajoutons un autre filtre pour compter les transactions réussies :

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

Les demandes de transaction se produisent des dizaines de fois par seconde, mais les blocs sont validés environ une fois toutes les 15 secondes ([source](/developers/docs/blocks/)).

Pour voir qu'un bloc est produit environ toutes les 15 secondes, nous pourrions prendre le nombre de secondes dans une journée (86 400) et le diviser par 15 pour obtenir une estimation du nombre moyen de blocs par jour (~ 5 760).

Le graphique des blocs Ethereum produits par jour (de 2016 à aujourd'hui) est le suivant :

![](./daily_blocks.png)

Le nombre moyen de blocs produits quotidiennement au cours de cette période est d'environ 5 874 :

![](./avg_daily_blocks.png)

Les requêtes sont :

```sql
# requête pour visualiser le nombre de blocs produits quotidiennement depuis 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# nombre moyen de blocs produits par jour

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

Le nombre moyen de blocs produits par jour depuis 2016 est légèrement supérieur à ce chiffre, à 5 874. Alternativement, en divisant 86 400 secondes par 5 874 blocs en moyenne, on obtient 14,7 secondes, soit environ un bloc toutes les 15 secondes.

### Gaz {#gas}

La taille des blocs est limitée. La taille maximale d'un bloc est dynamique et varie en fonction de la demande du réseau entre 12 500 000 et 25 000 000 d'unités. Des limites sont nécessaires pour empêcher que des blocs de taille arbitrairement grande ne surchargent les nœuds complets en termes d'espace disque et de vitesse ([source](/developers/docs/blocks/)).

Une façon de conceptualiser la limite de gaz par bloc est de la considérer comme l'**offre** d'espace de bloc disponible pour regrouper les transactions. La limite de gaz par bloc peut être interrogée et visualisée de 2016 à aujourd'hui :

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Ensuite, il y a le gaz réellement utilisé quotidiennement pour payer les calculs effectués sur la chaîne Ethereum (par exemple, envoyer une transaction, appeler un contrat intelligent, frapper un NFT). C'est la **demande** pour l'espace de bloc Ethereum disponible :

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Nous pouvons également juxtaposer ces deux graphiques pour voir comment l'**offre et la demande** s'alignent :

![gas_demand_supply](./gas_demand_supply.png)

Par conséquent, nous pouvons comprendre les prix du gaz comme une fonction de la demande d'espace de bloc sur Ethereum, compte tenu de l'offre disponible.

Enfin, nous pourrions vouloir interroger les prix moyens quotidiens du gaz pour la chaîne Ethereum. Cependant, cela entraînerait un temps de requête particulièrement long, nous allons donc filtrer notre requête sur le montant moyen de gaz payé par transaction par l'Ethereum Foundation.

![](./ef_daily_gas.png)

Nous pouvons voir les prix du gaz payés pour toutes les transactions effectuées vers l'adresse de l'Ethereum Foundation au fil des ans. Voici la requête :

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

Grâce à ce tutoriel, nous avons compris les concepts fondamentaux d'Ethereum et le fonctionnement de la blockchain Ethereum en interrogeant les données sur la chaîne et en nous familiarisant avec elles.

Le tableau de bord qui contient tout le code utilisé dans ce tutoriel peut être trouvé [ici](https://dune.com/paulapivat/Learn-Ethereum).

Pour plus d'utilisation des données pour explorer le web3, [retrouvez-moi sur Twitter](https://twitter.com/paulapivat).
