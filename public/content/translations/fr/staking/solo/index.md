---
title: Staker vos ETH à domicile
description: Un aperçu de la façon de commencer à staker vos ETH à domicile
lang: fr
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Recevez un maximum de récompenses directement du protocole en maintenant votre validateur en ligne et en bon état de fonctionnement
  - Exécutez du matériel à domicile et contribuez personnellement à la sécurité et à la décentralisation du réseau Ethereum
  - Éliminez le besoin de confiance et ne cédez jamais le contrôle des clés de vos fonds
---

## Qu'est-ce que le staking à domicile ? {#what-is-solo-staking}

Le staking à domicile consiste à [exécuter un nœud Ethereum](/run-a-node/) connecté à Internet et à déposer au moins 32 ETH pour activer un [validateur](#faq), vous donnant la capacité de participer directement au consensus du réseau.

Le staking à domicile est la manière la plus directe de staker. Aucun contrat intelligent, opérateur ou dépositaire ne s'interpose entre vous et le protocole. Vous détenez vos propres clés, participez activement à la validation du réseau [Ethereum](/) et recevez directement les récompenses du réseau. Toute autre méthode de staking ajoute des couches de technologie, de middleware ou de services par-dessus cette activité principale du réseau.

**Le staking à domicile accroît la décentralisation du réseau Ethereum**, rendant Ethereum plus résistant à la censure et plus robuste face aux attaques. Les autres méthodes de staking peuvent ne pas aider le réseau de la même manière. Le staking à domicile est la meilleure option de staking pour sécuriser Ethereum.

Un nœud Ethereum se compose à la fois d'un client de la couche d'exécution (EL) et d'un client de la couche de consensus (CL). Ces clients sont des logiciels qui fonctionnent ensemble, avec un ensemble valide de clés de signature, pour vérifier les transactions et les blocs, attester de la tête correcte de la chaîne, agréger les attestations et proposer des blocs.

Les stakers à domicile sont responsables de l'exploitation du matériel nécessaire pour exécuter ces clients. Il est fortement recommandé d'utiliser une machine dédiée à cet effet que vous exploitez depuis chez vous – cela est extrêmement bénéfique pour la santé du réseau.

Un staker à domicile reçoit des récompenses directement du protocole pour maintenir son validateur en ligne et en bon état de fonctionnement.

## Pourquoi staker depuis chez soi ? {#why-stake-solo}

Le staking à domicile implique plus de responsabilités mais vous offre un contrôle maximal sur vos fonds et votre configuration de staking.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Les stakers à domicile reçoivent 100 % des récompenses du protocole, payées directement par le protocole tant que votre validateur est en ligne." />
  <Card title="Souveraineté personnelle" icon={<KeyRound />} description="Conservez vos propres clés et la garde totale de vos fonds à tout moment. Choisissez la combinaison de clients et de matériel qui vous permet de minimiser vos risques. Aucun tiers ne peut prendre ces décisions à votre place ou restreindre vos retraits." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Les stakers à domicile exécutant des clients minoritaires sur du matériel réparti dans de nombreux endroits renforcent la décentralisation et la sécurité du réseau." />
</Grid>

## Considérations avant de faire du staking à domicile {#considerations-before-staking-solo}

Bien que nous souhaitions que le staking à domicile soit accessible et sans risque pour tous, ce n'est pas la réalité. Il y a des considérations pratiques et sérieuses à garder à l'esprit avant de choisir de staker vos ETH à domicile.

<ExpandableCard title="Lectures requises" eventCategory="SoloStaking" eventName="clicked required reading">
Lorsque vous exploitez votre propre nœud, vous devriez passer du temps à apprendre à utiliser le logiciel que vous avez choisi. Cela implique de lire la documentation pertinente et d'être attentif aux canaux de communication de ces équipes de développement.

Mieux vous comprendrez le logiciel que vous exécutez et le fonctionnement de la preuve d'enjeu (PoS), moins ce sera risqué en tant que staker, et plus il sera facile de résoudre les problèmes qui pourraient survenir en cours de route en tant qu'opérateur de nœud.
</ExpandableCard>

<ExpandableCard title="À l'aise avec les ordinateurs" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuration d'un nœud nécessite un niveau de confort raisonnable avec l'informatique, bien que de nouveaux outils rendent cela plus facile au fil du temps. La compréhension de l'interface en ligne de commande est utile, mais n'est plus strictement requise.

Cela nécessite également une configuration matérielle très basique et une certaine compréhension des spécifications minimales recommandées.
</ExpandableCard>

<ExpandableCard title="Prérequis matériels" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Les directives actuelles de la communauté concernant le matériel et la bande passante du validateur sont maintenues dans les [recommandations sur le matériel et la bande passante (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). À titre indicatif, prévoyez un SSD NVMe de 4 To, 64 Go de RAM (moins peut fonctionner, mais c'est la marge recommandée), un processeur multicœur moderne et solide, et une connexion Internet d'environ 50 Mbps en téléchargement / 25 Mbps en envoi.

Depuis que la mise à jour Fusaka a introduit PeerDAS, un nœud de staking n'a besoin de stocker et de télécharger qu'une fraction des données de blob du réseau, réduisant considérablement les exigences en matière de disque et de bande passante pour les stakers à domicile.
</ExpandableCard>

<ExpandableCard title="Gestion sécurisée des clés" eventCategory="SoloStaking" eventName="clicked secure key management">
Tout comme les clés privées sécurisent votre adresse Ethereum, vous devrez générer des clés spécifiquement pour votre validateur. Vous devez comprendre comment conserver en toute sécurité toute phrase de récupération ou clé privée.{' '}

[Sécurité d'Ethereum et prévention des arnaques](/security/)
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Le matériel tombe parfois en panne, les connexions réseau rencontrent des erreurs et les logiciels clients ont parfois besoin d'être mis à jour. La maintenance du nœud est inévitable et nécessitera occasionnellement votre attention. Vous voudrez vous assurer de rester informé de toute mise à jour anticipée du réseau, ou d'autres mises à jour critiques des clients.
</ExpandableCard>

<ExpandableCard title="Disponibilité fiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vos récompenses sont proportionnelles au temps pendant lequel votre validateur est en ligne et atteste correctement. Les temps d'arrêt entraînent des pénalités proportionnelles au nombre d'autres validateurs hors ligne en même temps, mais [n'entraînent pas de réduction](#faq). La bande passante est également importante, car les récompenses sont diminuées pour les attestations qui ne sont pas reçues à temps. Les exigences varieront, mais les [recommandations actuelles sur le matériel et la bande passante (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) suggèrent environ 50 Mbps en téléchargement et 25 Mbps en envoi.
</ExpandableCard>

<ExpandableCard title="Risque de réduction" eventCategory="SoloStaking" eventName="clicked slashing risk">
À la différence des pénalités d'inactivité pour être hors ligne, la <em>réduction</em> est une pénalité beaucoup plus grave réservée aux infractions malveillantes. En exécutant un client minoritaire avec vos clés chargées sur une seule machine à la fois, votre risque de subir une réduction est minimisé. Cela dit, tous les stakers doivent être conscients des risques de réduction.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> En savoir plus sur la réduction et le cycle de vie du validateur</a>
</ExpandableCard>

## Comparaison des options de staking {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Comment ça marche {#how-it-works}

<StakingHowSoloWorks />

Une fois votre nœud synchronisé et vos clés générées, vous effectuez votre dépôt de staking pour activer votre validateur. Un seul validateur nécessite un minimum de 32 ETH et peut détenir jusqu'à 2048 ETH. Le réseau reconnaît les dépôts en environ 13 minutes, mais les nouveaux validateurs passent par une file d'attente d'activation avant de commencer à attester ; sa longueur varie en fonction de la demande.

Tant qu'il est actif, vous gagnerez des récompenses en ETH. Avec des identifiants de retrait composés (0x02), les récompenses sont ajoutées automatiquement à votre mise ; avec des identifiants de retraits réguliers (0x01), les récompenses supérieures aux 32 ETH initiaux sont périodiquement transférées vers votre adresse de retrait.

Si vous le souhaitez un jour, vous pouvez sortir en tant que validateur, ce qui élimine l'exigence d'être en ligne et arrête toute récompense supplémentaire. Votre solde restant sera ensuite retiré vers l'adresse de retrait que vous avez désignée lors de la configuration. Les sorties peuvent être initiées avec vos clés de signature de validateur, ou déclenchées directement depuis votre adresse de retrait avec une transaction de la couche d'exécution, de sorte que le contrôle ultime de vos fonds repose toujours sur votre adresse de retrait.

### Composition et le maximum de 2048 ETH {#compounding}

Les validateurs ont l'un des deux types d'identifiants de retrait :

- **Retraits réguliers (0x01)** : le solde effectif du validateur est plafonné à 32 ETH, et tout solde supérieur à cela est automatiquement transféré vers votre adresse de retrait tous les quelques jours.
- **Composition (0x02)** : le solde effectif du validateur peut croître jusqu'à 2048 ETH. Les récompenses se composent automatiquement, et vous gagnez des récompenses sur chaque ETH entier au-dessus du minimum de 32 ETH, vous pouvez donc staker des montants flexibles comme 40 ETH, et pas seulement des multiples de 32. Seul le solde supérieur à 2048 ETH est transféré automatiquement ; retirer quoi que ce soit d'autre signifie déclencher manuellement un retrait partiel depuis votre adresse de retrait, ce qui coûte du gaz.

Si vous exécutez plusieurs validateurs, vous pouvez les consolider en un seul validateur composé sans sortir et rentrer dans le réseau, réduisant ainsi vos frais de maintenance. La consolidation est demandée depuis votre adresse de retrait et est soumise à des files d'attente de traitement. Le passage d'un validateur des identifiants 0x01 à 0x02 utilise ce même mécanisme, et **ne peut être inversé** sans sortir complètement et déposer à nouveau.

[En savoir plus sur les retraits de staking](/staking/withdrawals/)

## Démarrer sur le Staking Launchpad {#get-started-on-the-staking-launchpad}

Le Staking Launchpad est une application open source qui vous aidera à devenir un staker. Elle vous guidera dans le choix de vos clients, la génération de vos clés et le dépôt de vos ETH sur le contrat de dépôt de staking. Une liste de contrôle est fournie pour s'assurer que vous avez tout couvert afin de configurer votre validateur en toute sécurité.

<StakingLaunchpadWidget />

## Éléments à prendre en compte avec les outils de configuration de nœud et de client {#node-tool-considerations}

Il existe un nombre croissant d'outils et de services pour vous aider à staker vos ETH à domicile, mais chacun comporte des risques et des avantages différents.

Des indicateurs d'attributs sont utilisés ci-dessous pour signaler les forces ou faiblesses notables qu'un outil de staking répertorié peut avoir. Utilisez cette section comme référence pour la façon dont nous définissons ces attributs pendant que vous choisissez les outils pour vous aider dans votre parcours de staking.

<StakingConsiderations page="solo" />

## Explorer les outils de configuration de nœud et de client {#node-and-client-tools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

### Outils de nœud {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Veuillez noter l'importance de choisir un [client minoritaire](/developers/docs/nodes-and-clients/client-diversity/) car cela améliore la sécurité du réseau et limite vos risques. Les outils qui vous permettent de configurer un client minoritaire sont désignés comme <em style={{ textTransform: "uppercase" }}>"multi-clients".</em>

### Générateurs de clés {#key-generators}

Ces outils peuvent être utilisés comme alternative à la [CLI de dépôt de staking](https://github.com/ethereum/staking-deposit-cli/) pour aider à la génération de clés.

<StakingProductsCardGrid category="keyGen" />

Vous avez une suggestion pour un outil de staking que nous avons manqué ? Consultez notre [politique de référencement de produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à un examen.

## Explorer les guides de staking à domicile {#staking-guides}

<StakingGuides />

## Staking en équipe : staking à domicile avec tolérance aux pannes {#squad-staking}

La **technologie de validateur distribué (DVT)** permet à un seul validateur de s'exécuter sur un cluster de machines au lieu d'une seule. La clé du validateur est divisée en parts à l'aide de la génération de clés distribuées, et un seuil du cluster (par exemple, 3 nœuds sur 4) doit signer ensemble ; la clé complète n'existe jamais sur une seule machine. Si une machine tombe en panne, se déconnecte ou est mal configurée, le reste du cluster maintient l'attestation du validateur.

Pour les stakers à domicile, cela permet le "staking en équipe" : s'associer avec des amis ou d'autres membres de la communauté pour exécuter des validateurs ensemble, supprimant les points de défaillance uniques d'une configuration solo et réduisant le risque de réduction dû à une seule machine défaillante. Obol et SSV Network fournissent tous deux des implémentations DVT en production, utilisées aujourd'hui dans le staking à domicile, le staking en tant que service et les pools de staking.

[En savoir plus sur la technologie de validateur distribué (DVT)](/staking/dvt/)

## Exécuter des validateurs pour un protocole de staking {#run-validators-for-a-staking-protocol}

Si vous avez le matériel et les compétences pour exécuter un nœud mais moins de 32 ETH, certains protocoles de staking associeront votre validateur avec les ETH de leurs stakers mutualisés. Vous déposez une caution plus petite en tant que collatéral et exécutez le validateur sur votre propre machine ; le protocole fournit le reste de la mise, et vous gagnez une part des récompenses.

C'est une approche hybride : vous conservez les responsabilités (et la satisfaction) d'exploiter votre propre matériel, mais votre validateur fonctionne sous les contrats intelligents, la gouvernance et les règles de performance du protocole, ce qui constitue un profil de confiance différent du staking direct de vos propres ETH.

Apprenez-en davantage sur le fonctionnement de ces protocoles, y compris leurs hypothèses de confiance et la mécanique de leurs jetons, sur la [page du staking mutualisé](/staking/pools/).

## D'autres façons d'utiliser votre nœud {#more-ways-to-use-your-node}

Vous n'avez pas du tout besoin de staker pour mettre à profit vos compétences en exploitation de nœud. N'importe qui peut [exécuter un nœud Ethereum](/run-a-node/) sans déposer d'ETH. Vous obtenez une vue auto-vérifiée de la chaîne, votre propre point de terminaison privé pour envoyer des transactions et interagir avec des applications, et vous contribuez à la santé et à la résilience du réseau. L'exécution d'un nœud est également un bon moyen d'acquérir de l'expérience avant d'activer un validateur, sans mettre d'ETH en péril.

<StakingCommunityCallout className="my-16" />

## Foire aux questions {#faq}

Voici quelques-unes des questions les plus courantes sur le staking qu'il est utile de connaître.

<ExpandableCard title="Qu'est-ce qu'un validateur ?">

Un <em>validateur</em> est une entité virtuelle qui vit sur Ethereum et participe au consensus du protocole Ethereum. Les validateurs sont représentés par un solde, une clé publique et d'autres propriétés. Un <em>client validateur</em> est le logiciel qui agit au nom du validateur en détenant et en utilisant sa clé privée. Un seul client validateur peut détenir de nombreuses paires de clés, contrôlant ainsi de nombreux validateurs.

</ExpandableCard>

<ExpandableCard title="Puis-je déposer plus de 32 ETH ?">
Oui. Un validateur avec des identifiants de retrait _composés_ (0x02) peut détenir un solde effectif allant jusqu'à 2048 ETH, tandis que le minimum pour s'activer reste de 32 ETH. Les récompenses sur un validateur composé sont ajoutées automatiquement à sa mise, et il gagne des récompenses sur chaque ETH entier au-dessus du minimum de 32 ETH, vous pouvez donc staker des montants qui ne sont pas des multiples de 32. Voir [Composition et le maximum de 2048 ETH](#compounding).

Les validateurs avec des identifiants de _retraits réguliers_ (0x01) restent plafonnés à un solde effectif de 32 ETH, tout solde supérieur à cela étant automatiquement transféré vers l'adresse de retrait tous les quelques jours.

Pour un validateur composé, seul le solde supérieur au maximum de 2048 ETH est transféré automatiquement. Pour retirer quoi que ce soit en dessous de cela, vous déclenchez un retrait partiel depuis votre adresse de retrait (une transaction qui coûte du gaz), ce qui peut réduire tout solde au-dessus du minimum de 32 ETH. Si vous exécutez plusieurs validateurs, vous pouvez également les consolider en un seul validateur composé sans sortir du réseau.

[En savoir plus sur les retraits de staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Vais-je subir une réduction si je suis hors ligne ? (tldr : Non.)">
Se déconnecter lorsque le réseau se finalise correctement n'entraînera PAS de réduction. De petites <em>pénalités d'inactivité</em> sont encourues si votre validateur n'est pas disponible pour attester pendant une époque donnée (d'une durée de 6,4 minutes chacune), mais cela est très différent de la <em>réduction</em>. Ces pénalités sont légèrement inférieures à la récompense que vous auriez gagnée si le validateur avait été disponible pour attester, et les pertes peuvent être récupérées avec approximativement un temps égal de retour en ligne.

Notez que les pénalités pour inactivité sont proportionnelles au nombre de validateurs hors ligne en même temps. Dans les cas où une grande partie du réseau est hors ligne en même temps, les pénalités pour chacun de ces validateurs seront plus importantes que lorsqu'un seul validateur est indisponible.

Dans des cas extrêmes, si le réseau cesse de se finaliser parce que plus d'un tiers des validateurs sont hors ligne, ces utilisateurs subiront ce que l'on appelle une <em>fuite d'inactivité quadratique</em>, qui est un drainage exponentiel des ETH des comptes de validateurs hors ligne. Cela permet au réseau de s'auto-guérir à terme en brûlant les ETH des validateurs inactifs jusqu'à ce que leur solde atteigne 16 ETH, moment auquel ils seront automatiquement éjectés du pool de validateurs. Les validateurs en ligne restants finiront par représenter à nouveau plus des 2/3 du réseau, satisfaisant la supermajorité nécessaire pour finaliser à nouveau la chaîne.
</ExpandableCard>

<ExpandableCard title="Comment m'assurer de ne pas subir de réduction ?">
En bref, cela ne peut jamais être totalement garanti, mais si vous agissez de bonne foi, exécutez un client minoritaire et ne conservez vos clés de signature que sur une seule machine à la fois, le risque de subir une réduction est presque nul.

Il n'y a que quelques moyens spécifiques pouvant entraîner la réduction et l'éjection d'un validateur du réseau. Au moment de la rédaction, les réductions qui se sont produites ont été exclusivement le produit de configurations matérielles redondantes où les clés de signature sont stockées sur deux machines distinctes en même temps. Cela peut entraîner par inadvertance un <em>double vote</em> de vos clés, ce qui est une infraction passible de réduction.

L'exécution d'un client supermajoritaire (tout client utilisé par plus des 2/3 du réseau) comporte également le risque d'une réduction potentielle dans le cas où ce client aurait un bug qui entraînerait un fork de la chaîne. Cela peut aboutir à un fork défectueux qui est finalisé. Pour revenir à la chaîne prévue, il faudrait soumettre un <em>vote d'encerclement</em> (surround vote) en essayant d'annuler un bloc finalisé. C'est également une infraction passible de réduction et peut être évitée simplement en exécutant un client minoritaire à la place.

Des bugs équivalents dans un <em>client minoritaire ne se finaliseraient jamais</em> et n'entraîneraient donc jamais de vote d'encerclement, et se traduiraient simplement par des pénalités d'inactivité, <em>et non par une réduction</em>.

<ul>
  <li><a href="https://clientdiversity.org/">En savoir plus sur l'importance d'exécuter un client minoritaire.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">En savoir plus sur les récompenses, les pénalités et la réduction</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Quel est le meilleur client ?">
Les clients individuels peuvent varier légèrement en termes de performances et d'interface utilisateur, car chacun est développé par des équipes différentes utilisant une variété de langages de programmation. Cela dit, aucun d'entre eux n'est le « meilleur ». Tous les clients en production sont d'excellents logiciels, qui remplissent tous les mêmes fonctions de base pour se synchroniser et interagir avec la chaîne de blocs.

Puisque tous les clients en production offrent les mêmes fonctionnalités de base, il est en fait très important que vous choisissiez un <strong>client minoritaire</strong>, c'est-à-dire tout client qui n'est PAS actuellement utilisé par une majorité de validateurs sur le réseau. Cela peut sembler contre-intuitif, mais l'exécution d'un client majoritaire ou supermajoritaire vous expose à un risque accru de réduction en cas de bug dans ce client. L'exécution d'un client minoritaire limite considérablement ces risques.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">En savoir plus sur les raisons pour lesquelles la diversité des clients est essentielle</a>
</ExpandableCard>

<ExpandableCard title="Puis-je simplement utiliser un VPS (serveur privé virtuel) ?">
Bien qu'un serveur privé virtuel (VPS) puisse être utilisé en remplacement du matériel domestique, l'accès physique et l'emplacement de votre client validateur <em>sont importants</em>. Les solutions cloud centralisées telles qu'Amazon Web Services ou Digital Ocean offrent la commodité de ne pas avoir à acquérir et à exploiter de matériel, au détriment de la centralisation du réseau.

Plus il y a de clients validateurs exécutés sur une seule solution de stockage cloud centralisée, plus cela devient dangereux pour ces utilisateurs. Tout événement qui met ces fournisseurs hors ligne, que ce soit par une attaque, des exigences réglementaires, ou simplement des pannes de courant/d'Internet, entraînera la mise hors ligne simultanée de chaque client validateur qui dépend de ce serveur.

Les pénalités hors ligne sont proportionnelles au nombre d'autres personnes hors ligne en même temps. L'utilisation d'un VPS augmente considérablement le risque que les pénalités hors ligne soient plus sévères, et augmente votre risque de fuite quadratique ou de réduction dans le cas où la panne est suffisamment importante. Pour minimiser vos propres risques, et les risques pour le réseau, les utilisateurs sont fortement encouragés à acquérir et à exploiter leur propre matériel.
</ExpandableCard>

<ExpandableCard title="Comment débloquer mes récompenses ou récupérer mes ETH ?">

Chaque retrait nécessite que votre validateur ait une adresse de retrait définie. Les nouveaux stakers la définissent au moment de la génération de la clé et du dépôt. Les stakers des premiers jours du réseau qui n'ont pas encore défini d'adresse de retrait devront mettre à jour leurs identifiants de retrait avant de pouvoir retirer.

Pour les validateurs avec des identifiants de retraits réguliers (0x01), les paiements de récompenses (les ETH accumulés au-delà des 32 initiaux) sont périodiquement distribués automatiquement à l'adresse de retrait. Pour les validateurs composés (0x02), les récompenses restent stakées et se composent automatiquement. Vous pouvez retirer tout solde supérieur à 32 ETH en déclenchant un retrait partiel depuis votre adresse de retrait.

Pour débloquer et récupérer l'intégralité de votre solde, vous devez sortir votre validateur. Vous pouvez le faire en utilisant vos clés de signature de validateur, ou le déclencher directement depuis votre adresse de retrait avec une transaction de la couche d'exécution, ce qui signifie que vos fonds restent récupérables même si vos clés de signature sont perdues.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ButtonLink>

## Lectures complémentaires {#further-reading}

- [Statistiques sur la diversité des clients et guides de migration](https://clientdiversity.org/)
- [Aider à la diversité des clients](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversité des clients sur la couche de consensus d'Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Comment faire : Acheter du matériel pour un validateur Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870 : Recommandations sur le matériel et la bande passante](https://eips.ethereum.org/EIPS/eip-7870)
- [La mise à jour Pectra : solde effectif maximal et plus](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />