---
title: "Mise en jeu mutualisée"
description: En savoir plus sur les pools de mise en jeu
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Leslie le rhinocéros nage dans la piscine."
sidebarDepth: 2
summaryPoints:
  - Misez et gagnez des récompenses avec n'importe quel montant d'ETH en joignant vos forces à celles des autres
  - Laissez de côté la partie difficile et confiez la validation des opérations à une tierce partie
  - Conservez vos jetons de staking dans votre propre portefeuille
---

## Que sont les groupes d'enjeu ? {#what-are-staking-pools}

Les groupes d'enjeux offrent une approche collaborative permettant à de nombreuses personnes ayant de petites quantités d'ETH de rassembler les 32 ETH nécessaires pour activer un jeu de clés de validateur. Le concept de groupes d'enjeux n'est pas pris en charge de manière native par le protocole. Des solutions ont donc été élaborées séparément pour répondre à ce besoin.

Certains pools fonctionnent à l'aide de contrats intelligents, dans lesquels les fonds peuvent être déposés. Ceux-ci gèrent et suivent votre mise en jeu sans intermédiaire de confiance, et vous remettent un jeton représentant la valeur de votre mise. D'autres pools n'utilisent pas de contrats intelligents et sont, au contraire, gérés hors de la blockchain.

## Pourquoi miser via un pool ? Pourquoi miser via un pool ? {#why-stake-with-a-pool}

En plus des avantages que nous avons décrits dans notre [introduction à la mise en jeu](/staking/), la mise en jeu mutualisée offre un certain nombre d'avantages distincts.

<CardGrid>
  <Card title="Facile d'accès" emoji="🐟" description="Pas une baleine ? Aucun problème. La plupart des pools de staking vous permettent de staker quasiment n'importe quel montant d'ETH en vous associant à d'autres stakers, contrairement au staking en solo qui nécessite 32 ETH." />
  <Card title="Stakez dès aujourd'hui" emoji=":stopwatch:" description="Staker avec un pool est aussi simple qu'un échange de jetons. Pas besoin de vous soucier de la configuration matérielle et de la maintenance des nœuds. Les pools vous permettent de déposer vos ETH, ce qui permet aux opérateurs de nœuds de faire fonctionner des validateurs. Les récompenses sont ensuite distribuées aux contributeurs, moins des frais pour les opérations de nœuds." />
  <Card title="Jetons de staking" emoji=":droplet:" description="De nombreux pools de staking fournissent un jeton qui représente un droit sur vos ETH stakés et les récompenses qu'ils génèrent. Cela vous permet d'utiliser vos ETH stakés, par exemple, comme garantie dans les applications DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Points à considérer {#what-to-consider}

La mise en jeu mutualisée ou déléguée n'est pas prise en charge nativement par le protocole Ethereum, mais compte tenu de la demande des utilisateurs de miser moins de 32 ETH, un nombre croissant de solutions ont été construites pour répondre à cette demande.

Chaque pool et les outils ou contrats intelligents qu'ils utilisent ont été élaborés par différentes équipes, et chacun présente des avantages et des risques. Les pools permettent aux utilisateurs d'échanger leur ETH contre un jeton représentant l'ETH mis en jeu. Ce jeton est utile car il permet aux utilisateurs d'échanger n'importe quel montant d'ETH avec un montant équivalent d'un jeton porteur d'intérêts qui génère des rendements à partir des récompenses de staking appliqués aux ETH sous-jacents (et vice versa) sur les plateformes d'échanges décentralisées alors même que l'ETH réel reste mis en jeu sur la couche consensus. Cela signifie que les échanges entre un produit générateur de rendement basé sur de l'ETH mis en jeu et de l'« ETH brut» sont rapides, faciles et pas uniquement disponibles en multiples de 32 ETH.

Toutefois, ces jetons d'ETH mis en jeu ont tendance à créer des comportements assimilables à des cartels où de vastes montants d'ETH mis en jeu finissent sous le contrôle de quelques organisations centralisées plutôt que réparties à travers de nombreux individus indépendants. Cela crée les conditions d'une censure ou d'une extraction de valeur. La norme d'excellence pour la mise en jeu devrait toujours porter sur des personnes individuelles qui exécutent des nœuds validateurs sur leur propre matériel, dans la mesure du possible.

[En savoir plus sur les risques de la mise en jeu de jetons](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler des forces ou faiblesses notables qu'un groupe de mise en jeu mutualisé peut présenter. Utilisez cette section comme référence pour savoir comment nous définissons ces attributs lorsque vous choisissez un pool à rejoindre.

<StakingConsiderations page="pools" />

## Explorer les pools de mise en jeu {#explore-staking-pools}

Il existe une variété d'options disponibles pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Veuillez noter l'importance de choisir un service qui prend au sérieux la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/), car elle améliore la sécurité du réseau et limite vos risques. Les services limitent l'émergence d'un client majoritaire sont indiqués avec <em style={{ textTransform: "uppercase" }}>"diversité des clients d'exécution"</em> et <em style={{ textTransform: "uppercase" }}>"diversité des clients de consensus"</em>.

Vous souhaitez suggérer un outil de mise en jeu que nous avons manqué ? Consultez notre [politique de référencement de produits](/contributing/adding-staking-products/) pour voir si cela convient, et pour le soumettre à un examen.

## Foire aux questions {#faq}

<ExpandableCard title="Comment gagner des récompenses ?">
Généralement, des jetons de mise en jeu ERC-20 sont émis à destination des participants et représentent la valeur de leur ETH mis en jeu et, en sus, les récompenses. Gardez en mémoire que les différents pools distribueront des récompenses de mise en jeu à leurs utilisateurs selon des règles différentes, mais c'est un sujet général.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ma mise ?">
Et c'est déjà le cas ! La mise à niveau du réseau Shanghai/Capella a eu lieu en avril 2023 et a introduit des retraits de staking. Après cette mise à niveau, les comptes de validateur soutenant les pools de mise en jeu auront la possibilité de sortir et de retirer l'ETH à leur adresse de retrait désignée. Cela permet de racheter votre part de mise en jeu pour l'ETH. Vérifiez auprès de votre fournisseur de services pour savoir comment il supporte cette fonctionnalité.

Alternativement, les pools qui utilisent les jetons de staking ERC-20 permettent à leurs utilisateurs d'échanger ce jeton sur le marché ouvert, vous permettant de vendre votre position de mise, en retirant sans pour autant supprimer l'ETH du contrat de staking.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Est-ce différent du staking avec ma plateforme d'échange ?">
Il existe de nombreuses similitudes entre ces options de mise en jeu mutualisée et les échanges centralisés, comme la capacité de mettre en jeu de petites quantités d'ETH et de les regrouper pour activer les validateurs.

Contrairement aux plateformes d'échanges centralisés, beaucoup d'autres options de mise en jeu mutualisée utilisent des contrats intelligents et/ou des jetons de staking, qui sont habituellement des jetons ERC-20 pouvant être détenus dans votre propre portefeuille, et achetés ou vendus comme n'importe quel autre jeton. Cela vous offre une couche de souveraineté et de sécurité en vous donnant le contrôle de vos jetons, mais ne vous donne toujours pas de contrôle direct sur le client de validateur qui atteste en votre nom en arrière-plan.

Certaines options de mise en commun sont plus décentralisées que d'autres concernant les nœuds qui les soutiennent. Pour promouvoir la santé et la décentralisation du réseau, les validateurs sont toujours encouragés à sélectionner un service de mutualisation offrant un ensemble décentralisé d'opérateurs de nœuds sans permission.
</ExpandableCard>

## En savoir plus {#further-reading}

- [L'annuaire de la mise en jeu sur Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Mise en jeu avec Rocket Pool - Aperçu de la mise en jeu](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentation de RocketPool_
- [Mise en jeu d'Ethereum avec Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentation d'aide de Lido_
