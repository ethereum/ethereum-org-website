---
title: Vérification des contrats intelligents
description: Un aperçu de la vérification du code source des contrats intelligents d'Ethereum
lang: fr
---

[Les contrats intelligents](/developers/docs/smart-contracts/) sont conçus pour être « sans confiance », ce qui signifie que les utilisateurs ne devraient pas avoir à faire confiance à des tiers (par exemple, des développeurs et des entreprises) avant d'interagir avec un contrat. La condition préalable à l'absence de confiance est que les utilisateurs et les autres développeurs soient en mesure de vérifier le code source d'un contrat intelligent. La vérification du code source garantit aux utilisateurs et aux développeurs que le code du contrat publié est le même que celui qui s'exécute à l'adresse du contrat sur la blockchain Ethereum.

Il est important de faire la distinction entre la « vérification du code source » et la "[vérification formelle](/developers/docs/smart-contracts/formal-verification/)". La vérification du code source, qui sera expliquée en détail ci-dessous, consiste à vérifier que le code source d'un contrat intelligent dans un langage de haut niveau (par exemple Solidity) se compile de façon à produire le même bytecode que celui qui est exécuté à l'adresse du contrat. Par contre, la vérification formelle consiste à vérifier l'exactitude d'un contrat intelligent, c'est-à-dire que le contrat se comporte comme prévu. Bien que cela dépende du contexte, la vérification des contrats fait généralement référence à la vérification du code source.

## Qu'est-ce que la vérification du code source ? {#what-is-source-code-verification}

Avant de déployer un contrat intelligent dans la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/), les développeurs [compilent](/developers/docs/smart-contracts/compiling/) le code source du contrat, c'est-à-dire les instructions [écrites en Solidity](/developers/docs/smart-contracts/languages/) ou dans un autre langage de programmation de haut niveau, en bytecode. Comme l'EVM ne peut pas interpréter les instructions de haut niveau, la compilation du code source en bytecode (c'est-à-dire en instructions machine de bas niveau) est nécessaire à l'exécution de la logique du contrat dans l'EVM.

La vérification du code source consiste à comparer le code source d'un contrat intelligent et le bytecode compilé utilisé lors de la création du contrat afin de détecter toute différence. La vérification des contrats intelligents est importante car le code du contrat annoncé peut être différent de celui qui s'exécute sur la blockchain.

La vérification des contrats intelligents permet d'étudier ce que fait un contrat grâce au langage de haut niveau dans lequel il est écrit, sans avoir à lire le code machine. Les fonctions, les valeurs et, en général, les noms de variables et les commentaires restent identiques au code source original qui est compilé et déployé. Cela facilite grandement la lecture du code. La vérification des sources prévoit également la documentation du code, afin que les utilisateurs finaux sachent ce qu'un contrat intelligent est censé faire.

### Qu'est-ce que la vérification complète ? {#full-verification}

Certaines parties du code source n'affectent pas le bytecode compilé, comme les commentaires ou les noms de variables. Cela signifie que deux codes sources avec des noms de variables différents et des commentaires différents seraient tous deux capables de vérifier le même contrat. Ainsi, un acteur malveillant peut ajouter des commentaires trompeurs ou utiliser des noms de variables trompeurs dans le code source et faire vérifier le contrat à l'aide d'un code source différent du code source original.

Il est possible d'éviter cela en ajoutant des données supplémentaires au bytecode pour servir de _garantie cryptographique_ de l'exactitude du code source et d'_empreinte digitale_ des informations de compilation. Les informations nécessaires se trouvent dans les [métadonnées du contrat Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), et le hachage de ce fichier est ajouté au bytecode d'un contrat. Vous pouvez le voir à l'œuvre dans le [metadata playground](https://playground.sourcify.dev)

Le fichier de métadonnées contient des informations sur la compilation du contrat, y compris les fichiers sources et leurs hachages. Ce qui signifie que si l'un des paramètres de compilation ou même un octet dans l'un des fichiers source change, le fichier de métadonnées change également. Par conséquent, le hachage du fichier de métadonnées, qui est ajouté au bytecode, change également. Donc, si le bytecode d'un contrat + le hachage des métadonnées correspond au code source et aux paramètres de compilation donnés, nous pouvons être sûrs qu'il s'agit exactement du même code source utilisé dans la compilation d'origine, aucun octet n'étant différent.

Ce type de vérification qui exploite le hachage des métadonnées est appelé **"[vérification complète](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (ou « vérification parfaite »). Si les hachages des métadonnées ne correspondent pas ou ne sont pas pris en compte lors de la vérification, il s'agirait d'une « correspondance partielle », ce qui est actuellement la méthode la plus courante pour vérifier les contrats. Il est possible [d'insérer du code malveillant](https://samczsun.com/hiding-in-plain-sight/) qui ne serait pas reflété dans le code source vérifié sans vérification complète. La plupart des développeurs ne sont pas au courant de la vérification complète et ne conservent pas le fichier de métadonnées de leur compilation, c'est pourquoi la vérification partielle a été la méthode habituelle de vérification des contrats jusqu'à présent.

## Pourquoi la vérification du code source est-elle importante ? {#importance-of-source-code-verification}

### Absence de confiance {#trustlessness}

L'absence de confiance est sans doute la principale motivation des contrats intelligents et des [applications décentralisées (DApps)](/developers/docs/dapps/). Les contrats intelligents sont « immuables » et ne peuvent pas être modifiés ; un contrat n'exécutera que la logique définie dans le code au moment du déploiement. Les développeurs et les entreprises ne peuvent donc pas modifier le code d'un contrat après l'avoir déployé sur Ethereum.

Pour qu'un contrat intelligent soit sans confiance, le code du contrat doit pouvoir faire l'objet d'une vérification indépendante. Bien que le bytecode compilé pour chaque contrat intelligent soit publiquement disponible sur la blockchain, le langage de bas niveau est difficile à comprendre, tant pour les développeurs que pour les utilisateurs.

Les projets réduisent les hypothèses de confiance en publiant le code source de leurs contrats. Mais cela pose un autre problème : il est difficile de vérifier que le code source publié correspond au bytecode du contrat. Dans ce scénario, la valeur de l'absence de confiance est perdue parce que les utilisateurs doivent faire confiance aux développeurs pour ne pas modifier la logique d'un contrat (par ex. en changeant le bytecode) avant de le déployer sur la blockchain.

Les outils de vérification du code source garantissent que les fichiers du code source d'un contrat intelligent correspondent au code d'assemblage. Il en résulte un écosystème sans confiance, dans lequel les utilisateurs ne font pas aveuglément confiance à des tiers et vérifient plutôt le code avant de déposer des fonds dans un contrat.

### Sécurité des utilisateurs {#user-safety}

Avec les contrats intelligents, il y a généralement beaucoup d'argent en jeu. Cela nécessite des garanties de sécurité plus élevées et la vérification de la logique d'un contrat intelligent avant de l'utiliser. Le problème est que des développeurs peu scrupuleux peuvent tromper les utilisateurs en insérant du code malveillant dans un contrat intelligent. Sans vérification, les contrats intelligents malveillants peuvent présenter des [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), des mécanismes de contrôle d'accès controversés, des vulnérabilités exploitables et d'autres éléments qui mettent en péril la sécurité des utilisateurs et qui ne seraient pas détectés.

Publier les fichiers du code source d'un contrat intelligent permet aux personnes intéressées, telles que les auditeurs, d'évaluer plus facilement le contrat pour y déceler des vecteurs d'attaque potentiels. La vérification indépendante d'un contrat intelligent par plusieurs entités permet aux utilisateurs de bénéficier de garanties plus solides quant à sa sécurité.

## Comment vérifier le code source des contrats intelligents Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Le déploiement d'un contrat intelligent sur Ethereum](/developers/docs/smart-contracts/deploying/) nécessite l'envoi d'une transaction avec une charge utile de données (bytecode compilé) vers une adresse spéciale. Les données utiles sont générées par la compilation du code source et les [arguments du constructeur](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) de l'instance de contrat ajoutés à la charge utile des données dans la transaction. La compilation est déterministe, ce qui signifie qu'elle produit toujours le même résultat (c'est-à-dire le bytecode du contrat) si les mêmes fichiers sources et les mêmes paramètres de compilation (par ex. la version du compilateur, l'optimiseur) sont utilisés.

![Un diagramme montrant la vérification du code source d'un contrat intelligent](./source-code-verification.png)

La vérification d'un contrat intelligent comprend essentiellement les étapes suivantes :

1. Saisir les fichiers sources et les paramètres de compilation dans un compilateur.

2. Le compilateur génère le bytecode du contrat

3. Récupérer le bytecode du contrat déployé à une adresse donnée

4. Comparer le bytecode déployé avec le bytecode recompilé. Si les codes correspondent, le contrat est vérifié avec le code source et les paramètres de compilation spécifiés.

5. De plus, si les hachages de métadonnées à la fin du bytecode correspondent, il s'agira d'une correspondance complète.

Notez qu'il s'agit d'une description simpliste de la vérification et qu'il existe de nombreuses exceptions qui ne fonctionneraient pas avec cette méthode, comme les [variables immuables](https://docs.sourcify.dev/docs/immutables/).

## Outils de vérification du code source {#source-code-verification-tools}

Le processus traditionnel de vérification des contrats peut être complexe. C'est pourquoi nous disposons d'outils de vérification du code source des contrats intelligents déployés sur Ethereum. Ces outils automatisent une grande partie de la vérification du code source et conservent les contrats vérifiés au bénéfice des utilisateurs.

### Etherscan {#etherscan}

Bien que principalement connu comme un [explorateur de la blockchain Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan propose également un [service de vérification de source code](https://etherscan.io/verifyContract) pour les développeurs et les utilisateurs de contrats intelligents.

Etherscan vous permet de recompiler le bytecode du contrat à partir de la charge utile des données originales (code source, adresse de la bibliothèque, paramètres du compilateur, adresse du contrat, etc.) Si le bytecode recompilé est identifié comme étant identique au bytecode (et les paramètres du constructeur) du contrat en chaîne, alors [le contrat est vérifié](https://info.etherscan.com/types-of-contract-verification/).

Une fois vérifié, le code source de votre contrat reçoit un label « vérifié » et est publié sur Etherscan pour que d'autres puissent l'auditer. Il est également ajouté à la section [Contrats vérifiés](https://etherscan.io/contractsVerified/) - un répertoire de contrats intelligents dont les codes sources ont été vérifiés.

Etherscan est l'outil le plus utilisé pour vérifier les contrats. Cependant, la vérification de contrat d'Etherscan présente un inconvénient : elle ne parvient pas à comparer le **hachage de métadonnées** du bytecode on-chain et du bytecode recompilé. Par conséquent, les correspondances Etherscan sont des correspondances partielles.

[Plus d'informations sur la vérification des contrats sur Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) est un autre outil de vérification de contrats open-source et décentralisé. Ce n'est pas un explorateur de blocs et il ne vérifie que les contrats sur [différents réseaux basés sur l'EVM](https://docs.sourcify.dev/docs/chains). Il agit comme une infrastructure publique sur laquelle d'autres outils peuvent se baser, et vise à permettre des interactions contractuelles plus conviviales en utilisant les commentaires [ABI](/developers/docs/smart-contracts/compiling/#web-applications) et [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) trouvés dans le fichier de métadonnées.

Contrairement à Etherscan, Sourcify prend en charge les correspondances complètes avec le hachage des métadonnées. Les contrats vérifiés sont disponibles sur son [dépôt public](https://docs.sourcify.dev/docs/repository/) en HTTP et [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), qui est un stockage décentralisé à [adressage de contenu](https://web3.storage/docs/concepts/content-addressing/). Cela permet de récupérer le fichier de métadonnées d'un contrat via IPFS puisque le hachage des métadonnées annexé est un hachage IPFS.

De plus, il est également possible de récupérer les fichiers de code source via IPFS, car les hachages IPFS de ces fichiers se trouvent également dans les métadonnées. Un contrat peut être vérifié en fournissant le fichier de métadonnées et les fichiers sources via son API, via [l'UI](https://sourcify.dev/#/verifier), ou en utilisant les plugins. L'outil de monitoring Sourcify surveille également les créations de contrats sur les nouveaux blocs et tente de vérifier les contrats si leurs métadonnées et leurs fichiers sources sont publiés sur IPFS.

[Plus d'informations sur la vérification des contrats sur Sourcify](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

La [plateforme Tenderly](https://tenderly.co/) permet aux développeurs Web3 de concevoir, tester, contrôler et opérer des contrats intelligents. En combinant des outils de débogage avec une observabilité et des blocs de construction d'infrastructure, Tenderly aide les développeurs à accélérer le développement de contrats intelligents. Pour activer pleinement les fonctionnalités de Tenderly, les développeurs doivent [effectuer une vérification du code source](https://docs.tenderly.co/monitoring/contract-verification) à l'aide de plusieurs méthodes.

On peut vérifier un contrat de manière privée ou publique. S'il est vérifié en privé, le contrat intelligent n'est visible que par vous (et les autres membres de votre projet). La vérification publique d'un contrat le rend visible à tous les utilisateurs de la plateforme Tenderly.

Vous pouvez vérifier vos contrats en utilisant le [Tableau de bord](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), le [plugin Tenderly pour Hardhat](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin) ou le [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Lors de la vérification des contrats via le Tableau de bord, vous devez importer le fichier source ou le fichier de métadonnées généré par le compilateur Solidity, l'adresse/le réseau et les paramètres du compilateur.

L'utilisation du plugin Tenderly Hardhat permet de mieux contrôler le processus de vérification à moindre effort, en vous permettant de choisir entre la vérification automatique (sans code) et la vérification manuelle (avec code).

## Complément d'information {#further-reading}

- [Vérification du code source d'un contrat](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
