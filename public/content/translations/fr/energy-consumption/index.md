---
title: Dépense énergétique d'Ethereum
metaTitle: Consommation énergétique d'Ethereum
description: Les informations de base dont vous avez besoin pour comprendre la consommation énergétique d'Ethereum.
lang: fr
---

[Ethereum](/) est une chaîne de blocs écologique. Le mécanisme de consensus à [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos) d'Ethereum utilise de l'ETH au lieu de [l'énergie pour sécuriser le réseau](/developers/docs/consensus-mechanisms/pow). La consommation énergétique d'Ethereum est d'environ [~0,0026 TWh/an](https://carbon-ratings.com/eth-report-2022) sur l'ensemble du réseau mondial.

L'estimation de la consommation énergétique d'Ethereum provient d'une étude du [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Ils ont généré des estimations ascendantes de la consommation d'électricité et de l'empreinte carbone du réseau Ethereum ([voir le rapport](https://carbon-ratings.com/eth-report-2022)). Ils ont mesuré la consommation d'électricité de différents nœuds avec diverses configurations matérielles et de logiciels clients. L'estimation de **2 601 MWh** (0,0026 TWh) pour la consommation annuelle d'électricité du réseau correspond à des émissions annuelles de carbone de **870 tonnes d'éq. CO2** en appliquant des facteurs d'intensité carbone spécifiques aux régions. Cette valeur change à mesure que des nœuds entrent et sortent du réseau - vous pouvez suivre cela en utilisant une estimation moyenne mobile sur 7 jours par l'[indice de durabilité du réseau de la chaîne de blocs de Cambridge (Cambridge Blockchain Network Sustainability Index)](https://ccaf.io/cbnsi/ethereum) (notez qu'ils utilisent une méthode légèrement différente pour leurs estimations - détails disponibles sur leur site).

Pour contextualiser la consommation énergétique d'Ethereum, nous pouvons comparer les estimations annualisées pour d'autres produits et industries. Cela nous aide à mieux comprendre si l'estimation pour Ethereum est élevée ou faible.

<EnergyConsumptionChart />

Le graphique ci-dessus affiche la consommation énergétique estimée en TWh/an pour Ethereum, comparée à plusieurs autres produits et industries. Les estimations fournies proviennent d'informations accessibles au public, consultées en juillet 2023, avec des liens vers les sources disponibles dans le tableau ci-dessous.

|                     | Consommation énergétique annualisée (TWh) | Comparaison avec Ethereum PoS |                                                                                      Source                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Centres de données mondiaux |                 190                 |          73 000x           |                                    [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53 000x           |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Minage d'or         |                 131                 |          50 000x           |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Jeux vidéo aux États-Unis\* |                 34                  |          13 000x           |                 [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW        |                 21                  |           8 100x           |                                                                    [source](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7 300x           |                                           [source](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [source](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [source](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [source](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **Ethereum PoS**    |             **0,0026**              |           **1x**           |                                                               [source](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Comprend les appareils des utilisateurs finaux tels que les PC, les ordinateurs portables et les consoles de jeux.

Obtenir des estimations précises de la consommation énergétique est compliqué, en particulier lorsque ce qui est mesuré a une chaîne d'approvisionnement complexe ou des détails de déploiement qui influencent son efficacité. Par exemple, les estimations de la consommation énergétique de Netflix et Google varient selon qu'elles incluent uniquement l'énergie utilisée pour maintenir leurs systèmes et fournir du contenu aux utilisateurs (_dépense directe_) ou si elles incluent les dépenses nécessaires pour produire du contenu, faire fonctionner les bureaux de l'entreprise, faire de la publicité, etc. (_dépense indirecte_). Les dépenses indirectes pourraient également inclure l'énergie requise pour consommer du contenu sur les appareils des utilisateurs finaux tels que les téléviseurs, les ordinateurs et les téléphones portables.

Les estimations ci-dessus ne sont pas des comparaisons parfaites. Le montant des dépenses indirectes prises en compte varie selon la source et inclut rarement l'énergie des appareils des utilisateurs finaux. Chaque source sous-jacente comprend plus de détails sur ce qui est mesuré.

Le tableau et le graphique ci-dessus incluent également des comparaisons avec Bitcoin et Ethereum à preuve de travail (PoW). Il est important de noter que la consommation énergétique des réseaux à preuve de travail n'est pas statique et change de jour en jour. Les estimations peuvent également varier considérablement d'une source à l'autre. Le sujet suscite un [débat](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nuancé, non seulement sur la quantité d'énergie consommée, mais aussi sur les sources de cette énergie et l'éthique qui y est liée. La consommation énergétique ne correspond pas nécessairement de manière précise à l'empreinte environnementale, car différents projets peuvent utiliser différentes sources d'énergie, y compris une proportion plus ou moins grande d'énergies renouvelables. Par exemple, l'[indice de consommation d'électricité du Bitcoin de Cambridge (Cambridge Bitcoin Electricity Consumption Index)](https://ccaf.io/cbnsi/cbeci/comparisons) indique que la demande du réseau Bitcoin pourrait théoriquement être alimentée par le torchage du gaz ou par de l'électricité qui serait autrement perdue lors de la transmission et de la distribution. La voie d'Ethereum vers la durabilité a consisté à remplacer la partie énergivore du réseau par une alternative écologique.

Vous pouvez parcourir les estimations de consommation énergétique et d'émissions de carbone pour de nombreuses industries sur le [site de l'indice de durabilité du réseau de la chaîne de blocs de Cambridge (Cambridge Blockchain Network Sustainability Index)](https://ccaf.io/cbnsi/ethereum).

## Estimations par transaction {#per-transaction-estimates}

De nombreux articles estiment la dépense énergétique « par transaction » pour les chaînes de blocs. Cela peut être trompeur car l'énergie requise pour proposer et valider un bloc est indépendante du nombre de transactions qu'il contient. Une unité de dépense énergétique par transaction implique que moins de transactions entraîneraient une dépense énergétique moindre et vice-versa, ce qui n'est pas le cas. De plus, les estimations par transaction sont très sensibles à la façon dont le débit de transactions d'une chaîne de blocs est défini, et modifier cette définition peut être manipulé pour faire paraître la valeur plus grande ou plus petite.

Sur Ethereum, par exemple, le débit de transactions n'est pas seulement celui de la couche de base - c'est aussi la somme du débit de transactions de tous ses rollup de « [couche 2 (l2)](/layer-2/) ». Les couches 2 ne sont généralement pas incluses dans les calculs, mais la prise en compte de l'énergie supplémentaire consommée par les séquenceurs (faible) et du nombre de transactions qu'ils traitent (élevé) réduirait probablement considérablement les estimations par transaction. C'est l'une des raisons pour lesquelles les comparaisons de la consommation énergétique par transaction entre les plateformes peuvent être trompeuses.

## La dette carbone d'Ethereum {#carbon-debt}

La dépense énergétique d'Ethereum est très faible, mais cela n'a pas toujours été le cas. À l'origine, Ethereum utilisait la preuve de travail (PoW), qui avait un coût environnemental bien plus élevé que le mécanisme actuel de preuve d'enjeu (PoS).

Dès le début, Ethereum prévoyait de mettre en œuvre un mécanisme de consensus basé sur la preuve d'enjeu, mais y parvenir sans sacrifier la sécurité et la décentralisation a nécessité des années de recherche et développement ciblées. Par conséquent, un mécanisme de preuve de travail a été utilisé pour démarrer le réseau. La preuve de travail oblige les mineurs à utiliser leur matériel informatique pour calculer une valeur, dépensant ainsi de l'énergie dans le processus.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

Le CCRI estime que La Fusion a réduit la consommation d'électricité annualisée d'Ethereum de plus de **99,988 %**. De même, l'empreinte carbone d'Ethereum a diminué d'environ **99,992 %** (passant de 11 016 000 à 870 tonnes d'éq. CO2). Pour mettre cela en perspective, la réduction des émissions revient à passer de la hauteur de la tour Eiffel à une petite figurine en plastique, comme illustré dans la figure ci-dessus. En conséquence, le coût environnemental de la sécurisation du réseau est considérablement réduit. Dans le même temps, on estime que la sécurité du réseau s'est améliorée.

## Une couche d'application écologique {#green-applications}

Bien que la consommation énergétique d'Ethereum soit très faible, il existe également une communauté de [**finance régénérative (ReFi)**](/refi/) substantielle, croissante et très active qui se construit sur Ethereum. Les applications ReFi utilisent des composants de la finance décentralisée (DeFi) pour créer des applications financières ayant des externalités positives bénéficiant à l'environnement. La ReFi fait partie d'un mouvement « [solarpunk](https://en.wikipedia.org/wiki/Solarpunk) » plus large qui est étroitement aligné avec Ethereum et vise à associer les avancées technologiques et la gestion de l'environnement. La nature décentralisée, sans permission et composable d'Ethereum en fait la couche de base idéale pour les communautés ReFi et solarpunk.

Les plateformes de financement de biens publics natives du Web3 telles que [Gitcoin](https://gitcoin.co) organisent des cycles climatiques pour stimuler la construction respectueuse de l'environnement sur la couche d'application d'Ethereum. Grâce au développement de ces initiatives (et d'autres, par exemple, la [science décentralisée (DeSci)](/desci/)), Ethereum devient une technologie à impact net positif sur les plans environnemental et social.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Si vous pensez que cette page peut être rendue plus précise, veuillez ouvrir un ticket (issue) ou une demande d'extraction (PR). Les statistiques sur cette page sont des estimations basées sur des données accessibles au public - elles ne représentent pas une déclaration officielle ou une promesse de l'équipe d'ethereum.org, ni de la Fondation Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Lectures complémentaires {#further-reading}

- [Indice de durabilité du réseau de la chaîne de blocs de Cambridge (Cambridge Blockchain Network Sustainability Index)](https://ccaf.io/cbnsi/ethereum)
- [Rapport de la Maison Blanche sur les chaînes de blocs à preuve de travail](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Émissions d'Ethereum : une estimation ascendante (Ethereum Emissions: A Bottom-up Estimate)](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Indice de consommation énergétique d'Ethereum (Ethereum Energy Consumption Index)](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusion - Implications sur la consommation d'électricité et l'empreinte carbone du réseau Ethereum (The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network)](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consommation énergétique d'Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Sujets connexes {#related-topics}

- [La chaîne balise](/roadmap/beacon-chain)
- [La Fusion](/roadmap/merge/)