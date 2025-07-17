---
title: Ethereum pour les développeurs Go
description: Apprendre à développer pour Ethereum avec des projets et des outils basés sur Go
lang: fr
incomplete: true
---

<FeaturedText>Apprendre à développer pour Ethereum avec des projets et des outils basés sur Go</FeaturedText>

Utilisez Ethereum pour créer des applications décentralisées (ou « dApps »). Ces dApps sont dignes de confiance, ce qui signifie que dès qu'elles sont déployées sur Ethereum, elles fonctionnent toujours comme prévu. Étant décentralisées, elles fonctionnent sur un réseau P2P et il n'existe aucun point de défaillance. Aucune personne ni entité ne les contrôle, et il est pratiquement impossible de les censurer. Elles peuvent contrôler des actifs numériques afin de créer de nouveaux types d'applications.

## Premiers pas avec les contrats intelligents et le langage Solidity {#getting-started-with-smart-contracts-and-solidity}

**Commencer à intégrer Go à Ethereum**

Besoin d’une approche plus élémentaire ? Consultez [ethereum.org/learn](/learn/) ou [ethereum.org/developers](/developers/).

- [Explication de la blockchain](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Comprendre les contrats intelligents](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Écrivez votre premier contrat intelligent](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Apprendre à compiler et à déployer avec Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutoriel de contrat](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Articles et livres pour les débutants {#beginner-articles-and-books}

- [Commencer avec Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Utiliser Golang pour se connecter à Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Déployer des contrats intelligents Ethereum en utilisant Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Un guide étape par étape pour tester et déployer des contrats intelligents Ethereum avec Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook&nbsp;: Développement d'Ethereum avec Go](https://goethereumbook.org/) - _Développer des applications Ethereum avec Go_

## Articles et documentation de niveau intermédiaire {#intermediate-articles-and-docs}

- [Documentation Go Ethereum](https://geth.ethereum.org/docs/) - _Documentation Ethereum officielle pour Go_
- [Guide du programmeur Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Guide illustré incluant l'arborescence d'état, les multipreuves et le traitement des transactions_
- [Erigon et Ethereum sans état](https://youtu.be/3-Mn7OckSus?t=394) - _Conférence de la Communauté Ethereum 2020 (EthCC 3)_
- [Erigon : optimiser les clients Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [GoDoc Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Créer une dApp avec Geth dans Go](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Travailler avec le réseau privé Ethereum avec Golang et Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Test unitaire des contrats Solidity avec Go dans Ethereum](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Référence rapide pour utiliser Geth en tant que bibliothèque](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Modèles d'utilisation avancés {#advanced-use-patterns}

- [Le backend GETH simulé](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Applications de type blockchain en tant que service utilisant Ethereum et Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Stockage distribué IPFS et Swarm dans les applications de la blockchain Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Clients mobiles : bibliothèques et nœuds Ethereum d'Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [dApps natives : liaisons Go aux contrats Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Outils et projets Go {#go-projects-and-tools}

- [Geth/Go Ethereum](https://github.com/ethereum/go-ethereum) - _Implémentation officielle du protocole Ethereum_
- [Go Ethereum Code Analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Revue et analyse du code source Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Dérivé plus rapide de Go Ethereum, focalisé sur les nœuds d'archives_
- [Golem](https://github.com/golemfactory/golem) - _Golem crée un marché mondial de distribution de puissance informatique_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Implémentation d'Ethereum soumise à droit d'accès, prenant en charge la confidentialité des données_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implémentation d'Ethereum « Serenity » 2.0 Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter décentralisé&nbsp;: service de microblogging fonctionnant sur la blockchain Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) - _Implémentation et extension Golang de la spécification Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Groupe de minage Ethereum en open source_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Dérivations de portefeuilles HD (Hierarchical Deterministic, ou déterministe hiérarchique) Ethereum en Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Support pour de nombreux types de réseaux Ethereum_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implémentation Geth du LES (Light Client Subprotocol) Ethereum_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Une simple implémentation et des utilitaires pour les portefeuilles Ethereum dans Golang_
- [SDK Golang Covalent](https://github.com/covalenthq/covalent-api-sdk-go) - _Accès efficace aux données blockchain via Go SDK pour plus de 200 blockchains_

Vous cherchez davantage de ressources ? Consultez [ethereum.org/developers.](/developers/)

## Contributeurs de la communauté Go {#go-community-contributors}

- [Discord de Geth](https://discordapp.com/invite/nthXNEv)
- [Gist de Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack de Gophers](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter de Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter d'Ethereum](https://gitter.im/ethereum/home)
- [Client Gitter Light de Geth](https://gitter.im/ethereum/light-client)

## Autres ressources {#other-aggregated-lists}

- [Génial Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys : une liste définitive des outils pour les développeurs d'Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Source GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
