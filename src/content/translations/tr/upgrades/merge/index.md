---
title: Birleştirme
description: Birleştirme hakkında bilgi edinin - Ethereum Ana Ağı, Sinyal Zinciri tarafından düzenlenen hisse kanıtı sistemine dahil olduğunda.
lang: tr
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Er geç mevcut Ethereum Ana Ağı işaret zincirinin hisse kanıtı sistemi ile birleşecektir.
summaryPoint2: Bu birleşim Ethereum için iş kanıtına bir son verecek, hisse kanıtına tam geçişe yol açacaktır.
summaryPoint3: Bunun gerçekleşmesi parça zincirlerinin geçilmeden öncesine planlanmıştır.
summaryPoint4: Önceden bundan "kenetlenme" olarak bahsettik
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Bu yükseltme, hisse kanıtı konsensüsüne resmi geçişi temsil ediyor. Bu, madencilik için gereken yoğun enerji ihtiyacını ortadan kaldırır ve bunun yerine, sabit ether kullanarak ağı güvence altına alır. <a href="/upgrades/vision/">Eth2 vizyonunu</a> gerçekleştirmede oldukça heyecan verici bir adım – daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlik.
</UpgradeStatus>

## Birleşme nedir? {#what-is-the-docking}

Başlangıçta [Beacon Chain](/upgrades/beacon-chain/)'in bugün kullandığımız zincir olan [Mainnet](/glossary/#mainnet)'ten ayrı olarak gönderildiğini hatırlamak önemlidir. Ethereum Mainnet [iş kanıtı(proof-of-work) ](/developers/docs/consensus-mechanisms/pow/) Beacon Zinciri ile paralel olarak çalışırken bile [ hisse kanıtı(proof-of-stake)](/developers/docs/consensus-mechanisms/pos/) tarafından güvence altına alınmaya devam etmektedir. Bu iki sistem sonunda bir araya geldiği zaman birleştirme gerçekleşmiş olacak.

Ethereum'un yıldızlararası bir yolculuk için pek de hazır olmayan bir uzay aracı olduğunu hayal edin. Beacon Chain ile topluluk, yeni bir motor ve sertleştirilmiş bir gövde inşa etti. Zamanı geldiğinde, mevcut gemi bu yeni sistemle rıhtıma yanaşacak, tek bir gemide birleşecek ve ciddi ışık yılı geçirmeye ve evreni ele geçirmeye hazır olacak.

## Mainnet ile birleştirme {#docking-mainnet}

Hazır olduğunda, Ethereum Mainnet, Beacon Chain ile "birleşecek" ve [iş kanıtı (proof-of-work) yerine hisse kanıtı(proof-of-stake) kullanan kendi parçası haline gelecek. ](/developers/docs/consensus-mechanisms/pow/).

Mainnet, geçişin tüm ETH sahipleri ve kullanıcıları için sorunsuz olmasını sağlamak için akıllı sözleşmeleri pay ispatı sistemi ve ayrıca tam geçmiş ve Ethereum'un mevcut durumunda çalıştırma yeteneği geliştirecektir.

## Birleştirmeden sonra {#after-the-merge}

Bu, Ethereum için çalışma ispatının sona erdiğini işaret edecek ve daha sürdürülebilir, çevre dostu bir Ethereum çağını başlatacaktır. Bu noktada Ethereum, [Eth2 vizyonunda](/upgrades/vision/) özetlenen tam ölçek, güvenlik ve sürdürülebilirliğe ulaşmaya bir adım daha yakın olacak.

İş ispatından hisse ispatına geçişi hızlandırmak için birleştirmenin bir uygulama hedefinin basitlik olduğuna dikkat etmek önemlidir. Geliştiriciler çabalarını bu geçişe odaklıyor ve bu hedefi geciktirebilecek ek özellikleri en aza indiriyor.

**Bu, stake edilen ETH'yi geri çekme yeteneği gibi birkaç özelliğin birleştirme tamamlandıktan sonra biraz daha beklemesi gerekeceği anlamına gelir.** Planlar, birleştirme sonrası bir "temizleme" içerir. "Birleştirme tamamlandıktan çok kısa bir süre sonra gerçekleşmesi beklenen bu özellikleri ele almak için yükseltme yapın.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Eth2 yükseltmelerinin tamamı bir şekilde ilişkilidir. Öyleyse, birleştirmenin diğer yükseltmelerle nasıl ilişkili olduğunu özetleyelim.

### Birleşme ve İşaret (Beacon) Zinciri {#docking-and-beacon-chain}

Birleştirme gerçekleştiğinde, Ethereum Mainnet'i doğrulamak için staker'lar atanacaktır. [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/) artık gerekli olmayacak, bu nedenle madenciler muhtemelen kazançlarını yeni pay ispatı sistemindeki paydaşlığa yatıracaklardır.

<ButtonLink to="/upgrades/beacon-chain/">İşaret (Beacon) Zinciri</ButtonLink>

### Birleştirme ve birleştirme sonrası temizleme {#merge-and-post-merge-cleanup}

Stake edilen ETH'yi geri çekme gibi bazı özellikler birleştirmeden hemen sonra henüz desteklenmeyecek. Bunun için birleştirmeden kısa bir süre sonra ayrı bir yükseltme yapılması planlanmaktadır.

[EF Araştırma ve Geliştirme Blogu](https://blog.ethereum.org/category/research-and-development/) ile güncel kalın. Merak edenler için, Nisan 2021 ETHGlobal etkinliğinde Vitalik tarafından sunulan [Birleşmeden Sonra Ne Olur](https://youtu.be/7ggwLccuN5s?t=101) konusu hakkında daha fazla bilgi edinin.

### Birleştirme ve Shard (Parça) zincirleri {#docking-and-shard-chains}

Aslında plan, birleşmeden önce bölünmüş zincirleri üzerinde çalışmaktı – ölçeklenebilirliği ele almak için. Bununla birlikte, [2. katman ölçeklendirme çözümlerinin](/developers/docs/scaling/#layer-2-scaling) patlamasıyla, öncelik iş kanıtını kanıta dönüştürmeye geçti -birleştirme yoluyla hisse.

Bu, sonsuz ölçeklenebilirliğe izin vermek için potansiyel olarak birden fazla parça zinciri turuna duyulan ihtiyaç konusunda topluluk tarafından devam eden bir değerlendirme olacaktır.

<ButtonLink to="/upgrades/shard-chains/">Shard zincirleri</ButtonLink>
