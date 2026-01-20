---
title: Sécurité de contrat intelligent
description: Un aperçu des lignes directrices pour la construction de contrats intelligents sécurisés Ethereum
lang: fr
---

Les contrats intelligents sont extrêmement flexibles et capables de contrôler de grandes quantités de valeur et de données, tout en exécutant une logique immuable basée sur le code déployé sur la blockchain. Cela a créé un écosystème dynamique d’applications sans tiers de confiance et décentralisées qui offrent de nombreux avantages par rapport aux systèmes existants. Ils représentent également des opportunités pour les attaquants qui cherchent à tirer profit de vulnérabilités dans les contrats intelligents.

Les blockchains publiques, comme Ethereum, compliquent encore davantage la question de la sécurisation des contrats intelligents. Le code de contrat déployé ne peut _généralement_ pas être modifié pour corriger des failles de sécurité, tandis que les actifs volés sur des contrats intelligents sont extrêmement difficiles à suivre et la plupart du temps irrécupérables en raison de l'immuabilité.

Bien que les chiffres varient, on estime que le montant total de la valeur volée ou perdue en raison de défauts de sécurité dans les contrats intelligents est d'au moins 1 milliard de dollars. Cela inclut des incidents très médiatisés, tels que le [piratage de la DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6M d'ETH volés, d'une valeur de plus de 1 milliard de dollars aux prix d'aujourd'hui), le [piratage du portefeuille multi-signatures Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30M de dollars perdus au profit des pirates), et le [problème du portefeuille gelé de Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (plus de 300M de dollars en ETH bloqués à jamais).

Les problèmes susmentionnés rendent impératif pour les développeurs d'investir des efforts dans la construction de contrats intelligents sécurisés, robustes et résistants. La sécurité des contrats intelligents est une affaire sérieuse, que chaque développeur ferait bien d’apprendre. Ce guide couvrira les considérations de sécurité des développeurs Ethereum et explorera les ressources pour améliorer la sécurité des contrats intelligents.

## Prérequis {#prerequisites}

Assurez-vous de bien connaître les [principes fondamentaux du développement de contrats intelligents](/developers/docs/smart-contracts/) avant de vous attaquer à la sécurité.

## Lignes directrices pour la création de contrats intelligents Ethereum sécurisés {#smart-contract-security-guidelines}

### 1. Concevoir des contrôles d'accès appropriés {#design-proper-access-controls}

Dans les contrats intelligents, les fonctions marquées `public` ou `external` peuvent être appelées par n'importe quel compte externe (EOA) ou compte de contrat. Il est nécessaire de spécifier une visibilité publique des fonctions si vous voulez que les autres interagissent avec votre contrat. En revanche, les fonctions marquées `private` ne peuvent être appelées que par des fonctions au sein du contrat intelligent, et non par des comptes externes. Donner à chaque participant au réseau un accès aux fonctions du contrat peut causer des problèmes, surtout si cela signifie que n'importe qui peut effectuer des opérations sensibles (par exemple, frapper de nouveaux jetons).

Pour éviter l'utilisation non autorisée de fonctions de contrats intelligents, il est nécessaire de mettre en place des contrôles d'accès sécurisés. Les mécanismes de contrôle d'accès restreignent la capacité d'utiliser certaines fonctions dans un contrat intelligent à des entités approuvées, comme les comptes responsables de la gestion du contrat. Le **modèle « Ownable »** et le **contrôle basé sur les rôles** sont deux modèles utiles pour mettre en œuvre le contrôle d'accès dans les contrats intelligents :

#### Modèle « Ownable » {#ownable-pattern}

Dans le modèle Ownable, une adresse est définie comme « propriétaire » du contrat au cours du processus de création du contrat. Les fonctions protégées se voient attribuer un modificateur `OnlyOwner`, qui garantit que le contrat authentifie l'identité de l'adresse appelante avant d'exécuter la fonction. Les appels à des fonctions protégées à partir d'autres adresses en dehors du propriétaire du contrat s'annulent toujours, empêchant l'accès non désiré.

#### Contrôle d'accès basé sur les rôles {#role-based-access-control}

L'enregistrement d'une seule adresse en tant que `Owner` dans un contrat intelligent introduit le risque de centralisation et représente un point de défaillance unique. Si les clés de compte du propriétaire sont compromises, des attaquants peuvent attaquer le contrat détenu. C'est pourquoi utiliser un modèle de contrôle d'accès basé sur des rôles avec plusieurs comptes administratifs peut être une meilleure solution.

Dans le cadre du contrôle d'accès basé sur les rôles, l'accès aux fonctions sensibles est réparti entre un ensemble de participants de confiance. Par exemple, un compte peut être responsable de la frappe des jetons, tandis qu'un autre compte peut effectuer des mises à niveau ou interrompre le contrat. Décentraliser le contrôle d'accès de cette façon élimine les points de défaillance uniques et réduit les hypothèses de confiance pour les utilisateurs.

##### Utilisation de portefeuilles multi-signature

Une autre approche pour la mise en place d'un contrôle d'accès sécurisé consiste à utiliser un [compte multi-signatures](/developers/docs/smart-contracts/#multisig) pour gérer un contrat. Contrairement à un EOA habituel, les comptes multi-signature sont détenus par plusieurs entités et nécessitent les signatures d'un nombre minimum de comptes — disons de 3 sur 5 — pour exécuter des transactions.

L'utilisation d'un portefeuille multi-signature pour le contrôle d'accès introduit une couche de sécurité supplémentaire dans la mesure où les actions sur le contrat cible nécessitent le consentement de plusieurs parties. Ceci est particulièrement utile si l'utilisation du modèle Ownable est nécessaire, car il rend plus difficile pour un attaquant ou un initié malhonnête de manipuler des fonctions sensibles du contrat à des fins malveillantes.

### 2. Utiliser les instructions require(), assert() et revert() pour protéger les opérations de contrat {#use-require-assert-revert}

Comme mentionné, n'importe qui peut appeler des fonctions publiques de votre contrat intelligent une fois qu'il est déployé sur la blockchain. Comme vous ne pouvez pas savoir à l'avance comment les comptes externes interagiront avec un contrat, il est idéal de mettre en œuvre des protections internes contre les opérations problématiques avant le déploiement. Vous pouvez imposer un comportement correct dans les contrats intelligents en utilisant les instructions `require()`, `assert()` et `revert()` pour déclencher des exceptions et annuler les changements d'état si l'exécution ne satisfait pas à certaines exigences.

**`require()`** : `require` est défini au début des fonctions et garantit que les conditions prédéfinies sont remplies avant l'exécution de la fonction appelée. Une instruction `require` peut être utilisée pour valider les entrées de l'utilisateur, vérifier les variables d'état ou authentifier l'identité du compte appelant avant de poursuivre avec une fonction.

**`assert()`** : `assert()` est utilisé pour détecter les erreurs internes et vérifier les violations des « invariants » dans votre code. Un invariant est une assertion logique à propos de l’état d’un contrat qui devrait être vrai pour toutes les exécutions de fonctions. Un exemple d'invariant est la quantité maximale totale ou le solde d'un contrat de jeton. L'utilisation de `assert()` garantit que votre contrat n'atteint jamais un état vulnérable, et si c'est le cas, toutes les modifications apportées aux variables d'état sont annulées.

**`revert()`** : `revert()` peut être utilisé dans une instruction if-else qui déclenche une exception si la condition requise n'est pas satisfaite. L'exemple de contrat ci-dessous utilise `revert()` pour protéger l'exécution des fonctions :

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Pas assez d'Ether fournis.");
        // Effectuer l'achat.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Tester les contrats intelligents et vérifier l'exactitude du code {#test-smart-contracts-and-verify-code-correctness}

L'immuabilité du code s'exécutant dans la [machine virtulle Ethereum ](/developers/docs/evm/) signifie que les contrats intelligents exigent un niveau d'évaluation de la qualité plus élevé pendant la phase de développement. Tester votre contrat de manière intensive et l'observer pour déceler tout résultat inattendu améliorera considérablement la sécurité et protégera vos utilisateurs sur le long terme.

La méthode habituelle est d'écrire de petits tests unitaires à l'aide de données fictives que le contrat devrait recevoir de la part des utilisateurs. Le [test unitaire](/developers/docs/smart-contracts/testing/#unit-testing) est utile pour tester la fonctionnalité de certaines fonctions et s'assurer qu'un contrat intelligent fonctionne comme prévu.

Malheureusement, les tests unitaires sont peu efficaces pour améliorer la sécurité des contrats intelligents lorsqu'ils sont utilisés isolément. Un test unitaire peut prouver qu'une fonction s'exécute correctement pour les données simulées, mais les tests unitaires sont seulement aussi efficaces que les tests écrits. Il est donc difficile de détecter les cas et les vulnérabilités marginaux manqués qui pourraient nuire à la sécurité de votre contrat intelligent.

Une meilleure approche consiste à combiner les tests unitaires avec des tests basés sur les propriétés effectués à l'aide de [l'analyse statique et dynamique](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analyse statique s'appuie sur des représentations de bas niveau, telles que des [graphes de flux de contrôle](https://en.wikipedia.org/wiki/Control-flow_graph) et des [arbres de syntaxe abstraite](https://deepsource.io/glossary/ast/) pour analyser les états de programme et les chemins d'exécution accessibles. Pendant ce temps, les techniques d'analyse dynamique, telles que le [fuzzing de contrats intelligents](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), exécutent le code du contrat avec des valeurs d'entrée aléatoires pour détecter les opérations qui violent les propriétés de sécurité.

La [vérification formelle](/developers/docs/smart-contracts/formal-verification) est une autre technique pour vérifier les propriétés de sécurité dans les contrats intelligents. Contrairement aux tests réguliers, la vérification formelle peut prouver de façon concluante l'absence d'erreurs dans un contrat intelligent. Ceci est réalisé en créant une spécification formelle qui permet de saisir les propriétés de sécurité désirées et de prouver qu'un modèle formel des contrats adhère à cette spécification.

### 4. Demander une révision indépendante de votre code {#get-independent-code-reviews}

Après avoir testé votre contrat, il est bon de demander à d'autres de vérifier le code source pour tout problème de sécurité. Les tests ne décèleront pas toutes les failles d'un contrat intelligent, mais obtenir un examen indépendant augmente la possibilité de détecter les vulnérabilités.

#### Audits {#audits}

Demander un audit des contrats intelligents est une façon de procéder à un examen indépendant du code. Les vérificateurs jouent un rôle important en veillant à ce que les contrats intelligents soient sécurisés et exempts de défauts de qualité et d'erreurs de conception.

Cela dit, évitez de considérer les audits comme un remède miracle. Les audits de contrats intelligents ne saisiront pas chaque bogue et sont principalement conçus pour fournir une série de revues complémentaires, qui peut aider à détecter les problèmes qui auront échappé aux développeurs lors du développement et du test initial. Vous devez également suivre les bonnes pratiques pour travailler avec les auditeurs, comme documenter le code correctement et ajouter des commentaires en ligne, pour maximiser les avantages d'un audit de contrats intelligents.

- [Conseils et astuces pour l'audit de contrats intelligents](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Tirez le meilleur parti de votre audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Primes de bogues {#bug-bounties}

La mise en place d'un programme de prime de bogues est une autre approche pour implémenter des examens de code externes. Une prime de bogue est une récompense financière donnée aux individus (généralement des hackers whitehat) qui découvrent des vulnérabilités dans une application.

Lorsqu'elle est utilisée correctement, la primes de bogues incitent les membres de la communauté hacker à inspecter votre code pour trouver des défauts critiques. Un exemple concret est le « bogue de l'argent infini » qui aurait permis à un attaquant de créer une quantité illimitée d'ether sur [Optimism](https://www.optimism.io/), un protocole de [couche 2](/layer-2/) fonctionnant sur Ethereum. Heureusement, un hacker éthique [a découvert la faille](https://www.saurik.com/optimism.html) et a prévenu l'équipe, [empochant au passage une récompense importante](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Une stratégie utile est de définir le paiement d'un programme de prime de bogues proportionnellement au montant des fonds mis en jeu. Décrite comme la « [prime de bogue à l'échelle](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) », cette approche offre des incitations financières aux individus pour qu'ils divulguent les vulnérabilités de manière responsable au lieu de les exploiter.

### 5. Suivre les meilleures pratiques lors du développement de contrats intelligents {#follow-smart-contract-development-best-practices}

L’existence d’audits et de primes de bogue n'exclut pas votre responsabilité d’écrire un code de haute qualité. Une bonne sécurité du contrat intelligent commence en suivant des processus de conception et de développement adéquats :

- Stocker tout le code dans un système de contrôle de version, tel que git

- Effectuer toutes les modifications de code via des pulls requests

- Assurez-vous que les pulls requests ont au moins un réviseur indépendant — si vous travaillez en solo sur un projet, envisagez de trouver d'autres développeurs et d'échanger mutuellement vos avis sur le code

- Utiliser un [environnement de développement](/developers/docs/frameworks/) pour tester, compiler et déployer des contrats intelligents

- Exécutez votre code via des outils d'analyse de code de base, tels que [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril et Slither. Idéalement, vous devriez le faire avant de fusionner chaque pull request et comparer les différences de sortie

- Assurez-vous que votre code est compilé sans erreurs, et que le compilateur Solidity n'émet aucun avertissement

- Documentez correctement votre code (en utilisant [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) et décrivez les détails de l'architecture du contrat dans un langage facile à comprendre. Cela facilitera l'audit et l'examen de votre code pour les autres.

### 6. Mettre en œuvre des plans de reprise après sinistre robustes {#implement-disaster-recovery-plans}

La conception de contrôles d'accès sécurisés, la mise en œuvre de modificateurs de fonction et d'autres suggestions peuvent améliorer la sécurité des contrats intelligents, mais elles ne peuvent pas exclure la possibilité d'exploits malveillants. Pour élaborer des contrats intelligents sécurisés, il faut se « préparer à l'échec » et disposer d'un plan de repli pour répondre efficacement aux attaques. Un plan de reprise après sinistre adéquat intègre tout ou partie des éléments suivants :

#### Mises à niveau de contrats {#contract-upgrades}

Bien que les contrats intelligents Ethereum soient immuables par défaut, il est possible d'obtenir un certain degré de mutabilité en utilisant des modèles de mise à niveau. La mise à niveau des contrats est nécessaire dans les cas où une faille critique rend votre ancien contrat inutilisable et où le déploiement d'une nouvelle logique est l'option la plus réalisable.

Les mécanismes de mise à niveau des contrats fonctionnent différemment, mais le « modèle proxy » est l'une des approches les plus populaires pour la mise à niveau des contrats intelligents. Les [modèles de proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) répartissent l'état et la logique d'une application entre _deux_ contrats. Le premier contrat (appelé « contrat mandataire ») stocke les variables d'état (par exemple, les soldes des utilisateurs), tandis que le second contrat (appelé « contrat logique ») contient le code d'exécution des fonctions du contrat.

Les comptes interagissent avec le contrat proxy, qui délègue tous les appels de fonction au contrat logique en utilisant l'appel de bas niveau [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Contrairement à un appel de message classique, `delegatecall()` garantit que le code exécuté à l'adresse du contrat logique est exécuté dans le contexte du contrat appelant. Cela signifie que le contrat logique écrira toujours dans le stockage du proxy (au lieu de son propre stockage) et que les valeurs originales de `msg.sender` et `msg.value` sont préservées.

La délégation des appels au contrat logique nécessite de stocker son adresse dans le stockage du contrat de procuration. Par conséquent, la mise à niveau de la logique du contrat consiste simplement à déployer un autre contrat logique et à stocker la nouvelle adresse dans le contrat de procuration. Comme les appels ultérieurs au contrat de procuration sont automatiquement acheminés vers le nouveau contrat logique, vous aurez « mis à niveau » le contrat sans modifier réellement le code.

[En savoir plus sur la mise à niveau des contrats](/developers/docs/smart-contracts/upgrading/).

#### Arrêts d'urgence {#emergency-stops}

Comme nous l'avons mentionné, les audits et les tests approfondis ne peuvent pas découvrir tous les bugs d'un contrat intelligent. Si une vulnérabilité apparaît dans votre code après le déploiement, il est impossible de la corriger puisque vous ne pouvez pas modifier le code exécuté à l'adresse du contrat. De plus, les mécanismes de mise à niveau ( par exemple, les modèles de procuration) peuvent prendre du temps à se mettre en œuvre (ils nécessitent souvent l'approbation de différentes parties), ce qui ne fait que donner plus de temps aux attaquants pour causer plus de dommages.

L'option nucléaire consiste à mettre en œuvre une fonction « d'arrêt d'urgence » qui bloque les appels aux fonctions vulnérables dans un contrat. Les arrêts d'urgence comprennent généralement les composants suivants :

1. Une variable booléenne globale indiquant si le contrat intelligent est dans un état arrêté ou non. Cette variable est initialisée à `false` lors de la configuration du contrat, mais reviendra à `true` une fois le contrat arrêté.

2. Les fonctions qui font référence à la variable booléenne dans leur exécution. Ces fonctions sont accessibles lorsque le contrat intelligent n'est pas arrêté, et deviennent inaccessibles lorsque la fonction d'arrêt d'urgence est déclenchée.

3. Une entité qui a accès à la fonction d'arrêt d'urgence, qui définit la variable booléenne à `true`. Pour éviter les actions malveillantes, les appels à cette fonction peuvent être limités à une adresse de confiance (par exemple, le propriétaire du contrat).

Une fois que le contrat a activé l'arrêt d'urgence, certaines fonctions ne seront pas appelables. Pour ce faire, les fonctions de sélection sont enveloppées dans un modificateur qui fait référence à la variable globale. Vous trouverez ci-dessous [un exemple](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) décrivant une mise en œuvre de ce modèle dans les contrats :

```solidity
// Ce code n'a pas été audité par des professionnels et ne fait aucune promesse quant à sa sécurité ou son exactitude. Utilisez-le à vos propres risques.

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
        // La logique de dépôt s'exécute ici
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Le retrait d'urgence s'exécute ici
    }
}
```

Cet exemple montre les caractéristiques de base des arrêts d'urgence :

- `isStopped` est un booléen qui s'évalue à `false` au début et à `true` lorsque le contrat entre en mode d'urgence.

- Les modificateurs de fonction `onlyWhenStopped` et `stoppedInEmergency` vérifient la variable `isStopped`. `stoppedInEmergency` est utilisé pour contrôler les fonctions qui devraient être inaccessibles lorsque le contrat est vulnérable (par ex., `deposit()`). Les appels à ces fonctions seront tout simplement annulés.

`onlyWhenStopped` est utilisé pour les fonctions qui doivent pouvoir être appelées en cas d'urgence (par ex., `emergencyWithdraw()`). De telles fonctions peuvent aider à résoudre la situation, d’où leur exclusion de la liste des « fonctions restreintes ».

L'utilisation d'une fonctionnalité d'arrêt d'urgence constitue un palliatif efficace pour faire face aux vulnérabilités graves de votre contrat intelligent. Cependant, les utilisateurs doivent faire confiance aux développeurs pour qu'ils ne l'activent pas pour des raisons intéressées. À cette fin, il est possible de décentraliser le contrôle de l'arrêt d'urgence en le soumettant à un mécanisme de vote sur la chaîne, à un timelock, ou à l'approbation d'un portefeuille multisig.

#### Surveillance des événements {#event-monitoring}

Les [événements](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) vous permettent de suivre les appels aux fonctions des contrats intelligents et de surveiller les changements des variables d'état. Il est idéal de programmer votre contrat intelligent pour qu'il émette un événement chaque fois qu'une partie prend une mesure critique en matière de sécurité (par exemple, retirer des fonds).

L'enregistrement des événements et leur surveillance hors chaîne permettent de mieux comprendre les opérations contractuelles et de découvrir plus rapidement les actions malveillantes. Cela signifie que votre équipe peut réagir plus rapidement aux hacks et prendre des mesures pour atténuer l'impact sur les utilisateurs, tels que suspendre les fonctions ou effectuer une mise à niveau.

Vous pouvez également opter pour un outil de surveillance en vente libre qui transmet automatiquement les alertes lorsque quelqu'un interagit avec vos contrats. Ces outils vous permettent de créer des alertes personnalisées basées sur différents déclencheurs, comme le volume de la transaction, la fréquence des appels de fonctions, ou les fonctions spécifiques impliquées. Par exemple, vous pouvez programmer une alerte qui arrive lorsque le montant retiré en une seule opération dépasse un seuil particulier.

### 7. Concevoir des systèmes de gouvernance sécurisés {#design-secure-governance-systems}

Vous voudrez peut-être décentraliser votre application en transférant le contrôle des contrats intelligents de base aux membres de la communauté. Dans ce cas, le système de contrats intelligents comprendra un module de gouvernance, à savoir un mécanisme qui permet aux membres de la communauté d'approuver des actions administratives via un système de gouvernance en chaîne. Par exemple, une proposition de mise à niveau d'un contrat de procuration vers une nouvelle implémentation peut être votée par les détenteurs de jetons.

Une gouvernance décentralisée peut être bénéfique, en particulier parce qu'elle aligne les intérêts des développeurs et des utilisateurs finaux. Néanmoins, les mécanismes de gouvernance des contrats intelligents peuvent introduire de nouveaux risques s'ils sont mal mis en œuvre. Un scénario plausible serait celui où un attaquant acquiert un pouvoir de vote énorme (mesuré en nombre de jetons détenus) en contractant un [prêt flash](/defi/#flash-loans) et en faisant passer une proposition malveillante.

Une façon de prévenir les problèmes liés à la gouvernance en chaîne est d'[utiliser un verrouillage temporel](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un timelock empêche un contrat intelligent d'exécuter certaines actions jusqu'à ce qu'un certain temps passe. D'autres stratégies incluent l'assignation d'une « pondération de vote » à chaque jeton en fonction de la durée d'enfermement de chaque jeton, ou mesurant le pouvoir de vote d'une adresse à une période historique (par exemple, 2-3 blocs dans le passé) au lieu du bloc actuel. Les deux méthodes réduisent la possibilité de récupérer rapidement le pouvoir de vote pour faire basculer des votes sur la chaîne.

Pour en savoir plus sur la [conception de systèmes de gouvernance sécurisés](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), les [différents mécanismes de vote dans les DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), et [les vecteurs d'attaque courants des DAO qui tirent parti de la DeFi](https://dacian.me/dao-governance-defi-attacks), consultez les liens partagés.

### 8. Réduire la complexité du code au minimum {#reduce-code-complexity}

Les développeurs de logiciels traditionnels sont familiers avec le principe KISS (« keep it simple, stupid ») qui recommande de ne pas introduire de complexité inutile dans la conception de logiciels. Cela fait suite à la pensée de longue date selon laquelle « les systèmes complexes échouent de manière complexe » et sont plus susceptibles d’être confrontés à des erreurs coûteuses.

Garder les choses simples est particulièrement important lors de la rédaction de contrats intelligents, étant donné que les contrats intelligents contrôlent potentiellement de grandes quantités de valeur. Une astuce pour atteindre la simplicité lors de l'écriture de contrats intelligents est de réutiliser les bibliothèques existantes, telles que les [Contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), lorsque cela est possible. Parce que ces bibliothèques ont été largement vérifiées et testées par les développeurs, leur utilisation réduit les chances d'introduire des bogues en écrivant de nouvelles fonctionnalités à partir de zéro.

Un autre conseil commun est d'écrire de petites fonctions et de garder les contrats modulaires en divisant la logique commerciale entre plusieurs contrats. Non seulement l'écriture de code plus simple réduit la surface d'attaque dans un contrat intelligent, mais il est également plus facile de raisonner sur la justesse du système global et de détecter les éventuelles erreurs de conception plus tôt.

### 9. Se défendre contre les vulnérabilités courantes des contrats intelligents {#mitigate-common-smart-contract-vulnerabilities}

#### Réentrance {#reentrancy}

L’EVM ne permet pas la simultanéité, ce qui signifie que deux contrats impliqués dans un appel de message ne peuvent pas être exécutés simultanément. Un appel externe met en pause l'exécution et la mémoire du contrat d'appel jusqu'à ce que l'appel revienne, à partir duquel l'exécution du point se déroule normalement. Ce processus peut être formellement décrit comme le transfert du [flux de contrôle](https://www.computerhope.com/jargon/c/contflow.htm) vers un autre contrat.

Bien que la plupart du temps inoffensifs, le transfert de flux de contrôle vers des contrats non approuvés peut causer des problèmes, tels que la réentrance. Une attaque par réentrance survient lorsqu'un contrat malveillant rappelle un contrat vulnérable avant que l'invocation de la fonction d'origine ne soit terminée. Ce type d'attaque est mieux expliqué avec un exemple.

Considérez un simple contrat intelligent (« Victim ») qui permet à quiconque de déposer et de retirer de l'Ether :

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

1. Vérifie le solde ETH de l'utilisateur
2. Envoie des fonds à l'adresse d'appel
3. Réinitialise son solde à 0, empêchant les retraits supplémentaires de l'utilisateur

La fonction `withdraw()` dans le contrat `Victim` suit un modèle « vérifications-interactions-effets ». Il _vérifie_ si les conditions nécessaires à l'exécution sont satisfaites (c.-à-d. que l'utilisateur a un solde d'ETH positif) et effectue l'_interaction_ en envoyant des ETH à l'adresse de l'appelant, avant d'appliquer les _effets_ de la transaction (c.-à-d. en réduisant le solde de l'utilisateur).

Si `withdraw()` est appelé depuis un compte externe (EOA), la fonction s'exécute comme prévu : `msg.sender.call.value()` envoie des ETH à l'appelant. Cependant, si `msg.sender` est un compte de contrat intelligent qui appelle `withdraw()`, l'envoi de fonds via `msg.sender.call.value()` déclenchera également l'exécution du code stocké à cette adresse.

Imaginez qu'il s'agisse du code déployé à l'adresse du contrat:

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

1. Accepter un dépôt depuis un autre compte (probablement l’EOA de l’attaquant)
2. Dépose 1 ETH dans le contrat Victim
3. Retirer 1 ETH stocké dans le contrat intelligent

Il n'y a rien de mal ici, si ce n'est que `Attacker` a une autre fonction qui appelle à nouveau `withdraw()` dans `Victim` si le gaz restant de l'appel entrant `msg.sender.call.value` est supérieur à 40 000. Cela donne à `Attacker` la possibilité de ré-entrer dans `Victim` et de retirer plus de fonds _avant_ la fin de la première invocation de `withdraw`. Le cycle ressemble à ceci:

```solidity
- L'EOA de l'attaquant appelle `Attacker.beginAttack()` avec 1 ETH
- `Attaquant.beginAttack()` dépose 1 ETH dans `Victim`
- `Attacker` appelle `withdraw() dans `Victim`
- `Victim` vérifie le solde de `Attacker` (1 ETH)
- `Victim` envoie 1 ETH à `Attacker` (qui déclenche la fonction par défaut)
- `Attacker` appelle `Victim.withdraw()` à nouveau (notez que `Victim` n'a pas réduit le solde de `Attacker` à partir du premier retrait)
- `Victim` vérifie le solde de `Attacker` (qui est toujours 1 ETH car il n'a pas appliqué les effets du premier appel)
- `Victim` envoie 1 ETH à `Attacker` (qui déclenche la fonction par défaut et permet à `Attacker` de réintroduire la fonction `withdraw`)
- Le processus se répète jusqu'à ce que `Attacker` soit épuisé, à quel point `msg.sender.call.value` retourne sans déclencher de retraits supplémentaires
- `Victim` applique enfin les résultats de la première transaction (et de celles subséquentes) à son état, donc le solde de `Attacker` est fixé à 0
```

Le résumé est que, comme le solde de l'appelant n'est pas défini à 0 jusqu'à ce que l'exécution de la fonction soit terminée, les invocations suivantes réussiront et permettront à l'appelant de retirer son solde plusieurs fois. Ce type d'attaque peut être utilisé pour vider les fonds d'un contrat intelligent, comme ce qui s'est passé lors du [piratage de la DAO en 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Les attaques par réentrance restent aujourd'hui un problème critique pour les contrats intelligents, comme le montrent les [listes publiques d'exploits de réentrance](https://github.com/pcaversaccio/reentrancy-attacks).

##### Comment empêcher les attaques par réentrance

Une approche pour gérer la réentrance consiste à suivre le [modèle vérifications-effets-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Ce modèle ordonne l'exécution de fonctions d'une manière que le code qui effectue les vérifications nécessaires avant de progresser avec l'exécution arrive en premier, suivi du code qui manipule l'état du contrat, avec du code qui interagit avec d'autres contrats ou EOA arrivant en dernier.

Le modèle vérifications-effets-interactions est utilisé dans une version révisée du contrat `Victim` présentée ci-dessous :

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

Ce contrat effectue une _vérification_ du solde de l'utilisateur, applique les _effets_ de la fonction `withdraw()` (en réinitialisant le solde de l'utilisateur à 0), et procède à l'_interaction_ (envoi d'ETH à l'adresse de l'utilisateur). Cela garantit que le contrat met à jour son stockage avant l’appel externe, éliminant ainsi la condition de réentrance qui a permis la première attaque. Le contrat `Attacker` pourrait toujours rappeler `NoLongerAVictim`, mais comme `balances[msg.sender]` a été mis à 0, les retraits supplémentaires lèveront une erreur.

Une autre option est d'utiliser un verrou d'exclusion mutuelle (communément décrit comme un « mutex ») qui verrouille une partie de l'état d'un contrat jusqu'à ce qu'une invocation de fonction soit terminée. Ceci est mis en œuvre à l'aide d'une variable booléenne qui est définie sur `true` avant l'exécution de la fonction et revient à `false` une fois l'invocation terminée. Comme on le voit dans l'exemple ci-dessous, l'utilisation d'un mutex protège une fonction contre les appels récursifs alors que l'invocation originale est toujours en cours de traitement, empêchant ainsi efficacement la réentrance.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Bloqué par la réentrance.");
        locked = true;
        _;
        locked = false;
    }
    // Cette fonction est protégée par un mutex, donc les appels réentrants depuis `msg.sender.call` ne peuvent plus appeler `withdraw`.
    //  L'instruction `return` s'évalue à `true` mais évalue quand même l'instruction `locked = false` dans le modificateur
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Pas de solde à retirer.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Vous pouvez également utiliser un système de [paiements pull](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) qui exige que les utilisateurs retirent des fonds des contrats intelligents, au lieu d'un système de « paiements push » qui envoie des fonds aux comptes. Cela élimine la possibilité de déclencher par inadvertance du code à des adresses inconnues (et peut également prévenir certaines attaques par déni de service).

#### Dépassements négatifs et positifs d'entiers {#integer-underflows-and-overflows}

Un dépassement d'entier se produit lorsque les résultats d'une opération arithmétique tombent en dehors de la plage de valeurs acceptable, le faisant passer à la valeur représentable la plus basse. Par exemple, un `uint8` ne peut stocker que des valeurs allant jusqu'à 2^8-1=255. Les opérations arithmétiques qui aboutissent à des valeurs supérieures à `255` provoqueront un dépassement positif et réinitialiseront `uint` à `0`, de la même manière que l'odomètre d'une voiture se remet à 0 lorsqu'il atteint son kilométrage maximum (999999).

Les dépassements négatifs d'entiers se produisent pour des raisons similaires : les résultats d'une opération arithmétique tombent en dessous de la plage acceptable. Si vous essayiez de décrémenter `0` dans un `uint8`, le résultat reviendrait simplement à la valeur maximale représentable (`255`).

Les dépassements d'entier et les soupassements peuvent entraîner des changements inattendus dans les variables d'état d'un contrat et entraîner une exécution non planifiée. Voici un exemple montrant comment un attaquant peut exploiter un dépassement arithmétique dans un contrat intelligent pour effectuer une opération invalide :

```
pragma solidity ^0.7.6;

// Ce contrat est conçu pour agir comme un coffre-fort temporel.
// L'utilisateur peut déposer dans ce contrat, mais ne peut pas retirer pendant au moins une semaine.
// L'utilisateur peut également prolonger le temps d'attente au-delà de la période d'attente d'une semaine.

/*
1. Déployer TimeLock
2. Déployer Attack avec l'adresse de TimeLock
3. Appeler Attack.attack en envoyant 1 ether. Vous pourrez immédiatement retirer
   votre ether.

Que s'est-il passé ?
Attack a provoqué le dépassement de TimeLock.lockTime et a permis un retrait
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
        require(balances[msg.sender] > 0, "Fonds insuffisants");
        require(block.timestamp > lockTime[msg.sender], "Le temps de verrouillage n'est pas expiré");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Échec de l'envoi d'Ether");
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
        si t = temps de verrouillage actuel, nous devons trouver x tel que
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

##### Comment éviter les soupassements et dépassements d'entier

Depuis la version 0.8.0, le compilateur Solidity rejette le code qui entraîne des soupassements et dépassements d'entier. Cependant, les contrats compilés avec une version plus ancienne du compilateur doivent soit effectuer des vérifications sur les fonctions impliquant des opérations arithmétiques, soit utiliser une bibliothèque (par ex., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) qui vérifie les dépassements négatifs/positifs.

#### Manipulation d'oracle {#oracle-manipulation}

Les [oracles](/developers/docs/oracles/) collectent des informations hors chaîne et les envoient sur la chaîne pour que les contrats intelligents puissent les utiliser. Avec des oracles, vous pouvez concevoir des contrats intelligents qui interagissent avec des systèmes hors chaîne, tels que les marchés de capitaux, élargissant ainsi considérablement leur application.

Mais si l'oracle est corrompu et envoie des informations incorrectes sur la chaîne, les contrats intelligents s'exécuteront sur la base d'entrées erronées, ce qui peut causer des problèmes. C'est la base du « problème de l'oracle », qui concerne la tâche de s'assurer que les informations provenant d'un oracle de la blockchain sont exactes, à jour et en temps opportun.

L'utilisation d'un oracle sur la chaîne, tel qu'un échange décentralisé, pour obtenir le prix comptant d'un actif, pose un problème de sécurité connexe. Les plateformes de prêt dans le secteur de la [finance décentralisée (DeFi)](/defi/) le font souvent pour déterminer la valeur de la garantie d'un utilisateur afin de déterminer combien il peut emprunter.

Les prix des DEX sont souvent exacts, en grande partie en raison du rétablissement de la parité sur les marchés. Cependant, ils sont ouverts à la manipulation, en particulier si l'oracle sur la chaîne calcule les prix des actifs en fonction des modèles de négociation historiques (comme c'est généralement le cas).

Par exemple, un attaquant pourrait artificiellement pomper le prix au comptant d'un actif en souscrivant un prêt flash juste avant d'interagir avec votre contrat de prêt. Interroger le DEX pour le prix de l’actif reviendrait à une valeur plus élevée que la normale (en raison de la forte demande de transfert de « l'ordre d’achat » de l’attaquant pour l’actif), leur permettant d'emprunter plus qu'ils ne le devraient. De telles « attaques de prêts flash » ont été utilisées pour exploiter la dépendance à l'égard de prix oracles parmi les applications DeFi, coûtant des millions de protocoles en fonds perdus.

##### Comment éviter la manipulation d'oracle

L'exigence minimale pour [éviter la manipulation d'oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) est d'utiliser un réseau d'oracles décentralisé qui interroge des informations provenant de plusieurs sources pour éviter les points de défaillance uniques. Dans la plupart des cas, les oracles décentralisés ont des incitations cryptoéconomiques intégrées pour encourager les noeuds d'oracle à signaler des informations correctes, les rendant plus sûres que les oracles centralisés.

Si vous comptez interroger un oracle sur la chaîne sur le prix des actifs, pensez à utiliser un mécanisme qui implémente un prix moyen pondéré (« Time Weighted Average Price », ou TWAP). Un [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroge le prix d'un actif à deux moments différents (que vous pouvez modifier) et calcule le prix au comptant sur la base de la moyenne obtenue. Le choix de périodes plus longues protège votre protocole contre la manipulation des prix car les larges ordres exécutés récemment ne peuvent pas affecter les prix des actifs.

## Ressources sur la sécurité des contrats intelligents pour les développeurs {#smart-contract-security-resources-for-developers}

### Outils pour analyser les contrats intelligents et vérifier l'exactitude du code {#code-analysis-tools}

- **[Outils et bibliothèques de test](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Collection d'outils et de bibliothèques standards pour effectuer des tests unitaires, des analyses statiques et dynamiques sur les contrats intelligents._

- **[Outils de vérification formelle](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Outils pour vérifier l'exactitude fonctionnelle des contrats intelligents et contrôler les invariants._

- **[Services d'audit de contrats intelligents](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liste d'organisations fournissant des services d'audit de contrats intelligents pour les projets de développement Ethereum._

- **[Plateformes de primes de bogues](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plateformes pour coordonner les primes de bogues et récompenser la divulgation responsable de vulnérabilités critiques dans les contrats intelligents._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Un outil en ligne gratuit pour vérifier toutes les informations disponibles concernant un contrat forké._

- **[ABI Encoder](https://abi.hashex.org/)** - _Un service en ligne gratuit pour encoder les fonctions de votre contrat Solidity et les arguments du constructeur._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analyseur statique de Solidity, qui parcourt les arbres de syntaxe abstraite (AST) pour identifier les vulnérabilités suspectes et afficher les problèmes dans un format Markdown facile à consulter._

### Outils de surveillance des contrats intelligents {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Un outil pour recevoir des notifications en temps réel lorsque des événements inhabituels ou inattendus se produisent sur vos contrats intelligents ou vos portefeuilles._

### Outils pour l'administration sécurisée des contrats intelligents {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Portefeuille de contrat intelligent fonctionnant sur Ethereum qui nécessite qu'un nombre minimum de personnes approuvent une transaction avant qu'elle ne puisse avoir lieu (M sur N)._

- **[Contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)** - _Bibliothèques de contrats pour la mise en œuvre de fonctionnalités administratives, y compris la propriété des contrats, les mises à niveau, les contrôles d'accès, la gouvernance, la mise en pause, et plus encore._

### Services d'audit de contrats intelligents {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Service d'audit de contrats intelligents aidant les projets de l'écosystème blockchain à s'assurer que leurs protocoles sont prêts à être lancés et conçus pour protéger les utilisateurs._

- **[CertiK](https://www.certik.com/)** - _Entreprise de sécurité blockchain pionnière dans l'utilisation de la technologie de vérification formelle de pointe sur les contrats intelligents et les réseaux blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Entreprise de cybersécurité qui combine la recherche en sécurité avec une mentalité d'attaquant pour réduire les risques et renforcer le code._

- **[PeckShield](https://peckshield.com/)** - _Société de sécurité blockchain proposant des produits et services pour la sécurité, la confidentialité et la convivialité de l'ensemble de l'écosystème blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Service d'audit facilitant l'adoption généralisée de la technologie blockchain par le biais de services de sécurité et d'évaluation des risques._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Société de sécurité de contrats intelligents fournissant des audits de sécurité pour les systèmes distribués._

- **[Runtime Verification](https://runtimeverification.com/)** - _Société de sécurité spécialisée dans la modélisation et la vérification formelles des contrats intelligents._

- **[Hacken](https://hacken.io)** - _Auditeur en cybersécurité Web3 apportant une approche à 360 degrés à la sécurité de la blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Services d'audit Solidity et Cairo, garantissant l'intégrité des contrats intelligents et la sécurité des utilisateurs sur Ethereum et Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx se concentre sur l'audit de la blockchain et des contrats intelligents pour garantir la sécurité des cryptomonnaies, en fournissant des services tels que le développement de contrats intelligents, les tests de pénétration, le conseil en blockchain._

- **[Code4rena](https://code4rena.com/)** - _Plateforme d'audit compétitive qui incite les experts en sécurité des contrats intelligents à trouver des vulnérabilités et à contribuer à rendre le web3 plus sécurisé._

- **[CodeHawks](https://codehawks.com/)** - _Plateforme d'audits compétitifs hébergeant des concours d'audit de contrats intelligents pour les chercheurs en sécurité._

- **[Cyfrin](https://cyfrin.io)** - _Référence en matière de sécurité Web3, incubant la sécurité crypto par le biais de produits et de services d'audit de contrats intelligents._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Société de sécurité Web3 proposant des audits de sécurité pour les systèmes blockchain par le biais d'une équipe d'auditeurs expérimentés et d'outils de premier ordre._

- **[Oxorio](https://oxor.io/)** - _Audits de contrats intelligents et services de sécurité blockchain avec une expertise en EVM, Solidity, ZK, et technologie inter-chaînes pour les entreprises crypto et les projets DeFi._

- **[Inference](https://inference.ag/)** - _Société d'audit de sécurité, spécialisée dans l'audit de contrats intelligents pour les blockchains basées sur l'EVM. _Grâce à ses auditeurs experts, elle identifie les problèmes potentiels et suggère des solutions concrètes pour les corriger avant le déploiement._

### Plateformes de primes de bogues {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Plateforme de primes de bogues pour les contrats intelligents et les projets DeFi, où les chercheurs en sécurité examinent le code, divulguent les vulnérabilités, sont payés et rendent la crypto plus sûre._

- **[HackerOne](https://www.hackerone.com/)** - _Plateforme de coordination des vulnérabilités et de primes de bogues qui met en relation des entreprises avec des testeurs d'intrusion et des chercheurs en cybersécurité._

- **[HackenProof](https://hackenproof.com/)** - _Plateforme de primes de bogues experte pour les projets crypto (DeFi, Contrats Intelligents, Portefeuilles, CEX et plus), où des professionnels de la sécurité fournissent des services de triage et où les chercheurs sont payés pour des rapports de bogues pertinents et vérifiés._

- **[Sherlock](https://www.sherlock.xyz/)** - _Souscripteur en Web3 pour la sécurité des contrats intelligents, avec des paiements pour les auditeurs gérés via des contrats intelligents pour garantir que les bogues pertinents sont payés équitablement._

- **[CodeHawks](https://www.codehawks.com/)** - _Plateforme compétitive de primes aux bogues où les auditeurs participent à des concours et à des défis de sécurité, et (bientôt) à leurs propres audits privés._

### Publications sur les vulnérabilités et exploits connus des contrats intelligents {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys : Attaques connues sur les contrats intelligents](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Explication conviviale pour les débutants des vulnérabilités de contrat les plus importantes, avec des exemples de code pour la plupart des cas._

- **[Registre SWC](https://swcregistry.io/)** - _Liste organisée d'éléments de l'énumération des faiblesses communes (CWE) qui s'appliquent aux contrats intelligents Ethereum._

- **[Rekt](https://rekt.news/)** - _Publication régulièrement mise à jour des piratages et exploits de crypto de premier plan, avec des rapports post-mortem détaillés._

### Défis pour l'apprentissage de la sécurité des contrats intelligents {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Liste organisée de wargames, de défis et de compétitions de [Capture du drapeau](https://www.webopedia.com/definitions/ctf-event/amp/) sur la sécurité de la blockchain, ainsi que des solutions._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame pour apprendre la sécurité offensive des contrats intelligents DeFi et développer des compétences en matière de chasse aux bogues et d'audit de sécurité._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame basé sur Web3/Solidity où chaque niveau est un contrat intelligent qui doit être « piraté »._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Défi de piratage de contrats intelligents, situé dans une aventure fantastique. La résolution du défi donne également accès à un programme privé de primes de bugs._

### Meilleures pratiques pour la sécurisation des contrats intelligents {#smart-contract-security-best-practices}

- **[ConsenSys : Meilleures pratiques en matière de sécurité des contrats intelligents Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Liste complète de lignes directrices pour sécuriser les contrats intelligents Ethereum._

- **[Nascent : Boîte à outils de sécurité simple](https://github.com/nascentxyz/simple-security-toolkit)** - _Collection de guides pratiques axés sur la sécurité et de listes de contrôle pour le développement de contrats intelligents._

- **[Modèles Solidity](https://fravoll.github.io/solidity-patterns/)** - _Compilation utile de modèles sécurisés et de meilleures pratiques pour Solidity, le langage de programmation de contrats intelligents._

- **[Documents Solidity : Considérations de sécurité](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Lignes directrices pour l'écriture de contrats intelligents sécurisés avec Solidity._

- **[Norme de vérification de la sécurité des contrats intelligents](https://github.com/securing/SCSVS)** - _Liste de contrôle en quatorze parties créée pour normaliser la sécurité des contrats intelligents pour les développeurs, les architectes, les auditeurs de sécurité et les fournisseurs._

- **[Apprendre la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)** - _Le cours ultime sur la sécurité et l'audit des contrats intelligents, créé pour les développeurs de contrats intelligents qui cherchent à améliorer leurs meilleures pratiques en matière de sécurité et à devenir des chercheurs en sécurité._

### Tutoriels sur la sécurité des contrats intelligents {#tutorials-on-smart-contract-security}

- [Comment écrire des contrats intelligents sécurisés](/developers/tutorials/secure-development-workflow/)

- [Comment utiliser Slither pour trouver des bogues dans les contrats intelligents](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Comment utiliser Manticore pour trouver des bogues dans les contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Lignes directrices sur la sécurité des contrats intelligents](/developers/tutorials/smart-contract-security-guidelines/)

- [Comment intégrer en toute sécurité votre contrat de jeton avec des jetons arbitraires](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Cours complet sur la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)
