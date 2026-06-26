---
title: "Staker vos ETH à domicile"
description: "Un aperçu de la façon de commencer à staker vos ETH à domicile"
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "Leslie le rhinocéros sur sa propre puce informatique."
sidebarDepth: 2
summaryPoints:
  - Recevez un maximum de récompenses directement du protocole en maintenant votre validateur en ligne et en bon état de fonctionnement
  - Faites tourner du matériel à domicile et contribuez personnellement à la sécurité et à la décentralisation du réseau Ethereum
  - Éliminez le besoin de confiance et ne cédez jamais le contrôle des clés de vos fonds
---

## Qu'est-ce que le staking à domicile ? {#what-is-solo-staking}

Le staking à domicile consiste à [exécuter un nœud Ethereum](/run-a-node/) connecté à Internet et à déposer 32 ETH pour activer un [validateur](#faq), ce qui vous donne la possibilité de participer directement au consensus du réseau.

**Le staking à domicile augmente la décentralisation du réseau Ethereum**, rendant [Ethereum](/) plus résistant à la censure et plus robuste face aux attaques. D'autres méthodes de staking peuvent ne pas aider le réseau de la même manière. Le staking à domicile est la meilleure option de staking pour sécuriser Ethereum.

Un nœud Ethereum se compose à la fois d'un client de la couche d'exécution (EL) et d'un client de la couche de consensus (CL). Ces clients sont des logiciels qui fonctionnent ensemble, avec un ensemble valide de clés de signature, pour vérifier les transactions et les blocs, attester de la bonne tête de la chaîne, agréger les attestations et proposer des blocs.

Les stakers à domicile sont responsables de l'exploitation du matériel nécessaire pour faire fonctionner ces clients. Il est fortement recommandé d'utiliser une machine dédiée à cet effet que vous exploitez depuis chez vous – cela est extrêmement bénéfique pour la santé du réseau.

Un staker à domicile reçoit des récompenses directement du protocole pour maintenir son validateur en ligne et en bon état de fonctionnement.

## Pourquoi staker à domicile ? {#why-stake-solo}

Le staking à domicile implique plus de responsabilités, mais vous offre un contrôle maximal sur vos fonds et votre configuration de staking.

<Grid>
  <Card title="Gagnez de nouveaux ETH" emoji="💸" description="Gagnez des récompenses libellées en ETH directement depuis le protocole lorsque votre validateur est en ligne, sans qu'aucun intermédiaire ne prenne de commission." />
  <Card title="Contrôle total" emoji="🎛️" description="Conservez vos propres clés. Choisissez la combinaison de clients et de matériel qui vous permet de minimiser vos risques et de contribuer au mieux à la santé et à la sécurité du réseau. Les services de staking tiers prennent ces décisions à votre place, et ils ne font pas toujours les choix les plus sûrs." />
  <Card title="Sécurité du réseau" emoji="🔐" description="Le staking à domicile est la méthode de staking qui a le plus d'impact. En exécutant un validateur sur votre propre matériel chez vous, vous renforcez la robustesse, la décentralisation et la sécurité du protocole Ethereum." />
</Grid>

## Éléments à prendre en compte avant de staker à domicile {#considerations-before-staking-solo}

Bien que nous souhaitions que le staking à domicile soit accessible et sans risque pour tout le monde, ce n'est pas la réalité. Il y a des considérations pratiques et sérieuses à garder à l'esprit avant de choisir de staker vos ETH à domicile.

<ExpandableCard title="Lectures requises" eventCategory="SoloStaking" eventName="clicked required reading">
Lorsque vous exploitez votre propre nœud, vous devriez passer un peu de temps à apprendre à utiliser le logiciel que vous avez choisi. Cela implique de lire la documentation pertinente et d'être attentif aux canaux de communication de ces équipes de développement.

Plus vous comprendrez le logiciel que vous exécutez et le fonctionnement de la preuve d'enjeu (PoS), moins ce sera risqué en tant que staker, et plus il sera facile de résoudre les problèmes qui pourraient survenir en cours de route en tant qu'opérateur de nœud.
</ExpandableCard>

<ExpandableCard title="À l'aise avec l'informatique" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuration d'un nœud nécessite un niveau de confort raisonnable avec l'informatique, bien que de nouveaux outils rendent cela plus facile avec le temps. La compréhension de l'interface en ligne de commande est utile, mais n'est plus strictement requise.

Cela nécessite également une configuration matérielle très basique et une certaine compréhension des spécifications minimales recommandées.
</ExpandableCard>

<ExpandableCard title="Gestion sécurisée des clés" eventCategory="SoloStaking" eventName="clicked secure key management">
Tout comme les clés privées sécurisent votre adresse Ethereum, vous devrez générer des clés spécifiquement pour votre validateur. Vous devez comprendre comment conserver en toute sécurité les phrases mnémotechniques ou les clés privées.{' '}

[Sécurité Ethereum et prévention des arnaques](/security/)
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Le matériel tombe parfois en panne, les connexions réseau rencontrent des erreurs et les logiciels clients ont parfois besoin d'être mis à jour. La maintenance du nœud est inévitable et nécessitera occasionnellement votre attention. Vous voudrez vous assurer de rester informé de toute mise à niveau anticipée du réseau ou d'autres mises à niveau critiques du client.
</ExpandableCard>

<ExpandableCard title="Disponibilité fiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vos récompenses sont proportionnelles au temps pendant lequel votre validateur est en ligne et atteste correctement. Les temps d'arrêt entraînent des pénalités proportionnelles au nombre d'autres validateurs hors ligne en même temps, mais <a href="#faq">n'entraînent pas de réduction</a>. La bande passante compte également, car les récompenses sont diminuées pour les attestations qui ne sont pas reçues à temps. Les exigences varient, mais un minimum de 10 Mb/s en envoi et en réception est recommandé.
</ExpandableCard>

<ExpandableCard title="Risque de réduction" eventCategory="SoloStaking" eventName="clicked slashing risk">
Contrairement aux pénalités d'inactivité pour être hors ligne, la <em>réduction</em> est une pénalité beaucoup plus grave réservée aux infractions malveillantes. En exécutant un client minoritaire avec vos clés chargées sur une seule machine à la fois, votre risque de subir une réduction est minimisé. Cela étant dit, tous les stakers doivent être conscients des risques de réduction.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> En savoir plus sur la réduction et le cycle de vie du validateur</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Comment ça marche {#how-it-works}

<StakingHowSoloWorks />

Pendant que vous êtes actif, vous gagnerez des récompenses en ETH, qui seront périodiquement déposées sur votre adresse de retrait.

Si vous le souhaitez, vous pouvez effectuer une sortie en tant que validateur, ce qui élimine l'obligation d'être en ligne et arrête toute récompense supplémentaire. Votre solde restant sera ensuite retiré vers l'adresse de retrait que vous avez désignée lors de la configuration.

[En savoir plus sur les retraits de staking](/staking/withdrawals/)

## Démarrer sur le Staking Launchpad {#get-started-on-the-staking-launchpad}

Le Staking Launchpad est une application open source qui vous aidera à devenir un staker. Il vous guidera dans le choix de vos clients, la génération de vos clés et le dépôt de vos ETH sur le contrat de dépôt de staking. Une liste de contrôle est fournie pour s'assurer que vous avez tout couvert afin de configurer votre validateur en toute sécurité.

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

Veuillez noter l'importance de choisir un [client minoritaire](/developers/docs/nodes-and-clients/client-diversity/) car cela améliore la sécurité du réseau et limite vos risques. Les outils qui vous permettent de configurer un client minoritaire sont désignés comme <em style={{ textTransform: "uppercase" }}>« multi-clients ».</em>

### Générateurs de clés {#key-generators}

Ces outils peuvent être utilisés comme alternative à la [CLI de dépôt de staking](https://github.com/ethereum/staking-deposit-cli/) pour aider à la génération de clés.

<StakingProductsCardGrid category="keyGen" />

Vous avez une suggestion pour un outil de staking que nous avons manqué ? Consultez notre [politique de référencement des produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à un examen.

## Explorer les guides de staking à domicile {#staking-guides}

<StakingGuides />

## Foire aux questions {#faq}

Voici quelques-unes des questions les plus courantes sur le staking qu'il est utile de connaître.

<ExpandableCard title="Qu'est-ce qu'un validateur ?">

Un <em>validateur</em> est une entité virtuelle qui vit sur Ethereum et participe au consensus du protocole Ethereum. Les validateurs sont représentés par un solde, une clé publique et d'autres propriétés. Un <em>client validateur</em> est le logiciel qui agit au nom du validateur en détenant et en utilisant sa clé privée. Un seul client validateur peut détenir de nombreuses paires de clés, contrôlant ainsi de nombreux validateurs.

</ExpandableCard>

<ExpandableCard title="Puis-je déposer plus de 32 ETH ?">
Oui, les comptes de validateur modernes sont capables de détenir jusqu'à 2048 ETH. Les ETH supplémentaires au-delà de 32 se composeront par paliers, augmentant par incréments de nombres entiers à mesure que votre solde réel augmente. C'est ce qu'on appelle votre <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">solde effectif</a>.

Pour augmenter le solde effectif d'un compte, et ainsi augmenter les récompenses, un tampon de 0,25 ETH au-dessus de tout seuil d'ETH complet doit être franchi. Par exemple, un compte avec un solde réel de 32,9 et un solde effectif de 32 devrait gagner encore 0,35 ETH pour porter son solde réel au-dessus de 33,25 avant de déclencher une augmentation du solde effectif.

Ce tampon empêche également un solde effectif de baisser jusqu'à ce qu'il soit descendu de 0,25 ETH en dessous de son solde effectif actuel.

Chaque paire de clés associée à un validateur nécessite au moins 32 ETH pour être activée. Tout solde supérieur à ce montant peut être retiré vers l'adresse de retrait associée à tout moment via une transaction signée par cette adresse. Tous les fonds dépassant le solde effectif maximum seront automatiquement retirés sur une base périodique.

Si le staking à domicile vous semble trop exigeant, envisagez d'utiliser un fournisseur de [staking en tant que service](/staking/saas/), ou si vous travaillez avec moins de 32 ETH, consultez les [pools de staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Subirai-je une réduction si je suis hors ligne ? (tldr : Non.)">
Se déconnecter lorsque le réseau se finalise correctement n'entraînera PAS de réduction. De petites <em>pénalités d'inactivité</em> sont encourues si votre validateur n'est pas disponible pour attester pour une époque donnée (chacune d'une durée de 6,4 minutes), mais c'est très différent de la <em>réduction</em>. Ces pénalités sont légèrement inférieures à la récompense que vous auriez gagnée si le validateur avait été disponible pour attester, et les pertes peuvent être récupérées avec environ un temps égal de retour en ligne.

Notez que les pénalités pour inactivité sont proportionnelles au nombre de validateurs hors ligne en même temps. Dans les cas où une grande partie du réseau est hors ligne en même temps, les pénalités pour chacun de ces validateurs seront plus importantes que lorsqu'un seul validateur est indisponible.

Dans des cas extrêmes, si le réseau cesse de se finaliser en raison de la mise hors ligne de plus d'un tiers des validateurs, ces utilisateurs subiront ce que l'on appelle une <em>fuite d'inactivité quadratique</em>, qui est un drainage exponentiel d'ETH des comptes de validateurs hors ligne. Cela permet au réseau de s'auto-guérir à terme en brûlant les ETH des validateurs inactifs jusqu'à ce que leur solde atteigne 16 ETH, moment auquel ils seront automatiquement éjectés du pool de validateurs. Les validateurs en ligne restants finiront par représenter à nouveau plus des 2/3 du réseau, satisfaisant ainsi la supermajorité nécessaire pour finaliser à nouveau la chaîne.
</ExpandableCard>

<ExpandableCard title="Comment m'assurer de ne pas subir de réduction ?">
En bref, cela ne peut jamais être totalement garanti, mais si vous agissez de bonne foi, exécutez un client minoritaire et ne conservez vos clés de signature que sur une seule machine à la fois, le risque de subir une réduction est presque nul.

Il n'y a que quelques moyens spécifiques qui peuvent entraîner la réduction et l'éjection d'un validateur du réseau. Au moment de la rédaction de cet article, les réductions qui se sont produites ont été exclusivement le produit de configurations matérielles redondantes où les clés de signature sont stockées sur deux machines distinctes à la fois. Cela peut entraîner par inadvertance un <em>double vote</em> de vos clés, ce qui est une infraction passible de réduction.

L'exécution d'un client supermajoritaire (tout client utilisé par plus des 2/3 du réseau) comporte également le risque d'une réduction potentielle dans le cas où ce client aurait un bug qui entraînerait un fork de la chaîne. Cela peut entraîner la finalisation d'un fork défectueux. Pour revenir à la chaîne prévue, il faudrait soumettre un <em>vote d'encerclement</em> en essayant d'annuler un bloc finalisé. C'est également une infraction passible de réduction et cela peut être évité simplement en exécutant un client minoritaire à la place.

Des bugs équivalents dans un <em>client minoritaire ne se finaliseraient jamais</em> et n'entraîneraient donc jamais de vote d'encerclement, et se traduiraient simplement par des pénalités d'inactivité, <em>pas par une réduction</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">En savoir plus sur l'importance d'exécuter un client minoritaire.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">En savoir plus sur la prévention des réductions</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Quel est le meilleur client ?">
Les clients individuels peuvent varier légèrement en termes de performances et d'interface utilisateur, car chacun est développé par des équipes différentes utilisant une variété de langages de programmation. Cela étant dit, aucun d'entre eux n'est le « meilleur ». Tous les clients de production sont d'excellents logiciels, qui remplissent tous les mêmes fonctions de base pour se synchroniser et interagir avec la chaîne de blocs.

Puisque tous les clients de production offrent les mêmes fonctionnalités de base, il est en fait très important que vous choisissiez un <strong>client minoritaire</strong>, c'est-à-dire tout client qui n'est PAS actuellement utilisé par une majorité de validateurs sur le réseau. Cela peut sembler contre-intuitif, mais l'exécution d'un client majoritaire ou supermajoritaire vous expose à un risque accru de réduction en cas de bug dans ce client. L'exécution d'un client minoritaire limite considérablement ces risques.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">En savoir plus sur les raisons pour lesquelles la diversité des clients est essentielle</a>
</ExpandableCard>

<ExpandableCard title="Puis-je simplement utiliser un VPS (serveur privé virtuel) ?">
Bien qu'un serveur privé virtuel (VPS) puisse être utilisé en remplacement du matériel domestique, l'accès physique et l'emplacement de votre client validateur <em>ont de l'importance</em>. Les solutions cloud centralisées telles qu'Amazon Web Services ou Digital Ocean offrent la commodité de ne pas avoir à obtenir et à exploiter de matériel, au détriment de la centralisation du réseau.

Plus il y a de clients validateurs exécutés sur une seule solution de stockage cloud centralisée, plus cela devient dangereux pour ces utilisateurs. Tout événement qui met ces fournisseurs hors ligne, que ce soit par une attaque, des exigences réglementaires ou simplement des pannes de courant/Internet, entraînera la mise hors ligne simultanée de chaque client validateur qui s'appuie sur ce serveur.

Les pénalités hors ligne sont proportionnelles au nombre d'autres personnes hors ligne en même temps. L'utilisation d'un VPS augmente considérablement le risque que les pénalités hors ligne soient plus sévères, et augmente votre risque de fuite quadratique ou de réduction dans le cas où la panne est suffisamment importante. Pour minimiser votre propre risque, et le risque pour le réseau, les utilisateurs sont fortement encouragés à obtenir et à exploiter leur propre matériel.
</ExpandableCard>

<ExpandableCard title="Comment débloquer mes récompenses ou récupérer mes ETH ?">

Les retraits de toute nature de la chaîne balise nécessitent que les identifiants de retrait soient définis.

Les nouveaux stakers définissent cela au moment de la génération de la clé et du dépôt. Les stakers existants qui ne l'ont pas encore défini peuvent mettre à niveau leurs clés pour prendre en charge cette fonctionnalité.

Une fois les identifiants de retrait définis, les paiements de récompense (ETH accumulés au-delà des 32 initiaux) seront périodiquement distribués automatiquement à l'adresse de retrait.

Pour débloquer et récupérer l'intégralité de votre solde, vous devez également terminer le processus de sortie de votre validateur.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [L'annuaire du staking Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Le problème de la diversité des clients d'Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Aider la diversité des clients](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversité des clients sur la couche de consensus d'Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Comment faire : Acheter du matériel de validateur Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Conseils de prévention des réductions Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />