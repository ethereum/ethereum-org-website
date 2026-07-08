---
title: "Rollups à divulgation nulle de connaissance"
description: "Une introduction aux rollups à divulgation nulle de connaissance, une solution de mise à l'échelle utilisée par la communauté Ethereum."
lang: fr
---

Les rollups à divulgation nulle de connaissance (ZK-rollups) sont des [solutions de mise à l'échelle](/developers/docs/scaling/) de couche 2 (l2) qui augmentent le débit sur le [réseau principal Ethereum](/) en déplaçant le calcul et le stockage d'état hors chaîne. Les ZK-rollups peuvent traiter des milliers de transactions dans un lot, puis ne publier que des données de résumé minimales sur le réseau principal. Ces données de résumé définissent les modifications qui doivent être apportées à l'état d'Ethereum et une preuve cryptographique que ces modifications sont correctes.

## Prérequis {#prerequisites}

Vous devriez avoir lu et compris notre page sur la [mise à l'échelle d'Ethereum](/developers/docs/scaling/) et la [couche 2 (l2)](/layer-2).

## Que sont les rollups à divulgation nulle de connaissance ? {#what-are-zk-rollups}

Les **rollups à divulgation nulle de connaissance (ZK-rollups)** regroupent (ou « enroulent ») les transactions en lots qui sont exécutés hors chaîne. Le calcul hors chaîne réduit la quantité de données qui doit être publiée sur la chaîne de blocs. Les opérateurs de ZK-rollup soumettent un résumé des modifications requises pour représenter toutes les transactions d'un lot plutôt que d'envoyer chaque transaction individuellement. Ils produisent également des [preuves de validité](/glossary/#validity-proof) pour prouver l'exactitude de leurs modifications.

L'état du ZK-rollup est maintenu par un contrat intelligent déployé sur le réseau Ethereum. Pour mettre à jour cet état, les nœuds du ZK-rollup doivent soumettre une preuve de validité pour vérification. Comme mentionné, la preuve de validité est une assurance cryptographique que le changement d'état proposé par le rollup est réellement le résultat de l'exécution du lot de transactions donné. Cela signifie que les ZK-rollups n'ont besoin de fournir que des preuves de validité pour finaliser les transactions sur Ethereum au lieu de publier toutes les données de transaction onchain comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/).

Il n'y a aucun délai lors du déplacement de fonds d'un ZK-rollup vers Ethereum car les transactions de sortie sont exécutées une fois que le contrat du ZK-rollup vérifie la preuve de validité. À l'inverse, le retrait de fonds des rollups optimistes est soumis à un délai pour permettre à quiconque de contester la transaction de sortie avec une [preuve de fraude](/glossary/#fraud-proof).

Les ZK-rollups écrivent les transactions sur Ethereum en tant que `calldata`. `calldata` est l'endroit où les données incluses dans les appels externes aux fonctions de contrat intelligent sont stockées. Les informations dans `calldata` sont publiées sur la chaîne de blocs, permettant à quiconque de reconstruire l'état du rollup de manière indépendante. Les ZK-rollups utilisent des techniques de compression pour réduire les données de transaction — par exemple, les comptes sont représentés par un indice plutôt que par une adresse, ce qui permet d'économiser 28 octets de données. La publication de données onchain représente un coût important pour les rollups, la compression des données peut donc réduire les frais pour les utilisateurs.

## Comment les ZK-rollups interagissent-ils avec Ethereum ? {#zk-rollups-and-ethereum}

Une chaîne ZK-rollup est un protocole hors chaîne qui fonctionne au-dessus de la chaîne de blocs Ethereum et est géré par des contrats intelligents Ethereum onchain. Les ZK-rollups exécutent les transactions en dehors du réseau principal, mais soumettent périodiquement des lots de transactions hors chaîne à un contrat de rollup onchain. Cet enregistrement de transaction est immuable, tout comme la chaîne de blocs Ethereum, et forme la chaîne ZK-rollup.

L'architecture de base du ZK-rollup est composée des éléments suivants :

1. **Contrats onchain** : Comme mentionné, le protocole ZK-rollup est contrôlé par des contrats intelligents s'exécutant sur Ethereum. Cela inclut le contrat principal qui stocke les blocs du rollup, suit les dépôts et surveille les mises à jour d'état. Un autre contrat onchain (le contrat vérificateur) vérifie les preuves à divulgation nulle de connaissance soumises par les producteurs de blocs. Ainsi, Ethereum sert de couche de base ou « couche 1 (l1) » pour le ZK-rollup.

2. **Machine virtuelle (VM) hors chaîne** : Bien que le protocole ZK-rollup réside sur Ethereum, l'exécution des transactions et le stockage de l'état se produisent sur une machine virtuelle distincte, indépendante de l'[EVM](/developers/docs/evm/). Cette VM hors chaîne est l'environnement d'exécution des transactions sur le ZK-rollup et sert de couche secondaire ou « couche 2 (l2) » pour le protocole ZK-rollup. Les preuves de validité vérifiées sur le réseau principal Ethereum garantissent l'exactitude des transitions d'état dans la VM hors chaîne.

Les ZK-rollups sont des « solutions de mise à l'échelle hybrides » — des protocoles hors chaîne qui fonctionnent indépendamment mais tirent leur sécurité d'Ethereum. Plus précisément, le réseau Ethereum applique la validité des mises à jour d'état sur le ZK-rollup et garantit la disponibilité des données derrière chaque mise à jour de l'état du rollup. En conséquence, les ZK-rollups sont considérablement plus sûrs que les solutions de mise à l'échelle purement hors chaîne, telles que les [chaînes latérales (sidechains)](/developers/docs/scaling/sidechains/), qui sont responsables de leurs propres propriétés de sécurité, ou les [validiums](/developers/docs/scaling/validium/), qui vérifient également les transactions sur Ethereum avec des preuves de validité, mais stockent les données de transaction ailleurs.

Les ZK-rollups s'appuient sur le protocole Ethereum principal pour les éléments suivants :

### Disponibilité des données {#data-availability}

Les ZK-rollups publient les données d'état pour chaque transaction traitée hors chaîne sur Ethereum. Avec ces données, il est possible pour les individus ou les entreprises de reproduire l'état du rollup et de valider la chaîne eux-mêmes. Ethereum met ces données à la disposition de tous les participants du réseau sous forme de `calldata`.

Les ZK-rollups n'ont pas besoin de publier beaucoup de données de transaction onchain car les preuves de validité vérifient déjà l'authenticité des transitions d'état. Néanmoins, le stockage des données onchain reste important car il permet une vérification indépendante et sans permission de l'état de la chaîne L2, ce qui permet à quiconque de soumettre des lots de transactions, empêchant les opérateurs malveillants de censurer ou de geler la chaîne.

Les données onchain sont requises pour que les utilisateurs interagissent avec le rollup. Sans accès aux données d'état, les utilisateurs ne peuvent pas interroger le solde de leur compte ou initier des transactions (par exemple, des retraits) qui dépendent des informations d'état.

### Finalité des transactions {#transaction-finality}

Ethereum agit comme une couche de règlement pour les ZK-rollups : les transactions L2 sont finalisées uniquement si le contrat L1 accepte la preuve de validité. Cela élimine le risque que des opérateurs malveillants corrompent la chaîne (par exemple, en volant les fonds du rollup) puisque chaque transaction doit être approuvée sur le réseau principal. De plus, Ethereum garantit que les opérations des utilisateurs ne peuvent pas être annulées une fois finalisées sur L1.

### Résistance à la censure {#censorship-resistance}

La plupart des ZK-rollups utilisent un « supernœud » (l'opérateur) pour exécuter les transactions, produire des lots et soumettre des blocs à L1. Bien que cela garantisse l'efficacité, cela augmente le risque de censure : les opérateurs de ZK-rollup malveillants peuvent censurer les utilisateurs en refusant d'inclure leurs transactions dans les lots.

Par mesure de sécurité, les ZK-rollups permettent aux utilisateurs de soumettre des transactions directement au contrat de rollup sur le réseau principal s'ils pensent être censurés par l'opérateur. Cela permet aux utilisateurs de forcer une sortie du ZK-rollup vers Ethereum sans avoir à dépendre de la permission de l'opérateur.

## Comment fonctionnent les ZK-rollups ? {#how-do-zk-rollups-work}

### Transactions {#transactions}

Les utilisateurs du ZK-rollup signent les transactions et les soumettent aux opérateurs L2 pour traitement et inclusion dans le prochain lot. Dans certains cas, l'opérateur est une entité centralisée, appelée séquenceur, qui exécute les transactions, les agrège en lots et les soumet à L1. Le séquenceur dans ce système est la seule entité autorisée à produire des blocs L2 et à ajouter des transactions de rollup au contrat ZK-rollup.

D'autres ZK-rollups peuvent faire tourner le rôle d'opérateur en utilisant un ensemble de validateurs de [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/). Les opérateurs potentiels déposent des fonds dans le contrat de rollup, la taille de chaque mise influençant les chances du staker d'être sélectionné pour produire le prochain lot de rollup. La mise de l'opérateur peut subir une réduction s'il agit de manière malveillante, ce qui l'incite à publier des blocs valides.

#### Comment les ZK-rollups publient les données de transaction sur Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Comme expliqué, les données de transaction sont publiées sur Ethereum sous forme de `calldata`. `calldata` est une zone de données dans un contrat intelligent utilisée pour passer des arguments à une fonction et se comporte de manière similaire à la [mémoire](/developers/docs/smart-contracts/anatomy/#memory). Bien que `calldata` ne soit pas stocké dans le cadre de l'état d'Ethereum, il persiste onchain dans le cadre des [journaux d'historique](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la chaîne Ethereum. `calldata` n'affecte pas l'état d'Ethereum, ce qui en fait un moyen peu coûteux de stocker des données onchain.

Le mot-clé `calldata` identifie souvent la méthode de contrat intelligent appelée par une transaction et contient les entrées de la méthode sous la forme d'une séquence arbitraire d'octets. Les ZK-rollups utilisent `calldata` pour publier des données de transaction compressées onchain ; l'opérateur de rollup ajoute simplement un nouveau lot en appelant la fonction requise dans le contrat de rollup et passe les données compressées comme arguments de fonction. Cela aide à réduire les coûts pour les utilisateurs puisqu'une grande partie des frais de rollup est consacrée au stockage des données de transaction onchain.

### Engagements d'état {#state-commitments}

L'état du ZK-rollup, qui inclut les comptes et les soldes L2, est représenté sous la forme d'un [arbre de Merkle](/whitepaper/#merkle-trees). Un hash cryptographique de la racine de l'arbre de Merkle (racine de Merkle) est stocké dans le contrat onchain, permettant au protocole de rollup de suivre les modifications de l'état du ZK-rollup.

Le rollup passe à un nouvel état après l'exécution d'un nouvel ensemble de transactions. L'opérateur qui a initié la transition d'état est tenu de calculer une nouvelle racine d'état et de la soumettre au contrat onchain. Si la preuve de validité associée au lot est authentifiée par le contrat vérificateur, la nouvelle racine de Merkle devient la racine d'état canonique du ZK-rollup.

Outre le calcul des racines d'état, l'opérateur de ZK-rollup crée également une racine de lot — la racine d'un arbre de Merkle comprenant toutes les transactions d'un lot. Lorsqu'un nouveau lot est soumis, le contrat de rollup stocke la racine du lot, permettant aux utilisateurs de prouver qu'une transaction (par exemple, une demande de retrait) a été incluse dans le lot. Les utilisateurs devront fournir les détails de la transaction, la racine du lot et une [preuve de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) montrant le chemin d'inclusion.

### Preuves de validité {#validity-proofs}

La nouvelle racine d'état que l'opérateur de ZK-rollup soumet au contrat L1 est le résultat des mises à jour de l'état du rollup. Supposons qu'Alice envoie 10 jetons à Bob, l'opérateur diminue simplement le solde d'Alice de 10 et incrémente le solde de Bob de 10. L'opérateur hache ensuite les données de compte mises à jour, reconstruit l'arbre de Merkle du rollup et soumet la nouvelle racine de Merkle au contrat onchain.

Mais le contrat de rollup n'acceptera pas automatiquement l'engagement d'état proposé tant que l'opérateur n'aura pas prouvé que la nouvelle racine de Merkle résulte de mises à jour correctes de l'état du rollup. L'opérateur de ZK-rollup le fait en produisant une preuve de validité, un engagement cryptographique succinct vérifiant l'exactitude des transactions traitées par lots.

Les preuves de validité permettent aux parties de prouver l'exactitude d'une déclaration sans révéler la déclaration elle-même — c'est pourquoi elles sont également appelées preuves à divulgation nulle de connaissance. Les ZK-rollups utilisent des preuves de validité pour confirmer l'exactitude des transitions d'état hors chaîne sans avoir à réexécuter les transactions sur Ethereum. Ces preuves peuvent prendre la forme d'un [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou d'un [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Les SNARKs et les STARKs aident tous deux à attester de l'intégrité du calcul hors chaîne dans les ZK-rollups, bien que chaque type de preuve ait des caractéristiques distinctives.

**ZK-SNARKs**

Pour que le protocole ZK-SNARK fonctionne, la création d'une chaîne de référence commune (CRS) est nécessaire : la CRS fournit des paramètres publics pour prouver et vérifier les preuves de validité. La sécurité du système de preuve dépend de la configuration de la CRS ; si les informations utilisées pour créer des paramètres publics tombent en possession d'acteurs malveillants, ils pourraient être en mesure de générer de fausses preuves de validité.

Certains ZK-rollups tentent de résoudre ce problème en utilisant une [cérémonie de calcul multipartite (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), impliquant des individus de confiance, pour générer des paramètres publics pour le circuit ZK-SNARK. Chaque partie contribue avec un certain caractère aléatoire (appelé « déchet toxique ») pour construire la CRS, qu'elle doit détruire immédiatement.

Les configurations de confiance sont utilisées car elles augmentent la sécurité de la configuration de la CRS. Tant qu'un participant honnête détruit son entrée, la sécurité du système ZK-SNARK est garantie. Néanmoins, cette approche nécessite de faire confiance aux personnes impliquées pour supprimer leur caractère aléatoire échantillonné et ne pas compromettre les garanties de sécurité du système.

Mis à part les hypothèses de confiance, les ZK-SNARKs sont populaires pour la petite taille de leurs preuves et leur vérification en temps constant. Comme la vérification des preuves sur L1 constitue le coût le plus important de l'exploitation d'un ZK-rollup, les L2 utilisent des ZK-SNARKs pour générer des preuves qui peuvent être vérifiées rapidement et à moindre coût sur le réseau principal.

**ZK-STARKs**

Comme les ZK-SNARKs, les ZK-STARKs prouvent la validité du calcul hors chaîne sans révéler les entrées. Cependant, les ZK-STARKs sont considérés comme une amélioration par rapport aux ZK-SNARKs en raison de leur évolutivité et de leur transparence.

Les ZK-STARKs sont « transparents », car ils peuvent fonctionner sans la configuration de confiance d'une chaîne de référence commune (CRS). Au lieu de cela, les ZK-STARKs s'appuient sur un caractère aléatoire publiquement vérifiable pour configurer les paramètres de génération et de vérification des preuves.

Les ZK-STARKs offrent également plus d'évolutivité car le temps nécessaire pour prouver et vérifier les preuves de validité augmente _de manière quasi-linéaire_ par rapport à la complexité du calcul sous-jacent. Avec les ZK-SNARKs, les temps de preuve et de vérification évoluent _linéairement_ par rapport à la taille du calcul sous-jacent. Cela signifie que les ZK-STARKs nécessitent moins de temps que les ZK-SNARKs pour la preuve et la vérification lorsque de grands ensembles de données sont impliqués, ce qui les rend utiles pour les applications à volume élevé.

Les ZK-STARKs sont également sécurisés contre les ordinateurs quantiques, tandis que la cryptographie sur courbe elliptique (ECC) utilisée dans les ZK-SNARKs est largement considérée comme vulnérable aux attaques informatiques quantiques. L'inconvénient des ZK-STARKs est qu'ils produisent des tailles de preuve plus importantes, qui sont plus coûteuses à vérifier sur Ethereum.

#### Comment fonctionnent les preuves de validité dans les ZK-rollups ? {#validity-proofs-in-zk-rollups}

##### Génération de preuves
Avant d'accepter les transactions, l'opérateur effectuera les vérifications habituelles. Cela inclut de confirmer que :

- Les comptes de l'expéditeur et du destinataire font partie de l'arbre d'état.
- L'expéditeur dispose de suffisamment de fonds pour traiter la transaction.
- La transaction est correcte et correspond à la clé publique de l'expéditeur sur le rollup.
- Le nonce de l'expéditeur est correct, etc.

Une fois que le nœud du ZK-rollup a suffisamment de transactions, il les agrège en un lot et compile les entrées pour que le circuit de preuve les compile en une preuve ZK succincte. Cela inclut :

- Une racine d'arbre de Merkle comprenant toutes les transactions du lot.
- Des preuves de Merkle pour les transactions afin de prouver leur inclusion dans le lot.
- Des preuves de Merkle pour chaque paire expéditeur-destinataire dans les transactions afin de prouver que ces comptes font partie de l'arbre d'état du rollup.
- Un ensemble de racines d'état intermédiaires, dérivées de la mise à jour de la racine d'état après l'application des mises à jour d'état pour chaque transaction (c'est-à-dire, la diminution des comptes expéditeurs et l'augmentation des comptes destinataires).

Le circuit de preuve calcule la preuve de validité en « bouclant » sur chaque transaction et en effectuant les mêmes vérifications que l'opérateur a effectuées avant de traiter la transaction. Tout d'abord, il vérifie que le compte de l'expéditeur fait partie de la racine d'état existante à l'aide de la preuve de Merkle fournie. Ensuite, il réduit le solde de l'expéditeur, augmente son nonce, hache les données de compte mises à jour et les combine avec la preuve de Merkle pour générer une nouvelle racine de Merkle.

Cette racine de Merkle reflète le seul changement dans l'état du ZK-rollup : un changement dans le solde et le nonce de l'expéditeur. Cela est possible car la preuve de Merkle utilisée pour prouver l'existence du compte est utilisée pour dériver la nouvelle racine d'état.

Le circuit de preuve effectue le même processus sur le compte du destinataire. Il vérifie si le compte du destinataire existe sous la racine d'état intermédiaire (à l'aide de la preuve de Merkle), augmente son solde, hache à nouveau les données du compte et les combine avec la preuve de Merkle pour générer une nouvelle racine d'état.

Le processus se répète pour chaque transaction ; chaque « boucle » crée une nouvelle racine d'état à partir de la mise à jour du compte de l'expéditeur et une nouvelle racine subséquente à partir de la mise à jour du compte du destinataire. Comme expliqué, chaque mise à jour de la racine d'état représente une modification d'une partie de l'arbre d'état du rollup.

Le circuit de preuve ZK itère sur l'ensemble du lot de transactions, vérifiant la séquence de mises à jour qui aboutit à une racine d'état finale après l'exécution de la dernière transaction. La dernière racine de Merkle calculée devient la nouvelle racine d'état canonique du ZK-rollup.

##### Vérification des preuves
Après que le circuit de preuve a vérifié l'exactitude des mises à jour d'état, l'opérateur L2 soumet la preuve de validité calculée au contrat vérificateur sur L1. Le circuit de vérification du contrat vérifie la validité de la preuve et vérifie également les entrées publiques qui font partie de la preuve :

- **Racine de pré-état** : L'ancienne racine d'état du ZK-rollup (c'est-à-dire avant l'exécution des transactions traitées par lots), reflétant le dernier état valide connu de la chaîne L2.

- **Racine de post-état** : La nouvelle racine d'état du ZK-rollup (c'est-à-dire après l'exécution des transactions traitées par lots), reflétant le nouvel état de la chaîne L2. La racine de post-état est la racine finale dérivée après l'application des mises à jour d'état dans le circuit de preuve.

- **Racine de lot** : La racine de Merkle du lot, dérivée en _merklisant_ les transactions du lot et en hachant la racine de l'arbre.

- **Entrées de transaction** : Données associées aux transactions exécutées dans le cadre du lot soumis.

Si la preuve satisfait le circuit (c'est-à-dire qu'elle est valide), cela signifie qu'il existe une séquence de transactions valides qui font passer le rollup de l'état précédent (empreinte cryptographique par la racine de pré-état) à un nouvel état (empreinte cryptographique par la racine de post-état). Si la racine de pré-état correspond à la racine stockée dans le contrat de rollup, et que la preuve est valide, le contrat de rollup prend la racine de post-état de la preuve et met à jour son arbre d'état pour refléter l'état modifié du rollup.

### Entrées et sorties {#entries-and-exits}

Les utilisateurs entrent dans le ZK-rollup en déposant des jetons dans le contrat du rollup déployé sur la chaîne L1. Cette transaction est mise en file d'attente car seuls les opérateurs peuvent soumettre des transactions au contrat de rollup.

Si la file d'attente des dépôts en attente commence à se remplir, l'opérateur de ZK-rollup prendra les transactions de dépôt et les soumettra au contrat de rollup. Une fois que les fonds de l'utilisateur sont dans le rollup, il peut commencer à effectuer des transactions en envoyant des transactions à l'opérateur pour traitement. Les utilisateurs peuvent vérifier les soldes sur le rollup en hachant les données de leur compte, en envoyant le hash au contrat de rollup et en fournissant une preuve de Merkle à vérifier par rapport à la racine d'état actuelle.

Le retrait d'un ZK-rollup vers L1 est simple. L'utilisateur initie la transaction de sortie en envoyant ses actifs sur le rollup vers un compte spécifié pour les brûler. Si l'opérateur inclut la transaction dans le prochain lot, l'utilisateur peut soumettre une demande de retrait au contrat onchain. Cette demande de retrait comprendra les éléments suivants :

- Une preuve de Merkle prouvant l'inclusion de la transaction de l'utilisateur vers le compte de destruction (burn) dans un lot de transactions

- Les données de transaction

- La racine de lot

- L'adresse L1 pour recevoir les fonds déposés

Le contrat de rollup hache les données de transaction, vérifie si la racine de lot existe et utilise la preuve de Merkle pour vérifier si le hachage de transaction fait partie de la racine de lot. Ensuite, le contrat exécute la transaction de sortie et envoie les fonds à l'adresse choisie par l'utilisateur sur L1.

## ZK-rollups et compatibilité EVM {#zk-rollups-and-evm-compatibility}

Contrairement aux rollups optimistes, les ZK-rollups ne sont pas facilement compatibles avec la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/). Prouver le calcul EVM à usage général dans des circuits est plus difficile et gourmand en ressources que de prouver des calculs simples (comme le transfert de jetons décrit précédemment).

Cependant, les [avancées de la technologie à divulgation nulle de connaissance](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) suscitent un regain d'intérêt pour l'intégration du calcul EVM dans des preuves à divulgation nulle de connaissance. Ces efforts visent à créer une implémentation d'EVM à divulgation nulle de connaissance (zkEVM) qui peut vérifier efficacement l'exactitude de l'exécution du programme. Un zkEVM recrée les opcodes EVM existants pour la preuve/vérification dans les circuits, permettant d'exécuter des contrats intelligents.

Comme l'EVM, un zkEVM effectue une transition entre les états après que le calcul a été effectué sur certaines entrées. La différence est que le zkEVM crée également des preuves à divulgation nulle de connaissance pour vérifier l'exactitude de chaque étape de l'exécution du programme. Les preuves de validité pourraient vérifier l'exactitude des opérations qui touchent l'état de la VM (mémoire, pile, stockage) et le calcul lui-même (c'est-à-dire, l'opération a-t-elle appelé les bons opcodes et les a-t-elle exécutés correctement ?).

L'introduction de ZK-rollups compatibles EVM devrait aider les développeurs à tirer parti de l'évolutivité et des garanties de sécurité des preuves à divulgation nulle de connaissance. Plus important encore, la compatibilité avec l'infrastructure Ethereum native signifie que les développeurs peuvent créer des applications décentralisées (dapps) compatibles ZK en utilisant des outils et des langages familiers (et éprouvés).

## Comment fonctionnent les frais de ZK-rollup ? {#how-do-zk-rollup-fees-work}

Le montant que les utilisateurs paient pour les transactions sur les ZK-rollups dépend des frais de gaz, tout comme sur le réseau principal Ethereum. Cependant, les frais de gaz fonctionnent différemment sur L2 et sont influencés par les coûts suivants :

1. **Écriture d'état** : Il y a un coût fixe pour écrire dans l'état d'Ethereum (c'est-à-dire soumettre une transaction sur la chaîne de blocs Ethereum). Les ZK-rollups réduisent ce coût en traitant les transactions par lots et en répartissant les coûts fixes entre plusieurs utilisateurs.

2. **Publication de données** : Les ZK-rollups publient les données d'état pour chaque transaction sur Ethereum sous forme de `calldata`. Les coûts de `calldata` sont actuellement régis par l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), qui stipule un coût de 16 gaz pour les octets non nuls et de 4 gaz pour les octets nuls de `calldata`, respectivement. Le coût payé sur chaque transaction est influencé par la quantité de `calldata` qui doit être publiée onchain pour celle-ci.

3. **Frais d'opérateur L2** : Il s'agit du montant payé à l'opérateur de rollup en compensation des coûts de calcul encourus lors du traitement des transactions, un peu comme les [« frais de priorité (pourboires) » de transaction](/developers/docs/gas/#how-are-gas-fees-calculated) sur le réseau principal Ethereum.

4. **Génération et vérification de preuves** : Les opérateurs de ZK-rollup doivent produire des preuves de validité pour les lots de transactions, ce qui est gourmand en ressources. La vérification des preuves à divulgation nulle de connaissance sur le réseau principal coûte également du gaz (~ 500 000 gaz).

Outre le traitement par lots des transactions, les ZK-rollups réduisent les frais pour les utilisateurs en compressant les données de transaction. Vous pouvez [voir un aperçu en temps réel](https://l2fees.info/) de ce qu'il en coûte d'utiliser les ZK-rollups Ethereum.

## Comment les ZK-rollups mettent-ils Ethereum à l'échelle ? {#scaling-ethereum-with-zk-rollups}

### Compression des données de transaction {#transaction-data-compression}

Les ZK-rollups étendent le débit sur la couche de base d'Ethereum en effectuant les calculs hors chaîne, mais le véritable coup de pouce pour la mise à l'échelle vient de la compression des données de transaction. La [taille de bloc](/developers/docs/blocks/#block-size) d'Ethereum limite les données que chaque bloc peut contenir et, par extension, le nombre de transactions traitées par bloc. En compressant les données liées aux transactions, les ZK-rollups augmentent considérablement le nombre de transactions traitées par bloc.

Les ZK-rollups peuvent mieux compresser les données de transaction que les rollups optimistes car ils n'ont pas à publier toutes les données requises pour valider chaque transaction. Ils n'ont qu'à publier les données minimales requises pour reconstruire le dernier état des comptes et des soldes sur le rollup.

### Preuves récursives {#recursive-proofs}

Un avantage des preuves à divulgation nulle de connaissance est que les preuves peuvent vérifier d'autres preuves. Par exemple, un seul ZK-SNARK peut vérifier d'autres ZK-SNARKs. Ces « preuves de preuves » sont appelées preuves récursives et augmentent considérablement le débit sur les ZK-rollups.

Actuellement, les preuves de validité sont générées bloc par bloc et soumises au contrat L1 pour vérification. Cependant, la vérification de preuves de blocs uniques limite le débit que les ZK-rollups peuvent atteindre puisqu'un seul bloc peut être finalisé lorsque l'opérateur soumet une preuve.

Les preuves récursives, cependant, permettent de finaliser plusieurs blocs avec une seule preuve de validité. C'est parce que le circuit de preuve agrège de manière récursive plusieurs preuves de blocs jusqu'à ce qu'une preuve finale soit créée. L'opérateur L2 soumet cette preuve récursive, et si le contrat l'accepte, tous les blocs pertinents seront finalisés instantanément. Avec les preuves récursives, le nombre de transactions de ZK-rollup qui peuvent être finalisées sur Ethereum à intervalles réguliers augmente.

### Avantages et inconvénients des ZK-rollups {#zk-rollups-pros-and-cons}

| Avantages                                                                                                                                                                                                   | Inconvénients                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les preuves de validité garantissent l'exactitude des transactions hors chaîne et empêchent les opérateurs d'exécuter des transitions d'état invalides.                                                                           | Le coût associé au calcul et à la vérification des preuves de validité est substantiel et peut augmenter les frais pour les utilisateurs du rollup.                                                                            |
| Offre une finalité de transaction plus rapide car les mises à jour d'état sont approuvées une fois que les preuves de validité sont vérifiées sur L1.                                                                                              | La construction de ZK-rollups compatibles EVM est difficile en raison de la complexité de la technologie à divulgation nulle de connaissance.                                                                                                    |
| S'appuie sur des mécanismes cryptographiques sans tiers de confiance pour la sécurité, et non sur l'honnêteté d'acteurs incités comme avec les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | La production de preuves de validité nécessite un matériel spécialisé, ce qui peut encourager le contrôle centralisé de la chaîne par quelques parties.                                                                    |
| Stocke les données nécessaires pour récupérer l'état hors chaîne sur L1, ce qui garantit la sécurité, la résistance à la censure et la décentralisation.                                                                       | Les opérateurs centralisés (séquenceurs) peuvent influencer l'ordre des transactions.                                                                                                                     |
| Les utilisateurs bénéficient d'une plus grande efficacité du capital et peuvent retirer des fonds de L2 sans délai.                                                                                                           | Les exigences matérielles peuvent réduire le nombre de participants capables de forcer la chaîne à progresser, augmentant le risque que des opérateurs malveillants gèlent l'état du rollup et censurent les utilisateurs. |
| Ne dépend pas d'hypothèses de vivacité et les utilisateurs n'ont pas à valider la chaîne pour protéger leurs fonds.                                                                                              | Certains systèmes de preuve (par exemple, ZK-SNARK) nécessitent une configuration de confiance qui, si elle est mal gérée, pourrait potentiellement compromettre le modèle de sécurité d'un ZK-rollup.                                                     |
| Une meilleure compression des données peut aider à réduire les coûts de publication de `calldata` sur Ethereum et à minimiser les frais de rollup pour les utilisateurs.                                                                             |                                                                                                                                                                                                    |

### Une explication visuelle des ZK-rollups {#zk-video}

Regardez Finematics expliquer les ZK-rollups :

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Qui travaille sur un zkEVM ? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM pour L2 vs L1</AlertTitle>
<AlertDescription>
Les projets ci-dessous utilisent la technologie zkEVM pour construire des rollups de couche 2 (l2). Des recherches sont également en cours sur l'utilisation de zkEVM pour la [vérification des blocs L1](/roadmap/zkevm/), ce qui permettrait aux validateurs de vérifier les blocs Ethereum sans réexécuter les transactions.
</AlertDescription>
</AlertContent>
</Alert>

Les projets travaillant sur les zkEVMs incluent :

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM est un projet financé par la Fondation Ethereum pour développer un ZK-rollup compatible EVM et un mécanisme de génération de preuves de validité pour les blocs Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _est un ZK-rollup décentralisé sur le réseau principal Ethereum travaillant sur une Machine Virtuelle Ethereum à divulgation nulle de connaissance (zkEVM) qui exécute les transactions Ethereum de manière transparente, y compris les contrats intelligents avec des validations par preuve à divulgation nulle de connaissance._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll est une entreprise axée sur la technologie qui travaille à la construction d'une solution de couche 2 (l2) zkEVM native pour Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko est un ZK-rollup décentralisé et équivalent à Ethereum (un [ZK-EVM de type 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era est un ZK-rollup compatible EVM construit par Matter Labs, propulsé par son propre zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet est une solution de mise à l'échelle de couche 2 (l2) compatible EVM construite par StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph est une solution de mise à l'échelle de rollup hybride qui utilise la preuve ZK pour résoudre le problème de défi d'état de la couche 2 (l2)._

- **[Linea](https://linea.build)** - _Linea est une couche 2 (l2) zkEVM équivalente à Ethereum construite par ConsenSys, entièrement alignée avec l'écosystème Ethereum._

## Lectures complémentaires sur les ZK-rollups {#further-reading-on-zk-rollups}

- [Que sont les rollups à divulgation nulle de connaissance ?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Que sont les rollups à divulgation nulle de connaissance ?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Le guide pratique des rollups Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Qu'est-ce qu'un zkEVM ?](https://www.alchemy.com/overviews/zkevm)
- [Types de ZK-EVM : équivalent à Ethereum, équivalent à l'EVM, Type 1, Type 4 et autres mots à la mode cryptiques](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introduction au zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Que sont les L2 ZK-EVM ?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Ressources Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [Les ZK-SNARKs sous le capot](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Comment les SNARKs sont-ils possibles ?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutoriels : Confidentialité et divulgation nulle de connaissance sur Ethereum {#tutorials}

- [Utiliser la divulgation nulle de connaissance pour un état secret](/developers/tutorials/secret-state/) _– Comment utiliser les preuves ZK et les composants de serveur hors chaîne pour maintenir un état de jeu secret onchain._
- [Utilisation d'adresses furtives](/developers/tutorials/stealth-addr/) _– Comment les adresses furtives ERC-5564 permettent des transferts d'ETH anonymes en utilisant la dérivation de clé cryptographique._
- [Utiliser Ethereum pour l'authentification Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Comment intégrer les signatures de portefeuille Ethereum aux systèmes d'authentification Web2 basés sur SAML._