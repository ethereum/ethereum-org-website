---
title: Go Geliştiricileri için Ethereum
description: Go tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>Go tabanlı projeler ve araçlar kullanarak Ethereum için nasıl geliştirme yapacağınızı öğrenin</FeaturedText>

Ethereum'u, merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Merkeziyetsizdirler, yani uçtan uca bir ağda çalışırlar ve tek bir hata noktası yoktur. Hiçbir tekil varlık veya şahıs onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır. Yeni tür uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler.

## Akıllı sözleşmelere ve Solidity diline başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Go ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce daha temel bir bilgiye mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blokzincir Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Sözleşme Öğreticisi](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Başlangıç seviyesi makaleler ve kitaplar {#beginner-articles-and-books}

- [Geth ile Başlarken](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Ethereum'a Bağlanmak için Golang Kullanımı](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang Kullanarak Ethereum Akıllı Sözleşmelerini Dağıtma](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go'da Ethereum Akıllı Sözleşmelerini Test Etmek ve Dağıtmak İçin Adım Adım Kılavuz](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [e-Kitap: Go ile Ethereum Geliştirme](https://goethereumbook.org/) - _Go ile Ethereum uygulamaları geliştirin_

## Orta seviye makaleler ve belgeler {#intermediate-articles-and-docs}

- [Go Ethereum Belgeleri](https://geth.ethereum.org/docs/) - _Resmi Ethereum Golang'ın belgeleri_
- [Erigon Programcı Kılavuzu](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Durum ağacı, çoklu kanıtlar ve işlem işlemeyi içeren resimli kılavuz_
- [Erigon ve Durumsuz Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _2020 Ethereum Topluluk Konferansı (EthCC 3)_
- [Erigon: Ethereum istemcilerini optimize etme](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth ile Go'da bir merkeziyetsiz uygulama oluşturma](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang ve Geth ile Ethereum Özel Ağıyla Çalışma](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go ile Ethereum'daki Solidity sözleşmelerinin birim testi](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth'i bir kütüphane olarak kullanmak için hızlı başvuru](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Gelişmiş kullanım kalıpları {#advanced-use-patterns}

- [GETH Simüle Edilmiş Arka Uç](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Ethereum ve Quorum Kullanan Hizmet Olarak Blokzincir Uygulamaları](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Ethereum Blokzincir Uygulamalarında Dağıtılmış Depolama IPFS ve Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobil İstemciler: Kütüphaneler ve Süreç İçi Ethereum Düğümleri](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Yerel merkeziyetsiz uygulamalar: Ethereum sözleşmelerine Go bağlantıları](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go projeleri ve araçları {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Ethereum protokolünün resmi Go uygulaması_
- [Go Ethereum Kod Analizi](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum kaynak kodunun incelenmesi ve analizi_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go Ethereum'un arşiv düğümlerine odaklanan daha hızlı bir türevi_
- [Golem](https://github.com/golemfactory/golem) - _Golem, bilgi işlem gücü için küresel bir pazar yaratıyor_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Veri gizliliğini destekleyen, Ethereum'un izinli bir uygulaması_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Ethereum 'Serenity' 2.0 Go Uygulaması_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Merkeziyetsiz Twitter: Ethereum blokzincirinde çalışan bir mikroblog hizmeti_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Minimum Uygulanabilir Plazma spesifikasyonunun Golang uygulaması ve uzantısı_
- [Açık Ethereum Madencilik Havuzu](https://github.com/sammy007/open-ethereum-pool) - _Açık kaynaklı bir Ethereum madencilik havuzu_
- [Ethereum HD Cüzdanı](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go'da Ethereum HD Cüzdan türevleri_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Birçok Ethereum ağı türü için destek_
- [Geth Hafif İstemci](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Hafif Ethereum Alt Protokolü'nün Geth uygulaması_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golang'da basit bir Ethereum cüzdanı uygulaması ve yardımcı programları_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200'den fazla blokzincir için Go SDK aracılığıyla verimli blokzincir veri erişimi_

Daha fazla kaynak mı arıyorsunuz? [ethereum.org/developers](/developers/) adresine göz atın

## Go topluluğu katkıda bulunanları {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum kanalı](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth Hafif İstemci Gitter](https://gitter.im/ethereum/light-client)

## Diğer derlenmiş listeler {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Ethereum Geliştirici Araçlarının Kesin Listesi](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub kaynağı](https://github.com/ConsenSys/ethereum-developer-tools-list)
