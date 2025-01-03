---
title: Consommation énergétique d'Ethereum
description: L'information de base dont vous avez besoin pour comprendre la consommation énergétique d'Ethereum.
lang: fr
---

# Les dépenses énergétiques d'Ethereum {#proof-of-stake-energy}

Ethereum est une blockchain verte. Le mécanisme de consensus par [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) d'Ethereum utilise de l'ETH au lieu [d'énergie pour sécuriser le réseau](/developers/docs/consensus-mechanisms/pow). La consommation énergétique d'Ethereum est approximativement [0.0026 TWh/an](https://carbon-ratings.com/eth-report-2022) pour l'ensemble du réseau.

L'estimation de la consommation énergétique d'Ethereum se base sur une étude réalisée par le [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Ils ont généré des estimations détaillées de la consommation d'électricité et de l'empreinte carbone du réseau Ethereum ([voir le rapport](https://carbon-ratings.com/eth-report-2022)). Ils ont mesuré la consommation d'électricité de différents nœuds avec différentes configurations matérielles et différents logiciels clients. Ils ont estimé que les **2,601 MWh** (0.0026 TWh) d'électricité consommés annuellement par le réseau correspond à **870 tonnes CO2e** annuelles en appliquant des facteur régionaux d'ntensité de carbone. Cette valeur change au fur et à mesure que des nœuds entrent et sortent du réseau. Vous pouvez suivre ces variations grâce à [l'Indice de Durabilité du Réseau Blockchain de Cambridge](https://ccaf.io/cbnsi/ethereum) qui offre une estimation moyenne sur 7 jours (notez qu'ils utilisent une méthode légèrement différente pour leurs estimations - plus de détails sont disponibles sur leur site).

Pour replacer la consommation énergétique d'Ethereum dans son contexte, nous pouvons comparer les estimations annualisées d'autres biens et secteurs industriels. Cela nous aide à mieux comprendre si l'estimation pour Ethereum est élevée ou faible.

<EnergyConsumptionChart />

Le tableau ci-dessous montre la consommation énergétique estimée en TWh/an pour Ethereum, comparée à plusieurs autres biens et secteurs. Les estimations fournies proviennent d'informations publiquement disponibles, consultées en juillet 2023, les liens vers les sources sont disponibles dans le tableau ci-dessous.

|                                | Consommation d’énergie annualisée (TWh) | Comparaison avec Ethereum PoS |                                                                                      Source                                                                                       |
|:------------------------------ |:---------------------------------------:|:-----------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Centres de données globaux     |                   190                   |           73 000 x            |                                    [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                        |                   149                   |           53 000 x            |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Extraction d'or                |                   131                   |           50 000 x            |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Jeux vidéos aux États-Unis\* |                   34                    |           13 000 x            |                 [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW                   |                   21                    |            8 100 x            |                                                                    [source](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                         |                   19                    |            7 300 x            |                                           [source](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                        |                  0,457                  |             176 x             | [source](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                         |                  0,26                   |             100 x             |                                  [source](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| Airbnb                         |                  0,02                   |              8 x              |                               [source](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **Ethereum PoS**               |               **0,0026**                |            **1 x**            |                                                               [source](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Comprend les appareils des utilisateurs finaux tels que les PC, les ordinateurs portables et les consoles de jeu.

Obtenir des estimations précises de la consommation d'énergie est difficile, en particulier lorsque ce qui est mesuré a une chaîne d'approvisionnement complexe ou des caractéristiques de déploiement qui influencent son efficacité. Par exemples : les estimations de consommation d'énergie de Netflix et Google varient selon qu'elles incluent uniquement l'énergie utilisée pour entretenir leurs systèmes et fournir du contenu aux utilisateurs (_dépenses directes_) ou qu'elles incluent les dépenses nécessaires pour produire du contenu, gérer les bureaux de l'entreprise, faire de la publicité, etc (_dépenses indirectes_). Les dépenses indirectes pourraient également inclure l'énergie nécessaire à la consommation de contenu sur les appareils des utilisateurs finaux tels que les téléviseurs, les ordinateurs et les téléphones portables.

Les estimations ci-dessus ne sont pas des comparaisons parfaites. Le montant des dépenses indirectes prises en compte varie selon la source et inclut rarement l'énergie provenant des appareils des utilisateurs finaux. Chaque source sous-jacente contient plus de détails sur ce qui est mesuré.

Le tableau et le graphique ci-dessus comprennent également des comparaisons avec Bitcoin et Ethereum proof-of-work. Il est important de noter que la consommation d'énergie des réseaux de preuve de travail n'est pas statique et elle évolue au jour le jour. Les estimations peuvent également varier considérablement d'une source à l'autre. Le sujet suscite un [débat](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nuancé, non seulement sur la quantité d'énergie consommée, mais aussi sur les sources de cette énergie et l'éthique qui s'y rattache. La consommation d'énergie ne correspond pas nécessairement à l'empreinte environnementale, car différents projets peuvent utiliser différentes sources d'énergie, avec une proportion plus ou moins grande d'énergies renouvelables. Par exemple, le [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) indique que la demande du réseau Bitcoin pourrait théoriquement être alimentée par le brûlage de gaz ou par de l'électricité qui serait autrement perdue lors de la transmission et de la distribution. La voie de la durabilité empruntée par Ethereum a consisté à remplacer la partie du réseau gourmande en énergie par une alternative verte.

Vous pouvez consulter les estimations de la consommation d'énergie et des émissions de carbone pour de nombreuses industries sur le site [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Estimations par transaction {#per-transaction-estimates}

De nombreux articles estiment les dépenses énergétiques pour les blockchains « par transaction ». Cela peut être trompeur dans la mesure où l'énergie nécessaire pour proposer et valider un bloc est indépendante du nombre de transactions qu'il contient. Une unité de dépense énergétique par transaction implique qu'un nombre moins élevé de transactions entraînerait une moindre dépense énergétique et vice-versa, ce qui n'est pas le cas. En outre, l'estimation par transaction dépend fortement de la façon dont le débit de transaction d'une blockchain est défini, sachant qu'il est possible de jouer avec cette définition pour que la valeur semble plus ou moins grande.

Sur Ethereum par exemple, le débit de transaction n'est pas seulement celui de la couche de base - c'est aussi la somme du débit de transaction de tous ses rollups de « [couche 2](/layer-2/) ». Les couches 2 ne sont généralement pas incluses dans les calculs, mais la prise en compte de l'énergie supplémentaire consommée par les séquenceurs (faible) et du nombre de transactions qu'ils traitent (élevé) réduirait probablement considérablement les estimations par transaction. C'est l'une des raisons pour lesquelles les comparaisons de consommation d'énergie par transaction entre plateformes peuvent être trompeuses.

## La dette carbone d'Ethereum {#carbon-debt}

Les dépenses énergétiques d'Ethereum sont très faibles, mais cela n'a pas toujours été le cas. Ethereum utilisait à l'origine la preuve de travail : celle-ci avait un coût environnemental bien plus élevé que le mécanisme actuel de preuve d'enjeu.

Depuis le tout début, Ethereum prévoyait d'implémenter un mécanisme de consensus par preuve d'enjeu, mais il aura fallu des années de recherches et de développement ciblés pour y parvenir sans sacrifier la sécurité et la décentralisation. C'est pourquoi un mécanisme de preuve de travail a été utilisé pour faire démarrer le réseau. Un consensus de preuve de travail exige que les mineurs utilisent leur matériel informatique pour calculer une valeur, en dépensant de l'énergie pendant le processus.

![Comparaison de la consommation d'énergie d'Ethereum avant et après La Fusion, en utilisant la tour Eiffel (300 mètres de haut) sur la gauche pour symboliser la grande consommation d'énergie avant La Fusion, et une petite figurine Lego de 4 cm de haut sur la droite pour représenter la réduction drastique de consommation d'énergie après La Fusion](energy_consumption_pre_post_merge.png)

Le CCRI évalue que La Fusion a réduit la consommation d'électricité annualisée d'Ethereum de plus de **99.988%**. De même, l'empreinte carbone d'Ethereum a été réduite d'environ **99,992%** (de 11 016 000 à 870 tonnes de CO2e). Pour mettre les choses en perspective, la réduction des émissions équivaut à passer de la hauteur de la Tour Eiffel à celle d'une petite figurine en plastique, comme l'illustre la figure ci-dessus. Par conséquent, le coût environnemental de la sécurisation du réseau est considérablement réduit. Dans le même temps, la sécurité du réseau est présumée s'être améliorée.

## Une couche d'application verte {#green-applications}

Bien que la consommation d'énergie d'Ethereum soit très faible, il existe également une communauté de [**finance régénérative (ReFi)**](/refi/) substantielle, croissante et très active qui construit sur Ethereum. Les applications ReFi utilisent les composants DeFi pour construire des applications financières qui ont des externalités positives au bénéfice de l'environnement. La ReFi fait partie d'un plus large mouvement [« solarpunk »](https://en.wikipedia.org/wiki/Solarpunk) qui est étroitement aligné avec Ethereum et vise à associer progrès technologiques et gérance environnementale. La nature décentralisée, sans permission et composable d'Ethereum en fait la couche de base idéale pour les communautés ReFi et solarpunk.

Les plateformes de financement de biens publics natifs Web3 telles que [Gitcoin](https://gitcoin.co) exécutent des rondes climatiques pour stimuler la construction écologique sur la couche d'application d'Ethereum. Grâce au développement de ces initiatives (et d'autres comme par exemple [DeSci](/desci/)), Ethereum est en train de devenir une technologie positive sur le plan environnemental et social.

<InfoBanner emoji=":evergreen_tree:">
  Si vous pensez que cette page pourrait être plus précise, veuillez soulever un problème ou un PR. Les statistiques de cette page sont des estimations basées sur des données publiques - elles ne représentent pas une déclaration officielle ou une promesse de l'équipe ethereum.org team ou de la Fondation Ethereum.
</InfoBanner>

## Complément d'information {#further-reading}

- [Index de Durabilité des Réseaux Blockchain de Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Rapport de la Maison-Blanche sur les blockchains de preuve de travail](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Les Émissions d'Ethereum : une estimation de bas à haut](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Index de Consommation d'Énergie d'Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusion - Implications sur la consommation d'électricité et l'empreinte carbone du réseau Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consommation énergétique d'Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Sujets connexes {#related-topics}

- [La vision d'Ethereum](/roadmap/vision/)
- [La chaîne phare](/roadmap/beacon-chain)
- [La Fusion](/roadmap/merge/)
