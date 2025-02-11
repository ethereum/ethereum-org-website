---
title: Miser individuellement votre ETH à domicile
description: Un aperçu de la façon de commencer à miser votre ETH à domicile
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie le rhinocéros sur sa puce d'ordinateur.
sidebarDepth: 2
summaryPoints:
  - Recevoir directement du protocole un maximum de récompenses pour le maintien de votre validateur en bon état de fonctionnement et en ligne
  - Faites fonctionner votre propre matériel et contribuez ainsi à la sécurité et la décentralisation du réseau Ethereum
  - Supprimez le tiers de confiance et gardez en permanence le contrôle sur vos fonds
---

## Qu'est-ce que la mise en jeu à domicile ? {#what-is-solo-staking}

La mise en jeu à domicile consiste à [faire fonctionner un nœud Ethereum](/run-a-node/) connecté à Internet et à déposer 32 ETH pour activer un [validateur](#faq), vous donnant la possibilité de participer directement au consensus du réseau.

**La mise en jeu à domicile augmente la décentralisation du réseau Ethereum**, rendant Ethereum plus résistant à la censure et robuste contre les attaques. D'autres méthodes de mises en jeu peuvent ne pas aider le réseau de la même manière. La mise en jeu à domicile est la meilleure option de staking pour sécuriser Ethereum.

Un nœud Ethereum est constitué à la fois d'un client de couche d'exécution (EL) et d'un client de consensus (CL). Ces clients sont des logiciels qui se coordonnent, avec un ensemble valide de clés de signature, pour vérifier les transactions et les blocs, attester de la tête de la chaîne, agréger les attestations et proposer des blocs.

Les validateurs à domicile sont responsables du fonctionnement du matériel nécessaire à l'exécution de ces clients. Pour cela, il est fortement recommandé d'utiliser une machine dédiée que vous opérez depuis chez vous - c'est extrêmement bénéfique pour la santé du réseau.

Un validateur à domicile reçoit des récompenses directement du protocole pour le maintien de son validateur en bon état de fonctionnement et en ligne.

## Pourquoi miser à domicile ? {#why-stake-solo}

La mise en jeu à domicile demande plus de responsabilités, mais vous donne un contrôle maximal sur vos fonds et votre configuration de mise en jeu.

<CardGrid>
  <Card title="Gagnez de l'ETH frais" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Contrôle total" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Sécurité du réseau" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Considérations avant de miser à domicile {#considerations-before-staking-solo}

Bien que nous souhaitions que la mise en jeu à domicile soit accessible et sans risque pour tout le monde, la réalité est différente. Diverses considérations pratiques et sérieuses sont à garder à l'esprit avant de choisir de miser vos ETH à domicile.

<InfoGrid>
<ExpandableCard title="Lecture nécessaire" eventCategory="SoloStaking" eventName="clicked required reading">
Lorsque vous opérerez votre propre nœud, vous devrez passer du temps à apprendre à utiliser le logiciel que vous avez choisi. Cela implique de lire la documentation adéquate et d'être connecté aux canaux de communication de ses équipes de développeurs.

Mieux vous comprendrez le logiciel que vous exécutez et comment la preuve d'enjeu fonctionne, moins ce sera risqué pour vous, et plus il vous sera facile de résoudre toute sorte de problèmes qui peuvent survenir en tant qu'opérateur de nœud.
</ExpandableCard>

<ExpandableCard title="Aisance en informatique" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuration des nœuds nécessite un niveau d'aisance raisonnable dans le travail avec des ordinateurs, bien que de nouveaux outils apparaissent au fil du temps pour rendre cela plus facile. Comprendre l'interface de ligne commande est utile, mais n'est plus strictement nécessaire.

Il faut également faire un petit peu de configuration matérielle et posséder une certaine compréhension des spécifications minimales recommandées.
</ExpandableCard>

<ExpandableCard title="Gestion des clés sécurisée" eventCategory="SoloStaking" eventName="clicked secure key management">
Tout comme la façon dont les clés privées sécurisent votre adresse Ethereum, vous devrez générer des clés spécifiques pour votre validateur. Vous devez comprendre comment conserver toutes vos phrases de récupération ou vos clés privées en sécurité.{' '}

<a href="/security/">Sécurité d'Ethereum et prévention des escroqueries</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Le matériel tombe parfois en panne, tout comme les connexions réseau, et les logiciels client ont parfois besoin d'être mis à jour. La maintenance des nœuds est inévitable et nécessitera occasionnellement votre attention. Il est préférable de se tenir au courant de toutes les mises à niveau du réseau prévues, ou d'autres mises à jour critiques des logiciels client.
</ExpandableCard>

<ExpandableCard title="Disponibilité fiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vos récompenses sont proportionnelles au temps passé par votre validateur en ligne et au fait qu'il atteste correctement. Tout temps passé hors ligne s'accompagne de pénalités proportionnelles au nombre de validateurs qui se trouvent hors ligne au même moment, mais <a href="#faq">ne donne pas lieu à des sanctions de délestage (slashing)</a>. La bande passante est également un facteur important, car les récompenses sont réduites pour les attestations qui ne sont pas reçues à temps. Les exigences varient, mais un minimum de 10 Mbit/s est recommandé (débits descendant et montant).
</ExpandableCard>

<ExpandableCard title="Risque de sanctions (délestage)" eventCategory="SoloStaking" eventName="clicked slashing risk">
Les <em>sanctions de délestage (slashing)</em> diffèrent des pénalités d'inactivité (applicables si un validateur est hors ligne). Ce sont des pénalités bien plus graves, réservées aux délits ayant un caractère malveillant. Exécuter un client minoritaire en ayant vos clés chargées sur un seul appareil à la fois permet de minimiser le risque de délestage. Cela étant dit, toute personne plaçant des ETH doit être consciente du risque de délestage.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Plus de détails sur le slashing et le cycle de vie du validateur</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Fonctionnement {#how-it-works}

<StakingHowSoloWorks />

Lorsque vous êtes actif, vous gagnerez des récompenses ETH, qui seront déposées périodiquement dans votre adresse de retrait.

Si vous le désirez, vous pouvez vous retirer en tant que validateur, ce qui élimine l'obligation d'être en ligne et met fin à toute autre récompense. Votre solde restant sera alors retiré à l'adresse de retrait que vous avez désignée lors de la configuration.

[En savoir plus sur les retraits de mise en jeu](/staking/withdrawals/)

## Commencer avec la plateforme de lancement de la mise en jeu {#get-started-on-the-staking-launchpad}

La plateforme de lancement de la mise en jeu est une application open source qui vous aidera à devenir un validateur. Elle vous guidera dans le choix de vos clients, génèrera vos clés et déposera vos ETH dans le contrat de dépôt des mises en jeu. Une liste de vérification est fournie pour vous assurer que vous avez fait le tour de la question pour installer votre validateur en toute sécurité.

<StakingLaunchpadWidget />

## Éléments à prendre en compte avec les outils de configuration de nœud et de client {#node-tool-considerations}

Un nombre croissant d'outils et de services vous aident à mettre en jeu vos ETH à domicile, mais chacun comporte des risques et des avantages différents.

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler des forces ou faiblesses notables d'un outil de mise en jeu répertorié. Utilisez cette section comme référence pendant que vous choisissez les outils qui vous aideront dans votre parcours de mise en jeu.

<StakingConsiderations page="solo" />

## Explorer les outils de configuration de noeud et de client {#node-and-client-tools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

### Outils de nœud

<StakingProductsCardGrid category="nodeTools" />

Veuillez noter l'importance de choisir un [client minoritaire](/developers/docs/nodes-and-clients/client-diversity/) , car cela améliore la sécurité du réseau et limite vos risques. Les outils qui permettent de configurer un client minoritaire sont désignés comme <em style={{ textTransform: "uppercase" }}>"multi-client."</em>

### Générateurs de clés

Ces outils peuvent être utilisés en alternative à [l'interface de dépôt de mise en jeu](https://github.com/ethereum/staking-deposit-cli/) pour vous aider à générer vos clés.

<StakingProductsCardGrid category="keyGen" />

Vous souhaitez suggérer un outil de mise en jeu que nous avons manqué ? Consultez notre [politique de liste de produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et le soumettre à examen.

## Explorer les guides de mise en jeu à domicile {#staking-guides}

<StakingGuides />

## Questions fréquemment posées {#faq}

Voici quelques-unes des questions les plus fréquentes relatives à la mise en jeu qui valent la peine d'être connues.

<ExpandableCard title="Qu'est-ce qu'un validateur ?">

Un validateur est une entité virtuelle existant sur Ethereum et participant au consensus du protocole Ethereum. Les validateurs sont représentés par un solde, une clé publique et d'autres propriétés. Un <em>client de validateur</em> est le logiciel qui agit au nom du validateur en détenant et en utilisant sa clé privée. Un même client peut contenir plusieurs paires de clés, contrôlant de nombreux validateurs.

</ExpandableCard>

<ExpandableCard title="Puis-je déposer plus de 32 ETH ?">
Chaque paire de clés associée à un validateur nécessite exactement 32 ETH pour être activée. Déposer plus d'ETH sur un même ensemble de clés n'augmente pas le potentiel de récompense, car chaque validateur est limité à un <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">solde effectif</a> de 32 ETH. Cela signifie que la mise en jeu se fait par tranches de 32 ETH, chacune avec son propre jeu de clés et son propre solde.

Ne déposez pas plus de 32 ETH pour un seul validateur. Cela n'augmentera pas vos récompenses. Si une adresse de retrait a été définie pour le validateur, Les fonds excédentaires de 32 ETH seront automatiquement retirés à cette adresse lors du prochain <a href="/staking/withdrawals/#validator-sweeping">balayage de validateur</a>.

Si la mise en jeu à domicile vous semble trop exigeante, envisagez d'utiliser un fournisseur <a href="/staking/saas/">de mise en jeu en tant que service</a>, ou si vous possédez moins de 32 ETH, consultez <a href="/staking/pools/">les groupes d'enjeu</a>.
</ExpandableCard>

<ExpandableCard title="Vais-je être sanctionné si je me déconnecte ? (tdlr : Non.)">
Se déconnecter pendant que le réseau se finalise correctement n'entraînera PAS de délestage. De petites <em>pénalités d'inactivité</em> sont encourues si votre validateur n'est pas disponible pour attester pendant une période donnée (d'une durée de 6,4 minutes chacune), mais cela reste très différent du <em>délestage</em>. Ces pénalités sont légèrement inférieures à la récompense que vous auriez obtenue si le validateur avait été disponible pour attester, et les pertes peuvent être récupérées avec un temps de remise en ligne à peu près équivalent.

Notez que les pénalités d'inactivité sont proportionnelles au nombre de validateurs se trouvant hors ligne en même temps. Dans les cas où une grande partie du réseau est hors ligne en même temps, les pénalités pour chacun de ces validateurs seront plus importantes que lorsqu'un seul validateur est indisponible.

Dans des cas extrêmes, si le réseau cesse de se finaliser parce que plus d'un tiers des valideurs sont hors ligne, ces utilisateurs subiront ce que l'on appelle une <em>fuite d'inactivité quadratique</em>, qui consiste en une fuite exponentielle d'ETH à partir de comptes de valideurs hors ligne. Cela permet au réseau de s'auto-régénérer en brûlant les ETH des validateurs inactifs jusqu'à ce que leur solde atteigne 16 ETH, après quoi ils seront automatiquement éjectés du pool de validateurs. Les validateurs en ligne restants comprendront finalement, à nouveau, 2/3 du réseau, satisfaisant ainsi la supermajorité nécessaire pour finaliser à nouveau la chaîne.
</ExpandableCard>

<ExpandableCard title="Comment être sûr de ne pas subir de délestage ?">
Pour faire court, cela ne peut jamais être totalement garanti, mais si vous êtes de bonne foi, que vous utilisez un client minoritaire et que vous ne conservez vos clés de signature que sur une seule machine à la fois, le risque de subir un délestage est quasiment nul.

Seuls quelques moyens spécifiques peuvent aboutir à ce qu'un validateur soit délesté et éjecté du réseau. À l'heure où nous écrivons ces lignes, les délestages qui se sont produits sont exclusivement le produit de configurations matérielles redondantes où les clés de signature sont stockées sur deux machines distinctes à la fois. Cela peut entraîner par inadvertance un <em>double vote</em> de vos clés, ce qui constitue une faute sanctionnable.

L'exécution d'un client supermajoritaire (tout client utilisé par plus de 2/3 du réseau) comporte également le risque d'un délestage dans le cas où ce client présente un bogue qui entraîne une fouche de la chaîne. Cela peut aboutir à une fourche défectueuse qui sera finalisée. Pour revenir à la chaîne voulue, il faudrait soumettre un <em>vote circulaire</em> en essayant d'annuler un bloc finalisé. Il s'agit également d'une infraction passible de sanctions et peut être évité simplement, en utilisant, à la place, un client minoritaire.

Des bogues équivalents dans <em>un client minoritaire ne seraient jamais finalisés</em> et ne donneraient donc jamais lieu à un vote circulaire, et entraîneraient simplement des pénalités d'inactivité, et <em>non un délestage</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">En savoir plus sur l'importance de gérer un client minoritaire.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">En savoir plus sur la prévention du délestage</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Quel est le meilleur client ?">
Les clients individuels peuvent varier légèrement en termes de performances et d'interface utilisateur, car ils sont tous développés par des équipes différentes utilisant des langages de programmation variés. Ceci étant dit, aucun d'entre eux n'est "le meilleur". Tous les clients de production sont d'excellents logiciels, qui exécutent tous les mêmes fonctions de base pour se synchroniser et interagir avec la blockchain.

Puisque tous les clients de production fournissent les mêmes fonctionnalités de base, il est en fait très important que vous choisissiez un <strong>client minoritaire</strong>, c'est-à-dire tout client qui n'est actuellement PAS utilisé par une majorité de valideurs sur le réseau. Cela peut sembler paradoxal, mais le fait d'utiliser un client majoritaire ou supermajoritaire vous expose à un risque accru de délestage en cas de bogue dans ce client. Utiliser un client minoritaire limite considérablement ces risques.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">En savoir plus sur les raisons pour lesquelles la diversité des clients est essentielle</a>
</ExpandableCard>

<ExpandableCard title="Puis-je simplement utiliser un VPS (serveur privé virtuel) ?">
Bien qu'un serveur privé virtuel (VPS) puisse être utilisé en remplacement du matériel domestique, l'accès physique et l'emplacement de votre client validateur <em>ont leur importance</em>. Les solutions centralisées dans le cloud, telles que Amazon Web Services ou Digital Ocean, offrent la commodité de ne pas avoir à obtenir et à faire fonctionner du matériel, au détriment de la centralisation du réseau.

Plus il y a de clients validateurs fonctionnant sur une seule solution de stockage en cloud centralisée, plus cela devient dangereux pour ces utilisateurs. Tout événement qui mettrait ces fournisseurs hors ligne, qu'il s'agisse d'une attaque, d'une demande réglementaire ou d'une simple panne de courant ou d'Internet, entraînera la mise hors ligne simultanée de tous les clients de validation qui dépendent de ce serveur.

Les pénalités hors ligne sont proportionnelles au nombre de personnes se trouvant hors ligne au même moment. L'utilisation d'un VPS augmente considérablement le risque de voir les pénalités hors ligne devenir plus sévères, et accroît votre risque de fuite quadratique ou de délestage dans le cas où la panne serait suffisamment importante. Pour minimiser vos propres risques et ceux encourus par le réseau, les utilisateurs sont fortement encouragés à se procurer et à exploiter leur propre matériel.
</ExpandableCard>

<ExpandableCard title="Comment débloquer mes récompenses ou récupérer mon ETH ?">

Les retraits de quelque nature que ce soit de la Chaîne Phare (Beacon Chain) exigent que les identifiants de retrait soient définis.

Les nouvelles personnes plaçant des ETH définissent ceci au moment de la génération et du dépôt de clés. Les stakers existants qui n'ont pas déjà défini cela peuvent mettre à jour leurs clés pour supporter cette fonctionnalité.

Une fois que les identifiants de retrait sont définis, les paiements de récompense (ETH cumulés par rapport aux 32 initiaux) seront distribués périodiquement à l'adresse de retrait automatiquement.

Pour déverrouiller et recevoir la totalité de votre solde, vous devez également terminer le processus de sortie de votre validateur.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu</ButtonLink>
</ExpandableCard>

## Complément d'information {#further-reading}

- [L'Annuaire de la mise en jeu sur Ethereum.](https://www.staking.directory/) - _Eridian and Spacesider_
- [Ethereum's Client Diversity Problem](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Helping Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client diversity on Ethereum's consensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [How To: Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Step by Step: How to join the Ethereum 2.0 Testnet](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
