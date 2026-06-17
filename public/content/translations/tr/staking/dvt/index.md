---
title: Dağıtık doğrulayıcı teknolojisi
description: Dağıtık doğrulayıcı teknolojisi, bir Ethereum doğrulayıcısının birden fazla tarafça dağıtık olarak çalıştırılmasını sağlar.
lang: tr
---

Dağıtık doğrulayıcı teknolojisi (DVT), tek hata noktalarını azaltmak ve doğrulayıcı dayanıklılığını artırmak için anahtar yönetimi ve imzalama sorumluluklarını birden fazla tarafa yayan bir doğrulayıcı güvenliği yaklaşımıdır.

Bunu, bir doğrulayıcıyı güvence altına almak için kullanılan **özel anahtarı**, bir "küme" halinde organize edilmiş **birçok bilgisayar arasında bölerek** yapar. Bunun faydası, saldırganların anahtara erişmesini çok zorlaştırmasıdır, çünkü anahtarın tamamı tek bir makinede saklanmaz. Ayrıca, gerekli imzalama işlemi her kümedeki makinelerin bir alt kümesi tarafından yapılabileceğinden, bazı düğümlerin çevrimdışı olmasına da olanak tanır. Bu, ağdaki tek hata noktalarını azaltır ve tüm doğrulayıcı setini daha sağlam hale getirir.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Neden DVT'ye ihtiyacımız var? {#why-do-we-need-dvt}

### Güvenlik {#security}

Doğrulayıcılar iki genel-özel anahtar çifti üretir: mutabakata katılmak için doğrulayıcı anahtarları ve fonlara erişmek için çekim anahtarları. Doğrulayıcılar çekim anahtarlarını soğuk depolamada güvence altına alabilirken, doğrulayıcı özel anahtarları 7/24 çevrimiçi olmalıdır. Bir doğrulayıcı özel anahtarı ele geçirilirse, bir saldırgan doğrulayıcıyı kontrol edebilir ve bu da potansiyel olarak ceza kesintisine veya staker'ın ETH'sinin kaybına yol açabilir. DVT bu riski azaltmaya yardımcı olabilir. İşte şu şekilde:

Staker'lar, DVT kullanarak doğrulayıcı özel anahtarını soğuk depolamada tutarken staking'e katılabilirler. Bu, orijinal, tam doğrulayıcı anahtarının şifrelenmesi ve ardından anahtar paylarına bölünmesiyle elde edilir. Anahtar payları çevrimiçi olarak bulunur ve doğrulayıcının dağıtık çalışmasını sağlayan birden fazla düğüme dağıtılır. Bu mümkündür çünkü [Ethereum](/) doğrulayıcıları toplanabilir BLS imzaları kullanır, yani tam anahtar, bileşen parçalarının toplanmasıyla yeniden oluşturulabilir. Bu, staker'ın tam, orijinal 'ana' doğrulayıcı anahtarını güvenli bir şekilde çevrimdışı tutmasını sağlar.

### Tek hata noktalarının olmaması {#no-single-point-of-failure}

Bir doğrulayıcı birden fazla operatör ve birden fazla makineye bölündüğünde, çevrimdışı olmadan bireysel donanım ve yazılım arızalarına dayanabilir. Arıza riski, bir kümedeki düğümler arasında çeşitli donanım ve yazılım yapılandırmaları kullanılarak da azaltılabilir. Bu dayanıklılık, tek düğümlü doğrulayıcı yapılandırmalarında mevcut değildir; DVT katmanından gelir.

Bir kümedeki bir makinenin bileşenlerinden biri çökerse (örneğin, bir doğrulayıcı kümesinde dört operatör varsa ve biri hata içeren belirli bir istemci kullanıyorsa), diğerleri doğrulayıcının çalışmaya devam etmesini sağlar.

### Merkeziyetsizlik {#decentralization}

Ethereum için ideal senaryo, mümkün olduğunca çok sayıda bağımsız olarak işletilen doğrulayıcıya sahip olmaktır. Ancak, birkaç staking sağlayıcısı çok popüler hale gelmiştir ve ağdaki toplam stake edilen ETH'nin önemli bir bölümünü oluşturmaktadır. DVT, stake merkeziyetsizliğini korurken bu operatörlerin var olmasına izin verebilir. Bunun nedeni, her bir doğrulayıcı için anahtarların birçok makineye dağıtılmış olması ve bir doğrulayıcının kötü niyetli hale gelmesi için çok daha büyük bir gizli anlaşma gerektirmesidir.

DVT olmadan, staking sağlayıcılarının tüm doğrulayıcıları için yalnızca bir veya iki istemci yapılandırmasını desteklemesi daha kolaydır, bu da bir istemci hatasının etkisini artırır. DVT, riski birden fazla istemci yapılandırmasına ve farklı donanımlara yaymak için kullanılabilir ve çeşitlilik yoluyla dayanıklılık yaratır.

**DVT, Ethereum'a aşağıdaki faydaları sunar:**

1. Ethereum'un Hisse Kanıtı (PoS) mutabakatının **merkeziyetsizliği**
2. Ağın **canlılığını** sağlar
3. Doğrulayıcı **hata toleransı** yaratır
4. **Güveni minimize edilmiş** doğrulayıcı operasyonu
5. **Minimize edilmiş ceza kesintisi** ve kesinti süresi riskleri
6. **Çeşitliliği artırır** (istemci, veri merkezi, konum, düzenleme vb.)
7. Doğrulayıcı anahtar yönetiminin **gelişmiş güvenliği**

## DVT nasıl çalışır? {#how-does-dvt-work}

Bir DVT çözümü aşağıdaki bileşenleri içerir:

- **[Shamir'in gizli paylaşımı](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Doğrulayıcılar [BLS anahtarları](https://en.wikipedia.org/wiki/BLS_digital_signature) kullanır. Bireysel BLS "anahtar payları" ("key shares") tek bir birleştirilmiş anahtarda (imza) birleştirilebilir. DVT'de, bir doğrulayıcı için özel anahtar, kümedeki her operatörün birleştirilmiş BLS imzasıdır.
- **[Eşik imza şeması](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - İmzalama görevleri için gereken bireysel anahtar paylarının sayısını belirler, örn. 4'te 3.
- **[Dağıtık anahtar üretimi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Anahtar paylarını üreten ve mevcut veya yeni bir doğrulayıcı anahtarının paylarını bir kümedeki düğümlere dağıtmak için kullanılan kriptografik süreç.
- **[Çok partili hesaplama (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Tam doğrulayıcı anahtarı, çok partili hesaplama kullanılarak gizli bir şekilde üretilir. Tam anahtar hiçbir zaman bireysel bir operatör tarafından bilinmez; onlar sadece kendi kısımlarını (kendi "paylarını") bilirler.
- **Mutabakat protokolü** - Mutabakat protokolü, blok teklifçisi olmak üzere bir düğüm seçer. Bloğu, anahtar paylarını birleşik imzaya ekleyen kümedeki diğer düğümlerle paylaşırlar. Yeterli anahtar payı birleştirildiğinde, blok Ethereum'da teklif edilir.

Dağıtık doğrulayıcılar yerleşik hata toleransına sahiptir ve bazı bireysel düğümler çevrimdışı olsa bile çalışmaya devam edebilir. Bu, içindeki bazı düğümlerin kötü niyetli veya tembel olduğu ortaya çıksa bile kümenin dayanıklı olduğu anlamına gelir.

## DVT kullanım durumları {#dvt-use-cases}

DVT'nin daha geniş staking endüstrisi için önemli etkileri vardır:

### Bireysel staker'lar {#solo-stakers}

DVT ayrıca, tam anahtarı tamamen çevrimdışı tutarken doğrulayıcı anahtarınızı uzak düğümlere dağıtmanıza izin vererek gözetimsiz staking'i mümkün kılar. Bu, ev staker'larının donanım için harcama yapmasına gerek olmadığı anlamına gelirken, anahtar paylarını dağıtmak onları potansiyel hack'lere karşı güçlendirmeye yardımcı olabilir.

### Hizmet olarak staking (SaaS) {#saas}

Birçok doğrulayıcıyı yöneten operatörler (staking havuzları ve kurumsal staker'lar gibi) risklerini azaltmak için DVT kullanabilir. Altyapılarını dağıtarak, operasyonlarına yedeklilik ekleyebilir ve kullandıkları donanım türlerini çeşitlendirebilirler.

DVT, anahtar yönetimi sorumluluğunu birden fazla düğüm arasında paylaştırır, bu da bazı operasyonel maliyetlerin de paylaşılabileceği anlamına gelir. DVT ayrıca staking sağlayıcıları için operasyonel riski ve sigorta maliyetlerini azaltabilir.

### Staking havuzları {#staking-pools}

Standart doğrulayıcı kurulumları nedeniyle, kazançlar ve kayıplar havuz genelinde sosyalleştirildiğinden, staking havuzları ve likit staking sağlayıcıları değişen seviyelerde tek operatör güvenine sahip olmak zorundadır. Ayrıca, imzalama anahtarlarını korumak için operatörlere bağımlıdırlar çünkü şimdiye kadar onlar için başka bir seçenek yoktu.

Geleneksel olarak riskleri birden fazla operatöre dağıtarak yayma çabaları gösterilse de, her operatör hala önemli bir stake'i bağımsız olarak yönetmektedir. Tek bir operatöre güvenmek, düşük performans göstermeleri, kesinti yaşamaları, ele geçirilmeleri veya kötü niyetli davranmaları durumunda büyük riskler oluşturur.

DVT'den yararlanarak, operatörlerden beklenen güven önemli ölçüde azaltılır. **Havuzlar, operatörlerin doğrulayıcı anahtarlarının gözetimine ihtiyaç duymadan stake tutmalarını sağlayabilir** (çünkü yalnızca anahtar payları kullanılır). Ayrıca, yönetilen stake'lerin daha fazla operatör arasında dağıtılmasına olanak tanır (örn. 1000 doğrulayıcıyı yöneten tek bir operatöre sahip olmak yerine, DVT bu doğrulayıcıların birden fazla operatör tarafından toplu olarak çalıştırılmasını sağlar). Çeşitli operatör yapılandırmaları, bir operatörün çökmesi durumunda diğerlerinin hala onaylama yapabilmesini sağlayacaktır. Bu, ödülleri en üst düzeye çıkarırken daha iyi performans ve dayanıklılığa yol açan yedeklilik ve çeşitlilik ile sonuçlanır.

Tek operatör güvenini en aza indirmenin bir başka yararı da, staking havuzlarının daha açık ve izinsiz operatör katılımına izin verebilmesidir. Bunu yaparak, hizmetler risklerini azaltabilir ve örneğin ev staker'larını veya daha küçük staker'ları daha büyük olanlarla eşleştirerek hem küratörlü hem de izinsiz operatör setlerini kullanarak Ethereum merkeziyetsizliğini destekleyebilir.

## DVT kullanmanın potansiyel dezavantajları {#potential-drawbacks-of-using-dvt}

- **Ek bileşen** - bir DVT düğümü eklemek, muhtemelen hatalı veya savunmasız olabilecek başka bir parça ekler. Bunu hafifletmenin bir yolu, bir DVT düğümünün birden fazla uygulaması için çabalamaktır, yani birden fazla DVT istemcisi (mutabakat ve yürütme katmanları için birden fazla istemci olması gibi).
- **Operasyonel maliyetler** - DVT doğrulayıcıyı birden fazla taraf arasında dağıttığından, operasyon için yalnızca tek bir düğüm yerine daha fazla düğüm gerekir, bu da artan işletme maliyetlerini beraberinde getirir.
- **Potansiyel olarak artan gecikme** - DVT, bir doğrulayıcıyı çalıştıran birden fazla düğüm arasında mutabakat sağlamak için bir mutabakat protokolü kullandığından, potansiyel olarak artan gecikmeye neden olabilir.

## Daha Fazla Okuma {#further-reading}

- [Ethereum dağıtık doğrulayıcı spesifikasyonları (üst düzey)](https://github.com/ethereum/distributed-validator-specs)
- [Ethereum dağıtık doğrulayıcı teknik spesifikasyonları](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir gizli paylaşım demo uygulaması](https://iancoleman.io/shamir/)