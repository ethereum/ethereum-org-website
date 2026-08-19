---
title: Staking délégué (staking en tant que service)
description: Un aperçu de la façon de démarrer avec le staking délégué
lang: fr
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Des opérateurs de nœuds tiers gèrent le fonctionnement de votre client de validateur
  - Une excellente option pour quiconque possède 32 ETH et ne souhaite pas gérer la complexité technique de l'exécution d'un nœud
  - La délégation couvre un large spectre, allant des services où vous conservez vos clés de retrait aux plateformes d'échange entièrement dépositaires
---

## Qu'est-ce que le staking délégué ? {#what-is-staking-as-a-service}

Le staking délégué représente une catégorie de services de staking où vous déposez vos propres 32 ETH pour un validateur, mais déléguez les opérations du nœud à un opérateur tiers. Le processus implique généralement d'être guidé lors de la configuration initiale, y compris la génération des clés et le dépôt, puis de télécharger vos clés de signature vers l'opérateur. Vous fournissez les ETH, mais confiez le fonctionnement du matériel du validateur à quelqu'un d'autre.

Le protocole [Ethereum](/) ne prend pas en charge nativement la délégation de mise, c'est pourquoi une gamme de services a été créée pour répondre à cette demande. Cette catégorie est plus connue sous le nom de **staking en tant que service (SaaS)**, mais elle couvre un spectre d'arrangements qui diffèrent sur la question clé du niveau de contrôle que vous conservez sur vos ETH stakés :

- **Staking en tant que service non dépositaire** : vous conservez vos propres clés de retrait et ne déléguez que le fonctionnement du validateur.
- **Staking entièrement dépositaire** : le fournisseur, généralement une plateforme d'échange, détient à la fois les clés et les fonds.

Comparée au [staking en solo](/staking/solo/), chaque forme de délégation place un intergiciel (middleware) entre vous et le protocole Ethereum. Cet intergiciel est un logiciel et une infrastructure gérés par l'entreprise de quelqu'un d'autre. Chaque étape vers plus de commodité ajoute une hypothèse de confiance, donc avant de choisir un service, déterminez où il se situe sur ce spectre.

### Ce que le staking délégué n'est pas {#what-delegated-staking-is-not}

- **Staking mutualisé et jetons de staking liquide (LST)** : avec les pools, vous combinez n'importe quel montant d'ETH avec d'autres stakers, recevant généralement un jeton qui représente votre part de la mise du pool. Vous ne déléguez pas votre propre validateur ; les contrats intelligents du pool et les opérateurs de nœuds contrôlent les validateurs. [En savoir plus sur le staking mutualisé](/staking/pools/)
- **Opération de nœud sous caution** : certains protocoles de staking vous permettent d'exécuter un validateur sur votre propre matériel avec moins de 32 ETH en déposant une caution. Il s'agit de l'exploitation d'un nœud, l'opposé de la délégation, et cela est abordé avec le [staking en solo](/staking/solo/).

## Pourquoi déléguer votre staking ? {#why-stake-with-a-service}

Si vous avez 32 ETH à staker, mais que vous ne vous sentez pas à l'aise avec la gestion du matériel, les services de staking délégué vous permettent de déléguer l'aspect technique tout en gagnant des récompenses de bloc Ethereum natives.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Déposez vos propres 32 ETH pour activer votre propre ensemble de clés de signature qui participeront au consensus Ethereum. Suivez vos progrès avec des tableaux de bord pour voir ces récompenses en ETH s'accumuler." />
  <Card title="Easy to start" icon={<Flag />} description="Oubliez les spécifications matérielles, la configuration, la maintenance des nœuds et les mises à jour. Les fournisseurs vous permettent d'externaliser la partie difficile en téléchargeant vos propres identifiants de signature, ce qui leur permet d'exécuter un validateur en votre nom, pour un coût modique." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Avec les services non dépositaires, vous gardez le contrôle des clés qui permettent de retirer ou de transférer les fonds stakés. Celles-ci sont différentes des clés de signature et peuvent être stockées séparément pour limiter (mais pas éliminer) votre risque en tant que staker." />
</Grid>

## Comparaison des options de staking {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Le spectre de la délégation {#the-delegation-spectrum}

Les fournisseurs diffèrent quant aux clés qu'ils détiennent pour vous, et chaque clé qu'ils détiennent est un élément pour lequel vous devez leur faire confiance.

### Staking en tant que service non dépositaire {#non-custodial-staking-as-a-service}

Avec le SaaS non dépositaire, vous êtes généralement guidé pour générer vos clés de validateur et effectuer votre propre dépôt de 32 ETH, puis vous téléchargez les _clés de signature_ vers l'opérateur. Les clés de signature permettent à l'opérateur d'effectuer les tâches du validateur (attester et proposer des blocs) en votre nom. Une mauvaise utilisation de celles-ci peut entraîner une pénalité ou une réduction (slashing) pour votre validateur, mais elles ne peuvent pas être utilisées pour retirer, transférer ou dépenser vos fonds.

Les _identifiants de retrait_ du validateur restent pointés vers une adresse que vous contrôlez. Les récompenses et les fonds sortis ne pourront jamais aller ailleurs (voir la section sur le modèle de confiance ci-dessous).

### Services dépositaires et staking sur plateforme d'échange {#custodial-services-and-exchange-staking}

À l'extrémité entièrement déléguée du spectre se trouve le staking dépositaire, le plus souvent proposé par des plateformes d'échange centralisées. Vous ne manipulez jamais de clés ; vous détenez simplement des ETH sur votre compte de plateforme et choisissez de participer au staking. C'est l'expérience utilisateur la plus simple possible, et c'est une option légitime pour les personnes qui conservent déjà des fonds sur une plateforme d'échange et acceptent le risque de garde.

Cela nécessite également le plus de confiance. Le fournisseur contrôle à la fois les clés de signature et les identifiants de retrait ; ce que vous détenez est un solde sur leur plateforme, pas un validateur. Cela signifie que :

- Vos ETH stakés sont exposés à la solvabilité, à la sécurité et à la situation réglementaire du fournisseur, et les retraits sont soumis à leurs conditions et délais de traitement, et non pas seulement aux règles du protocole Ethereum.
- Vous n'avez aucun moyen indépendant de sortir le validateur ou de récupérer les fonds si le fournisseur fait faillite ou gèle les retraits.
- De grandes quantités d'ETH stakés sous une poignée d'opérateurs de plateformes d'échange contribuent à la centralisation des mises, et les choix de clients de ces opérateurs affectent la santé du réseau. Staker d'une manière qui vous laisse plus de contrôle, ou choisir des fournisseurs qui utilisent de manière démontrable des clients minoritaires, contribue davantage à la résilience d'Ethereum.

## Modèle de confiance : ce qu'il faut évaluer {#trust-model-what-to-evaluate}

Le staking délégué implique toujours de confier une partie de votre configuration de staking à quelqu'un d'autre. Répondez à ces questions avant de confier quoi que ce soit :

- **Qui détient les clés de retrait ?** Les identifiants de retrait d'un validateur (type 0x01 ou 0x02) pointent vers une adresse de la couche d'exécution qui contrôle en fin de compte la mise. Si cette adresse est la vôtre, l'arrangement est non dépositaire ; l'opérateur peut exécuter (ou mal gérer) le validateur, mais les ETH ne pourront jamais être retirés que vers vous. Si les identifiants pointent vers l'adresse du fournisseur, vous détenez une promesse, pas une mise.
- **Pouvez-vous sortir sans l'opérateur ?** Depuis la mise à jour [Pectra](/roadmap/pectra/), les [retraits déclenchés par la couche d'exécution (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permettent à l'adresse de retrait de déclencher une sortie de validateur (ou, pour les validateurs à composition 0x02, un retrait partiel du solde supérieur à 32 ETH) directement depuis la couche d'exécution, sans les clés de signature. Cela nécessite une transaction et coûte du gaz, mais cela signifie qu'un opérateur inactif ou défaillant ne peut plus prendre votre validateur en otage, à condition que les identifiants de retrait soient les vôtres.
- **Quelle est la structure des frais ?** Les services facturent des frais mensuels fixes ou un pourcentage des récompenses. Vérifiez comment les frais interagissent avec les temps d'arrêt et les pénalités : qui supporte le coût si l'opérateur sous-performe, et si des garanties ou des assurances sont proposées.
- **Quels clients l'opérateur exécute-t-il ?** Un opérateur exécutant des [clients d'exécution ou de consensus](/developers/docs/nodes-and-clients/client-diversity/) majoritaires expose à la fois votre mise et le réseau à une défaillance corrélée si ce client présente un bug. Privilégiez les fournisseurs qui documentent l'utilisation de clients minoritaires.
- **Le service est-il ouvert et audité ?** Les fournisseurs peuvent exécuter des logiciels supplémentaires autour des clients Ethereum standard qui ne sont pas open source ou auditables. Recherchez des audits publics, un historique d'exploitation établi et un dossier vierge de toute réduction (slashing).
- **Que se passe-t-il si le fournisseur disparaît ?** Un fournisseur responsable documente son processus de désengagement, en fournissant des instructions claires sur la façon dont vous sortez votre validateur, récupérez vos clés ou déclenchez vous-même une sortie. Si la réponse dépend entièrement du maintien en activité du fournisseur, il s'agit d'un arrangement dépositaire.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Certains fournisseurs peuvent exécuter votre validateur en utilisant la technologie de validateur distribué (DVT)**, en divisant la clé de signature sur plusieurs nœuds afin qu'aucune machine ou opérateur unique ne soit un point de défaillance. [En savoir plus sur la technologie de validateur distribué (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Éléments à prendre en compte {#what-to-consider}

Il existe un nombre croissant de fournisseurs pour vous aider à déléguer le fonctionnement de votre validateur, mais ils ont tous leurs propres avantages et risques. Toutes les options déléguées nécessitent des hypothèses de confiance supplémentaires par rapport au staking en solo. Les options déléguées peuvent comporter du code supplémentaire enveloppant les clients Ethereum qui n'est ni ouvert ni auditable. La délégation a également un effet néfaste sur la décentralisation du réseau. Selon la configuration, vous pourriez ne pas contrôler votre validateur, et l'opérateur pourrait agir de manière malhonnête en utilisant vos ETH.

Des indicateurs d'attributs sont utilisés ci-dessous pour signaler les forces ou faiblesses notables qu'un fournisseur répertorié peut avoir. Utilisez cette section comme référence pour la façon dont nous définissons ces attributs pendant que vous choisissez un service de staking.

<StakingConsiderations page="saas" />

## Explorer les fournisseurs de services de staking {#saas-providers}

Vous trouverez ci-dessous quelques fournisseurs de staking en tant que service disponibles. Utilisez les indicateurs ci-dessus pour vous guider à travers ces services.

<ProductDisclaimer />

### Fournisseurs SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Veuillez noter l'importance de soutenir la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) car cela améliore la sécurité du réseau et limite vos risques. Les services qui ont prouvé qu'ils limitaient l'utilisation de clients majoritaires sont indiqués par <em style={{ textTransform: "uppercase" }}>"diversité des clients d'exécution"</em> et <em style={{ textTransform: "uppercase" }}>"diversité des clients de consensus".</em>

### Générateurs de clés {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Vous avez une suggestion pour un fournisseur de staking en tant que service que nous avons manqué ? Consultez notre [politique de référencement des produits](/contributing/adding-staking-products/) pour voir s'il conviendrait, et pour le soumettre à un examen.

<StakingCommunityCallout className="my-16" />

## Foire aux questions {#faq}

<ExpandableCard title="Qui détient mes clés ?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Les arrangements diffèrent d'un fournisseur à l'autre. Avec les services non dépositaires, vous serez guidé pour générer les clés de signature de votre validateur (chaque validateur détient 32 ETH, ou jusqu'à 2048 ETH avec des identifiants à composition (0x02) depuis la mise à jour Pectra), et les télécharger vers votre fournisseur pour lui permettre de valider en votre nom. Les clés de signature seules ne donnent aucune capacité de retirer, transférer ou dépenser vos fonds. Cependant, elles offrent la possibilité de voter pour le consensus, ce qui, si ce n'est pas fait correctement, peut entraîner des pénalités hors ligne ou une réduction (slashing).

Avec les services dépositaires, tels que le staking via une plateforme d'échange centralisée, le fournisseur détient toutes les clés : les clés de signature et les identifiants de retrait. Dans ce cas, vous confiez les fonds eux-mêmes au fournisseur, et pas seulement le fonctionnement du validateur.
</ExpandableCard>

<ExpandableCard title="Il y a donc deux jeux de clés ?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Oui. Chaque validateur possède des clés de _signature_ et des identifiants de _retrait_ distincts. Pour qu'un validateur puisse attester de l'état de la chaîne, participer aux comités de synchronisation et proposer des blocs, les clés de signature doivent être facilement accessibles par un client de validateur. Celles-ci doivent être connectées à Internet sous une forme ou une autre, et sont donc intrinsèquement considérées comme des clés « chaudes ». Les clés qui contrôlent les fonds retirés sont conservées séparément pour des raisons de sécurité.

Les identifiants de retrait désignent l'adresse de la couche d'exécution vers laquelle vont les récompenses de staking et les fonds sortis. Les outils de dépôt modernes vous permettent de définir cette adresse au moment du dépôt, en tant qu'identifiant standard (0x01) ou à composition (0x02), et il devrait s'agir d'une adresse que vous contrôlez, idéalement sécurisée dans un stockage à froid. Cela protège vos fonds même si quelqu'un d'autre contrôle les clés de signature de votre validateur, et depuis la mise à jour Pectra, cela vous permet également de sortir le validateur directement depuis cette adresse.

Les validateurs configurés aux débuts du réseau sans adresse de retrait d'exécution utilisent des clés de retrait BLS héritées, et doivent signer un message unique déclarant une adresse de retrait avant que les retraits ne puissent commencer. Cela implique de régénérer les clés de retrait à partir de la phrase secrète mnémonique créée lors de la configuration.

**Assurez-vous de sauvegarder cette phrase secrète en toute sécurité, sinon vous ne pourrez pas générer vos clés de retrait le moment venu.**

Vérifiez auprès de votre fournisseur pour obtenir de l'aide sur la façon de préparer votre validateur.
</ExpandableCard>

<ExpandableCard title="Quand puis-je effectuer un retrait ?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Le fonctionnement des retraits dépend du type d'identifiant de retrait de votre validateur. Pour les validateurs standards (0x01), tout solde supérieur à 32 ETH est automatiquement transféré vers l'adresse de retrait de manière périodique tous les quelques jours. Pour les validateurs à composition (0x02), les récompenses s'ajoutent au solde du validateur jusqu'à 2048 ETH, et un retrait en dessous de ce montant nécessite de déclencher un retrait partiel depuis votre adresse de retrait, ce qui coûte du gaz.

Les validateurs peuvent également sortir complètement, ce qui débloque la totalité du solde d'ETH restant. Après avoir terminé le processus de sortie, le solde complet est transféré vers l'adresse de retrait lors d'un balayage ultérieur du validateur.

<ButtonLink href="/staking/withdrawals/">En savoir plus sur les retraits de staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="Que se passe-t-il si mon fournisseur disparaît ou refuse de faire sortir mon validateur ?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Si vos identifiants de retrait pointent vers une adresse que vous contrôlez, vous pouvez sortir le validateur vous-même et récupérer votre mise ; voir [Modèle de confiance : ce qu'il faut évaluer](#trust-model-what-to-evaluate).

Si le fournisseur détient les identifiants de retrait (comme c'est le cas pour le staking dépositaire et sur plateforme d'échange), il n'y a aucun moyen au niveau du protocole pour vous de récupérer les fonds de manière indépendante ; votre recours est limité aux propres processus du fournisseur.
</ExpandableCard>

<ExpandableCard title="Que se passe-t-il si je subis une réduction ?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
En utilisant un fournisseur de staking délégué, vous confiez le fonctionnement de votre nœud à quelqu'un d'autre. Cela s'accompagne du risque de mauvaises performances du nœud, ce qui n'est pas sous votre contrôle. Dans le cas où votre validateur subit une réduction (slashing), une pénalité initiale proportionnelle au solde de votre validateur est appliquée (rendue considérablement plus petite dans la mise à jour Pectra), et votre validateur est sorti de force de l'ensemble des validateurs.

À la fin du processus de réduction/sortie, les fonds restants sont transférés vers l'adresse de retrait attribuée au validateur.

Contactez les fournisseurs individuels pour plus de détails sur les garanties ou les options d'assurance. Si vous préférez avoir le contrôle total de la configuration de votre validateur, [découvrez comment staker vos ETH en solo](/staking/solo/).
</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [Qu'est-ce que le staking en tant que service ?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [L'annuaire du staking Ethereum](https://www.staking.directory/) - _Eridian et Spacesider_
- [Évaluation des services de staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002 : Retraits déclenchables par la couche d'exécution](https://eips.ethereum.org/EIPS/eip-7002) - _la spécification pour sortir un validateur depuis son adresse de retrait_