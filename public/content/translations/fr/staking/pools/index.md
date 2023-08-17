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
  <Card title="Barrière faible à l’entrée" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="La mise en jeu aujourd'hui" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Jetons de liquidité" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Éléments importants {#what-to-consider}

La mise en jeu mutualisée ou déléguée n'est pas prise en charge nativement par le protocole Ethereum, mais compte tenu de la demande des utilisateurs de miser moins de 32 ETH, un nombre croissant de solutions ont été construites pour répondre à cette demande.

Chaque pool et les outils ou contrats intelligents qu'ils utilisent ont été élaborés par différentes équipes, et chacun présente des avantages et des risques. Les pools permettent aux utilisateurs d'échanger leur ETH contre un jeton représentant l'ETH mis en jeu. Le jeton est connu sous le nom de « dérivé de staking liquide » ; ceci est utile parce que cela permet aux utilisateurs d'échanger n'importe quel montant d'ETH à un montant équivalent d'un jeton porteur de rendement qui génère un retour des récompenses de mise en jeu appliquées à l'ETH misé sous-jacent (et vice versa) sur les échanges décentralisés même si l'ETH réel reste misé sur la Chaîne phare (Beacon Chain). Cela signifie que les échanges entre un produit ETH mis en jeu générateur de rendement et l'« ETH brut» sont rapides, faciles et pas uniquement disponibles en multiples de 32 ETH.

Cependant, ces dérivés du staking liquide ont tendance à créer des comportements de type cartel, où une grande quantité d'ETH mis en jeu se retrouve sous le contrôle de quelques organisations centralisées plutôt que répartis entre de nombreux individus indépendants. Cela crée les conditions d'une censure ou d'une extraction de valeur. La norme d'excellence pour la mise en jeu devrait toujours porter sur des personnes individuelles qui exécutent des nœuds validateurs sur leur propre matériel, dans la mesure du possible.

[En savoir plus sur les risques de la mise en jeu de jetons](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Les indicateurs d'attributs sont utilisés ci-dessous pour signaler des forces ou faiblesses notables qu'un groupe de mise en jeu mutualisé peut présenter. Utilisez cette section comme référence pour savoir comment nous définissons ces attributs lorsque vous choisissez un pool à rejoindre.

<StakingConsiderations page="pools" />

## Explorez les pools de mise en jeu {#explore-staking-pools}

De nombreuses options sont disponible pour vous aider dans votre configuration. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous.

<InfoBanner emoji="⚠️" isWarning>
Veuillez noter l'importance de choisir un service qui prend au sérieux <a href="/developers/docs/nodes-and-clients/client-diversity/">la diversité des clients</a> , car elle améliore la sécurité du réseau et limite vos risques. Les services dont il est prouvé qu'ils limitent l'utilisation des clients majoritaires sont indiqués comme <em style="text-transform: uppercase;">"clients diversifiés".</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Avez-vous une suggestion concernant un outil de mise en jeu que nous avons manqué ? Consultez notre [politique de liste de produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et le soumettre à examen.

## Questions fréquemment posées {#faq}

<ExpandableCard title="Comment puis-je gagner des récompenses ?">
Habituellement, les jetons de liquidité ERC-20 émis envers les validateurs représentent la valeur de leur ETH misé auquel s'ajoutent des récompenses. Gardez en mémoire que les différents pools distribueront des récompenses de mise en jeu à leurs utilisateurs selon des règles différentes, mais c'est un sujet général.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ma mise?">
Actuellement, il n'est pas possible de retirer des fonds d'un validateur Ethereum, ce qui limite la capacité à réellement <i>échanger</i> votre jeton de liquidité en échange des récompenses ETH bloquées dans la couche de consensus.

La mise à niveau du réseau de Shanghai introduira la fonctionnalité de retrait prévue pour le 12 avril 2023. Tous les ETH misés resteront verrouillés jusqu'à ce moment-là.

Après cette mise à niveau, les comptes de validateur soutenant les pools de mise en jeu auront la possibilité de sortir et de retirer l'ETH à leur adresse de retrait désignée. Cela vous permettra de racheter votre part de participation d'ETH sous-jacent. Vérifiez auprès de votre fournisseur de services pour savoir comment il supporte cette fonctionnalité.

Alternativement, les pools qui utilisent un jeton de liquidité ERC-20 permettent aux utilisateurs d'échanger ce jeton sur le marché ouvert, vous permettant de vendre votre position de mise en jeu, de réaliser dans les faits un "retrait" sans pour autant retirer l'ETH du contrat de mise en jeu.

<ButtonLink to="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu.</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Est-ce différent de la mise en jeu via mon service d'échange ?">
Il existe de nombreuses similitudes entre ces options de mise en jeu mutualisée et les échanges centralisés, comme la capacité de mettre en jeu de petites quantités d'ETH et de les regrouper pour activer les validateurs.

Contrairement aux échanges centralisés, beaucoup d'autres options de mise en jeu mutualisée utilisent des contrats intelligents et/ou des jetons de liquidité, qui sont habituellement des jetons ERC-20 pouvant être détenus dans votre propre portefeuille, et achetés ou vendus comme n'importe quel autre jeton. Cela vous offre une couche de souveraineté et de sécurité en vous donnant le contrôle de vos jetons, mais ne vous donne toujours pas de contrôle direct sur le client de validateur qui atteste en votre nom en arrière-plan.

Certaines options de mise en commun sont plus décentralisées que d'autres concernant les nœuds qui les soutiennent. Pour promouvoir la santé et la décentralisation du réseau, les validateurs sont toujours encouragés à sélectionner un service de mutualisation offrant un ensemble décentralisé d'opérateurs de nœuds sans permission.
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [Staking with Rocket Pool - Staking Overview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking Ethereum With Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Aide Lido docs_
