---
title: Merkeziyetsiz otonom organizasyonlar (DAO'lar)
description: Ethereum'daki DAO'lara genel bakış
lang: tr
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Bir teklif üzerinde oy kullanan bir DAO'nun temsili.
summaryPoint1: Merkezi liderliği olmayan üyelere ait topluluklar.
summaryPoint2: İnternette tanımadığnız kişilerle iş birliği yapmanın güvenli bir yolu.
summaryPoint3: Belirli bir amaca para yatırmak için güvenli bir yer.
---

## DAO'lar Nedir? {#what-are-daos}

DAO, müşterek bir görev için çalışan, müşterek olarak sahip olunan, blokzincir tarafından yönetilen bir organizasyondur.

DAO'lar, fonları veya operasyonları yönetmesi için hayırsever bir lidere güvenmeden dünyanın dört bir yanındaki benzer fikirlere sahip kişilerle çalışmamıza olanak tanır. Burada, fonları canı istediği gibi harcayan bir CEO veya hesapları manipüle edecek bi CFO yok. Bunun yerine, kodda işlenen blok zinciri tabanlı kurallar, kuruluşun nasıl çalıştığını ve fonların nasıl harcandığını tanımlar.

Grubun onayı olmadan kimsenin erişme otoritesine sahip olmadığı yerleşik hazinelere sahiplerdir. Kararlar, kuruluştaki herkesin söz sahibi olmasını sağlamak için teklifler ve oylamalarla yönetilir ve her şey zincir üzerinde şeffaf bir şekilde gerçekleşir.

## Neden DAO'lara ihtiyacımız var? {#why-dao}

Birisiyle finansman ve para içeren bir organizasyon başlatmak, çalıştığınız kişilerle ileri düzeyde güven gerektirir. Ancak yalnızca internette etkileşimde bulunduğunuz birine güvenmek zordur. DAO'larla gruptaki başka kimseye güvenmeniz gerekmez, yalnızca DAO'nun %100 şeffaf ve herkes tarafından doğrulanabilir koduna güvenmeniz gerekir.

Bu küresel iş birliği ve koordinasyon için birçok yeni fırsat sunar.

### Bir karşılaştırma {#dao-comparison}

| DAO                                                                                                                | Geleneksel bir organizasyon                                                                              |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Genelde düz ve tamamen demokratikleştirilmiş.                                                                      | Genelde hiyerarşik.                                                                                      |
| Herhangi bir değişikliğin uygulanması için üyeler tarafından oylama yapılması gerekli.                             | Yapısına bağlı olarak, değişiklikler tekil bir partiden istenebilir veya oylama önerilebilir.            |
| Oylar toplanır ve sonuç güvenilir bir aracı olmadan otomatik şekilde uygulanır.                                    | Eğer oylamaya izin verildiyse, oylar içeride toplanır ve oylamanın sonucu manuel şekilde idare edilir.   |
| Teklif edilen servisler merkezi olmadan ve otomatik bir şekilde idare edilir (örnek olarak hayırseverlik fonları). | İnsan idaresi veya merkezi şekilde kontrol edilen bir otomasyon gerektirir, bu da manipülasyona açıktır. |
| Tüm etkinlikler şeffaftır ve tamamen halka açıktır.                                                                | Etkinlikler genelde gizlidir ve tamamı halka açılmaz.                                                    |

### DAO örnekleri {#dao-examples}

Bunun biraz daha mantıklı olması için, burada bir DAO'yu nasıl kullanabileceğiniz hakkında birkaç örnek mevcut:

- Hayır kurumu - Dünyanın herhangi bir yerinden bağışları kabul edebilir ve bu bağışların neler için kullanılacağını oylamaya sunabilirsiniz.
- Kolektif mülkiyet – fiziksel veya dijital varlıklar satın alabilir ve üyeler bunların nasıl kullanılacağına oy verebilir.
- Girişimler ve hibeler: Yatırım sermayesini bir araya toplayan ve desteklenecek girişimlere oy veren bir girişim fonu oluşturabilirsiniz. Geri ödenen para daha sonrasında DAO üyeleri arasında yeniden dağıtılabilir.

## DAO'lar nasıl çalışır? {#how-daos-work}

Bir DAO'nun bel kemiği, organizasyonun kurallarını tanımlayan ve grubun hazinesini içeren akıllı sözleşmesidir. Sözleşmenin Ethereum'da yayınlandığı andan itibaren kimse oylama olmadan kuralları değiştiremez. Birisi koddaki kurallara veya mantığa uymayan bir şey yapmaya çalışırsa, başarılı olamaz. Ayrıca, hazinenin de akıllı sözleşme tarafından belirlenmesi, kimsenin grubun onayı olmadan parayı harcayamayacağı anlamına gelir. Bu, DAO'ların merkezi bir otoriteye ihtiyacı olmadığı anlamına gelir. Bunun yerine, grup kararları toplu olarak alır ve oylar geçtiğinde ödemeler otomatik olarak yetkilendirilir.

Bu, akıllı sözleşmelerin Ethereum'da yayınlandıktan sonra kurcalanamaz olmaları sayesinde mümkündür. İnsanlar fark etmeden kodu (yani DAO'ların kurallarını) değiştiremezsiniz çünkü her şey halka açıktır.

<DocLink href="/smart-contracts/">
  Akıllı kontratlar hakkında daha fazla bilgi
</DocLink>

## Ethereum ve DAO'lar {#ethereum-and-daos}

Ethereum, birkaç nedenden dolayı DAO'lar için mükemmel bir temeldir:

- Ethereum'un mutabakatı organizasyonların ağa güvenmesini sağlayacak kadar dağıtılmış ve yerleşmiştir.
- Akıllı sözleşme kodu, yayınlandıktan sonra sahipleri tarafından bile düzenlenemez. Bu, DAO'nun yazıldığı kurallar çerçevesinde çalışmasını sağlar.
- Akıllı sözleşmeler fon gönderebilir/alabilir. Bu olmasaydı grup fonlarını yönetmek için güvenilir bir aracıya ihtiyacınız olurdu.
- Ethereum topluluğu, en iyi yöntemlerin ve destek sistemlerinin hızlıca ortaya çıkmasına izin vererek rekabetçi değil; iş birlikçi olduğunu kanıtlamıştır.

## DAO yönetişimi {#dao-governance}

Bir DAO'yu yönetirken karar vermeniz gereken birçok husus vardır Mesela oylamaların ve tekliflerin nasıl çalıştığı gibi.

### Delegasyon {#governance-delegation}

Delegasyon, temsiliyetçi demokrasinin DAO versiyonu gibidir. Token sahipleri, kendi kendilerini aday gösteren ve protokole hizmet etmeyi ve bilgi sahibi olmayı taahhüt eden kullanıcılara oy yetkisi verir.

#### Meşhur bir örnek {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS sahipleri, kendilerini temsil etmeleri için ilgili topluluk üyelerine oylarını devredebilir.

### Otomatik İşlem yönetişimi {#governance-example}

Birçok DAO'da, üyelerin çoğunluğu olumlu oy kullanırsa işlemler otomatik olarak yürütülür.

#### Meşhur bir örnek {#governance-example}

[Nouns](https://nouns.wtf) – Nouns DAO'da, kurucular tarafından veto edilmediği sürece, bir oy yeter sayısı sağlandığında ve çoğunluk olumlu oy kullandığında bir işlem otomatik olarak yürütülür.

### Çoklu imzalı yönetişim {#governance-example}

DAO'ların binlerce oylama üyesi olabilirken, fonlar güvenilir ve genellikle "doxxed" (topluluk tarafından gerçek kimliği bilinen) olan 5-20 aktif topluluk üyesi tarafından paylaşılan bir cüzdanda tutulabilir. Oylamadan sonra, çoklu imza imzalayacılıları, topluluğun isteğini hayata geçirir.

## DAO yasaları {#dao-laws}

1977'de Wyoming, girişimcileri koruyan ve sorumluluklarını sınırlayan LLC'yi (Sınırlı Sorumlu Şirket) icat etti. Daha yakın zamanlarda, DAO'lar için yasal statü oluşturan DAO yasasına öncülük ettiler. Şu anda Wyoming, Vermont ve Virgin Adaları bir şekilde DAO yasalarına sahiptir.

### Meşhur bir örnek {#law-example}

[CityDAO](https://citydao.io) – CityDAO, Wyoming'in DAO yasasını kullanarak Yellowstone Milli Parkı yakınında 40 dönümlük arazi satın aldı.

## DAO üyeliği {#dao-membership}

DAO üyeliği için farklı modeller bulunmaktadır. Üyelik, oylamanın nasıl işleyeceğini ve DAO'nun diğer önemli kısımlarını belirleyebilir.

### Token tabanlı üyelik {#token-based-membership}

Kullanılan token'a bağlı olarak genelde tamamen yetkisizdir. Çoğunlukla bu yönetişim token'ları yetkisiz bir şekilde merkeziyetsiz bir borsada takas edilebilir. Diğerleri ise likidite sağlayarak veya başka bir "iş ispatı" ile kazanılabilir. İki şekilde de sadece token'a sahip olmak oy hakkı sağlar.

_Tipik olarak geniş merkeziyetsiz protokolleri ve/veya token'ları yönetmek için kullanılır._

#### Meşhur bir örnek {#token-example}

[MakerDAO](https://makerdao.com) – MakerDAO'nun belirteci MKR, merkezi olmayan borsalarda geniş çapta mevcuttur ve herkes Maker protokolünün geleceği üzerinde oylama gücüne sahip olmayı satın alabilir.

### Hisse tabanlı üyelik {#share-based-membership}

Hisse tabanlı DAO'lar daha çok yetki içerir ama yine de oldukça açıktırlar. Herhangi bir olası üye, DAO'ya katılmak için bir teklif sunabilir ve genellikle token veya çalışma şeklinde bir miktar değere sahip bir komisyon sunar. Hisseler, direkt oy gücünü ve sahipliğini temsil eder. Üyeler istedikleri zaman hazineden hisselerini ayrılabilirler.

_Tipik olarak hayır kurumları, işçi kolektifleri ve girişim kulüpleri gibi birbirine bağlı, insan merkezli organizasyonlarda kullanılır. Token'ları ve protokolleri de yönetebilir._

#### Meşhur bir örnek {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO, Ethereum projelerini finanse etmeye odaklıdır. Üyelik için bir teklif gerektirirler, bu sayede grup potansiyel imtiyaz sahipleri hakkında bilinçli kararlar vermek için yeterli deneyim ve sermayeye sahip olup olmadığınızı değerlendirebilir. Serbest piyasada bir DAO'ya erişim satın alamazsınız.

### İtibara dayalı üyelik {#reputation-based-membership}

İtibar, katılımın kanıtını temsil eder ve DAO'da oy kullanma yetkisi verir. Token veya hisse tabanlı üyeliğin aksine, itibara dayalı DAO'lar mülkiyeti, katkıda bulunanlara devretmez. İtibar satın alınamaz, devredilemez veya başkası tarafından temsil edilemez; DAO üyeleri katılım yoluyla itibar kazanmalıdır. Zincir üzerinde oylama izinsizdir ve potansiyel üyeler, DAO'ya katılmak için serbestçe teklif gönderebilir ve katkıları karşılığında ödül olarak itibar ve token almayı talep edebilir.

_Protokollerin ve merkeziyetsiz uygulamaların merkeziyetsiz gelişimi ve yönetişimi için kullanılır, ancak aynı zamanda hayır kurumları, işçi kolektifleri, yatırım kulüpleri vb. gibi çeşitli kuruluşlar için de çok uygundur._

#### Meşhur bir örnek {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao, 2019'dan beri merkeziyetsiz protokolleri yöneten ve uygulamalar oluşturan küresel bağımsız bir kolektiftir. Fonları koordine etmek ve yönetmek için itibara dayalı yönetişim ve holografik mutabakattan yararlanır, bu da hiç kimsenin geleceğini etkileme yolunu satın alamayacağı anlamına gelir.

## Bir DAO başlatma veya DAO'ya katılma {#join-start-a-dao}

### Bir DAO'ya katıl {#join-a-dao}

- [Ethereum topluluk DAO'ları](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus'un DAO listesi](https://app.daohaus.club/explore)
- [DAO'ların tally.xyz listesi](https://www.tally.xyz)

### Bir DAO başlatma {#start-a-dao}

- [DAOHaus ile bir DAO çağırma](https://app.daohaus.club/summon)
- [Tally ile bir Governor DAO başlatma](https://www.tally.xyz/add-a-dao)
- [Aragon tarafından desteklenen bir DAO oluşturma](https://aragon.org/product)
- [Bir koloni başlatma](https://colony.io/)
- [DAOstack'in holografik mutabakatıyla bir DAO oluşturun](https://alchemy.daostack.io/daos/create)

## Daha fazla okuma {#further-reading}

### DAO Makaleleri {#dao-articles}

- [Bir DAO nedir?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [DAO El Kitabı](https://daohandbook.xyz)
- [DAO'lar Evi](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Bir DAO nedir ve amacı nedir?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [DAO Destekli bir Dijital Topluluk Nasıl Başlatılır](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Bir DAO nedir?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Holografik Mutabakat Nedir?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO'lar Vitalik'e göre özerk kuruluşlarda ademi merkeziyetçiliğin önemli olduğu şirketler değildir:](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO'lar, DAC'ler, DA'lar ve Daha Fazlası: Tamamlanmamış Terminoloji Rehberi](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Ethereum Blogu](https://blog.ethereum.org)

### Videolar {#videos}

- [Kripto dünyasında DAO nedir?](https://youtu.be/KHm0uUPqmVE)
- [Bir DAO Şehir Kurabilir mi?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)
