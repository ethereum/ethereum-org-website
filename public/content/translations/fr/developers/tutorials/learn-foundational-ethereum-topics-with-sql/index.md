---
title: Apprendre les concepts fondamentaux d'Ethereum avec SQL
description: "Ce tutoriel aide les lecteurs à comprendre les concepts fondamentaux d'Ethereum, y compris les transactions, les blocs et le gaz, en interrogeant les données onchain avec le langage de requête structurée (SQL)."
author: "Paul Apivat"
tags: ["SQL", "Requêtes", "Transactions", "données-et-analyses"]
skill: beginner
breadcrumb: Ethereum avec SQL
lang: fr
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

De nombreux tutoriels Ethereum ciblent les développeurs, mais il y a un manque de ressources éducatives pour les analystes de données ou pour les personnes qui souhaitent voir des données onchain sans exécuter de client ou de nœud.

Ce tutoriel aide les lecteurs à comprendre les concepts fondamentaux d'Ethereum, y compris les transactions, les blocs et le gaz, en interrogeant les données onchain avec le langage de requête structurée (SQL) via une interface fournie par [Dune](https://dune.com/). Les requêtes utilisent [DuneSQL](https://docs.dune.com/query-engine/overview), le dialecte SQL de Dune.

Les données onchain peuvent nous aider à comprendre Ethereum, le réseau, et en tant qu'économie pour la puissance de calcul, et devraient servir de base pour comprendre les défis auxquels Ethereum est confronté aujourd'hui (c'est-à-dire la hausse des prix du gaz) et, plus important encore, les discussions autour des solutions de mise à l'échelle.

### Transactions {#transactions}

Le parcours d'un utilisateur sur Ethereum commence par l'initialisation d'un compte contrôlé par l'utilisateur ou d'une entité avec un solde en ETH. Il existe deux types de comptes : contrôlé par l'utilisateur ou un contrat intelligent (voir [ethereum.org](/developers/docs/accounts/)).

N'importe quel compte peut être consulté sur un explorateur de blocs comme [Etherscan](https://etherscan.io/) ou [Blockscout](https://eth.blockscout.com/). Les explorateurs de blocs sont un portail vers les données d'Ethereum. Ils affichent, en temps réel, des données sur les blocs, les transactions, les validateurs, les comptes et d'autres activités onchain (voir [ici](/developers/docs/data-and-analytics/block-explorers/)).

Cependant, un utilisateur peut souhaiter interroger les données directement pour rapprocher les informations fournies par les explorateurs de blocs externes. [Dune](https://dune.com/) offre cette capacité à toute personne ayant quelques connaissances en SQL.

Pour référence, le compte de contrat intelligent de la Fondation Ethereum (EF) peut être consulté sur [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Une chose à noter est que tous les comptes, y compris celui de l'EF, ont une adresse publique qui peut être utilisée pour envoyer et recevoir des transactions.

Le solde du compte sur Etherscan comprend les transactions régulières et les transactions internes. Les transactions internes, malgré leur nom, ne sont pas de _véritables_ transactions qui modifient l'état de la chaîne. Ce sont des transferts de valeur initiés par l'exécution d'un contrat ([source](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Étant donné que les transactions internes n'ont pas de signature, elles ne sont **pas** incluses sur la chaîne de blocs en tant que transactions. Dune les enregistre séparément, dans la table `ethereum.traces`.

Par conséquent, ce tutoriel se concentrera sur les transactions régulières. Celles-ci peuvent être interrogées comme suit :

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

Notez que les adresses sont écrites comme des littéraux `0x...` sans guillemets. Dans DuneSQL, les adresses et les hashs sont des valeurs binaires, et non des chaînes de caractères.

Cela produira les mêmes informations que celles fournies sur la page des transactions d'Etherscan. À titre de comparaison, voici les deux sources :

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Page du contrat de l'EF sur Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Vous pouvez trouver le tableau de bord [ici](https://dune.com/paulapivat/Learn-Ethereum). Cliquez sur la table pour voir la requête (voir aussi ci-dessus).

### Décomposer les transactions {#breaking-down-transactions}

Une transaction soumise comprend plusieurs informations, notamment ([source](/developers/docs/transactions/)) :

- **Destinataire** : L'adresse de réception (interrogée avec "to")
- **Signature** : Bien que les clés privées d'un expéditeur signent une transaction, ce que nous pouvons interroger avec SQL est l'adresse publique d'un expéditeur ("from").
- **Valeur** : Il s'agit du montant d'ETH transféré (voir la colonne `ether`).
- **Données** : Il s'agit de données arbitraires qui ont été hachées (voir la colonne `data`)
- **gasLimit** – la limite de gaz maximale (en unités) pouvant être consommée par la transaction. Les unités de gaz représentent des étapes de calcul
- **maxPriorityFeePerGas** - le montant maximum de gaz à inclure comme frais de priorité pour le validateur
- **maxFeePerGas** - le montant maximum de gaz que l'on est prêt à payer pour la transaction (incluant le baseFeePerGas et le maxPriorityFeePerGas)

Nous pouvons interroger ces informations spécifiques pour les transactions vers l'adresse publique de la Fondation Ethereum :

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

Le `CAST` est nécessaire car la division d'un entier par un autre dans DuneSQL donne un résultat entier, ce qui arrondirait presque tous les pourcentages à zéro.

### Blocs {#blocks}

Chaque transaction modifiera l'état de la Machine Virtuelle Ethereum ([EVM](/developers/docs/evm/)) ([source](/developers/docs/transactions/)). Les transactions sont diffusées sur le réseau pour être vérifiées et incluses dans un bloc. Chaque transaction est associée à un numéro de bloc. Pour voir les données, nous pourrions interroger un numéro de bloc spécifique : 12396854 (le bloc le plus récent parmi les transactions de la Fondation Ethereum au moment de la rédaction, en mai 2021).

De plus, lorsque nous interrogeons les deux blocs suivants, nous pouvons voir que chaque bloc contient le hash du bloc précédent (c'est-à-dire le hash parent), illustrant comment la chaîne de blocs est formée.

Chaque bloc contient une référence à son bloc parent. Cela est illustré ci-dessous entre les colonnes `hash` et `parent_hash` ([source](/developers/docs/blocks/)) :

![parent_hash](./parent_hash.png)

Voici la requête :

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

Nous pouvons examiner un bloc en interrogeant l'heure, le numéro de bloc, le hash, le hash parent et le nonce. Le bloc 12396854 a été produit avant [La Fusion](/roadmap/merge/), lorsque les blocs étaient minés avec la preuve de travail (PoW) et que le nonce était significatif. Dans les blocs de preuve d'enjeu (PoS), le nonce est toujours zéro.

La seule chose que cette requête ne couvre pas est la _liste des transactions_, qui nécessite une requête distincte ci-dessous, et la _racine d'état_ (state root). Un nœud complet ou d'archive stockera toutes les transactions et transitions d'état, permettant aux clients d'interroger l'état de la chaîne à tout moment. Étant donné que cela nécessite un grand espace de stockage, nous pouvons séparer les données de la chaîne des données d'état :

- Données de la chaîne (liste des blocs, transactions)
- Données d'état (résultat de la transition d'état de chaque transaction)

La racine d'état relève de cette dernière catégorie et constitue une donnée _implicite_ (non stockée onchain), tandis que les données de la chaîne sont explicites et stockées sur la chaîne elle-même ([source](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Pour ce tutoriel, nous nous concentrerons sur les données onchain qui _peuvent_ être interrogées avec SQL via Dune.

Comme indiqué ci-dessus, chaque bloc contient une liste de transactions, nous pouvons l'interroger en filtrant pour un bloc spécifique. Nous allons essayer le bloc 12396854 :

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Voici la sortie SQL sur Dune :

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

L'ajout de ce seul bloc à la chaîne modifie l'état de la Machine Virtuelle Ethereum ([EVM](/developers/docs/evm/)). Des dizaines, parfois des centaines de transactions sont vérifiées en même temps. Dans ce cas précis, 222 transactions ont été incluses.

Pour voir combien ont réellement réussi, nous ajouterions un autre filtre pour compter les transactions réussies :

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Pour le bloc 12396854, sur un total de 222 transactions, 204 ont été vérifiées avec succès :

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Les demandes de transaction se produisent des dizaines de fois par seconde, mais les blocs ne sont ajoutés que périodiquement ([source](/developers/docs/blocks/)). Sous la preuve de travail, un bloc était miné en moyenne toutes les 13 à 15 secondes, avec beaucoup de variations. Depuis [La Fusion](/roadmap/merge/) en septembre 2022, la preuve d'enjeu divise le temps en créneaux de 12 secondes, et chaque créneau peut avoir au plus un bloc.

Donc aujourd'hui, il peut y avoir au maximum 86400 / 12 = 7200 blocs par jour. En pratique, il y en a un peu moins, car un validateur manque occasionnellement son créneau.

Le graphique des blocs Ethereum produits par jour (2016 - 2021) est le suivant :

![Chart showing daily Ethereum block production](./daily_blocks.png)

Le nombre moyen de blocs produits quotidiennement sur cette période est d'environ 5 874 :

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Les requêtes sont :

Voici la requête pour visualiser le nombre de blocs produits quotidiennement. La clause `WHERE` exclut le jour en cours, qui n'est pas encore terminé.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Et cette requête calcule le nombre moyen de blocs produits par jour, avant et après La Fusion. Le bloc 15537394 est le premier bloc de preuve d'enjeu.

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

Lorsque ce tutoriel a été rédigé pour la première fois en mai 2021, la moyenne était de 5 874 blocs par jour, soit un bloc toutes les 14,7 secondes. Après La Fusion, la moyenne est juste en dessous du maximum de 7200, soit environ un bloc toutes les 12 secondes.

### Gaz {#gas}

Les blocs ont une taille limitée. Chaque bloc a une limite de gaz, et depuis l'[EIP-1559](/developers/docs/gas/#base-fee), chaque bloc a également une cible de gaz, qui correspond à la moitié de la limite. Lorsque les blocs utilisent plus de gaz que la cible, les frais de base augmentent, et lorsqu'ils en utilisent moins, ils diminuent. La limite de gaz elle-même est ajustée par les validateurs, et elle a été augmentée à plusieurs reprises au fil des ans. Des limites sont nécessaires pour éviter que des tailles de blocs arbitrairement grandes ne mettent à rude épreuve les nœuds complets en termes d'espace disque et d'exigences de vitesse ([source](/developers/docs/blocks/)).

Une façon de conceptualiser la limite de gaz d'un bloc est de la considérer comme l'**offre** d'espace de bloc disponible dans lequel regrouper les transactions. La limite de gaz des blocs peut être interrogée et visualisée de 2016 à aujourd'hui :

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

Ensuite, il y a le gaz réel utilisé quotidiennement pour payer les calculs effectués sur la chaîne Ethereum (c'est-à-dire l'envoi d'une transaction, l'appel d'un contrat intelligent, la frappe d'un jeton non fongible (NFT)). Il s'agit de la **demande** d'espace de bloc Ethereum disponible :

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

Nous pouvons également juxtaposer ces deux graphiques pour voir comment **l'offre et la demande** s'alignent :

![gas_demand_supply](./gas_demand_supply.png)

Par conséquent, nous pouvons comprendre les prix du gaz comme une fonction de la demande d'espace de bloc Ethereum, compte tenu de l'offre disponible.

Enfin, nous pourrions vouloir interroger les prix moyens quotidiens du gaz pour la chaîne Ethereum, cependant, cela entraînerait un temps de requête particulièrement long, nous allons donc filtrer notre requête sur la quantité moyenne de gaz payée par transaction par la Fondation Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Nous pouvons voir les prix du gaz payés pour toutes les transactions effectuées vers l'adresse de la Fondation Ethereum au fil des ans. Voici la requête :

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Résumé {#summary}

Avec ce tutoriel, nous comprenons les concepts fondamentaux d'Ethereum et le fonctionnement de la chaîne de blocs Ethereum en interrogeant et en nous familiarisant avec les données onchain.

Le tableau de bord qui contient tout le code utilisé dans ce tutoriel se trouve [ici](https://dune.com/paulapivat/Learn-Ethereum).

Pour plus d'utilisation des données afin d'explorer le Web3, [retrouvez-moi sur Twitter](https://twitter.com/paulapivat).
