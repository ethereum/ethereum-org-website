---
title: "Rust geliştiricileri için Ethereum"
description: "Rust tabanlı projeleri ve araçları kullanarak Ethereum için nasıl geliştirme yapacağınızı öğrenin"
lang: tr
incomplete: true
---

<FeaturedText>Rust tabanlı projeleri ve araçları kullanarak Ethereum için nasıl geliştirme yapacağınızı öğrenin</FeaturedText>

Kripto para ve Blokzincir teknolojisinin avantajlarından yararlanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için Ethereum'u kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıklarında her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani hiçbir tekil varlık veya kişi onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır.

## Akıllı sözleşmeler ve Solidity dili ile başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Rust'ı Ethereum ile entegre etmek için ilk adımlarınızı atın**

Önce daha temel bir başlangıca mı ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) sayfalarına göz atın.

- [Blokzincir Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Başlangıç seviyesi makaleler {#beginner-articles}

- [Rust Ethereum İstemcisi](https://openethereum.github.io/) \* **OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakımının yapılmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.
- [Rust Kullanarak Ethereum'a İşlem Göndermek](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan için Rust Wasm'da sözleşmelerin nasıl yazılacağına dair adım adım bir eğitim](https://github.com/paritytech/pwasm-tutorial)

## Orta seviye makaleler {#intermediate-articles}

## Gelişmiş kullanım kalıpları {#advanced-use-patterns}

- [Ethereum benzeri bir ağ ile etkileşim kurmak için pwasm_ethereum externs kütüphanesi](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript ve Rust Kullanarak Merkeziyetsiz Bir Sohbet Uygulaması Geliştirin](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js ve Rust Kullanarak Merkeziyetsiz Bir Yapılacaklar Uygulaması Geliştirin](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust'ta bir Blokzincir geliştirin](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust projeleri ve araçları {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Ethereum benzeri bir ağ ile etkileşim kurmak için externs koleksiyonu_
- [Lighthouse](https://github.com/sigp/lighthouse) - _Hızlı Ethereum mutabakat katmanı istemcisi_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly'nin deterministik bir alt kümesini kullanarak Ethereum akıllı sözleşme yürütme katmanının önerilen yeniden tasarımı_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API referansı_
- [Solaris](https://github.com/paritytech/sol-rs) - _Yerel Parity İstemcisi EVM'sini kullanan Solidity Akıllı Sözleşmeleri birim test aracı._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust Ethereum Sanal Makinesi Uygulaması_
- [Wavelet](https://github.com/perlin-network/smart-contract-rs) - _Rust'ta Wavelet akıllı sözleşmesi_
- [Foundry](https://github.com/foundry-rs/foundry) - _Ethereum uygulama geliştirme araç seti_
- [Alloy](https://alloy.rs) - _Ethereum ve diğer EVM tabanlı zincirlerle etkileşim kurmak için yüksek performanslı, iyi test edilmiş ve belgelenmiş kütüphaneler._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Ethereum kütüphanesi ve cüzdan uygulaması_
- [SewUp](https://github.com/second-state/SewUp) - _Rust ile Ethereum WebAssembly sözleşmenizi oluşturmanıza ve tıpkı yaygın bir arka uçta geliştirme yapar gibi geliştirmenize yardımcı olan bir kütüphane_
- [Substreams](https://github.com/streamingfast/substreams) - _Paralelleştirilmiş Blokzincir veri indeksleme teknolojisi_
- [Reth](https://github.com/paradigmxyz/reth) Reth (Rust Ethereum'un kısaltması), yeni bir Ethereum tam düğüm uygulamasıdır
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Ethereum ekosisteminde Rust ile yazılmış projelerin özenle seçilmiş bir koleksiyonu_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrum üzerinde akıllı sözleşmeler oluşturmak için Rust SDK'sı_

Daha fazla kaynak mı arıyorsunuz? [ethereum.org/developers.](/developers/) sayfasına göz atın.

## Rust topluluğu katkıda bulunanları {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
