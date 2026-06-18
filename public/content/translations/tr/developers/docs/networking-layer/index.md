---
title: Ağ katmanı
description: Ethereum'un ağ katmanına giriş.
lang: tr
sidebarDepth: 2
---

[Ethereum](/), standartlaştırılmış protokoller kullanarak birbiriyle iletişim kurabilmesi gereken binlerce düğüme sahip eşler arası bir ağdır. "Ağ katmanı", bu düğümlerin birbirini bulmasını ve bilgi alışverişinde bulunmasını sağlayan protokoller yığınıdır. Bu, ağ üzerinden bilgilerin "dedikodusunu yapmayı" (bire çok iletişim) ve belirli düğümler arasında istek ve yanıtları takas etmeyi (bire bir iletişim) içerir. Her düğüm, doğru bilgileri gönderip aldığından emin olmak için belirli ağ kurallarına uymalıdır.

İstemci yazılımının (yürütme istemcileri ve fikir birliği istemcileri) her birinin kendine özgü ağ yığınına sahip iki bölümü vardır. Diğer Ethereum düğümleriyle iletişim kurmanın yanı sıra, yürütme ve fikir birliği istemcileri birbirleriyle de iletişim kurmalıdır. Bu sayfa, bu iletişimi sağlayan protokollere giriş niteliğinde bir açıklama sunmaktadır.

Yürütme istemcileri, yürütme katmanı eşler arası ağı üzerinden işlemlerin dedikodusunu yapar. Bu, kimliği doğrulanmış eşler arasında şifreli iletişim gerektirir. Bir doğrulayıcı bir blok teklif etmek üzere seçildiğinde, düğümün yerel işlem havuzundaki işlemler yerel bir RPC bağlantısı aracılığıyla fikir birliği istemcilerine aktarılır ve bunlar işaret blokları halinde paketlenir. Fikir birliği istemcileri daha sonra p2p ağları üzerinden işaret bloklarının dedikodusunu yapar. Bu, iki ayrı p2p ağı gerektirir: biri işlem dedikodusu için yürütme istemcilerini bağlayan, diğeri ise blok dedikodusu için fikir birliği istemcilerini bağlayan ağ.

## Ön Koşullar {#prerequisites}

Bu sayfayı anlamak için Ethereum [düğümleri ve istemcileri](/developers/docs/nodes-and-clients/) hakkında biraz bilgi sahibi olmak faydalı olacaktır.

## Yürütme Katmanı {#execution-layer}

Yürütme katmanının ağ protokolleri iki yığına ayrılır:

- keşif yığını: UDP üzerine inşa edilmiştir ve yeni bir düğümün bağlanacak eşler bulmasını sağlar

- DevP2P yığını: TCP üzerinde yer alır ve düğümlerin bilgi alışverişinde bulunmasını sağlar

Her iki yığın da paralel çalışır. Keşif yığını yeni ağ katılımcılarını ağa besler ve DevP2P yığını onların etkileşimlerini sağlar.

### Keşif {#discovery}

Keşif, ağdaki diğer düğümleri bulma sürecidir. Bu, küçük bir başlatma düğümü (adresleri istemciye [sabit kodlanmış](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) olan ve böylece hemen bulunup istemciyi eşlere bağlayabilen düğümler) kümesi kullanılarak başlatılır. Bu başlatma düğümleri yalnızca yeni bir düğümü bir dizi eşe tanıtmak için vardır; tek amaçları budur, zinciri eşzamanlama gibi normal istemci görevlerine katılmazlar ve yalnızca bir istemci ilk kez çalıştırıldığında kullanılırlar.

Düğüm-başlatma düğümü etkileşimleri için kullanılan protokol, düğüm listelerini paylaşmak için [dağıtık bir hash tablosu](https://en.wikipedia.org/wiki/Distributed_hash_table) kullanan [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f)'nın değiştirilmiş bir biçimidir. Her düğüm, en yakın eşlerine bağlanmak için gereken bilgileri içeren bu tablonun bir sürümüne sahiptir. Bu 'yakınlık' coğrafi değildir; mesafe, düğümün kimliğinin (ID) benzerliği ile tanımlanır. Her düğümün tablosu bir güvenlik özelliği olarak düzenli olarak yenilenir. Örneğin, [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5)'te, keşif protokolü düğümleri ayrıca istemcinin desteklediği alt protokolleri gösteren 'reklamlar' gönderebilir ve bu da eşlerin iletişim kurmak için kullanabilecekleri protokoller hakkında pazarlık yapmasına olanak tanır.

Keşif bir PING-PONG oyunuyla başlar. Başarılı bir PING-PONG, yeni düğümü bir başlatma düğümüne "bağlar". Bir başlatma düğümünü ağa giren yeni bir düğümün varlığı konusunda uyaran ilk mesaj bir `PING`'dir. Bu `PING`, yeni düğüm, başlatma düğümü ve bir sona erme zaman damgası hakkında hash'lenmiş bilgiler içerir. Başlatma düğümü `PING`'i alır ve `PING` hash'ini içeren bir `PONG` döndürür. Eğer `PING` ve `PONG` hash'leri eşleşirse, yeni düğüm ile başlatma düğümü arasındaki bağlantı doğrulanır ve "bağlandıkları" söylenir.

Bağlandıktan sonra, yeni düğüm başlatma düğümüne bir `FIND-NEIGHBOURS` isteği gönderebilir. Başlatma düğümü tarafından döndürülen veriler, yeni düğümün bağlanabileceği eşlerin bir listesini içerir. Düğümler bağlı değilse, `FIND-NEIGHBOURS` isteği başarısız olur, bu nedenle yeni düğüm ağa giremez.

Yeni düğüm başlatma düğümünden komşuların bir listesini aldığında, her biriyle bir PING-PONG alışverişine başlar. Başarılı PING-PONG'lar yeni düğümü komşularıyla bağlayarak mesaj alışverişini sağlar.

```
istemciyi başlat --> başlatma düğümüne bağlan --> başlatma düğümüyle bağ kur --> komşuları bul --> komşularla bağ kur
```

Yürütme istemcileri şu anda [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) keşif protokolünü kullanmaktadır ve [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) protokolüne geçiş için aktif bir çaba vardır.

#### ENR: Ethereum Düğüm Kayıtları {#enr}

[Ethereum Düğüm Kaydı (ENR)](/developers/docs/networking-layer/network-addresses/), üç temel unsur içeren bir nesnedir: bir imza (üzerinde anlaşmaya varılmış bir kimlik şemasına göre yapılmış kayıt içeriklerinin hash'i), kayıttaki değişiklikleri izleyen bir sıra numarası ve key:value (anahtar:değer) çiftlerinin rastgele bir listesi. Bu, yeni eşler arasında tanımlayıcı bilgilerin daha kolay alışverişine olanak tanıyan geleceğe dönük bir formattır ve Ethereum düğümleri için tercih edilen [ağ adresi](/developers/docs/networking-layer/network-addresses) formatıdır.

#### Keşif neden UDP üzerine inşa edilmiştir? {#why-udp}

UDP herhangi bir hata denetimini, başarısız paketlerin yeniden gönderilmesini veya bağlantıların dinamik olarak açılıp kapanmasını desteklemez; bunun yerine, başarıyla alınıp alınmadığına bakılmaksızın bir hedefe sürekli bir bilgi akışı gönderir. Bu minimal işlevsellik aynı zamanda minimal ek yüke dönüşerek bu tür bir bağlantıyı çok hızlı hale getirir. Bir düğümün daha sonra bir eşle resmi bir bağlantı kurmak için sadece varlığını bildirmek istediği keşif için UDP yeterlidir. Ancak, ağ yığınının geri kalanı için UDP amaca uygun değildir. Düğümler arasındaki bilgi alışverişi oldukça karmaşıktır ve bu nedenle yeniden göndermeyi, hata denetimini vb. destekleyebilecek daha tam özellikli bir protokole ihtiyaç duyar. TCP ile ilişkili ek yük, ek işlevselliğe değer. Bu nedenle, P2P yığınının büyük bir kısmı TCP üzerinden çalışır.

### DevP2P {#devp2p}

DevP2P'nin kendisi, Ethereum'un eşler arası ağı kurmak ve sürdürmek için uyguladığı bütün bir protokoller yığınıdır. Yeni düğümler ağa girdikten sonra, etkileşimleri [DevP2P](https://github.com/ethereum/devp2p) yığınındaki protokoller tarafından yönetilir. Bunların tümü TCP'nin üzerinde yer alır ve RLPx taşıma protokolünü, tel (wire) protokolünü ve çeşitli alt protokolleri içerir. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md), düğümler arasındaki oturumları başlatmayı, kimlik doğrulamayı ve sürdürmeyi yöneten protokoldür. RLPx, mesajları düğümler arasında göndermek üzere verileri minimal bir yapıya kodlamanın çok alan verimli bir yöntemi olan RLP (Özyineli Uzunluk Öneki) kullanarak kodlar.

İki düğüm arasındaki bir RLPx oturumu, ilk kriptografik el sıkışma ile başlar. Bu, düğümün bir yetkilendirme (auth) mesajı göndermesini ve bunun daha sonra eş tarafından doğrulanmasını içerir. Başarılı bir doğrulama üzerine eş, başlatıcı düğüme döndürmek için bir yetkilendirme-onay (auth-acknowledgement) mesajı üretir. Bu, düğümlerin özel ve güvenli bir şekilde iletişim kurmasını sağlayan bir anahtar değişimi sürecidir. Başarılı bir kriptografik el sıkışma daha sonra her iki düğümün de birbirine "tel üzerinde" (on the wire) bir "merhaba" mesajı göndermesini tetikler. Tel protokolü, merhaba mesajlarının başarılı bir şekilde değiş tokuş edilmesiyle başlatılır.

Merhaba mesajları şunları içerir:

- protokol sürümü
- istemci kimliği (ID)
- bağlantı noktası (port)
- düğüm kimliği (ID)
- desteklenen alt protokollerin listesi

Bu, başarılı bir etkileşim için gereken bilgidir çünkü her iki düğüm arasında hangi yeteneklerin paylaşıldığını tanımlar ve iletişimi yapılandırır. Her bir düğüm tarafından desteklenen alt protokol listelerinin karşılaştırıldığı ve her iki düğüm için ortak olanların oturumda kullanılabildiği bir alt protokol müzakere süreci vardır.

Merhaba mesajlarıyla birlikte, tel protokolü bir eşe bağlantının kapatılacağı uyarısını veren bir "bağlantıyı kes" (disconnect) mesajı da gönderebilir. Tel protokolü ayrıca bir oturumu açık tutmak için periyodik olarak gönderilen PING ve PONG mesajlarını da içerir. Bu nedenle RLPx ve tel protokolü alışverişleri, düğümler arasındaki iletişimin temellerini atarak, belirli bir alt protokole göre faydalı bilgilerin alışverişi için iskeleti sağlar.

### Alt protokoller {#sub-protocols}

#### Tel protokolü {#wire-protocol}

Eşler bağlandıktan ve bir RLPx oturumu başlatıldıktan sonra, tel protokolü eşlerin nasıl iletişim kuracağını tanımlar. Başlangıçta, tel protokolü üç ana görevi tanımlıyordu: zincir eşzamanlaması, blok yayılımı ve işlem değişimi. Ancak, Ethereum Hisse Kanıtı'na (PoS) geçtiğinde, blok yayılımı ve zincir eşzamanlaması mutabakat katmanının bir parçası haline geldi. İşlem değişimi hala yürütme istemcilerinin yetki alanındadır. İşlem değişimi, blok oluşturucuların bir sonraki bloğa dahil etmek üzere bazılarını seçebilmesi için düğümler arasında bekleyen işlemlerin değiş tokuş edilmesini ifade eder. Bu görevler hakkında ayrıntılı bilgi [burada](https://github.com/ethereum/devp2p/blob/master/caps/eth.md) mevcuttur. Bu alt protokolleri destekleyen istemciler, bunları [JSON-RPC](/developers/docs/apis/json-rpc/) aracılığıyla sunar.

#### les (hafif Ethereum alt protokolü) {#les}

Bu, hafif istemcileri eşzamanlamak için minimal bir protokoldür. Geleneksel olarak bu protokol nadiren kullanılmıştır çünkü tam düğümlerin teşvik edilmeden hafif istemcilere veri sunması gerekir. Yürütme istemcilerinin varsayılan davranışı, les üzerinden hafif istemci verilerini sunmamaktır. Daha fazla bilgi les [spesifikasyonunda](https://github.com/ethereum/devp2p/blob/master/caps/les.md) mevcuttur.

#### Snap {#snap}

[Snap protokolü](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap), eşlerin son durumların anlık görüntülerini değiş tokuş etmesine olanak tanıyan ve eşlerin ara Merkle trie düğümlerini indirmek zorunda kalmadan hesap ve depolama verilerini doğrulamasına izin veren isteğe bağlı bir uzantıdır.

#### Wit (tanık protokolü) {#wit}

[Tanık protokolü](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit), eşler arasında durum tanıklarının değişimini sağlayan ve istemcileri zincirin ucuna eşzamanlamaya yardımcı olan isteğe bağlı bir uzantıdır.

#### Whisper {#whisper}

Whisper, Blokzincir'e herhangi bir bilgi yazmadan eşler arasında güvenli mesajlaşma sağlamayı amaçlayan bir protokoldü. DevP2P tel protokolünün bir parçasıydı ancak artık kullanımdan kaldırılmıştır. Benzer amaçlara sahip başka [ilgili projeler](https://wakunetwork.com/) de mevcuttur.

## Mutabakat katmanı {#consensus-layer}

Fikir birliği istemcileri, farklı bir spesifikasyona sahip ayrı bir eşler arası ağa katılırlar. Fikir birliği istemcilerinin, eşlerden yeni bloklar alabilmeleri ve blok teklifçisi olma sırası kendilerine geldiğinde bunları yayınlayabilmeleri için blok dedikodusuna katılmaları gerekir. Yürütme katmanına benzer şekilde, bu ilk olarak bir düğümün eşleri bulabilmesi ve blokları, onayları vb. değiş tokuş etmek için güvenli oturumlar kurabilmesi için bir keşif protokolü gerektirir.

### Keşif {#consensus-discovery}

Yürütme istemcilerine benzer şekilde, fikir birliği istemcileri eşleri bulmak için UDP üzerinden [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) kullanır. Discv5'in mutabakat katmanı uygulaması, yürütme istemcilerininkinden yalnızca discv5'i bir [libP2P](https://libp2p.io/) yığınına bağlayan ve DevP2P'yi kullanımdan kaldıran bir adaptör içermesi bakımından farklılık gösterir. Yürütme katmanının RLPx oturumları, libP2P'nin noise güvenli kanal el sıkışması lehine kullanımdan kaldırılmıştır.

### ENR'ler {#consensus-enr}

Fikir birliği düğümleri için ENR, düğümün açık anahtarını, IP adresini, UDP ve TCP bağlantı noktalarını ve mutabakata özgü iki alanı içerir: onay alt ağı bit alanı ve `eth2` anahtarı. İlki, düğümlerin belirli onay dedikodusu alt ağlarına katılan eşleri bulmasını kolaylaştırır. `eth2` anahtarı, düğümün hangi Ethereum çatallanma sürümünü kullandığı hakkında bilgi içerir ve eşlerin doğru Ethereum'a bağlanmasını sağlar.

### libP2P {#libp2p}

libP2P yığını, keşiften sonraki tüm iletişimleri destekler. İstemciler, ENR'lerinde tanımlandığı gibi IPv4 ve/veya IPv6 üzerinden arama yapabilir ve dinleyebilir. libP2P katmanındaki protokoller, dedikodu ve istek/yanıt (req/resp) alanlarına ayrılabilir.

### Dedikodu {#gossip}

Dedikodu alanı, ağ boyunca hızla yayılması gereken tüm bilgileri içerir. Buna işaret blokları, kanıtlar, onaylar, çıkışlar ve kesintiler (slashings) dahildir. Bu, libP2P gossipsub v1 kullanılarak iletilir ve alınacak ve iletilecek dedikodu yüklerinin maksimum boyutu da dahil olmak üzere her düğümde yerel olarak depolanan çeşitli meta verilere dayanır. Dedikodu alanı hakkında ayrıntılı bilgi [burada](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub) mevcuttur.

### İstek-yanıt {#request-response}

İstek-yanıt alanı, istemcilerin eşlerinden belirli bilgileri talep etmesine yönelik protokoller içerir. Örnekler arasında belirli kök hash'leriyle eşleşen veya bir yuva (slot) aralığındaki belirli işaret bloklarının talep edilmesi yer alır. Yanıtlar her zaman snappy sıkıştırmalı SSZ kodlu baytlar olarak döndürülür.

## Fikir birliği istemcisi neden RLP yerine SSZ'yi tercih ediyor? {#ssz-vs-rlp}

SSZ, basit serileştirme (simple serialization) anlamına gelir. Kodlanmış bir mesajın tek tek parçalarını tüm yapıyı çözmek zorunda kalmadan çözmeyi kolaylaştıran sabit ofsetler kullanır; bu, kodlanmış mesajlardan belirli bilgi parçalarını verimli bir şekilde alabildiği için fikir birliği istemcisi için çok yararlıdır. Ayrıca, Merkleleştirme için ilgili verimlilik kazanımlarıyla birlikte Merkle protokolleriyle entegre olmak üzere özel olarak tasarlanmıştır. Mutabakat katmanındaki tüm hash'ler Merkle kökleri olduğundan, bu önemli bir iyileştirme sağlar. SSZ ayrıca değerlerin benzersiz temsillerini garanti eder.

## Yürütme ve fikir birliği istemcilerini bağlama {#connecting-clients}

Hem fikir birliği hem de yürütme istemcileri paralel olarak çalışır. Fikir birliği istemcisinin yürütme istemcisine talimatlar verebilmesi ve yürütme istemcisinin işaret bloklarına dahil edilmek üzere işlem paketlerini fikir birliği istemcisine aktarabilmesi için birbirlerine bağlı olmaları gerekir. İki istemci arasındaki iletişim yerel bir RPC bağlantısı kullanılarak sağlanabilir. ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen bir API, iki istemci arasında gönderilen talimatları tanımlar. Her iki istemci de tek bir ağ kimliğinin arkasında yer aldığından, her istemci için ayrı bir anahtar (Eth1 anahtarı ve Eth2 anahtarı) içeren bir ENR'yi (Ethereum düğüm kaydı) paylaşırlar.

Kontrol akışının bir özeti, ilgili ağ yığını parantez içinde olacak şekilde aşağıda gösterilmiştir.

### Fikir birliği istemcisi blok üreticisi olmadığında: {#when-consensus-client-is-not-block-producer}

- Fikir birliği istemcisi, blok dedikodusu protokolü (mutabakat p2p) aracılığıyla bir blok alır
- Fikir birliği istemcisi bloğu önceden doğrular, yani doğru meta verilerle geçerli bir göndericiden geldiğinden emin olur
- Bloktaki işlemler, bir yürütme yükü (yerel RPC bağlantısı) olarak yürütme katmanına gönderilir
- Yürütme katmanı işlemleri yürütür ve blok başlığındaki durumu doğrular (yani hash'lerin eşleşip eşleşmediğini kontrol eder)
- Yürütme katmanı doğrulama verilerini mutabakat katmanına geri aktarır, blok artık doğrulanmış kabul edilir (yerel RPC bağlantısı)
- Mutabakat katmanı bloğu kendi Blokzincir'inin başına ekler ve onu onaylayarak onayı ağ üzerinden yayınlar (mutabakat p2p)

### Fikir birliği istemcisi blok üreticisi olduğunda: {#when-consensus-client-is-block-producer}

- Fikir birliği istemcisi, bir sonraki blok üreticisi olduğuna dair bildirim alır (mutabakat p2p)
- Mutabakat katmanı, yürütme istemcisindeki `create block` yöntemini çağırır (yerel RPC)
- Yürütme katmanı, işlem dedikodusu protokolü (yürütme p2p) tarafından doldurulan işlem bellek havuzuna erişir
- Yürütme istemcisi işlemleri bir blokta paketler, işlemleri yürütür ve bir blok hash'i üretir
- Fikir birliği istemcisi, yürütme istemcisinden işlemleri ve blok hash'ini alır ve bunları işaret bloğuna ekler (yerel RPC)
- Fikir birliği istemcisi bloğu blok dedikodusu protokolü üzerinden yayınlar (mutabakat p2p)
- Diğer istemciler önerilen bloğu blok dedikodusu protokolü aracılığıyla alır ve yukarıda açıklandığı gibi doğrular (mutabakat p2p)

Blok yeterli sayıda doğrulayıcı tarafından onaylandıktan sonra zincirin başına eklenir, gerekçelendirilir ve sonunda kesinleşir.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

[ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)'den fikir birliği ve yürütme istemcileri için ağ katmanı şeması

## Daha Fazla Okuma {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Mutabakat katmanı ağ spesifikasyonları](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[kademlia'dan discv5'e](https://vac.dev/kademlia-to-discv5)
[kademlia makalesi](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Ethereum p2p'ye giriş](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Eth1/Eth2 ilişkisi](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Birleşme ve Eth2 istemci detayları videosu](https://www.youtube.com/watch?v=zNIrIninMgg)