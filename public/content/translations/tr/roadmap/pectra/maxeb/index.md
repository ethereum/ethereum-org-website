---
title: Pectra MaxEB
description: "Pectra sürümündeki MaxEB hakkında daha fazla bilgi edinin"
lang: tr
---

# MaxEB {#maxeb}

_Özet:_ Pectra sert çatalı, Ethereum doğrulayıcılarının **Tip 1**'den **Tip 2**'ye para çekme kimlik bilgilerine dönüştürerek daha yüksek bir maksimum efektif bakiye ve birikim yapma seçeneği sunar. Bunu yapmak için resmî araç Launchpad'dir. Bu işlem geri alınamaz.

## Genel Bakış {#overview}

### Kimler etkileniyor? {#who-is-affected}

Bir doğrulayıcı çalıştıran herkes - bu muhtemelen kontrol ettikleri bir doğrulayıcının dizinini (ör. [Doğrulayıcı #12345](https://beaconcha.in/validator/12345)) bilen birisidir. Bir doğrulayıcı çalıştırmak için bir protokol kullanıyorsanız (ör. Lido CSM veya Rocket Pool), maxEB'yi destekleyip desteklemediklerini ve ne zaman destekleyeceklerini öğrenmek için onlarla görüşmeniz gerekecektir.

Bir likit hisseleme jetonu (ör. rETH veya stETH) kullanarak hisseleme yapıyorsanız, herhangi bir işlem yapmanız gerekmez veya önerilmez.

### "maxEB" nedir? {#what-is-maxeb}

maxEB = bir doğrulayıcının MAKSİMUM Efektif Bakiyesi. Pectra sert çatalına kadar her doğrulayıcı maksimum 32 ETH üzerinden kazanç sağlar. Pectra'dan sonra doğrulayıcılar, değişikliği kabul ederek 32 ila 2048 ETH arasındaki herhangi bir bakiye üzerinden 1 ETH'lik artışlarla kazanç elde etme seçeneğine sahip olacaklar.

### Bir doğrulayıcı nasıl dahil olur? {#how-does-a-validator-opt-in}

Bir doğrulayıcı, **Tip 1**'den **Tip 2**'ye para çekme kimlik bilgilerine dönüştürerek maxEB değişikliğine dahil olur. Bu, Pectra sert çatalı yayına girdikten sonra [Launchpad (Doğrulayıcı Eylemleri)](https://launchpad.ethereum.org/validator-actions) üzerinden yapılabilir. **Tip 0** → **Tip 1**'de olduğu gibi, **Tip 1** → **Tip 2**'ye dönüştürme geri döndürülemez bir işlemdir.

### Para çekme kimlik bilgisi nedir? {#whats-a-withdrawal-credential}

Bir doğrulayıcı çalıştırdığınızda, bir dizi para çekme kimlik bilginiz olur. Bunları para yatırma verisi json dosyanızda bulabilir veya doğrulayıcınızın beaconcha.in [para yatırma sekmesinde](https://beaconcha.in/validator/12345#deposits) görüntüleyebilirsiniz.

1. **Tip 0** para çekme kimlik bilgileri: Doğrulayıcınızın para çekme kimlik bilgileri `0x00...` ile başlıyorsa, Shapella sert çatalından önce para yatırdınız ve henüz bir para çekme adresi belirlemediniz demektir.

![Tip 0 para çekme kimlik bilgisi](./0x00-wd.png)

2. **Tip 1** para çekme kimlik bilgileri: Doğrulayıcınızın para çekme kimlik bilgileri `0x01...` ile başlıyorsa Shapella sert çatalından sonra para yatırdınız veya zaten **Tip 0** kimlik bilgilerinizi **Tip 1** kimlik bilgilerine dönüştürdünüz demektir.

![Tip 1 para çekme kimlik bilgisi](./0x01-wd.png)

3. **Tip 2** para çekme kimlik bilgileri: Bu yeni para çekme kimlik bilgisi türü `0x02...` ile başlayacak ve Pectra'dan sonra etkinleştirilecektir. **Tip 2** para çekme kimlik bilgilerine sahip doğrulayıcılar bazen "**bileşik doğrulayıcılar**" olarak adlandırılır

| **İzin verilir** | **İzin verilmez** |
| ---------------- | ----------------- |
| ✅ Tip 0 → Tip 1  | ❌ Tip 0 → Tip 2   |
| ✅ Tip 1 → Tip 2  | ❌ Tip 1 → Tip 0   |
|                  | ❌ Tip 2 → Tip 1   |
|                  | ❌ Tip 2 → Tip 0   |

### Riskler {#risks}

MaxEB, bir doğrulayıcının tüm bakiyesini başka bir doğrulayıcıya göndermesini sağlar. Birleştirme isteği gönderen kullanıcılar, imzaladıkları işlemin kaynağını ve içeriğini doğrulamalıdır. maxEB özelliklerinden yararlanmak için resmî araç Launchpad'dir. Üçüncü taraf bir araç kullanmaya karar verirseniz, şunları doğrulamanız gerekir:

- Kaynak doğrulayıcının genel anahtarı ve para çekme adresi, kontrol ettikleri doğrulayıcıyla eşleşiyor
- Hedef doğrulayıcının genel anahtarının doğru ve onlara ait olduğu
- Başka bir doğrulayıcıya fon gönderme niyetleri yoksa talebin bir birleştirme değil, bir dönüştürme olduğu
- İşlemin doğru para çekme adresi tarafından imzalandığı

[EthStaker topluluğu](https://ethstaker.org/about) ile kullanmayı planladığınız herhangi bir üçüncü taraf aracını tartışmanızı **şiddetle tavsiye ederiz**. Yaklaşımınızı kontrol etmek ve hatalardan kaçınmak için yararlı bir yerdir. Kötü amaçlı veya yanlış yapılandırılmış bir araç kullanırsanız, **tüm doğrulayıcı bakiyeniz kontrol etmediğiniz bir doğrulayıcıya gönderilebilir** ve geri almanın bir yolu yoktur.

## Teknik detaylar {#technical-details}

### Akış {#the-flow}

`ConsolidationRequest` işleminin iki kullanımı olacaktır:

1. Mevcut bir doğrulayıcıyı **Tip 1**'den **Tip 2** doğrulayıcıya dönüştürme
2. Diğer doğrulayıcıları mevcut bir **Tip 2** doğrulayıcıda birleştirme

**Tip 1** bir doğrulayıcının **Tip 2** bir doğrulayıcıya dönüştürülmesinde hem _kaynak_ hem de _hedef_, dönüştürdüğünüz doğrulayıcı olacaktır. İşlem gaza mal olacak ve diğer birleştirme taleplerinin arkasında sıraya alınacaktır. Bu sıra, para yatırma sırasından **ayrıdır** ve yeni doğrulayıcı para yatırma işlemlerinden etkilenmez ve [pectrified.com](https://pectrified.com/) adresinde görüntülenebilir.

Doğrulayıcıları birleştirmek için **Tip 2** para çekme kimlik bilgisine sahip bir _hedef doğrulayıcınız_ olmalıdır. Bu, birleştirilen tüm doğrulayıcı bakiyelerinin hedefi ve korunan dizindir.

### Tip 2'ye dönüştürme gereksinimleri {#requirements-for-converting-to-type-2}

Bu, **Tip 2**'ye dönüştürdüğünüz ilk doğrulayıcı için gerekli olacaktır. Bu doğrulayıcının dizini korunur ve aktiftir. Bir dönüştürme için, _kaynak doğrulayıcı_ == _hedef doğrulayıcıdır._

Doğrulayıcı şunları yapmalıdır...

- aktif olmalı
- **Tip 1** para çekme kimlik bilgilerine sahip olmalı
- bir çıkış durumunda olmamalı (veya cezalandırılmış)
- bekleyen manuel olarak tetiklenen para çekme işlemlerine sahip olmamalı (süpürmeler için geçerli değildir)

![dönüşüm çizimi](./conversion.png)

### Birleştirme gereksinimleri {#requirements-for-consolidating}

Bu, dönüştürme ile _aynı işlemdir_ ancak _kaynak doğrulayıcının_ _hedef doğrulayıcıdan_ farklı olduğu zamandır. Hedef doğrulayıcının dizini korunur ve kaynak doğrulayıcıdan gelen bakiyeyi kabul eder. Kaynak doğrulayıcının dizini `EXITED` durumuna alınır.

Bu durumda, kaynak doğrulayıcı yukarıdaki gereksinimlerin tümüne ve ek olarak şunlara sahiptir:

- en az ~27,3 saattir aktif olmalı (bir `SHARD_COMMITTEE_PERIOD`)

Hedef doğrulayıcı şunları yapmalıdır

- **Tip 2** para çekme kimlik bilgilerine sahip olmalı
- bir çıkış durumunda olmamalıdır.

![birleştirme çizimi](./consolidation.png)

### Birleştirme talebi {#the-consolidation-request}

Birleştirme talebi, kaynak doğrulayıcıyla ilişkili para çekme adresi tarafından imzalanacak ve şunları içerecektir:

1. Kaynak doğrulayıcının adresi (örneğin, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Kaynak doğrulayıcının genel anahtarı (örneğin, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Bu hedef doğrulayıcının açık anahtarı

Bir dönüştürmede 2 ve 3 aynı olacaktır. Bu işlem [Launchpad](https://launchpad.ethereum.org/) üzerinde yapılabilir.

### İmzalama gereksinimleri {#signing-requirements}

`ConsolidationRequest` göndermek için **kaynak doğrulayıcının para çekme adresi** talebi imzalamalıdır. Bu, doğrulayıcı fonları üzerindeki kontrolü kanıtlar.

### Ne imzalanır? {#what-is-signed}

`ConsolidationRequest` nesnesinin alan ayrılmış bir [imzalama kökü](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) kullanılır.

- **Alan:** `DOMAIN_CONSOLIDATION_REQUEST`
- **İmzalama kök alanları:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Ortaya çıkan **BLS imzası** taleple birlikte gönderilir.

Not: İmzalama, doğrulayıcı anahtarı tarafından değil, para çekme adresi tarafından yapılır.

### Kısmi para çekme işlemleri {#partial-withdrawals}

**Tip 1** kimlik bilgilerine sahip doğrulayıcılar, fazla bakiyelerinin (32 ETH'nin üzerindeki her şey) para çekme adreslerine otomatik, gazsız süpürmelerini alırlar. **Tip 2**, bir doğrulayıcının bakiyeleri 1 ETH'lik artışlarla birleştirmesine izin verdiğinden, 2048 ETH'ye ulaşana kadar bakiyeleri otomatik olarak süpürmeyecektir. **Tip 2** doğrulayıcılarda kısmi para çekme işlemleri manuel olarak tetiklenmeli ve gaza mal olacaktır.

## Birleştirme araçları {#consolidation-tooling}

Birleştirmeleri yönetmek için çeşitli araçlar mevcuttur. Ethereum Foundation tarafından oluşturulan resmî araç [Launchpad](https://launchpad.ethereum.org/en/validator-actions)'dir. Ayrıca, hisseleme topluluğundan kuruluşlar tarafından oluşturulan ve Launchpad tarafından sunulmayan özellikler sunabilen üçüncü taraf araçlar da vardır. Buradaki araçlar Ethereum Foundation tarafından denetlenmemiş veya onaylanmamış olsa da, aşağıdakiler topluluğun tanınmış üyeleri tarafından oluşturulmuş açık kaynaklı araçlardır.

| Araç                                       | Web sitesi                                                                                                | Açık kaynak                      | Oluşturan                                      | Denetlendi                                                                                                                                             | Arayüz                                                                                         | Önemli özellikler                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Pectra Hisseleme Yöneticisi                | pectrastaking.com                                                                         | Evet, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Hayır                                                                                                                                                  | Web Kullanıcı Arayüzü                                                                          | Wallet Connect, SAFE ile çalışır                                                  |
| Pectra Doğrulayıcı Operasyonları CLI Aracı | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Evet, MIT                        | [Luganodes](https://www.luganodes.com/)        | Evet, Quantstamp [Mayıs 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Komut satırı                                                                                   | Aynı anda birçok doğrulayıcı için toplu işlem                                     |
| Ethereal                                   | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Evet, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Hayır                                                                                                                                                  | Komut satırı                                                                                   | Doğrulayıcı ve düğüm yönetimi için tam özellik seti                               |
| Siren                                      | [GitHub](https://github.com/sigp/siren)                                                                   | Evet, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Hayır                                                                                                                                                  | Kısmen komut satırı, ancak öncelikli olarak web arayüzü                                        | Yalnızca Lighthouse mutabakat istemcisini kullanıyorsanız çalışır                 |
| Consolideth.app            | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Evet, MIT lisansları             | [Stakely](https://stakely.io/)                 | Hayır                                                                                                                                                  | Web Arayüzü, Stakely tarafından barındırılıyor ve serbestçe kendi kendine barındırılmaya hazır | Walletconnect ile güvenli dahil olmak üzere büyük cüzdan bağlantılarını destekler |

## SSS {#faq}

### Katılmak teklif şansımı veya ödüllerimi değiştirir mi? {#change-luck-or-rewards}

Hayır. Katılmak teklif şansınızı azaltmaz; görevleriniz ve teklif seçiminiz aynı kalır. Örneğin, iki adet 32 ETH'lik doğrulayıcıya karşılık bir adet 64 ETH'lik doğrulayıcınız varsa, bir blok önermek ve ödül kazanmak için seçilme şansınız toplamda aynı olacaktır.

### Katılmak cezalandırılma riskimi değiştirir mi? {#change-slashing-risk}

Daha küçük veya profesyonel olmayan operatörler için kısa cevap hayırdır. Daha uzun cevap ise, hızlı uyarılarla düğüm başına birçok doğrulayıcı çalıştıran profesyonel operatörler için, daha az doğrulayıcıya birleştirmenin bir cezalandırmaya tepki verme ve zincirleme olayları önleme yeteneklerini azaltabileceğidir. Tüm doğrulayıcılar için ilk cezalandırma _cezası_, bu riski dengelemek için 1 ETH'den (32 ETH başına) 0,0078125 ETH'ye (32 ETH başına) önemli ölçüde düşürülmüştür.

### Dönüştürmek için doğrulayıcımdan çıkmam gerekiyor mu? {#exit-validator}

Hayır. Çıkış yapmadan yerinde dönüştürebilirsiniz.

### Dönüştürme/birleştirme ne kadar sürer? {#how-long}

En az 27,3 saat, ancak birleştirmeler de bir sıraya tabidir. Bu sıra, para yatırma ve çekme sıralarından bağımsızdır ve onlardan etkilenmez.

### Doğrulayıcı dizinimi koruyabilir miyim? {#keep-validator-index}

Evet. Yerinde dönüştürme, aynı doğrulayıcı dizinini korur. Birden fazla doğrulayıcıyı birleştirirseniz, yalnızca _hedef doğrulayıcının_ dizinini koruyabilirsiniz.

### Tasdikleri kaçıracak mıyım? {#miss-attestations}

Başka bir doğrulayıcıya birleştirme sırasında, kaynak doğrulayıcıdan çıkış yapılır ve bakiye hedef doğrulayıcıda aktif olmadan önce ~27 saatlik bir bekleme süresi vardır. Bu süre **performans metriklerini etkilemez**.

### Ceza alır mıyım? {#incur-penalties}

Hayır. Doğrulayıcınız çevrimiçi olduğu sürece ceza almazsınız.

### Birleştirilen doğrulayıcıların para çekme adreslerinin eşleşmesi gerekiyor mu? {#withdrawal-addresses-match}

Hayır. Ancak _kaynak_, talebi kendi adresinden yetkilendirmelidir.

### Dönüştürdükten sonra ödüllerim birikecek mi? {#rewards-compound}

Evet. **Tip 2** kimlik bilgileriyle, 32 ETH'nin üzerindeki ödüller otomatik olarak yeniden hissedilir, ancak anında değil. Küçük bir tampon ( [_histerezis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis) olarak adlandırılır) nedeniyle, fazlalığın yeniden hissedilmesi için bakiyenizin **yaklaşık 1,25 ETH daha** fazlasına ulaşması gerekir. Yani 33,0 ETH'de birikmek yerine, 33,25'te (etkin bakiye = 33 ETH), sonra 34,25'te (etkin bakiye = 34 ETH) ve bu şekilde devam eder.

### Dönüştürdükten sonra hala otomatik süpürmeler alabilir miyim? {#automatic-sweep}

Otomatik süpürmeler yalnızca 2048'in üzerindeki fazla bakiyelerde gerçekleşir. Diğer tüm kısmi para çekme işlemleri için bunları manuel olarak tetiklemeniz gerekir.

### Fikrimi değiştirip Tip 2'den Tip 1'e geri dönebilir miyim? {#go-back-to-type1}

Hayır. **Tip 2**'ye dönüştürme geri alınamaz.

### Birden fazla doğrulayıcıyı birleştirmek istiyorsam, önce her birini Tip 2'ye dönüştürmem gerekir mi? {#consolidate-multiple-validators}

Hayır! Bir doğrulayıcıyı Tip 2'ye dönüştürün ve ardından onu hedef olarak kullanın. Bu Tip 2 hedefine birleştirilen diğer tüm doğrulayıcılar Tip 1 veya Tip 2 olabilir

### Doğrulayıcım çevrimdışı veya 32 ETH'nin altında - yine de dönüştürebilir miyim? {#offline-or-below-32eth}

Evet. Aktif olduğu (çıkış yapılmadığı) ve para çekme adresiyle imza atabildiğiniz sürece dönüştürebilirsiniz.

## Kaynaklar {#resources}

- [Electra mutabakat özellikleri](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Bu, güvenmeniz gereken 'en doğru' versiyondur. Şüpheye düştüğünüzde, özellikleri okuyun
- Herkes kodun içinde gezinmekten hoşlanmaz, bu nedenle [bu maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) özellikleri yorumlamanıza yardımcı olabilir. _Sorumluluk Reddi: Yapay zeka bilgiyi yanlış yorumlayabileceğinden veya halüsinasyon cevapları verebileceğinden, doğru olarak yapay zekaya değil, özelliklere güvenilmelidir_
- [pectrified.com](https://pectrified.com/): Birleştirmelerin, para yatırma işlemlerinin ve sıra bekleme sürelerinin durumunu görüntüleyin
- [Ethereal](https://github.com/wealdtech/ethereal): Ortak doğrulayıcı görevlerini yönetmek için topluluk tarafından oluşturulmuş CLI aracı
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Birden çok Ethereum doğrulayıcısının tek bir işlemde yatırılmasına izin veren topluluk tarafından oluşturulmuş sözleşme
