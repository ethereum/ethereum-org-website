---
title: Merkeziyetsiz uygulamalara teknik giriş
description:
lang: tr
---

Merkeziyetsiz bir uygulama (dapp), [akıllı sözleşme](/developers/docs/smart-contracts/) ile ön uç kullanıcı arayüzünü birleştiren merkeziyetsiz bir ağ üzerinde oluşturulmuş bir uygulamadır. Ethereum'da akıllı sözleşmeler açık API'ler gibi erişilebilir ve şeffaftır: Bu yüzden merkeziyetsiz uygulamanız, başka birinin yazdığı bir akıllı sözleşmeyi bile içerebilir.

## Ön Koşullar {#prerequisites}

Merkeziyetsiz uygulamalar hakkında bilgi edinmeden önce [blokzincir temellerini](/developers/docs/intro-to-ethereum/) ele almalı, Ethereum ağı ve nasıl merkeziyetsiz olduğu hakkında okuma yapmalısınız.

## Merkeziyetsiz uygulamanın tanımı {#definition-of-a-dapp}

Bir dapp'in arka uç kodu, merkeziyetsiz bir eşler arası ağ üzerinde çalışır. Bunu, arka uç kodunun merkezi sunucularda çalıştığı bir uygulamanın tersi olarak düşünebilirsiniz.

Bir dapp, arka ucuna çağrı yapabilen herhangi bir dilde yazılmış (tıpkı bir uygulama gibi) ön uç koduna ve kullanıcı arayüzlerine sahip olabilir. Ayrıca, ön yüzü [IPFS](https://ipfs.io/) gibi merkeziyetsiz depolama alanlarında barındırılabilir.

- **Merkeziyetsiz** - merkeziyetsiz uygulamalar, tek bir kişinin veya grubun kontrol sahibi olmadığı açık, halka açık, merkeziyetsiz bir platform olan Ethereum'da çalışır
- **Deterministik** - merkeziyetsiz uygulamalar, yürütüldükleri ortamdan bağımsız olarak aynı işlevi yerine getirir
- **Turing tam** - merkeziyetsiz uygulamalar, gerekli kaynaklar sağlandığında herhangi bir eylemi gerçekleştirebilir
- **İzole** - merkeziyetsiz uygulamalar, Ethereum Sanal Makinesi olarak bilinen sanal bir ortamda yürütülür; böylece akıllı sözleşmede bir hata olması durumunda blokzincir ağının normal işleyişini engellemez

### Akıllı sözleşmeler hakkında {#on-smart-contracts}

Dapp'leri kullanıma sokmak için, en iyi şekilde bir dapp'in arka ucu olarak tanımlayabileceğimiz akıllı sözleşmeleri kullanıma sokmamız gerekir. Ayrıntılı bir genel bakış için [akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkındaki bölümümüze bakın.

Akıllı sözleşme, Ethereum blok zincirinde yaşayan ve tam olarak programlandığı gibi çalışan bir koddur. Akıllı sözleşmeler ağa dağıtıldıktan sonra bunları değiştiremezsiniz. Dapp'ler, bir kişi veya şirket tarafından değil, sözleşmeye yazılan mantık tarafından kontrol edildikleri için merkeziyetsiz hâle getirilebilir. Bu aynı zamanda, sözleşmelerinizi çok dikkatli bir şekilde tasarlamanız ve iyice test etmeniz gerektiği anlamına gelir.

## Merkeziyetsiz uygulama geliştirmenin avantajları {#benefits-of-dapp-development}

- **Sıfır kesinti** – Akıllı sözleşme blokzincire dağıtıldıktan sonra, ağ bir bütün olarak sözleşmeyle etkileşim kurmak isteyen istemcilere her zaman hizmet verebilecektir. Bu nedenle kötü niyetli aktörler, bireysel dapp'lere yönelik hizmet reddi saldırıları başlatamaz.
- **Gizlilik** – Bir merkeziyetsiz uygulamayı dağıtmak veya onunla etkileşim kurmak için gerçek dünya kimliğinizi sağlamanız gerekmez.
- **Sansüre karşı direnç** – Ağdaki hiçbir tek varlık, kullanıcıların işlem göndermesini, merkeziyetsiz uygulamaları dağıtmasını veya blokzincirden veri okumasını engelleyemez.
- **Tam veri bütünlüğü** – Kriptografik temeller sayesinde blokzincirde saklanan veriler değiştirilemez ve tartışılamaz. Kötü niyetli aktörler, hâlihazırda kamuya açıklanmış olan işlemleri veya diğer verileri taklit edemezler.
- **Güven gerektirmeyen hesaplama/doğrulanabilir davranış** – Akıllı sözleşmeler analiz edilebilir ve merkezi bir otoriteye güvenme ihtiyacı olmaksızın, öngörülebilir şekillerde yürütülmesi garanti edilir. Bu geleneksel modeller için geçerli değildir: Örneğin, çevrimiçi bankacılık sistemlerini kullandığımızda, finansal kurumların finansal verilerimizi kötüye kullanmayacağına, kayıtları kurcalamayacağına veya saldırıya uğramayacağına güvenmemiz gerekir.

## Merkeziyetsiz uygulama geliştirmenin dezavantajları {#drawbacks-of-dapp-development}

- **Bakım** – Blokzincirde yayınlanan kod ve verilerin değiştirilmesi daha zor olduğundan, merkeziyetsiz uygulamaların bakımı daha zor olabilir. Geliştiricilerin, eski bir sürümde hatalar veya güvenlik riskleri tanımlansa bile dağıtıldıktan sonra dapp'lerinde (veya bir dapp tarafından depolanan temel verilerde) güncellemeler yapmaları zordur.
- **Performans ek yükü** – Çok büyük bir performans ek yükü vardır ve ölçeklendirme gerçekten zordur. Ethereum'un arzu ettiği güvenlik, bütünlük, şeffaflık ve güvenilirlik seviyesini elde etmek için her düğüm, her işlemi çalıştırır ve depolar. Buna ek olarak, hisse ispatı mutabakatı da zaman alır.
- **Ağ sıkışıklığı** – Bir merkeziyetsiz uygulama çok fazla hesaplama kaynağı kullandığında, tüm ağda tıkanıklık yaşanır. Şu anda ağ, saniyede yalnızca yaklaşık 10-15 işlem gerçekleştirebilir; işlemler bundan daha hızlı gönderiliyorsa onaylanmamış işlemler havuzu hızla şişebilir.
- **Kullanıcı deneyimi** – Ortalama bir son kullanıcı blokzincir ile gerçekten güvenli bir şekilde etkileşim kurmak için gerekli olan bir araç yığınını kurmayı çok zor bulabileceğinden, kullanıcı dostu deneyimler tasarlamak daha zor olabilir.
- **Merkezileşme** – Ethereum'un temel katmanı üzerine inşa edilen kullanıcı dostu ve geliştirici dostu çözümler, yine de merkezi hizmetler gibi görünebilir. Örnek olarak, bu tip servisler anahtarlar veya diğer hassas bilgileri sunucu tarafında depolayabilir, merkezi bir sunucu kullanarak bir ön uç sunabilir veya önemli bir iş mantığını blok zincirine yazmadan önce merkezi bir sunucuda çalıştırabilir. Merkezileşme, blok zincirinin geleneksel modele göre avantajlarının çoğunu (tamamını da olabilir) ortadan kaldırır.

## Görerek öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Merkeziyetsiz uygulamalar oluşturmak için araçlar {#dapp-tools}

**Scaffold-ETH _- Akıllı sözleşmenize uyum sağlayan bir ön yüz kullanarak Solidity ile hızla denemeler yapın._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Örnek merkeziyetsiz uygulama](https://punkwallet.io/)

**Create Eth App _- Tek bir komutla Ethereum destekli uygulamalar oluşturun._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Bir [ABI](/glossary/#abi)'den merkeziyetsiz uygulama ön yüzleri oluşturmak için ücretsiz ve açık kaynaklı yazılım aracı._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Ethereum geliştiricilerinin düğümlerini test etmeleri ve tarayıcıdan RPC çağrıları oluşturup hata ayıklaması yapmaları için bir FOSS aracı._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Web3 geliştirmesi için her dilde SDK'ler, akıllı sözleşmeler, araçlar ve altyapı._**

- [Ana sayfa](https://thirdweb.com/)
- [Dokümantasyon](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Akıllı sözleşmeleri dağıtmak, kredi kartı ve zincirler arası ödemeleri etkinleştirmek ve NFT'leri oluşturmak, dağıtmak, satmak, depolamak ve düzenlemek için API'leri kullanmak üzere kurumsal düzeyde bir web3 geliştirme platformu._**

- [crossmint.com](https://www.crossmint.com)
- [Dokümantasyon](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Daha fazla kaynak {#further-reading}

- [Merkeziyetsiz uygulamaları keşfedin](/apps)
- [Bir Web 3.0 uygulamasının mimarisi](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Merkeziyetsiz uygulamalar için 2021 rehberi](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Merkeziyetsiz Uygulamalar Nedir?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Popüler merkeziyetsiz uygulamalar](https://www.alchemy.com/dapps) - _Alchemy_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili Konular {#related-topics}

- [Ethereum yığınına giriş](/developers/docs/ethereum-stack/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
