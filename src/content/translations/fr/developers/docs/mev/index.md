---
title: Valeur Extractible Maximale (Maximal extractable value - MEV)
description: Une introduction à la Valeur Extractible Maximale (Maximal extractable value - MEV)
lang: fr
---

La Valeur Extractible Maximale (MEV) représente la valeur maximale qui peut être extraite de la production d'un bloc au-delà de la récompense standard du bloc et des frais de gaz, en incluant, en excluant ou en modifiant l'ordre des transactions au sein d'un bloc.

### Valeur extractible par minage

Ce concept a initialement été appliqué dans le cadre de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/) et était alors appelé « valeur extractible du mineur ». Ceci est dû au fait que dans la preuve de travail, les mineurs contrôlent les inclusions, exclusions et l'ordre des transactions. Cependant, après le passage à la preuve d'enjeu qu'entraînera [La Fusion](/upgrades/merge), ces rôles seront confiés aux validateurs et le minage ne sera plus possible. Les méthodes d'extraction de valeur utilisées aujourd'hui seront toujours d'actualité après l'arrivée de La Fusion, un changement de nom était de ce fait nécessaire. Afin de garder le même acronyme, tout en conservant la même signification de base, l'expression « valeur extractible maximale » est maintenant utilisée comme remplacement plus général.

## Prérequis {#prerequisites}

Assurez-vous d'être à l'aise avec les concepts de [transactions](/developers/docs/transactions/), [blocs](/developers/docs/blocks/), [gaz](/developers/docs/gas/) ainsi que [de minage](/developers/docs/consensus-mechanisms/pow/mining/). Se familiariser avec les [applications décentralisées (dApps)](/dapps/) et la [finance décentralisée (DeFi)](/defi/) peut également être utile.

## Extraction MEV {#mev-extraction}

En théorie, la MEV bénéficie uniquement aux mineurs, car ils sont les seuls à pouvoir garantir l’exécution d'une opportunité de MEV rentable (à tout le moins pour la chaîne actuelle basée sur la preuve de travail. Cela changera après [La Fusion](/upgrades/merge/)). Cependant, en pratique, une grande partie des MEV est extraite par des participants indépendants du réseau qui sont appelés les « chercheurs ». Les chercheurs exécutent des algorithmes complexes sur les données de la blockchain pour détecter les opportunités MEV rentables et soumettent automatiquement au réseau ces transactions rentables via des programmes informatiques automatisés.

Les mineurs obtiennent dans tous les cas une partie du montant total du MEV, car les chercheurs sont prêts à payer des frais de gaz élevés (revenant aux mineurs) en échange d'une plus grande probabilité d'inclure leurs transactions rentables dans un bloc. En supposant que les chercheurs soient économiquement rationnels, les frais de gaz qu'un chercheur est prêt à payer pourront atteindre 100 % du MEV du chercheur (parce que si les frais de gaz étaient plus élevés, le chercheur perdrait de l'argent).

Ainsi, pour certaines opportunités de MEV hautement compétitives, telles que [l'arbitrage DEX](#mev-examples-dex-arbitrage), les chercheurs devront parfois payer au mineur des frais de gaz, s'élevant à 90 % (ou même supérieur) de leurs MEV totaux, car un grand nombre de personnes d'utilisateurs souhaitent également utiliser ce même profil d'arbitrage rentable. En effet, la seule façon de garantir que leur transaction d'arbitrage soit exécutée est de soumettre la transaction avec le prix de gaz le plus élevé.

### Le gas-golfing {#mev-extraction-gas-golfing}

Cette dynamique a fait du « gas-golfing » — le fait de programmer des transactions pour qu'elles utilisent le moins de gaz possible — un avantage concurrentiel, parce qu'il permet aux chercheurs de fixer un prix de gaz plus élevé tout en gardant leurs frais totaux constants (puisque les frais de gaz = prix du gaz \* gaz utilisé).

Quelques techniques de gas-golfing bien connues consistent à : utiliser des adresses commençant par une longue chaîne de zéros (p. ex. [0x000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) puisqu'elles occupent moins de place (et donc de gaz); ou bien laisser volontairement de petits soldes de jetons [ERC-20](/developers/docs/standards/tokens/erc-20/) dans les contrats, car il est plus cher d'initialiser un emplacement de stockage (ce qui se passe lorsque le solde est 0) que de le mettre à jour. Trouver de nouvelles techniques pour réduire la consommation de gaz est un domaine de recherche actif parmi les chercheurs.

### Extracteurs embusqués (Frontrunners) {#mev-extraction-generalized-frontrunners}

Plutôt que de programmer des algorithmes complexes pour détecter des opportunités MEV rentables, certains chercheurs exécutent des favoris généralisés. Les favoris généralisés sont des programmes automatiques qui scrutent le mempool pour détecter les transactions rentables. Le favori copiera le code de la transaction potentiellement rentable, remplacera les adresses par l'adresse du favori et exécutera la transaction localement pour vérifier doublement que la transaction modifiée génère un profit pour l'adresse du favori. Si la transaction est effectivement rentable, le favori soumettra la transaction modifiée avec l'adresse remplacée et un prix de gaz plus élevé devenant ainsi le favori de la transaction originale et ainsi obtenir le MEV du chercheur original.

### Flashbots {#mev-extraction-flashbots}

Flashbots est un projet indépendant qui étend le client go-ethereum avec un service qui permet aux chercheurs de soumettre des transactions MEV aux mineurs sans les révéler au public mempool. Cela empêche les transactions d'être exécutées par des favoris généralisés.

Au moment où nous écrivons ces lignes, une partie importante des transactions MEV est acheminée par Flashbots, ce qui veut dire que les favoris généralisés ne sont pas aussi efficaces qu'ils ne l'étaient autrefois.

## Exemples de MEV {#mev-examples}

Les MEV apparaissent sur la blockchain de différentes façons.

### Arbitrage DEX {#mev-examples-dex-arbitrage}

[L'arbitrage sur les plateformes d'échanges décentralisées](/glossary/#dex) (DEX) est la possibilité MEV la plus simple et la plus connue. Par conséquent, c'est aussi le plus compétitif.

Cela fonctionne ainsi : si deux DEX proposent un jeton à deux prix différents, quelqu'un peut acheter sur le DEX le jeton au prix le plus bas et le vendre au prix le plus élevé dans une transaction atomique unique. Grâce au mécanisme de la blockchain, c'est véritablement un arbitrage sans risque.

[Voici l'exemple](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) d'une transaction d'arbitrage rentable où un chercheur a transformé 1 000 ETH en 1 045 ETH en profitant de prix différents de la paire ETH/DAI sur Uniswap vs. Sushiswap.

### Liquidations {#mev-examples-liquidations}

Les liquidations dans les protocoles de prêt représentent une autre occasion bien connue de MEV.

Les protocoles de prêts comme Maker et Aave fonctionnent en imposant aux utilisateurs de déposer une forme de garantie (par exemple des ETH). Les utilisateurs peuvent alors emprunter différents actifs et jetons à d'autres en fonction de ce dont ils ont besoin (par exemple, ils peuvent emprunter des MKR s'ils veulent voter sur une proposition de gouvernance MakerDAO ou des SUSHI s'ils veulent gagner une partie des frais de négociation sur Sushiswap) jusqu'à un certain montant de leur garantie déposée — par exemple, 30 % (le pourcentage exact de la capacité d'emprunt est déterminé par le protocole). Les utilisateurs à qui ils empruntent les autres jetons assument le rôle de prêteurs dans ce cas.

La valeur des collatéraux d'un emprunteur fluctue, tout comme leur pouvoir d'emprunt. Si, en raison des fluctuations du marché, la valeur des actifs empruntés excède par exemple 30 % de la valeur de leur garantie (encore une fois, le pourcentage exact est déterminé par le protocole), le protocole permet généralement à quiconque de liquider la garantie et de rembourser instantanément les prêteurs (système similaire à la façon dont les [appels de marge](https://www.investopedia.com/terms/m/margincall.asp) fonctionnent dans la finance traditionnelle). En cas de liquidation, l'emprunteur doit généralement payer des frais de liquidation élevés, dont certains vont au liquidateur — c’est là que se trouve la possibilité du MEV.

Les chercheurs rivalisent pour analyser les données de la blockchain le plus rapidement possible afin de déterminer quels emprunteurs peuvent être liquidés et être les premiers à soumettre une transaction de liquidation et à collecter les frais de liquidation pour eux-mêmes.

### Échange Sandwich {#mev-examples-sandwich-trading}

L'échange Sandwich est une autre méthode courante d'extraction MEV.

Pour créer un sandwich, un chercheur va inspecter le mempool pour trouver des transactions DEX de grand volume. Par exemple, supposons que quelqu'un souhaite acheter 10 000 UNI avec DAI sur Uniswap. Un échange de cette ampleur aura un impact significatif sur la paire UNI/DAI, ce qui pourrait augmenter considérablement le prix de l'UNI par rapport à DAI.

Un chercheur peut calculer l'impact approximatif en termes de prix de cette importante négociation sur la paire UNI/DAI et exécuter un ordre d'achat optimal immédiatement _avant_ le vaste échange en achetant ainsi des UNI à bon prix, puis exécuter un ordre de vente immédiatement _après_ l'échange en le vendant à un prix bien supérieur résultant de l'importance de l'ordre.

Cependant, l'échange Sandwich est plus risqué, car il n'est pas atomique (contrairement à l'arbitrage DEX décrit ci-dessus) et est sujet à une [attaque à la salmonelle](https://github.com/Defi-Cartel/salmonella).

### MEV sur NFT {#mev-examples-nfts}

Le MEV dans l'espace NFT est un phénomène émergent et n'est pas nécessairement rentable.

Cependant, étant donné que les transactions NFT se produisent sur la même blockchain partagée que toutes les autres transactions Ethereum, les chercheurs peuvent utiliser sur le marché des NFT des techniques similaires à celles traditionnellement utilisées pour les opportunités MEV.

Par exemple, s'il y a une forte demande d'un NFT populaire et qu'un chercheur veut un certaine NFT ou un ensemble de NFT, il peut programmer une transaction de telle sorte qu'il soit le premier à acheter le NFT ou encore, il pourra acheter l'ensemble des NFT en une seule transaction. Ou si une NFT est [répertoriée par erreur à un prix bas](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un chercheur peut faire face à d'autres acheteurs et la récupérer à moindre coût.

Un exemple significatif de NFT MEV s'est produit lorsqu'un chercheur a dépensé 7 millions de dollars pour [acheter](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) chaque Cryptopunk au prix plancher. Un chercheur en blockchain [a expliqué sur Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) comment l'acheteur a travaillé avec un fournisseur MEV pour garder son secret d'achat.

### La longue série {#mev-examples-long-tail}

Les opérations d’arbitrage DEX, de liquidations et d'échange Sandwich sont toutes des opportunités MEV bien connues et ne sont pas susceptibles d’être rentables pour les nouveaux chercheurs. Cependant, il existe une longue série d'opportunités MEV moins connues (les NFT MEV sont sans aucun doute l'une de ces opportunités).

Les chercheurs qui sont sur le point de débuter peuvent rencontrer davantage de succès en recherchant les MEV dans cette longue série. Le [MEV job board](https://github.com/flashbots/mev-job-board) de Flashbot liste certaines opportunités émergentes.

## Effets du MEV {#effects-of-mev}

MEV n’est pas que négatif. Il existe des conséquences positives et négatives concernant MEV sur Ethereum.

### Les avantages {#effects-of-mev-the-good}

De nombreux projets DeFi s'appuient sur des acteurs économiquement rationnels pour assurer l'utilité et la stabilité de leurs protocoles. Par exemple, l'arbitrage DEX garantit que les utilisateurs obtiennent le meilleur et le plus juste prix pour leurs jetons, et les protocoles de prêt reposent sur des liquidations rapides lorsque les emprunteurs tombent sous les ratios de garantie pour s'assurer que les prêteurs sont remboursés.

Sans chercheurs rationnels qui cherchent et corrigent les inefficacités économiques et qui profitent des incitations économiques des protocoles, les protocoles DeFi et dApps en général peuvent ne pas être aussi robustes qu'ils le sont aujourd'hui.

### Les inconvénients {#effects-of-mev-the-bad}

À la couche de l'application, certaines formes de MEV, comme les échanges sandwich, entraînent sans équivoque une expérience pire pour les utilisateurs. Les utilisateurs qui sont pris en sandwichs sont confrontés à une augmentation du glissement et à une pire exécution pour leurs opérations.

Au niveau de la couche réseau, les favoris généralisés et les ventes aux enchères de prix du gaz dans lesquelles ils se livrent souvent (lorsque deux ou plusieurs favoris rivalisent pour que leur transaction soit incluse dans le bloc suivant en augmentant progressivement le prix du gaz de leurs propres transactions) entraînent une congestion du réseau et des prix élevés de gaz pour tous les autres qui essaient de faire des transactions régulières.

Au-delà de ce qui se passe _à l'intérieur des blocs_, le MEV peut avoir des effets nocifs _entre_ les blocs. Si le MEV disponible dans un bloc dépasse significativement la récompense standard du bloc, les mineurs peuvent être encouragés à réextraire des blocs et à capturer le MEV pour eux-mêmes, causant une réorganisation de la blockchain et une instabilité consensuelle.

Cette possibilité de réorganisation de la blockchain a été [précédemment rencontrée sur la blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Comme la récompense de bloc de Bitcoin est divisée en deux et les frais de transaction représentent une part plus grande de la récompense de bloc, des situations apparaissent où il devient économiquement rationnel pour les mineurs d'abandonner la récompense du prochain bloc et de réextraire les blocs passés avec des frais plus élevés. Avec la croissance du MEV, le même type de situation pourrait se produire avec Ethereum, menaçant l'intégrité de la blockchain.

## État du MEV {#state-of-mev}

L’extraction MEV a été organisée au début de 2021, ce qui a entraîné des prix de gaz extrêmement élevés au cours des premiers mois de l’année. L'émergence du relais MEV de Flashbots a réduit l'efficacité des favoris généralisés et en prenant les enchères sur les prix du gaz hors chaîne, a permis la baisse des prix de gaz pour les utilisateurs ordinaires.

Alors que beaucoup de chercheurs gagnent encore de l'argent grâce au MEV, les possibilités devenant plus connues et de plus en plus de chercheurs rivalisant pour la même possibilité, les mineurs vont générer de plus en plus de revenus MEV totaux (le même type d'enchères de gaz que celles décrites à l'origine ci-dessus se produisent également dans Flashbots mais en privé, et les mineurs en tireront les revenus de gaz qui en découlent). MEV n'est pas non plus l'apanage d'Ethereum et à mesure que les possibilités deviennent plus compétitives sur Ethereum, les chercheurs se déplacent vers des blockchains alternatifs comme Binance Smart Chain, où des possibilités MEV similaires à celles sur Ethereum existent mais avec moins de concurrence.

Au fur et à mesure que DeFi croît et que sa popularité augmente, MEV pourrait bientôt l'emporter considérablement sur la récompense de bloc de base Ethereum. Cela s'accompagne d'une possibilité croissante de blocs égoïstes et d'instabilité du consensus. Certains considèrent qu'il s'agit là d'une menace existentielle pour Ethereum et que le découragement du minage égoïste est un domaine de recherche actif dans la théorie du protocole Ethereum. Une solution actuellement en cours d'étude est [le lissage de récompense MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Ressources associées {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Tableau de bord et explorateur de transactions en direct pour les transactions MEV_

## Complément d'information {#further-reading}

- [Qu'est-ce qu'une valeur extractible par minage (MEV) ?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV et moi](https://research.paradigm.xyz/MEV)
- [L'Ethereum est une Forêt Sombre](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [S'échapper de la forêt Sombre](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots : Devancer la crise des MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
