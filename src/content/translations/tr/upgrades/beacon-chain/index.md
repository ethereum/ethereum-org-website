---
title: İşaret Zinciri
description: Hisse ispatını Ethereum'a tanıtan yükseltme olan İşaret Zinciri hakkında bilgi edinin.
lang: tr
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: İşaret Zinciri kullanmakta olduğumuz Ethereum ile ilgili hiçbir şeyi değiştirmez.
summaryPoint2: Mutabakat katmanı görevi görerek ağı koordine eder.
summaryPoint3: Hisse ispatı modelini Ethereum ekosisteminde uygulamaya koydu.
summaryPoint4: Bunu teknik yol haritalarından "Aşama 0" olarak biliyor olabilirsiniz.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    İşaret (Beacon) Zinciri 1 Aralık saat 12:00'de (UTC) başlatılmıştır. Daha fazla bilgi için, bk. <a href="https://beaconscan.com/">verileri keşfet</a>. Zincirin doğrulanmasına yardımcı olmak isterseniz, <a href="/staking/">ETH'nizi stake edebilirsiniz</a>.
</UpgradeStatus>

## İşaret (Beacon) Zinciri Ne Yapar? {#what-does-the-beacon-chain-do}

İşaret Zinciri, [parçalardan](/upgrades/sharding/) ve [stake edenlerden](/staking/) oluşan genişletilmiş ağı yönetir veya koordine eder. Ancak günümüzün [Ethereum ana ağı](/glossary/#mainnet) gibi olmayacaktır. Hesapları veya akıllı sözleşmeleri ele alamaz.

İşaret Zincirinin rolü zamanla değişecek ancak [geliştirmeye çalıştığımız güvenli, sürdürülebilir ve ölçeklenebilir Ethereum](/upgrades/vision/) için temel bir bileşendir.

## İşaret (Beacon) Zinciri özellikleri {#beacon-chain-features}

### Staking ile Tanışın {#introducing-staking}

İşaret (Beacon) Zinciri Ethereum'a [pay ispatını](/developers/docs/consensus-mechanisms/pos/) getirir. Bu Ethereum'u güvenli kılmaya yardımcı olmak üzere size sunulan yeni bir imkândır. Ethereum'u daha sağlıklı kılacak ve bu süreç içinde size daha fazla ETH kazandıracak bir kamu emtiası olarak görün. Uygulamada, doğrulayıcı yazılımı etkinleştirmek için ETH stake etmenizi sağlar. Doğrulayıcı olarak işlemleri gerçekleştirir ve zincirde yeni bloklar oluşturursunuz.

Paydaşlık ve doğrulayıcı oluşturmak [madencilik](/developers/docs/mining/) faaliyetinden daha kolaydır (şu anda ağ bu şekilde korunmaktadır). Ethereum'u uzun vadede daha güvenli kılmanıza yardımcı olması umulmaktadır. Ağa ne kadar kişi katılırsa o kadar merkeziyetsiz ve saldırıya karşı güvenli hale gelir.

<InfoBanner emoji=":money_bag:">
Bir doğrulayıcı olarak İşaret Zincirinin güvenliğine yardımcı olmak istiyorsanız <a href="/staking/">stake etme konusunda daha fazla bilgi alın</a>.
</InfoBanner>

Bu ayrıca başka bir yükseltme için de önemli bir değişikliktir: [parça zincirleri](/upgrades/sharding/).

### Shard zincirleri kurulumu {#setting-up-for-shard-chains}

Mainnet, İşaret Zinciri ile birleştikten sonra bir sonraki yükseltme ile iş ispatı ağına parça zincirleri giriş yapacak. Bu "parçalar", ağın kapasitesini ve ağı 64 blokzincir olarak genişleterek işlem hızını artıracaktır. İşaret (Beacon) Zinciri shard zincirlerinin sunulmasındaki önemli ilk adımdır, zira güvenli çalışmaları için paydaşlık gerektirir.

Sonuç olarak İşaret (Beacon) Zinciri shard zincirlerini doğrulamak üzere rasgele staker'lar atanmasından da sorumlu olacaktır. Staker'lar için işbirliği yapmayı ve shard'ı devralmayı zorlaştırmanın anahtarı da budur. Başka deyişle bu [trilyon şansta 1'den az](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20) anlamına gelir.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum yükseltmelerinin tamamı bir şekilde ilişkilidir. İşaret (Beacon) Zincirinin diğer yükseltmeleri nasıl etkilediğini özetleyelim.

### Mainnet ve İşaret Zinciri {#mainnet-and-beacon-chain}

İlk başta İşaret Zinciri, bugün kullandığımız Ethereum Mainnet'ten ayrı olarak kullanılacaktır. Ancak sonuç olarak bağlanacaklardır. Plan, İşaret Zinciri tarafından kontrol ve koordine edilen hisse ispatı sistemini ana ağ ile "birleştirmektir".

<ButtonLink to="/upgrades/merge/">
    Birleştirme
</ButtonLink>

### Parçalar ve İşaret Zinciri {#shards-and-beacon-chain}

Parça zincirleri, Ethereum ekosistemine yalnızca hisse ispatı mutabakat mekanizması ile güvenli bir şekilde girebilir. İşaret Zinciri, staking sistemini başlatarak gelecekte parça zinciri yükseltmesine olanak verir.

<ButtonLink to="/upgrades/sharding/">
    Parça zincirleri
</ButtonLink>

<Divider />

## İşaret (Beacon) Zinciriyle Etkileşim Kurun {#interact-with-beacon-chain}

<BeaconChainActions />
