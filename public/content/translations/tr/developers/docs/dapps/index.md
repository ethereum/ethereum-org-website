---
title: Dapp'lere giriş
description:
lang: tr
---

Bir merkeziyetsiz uygulama (dapp), bir [akıllı sözleşme](/developers/docs/smart-contracts/) ile bir ön uç kullanıcı arayüzünü birleştiren merkeziyetsiz bir ağ üzerine kurulmuş bir uygulamadır. Ethereum'da akıllı sözleşmeler açık API'ler gibi erişilebilir ve şeffaftır: Bu yüzden merkeziyetsiz uygulamanız, başka birinin yazdığı bir akıllı sözleşmeyi bile içerebilir.

## Ön koşullar {#prerequisites}

Dapp'ler hakkında bilgi edinmeden önce, [blok zinciri temellerini](/developers/docs/intro-to-ethereum/) gözden geçirmeli ve Ethereum ağı ve ağın nasıl merkeziyetsizleştirildiği hakkında bilgi edinmelisiniz.

## Dapp'in tanımı {#definition-of-a-dapp}

Bir dapp'in arka uç kodu, merkeziyetsiz bir eşler arası ağ üzerinde çalışır. Bunu, arka uç kodunun merkezi sunucularda çalıştığı bir uygulamanın tersi olarak düşünebilirsiniz.

Bir dapp, arka ucuna çağrı yapabilen herhangi bir dilde yazılmış (tıpkı bir uygulama gibi) ön uç koduna ve kullanıcı arayüzlerine sahip olabilir. Ayrıca, ön ucu [IPFS](https://ipfs.io/) gibi merkeziyetsiz saklama alanlarında barındırılabilir.

- **Merkeziyetsiz** - hiçbir kişi veya grubun kontrole sahip olmadığı; açık, ortak ve merkeziyetsiz bir platform olan Ethereum üzerinde çalışırlar
- **Deterministik** - dapp'ler, yürütüldükleri ortamdan bağımsız olarak aynı fonksiyonu yerine getirirler
- **Turing-tam** - gereken kaynaklar sağlandığında herhangi bir eylemi gerçekleştirebilirler
- **İzole** - Ethereum Sanal Makinesi olarak bilinen sanal bir ortamda yürütülürler, böylece akıllı sözleşmede bir hata olursa, blok zinciri ağının normal işleyişi engellemez

### Akıllı sözleşmeler hakkında {#on-smart-contracts}

Dapp'leri kullanıma sokmak için, en iyi şekilde bir dapp'in arka ucu olarak tanımlayabileceğimiz akıllı sözleşmeleri kullanıma sokmamız gerekir. Ayrıntılı bir genel bakış için [akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkındaki bölümümüzü ziyaret edin.

Akıllı sözleşme, Ethereum blok zincirinde yaşayan ve tam olarak programlandığı gibi çalışan bir koddur. Akıllı sözleşmeler ağa dağıtıldıktan sonra bunları değiştiremezsiniz. Dapp'ler, bir kişi veya şirket tarafından değil, sözleşmeye yazılan mantık tarafından kontrol edildikleri için merkeziyetsiz hâle getirilebilir. Bu aynı zamanda, sözleşmelerinizi çok dikkatli bir şekilde tasarlamanız ve iyice test etmeniz gerektiği anlamına gelir.

## Dapp deliştirmenin faydaları {#benefits-of-dapp-development}

- **Sıfır kesinti** – Akıllı sözleşme dağıtıldıktan ve blok zincirine ulaştıktan sonra ağ bir bütün olarak sözleşme ile etkileşmek isteyen istemcilere her zaman hizmet edebilecektir. Bu nedenle kötü niyetli aktörler, bireysel dapp'lere yönelik hizmet reddi saldırıları başlatamaz.
- **Gizlilik** – Bir dapp dağıtmak veya onunla etkileşime girmek için gerçek hayattaki kimliğinizi sağlamanız gerekmez.
- **Sansüre direnç** – Ağdaki hiçbir varlık, kullanıcıların işlem göndermesini, Dapp'leri dağıtmasını veya blok zincirinden veri okumasını engelleyemez.
- **Tam veri bütünlüğü** – Blok zincirinde depolanan veriler, kriptografik temeller sayesinde değişmez ve tartışılmazdır. Kötü niyetli aktörler, hâlihazırda kamuya açıklanmış olan işlemleri veya diğer verileri taklit edemezler.
- **Güven gerektirmeyen hesaplama/doğrulanabilir davranış** – Akıllı sözleşmeler, analiz edilebilirler ve merkezi bir otoriteye güvenmeye gerek kalmadan öngörülebilir şekillerde yürütülmeleri garanti edilir. Bu geleneksel modeller için geçerli değildir: Örneğin, çevrimiçi bankacılık sistemlerini kullandığımızda, finansal kurumların finansal verilerimizi kötüye kullanmayacağına, kayıtları kurcalamayacağına veya saldırıya uğramayacağına güvenmemiz gerekir.

## Dapp geliştirmenin zorlukları {#drawbacks-of-dapp-development}

- **Bakım** – Blok zincirinde yayınlanan kod ve verilerin değiştirilmesi daha zor olduğu için dapp'lerin bakımı daha zor olabilir. Geliştiricilerin, eski bir sürümde hatalar veya güvenlik riskleri tanımlansa bile dağıtıldıktan sonra dapp'lerinde (veya bir dapp tarafından depolanan temel verilerde) güncellemeler yapmaları zordur.
- **Performans ek yükü** – Büyük bir performans ek yükü mevcuttur ve ölçeklendirme aşırı zordur. Ethereum'un arzu ettiği güvenlik, bütünlük, şeffaflık ve güvenilirlik seviyesini elde etmek için her düğüm, her işlemi çalıştırır ve depolar. Buna ek olarak, hisse ispatı mutabakatı da zaman alır.
- **Ağ tıkanıklığı** – Bir dapp çok fazla bilgisayar kaynağı kullanıyorsa, tüm ağ tıkanır. Şu anda ağ, saniyede yalnızca yaklaşık 10-15 işlem gerçekleştirebilir; işlemler bundan daha hızlı gönderiliyorsa onaylanmamış işlemler havuzu hızla şişebilir.
- **Kullanıcı deneyimi** – Ortalama bir kullanıcı blok zinciriyle gerçekten güvenli bir etkileşime girmek için gerekli bir araç kümesini kurmayı aşırı zor bulabileceği için kullanıcı dostu deneyimler geliştirmek çok daha zor olabilir.
- **Merkezileşme** – Ethereum'un temel katmanı üzerinde inşa edilmiş kullanıcı dostu ve geliştirici dostu çözümler merkezileşmiş servislere benzeyecek şekilde sonuçlanabilir. Örnek olarak, bu tip servisler anahtarlar veya diğer hassas bilgileri sunucu tarafında depolayabilir, merkezi bir sunucu kullanarak bir ön uç sunabilir veya önemli bir iş mantığını blok zincirine yazmadan önce merkezi bir sunucuda çalıştırabilir. Merkezileşme, blok zincirinin geleneksel modele göre avantajlarının çoğunu (tamamını da olabilir) ortadan kaldırır.

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Dapp oluşturmak için araçlar {#dapp-tools}

**Scaffold-ETH _- Akıllı sözleşmenize adapte olan bir ön uç kullanarak Solidity ile hızlıca deney yapın._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Örnek dapp](https://punkwallet.io/)

**Create Eth App _- Tek komutla Ethereum destekli uygulamalar oluşturun._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Bir [ABI](/glossary/#abi) ile dapp ön uçları oluşturmak için kullanılan ücretsiz ve açık kaynaklı bir araç._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Ethereum geliştiricilerinin tarayıcı üzerinden düğümlerini test etmeleri ve RPC çağrılarını bileştirmeleri ve ayıklamaları için ücretsiz ve açık kaynaklı bir araç._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Web3 geliştirme için her dilde SDK'lar, akıllı sözleşmeler, araçlar ve altyapı._**

- [Ana Sayfa](https://thirdweb.com/)
- [Dokümanlar](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Akıllı sözleşmeleri dağıtmak, kredi kartı ödemelerini ve zincirler arası ödemeleri mümkün kılmak ve API'leri kullanarak NFT oluşturmak, dağıtmak, satmak, depolamak ve düzenlemek amaçlı kurumsal bir Web3 geliştirme platformudur._**

- [crossmint.com](https://www.crossmint.com)
- [Dokümanlar](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Daha fazla bilgi {#further-reading}

- [Dapps'i keşfedin](/dapps)
- [Bir Web 3.0 uygulamasının mimarisi](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Merkeziyetsiz uygulamalar hakkında 2021 rehberi](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Merkeziyetsiz Uygulamalar Nedir?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Popüler merkeziyetsiz uygulamalar](https://www.alchemy.com/dapps) - _Alchemy_

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Ethereum yığınına giriş](/developers/docs/ethereum-stack/)
- [Geliştirici çerçeveleri](/developers/docs/frameworks/)
