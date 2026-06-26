---
title: "Portal Ağı"
description: "Portal Ağına genel bakış - düşük kaynaklı istemcileri desteklemek için tasarlanmış, geliştirilmekte olan bir ağ."
lang: tr
---

[Ethereum](/), Ethereum istemci yazılımını çalıştıran bilgisayarlardan oluşan bir ağdır. Bu bilgisayarların her birine 'düğüm' adı verilir. İstemci yazılımı, bir düğümün Ethereum ağında veri gönderip almasına olanak tanır ve verileri Ethereum protokol kurallarına göre doğrular. Düğümler, disk depolama alanlarında çok fazla geçmiş veri tutar ve ağdaki diğer düğümlerden blok olarak bilinen yeni bilgi paketleri aldıklarında bunlara ekleme yaparlar. Bu, bir düğümün ağın geri kalanıyla tutarlı bilgilere sahip olup olmadığını her zaman kontrol etmek için gereklidir. Bu, bir düğüm çalıştırmanın çok fazla disk alanı gerektirebileceği anlamına gelir. Bazı düğüm işlemleri çok fazla RAM de gerektirebilir.

Bu disk depolama sorununun üstesinden gelmek için, tüm bilgileri kendileri depolamak yerine tam düğümlerden bilgi talep eden 'hafif' düğümler geliştirilmiştir. Ancak bu, hafif düğümün bilgileri bağımsız olarak doğrulamadığı ve bunun yerine başka bir düğüme güvendiği anlamına gelir. Ayrıca, tam düğümlerin bu hafif düğümlere hizmet vermek için ekstra iş üstlenmesi gerektiği anlamına gelir.

Portal Ağı, gerekli verileri ağ genelinde küçük parçalar halinde paylaşarak, tam düğümlere güvenmek veya onlara ekstra yük bindirmek zorunda kalmadan "hafif" düğümler için veri kullanılabilirliği sorununu çözmeyi amaçlayan Ethereum için yeni bir ağ tasarımıdır.

[Düğümler ve istemciler](/developers/docs/nodes-and-clients/) hakkında daha fazlası

## Neden Portal Ağına ihtiyacımız var? {#why-do-we-need-portal-network}

Ethereum düğümleri, Ethereum blokzincirinin kendi tam veya kısmi kopyasını depolar. Bu yerel kopya, işlemleri doğrulamak ve düğümün doğru zinciri takip ettiğinden emin olmak için kullanılır. Yerel olarak depolanan bu veriler, düğümlerin başka hiçbir varlığa güvenmeye gerek duymadan gelen verilerin geçerli ve doğru olduğunu bağımsız olarak doğrulamasına olanak tanır.

Blokzincirin bu yerel kopyası ve ilişkili durum ile makbuz verileri, düğümün sabit diskinde çok fazla yer kaplar. Örneğin, bir fikir birliği istemcisiyle eşleştirilmiş [Geth](https://geth.ethereum.org) kullanarak bir düğüm çalıştırmak için 2 TB'lık bir sabit disk önerilir. Yalnızca nispeten yeni bir blok kümesinden zincir verilerini depolayan snap eşzamanlamasını kullanarak, Geth tipik olarak yaklaşık 650 GB disk alanı kaplar ancak haftada yaklaşık 14 GB büyür (düğümü periyodik olarak budayarak tekrar 650 GB'a düşürebilirsiniz).

Bu, düğümleri çalıştırmanın pahalı olabileceği anlamına gelir, çünkü Ethereum'a büyük miktarda disk alanı ayrılması gerekir. Ethereum yol haritasında bu soruna yönelik [geçmiş sonlanması](/roadmap/statelessness/#history-expiry), [durum zaman aşımı](/roadmap/statelessness/#state-expiry) ve [durumsuzluk](/roadmap/statelessness/) dahil olmak üzere çeşitli çözümler bulunmaktadır. Ancak, bunların uygulanmasına muhtemelen daha birkaç yıl vardır. Ayrıca, zincir verilerinin kendi kopyasını kaydetmeyen, ihtiyaç duydukları verileri tam düğümlerden talep eden [hafif düğümler](/developers/docs/nodes-and-clients/light-clients/) de vardır. Ancak bu, hafif düğümlerin dürüst veriler sağlaması için tam düğümlere güvenmesi gerektiği ve aynı zamanda hafif düğümlerin ihtiyaç duyduğu verileri sunması gereken tam düğümleri strese soktuğu anlamına gelir.

Portal Ağı, hafif düğümlerin verilerini elde etmeleri için tam düğümlere güvenmeyi veya tam düğümlerin yapması gereken işi önemli ölçüde artırmayı gerektirmeyen alternatif bir yol sağlamayı amaçlamaktadır. Bunun yapılma şekli, Ethereum düğümlerinin ağ genelinde veri paylaşması için yeni bir yol sunmaktır.

## Portal Ağı nasıl çalışır? {#how-does-portal-network-work}

Ethereum düğümleri, birbirleriyle nasıl iletişim kuracaklarını tanımlayan katı protokollere sahiptir. Yürütme istemcileri [devp2p](/developers/docs/networking-layer/#devp2p) olarak bilinen bir dizi alt protokol kullanarak iletişim kurarken, fikir birliği istemcileri [libp2p](/developers/docs/networking-layer/#libp2p) adı verilen farklı bir alt protokol yığını kullanır. Bunlar, düğümler arasında aktarılabilecek veri türlerini tanımlar.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Düğümler ayrıca, uygulamaların ve cüzdanların Ethereum düğümleriyle bilgi takas etme yolu olan [JSON-RPC API](/developers/docs/apis/json-rpc/) aracılığıyla belirli verileri sunabilir. Ancak bunların hiçbiri hafif istemcilere veri sunmak için ideal protokoller değildir.

Hafif istemciler şu anda devp2p veya libp2p üzerinden belirli zincir verisi parçalarını talep edemezler çünkü bu protokoller yalnızca zincir eşzamanlamasını ve blokların ve işlemlerin dedikodu yöntemiyle yayılmasını sağlamak için tasarlanmıştır. Hafif istemciler bu bilgileri indirmek istemezler çünkü bu onların "hafif" olmalarını engeller.

JSON-RPC API de hafif istemci veri talepleri için ideal bir seçim değildir, çünkü verileri sunabilen belirli bir tam düğüme veya merkezi RPC sağlayıcısına bağlantıya dayanır. Bu, hafif istemcinin o belirli düğümün/sağlayıcının dürüst olduğuna güvenmesi gerektiği ve ayrıca tam düğümün birçok hafif istemciden gelen çok sayıda isteği işlemesi gerekebileceği ve bunun da bant genişliği gereksinimlerini artıracağı anlamına gelir.

Portal Ağının amacı, mevcut Ethereum istemcilerinin tasarım kısıtlamalarının dışında, özellikle hafiflik için inşa ederek tüm tasarımı yeniden düşünmektir.

Portal Ağının temel fikri, geçmiş veriler ve zincirin mevcut başının kimliği gibi hafif istemcilerin ihtiyaç duyduğu bilgilerin, bir [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (Bittorrent'e benzer) kullanılarak hafif bir devp2p tarzı eşler arası merkeziyetsiz ağ üzerinden sunulmasını sağlayarak mevcut ağ yığınının en iyi kısımlarını almaktır.

Fikir, toplam geçmiş Ethereum verilerinin küçük parçalarını ve bazı belirli düğüm sorumluluklarını her düğüme eklemektir. Daha sonra istekler, talep edilen belirli verileri depolayan düğümler aranarak ve onlardan alınarak sunulur.

Bu, hafif düğümlerin tek bir düğüm bulup onlardan büyük hacimli verileri filtrelemelerini ve sunmalarını talep ettiği normal modeli tersine çevirir; bunun yerine, her biri küçük miktarlarda veriyi işleyen büyük bir düğüm ağını hızla filtrelerler.

Amaç, hafif Portal istemcilerinden oluşan merkeziyetsiz bir ağın şunları yapmasına izin vermektir:

- zincirin başını takip etmek
- yeni ve geçmiş zincir verilerini eşzamanlamak
- durum verilerini almak
- işlemleri yayınlamak
- [EVM](/developers/docs/evm/) kullanarak işlemleri yürütmek

Bu ağ tasarımının faydaları şunlardır:

- merkezi sağlayıcılara olan bağımlılığı azaltmak
- İnternet bant genişliği kullanımını azaltmak
- Minimize edilmiş veya sıfır eşzamanlama
- Kaynak kısıtlı cihazlar için erişilebilir (\<1 GB RAM, \<100 MB disk alanı, 1 CPU)

Aşağıdaki tablo, Portal Ağı tarafından sunulabilen mevcut istemcilerin işlevlerini göstererek kullanıcıların bu işlevlere çok düşük kaynaklı cihazlarda erişmesini sağlar.

### Portal Ağları {#the-portal-networks}

| İşaret hafif istemcisi | Durum ağı | İşlem dedikodusu | Geçmiş ağı | Kurallı İşlem Endeksi |
| ------------------- | ---------------------------- | ------------------- | --------------- | ------------------- |
| İşaret zinciri hafif | Hesap ve sözleşme depolama | Hafif bellek havuzu | Başlıklar | TxHash > Hash, Endeks |
| Protokol verileri | | | Blok gövdeleri | |
| | | | Makbuzlar | |

## Varsayılan olarak istemci çeşitliliği {#client-diversity-as-default}

Portal Ağı geliştiricileri ayrıca ilk günden itibaren dört ayrı Portal Ağı istemcisi oluşturma tasarım seçimini yaptılar.

Portal Ağı istemcileri şunlardır:

- [Trin](https://github.com/ethereum/trin): Rust ile yazılmıştır
- [Fluffy](https://fluffy.guide): Nim ile yazılmıştır
- [Ultralight](https://github.com/ethereumjs/ultralight): TypeScript ile yazılmıştır
- [Shisui](https://github.com/zen-eth/shisui): Go ile yazılmıştır

Birden fazla bağımsız istemci uygulamasına sahip olmak, Ethereum ağının dayanıklılığını ve merkeziyetsizliğini artırır.

Bir istemci sorunlar veya güvenlik açıkları yaşarsa, diğer istemciler sorunsuz çalışmaya devam ederek tek bir hata noktasını önleyebilir. Ek olarak, çeşitli istemci uygulamaları yeniliği ve rekabeti teşvik ederek iyileştirmeleri yönlendirir ve ekosistem içindeki monokültür riskini azaltır.

## Daha fazla bilgi {#further-reading}

- [Portal Ağı (Devcon Bogota'da Piper Merriam)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Portal Ağı Discord'u](https://discord.gg/CFFnmE7Hbs)
- [Portal Ağı web sitesi](https://www.ethportal.net/)