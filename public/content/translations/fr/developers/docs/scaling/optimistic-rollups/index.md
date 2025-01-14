---
title: Rollups optimisés
description: Une introduction aux rollups optimistes, une solution de mise à l'échelle utilisée par la communauté Ethereum.
lang: fr
---

Les rollups optimistes sont des protocoles de couche 2 (L2) conçus pour augmenter le débit de la couche de base d'Ethereum. Ils réduisent le calcul de la chaîne principale d'Ethereum en traitant les transactions hors chaîne, offrant des améliorations significatives dans les vitesses de traitement. Contrairement aux autres solutions de mise à l'échelle, telles que les [chaînes latérales](/developers/docs/scaling/sidechains/), les rollups optimistes tirent leur sécurité du réseau principal en publiant les résultats de transaction en chaîne, ou les [chaînes Plasma](/developers/docs/scaling/plasma/), qui vérifient également les transactions sur Ethereum avec des preuves de fraude, mais stockent les données de transaction ailleurs.

Le calcul étant la partie lente et coûteuse de l'utilisation d'Ethereum, les rollups optimistes offrent 10 à 100 fois plus d'améliorations en terme d'évolutivité. Les rollups optimistes écrivent également les transactions sur Ethereum en tant que `calldata` ou dans des [blobs](/roadmap/danksharding/), ce qui réduit les coûts de gaz pour les utilisateurs.

## Prérequis {#prerequisites}

Vous devez avoir lu et compris nos pages sur la [mise à l'échelle d'Ethereum](/developers/docs/scaling/) et la [couche 2](/layer-2/).

## Qu'est-ce qu'un rollup optimiste ? {#what-is-an-optimistic-rollup}

Un rollup optimiste est une approche de mise à l'échelle d'Ethereum qui implique de déplacer le calcul et le stockage d'état hors chaîne. Les rollups optimistes exécutent des transactions en dehors d'Ethereum, mais publient les données de transaction sur le réseau principal en tant que `calldata` ou dans les [blobs](/roadmap/danksharding/).

Les opérateurs de rollup optimiste regroupent plusieurs transactions hors chaîne ensemble en gros lots avant de les soumettre à Ethereum. Cette approche permet de répartir les coûts fixes sur plusieurs transactions dans chaque lot, réduisant ainsi les frais pour les utilisateurs finaux. Les rollups optimistes utilisent également des techniques de compression pour réduire la quantité de données publiées sur Ethereum.

Les rollups optimistes sont considérés comme « optimistes » car ils supposent que les transactions hors chaîne sont valides et ne publient pas de preuves de validité pour les lots de transactions postés sur la chaîne. Cela sépare les rollups optimistes des [rollups zero-knowledge](/developers/docs/scaling/zk-rollups) qui publient des [preuves de validité](/glossary/#validity-proof) cryptographiques pour les transactions hors chaîne.

Les rollups optimistes se basent plutôt sur un système de preuve de fraude pour détecter les cas où les transactions ne sont pas calculées correctement. Après qu'un lot de rollup soit envoyé sur Ethereum, il y a une fenêtre de temps (appelée période de contestation) au cours de laquelle n'importe qui peut contester les résultats d'une transaction de rollup en calculant une [preuve de fraude](/glossary/#fraud-proof).

Si la preuve de fraude réussit, le protocole du rollup exécute à nouveau la/les transaction(s) et met à jour l'état du rollup en conséquence. L'autre effet d'une preuve de fraude réussie est que le séquenceur responsable d'inclure la transaction incorrectement exécutée dans un bloc reçoit une pénalité.

Si le lot de rollup reste non contesté (c’est-à-dire que toutes les transactions sont correctement exécutées) après la période de contestation, il est considéré valide et est accepté sur Ethereum. Les autres peuvent continuer à construire sur un bloc de rollup non confirmé, mais avec une mise en garde : les résultats de la transaction seront inversés si elle est basée sur une transaction mal exécutée publiée précédemment.

## Comment les rollups optimistes interagissent-ils avec Ethereum ? {#optimistic-rollups-and-Ethereum}

Les rollups optimistes sont des [solutions d'évolutivité hors chaîne](/developers/docs/scaling/#off-chain-scaling) conçues pour fonctionner sur Ethereum. Chaque rollup optimiste est géré par un ensemble de contrats intelligents déployés sur le réseau Ethereum. Les rollups optimistes traitent les transactions en dehors de la chaîne principale d'Ethereum, mais publient les transactions hors chaîne (en lots) dans un contrat de rollup sur la chaîne. Comme la blockchain Ethereum, cet enregistrement de transaction est immuable et forme la « chaîne de rollup optimiste. »

L'architecture d'un rollup optimiste comprend les éléments suivants :

**Les contrats en chaîne** : Le fonctionnement des rollups optimistes est contrôlé par des contrats intelligents s'exécutant sur Ethereum. Cela inclut les contrats qui stockent les blocs du rollup, surveillent les mises à jour d'état sur le rollup, et suivent les dépôts des utilisateurs. Dans ce sens, Ethereum sert de couche de base ou de « couche 1 » pour les rollups optimistes.

**Machine virtuelle hors chaîne (VM)** : Bien que les contrats gérant le protocole de rollup optimiste s'exécutent sur Ethereum, le protocole rollup effectue le calcul et le stockage d'état sur une autre machine virtuelle séparée de la [Machine Virtuelle Ethereum](/developers/docs/evm/). La VM hors chaîne est l'endroit où les applications résident et où les changements d'état sont exécutés ; elle sert de couche supérieure ou de « couche 2 » pour un rollup optimiste.

Comme les rollups optimistes sont conçus pour exécuter des programmes écrits ou compilés pour l'EVM, la VM hors chaîne intègre de nombreuses spécifications de conception de l'EVM. De plus, des preuves de fraude calculées en chaîne permettent au réseau Ethereum de faire respecter la validité des changements d'état calculés dans la machine virtuelle hors chaîne.

Les rollups optimistes sont décrits comme des « solutions hybrides de mise à l'échelle », car, bien qu'ils existent en tant que protocoles séparés, leurs propriétés de sécurité sont dérivées d'Ethereum. Entre autres choses, Ethereum garantit l'exactitude du calcul hors chaîne d'un rollup et la disponibilité des données derrière le calcul. Cela rend les rollups optimistes plus sécurisés que les protocoles de mise à l'échelle purement hors chaîne (par exemple, [les chaines latérales](/developers/docs/scaling/sidechains/)) qui ne reposent pas sur Ethereum pour la sécurité.

Les rollups optimistes s'appuient sur le protocole Ethereum principal pour les raisons suivantes :

### Disponibilité des données {#data-availability}

Comme mentionné plus tôt, les rollups optimistes envoient des données de transaction sur Ethereum en tant que `calldata` ou [blobs](/roadmap/danksharding/). Étant donné que l'exécution de la chaîne rollup est basée sur les transactions soumises, n'importe qui peut utiliser ces informations – ancrées sur la couche de base d'Ethereum – pour exécuter l'état du rollup et vérifier la justesse des transitions d'état.

La [disponibilité des données](/developers/docs/data-availability/) est essentielle car, sans accès aux données d'état, les challengers ne peuvent pas construire de preuves de fraude pour contester les opérations de rollup invalides. Avec Ethereum fournissant la disponibilité des données, le risque que les opérateurs de rollup pratiquent des actes malveillants (par exemple, soumettre des blocs non valides) est réduit.

### Résistance à la censure {#censorship-resistance}

Les rollups optimistes s'appuient également sur Ethereum pour la résistance à la censure. Dans un rollup optimiste, une entité centralisée (l'opérateur) est responsable du traitement des transactions et de la soumission des blocs de rollup à Ethereum. Cela a certaines implications :

- Les opérateurs de rollup peuvent censurer les utilisateurs en se déconnectant complètement, ou en refusant de produire des blocs qui incluent certaines transactions.

- Les opérateurs de rollup peuvent empêcher les utilisateurs de retirer des fonds déposés dans le contrat du rollup en retenant les données d'état nécessaires aux preuves de propriété de Merkle. La retenue des données d'état peut également dissimuler l'état du rollup aux utilisateurs et les empêcher d'interagir avec le rollup.

Les rollups optimistes résolvent ce problème en forçant les opérateurs à publier des données associées aux mises à jour d'état sur Ethereum. La publication de données rollup en chaîne a les avantages suivants :

- Si un opérateur de rollup optimiste se déconnecte ou arrête de produire des lots de transactions, un autre nœud peut utiliser les données disponibles pour reproduire le dernier état du rollup et continuer la production de blocs.

- Les utilisateurs peuvent utiliser les données de transaction pour créer des preuves de Merkle prouvant la propriété des fonds et retirer leurs actifs du rollup.

- Les utilisateurs peuvent également soumettre leurs transactions sur la L1 au lieu du séquenceur, auquel cas le séquenceur doit inclure la transaction dans un certain délai pour continuer à produire des blocs valides.

### Règlement {#settlement}

Un autre rôle qu'Ethereum joue dans le contexte des rollups optimistes est celui d'une couche de règlement. Une couche de règlement permet d'ancrer l'ensemble de l'écosystème blockchain, d'établir la sécurité et de fournir une finalité objective si un litige survient sur une autre chaîne (les rollups optimistes dans ce cas) qui nécessite un arbitrage.

Le réseau principal d'Ethereum fournit un hub pour les rollups optimistes afin de vérifier les preuves de fraude et de résoudre les litiges. En outre, les transactions effectuées sur le rollup ne sont définitives qu'_après_ l'acceptation du bloc rollup sur Ethereum. Une fois qu'une transaction rollup est engagée sur la couche de base d'Ethereum, elle ne peut pas être annulée (sauf dans le cas très improbable d'une réorganisation de la chaîne).

## Comment fonctionnent les rollups optimistes ? {#how-optimistic-rollups-work}

### Exécution et agrégation des transactions {#transaction-execution-and-aggregation}

Les utilisateurs soumettent des transactions aux « opérateurs », qui sont des nœuds responsables du traitement des transactions sur le rollup optimiste. Également appelé « validateur » ou « agrégateur », l'opérateur regroupe les transactions, compresse les données sous-jacentes et publie le bloc sur Ethereum.

Bien que n'importe qui puisse devenir validateur, les validateurs de rollup optimiste doivent fournir une caution avant de produire des blocs, un peu comme dans un [système de preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). Ce lien peut être rompu si le validateur publie un bloc non valide ou s'appuie sur un bloc ancien mais non valide (même si son bloc est valide). De cette façon, les rollups optimistes utilisent des incitations cryptoéconomiques pour garantir que les validateurs agissent honnêtement.

Les autres validateurs de la chaîne de rollup optimiste sont censés exécuter les transactions soumises en utilisant leur copie de l'état du rollup. Si l'état final d'un validateur est différent de l'état proposé par l'opérateur, il peut lancer un défi et calculer une preuve de fraude.

Certains rollups optimistes peuvent renoncer à un système de validateurs sans permission et utiliser un seul « séquenceur » pour exécuter la chaîne. Comme un validateur, le séquenceur traite les transactions, produit des blocs de rollup et soumet les transactions de rollup à la chaîne L1 (Ethereum).

Le séquenceur est différent d'un opérateur de rollup ordinaire car il a un plus grand contrôle sur l'ordre des transactions. De plus, le séquenceur a un accès prioritaire à la chaîne de rollup et est la seule entité autorisée à soumettre des transactions au contrat sur la chaîne. Les transactions provenant de nœuds non séquenceurs ou d'utilisateurs réguliers sont simplement mises en file d'attente dans une boîte de réception distincte jusqu'à ce que le séquenceur les englobe dans un nouveau lot.

#### Soumettre des blocs de rollup à Ethereum {#submitting-blocks-to-ethereum}

Comme mentionné, l'opérateur d'un rollup optimiste regroupe les transactions hors chaîne dans un lot et l'envoie à Ethereum pour la notarisation. Ce processus implique de compresser les données liées aux transactions et de les publier sur Ethereum en tant que `calldata` ou dans des blobs.

`calldata` est une zone non modifiable et non persistante dans un contrat intelligent qui se comporte principalement comme une [mémoire](/developers/docs/smart-contracts/anatomy/#memory). Alors que `calldata` persiste sur la chaîne en tant que partie des [history logs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la blockchain, elle n'est pas stockée en tant que partie de l'état d'Ethereum. Parce que `calldata` ne touche aucune partie de l'état d'Ethereum, il est moins coûteux que l'état pour stocker des données sur la chaîne.

Le mot-clé `calldata` est également utilisé dans Solidity pour transmettre des arguments à une fonction de contrat intelligent au moment de l'exécution. `calldata` identifie la fonction appelée pendant une transaction et détient les entrées de la fonction sous la forme d'une séquence arbitraire d'octets.

Dans le contexte des rollups optimistes, `calldata` est utilisé pour envoyer des données de transaction compressées au contrat en chaîne. L'opérateur de rollup ajoute un nouveau lot en appelant la fonction requise dans le contrat de rollup et en transmettant les données compressées comme arguments de fonction. L'utilisation de `calldata` réduit les frais d'utilisation puisque la plupart des coûts que les rollups encourent proviennent du stockage des données sur la chaîne.

Voici [un exemple](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de soumission d'un batch de rollup pour montrer comment ce concept fonctionne. Le séquenceur a invoqué la méthode `appendSequencerBatch()` et a transmis les données de transaction compressées comme entrées en utilisant `calldata`.

Certains rollups utilisent maintenant des blobs pour poster des lots de transactions sur Ethereum.

Les blobs ne sont ni modifiables ni persistants (tout comme `calldata`), mais ils sont supprimés de l'historique après environ 18 jours. Pour plus d'informations sur les blobs, consultez [Danksharding](/roadmap/danksharding).

### Engagements d'état {#state-commitments}

À tout moment, l'état du rollup optimiste (comptes, soldes, code de contrat, etc.) est organisé sous la forme d'un [arbre de Merkle](/whitepaper/#merkle-trees) appelé « arbre d'état ». La racine de cet arbre de Merkle (racine d'état), qui fait référence au dernier état du rollup, est hachée et stockée dans le contrat du rollup. Chaque transition d'état sur la chaîne produit un nouvel état de rollup, auquel un opérateur s'engage en calculant une nouvelle racine d'état.

L'opérateur est tenu de soumettre les racines de l'ancien et du nouvel État lorsqu'il enregistre des lots. Si l'ancienne racine d'état correspond à la racine d'état existante dans le contrat on-chain, cette dernière est écartée et remplacée par la nouvelle racine d'état.

L'opérateur de rollup est également tenu de livrer une racine Merkle pour le lot de transactions lui-même. Cela permet à quiconque de prouver l'inclusion d'une transaction dans le lot (sur L1) en présentant une [preuve de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Les engagements d'état, en particulier les racines d'état, sont nécessaires pour prouver l'exactitude des changements d'état dans un rollup optimiste. Le contrat de rollup accepte les nouvelles racines d'état des opérateurs immédiatement après leur publication, mais peut supprimer ultérieurement les racines d'état invalides pour rétablir l'état correct du rollup.

### La preuve de la fraude {#fraud-proving}

Comme expliqué, les rollups optimistes permettent à quiconque de publier des blocs sans fournir de preuves de validité. Cependant, pour garantir la sécurité de la chaîne, les rollups optimistes spécifient une fenêtre de temps pendant laquelle n'importe qui peut contester une transition d'état. C'est pourquoi les blocs de rollup sont appelés « assertions », car tout le monde peut contester leur validité.

Si quelqu'un conteste une assertion, le protocole de rollup lance le calcul de la preuve de fraude. Chaque type de preuve de fraude est interactif - quelqu'un doit publier une affirmation avant qu'une autre personne puisse la contester. La différence réside dans le nombre de tours d'interaction nécessaires pour calculer la preuve de la fraude.

Les schémas de preuve interactifs à un tour rejouent les transactions contestées sur L1 pour détecter les assertions invalides. Le protocole rollup émule la réexécution de la transaction contestée sur L1 (Ethereum) à l'aide d'un contrat de vérificateur, la racine de l'état calculé déterminant qui remporte le défi. Si l'affirmation du challenger concernant l'état correct du rollup est correcte, l'opérateur est pénalisé par la réduction de sa caution.

Cependant, la réexécution des transactions sur L1 pour détecter les fraudes nécessite la publication des engagements d'état pour les transactions individuelles et augmente les données que les rollups doivent publier sur la chaîne. La relecture des transactions entraîne également d'importants coûts en gaz. Pour ces raisons, les rollups optimistes passent à la preuve interactive à tours multiples, qui atteint le même objectif (c'est-à-dire la détection des opérations de rollup invalides) avec plus d'efficacité.

#### Épreuve interactive à plusieurs tours {#multi-round-interactive-proving}

La preuve interactive à tours multiples implique un protocole de va-et-vient entre l'assertif et le challenger, supervisé par un contrat de vérificateur L1, qui décide finalement de la partie qui a menti. Après qu'un nœud L2 ait contesté une assertion, l'assertif est tenu de diviser l'assertion contestée en deux moitiés égales. Dans ce cas, chaque assertion individuelle contiendra autant d'étapes de calcul que l'autre.

Le contestataire choisira ensuite l'affirmation qu'il veut contester. Le processus de division (appelé « protocole de bissection ») se poursuit jusqu'à ce que les deux parties contestent une affirmation concernant _une seule_ étape d'exécution. À ce stade, le contrat L1 résoudra le litige en évaluant l'instruction (et son résultat) pour attraper la partie frauduleuse.

Le vérificateur est tenu de fournir une « preuve en une étape » vérifiant la validité du calcul en une étape contesté. Si le vérificateur ne parvient pas à fournir la preuve en une étape, ou si le vérificateur L1 juge la preuve invalide, ils perdent le défi.

Quelques remarques sur ce type de preuve de fraude :

1. La preuve de fraude interactive à tours multiples est considérée comme efficace car elle minimise le travail que la chaîne L1 doit effectuer lors de l'arbitrage des litiges. Au lieu de rejouer l'intégralité de la transaction, la chaîne L1 n'a besoin de réexécuter qu'une seule étape de l'exécution du rollup.

2. Les protocoles de bissection réduisent la quantité de données publiées sur la chaîne (il n'est pas nécessaire de publier des commits d'état pour chaque transaction). En outre, les transactions de rollup optimistes ne sont pas limitées par la limite de gaz d'Ethereum. Inversement, les rollups optimistes qui réexécutent les transactions doivent s'assurer qu'une transaction L2 a une limite de gaz inférieure pour émuler son exécution dans une seule transaction Ethereum.

3. Une partie de la caution du vérificateur malveillant est attribuée au challenger, tandis que l'autre partie est brûlée. La combustion empêche la collusion entre les validateurs ; si deux validateurs s'entendent pour lancer de faux défis, ils perdront quand même une part considérable de la mise totale.

4. La preuve interactive à tours multiples exige que les deux parties (le vérificateur et le challenger) effectuent des mouvements dans la fenêtre de temps spécifiée. L'absence d'action avant l'expiration du délai entraîne la perte du défi pour la partie défaillante.

#### Pourquoi les preuves de fraude sont importantes pour les rollups optimistes {#fraud-proof-benefits}

Les preuves de fraude sont importantes parce qu'elles facilitent la _finalité de confiance_ dans les rollups optimistes. La finalité sans confiance est une qualité des rollups optimistes qui garantit qu'une transaction - tant qu'elle est valide - sera finalement confirmée.

Les nœuds malveillants peuvent essayer de retarder la confirmation d'un bloc de rollup valide en lançant de faux défis. Cependant, les preuves de fraude finiront par prouver la validité du bloc rollup et le feront confirmer.

Ceci est également lié à une autre propriété de sécurité des rollups optimistes : la validité de la chaîne repose sur l'existence _d'un_ nœud honnête. Le nœud honnête peut faire progresser la chaîne correctement en postant des assertions valides ou en contestant les assertions invalides. Quoi qu'il en soit, les nœuds malveillants qui entrent en conflit avec le nœud honnête perdront leurs mises pendant le processus de preuve de la fraude.

### Interopérabilité L1/L2 {#l1-l2-interoperability}

Les rollups optimistes sont conçus pour l'interopérabilité avec le réseau principal Ethereum et permettent aux utilisateurs de transmettre des messages et des données arbitraires entre L1 et L2. Ils sont également compatibles avec l'EVM, de sorte que vous pouvez porter des [dApps](/developers/docs/dapps/) existantes vers des rollups optimistes ou créer de nouveaux dApps à l'aide d'outils de développement Ethereum.

#### 1. Mouvement des actifs {#asset-movement}

##### Saisir le rollup

Pour utiliser un rollup optimiste, les utilisateurs déposent des ETH, des jetons ERC-20 et d'autres actifs acceptés dans le contrat [pont](/developers/docs/bridges/) du rollup sur L1. Le contrat pont relaiera la transaction vers L2, où un montant équivalent d'actifs sera frappé et envoyé à l'adresse choisie par l'utilisateur lors du rollup optimiste.

Les transactions générées par l'utilisateur (comme un dépôt L1 > L2) sont généralement mises en file d'attente jusqu'à ce que le séquenceur les soumette à nouveau au contrat de rollup. Cependant, pour préserver la résistance à la censure, les rollups optimistes permettent aux utilisateurs de soumettre une transaction directement au contrat de rollup on-chain si elle a été retardée au-delà du temps maximum autorisé.

Certains rollups optimistes adoptent une approche plus directe pour empêcher les séquenceurs de censurer les utilisateurs. Ici, un bloc est défini par toutes les transactions soumises au contrat L1 depuis le bloc précédent (par exemple, les dépôts) en plus des transactions traitées sur la chaîne de rollup. Si un séquenceur ignore une transaction sur L1, il publiera la racine d'état (prouvée) erronée ; par conséquent, les séquenceurs ne peuvent pas retarder les messages générés par les utilisateurs une fois qu'ils sont publiés sur L1.

##### Sortie du rollup

Le retrait d'un rollup optimiste vers Ethereum est plus difficile en raison du système de preuve de la fraude. Si un utilisateur lance une transaction L2 > L1 pour retirer des fonds séquestrés sur L1, il doit attendre que la période de défi - qui dure environ sept jours - soit écoulée. Néanmoins, le processus de retrait lui-même est assez simple.

Une fois la demande de retrait initiée sur le rollup L2, la transaction est incluse dans le lot suivant, tandis que les actifs de l'utilisateur sur le rollup sont brûlés. Une fois le lot publié sur Ethereum, l'utilisateur peut calculer une preuve de Merkle vérifiant l'inclusion de sa transaction de sortie dans le bloc. Il s'agit ensuite d'attendre la période de retard pour finaliser la transaction sur L1 et retirer les fonds sur le réseau principal.

Pour éviter d'attendre une semaine avant de retirer des fonds sur Ethereum, les utilisateurs de rollup optimistes peuvent faire appel à un **fournisseur de liquidités** (LP). Un fournisseur de liquidité assume la propriété d'un retrait L2 en attente et paie l'utilisateur sur L1 (en échange d'une commission).

Les fournisseurs de liquidités peuvent vérifier la validité de la demande de retrait de l'utilisateur (en exécutant eux-mêmes la chaîne) avant de libérer les fonds. De cette façon, ils ont l'assurance que la transaction sera finalement confirmée (c'est-à-dire une finalité sans confiance).

#### 2. Compatibilité EVM {#evm-compatibility}

Pour les développeurs, l'avantage des rollups optimistes est leur compatibilité - ou, mieux encore, leur équivalence - avec la [machine virtuelle Ethereum](/developers/docs/evm/) (EVM). Les rollups compatibles EVM sont conformes aux spécifications du [Yellow Paper d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) et prennent en charge l'EVM au niveau du bytecode.

La compatibilité avec EVM dans les rollups optimistes présente les avantages suivants :

i. Les développeurs peuvent faire migrer les contrats intelligents existants sur Ethereum vers des chaînes de rollup optimistes sans avoir à modifier les bases de code en profondeur. Cela peut faire gagner du temps aux équipes de développement lors du déploiement de contrats intelligents Ethereum sur L2.

ii. Les développeurs et les équipes de projet qui utilisent des rollups optimistes peuvent profiter de l'infrastructure d'Ethereum. Cela inclut les langages de programmation, les bibliothèques de code, les outils de test, les logiciels clients, l'infrastructure de déploiement, etc.

L'utilisation d'outils existants est importante car ces outils ont été largement vérifiés, débogués et améliorés au fil des années. De plus, les développeurs d'Ethereum n'ont plus besoin d'apprendre à construire avec une pile de développement entièrement nouvelle.

#### 3. Appels de contrats inter-chaînes {#cross-chain-contract-calls}

Les utilisateurs (comptes détenus en externe) interagissent avec les contrats L2 en soumettant une transaction au contrat de rollup ou en demandant à un séquenceur ou à un validateur de le faire pour eux. Les rollups optimistes permettent également aux comptes de contrats sur Ethereum d'interagir avec les contrats L2 en utilisant des contrats relais pour relayer les messages et transmettre les données entre L1 et L2. Cela signifie que vous pouvez programmer un contrat L1 sur le réseau principal Ethereum pour invoquer des fonctions appartenant à des contrats sur un rollup optimiste L2.

Les appels de contrats inter-chaînes se font de manière asynchrone, c'est-à-dire que l'appel est d'abord lancé, puis exécuté à un moment ultérieur. Ceci est différent des appels entre les deux contrats sur Ethereum, où l'appel produit des résultats immédiatement.

Un exemple d'appel de contrat inter-chaîne est le dépôt de jetons décrit précédemment. Un contrat sur L1 met en dépôt les jetons de l'utilisateur et envoie un message à un contrat L2 apparié pour monnayer une quantité égale de jetons lors du rollup.

Étant donné que les appels de messages inter-chaînes entraînent l'exécution d'un contrat, l'expéditeur est généralement tenu de couvrir les [coûts du gaz](/developers/docs/gas/) pour le calcul. Il est conseillé de fixer une limite de gaz élevée pour éviter que la transaction n'échoue sur la chaîne cible. Le scénario du pontage des jetons en est un bon exemple. Si le côté L1 de la transaction (dépôt des jetons) fonctionne, mais que le côté L2 (frappe de nouveaux jetons) échoue en raison d'un manque de gaz, le dépôt devient irrécupérable.

Enfin, il convient de noter que les appels de messages L2 > L1 entre les contrats doivent tenir compte des délais (les appels L1 > L2 sont généralement exécutés après quelques minutes). En effet, les messages envoyés au réseau principal depuis le rollup optimiste ne peuvent être exécutés avant l'expiration de la fenêtre de défi.

## Comment fonctionnent les frais de reconduction optimistes ? {#how-do-optimistic-rollup-fees-work}

Les rollups optimistes utilisent un système de frais de gaz, un peu comme Ethereum, pour indiquer combien les utilisateurs paient par transaction. Les frais facturés sur les rollups optimistes dépendent des éléments suivants :

1. **State write**: Les rollups optimistes publient les données de transaction et les en-têtes de bloc (composés du hachage de l'en-tête de bloc précédent, de la racine de l'état, de la racine du lot) sur Ethereum sous forme de `blob`, ou "objet binaire large". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) a introduit une solution économique pour inclure des données sur la chaîne. Un `blob` est un nouveau champ de transaction qui permet aux rollups de publier des données de transition d'état compressées sur la couche 1 d'Ethereum. Contrairement au `calldata`, qui reste en permanence sur la chaîne, les blobs sont de courte durée et peuvent être supprimés des clients après [4096 époques](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (environ 18 jours). En utilisant des blobs pour publier des lots de transactions compressées, les rollups optimistes peuvent réduire de manière significative le coût d'écriture des transactions sur la couche 1.

2. **Gaz utilisé pour les blobs** : Les transactions contenant des blobs utilisent un mécanisme de frais dynamique similaire à celui introduit par [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Les frais de gaz pour les transactions de type 3 tiennent compte des frais de base pour les blobs, qui sont déterminés par le réseau en fonction de la demande d'espace pour les blobs et de l'utilisation de l'espace blob par la transaction envoyée.

3. **Frais d'opérateur L2** : Il s'agit du montant versé aux nœuds de rollup en compensation des coûts de calcul encourus pour le traitement des transactions, un peu comme les frais de gaz sur Ethereum. Les nœuds de rollup facturent des frais de transaction moins élevés car les L2 ont des capacités de traitement supérieures et ne sont pas confrontées aux congestions du réseau qui obligent les validateurs d'Ethereum à donner la priorité aux transactions dont les frais sont plus élevés.

Les rollups optimistes appliquent plusieurs mécanismes pour réduire les frais pour les utilisateurs, notamment le regroupement des transactions et la compression des `calldata` pour réduire les coûts de publication des données. Vous pouvez consulter le [L2 fee tracker](https://l2fees.info/) pour avoir un aperçu en temps réel de ce que coûte l'utilisation des rollups optimistes basés sur Ethereum.

## Comment les rollups optimistes font-ils évoluer Ethereum ? {#scaling-ethereum-with-optimistic-rollups}

Comme expliqué, les rollups optimistes publient des données de transaction compressées sur Ethereum pour garantir la disponibilité des données. La possibilité de compresser les données publiées sur la chaîne est cruciale pour mettre à l'échelle le débit sur Ethereum avec des rollups optimistes.

La chaîne principale d'Ethereum impose des limites à la quantité de données que les blocs peuvent contenir, libellées en unités de gaz (la [taille moyenne des blocs](/developers/docs/blocks/#block-size) est de 15 millions de gaz). Bien que cela limite la quantité de gaz que chaque transaction peut utiliser, cela signifie également que nous pouvons augmenter les transactions traitées par bloc en réduisant les données liées aux transactions, ce qui améliore directement l'évolutivité.

Les rollups optimistes utilisent plusieurs techniques pour réaliser la compression des données de transaction et améliorer les taux de TPS. Par exemple, cet [article](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compare les données qu'une transaction utilisateur de base (envoi d'ether) génère sur le réseau principal par rapport à la quantité de données que la même transaction génère sur un rollup :

| Paramètre   | Ethereum (L1)       | Rollup (L2)    |
| ----------- | ------------------- | -------------- |
| Nonce       | ~3                  | 0              |
| Prix du gaz | ~8                  | 0-0.5          |
| Gaz         | 3                   | 0-0.5          |
| À           | 21                  | 4              |
| Valeur      | 9                   | ~3             |
| Signature   | ~68 (2 + 33 + 33)   | ~0.5           |
| De          | 0 (récupéré de sig) | 4              |
| **Total**   | **~112 octets**     | **~12 octets** |

En effectuant quelques calculs approximatifs sur ces chiffres, on peut montrer les améliorations d'évolutivité offertes par un rollup optimiste :

1. La taille cible de chaque bloc est de 15 millions de gaz et il en coûte 16 pour vérifier un octet de données. En divisant la taille moyenne des blocs par 16 gaz (15 000 000/16), on constate que le bloc moyen peut contenir **937 500 octets de données**.
2. Si une transaction rollup de base utilise 12 octets, alors le bloc Ethereum moyen peut traiter **78 125 transactions rollup** (937 5000/12) ou **39 lots rollup** (si chaque lot contient une moyenne de 2 000 transactions).
3. Si un nouveau bloc est produit sur Ethereum toutes les 15 secondes, les vitesses de traitement du rollup s'élèveraient à environ **5 208 transactions par seconde**. Cela se fait en divisant le nombre de transactions rollup de base qu'un bloc Ethereum peut contenir (**78 125**) par la durée moyenne du bloc (**15 secondes**).

Il s'agit d'une estimation assez optimiste, étant donné que les transactions de rollup optimistes ne peuvent pas constituer un bloc entier sur Ethereum. Cependant, il peut donner une idée approximative des gains d'évolutivité que les rollups optimistes peuvent offrir aux utilisateurs d'Ethereum (les implémentations actuelles offrent jusqu'à 2 000 TPS).

L'introduction de [la fragmentation des données](/roadmap/danksharding/) sur Ethereum devrait améliorer l'évolutivité dans les rollups optimistes. Comme les transactions rollup doivent partager l'espace de blocs avec d'autres transactions non rollup, leur capacité de traitement est limitée par le débit de données sur la chaîne principale d'Ethereum. Danksharding augmentera l'espace disponible pour les chaînes L2 pour publier des données par bloc, en utilisant un stockage « blob » moins cher, non permanent au lieu de `DONNÉES D'APPEL` coûteuses et permanentes.

### Avantages et inconvénients des rollups optimistes {#optimistic-rollups-pros-and-cons}

| Avantages                                                                                                                                                                                              | Inconvénients                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offre des améliorations massives en matière d'évolutivité sans sacrifier la sécurité ou la fiabilité.                                                                                                  | Retards dans la finalité de la transaction en raison d'éventuels problèmes de fraude.                                                                                               |
| Les données de transaction sont stockées sur la chaîne de couche 1, ce qui améliore la transparence, la sécurité, la résistance à la censure et la décentralisation.                                   | Les opérateurs centralisés de rollup (séquenceurs) peuvent influencer l'ordre des transactions.                                                                                     |
| La preuve de la fraude garantit une finalité sans faille et permet aux minorités honnêtes de sécuriser la chaîne.                                                                                      | S'il n'y a pas de nœuds honnêtes, un opérateur malveillant peut voler des fonds en postant des blocs et des engagements d'état invalides.                                           |
| Le calcul des preuves de fraude est ouvert au nœud L2 ordinaire, contrairement aux preuves de validité (utilisées dans les rollups ZK) qui nécessitent un matériel spécial.                            | Le modèle de sécurité repose sur au moins un nœud honnête exécutant des transactions de rollup et soumettant des preuves de fraude pour contester les transitions d'état invalides. |
| Les rollups bénéficient d'une « vivacité sans confiance » (n'importe qui peut forcer la chaîne à avancer en exécutant des transactions et en postant des assertions)                                   | Les utilisateurs doivent attendre l'expiration de la période de défi d'une semaine avant de retirer des fonds vers l'Ethereum.                                                      |
| Les rollups optimistes s'appuient sur des incitations cryptoéconomiques bien conçues pour accroître la sécurité sur la chaîne.                                                                         | Les rollups doivent enregistrer toutes les données de transaction sur la chaîne, ce qui peut augmenter les coûts.                                                                   |
| La compatibilité avec EVM et Solidity permet aux développeurs de porter les contrats intelligents natifs d'Ethereum vers les rollups ou d'utiliser les outils existants pour créer de nouvelles dApps. |                                                                                                                                                                                     |

### Une explication visuelle des rollups optimistes {#optimistic-video}

Davantage qu'un apprenant visuel ? Regardez Finematics expliquer les rollups optimistes :

<YouTube id="7pWxCklcNsU" start="263" />

## Autres lectures sur les rollups optimistes

- [Comment fonctionnent les rollups optimistes (Le guide complet)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Qu'est-ce qu'un rollup de blockchain ? Une introduction technique](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Le guide essentiel pour Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Comment fonctionne réellement le rollup d'Optimism ?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Qu’est-ce que la machine virtuelle optimiste ?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
