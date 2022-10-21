---
title: Mise en jeu mutualisée
description: Un aperçu de la façon de débuter avec la mise en jeu d'ETH mutualisée
lang: fr
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Leslie le rhinocéros nage dans la piscine.
sidebarDepth: 2
summaryPoints:
  - Misez et gagnez des récompenses avec n'importe quel montant d'ETH en joignant vos forces à celles des autres
  - Laissez de côté la partie difficile et confiez la validation des opérations à une tierce partie
  - Conservez les jetons de liquidité dans votre propre portefeuille
---

## Que sont les groupes d'enjeu ? {#what-are-staking-pools}

Les groupes d'enjeux offrent une approche collaborative permettant à de nombreuses personnes ayant de petites quantités d'ETH de rassembler les 32 ETH nécessaires pour activer un jeu de clés de validateur. Le concept de groupes d'enjeux n'est pas pris en charge de manière native par le protocole. Des solutions ont donc été élaborées séparément pour répondre à ce besoin.

Certains pools fonctionnent à l'aide de contrats intelligents, dans lesquels les fonds peuvent être déposés. Ceux-ci gèrent et suivent votre mise en jeu sans intermédiaire de confiance, et vous remettent un jeton représentant la valeur de votre mise. D'autres pools n'utilisent pas de contrats intelligents et sont, au contraire, gérés hors chaîne.

## Pourquoi miser via un pool ? {#why-stake-with-a-pool}

En plus des avantages que nous avons décrits dans notre [introduction à la mise en jeu](/staking/), la mise en jeu mutualisée offre un certain nombres d'avantages spécifiques.

<CardGrid>
  <Card title="Barrière faible à l’entrée" emoji="🐟">
    Pas une baleine ? Aucun problème. La plupart des pools vous permettent de mettre en jeu pratiquement n'importe quelle quantité d'ETH en unissant vos forces avec d'autres validateurs, contrairement à la mise en jeu individuelle qui nécessite 32 ETH.
  </Card>
  <Card title="La mise en jeu aujourd'hui" emoji=":stopwatch:">
    Miser avec un pool est aussi facile que de faire un échange de jetons. Pas besoin de se soucier de la configuration du matériel et de la maintenance des nœuds. Les pools vous permettent de déposer votre ETH afin de permettre aux opérateurs de nœuds d'exécuter des validateurs. Les récompenses sont ensuite distribuées aux contributeurs après déduction des frais d'exploitation du nœud.
  </Card>
  <Card title="Jetons de liquidité" emoji=":droplet:">
    De nombreux groupes d'enjeux fournissent un jeton qui représente un droit sur votre ETH misé et les gains qu'il génère. Cela vous permet d'utiliser votre ETH mis en jeu, par exemple comme garantie dans les applications DeFi.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Éléments importants {#what-to-consider}

La mise en jeu mutualisée ou déléguée n'est pas prise en charge nativement par le protocole Ethereum, mais compte tenu de la demande des utilisateurs de miser moins de 32 ETH, un nombre croissant de solutions ont été construites pour répondre à cette demande.

Les pools, ainsi que les outils ou les contrats intelligents qu'ils utilisent, ont été construits par différentes équipes et chacun d'entre eux a ses propres risques et avantages.

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler des forces ou faiblesses notables qu'un groupe d'enjeux répertorié peut présenter. Utilisez cette section comme référence pour savoir comment nous définissons ces attributs lorsque vous choisissez un pool à rejoindre.

<StakingConsiderations page="pools" />

## Explorez les pools de mise en jeu {#explore-staking-pools}

De nombreuses options sont disponible pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<InfoBanner emoji="⚠️" isWarning>
Veuillez noter l'importance de choisir un service qui prend au sérieux <a href="/developers/docs/nodes-and-clients/client-diversity/">la diversité des clients</a> , car elle améliore la sécurité du réseau et limite vos risques. Les services dont il est prouvé qu'ils limitent l'utilisation des clients majoritaires sont indiqués comme <em style="text-transform: uppercase;">"clients diversifiés".</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Avez-vous une suggestion concernant un outil de mise en jeu que nous avons manqué ? Consultez notre [politique de liste de produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et le soumettre à examen.

## FAQ {#faq}

<ExpandableCard title="Comment puis-je gagner des récompenses ?">
Habituellement, les jetons de liquidité ERC-20 émis envers les validateurs représentent la valeur de leur ETH misé auquel s'ajoutent des récompenses. Gardez en mémoire que les différents pools distribueront des récompenses de mise en jeu à leurs utilisateurs selon des règles différentes, mais c'est un sujet général.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ma mise?">

Actuellement, il n'est pas possible de retirer des fonds d'un validateur Ethereum, ce qui limite actuellement la capacité à réellement échanger votre jeton de liquidité en échange des récompenses ETH bloquées dans la couche de consensus.

Alternativement, les pools qui utilisent un jeton de liquidité ERC-20 permettent aux utilisateurs d'échanger ce jeton sur le marché ouvert, vous permettant de vendre votre position de mise en jeu, efficacement "retirer" sans pour autant retirer l'ETH du contrat de mise en jeu.
</ExpandableCard>

<ExpandableCard title="Est-ce différent de la mise en jeu via mon service d'échange ?">
Il existe de nombreuses similitudes entre ces options de mise en jeu mutualisée et les échanges centralisés, comme la capacité de mettre en jeu de petites quantités d'ETH et de les regrouper pour activer les validateurs.

Contrairement aux échanges centralisés, beaucoup d'autres options de mise en jeu mutualisée utilisent des contrats intelligents et/ou des jetons de liquidité, qui sont habituellement des jetons ERC-20 pouvant être détenus dans votre propre portefeuille, et achetés ou vendus comme n'importe quel autre jeton. Cela vous offre une couche de souveraineté et de sécurité en vous donnant le contrôle de vos jetons, mais ne vous donne toujours pas de contrôle direct sur le client de validateur qui atteste en votre nom en arrière-plan.

Certaines options de mise en commun sont plus décentralisées que d'autres concernant les nœuds qui les soutiennent. Pour promouvoir la santé et la décentralisation du réseau, les validateurs sont toujours encouragés à sélectionner un service de mutualisation offrant un ensemble décentralisé d'opérateurs de nœuds sans permission.
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [Staking with Rocket Pool - Staking Overview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking Ethereum With Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Aide Lido docs_
