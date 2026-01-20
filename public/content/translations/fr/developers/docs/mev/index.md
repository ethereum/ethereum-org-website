---
title: Valeur Extractible Maximale (Maximal Extractable Value - MEV)
description: "Une introduction à la Valeur Extractible Maximale (Maximal extractable value - MEV)"
lang: fr
---

La Valeur Extractible Maximale (MEV) représente la valeur maximale qui peut être extraite de la production d'un bloc au-delà de la récompense standard du bloc et des frais de gaz, en incluant, en excluant ou en modifiant l'ordre des transactions au sein d'un bloc.

## Valeur extractible maximale {#maximal-extractable-value}

La valeur extractible maximale a été appliquée pour la première fois dans le contexte de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/) et était initialement appelée \ Ceci est dû au fait que dans la preuve de travail, les mineurs contrôlent les inclusions, exclusions et l'ordre des transactions. Cependant, depuis la transition vers la preuve d'enjeu via [La Fusion](/roadmap/merge), les validateurs sont responsables de ces rôles et le minage ne fait plus partie du protocole Ethereum. Les méthodes d'extraction de valeurs existent toujours, donc le terme « valeur extractible maximale » est maintenant utilisé à la place.

## Prérequis {#prerequisites}

Assurez-vous que vous êtes familier avec les [transactions](/developers/docs/transactions/), les [blocs](/developers/docs/blocks/), la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) et le [gaz](/developers/docs/gas/). Une familiarité avec les [dapps](/apps/) et la [DeFi](/defi/) est également utile.

## Extraction de MEV {#mev-extraction}

En théorie, la MEV revient entièrement aux validateurs parce qu'ils sont la seule partie à pouvoir garantir l'exécution d'une MEV rentable. Cependant, en pratique, une grande partie des MEV est extraite par des participants indépendants du réseau qui sont appelés les « chercheurs ». Les chercheurs exécutent des algorithmes complexes sur les données de la blockchain pour détecter les opportunités MEV rentables et soumettent automatiquement au réseau ces transactions rentables via des programmes informatiques automatisés.

Les validateurs obtiennent dans tous les cas une partie du montant total des MEV, puisque les chercheurs sont prêts à payer des frais de gaz élevés (revenant au validateur) en échange d'une plus grande probabilité d'inclure leurs transactions rentables dans un bloc. En supposant que les chercheurs soient économiquement rationnels, les frais de gaz qu'un chercheur est prêt à payer pourront atteindre 100 % du MEV du chercheur (parce que si les frais de carburant étaient plus élevés, le chercheur perdrait de l'argent).

Ainsi, pour certaines opportunités de MEV très compétitives, comme [l'arbitrage DEX](#mev-examples-dex-arbitrage), les chercheurs peuvent être amenés à payer 90 % ou plus de leurs revenus totaux de MEV en frais de gaz au validateur, car de nombreuses personnes veulent exécuter la même transaction d'arbitrage rentable. En effet, la seule façon de garantir que leur transaction d'arbitrage soit exécutée est de soumettre la transaction avec le prix de gaz le plus élevé.

### Gas golfing {#mev-extraction-gas-golfing}

Cette dynamique a fait du « gas-golfing » — le fait de programmer des transactions pour qu'elles utilisent le moins de gaz possible — un avantage concurrentiel, parce qu'il permet aux chercheurs de fixer un prix de gaz plus élevé tout en gardant leurs frais totaux constants (puisque les frais de gaz = prix du gaz \* gaz utilisé).

Quelques techniques de « gas golfing » bien connues consistent à : utiliser des adresses qui commencent par une longue chaîne de zéros (par exemple, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) car elles prennent moins de place (et donc de gaz) à stocker ; et laisser de petits soldes de jetons [ERC-20](/developers/docs/standards/tokens/erc-20/) dans les contrats, car il coûte plus de gaz d'initialiser un emplacement de stockage (le cas si le solde est de 0) que de mettre à jour un emplacement de stockage. Trouver de nouvelles techniques pour réduire la consommation de gaz est un domaine de recherche actif parmi les chercheurs.

### Exécuteurs anticipés généralisés {#mev-extraction-generalized-frontrunners}

Plutôt que de programmer des algorithmes complexes pour détecter des opportunités MEV rentables, certains chercheurs exécutent des favoris généralisés. Les favoris généralisés sont des programmes automatiques qui scrutent le mempool pour détecter les transactions rentables. Le favori copiera le code de la transaction potentiellement rentable, remplacera les adresses par l'adresse du favori et exécutera la transaction localement pour vérifier doublement que la transaction modifiée génère un profit pour l'adresse du favori. Si la transaction est effectivement rentable, le favori soumettra la transaction modifiée avec l'adresse remplacée et un prix de carburant plus élevé devenant ainsi le favori de la transaction originale et ainsi obtenir le MEV du chercheur original.

### Flashbots {#mev-extraction-flashbots}

Flashbots est un projet indépendant qui étend les clients d'exécution avec un service qui permet aux chercheurs de soumettre des transactions MEV aux validateurs sans les révéler au mempool public . Cela empêche les transactions d'être exécutées par des favoris généralisés.

## Exemples de MEV {#mev-examples}

Les MEV apparaissent sur la blockchain de différentes façons.

### Arbitrage DEX {#mev-examples-dex-arbitrage}

L'arbitrage sur les [échanges décentralisés](/glossary/#dex) (DEX) est l'opportunité de MEV la plus simple et la plus connue. Par conséquent, c'est aussi le plus compétitif.

Cela fonctionne ainsi : si deux DEX proposent un jeton à deux prix différents, quelqu'un peut acheter sur le DEX le jeton au prix le plus bas et le vendre au prix le plus élevé dans une transaction atomique unique. Grâce au mécanisme de la blockchain, c'est véritablement un arbitrage sans risque.

[Voici un exemple](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) d'une transaction d'arbitrage rentable où un chercheur a transformé 1 000 ETH en 1 045 ETH en profitant des différents prix de la paire ETH/DAI sur Uniswap par rapport à Sushiswap.

### Liquidations {#mev-examples-liquidations}

Les liquidations dans les protocoles de prêt représentent une autre occasion bien connue de MEV.

Les protocoles de prêt comme Maker et Aave exigent des utilisateurs qu'ils déposent une garantie (p. ex., des ETH). Cette garantie déposée est ensuite utilisée pour prêter à d'autres utilisateurs.

Les utilisateurs peuvent alors emprunter des actifs et des jetons à d'autres en fonction de leurs besoins (p. ex., vous pourriez emprunter des MKR si vous vouliez voter dans une proposition de gouvernance de MakerDAO) jusqu'à un certain pourcentage de leur garantie déposée. Par exemple, si le montant d'emprunt est de 30 % maximum, un utilisateur qui dépose 100 DAI dans le protocole peut emprunter jusqu'à 30 DAI d'un autre actif. Le protocole détermine le pourcentage exact de pouvoir d'emprunt.

La valeur des collatéraux d'un emprunteur fluctue, tout comme leur pouvoir d'emprunt. Si, en raison des fluctuations du marché, la valeur des actifs empruntés dépasse, disons, 30 % de la valeur de leur garantie (encore une fois, le pourcentage exact est déterminé par le protocole), le protocole permet généralement à n'importe qui de liquider la garantie, remboursant instantanément les prêteurs (ceci est similaire au fonctionnement des [appels de marge](https://www.investopedia.com/terms/m/margincall.asp) dans la finance traditionnelle). En cas de liquidation, l'emprunteur doit généralement payer des frais de liquidation élevés, dont certains vont au liquidateur — c’est là que se trouve la possibilité du MEV.

Les chercheurs rivalisent pour analyser les données de la blockchain le plus rapidement possible afin de déterminer quels emprunteurs peuvent être liquidés et être les premiers à soumettre une transaction de liquidation et à collecter les frais de liquidation pour eux-mêmes.

### Sandwich trading {#mev-examples-sandwich-trading}

L'échange Sandwich est une autre méthode courante d'extraction MEV.

Pour créer un sandwich, un chercheur va inspecter le mempool pour trouver des transactions DEX de grand volume. Par exemple, supposons que quelqu'un souhaite acheter 10 000 UNI avec DAI sur Uniswap. Un échange de cette ampleur aura un impact significatif sur la paire UNI/DAI, ce qui pourrait augmenter considérablement le prix de l'UNI par rapport à DAI.

Un chercheur peut calculer l'effet de prix approximatif de cette grande transaction sur la paire UNI/DAI et exécuter un ordre d'achat optimal immédiatement _avant_ la grande transaction, en achetant des UNI à bas prix, puis exécuter un ordre de vente immédiatement _après_ la grande transaction, en les vendant au prix plus élevé causé par l'ordre important.

Le sandwiching, cependant, est plus risqué car il n'est pas atomique (contrairement à l'arbitrage DEX, comme décrit ci-dessus) et est sujet à une [attaque salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV sur les NFT {#mev-examples-nfts}

Le MEV dans l'espace NFT est un phénomène émergent et n'est pas nécessairement rentable.

Cependant, étant donné que les transactions NFT se produisent sur la même blockchain partagée que toutes les autres transactions Ethereum, les chercheurs peuvent utiliser sur le marché des NFT des techniques similaires à celles traditionnellement utilisées pour les opportunités MEV.

Par exemple, s'il y a une forte demande d'un NFT populaire et qu'un chercheur veut un certaine NFT ou un ensemble de NFT, il peut programmer une transaction de telle sorte qu'il soit le premier à acheter le NFT ou encore, il pourra acheter l'ensemble des NFT en une seule transaction. Ou si un NFT est [mis en vente par erreur à un bas prix](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un chercheur peut devancer les autres acheteurs et l'acquérir à bas prix.

Un exemple frappant de MEV sur les NFT s'est produit lorsqu'un chercheur a dépensé 7 millions de dollars pour [acheter](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) chaque Cryptopunk au prix plancher. Un chercheur en blockchain a [expliqué sur Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) comment l'acheteur a travaillé avec un fournisseur de MEV pour garder son achat secret.

### La longue traîne {#mev-examples-long-tail}

Les opérations d’arbitrage DEX, de liquidations et d'échange Sandwich sont toutes des opportunités MEV bien connues et ne sont pas susceptibles d’être rentables pour les nouveaux chercheurs. Cependant, il existe une longue série d'opportunités MEV moins connues (les NFT MEV sont sans aucun doute l'une de ces opportunités).

Les chercheurs qui sont sur le point de débuter peuvent rencontrer davantage de succès en recherchant les MEV dans cette longue série. Le [tableau d'offres d'emploi MEV](https://github.com/flashbots/mev-job-board) de Flashbots répertorie certaines opportunités émergentes.

## Effets de la MEV {#effects-of-mev}

MEV n’est pas que négatif. Il existe des conséquences positives et négatives concernant MEV sur Ethereum.

### Les avantages {#effects-of-mev-the-good}

De nombreux projets DeFi s'appuient sur des acteurs économiquement rationnels pour assurer l'utilité et la stabilité de leurs protocoles. Par exemple, l'arbitrage DEX garantit que les utilisateurs obtiennent le meilleur et le plus juste prix pour leurs jetons, et les protocoles de prêt reposent sur des liquidations rapides lorsque les emprunteurs tombent sous les ratios de garantie pour s'assurer que les prêteurs sont remboursés.

Sans chercheurs rationnels qui cherchent et corrigent les inefficacités économiques et qui profitent des incitations économiques des protocoles, les protocoles DeFi et dApps en général peuvent ne pas être aussi robustes qu'ils le sont aujourd'hui.

### Les inconvénients {#effects-of-mev-the-bad}

À la couche de l'application, certaines formes de MEV, comme les échanges sandwich, entraînent sans équivoque une expérience pire pour les utilisateurs. Les utilisateurs qui sont pris en sandwichs sont confrontés à une augmentation du glissement et à une pire exécution pour leurs opérations.

Au niveau de la couche réseau, les favoris généralisés et les ventes aux enchères de prix du gaz dans lesquelles ils se livrent souvent (lorsque deux ou plusieurs favoris rivalisent pour que leur transaction soit incluse dans le bloc suivant en augmentant progressivement le prix du gaz de leurs propres transactions) entraînent une congestion du réseau et des prix élevés de gaz pour tous les autres qui essaient de faire des transactions régulières.

Au-delà de ce qui se passe _au sein_ des blocs, la MEV peut avoir des effets délétères _entre_ les blocs. Si le MEV disponible dans un bloc dépasse significativement la récompense standard du bloc, les validateurs peuvent être encouragés à réextraire des blocs et à capturer le MEV pour eux-mêmes, causant une réorganisation de la blockchain et une instabilité consensuelle.

Cette possibilité de réorganisation de la blockchain a été [précédemment explorée sur la blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Comme la récompense de bloc de Bitcoin est divisée en deux et les frais de transaction représentent une part plus grande de la récompense de bloc, des situations apparaissent où il devient économiquement rationnel pour les mineurs d'abandonner la récompense du prochain bloc et de réextraire les blocs passés avec des frais plus élevés. Avec la croissance du MEV, le même type de situation pourrait se produire avec Ethereum, menaçant l'intégrité de la blockchain.

## État de la MEV {#state-of-mev}

L’extraction MEV a été organisée au début de 2021, ce qui a entraîné des prix de gaz extrêmement élevés au cours des premiers mois de l’année. L'émergence du relais MEV de Flashbots a réduit l'efficacité des favoris généralisés et a déplacé les enchères de prix du gaz hors de la chaîne, ce qui a fait baisser les prix du gaz pour les utilisateurs ordinaires.

Bien que de nombreux chercheurs gagnent encore beaucoup d'argent avec la MEV, au fur et à mesure que les opportunités deviennent plus connues et que de plus en plus de chercheurs se font concurrence pour la même opportunité, les validateurs capteront de plus en plus le revenu total de la MEV (parce que le même type de ventes aux enchères de gaz, tel que décrit à l'origine ci-dessus, se produit également dans les Flashbots, bien que de manière privée, et les validateurs capteront le revenu des gaz qui en résulte). MEV n'est pas non plus l'apanage d'Ethereum et à mesure que les possibilités deviennent plus compétitives sur Ethereum, les chercheurs se déplacent vers des blockchains alternatifs comme Binance Smart Chain, où des possibilités MEV similaires à celles sur Ethereum existent mais avec moins de concurrence.

D'autre part, la transition de la preuve de travail à la preuve d'enjeu et les efforts en cours pour faire évoluer Ethereum à l'aide de rollups modifient le paysage de la MEV d'une manière qui n'est pas encore très claire. On ne sait pas encore bien comment le fait d'avoir des proposeurs de blocs garantis connus un peu à l'avance modifie la dynamique de l'extraction de MEV par rapport au modèle probabiliste de la preuve de travail, ni comment cela sera perturbé lorsque l'[élection d'un leader secret unique](https://ethresear.ch/t/secret-non-single-leader-election/11789) et la [technologie de validateur distribué](/staking/dvt/) seront mises en œuvre. De même, il reste à voir quelles seront les opportunités de MEV lorsque la plupart des activités des utilisateurs seront transférées d'Ethereum vers ses rollups et shards de niveau 2.

## MEV dans la preuve d'enjeu (PoS) d'Ethereum {#mev-in-ethereum-proof-of-stake}

Comme expliqué, la MEV a des implications négatives sur l'expérience globale de l'utilisateur et la sécurité de la couche de consensus. Mais la transition d'Ethereum vers un consensus de preuve d'enjeu (surnommé « La Fusion ») introduit potentiellement de nouveaux risques liés à la MEV :

### Centralisation des validateurs {#validator-centralization}

Dans l'Ethereum post-fusion, les validateurs (ayant effectué des dépôts de sécurité de 32 ETH) parviennent à un consensus sur la validité des blocs ajoutés à la chaîne Beacon. Puisque 32 ETH peuvent être hors de portée pour beaucoup, [rejoindre un pool de staking](/staking/pools/) peut être une option plus réalisable. Néanmoins, une distribution saine de [stakers solo](/staking/solo/) est idéale, car elle atténue la centralisation des validateurs et améliore la sécurité d'Ethereum.

Cependant, on pense que l'extraction des MEV est capable d'accélérer la centralisation des validateurs. C'est en partie parce que, comme les validateurs [gagnent moins en proposant des blocs](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) que les mineurs auparavant, l'extraction de MEV a grandement [influencé les gains des validateurs](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) depuis [La Fusion](/roadmap/merge/).

Les pools de jalonnement plus importants auront probablement plus de ressources à investir dans les optimisations nécessaires pour saisir les opportunités de MEV. Plus ces pools extraient de MEV, plus ils disposent de ressources pour améliorer leurs capacités d'extraction de MEV (et augmenter leurs revenus globaux), créant ainsi des [économies d'échelle](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Avec moins de ressources à leur disposition, il se peut que les stakers solos ne puissent pas profiter des opportunités des MEV. Cela pourrait accroître la pression sur les validateurs indépendants pour qu'ils rejoignent de puissants pools de jalonnement pour augmenter leurs revenus, réduisant ainsi la décentralisation d'Ethereum.

### Mempools avec permission {#permissioned-mempools}

En réponse aux attaques de type « sandwiching » et « frontrunning », les traders peuvent commencer à effectuer des transactions hors chaîne avec des validateurs pour assurer la confidentialité des transactions. Au lieu d'envoyer une transaction MEV potentielle au mempool public, le trader l'envoie directement au validateur, qui l'inclut dans un bloc et partage les bénéfices avec le trader.

Les « dark pools » sont une version plus large de cet arrangement et fonctionnent comme des mempools à accès limité et autorisés, ouverts aux utilisateurs prêts à payer certains frais. Cette tendance diminuerait l'absence de permission et de confiance d'Ethereum et transformerait potentiellement la blockchain en un mécanisme « pay-to-play » qui favorise le plus offrant.

Les mempools à autorisation accéléreraient également les risques de centralisation décrits dans la section précédente. Les grands pools qui exploitent plusieurs validateurs bénéficieront probablement de la confidentialité des transactions pour les commerçants et les utilisateurs, ce qui augmentera leurs revenus MEV.

La lutte contre ces problèmes liés à la MEV dans l'Ethereum post-fusion est un domaine de recherche essentiel. À ce jour, deux solutions proposées pour réduire l'impact négatif de la MEV sur la décentralisation et la sécurité d'Ethereum après La Fusion sont la [**Séparation Proposeur-Constructeur (PBS)**](/roadmap/pbs/) et l'[**API Builder**](https://github.com/ethereum/builder-specs).

### Séparation Proposeur-Constructeur {#proposer-builder-separation}

Dans le cas de la preuve de travail et de la preuve d'enjeu, un nœud qui construit un bloc le propose aux autres nœuds participant au consensus pour qu'il soit ajouté à la chaîne. Un nouveau bloc devient partie intégrante de la chaîne canonique après qu'un autre mineur l'a construit (dans la preuve de travail) ou qu'il a reçu les attestations de la majorité des validateurs (dans la preuve d'enjeu).

La combinaison des rôles de producteur et de proposant de blocs est à l'origine de la plupart des problèmes liés à la MEV décrits précédemment. Par exemple, les nœuds de consensus sont incités à déclencher des réorganisations de chaîne dans des [attaques de type « time-bandit »](https://www.mev.wiki/attack-examples/time-bandit-attack) pour maximiser les gains de MEV.

La [séparation proposeur-constructeur](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) est conçue pour atténuer l'impact de la MEV, en particulier au niveau de la couche de consensus. La principale caractéristique de PBS est la séparation des règles relatives aux producteurs et aux proposants de blocs. Les validateurs sont toujours responsables de la proposition et du vote des blocs, mais une nouvelle catégorie d'entités spécialisées, appelées **constructeurs de blocs**, est chargée d'ordonner les transactions et de construire les blocs.

Dans le cadre de la PBS, un constructeur de blocs crée un paquet de transactions et fait une offre pour son inclusion dans un bloc de la chaîne Beacon (en tant que « charge utile d'exécution »). Le validateur sélectionné pour proposer le bloc suivant vérifie alors les différentes offres et choisit le lot ayant le tarif le plus élevé. PBS crée essentiellement un marché aux enchères, où les constructeurs négocient avec les validateurs qui vendent de l'espace de bloc.

Les conceptions actuelles de PBS utilisent un [schéma d'engagement-révélation](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) dans lequel les constructeurs ne publient qu'un engagement cryptographique sur le contenu d'un bloc (en-tête de bloc) avec leurs offres. Après avoir accepté l'offre gagnante, le proposant crée une proposition de bloc signée qui comprend l'en-tête de bloc. Le constructeur de blocs est censé publier l'intégralité du corps du bloc après avoir vu la proposition de bloc signée, et il doit également recevoir suffisamment d'[attestations](/glossary/#attestation) de la part des validateurs avant sa finalisation.

#### Comment la séparation proposant-constructeur atténue-t-elle l'impact de la MEV ? {#how-does-pbs-curb-mev-impact}

La séparation entre le proposant et le constructeur dans le protocole réduit l'effet de la MEV sur le consensus en retirant l'extraction de la MEV de la compétence des validateurs. Ce sont plutôt les constructeurs de blocs utilisant du matériel spécialisé qui saisiront les opportunités de MEV à l'avenir.

Cela n'exclut pas totalement les validateurs des revenus liés à la MEV, car les constructeurs doivent faire des offres élevées pour que leurs blocs soient acceptés par les validateurs. Néanmoins, les validateurs n'étant plus directement axés sur l'optimisation des revenus de la MEV, la menace des attaques de type « time-bandit » diminue.

La séparation proposant-constructeur réduit également les risques de centralisation de la MEV. Par exemple, l'utilisation d'un schéma commit-reveal évite aux constructeurs de devoir faire confiance aux validateurs pour ne pas voler l'opportunité MEV ou l'exposer aux autres constructeurs. Cela abaisse la barrière pour les validateurs solitaires qui souhaitent bénéficier de la MEV, sans quoi les constructeurs auraient tendance à favoriser les grands pools ayant une réputation hors chaîne et à conclure des accords hors chaîne avec eux.

De même, les validateurs n'ont pas à faire confiance aux constructeurs pour qu'ils ne retiennent pas les corps de blocs ou ne publient pas de blocs invalides, car le paiement est inconditionnel. Les frais du validateur sont toujours traités même si le bloc proposé est indisponible ou déclaré invalide par d'autres validateurs. Dans ce dernier cas, le bloc est tout simplement rejeté, ce qui oblige le créateur du bloc à perdre tous les frais de transaction et les revenus de la MEV.

### API Builder {#builder-api}

Bien que la séparation des proposants et des constructeurs promette de réduire les effets de l'extraction des MEV, sa mise en œuvre nécessite des modifications du protocole de consensus. Plus précisément, la règle de [choix de la fourche](/developers/docs/consensus-mechanisms/pos/#fork-choice) sur la Beacon Chain devrait être mise à jour. L'[API Builder](https://github.com/ethereum/builder-specs) est une solution temporaire visant à fournir une implémentation fonctionnelle de la séparation proposeur-constructeur, bien qu'avec des hypothèses de confiance plus élevées.

L'API Builder est une version modifiée de l'[API Engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilisée par les clients de la couche de consensus pour demander des charges utiles d'exécution aux clients de la couche d'exécution. Comme indiqué dans la [spécification du validateur honnête](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), les validateurs sélectionnés pour les tâches de proposition de bloc demandent un paquet de transactions à un client d'exécution connecté, qu'ils incluent dans le bloc proposé sur la Beacon Chain.

L'API pour les builders fait également office d'intergiciel entre les validateurs et les clients de la couche d'exécution, mais elle est différente car elle permet aux validateurs de la chaîne Beacon de s'approvisionner en blocs auprès d'entités externes (au lieu de construire un bloc localement à l'aide d'un client d'exécution).

Vous trouverez ci-dessous un aperçu du fonctionnement de l'API pour les builders :

1. L'API pour les builders connecte le validateur à un réseau de constructeurs de blocs exécutant des clients de la couche d'exécution. Comme dans le cas de PBS, les constructeurs sont des parties spécialisées qui investissent dans la construction de blocs à forte intensité de ressources et utilisent différentes stratégies pour maximiser les revenus tirés des MEV + les pourboires prioritaires.

2. Un validateur (qui exécute un client de la couche de consensus) demande des charges utiles d'exécution ainsi que des offres au réseau de constructeurs. Les offres des constructeurs contiendront l'en-tête de la charge utile d'exécution - un engagement cryptographique sur le contenu de la charge utile - et une redevance à payer au validateur.

3. Le validateur examine les offres entrantes et choisit la charge utile d'exécution dont les frais sont les plus élevés. À l'aide de l'API pour les builders, le validateur crée une proposition de bloc Beacon "aveugle" qui comprend uniquement sa signature et l'en-tête de la charge utile d'exécution et l'envoie au builder.

4. Le constructeur qui exécute l'API pour les builders est censé répondre avec la totalité de la charge utile d'exécution lorsqu'il voit la proposition de bloc aveuglé. Cela permet au validateur de créer un bloc Beacon « signé », qu'il propage à travers le réseau.

5. Un validateur utilisant l'API pour les builders est toujours censé construire un bloc localement au cas où le constructeur de blocs ne répondrait pas rapidement, afin de ne pas manquer les récompenses de la proposition de bloc. Cependant, le validateur ne peut pas créer un autre bloc en utilisant soit les transactions maintenant révélées, soit un autre ensemble, car cela équivaudrait à une _équivoque_ (signer deux blocs dans le même slot), ce qui est une infraction passible de slashing.

Un exemple de mise en œuvre de l'API Builder est [MEV Boost](https://github.com/flashbots/mev-boost), une amélioration du [mécanisme d'enchères Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) conçue pour limiter les externalités négatives de la MEV sur Ethereum. L'enchère Flashbots permet aux validateurs en preuve d'enjeu d'externaliser le travail de construction de blocs rentables à des parties spécialisées appelées **chercheurs**.
![Un diagramme montrant le flux de MEV en détail](./mev.png)

Les chercheurs recherchent des opportunités de MEV lucratives et envoient des paquets de transactions aux proposeurs de blocs, ainsi qu'une [offre à prix scellé](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) pour leur inclusion dans le bloc. Le validateur qui exécute mev-geth, une version forkée du client go-ethereum (Geth), n'a qu'à choisir le paquet le plus rentable et à l'inclure dans le nouveau bloc. Pour protéger les proposeurs de blocs (validateurs) du spam et des transactions invalides, les paquets de transactions passent par des **relais** pour validation avant d'arriver au proposeur.

MEV Boost conserve le même fonctionnement que la vente aux enchères Flashbots originale, mais avec de nouvelles fonctionnalités conçues pour le passage à la preuve d'enjeu d'Ethereum. Les chercheurs trouvent toujours des transactions de MEV rentables à inclure dans les blocs, mais une nouvelle catégorie de parties spécialisées, appelées **constructeurs**, est responsable de l'agrégation des transactions et des paquets dans les blocs. Un builder accepte les offres à prix scellés des chercheurs et effectue des optimisations pour trouver la commande la plus rentable.

Le relayeur est toujours responsable de la validation des paquets de transactions avant de les transmettre au proposant. Cependant, MEV Boost introduit des **escrows** responsables de fournir la [disponibilité des données](/developers/docs/data-availability/) en stockant les corps de bloc envoyés par les constructeurs et les en-têtes de bloc envoyés par les validateurs. Ici, un validateur connecté à un relais demande les charges utiles d'exécution disponibles et utilise l'algorithme d'ordonnancement de MEV Boost pour sélectionner l'en-tête de charge utile avec l'offre la plus élevée + les conseils MEV.

#### Comment l'API pour les builders atténue-t-elle l'impact de la MEV ? {#how-does-builder-api-curb-mev-impact}

L'avantage principal de l'API pour les builders est son potentiel de démocratisation de l'accès aux opportunités MEV. L'utilisation de schémas commit-reveal élimine les hypothèses de confiance et réduit les barrières d'entrée pour les validateurs qui cherchent à bénéficier de la MEV. Cela devrait réduire la pression exercée sur les jalonneurs solitaires pour qu'ils s'intègrent à de grands pools de jalonnement afin d'augmenter les profits de la MEV.

La mise en œuvre généralisée de l'API pour les builders favorisera une plus grande concurrence entre les constructeurs de blocs, ce qui augmentera la résistance à la censure. Comme les validateurs examinent les offres de plusieurs constructeurs, un constructeur qui a l'intention de censurer une ou plusieurs transactions d'utilisateurs doit surenchérir sur tous les autres constructeurs non censurés pour réussir. Cela augmente considérablement le coût de la censure des utilisateurs et décourage cette pratique.

Certains projets, tels que MEV Boost, utilisent l'API pour les builders dans le cadre d'une structure globale conçue pour assurer la confidentialité des transactions à certaines parties, telles que les traders qui tentent d'éviter les attaques de type frontrunning/sandwiching. Pour ce faire, un canal de communication privé est mis en place entre les utilisateurs et les constructeurs de blocs. Contrairement aux mempools à autorisation décrits précédemment, cette approche est bénéfique pour les raisons suivantes :

1. L'existence de multiples constructeurs sur le marché rend la censure peu pratique, ce qui profite aux utilisateurs. En revanche, l'existence de dark pools centralisés et basés sur la confiance concentrerait le pouvoir entre les mains de quelques constructeurs de blocs et augmenterait la possibilité de censure.

2. Le logiciel API pour les builders est un logiciel libre, ce qui permet à quiconque de proposer des services de construction de blocs. Cela signifie que les utilisateurs ne sont pas obligés d'utiliser un constructeur de blocs particulier et cela améliore la neutralité et l'absence de permission d'Ethereum. De plus, les commerçants à la recherche de MEV ne contribueront pas par inadvertance à la centralisation en utilisant des canaux de transaction privés.

## Ressources connexes {#related-resources}

- [Documentation de Flashbots](https://docs.flashbots.net/)
- [GitHub de Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Suivi avec des statistiques en temps réel pour les relais MEV-Boost et les constructeurs de blocs_

## En savoir plus {#further-reading}

- [Qu'est-ce que la valeur extractible par les mineurs (MEV) ?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [La MEV et moi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum est une forêt sombre](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [S'échapper de la forêt sombre](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots : devancer la crise de la MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Fils de discussion sur la MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost : architecture Flashbots prête pour La Fusion](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Qu'est-ce que MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Pourquoi utiliser mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Le guide du voyageur pour Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
