---
title: Livre blanc d'Ethereum
description: "Un document de présentation d'Ethereum, publié en 2013 avant son lancement."
lang: fr
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Bien qu'il date de plusieurs années, nous conservons le document original ci-dessous car il continue de servir de référence utile et de représentation fidèle d'[Ethereum](/) et de sa vision._

## Une plateforme de contrats intelligents et d'applications décentralisées de nouvelle génération {#a-next-generation-smart-contract-and-decentralized-application-platform}

Le développement de Bitcoin par Satoshi Nakamoto en 2009 a souvent été salué comme une avancée radicale dans le domaine de la monnaie et des devises, étant le premier exemple d'actif numérique qui, simultanément, ne possède ni garantie ni "[valeur intrinsèque](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" et n'a aucun émetteur ou contrôleur centralisé. Cependant, une autre partie, sans doute plus importante, de l'expérience Bitcoin est la technologie de chaîne de blocs sous-jacente en tant qu'outil de consensus distribué, et l'attention commence rapidement à se tourner vers cet autre aspect de Bitcoin. Les applications alternatives couramment citées de la technologie de chaîne de blocs incluent l'utilisation d'actifs numériques sur la chaîne pour représenter des monnaies personnalisées et des instruments financiers ("[pièces colorées](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la propriété d'un appareil physique sous-jacent ("[propriété intelligente](https://en.bitcoin.it/wiki/Smart_Property)"), des actifs non fongibles tels que des noms de domaine ("[Namecoin](http://namecoin.org)"), ainsi que des applications plus complexes impliquant que des actifs numériques soient directement contrôlés par un morceau de code mettant en œuvre des règles arbitraires ("[contrats intelligents](https://nakamotoinstitute.org/smart-contracts/)") ou même des "[organisations autonomes décentralisées](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) basées sur la chaîne de blocs. Ce qu'Ethereum a l'intention de fournir est une chaîne de blocs avec un langage de programmation intégré, complet et Turing-complet, qui peut être utilisé pour créer des "contrats" pouvant servir à encoder des fonctions de transition d'état arbitraires, permettant aux utilisateurs de créer n'importe lequel des systèmes décrits ci-dessus, ainsi que de nombreux autres que nous n'avons pas encore imaginés, simplement en écrivant la logique en quelques lignes de code.

## Introduction à Bitcoin et aux concepts existants {#introduction-to-bitcoin-and-existing-concepts}

### Histoire {#history}

Le concept de monnaie numérique décentralisée, ainsi que des applications alternatives comme les registres de propriété, existe depuis des décennies. Les protocoles de monnaie électronique anonyme des années 1980 et 1990, reposant principalement sur une primitive cryptographique connue sous le nom de signature aveugle de Chaum (Chaumian blinding), offraient une monnaie avec un haut degré de confidentialité, mais ces protocoles n'ont en grande partie pas réussi à s'imposer en raison de leur dépendance à un intermédiaire centralisé. En 1998, la [b-money](https://nakamotoinstitute.org/b-money/) de Wei Dai est devenue la première proposition à introduire l'idée de créer de la monnaie par la résolution d'énigmes informatiques ainsi que par un consensus décentralisé, mais la proposition manquait de détails sur la manière dont le consensus décentralisé pouvait réellement être mis en œuvre. En 2005, Hal Finney a introduit le concept de « [preuves de travail réutilisables](https://nakamotoinstitute.org/finney/rpow/) », un système qui utilise les idées de la b-money associées aux énigmes Hashcash d'Adam Back, difficiles sur le plan informatique, pour créer un concept de cryptomonnaie, mais qui, une fois de plus, n'a pas atteint l'idéal en s'appuyant sur l'informatique de confiance comme backend. En 2009, une monnaie décentralisée a été mise en pratique pour la première fois par Satoshi Nakamoto, combinant des primitives établies pour la gestion de la propriété via la cryptographie à clé publique avec un algorithme de consensus pour garder une trace de qui possède les pièces, connu sous le nom de « preuve de travail (PoW) ».

Le mécanisme derrière la preuve de travail (PoW) a été une percée dans le domaine car il a résolu simultanément deux problèmes. Premièrement, il a fourni un algorithme de consensus simple et modérément efficace, permettant aux nœuds du réseau de s'accorder collectivement sur un ensemble de mises à jour canoniques de l'état du registre Bitcoin. Deuxièmement, il a fourni un mécanisme permettant une entrée libre dans le processus de consensus, résolvant le problème politique consistant à décider qui peut influencer le consensus, tout en empêchant simultanément les attaques Sybil. Il y parvient en remplaçant une barrière formelle à la participation, telle que l'obligation d'être enregistré en tant qu'entité unique sur une liste particulière, par une barrière économique : le poids d'un seul nœud dans le processus de vote du consensus est directement proportionnel à la puissance de calcul que le nœud apporte. Depuis lors, une approche alternative a été proposée, appelée _preuve d'enjeu (PoS)_, calculant le poids d'un nœud comme étant proportionnel à ses avoirs en monnaie et non à ses ressources informatiques ; la discussion sur les mérites relatifs des deux approches dépasse le cadre de ce document, mais il convient de noter que les deux approches peuvent être utilisées pour servir de colonne vertébrale à une cryptomonnaie.

### Bitcoin en tant que système de transition d'état {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

D'un point de vue technique, le registre d'une cryptomonnaie telle que Bitcoin peut être considéré comme un système de transition d'état, où il y a un « état » constitué du statut de propriété de tous les bitcoins existants et une « fonction de transition d'état » qui prend un état et une transaction et produit un nouvel état qui en est le résultat. Dans un système bancaire standard, par exemple, l'état est un bilan, une transaction est une demande de transfert de X $ de A vers B, et la fonction de transition d'état réduit la valeur du compte de A de X $ et augmente la valeur du compte de B de X $. Si le compte de A a moins de X $ au départ, la fonction de transition d'état renvoie une erreur. Par conséquent, on peut définir formellement :

```
APPLY(S,TX) -> S' ou ERREUR
```

Dans le système bancaire défini ci-dessus :

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Mais :

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

L'« état » dans Bitcoin est la collection de toutes les pièces (techniquement, les « sorties de transaction non dépensées » ou UTXO) qui ont été frappées et non encore dépensées, chaque UTXO ayant une dénomination et un propriétaire (défini par une adresse de 20 octets qui est essentiellement une clé publique cryptographique<sup>[fn1](#notes)</sup>). Une transaction contient une ou plusieurs entrées, chaque entrée contenant une référence à un UTXO existant et une signature cryptographique produite par la clé privée associée à l'adresse du propriétaire, et une ou plusieurs sorties, chaque sortie contenant un nouvel UTXO à ajouter à l'état.

La fonction de transition d'état `APPLY(S,TX) -> S'` peut être définie approximativement comme suit :

<ol>
  <li>
    Pour chaque entrée dans <code>TX</code> :
    <ul>
    <li>
        Si l'UTXO référencé n'est pas dans <code>S</code>, renvoyer une erreur.
    </li>
    <li>
        Si la signature fournie ne correspond pas au propriétaire de l'UTXO, renvoyer une erreur.
    </li>
    </ul>
  </li>
  <li>
    Si la somme des dénominations de tous les UTXO d'entrée est inférieure à la somme des dénominations de tous les UTXO de sortie, renvoyer une erreur.
  </li>
  <li>
    Renvoyer <code>S</code> avec tous les UTXO d'entrée supprimés et tous les UTXO de sortie ajoutés.
  </li>
</ol>

La première moitié de la première étape empêche les expéditeurs de transactions de dépenser des pièces qui n'existent pas, la seconde moitié de la première étape empêche les expéditeurs de transactions de dépenser les pièces d'autres personnes, et la deuxième étape applique la conservation de la valeur. Afin d'utiliser cela pour le paiement, le protocole est le suivant. Supposons qu'Alice veuille envoyer 11,7 BTC à Bob. Tout d'abord, Alice va chercher un ensemble d'UTXO disponibles qu'elle possède et dont le total atteint au moins 11,7 BTC. De manière réaliste, Alice ne pourra pas obtenir exactement 11,7 BTC ; disons que le plus petit montant qu'elle puisse obtenir est 6+4+2=12. Elle crée ensuite une transaction avec ces trois entrées et deux sorties. La première sortie sera de 11,7 BTC avec l'adresse de Bob comme propriétaire, et la deuxième sortie sera la « monnaie » restante de 0,3 BTC, dont la propriétaire sera Alice elle-même.

### Minage {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Si nous avions accès à un service centralisé digne de confiance, ce système serait trivial à mettre en œuvre ; il pourrait simplement être codé exactement comme décrit, en utilisant le disque dur d'un serveur centralisé pour garder une trace de l'état. Cependant, avec Bitcoin, nous essayons de construire un système de monnaie décentralisé, nous devrons donc combiner le système de transaction d'état avec un système de consensus afin de nous assurer que tout le monde est d'accord sur l'ordre des transactions. Le processus de consensus décentralisé de Bitcoin exige que les nœuds du réseau tentent continuellement de produire des paquets de transactions appelés « blocs ». Le réseau est conçu pour produire environ un bloc toutes les dix minutes, chaque bloc contenant un horodatage, un nonce, une référence (c'est-à-dire le hash) au bloc précédent et une liste de toutes les transactions qui ont eu lieu depuis le bloc précédent. Au fil du temps, cela crée une « chaîne de blocs » persistante et en croissance constante qui se met à jour en permanence pour représenter le dernier état du registre Bitcoin.

L'algorithme pour vérifier si un bloc est valide, exprimé dans ce paradigme, est le suivant :

1. Vérifier si le bloc précédent référencé par le bloc existe et est valide.
2. Vérifier que l'horodatage du bloc est supérieur à celui du bloc précédent<sup>[fn2](#notes)</sup> et inférieur à 2 heures dans le futur.
3. Vérifier que la preuve de travail (PoW) sur le bloc est valide.
4. Soit `S[0]` l'état à la fin du bloc précédent.
5. Supposons que `TX` soit la liste des transactions du bloc avec `n` transactions. Pour tout `i` dans `0...n-1`, définir `S[i+1] = APPLY(S[i],TX[i])` Si une application renvoie une erreur, quitter et renvoyer faux.
6. Renvoyer vrai, et enregistrer `S[n]` comme l'état à la fin de ce bloc.

Essentiellement, chaque transaction dans le bloc doit fournir une transition d'état valide de ce qui était l'état canonique avant l'exécution de la transaction vers un nouvel état. Notez que l'état n'est encodé dans le bloc d'aucune manière ; c'est purement une abstraction dont le nœud de validation doit se souvenir et qui ne peut être calculée (de manière sécurisée) pour n'importe quel bloc qu'en partant de l'état du bloc genèse et en appliquant séquentiellement chaque transaction dans chaque bloc. De plus, notez que l'ordre dans lequel le mineur inclut les transactions dans le bloc a de l'importance ; s'il y a deux transactions A et B dans un bloc telles que B dépense un UTXO créé par A, alors le bloc sera valide si A vient avant B, mais pas l'inverse.

La seule condition de validité présente dans la liste ci-dessus qui ne se trouve pas dans d'autres systèmes est l'exigence de « preuve de travail (PoW) ». La condition précise est que le double hash SHA-256 de chaque bloc, traité comme un nombre de 256 bits, doit être inférieur à une cible ajustée dynamiquement, qui au moment de la rédaction de ce document est d'environ 2<sup>187</sup>. Le but de ceci est de rendre la création de blocs « difficile » sur le plan informatique, empêchant ainsi les attaquants Sybil de refaire l'intégralité de la chaîne de blocs en leur faveur. Parce que SHA-256 est conçu pour être une fonction pseudo-aléatoire complètement imprévisible, la seule façon de créer un bloc valide est simplement de procéder par essais et erreurs, en incrémentant de manière répétée le nonce et en vérifiant si le nouveau hash correspond.

À la cible actuelle d'environ 2<sup>187</sup>, le réseau doit faire en moyenne environ 2<sup>69</sup> essais avant qu'un bloc valide ne soit trouvé ; en général, la cible est recalibrée par le réseau tous les 2016 blocs afin qu'en moyenne un nouveau bloc soit produit par un nœud du réseau toutes les dix minutes. Afin de compenser les mineurs pour ce travail informatique, le mineur de chaque bloc est autorisé à inclure une transaction s'attribuant 25 BTC à partir de rien. De plus, si une transaction a une dénomination totale plus élevée dans ses entrées que dans ses sorties, la différence revient également au mineur sous forme de « frais de transaction ». Incidemment, c'est également le seul mécanisme par lequel les BTC sont émis ; l'état du bloc genèse ne contenait aucune pièce du tout.

Afin de mieux comprendre le but du minage, examinons ce qui se passe dans le cas d'un attaquant malveillant. Puisque la cryptographie sous-jacente de Bitcoin est connue pour être sécurisée, l'attaquant ciblera la seule partie du système Bitcoin qui n'est pas directement protégée par la cryptographie : l'ordre des transactions. La stratégie de l'attaquant est simple :

1. Envoyer 100 BTC à un marchand en échange d'un produit (de préférence un bien numérique à livraison rapide)
2. Attendre la livraison du produit
3. Produire une autre transaction s'envoyant les mêmes 100 BTC à lui-même
4. Essayer de convaincre le réseau que sa transaction vers lui-même est celle qui est arrivée en premier.

Une fois l'étape (1) effectuée, après quelques minutes, un mineur inclura la transaction dans un bloc, disons le bloc numéro 270000. Après environ une heure, cinq autres blocs auront été ajoutés à la chaîne après ce bloc, chacun de ces blocs pointant indirectement vers la transaction et la « confirmant » ainsi. À ce stade, le marchand acceptera le paiement comme finalisé et livrera le produit ; puisque nous supposons qu'il s'agit d'un bien numérique, la livraison est instantanée. Maintenant, l'attaquant crée une autre transaction s'envoyant les 100 BTC à lui-même. Si l'attaquant la publie simplement sur le réseau, la transaction ne sera pas traitée ; les mineurs tenteront d'exécuter `APPLY(S,TX)` et remarqueront que `TX` consomme un UTXO qui n'est plus dans l'état. Donc, à la place, l'attaquant crée un « fork » de la chaîne de blocs, en commençant par miner une autre version du bloc 270000 pointant vers le même bloc 269999 comme parent, mais avec la nouvelle transaction à la place de l'ancienne. Parce que les données du bloc sont différentes, cela nécessite de refaire la preuve de travail (PoW). De plus, la nouvelle version du bloc 270000 de l'attaquant a un hash différent, de sorte que les blocs originaux 270001 à 270005 ne « pointent » pas vers lui ; ainsi, la chaîne originale et la nouvelle chaîne de l'attaquant sont complètement séparées. La règle est que dans un fork, la chaîne de blocs la plus longue est considérée comme la vérité, et donc les mineurs légitimes travailleront sur la chaîne 270005 tandis que l'attaquant seul travaille sur la chaîne 270000. Pour que l'attaquant rende sa chaîne de blocs la plus longue, il aurait besoin d'avoir plus de puissance de calcul que le reste du réseau combiné afin de rattraper son retard (d'où l'« attaque des 51 % »).

### Arbres de Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_À gauche : il suffit de présenter seulement un petit nombre de nœuds dans un arbre de Merkle pour donner une preuve de la validité d'une branche._

_À droite : toute tentative de modification d'une partie de l'arbre de Merkle conduira inévitablement à une incohérence quelque part plus haut dans la chaîne._

Une caractéristique importante de la scalabilité de Bitcoin est que le bloc est stocké dans une structure de données à plusieurs niveaux. Le « hash » d'un bloc n'est en fait que le hash de l'en-tête de bloc, un élément de données d'environ 200 octets qui contient l'horodatage, le nonce, le hash du bloc précédent et le hash racine d'une structure de données appelée l'arbre de Merkle stockant toutes les transactions dans le bloc. Un arbre de Merkle est un type d'arbre binaire, composé d'un ensemble de nœuds avec un grand nombre de nœuds feuilles au bas de l'arbre contenant les données sous-jacentes, un ensemble de nœuds intermédiaires où chaque nœud est le hash de ses deux enfants, et enfin un seul nœud racine, également formé à partir du hash de ses deux enfants, représentant le « sommet » de l'arbre. Le but de l'arbre de Merkle est de permettre aux données d'un bloc d'être livrées par morceaux : un nœud peut télécharger uniquement l'en-tête d'un bloc à partir d'une source, la petite partie de l'arbre qui le concerne à partir d'une autre source, et être toujours assuré que toutes les données sont correctes. La raison pour laquelle cela fonctionne est que les hashs se propagent vers le haut : si un utilisateur malveillant tente d'insérer une fausse transaction au bas d'un arbre de Merkle, ce changement provoquera un changement dans le nœud au-dessus, puis un changement dans le nœud encore au-dessus, modifiant finalement la racine de l'arbre et donc le hash du bloc, ce qui amènera le protocole à l'enregistrer comme un bloc complètement différent (presque certainement avec une preuve de travail (PoW) invalide).

Le protocole de l'arbre de Merkle est sans doute essentiel à la viabilité à long terme. Un « nœud complet » dans le réseau Bitcoin, qui stocke et traite l'intégralité de chaque bloc, occupe environ 15 Go d'espace disque dans le réseau Bitcoin en date d'avril 2014, et croît de plus d'un gigaoctet par mois. Actuellement, cela est viable pour certains ordinateurs de bureau et non pour les téléphones, et plus tard à l'avenir, seules les entreprises et les passionnés pourront participer. Un protocole connu sous le nom de « vérification de paiement simplifiée » (SPV) permet l'existence d'une autre classe de nœuds, appelés « nœuds légers », qui téléchargent les en-têtes de bloc, vérifient la preuve de travail (PoW) sur les en-têtes de bloc, puis téléchargent uniquement les « branches » associées aux transactions qui les concernent. Cela permet aux nœuds légers de déterminer avec une forte garantie de sécurité quel est le statut de n'importe quelle transaction Bitcoin, et leur solde actuel, tout en ne téléchargeant qu'une très petite partie de l'ensemble de la chaîne de blocs.

### Applications alternatives de la chaîne de blocs {#alternative-blockchain-applications}

L'idée de prendre le concept sous-jacent de la chaîne de blocs et de l'appliquer à d'autres concepts a également une longue histoire. En 2005, Nick Szabo a présenté le concept de « [titres de propriété sécurisés avec l'autorité du propriétaire](https://nakamotoinstitute.org/library/secure-property-titles/) », un document décrivant comment les « nouvelles avancées dans la technologie des bases de données répliquées » permettront un système basé sur la chaîne de blocs pour stocker un registre de qui possède quelle terre, créant un cadre élaboré incluant des concepts tels que l'appropriation originelle, la possession acquisitive et l'impôt foncier géorgien. Cependant, il n'y avait malheureusement aucun système de base de données répliquée efficace disponible à l'époque, et le protocole n'a donc jamais été mis en œuvre en pratique. Après 2009, cependant, une fois le consensus décentralisé de Bitcoin développé, un certain nombre d'applications alternatives ont rapidement commencé à émerger.

- **Namecoin** - créé en 2010, [Namecoin](https://namecoin.org/) est mieux décrit comme une base de données d'enregistrement de noms décentralisée. Dans les protocoles décentralisés comme Tor, Bitcoin et BitMessage, il doit y avoir un moyen d'identifier les comptes afin que d'autres personnes puissent interagir avec eux, mais dans toutes les solutions existantes, le seul type d'identifiant disponible est un hash pseudo-aléatoire comme `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idéalement, on aimerait pouvoir avoir un compte avec un nom comme « george ». Cependant, le problème est que si une personne peut créer un compte nommé « george », alors quelqu'un d'autre peut utiliser le même processus pour enregistrer « george » pour lui-même également et usurper son identité. La seule solution est un paradigme du premier déposant, où le premier déclarant réussit et le second échoue - un problème parfaitement adapté au protocole de consensus de Bitcoin. Namecoin est la mise en œuvre la plus ancienne et la plus réussie d'un système d'enregistrement de noms utilisant une telle idée.
- **Colored coins** - le but des [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) est de servir de protocole pour permettre aux gens de créer leurs propres monnaies numériques - ou, dans le cas trivial important d'une monnaie avec une seule unité, des jetons numériques, sur la chaîne de blocs Bitcoin. Dans le protocole des colored coins, on « émet » une nouvelle monnaie en attribuant publiquement une couleur à un UTXO Bitcoin spécifique, et le protocole définit de manière récursive la couleur des autres UTXO comme étant la même que la couleur des entrées que la transaction les créant a dépensées (certaines règles spéciales s'appliquent dans le cas d'entrées de couleurs mixtes). Cela permet aux utilisateurs de maintenir des portefeuilles contenant uniquement des UTXO d'une couleur spécifique et de les envoyer un peu comme des bitcoins ordinaires, en remontant dans la chaîne de blocs pour déterminer la couleur de tout UTXO qu'ils reçoivent.
- **Metacoins** - l'idée derrière un metacoin est d'avoir un protocole qui vit au-dessus de Bitcoin, utilisant les transactions Bitcoin pour stocker les transactions metacoin mais ayant une fonction de transition d'état différente, `APPLY'`. Parce le protocole metacoin ne peut pas empêcher les transactions metacoin invalides d'apparaître dans la chaîne de blocs Bitcoin, une règle est ajoutée selon laquelle si `APPLY'(S,TX)` renvoie une erreur, le protocole utilise par défaut `APPLY'(S,TX) = S`. Cela fournit un mécanisme facile pour créer un protocole de cryptomonnaie arbitraire, potentiellement avec des fonctionnalités avancées qui ne peuvent pas être mises en œuvre à l'intérieur de Bitcoin lui-même, mais avec un coût de développement très faible puisque les complexités du minage et de la mise en réseau sont déjà gérées par le protocole Bitcoin. Les metacoins ont été utilisés pour mettre en œuvre certaines classes de contrats financiers, l'enregistrement de noms et l'échange décentralisé.

Ainsi, en général, il existe deux approches pour construire un protocole de consensus : construire un réseau indépendant, et construire un protocole au-dessus de Bitcoin. La première approche, bien que raisonnablement réussie dans le cas d'applications comme Namecoin, est difficile à mettre en œuvre ; chaque mise en œuvre individuelle doit amorcer une chaîne de blocs indépendante, ainsi que construire et tester tout le code de transition d'état et de mise en réseau nécessaire. De plus, nous prédisons que l'ensemble des applications pour la technologie de consensus décentralisé suivra une distribution en loi de puissance où la grande majorité des applications seraient trop petites pour justifier leur propre chaîne de blocs, et nous notons qu'il existe de grandes classes d'applications décentralisées, en particulier les organisations autonomes décentralisées, qui ont besoin d'interagir les unes avec les autres.

L'approche basée sur Bitcoin, en revanche, a le défaut de ne pas hériter des fonctionnalités de vérification de paiement simplifiée de Bitcoin. Le SPV fonctionne pour Bitcoin car il peut utiliser la profondeur de la chaîne de blocs comme indicateur de validité ; à un moment donné, une fois que les ancêtres d'une transaction remontent assez loin, il est sûr de dire qu'ils faisaient légitimement partie de l'état. Les méta-protocoles basés sur la chaîne de blocs, en revanche, ne peuvent pas forcer la chaîne de blocs à ne pas inclure de transactions qui ne sont pas valides dans le contexte de leurs propres protocoles. Par conséquent, une mise en œuvre de méta-protocole SPV entièrement sécurisée devrait effectuer une analyse rétrospective jusqu'au début de la chaîne de blocs Bitcoin pour déterminer si certaines transactions sont valides ou non. Actuellement, toutes les mises en œuvre « légères » de méta-protocoles basés sur Bitcoin s'appuient sur un serveur de confiance pour fournir les données, ce qui est sans doute un résultat très sous-optimal, en particulier lorsque l'un des principaux objectifs d'une cryptomonnaie est d'éliminer le besoin de confiance.

### Scripting {#scripting}

Même sans aucune extension, le protocole Bitcoin facilite en fait une version faible du concept de « contrats intelligents ». Les UTXO dans Bitcoin peuvent être possédés non seulement par une clé publique, mais aussi par un script plus compliqué exprimé dans un langage de programmation simple basé sur une pile. Dans ce paradigme, une transaction dépensant cet UTXO doit fournir des données qui satisfont le script. En effet, même le mécanisme de base de propriété par clé publique est mis en œuvre via un script : le script prend une signature sur courbe elliptique en entrée, la vérifie par rapport à la transaction et à l'adresse qui possède l'UTXO, et renvoie 1 si la vérification réussit et 0 sinon. D'autres scripts, plus compliqués, existent pour divers cas d'utilisation supplémentaires. Par exemple, on peut construire un script qui nécessite les signatures de deux clés privées sur trois données pour valider (« multisig »), une configuration utile pour les comptes d'entreprise, les comptes d'épargne sécurisés et certaines situations de séquestre marchand. Les scripts peuvent également être utilisés pour payer des primes pour des solutions à des problèmes informatiques, et on peut même construire un script qui dit quelque chose comme « cet UTXO Bitcoin est à vous si vous pouvez fournir une preuve SPV que vous m'avez envoyé une transaction Dogecoin de cette dénomination », permettant essentiellement un échange décentralisé entre cryptomonnaies.

Cependant, le langage de script tel qu'il est mis en œuvre dans Bitcoin présente plusieurs limitations importantes :

- **Absence de complétude de Turing** - c'est-à-dire que, bien qu'il y ait un grand sous-ensemble de calculs que le langage de script Bitcoin prend en charge, il ne prend pas du tout tout en charge. La principale catégorie manquante est celle des boucles. Cela est fait pour éviter les boucles infinies lors de la vérification des transactions ; théoriquement, c'est un obstacle surmontable pour les programmeurs de scripts, car toute boucle peut être simulée en répétant simplement le code sous-jacent de nombreuses fois avec une instruction if, mais cela conduit à des scripts qui sont très inefficaces en termes d'espace. Par exemple, la mise en œuvre d'un algorithme de signature sur courbe elliptique alternatif nécessiterait probablement 256 cycles de multiplication répétés, tous inclus individuellement dans le code.
- **Cécité à la valeur** - il n'y a aucun moyen pour un script UTXO de fournir un contrôle granulaire sur le montant qui peut être retiré. Par exemple, un cas d'utilisation puissant d'un contrat oracle serait un contrat de couverture, où A et B investissent 1 000 $ de BTC et après 30 jours, le script envoie 1 000 $ de BTC à A et le reste à B. Cela nécessiterait un oracle pour déterminer la valeur de 1 BTC en USD, mais même dans ce cas, il s'agit d'une amélioration massive en termes de confiance et d'exigences d'infrastructure par rapport aux solutions entièrement centralisées qui sont disponibles actuellement. Cependant, parce que les UTXO sont du tout ou rien, la seule façon d'y parvenir est par le biais d'un bricolage très inefficace consistant à avoir de nombreux UTXO de dénominations variables (par exemple, un UTXO de 2<sup>k</sup> pour chaque k jusqu'à 30) et à demander à l'oracle de choisir quel UTXO envoyer à A et lequel à B.
- **Absence d'état** - les UTXO peuvent être soit dépensés, soit non dépensés ; il n'y a aucune possibilité pour des contrats à plusieurs étapes ou des scripts qui conservent un autre état interne au-delà de cela. Cela rend difficile la création de contrats d'options à plusieurs étapes, d'offres d'échange décentralisé ou de protocoles d'engagement cryptographique à deux étapes (nécessaires pour les primes informatiques sécurisées). Cela signifie également que les UTXO ne peuvent être utilisés que pour construire des contrats simples et ponctuels et non des contrats « avec état » plus complexes tels que des organisations décentralisées, et rend les méta-protocoles difficiles à mettre en œuvre. L'état binaire combiné à la cécité à la valeur signifie également qu'une autre application importante, les limites de retrait, est impossible.
- **Cécité à la chaîne de blocs** - les UTXO sont aveugles aux données de la chaîne de blocs telles que le nonce, l'horodatage et le hash du bloc précédent. Cela limite sévèrement les applications dans les jeux d'argent, et plusieurs autres catégories, en privant le langage de script d'une source potentiellement précieuse de caractère aléatoire.

Ainsi, nous voyons trois approches pour construire des applications avancées au-dessus de la cryptomonnaie : construire une nouvelle chaîne de blocs, utiliser des scripts au-dessus de Bitcoin, et construire un méta-protocole au-dessus de Bitcoin. Construire une nouvelle chaîne de blocs permet une liberté illimitée dans la construction d'un ensemble de fonctionnalités, mais au prix du temps de développement, de l'effort d'amorçage et de la sécurité. L'utilisation de scripts est facile à mettre en œuvre et à standardiser, mais est très limitée dans ses capacités, et les méta-protocoles, bien que faciles, souffrent de défauts de scalabilité. Avec Ethereum, nous avons l'intention de construire un cadre alternatif qui offre des gains encore plus importants en termes de facilité de développement ainsi que des propriétés de client léger encore plus fortes, tout en permettant aux applications de partager un environnement économique et la sécurité de la chaîne de blocs.

## Ethereum {#ethereum}

L'intention d'Ethereum est de créer un protocole alternatif pour la création d'applications décentralisées (dapps), offrant un ensemble différent de compromis que nous pensons être très utiles pour une large catégorie d'applications décentralisées, en mettant particulièrement l'accent sur les situations où un temps de développement rapide, la sécurité pour les applications petites et rarement utilisées, et la capacité de différentes applications à interagir très efficacement, sont importants. Ethereum y parvient en construisant ce qui est essentiellement la couche de base abstraite ultime : une chaîne de blocs avec un langage de programmation Turing-complet intégré, permettant à quiconque d'écrire des contrats intelligents et des applications décentralisées où ils peuvent créer leurs propres règles arbitraires pour la propriété, les formats de transaction et les fonctions de transition d'état. Une version rudimentaire de Namecoin peut être écrite en deux lignes de code, et d'autres protocoles comme des monnaies et des systèmes de réputation peuvent être construits en moins de vingt. Les contrats intelligents, des « boîtes » cryptographiques qui contiennent de la valeur et ne la débloquent que si certaines conditions sont remplies, peuvent également être construits sur la plateforme, avec beaucoup plus de puissance que celle offerte par les scripts Bitcoin en raison des pouvoirs supplémentaires de la complétude de Turing, de la conscience de la valeur, de la conscience de la chaîne de blocs et de l'état.

### Comptes Ethereum {#ethereum-accounts}

Dans Ethereum, l'état est composé d'objets appelés « comptes », chaque compte ayant une adresse de 20 octets et les transitions d'état étant des transferts directs de valeur et d'informations entre les comptes. Un compte Ethereum contient quatre champs :

- Le **nonce**, un compteur utilisé pour s'assurer que chaque transaction ne peut être traitée qu'une seule fois
- Le **solde en ether** actuel du compte
- Le **code de contrat** du compte, s'il est présent
- Le **stockage** du compte (vide par défaut)

L'« ether » est le principal crypto-carburant interne d'Ethereum, et est utilisé pour payer les frais de transaction. En général, il existe deux types de comptes : les **comptes détenus en externe**, contrôlés par des clés privées, et les **comptes de contrat**, contrôlés par leur code de contrat. Un compte détenu en externe n'a pas de code, et l'on peut envoyer des messages depuis un compte détenu en externe en créant et en signant une transaction ; dans un compte de contrat, chaque fois que le compte de contrat reçoit un message, son code s'active, lui permettant de lire et d'écrire dans le stockage interne et d'envoyer d'autres messages ou de créer des contrats à son tour.

Notez que les « contrats » dans Ethereum ne doivent pas être considérés comme quelque chose qui doit être « rempli » ou « respecté » ; ils ressemblent plutôt à des « agents autonomes » qui vivent à l'intérieur de l'environnement d'exécution d'Ethereum, exécutant toujours un morceau de code spécifique lorsqu'ils sont « sollicités » par un message ou une transaction, et ayant un contrôle direct sur leur propre solde en ether et leur propre magasin clé/valeur pour garder une trace des variables persistantes.

### Messages et transactions {#messages-and-transactions}

Le terme « transaction » est utilisé dans Ethereum pour désigner le paquet de données signé qui stocke un message à envoyer depuis un compte détenu en externe. Les transactions contiennent :

- Le destinataire du message
- Une signature identifiant l'expéditeur
- Le montant d'ether à transférer de l'expéditeur au destinataire
- Un champ de données facultatif
- Une valeur `STARTGAS`, représentant le nombre maximum d'étapes de calcul que l'exécution de la transaction est autorisée à prendre
- Une valeur `GASPRICE`, représentant les frais que l'expéditeur paie par étape de calcul

Les trois premiers sont des champs standard attendus dans toute cryptomonnaie. Le champ de données n'a aucune fonction par défaut, mais la machine virtuelle possède un code d'opération à l'aide duquel un contrat peut accéder aux données ; à titre d'exemple de cas d'utilisation, si un contrat fonctionne comme un service d'enregistrement de domaine sur chaîne, il peut alors souhaiter interpréter les données qui lui sont transmises comme contenant deux « champs », le premier champ étant un domaine à enregistrer et le second champ étant l'adresse IP à laquelle l'enregistrer. Le contrat lirait ces valeurs à partir des données du message et les placerait de manière appropriée dans le stockage.

Les champs `STARTGAS` et `GASPRICE` sont cruciaux pour le modèle anti-déni de service d'Ethereum. Afin d'empêcher les boucles infinies accidentelles ou hostiles ou tout autre gaspillage de calcul dans le code, chaque transaction est tenue de fixer une limite au nombre d'étapes de calcul de l'exécution du code qu'elle peut utiliser. L'unité fondamentale de calcul est le « gaz » ; généralement, une étape de calcul coûte 1 gaz, mais certaines opérations coûtent des quantités de gaz plus élevées parce qu'elles sont plus coûteuses en calcul, ou augmentent la quantité de données qui doivent être stockées dans le cadre de l'état. Il y a également des frais de 5 gaz pour chaque octet dans les données de la transaction. L'intention du système de frais est d'exiger d'un attaquant qu'il paie proportionnellement pour chaque ressource qu'il consomme, y compris le calcul, la bande passante et le stockage ; par conséquent, toute transaction qui conduit le réseau à consommer une plus grande quantité de l'une de ces ressources doit avoir des frais de gaz à peu près proportionnels à l'incrément.

### Messages {#messages}

Les contrats ont la capacité d'envoyer des « messages » à d'autres contrats. Les messages sont des objets virtuels qui ne sont jamais sérialisés et n'existent que dans l'environnement d'exécution d'Ethereum. Un message contient :

- L'expéditeur du message (implicite)
- Le destinataire du message
- Le montant d'ether à transférer avec le message
- Un champ de données facultatif
- Une valeur `STARTGAS`

Essentiellement, un message est comme une transaction, sauf qu'il est produit par un contrat et non par un acteur externe. Un message est produit lorsqu'un contrat exécutant actuellement du code exécute le code d'opération `CALL`, qui produit et exécute un message. Comme une transaction, un message conduit le compte destinataire à exécuter son code. Ainsi, les contrats peuvent avoir des relations avec d'autres contrats exactement de la même manière que les acteurs externes.

Notez que l'allocation de gaz attribuée par une transaction ou un contrat s'applique au gaz total consommé par cette transaction et toutes les sous-exécutions. Par exemple, si un acteur externe A envoie une transaction à B avec 1000 gaz, et que B consomme 600 gaz avant d'envoyer un message à C, et que l'exécution interne de C consomme 300 gaz avant de revenir, alors B peut dépenser encore 100 gaz avant de manquer de gaz.

### Fonction de transition d'état d'Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

La fonction de transition d'état d'Ethereum, `APPLY(S,TX) -> S'`, peut être définie comme suit :

1. Vérifier si la transaction est bien formée (c'est-à-dire si elle a le bon nombre de valeurs), si la signature est valide et si le nonce correspond au nonce dans le compte de l'expéditeur. Sinon, renvoyer une erreur.
2. Calculer les frais de transaction comme `STARTGAS * GASPRICE`, et déterminer l'adresse d'envoi à partir de la signature. Soustraire les frais du solde du compte de l'expéditeur et incrémenter le nonce de l'expéditeur. S'il n'y a pas assez de solde à dépenser, renvoyer une erreur.
3. Initialiser `GAS = STARTGAS`, et retirer une certaine quantité de gaz par octet pour payer les octets de la transaction.
4. Transférer la valeur de la transaction du compte de l'expéditeur vers le compte de réception. Si le compte de réception n'existe pas encore, le créer. Si le compte de réception est un contrat, exécuter le code du contrat soit jusqu'à son terme, soit jusqu'à ce que l'exécution manque de gaz.
5. Si le transfert de valeur a échoué parce que l'expéditeur n'avait pas assez d'argent, ou si l'exécution du code a manqué de gaz, annuler tous les changements d'état à l'exception du paiement des frais, et ajouter les frais au compte du mineur.
6. Sinon, rembourser les frais pour tout le gaz restant à l'expéditeur, et envoyer les frais payés pour le gaz consommé au mineur.

Par exemple, supposons que le code du contrat soit :

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Notez qu'en réalité, le code de contrat est écrit dans le code EVM de bas niveau ; cet exemple est écrit en Serpent, l'un de nos langages de haut niveau, par souci de clarté, et peut être compilé en code EVM. Supposons que le stockage du contrat commence vide, et qu'une transaction soit envoyée avec une valeur de 10 ether, 2000 gaz, un prix du gaz de 0,001 ether, et 64 octets de données, les octets 0-31 représentant le nombre `2` et les octets 32-63 représentant la chaîne `CHARLIE`<sup>[fn3](#notes)</sup>. Le processus pour la fonction de transition d'état dans ce cas est le suivant :

1. Vérifier que la transaction est valide et bien formée.
2. Vérifier que l'expéditeur de la transaction a au moins 2000 \* 0,001 = 2 ether. Si c'est le cas, soustraire 2 ether du compte de l'expéditeur.
3. Initialiser le gaz = 2000 ; en supposant que la transaction fait 170 octets de long et que les frais par octet sont de 5, soustraire 850 pour qu'il reste 1150 gaz.
4. Soustraire 10 ether supplémentaires du compte de l'expéditeur, et les ajouter au compte du contrat.
5. Exécuter le code. Dans ce cas, c'est simple : il vérifie si le stockage du contrat à l'indice `2` est utilisé, remarque qu'il ne l'est pas, et définit donc le stockage à l'indice `2` à la valeur `CHARLIE`. Supposons que cela prenne 187 gaz, la quantité restante de gaz est donc de 1150 - 187 = 963
6. Ajouter 963 \* 0,001 = 0,963 ether en retour au compte de l'expéditeur, et renvoyer l'état résultant.

S'il n'y avait pas de contrat à l'extrémité de réception de la transaction, alors les frais de transaction totaux seraient simplement égaux au `GASPRICE` fourni multiplié par la longueur de la transaction en octets, et les données envoyées avec la transaction ne seraient pas pertinentes.

Notez que les messages fonctionnent de manière équivalente aux transactions en termes d'annulations : si l'exécution d'un message manque de gaz, alors l'exécution de ce message, et toutes les autres exécutions déclenchées par cette exécution, s'annulent, mais les exécutions parentes n'ont pas besoin de s'annuler. Cela signifie qu'il est « sûr » pour un contrat d'appeler un autre contrat, car si A appelle B avec G gaz, alors l'exécution de A est garantie de perdre au maximum G gaz. Enfin, notez qu'il existe un code d'opération, `CREATE`, qui crée un contrat ; ses mécanismes d'exécution sont généralement similaires à `CALL`, à l'exception que la sortie de l'exécution détermine le code d'un contrat nouvellement créé.

### Exécution du code {#code-execution}

Le code dans les contrats Ethereum est écrit dans un langage bytecode de bas niveau basé sur une pile, appelé « code de la machine virtuelle Ethereum » ou « code EVM ». Le code se compose d'une série d'octets, où chaque octet représente une opération. En général, l'exécution du code est une boucle infinie qui consiste à effectuer de manière répétée l'opération au compteur de programme actuel (qui commence à zéro) puis à incrémenter le compteur de programme de un, jusqu'à ce que la fin du code soit atteinte ou qu'une erreur ou une instruction `STOP` ou `RETURN` soit détectée. Les opérations ont accès à trois types d'espace dans lesquels stocker des données :

- La **pile** (stack), un conteneur dernier entré, premier sorti dans lequel des valeurs peuvent être empilées et dépilées
- La **mémoire**, un tableau d'octets extensible à l'infini
- Le **stockage** à long terme du contrat, un magasin clé/valeur. Contrairement à la pile et à la mémoire, qui se réinitialisent après la fin du calcul, le stockage persiste à long terme.

Le code peut également accéder à la valeur, à l'expéditeur et aux données du message entrant, ainsi qu'aux données de l'en-tête de bloc, et le code peut également renvoyer un tableau d'octets de données en sortie.

Le modèle d'exécution formel du code EVM est étonnamment simple. Pendant que la machine virtuelle Ethereum est en cours d'exécution, son état de calcul complet peut être défini par le tuple `(block_state, transaction, message, code, memory, stack, pc, gas)`, où `block_state` est l'état global contenant tous les comptes et inclut les soldes et le stockage. Au début de chaque cycle d'exécution, l'instruction actuelle est trouvée en prenant le `pc`ème octet de `code` (ou 0 si `pc >= len(code)`), et chaque instruction a sa propre définition quant à la façon dont elle affecte le tuple. Par exemple, `ADD` dépile deux éléments de la pile et empile leur somme, réduit `gas` de 1 et incrémente `pc` de 1, et `SSTORE` dépile les deux premiers éléments de la pile et insère le deuxième élément dans le stockage du contrat à l'indice spécifié par le premier élément. Bien qu'il existe de nombreuses façons d'optimiser l'exécution de la machine virtuelle Ethereum via la compilation à la volée (just-in-time), une implémentation de base d'Ethereum peut être réalisée en quelques centaines de lignes de code.

### Chaîne de blocs et minage {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

La chaîne de blocs Ethereum est à bien des égards similaire à la chaîne de blocs Bitcoin, bien qu'elle présente quelques différences. La principale différence entre Ethereum et Bitcoin en ce qui concerne l'architecture de la chaîne de blocs est que, contrairement à Bitcoin, les blocs Ethereum contiennent une copie à la fois de la liste des transactions et de l'état le plus récent. En dehors de cela, deux autres valeurs, le numéro de bloc et la difficulté, sont également stockées dans le bloc. L'algorithme de base de validation de bloc dans Ethereum est le suivant :

1. Vérifier si le bloc précédent référencé existe et est valide.
2. Vérifier que l'horodatage du bloc est supérieur à celui du bloc précédent référencé et inférieur à 15 minutes dans le futur
3. Vérifier que le numéro de bloc, la difficulté, la racine des transactions, la racine des oncles et la limite de gaz (divers concepts de bas niveau spécifiques à Ethereum) sont valides.
4. Vérifier que la preuve de travail (PoW) sur le bloc est valide.
5. Soit `S[0]` l'état à la fin du bloc précédent.
6. Soit `TX` la liste des transactions du bloc, avec `n` transactions. Pour tout `i` dans `0...n-1`, définir `S[i+1] = APPLY(S[i],TX[i])`. Si l'une des applications renvoie une erreur, ou si le gaz total consommé dans le bloc jusqu'à ce point dépasse le `GASLIMIT`, renvoyer une erreur.
7. Soit `S_FINAL` égal à `S[n]`, mais en ajoutant la récompense de bloc payée au mineur.
8. Vérifier si la racine de l'arbre de Merkle de l'état `S_FINAL` est égale à la racine d'état final fournie dans l'en-tête de bloc. Si c'est le cas, le bloc est valide ; sinon, il n'est pas valide.

L'approche peut sembler très inefficace à première vue, car elle nécessite de stocker l'état entier avec chaque bloc, mais en réalité, l'efficacité devrait être comparable à celle de Bitcoin. La raison en est que l'état est stocké dans la structure arborescente, et après chaque bloc, seule une petite partie de l'arbre doit être modifiée. Ainsi, en général, entre deux blocs adjacents, la grande majorité de l'arbre devrait être la même, et par conséquent les données peuvent être stockées une fois et référencées deux fois à l'aide de pointeurs (c'est-à-dire des hashs de sous-arbres). Un type spécial d'arbre connu sous le nom d'« arbre Patricia » est utilisé pour accomplir cela, incluant une modification du concept d'arbre de Merkle qui permet d'insérer et de supprimer des nœuds, et pas seulement de les modifier, de manière efficace. De plus, comme toutes les informations d'état font partie du dernier bloc, il n'est pas nécessaire de stocker l'historique complet de la chaîne de blocs - une stratégie qui, si elle pouvait être appliquée à Bitcoin, permettrait de réaliser des économies d'espace de 5 à 20 fois selon les calculs.

Une question fréquemment posée est de savoir « où » le code de contrat est exécuté, en termes de matériel physique. La réponse est simple : le processus d'exécution du code de contrat fait partie de la définition de la fonction de transition d'état, qui fait partie de l'algorithme de validation de bloc, donc si une transaction est ajoutée dans le bloc `B`, l'exécution du code engendrée par cette transaction sera exécutée par tous les nœuds, maintenant et à l'avenir, qui téléchargent et valident le bloc `B`.

## Applications {#applications}

En général, il existe trois types d'applications basées sur Ethereum. La première catégorie concerne les applications financières, qui offrent aux utilisateurs des moyens plus puissants de gérer et de conclure des contrats avec leur argent. Cela inclut les sous-monnaies, les produits dérivés financiers, les contrats de couverture, les portefeuilles d'épargne, les testaments et, à terme, même certaines catégories de contrats de travail à part entière. La deuxième catégorie concerne les applications semi-financières, où l'argent est impliqué mais où il y a aussi un aspect non monétaire important dans ce qui est accompli ; un exemple parfait est celui des primes auto-exécutoires pour la résolution de problèmes informatiques. Enfin, il existe des applications telles que le vote en ligne et la gouvernance décentralisée qui ne sont pas du tout financières.

### Systèmes de jetons {#token-systems}

Les systèmes de jetons sur la chaîne de blocs ont de nombreuses applications allant des sous-monnaies représentant des actifs tels que l'USD ou l'or aux actions d'entreprises, en passant par des jetons individuels représentant une propriété intelligente, des coupons sécurisés infalsifiables, et même des systèmes de jetons sans aucun lien avec une valeur conventionnelle, utilisés comme systèmes de points pour l'incitation. Les systèmes de jetons sont étonnamment faciles à mettre en œuvre sur Ethereum. Le point clé à comprendre est qu'une monnaie, ou un système de jetons, n'est fondamentalement qu'une base de données avec une seule opération : soustraire X unités de A et donner X unités à B, à condition que (i) A ait au moins X unités avant la transaction et (2) que la transaction soit approuvée par A. Tout ce qu'il faut pour mettre en œuvre un système de jetons, c'est d'implémenter cette logique dans un contrat.

Le code de base pour implémenter un système de jetons en Serpent se présente comme suit :

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Il s'agit essentiellement d'une implémentation littérale de la fonction de transition d'état du « système bancaire » décrite plus haut dans ce document. Quelques lignes de code supplémentaires doivent être ajoutées pour prévoir l'étape initiale de distribution des unités monétaires en premier lieu et quelques autres cas particuliers, et idéalement une fonction serait ajoutée pour permettre à d'autres contrats d'interroger le solde d'une adresse. Mais c'est tout ce qu'il y a à faire. Théoriquement, les systèmes de jetons basés sur Ethereum agissant comme des sous-monnaies peuvent potentiellement inclure une autre fonctionnalité importante qui manque aux méta-monnaies onchain basées sur Bitcoin : la possibilité de payer les frais de transaction directement dans cette monnaie. La façon dont cela serait mis en œuvre est que le contrat maintiendrait un solde en ether avec lequel il rembourserait l'ether utilisé pour payer les frais à l'expéditeur, et il réapprovisionnerait ce solde en collectant les unités de monnaie interne qu'il prélève en frais et en les revendant lors d'une enchère continue. Les utilisateurs devraient donc « activer » leurs comptes avec de l'ether, mais une fois l'ether présent, il serait réutilisable car le contrat le rembourserait à chaque fois.

### Produits dérivés financiers et monnaies à valeur stable {#financial-derivatives-and-stable-value-currencies}

Les produits dérivés financiers sont l'application la plus courante d'un « contrat intelligent », et l'une des plus simples à implémenter en code. Le principal défi dans la mise en œuvre de contrats financiers est que la majorité d'entre eux nécessitent de se référer à un indicateur de prix externe ; par exemple, une application très recherchée est un contrat intelligent qui se couvre contre la volatilité de l'ether (ou d'une autre cryptomonnaie) par rapport au dollar américain, mais pour ce faire, le contrat doit connaître la valeur de l'ETH/USD. La façon la plus simple de le faire est via un contrat de « flux de données » maintenu par une partie spécifique (par exemple, le NASDAQ) conçu de manière à ce que cette partie ait la capacité de mettre à jour le contrat selon les besoins, et fournissant une interface qui permet à d'autres contrats d'envoyer un message à ce contrat et d'obtenir une réponse qui fournit le prix.

Étant donné cet ingrédient essentiel, le contrat de couverture se présenterait comme suit :

1. Attendre que la partie A saisisse 1000 ether.
2. Attendre que la partie B saisisse 1000 ether.
3. Enregistrer la valeur en USD de 1000 ether, calculée en interrogeant le contrat de flux de données, dans le stockage, disons que c'est $x.
4. Après 30 jours, permettre à A ou B de « réactiver » le contrat afin d'envoyer l'équivalent de $x en ether (calculé en interrogeant à nouveau le contrat de flux de données pour obtenir le nouveau prix) à A et le reste à B.

Un tel contrat aurait un potentiel important dans le crypto-commerce. L'un des principaux problèmes cités à propos des cryptomonnaies est le fait qu'elles sont volatiles ; bien que de nombreux utilisateurs et commerçants puissent souhaiter la sécurité et la commodité de traiter avec des actifs cryptographiques, ils peuvent ne pas vouloir faire face à la perspective de perdre 23 % de la valeur de leurs fonds en une seule journée. Jusqu'à présent, la solution la plus couramment proposée a été les actifs adossés à un émetteur ; l'idée est qu'un émetteur crée une sous-monnaie dans laquelle il a le droit d'émettre et de révoquer des unités, et fournit une unité de la monnaie à quiconque lui fournit (hors ligne) une unité d'un actif sous-jacent spécifié (par exemple, de l'or, de l'USD). L'émetteur promet ensuite de fournir une unité de l'actif sous-jacent à quiconque renvoie une unité du crypto-actif. Ce mécanisme permet à tout actif non cryptographique d'être « élevé » au rang d'actif cryptographique, à condition que l'on puisse faire confiance à l'émetteur.

En pratique, cependant, les émetteurs ne sont pas toujours dignes de confiance, et dans certains cas, l'infrastructure bancaire est trop faible, ou trop hostile, pour que de tels services existent. Les produits dérivés financiers offrent une alternative. Ici, au lieu qu'un seul émetteur fournisse les fonds pour adosser un actif, un marché décentralisé de spéculateurs, pariant que le prix d'un actif de référence cryptographique (par exemple, l'ETH) va augmenter, joue ce rôle. Contrairement aux émetteurs, les spéculateurs n'ont pas la possibilité de faire défaut sur leur part du marché car le contrat de couverture conserve leurs fonds sous séquestre. Notez que cette approche n'est pas entièrement décentralisée, car une source de confiance est toujours nécessaire pour fournir l'indicateur de prix, bien que l'on puisse soutenir que cela représente tout de même une amélioration massive en termes de réduction des exigences d'infrastructure (contrairement au fait d'être un émetteur, l'émission d'un flux de prix ne nécessite aucune licence et peut probablement être catégorisée comme relevant de la liberté d'expression) et de réduction du potentiel de fraude.

### Systèmes d'identité et de réputation {#identity-and-reputation-systems}

La toute première cryptomonnaie alternative, [Namecoin](http://namecoin.org/), a tenté d'utiliser une chaîne de blocs de type Bitcoin pour fournir un système d'enregistrement de noms, où les utilisateurs peuvent enregistrer leurs noms dans une base de données publique aux côtés d'autres données. Le principal cas d'utilisation cité est celui d'un système [DNS](https://wikipedia.org/wiki/Domain_Name_System), associant des noms de domaine comme « bitcoin.org » (ou, dans le cas de Namecoin, « bitcoin.bit ») à une adresse IP. D'autres cas d'utilisation incluent l'authentification des e-mails et potentiellement des systèmes de réputation plus avancés. Voici le contrat de base pour fournir un système d'enregistrement de noms de type Namecoin sur Ethereum :

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Le contrat est très simple ; il s'agit simplement d'une base de données au sein du réseau Ethereum à laquelle on peut ajouter des éléments, mais qu'on ne peut ni modifier ni supprimer. N'importe qui peut enregistrer un nom avec une certaine valeur, et cet enregistrement reste ensuite pour toujours. Un contrat d'enregistrement de nom plus sophistiqué comportera également une « clause de fonction » permettant à d'autres contrats de l'interroger, ainsi qu'un mécanisme permettant au « propriétaire » (c'est-à-dire le premier déclarant) d'un nom de modifier les données ou de transférer la propriété. On peut même y ajouter des fonctionnalités de réputation et de toile de confiance (web-of-trust).

### Stockage de fichiers décentralisé {#decentralized-file-storage}

Au cours des dernières années, un certain nombre de startups populaires de stockage de fichiers en ligne ont vu le jour, la plus importante étant Dropbox, cherchant à permettre aux utilisateurs de télécharger une sauvegarde de leur disque dur et de faire en sorte que le service stocke la sauvegarde et permette à l'utilisateur d'y accéder en échange d'un abonnement mensuel. Cependant, à ce stade, le marché du stockage de fichiers est parfois relativement inefficace ; un coup d'œil rapide aux différentes solutions existantes montre que, particulièrement au niveau de la « vallée dérangeante » des 20 à 200 Go où ni les quotas gratuits ni les remises d'entreprise ne s'appliquent, les prix mensuels pour les coûts de stockage de fichiers grand public sont tels que vous payez plus que le coût du disque dur entier en un seul mois. Les contrats Ethereum peuvent permettre le développement d'un écosystème de stockage de fichiers décentralisé, où les utilisateurs individuels peuvent gagner de petites sommes d'argent en louant leurs propres disques durs et où l'espace inutilisé peut être utilisé pour réduire davantage les coûts de stockage de fichiers.

La pièce maîtresse d'un tel dispositif serait ce que nous avons appelé le « contrat Dropbox décentralisé ». Ce contrat fonctionne de la manière suivante. Tout d'abord, on divise les données souhaitées en blocs, en chiffrant chaque bloc pour des raisons de confidentialité, et on construit un arbre de Merkle à partir de ceux-ci. On établit ensuite un contrat avec la règle selon laquelle, tous les N blocs, le contrat choisirait un indice aléatoire dans l'arbre de Merkle (en utilisant le hash du bloc précédent, accessible depuis le code du contrat, comme source de caractère aléatoire), et donnerait X ether à la première entité à fournir une transaction avec une preuve de propriété de type vérification de paiement simplifiée du bloc à cet indice particulier dans l'arbre. Lorsqu'un utilisateur souhaite retélécharger son fichier, il peut utiliser un protocole de canal de micropaiement (par exemple, payer 1 szabo par 32 kilo-octets) pour récupérer le fichier ; l'approche la plus efficace en termes de frais consiste pour le payeur à ne pas publier la transaction avant la fin, en remplaçant plutôt la transaction par une autre légèrement plus lucrative avec le même nonce après chaque 32 kilo-octets.

Une caractéristique importante du protocole est que, bien qu'il puisse sembler que l'on fasse confiance à de nombreux nœuds aléatoires pour ne pas décider d'oublier le fichier, on peut réduire ce risque à un niveau proche de zéro en divisant le fichier en de nombreux morceaux via le partage de secret, et en surveillant les contrats pour voir si chaque morceau est toujours en possession d'un nœud. Si un contrat continue de verser de l'argent, cela fournit une preuve cryptographique que quelqu'un, quelque part, stocke toujours le fichier.

### Organisations autonomes décentralisées {#decentralized-autonomous-organizations}

Le concept général d'une « organisation autonome décentralisée » est celui d'une entité virtuelle qui possède un certain ensemble de membres ou d'actionnaires qui, peut-être avec une majorité de 67 %, ont le droit de dépenser les fonds de l'entité et de modifier son code. Les membres décideraient collectivement de la manière dont l'organisation devrait allouer ses fonds. Les méthodes d'allocation des fonds d'une DAO pourraient aller des primes, des salaires à des mécanismes encore plus exotiques tels qu'une monnaie interne pour récompenser le travail. Cela reproduit essentiellement les attributs juridiques d'une entreprise traditionnelle ou d'une organisation à but non lucratif, mais en utilisant uniquement la technologie cryptographique de la chaîne de blocs pour l'application. Jusqu'à présent, une grande partie des discussions autour des DAO a porté sur le modèle « capitaliste » d'une « société autonome décentralisée » (DAC) avec des actionnaires percevant des dividendes et des actions négociables ; une alternative, peut-être décrite comme une « communauté autonome décentralisée », verrait tous les membres avoir une part égale dans la prise de décision et exigerait que 67 % des membres existants acceptent d'ajouter ou de retirer un membre. L'exigence selon laquelle une personne ne peut avoir qu'une seule adhésion devrait alors être appliquée collectivement par le groupe.

Un aperçu général de la façon de coder une DAO est le suivant. La conception la plus simple est simplement un morceau de code auto-modifiable qui change si les deux tiers des membres s'accordent sur un changement. Bien que le code soit théoriquement immuable, on peut facilement contourner cela et avoir une mutabilité de facto en ayant des morceaux de code dans des contrats séparés, et en ayant l'adresse des contrats à appeler stockée dans le stockage modifiable. Dans une implémentation simple d'un tel contrat DAO, il y aurait trois types de transactions, distingués par les données fournies dans la transaction :

- `[0,i,K,V]` pour enregistrer une proposition avec l'indice `i` afin de changer l'adresse à l'indice de stockage `K` pour la valeur `V`
- `[1,i]` pour enregistrer un vote en faveur de la proposition `i`
- `[2,i]` pour finaliser la proposition `i` si suffisamment de votes ont été exprimés

Le contrat comporterait alors des clauses pour chacun d'entre eux. Il conserverait un registre de toutes les modifications de stockage ouvertes, ainsi qu'une liste des personnes ayant voté pour elles. Il comporterait également une liste de tous les membres. Lorsqu'une modification de stockage obtient le vote des deux tiers des membres, une transaction de finalisation pourrait exécuter la modification. Un squelette plus sophistiqué intégrerait également une capacité de vote pour des fonctionnalités telles que l'envoi d'une transaction, l'ajout de membres et la suppression de membres, et pourrait même prévoir une délégation de vote de type [Démocratie liquide](https://wikipedia.org/wiki/Liquid_democracy) (c'est-à-dire que n'importe qui peut désigner quelqu'un pour voter à sa place, et l'attribution est transitive, donc si A désigne B et B désigne C, alors C détermine le vote de A). Cette conception permettrait à la DAO de croître de manière organique en tant que communauté décentralisée, permettant aux gens de déléguer éventuellement la tâche de filtrer qui est membre à des spécialistes, bien que contrairement au « système actuel », les spécialistes puissent facilement apparaître et disparaître au fil du temps à mesure que les membres individuels de la communauté changent leurs alignements.

Un modèle alternatif est celui d'une société décentralisée, où tout compte peut avoir zéro ou plusieurs actions, et où les deux tiers des actions sont nécessaires pour prendre une décision. Un squelette complet impliquerait des fonctionnalités de gestion d'actifs, la possibilité de faire une offre d'achat ou de vente d'actions, et la possibilité d'accepter des offres (de préférence avec un mécanisme de rapprochement des ordres à l'intérieur du contrat). La délégation existerait également à la manière de la démocratie liquide, généralisant le concept de « conseil d'administration ».

### Autres applications {#further-applications}

**1. Portefeuilles d'épargne**. Supposons qu'Alice veuille garder ses fonds en sécurité, mais qu'elle craigne de perdre ou que quelqu'un pirate sa clé privée. Elle place de l'ether dans un contrat avec Bob, une banque, comme suit :

- Alice seule peut retirer un maximum de 1 % des fonds par jour.
- Bob seul peut retirer un maximum de 1 % des fonds par jour, mais Alice a la possibilité d'effectuer une transaction avec sa clé pour désactiver cette capacité.
- Alice et Bob ensemble peuvent tout retirer.

Normalement, 1 % par jour est suffisant pour Alice, et si Alice veut retirer plus, elle peut contacter Bob pour obtenir de l'aide. Si la clé d'Alice est piratée, elle court chez Bob pour transférer les fonds vers un nouveau contrat. Si elle perd sa clé, Bob finira par récupérer les fonds. Si Bob s'avère malveillant, elle peut alors désactiver sa capacité de retrait.

**2. Assurance récolte**. On peut facilement créer un contrat de produits dérivés financiers, mais en utilisant un flux de données météorologiques au lieu d'un indice de prix. Si un agriculteur de l'Iowa achète un produit dérivé qui rapporte de manière inversement proportionnelle aux précipitations dans l'Iowa, alors s'il y a une sécheresse, l'agriculteur recevra automatiquement de l'argent et s'il pleut suffisamment, l'agriculteur sera heureux car ses récoltes se porteront bien. Cela peut être étendu à l'assurance contre les catastrophes naturelles en général.

**3. Un flux de données décentralisé**. Pour les contrats financiers pour la différence, il peut en fait être possible de décentraliser le flux de données via un protocole appelé « [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed) ». SchellingCoin fonctionne essentiellement comme suit : N parties introduisent toutes dans le système la valeur d'une donnée donnée (par exemple, le prix ETH/USD), les valeurs sont triées, et tous ceux qui se situent entre le 25e et le 75e centile obtiennent un jeton en récompense. Tout le monde est incité à fournir la réponse que tous les autres fourniront, et la seule valeur sur laquelle un grand nombre de joueurs peuvent raisonnablement s'entendre est l'évidence par défaut : la vérité. Cela crée un protocole décentralisé qui peut théoriquement fournir n'importe quel nombre de valeurs, y compris le prix ETH/USD, la température à Berlin ou même le résultat d'un calcul complexe particulier.

**4. Séquestre multisig intelligent**. Bitcoin permet des contrats de transaction multisig où, par exemple, trois clés sur cinq données peuvent dépenser les fonds. Ethereum permet plus de granularité ; par exemple, quatre sur cinq peuvent tout dépenser, trois sur cinq peuvent dépenser jusqu'à 10 % par jour, et deux sur cinq peuvent dépenser jusqu'à 0,5 % par jour. De plus, le multisig Ethereum est asynchrone - deux parties peuvent enregistrer leurs signatures sur la chaîne de blocs à des moments différents et la dernière signature enverra automatiquement la transaction.

**5. Cloud computing**. La technologie EVM peut également être utilisée pour créer un environnement informatique vérifiable, permettant aux utilisateurs de demander à d'autres d'effectuer des calculs, puis de demander éventuellement des preuves que les calculs à certains points de contrôle sélectionnés de manière aléatoire ont été effectués correctement. Cela permet la création d'un marché du cloud computing où tout utilisateur peut participer avec son ordinateur de bureau, son ordinateur portable ou son serveur spécialisé, et des vérifications ponctuelles associées à des dépôts de garantie peuvent être utilisées pour s'assurer que le système est digne de confiance (c'est-à-dire que les nœuds ne peuvent pas tricher de manière rentable). Bien qu'un tel système puisse ne pas convenir à toutes les tâches ; les tâches qui nécessitent un niveau élevé de communication inter-processus, par exemple, ne peuvent pas être facilement effectuées sur un grand nuage de nœuds. D'autres tâches, cependant, sont beaucoup plus faciles à paralléliser ; des projets comme SETI@home, folding@home et les algorithmes génétiques peuvent facilement être implémentés sur une telle plateforme.

**6. Jeux d'argent pair à pair**. N'importe quel nombre de protocoles de jeux d'argent pair à pair, tels que [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano et Richard Clayton, peuvent être implémentés sur la chaîne de blocs Ethereum. Le protocole de jeu le plus simple est en fait simplement un contrat pour la différence sur le hash du bloc suivant, et des protocoles plus avancés peuvent être construits à partir de là, créant des services de jeux d'argent avec des frais quasi nuls qui n'ont aucune possibilité de tricher.

**7. Marchés de prédiction**. À condition de disposer d'un oracle ou d'un SchellingCoin, les marchés de prédiction sont également faciles à mettre en œuvre, et les marchés de prédiction associés à SchellingCoin pourraient s'avérer être la première application grand public de la [futarchie](https://mason.gmu.edu/~rhanson/futarchy.html) en tant que protocole de gouvernance pour les organisations décentralisées.

**8. Places de marché décentralisées onchain**, utilisant le système d'identité et de réputation comme base.

## Divers et préoccupations {#miscellanea-and-concerns}

### Implémentation modifiée de GHOST {#modified-ghost-implementation}

Le protocole « Greedy Heaviest Observed Subtree » (GHOST) est une innovation introduite pour la première fois par Yonatan Sompolinsky et Aviv Zohar en [décembre 2013](https://eprint.iacr.org/2013/881.pdf). La motivation derrière GHOST est que les chaînes de blocs avec des temps de confirmation rapides souffrent actuellement d'une sécurité réduite en raison d'un taux élevé de blocs périmés (stale) - parce que les blocs mettent un certain temps à se propager sur le réseau, si le mineur A mine un bloc et qu'ensuite le mineur B mine un autre bloc avant que le bloc du mineur A ne se propage à B, le bloc du mineur B finira par être gaspillé et ne contribuera pas à la sécurité du réseau. De plus, il y a un problème de centralisation : si le mineur A est un pool de minage avec 30 % de la puissance de hachage et que B a 10 % de la puissance de hachage, A aura un risque de produire un bloc périmé 70 % du temps (puisque les autres 30 % du temps, A a produit le dernier bloc et obtiendra donc les données de minage immédiatement) tandis que B aura un risque de produire un bloc périmé 90 % du temps. Ainsi, si l'intervalle de bloc est suffisamment court pour que le taux de blocs périmés soit élevé, A sera considérablement plus efficace simplement en raison de sa taille. Avec ces deux effets combinés, les chaînes de blocs qui produisent des blocs rapidement sont très susceptibles de conduire à ce qu'un pool de minage ait un pourcentage suffisamment important de la puissance de hachage du réseau pour avoir un contrôle de facto sur le processus de minage.

Comme décrit par Sompolinsky et Zohar, GHOST résout le premier problème de perte de sécurité du réseau en incluant les blocs périmés dans le calcul de la chaîne la plus « longue » ; c'est-à-dire que non seulement le parent et les ancêtres plus lointains d'un bloc, mais aussi les descendants périmés de l'ancêtre du bloc (dans le jargon d'Ethereum, les « oncles ») sont ajoutés au calcul du bloc qui a la plus grande preuve de travail (PoW) totale le soutenant. Pour résoudre le deuxième problème de biais de centralisation, nous allons au-delà du protocole décrit par Sompolinsky et Zohar, et fournissons également des récompenses de bloc aux blocs périmés : un bloc périmé reçoit 87,5 % de sa récompense de base, et le neveu qui inclut le bloc périmé reçoit les 12,5 % restants. Les frais de transaction, cependant, ne sont pas attribués aux oncles.

Ethereum implémente une version simplifiée de GHOST qui ne descend que de sept niveaux. Plus précisément, elle est définie comme suit :

- Un bloc doit spécifier un parent, et il doit spécifier 0 ou plusieurs oncles
- Un oncle inclus dans le bloc B doit avoir les propriétés suivantes :
  - Il doit être un enfant direct de l'ancêtre de la k-ième génération de B, où `2 <= k <= 7`.
  - Il ne peut pas être un ancêtre de B
  - Un oncle doit être un en-tête de bloc valide, mais n'a pas besoin d'être un bloc préalablement vérifié ou même valide
  - Un oncle doit être différent de tous les oncles inclus dans les blocs précédents et de tous les autres oncles inclus dans le même bloc (non-double inclusion)
- Pour chaque oncle U dans le bloc B, le mineur de B obtient 3,125 % supplémentaires ajoutés à sa récompense coinbase et le mineur de U obtient 93,75 % d'une récompense coinbase standard.

Cette version limitée de GHOST, avec des oncles inclusibles seulement jusqu'à 7 générations, a été utilisée pour deux raisons. Premièrement, un GHOST illimité inclurait trop de complications dans le calcul des oncles valides pour un bloc donné. Deuxièmement, un GHOST illimité avec compensation tel qu'utilisé dans Ethereum supprime l'incitation pour un mineur à miner sur la chaîne principale et non sur la chaîne d'un attaquant public.

### Frais {#fees}

Parce que chaque transaction publiée dans la chaîne de blocs impose au réseau le coût de devoir la télécharger et la vérifier, il est nécessaire d'avoir un mécanisme de régulation, impliquant généralement des frais de transaction, pour prévenir les abus. L'approche par défaut, utilisée dans Bitcoin, consiste à avoir des frais purement volontaires, en s'appuyant sur les mineurs pour agir comme gardiens et fixer des minimums dynamiques. Cette approche a été très favorablement accueillie dans la communauté Bitcoin, en particulier parce qu'elle est « basée sur le marché », permettant à l'offre et à la demande entre les mineurs et les expéditeurs de transactions de déterminer le prix. Le problème avec ce raisonnement est, cependant, que le traitement des transactions n'est pas un marché ; bien qu'il soit intuitivement attrayant de considérer le traitement des transactions comme un service que le mineur offre à l'expéditeur, en réalité, chaque transaction qu'un mineur inclut devra être traitée par chaque nœud du réseau, de sorte que la grande majorité du coût du traitement des transactions est supportée par des tiers et non par le mineur qui prend la décision de l'inclure ou non. Par conséquent, des problèmes de tragédie des biens communs sont très susceptibles de se produire.

Cependant, il s'avère que cette faille dans le mécanisme basé sur le marché, lorsqu'on lui donne une hypothèse simplificatrice inexacte particulière, s'annule par magie. L'argument est le suivant. Supposons que :

1. Une transaction entraîne `k` opérations, offrant la récompense `kR` à tout mineur qui l'inclut, où `R` est défini par l'expéditeur et `k` et `R` sont (approximativement) visibles par le mineur au préalable.
2. Une opération a un coût de traitement de `C` pour n'importe quel nœud (c'est-à-dire que tous les nœuds ont une efficacité égale)
3. Il y a `N` nœuds de minage, chacun avec une puissance de traitement exactement égale (c'est-à-dire `1/N` du total)
4. Aucun nœud complet non mineur n'existe.

Un mineur serait prêt à traiter une transaction si la récompense attendue est supérieure au coût. Ainsi, la récompense attendue est `kR/N` puisque le mineur a `1/N` de chances de traiter le bloc suivant, et le coût de traitement pour le mineur est simplement `kC`. Par conséquent, les mineurs incluront les transactions où `kR/N > kC`, ou `R > NC`. Notez que `R` correspond aux frais par opération fournis par l'expéditeur, et constitue donc une limite inférieure de l'avantage que l'expéditeur tire de la transaction, et `NC` est le coût pour l'ensemble du réseau de traiter une opération. Par conséquent, les mineurs sont incités à n'inclure que les transactions pour lesquelles l'avantage utilitaire total dépasse le coût.

Cependant, il existe plusieurs écarts importants par rapport à ces hypothèses dans la réalité :

1. Le mineur paie un coût plus élevé pour traiter la transaction que les autres nœuds de vérification, car le temps de vérification supplémentaire retarde la propagation des blocs et augmente ainsi les chances que le bloc devienne périmé.
2. Il existe des nœuds complets non mineurs.
3. La distribution de la puissance de minage peut s'avérer radicalement inégalitaire en pratique.
4. Les spéculateurs, les ennemis politiques et les fous dont la fonction d'utilité inclut de causer des dommages au réseau existent bel et bien, et ils peuvent intelligemment mettre en place des contrats où leur coût est bien inférieur au coût payé par les autres nœuds de vérification.

(1) donne tendance au mineur à inclure moins de transactions, et
(2) augmente `NC` ; par conséquent, ces deux effets s'annulent au moins partiellement.<sup>[Comment ?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) et (4) constituent le problème majeur ; pour les résoudre, nous instituons simplement un plafond flottant : aucun bloc ne peut avoir plus d'opérations que `BLK_LIMIT_FACTOR` fois la moyenne mobile exponentielle à long terme.
Plus précisément :

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` et `EMA_FACTOR` sont des constantes qui seront fixées à 65536 et 1,5 pour le moment, mais qui seront probablement modifiées après une analyse plus approfondie.

Il y a un autre facteur qui décourage les grandes tailles de blocs dans Bitcoin : les blocs volumineux mettront plus de temps à se propager, et ont donc une probabilité plus élevée de devenir périmés. Dans Ethereum, les blocs très consommateurs de gaz peuvent également mettre plus de temps à se propager, à la fois parce qu'ils sont physiquement plus grands et parce qu'ils mettent plus de temps à traiter les transitions d'état des transactions à valider. Cette dissuasion par le délai est une considération importante dans Bitcoin, mais moins dans Ethereum en raison du protocole GHOST ; par conséquent, s'appuyer sur des limites de blocs régulées fournit une base de référence plus stable.

### Calcul et complétude de Turing {#computation-and-turing-completeness}

Une note importante est que la machine virtuelle Ethereum (EVM) est Turing-complète ; cela signifie que le code EVM peut encoder n'importe quel calcul qui peut être raisonnablement effectué, y compris des boucles infinies. Le code EVM permet de faire des boucles de deux manières. Premièrement, il y a une instruction `JUMP` qui permet au programme de revenir à un endroit précédent dans le code, et une instruction `JUMPI` pour faire des sauts conditionnels, permettant des instructions comme `while x < 27: x = x * 2`. Deuxièmement, les contrats peuvent appeler d'autres contrats, permettant potentiellement de boucler par récursivité. Cela conduit naturellement à un problème : des utilisateurs malveillants peuvent-ils essentiellement bloquer les mineurs et les nœuds complets en les forçant à entrer dans une boucle infinie ? Le problème se pose en raison d'un problème en informatique connu sous le nom de problème de l'arrêt : il n'y a aucun moyen de dire, dans le cas général, si un programme donné s'arrêtera un jour ou non.

Comme décrit dans la section sur la transition d'état, notre solution fonctionne en exigeant qu'une transaction définisse un nombre maximum d'étapes de calcul qu'elle est autorisée à effectuer, et si l'exécution prend plus de temps, le calcul est annulé mais les frais sont toujours payés. Les messages fonctionnent de la même manière. Pour montrer la motivation derrière notre solution, considérez les exemples suivants :

- Un attaquant crée un contrat qui exécute une boucle infinie, puis envoie une transaction activant cette boucle au mineur. Le mineur traitera la transaction, exécutant la boucle infinie, et attendra qu'elle manque de gaz. Même si l'exécution manque de gaz et s'arrête à mi-chemin, la transaction est toujours valide et le mineur réclame toujours les frais à l'attaquant pour chaque étape de calcul.
- Un attaquant crée une très longue boucle infinie dans l'intention de forcer le mineur à continuer à calculer pendant si longtemps qu'au moment où le calcul se terminera, quelques blocs supplémentaires seront sortis et il ne sera pas possible pour le mineur d'inclure la transaction pour réclamer les frais. Cependant, l'attaquant sera tenu de soumettre une valeur pour `STARTGAS` limitant le nombre d'étapes de calcul que l'exécution peut prendre, de sorte que le mineur saura à l'avance que le calcul prendra un nombre d'étapes excessivement important.
- Un attaquant voit un contrat avec un code d'une certaine forme comme `send(A,contract.storage[A]); contract.storage[A] = 0`, et envoie une transaction avec juste assez de gaz pour exécuter la première étape mais pas la seconde (c'est-à-dire faire un retrait mais ne pas laisser le solde baisser). L'auteur du contrat n'a pas besoin de s'inquiéter de se protéger contre de telles attaques, car si l'exécution s'arrête à mi-chemin, les modifications sont annulées.
- Un contrat financier fonctionne en prenant la médiane de neuf flux de données propriétaires afin de minimiser les risques. Un attaquant prend le contrôle de l'un des flux de données, qui est conçu pour être modifiable via le mécanisme d'appel d'adresse variable décrit dans la section sur les DAO, et le convertit pour exécuter une boucle infinie, tentant ainsi de forcer toute tentative de réclamation de fonds du contrat financier à manquer de gaz. Cependant, le contrat financier peut fixer une limite de gaz sur le message pour éviter ce problème.

L'alternative à la complétude de Turing est l'incomplétude de Turing, où `JUMP` et `JUMPI` n'existent pas et où une seule copie de chaque contrat est autorisée à exister dans la pile d'appels à un moment donné. Avec ce système, le système de frais décrit et les incertitudes quant à l'efficacité de notre solution pourraient ne pas être nécessaires, car le coût d'exécution d'un contrat serait limité par sa taille. De plus, l'incomplétude de Turing n'est même pas une si grande limitation ; de tous les exemples de contrats que nous avons conçus en interne, jusqu'à présent un seul nécessitait une boucle, et même cette boucle pouvait être supprimée en faisant 26 répétitions d'un morceau de code d'une ligne. Compte tenu des implications sérieuses de la complétude de Turing et de l'avantage limité, pourquoi ne pas simplement avoir un langage Turing-incomplet ? En réalité, cependant, l'incomplétude de Turing est loin d'être une solution propre au problème. Pour comprendre pourquoi, considérez les contrats suivants :

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Maintenant, envoyez une transaction à A. Ainsi, en 51 transactions, nous avons un contrat qui prend 2<sup>50</sup> étapes de calcul. Les mineurs pourraient essayer de détecter de telles bombes logiques à l'avance en maintenant une valeur à côté de chaque contrat spécifiant le nombre maximum d'étapes de calcul qu'il peut prendre, et en calculant cela pour les contrats appelant d'autres contrats de manière récursive, mais cela obligerait les mineurs à interdire les contrats qui créent d'autres contrats (puisque la création et l'exécution des 26 contrats ci-dessus pourraient facilement être regroupées en un seul contrat). Un autre point problématique est que le champ d'adresse d'un message est une variable, donc en général, il peut même ne pas être possible de dire à l'avance quels autres contrats un contrat donné appellera. Par conséquent, dans l'ensemble, nous arrivons à une conclusion surprenante : la complétude de Turing est étonnamment facile à gérer, et le manque de complétude de Turing est tout aussi étonnamment difficile à gérer à moins que les mêmes contrôles exacts ne soient en place - mais dans ce cas, pourquoi ne pas simplement laisser le protocole être Turing-complet ?

### Monnaie et émission {#currency-and-issuance}

Le réseau Ethereum inclut sa propre monnaie intégrée, l'ether, qui a le double objectif de fournir une couche de liquidité principale pour permettre un échange efficace entre divers types d'actifs numériques et, plus important encore, de fournir un mécanisme pour payer les frais de transaction. Pour des raisons de commodité et pour éviter de futures disputes (voir le débat actuel mBTC/uBTC/satoshi dans Bitcoin), les dénominations seront pré-étiquetées :

- 1 : Wei
- 10<sup>12</sup> : szabo
- 10<sup>15</sup> : finney
- 10<sup>18</sup> : ether

Cela doit être considéré comme une version élargie du concept de « dollars » et de « cents » ou de « BTC » et de « satoshi ». Dans un avenir proche, nous nous attendons à ce que l'« ether » soit utilisé pour les transactions ordinaires, le « finney » pour les microtransactions et le « szabo » et le « Wei » pour les discussions techniques autour des frais et de l'implémentation du protocole ; les dénominations restantes pourraient devenir utiles plus tard et ne devraient pas être incluses dans les clients à ce stade.

Le modèle d'émission sera le suivant :

- L'ether sera mis en circulation lors d'une vente de monnaie au prix de 1000 à 2000 ethers par BTC, un mécanisme destiné à financer l'organisation Ethereum et à payer le développement qui a été utilisé avec succès par d'autres plateformes telles que Mastercoin et NXT. Les premiers acheteurs bénéficieront de remises plus importantes. Les BTC reçus de la vente seront entièrement utilisés pour payer les salaires et les primes aux développeurs et investis dans divers projets à but lucratif et non lucratif dans l'écosystème Ethereum et des cryptomonnaies.
- 0,099x le montant total vendu (60102216 ETH) sera alloué à l'organisation pour rémunérer les premiers contributeurs et payer les dépenses libellées en ETH avant le bloc genèse.
- 0,099x le montant total vendu sera conservé comme réserve à long terme.
- 0,26x le montant total vendu sera alloué aux mineurs par an pour toujours après ce point.

| Groupe | Au lancement | Après 1 an | Après 5 ans |
| ---------------------- | --------- | ------------ | ------------- |
| Unités monétaires | 1,198X | 1,458X | 2,498X |
| Acheteurs | 83,5 % | 68,6 % | 40,0 % |
| Réserve dépensée avant la vente | 8,26 % | 6,79 % | 3,96 % |
| Réserve utilisée après la vente | 8,26 % | 6,79 % | 3,96 % |
| Mineurs | 0 % | 17,8 % | 52,0 % |

#### Taux de croissance de l'offre à long terme (en pourcentage) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Malgré l'émission monétaire linéaire, tout comme avec Bitcoin au fil du temps, le taux de croissance de l'offre tend néanmoins vers zéro._

Les deux choix principaux dans le modèle ci-dessus sont (1) l'existence et la taille d'un fonds de dotation, et (2) l'existence d'une offre linéaire en croissance permanente, par opposition à une offre plafonnée comme dans Bitcoin. La justification du fonds de dotation est la suivante. Si le fonds de dotation n'existait pas, et que l'émission linéaire était réduite à 0,217x pour fournir le même taux d'inflation, alors la quantité totale d'ether serait de 16,5 % inférieure et chaque unité serait donc 19,8 % plus précieuse. Par conséquent, à l'équilibre, 19,8 % d'ether en plus seraient achetés lors de la vente, de sorte que chaque unité serait à nouveau exactement aussi précieuse qu'auparavant. L'organisation aurait alors également 1,198x plus de BTC, ce qui peut être considéré comme divisé en deux tranches : les BTC d'origine, et les 0,198x supplémentaires. Par conséquent, cette situation est _exactement équivalente_ à la dotation, mais avec une différence importante : l'organisation détient purement des BTC, et n'est donc pas incitée à soutenir la valeur de l'unité d'ether.

Le modèle de croissance linéaire permanente de l'offre réduit le risque de ce que certains considèrent comme une concentration excessive de la richesse dans Bitcoin, et donne aux individus vivant dans les époques présentes et futures une chance équitable d'acquérir des unités monétaires, tout en conservant une forte incitation à obtenir et à détenir de l'ether car le « taux de croissance de l'offre » en pourcentage tend toujours vers zéro au fil du temps. Nous théorisons également que parce que des pièces sont toujours perdues au fil du temps en raison de la négligence, de la mort, etc., et que la perte de pièces peut être modélisée comme un pourcentage de l'offre totale par an, l'offre totale de monnaie en circulation finira en fait par se stabiliser à une valeur égale à l'émission annuelle divisée par le taux de perte (par exemple, à un taux de perte de 1 %, une fois que l'offre atteint 26X, alors 0,26X sera miné et 0,26X perdu chaque année, créant un équilibre).

Notez qu'à l'avenir, il est probable qu'Ethereum passera à un modèle de preuve d'enjeu (PoS) pour la sécurité, réduisant l'exigence d'émission à une valeur comprise entre zéro et 0,05X par an. Dans le cas où l'organisation Ethereum perdrait son financement ou disparaîtrait pour toute autre raison, nous laissons ouvert un « contrat social » : quiconque a le droit de créer une future version candidate d'Ethereum, à la seule condition que la quantité d'ether soit au maximum égale à `60102216 * (1.198 + 0.26 * n)` où `n` est le nombre d'années après le bloc genèse. Les créateurs sont libres de vendre par financement participatif ou d'attribuer autrement tout ou partie de la différence entre l'expansion de l'offre induite par la PoS et l'expansion maximale autorisée de l'offre pour payer le développement. Les mises à niveau candidates qui ne respectent pas le contrat social peuvent légitimement faire l'objet d'un fork vers des versions conformes.

### Centralisation du minage {#mining-centralization}

L'algorithme de minage de Bitcoin fonctionne en demandant aux mineurs de calculer le SHA-256 sur des versions légèrement modifiées de l'en-tête de bloc des millions de fois encore et encore, jusqu'à ce qu'un nœud trouve finalement une version dont le hash est inférieur à la cible (actuellement autour de 2<sup>192</sup>). Cependant, cet algorithme de minage est vulnérable à deux formes de centralisation. Premièrement, l'écosystème de minage en est venu à être dominé par les ASIC (circuits intégrés spécifiques à une application), des puces informatiques conçues pour, et donc des milliers de fois plus efficaces dans, la tâche spécifique du minage de Bitcoin. Cela signifie que le minage de Bitcoin n'est plus une activité hautement décentralisée et égalitaire, nécessitant des millions de dollars de capital pour y participer efficacement. Deuxièmement, la plupart des mineurs de Bitcoin n'effectuent pas réellement la validation de bloc localement ; au lieu de cela, ils s'appuient sur un pool de minage centralisé pour fournir les en-têtes de bloc. Ce problème est sans doute pire : au moment de la rédaction de cet article, les trois principaux pools de minage contrôlent indirectement environ 50 % de la puissance de traitement du réseau Bitcoin, bien que cela soit atténué par le fait que les mineurs peuvent passer à d'autres pools de minage si un pool ou une coalition tente une attaque des 51 %.

L'intention actuelle d'Ethereum est d'utiliser un algorithme de minage où les mineurs sont tenus de récupérer des données aléatoires de l'état, de calculer certaines transactions sélectionnées au hasard dans les N derniers blocs de la chaîne de blocs, et de renvoyer le hash du résultat. Cela présente deux avantages importants. Premièrement, les contrats Ethereum peuvent inclure n'importe quel type de calcul, de sorte qu'un ASIC Ethereum serait essentiellement un ASIC pour le calcul général - c'est-à-dire un meilleur processeur (CPU). Deuxièmement, le minage nécessite l'accès à l'ensemble de la chaîne de blocs, forçant les mineurs à stocker l'intégralité de la chaîne de blocs et à être au moins capables de vérifier chaque transaction. Cela supprime le besoin de pools de minage centralisés ; bien que les pools de minage puissent toujours jouer le rôle légitime de lisser le caractère aléatoire de la distribution des récompenses, cette fonction peut être tout aussi bien remplie par des pools pair à pair sans contrôle central.

Ce modèle n'a pas été testé, et il peut y avoir des difficultés en cours de route pour éviter certaines optimisations intelligentes lors de l'utilisation de l'exécution de contrats comme algorithme de minage. Cependant, une caractéristique particulièrement intéressante de cet algorithme est qu'il permet à quiconque d'« empoisonner le puits », en introduisant un grand nombre de contrats dans la chaîne de blocs spécifiquement conçus pour contrecarrer certains ASIC. Les incitations économiques existent pour que les fabricants d'ASIC utilisent une telle astuce pour s'attaquer mutuellement. Ainsi, la solution que nous développons est en fin de compte une solution humaine économique adaptative plutôt qu'une solution purement technique.

### Évolutivité {#scalability}

Une préoccupation commune concernant Ethereum est la question de l'évolutivité. Comme Bitcoin, Ethereum souffre du défaut que chaque transaction doit être traitée par chaque nœud du réseau. Avec Bitcoin, la taille de la chaîne de blocs actuelle se situe à environ 15 Go, augmentant d'environ 1 Mo par heure. Si le réseau Bitcoin devait traiter les 2000 transactions par seconde de Visa, il augmenterait de 1 Mo toutes les trois secondes (1 Go par heure, 8 To par an). Ethereum est susceptible de subir un modèle de croissance similaire, aggravé par le fait qu'il y aura de nombreuses applications au-dessus de la chaîne de blocs Ethereum au lieu d'une simple monnaie comme c'est le cas avec Bitcoin, mais amélioré par le fait que les nœuds complets Ethereum n'ont besoin de stocker que l'état au lieu de l'historique complet de la chaîne de blocs.

Le problème avec une taille de chaîne de blocs aussi importante est le risque de centralisation. Si la taille de la chaîne de blocs augmente à, disons, 100 To, alors le scénario probable serait que seul un très petit nombre de grandes entreprises exécuteraient des nœuds complets, tous les utilisateurs réguliers utilisant des nœuds légers SPV. Dans une telle situation, il y a la préoccupation potentielle que les nœuds complets pourraient se regrouper et tous s'entendre pour tricher d'une manière rentable (par exemple, modifier la récompense de bloc, s'attribuer des BTC). Les nœuds légers n'auraient aucun moyen de le détecter immédiatement. Bien sûr, au moins un nœud complet honnête existerait probablement, et après quelques heures, des informations sur la fraude filtreraient par des canaux comme Reddit, mais à ce stade, il serait trop tard : il appartiendrait aux utilisateurs ordinaires d'organiser un effort pour mettre sur liste noire les blocs donnés, un problème de coordination massif et probablement irréalisable à une échelle similaire à celle de réussir une attaque des 51 %. Dans le cas de Bitcoin, c'est actuellement un problème, mais il existe une modification de la chaîne de blocs [suggérée par Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) qui atténuera ce problème.

À court terme, Ethereum utilisera deux stratégies supplémentaires pour faire face à ce problème. Premièrement, en raison des algorithmes de minage basés sur la chaîne de blocs, au moins chaque mineur sera forcé d'être un nœud complet, créant une limite inférieure sur le nombre de nœuds complets. Deuxièmement et plus important encore, cependant, nous inclurons une racine d'arbre d'état intermédiaire dans la chaîne de blocs après le traitement de chaque transaction. Même si la validation de bloc est centralisée, tant qu'il existe un nœud de vérification honnête, le problème de centralisation peut être contourné via un protocole de vérification. Si un mineur publie un bloc invalide, ce bloc doit soit être mal formaté, soit l'état `S[n]` est incorrect. Puisque `S[0]` est connu pour être correct, il doit y avoir un premier état `S[i]` qui est incorrect là où `S[i-1]` est correct. Le nœud de vérification fournirait l'indice `i`, ainsi qu'une « preuve d'invalidité » consistant en un sous-ensemble de nœuds de l'arbre de Patricia nécessaires pour traiter `APPLY(S[i-1],TX[i]) -> S[i]`. Les nœuds seraient capables d'utiliser ces nœuds pour exécuter cette partie du calcul, et voir que l'état `S[i]` généré ne correspond pas à l'état `S[i]` fourni.

Une autre attaque, plus sophistiquée, impliquerait que les mineurs malveillants publient des blocs incomplets, de sorte que l'information complète n'existe même pas pour déterminer si les blocs sont valides ou non. La solution à cela est un protocole de défi-réponse : les nœuds de vérification émettent des « défis » sous la forme d'indices de transaction cibles, et lors de la réception d'un nœud, un nœud léger traite le bloc comme non fiable jusqu'à ce qu'un autre nœud, que ce soit le mineur ou un autre vérificateur, fournisse un sous-ensemble de nœuds Patricia comme preuve de validité.

## Conclusion {#conclusion}

Le protocole Ethereum a été conçu à l'origine comme une version améliorée d'une cryptomonnaie, offrant des fonctionnalités avancées telles que les comptes séquestres sur la chaîne de blocs, les limites de retrait, les contrats financiers, les marchés de paris et autres via un langage de programmation hautement généralisé. Le protocole Ethereum ne « prendrait en charge » directement aucune de ces applications, mais l'existence d'un langage de programmation Turing-complet signifie que des contrats arbitraires peuvent théoriquement être créés pour n'importe quel type de transaction ou d'application. Ce qui est plus intéressant avec Ethereum, cependant, c'est que le protocole Ethereum va bien au-delà de la simple monnaie. Les protocoles autour du stockage de fichiers décentralisé, du calcul décentralisé et des marchés de prédiction décentralisés, parmi des dizaines d'autres concepts de ce type, ont le potentiel d'augmenter considérablement l'efficacité de l'industrie du calcul, et de donner un élan massif à d'autres protocoles pair à pair en ajoutant pour la première fois une couche économique. Enfin, il existe également un éventail substantiel d'applications qui n'ont absolument rien à voir avec l'argent.

Le concept d'une fonction de transition d'état arbitraire telle que mise en œuvre par le protocole Ethereum offre une plateforme au potentiel unique ; plutôt que d'être un protocole fermé et à usage unique destiné à un éventail spécifique d'applications dans le stockage de données, les paris ou la finance, Ethereum est ouvert par conception, et nous pensons qu'il est extrêmement bien adapté pour servir de couche fondamentale à un très grand nombre de protocoles, tant financiers que non financiers, dans les années à venir.

## Notes et lectures complémentaires {#notes-and-further-reading}

### Notes {#notes}

1. Un lecteur averti remarquera qu'en fait, une adresse Bitcoin est le hash de la clé publique de courbe elliptique, et non la clé publique elle-même. Cependant, il est tout à fait légitime, dans la terminologie cryptographique, de désigner le hash de la clé publique comme étant la clé publique elle-même. Cela s'explique par le fait que la cryptographie de Bitcoin peut être considérée comme un algorithme de signature numérique personnalisé, où la clé publique consiste en le hash de la clé publique ECC, la signature consiste en la clé publique ECC concaténée avec la signature ECC, et l'algorithme de vérification implique de vérifier la clé publique ECC dans la signature par rapport au hash de la clé publique ECC fourni comme clé publique, puis de vérifier la signature ECC par rapport à la clé publique ECC.
2. Techniquement, la médiane des 11 blocs précédents.
3. En interne, 2 et "CHARLIE" sont tous deux des nombres, ce dernier étant dans une représentation en base 256 grand-boutiste. Les nombres peuvent être au minimum de 0 et au maximum de 2<sup>256</sup>-1.

### Lectures complémentaires {#further-reading}

1. [Valeur intrinsèque](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Propriété intelligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contrats intelligents](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](https://nakamotoinstitute.org/b-money/)
5. [Preuves de travail réutilisables](https://nakamotoinstitute.org/finney/rpow/)
6. [Titres de propriété sécurisés avec l'autorité du propriétaire](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Livre blanc de Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triangle de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Livre blanc des Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Livre blanc de Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Sociétés autonomes décentralisées, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Vérification simplifiée des paiements](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Arbres de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Arbres Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ et agents autonomes, Jeff Garzik](https://garzikrants.blogspot.com/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sur la propriété intelligente au Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP d'Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Arbres de Merkle Patricia d'Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd sur les arbres de somme de Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Pour l'historique du livre blanc, consultez [ce wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, comme de nombreux projets de logiciels open source pilotés par la communauté, a évolué depuis sa création initiale. Pour en savoir plus sur les derniers développements d'Ethereum et sur la manière dont les modifications du protocole sont apportées, nous vous recommandons [ce guide](/learn/)._
