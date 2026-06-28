---
title: "Vérification des contrats intelligents"
description: "Un aperçu de la vérification du code source pour les contrats intelligents Ethereum"
lang: fr
---

Les [contrats intelligents](/developers/docs/smart-contracts/) sont conçus pour être « sans tiers de confiance », ce qui signifie que les utilisateurs ne devraient pas avoir à faire confiance à des tiers (par ex., des développeurs et des entreprises) avant d'interagir avec un contrat. Comme condition préalable à l'absence de confiance requise, les utilisateurs et les autres développeurs doivent être en mesure de vérifier le code source d'un contrat intelligent. La vérification du code source garantit aux utilisateurs et aux développeurs que le code du contrat publié est le même que celui qui s'exécute à l'adresse du contrat sur la chaîne de blocs Ethereum.

Il est important de faire la distinction entre la « vérification du code source » et la « [vérification formelle](/developers/docs/smart-contracts/formal-verification/) ». La vérification du code source, qui sera expliquée en détail ci-dessous, consiste à vérifier que le code source donné d'un contrat intelligent dans un langage de haut niveau (par ex., Solidity) se compile en le même bytecode qui sera exécuté à l'adresse du contrat. Cependant, la vérification formelle décrit la vérification de l'exactitude d'un contrat intelligent, ce qui signifie que le contrat se comporte comme prévu. Bien que cela dépende du contexte, la vérification de contrat fait généralement référence à la vérification du code source.

## Qu'est-ce que la vérification du code source ? {#what-is-source-code-verification}

Avant de déployer un contrat intelligent dans la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/), les développeurs [compilent](/developers/docs/smart-contracts/compiling/) le code source du contrat — des instructions [écrites en Solidity](/developers/docs/smart-contracts/languages/) ou dans un autre langage de programmation de haut niveau — en bytecode. Comme l'EVM ne peut pas interpréter les instructions de haut niveau, la compilation du code source en bytecode (c'est-à-dire des instructions machine de bas niveau) est nécessaire pour exécuter la logique du contrat dans l'EVM.

La vérification du code source consiste à comparer le code source d'un contrat intelligent et le bytecode compilé utilisé lors de la création du contrat pour détecter d'éventuelles différences. La vérification des contrats intelligents est importante car le code du contrat annoncé peut être différent de ce qui s'exécute sur la chaîne de blocs.

La vérification des contrats intelligents permet d'examiner ce que fait un contrat à travers le langage de plus haut niveau dans lequel il est écrit, sans avoir à lire le code machine. Les fonctions, les valeurs, et généralement les noms de variables et les commentaires restent les mêmes que dans le code source original qui est compilé et déployé. Cela rend la lecture du code beaucoup plus facile. La vérification du code source permet également de documenter le code, afin que les utilisateurs finaux sachent ce qu'un contrat intelligent est censé faire.

### Qu'est-ce que la vérification complète ? {#full-verification}

Certaines parties du code source n'affectent pas le bytecode compilé, comme les commentaires ou les noms de variables. Cela signifie que deux codes sources avec des noms de variables différents et des commentaires différents pourraient tous deux permettre de vérifier le même contrat. Ainsi, un acteur malveillant peut ajouter des commentaires trompeurs ou donner des noms de variables fallacieux dans le code source et faire vérifier le contrat avec un code source différent du code source original.

Il est possible d'éviter cela en ajoutant des données supplémentaires au bytecode pour servir de _garantie cryptographique_ de l'exactitude du code source, et d'_empreinte_ des informations de compilation. Les informations nécessaires se trouvent dans les [métadonnées du contrat Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), et le hash de ce fichier est ajouté au bytecode d'un contrat. Vous pouvez le voir en action dans le [terrain de jeu des métadonnées](https://playground.sourcify.dev)

Le fichier de métadonnées contient des informations sur la compilation du contrat, y compris les fichiers sources et leurs hashs. Cela signifie que si l'un des paramètres de compilation ou même un seul octet dans l'un des fichiers sources change, le fichier de métadonnées change. Par conséquent, le hash du fichier de métadonnées, qui est ajouté au bytecode, change également. Cela signifie que si le bytecode d'un contrat + le hash des métadonnées ajouté correspondent au code source et aux paramètres de compilation donnés, nous pouvons être sûrs qu'il s'agit exactement du même code source utilisé lors de la compilation originale, pas même un seul octet n'est différent.

Ce type de vérification qui exploite le hash des métadonnées est appelé **« [vérification complète](https://docs.sourcify.dev/docs/full-vs-partial-match/) »** (également « vérification parfaite »). Si les hashs des métadonnées ne correspondent pas ou ne sont pas pris en compte dans la vérification, il s'agirait d'une « correspondance partielle », ce qui est actuellement la manière la plus courante de vérifier les contrats. Il est possible d'[insérer du code malveillant](https://samczsun.com/hiding-in-plain-sight/) qui ne serait pas reflété dans le code source vérifié sans une vérification complète. La plupart des développeurs ne sont pas conscients de la vérification complète et ne conservent pas le fichier de métadonnées de leur compilation, c'est pourquoi la vérification partielle a été la méthode de facto pour vérifier les contrats jusqu'à présent.

## Pourquoi la vérification du code source est-elle importante ? {#importance-of-source-code-verification}

### Absence de confiance requise {#trustlessness}

L'absence de confiance requise est sans doute la plus grande promesse des contrats intelligents et des [applications décentralisées (dapps)](/developers/docs/dapps/). Les contrats intelligents sont « immuables » et ne peuvent pas être modifiés ; un contrat n'exécutera que la logique métier définie dans le code au moment du déploiement. Cela signifie que les développeurs et les entreprises ne peuvent pas altérer le code d'un contrat après son déploiement sur Ethereum.

Pour qu'un contrat intelligent soit sans tiers de confiance, le code du contrat doit être disponible pour une vérification indépendante. Bien que le bytecode compilé de chaque contrat intelligent soit publiquement disponible sur la chaîne de blocs, le langage de bas niveau est difficile à comprendre — tant pour les développeurs que pour les utilisateurs.

Les projets réduisent les hypothèses de confiance en publiant le code source de leurs contrats. Mais cela conduit à un autre problème : il est difficile de vérifier que le code source publié correspond au bytecode du contrat. Dans ce scénario, la valeur de l'absence de confiance requise est perdue car les utilisateurs doivent faire confiance aux développeurs pour ne pas modifier la logique métier d'un contrat (c'est-à-dire en modifiant le bytecode) avant de le déployer sur la chaîne de blocs.

Les outils de vérification du code source fournissent des garanties que les fichiers de code source d'un contrat intelligent correspondent au code assembleur. Le résultat est un écosystème sans tiers de confiance, où les utilisateurs ne font pas aveuglément confiance à des tiers et vérifient plutôt le code avant de déposer des fonds dans un contrat.

### Sécurité des utilisateurs {#user-safety}

Avec les contrats intelligents, il y a généralement beaucoup d'argent en jeu. Cela exige des garanties de sécurité plus élevées et la vérification de la logique d'un contrat intelligent avant de l'utiliser. Le problème est que des développeurs peu scrupuleux peuvent tromper les utilisateurs en insérant du code malveillant dans un contrat intelligent. Sans vérification, les contrats intelligents malveillants peuvent comporter des [portes dérobées](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), des mécanismes de contrôle d'accès controversés, des vulnérabilités exploitables et d'autres éléments qui mettent en péril la sécurité des utilisateurs et qui passeraient inaperçus.

La publication des fichiers de code source d'un contrat intelligent permet aux personnes intéressées, telles que les auditeurs, d'évaluer plus facilement le contrat à la recherche de vecteurs d'attaque potentiels. Avec plusieurs parties vérifiant indépendamment un contrat intelligent, les utilisateurs ont de meilleures garanties quant à sa sécurité.

## Comment vérifier le code source des contrats intelligents Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Déployer un contrat intelligent sur Ethereum](/developers/docs/smart-contracts/deploying/) nécessite d'envoyer une transaction avec une charge utile de données (bytecode compilé) à une adresse spéciale. La charge utile de données est générée en compilant le code source, plus les [arguments du constructeur](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) de l'instance du contrat ajoutés à la charge utile de données dans la transaction. La compilation est déterministe, ce qui signifie qu'elle produit toujours le même résultat (c'est-à-dire le bytecode du contrat) si les mêmes fichiers sources et les mêmes paramètres de compilation (par ex., version du compilateur, optimiseur) sont utilisés.

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

La vérification d'un contrat intelligent implique fondamentalement les étapes suivantes :

1. Fournir les fichiers sources et les paramètres de compilation à un compilateur.

2. Le compilateur génère le bytecode du contrat.

3. Obtenir le bytecode du contrat déployé à une adresse donnée.

4. Comparer le bytecode déployé avec le bytecode recompilé. Si les codes correspondent, le contrat est vérifié avec le code source et les paramètres de compilation donnés.

5. De plus, si les hashs des métadonnées à la fin du bytecode correspondent, il s'agira d'une correspondance complète.

Notez qu'il s'agit d'une description simpliste de la vérification et qu'il existe de nombreuses exceptions qui ne fonctionneraient pas avec cela, comme le fait d'avoir des [variables immuables](https://docs.sourcify.dev/docs/immutables/).

## Outils de vérification du code source {#source-code-verification-tools}

Le processus traditionnel de vérification des contrats peut être complexe. C'est pourquoi nous disposons d'outils pour vérifier le code source des contrats intelligents déployés sur Ethereum. Ces outils automatisent de grandes parties de la vérification du code source et organisent également les contrats vérifiés pour le bénéfice des utilisateurs.

### Etherscan {#etherscan}

Bien qu'il soit principalement connu comme un [explorateur de chaîne de blocs Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan propose également un [service de vérification du code source](https://etherscan.io/verifyContract) pour les développeurs et les utilisateurs de contrats intelligents.

Etherscan vous permet de recompiler le bytecode du contrat à partir de la charge utile de données originale (code source, adresse de la bibliothèque, paramètres du compilateur, adresse du contrat, etc.). Si le bytecode recompilé est associé au bytecode (et aux paramètres du constructeur) du contrat onchain, alors [le contrat est vérifié](https://info.etherscan.com/types-of-contract-verification/).

Une fois vérifié, le code source de votre contrat reçoit une étiquette « Vérifié » (Verified) et est publié sur Etherscan pour que d'autres puissent l'auditer. Il est également ajouté à la section [Contrats Vérifiés](https://etherscan.io/contractsVerified/) — un répertoire de contrats intelligents avec des codes sources vérifiés.

Etherscan est l'outil le plus utilisé pour vérifier les contrats. Cependant, la vérification de contrat d'Etherscan présente un inconvénient : elle ne compare pas le **hash des métadonnées** du bytecode onchain et du bytecode recompilé. Par conséquent, les correspondances dans Etherscan sont des correspondances partielles.

[En savoir plus sur la vérification des contrats sur Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) est un explorateur de chaîne de blocs open-source qui fournit également un [service de vérification de contrat](https://eth.blockscout.com/contract-verification) pour les développeurs et les utilisateurs de contrats intelligents. En tant qu'alternative open-source, Blockscout offre de la transparence sur la manière dont la vérification est effectuée et permet les contributions de la communauté pour améliorer le processus de vérification.

À l'instar d'autres services de vérification, Blockscout vous permet de vérifier le code source de votre contrat en recompilant le bytecode et en le comparant avec le contrat déployé. Une fois vérifié, votre contrat reçoit le statut de vérification et le code source devient publiquement disponible pour l'audit et l'interaction. Les contrats vérifiés sont également répertoriés dans le [répertoire des contrats vérifiés](https://eth.blockscout.com/verified-contracts) de Blockscout pour faciliter la navigation et la découverte.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) est un autre outil de vérification des contrats qui est open-source et décentralisé. Ce n'est pas un explorateur de blocs et il ne vérifie les contrats que sur [différents réseaux basés sur l'EVM](https://docs.sourcify.dev/docs/chains). Il agit comme une infrastructure publique sur laquelle d'autres outils peuvent s'appuyer, et vise à permettre des interactions de contrat plus conviviales en utilisant l'[ABI](/developers/docs/smart-contracts/compiling/#web-applications) et les commentaires [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) trouvés dans le fichier de métadonnées.

Contrairement à Etherscan, Sourcify prend en charge les correspondances complètes avec le hash des métadonnées. Les contrats vérifiés sont servis dans son [répertoire public](https://docs.sourcify.dev/docs/repository/) sur HTTP et [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), qui est un stockage décentralisé [adressé par le contenu](https://docs.storacha.network/concepts/content-addressing/). Cela permet de récupérer le fichier de métadonnées d'un contrat via IPFS puisque le hash des métadonnées ajouté est un hash IPFS.

De plus, on peut également récupérer les fichiers de code source via IPFS, car les hashs IPFS de ces fichiers se trouvent également dans les métadonnées. Un contrat peut être vérifié en fournissant le fichier de métadonnées et les fichiers sources via son API ou l'[interface utilisateur (UI)](https://sourcify.dev/#/verifier), ou en utilisant les plugins. L'outil de surveillance de Sourcify écoute également les créations de contrats sur les nouveaux blocs et tente de vérifier les contrats si leurs métadonnées et fichiers sources sont publiés sur IPFS.

[En savoir plus sur la vérification des contrats sur Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

La [plateforme Tenderly](https://tenderly.co/) permet aux développeurs Web3 de construire, tester, surveiller et exploiter des contrats intelligents. En combinant des outils de débogage avec des blocs de construction d'observabilité et d'infrastructure, Tenderly aide les développeurs à accélérer le développement de contrats intelligents. Pour activer pleinement les fonctionnalités de Tenderly, les développeurs doivent [effectuer la vérification du code source](https://docs.tenderly.co/monitoring/contract-verification) en utilisant plusieurs méthodes.

Il est possible de vérifier un contrat de manière privée ou publique. S'il est vérifié de manière privée, le contrat intelligent n'est visible que par vous (et les autres membres de votre projet). Vérifier un contrat publiquement le rend visible à tous ceux qui utilisent la plateforme Tenderly.

Vous pouvez vérifier vos contrats en utilisant le [Tableau de bord](https://docs.tenderly.co/contract-verification), le [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), ou la [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Lors de la vérification des contrats via le Tableau de bord, vous devez importer le fichier source ou le fichier de métadonnées généré par le compilateur Solidity, l'adresse/le réseau, et les paramètres du compilateur.

L'utilisation du plugin Tenderly Hardhat permet un meilleur contrôle sur le processus de vérification avec moins d'efforts, vous permettant de choisir entre une vérification automatique (sans code) et manuelle (basée sur le code).

## Complément d'information {#further-reading}

- [Vérification du code source d'un contrat](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)