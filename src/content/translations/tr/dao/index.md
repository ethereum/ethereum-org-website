---
title: Merkeziyetsiz otonom organizasyonlar (DAO'lar)
description: Ethereum'daki DAO'lara genel bakış
lang: tr
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: ../../../../assets/use-cases/dao-2.png
alt: Bir teklif üzerinde oy kullanan bir DAO'nun temsili.
summaryPoint1: Merkezi liderliği olmayan üyelere ait topluluklar.
summaryPoint2: İnternette tanımadığnız kişilerle iş birliği yapmanın güvenli bir yolu.
summaryPoint3: Belirli bir amaca para yatırmak için güvenli bir yer.
---

## DAO'lar Nedir? {#what-are-daos}

DAO'lar, dünya çapında benzer düşünen insanlarla çalışmanın etkili ve güvenli bir yoludur.

Bunları, üyeleri tarafından toplu olarak sahip olunan ve yönetilen, internet tabanlı bir işletme gibi düşünün. Grubun onayı olmadan kimsenin erişme otoritesine sahip olmadığı yerleşik hazinelere sahiplerdir. Kararlar, kuruluştaki herkesin söz sahibi olmasını sağlamak için teklifler ve oylama ile yönetilir.

Kaprislerine göre harcamaları yetkilendirebilecek bir CEO veya evrakları manipüle edebilecek bir CFO yoktur. Her şey ortadadır ve harcamayla ilgili kurallar DAO'nun içinde kod aracılığıyla yerleştirilmiştir.

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

- Hayır kurumu: Dünya üzerindeki herhangi birinden üyelik ve bağışlar kabul edebilirsiniz ve grup, bağışları nasıl harcamak istediğine karar verebilir.
- Freelancer ağı: Fonlarını ofis alanları ve yazılım abonelikleri için havuzlayan bir yüklenici ağı oluşturabilirsiniz.
- Girişimler ve hibeler: Yatırım sermayesini bir araya toplayan ve desteklenecek girişimlere oy veren bir girişim fonu oluşturabilirsiniz. Geri ödenen para daha sonrasında DAO üyeleri arasında yeniden dağıtılabilir.

## DAO üyeliği {#dao-membership}

DAO üyeliği için farklı modeller bulunmaktadır. Üyelik, oylamanın nasıl işleyeceğini ve DAO'nun diğer önemli kısımlarını belirleyebilir.

### Token tabanlı üyelik {#token-based-membership}

Kullanılan token'a bağlı olarak genelde tamamen yetkisizdir. Çoğunlukla bu yönetişim token'ları yetkisiz bir şekilde merkeziyetsiz bir borsada takas edilebilir. Diğerleri ise likidite sağlayarak veya başka bir "iş ispatı" ile kazanılabilir. İki şekilde de sadece token'a sahip olmak oy hakkı sağlar.

_Tipik olarak geniş merkeziyetsiz protokolleri ve/veya token'ları yönetmek için kullanılır._

#### Ünlü bir örnek {#token-example}

[MakerDAO](https://makerdao.com) – MakerDAO'nun token'ı MKR, merkeziyetsiz borsalarda geniş çapta mevcuttur. Yani satın alan herhangi bir kişi Maker protokolünün geleceğinde oy gücüne sahip olur.

### Hisse tabanlı üyelik {#share-based-membership}

Hisse tabanlı DAO'lar daha çok yetki içerir ama yine de oldukça açıktırlar. Herhangi bir muhtemel üye, genelde iş veya token şeklinde bir değer teklif ederek DAO'ya katılmak için bir teklif sunabilir. Hisseler, direkt oy gücü ve sahipliği temsil eder. Üyeler herhangi bir zamanda hazinedeki kendi hisselerinin oranıyla çıkabilirler.

_Tipik olarak hayır kurumları, işçi kolektifleri ve girişim kulüpleri gibi birbirine bağlı, insan merkezli organizasyonlarda kullanılır. Token'ları ve protokolleri de yönetebilir._

#### Ünlü bir örnek {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO, Ethereum projelerini finanse etmeye odaklıdır. Üyelik için bir teklif gerektirirler, bu sayede grup potansiyel imtiyaz sahipleri hakkında bilinçli kararlar vermek için yeterli deneyim ve sermayeye sahip olup olmadığınızı değerlendirir. Serbest piyasada bir DAO'ya erişim satın alamazsınız.

### İtibara dayalı üyelik {#reputation-based-membership}

İtibar, katılımın kanıtını temsil eder ve DAO'da oy kullanma yetkisi verir. Token veya paylaşıma dayalı üyeliğin aksine, itibara dayalı DAO'lar mülkiyeti, katkıda bulunanlara devretmez. İtibar satın alınamaz, devredilemez veya başkası tarafından temsil edilemez; DAO üyeleri katılım yoluyla itibar kazanmalıdır. Zincir üzerinde oylama izinsizdir ve potansiyel üyeler, DAO'ya katılmak için serbestçe teklif gönderebilir ve katkıları karşılığında ödül olarak itibar ve token almayı talep edebilir.

_Protokollerin ve merkeziyetsiz uygulamaların merkeziyetsiz gelişimi ve yönetişimi için kullanılır, ancak aynı zamanda hayır kurumları, işçi kolektifleri, yatırım kulüpleri vb. gibi çeşitli kuruluşlar için de çok uygundur._

#### Meşhur bir örnek {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao, 2019'dan beri merkeziyetsiz protokolleri yöneten ve uygulamalar oluşturan küresel bağımsız bir kolektiftir. Fonları koordine etmek ve yönetmek için itibara dayalı yönetişim ve holografik konsensüsten yararlanır, bu da hiç kimsenin geleceğini etkileme yolunu satın alamayacağı anlamına gelir.

## DAO'lar nasıl çalışır? {#how-daos-work}

Bir DAO'nun belkemiği onun akıllı sözleşmesidir. Sözleşme, organizasyonun kurallarını belirler ve grubun hazinesini tutar. Sözleşmenin Ethereum'da yayınlandığı andan itibaren kimse oylama olmadan kuralları değiştiremez. Birisi koddaki kurallara veya mantığa uymayan bir şey yapmaya çalışırsa, başarılı olamaz. Ve hazinenin de akıllı sözleşme tarafından belirlenmesi, kimsenin grubun onayı olmadan parayı harcayamayacağı anlamına gelir. Bu, DAO'ların merkezi bir otoriteye ihtiyacı olmadığı anlamına gelir. Bunun yerine, grup kararları toplu olarak alır ve oylar geçtiğinde ödemeler otomatik olarak yetkilendirilir.

Bu, akıllı sözleşmelerin Ethereum'da yayınlandıktan sonra kurcalanamaz olmaları sayesinde mümkündür. İnsanlar fark etmeden kodu (yani DAO'ların kurallarını) değiştiremezsiniz çünkü her şey halka açıktır.

<DocLink to="/smart-contracts/">
  Akıllı kontratlar hakkında daha fazla bilgi
</DocLink>

## Ethereum ve DAO'lar {#ethereum-and-daos}

Ethereum, birkaç nedenden dolayı DAO'lar için mükemmel bir temeldir:

- Ethereum'un mutabakatı organizasyonların ağa güvenmesini sağlayacak kadar dağıtılmış ve yerleşmiştir.
- Akıllı sözleşme kodu, yayınlandıktan sonra sahipleri tarafından bile düzenlenemez. Bu, DAO'nun yazıldığı kurallar çerçevesinde çalışmasını sağlar.
- Akıllı sözleşmeler fon gönderebilir/alabilir. Bu olmasaydı grup fonlarını yönetmek için güvenilir bir aracıya ihtiyacınız olurdu.
- Ethereum topluluğu, en iyi yöntemlerin ve destek sistemlerinin hızlıca ortaya çıkmasına izin vererek rekabetçi değil; iş birlikçi olduğunu kanıtlamıştır.

## Bir DAO başlatma veya DAO'ya katılma {#join-start-a-dao}

### Bir DAO'ya katıl {#join-a-dao}

- [Ethereum topluluk DAO'ları](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus'un DAO listesi](https://app.daohaus.club/explore)

### Bir DAO başlat {#start-a-dao}

- [DAOHaus ile bir DAO çağırma](https://app.daohaus.club/summon)
- [Aragon tarafından güçlendirilmiş bir DAO oluşturma](https://aragon.org/product)
- [Bir koloni başlatma](https://colony.io/)
- [DAOstack'in holografik konsensüsüyle bir DAO oluşturun](https://alchemy.daostack.io/daos/create)

## Daha fazla bilgi {#further-reading}

### DAO Makaleleri {#dao-articles}

- [Bir DAO nedir?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [DAO'ların Evi](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Bir DAO nedir ve amacı nedir?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [DAO Destekli bir Dijital Topluluk Nasıl Başlatılır](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Bir DAO nedir?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Holografik Uzlaşma Nedir?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)

### Videolar {#videos}

- [Kripto dünyasında DAO nedir?](https://youtu.be/KHm0uUPqmVE)
