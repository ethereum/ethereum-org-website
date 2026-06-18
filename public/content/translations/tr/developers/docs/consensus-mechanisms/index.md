---
title: Mutabakat mekanizmaları
description: Dağıtık sistemlerdeki mutabakat protokollerinin ve Ethereum'da oynadıkları rolün bir açıklaması.
lang: tr
authors: ["Patrick Collins"]
---

'Mutabakat mekanizması' terimi genellikle günlük dilde 'Hisse Kanıtı (PoS)', 'İş Kanıtı (PoW)' veya 'yetki kanıtı' protokollerine atıfta bulunmak için kullanılır. Ancak bunlar, mutabakat mekanizmalarında [Sybil saldırılarına](/glossary/#sybil-attack) karşı koruma sağlayan bileşenlerden ibarettir. Mutabakat mekanizmaları, dağıtık bir düğüm kümesinin bir Blokzincir'in durumu üzerinde anlaşmasını sağlayan fikirlerin, protokollerin ve teşviklerin tam yığınıdır.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) bölümümüzü okumanızı öneririz.

## Mutabakat nedir? {#what-is-consensus}

Mutabakat ile genel bir anlaşmaya varıldığını kastediyoruz. Sinemaya giden bir grup insanı düşünün. Önerilen bir film seçimi konusunda herhangi bir anlaşmazlık yoksa, mutabakat sağlanmış olur. Eğer bir anlaşmazlık varsa, grubun hangi filmi izleyeceğine karar verecek araçlara sahip olması gerekir. Aşırı durumlarda, grup eninde sonunda bölünecektir.

[Ethereum](/) Blokzincir'i söz konusu olduğunda süreç resmileştirilmiştir ve mutabakata varmak, ağdaki düğümlerin en az %66'sının ağın küresel durumu üzerinde hemfikir olması anlamına gelir.

## Mutabakat mekanizması nedir? {#what-is-a-consensus-mechanism}

Mutabakat mekanizması terimi, bir düğüm ağının bir Blokzincir'in durumu üzerinde anlaşmasına olanak tanıyan protokollerin, teşviklerin ve fikirlerin tüm yığınını ifade eder.

Ethereum, kripto-ekonomik güvenliğini staker'lar tarafından kilitlenen sermayeye uygulanan bir dizi ödül ve cezadan alan Hisse Kanıtı (PoS) tabanlı bir mutabakat mekanizması kullanır. Bu teşvik yapısı, bireysel staker'ları dürüst Doğrulayıcılar çalıştırmaya teşvik eder, çalıştırmayanları cezalandırır ve ağa saldırmak için son derece yüksek bir maliyet yaratır.

Ayrıca, dürüst Doğrulayıcıların Blok önermek veya doğrulamak, işlemleri işlemek ve zincirin başı hakkındaki görüşleri için Oy vermek üzere nasıl seçileceğini yöneten bir Protokol vardır. Birden fazla bloğun zincirin başına yakın aynı konumda bulunduğu nadir durumlarda, stake edilmiş Ether bakiyeleriyle ağırlıklandırılmış olarak bloklara Oy veren Doğrulayıcı sayısıyla ölçülen 'en ağır' zinciri oluşturan blokları seçen bir çatallanma seçimi mekanizması bulunur.

Ağa yönelik saldırılara karşı son savunma hattı olarak potansiyel bant dışı sosyal koordinasyonun sunduğu ek güvenlik gibi, kodda açıkça tanımlanmayan bazı kavramlar mutabakat için önemlidir.

Bu bileşenler birlikte mutabakat mekanizmasını oluşturur.

## Mutabakat mekanizması türleri {#types-of-consensus-mechanisms}

### İş Kanıtı tabanlı {#proof-of-work}

Bitcoin gibi, Ethereum da bir zamanlar **İş Kanıtı (PoW)** tabanlı bir mutabakat protokolü kullanıyordu.

#### Blok oluşturma {#pow-block-creation}

Madenciler, işlenmiş işlemlerle dolu yeni bloklar oluşturmak için rekabet eder. Kazanan, yeni bloğu ağın geri kalanıyla paylaşır ve yeni basılmış bir miktar ETH kazanır. Yarışı, bir matematik bulmacasını en hızlı çözebilen bilgisayar kazanır. Bu, mevcut Blok ile bir önceki Blok arasındaki kriptografik bağlantıyı üretir. Bu bulmacayı çözmek, "İş Kanıtı"ndaki iştir. Kanonik zincir daha sonra, madencilikleri için en çok işin yapıldığı Blok kümesini seçen bir çatallanma seçimi kuralı ile belirlenir.

#### Güvenlik {#pow-security}

Ağ, zinciri dolandırmak için ağın bilgi işlem gücünün %51'ine ihtiyaç duyacağınız gerçeğiyle güvende tutulur. Bu, ekipman ve enerjiye o kadar büyük yatırımlar gerektirir ki; muhtemelen kazanacağınızdan daha fazlasını harcarsınız.

[İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) hakkında daha fazlası

### Hisse Kanıtı tabanlı {#proof-of-stake}

Ethereum artık **Hisse Kanıtı (PoS)** tabanlı bir mutabakat protokolü kullanıyor.

#### Blok oluşturma {#pos-block-creation}

Doğrulayıcılar bloklar oluşturur. Her slot içinde blok teklifçisi olmak üzere rastgele bir Doğrulayıcı seçilir. Fikir birliği istemcisi, eşleştirilmiş yürütme istemcisinden bir 'yürütme yükü' olarak bir işlem paketi talep eder. Bunu bir Blok oluşturmak için mutabakat verileriyle sararlar ve Ethereum ağındaki diğer düğümlere gönderirler. Bu Blok üretimi ETH ile ödüllendirilir. Tek bir slot için birden fazla olası bloğun bulunduğu veya düğümlerin blokları farklı zamanlarda duyduğu nadir durumlarda, çatallanma seçimi algoritması en büyük onaylama ağırlığına sahip zinciri oluşturan bloğu seçer (burada ağırlık, ETH bakiyelerine göre ölçeklendirilmiş onay veren Doğrulayıcı sayısıdır).

#### Güvenlik {#pos-security}

Bir Hisse Kanıtı (PoS) sistemi kripto-ekonomik olarak güvenlidir çünkü zincirin kontrolünü ele geçirmeye çalışan bir saldırganın devasa miktarda ETH'yi yok etmesi gerekir. Bir ödül sistemi, bireysel staker'ları dürüst davranmaya teşvik eder ve cezalar, staker'ları kötü niyetli davranmaktan caydırır.

[Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) hakkında daha fazlası

### Görsel bir rehber {#types-of-consensus-video}

Ethereum'da kullanılan farklı mutabakat mekanizması türleri hakkında daha fazlasını izleyin:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Sybil direnci ve zincir seçimi {#sybil-chain}

İş Kanıtı (PoW) ve Hisse Kanıtı (PoS) tek başlarına mutabakat protokolleri değildir, ancak basitlik adına genellikle bu şekilde adlandırılırlar. Aslında bunlar Sybil direnci mekanizmaları ve Blok yazarı seçicileridir; en son bloğun yazarının kim olduğuna karar vermenin bir yoludur. Bir diğer önemli bileşen, aynı konumda birden fazla bloğun bulunduğu senaryolarda düğümlerin zincirin başındaki tek bir doğru bloğu seçmesini sağlayan zincir seçimi (diğer adıyla çatallanma seçimi) algoritmasıdır.

**Sybil direnci**, bir protokolün bir Sybil saldırısına karşı nasıl performans gösterdiğini ölçer. Bu tür bir saldırıya karşı direnç, merkeziyetsiz bir Blokzincir için esastır ve madencilerin ve Doğrulayıcıların yatırılan kaynaklara göre eşit olarak ödüllendirilmesini sağlar. İş Kanıtı (PoW) ve Hisse Kanıtı (PoS), kullanıcıların çok fazla enerji harcamasını veya çok fazla teminat koymasını sağlayarak buna karşı koruma sağlar. Bu korumalar, Sybil saldırılarına karşı ekonomik bir caydırıcıdır.

Hangi zincirin "doğru" zincir olduğuna karar vermek için bir **zincir seçimi kuralı** kullanılır. Bitcoin "en uzun zincir" kuralını kullanır, bu da hangi Blokzincir en uzunsa, düğümlerin geri kalanının geçerli kabul edip birlikte çalışacağı zincir olacağı anlamına gelir. İş Kanıtı (PoW) zincirleri için en uzun zincir, zincirin toplam kümülatif İş Kanıtı (PoW) zorluğu ile belirlenir. Ethereum da eskiden en uzun zincir kuralını kullanıyordu; ancak artık Ethereum Hisse Kanıtı (PoS) üzerinde çalıştığı için zincirin 'ağırlığını' ölçen güncellenmiş bir çatallanma seçimi algoritması benimsedi. Ağırlık, Doğrulayıcıların stake edilmiş Ether bakiyeleriyle ağırlıklandırılmış Doğrulayıcı oylarının birikmiş toplamıdır.

Ethereum, [Casper FFG Hisse Kanıtı (PoS)](https://arxiv.org/abs/1710.09437) ile [GHOST çatallanma seçimi kuralını](https://arxiv.org/abs/2003.03052) birleştiren [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) olarak bilinen bir mutabakat mekanizması kullanır.

## Daha fazla bilgi {#further-reading}

- [Blokzincir Mutabakat Algoritması Nedir?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Nakamoto Mutabakatı Nedir? Yeni Başlayanlar İçin Tam Kılavuz](https://blockonomi.com/nakamoto-consensus/)
- [Casper Nasıl Çalışır?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [İş Kanıtı Blokzincirlerinin Güvenliği ve Performansı Üzerine](https://eprint.iacr.org/2016/555.pdf)
- [Bizans hatası](https://en.wikipedia.org/wiki/Byzantine_fault)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)