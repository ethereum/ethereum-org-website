---
title: Sécurité des contrats intelligents
description: Un aperçu des lignes directrices pour la construction de contrats intelligents sécurisés Ethereum
lang: fr
---

Les contrats intelligents sont extrêmement flexibles et capables de contrôler de grandes quantités de valeur et de données, tout en exécutant une logique immuable basée sur le code déployé sur la blockchain. Cela a créé un écosystème dynamique d’applications sans tiers de confiance et décentralisées qui offrent de nombreux avantages par rapport aux systèmes existants. Ils représentent également des opportunités pour les attaquants qui cherchent à tirer profit de vulnérabilités dans les contrats intelligents.

Les blockchains publiques, comme Ethereum, compliquent encore davantage la question de la sécurisation des contrats intelligents. Le code de contrat déployé ne peut _généralement_ pas être modifié pour corriger des défauts de sécurité, et les actifs volés sur des contrats intelligents sont extrêmement difficiles à suivre et la plupart du temps irrécupérables en raison de l’immuabilité.

Bien que les chiffres varient, on estime que le montant total de la valeur volée ou perdue en raison de défauts de sécurité dans les contrats intelligents est d'au moins 1 milliard de dollars. Cela inclut des incidents de haut niveau, tels que [le hack de DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 millions d'ETH volés, d'une valeur de plus de 1 milliard de dollars aux prix actuels), [le hack du portefeuille multi-sig Parity](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (30 millions de dollars volés par les hackeurs), et [le problème du portefeuille gelé Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (plus de 300 millions de dollars en ETH verrouillés pour toujours).

Les problèmes susmentionnés rendent impératif pour les développeurs d'investir des efforts dans la construction de contrats intelligents sécurisés, robustes et résistants. La sécurité des contrats intelligents est une affaire sérieuse, que chaque développeur ferait bien d’apprendre. Ce guide couvrira les considérations de sécurité des développeurs Ethereum et explorera les ressources pour améliorer la sécurité des contrats intelligents.

## Prérequis {#prerequisites}

Assurez-vous de vous familiariser avec les [fondamentaux du développement de contrats intelligent](/developers/docs/smart-contracts/) avant de vous attaquer à la sécurité.

## Lignes directrices pour la construction de contrats intelligents sécurisés Ethereum {#smart-contract-security-guidelines}

### 1. Concevoir des contrôles d'accès appropriés {#design-proper-access-controls}

Dans les contrats intelligents, les fonctions marquées `publiques` ou `externes` peuvent être appelées par n'importe quel compte externe (EOA) ou compte de contrat. Il est nécessaire de spécifier une visibilité publique des fonctions si vous voulez que les autres interagissent avec votre contrat. Les fonctions marquées `privées` ne peuvent cependant être appelées que par des fonctions au sein du contrat intelligent, et non par des comptes externes. Donner à chaque participant au réseau un accès aux fonctions du contrat peut causer des problèmes, surtout si cela signifie que n'importe qui peut effectuer des opérations sensibles (par exemple, frapper de nouveaux jetons).

Pour éviter l'utilisation non autorisée de fonctions de contrats intelligents, il est nécessaire de mettre en place des contrôles d'accès sécurisés. Les mécanismes de contrôle d'accès restreignent la capacité d'utiliser certaines fonctions dans un contrat intelligent à des entités approuvées, comme les comptes responsables de la gestion du contrat. Le **modèle Ownable** et **le contrôle d'accès basé sur les rôles** sont deux pratiques utiles pour implémenter le contrôle d'accès dans les contrats intelligents :

#### Modèle Ownable {#ownable-pattern}

Dans le modèle Ownable, une adresse est définie comme « propriétaire » du contrat au cours du processus de création du contrat. Les fonctions protégées sont assignées avec un modificateur `OnlyOwner` , qui assure que le contrat authentifie l'identité de l'adresse d'appel avant d'exécuter la fonction. Les appels à des fonctions protégées à partir d'autres adresses en dehors du propriétaire du contrat s'annulent toujours, empêchant l'accès non désiré.

#### Contrôle d'accès basé sur les rôles {#role-based-access-control}

L'enregistrement d'une seule adresse en tant que `Owner` dans un contrat intelligent introduit un risque de centralisation et représente un point de défaillance unique. Si les clés de compte du propriétaire sont compromises, des attaquants peuvent attaquer le contrat détenu. C'est pourquoi utiliser un modèle de contrôle d'accès basé sur des rôles avec plusieurs comptes administratifs peut être une meilleure solution.

Dans le cadre du contrôle d'accès basé sur les rôles, l'accès aux fonctions sensibles est réparti entre un ensemble de participants de confiance. Par exemple, un compte peut être responsable de la frappe des jetons, tandis qu'un autre compte peut effectuer des mises à niveau ou interrompre le contrat. Décentraliser le contrôle d'accès de cette façon élimine les points de défaillance uniques et réduit les hypothèses de confiance pour les utilisateurs.

##### Utilisation de portefeuilles multi-signature

Une autre approche pour implémenter un contrôle d'accès sécurisé est d'utiliser un [compte multi-signature](/developers/docs/smart-contracts/#multisig) pour gérer un contrat. Contrairement à un EOA habituel, les comptes multi-signature sont détenus par plusieurs entités et nécessitent les signatures d'un nombre minimum de comptes — disons de 3 sur 5 — pour exécuter des transactions.

L'utilisation d'un portefeuille multi-signature pour le contrôle d'accès introduit une couche de sécurité supplémentaire dans la mesure où les actions sur le contrat cible nécessitent le consentement de plusieurs parties. Ceci est particulièrement utile si l'utilisation du modèle Ownable est nécessaire, car il rend plus difficile pour un attaquant ou un initié malhonnête de manipuler des fonctions sensibles du contrat à des fins malveillantes.

### 2. Utiliser les commandes require(), assert() et revert() pour protéger les opérations de contrat {#use-require-assert-revert}

Comme mentionné, n'importe qui peut appeler des fonctions publiques de votre contrat intelligent une fois qu'il est déployé sur la blockchain. Comme vous ne pouvez pas savoir à l'avance comment les comptes externes interagiront avec un contrat, il est idéal de mettre en œuvre des protections internes contre les opérations problématiques avant le déploiement. Vous pouvez imposer un comportement correct dans les contrats intelligents en utilisant les fonctions `require()`, `assert()`, et `revert()` pour déclencher des exceptions et annuler les changements d'état si l'exécution ne répond pas à certaines exigences.

**`require()`** : `require` sont définis en début de fonction et cela garantit que des conditions prédéfinies sont remplies avant l'exécution de la fonction appelée. Une instruction `require` peut être utilisée pour valider les entrées utilisateur, vérifier les variables d'état, ou authentifier l'identité du compte appelant avant d'exécuter la fonction.

**`assert()`**: `assert()` est utilisée pour détecter les erreurs internes et vérifier les violations des « invariants » dans votre code. Un invariant est une assertion logique à propos de l’état d’un contrat qui devrait être vrai pour toutes les exécutions de fonctions. Un exemple d'invariant est la quantité maximale totale ou le solde d'un contrat de jeton. L'utilisation de la fonction `assert()` garantit que votre contrat n'atteint jamais un état vulnérable, et si c'est le cas malgré tout que toutes les modifications apportées aux variables d'état sont annulées.

**`revert()`** : `revert()` peut être utilisé dans une instruction if-else qui déclenche une exception si la condition demandée n'est pas satisfaite. L'exemple de contrat ci-dessous utilise `revert()` pour proteger l'exécution des fonctions :

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Tester les contrats intelligents et vérifier la justesse du code {#test-smart-contracts-and-verify-code-correctness}

L'immuabilité du code exécuté dans la [Machine Virtuelle Ethereum](/developers/docs/evm/) signifie que les contrats intelligents exigent un plus haut niveau d'évaluation de la qualité pendant la phase de développement. Tester votre contrat de manière intensive et l'observer pour déceler tout résultat inattendu améliorera considérablement la sécurité et protégera vos utilisateurs sur le long terme.

La méthode habituelle est d'écrire de petits tests unitaires à l'aide de données fictives que le contrat devrait recevoir de la part des utilisateurs. [Le test unitaire](/developers/docs/smart-contracts/testing/#unit-testing) est bon pour tester la fonctionnalité de certaines fonctions et pour s'assurer qu'un contrat intelligent fonctionne comme prévu.

Malheureusement, les tests unitaires sont peu efficaces pour améliorer la sécurité des contrats intelligents lorsqu'ils sont utilisés isolément. Un test unitaire peut prouver qu'une fonction s'exécute correctement pour les données simulées, mais les tests unitaires sont seulement aussi efficaces que les tests écrits. Il est donc difficile de détecter les cas et les vulnérabilités marginaux manqués qui pourraient nuire à la sécurité de votre contrat intelligent.

Une meilleure approche est de combiner les tests unitaires avec des tests fondés sur les propriétés effectués en utilisant [l'analyse statique et dynamique](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analyse statique repose sur des représentations de bas niveau, tels que [des graphiques de flux de contrôle](https://en.wikipedia.org/wiki/Control-flow_graph) et [des arbres de syntaxe abstraite](https://deepsource.io/glossary/ast/) pour analyser les états de programme et les chemins d'exécution accessibles. D'autre part, les techniques d'analyse dynamique, telles que le [fuzzing de contrat intelligent](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), exécutent du code de contrat avec des valeurs d'entrées aléatoires pour détecter les opérations qui violent les propriétés de sécurité.

[La vérification formelle](/developers/docs/smart-contracts/formal-verification) est une autre technique de vérification des propriétés de sécurité dans les contrats intelligents. Contrairement aux tests réguliers, la vérification formelle peut prouver de façon concluante l'absence d'erreurs dans un contrat intelligent. Ceci est réalisé en créant une spécification formelle qui permet de saisir les propriétés de sécurité désirées et de prouver qu'un modèle formel des contrats adhère à cette spécification.

### 4. Demander une revue indépendante de votre code {#get-independent-code-reviews}

Après avoir testé votre contrat, il est bon de demander à d'autres de vérifier le code source pour tout problème de sécurité. Les tests ne décèleront pas toutes les failles d'un contrat intelligent, mais obtenir un examen indépendant augmente la possibilité de détecter les vulnérabilités.

#### Audits {#audits}

Demander un audit des contrats intelligents est une façon de procéder à un examen indépendant du code. Les vérificateurs jouent un rôle important en veillant à ce que les contrats intelligents soient sécurisés et exempts de défauts de qualité et d'erreurs de conception.

Cela dit, évitez de considérer les audits comme un remède miracle. Les audits de contrats intelligents ne saisiront pas chaque bogue et sont principalement conçus pour fournir une série de revues complémentaires, qui peut aider à détecter les problèmes qui auront échappé aux développeurs lors du développement et du test initial. Vous devez également suivre les bonnes pratiques pour travailler avec les auditeurs, comme documenter le code correctement et ajouter des commentaires en ligne, pour maximiser les avantages d'un audit de contrats intelligents.

- [Trucs & astuces d'audit de contrat intelligent](https://twitter.com/tinchoabbate/status/1400170232904400897) - _tinchoabbate_
- [Tirer le meilleur de votre audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Chasse à la prime {#bug-bounties}

La mise en place d'un programme de prime de bogues est une autre approche pour implémenter des examens de code externes. Une prime de bogue est une récompense financière donnée aux individus (généralement des hackers whitehat) qui découvrent des vulnérabilités dans une application.

Lorsqu'elle est utilisée correctement, la primes de bogues incitent les membres de la communauté hacker à inspecter votre code pour trouver des défauts critiques. Un exemple réel est le « bogue d'argent infini » qui aurait permis à un attaquant de créer un nombre illimité d'Ether sur [Optimisme](https://www.optimism.io/), un protocole [Couche 2](/layer-2/) fonctionnant sur Ethereum. Heureusement, un hacker whitehat [a découvert le défaut](https://www.saurik.com/optimism.html) et l'a notifié à l'équipe, [gagnant une grosse prime ce faisant](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Une stratégie utile est de définir le paiement d'un programme de prime de bogues proportionnellement au montant des fonds mis en jeu. Décrit comme la «[mise à l'échelle de la prime de bogue](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)», cette approche fournit des incitations financières pour les individus à divulguer de manière responsable des vulnérabilités au lieu de les exploiter.

### 5. Suivre les bonnes pratiques lors du développement de contrats intelligents {#follow-smart-contract-development-best-practices}

L’existence d’audits et de primes de bogue n'exclut pas votre responsabilité d’écrire un code de haute qualité. Une bonne sécurité du contrat intelligent commence en suivant des processus de conception et de développement adéquats :

- Stocker tout le code dans un système de contrôle de version, tel que git

- Effectuer toutes les modifications de code via des pulls requests

- Assurez-vous que les pulls requests ont au moins un réviseur indépendant — si vous travaillez en solo sur un projet, envisagez de trouver d'autres développeurs et d'échanger mutuellement vos avis sur le code

- Utilisez un [environnement de développement](/developers/docs/frameworks/) pour tester, compiler, déployer des contrats intelligents

- Exécutez votre code sur des outils d'analyse de code basiques, tels que [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril et Slither. Idéalement, vous devriez le faire avant de fusionner chaque pull request et comparer les différences de sortie

- Assurez-vous que votre code est compilé sans erreurs, et que le compilateur Solidity n'émet aucun avertissement

- Documentez correctement votre code (en utilisant [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) et décrivez les détails sur l'architecture du contrat dans un langage facile à comprendre. Cela facilitera l'audit et l'examen de votre code pour les autres.

### 6. Mettre en œuvre des plans de relance robustes en cas de catastrophe {#implement-disaster-recovery-plans}

La conception de contrôles d'accès sécurisés, la mise en œuvre de modificateurs de fonction et d'autres suggestions peuvent améliorer la sécurité des contrats intelligents, mais elles ne peuvent pas exclure la possibilité d'exploits malveillants. Pour élaborer des contrats intelligents sécurisés, il faut se « préparer à l'échec » et disposer d'un plan de repli pour répondre efficacement aux attaques. Un plan de reprise après sinistre adéquat intègre tout ou partie des éléments suivants :

#### Mise à niveau du contrat {#contract-upgrades}

Bien que les contrats intelligents Ethereum soient immuables par défaut, il est possible d'obtenir un certain degré de mutabilité en utilisant des modèles de mise à niveau. La mise à niveau des contrats est nécessaire dans les cas où une faille critique rend votre ancien contrat inutilisable et où le déploiement d'une nouvelle logique est l'option la plus réalisable.

Les mécanismes de mise à niveau des contrats fonctionnent différemment, mais le « modèle proxy » est l'une des approches les plus populaires pour la mise à niveau des contrats intelligents. [Les modèles de proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) divisent l'état et la logique d'une application entre _deux_ contrats. Le premier contrat (appelé « contrat mandataire ») stocke les variables d'état (par exemple, les soldes des utilisateurs), tandis que le second contrat (appelé « contrat logique ») contient le code d'exécution des fonctions du contrat.

Les comptes interagissent avec le contrat du mandataire, qui envoie tous les appels de fonction au contrat logique en utilisant l'appel de bas niveau [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Contrairement à un appel de message ordinaire, `delegatecall()` garantit que le code exécuté à l'adresse du contrat logique est exécuté dans le contexte du contrat appelant. Cela signifie que le contrat logique écrira toujours dans le stockage du proxy (au lieu de son propre stockage) et les valeurs originales des `msg.sender` et `msg.value` sont préservées.

La délégation des appels au contrat logique nécessite de stocker son adresse dans le stockage du contrat de procuration. Par conséquent, la mise à niveau de la logique du contrat consiste simplement à déployer un autre contrat logique et à stocker la nouvelle adresse dans le contrat de procuration. Comme les appels ultérieurs au contrat de procuration sont automatiquement acheminés vers le nouveau contrat logique, vous aurez « mis à niveau » le contrat sans modifier réellement le code.

[En savoir plus sur la mise à niveau des contrats](/developers/docs/smart-contracts/upgrading/).

#### Arrêts d'urgence {#emergency-stops}

Comme nous l'avons mentionné, les audits et les tests approfondis ne peuvent pas découvrir tous les bugs d'un contrat intelligent. Si une vulnérabilité apparaît dans votre code après le déploiement, il est impossible de la corriger puisque vous ne pouvez pas modifier le code exécuté à l'adresse du contrat. De plus, les mécanismes de mise à niveau ( par exemple, les modèles de procuration) peuvent prendre du temps à se mettre en œuvre (ils nécessitent souvent l'approbation de différentes parties), ce qui ne fait que donner plus de temps aux attaquants pour causer plus de dommages.

L'option nucléaire consiste à mettre en œuvre une fonction « d'arrêt d'urgence » qui bloque les appels aux fonctions vulnérables dans un contrat. Les arrêts d'urgence comprennent généralement les composants suivants :

1. Une variable booléenne globale indiquant si le contrat intelligent est dans un état arrêté ou non. Cette variable est définie à `false` lors de la mise en place du contrat, mais elle deviendra `vraie` une fois le contrat arrêté.

2. Les fonctions qui font référence à la variable booléenne dans leur exécution. Ces fonctions sont accessibles lorsque le contrat intelligent n'est pas arrêté, et deviennent inaccessibles lorsque la fonction d'arrêt d'urgence est déclenchée.

3. Une entité qui a accès à la fonction d'arrêt d'urgence, qui définit la variable booléenne à `true`. Pour éviter les actions malveillantes, les appels à cette fonction peuvent être limités à une adresse de confiance (par exemple, le propriétaire du contrat).

Une fois que le contrat a activé l'arrêt d'urgence, certaines fonctions ne seront pas appelables. Pour ce faire, les fonctions de sélection sont enveloppées dans un modificateur qui fait référence à la variable globale. Voici [un exemple](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) décrivant une implémentation de ce modèle dans les contrats :

```solidity
// Ce code n'a pas fait l'objet d'un audit professionnel et ne fait aucune promesse quant à sa sécurité ou son exactitude. Utilisez-le à vos risques et périls.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Cet exemple montre les caractéristiques de base des arrêts d'urgence :

- `isStopped` est un booléen qui évalue à `false` en début et à `true` lorsque le contrat entre en mode d'urgence.

- Les modificateurs de fonction `onlyWhenStopped` et `stoppedInEmergency` vérifient la variable `isStopped`. `stoppedInEmergency` est utilisé pour piloter des fonctions qui doivent être inaccessibles lorsque le contrat est vulnérable (par exemple : `deposit()`). Les appels à ces fonctions seront tout simplement annulés.

`onlyWhenStopped` est utilisé pour des fonctions qui doivent être appelables pendant une urgence (par exemple, `emergencyWithdraw()`). De telles fonctions peuvent aider à résoudre la situation, d’où leur exclusion de la liste des « fonctions restreintes ».

L'utilisation d'une fonctionnalité d'arrêt d'urgence constitue un palliatif efficace pour faire face aux vulnérabilités graves de votre contrat intelligent. Cependant, les utilisateurs doivent faire confiance aux développeurs pour qu'ils ne l'activent pas pour des raisons intéressées. À cette fin, décentraliser le contrôle de l'arrêt d'urgence soit en le soumettant à un mécanisme de vote en chaîne, un timelock, ou à l'approbation d'un portefeuille multisig sont des solutions possibles.

#### Suivi des événements {#event-monitoring}

[Les événements](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) vous permettent de suivre les appels vers les fonctions des contrats intelligents et de surveiller les changements apportés aux variables d'état. Il est idéal de programmer votre contrat intelligent pour qu'il émette un événement chaque fois qu'une partie prend une mesure critique en matière de sécurité (par exemple, retirer des fonds).

Le log des événements et leur surveillance hors chaîne fournissent un aperçu des opérations contractuelles et aide à la découverte plus rapide des actions malveillantes. Cela signifie que votre équipe peut réagir plus rapidement aux hacks et prendre des mesures pour atténuer l'impact sur les utilisateurs, tels que suspendre les fonctions ou effectuer une mise à niveau.

Vous pouvez également opter pour un outil de surveillance en vente libre qui transmet automatiquement les alertes lorsque quelqu'un interagit avec vos contrats. Ces outils vous permettent de créer des alertes personnalisées basées sur différents déclencheurs, comme le volume de la transaction, la fréquence des appels de fonctions, ou les fonctions spécifiques impliquées. Par exemple, vous pouvez programmer une alerte qui arrive lorsque le montant retiré en une seule opération dépasse un seuil particulier.

### 7. Concevoir des systèmes de gouvernance sécurisés {#design-secure-governance-systems}

Vous voudrez peut-être décentraliser votre application en transférant le contrôle des contrats intelligents de base aux membres de la communauté. Dans ce cas, le système de contrats intelligents comprendra un module de gouvernance, un mécanisme qui permet aux membres de la communauté d'approuver des actions administratives via un système de gouvernance en chaîne. Par exemple, une proposition de mise à niveau d'un contrat de procuration vers une nouvelle implémentation peut être votée par les détenteurs de jetons.

Une gouvernance décentralisée peut être bénéfique, en particulier parce qu'elle aligne les intérêts des développeurs et des utilisateurs finaux. Néanmoins, les mécanismes de gouvernance des contrats intelligents peuvent introduire de nouveaux risques s'ils sont mal mis en œuvre. Un scénario plausible est si un attaquant acquiert un énorme pouvoir de vote (mesuré en nombre de jetons conservés) en prenant un [crédit flash](/defi/#flash-loans) et en poussant une proposition malveillante.

Une façon de prévenir les problèmes liés à la gouvernance sur la chaîne est d'utiliser [un timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un timelock empêche un contrat intelligent d'exécuter certaines actions jusqu'à ce qu'un certain temps passe. D'autres stratégies incluent l'assignation d'une « pondération de vote » à chaque jeton en fonction de la durée d'enfermement de chaque jeton, ou mesurant le pouvoir de vote d'une adresse à une période historique (par exemple, 2-3 blocs dans le passé) au lieu du bloc actuel. Les deux méthodes réduisent la possibilité d’amasser rapidement le pouvoir de vote pour basculer sur les votes en chaîne.

Vous trouverez plus d'informations sur [la conception de systèmes de gouvernance sécurisés](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [les différents mécanismes de vote dans les DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), et [les vecteurs d'attaque courants des DAO utilisant la DeFi](https://dacian.me/dao-governance-defi-attacks) dans les liens partagés.

### 8. Réduire la complexité du code à un minimum {#reduce-code-complexity}

Les développeurs de logiciels traditionnels sont familiers avec le principe KISS (« keep it simple, stupid ») qui recommande de ne pas introduire de complexité inutile dans la conception de logiciels. Cela fait suite à la pensée de longue date selon laquelle « les systèmes complexes échouent de manière complexe » et sont plus susceptibles d’être confrontés à des erreurs coûteuses.

Garder les choses simples est particulièrement important lors de la rédaction de contrats intelligents, étant donné que les contrats intelligents contrôlent potentiellement de grandes quantités de valeur. Une astuce pour atteindre la simplicité lors de l'écriture de contrats intelligents est de réutiliser des bibliothèques existantes, telles que les [contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/), lorsque cela est possible. Parce que ces bibliothèques ont été largement vérifiées et testées par les développeurs, leur utilisation réduit les chances d'introduire des bogues en écrivant de nouvelles fonctionnalités à partir de zéro.

Un autre conseil commun est d'écrire de petites fonctions et de garder les contrats modulaires en divisant la logique commerciale entre plusieurs contrats. Non seulement l'écriture de code plus simple réduit la surface d'attaque dans un contrat intelligent, mais il est également plus facile de raisonner sur la justesse du système global et de détecter les éventuelles erreurs de conception plus tôt.

### 9. Protéger contre les vulnérabilités communes des contrats intelligents {#mitigate-common-smart-contract-vulnerabilities}

#### Réentrance {#reentrancy}

L’EVM ne permet pas la simultanéité, ce qui signifie que deux contrats impliqués dans un appel de message ne peuvent pas être exécutés simultanément. Un appel externe met en pause l'exécution et la mémoire du contrat d'appel jusqu'à ce que l'appel revienne, à partir duquel l'exécution du point se déroule normalement. Ce processus peut être décrit formellement comme le transfert du [flux de contrôle](https://www.computerhope.com/jargon/c/contflow.htm) vers un autre contrat.

Bien que la plupart du temps inoffensifs, le transfert de flux de contrôle vers des contrats non approuvés peut causer des problèmes, tels que la réentrance. Une attaque par réentrance survient lorsqu'un contrat malveillant rappelle un contrat vulnérable avant que l'invocation de la fonction d'origine ne soit terminée. Ce type d'attaque est mieux expliqué avec un exemple.

Considérez un simple contrat intelligent (« Victim ») qui permet à quiconque de déposer et de retirer de l'Ether :

```solidity
// This contract is vulnerable. Do not use in production

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

Ce contrat expose une fonction `withdraw()` pour permettre aux utilisateurs de retirer de l'ETH précédemment déposé dans le contrat. Lors du traitement d'un retrait, le contrat effectue les opérations suivantes :

1. Vérifie le solde ETH de l'utilisateur
2. Envoie des fonds à l'adresse d'appel
3. Réinitialise son solde à 0, empêchant les retraits supplémentaires de l'utilisateur

La fonction `withdraw()` dans le contrat `Victim` suit un modèle « checks-interactions-effects ». Il _vérifie_ si les conditions nécessaires à l'exécution sont satisfaites (c.-à-d. l'utilisateur a un solde ETH positif) et effectue l'interaction __ en envoyant l'ETH à l'adresse de l'appelant, avant d'appliquer les _effets_ de la transaction (c.-à-d., réduisant le solde de l’utilisateur).

Si la fonction `withdraw()` est appelée depuis un compte externe (Externally Orné Account, dit EOA), la fonction s'exécute comme attendu : `msg.sender.call.value()` envoie l'ETH à l'appelant. Cependant, si `msg.sender` est un compte de contrat intelligent qui appelle `withdraw()`, l'envoie de fonds en utilisant `msg.sender.call.value()` déclenchera également le code stocké à cette adresse pour l'exécuter.

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

Il n'y a rien de mal ici, excepté que l'`Attacker` a une autre fonction qui appelle `withdraw()` dans `Victim` à nouveau si le gaz restant du `msg.sender.call.value` entrant est supérieur à 40 000. Cela donne à l'`Attacker` la possibilité de rentrer `Victim` et de retirer plus de fonds _avant que_ la première invocation de `withdraw` soit terminée. Le cycle ressemble à ceci:

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

Le résumé est que, comme le solde de l'appelant n'est pas défini à 0 jusqu'à ce que l'exécution de la fonction soit terminée, les invocations suivantes réussiront et permettront à l'appelant de retirer son solde plusieurs fois. Ce type d'attaque peut être utilisé pour drainer un contrat intelligent de ses fonds, comme ce qui s'est passé dans le hack [DAO 2016](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Les attaques par réentrance sont toujours un problème critique pour les contrats intelligents aujourd'hui, comme le montre [les listes publiques des exploits de réentrance](https://github.com/pcaversaccio/reentrancy-attacks).

##### Comment empêcher les attaques par réentrance

Une approche pour traiter la réentrance est de suivre le [modèle de vérifications-effets-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Ce modèle ordonne l'exécution de fonctions d'une manière que le code qui effectue les vérifications nécessaires avant de progresser avec l'exécution arrive en premier, suivi du code qui manipule l'état du contrat, avec du code qui interagit avec d'autres contrats ou EOA arrivant en dernier.

Le modèle de vérifications-effets-interactions est utilisé dans une version révisée du contrat `Victim` affichée ci-dessous :

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

Ce contrat effectue un _check_ sur le solde de l'utilisateur, applique les _effects_ de la fonction `withdraw()` (en réinitialisant le solde de l'utilisateur à 0), et procède à l’exécution de l'_interaction_ (envoi de l’ETH à l’adresse de l’utilisateur). Cela garantit que le contrat met à jour son stockage avant l’appel externe, éliminant ainsi la condition de réentrance qui a permis la première attaque. Le contrat `Attacker` pourrait toujours être rappelé dans `NoLongerAVictim`, mais depuis que `balances[msg.sender]` a été réglé à 0, les retraits supplémentaires lanceront une erreur.

Une autre option est d'utiliser un verrou d'exclusion mutuelle (communément décrit comme un « mutex ») qui verrouille une partie de l'état d'un contrat jusqu'à ce qu'une invocation de fonction soit terminée. Ceci est implémenté en utilisant une variable booléenne qui est définie à `true` avant que la fonction ne s'exécute et retourne à `false` après que l'invocation ait été faite. Comme on le voit dans l'exemple ci-dessous, l'utilisation d'un mutex protège une fonction contre les appels récursifs alors que l'invocation originale est toujours en cours de traitement, empêchant ainsi efficacement la réentrance.

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
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Vous pouvez également utiliser un système de [« pull payments »](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) qui demande aux utilisateurs de retirer des fonds des contrats intelligents, au lieu d'un système de paiement « push payments » qui envoie des fonds à des comptes. Cela élimine la possibilité de déclencher par inadvertance du code à des adresses inconnues (et peut également prévenir certaines attaques par déni de service).

#### Soupassements et dépassements d'entier {#integer-underflows-and-overflows}

Un dépassement d'entier se produit lorsque les résultats d'une opération arithmétique tombent en dehors de la plage de valeurs acceptable, le faisant passer à la valeur représentable la plus basse. Par exemple, un `uint8` ne peut stocker que des valeurs allant jusqu'à 2^8-1=255. Les opérations arithmétiques qui aboutissent à des valeurs supérieures à `255` dépasseront et réinitialiseront `uint` à `0`, similaire à la façon dont l'odomètre sur une voiture se réinitialise à 0 une fois qu'il atteint le kilométrage maximum (999999).

Les soupassements d'entier se produisent pour des raisons similaires : les résultats d'une opération arithmétique sont inférieurs à la fourchette acceptable. Disons que vous avez essayé de diminuer `0` dans un `uint8`, le résultat ne ferait que passer à la valeur représentative maximale (`255`).

Les dépassements d'entier et les soupassements peuvent entraîner des changements inattendus dans les variables d'état d'un contrat et entraîner une exécution non planifiée. Voici un exemple montrant comment un attaquant peut exploiter un dépassement arithmétique dans un contrat intelligent pour effectuer une opération invalide :

```
pragma solidity ^0.7.6;

// Ce contrat est conçu pour servir de coffre temporel.
// L'utilisateur peut déposer dans ce contrat mais ne peut pas se retirer pendant au moins une semaine.
// L'utilisateur peut également prolonger le temps d'attente au-delà de la période d'attente de 1 semaine.

/*
1. Déployer TimeLock
2. Déployer l'Attaque avec l'adresse de TimeLock
3. Appeler Attaque.attack en envoyant 1 éther. Vous pourrez immédiatement
   retirer votre éther.

Que s'est-il passé ?
L'attaque a causé un dépassement de TimeLock.lockTime et a pu entraîner un retrait
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
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Comment éviter les soupassements et dépassements d'entier

Depuis la version 0.8.0, le compilateur Solidity rejette le code qui entraîne des soupassements et dépassements d'entier. Cependant, les contrats compilés avec une version inférieure du compilateur devraient soit effectuer des vérifications sur des fonctions impliquant des opérations arithmétiques soit utiliser une bibliothèque (par ex., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) qui vérifie le soupassement/dépassement.

#### Manipulation Oracle {#oracle-manipulation}

[Les Oracles](/developers/docs/oracles/) sourcent des informations hors chaîne et les envoient en chaîne pour les contrats intelligents à utiliser. Avec des oracles, vous pouvez concevoir des contrats intelligents qui interagissent avec des systèmes hors chaîne, tels que les marchés de capitaux, en élargissant considérablement leur application.

Mais si l'oracle est corrompu et envoie des informations incorrectes en chaîne, les contrats intelligents s'exécuteront sur la base d'entrées erronées, ce qui peut causer des problèmes. C'est la base du « problème de l'oracle », qui concerne la tâche de s'assurer que les informations provenant d'un oracle de la blockchain sont exactes, à jour et en temps opportun.

Une préoccupation liée à la sécurité consiste à utiliser un oracle en chaîne, tel qu'un échange décentralisé, pour obtenir le prix au comptant d'un actif. Les plateformes de prêt dans l'industrie [de la finance décentralisée (DeFi)](/defi/) le font souvent pour déterminer la valeur de la garantie d'un utilisateur pour déterminer le montant qu'il peut emprunter.

Les prix des DEX sont souvent exacts, en grande partie en raison du rétablissement de la parité sur les marchés. Cependant, ils sont ouverts à la manipulation, en particulier si l'oracle sur la chaîne calcule les prix des actifs en fonction des modèles de négociation historiques (comme c'est généralement le cas).

Par exemple, un attaquant pourrait artificiellement pomper le prix au comptant d'un actif en souscrivant un prêt flash juste avant d'interagir avec votre contrat de prêt. Interroger le DEX pour le prix de l’actif reviendrait à une valeur plus élevée que la normale (en raison de la forte demande de transfert de « l'ordre d’achat » de l’attaquant pour l’actif), leur permettant d'emprunter plus qu'ils ne le devraient. De telles « attaques de prêts flash » ont été utilisées pour exploiter la dépendance à l'égard de prix oracles parmi les applications DeFi, coûtant des millions de protocoles en fonds perdus.

##### Comment éviter la manipulation d'oracle

Le minimum requis pour [éviter la manipulation d'oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) est d'utiliser un réseau oracle décentralisé qui interroge des informations provenant de sources multiples pour éviter les points de défaillance uniques. Dans la plupart des cas, les oracles décentralisés ont des incitations cryptoéconomiques intégrées pour encourager les noeuds d'oracle à signaler des informations correctes, les rendant plus sûres que les oracles centralisés.

Si vous comptez interroger un oracle sur le prix des actifs, envisagez d'utiliser un mécanisme qui implémente un prix moyen pondéré (« Time Weighted Average Price », dit TWAP). Un [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroge le prix d'un actif à deux points différents dans le temps (que vous pouvez modifier) et calcule le prix au comptant en fonction de la moyenne obtenue. Le choix de périodes plus longues protège votre protocole contre la manipulation des prix car les larges ordres exécutés récemment ne peuvent pas affecter les prix des actifs.

## Ressources de sécurité de contrats intelligents pour les développeurs {#smart-contract-security-resources-for-developers}

### Outils pour analyser les contrats intelligents et vérifier la justesse du code {#code-analysis-tools}

- **[Outils de test et bibliothèques](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Collection d'outils et de bibliothèques standards pour effectuer des tests unitaires, des analyses statiques et des analyses dynamiques des contrats intelligents._

- **[Outils de vérification formels](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Outils de vérification de l'exactitude fonctionnelle dans les contrats intelligents et de vérification des invariants._

- **[Services d'audit de contrats intelligents](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liste des organisations fournissant des services d'audit de contrats intelligents pour les projets de développement d'Ethereum._

- **[Plateformes de récompenses de bugs](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plateformes pour coordonner les récompenses de bugs et récompensant la divulgation responsable de vulnérabilités critiques dans les contrats intelligents._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _ : Il s'agit d'un outil gratuit en ligne pour la vérification de toutes les informations disponibles concernant un contrat issu du fork._

- **[ABI Encoder](https://abi.hashex.org/)** - _ : Il s'agit d'un service gratuit en ligne pour l'encodage des fonctions de contrat Solidity et de vos arguments de constructeur._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analyseur statique de Solidity, parcourant les arbres de syntaxe abstraite (AST) pour repérer les vulnérabilités suspectes et imprimant les problèmes dans un format markdown facile à utiliser._

### Outils de surveillance des contrats intelligents {#smart-contract-monitoring-tools}

- **[Sentinelles de défenseur OpenZeppelin](https://docs.openzeppelin.com/defender/v1/sentinel)** - _Un outil pour surveiller et répondre automatiquement aux événements, fonctions et paramètres de transaction sur vos contrats intelligents._

- **[Alerte en temps réel Tenderly](https://tenderly.co/alerting/)** - _Un outil pour recevoir des notifications en temps réel lorsque des événements inhabituels ou inattendus se produisent sur vos contrats intelligents ou portefeuilles._

### Outils pour une administration sécurisée des contrats intelligents {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** - _Interface pour gérer l'administration des contrats intelligents, y compris les contrôles d'accès, les mises à jour et la pause._

- **[Safe](https://safe.global/)** - _Portefeuille à contrat intelligent fonctionnant sur Ethereum qui exige qu'un nombre minimum de personnes approuvent une transaction avant qu'elle ne puisse avoir lieu (M-of-N)._

- **[Contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)** - _Bibliothèques de contrats pour l'implémentation de fonctions administratives, y compris la propriété contractuelle, les mises à niveau, les contrôles d'accès, la gouvernance, les possibilités de pause, et plus encore._

### Services d'audit pour contrat intelligent {#smart-contract-auditing-services}

- **[Diligence ConsenSys](https://consensys.net/diligence/)** - _Service d'audit de contrat intelligent pour aider les projets à travers l'écosystème de la blockchain à s'assurer que leurs protocoles sont prêts à être lancés et construits pour protéger les utilisateurs._

- **[CertiK](https://www.certik.com/)** - _société de sécurité blockchain pionnière dans l'utilisation d'une technologie de vérification formelle de pointe sur les contrats intelligents et les réseaux blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Entreprise de cybersécurité qui combine la recherche de sécurité avec une mentalité d'attaquant pour réduire le risque et fortifier le code._

- **[PeckShield](https://peckshield.com/)** - _Société de sécurité blockchain offrant des produits et des services pour la sécurité, la confidentialité et la convivialité de l'ensemble de l'écosystème blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Service d'audit facilitant l'adoption courante de la technologie blockchain par les services de sécurité et d'évaluation des risques._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Société de sécurité de contrat intelligent fournissant des audits de sécurité pour les systèmes distribués._

- **[Vérification de l'exécution](https://runtimeverification.com/)** - _Entreprise de sécurité spécialisée dans la modélisation et la vérification formelles des contrats intelligents._

- **[Hacken](https://hacken.io)** - _Auditeur de cybersécurité Web3 apportant une approche à 360° à la sécurité de la blockchain._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _Des services offrant des audits Cairo et Solidity, utilisés comme garantie pour assurer l'intégrité des contrats intelligents et la sécurité des utilisateurs dans les écosystèmes Ethereum et Starknet._

- **[HashEx](https://hashex.org/)** - _Les rapports d'audit présentés par HashEx relatifs à la blockchain et aux contrats intelligents, visent à garantir la sécurité des cryptomonnaies, fournissant des services tels que le développement des contrats intelligents, le test de pénétration, ou le conseil blockchain._

- **[Code4rena](https://code4rena.com/)** - _Une plateforme concurrentielle, réputée pour ses audits de sécurité, qui prête main forte aux experts garantissant la sécurité des smart-contracts, dans l'objectif commun d'œuvrer à la sécurisation du Web3. _

- **[CodeHawks](https://codehawks.com/)** - _Plateforme d'audits compétitifs hébergeant des concours d'audit de contrats intelligents pour les chercheurs en sécurité._

- **[Cyfrin](https://cyfrin.io)** - _Puissante centrale de sécurité du Web3, veillant sur la sécurité cryptographique avec des produits et des services d'audit de contrats intelligents._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _Entreprise de sécurité Web3 qui propose des audits de sécurité pour les systèmes de blockchain grâce à une équipe d'auditeurs expérimentés et des outils de premier plan._

- **[Oxorio](https://oxor.io/)** - _Audits de contrats intelligents et services de sécurité blockchain avec expertise concernant l'EVM, Solidity, le ZK, la technologie inter-chaînes pour les entreprises de crypto et les projets de DeFi._

- **[Inference](https://inference.ag/)** - _Entreprise d'audit de sécurité spécialisée dans l'audit de contrats intelligents pour les blockchains basées sur l'EVM. Grâce à ces auditeurs experts, elle identifie les problèmes potentiels et suggèrent des solutions opérationnelles pour les régler avant leur déploiement._

### Plateformes de récompense de bug {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Plateforme de récompense de bug pour les contrats intelligents et les projets DeFi, où les chercheurs en sécurité examinent le code, révèlent les vulnérabilités, sont payés et rendent les crypto-monnaies plus sûres._

- **[HackerOne](https://www.hackerone.com/)** - _Coordination de vulnérabilité et plateforme de récompense de bogue qui relie les entreprises aux testeurs de pénétration et aux chercheurs en cybersécurité._

- **[HackenProof](https://hackenproof.com/)** - _Plateforme de récompense de bogue pour les projets de cryptomonnaies (DeFi, contrats intelligents, portefeuilles, CEX et bien plus encore), où les professionnels de la sécurité fournissent des services de triage et les chercheurs sont payés pour des rapports de bogues pertinents et vérifiés._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Souscripteur en Web3 pour la sécurité des contrats intelligents, offrant des paiements pour les auditeurs gérés via des contrats intelligents pour garantir que les bugs pertinents soient payés équitablement._

-  **[CodeHawks](https://www.codehawks.com/)** - _Plateforme de primes de bugs compétitive où les auditeurs participent à des concours et défis de sécurité, et (bientôt) à leurs propres audits privés._

### Publications de vulnérabilités connues de contrats intelligents et d'exploitations {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys : Attaques connues sur les contrats intelligents](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _Explication conviviale pour le débutant des vulnérabilités contractuelles les plus significatives, avec le code d'échantillon pour la plupart des cas._

- **[Registre SWC](https://swcregistry.io/)** - _Liste organisée d'éléments d'énumération des faiblesses communes (« Common Weakness Enumeration », dit CWE) qui s'appliquent aux contrats intelligents Ethereum._

- **[Rekt](https://rekt.news/)** - _Publication mise à jour régulière de hacks et d'exploits de cryptomonnaies haut de gamme, ainsi que de rapports détaillés post-mortem._

### Défis pour l'apprentissage de la sécurité des contrats intelligents {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Liste organisée des wargames de sécurité de la blockchain, des défis, des concours [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) concours et des rédactions de solutions._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame pour apprendre la sécurité offensive des contrats intelligents DeFi et développer des compétences en matière de chasse aux bogues et d'audit de sécurité._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame basé sur Web3/Solidity où chaque niveau est un contrat intelligent qui doit être « hacké »._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Défi de piratage de contrats intelligents, situé dans le cadre d'une aventure fantastique. La résolution du défi donne également accès à un programme privé de primes de bugs._

### Meilleures pratiques pour sécuriser les contrats intelligents {#smart-contract-security-best-practices}

- **[Consensys : Meilleures pratiques en termes de sécurité pour les contrats intelligents Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Liste complète de lignes directrices pour sécuriser les contrats intelligents Ethereum._

- **[Nascent : Boîte à outils de sécurité simple](https://github.com/nascentxyz/simple-security-toolkit)** - _Collection de guides pratiques axés sur la sécurité et de listes de contrôle pour le développement de contrats intelligents._

- **[Modèles Solidity](https://fravoll.github.io/solidity-patterns/)** -> _Compilation utile de pratiques sécurisées et de meilleures pratiques pour le langage de programmation des contrats intelligents Solidity._

- **[Docs Solidity : considérations en matière de sécurité](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Directives pour l'écriture de contrats intelligents sécurisés avec Solidity._

- **[Norme de vérification de la sécurité des contrats intelligents](https://github.com/securing/SCSVS)** - _Liste de contrôle de quatorze parties créée pour standardiser la sécurité des contrats intelligents pour les développeurs, architectes, réviseurs de sécurité et fournisseurs._

- **[Apprendre la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)** - _Le cours ultime sur la sécurité et l'audit des contrats intelligents, conçu pour les développeurs de contrats intelligents souhaitant améliorer leurs pratiques en matière de sécurité et devenir des chercheurs en sécurité._

### Tutoriels sur la sécurité des contrats intelligents {#tutorials-on-smart-contract-security}

- [Comment écrire des contrats intelligents sécurisés](/developers/tutorials/secure-development-workflow/)

- [Comment utiliser Slither pour trouver des bugs de contrat intelligent](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Comment utiliser Manticore pour trouver les bogues dans les contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Directives de sécurité pour les contrats intelligents](/developers/tutorials/smart-contract-security-guidelines/)

- [Comment intégrer en toute sécurité votre contrat de jetons avec des jetons arbitraires](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Cours complet sur la sécurité et l'audit des contrats intelligents](https://updraft.cyfrin.io/courses/security)
