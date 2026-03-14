---
title: "Miser individuellement votre ETH à domicile"
description: "Un aperçu de la façon de commencer à miser votre ETH à domicile"
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "Leslie le rhinocéros sur sa puce d'ordinateur."
sidebarDepth: 2
summaryPoints:
  - Recevoir directement du protocole un maximum de récompenses pour le maintien de votre validateur en bon état de fonctionnement et en ligne
  - Faites fonctionner votre propre matériel et contribuez ainsi à la sécurité et la décentralisation du réseau Ethereum
  - Supprimez le tiers de confiance et gardez en permanence le contrôle sur vos fonds
---

## Qu'est-ce que la mise en jeu à domicile ? {#what-is-solo-staking}

La mise en jeu à domicile consiste à [faire fonctionner un nœud Ethereum](/run-a-node/) connecté à Internet et à déposer 32 ETH pour activer un [validateur](#faq), ce qui vous donne la possibilité de participer directement au consensus du réseau.

**La mise en jeu à domicile augmente la décentralisation du réseau Ethereum**, ce qui rend Ethereum plus résistant à la censure et plus robuste contre les attaques. D'autres méthodes de mises en jeu peuvent ne pas aider le réseau de la même manière. La mise en jeu à domicile est la meilleure option de mise en jeu pour sécuriser Ethereum.

Un nœud Ethereum se compose à la fois d'un client de couche d’exécution (EL) et d'un client de couche de consensus (CL). Ces clients sont des logiciels qui fonctionnent ensemble, avec un ensemble valide de clés de signature, pour vérifier les transactions et les blocs, attester de la tête correcte de la chaîne, agréger les attestations et proposer des blocs.

Les validateurs à domicile sont responsables du fonctionnement du matériel nécessaire à l'exécution de ces clients. Il est fortement recommandé d'utiliser une machine dédiée à cet effet que vous exploitez depuis votre domicile – c'est extrêmement bénéfique pour la santé du réseau.

Un validateur à domicile reçoit des récompenses directement du protocole pour le maintien de son validateur en bon état de fonctionnement et en ligne.

## Pourquoi effectuer des mises en jeu depuis chez soi ? {#why-stake-solo}

La mise en jeu à domicile demande plus de responsabilités, mais vous donne un contrôle maximal sur vos fonds et votre configuration de mise en jeu.

<CardGrid>
  <Card title="Gagnez de nouveaux ETH" emoji="💸" description="Gagnez des récompenses en ETH directement depuis le protocole lorsque votre validateur est en ligne, sans qu'aucun intermédiaire ne prenne de commission." />
  <Card title="Plein contrôle" emoji="🎛️" description="Conservez vos propres clés. Choisissez la combinaison de clients et de matériel qui vous permet de minimiser vos risques et de contribuer au mieux à la santé et à la sécurité du réseau. Les services de staking tiers prennent ces décisions pour vous, et ils ne font pas toujours les choix les plus sûrs." />
  <Card title="Sécurité du réseau" emoji="🔐" description="Le staking à domicile est la manière la plus percutante de staker. En exécutant un validateur sur votre propre matériel à la maison, vous renforcez la robustesse, la décentralisation et la sécurité du protocole Ethereum." />
</CardGrid>

## Éléments à prendre en compte avant la mise en jeu à domicile {#considerations-before-staking-solo}

Bien que nous souhaitions que la mise en jeu à domicile soit accessible et sans risque pour tout le monde, la réalité est différente. Il y a quelques considérations pratiques et sérieuses à garder à l'esprit avant de choisir de mettre en jeu vos ETH à domicile.

<InfoGrid>
<ExpandableCard title="Lecture indispensable" eventCategory="SoloStaking" eventName="clicked required reading">
Lorsque vous exploitez votre propre nœud, vous devriez consacrer du temps à apprendre à utiliser le logiciel que vous avez choisi. Cela implique de lire la documentation pertinente et d'être à l'écoute des canaux de communication de ces équipes de développeurs.

Mieux vous comprendrez le logiciel que vous exécutez et le fonctionnement de la preuve d'enjeu, moins l'opération sera risquée pour vous en tant que validateur, et plus il sera facile de résoudre les problèmes qui pourraient survenir en cours de route en tant qu'opérateur de nœud.
</ExpandableCard>

<ExpandableCard title="À l'aise avec l'informatique" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuration d'un nœud nécessite un niveau d'aisance raisonnable avec les ordinateurs, bien que de nouveaux outils facilitent ce processus au fil du temps. La compréhension de l'interface de ligne de commande est utile, mais n'est plus strictement requise.

Cela nécessite également une configuration matérielle très basique et une certaine compréhension des spécifications minimales recommandées.
</ExpandableCard>

<ExpandableCard title="Gestion sécurisée des clés" eventCategory="SoloStaking" eventName="clicked secure key management">
De la même manière que les clés privées sécurisent votre adresse Ethereum, vous devrez générer des clés spécifiquement pour votre validateur. Vous devez comprendre comment garder en lieu sûr et sécurisé toute phrase de récupération ou clé privée.{' '}

[Sécurité Ethereum et prévention des arnaques](/security/)
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Le matériel tombe parfois en panne, les connexions réseau connaissent des erreurs et les logiciels clients doivent parfois être mis à niveau. La maintenance des nœuds est inévitable et nécessitera occasionnellement votre attention. Vous voudrez vous assurer de rester au courant de toute mise à niveau réseau anticipée ou de toute autre mise à niveau client critique.
</ExpandableCard>

<ExpandableCard title="Disponibilité fiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vos récompenses sont proportionnelles au temps pendant lequel votre validateur est en ligne et atteste correctement. L'indisponibilité entraîne des pénalités proportionnelles au nombre d'autres validateurs hors ligne au même moment, mais <a href="#faq">n'entraîne pas de délestage</a>. La bande passante a également son importance, car les récompenses sont diminuées pour les attestations qui ne sont pas reçues à temps. Les exigences varient, mais un minimum de 10 Mb/s en débit ascendant et descendant est recommandé.
</ExpandableCard>

<ExpandableCard title="Risque de délestage" eventCategory="SoloStaking" eventName="clicked slashing risk">
Différent des pénalités d'inactivité pour être hors ligne, le <em>délestage</em> est une pénalité beaucoup plus grave réservée aux infractions malveillantes. En exécutant un client minoritaire avec vos clés chargées sur une seule machine à la fois, votre risque d'être délesté est minimisé. Cela étant dit, tous les validateurs doivent être conscients des risques de délestage.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Plus d'informations sur le délestage et le cycle de vie du validateur</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Comment ça marche {#how-it-works}

<StakingHowSoloWorks />

Lorsque vous êtes actif, vous gagnerez des récompenses ETH, qui seront déposées périodiquement dans votre adresse de retrait.

Si vous le souhaitez, vous pouvez quitter votre rôle de validateur, ce qui élimine l'obligation d'être en ligne et arrête toute récompense future. Votre solde restant sera alors retiré à l'adresse de retrait que vous avez désignée lors de la configuration.

[En savoir plus sur les retraits](/staking/withdrawals/)

## Démarrez sur la plateforme de lancement de la mise en jeu {#get-started-on-the-staking-launchpad}

La plateforme de lancement de la mise en jeu est une application open source qui vous aidera à devenir un validateur. Elle vous guidera dans le choix de vos clients, générera vos clés et déposera vos ETH dans le contrat de dépôt de mise en jeu. Une liste de vérification est fournie pour vous assurer que vous avez tout couvert pour configurer votre validateur en toute sécurité.

<StakingLaunchpadWidget />

## Éléments à prendre en compte avec les outils de configuration de nœud et de client {#node-tool-considerations}

Un nombre croissant d'outils et de services vous aident à mettre en jeu vos ETH à domicile, mais chacun comporte des risques et des avantages différents.

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler les points forts ou les faiblesses notables que peut présenter un outil de mise en jeu répertorié. Utilisez cette section comme référence pendant que vous choisissez les outils qui vous aideront dans votre parcours de mise en jeu.

<StakingConsiderations page="solo" />

## Explorer les outils de configuration de nœuds et de clients {#node-and-client-tools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

### Outils de nœud

<StakingProductsCardGrid category="nodeTools" />

Veuillez noter l'importance de choisir un [client minoritaire](/developers/docs/nodes-and-clients/client-diversity/), car cela améliore la sécurité du réseau et limite vos risques. Les outils qui vous permettent de configurer un client minoritaire sont désignés par <em style={{ textTransform: "uppercase" }}>« multi-client ».</em>

### Générateurs de clés

Ces outils peuvent être utilisés comme alternative au [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) pour aider à la génération de clés.

<StakingProductsCardGrid category="keyGen" />

Vous souhaitez suggérer un outil de mise en jeu que nous avons manqué ? Consultez notre [politique de référencement de produits](/contributing/adding-staking-products/) pour voir si cela convient, et pour le soumettre à un examen.

## Explorer les guides de mise en jeu à domicile {#staking-guides}

<StakingGuides />

## Foire aux questions {#faq}

Voici quelques-unes des questions les plus fréquentes relatives à la mise en jeu qui valent la peine d'être connues.

<ExpandableCard title="Qu'est-ce qu'un validateur ?">

Un <em>validateur</em> est une entité virtuelle qui vit sur Ethereum et participe au consensus du protocole Ethereum. Les validateurs sont représentés par un solde, une clé publique et d'autres propriétés. Un <em>client de validateur</em> est le logiciel qui agit au nom du validateur en détenant et en utilisant sa clé privée. Un seul client de validateur peut détenir de nombreuses paires de clés, contrôlant ainsi de nombreux validateurs.
</ExpandableCard>

<ExpandableCard title="Puis-je déposer plus de 32 ETH ?">
Oui, les comptes de validateurs modernes sont capables de contenir jusqu’à 2048 ETH. Les ETH supplémentaires au-delà de 32 s'accumuleront de manière progressive, augmentant par paliers de nombres entiers à mesure que votre solde réel augmente. Ceci est connu sous le nom de <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">solde effectif</a>.

Pour augmenter le solde effectif d’un compte, et donc accroître les récompenses, il faut dépasser une marge de 0,25 ETH au-delà de chaque palier entier en ETH. Par exemple, un compte avec un solde réel de 32,9 ETH et un solde effectif de 32 ETH devrait gagner encore 0,35 ETH pour porter son solde réel au-delà de 33,25 ETH avant de déclencher une augmentation du solde effectif.

Cette marge empêche également le solde effectif de baisser tant qu’il n’est pas descendu de 0,25 ETH en dessous de son solde effectif actuel.

Chaque paire de clés associée à un validateur nécessite au minimum 32  ETH pour être activée. Tout solde au-delà de ce montant peut être retiré à l’adresse de retrait associée à tout moment, via une transaction signée par cette adresse. Tout fonds dépassant le solde effectif maximal sera automatiquement retiré de façon périodique.

Si la mise en jeu à domicile vous semble trop exigeante, envisagez d'utiliser un fournisseur de [mise en jeu en tant que service](/staking/saas/), ou si vous disposez de moins de 32 ETH, consultez les [pools de mise en jeu](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Serai-je délesté si je suis hors ligne ? (En bref : non.)">
Se déconnecter pendant que le réseau se finalise correctement n'entraînera PAS de délestage. De petites <em>pénalités d'inactivité</em> sont encourues si votre validateur n'est pas disponible pour attester pendant une époque donnée (d'une durée de 6,4 minutes chacune), mais cela reste très différent du <em>délestage</em>. Ces pénalités sont légèrement inférieures à la récompense que vous auriez obtenue si le validateur avait été disponible pour attester, et les pertes peuvent être récupérées avec un temps de remise en ligne à peu près équivalent.

Notez que les pénalités d'inactivité sont proportionnelles au nombre de validateurs se trouvant hors ligne en même temps. Dans les cas où une grande partie du réseau est hors ligne en même temps, les pénalités pour chacun de ces validateurs seront plus importantes que lorsqu'un seul validateur est indisponible.

Dans des cas extrêmes, si le réseau cesse de se finaliser parce que plus d'un tiers des valideurs sont hors ligne, ces utilisateurs subiront ce que l'on appelle une <em>fuite d'inactivité quadratique</em>, qui consiste en une fuite exponentielle d'ETH à partir de comptes de valideurs hors ligne. Cela permet au réseau de s'auto-régénérer en brûlant les ETH des validateurs inactifs jusqu'à ce que leur solde atteigne 16 ETH, après quoi ils seront automatiquement éjectés du pool de validateurs. Les validateurs en ligne restants comprendront finalement, à nouveau, 2/3 du réseau, satisfaisant ainsi la supermajorité nécessaire pour finaliser à nouveau la chaîne.
</ExpandableCard>

<ExpandableCard title="Comment m'assurer de ne pas être délesté ?">
En bref, cela ne peut jamais être entièrement garanti, mais si vous agissez de bonne foi, si vous exécutez un client minoritaire et ne conservez vos clés de signature que sur une seule machine à la fois, le risque de subir un délestage est quasi nul.

Seuls quelques moyens spécifiques peuvent aboutir à ce qu'un validateur soit délesté et éjecté du réseau. À l'heure où nous écrivons ces lignes, les délestages qui se sont produits sont exclusivement le produit de configurations matérielles redondantes où les clés de signature sont stockées sur deux machines distinctes à la fois. Cela peut entraîner par inadvertance un <em>double vote</em> de vos clés, ce qui constitue une faute passible de délestage.

L'exécution d'un client supermajoritaire (tout client utilisé par plus de 2/3 du réseau) comporte également le risque d'un délestage potentiel dans le cas où ce client présente un bogue qui entraîne une fourche de la chaîne. Cela peut aboutir à une fourche défectueuse qui sera finalisée. Pour revenir à la chaîne voulue, il faudrait soumettre un <em>vote circulaire</em> en essayant d'annuler un bloc finalisé. Il s'agit également d'une infraction passible de délestage et qui peut être évitée simplement en utilisant un client minoritaire à la place.

Des bogues équivalents dans <em>un client minoritaire ne seraient jamais finalisés</em> et ne donneraient donc jamais lieu à un vote circulaire, et entraîneraient simplement des pénalités d'inactivité, et <em>non un délestage</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">En savoir plus sur l'importance d'exécuter un client minoritaire.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">En savoir plus sur la prévention du délestage</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Quel est le meilleur client ?">
Les clients individuels peuvent varier légèrement en termes de performances et d'interface utilisateur, car ils sont tous développés par des équipes différentes utilisant des langages de programmation variés. Ceci étant dit, aucun d'entre eux n'est « le meilleur ». Tous les clients de production sont d'excellents logiciels, qui exécutent tous les mêmes fonctions de base pour se synchroniser et interagir avec la blockchain.

Puisque tous les clients de production fournissent les mêmes fonctionnalités de base, il est en fait très important que vous choisissiez un <strong>client minoritaire</strong>, c'est-à-dire tout client qui n'est actuellement PAS utilisé par une majorité de validateurs sur le réseau. Cela peut sembler paradoxal, mais le fait d'utiliser un client majoritaire ou supermajoritaire vous expose à un risque accru de délestage en cas de bogue dans ce client. Utiliser un client minoritaire limite considérablement ces risques.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">En savoir plus sur les raisons pour lesquelles la diversité des clients est essentielle</a>
</ExpandableCard>

<ExpandableCard title="Puis-je simplement utiliser un VPS (serveur privé virtuel) ?">
Bien qu'un serveur privé virtuel (VPS) puisse être utilisé en remplacement du matériel domestique, l'accès physique et l'emplacement de votre client validateur <em>ont leur importance</em>. Les solutions cloud centralisées, telles qu'Amazon Web Services ou Digital Ocean, offrent la commodité de ne pas avoir à obtenir et à faire fonctionner du matériel, au détriment de la centralisation du réseau.

Plus il y a de clients validateurs fonctionnant sur une seule solution de stockage en cloud centralisée, plus cela devient dangereux pour ces utilisateurs. Tout événement qui mettrait ces fournisseurs hors ligne, qu'il s'agisse d'une attaque, d'une demande réglementaire ou d'une simple panne de courant ou d'Internet, entraînera la mise hors ligne simultanée de tous les clients de validation qui dépendent de ce serveur.

Les pénalités hors ligne sont proportionnelles au nombre de personnes se trouvant hors ligne au même moment. L'utilisation d'un VPS augmente considérablement le risque que les pénalités pour indisponibilité soient plus sévères, et accroît votre risque de fuite quadratique ou de délestage dans le cas où la panne serait suffisamment importante. Pour minimiser vos propres risques et ceux encourus par le réseau, les utilisateurs sont fortement encouragés à se procurer et à exploiter leur propre matériel.
</ExpandableCard>

<ExpandableCard title="Comment débloquer mes récompenses ou récupérer mes ETH ?">

Les retraits de quelque nature que ce soit de la Chaîne Phare (Beacon Chain) exigent que les identifiants de retrait soient définis.

Les nouveaux validateurs définissent cela au moment de la génération et du dépôt des clés. Les validateurs existants qui n'ont pas encore défini cela peuvent mettre à niveau leurs clés pour prendre en charge cette fonctionnalité.

Une fois que les identifiants de retrait sont définis, les paiements de récompense (ETH cumulés par rapport aux 32 initiaux) seront distribués périodiquement à l'adresse de retrait automatiquement.

Pour déverrouiller et recevoir la totalité de votre solde, vous devez également terminer le processus de sortie de votre validateur.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu</ButtonLink>
</ExpandableCard>

## En savoir plus {#further-reading}

- [L'annuaire de la mise en jeu sur Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Le problème de la diversité des clients d'Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Aider à la diversité des clients](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [La diversité des clients sur la couche de consensus d'Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Comment : Acheter du matériel pour un validateur Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Conseils pour la prévention du délestage sur Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
