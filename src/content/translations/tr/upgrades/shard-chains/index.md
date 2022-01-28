---
title: Parça Zincirleri  (Shard Chains)
description: Ethereum'a daha fazla işlem kapasitesi sağlayan ve çalışmasını kolaylaştıran ağ bölümleri - parça zincirleri hakkında bilgi edinin.
lang: tr
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Parçalama (sharding) Ethereum'un ölçeklenebilirliğini ve kapasitesini geliştirecek çok aşamalı bir yükseltmedir.
summaryPoint2: Parça zincirleri ağın yükünü 64 yeni zincir üzerine dağıtırlar.
summaryPoint3: Donanım gereksinimlerini düşük tutarak bir düğümü çalıştırmayı kolaylaştırırlar.
summaryPoint4: Bu yükseltme ana ağ ile işaret zincirinin birleşmesini takip edecek şekilde planlanmıştır.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Parça zincirleri, <a href="/upgrades/merge/">birleştirme</a> sonrasında işin ne kadar hızlı ilerlediğine bağlı olarak 2023'de gönderilmelidir. Bu parçalar, Ethereum'a verileri depolamak ve bunlara erişmek için daha fazla kapasite sağlayacak, ancak kod yürütmek için kullanılmayacak. Detayları hala öğrenim aşamasında.
</UpgradeStatus>

## Parçalama nedir? {#what-is-sharding}

Parçalama, yükü dağıtmak için bir veritabanını yatay olarak bölme işlemidir - bu bilgisayar biliminde yaygın bir kavramdır. Ethereum bağlamında, parçalama ağ tıkanıklığını azaltacak ve "Parça” olarak bilinen yeni zincirler oluşturarak saniyedeki işlemleri artıracaktır.

Bu ölçekleme dışında sebepler için önemlidir.

## Parçalamanın özellikleri {#features-of-sharding}

### Herkes bir düğüm çalıştırabilir {#everyone-can-run-a-node}

Parçalama, işleri merkezi olmayan bir şekilde tutmak istiyorsanız ölçeklendirmenin iyi bir yoludur, çünkü alternatif olarak mevcut veritabanının boyutunu artırarak ölçeklendirebilirsiniz. Bu, Ethereum'u ağ doğrulayıcıları için daha az erişilebilir hale getirir çünkü güçlü ve pahalı bilgisayarlara ihtiyaç duyarlar. Parça zincirlerinde, doğrulayıcıların ağın tamamı için değil, yalnızca doğruladıkları parça için veri depolaması / çalıştırması gerekir (bugün olduğu gibi). Bu, işleri hızlandırır ve donanım gereksinimlerini büyük ölçüde azaltır.

### Daha fazla ağ katılımı {#more-network-participation}

Parçalama, sonunda Ethereum'u kişisel bir dizüstü bilgisayarda veya telefonda çalıştırmanıza izin verecektir. Yani parçalanmış bir Ethereum'a daha fazla insan katılabilmeli veya [istemcileri](/developers/docs/nodes-and-clients/) çalıştırabilmelidir. Bu, güvenliği artıracaktır çünkü ağ ne kadar merkeziyetsiz olursa, saldırı yüzey alanı o kadar küçük olur.

Daha düşük donanım gereksinimleri ile parçalama, herhangi bir aracı hizmete güvenmeden [istemcileri](/developers/docs/nodes-and-clients/) kendi başınıza çalıştırmanızı kolaylaştıracaktır. Ve yapabiliyorsanız, birden fazla istemci çalıştırmayı düşünebilirsiniz. Bu, hata sayılarını daha da azaltarak ağ sağlığına yardımcı olabilir. [Bir Eth2 istemcisi çalıştırma](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  İlk olarak, Eth2 istemcinizle aynı anda bir ana ağ istemcisi çalıştırmanız gerekecektir. <a href="https://launchpad.ethereum.org" target="_blank">Başlatma panosu</a>, donanım gereksinimleri ve süreç boyunca size yol gösterecektir. Alternatif olarak bir <a href="/developers/docs/apis/backend/#available-libraries">arka uç API'si</a> kullanabilirsiniz.
</InfoBanner>

## Parça zincirleri sürüm 1: veri kullanılabilirliği {#data-availability}

İlk parça zincirleri gönderildiğinde, ağa yalnızca fazladan veri sağlayacaklar. İşlemleri veya akıllı sözleşmeleri işlemezler. Ama hala toplamlar birleştirildiklerinde saniye başına işlemlerde inanılmaz iyileştirmeler sunuyor.

Toplamlar, bugün var olan bir "2. katman" teknolojisidir. Merkeziyetsiz uygulamaların işlemleri zincir dışı tek bir işlemde paketlemesine veya "toparlamasına", kriptografik bir kanıt oluşturmasına ve ardından bunu zincire sunmasına izin verir. Bu, bir işlem için gereken veri ihtiyacını azaltır. Bunu, parçalar tarafından sağlanan tüm ekstra veri kullanılabilirliğiyle birleştirin ve saniyede 100.000 işlem elde edin.

<InfoBanner isWarning={false}>
  Katman 2 ölçekleme çözümü araştırma ve geliştirmesindeki son ilerleme göz önüne alındığında, bu durum, parça zincirlerinden önce birleştirme yükseltmesine öncelik verilmesini sağlamıştır. Bunlar, ana ağdan hisse kanıtına geçişin ardından odak noktası olacaktır.

[Toplamalar hakkında daha fazla bilgi](/developers/docs/scaling/layer-2-rollups/)
</InfoBanner>

## Parça zincirleri versiyon 2: kod yürütme {#code-execution}

Plan her zaman parçalara ekstra işlevsellik eklemek, onları bugünkü [Ethereum Mainnet](/glossary/#mainnet)'e daha çok benzetmekti. Bu, akıllı sözleşmeleri saklamalarına ve yürütmelerine ve hesapları yönetmelerine olanak tanır. Ancak sürüm 1 parçalarının sağladığı saniye başına işlem artışı dikkate alındığında, bunun yine de olması gerekiyor mu? Bu hala toplulukta tartışılıyor ve birkaç seçenek var gibi görünüyor

### Parçaların kod çalıştırmaya ihtiyacı var mı? {#do-shards-need-code-execution}

Vitalik Buterin, Bankless podcast ile konuşurken tartışmaya değer 3 potansiyel seçenek sundu.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. İşlem yürütmenin gerek olmadığı durum {#state-execution-not-needed}

Bu, parçalara akıllı sözleşmelerle başa çıkma ve onları veri depoları olarak bırakma yeteneği vermediğimiz anlamına gelir.

#### 2. İşlem yürüten bazı parçaların mevcut olması {#some-execution-shards}

Belki de daha akıllı olmak için tüm parçaların (şu anda 64'ü planlanmıştır) ihtiyacımız olmadığı bir uzlaşma vardır. Bu işlevi birkaçına ekleyip gerisini bırakabiliriz. Bu, teslimatı hızlandırabilir.

#### 3. Zero Knowledge (ZK) kıvılcımlarını yapana kadar beklemeliyiz {#wait-for-zk-snarks}

Son olarak, belki de bu tartışmayı ZK kıvılcımları patladığında tekrar gözden geçirmeliyiz. Bu, ağa gerçekten özel işlemler getirmeye yardımcı olabilecek bir teknolojidir. Daha akıllı parçalara ihtiyaç duymaları muhtemeldir, ancak hala araştırma ve geliştirme aşamasındalar.

#### Diğer kaynaklar {#other-sources}

İşte aynı bağlamda biraz daha düşünme:

- [Birinci Aşama Tamamlandı: Eth2 veri kullanılabilirliği motoru olarak ](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8)-_cdetrio,ethrear.ch_

Bu hala aktif bir tartışma noktasıdır. Daha fazlasını öğrendikten sonra bu sayfaları güncelleyeceğiz.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Eth2 yükseltmelerinin tamamı bir şekilde ilişkilidir. O halde, parça zincirlerinin diğer yükseltmelerle nasıl ilişkilendirildiğini özetleyelim.

### Parçalar (shards) ve işaret (beacon) zinciri {#shards-and-beacon-chain}

İşaret Zinciri, parçaları güvenli ve senkronize tutmak için tüm mantığı içerir. İşaret Zinciri, ağdaki stakerları koordine edecek ve onları üzerinde çalışmaları gereken parçalara atayacaktır. Ayrıca, diğer parçalar(shard) tarafından erişilebilen parça(shard)işlem verilerini alarak ve depolayarak parçalar (shard) arasındaki iletişimi kolaylaştıracaktır. Bu, her şeyi güncel tutmak için parçalara Ethereum'un durumunun bir anlık görüntüsünü verecektir.

<ButtonLink to="/upgrades/beacon-chain/">İşaret (Beacon) Zinciri</ButtonLink>

### Parçalar ve Birleştirme {#shards-and-docking}

Ek parçalar eklendiğinde, Ethereum Mainnet, stake kanıtı kullanılarak Beacon Chain tarafından zaten güvence altına alınmış olacaktır. Bu, ölçeklenebilirliği güçlendiren katman 2 çözümleriyle desteklenen verimli bir ana ağın parça zincirleri oluşturmasını sağlar.

Ana ağın, kod yürütmeyi gerçekleştirebilecek tek "akıllı" parça olarak var olup olmayacağı görülecektir - ancak her iki durumda da, parçaları genişletme kararı gerektiğinde yeniden gözden geçirilebilir.

<div>
  <ButtonLink to="/eth2/merge/">Birleştirme</ButtonLink>
</div>

<Divider />

### Daha fazla oku {#read-more}

<ShardChainsList />
