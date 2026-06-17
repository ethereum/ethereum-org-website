---
title: Valeur maximale extractible (MEV)
description: Une introduction à la valeur maximale extractible (MEV)
lang: fr
---

La valeur maximale extractible (MEV) fait référence à la valeur maximale qui peut être extraite de la production de blocs au-delà de la récompense de bloc standard et des frais de gaz en incluant, excluant et modifiant l'ordre des transactions dans un bloc.

## Valeur maximale extractible {#maximal-extractable-value}

La valeur maximale extractible a d'abord été appliquée dans le contexte de la [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/), et initialement appelée « valeur extractible par le mineur » (miner extractable value). Cela s'explique par le fait que dans la preuve de travail, les mineurs contrôlent l'inclusion, l'exclusion et l'ordonnancement des transactions. Cependant, depuis la transition vers la preuve d'enjeu (PoS) via [La Fusion](/roadmap/merge), les validateurs sont responsables de ces rôles, et le minage ne fait plus partie du protocole [Ethereum](/). Les méthodes d'extraction de valeur existent toujours, c'est pourquoi le terme « Valeur maximale extractible » est désormais utilisé à la place.

## Prérequis {#prerequisites}

Assurez-vous d'être familier avec les [transactions](/developers/docs/transactions/), les [blocs](/developers/docs/blocks/), la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) et le [gaz](/developers/docs/gas/). Une familiarité avec les [applications décentralisées (dapps)](/apps/) et la [finance décentralisée (DeFi)](/defi/) est également utile.

## Extraction de MEV {#mev-extraction}

En théorie, la MEV revient entièrement aux validateurs car ils sont la seule partie à pouvoir garantir l'exécution d'une opportunité de MEV rentable. En pratique, cependant, une grande partie de la MEV est extraite par des participants indépendants du réseau appelés « chercheurs » (searchers). Les chercheurs exécutent des algorithmes complexes sur les données de la chaîne de blocs pour détecter des opportunités de MEV rentables et disposent de bots pour soumettre automatiquement ces transactions rentables au réseau.

Les validateurs obtiennent tout de même une partie du montant total de la MEV car les chercheurs sont prêts à payer des frais de gaz élevés (qui reviennent au validateur) en échange d'une plus grande probabilité d'inclusion de leurs transactions rentables dans un bloc. En supposant que les chercheurs soient économiquement rationnels, les frais de gaz qu'un chercheur est prêt à payer s'élèveront jusqu'à 100 % de la MEV du chercheur (car si les frais de gaz étaient plus élevés, le chercheur perdrait de l'argent).

Ainsi, pour certaines opportunités de MEV très compétitives, telles que l'[arbitrage sur DEX](#mev-examples-dex-arbitrage), les chercheurs peuvent avoir à payer 90 % ou même plus de leurs revenus totaux de MEV en frais de gaz au validateur, car de nombreuses personnes souhaitent exécuter la même opération d'arbitrage rentable. Cela s'explique par le fait que la seule façon de garantir l'exécution de leur transaction d'arbitrage est de la soumettre avec le prix du gaz le plus élevé.

### Optimisation du gaz (Gas golfing) {#mev-extraction-gas-golfing}

Cette dynamique a fait de l'excellence en « gas golfing » — la programmation de transactions de manière à ce qu'elles utilisent le moins de gaz possible — un avantage concurrentiel, car cela permet aux chercheurs de fixer un prix du gaz plus élevé tout en maintenant leurs frais de gaz totaux constants (puisque frais de gaz = prix du gaz \* gaz utilisé).

Quelques techniques bien connues d'optimisation du gaz incluent : l'utilisation d'adresses qui commencent par une longue chaîne de zéros (par ex., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) car elles prennent moins d'espace (et donc de gaz) à stocker ; et le fait de laisser de petits soldes de jetons [ERC-20](/developers/docs/standards/tokens/erc-20/) dans les contrats, car il en coûte plus de gaz d'initialiser un créneau de stockage (le cas si le solde est de 0) que de mettre à jour un créneau de stockage. Trouver de nouvelles techniques pour réduire l'utilisation du gaz est un domaine de recherche actif parmi les chercheurs.

### Frontrunners généralisés {#mev-extraction-generalized-frontrunners}

Plutôt que de programmer des algorithmes complexes pour détecter des opportunités de MEV rentables, certains chercheurs exécutent des frontrunners généralisés. Les frontrunners généralisés sont des bots qui surveillent la mempool pour détecter des transactions rentables. Le frontrunner copiera le code de la transaction potentiellement rentable, remplacera les adresses par l'adresse du frontrunner, et exécutera la transaction localement pour vérifier que la transaction modifiée génère un profit pour l'adresse du frontrunner. Si la transaction est effectivement rentable, le frontrunner soumettra la transaction modifiée avec l'adresse remplacée et un prix du gaz plus élevé, devançant (« frontrunning ») la transaction originale et obtenant la MEV du chercheur initial.

### Flashbots {#mev-extraction-flashbots}

Flashbots est un projet indépendant qui étend les clients d'exécution avec un service permettant aux chercheurs de soumettre des transactions MEV aux validateurs sans les révéler à la mempool publique. Cela empêche les transactions d'être devancées par des frontrunners généralisés.

## Exemples de MEV {#mev-examples}

La MEV émerge sur la chaîne de blocs de plusieurs manières.

### Arbitrage sur DEX {#mev-examples-dex-arbitrage}

L'arbitrage sur [échange décentralisé](/glossary/#dex) (DEX) est l'opportunité de MEV la plus simple et la plus connue. Par conséquent, c'est aussi la plus compétitive.

Cela fonctionne ainsi : si deux DEX proposent un jeton à deux prix différents, quelqu'un peut acheter le jeton sur le DEX au prix le plus bas et le vendre sur le DEX au prix le plus élevé en une seule transaction atomique. Grâce aux mécanismes de la chaîne de blocs, il s'agit d'un véritable arbitrage sans risque.

[Voici un exemple](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) d'une transaction d'arbitrage rentable où un chercheur a transformé 1 000 ETH en 1 045 ETH en tirant parti de la différence de prix de la paire ETH/DAI sur Uniswap par rapport à Sushiswap.

### Liquidations {#mev-examples-liquidations}

Les liquidations de protocoles de prêt présentent une autre opportunité de MEV bien connue.

Les protocoles de prêt comme MakerDAO et Aave exigent des utilisateurs qu'ils déposent un collatéral (par ex., de l'ETH). Ce collatéral déposé est ensuite utilisé pour prêter à d'autres utilisateurs.

Les utilisateurs peuvent ensuite emprunter des actifs et des jetons à d'autres en fonction de leurs besoins (par ex., vous pourriez emprunter du MKR si vous souhaitez voter dans une proposition de gouvernance MakerDAO) jusqu'à un certain pourcentage de leur collatéral déposé. Par exemple, si le montant de l'emprunt est au maximum de 30 %, un utilisateur qui dépose 100 DAI dans le protocole peut emprunter jusqu'à l'équivalent de 30 DAI d'un autre actif. Le protocole détermine le pourcentage exact du pouvoir d'emprunt.

À mesure que la valeur du collatéral d'un emprunteur fluctue, son pouvoir d'emprunt fluctue également. Si, en raison des fluctuations du marché, la valeur des actifs empruntés dépasse, disons, 30 % de la valeur de leur collatéral (encore une fois, le pourcentage exact est déterminé par le protocole), le protocole permet généralement à quiconque de liquider le collatéral, remboursant instantanément les prêteurs (cela ressemble au fonctionnement des [appels de marge](https://www.investopedia.com/terms/m/margincall.asp) dans la finance traditionnelle). En cas de liquidation, l'emprunteur doit généralement payer des frais de liquidation élevés, dont une partie revient au liquidateur — c'est là qu'intervient l'opportunité de MEV.

Les chercheurs sont en concurrence pour analyser les données de la chaîne de blocs aussi vite que possible afin de déterminer quels emprunteurs peuvent être liquidés et être les premiers à soumettre une transaction de liquidation pour percevoir les frais de liquidation pour eux-mêmes.

### Trading en sandwich {#mev-examples-sandwich-trading}

Le trading en sandwich est une autre méthode courante d'extraction de MEV.

Pour réaliser un sandwich, un chercheur surveillera la mempool à la recherche de transactions importantes sur les DEX. Par exemple, supposons que quelqu'un veuille acheter 10 000 UNI avec du DAI sur Uniswap. Une transaction de cette ampleur aura un effet significatif sur la paire UNI/DAI, augmentant potentiellement de manière importante le prix de l'UNI par rapport au DAI.

Un chercheur peut calculer l'effet de prix approximatif de cette transaction importante sur la paire UNI/DAI et exécuter un ordre d'achat optimal immédiatement _avant_ la transaction importante, achetant de l'UNI à bas prix, puis exécuter un ordre de vente immédiatement _après_ la transaction importante, le vendant au prix plus élevé causé par l'ordre important.

Le trading en sandwich est cependant plus risqué car il n'est pas atomique (contrairement à l'arbitrage sur DEX, comme décrit ci-dessus) et est sujet à une [attaque salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV sur les NFT {#mev-examples-nfts}

La MEV dans l'espace des NFT est un phénomène émergent, et n'est pas nécessairement rentable.

Cependant, puisque les transactions de NFT se produisent sur la même chaîne de blocs partagée par toutes les autres transactions Ethereum, les chercheurs peuvent également utiliser des techniques similaires à celles utilisées dans les opportunités de MEV traditionnelles sur le marché des NFT.

Par exemple, s'il y a un lancement (drop) de NFT populaire et qu'un chercheur souhaite un certain NFT ou un ensemble de NFT, il peut programmer une transaction de manière à être le premier dans la file d'attente pour acheter le NFT, ou il peut acheter l'ensemble complet des NFT en une seule transaction. Ou si un NFT est [listé par erreur à un prix bas](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un chercheur peut devancer les autres acheteurs et se l'arracher à bas prix.

Un exemple marquant de MEV sur les NFT s'est produit lorsqu'un chercheur a dépensé 7 millions de dollars pour [acheter](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) chaque Cryptopunk au prix plancher. Un chercheur en chaîne de blocs a [expliqué sur Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) comment l'acheteur a travaillé avec un fournisseur de MEV pour garder son achat secret.

### La longue traîne {#mev-examples-long-tail}

L'arbitrage sur DEX, les liquidations et le trading en sandwich sont tous des opportunités de MEV très connues et ont peu de chances d'être rentables pour de nouveaux chercheurs. Cependant, il existe une longue traîne d'opportunités de MEV moins connues (la MEV sur les NFT est sans doute l'une de ces opportunités).

Les chercheurs qui débutent tout juste pourraient avoir plus de succès en cherchant de la MEV dans cette longue traîne. Le [site d'offres d'emploi MEV](https://github.com/flashbots/mev-job-board) de Flashbots répertorie quelques opportunités émergentes.

## Effets de la MEV {#effects-of-mev}

La MEV n'est pas que mauvaise — il y a des conséquences à la fois positives et négatives à la MEV sur Ethereum.

### Le bon {#effects-of-mev-the-good}

De nombreux projets de DeFi s'appuient sur des acteurs économiquement rationnels pour garantir l'utilité et la stabilité de leurs protocoles. Par exemple, l'arbitrage sur DEX garantit que les utilisateurs obtiennent les meilleurs prix, les plus corrects pour leurs jetons, et les protocoles de prêt s'appuient sur des liquidations rapides lorsque les emprunteurs tombent en dessous des ratios de collatéralisation pour s'assurer que les prêteurs soient remboursés.

Sans des chercheurs rationnels cherchant et corrigeant les inefficacités économiques et tirant parti des incitations économiques des protocoles, les protocoles de DeFi et les dapps en général pourraient ne pas être aussi robustes qu'ils le sont aujourd'hui.

### Le mauvais {#effects-of-mev-the-bad}

Au niveau de la couche applicative, certaines formes de MEV, comme le trading en sandwich, entraînent une expérience incontestablement pire pour les utilisateurs. Les utilisateurs qui sont pris en sandwich font face à un glissement accru et à une moins bonne exécution de leurs transactions.

Au niveau de la couche réseau, les frontrunners généralisés et les enchères de prix du gaz dans lesquelles ils s'engagent souvent (lorsque deux frontrunners ou plus sont en concurrence pour que leur transaction soit incluse dans le bloc suivant en augmentant progressivement le prix du gaz de leurs propres transactions) entraînent une congestion du réseau et des prix du gaz élevés pour tous les autres essayant d'exécuter des transactions régulières.

Au-delà de ce qui se passe _à l'intérieur_ des blocs, la MEV peut avoir des effets délétères _entre_ les blocs. Si la MEV disponible dans un bloc dépasse considérablement la récompense de bloc standard, les validateurs peuvent être incités à réorganiser les blocs et à capturer la MEV pour eux-mêmes, provoquant une réorganisation de la chaîne de blocs et une instabilité du consensus.

Cette possibilité de réorganisation de la chaîne de blocs a été [précédemment explorée sur la chaîne de blocs Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). À mesure que la récompense de bloc de Bitcoin diminue de moitié et que les frais de transaction constituent une part de plus en plus importante de la récompense de bloc, des situations surviennent où il devient économiquement rationnel pour les mineurs de renoncer à la récompense du bloc suivant et de reminer plutôt les blocs passés avec des frais plus élevés. Avec la croissance de la MEV, le même genre de situation pourrait se produire sur Ethereum, menaçant l'intégrité de la chaîne de blocs.

## État de la MEV {#state-of-mev}

L'extraction de MEV a explosé début 2021, entraînant des prix du gaz extrêmement élevés au cours des premiers mois de l'année. L'émergence du relais MEV de Flashbots a réduit l'efficacité des frontrunners généralisés et a déplacé les enchères de prix du gaz hors chaîne, abaissant les prix du gaz pour les utilisateurs ordinaires.

Bien que de nombreux chercheurs gagnent encore beaucoup d'argent grâce à la MEV, à mesure que les opportunités deviennent plus connues et que de plus en plus de chercheurs se font concurrence pour la même opportunité, les validateurs captureront de plus en plus de revenus totaux de MEV (car le même type d'enchères de gaz que celles décrites initialement ci-dessus se produit également dans Flashbots, bien que de manière privée, et les validateurs captureront les revenus de gaz qui en résultent). La MEV n'est pas non plus unique à Ethereum, et à mesure que les opportunités deviennent plus compétitives sur Ethereum, les chercheurs se tournent vers des chaînes de blocs alternatives comme la Binance Smart Chain, où des opportunités de MEV similaires à celles d'Ethereum existent avec moins de concurrence.

D'autre part, la transition de la preuve de travail à la preuve d'enjeu et l'effort continu pour mettre à l'échelle Ethereum en utilisant des rollups modifient tous le paysage de la MEV d'une manière qui reste encore quelque peu floue. On ne sait pas encore très bien comment le fait d'avoir des proposeurs de blocs garantis connus légèrement à l'avance modifie la dynamique de l'extraction de MEV par rapport au modèle probabiliste de la preuve de travail, ou comment cela sera perturbé lorsque l'[élection d'un leader secret unique (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) et la [technologie de validateur distribué (DVT)](/staking/dvt/) seront mises en œuvre. De même, il reste à voir quelles opportunités de MEV existeront lorsque la majeure partie de l'activité des utilisateurs sera transférée d'Ethereum vers ses rollups de couche 2 (l2) et ses fragments (shards).

## La MEV dans la preuve d'enjeu (PoS) d'Ethereum {#mev-in-ethereum-proof-of-stake}

Comme expliqué, la MEV a des implications négatives sur l'expérience utilisateur globale et la sécurité de la couche de consensus. Mais la transition d'Ethereum vers un consensus de preuve d'enjeu (surnommée « La Fusion ») introduit potentiellement de nouveaux risques liés à la MEV :

### Centralisation des validateurs {#validator-centralization}

Dans l'Ethereum post-Fusion, les validateurs (ayant effectué des dépôts de sécurité de 32 ETH) parviennent à un consensus sur la validité des blocs ajoutés à la chaîne balise. Étant donné que 32 ETH peuvent être hors de portée pour beaucoup, [rejoindre un pool de staking](/staking/pools/) peut être une option plus réalisable. Néanmoins, une distribution saine de [stakers en solo](/staking/solo/) est idéale, car elle atténue la centralisation des validateurs et améliore la sécurité d'Ethereum.

Cependant, on pense que l'extraction de MEV est capable d'accélérer la centralisation des validateurs. Cela s'explique en partie par le fait que, comme les validateurs [gagnent moins pour proposer des blocs](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) que les mineurs auparavant, l'extraction de MEV a grandement [influencé les revenus des validateurs](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) depuis [La Fusion](/roadmap/merge/).

Les pools de staking plus importants auront probablement plus de ressources à investir dans les optimisations nécessaires pour capturer les opportunités de MEV. Plus ces pools extraient de MEV, plus ils ont de ressources pour améliorer leurs capacités d'extraction de MEV (et augmenter leurs revenus globaux), créant essentiellement des [économies d'échelle](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Avec moins de ressources à leur disposition, les stakers en solo peuvent être incapables de profiter des opportunités de MEV. Cela peut accroître la pression sur les validateurs indépendants pour qu'ils rejoignent de puissants pools de staking afin d'augmenter leurs revenus, réduisant ainsi la décentralisation d'Ethereum.

### Mempools à permission {#permissioned-mempools}

En réponse aux attaques de trading en sandwich et de frontrunning, les traders peuvent commencer à conclure des accords hors chaîne avec les validateurs pour la confidentialité des transactions. Au lieu d'envoyer une transaction MEV potentielle à la mempool publique, le trader l'envoie directement au validateur, qui l'inclut dans un bloc et partage les bénéfices avec le trader.

Les « dark pools » sont une version plus large de cet arrangement et fonctionnent comme des mempools à permission, accessibles uniquement sur autorisation, ouvertes aux utilisateurs prêts à payer certains frais. Cette tendance diminuerait la nature sans permission et l'absence de confiance requise d'Ethereum, et transformerait potentiellement la chaîne de blocs en un mécanisme « pay-to-play » qui favorise le plus offrant.

Les mempools à permission accéléreraient également les risques de centralisation décrits dans la section précédente. Les grands pools gérant plusieurs validateurs bénéficieront probablement de l'offre de confidentialité des transactions aux traders et aux utilisateurs, augmentant ainsi leurs revenus de MEV.

La lutte contre ces problèmes liés à la MEV dans l'Ethereum post-Fusion est un domaine de recherche fondamental. À ce jour, deux solutions proposées pour réduire l'impact négatif de la MEV sur la décentralisation et la sécurité d'Ethereum après La Fusion sont la [**séparation proposant-constructeur (PBS)**](/roadmap/pbs/) et l'[**API Builder**](https://github.com/ethereum/builder-specs).

### Séparation proposant-constructeur {#proposer-builder-separation}

Dans la preuve de travail comme dans la preuve d'enjeu, un nœud qui construit un bloc le propose pour ajout à la chaîne aux autres nœuds participant au consensus. Un nouveau bloc fait partie de la chaîne canonique après qu'un autre mineur a construit par-dessus (en PoW) ou qu'il a reçu des attestations de la majorité des validateurs (en PoS).

La combinaison des rôles de producteur de blocs et de proposeur de blocs est ce qui introduit la plupart des problèmes liés à la MEV décrits précédemment. Par exemple, les nœuds de consensus sont incités à déclencher des réorganisations de chaîne dans des [attaques de bandits temporels (time-bandit attacks)](https://www.mev.wiki/attack-examples/time-bandit-attack) pour maximiser les gains de MEV.

La [séparation proposant-constructeur (PBS)](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) est conçue pour atténuer l'impact de la MEV, en particulier au niveau de la couche de consensus. La caractéristique majeure de la PBS est la séparation des rôles de producteur de blocs et de proposeur de blocs. Les validateurs sont toujours responsables de la proposition et du vote sur les blocs, mais une nouvelle classe d'entités spécialisées, appelées **constructeurs de blocs**, est chargée d'ordonner les transactions et de construire les blocs.

Sous la PBS, un constructeur de blocs crée un lot de transactions et place une offre pour son inclusion dans un bloc de la chaîne balise (en tant que « charge utile d'exécution »). Le validateur sélectionné pour proposer le bloc suivant vérifie ensuite les différentes offres et choisit le lot avec les frais les plus élevés. La PBS crée essentiellement un marché d'enchères, où les constructeurs négocient avec les validateurs vendant de l'espace de bloc.

Les conceptions actuelles de la PBS utilisent un [schéma d'engagement-révélation (commit-reveal)](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) dans lequel les constructeurs ne publient qu'un engagement cryptographique sur le contenu d'un bloc (en-tête de bloc) avec leurs offres. Après avoir accepté l'offre gagnante, le proposant crée une proposition de bloc signée qui inclut l'en-tête de bloc. Le constructeur de blocs est censé publier le corps complet du bloc après avoir vu la proposition de bloc signée, et il doit également recevoir suffisamment d'[attestations](/glossary/#attestation) des validateurs avant d'être finalisé.

#### Comment la séparation proposant-constructeur atténue-t-elle l'impact de la MEV ? {#how-does-pbs-curb-mev-impact}

La séparation proposant-constructeur intégrée au protocole réduit l'effet de la MEV sur le consensus en retirant l'extraction de MEV de la compétence des validateurs. Au lieu de cela, les constructeurs de blocs exécutant du matériel spécialisé captureront les opportunités de MEV à l'avenir.

Cela n'exclut cependant pas totalement les validateurs des revenus liés à la MEV, car les constructeurs doivent faire des offres élevées pour que leurs blocs soient acceptés par les validateurs. Néanmoins, les validateurs n'étant plus directement concentrés sur l'optimisation des revenus de MEV, la menace des attaques de bandits temporels diminue.

La séparation proposant-constructeur réduit également les risques de centralisation de la MEV. Par exemple, l'utilisation d'un schéma d'engagement-révélation supprime la nécessité pour les constructeurs de faire confiance aux validateurs pour ne pas voler l'opportunité de MEV ou l'exposer à d'autres constructeurs. Cela abaisse la barrière pour que les stakers en solo bénéficient de la MEV, sinon, les constructeurs auraient tendance à favoriser les grands pools avec une réputation hors chaîne et à conclure des accords hors chaîne avec eux.

De même, les validateurs n'ont pas à faire confiance aux constructeurs pour ne pas retenir les corps de blocs ou publier des blocs invalides car le paiement est inconditionnel. Les frais du validateur sont toujours traités même si le bloc proposé est indisponible ou déclaré invalide par d'autres validateurs. Dans ce dernier cas, le bloc est simplement rejeté, forçant le constructeur de blocs à perdre tous les frais de transaction et les revenus de MEV.

### API Builder {#builder-api}

Bien que la séparation proposant-constructeur promette de réduire les effets de l'extraction de MEV, sa mise en œuvre nécessite des modifications du protocole de consensus. Plus précisément, la règle de [choix de fork](/developers/docs/consensus-mechanisms/pos/#fork-choice) sur la chaîne balise devrait être mise à jour. L'[API Builder](https://github.com/ethereum/builder-specs) est une solution temporaire visant à fournir une implémentation fonctionnelle de la séparation proposant-constructeur, bien qu'avec des hypothèses de confiance plus élevées.

L'API Builder est une version modifiée de l'[API Engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilisée par les clients de la couche de consensus pour demander des charges utiles d'exécution aux clients de la couche d'exécution. Comme indiqué dans la [spécification du validateur honnête](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), les validateurs sélectionnés pour les tâches de proposition de blocs demandent un lot de transactions à un client d'exécution connecté, qu'ils incluent dans le bloc proposé de la chaîne balise.

L'API Builder agit également comme un intergiciel (middleware) entre les validateurs et les clients de la couche d'exécution ; mais elle est différente car elle permet aux validateurs sur la chaîne balise de s'approvisionner en blocs auprès d'entités externes (au lieu de construire un bloc localement à l'aide d'un client d'exécution).

Voici un aperçu du fonctionnement de l'API Builder :

1. L'API Builder connecte le validateur à un réseau de constructeurs de blocs exécutant des clients de la couche d'exécution. Comme dans la PBS, les constructeurs sont des parties spécialisées qui investissent dans la construction de blocs gourmande en ressources et utilisent différentes stratégies pour maximiser les revenus tirés de la MEV + les pourboires de priorité.

2. Un validateur (exécutant un client de la couche de consensus) demande des charges utiles d'exécution ainsi que des offres au réseau de constructeurs. Les offres des constructeurs contiendront l'en-tête de la charge utile d'exécution — un engagement cryptographique sur le contenu de la charge utile — et des frais à payer au validateur.

3. Le validateur examine les offres entrantes et choisit la charge utile d'exécution avec les frais les plus élevés. À l'aide de l'API Builder, le validateur crée une proposition de bloc phare « aveuglée » qui ne comprend que sa signature et l'en-tête de la charge utile d'exécution et l'envoie au constructeur.

4. Le constructeur exécutant l'API Builder est censé répondre avec la charge utile d'exécution complète après avoir vu la proposition de bloc aveuglée. Cela permet au validateur de créer un bloc phare « signé », qu'il propage à travers le réseau.

5. Un validateur utilisant l'API Builder est toujours censé construire un bloc localement au cas où le constructeur de blocs ne répondrait pas rapidement, afin de ne pas manquer les récompenses de proposition de bloc. Cependant, le validateur ne peut pas créer un autre bloc en utilisant soit les transactions désormais révélées, soit un autre ensemble, car cela équivaudrait à une _équivoque_ (signer deux blocs dans le même créneau), ce qui est une infraction passible de slashing.

Un exemple d'implémentation de l'API Builder est [MEV-Boost](https://github.com/flashbots/mev-boost), une amélioration du [mécanisme d'enchères de Flashbots](https://docs.flashbots.net/flashbots-auction/overview) conçue pour freiner les externalités négatives de la MEV sur Ethereum. Les enchères de Flashbots permettent aux validateurs dans la preuve d'enjeu d'externaliser le travail de construction de blocs rentables à des parties spécialisées appelées **chercheurs**.
![A diagram showing the MEV flow in detail](./mev.png)

Les chercheurs recherchent des opportunités de MEV lucratives et envoient des lots de transactions aux proposeurs de blocs avec une [offre à prix scellé](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) pour inclusion dans le bloc. Le validateur exécutant mev-geth, une version fork du client Go Ethereum (Geth), n'a qu'à choisir le lot le plus rentable et l'inclure dans le nouveau bloc. Pour protéger les proposeurs de blocs (validateurs) du spam et des transactions invalides, les lots de transactions passent par des **relais** pour validation avant d'arriver au proposant.

MEV-Boost conserve le même fonctionnement que les enchères originales de Flashbots, bien qu'avec de nouvelles fonctionnalités conçues pour le passage d'Ethereum à la preuve d'enjeu. Les chercheurs trouvent toujours des transactions MEV rentables à inclure dans les blocs, mais une nouvelle classe de parties spécialisées, appelées **constructeurs**, est responsable de l'agrégation des transactions et des lots en blocs. Un constructeur accepte les offres à prix scellé des chercheurs et exécute des optimisations pour trouver l'ordonnancement le plus rentable.

Le relais est toujours responsable de la validation des lots de transactions avant de les transmettre au proposant. Cependant, MEV-Boost introduit des **entierscements (escrows)** responsables de fournir la [disponibilité des données (DA)](/developers/docs/data-availability/) en stockant les corps de blocs envoyés par les constructeurs et les en-têtes de blocs envoyés par les validateurs. Ici, un validateur connecté à un relais demande les charges utiles d'exécution disponibles et utilise l'algorithme d'ordonnancement de MEV-Boost pour sélectionner l'en-tête de la charge utile avec l'offre la plus élevée + les pourboires de MEV.

#### Comment l'API Builder atténue-t-elle l'impact de la MEV ? {#how-does-builder-api-curb-mev-impact}

Le principal avantage de l'API Builder est son potentiel à démocratiser l'accès aux opportunités de MEV. L'utilisation de schémas d'engagement-révélation élimine les hypothèses de confiance et réduit les barrières à l'entrée pour les validateurs cherchant à bénéficier de la MEV. Cela devrait réduire la pression sur les stakers en solo pour s'intégrer à de grands pools de staking afin d'augmenter les profits de MEV.

La mise en œuvre généralisée de l'API Builder encouragera une plus grande concurrence entre les constructeurs de blocs, ce qui augmente la résistance à la censure. Comme les validateurs examinent les offres de plusieurs constructeurs, un constructeur ayant l'intention de censurer une ou plusieurs transactions d'utilisateurs doit surenchérir sur tous les autres constructeurs non censeurs pour réussir. Cela augmente considérablement le coût de la censure des utilisateurs et décourage cette pratique.

Certains projets, tels que MEV-Boost, utilisent l'API Builder dans le cadre d'une structure globale conçue pour fournir la confidentialité des transactions à certaines parties, telles que les traders essayant d'éviter les attaques de frontrunning/sandwich. Ceci est réalisé en fournissant un canal de communication privé entre les utilisateurs et les constructeurs de blocs. Contrairement aux mempools à permission décrites précédemment, cette approche est bénéfique pour les raisons suivantes :

1. L'existence de multiples constructeurs sur le marché rend la censure peu pratique, ce qui profite aux utilisateurs. En revanche, l'existence de dark pools centralisés et basés sur la confiance concentrerait le pouvoir entre les mains de quelques constructeurs de blocs et augmenterait la possibilité de censure.

2. Le logiciel de l'API Builder est open-source, ce qui permet à quiconque d'offrir des services de constructeur de blocs. Cela signifie que les utilisateurs ne sont pas obligés d'utiliser un constructeur de blocs particulier et améliore la neutralité et la nature sans permission d'Ethereum. De plus, les traders à la recherche de MEV ne contribueront pas par inadvertance à la centralisation en utilisant des canaux de transaction privés.

## Ressources associées {#related-resources}

- [Documentation de Flashbots](https://docs.flashbots.net/)
- [GitHub de Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Tracker avec des statistiques en temps réel pour les relais MEV-Boost et les constructeurs de blocs_

## Lectures complémentaires {#further-reading}

- [Qu'est-ce que la valeur extractible par le mineur (MEV) ?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [La MEV et moi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum est une forêt sombre](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [S'échapper de la forêt sombre](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots : Devancer la crise de la MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Fils de discussion sur la MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost : Architecture Flashbots prête pour La Fusion](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Qu'est-ce que MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [Pourquoi exécuter mev-boost ?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Le guide du voyageur galactique pour Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)