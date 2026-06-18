---
title: Tester les contrats intelligents
description: "Un aperçu des techniques et des considérations pour tester les contrats intelligents Ethereum."
lang: fr
---

Les chaînes de blocs publiques comme Ethereum sont immuables, ce qui rend difficile la modification du code d'un contrat intelligent après son déploiement. Des [modèles de mise à niveau de contrat](/developers/docs/smart-contracts/upgrading/) pour effectuer des « mises à niveau virtuelles » existent, mais ils sont difficiles à mettre en œuvre et nécessitent un consensus social. De plus, une mise à niveau ne peut corriger une erreur qu'_après_ sa découverte — si un attaquant découvre la vulnérabilité en premier, votre contrat intelligent risque d'être exploité.

Pour ces raisons, tester les contrats intelligents avant de les [déployer](/developers/docs/smart-contracts/deploying/) sur le Réseau principal est une exigence minimale en matière de [sécurité](/developers/docs/smart-contracts/security/). Il existe de nombreuses techniques pour tester les contrats et évaluer l'exactitude du code ; ce que vous choisissez dépend de vos besoins. Néanmoins, une suite de tests composée de différents outils et approches est idéale pour détecter les failles de sécurité mineures et majeures dans le code du contrat.

## Prérequis {#prerequisites}

Cette page explique comment tester les contrats intelligents avant de les déployer sur le réseau Ethereum. Elle suppose que vous êtes familier avec les [contrats intelligents](/developers/docs/smart-contracts/).

## Qu'est-ce que le test de contrat intelligent ? {#what-is-smart-contract-testing}

Le test de contrat intelligent est le processus de vérification que le code d'un contrat intelligent fonctionne comme prévu. Les tests sont utiles pour vérifier si un contrat intelligent particulier satisfait aux exigences de fiabilité, d'utilisabilité et de sécurité.

Bien que les approches varient, la plupart des méthodes de test nécessitent l'exécution d'un contrat intelligent avec un petit échantillon des données qu'il est censé traiter. Si le contrat produit des résultats corrects pour les données d'échantillon, on suppose qu'il fonctionne correctement. La plupart des outils de test fournissent des ressources pour écrire et exécuter des [cas de test](https://en.m.wikipedia.org/wiki/Test_case) afin de vérifier si l'exécution d'un contrat correspond aux résultats attendus.

### Pourquoi est-il important de tester les contrats intelligents ? {#importance-of-testing-smart-contracts}

Comme les contrats intelligents gèrent souvent des actifs financiers de grande valeur, des erreurs de programmation mineures peuvent entraîner et entraînent souvent des [pertes massives pour les utilisateurs](https://rekt.news/leaderboard/). Des tests rigoureux peuvent cependant vous aider à découvrir tôt les défauts et les problèmes dans le code d'un contrat intelligent et à les corriger avant le lancement sur le Réseau principal.

Bien qu'il soit possible de mettre à niveau un contrat si un bug est découvert, les mises à niveau sont complexes et peuvent [entraîner des erreurs](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) si elles sont mal gérées. La mise à niveau d'un contrat annule en outre le principe d'immuabilité et impose aux utilisateurs des hypothèses de confiance supplémentaires. À l'inverse, un plan complet pour tester votre contrat atténue les risques de sécurité des contrats intelligents et réduit la nécessité d'effectuer des mises à niveau logiques complexes après le déploiement.

## Méthodes pour tester les contrats intelligents {#methods-for-testing-smart-contracts}

Les méthodes pour tester les contrats intelligents Ethereum se divisent en deux grandes catégories : les **tests automatisés** et les **tests manuels**. Les tests automatisés et les tests manuels offrent des avantages et des compromis uniques, mais vous pouvez combiner les deux pour créer un plan robuste d'analyse de vos contrats.

### Tests automatisés {#automated-testing}

Les tests automatisés utilisent des outils qui vérifient automatiquement le code d'un contrat intelligent pour détecter les erreurs d'exécution. L'avantage des tests automatisés vient de l'utilisation de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) pour guider l'évaluation des fonctionnalités du contrat. Les tests scriptés peuvent être programmés pour s'exécuter de manière répétée avec une intervention humaine minimale, ce qui rend les tests automatisés plus efficaces que les approches manuelles de test.

Les tests automatisés sont particulièrement utiles lorsque les tests sont répétitifs et chronophages ; difficiles à réaliser manuellement ; susceptibles d'erreurs humaines ; ou impliquent l'évaluation de fonctions critiques du contrat. Mais les outils de test automatisés peuvent avoir des inconvénients — ils peuvent manquer certains bugs et produire de nombreux [faux positifs](https://www.contrastsecurity.com/glossary/false-positive). Par conséquent, associer des tests automatisés à des tests manuels pour les contrats intelligents est idéal.

### Tests manuels {#manual-testing}

Les tests manuels sont assistés par l'homme et impliquent l'exécution de chaque cas de test de votre suite de tests l'un après l'autre lors de l'analyse de l'exactitude d'un contrat intelligent. Cela diffère des tests automatisés où vous pouvez exécuter simultanément plusieurs tests isolés sur un contrat et obtenir un rapport montrant tous les tests qui échouent et ceux qui réussissent.

Les tests manuels peuvent être effectués par une seule personne suivant un plan de test écrit qui couvre différents scénarios de test. Vous pourriez également demander à plusieurs personnes ou groupes d'interagir avec un contrat intelligent sur une période spécifiée dans le cadre de tests manuels. Les testeurs compareront le comportement réel du contrat au comportement attendu, signalant toute différence comme un bug.

Des tests manuels efficaces nécessitent des ressources considérables (compétences, temps, argent et efforts), et il est possible — en raison d'une erreur humaine — de manquer certaines erreurs lors de l'exécution des tests. Mais les tests manuels peuvent également être bénéfiques — par exemple, un testeur humain (par ex., un auditeur) peut utiliser son intuition pour détecter des cas limites qu'un outil de test automatisé manquerait.

## Tests automatisés pour les contrats intelligents {#automated-testing-for-smart-contracts}

### Tests unitaires {#unit-testing-for-smart-contracts}

Les tests unitaires évaluent les fonctions du contrat séparément et vérifient que chaque composant fonctionne correctement. De bons tests unitaires doivent être simples, rapides à exécuter et donner une idée claire de ce qui s'est mal passé si les tests échouent.

Les tests unitaires sont utiles pour vérifier que les fonctions renvoient les valeurs attendues et que le stockage du contrat est correctement mis à jour après l'exécution de la fonction. De plus, l'exécution de tests unitaires après avoir apporté des modifications à la base de code d'un contrat garantit que l'ajout d'une nouvelle logique n'introduit pas d'erreurs. Voici quelques directives pour exécuter des tests unitaires efficaces :

#### Directives pour les tests unitaires des contrats intelligents {#unit-testing-guidelines}

##### 1. Comprendre la logique métier et le flux de travail de vos contrats

Avant d'écrire des tests unitaires, il est utile de savoir quelles fonctionnalités un contrat intelligent offre et comment les utilisateurs accéderont et utiliseront ces fonctions. Cela est particulièrement utile pour exécuter des [tests de chemin nominal (happy path)](https://en.m.wikipedia.org/wiki/Happy_path) qui déterminent si les fonctions d'un contrat renvoient la sortie correcte pour des entrées utilisateur valides. Nous expliquerons ce concept en utilisant cet exemple (abrégé) d'[un contrat d'enchères](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Il s'agit d'un simple contrat d'enchères conçu pour recevoir des offres pendant la période d'enchères. Si la `highestBid` augmente, le précédent meilleur enchérisseur récupère son argent ; une fois la période d'enchères terminée, le `beneficiary` appelle le contrat pour obtenir son argent.

Les tests unitaires pour un contrat comme celui-ci couvriraient différentes fonctions qu'un utilisateur pourrait appeler lors de son interaction avec le contrat. Un exemple serait un test unitaire qui vérifie si un utilisateur peut placer une offre pendant que l'enchère est en cours (c'est-à-dire que les appels à `bid()` réussissent) ou un test qui vérifie si un utilisateur peut placer une offre supérieure à la `highestBid` actuelle.

Comprendre le flux de travail opérationnel d'un contrat aide également à écrire des tests unitaires qui vérifient si l'exécution répond aux exigences. Par exemple, le contrat d'enchères spécifie que les utilisateurs ne peuvent pas placer d'offres lorsque l'enchère est terminée (c'est-à-dire lorsque `auctionEndTime` est inférieur à `block.timestamp`). Ainsi, un développeur pourrait exécuter un test unitaire qui vérifie si les appels à la fonction `bid()` réussissent ou échouent lorsque l'enchère est terminée (c'est-à-dire lorsque `auctionEndTime` > `block.timestamp`).

##### 2. Évaluer toutes les hypothèses liées à l'exécution du contrat

Il est important de documenter toutes les hypothèses concernant l'exécution d'un contrat et d'écrire des tests unitaires pour vérifier la validité de ces hypothèses. En plus d'offrir une protection contre une exécution inattendue, tester les assertions vous oblige à réfléchir aux opérations qui pourraient briser le modèle de sécurité d'un contrat intelligent. Une astuce utile consiste à aller au-delà des « tests d'utilisateurs idéaux » et à écrire des tests négatifs qui vérifient si une fonction échoue pour de mauvaises entrées.

De nombreux frameworks de tests unitaires vous permettent de créer des assertions — des déclarations simples qui indiquent ce qu'un contrat peut et ne peut pas faire — et d'exécuter des tests pour voir si ces assertions se vérifient lors de l'exécution. Un développeur travaillant sur le contrat d'enchères décrit précédemment pourrait faire les assertions suivantes sur son comportement avant d'exécuter des tests négatifs :

- Les utilisateurs ne peuvent pas placer d'offres lorsque l'enchère est terminée ou n'a pas commencé.

- Le contrat d'enchères est annulé si une offre est inférieure au seuil acceptable.

- Les utilisateurs qui ne remportent pas l'enchère sont crédités de leurs fonds

**Remarque** : Une autre façon de tester les hypothèses est d'écrire des tests qui déclenchent des [modificateurs de fonction](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) dans un contrat, en particulier les instructions `require`, `assert` et `if…else`.

##### 3. Mesurer la couverture de code

La [couverture de code](https://en.m.wikipedia.org/wiki/Code_coverage) est une métrique de test qui suit le nombre de branches, de lignes et d'instructions de votre code exécutées pendant les tests. Les tests doivent avoir une bonne couverture de code pour minimiser le risque de vulnérabilités non testées. Sans une couverture suffisante, vous pourriez supposer à tort que votre contrat est sécurisé parce que tous les tests réussissent, alors que des vulnérabilités existent toujours dans des chemins de code non testés. L'enregistrement d'une couverture de code élevée donne cependant l'assurance que toutes les instructions/fonctions d'un contrat intelligent ont été suffisamment testées pour leur exactitude.

##### 4. Utiliser des frameworks de test bien développés

La qualité des outils utilisés pour exécuter des tests unitaires pour vos contrats intelligents est cruciale. Un framework de test idéal est celui qui est régulièrement maintenu ; fournit des fonctionnalités utiles (par ex., des capacités de journalisation et de rapport) ; et doit avoir été largement utilisé et approuvé par d'autres développeurs.

Les frameworks de tests unitaires pour les contrats intelligents Solidity existent dans différents langages (principalement JavaScript, Python et Rust). Consultez certains des guides ci-dessous pour obtenir des informations sur la façon de commencer à exécuter des tests unitaires avec différents frameworks de test :

- **[Exécuter des tests unitaires avec Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Exécuter des tests unitaires avec Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Exécuter des tests unitaires avec Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Exécuter des tests unitaires avec Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Exécuter des tests unitaires avec Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Exécuter des tests unitaires avec Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Exécuter des tests unitaires avec Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Tests d'intégration {#integration-testing-for-smart-contracts}

Alors que les tests unitaires déboguent les fonctions du contrat de manière isolée, les tests d'intégration évaluent les composants d'un contrat intelligent dans leur ensemble. Les tests d'intégration peuvent détecter les problèmes découlant des appels inter-contrats ou des interactions entre différentes fonctions dans le même contrat intelligent. Par exemple, les tests d'intégration peuvent aider à vérifier si des éléments tels que l'[héritage](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) et l'injection de dépendances fonctionnent correctement.

Les tests d'intégration sont utiles si votre contrat adopte une architecture modulaire ou s'interface avec d'autres contrats onchain pendant l'exécution. Une façon d'exécuter des tests d'intégration est de [forker la chaîne de blocs](/glossary/#fork) à une hauteur spécifique (en utilisant un outil comme [Forge](https://book.getfoundry.sh/forge/fork-testing) ou [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) et de simuler les interactions entre votre contrat et les contrats déployés.

La chaîne de blocs forkée se comportera de manière similaire au Réseau principal et aura des comptes avec des états et des soldes associés. Mais elle n'agit que comme un environnement de développement local en bac à sable, ce qui signifie que vous n'aurez pas besoin de vrais ETH pour les transactions, par exemple, et que vos modifications n'affecteront pas le véritable protocole Ethereum.

### Tests basés sur les propriétés {#property-based-testing-for-smart-contracts}

Les tests basés sur les propriétés sont le processus de vérification qu'un contrat intelligent satisfait à une propriété définie. Les propriétés affirment des faits sur le comportement d'un contrat qui sont censés rester vrais dans différents scénarios — un exemple de propriété de contrat intelligent pourrait être « Les opérations arithmétiques dans le contrat ne subissent jamais de dépassement de capacité par le haut ou par le bas ».

L'**analyse statique** et l'**analyse dynamique** sont deux techniques courantes pour exécuter des tests basés sur les propriétés, et les deux peuvent vérifier que le code d'un programme (un contrat intelligent dans ce cas) satisfait à une propriété prédéfinie. Certains outils de test basés sur les propriétés sont fournis avec des règles prédéfinies sur les propriétés attendues du contrat et vérifient le code par rapport à ces règles, tandis que d'autres vous permettent de créer des propriétés personnalisées pour un contrat intelligent.

#### Analyse statique {#static-analysis}

Un analyseur statique prend en entrée le code source d'un contrat intelligent et produit des résultats déclarant si un contrat satisfait ou non à une propriété. Contrairement à l'analyse dynamique, l'analyse statique n'implique pas l'exécution d'un contrat pour analyser son exactitude. L'analyse statique raisonne plutôt sur tous les chemins possibles qu'un contrat intelligent pourrait emprunter pendant l'exécution (c'est-à-dire en examinant la structure du code source pour déterminer ce que cela signifierait pour le fonctionnement du contrat à l'exécution).

Le [linting](https://www.perforce.com/blog/qac/what-is-linting) et les [tests statiques](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sont des méthodes courantes pour exécuter une analyse statique sur les contrats. Les deux nécessitent l'analyse de représentations de bas niveau de l'exécution d'un contrat, telles que les [arbres syntaxiques abstraits](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) et les [graphes de flux de contrôle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) générés par le compilateur.

Dans la plupart des cas, l'analyse statique est utile pour détecter des problèmes de sécurité tels que l'utilisation de constructions non sécurisées, des erreurs de syntaxe ou des violations des normes de codage dans le code d'un contrat. Cependant, les analyseurs statiques sont connus pour être généralement peu fiables pour détecter des vulnérabilités plus profondes et peuvent produire des faux positifs excessifs.

#### Analyse dynamique {#dynamic-analysis}

L'analyse dynamique génère des entrées symboliques (par ex., dans l'[exécution symbolique](https://en.m.wikipedia.org/wiki/Symbolic_execution)) ou des entrées concrètes (par ex., dans le [fuzzing](https://owasp.org/www-community/Fuzzing)) pour les fonctions d'un contrat intelligent afin de voir si une ou plusieurs traces d'exécution violent des propriétés spécifiques. Cette forme de test basé sur les propriétés diffère des tests unitaires en ce que les cas de test couvrent plusieurs scénarios et qu'un programme gère la génération des cas de test.

Le [fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) est un exemple de technique d'analyse dynamique pour vérifier des propriétés arbitraires dans les contrats intelligents. Un fuzzer invoque des fonctions dans un contrat cible avec des variations aléatoires ou mal formées d'une valeur d'entrée définie. Si le contrat intelligent entre dans un état d'erreur (par ex., un état où une assertion échoue), le problème est signalé et les entrées qui conduisent l'exécution vers le chemin vulnérable sont produites dans un rapport.

Le fuzzing est utile pour évaluer le mécanisme de validation des entrées d'un contrat intelligent, car une mauvaise gestion des entrées inattendues pourrait entraîner une exécution non intentionnelle et produire des effets dangereux. Cette forme de test basé sur les propriétés peut être idéale pour de nombreuses raisons :

1. **Écrire des cas de test pour couvrir de nombreux scénarios est difficile.** Un test de propriété nécessite seulement que vous définissiez un comportement et une plage de données pour tester le comportement — le programme génère automatiquement des cas de test basés sur la propriété définie.

2. **Votre suite de tests peut ne pas couvrir suffisamment tous les chemins possibles dans le programme.** Même avec une couverture de 100 %, il est possible de passer à côté de cas limites.

3. **Les tests unitaires prouvent qu'un contrat s'exécute correctement pour des données d'échantillon, mais on ignore si le contrat s'exécute correctement pour des entrées en dehors de l'échantillon.** Les tests de propriété exécutent un contrat cible avec de multiples variations d'une valeur d'entrée donnée pour trouver des traces d'exécution qui provoquent des échecs d'assertion. Ainsi, un test de propriété offre plus de garanties qu'un contrat s'exécute correctement pour une large classe de données d'entrée.

### Directives pour l'exécution de tests basés sur les propriétés pour les contrats intelligents {#running-property-based-tests}

L'exécution de tests basés sur les propriétés commence généralement par la définition d'une propriété (par ex., l'absence de [dépassements de capacité d'entiers](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) ou d'un ensemble de propriétés que vous souhaitez vérifier dans un contrat intelligent. Vous devrez peut-être également définir une plage de valeurs dans laquelle le programme peut générer des données pour les entrées de transaction lors de l'écriture de tests de propriété.

Une fois correctement configuré, l'outil de test de propriété exécutera les fonctions de vos contrats intelligents avec des entrées générées aléatoirement. S'il y a des violations d'assertion, vous devriez obtenir un rapport avec des données d'entrée concrètes qui violent la propriété en cours d'évaluation. Consultez certains des guides ci-dessous pour commencer à exécuter des tests basés sur les propriétés avec différents outils :

- **[Analyse statique des contrats intelligents avec Slither](https://github.com/crytic/slither)**
- **[Analyse statique des contrats intelligents avec Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Tests basés sur les propriétés avec Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing de contrats avec Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing de contrats avec Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing de contrats avec Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Exécution symbolique de contrats intelligents avec Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Exécution symbolique de contrats intelligents avec Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Tests manuels pour les contrats intelligents {#manual-testing-for-smart-contracts}

Les tests manuels des contrats intelligents interviennent souvent plus tard dans le cycle de développement, après l'exécution des tests automatisés. Cette forme de test évalue le contrat intelligent comme un produit entièrement intégré pour voir s'il fonctionne comme spécifié dans les exigences techniques.

### Tester des contrats sur une chaîne de blocs locale {#testing-on-local-blockchain}

Bien que les tests automatisés effectués dans un environnement de développement local puissent fournir des informations de débogage utiles, vous voudrez savoir comment votre contrat intelligent se comporte dans un environnement de production. Cependant, le déploiement sur la chaîne principale Ethereum entraîne des frais de gaz — sans compter que vous ou vos utilisateurs pouvez perdre de l'argent réel si votre contrat intelligent comporte encore des bugs.

Tester votre contrat sur une chaîne de blocs locale (également appelée [réseau de développement](/developers/docs/development-networks/)) est une alternative recommandée aux tests sur le Réseau principal. Une chaîne de blocs locale est une copie de la chaîne de blocs Ethereum fonctionnant localement sur votre ordinateur qui simule le comportement de la couche d'exécution d'Ethereum. À ce titre, vous pouvez programmer des transactions pour interagir avec un contrat sans encourir de frais généraux importants.

L'exécution de contrats sur une chaîne de blocs locale pourrait être utile comme forme de test d'intégration manuel. [Les contrats intelligents sont hautement composables](/developers/docs/smart-contracts/composability/), ce qui vous permet de vous intégrer aux protocoles existants — mais vous devrez toujours vous assurer que ces interactions onchain complexes produisent les résultats corrects.

[En savoir plus sur les réseaux de développement.](/developers/docs/development-networks/)

### Tester des contrats sur des réseaux de test {#testing-contracts-on-testnets}

Un réseau de test fonctionne exactement comme le réseau principal Ethereum, sauf qu'il utilise de l'ether (ETH) sans valeur dans le monde réel. Déployer votre contrat sur un [réseau de test](/developers/docs/networks/#ethereum-testnets) signifie que n'importe qui peut interagir avec lui (par ex., via l'interface de la dapp) sans mettre de fonds en danger.

Cette forme de test manuel est utile pour évaluer le flux de bout en bout de votre application du point de vue de l'utilisateur. Ici, les bêta-testeurs peuvent également effectuer des essais et signaler tout problème avec la logique métier et la fonctionnalité globale du contrat.

Le déploiement sur un réseau de test après des tests sur une chaîne de blocs locale est idéal car le premier est plus proche du comportement de la Machine Virtuelle Ethereum. Par conséquent, il est courant pour de nombreux projets natifs d'Ethereum de déployer des dapps sur des réseaux de test pour évaluer le fonctionnement d'un contrat intelligent dans des conditions réelles.

[En savoir plus sur les réseaux de test Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Tests vs vérification formelle {#testing-vs-formal-verification}

Bien que les tests aident à confirmer qu'un contrat renvoie les résultats attendus pour certaines entrées de données, ils ne peuvent pas prouver de manière concluante la même chose pour les entrées non utilisées pendant les tests. Tester un contrat intelligent ne peut donc pas garantir « l'exactitude fonctionnelle » (c'est-à-dire qu'il ne peut pas montrer qu'un programme se comporte comme requis pour _tous_ les ensembles de valeurs d'entrée).

La vérification formelle est une approche pour évaluer l'exactitude d'un logiciel en vérifiant si un modèle formel du programme correspond à la spécification formelle. Un modèle formel est une représentation mathématique abstraite d'un programme, tandis qu'une spécification formelle définit les propriétés d'un programme (c'est-à-dire des assertions logiques sur l'exécution du programme).

Parce que les propriétés sont écrites en termes mathématiques, il devient possible de vérifier qu'un modèle formel (mathématique) du système satisfait à une spécification en utilisant des règles logiques d'inférence. Ainsi, on dit que les outils de vérification formelle produisent une « preuve mathématique » de l'exactitude d'un système.

Contrairement aux tests, la vérification formelle peut être utilisée pour vérifier que l'exécution d'un contrat intelligent satisfait à une spécification formelle pour _toutes_ les exécutions (c'est-à-dire qu'il n'a pas de bugs) sans avoir besoin de l'exécuter avec des données d'échantillon. Non seulement cela réduit le temps passé à exécuter des dizaines de tests unitaires, mais c'est aussi plus efficace pour détecter les vulnérabilités cachées. Cela dit, les techniques de vérification formelle se situent sur un spectre en fonction de leur difficulté de mise en œuvre et de leur utilité.

[En savoir plus sur la vérification formelle pour les contrats intelligents.](/developers/docs/smart-contracts/formal-verification)

## Tests vs audits et primes aux bugs {#testing-vs-audits-bug-bounties}

Comme mentionné, des tests rigoureux peuvent rarement garantir l'absence de bugs dans un contrat ; les approches de vérification formelle peuvent fournir des assurances plus fortes d'exactitude mais sont actuellement difficiles à utiliser et entraînent des coûts considérables.

Néanmoins, vous pouvez encore augmenter la possibilité de détecter les vulnérabilités du contrat en obtenant une révision indépendante du code. Les [audits de contrats intelligents](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) et les [primes aux bugs](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sont deux façons de demander à d'autres d'analyser vos contrats.

Les audits sont réalisés par des auditeurs expérimentés dans la recherche de failles de sécurité et de mauvaises pratiques de développement dans les contrats intelligents. Un audit comprendra généralement des tests (et éventuellement une vérification formelle) ainsi qu'une révision manuelle de l'ensemble de la base de code.

À l'inverse, un programme de primes aux bugs implique généralement d'offrir une récompense financière à un individu (communément décrit comme des [hackers éthiques (whitehat)](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) qui découvre une vulnérabilité dans un contrat intelligent et la divulgue aux développeurs. Les primes aux bugs sont similaires aux audits car elles impliquent de demander à d'autres d'aider à trouver des défauts dans les contrats intelligents.

La différence majeure est que les programmes de primes aux bugs sont ouverts à la communauté plus large des développeurs/hackers et attirent une vaste classe de hackers éthiques et de professionnels de la sécurité indépendants dotés de compétences et d'expériences uniques. Cela peut être un avantage par rapport aux audits de contrats intelligents qui s'appuient principalement sur des équipes pouvant posséder une expertise limitée ou étroite.

## Outils et bibliothèques de test {#testing-tools-and-libraries}

### Outils de tests unitaires {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Outil de couverture de code pour les contrats intelligents écrits en Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework pour le développement et le test avancés de contrats intelligents (basé sur Ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Outil pour tester les contrats intelligents Solidity. Fonctionne sous le plugin « Solidity Unit Testing » de l'IDE Remix qui est utilisé pour écrire et exécuter des cas de test pour un contrat._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Bibliothèque d'assertions pour les tests de contrats intelligents Ethereum. Assurez-vous que vos contrats se comportent comme prévu !_ 

- **[Framework de tests unitaires Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie utilise Pytest, un framework de test riche en fonctionnalités qui vous permet d'écrire de petits tests avec un minimum de code, s'adapte bien aux grands projets et est hautement extensible._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry propose Forge, un framework de test Ethereum rapide et flexible capable d'exécuter des tests unitaires simples, des vérifications d'optimisation du gaz et du fuzzing de contrats._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework pour tester les contrats intelligents basé sur Ethers.js, Mocha et Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework de développement et de test basé sur Python pour les contrats intelligents ciblant la Machine Virtuelle Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework basé sur Python pour les tests unitaires et le fuzzing avec de fortes capacités de débogage et un support de test inter-chaîne, utilisant pytest et Anvil pour une meilleure expérience utilisateur et de meilleures performances._

### Outils de tests basés sur les propriétés {#property-based-testing-tools}

#### Outils d'analyse statique {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework d'analyse statique Solidity basé sur Python pour trouver des vulnérabilités, améliorer la compréhension du code et écrire des analyses personnalisées pour les contrats intelligents._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter pour appliquer les meilleures pratiques de style et de sécurité pour le langage de programmation de contrats intelligents Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analyseur statique basé sur Rust spécialement conçu pour la sécurité et le développement de contrats intelligents Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework d'analyse statique basé sur Python avec des détecteurs de vulnérabilité et de qualité de code, des imprimantes pour extraire des informations utiles du code et un support pour l'écriture de sous-modules personnalisés._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Un linter simple et puissant pour Solidity._

#### Outils d'analyse dynamique {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer de contrat rapide pour détecter les vulnérabilités dans les contrats intelligents grâce à des tests basés sur les propriétés._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Outil de fuzzing automatisé utile pour détecter les violations de propriétés dans le code des contrats intelligents._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework d'exécution symbolique dynamique pour analyser le bytecode EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Outil d'évaluation de bytecode EVM pour détecter les vulnérabilités des contrats à l'aide de l'analyse de teinte, de l'analyse concolique et de la vérification du flux de contrôle._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble est un langage de spécification et un outil de vérification à l'exécution qui vous permet d'annoter des contrats intelligents avec des propriétés qui vous permettent de tester automatiquement les contrats avec des outils tels que Diligence Fuzzing ou MythX._

## Tutoriels connexes {#related-tutorials}

- [Un aperçu et une comparaison de différents produits de test](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Comment utiliser Echidna pour tester les contrats intelligents](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Comment utiliser Manticore pour trouver des bugs de contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Comment utiliser Slither pour trouver des bugs de contrats intelligents](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Comment simuler (mock) des contrats Solidity pour les tests](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Comment exécuter des tests unitaires en Solidity à l'aide de Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Lectures complémentaires {#further-reading}

- [Un guide approfondi pour tester les contrats intelligents Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Comment tester les contrats intelligents Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guide de tests unitaires de MolochDAO pour les développeurs](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Comment tester les contrats intelligents comme une rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutoriels : Test de contrats intelligents sur Ethereum {#tutorials}

- [Comment développer et tester une dApp sur un réseau de test local multi-clients](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Procédure pas à pas pour déployer un contrat intelligent sur un réseau de test local et effectuer des tests._
- [Comment simuler (mock) des contrats intelligents Solidity pour les tests](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Tutoriel intermédiaire sur la façon d'utiliser des données fictives et de mettre en œuvre des tests unitaires._
- [Comment utiliser Echidna pour tester les contrats intelligents](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Approche avancée du fuzzing et des tests de contrats intelligents._