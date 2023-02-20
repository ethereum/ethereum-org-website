---
title: Konsensus mekanizmaları
description: Dağıtılmış sistemlerde bulunan mutabakat protokolleri ve bu protokollerin Ethereum'daki rolü hakkında açıklama.
lang: tr
incomplete: true
---

Ethereum gibi, özünde dağıtılmış sistemler olan blok zincirlerinde ağ düğümlerinin sistemin mevcut durumunda anlaşmaya varabiliyor olmaları gerekir. Bu anlaşma mutabakat mekanizmaları ile sağlanır.

Mutabakat mekanizmaları doğrudan bir dapp inşa etmeyle bağlantılı olmasa da, onları anlamak gaz ücretleri ve işlem zamanları gibi siz ve kullanıcı deneyiminizle ilgili konseptleri aydınlatacaktır.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce [Ethereum'a Giriş](/developers/docs/intro-to-ethereum/) metnimizi okumanızı öneririz.

## Mutabakat nedir? {#what-is-consensus}

Mutabakat diyerek, genel bir anlaşmanın sağlandığından bahsediyoruz. Sinemaya giden bir grubu düşünün. Eğer önerilen film konusunda bir anlaşmazlık yoksa; mutabakat sağlanır. Aşırıya kaçan bir durumda ise grup nihayetinde dağılır.

Blok zinciri açısından ise bu süreç bir biçim kazanmıştır ve mutabakata varmak; ağdaki düğümlerin en az %51'inin ağın sonraki global durumunu üzerinde anlaşmaya varmasıdır.

## Mutabakat mekanizması nedir? {#what-is-a-consensus-mechanism}

Mutabakat mekanizmaları (mutabakat protokolleri veya mutabakat algoritmaları olarak da bilinir), dağıtılmış sistemlerin (bilgisayar ağlarının) birlikte çalışmalarını ve güvende kalmalarını sağlar.

Bu mekanizmalar uzun yıllardır veri tabanı düğümleri, uygulama sunucuları ve diğer kurumsal altyapılar arasında mutabakat sağlamak için kullanılmaktadır. Son yıllarda, Ethereum gibi kriptoekonomik sistemlerin ağın durumu üzerinde anlaşmaya varması için yeni mutabakat mekanizmaları icat edilmiştir.

Bir kriptoekonomik sistemdeki mutabakat mekanizması, belirli ekonomik saldırı türlerinin önlenmesine de yardımcı olur. Teorik olarak bir saldırgan, ağın %51'ini kontrol ederek mutabakatı tehlikeye atabilir. İşte mutabakat mekanizmaları da bu "%51 saldırısı"nı imkânsız kılmak için tasarlandı. Bu güvenlik problemini farklı şekillerde çözmek için farklı mekanizmalar geliştirildi.

<YouTube id="dylgwcPH4EA" />

## Mutabakat mekanizması türleri {#types-of-consensus-mechanisms}

### İş ispatı {#proof-of-work}

Ethereum, Bitcoin gibi şu anda bir **iş ispatı (PoW)** mutabakat protokolünü kullanıyor.

#### Blok oluşturma {#pow-block-creation}

İş ispatı, işlenmiş işlemlerle dolu yeni bloklar oluşturmak için yarışan [madenciler](/developers/docs/consensus-mechanisms/pow/mining/) tarafından gerçekleştirilir. Kazanan, yeni bloğu ağın geri kalanıyla paylaşır ve bir miktar yeni üretilmiş ETH elde eder. Yarış, bilgisayarı bir matematik bulmacasını en hızlı çözen kişi tarafından kazanılır: Bu, mevcut blok ve önceki blok arasındaki kriptografik bağlantıyı oluşturur. "İş ispatı" ile kastedilen iş de bu bulmacanın çözülmesidir.

#### Güvenlik {#pow-security}

Ağ, zincir üzerinde dolandırıcılık yapılabilmesi için ağın bilgi işlem gücünün %51'inin ele geçirilmesi gerektiği gerçeği sayesinde güvende tutulur. Bu o kadar büyük enerji ve ekipman yatırımları gerektirir ki, büyük ihtimalle kazanacağınızdan daha fazlasını harcarsınız.

[İş ispatı](/developers/docs/consensus-mechanisms/pow/) hakkında daha fazla bilgi

### Hisse ispatı {#proof-of-stake}

Ethereum, bir **hisse ispatı (PoS)** mutabakat protokolüne geçmeyi planlamaktadır.

#### Blok oluşturma {#pos-block-creation}

Hisse ispatı, sisteme katılmak için ETH stake eden doğrulayıcılar tarafından gerçekleştirilir. Yeni bloklar oluşturması, bu blokları ağ ile paylaşması ve bu işlem sonucunda ödül kazanması için rastgele bir doğrulayıcı seçilir. Bunun için yoğun bilgi işlem işleri yapmak yerine sadece ağa ETH stake etmiş olmak yeterlidir. Böylece, sağlıklı bir ağ davranışı teşvik edilmiş olur.

#### Güvenlik {#pos-security}

Bir hisse ispatı sistemi, zincir üzerinde dolandırıcılık yapılabilmesi için stake edilen toplam ETH'nin %51'inin ele geçirilmesi gerektiği gerçeği sayesinde güvende tutulur. Kötü niyetli davranışlarda bulunan kişiler tespit edildiğinde cezalandırılıp sistemden çıkarılırlar.

[İş ispatı](/developers/docs/consensus-mechanisms/pos/) hakkında daha fazla bilgi

### Görsel bir rehber {#types-of-consensus-video}

Ethereum üzerinde kullanılan farklı mutabakat mekanizması türleri hakkında daha fazlasını izleyin:

<YouTube id="ojxfbN78WFQ" />

### Sybil direnci ve zincir seçimi {#sybil-chain}

Teknik olarak, iş ispatı ve hisse ispatı kendiliğinden mutabakat protokolleri değillerdir, ancak kolaylık için bu şekilde adlandırılırlar. Aslında onlar Sybil direnç mekanizmaları ve blok yazarı seçicileridir; son bloğun yazarının kim olduğuna karar vermenin bir yoludurlar. Gerçek bir mutabakat mekanizmasını oluşturan şey, Sybil direnç mekanizması ve bir zincir seçim kuralının birleşimidir.

**Sybil direnci**, bir protokolün bir [Sybil saldırısına](https://wikipedia.org/wiki/Sybil_attack) ne kadar dayanıklı olduğunu ölçer. Sybil saldırıları, bir kullanıcı veya grubun birçok kullanıcı gibi davranmasıdır. Bu tip bir saldırıya karşı direnç, merkeziyetsiz bir blok zinciri için önemlidir ve madencilerle doğrulayıcıların ortaya konulan kaynaklar neticesinde eşit şekilde ödüllendirilmesini sağlar. İş ispatı ve hisse ispatı kullanıcıların fazla enerji tüketmesini veya yüksek teminatlar ortaya koymasını sağlayarak buna karşı koruma sağlar. Bu korumalar Sybil saldırılarına karşı ekonomik bir caydırıcıdır.

Bir **zincir seçim kuralı** hangi zincirin "doğru" zincir olduğuna karar verilmesinde kullanılır. Ethereum ve Bitcoin şu anda "en uzun zincir" kuralını kullanmaktadır, bu da hangi blok zinciri en uzun ise düğümlerin o zinciri geçerli kabul edeceği ve içinde çalışacağı anlamına gelir. İş ispatı zincirleri kapsamında en uzun zincir, zincirin toplam birikmiş iş ispatı zorluğuna göre belirlenir.

İş ispatı ve en uzun zincir kuralının kombinasyonu "Nakamoto Mutabakatı" olarak bilinir.

[İşaret zinciri](/upgrades/beacon-chain/), hisse ispatı tabanlı [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437) adlı bir mutabakat mekanizması kullanır.

## Daha fazla bilgi {#further-reading}

- [Blok Zinciri Mutabakat Algoritması nedir?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Nakamoto Mutabakatı nedir? Tam Başlangıç Rehberi](https://blockonomi.com/nakamoto-consensus/)
- [Casper nasıl çalışır?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [İş İspatı Blok Zincirlerinin Güvenliği ve Performansı Hakkında](https://eprint.iacr.org/2016/555.pdf)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/)
