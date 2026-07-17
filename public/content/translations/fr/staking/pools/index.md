---
title: "Staking mutualisé"
description: En savoir plus sur les pools de staking
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Leslie le rhinocéros nageant dans la piscine."
sidebarDepth: 2
summaryPoints:
  - Stakez et gagnez des récompenses avec n'importe quel montant d'ETH en unissant vos forces à celles d'autres personnes
  - Évitez la partie difficile et confiez l'opération du validateur à un tiers
  - Conservez les jetons de staking dans votre propre portefeuille
---

## Que sont les pools de staking ? {#what-are-staking-pools}

Les pools de staking sont une approche collaborative permettant à de nombreuses personnes possédant de petites quantités d'ETH d'obtenir les 32 ETH requis pour activer un ensemble de clés de validateur. La fonctionnalité de mutualisation n'est pas prise en charge nativement par le protocole, des solutions ont donc été développées séparément pour répondre à ce besoin.

Certains pools fonctionnent à l'aide de contrats intelligents, où les fonds peuvent être déposés sur un contrat qui gère et suit votre mise sans nécessiter de confiance, et vous émet un jeton qui représente cette valeur. D'autres pools peuvent ne pas impliquer de contrats intelligents et sont plutôt gérés hors chaîne.

## Pourquoi staker avec un pool ? {#why-stake-with-a-pool}

En plus des avantages que nous avons soulignés dans notre [introduction au staking](/staking/), le staking avec un pool présente un certain nombre d'avantages distincts.

<Grid>
  <Card title="Faible barrière à l'entrée" emoji="🐟" description="Vous n'êtes pas une baleine ? Aucun problème. La plupart des pools de staking vous permettent de staker pratiquement n'importe quel montant d'ETH en unissant vos forces à celles d'autres stakers, contrairement au staking en solo qui nécessite 32 ETH." />
  <Card title="Stakez dès aujourd'hui" emoji=":stopwatch:" description="Le staking avec un pool est aussi simple qu'un échange de jetons. Pas besoin de vous soucier de la configuration matérielle et de la maintenance des nœuds. Les pools vous permettent de déposer vos ETH, ce qui permet aux opérateurs de nœuds d'exécuter des validateurs. Les récompenses sont ensuite distribuées aux contributeurs, moins des frais pour les opérations des nœuds." />
  <Card title="Jetons de staking" emoji=":droplet:" description="De nombreux pools de staking fournissent un jeton qui représente une créance sur vos ETH stakés et les récompenses qu'ils génèrent. Cela vous permet d'utiliser vos ETH stakés, par exemple comme garantie dans des applications de DeFi." />
</Grid>

<StakingComparison page="pools" />

## Éléments à prendre en compte {#what-to-consider}

Le staking mutualisé ou délégué n'est pas pris en charge nativement par le protocole [Ethereum](/), mais compte tenu de la demande des utilisateurs pour staker moins de 32 ETH, un nombre croissant de solutions ont été développées pour répondre à cette demande.

Chaque pool et les outils ou contrats intelligents qu'ils utilisent ont été développés par différentes équipes, et chacun présente des avantages et des risques. Les pools permettent aux utilisateurs d'échanger leurs ETH contre un jeton représentant les ETH stakés. Le jeton est utile car il permet aux utilisateurs d'échanger n'importe quel montant d'ETH contre un montant équivalent d'un jeton de rendement qui génère un retour à partir des récompenses de staking appliquées aux ETH stakés sous-jacents (et vice versa) sur des échanges décentralisés, même si les ETH réels restent stakés sur la couche de consensus. Cela signifie que les échanges dans les deux sens entre un produit d'ETH staké à rendement et de l'« ETH brut » sont rapides, faciles et ne sont pas seulement disponibles en multiples de 32 ETH.

Cependant, ces jetons d'ETH stakés ont tendance à créer des comportements de type cartel où une grande quantité d'ETH stakés se retrouve sous le contrôle de quelques organisations centralisées plutôt que répartie entre de nombreux individus indépendants. Cela crée des conditions propices à la censure ou à l'extraction de valeur. La référence absolue en matière de staking devrait toujours être des individus exécutant des validateurs sur leur propre matériel chaque fois que possible.

[En savoir plus sur les risques liés aux jetons de staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler les forces ou faiblesses notables qu'un pool de staking répertorié peut avoir. Utilisez cette section comme référence pour la façon dont nous définissons ces attributs lorsque vous choisissez un pool à rejoindre.

<StakingConsiderations page="pools" />

## Explorer les pools de staking {#explore-staking-pools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Veuillez noter l'importance de choisir un service qui prend la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) au sérieux, car cela améliore la sécurité du réseau et limite vos risques. Les services qui ont prouvé qu'ils limitaient l'utilisation de clients majoritaires sont indiqués par <em style={{ textTransform: "uppercase" }}>« diversité des clients d'exécution »</em> et <em style={{ textTransform: "uppercase" }}>« diversité des clients de consensus ».</em>

Vous avez une suggestion pour un outil de staking que nous avons manqué ? Consultez notre [politique de référencement des produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à évaluation.

## Foire aux questions {#faq}

<ExpandableCard title="Comment puis-je gagner des récompenses ?">
Généralement, les jetons de staking ERC-20 sont émis aux stakers et représentent la valeur de leurs ETH stakés plus les récompenses. Gardez à l'esprit que différents pools distribueront les récompenses de staking à leurs utilisateurs via des méthodes légèrement différentes, mais c'est le thème commun.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ma mise ?">
Dès maintenant ! La mise à niveau du réseau Shanghai/Capella a eu lieu en avril 2023 et a introduit les retraits de staking. Les comptes de validateur qui soutiennent les pools de staking ont désormais la possibilité d'effectuer une sortie et de retirer des ETH vers leur adresse de retrait désignée. Cela permet de racheter votre part de mise pour l'ETH sous-jacent. Vérifiez auprès de votre fournisseur pour voir comment il prend en charge cette fonctionnalité.

Alternativement, les pools qui utilisent un jeton de staking ERC-20 permettent aux utilisateurs d'échanger ce jeton sur le marché libre, vous permettant de vendre votre position de staking, effectuant ainsi un « retrait » sans réellement retirer d'ETH du contrat de staking.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Est-ce différent du staking sur ma plateforme d'échange ?">
Il existe de nombreuses similitudes entre ces options de staking mutualisé et les échanges centralisés, telles que la possibilité de staker de petites quantités d'ETH et de les regrouper pour activer des validateurs.

Contrairement aux échanges centralisés, de nombreuses autres options de staking mutualisé utilisent des contrats intelligents et/ou des jetons de staking, qui sont généralement des jetons ERC-20 pouvant être conservés dans votre propre portefeuille, et achetés ou vendus comme n'importe quel autre jeton. Cela offre une couche de souveraineté et de sécurité en vous donnant le contrôle de vos jetons, mais ne vous donne toujours pas de contrôle direct sur le client validateur attestant en votre nom en arrière-plan.

Certaines options de mutualisation sont plus décentralisées que d'autres en ce qui concerne les nœuds qui les soutiennent. Pour promouvoir la santé et la décentralisation du réseau, les stakers sont toujours encouragés à sélectionner un service de mutualisation qui permet un ensemble décentralisé et sans permission d'opérateurs de nœuds.
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [L'annuaire du staking Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Staking avec Rocket Pool - Aperçu du staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentation de Rocket Pool_
- [Staker de l'Ethereum avec Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentation d'aide de Lido_