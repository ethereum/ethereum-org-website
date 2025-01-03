---
title: Portal Ağı
description: Portal Ağı'na genel bir bakış - Düşük kaynaklı istemcilere destek olmak için tasarlanmış, geliştirme aşamasındaki bir ağ.
lang: tr
---

Ethereum, Ethereum istemci yazılımını çalıştıran bilgisayarlardan oluşan bir ağdır. Bu bilgisayarların her birine "düğüm" adı verilir. İstemci yazılımı, Ethereum ağında bir düğümün veriyi gönderip almasına olanak tanır ve veriyi Ethereum protokol kurallarına göre doğrular. Düğümler, geçmişe ait bir çok veriyi disk depolamalarında tutar ve ağdaki diğer düğümlerden, bloklar olarak bilinen yeni bilgi paketlerini alıp bu verilere ekler. Bu, bir düğümün ağın geri kalanı ile uyumlu olup olmadığını her zaman kontrol etmek için gereklidir. Bu, bir düğümü çalışırmak için çok fazla disk alanı gerekebileceği anlamına gelir. Bazı düğüm işlemleri ise çok fazla RAM gerektirebilir.

Bu disk depolama sorunuyla baş etmek için düğümlerin depolamayı kendileri yapması yerine, tam düğümlerden bilgi isteyen "hafif" düğümler geliştirilmiştir. Ancak bu, hafif düğümün bilgileri bağımsız şekilde doğrulamadığı, bunun yerine başka bir düğüme güvendiği anlamına gelir. Bu aynı zamanda, tam düğümlerin fazladan iş üstlenerek hafif düğümlere hizmet etmesi gerektiğini de ifade eder.

Portal Ağı, hafif düğümler için veriye erişilebilirlik problemini, gerekli verileri ağ genelinde küçük parçalar halinde paylaşarak tam düğümlere güvenmek veya ilave yük yüklemek zorunda kalmadan çözmeyi amaçlayan Ethereum'a yönelik yeni bir ağ tasarımıdır.

[Düğümler ve istemciler](/developers/docs/nodes-and-clients/) hakkında daha fazla bilgi

## Portal Ağına neden ihtiyacımız var? {#why-do-we-need-portal-network}

Ethereum düğümleri, ethereum blokzincirlerinde kendi tam veya kısmi kopyalarını saklar. Bu yerel kopya, işlemleri doğrulamak ve düğümün doğru zinciri izlediğinden emin olmak için kullanılır. Yerel olarak depolanan bu veriler, herhangi başka bir oluşuma güvenmeye ihtiyaç duymadan, düğümlerin gelen verilerin doğruluğunu ve geçerliliğini bağımsız olarak doğrulamasına imkan tanır.

Blokzincirin bu yerel kopyası ve ilişkili durum ve makbuz verileri, düğümün sabit diskinde çok fazla yer kaplar. Örneğin bir fikir birliği istemcisiyle eşleştirilmiş [Geth](https://geth.ethereum.org) kullanan bir düğümü çalıştırmak için 2 TB'lık bir sabit disk tavsiye edilir. Geth, yalnızca görece yeni bir blok seti üzerinden zincir verilerini depolayan anlık senkronizasyonu kullanarak genellikle yaklaşık 650 GB disk alanı kaplar ancak bu alan haftada yaklaşık 14 GB artar (düğümü periyodik olarak 650 GB'a indirebilirsiniz).

Bu, düğümleri çalıştırmanın yüksek maliyetli olduğu anlamına gelir; çünkü Ethereum için büyük bir disk alanı ayrılması gereklidir. Ethereum yol haritasında bu soruna yönelik [tarihin süresi dolması](/roadmap/statelessness/#history-expiry), [durumun süresi dolması](/roadmap/statelessness/#state-expiry) ve [durumsuzluk](/roadmap/statelessness/) gibi birkaç çözüm vardır. Ancak, bunların uygulamaya koyulmasına muhtemelen birkaç yıl daha vardır. Ayrıca, kendi zincir verisini kaydetmeyen ve ihtiyacı olan veriyi tam düğümlerden talep eden [hafif düğümler](/developers/docs/nodes-and-clients/light-clients/) de bulunmaktadır. Ancak bu, hafif düğümlerin dürüst veri sağlayabilmek için tam düğümlere güvenmesi gerektiği anlamına gelir ve hafif düğümlere ihtiyacı olan veriyi sunmak zorunda olan tam düğümlerde gerilim yaratır.

Portal Ağı, hafif düğümlerin verilerini alırken tam düğümlere güvenmek durumunda kalmasını veya tam düğümlerin üzerindeki iş yükünü önemli ölçüde arttırmasını gerektirmeyen alternatif bir yol sunmayı amaçlar. Bu, Ethereum düğümlerinin ağ genelinde veri paylaşmasına olanak tanıyan yeni bir yolu devreye alarak gerçekleştirilir.

## Portal Ağı nasıl çalışır? {#how-does-portal-network-work}

Ethereum düğümleri, birbirleriyle nasıl iletişim kuracaklarını tanımlayan katı protokollere sahiptir. Yürütüm istemcileri, [DevP2P](/developers/docs/networking-layer/#devp2p) olarak bilinen bir dizi alt protokol kullanarak iletişim kurarken, fikir birliği istemcileri [libP2P](/developers/docs/networking-layer/#libp2p) adlı farklı bir alt protokol yığınını kullanır. Bunlar, düğümler arasında iletilebilecek veri türlerini tanımlar.

![devP2P ve libP2P](portal-network-devp2p-libp2p.png)

Düğümler aynı zamanda, uygulamaların ve cüzdanların Ethereum düğümleri ile bilgi takası yaptığı [JSON-RPC API](/developers/docs/apis/json-rpc/) üzerinden belirli verileri sunabilir. Ancak bunların hiçbiri, hafif istemcilere veri sunmak için ideal protokoller değildir.

Hafif istemciler şu anda DevP2P ya da libP2p üzerinden belirli zincir verilerini talep edemez; çünkü bu protokoller, sadece blokların ve işlemlerin haberleşmesi ve zincir senkronizasyonu için tasarlanmıştır. Hafif istemciler bu bilgileri indirmek istemez; çünkü bu, onları "hafif" olmaktan çıkaracaktır.

JSON-RPC API, hafif istemci veri istekleri için de ideal bir seçim değildir. Çünkü belirli bir tam düğüm bağlantısına ya da veri sunabilen merkezi bir RPV sağlayıcısına bağımlıdır. Bu, hafif istemcinin söz konusu düğüme/sağlayıcıya dürüst davranacağı konusunda güvenmesi gerektiğini ifade eder ve aynı zamanda tam düğümün, birçok hafif istemciden gelen çok sayıda talebi de ele alması gerekebilir ve bu da bant genişliği gereksinimlerini arttırır.

Portal Ağı'nın amacı, bütün tasarımı yeniden düşünerek mevcut Ethereum istemcilerinin kısıtlanmış tasarımlarının dışında spesifik olarak hafiflik odaklı geliştirme yapmaktır.

Portal Ağı'nın ana fikri, [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (Bittorrent ile benzer) kullanarak hafif istemcilerin ihtiyaç duyduğu geçmiş veriler ve mevcut zincirin başının kimliği gibi bilgilerin, DevP2P tarzı hafif bir eşler arası merkezi olmayan ağ sunulmasını sağlayarak mevcut ağ yığınının en iyi parçalarını almaktır.

Altta yatan fikir, her bir düğüme toplam geçmiş Ethereum verilerinin küçük paarçalarını ve bazı spesifik düğüm sorumluluklarını eklemektir. Ardından istekler, talep edilen spesifik verileri depolayan düğümleri arar, bulur ve bu düğümlerden alır.

Bu, hafif istemcilerin tek bir düğüm bulduğu ve büyük hacimli verileri filtreleyip sunmalarının istendiği hafif düğümün normal modelini tersine çevirir; bunun yerine, küçük miktarda verinin işlendiği büyük bir düğüm ağını hızlıca filtreler.

Amaç, hafif Portal istemcilerinin oluşturduğu merkeziyetsiz bir ağın şunları yapmasına izin vermektir:

- zincirin başını izlemek
- son ve geçmiş zincir verilerini senkronize etmek
- durum verilerini almak
- işlemleri yayımlamak
- [EVM](/developers/docs/evm/) kullanarak işlemleri yürütmek

Bu ağ tasarımının faydaları şunlardır:

- merkezi sağlayıcılara olan bağımlılığı azaltmak
- Internet bant genişliği kullanımını azaltmak
- minimize edilmiş veya sıfır senkronizasyon
- Kaynak kısıtlaması olan cihazlara erişim (<1 GB RAM, <100 MB disk alanı, 1 CPU)

Aşağıdaki diyagram, Portal Ağı tarafından sunulabilecek mevcut istemcilerin işlevlerini gösterir ve kullanıcıların çok düşük kaynaklı cihazlardan bu işlevlere erişmesini sağlar.

![portal ağı tablosu](portal-network-table2.png)

## Varsayılan istemci çeşitliliği {#client-diversity-as-default}

Portal Ağı geliştiricileri aynı zamanda bir tasarım tercihinde bulunarak ilk günden itibaren üç ayrı Portal Ağı istemcisi geliştirme kararı almıştır.

Portal Ağı istemcileri:

- [Trin](https://github.com/ethereum/trin): Rust dilinde yazılmıştır
- [Nimbus](https://nimbus.team/docs/fluffy.html): Nim dilinde yazılmıştır
- [Trin](https://github.com/ethereumjs/ultralight): Typerscipt dilinde yazılmıştır
- [Shisui](https://github.com/GrapeBaBa/shisui): Go ile yazılmıştır

Birden fazla bağımsız istemci uygulamasına sahip olmak, Ethereum ağının dayanıklılığını ve merkeziyetsizliğini arttırır.

Eğer bir istemci sorun veya kırılganlıklar yaşıyorsa, diğer istemciler düzgün şekilde çalışmaya devam edebilirler, bu da tek başarısızlık noktasını engeller. Ek olarak çeşitli istemci uygulamaları inovasyon ve rekabeti teşvik eder, bu da gelişimi beraberinde getirir ve ekosistemdeki tekdüzelik riskini azaltır.

## Daha fazla bilgi {#futher-reading}

- [Portal Ağı (Devcon Bogota'daki Piper Merriam)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Portal Ağı discord](https://discord.gg/CFFnmE7Hbs)
- [Portal Ağı web sitesi](https://www.ethportal.net/)
