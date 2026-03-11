---
title: "Para çekme kimlik bilgileri"
description: "Doğrulayıcı çekim kimlik bilgisi türlerinin (0x00, 0x01, 0x02) ve bunların Ethereum paydaşları için sonuçlarının bir açıklaması."
lang: tr
---

Her doğrulayıcının, hisselenmiş ETH'lerinin ve ödüllerinin nasıl ve nereye çekilebileceğini belirleyen bir **çekim kimlik bilgisi** vardır. Kimlik bilgisi türü ilk bayt ile belirtilir: `0x00`, `0x01` veya `0x02`. Bu türleri anlamak, hisselerini yöneten doğrulayıcılar için önemlidir.

## 0x00: Shapella öncesi kimlik bilgileri {#0x00-credentials}

`0x00` türü, Shapella yükseltmesinden (Nisan 2023) önceki orijinal çekim kimlik bilgisi biçimidir. Bu kimlik bilgisi türüne sahip doğrulayıcıların ayarlanmış bir yürütme katmanı çekim adresi yoktur, bu da fonlarının mutabakat katmanında kilitli kaldığı anlamına gelir. Hâlâ `0x00` kimlik bilgileriniz varsa, herhangi bir çekim işlemi yapabilmek için `0x01` veya `0x02` sürümüne yükseltmeniz gerekir.

## 0x01: Eski çekim kimlik bilgileri {#0x01-credentials}

`0x01` türü, Shapella yükseltmesiyle tanıtıldı ve bir yürütme katmanı çekim adresi ayarlamak isteyen doğrulayıcılar için standart hâline geldi. `0x01` kimlik bilgileriyle:

- 32 ETH üzerindeki herhangi bir bakiye, çekim adresinize **otomatik olarak aktarılır**
- Tam çıkışlar standart çıkış kuyruğundan geçer
- 32 ETH üzerindeki ödüller katlanarak birikemez; periyodik olarak dışarı aktarılırlar

**Bazı doğrulayıcılar neden hâlâ 0x01 kullanıyor:** Daha basit ve alışıldık. Birçok doğrulayıcı Shapella'dan sonra para yatırdı ve zaten bu türe sahip. Fazla bakiyenin otomatik olarak çekilmesini isteyenler için de gayet iyi çalışıyor.

**Neden tavsiye edilmiyor:** `0x01` ile 32 ETH üzerindeki ödülleri katlayarak biriktirme yeteneğini kaybedersiniz. Her bir fazlalık otomatik olarak çekilir, bu da doğrulayıcınızın kazanma potansiyelini sınırlar ve çekilen fonların ayrı olarak yönetilmesini gerektirir.

## 0x02: Birikimli çekim kimlik bilgileri {#0x02-credentials}

`0x02` türü, Pectra yükseltmesiyle tanıtıldı ve günümüzde doğrulayıcılar için **önerilen seçimdir**. `0x02` kimlik bilgilerine sahip doğrulayıcılar bazen "birikimli doğrulayıcılar" olarak adlandırılır.

`0x02` kimlik bilgileriyle:

- 32 ETH'nin üzerindeki ödüller, maksimum 2048 ETH'lik etkin bakiyeye ulaşana kadar 1 ETH'lik artışlarla **katlanarak birikir**
- Kısmi çekimler manuel olarak talep edilmelidir (otomatik aktarımlar yalnızca 2048 ETH eşiğinin üzerinde gerçekleşir)
- Doğrulayıcılar, birden fazla 32 ETH'lik doğrulayıcıyı tek bir daha yüksek bakiyeli doğrulayıcıda birleştirebilir
- Tam çıkışlar hâlâ standart çıkış kuyruğu aracılığıyla desteklenmektedir

Hem kısmi para çekme hem de birleştirme işlemleri [Launchpad Doğrulayıcı Eylemleri](https://launchpad.ethereum.org/en/validator-actions) aracılığıyla gerçekleştirilebilir.

**Doğrulayıcılar neden 0x02'yi tercih etmeli:** Biriktirme yoluyla daha iyi sermaye verimliliği, para çekme işlemlerinin ne zaman gerçekleşeceği üzerinde daha fazla kontrol ve doğrulayıcı birleştirmeyi destekler. Zamanla ödül biriktiren tek başına stake edenler için bu, etkin bakiyelerinin ve dolayısıyla ödüllerinin manuel müdahale olmadan 32 ETH'nin üzerine çıkabileceği anlamına gelir.

**Önemli:** `0x01`'den `0x02`'ye dönüştürdükten sonra geri alamazsınız.

Tip 2 kimlik bilgilerine dönüştürme ve MaxEB özelliği hakkında ayrıntılı bir kılavuz için [MaxEB açıklama sayfasına](/roadmap/pectra/maxeb/) bakın.

## Hangisini seçmeliyim? {#what-should-i-pick}

- **Yeni doğrulayıcılar:** `0x02`'yi seçin. Daha iyi biriktirme ve esneklik sunan modern standart budur.
- **Mevcut 0x01 doğrulayıcıları:** Ödüllerin 32 ETH'nin üzerinde birikmesini istiyorsanız veya doğrulayıcıları birleştirmeyi planlıyorsanız `0x02`'ye dönüştürmeyi düşünün.
- **Mevcut 0x00 doğrulayıcıları:** Hemen yükseltin; kimlik bilgilerinizi güncellemeden para çekemezsiniz. Önce `0x01`'e, ardından `0x02`'ye dönüştürmelisiniz.

## Çekim kimlik bilgilerini yönetme araçları {#withdrawal-credential-tools}

Çeşitli araçlar, kimlik bilgisi türleri arasında seçim yapmayı veya dönüştürmeyi destekler:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Kimlik bilgisi dönüştürmeleri ve birleştirmeleri de dâhil olmak üzere para yatırma ve doğrulayıcı yönetimi için resmî araç
- **[Pectra Staking Manager](https://pectrastaking.com)** - Dönüşümler ve birleştirme için wallet-connect destekli web kullanıcı arayüzü
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Toplu dönüşümler için komut satırı aracı
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Doğrulayıcı yönetimi de dâhil olmak üzere Ethereum işlemleri için CLI aracı

Birleştirme araçlarının tam listesi ve ayrıntılı dönüştürme talimatları için bkz. [MaxEB birleştirme araçları](/roadmap/pectra/maxeb/#consolidation-tooling).

## Daha fazla kaynak {#further-reading}

- [Hisse ispatı Ethereum'daki Anahtarlar](/developers/docs/consensus-mechanisms/pos/keys/) - Doğrulayıcı anahtarları ve bunların para çekme kimlik bilgileriyle nasıl ilişkili olduğu hakkında bilgi edinin
- [MaxEB](/roadmap/pectra/maxeb/) - Pectra yükseltmesi ve maksimum etkin bakiye özelliği hakkında ayrıntılı kılavuz
