---
title: Sécurité des contrats intelligents
description: Un aperçu des directives pour créer des contrats intelligents Ethereum sécurisés
lang: fr
---

Les contrats intelligents sont extrêmement flexibles et capables de contrôler de grandes quantités de valeur et de données, tout en exécutant une logique immuable basée sur du code déployé sur la chaîne de blocs. Cela a créé un écosystème dynamique d'applications sans tiers de confiance et décentralisées qui offrent de nombreux avantages par rapport aux systèmes traditionnels. Ils représentent également des opportunités pour les attaquants cherchant à tirer profit de l'exploitation des vulnérabilités dans les contrats intelligents.

Les chaînes de blocs publiques, comme [Ethereum](/), compliquent davantage la question de la sécurisation des contrats intelligents. Le code de contrat déployé ne peut _généralement_ pas être modifié pour corriger les failles de sécurité, tandis que les actifs volés dans les contrats intelligents sont extrêmement difficiles à tracer et pour la plupart irrécupérables en raison de l'immuabilité.

Bien que les chiffres varient, on estime que le montant total de la valeur volée ou perdue en raison de défauts de sécurité dans les contrats intelligents dépasse facilement le milliard de dollars. Cela inclut des incidents très médiatisés, tels que le [piratage de la DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 millions d'ETH volés, d'une valeur de plus d'un milliard de dollars aux prix actuels), le [piratage du portefeuille multi-signature Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 millions de dollars perdus au profit de pirates informatiques), et le [problème de portefeuille gelé Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (plus de 300 millions de dollars en ETH bloqués à jamais).

Les problèmes susmentionnés rendent impératif pour les développeurs d'investir des efforts dans la création de contrats intelligents sécurisés, robustes et résilients. La sécurité des contrats intelligents est une affaire sérieuse, que chaque développeur aurait tout intérêt à apprendre. Ce guide couvrira les considérations de sécurité pour les développeurs Ethereum et explorera les ressources permettant d'améliorer la sécurité des contrats intelligents.

## Prérequis {#prerequisites}

Assurez-vous de bien connaître les [fondamentaux du développement de contrats intelligents](/developers/docs/smart-contracts/) avant d'aborder la sécurité.

## Lignes directrices pour la création de contrats intelligents Ethereum sécurisés {#smart-contract-security-guidelines}

### 1. Concevoir des contrôles d'accès appropriés {#design-proper-access-controls}

Dans les contrats intelligents, les fonctions marquées `public` ou `external` peuvent être appelées par n'importe quels comptes détenus par des tiers (EOA) ou comptes de contrat. Spécifier une visibilité publique pour les fonctions est nécessaire si vous souhaitez que d'autres interagissent avec votre contrat. Cependant, les fonctions marquées `private` ne peuvent être appelées que par des fonctions au sein du contrat intelligent, et non par des comptes externes. Donner à chaque participant du réseau l'accès aux fonctions du contrat peut causer des problèmes, surtout si cela signifie que n'importe qui peut effectuer des opérations sensibles (par exemple, la frappe de nouveaux jetons).

Pour empêcher l'utilisation non autorisée des fonctions du contrat intelligent, il est nécessaire de mettre en œuvre des contrôles d'accès sécurisés. Les mécanismes de contrôle d'accès restreignent la capacité d'utiliser certaines fonctions dans un contrat intelligent aux entités approuvées, telles que les comptes responsables de la gestion du contrat. Le **modèle Ownable** et le **contrôle basé sur les rôles** sont deux modèles utiles pour mettre en œuvre le contrôle d'accès dans les contrats intelligents :

#### Modèle Ownable {#ownable-pattern}

Dans le modèle Ownable, une adresse est définie comme le « propriétaire » du contrat pendant le processus de création du contrat. Les fonctions protégées se voient attribuer un modificateur `OnlyOwner`, ce qui garantit que le contrat authentifie l'identité de l'adresse appelante avant d'exécuter la fonction. Les appels aux fonctions protégées provenant d'autres adresses que celle du propriétaire du contrat sont toujours annulés, empêchant ainsi tout accès indésirable.

#### Contrôle d'accès basé sur les rôles {#role-based-access-control}

L'enregistrement d'une seule adresse en tant que `Owner` dans un contrat intelligent introduit le risque de centralisation et représente un point de défaillance unique. Si les clés du compte du propriétaire sont compromises, les attaquants peuvent attaquer le contrat possédé. C'est pourquoi l'utilisation d'un modèle de contrôle d'accès basé sur les rôles avec plusieurs comptes administratifs peut être une meilleure option.

Dans le contrôle d'accès basé sur les rôles, l'accès aux fonctions sensibles est réparti entre un ensemble de participants de confiance. Par exemple, un compte peut être responsable de la frappe de jetons, tandis qu'un autre compte effectue des mises à niveau ou met le contrat en pause. Décentraliser le contrôle d'accès de cette manière élimine les points de défaillance uniques et réduit les hypothèses de confiance pour les utilisateurs.

##### Utilisation de portefeuilles multi-signatures {#use-require-assert-revert}

Une autre approche pour mettre en œuvre un contrôle d'accès sécurisé consiste à utiliser un [compte multi-signature](/developers/docs/smart-contracts/#multisig) pour gérer un contrat. Contrairement à un EOA classique, les comptes multi-signatures sont détenus par plusieurs entités et nécessitent les signatures d'un nombre minimum de comptes — disons 3 sur 5 — pour exécuter des transactions.

L'utilisation d'un multisig pour le contrôle d'accès introduit une couche de sécurité supplémentaire puisque les actions sur le contrat cible nécessitent le consentement de plusieurs parties. Ceci est particulièrement utile si l'utilisation du modèle Ownable est nécessaire, car cela rend plus difficile pour un attaquant ou un initié malveillant de manipuler les fonctions sensibles du contrat à des fins malveillantes.

### 2. Utiliser les instructions require(), assert() et revert() pour protéger les opérations du contrat {#test-smart-contracts-and-verify-code-correctness}

Comme mentionné, n'importe qui peut appeler des fonctions publiques dans votre contrat intelligent une fois qu'il est déployé sur la chaîne de blocs. Puisque vous ne pouvez pas savoir à l'avance comment les comptes externes interagiront avec un contrat, il est idéal de mettre en place des garanties internes contre les opérations problématiques avant le déploiement. Vous pouvez imposer un comportement correct dans les contrats intelligents en utilisant les instructions `require()`, `assert()` et `revert()` pour déclencher des exceptions et annuler les changements d'état si l'exécution ne satisfait pas à certaines exigences.

**`require()`** : Les `require` sont définis au début des fonctions et garantissent que des conditions prédéfinies sont remplies avant que la fonction appelée ne soit exécutée. Une instruction `require` peut être utilisée pour valider les entrées de l'utilisateur, vérifier les variables d'état ou authentifier l'identité du compte appelant avant de poursuivre avec une fonction.

**`assert()`** : `assert()` est utilisé pour détecter les erreurs internes et vérifier les violations d'« invariants » dans votre code. Un invariant est une assertion logique concernant l'état d'un contrat qui devrait rester vraie pour toutes les exécutions de fonctions. Un exemple d'invariant est l'offre totale maximale ou le solde d'un contrat de jeton. L'utilisation de `assert()` garantit que votre contrat n'atteint jamais un état vulnérable, et si c'est le cas, toutes les modifications apportées aux variables d'état sont annulées.

**`revert()`** : `revert()` peut être utilisé dans une instruction if-else qui déclenche une exception si la condition requise n'est pas satisfaite. L'exemple de contrat ci-dessous utilise `revert()` pour protéger l'exécution des fonctions :

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Effectuer l'achat.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Tester les contrats intelligents et vérifier l'exactitude du code {#get-independent-code-reviews}

L'immuabilité du code s'exécutant dans la [Machine Virtuelle Ethereum](/developers/docs/evm/) signifie que les contrats intelligents exigent un niveau plus élevé d'évaluation de la qualité pendant la phase de développement. Tester votre contrat de manière approfondie et l'observer pour détecter tout résultat inattendu améliorera considérablement la sécurité et protégera vos utilisateurs à long terme.

La méthode habituelle consiste à écrire de petits tests unitaires en utilisant des données fictives que le contrat est censé recevoir des utilisateurs. Les [tests unitaires](/developers/docs/smart-contracts/testing/#unit-testing) sont utiles pour tester la fonctionnalité de certaines fonctions et s'assurer qu'un contrat intelligent fonctionne comme prévu.

Malheureusement, les tests unitaires sont peu efficaces pour améliorer la sécurité des contrats intelligents lorsqu'ils sont utilisés de manière isolée. Un test unitaire peut prouver qu'une fonction s'exécute correctement pour des données fictives, mais les tests unitaires ne sont aussi efficaces que les tests qui sont écrits. Cela rend difficile la détection des cas limites manqués et des vulnérabilités qui pourraient compromettre la sécurité de votre contrat intelligent.

Une meilleure approche consiste à combiner les tests unitaires avec des tests basés sur les propriétés effectués à l'aide d'une [analyse statique et dynamique](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analyse statique s'appuie sur des représentations de bas niveau, telles que les [graphes de flux de contrôle](https://en.wikipedia.org/wiki/Control-flow_graph) et les [arbres syntaxiques abstraits](https://deepsource.io/glossary/ast/) pour analyser les états de programme et les chemins d'exécution accessibles. Pendant ce temps, les techniques d'analyse dynamique, telles que le [fuzzing de contrats intelligents](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), exécutent le code du contrat avec des valeurs d'entrée aléatoires pour détecter les opérations qui violent les propriétés de sécurité.

La [vérification formelle](/developers/docs/smart-contracts/formal-verification) est une autre technique pour vérifier les propriétés de sécurité dans les contrats intelligents. Contrairement aux tests réguliers, la vérification formelle peut prouver de manière concluante l'absence d'erreurs dans un contrat intelligent. Ceci est réalisé en créant une spécification formelle qui capture les propriétés de sécurité souhaitées et en prouvant qu'un modèle formel des contrats adhère à cette spécification.

### 4. Demander un examen indépendant de votre code {#audits}

Après avoir testé votre contrat, il est bon de demander à d'autres de vérifier le code source pour détecter d'éventuels problèmes de sécurité. Les tests ne découvriront pas toutes les failles d'un contrat intelligent, mais obtenir un examen indépendant augmente la possibilité de repérer des vulnérabilités.

#### Audits {#bug-bounties}

Commander un audit de contrat intelligent est une façon de mener un examen de code indépendant. Les auditeurs jouent un rôle important pour s'assurer que les contrats intelligents sont sécurisés et exempts de défauts de qualité et d'erreurs de conception.

Cela dit, vous devriez éviter de considérer les audits comme une solution miracle. Les audits de contrats intelligents ne détecteront pas tous les bugs et sont principalement conçus pour fournir une série d'examens supplémentaires, ce qui peut aider à détecter les problèmes manqués par les développeurs lors du développement et des tests initiaux. Vous devriez également suivre les meilleures pratiques pour travailler avec les auditeurs, telles que documenter correctement le code et ajouter des commentaires en ligne, afin de maximiser les avantages d'un audit de contrat intelligent.

- [Trucs et astuces pour l'audit de contrats intelligents](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Tirer le meilleur parti de votre audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Primes aux bugs (Bug bounties) {#follow-smart-contract-development-best-practices}

La mise en place d'un programme de primes aux bugs est une autre approche pour mettre en œuvre des examens de code externes. Une prime aux bugs est une récompense financière accordée aux individus (généralement des hackers éthiques) qui découvrent des vulnérabilités dans une application.

Lorsqu'elles sont utilisées correctement, les primes aux bugs incitent les membres de la communauté des hackers à inspecter votre code à la recherche de failles critiques. Un exemple concret est le « bug de l'argent infini » qui aurait permis à un attaquant de créer une quantité illimitée d'ether sur [Optimism](https://www.optimism.io/), un protocole de [couche 2 (l2)](/layer-2/) fonctionnant sur Ethereum. Heureusement, un hacker éthique a [découvert la faille](https://www.saurik.com/optimism.html) et a informé l'équipe, [gagnant une somme importante au passage](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Une stratégie utile consiste à fixer le paiement d'un programme de primes aux bugs proportionnellement au montant des fonds en jeu. Décrite comme la « [prime aux bugs évolutive](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) », cette approche offre des incitations financières aux individus pour qu'ils divulguent de manière responsable les vulnérabilités au lieu de les exploiter.

### 5. Suivre les meilleures pratiques lors du développement de contrats intelligents {#implement-disaster-recovery-plans}

L'existence d'audits et de primes aux bugs ne vous dispense pas de votre responsabilité d'écrire un code de haute qualité. Une bonne sécurité des contrats intelligents commence par le respect de processus de conception et de développement appropriés :

- Stocker tout le code dans un système de contrôle de version, tel que git

- Effectuer toutes les modifications de code via des pull requests

- S'assurer que les pull requests ont au moins un examinateur indépendant — si vous travaillez seul sur un projet, envisagez de trouver d'autres développeurs et d'échanger des examens de code

- Utiliser un [environnement de développement](/developers/docs/frameworks/) pour les tests, la compilation et le déploiement de contrats intelligents

- Passer votre code au crible d'outils d'analyse de code de base, tels que [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril et Slither. Idéalement, vous devriez le faire avant que chaque pull request ne soit fusionnée et comparer les différences dans les résultats

- S'assurer que votre code se compile sans erreurs et que le compilateur Solidity n'émet aucun avertissement

- Documenter correctement votre code (en utilisant [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) et décrire les détails de l'architecture du contrat dans un langage facile à comprendre. Cela facilitera l'audit et l'examen de votre code par d'autres personnes.

### 6. Mettre en œuvre des plans de reprise après sinistre robustes {#contract-upgrades}

La conception de contrôles d'accès sécurisés, la mise en œuvre de modificateurs de fonctions et d'autres suggestions peuvent améliorer la sécurité des contrats intelligents, mais elles ne peuvent exclure la possibilité d'exploits malveillants. La création de contrats intelligents sécurisés nécessite de « se préparer à l'échec » et d'avoir un plan de secours pour répondre efficacement aux attaques. Un plan de reprise après sinistre approprié intégrera tout ou partie des composants suivants :

#### Mises à niveau de contrat {#emergency-stops}

Bien que les contrats intelligents Ethereum soient immuables par défaut, il est possible d'atteindre un certain degré de mutabilité en utilisant des modèles de mise à niveau. La mise à niveau des contrats est nécessaire dans les cas où une faille critique rend votre ancien contrat inutilisable et où le déploiement d'une nouvelle logique est l'option la plus réalisable.

Les mécanismes de mise à niveau de contrat fonctionnent différemment, mais le « modèle proxy » est l'une des approches les plus populaires pour mettre à niveau les contrats intelligents. Les [modèles proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) divisent l'état et la logique d'une application entre _deux_ contrats. Le premier contrat (appelé « contrat proxy ») stocke les variables d'état (par exemple, les soldes des utilisateurs), tandis que le deuxième contrat (appelé « contrat logique ») contient le code pour exécuter les fonctions du contrat.

Les comptes interagissent avec le contrat proxy, qui répartit tous les appels de fonction vers le contrat logique en utilisant l'appel de bas niveau [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Contrairement à un appel de message régulier, `delegatecall()` garantit que le code s'exécutant à l'adresse du contrat logique est exécuté dans le contexte du contrat appelant. Cela signifie que le contrat logique écrira toujours dans le stockage du proxy (au lieu de son propre stockage) et que les valeurs d'origine de `msg.sender` et `msg.value` sont préservées.

La délégation d'appels au contrat logique nécessite de stocker son adresse dans le stockage du contrat proxy. Par conséquent, la mise à niveau de la logique du contrat n'est qu'une question de déploiement d'un autre contrat logique et de stockage de la nouvelle adresse dans le contrat proxy. Comme les appels ultérieurs au contrat proxy sont automatiquement acheminés vers le nouveau contrat logique, vous auriez « mis à niveau » le contrat sans réellement modifier le code.

[En savoir plus sur la mise à niveau des contrats](/developers/docs/smart-contracts/upgrading/).

#### Arrêts d'urgence {#event-monitoring}

Comme mentionné, des audits et des tests approfondis ne peuvent pas découvrir tous les bugs dans un contrat intelligent. Si une vulnérabilité apparaît dans votre code après le déploiement, la corriger est impossible puisque vous ne pouvez pas modifier le code s'exécutant à l'adresse du contrat. De plus, les mécanismes de mise à niveau (par exemple, les modèles proxy) peuvent prendre du temps à mettre en œuvre (ils nécessitent souvent l'approbation de différentes parties), ce qui ne donne aux attaquants que plus de temps pour causer plus de dégâts.

L'option nucléaire consiste à mettre en œuvre une fonction d'« arrêt d'urgence » qui bloque les appels aux fonctions vulnérables dans un contrat. Les arrêts d'urgence comprennent généralement les composants suivants :

1. Une variable booléenne globale indiquant si le contrat intelligent est dans un état arrêté ou non. Cette variable est définie sur `false` lors de la configuration du contrat, mais passera à `true` une fois le contrat arrêté.

2. Des fonctions qui font référence à la variable booléenne dans leur exécution. Ces fonctions sont accessibles lorsque le contrat intelligent n'est pas arrêté, et deviennent inaccessibles lorsque la fonction d'arrêt d'urgence est déclenchée.

3. Une entité qui a accès à la fonction d'arrêt d'urgence, qui définit la variable booléenne sur `true`. Pour empêcher les actions malveillantes, les appels à cette fonction peuvent être restreints à une adresse de confiance (par exemple, le propriétaire du contrat).

Une fois que le contrat active l'arrêt d'urgence, certaines fonctions ne pourront plus être appelées. Ceci est réalisé en enveloppant des fonctions sélectionnées dans un modificateur qui fait référence à la variable globale. Voici [un exemple](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) décrivant une implémentation de ce modèle dans les contrats :

```solidity
// Ce code n'a pas été audité professionnellement et ne donne aucune garantie de sécurité ou d'exactitude. À utiliser à vos propres risques.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Vérifier l'autorisation de msg.sender ici
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // La logique de dépôt s'effectue ici
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Le retrait d'urgence s'effectue ici
    }
}
```

Cet exemple montre les caractéristiques de base des arrêts d'urgence :

- `isStopped` est un booléen qui s'évalue à `false` au début et à `true` lorsque le contrat entre en mode d'urgence.

- Les modificateurs de fonction `onlyWhenStopped` et `stoppedInEmergency` vérifient la variable `isStopped`. `stoppedInEmergency` est utilisé pour contrôler les fonctions qui devraient être inaccessibles lorsque le contrat est vulnérable (par exemple, `deposit()`). Les appels à ces fonctions seront simplement annulés.

`onlyWhenStopped` est utilisé pour les fonctions qui devraient pouvoir être appelées en cas d'urgence (par exemple, `emergencyWithdraw()`). De telles fonctions peuvent aider à résoudre la situation, d'où leur exclusion de la liste des « fonctions restreintes ».

L'utilisation d'une fonctionnalité d'arrêt d'urgence fournit une solution de fortune efficace pour faire face aux vulnérabilités graves de votre contrat intelligent. Cependant, cela augmente la nécessité pour les utilisateurs de faire confiance aux développeurs pour ne pas l'activer à des fins personnelles. À cette fin, décentraliser le contrôle de l'arrêt d'urgence en le soumettant à un mécanisme de vote onchain, à un verrouillage temporel (timelock) ou à l'approbation d'un portefeuille multisig sont des solutions possibles.

#### Surveillance des événements {#design-secure-governance-systems}

Les [événements](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) vous permettent de suivre les appels aux fonctions du contrat intelligent et de surveiller les modifications des variables d'état. Il est idéal de programmer votre contrat intelligent pour émettre un événement chaque fois qu'une partie prend une action critique pour la sécurité (par exemple, le retrait de fonds).

La journalisation des événements et leur surveillance hors chaîne fournissent des informations sur les opérations du contrat et aident à une découverte plus rapide des actions malveillantes. Cela signifie que votre équipe peut réagir plus rapidement aux piratages et prendre des mesures pour atténuer l'impact sur les utilisateurs, comme la mise en pause de fonctions ou l'exécution d'une mise à niveau.

Vous pouvez également opter pour un outil de surveillance prêt à l'emploi qui transmet automatiquement des alertes chaque fois que quelqu'un interagit avec vos contrats. Ces outils vous permettront de créer des alertes personnalisées basées sur différents déclencheurs, tels que le volume de transactions, la fréquence des appels de fonction ou les fonctions spécifiques impliquées. Par exemple, vous pourriez programmer une alerte qui se déclenche lorsque le montant retiré en une seule transaction dépasse un seuil particulier.

### 7. Concevoir des systèmes de gouvernance sécurisés {#reduce-code-complexity}

Vous souhaiterez peut-être décentraliser votre application en confiant le contrôle des contrats intelligents de base aux membres de la communauté. Dans ce cas, le système de contrat intelligent inclura un module de gouvernance — un mécanisme qui permet aux membres de la communauté d'approuver des actions administratives via un système de gouvernance onchain. Par exemple, une proposition de mise à niveau d'un contrat proxy vers une nouvelle implémentation peut être soumise au vote des détenteurs de jetons.

La gouvernance décentralisée peut être bénéfique, en particulier parce qu'elle aligne les intérêts des développeurs et des utilisateurs finaux. Néanmoins, les mécanismes de gouvernance des contrats intelligents peuvent introduire de nouveaux risques s'ils sont mis en œuvre de manière incorrecte. Un scénario plausible est celui où un attaquant acquiert un énorme pouvoir de vote (mesuré en nombre de jetons détenus) en contractant un [prêt éclair](/defi/#flash-loans) et fait passer une proposition malveillante.

Une façon de prévenir les problèmes liés à la gouvernance onchain est d'[utiliser un verrouillage temporel (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un verrouillage temporel empêche un contrat intelligent d'exécuter certaines actions jusqu'à ce qu'un laps de temps spécifique se soit écoulé. D'autres stratégies incluent l'attribution d'un « poids de vote » à chaque jeton en fonction de la durée pendant laquelle il a été verrouillé, ou la mesure du pouvoir de vote d'une adresse à une période historique (par exemple, 2 à 3 blocs dans le passé) au lieu du bloc actuel. Les deux méthodes réduisent la possibilité d'amasser rapidement un pouvoir de vote pour faire basculer les votes onchain.

En savoir plus sur la [conception de systèmes de gouvernance sécurisés](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), les [différents mécanismes de vote dans les DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) et [les vecteurs d'attaque DAO courants tirant parti de la DeFi](https://dacian.me/dao-governance-defi-attacks) dans les liens partagés.

### 8. Réduire la complexité du code au minimum {#mitigate-common-smart-contract-vulnerabilities}

Les développeurs de logiciels traditionnels connaissent bien le principe KISS (« keep it simple, stupid »), qui déconseille d'introduire une complexité inutile dans la conception de logiciels. Cela fait suite à l'idée de longue date selon laquelle « les systèmes complexes échouent de manière complexe » et sont plus susceptibles de commettre des erreurs coûteuses.

Garder les choses simples est d'une importance particulière lors de la rédaction de contrats intelligents, étant donné que les contrats intelligents contrôlent potentiellement de grandes quantités de valeur. Une astuce pour atteindre la simplicité lors de la rédaction de contrats intelligents consiste à réutiliser les bibliothèques existantes, telles que les [contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), dans la mesure du possible. Étant donné que ces bibliothèques ont été largement auditées et testées par des développeurs, leur utilisation réduit les risques d'introduire des bugs en écrivant de nouvelles fonctionnalités à partir de zéro.

Un autre conseil courant est d'écrire de petites fonctions et de garder les contrats modulaires en divisant la logique métier sur plusieurs contrats. Non seulement l'écriture d'un code plus simple réduit la surface d'attaque dans un contrat intelligent, mais elle facilite également le raisonnement sur l'exactitude du système global et la détection précoce d'éventuelles erreurs de conception.

### 9. Se défendre contre les vulnérabilités courantes des contrats intelligents {#reentrancy}

#### Réentrance {#integer-underflows-and-overflows}

L'EVM ne permet pas la concurrence, ce qui signifie que deux contrats impliqués dans un appel de message ne peuvent pas s'exécuter simultanément. Un appel externe met en pause l'exécution et la mémoire du contrat appelant jusqu'au retour de l'appel, moment auquel l'exécution se poursuit normalement. Ce processus peut être formellement décrit comme le transfert du [flux de contrôle](https://www.computerhope.com/jargon/c/contflow.htm) à un autre contrat.

Bien que généralement inoffensif, le transfert du flux de contrôle à des contrats non fiables peut causer des problèmes, tels que la réentrance. Une attaque de réentrance se produit lorsqu'un contrat malveillant rappelle un contrat vulnérable avant que l'invocation de la fonction d'origine ne soit terminée. Ce type d'attaque s'explique mieux par un exemple.

Considérez un contrat intelligent simple (« Victime ») qui permet à quiconque de déposer et de retirer de l'ether :

```solidity
// Ce contrat est vulnérable. Ne pas utiliser en production

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Ce contrat expose une fonction `withdraw()` pour permettre aux utilisateurs de retirer des ETH précédemment déposés dans le contrat. Lors du traitement d'un retrait, le contrat effectue les opérations suivantes :

1. Vérifie le solde en ETH de l'utilisateur
2. Envoie des fonds à l'adresse appelante
3. Réinitialise son solde à 0, empêchant ainsi des retraits supplémentaires de la part de l'utilisateur

La fonction `withdraw()` dans le contrat `Victim` suit un modèle « vérifications-interactions-effets » (checks-interactions-effects). Elle _vérifie_ si les conditions nécessaires à l'exécution sont satisfaites (c'est-à-dire que l'utilisateur a un solde en ETH positif) et effectue l'_interaction_ en envoyant des ETH à l'adresse de l'appelant, avant d'appliquer les _effets_ de la transaction (c'est-à-dire en réduisant le solde de l'utilisateur).

Si `withdraw()` est appelé depuis un compte détenu par un tiers (EOA), la fonction s'exécute comme prévu : `msg.sender.call.value()` envoie des ETH à l'appelant. Cependant, si `msg.sender` est un compte de contrat intelligent qui appelle `withdraw()`, l'envoi de fonds à l'aide de `msg.sender.call.value()` déclenchera également l'exécution du code stocké à cette adresse.

Imaginez que ce soit le code déployé à l'adresse du contrat :

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Ce contrat est conçu pour faire trois choses :

1. Accepter un dépôt d'un autre compte (probablement l'EOA de l'attaquant)
2. Déposer 1 ETH dans le contrat Victime
3. Retirer le 1 ETH stocké dans le contrat intelligent

Il n'y a rien de mal ici, sauf que `Attacker` a une autre fonction qui appelle à nouveau `withdraw()` dans `Victim` si le gaz restant de l'appel entrant `msg.sender.call.value` est supérieur à 40 000. Cela donne à `Attacker` la possibilité de réentrer dans `Victim` et de retirer plus de fonds _avant_ que la première invocation de `withdraw` ne soit terminée. Le cycle ressemble à ceci :

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

En résumé, comme le solde de l'appelant n'est pas mis à 0 tant que l'exécution de la fonction n'est pas terminée, les invocations ultérieures réussiront et permettront à l'appelant de retirer son solde plusieurs fois. Ce type d'attaque peut être utilisé pour vider un contrat intelligent de ses fonds, comme ce qui s'est passé lors du [piratage de la DAO en 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Les attaques de réentrance sont encore aujourd'hui un problème critique pour les contrats intelligents, comme le montrent les [listes publiques d'exploits de réentrance](https://github.com/pcaversaccio/reentrancy-attacks).

##### Comment prévenir les attaques de réentrance {#oracle-manipulation}

Une approche pour faire face à la réentrance consiste à suivre le [modèle vérifications-effets-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Ce modèle ordonne l'exécution des fonctions de manière à ce que le code qui effectue les vérifications nécessaires avant de poursuivre l'exécution vienne en premier, suivi du code qui manipule l'état du contrat, le code qui interagit avec d'autres contrats ou EOA arrivant en dernier.

Le modèle vérifications-effets-interactions est utilisé dans une version révisée du contrat `Victim` illustrée ci-dessous :

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Ce contrat effectue une _vérification_ sur le solde de l'utilisateur, applique les _effets_ de la fonction `withdraw()` (en réinitialisant le solde de l'utilisateur à 0), et procède à l'_interaction_ (envoi d'ETH à l'adresse de l'utilisateur). Cela garantit que le contrat met à jour son stockage avant l'appel externe, éliminant ainsi la condition de réentrance qui a permis la première attaque. Le contrat `Attacker` pourrait toujours rappeler `NoLongerAVictim`, mais comme `balances[msg.sender]` a été mis à 0, les retraits supplémentaires généreront une erreur.

Une autre option consiste à utiliser un verrou d'exclusion mutuelle (communément appelé « mutex ») qui verrouille une partie de l'état d'un contrat jusqu'à ce qu'une invocation de fonction soit terminée. Ceci est mis en œuvre à l'aide d'une variable booléenne qui est définie sur `true` avant l'exécution de la fonction et revient à `false` une fois l'invocation terminée. Comme on le voit dans l'exemple ci-dessous, l'utilisation d'un mutex protège une fonction contre les appels récursifs pendant que l'invocation d'origine est toujours en cours de traitement, arrêtant efficacement la réentrance.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Cette fonction est protégée par un mutex, les appels réentrants depuis `msg.sender.call` ne peuvent donc pas appeler `withdraw` à nouveau.
    //  L'instruction `return` est évaluée à `true` mais évalue tout de même l'instruction `locked = false` dans le modificateur
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Vous pouvez également utiliser un système de [paiements tirés (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) qui oblige les utilisateurs à retirer des fonds des contrats intelligents, au lieu d'un système de « paiements poussés » (push payments) qui envoie des fonds aux comptes. Cela supprime la possibilité de déclencher par inadvertance du code à des adresses inconnues (et peut également prévenir certaines attaques par déni de service).

#### Dépassements de capacité inférieurs et supérieurs d'entiers {#smart-contract-security-resources-for-developers}

Un dépassement de capacité (overflow) d'entier se produit lorsque les résultats d'une opération arithmétique se situent en dehors de la plage de valeurs acceptable, ce qui la fait « basculer » vers la valeur représentable la plus basse. Par exemple, un `uint8` ne peut stocker que des valeurs allant jusqu'à 2^8-1=255. Les opérations arithmétiques qui aboutissent à des valeurs supérieures à `255` provoqueront un dépassement de capacité et réinitialiseront `uint` à `0`, de la même manière que le compteur kilométrique d'une voiture se réinitialise à 0 une fois qu'il atteint le kilométrage maximum (999999).

Les dépassements de capacité inférieurs (underflows) d'entiers se produisent pour des raisons similaires : les résultats d'une opération arithmétique tombent en dessous de la plage acceptable. Supposons que vous essayiez de décrémenter `0` dans un `uint8`, le résultat basculerait simplement vers la valeur représentable maximale (`255`).

Les dépassements de capacité supérieurs et inférieurs d'entiers peuvent tous deux entraîner des modifications inattendues des variables d'état d'un contrat et aboutir à une exécution non planifiée. Voici un exemple montrant comment un attaquant peut exploiter un dépassement de capacité arithmétique dans un contrat intelligent pour effectuer une opération non valide :

```
pragma solidity ^0.7.6;

// Ce contrat est conçu pour agir comme un coffre-fort temporel.
// L'utilisateur peut déposer dans ce contrat mais ne peut pas retirer pendant au moins une semaine.
// L'utilisateur peut également prolonger le temps d'attente au-delà de la période d'attente d'une semaine.

/*
1. Déployer TimeLock
2. Déployer Attack avec l'adresse de TimeLock
3. Appeler Attack.attack en envoyant 1 ether. Vous pourrez immédiatement
   retirer votre ether.

Que s'est-il passé ?
Attack a provoqué un dépassement de capacité de TimeLock.lockTime et a pu retirer
avant la période d'attente d'une semaine.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        si t = temps de verrouillage actuel alors nous devons trouver x tel que
        x + t = 2**256 = 0
        donc x = -t
        2**256 = type(uint).max + 1
        donc x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Comment prévenir les dépassements de capacité inférieurs et supérieurs d'entiers {#code-analysis-tools}

À partir de la version 0.8.0, le compilateur Solidity rejette le code qui entraîne des dépassements de capacité inférieurs et supérieurs d'entiers. Cependant, les contrats compilés avec une version de compilateur inférieure doivent soit effectuer des vérifications sur les fonctions impliquant des opérations arithmétiques, soit utiliser une bibliothèque (par exemple, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) qui vérifie les dépassements de capacité inférieurs/supérieurs.

#### Manipulation d'oracle {#smart-contract-monitoring-tools}

Les [oracles](/developers/docs/oracles/) s'approvisionnent en informations hors chaîne et les envoient onchain pour que les contrats intelligents les utilisent. Avec les oracles, vous pouvez concevoir des contrats intelligents qui interagissent avec des systèmes hors chaîne, tels que les marchés de capitaux, élargissant considérablement leur application.

Mais si l'oracle est corrompu et envoie des informations incorrectes onchain, les contrats intelligents s'exécuteront sur la base d'entrées erronées, ce qui peut causer des problèmes. C'est la base du « problème de l'oracle », qui concerne la tâche de s'assurer que les informations provenant d'un oracle de blockchain sont exactes, à jour et opportunes.

Un problème de sécurité connexe est l'utilisation d'un oracle onchain, tel qu'un échange décentralisé, pour obtenir le prix au comptant d'un actif. Les plateformes de prêt dans l'industrie de la [finance décentralisée (DeFi)](/defi/) le font souvent pour déterminer la valeur du collatéral d'un utilisateur afin de déterminer combien il peut emprunter.

Les prix des DEX sont souvent précis, en grande partie grâce aux arbitragistes qui rétablissent la parité sur les marchés. Cependant, ils sont ouverts à la manipulation, en particulier si l'oracle onchain calcule les prix des actifs en fonction des modèles de négociation historiques (comme c'est généralement le cas).

Par exemple, un attaquant pourrait gonfler artificiellement le prix au comptant d'un actif en contractant un prêt éclair juste avant d'interagir avec votre contrat de prêt. Interroger le DEX pour le prix de l'actif renverrait une valeur plus élevée que la normale (en raison de l'important « ordre d'achat » de l'attaquant faussant la demande pour l'actif), lui permettant d'emprunter plus qu'il ne le devrait. De telles « attaques par prêt éclair » ont été utilisées pour exploiter la dépendance aux oracles de prix parmi les applications DeFi, coûtant aux protocoles des millions en fonds perdus.

##### Comment prévenir la manipulation d'oracle {#smart-contract-administration-tools}

L'exigence minimale pour [éviter la manipulation d'oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) est d'utiliser un réseau d'oracles décentralisé qui interroge des informations provenant de sources multiples pour éviter les points de défaillance uniques. Dans la plupart des cas, les oracles décentralisés ont des incitations cryptoéconomiques intégrées pour encourager les nœuds d'oracle à rapporter des informations correctes, ce qui les rend plus sécurisés que les oracles centralisés.

Si vous prévoyez d'interroger un oracle onchain pour les prix des actifs, envisagez d'en utiliser un qui met en œuvre un mécanisme de prix moyen pondéré dans le temps (TWAP). Un [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroge le prix d'un actif à deux moments différents (que vous pouvez modifier) et calcule le prix au comptant en fonction de la moyenne obtenue. Le choix de périodes plus longues protège votre protocole contre la manipulation des prix, car les ordres importants exécutés récemment ne peuvent pas avoir d'impact sur les prix des actifs.

## Ressources de sécurité des contrats intelligents pour les développeurs {#smart-contract-auditing-services}

### Outils pour analyser les contrats intelligents et vérifier l'exactitude du code {#bug-bounty-platforms}

- **[Outils et bibliothèques de test](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Collection d'outils et de bibliothèques standards de l'industrie pour effectuer des tests unitaires, des analyses statiques et des analyses dynamiques sur les contrats intelligents._

- **[Outils de vérification formelle](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Outils pour vérifier l'exactitude fonctionnelle des contrats intelligents et contrôler les invariants._

- **[Services d'audit de contrats intelligents](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liste d'organisations fournissant des services d'audit de contrats intelligents pour les projets de développement Ethereum._

- **[Plateformes de primes aux bugs](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plateformes pour coordonner les primes aux bugs (bug bounties) et récompenser la divulgation responsable de vulnérabilités critiques dans les contrats intelligents._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Un outil en ligne gratuit pour vérifier toutes les informations disponibles concernant un contrat ayant subi un fork._

- **[ABI Encoder](https://abi.hashex.org/)** - _Un service en ligne gratuit pour encoder les fonctions de votre contrat Solidity et les arguments du constructeur._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analyseur statique Solidity, parcourant les arbres de syntaxe abstraite (AST) pour identifier les vulnérabilités suspectées et affichant les problèmes dans un format markdown facile à lire._

### Outils pour surveiller les contrats intelligents {#common-smart-contract-vulnerabilities-and-exploits}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Un outil pour recevoir des notifications en temps réel lorsque des événements inhabituels ou inattendus se produisent sur vos contrats intelligents ou portefeuilles._

### Outils pour l'administration sécurisée des contrats intelligents {#challenges-for-learning-smart-contract-security}

- **[Safe](https://safe.global/)** - _Portefeuille de contrat intelligent fonctionnant sur Ethereum qui nécessite qu'un nombre minimum de personnes approuvent une transaction avant qu'elle ne puisse avoir lieu (M-sur-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Bibliothèques de contrats pour implémenter des fonctionnalités administratives, y compris la propriété des contrats, les mises à niveau, les contrôles d'accès, la gouvernance, la possibilité de mise en pause, et plus encore._

### Services d'audit de contrats intelligents {#smart-contract-security-best-practices}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Service d'audit de contrats intelligents aidant les projets à travers l'écosystème de la chaîne de blocs à s'assurer que leurs protocoles sont prêts pour le lancement et conçus pour protéger les utilisateurs._

- **[CertiK](https://www.certik.com/)** - _Entreprise de sécurité de chaîne de blocs pionnière dans l'utilisation de la technologie de pointe de vérification formelle sur les contrats intelligents et les réseaux de chaîne de blocs._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Entreprise de cybersécurité qui combine la recherche en sécurité avec une mentalité d'attaquant pour réduire les risques et fortifier le code._

- **[PeckShield](https://peckshield.com/)** - _Entreprise de sécurité de chaîne de blocs offrant des produits et services pour la sécurité, la confidentialité et la convivialité de l'ensemble de l'écosystème de la chaîne de blocs._

- **[QuantStamp](https://quantstamp.com/)** - _Service d'audit facilitant l'adoption grand public de la technologie de chaîne de blocs grâce à des services de sécurité et d'évaluation des risques._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Entreprise de sécurité de contrats intelligents fournissant des audits de sécurité pour les systèmes distribués._

- **[Runtime Verification](https://runtimeverification.com/)** - _Entreprise de sécurité spécialisée dans la modélisation et la vérification formelle des contrats intelligents._

- **[Hacken](https://hacken.io)** - _Auditeur de cybersécurité Web3 apportant une approche à 360 degrés à la sécurité de la chaîne de blocs._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Services d'audit Solidity et Cairo, garantissant l'intégrité des contrats intelligents et la sécurité des utilisateurs sur Ethereum et Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx se concentre sur l'audit de chaînes de blocs et de contrats intelligents pour assurer la sécurité des cryptomonnaies, en fournissant des services tels que le développement de contrats intelligents, les tests d'intrusion et le conseil en chaîne de blocs._

- **[Code4rena](https://code4rena.com/)** - _Plateforme d'audit compétitive qui incite les experts en sécurité des contrats intelligents à trouver des vulnérabilités et à contribuer à rendre le Web3 plus sûr._

- **[CodeHawks](https://codehawks.com/)** - _Plateforme d'audits compétitifs hébergeant des concours d'audit de contrats intelligents pour les chercheurs en sécurité._

- **[Cyfrin](https://cyfrin.io)** - _Acteur majeur de la sécurité Web3, incubant la sécurité crypto à travers des produits et des services d'audit de contrats intelligents._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Entreprise de sécurité Web3 offrant des audits de sécurité pour les systèmes de chaîne de blocs grâce à une équipe d'auditeurs expérimentés et aux meilleurs outils de leur catégorie._

- **[Oxorio](https://oxor.io/)** - _Audits de contrats intelligents et services de sécurité de chaîne de blocs avec une expertise en EVM, Solidity, ZK, et technologies inter-chaînes pour les entreprises crypto et les projets de finance décentralisée (DeFi)._

- **[Inference](https://inference.ag/)** - _Entreprise d'audit de sécurité, spécialisée dans l'audit de contrats intelligents pour les chaînes de blocs basées sur l'EVM. Grâce à ses auditeurs experts, ils identifient les problèmes potentiels et suggèrent des solutions concrètes pour les corriger avant le déploiement._

### Plateformes de primes aux bugs {#tutorials-on-smart-contract-security}

- **[Immunefi](https://immunefi.com/)** - _Plateforme de primes aux bugs pour les contrats intelligents et les projets DeFi, où les chercheurs en sécurité examinent le code, divulguent les vulnérabilités, sont payés et rendent la crypto plus sûre._

- **[HackerOne](https://www.hackerone.com/)** - _Plateforme de coordination des vulnérabilités et de primes aux bugs qui met en relation les entreprises avec des testeurs d'intrusion et des chercheurs en cybersécurité._

- **[HackenProof](https://hackenproof.com/)** - _Plateforme experte de primes aux bugs pour les projets crypto (DeFi, contrats intelligents, portefeuilles, CEX et plus), où les professionnels de la sécurité fournissent des services de tri et les chercheurs sont payés pour des rapports de bugs pertinents et vérifiés._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Assureur dans le Web3 pour la sécurité des contrats intelligents, avec des paiements pour les auditeurs gérés via des contrats intelligents pour garantir que les bugs pertinents sont payés équitablement._

-  **[CodeHawks](https://www.codehawks.com/)** - _Plateforme compétitive de primes aux bugs où les auditeurs participent à des concours et des défis de sécurité, et (bientôt) à leurs propres audits privés._

### Publications sur les vulnérabilités et exploits connus des contrats intelligents

- **[ConsenSys : Attaques connues de contrats intelligents](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Explication accessible aux débutants des vulnérabilités de contrats les plus importantes, avec des exemples de code pour la plupart des cas._

- **[Registre SWC](https://swcregistry.io/)** - _Liste organisée d'éléments de la Common Weakness Enumeration (CWE) qui s'appliquent aux contrats intelligents Ethereum._

- **[Rekt](https://rekt.news/)** - _Publication régulièrement mise à jour sur les piratages et exploits crypto de premier plan, accompagnée de rapports post-mortem détaillés._

### Défis pour apprendre la sécurité des contrats intelligents

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Liste organisée de wargames de sécurité de chaîne de blocs, de défis, de compétitions [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) et de comptes-rendus de solutions._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame pour apprendre la sécurité offensive des contrats intelligents DeFi et développer des compétences en recherche de bugs et en audit de sécurité._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame basé sur le Web3 et Solidity où chaque niveau est un contrat intelligent qui doit être « piraté »._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Défi de piratage de contrats intelligents, se déroulant dans une aventure fantastique. La réussite du défi donne également accès à un programme privé de primes aux bugs._

### Bonnes pratiques pour sécuriser les contrats intelligents

- **[ConsenSys : Bonnes pratiques de sécurité des contrats intelligents Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Liste exhaustive de directives pour sécuriser les contrats intelligents Ethereum._

- **[Nascent : Boîte à outils de sécurité simple](https://github.com/nascentxyz/simple-security-toolkit)** - _Collection de guides pratiques axés sur la sécurité et de listes de contrôle pour le développement de contrats intelligents._

- **[Modèles Solidity](https://fravoll.github.io/solidity-patterns/)** - _Compilation utile de modèles sécurisés et de bonnes pratiques pour le langage de programmation de contrats intelligents Solidity._

- **[Documentation Solidity : Considérations de sécurité](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Directives pour écrire des contrats intelligents sécurisés avec Solidity._

- **[Norme de vérification de la sécurité des contrats intelligents](https://github.com/securing/SCSVS)** - _Liste de contrôle en quatorze parties créée pour normaliser la sécurité des contrats intelligents pour les développeurs, les architectes, les examinateurs de sécurité et les fournisseurs._

- **[Apprendre la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)** - _Cours ultime sur la sécurité et l'audit des contrats intelligents, créé pour les développeurs de contrats intelligents cherchant à améliorer leurs bonnes pratiques de sécurité et à devenir des chercheurs en sécurité._

### Tutoriels sur la sécurité des contrats intelligents

- [Comment écrire des contrats intelligents sécurisés](/developers/tutorials/secure-development-workflow/)

- [Comment utiliser Slither pour trouver des bugs dans les contrats intelligents](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Comment utiliser Manticore pour trouver des bugs dans les contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Directives de sécurité des contrats intelligents](/developers/tutorials/smart-contract-security-guidelines/)

- [Comment intégrer en toute sécurité votre contrat de jeton avec des jetons arbitraires](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Cours complet sur la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)