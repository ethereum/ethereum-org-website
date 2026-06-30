---
title: "Vérification formelle des contrats intelligents"
description: "Un aperçu de la vérification formelle pour les contrats intelligents Ethereum"
lang: fr
---

Les [contrats intelligents](/developers/docs/smart-contracts/) permettent de créer des applications décentralisées, sans tiers de confiance et robustes qui introduisent de nouveaux cas d'utilisation et débloquent de la valeur pour les utilisateurs. Étant donné que les contrats intelligents gèrent d'importantes quantités de valeur, la sécurité est une considération essentielle pour les développeurs.

La vérification formelle est l'une des techniques recommandées pour améliorer la [sécurité des contrats intelligents](/developers/docs/smart-contracts/security/). La vérification formelle, qui utilise des [méthodes formelles](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) pour spécifier, concevoir et vérifier des programmes, est utilisée depuis des années pour garantir l'exactitude des systèmes matériels et logiciels critiques.

Lorsqu'elle est mise en œuvre dans des contrats intelligents, la vérification formelle peut prouver que la logique métier d'un contrat répond à une spécification prédéfinie. Comparée à d'autres méthodes d'évaluation de l'exactitude du code d'un contrat, telles que les tests, la vérification formelle offre des garanties plus solides qu'un contrat intelligent est fonctionnellement correct.

## Qu'est-ce que la vérification formelle ? {#what-is-formal-verification}

La vérification formelle désigne le processus d'évaluation de l'exactitude d'un système par rapport à une spécification formelle. En termes plus simples, la vérification formelle nous permet de vérifier si le comportement d'un système satisfait à certaines exigences (c'est-à-dire s'il fait ce que nous voulons).

Les comportements attendus du système (un contrat intelligent dans ce cas) sont décrits à l'aide d'une modélisation formelle, tandis que les langages de spécification permettent la création de propriétés formelles. Les techniques de vérification formelle peuvent ensuite vérifier que l'implémentation d'un contrat est conforme à sa spécification et dériver une preuve mathématique de l'exactitude de cette dernière. Lorsqu'un contrat satisfait à sa spécification, il est décrit comme « fonctionnellement correct », « correct par conception » ou « correct par construction ».

### Qu'est-ce qu'un modèle formel ? {#what-is-a-formal-model}

En informatique, un [modèle formel](https://en.wikipedia.org/wiki/Model_of_computation) est une description mathématique d'un processus de calcul. Les programmes sont abstraits en fonctions mathématiques (équations), le modèle décrivant comment les sorties des fonctions sont calculées en fonction d'une entrée.

Les modèles formels fournissent un niveau d'abstraction sur lequel l'analyse du comportement d'un programme peut être évaluée. L'existence de modèles formels permet la création d'une _spécification formelle_, qui décrit les propriétés souhaitées du modèle en question.

Différentes techniques sont utilisées pour modéliser les contrats intelligents en vue de la vérification formelle. Par exemple, certains modèles sont utilisés pour raisonner sur le comportement de haut niveau d'un contrat intelligent. Ces techniques de modélisation appliquent une vue de type boîte noire aux contrats intelligents, les considérant comme des systèmes qui acceptent des entrées et exécutent des calculs basés sur ces entrées.

Les modèles de haut niveau se concentrent sur la relation entre les contrats intelligents et les agents externes, tels que les comptes détenus par des entités externes (EOA), les comptes de contrat et l'environnement de la chaîne de blocs. De tels modèles sont utiles pour définir des propriétés qui spécifient comment un contrat doit se comporter en réponse à certaines interactions des utilisateurs.

À l'inverse, d'autres modèles formels se concentrent sur le comportement de bas niveau d'un contrat intelligent. Bien que les modèles de haut niveau puissent aider à raisonner sur la fonctionnalité d'un contrat, ils peuvent ne pas capturer les détails sur le fonctionnement interne de l'implémentation. Les modèles de bas niveau appliquent une vue de type boîte blanche à l'analyse de programme et s'appuient sur des représentations de plus bas niveau des applications de contrats intelligents, telles que les traces de programme et les [graphes de flux de contrôle](https://en.wikipedia.org/wiki/Control-flow_graph), pour raisonner sur les propriétés pertinentes pour l'exécution d'un contrat.

Les modèles de bas niveau sont considérés comme idéaux car ils représentent l'exécution réelle d'un contrat intelligent dans l'environnement d'exécution d'Ethereum (c'est-à-dire l'[EVM](/developers/docs/evm/)). Les techniques de modélisation de bas niveau sont particulièrement utiles pour établir des propriétés de sécurité critiques dans les contrats intelligents et détecter les vulnérabilités potentielles.

### Qu'est-ce qu'une spécification formelle ? {#what-is-a-formal-specification}

Une spécification est simplement une exigence technique qu'un système particulier doit satisfaire. En programmation, les spécifications représentent des idées générales sur l'exécution d'un programme (c'est-à-dire ce que le programme devrait faire).

Dans le contexte des contrats intelligents, les spécifications formelles font référence à des _propriétés_ — des descriptions formelles des exigences qu'un contrat doit satisfaire. De telles propriétés sont décrites comme des « invariants » et représentent des assertions logiques sur l'exécution d'un contrat qui doivent rester vraies en toutes circonstances, sans aucune exception.

Ainsi, nous pouvons considérer une spécification formelle comme un ensemble d'énoncés écrits dans un langage formel qui décrivent l'exécution prévue d'un contrat intelligent. Les spécifications couvrent les propriétés d'un contrat et définissent comment le contrat doit se comporter dans différentes circonstances. Le but de la vérification formelle est de déterminer si un contrat intelligent possède ces propriétés (invariants) et que ces propriétés ne sont pas violées pendant l'exécution.

Les spécifications formelles sont essentielles dans le développement d'implémentations sécurisées de contrats intelligents. Les contrats qui ne parviennent pas à implémenter des invariants ou dont les propriétés sont violées pendant l'exécution sont sujets à des vulnérabilités qui peuvent nuire à la fonctionnalité ou causer des exploits malveillants.

## Types de spécifications formelles pour les contrats intelligents {#formal-specifications-for-smart-contracts}

Les spécifications formelles permettent un raisonnement mathématique sur l'exactitude de l'exécution d'un programme. Comme pour les modèles formels, les spécifications formelles peuvent capturer soit des propriétés de haut niveau, soit le comportement de bas niveau d'une implémentation de contrat.

Les spécifications formelles sont dérivées à l'aide d'éléments de [logique de programme](https://en.wikipedia.org/wiki/Logic_programming), qui permettent un raisonnement formel sur les propriétés d'un programme. Une logique de programme possède des règles formelles qui expriment (en langage mathématique) le comportement attendu d'un programme. Diverses logiques de programme sont utilisées dans la création de spécifications formelles, notamment la [logique d'accessibilité](https://en.wikipedia.org/wiki/Reachability_problem), la [logique temporelle](https://en.wikipedia.org/wiki/Temporal_logic) et la [logique de Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Les spécifications formelles pour les contrats intelligents peuvent être classées globalement en spécifications de **haut niveau** ou de **bas niveau**. Quelle que soit la catégorie à laquelle appartient une spécification, elle doit décrire de manière adéquate et sans ambiguïté la propriété du système analysé.

### Spécifications de haut niveau {#high-level-specifications}

Comme son nom l'indique, une spécification de haut niveau (également appelée « spécification orientée modèle ») décrit le comportement de haut niveau d'un programme. Les spécifications de haut niveau modélisent un contrat intelligent comme une [machine à états finis](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), qui peut transiter entre des états en effectuant des opérations, la logique temporelle étant utilisée pour définir des propriétés formelles pour le modèle FSM.

Les [logiques temporelles](https://en.wikipedia.org/wiki/Temporal_logic) sont des « règles pour raisonner sur des propositions qualifiées en termes de temps (par exemple, "J'ai _toujours_ faim" ou "J'aurai _finalement_ faim"). » Lorsqu'elles sont appliquées à la vérification formelle, les logiques temporelles sont utilisées pour formuler des assertions sur le comportement correct des systèmes modélisés comme des machines à états. Plus précisément, une logique temporelle décrit les états futurs dans lesquels un contrat intelligent peut se trouver et comment il transite entre les états.

Les spécifications de haut niveau captureent généralement deux propriétés temporelles critiques pour les contrats intelligents : la **sûreté** (safety) et la **vivacité** (liveness). Les propriétés de sûreté représentent l'idée que « rien de mal n'arrive jamais » et expriment généralement une invariance. Une propriété de sûreté peut définir des exigences logicielles générales, telles que l'absence d'[interblocage](https://www.techtarget.com/whatis/definition/deadlock) (deadlock), ou exprimer des propriétés spécifiques au domaine pour les contrats (par exemple, des invariants sur le contrôle d'accès pour les fonctions, les valeurs admissibles des variables d'état ou les conditions pour les transferts de jetons).

Prenez par exemple cette exigence de sûreté qui couvre les conditions d'utilisation de `transfer()` ou `transferFrom()` dans les contrats de jetons ERC-20 : _« Le solde d'un expéditeur n'est jamais inférieur au montant demandé de jetons à envoyer. »_. Cette description en langage naturel d'un invariant de contrat peut être traduite en une spécification formelle (mathématique), qui peut ensuite être rigoureusement vérifiée pour sa validité.

Les propriétés de vivacité affirment que « quelque chose de bien finit par arriver » et concernent la capacité d'un contrat à progresser à travers différents états. Un exemple de propriété de vivacité est la « liquidité », qui fait référence à la capacité d'un contrat à transférer ses soldes aux utilisateurs sur demande. Si cette propriété est violée, les utilisateurs seraient incapables de retirer les actifs stockés dans le contrat, comme ce qui s'est passé avec l'[incident du portefeuille Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Spécifications de bas niveau {#low-level-specifications}

Les spécifications de haut niveau prennent comme point de départ un modèle à états finis d'un contrat et définissent les propriétés souhaitées de ce modèle. En revanche, les spécifications de bas niveau (également appelées « spécifications orientées propriétés ») modélisent souvent les programmes (contrats intelligents) comme des systèmes comprenant une collection de fonctions mathématiques et décrivent le comportement correct de tels systèmes.

En termes plus simples, les spécifications de bas niveau analysent les _traces de programme_ et tentent de définir les propriétés d'un contrat intelligent sur ces traces. Les traces font référence à des séquences d'exécutions de fonctions qui modifient l'état d'un contrat intelligent ; par conséquent, les spécifications de bas niveau aident à spécifier les exigences pour l'exécution interne d'un contrat.

Les spécifications formelles de bas niveau peuvent être données soit comme des propriétés de style Hoare, soit comme des invariants sur les chemins d'exécution.

### Propriétés de style Hoare {#hoare-style-properties}

La [logique de Hoare](https://en.wikipedia.org/wiki/Hoare_logic) fournit un ensemble de règles formelles pour raisonner sur l'exactitude des programmes, y compris les contrats intelligents. Une propriété de style Hoare est représentée par un triplet de Hoare `{P}c{Q}`, où `c` est un programme et `P` et `Q` sont des prédicats sur l'état de `c` (c'est-à-dire le programme), formellement décrits comme des _préconditions_ et des _postconditions_, respectivement.

Une précondition est un prédicat décrivant les conditions requises pour l'exécution correcte d'une fonction ; les utilisateurs appelant le contrat doivent satisfaire à cette exigence. Une postcondition est un prédicat décrivant la condition qu'une fonction établit si elle est correctement exécutée ; les utilisateurs peuvent s'attendre à ce que cette condition soit vraie après avoir appelé la fonction. Un _invariant_ dans la logique de Hoare est un prédicat qui est préservé par l'exécution d'une fonction (c'est-à-dire qu'il ne change pas).

Les spécifications de style Hoare peuvent garantir soit une _exactitude partielle_, soit une _exactitude totale_. L'implémentation d'une fonction de contrat est « partiellement correcte » si la précondition est vraie avant l'exécution de la fonction, et si l'exécution se termine, la postcondition est également vraie. La preuve de l'exactitude totale est obtenue si une précondition est vraie avant l'exécution de la fonction, que l'exécution est garantie de se terminer et que lorsqu'elle le fait, la postcondition est vraie.

Obtenir la preuve de l'exactitude totale est difficile car certaines exécutions peuvent prendre du temps avant de se terminer, ou ne jamais se terminer du tout. Cela dit, la question de savoir si l'exécution se termine est sans doute un point discutable puisque le mécanisme de gaz d'Ethereum empêche les boucles de programme infinies (l'exécution se termine soit avec succès, soit en raison d'une erreur de manque de gaz, « out-of-gas »).

Les spécifications de contrats intelligents créées à l'aide de la logique de Hoare auront des préconditions, des postconditions et des invariants définis pour l'exécution des fonctions et des boucles dans un contrat. Les préconditions incluent souvent la possibilité d'entrées erronées dans une fonction, les postconditions décrivant la réponse attendue à de telles entrées (par exemple, le déclenchement d'une exception spécifique). De cette manière, les propriétés de style Hoare sont efficaces pour assurer l'exactitude des implémentations de contrats.

De nombreux frameworks de vérification formelle utilisent des spécifications de style Hoare pour prouver l'exactitude sémantique des fonctions. Il est également possible d'ajouter des propriétés de style Hoare (en tant qu'assertions) directement au code du contrat en utilisant les instructions `require` et `assert` dans Solidity.

Les instructions `require` expriment une précondition ou un invariant et sont souvent utilisées pour valider les entrées des utilisateurs, tandis que `assert` capture une postcondition nécessaire à la sécurité. Par exemple, un contrôle d'accès approprié pour les fonctions (un exemple de propriété de sécurité) peut être obtenu en utilisant `require` comme vérification de précondition sur l'identité du compte appelant. De même, un invariant sur les valeurs admissibles des variables d'état dans un contrat (par exemple, le nombre total de jetons en circulation) peut être protégé contre toute violation en utilisant `assert` pour confirmer l'état du contrat après l'exécution de la fonction.

### Propriétés au niveau de la trace {#trace-level-properties}

Les spécifications basées sur les traces décrivent les opérations qui font transiter un contrat entre différents états et les relations entre ces opérations. Comme expliqué précédemment, les traces sont des séquences d'opérations qui modifient l'état d'un contrat d'une manière particulière.

Cette approche s'appuie sur un modèle de contrats intelligents en tant que systèmes de transition d'état avec certains états prédéfinis (décrits par des variables d'état) ainsi qu'un ensemble de transitions prédéfinies (décrites par des fonctions de contrat). De plus, un [graphe de flux de contrôle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), qui est une représentation graphique du flux d'exécution d'un programme, est souvent utilisé pour décrire la sémantique opérationnelle d'un contrat. Ici, chaque trace est représentée comme un chemin sur le graphe de flux de contrôle.

Principalement, les spécifications au niveau de la trace sont utilisées pour raisonner sur les modèles d'exécution interne dans les contrats intelligents. En créant des spécifications au niveau de la trace, nous affirmons les chemins d'exécution admissibles (c'est-à-dire les transitions d'état) pour un contrat intelligent. En utilisant des techniques, telles que l'exécution symbolique, nous pouvons vérifier formellement que l'exécution ne suit jamais un chemin non défini dans le modèle formel.

Prenons l'exemple d'un contrat de [DAO](/dao/) qui possède des fonctions accessibles publiquement pour décrire les propriétés au niveau de la trace. Ici, nous supposons que le contrat de la DAO permet aux utilisateurs d'effectuer les opérations suivantes :

- Déposer des fonds

- Voter sur une proposition après avoir déposé des fonds

- Réclamer un remboursement s'ils ne votent pas sur une proposition

Des exemples de propriétés au niveau de la trace pourraient être _« les utilisateurs qui ne déposent pas de fonds ne peuvent pas voter sur une proposition »_ ou _« les utilisateurs qui ne votent pas sur une proposition devraient toujours pouvoir réclamer un remboursement »_. Les deux propriétés affirment des séquences d'exécution préférées (le vote ne peut pas avoir lieu _avant_ le dépôt de fonds et la réclamation d'un remboursement ne peut pas avoir lieu _après_ le vote sur une proposition).

## Techniques de vérification formelle des contrats intelligents {#formal-verification-techniques}

### Vérification de modèles (Model checking) {#model-checking}

La vérification de modèles est une technique de vérification formelle dans laquelle un algorithme vérifie un modèle formel d'un contrat intelligent par rapport à sa spécification. Dans la vérification de modèles, les contrats intelligents sont souvent représentés comme des systèmes de transition d'état, tandis que les propriétés sur les états de contrat autorisés sont définies à l'aide de la logique temporelle.

La vérification de modèles nécessite la création d'une représentation mathématique abstrate d'un système (c'est-à-dire un contrat) et l'expression des propriétés de ce système à l'aide de formules ancrées dans la [logique propositionnelle](https://www.baeldung.com/cs/propositional-logic). Cela simplifie la tâche de l'algorithme de vérification de modèles, à savoir prouver qu'un modèle mathématique satisfait à une formule logique donnée.

La vérification de modèles dans la vérification formelle est principalement utilisée pour évaluer les propriétés temporelles qui décrivent le comportement d'un contrat au fil du temps. Les propriétés temporelles pour les contrats intelligents incluent la _sûreté_ et la _vivacité_, que nous avons expliquées précédemment.

Par exemple, une propriété de sécurité liée au contrôle d'accès (par exemple, _Seul le propriétaire du contrat peut appeler `selfdestruct`_) peut être écrite en logique formelle. Par la suite, l'algorithme de vérification de modèles peut vérifier si le contrat satisfait à cette spécification formelle.

La vérification de modèles utilise l'exploration de l'espace d'états, qui implique la construction de tous les états possibles d'un contrat intelligent et la tentative de trouver des états accessibles qui entraînent des violations de propriétés. Cependant, cela peut conduire à un nombre infini d'états (connu sous le nom de « problème d'explosion combinatoire »), c'est pourquoi les vérificateurs de modèles s'appuient sur des techniques d'abstraction pour rendre possible une analyse efficace des contrats intelligents.

### Démonstration de théorèmes {#theorem-proving}

La démonstration de théorèmes est une méthode de raisonnement mathématique sur l'exactitude des programmes, y compris les contrats intelligents. Elle implique la transformation du modèle du système d'un contrat et de ses spécifications en formules mathématiques (énoncés logiques).

L'objectif de la démonstration de théorèmes est de vérifier l'équivalence logique entre ces énoncés. L'« équivalence logique » (également appelée « bi-implication logique ») est un type de relation entre deux énoncés tel que le premier énoncé est vrai _si et seulement si_ le deuxième énoncé est vrai.

La relation requise (équivalence logique) entre les énoncés sur le modèle d'un contrat et sa propriété est formulée comme un énoncé prouvable (appelé un théorème). À l'aide d'un système formel d'inférence, le prouveur de théorèmes automatisé peut vérifier la validité du théorème. En d'autres termes, un prouveur de théorèmes peut prouver de manière concluante que le modèle d'un contrat intelligent correspond précisément à ses spécifications.

Alors que la vérification de modèles modélise les contrats comme des systèmes de transition avec des états finis, la démonstration de théorèmes peut gérer l'analyse de systèmes à états infinis. Cependant, cela signifie qu'un prouveur de théorèmes automatisé ne peut pas toujours savoir si un problème logique est « décidable » ou non.

Par conséquent, une assistance humaine est souvent requise pour guider le prouveur de théorèmes dans la dérivation des preuves d'exactitude. L'utilisation de l'effort humain dans la démonstration de théorèmes la rend plus coûteuse à utiliser que la vérification de modèles, qui est entièrement automatisée.

### Exécution symbolique {#symbolic-execution}

L'exécution symbolique est une méthode d'analyse d'un contrat intelligent en exécutant des fonctions à l'aide de _valeurs symboliques_ (par exemple, `x > 5`) au lieu de _valeurs concrètes_ (par exemple, `x == 5`). En tant que technique de vérification formelle, l'exécution symbolique est utilisée pour raisonner formellement sur les propriétés au niveau de la trace dans le code d'un contrat.

L'exécution symbolique représente une trace d'exécution comme une formule mathématique sur des valeurs d'entrée symboliques, autrement appelée un _prédicat de chemin_. Un [solutionneur SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) est utilisé pour vérifier si un prédicat de chemin est « satisfaisable » (c'est-à-dire s'il existe une valeur qui peut satisfaire la formule). Si un chemin vulnérable est satisfaisable, le solutionneur SMT générera une valeur concrète qui déclenche et dirige l'exécution vers ce chemin.

Supposons que la fonction d'un contrat intelligent prenne en entrée une valeur `uint` (`x`) et soit annulée (revert) lorsque `x` est supérieur à `5` et également inférieur à `10`. Trouver une valeur pour `x` qui déclenche l'erreur à l'aide d'une procédure de test normale nécessiterait d'exécuter des dizaines de cas de test (ou plus) sans l'assurance de trouver réellement une entrée déclenchant l'erreur.

À l'inverse, un outil d'exécution symbolique exécuterait la fonction avec la valeur symbolique : `X > 5 ∧ X < 10` (c'est-à-dire que `x` est supérieur à 5 ET `x` est inférieur à 10). Le prédicat de chemin associé `x = X > 5 ∧ X < 10` serait ensuite donné à un solutionneur SMT pour être résolu. Si une valeur particulière satisfait la formule `x = X > 5 ∧ X < 10`, le solutionneur SMT la calculera — par exemple, le solutionneur pourrait produire `7` comme valeur pour `x`.

Étant donné que l'exécution symbolique repose sur les entrées d'un programme, et que l'ensemble des entrées pour explorer tous les états accessibles est potentiellement infini, il s'agit toujours d'une forme de test. Cependant, comme le montre l'exemple, l'exécution symbolique est plus efficace que les tests réguliers pour trouver des entrées qui déclenchent des violations de propriétés.

De plus, l'exécution symbolique produit moins de faux positifs que d'autres techniques basées sur les propriétés (par exemple, le fuzzing) qui génèrent aléatoirement des entrées pour une fonction. Si un état d'erreur est déclenché pendant l'exécution symbolique, il est alors possible de générer une valeur concrète qui déclenche l'erreur et de reproduire le problème.

L'exécution symbolique peut également fournir un certain degré de preuve mathématique d'exactitude. Considérez l'exemple suivant d'une fonction de contrat avec une protection contre le dépassement de capacité :

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Une trace d'exécution qui entraîne un dépassement de capacité d'entier devrait satisfaire la formule : `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Une telle formule a peu de chances d'être résolue, elle sert donc de preuve mathématique que la fonction `safe_add` ne subit jamais de dépassement de capacité.

### Pourquoi utiliser la vérification formelle pour les contrats intelligents ? {#benefits-of-formal-verification}

#### Besoin de fiabilité {#need-for-reliability}

La vérification formelle est utilisée pour évaluer l'exactitude des systèmes critiques pour la sécurité dont la défaillance peut avoir des conséquences dévastatrices, telles que la mort, des blessures ou la ruine financière. Les contrats intelligents sont des applications de grande valeur contrôlant d'énormes quantités de valeur, et de simples erreurs de conception peuvent entraîner des [pertes irrécupérables pour les utilisateurs](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Vérifier formellement un contrat avant son déploiement peut cependant augmenter les garanties qu'il fonctionnera comme prévu une fois exécuté sur la chaîne de blocs.

La fiabilité est une qualité très recherchée dans tout contrat intelligent, en particulier parce que le code déployé dans la machine virtuelle [Ethereum](/) (EVM) est généralement immuable. Les mises à niveau post-lancement n'étant pas facilement accessibles, la nécessité de garantir la fiabilité des contrats rend la vérification formelle nécessaire. La vérification formelle est capable de détecter des problèmes délicats, tels que les dépassements de capacité par le bas et par le haut des entiers, la réentrance et les mauvaises optimisations de gaz, qui peuvent échapper aux auditeurs et aux testeurs.

#### Prouver l'exactitude fonctionnelle {#prove-functional-correctness}

Les tests de programme sont la méthode la plus courante pour prouver qu'un contrat intelligent satisfait à certaines exigences. Cela implique l'exécution d'un contrat avec un échantillon des données qu'il est censé traiter et l'analyse de son comportement. Si le contrat renvoie les résultats attendus pour les données de l'échantillon, les développeurs ont alors une preuve objective de son exactitude.

Cependant, cette approche ne peut pas prouver l'exécution correcte pour des valeurs d'entrée qui ne font pas partie de l'échantillon. Par conséquent, tester un contrat peut aider à détecter des bugs (c'est-à-dire si certains chemins de code ne parviennent pas à renvoyer les résultats souhaités pendant l'exécution), mais **cela ne peut pas prouver de manière concluante l'absence de bugs**.

À l'inverse, la vérification formelle peut prouver formellement qu'un contrat intelligent satisfait aux exigences pour une gamme infinie d'exécutions _sans_ exécuter le contrat du tout. Cela nécessite la création d'une spécification formelle qui décrit précisément les comportements corrects du contrat et le développement d'un modèle formel (mathématique) du système du contrat. Ensuite, nous pouvons suivre une procédure de preuve formelle pour vérifier la cohérence entre le modèle du contrat et sa spécification.

Avec la vérification formelle, la question de vérifier si la logique métier d'un contrat satisfait aux exigences est une proposition mathématique qui peut être prouvée ou réfutée. En prouvant formellement une proposition, nous pouvons vérifier un nombre infini de cas de test avec un nombre fini d'étapes. De cette manière, la vérification formelle a de meilleures perspectives de prouver qu'un contrat est fonctionnellement correct par rapport à une spécification.

#### Cibles de vérification idéales {#ideal-verification-targets}

Une cible de vérification décrit le système à vérifier formellement. La vérification formelle est mieux utilisée dans les « systèmes embarqués » (de petits logiciels simples qui font partie d'un système plus vaste). Ils sont également idéaux pour les domaines spécialisés qui ont peu de règles, car cela facilite la modification des outils pour vérifier les propriétés spécifiques au domaine.

Les contrats intelligents — du moins, dans une certaine mesure — remplissent ces deux exigences. Par exemple, la petite taille des contrats Ethereum les rend propices à la vérification formelle. De même, l'EVM suit des règles simples, ce qui facilite la spécification et la vérification des propriétés sémantiques pour les programmes s'exécutant dans l'EVM.

### Cycle de développement plus rapide {#faster-development-cycle}

Les techniques de vérification formelle, telles que la vérification de modèles et l'exécution symbolique, sont généralement plus efficaces que l'analyse régulière du code des contrats intelligents (effectuée lors des tests ou des audits). Cela s'explique par le fait que la vérification formelle s'appuie sur des valeurs symboliques pour tester des assertions (« que se passe-t-il si un utilisateur essaie de retirer _n_ ether ? ») contrairement aux tests qui utilisent des valeurs concrètes (« que se passe-t-il si un utilisateur essaie de retirer 5 ether ? »).

Les variables d'entrée symboliques peuvent couvrir plusieurs classes de valeurs concrètes, de sorte que les approches de vérification formelle promettent une plus grande couverture de code dans un laps de temps plus court. Lorsqu'elle est utilisée efficacement, la vérification formelle peut accélérer le cycle de développement pour les développeurs.

La vérification formelle améliore également le processus de création d'applications décentralisées (dapps) en réduisant les erreurs de conception coûteuses. La mise à niveau des contrats (lorsque cela est possible) pour corriger les vulnérabilités nécessite une réécriture approfondie des bases de code et plus d'efforts consacrés au développement. La vérification formelle peut détecter de nombreuses erreurs dans les implémentations de contrats qui peuvent échapper aux testeurs et aux auditeurs et offre de nombreuses occasions de corriger ces problèmes avant de déployer un contrat.

## Inconvénients de la vérification formelle {#drawbacks-of-formal-verification}

### Coût du travail manuel {#cost-of-manual-labor}

La vérification formelle, en particulier la vérification semi-automatisée dans laquelle un humain guide le prouveur pour dériver des preuves d'exactitude, nécessite un travail manuel considérable. De plus, la création de spécifications formelles est une activité complexe qui exige un haut niveau de compétence.

Ces facteurs (effort et compétence) rendent la vérification formelle plus exigeante et plus coûteuse par rapport aux méthodes habituelles d'évaluation de l'exactitude des contrats, telles que les tests et les audits. Néanmoins, payer le coût d'un audit de vérification complet est pratique, compte tenu du coût des erreurs dans les implémentations de contrats intelligents.

### Faux négatifs {#false-negatives}

La vérification formelle ne peut que vérifier si l'exécution du contrat intelligent correspond à la spécification formelle. À ce titre, il est important de s'assurer que la spécification décrit correctement les comportements attendus d'un contrat intelligent.

Si les spécifications sont mal rédigées, les violations de propriétés — qui pointent vers des exécutions vulnérables — ne peuvent pas être détectées par l'audit de vérification formelle. Dans ce cas, un développeur pourrait supposer à tort que le contrat est exempt de bugs.

### Problèmes de performances {#performance-issues}

La vérification formelle se heurte à un certain nombre de problèmes de performances. Par exemple, les problèmes d'explosion d'états et de chemins rencontrés respectivement lors de la vérification de modèles et de la vérification symbolique peuvent affecter les procédures de vérification. De plus, les outils de vérification formelle utilisent souvent des solutionneurs SMT et d'autres solutionneurs de contraintes dans leur couche sous-jacente, et ces solutionneurs s'appuient sur des procédures gourmandes en calcul.

De plus, il n'est pas toujours possible pour les vérificateurs de programme de déterminer si une propriété (décrite comme une formule logique) peut être satisfaite ou non (le « [problème de décidabilité](https://en.wikipedia.org/wiki/Decision_problem) ») car un programme pourrait ne jamais se terminer. À ce titre, il peut être impossible de prouver certaines propriétés pour un contrat même s'il est bien spécifié.

## Outils de vérification formelle pour les contrats intelligents Ethereum {#formal-verification-tools}

### Langages de spécification pour la création de spécifications formelles {#specification-languages}

**Act** : _*Act permet la spécification des mises à jour de stockage, des pré/post-conditions et des invariants de contrat. Sa suite d'outils dispose également de backends de preuve capables de prouver de nombreuses propriétés via Coq, des solutionneurs SMT ou hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Documentation](https://github.com/argotorg/act)

**Scribble** - _*Scribble transforme les annotations de code dans le langage de spécification Scribble en assertions concrètes qui vérifient la spécification.*_

- [Documentation](https://docs.scribble.codes/)

**Dafny** - _*Dafny est un langage de programmation prêt pour la vérification qui s'appuie sur des annotations de haut niveau pour raisonner sur et prouver l'exactitude du code.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Vérificateurs de programme pour vérifier l'exactitude {#program-verifiers}

**Certora Prover** - _Certora Prover est un outil de vérification formelle automatique pour vérifier l'exactitude du code dans les contrats intelligents. Les spécifications sont écrites en CVL (Certora Verification Language), les violations de propriétés étant détectées à l'aide d'une combinaison d'analyse statique et de résolution de contraintes._

- [Site web](https://www.certora.com/)
- [Documentation](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Le SMTChecker de Solidity est un vérificateur de modèles intégré basé sur SMT (Satisfiability Modulo Theories) et la résolution de Horn. Il confirme si le code source d'un contrat correspond aux spécifications lors de la compilation et vérifie statiquement les violations des propriétés de sécurité.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify est une version étendue du compilateur Solidity qui peut effectuer une vérification formelle automatisée sur le code Solidity à l'aide d'annotations et d'une vérification de programme modulaire.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM est une sémantique formelle de la machine virtuelle Ethereum (EVM) écrite dans le framework K. KEVM est exécutable et peut prouver certaines assertions liées aux propriétés à l'aide de la logique d'accessibilité.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentation](https://jellopaper.org/)

### Frameworks logiques pour la démonstration de théorèmes {#theorem-provers}

**Isabelle** - _Isabelle/HOL est un assistant de preuve qui permet d'exprimer des formules mathématiques dans un langage formel et fournit des outils pour prouver ces formules. L'application principale est la formalisation de preuves mathématiques et en particulier la vérification formelle, qui comprend la preuve de l'exactitude du matériel ou des logiciels informatiques et la preuve des propriétés des langages et protocoles informatiques._

- [GitHub](https://github.com/isabelle-prover)
- [Documentation](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq est un prouveur de théorèmes interactif qui vous permet de définir des programmes à l'aide de théorèmes et de générer de manière interactive des preuves d'exactitude vérifiées par machine._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Documentation](https://rocq-prover.org/docs)

### Outils basés sur l'exécution symbolique pour détecter les modèles vulnérables dans les contrats intelligents {#symbolic-execution-tools}

**Manticore** - _*Un outil d'analyse de bytecode EVM basé sur l'exécution symbolique*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm est un moteur d'exécution symbolique et un vérificateur d'équivalence pour le bytecode EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Un outil d'exécution symbolique pour détecter les vulnérabilités dans les contrats intelligents Ethereum_

- [GitHub](https://github.com/ConsenSysDiligence/mythril)
- [Documentation](https://github.com/ConsenSysDiligence/mythril/tree/develop/docs/source)

## Complément d'information {#further-reading}

- [Comment fonctionne la vérification formelle des contrats intelligents](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Un aperçu des projets de vérification formelle dans l'écosystème Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Vérification formelle de bout en bout du contrat intelligent de dépôt Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Vérification formelle du contrat intelligent le plus populaire au monde](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker et vérification formelle](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
