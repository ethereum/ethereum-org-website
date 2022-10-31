---
title: Birleştirme
description: Mainnet Ethereum'un, İşaret Zinciri koordineli hisse ispatı sistemine katılacağı Birleştirme hakkında bilgi edinin.
lang: tr
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Nihayetinde mevcut Ethereum Mainnet, işaret zincirinin hisse ispatı sistemi ile birleşecektir.
summaryPoint2: Bu birleştirme, Ethereum için iş ispatına bir son verecek ve hisse ispatına tam geçişi sağlayacaktır.
summaryPoint3: Bunun gerçekleşmesi parça zincirlerinin geçilmeden öncesine planlanmıştır.
summaryPoint4: Önceden bundan "kenetlenme" olarak bahsettik.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Bu yükseltme, hisse ispatı mutabakatına resmi geçişi temsil eder. Bu, madencilik için gereken yoğun enerji ihtiyacını ortadan kaldırır ve stake edilmiş ether kullanarak ağı güvence altına alır. <a href="/upgrades/vision/">Ethereum vizyonunu </a> gerçekleştirmede oldukça heyecan verici bir adım; daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlik.
</UpgradeStatus>

## Birleştirme nedir? {#what-is-the-docking}

Başlangıçta [İşaret Zinciri](/upgrades/beacon-chain/)nin bugün kullandığımız zincir olan [Mainnet](/glossary/#mainnet)'ten ayrı olarak başladığını unutmamak gerekir. Ethereum Mainnet [iş ispatı](/developers/docs/consensus-mechanisms/pow/) İşaret Zinciri ile paralel olarak çalışırken bile [hisse ispatı](/developers/docs/consensus-mechanisms/pos/) tarafından güvence altına alınmaya devam etmektedir. Bu iki sistem sonunda bir araya geldiği zaman Birleştirme gerçekleşmiş olacak.

Ethereum'un yıldızlararası bir yolculuk için pek de hazır olmayan bir uzay aracı olduğunu hayal edin. İşaret Zinciri ile topluluk, yeni bir motor ve sertleştirilmiş bir gövde inşa etti. Zamanı geldiğinde mevcut gemi, bu yeni sistemle rıhtıma yanaşıp tek bir gemide birleşerek uzun ışık yılları mesafe alacak ve evreni ele geçirmeye hazır olacak.

## Mainnet ile birleştirme {#docking-mainnet}

Hazır olduğunda Ethereum Mainnet, İşaret Zinciri ile "birleşecek" ve [iş ispatı yerine hisse ispatı kullanan kendi parçasına dönüşecek](/developers/docs/consensus-mechanisms/pow/).

Mainnet, tüm ETH sahipleri ve kullanıcıları için geçişin sorunsuz olmasını sağlamak için akıllı sözleşmeleri hisse kanıtı(proof-of-stake) sistemine ve ayrıca Ethereum'un tam geçmişine ve mevcut durumuna getirecek.

## Birleştirmeden sonra {#after-the-merge}

Bu, Ethereum için iş ispatının sona sinyalini vererek daha sürdürülebilir ve çevre dostu bir Ethereum çağını başlatacaktır. Bu noktada Ethereum, [Ethereum vizyonunda](/upgrades/vision/) özetlenen tam boyuta, güvenliğe ve sürdürülebilirliğe ulaşmaya bir adım daha yakın olacak.

Birleştirmenin uygulama hedeflerinden birinin, iş ispatından hisse ispatına geçişi hızlandırmak için basitlik sağlamak olduğunu belirtmek gerekir. Geliştiriciler çabalarını bu geçişe odaklıyor ve bu hedefi geciktirebilecek ek özellikleri en aza indiriyor.

**Bu, stake edilen ETH'yi çekebilme gibi birkaç özelliğin Birleştirme tamamlandıktan sonra biraz daha beklemesi gerekeceği anlamına gelir.** Bu özellikleri tamamlamak için Birleştirme tamamlandıktan hemen sonra yapılması beklenen bir birleştirme sonrası "temizlik" de planların içerisinde bulunuyor.

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum yükseltmelerinin tamamı bir şekilde ilişkilidir. Öyleyse Birleştirmenin diğer yükseltmelerle nasıl ilişkili olduğunu özetleyelim.

### Birleştirme ve İşaret Zinciri {#docking-and-beacon-chain}

Birleştirme gerçekleştiğinde, Ethereum Mainnet'i doğrulamak için stake eden kişiler atanacaktır. [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/) artık gerekli olmayacağı için madenciler büyük ihtimalle kazançlarını yeni hisse ispatı sisteminde stake etmeye yatıracaklardır.

<ButtonLink to="/upgrades/beacon-chain/">
  İşaret (Beacon) Zinciri
</ButtonLink>

### Birleştirme ve birleştirme sonrası temizlik {#merge-and-post-merge-cleanup}

Stake edilen ETH'yi geri çekme gibi bazı özellikler Birleştirmeden hemen sonra henüz desteklenmeyecek. Bunun için birleştirmeden kısa bir süre sonra ayrı bir yükseltme yapılması planlanmaktadır.

[EF Araştırma ve Geliştirme Blogu](https://blog.ethereum.org/category/research-and-development/) ile güncel kalın. Merak edenler için, 2021 yılının Nisan ayında ETHGlobal etkinliğinde Vitalik tarafından sunulan [Birleşmeden Sonra Ne Olacağı](https://youtu.be/7ggwLccuN5s?t=101) hakkında daha fazla bilgi edinin.

### Birleştirme ve parça zincirleri {#docking-and-shard-chains}

Başlangıçta plan, ölçeklenebilirliği ele almak için Birleştirmeden önce parça zincirleri üzerinde çalışmaktı. Bununla birlikte, [katman 2 ölçeklendirme çözümleri](/developers/docs/scaling/#layer-2-scaling)nin ünlenmesiyle Birleştirme aracılığıyla iş ispatının hisse ispatıyla değiştirilmesine öncelik verildi.

Bu, sonsuz ölçeklenebilirliğe izin vermek için potansiyel olarak birden fazla parça zinciri turuna duyulan ihtiyaç konusunda topluluk tarafından, devam eden bir değerlendirme olacaktır.

<ButtonLink to="/upgrades/sharding/">
  Parça zincirleri
</ButtonLink>

## Daha fazla okuyun {#read-more}

<MergeArticleList />
