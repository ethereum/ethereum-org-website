---
title: Livre blanc Ethereum
description: Document d'introduction à Ethereum, publié en 2013 avant son lancement.
lang: fr
sidebarDepth: 2
hideEditButton: true
---

# Livre blanc Ethereum {#ethereum-whitepaper}

_Ce document d'introduction a été publié pour la première fois en 2014 par Vitalik Buterin, le fondateur d'[Ethereum](/what-is-ethereum/), avant le lancement du projet en 2015. Il convient de noter qu'Ethereum, comme nombre de projets open source gérés de façon communautaire, a évolué depuis sa création._

_Même s'il date déjà de plusieurs années, nous conservons ce document car il constitue une référence utile et une représentation précise d'Ethereum et de la vision du projet. Pour plus d'infos sur les derniers développements d'Ethereum et la façon dont les modifications du protocole sont mises en œuvre, nous vous recommandons de lire [ce guide](/learn/)._

[Les chercheurs et universitaires à la recherche d'une version historique ou canonique du livre blanc [à partir de décembre 2014] peuvent utiliser ce PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Une plateforme d'applications décentralisées et de contrats intelligents de nouvelle génération {#a-next-generation-smart-contract-and-decentralized-application-platform}

Le développement du Bitcoin par Satoshi Nakamoto en 2009 a souvent été salué comme une évolution radicale de la monnaie et des devises. Il s'agissait en effet du premier exemple d'actif numérique n'ayant simultanément aucune garantie ni "[valeur intrinsèque](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)", et aucun contrôleur ni émetteur centralisé. L'attention est cependant en train de se porter sur un autre aspect (sans doute plus important) du Bitcoin : la technologie blockchain sous-jacente comme outil de consensus distribué. Parmi les autres applications de la technologie blockchain fréquemment citées, on trouve l'utilisation d'actifs numériques pour représenter des monnaies personnalisées et des instruments financiers ("[Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la propriété d'appareils physiques sous-jacents ("[Smart property](https://en.bitcoin.it/wiki/Smart_Property)"), des actifs non fongibles comme les noms de domaine ("[Namecoin](http://namecoin.org)"), ainsi que des applications plus complexes dans lesquelles des actifs numériques sont directement contrôlés par une portion de code exécutant des règles diverses ("[Contrats intelligents](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)"), ou encore des "[organisations autonomes décentralisées" (ou DAO)](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/) basées sur la blockchain. Ce qu'Ethereum souhaite proposer, c'est une blockchain avec un véritable langage de programmation intégré, Turing-complet, pouvant être utilisé pour créer des « contrats » susceptibles d'encoder des fonctions de transition d'état arbitraires. Cela permettra aux utilisateurs de créer n'importe lequel des systèmes cités ci-dessus, ainsi que beaucoup d'autres que nous n'avons pas encore imaginés, le tout en quelques lignes de code.

## Introduction au Bitcoin et aux concepts existants {#introduction-to-bitcoin-and-existing-concepts}

### Historique {#history}

Le concept de monnaie numérique décentralisée, ainsi que des applications alternatives comme les registres de propriété, font l'objet d'études depuis des décennies. Les protocoles anonymes de monnaie électronique des années 1980 et 1990, principalement fondés sur une primitive cryptographique appelée Chaumian Blinding (signature aveugle), ont fourni une monnaie à un niveau de confidentialité élevé, mais leurs protocoles sous-jacents ont largement échoué à se populariser en raison de leur dépendance à un intermédiaire centralisé. En 1998, la [b-money](http://www.weidai.com/bmoney.txt) de Wei Dai fut la première proposition d'une idée de créer une monnaie via la résolution d'un calcul cryptographique ainsi que l'idée d'un consensus décentralisé, mais la proposition n'était pas assez étayée quant à la manière d'implémenter un consens décentralisé. En 2005, Hal Finney présenta le concept de "[preuves de travail réutilisables](https://nakamotoinstitute.org/finney/rpow/)", qui reprenait les idées de b-money et des puzzles cryptographiques Hashcash d'Adam Back, gourmands en ressources informatiques, pour créer un concept de cryptomonnaie, mais sans parvenir à une solution idéale puisqu'il nécessitait un système informatique de confiance comme backend. En 2009, une monnaie décentralisée fut implémentée pour la première fois par Satoshi Nakamoto, qui combinait des primitives reconnues utilisant la cryptographie asymétrique pour gérer la propriété, à un algorithme de consensus, le « proof-of-work », pour garder une trace des détenteurs de monnaie.

Le mécanisme de la preuve de travail a été une réelle avancée dans ce domaine, car il a permis de résoudre simultanément deux problèmes. Premièrement, cela a fourni un algorithme de consensus simple et efficace, permettant aux noeuds du réseau de s'accorder collectivement sur un ensemble de mises à jour canonique sur l'état du registre de Bitcoin. Deuxièmement, cela a fourni un mécanisme permettant de participer librement au consensus, résolvant le problème politique de décider qui peut influer sur le consensus, tout en empêchant simultanément les attaques Sybil. Il y parvient en substituant un obstacle formel à la participation, comme l'obligation d'être enregistré en tant qu'entité unique sur une liste donnée, par une barrière économique : le poids d'un seul nœud dans le processus de vote par consensus est directement proportionnel à la puissance de calcul que celui-ci apporte. Depuis, une autre approche a été proposée, la _preuve d'enjeu_ (Proof of stake), qui calcule le poids d'un nœud proportionnellement à ses avoirs en monnaie et non pas à ses ressources de calcul. La discussion sur les mérites relatifs des deux approches dépasse la portée de ce document, mais il convient de noter que les deux peuvent être utilisées pour servir de colonne vertébrale à une cryptomonnaie.

### Bitcoin en tant que système de transition d'état {#bitcoin-as-a-state-transition-system}

![Transition d'état Ethereum](./ethereum-state-transition.png)

D'un point de vue technique, le registre d'une cryptomonnaie telle que le Bitcoin peut être considéré comme un système de transition d'état dans lequel il existe un « état », représentant le statut de propriété de tous les bitcoins existants, et une « fonction de transition d'état », qui associe un état et une transaction, et en fait résulter un nouvel état. Par exemple, dans un système bancaire classique, l'état est un bilan, une transaction est une demande de déplacer X $ de A vers B, et la fonction de transition d'état diminue la valeur du compte A de X $ et augmente la valeur du compte B de X $. Si le compte A a moins de X $ au départ, la fonction de transition d'état renvoie une erreur. On peut donc formellement définir :

```
APPLY(S,TX) -> S' or ERROR
```

Dans le système bancaire défini ci-dessus :

```js
APPLY({ Alice: $50, Marc: $50 },"send $20 from Alice to Marc") = { Alice: $30, Marc: $70 }
```

Mais :

```js
APPLY({ Alice: $50, Marc: $50 },"send $70 from Alice to Marc") = ERROR
```

Dans Bitcoin, l'« état » est l'ensemble de toutes les unités de compte (techniquement, les sorties de transaction non dépensées, « unspent transaction outputs » ou UTXO) qui ont été minées, mais pas encore dépensées, chaque UTXO ayant une valeur nominale et un propriétaire (défini par une adresse de 20 octets qui est en fait une clé cryptographique publique<sup>[fn1](#notes)</sup>). Une transaction comporte une ou plusieurs entrées, chacune contenant une référence à un UTXO existant et une signature cryptographique produite par la clé privée associée à l'adresse du propriétaire, ainsi qu'une ou plusieurs sorties, chacune comportant un nouvel UTXO à ajouter à l'état.

La fonction de transition d'état `APPLY(S,TX) -> S'` peut grossièrement être définie comme suit :

<ol>
  <li>
    Pour chaque entrée dans <code>TX</code> :
    <ul>
    <li>
        Si l'UTXO référencé n'est pas <code>S</code>, une erreur est renvoyée.
    </li>
    <li>
        Si la signature fournie ne correspond pas à celle du propriétaire de l'UTXO, une erreur est renvoyée.
    </li>
    </ul>
  </li>
  <li>
    Si la somme de tous les UTXO d'entrée est inférieure à celle de tous les UTXO de sortie, une erreur est renvoyée.
  </li>
  <li>
    <code>S</code> est renvoyé avec tous les UTXO d'entrée supprimés et tous les UTXO de sortie ajoutés.
  </li>
</ol>

La première moitié de la première étape empêche les émetteurs de transaction de dépenser des unités de compte qui n'existent pas, la seconde moitié les empêche de dépenser les unités de compte d'autres personnes, et la deuxième étape assure que la valeur est préservée. Le protocole pour utiliser cela comme moyen de paiement est le suivant. Imaginons qu'Alice veuille envoyer 11,7 BTC à Marc. Alice va commencer par chercher un ensemble disponible d'UTXO qui lui appartiennent, pour un total d'au moins 11,7 BTC. En réalité, Alice ne pourra pas obtenir exactement 11,7 BTC. La plus petite somme qu'elle peut obtenir est 6+4+2=12. Elle crée alors une transaction avec ces trois entrées et deux sorties. La première sortie sera 11,7 BTC avec l'adresse de Marc comme propriétaire, et la seconde sortie représentera les 0,3 BTC de monnaie restante, dont elle est propriétaire.

### Minage {#mining}

![Blocs Ethereum](./ethereum-blocks.png)

Si nous avions accès à un service centralisé digne de confiance, il serait trivial d'implémenter ce système : il pourrait être codé exactement comme décrit plus haut, en utilisant le disque dur d'un serveur centralisé pour garder une trace de l'état. Avec Bitcoin, nous essayons toutefois de construire un système monétaire décentralisé et avons donc besoin de combiner le système de transition d'état avec un système de consensus afin de garantir que tout le monde est d'accord sur l'ordre des transactions. Le processus de consensus décentralisé de Bitcoin exige que les nœuds du réseau tentent en continu de produire des paquets de transactions appelés "blocs". Le réseau est destiné à créer un bloc toutes les dix minutes environ, chaque bloc contenant un horodatage, un nonce, une référence au bloc précédent (hachage ou hash) et une liste de toutes les transactions qui ont eu lieu depuis le bloc précédent. Au fil du temps, cela crée une "blockchain" continuelle, croissant sans cesse, qui se met perpétuellement à jour pour représenter l'état le plus récent du registre Bitcoin.

L'algorithme utilisé pour vérifier qu'un bloc est valide, exprimé dans ce paradigme, est le suivant :

1. On vérifie que le bloc précédent référencé par le bloc existe et est valide.
2. On vérifie que l'horodatage du bloc est supérieur à celui du précédent bloc<sup>[fn2](#notes)</sup> et qu'il n'excède pas 2 heures dans l'avenir.
3. On vérifie que la preuve de travail du bloc est valide.
4. `S[0]` doit être l'état à la fin du bloc précédent.
5. On suppose que `TX` est la liste des transactions du bloc avec `n` transactions. Pour tout `i` dans `0...n-1`, alors `S[i+1] = APPLY(S[i],TX[i])` Si une application renvoie une erreur, sortie et valeur false renvoyée.
6. La valeur true est renvoyée et `S[n]` est enregistré comme comme état à la fin de ce bloc.

Fondamentalement, chaque transaction du bloc doit fournir une transition d'état valide vers un nouvel état, à partir de ce qui était l'état conforme avant que la transaction ne soit exécutée vers le nouvel état. Notez que l'état n'est aucunement encodé dans le bloc. Ce n'est qu'une abstraction dont le nœud validateur doit se souvenir et il ne peut être calculé de façon sécurisée pour n'importe quel bloc qu'en partant de l'état d'origine et en y appliquant séquentiellement toutes les transactions de chaque bloc. Notez par ailleurs que l'ordre dans lequel le mineur inclut les transactions dans le bloc a de l'importance. S'il existe deux transactions A et B dans un bloc de telle façon que B dépense un UTXO créé par A, alors le bloc sera valable si A précède B, et non l'inverse.

La seule condition de validité présente dans la liste ci-dessus qu'on ne trouve pas dans d'autres systèmes est l'exigence de "preuve de travail" (PoW). La condition précise est que le double hash SHA256 de chaque bloc, traité comme un nombre de 256 bits, doit être inférieur à une cible ajustée dynamiquement qui, à la rédaction de ce document, est d'environ 2<sup>187</sup>. L'objectif est de rendre "difficile" la création de blocs en terme de calculs, ce qui empêche les pirates effectuant une attaque Sybil de recréer toute la blockchain en leur faveur. SHA256 étant conçu comme une fonction pseudo-aléatoire complètement imprévisible, la seule façon de créer un bloc valide est de faire des essais et des corrections en incrémentant le nonce de façon répétée pour voir si chaque nouveau hash correspond.

D'après l'objectif actuel de \~2<sup>187</sup>, le réseau doit faire une moyenne de \~2<sup>69</sup> essais avant de trouver un bloc valide. En général, la cible est recalibrée par le réseau tous les 2 016 blocs de sorte qu'en moyenne, un nouveau bloc est produit par un nœud du réseau toutes les dix minutes. Afin de compenser le travail de calcul des mineurs, chacun d'entre eux est en droit d'inclure pour chaque bloc miné une transaction qui lui octroie 25 BTC sortant de nulle part. En outre, si une transaction a une valeur totale d'entrées supérieure à celle des sorties, la différence revient également au mineur sous forme de "frais de transaction". Par ailleurs, il s'agit également du seul mécanisme par lequel les BTC sont émis, car l'état d'origine ne contenait aucune unité de compte.

Afin de mieux comprendre le but du minage, nous allons examiner ce qui se passe en cas d'attaque malveillante. La cryptographie sous-jacente à Bitcoin étant connue pour être bien sécurisée, l'attaquant va cibler la partie du système Bitcoin qui n'est pas directement protégée par la cryptographie : l'ordre des transactions. La stratégie de l'attaquant est donc simple :

1. Envoyer 100 BTC à un commerçant en échange d'un produit (de préférence, un bien numérique à livraison rapide).
2. Attendre la livraison du produit.
3. Produire une autre transaction en s'envoyant 100 BTC à lui-même.
4. Essayer de convaincre le réseau que la transaction qu'il s'est envoyée à lui-même est celle réalisée en premier.

Une fois l'étape (1) réalisée, un mineur inclura la transaction dans un bloc après quelques minutes. Par exemple, le bloc numéro 270000. Au bout d'environ une heure, cinq autres blocs auront été ajoutés à la chaîne après ce bloc, chacun d'entre eux pointant indirectement vers la transaction et ainsi, la "confirmant". À ce stade, le commerçant acceptera le paiement comme finalisé et livrera le produit. Partant du postulat qu'il s'agit d'un bien numérique, la livraison est instantanée. L'attaquant crée maintenant une autre transaction en s'envoyant 100 BTC à lui-même. S'il l'envoie simplement dans la nature, la transaction ne sera pas traitée : les mineurs vont tenter d'exécuter `APPLY(S,TX)` et remarqueront que `TX` consomme un UTXO qui n'est plus dans l'état. Au lieu de cela, l'attaquant crée donc une « fourche » (une scission) dans la blockchain en commençant par miner une autre version du bloc 270000 pointant vers le même bloc parent 269999, mais contenant la nouvelle transaction à la place de l'ancienne. Les données du bloc étant différentes, cela nécessite de refaire la preuve de travail. De plus, le hash de la nouvelle version du bloc 270000 de l'attaquant est différente, donc les blocs d'origine de 270001 à 270005 ne « pointent » pas vers lui. La chaîne d'origine et la nouvelle chaîne de l'attaquant sont donc bien complètement séparées. La règle étant que, dans le cas d'une fourche, c'est la plus longue blockchain qui est considérée comme la vraie, les mineurs légitimes travaillent donc sur la chaîne 270005 tandis que l'attaquant travaille seul sur la chaîne 270000. Pour que la blockchain de l'attaquant soit la plus longue, il aurait besoin d'avoir plus de puissance de calcul que le reste du réseau combiné afin de rattraper son retard (d'où l'attaque dite "de 51 %").

### Arbres de Merkle {#merkle-trees}

![SPV chez Bitcoin](./spv-bitcoin.png)

_À gauche : Il suffit de ne présenter qu'un petit nombre de nœuds dans un arbre de Merkle pour donner la preuve de la validité d'une branche._

_À droite : Toute tentative de modifier quelque partie que ce soit d'un arbre de Merkle conduira forcément à une incohérence plus haut dans la chaîne._

Une importante fonctionnalité d'évolutivité de Bitcoin est que le bloc est stocké dans une structure de données multiniveau. Le "hash" (ou hachage) d'un bloc n'est en fait que celui de l'en-tête du bloc, soit environ 200 octets de données contenant l'horodatage, le nonce, le hash du bloc précédent et le hash racine d'une structure de données appelée Arbre de Merkle, qui stocke toutes les transactions du bloc. Un arbre de Merkle est un type d'arbre binaire composé d'un ensemble de nœuds avec nombre de nœuds feuilles au bas de l'arbre contenant les données sous-jacentes, un ensemble de nœuds intermédiaires où chacun est le hash de ses deux enfants, et pour finir, un nœud racine unique, également formé à partir du hash de ses deux enfants, qui représente la "cime" de l'arbre. L'objectif de l'arbre de Merkle est de permettre la livraison des données d'un bloc de façon fragmentaire : un nœud peut télécharger uniquement l'en-tête d'un bloc à partir d'une source, la petite partie de l'arbre qui le concerne à partir d'une autre source, tout en étant assuré que toutes les données sont correctes. La raison pour laquelle cela fonctionne est que les hachages se propagent vers le haut : si un utilisateur malveillant tente d'insérer une fausse transaction dans le bas d'un arbre de Merkle, cela modifiera le nœud au-dessus, puis le nœud au-dessus suivant, pour finalement changer la racine de l'arbre et donc le hash du bloc, ce qui fait que le protocole enregistre celui-ci comme un bloc complètement différent (presque certainement avec une preuve de travail non valide).

On peut dire que le protocole de l'arbre de Merkle est essentiel à la viabilité du système à long terme. Un nœud complet ("full node") du réseau Bitcoin, qui stocke et traite l'intégralité de chaque bloc, nécessitait environ 15 Go d'espace disque sur le réseau Bitcoin en avril 2014, avec une croissance d'un gigaoctet par mois. La situation actuelle est viable pour certains ordinateurs de bureau, mais pas pour les téléphones, et à l'avenir, seuls les entreprises et les passionnés seront en mesure de participer. Un protocole connu sous le nom de vérification de paiement simplifiée (ou SPV) permet l'existence d'une autre catégorie de nœuds, appelés Nœuds légers ("light nodes"). Ce protocole permet aux nœuds légers de déterminer avec une vraie garantie de sécurité le statut de n'importe quelle transaction Bitcoin, ainsi que son solde actuel, en ne téléchargeant qu'une très petite partie de la blockchain.

### Autres applications de la blockchain {#alternative-blockchain-applications}

L'application de l'idée sous-jacente de la blockchain à d'autres concepts a également une longue histoire. En 2005, Nick Szabo invente le concept de « [secure property titles with ownerauthority](https://nakamotoinstitute.org/secure-property-titles/) » (titres de propriété sécurisés avec preuve de possession), un document décrivant comment de « nouvelles avancées dans la technologie des bases de données répliquées » permettent à un système fondé sur la blockchain de stocker une sorte de cadastre des propriétaires de terrains, créant ainsi un cadre élaboré qui inclut des concepts comme l'occupation d'un terrain, la prescription acquisitive et la taxe foncière en Géorgie. Il n'existait toutefois malheureusement aucun système de base de données répliquées efficace à cette époque. Le protocole n'a donc jamais été implémenté en pratique. Après 2009, une fois développé le consensus décentralisé de Bitcoin, un certain nombre d'autres applications ont néanmoins rapidement commencé à émerger.

- **Namecoin** : créée en 2010, [Namecoin](https://namecoin.org/) peut être décrite comme une base de données décentralisée d'enregistrement de noms. Dans les protocoles décentralisés comme Tor, Bitcoin et BitMessage, il doit exister un moyen d'identifier les comptes afin que d'autres personnes puissent interagir avec eux, mais dans toutes les solutions existantes, le seul type d'identificateur disponible est un hash pseudo-aléatoire comme `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idéalement, on souhaiterait avoir un compte avec un nom comme « george ». Cependant, le problème est que si une personne peut créer un compte nommé « george », quelqu'un d'autre peut utiliser le même processus afin d'enregistrer « george » pour lui-même et se faire passer pour lui. La seule solution est d'appliquer le paradigme du premier déposant, où le premier enregistrement réussit tandis que le second échoue, parfaitement adapté pour le protocole de consensus Bitcoin. Namecoin est l'implémentation la plus ancienne et la plus réussie d'un système d'enregistrement de noms reposant sur cette idée.
- **Pièces colorées** : le but des [pièces colorées (colored coins)](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) est de servir de protocole pour permettre aux utilisateurs de créer leur propre monnaie numérique, ou dans le cas courant, mais néanmoins important, d'une monnaie à une seule unité, de créer des jetons (tokens) numériques sur la blockchain de Bitcoin. Dans le protocole des pièces colorées, on « émet » une nouvelle monnaie en attribuant publiquement une couleur à un UTXO Bitcoin spécifique, et le protocole définit récursivement la couleur des autres UTXO pour qu'elle soit identique à celle des entrées dépensées par la transaction qui les crée (certaines règles spéciales s'appliquent dans le cas d'entrées de couleurs mélangées). Cela permet aux utilisateurs de conserver des portefeuilles ne contenant que des UTXO d'une couleur donnée et de les envoyer comme des Bitcoins normaux, en remontant l'historique de la blockchain pour déterminer la couleur de n'importe quel UTXO reçu.
- **Metacoins** : l'idée derrière un metacoin consiste à superposer un protocole à Bitcoin, en utilisant les transactions Bitcoin pour stocker les transactions Metacoin, mais en ayant une fonction de transition d'état différente, `APPLY'`. Comme le protocole Metacoin ne peut pas empêcher l'apparition de transactions non valides dans la blockchain Bitcoin, une règle a été ajoutée selon laquelle si `APPLY'(S,TX)` renvoie une erreur, le protocole donne par défaut `APPLY'(S,TX) = S`. Cela facilite le mécanisme de création d'un protocole de cryptomonnaie arbitraire, qui comprend potentiellement des fonctionnalités avancées ne pouvant être implémentées à l'intérieur même de Bitcoin, mais avec un coût de développement très bas puisque les complexités du minage et du réseau sont déjà gérées par le protocole Bitcoin. Les metacoins ont été utilisés pour implémenter certains types de contrats financiers, d'enregistrements de nom et de bourses d'échange décentralisées.

Il existe donc généralement deux approches pour construire un protocole de consensus : développer un réseau indépendant, ou développer un protocole au-dessus de Bitcoin. La première approche, bien qu'elle soit raisonnablement efficace dans le cas d'applications comme Namecoin, est difficile à implémenter : chaque implémentation nécessite un bootstrap avec une chaîne indépendante, ainsi que la rédaction et le test de tout le code de transition d'état et de réseau. En outre, nous prévoyons que l'ensemble des applications de la technologie de consensus décentralisé suivra une distribution en loi de puissance, où la grande majorité des applications seront trop petites pour justifier leur propre blockchain, et nous notons qu'il existe de grandes classes d'applications décentralisées, en particulier des organisations autonomes décentralisées, qui ont besoin d'interagir les unes avec les autres.

L'approche fondée sur Bitcoin, en revanche, a l'inconvénient de ne pas hériter des fonctionnalités de vérification de paiement simplifiée (SPV) de Bitcoin. La SPV fonctionne pour Bitcoin car elle utilise la profondeur de la blockchain comme proxy de validation. À un certain point, quand on est remonté assez loin dans les ancêtres d'une transaction, on peut légitimement affirmer qu'ils font partie de l'état. D'un autre côté, les méta-protocoles fondés sur la blockchain ne peuvent pas forcer celle-ci à ne pas inclure les transactions qui ne sont pas valides dans le contexte de leurs propres protocoles. C'est pourquoi une implémentation entièrement sécurisée du méta-protocole de SPV devrait examiner l'intégralité de la blockchain Bitcoin jusqu'au début pour déterminer si certaines transactions sont valides ou non. Actuellement, toutes les implémentations "légères" des méta-protocoles fondés sur Bitcoin se fient à un serveur de confiance pour fournir les données. Un résultat à l'évidence insatisfaisant surtout lorsque le but premier d'une cryptomonnaie est d'éliminer le besoin de confiance.

### Langage de script {#scripting}

Même sans extension, le protocole Bitcoin permet d'obtenir une version "faible" du concept de contrats intelligents ("smart contracts"). Les UTXO Bitcoin peuvent non seulement être détenus par une clé publique, mais aussi par un script plus complexe exprimé dans un langage de programmation simple basé sur une pile. Dans ce paradigme, une transaction dépensant ces UTXO doit fournir les données qui satisfont le script. En effet, même le simple mécanisme de propriété d'une clé publique est implémenté via un script : celui-ci prend une signature à courbe elliptique en entrée, vérifie qu'il correspond à la transaction et à l'adresse propriétaire de l'UTXO, et renvoie 1 quand la vérification réussi ou 0 dans le cas contraire. D'autres scripts plus compliqués existent pour d'autres cas d'utilisation. Par exemple, on peut concevoir un script qui requiert les signatures de deux clés privées sur trois pour être validé ("multisig"), une configuration utile pour les comptes d'entreprise, les comptes d'épargne sécurisés ou certains cas de dépôts fiduciaires. Les scripts peuvent également être utilisés afin d'offrir des récompenses pour résoudre des problèmes de calculs mathématiques, et vous pouvez même en concevoir un qui déclarerait "cet UTXO Bitcoin est le vôtre si vous pouvez fournir une preuve de SPV que vous m'avez envoyé une transaction Dogecoin de telle valeur", ce qui permet la création d'une bourse d'échange entre différentes cryptomonnaies.

Le langage de script, tel qu'il est implémenté dans Bitcoin, a toutefois d'importantes limitations :

- **Défaut de langage Turing-complet** : bien que le langage de script de Bitcoin prenne en charge un large sous-ensemble de calculs, il est loin de tout prendre en charge. La principale catégorie manquante est celle des boucles. Cela évite les boucles infinies lors de la vérification d'une transaction. Théoriquement, c'est un obstacle surmontable pour les programmeurs de scripts, car toute boucle peut être simulée en répétant simplement plusieurs fois le code sous-jacent avec une instruction « if » (si), mais cela conduit à des scripts qui sont très volumineux. Par exemple, l'implémentation d'un algorithme de signature à courbe elliptique alternatif pourrait nécessiter 256 itérations de multiplications, chacune incluse individuellement dans le code.
- **Défaut de valeur** : un script UTXO n'a aucun moyen de contrôler précisemment le montant pouvant être retiré. Un cas d'utilisation très intéressant d'un contrat d'oracle serait un contrat de couverture dans lequel A et B investiraient 1000 $ de BTC. Au bout de 30 jours, le script enverrait 1000 $ de BTC à A et le reste à B. Un oracle serait nécessaire pour déterminer la valeur du BTC en USD, mais il s'agirait néanmoins d'une énorme amélioration en termes de confiance et d'infrastructure requise par rapport aux solutions totalement centralisées actuellement disponibles. Les UTXO étant toutefois en tout-ou-rien, la seule façon d'arriver à cela serait un bricolage très peu efficace où l'on disposerait de nombreux UTXO de diverses dénominations (c'est-à-dire un UTXO de 2<sup>k</sup> pour chaque k jusqu'à 30) et où l'oracle choisirait quel UTXO envoyer à A et lequel envoyer à B.
- **Manque d'état** : un UTXO peut être dépensé ou non. Il n'est pas possible d'avoir de scripts ni de contrats multi-étapes qui conserveraient un autre état interne au-delà de cela. Il est donc difficile de réaliser des contrats d'options multi-étapes, des offres d'échange décentralisées ou des protocoles d'engagement cryptographiques à deux étapes (nécessaires pour les primes de calcul sécurisées). Cela signifie que les UTXO ne peuvent être utilisés que pour construire des contrats simples à usage unique, et non des contrats dynamiques plus complexes comme les organisations décentralisées, ce qui rend aussi l'implémentation des méta-protocoles plus compliquée. L'état binaire combiné au défaut de valeur rend impossible une autre application importante : les limites de retrait.
- **Inaccessibilité de la blockchain** : les UTXO n'ont pas accès à certaines données de la blockchain, comme le nonce et le hachage du bloc précédent. Cela limite considérablement les applications de jeux d'argent, et plusieurs autres catégories, en privant le langage de script d'une source d'aléatoire potentiellement précieuse.

Nous discernons donc trois approches pour développer des applications avancées sur la base d'une cryptomonnaie : la construction d'une nouvelle blockchain, l'utilisation de scripts reposant sur Bitcoin et la construction d'un méta-protocole reposant sur Bitcoin. La création d'une nouvelle blockchain offre une liberté illimitée pour construire un éventail de fonctionnalités, mais nécessite d'importants efforts en termes de temps de développement, de mise en service et de sécurité. L'utilisation de scripts est simple à implémenter et à normaliser, mais est très limitée en terme de fonctionnalités, et les méta-protocoles, bien que simples, souffrent de défauts en matière d'évolutivité. Avec Ethereum, nous avons l'intention de construire un autre framework, qui offre des perspectives bien plus importantes tant au niveau de la simplicité de développement que de la puissance des clients légers, tout en permettant aux applications de partager un environnement économique bénéficiant de la sécurité de la blockchain.

## Ethereum {#ethereum}

L'objectif d'Ethereum est de créer un autre protocole pour développer des applications décentralisées, en offrant un ensemble différent de compromis qui sera, nous le pensons, très utile pour une large classe d'applications décentralisées. Il sera principalement axé sur les situations dans lesquelles le développement rapide, la sécurité des petites applications rarement utilisées et la possibilité pour les différentes applications d'interagir ensemble de façon très efficace sont importants. Ethereum parvient à cela en construisant ce qui constitue la couche fondamentale abstraite essentielle : une blockchain intégrant un langage de programmation Turing-complet, permettant à tous de rédiger des contrats intelligents et des applications décentralisées où l'on peut créer ses propres règles arbitraires de propriété, formats de transaction et fonctions de transition d'état. Une version dépouillée de Namecoin peut être rédigée en deux lignes de code, et d'autres protocoles comme les systèmes de réputation et de monnaies peuvent être développés en moins de vingt lignes. Les contrats intelligents, ces "boîtes" cryptographiques qui contiennent une valeur et ne se déverrouillent que si certaines conditions sont remplies, peuvent également être construits au-dessus de la plateforme, avec bien plus de puissance que celle du langage de script Bitcoin en raison des capacités supplémentaires offerte par la Turing-complétude, la visibilité des valeurs, de la blockchain, et l'état.

### Comptes Ethereum {#ethereum-accounts}

Dans Ethereum, l'état est composé d'objets appelés « comptes », chaque compte ayant une adresse de 20 octets et les transitions d'état étant des transferts directs de valeur et d'informations entre les comptes. Un compte Ethereum comporte quatre champs :

- Le **nonce**, un compteur utilisé pour s'assurer que chaque transaction ne peut être traitée qu'une seule fois
- Le **solde en ether** actuel du compte
- Le **code de contrat** du compte, s'il existe
- Le **stockage** du compte (vide par défaut)

L'« ether » est le principal cryptocarburant interne d'Ethereum. Il est utilisé pour payer les frais de transaction. D'une manière générale, il existe deux types de comptes : les **comptes externes**, contrôlés par des clés privées, et les **comptes de contrat**, contrôlés par leur code de contrat. Un compte externe n'a pas de code et il est possible d'envoyer des messages à partir de celui-ci en créant et en signant une transaction. Dans un compte de contrat, chaque fois que celui-ci reçoit un message, son code s'active, ce qui lui permet de lire et d'écrire dans la mémoire de stockage interne et, à son tour, d'envoyer d'autres messages ou de créer des contrats.

Notez que dans Ethereum, les « contrats » ne doivent pas être considérés comme quelque chose qui doit être « rempli » ni « respecté ». Il s'agit plutôt d'« agents autonomes », qui vivent à l'intérieur de l'environnement d'exécution Ethereum, exécutant toujours un morceau de code spécifique lorsqu'ils sont appelés par un message ou une transaction, et ayant un contrôle direct sur leur propre solde d'ether et leur propre magasin de clés/valeurs afin de garder une trace des variables persistantes.

### Messages et transactions {#messages-and-transactions}

Dans Ethereum, le terme « transaction » désigne le paquet de données signées qui stocke un message à envoyer depuis un compte externe. Les transactions contiennent :

- le destinataire du message ;
- une signature identifiant l'expéditeur ;
- le montant en ETH à transférer de l'expéditeur au destinataire ;
- un champ de données facultatif ;
- une valeur `STARTGAS`, qui représente le nombre maximum d'étapes de calcul autorisé pour exécuter la transaction ;
- une valeur `GASPRICE`, qui représente les frais que l'expéditeur paie pour chaque étape de calcul.

Les trois premiers champs sont des champs standards attendus dans toute cryptomonnaie. Le champ de données n'a pas de fonction par défaut, mais la machine virtuelle a un code d'opération qu'un contrat peut utiliser pour accéder aux données. Voilà un exemple de cas d'utilisation : si un contrat fonctionne comme un service d'enregistrement de domaine sur la blockchain, il voudra peut-être interpréter les données transférées comme contenant deux « champs », le premier étant un domaine à enregistrer, le second étant l'adresse IP à enregistrer. Le contrat lira ces valeurs à partir des données du message et les stockera de manière adéquate.

Les champs `STARTGAS` et `GASPRICE` sont essentiels au mécanisme anti-déni de service d'Ethereum. Afin d'éviter les boucles infinies accidentelles ou hostiles, ou d'autres gaspillages de calcul dans le code, il est nécessaire que chaque transaction limite le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le « gaz ». En général, une étape de calcul coûte 1 unité de gaz, mais certaines opérations coûtent plus cher, car elles sont plus gourmandes en calcul ou augmentent la quantité de données à stocker comme partie intégrante de l'état. Il existe aussi des frais de 5 unités de gaz pour chaque octet de données de transaction. Le but de ce système de frais est d'exiger d'un attaquant qu'il paie proportionnellement chaque ressource qu'il consomme, y compris le calcul, la bande passante et le stockage. Ainsi, toute transaction conduisant le réseau à consommer une plus grande quantité de l'une de ces ressources doit payer des frais de gaz à peu près proportionnels à cette augmentation.

### Messages {#messages}

Les contrats ont la capacité d'envoyer des "messages" à d'autres contrats. Les messages sont des objets virtuels qui ne sont jamais sérialisés et n'existent qu'au sein de l'environnement d'exécution d'Ethereum. Un message contient :

- l'expéditeur du message (implicite) ;
- le destinataire du message ;
- le montant en ETH à transférer avec le message ;
- un champ de données facultatif ;
- une valeur `STARTGAS`.

En substance, un message est comme une transaction, sauf qu'il est émis par un contrat et non par un acteur externe. Un message est émis lorsqu'un contrat en cours d'exécution utilise le code d'opération `CALL`, qui produit et exécute un message. Tout comme une transaction, un message provoque l'exécution du code du compte destinataire. Ainsi, les contrats peuvent interagir avec d'autres contrats exactement de la même façon que des acteur externes.

Notez que l'allocation de gaz assignée par une transaction ou un contrat concerne la totalité du gaz consommé par cette transaction et toutes les sous-exécutions. Par exemple, si un acteur externe A envoie une transaction à B avec 1 000 unités de gaz, que B consomme 600 unités de gaz avant d'envoyer un message à C, et que l’exécution interne de C consomme 300 unités de gaz avant le retour, B pourra encore consommer 100 unités de gaz avant d'être en panne sèche.

### Fonction de transition d'état Ethereum {#ethereum-state-transition-function}

![Transition d'état ETH](./ether-state-transition.png)

La fonction de transition d'état Ethereum `APPLY(S,TX) -> S'` peut être définie comme suit :

1. On vérifie que la transaction est bien formée (c.-à-d. qu'elle a le bon nombre de valeurs), que la signature est valide et que le nonce correspond à celui du compte de l'expéditeur. Sinon, une erreur est renvoyée.
2. On calcule les frais de transaction correspondant à `STARTGAS * GASPRICE`, et on détermine l'adresse d'envoi à partir de la signature. On déduit les frais du solde du compte de l'expéditeur et on incrémente son nonce. Si le solde est insuffisant, une erreur est renvoyée.
3. On initialise `GAS = STARTGAS`, et on enlève une certaine quantité de gaz par octet afin de payer pour les octets de la transaction.
4. On transfère la valeur de la transaction du compte de l'expéditeur vers celui du destinataire. Si le compte destinataire n'existe pas encore, on le crée. Si le compte destinataire est un contrat, on exécute le code du contrat, soit jusqu'à la fin, soit jusqu'à ce que l'exécution soit à court de gaz.
5. Si le transfert de valeur échoue parce que l'expéditeur n'a pas assez d'argent ou que l'exécution du code est en panne de gaz, on annule tous les changements d'état à l'exception du paiement des frais et on ajoute les frais au compte du mineur.
6. Sinon, on rembourse les frais correspondant au gaz restant à l'expéditeur, et on envoie les frais correspondant au gaz consommé au mineur.

Par exemple, imaginons que le code du contrat soit :

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Notez qu'en réalité, le code du contrat est écrit en code EVM de bas niveau. Pour plus de clarté, cet exemple est écrit en Serpent, un de nos langages de haut niveau qui peut être compilé en code EVM. Supposons que l'espace de stockage du contrat soit initialement vide et qu'une transaction soit émise avec un valeur de 10 ETH, 2 000 gaz à un prix unitaire de 0,001 ETH et 64 octets de données, avec les octets 0 à 31 représentant le nombre `2` et les octets 32 à 63 représentant la chaîne `CHARLIE`. Dans ce cas, le processus de la fonction de transition d'état est le suivant :

1. On vérifie que la transaction est valide et bien formée.
2. On vérifie que l'expéditeur de la transaction dispose d'au moins 2 000 \* 0,001 = 2 ETH. Si c'est le cas, on déduit 2 ETH de son compte.
3. On initialise gaz = 2 000. En supposant que la transaction fasse 170 octets de long et que le coût par octet soit 5 UC, on soustrait 850, de sorte qu'il reste 1 150.
4. On déduit 10 ETH supplémentaires du compte de l'expéditeur et on les ajoute à celui du contrat.
5. On exécute le code. Dans ce cas, c'est simple : il vérifie si l'index `2` de l'espace de stockage du contrat est utilisé, remarque qu'il ne l'est pas, puis définit l'espace de stockage à l'index `2` à la valeur `CHARLIE`. Supposons que cela consomme 187 unités de gaz, la quantité de gaz restante est alors de 1 150 - 187 = 963.
6. On rend 963 \* 0,001 = 0,963 ETH au compte de l'expéditeur, puis l'état résultant est renvoyé.

S'il n'existait aucun contrat à l'autre bout de la transaction, le total des frais de gaz seraient égal au `GASPRICE` fourni multiplié par la longueur de la transaction en octets, et les données envoyées avec la transaction ne seraient pas pertinentes.

Notez que les messages fonctionnent de la même façon que les transactions en terme d'invalidation : si l'exécution d'un message ne dispose pas d'assez de gaz, alors celle-ci, ainsi que toutes les autres exécutions qu'elle a déclenchées, reviennent à leur état initial, mais les exécutions parentes n'ont pas à être invalidées. Cela signifie qu'il est "sans danger" pour un contrat d'appeler un autre contrat, car si A appelle B avec le gaz G, alors l'exécution de A ne consommera jamais plus que le gaz G. Notez qu'il existe un code d'opération `CREATE`, qui crée un contrat. Son principe d'exécution est globalement similaire à `CALL`, excepté que le résultat de l'exécution détermine le code d'un contrat nouvellement créé.

### Exécution de code {#code-execution}

Dans les contrats Ethereum, le code est écrit dans un langage bytecode de bas niveau orienté pile, appelé « code de la machine virtuelle Ethereum » ou « code EVM ». Il se compose d'une série d'octets, où chaque octet représente une opération. En général, l'exécution de code est une boucle infinie qui consiste à répéter l'opération au compteur de programme actuel (qui commence à zéro), puis à incrémenter le compteur de un jusqu'à atteindre la fin du code ou une erreur, ou jusqu'à ce qu'une instruction `STOP` ou `RETURN` soit détectée. Les opérations ont accès à trois types d'espace pour stocker des données :

- La **pile** (stack), un conteneur dernier-arrivé-premier-sorti auquel on peut ajouter et extraire des valeurs.
- La **mémoire** (memory), un tableau d'octets extensible à l'infini.
- Le **stockage** (storage) à long terme du contrat, un magasin de clés/valeurs. Contrairement à la pile et à la mémoire, qui sont réinitialisées après la fin du calcul, le stockage est conservé sur le long terme.

Le code peut aussi accéder à la valeur, à l'expéditeur et aux données du message reçu, ainsi qu'aux données d'en-tête du bloc. Il peut également renvoyer des données sous forme d'un tableau d'octets en sortie.

Le modèle d'exécution officiel du code EVM est étonnamment simple. Lorsque la machine virtuelle Ethereum est en cours d'exécution, son état de calcul complet peut être défini par le tuple `(block_state, transaction, message, code, memory, stack, pc, gaz)`, où `block_state` est l'état global contenant tous les comptes, et comprend les soldes et le stockage. Au début de chaque cycle d'exécution, l'instruction courante est trouvée en prenant le `pc`ième octet du `code` (ou 0 si `pc >= len(code)`), et chaque instruction a sa propre définition quant à son impact sur le tuple. Par exemple, `ADD` extrait deux éléments de la pile et insère leur somme, réduit `gaz` de 1 et augmente `pc` de 1, tandis que `SSTORE` extrait les deux éléments supérieurs de la pile et insère le deuxième élément dans l'espace de stockage du contrat à l'index spécifié par le premier élément. Bien qu'il existe de nombreuses façons d'optimiser l'exécution de la machine virtuelle Ethereum via la compilation à la volée, une implémentation de base d'Ethereum peut être réalisée en quelques centaines de lignes de code.

### Blockchain et minage {#blockchain-and-mining}

![Diagramme des blocs APPLY Ethereum](./ethereum-apply-block-diagram.png)

À bien des égards, la blockchain Ethereum est similaire à la blockchain Bitcoin, bien qu'elle présente certaines différences. Concernant l'architecture de la blockchain, la principale différence entre Ethereum et Bitcoin est que, contrairement à Bitcoin, les blocs d'Ethereum contiennent à la fois une copie de la liste des transactions et de l'état le plus récent. De plus, deux autres valeurs sont aussi stockés dans le bloc : le numéro de bloc et la difficulté. Dans Ethereum, l’algorithme de base de validation d'un bloc est le suivant :

1. On vérifie que le précédent bloc référencé existe et est valide.
2. On vérifie que l'horodatage du bloc est supérieur à celui du précédent bloc référencé et qu'il n'excède pas 15 minutes dans l'avenir.
3. On vérifie que le numéro de bloc, la difficulté, la racine de transaction, la racine oncle et la limite de gaz (plusieurs concepts de bas niveau spécifiques à Ethereum) sont valides.
4. On vérifie que la preuve de travail du bloc est valide.
5. `S[0]` doit être l'état à la fin du bloc précédent.
6. `TX` doit être la liste des transactions du bloc, et `n` les transactions. Pour tout `i` dans `0...n-1`, on définit `S[i+1] = APPLY(S[i],TX[i])`. Si une application renvoie une erreur, ou si la totalité du gaz consommé jusqu'à ce point du bloc dépasse la `GASLIMIT`, une erreur est renvoyée.
7. `S_FINAL` doit être égal à `S[n]`, mais en ajoutant la récompense de bloc versée au mineur.
8. On vérifie que la racine de l'arbre de Merkle de l'état `S_FINAL` est égale à la racine de l'état final fournie dans l'en-tête de bloc. Si c'est le cas, le bloc est valide. Sinon, il ne l'est pas.

L'approche peut sembler très inefficace à première vue, car elle nécessite de stocker l'état complet avec chaque bloc, mais en réalité, l'efficacité devrait être comparable à celle de Bitcoin. Cela vient du fait que l'état est stocké dans une structure en arbre, et qu'après chaque bloc, seule une petite partie de l'arbre doit être modifiée. En général, la grande majorité de l'arbre devrait donc être identique entre deux blocs adjacents. Les données peuvent ainsi être stockées une fois et référencées deux fois en utilisant des pointeurs (c.-à.-d. les hachages des sous-arbres). Un type particulier d'arbre, l'« arbre Patricia » est utilisé pour cela. Il s'agit d'un dérivé du concept d'arbre de Merkle qui permet d'insérer et de supprimer efficacement des nœuds, et pas seulement de les modifier. Par ailleurs, comme toutes les informations d'état font partie du dernier bloc, il n'est pas nécessaire de stocker tout l'historique de la blockchain. Cette stratégie, si elle pouvait être appliquée à Bitcoin, réduirait les besoins de stockage de 5 à 20 fois.

La question de savoir où le code d'un contrat est exécuté, en termes de matériel physique, est souvent posée. La réponse est simple : le processus d'exécution du code d'un contrat fait partie de la définition de la fonction de transition d'état, qui fait partie de l'algorithme de validation des blocs. Donc quand une transaction est ajoutée au bloc `B`, l'exécution de code engendrée par cette transaction est exécutée par tous les nœuds, actuels et futurs, qui téléchargent et valident le bloc `B`.

## Applications {#applications}

En général, il existe trois types d'applications sur Ethereum. La première catégorie est celle des applications financières, qui fournissent aux utilisateurs des moyens plus puissants de gérer et conclure des contrats en utilisant leur argent. Elle inclut les sous-monnaies, les produits financiers dérivés, les contrats de couverture, les portefeuilles d'épargne, les testaments, et même certaines catégories de contrats de travail. La deuxième catégorie est celle des applications semi-financières, où de l'argent entre en jeu, mais où il existe aussi un important aspect non monétaire. Un exemple parfait est celui des primes auto-appliquées pour des solutions à des problèmes de calcul. Enfin, il existe des applications comme le vote en ligne et la gouvernance décentralisée, qui n'ont aucun aspect financier.

### Systèmes de jetons {#token-systems}

Les systèmes de jetons (tokens) sur une blockchain ont de nombreuses applications allant des sous-monnaies représentant des actifs (comme les dollars US ou l'or) aux actions d'entreprise, en passant par les jetons individuels représentant des titres de propriété ou des coupons sécurisés infalsifiables, ou encore les jetons sans aucune valeur conventionnelle, utilisés comme mesures d'incitation sous la forme de points. Les systèmes de jetons sont étonnamment faciles à implémenter dans Ethereum. Le point essentiel à bien comprendre est que toute monnaie ou tout système de jetons est essentiellement une base de données proposant une seule opération : prendre X unités de A pour les donner à B, à condition que (1) A dispose d'au moins X unités avant la transaction et (2) que la transaction soit approuvée par A. Il suffit donc d'implémenter cette logique dans un contrat pour implémenter un système de jetons.

Le code de base d'une telle implémentation en Serpent ressemble à ceci :

```py
def send(to, value):
    if self.storage[msg.sender] >= value:
        self.storage[msg.sender] = self.storage[msg.sender] - value
        self.storage[to] = self.storage[to] + value
```

Il s'agit fondamentalement d'une implémentation littérale de la fonction de transition d'état de « système bancaire » décrite précédemment dans ce document. Quelques lignes de code supplémentaires sont nécessaires pour spécifier l'étape initiale de distribution des unités monétaires et quelques autres cas particuliers, et idéalement une fonction sera ajoutée pour permettre à d'autres contrats d'obtenir le solde d'une adresse. C'est tout ce qu'il y a à faire ! En théorie, les systèmes de jetons basés sur Ethereum fonctionnant comme des sous-monnaies peuvent potentiellement présenter une autre caractéristique importante qui manque aux méta-monnaies implémentées sur la blockchain Bitcoin : la capacité de payer les frais de transaction directement dans cette monnaie. Pour mettre cela en œuvre, le contrat gère un solde en ETH grâce auquel il rembourse l'expéditeur du montant en ETH utilisé pour payer les frais, et rééquilibre son solde en collectant les unités monétaires internes qu'il prend en frais pour les revendre dans une vente aux enchères permanente. Les utilisateurs ont donc besoin « d'activer » leurs comptes avec de l'ether (ETH), mais une fois cela fait, ils peuvent réutiliser cette somme puisqu'elle est à chaque fois remboursée par le contrat.

### Produits financiers dérivés et monnaies à valeur stable {#financial-derivatives-and-stable-value-currencies}

Les produits financiers dérivés sont l'application la plus courante d'un « contrat intelligent » et l'une des plus simples à implémenter en programmation. La principale difficulté dans l'implémentation de contrats financiers est qu'ils nécessitent pour la plupart une référence à une cotation externe. Un contrat intelligent de couverture contre la volatilité de l'ETH (ou de toute autre cryptomonnaie) par rapport au dollar US serait, par exemple, une application très intéressante, mais cela impliquerait que le contrat connaisse le taux de change ETH/USD. Pour ce faire, la méthode la plus simple serait d'utiliser un contrat de « flux de données » géré par une entité définie (par ex., le NASDAQ) et conçu pour que cette entité puisse le mettre à jour quand cela est nécessaire, et qui fournirait une interface permettant à d'autres contrats de lui envoyer un message afin d'obtenir une réponse donnant le taux de change.

Avec cet élément essentiel, le contrat de couverture ressemblerait à ceci :

1. On attend que le tiers A fournisse 1 000 ETH.
2. On attend que le tiers B fournisse 1 000 ETH.
3. On enregistre la valeur en USD de 1 000 ETH dans l'espace de stockage du contrat, valeur calculée en interrogeant le contrat de flux de données. Appelons cette valeur $x.
4. Après 30 jours, on autorise A ou B à « réactiver » le contrat afin d'envoyer l'équivalent de $x en ETH (calculé en interrogeant de nouveau le contrat de flux de données afin d'obtenir le nouveau taux) à A et le reste à B.

Ce type de contrat représenterait un beau potentiel dans le monde du cryptocommerce. Un des principaux problèmes souvent mentionné sur les cryptomonnaies, c'est leur volatilité : même si bon nombre d'utilisateurs et commerçants sont intéressés par la fiabilité et la facilité d'utilisation des actifs cryptographiques, il ne souhaitent pas risquer de perdre 23 % de leurs fonds en une seule journée. Jusqu'à présent, la solution la plus souvent proposée était d'avoir des actifs adossés à un émetteur. L'idée est qu'un émetteur crée une sous-monnaie, dans laquelle il a le droit d'émettre et de révoquer des unités, et en fournit une unité à toute personne lui procurant (hors-ligne) une unité d'un actif sous-jacent donné (par ex., l'or, le dollar US). L'émetteur promet ensuite de fournir une unité de l'actif sous-jacent à toute personne qui lui envoie une unité du crypto-actif. Ce mécanisme permet à n'importe quel actif non cryptographique d'être « transformé » en crypto-actif, si l'on peut faire confiance à l'émetteur.

Dans la pratique, néanmoins, les émetteurs ne sont pas toujours fiables, et dans certains cas l'infrastructure bancaire est trop fragile, ou trop hostile, pour permettre l'existence de tels services. Les produits financiers dérivés constituent une alternative. Ici, au lieu d'un unique émetteur fournissant les fonds pour adosser un actif, c'est un marché décentralisé de spéculateurs pariant sur la hausse du prix d'un crypto-actif de référence (par exemple l'ETH), qui remplit ce rôle. Contrairement aux émetteurs, les spéculateurs ne peuvent pas faire défaut, car le contrat de couverture conserve leurs fonds sous forme de dépôt fiduciaire. Notez que cette approche n'est pas totalement décentralisée, car une source de confiance est toujours nécessaire pour fournir le téléscripteur bien que l'amélioration soit massive en termes de réduction des besoins d'infrastructure (contrairement à un émetteur, la publication d'un taux de change ne nécessite aucun permis et peut être considérée comme de la liberté de parole) et des possibilités de fraude.

### Systèmes d'identité et de réputation {#identity-and-reputation-systems}

La toute première cryptomonnaie alternative, [Namecoin](http://namecoin.org/), a tenté d'utiliser une blockchain similaire à celle de Bitcoin pour fournir un système d'enregistrement de noms, dans lequel les utilisateurs pouvaient enregistrer leurs noms dans une base de données publique avec d'autres données. C'est dans le cadre d'un système [DNS](https://wikipedia.org/wiki/Domain_Name_System), qui associe des noms de domaine comme "bitcoin.org" (ou pour Namecoin, "bitcoin.bit") à une adresse IP, qu'elle est principalement utilisée. D'autres utilisations incluent l’authentification d'e-mails, et potentiellement des systèmes de réputation plus perfectionnés. Voilà un contrat élémentaire permettant de fournir un système d'enregistrement de noms similaire à celui de Namecoin sur Ethereum :

```py
def register(name, value):
    if !self.storage[name]:
        self.storage[name] = value
```

Le contrat est très simple, il s’agit simplement d’une base de données au sein du réseau Ethereum qui peut être ajoutée, mais non modifiée ou supprimée. N'importe qui peut enregistrer un nom et une valeur, et cet enregistrement est inscrit pour toujours. Un contrat d’enregistrement de nom plus sophistiqué aura une « clause fonction » permettant à d'autres contrats de l'interroger, ainsi qu'un mécanisme autorisant le « propriétaire » (le premier déposant) d'un nom à en changer les données ou à en transférer la propriété. On peut même ajouter à cela une fonctionnalité de réputation et de réseau de confiance.

### Stockage décentralisé de fichiers {#decentralized-file-storage}

Ces dernières années, plusieurs startups ont été créées dans le secteur du stockage de fichiers en ligne (la plus importante étant Dropbox). Dans le cadre d'un abonnement mensuel payant, elles proposent aux utilisateurs de stocker une copie de sauvegarde de leur disque dur, à laquelle ils peuvent accéder à leur convenance. Toutefois, le marché du stockage de fichiers en ligne reste à ce jour relativement inefficace. Un rapide survol des solutions existantes montre que dans la fourchette de 20 à 200 Go, où il n'existe ni offre gratuite ni offre professionnelle avec remises, le prix mensuel du stockage est supérieur à celui du disque dur lui-même. Les contrats Ethereum permettent le développement d'un écosystème de stockage de fichiers décentralisé, où chaque utilisateur peut recevoir de petites sommes d'argent en louant ses propres disques durs, l'espace inutilisé contribuant à réduire davantage le coût du stockage des fichiers.

La clé de voûte d'un tel système est ce que nous avons appelé le « contrat Dropbox décentralisé ». Ce contrat fonctionne de la façon suivante. Dans un premier temps, les données choisies sont divisées en blocs qui servent à construire un arbre de Merkle, chaque bloc étant chiffré pour assurer la confidentialité. Un contrat est ensuite créé avec une règle stipulant que tous les N blocs, le contrat choisira un index aléatoire de l'arbre de Merkle (en utilisant le hachage du bloc précédent, accessible depuis le code du contrat, comme source aléatoire) et donnera X ETH à la première entité qui fournira une transaction avec une preuve de propriété simplifiée similaire à une vérification du paiement du bloc situé à cet index spécifique dans l'arbre de Merkle. Lorsqu'un utilisateur souhaite télécharger de nouveau un fichier, il peut utiliser un protocole de canal de micropaiement (par ex., payer 1 zsabo par 32 kilo-octets) pour récupérer le fichier. En termes de frais, l'approche la plus efficace consiste pour le payeur à ne pas publier la transaction avant la fin, en la remplaçant plutôt par une autre, plus lucrative, avec le même nonce après chaque 32 kilo-octets.

Une fonctionnalité importante du protocole est que, bien qu'on ait l'impression de faire confiance à plusieurs nœuds aléatoires pour ne pas perdre le fichier, on peut quasiment supprimer ce risque en divisant le fichier en plusieurs parties par partage secret et en surveillant les contrats pour vérifier que chaque partie est toujours présente sur un nœud. Si un contrat émet toujours des paiements, cela apporte la preuve cryptographique que quelqu'un stocke toujours le fichier.

### Organisations autonomes décentralisées {#decentralized-autonomous-organizations}

Le concept général d'une « organisation autonome décentralisée » (DAO) est celui d'une entité virtuelle avec un certain nombre de membres ou d'actionnaires qui, peut-être à une majorité de 67 %, ont le droit de dépenser ses fonds et de modifier son code. Les membres vont collectivement décider de la façon dont les fonds doivent être alloués par l'organisation. Les méthodes pour allouer les fonds d'une DAO peuvent aller des primes aux salaires en passant par un mécanisme plus original, comme une monnaie interne, pour récompenser le travail. Ceci reproduit essentiellement les attributs juridiques d'une entreprise traditionnelle ou d'une association à but non lucratif, mais en utilisant uniquement la technologie cryptographique de la blockchain. Jusqu'à présent, une grande partie des discussions concernant les DAO tournait autour du modèle « capitaliste » d'une « société autonome décentralisée » (DAC), avec des actionnaires bénéficiaires de dividendes et des actions négociables. Une alternative, décrite comme une « communauté autonome décentralisée », attribuerait à tous les membres une part égale dans la prise de décision et exigerait un consensus de 67 % des membres pour ajouter ou supprimer un membre. L'exigence selon laquelle une personne ne peut avoir qu'une seule adhésion doit alors être appliquée collectivement par le groupe.

Une description générale de la façon de coder une DAO est fournie ci-après. La conception la plus simple est tout simplement un morceau de code qui se modifie lui-même et qui ne change que si les deux tiers des membres acceptent la modification. Bien que le code soit théoriquement immuable, on peut facilement contourner ceci et avoir une mutabilité de fait en disposant les morceaux de code dans des contrats séparés, et en stockant l'adresse des contrats à appeler dans un stockage modifiable. Dans une implémentation simple d'un tel contrat DAO, il y aurait donc trois types de transactions, identifiables par les données fournies dans la transaction :

- `[0,i,K,V]` pour enregistrer une proposition avec l'index `i` pour changer l'adresse à l'index de stockage `K` à la valeur `V`
- `[1,i]` pour enregistrer un vote en faveur de la proposition `i`
- `[2,i]` pour finaliser la proposition `i` si suffisamment de votes ont été enregistrés

Le contrat aurait alors des clauses pour chacun de ces types. Il conserverait un enregistrement de toutes les modifications de stockage ouvertes, ainsi qu'une liste de ceux qui ont voté pour. Il inclurait également une liste de tous les membres. Quand une modification de stockage atteint deux tiers de votes « pour » de la part des membres, une transaction de finalisation peut exécuter la modification. Un modèle plus sophistiqué aurait également une fonctionnalité de vote intégrée pour envoyer une transaction, ajouter ou retirer des membres, voire pour permettre une sorte de [démocratie délégative](https://wikipedia.org/wiki/Liquid_democracy)de vote (c.-à-d. que n'importe qui pourrait déléguer à quelqu'un son droit de vote, et l'affectation étant transitoire, si A assigne B et B assigne C, alors C détermine le vote de A). Cette conception permettrait à la DAO de se développer organiquement en tant que communauté décentralisée, permettant éventuellement aux membres de déléguer la tâche de filtrage des membres à des spécialistes, bien que, contrairement au « système actuel », les spécialistes puissent facilement apparaître et disparaître au fil du temps, à mesure que les membres individuels de la communauté changent d'orientation.

L'entreprise décentralisée constitue un autre modèle, où n'importe quel compte peut avoir zéro ou plus d'actions, et où deux tiers des actions sont requises pour prendre une décision. Un modèle complet impliquerait une fonctionnalité de gestion d'actifs, la possibilité de faire une offre pour acheter ou vendre des actions, et la possibilité d'accepter les offres (de préférence avec un mécanisme de correspondance d'ordres à l'intérieur du contrat). Une délégation existerait également, à la manière d'une démocratie délégative, généralisant le concept de « conseil d'administration ».

### Autres applications {#further-applications}

**1. Portefeuilles d'épargne**. Imaginons qu'Alice souhaite conserver ses fonds en sécurité, mais craigne de perdre ou de se faire pirater sa clé privée. Elle place des ETH dans un contrat avec Marc, une banque, comme suit :

- Alice seule ne peut retirer au maximum que 1 % des fonds chaque jour.
- Marc seul ne peut retirer au maximum que 1% des fonds chaque jour, mais Alice a la possibilité de créer une transaction avec sa clé pour bloquer cette capacité.
- Alice et Marc peuvent conjointement retirer n'importe quelle somme.

En principe, 1 % par jour suffit à Alice, mais si elle souhaite retirer davantage, elle peut demander de l'aide à Marc. Si la clé d'Alice est piratée, elle prévient Marc pour déplacer les fonds vers un nouveau contrat. Si elle perd sa clé, Marc finira par sortir les fonds du contrat. Si Marc s'avère être malveillant, Alice peut décider de révoquer son droit de retrait.

**2. Assurance récolte**. On peut facilement créer un contrat de produits financiers dérivés en utilisant un flux de données météo au lieu d'un indice de prix. Si un agriculteur normand achète un produit financier dérivé dont les paiements sont inversement proportionnels aux précipitations enregistrées en Normandie et qu'une sécheresse se produit, l'agriculteur recevra automatiquement de l'argent. S'il pleut suffisamment, l'agriculteur sera satisfait, car ses cultures se porteront bien. Cela peut être étendu aux assurances contre les catastrophes naturelles en général.

**3. Flux de données décentralisé**. À la différence, pour les contrats financiers, il est possible de décentraliser le flux de données via un protocole appelé [SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin fonctionne de la façon suivante : N parties insèrent dans le système la valeur d'une donnée spécifique (par ex., le taux ETH/USD). Les valeurs sont triées et les sources de toutes les données comprises entre le 25ème et le 75ème centile reçoivent un jeton en récompense. Chacun a intérêt à donner la même réponse que tout le monde, et la seule valeur sur laquelle de nombreux acteurs peuvent être d'accord est celle évidente par défaut : la vraie valeur. Ceci crée un protocole décentralisé qui peut théoriquement fournir un certain nombre de valeurs, y compris le taux ETH/USD, la température à Berlin ou même le résultat d'un calcul particulier complexe.

**4. Dépôt fiduciaire multisignature intelligent**. Bitcoin permet des contrats de transactions multisignatures où, par exemple, trois des cinq clés données peuvent dépenser les fonds. Ethereum permet une plus grande granularité. Par exemple, 4 personnes sur 5 peuvent tout dépenser, 3 personnes sur 5 peuvent dépenser jusqu'à 10 % par jour et 2 personnes sur 5 peuvent dépenser jusqu'à 0,5 % par jour. En outre, la multisignature Ethereum est asynchrone : deux parties peuvent enregistrer leurs signatures sur la blockchain à différents moments, et la dernière signature enverra automatiquement la transaction.

**5. Informatique dans le cloud**. La technologie de l'EVM peut également être utilisée pour créer un environnement informatique vérifiable, permettant aux utilisateurs de demander à d'autres d'effectuer des calculs, puis éventuellement de réclamer des preuves que les calculs ont été effectués correctement à certains points de contrôle choisis au hasard. Ceci permet de créer une informatique dans le cloud, où n'importe quel utilisateur peut participer avec son ordinateur de bureau, portable ou serveur spécialisé, et où un contrôle ponctuel, associé à des dépôts de garantie, permet de garantir que le système est digne de confiance (c'est-à-dire que les nœuds ne peuvent pas tricher de façon rentable). Toutefois, un tel système ne convient pas à toutes les tâches. Par exemple, celles nécessitant un niveau de communication interprocessus élevé ne peuvent pas être effectuées facilement dans un cloud comportant de nombreux nœuds. Toutefois, d'autres tâches sont beaucoup plus faciles à paralléliser. Des projets comme SETI@home, folding@home et les algorithmes génétiques peuvent facilement être implémentés sur une telle plateforme.

**6. Jeux d'argent et de hasard P2P**. Un certain nombre de protocoles de jeux d'argent et de hasard P2P, comme celui de [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano et Richard Clayton, peuvent être implémentés sur la blockchain Ethereum. Le protocole le plus simple est en fait juste un contrat sur la différence du prochain hachage de bloc, et des protocoles plus avancés peuvent être construits à partir de là, créant des services de jeu d'argent et de hasard avec des frais proches de zéro, où il n'existe aucune possibilité de tricher.

**7. Marchés prédictifs**. Avec un oracle ou SchellingCoin, les marchés prédictifs sont aussi faciles à implémenter. Avec SchellingCoin, ceux-ci pourraient devenir la première application grand public d'une "[futarchie](http://hanson.gmu.edu/futarchy.html)" comme protocole de gouvernance des organisations décentralisées.

**8. Places de marché décentralisées sur la blockchain**, utilisant un système d'identité et de réputation comme base.

## Généralités et préoccupations {#miscellanea-and-concerns}

### Implémentation modifiée de GHOST {#modified-ghost-implementation}

Le protocole « Greedy Heaviest Observed Subtree » (GHOST) est une innovation introduite par Yonatan Sompolinsky et Aviv Zohar en [décembre 2013](https://eprint.iacr.org/2013/881.pdf). La naissance de GHOST résulte du fait que les blockchains avec des temps de confirmation rapides souffrent d'une faible sécurité en raison d'un taux élevé de blocs caducs. Un certain temps étant nécessaire pour que les blocs se propagent à travers le réseau, si un mineur A mine un bloc et qu'un mineur B parvient à miner un autre bloc avant que le bloc du mineur A ne soit propagé à B, le bloc du mineur B est perdu et ne contribue pas à la sécurité du réseau. Par ailleurs, il existe un problème de centralisation : si le mineur A est un groupe de minage disposant de 30 % de la puissance de hachage du réseau (hashpower) et que B n'en a que 10 %, A risque de produire un bloc caduc 70 % du temps (puisque les autres 30 % du temps, A produit le dernier bloc et obtient donc immédiatement les données de minage). B risque de son côté de produire un bloc caduc 90 % du temps. Ainsi, si l'intervalle entre les blocs est assez court pour que le taux de blocs caducs soit élevé, A sera nettement plus efficace simplement en raison de sa taille. Ces deux effets combinés font que les blockchains produisant rapidement des blocs sont particulièrement susceptibles de générer un groupe de minage bénéficiant d'un pourcentage assez large de la puissance de hachage du réseau. Celui-ci aura alors, de fait, le contrôle du processus de minage.

Comme l'ont décrit Sompolinsky et Zohar, GHOST résout le premier problème de perte de sécurité du réseau en incluant les blocs caducs dans le calcul de la longueur de la chaîne. C'est-à-dire que non seulement le parent et les ancêtres d'un bloc, mais aussi les descendants caducs de l'ancêtre du bloc (dans le jargon Ethereum, les « oncles ») sont ajoutés au calcul permettant d'établir quel bloc a le plus grand nombre cumulé de preuves de travail. Pour résoudre le second problème, celui de la centralisation, il faut dépasser le protocole décrit par Sompolinsky et Zohar, et donner une récompense aux blocs caducs : un bloc caduc reçoit 87,5 % de sa récompense de base, et le neveu qui inclut le bloc caduc reçoit les 12,5 % restants. Les frais de transaction, quant à eux, ne sont pas distribués aux oncles.

Ethereum implémente une version simplifiée de GHOST qui ne descend que sur sept niveaux. Plus spécifiquement, elle est définie comme suit :

- Un block doit spécifier un parent et 0 oncle ou plus.
- Un oncle inclus dans un block B doit posséder les propriétés suivantes :
  - Il doit être un enfant direct de l'ancêtre de k-ième génération de B, où `2 <= k <= 7`.
  - Il ne peut pas être un ancêtre de B.
  - Un oncle doit être un en-tête de bloc valide, mais il n'est pas nécessaire qu'il soit un bloc précédemment vérifié ni même valide.
  - Un oncle doit être différent de tous les oncles inclus dans les blocs précédents et de tous les autres oncles inclus dans le même bloc (inclusion non double).
- Pour chaque oncle U dans le bloc B, le mineur de B obtient 3,125 % supplémentaires ajoutés à sa récompense coinbase et le mineur de `U` obtient 93,75 % d'une récompense standard coinbase.

Cette version limitée de GHOST, dont les oncles ne peuvent être inclus que jusqu'à 7 générations, a été utilisée pour deux raisons. Tout d'abord, une version illimitée de GHOST entraînerait trop de complications dans le calcul des oncles valides pour un bloc donné. Deuxièmement, une version illimitée de GHOST avec compensation tel qu'utilisée dans Ethereum supprime l'intérêt pour un mineur de miner sur la chaîne principale et non la chaîne d'un attaquant public.

### Frais {#fees}

Étant donné que chaque transaction publiée dans la blockchain impose au réseau son téléchargement à des fins de vérification, un mécanisme de régulation est nécessaire afin de prévenir tout abus, ce qui implique généralement des frais de transaction. Sur Bitcoin, l'approche par défaut consiste à avoir des frais de transactions volontaires, en s'appuyant sur les mineurs pour jouer le rôle de gardiens et implémenter des minimums variables. Cette approche a été reçue très favorablement par la communauté Bitcoin, car elle est basée sur le marché, et permet de déterminer le juste prix par rapport à l'offre et à la demande entre mineurs et expéditeurs de transactions. Ce raisonnement comporte néanmoins un problème : le traitement d'une transaction n'est pas un marché. Bien qu'il soit tentant de considérer la transaction comme un service rendu à l'expéditeur par le mineur, en réalité chaque transaction incluse par un mineur doit être traitée par tous les nœuds du réseau. La majorité du coût de traitement d'une transaction est donc prise en charge par des tiers et pas par le mineur qui décide ou non d'inclure la transaction. C'est pourquoi des problèmes de type « tragédie des biens communs » sont susceptibles de se produire.

Il s'avère cependant que lorsqu'on lui donne une hypothèse simplificatrice inexacte particulière, cette faille du mécanisme de marché s'annule comme par magie. L'argument est le suivant. Dans ce scénario imaginaire :

1. Une transaction donne lieu à des `k` opérations, offrant la récompense `kR` à tout mineur qui l'inclut, où `R` est fixé par l'expéditeur et `k` et `R` sont (approximativement) visibles par le mineur au préalable.
2. Une opération a un coût de traitement `C` pour n'importe quel nœud (c.-à-d. que tous les nœuds ont la même efficacité).
3. Il existe `N` nœuds de minage, chacun ayant exactement la même puissance de traitement (c.-à-d. `1/N` du total).
4. Il n'existe aucun nœud complet non minier.

Un mineur sera prêt à traiter une transaction si la récompense attendue est supérieure au coût. La récompense attendue est donc `kR/N` puisque le mineur a `1/N` chance de traiter le bloc suivant, et le coût de traitement pour le mineur est simplement `kC`. Par conséquent, les mineurs incluront les transactions où `kR/N > kC`, ou `R > NC`. Notez que `R` représente les frais par opération fournis par l'expéditeur, et constitue donc une limite inférieure sur le bénéfice qu'il tire de la transaction, et `NC` est le coût du traitement d'une opération pour l'ensemble du réseau. Les mineurs sont donc incités à n'inclure que les transactions pour lesquelles le bénéfice utilitaire total dépasse le coût.

Il existe cependant plusieurs écarts importants par rapport à ces hypothèses dans la réalité :

1. Le mineur paie un coût plus élevé que les autres nœuds de vérification pour traiter la transaction, car le temps de vérification supplémentaire retarde la propagation du bloc et augmente le risque que le bloc devienne caduc.
2. Il existe des nœuds complets non miniers.
3. La répartition de la puissance de minage peut se révéler radicalement inégalitaire dans la pratique.
4. Les spéculateurs, les ennemis politiques et les fous dont la fonction utilitaire inclut de causer du tort au réseau existent, et ils peuvent habilement configurer des contrats où leur coût est bien inférieur au coût payé par les autres nœuds de vérification.

(1) génère une tendance où le mineur inclut moins de transactions, et (2) augmente le `NC` ; par conséquent, ces deux effets s'annulent au moins partiellement. <sup>[Comment ?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup>. Les points (3) et (4) constituent les problèmes majeurs. Pour les résoudre, nous instituons simplement un plafond flottant : aucun bloc ne peut avoir plus d'opérations que `BLK_LIMIT_FACTOR` fois la moyenne exponentielle variable à long terme. Spécifiquement :

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` et `EMA_FACTOR` sont des constantes qui seront définies à 65 536 et 1,5 pour le moment, mais qui seront probablement modifiées après une analyse approfondie.

Il existe un autre facteur qui dissuade les mineurs d'ajouter des blocs de grande taille dans Bitcoin : cela prend plus de temps de les propager et le risque qu'ils deviennent caducs est plus élevé. Dans Ethereum, les blocs consommant beaucoup de gaz peuvent également prendre plus de temps à se propager, à la fois car ils sont physiquement plus grands, mais aussi car ils requièrent plus de temps pour traiter les transitions d'état des transactions à valider. L'effet dissuasif associé aux délais est un facteur important chez Bitcoin, mais moindre chez Ethereum en raison du protocole GHOST, le recours à des limites de blocs réglementées offrant une base de référence plus stable.

### Calcul et Turing-complétude {#computation-and-turing-completeness}

Il est important de noter que la machine virtuelle Ethereum est Turing-complète, ce qui signifie que le code de l'EVM peut coder tout calcul pouvant être effectué, y compris les boucles infinies. Le code EVM permet la création de boucles de deux façons. Il y a d'abord l'instruction `JUMP` qui permet au programme de revenir à un endroit précédent du code, puis l'instruction `JUMPI` qui permet de faire des sauts conditionnels, ce qui permet des déclarations comme `while x < 27: x = x * 2`. Ensuite, les contrats peuvent appeler d'autres contrats, ce qui permet potentiellement de créer des boucles par récursion. Cela conduit naturellement à la question suivante : les utilisateurs malveillants peuvent-ils arrêter les mineurs et les nœuds complets en les forçant à entrer dans une boucle infinie ? Cette question se pose en raison d'un problème informatique connu sous le nom de « problème de l'arrêt » : il n'existe généralement aucun moyen de savoir si un programme donné s'arrêtera un jour ou non.

Comme décrit dans la section sur la transition d'état, notre solution fonctionne en demandant à une transaction de fixer le nombre maximum d'étapes de calcul qu'elle est autorisée à effectuer. Si l'exécution prend plus de temps, le calcul est annulé, mais les frais sont néanmoins payés. Les messages fonctionnent de la même façon. Pour montrer la motivation derrière notre solution, considérons les exemples suivants :

- Un attaquant crée un contrat qui exécute une boucle infinie, puis envoie une transaction activant cette boucle au mineur. Le mineur traitera la transaction en exécutant la boucle infinie et attendra qu'elle soit à court de gaz. Même si l'exécution tombe en panne sèche et s'arrête à mi-chemin, la transaction reste valide et le mineur continue à réclamer les frais à l'attaquant pour chaque étape de calcul.
- Un attaquant crée une très longue boucle infinie dans l'intention de forcer le mineur à continuer de calculer pendant un temps si long qu'au moment où le calcul se terminera, quelques blocs supplémentaires seront sortis et il sera impossible pour le mineur d'inclure la transaction pour réclamer les frais. L'attaquant devra cependant soumettre une valeur pour `STARTGAS` limitant le nombre d'étapes de calcul que l'exécution peut effectuer, de sorte que le mineur saura à l'avance que le calcul prendra un nombre d'étapes excessif.
- Un attaquant voit un contrat avec un code de type `send(A,contract.storage[A]); contract.storage[A] = 0` et envoie une transaction avec juste assez de gaz pour exécuter la première étape, mais pas la seconde (c.-à-d. effectuer un retrait sans défalquer le montant correspondant du solde). L'auteur du contrat n'a pas à se préoccuper de se protéger contre de telles attaques, car si l'exécution s'arrête à mi-chemin des modifications, celles-ci sont annulées.
- Un contrat financier fonctionne en prenant la médiane de neuf flux de données exclusifs afin de minimiser le risque. Un attaquant prend le contrôle de l'un des flux de données, qui est conçu pour être modifiable via le mécanisme d'appel d'adresse variable décrit dans la section sur les DAO, et le convertit pour qu'il exécute une boucle infinie, essayant ainsi de forcer toute tentative de réclamation des fonds du contrat financier à tomber en panne de gaz. Le contrat financier peut toutefois fixer une limite de gaz sur le message pour éviter ce problème.

L'alternative à la Turing-complétude est la Turing-incomplétude, où `JUMP` et `JUMPI` n'existent pas et où une seule copie de chaque contrat est autorisée dans la pile d'appels à un moment donné. Avec ce système, le système de frais décrit et les incertitudes entourant l'efficacité de notre solution pourraient disparaître, puisque le coût d'exécution d'un contrat serait limité au-dessus par sa taille. De plus, la Turing-incomplétude n'est même pas une limitation si importante. Parmi tous nos exemples de contrats conçus en interne, un seul nécessitait une boucle, et même celle-ci pouvait être supprimée en effectuant 26 répétitions d'un morceau de code d'une ligne. Étant donné les sérieuses implications de la Turing-complétude, et des bénéfices limités, pourquoi ne pas simplement utiliser un langage Turing-incomplet ? En réalité, la Turing-incomplétude est loin d'être une parfaite solution au problème. Pour comprendre pourquoi, il suffit de considérer les contrats suivants :

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Envoyez maintenant une transaction à A. Ainsi, en 51 transactions, nous avons un contrat qui effectue jusqu'à 2<sup>50</sup> étapes de calcul. Les mineurs pourraient essayer de détecter ces bombes logiques à l'avance en maintenant pour chaque contrat une valeur spécifiant le nombre maximum d'étapes de calcul autorisé, et en calculant cette valeur pour les contrats appelant d'autres contrats de manière récursive, mais cela nécessiterait que les mineurs interdisent les contrats qui créent d'autres contrats (puisque la création et l'exécution des 26 contrats ci-dessus pourraient facilement être regroupées en un seul contrat). Un autre point problématique est que le champ d'adresse d'un message est une variable, de sorte qu'en général, il n'est même pas possible de savoir à l'avance quels autres contrats un contrat donné va appeler. Au final, nous arrivons donc à une conclusion surprenante : la Turing-complétude est étonnamment facile à gérer, tout comme son absence est tout aussi étonnamment difficile à gérer, à moins que les mêmes contrôles soient en place. Mais dans ce cas, pourquoi ne pas laisser le protocole être Turing-complet ?

### Monnaie et émission {#currency-and-issuance}

Le réseau Ethereum comprend sa propre monnaie intégrée, l'ether (ETH), qui a pour double objectif de fournir une couche de liquidités primaire pour permettre un échange efficace entre différents types d'actifs numériques et, plus important encore, de fournir un mécanisme de paiement des frais de transaction. Pour des raisons pratiques et pour éviter toute polémique (voir le débat actuel sur les mBTC/uBTC/satoshi de Bitcoin), les dénominations seront pré-libellées :

- 1 : wei
- 10<sup>12</sup> : szabo
- 10<sup>15</sup> : finney
- 10<sup>18</sup> : ether

Il s'agit d'une version étendue du concept de « dollars » et de « cents », ou de « BTC » et de « satoshi ». Dans un avenir proche, nous prévoyons que l'« ether » sera utilisé pour les transactions ordinaires, le « finney » pour les microtransactions, et le « szabo » et le « wei » pour les discussions techniques autour des frais et de la mise en œuvre du protocole. D'autres dénominations peuvent devenir utiles ultérieurement, mais ne doivent pas être incluses dans les clients à ce stade.

Le modèle d'émission sera le suivant :

- L'ETH sera émis lors d'une vente de monnaie au prix de 1 000-2 000 ETH par BTC. Ce mécanisme est destiné à financer l'organisation Ethereum et à payer le développement qui a été utilisé avec succès par d'autres plateformes comme Mastercoin et NXT. Les premiers acheteurs bénéficieront de remises plus importantes. Les BTC reçus de la vente seront entièrement utilisés pour payer les salaires et les primes aux développeurs, et investis dans divers projets à but lucratif et non lucratif dans l'écosystème d'Ethereum et des cryptomonnaies.
- 0,099 x le montant total vendu (60 102 216 ETH) sera alloué à l'organisation pour indemniser les premiers contributeurs et payer les dépenses désignées en ETH avant le bloc d'origine.
- 0,099 x le montant total vendu sera conservé comme réserve à long terme.
- 0,26 x le montant total vendu sera alloué aux mineurs chaque année indéfiniment après ce point.

| Groupe                       | Au lancement | Après 1 an | Après 5 ans |
| ---------------------------- | ------------ | ---------- | ----------- |
| Unités monétaires            | 1,198X       | 1,458X     | 2,498X      |
| Acheteurs                    | 83,5 %       | 68,6 %     | 40,0 %      |
| Réserve dépensée avant vente | 8,26 %       | 6,79 %     | 3,96 %      |
| Réserve utilisée après vente | 8,26 %       | 6,79 %     | 3,96 %      |
| Mineurs                      | 0 %          | 17,8 %     | 52,0 %      |

#### Taux de croissance de l'offre à long terme (en pourcentage)

![Inflation Ethereum](./ethereum-inflation.png)

_Malgré l'émission linéaire de monnaie, tout comme pour le Bitcoin, le taux de croissance de l'offre tend néanmoins vers zéro au fil du temps._

Les deux principaux choix du modèle ci-dessus sont (1) l'existence et la taille d'un fonds de dotation et (2) l'existence d'une offre linéaire à la croissance permanente, par opposition à une offre plafonnée comme dans le cas du Bitcoin. La justification du fonds de dotation est la suivante. Si le fonds de dotation n'existait pas et que l'émission linéaire était réduite à 0,217 x pour obtenir le même taux d'inflation, la quantité totale d'ETH serait inférieure de 16,5 % et chaque unité aurait donc une valeur supérieure de 19,8 %. Par conséquent, à l'équilibre, 19,8 % d'ETH supplémentaires seraient achetés lors de la vente, de sorte que chaque unité aurait à nouveau exactement la même valeur qu'auparavant. L'organisation disposerait alors de 1,198 x plus de BTC, que l'on peut considérer comme divisés en deux tranches : les BTC initiaux et les 0,198 x supplémentaires. Cette situation est donc _exactement équivalente_ à la dotation, mais avec une différence importante : l'organisation détient uniquement des BTC, et n'est donc pas incitée à soutenir la valeur de l'unité d'ETH.

Le modèle de croissance linéaire permanente de l'offre réduit le risque de ce que certains considèrent comme une concentration excessive de la richesse en Bitcoins. Il offre aux individus vivant dans les époques actuelles et futures une chance équitable d'acquérir des unités monétaires, tout en maintenant une forte incitation à obtenir et conserver des ETH, car le « taux de croissance de l'offre » en pourcentage tend toujours vers zéro au fil du temps. Nous pensons aussi que, comme des pièces sont toujours perdues au fil du temps en raison de la négligence, de la mort, etc., et que cette perte peut être modélisée comme un pourcentage de l'offre totale par an, l'offre totale de monnaie en circulation finira par se stabiliser à une valeur égale à l'émission annuelle divisée par le taux de perte (par ex., à un taux de perte de 1 %, une fois que l'offre atteint 26 X, 0,26 X sera extrait et 0,26 X sera perdu chaque année, créant ainsi un équilibre).

Notez qu'à l'avenir, il est probable qu'Ethereum passe à un modèle de preuve d'enjeu pour la sécurité, réduisant l'exigence d'émission à quelque chose entre zéro et 0,05 X par an. Dans le cas où l'organisation Ethereum perdrait son financement ou disparaîtrait pour toute autre raison, nous laissons ouvert un « contrat social » : n'importe qui a le droit de créer une future version candidate d'Ethereum, à la seule condition que la quantité d'ETH soit au plus égale à `60102216 * (1.198 + 0.26 * n)` où `n` est le nombre d'années après le bloc d'origine. Les créateurs sont libres de vendre au public ou de céder d'une autre manière une partie ou la totalité de la différence entre l'expansion de l'offre induite par la preuve d'enjeu (PoS) et l'expansion maximale autorisée de l'offre pour payer le développement. Les mises à niveau candidates non conformes au contrat social peuvent, à juste titre, faire l'objet d'une fourche vers des versions conformes.

### Centralisation du minage {#mining-centralization}

L'algorithme de minage du Bitcoin fonctionne en demandant aux mineurs de calculer SHA256 des millions de fois sur des versions légèrement modifiées de l'en-tête du bloc, jusqu'à ce qu'un nœud finisse par proposer une version dont le hachage est inférieur à la cible (actuellement autour de 2<sup>192</sup>). Cependant, cet algorithme de minage est vulnérable à deux formes de centralisation. Pour commencer, l'écosystème de minage est désormais dominé par les circuits intégrés spécifiques aux applications (ASIC), des puces informatiques conçues pour la tâche spécifique du minage de Bitcoins, et donc des milliers de fois plus efficaces. Cela signifie que l'extraction de Bitcoins n'est plus une activité hautement décentralisée et égalitaire, puisqu'elle nécessite des millions de dollars de capital pour y participer efficacement. Deuxièmement, la plupart des mineurs de Bitcoins n'effectuent pas réellement la validation des blocs au niveau local. Ils s'appuient plutôt sur un groupe de minage centralisé pour fournir les en-têtes de bloc. Ce problème est sans doute le plus grave : à la rédaction de cet article, les trois principaux groupes de minage contrôlent indirectement environ 50 % de la puissance de traitement du réseau Bitcoin, même si cette situation est atténuée par le fait que les mineurs peuvent intégrer d'autres groupes de minage si l'un d'eux ou une coalition tentent une attaque de 51 %.

L'intention actuelle d'Ethereum est d'utiliser un algorithme de minage dans lequel les mineurs sont tenus d'extraire des données aléatoires de l'état, de calculer certaines transactions choisies au hasard dans les N derniers blocs de la blockchain et de renvoyer le hash du résultat. Ceci a deux avantages importants : d'abord, les contrats Ethereum peuvent inclure n'importe quel type de calcul, de sorte qu'un ASIC Ethereum serait essentiellement un ASIC pour le calcul général, c'est-à-dire un meilleur CPU. Deuxièmement, le minage nécessite l'accès à l'ensemble de la blockchain, ce qui oblige les mineurs à la stocker dans son intégralité et d'être au moins capables de vérifier chaque transaction. Ceci supprime le besoin de groupes de minage centralisés. Bien que ceux-ci puissent toujours jouer le rôle légitime d'équilibrer le caractère aléatoire de la distribution des récompenses, cette fonction peut être tout aussi bien remplie par des groupes P2P sans contrôle central.

Ce modèle n'est pas testé, et des difficultés peuvent survenir en cours de route si l'on évite certaines optimisations astucieuses quand l'exécution du contrat est utilisée comme algorithme de minage. Toutefois, cet algorithme possède une fonctionnalité particulièrement intéressante qui permet à n'importe qui d'« empoisonner le puits » en introduisant dans la blockchain un grand nombre de contrats spécialement conçus pour contrecarrer certains ASIC. Des incitations économiques existent pour que les fabricants d'ASIC utilisent cette astuce pour s'attaquer mutuellement. La solution que nous développons est donc, en définitive, une solution humaine économique adaptative plutôt qu'une solution purement technique.

### Évolutivité {#scalability}

La question de l'évolutivité est l'une des préoccupations les plus courantes concernant Ethereum. Comme Bitcoin, Ethereum présente le défaut que chaque transaction doit être traitée par chaque nœud du réseau. Pour Bitcoin, la taille actuelle de la blockchain est d'environ 15 Go et elle augmente d'environ 1 Mo par heure. Si le réseau Bitcoin devait traiter les 2 000 transactions par seconde de Visa, il croîtrait de 1 Mo toutes les trois secondes (1 Go par heure, 8 To par an). Ethereum est susceptible de subir un modèle de croissance similaire, aggravé par le fait qu'il y aura de nombreuses applications sur sa blockchain, et pas seulement une monnaie comme c'est le cas avec Bitcoin, mais amélioré par le fait que les nœuds complets Ethereum n'ont besoin de stocker que l'état de la blockchain et non son historique complet.

Avec une blockchain d'une telle taille, le risque de centralisation constitue un problème. Par exemple, si la taille de la blockchain atteint 100 To, le scénario probable serait que seul un très petit nombre de grandes entreprises exécuterait des nœuds complets, tous les utilisateurs réguliers utilisant des nœuds légers de vérification simplifiée de paiement (SPV). Dans ce cas, tous les nœuds complets pourraient se regrouper et se mettre d'accord pour tricher d'une manière profitable (p. ex., en modifiant la récompense du bloc, ou en s'offrant des BTC). Les nœuds légers ne pourraient pas détecter cela tout de suite. Bien sûr, il existerait probablement au moins un nœud complet honnête, et après quelques heures, des informations sur la fraude seraient diffusées via des canaux comme Reddit. Mais à ce moment-là, il serait déjà trop tard : il incomberait aux utilisateurs ordinaires d'organiser une action pour mettre sur liste noire les blocs donnés. Cela poserait un problème de coordination massif et serait probablement infaisable à une échelle similaire à celle d'une attaque à 51 % réussie. Dans le cas de Bitcoin, c'est actuellement un problème, mais il existe une modification de la blockchain [suggérée par Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) qui atténuera ce problème.

À court terme, Ethereum utilisera deux stratégies supplémentaires pour faire face à ce problème. Tout d'abord, en raison des algorithmes de minage basés sur la blockchain, chaque mineur sera obligé d'être un nœud complet, créant ainsi une limite inférieure du nombre de nœuds complets. Ensuite, nous inclurons surtout une racine d'arbre d'état intermédiaire dans la blockchain après le traitement de chaque transaction. Même si la validation des blocs est centralisée, tant qu'il existe un nœud vérificateur honnête, le problème de centralisation peut être contourné via un protocole de vérification. Quand un mineur publie un bloc non valide, c'est qu'il doit être soit mal formaté, ou que l'état `S[n]` est incorrect. Puisque l'on sait que `S[0]` est correct, il doit exister un premier état `S[i]` incorrect où `S[i-1]` est correct. Le nœud vérificateur fournirait l'index `i`, ainsi qu'une « preuve de non validité » consistant en un sous-ensemble de nœuds de l'arbre Patricia devant traiter `APPLY(S[i-1],TX[i]) -> S[i]`. Les nœuds pourraient utiliser ces nœuds Patricia pour exécuter cette partie du calcul, et voir que le `S[i]` généré ne correspond pas au `S[i]` fourni.

Une autre attaque, plus sophistiquée, impliquerait que des mineurs malveillants publient des blocs incomplets, de sorte que l'information complète n'existe même pas pour déterminer si les blocs sont valides ou non. La solution à ce problème est un protocole de défi-réponse : les nœuds vérificateurs émettent des « défis » sous la forme d'indices de transaction cible, et à la réception d'un nœud, un nœud léger traite le bloc comme non fiable jusqu'à ce qu'un autre nœud, que ce soit le mineur ou un autre vérificateur, fournisse un sous-ensemble de nœuds Patricia comme preuve de validité.

## Conclusion {#conclusion}

Le protocole Ethereum a été initialement conçu comme une version améliorée d'une cryptomonnaie, offrant des fonctionnalités avancées sur la blockchain telles que les dépôts fiduciaires, les limites de retrait, les contrats financiers, les marchés de jeux d'argent et de hasard, etc., via un langage de programmation très généraliste. Le protocole Ethereum ne « prend en charge » aucune de ces applications directement, mais l'existence d'un langage de programmation Turing-complet signifie que théoriquement, des contrats arbitraires peuvent être créés pour n'importe quel type de transaction ou d'application. Le plus intéressant dans Ethereum, c'est que son protocole va bien au-delà de la simple monnaie. Les protocoles autour du stockage de fichier décentralisé, des calculs décentralisés et des marchés prédictifs décentralisés, parmi des dizaines d'autres concepts du même ordre, ont le potentiel d'augmenter considérablement la productivité de l'industrie informatique, et de stimuler énormément d'autres protocoles P2P en y ajoutant pour la première fois une couche économique. Enfin, il existe aussi une gamme considérable d'applications n'ayant aucun rapport avec l'argent.

Le concept d'une fonction de transition d'état arbitraire telle qu'implémentée par le protocole Ethereum offre une plateforme au potentiel unique. Au lieu d'être un protocole fermé, à usage unique et destiné à une gamme spécifique d'applications dans les domaines du stockage de données, des jeux d'argent ou de la finance, Ethereum est ouvert par conception. Nous pensons qu'il est parfaitement adapté pour servir de couche de base à un très grand nombre de protocoles financiers et non financiers dans les années à venir.

## Notes et complément d'information {#notes-and-further-reading}

### Notes {#notes}

1. Un lecteur averti peut remarquer qu'en réalité, une adresse Bitcoin est le hachage de la clé publique à courbe elliptique, et non la clé publique elle-même. Cependant, il est parfaitement légitime, dans la terminologie cryptographique, de faire référence au hachage de la clé publique comme à la clé publique elle-même. En effet, la cryptographie du Bitcoin peut être considérée comme un algorithme de signature numérique personnalisée, où la clé publique est constituée du hachage de la clé publique ECC, la signature est constituée de la clé publique ECC concaténée avec la signature ECC, et l'algorithme de vérification consiste à vérifier la clé publique ECC dans la signature par rapport au hachage de la clé publique ECC fourni comme clé publique, puis à vérifier la signature ECC par rapport à la clé publique ECC.
2. Techniquement, la médiane des 11 blocs précédents.
3. En interne, 2 et « CHARLIE » sont des nombres<sup>[fn3](#notes)</sup>, le dernier étant en représentation gros-boutiste une base 256. Les nombres peuvent être au minimum de 0 et au maximum de 2<sup>256</sup>-1.

### Complément d'information {#further-reading}

1. [Valeur intrinsèque](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Propriété intelligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contrats intelligents](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Preuves de travail réutilisables](https://nakamotoinstitute.org/finney/rpow/)
6. [Titres de propriété sécurisés avec preuve de possession](https://nakamotoinstitute.org/secure-property-titles/)
7. [Livre blanc Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triangle de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Livre blanc sur les pièces de couleur](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Livre blanc Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Organisations autonomes décentralisées, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Vérification de paiement simplifiée](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Arbres de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Arbres Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ et agents autonomes, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn, Smart Property, Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Arbres de Merkle dans Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd à propos des arbres de Merkle additifs](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Pour en savoir plus sur l'historique du livre blanc, consultez [ce wiki](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Comme de nombreux projets open source communautaires, Ethereum a évolué depuis sa création. Pour plus d'infos sur les derniers développements d'Ethereum et la façon dont les modifications du protocole sont mises en œuvre, nous vous recommandons de lire [ce guide](/learn/)._
