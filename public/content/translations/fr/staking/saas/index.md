---
title: Mise en jeu en tant que service
description: En savoir plus sur le staking en tant que service
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Leslie le rhinocéros flottant dans les nuages."
sidebarDepth: 2
summaryPoints:
  - Les opérateurs de nœuds tiers gèrent le fonctionnement de votre client de validateur
  - Excellente option pour toute personne disposant de 32 ETH et ne se sentant pas à l'aise face à la complexité technique du fonctionnement d'un nœud
  - Réduire la confiance et conserver la garde de vos clés de retrait
---

## Qu'est-ce que la mise en jeu en tant que service ? {#what-is-staking-as-a-service}

Staking as a service ("la mise en jeu en tant que service, ou SaaS”) est une catégorie de services de mise en jeu au sein de laquelle vous déposez vos propres 32 ETH pour un validateur, mais déléguez les opérations de nœuds à un opérateur tiers. Ce processus implique généralement d'être guidé à travers la configuration initiale, y compris la génération de clés et le dépôt, puis de télécharger vos clés de signature à l'opérateur. Cela permet au service d'exploiter votre validateur en votre nom, généralement moyennant des frais mensuels.

## Pourquoi miser via un service? Pourquoi miser via un service ? {#why-stake-with-a-service}

Le protocole Ethereum ne soutient pas nativement la délégation de mise en jeu. Ces services ont donc été construits pour répondre à cette demande. Si vous avez 32 ETH à miser, mais que vous ne vous sentez pas à l'aise avec le matériel, les services SaaS vous permettent de déléguer la partie complexe pendant que vous gagnez des récompenses de bloc natif.

<Grid>
  <Card title="Votre propre validateur" emoji=":desktop_computer:" description="Déposez vos 32 ETH pour activer vos clés de signature qui participeront au consensus d'Ethereum. Suivez vos progrès sur des tableaux de bord pour voir vos récompenses en ETH s'accumuler." />
  <Card title="Démarrage facile" emoji="🏁" description="Oubliez les spécifications matérielles, la configuration, la maintenance des nœuds et les mises à niveau. Les fournisseurs SaaS vous permettent d'externaliser la partie difficile en téléversant vos propres identifiants de signature, leur permettant d'exécuter un validateur en votre nom, pour un coût modique." />
  <Card title="Limitez votre risque" emoji=":shield:" description="Dans de nombreux cas, les utilisateurs n'ont pas à renoncer à l'accès aux clés qui permettent de retirer ou de transférer les fonds mis en jeu. Celles-ci sont différentes des clés de signature et peuvent être stockées séparément pour limiter (mais pas éliminer) votre risque en tant que staker." />
</Grid>

<StakingComparison page="saas" />

## Points à considérer {#what-to-consider}

Il existe un nombre croissant de fournisseurs de services SaaS pour vous aider à miser votre ETH, mais chacun présente ses propres avantages et risques. Toutes les options SaaS requièrent des hypothèses de confiance supplémentaires par rapport à la mise en jeu individuelle depuis le domicile. Les options Saas peuvent contenir du code supplémentaire qui n'est ni ouvert ni auditable, pour les clients Ethereum. Le SaaS a également un effet préjudiciable sur la décentralisation du réseau. Selon la configuration, il se peut que vous ne contrôliez pas votre validateur - l'opérateur pourrait agir malhonnêtement en utilisant votre ETH.

Les indicateurs sont listés ci-dessous pour signaler les forces ou faiblesses notables d'un fournisseur SaaS répertorié. Utilisez cette section comme référence pour définir ces indicateurs pendant que vous choisissez un pool à rejoindre.

<StakingConsiderations page="saas" />

## Explorer les fournisseurs de services de mise en jeu {#saas-providers}

Vous trouverez ci-dessous quelques fournisseurs SaaS disponibles. Utilisez les indicateurs ci-dessus pour vous guider à travers les outils ci-dessous

<ProductDisclaimer />

### Fournisseurs SaaS

<StakingProductsCardGrid category="saas" />

Veuillez noter l'importance de soutenir [la diversité des clients](/developers/docs/nodes-and-clients/client-diversity/), car cela améliore la sécurité du réseau et limite vos risques. Les services limitent l'émergence d'un client majoritaire sont indiqués avec <em style={{ textTransform: "uppercase" }}>"diversité des clients d'exécution"</em> et <em style={{ textTransform: "uppercase" }}>"diversité des clients de consensus"</em>.

### Générateurs de clés

<StakingProductsCardGrid category="keyGen" />

Avez-vous une suggestion concernant un fournisseur de mise en jeu en tant que service que nous avons manqué ? Consultez notre [politique de référencement de produits](/contributing/adding-staking-products/) pour voir si cela convient, et pour le soumettre à un examen.

## Foire aux questions {#faq}

<ExpandableCard title="Qui détient mes clés ?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Les dispositions varient d'un fournisseur à l'autre, mais en général, vous serez guidé à travers la configuration de toutes les clés de signature dont vous avez besoin (un par 32 ETH), afin de les télécharger à votre fournisseur et lui permettre de les valider en votre nom. Les clés de signature seules ne donnent aucune possibilité de retirer, de transférer ou de dépenser vos fonds. Cependant, elles donnent la possibilité de voter pour le consensus, ce qui, si ce n'est pas fait correctement, peut entraîner des pénalités de mise hors ligne ou de délestage.
</ExpandableCard>

<ExpandableCard title="Alors, il y a deux jeux de clés ?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Oui. Chaque compte est composé à la fois de clés de <em>signature</em> BLS (Boneh-Lynn-Shachamet) et de clés de <em>retrait</em> BLS. Pour qu'un validateur puisse attester de l'état de la chaîne, participer à des comités de synchronisation et proposer des blocs, les clés de signature doivent être facilement accessibles par un client validateur. Celles-ci doivent être connectées à Internet sous une forme ou une autre, et sont donc par nature considérées comme des clés « chaudes ». Ceci est une exigence pour que votre validateur puisse attester. Par conséquent les clés utilisées pour transférer ou retirer des fonds sont séparées pour des raisons de sécurité.

Les clés de retrait BLS sont utilisées pour signer un message unique qui indique à quel compte de couche d'exécution les récompenses de mise en jeu de compte et les fonds sortis doivent être envoyés. Une fois ce message diffusé, les clés de<em> retrait</em> BLS ne sont plus nécessaires. Au lieu de cela, le contrôle des fonds retirés est délégué de façon permanente à l'adresse que vous avez fournie. Cela vous permet de définir une adresse de retrait sécurisée via votre propre portefeuille de stockage à froid, minimisant le risque pour les fonds de votre validateur, même si quelqu'un d'autre contrôle les clés de signature de votre validateur.

La mise à jour des identifiants de retrait est une étape nécessaire pour activer les retraits\*. Ce processus consiste à générer les clés de retrait en utilisant votre phrase de récupération mnémotechnique.

<strong>Assurez-vous de sauvegarder cette phrase de récupération en toute sécurité, ou vous ne pourrez pas générer vos clés de retrait le moment venu.</strong>

\*Les validateurs qui ont fourni une adresse de retrait lors du dépôt initial n'ont pas besoin de la définir. Consultez votre fournisseur SaaS pour obtenir une assistance sur la façon de préparer votre validateur.
</ExpandableCard>

<ExpandableCard title="Quand puis-je retirer ?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Les validateurs doivent fournir une adresse de retrait (si elle n'a pas été fournie lors du dépôt initial), et les paiements de récompense commenceront à être distribués automatiquement tous les quelques jours.

Les validateurs peuvent également se retirer entièrement en tant que validateur, ce qui débloquera leur solde ETH restant pour le retrait. Les comptes qui ont fourni une adresse de retrait d’exécution et terminé le processus de sortie recevront tout leur solde à l’adresse de retrait fournie lors du prochain balayage du validateur.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Que se passe-t-il si je suis slashé ?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
En utilisant un fournisseur SaaS, vous confiez l'exploitation de votre nœud à quelqu'un d'autre. Cela s'accompagne du risque de mauvaise performance du nœud, qui n'est pas sous votre contrôle. Dans le cas où votre validateur est banni, votre solde de validateur sera pénalisé et supprimé de force du groupe de validateurs.

Une fois le processus de coupure ou de sortie terminé, ces fonds seront transférés à l'adresse de retrait assignée au validateur. Cela nécessite de fournir une adresse de retrait à activer. Il se peut que l'adresse de retrait ait été fournie sur dépôt initial. Sinon, les clés de retrait du validateur devront être utilisées pour signer un message indiquant une adresse de retrait. Si aucune adresse de retrait n'a été fournie, les fonds resteront verrouillés jusqu'à ce qu'ils soient fournis.

Communiquez avec un fournisseur individuel de SaaS pour obtenir davantage de détails sur n'importe quelles garanties ou options d'assurance ainsi que des instructions sur la façon de fournir une adresse de retrait. Si vous préférez avoir le contrôle total de la configuration de votre validateur, [apprenez-en plus sur la façon de miser votre ETH en solo](/staking/solo/).
</ExpandableCard>

## En savoir plus {#further-reading}

- [L'annuaire de la mise en jeu sur Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Évaluation des services de mise en jeu](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
