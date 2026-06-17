---
title: Ethereum pour les développeurs Go
description: Apprenez à développer pour Ethereum en utilisant des projets et des outils basés sur Go
lang: fr
incomplete: true
---

<FeaturedText>Apprenez à développer pour Ethereum en utilisant des projets et des outils basés sur Go</FeaturedText>

Utilisez Ethereum pour créer des applications décentralisées (ou « dapps »). Ces dapps peuvent être dignes de confiance, ce qui signifie qu'une fois déployées sur Ethereum, elles s'exécuteront toujours comme programmé. Elles sont décentralisées, ce qui signifie qu'elles fonctionnent sur un réseau pair à pair et qu'il n'y a pas de point de défaillance unique. Aucune entité ou personne ne les contrôle et elles sont presque impossibles à censurer. Elles peuvent contrôler des actifs numériques afin de créer de nouveaux types d'applications.

## Premiers pas avec les contrats intelligents et le langage Solidity {#getting-started-with-smart-contracts-and-solidity}

**Faites vos premiers pas pour intégrer Go à Ethereum**

Besoin d'une introduction plus basique d'abord ? Consultez [ethereum.org/learn](/learn/) ou [ethereum.org/developers](/developers/).

- [La chaîne de blocs expliquée](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Comprendre les contrats intelligents](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Écrire votre premier contrat intelligent](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Apprendre à compiler et déployer Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutoriel sur les contrats](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Articles et livres pour débutants {#beginner-articles-and-books}

- [Premiers pas avec Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Utiliser Golang pour se connecter à Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Déployer des contrats intelligents Ethereum en utilisant Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Un guide étape par étape pour tester et déployer des contrats intelligents Ethereum en Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Livre numérique : Développement Ethereum avec Go](https://goethereumbook.org/) - _Développer des applications Ethereum avec Go_

## Articles et documentation de niveau intermédiaire {#intermediate-articles-and-docs}

- [Documentation de Go Ethereum](https://geth.ethereum.org/docs) - _La documentation officielle de Golang pour Ethereum_
- [Guide du programmeur Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Guide illustré incluant l'arbre d'état, les multi-preuves et le traitement des transactions_
- [Erigon et Ethereum sans état](https://youtu.be/3-Mn7OckSus?t=394) - _Conférence de la communauté Ethereum 2020 (EthCC 3)_
- [Erigon : optimisation des clients Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 (2018)_
- [GoDoc de Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Créer une dapp en Go avec Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Travailler avec un réseau privé Ethereum avec Golang et Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Tests unitaires de contrats Solidity sur Ethereum avec Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Référence rapide pour utiliser Geth comme bibliothèque](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Modèles d'utilisation avancés {#advanced-use-patterns}

- [Le backend simulé de GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Applications de chaîne de blocs en tant que service utilisant Ethereum et Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Stockage distribué IPFS et Swarm dans les applications de chaîne de blocs Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Clients mobiles : bibliothèques et nœuds Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Dapps natives : liaisons Go aux contrats Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Projets et outils Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Implémentation officielle en Go du protocole Ethereum_
- [Analyse du code de Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Examen et analyse du code source de Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Dérivé plus rapide de Go Ethereum, axé sur les nœuds d'archive_
- [Golem](https://github.com/golemfactory/golem) - _Golem crée un marché mondial pour la puissance de calcul_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Une implémentation à permission d'Ethereum prenant en charge la confidentialité des données_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implémentation en Go d'Ethereum « Serenity » 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter décentralisé : un service de microblogage fonctionnant sur la chaîne de blocs Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implémentation et extension en Golang de la spécification Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Un pool de minage Ethereum open source_
- [Portefeuille HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Dérivations de portefeuille HD Ethereum en Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Prise en charge de nombreuses espèces de réseaux Ethereum_
- [Client léger Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implémentation Geth du sous-protocole Ethereum léger_
- [SDK Golang Ethereum](https://github.com/everFinance/goether) - _Une implémentation simple de portefeuille Ethereum et des utilitaires en Golang_
- [SDK Golang Covalent](https://github.com/covalenthq/covalent-api-sdk-go) - _Accès efficace aux données de la chaîne de blocs via le SDK Go pour plus de 200 chaînes de blocs_

Vous cherchez plus de ressources ? Consultez [ethereum.org/developers](/developers/)

## Contributeurs de la communauté Go {#go-community-contributors}

- [Discord de Geth](https://discordapp.com/invite/nthXNEv)
- [Gist de Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack des Gophers](https://invite.slack.golangbridge.org/) - [canal #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter de Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter d'Ethereum](https://gitter.im/ethereum/home)
- [Gitter du client léger Geth](https://gitter.im/ethereum/light-client)

## Autres listes agrégées {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys : Une liste définitive d'outils pour les développeurs Ethereum](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Source GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)