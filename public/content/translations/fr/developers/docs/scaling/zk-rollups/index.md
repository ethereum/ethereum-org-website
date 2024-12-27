---
title: Rollups Zero-knowledge (ZK)
description: Une introduction aux rollups zero-knowledge, une solution de mise à l'échelle utilisée par la Communauté Ethereum.
lang: fr
---

Les rollups zero-knowledge (ZK-rollups) sont [des solutions de mise à l'échelle](/developers/docs/scaling/) de couche 2 qui augmentent le débit sur le réseau principal Ethereum en déplaçant le calcul et le stockage d'état hors chaîne. Les rollups ZK peuvent traiter des milliers de transactions par lot, puis publier sur le réseau principal uniquement quelques données sommaires. Ces données sommaires définissent les modifications qui doivent être apportées à l'état Ethereum et certaines preuves cryptographiques que ces modifications sont correctes.

## Prérequis {#prerequisites}

Vous devez avoir lu et compris notre page sur [la mise à l'échelle d'Ethereum](/developers/docs/scaling/) et [la couche 2](/layer-2).

## Qu'est-ce que les rollups zero-knowledge ? {#what-are-zk-rollups}

**Les rollups à connaissance nulle (ZK-rollups)** regroupent (« roll up ») les transactions dans des lots qui sont exécutés hors chaîne. Le calcul hors chaîne réduit la quantité de données qui doivent être publiées dans la blockchain. Les opérateurs ZK-rollup soumettent un résumé des modifications requises pour représenter toutes les transactions dans un lot plutôt que d'envoyer chaque transaction individuellement. Ils produisent également [des preuves de validité](/glossary/#validity-proof) pour prouver la justesse de leurs modifications.

L'état du ZK-rollup est maintenu par un contrat intelligent déployé sur le réseau Ethereum. Pour mettre à jour cet état, les nœuds ZK-rollup doivent soumettre une preuve de validité pour vérification. Comme mentionné ci-dessus, la preuve de validité est l'assurance cryptographique que le changement d'état proposé par le rollup correspond au résultat de l'exécution du lot de transactions donné. Cela signifie que les ZK-rollups n'ont besoin que de fournir des preuves de validité pour finaliser les transactions sur Ethereum au lieu de poster toutes les données de transaction sur la chaîne comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/).

Le retrait de fonds d'un rollup ZK vers Ethereum se fait sans délai car les transactions de retraits sont exécutées une fois que le contrat de rollup ZK a vérifié la preuve de validité. À l'inverse, retirer des fonds depuis les rollups optimistes est sujet à un délai afin de permettre à quiconque de contester la transaction de sortie en produisant une [preuve de fraude](/glossary/#fraud-proof).

Les rollups ZK écrivent les transactions sur Ethereum comme `calldata`. `calldata` est l'endroit où sont stockées les données qui sont incluses dans les appels externes aux fonctions des contrats intelligents. Les informations contenues dans `calldata` sont publiées sur la blockchain, permettant à quiconque de reconstituer l'état du rollup de manière indépendante. Les rollups ZK utilisent des techniques de compression pour réduire les données de transaction. Par exemple, les comptes sont représentés par un index plutôt que par une adresse, ce qui permet d'économiser 28 octets de données. La publication des données sur la chaîne représente un coût important pour les rollups, la compression des données peut donc réduire les frais pour les utilisateurs.

## Comment les rollups ZK interagissent avec Ethereum ? {#zk-rollups-and-ethereum}

Un rollup ZK est un protocole hors chaîne qui fonctionne au dessus de la blockchain Ethereum et qui est géré par des contrats intelligents Ethereum en chaîne. Les rollups ZK exécutent des transactions en dehors du réseau principal, mais soumettent périodiquement des lots de transactions effectuées hors chaîne à un contrat « rollup » exécuté sur la chaîne. Cet enregistrement de transactions est immuable, tout comme la blockchain Ethereum, et forme la chaîne ZK-rollup.

L'architecture centrale du rollup ZK est composée des éléments suivants :

1. **Les contrats en chaîne** : Le fonctionnement des rollups ZK est contrôlé par des contrats intelligents s'exécutant sur Ethereum. Cela inclut le contrat principal qui stocke les blocs du rollup, suit les dépôts et surveille les mises à jour d'état. Un autre contrat publié sur la chaîne (le contrat vérifieur) vérifie les preuves de connaissance zéro soumises par les producteurs de blocs. Ainsi, Ethereum sert de couche de base ou de « couche 1 » aux rollups ZK.

2. **Machine virtuelle (VM) hors chaîne** : Alors que le protocole ZK-rollup vit sur Ethereum, l'exécution des transactions et le stockage des états se font sur une machine virtuelle distincte, indépendante de l'[EVM](/developers/docs/evm/). Cette VM hors chaîne est l'environnement d'exécution des transactions sur le rollup ZK et sert de couche secondaire ou de « couche 2 » pour le protocole ZK-rollup. Les preuves de validité vérifiées sur le réseau principal d'Ethereum garantissent l'exactitude des transitions d'état dans la VM hors chaîne.

Les rollups ZK sont des « solutions hybrides de mise à l'échelle », des protocoles hors chaîne qui fonctionnement indépendamment d'Ethereum tout en profitant de sa sécurité. Plus précisément, le réseau Ethereum assure la validité des mises à jour d'état sur le rollup ZK et garantit la disponibilité de données derrière chaque mise à jour de l'état du rollup. Par conséquent, les rollups ZK sont considérablement plus sûrs que les solutions de mise à l'échelle hors chaîne pures, telles que les [chaînes latérales](/developers/docs/scaling/sidechains/), qui sont responsables de leurs propriétés de sécurité, ou les [validiums](/developers/docs/scaling/validium/), qui vérifient également les transactions sur Ethereum avec des preuves de validité, mais stockent les données de transaction ailleurs.

Les rollups ZK s'appuient sur le protocole Ethereum principal pour les raisons suivantes :

### Disponibilité des données {#data-availability}

Les rollups ZK publient sur Ethereum les données d'état de chaque transaction traitée hors chaîne. Avec ces données, il est possible pour les particuliers ou les entreprises de reproduire l'état du rollup et de valider eux-mêmes la chaîne. Ethereum met ces données à la disposition de tous les participants du réseau en tant que `calldata`.

Les rollups ZK n'ont pas besoin de publier beaucoup de données de transaction sur la chaîne car les preuves de validité vérifient déjà l'authenticité des transitions d'état. Néanmoins, le stockage des données sur la chaîne reste important car il permet une vérification indépendante et sans autorisation de l'état de la chaîne L2, ce qui permet à quiconque de soumettre des lots de transactions, empêchant ainsi les opérateurs malveillants de censurer ou de geler la chaîne.

La présence d'une chaîne est nécessaire pour que les utilisateurs puissent interagir avec le rollup. Sans accès aux données de l'état, les utilisateurs ne peuvent pas consulter le solde de leur compte ou effectuer des transactions (par exemple, des retraits) qui dépendent des informations de l'état.

### Finalité de la transaction {#transaction-finality}

Ethereum agit comme une couche de règlement pour les rollups ZK : Les transactions L2 ne sont finalisées que si le contrat L1 accepte la preuve de validité. Cela élimine le risque que des opérateurs malveillants corrompent la chaîne (par exemple, en volant les fonds du rollup) puisque chaque transaction doit être approuvée sur le réseau principal. De plus, Ethereum garantit que les opérations des utilisateurs ne peuvent pas être inversées une fois finalisées sur la L1.

### Résistance à la censure {#censorship-resistance}

La plupart des rollups ZK utilisent un « supernoeud » (l'opérateur) pour exécuter des transactions, produire des lots et soumettre des blocs au L1. Bien que cette méthode soit gage d'efficacité, elle augmente le risque de censure : les opérateurs de rollups ZK malveillants peuvent censurer certains utilisateurs en refusant d'inclure leurs transactions dans des lots.

En tant que mesure de sécurité, les rollups ZK permettent aux utilisateurs de soumettre des transactions directement au contrat de rollup sur le réseau principal s'ils pensent être censurés par l'opérateur. Cela permet aux utilisateurs de forcer une sortie depuis le rollup ZK vers Ethereum sans avoir à se fier à l’autorisation de l’opérateur.

## Comment les rollups ZK fonctionnent-ils ? {#how-do-zk-rollups-work}

### Transactions {#transactions}

Les utilisateurs du rollup ZK signent les transactions et les soumettent aux opérateurs L2 pour traitement et inclusion dans le lot suivant. Dans certains cas, l'opérateur est une entité centralisée, appelée séquenceur, qui exécute les transactions, les regroupe en lots et les soumet à L1. Dans ce système, le séquenceur est la seule entité autorisée à produire des blocs L2 et à ajouter des transactions rollup au contrat ZK-rollup.

D'autres rollups ZK peuvent faire tourner le rôle d'opérateur en utilisant un ensemble de validateurs de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). Les opérateurs potentiels déposent des fonds dans le contrat de rollup, le montant de chaque mise influençant les chances de l'opérateur d'être sélectionné pour produire le prochain lot de rollup. La mise de l'opérateur peut être réduite s'il agit de manière malveillante, ce qui l'incite à poster des blocs valides.

#### Comment les rollups ZK publient les données de transaction sur Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Comme expliqué précédemment, les données de transaction sont publiées sur Ethereum en tant que `calldata`. `calldata` est une zone de données dans un contrat intelligent utilisée pour passer des arguments à une fonction et se comporte de manière similaire à [la mémoire](/developers/docs/smart-contracts/anatomy/#memory). Bien que les `calldata` ne soient pas stockées dans l'état d'Ethereum, elles persistent sur la chaîne dans le cadre des [journaux d'historique](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la chaîne Ethereum. `calldata` n'affecte pas l'état d'Ethereum, ce qui en fait un moyen bon marché de stocker des données sur la chaîne.

Le mot-clé `calldata` identifie souvent la méthode du contrat intelligent appelée par une transaction et contient les entrées de la méthode sous la forme d'une séquence arbitraire d'octets. Les rollups ZK utilisent `calldata` pour publier des données de transaction compressées sur la chaîne ; l'opérateur du rollup ajoute simplement un nouveau lot en appelant la fonction requise dans le contrat du rollup et passe les données compressées comme arguments de fonction. Cela permet de réduire les coûts pour les utilisateurs, car une grande partie des frais de rollup est consacrée au stockage des données de transaction sur la chaîne.

### Engagements d'état {#state-commitments}

L'état du rollup ZK, qui comprend les comptes et les soldes de L2, est représenté sous la forme d'un [arbre de Merkle](/whitepaper/#merkle-trees). Un hachage cryptographique de la racine de l'arbre de Merkle (Merkle root) est stocké dans le contrat on-chain, ce qui permet au protocole de rollup de suivre les changements d'état du rollup ZK.

Le rollup passe à un nouvel état après l'exécution d'un nouvel ensemble de transactions. L'opérateur qui a initié la transition d'état est tenu de calculer une nouvelle racine d'état et de la soumettre au contrat en chaîne. Si la preuve de validité associée au lot est authentifiée par le contrat du vérificateur, la nouvelle racine de Merkle devient la racine d'état canonique du rollup ZK.

Outre le calcul des racines d'état, l'opérateur rollup ZK crée également une racine de lot - la racine d'un arbre de Merkle comprenant toutes les transactions d'un lot. Lorsqu'un nouveau lot est soumis, le contrat de rollup stocke la racine du lot, ce qui permet aux utilisateurs de prouver qu'une transaction (par exemple, une demande de retrait) a été incluse dans le lot. Les utilisateurs devront fournir les détails de la transaction, la racine du lot et une [preuve de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) montrant le chemin d'inclusion.

### Preuves de validité {#validity-proofs}

La nouvelle racine d'état que l'opérateur du rollup ZK soumet au contrat L1 est le résultat des mises à jour de l'état du rollup. Si Alice envoie 10 jetons à Bob, l'opérateur diminue simplement le solde d'Alice de 10 et augmente le solde de Bob de 10. L'opérateur hache ensuite les données de compte mises à jour, reconstruit l'arbre de Merkle du rollup et soumet la nouvelle racine de Merkle au contrat en chaîne.

Mais le contrat du rollup n'acceptera pas automatiquement l'engagement d'état proposé tant que l'opérateur n'aura pas prouvé que la nouvelle racine de Merkle résulte de mises à jour correctes de l'état du rollup. Pour ce faire, l'opérateur ZK-rollup produit une preuve de validité, un engagement cryptographique succinct vérifiant l'exactitude des transactions par lots.

Les preuves de validité permettent aux parties de prouver l'exactitude d'une déclaration sans révéler la déclaration elle-même, c'est pourquoi elles sont également appelées preuves à connaissance zéro. Les rollups ZK utilisent des preuves de validité pour confirmer l'exactitude des transitions d'état hors chaîne sans avoir à réexécuter les transactions sur Ethereum. Ces preuves peuvent se présenter sous la forme d'un [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Les SNARK et les STARK permettent d'attester de l'intégrité du calcul hors chaîne dans les rollups ZK, bien que chaque type de preuve ait des caractéristiques distinctes.

**ZK-SNARK**

Pour que le protocole ZK-SNARK fonctionne, il est nécessaire de créer une chaîne de référence commune (CRS) : la CRS fournit des paramètres publics pour prouver et vérifier les preuves de validité. La sécurité du système de preuve dépend de la configuration du SRC ; si les informations utilisées pour créer les paramètres publics tombent en possession d'acteurs malveillants, ceux-ci peuvent être en mesure de générer de fausses preuves de validité.

Certains rollups ZK tentent de résoudre ce problème en utilisant une [cérémonie de calcul multipartite (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), impliquant des personnes de confiance, pour générer des paramètres publics pour le circuit ZK-SNARK. Chaque partie apporte un élément aléatoire (appelé « déchet toxique ») pour construire le CRS, qu'elle doit détruire immédiatement.

Les configurations de confiance sont utilisées car elles augmentent la sécurité de la configuration CRS. Tant qu'un participant honnête détruit son entrée, la sécurité du système ZK-SNARK est garantie. Néanmoins, cette approche nécessite de faire confiance aux personnes concernées pour supprimer leur caractère aléatoire échantillonné et ne pas compromettre les garanties de sécurité du système.

En dehors des hypothèses de confiance, les ZK-SNARK sont populaires pour leur petite taille de preuve et leur vérification en temps constant. Comme la vérification des preuves sur L1 constitue le coût le plus important de l'exploitation d'un rollup ZK, les L2 utilisent les ZK-SNARK pour générer des preuves qui peuvent être vérifiées rapidement et à moindre coût sur le réseau principal.

**ZK-STARK**

Comme les ZK-SNARK, les ZK-STARK prouvent la validité du calcul hors chaîne sans révéler les entrées. Cependant, les ZK-STARK sont considérés comme une amélioration des ZK-SNARK en raison de leur évolutivité et de leur transparence.

Les ZK-STARK sont « transparents », car ils peuvent fonctionner sans la mise en place fiable d'une chaîne de référence commune (CRS). Au lieu de cela, les ZK-STARK s'appuient sur un caractère aléatoire vérifiable publiquement pour définir les paramètres de génération et de vérification des preuves.

Les ZK-STARK offrent également une meilleure évolutivité car le temps nécessaire pour prouver et vérifier les preuves de validité augmente _quasi linéairement_ par rapport à la complexité du calcul sous-jacent. Avec les ZK-SNARK, les temps de preuve et de vérification évoluent _linéairement_ par rapport à la taille du calcul sous-jacent. Cela signifie que les ZK-STARK nécessitent moins de temps que les ZK-SNARK à des fins de preuve et de vérification lorsque de grands ensembles de données sont impliqués, ce qui les rend utiles pour les applications à fort volume.

Les ZK-STARK sont également protégés contre les ordinateurs quantiques, tandis que la cryptographie à courbe elliptique (ECC) utilisée dans les ZK-SNARK est largement considérée comme sensible aux attaques des ordinateurs quantiques. L'inconvénient des ZK-STARK est qu'ils produisent des preuves de plus grande taille, ce qui est plus coûteux à vérifier sur Ethereum.

#### Comment fonctionnent les preuves de validités dans les rollups ZK ? {#validity-proofs-in-zk-rollups}

##### Génération de la preuve

Avant d'accepter les transactions, l'opérateur effectuera les vérifications habituelles. Cela inclut les confirmations suivantes :

- Les comptes de l'émetteur et du récepteur font partie de l'arbre d'état.
- L'expéditeur dispose de suffisamment de fonds pour traiter la transaction.
- La transaction est correcte et correspond à la clé publique de l'expéditeur sur le rollup.
- Le nonce de l'expéditeur est correct, etc.

Une fois que le nœud ZK-rollup a suffisamment de transactions, il les agrège en un lot et compile les entrées pour que le circuit de preuve les compile en une preuve ZK succincte. Cela comprend :

- Un arbre de Merkle comprenant toutes les transactions du lot.
- Preuves de Merkle pour les transactions afin de prouver l'inclusion dans le lot.
- Preuves de Merkle pour chaque paire émetteur-récepteur dans les transactions afin de prouver que ces comptes font partie de l'arbre d'état du rollup.
- Un ensemble de racines d'état intermédiaires, dérivé de la mise à jour de la racine d'état après l'application des mises à jour d'état pour chaque transaction (c'est-à-dire, diminution des comptes de l'émetteur et augmentation des comptes du récepteur).

Le circuit de preuve calcule la preuve de validité en « bouclant » sur chaque transaction et en effectuant les mêmes contrôles que ceux effectués par l'opérateur avant de traiter la transaction. Tout d'abord, il vérifie que le compte de l'expéditeur fait partie de la racine de l'état existant en utilisant la preuve Merkle fournie. Ensuite, il réduit le solde de l'expéditeur, augmente son nonce, hache les données mises à jour du compte et les combine avec la preuve Merkle pour générer une nouvelle racine Merkle.

Cette racine de Merkle reflète le seul changement d'état du rollup ZK : un changement dans le solde et le nonce de l'expéditeur. Cela est possible car la preuve de Merkle utilisée pour prouver l'existence du compte est utilisée pour dériver la nouvelle racine d'état.

Le circuit de preuve effectue le même processus sur le compte du récepteur. Il vérifie si le compte du destinataire existe sous la racine de l'état intermédiaire (à l'aide de la preuve de Merkle), augmente son solde, ré-écrase les données du compte et les combine avec la preuve de Merkle pour générer une nouvelle racine d'état.

Le processus se répète pour chaque transaction ; chaque « boucle » crée une nouvelle racine d'état à partir de la mise à jour du compte de l'expéditeur et une nouvelle racine suivante à partir de la mise à jour du compte du destinataire. Comme expliqué, chaque mise à jour de la racine de l'état représente une partie de l'arbre d'état du rollup qui change.

Le circuit de vérification ZK itère sur l'ensemble du lot de transactions, vérifiant la séquence de mises à jour qui aboutit à une racine d'état final après l'exécution de la dernière transaction. La dernière racine de Merkle calculée devient la plus récente racine d'état canonique du rollup ZK.

##### Vérification de la preuve

Après que le circuit de preuve vérifie l'exactitude des mises à jour d'état, l'opérateur L2 soumet la preuve de validité calculée au contrat du vérificateur sur L1. Le circuit de vérification du contrat vérifie la validité de la preuve et vérifie également les entrées publiques qui font partie de la preuve :

- **Racine du pré-état** : La racine de l'ancien état du rollup ZK (c'est-à-dire avant l'exécution des transactions groupées), reflétant le dernier état valide connu de la chaîne L2.

- **Racine post-état** : La racine du nouvel état du rollup ZK (c'est-à-dire après l'exécution des transactions par lots), reflétant le tout nouvel état de la chaîne L2. La racine post-état est la racine finale dérivée après l'application des mises à jour d'état dans le circuit de preuve.

- **Racine du lot** : La racine Merkle du lot, dérivée en _merklizant_ les transactions du lot et en hachant la racine de l'arbre.

- **Entrées des transactions** : Données associées aux transactions exécutées dans le cadre du lot soumis.

Si la preuve satisfait le circuit (c'est-à-dire qu'elle est valide), cela signifie qu'il existe une séquence de transactions valides qui font passer le rollup de l'état précédent (empreintes cryptographiques de la racine du pré-état) à un nouvel état (empreintes cryptographiques de la racine du post-état). Si la racine pré-état correspond à la racine stockée dans le contrat de rollup, et que la preuve est valide, le contrat de rollup prend la racine post-état de la preuve et met à jour son arbre d'état pour refléter l'état modifié du rollup.

### Entrées et sorties {#entries-and-exits}

Les utilisateurs entrent dans le rollup ZK en déposant des jetons dans le contrat du rollup déployé sur la chaîne L1. Cette transaction est mise en file d'attente, car seuls les opérateurs peuvent soumettre des transactions au contrat rollup.

Une fois que la file d'attente des dépôts commence à se remplir, l'opérateur ZK-rollup prendra les transactions de dépôt et les soumettra au contrat de rollup. Une fois que les fonds de l'utilisateur sont dans le rollup, ils peuvent commencer à effectuer des transactions en les envoyant à l'opérateur pour traitement. Les utilisateurs peuvent vérifier les soldes sur le rollup en hachant les données de leur compte puis en envoyant le hachage au contrat rollup et en lui fournissant une preuve Merkle pour vérifier qu'elle correspond à l'état actuel de la racine de Merkle.

Retirer depuis un rollup ZK vers la L1 est simple. L'utilisateur initie la transaction de sortie en envoyant ses actifs sur le rollup vers un compte spécifié pour le brûlage. Si l'opérateur inclut la transaction dans le lot suivant, l'utilisateur peut soumettre une demande de retrait au contrat on-chain. Cette demande de retrait comprendra les éléments suivants :

- Preuve de Merkle prouvant l'inclusion de la transaction de l'utilisateur sur le compte brûlé dans un lot de transactions

- Données de transaction

- Racine du lot

- Adresse L1 pour recevoir les fonds déposés

Le contrat de rollup hache les données de la transaction, vérifie si la racine du lot existe, et utilise la preuve de Merkle pour vérifier si le hachage de la transaction fait partie de la racine du lot. Ensuite, le contrat exécute la transaction de sortie et envoie les fonds à l'adresse choisie par l'utilisateur sur L1.

## Les rollups ZK et la compatibilité avec la Machine Virtuelle Ethereum (EVM) {#zk-rollups-and-evm-compatibility}

Contrairement aux rollups optimistes, les rollups ZK ne sont pas facilement compatibles avec la [Machine virtuelle Ethereum (EVM)](/developers/docs/evm/). Prouver le calcul EVM général dans les circuits est plus difficile et nécessite plus de ressources que de prouver des calculs simples (comme le transfert de jetons décrit précédemment).

Cependant, [les progrès de la technologie de la connaissance zéro](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) suscitent un regain d'intérêt pour envelopper le calcul EVM dans des preuves de connaissance zéro. Ces efforts visent à créer une mise en œuvre de l'EVM à connaissance nulle (zkEVM) qui peut vérifier efficacement l'exactitude de l'exécution d'un programme. Un zkEVM recrée les codes d'opérations EVM existants pour les prouver/vérifier dans les circuits, ce qui permet d'exécuter des contrats intelligents.

Comme l'EVM, un zkEVM passe d'un état à l'autre après avoir effectué un calcul sur certaines entrées. La différence est que le zkEVM crée également des preuves de connaissance zéro pour vérifier l'exactitude de chaque étape de l'exécution du programme. Les preuves de validité pourraient vérifier l'exactitude des opérations qui touchent l'état de la VM (mémoire, pile, stockage) et le calcul lui-même (c'est-à-dire que l'opération a appelé les bons codes d'opérations et les a exécutés correctement).

L'introduction des rollups ZK compatibles avec l'EVM devrait aider les développeurs à tirer parti de l'évolutivité et des garanties de sécurité des preuves à connaissance zéro. Plus important encore, la compatibilité avec l'infrastructure Ethereum native signifie que les développeurs peuvent créer des dApps adaptées à ZK en utilisant des outils et des langages familiers (et éprouvés).

## Comment fonctionnent les frais des rollups ZK ? {#how-do-zk-rollup-fees-work}

Le montant que les utilisateurs paient pour les transactions sur les rollups ZK dépend des frais de gaz, tout comme sur le réseau principal Ethereum. Cependant, les frais de gaz fonctionnent différemment sur les couches de second niveau et sont influencés par les coûts suivants :

1. **Écriture d'état** : Il y a un coût fixe pour écrire dans l'état d'Ethereum (c'est-à-dire, soumettre une transaction sur la blockchain d'Ethereum). Les rollups ZK réduisent ce coût en regroupant les transactions et en répartissant les coûts fixes entre plusieurs utilisateurs.

2. **Data publication** : Les rollups ZK publient les données d'état de chaque transaction vers Ethereum en tant que `calldata`. Les coûts des `calldata` sont actuellement régis par le [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), qui prévoit un coût de 16 gaz pour les octets non nuls et de 4 gaz pour les octets nuls de `calldata`, respectivement. Le coût payé pour chaque transaction est influencé par la quantité de `calldata` qui doit être publiée sur la chaîne à cet effet.

3. **Frais d'opérateur L2**: Il s'agit du montant payé à l'opérateur du rollup en compensation des coûts de calcul engagés lors du traitement des transactions, un peu comme les [ frais de transaction prioritaire (pourboires)"](/developers/docs/gas/#how-are-gas-fees-calculated) sur le réseau principal d'Ethereum.

4. **Génération et vérification des preuves** : Les opérateurs de rollup ZK doivent produire des preuves de validité pour les lots de transactions, ce qui est gourmand en ressources. La vérification des preuves à connaissance zéro sur le réseau principal coûte également du gaz (~ 500 000 gaz).

En plus des transactions par lots, les rollups ZK réduisent les frais des utilisateurs en compressant les données de transaction. Vous pouvez [voir un aperçu en temps réel](https://l2fees.info/) du coût d'utilisation des rollups ZK Ethereum.

## Comment les rollups ZK font-ils évoluer Ethereum ? {#scaling-ethereum-with-zk-rollups}

### Compression des données de transaction {#transaction-data-compression}

Les rollups ZK augmentent le débit de la couche de base d'Ethereum en transférant les calculs hors de la chaîne, mais le véritable coup de pouce pour la mise à l'échelle provient de la compression des données de transaction. La [taille des blocs](/developers/docs/blocks/#block-size) d'Ethereum limite les données que chaque bloc peut contenir et, par extension, le nombre de transactions traitées par bloc. En compressant les données liées aux transactions, les rollups ZK augmentent considérablement le nombre de transactions traitées par bloc.

Les rollups ZK peuvent mieux comprimer les données de transaction que les rollups optimistes puisqu'ils n'ont pas besoin d'enregistrer toutes les données nécessaires pour valider chaque transaction. Ils ne doivent comptabiliser que les données minimales requises pour reconstruire le dernier état des comptes et des soldes sur le rollup.

### Preuves récursives {#recursive-proofs}

Un avantage des preuves à connaissance zéro est que les preuves peuvent vérifier d'autres preuves. Par exemple, un seul ZK-SNARK peut vérifier d'autres ZK-SNARK. De telles « preuves de preuves » sont appelées preuves récursives et augmentent considérablement le débit sur les rollups ZK.

Actuellement, les preuves de validité sont générées bloc par bloc et soumises au contrat L1 pour vérification. Cependant, la vérification des preuves d'un seul bloc limite le débit que les rollups ZK peuvent atteindre puisque seul un bloc peut être finalisé lorsque l'opérateur soumet une preuve.

Les preuves récursives, cependant, permettent de finaliser plusieurs blocs avec une seule preuve de validité. En effet, le circuit de preuve agrège récursivement plusieurs preuves par blocs jusqu'à ce qu'une preuve finale soit créée. L'opérateur L2 soumet cette preuve récursive, et si le contrat l'accepte, tous les blocs concernés seront finalisés instantanément. Avec les preuves récursives, le nombre de transactions rollup ZK qui peuvent être finalisées sur Ethereum à intervalles augmente.

### Avantages et inconvénients des rollups ZK {#zk-rollups-pros-and-cons}

| Avantages                                                                                                                                                                                                                          | Inconvénients                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les preuves de validité garantissent l'exactitude des transactions hors chaîne et empêchent les opérateurs d'exécuter des transitions d'état invalides.                                                                            | Le coût associé au calcul et à la vérification des preuves de validité est substantiel et peut augmenter les frais pour les utilisateurs de rollup.                                                                             |
| Offre une finalité de transaction plus rapide car les mises à jour d'état sont approuvées une fois que les preuves de validité sont vérifiées sur L1.                                                                              | La construction de rollups ZK compatibles avec l'EVM est difficile en raison de la complexité de la technologie de la connaissance zéro.                                                                                        |
| S'appuie sur des mécanismes cryptographiques sans confiance pour la sécurité, et non sur l'honnêteté d'acteurs incités comme avec [les rollups optimistes](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | La production de preuves de validité nécessite un matériel spécialisé, ce qui pourrait générer une centralisation de la chaîne aux mains de quelques acteurs.                                                                   |
| Stocke les données nécessaires pour récupérer l'état hors chaîne sur L1, ce qui garantit la sécurité, la résistance à la censure et la décentralisation.                                                                           | Les opérateurs centralisés (séquenceurs) peuvent influencer l'ordre des transactions.                                                                                                                                           |
| Les utilisateurs bénéficient d'une plus grande efficacité du capital et peuvent retirer des fonds de L2 sans délai.                                                                                                                | Les exigences matérielles peuvent réduire le nombre de participants qui peuvent forcer la chaîne à progresser, ce qui augmente le risque que des opérateurs malveillants gèlent l'état du rollup et censurent les utilisateurs. |
| Ne dépend pas des hypothèses de vivacité et les utilisateurs n'ont pas à valider la chaîne pour protéger leurs fonds.                                                                                                              | Certains systèmes de preuve (par exemple, ZK-SNARK) nécessitent une installation de confiance qui, si elle est mal gérée, pourrait potentiellement compromettre le modèle de sécurité d'un rollup ZK.                           |
| Une meilleure compression des données peut contribuer à réduire les coûts de publication des `calldata` sur Ethereum et à minimiser les frais de rollup pour les utilisateurs.                                                     |                                                                                                                                                                                                                                 |

### Les rollups ZK en images {#zk-video}

Regardez la vidéo de Finematics qui explique les rollups ZK :

<YouTube id="7pWxCklcNsU" start="406" />

## Qui travaille sur une zkEVM ? {#zkevm-projects}

Les projets fonctionnant sur les zkEVM comprennent :

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM est un projet financé par la Fondation Ethereum pour développer un ZK-rollup compatible EVM et un mécanisme destiné à générer des preuves de validité pour les blocs Ethereum._

- **[Polygon Hermez](https://polygon.technology/solutions/polygon-zkevm)** - _Hermez est un rollup ZK décentralisé sur le réseau principal Ethereum travaillant sur une machine virtuelle Ethereum à connaissance nulle (zkEVM) qui exécute les transactions Ethereum de manière transparente, y compris les contrats intelligents avec des validations de preuve à connaissance nulle._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll est une entreprise axée sur la technologie travaillant à la création d'une solution native zkEVM de couche 2 pour Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko est un ZK-rollup décentralisé, équivalent à Ethereum (un [Type 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _Zksync Era est un ZK rollup compatible avec l'EVM développé par Matter Labs, propulsé par son propre zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet est une solution de mise à l'échelle de la couche 2 compatible avec l'EVM, conçue par StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph est une solution hybride de mise à l'échelle des rollups qui utilise la preuve zk pour résoudre le problème de l'état de la couche 2._

## Lecture supplémentaire sur les rollups ZK {#further-reading-on-zk-rollups}

- [Qu'est-ce que les Rollups Zero Knowledge ?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Qu'est-ce que les rollups zero-knowledge ?](https://alchemy.com/blog/zero-knowledge-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Qu'est-ce qu'un zkEVM ?](https://www.alchemy.com/overviews/zkevm)
- [Types de ZK-EVM : Équivalent Ethereum, équivalent EVM, Type 1, Type 4, et autres termes tendance en crypto](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introduction au zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Ressources géniales pour zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [Les dessous de ZK-SNARKS](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Comment les SNARK sont-ils possibles ?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
