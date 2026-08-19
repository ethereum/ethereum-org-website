---
title: Dağıtık doğrulayıcı teknolojisi
description: Dağıtık doğrulayıcı teknolojisi, bir Ethereum doğrulayıcısının birden fazla tarafça dağıtık olarak çalıştırılmasını sağlar.
lang: tr
template: staking
sidebarDepth: 2
summaryPoints:
  - Bir doğrulayıcının imzalama anahtarını birden fazla makine ve operatör arasında bölerek tek hata noktalarını ortadan kaldırır
  - Bireysel donanım, yazılım veya operatör arızaları sırasında doğrulayıcıları çevrimiçi tutar
  - Günümüzde bireysel staker'lar, staking hizmetleri ve staking havuzları tarafından kullanılan üretim altyapısı
---

## Dağıtık doğrulayıcı teknolojisi nedir? {#what-is-dvt}

Dağıtık doğrulayıcı teknolojisi (DVT), tek hata noktalarını azaltmak ve doğrulayıcı dayanıklılığını artırmak için anahtar yönetimi ve imzalama sorumluluklarını birden fazla tarafa yayan bir doğrulayıcı güvenliği yaklaşımıdır.

DVT, bir doğrulayıcıyı güvence altına almak için kullanılan **özel anahtarı**, bir "küme" halinde organize edilmiş **birçok bilgisayar arasında bölerek** anahtar yönetimini ve imzalamayı dağıtır. Bunu yapmak, gerekli doğrulama işi her kümedeki makinelerin bir alt kümesi tarafından yapılabileceğinden, doğrulayıcı düğümünü aktif tutarken kümedeki bazı düğümlerin çevrimdışı olmasına izin verir. Bu dağıtım, tek hata noktalarını azaltarak doğrulayıcıyı daha sağlam hale getirir. DVT'nin imzalama dağıtımının ek bir faydası da, anahtarın tamamı tek bir makinede saklanmadığı için saldırganların anahtara erişmesini çok zorlaştırmasıdır.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

DVT, stake etmenin ayrı bir yolu değildir. Herhangi bir staking kurulumunun kullanabileceği bir yazılım katmanıdır:
- [Bireysel staker'lar](/staking/solo/) birlikte bir doğrulayıcı çalıştırmak için ekip kurabilir veya bireysel bir staker, bireysel staking kurulumuna dayanıklılık katmak için DVT'yi kullanabilir.
- [Staking hizmetleri](/staking/saas/) ve [staking havuzları](/staking/pools/), dayanıklılık katmak ve staking altyapılarını güçlendirmek veya doğrulayıcı operasyonlarını birçok bağımsız operatöre dağıtmak için DVT'yi kullanabilir.

## Neden DVT'ye ihtiyacımız var? {#why-do-we-need-dvt}

### Güvenlik {#security}

Doğrulayıcılar iki açık-özel anahtar çifti oluşturur: mutabakata katılmak için doğrulayıcı anahtarları ve fonlara erişmek için çekim anahtarları. Doğrulayıcılar çekim anahtarlarını soğuk depolamada güvence altına alabilirken, doğrulayıcı özel anahtarları, doğrulayıcıya günün her saati atanan onaylar ve blok teklifleri gibi görevleri imzalamak için 7/24 çevrimiçi olmalıdır. Bir anahtarı çevrimiçi tutmak onu hırsızlığa maruz bırakır ve DVT bu maruziyeti sınırlar: yalnızca anahtar payları çevrimiçi olur, anahtarın tamamı asla çevrimiçi olmaz.

Bir doğrulayıcı özel anahtarı ele geçirilirse, bir saldırgan doğrulayıcıyı kontrol edebilir ve bu da potansiyel olarak kesintiye veya staker'ın ETH'sinin kaybına yol açabilir. DVT bu riski azaltır. DVT ile orijinal, tam doğrulayıcı anahtarı şifrelenir ve anahtar paylarına bölünür. Anahtar payları, doğrulayıcıyı birlikte çalıştıran birden fazla düğüme dağıtılmış olarak çevrimiçi yaşarken, tam 'ana' anahtar güvenli bir şekilde çevrimdışı kalır. Bu dağıtım mümkündür çünkü [Ethereum](/) doğrulayıcıları toplanabilir BLS imzaları kullanır, yani tam anahtar bileşen parçalarının toplanmasıyla yeniden oluşturulabilir. Anahtar paylarıyla yapılan kısmi imzalar, tam anahtar için geçerli olan bir imzada birleşir, bu nedenle günlük imzalama için tam anahtarın kendisine asla ihtiyaç duyulmaz. Bir küme, dağıtık anahtar üretimi kullanarak yeni bir doğrulayıcı anahtarı oluşturduğunda, tam özel anahtar hiçbir zaman tek bir makinede bulunmaz.

### Tek hata noktası olmaması {#no-single-point-of-failure}

Bir doğrulayıcı birden fazla operatöre ve birden fazla makineye bölündüğünde, çevrimdışı olmadan bireysel donanım ve yazılım arızalarına dayanabilir. Arıza riski, bir kümedeki düğümler arasında çeşitli donanım ve yazılım yapılandırmaları kullanılarak da azaltılabilir. Çoklu operatör dağıtımı, tek düğümlü doğrulayıcı yapılandırmalarında yerel olarak mevcut değildir; DVT ara katman yazılımı katmanından gelir.

Bir kümedeki bir makinenin bileşenlerinden biri çökerse (örneğin, bir doğrulayıcı kümesinde dört operatör varsa ve biri hata içeren belirli bir istemci kullanıyorsa), diğerleri doğrulayıcının çalışmaya devam etmesini sağlayabilir.

### Merkeziyetsizlik {#decentralization}

Ethereum için ideal senaryo, mümkün olduğunca çok sayıda bağımsız olarak işletilen doğrulayıcıya sahip olmaktır. Ancak, birkaç staking sağlayıcısı çok popüler hale geldi ve ağdaki toplam stake edilen ETH'nin önemli bir bölümünü oluşturuyor. DVT, stake'in merkeziyetsizliğini korurken bu operatörlerin var olmasına izin verebilir. Bunun nedeni, her doğrulayıcı için anahtarların birçok makineye dağıtılmış olması ve bir doğrulayıcının kötü niyetli hale gelmesi için çok daha büyük bir gizli anlaşma gerektirmesidir.

DVT olmadan, staking sağlayıcılarının tüm doğrulayıcıları için yalnızca bir veya iki istemci yapılandırmasını desteklemesi daha kolaydır ve bu da bir istemci hatasının etkisini artırır. DVT, riski birden fazla istemci yapılandırmasına ve farklı donanımlara yaymak için kullanılabilir ve çeşitlilik yoluyla dayanıklılık yaratır.

**DVT, Ethereum'a aşağıdaki faydaları sunar:**

1. Ethereum'un Hisse Kanıtı (PoS) mutabakatının **merkeziyetsizliği**
2. Ağın **canlılığını** sağlar
3. Doğrulayıcı **hata toleransı** yaratır
4. **Güveni en aza indirilmiş** doğrulayıcı operasyonu
5. **En aza indirilmiş kesinti** ve kesinti süresi riskleri
6. **Çeşitliliği artırır** (istemci, veri merkezi, konum, düzenleme vb.)
7. Doğrulayıcı anahtar yönetiminin **gelişmiş güvenliği**

## DVT nasıl çalışır? {#how-does-dvt-work}

DVT uygulamaları tipik olarak bir kümedeki her makinede ek bir yazılım parçası olarak çalışır. Bu yazılım, bir düğümün doğrulayıcı istemcisi ile fikir birliği istemcisi arasında oturan ve doğrulayıcının görevlerinin toplu olarak imzalanması için kümedeki diğer düğümlerle koordine olan bir ara katman yazılımı görevi görür.

Bir DVT çözümü aşağıdaki bileşenleri içerir:

- **[Shamir'in gizli paylaşımı](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Doğrulayıcılar [BLS anahtarları](https://en.wikipedia.org/wiki/BLS_digital_signature) kullanır. Bir doğrulayıcı özel anahtarı birden fazla "anahtar payına" bölünebilir ve BLS imzaları toplanabilir olduğundan, bu anahtar paylarıyla yapılan kısmi imzalar, tam doğrulayıcı anahtarı için geçerli olan tek bir imzada birleştirilebilir.
- **[Eşik imza şeması](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - İmzalama görevleri için gereken bireysel anahtar paylarının sayısını belirler, örn. 4'te 3.
- **[Dağıtık anahtar üretimi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Anahtar paylarını oluşturan ve mevcut veya yeni bir doğrulayıcı anahtarının paylarını bir kümedeki düğümlere dağıtmak için kullanılan kriptografik süreç.
- **[Çok taraflı hesaplama (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Tam doğrulayıcı anahtarı, çok taraflı hesaplama kullanılarak gizli olarak oluşturulur. Tam anahtar hiçbir bireysel operatör tarafından bilinmez; onlar sadece kendi kısımlarını (kendi "paylarını") bilirler.
- **Mutabakat protokolü** - Mutabakat protokolü, blok teklifçisi olmak üzere bir düğüm seçer. Bloğu, anahtar paylarını toplu imzaya ekleyen kümedeki diğer düğümlerle paylaşırlar. Yeterli anahtar payı toplandığında, blok Ethereum'da teklif edilir.

Dağıtık doğrulayıcılar yerleşik hata toleransına sahiptir ve bazı bireysel düğümler çevrimdışı olsa bile çalışmaya devam edebilir. Doğrulayıcı düğümünün kümesi, içindeki bazı düğümlerin kötü niyetli veya tembel olduğu ortaya çıksa bile dayanıklıdır.

## Üretimde DVT {#dvt-in-production}

Dağıtık doğrulayıcılar bugün Ana Ağ üzerinde bireysel, hizmet ve havuzlu staking genelinde çalışmaktadır. İki ağ bu faaliyetin çoğunu oluşturmaktadır:

<ProductDisclaimer />

- **Obol**, bir makine kümesinin bir doğrulayıcıyı birlikte çalıştırmasına ("ekip staking'i") olanak tanıyan açık kaynaklı bir DVT ara katman istemcisi olan Charon'u geliştirir. Gruplar, dağıtık anahtar üretimi gerçekleştirir ve kümelerini Obol'un [DV Launchpad](https://docs.obol.org/learn/readme/launchpad)'i aracılığıyla yapılandırır. Obol kümeleri, Lido'nun Simple DVT modülü ve ev operatörlerini hata toleranslı kümelere dahil eden EtherFi'nin Operation Solo Staker programı da dahil olmak üzere [staking protokolleri](/staking/pools/) ve [staking hizmetleri](/staking/saas/) tarafından üretimde kullanılmaktadır.
- **SSV Network**, bağımsız düğüm operatörlerinden oluşan izinsiz bir ağdır. Bir doğrulayıcı anahtarı anahtar paylarına bölünür ve doğrulayıcının görevlerini toplu olarak yerine getiren seçilmiş bir operatör grubuna dağıtılır; hiçbir operatör tam anahtarı elinde tutmaz. Staking hizmetleri ve havuzları SSV üzerinde büyük doğrulayıcı setleri çalıştırır ve Obol gibi, Lido'nun Simple DVT modülü tarafından kullanılır.

## DVT kullanım durumları {#dvt-use-cases}

DVT'nin daha geniş staking endüstrisi için önemli etkileri vardır:

### Bireysel staker'lar {#solo-stakers}

DVT, **ekip staking'ini** mümkün kılar: arkadaşlar, topluluk üyeleri veya bir launchpad aracılığıyla koordine edilen yabancılar gibi küçük bir grup insanın, kendi makinelerinde toplu olarak tek bir doğrulayıcı çalıştırması. Doğrulayıcının görevlerini yerine getirebilmesi için grubun bir eşiğinin (örneğin, 4'te 3'ü) çevrimiçi olması gerekir, bu nedenle hiçbir üyenin kesinti süresi, donanım arızası veya hatası doğrulayıcıyı çevrimdışı yapmaz. Anahtar, dağıtık anahtar üretimi ile oluşturulduğunda, hiçbir üye tam imzalama anahtarını elinde tutmaz.

DVT ayrıca, tam anahtarı tamamen çevrimdışı tutarken doğrulayıcı anahtarınızı uzak düğümlere dağıtmanıza izin vererek gözetimsiz staking'i mümkün kılar. Bu, staker'ların kendi donanımlarını çalıştırmalarına gerek olmadığı anlamına gelir ve anahtar paylarını dağıtmak potansiyel hack'lere karşı korunmaya yardımcı olur.

### Hizmet olarak staking (SaaS) {#saas}

Birçok doğrulayıcıyı yöneten operatörler (staking havuzları ve kurumsal staker'lar gibi) risklerini azaltmak için DVT'yi kullanabilir. Altyapılarını dağıtarak operasyonlarına yedeklilik katabilir ve kullandıkları donanım türlerini çeşitlendirebilirler.

DVT, anahtar yönetimi sorumluluğunu birden fazla düğüm arasında paylaştırır, bu da bazı operasyonel maliyetlerin de paylaşılabileceği anlamına gelir. DVT ayrıca staking sağlayıcıları için operasyonel riski ve sigorta maliyetlerini azaltabilir.

### Staking havuzları {#staking-pools}

Standart doğrulayıcı kurulumları nedeniyle, kazançlar ve kayıplar havuz genelinde sosyalleştirildiğinden, staking havuzları ve likit staking sağlayıcıları tarihsel olarak her bir operatöre önemli ölçüde güvenmek zorundaydı. Ayrıca imzalama anahtarlarını korumak için operatörlere güveniyorlardı çünkü DVT'ye kadar onlar için başka bir seçenek yoktu.

Geleneksel olarak stake'leri birden fazla operatöre dağıtarak riski yayma çabaları gösterilse de, her operatör hala önemli bir stake'i bağımsız olarak yönetmektedir. Tek bir operatöre güvenmek, düşük performans göstermeleri, kesinti yaşamaları, ele geçirilmeleri veya kötü niyetli davranmaları durumunda büyük riskler oluşturur.

DVT'den yararlanarak, her bir operatörden beklenen güven azaltılabilir. **Havuzlar, operatörlerin doğrulayıcı anahtarlarının gözetimine ihtiyaç duymadan stake tutmalarını sağlayabilir** (çünkü yalnızca anahtar payları kullanılır). Ayrıca yönetilen stake'lerin daha fazla operatör arasında dağıtılmasına olanak tanır (örneğin, 1000 doğrulayıcıyı yöneten tek bir operatöre sahip olmak yerine, DVT bu doğrulayıcıların birden fazla operatör tarafından toplu olarak çalıştırılmasını sağlar). Çeşitli operatör yapılandırmaları, bir operatörün çökmesi durumunda diğerlerinin hala onay verebilmesini sağlamaya yardımcı olur. Ortaya çıkan yedeklilik ve çeşitlendirme, ödülleri en üst düzeye çıkarırken daha iyi performans ve dayanıklılığa yol açabilir.

Tek operatör güvenini en aza indirmenin bir başka yararı da, staking havuzlarının daha açık ve izinsiz operatör katılımına izin verebilmesidir. Bazı staking havuzları bunu bugün üretimde yapmaktadır. Çoklu operatörlü DVT kümeleri, protokollerin ev staker'larını ve daha küçük operatörleri daha büyük profesyonel olanlarla eşleştirmesine olanak tanıyarak, seçilmiş ve izinsiz operatör setlerini birleştirir.

## DVT kullanmanın potansiyel dezavantajları {#potential-drawbacks-of-using-dvt}

- **Ek bileşen** - bir DVT düğümü sunmak, muhtemelen hatalı veya savunmasız olabilecek başka bir parça ekler. Bu, tıpkı fikir birliği ve yürütme katmanları için birden fazla istemci olduğu gibi, DVT yazılımının birden fazla uygulamasına sahip olarak hafifletilir.
- **Operasyonel maliyetler** - DVT doğrulayıcıyı birden fazla taraf arasında dağıttığından, yalnızca tek bir düğüm yerine operasyon için daha fazla düğüm gerekir ve bu da artan işletme maliyetlerine yol açar.
- **Potansiyel olarak artan gecikme** - DVT, bir doğrulayıcıyı çalıştıran birden fazla düğüm arasında mutabakat sağlamak için bir mutabakat protokolü kullandığından, potansiyel olarak artan gecikmeye neden olabilir.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Stake etmek için DVT'ye ihtiyacım var mı?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Hayır. Bir doğrulayıcı istemcisi çalıştıran tek bir makine, herhangi bir DVT yazılımı olmadan çalışır ve bu yaygın bir ev staking kurulumu olmaya devam etmektedir. DVT, hata toleransı ekleyen ve tek hata noktalarını ortadan kaldıran isteğe bağlı bir katmandır. Bu, doğrulayıcınızın bireysel makinelerin arızalarından kurtulmasını istiyorsanız veya bir doğrulayıcı çalıştırma sorumluluğunu başkalarıyla paylaşmak istiyorsanız yararlıdır.
</ExpandableCard>

<ExpandableCard title="DVT, ETH'mi veya çekim anahtarlarımı böler mi?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Hayır. DVT yalnızca onaylar ve blok teklifleri gibi mutabakat görevleri için kullanılan doğrulayıcı _imzalama_ anahtarını böler. Stake'iniz her zaman doğrulayıcı için ayarlanan ve DVT'den etkilenmeyen çekim adresi tarafından kontrol edilir. Pectra yükseltmesinden bu yana, çekim adresi sahibi, imzalama anahtarına hiç ihtiyaç duymadan doğrudan yürütme katmanından bir doğrulayıcı çıkışını da tetikleyebilir.
</ExpandableCard>

<ExpandableCard title="Bir kümedeki düğümler çevrimdışı olursa ne olur?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Bir düğüm eşiği çevrimiçi kaldığı sürece (örneğin, 4'te 3'ü), doğrulayıcı görevlerini yerine getirmeye devam eder. Aynı anda çok fazla düğüm çevrimdışı olursa, doğrulayıcı basitçe çevrimdışı olur ve yeterli düğüm dönene kadar ödülleri kaçırır, tıpkı herhangi bir çevrimdışı doğrulayıcı gibi. Çevrimdışı olmak ceza kesintisi gerektiren bir suç değildir.
</ExpandableCard>

<ExpandableCard title="Bir küme 4'te 3 olmak zorunda mı?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Hayır. "4'te 3" sadece en küçük yaygın yapılandırmadır ve bu sayfa boyunca bir örnek olarak kullanılmıştır. Küme boyutu ve imzalama eşiği, küme oluşturulduğunda seçilir.

Kümeler genellikle eşik, düğümlerin üçte ikilik bir süper çoğunluğu olacak şekilde boyutlandırılır, bu da kümenin hatalı veya çevrimdışı üyeleri tolere ederken imzalamaya devam etmesini sağlayan şeydir. 4 düğümlü bir küme 3 ile imzalar ve 1 hatayı tolere eder; 7 düğüm 5 ile imzalar ve 2'yi tolere eder; 10 düğüm 7 ile imzalar ve 3'ü tolere eder. Daha büyük kümeler, çalıştırılacak daha fazla makine ve aralarında daha fazla koordinasyon pahasına daha fazla hata toleransı satın alır.

[Küme boyutu ve dayanıklılık hakkında daha fazlası](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="DVT, havuzlu staking ile aynı şey mi?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Hayır. Havuzlu staking, doğrulayıcıları finanse etmek için birçok kişiden gelen ETH'yi birleştirir ve [stake etmenin yollarından](/staking/) birkaçından biridir. DVT, bir doğrulayıcıyı _çalıştırmak_ için bir altyapıdır. Bir doğrulayıcının imzalamasını birden fazla makineye ve operatöre dağıtır. İkisi birbirini tamamlayıcıdır; birçok havuz operatör setlerini dağıtmak için DVT kullanır, ancak DVT'nin kendisi kimsenin ETH'sini havuzda toplamaz.
</ExpandableCard>

## Daha fazla okuma {#further-reading}

- [Ethereum Dağıtık Doğrulayıcı Teknolojisi (DVT) - Tam Giriş](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [DVT nedir ve Ethereum'da staking'i nasıl geliştirir?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Ethereum dağıtık doğrulayıcı özellikleri (üst düzey)](https://github.com/ethereum/distributed-validator-specs)
- [Ethereum dağıtık doğrulayıcı teknik özellikleri](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Obol belgeleri](https://docs.obol.org/)
- [SSV Network belgeleri](https://docs.ssv.network/)
- [Lido Simple DVT Modülü](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Shamir gizli paylaşım demo uygulaması](https://iancoleman.io/shamir/)