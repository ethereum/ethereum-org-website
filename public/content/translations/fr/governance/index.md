---
title: Introduction à la gouvernance d'Ethereum
metaTitle: Gouvernance d'Ethereum
description: Une introduction à la façon dont les décisions concernant Ethereum sont prises.
lang: fr
---

_Si personne ne possède [Ethereum](/), comment les décisions concernant les changements passés et futurs d'Ethereum sont-elles prises ? La gouvernance d'Ethereum fait référence au processus qui permet de prendre de telles décisions._

<Divider />

## Qu'est-ce que la gouvernance ? {#what-is-governance}

La gouvernance correspond aux systèmes en place qui permettent de prendre des décisions. Dans une structure organisationnelle typique, l'équipe de direction ou un conseil d'administration peut avoir le dernier mot dans la prise de décision. Ou peut-être que les actionnaires votent sur des propositions pour promulguer des changements. Dans un système politique, les élus peuvent promulguer des lois qui tentent de représenter les désirs de leurs électeurs.

## Gouvernance décentralisée {#decentralized-governance}

Personne ne possède ni ne contrôle le protocole Ethereum, mais des décisions doivent tout de même être prises concernant la mise en œuvre de changements afin de garantir au mieux la longévité et la prospérité du réseau. Cette absence de propriété fait de la gouvernance organisationnelle traditionnelle une solution incompatible.

## Gouvernance d'Ethereum {#ethereum-governance}

La gouvernance d'Ethereum est le processus par lequel les modifications du protocole sont effectuées. Il est important de souligner que ce processus n'est pas lié à la façon dont les personnes et les applications utilisent le protocole - Ethereum est sans permission. N'importe qui, n'importe où dans le monde, peut participer aux activités onchain. Il n'y a pas de règles établies quant à savoir qui peut ou ne peut pas créer une application ou envoyer une transaction. Cependant, il existe un processus pour proposer des modifications au protocole de base, sur lequel fonctionnent les applications décentralisées (dapps). Étant donné que de nombreuses personnes dépendent de la stabilité d'Ethereum, il existe un seuil de coordination très élevé pour les changements fondamentaux, incluant des processus sociaux et techniques, afin de s'assurer que toute modification d'Ethereum est sécurisée et largement soutenue par la communauté.

<VideoWatch slug="ethereum-core-governance-explained" />

### Gouvernance onchain vs hors chaîne {#onchain-vs-offchain}

La technologie de la chaîne de blocs permet de nouvelles capacités de gouvernance, connues sous le nom de gouvernance onchain. La gouvernance onchain se produit lorsque les modifications proposées au protocole sont décidées par un vote des parties prenantes, généralement par les détenteurs d'un jeton de gouvernance, et que le vote a lieu sur la chaîne de blocs. Avec certaines formes de gouvernance onchain, les modifications proposées au protocole sont déjà écrites dans le code et mises en œuvre automatiquement si les parties prenantes approuvent les modifications en signant une transaction.

L'approche inverse, la gouvernance hors chaîne, est celle où toute décision de modification du protocole passe par un processus informel de discussion sociale qui, s'il est approuvé, sera mis en œuvre dans le code.

**La gouvernance d'Ethereum se fait hors chaîne** avec une grande variété de parties prenantes impliquées dans le processus.

_Bien qu'au niveau du protocole, la gouvernance d'Ethereum soit hors chaîne, de nombreux cas d'utilisation construits sur Ethereum, tels que les DAO, utilisent la gouvernance onchain._

<ButtonLink href="/dao/">
  Plus d'infos sur les DAO
</ButtonLink>

<Divider />

## Qui est impliqué ? {#who-is-involved}

Il y a diverses parties prenantes dans la [communauté Ethereum](/community/), chacune jouant un rôle dans le processus de gouvernance. En partant des parties prenantes les plus éloignées du protocole et en nous rapprochant, nous avons :

- **Détenteurs d'ether** : ces personnes détiennent une quantité arbitraire d'ETH. [Plus d'infos sur l'ETH](/what-is-ether/).
- **Utilisateurs d'applications** : ces personnes interagissent avec des applications sur la chaîne de blocs Ethereum.
- **Développeurs d'applications/d'outils** : ces personnes écrivent des applications qui fonctionnent sur la chaîne de blocs Ethereum (par ex., la finance décentralisée (DeFi), les NFT, etc.) ou créent des outils pour interagir avec Ethereum (par ex., des portefeuilles, des suites de tests, etc.). [Plus d'infos sur les dapps](/apps/).
- **Opérateurs de nœuds** : ces personnes gèrent des nœuds qui propagent les blocs et les transactions, rejetant toute transaction ou bloc invalide qu'ils rencontrent. [Plus d'infos sur les nœuds](/developers/docs/nodes-and-clients/).
- **Auteurs d'EIP** : ces personnes proposent des modifications au protocole Ethereum, sous la forme de propositions d'amélioration d'Ethereum (EIP). [Plus d'infos sur les EIP](/eips/).
- **Validateurs** : ces personnes gèrent des nœuds qui peuvent ajouter de nouveaux blocs à la chaîne de blocs Ethereum.
- **Développeurs du protocole** (alias « Core Developers ») : ces personnes maintiennent les différentes implémentations d'Ethereum (par ex., go-ethereum, Nethermind, Besu, Erigon, Reth au niveau de la couche d'exécution ou Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine au niveau de la couche de consensus). [Plus d'infos sur les clients Ethereum](/developers/docs/nodes-and-clients/).

_Remarque : un individu peut faire partie de plusieurs de ces groupes (par ex., un développeur de protocole pourrait défendre une EIP, gérer un validateur de la chaîne balise et utiliser des applications de DeFi). Pour des raisons de clarté conceptuelle, il est cependant plus facile de les distinguer._

<Divider />

## Qu'est-ce qu'une EIP ? {#what-is-an-eip}

Un processus important utilisé dans la gouvernance d'Ethereum est la soumission de **propositions d'amélioration d'Ethereum (EIP)**. Les EIP sont des normes spécifiant de nouvelles fonctionnalités ou de nouveaux processus potentiels pour Ethereum. N'importe qui au sein de la communauté Ethereum peut créer une EIP. Si vous souhaitez rédiger une EIP ou participer à l'évaluation par les pairs et/ou à la gouvernance, consultez :

<ButtonLink href="/eips/">
  Plus d'infos sur les EIP
</ButtonLink>

<Divider />

## Le processus formel {#formal-process}

Le processus formel pour introduire des modifications au protocole Ethereum est le suivant :

1. **Proposer une EIP Core** : comme décrit dans l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), la première étape pour proposer formellement une modification à Ethereum est de la détailler dans une EIP Core (principale). Cela servira de spécification officielle pour une EIP que les développeurs du protocole mettront en œuvre si elle est acceptée.

2. **Présenter votre EIP aux développeurs du protocole** : une fois que vous avez une EIP Core pour laquelle vous avez recueilli les commentaires de la communauté, vous devez la présenter aux développeurs du protocole. Vous pouvez le faire en la proposant pour discussion lors d'un [appel AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Il est probable que certaines discussions aient déjà eu lieu de manière asynchrone sur le [forum Ethereum Magicians](https://ethereum-magicians.org/) ou sur le [Discord R&D d'Ethereum](https://discord.gg/mncqtgVSVw).

> Les résultats potentiels de cette étape sont :

> - L'EIP sera prise en compte pour une future mise à niveau du réseau
> - Des modifications techniques seront demandées
> - Elle peut être rejetée si elle n'est pas prioritaire ou si l'amélioration n'est pas assez importante par rapport à l'effort de développement

3. **Itérer vers une proposition finale :** après avoir reçu les commentaires de toutes les parties prenantes concernées, vous devrez probablement apporter des modifications à votre proposition initiale pour améliorer sa sécurité ou mieux répondre aux besoins des différents utilisateurs. Une fois que votre EIP aura intégré toutes les modifications que vous jugez nécessaires, vous devrez la présenter à nouveau aux développeurs du protocole. Vous passerez ensuite à l'étape suivante de ce processus, ou de nouvelles préoccupations apparaîtront, nécessitant une nouvelle série d'itérations sur votre proposition.

4. **EIP incluse dans la mise à niveau du réseau** : en supposant que l'EIP soit approuvée, testée et mise en œuvre, elle est programmée dans le cadre d'une mise à niveau du réseau. Étant donné les coûts de coordination élevés des mises à niveau du réseau (tout le monde doit se mettre à niveau simultanément), les EIP sont généralement regroupées dans les mises à niveau.

5. **Mise à niveau du réseau activée** : une fois la mise à niveau du réseau activée, l'EIP sera en ligne sur le réseau Ethereum. _Remarque : les mises à niveau du réseau sont généralement activées sur les réseaux de test avant d'être activées sur le réseau principal Ethereum._

Ce flux, bien que très simplifié, donne un aperçu des étapes importantes pour qu'une modification du protocole soit activée sur Ethereum. Examinons maintenant les facteurs informels en jeu au cours de ce processus.

## Le processus informel {#informal-process}

### Comprendre les travaux antérieurs {#prior-work}

Les défenseurs d'EIP doivent se familiariser avec les travaux et propositions antérieurs avant de créer une EIP qui puisse être sérieusement envisagée pour un déploiement sur le réseau principal Ethereum. De cette façon, l'EIP apporte, espérons-le, quelque chose de nouveau qui n'a pas été rejeté auparavant. Les trois principaux endroits pour faire des recherches à ce sujet sont le [référentiel des EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) et [ethresear.ch](https://ethresear.ch/).

### Groupes de travail {#working-groups}

Il est peu probable que la version initiale d'une EIP soit mise en œuvre sur le réseau principal Ethereum sans modifications ou changements. En général, les défenseurs d'EIP travailleront avec un sous-ensemble de développeurs du protocole pour spécifier, mettre en œuvre, tester, itérer et finaliser leur proposition. Historiquement, ces groupes de travail ont nécessité plusieurs mois (et parfois des années !) de travail. De même, les défenseurs d'EIP pour de tels changements devraient impliquer les développeurs d'applications/d'outils concernés dès le début de leurs efforts afin de recueillir les commentaires des utilisateurs finaux et d'atténuer tout risque de déploiement.

### Consensus de la communauté {#community-consensus}

Bien que certaines EIP soient des améliorations techniques simples avec un minimum de nuances, d'autres sont plus complexes et s'accompagnent de compromis qui affecteront les différentes parties prenantes de différentes manières. Cela signifie que certaines EIP sont plus controversées au sein de la communauté que d'autres.

Il n'y a pas de manuel clair sur la façon de gérer les propositions controversées. C'est le résultat de la conception décentralisée d'Ethereum, selon laquelle aucun groupe de parties prenantes ne peut contraindre l'autre par la force brute : les développeurs du protocole peuvent choisir de ne pas mettre en œuvre les modifications de code ; les opérateurs de nœuds peuvent choisir de ne pas exécuter le dernier client Ethereum ; les équipes d'applications et les utilisateurs peuvent choisir de ne pas effectuer de transactions sur la chaîne. Étant donné que les développeurs du protocole n'ont aucun moyen de forcer les gens à adopter les mises à niveau du réseau, ils éviteront généralement de mettre en œuvre des EIP dont la controverse l'emporte sur les avantages pour la communauté au sens large.

Les défenseurs d'EIP sont censés solliciter les commentaires de toutes les parties prenantes concernées. Si vous vous retrouvez à défendre une EIP controversée, vous devriez essayer de répondre aux objections pour établir un consensus autour de votre EIP. Compte tenu de la taille et de la diversité de la communauté Ethereum, il n'existe pas de mesure unique (par ex., un vote par jeton) qui puisse être utilisée pour évaluer le consensus de la communauté, et les défenseurs d'EIP sont censés s'adapter aux circonstances de leur proposition.

Au-delà de la sécurité du réseau Ethereum, les développeurs du protocole ont historiquement accordé une importance significative à ce que les développeurs d'applications/d'outils et les utilisateurs d'applications valorisent, étant donné que leur utilisation et leur développement sur Ethereum sont ce qui rend l'écosystème attrayant pour les autres parties prenantes. De plus, les EIP doivent être mises en œuvre dans toutes les implémentations de clients, qui sont gérées par des équipes distinctes. Une partie de ce processus consiste généralement à convaincre plusieurs équipes de développeurs du protocole qu'un changement particulier est précieux et qu'il aide les utilisateurs finaux ou résout un problème de sécurité.

<Divider />

## Gérer les désaccords {#disagreements}

Le fait d'avoir de nombreuses parties prenantes avec des motivations et des convictions différentes signifie que les désaccords ne sont pas rares.

Généralement, les désaccords sont traités par de longues discussions sur des forums publics afin de comprendre la racine du problème et de permettre à quiconque de donner son avis. En général, un groupe cède, ou un juste milieu est trouvé. Si un groupe est suffisamment convaincu, forcer un changement particulier pourrait entraîner une scission de la chaîne. Une scission de la chaîne se produit lorsque certaines parties prenantes protestent contre la mise en œuvre d'une modification du protocole, ce qui entraîne le fonctionnement de versions différentes et incompatibles du protocole, d'où émergent deux chaînes de blocs distinctes.

### Le fork de la DAO {#dao-fork}

Les forks se produisent lorsque des mises à niveau ou des modifications techniques majeures doivent être apportées au réseau et modifient les « règles » du protocole. Les [clients Ethereum](/developers/docs/nodes-and-clients/) doivent mettre à jour leurs logiciels pour mettre en œuvre les nouvelles règles du fork.

Le fork de la DAO était une réponse à l'[attaque de la DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack) où un contrat [DAO](/glossary/#dao) non sécurisé a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. Le fork a déplacé les fonds du contrat défectueux vers un nouveau contrat permettant à toute personne ayant perdu des fonds lors du piratage de les récupérer.

Cette ligne de conduite a été votée par la communauté Ethereum. Tout détenteur d'ETH a pu voter via une transaction sur [une plateforme de vote](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La décision de faire un fork a recueilli plus de 85 % des votes.

Il est important de noter que bien que le protocole ait fait un fork pour annuler le piratage, le poids du vote dans la décision de faire un fork est discutable pour plusieurs raisons :

- Le taux de participation au vote était incroyablement bas
- La plupart des gens ne savaient pas que le vote avait lieu
- Le vote ne représentait que les détenteurs d'ETH, et non les autres participants du système

Une partie de la communauté a refusé le fork, en grande partie parce qu'elle estimait que l'incident de la DAO n'était pas un défaut du protocole. Ils ont ensuite formé [Ethereum Classic](https://ethereumclassic.org/).

Aujourd'hui, la communauté Ethereum a adopté une politique de non-intervention en cas de bugs de contrat ou de perte de fonds afin de maintenir la neutralité crédible du système.

Regardez-en plus sur le piratage de la DAO :

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### L'utilité du fork {#forking-utility}

Le fork Ethereum/Ethereum Classic est un excellent exemple de fork sain. Nous avions deux groupes qui étaient suffisamment en désaccord l'un avec l'autre sur certaines valeurs fondamentales pour estimer que cela valait la peine de prendre les risques impliqués pour poursuivre leurs propres lignes de conduite.

La capacité de faire un fork face à des différences politiques, philosophiques ou économiques importantes joue un grand rôle dans le succès de la gouvernance d'Ethereum. Sans la possibilité de faire un fork, l'alternative était des luttes intestines continues, une participation forcée et réticente pour ceux qui ont finalement formé Ethereum Classic et une vision de plus en plus divergente de ce à quoi ressemble le succès pour Ethereum.

<Divider />

## Gouvernance de la chaîne balise {#beacon-chain}

Le processus de gouvernance d'Ethereum sacrifie souvent la vitesse et l'efficacité au profit de l'ouverture et de l'inclusivité. Afin d'accélérer le développement de la chaîne balise, elle a été lancée séparément du réseau Ethereum en preuve de travail (PoW) et a suivi ses propres pratiques de gouvernance.

Bien que les spécifications et les implémentations de développement aient toujours été entièrement open source, les processus formels utilisés pour proposer des mises à jour décrits ci-dessus n'ont pas été utilisés. Cela a permis aux chercheurs et aux implémenteurs de spécifier et de convenir plus rapidement des modifications.

Lorsque la chaîne balise a fusionné avec la couche d'exécution d'Ethereum le 15 septembre 2022, La Fusion a été achevée dans le cadre de la [mise à niveau du réseau Paris](/ethereum-forks/#paris). La proposition [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) est passée de « Dernier appel » à « Finale », achevant la transition vers la preuve d'enjeu (PoS).

<ButtonLink href="/roadmap/merge/">
  Plus d'infos sur La Fusion
</ButtonLink>

<Divider />

## Comment puis-je m'impliquer ? {#get-involved}

- [Proposer une EIP](/eips/#participate)
- [Discuter des propositions actuelles](https://ethereum-magicians.org/)
- [S'impliquer dans les discussions de R&D](https://ethresear.ch/)
- [Rejoindre le Discord R&D d'Ethereum](https://discord.gg/mncqtgVSVw)
- [Gérer un nœud](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuer au développement de clients](/developers/docs/nodes-and-clients/#execution-clients)
- [Programme d'apprentissage pour les développeurs Core](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Complément d'information {#further-reading}

La gouvernance dans Ethereum n'est pas définie de manière rigide. Divers participants de la communauté ont des perspectives différentes à ce sujet. En voici quelques-unes :

- [Notes sur la gouvernance de la chaîne de blocs](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Comment fonctionne la gouvernance d'Ethereum ?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Comment fonctionne la gouvernance d'Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Qu'est-ce qu'un développeur Core d'Ethereum ?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Gouvernance, Partie 2 : La ploutocratie est toujours mauvaise](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Aller au-delà de la gouvernance par vote de jetons](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Comprendre la gouvernance de la chaîne de blocs](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Le gouvernement d'Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_