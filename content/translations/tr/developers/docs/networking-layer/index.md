---
title: Ağ katmanı
description: Ethereum ağ katmanına giriş.
lang: tr
sidebarDepth: 2
---

Ethereum, standart protokoller kullanarak birbirleriyle iletişim kurabilmesi gereken, binlerce düğüme sahip, eşler arası bir ağdır. "Ağ katmanı", bu düğümlerin birbirini bulmasını ve bilgi alışverişinde bulunmasını sağlayan protokoller yığınıdır. Bu, ağ üzerinden "dedikodu" bilgilerini (birden çoğa iletişim) ve belirli düğümler arasında istekleri ve yanıtları değiş tokuş etmeyi (bire bir iletişim) içerir. Her düğüm, doğru bilgileri gönderip aldıklarından emin olmak için belirli ağ kurallarına uymalıdır.

İstemci yazılımının, her biri kendi ayrı ağ yığınına sahip iki kısmı (yürütüm istemcileri ve fikir birliği istemcileri) vardır. Diğer Ethereum düğümleriyle iletişim kurmanın yanı sıra, yürütme ve konsensus istemcilerinin birbirleriyle iletişim kurması gerekir. Bu sayfa, bu iletişimi sağlayan protokollerin giriş niteliğinde bir açıklamasını verir.

Yürütüm istemcileri, yürütüm katmanı eşler arası ağı üzerinden işlemleri yayarlar. Bu, kimliği doğrulanmış eşler arasında şifrelenmiş iletişimi gerektirir. Blok önermek için bir doğrulayıcı seçildiğinde düğümün yerel işlem havuzundan geçen işlemler, İşaret blokları şeklinde paketlenerek RPC bağlantısı aracılığı ile fikir birliği istemcilerine iletilir. Bunun ardından, fikir birliği istemcileri eşler arası ağlarında İşaret bloklarını yayar. Bu, biri işlemin yayılması için yürütüm istemcilerine, diğeri ise bloğun yayılması için fikir birliği istemcilerine bağlanan iki farklı p2p ağı gerektirir.

## Ön koşullar {#prerequisites}

Ethereum [düğümleri ve istemcileri](/developers/docs/nodes-and-clients/) hakkında biraz bilgi edinmeniz, bu sayfayı anlamanıza yardımcı olacaktır.

## Yürütüm katmanı {#execution-layer}

Yürütme katmanının ağ protokolleri iki yığına bölünmüştür:

- keşif yığını: UDP'nin üzerine inşa edilmiştir ve yeni bir düğümün bağlanacak eşler bulmasını sağlar

- devP2P yığını: TCP'nin üzerinde yer alır ve düğümlerin bilgi alışverişinde bulunmasını sağlar

Her iki yığın paralel çalışır. Keşif yığını, yeni ağ katılımcılarını ağa besler ve DevP2P yığını, onların etkileşimlerini sağlar.

### Keşif {#discovery}

Keşif, ağdaki diğer düğümleri bulma işlemidir. Bu, küçük bir dizi önyükleme düğümü, anında bulunabilmeleri ve istemciyi eşlere bağlayabilmeleri için (adresleri [sabit kodlanmış](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) olan düğümler kullanılarak önyüklenir). Bu önyükleme düğümleri yalnızca bir dizi eşe, yeni bir düğüm tanıtmak için var olur - bu onların tek amacıdır, zinciri senkronize etmek gibi normal istemci görevlerine katılmazlar ve yalnızca bir istemci ilk kez çalıştırıldığında kullanılırlar.

Düğüm-önyükleme düğümü etkileşimleri için kullanılan protokol, [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), düğüm listelerini paylaşmak için [dağıtılmış karma tablosu](https://en.wikipedia.org/wiki/Distributed_hash_table) kullanır. Her düğümün, en yakın eşlerine bağlanmak için gereken bilgileri içeren bu tablonun bir sürümü vardır. Bu 'yakınlık' coğrafi değildir - mesafe, düğüm kimliğinin benzerliği ile tanımlanır. Her düğümün tablosu, bir güvenlik özelliği olarak düzenli olarak yenilenir. Örneğin, [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5)'te, keşif protokolü düğümleri, istemcinin desteklediği alt protokolleri görüntüleyen 'reklamlar' da gönderebilir, bu da eşlerin, her ikisinin de iletişim kurmak için kullanabilecekleri protokoller hakkında pazarlık yapmasına olanak tanır.

Keşif, bir PİNG-PONG oyunuyla başlar. Başarılı bir PING-PONG, yeni düğümü bir önyükleme düğümüne "bağlar". Bir önyükleme düğümünü ağa giren yeni bir düğümün varlığı konusunda uyaran ilk mesaj bir `PING`'dir. Bu `PING`, yeni düğüm, önyükleme düğümü ve bir sona erme zaman damgası hakkında hash edilmiş bilgileri içerir. Başlangıç düğümü `PING`'i alır ve `PING` karmasını içeren bir `PONG` döndürür. `PING` ve `PONG` karma değerleri eşleşirse, yeni düğüm ile önyükleme düğümü arasındaki bağlantı doğrulanır ve "bağlı" oldukları söylenir.

Bağlandıktan sonra, yeni düğüm, önyükleme düğümüne bir `KOMŞUNU BUL` isteği gönderebilir. Önyükleme düğümü tarafından döndürülen veriler, yeni düğümün bağlanabileceği eşlerin bir listesini içerir. Düğümler bağlı değilse, `KOMŞULARI BUL` isteği başarısız olur, bu nedenle yeni düğüm ağa giremez.

Yeni düğüm, önyükleme düğümünden komşuların bir listesini aldığında, her biri ile bir PING-PONG alışverişi başlatır. Başarılı PING-PONG'lar yeni düğümü, komşularına bağlayarak mesaj alışverişini mümkün kılar.

```
istemciyi başlat --> önyükleme düğümüne bağlan --> önyükleme düğümüne bağ --> komşuları bul --> komşularla bağ
```

Yürütüm istemcileri şu anda [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) keşif protokolünü kullanıyor ve [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) protokolüne geçmek için aktif bir çaba söz konusudur.

#### ENR: Ethereum Düğüm Kayıtları {#enr}

[Ethereum Düğüm Kaydı (ENR)](/developers/docs/networking-layer/network-addresses/), üç temel öğeyi içeren bir nesnedir: bir imza (kabul edilmiş kimlik şemasına uygun şekilde yapılmış kayıt içerikleri karması), kayıtta yapılan değişiklikleri takip eden bir sıra numarası ve keyfi anahtar listesi: değer çiftleri. Bu, yeni eşler arasında daha kolay tanımlayıcı bilgi alışverişi sağlayan geleceğe yönelik bir biçimdir ve Ethereum düğümleri için tercih edilen [ağ adresi](/developers/docs/networking-layer/network-addresses) biçimidir.

#### Keşif neden UDP üzerine kuruludur? {#why-udp}

UDP, herhangi bir hata kontrolünü, başarısız paketlerin yeniden gönderilmesini veya dinamik olarak bağlantıların açılıp kapanmasını desteklemez - bunun yerine, başarılı bir şekilde alınıp alınmadığına bakılmaksızın, yalnızca bir hedefe, sürekli bir bilgi akışı gönderir. Bu minimum işlevsellik, aynı zamanda minimum ek yük anlamına gelir ve bu tür bir bağlantıyı çok hızlı hale getirir. Keşif için, bir düğümün bir akran ile resmi bir bağlantı kurmak için sadece varlığını bildirmek istediği durumlarda, UDP yeterlidir. Ancak, ağ yığınının geri kalanı için UDP amaca uygun değildir. Düğümler arasındaki bilgi alışverişi oldukça karmaşıktır ve bu nedenle yeniden gönderme, hata denetimi vb. destekleyebilen daha tam özellikli bir protokole ihtiyaç duyar. TCP ile ilişkili ek yük, ek işlevsellik değerindedir. Bu nedenle, P2P yığınının çoğunluğu TCP üzerinden çalışır.

### DevP2P {#devp2p}

DevP2P'nin kendisi, Ethereum'un eşler arası ağı kurmak ve sürdürmek için uyguladığı bir protokol yığınıdır. Yeni düğümler ağa girdikten sonra, etkileşimleri [DevP2P](https://github.com/ethereum/devp2p) yığınındaki protokoller tarafından yönetilir. Bunların tümü TCP'nin üzerinde yer alır ve RLPx aktarım protokolünü, kablo protokolünü ve birkaç alt protokolü içerir. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md), düğümler arasındaki oturumları başlatmayı, doğrulamayı ve sürdürmeyi yöneten protokoldür. RLPx, düğümler arasında göndermek için verileri minimum bir yapıya kodlamak için alan açısından çok verimli bir yöntem olan RLP'yi (Yinelemeli Uzunluk Öneki) kullanarak mesajları kodlar.

İki düğüm arasındaki bir RLPx oturumu, ilk olarak kriptografik el sıkışma ile başlar. Bu, düğümün daha sonra eş tarafından doğrulanan bir yetkilendirme mesajı göndermesini içerir. Başarılı doğrulamadan sonra, eş, başlatıcı düğüme geri dönmek için bir yetkilendirme alındı mesajı oluşturur. Bu, düğümlerin özel ve güvenli bir şekilde iletişim kurmasını sağlayan bir anahtar değişim sürecidir. Başarılı bir kriptografik el sıkışma, daha sonra her iki düğümü de birbirlerine "kablo üzerinden" bir "merhaba" mesajı göndermeleri için tetikler. Kablo protokolü, başarılı bir merhaba mesaj alışverişi ile başlatılır.

Merhaba mesajları şunları içerir:

- protokol versiyonu
- istemci kimliği
- bağlantı noktası
- düğüm ID'si
- desteklenen alt protokollerin listesi

Bu, başarılı bir etkileşim için gereken bilgidir, çünkü her iki düğüm arasında hangi yeteneklerin paylaşıldığını tanımlar ve iletişimi yapılandırır. Her düğüm tarafından desteklenen alt protokol listelerinin karşılaştırıldığı ve her iki düğüm için ortak olanların oturumda kullanılabileceği bir alt protokol görüşmesi süreci vardır.

Merhaba mesajları ile birlikte, kablo protokolü ayrıca bir eşe bağlantının kapatılacağı konusunda uyarı veren bir "bağlantıyı kes" mesajı da gönderebilir. Kablo protokolü ayrıca, bir oturumu açık tutmak için periyodik olarak gönderilen PING ve PONG mesajlarını da içerir. RLPx ve kablolu protokol değiş tokuşları, bu nedenle, belirli bir alt protokole göre değiş tokuş edilecek faydalı bilgiler için iskele sağlayarak, düğümler arasındaki iletişimin temellerini oluşturur.

### Alt-protokoller {#sub-protocols}

#### Kablo protokolü {#wire-protocol}

Eşler bağlandığında ve bir RLPx oturumu başlatıldığında, kablo protokolü eşlerin nasıl iletişim kurduğunu tanımlar. Kablo protokolü başlangıçta üç ana görevi tanımlıyordu: zincir senkronizasyonu, blok yayılımı ve işlem değişimi. Bununla birlikte, Ethereum hisse ispatına geçiş yaptıktan sonra blok yayılımı ve zincir senkronizasyonu, fikir birliği katmanının bir parçası haline geldi. İşlem borsası, hala yürütüm istemcilerinin faaliyet alanındadır. İşlem takası, blok geliştiricilerin bir sonraki bloğa dahil etmek üzere bazılarını seçebilmeleri için düğümler arasında bekleyen işlemlerin takas edilmesini ifade eder. Bu görevlerle ilgili ayrıntılı bilgilere [buradan](https://github.com/ethereum/devp2p/blob/master/caps/eth.md) ulaşabilirsiniz. Bu alt protokolleri destekleyen istemciler, bunları [JSON-RPC](/developers/docs/apis/json-rpc/) aracılığıyla kullanıma sunar.

#### les (hafif ethereum alt protokolü) {#les}

Bu, hafif istemcileri senkronize etmek için minimum bir protokoldür. Geleneksel olarak bu protokol nadiren kullanılmıştır, çünkü tam düğümlerin hafif istemcilere teşvik olmadan veri sunması gerekir. Yürütme istemcilerinin varsayılan davranışı, hafif istemci verilerini les üzerinden sunmamaktır. Daha fazla bilgi les [spesifikasyonu](https://github.com/ethereum/devp2p/blob/master/caps/les.md)nda mevcuttur.

#### Snap {#snap}

[Snap protokolü](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap), eşlere, son durumların anlık görüntülerini değiş tokuş etmek için, eşlerin ara Merkle trie düğümlerini indirmesine gerek kalmadan hesap ve depolama verilerini doğrulamasına izin veren isteğe bağlı bir uzantıdır.

#### Wit (tanık protokolü) {#wit}

[Tanık protokolü](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit), eşler arasında durum şahitlerinin değiş tokuşunu sağlayan ve istemcileri zincirin ucuna senkronize etmeye yardımcı olan isteğe bağlı bir uzantıdır.

#### Fısıltı {#whisper}

Fısıltı, blok zincirine herhangi bir bilgi yazmadan eşler arasında güvenli mesajlaşma sağlamayı amaçlayan bir protokoldü. DevP2P tel protokolünün bir parçasıydı, ancak artık kullanımdan kaldırıldı. Benzer amaçlara sahip başka [ilgili projeler](https://wakunetwork.com/) de mevcuttur.

## Konsensus katmanı {#consensus-layer}

Konsensus istemcileri, farklı bir özellik ile ayrı bir eşler arası ağda yer alır. Konsensus istemcilerinin, eşlerinden yeni bloklar alabilmeleri ve blok teklif sahibi olma sırası kendilerine geldiğinde bunları yayınlayabilmeleri için blok dedikodularına katılmaları gerekir. Bu, yürütüm katmanına benzer şekilde ilk olarak bir keşif protokolü gerektirir, böylece bir düğüm eşleri bulabilir ve bloklar, tasdikler vb. alışverişi için güvenli oturumlar kurabilir.

### Keşif {#consensus-discovery}

Fikir birliği istemcileri, yürütüm istemcilerine benzer şekilde eş bulmak için UDP üzerinden [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) kullanır. Discv5'in konsensus katmanı uygulaması, yalnızca discv5'i bir [libP2P](https://libp2p.io/) yığınına bağlayan ve DevP2P'yi kullanımdan kaldıran bir adaptör içermesi bakımından yürütme istemcilerinden farklıdır. Yürütüm katmanının RLPx oturumları, libP2P'nin gürültü güvenli kanal anlaşması lehine kullanımdan kaldırılmıştır.

### ENRler {#consensus-enr}

Konsensüs düğümleri için ENR, düğümün genel anahtarını, IP adresini, UDP ve TCP bağlantı noktalarını ve iki konsensusa özgü alanı içerir: onay alt ağı bit alanı ve `eth2` anahtarı. İlki, düğümlerin belirli tasdik dedikodu alt ağlarına katılan eşler bulmasını kolaylaştırır. `eth2` anahtarı, eşlerin doğru Ethereum'a bağlanmasını sağlayarak, düğümün hangi Ethereum çatalı sürümünü kullandığı hakkında bilgi içerir.

### libP2P {#libp2p}

LibP2P yığını, keşiften sonra tüm iletişimleri destekler. İstemciler, ENR'lerinde tanımlandığı şekilde IPv4 ve/veya IPv6'yı arayabilir ve dinleyebilir. LibP2P katmanındaki protokoller, dedikodu ve req/resp alanlarına bölünebilir.

### Gossip {#gossip}

Dedikodu alanı, ağ boyunca hızla yayılması gereken tüm bilgileri içerir. Bu, işaret bloklarını, kanıtları, tasdikleri, çıkışları ve kesmeleri içerir. Bu, libP2P gossipsub v1 kullanılarak iletilir ve alınacak ve iletilecek maksimum dedikodu yükü boyutu da dahil olmak üzere her düğümde yerel olarak depolanan çeşitli meta verilere dayanır. Dedikodu alanı hakkında detaylı bilgiye [buradan](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub) ulaşabilirsiniz.

### Talep-yanıt {#request-response}

İstek-yanıt etki alanı, eşlerinden belirli bilgiler isteyen istemciler için protokoller içerir. Örnekler arasında, belirli kök karmalarıyla eşleşen veya bir dizi yuva içinde belirli İşaret blokları talep etmek yer alır. Yanıtlar her zaman hızlı sıkıştırılmış SSZ kodlu baytlar olarak döndürülür.

## Konsensus istemcisi neden SSZ'yi RLP'ye tercih ediyor? {#ssz-vs-rlp}

SSZ, basit serileştirme anlamına gelir. Tüm yapının kodunu çözmek zorunda kalmadan, kodlanmış bir mesajın tek tek parçalarının kodunu çözmeyi kolaylaştıran sabit ofsetler kullanır; bu, kodlanmış mesajlardan belirli bilgi parçalarını verimli bir şekilde alabildiğinden, konsensus istemcisi için çok yararlıdır. Ayrıca, Merkleizasyon için ilgili verimlilik kazanımları ile Merkle protokolleriyle entegre olmak üzere özel olarak tasarlanmıştır. Konsensus katmanındaki tüm karmalar Merkle kökleri olduğundan, bu önemli bir gelişme sağlar. SSZ ayrıca değerlerin benzersiz temsillerini de garanti eder.

## Yürütme ve konsensüs istemcilerini bağlama {#connecting-clients}

Fikir birliği ve yürütüm istemcileri paralel şekilde çalışır. Fikir birliği istemcisinin yürütüm istemcisine talimatlar sağlayabilmesi ve yürütüm istemcisinin, İşaret bloklarına dahil etmek üzere fikir birliği istemcisine işlem paketlerini iletebilmesi için bunların birbirine bağlanması gerekir. İki istemci arasında iletişim, yerel bir RPC bağlantısı kullanılarak sağlanabilir. ["Engine-API"](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen bir API, iki istemci arasında gönderilen talimatları tanımlar. Her iki istemci de tek bir ağ kimliğinin arkasında bulunduğundan, her istemci için ayrı bir anahtar (eth1 anahtarı ve eth2 anahtarı) içeren bir ENR'yi (Ethereum düğüm kaydı) ortak kullanırlar.

İlgili ağ yığını parantez içinde olacak şekilde, kontrol akışının bir özeti aşağıda gösterilmiştir.

### Fikir birliği istemcisi blok üreticisi olmadığında: {#when-consensus-client-is-not-block-producer}

- Konsensus istemcisi, blok dedikodu protokolü aracılığıyla bir blok alır (konsensus p2p)
- Konsensus istemcisi bloğu önceden doğrular, yani doğru meta verilerle geçerli bir göndericiden gelmesini sağlar
- Bloktaki işlemler yürütüm katmanına yürütüm yükü olarak gönderilir (yerel RPC bağlantısı)
- Yürütüm katmanı, işlemleri yürütür ve blok başlığındaki durumu doğrular (yani, karma eşleşmesini kontrol eder)
- Yürütüm katmanı, doğrulama verilerini konsensus katmanına geri iletir, blok artık doğrulanmış olarak kabul edilir (yerel RPC bağlantısı)
- Konsensus katmanı, kendi blok zincirinin başına blok ekler ve bunu onaylar, onaylamayı ağ üzerinden yayınlar (konsensus p2p)

### Fikir birliği istemcisi blok üreticisi olduğunda: {#when-consensus-client-is-block-producer}

- Konsensus istemcisi, bir sonraki blok üreticisi olduğuna dair bildirim alır (konsensus p2p)
- Konsensus katmanı, yürütüm istemcisinde (yerel RPC) `create block` yöntemini çağırır
- Yürütüm katmanı, işlem dedikodu protokolü tarafından doldurulmuş işlem belleğine erişir (yürütme p2p)
- Yürütüm istemcisi, işlemleri bir bloğa toplar, işlemleri yürütür ve bir blok karması oluşturur
- Fikir birliği istemcisi, işlemleri ve blok karmasını yürütüm istemcisinden alır ve işaret bloğuna (yerel RPC) ekler
- Consensus istemcisi bloğu blok dedikodu protokolü üzerinden yayınlar (consensus p2p)
- Diğer istemciler, önerilen bloğu, blok dedikodu protokolü aracılığıyla alır ve yukarıda açıklandığı gibi doğrular (konsensus p2p)

Blok, yeterli onaylayıcılar tarafından onaylandıktan sonra, zincirin başına eklenir, gerekçelendirilir ve sonunda kesinleştirilir.

![](cons_client_net_layer.png) ![](exe_client_net_layer.png)

[ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)'den fikir birliği ve yürütüm istemcileri için ağ katmanı şeması

## Daha Fazla Okuma {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p) [LibP2p](https://github.com/libp2p/specs) [Konsensus katmanı ağ özellikleri](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) [kademlia'dan discv5'e](https://vac.dev/kademlia-to-discv5) [kademlia belgesi](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) [Ethereum p2p'ye giriş](https://p2p.paris/en/talks/intro-ethereum-networking/) [eth1/eth2 ilişkisi](http://ethresear.ch/t/eth1-eth2-client-relationship/7248) [birleştirme ve eth2 istemci ayrıntıları videosu](https://www.youtube.com/watch?v=zNIrIninMgg)
