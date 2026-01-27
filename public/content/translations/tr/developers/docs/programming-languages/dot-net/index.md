---
title: .Net Geliştiricileri için Ethereum
description: .NET tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>.NET tabanlı projeler ve araçlarla Ethereum için nasıl geliştirme yapacağınızı öğrenin</FeaturedText>

Kripto para birimi ve blok zinciri teknolojisinin faydalarını kullanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için Ethereum'u kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani tek bir varlık veya kişi onları kontrol etmez ve sansürlemenin neredeyse imkansız olduğu anlamına gelir.

Ethereum'un üzerinde merkeziyetsiz uygulamalar oluşturun ve Microsoft teknoloji yığınından araçları ve dilleri kullanarak akıllı sözleşmelerle etkileşim kurun: VSCode ve Visual Studio gibi araçlarda .NET Framework/.NET Core/.NET Standard üzerinde C#, # Visual Basic .NET ve F# desteklenir. Microsoft Azure'ı kullanarak Azure üzerinde bir Ethereum Blok zincirini dakikalar içinde yayınlayın. .NET aşkını Ethereum'a taşıyın!

## Akıllı sözleşmelere ve Solidity diline başlangıç {#getting-started-with-smart-contracts-and-the-solidity-language}

**.NET'i Ethereum ile entegre etmek için ilk adımlarınızı atın**

Başlamadan önce daha temel bir bilgiye mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blokzincir Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Yeni başlayanlar için referanslar ve bağlantılar {#beginner-references-and-links}

**Nethereum Kütüphanesi ve VS Code Solidity'i sizlere sunarız**

- [Nethereum, Başlarken](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code Solidity Kurulumu](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Bir .NET Geliştiricisinin Ethereum Akıllı Sözleşmeleri Oluşturma ve Çağırma İş Akışı](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum ile akıllı sözleşme entegrasyonu](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum ile .NET ve Ethereum Blokzinciri Akıllı Sözleşmelerinin Arayüzlenmesi](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), ayrıca [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [Nethereum - Blokzinciri için açık kaynaklı bir .NET entegrasyon kütüphanesi](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum Kullanarak Ethereum İşlemlerini SQL Veritabanına Yazma](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C# ve VisualStudio kullanarak Ethereum akıllı sözleşmelerini kolayca nasıl dağıtacağınızı görün](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**Şimdilik kurulumu bırakıp doğrudan örneklere geçmek ister misiniz?**

- [Playground](http://playground.nethereum.com/) - Tarayıcı üzerinden Ethereum ile etkileşime geçin ve Nethereum'u nasıl kullanacağınızı öğrenin.
  - Hesap Bakiyesini Sorgulama [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 Akıllı Sözleşme Bakiyesini Sorgulama [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - Bir Hesaba ether Aktarma [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... Ve dahası!

## Orta seviye makaleler {#intermediate-articles}

- [Nethereum Çalışma Kitabı/Örnek Listesi](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [Kendi Geliştirme Test Zincirlerinizi Dağıtma](https://github.com/Nethereum/Testchains)
- [Solidity için VSCode Codegen Eklentisi](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unity ve Ethereum: Neden ve Nasıl](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [Ethereum merkeziyetsiz uygulamaları için ASP.NET Core Web API Oluşturma](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Bir Tedarik Zinciri Takip Sistemi Uygulamak için Nethereum Web3 Kullanımı](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum Blok İşleme](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), [C# Playground örneği](http://playground.nethereum.com/csharp/id/1025) ile
- [Nethereum Websocket Akışı](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido ve Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum ve Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## Gelişmiş kullanım kalıpları {#advanced-use-patterns}

- [Azure Key Vault ve Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum arka uç referans mimarisi](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET projeleri, araçları ve diğer eğlenceli şeyler {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](http://playground.nethereum.com/) - _Tarayıcıda Nethereum kod parçacıklarını derleyin, oluşturun ve çalıştırın_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor'da kullanıcı arayüzlü Nethereum kod oluşturma_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET Wasm SPA hafif bir blokzincir gezgini ve basit cüzdan_
- [Wonka İş Kuralları Motoru](https://docs.nethereum.com/en/latest/wonka/) - _Doğası gereği meta veri odaklı bir iş kuralları motoru (hem .NET platformu hem de Ethereum platformu için)_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOS için bir .NET Core Ethereum istemcisi_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _Ethereum ile ilgili kod tabanlarıyla çalışmak için yardımcı fonksiyonlar_
- [TestChains](https://github.com/Nethereum/TestChains) - _Hızlı yanıt için önceden yapılandırılmış .NET geliştirme zincirleri (PoA)_

Daha fazla kaynak mı arıyorsunuz? [ethereum.org/developers](/developers/) adresine göz atın.

## .NET topluluğu katkıda bulunanları {#dot-net-community-contributors}

Nethereum'da çoğunlukla herkesin soru sorup cevaplayabileceği, yardım alabileceği veya sadece rahatlayabileceği [Gitter](https://gitter.im/Nethereum/Nethereum)'da takılırız. [Nethereum GitHub deposunda](https://github.com/Nethereum) bir PR açmaktan veya bir sorun bildirmekten çekinmeyin, ya da sadece sahip olduğumuz birçok yan/örnek projeye göz atın. Bizi [Discord](https://discord.gg/jQPrR58FxX)'da da bulabilirsiniz!

Nethermind'de yeniyseniz ve başlamak için yardıma ihtiyacınız varsa, [Discord](http://discord.gg/PaCMRFdvWT) sunucumuza katılın. Geliştiricilerimiz sorularınızı cevaplamaya hazırdır. [Nethermind GitHub deposunda](https://github.com/NethermindEth/nethermind) bir PR açmaktan veya herhangi bir sorun bildirmekten çekinmeyin.

## Diğer derlenmiş listeler {#other-aggregated-lists}

[Resmi Nethereum Sitesi](https://nethereum.com/)  
[Resmi Nethermind Sitesi](https://nethermind.io/)
