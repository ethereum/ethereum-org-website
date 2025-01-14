---
title: Gouvernance d'Ethereum
description: Une introduction à la façon dont les décisions concernant Ethereum sont prises.
lang: fr
---

# Introduction à la gouvernance d'Ethereum {#introduction}

_Si personne ne possède Ethereum, comment les décisions concernant les changements passés et futurs sur Ethereum sont-elles prises ? On entend par gouvernance d'Ethereum le processus qui permet de prendre des décisions._

<Divider />

## Qu'est-ce que la gouvernance ? {#what-is-governance}

La gouvernance est le système en place qui permet de prendre des décisions. Dans une structure organisationnelle typique, l'équipe exécutive ou un conseil d'administration peuvent avoir le dernier mot dans la prise de décision. Ou peut-être les actionnaires voteront-ils sur des propositions de changement. Dans un système politique, les élus peuvent promulguer des lois qui tentent de représenter les souhaits de leurs électeurs.

## Gouvernance décentralisée {#decentralized-governance}

Aucune personne ne possède ou ne contrôle le protocole d'Ethereum, mais des décisions doivent encore être prises au sujet de la mise en œuvre des changements afin de garantir au mieux la longévité et la prospérité du réseau. Ce défaut de propriété fait de la gouvernance organisationnelle traditionnelle une solution incompatible.

## Gouvernance d'Ethereum {#ethereum-governance}

La gouvernance d'Ethereum est le processus par lequel des changements de protocole sont apportés. Il est important de souligner que ce processus n'est pas lié à la façon dont les gens et les applications utilisent le protocole - Ethereum est sans permission. N'importe qui depuis n'importe où dans le monde peut participer aux activités sur la blockchain. Il n'y a aucune règle définie pour qui peut ou ne peut pas construire une application ou envoyer une transaction. Cependant, il existe un processus permettant de proposer des modifications au protocole principal, que les applications décentralisées utilisent. Dans la mesure où un très grand nombre de personnes dépendent de la stabilité d'Ethereum, tout changement fondamental apporté à Ethereum, qu'il soit technique ou social, doit être validé par le plus grand nombre afin de s'assurer qu'il soit sûr et largement soutenu par la communauté.

### Gouvernance sur la blockchain vs hors chaîne {#on-chain-vs-off-chain}

La technologie de la blockchain permet de nouvelles capacités de gouvernance, connues sous le nom de gouvernance sur la blockchain. La gouvernance est dite sur sur la blockchain lorsque les modifications proposées au protocole sont décidées par vote des parties prenantes, généralement par les détenteurs d'un jeton de gouvernance, et le vote se produit sur la blockchain. Avec certaines formes de gouvernance on-chain, les modifications de protocole proposées sont déjà écrites dans le code et implémentées automatiquement si les parties prenantes approuvent les changements en signant une transaction.

L'approche opposée, la gouvernance hors chaîne, est celle où toute décision de changement de protocole se fait par le biais d'un processus informel de discussion sociale, qui, s'il est approuvé, sera mis en œuvre dans le code.

**La gouvernance d'Ethereum a lieu hors chaîne** avec une grande variété d'acteurs impliqués dans le processus.

_Bien qu'au niveau du protocole, la gouvernance d'Ethereum est hors chaîne, de nombreux cas d'utilisation basés sur Ethereum, tels que les DAO, utilisent la gouvernance sur la blockchain._

<ButtonLink href="/dao/">
  En savoir plus sur les DAO
</ButtonLink>

<Divider />

## Qui est impliqué ? {#who-is-involved}

Il y a différentes parties prenantes dans la communauté [Ethereum](/community/), chacune jouant un rôle dans le processus de gouvernance. En partant des parties prenantes les plus éloignées du protocole et en zoomant, nous avons :

- **Détenteurs d'Ether** : ces personnes détiennent une quantité arbitraire d'ETH. [Plus d'infos sur ETH](/eth/).
- **Utilisateurs d'application** : ces personnes interagissent avec des applications sur la blockchain Ethereum.
- **Développeurs d'application/d'outils** : ces personnes écrivent des applications qui sont exécutées sur la blockchain Ethereum (p. ex. DeFi, NFTs, etc.) ou des outils de construction pour interagir avec Ethereum (p. ex. portefeuilles, suites de test, etc.). [Plus d'infos sur les dapps](/dapps/).
- **Opérateurs de nœud** : ces personnes exécutent des nœuds qui propagent des blocs et des transactions, rejetant toute transaction invalide ou bloc qu'ils croisent. [Plus d'infos sur les noeud](/developers/docs/nodes-and-clients/).
- **Auteurs des EIPs** : ces personnes proposent des modifications au protocole Ethereum, sous la forme de Propositions d'Amélioration Ethereum (dites EIP). [Plus d'infos sur les EIP](/eips/).
- **Validateurs** : ces personnes exécutent des nœuds qui peuvent ajouter de nouveaux blocs à la blockchain Ethereum.
- **Développeurs de protocole** (a.k.a. « les développeurs principaux » ) : ces personnes maintiennent les différentes implémentations d'Ethereum (ex. go-ethereum, Nethermind, Besu, Erigon, Reth pour la couche d'exécution ou Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine pour la couche de consensus). [Plus de détails sur les clients Ethereum](/developers/docs/nodes-and-clients/).

_Note : Toute personne peut faire partie de plusieurs de ces groupes (par exemple un développeur de protocole peut défendre une EIP, exécuter un validateur de la chaîne phare, et utiliser des applications DeFi). Pour mieux comprendre, il est toutefois plus facile de les distinguer._

<Divider />

## Qu'est-ce qu'une EIP ? {#what-is-an-eip}

Un processus important utilisé dans la gouvernance Ethereum est la proposition de **Propositions d'amélioration Ethereum (EIP)**. Les EIP sont des normes qui spécifient de nouvelles fonctionnalités ou processus potentiels pour Ethereum. N'importe qui au sein de la communauté Ethereum peut créer une EIP. Si vous souhaitez écrire une EIP ou participer à une revue par les pairs, et/ou la gouvernance, voir :

<ButtonLink href="/eips/">
  Plus d'infos les EIP
</ButtonLink>

<Divider />

## Le processus formel {#formal-process}

Le processus formel d'introduction de modifications au protocole Ethereum est le suivant :

1. **Proposer une EIP Coeur** : tel que décrit dans [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), la première étape pour proposer officiellement un changement à Ethereum est de le détailler dans une EIP Coeur. Cela servira de spécification officielle pour une EIP que les développeurs de protocoles mettront en œuvre si elle est acceptée.

2. **Présentez votre EIP aux développeurs de protocole** : une fois que vous avez une EIP Coeur pour laquelle vous avez collecté les retours de la communauté, vous pouvez la présenter aux développeurs de protocoles. Vous pouvez le faire en proposant de la discuter sur un [appel AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Il est probable que certaines discussions auront déjà eu lieu de manière asynchrone sur le forum des [Ethereum Magicians](https://ethereum-magicians.org/) ou dans le [Discord R&D d'Ethereum](https://discord.gg/mncqtgVSVw).

> Les résultats potentiels de cette étape sont :

> - L'EIP sera considérée pour une mise à niveau future du réseau
> - Des modifications techniques seront demandées
> - Elle peut être rejetée si ce n'est pas une priorité ou si l'amélioration n'est pas assez importante par rapport à l'effort de développement

3. **Itérez vers une proposition finale** : après avoir reçu les commentaires de toutes les parties prenantes concernées, vous devrez probablement apporter des modifications à votre proposition initiale pour améliorer sa sécurité ou mieux répondre aux besoins des différents utilisateurs. Une fois que votre EIP aura incorporé tous les changements que vous croyez nécessaires, vous devrez la présenter à nouveau aux développeurs du protocole. Vous passerez ensuite à l'étape suivante de ce processus, ou de nouvelles préoccupations apparaîtront, nécessitant une nouvelle série d'itérations sur votre proposition.

4. **EIP incluse dans la mise à niveau du réseau** : en supposant que l'EIP soit approuvé, testé et implémenté, il est programmé dans le cadre d'une mise à jour réseau. Étant donné les coûts de coordination élevés des mises à niveau réseau (tout le monde a besoin d'une mise à niveau simultanée), les EIP sont généralement regroupées dans les mises à niveau.

5. **Mise à niveau réseau activée**: après l'activation de la mise à niveau réseau, l'EIP sera en ligne sur le réseau Ethereum. _Remarque : Les mises à jour du réseau sont généralement activées sur des réseaux de test avant d'être activées sur le réseau principal Ethereum._

Ce flux, bien que très simplifié, donne une vue d'ensemble des étapes significatives pour l'activation d'un changement de protocole sur Ethereum. Voyons maintenant les facteurs informels en jeu au cours de ce processus.

## Le processus informel {#informal-process}

### Comprendre les travaux antérieurs {#prior-work}

Les Champions EIP devraient se familiariser avec les travaux et les propositions antérieurs avant de créer une EIP qui peut être sérieusement envisagé pour être déployé sur le réseau principal Ethereum. De cette façon, l'EIP apporte quelque chose de nouveau qui n'a pas été rejeté auparavant. Les trois principaux endroits pour effectuer des recherches sont le [dépôt EIP](https://github.com/ethereum/EIPs), [Magiciens Ethereum](https://ethereum-magicians.org/) et [ethresear.ch](https://ethresear.ch/).

### Groupes de travail {#working-groups}

Il est peu probable que le projet initial d'une EIP soit implémenté sur le réseau principal Ethereum sans modifications ou modifications. En général, les champions de l'EIP travailleront avec un sous-ensemble de développeurs de protocoles pour spécifier, mettre en œuvre, tester, étayer et finaliser leur proposition. Historiquement, ces groupes de travail ont nécessité plusieurs mois (et parfois des années !) de travail. De même, les champions de l'EIP pour de tels changements devraient impliquer les développeurs d'applications/d'outils pertinents dans leurs efforts pour rassembler les commentaires des utilisateurs finaux et atténuer tous les risques de déploiement.

### Consensus de la communauté {#community-consensus}

Bien que certaines EIP soient des améliorations techniques simples offrant une nuance minimale, certaines sont plus complexes que d'autres et s'accompagnent de compromis qui affecteront les différentes parties prenantes de différentes manières. Cela signifie que certaines EIP sont plus controversées que d'autres au sein de la communauté.

Il n'y a pas de livre de lecture clair sur la manière de gérer les propositions litigieuses. Cette situation résulte de la conception décentralisée d'Ethereum, par laquelle aucun groupe de parties prenantes ne peut contraindre l'autre par la force brute : les développeurs de protocoles peuvent choisir de ne pas implémenter les changements de code ; les opérateurs de nœuds peuvent choisir de ne pas exécuter le dernier client Ethereum ; les équipes d'applications et les utilisateurs peuvent choisir de ne pas réaliser de transactions sur la chaîne. Puisque les développeurs de protocoles n'ont aucun moyen de forcer les gens à adopter les mises à jour de réseau, ils éviteront généralement de mettre en œuvre des EIP là où le conflits l'emporte sur les avantages pour l'ensemble de la communauté.

Les champions EIP sont censés solliciter des commentaires de tous les intervenants pertinents. Si vous vous trouvez le champion d'une EIP litigieuse, vous devriez essayer de vous adresser à des objections pour établir un consensus autour de votre EIP. Compte tenu de la taille et de la diversité de la communauté Ethereum, il n'y a pas de métrique (par ex. un vote de pièce) qui peut être utilisé pour mesurer le consensus de la communauté, et les champions de l'EIP devraient s'adapter aux circonstances de leur proposition.

Au-delà de la sécurité du réseau Ethereum, un poids significatif a historiquement été accordé par les développeurs de protocole sur la valeur des développeurs d'applications/outils et des utilisateurs d'applications. étant donné que leur utilisation et leur développement sur Ethereum sont ce qui rend l'écosystème attractif pour les autres parties prenantes. De plus, les EIP doivent être implémentées dans toutes les implémentations de clients, qui sont gérées par des équipes distinctes. Une partie de ce processus signifie généralement convaincre plusieurs équipes de développeurs de protocoles qu'un changement particulier est précieux et qu'il aide les utilisateurs finaux ou résout un problème de sécurité.

<Divider />

## Gérer les désaccords {#disagreements}

Avoir de nombreuses parties prenantes ayant des motivations et des croyances différentes signifie que les désaccords ne sont pas rares.

Généralement, les désaccords sont traités avec des discussions de longue durée dans des forums publics pour comprendre la racine du problème et permettre à quiconque de peser. Typiquement, un groupe cède ou un heureux médium est atteint. Si un groupe se sent assez fort, le fait de forcer un changement particulier pourrait entraîner une division de chaînes. Une fracture de chaîne est lorsque certaines parties prenantes protestent de mettre en œuvre un changement de protocole entraînant des différences, versions incompatibles du protocole en opération, d'où émergent deux blockchains distincts.

### La fourche DAO {#dao-fork}

Les fourches sont lorsque des mises à niveau techniques majeures ou des modifications doivent être apportées au réseau et modifier les « règles » du protocole. [Les clients Ethereum](/developers/docs/nodes-and-clients/) doivent mettre à jour leur logiciel pour implémenter les nouvelles règles de la fourche.

La fourche DAO est la réponse à l'attaque [DAO de 2016](https://www.coindesk.com/understanding-dao-hack-journalists) où un contrat non sécurisé d'une [DAO](/glossary/#dao) a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. La fourche a transféré les fonds du contrat défectueux à un nouveau contrat permettant à quiconque a perdu des fonds dans le piratage de les récupérer.

Ce plan d'action a été voté par la communauté Ethereum. Tout détenteur d'ETH a pu voter via une transaction sur [une plateforme de vote](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Plus de 85 % des votes étaient favorables à la fourche.

Il est important de noter qu'alors que le protocole a fait une fourche pour annuler le hack, le poids du vote lors de la décision de la fourche est discutable pour quelques raisons :

- Le taux de participation au vote était incroyablement faible
- La plupart des gens ne savaient pas que le vote se passait
- Le vote ne représentait que les détenteurs de ETH, et non aucun des autres participants au système

Un sous-ensemble de la communauté a refusé de suivre la fourche, en grande partie parce qu'ils ont estimé que l'incident de DAO n'était pas un défaut dans le protocole. Ils ont ensuite formé [Ethereum Classic](https://ethereumclassic.org/).

Aujourd'hui, la communauté Ethereum a adopté une politique de non-intervention en cas de bugs de contrat ou de perte de fonds pour maintenir la neutralité crédible du système.

Regardez-en plus sur le piratage DAO :

<YouTube id="rNeLuBOVe8A" />

<Divider />

### L'utilité de la fourche {#forking-utility}

La fourche Ethereum/Ethereum Classic est un excellent exemple de fourche saine. Nous avons eu deux groupes qui étaient assez en désaccord les uns avec les autres sur certaines valeurs fondamentales pour considérer qu'il valait la peine de prendre les risques que comporte la poursuite de leurs actions spécifiques.

La capacité à faire face à des différences politiques, philosophiques ou économiques significatives joue un rôle important dans le succès de la gouvernance d'Ethereum. Sans la fourche, il y aurait eu des luttes incessantes, une réticence à participer pour ceux qui ont finalement formé Ethereum Classic et une vision de plus en plus divergente de ce qui ferait le succès d'Ethereum.

<Divider />

## Gouvernance de la Chaîne phare {#beacon-chain}

Le processus de gouvernance Ethereum négocie souvent la vitesse et l'efficacité pour l'ouverture et l'inclusivité. Afin d'accélérer le développement de la chaîne phare, elle fût lancée séparément du réseau Ethereum par preuve de travail et a suivi ses propres pratiques de gouvernance.

Bien que le développement des spécifications et des implémentations ait toujours été entièrement Open Source, les processus formels utilisés pour proposer les mises à jour décrites ci-dessus n'ont pas été utilisés. Cela a permis de préciser les changements et de parvenir plus rapidmement à un accord entre chercheurs et développeurs.

Lorsque la Chaîne Phare a fusionné avec la couche d'exécution Ethereum le 15 septembre 2022, La Fusion s'est achevée à travers [la mise à jour Paris](/history/#paris). La proposition [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) est passée de 'Dernier appel' à 'Final', achevant ainsi la transition vers la preuve d'enjeu.

<ButtonLink href="/roadmap/merge/">
  Plus d'infos sur la fusion
</ButtonLink>

<Divider />

## Comment s'impliquer ? {#get-involved}

- [Proposer une EIP](/eips/#participate)
- [Discuter des propositions actuelles](https://ethereum-magicians.org/)
- [Impliquez-vous dans la discussion R&D](https://ethresear.ch/)
- [Rejoignez le Discord Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Exécuter un nœud](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuer au développement du client](/developers/docs/nodes-and-clients/#execution-clients)
- [Programme d’apprentissage pour les développeurs de base](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Complément d'information {#further-reading}

La gouvernance d'Ethereum n'est pas rigoureusement définie. Divers participants de la communauté ont des points de vue différents à ce sujet. Voici quelques-unes d'entre elles :

- [Notes sur la gouvernance de la Blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Comment fonctionne la gouvernance Ethereum ?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Comment fonctionne la gouvernance Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Qu'est-ce qu'un développeur de base Ethereum ?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Gouvernance, partie 2 : La ploutocratie est toujours mauvaise](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Aller au-delà de la gouvernance du vote par jeton](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
