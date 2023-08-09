---
title: Consommation énergétique d'Ethereum
description: Les informations de base dont vous avez besoin pour comprendre la consommation d'énergie d'Ethereum.
lang: fr
---

# Les dépenses énergétiques d'Ethereum {#proof-of-stake-energy}

Ethereum est une blockchain verte. Il utilise un mécanisme de consensus de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos), utilisant l'ETH au lieu de [l'énergie pour sécuriser le réseau](/developers/docs/consensus-mechanisms/pow). Le mécanisme de preuve d'enjeu d'Ethereum n'utilise que [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022) sur l'ensemble du réseau global.

Le [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) a produit des estimations ascendantes de la consommation d'électricité et de l'empreinte carbone du réseau Ethereum ([voir le rapport](https://carbon-ratings.com/eth-report-2022)). Il a mesuré la consommation d'électricité de différents nœuds selon diverses configurations matérielles et logiciels clients. Il en résulte une estimation de **2,601 MWh** (0. 0026 TWh) pour la consommation annuelle d'électricité du réseau (septembre 2022), ce qui correspond à des émissions de carbone annuelles de **870 tonnes de CO2e** en appliquant des facteurs d'intensité de carbone spécifiques à la région.

<EnergyConsumptionChart />

Le graphique ci-dessus montre la consommation annuelle estimée d'énergie en TWh/an pour divers secteurs (donnée de juin 2022). Il convient de noter que les estimations présentées dans le graphique proviennent de sources accessibles au public et pour lesquelles les liens figurent dans le tableau ci-dessous. CEBCI désigne l'indice de consommation d'électricité de Cambridge Bitcoin. Les valeurs sont fournies à titre d'illustration et ne constituent pas une estimation, une promesse ou une prévision officielle.

Pour mettre en perspective la consommation d'énergie d'Ethereum, nous pouvons comparer des estimations annualisées pour d'autres industries - cela nous permet de mieux comprendre si 0,0026 TWh est une quantité importante ou faible. Les données sont résumées dans le graphique en barres ci-dessus, mais le tableau ci-dessous founit plus de details :

|                            | Consommation d’énergie annualisée (TWh) | Comparaison avec Ethereum PoS | Source                                                                                                                                            |
| :------------------------- | :-------------------------------------: | :---------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extraction d'or            |                   240                   |           92 000 x            | [source](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)                             |
| Extraction d'or            |                   130                   |           50 000 x            | [source](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| Bitcoin                    |                   130                   |           50 000 x            | [source](https://digiconomist.net/bitcoin-energy-consumption)                                                                                     |
| Bitcoin                    |                   100                   |           38 000 x            | [source](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| YouTube                    |                   244                   |           94 000 x            | [source](https://thefactsource.com/how-much-electricity-does-youtube-use/)                                                                        |
| Centres de données globaux |                   200                   |            78 000x            | [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                       |
| Netflix                    |                  0,45                   |             175 x             | [source](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)                  |
| Netflix                    |                   94                    |           36 000 x            | [source](https://theshiftproject.org/en/article/unsustainable-use-online-video/)                                                                  |
| PayPal                     |                  0,26                   |             100 x             | [source](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                       |
| Jeux vidéos aux États-Unis |                   34                    |           13 000 x            | [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) |
| Ethereum PoW               |                   78                    |           30 000 x            | [source](https://digiconomist.net/ethereum-energy-consumption)                                                                                    |
| Ethereum PoS               |                 0,0026                  |              1 x              | [source](https://carbon-ratings.com/eth-report-2022)                                                                                              |

Les estimations de la dépense énergétique de YouTube ont aussi été décomposées par chaînes et par vidéos individuelles. [Ces estimations](https://thefactsource.com/how-much-electricity-does-youtube-use/) montrent que YouTube a consommé 175 fois plus d'énergie lors des visionnages de Gangnam Style en 2019 que l'Ethereum n'en utilise par an.

Il est compliqué d'obtenir des estimations précises de la consommation d'énergie, surtout lorsque ce qui est mesuré présente une chaîne d'approvisionnement complexe ou des détails de déploiement qui influencent son efficacité. Par exemple, nous avons inclus une estimation haute et une estimation basse pour l'extraction de l'or qui diffère d'environ 90 TWh. Les estimations de la consommation d'énergie de Netflix varient considérablement selon la source. Leurs propres estimations autodéclarées sont environ 20 fois plus faible qu'une estimation indépendante - il existe une discussion sur les raisons de ce phénomène sur [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). De même, la consommation de Youtube est estimée à environ [244 TWh/an](https://thefactsource.com/how-much-electricity-does-youtube-use/), bien que l'énergie consommée dépende beaucoup du type d'appareil sur lequel les vidéos sont diffusées et de l'efficacité énergétique de l'infrastructure sous-jacente, comme les centres de données - les valeurs appropriées pour ces paramètres sont difficiles à estimer, de sorte qu'une marge d'incertitude substancielle existe.

Le graphique ci-dessus inclut également des comparaisons avec Bitcoin et Ethereum lorsqu'il utilisait la preuve de travail. Les estimations de la consommation d'énergie du Bitcoin varient considérablement selon les sources. Ce sujet suscite beaucoup de [débats](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nuancés non seulement sur la quantité d'énergie consommée, mais aussi sur les sources de cette énergie et l'éthique qui y est associée.

De nombreux articles estiment les dépenses énergétiques pour les blockchains « par transaction ». Cela peut être trompeur dans la mesure où l'énergie nécessaire pour proposer et valider un bloc est indépendante du nombre de transactions qu'il contient. Une unité de dépense énergétique par transaction implique qu'un nombre moins élevé de transactions entraînerait une moindre dépense énergétique et vice-versa, ce qui n'est pas le cas. En outre, l'estimation par transaction dépend fortement de la façon dont le débit de transaction d'une blockchain est défini, sachant qu'il est possible de jouer avec cette définition pour que la valeur semble plus ou moins grande.

Par exemple, sur Ethereum, le débit de transaction n'est pas seulement celui de la couche de base - c'est aussi la somme du débit de transaction de tous ses rollups de « [couche 2](/layer-2/) ». Les couches 2 ne sont généralement pas incluses dans les calculs, mais la prise en compte de l'énergie supplémentaire consommée par les séquenceurs (faible) et du nombre de transactions qu'ils traitent (élevé) réduirait probablement considérablement les estimations par transaction. C'est l'une des raisons pour lesquelles les comparaisons de consommation d'énergie par transaction entre plateformes peuvent être trompeuses.

## La dette carbone d'Ethereum {#carbon-debt}

Les dépenses énergétiques d'Ethereum sont très faibles, mais cela n'a pas toujours été le cas. Ethereum utilisait à l'origine la preuve de travail : celle-ci avait un coût environnemental bien plus élevé que le mécanisme actuel de preuve d'enjeu.

Depuis le tout début, Ethereum prévoyait d'implémenter un mécanisme de consensus par preuve d'enjeu, mais il aura fallu des années de recherches et de développement ciblés pour y parvenir sans sacrifier la sécurité et la décentralisation. C'est pourquoi un mécanisme de preuve de travail a été utilisé pour faire démarrer le réseau. Un consensus de preuve de travail exige que les mineurs utilisent leur matériel informatique pour calculer une valeur, en dépensant de l'énergie pendant le processus. La consommation énergétique totale d'Ethereum a atteint son apogée en février 2022 avec un peu moins de 94 TWh/an lors du pic du marché haussier des cryptomonnaies. Juste avant le passage à la preuve d'enjeu, la consommation d'énergie avoisinait les [78 TWh/an](https://digiconomist.net/ethereum-energy-consumption), comparable à celle de l'Ouzbékistan, avec une émission de carbone équivalente à celle de l'Azerbaïdjan (33 MT/an).

![Comparaison de la consommation d'énergie entre Ethereum pré-fusion et post-fusion. Sont présentées à gauche la tour Eiffel de 330 mètres de haut et à droite une figurine de jouet en plastique de 4 cm de haut vue à travers une loupe.](energy_consumption_pre_post_merge.png)

Le CCRC a examiné l'impact de la transition d'Ethereum de la preuve de travail à la preuve d'enjeu. La consommation d'électricité annualisée a été réduite de plus de **99,988 %**. De même, l'empreinte carbone d'Ethereum a été réduite d'environ **99,992 %** (de 11.016.000 à 870 tonnes de CO2e). Dépeint métaphoriquement, cela correspond à une réduction des émissions de la hauteur de la Tour Eiffel à celle d'un petit jouet en plastique, comme indiqué dans la figure ci-dessus. Le coût environnemental de la sécurisation du réseau est de ce fait réduit de façon drastique. Simultanément, on estime que la sécurité du réseau a augmenté.

## Une couche d'application verte {#green-applications}

Bien que la consommation d'énergie d'Ethereum soit très faible, il existe également une communauté de **finance régénérative (ReFi)** substantielle, croissante et très active sur Ethereum. Les applications ReFi utilisent les composants DeFi pour construire des applications financières présentant des externalités positives bénéfiques pour l'environnement. La ReFi fait partie d'un plus large mouvement [« solarpunk »](https://en.wikipedia.org/wiki/Solarpunk) qui est étroitement aligné avec Ethereum et vise à associer progrès technologiques et gérance environnementale. La nature décentralisée, sans permission et composable d'Ethereum en fait la couche de base idéale pour les communautés ReFi et solarpunk.

Les plateformes de financement de biens publics natifs Web3 telles que [Gitcoin](https://gitcoin.co) exécutent des rondes climatiques pour stimuler la construction écologique sur la couche d'application d'Ethereum. Grâce au développement de ces initiatives (et d'autres comme par exemple [DeSci](/desci/)), Ethereum est en train de devenir une technologie positive sur le plan environnemental et social.

<InfoBanner emoji=":evergreen_tree:">
  Si vous pensez que cette page pourrait être plus précise, veuillez soulever un problème ou un PR. Les statistiques de cette page sont des estimations basées sur des données publiques - elles ne représentent pas une déclaration officielle ou une promesse de l'équipe ethereum.org team ou de la Fondation Ethereum. 
</InfoBanner>

## Complément d'information {#further-reading}

- [Rapport de la Maison-Blanche sur les blockchains de preuve de travail](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Consommation énergétique d'Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) – Kyle McDonald\_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusion - Implications sur la consommation d'électricité et l'empreinte carbone du réseau Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Sujets connexes {#related-topics}

- [La vision d'Ethereum](/roadmap/vision/)
- [La chaîne phare](/roadmap/beacon-chain)
- [La Fusion](/roadmap/merge/)
