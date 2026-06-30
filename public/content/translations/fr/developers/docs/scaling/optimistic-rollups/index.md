---
title: Rollups optimistes
description: "Une introduction aux rollups optimistes, une solution de mise à l'échelle utilisée par la communauté Ethereum."
lang: fr
---

Les rollups optimistes sont des protocoles de couche 2 (l2) conçus pour augmenter le débit de la couche de base d'Ethereum. Ils réduisent les calculs sur la chaîne [Ethereum](/) principale en traitant les transactions hors chaîne, offrant ainsi des améliorations significatives des vitesses de traitement. Contrairement à d'autres solutions de mise à l'échelle, telles que les [chaînes latérales (sidechains)](/developers/docs/scaling/sidechains/), les rollups optimistes tirent leur sécurité du réseau principal en publiant les résultats des transactions onchain, ou les [chaînes Plasma](/developers/docs/scaling/plasma/), qui vérifient également les transactions sur Ethereum avec des preuves de fraude, mais stockent les données de transaction ailleurs.

Comme le calcul est la partie lente et coûteuse de l'utilisation d'Ethereum, les rollups optimistes peuvent offrir des améliorations de l'ordre de 10 à 100 fois en matière de mise à l'échelle. Les rollups optimistes écrivent également les transactions sur Ethereum sous forme de `calldata` ou dans des [blobs](/roadmap/danksharding/), réduisant ainsi les frais de gaz pour les utilisateurs.

## Prérequis {#prerequisites}

Vous devriez avoir lu et compris nos pages sur la [mise à l'échelle d'Ethereum](/developers/docs/scaling/) et la [couche 2](/layer-2/).

## Qu'est-ce qu'un rollup optimiste ? {#what-is-an-optimistic-rollup}

Un rollup optimiste est une approche de mise à l'échelle d'Ethereum qui implique de déplacer le calcul et le stockage de l'état hors chaîne. Les rollups optimistes exécutent les transactions en dehors d'Ethereum, mais publient les données de transaction sur le réseau principal sous forme de `calldata` ou dans des [blobs](/roadmap/danksharding/).

Les opérateurs de rollups optimistes regroupent plusieurs transactions hors chaîne en de grands lots avant de les soumettre à Ethereum. Cette approche permet de répartir les coûts fixes sur plusieurs transactions dans chaque lot, réduisant ainsi les frais pour les utilisateurs finaux. Les rollups optimistes utilisent également des techniques de compression pour réduire la quantité de données publiées sur Ethereum.

Les rollups optimistes sont considérés comme « optimistes » car ils supposent que les transactions hors chaîne sont valides et ne publient pas de preuves de validité pour les lots de transactions publiés onchain. Cela distingue les rollups optimistes des [rollups à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups) qui publient des [preuves de validité](/glossary/#validity-proof) cryptographiques pour les transactions hors chaîne.

Les rollups optimistes s'appuient plutôt sur un système de preuve de fraude pour détecter les cas où les transactions ne sont pas calculées correctement. Après la soumission d'un lot de rollup sur Ethereum, il y a une fenêtre de temps (appelée période de contestation) pendant laquelle n'importe qui peut contester les résultats d'une transaction de rollup en calculant une [preuve de fraude](/glossary/#fraud-proof).

Si la preuve de fraude réussit, le protocole de rollup réexécute la ou les transactions et met à jour l'état du rollup en conséquence. L'autre effet d'une preuve de fraude réussie est que le séquenceur responsable de l'inclusion de la transaction incorrectement exécutée dans un bloc subit une réduction (pénalité).

Si le lot de rollup n'est pas contesté (c'est-à-dire que toutes les transactions sont correctement exécutées) après l'écoulement de la période de contestation, il est jugé valide et accepté sur Ethereum. D'autres peuvent continuer à s'appuyer sur un bloc de rollup non confirmé, mais avec une mise en garde : les résultats des transactions seront annulés s'ils sont basés sur une transaction incorrectement exécutée publiée précédemment.

## Comment les rollups optimistes interagissent-ils avec Ethereum ? {#optimistic-rollups-and-ethereum}

Les rollups optimistes sont des [solutions de mise à l'échelle hors chaîne](/developers/docs/scaling/#offchain-scaling) conçues pour fonctionner au-dessus d'Ethereum. Chaque rollup optimiste est géré par un ensemble de contrats intelligents déployés sur le réseau Ethereum. Les rollups optimistes traitent les transactions en dehors de la chaîne principale Ethereum, mais publient les transactions hors chaîne (par lots) vers un contrat de rollup onchain. Tout comme la chaîne de blocs Ethereum, cet enregistrement de transactions est immuable et forme la « chaîne de rollup optimiste ».

L'architecture d'un rollup optimiste comprend les parties suivantes :

**Contrats onchain** : Le fonctionnement du rollup optimiste est contrôlé par des contrats intelligents s'exécutant sur Ethereum. Cela inclut les contrats qui stockent les blocs de rollup, surveillent les mises à jour d'état sur le rollup et suivent les dépôts des utilisateurs. En ce sens, Ethereum sert de couche de base ou « couche 1 » pour les rollups optimistes.

**Machine virtuelle (VM) hors chaîne** : Bien que les contrats gérant le protocole de rollup optimiste s'exécutent sur Ethereum, le protocole de rollup effectue les calculs et le stockage de l'état sur une autre machine virtuelle distincte de la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/). La VM hors chaîne est l'endroit où résident les applications et où les changements d'état sont exécutés ; elle sert de couche supérieure ou « couche 2 » pour un rollup optimiste.

Comme les rollups optimistes sont conçus pour exécuter des programmes écrits ou compilés pour l'EVM, la VM hors chaîne intègre de nombreuses spécifications de conception de l'EVM. De plus, les preuves de fraude calculées onchain permettent au réseau Ethereum d'appliquer la validité des changements d'état calculés dans la VM hors chaîne.

Les rollups optimistes sont décrits comme des « solutions de mise à l'échelle hybrides » car, bien qu'ils existent en tant que protocoles distincts, leurs propriétés de sécurité sont dérivées d'Ethereum. Entre autres choses, Ethereum garantit l'exactitude des calculs hors chaîne d'un rollup et la disponibilité des données derrière ces calculs. Cela rend les rollups optimistes plus sécurisés que les protocoles de mise à l'échelle purement hors chaîne (par ex., les [chaînes latérales](/developers/docs/scaling/sidechains/)) qui ne s'appuient pas sur Ethereum pour leur sécurité.

Les rollups optimistes s'appuient sur le protocole principal Ethereum pour les éléments suivants :

### Disponibilité des données {#data-availability}

Comme mentionné, les rollups optimistes publient les données de transaction sur Ethereum sous forme de `calldata` ou de [blobs](/roadmap/danksharding/). Étant donné que l'exécution de la chaîne de rollup est basée sur les transactions soumises, n'importe qui peut utiliser ces informations — ancrées sur la couche de base d'Ethereum — pour exécuter l'état du rollup et vérifier l'exactitude des transitions d'état.

La [disponibilité des données](/developers/docs/data-availability/) est essentielle car sans accès aux données d'état, les contestataires ne peuvent pas construire de preuves de fraude pour contester les opérations de rollup invalides. Avec Ethereum fournissant la disponibilité des données, le risque que les opérateurs de rollup s'en tirent avec des actes malveillants (par ex., soumettre des blocs invalides) est réduit.

### Résistance à la censure {#censorship-resistance}

Les rollups optimistes s'appuient également sur Ethereum pour la résistance à la censure. Dans un rollup optimiste, une entité centralisée (l'opérateur) est responsable du traitement des transactions et de la soumission des blocs de rollup à Ethereum. Cela a quelques implications :

- Les opérateurs de rollup peuvent censurer les utilisateurs en se déconnectant complètement, ou en refusant de produire des blocs qui incluent certaines transactions.

- Les opérateurs de rollup peuvent empêcher les utilisateurs de retirer les fonds déposés dans le contrat de rollup en retenant les données d'état nécessaires aux preuves de Merkle de propriété. La rétention des données d'état peut également dissimuler l'état du rollup aux utilisateurs et les empêcher d'interagir avec le rollup.

Les rollups optimistes résolvent ce problème en forçant les opérateurs à publier les données associées aux mises à jour d'état sur Ethereum. La publication des données de rollup onchain présente les avantages suivants :

- Si un opérateur de rollup optimiste se déconnecte ou cesse de produire des lots de transactions, un autre nœud peut utiliser les données disponibles pour reproduire le dernier état du rollup et poursuivre la production de blocs.

- Les utilisateurs peuvent utiliser les données de transaction pour créer des preuves de Merkle prouvant la propriété des fonds et retirer leurs actifs du rollup.

- Les utilisateurs peuvent également soumettre leurs transactions sur la l1 au lieu du séquenceur, auquel cas le séquenceur doit inclure la transaction dans un certain délai pour continuer à produire des blocs valides.

### Règlement {#settlement}

Un autre rôle qu'Ethereum joue dans le contexte des rollups optimistes est celui d'une couche de règlement. Une couche de règlement ancre l'ensemble de l'écosystème de la chaîne de blocs, établit la sécurité et fournit une finalité objective si un litige survient sur une autre chaîne (les rollups optimistes dans ce cas) nécessitant un arbitrage.

Le réseau principal Ethereum fournit un centre pour les rollups optimistes afin de vérifier les preuves de fraude et de résoudre les litiges. De plus, les transactions effectuées sur le rollup ne sont définitives qu'_après_ l'acceptation du bloc de rollup sur Ethereum. Une fois qu'une transaction de rollup est validée sur la couche de base d'Ethereum, elle ne peut pas être annulée (sauf dans le cas très improbable d'une réorganisation de la chaîne).

## Comment fonctionnent les rollups optimistes ? {#how-optimistic-rollups-work}

### Exécution et agrégation des transactions {#transaction-execution-and-aggregation}

Les utilisateurs soumettent des transactions aux « opérateurs », qui sont des nœuds responsables du traitement des transactions sur le rollup optimiste. Également connu sous le nom de « validateur » ou « agrégateur », l'opérateur agrège les transactions, compresse les données sous-jacentes et publie le bloc sur Ethereum.

Bien que n'importe qui puisse devenir un validateur, les validateurs de rollup optimiste doivent fournir une caution avant de produire des blocs, un peu comme un [système de preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/). Cette caution peut subir une réduction si le validateur publie un bloc invalide ou s'appuie sur un bloc ancien mais invalide (même si son bloc est valide). De cette façon, les rollups optimistes utilisent des incitations cryptoéconomiques pour s'assurer que les validateurs agissent honnêtement.

Les autres validateurs sur la chaîne de rollup optimiste sont censés exécuter les transactions soumises en utilisant leur copie de l'état du rollup. Si l'état final d'un validateur est différent de l'état proposé par l'opérateur, ils peuvent lancer une contestation et calculer une preuve de fraude.

Certains rollups optimistes peuvent renoncer à un système de validateurs sans permission et utiliser un seul « séquenceur » pour exécuter la chaîne. Comme un validateur, le séquenceur traite les transactions, produit des blocs de rollup et soumet les transactions de rollup à la chaîne l1 (Ethereum).

Le séquenceur est différent d'un opérateur de rollup classique car il a un plus grand contrôle sur l'ordre des transactions. De plus, le séquenceur a un accès prioritaire à la chaîne de rollup et est la seule entité autorisée à soumettre des transactions au contrat onchain. Les transactions provenant de nœuds non-séquenceurs ou d'utilisateurs réguliers sont simplement mises en file d'attente dans une boîte de réception séparée jusqu'à ce que le séquenceur les inclue dans un nouveau lot.

#### Soumission des blocs de rollup à Ethereum {#submitting-blocks-to-ethereum}

Comme mentionné, l'opérateur d'un rollup optimiste regroupe les transactions hors chaîne dans un lot et l'envoie à Ethereum pour notarisation. Ce processus implique la compression des données liées aux transactions et leur publication sur Ethereum sous forme de `calldata` ou dans des blobs.

`calldata` est une zone non modifiable et non persistante dans un contrat intelligent qui se comporte principalement comme la [mémoire](/developers/docs/smart-contracts/anatomy/#memory). Bien que `calldata` persiste onchain en tant que partie des [journaux d'historique](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la chaîne de blocs, il n'est pas stocké en tant que partie de l'état d'Ethereum. Parce que `calldata` ne touche aucune partie de l'état d'Ethereum, il est moins cher que l'état pour stocker des données onchain.

Le mot-clé `calldata` est également utilisé dans Solidity pour passer des arguments à une fonction de contrat intelligent au moment de l'exécution. `calldata` identifie la fonction appelée lors d'une transaction et contient les entrées de la fonction sous la forme d'une séquence arbitraire d'octets.

Dans le contexte des rollups optimistes, `calldata` est utilisé pour envoyer des données de transaction compressées au contrat onchain. L'opérateur de rollup ajoute un nouveau lot en appelant la fonction requise dans le contrat de rollup et en passant les données compressées comme arguments de fonction. L'utilisation de `calldata` réduit les frais des utilisateurs puisque la plupart des coûts supportés par les rollups proviennent du stockage des données onchain.

Voici [un exemple](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de soumission de lot de rollup pour montrer comment ce concept fonctionne. Le séquenceur a invoqué la méthode `appendSequencerBatch()` et a passé les données de transaction compressées comme entrées en utilisant `calldata`.

Certains rollups utilisent désormais des blobs pour publier des lots de transactions sur Ethereum.

Les blobs sont non modifiables et non persistants (tout comme `calldata`) mais sont élagués de l'historique après environ 18 jours. Pour plus d'informations sur les blobs, voir [danksharding](/roadmap/danksharding).

### Engagements d'état {#state-commitments}

À tout moment, l'état du rollup optimiste (comptes, soldes, code de contrat, etc.) est organisé sous forme d'un [arbre de Merkle](/whitepaper/#merkle-trees) appelé « arbre d'état ». La racine de cet arbre de Merkle (racine d'état), qui référence le dernier état du rollup, est hachée et stockée dans le contrat de rollup. Chaque transition d'état sur la chaîne produit un nouvel état de rollup, auquel un opérateur s'engage en calculant une nouvelle racine d'état.

L'opérateur est tenu de soumettre à la fois les anciennes racines d'état et les nouvelles racines d'état lors de la publication des lots. Si l'ancienne racine d'état correspond à la racine d'état existante dans le contrat onchain, cette dernière est supprimée et remplacée par la nouvelle racine d'état.

L'opérateur de rollup est également tenu de s'engager sur une racine de Merkle pour le lot de transactions lui-même. Cela permet à quiconque de prouver l'inclusion d'une transaction dans le lot (sur la l1) en présentant une [preuve de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Les engagements d'état, en particulier les racines d'état, sont nécessaires pour prouver l'exactitude des changements d'état dans un rollup optimiste. Le contrat de rollup accepte les nouvelles racines d'état des opérateurs immédiatement après leur publication, mais peut ultérieurement supprimer les racines d'état invalides pour restaurer le rollup à son état correct.

### Preuve de fraude {#fraud-proving}

Comme expliqué, les rollups optimistes permettent à quiconque de publier des blocs sans fournir de preuves de validité. Cependant, pour s'assurer que la chaîne reste sûre, les rollups optimistes spécifient une fenêtre de temps pendant laquelle quiconque peut contester une transition d'état. Par conséquent, les blocs de rollup sont appelés « assertions » puisque n'importe qui peut contester leur validité.

Si quelqu'un conteste une assertion, le protocole de rollup lancera le calcul de la preuve de fraude. Chaque type de preuve de fraude est interactif — quelqu'un doit publier une assertion avant qu'une autre personne ne puisse la contester. La différence réside dans le nombre de cycles d'interaction requis pour calculer la preuve de fraude.

Les schémas de preuve interactive à un seul cycle rejouent les transactions contestées sur la l1 pour détecter les assertions invalides. Le protocole de rollup émule la réexécution de la transaction contestée sur la l1 (Ethereum) à l'aide d'un contrat vérificateur, la racine d'état calculée déterminant qui remporte la contestation. Si la réclamation du contestataire concernant l'état correct du rollup est exacte, l'opérateur est pénalisé en subissant une réduction de sa caution.

Cependant, la réexécution des transactions sur la l1 pour détecter la fraude nécessite la publication d'engagements d'état pour les transactions individuelles et augmente les données que les rollups doivent publier onchain. Rejouer les transactions entraîne également des frais de gaz importants. Pour ces raisons, les rollups optimistes passent à la preuve interactive à cycles multiples, qui atteint le même objectif (c'est-à-dire détecter les opérations de rollup invalides) avec plus d'efficacité.

#### Preuve interactive à cycles multiples {#multi-round-interactive-proving}

La preuve interactive à cycles multiples implique un protocole d'échange entre l'auteur de l'assertion et le contestataire, supervisé par un contrat vérificateur l1, qui décide en fin de compte de la partie menteuse. Après qu'un nœud l2 a contesté une assertion, l'auteur de l'assertion est tenu de diviser l'assertion contestée en deux moitiés égales. Chaque assertion individuelle dans ce cas contiendra autant d'étapes de calcul que l'autre.

Le contestataire choisira ensuite l'assertion qu'il souhaite contester. Le processus de division (appelé « protocole de bissection ») se poursuit jusqu'à ce que les deux parties contestent une assertion concernant une _seule_ étape d'exécution. À ce stade, le contrat l1 résoudra le litige en évaluant l'instruction (et son résultat) pour attraper la partie frauduleuse.

L'auteur de l'assertion est tenu de fournir une « preuve en une étape » vérifiant la validité du calcul en une seule étape contesté. Si l'auteur de l'assertion ne parvient pas à fournir la preuve en une étape, ou si le vérificateur l1 juge la preuve invalide, il perd la contestation.

Quelques remarques sur ce type de preuve de fraude :

1. La preuve de fraude interactive à cycles multiples est considérée comme efficace car elle minimise le travail que la chaîne l1 doit effectuer dans l'arbitrage des litiges. Au lieu de rejouer l'intégralité de la transaction, la chaîne l1 n'a besoin de réexécuter qu'une seule étape de l'exécution du rollup.

2. Les protocoles de bissection réduisent la quantité de données publiées onchain (pas besoin de publier des engagements d'état pour chaque transaction). De plus, les transactions de rollup optimiste ne sont pas contraintes par la limite de gaz d'Ethereum. À l'inverse, les rollups optimistes réexécutant des transactions doivent s'assurer qu'une transaction l2 a une limite de gaz inférieure pour émuler son exécution au sein d'une seule transaction Ethereum.

3. Une partie de la caution de l'auteur malveillant de l'assertion est attribuée au contestataire, tandis que l'autre partie est brûlée. Le fait de brûler empêche la collusion entre les validateurs ; si deux validateurs s'entendent pour lancer de fausses contestations, ils perdront tout de même une part considérable de la mise totale.

4. La preuve interactive à cycles multiples exige que les deux parties (l'auteur de l'assertion et le contestataire) agissent dans la fenêtre de temps spécifiée. Le fait de ne pas agir avant l'expiration du délai entraîne la perte de la contestation pour la partie défaillante.

#### Pourquoi les preuves de fraude sont importantes pour les rollups optimistes {#fraud-proof-benefits}

Les preuves de fraude sont importantes car elles facilitent la _finalité sans tiers de confiance_ dans les rollups optimistes. La finalité sans tiers de confiance est une qualité des rollups optimistes qui garantit qu'une transaction — tant qu'elle est valide — finira par être confirmée.

Des nœuds malveillants peuvent essayer de retarder la confirmation d'un bloc de rollup valide en lançant de fausses contestations. Cependant, les preuves de fraude finiront par prouver la validité du bloc de rollup et entraîneront sa confirmation.

Cela est également lié à une autre propriété de sécurité des rollups optimistes : la validité de la chaîne repose sur l'existence d'_un seul_ nœud honnête. Le nœud honnête peut faire avancer la chaîne correctement en publiant des assertions valides ou en contestant des assertions invalides. Quoi qu'il en soit, les nœuds malveillants qui entrent en conflit avec le nœud honnête perdront leurs mises pendant le processus de preuve de fraude.

### Interopérabilité l1/l2 {#l1-l2-interoperability}

Les rollups optimistes sont conçus pour l'interopérabilité avec le réseau principal Ethereum et permettent aux utilisateurs de transmettre des messages et des données arbitraires entre la l1 et la l2. Ils sont également compatibles avec l'EVM, vous pouvez donc porter des [applications décentralisées (dapps)](/developers/docs/dapps/) existantes vers des rollups optimistes ou créer de nouvelles dapps en utilisant les outils de développement Ethereum.

#### 1. Mouvement des actifs {#asset-movement}

##### Entrer dans le rollup

Pour utiliser un rollup optimiste, les utilisateurs déposent des ETH, des jetons ERC-20 et d'autres actifs acceptés dans le contrat de [pont](/developers/docs/bridges/) du rollup sur la l1. Le contrat de pont relaiera la transaction vers la l2, où une quantité équivalente d'actifs est frappée et envoyée à l'adresse choisie par l'utilisateur sur le rollup optimiste.

Les transactions générées par les utilisateurs (comme un dépôt l1 > l2) sont généralement mises en file d'attente jusqu'à ce que le séquenceur les soumette à nouveau au contrat de rollup. Cependant, pour préserver la résistance à la censure, les rollups optimistes permettent aux utilisateurs de soumettre une transaction directement au contrat de rollup onchain si elle a été retardée au-delà du temps maximum autorisé.

Certains rollups optimistes adoptent une approche plus directe pour empêcher les séquenceurs de censurer les utilisateurs. Ici, un bloc est défini par toutes les transactions soumises au contrat l1 depuis le bloc précédent (par ex., les dépôts) en plus des transactions traitées sur la chaîne de rollup. Si un séquenceur ignore une transaction l1, il publiera une racine d'état (prouvablement) erronée ; par conséquent, les séquenceurs ne peuvent pas retarder les messages générés par les utilisateurs une fois publiés sur la l1.

##### Sortir du rollup

Le retrait d'un rollup optimiste vers Ethereum est plus difficile en raison du système de preuve de fraude. Si un utilisateur initie une transaction l2 > l1 pour retirer des fonds mis sous séquestre sur la l1, il doit attendre que la période de contestation — d'une durée d'environ sept jours — s'écoule. Néanmoins, le processus de retrait lui-même est assez simple.

Après l'initiation de la demande de retrait sur le rollup l2, la transaction est incluse dans le lot suivant, tandis que les actifs de l'utilisateur sur le rollup sont brûlés. Une fois le lot publié sur Ethereum, l'utilisateur peut calculer une preuve de Merkle vérifiant l'inclusion de sa transaction de sortie dans le bloc. Ensuite, il s'agit d'attendre la fin de la période de délai pour finaliser la transaction sur la l1 et retirer les fonds vers le réseau principal.

Pour éviter d'attendre une semaine avant de retirer des fonds vers Ethereum, les utilisateurs de rollup optimiste peuvent faire appel à un **fournisseur de liquidité** (LP). Un fournisseur de liquidité assume la propriété d'un retrait l2 en attente et paie l'utilisateur sur la l1 (en échange de frais).

Les fournisseurs de liquidité peuvent vérifier la validité de la demande de retrait de l'utilisateur (en exécutant eux-mêmes la chaîne) avant de libérer les fonds. De cette façon, ils ont l'assurance que la transaction sera finalement confirmée (c'est-à-dire une finalité sans tiers de confiance).

#### 2. Compatibilité EVM {#evm-compatibility}

Pour les développeurs, l'avantage des rollups optimistes est leur compatibilité — ou, mieux encore, leur équivalence — avec la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/). Les rollups compatibles EVM sont conformes aux spécifications du [livre jaune d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) et prennent en charge l'EVM au niveau du bytecode.

La compatibilité EVM dans les rollups optimistes présente les avantages suivants :

i. Les développeurs peuvent migrer les contrats intelligents existants sur Ethereum vers des chaînes de rollup optimiste sans avoir à modifier considérablement les bases de code. Cela peut faire gagner du temps aux équipes de développement lors du déploiement de contrats intelligents Ethereum sur la l2.

ii. Les développeurs et les équipes de projet utilisant des rollups optimistes peuvent tirer parti de l'infrastructure d'Ethereum. Cela inclut les langages de programmation, les bibliothèques de code, les outils de test, les logiciels clients, l'infrastructure de déploiement, etc.

L'utilisation d'outils existants est importante car ces outils ont été largement audités, débogués et améliorés au fil des ans. Cela évite également aux développeurs Ethereum d'avoir à apprendre à construire avec une pile de développement entièrement nouvelle.

#### 3. Appels de contrats inter-chaînes {#cross-chain-contract-calls}

Les utilisateurs (comptes détenus par des tiers) interagissent avec les contrats l2 en soumettant une transaction au contrat de rollup ou en demandant à un séquenceur ou à un validateur de le faire pour eux. Les rollups optimistes permettent également aux comptes de contrat sur Ethereum d'interagir avec les contrats l2 en utilisant des contrats de pontage pour relayer les messages et transmettre des données entre la l1 et la l2. Cela signifie que vous pouvez programmer un contrat l1 sur le réseau principal Ethereum pour invoquer des fonctions appartenant à des contrats sur un rollup optimiste l2.

Les appels de contrats inter-chaînes se produisent de manière asynchrone — ce qui signifie que l'appel est d'abord initié, puis exécuté ultérieurement. C'est différent des appels entre deux contrats sur Ethereum, où l'appel produit des résultats immédiatement.

Un exemple d'appel de contrat inter-chaîne est le dépôt de jetons décrit précédemment. Un contrat sur la l1 met sous séquestre les jetons de l'utilisateur et envoie un message à un contrat l2 apparié pour frapper une quantité égale de jetons sur le rollup.

Comme les appels de messages inter-chaînes entraînent l'exécution d'un contrat, l'expéditeur est généralement tenu de couvrir les [frais de gaz](/developers/docs/gas/) pour le calcul. Il est conseillé de définir une limite de gaz élevée pour éviter que la transaction n'échoue sur la chaîne cible. Le scénario de pontage de jetons est un bon exemple ; si le côté l1 de la transaction (dépôt des jetons) fonctionne, mais que le côté l2 (frappe de nouveaux jetons) échoue en raison d'un manque de gaz, le dépôt devient irrécupérable.

Enfin, nous devons noter que les appels de messages l2 > l1 entre les contrats doivent tenir compte des délais (les appels l1 > l2 sont généralement exécutés après quelques minutes). En effet, les messages envoyés au réseau principal depuis le rollup optimiste ne peuvent pas être exécutés tant que la fenêtre de contestation n'a pas expiré.

## Comment fonctionnent les frais des rollups optimistes ? {#how-do-optimistic-rollup-fees-work}

Les rollups optimistes utilisent un système de frais de gaz, un peu comme Ethereum, pour indiquer combien les utilisateurs paient par transaction. Les frais facturés sur les rollups optimistes dépendent des composants suivants :

1. **Écriture d'état** : Les rollups optimistes publient les données de transaction et les en-têtes de bloc (composés du hash de l'en-tête de bloc précédent, de la racine d'état, de la racine du lot) sur Ethereum sous forme de `blob`, ou « objet binaire volumineux » (binary large object). L'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) a introduit une solution rentable pour inclure des données onchain. Un `blob` est un nouveau champ de transaction qui permet aux rollups de publier des données de transition d'état compressées sur la l1 d'Ethereum. Contrairement à `calldata`, qui reste en permanence onchain, les blobs ont une courte durée de vie et peuvent être élagués des clients après [4096 époques](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (environ 18 jours). En utilisant des blobs pour publier des lots de transactions compressées, les rollups optimistes peuvent réduire considérablement le coût d'écriture des transactions sur la l1.

2. **Gaz de blob utilisé** : Les transactions transportant des blobs emploient un mécanisme de frais dynamiques similaire à celui introduit par l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Les frais de gaz pour les transactions de type 3 prennent en compte les frais de base pour les blobs, qui sont déterminés par le réseau en fonction de la demande d'espace de blob et de l'utilisation de l'espace de blob de la transaction envoyée.

3. **Frais d'opérateur l2** : Il s'agit du montant payé aux nœuds de rollup en compensation des coûts de calcul engagés dans le traitement des transactions, un peu comme les frais de gaz sur Ethereum. Les nœuds de rollup facturent des frais de transaction inférieurs car les l2 ont des capacités de traitement plus élevées et ne sont pas confrontées aux congestions du réseau qui forcent les validateurs sur Ethereum à prioriser les transactions avec des frais plus élevés.

Les rollups optimistes appliquent plusieurs mécanismes pour réduire les frais pour les utilisateurs, y compris le traitement par lots des transactions et la compression de `calldata` pour réduire les coûts de publication des données. Vous pouvez consulter le [suivi des frais l2](https://l2fees.info/) pour un aperçu en temps réel du coût d'utilisation des rollups optimistes basés sur Ethereum.

## Comment les rollups optimistes mettent-ils Ethereum à l'échelle ? {#scaling-ethereum-with-optimistic-rollups}

Comme expliqué, les rollups optimistes publient des données de transaction compressées sur Ethereum pour garantir la disponibilité des données. La capacité de compresser les données publiées onchain est cruciale pour augmenter le débit sur Ethereum avec les rollups optimistes.

La chaîne principale Ethereum impose des limites sur la quantité de données que les blocs peuvent contenir, libellées en unités de gaz (la [taille moyenne d'un bloc](/developers/docs/blocks/#block-size) est de 15 millions de gaz). Bien que cela restreigne la quantité de gaz que chaque transaction peut utiliser, cela signifie également que nous pouvons augmenter les transactions traitées par bloc en réduisant les données liées aux transactions — améliorant directement la mise à l'échelle.

Les rollups optimistes utilisent plusieurs techniques pour réaliser la compression des données de transaction et améliorer les taux de TPS. Par exemple, cet [article](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compare les données qu'une transaction utilisateur de base (envoi d'ether) génère sur le réseau principal par rapport à la quantité de données que la même transaction génère sur un rollup :

| Paramètre | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Prix du gaz | ~8                     | 0-0.5         |
| Gaz       | 3                      | 0-0.5         |
| À         | 21                     | 4             |
| Valeur    | 9                      | ~3            |
| Signature | ~68 (2 + 33 + 33)      | ~0.5          |
| De        | 0 (récupéré de la sig) | 4             |
| **Total** | **\~112 octets**        | **\~12 octets** |

1. La taille cible pour chaque bloc est de 15 millions de gaz et il en coûte 16 gaz pour vérifier un octet de données. Diviser la taille moyenne d'un bloc par 16 gaz (15 000 000/16) montre que le bloc moyen peut contenir **937 500 octets de données**.
2. Si une transaction de rollup de base utilise 12 octets, alors le bloc Ethereum moyen peut traiter **78 125 transactions de rollup** (937 500/12) ou **39 lots de rollup** (si chaque lot contient en moyenne 2 000 transactions).
3. Si un nouveau bloc est produit sur Ethereum toutes les 15 secondes, alors les vitesses de traitement du rollup s'élèveraient à environ **5 208 transactions par seconde**. Cela se fait en divisant le nombre de transactions de rollup de base qu'un bloc Ethereum peut contenir (**78 125**) par le temps de bloc moyen (**15 secondes**).

Il s'agit d'une estimation assez optimiste, étant donné que les transactions de rollup optimiste ne peuvent pas constituer un bloc entier sur Ethereum. Cependant, cela peut donner une idée approximative des gains de mise à l'échelle que les rollups optimistes peuvent offrir aux utilisateurs d'Ethereum (les implémentations actuelles offrent jusqu'à 2 000 TPS).

L'introduction du [partage de données (data sharding)](/roadmap/danksharding/) sur Ethereum devrait améliorer la mise à l'échelle des rollups optimistes. Étant donné que les transactions de rollup doivent partager l'espace de bloc avec d'autres transactions non-rollup, leur capacité de traitement est limitée par le débit de données sur la chaîne principale Ethereum. Le danksharding augmentera l'espace disponible pour les chaînes l2 afin de publier des données par bloc, en utilisant un stockage « blob » moins cher et non permanent au lieu de `CALLDATA` coûteux et permanent.

### Avantages et inconvénients des rollups optimistes {#optimistic-rollups-pros-and-cons}

| Avantages | Inconvénients |
| --------- | ------------- |
| Offre des améliorations massives de la mise à l'échelle sans sacrifier la sécurité ou l'absence de confiance requise. | Retards dans la finalité des transactions en raison de potentielles contestations pour fraude. |
| Les données de transaction sont stockées sur la chaîne de couche 1, améliorant la transparence, la sécurité, la résistance à la censure et la décentralisation. | Les opérateurs de rollup centralisés (séquenceurs) peuvent influencer l'ordre des transactions. |
| La preuve de fraude garantit une finalité sans tiers de confiance et permet aux minorités honnêtes de sécuriser la chaîne. | S'il n'y a pas de nœuds honnêtes, un opérateur malveillant peut voler des fonds en publiant des blocs et des engagements d'état invalides. |
| Le calcul des preuves de fraude est ouvert aux nœuds l2 réguliers, contrairement aux preuves de validité (utilisées dans les ZK-rollups) qui nécessitent un matériel spécial. | Le modèle de sécurité repose sur au moins un nœud honnête exécutant les transactions de rollup et soumettant des preuves de fraude pour contester les transitions d'état invalides. |
| Les rollups bénéficient d'une « vivacité sans tiers de confiance » (n'importe qui peut forcer la chaîne à avancer en exécutant des transactions et en publiant des assertions). | Les utilisateurs doivent attendre l'expiration de la période de contestation d'une semaine avant de retirer des fonds vers Ethereum. |
| Les rollups optimistes s'appuient sur des incitations cryptoéconomiques bien conçues pour accroître la sécurité sur la chaîne. | Les rollups doivent publier toutes les données de transaction onchain, ce qui peut augmenter les coûts. |
| La compatibilité avec l'EVM et Solidity permet aux développeurs de porter des contrats intelligents natifs d'Ethereum vers des rollups ou d'utiliser des outils existants pour créer de nouvelles dapps. | |

### Une explication visuelle des rollups optimistes {#optimistic-video}

Vous préférez un support visuel ? Regardez Finematics expliquer les rollups optimistes :

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Lectures complémentaires sur les rollups optimistes
- [Comment fonctionnent les rollups optimistes (Le guide complet)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Le guide essentiel d'Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Le guide pratique des rollups Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [L'état des preuves de fraude dans les l2 d'Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Comment fonctionne réellement le rollup d'Optimism ?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Exploration détaillée de l'OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Qu'est-ce que la machine virtuelle optimiste ?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
## Tutoriels : Rollups optimistes et ponts sur Ethereum {#tutorials}

- [Présentation du contrat de pont standard d'Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Une présentation annotée du code du pont standard d'Optimism pour déplacer des actifs entre la l1 et la l2._
