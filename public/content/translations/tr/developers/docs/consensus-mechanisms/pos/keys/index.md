---
title: Ethereum hisse ispatındaki anahtarlar
description: Ethereum'un hisse ispatı mutabakat mekanizmasında kullanılan anahtarların açıklaması
lang: tr
---

Ethereum, kullanıcı varlıklarını açık-özel anahtar kriptografisi kullanarak güvence altına alır. Açık anahtar, bir Ethereum adresinin temelini oluşturmak için kullanılır; yani genel olarak herkese açıktır ve eşsiz bir tanımlayıcı olarak kullanılır. Özel (veya "gizli") anahtara yalnızca hesap sahibi tarafından erişilebilmelidir. Özel anahtar, işlemleri ve verileri "imzalamak" için kullanılır, böylece kriptografi, özel anahtar sahibinin belirli bir bir eylemi onayladığını kanıtlayabilir.

Ethereum'un anahtarları, [eliptik eğri kriptografisi](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) kullanılarak oluşturulur.

Ancak, Ethereum [iş ispatından](/developers/docs/consensus-mechanisms/pow) [hisse ispatına](/developers/docs/consensus-mechanisms/pos) geçtiğinde Ethereum'a yeni bir anahtar türü eklendi. Orijinal anahtarlar hâlâ tamamen önceki gibi çalışıyor, hesapları güvence altına alan eliptik eğri tabanlı anahtarlar üzerinde herhangi bir değişiklik yapılmadı. Ancak kullanıcıların, ETH hisseleyerek ve doğrulayıcıları çalıştırarak hisse ispatına katılmak için yeni bir anahtar türüne ihtiyacı vardı. Bu ihtiyaç, çok sayıda doğrulayıcı arasında geçen birçok mesaj dolayısıyla ortaya çıkan ölçeklenebilirlik zorluklarından kaynaklandı. Ağın mutabakata varması için gereken mesaj miktarını azaltmak için kolayca toplanabilecek bir kriptografik yöntem gerekiyordu.

Bu yeni anahtar türü, [**Boneh-Lynn-Shacham (BLS)** imza şemasını](https://wikipedia.org/wiki/BLS_digital_signature) kullanır. BLS, imzaların çok verimli bir şekilde toplanmasına imkân tanırken, aynı zamanda topplanmış bireysel doğrulayıcı anahtarlarının tersine mühendislik ile çözülmesine izin verir ve doğrulayıcılar arasındaki işlemleri yönetmek için idealdir.

## İki tür doğrulayıcı anahtarı {#two-types-of-keys}

Hisse ispatına geçiş yapmadan önce, Ethereum kullanıcılarının fonlarına erişmek için sadece tek bir eliptik eğri tabanlı özel anahtarı vardı. Hisse ispatının kullanıma sunulmasıyla birlikte, tek başına stake eden olmak isteyen kullanıcıların bir **doğrulayıcı anahtarına** ve bir **çekim anahtarına** da sahip olmaları gerekti.

### Doğrulayıcı anahtarı {#validator-key}

Doğrulayıcı imza anahtarı iki öğeden oluşur:

- Doğrulayıcı **özel** anahtarı
- Doğrulayıcı **açık** anahtarı

Doğrulayıcı özel anahtarının amacı, blok teklifleri ve onayları gibi zincir üstü işlemleri imzalamaktır. Bu yüzden, bu anahtarlar sıcak cüzdanda tutulmalıdır.

Bu esneklik, doğrulayıcı imza anahtarlarını bir cihazdan diğerine çok hızlı bir şekilde taşıma avantajına sahiptir; ancak, kaybolur veya çalınırsa, bir hırsız birkaç şekilde **kötü amaçlı eylemlerde bulunabilir**:

- Doğrulayıcıyı cezalandırmak için:
  - Önerici olmak ve aynı yuva için iki farklı işaret bloku imzalamak
  - Doğrulayıcı olmak ve bir başkasını "çevreleyen" tasdiki imzalamak
  - Doğrulayıcı olmak ve hedefleri aynı olan iki farklı tasdiki imzalamak
- Gönüllü bir çıkışı zorlamak, doğrulayıcının kilitlemesini durdurur ve para çekme anahtarının sahibine doğrulayıcının ETH bakiyesine erişim verir

Bir kullanıcı, stake etme para yatırma sözleşmesine ETH yatırdığında **doğrulayıcı açık anahtarı** işlem verilerine dahil edilir. Bu, _para yatırma verileri_ olarak bilinir ve Ethereum'un doğrulayıcıyı tanımlamasını sağlar.

### Çekim kimlik bilgileri {#withdrawal-credentials}

Her doğrulayıcının _para çekme kimlik bilgileri_ olarak bilinen bir özelliği vardır. Bu 32 baytlık alanın ilk baytı hesap türünü tanımlar: `0x00`, orijinal BLS (Shapella öncesi, çekilemez) kimlik bilgilerini; `0x01`, bir yürütme adresini gösteren eski kimlik bilgilerini; ve `0x02`, modern birleşik kimlik bilgisi türünü temsil eder.

`0x00` BLS anahtarlarına sahip doğrulayıcılar, fazla bakiye ödemelerini veya stake edilen varlıkların tam çekimini etkinleştirmek için bu kimlik bilgilerini bir yürütme adresini gösterecek şekilde güncellemelidir. Bu, ilk anahtar oluşturma sırasında para yatırma verilerinde bir yürütme adresi sağlayarak _VEYA_ daha sonra para çekme anahtarını kullanarak bir `BLSToExecutionChange` mesajını imzalayıp yayınlayarak yapılabilir.

[Doğrulayıcı para çekme kimlik bilgileri hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Para çekme anahtarı {#withdrawal-key}

Eğer başlangıç yatırımı sırasında ayarlanmamışsa, para çekme anahtarının yürütme adresini işaret eden para çekme kimlik bilgileriyle güncellenmesi gerekir. Bu fazla bakiye ödemeleri süreci başlamasına iimkân sunar, ayrıca kullanıcıların hisselenmiş ETH'lerini çekmelerini sağlar.

Doğrulayıcı anahtarları gibi, para çekme anahtarları da iki kısımdan oluşur:

- Para çekme **özel** anahtarı
- Para çekme **açık** anahtarı

Para çekme kimlik bilgilerini `0x01` türüne güncellemeden önce bu anahtarı kaybetmek, doğrulayıcı bakiyesine erişimi kaybetmek anlamına gelir. Doğrulayıcı hâlâ doğrulayıcının özel anahtarının gerektiği tasdik ve blok imzalama gibi eylemleri gerçekleştirebilir ancak para çekme anahtarları kaybedildiyse sıfıra yakın bir teşvik bulunmaktadır.

Doğrulayıcı anahtarlarınızı Ethereum hesabınızdan ayırmak birçok doğrulayıcının tek bir kullanıcı tarafından yürütülmesi imkânı sunar.

![doğrulayıcı anahtar şeması](validator-key-schematic.png)

**Not**: Stake etme görevlerinden çıkmak ve bir doğrulayıcının bakiyesini çekmek, şu anda doğrulayıcı anahtarıyla bir [gönüllü çıkış mesajı (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) imzalamayı gerektirir. Ancak [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002), gelecekte bir kullanıcının para çekme anahtarıyla çıkış mesajlarını imzalayarak bir doğrulayıcının çıkışını tetiklemesine ve bakiyesini çekmesine olanak tanıyacak bir tekliftir. Bu, ETH'yi [hizmet olarak stake etme sağlayıcılarına](/staking/saas/#what-is-staking-as-a-service) devreden stake edenlerin fonlarının kontrolünü ellerinde tutmalarını sağlayarak güven varsayımlarını azaltacaktır.

## Güvenlik kelimelerinden anahtar türetme {#deriving-keys-from-seed}

Eğer hisselenen tüm 32 ETH, tamamen yeni 2 set bağımsız anahtarları gerektirseydi, anahtar yönetimi özellikle birden fazla doğrulayıcı çalıştıran kullanıcılar için çok çabuk kullanılması zor bir hale gelirdi. Bunun yerine, birçok doğrulayıcı anahtarı tek bir genel paroladan türetilir ve bu tek parola birçok doğrulayıcı anahtarına erişime izin verir.

[Anımsatıcılar](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) ve yollar, kullanıcıların [cüzdanlarına erişirken](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) sıkça karşılaştıkları önemli özelliklerdir. Anımsatıcı bir özel anahtar için başlangıç tohumu olarak işlev gören bir kelime dizisidir. Ek veriyle birleştirildiğinde anımsatıcı, "ana anahtar" olarak bilinen bir karma üretir. Bu bir ağacın kökü gibi düşünülebilir. Bu kökten gelen dallar hiyerarşik bir yol kullanılarak türetilebilir yani bu alt düğümler kendi üst düğümlerinin karmalarının birleşmesinden ve ağaçtaki dizinlerinden var olabilir. Anımsatıcı tabanlı anahtar üretimi için [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) ve [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) standartları hakkında bilgi edinin.

Bu yollar ilerleyen yapıda, donanım cüzdanlarıyla etkileşime geçmiş kullanıcılara tanıdık gelebilir:

```
m/44'/60'/0'/0`
```

Aşağıda belirtildiği gibi bu yoldaki iptaller özel anahtarın ayrı kısımlarıdır:

```
ana_anahtar / amaç / coin_türü / hesap / değişim / adres_dizini
```

Bu mantık, ağaç kökü ortak olabildiği ve farklılaşma dallarda gerçekleşebildiği için kullanıcıların mümkün olduğu kadar çok doğrulayıcıyı tek bir **anımsatıcı ifadeye** bağlamasını sağlar. Kullanıcı, anımsatıcı ifadeden **istediği sayıda anahtar türetebilir**.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Her dal bir `/` ile ayrılır, dolayısıyla `m/2` ana anahtarla başlayıp 2. dalı takip etmek anlamına gelir. Bu şemanın altındaki tek anımsatıcı ifade her biri iki doğrulayıcıyla ilişkilendirilmiş üç para çekme anahtarını saklardı.

![doğrulayıcı anahtar mantığı](multiple-keys.png)

## Daha fazla kaynak {#further-reading}

- [Carl Beekhuizen'den Ethereum Foundation blog gönderisi](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 anahtar üretimi](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Yürütme Katmanı Tarafından Tetiklenen Çıkışlar](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Büyük ölçekte anahtar yönetimi](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
