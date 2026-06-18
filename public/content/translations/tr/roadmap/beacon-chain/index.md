---
title: İşaret Zinciri
description: İşaret Zinciri hakkında bilgi edinin - Ethereum'a Hisse Kanıtı'nı (PoS) getiren güncelleme.
lang: tr
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "İşaret Zinciri, Ethereum ekosistemine Hisse Kanıtı'nı (PoS) getirdi."
  - "Eylül 2022'de orijinal Ethereum İş Kanıtı (PoW) zinciriyle birleştirildi."
  - "İşaret Zinciri, şu anda Ethereum'u güvence altına alan mutabakat mantığını ve blok dedikodu (gossip) protokolünü tanıttı."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  İşaret Zinciri 1 Aralık 2020'de yayınlandı ve 15 Eylül 2022'deki Birleşme güncellemesiyle Hisse Kanıtı'nı (PoS) Ethereum'un mutabakat mekanizması olarak resmileştirdi.
</UpgradeStatus>

## İşaret Zinciri nedir? {#what-is-the-beacon-chain}

İşaret Zinciri, 2020'de başlatılan orijinal Hisse Kanıtı (PoS) blokzincirinin adıdır. Hisse Kanıtı mutabakat mantığının [Ethereum](/) Ana Ağı'nda etkinleştirilmeden önce sağlam ve sürdürülebilir olduğundan emin olmak için oluşturuldu. Bu nedenle, orijinal İş Kanıtı (PoW) Ethereum ile birlikte çalıştı. İşaret Zinciri 'boş' bloklardan oluşan bir zincirdi, ancak Ethereum'da İş Kanıtı'nı kapatıp Hisse Kanıtı'nı açmak, İşaret Zinciri'ne yürütme istemcilerinden gelen işlem verilerini kabul etmesi, bunları bloklar halinde paketlemesi ve ardından Hisse Kanıtı tabanlı bir mutabakat mekanizması kullanarak bir blokzincir halinde düzenlemesi talimatını vermeyi gerektiriyordu. Aynı anda, orijinal Ethereum istemcileri madencilik, blok yayılımı ve mutabakat mantıklarını kapatarak tüm bunları İşaret Zinciri'ne devretti. Bu olay [Birleşme](/roadmap/merge/) olarak biliniyordu. Birleşme gerçekleştikten sonra artık iki blokzincir yoktu. Bunun yerine, artık düğüm başına iki farklı istemci gerektiren tek bir Hisse Kanıtı Ethereum'u vardı. İşaret Zinciri artık blok dedikodusu ve mutabakat mantığını işleyen eşler arası bir mutabakat istemcileri ağı olan mutabakat katmanıdır; orijinal istemciler ise işlemlerin dedikodusunu yapmaktan, yürütmekten ve Ethereum'un durumunu yönetmekten sorumlu olan yürütme katmanını oluşturur. İki katman, Engine API kullanarak birbirleriyle iletişim kurabilir.

## İşaret Zinciri ne yapar? {#what-does-the-beacon-chain-do}

İşaret Zinciri, bu staker'lar gerçek Ethereum bloklarını doğrulamaya başlamadan önce Ethereum [staker'ları](/staking/) ağını yürüten ve koordine eden bir hesap defterine verilen isimdir. Ancak işlemleri işlemez veya akıllı sözleşme etkileşimlerini yönetmez çünkü bu, yürütme katmanında yapılmaktadır.
İşaret Zinciri; blok ve onay işleme, çatallanma seçimi algoritmasını çalıştırma ve ödüller ile cezaları yönetme gibi şeylerden sorumludur.
[Düğüm mimarisi sayfamızda](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) daha fazlasını okuyun.

## İşaret Zinciri'nin etkisi {#beacon-chain-features}

### Staking'in tanıtılması {#introducing-staking}

İşaret Zinciri, Ethereum'a [Hisse Kanıtı'nı (PoS)](/developers/docs/consensus-mechanisms/pos/) getirdi. Bu, Ethereum'u güvende tutar ve bu süreçte doğrulayıcılara daha fazla ETH kazandırır. Uygulamada staking, doğrulayıcı yazılımını etkinleştirmek için ETH stake etmeyi içerir. Bir staker olarak, zincirde yeni bloklar oluşturan ve doğrulayan yazılımı çalıştırırsınız.

Staking, eskiden [madenciliğin](/developers/docs/consensus-mechanisms/pow/mining/) hizmet ettiği amaca benzer bir amaca hizmet eder, ancak birçok yönden farklıdır. Madencilik, güçlü donanım ve enerji tüketimi şeklinde büyük ön harcamalar gerektiriyordu, bu da ölçek ekonomilerine yol açıyor ve merkezileşmeyi teşvik ediyordu. Madencilik ayrıca varlıkları teminat olarak kilitleme zorunluluğu getirmiyordu, bu da protokolün bir saldırıdan sonra kötü niyetli aktörleri cezalandırma yeteneğini sınırlıyordu.

Hisse Kanıtı'na geçiş, Ethereum'u İş Kanıtı'na kıyasla önemli ölçüde daha güvenli ve merkeziyetsiz hale getirdi. Ağa ne kadar çok kişi katılırsa, o kadar merkeziyetsiz ve saldırılara karşı güvenli hale gelir.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Bir doğrulayıcı olmak ve Ethereum'u güvence altına almaya yardımcı olmakla ilgileniyorsanız, [staking hakkında daha fazla bilgi edinin](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Parçalama (sharding) için hazırlık {#setting-up-for-sharding}

İşaret Zinciri orijinal Ethereum Ana Ağı ile birleştiğinden beri, Ethereum topluluğu ağı ölçeklendirmeye bakmaya başladı.

Hisse Kanıtı, herhangi bir zamanda her biri stake edilmiş ETH'ye sahip tüm onaylanmış blok üreticilerinin bir kaydına sahip olma avantajına sahiptir. Bu kayıt, böl ve yönet yeteneğine zemin hazırlar, ancak belirli ağ sorumluluklarını güvenilir bir şekilde böler.

Bu sorumluluk, madencilerin ağa karşı hiçbir yükümlülüğünün olmadığı ve hiçbir yansıma olmadan anında madenciliği durdurup düğüm yazılımlarını kalıcı olarak kapatabildikleri İş Kanıtı'nın tam tersidir. Ayrıca bilinen blok teklif edicilerin bir kaydı ve ağ sorumluluklarını güvenli bir şekilde bölmenin güvenilir bir yolu yoktur.

[Parçalama (sharding) hakkında daha fazlası](/roadmap/danksharding/)

## Güncellemeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum güncellemelerinin tümü birbiriyle bir şekilde ilişkilidir. Bu yüzden İşaret Zinciri'nin diğer güncellemeleri nasıl etkilediğini özetleyelim.

### İşaret Zinciri ve Birleşme {#merge-and-beacon-chain}

Başlangıçta İşaret Zinciri, Ethereum Ana Ağı'ndan ayrı olarak mevcuttu, ancak 2022'de birleştirildiler.

<ButtonLink href="/roadmap/merge/">
  Birleşme
</ButtonLink>

### Parçalar ve İşaret Zinciri {#shards-and-beacon-chain}

Parçalama (sharding), Ethereum ekosistemine yalnızca bir Hisse Kanıtı mutabakat mekanizması yürürlükteyken güvenli bir şekilde girebilir. İşaret Zinciri, Ana Ağ ile 'birleşen' staking'i tanıtarak, Ethereum'u daha da ölçeklendirmeye yardımcı olmak için parçalamanın önünü açtı.

<ButtonLink href="/roadmap/danksharding/">
  Parça zincirleri
</ButtonLink>

## Daha fazla okuma {#further-reading}

- [Düğüm mimarisi hakkında daha fazlası](/developers/docs/nodes-and-clients/node-architecture)
- [Hisse Kanıtı (PoS) hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos)