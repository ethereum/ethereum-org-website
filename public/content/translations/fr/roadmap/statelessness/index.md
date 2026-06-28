---
title: Absence d'état, expiration d'état et expiration de l'historique
description: Explication de l'expiration de l'historique et de l'absence d'état sur Ethereum
lang: fr
---

La capacité d'exécuter des nœuds [Ethereum](/) sur du matériel modeste est essentielle pour une véritable décentralisation. En effet, l'exécution d'un nœud donne aux utilisateurs la capacité de vérifier les informations en effectuant des vérifications cryptographiques de manière indépendante plutôt que de faire confiance à un tiers pour leur fournir des données. L'exécution d'un nœud permet aux utilisateurs de soumettre des transactions directement au réseau pair à pair Ethereum plutôt que de devoir faire confiance à un intermédiaire. La décentralisation n'est pas possible si ces avantages ne sont accessibles qu'aux utilisateurs disposant de matériel coûteux. Au lieu de cela, les nœuds devraient pouvoir fonctionner avec des exigences de traitement et de mémoire extrêmement modestes afin de pouvoir s'exécuter sur des téléphones mobiles, des micro-ordinateurs ou de manière imperceptible sur un ordinateur personnel.

Aujourd'hui, les exigences élevées en matière d'espace disque constituent le principal obstacle empêchant l'accès universel aux nœuds. Cela est principalement dû à la nécessité de stocker de grandes parties des données d'état d'Ethereum. Ces données d'état contiennent des informations critiques nécessaires pour traiter correctement les nouveaux blocs et les transactions. Au moment de la rédaction de cet article, un SSD rapide de 2 To est recommandé pour exécuter un nœud Ethereum complet. Pour un nœud qui n'élague aucune donnée ancienne, les besoins de stockage augmentent d'environ 14 Go/semaine, et les nœuds d'archive qui stockent toutes les données depuis le bloc genèse approchent les 12 To (au moment de la rédaction, en février 2023).

Des disques durs moins chers peuvent être utilisés pour stocker des données plus anciennes, mais ils sont trop lents pour suivre le rythme des blocs entrants. Conserver les modèles de stockage actuels pour les clients tout en rendant les données moins chères et plus faciles à stocker n'est qu'une solution temporaire et partielle au problème, car la croissance de l'état d'Ethereum est « illimitée », ce qui signifie que les besoins de stockage ne peuvent qu'augmenter, et les améliorations technologiques devront toujours suivre le rythme de la croissance continue de l'état. Au lieu de cela, les clients doivent trouver de nouvelles façons de vérifier les blocs et les transactions qui ne reposent pas sur la recherche de données dans des bases de données locales.

## Réduire le stockage pour les nœuds {#reducing-storage-for-nodes}

Il existe plusieurs façons de réduire la quantité de données que chaque nœud doit stocker, chacune nécessitant une mise à jour du protocole de base d'Ethereum à un degré différent :

- **Expiration de l'historique** : permet aux nœuds de supprimer les données d'état antérieures à X blocs, mais ne modifie pas la façon dont les clients Ethereum gèrent les données d'état.
- **Expiration d'état** : permet aux données d'état qui ne sont pas utilisées fréquemment de devenir inactives. Les données inactives peuvent être ignorées par les clients jusqu'à ce qu'elles soient ressuscitées.
- **Absence d'état faible** : seuls les producteurs de blocs ont besoin d'accéder aux données d'état complètes, les autres nœuds peuvent vérifier les blocs sans base de données d'état locale.
- **Absence d'état forte** : aucun nœud n'a besoin d'accéder aux données d'état complètes.

## Expiration des données {#data-expiry}

### Expiration de l'historique {#history-expiry}

L'expiration de l'historique fait référence aux clients qui élaguent les données plus anciennes dont ils n'auront probablement pas besoin, de sorte qu'ils ne stockent qu'une petite quantité de données historiques, abandonnant les données plus anciennes lorsque de nouvelles données arrivent. Il y a deux raisons pour lesquelles les clients ont besoin de données historiques : la synchronisation et le traitement des requêtes de données. À l'origine, les clients devaient se synchroniser à partir du bloc genèse, en vérifiant que chaque bloc successif était correct jusqu'à la tête de la chaîne. Aujourd'hui, les clients utilisent des « points de contrôle de subjectivité faible » pour s'amorcer jusqu'à la tête de la chaîne. Ces points de contrôle sont des points de départ de confiance, comme avoir un bloc genèse proche du présent plutôt qu'au tout début d'Ethereum. Cela signifie que les clients peuvent supprimer toutes les informations antérieures au point de contrôle de subjectivité faible le plus récent sans perdre la capacité de se synchroniser avec la tête de la chaîne. Les clients répondent actuellement aux requêtes (arrivant via JSON-RPC) de données historiques en les récupérant dans leurs bases de données locales. Cependant, avec l'expiration de l'historique, cela ne sera pas possible si les données demandées ont été élaguées. C'est pour fournir ces données historiques que des solutions innovantes sont nécessaires.

Une option consiste pour les clients à demander des données historiques à leurs pairs en utilisant une solution telle que le Portal Network. Le Portal Network est un réseau pair à pair en cours de développement pour fournir des données historiques, où chaque nœud stocke une petite partie de l'historique d'Ethereum de sorte que l'historique complet existe de manière distribuée sur le réseau. Les requêtes sont traitées en recherchant les pairs qui stockent les données pertinentes et en les leur demandant. Alternativement, comme ce sont généralement les applications qui nécessitent un accès aux données historiques, il peut devenir de leur responsabilité de les stocker. Il se peut également qu'il y ait suffisamment d'acteurs altruistes dans l'espace Ethereum qui seraient prêts à maintenir des archives historiques. Il pourrait s'agir d'une DAO créée pour gérer le stockage des données historiques, ou idéalement, ce sera une combinaison de toutes ces options. Ces fournisseurs pourraient proposer les données de nombreuses manières, par exemple via un torrent, FTP, Filecoin ou IPFS.

L'expiration de l'historique est quelque peu controversée car jusqu'à présent, Ethereum a toujours garanti implicitement la disponibilité de toutes les données historiques. Une synchronisation complète depuis le bloc genèse a toujours été possible en standard, même si elle repose sur la reconstruction de certaines données plus anciennes à partir d'instantanés. L'expiration de l'historique déplace la responsabilité de fournir cette garantie en dehors du protocole de base d'Ethereum. Cela pourrait introduire de nouveaux risques de censure si ce sont des organisations centralisées qui finissent par intervenir pour fournir des données historiques.

L'EIP-4444 n'est pas encore prêt à être déployé, mais il fait l'objet de discussions actives. Fait intéressant, les défis liés à l'EIP-4444 ne sont pas tant techniques, mais relèvent principalement de la gestion de la communauté. Pour que cela soit déployé, il faut l'adhésion de la communauté, ce qui inclut non seulement un accord, mais aussi des engagements à stocker et à fournir des données historiques de la part d'entités dignes de confiance.

Cette mise à niveau ne change pas fondamentalement la façon dont les nœuds Ethereum gèrent les données d'état, elle modifie simplement la façon dont les données historiques sont consultées.

### Expiration d'état {#state-expiry}

L'expiration d'état fait référence à la suppression de l'état des nœuds individuels s'il n'a pas été consulté récemment. Il existe plusieurs façons de mettre cela en œuvre, notamment :

- **Expiration par loyer** : facturer un « loyer » aux comptes et les faire expirer lorsque leur loyer atteint zéro
- **Expiration par le temps** : rendre les comptes inactifs s'il n'y a pas de lecture/écriture sur ce compte pendant un certain temps

L'expiration par loyer pourrait être un loyer direct facturé aux comptes pour les maintenir dans la base de données d'état actif. L'expiration par le temps pourrait se faire par un compte à rebours à partir de la dernière interaction avec le compte, ou il pourrait s'agir d'une expiration périodique de tous les comptes. Il pourrait également y avoir des mécanismes qui combinent des éléments des modèles basés sur le temps et sur le loyer, par exemple, les comptes individuels persistent dans l'état actif s'ils paient de petits frais avant l'expiration basée sur le temps. Avec l'expiration d'état, il est important de noter que l'état inactif n'est **pas supprimé**, il est simplement stocké séparément de l'état actif. L'état inactif peut être ressuscité dans l'état actif.

La façon dont cela fonctionnerait serait probablement d'avoir un arbre d'état pour des périodes de temps spécifiques (peut-être ~1 an). Chaque fois qu'une nouvelle période commence, un arbre d'état complètement nouveau commence également. Seul l'arbre d'état actuel peut être modifié, tous les autres sont immuables. Les nœuds Ethereum ne sont censés conserver que l'arbre d'état actuel et le précédent le plus récent. Cela nécessite un moyen d'horodater une adresse avec la période dans laquelle elle existe. Il existe [plusieurs façons possibles](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de le faire, mais l'option principale nécessite que [les adresses soient allongées](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) pour tenir compte des informations supplémentaires, avec l'avantage supplémentaire que des adresses plus longues sont beaucoup plus sécurisées. L'élément de la feuille de route qui fait cela s'appelle [l'extension de l'espace d'adressage](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

De la même manière que pour l'expiration de l'historique, avec l'expiration d'état, la responsabilité du stockage des anciennes données d'état est retirée aux utilisateurs individuels et transférée à d'autres entités telles que des fournisseurs centralisés, des membres altruistes de la communauté ou des solutions décentralisées plus futuristes telles que le Portal Network.

L'expiration d'état est encore en phase de recherche et n'est pas encore prête à être déployée. L'expiration d'état pourrait bien se produire plus tard que les clients sans état et l'expiration de l'historique, car ces mises à niveau rendent les grandes tailles d'état facilement gérables pour la majorité des validateurs.

## Absence d'état {#statelessness-2}

L'absence d'état est un terme un peu inapproprié car cela ne signifie pas que le concept d'« état » est éliminé, mais cela implique des changements dans la façon dont les nœuds Ethereum gèrent les données d'état. L'absence d'état elle-même se décline en deux variantes : l'absence d'état faible et l'absence d'état forte. L'absence d'état faible permet à la plupart des nœuds de devenir sans état en confiant la responsabilité du stockage de l'état à quelques-uns. L'absence d'état forte supprime complètement la nécessité pour tout nœud de stocker les données d'état complètes. L'absence d'état faible et forte offrent toutes deux les avantages suivants aux validateurs normaux :

- synchronisation presque instantanée
- capacité de valider les blocs dans le désordre
- nœuds capables de fonctionner avec des exigences matérielles très faibles (par exemple, sur des téléphones)
- les nœuds peuvent fonctionner sur des disques durs bon marché car aucune lecture/écriture sur disque n'est requise
- compatible avec les futures mises à niveau de la cryptographie d'Ethereum

### Absence d'état faible {#weak-statelessness}

L'absence d'état faible implique des changements dans la façon dont les nœuds Ethereum vérifient les changements d'état, mais elle n'élimine pas complètement le besoin de stockage d'état dans tous les nœuds du réseau. Au lieu de cela, l'absence d'état faible confie la responsabilité du stockage de l'état aux proposants de blocs, tandis que tous les autres nœuds du réseau vérifient les blocs sans stocker les données d'état complètes.

**Dans l'absence d'état faible, la proposition de blocs nécessite l'accès aux données d'état complètes, mais la vérification des blocs ne nécessite aucune donnée d'état**

Pour que cela se produise, les [arbres Verkle](/roadmap/verkle-trees/) doivent déjà avoir été implémentés dans les clients Ethereum. Les arbres Verkle sont une structure de données de remplacement pour stocker les données d'état d'Ethereum qui permettent à de petits « témoins » de taille fixe des données d'être transmis entre pairs et utilisés pour vérifier les blocs au lieu de vérifier les blocs par rapport à des bases de données locales. La [séparation proposant-constructeur (PBS)](/roadmap/pbs/) est également requise car cela permet aux constructeurs de blocs d'être des nœuds spécialisés avec un matériel plus puissant, et ce sont eux qui ont besoin d'accéder aux données d'état complètes.

<ExpandableCard title="Pourquoi est-il acceptable de s'appuyer sur moins de proposants de blocs ?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

L'absence d'état repose sur le fait que les constructeurs de blocs conservent une copie des données d'état complètes afin de pouvoir générer des témoins qui peuvent être utilisés pour vérifier le bloc. Les autres nœuds n'ont pas besoin d'accéder aux données d'état, toutes les informations nécessaires pour vérifier le bloc sont disponibles dans le témoin. Cela crée une situation où la proposition d'un bloc est coûteuse, mais la vérification du bloc est bon marché, ce qui implique que moins d'opérateurs exécuteront un nœud proposant des blocs. Cependant, la décentralisation des proposants de blocs n'est pas critique tant qu'un maximum de participants peut vérifier indépendamment que les blocs qu'ils proposent sont valides.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">En savoir plus sur les notes de Dankrad</ButtonLink>
</ExpandableCard>

Les proposants de blocs utilisent les données d'état pour créer des « témoins » - l'ensemble minimal de données qui prouvent les valeurs de l'état qui sont modifiées par les transactions dans un bloc. Les autres validateurs ne détiennent pas l'état, ils ne stockent que la racine d'état (un hash de l'état complet). Ils reçoivent un bloc et un témoin et les utilisent pour mettre à jour leur racine d'état. Cela rend un nœud de validation extrêmement léger.

L'absence d'état faible est à un stade de recherche avancé, mais elle repose sur la mise en œuvre de la séparation proposant-constructeur (PBS) et des arbres Verkle afin que de petits témoins puissent être transmis entre pairs. Cela signifie que l'absence d'état faible est probablement à quelques années du réseau principal Ethereum.

Le [zkEVM pour la vérification de la couche 1 (l1)](/roadmap/zkevm/) est une technologie complémentaire qui pourrait encore améliorer la vérification sans état. Au lieu de simplement vérifier les témoins, les validateurs pourraient vérifier une preuve à divulgation nulle de connaissance que le bloc entier a été exécuté correctement, offrant une certitude cryptographique sans réexécuter les transactions.

### Absence d'état forte {#strong-statelessness}

L'absence d'état forte supprime la nécessité pour tout nœud de stocker des données d'état. Au lieu de cela, les transactions sont envoyées avec des témoins qui peuvent être agrégés par les producteurs de blocs. Les producteurs de blocs sont alors responsables de ne stocker que l'état nécessaire à la génération de témoins pour les comptes concernés. La responsabilité de l'état est presque entièrement transférée aux utilisateurs, car ils envoient des témoins et des « listes d'accès » pour déclarer avec quels comptes et clés de stockage ils interagissent. Cela permettrait d'avoir des nœuds extrêmement légers, mais il y a des compromis, notamment le fait de rendre plus difficile les transactions avec les contrats intelligents.

L'absence d'état forte a été étudiée par des chercheurs mais ne devrait pas faire partie de la feuille de route d'Ethereum pour le moment - il est plus probable que l'absence d'état faible soit suffisante pour les besoins de mise à l'échelle d'Ethereum.

## Progrès actuels {#current-progress}

L'absence d'état faible, l'expiration de l'historique et l'expiration d'état sont toutes en phase de recherche et devraient être déployées dans plusieurs années. Il n'y a aucune garantie que toutes ces propositions seront mises en œuvre, par exemple, si l'expiration d'état est mise en œuvre en premier, il se peut qu'il ne soit pas nécessaire de mettre également en œuvre l'expiration de l'historique. Il y a également d'autres éléments de la feuille de route, tels que les [arbres Verkle](/roadmap/verkle-trees) et la [séparation proposant-constructeur (PBS)](/roadmap/pbs) qui doivent être achevés en premier.

## Complément d'information {#further-reading}

- [Qu'est-ce que l'Ethereum sans état ?](https://stateless.fyi/)
- [AMA de Vitalik sur l'absence d'état](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Une théorie de la gestion de la taille de l'état](https://hackmd.io/@vbuterin/state_size_management)
- [Limitation de l'état minimisant les conflits de résurrection](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Chemins vers l'absence d'état et l'expiration d'état](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Spécification de l'EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sur l'EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Pourquoi il est si important de passer à l'absence d'état](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Notes originales sur le concept de client sans état](https://ethresear.ch/t/the-stateless-client-concept/172)
- [En savoir plus sur l'expiration d'état](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Encore plus sur l'expiration d'état](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Page d'information sur l'Ethereum sans état](https://stateless.fyi)