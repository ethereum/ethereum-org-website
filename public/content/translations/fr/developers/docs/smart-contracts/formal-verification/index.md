---
title: Vérification formelle des contrats intelligents
description: Un aperçu de la vérification formelle des contrats intelligents Ethereum
lang: fr
---

[Les contrats intelligents](/developers/docs/smart-contracts/) permettent de créer des applications décentralisées, sans confiance et robustes qui introduisent de nouveaux cas d'utilisation et déverrouillent la valeur pour les utilisateurs. Parce que les contrats intelligents gèrent de grandes quantités de valeur, la sécurité est une considération essentielle pour les développeurs.

La vérification formelle est l'une des techniques recommandées pour améliorer [la sécurité du contrat intelligent](/developers/docs/smart-contracts/security/). La vérification formelle, qui utilise [des méthodes formelles](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) pour spécifier, concevoir et vérifier les programmes a été utilisée pendant des années pour assurer l'exactitude des systèmes matériels et logiciels critiques.

Lorsqu'elle est mise en œuvre dans des contrats intelligents, la vérification formelle peut prouver que la logique commerciale d'un contrat répond à une spécification prédéfinie. Pa rapport à d'autres méthodes d'évaluation de la justesse du code contractuel, comme les tests, la vérification formelle donne des garanties plus solides qu'un contrat intelligent est correct sur le plan fonctionnel.

## Qu'est-ce que la vérification formelle ? {#what-is-formal-verification}

La vérification formelle fait référence au processus d'évaluation de la justesse d'un système par rapport à une spécification formelle. En termes plus simples, la vérification formelle nous permet de vérifier si le comportement d'un système répond à certaines exigences (c'est-à-dire qu'il fait ce que nous voulons).

Les comportements attendus du système (un contrat intelligent dans ce cas) sont décrits à l'aide de la modélisation formelle, tandis que les langages de spécification permettent la création de propriétés formelles. Les techniques formelles de vérification peuvent ensuite vérifier que la mise en œuvre d'un contrat est conforme à ses spécifications et tirer des preuves mathématiques de l'exactitude de l'exécutif. Lorsqu’un contrat satisfait à ses spécifications, il est décrit comme étant « fonctionnellement correct », « correct par conception » ou « correct par construction ».

### Qu'est-ce qu'un modèle formel ? {#what-is-a-formal-model}

En informatique, un [modèle formel](https://en.wikipedia.org/wiki/Model_of_computation) est une description mathématique d'un processus de calcul. Les programmes sont abstraits en fonctions mathématiques (équations), avec le modèle décrivant comment les sorties aux fonctions sont calculées en entrée donnée.

Les modèles formels fournissent un niveau d'abstraction sur lequel l'analyse du comportement d'un programme peut être évaluée. L'existence de modèles formels permet la création d'une _spécification formelle_ qui décrit les propriétés souhaitées du modèle en question.

Différentes techniques sont utilisées pour modéliser des contrats intelligents pour la vérification formelle. Par exemple, certains modèles sont utilisés pour expliquer le comportement à haut niveau d'un contrat intelligent. Ces techniques de modélisation appliquent une vue en boîte noire aux contrats intelligents, les considérant comme des systèmes qui acceptent les entrées et exécutent le calcul basé sur ces entrées.

Les modèles de haut niveau se concentrent sur la relation entre les contrats intelligents et les agents externes, tels que les comptes détenus à l'extérieur (EOA), les comptes contractuels et l'environnement blockchain. De tels modèles sont utiles pour définir des propriétés qui spécifient comment un contrat doit se comporter en réponse à certaines interactions de l'utilisateur.

Inversement, d'autres modèles formels se concentrent sur le comportement de bas niveau d'un contrat intelligent. Bien que les modèles de haut niveau puissent contribuer à raisonner sur les fonctionnalités d'un contrat, ils peuvent échouer à saisir des détails sur le fonctionnement interne de l'implémentation. Les modèles de bas niveau appliquent une vue en boîte blanche à l'analyse du programme et s'appuient sur des représentations de bas niveau des applications du contrat intelligent, comme le programme trace et [ contrôle les graphiques de flux](https://en.wikipedia.org/wiki/Control-flow_graph), afin de réfléchir sur les propriétés pertinentes pour l'exécution d'un contrat.

Les modèles de bas niveau sont considérés comme idéaux puisqu'ils représentent l'exécution réelle d'un contrat intelligent dans l'environnement d'exécution d'Ethereum (c'est-à-dire l'[EVM](/developers/docs/evm/)). Les techniques de modélisation de bas niveau sont particulièrement utiles pour établir des propriétés de sécurité critiques dans les contrats intelligents et détecter les vulnérabilités potentielles.

### Qu'est-ce que la vérification formelle ? {#what-is-a-formal-specification}

Une spécification est simplement une exigence technique à laquelle un système particulier doit satisfaire. Dans la programmation, les spécifications représentent des idées générales sur l'exécution d'un programme (c'est-à-dire ce que le programme doit faire).

Dans le contexte des contrats intelligents, les spécifications formelles font référence aux _propriétés_- descriptions formelles des exigences qu'un contrat doit satisfaire. De telles propriétés sont décrites comme des « invariants » et représentent des assertions logiques sur l'exécution d'un contrat qui doivent rester vraies dans toutes les circonstances possibles, sans aucune exception.

Ainsi, nous pouvons considérer une spécification formelle comme un ensemble de déclarations écrites dans un langage formel décrivant l'exécution prévue d'un contrat intelligent. Les spécifications couvrent les propriétés d'un contrat et définissent comment le contrat devrait se comporter dans des circonstances différentes. Le but de la vérification officielle est de déterminer si un contrat intelligent possède ces propriétés (invariants) et si ces propriétés ne sont pas enfreintes pendant l'exécution.

Les spécifications formelles sont cruciales pour la mise en œuvre sécurisée de contrats intelligents. Les contrats qui ne mettent pas en œuvre les invariants ou qui ont leurs propriétés violées pendant l'exécution sont sujets à des vulnérabilités qui peuvent nuire aux fonctionnalités ou causer des exploits malveillants.

## Types de spécifications formelles des contrats intelligents {#formal-specifications-for-smart-contracts}

Les spécifications formelles permettent un raisonnement mathématique sur la justesse de l'exécution du programme. Comme pour les modèles formels, les spécifications formelles peuvent capturer des propriétés de haut niveau ou un comportement de bas niveau lors de l’implémentation d'un contrat.

Les spécifications formelles sont dérivées de l'utilisation des éléments de la [logique des programmes](https://en.wikipedia.org/wiki/Logic_programming), qui permettent un raisonnement formel sur les propriétés d'un programme. La logique d'un programme comporte des règles formelles qui expriment (en langage mathématique) le comportement attendu d'un programme. Diverses logiques de programme sont utilisées pour créer des spécifications formelles, notamment [la logique d'accessibilité](https://en.wikipedia.org/wiki/Reachability_problem), [la logique temporelle](https://en.wikipedia.org/wiki/Temporal_logic) et [la logique de Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Les spécifications formelles des contrats intelligents peuvent être classées en deux catégories : les spécifications de **haut niveau** ou les spécifications de **bas niveau**. Quelle que soit la catégorie à laquelle appartient une spécification, elle doit décrire de manière adéquate et sans ambiguïté la propriété du système analysé.

### Spécifications de haut niveau {#high-level-specifications}

Comme son nom l'indique, une spécification de haut niveau (également appelée « spécification orientée modèle ») décrit le comportement de haut niveau d'un programme. Les spécifications de haut niveau modélisent un contrat intelligent comme une [machine à états finis](https://en.wikipedia.org/wiki/Finite-state_machine) (finite state machine, FSM), qui peut passer d'un état à l'autre en effectuant des opérations, la logique temporelle étant utilisée pour définir les propriétés formelles du modèle FSM.

[Les logiques temporelles](https://en.wikipedia.org/wiki/Temporal_logic) sont des « règles de raisonnement sur des propositions qualifiées en termes de temps (par exemple, " j'ai _toujours_ faim " ou " j'aurai faim _un jour_ "). » Appliquées à la vérification formelle, les logiques temporelles sont utilisées pour énoncer des assertions sur le comportement correct de systèmes modélisés comme des machines à états. Plus précisément, une logique temporelle décrit les états futurs dans lesquels un contrat intelligent peut se trouver et la manière dont il passe d'un état à l'autre.

Les spécifications de haut niveau tiennent généralement compte de deux propriétés temporelles essentielles pour les contrats intelligents : la **sécurité** et la **permanence**. Les propriétés de sécurité représentent l'idée que « rien de mauvais n'arrive jamais » et expriment généralement l'invariance. Une propriété de sécurité peut définir des exigences logicielles générales, telles que l'absence de [deadlock](https://www.techtarget.com/whatis/definition/deadlock), ou exprimer des propriétés spécifiques à un domaine pour les contrats (par exemple, des invariants sur le contrôle d'accès pour les fonctions, des valeurs admissibles de variables d'état ou des conditions pour les transferts de jetons).

Prenons par exemple cette exigence de sécurité qui couvre les conditions d'utilisation de `transfer()` ou de `transferFrom()` dans les contrats de jetons ERC-20 : _« Le solde d'un expéditeur n'est jamais inférieur à la quantité demandée de jetons à envoyer. »_. Cette description en langage naturel d'un invariant contractuel peut être traduite en une spécification formelle (mathématique), dont la validité peut ensuite être rigoureusement vérifiée.

Les propriétés de vivacité affirment que « quelque chose de bien finit par se produire » et concernent la capacité d'un contrat à passer par différents états. La « liquidité », qui désigne la capacité d'un contrat à transférer ses soldes aux utilisateurs qui en font la demande, est un exemple de propriété de vivacité. En cas de violation de cette propriété, les utilisateurs ne pourraient pas retirer les actifs stockés dans le contrat, comme cela s'est produit lors de l'incident du [Parity wallet](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Spécifications de bas niveau {#low-level-specifications}

Les spécifications de haut niveau prennent comme point de départ un modèle d'état fini d'un contrat et définissent les propriétés souhaitées de ce modèle. En revanche, les spécifications de bas niveau (également appelées « spécifications axées sur les propriétés ») modélisent souvent les programmes (contrats intelligents) comme des systèmes comprenant une collection de fonctions mathématiques et décrivent le comportement correct de ces systèmes.

Pour simplifier, les spécifications de bas niveau analysent les _traces de programme_ et tentent de définir les propriétés d'un contrat intelligent à partir de ces traces. Les traces font référence à des séquences d'exécutions de fonctions qui modifient l'état d'un contrat intelligent ; par conséquent, les spécifications de bas niveau permettent de préciser les exigences relatives à l'exécution interne d'un contrat.

Les spécifications formelles de bas niveau peuvent être données sous forme de propriétés de type Hoare ou d'invariants sur les chemins d'exécution.

### Propriétés de style Hoare {#hoare-style-properties}

[La logique Hoare](https://en.wikipedia.org/wiki/Hoare_logic) fournit un ensemble de règles formelles pour raisonner sur la correction des programmes, y compris les contrats intelligents. Une propriété de style Hoare est représentée par un triple Hoare {_P_}_c_{_Q_}, où _c_ est un programme et _P_ et _Q_ sont des prédicats sur l'état de _c_ (c'est-à-dire le programme), formellement décrits comme des _prérequis_ et des _conditions ulérieures_, respectivement.

Un prérequis est un prédicat décrivant les conditions requises pour l'exécution correcte d'une fonction ; les utilisateurs qui font appel au contrat doivent satisfaire à cette exigence. Une condition ultérieure est un prédicat décrivant la condition qu'une fonction établit si elle est correctement exécutée ; les utilisateurs peuvent s'attendre à ce que cette condition soit vraie après avoir appelé la fonction. Un _invariant_ en logique Hoare est un prédicat qui est préservé par l'exécution d'une fonction (c'est-à-dire qu'il ne change pas).

Les spécifications de type Hoare peuvent garantir soit _une correction partielle_, soit _une correction totale_. La mise en œuvre d'une fonction contractuelle est « partiellement correcte » si le prérequis est vrai avant l'exécution de la fonction, et si l'exécution se termine, la condition ultérieure est également vraie. La preuve de l'exactitude totale est obtenue si un prérequis est vrai avant l'exécution de la fonction, si l'exécution est garantie comme devant se terminer et si, lorsqu'elle se termine, la condition ultérieure est vraie.

Il est difficile d'obtenir une preuve de l'exactitude totale, car certaines exécutions peuvent être retardées avant de se terminer, ou ne jamais se terminer du tout. Cela dit, la question de savoir si l'exécution se termine est sans doute discutable puisque le mécanisme de gaz d'Ethereum empêche les boucles de programme infinies (l'exécution se termine soit avec succès, soit en raison d'une erreur de type « panne de gaz »).

Les spécifications des contrats intelligents créées à l'aide de la logique Hoare comporteront des conditions préalables, des conditions ultérieures et des invariants définis pour l'exécution des fonctions et des boucles dans un contrat. Les prérequis incluent souvent la possibilité d'entrées erronées dans une fonction, les conditions ultérieures décrivant la réponse attendue à ces entrées (par exemple, le lancement d'une exception spécifique). De cette manière, les propriétés de type Hoare sont efficaces pour garantir l'exactitude de la mise en œuvre des contrats.

De nombreux cadres de vérification formelle utilisent des spécifications de type Hoare pour prouver l'exactitude sémantique des fonctions. Il est également possible d'ajouter des propriétés de type Hoare (sous forme d'assertions) directement au code du contrat en utilisant les instructions `require` et `assert` dans Solidity.

Les instructions `require` expriment une condition préalable ou un invariant et sont souvent utilisées pour valider les entrées de l'utilisateur, tandis que `assert` capture une condition ultérieure nécessaire pour la sécurité. Par exemple, un contrôle d'accès approprié pour les fonctions (un exemple de propriété de sécurité) peut être réalisé en utilisant `require` comme vérification de la condition préalable de l'identité du compte appelant. De même, un invariant sur les valeurs admissibles des variables d'état dans un contrat (par exemple, le nombre total de jetons en circulation) peut être protégé contre les violations en utilisant `assert` pour confirmer l'état du contrat après l'exécution de la fonction.

### Propriétés au niveau de la trace {#trace-level-properties}

Les spécifications basées sur les traces décrivent les opérations qui permettent à un contrat de passer d'un état à l'autre et les relations entre ces opérations. Comme expliqué précédemment, les traces sont des séquences d'opérations qui modifient l'état d'un contrat d'une manière particulière.

Cette approche repose sur un modèle de contrats intelligents en tant que systèmes de transition d'état avec certains états prédéfinis (décrits par des variables d'état) ainsi qu'un ensemble de transitions prédéfinies (décrites par des fonctions de contrat). En outre, un [graphique de flux de contrôle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), qui est une représentation graphique du flux d'exécution d'un programme, est souvent utilisé pour décrire la sémantique opérationnelle d'un contrat. Ici, chaque trace représentée comme un chemin sur le graphe du flux de contrôle.

En premier lieu, les spécifications de niveau de trace sont utilisées pour expliquer les modèles d'exécution interne dans les contrats intelligents. En créant des spécifications de niveau de trace, nous affirmons que les chemins d'exécution sont admissibles (c'est-à-dire les transitions d'état) pour un contrat intelligent. En utilisant des techniques, telles que l'exécution symbolique, nous pouvons formellement vérifier que l'exécution ne suit jamais un chemin non défini dans le modèle formel.

Utilisons un exemple de contrat [DAO](/dao/) qui a des fonctions accessibles au public pour décrire les propriétés de niveau de trace. Ici, nous supposons que le contrat DAO permet aux utilisateurs d'effectuer les opérations suivantes :

- Déposer des fonds

- Voter sur une proposition après avoir déposé des fonds

- Demander un remboursement s'ils ne votent pas sur une proposition

Un exemple de propriétés au niveau de la trace pourrait être : _"les utilisateurs qui ne déposent pas de fonds ne peuvent pas voter une proposition"_ ou _"les utilisateurs qui ne votent pas une proposition devraient toujours être en mesure de demander un remboursement"_. Les deux propriétés font valoir les séquences d'exécution préférées (le vote ne peut pas se produire _avant_ de déposer des fonds et réclamer un remboursement ne peut pas se produire _après_ le vote d'une proposition).

## Techniques de vérification formelle des contrats intelligents {#formal-verification-techniques}

### Vérification du modèle {#model-checking}

La vérification du modèle est une technique de vérification formelle dans laquelle un algorithme vérifie un modèle formel d'un contrat intelligent par rapport à ses spécifications. Dans la vérification des modèles, les contrats intelligents sont souvent représentés comme des systèmes de transition d'état, tandis que les propriétés sur les états de contrat autorisés sont définies en utilisant une logique temporelle.

La vérification de modèles nécessite la création d'une représentation mathématique abstraite d'un système (à savoir un contrat) et exprimant les propriétés de ce système à l'aide de formules enracinées dans la [logique propositionnelle](https://www.baeldung.com/cs/propositional-logic). Cela simplifie la tâche de l'algorithme de vérification du modèle, à savoir prouver qu'un modèle mathématique réponde à une formule logique donnée.

La vérification du modèle lors de la vérification formelle est principalement utilisé pour évaluer les propriétés temporelles qui décrivent le comportement d'un contrat au fil du temps. Les propriétés temporelles pour les contrats intelligents incluent _sécurité_ et _disponibilité_, ce que nous avons expliqué plus tôt.

Par exemple, une propriété de sécurité liée au contrôle d'accès (p. ex. _Seul le propriétaire du contrat peut appeler `auto-détruit`_) peut être écrite en logique formelle. Par la suite, l'algorithme de vérification du modèle peut vérifier si le contrat satisfait à cette spécification formelle.

La vérification du modèle utilise l'exploration de l'espace d'état, qui implique la construction de tous les états possibles d'un contrat intelligent et de tenter de trouver des états accessibles qui entraînent des violations des biens. Cependant, cela peut conduire à un nombre infini d'états (connu sous le nom de « problème d'explosion d'état »), donc les vérificateurs de modèles s'appuient sur des techniques d'abstraction pour rendre possible une analyse efficace des contrats intelligents.

### Preuve du théorème {#theorem-proving}

La démonstration de théorèmes est une méthode de raisonnement mathématique sur la justesse des programmes, y compris les contrats intelligents. Il s'agit de transformer le modèle du système d'un contrat et ses spécifications en formules mathématiques (déclarations logiques).

L'objectif de la démonstration de théorèmes est de vérifier l'équivalence logique entre ces déclarations. L'« équivalence logique » (également appelée « bi-implication logique ») est un type de relation entre deux déclarations, la première déclaration étant vraie _si et seulement si_ la seconde déclaration est également vraie.

La relation requise (équivalence logique) entre les déclarations sur le modèle d’un contrat et sa propriété est formulée comme une déclaration prouvable (appelée théorème). En utilisant un système formel d'inférence, le démonstrateur de théorème automatisé peut vérifier la validité du théorème. En d’autres termes, un démonstrateur de théorème peut prouver de manière concluante que le modèle d’un contrat intelligent correspond exactement à ses spécifications.

Alors que la vérification des modèles modélise les contrats comme des systèmes de transition avec des états finis, la démonstration de théorèmes peut gérer l'analyse de systèmes à états infinis. Cependant, cela signifie qu'un démonstrateur de théorème automatisé ne peut pas toujours savoir si un problème logique est « décidable » ou non.

En conséquence, une assistance humaine est souvent nécessaire pour guider le démonstrateur de théorème dans la dérivation des preuves d’exactitude. L'utilisation de l'effort humain dans la démonstration du théorème rend l'utilisation plus coûteuse que le contrôle des modèles, qui est entièrement automatisé.

### Symbolic Execution {#symbolic-execution}

L'exécution symbolique est une méthode d'analyse d'un contrat intelligent en exécutant des fonctions à l'aide de _valeurs symboliques_ (p. ex., `x > 5`) au lieu de _valeurs concrètes_  (p. ex., `x == 5`). En tant que technique de vérification formelle, l'exécution symbolique est utilisée pour justifier formellement les propriétés de niveau de trace dans le code d'un contrat.

L'exécution symbolique représente une trace d'exécution en tant que formule mathématique sur des valeurs d'entrée symboliques, autrement appelée un _prédicat de chemin_. Un [solutionneur SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) est utilisé pour vérifier si un prédicat de chemin est « réalisable » (c.-à-d. s'il existe une valeur qui peut satisfaire la formule). Si un chemin vulnérable est satisfaisant, le solutionneur SMT génère une valeur concrète qui déclenche l'exécution vers ce chemin.

Supposons que la fonction d'un contrat intelligent prend comme entrée une valeur `uint` (`x`) et revient lorsque `x` est supérieur à `5` et aussi inférieur à `10`. Trouver une valeur pour `x` qui déclenche l'erreur en utilisant une procédure de test normale nécessiterait de passer par des dizaines de cas de test (ou plus) sans l'assurance de trouver une entrée déclenchant une erreur.

Inversement, un outil d'exécution symbolique exécuterait la fonction avec la valeur symbolique : `X > 5 ∧ X < 10` (à savoir, `x` est supérieur à 5 ET `x` est inférieur à 10). Le prédicat de chemin associé `x = X > 5 ∧ X < 10` serait alors donné à résoudre à un solutionneur SMT. Si une valeur particulière satisfait la formule `x = X > 5 ∧ X < 10`, le solutionneur SMT la calculera — par exemple, ce dernier peut produire `7` comme une valeur pour `x`.

Parce que l'exécution symbolique repose sur les entrées d'un programme, et l'ensemble des entrées pour explorer tous les états accessibles est potentiellement infini, c'est toujours une forme de test. Cependant, comme le montre l’exemple, l’exécution symbolique est plus efficace que les tests réguliers pour trouver des entrées qui déclenchent des violations des propriétés.

En outre, l'exécution symbolique produit moins de faux positifs que d'autres techniques basées sur la propriété (par exemple, le fuzzing) qui génèrent aléatoirement des entrées dans une fonction. Si un état d'erreur est déclenché lors de l'exécution symbolique, alors il est possible de générer une valeur concrète qui déclenche l'erreur et reproduit le problème.

L'exécution symbolique peut également fournir un certain degré de preuve mathématique de l'exactitude. Considérez l'exemple suivant d'une fonction de contrat avec protection de débordement :

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Une trace d'exécution qui aboutirait à un dépassement d'entier aurait besoin de satisfaire la formule : `z = x + y ET (z >= x) ET (z=>y) ET (z < x OU z < y)` Une telle formule est peu susceptible d'être résolue, donc cela sert de preuve mathématique que la fonction `safe_add` ne déborde jamais.

### Pourquoi utiliser la vérification formelle des contrats intelligents ? {#benefits-of-formal-verification}

#### Nécessité de fiabilité {#need-for-reliability}

La vérification formelle est utilisée pour évaluer la justesse des systèmes critiques de sécurité dont la défaillance peut avoir des conséquences dévastatrices, comme la mort, des blessures ou la ruine financière. Les contrats intelligents sont des applications de grande valeur qui contrôlent d'énormes quantités de valeur, et de simples erreurs de conception peuvent conduire à [des pertes irrécupérables pour les utilisateurs](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Cependant, la vérification formelle d'un contrat avant son déploiement peut accroître les garanties qu'il fonctionnera comme prévu une fois exécuté sur la blockchain.

La fiabilité est une qualité très recherchée dans tout contrat intelligent, surtout parce que le code déployé sur la machine virtuelle Ethereum (EVM) est généralement immuable. Avec les mises à niveau postérieures au lancement qui ne sont pas facilement accessibles, la nécessité de garantir la fiabilité des contrats rend la vérification formelle nécessaire. La vérification formelle est capable de détecter les problèmes délicats, tels que les soupassements et dépassements d'entier, la réadmission et les mauvaises optimisations gazières, qui peuvent faire glisser les vérificateurs et les testeurs passés.

#### Prouver la justesse fonctionnelle {#prove-functional-correctness}

Les tests de programmes sont la méthode la plus courante pour prouver qu'un contrat intelligent satisfait à certaines exigences. Cela implique l'exécution d'un contrat avec un échantillon des données dont il est censé traiter et analyser le comportement. Si le contrat renvoie les résultats escomptés pour les données de l'échantillon, les développeurs auront alors une preuve objective de son exactitude.

Cependant, cette approche ne peut pas prouver une exécution correcte pour les valeurs d'entrée qui ne font pas partie de l'échantillon. Par conséquent, tester un contrat peut aider à détecter les bogues (à savoir si certains chemins de code ne parviennent pas à retourner les résultats souhaités pendant l'exécution), mais **cela ne prouve pas de façon concluante l'absence de bogues**.

Inversement, la vérification formelle peut formellement prouver qu'un contrat intelligent satisfait aux exigences pour une gamme infinie d'exécutions _sans_ exécuter le contrat du tout. Cela nécessite de créer une spécification formelle qui décrit précisément les comportements contractuels corrects et qui développe un modèle formel (mathématique) du système du contrat. Ensuite, nous pouvons suivre une procédure formelle de preuve pour vérifier la cohérence entre le modèle du contrat et ses spécifications.

Avec une vérification formelle, la question de vérifier si la logique commerciale d'un contrat satisfait aux exigences est une proposition mathématique qui peut être prouvée ou infirmée. En prouvant formellement une proposition, nous pouvons vérifier un nombre infini de cas de tests avec un nombre limité d'étapes. De cette manière, la vérification officielle a de meilleures chances de prouver qu'un contrat est fonctionnellement correct en ce qui concerne une spécification.

#### Objectifs de vérification idéaux {#ideal-verification-targets}

Un objectif de vérification décrit le système à vérifier formellement. La vérification formelle est mieux utilisée dans les « systèmes embarqués » (petits logiciels simples qui font partie d'un plus grand système). Ils sont également idéaux pour les domaines spécialisés qui ont peu de règles, car cela facilite la modification d'outils de vérification des propriétés spécifiques au domaine.

Les contrats intelligents, du moins dans une certaine mesure, satisfont aux deux exigences. Par exemple, la petite taille des contrats Ethereum les rend susceptibles de faire l'objet d'une vérification formelle. De même, l'EVM respecte des règles simples, ce qui facilite la spécification et la vérification des propriétés sémantiques des programmes exécutant dans l'EVM.

### Un cycle de développement plus rapide {#faster-development-cycle}

Des techniques de vérification formelles, telles que la vérification de modèles et l'exécution symbolique, sont généralement plus efficaces que l'analyse régulière du code du contrat intelligent (effectué pendant les tests ou l'audit). C'est parce que la vérification formelle repose sur des valeurs symboliques pour tester les assertions (« Que se passe-t-il si un utilisateur essaie de retirer _n_ ? ») contrairement aux tests qui utilisent des valeurs concrètes (« que se passe-t-il si un utilisateur essaie de retirer 5 éthers ? »).

Les variables d'entrée symbolique peuvent couvrir plusieurs classes de valeurs concrètes, de sorte que les approches de vérification formelle promettent plus de couverture de code dans un laps de temps plus court. Lorsqu'elle est utilisée efficacement, la vérification formelle peut accélérer le cycle de développement pour les développeurs.

La vérification formelle améliore également le processus de construction d'applications décentralisées (DApps) en réduisant les erreurs coûteuses de conception. La mise à niveau des contrats (dans la mesure du possible) pour corriger les vulnérabilités nécessite une réécriture extensive des codebases et plus d'efforts pour le développement. La vérification formelle peut détecter de nombreuses erreurs dans les implémentations de contrats qui peuvent faire disparaître les testeurs et les vérificateurs passés et fournir une vaste occasion de résoudre ces problèmes avant de déployer un contrat.

## Inconvénients de la vérification formelle {#drawbacks-of-formal-verification}

### Coût de la main d'œuvre {#cost-of-manual-labor}

La vérification formelle, en particulier la vérification semi-automatisée, au cours de laquelle un humain guide le démonstrateur pour tirer des preuves d'exactitude, nécessite un travail manuel considérable. En outre, la création de spécifications formelles est une activité complexe qui exige un haut niveau de compétence.

Ces facteurs (effort et compétence) rendent la vérification formelle plus exigeante et coûteuse par rapport aux méthodes habituelles d'évaluation de la justesse des contrats, comme les tests et les audits. Néanmoins, il est pratique de payer le coût pour un audit complet de vérification, compte tenu du coût des erreurs dans la mise en œuvre de contrats intelligents.

### Faux négatifs {#false-negatives}

La vérification formelle ne peut vérifier que si l'exécution du contrat intelligent correspond à la spécification formelle. À ce titre, il est important de s'assurer que la spécification décrit correctement les comportements attendus d'un contrat intelligent.

Si les spécifications sont mal écrites, les violations des biens, qui pointent vers des exécutions vulnérables, ne peuvent pas être détectées par l'audit de vérification officiel. Dans ce cas, le développeur pourrait être tenté de penser, de façon erronée, que ce contrat est sans bogue.

### Problèmes de performance {#performance-issues}

La vérification formelle rencontre un certain nombre de problèmes de performance. Par exemple, les problèmes d'explosion d'état et de chemin rencontrés lors de la vérification des modèles et de la vérification symbolique peuvent affecter les procédures de vérification. En outre, les outils de vérification formelle utilisent souvent des solutionneurs SMT et d'autres solutionneurs de contraintes dans leur couche sous-jacente, et ces derniers se basent sur des procédures informatiques intensives.

De plus, il n'est pas toujours possible pour les vérificateurs de programme de déterminer si une propriété (décrite comme une formule logique) peut être satisfaite ou non (le « [problème de décidabilité](https://en.wikipedia.org/wiki/Decision_problem)") car un programme ne pourrait jamais se terminer. En tant que tel, il peut être impossible de prouver certaines propriétés d'un contrat même s'il est bien spécifié.

## Outils de vérification formels pour les contrats intelligents Ethereum {#formal-verification-tools}

### Langues de spécification pour la création de spécifications formelles {#specification-languages}

**Act** : _*Act permet de spécifier les mises à jour de stockage, les prérequis et les conditions ultérieures ainsi que les invariants contractuels. Sa suite d'outils a également des backends éprouvés capables de démontrer de nombreuses propriétés via Coq, les solutionneurs SMT, ou hem.**

- [GitHub](https://github.com/ethereum/act)
- [Documentation](https://ethereum.github.io/act/)

**Scribble** - _*Scribble transforme des annotations de code dans le langage de spécification Scribble en assertions concrètes qui vérifient la spécification.**

- [Documentation](https://docs.scribble.codes/)

**Dafny** - _*Dafny est un langage de programmation prêt à la vérification qui repose sur des annotations de haut niveau pour raisonner et prouver la justesse du code.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Vérificateurs de programme pour vérifier la justesse {#program-verifiers}

**Certora Prouver** - _Certora Prouver est un outil de vérification formelle automatique pour vérifier la justesse du code dans les contrats intelligents. Les spécifications sont écrites en CVL (Certora Verification Language), avec des violations de propriétés détectées à l'aide d'une combinaison d'analyse statique et de résolution de contraintes._

- [Site Web](https://www.certora.com/)
- [Documentation](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*SMTChecker de Solidity est un vérificateur de modèle intégré basé sur SMT ( Satisfiability Modulo Théories) et résolution d'Horn. Il confirme si le code source d'un contrat correspond aux spécifications lors de la compilation et vérifie statiquement les violations des propriétés de sécurité.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify est une version étendue du compilateur Solidity qui peut effectuer une vérification formelle automatisée sur le code Solidity à l'aide d'annotations et de vérification de programme modulaire.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM est une sémantique formelle de la machine virtuelle (EVM) Ethereum écrite dans le cadre K. KEVM est exécutable et peut prouver certaines assertions liées à la propriété en utilisant la logique d'accessibilité.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentation](https://jellopaper.org/)

### Cadres logiques pour la démonstration du théorème {#theorem-provers}

**Isabelle** - _Isabelle/HOL est un assistant de preuve qui permet d'exprimer des formules mathématiques dans un langage formel et fournit des outils pour prouver ces formules. L'application principale est la formalisation de preuves mathématiques et en particulier la vérification formelle, qui comprennent la preuve de la justesse du matériel ou des logiciels informatiques et la preuve des propriétés des langages et protocoles informatiques._

- [GitHub](https://github.com/isabelle-prover)
- [Documentation](https://isabelle.in.tum.de/documentation.html)

**Coq** - _Coq est un démonstrateur de théorème interactif qui vous permet de définir des programmes en utilisant des théorèmes et de générer interactivement des preuves de correction vérifiées par la machine._

- [GitHub](https://github.com/coq/coq)
- [Documentation](https://coq.github.io/doc/v8.13/refman/index.html)

### Outils basés sur l'exécution symbolique pour détecter les modèles vulnérables dans les contrats intelligents {#symbolic-execution-tools}

**Manticore** - _*Un outil d'analyse de bytecode EVM basé sur l'exécution symbolique*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm est un moteur d'exécution symbolique et vérificateur d'équivalence pour le bytecode EVM.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Un outil d'exécution symbolique pour détecter les vulnérabilités dans les contrats intelligents Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentation](https://mythril-classic.readthedocs.io/en/develop/)

## En savoir plus {#further-reading}

- [Comment fonctionne la vérification formelle des contrats intelligents](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Comment la vérification formelle peut assurer des contrats intelligents parfaits](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Aperçu des projets de vérification formelle dans l'écosystème Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Vérification formelle du dépôt Ethereum 2.0 de bout en bout Contrat intelligent](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Vérification formelle du contrat intelligent le plus populaire au monde](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker et vérification formelle](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
