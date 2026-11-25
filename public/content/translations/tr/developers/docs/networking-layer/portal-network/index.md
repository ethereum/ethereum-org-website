---
title: "Portal Ağı"
description: "İstemciler tümünü depolamayı bıraktıkça Ethereum'un geçmişini erişilebilir tutan eşler arası bir ağ olan Portal Ağı'na genel bakış."
lang: tr
---

[Ethereum](/), Ethereum istemci yazılımını çalıştıran bilgisayarlardan oluşan bir ağdır. Bu bilgisayarların her birine 'düğüm' adı verilir. İstemci yazılımı, bir düğümün Ethereum ağında veri gönderip almasına olanak tanır ve verileri Ethereum protokol kurallarına göre doğrular. Düğümler, disk depolama alanlarında çok fazla geçmiş veri tutar ve ağdaki diğer düğümlerden blok olarak bilinen yeni bilgi paketleri aldıklarında bunlara ekleme yaparlar. Bu, bir düğümün ağın geri kalanıyla tutarlı bilgilere sahip olup olmadığını her zaman kontrol etmek için gereklidir. Bu, bir düğüm çalıştırmanın çok fazla disk alanı gerektirebileceği anlamına gelir. Bazı düğüm işlemleri çok fazla RAM de gerektirebilir.

Yürütme istemcileri artık bu verilerin tamamını tutmak zorunda değildir. Temmuz 2025'ten bu yana, [Birleşme](/roadmap/merge/)'den önceki blokların gövdelerini ve makbuzlarını atabilirler ve Ethereum yol haritası, zamanla zincir geçmişinin daha fazlasını atmayı içerir. Bu geçmişin, blok gezginleri, indeksleyiciler veya eski bir işlemi arayan bir cüzdan gibi ona ihtiyaç duyan herkes için hala erişilebilir kalması gerekir.

Portal Ağı, bu geçmişi birçok düğüm arasında küçük parçalar halinde paylaşarak erişilebilir tutar. Hiçbir düğümün tamamını depolaması gerekmez ve bir düğüm herhangi bir parçayı alıp, onu gönderen düğüme güvenmeden halihazırda elinde tuttuğu verilere karşı kontrol edebilir.

[Düğümler ve istemciler](/developers/docs/nodes-and-clients/) hakkında daha fazlası

## Neden Portal Ağı'na ihtiyacımız var? {#why-do-we-need-portal-network}

Ethereum düğümleri, Ethereum blokzincirinin kendi tam veya kısmi kopyasını depolar. Bu yerel kopya, işlemleri doğrulamak ve düğümün doğru zinciri takip ettiğinden emin olmak için kullanılır. Yerel olarak depolanan bu veriler, düğümlerin gelen verilerin geçerli ve doğru olduğunu başka hiçbir varlığa güvenmeye gerek kalmadan bağımsız olarak doğrulamasına olanak tanır.

Blokzincirin bu yerel kopyası ve ilişkili durum ile makbuz verileri, düğümün sabit diskinde çok fazla yer kaplar. Örneğin, bir fikir birliği istemcisiyle eşleştirilmiş [Geth](https://geth.ethereum.org) kullanarak bir düğüm çalıştırmak için 4 TB'lık bir SSD önerilir. Tam zincir geçmişiyle Geth, 1,8 TB'tan fazla disk alanı kaplar (Eylül 2026 itibarıyla) ve bu, zincirle birlikte büyümeye devam eder.

Bu, düğümleri çalıştırmanın pahalı olabileceği anlamına gelir, çünkü Ethereum'a büyük miktarda disk alanı ayrılması gerekir. [Geçmiş sonlanması](/roadmap/statelessness/#history-expiry), istemcilerin zinciri takip etmek için ihtiyaç duymadıkları eski blok verilerini silmelerine izin vererek bunu azaltır: Temmuz 2025'teki [kısmi geçmiş sonlanması](https://blog.ethereum.org/2025/07/08/partial-history-exp)ndan bu yana, yürütme istemcileri Birleşme'den önceki her bloğun gövdelerini ve makbuzlarını atabilir. [Durum zaman aşımı](/roadmap/statelessness/#state-expiry) ve [durumsuzluk](/roadmap/statelessness/), hala araştırılmakta olan diğer çözümlerdir.

Düğümler eski geçmişi depolamayı bıraktıklarında, artık onu başkalarına sunamazlar. Arşivler, torrentler ve sağlayıcılar bunun kopyalarını tutar; Portal Ağı bunu birçok düğüme yayar, böylece hiçbirine bağlı kalmadan erişilebilir kalır.

## Portal Ağı nasıl çalışır? {#how-does-portal-network-work}

Ethereum düğümlerinin birbirleriyle nasıl iletişim kurduklarını tanımlayan katı protokolleri vardır. Yürütme istemcileri [devp2p](/developers/docs/networking-layer/#devp2p) olarak bilinen bir dizi alt protokol kullanarak iletişim kurarken, fikir birliği istemcileri [libp2p](/developers/docs/networking-layer/#libp2p) adı verilen farklı bir alt protokol yığını kullanır. devp2p, bir düğümün eşlerinden blok gövdeleri ve makbuzları talep etmesine izin verir, ancak eski geçmişi atmış olan bir eş bunu sunamaz. Uygulamalar ve cüzdanlar ayrıca [JSON-RPC uygulama programlama arayüzü (API)](/developers/docs/apis/json-rpc/) aracılığıyla bir düğümden veri alabilir, ancak bu, verileri depolayan bir düğüme veya sağlayıcıya ve onun dürüst olduğuna güvenmeye dayanır.

Portal Ağı, geçmişi paylaşmak için oluşturulmuş ayrı bir eşler arası ağdır. Fikir birliği istemcilerinin de eş bulmak için kullandığı düğüm keşif protokolü olan [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md) üzerinde çalışır ve düğümlerini BitTorrent'inkine benzer bir [dağıtılmış hash tablosu (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table) olarak düzenler. Her düğümün bir düğüm kimliği vardır ve bir bloğun makbuzları gibi her içerik parçasının, blok numarasından türetilen aynı kimlik alanında bir içerik kimliği vardır. Her düğüm, yarıçap adı verilen ve kendi seçtiği bir mesafeye kadar, kimlikleri kendi kimliğine en yakın olan içeriği depolar. Bir içerik parçasını getirmek için bir düğüm, bildiği ve içerik kimliğine en yakın olan eşlere sorar. Buna sahip olmayan eşler, istek onu depolayan bir düğüme ulaşana kadar daha da yakın olan düğümlerle yanıt verir.

<PortalHistoryDiagram />

Bir düğümün aldığı verilere asla güvenmesi gerekmez. Her blok başlığını tutar ve her başlık, `transactionsRoot` ve `receiptsRoot` gibi kökler aracılığıyla bloğunun işlemlerini ve makbuzlarını taahhüt eder. Düğüm, bir blok gövdesini veya bir bloğun makbuzlarını kullanmadan önce bu köklere karşı kontrol eder.

### Portal Ağları {#the-portal-networks}

Portal Ağı ilk olarak, hafif istemcilerin tam bir düğüme güvenmeden zinciri takip etmesine izin verecek birkaç alt ağ olarak tasarlandı: bir İşaret zinciri hafif istemci ağı, bir durum ağı, bir işlem dedikodu ağı ve bir geçmiş ağı. 2025'te, biri hariç tümünün spesifikasyonları eski (legacy) statüsüne taşındı ve geliştirme artık her blok başlığını tutan ancak geçmişin geri kalanını atmış olan yürütme istemcileri için geçmiş blokların gövdelerini ve makbuzlarını depolayan **Geçmiş ağına** odaklanıyor.

## Portal Ağı istemcileri {#client-diversity-as-default}

Birkaç ekip Portal Ağı istemcileri oluşturdu:

- [Nimbus Portal istemcisi](https://fluffy.guide) (eski adıyla Fluffy): Nim dilinde yazılmıştır ve hala aktif olarak geliştirilmektedir
- [Trin](https://github.com/ethereum/trin): Rust dilinde yazılmıştır, artık bakımı yapılmamaktadır
- [Ultralight](https://github.com/ethereumjs/ultralight): TypeScript dilinde yazılmıştır, 2025'in ortalarından bu yana güncellenmemiştir
- [Shisui](https://github.com/zen-eth/shisui): Go dilinde yazılmıştır, 2025'in ortalarından bu yana güncellenmemiştir

## Daha fazla okuma {#further-reading}

- [Portal Ağı spesifikasyonları](https://github.com/ethereum/portal-network-specs)
- [Geçmiş sonlanması için Portal Ağı protokolünü kullanma](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Kısmi geçmiş sonlanması](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Ağı (Devcon Bogota'da Piper Merriam)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Portal Ağı Discord'u](https://discord.gg/CFFnmE7Hbs)
- [Portal Ağı web sitesi](https://www.ethportal.net/)
