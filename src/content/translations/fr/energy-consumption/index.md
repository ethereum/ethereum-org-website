---
title: Consommation énergétique d'Ethereum
description: Les informations de base dont vous avez besoin pour comprendre la consommation d'énergie d'Ethereum.
lang: fr
sidebar: true
---

# Consommation énergétique d'Ethereum {#introduction}

Les dépenses énergétiques de la « [preuve de travail](/developers/docs/consensus-mechanisms/#proof-of-work) » d'Ethereum sont trop élevées et ne peuvent pas être durables. Résoudre les préoccupations en matière de dépenses énergétiques sans sacrifier la sécurité et la décentralisation est un défi technique important qui a été au centre de la recherche et du développement pendant des années. Examinons pourquoi la construction d'Ethereum a eu un impact environnemental élevé et comment la prochaine mise à niveau du réseau vers la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) changera radicalement la donne.

## L'énergie sécurise le réseau {#energy-secures-the-network}

Les transactions sur la blockchain Ethereum sont validées par des [mineurs](/developers/docs/consensus-mechanisms/pow/mining). Les mineurs rassemblent les transactions en blocs ordonnés et les ajoutent à la blockchain Ethereum. Les nouveaux blocs sont diffusés à tous les autres opérateurs de nœuds, qui exécutent ensuite les transactions de manière indépendante et vérifient qu'elles sont valides. Toute malhonnêteté apparaît comme une incohérence entre les différents nœuds. Les blocs honnêtes sont ajoutés à la blockchain et deviennent une partie immuable de l'histoire.

La capacité pour un mineur d'ajouter de nouveaux blocs ne fonctionne que s'il y a un coût associé au minage et à l'imprévisibilité de connaitre quel noeud pourra soumettre le prochain bloc. Ces conditions sont remplies en imposant des preuves de travail (PoW). Pour être éligible à soumettre un bloc de transactions, un mineur doit résoudre un puzzle informatique arbitraire plus rapidement que tous les autres mineurs. Résoudre ce puzzle crée une concurrence entre les mineurs et génère des coûts sous la forme de dépenses énergétiques. Pour frauder avec succès la blockchain, un mineur malhonnête devrait gagner systématiquement la course à la preuve de travail, ce qui est très peu probable et prohibitivement coûteux.

Depuis son lancement, Ethereum a utilisé la preuve du travail. La migration des preuves de travail vers des preuves d'enjeu a toujours été un objectif fondamental d'Ethereum. Cependant, le développement d'un système de preuve d'enjeu qui adhère aux principes fondamentaux de sécurité et de décentralisation d'Ethereum n'est pas simple. Il a fallu beaucoup de recherches, des percées en cryptographie, en cryptoéconomie ainsi que le design de mécanismes incitatifs pour en arriver au point où la transition est devenue possible.

## Dépenses énergetiques de la preuve d'enjeu {#proof-of-work}

La preuve de travail est un moyen robuste de sécuriser le réseau et d'imposer des changements honnêtes à la blockchain, mais elle est problématique pour plusieurs raisons. Puisque le droit de miner un bloc nécessite de résoudre un puzzle de calcul arbitraire, les mineurs peuvent augmenter leurs chances de réussite en investissant dans du matériel informatique plus puissant. Ces mesures incitatives provoquent une course à la puissance de calcul dans laquelle les mineurs acquièrent de plus en plus d’équipements de minage énergivores. Le protocole de preuve de travail d'Ethereum a actuellement une consommation totale d'énergie annualisée approximativement égale à celle de la Finlande <sup>[^1]</sup> et une empreinte carbone similaire à celle de la Suisse<sup>[^1]</sup>.

## Preuve d'enjeu {#proof-of-stake}

Un avenir plus vert pour Ethereum est déjà en cours de construction sous la forme d'une chaîne [**preuve d'enjeu (PoS)** chain](/upgrades/beacon-chain/). Dans un système à [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/), la résolution d'un puzzle arbitraire n'est pas nécessaire. La suppression de la résolution de puzzle réduit considérablement les dépenses énergétiques nécessaires à la sécurisation du réseau. Les mineurs sont remplacés par des validateurs qui exécutent la même fonction. Cependant, plutôt que d'investir leurs actifs à l'avance sous forme de puissance informatique, ils mettent en jeu des ETH en gage de leur honnêteté. Si le validateur est paresseux (s'il est hors-ligne alors qu'il est supposé remplir des tâches de validation) ses ETH déposés peuvent lui être lentement retirés, alors qu'un comportement manifestement malhonnête se traduit par un retranchement d'une part de ses actifs mis en gage. Cela encourage fortement une participation active et honnête à la sécurisation du réseau.

De la même manière que la preuve de travail, une entité malveillante nécessiterait au moins 51 % du total des ETH mis en jeu dans le réseau pour exécuter une [attaque à 51 %](/glossary/#51-attack). Cependant, contrairement à la preuve de travail, où la perte potentielle d'une attaque échouée n'est que le coût de la génération de la puissance de calcul nécessaire pour miner, pour la preuve de l'enjeu, la perte possible d'une attaque est la quantité totale d'ETH utilisée comme garantie. Cette structure dissuasive permet de sécuriser le réseau avec preuve d'enjeu, tout en éliminant le besoin de dépenser de l'énergie pour des calculs arbitraires. Des explications détaillées de la sécurité du réseau par preuve d'enjeu peuvent être trouvées [ici](/developers/docs/consensus-mechanisms/pos/) et [ici](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## La Fusion {#the-merge}

Il y a une chaîne fonctionnelle de preuve de mise en jeu appelée [chaîne phare](/upgrades/beacon-chain/) qui fonctionne depuis décembre 2020 et qui démontre la viabilité du protocole de preuve d'enjeu. La fusion fait référence au moment où Ethereum laisse la preuve de travail derrière lui et adopte pleinement la preuve d'enjeu. La Fusion devrait avoir lieu entre le troisième et quatrième trimestre 2022. [En savoir plus sur la fusion.](/upgrades/merge/).

## Dépenses énergétiques de la preuve d'enjeu {#proof-of-stake-energy}

En plus de renforcer la confiance dans le mécanisme de preuve d'enjeu, la chaîne phare permet également d'estimer la consommation d'énergie post-fusion d'Ethereum. Une [estimation récente](https://blog.ethereum.org/2021/05/18/country-power-no-more/) a suggéré que la fusion vers la preuve d'enjeu pourrait entraîner 99,5 % de réduction de la consommation totale d'énergie, la preuve d'enjeu étant environ 2 000 fois plus économe en énergie que la preuve de travail. Les dépenses énergétiques d'Ethereum seront à peu près égales au coût de l'exécution d'un ordinateur domestique pour chaque noeud du réseau.

![image](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>L'estimation de la consommation d'énergie de la preuve de travail par transaction utilisée dans le graphique est basée sur les <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">données de mai 2021</a>. Au moment de la rédaction de cette page, la même source suggérait jusqu'à <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a></i></small></p>

Comparons ces chiffres à un service tel que Visa. 100 000 transactions Visa utilisent 149 kWh d'énergie<sup>[^2]</sup>. En supposant que la fragmentation a été mis en œuvre, la taux actuel de transaction d'Ethereum (15 transactions par seconde) sera augmenté d'au moins 64 fois (le nombre de fragments), sans tenir compte de l'optimisation supplémentaire des rollups. Une estimation réaliste pour Ethereum après fusion, fragmentation et avec les rollups, est de [25 000 - 100 000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transactions par seconde. Nous pouvons utiliser cette information pour estimer la consommation énergétique minimale et maximale pour 100 000 transactions.

- 25 000 transactions par seconde.
- `100 000 / 25 000 = 4` secondes pour traiter 100 000 transactions.

Nous pouvons également estimer les dépenses énergétiques d'Ethereum par seconde, en faisant une estimation prudente à 10 000 validateurs actifs protègeant le réseau (il y a plus de [250 000 validateurs sur la chaîne phare](https://beaconscan.com/) pour le moment, mais beaucoup de validateurs peuvent fonctionner sur un seul nœud. Actuellement, on estime qu'il y a 3 000 à 4 000 nœuds individuels, donc 10 000 est une estimation prudente pour la post-fusion) :

`1,44 kWh de consommation quotidienne * 10 000 nœuds au sein du réseau = 14 400 kWh` par jour. Il y a 86 400 secondes par jour, donc `14 400 / 86 400 = 0,1667 kWh` par seconde.

Si l'on multiplie cela par le temps qu'il faut pour traiter 100 000 transactions: `0,1667 * 4 = 0,667 kWh`.

Ceci est environ 0,4 % de l'énergie utilisée par Visa pour le même nombre de transactions, ou une réduction des dépenses énergétiques par un facteur d'environ 225 par rapport au réseau actuel de preuve de travail d'Ethereum.

En répétant le calcul avec le maximum de transactions par seconde, on obtient 0,1667 kWh par seconde, soit environ 0,1 % de la consommation en énergie de Visa, ou une réduction d'environ 894 fois.

_Note : Il n'est pas tout à fait exact de comparer en fonction du nombre de transactions puisque la consommation d'énergie d'Ethereum est basée sur le temps. La consommation d'énergie d'Ethereum est la même en 1 minute, peu importe qu'il y ait 1 ou 1 000 transactions._

_Nous devons également considérer qu'Ethereum ne se limite pas à de simples transactions financières, mais qu'il s'agit également d'une plate-forme complète conçue pour les contrats intelligents et les applications décentralisées._

## Un Ethereum plus vert {#green-ethereum}

Alors que la consommation d'énergie d'Ethereum a historiquement été considérable, il y a eu un investissement majeur du temps et de l'intellect des développeurs pour passer de la validation de blocs énergivores à l'efficacité énergétique. Pour citer [Bankless](http://podcast.banklesshq.com/), la meilleure façon de réduire l'énergie consommée par la preuve de travail est simplement de l'« éteindre », ce qui est l'approche qu'Ethereum s'est engagée à adopter.

<InfoBanner emoji=":evergreen_tree:">
  Si vous pensez que ces statistiques sont incorrectes ou peuvent être rendues plus précises, veuillez soulever un problème ou RP. Ce sont des estimations faites par l'équipe d'ethereum.org, en utilisant des informations accessibles au public et la feuille de route actuelle d'Ethereum. Ces déclarations ne représentent pas une promesse officielle de la Fondation Ethereum. 
</InfoBanner>

## Complément d'information {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 Mai 2021_
- [Consommation énergétique d'Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) – Kyle McDonald\_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Sujets connexes {#related-topics}

- [La vision d'Ethereum](/upgrades/vision/)
- [La chaîne phare](/upgrades/beacon-chain)
- [La Fusion](/upgrades/merge/)
- [La fragmentation](/upgrades/beacon-chain/)

### Notes de bas de page et sources {#footnotes-and-sources}

#### 1. Coût énergétique d'Ethereum avec la preuve de travail {#fn-1}

[Consommation énergétique par pays incl. Ethereum (TWh annualisé)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consommation énergétique de Visa {#fn-2}

[Consommation énergétique moyenne par transaction du réseau Bitcoin comparée au réseau Visa à partir de 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Rapport financier de Visa pour le quatrième trimestre 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
