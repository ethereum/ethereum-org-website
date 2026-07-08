---
title: MaxEB
metaTitle: Pectra MaxEB
description: Pectra sürümündeki MaxEB hakkında daha fazla bilgi edinin
lang: tr
authors: ["Nixo"]
---

*Özet:* Pectra sert çatallanması, Ethereum doğrulayıcılarının **Tip 1** çekim kimlik bilgilerini **Tip 2**'ye dönüştürerek daha yüksek bir maksimum etkin bakiyeye ve bileşik getiriye geçiş yapmasına olanak tanır. Bunu yapmak için resmi araç Launchpad'dir. Bu işlem geri alınamaz.

## Genel Bakış {#overview}

### Kimler etkileniyor? {#who-is-affected}

Doğrulayıcı çalıştıran herkes - bu muhtemelen kontrol ettikleri bir doğrulayıcının endeksini (örn. [Doğrulayıcı #12345](https://beaconcha.in/validator/12345)) bilen biridir. Bir doğrulayıcı çalıştırmak için bir protokol kullanıyorsanız (örn. Lido CSM veya Rocket Pool), MaxEB'yi destekleyip desteklemediklerini ve ne zaman destekleyeceklerini görmek için onlarla iletişime geçmeniz gerekecektir.

Bir likit staking tokeni (LST) (örn. rETH veya stETH) kullanarak stake ediyorsanız, herhangi bir işlem yapmanız gerekmez veya önerilmez.

### "maxEB" nedir? {#what-is-maxeb}

maxEB = bir doğrulayıcının MAKSimum Etkin Bakiyesi (MAXimum Effective Balance). Pectra sert çatallanmasına kadar, her doğrulayıcı maksimum 32 ETH üzerinden kazanç sağlar. Pectra'dan sonra doğrulayıcılar, bu değişikliğe katılarak 32 ile 2048 ETH arasındaki herhangi bir bakiye üzerinden 1 ETH'lik artışlarla kazanç sağlama seçeneğine sahip olurlar.

### Bir doğrulayıcı nasıl geçiş yapar? {#how-does-a-validator-opt-in}

Bir doğrulayıcı, **Tip 1** çekim kimlik bilgilerini **Tip 2**'ye dönüştürerek maxEB değişikliğine geçiş yapar. Bu işlem, Pectra sert çatallanması yayına girdikten sonra [Launchpad (Doğrulayıcı İşlemleri)](https://launchpad.ethereum.org/validator-actions) üzerinden yapılabilir. **Tip 0** → **Tip 1** dönüşümünde olduğu gibi, **Tip 1** → **Tip 2** dönüşümü de geri döndürülemez bir işlemdir.

### Çekim kimlik bilgisi nedir? {#whats-a-withdrawal-credential}

Bir doğrulayıcı çalıştırdığınızda, bir dizi çekim kimlik bilgisine sahip olursunuz. Bunlar yatırma verilerinizin json dosyasında bulunabilir veya doğrulayıcınızın beaconcha.in üzerindeki [yatırma sekmesinde](https://beaconcha.in/validator/12345#deposits) görüntülenebilir.

1. **Tip 0** çekim kimlik bilgileri: Doğrulayıcınızın çekim kimlik bilgileri `0x00...` ile başlıyorsa, Şapella sert çatallanmasından önce yatırma işlemi yapmışsınızdır ve henüz ayarlanmış bir çekim adresiniz yoktur.

![Type 0 withdrawal credential](./0x00-wd.png)

2. **Tip 1** çekim kimlik bilgileri: Doğrulayıcınızın çekim kimlik bilgileri `0x01...` ile başlıyorsa, Şapella sert çatallanmasından sonra yatırma işlemi yapmışsınızdır veya **Tip 0** kimlik bilgilerinizi zaten **Tip 1** kimlik bilgilerine dönüştürmüşsünüzdür.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. **Tip 2** çekim kimlik bilgileri: Bu yeni çekim kimlik bilgisi türü `0x02...` ile başlayacak ve Pectra'dan sonra etkinleştirilecektir. **Tip 2** çekim kimlik bilgilerine sahip doğrulayıcılar bazen "**bileşik doğrulayıcılar (compounding validators)**" olarak adlandırılır.

| **İzin verilen** | **İzin verilmeyen** |
| --- | --- |
| ✅ Tip 0 → Tip 1 | ❌ Tip 0 → Tip 2 |
| ✅ Tip 1 → Tip 2 | ❌ Tip 1 → Tip 0 |
|  | ❌ Tip 2 → Tip 1 |
|  | ❌ Tip 2 → Tip 0 |

### Riskler {#risks}

MaxEB, bir doğrulayıcının tüm bakiyesini başka bir doğrulayıcıya göndermesini sağlar. Birleştirme (consolidation) talebi gönderen kullanıcılar, imzaladıkları işlemin kaynağını ve içeriğini doğrulamalıdır. MaxEB özelliklerinden yararlanmak için resmi araç Launchpad'dir. Eğer üçüncü taraf bir araç kullanmaya karar verirseniz, şunları doğrulamanız gerekir:

- Kaynak doğrulayıcının açık anahtarı (pubkey) ve çekim adresi, kontrol ettikleri doğrulayıcıyla eşleşiyor mu
- Hedef doğrulayıcının açık anahtarı doğru mu ve kendilerine mi ait
- Başka bir doğrulayıcıya fon gönderme niyetleri yoksa, talebin bir birleştirme değil, bir dönüştürme işlemi olup olmadığı
- İşlemin doğru çekim adresi tarafından imzalanıp imzalanmadığı

Kullanmayı planladığınız herhangi bir üçüncü taraf aracı [EthStaker topluluğu](https://ethstaker.org/about) ile tartışmanızı **şiddetle tavsiye ederiz**. Yaklaşımınızı kontrol etmek ve hatalardan kaçınmak için yararlı bir yerdir. Kötü niyetli veya yanlış yapılandırılmış bir araç kullanırsanız, **tüm doğrulayıcı bakiyeniz kontrol etmediğiniz bir doğrulayıcıya gönderilebilir** — ve bunu geri almanın hiçbir yolu yoktur.

## Teknik detaylar {#technical-details}

### Akış {#the-flow}

`ConsolidationRequest` işleminin iki kullanımı olacaktır:

1. Mevcut bir doğrulayıcıyı **Tip 1**'den **Tip 2** doğrulayıcıya dönüştürmek
2. Diğer doğrulayıcıları mevcut bir **Tip 2** doğrulayıcıda birleştirmek

Bir **Tip 1** doğrulayıcının **Tip 2** doğrulayıcıya dönüştürülmesinde, hem *kaynak* hem de *hedef*, dönüştürdüğünüz doğrulayıcı olacaktır. İşlem Gaz maliyetine neden olacak ve diğer birleştirme taleplerinin arkasında sıraya alınacaktır. Bu sıra, yatırma sırasından **bağımsızdır**, yeni doğrulayıcı yatırma işlemlerinden etkilenmez ve [pectrified.com](https://pectrified.com/) adresinden görüntülenebilir.

Doğrulayıcıları birleştirmek için, **Tip 2** çekim kimlik bilgisine sahip bir *hedef doğrulayıcınız* olmalıdır. Bu, birleştirilen tüm doğrulayıcı bakiyelerinin varış noktasıdır ve korunan endekstir.

### Tip 2'ye dönüştürme gereksinimleri {#requirements-for-converting-to-type-2}

Bu, **Tip 2**'ye dönüştürdüğünüz ilk doğrulayıcı için gerekli olacaktır. Bu doğrulayıcının endeksi korunur ve aktiftir. Bir dönüştürme işlemi için, *kaynak doğrulayıcı* == *hedef doğrulayıcıdır.*

Doğrulayıcı şunları sağlamalıdır...

- aktif olmalıdır
- **Tip 1** çekim kimlik bilgilerine sahip olmalıdır
- çıkış durumunda (veya ceza kesintisine uğramış) olmamalıdır
- bekleyen manuel olarak tetiklenmiş çekim işlemleri olmamalıdır (otomatik aktarımlar/süpürmeler için geçerli değildir)

![conversion illustration](./conversion.png)

### Birleştirme gereksinimleri {#requirements-for-consolidating}

Bu, dönüştürme ile *aynı işlemdir* ancak *kaynak doğrulayıcının* *hedef doğrulayıcıdan* farklı olduğu durumdur. Hedef doğrulayıcının endeksi korunur ve kaynak doğrulayıcıdan gelen bakiyeyi kabul eder. Kaynak doğrulayıcının endeksi `EXITED` durumuna getirilir.

Bu durumda, kaynak doğrulayıcı yukarıdaki tüm gereksinimlere ek olarak şunlara sahip olmalıdır:

- en az ~27,3 saattir (bir `SHARD_COMMITTEE_PERIOD`) aktif olmalıdır

Hedef doğrulayıcı şunları sağlamalıdır:

- **Tip 2** çekim kimlik bilgilerine sahip olmalıdır
- çıkış durumunda olmamalıdır.

![consolidation illustration](./consolidation.png)

### Birleştirme talebi {#the-consolidation-request}

Birleştirme talebi, kaynak doğrulayıcıyla ilişkili çekim adresi tarafından imzalanacak ve şunları içerecektir:

1. Kaynak doğrulayıcının adresi (örn. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Kaynak doğrulayıcının açık anahtarı (örn. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Hedef doğrulayıcının açık anahtarı

Bir dönüştürme işleminde 2 ve 3 aynı olacaktır. Bu işlem [Launchpad](https://launchpad.ethereum.org/) üzerinden yapılabilir.

### İmzalama gereksinimleri {#signing-requirements}

Bir `ConsolidationRequest` göndermek için, **kaynak doğrulayıcının çekim adresi** talebi imzalamalıdır. Bu, doğrulayıcı fonları üzerindeki kontrolü kanıtlar.

### Ne imzalanır? {#what-is-signed}

`ConsolidationRequest` nesnesinin etki alanı ayrılmış (domain-separated) bir [imzalama kökü (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) kullanılır.

- **Etki Alanı (Domain):** `DOMAIN_CONSOLIDATION_REQUEST`
- **İmzalama kökü alanları:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Ortaya çıkan **BLS imzası**, taleple birlikte gönderilir.

Not: İmzalama işlemi doğrulayıcı anahtarı tarafından değil, çekim adresi tarafından yapılır.

### Kısmi çekim işlemleri {#partial-withdrawals}

**Tip 1** kimlik bilgilerine sahip doğrulayıcılar, fazla bakiyelerinin (32 ETH'nin üzerindeki herhangi bir miktar) çekim adreslerine otomatik ve Gazsız olarak aktarılmasını (sweep) sağlarlar. **Tip 2**, bir doğrulayıcının bakiyeleri 1 ETH'lik artışlarla birleştirmesine izin verdiğinden, 2048 ETH'ye ulaşana kadar bakiyeleri otomatik olarak aktarmaz. **Tip 2** doğrulayıcılardaki kısmi çekim işlemleri manuel olarak tetiklenmelidir ve Gaz maliyetine neden olacaktır.

## Birleştirme araçları {#consolidation-tooling}

Birleştirmeleri yönetmek için kullanılabilecek çeşitli araçlar vardır. Ethereum Vakfı tarafından oluşturulan resmi araç [Launchpad](https://launchpad.ethereum.org/en/validator-actions)'dir. Ayrıca staking topluluğundaki kuruluşlar tarafından oluşturulan ve Launchpad tarafından sağlanmayan özellikler sunabilen üçüncü taraf araçlar da vardır. Buradaki araçlar Ethereum Vakfı tarafından denetlenmemiş veya onaylanmamış olsa da, aşağıdakiler topluluğun bilinen üyeleri tarafından sunulan açık kaynaklı araçlardır.

| Araç | Web Sitesi | Açık kaynak | Oluşturan | Denetlendi mi? | Arayüz | Önemli özellikler |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Evet, Apache 2.0 | [Pier Two](https://piertwo.com/) | Hayır | Web Arayüzü | WalletConnect, SAFE ile çalışır |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Evet, MIT | [Luganodes](https://www.luganodes.com/) | Evet, Quantstamp [Mayıs 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Komut satırı | Toplu işleme, aynı anda birçok doğrulayıcı için |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Evet, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Hayır | Komut satırı | Doğrulayıcı ve düğüm yönetimi için tam özellik seti |
| Siren | [GitHub](https://github.com/sigp/siren) | Evet, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Hayır | Kısmen komut satırı, ancak ağırlıklı olarak web arayüzü | Yalnızca Lighthouse fikir birliği istemcisi kullanıyorsanız çalışır |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Evet, MIT lisansları | [Stakely](https://stakely.io/) | Hayır | Web Arayüzü, stakely tarafından barındırılır ve ücretsiz olarak kendi sunucunuzda barındırılmaya hazırdır | WalletConnect ile safe dahil olmak üzere başlıca cüzdan bağlantılarını destekler |

## SSS {#faq}

### Geçiş yapmak teklif şansımı veya ödüllerimi değiştirir mi? {#change-luck-or-rewards}

Hayır. Geçiş yapmak teklif şansınızı azaltmaz - görevleriniz ve teklif seçiminiz aynı kalır. Örneğin, iki adet 32 ETH'lik doğrulayıcınız veya bir adet 64 ETH'lik doğrulayıcınız olması durumunda, bir blok teklif etmek üzere seçilme ve ödül kazanma şansınız toplamda aynı olacaktır.

### Geçiş yapmak ceza kesintisi (slashing) riskimi değiştirir mi? {#change-slashing-risk}

Daha küçük veya profesyonel olmayan operatörler için kısa cevap hayırdır. Daha uzun cevap ise, hızlı uyarı sistemleriyle düğüm başına birçok doğrulayıcı çalıştıran profesyonel operatörler için, daha az sayıda doğrulayıcıda birleşmenin, bir ceza kesintisine tepki verme ve zincirleme olayları önleme yeteneklerini azaltabileceğidir. Bu riski dengelemek için tüm doğrulayıcılar için başlangıç ceza kesintisi *cezası* 1 ETH'den (32 ETH başına) 0,0078125 ETH'ye (32 ETH başına) önemli ölçüde düşürülmüştür.

### Dönüştürmek için doğrulayıcımdan çıkış yapmalı mıyım? {#exit-validator}

Hayır. Çıkış yapmadan yerinde dönüştürebilirsiniz.

### Dönüştürmek / birleştirmek ne kadar sürer? {#how-long}

Minimum 27,3 saat sürer ancak birleştirmeler de bir sıraya tabidir. Bu sıra, yatırma ve çekim sıralarından bağımsızdır ve onlardan etkilenmez.

### Doğrulayıcı endeksimi koruyabilir miyim? {#keep-validator-index}

Evet. Yerinde dönüştürme aynı doğrulayıcı endeksini korur. Birden fazla doğrulayıcıyı birleştirirseniz, yalnızca *hedef doğrulayıcının* endeksini koruyabilirsiniz.

### Onayları (attestations) kaçırır mıyım? {#miss-attestations}

Başka bir doğrulayıcıya birleştirme sırasında, kaynak doğrulayıcıdan çıkış yapılır ve bakiyenin hedef doğrulayıcıda aktif hale gelmesinden önce ~27 saatlik bir bekleme süresi vardır. Bu süre **performans metriklerini etkilemez**.

### Cezalara maruz kalır mıyım? {#incur-penalties}

Hayır. Doğrulayıcınız çevrimiçi olduğu sürece cezalara maruz kalmazsınız.

### Birleştirilen doğrulayıcıların çekim adresleri eşleşmek zorunda mı? {#withdrawal-addresses-match}

Hayır. Ancak *kaynak*, talebi kendi adresinden yetkilendirmelidir.

### Dönüştürdükten sonra ödüllerim bileşik getiri sağlar mı? {#rewards-compound}

Evet. **Tip 2** kimlik bilgileriyle, 32 ETH'nin üzerindeki ödüller otomatik olarak yeniden stake edilir — ancak anında değil. Küçük bir tampon (buna [*histerezis*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis) denir) nedeniyle, fazlalığın yeniden stake edilmesinden önce bakiyenizin **yaklaşık 1,25 ETH daha** artması gerekir. Yani 33,0 ETH'de bileşik getiri sağlamak yerine, bu işlem 33,25'te (etkin bakiye = 33 ETH), ardından 34,25'te (etkin bakiye = 34 ETH) ve bu şekilde devam eder.

### Dönüştürdükten sonra hala otomatik aktarımlar (sweeps) alabilir miyim? {#automatic-sweep}

Otomatik aktarımlar yalnızca 2048'in üzerindeki fazla bakiyelerde gerçekleşecektir. Diğer tüm kısmi çekim işlemleri için bunları manuel olarak tetiklemeniz gerekecektir.

### Fikrimi değiştirip Tip 2'den Tip 1'e geri dönebilir miyim? {#go-back-to-type1}

Hayır. **Tip 2**'ye dönüştürme işlemi geri alınamaz.

### Birden fazla doğrulayıcıyı birleştirmek istersem, önce her birini Tip 2'ye dönüştürmem gerekir mi? {#consolidate-multiple-validators}

Hayır! Bir doğrulayıcıyı Tip 2'ye dönüştürün ve ardından onu hedef olarak kullanın. Bu Tip 2 hedefine birleştirilen diğer tüm doğrulayıcılar Tip 1 veya Tip 2 olabilir.

### Doğrulayıcım çevrimdışı veya 32 ETH'nin altında - yine de dönüştürebilir miyim? {#offline-or-below-32eth}

Evet. Aktif olduğu (çıkış yapmadığı) ve çekim adresiyle imzalayabildiğiniz sürece dönüştürebilirsiniz.

## Kaynaklar {#resources}

- [Electra mutabakat spesifikasyonları](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Bu, güvenmeniz gereken 'en doğru' sürümdür. Şüpheye düştüğünüzde spesifikasyonları okuyun.
- Herkes kodlar arasında gezinmekte rahat değildir, bu nedenle [bu maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) spesifikasyonları yorumlamaya yardımcı olabilir. *Sorumluluk Reddi: Yapay zeka bilgileri yanlış yorumlayabileceğinden veya halüsinasyon görebileceğinden, gerçek olarak yapay zekaya değil spesifikasyonlara güvenilmelidir.*
- [pectrified.com](https://pectrified.com/): Birleştirmelerin, yatırma işlemlerinin durumunu ve sıra bekleme sürelerini görüntüleyin.
- [Ethereal](https://github.com/wealdtech/ethereal): Yaygın doğrulayıcı görevlerini yönetmek için topluluk tarafından oluşturulan CLI aracı.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Birden fazla Ethereum doğrulayıcısının tek bir işlemde yatırılmasına olanak tanıyan, topluluk tarafından oluşturulmuş sözleşme.