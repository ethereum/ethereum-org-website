---
title: Rust geliştiricileri için Ethereum
description: Rust tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>Rust tabanlı projeler ve araçlar kullanarak Ethereum için nasıl geliştirme yapacağınızı öğrenin</FeaturedText>

Kripto para birimi ve blok zinciri teknolojisinin faydalarını kullanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için Ethereum'u kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani tek bir varlık veya kişi onları kontrol etmez ve sansürlemenin neredeyse imkansız olduğu anlamına gelir.

## Akıllı sözleşmelere ve Solidity diline başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Rust ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce daha temel bir bilgiye mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blokzincir Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Başlangıç seviyesi makaleler {#beginner-articles}

- [Rust Ethereum İstemcisi](https://openethereum.github.io/) \* **OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakımının yapılmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.
- [Rust Kullanarak Ethereum'a İşlem Gönderme](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan için Rust Wasm ile sözleşme yazma hakkında adım adım bir öğretici](https://github.com/paritytech/pwasm-tutorial)

## Orta seviye makaleler {#intermediate-articles}

## Gelişmiş kullanım kalıpları {#advanced-use-patterns}

- [Ethereum benzeri ağlarla etkileşim kurmak için pwasm_ethereum externs kütüphanesi](https://github.com/openethereum/pwasm-ethereum)

- [JavaScript ve Rust Kullanarak Merkeziyetsiz Bir Sohbet Uygulaması Oluşturun](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js ve Rust Kullanarak Merkeziyetsiz Bir Yapılacaklar Uygulaması Oluşturun](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust ile bir blokzincir oluşturun](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust projeleri ve araçları {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Ethereum benzeri ağlarla etkileşim kurmak için externs koleksiyonu_
- [Lighthouse](https://github.com/sigp/lighthouse) - _Hızlı Ethereum mutabakat katmanı istemcisi_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly'nin deterministik bir alt kümesini kullanan Ethereum akıllı sözleşme yürütme katmanının önerilen yeniden tasarımı_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API referansı_
- [Solaris](https://github.com/paritytech/sol-rs) - _Yerel Parity İstemcisi EVM'sini kullanan Solidity Akıllı Sözleşmeleri birim testi çerçevesi._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust Ethereum Sanal Makinesi Uygulaması_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust ile Wavelet akıllı sözleşmesi_
- [Foundry](https://github.com/foundry-rs/foundry) - _Ethereum uygulama geliştirmesi için araç takımı_
- [Alloy](https://alloy.rs) - _Ethereum ve diğer EVM tabanlı zincirlerle etkileşim kurmak için yüksek performanslı, iyi test edilmiş ve belgelenmiş kütüphaneler._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Ethereum kütüphanesi ve cüzdan uygulaması_
- [SewUp](https://github.com/second-state/SewUp) - _Tıpkı ortak bir arka uçta geliştirme yapar gibi Rust ile Ethereum webassembly sözleşmenizi oluşturmanıza yardımcı olan bir kütüphane_
- [Substreams](https://github.com/streamingfast/substreams) - _Paralelleştirilmiş blokzincir veri dizinleme teknolojisi_
- [Reth](https://github.com/paradigmxyz/reth) Reth (Rust Ethereum'un kısaltması), yeni bir Ethereum tam düğüm uygulamasıdır
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Ethereum ekosisteminde Rust ile yazılmış projelerden oluşan derlenmiş bir koleksiyon_

Daha fazla kaynak mı arıyorsunuz? [ethereum.org/developers.](/developers/) adresine göz atın.

## Rust topluluğu katkıda bulunanları {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
