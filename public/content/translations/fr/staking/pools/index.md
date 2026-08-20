---
title: Staking liquide et mutualisé
description: Un aperçu du staking liquide et mutualisé sur Ethereum
lang: fr
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Stakez et gagnez des récompenses avec n'importe quel montant d'ETH en unissant vos forces avec d'autres
  - Évitez la partie difficile et confiez l'opération du validateur à un tiers
  - Conservez des jetons de staking liquide dans votre propre portefeuille
---

## Que sont les pools de staking ? {#what-are-staking-pools}

Les pools de staking sont une approche collaborative permettant à de nombreuses personnes possédant de plus petites quantités d'ETH d'obtenir le minimum de 32 ETH requis pour activer un validateur sur [Ethereum](/). La fonctionnalité de mutualisation n'est pas prise en charge nativement au sein du protocole, des solutions ont donc été développées séparément pour répondre au besoin de participer avec de plus petits montants.

Certains pools de staking fonctionnent à l'aide de contrats intelligents, où les fonds sont déposés sur un contrat qui gère et suit votre mise, et vous émet un jeton de reçu (jeton de staking liquide) qui représente cette valeur. D'autres pools peuvent ne pas impliquer de contrats intelligents et sont plutôt gérés hors chaîne.

Les options mutualisées diffèrent énormément quant à ce que vous pouvez vérifier à leur sujet. Les pools transparents, régis par un protocole, sont des contrats intelligents open source sur Ethereum qui détiennent les dépôts, publient leurs ensembles d'opérateurs de nœuds et émettent un jeton échangeable ; tout ce qui soutient votre position est visible onchain. Les produits mutualisés opaques, tels que certains programmes de rendement d'échanges centralisés, prennent vos ETH en garde, et vous ne pouvez pas vérifier indépendamment ce qui est staké en votre nom, le cas échéant. La majeure partie de cette page couvre le premier type ; voir les [produits mutualisés opaques](#opaque-pooled-products) pour savoir comment faire la différence.

Chaque option mutualisée résout le véritable problème d'accès au staking avec moins de 32 ETH, ou sans exécuter de matériel. Mais chacune place également un intermédiaire entre le staker et le protocole Ethereum de base. Seul le [staking en solo](/staking/solo/) vous offre une relation directe et sans intermédiaire avec Ethereum.

## Pourquoi staker avec un pool ? {#why-stake-with-a-pool}

En plus des avantages de [participer au staking](/staking/), le staking avec un pool s'accompagne d'un certain nombre d'avantages uniques.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Vous n'êtes pas une baleine ? Aucun problème. La plupart des pools de staking vous permettent de staker pratiquement n'importe quel montant d'ETH en unissant vos forces avec d'autres stakers, contrairement au staking en solo qui nécessite 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Le staking avec un pool est aussi simple qu'un échange de jetons. Pas besoin de vous soucier de la configuration du matériel et de la maintenance des nœuds. Les pools vous permettent de déposer vos ETH, ce qui permet aux opérateurs de nœuds d'exécuter des validateurs. Les récompenses sont ensuite distribuées aux contributeurs, moins des frais pour les opérations des nœuds." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="De nombreux pools de staking fournissent un jeton qui représente une réclamation sur vos ETH stakés et les récompenses qu'ils génèrent. Cela vous permet d'utiliser vos ETH stakés, par exemple, comme collatéral dans des applications de finance décentralisée (DeFi)." />
</Grid>

## Comparaison des options de staking {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Jetons de staking liquide {#liquid-staking-tokens}

La plupart des pools de staking transparents émettent un **jeton de staking liquide (LST)**, un jeton ERC-20 qui représente une réclamation sur les ETH stakés et les récompenses qu'ils génèrent. Lorsque vous déposez des ETH, le protocole les stake avec ses opérateurs de nœuds et frappe un jeton de reçu (LST) dans votre portefeuille. Vous pouvez conserver le jeton vous-même ou le confier à un fournisseur tiers, et vous pouvez transférer ou vendre le jeton à tout moment. L'ETH sous-jacent reste staké sur la couche de consensus. Les protocoles de staking liquide représentent environ un tiers de tous les ETH stakés, faisant des LST l'un des moyens les plus courants de staker aujourd'hui.

### Comment les récompenses apparaissent dans le jeton {#how-rewards-show-up-in-the-token}

Les LST reflètent les récompenses de staking de l'une des deux manières suivantes :

- **Jetons à rebasage** (comme le stETH de Lido) : le solde de vos jetons augmente à mesure que les récompenses s'accumulent, de sorte qu'un jeton reste à peu près égal en valeur à un ETH.
- **Jetons à taux de change** (comme le rETH de Rocket Pool) : le solde de vos jetons reste le même, mais chaque jeton devient échangeable contre une quantité croissante d'ETH au fil du temps.

Les deux conceptions distribuent des récompenses nettes des frais du protocole de staking. Aucune n'est intrinsèquement meilleure, mais elles se comportent différemment dans les portefeuilles et les applications de finance décentralisée (DeFi), et sont traitées différemment à des fins fiscales dans certaines juridictions. Les jetons à rebasage ont souvent des versions « enveloppées » (wrapped) sans rebasage pour des raisons de compatibilité avec les applications de [DeFi](/glossary/#defi).

### Échange et trading {#redeeming-and-trading}

Il existe deux façons de sortir d'une position LST :

- **Échanger via le protocole** contre l'ETH sous-jacent. L'échange dépend de la liquidité disponible du protocole, soit un tampon d'ETH non stakés, soit des validateurs sortant par la file d'attente de sortie de la couche de consensus, ce qui peut prendre du temps.
- **Vendre sur les marchés secondaires** à tout moment. Étant donné que le jeton se négocie librement, son prix de marché peut s'écarter de la valeur de l'ETH qui le soutient, en particulier pendant les périodes de tension sur les marchés.

Depuis la mise à jour Pectra, les [retraits déclenchés par la couche d'exécution (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permettent de déclencher les sorties de validateurs directement depuis la couche d'exécution par le détenteur de l'adresse de retrait. Les protocoles de staking peuvent utiliser cette fonctionnalité pour s'assurer que leurs validateurs peuvent sortir sans dépendre de la coopération des opérateurs de nœuds, de sorte que les échanges dépendent moins de la confiance envers les opérateurs de nœuds qu'auparavant.

### Détenir un LST n'est pas la même chose que staker {#holding-an-lst-is-not-the-same-as-staking}

Le protocole Ethereum verse des récompenses aux validateurs ; il ne sait pas que votre jeton existe. Lorsque vous détenez un LST, vous n'êtes pas un staker du point de vue du protocole. Au lieu de cela, vous détenez une réclamation sur un service ou un contrat intelligent qui stake en votre nom. Cela fonctionne bien dans des conditions normales, mais cela s'accompagne de dépendances de confiance supplémentaires. Vos ETH stakés dépendent du bon fonctionnement des contrats, de la gouvernance et des opérateurs du pool, et pas seulement d'Ethereum lui-même.

## Risques des jetons de staking liquide {#risks-of-liquid-staking-tokens}

Les LST héritent des risques sous-jacents du staking (tels que la réduction et les pénalités d'indisponibilité sur les validateurs du pool) et ajoutent leurs propres couches :

- **Risque lié aux contrats intelligents** - vos ETH sont détenus par des contrats qui pourraient contenir des bugs ou être exploités. Privilégiez les protocoles avec un code open source, audité et éprouvé.
- **Risque de marché et de liquidité** - le prix du jeton sur le marché secondaire peut chuter en dessous de la valeur de l'ETH qui le soutient (« depegging » ou perte d'ancrage). Si les échanges du protocole sont lents ou congestionnés lorsque vous souhaitez sortir, vendre à prix réduit peut être votre seule sortie rapide.
- **Risque de gouvernance et de mise à jour** - les frais, les ensembles d'opérateurs de nœuds et même le fonctionnement du jeton peuvent être modifiés via la gouvernance du protocole et les mises à jour des contrats. En tant que détenteur de jetons, vous n'avez généralement aucun vote dans cette gouvernance.
- **Centralisation de l'ensemble des opérateurs** - certains pools concentrent la mise avec les opérateurs de nœuds qu'ils ont choisis. De grandes quantités d'ETH stakés sous le contrôle de quelques organisations créent des conditions propices à la censure, à l'extraction de valeur et à des points de défaillance uniques. Préférez les pools avec des ensembles d'opérateurs distribués et sans permission.
- **Répercussion de la réduction** - si les validateurs du pool subissent une réduction ou sont pénalisés, la perte est généralement socialisée entre tous les détenteurs de jetons selon les règles du protocole.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
De nombreux pools réduisent le risque lié aux opérateurs en utilisant la **technologie de validateur distribué (DVT)**, un middleware qui divise la clé d'un validateur sur plusieurs machines et opérateurs afin qu'aucune défaillance ou compromission unique ne mette le validateur hors service. [En savoir plus sur la technologie de validateur distribué](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Produits mutualisés opaques {#opaque-pooled-products}

Tout ce qui est commercialisé sous le nom de « staking » n'est pas du staking de protocole. Les programmes « earn » (gains) ou « rewards » (récompenses) des échanges centralisés, et certains produits de rendement construits sur des jetons de staking, mutualisent les ETH des clients d'une manière que vous ne pouvez pas inspecter :

- **Garde (Custodial)** - le fournisseur détient les clés de retrait et les ETH.
- **Les conditions peuvent changer** - les taux, les blocages et l'éligibilité sont définis par la politique de l'entreprise et peuvent être révisés à tout moment, contrairement aux règles appliquées par les contrats onchain.
- **Peut ne pas être du staking du tout** - en interne, le rendement peut provenir de prêts, de trading ou d'autres activités plutôt que de validateurs. Vous n'avez généralement aucun moyen de le vérifier.
- **Risque de contrepartie** - si le fournisseur devient insolvable ou gèle les retraits, il n'y a rien onchain que vous puissiez échanger.

Pour distinguer un pool transparent d'un produit opaque, demandez-vous :

1. Pouvez-vous vérifier onchain où vont vos ETH, dans des contrats open source et audités ?
2. L'ensemble des opérateurs de nœuds est-il publié ?
3. Recevez-vous un jeton détenu dans votre propre portefeuille qui est échangeable contre l'ETH sous-jacent ?
4. Les règles sont-elles appliquées par des contrats intelligents et une gouvernance publique, ou par les conditions de service d'une entreprise ?

Plus un fournisseur ne peut répondre à ces questions que par « faites-nous confiance », plus le produit est opaque.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Certains produits annoncent un rendement « amélioré » ou « boosté » en combinant le staking avec le **restaking**, un cas d'utilisation des LST qui engage les ETH stakés pour sécuriser des protocoles supplémentaires sous des conditions de réduction supplémentaires. Le restaking est une catégorie de risque distincte et une application novatrice construite sur les LST, et non une forme de participation directe au staking. Si un chiffre de rendement est significativement plus élevé que le taux de staking du réseau principal, vous devriez demander exactement d'où vient le rendement supplémentaire. [Qu'est-ce que le restaking ?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Exécuter un nœud pour un pool {#run-a-node-for-a-pool}

Devenir un opérateur de nœud cautionné pour un pool de staking est une voie intermédiaire entre la détention d'un jeton et le staking en solo. Certains protocoles de staking permettent aux individus d'exécuter des validateurs en utilisant les ETH mutualisés d'autres utilisateurs. Vous déposez une caution de vos propres ETH comme collatéral, exécutez le matériel et les clés, et gagnez une commission sur la mise qui vous est attribuée.

Par exemple, les validateurs megapool de Rocket Pool nécessitent une caution de 4 ETH par validateur, et le module de staking communautaire de Lido nécessite environ 2,4 ETH pour une première clé de validateur (1,5 ETH pour les stakers communautaires identifiés). Cela offre aux personnes possédant moins de 32 ETH un moyen d'exécuter leur propre matériel et de renforcer l'ensemble des opérateurs du réseau, tout en acceptant les règles, les exigences de performance et les conditions de pénalité du pool.

## Éléments à prendre en compte {#what-to-consider}

Chaque pool et les outils ou contrats intelligents qu'ils utilisent ont été développés par différentes équipes, et chacun comporte des avantages et des risques. Le staking mutualisé ou délégué n'est pas pris en charge nativement par le protocole Ethereum, et la référence absolue en matière de staking devrait toujours être des individus exécutant des validateurs sur leur propre matériel chaque fois que possible.

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler les forces ou faiblesses notables qu'un pool de staking répertorié peut avoir. Utilisez cette section comme référence pour la façon dont nous définissons ces attributs pendant que vous choisissez un pool à rejoindre.

<StakingConsiderations page="pools" />

## Explorer les pools de staking {#explore-staking-pools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Veuillez noter l'importance de choisir un service qui prend la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) au sérieux, car cela améliore la sécurité du réseau et limite vos risques. Les services qui ont prouvé qu'ils limitaient l'utilisation de clients majoritaires sont indiqués par <em style={{ textTransform: "uppercase" }}>« diversité des clients d'exécution »</em> et <em style={{ textTransform: "uppercase" }}>« diversité des clients de consensus ».</em>

Vous avez une suggestion pour un outil de staking que nous avons manqué ? Consultez notre [politique de référencement des produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à un examen.

<StakingCommunityCallout className="my-16" />

## Foire aux questions {#faq}

<ExpandableCard title="Comment puis-je gagner des récompenses ?">
Généralement, les jetons de staking liquide ERC-20 sont émis aux stakers et représentent la valeur de leurs ETH stakés plus les récompenses. Les récompenses vous parviennent de l'une des deux manières suivantes selon la conception du jeton : les jetons à rebasage augmentent le solde de vos jetons à mesure que les récompenses s'accumulent, tandis que les jetons à taux de change maintiennent votre solde fixe et deviennent échangeables contre plus d'ETH au fil du temps. Dans les deux cas, les récompenses sont distribuées nettes des frais du pool.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ma mise ?">
Les retraits de staking sont activés depuis la mise à jour Shanghai/Capella en avril 2023. Les comptes de validateurs qui soutiennent les pools de staking peuvent sortir et retirer des ETH vers leur adresse de retrait désignée, ce qui vous permet d'échanger votre part de mise contre l'ETH sous-jacent. La vitesse d'échange dépend de la liquidité disponible de votre pool et de la file d'attente de sortie de la couche de consensus. Vérifiez auprès de votre fournisseur pour voir comment il prend en charge cette fonctionnalité.

Depuis la mise à jour Pectra, les pools peuvent également utiliser les retraits déclenchés par la couche d'exécution (EIP-7002) pour sortir les validateurs directement depuis l'adresse de retrait, sans dépendre des clés de signature des opérateurs de nœuds, réduisant ainsi la confiance requise pour que les échanges soient honorés.

Alternativement, les pools qui utilisent un jeton de staking liquide ERC-20 permettent aux utilisateurs de négocier ce jeton sur le marché libre, vous permettant de vendre votre position de staking, « retirant » ainsi efficacement sans réellement retirer d'ETH du contrat de staking. Notez que le prix du marché peut différer de la valeur d'échange du jeton.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="Est-ce différent du staking avec ma plateforme d'échange ?">
Il existe de nombreuses similitudes entre ces options de staking mutualisé et les échanges centralisés, telles que la possibilité de staker de petites quantités d'ETH et de les regrouper pour activer des validateurs.

Contrairement aux échanges centralisés, de nombreuses autres options de staking mutualisé utilisent des contrats intelligents et/ou des jetons de staking liquide, qui sont généralement des jetons ERC-20 pouvant être détenus dans votre propre portefeuille, et achetés ou vendus comme n'importe quel autre jeton. Cela offre une couche de souveraineté et de sécurité en vous donnant le contrôle de vos jetons, mais ne vous donne toujours pas de contrôle direct sur le client validateur qui atteste en votre nom en arrière-plan.

Les programmes « earn » des échanges sont également sous garde et régis par les conditions de l'entreprise plutôt que par des règles onchain, et leur rendement peut ne pas provenir du tout du staking de protocole. Voir les [produits mutualisés opaques](#opaque-pooled-products) pour savoir comment faire la différence.

Certaines options de mutualisation sont plus décentralisées que d'autres en ce qui concerne les nœuds qui les soutiennent. Pour promouvoir la santé et la décentralisation du réseau, les stakers sont toujours encouragés à sélectionner un service de mutualisation qui permet un ensemble décentralisé et sans permission d'opérateurs de nœuds.
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [L'annuaire du staking Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Les risques des dérivés de staking liquide](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Qu'est-ce que le staking liquide ?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002 : Retraits déclenchables par la couche d'exécution](https://eips.ethereum.org/EIPS/eip-7002) - _Propositions d'amélioration d'Ethereum (EIP)_
- [Évaluations des pools de staking Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [Quelle est la différence entre un jeton de restaking liquide (LRT) et un jeton de staking liquide (LST) ?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_