---
title: "Portal Ağı"
description: "Portal Ağı'na genel bir bakış - Düşük kaynaklı istemcilere destek olmak için tasarlanmış, geliştirme aşamasındaki bir ağ."
lang: tr
---

Ethereum, Ethereum istemci yazılımını çalıştıran bilgisayarlardan oluşan bir ağdır. Bu bilgisayarların her birine "düğüm" adı verilir. İstemci yazılımı, Ethereum ağında bir düğümün veriyi gönderip almasına olanak tanır ve veriyi Ethereum protokol kurallarına göre doğrular. Düğümler, geçmişe ait bir çok veriyi disk depolamalarında tutar ve ağdaki diğer düğümlerden, bloklar olarak bilinen yeni bilgi paketlerini alıp bu verilere ekler. Bu, bir düğümün ağın geri kalanı ile uyumlu olup olmadığını her zaman kontrol etmek için gereklidir. Bu, bir düğümü çalışırmak için çok fazla disk alanı gerekebileceği anlamına gelir. Bazı düğüm işlemleri ise çok fazla RAM gerektirebilir.

Bu disk depolama sorunuyla baş etmek için düğümlerin depolamayı kendileri yapması yerine, tam düğümlerden bilgi isteyen "hafif" düğümler geliştirilmiştir. Ancak bu, hafif düğümün bilgileri bağımsız şekilde doğrulamadığı, bunun yerine başka bir düğüme güvendiği anlamına gelir. Bu aynı zamanda, tam düğümlerin fazladan iş üstlenerek hafif düğümlere hizmet etmesi gerektiğini de ifade eder.

Portal Ağı, hafif düğümler için veriye erişilebilirlik problemini, gerekli verileri ağ genelinde küçük parçalar halinde paylaşarak tam düğümlere güvenmek veya ilave yük yüklemek zorunda kalmadan çözmeyi amaçlayan Ethereum'a yönelik yeni bir ağ tasarımıdır.

[Düğümler ve istemciler](/developers/docs/nodes-and-clients/) hakkında daha fazla bilgi

## Portal Ağı'na neden ihtiyacımız var {#why-do-we-need-portal-network}

Ethereum düğümleri, ethereum blokzincirlerinde kendi tam veya kısmi kopyalarını saklar. Bu yerel kopya, işlemleri doğrulamak ve düğümün doğru zinciri izlediğinden emin olmak için kullanılır. Yerel olarak depolanan bu veriler, herhangi başka bir oluşuma güvenmeye ihtiyaç duymadan, düğümlerin gelen verilerin doğruluğunu ve geçerliliğini bağımsız olarak doğrulamasına imkan tanır.

Blokzincirin bu yerel kopyası ve ilişkili durum ve makbuz verileri, düğümün sabit diskinde çok fazla yer kaplar. Örneğin, bir mutabakat istemcisiyle eşleştirilmiş [Geth](https://geth.ethereum.org) kullanan bir düğümü çalıştırmak için 2 TB'lık bir sabit disk önerilir. Geth, yalnızca görece yeni bir blok seti üzerinden zincir verilerini depolayan anlık senkronizasyonu kullanarak genellikle yaklaşık 650 GB disk alanı kaplar ancak bu alan haftada yaklaşık 14 GB artar (düğümü periyodik olarak 650 GB'a indirebilirsiniz).

Bu, düğümleri çalıştırmanın yüksek maliyetli olduğu anlamına gelir; çünkü Ethereum için büyük bir disk alanı ayrılması gereklidir. Ethereum yol haritasında, [geçmişin süresinin dolması](/roadmap/statelessness/#history-expiry), [durumun süresinin dolması](/roadmap/statelessness/#state-expiry) ve [durumsuzluk](/roadmap/statelessness/) dahil olmak üzere bu soruna yönelik birkaç çözüm vardır. Ancak, bunların uygulamaya koyulmasına muhtemelen birkaç yıl daha vardır. Ayrıca kendi zincir verisi kopyalarını kaydetmeyen ve ihtiyaç duydukları verileri tam düğümlerden isteyen [hafif düğümler](/developers/docs/nodes-and-clients/light-clients/) de bulunmaktadır. Ancak bu, hafif düğümlerin dürüst veri sağlayabilmek için tam düğümlere güvenmesi gerektiği anlamına gelir ve hafif düğümlere ihtiyacı olan veriyi sunmak zorunda olan tam düğümlerde gerilim yaratır.

Portal Ağı, hafif düğümlerin verilerini alırken tam düğümlere güvenmek durumunda kalmasını veya tam düğümlerin üzerindeki iş yükünü önemli ölçüde arttırmasını gerektirmeyen alternatif bir yol sunmayı amaçlar. Bu, Ethereum düğümlerinin ağ genelinde veri paylaşmasına olanak tanıyan yeni bir yolu devreye alarak gerçekleştirilir.

## Portal Ağı nasıl çalışır? {#how-does-portal-network-work}

Ethereum düğümleri, birbirleriyle nasıl iletişim kuracaklarını tanımlayan katı protokollere sahiptir. Yürütme istemcileri [DevP2P](/developers/docs/networking-layer/#devp2p) olarak bilinen bir dizi alt protokolü kullanarak iletişim kurarken, mutabakat istemcileri [libP2P](/developers/docs/networking-layer/#libp2p) adı verilen farklı bir alt protokol yığını kullanır. Bunlar, düğümler arasında iletilebilecek veri türlerini tanımlar.

![devP2P ve libP2P](portal-network-devp2p-libp2p.png)

Düğümler ayrıca, uygulamaların ve cüzdanların Ethereum düğümleriyle bilgi takası yaptığı [JSON-RPC API](/developers/docs/apis/json-rpc/) aracılığıyla belirli verileri de sunabilir. Ancak bunların hiçbiri, hafif istemcilere veri sunmak için ideal protokoller değildir.

Hafif istemciler şu anda DevP2P ya da libP2p üzerinden belirli zincir verilerini talep edemez; çünkü bu protokoller, sadece blokların ve işlemlerin haberleşmesi ve zincir senkronizasyonu için tasarlanmıştır. Hafif istemciler bu bilgileri indirmek istemez; çünkü bu, onları "hafif" olmaktan çıkaracaktır.

JSON-RPC API, hafif istemci veri istekleri için de ideal bir seçim değildir. Çünkü belirli bir tam düğüm bağlantısına ya da veri sunabilen merkezi bir RPV sağlayıcısına bağımlıdır. Bu, hafif istemcinin söz konusu düğüme/sağlayıcıya dürüst davranacağı konusunda güvenmesi gerektiğini ifade eder ve aynı zamanda tam düğümün, birçok hafif istemciden gelen çok sayıda talebi de ele alması gerekebilir ve bu da bant genişliği gereksinimlerini arttırır.

Portal Ağı'nın amacı, bütün tasarımı yeniden düşünerek mevcut Ethereum istemcilerinin kısıtlanmış tasarımlarının dışında spesifik olarak hafiflik odaklı geliştirme yapmaktır.

Portal Ağı'nın temel fikri, hafif istemcilerin ihtiyaç duyduğu geçmiş veriler ve mevcut zincir başının kimliği gibi bilgilerin, [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (Bittorrent'e benzer) kullanan hafif, DevP2P tarzı, eşler arası merkeziyetsiz bir ağ aracılığıyla sunulmasını sağlayarak mevcut ağ yığınının en iyi özelliklerini almaktır.

Altta yatan fikir, her bir düğüme toplam geçmiş Ethereum verilerinin küçük paarçalarını ve bazı spesifik düğüm sorumluluklarını eklemektir. Ardından istekler, talep edilen spesifik verileri depolayan düğümleri arar, bulur ve bu düğümlerden alır.

Bu, hafif istemcilerin tek bir düğüm bulduğu ve büyük hacimli verileri filtreleyip sunmalarının istendiği hafif düğümün normal modelini tersine çevirir; bunun yerine, küçük miktarda verinin işlendiği büyük bir düğüm ağını hızlıca filtreler.

Amaç, hafif Portal istemcilerinin oluşturduğu merkeziyetsiz bir ağın şunları yapmasına izin vermektir:

- zincirin başını izlemek
- son ve geçmiş zincir verilerini senkronize etmek
- durum verilerini almak
- işlemleri yayımlamak
- [EVM](/developers/docs/evm/) kullanarak işlemleri yürütme

Bu ağ tasarımının faydaları şunlardır:

- merkezi sağlayıcılara olan bağımlılığı azaltmak
- Internet bant genişliği kullanımını azaltmak
- minimize edilmiş veya sıfır senkronizasyon
- Kaynak kısıtlı cihazlardan erişilebilir (\<1 GB RAM, \<100 MB disk alanı, 1 CPU)

Aşağıdaki tablo, Portal Ağı tarafından sunulabilen mevcut istemcilerin işlevlerini göstermekte ve kullanıcıların bu işlevlere çok düşük kaynaklı cihazlarda erişmelerini sağlamaktadır.

### Portal Ağları

| İşaret hafif istemcisi | Durum ağı                    | İşlem dedikodusu    | Geçmiş ağı     |
| ---------------------- | ---------------------------- | ------------------- | -------------- |
| Hafif İşaret Zinciri   | Hesap ve sözleşme depolaması | Hafif bellek havuzu | Başlıklar      |
| Protokol verileri      |                              |                     | Blok gövdeleri |
|                        |                              |                     | Makbuzlar      |

## Varsayılan olarak istemci çeşitliliği {#client-diversity-as-default}

Portal Ağı geliştiricileri ayrıca, ilk günden itibaren dört ayrı Portal Ağı istemcisi oluşturma yönünde bir tasarım kararı aldılar.

Portal Ağı istemcileri:

- [Trin](https://github.com/ethereum/trin): Rust ile yazılmıştır
- [Fluffy](https://fluffy.guide): Nim ile yazılmıştır
- [Ultralight](https://github.com/ethereumjs/ultralight): Typescript ile yazılmıştır
- [Shisui](https://github.com/zen-eth/shisui): Go ile yazılmıştır

Birden fazla bağımsız istemci uygulamasına sahip olmak, Ethereum ağının dayanıklılığını ve merkeziyetsizliğini arttırır.

Eğer bir istemci sorun veya kırılganlıklar yaşıyorsa, diğer istemciler düzgün şekilde çalışmaya devam edebilirler, bu da tek başarısızlık noktasını engeller. Ek olarak çeşitli istemci uygulamaları inovasyon ve rekabeti teşvik eder, bu da gelişimi beraberinde getirir ve ekosistemdeki tekdüzelik riskini azaltır.

## Daha fazla kaynak {#further-reading}

- [Portal Ağı (Piper Merriam, Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Portal Ağı discord'u](https://discord.gg/CFFnmE7Hbs)
- [Portal Ağı web sitesi](https://www.ethportal.net/)
