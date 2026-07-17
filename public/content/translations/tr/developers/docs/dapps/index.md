---
title: "Merkeziyetsiz uygulamalara (dapp) teknik giriş"
description:
lang: tr
---

Bir merkeziyetsiz uygulama (dapp), merkeziyetsiz bir ağ üzerinde inşa edilen ve bir [akıllı sözleşme](/developers/docs/smart-contracts/) ile bir ön yüz kullanıcı arayüzünü birleştiren bir uygulamadır. [Ethereum](/) üzerinde akıllı sözleşmeler, açık API'ler gibi erişilebilir ve şeffaftır; bu nedenle dapp'iniz başkasının yazdığı bir akıllı sözleşmeyi bile içerebilir.

## Ön koşullar {#prerequisites}

Merkeziyetsiz uygulamalar (dapp) hakkında bilgi edinmeden önce, [blokzincir temellerini](/developers/docs/intro-to-ethereum/) kavramalı ve Ethereum ağı ile onun nasıl merkeziyetsiz olduğu hakkında okuma yapmalısınız.

## Bir dapp'in tanımı {#definition-of-a-dapp}

Bir dapp'in arka uç kodu, merkeziyetsiz eşler arası bir ağ üzerinde çalışır. Bunu, arka uç kodunun merkezi sunucularda çalıştığı standart bir uygulama ile karşılaştırabilirsiniz.

Bir dapp, arka ucuna çağrılar yapmak için (tıpkı standart bir uygulama gibi) herhangi bir dilde yazılmış ön uç koduna ve kullanıcı arayüzlerine sahip olabilir. Dahası, ön ucu [IPFS](https://ipfs.io/) gibi merkeziyetsiz bir depolamada barındırılabilir.

- **Merkeziyetsiz** - dapp'ler, hiçbir kişi veya grubun kontrol sahibi olmadığı açık, halka açık ve merkeziyetsiz bir platform olan Ethereum üzerinde çalışır
- **Deterministik** - dapp'ler, çalıştırıldıkları ortamdan bağımsız olarak aynı işlevi yerine getirir
- **Turing tam** - dapp'ler, gerekli kaynaklar sağlandığında herhangi bir eylemi gerçekleştirebilir
- **İzole** - dapp'ler, Ethereum Sanal Makinesi (EVM) olarak bilinen sanal bir ortamda yürütülür; böylece akıllı sözleşmede bir hata varsa, bu durum blokzincir ağının normal işleyişini engellemez

### Akıllı sözleşmeler üzerine {#on-smart-contracts}

Dapp'leri tanıtmak için, daha iyi bir terim olmadığı için bir dapp'in arka ucu diyebileceğimiz akıllı sözleşmeleri tanıtmamız gerekir. Ayrıntılı bir genel bakış için [akıllı sözleşmeler](/developers/docs/smart-contracts/) bölümümüze gidin.

Bir akıllı sözleşme, Ethereum blokzinciri üzerinde yaşayan ve tam olarak programlandığı gibi çalışan bir koddur. Akıllı sözleşmeler ağa dağıtıldıktan sonra onları değiştiremezsiniz. Dapp'ler merkeziyetsiz olabilir çünkü bir birey veya şirket tarafından değil, sözleşmeye yazılan mantık tarafından kontrol edilirler. Bu aynı zamanda sözleşmelerinizi çok dikkatli bir şekilde tasarlamanız ve kapsamlı bir şekilde test etmeniz gerektiği anlamına gelir.

## Dapp geliştirmenin faydaları {#benefits-of-dapp-development}

- **Sıfır kesinti süresi** – Akıllı sözleşme blokzincire dağıtıldıktan sonra, ağ bir bütün olarak sözleşmeyle etkileşime girmek isteyen istemcilere her zaman hizmet verebilecektir. Bu nedenle kötü niyetli aktörler, bireysel dapp'leri hedef alan hizmet reddi (DoS) saldırıları başlatamazlar.
- **Gizlilik** – Bir dapp'i dağıtmak veya onunla etkileşime girmek için gerçek dünyadaki kimliğinizi sağlamanız gerekmez.
- **Sansür direnci** – Ağdaki hiçbir tekil varlık, kullanıcıların işlem göndermesini, dapp'leri dağıtmasını veya blokzincirden veri okumasını engelleyemez.
- **Tam veri bütünlüğü** – Kriptografik ilkeller sayesinde blokzincirde depolanan veriler değişmez ve tartışılmazdır. Kötü niyetli aktörler, işlemleri veya halihazırda herkese açık hale getirilmiş diğer verileri taklit edemezler.
- **Güven gerektirmeyen hesaplama/doğrulanabilir davranış** – Akıllı sözleşmeler analiz edilebilir ve merkezi bir otoriteye güvenmeye gerek kalmadan öngörülebilir şekillerde yürütüleceği garanti edilir. Bu, geleneksel modellerde geçerli değildir; örneğin, çevrimiçi bankacılık sistemlerini kullandığımızda, finansal kurumların finansal verilerimizi kötüye kullanmayacağına, kayıtları değiştirmeyeceğine veya hacklenmeyeceğine güvenmek zorundayız.

## Dapp geliştirmenin dezavantajları {#drawbacks-of-dapp-development}

- **Bakım** – Blokzincirde yayınlanan kod ve verilerin değiştirilmesi daha zor olduğundan dapp'lerin bakımı daha zor olabilir. Eski bir sürümde hatalar veya güvenlik riskleri tespit edilse bile, geliştiricilerin dağıtıldıktan sonra dapp'lerinde (veya bir dapp tarafından depolanan temel verilerde) güncelleme yapması zordur.
- **Performans yükü** – Büyük bir performans yükü vardır ve ölçeklendirme gerçekten zordur. Ethereum'un hedeflediği güvenlik, bütünlük, şeffaflık ve güvenilirlik düzeyine ulaşmak için her düğüm her işlemi çalıştırır ve depolar. Bunun da ötesinde, Hisse Kanıtı (PoS) mutabakatı da zaman alır.
- **Ağ tıkanıklığı** – Bir dapp çok fazla hesaplama kaynağı kullandığında, tüm ağ yavaşlar. Şu anda ağ saniyede yalnızca yaklaşık 10-15 işlem işleyebilmektedir; işlemler bundan daha hızlı gönderiliyorsa, onaylanmamış işlemler havuzu hızla şişebilir.
- **Kullanıcı deneyimi** – Ortalama bir son kullanıcı, blokzincirle gerçekten güvenli bir şekilde etkileşime girmek için gerekli araç yığınını kurmayı çok zor bulabileceğinden, kullanıcı dostu deneyimler tasarlamak daha zor olabilir.
- **Merkezileşme** – Ethereum'un temel katmanı üzerine inşa edilen kullanıcı dostu ve geliştirici dostu çözümler, sonuçta merkezi hizmetlere benzeyebilir. Örneğin, bu tür hizmetler anahtarları veya diğer hassas bilgileri sunucu tarafında depolayabilir, merkezi bir sunucu kullanarak bir ön uç sunabilir veya blokzincire yazmadan önce önemli iş mantığını merkezi bir sunucuda çalıştırabilir. Merkezileşme, blokzincirin geleneksel modele göre avantajlarının çoğunu (hepsini olmasa da) ortadan kaldırır.

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Dapp oluşturma araçları {#dapp-tools}

**Scaffold-ETH _- Akıllı sözleşmenize uyum sağlayan bir ön uç kullanarak Solidity ile hızlıca denemeler yapın._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Örnek dapp](https://punkwallet.io/)

**Create Eth App _- Tek bir komutla Ethereum destekli uygulamalar oluşturun._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Bir [ABI](/glossary/#abi)'den dapp ön uçları oluşturmak için FOSS (Özgür ve Açık Kaynaklı Yazılım) aracı._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Ethereum geliştiricilerinin düğümlerini test etmeleri ve tarayıcıdan RPC çağrıları oluşturup hata ayıklamaları için FOSS aracı._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Web3 geliştirmesi için her dilde SDK'lar, akıllı sözleşmeler, araçlar ve altyapı._**

- [Ana Sayfa](https://thirdweb.com/)
- [Belgeler](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Akıllı sözleşmeleri dağıtmak, kredi kartı ve zincirler arası ödemeleri etkinleştirmek ve NFT'ler oluşturmak, dağıtmak, satmak, depolamak ve düzenlemek için API'leri kullanmak üzere kurumsal düzeyde Web3 geliştirme platformu._**

- [crossmint.com](https://www.crossmint.com)
- [Belgeler](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Daha fazla bilgi {#further-reading}

- [Dapp'leri keşfedin](/apps)
- [Bir Web 3.0 uygulamasının Mimarisi](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Merkeziyetsiz uygulamalar için 2021 rehberi](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Merkeziyetsiz Uygulamalar Nelerdir?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Popüler dapp'ler](https://www.alchemy.com/dapps) - _Alchemy_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili Konular {#related-topics}

- [Ethereum yığınına giriş](/developers/docs/ethereum-stack/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)

## Eğitimler: Ethereum üzerinde uygulamalar ve ön uçlar oluşturun {#tutorials}

- [Uniswap-v2 Sözleşme İncelemesi](/developers/tutorials/uniswap-v2-annotated-code/) _– Otomatik piyasa yapıcı (AMM) sisteminin nasıl çalıştığını açıklayan Uniswap v2 çekirdek sözleşmelerinin açıklamalı bir incelemesi._
- [Sözleşmeniz için bir kullanıcı arayüzü oluşturma](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Akıllı sözleşmenize bağlanan modern bir React + Wagmi ön ucunun nasıl oluşturulacağı._
- [Yeni Başlayanlar İçin Merhaba Dünya Akıllı Sözleşmesi – Tam Yığın (Fullstack)](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Uçtan uca eğitim: basit bir akıllı sözleşme yazın, dağıtın ve bir ön uç oluşturun._
- [Web3 uygulamaları için sunucu bileşenleri ve aracıları](/developers/tutorials/server-components/) _– Blokzincir olaylarını dinleyen ve işlemlerle yanıt veren TypeScript sunucu bileşenlerinin nasıl yazılacağı._
- [Merkeziyetsiz kullanıcı arayüzleri için IPFS](/developers/tutorials/ipfs-decentralized-ui/) _– Sansür direncini sağlamak için dapp'inizin ön ucunu IPFS üzerinde nasıl barındıracağınız._