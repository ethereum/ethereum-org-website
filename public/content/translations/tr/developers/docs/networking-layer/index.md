---
title: "Ağ katmanı"
description: "Ethereum ağ katmanına giriş."
lang: tr
sidebarDepth: 2
---

Ethereum, standart protokoller kullanarak birbirleriyle iletişim kurabilmesi gereken, binlerce düğüme sahip, eşler arası bir ağdır. "Ağ katmanı", bu düğümlerin birbirini bulmasını ve bilgi alışverişinde bulunmasını sağlayan protokoller yığınıdır. Bu, ağ üzerinden "dedikodu" bilgilerini (birden çoğa iletişim) ve belirli düğümler arasında istekleri ve yanıtları değiş tokuş etmeyi (bire bir iletişim) içerir. Her düğüm, doğru bilgileri gönderip aldıklarından emin olmak için belirli ağ kurallarına uymalıdır.

İstemci yazılımının, her biri kendi ayrı ağ yığınına sahip iki kısmı (yürütüm istemcileri ve fikir birliği istemcileri) vardır. Diğer Ethereum düğümleriyle iletişim kurmanın yanı sıra, yürütme ve konsensus istemcilerinin birbirleriyle iletişim kurması gerekir. Bu sayfa, bu iletişimi sağlayan protokollerin giriş niteliğinde bir açıklamasını verir.

Yürütüm istemcileri, yürütüm katmanı eşler arası ağı üzerinden işlemleri yayarlar. Bu, kimliği doğrulanmış eşler arasında şifrelenmiş iletişimi gerektirir. Blok önermek için bir doğrulayıcı seçildiğinde düğümün yerel işlem havuzundan geçen işlemler, İşaret blokları şeklinde paketlenerek RPC bağlantısı aracılığı ile fikir birliği istemcilerine iletilir. Bunun ardından, fikir birliği istemcileri eşler arası ağlarında İşaret bloklarını yayar. Bu, biri işlemin yayılması için yürütüm istemcilerine, diğeri ise bloğun yayılması için fikir birliği istemcilerine bağlanan iki farklı p2p ağı gerektirir.

## Ön Koşullar {#prerequisites}

Bu sayfayı anlamak için Ethereum [düğümleri ve istemcileri](/developers/docs/nodes-and-clients/) hakkında biraz bilgi sahibi olmanız faydalı olacaktır.

## Yürütme Katmanı {#execution-layer}

Yürütme katmanının ağ protokolleri iki yığına bölünmüştür:

- keşif yığını: UDP'nin üzerine inşa edilmiştir ve yeni bir düğümün bağlanacak eşler bulmasını sağlar

- devP2P yığını: TCP'nin üzerinde yer alır ve düğümlerin bilgi alışverişinde bulunmasını sağlar

Her iki yığın paralel çalışır. Keşif yığını, yeni ağ katılımcılarını ağa besler ve DevP2P yığını, onların etkileşimlerini sağlar.

### Keşif {#discovery}

Keşif, ağdaki diğer düğümleri bulma işlemidir. Bu, istemciye adresleri [sabit kodlanmış](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) olan, bu sayede hemen bulunabilen ve istemciyi eşlere bağlayabilen küçük bir önyükleme düğümü (bootnode) seti kullanılarak başlatılır. Bu önyükleme düğümleri yalnızca bir dizi eşe, yeni bir düğüm tanıtmak için var olur - bu onların tek amacıdır, zinciri senkronize etmek gibi normal istemci görevlerine katılmazlar ve yalnızca bir istemci ilk kez çalıştırıldığında kullanılırlar.

Düğüm-önyükleme düğümü etkileşimleri için kullanılan protokol, düğüm listelerini paylaşmak için bir [dağıtılmış karma tablosu](https://en.wikipedia.org/wiki/Distributed_hash_table) kullanan, [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f)'nın değiştirilmiş bir biçimidir. Her düğümün, en yakın eşlerine bağlanmak için gereken bilgileri içeren bu tablonun bir sürümü vardır. Bu 'yakınlık' coğrafi değildir - mesafe, düğüm kimliğinin benzerliği ile tanımlanır. Her düğümün tablosu, bir güvenlik özelliği olarak düzenli olarak yenilenir. Örneğin, [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) keşif protokolünde düğümler, istemcinin desteklediği alt protokolleri görüntüleyen 'reklamlar' gönderebilir. Bu, eşlerin iletişim kurmak için kullanabilecekleri protokoller üzerinde anlaşmalarına olanak tanır.

Keşif, bir PİNG-PONG oyunuyla başlar. Başarılı bir PING-PONG, yeni düğümü bir önyükleme düğümüne "bağlar". Ağa giren yeni bir düğümün varlığı konusunda bir önyükleme düğümünü uyaran ilk mesaj bir `PING`'dir. Bu `PING`, yeni düğüm, önyükleme düğümü ve bir son kullanma zaman damgası hakkında hash'lenmiş bilgiler içerir. Önyükleme düğümü `PING`'i alır ve `PING` karmasını içeren bir `PONG` döndürür. `PING` ve `PONG` karmaları eşleşirse, yeni düğüm ile önyükleme düğümü arasındaki bağlantı doğrulanır ve "bağlandıkları" söylenir.

Bağlantı kurulduktan sonra yeni düğüm, önyükleme düğümüne bir `FIND-NEIGHBOURS` isteği gönderebilir. Önyükleme düğümü tarafından döndürülen veriler, yeni düğümün bağlanabileceği eşlerin bir listesini içerir. Düğümler arasında bağlantı kurulmamışsa `FIND-NEIGHBOURS` isteği başarısız olur, bu nedenle yeni düğüm ağa giremez.

Yeni düğüm, önyükleme düğümünden komşuların bir listesini aldığında, her biri ile bir PING-PONG alışverişi başlatır. Başarılı PING-PONG'lar yeni düğümü, komşularına bağlayarak mesaj alışverişini mümkün kılar.

```
istemciyi başlat --> önyükleme düğümüne bağlan --> önyükleme düğümüne bağlan --> komşuları bul --> komşulara bağlan
```

Yürütme istemcileri şu anda [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) keşif protokolünü kullanıyor ve [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) protokolüne geçiş için aktif bir çaba var.

#### ENR: Ethereum Düğüm Kayıtları {#enr}

[Ethereum Düğüm Kaydı (ENR)](/developers/docs/networking-layer/network-addresses/), üç temel öğe içeren bir nesnedir: bir imza (belirlenmiş bir kimlik şemasına göre oluşturulan kayıt içeriğinin karması), kayıttaki değişiklikleri izleyen bir sıra numarası ve isteğe bağlı anahtar:değer çiftlerinden oluşan bir liste. Bu, yeni eşler arasında tanımlayıcı bilgilerin daha kolay alışverişini sağlayan geleceğe dönük bir formattır ve Ethereum düğümleri için tercih edilen [ağ adresi](/developers/docs/networking-layer/network-addresses) formatıdır.

#### Keşif neden UDP üzerine kuruludur? {#why-udp}

UDP, herhangi bir hata kontrolünü, başarısız paketlerin yeniden gönderilmesini veya dinamik olarak bağlantıların açılıp kapanmasını desteklemez - bunun yerine, başarılı bir şekilde alınıp alınmadığına bakılmaksızın, yalnızca bir hedefe, sürekli bir bilgi akışı gönderir. Bu minimum işlevsellik, aynı zamanda minimum ek yük anlamına gelir ve bu tür bir bağlantıyı çok hızlı hale getirir. Keşif için, bir düğümün bir akran ile resmi bir bağlantı kurmak için sadece varlığını bildirmek istediği durumlarda, UDP yeterlidir. Ancak, ağ yığınının geri kalanı için UDP amaca uygun değildir. Düğümler arasındaki bilgi alışverişi oldukça karmaşıktır ve bu nedenle yeniden gönderme, hata denetimi vb. destekleyebilen daha tam özellikli bir protokole ihtiyaç duyar. TCP ile ilişkili ek yük, ek işlevsellik değerindedir. Bu nedenle, P2P yığınının çoğunluğu TCP üzerinden çalışır.

### DevP2P {#devp2p}

DevP2P'nin kendisi, Ethereum'un eşler arası ağı kurmak ve sürdürmek için uyguladığı bir protokol yığınıdır. Yeni düğümler ağa girdikten sonra, etkileşimleri [DevP2P](https://github.com/ethereum/devp2p) yığınındaki protokoller tarafından yönetilir. Bunların tümü TCP'nin üzerinde yer alır ve RLPx aktarım protokolünü, kablo protokolünü ve birkaç alt protokolü içerir. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md), düğümler arasındaki oturumları başlatmayı, kimlik doğrulaması yapmayı ve sürdürmeyi yöneten protokoldür. RLPx, düğümler arasında göndermek için verileri minimum bir yapıya kodlamak için alan açısından çok verimli bir yöntem olan RLP'yi (Yinelemeli Uzunluk Öneki) kullanarak mesajları kodlar.

İki düğüm arasındaki bir RLPx oturumu, ilk olarak kriptografik el sıkışma ile başlar. Bu, düğümün daha sonra eş tarafından doğrulanan bir yetkilendirme mesajı göndermesini içerir. Başarılı doğrulamadan sonra, eş, başlatıcı düğüme geri dönmek için bir yetkilendirme alındı mesajı oluşturur. Bu, düğümlerin özel ve güvenli bir şekilde iletişim kurmasını sağlayan bir anahtar değişim sürecidir. Başarılı bir kriptografik el sıkışma, daha sonra her iki düğümü de birbirlerine "kablo üzerinden" bir "merhaba" mesajı göndermeleri için tetikler. Kablo protokolü, başarılı bir merhaba mesaj alışverişi ile başlatılır.

Merhaba mesajları şunları içerir:

- protokol versiyonu
- istemci kimliği
- bağlantı noktası
- düğüm ID'si
- desteklenen alt protokollerin listesi

Bu, başarılı bir etkileşim için gereken bilgidir, çünkü her iki düğüm arasında hangi yeteneklerin paylaşıldığını tanımlar ve iletişimi yapılandırır. Her düğüm tarafından desteklenen alt protokol listelerinin karşılaştırıldığı ve her iki düğüm için ortak olanların oturumda kullanılabileceği bir alt protokol görüşmesi süreci vardır.

Merhaba mesajları ile birlikte, kablo protokolü ayrıca bir eşe bağlantının kapatılacağı konusunda uyarı veren bir "bağlantıyı kes" mesajı da gönderebilir. Kablo protokolü ayrıca, bir oturumu açık tutmak için periyodik olarak gönderilen PING ve PONG mesajlarını da içerir. RLPx ve kablolu protokol değiş tokuşları, bu nedenle, belirli bir alt protokole göre değiş tokuş edilecek faydalı bilgiler için iskele sağlayarak, düğümler arasındaki iletişimin temellerini oluşturur.

### Alt Protokoller {#sub-protocols}

#### Aktarım Protokolü {#wire-protocol}

Eşler bağlandığında ve bir RLPx oturumu başlatıldığında, kablo protokolü eşlerin nasıl iletişim kurduğunu tanımlar. Kablo protokolü başlangıçta üç ana görevi tanımlıyordu: zincir senkronizasyonu, blok yayılımı ve işlem değişimi. Bununla birlikte, Ethereum hisse ispatına geçiş yaptıktan sonra blok yayılımı ve zincir senkronizasyonu, fikir birliği katmanının bir parçası haline geldi. İşlem borsası, hala yürütüm istemcilerinin faaliyet alanındadır. İşlem takası, blok geliştiricilerin bir sonraki bloğa dahil etmek üzere bazılarını seçebilmeleri için düğümler arasında bekleyen işlemlerin takas edilmesini ifade eder. Bu görevler hakkında detaylı bilgiye [buradan](https://github.com/ethereum/devp2p/blob/master/caps/eth.md) ulaşabilirsiniz. Bu alt protokolleri destekleyen istemciler, bunları [JSON-RPC](/developers/docs/apis/json-rpc/) aracılığıyla kullanıma sunar.

#### les (hafif Ethereum alt protokolü) {#les}

Bu, hafif istemcileri senkronize etmek için minimum bir protokoldür. Geleneksel olarak bu protokol nadiren kullanılmıştır, çünkü tam düğümlerin hafif istemcilere teşvik olmadan veri sunması gerekir. Yürütme istemcilerinin varsayılan davranışı, hafif istemci verilerini les üzerinden sunmamaktır. Daha fazla bilgiye les [spesifikasyonundan](https://github.com/ethereum/devp2p/blob/master/caps/les.md) ulaşabilirsiniz.

#### Snap {#snap}

[Snap protokolü](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap), eşlerin son durumların anlık görüntülerini birbirleriyle paylaşmasına olanak tanıyan isteğe bağlı bir uzantıdır. Bu sayede eşler, ara Merkle trie düğümlerini indirmeye gerek kalmadan hesap ve depolama verilerini doğrulayabilir.

#### Wit (tanık protokolü) {#wit}

[Tanık protokolü](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit), eşler arasında durum tanıklarının alışverişini sağlayan ve istemcilerin zincirin ucuyla senkronize olmasına yardımcı olan isteğe bağlı bir uzantıdır.

#### Whisper {#whisper}

Fısıltı, blok zincirine herhangi bir bilgi yazmadan eşler arasında güvenli mesajlaşma sağlamayı amaçlayan bir protokoldü. DevP2P tel protokolünün bir parçasıydı, ancak artık kullanımdan kaldırıldı. Benzer amaçlara sahip başka [ilgili projeler](https://wakunetwork.com/) de mevcuttur.

## Mutabakat katmanı {#consensus-layer}

Konsensus istemcileri, farklı bir özellik ile ayrı bir eşler arası ağda yer alır. Konsensus istemcilerinin, eşlerinden yeni bloklar alabilmeleri ve blok teklif sahibi olma sırası kendilerine geldiğinde bunları yayınlayabilmeleri için blok dedikodularına katılmaları gerekir. Bu, yürütüm katmanına benzer şekilde ilk olarak bir keşif protokolü gerektirir, böylece bir düğüm eşleri bulabilir ve bloklar, tasdikler vb. alışverişi için güvenli oturumlar kurabilir.

### Keşif {#consensus-discovery}

Yürütme istemcilerine benzer şekilde, mutabakat istemcileri de eşleri bulmak için UDP üzerinden [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) kullanır. discv5'in mutabakat katmanı uygulaması, discv5'i bir [libP2P](https://libp2p.io/) yığınına bağlayan ve DevP2P'yi kullanımdan kaldıran bir adaptör içermesi bakımından yürütme istemcilerininkinden farklıdır. Yürütüm katmanının RLPx oturumları, libP2P'nin gürültü güvenli kanal anlaşması lehine kullanımdan kaldırılmıştır.

### ENR'ler {#consensus-enr}

Mutabakat düğümleri için ENR, düğümün açık anahtarını, IP adresini, UDP ve TCP bağlantı noktalarını ve mutabakata özgü iki alanı içerir: tasdik alt ağ bit alanı ve `eth2` anahtarı. İlki, düğümlerin belirli tasdik dedikodu alt ağlarına katılan eşler bulmasını kolaylaştırır. `eth2` anahtarı, düğümün hangi Ethereum çatal sürümünü kullandığı hakkında bilgi içerir ve eşlerin doğru Ethereum ağına bağlanmasını sağlar.

### libP2P {#libp2p}

LibP2P yığını, keşiften sonra tüm iletişimleri destekler. İstemciler, ENR'lerinde tanımlandığı şekilde IPv4 ve/veya IPv6'yı arayabilir ve dinleyebilir. LibP2P katmanındaki protokoller, dedikodu ve req/resp alanlarına bölünebilir.

### Gossip {#gossip}

Dedikodu alanı, ağ boyunca hızla yayılması gereken tüm bilgileri içerir. Bu, işaret bloklarını, kanıtları, tasdikleri, çıkışları ve kesmeleri içerir. Bu, libP2P gossipsub v1 kullanılarak iletilir ve alınacak ve iletilecek maksimum dedikodu yükü boyutu da dahil olmak üzere her düğümde yerel olarak depolanan çeşitli meta verilere dayanır. Gossip alanı hakkında ayrıntılı bilgi [burada](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub) mevcuttur.

### İstek-Yanıt {#request-response}

İstek-yanıt etki alanı, eşlerinden belirli bilgiler isteyen istemciler için protokoller içerir. Örnekler arasında, belirli kök karmalarıyla eşleşen veya bir dizi yuva içinde belirli İşaret blokları talep etmek yer alır. Yanıtlar her zaman hızlı sıkıştırılmış SSZ kodlu baytlar olarak döndürülür.

## Konsensus istemcisi neden SSZ'yi RLP'ye tercih ediyor? {#ssz-vs-rlp}

SSZ, basit serileştirme anlamına gelir. Tüm yapının kodunu çözmek zorunda kalmadan, kodlanmış bir mesajın tek tek parçalarının kodunu çözmeyi kolaylaştıran sabit ofsetler kullanır; bu, kodlanmış mesajlardan belirli bilgi parçalarını verimli bir şekilde alabildiğinden, konsensus istemcisi için çok yararlıdır. Ayrıca, Merkleizasyon için ilgili verimlilik kazanımları ile Merkle protokolleriyle entegre olmak üzere özel olarak tasarlanmıştır. Konsensus katmanındaki tüm karmalar Merkle kökleri olduğundan, bu önemli bir gelişme sağlar. SSZ ayrıca değerlerin benzersiz temsillerini de garanti eder.

## Yürütme ve mutabakat istemcilerini bağlama {#connecting-clients}

Fikir birliği ve yürütüm istemcileri paralel şekilde çalışır. Fikir birliği istemcisinin yürütüm istemcisine talimatlar sağlayabilmesi ve yürütüm istemcisinin, İşaret bloklarına dahil etmek üzere fikir birliği istemcisine işlem paketlerini iletebilmesi için bunların birbirine bağlanması gerekir. İki istemci arasında iletişim, yerel bir RPC bağlantısı kullanılarak sağlanabilir. ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen bir API, iki istemci arasında gönderilen talimatları tanımlar. Her iki istemci de tek bir ağ kimliğinin arkasında bulunduğundan, her istemci için ayrı bir anahtar (eth1 anahtarı ve eth2 anahtarı) içeren bir ENR'yi (Ethereum düğüm kaydı) ortak kullanırlar.

İlgili ağ yığını parantez içinde olacak şekilde, kontrol akışının bir özeti aşağıda gösterilmiştir.

### Mutabakat istemcisi blok üreticisi olmadığında: {#when-consensus-client-is-not-block-producer}

- Konsensus istemcisi, blok dedikodu protokolü aracılığıyla bir blok alır (konsensus p2p)
- Mutabakat istemcisi bloğu ön doğrulamadan geçirir, yani bloğun geçerli bir göndericiden doğru meta verilerle geldiğinden emin olur.
- Bloktaki işlemler yürütüm katmanına yürütüm yükü olarak gönderilir (yerel RPC bağlantısı)
- Yürütme katmanı işlemleri yürütür ve blok başlığındaki durumu doğrular (yani karmaların eşleşip eşleşmediğini kontrol eder).
- Yürütüm katmanı, doğrulama verilerini konsensus katmanına geri iletir, blok artık doğrulanmış olarak kabul edilir (yerel RPC bağlantısı)
- Konsensus katmanı, kendi blok zincirinin başına blok ekler ve bunu onaylar, onaylamayı ağ üzerinden yayınlar (konsensus p2p)

### Mutabakat istemcisi blok üreticisi olduğunda: {#when-consensus-client-is-block-producer}

- Konsensus istemcisi, bir sonraki blok üreticisi olduğuna dair bildirim alır (konsensus p2p)
- Mutabakat katmanı, yürütme istemcisindeki (yerel RPC) `create block` yöntemini çağırır.
- Yürütüm katmanı, işlem dedikodu protokolü tarafından doldurulmuş işlem belleğine erişir (yürütme p2p)
- Yürütüm istemcisi, işlemleri bir bloğa toplar, işlemleri yürütür ve bir blok karması oluşturur
- Fikir birliği istemcisi, işlemleri ve blok karmasını yürütüm istemcisinden alır ve işaret bloğuna (yerel RPC) ekler
- Consensus istemcisi bloğu blok dedikodu protokolü üzerinden yayınlar (consensus p2p)
- Diğer istemciler, önerilen bloğu, blok dedikodu protokolü aracılığıyla alır ve yukarıda açıklandığı gibi doğrular (konsensus p2p)

Blok, yeterli onaylayıcılar tarafından onaylandıktan sonra, zincirin başına eklenir, gerekçelendirilir ve sonunda kesinleştirilir.

![](cons_client_net_layer.png)\n![](exe_client_net_layer.png)

[ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248) adresinden mutabakat ve yürütme istemcileri için ağ katmanı şeması

## Ek Okumalar {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)\n[LibP2p](https://github.com/libp2p/specs)\n[Mutabakat katmanı ağ spesifikasyonları](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)\n[kademlia'dan discv5'e](https://vac.dev/kademlia-to-discv5)\n[kademlia makalesi](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)\n[Ethereum p2p'ye giriş](https://p2p.paris/en/talks/intro-ethereum-networking/)\n[eth1/eth2 ilişkisi](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)\n[Birleşme ve eth2 istemci ayrıntıları videosu](https://www.youtube.com/watch?v=zNIrIninMgg)
