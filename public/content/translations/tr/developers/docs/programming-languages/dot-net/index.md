---
title: .NET Geliştiricileri için Ethereum
description: .NET tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>.NET tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin</FeaturedText>

Ethereum'u, kripto para birimi ve blok zinciri teknolojisinin avantajlarından faydalanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani hiç bir kurum veya kişi onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır.

Ethereum'un üzerinde merkeziyetsiz uygulamalar oluşturun ve Microsoft teknoloji yığınından araçları ve dilleri kullanarak akıllı sözleşmelerle etkileşim kurun: VSCode ve Visual Studio gibi araçlarda .NET Framework/.NET Core/.NET Standard üzerinde C#, # Visual Basic .NET ve F# desteklenir. Microsoft Azure'ı kullanarak Azure üzerinde bir Ethereum Blok zincirini dakikalar içinde yayınlayın. .NET aşkını Ethereum'a taşıyın!

## Akıllı Sözleşmeler ve Solidity Dilini Öğrenmeye Başlangıç {#getting-started-with-smart-contracts-and-the-solidity-language}

**.NET ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce temel bilgilere mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blok Zinciri Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'i Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Başlangıç Düzeyi Yardımcı Kaynaklar ve Bağlantılar {#beginner-references-and-links}

**Nethereum Kütüphanesi ve VS Code Solidity Tanıtımı**

- [Nethereum'a Başlangıç](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code Solidity Kurulumu](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Ethereum Akıllı Sözleşmelerini Yaratmak ve Çağırmak için Bir .NET Geliştiricisinin İş Akışı](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Akıllı Kontratların Nethereum ile entegrasyonu](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum ile .NET ve Ethereum Blok Zinciri Akıllı Sözleşmelerinin Arayüzlenmesi](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), ayrıca [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1) dilinde
- [Nethereum - Blok zinciri için açık kaynaklı bir .NET entegrasyon kütüphanesi](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum Kullanarak Ethereum İşlemlerini SQL Database'ine yazmak](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C# ve VisualStudio kullanarak kolayca Ethereum akıllı sözleşmelerini dağıtmayı görün](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**Şimdilik kurulumu bırakıp doğrudan örneklere geçmek ister misiniz?**

- [Playground](http://playground.nethereum.com/) - Tarayıcınız aracılığıyla Ethereum'la etkileşime geçin ve Nethereum'u nasıl kullanacağınızı öğrenin.
  - Hesap Bakiyesi Sorgusu [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 Akıllı Sözleşme Bakiyesi Sorgusu[C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - Bir hesaba ether transfer aktarma [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... Ve daha fazlası!

## Orta Seviye Makaleler {#intermediate-articles}

- [Nethereum Çalışma Kitabı/Örnek Listesi](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [Kendi Geliştirici Test Zincirlerinizi Yayınlayın](https://github.com/Nethereum/Testchains)
- [Solidity için VSCode Codegen Eklentisi](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unity ve Ethereum: Neden ve Nasıl](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [Ethereum dapp'leri için ASP.NET Core Web API oluşturun](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3'ü bir Tedarik Zinciri Takip Sistemi Uygulamak için Kullanmak](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [C# Playground örneği](http://playground.nethereum.com/csharp/id/1025) ile [Nethereum Blok İşleme](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/)
- [Nethereum Websocket Yayını](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido ve Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum ve Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## İleri Düzey Kullanım Şekilleri {#advanced-use-patterns}

- [Azure Anahtar Kasası ve Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum arka uç referans mimarisi](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET projeleri, araçları ve diğer eğlenceli şeyler {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](http://playground.nethereum.com/) - _Tarayıcıda Nethereum kod parçacıklarını derleyin, oluşturun ve çalıştırın_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor'da kullanıcı arayüzü ile Nethereum codegen_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET Wasm SPA hafif blok zinciri arayıcısı ve basit cüzdan_
- [Wonka İş Kuralları Motoru](https://docs.nethereum.com/en/latest/wonka/) - _Kendiliğinden meta veri odaklı bir iş kuralları motoru (hem .NET platformu hem de Ethereum platformu için)_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOs için bir .NET Core Ethereum istemcisi_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _Ethereum ile ilgili kod tabanlarıyla çalışmak için yardımcı fonksiyonlar_
- [TestChains](https://github.com/Nethereum/TestChains) - _Hızlı yanıt için önceden yapılandırılmış .NET aygıtları (PoA)_

Daha fazla kaynak mı arıyorsunuz? Göz atın: [ethereum.org/developers](/developers/).

## .NET Toplumuna Katkıda Bulunanlar {#dot-net-community-contributors}

Nethereum'da çoğu zaman [Gitter](https://gitter.im/Nethereum/Nethereum)'da zaman geçiriyoruz. Burası herkesin kabul edildiği, soru ve cevaplar yazabildiği, yardım alabildiği veya sadece kafa dağıttığı bir yerdir. [Nethereum Github deposunda](https://github.com/Nethereum) bir PR veya bir konu açmaktan veya sadece sahip olduğumuz birçok yan/örnek projeye göz atmaktan çekinmeyin. Ayrıca bizi [Discord](https://discord.gg/jQPrR58FxX) üzerinde de bulabilirsiniz!

Eğer Nethermind'da yeniyseniz ve başlamak için yardıma ihtiyaç duyuyorsanız, [Discord](http://discord.gg/PaCMRFdvWT) sunucumuza katılın. Geliştiricilerimiz sorularınızı cevaplamaya hazırdır. [Nethermind Github deposunda](https://github.com/NethermindEth/nethermind) bir PR açmaktan veya konu başlatmaktan çekinmeyin.

## Diğer Toplu Listeler {#other-aggregated-lists}

[Resmi Nethereum Sitesi](https://nethereum.com/)  
[Resmi Nethermind Sitesi](https://nethermind.io/)
