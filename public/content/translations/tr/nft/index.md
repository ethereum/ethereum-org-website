---
title: Nitelikli Fikrî Tapu (NFT)
description: Ethereum'daki NFT'lere genel bakış
lang: tr
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Hologram ile gösterilen bir Eth logosu.
summaryPoint1: Benzersiz bir şeyi Ethereum tabanlı bir varlık olarak göstermenin yolu.
summaryPoint2: NFT'ler içerik oluşturuculara her zamankinden daha fazla güç veriyor.
summaryPoint3: Ethereum blokzincirindeki akıllı sözleşmelerle desteklenmektedir.
---

## NFT'ler nelerdir? {#what-are-nfts}

NFT'ler tekil olarak eşsiz jeton'lardır. Her NFT farklı özelliklere (değiştirilemez) sahiptir ve kanıtlanabilir şekilde nadirdir. Bu, ERC-20'ler gibi ("değiştirilebilir") her token'ın set içinde eşit ve aynı özelliklere sahip olduğu token'lardan farklıdır. Cüzdanınızda hangi spesifik dolar banknotu olduğunu önemsemezsiniz çünkü hepsi aynıdır ve aynı değere sahiptir. Ancak, hangi spesifik NFT'ye sahip olduğunuzu _önemsersiniz_ çünkü hepsinin diğerlerinden ayıran kendine has özellikleri ("değiştirilemez") vardır.

Her NFT'nin eşsizliği, sanat, koleksiyon ürünleri hatta gayrimenkul gibi şeylerin tokenleştirilmesini sağlar; burada belirli bir eşsiz NFT, belli bir eşsiz gerçek veya dijital öğeyi temsil eder. Bir varlığın sahipliği, Ethereum blokzincir'i tarafından güvence altına alınır: böylece hiç kimse sahiplik kaydını değiştiremez ya da kopyala/yapıştır yaparak yeni bir NFT'yi varlık olarak üretemez.

<YouTube id="Xdkkux6OxfM" />

## Varlıkların interneti {#internet-of-assets}

NFT'ler ve Ethereum, günümüz internetinde mevcut olan bazı problemleri çözmektedir. Her şey daha da dijitalleşirken nadirlik, benzersizlik ve sahiplik kanıtı gibi fiziksel öğelerin özelliklerini kopyalamaya ihtiyaç duyulmaktadır. merkezi bir organizasyon tarafından kontrol edilmeyen şekilde. Örneğin, NFT'ler sayesinde belirli bir şirketin müzik uygulamasına bağlı olmaksızın herhangi bir müzik mp3'üne sahip olabilir ya da satabileceğiniz veya takas edebileceğiniz bir sosyal medya kullanıcı adına sahip olabilirsiniz. Üstelik kullanıcı adınız, platform sağlayıcısı tarafından keyfi olarak sizden alınamaz.

Günümüzde çoğumuzun kullandığı internete kıyasla NFT'lerin interneti şu şekilde görünüyor...

### Karşılaştırma {#nft-comparison}

| NFT interneti                                                                                                                                                             | Günümüz interneti                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Varlıkların yalnızca sizindir! Bunları yalnızca sizin satma ya da takas etme yetkiniz vardır.                                                                             | Bir platformdan bir varlık kiralarsınız.                                                                                                                                         |
| NFT'ler dijital olarak benzersizdir, herhangi iki NFT aynı değildir.                                                                                                      | Bir varlığın kopyası genellikle orjinalinden ayırt edilemez.                                                                                                                     |
| Bir NFT'nin sahipliği, bir kimsenin doğrulayabileceği şekilde blok zincir üzerinde saklanır.                                                                              | Dijital öğelerin sahiplik kayıtları, kurumlar tarafından kontrol edilen sunucularda saklanır, bu nedenle bunlara güvenmek zorundasınız.                                          |
| NFT'ler Ethereum üzerindeki Akıllı sözleşmelerdir. Bu, onların Ethereum üzerindeki diğer akıllı sözleşmeler ve uygulamalarda kolaylıkla kullanılabileceği anlamına gelir! | Dijital öğelere sahip şirketler genellikle kendi "kapalı ekosistem" altyapılarına ihtiyaç duyar.                                                                                 |
| İçerik oluşturucular, eserlerini istedikleri her yerde satabilir ve küresel bir pazara erişebilirler.                                                                     | İçerik oluşturucular, kullandıkları platformların altyapısına ve dağıtımına bağlı kalmak zorundadır. Platformlar genellikle kullanım koşulları ve coğrafi kısıtlamalara tabidir. |
| NFT yaratıcıları kendi çalışmaları üzerinde sahiplik haklarını koruyabilir ve telif ücretlerini doğrudan NFT sözleşmesine gömebilirler.                                   | Müzik yayını hizmetleri gibi platformlar, satışlardan elde edilen kârın büyük kısmını ellerinde bulundurur.                                                                      |

## NFT'ler nasıl çalışır? {#how-nfts-work}

Ethereum'da yayınlanan diğer token'lar gibi, NFT'ler de bir akıllı sözleşme tarafından verilir. Akıllı sözleşme, sözleşmenin hangi fonksiyonlara sahip olacağını tanımlayan birkaç NFT standardından birine (genellikle ERC-721 veya ERC-1155) uygundur. Sözleşme, NFT'leri oluşturabilir ("basabilir") ve bunları belirli bir sahibe atayabilir. Sahiplik, belirli NFT'leri belirli adreslere sözleşmeyle eşleyerek tanımlanır. NFT'nin bir kimliği ve genellikle bu kimlikle ilişkili spesifik token'ı benzersiz kılan meta verisi vardır.

Birisi bir NFT yaratır veya basarsa, aslında akıllı sözleşmede, belirli NFT'yi kendi adreslerine atayan bir fonksiyonu yürütüyordur. Bu bilgi, sözleşmenin depolama alanında saklanır, ki bu da blok zincirin bir parçasıdır. Sözleşme oluşturucu, sözleşmeye ek kurallar ekleyebilir; örneğin toplam arzı sınırlamak ya da bir token'ın her aktarılışında oluşturucusuna ödenecek olan telif hakkını tanımlamak gibi.

## NFT'ler ne için kullanılır? {#nft-use-cases}

NFT'ler, şunlar dahil olmak üzere pek çok şey için kullanılabilir:

- bir etkinliğe katıldığınızı kanıtlama
- bir kursu tamamladığınızı onaylama
- oyunlar için sahiplenebilir öğeler
- dijital sanat
- gerçek dünya varlıklarını tokenlaştırma
- çevrimiçi kimliğinizi kanıtlama
- içeriğe has, özelleştirilmiş erişim
- biletlendirme
- merkeziyetsiz internet alan adları
- DeFi'de teminat

Belki de eserlerinizi NFT'leri kullanarak paylaşmak isteyen, eserlerinizin kontrolünü kaybetmeden ve kazançlarınızı aracılara feda etmeden çalışmak isteyen bir sanatçısınızdır. NFT'lerin sayısını, özelliklerini ve belirli bir sanat eserine olan bağlantısını belirleyebildiğiniz yeni bir sözleşme oluşturabilirsiniz. Sanatçı olarak, bir NFT aktarılırken almanız gereken telif hakkı bedelini akıllı sözleşmeyle programlayabilirsiniz (yani NFT her aktarıldığında %5'inin sözleşme sahibine transferi gibi). Ayrıca, sözleşmeyi dağıtan cüzdan size ait olduğu için NFT'lerin oluşturucusu olduğunuzu her zaman kanıtlayabilirsiniz. Alıcılarınız, cüzdan adreslerinin akıllı sözleşmenizdeki bir token ile ilişkilendirildiği için koleksiyonunuzdan özgün bir NFT'ye sahip olduklarını kolayca kanıtlayabilirler. Alıcılar, özgünlüğünden ve kontrolünden emin olarak bunu Ethereum ekosistemi içerisinde kullanabilirler.

Yahut bir spor etkinliğine ait bileti düşünün. Bir etkinlik organizatörü kaç bilet satılacağına karar verdiği gibi, bir NFT'nin oluşturucusu da kaç kopya olacağına karar verebilir. Bazen bunlar, 5000 Genel Giriş bileti gibi birebir kopyalardır. Bazen birbirine çok benzer ama her biri biraz farklı olan kopyalar basılır, örneğin sıralı ve sınırlı atanmış koltuk numarası olan bir bilet gibi. Bu biletler, bilet işletmecilerine ödeme yapmadan eşten eşe alınıp satılabilir ve alıcı, sözleşme adresini kontrol ederek biletin özgünlüğünden her zaman emin olabilir.

Ethereum.org'da NFT'ler, GitHub deposuna katkıda bulunan kişileri veya çağrılara katılanları göstermek için kullanılır ve hatta kendi NFT etki alanı adımıza da sahip oluruz. Ethereum.org'a katkıda bulunursanız, bir POAP NFT'si talep edebilirsiniz. Bazı kripto buluşmaları için POAP'lar bilet olarak kullanıldı. [Katkıda bulunma hakkında daha fazla bilgi](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Bu web sitesinin NFT'lerle desteklenen alternatif bir alan adı da bulunmaktadır: **ethereum.eth**. `.org` adresimiz bir alan adı sistemi (DNS) sağlayıcısı tarafından merkezi olarak yönetilirken, ethereum`.eth`, Ethereum İsim Hizmeti (ENS) aracılığıyla Ethereum'a kaydedilir. Ayrıca sahibi ve yönetimi de bize aittir. [ENS kayıtlarımıza göz atın](https://app.ens.domains/name/ethereum.eth)

[ENS hakkında daha fazlası](https://app.ens.domains)

<Divider />

### NFT güvenliği {#nft-security}

Ethereum'un güvenliği, hisse ispatından gelir. Sistem, kötü niyetli eylemleri ekonomik olarak caydırmak ve Ethereum'u müdaheleye karşı dirençli hale getirmek için tasarlanmıştır. Bu NFT'leri mümkün kılan şeydir. NFT işleminizi içeren blok kesinleştiğinde, bir saldırganın bunu değiştirmesi milyonlarca ETH'ye mal olacaktır. Ethereum yazılımını çalıştıran herkes, bir NFT ile dürüst olmayan kurcalamayı hemen tespit edebilecek ve kötü aktör ekonomik olarak cezalandırılacak ve ağdan atılacaktır.

NFT'lerle ilgili güvenlik sorunları çoğunlukla kimlik avı dolandırıcılığı, akıllı sözleşme güvenlik açıkları veya kullanıcı hataları (istenmeden özel anahtarların açığa çıkarılması gibi) ile ilgilidir ve bu da iyi cüzdan güvenliğini NFT sahipleri için kritik hale getirir.

<ButtonLink to="/security/">
  Güvenlik hakkında daha fazla bilgi
</ButtonLink>

## Daha fazla bilgi {#further-reading}

- [NFT'lere yeni başlayanlar için kılavuz](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Ocak 2020_
- [EtherscanNFT izleyici](https://etherscan.io/nft-top-contracts)
- [ERC-721 token standardı](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155 token standardı](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
