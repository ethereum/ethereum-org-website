---
title: İşaret Zinciri
description: Hisse ispatını Ethereum'a tanıtan yükseltme olan İşaret Zinciri hakkında bilgi edinin.
lang: tr
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: İşaret Zinciri, hisse ispatını Ethereum ekosisteminde uygulamaya koydu.
summaryPoint2: Eylül 2022'de orijinal Ethereum iş ispatı zinciriyle birleştirildi.
summaryPoint3: İşaret Zinciri, Ethereum'u güvence altına alan mutabakat mantığını ve blok dedikodusu protokolünü tanıttı.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  İşaret Zinciri 1 Aralık 2020'de geldi ve hisse ispatını Ethereumun mutabakat mekanizması olarak 15 Eylül 2022'de Birleşim yükseltmesiyle resmileştirdi.
</UpgradeStatus>

## İşaret Zinciri Nedir? {#what-is-the-beacon-chain}

İşaret Zinciri 2020'de hayata geçirilmiş olan hisse ispatı blok zincirinin orijinal adıdır. Ethereum Markette ulaşılabilir hale gelmeden önce Hisse ispatı mutabakatı mantığının sağlam ve sürdürülebilir olduğundan emin olmak için oluşturuldu. Bu yüzden, Ethereum'un iş ispatı ile birlikte çalıştırıldı. İşaret zinciri boş bloklardan oluşan bir zincirdi, ancak Ethereumda İş ispatından ve hisse ispatına geçiş İşaret Zincirinin tanıtılmasına ve Yürütüm İstemcilerinden gelen işlem verilerinin kabul edilmesine, blokların paket haline getirilmesine ve bir blok zincirin içine hisse ispatı ve mutabakat mantığıyla organize edilmesine yol açtı. Aynı zamanda, orijinal Ethereum Müşterileri madenciliklerini, blok yayılmalarını ve Mutabakat mantıklarını kapattılar ve bunları tamamen İşaret Zincirine bıraktılar. Bu olay [Birleşim](/roadmap/merge/) olarak bilinir. Birleşim olduğunda, artık ikili blok zincirler yoktu. Onun yerine, sadece bir hisse ispatı Ethereumu vardı ve bu artık düğüm başına iki farklı istemci gerektiriyor. İşaret Zinciri artık fikir birliği katmanı, fikir birliği istemcileri için eşler arası bir ağ ve blok dedikodusu ve mutabakat mantığını hallediyor. Dedikodu ve işlemlerin uygulanmasından, Ethereum'un duruşunu yönetmekten sorumlu. Bu iki katman birbirleriyle Motor API'sını kullanarak iletişim kurabilirler.

## İşaret Zinciri Ne Yapar? {#what-does-the-beacon-chain-do}

İşaret Zinciri Ethereum [paydaşlar](/staking/) ağını oluşturan ve koordine eden hesap defterlerine verilen addır, bunlardan önce ise hissedarlar gerçek Ethereum bloklarını doğrulamaya başlamışlardı. Ama, İşaret Zinciri işlemleri ilerletmez ya da akıllı sözleşme etkileşimlerini halletmez çünkü bu işlemler Yürütüm Katmanında yapılmaktadır. İşaret Zinciri, blok ve tasdik işlemleri, çatallanma seçim algoritmasını çalıştırma ve ödül ve cezaları yönetme gibi şeylerden sorumludur. [Düğüm mimarisi sayfamızda](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) daha fazlasını okuyun.

## İşaret Zinciri etkisi {#beacon-chain-features}

### Staking ile Tanışın {#introducing-staking}

İşaret Zinciri, Ethereum'a [Hisse İspatını](/developers/docs/consensus-mechanisms/pos/) tanıttı. Bu, Ethereum'u güvende tutar ve süreç doğrulayıcılarına daha fazla ETH kazandırır. Pratikte hisseleme, doğrulayıcı yazılımını aktive etmek için ETH'nin hisselenmesini içerir. Bir paydaş olarak, zincirde yeni bloklar oluşturan ve doğrulayan yazılımı çalıştırırsınız.

Hisseleme, [ madenciliğin](/developers/docs/consensus-mechanisms/pow/mining/) eskiden hizmet ettiğine benzer bir amaca hizmet eder, ancak birçok yönden farklıdır. Madencilik güçlü donanım, enerji harcaması gibi büyük ön harcamalar gerektiriyordu ve ölçeklendirilmiş ekonomilere sebep oluyor ve merkeziyetçiliği teşvik ediyordu. Madencilik ayrıca varlıkları teminat olarak kitlemeye gerek duymuyordu ve protokolün uğranan saldırıdan sonra gerekli kişilere gerekli ceza vermesini de sınırlandırıyordu.

Hisse ispatına geçiş Ethereum'u, iş ispatına kıyasla, çok daha güvenli ve merkeziyetsiz hale getirdi. Ağa katılan insan sayısı arttıkça, mevcut ağ bir o kadar merkeziyetsiz ve saldırılara karşı daha da güvende olur.

Ve hisse ispatını mutabakat mekanizması olarak kullanmak, [ şuan sahip olduğumuz güvenli, çevre dostu ve ölçeklenebillir Ethereum](/roadmap/vision/) için temel bir bileşendir.

<InfoBanner emoji=":money_bag:">
  Eğer doğrulayıcı olmakla ve Ethereum'un güvenliğini sağlamaya yardımcı olmakla ilgileniyorsanız, <a href="/staking/">hisseleme ile ilgili daha fazla şey öğrenin</a>.
</InfoBanner>

### Parçalama için ayarlamalar {#setting-up-for-sharding}

İşaret Zinciri, Ethereum Ana Ağı ile birleştiğinden beri, Ethereum topluluğu ağı ölçeklendirmeye başladı.

Hisse İspatı, herhangi bir zamanda, her biri ETH'nin söz konusu olduğu tüm onaylanmış blok üreticilerinin kaydına sahip olma avantajına sahiptir. Bu kayıt defteri, bölme ve fethetme yeteneği için zemin hazırlar, ancak belirli ağ sorumluluklarını güvenilir bir şekilde böler.

Bu sorumluluk, madencilerin ağa karşı hiçbir yükümlülüğünün olmadığı ve madenciliği durdurup düğüm yazılımlarını anında kalıcı olarak kapatabilecekleri iş ispatının karşıtıdır. Ayrıca bilinen blok teklifçilerinin kaydı ile ağ sorumluluklarını güvenli bir şekilde bölmenin güvenilir bir yolu yoktur.

[Parçalama hakkında daha fazlası](/roadmap/danksharding/)

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum yükseltmelerinin tamamı bir şekilde ilişkilidir. İşaret Zincirinin diğer yükseltmeleri nasıl etkilediğini özetleyelim.

### İşaret Zinciri ve Birleşim {#merge-and-beacon-chain}

İlk başta İşaret Zinciri, Ethereum Ana Ağı'ndan ayrıydı, ancak 2022'de birleştirildi.

<ButtonLink href="/roadmap/merge/">
  Birleştirme
</ButtonLink>

### Parçalar ve İşaret Zinciri {#shards-and-beacon-chain}

Parçalama, Ethereum ekosistemine yalnızca bir Hisse İspatı mutabakat mekanizması ile güvenli bir şekilde girebilir. İşare Zinciri Ana Ağ ile "bireleşerek" Ethereum'un daha da ölçeklenmesine yardımcı olmak için parçalamanın önünü açan hisselemeyi tanıttı.

<ButtonLink href="/roadmap/danksharding/">
  Parça zincirleri
</ButtonLink>

## Daha Fazla Okuma

- [Ethereum'un gelecekteki yükseltmeleri hakkında daha fazla bilgi](/roadmap/vision)
- [Düğüm mimarisi hakkında daha fazlası](/developers/docs/nodes-and-clients/node-architecture)
- [Hisse ispatına dair daha fazlası](/developers/docs/consensus-mechanisms/pos)
