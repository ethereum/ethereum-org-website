---
title: Staking en tant que service
description: En savoir plus sur le staking en tant que service
lang: fr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Leslie le rhinocéros flottant dans les nuages."
sidebarDepth: 2
summaryPoints:
  - Des opérateurs de nœuds tiers gèrent le fonctionnement de votre client validateur
  - Excellente option pour toute personne possédant 32 ETH qui ne se sent pas à l'aise avec la complexité technique de l'exécution d'un nœud
  - Réduisez la confiance requise et conservez la garde de vos clés de retrait
---

## Qu'est-ce que le staking en tant que service ? {#what-is-staking-as-a-service}

Le staking en tant que service (« SaaS ») représente une catégorie de services de staking où vous déposez vos propres 32 ETH pour un validateur, mais déléguez les opérations du nœud à un opérateur tiers. Ce processus implique généralement d'être guidé lors de la configuration initiale, y compris la génération des clés et le dépôt, puis de télécharger vos clés de signature vers l'opérateur. Cela permet au service d'exploiter votre validateur en votre nom, généralement moyennant des frais mensuels.

## Pourquoi staker avec un service ? {#why-stake-with-a-service}

Le protocole [Ethereum](/) ne prend pas en charge nativement la délégation de mise, ces services ont donc été développés pour répondre à cette demande. Si vous avez 32 ETH à staker, mais que vous ne vous sentez pas à l'aise avec le matériel, les services SaaS vous permettent de déléguer la partie difficile tout en gagnant des récompenses de bloc natives.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Éléments à prendre en compte {#what-to-consider}

Il existe un nombre croissant de fournisseurs SaaS pour vous aider à staker vos ETH, mais ils ont tous leurs propres avantages et risques. Toutes les options SaaS nécessitent des hypothèses de confiance supplémentaires par rapport au staking à domicile. Les options SaaS peuvent avoir du code supplémentaire enveloppant les clients Ethereum qui n'est ni ouvert ni auditable. Le SaaS a également un effet néfaste sur la décentralisation du réseau. Selon la configuration, vous pourriez ne pas contrôler votre validateur - l'opérateur pourrait agir de manière malhonnête en utilisant vos ETH.

Des indicateurs d'attributs sont utilisés ci-dessous pour signaler les forces ou faiblesses notables qu'un fournisseur SaaS répertorié peut avoir. Utilisez cette section comme référence pour la façon dont nous définissons ces attributs pendant que vous choisissez un service pour vous aider dans votre parcours de staking.

<StakingConsiderations page="saas" />

## Explorer les fournisseurs de services de staking {#saas-providers}

Vous trouverez ci-dessous quelques fournisseurs SaaS disponibles. Utilisez les indicateurs ci-dessus pour vous guider à travers ces services.

<ProductDisclaimer />

### Fournisseurs SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Veuillez noter l'importance de soutenir la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) car cela améliore la sécurité du réseau et limite vos risques. Les services qui ont prouvé qu'ils limitaient l'utilisation de clients majoritaires sont indiqués par <em style={{ textTransform: "uppercase" }}>« diversité des clients d'exécution »</em> et <em style={{ textTransform: "uppercase" }}>« diversité des clients de consensus ».</em>

### Générateurs de clés {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Vous avez une suggestion pour un fournisseur de staking en tant que service que nous avons manqué ? Consultez notre [politique de référencement des produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à évaluation.

## Foire aux questions {#faq}

<ExpandableCard title="Qui détient mes clés ?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Les dispositions différeront d'un fournisseur à l'autre, mais généralement, vous serez guidé dans la configuration des clés de signature dont vous avez besoin (une par 32 ETH), et dans leur téléchargement vers votre fournisseur pour lui permettre de valider en votre nom. Les clés de signature seules ne donnent aucune capacité de retirer, transférer ou dépenser vos fonds. Cependant, elles offrent la possibilité de voter pour le consensus, ce qui, si ce n'est pas fait correctement, peut entraîner des pénalités hors ligne ou une réduction (slashing).
</ExpandableCard>

<ExpandableCard title="Il y a donc deux jeux de clés ?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Oui. Chaque compte est composé à la fois de clés de <em>signature</em> BLS et de clés de <em>retrait</em> BLS. Pour qu'un validateur puisse attester de l'état de la chaîne, participer aux comités de synchronisation et proposer des blocs, les clés de signature doivent être facilement accessibles par un client validateur. Celles-ci doivent être connectées à Internet d'une manière ou d'une autre, et sont donc intrinsèquement considérées comme des clés « chaudes ». C'est une exigence pour que votre validateur puisse attester, et par conséquent, les clés utilisées pour transférer ou retirer des fonds sont séparées pour des raisons de sécurité.

Les clés de retrait BLS sont utilisées pour signer un message unique qui déclare vers quel compte de la couche d'exécution les récompenses de staking et les fonds sortis doivent aller. Une fois ce message diffusé, les clés de <em>retrait BLS</em> ne sont plus nécessaires. Au lieu de cela, le contrôle sur les fonds retirés est délégué de manière permanente à l'adresse que vous avez fournie. Cela vous permet de définir une adresse de retrait sécurisée via votre propre stockage à froid, minimisant ainsi les risques pour les fonds de votre validateur, même si quelqu'un d'autre contrôle vos clés de signature de validateur.

La mise à jour des identifiants de retrait est une étape requise pour activer les retraits\*. Ce processus implique la génération des clés de retrait à l'aide de votre phrase secrète mnémonique.

<strong>Assurez-vous de sauvegarder cette phrase secrète en toute sécurité, sinon vous ne pourrez pas générer vos clés de retrait le moment venu.</strong>

\*Les stakers qui ont fourni une adresse de retrait lors du dépôt initial n'ont pas besoin de configurer cela. Vérifiez auprès de votre fournisseur SaaS pour obtenir de l'aide sur la façon de préparer votre validateur.
</ExpandableCard>

<ExpandableCard title="Quand puis-je effectuer un retrait ?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Les stakers doivent fournir une adresse de retrait (si elle n'a pas été fournie lors du dépôt initial), et les paiements de récompense commenceront à être distribués automatiquement sur une base périodique tous les quelques jours.

Les validateurs peuvent également effectuer une sortie complète en tant que validateur, ce qui débloquera leur solde d'ETH restant pour le retrait. Les comptes qui ont fourni une adresse de retrait d'exécution et terminé le processus de sortie recevront l'intégralité de leur solde à l'adresse de retrait fournie lors du prochain balayage des validateurs.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Que se passe-t-il si je subis une réduction ?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
En utilisant un fournisseur SaaS, vous confiez le fonctionnement de votre nœud à quelqu'un d'autre. Cela s'accompagne du risque de mauvaises performances du nœud, ce qui n'est pas sous votre contrôle. Dans le cas où votre validateur subit une réduction, le solde de votre validateur sera pénalisé et retiré de force du pool de validateurs.

À la fin du processus de réduction/sortie, ces fonds seront transférés à l'adresse de retrait attribuée au validateur. Cela nécessite de fournir une adresse de retrait pour l'activer. Celle-ci a peut-être été fournie lors du dépôt initial. Sinon, les clés de retrait du validateur devront être utilisées pour signer un message déclarant une adresse de retrait. Si aucune adresse de retrait n'a été fournie, les fonds resteront bloqués jusqu'à ce qu'elle le soit.

Contactez chaque fournisseur SaaS pour plus de détails sur les garanties ou les options d'assurance, et pour obtenir des instructions sur la façon de fournir une adresse de retrait. Si vous préférez avoir le contrôle total de la configuration de votre validateur, [découvrez comment staker vos ETH en solo](/staking/solo/).
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [L'annuaire du staking Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Évaluation des services de staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_