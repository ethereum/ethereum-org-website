---
title: Ethereum pour les développeurs Go
description: Apprendre à développer pour Ethereum avec des projets et des outils basés sur Go
lang: fr
incomplete: true
---

<FeaturedText>Apprenez à développer pour Ethereum en utilisant des projets et des outils basés sur Go</FeaturedText>

Utilisez Ethereum pour créer des applications décentralisées (ou « dApps »). Ces dApps sont dignes de confiance, ce qui signifie que dès qu'elles sont déployées sur Ethereum, elles fonctionnent toujours comme prévu Étant décentralisées, elles fonctionnent sur un réseau P2P et il n'existe aucun point de défaillance. Aucune personne ni entité ne les contrôle, et il est pratiquement impossible de les censurer. Elles peuvent contrôler des actifs numériques afin de créer de nouveaux types d'applications.

## Premiers pas avec les contrats intelligents et le langage Solidity {#getting-started-with-smart-contracts-and-solidity}

**Commencer à intégrer Go à Ethereum**

Besoin d’une approche plus élémentaire ? Consultez [ethereum.org/learn](/learn/) ou [ethereum.org/developers](/developers/).

- [Blockchain expliquée](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Comprendre les contrats intelligents (https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Écrivez votre premier contrat intelligent (https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Apprenez comment compiler et déployer Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutoriel de contrat](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Articles et livres pour débutants {#beginner-articles-and-books}

- [Démarrer avec Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Utiliser Golang pour se connecter à Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Déployer des contrats intelligents Ethereum en utilisant Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Un guide étape par étape pour tester et déployer des contrats intelligents Ethereum en Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook : Développement Ethereum avec Go](https://goethereumbook.org/) - _Développer des applications Ethereum avec Go_

## Articles et documents intermédiaires {#intermediate-articles-and-docs}

- [Documentation Go Ethereum](https://geth.ethereum.org/docs/) - _La documentation officielle d'Ethereum pour Golang_
- [Guide du programmeur Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Guide illustré incluant l'arbre d'état, les preuves multiples et le traitement des transactions_
- [Erigon et Ethereum sans état](https://youtu.be/3-Mn7OckSus?t=394) - _Conférence de la communauté Ethereum 2020 (EthCC 3)_
- [Erigon : optimiser les clients Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 (2018)_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Créer une dapp en Go avec Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Travailler avec un réseau privé Ethereum avec Golang et Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Tests unitaires de contrats Solidity sur Ethereum avec Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Référence rapide pour l'utilisation de Geth comme bibliothèque](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Modèles d'utilisation avancés {#advanced-use-patterns}

- [Le backend simulé de GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Applications Blockchain-as-a-Service utilisant Ethereum et Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Stockage distribué IPFS et Swarm dans les applications de la blockchain Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Clients mobiles : bibliothèques et nœuds Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Dapps natives : liaisons Go vers des contrats Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Projets et outils Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Implémentation Go officielle du protocole Ethereum_
- [Analyse du code de Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Examen et analyse du code source de Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Dérivé plus rapide de Go Ethereum, axé sur les nœuds d'archive_
- [Golem](https://github.com/golemfactory/golem) - _Golem crée un marché mondial pour la puissance de calcul_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Une implémentation d'Ethereum soumise à des autorisations, qui prend en charge la confidentialité des données_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implémentation Go d'Ethereum « Serenity » 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter décentralisé : un service de microblogging fonctionnant sur la blockchain Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implémentation et extension Golang de la spécification Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Un pool de minage Ethereum open source_
- [Portefeuille HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Dérivations de portefeuille HD Ethereum en Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Prise en charge de nombreux types de réseaux Ethereum_
- [Client léger Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implémentation Geth du sous-protocole léger d'Ethereum_
- [SDK Ethereum Golang](https://github.com/everFinance/goether) - _Une implémentation simple de portefeuille Ethereum et des utilitaires en Golang_
- [SDK Golang Covalent](https://github.com/covalenthq/covalent-api-sdk-go) - _Accès efficace aux données de la blockchain via le SDK Go pour plus de 200 blockchains_

Vous cherchez davantage de ressources ? Consultez [ethereum.org/developers](/developers/)

## Contributeurs de la communauté Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Slack Gophers](https://invite.slack.golangbridge.org/) - [Canal #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Gitter du client léger Geth](https://gitter.im/ethereum/light-client)

## Autres listes agrégées {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys : une liste définitive des outils de développement Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Source GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
