---
title: Mutabakat mekanizmaları
description: Dağıtılmış sistemlerde bulunan mutabakat protokolleri ve bu protokollerin Ethereum'daki rolü hakkında açıklama.
lang: tr
---

Fikir birliği katmanı terimi çoğunlukla "hisse ispatı", "iş ispatı" veya "yetki ispatı" protokollerine atıfta bulunmak için kullanılır. Ancak bunlar sadece [Sybil saldırılarına](/glossary/#sybil-attack) karşı koruma sağlayan mutabakat mekanizmalarının bileşenleridir. Mutabakat mekanizmaları, dağıtılmış bir düğüm kümesinin blok zincirin durumu üzerinde anlaşmalarını sağlayan; eksiksiz fikir, protokoller ve teşvik etme sistemleridir.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce [Ethereum'a Giriş](/developers/docs/intro-to-ethereum/) metnimizi okumanızı öneririz.

## Mutabakat nedir? {#what-is-consensus}

Mutabakat ile, genel bir anlaşmanın sağlandığından bahsediyoruz. Sinemaya giden bir grubu düşünün. Eğer önerilen film konusunda herhangi bir anlaşmazlık yoksa, mutabakat sağlanır. Eğer herhangi bir anlaşmazlık varsa grubun hangi filmi izleyeceklerine karar verecek araçlara sahip olması gerekir. Olağanüstü durumlarda ise grup nihayetinde dağılır.

Blok zincir açısından ise bu süreç bir biçim kazanmıştır ve mutabakata varmak; ağdaki düğümlerin en az %66'sının ağın global durumu üzerinde anlaşmaya varmasıdır.

## Mutabakat mekanizması nedir? {#what-is-a-consensus-mechanism}

Mutabakat mekanizması terimi, ağdaki düğümlerin blok zincirin durumu hakkında anlaşmalarını sağlayan tüm protokolleri, teşvikleri ve fikirleri belirtir.

Ethereum, mutabakat mekanizması olarak hisse ispatını kullanır, bu sistem de paydaşları kilitledikleri kapitaller üzerinden ödüllendirerek ve cezalandırarak kriptoekonomik bir güvenlik sağlar. Bu teşvik yapısı bireysel paydaşları dürüst doğrulayıcıları çalıştırmaya teşvik eder, bu şekilde davranmayanları ise cezalandırarak ağa saldırmak için son derece yüksek bir maliyet yaratır.

Sonrasında, dürüst doğrulayıcıların yeni blok önermek veya doğrulamak, işlemleri işlemek ve zincir başı hakkındaki görüşlerini belirtmek için nasıl seçildiğini yöneten bir protokol vardır. Birden fazla blokun zincirin başına yakın aynı konumda olduğu nadir durumlarda, ağırlıklı bloklar için oy kullanan doğrulayıcıların hisselenen ether bakiyesine göre ölçülen "en ağır" zinciri oluşturan blokları seçen bir çatal seçim mekanizması vardır.

Ağa yönelik saldırılara karşı son bir savunma hattı olarak potansiyel bant dışı sosyal koordinasyon tarafından sunulan ek güvenlik gibi kodda açıkça tanımlanmayan bazı konseptler, mutabakat için önemlidir.

Bütün bu bileşenler birlikte mutabakat mekanizmasını oluşturur.

## Mutabakat mekanizması türleri {#types-of-consensus-mechanisms}

### İş ispatı tabanlı {#proof-of-work}

Bitcoin gibi Ethereum da bir zamanlar **iş ispatı (PoW)** tabanlı bir mutabakat protokolü kullanıyordu.

#### Blok oluşturma {#pow-block-creation}

Madenciler, işlenmiş işlemlerle dolu yeni bloklar oluşturabilmek için birbirleri ile rekabet eder. Kazanan, yeni bloku ağın geri kalanıyla paylaşır ve bir miktar yeni basılmış ETH elde eder. Bu yarışı matematiksel bulmacayı en hızlı çözen bilgisayar kazanır. Bu çözüm, bir önceki blok ile şimdiki blok arasında kriptografik bir bağlantı oluşturur. "İş ispatı" ile kastedilen iş de bu bulmacanın çözülmesidir. Kurallı zincir daha sonrasında blok kümelerini çıkarmak için yapılan iş miktarına göre çalışan bir çatal seçim kuralı ile belirlenir.

#### Güvenlik {#pow-security}

Ağ, zincir üzerinde dolandırıcılık yapılabilmesi için ağın bilgi işlem gücünün %51'inin ele geçirilmesi gerektiği gerçeği sayesinde güvende tutulur. Bu o kadar büyük enerji ve ekipman yatırımları gerektirir ki, büyük ihtimalle kazanacağınızdan daha fazlasını harcarsınız.

[İş ispatı](/developers/docs/consensus-mechanisms/pow/) hakkında daha fazlası

### Hisse ispatı tabanlı {#proof-of-stake}

Ethereum şu an **hisse ispatı (PoS)** tabanlı bir mutabakat protokolü kullanmaktadır.

#### Blok oluşturma {#pos-block-creation}

Doğrulayıcılar blokları oluşturur. Her bir yuvada bir doğrulayıcı rastgele bir biçimde bloku önermesi için seçilir. Fikir birliği istemcileri eşleştirilmiş yürütüm istemcilerinden "yürütme yükü" olarak bir işlem paketi ister. Ethereum ağındaki diğer düğümlere gönderdikleri bir blok oluşturmak için bunu mutabakat verilerine paketlerler. Bahsedilen blok üretim süreci ETH ile ödüllendirilir. Tek bir yuva için birden fazla olası blokun oluştuğu veya düğümlerin blokları farklı zamanda duyduğu nadir durumlarda, çatal seçim algoritması bloku en fazla onay ağırlığına hangisi sahipse o olarak seçer (burada ağırlık, ETH bakiyesine göre ölçeklendirdiği doğrulanan doğrulayıcıların tasdik sayısıdır).

#### Güvenlik {#pos-security}

Hisse ispatı sistemi kripto ekonomik olarak güvenlidir çünkü ağa saldıranın zinciri ele geçirebilmesi için çok ciddi miktarda ETH yakması gerekir. Sistem dürüst hareket eden paydaşları teşvikle ödüllendirirken kötü niyetli hareketleri cezalandırarak bundan uzaklaştırır.

[İş ispatı](/developers/docs/consensus-mechanisms/pos/) hakkında daha fazlası

### Görsel bir rehber {#types-of-consensus-video}

Ethereum üzerinde kullanılan farklı mutabakat mekanizması türleri hakkında daha fazlasını izleyin:

<YouTube id="ojxfbN78WFQ" />

### Sybil direnci ve zincir seçimi {#sybil-chain}

İş ispatı ve hisse ispatı tek başlarına bir mutabakat protokolü değildir, ancak çoğunlukla daha basit olduğu için bu şekilde adlandırılırlar. Aslında bunlar Sybil direnç mekanizmaları ve blok yazarı seçicileridir; son blokun yazarının kim olduğuna karar vermenin bir yoludurlar. Bir diğer önemli bileşen, aynı konumda birden fazla blokun bulunduğu senaryolarda düğümlerin zincirin başında tek bir doğru bloku seçmesini sağlayan zincir seçimi (çatal seçimi olarak da bilinir) algoritmasıdır.

**Sybil direnci**, bir protokolün Sybil saldırısına ne kadar dayanıklı olduğunu ölçer. Bu tip bir saldırıya karşı direnç, merkeziyetsiz bir blok zincir için önemlidir ve madencilerle doğrulayıcıların ortaya konulan kaynaklar neticesinde eşit şekilde ödüllendirilmesini sağlar. İş ispatı ve hisse ispatı kullanıcıların fazla enerji tüketmesini veya yüksek teminatlar ortaya koymasını sağlayarak buna karşı koruma sağlar. Bu korumalar Sybil saldırılarına karşı ekonomik bir caydırıcıdır.

Bir **zincir seçim kuralı** hangi zincirin "doğru" zincir olduğuna karar verilmesinde kullanılır. Bitcoin şu anda "en uzun zincir" kuralını kullanmaktadır, bu da hangi blok zinciri en uzun ise düğümlerin o zinciri geçerli kabul edeceği ve içinde çalışacağı anlamına gelir. İş ispatı zincirleri kapsamında en uzun zincir, zincirin toplam birikmiş iş ispatı zorluğuna göre belirlenir. Ethereum da bir zamanlar en uzun zincir kuralını kullanıyordu, ancak Ethereum artık hisse ispatı kullandığı için zincirin "ağırlık" ölçümünü yapan yeni bir çatal seçim algoritması kullanıyor. Ağırlık, doğrulayıcıların hisselenmiş Ether bakiyeleri ile birikmiş oylarının toplamıdır.

Ethereum, [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) olarak bilinen ve [Casper FFG hisse ispatını](https://arxiv.org/abs/1710.09437) [GHOST çatal seçimi kuralıyla](https://arxiv.org/abs/2003.03052) birleştiren bir mutabakat mekanizması kullanıyor.

## Daha fazla bilgi {#further-reading}

- [Blok Zinciri Mutabakat Algoritması nedir?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Nakamoto Mutabakatı nedir? Tam Başlangıç Rehberi](https://blockonomi.com/nakamoto-consensus/)
- [Casper nasıl çalışır?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [İş İspatı Blok Zincirlerinin Güvenliği ve Performansı Hakkında](https://eprint.iacr.org/2016/555.pdf)
- [Bizans hatası](https://en.wikipedia.org/wiki/Byzantine_fault)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/)
- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)
