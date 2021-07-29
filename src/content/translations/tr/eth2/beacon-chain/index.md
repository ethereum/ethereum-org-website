---
title: İşaret (Beacon) Zinciri
description: Ethereum'un ilk önemli Eth2 yükseltmesi olan İşaret (Beacon) Zinciri hakkında bilgi alın.
lang: tr
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "İşaret (beacon) zinciri bugün kullanmakta olduğumuz Ethereum ile ilgili hiçbir şeyi değiştirmez.",
    "Ağı koordine edecektir.",
    'Ethereum ekosistemine pay ispatını (proof of stake) getirir. Bunu teknik yol haritalarındaki "0 Aşaması" olarak tanıyor olabilirsiniz.',
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    İşaret (Beacon) Zinciri 1 Aralık saat 12:00'de (UTC) başlatılmıştır. Daha fazla bilgi için, bk. <a href="https://beaconscan.com/">verileri keşfet</a>. Zincirin doğrulanmasını isterseniz, <a href="/eth2/staking/">ETH'nizi stake edebilirsiniz</a>.
</UpgradeStatus>

## İşaret (Beacon) Zinciri Ne Yapar? {#what-does-the-beacon-chain-do}

İşaret (Beacon) Zinciri [shard](/eth2/shard-chains/) ve [staker](/eth2/staking/)lerden oluşan genişletilmiş ağı yönetir veya koordine eder. Ancak günümüzün [Ethereum ana ağı](/glossary/#mainnet) gibi olmayacaktır. Hesapları veya akıllı sözleşmeleri ele alamaz.

İşaret (Beacon) Zinciri'nin rolü zamanla değişir ancak [geliştirmeye çalıştığımız güvenli, sürdürülebilir ve ölçeklendirilebilir Ethereum](/eth2/vision/) için temel bir bileşendir.

## İşaret (Beacon) Zinciri özellikleri {#beacon-chain-features}

### Paydaşlığı sunar {#introducing-staking}

İşaret (Beacon) Zinciri Ethereum'a [pay ispatını](/developers/docs/consensus-mechanisms/pos/) getirir. Bu Ethereum'u güvenli kılmaya yardımcı olmak üzere size sunulan yeni bir imkândır. Ethereum'u daha sağlıklı kılacak ve bu süreç içinde size daha fazla ETH kazandıracak bir kamu emtiası olarak görün. Uygulamada, doğrulayıcı yazılımı etkinleştirmek için ETH stake etmenizi sağlar. Doğrulayıcı olarak işlemleri gerçekleştirir ve zincirde yeni bloklar oluşturursunuz.

Paydaşlık ve doğrulayıcı oluşturmak [madencilik](/developers/docs/mining/) faaliyetinden daha kolaydır (şu anda ağ bu şekilde korunmaktadır). Ethereum'u uzun vadede daha güvenli kılmanıza yardımcı olması umulmaktadır. Ağa ne kadar kişi katılırsa o kadar merkeziyetsiz ve saldırıya karşı güvenli hale gelir.

<InfoBanner emoji=":money_bag:">
Doğrulayıcı olmak ve İşaret (Beacon) Zincirinin güvenliğine yardımcı olmak istiyorsanız <a href="/eth2/staking/">stake etme konusunda daha fazla bilgi alın</a>.
</InfoBanner>

Bu ayrıca ikinci Eth2 yükseltmesi için de önemli bir değişikliktir: [shard zincirleri](/eth2/shard-chains/).

### Shard zincirleri kurulumu {#setting-up-for-shard-chains}

Shard zincirleri ikinci Eth2 yükseltmesi olacaktır. Ağın kapasitesini artıracak ve ağı 64 blok zincirine genişleterek işlem hızını geliştirecektir. İşaret (Beacon) Zinciri shard zincirlerinin sunulmasındaki önemli ilk adımdır, zira güvenli çalışmaları için paydaşlık gerektirir.

Sonuç olarak İşaret (Beacon) Zinciri shard zincirlerini doğrulamak üzere rasgele staker'lar atanmasından da sorumlu olacaktır. Staker'lar için işbirliği yapmayı ve shard'ı devralmayı zorlaştırmanın anahtarı da budur. Başka deyişle bu [trilyon şansta 1'den az](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20) anlamına gelir.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Eth2 yükseltmelerinin tamamı bir şekilde ilişkilidir. İşaret (Beacon) Zincirinin diğer yükseltmeleri nasıl etkilediğini özetleyelim.

### Shard'lar ve İşaret (Beacon) Zinciri {#shards-and-beacon-chain}

Shard zincirleri Ethereum ekosistemine yalnızca pay ispatı uzlaşmasıyla güvenli bir şekilde girebilir. İşaret (Beacon) Zinciri izlenmesi gereken shard zinciri yükseltmesi için imkan tanıyarak paydaşlık sunar.<ButtonLink to="/eth2/shard-chains/">Shard zincirleri</ButtonLink>

### Ana ağ ve İşaret (Beacon) Zinciri {#mainnet-and-beacon-chain}

Öncelikle İşaret (Beacon) Zinciri bugün kullandığımız Ethereum ana ağından ayrı olarak bulunacaktır. Ancak sonuç olarak bağlanacaklardır. Plan, İşaret (Beacon) Zinciri tarafından kontrol ve koordine edilen pay ispatı sistemine ana ağı "kenetlemektir".<ButtonLink to="/eth2/docking/">Kenetleme</ButtonLink>

<Divider />

## İşaret (Beacon) Zinciriyle Etkileşim Kurun {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
