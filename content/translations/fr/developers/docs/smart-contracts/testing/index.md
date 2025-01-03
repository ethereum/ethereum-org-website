---
title: Tester les contrats intelligents
description: Un aperçu des techniques et des considérations à prendre en compte pour tester les contrats intelligents Ethereum.
lang: fr
---

Les blockchains publiques comme Ethereum sont immuables, ce qui rend difficile le changement de code des contrats intelligents après le déploiement. [Les modèles de mise à niveau du contrat](/developers/docs/smart-contracts/upgrading/) pour effectuer des « mises à niveau virtuelles » existent, or celles-ci sont difficiles à mettre en œuvre et nécessitent un consensus social. De plus, une mise à jour ne peut corriger une erreur _qu'après_ sa découverte. Si un attaquant découvre la vulnérabilité en premier, votre contrat intelligent risque d'être exploité.

Pour ces raisons, tester les contrats intelligents avant [le déploiement](/developers/docs/smart-contracts/deploying/) sur le réseau principal est une exigence minimale pour la [sécurité](/developers/docs/smart-contracts/security/). Il existe de nombreuses techniques pour tester les contrats et évaluer la justesse du code ; ce que vous choisissez dépend de vos besoins. Néanmoins, une suite de tests composée d'outils et d'approches différents est idéale pour attraper des défauts de sécurité mineurs et majeurs dans le code contractuel.

## Prérequis {#prerequisites}

Cette page explique comment tester les contrats intelligents avant le déploiement sur le réseau Ethereum. Cela suppose que vous êtes familier avec les [contrats intelligents](/developers/docs/smart-contracts/).

## Qu'est-ce que le test de contrats intelligents ? {#what-is-smart-contract-testing}

Les tests de contrats intelligents sont le processus de vérification que le code d'un contrat intelligent fonctionne comme prévu. Les tests sont utiles pour vérifier si un contrat intelligent particulier satisfait aux exigences de fiabilité, d'utilisabilité et de sécurité.

Bien que les méthodes de test soient différentes, la plupart des méthodes de test nécessitent l'exécution d'un contrat intelligent avec un petit échantillon de données qu'il est censé gérer. Si le contrat produit des résultats corrects pour les données d'échantillonnage, il est supposé fonctionner correctement. La plupart des outils de test fournissent des ressources pour écrire et exécuter des [cas de test](https://en.m.wikipedia.org/wiki/Test_case) pour vérifier si une exécution de contrats correspond aux résultats attendus.

### Pourquoi est-il important de tester les contrats intelligents ? {#importance-of-testing-smart-contracts}

Comme les contrats intelligents gèrent souvent les actifs financiers de grande valeur, des erreurs de programmation mineures peuvent entraîner et entraînent souvent des [pertes massives pour les utilisateurs](https://rekt.news/leaderboard/). Des tests rigoureux peuvent toutefois vous aider à découvrir rapidement les défauts d'un code de contrats intelligents et à les corriger avant de se lancer sur le réseau principal.

Tant qu'il est possible de mettre à jour un contrat si un bogue est découvert, les mises à jour sont complexes et peuvent [entraîner des erreurs](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) si elles sont mal gérées. La mise à niveau d'un contrat annule encore le principe de l'immutabilité et charge les utilisateurs avec des hypothèses de confiance supplémentaires. Inversement, un plan complet de test de votre contrat atténue les risques de sécurité des contrats intelligents et réduit le besoin d'effectuer des mises à niveau logiques complexes après le déploiement.

## Méthodes pour tester les contrats intelligents {#methods-for-testing-smart-contracts}

Les méthodes de test des contrats intelligents sur Ethereum se distinguent en deux grandes catégories : **les tests automatisés** et les **tests manuels**. Les tests automatisés et les tests manuels offrent des avantages et des compromis uniques, mais vous pouvez combiner les deux pour créer un plan solide pour l'analyse de vos contrats.

### Les tests automatisés {#automated-testing}

Les tests automatisés utilisent des outils qui vérifient automatiquement un code de contrats intelligents pour détecter des erreurs dans l'exécution. L'avantage des tests automatisés vient de l'utilisation de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) pour guider l'évaluation des fonctionnalités contractuelles. Les tests scriptés peuvent être programmés aux fins d'une exécution répétée avec une intervention humaine minimale, rendant les tests automatisés plus efficaces que les approches manuelles de test.

Les tests automatisés sont particulièrement utiles lorsque les tests sont répétitifs et prennent du temps ; difficile à exécuter manuellement ; sensible aux erreurs humaines ; ou nécessitant une évaluation des fonctions critiques du contrat. Mais les outils de test automatisés peuvent avoir des inconvénients : ils peuvent manquer certains bogues et produire beaucoup de [faux positifs](https://www.contrastsecurity.com/glossary/false-positive). Par conséquent, l'association des tests automatisés avec des tests manuels pour les contrats intelligents est idéale.

### Les tests manuels {#manual-testing}

Les tests manuels sont aidés par l'homme et impliquent l'exécution de chaque cas de test dans votre suite de tests l'un après l'autre lors de l'analyse de la justesse des contrats intelligents. Ceci est différent des tests automatisés, où vous pouvez exécuter simultanément plusieurs tests isolés sur un contrat et obtenir un rapport montrant tous les échecs et réussissant les tests.

Les tests manuels peuvent être effectués par un seul individu, suivant un plan d'essai écrit qui couvre différents scénarios d'essais. Vous pourriez également avoir plusieurs personnes ou groupes qui interagissent avec un contrat intelligent sur une période déterminée dans le cadre de tests manuels. Les testeurs compareront le comportement réel du contrat avec le comportement attendu, signalant toute différence comme un bug.

Des tests manuels efficaces requièrent des ressources considérables (compétences, temps, argent et efforts), et il est possible, en raison d'erreurs humaines, de manquer certaines erreurs lors de l'exécution des tests. Mais les tests manuels peuvent aussi être bénéfiques — par exemple, un test humain (p. ex. un vérificateur) peut utiliser l'intuition pour détecter les cas où un outil de test automatique manquerait.

## Les méthodes de test automatiques pour les contrats intelligents {#automated-testing-for-smart-contracts}

### Tests unitaires {#unit-testing-for-smart-contracts}

Les tests unitaires évaluent séparément les fonctions contractuelles et vérifient que chaque composant fonctionne correctement. Un test unitaire est simple, rapide à exécuter et donne une idée précise de ce qui s'est mal passé si le test échoue.

Les tests unitaires sont utiles pour vérifier que les fonctions retournent les valeurs attendues et que le stockage du contrat est correctement mis à jour après l'exécution de la fonction. En outre, l'exécution de tests unitaires après avoir apporté des modifications à une base de code de contrats garantit que l'ajout de nouvelles logiques n'introduit pas d'erreurs. Voici quelques directives pour exécuter des tests unitaires efficaces :

#### Lignes directrices pour le test unitaire des contrats intelligents {#unit-testing-guidelines}

##### 1. Comprendre la logique et le flux de travail de vos contrats

Avant d'écrire des tests unitaires, il aide à savoir quelles fonctionnalités un contrat intelligent offre et comment les utilisateurs accèderont et utiliseront ces fonctions. Ceci est particulièrement utile pour exécuter des [tests de chemin heureux](https://en.m.wikipedia.org/wiki/Happy_path) qui déterminent si les fonctions dans un contrat retournent la sortie correcte pour les entrées utilisateur valides. Nous allons expliquer ce concept en utilisant cet exemple (abrégé) d'[un contrat de vente aux enchères](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```
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

Il s'agit d'un simple contrat de vente aux enchères conçu pour recevoir des offres pendant la période d'enchère. Si le `highestBid` augmente, le précédent plus offrant reçoit son argent ; une fois la période d'enchères terminée, le `beneficiary` appelle le contrat pour récupérer son argent.

Les tests unitaires pour un contrat comme celui-ci couvriraient différentes fonctions qu'un utilisateur peut appeler lorsqu'il interagit avec le contrat. Il peut s'agir, par exemple, d'un test unitaire qui vérifie si un utilisateur peut placer une enchère pendant que l'enchère est en cours (c'est-à-dire que les appels à `bid()` réussissent) ou d'un test qui vérifie si un utilisateur peut placer une enchère plus élevée que le `highestBid` actuel.

Comprendre le flux de travail opérationnel d'un contrat facilite également la rédaction de tests unitaires qui vérifient si l'exécution répond aux exigences. Par exemple, le contrat d'enchère spécifie que les utilisateurs ne peuvent pas placer d'enchères une fois l'enchère terminée (c'est-à-dire lorsque `auctionEndTime` est inférieur à `block.timestamp`). Ainsi, un développeur peut exécuter un test unitaire qui vérifie si les appels à la fonction `bid()` réussissent ou échouent lorsque la vente aux enchères est terminée (à savoir, quand `auctionEndTime` > `block.timestamp`).

##### 2. Évaluer toutes les hypothèses liées à l'exécution du contrat

Il est important de documenter toutes les hypothèses concernant l'exécution d'un contrat et d'écrire des tests unitaires pour vérifier la validité de ces hypothèses. En plus d'offrir une protection contre une exécution inattendue, tester les assertions vous force à penser à des opérations qui pourraient rompre un modèle de sécurité de contrats intelligents. Une astuce utile est d'aller au-delà des « tests utilisateurs heureux » et d'écrire des tests négatifs qui vérifient si une fonction échoue pour les mauvaises entrées.

De nombreux frameworks de tests unitaires vous permettent de créer des assertions – des déclarations simples qui indiquent ce qu'un contrat peut ou ne peut pas faire – et d'exécuter des tests pour voir si ces assertions sont en cours d'exécution. Un développeur travaillant sur le contrat de vente aux enchères décrit précédemment pourrait établir les affirmations suivantes à propos de son comportement avant d'exécuter des tests négatifs :

- Les utilisateurs ne peuvent pas placer d'enchères lorsque la vente aux enchères est terminée ou n'a pas commencé.

- Le contrat de vente aux enchères se rétablit si une offre est inférieure au seuil acceptable.

- Les utilisateurs qui ne gagnent pas l'enchère sont crédités de leurs fonds

**Remarque** : Une autre façon de tester les hypothèses consiste à écrire des tests qui déclenchent des [modificateurs de fonction](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) dans un contrat, en particulier les instructions `require`, `assert` et `if…else`.

##### 3. Mesurer la couverture du code

[La couverture de code](https://en.m.wikipedia.org/wiki/Code_coverage) est une métrique de test qui suit le nombre de branches, de lignes et d'instructions dans votre code exécuté lors des tests. Les tests doivent avoir une bonne couverture du code, sinon vous risquez d'obtenir des « faux négatifs », ce qui se produit lorsqu'un contrat réussit tous les tests, mais des vulnérabilités existent toujours dans le code. L'enregistrement d'une couverture de code élevée donne toutefois l'assurance que toutes les déclarations/fonctions d'un contrat intelligent ont été suffisamment testées pour être correctes.

##### 4. Utiliser des frameworks de test bien développés

La qualité des outils utilisés pour exécuter des tests unitaires pour vos contrats intelligents est cruciale. Un framework de test idéal est celui qui est régulièrement maintenu ; fournit des fonctionnalités utiles (par ex. des capacités de journalisation et de signalement) ; et doit avoir été largement utilisé et contrôlé par d'autres développeurs.

Les frameworks de test unitaires pour les contrats intelligents Solidity sont disponibles en différents langages (principalement JavaScript, Python et Rust). Voir certains des guides ci-dessous pour plus d'informations sur la façon de commencer à exécuter des tests unitaires avec différents frameworks de test :

- **[Exécution de tests unitaires avec Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Exécution des tests unitaires avec Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Exécution de tests unitaires avec Truffe](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Exécution de tests unitaires avec Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Exécution de tests unitaires avec Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Exécution de tests unitaires avec Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Exécution de tests unitaires avec Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Tests d'intégration {#integration-testing-for-smart-contracts}

Alors que les tests unitaires déboguent les fonctions du contrat de manière isolée, les tests d'intégration évaluent les composants d'un contrat intelligent dans son ensemble. Les tests d'intégration peuvent détecter les problèmes liés aux appels intercontractuels ou aux interactions entre différentes fonctions dans le même contrat intelligent. Par exemple, les tests d'intégration peuvent aider à vérifier si des choses comme [l'héritage](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) et l'injection de dépendance fonctionnent correctement.

Les tests d'intégration sont utiles si votre contrat adopte une architecture modulaire ou des interfaces avec d'autres contrats en chaîne pendant l'exécution. Une façon d'exécuter des tests d'intégration consiste à [fourcher la blockchain](/glossary/#fork) à une hauteur spécifique (en utilisant un outil tel que [Forge](https://book.getfoundry.sh/forge/fork-testing) ou [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) et simuler les interactions entre votre contrat et les contrats déployés.

La blockchain forkée se comportera de la même manière que le réseau principal et aura des comptes avec des états et des soldes associés. Mais cela ne fonctionne que comme un environnement de développement local en bac à sable, ce qui signifie que vous n'aurez pas besoin d'un véritable ETH pour les transactions, par exemple, vos changements n'affecteront pas non plus le véritable protocole Ethereum.

### Fuzzing orienté propriétés {#property-based-testing-for-smart-contracts}

Les tests basés sur les propriétés sont le processus permettant de vérifier qu'un contrat intelligent satisfait à une propriété définie. Les propriétés affirment des faits sur le comportement d'un contrat qui devraient rester vrais dans différents scénarios. Un exemple de propriété de contrat intelligent pourrait être « Les opérations arithmétiques dans le contrat ne soupassent ou ne dépassent jamais ».

**L'analyse statique** et **l'analyse dynamique** sont deux techniques communes pour exécuter des tests basés sur la propriété, et les deux peuvent vérifier que le code d'un programme (un contrat intelligent dans ce cas) satisfait certaines propriétés prédéfinies. Certains outils de test fondés sur la propriété sont fournis avec des règles prédéfinies sur les propriétés de contrat attendues et vérifient le code par rapport à ces règles, tandis que d'autres vous permettent de créer des propriétés personnalisées pour un contrat intelligent.

#### Analyse statique {#static-analysis}

Un analyseur statique prend comme intrants le code source d'un contrat intelligent et les résultats indiquant si un contrat satisfait ou non une propriété. Contrairement à l’analyse dynamique, l’analyse statique n’implique pas d’exécuter un contrat pour l’analyser à des fins d'exactitude. L'analyse statique explique plutôt tous les chemins possibles qu'un contrat intelligent pourrait prendre pendant l'exécution (c'est-à-dire en examinant la structure du code source pour déterminer ce que cela signifierait pour l'opération des contrats à l'exécution).

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) et [tests statiques](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sont des méthodes courantes pour exécuter des analyses statiques sur des contrats. Les deux nécessitent l'analyse de représentations de bas niveau d'une exécution de contrats telles que [les arbres de syntaxe abstraits](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) et [les courbes de flux de contrôle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) sorties par le compilateur.

Dans la plupart des cas, l'analyse statique est utile pour détecter les problèmes de sécurité tels que l'utilisation de constructions non sûres, les erreurs de syntaxe, ou les violations des normes de codage dans un code de contrats. Cependant, les analyseurs statiques sont généralement peu sains lorsqu'ils détectent des vulnérabilités plus profondes et peuvent produire des faux positifs excessifs.

#### Analyse dynamique {#dynamic-analysis}

L'analyse dynamique génère des entrées symboliques (par exemple, en [exécution symbolique](https://en.m.wikipedia.org/wiki/Symbolic_execution)) ou des entrées concrètes (par ex. dans [fuzzing](https://owasp.org/www-community/Fuzzing)) vers les fonctions d'un contrat intelligent pour voir si une trace d'exécution enfreint des propriétés spécifiques. Cette forme de tests fondés sur des propriétés diffère des tests unitaires dans ces cas de tests couvrant plusieurs scénarios et un programme gère la génération de cas de test.

[Fuzzing](https://halborn.com/what-is-fuzz-testing-fuzzing/) est un exemple de technique d'analyse dynamique pour vérifier des propriétés arbitraires dans des contrats intelligents. Un fuzzer invoque des fonctions dans un contrat cible avec des variations aléatoires ou malformées d'une valeur d'input définie. Si le contrat intelligent entre un état d'erreur (par ex. où une assertion échoue), le problème est marqué et les entrées qui conduisent l'exécution vers le chemin vulnérable sont produites dans un rapport.

Le fuzzing est utile pour évaluer un mécanisme de validation des entrées des contrats intelligents car la mauvaise gestion des entrées inattendues peut entraîner une exécution imprévue et produire des effets dangereux. Cette forme de tests fondés sur les propriétés peut être idéale pour de nombreuses raisons :

1. **L'écriture de cas de test pour couvrir de nombreux scénarios est difficile.** Un test de propriété nécessite seulement que vous définissiez un comportement et une plage de données pour tester le comportement — le programme génère automatiquement des cas de test basés sur la propriété définie.

2. **Votre suite de tests ne peut pas couvrir suffisamment tous les chemins possibles dans le programme.** Même avec une couverture de 100 %, il est possible de passer à côté de cas extrêmes.

3. **Les tests unitaires prouvent qu'un contrat s'exécute correctement pour des données d'échantillon, mais si le contrat s'exécute correctement pour des entrées en dehors de l'échantillon reste inconnu.** Les tests de propriété exécutent un contrat cible avec de multiples variations d'une valeur d'entrée donnée pour trouver des traces d'exécution qui causent des défaillances d'assertion. Ainsi, un test de propriété fournit plus de garanties qu'un contrat s'exécute correctement pour une vaste classe de données d'intrants.

### Lignes directrices pour l'exécution de tests fondés sur les propriétés pour les contrats intelligents {#running-property-based-tests}

L'exécution de tests basés sur les propriétés commence généralement par la définition d'une propriété (par ex. absence de [dépassements d'entier](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) ou de collections de propriétés que vous voulez vérifier dans un contrat intelligent. Vous pouvez également avoir besoin de définir une plage de valeurs dans laquelle le programme peut générer des données pour les entrées de transaction lors de l'écriture de tests de propriété.

Une fois configuré correctement, l'outil de test de propriété exécutera vos fonctions de contrats intelligents avec des entrées générées aléatoirement. S'il y a des violations d'assertion, vous devriez obtenir un rapport avec des données d'entrée concrètes qui enfreint la propriété en cours d'évaluation. Consultez certains des guides ci-dessous pour commencer avec des tests basés sur les propriétés en cours d'exécution avec différents outils :

- **[Analyse statique des contrats intelligents avec Slither](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Analyse statique des contrats intelligents avec Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Tests fondés sur les propriétés avec Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing des contrats avec Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing des contrats avec Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Contrats de fuzzing avec Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Exécution symbolique de contrats intelligents avec Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Exécution symbolique de contrats intelligents avec Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Test manuel pour les contrats intelligents {#manual-testing-for-smart-contracts}

Les tests manuels des contrats intelligents arrivent souvent plus tard dans le cycle de développement après avoir exécuté des tests automatisés. Un système évalue le contrat intelligent comme un produit totalement intégré pour voir s'il se déroule comme spécifié dans les exigences techniques.

### Tester les contrats sur une blockchain locale {#testing-on-local-blockchain}

Alors que les tests automatisés effectués dans un environnement de développement local peuvent fournir des informations de débogage utiles, vous aimeriez savoir comment votre contrat intelligent se comporte dans un environnement de production. Cependant, le déploiement dans la chaîne principale Ethereum entraîne des frais de gaz, sans parler du fait que vous ou vos utilisateurs pouvez perdre de l'argent si votre contrat intelligent comporte toujours des bogues.

Tester votre contrat sur une blockchain locale (également connue sous le nom de [réseau de développement](/developers/docs/development-networks/)) est une alternative recommandée aux tests sur le réseau principal. Une blockchain locale est une copie de la blockchain Ethereum fonctionnant localement sur votre ordinateur qui simule le comportement de la couche d'exécution d'Ethereum. À ce titre, vous pouvez programmer des transactions pour interagir avec un contrat sans encourir de frais généraux importants.

Exécuter des contrats sur une blockchain locale pourrait être utile comme une forme de test d’intégration manuelle. [Les contrats intelligents sont hautement composables](/developers/docs/smart-contracts/composability/), vous permettant de vous intégrer aux protocoles existants, mais vous devrez quand même vous assurer que ces interactions complexes sur la chaîne produisent les bons résultats.

[En savoir plus sur les réseaux de développement.](/developers/docs/development-networks/)

### Tests de contrats sur les réseaux de test {#testing-contracts-on-testnets}

Un réseau de test fonctionne exactement comme le réseau principal d'Ethereum, sauf qu'il utilise Ether (ETH) sans valeur de monde réel. Déployer votre contrat sur un [réseau de test](/developers/docs/networks/#ethereum-testnets) signifie que n'importe qui peut interagir avec lui (par exemple, via le frontend de la DAPP) sans mettre en péril les fonds.

Cette forme de test manuel est utile pour évaluer le flux de bout en bout de votre application du point de vue de l'utilisateur. Ici, les utilisateurs finaux peuvent exécuter des essais et rapporter tous les problèmes avec la logique commerciale du contrat et les fonctionnalités générales.

Déployer sur un réseau de test après avoir testé sur une blockchain locale est idéal car la première est plus proche du comportement de la Machine virtuelle Ethereum. Par conséquent, il est fréquent que de nombreux projets Ethereum-native déploient des DApps sur des réseaux de test pour évaluer une opération de contrats intelligents dans des conditions réelles.

[En savoir plus sur les réseaux de test Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Test contre vérification formelle {#testing-vs-formal-verification}

Bien que les tests permettent de confirmer qu'un contrat renvoie les résultats attendus pour certaines entrées de données, ils ne peuvent pas prouver de manière concluante la même chose pour les entrées non utilisées lors des tests. Tester un contrat intelligent ne peut donc pas garantir « l'exactitude fonctionnelle » (c'est-à-dire qu'il ne peut pas montrer qu'un programme se comporte comme requis pour _tous_ les ensembles de valeurs d'entrée).

La vérification formelle est une approche permettant d'évaluer la justesse des logiciels en vérifiant si un modèle formel du programme correspond à la spécification formelle. Un modèle formel est une représentation mathématique abstraite d'un programme, tandis qu'une spécification formelle définit les propriétés d'un programme (c'est-à-dire des assertions logiques à propos de l'exécution du programme).

Parce que les propriétés sont écrites en termes mathématiques, il devient possible de vérifier qu'un modèle formel (mathématique) du système satisfait une spécification en utilisant des règles d'inférence logiques. Ainsi, on dit que les outils de vérification formels produisent des « preuves mathématiques » de l’exactitude d’un système.

Contrairement aux tests, la vérification formelle peut être utilisée pour vérifier qu'une exécution de contrats intelligents satisfait une spécification formelle pour _toutes les_ exécutions (c'est-à-dire qu'il n'a pas de bogues) sans avoir besoin de l'exécuter avec des exemples de données. Non seulement cela réduit le temps passé à exécuter des dizaines de tests unitaires, mais il est aussi plus efficace pour attraper des vulnérabilités cachées. Cela dit, les techniques de vérification formelle reposent sur un spectre en fonction de leur difficulté de mise en œuvre et de leur utilité.

[En savoir plus sur la vérification formelle des contrats intelligents.](/developers/docs/smart-contracts/formal-verification)

## Tester vs audits et récompenses de bugs {#testing-vs-audits-bug-bounties}

Comme mentionné, des tests rigoureux peuvent rarement garantir l'absence de bogues dans un contrat ; les approches de vérification formelle peuvent fournir des garanties plus fortes d'exactitude, mais elles sont actuellement difficiles à utiliser et entraînent des coûts considérables.

Néanmoins, vous pouvez encore augmenter la possibilité de capturer des vulnérabilités de contrat en obtenant une révision de code indépendante. [Les audits de contrats intelligents](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) et [les récompenses de bugs](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sont deux façons d'amener d'autres personnes à analyser vos contrats.

Les vérifications sont effectuées par des vérificateurs expérimentés dans la recherche de cas de défauts de sécurité et de mauvaises pratiques de développement dans les contrats intelligents. Un audit comprendra généralement des tests (et éventuellement une vérification officielle) ainsi qu'une révision manuelle de l'ensemble du codebase.

Inversement, un programme de prime aux bogues implique généralement d'offrir une récompense financière à une personne (communément décrite comme [hackers whitehat](https://en.wikipedia.org/wiki/White_hat_(computer_security))) qui découvre une vulnérabilité dans un contrat intelligent et la divulgue aux développeurs. Ces chasses à la prime ont des points communs avec les audits étant donné que les deux méthodes impliquent le recours à l'expertise de tierces personnes pour découvrir des vulnérabilités dans les contrats intelligents.

La principale différence est que les programmes de primes aux bogues sont ouverts à la communauté plus large des développeurs et des hackers et attirent une large classe de hackers éthiques et de professionnels de la sécurité indépendants possédant des compétences et une expérience uniques. Cela peut être un avantage par rapport aux audits de contrats intelligents qui reposent principalement sur des équipes qui peuvent posséder une expertise plus limitée ou étroite.

## Outils de test et bibliothèques {#testing-tools-and-libraries}

### Outils pour tests unitaires {#unit-testing-tools}

- **[couverture Solidity](https://github.com/sc-forks/solidity-coverage)** - _Outil de couverture de code pour les contrats intelligents écrits en Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework pour le développement et le test de contrats intelligents avancés (basé sur ethers.js)_.

- **[Tests de remix](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Outil pour tester les contrats intelligents Solidity. Fonctionne sous le plugin Remix IDE « Solidity Unit Testing » qui est utilisé pour écrire et exécuter des cas de test pour un contrat._

- **[Aide aux tests OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Bibliothèque d'assertions pour les tests de contrats intelligents Ethereum. Assurez-vous que vos contrats se comportent comme prévu !_

- **Cadre de test unitaire Brownie** - _Brownie utilise Pytest, un cadre de test riche en fonctionnalités qui vous permet d'écrire de petits tests avec un code minimal, qui s'adapte bien aux grands projets et qui est hautement extensible._

- **[Tests Foundy](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry propose Forge, un cadre de test Ethereum rapide et flexible capable d'exécuter des tests unitaires simples, des contrôles d'optimisation du gaz et du fuzzing de contrats._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework pour tester des contrats intelligents basés sur ethers.js, Mocha et Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _framework de développement et de test basé sur Python pour les contrats intelligents ciblant la Machine virtuelle Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Cadre basé sur Python pour les tests unitaires et le fuzzing avec de fortes capacités de débogage et la prise en charge des tests inter-chaînes, utilisant pytest et Anvil pour une meilleure expérience utilisateur et de meilleures performances._

### Outils de test fondés sur les propriétés {#property-based-testing-tools}

#### Outils d'analyse statique {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Python- Cadre d'analyse statique basé sur Solidity pour rechercher des vulnérabilités, améliorer la compréhension du code et rédiger des analyses personnalisées pour les contrats intelligents._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter pour l'application du style et des meilleures pratiques de sécurité pour le langage de programmation du contrat intelligent Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analyseur statique basé sur Rust spécifiquement conçu pour la sécurité et le développement de contrats intelligents Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - *Cadre d'analyse statique basé sur Python comprenant des détecteurs de vulnérabilité et de qualité du code, des imprimeurs permettant d'extraire des informations utiles du code et un support pour l'écriture de sous-modules personnalisés.*

#### Outils d'analyse dynamique {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer de contrat rapide pour détecter les vulnérabilités des contrats intelligents grâce à des tests basés sur les propriétés._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _ Outil de fuzzing automatisé utile pour détecter les violations de propriété dans le code des contrats intelligents._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Cadre d'exécution symbolique dynamique pour l'analyse du bytecode EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Outil d'évaluation de bytecode EVM pour détecter les vulnérabilités des contrats à l'aide de l'analyse des souillures, de l'analyse concolique et de la vérification du flux de contrôle._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble est un outil de vérification du langage de spécification et du temps d'exécution qui vous permet d'annoter des contrats intelligents avec des propriétés qui vous permettent de tester automatiquement les contrats avec des outils tels que Diligence Fuzzing ou MythX._

## Tutoriels connexes {#related-tutorials}

- [Une vue d'ensemble et une comparaison de produits de test différents](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Comment utiliser Echidna pour tester les contrats intelligents](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Comment utiliser Manticore pour trouver les bogues dans les contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Comment utiliser Slither pour trouver des bugs de contrat intelligent](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Comment simuler des contrats Solidity pour les tests](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Comment exécuter des tests unitaires dans Solidity en utilisant Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Complément d'information {#further-reading}

- [Un guide détaillé pour tester les contrats intelligents Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Comment tester les contrats intelligents ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guide de test unitaire de MolochDAO pour les développeurs](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Comment tester des contrats intelligents comme une rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
