---
title: Ethh2 ile ana ağı kenetleme
description: Ana ağ Ethereum, İşaret (Beacon) Zinciri koordineli pay ispatı sistemine katıldığında kenetlenme hakkında bilgi alın.
lang: tr
template: upgrade
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoint1: Sonuç olarak İşaret (Beacon) Zinciri Eth2 yükseltmelerinin kalanını "kenetleyecektir".
summaryPoint2: Kenetleme "Eth1" ana ağını Eth2 işaret (beacon) zinciri ve shard sistemiyle birleştirecektir.
summaryPoint3: Bu Ethereum için çalışma ispatının sonunu ve pay ispatına tam geçişi belirleyecektir.
summaryPoint4: Bunu teknik yol haritalarındaki "1,5 Aşaması" olarak tanıyor olabilirsiniz.
---

<UpgradeStatus date="~Q1/Q2 2022">
    Bu yükseltme, shard zincirlerinin gelişini takip edecektir. Ancak o zaman <a href="/eth2/vision/">Eth2 vision</a> tamamen gerçekleşmiş olacaktır – daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlikle birlikte tüm ağı destekleyen paydaşlık.
</UpgradeStatus>

## Kenetlenme nedir? {#what-is-the-docking}

Başlangıçta diğer Eth2 yükseltmelerinin bugün kullandığımız [ana ağ](/glossary/#mainnet) zincirinden ayrı olarak gönderildiğini unutmamak gerekir. [İşaret (Beacon) Zinciri](/upgrades/beacon-chain/) ve [shard zincirleri](/eth2/shard-chains/) [pay ispatı](/developers/docs/consensus-mechanisms/pos/) kullanılarak paralel çalışırken bile Ethereum ana ağı [çalışma ispatı](/developers/docs/consensus-mechanisms/pow/) ile güvence altına alınmaya devam edecektir. Kenetlenme iki sistem birleştirildiğinde gerçekleşir.

Ethereum'un yıldızlararası bir yolculuk için pek de hazır olmayan bir uzay aracı olduğunu hayal edin. İşaret (Beacon) Zinciri ve shard zincirleriyle topluluk yeni bir motor ve sertleştirilmiş bir gövde inşa etmiş oldu. Zamanı geldiğinde, mevcut gemi bu yeni sistemle kenetlenecek ve böylece ciddi ışık yılları geçirmeye ve evreni ele geçirmeye hazır tek bir gemi haline gelebilecektir.

## Kenetlenme ana ağı {#docking-mainnet}

Hazır olduğunda, Ethereum ana ağı [çalışma ispatı](/developers/docs/consensus-mechanisms/pow/) yerine pay ispatını kullanan kendi shard'ı haline gelerek İşaret (Beacon) Zinciriyle "kenetlenecektir".

Mainnet, geçişin tüm ETH sahipleri ve kullanıcıları için sorunsuz olmasını sağlamak için akıllı sözleşmeleri pay ispatı sistemi ve ayrıca tam geçmiş ve Ethereum'un mevcut durumunda çalıştırma yeteneği geliştirecektir.

## Kenetlenmeden sonra {#after-the-docking}

Bu, Ethereum için çalışma ispatının sona erdiğini işaret edecek ve daha sürdürülebilir, çevre dostu bir Ethereum çağını başlatacaktır. Bu noktada Ethereum, Eth2 vizyonunda belirtilen ölçeğe, güvenliğe ve sürdürülebilirliğe sahip olacaktır.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Eth2 yükseltmelerinin tümü bir şekilde birbiriyle ilişkilidir. Dolayısıyla kenetlenmenin diğer yükseltmelerle ilişkisini özetleyelim.

### Kenetlenme ve İşaret (Beacon) Zinciri {#docking-and-beacon-chain}

Kenetlenme gerçekleştiğinde, staker'ler Ethereum ana ağını doğrulamak için atanacaktır. Aynı shard zincirlerinde olduğu gibi. [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/) artık gerekli olmayacak, bu nedenle madenciler muhtemelen kazançlarını yeni pay ispatı sistemindeki paydaşlığa yatıracaklardır.

<ButtonLink to="/upgrades/beacon-chain/">İşaret (Beacon) Zinciri</ButtonLink>

### Kenetleme ve shard zincirleri {#docking-and-shard-chains}

Ana ağın bir shard haline gelmesiyle birlikte, shard zincirlerinin başarılı bir şekilde uygulanması bu yükseltme için çok önemlidir. Geçiş topluluğun ikinci bir sharding sürümüne geçip geçmemeye karar vermesine yardımcı olmada önemli rol oynayabilir. Bu yükseltme, diğer shard'ları ana ağ gibi yapacaktır: yalnızca fazla veri sağlamakla kalmayacaklar işlemleri ve akıllı sözleşmeleri idare edebileceklerdir.

<ButtonLink to="/eth2/shard-chains/">Shard zincirleri</ButtonLink>
