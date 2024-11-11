---
title: Absence d'état, expiration d'état et expiration de l'historique
description: Explication de l'expiration d'historique et d'Ethereum sans état
lang: fr
---

# Absence d'état, expiration d'état et expiration de l'historique {#statelessness}

La possibilité d'exécuter des nœuds Ethereum sur du matériel modeste est critique pour une véritable décentralisation. En effet, l'exécution d'un nœud donne aux utilisateurs la possibilité de vérifier les informations en effectuant des vérifications cryptographiques de manière indépendante plutôt que de faire confiance à un tiers pour leur fournir les données. Le fait d'exécuter un nœud permet aux utilisateurs de soumettre des transactions directement au réseau pair-à-pair Ethereum plutôt que de devoir faire confiance à un intermédiaire. La décentralisation n'est pas possible si ces avantages ne sont disponibles qu'aux utilisateurs possesseurs de matériel coûteux. Au contraire, les nœuds devraient pouvoir s'exécuter avec des exigences de calcul et de mémoire très modestes, afin qu'ils puissent fonctionner sur des téléphones portables, de petits ordinateurs, ou sans effet notable sur un ordinateur personnel.

Aujourd'hui, la grande demande d'espace disque est la principale barrière à l'accès universel aux noeuds. Celle-ci est principalement causée par le besoin de stocker de larges morceaux des données d'état d'Ethereum. Ces données d'état contiennent des informations critiques requises pour traiter correctement les nouveaux blocs et les nouvelles transactions. Au moment de la rédaction, un SSD rapide de 2 To est recommandé pour exécuter un nœud Ethereum complet. Pour un nœud qui n'élague aucune donnée plus ancienne, les besoins en stockage augmentent d'environ 14 Go/semaine, et les nœuds d'archivage qui stockent toutes les données depuis la genèse approchent les 12 To (au moment de la rédaction, en février 2023).

Des disques durs moins coûteux peuvent être utilisés pour stocker les données plus anciennes, mais ils sont trop lents pour suivre le rythme des nouveaux blocs qui arrivent. Conserver les modèles de stockage actuels pour les clients tout en rendant les données moins chères et plus faciles à stocker n'est qu'une solution temporaire et partielle au problème car la croissance de l'état d'Ethereum est 'sans bornes', ce qui signifie que les besoins de stockage ne peuvent qu'augmenter, et les améliorations technologiques devront toujours suivre le rythme de la croissance continue de l'état. Les clients doivent plutôt trouver de nouveaux moyens de vérifier les blocks et les transactions qui ne reposent pas sur la recherche des données dans des bases de données locales.

## Réduction du stockage pour les nœuds {#reducing-storage-for-nodes}

Il y a plusieurs façons de réduire la quantité de données que chaque nœud doit stocker, chacune nécessitant que le protocole au cœur d'Ethereum soit mis à jour à des degrés différents :

- **Expiration de l'historique** : permet aux noeuds de se débarrasser des données d'état plus anciennes que X blocs, mais ne change pas la manière dont les clients Ethereum gèrent les données d'état
- **Expiration d'état** : permet aux données d'état qui ne sont pas utilisées fréquemment de devenir inactives. Les données inactives peuvent être ignorées par les clients jusqu'à ce qu'elles soient ressuscitées.
- **Absence d'état faible** : seuls les producteurs de blocs ont besoin d'accéder aux données d'état complètes, les autres noeuds peuvent vérifier les blocs sans base de données locale.
- **Absence d'état forte** : aucun noeud n'a besoin d'accéder aux données d'état complètes.

## Expiration des données {#data-expiry}

### Expiration de l'historique {#history-expiry}

L'expiration de l'historique fait référence aux clients qui élaguent les données plus anciennes dont ils n'auront probablement pas besoin, de sorte qu'ils ne stockent qu'une petite quantité de données historiques, laissant tomber les données plus anciennes lorsque de nouvelles données arrivent. Il y a deux raisons pour lesquelles les clients ont besoin des données historiques : la synchronisation et la réponse aux requêtes de données. Autrefois, les clients devaient synchroniser depuis le bloc d'origine, en vérifiant que chaque bloc successif est correct tout du long jusqu'à la tête de la chaine. Aujourd'hui, les clients utilisent des « points de contrôle de la faible subjectivité » pour amorcer leur parcours vers la tête de la chaîne. Ces points de contrôle sont des points de départ approuvés, comme un bloc d'origine proche du présent plutôt qu'au tout début d'Ethereum. Cela veut dire que les clients peuvent écarter toutes les informations antérieures au point de contrôle le plus récent de la faible subjectivité sans perdre la possibilité de se synchroniser avec la tête de la chaîne. Les clients traitent actuellement les demandes (arrivant via JSON-RPC) pour les données historiques en les récupérant depuis leurs bases de données locales. Cependant, avec l'expiration de l'historique, cela ne sera plus possible si les données requises ont été écartées. Des solutions innovantes sont nécessaires pour traiter ces données historiques.

Une possibilité est que les clients demandent les données historiques à des pairs en utilisant une solution comme le Réseau du Portail. Le Portail du Réseau est un réseau pair-à-pair en développement pour fournir des données historiques où chaque noeud stocke une petite partie de l'historique d'Ethereum de telle façon que l'historique complet existe de manière distribuée sur le réseau. Les requêtes sont servies en recherchant des pairs stockant les données pertinentes et en les leur demandant. Alternativement, comme ce sont généralement les applications qui nécessitent l'accès aux données historiques, cela peut devenir leur responsabilité de les stocker. Il pourrait également y avoir suffisamment d'acteurs altruistes dans l'espace Ethereum qui seraient disposés à conserver des archives historiques. Il pourrait s'agir d'un DAO qui se constitue pour gérer le stockage des données historiques, ou idéalement, ce sera une combinaison de toutes ces options. Ces fournisseurs pourraient fournir les données de nombreuses manières, comme avec un torrent, FTP, Filecoin ou IPFS.

L'expiration de l'historique est dans une certaine mesure controversée parce que, pour l'instant, Ethereum a toujours implicitement garanti la disponibilité de toutes les données historiques. Une synchronisation complète depuis l'origine a toujours été possible en tant que standard, même si elle repose sur la reconstruction de certaines données plus anciennes à partir d'instantanés. L'expiration de l'historique déplace la responsabilité de fournir cette garantie en dehors du cœur du protocole Ethereum. Cela pourrait introduire de nouveaux risques de censure si ce sont des organisations centralisées qui finissent par assumer le rôle de fournisseur des données historiques.

EIP-4444 n'est pas encore prêt à être lancé, mais fait l'objet de discussions actives. De façon intéressante, les défis d'EIP-4444 ne sont pas tant techniques que de l'ordre de la gestion communautaire. Pour que cette proposition soit lancée, il doit y avoir une adhésion de la communauté qui comprend non seulement un accord, mais également des engagements à stocker et à fournir les données historiques de la part d'entités dignes de confiance.

Cette mise à niveau ne modifie pas fondamentalement comment les noeuds Ethereum traitent les données d'état, elle change juste la façon dont les données historiques sont disponibles.

### Expiration de l'état {#state-expiry}

L'expiration de l'état fait référence à la suppression de l'état sur les nœuds individuels si cet état n'a pas été accédé récemment. Ceci pourrait être implémenté de plusieurs manières, notamment :

- **Expiration par le loyer** : faire payer un « loyer » aux comptes et les laisser expirer quand leur loyer atteint zéro
- **Expiration par le temps** : rendre les comptes inactifs s'il n'y a pas de lecture/écriture sur ce compte pendant un certain temps

L'expiration par le loyer pourrait être un loyer direct facturé aux comptes pour les garder dans la base de données des états actifs. L'expiration par le temps pourrait être un compte à rebours depuis la dernière interaction sur le compte, ou elle pourrait être une expiration périodique de tous les comptes. Il pourrait également y avoir des mécanismes qui combinent des éléments des deux modèles basés sur le temps et sur le loyer, par exemple que les comptes individuels persistent dans l'état actif s'ils paient des frais minimes avant l'expiration basée sur le temps. Avec l'expiration d'état, il est important de noter que les états inactifs ne sont **pas effacés**, ils sont simplement stockés séparément des états actifs. Les états inactifs peuvent être ressuscités vers les états actifs.

La façon dont cela fonctionnerait serait probablement d'avoir un arbre d'état pour des périodes de temps spécifiques (peut-être ~1 an). À chaque fois qu'une nouvelle période commence, un arbre d'état entièrement neuf voit le jour. Seul l'arbre d'état actuel peut être modifié, tous les autres sont immuables. Les nœuds Ethereum ne seraient obligés de contenir que l'arbre d'état actuel et le suivant le plus récent. Cela nécessiterait un moyen d'associer une adresse avec la période de temps dans laquelle elle existe. Il y a [plusieurs façons possibles](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de le faire, mais la favorite nécessite que [les adresses soient allongées](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) pour accommoder les informations supplémentaires, avec l'avantage additionnel que les adresses plus longues sont plus sûres. La feuille de route qui fait cela est appelée [extension de l'espace d'adressage](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

De même que pour l'expiration de l'historique, sous l'expiration de l'état, la responsabilité du stockage des anciennes données d'état est retirée des utilisateurs individuels et transférée à d'autres entités telles que des fournisseurs centralisés, des membres altruistes de la communauté ou des solutions décentralisées plus futuristes telles que le Réseau du Portail.

L'expiration de l'état est encore en phase de recherche et n'est pas encore prête à être expédiée. L'expiration de l'état pourrait bien se produire après les clients sans état et l'expiration de l'historique, car ces mises à niveau rendent les grandes tailles d'état facilement gérables pour la majorité des validateurs.

## Le principe de non-vérification de l'état de la blockchain {#statelessness}

L'absence d'état est un peu un abus de langage car cela ne signifie pas que le concept d'« état » est éliminé, mais cela implique des changements dans la façon dont les nœuds Ethereum traitent les données d'état. L'absence d'état elle-même se présente sous deux formes : l'absence d'état faible et l'absence d'état forte. L'absence d'état faible permet à la plupart des nœuds de devenir sans état en plaçant la responsabilité du stockage de l'état sur quelques-uns. L'absence d'état forte retire entièrement le besoin pour tous les nœuds de stocker les données d'état complètes. Les absences d'état faibles et fortes offrent toutes les deux les avantages suivants aux validateurs normaux :

- synchronisation presque instantanée
- possibilité de valider les blocs dans le désordre
- les nœuds sont capables de s'exécuter avec des exigences sur le matériel très faibles (par exemple sur des téléphones portables)
- les nœuds peuvent s'exécuter sur des disques durs bon marché parce qu'aucune lecture/écriture sur le disque n'est nécessaire
- compatibles avec les mises à niveau futures de la cryptographie d'Ethereum

### Absence d'état faible {#weak-statelessness}

L'absence d'était faible implique des changements dans la façon dont les nœuds Ethereum vérifient les changements d'état, mais elle n'élimine pas complètement le besoin de stockage d'état dans tous les nœuds du réseau. Au lieu de cela, l'absence d'était faible met la responsabilité du stockage de l'état sur les proposants de blocs, alors que tous les autres nœuds du réseau vérifient les blocs sans stocker les données d'état complètes.

**Avec l'absence d'état faible, proposer des blocs requiert l'accès à l'intégralité des données d'état, mais vérifier les blocs ne requiert aucune donnée d'état**

Pour que cela soit possible, les [arbres de Verkle](/roadmap/verkle-trees/) doivent déjà avoir été implémentés dans les clients Ethereum. Les arbres de Verkle sont une structure de données de remplacement pour stocker les données d'état d'Ethereum qui permettent à de petits « témoins des données » de taille fixe d'être transmis entre pairs et d'être utilisés pour vérifier les blocs au lieu de vérifier les blocs par rapport aux bases de données locales. La [séparation proposant-constructeur](/roadmap/pbs/) est également requise car elle permet aux constructeurs de blocs d'être des nœuds spécialisés avec un matériel plus puissant, et ce sont eux qui ont besoin d'un accès aux données d'état complètes.

<ExpandableCard title="Pourquoi est-il acceptable de s'appuyer sur un nombre réduit de proposeurs de blocs ?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

L'absence d'état requiert que les constructeurs de blocs conservent une copie des données d'état complètes afin qu'ils puissent générer des témoins pouvant être utilisés pour vérifier le bloc. Les autres nœuds n'ont pas besoin d'accéder aux données d'état, toute l'information requise pour vérifier le bloc est disponible dans le témoin. Cela crée une situation où proposer un bloc est coûteux, mais vérifier le bloc est bon marché, ce qui implique que moins d'opérateurs vont faire fonctionner un bloc proposant des noeuds. Cependant, la décentralisation des proposants de blocs n'est pas critique tant qu'autant de participants que possible peuvent vérifier que les blocs qu'ils proposent sont valides.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">En lire plus dans les notes de Dankrad</ButtonLink>
</ExpandableCard>

Les proposants de bloc utilisent les données d'état pour créer des « témoins » - l'ensemble minimal de données qui prouvent les valeurs de l'état qui sont modifiées par les transactions dans un bloc. Les autres validateurs ne détiennent pas l'état, ils ne stockent que la racine de l'état (une empreinte numérique de l'état complet). Ils reçoivent un bloc et un témoin et les utilisent pour mettre à jour leur racine de l'état. Cela rend un nœud validant extrêmement léger.

L'absence d'état faible est à un stade de recherche avancé, mais elle repose sur l'implémentation de la séparation proposant-constructeur et les Arbres de Verkle, afin que de petits témoins puissent être transférés entre les pairs. Cela veut dire que l'absence d'était faible prendra probablement quelques années avant d'être introduite dans le réseau principal d'Ethereum.

### Absence d'état forte {#strong-statelessness}

L'absence d'état forte supprime le besoin pour tous les nœuds de stocker les données d'état. Au lieu de cela, les transactions sont envoyées avec des témoins qui peuvent être agrégés par les producteurs de blocs. Les producteurs de blocs sont alors chargés de stocker uniquement l'état nécessaire à la génération de témoins pour les comptes concernés. La responsabilité de l'état est presque entièrement transférée aux utilisateurs, car ils envoient des témoins et des « listes d'accès » pour déclarer avec quels comptes et clés de stockage ils interagissent. Cela permettrait de disposer de nœuds extrêmement légers, mais il y a des compromis, notamment la difficulté accrue de réaliser des transactions avec des contrats intelligents.

L'absence d'état forte a été étudiée par les chercheurs mais on ne s'attend actuellement pas à ce qu'elle fasse partie de la feuille de route d'Ethereum - il est plus probable que l'absence d'état faible soit suffisante pour les besoins de mise à l'échelle d'Ethereum.

## Progrès actuels {#current-progress}

Absence d'état faible, l'expiration de l'historique et l'expiration de l'état sont tous en phase de recherche et devraient être prêts dans plusieurs années. Il n'y a aucune garantie que toutes ces propositions seront mises en œuvre, par exemple, si l'expiration de l'état est mise en œuvre en premier, il se peut qu'il ne soit pas nécessaire de mettre en œuvre également l'expiration de l'historique. Il existe également d'autres éléments de la feuille de route, tels que les [Arbres de Verkle](/roadmap/verkle-trees) et la [Séparation proposeur-constructeur](/roadmap/pbs) qui doivent être achevés en premier.

## Complément d'information {#further-reading}

- [AMA de Vitalik sur l'absence d'état](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Une théorie de la gestion de la taille de l'état](https://hackmd.io/@vbuterin/state_size_management)
- [Limiter la taille de l'état en minimisant les conflits de résurrection](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Vers l'absence d'état et l'expiration de l'état](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Spécification de l'EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes à propos de l'EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Pourquoi il est si important de devenir sans état](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Les notes conceptuelles originales du client sans état](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Plus d'informations sur l'expiration de l'état](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Encore plus sur l'expiration de l'état](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
