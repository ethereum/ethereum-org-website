---
title: Stake ürünleri veya hizmetleri ekleme
description: Ethereum.org'a stake ürünleri veya hizmetleri eklerken kullandığımız politika
lang: tr
---

# Stake ürünleri veya hizmetleri ekleme {#adding-staking-products-or-services}

Kullanıcıları güvende ve kendinden emin tutarken mümkün olan en iyi kaynakları listelediğimizden emin olmak istiyoruz.

Herkes ethereum.org'da bir stake ürünü veya hizmeti eklemeyi önermekte özgürdür. Kaçırdığımız bir şey varsa, **[lütfen önerin](https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_staking_product.md)!**

Şu anda stake ürün ve hizmetlerini aşağıdaki sayfalarda listeliyoruz:

- [Tekli staking](/staking/solo/)
- [Bir hizmet olarak stake etme](/staking/saas/)
- [Stake havuzları](/staking/pools/)

İşaret Zincirindeki hisse ispatı, 1 Aralık 2020'den beri yayında. Stake etme hâlâ nispeten yeni olsa da, ethereum.org'da değerlendirilmek üzere adil ve şeffaf bir çerçeve oluşturmaya çalıştık, ancak listeleme kriterleri zamanla değişip gelişecek ve bu kriterler nihayetinde ethereum.org web sitesi ekibinin takdirindedir.

## Karar çerçevesi {#the-decision-framework}

Bir ürünün ethereum.org'da listeleme kararı herhangi bir tek faktöre bağlı değildir. Bir ürün veya hizmeti listelemeye karar verirken birden fazla kriter birlikte değerlendirilir. Bu kriterler ne kadar fazla karşılanırsa, listelenme olasılığı o kadar artar.

**İlk olarak, hangi ürün veya hizmet kategorisidir?**

- Düğüm veya istemci araçları
- Anahtar yönetimi
- Bir hizmet olarak stake etme (SaaS)
- Stake havuzu

Şu anda yalnızca bu kategorilerdeki ürün veya hizmetleri listeliyoruz.

### Dahil edilme kriterleri {#criteria-for-inclusion}

Stake etme ürünleri veya hizmet sunumları aşağıdaki kriterlere göre değerlendirilecektir:

**Proje veya hizmet ne zaman yayınlandı?**

- Ürün veya hizmetin ne zaman halka arz edildiğine dair kanıt var mı?
- Bu, ürünlerin "kullanılmışlık" puanını belirlemek için kullanılır.

**Proje aktif olarak sürdürülüyor mu?**

- Projeyi geliştiren aktif bir ekip var mı? Kimler dahil olur?
- Yalnızca aktif olarak bakımı yapılan ürünler dikkate alınacaktır.

**Ürün veya hizmet güvenilen/insan aracılardan arındırılmış mı?**

- Kullanıcıların yolculuğundaki hangi adımlar, fonlarının anahtarlarını elinde tutmak veya ödülleri uygun şekilde dağıtmak için insanlara güvenmeyi gerektiriyor?
- Bu, ürün veya hizmetlerin "güvensizlik" puanını belirlemek için kullanılır.

**Hangi platformları destekliyor?**

- örn. Linux, macOS, Windows, iOS, Android

#### Yazılım ve akıllı sözleşmeler {#software-and-smart-contracts}

İlgili herhangi bir özel yazılım veya akıllı sözleşme için:

**Her şey açık kaynak mı?**

- Açık kaynak projeler, herkese açık bir kaynak kod deposuna sahip olmalıdır
- Bu, ürünlerin "açık kaynak" puanını belirlemek için kullanılır.

**Ürün, _beta_ geliştirme aşamasından çıktı mı?**

- Ürün, geliştirme döngüsünün hangi aşamasında?
- Beta aşamasındaki ürünler ethereum.org'a dahil edilmek için değerlendirilmez

**Yazılım harici bir güvenlik denetiminden geçti mi?**

- Geçmediyse, bir dış denetim gerçekleştirme planları var mı?
- Bu, ürünlerin "denetlenmişlik" puanını belirlemek için kullanılır.

**Projenin bir hata ödül programı var mı?**

- Yoksa, bir güvenlik hatası ödülü oluşturma planları var mı?
- Bu, ürünlerin "hata ödülü" puanını belirlemek için kullanılır.

#### Düğüm veya istemci araçları {#node-or-client-tooling}

Düğüm veya istemci kurulumu, yönetimi veya geçişi ile ilgili yazılım ürünleri için:

**Hangi mutabakat katmanı istemcileri (örn. Lighthouse, Teku, Nimbus, Prysm) destekleniyor?**

- Hangi istemciler destekleniyor? Kullanıcı seçebilir mi?
- Bu, ürünlerin "çoklu istemci" puanını belirlemek için kullanılır.

#### Bir hizmet olarak stake etme {#staking-as-a-service}

[Bir hizmet olarak stake etme listeleri](/staking/saas/) için (yani, delege edilmiş düğüm işlemi):

**Hizmeti kullanmakla ilişkili ücretler nelerdir?**

- Ücret yapısı nedir, ör. hizmet için aylık bir ücret var mı?
- Herhangi bir ek stake gereksinimi var mı?

**Kullanıcıların bir hesap almak için kaydolması gerekiyor mu?**

- Birisi hizmeti izinsiz veya KYC olmadan kullanabilir mi?
- Bu, ürünlerin "izinsizlik" puanını belirlemek için kullanılır.

**İmza anahtarları ve para çekme anahtarları kimde?**

- Kullanıcı hangi anahtarlara erişimi kendinde tutar? Hizmet hangi anahtarlara erişim sağlar?
- Bu, ürünlerin "güvensizlik" puanını belirlemek için kullanılır.

**Çalıştırılan düğümlerin istemci çeşitliliği nedir?**

- Doğrulayıcı anahtarların yüzde kaçı bir çoğunluk mutabakat katmanı (CL) istemcisi çalıştırılıyor?
- Son düzenleme itibariyle Prysm düğüm operatörlerinin çoğunluğu tarafından çalıştırılan mutabakat katmanı istemcisi hâline gelmiştir ve bu durum, ağ için bir tehlike oluşturmaktadır. Herhangi bir mutabakat katmanı istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımıyla ilgili verileri talep ederiz.
- Bu, ürünlerin "çeşitli istemciler" puanını belirlemek için kullanılır.

#### Stake havuzu {#staking-pool}

[Havuzlu stake etme hizmetleri](/staking/pools/) için:

**Stake için gereken minimum ETH nedir?**

- örn. 0,01 ETH

**İlgili ücretler veya stake gereksinimleri nelerdir?**

- Ödüllerin yüzde kaçı ücret olarak kaldırılıyor?
- Herhangi bir ek stake gereksinimi var mı?

**Bir likidite token'ı var mı?**

- İlgili token'lar nelerdir? Nasıl çalışırlar? Sözleşme adresleri nelerdir?
- Bu, ürünlerin "likidite token'ı" puanını belirlemek için kullanılır.

**Kullanıcılar düğüm operatörü olarak katılabilir mi?**

- Havuzlanmış fonları kullanarak doğrulayıcı istemcileri çalıştırmak için ne gereklidir?
- Bunun için bir kişiden, şirketten veya DAO'dan izin alınması gerekiyor mu?
- Bu, ürünlerin "izinsiz düğümler" puanını belirlemek için kullanılır.

**Havuz düğüm operatörlerinin istemci çeşitliliği nedir?**

- Düğüm operatörlerinin yüzde kaçı bir çoğunluk mutabakat katmanı (CL) istemcisi çalıştırıyor?
- Son düzenleme itibariyle Prysm düğüm operatörlerinin çoğunluğu tarafından çalıştırılan mutabakat katmanı istemcisi hâline gelmiştir ve bu durum, ağ için bir tehlike oluşturmaktadır. Herhangi bir mutabakat katmanı istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımıyla ilgili verileri talep ederiz.
- Bu, ürünlerin "çeşitli istemciler" puanını belirlemek için kullanılır.

### Diğer kriterler: olursa iyi olan şeyler {#other-criteria}

**Hangi kullanıcı arayüzleri destekleniyor?**

- örn. Tarayıcı uygulaması, masaüstü uygulaması, mobil uygulama, CLI

**Düğüm araçları konusunda, yazılım istemciler arasında geçiş yapmanın kolay bir yolunu sağlıyor mu?**

- Kullanıcı, aracı kullanarak istemcileri kolayca ve güvenli bir şekilde değiştirebilir mi?

**Bir hizmet olarak stake etme için, hizmet tarafından şu anda kaç doğrulayıcı çalıştırılıyor?**

- Bu, bize hizmetinizin şu ana kadarki erişimi hakkında bir fikir verir.

## Sonuçları nasıl görüntülüyoruz {#product-ordering}

Yukarıdaki [dahil edilme kriterleri](#criteria-for-inclusion), her ürün veya hizmet için kümülatif puan hesaplamak için kullanılır. Bu, belirli objektif kriterleri karşılayan ürünleri sıralamak ve sergilemek için bir araç olarak kullanılır. Kanıt için ne kadar çok kriter sağlanırsa, bir ürün o kadar yüksek sıralanır ve beraberlikler gerektiğinde rastgele hâle getirilir.

Bu kriterlerin kod mantığı ve ağırlıkları şu anda depomuzdaki [bu JavaScript bileşeninde](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) bulunmaktadır.

## Ürününüzü veya hizmetinizi ekleyin {#add-product}

Ethereum.org'a stake etme ürünü veya hizmeti eklemek istiyorsanız GitHub'da bir konu oluşturun.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_staking_product.md">
  Bir konu oluşturun
</ButtonLink>
