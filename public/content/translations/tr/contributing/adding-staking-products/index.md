---
title: "Stake ürünleri veya hizmetleri ekleme"
description: "Ethereum.org'a stake ürünleri veya hizmetleri eklerken kullandığımız politika"
lang: tr
---

# Hisseleme ürünleri veya hizmetleri ekleme {#adding-staking-products-or-services}

Kullanıcıları güvende ve kendinden emin tutarken mümkün olan en iyi kaynakları listelediğimizden emin olmak istiyoruz.

Herkes ethereum.org'da bir stake ürünü veya hizmeti eklemeyi önermekte özgürdür. Gözden kaçırdığımız bir tane varsa, **[lütfen onu önerin](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Şu anda stake ürün ve hizmetlerini aşağıdaki sayfalarda listeliyoruz:

- [Bireysel hisseleme](/staking/solo/)
- [Hizmet olarak hisseleme](/staking/saas/)
- [Hisseleme havuzları](/staking/pools/)

İşaret Zincirindeki hisse ispatı, 1 Aralık 2020'den beri yayında. Stake etme hâlâ nispeten yeni olsa da, ethereum.org'da değerlendirilmek üzere adil ve şeffaf bir çerçeve oluşturmaya çalıştık, ancak listeleme kriterleri zamanla değişip gelişecek ve bu kriterler nihayetinde ethereum.org web sitesi ekibinin takdirindedir.

## Karar çerçevesi {#the-decision-framework}

Bir ürünün ethereum.org'da listeleme kararı herhangi bir tek faktöre bağlı değildir. Bir ürün veya hizmeti listelemeye karar verirken birden fazla kriter birlikte değerlendirilir. Bu kriterler ne kadar fazla karşılanırsa, listelenme olasılığı o kadar artar.

**İlk olarak, hangi ürün veya hizmet kategorisidir?**

- Düğüm veya istemci araçları
- Anahtar yönetimi
- Bir hizmet olarak staking (SaaS)
- Stake havuzu

Şu anda, yalnızca bu kategorilerdeki ürün veya hizmetleri listeliyoruz.

### Dahil edilme kriterleri {#criteria-for-inclusion}

Stake etme ürünleri veya hizmet sunumları aşağıdaki kriterlere göre değerlendirilecektir:

**Proje veya hizmet ne zaman yayınlandı?**

- Ürün veya hizmetin ne zaman halka arz edildiğine dair kanıt var mı?
- Bu, ürünlerin "kullanılmışlık" puanını belirlemek için kullanılır.

**Proje aktif olarak sürdürülüyor mu?**

- Projeyi geliştiren aktif bir ekip var mı? Projeye kimler dahil?
- Yalnızca aktif olarak bakımı yapılan ürünler dikkate alınacaktır.

**Ürün veya hizmet güvenilen/insan aracılardan arındırılmış mı?**

- Kullanıcıların yolculuğundaki hangi adımlar, fonlarının anahtarlarını elinde tutmak veya ödülleri uygun şekilde dağıtmak için insanlara güvenmeyi gerektiriyor?
- Bu, ürün veya hizmetlerin "güvensizlik" puanını belirlemek için kullanılır.

**Proje, doğru ve güvenilir bilgi sağlıyor mu?**

- Ürünün web sitesinin, özellikle Ethereum protokolü ya da bağlantılı diğer teknolojiler ile ilgili güncel, doğru ve yanlış yönlendirici olmayan bilgiler içermesi çok önemlidir.
- Yanlış bilgi, tarihi geçmiş detaylar, Ethereum ya da alakalı diğer konular ile ilgili yanlış yönlendirme potansiyeli olan ifadeler içeren başvurular listelenmeyecek ya da listelendiyse kaldırılacaktır.

**Hangi platformlar destekleniyor?**

- yani Linux, macOS, Windows, iOS, Android

#### Yazılım ve akıllı sözleşmeler {#software-and-smart-contracts}

İlgili herhangi bir özel yazılım veya akıllı sözleşme için:

**Her şey açık kaynaklı mı?**

- Açık kaynaklı projeler, herkese açık bir kaynak kodu deposuna sahip olmalıdır
- Bu, ürünlerin "açık kaynak" puanını belirlemek için kullanılır.

**Ürün, _beta_ geliştirme aşamasından çıktı mı?**

- Ürün, geliştirme döngüsünün hangi aşamasında?
- Beta aşamasındaki ürünler, ethereum.org'a dahil edilmek üzere değerlendirmeye alınmaz

**Yazılım, harici bir güvenlik denetiminden geçti mi?**

- Geçmediyse, harici denetim gerçekleştirme planı var mı?
- Bu, ürünlerin "denetim" puanını belirlemek için kullanılır.

**Projenin bir hata ödülü programı var mı?**

- Yoksa, bir güvenlik hatası ödülü oluşturma planı var mı?
- Bu, ürünlerin "hata ödülü" puanını belirlemek için kullanılır.

#### Düğüm veya istemci araçları {#node-or-client-tooling}

Düğüm veya istemci kurulumu, yönetimi veya geçişi ile ilgili yazılım ürünleri için:

**Hangi mutabakat katmanı istemcileri (yani Lighthouse, Teku, Nimbus, Prysm, Grandine) destekleniyor?**

- Hangi istemciler destekleniyor? Kullanıcı seçebilir mi?
- Bu, ürünlerin "çoklu istemci" puanını belirlemek için kullanılır.

#### Hizmet olarak hisseleme {#staking-as-a-service}

[Hizmet olarak hisseleme listelemeleri](/staking/saas/) için (yani, yetkilendirilmiş düğüm işlemi):

**Hizmeti kullanmakla ilişkili ücretler nelerdir?**

- Ücret yapısı nedir, örn. hizmet için aylık bir ücret var mı?
- Herhangi bir ek hisseleme gereksinimi var mı?

**Kullanıcıların hesap açmak için kaydolması gerekiyor mu?**

- Birisi hizmeti izinsiz veya KYC olmadan kullanabilir mi?
- Bu, ürünlerin "izinsizlik" puanını belirlemek için kullanılır.

**İmza anahtarları ve çekme anahtarları kimin elinde?**

- Kullanıcı, hangi anahtarlara erişimi elinde tutuyor? Hizmet, hangi anahtarlara erişim sağlıyor?
- Bu, ürünlerin "güvensizlik" puanını belirlemek için kullanılır.

**Çalıştırılan düğümlerin istemci çeşitliliği nedir?**

- Doğrulayıcı anahtarların yüzde kaçı bir çoğunluk fikir birliği katmanı (CL) istemcisi tarafından çalıştırılıyor?
- Son düzenleme itibariyle Prysm, düğüm operatörlerinin çoğunluğu tarafından çalıştırılan fikir birliği katmanı istemcisi hâline gelmiştir ve bu durum, ağ için bir tehlike oluşturmaktadır. Herhangi bir CL istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımıyla ilgili verileri talep ederiz.
- Bu, ürünlerin "istemci çeşitliliği" puanını belirlemek için kullanılır.

#### Hisseleme havuzu {#staking-pool}

[Havuzlu hisseleme hizmetleri](/staking/pools/) için:

**Hisseleme için gereken minimum ETH nedir?**

- örn. 0,01 ETH

**İlgili ücretler veya hisseleme gereksinimleri nelerdir?**

- Ödüllerin yüzde kaçı ücret olarak kaldırılıyor?
- Herhangi bir ek hisseleme gereksinimi var mı?

**Bir likidite token'ı var mı?**

- İlgili jetonlar nelerdir? Nasıl çalışırlar? Sözleşme adresleri nelerdir?
- Bu, ürünlerin "likidite token'ı" puanını belirlemek için kullanılır.

**Kullanıcılar düğüm operatörü olarak katılabilir mi?**

- Havuzlanmış fonları kullanarak doğrulayıcı istemcilerini çalıştırmak için ne gereklidir?
- Bunun için bir kişiden, şirketten veya DAO'dan izin alınması gerekiyor mu?
- Bu, ürünlerin "izin gerektirmeyen düğümler" puanını belirlemek için kullanılır.

**Havuz düğüm operatörlerinin istemci çeşitliliği nedir?**

- Düğüm operatörlerinin yüzde kaçı bir çoğunluk fikir birliği katmanı (CL) istemcisi çalıştırıyor?
- Son düzenleme itibariyle Prysm, düğüm operatörlerinin çoğunluğu tarafından çalıştırılan fikir birliği katmanı istemcisi hâline gelmiştir ve bu durum, ağ için bir tehlike oluşturmaktadır. Herhangi bir CL istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımıyla ilgili verileri talep ederiz.
- Bu, ürünlerin "istemci çeşitliliği" puanını belirlemek için kullanılır.

### Diğer kriterler: olması tercih edilenler {#other-criteria}

**Hangi kullanıcı arayüzleri destekleniyor?**

- yani Tarayıcı uygulaması, masaüstü uygulaması, mobil uygulama, CLI

**Düğüm araçları konusunda yazılım, istemciler arasında geçiş yapmanın kolay bir yolunu sağlıyor mu?**

- Kullanıcı, aracı kullanarak istemcileri kolayca ve güvenli bir şekilde değiştirebiliyor mu?

**SaaS için hizmet tarafından şu anda kaç doğrulayıcı çalıştırılıyor?**

- Bu, bize hizmetinizin şu ana kadarki erişimi hakkında bir fikir verir.

## Sonuçları nasıl gösteriyoruz {#product-ordering}

Yukarıdaki [dahil edilme kriterleri](#criteria-for-inclusion), her ürün veya hizmet için kümülatif bir puanı hesaplamak için kullanılır. Bu, belirli objektif kriterleri karşılayan ürünleri sıralamak ve sergilemek için bir araç olarak kullanılır. Kanıt için ne kadar çok kriter sağlanırsa, bir ürün o kadar yüksek sıralanır ve beraberlikler yükte rastgele hâle getirilir.

Bu kriterlere yönelik kod mantığı ve ağırlıklar şu anda depomuzdaki [bu JavaScript bileşeninde](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) yer almaktadır.

## Ürününüzü veya hizmetinizi ekleyin {#add-product}

Ethereum.org'a hisseleme ürünü veya hizmeti eklemek istiyorsanız GitHub'da bir konu oluşturun.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Bir konu oluşturun
</ButtonLink>
