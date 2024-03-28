---
title: Rust geliştiricileri için Ethereum
description: Rust tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>Rust tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin</FeaturedText>

Ethereum'u, kripto para birimi ve blok zinciri teknolojisinin avantajlarından faydalanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani hiç bir kurum veya kişi onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır.

## Akıllı sözleşmeler ve Solidity dilini öğrenmeye başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Rust ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce temel bilgilere mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blok Zinciri Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Başlangıç seviyesi makaleler {#beginner-articles}

- [Ethereum İstemcisi Seçimi](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [The Rust Ethereum Client](https://openethereum.github.io/) \* **OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakıma tabi olmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.
- [Rust Kullanarak Ethereum'a İşlem Göndermek](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Parity Ethereum İstemcisiyle Akıllı Sözleşmelere Giriş](https://wiki.parity.io/Smart-Contracts)
- [Kovan için rust Wasm ile sözleşme yazma hakkında adım adım öğretici](https://github.com/paritytech/pwasm-tutorial)

## Orta Seviye Makaleler {#intermediate-articles}

## İleri Düzey Kullanım Şekilleri {#advanced-use-patterns}

- [Ethereum benzeri ağ ile etkileşim kurmak için pwasm_ethereum externs kütüphanesi](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript ve Rust Kullanarak Merkezsiz Bir Sohbet Oluşturun](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js & Rust kullanarak Merkezsiz bir Yapılacaklar Uygulaması oluşturun](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Gizli Sözleşmelere Giriş](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [Rust ile bir blok zincir inşa et](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust Projeleri ve Araçları {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Ethereum benzeri ağlar ile etkileşim kurmak için hariciler koleksiyonu._
- [Lighthouse](https://github.com/sigp/lighthouse) - _Hızlı Ethereum fikir birliği katmanı istemcisi_
- [Ethereum WebAssemmbly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly'nin karar verici bir alt takımı kullanılarak Ethereum akıllı sözleşme yürütüm katmanının yeniden tasarımının önerilmesi_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API referansı_
- [Solaris](https://github.com/paritytech/sol-rs) - _Yerli Parity İstemci EVM'si kullanılarak Solidity Akıllı Sözleşme birim testi teçhizatı._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust Ethereum Sanal Makinesi Uygulaması_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust'ta Wavelet sakıllı sözleşme_
- [Foundry](https://github.com/gakonst/foundry)- _Ethereum uygulama geliştirme için araç takımı_
- [Ethers_rs](https://github.com/gakonst/ethers-rs)- _Ethereum kütüphanesi ve cüzdan uygulaması_
- [SewUp](https://github.com/second-state/SewUp) - _Tıpkı ortak bir arka uçta geliştiriyormuş gibi Rust ile Ethereum webassembly sözleşmenizi oluşturmanıza yardımcı olacak bir kütüphane_
- [Alt akımlar](https://github.com/streamingfast/substreams) - _Paralel hale getirilmiş blok zincir veri endeksleme teknolojisi_
- [Reth](https://github.com/paradigmxyz/reth) Reth (Rust Ethereum'un söyleyişinin kısaltması) artık yeni bir Ethereum tam düğüm işlenmesidir

Daha fazla kaynak mı arıyorsunuz? Göz atın: [ethereum.org/developers](/developers/).

## Rust Topluluğuna Katkıda Bulunanlar {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
