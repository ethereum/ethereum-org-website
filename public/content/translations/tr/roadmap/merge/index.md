---
title: Birleşme
description: Birleşme hakkında bilgi edinin - Ethereum Ana Ağı'nın Hisse Kanıtı'na (PoS) geçtiği zaman.
lang: tr
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Ethereum Ana Ağı Hisse Kanıtı (PoS) kullanır, ancak bu her zaman böyle değildi."
  - "Orijinal İş Kanıtı (PoW) mekanizmasından Hisse Kanıtı'na (PoS) geçiş güncellemesine Birleşme adı verildi."
  - "Birleşme, orijinal Ethereum Ana Ağı'nın İşaret Zinciri adı verilen ayrı bir Hisse Kanıtı (PoS) blokzinciri ile birleşerek artık tek bir zincir olarak var olmasını ifade eder."
  - "Birleşme, Ethereum'un enerji tüketimini yaklaşık %99,95 oranında azalttı."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Birleşme 15 Eylül 2022'de gerçekleştirildi. Bu, Ethereum'un Hisse Kanıtı (PoS) mutabakatına geçişini tamamladı, İş Kanıtı'nı (PoW) resmi olarak kullanımdan kaldırdı ve enerji tüketimini yaklaşık %99,95 oranında azalttı.
</UpgradeStatus>

## Birleşme neydi? {#what-is-the-merge}

Birleşme, Ethereum'un orijinal yürütme katmanının ([başlangıçtan](/ethereum-forks/#frontier) beri var olan Ana Ağ) yeni Hisse Kanıtı (PoS) mutabakat katmanı olan İşaret Zinciri ile birleşmesiydi. Enerji yoğun madencilik ihtiyacını ortadan kaldırdı ve bunun yerine ağın stake edilmiş ETH kullanılarak güvence altına alınmasını sağladı. Daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlik olan [Ethereum](/) vizyonunu gerçekleştirme yolunda gerçekten heyecan verici bir adımdı.

<MergeInfographic />

Başlangıçta, [İşaret Zinciri](/roadmap/beacon-chain/) [Ana Ağ](/glossary/#mainnet)'dan ayrı olarak yayınlandı. Ethereum Ana Ağı - tüm hesapları, bakiyeleri, akıllı sözleşmeleri ve blokzincir durumu ile birlikte - İşaret Zinciri [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) kullanarak paralel olarak çalışırken bile [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) ile güvence altına alınmaya devam etti. Birleşme, bu iki sistemin nihayet bir araya geldiği ve İş Kanıtı'nın kalıcı olarak Hisse Kanıtı ile değiştirildiği zamandı.

Ethereum'u yıldızlararası bir yolculuğa tam olarak hazır olmadan fırlatılan bir uzay gemisi olarak hayal edin. İşaret Zinciri ile topluluk yeni bir motor ve güçlendirilmiş bir gövde inşa etti. Kapsamlı testlerden sonra, uçuşun ortasında yeni motoru eskisiyle değiştirmenin zamanı gelmişti. Bu, yeni ve daha verimli motoru mevcut gemiyle birleştirerek onun ciddi ışık yılları kat etmesini ve evrene meydan okumasını sağladı.

## Ana Ağ ile Birleşme {#merging-with-mainnet}

İş Kanıtı (PoW), başlangıçtan Birleşme'ye kadar Ethereum Ana Ağı'nı güvence altına aldı. Bu, hepimizin alışkın olduğu Ethereum blokzincirinin Temmuz 2015'te tüm tanıdık özellikleriyle (işlemler, akıllı sözleşmeler, hesaplar vb.) var olmasını sağladı.

Ethereum'un tarihi boyunca geliştiriciler, İş Kanıtı'ndan Hisse Kanıtı'na nihai bir geçiş için hazırlandılar. 1 Aralık 2020'de İşaret Zinciri, Ana Ağ'a paralel olarak çalışan ayrı bir blokzincir olarak oluşturuldu.

İşaret Zinciri başlangıçta Ana Ağ işlemlerini işlemiyordu. Bunun yerine, aktif doğrulayıcılar ve onların hesap bakiyeleri üzerinde anlaşarak kendi durumu üzerinde mutabakata varıyordu. Kapsamlı testlerden sonra, İşaret Zinciri'nin gerçek dünya verileri üzerinde mutabakata varma zamanı gelmişti. Birleşme'den sonra İşaret Zinciri, yürütme katmanı işlemleri ve hesap bakiyeleri dahil olmak üzere tüm ağ verileri için mutabakat motoru haline geldi.

Birleşme, blok üretiminin motoru olarak İşaret Zinciri'ni kullanmaya resmi geçişi temsil ediyordu. Madencilik artık geçerli bloklar üretmenin bir aracı değildir. Bunun yerine, Hisse Kanıtı doğrulayıcıları bu rolü üstlenmiştir ve artık tüm işlemlerin geçerliliğini işlemekten ve bloklar önermekten sorumludur.

Birleşme'de hiçbir geçmiş kaybolmadı. Ana Ağ, İşaret Zinciri ile birleşirken, Ethereum'un tüm işlem geçmişini de birleştirdi.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Hisse Kanıtı'na (PoS) olan bu geçiş, Ether'in ihraç edilme şeklini değiştirdi. [Birleşme öncesi ve sonrası Ether ihracı](/roadmap/merge/issuance/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

### Kullanıcılar ve sahipler {#users-holders}

**Birleşme, sahipler/kullanıcılar için hiçbir şeyi değiştirmedi.**

_Bunu tekrarlamakta fayda var_: Ethereum'daki ETH veya başka herhangi bir dijital varlığın kullanıcısı veya sahibi olarak ve ayrıca düğüm çalıştırmayan staker'lar olarak, **Birleşme için fonlarınızla veya cüzdanınızla hiçbir şey yapmanıza gerek yoktur.** ETH sadece ETH'dir. "Eski ETH"/"yeni ETH" veya "Eth1"/"Eth2" diye bir şey yoktur ve cüzdanlar Birleşme'den sonra da tıpkı daha önce olduğu gibi çalışır; size aksini söyleyen kişiler muhtemelen dolandırıcıdır.

İş Kanıtı'nın (PoW) değiştirilmesine rağmen, Ethereum'un başlangıçtan bu yana tüm geçmişi bozulmadan kaldı ve Hisse Kanıtı'na (PoS) geçişten etkilenmedi. Birleşme'den önce cüzdanınızda tutulan tüm fonlara Birleşme'den sonra da erişilebilir. **Güncelleme için sizin tarafınızdan herhangi bir işlem yapılması gerekmez.**

[Ethereum güvenliği hakkında daha fazla bilgi](/security/#eth2-token-scam)

### Düğüm operatörleri ve dapp geliştiricileri {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Önemli eylem öğeleri şunları içerir:

1. _Hem_ bir fikir birliği istemcisi hem de bir yürütme istemcisi çalıştırın; yürütme verilerini elde etmek için üçüncü taraf uç noktaları Birleşme'den bu yana artık çalışmamaktadır.
2. Güvenli bir şekilde iletişim kurabilmeleri için hem yürütme hem de fikir birliği istemcilerinin kimliğini paylaşılan bir JWT sırrı ile doğrulayın.
3. Kazandığınız işlem ücreti bahşişlerini/MEV'i almak için bir `fee recipient` adresi belirleyin.

Yukarıdaki ilk iki öğeyi tamamlamamak, her iki katman da eşzamanlanana ve kimlikleri doğrulanana kadar düğümünüzün "çevrimdışı" olarak görünmesine neden olacaktır.

Bir `fee recipient` belirlememek, doğrulayıcınızın her zamanki gibi davranmasına izin vermeye devam edecektir, ancak yakılmamış ücret bahşişlerini ve aksi takdirde doğrulayıcınızın önerdiği bloklarda kazanacağınız herhangi bir MEV'i kaçıracaksınız.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Birleşme'ye kadar, ağ tarafından dedikodusu yapılan blokları almak, düzgün bir şekilde doğrulamak ve yaymak için bir yürütme istemcisi (Go Ethereum (Geth), Erigon, Besu veya Nethermind gibi) yeterliydi. _Birleşme'den sonra_, bir yürütme yükü içinde yer alan işlemlerin geçerliliği artık içinde bulunduğu "mutabakat bloğunun" geçerliliğine de bağlıdır.

Sonuç olarak, tam bir Ethereum düğümü artık hem bir yürütme istemcisi hem de bir fikir birliği istemcisi gerektirir. Bu iki istemci, yeni bir Engine API kullanarak birlikte çalışır. Engine API, güvenli iletişime izin vererek her iki istemciye de sağlanan bir JWT sırrı kullanılarak kimlik doğrulaması gerektirir.

Önemli eylem öğeleri şunları içerir:

- Bir yürütme istemcisine ek olarak bir fikir birliği istemcisi kurun
- Birbirleriyle güvenli bir şekilde iletişim kurabilmeleri için yürütme ve fikir birliği istemcilerinin kimliğini paylaşılan bir JWT sırrı ile doğrulayın.

Yukarıdaki öğeleri tamamlamamak, her iki katman da eşzamanlanana ve kimlikleri doğrulanana kadar düğümünüzün "çevrimdışı" görünmesine neden olacaktır.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Birleşme, mutabakat kurallarında değişikliklerle geldi ve bu aynı zamanda şunlarla ilgili değişiklikleri de içerir:

<ul>
  <li>blok yapısı</li>
  <li>slot/blok zamanlaması</li>
  <li>işlem kodu değişiklikleri</li>
  <li>zincir içi rastgelelik kaynakları</li>
  <li><em>güvenli başlık (safe head)</em> ve <em>kesinleşmiş bloklar</em> kavramı</li>
</ul>

Daha fazla bilgi için, Tim Beiko'nun <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Birleşme'nin Ethereum'un Uygulama Katmanını Nasıl Etkilediği</a> hakkındaki bu blog yazısına göz atın.

</ExpandableCard>

## Birleşme ve enerji tüketimi {#merge-and-energy}

Birleşme, Ethereum için İş Kanıtı'nın (PoW) sonunu işaret etti ve daha sürdürülebilir, çevre dostu bir Ethereum çağını başlattı. Ethereum'un enerji tüketimi tahmini olarak %99,95 oranında düşerek Ethereum'u yeşil bir blokzincir haline getirdi. [Ethereum enerji tüketimi](/energy-consumption/) hakkında daha fazla bilgi edinin.

## Birleşme ve ölçeklendirme {#merge-and-scaling}

Birleşme ayrıca, İş Kanıtı (PoW) altında mümkün olmayan daha fazla ölçeklenebilirlik yükseltmesi için zemin hazırlayarak Ethereum'u [yol haritasının](/roadmap/) inşa ettiği tam ölçek, güvenlik ve sürdürülebilirliğe ulaşmaya bir adım daha yaklaştırdı.

## Birleşme hakkındaki yanlış bilinenler {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

İki tür Ethereum düğümü vardır: blok önerebilen düğümler ve öneremeyen düğümler.

Blok öneren düğümler, Ethereum'daki toplam düğümlerin yalnızca küçük bir kısmıdır. Bu kategori, İş Kanıtı (PoW) altındaki madencilik düğümlerini ve Hisse Kanıtı (PoS) altındaki doğrulayıcı düğümleri içerir. Bu kategori, ara sıra bir sonraki bloğu önerme ve protokol ödülleri kazanma yeteneği karşılığında ekonomik kaynakların (İş Kanıtı'nda GPU hash gücü veya Hisse Kanıtı'nda stake edilmiş ETH gibi) taahhüt edilmesini gerektirir.

Ağdaki diğer düğümlerin (yani çoğunluğun), 1-2 TB kullanılabilir depolama alanına ve internet bağlantısına sahip tüketici sınıfı bir bilgisayarın ötesinde herhangi bir ekonomik kaynak taahhüt etmesi gerekmez. Bu düğümler blok önermezler, ancak yeni blokları dinleyerek ve ağ mutabakat kurallarına göre geldiklerinde geçerliliklerini doğrulayarak tüm blok önericilerini sorumlu tutarak ağı güvence altına almada hala kritik bir rol oynarlar. Blok geçerliyse, düğüm onu ağ üzerinden yaymaya devam eder. Blok herhangi bir nedenle geçersizse, düğüm yazılımı onu geçersiz sayar ve yayılmasını durdurur.

Blok üretmeyen bir düğüm çalıştırmak, her iki mutabakat mekanizması (İş Kanıtı veya Hisse Kanıtı) altında herkes için mümkündür; imkanları varsa tüm kullanıcılar için <em>şiddetle tavsiye edilir</em>. Bir düğüm çalıştırmak Ethereum için son derece değerlidir ve çalıştıran herhangi bir bireye gelişmiş güvenlik, gizlilik ve sansür direnci gibi ek faydalar sağlar.

Herkesin kendi düğümünü çalıştırabilmesi, Ethereum ağının merkeziyetsizliğini korumak için <em>kesinlikle gereklidir</em>.

[Kendi düğümünüzü çalıştırma hakkında daha fazla bilgi](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gaz ücretleri, ağın kapasitesine göre ağ talebinin bir ürünüdür. Birleşme, mutabakat için Hisse Kanıtı'na (PoS) geçerek İş Kanıtı'nın (PoW) kullanımını kullanımdan kaldırdı, ancak ağ kapasitesini veya işlem kapasitesini doğrudan etkileyen hiçbir parametreyi önemli ölçüde değiştirmedi.

<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">Rollup merkezli bir yol haritası</a> ile çabalar, kullanıcı etkinliğini [katman 2 (L2)](/layer-2/)'de ölçeklendirmeye odaklanırken, katman 1 (L1) Ana Ağı'nı Rollup işlemlerini katlanarak daha ucuz hale getirmeye yardımcı olmak için Rollup veri depolaması için optimize edilmiş güvenli bir merkeziyetsiz uzlaşma katmanı olarak etkinleştiriyor. Hisse Kanıtı'na geçiş, bunu gerçekleştirmenin kritik bir öncüsüdür. [Gaz ve ücretler hakkında daha fazla bilgi.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
Bir işlemin "hızı", bir bloğa dahil edilme süresi ve kesinleşme süresi dahil olmak üzere birkaç yolla ölçülebilir. Bunların her ikisi de biraz değişir, ancak kullanıcıların fark edeceği bir şekilde değil.

Tarihsel olarak, İş Kanıtı'nda (PoW) hedef her ~13,3 saniyede bir yeni bir bloğa sahip olmaktı. Hisse Kanıtı (PoS) altında, slot'lar tam olarak her 12 saniyede bir gerçekleşir ve bunların her biri bir doğrulayıcının bir blok yayınlaması için bir fırsattır. Çoğu slot'ta bloklar bulunur, ancak hepsinde olması gerekmez (örneğin, bir doğrulayıcı çevrimdışıdır). Hisse Kanıtı'nda bloklar, İş Kanıtı'na göre yaklaşık %10 daha sık üretilir. Bu oldukça önemsiz bir değişiklikti ve kullanıcılar tarafından fark edilmesi pek olası değildir.

Hisse Kanıtı, daha önce var olmayan işlem kesinliği kavramını tanıttı. İş Kanıtı'nda, bir bloğu tersine çevirme yeteneği, bir işlemin üzerine çıkarılan her geçen blokla katlanarak daha da zorlaşır, ancak asla tam olarak sıfıra ulaşmaz. Hisse Kanıtı altında bloklar, doğrulayıcıların oy kullandığı dönemler (bloklar için 32 şans içeren 6,4 dakikalık zaman dilimleri) halinde paketlenir. Bir dönem sona erdiğinde, doğrulayıcılar dönemin 'gerekçelendirilmiş' sayılıp sayılmayacağına oy verirler. Doğrulayıcılar dönemi gerekçelendirmeyi kabul ederse, bir sonraki dönemde kesinleşmiş olur. Kesinleşmiş işlemleri geri almak, toplam stake edilmiş ETH'nin üçte birinden fazlasını elde etmeyi ve yakımını gerektireceğinden ekonomik olarak uygulanamazdır.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Birleşme'den hemen sonra, staker'lar yalnızca blok önerileri sonucunda kazanılan ücret bahşişlerine ve MEV'e erişebiliyordu. Bu ödüller, doğrulayıcı tarafından kontrol edilen (<em>ücret alıcısı</em> olarak bilinen) stake edilmeyen bir hesaba yatırılır ve anında kullanılabilir. Bu ödüller, doğrulayıcı görevlerini yerine getirmek için verilen protokol ödüllerinden ayrıdır.

Şanghay/Capella ağ yükseltmesinden bu yana, staker'lar artık herhangi bir fazla staking bakiyesinin (protokol ödüllerinden gelen 32'nin üzerindeki ETH) otomatik ödemelerini almaya başlamak için bir <em>çekim adresi</em> belirleyebilirler. Bu yükseltme ayrıca bir doğrulayıcının ağdan çıkış yapması üzerine tüm bakiyesinin kilidini açma ve geri alma yeteneğini de etkinleştirdi.

[Staking çekim işlemleri hakkında daha fazla bilgi](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Şanghay/Capella yükseltmesi çekim işlemlerini etkinleştirdiğinden, doğrulayıcılar 32 ETH'nin üzerindeki staking bakiyelerini çekmeye teşvik edilir, çünkü bu fonlar getiriye katkıda bulunmaz ve aksi takdirde kilitli kalır. APR'ye (stake edilen toplam ETH tarafından belirlenir) bağlı olarak, tüm bakiyelerini geri almak için doğrulayıcılarından çıkış yapmaya veya daha fazla getiri elde etmek için ödüllerini kullanarak potansiyel olarak daha da fazla stake etmeye teşvik edilebilirler.

Burada önemli bir uyarı, tam doğrulayıcı çıkışları protokol tarafından oranla sınırlandırılmıştır ve dönem başına (her 6,4 dakikada bir) yalnızca belirli sayıda doğrulayıcı çıkış yapabilir. Bu sınır, aktif doğrulayıcıların sayısına bağlı olarak dalgalanır, ancak tek bir günde ağdan çıkış yapılabilecek toplam stake edilmiş ETH'nin yaklaşık %0,33'üne denk gelir.

Bu, stake edilmiş fonların toplu bir şekilde çıkışını önler. Ayrıca, stake edilen toplam ETH'nin büyük bir kısmına erişimi olan potansiyel bir saldırganın, protokol kesinti cezasını uygulamadan önce aynı dönemde kesinti gerektiren bir suç işlemesini ve suç işleyen tüm doğrulayıcı bakiyelerinden çıkış yapmasını/çekim yapmasını önler.

APR ayrıca kasıtlı olarak dinamiktir ve staker'lardan oluşan bir pazarın ağı güvence altına almaya yardımcı olmak için ne kadar ödeme almaya istekli olduklarını dengelemelerine olanak tanır. Oran çok düşükse, doğrulayıcılar protokol tarafından sınırlandırılan bir oranda çıkış yapacaktır. Bu, kademeli olarak kalan herkes için APR'yi yükseltecek ve yeni veya geri dönen staker'ları bir kez daha çekecektir.
</ExpandableCard>

## 'Eth2'ye ne oldu? {#eth2}

'Eth2' terimi kullanımdan kaldırılmıştır. 'Eth1' ve 'Eth2'yi tek bir zincirde birleştirdikten sonra, artık iki Ethereum ağı arasında ayrım yapmaya gerek yoktur; sadece Ethereum vardır.

Kafa karışıklığını sınırlamak için topluluk bu terimleri güncelledi:

- 'Eth1' artık işlemleri ve yürütmeyi yöneten 'yürütme katmanı'dır.
- 'Eth2' artık Hisse Kanıtı (PoS) mutabakatını yöneten 'mutabakat katmanı'dır.

Bu terminoloji güncellemeleri yalnızca adlandırma kurallarını değiştirir; bu, Ethereum'un hedeflerini veya yol haritasını değiştirmez.

['Eth2'nin yeniden adlandırılması hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum yükseltmelerinin tümü birbiriyle bir şekilde ilişkilidir. Öyleyse Birleşme'nin diğer yükseltmelerle nasıl ilişkili olduğunu özetleyelim.

### Birleşme ve İşaret Zinciri {#merge-and-beacon-chain}

Birleşme, İşaret Zinciri'nin orijinal Ana Ağ yürütme katmanına yeni mutabakat katmanı olarak resmi olarak benimsenmesini temsil eder. Birleşme'den bu yana, doğrulayıcılar Ethereum Ana Ağı'nı güvence altına almak için atanmıştır ve [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) üzerinde madencilik artık geçerli bir blok üretim aracı değildir.

Bloklar bunun yerine, mutabakata katılma hakkı karşılığında ETH stake etmiş doğrulayıcı düğümler tarafından önerilir. Bu yükseltmeler, parça zinciri (sharding) dahil olmak üzere gelecekteki ölçeklenebilirlik yükseltmeleri için zemin hazırlar.

<ButtonLink href="/roadmap/beacon-chain/">
  İşaret Zinciri
</ButtonLink>

### Birleşme ve Şanghay yükseltmesi {#merge-and-shanghai}

Hisse Kanıtı'na (PoS) başarılı bir geçişe odaklanmayı basitleştirmek ve en üst düzeye çıkarmak için Birleşme yükseltmesi, stake edilmiş ETH'yi çekim yeteneği gibi beklenen bazı özellikleri içermiyordu. Bu işlevsellik, Şanghay/Capella yükseltmesi ile ayrı olarak etkinleştirildi.

Merak edenler için, Nisan 2021 ETHGlobal etkinliğinde Vitalik tarafından sunulan [Birleşme'den Sonra Ne Olacak](https://youtu.be/7ggwLccuN5s?t=101) hakkında daha fazla bilgi edinin.

### Birleşme ve parça zinciri (sharding) {#merge-and-data-sharding}

Başlangıçta plan, ölçeklenebilirliği ele almak için Birleşme'den önce parça zinciri (sharding) üzerinde çalışmaktı. Ancak, [katman 2 (L2) ölçeklendirme çözümlerinin](/layer-2/) patlamasıyla birlikte öncelik, ilk olarak İş Kanıtı'nı (PoW) Hisse Kanıtı (PoS) ile değiştirmeye kaydı.

Parça zinciri (sharding) planları hızla gelişiyor, ancak işlem yürütmeyi ölçeklendirmek için katman 2 (L2) teknolojilerinin yükselişi ve başarısı göz önüne alındığında, parça zinciri planları, ağ kapasitesinde üstel büyümeye izin vererek Rollup sözleşmelerinden sıkıştırılmış çağrı verisi depolama yükünü dağıtmanın en uygun yolunu bulmaya kaydı. Bu, ilk olarak Hisse Kanıtı'na (PoS) geçiş yapılmadan mümkün olmazdı.

<ButtonLink href="/roadmap/danksharding/">
  Parça Zinciri (Sharding)
</ButtonLink>

## Daha fazla bilgi {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />