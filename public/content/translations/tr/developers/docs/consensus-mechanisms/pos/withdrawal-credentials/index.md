---
title: "Çekim kimlik bilgileri"
description: "Doğrulayıcı çekim kimlik bilgisi türlerinin (0x00, 0x01, 0x02) ve bunların Ethereum staker'ları için etkilerinin bir açıklaması."
lang: tr
---

Her doğrulayıcının, stake edilen ETH'lerinin ve ödüllerinin nasıl ve nereye çekilebileceğini belirleyen bir **çekim kimlik bilgisi** vardır. Kimlik bilgisi türü ilk bayt ile belirtilir: `0x00`, `0x01` veya `0x02`. Bu türleri anlamak, stake'lerini yöneten doğrulayıcılar için önemlidir.

## 0x00: Şapella öncesi kimlik bilgileri {#0x00-credentials}

`0x00` türü, Şapella yükseltmesinden (Nisan 2023) önceki orijinal çekim kimlik bilgisi formatıdır. Bu kimlik bilgisi türüne sahip doğrulayıcıların ayarlanmış bir yürütme katmanı çekim adresi yoktur, bu da fonlarının mutabakat katmanında kilitli kaldığı anlamına gelir. Hâlâ `0x00` kimlik bilgilerine sahipseniz, herhangi bir çekim işlemi alabilmeniz için önce `0x01` veya `0x02` sürümüne yükseltme yapmalısınız.

## 0x01: Eski çekim kimlik bilgileri {#0x01-credentials}

`0x01` türü, Şapella yükseltmesiyle tanıtıldı ve bir yürütme katmanı çekim adresi ayarlamak isteyen doğrulayıcılar için standart hâline geldi. `0x01` kimlik bilgileriyle:

- 32 ETH'nin üzerindeki herhangi bir bakiye **otomatik olarak** çekim adresinize **aktarılır**
- Tam çıkış işlemleri standart çıkış kuyruğundan geçer
- 32 ETH'nin üzerindeki ödüller birleşemez (bileşik getiri sağlayamaz)—periyodik olarak dışarı aktarılırlar

**Neden bazı doğrulayıcılar hâlâ 0x01 kullanıyor:** Daha basit ve tanıdıktır. Birçok doğrulayıcı Şapella'dan sonra para yatırdı ve zaten bu türe sahip; ayrıca fazla bakiyenin otomatik olarak çekilmesini isteyenler için gayet iyi çalışıyor.

**Neden önerilmiyor:** `0x01` ile, 32 ETH'nin üzerindeki ödülleri birleştirme (bileşik getiri sağlama) yeteneğini kaybedersiniz. Fazlalığın her bir parçası otomatik olarak aktarılır, bu da doğrulayıcınızın kazanç potansiyelini sınırlar ve çekilen fonların ayrı ayrı yönetilmesini gerektirir.

## 0x02: Bileşik çekim kimlik bilgileri {#0x02-credentials}

`0x02` türü Pectra yükseltmesiyle tanıtıldı ve günümüzde doğrulayıcılar için **önerilen seçimdir**. `0x02` kimlik bilgilerine sahip doğrulayıcılara bazen "bileşik doğrulayıcılar" denir.

`0x02` kimlik bilgileriyle:

- 32 ETH'nin üzerindeki ödüller, maksimum 2048 ETH etkin bakiyeye kadar 1 ETH'lik artışlarla **birleşir (bileşik getiri sağlar)**
- Kısmi çekim işlemleri manuel olarak talep edilmelidir (otomatik aktarımlar yalnızca 2048 ETH eşiğinin üzerinde gerçekleşir)
- Doğrulayıcılar, birden fazla 32 ETH'lik doğrulayıcıyı daha yüksek bakiyeli tek bir doğrulayıcıda birleştirebilir (konsolide edebilir)
- Tam çıkış işlemleri standart çıkış kuyruğu aracılığıyla hâlâ desteklenmektedir

Hem kısmi çekim işlemleri hem de birleştirmeler [Launchpad Doğrulayıcı Eylemleri](https://launchpad.ethereum.org/en/validator-actions) aracılığıyla gerçekleştirilebilir.

**Doğrulayıcılar neden 0x02'yi tercih etmeli:** Bileşik getiri yoluyla daha iyi sermaye verimliliği, çekim işlemlerinin ne zaman gerçekleşeceği üzerinde daha fazla kontrol sunar ve doğrulayıcı birleştirmeyi destekler. Zamanla ödül biriktiren solo staker'lar için bu, etkin bakiyelerinin—ve dolayısıyla ödüllerinin—manuel müdahale olmadan 32 ETH'nin ötesine geçebileceği anlamına gelir.

**Önemli:** `0x01` türünden `0x02` türüne dönüştürdükten sonra geri alamazsınız.

Tip 2 kimlik bilgilerine dönüştürme ve MaxEB özelliği hakkında ayrıntılı bir rehber için [MaxEB açıklama sayfasına](/roadmap/pectra/maxeb/) bakın.

## Hangisini seçmeliyim? {#what-should-i-pick}

- **Yeni doğrulayıcılar:** `0x02` seçin. Daha iyi bileşik getiri ve esnekliğe sahip modern standarttır.
- **Mevcut 0x01 doğrulayıcıları:** Ödüllerin 32 ETH'nin üzerinde birleşmesini istiyorsanız veya doğrulayıcıları birleştirmeyi planlıyorsanız `0x02` türüne dönüştürmeyi düşünün.
- **Mevcut 0x00 doğrulayıcıları:** Hemen yükseltin—kimlik bilgilerinizi güncellemeden çekim yapamazsınız. Önce `0x01` türüne, ardından `0x02` türüne dönüştürmelisiniz.

## Çekim kimlik bilgilerini yönetmek için araçlar {#withdrawal-credential-tools}

Çeşitli araçlar kimlik bilgisi türlerini seçmeyi veya bunlar arasında dönüştürme yapmayı destekler:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Kimlik bilgisi dönüştürmeleri ve birleştirmeleri dâhil olmak üzere para yatırma ve doğrulayıcı yönetimi için resmî araç
- **[Pectra Staking Manager](https://pectrastaking.com)** - Dönüştürmeler ve birleştirmeler için cüzdan bağlama destekli Web arayüzü
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Toplu dönüştürmeler için komut satırı aracı
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Doğrulayıcı yönetimi dâhil Ethereum işlemleri için CLI aracı

Birleştirme araçlarının tam listesi ve ayrıntılı dönüştürme talimatları için [MaxEB birleştirme araçları](/roadmap/pectra/maxeb/#consolidation-tooling) bölümüne bakın.

## Daha fazla bilgi {#further-reading}

- [Hisse Kanıtı (PoS) Ethereum'da anahtarlar](/developers/docs/consensus-mechanisms/pos/keys/) - Doğrulayıcı anahtarları ve bunların çekim kimlik bilgileriyle nasıl ilişkili olduğu hakkında bilgi edinin
- [MaxEB](/roadmap/pectra/maxeb/) - Pectra yükseltmesi ve maksimum etkin bakiye özelliği hakkında ayrıntılı rehber