---
title: Ethh2 ile ana ağı kenetleme
description: Ana ağ Ethereum, İşaret (Beacon) Zinciri koordineli pay ispatı sistemine katıldığında kenetlenme hakkında bilgi alın.
lang: tr
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Sonuç olarak İşaret (Beacon) Zinciri Eth2 yükseltmelerinin kalanını "kenetleyecektir".',
    'Kenetleme "Eth1" ana ağını Eth2 işaret (beacon) zinciri ve shard sistemiyle birleştirecektir.',
    "Bu Ethereum için çalışma ispatının sonunu ve pay ispatına tam geçişi belirleyecektir.",
    'Bunu teknik yol haritalarındaki "1,5 Aşaması" olarak tanıyor olabilirsiniz.',
  ]
---

<UpgradeStatus date="~2021/22">
    Bu yükseltme, shard zincirlerinin gelişini takip edecektir. Ancak o zaman <a href="/eth2/vision/">Eth2 vision</a> tamamen gerçekleşmiş olacaktır – daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlikle birlikte tüm ağı destekleyen paydaşlık.
</UpgradeStatus>

## Kenetlenme nedir? {#what-is-the-docking}

Başlangıçta diğer Eth2 yükseltmelerinin bugün kullandığımız [ana ağ](/glossary/#mainnet) zincirinden ayrı olarak gönderildiğini unutmamak gerekir. [İşaret (Beacon) Zinciri](/eth2/beacon-chain/) ve [shard zincirleri](/eth2/shard-chains/) [pay ispatı](/developers/docs/consensus-mechanisms/pos/) kullanılarak paralel çalışırken bile Ethereum ana ağı [çalışma ispatı](/developers/docs/consensus-mechanisms/pow/) ile güvence altına alınmaya devam edecektir. Kenetlenme iki sistem birleştirildiğinde gerçekleşir.

Ethereum'un yıldızlararası bir yolculuk için pek de hazır olmayan bir uzay aracı olduğunu hayal edin. İşaret (Beacon) Zinciri ve shard zincirleriyle topluluk yeni bir motor ve sertleştirilmiş bir gövde inşa etmiş oldu. Zamanı geldiğinde, mevcut gemi bu yeni sistemle kenetlenecek ve böylece ciddi ışık yılları geçirmeye ve evreni ele geçirmeye hazır tek bir gemi haline gelebilecektir.

## Kenetlenme ana ağı {#docking-mainnet}

Hazır olduğunda, Ethereum ana ağı [çalışma ispatı](/developers/docs/consensus-mechanisms/pow/) yerine pay ispatını kullanan kendi shard'ı haline gelerek İşaret (Beacon) Zinciriyle "kenetlenecektir".

Mainnet, geçişin tüm ETH sahipleri ve kullanıcıları için sorunsuz olmasını sağlamak için akıllı sözleşmeleri pay ispatı sistemi ve ayrıca tam geçmiş ve Ethereum'un mevcut durumunda çalıştırma yeteneği geliştirecektir.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Kenetlenmeden sonra {#after-the-docking}

Bu, Ethereum için çalışma ispatının sona erdiğini işaret edecek ve daha sürdürülebilir, çevre dostu bir Ethereum çağını başlatacaktır. Bu noktada Ethereum, Eth2 vizyonunda belirtilen ölçeğe, güvenliğe ve sürdürülebilirliğe sahip olacaktır.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Eth2 yükseltmelerinin tümü bir şekilde birbiriyle ilişkilidir. Dolayısıyla kenetlenmenin diğer yükseltmelerle ilişkisini özetleyelim.

### Kenetlenme ve İşaret (Beacon) Zinciri {#docking-and-beacon-chain}

Kenetlenme gerçekleştiğinde, staker'ler Ethereum ana ağını doğrulamak için atanacaktır. Aynı shard zincirlerinde olduğu gibi. [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/) artık gerekli olmayacak, bu nedenle madenciler muhtemelen kazançlarını yeni pay ispatı sistemindeki paydaşlığa yatıracaklardır.<ButtonLink to="/eth2/beacon-chain/">İşaret (Beacon) Zinciri</ButtonLink>

### Kenetleme ve shard zincirleri {#docking-and-shard-chains}

Ana ağın bir shard haline gelmesiyle birlikte, shard zincirlerinin başarılı bir şekilde uygulanması bu yükseltme için çok önemlidir. Geçiş topluluğun ikinci bir sharding sürümüne geçip geçmemeye karar vermesine yardımcı olmada önemli rol oynayabilir. Bu yükseltme, diğer shard'ları ana ağ gibi yapacaktır: yalnızca fazla veri sağlamakla kalmayacaklar işlemleri ve akıllı sözleşmeleri idare edebileceklerdir.<ButtonLink to="/eth2/shard-chains/">Shard zincirleri</ButtonLink>
