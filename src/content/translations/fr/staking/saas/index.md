---
title: Mise en jeu en tant que service
description: Un aperçu de la façon de débuter avec la mise en jeu ETH mutualisée
lang: fr
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: Leslie le rhinocéros flottant dans les nuages.
sidebarDepth: 2
summaryPoints:
  - Les opérateurs de nœuds tiers gèrent le fonctionnement de votre client de validateur
  - Excellente option pour toute personne disposant de 32 ETH et ne se sentant pas à l'aise face à la complexité technique du fonctionnement d'un nœud
  - Réduire la confiance et conserver la garde de vos clés de retrait
---

## Qu'est-ce que la mise en jeu en tant que service ? {#what-is-staking-as-a-service}

Staking as a service ("la mise en jeu en tant que service, ou SaaS”) est une catégorie de services de mise en jeu au sein de laquelle vous déposez vos propres 32 ETH pour un validateur, mais déléguez les opérations de nœuds à un opérateur tiers. Ce processus implique généralement d'être guidé à travers la configuration initiale, y compris la génération de clés et le dépôt, puis de télécharger vos clés de signature à l'opérateur. Cela permet au service d'exploiter votre validateur en votre nom, généralement moyennant des frais mensuels.

## Pourquoi miser via un service? {#why-stake-with-a-service}

Le protocole Ethereum ne soutient pas nativement la délégation de mise en jeu. Ces services ont donc été construits pour répondre à cette demande. Si vous avez 32 ETH à miser, mais que vous ne vous sentez pas à l'aise avec le matériel, les services SaaS vous permettent de déléguer la partie complexe pendant que vous gagnez des récompenses de bloc natif.

<CardGrid>
  <Card title="Votre propre validateur" emoji=":desktop_computer:">
    Déposez vos propres 32 ETH pour activer votre propre jeu de clés de signature qui participeront au consensus Ethereum. Suivez vos progrès avec des tableaux de bord pour voir les récompenses ETH accumulées.
  </Card>
  <Card title="Démarrage facile" emoji="🏁">
    Oubliez les spécifications du matériel, la configuration, la maintenance des nœuds et les mises à jour.
    Les fournisseurs SaaS vous permettent d'externaliser la partie difficile en téléchargeant vos propres identifiants de signature, ce qui leur permet d'exécuter un validateur en votre nom, pour un coût minime.
  </Card>
  <Card title="Limitez vos risques" emoji=":shield:">
    Dans de nombreux cas, les utilisateurs n'ont pas à renoncer à l'accès aux clés qui permettent de retirer ou de transférer des fonds mis en jeu. Ils sont différents des clés de signature et peuvent être stockés séparément pour limiter (mais pas éliminer) votre risque en tant que validateur.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## Ce que vous devez prendre en compte {#what-to-consider}

Il y a de plus en plus de fournisseurs de services qui vous aident à placer votre ETH, mais chacun comporte des risques et des avantages différents.

Les indicateurs sont listés ci-dessous pour signaler les forces ou faiblesses notables d'un fournisseur SaaS répertorié. Utilisez cette section comme référence pour définir ces indicateurs pendant que vous choisissez un pool à rejoindre.

<StakingConsiderations page="saas" />

## Explorer les fournisseurs de services de mise en jeu {#saas-providers}

Vous trouverez ci-dessous quelques fournisseurs SaaS disponibles. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous

<InfoBanner emoji="⚠️" isWarning>
Veuillez noter l'importance de choisir un service qui prend au sérieux <a href="/developers/docs/nodes-and-clients/client-diversity/">la diversité des clients</a> , car elle améliore la sécurité du réseau et limite vos risques. Les services dont il est prouvé qu'ils limitent l'utilisation des clients majoritaires sont indiqués comme <em style="text-transform: uppercase;">"clients diversifiés".</em>
</InfoBanner>

#### Fournisseurs SaaS

<StakingProductsCardGrid category="saas" />

#### Générateurs de clés

<StakingProductsCardGrid category="keyGen" />

Avez-vous une suggestion concernant un fournisseur de mise en jeu en tant que service que nous avons manqué ? Consultez notre [politique de liste de produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et le soumettre à examen.

## FAQ (Questions fréquemment posées) {#faq}

<ExpandableCard title="Qui détient mes clés?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Les dispositions varient d'un fournisseur à l'autre, mais en général, vous serez guidé à travers la configuration de toutes les clés de signature dont vous avez besoin (un par 32 ETH), afin de les télécharger à votre fournisseur et lui permettre de les valider en votre nom. Les clés de signature seules ne donnent aucune possibilité de retirer, de transférer ou de dépenser vos fonds. Cependant, elles donnent la possibilité de voter pour le consensus, ce qui, si ce n'est pas fait correctement, peut entraîner des pénalités de mise hors ligne ou de délestage.
</ExpandableCard>

<ExpandableCard title="Il y a donc deux jeux de clés ?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Oui. Chaque compte est composé à la fois de <em>clés</em> de signature et de <em>clés de retrait</em>. Pour qu'un validateur puisse attester de l'état de la chaîne, participer à des comités de synchronisation et proposer des blocs, les clés de signature doivent être facilement accessibles par un client de validateur. Celles-ci doivent être connectées à Internet sous une forme ou une autre, et sont donc par nature considérées comme des clés « chaudes ». Ceci est une exigence pour que votre validateur puisse attester. Par conséquent les clés utilisées pour transférer ou retirer des fonds sont séparées pour des raisons de sécurité.

Toutes ces clés peuvent à tout moment être régénérées de manière reproductible en utilisant votre phrase de récupération mnémonique de 24 mots. <em>Assurez vous de conserver cette phrase de récupération en toute sécurité ou vous ne pourrez pas générer vos clés de retrait le moment venu</em>.
</ExpandableCard>

<ExpandableCard title="Quand puis-je effectuer un retrait ?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Lorsque vous mettez 32 ETH en jeu avec un fournisseur SaaS, cet ETH est toujours déposé dans le cadre du contrat officiel de dépôt de mise en jeu. Ainsi, les validateurs SaaS sont actuellement limités par les mêmes restrictions de retrait que les validateurs individuels. Cela signifie que la mise en jeu de votre ETH est actuellement un dépôt à sens unique. Ce sera le cas jusqu'à la mise à niveau Shanghai.
</ExpandableCard>

<ExpandableCard title="Que se passe-t-il si je suis banni ?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
En utilisant un fournisseur SaaS, vous confiez l'exploitation de votre nœud à quelqu'un d'autre. Cela s'accompagne du risque de mauvaise performance du nœud, qui n'est pas sous votre contrôle. Dans le cas où votre validateur est banni, votre solde de validateur sera pénalisé et supprimé de force du groupe de validateurs. Ces fonds seront verrouillés jusqu'à ce que les retraits soient activés au niveau du protocole.

Contactez votre fournisseur de SaaS pour plus de détails sur les garanties ou les options d'assurance. Si vous préférez contrôler complètement la configuration de votre validateur, <a href="/staking/solo/">apprenez-en plus sur la façon de miser votre ETH</a> de manière individuelle.
</ExpandableCard>

## Complément d'information {#further-reading}

- [Helping Client Diversity](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
