---
title: Staking ürünleri veya hizmetleri ekleme
description: ethereum.org'a bir staking ürünü veya hizmeti eklerken kullandığımız politika
lang: tr
---

Kullanıcıları güvende ve kendinden emin tutarken mümkün olan en iyi kaynakları listelediğimizden emin olmak istiyoruz.

Herkes ethereum.org'a bir staking ürünü veya hizmeti eklenmesini önermekte özgürdür. Gözden kaçırdığımız bir tane varsa, **[lütfen önerin](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Şu anda staking ürünlerini ve hizmetlerini aşağıdaki sayfalarda listeliyoruz:

- [Bireysel staking](/staking/solo/)
- [Hizmet olarak staking](/staking/saas/)
- [Staking havuzları](/staking/pools/)

İşaret zinciri üzerindeki Hisse Kanıtı (PoS), 1 Aralık 2020'den beri yayındadır. Staking hala nispeten yeni olsa da, ethereum.org'da değerlendirme için adil ve şeffaf bir çerçeve oluşturmaya çalıştık, ancak listeleme kriterleri zamanla değişip gelişecektir ve nihayetinde ethereum.org web sitesi ekibinin takdirindedir.

## Karar çerçevesi {#the-decision-framework}

Bir ürünü ethereum.org'da listeleme kararı tek bir faktöre bağlı değildir. Bir ürünü veya hizmeti listelemeye karar verirken birden fazla kriter birlikte değerlendirilir. Bu kriterlerden ne kadarı karşılanırsa, listelenme olasılığı o kadar artar.

**İlk olarak, hangi ürün veya hizmet kategorisinde?**

- Düğüm veya istemci araçları
- Anahtar yönetimi
- Hizmet olarak staking (SaaS)
- Staking havuzu

Şu anda yalnızca bu kategorilerdeki ürünleri veya hizmetleri listeliyoruz.

### Dahil edilme kriterleri {#criteria-for-inclusion}

Staking ürünleri veya hizmetleri başvuruları aşağıdaki kriterlere göre değerlendirilecektir:

**Proje veya hizmet ne zaman başlatıldı?**

- Ürünün veya hizmetin halka ne zaman sunulduğuna dair kanıt var mı?
- Bu, ürünlerin "savaş testinden geçmiş" puanını belirlemek için kullanılır.

**Projenin bakımı aktif olarak yapılıyor mu?**

- Projeyi geliştiren aktif bir ekip var mı? Kimler dahil?
- Yalnızca aktif olarak bakımı yapılan ürünler dikkate alınacaktır.

**Ürün veya hizmet güvenilen/insan aracılardan arındırılmış mı?**

- Kullanıcı yolculuğundaki hangi adımlar, fonlarının anahtarlarını tutmaları veya ödülleri düzgün bir şekilde dağıtmaları için insanlara güvenmeyi gerektirir?
- Bu, ürünün veya hizmetin "güven gerektirmeyen" puanını belirlemek için kullanılır.

**Proje doğru ve güvenilir bilgi sağlıyor mu?**

- Ürünün web sitesinin, özellikle Ethereum protokolü veya ilgili diğer teknolojilerle ilgiliyse, güncel, doğru ve yanıltıcı olmayan bilgiler içermesi çok önemlidir.
- Ethereum veya diğer ilgili konular hakkında yanlış bilgi, güncel olmayan ayrıntılar veya potansiyel olarak yanıltıcı ifadeler içeren başvurular listelenmeyecek veya halihazırda listelenmişse kaldırılacaktır.

**Hangi platformlar destekleniyor?**

- ör. Linux, macOS, Windows, iOS, Android

#### Yazılım ve akıllı sözleşmeler {#software-and-smart-contracts}

İlgili herhangi bir özel yazılım veya akıllı sözleşme için:

**Her şey açık kaynaklı mı?**

- Açık kaynaklı projelerin herkese açık bir kaynak kod deposu olmalıdır
- Bu, ürünlerin "açık kaynak" puanını belirlemek için kullanılır.

**Ürün _beta_ geliştirme aşamasından çıktı mı?**

- Ürün geliştirme döngüsünün neresinde?
- Beta aşamasındaki ürünler ethereum.org'a dahil edilmek üzere değerlendirilmez

**Yazılım harici bir güvenlik denetiminden geçti mi?**

- Geçmediyse, harici bir denetim yapma planları var mı?
- Bu, ürünlerin "denetlenmiş" puanını belirlemek için kullanılır.

**Projenin bir hata ödül programı var mı?**

- Yoksa, bir güvenlik hata ödülü oluşturma planları var mı?
- Bu, ürünlerin "hata ödülü" puanını belirlemek için kullanılır.

#### Düğüm veya istemci araçları {#node-or-client-tooling}

Düğüm veya istemci kurulumu, yönetimi veya geçişi ile ilgili yazılım ürünleri için:

**Hangi mutabakat katmanı istemcileri (ör. Lighthouse, Teku, Nimbus, Prysm, Grandine) destekleniyor?**

- Hangi istemciler destekleniyor? Kullanıcı seçebilir mi?
- Bu, ürünlerin "çoklu istemci" puanını belirlemek için kullanılır.

#### Hizmet olarak staking {#staking-as-a-service}

[Hizmet olarak staking listelemeleri](/staking/saas/) (ör. devredilmiş düğüm operasyonu) için:

**Hizmeti kullanmakla ilişkili ücretler nelerdir?**

- Ücret yapısı nedir, ör. hizmet için aylık bir ücret var mı?
- Ek staking gereksinimleri var mı?

**Kullanıcıların bir hesap için kaydolması gerekiyor mu?**

- Birisi hizmeti izinsiz veya KYC olmadan kullanabilir mi?
- Bu, ürünlerin "izinsiz" puanını belirlemek için kullanılır.

**İmzalama anahtarlarını ve çekim anahtarlarını kim tutuyor?**

- Kullanıcı hangi anahtarlara erişimini sürdürüyor? Hizmet hangi anahtarlara erişim kazanıyor?
- Bu, ürünlerin "güven gerektirmeyen" puanını belirlemek için kullanılır.

**İşletilen düğümlerin istemci çeşitliliği nedir?**

- Doğrulayıcı anahtarlarının yüzde kaçı çoğunlukta olan bir mutabakat katmanı (CL) istemcisi tarafından çalıştırılıyor?
- Son düzenleme itibarıyla Prysm, düğüm operatörlerinin çoğunluğu tarafından çalıştırılan mutabakat katmanı istemcisidir ve bu ağ için tehlikelidir. Herhangi bir CL istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımına ilişkin veriler talep ediyoruz.
- Bu, ürünlerin "çeşitli istemciler" puanını belirlemek için kullanılır.

#### Staking havuzu {#staking-pool}

[Havuzlu staking hizmetleri](/staking/pools/) için:

**Stake etmek için gereken minimum ETH nedir?**

- ör. 0,01 ETH

**İlgili ücretler veya staking gereksinimleri nelerdir?**

- Ödüllerin yüzde kaçı ücret olarak kesiliyor?
- Ek staking gereksinimleri var mı?

**Bir likidite token'ı var mı?**

- İlgili token'lar nelerdir? Nasıl çalışırlar? Sözleşme adresleri nelerdir?
- Bu, ürünlerin "likidite token'ı" puanını belirlemek için kullanılır.

**Kullanıcılar bir düğüm operatörü olarak katılabilir mi?**

- Havuzlanmış fonları kullanarak doğrulayıcı istemcileri çalıştırmak için ne gereklidir?
- Bu bir bireyden, şirketten veya DAO'dan izin gerektirir mi?
- Bu, ürünlerin "izinsiz düğümler" puanını belirlemek için kullanılır.

**Havuz düğüm operatörlerinin istemci çeşitliliği nedir?**

- Düğüm operatörlerinin yüzde kaçı çoğunlukta olan bir mutabakat katmanı (CL) istemcisi çalıştırıyor?
- Son düzenleme itibarıyla Prysm, düğüm operatörlerinin çoğunluğu tarafından çalıştırılan mutabakat katmanı istemcisidir ve bu ağ için tehlikelidir. Herhangi bir CL istemcisi şu anda ağın %33'ünden fazlası tarafından kullanılıyorsa, kullanımına ilişkin veriler talep ediyoruz.
- Bu, ürünlerin "çeşitli istemciler" puanını belirlemek için kullanılır.

### Diğer kriterler: olması iyi olanlar {#other-criteria}

**Hangi kullanıcı arayüzleri destekleniyor?**

- ör. Tarayıcı uygulaması, masaüstü uygulaması, mobil uygulama, CLI

**Düğüm araçları için, yazılım istemciler arasında geçiş yapmak için kolay bir yol sağlıyor mu?**

- Kullanıcı aracı kullanarak istemcileri kolayca ve güvenli bir şekilde değiştirebilir mi?

**SaaS için, şu anda hizmet tarafından kaç doğrulayıcı işletiliyor?**

- Bu bize hizmetinizin şu ana kadarki erişimi hakkında bir fikir verir.

## Sonuçları nasıl görüntülüyoruz {#product-ordering}

Yukarıdaki [dahil edilme kriterleri](#criteria-for-inclusion), her ürün veya hizmet için kümülatif bir puan hesaplamak amacıyla kullanılır. Bu, belirli nesnel kriterleri karşılayan ürünleri sıralamak ve sergilemek için bir araç olarak kullanılır. Ne kadar çok kriter için kanıt sağlanırsa, bir ürün o kadar üst sıralarda yer alır ve eşitlik durumunda yükleme sırasında rastgele sıralanır.

Bu kriterlerin kod mantığı ve ağırlıkları şu anda depomuzdaki [bu JavaScript bileşeninde](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) yer almaktadır.

## Ürününüzü veya hizmetinizi ekleyin {#add-product}

ethereum.org'a bir staking ürünü veya hizmeti eklemek istiyorsanız, GitHub'da bir sorun oluşturun.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Bir sorun oluşturun
</ButtonLink>