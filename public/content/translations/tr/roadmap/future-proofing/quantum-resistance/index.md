---
title: "Ethereum'da kuantum sonrası kriptografi"
description: "Ethereum'un kuantum sonrası çağa nasıl hazırlandığı, nelerin savunmasız olduğu ve onu korumak için nelerin inşa edildiği."
lang: tr
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Kuantum bilgisayarlar eninde sonunda Ethereum'un bugün kullandığı kriptografiyi tehdit edecektir
  - Ethereum Vakfı'nın özel bir kuantum sonrası araştırma ekibi ve tam kuantum sonrası koruma için 2029'u hedefleyen yapılandırılmış bir "Yalın Ethereum" (Lean Ethereum) yol haritası vardır
  - Fonlarınız bugün güvendedir ve cüzdan yazılımları gelecekteki geçiş sürecinde size rehberlik edecektir
---

Kuantum bilgisayarlar eninde sonunda Ethereum'u ve günümüzdeki diğer çoğu dijital sistemi güvence altına alan kriptografik yöntemleri kırabilecektir. Bu sayfa bunun ne anlama geldiğini, ağın bu riski azaltmak için proaktif olarak nasıl iyileştirmeler geliştirdiğini ve neleri bilmeniz gerektiğini açıklamaktadır.

## Kuantum sonrası kriptografi neden önemlidir {#why-post-quantum-matters}

Ethereum, ağı güvende tutmak ve kullanıcı fonlarını korumak için çeşitli [kriptografi](/glossary/#cryptography) biçimlerine güvenir. En önemlileri şunlardır:

- **Eliptik eğri dijital imza algoritması (ECDSA)**: İşlemleri imzalamak için kullanılan kriptografi. Ethereum hesabınızın güvenliği buna bağlıdır.
- **BLS imzaları**: [Doğrulayıcılar](/glossary/#validator) tarafından ağın durumu üzerinde [mutabakat](/glossary/#consensus) sağlamak için kullanılır.
- **KZG polinom taahhütleri**: Ethereum'un ölçeklendirme yol haritasında [veri kullanılabilirliği](/glossary/#data-availability) için kullanılır.
- **Sıfır bilgi ispatı (ZK-proof) sistemleri**: Toplamalar ve diğer uygulamalar tarafından hesaplamaları zincir dışı doğrulamak için kullanılır.

Bunların tümü, klasik bilgisayarlar için zor olan ancak bir kuantum bilgisayar tarafından [Shor algoritması](https://en.wikipedia.org/wiki/Shor%27s_algorithm) kullanılarak verimli bir şekilde çözülebilen, Abelian grupları gibi matematiksel yapılara dayanır.

### Kuantum bilgisayarlar Ethereum'u ne zaman tehdit edecek? {#when-will-quantum-computers-threaten-ethereum}

Mart 2026'da Google Quantum AI, 256 bitlik eliptik eğri kriptografisini (Ethereum'un hesap imzaları için kullandığı tür) kırmanın kabaca 1.200 mantıksal kübit gerektirebileceğini tahmin eden bir araştırma yayınladı. Önceki tahminler bu sayıyı çok daha yüksek gösteriyordu. Google, kendi sistemlerini kuantum sonrası kriptografiye geçirmek için 2029'u dahili bir son tarih olarak belirledi.

Mevcut kuantum donanımı, birkaç bin gürültülü fiziksel kübitle çalışarak bu ölçekten çok uzaktır. Mantıksal kübitlerin (hataları düzelten ve güvenilir hesaplama yapan) her biri birçok fiziksel kübit gerektirir. **Mevcut donanım ile Ethereum'un kriptografisini kırmak için gerekenler arasındaki uçurum hala büyüktür, ancak birçok kişinin beklediğinden daha hızlı daralmaktadır.** Özellikle, ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST), ECDSA'yı 2030 yılına kadar kullanımdan kaldırmayı ve 2035 yılına kadar yasaklamayı öngörmektedir.

Bu yakın bir tehdit değildir. Ancak kriptografik geçişler yıllar alır ve Ethereum'un güvenlik modeli yüzyıllar sürecek şekilde tasarlanmıştır. Ethereum'un buna yanıtı, Ethereum'u her türlü kriptografik tehditten sağ çıkacak ilkeller etrafında yeniden inşa etmeye yönelik kasıtlı, çok yıllı bir misyon olan **Yalın Ethereum** (Lean Ethereum) yol haritasıdır.

## Kuantum saldırısına karşı savunmasız dört alan {#four-vulnerable-areas}

Şubat 2026'da Vitalik Buterin, Ethereum'un kriptografisinde kuantum sonrası yükseltmelere ihtiyaç duyan dört farklı alanı tanımlayan [bir yol haritası yayınladı](https://x.com/VitalikButerin/status/2027075026378543132). Her birinin farklı zorlukları ve farklı çözüm yolları vardır.

### 1. Mutabakat katmanı BLS imzaları {#consensus-bls}

**Ne işe yarar**: Ethereum'un [Hisse Kanıtı (PoS)](/glossary/#pos) protokolü, yüz binlerce doğrulayıcıdan gelen oyları bir araya getirmek için BLS imzalarını kullanır. BLS, birçok imzanın tek bir imzada birleştirilmesine olanak tanıyarak ağı verimli tutar.

**Neden savunmasızdır**: BLS imzaları, bir kuantum bilgisayarın kırabileceği eliptik eğri eşleşmelerine dayanır.

**Yaklaşım**: Yalın Mutabakat (Lean Consensus) yol haritası, birbirini tamamlayan iki araç geliştirmeyi içerir:
- **leanXMSS**: Ethereum, BLS imzalarını doğrulayıcılar için hash tabanlı bir imza şeması olan leanXMSS ile değiştirecektir. Hash tabanlı imzalar, yalnızca kuantum bilgisayarların zayıflattığı ancak kıramadığı hash işlevlerinin güvenliğine dayandıkları için kuantum güvenli olarak kabul edilir.
- **leanVM**: SNARK tabanlı imza toplama için minimal bir zkVM (sıfır bilgi sanal makinesi). Hash tabanlı imzalar önemli ölçüde daha büyük olduğundan (BLS için 96 bayta kıyasla kabaca 3.000 bayt), leanXMSS'e geçmek slot başına önemli ölçüde daha fazla veri üretecektir. Bunu çözmek için leanVM, verileri 250 kat sıkıştıran bir toplama motoru görevi görür. Bu, kuantum güvenli şemalara geçtikten sonra bile birçok imzayı tek bir imzada birleştirmenin verimlilik faydalarını korur.

<ExpandableCard title="Ethereum neden BLS'yi kuantum güvenli bir şemayla değiştiremiyor?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

BLS'yi verimli kılan toplama özelliğinin (yüz binlerce imzayı tek bir imzada birleştirmek) bariz bir kuantum güvenli eşdeğeri yoktur. Kuantum sonrası imzalar da BLS imzalarından çok daha büyüktür. Sadece birini diğeriyle değiştirmek, Ethereum'un mutabakat katmanını önemli ölçüde daha yavaş ve daha pahalı hale getirecektir. Bu nedenle ekip, kuantum güvenli imzaları verimli bir şekilde bir araya getirmek için sıfır bilgi ispatlarını kullanan bir araç olan leanVM'yi inşa etmektedir.

</ExpandableCard>

### 2. Veri kullanılabilirliği: KZG taahhütleri {#data-availability-kzg}

**Ne işe yarar**: KZG polinom taahhütleri, verilerin (özellikle toplamalardan gelen [blob](/glossary/#blob) verilerinin) her düğümün tamamını indirmesini gerektirmeden ağda kullanılabilir olmasını sağlar.

**Neden savunmasızdır**: KZG taahhütleri, kuantum bilgisayarların saldırabileceği aynı matematiksel yapı olan eliptik eğri eşleşmelerine dayanır.

**Mevcut azaltma**: KZG taahhütleri, birçok katılımcının rastgelelik katkısında bulunduğu bir "güvenilir kurulum" kullanır. En az bir katılımcı dürüst olduğu ve sırrını attığı sürece, kurulum, sonradan tersine mühendislik yapmaya çalışan kuantum bilgisayarlara karşı bile güvenlidir.

**Uzun vadeli çözüm**: KZG'yi kuantum güvenli bir taahhüt şemasıyla değiştirmek. Önde gelen iki aday şunlardır:
- **STARK tabanlı taahhütler**: Eliptik eğriler yerine hash işlevlerine dayanır. Zaten bazı ZK-toplamalarında kullanılmaktadır.
- **Kafes tabanlı taahhütler**: Kuantum dirençli olduğuna inanılan kafes problemlerinin zorluğuna dayanır.

Her iki yaklaşım da Ethereum ölçeğinde verimlilik ve pratiklik açısından hala araştırılmaktadır.

### 3. Hesap imzaları: ECDSA {#eoa-signatures}

**Ne işe yarar**: Her standart Ethereum hesabı (harici olarak sahip olunan hesap veya [EOA](/glossary/#eoa)), işlemleri imzalamak için secp256k1 eğrisinde ECDSA kullanır. Fonlarınızı koruyan şey budur.

**Neden savunmasızdır**: İşlem göndermiş herhangi bir hesap için açık anahtar zincir içi olarak ifşa edilir. Bir kuantum bilgisayar, bu ifşa edilmiş açık anahtar verilerinden özel anahtarı türetebilir.

**Önemli nüans**: Yalnızca Ether almış ve hiç işlem göndermemiş hesaplar açık anahtarlarını ifşa etmemiştir. Yalnızca adres (açık anahtarın bir hash'i) görünürdür, bu da bir miktar ek koruma sağlar.

**Yaklaşım**: Ethereum, tek bir protokol çapında geçiş yerine, kullanıcılara **imza çevikliği** sağlamak için [hesap soyutlama](/roadmap/account-abstraction/) (özellikle 2026'nın ikinci yarısında Hegotá için düşünülen EIP-8141) kullanmayı planlamaktadır. Bireysel hesaplar, tüm protokolün değişmesini beklemeden kuantum sonrası bir imza şemasına geçebilir.

Bu pragmatik bir yaklaşımdır. Kuantum sonrası korumayı erkenden isteyen kullanıcılar ve cüzdanlar bunu gönüllü olarak benimseyebilirken, daha geniş çaplı geçiş zaman içinde gerçekleşir.

### 4. Uygulama katmanı ZK-ispatları {#zk-proofs}

**Ne işe yarar**: Sıfır bilgi ispatı sistemleri, katman 2 (l2) toplamaları ve diğer uygulamalar tarafından temel verileri açığa çıkarmadan hesaplamaları doğrulamak için kullanılır.

**Neden savunmasızdır**: Birçok popüler ZK-ispatı sistemi (eliptik eğri eşleşmeleri kullanan SNARK'lar) kuantum savunmasız varsayımlara dayanır.

**Yaklaşım**: Eliptik eğriler yerine hash işlevlerine dayanan STARK'lar zaten kuantum dirençlidir ve çeşitli toplamalar tarafından kullanılmaktadır. STARK tabanlı sistemlerin ekosistem tarafından doğal olarak benimsenmesi, uygulama katmanında halihazırda kuantum sonrası güvenlik sağlamaktadır.

## NIST standartları {#nist-standards}

Ağustos 2024'te, ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) [üç kuantum sonrası kriptografi standardını kesinleştirdi](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Bunlar önemlidir çünkü Ethereum da dahil olmak üzere tüm teknoloji endüstrisine, her projenin kendi algoritmasını icat etmesi yerine üzerine inşa edebileceği ortak bir onaylanmış algoritmalar seti sunarlar.

| Standart | İsim | Tür | Kullanım durumu |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Kafes tabanlı | Anahtar kapsülleme (anahtar değişimi) |
| FIPS 204 | ML-DSA (Dilithium) | Kafes tabanlı | Dijital imzalar |
| FIPS 205 | SLH-DSA (SPHINCS+) | Hash tabanlı | Dijital imzalar |

Bu standartlar, daha geniş endüstrinin kuantum sonrası geçişi için bir temel sağlar. Ethereum'un çalışmaları, verimlilik ve toplamanın önemli olduğu merkeziyetsiz bir ağın benzersiz zorluklarına özel olarak odaklanarak bunları temel alır ve genişletir.

## Ethereum Vakfı'nın yaklaşımı {#ef-approach}

Ethereum Vakfı, Ocak 2026'da Thomas Coratger liderliğinde özel bir Kuantum Sonrası Güvenlik ekibi kurdu. Ekibin çalışmaları [pq.ethereum.org](https://pq.ethereum.org) adresinden herkese açık olarak takip edilmektedir.

### Mevcut faaliyetler (Nisan 2026 itibarıyla) {#current-activity}

- **Haftalık birlikte çalışabilirlik geliştirici ağları (devnets)**: Lighthouse, Grandine, Zeam, Ream Labs ve PierTwo dahil olmak üzere 10'dan fazla istemci ekibi düzenli kuantum sonrası birlikte çalışabilirlik testlerine katılmaktadır.
- **Poseidon Ödülü**: Hash tabanlı kriptografik ilkellerdeki iyileştirmeleri hedefleyen 1 milyon dolarlık bir araştırma ödülü.
- **Açık kaynaklı uygulamalar**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) ve leanMultisig'in tümü [leanEthereum GitHub organizasyonu](https://github.com/leanEthereum) altında mevcuttur.
- **2. Yıllık PQ Araştırma İnzivası**: 9 Ekim 2026 ile 12 Ekim 2026 tarihleri arasında Cambridge, Birleşik Krallık'ta planlanmıştır.
- **NIST Uyumu**: Ethereum'un çalışmaları, Ağustos 2024'te NIST tarafından kesinleştirilen kuantum sonrası kriptografi standartları (ML-KEM, ML-DSA ve SLH-DSA gibi) üzerine inşa edilmiştir.

### Geçiş kilometre taşları {#migration-milestones}

Ekip, kuantum sonrası kriptografiyi Ethereum'a kademeli olarak tanıtmak için bir dizi protokol yükseltmesinin ana hatlarını belirledi. Bunlar planlama kilometre taşlarıdır, garantili taahhütler değildir. İsimler ve sıralama değişebilir.

| Kilometre Taşı | Ne getiriyor |
|-----------|--------------------|
| I* | PQ anahtar kaydı. Doğrulayıcılar, mevcut BLS anahtarlarının yanına kuantum sonrası açık anahtarları kaydedebilir. |
| J* | PQ imza doğrulama ön derlemeleri. Akıllı sözleşmeler ve cüzdanlar PQ imzalarını yerel olarak doğrulayabilir. |
| L* | leanVM aracılığıyla PQ onaylamaları ve gerçek zamanlı mutabakat katmanı ispatları. Doğrulayıcılar mutabakat için PQ imzalarını kullanmaya başlar. |
| M* | Tam PQ imza toplama ve PQ güvenli blob taahhütleri. |

**Hedef**: Yapılandırılmış çatallanma kilometre taşları, temel kuantum sonrası altyapının yaklaşık 2029 yılına kadar tamamlanmasını hedeflemektedir. Tam yürütme katmanı ve ekosistem geçişi bunun ötesine uzanır.

## Kullanıcıların ne yapması gerekiyor? {#what-users-need-to-do}

**Şu anda: hiçbir şey.** Fonlarınız güvendedir. Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini tehdit edemez.

**Gelecekte**: Kuantum sonrası imza şemaları Ethereum'da yaygın olarak desteklendiğinde (Hegotá sert çatallanması ve EIP-8141'in uygulanmasının ardından beklenmektedir), hesabınızı kuantum güvenli imzalara geçirmek isteyeceksiniz. Cüzdan yazılımları bu geçişte size rehberlik edecektir.

Hesabınız hiç işlem göndermediyse (yani açık anahtarınız zincir içi olarak ifşa edilmediyse), ek bir koruma katmanına sahiptir. Ancak tüm hesaplar eninde sonunda geçiş yapmalıdır.

Hareketsiz cüzdanların (sahipleri geçiş yapma ihtiyacının farkında olmayabilecek hesaplar) nasıl ele alınacağı sorusu açık bir yönetişim konusudur. Ethereum topluluğu bu konuda henüz bir mutabakata varmamıştır.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Kuantum bilgisayarlar bugün ETH'mi çalabilir mi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Hayır.** Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini kıramaz. Mevcut kuantum donanımı gereken ölçekten çok uzaktır. Bu sayfada açıklanan çalışmalar aktif bir tehdide yanıt değil, geleceğe yönelik bir hazırlıktır.

</ExpandableCard>

<ExpandableCard title="Kuantum bilgisayarlar ne zaman bir tehdit haline gelebilir?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Tahminler değişmektedir. Google'ın Mart 2026 araştırması, 256 bitlik eliptik eğri kriptografisini kırmak için gereken donanımın en erken bu on yılın sonlarına doğru gelebileceğini öne sürmektedir, ancak önemli mühendislik zorlukları devam etmektedir. Çoğu araştırmacı gerçekçi bir tehdidin en az birkaç yıl uzakta olduğunu düşünmektedir. Dürüst cevap, kesin zaman çizelgesini kimsenin bilmediğidir, ki bu da tam olarak şimdi hazırlanmanın neden önemli olduğudur.

</ExpandableCard>

<ExpandableCard title="Cüzdanımı korumak için bir şey yapmam gerekecek mi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Eninde sonunda, evet. Kuantum sonrası imza şemaları Ethereum'da kullanıma sunulduğunda, kullanıcılar hesaplarını taşımak isteyeceklerdir. Cüzdan yazılımları muhtemelen bu geçişi sizin için halledecektir. Şimdilik yapmanız gereken hiçbir şey yoktur. Eylem gerektiğinde, Ethereum topluluğu ve cüzdan geliştiricileri net rehberlik ve araçlar sağlayacaktır.

</ExpandableCard>

<ExpandableCard title="Peki ya token'larım, NFT'lerim ve DeFi pozisyonlarım ne olacak?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Ethereum'daki varlıklar hesap imzaları tarafından kontrol edilir. Hesabınız kuantum güvenli bir imza şemasına geçirildiğinde, o hesaptaki her şey korunur. Her bir varlığı ayrı ayrı taşımanıza gerek yoktur. Fon tutan akıllı sözleşmeler (merkeziyetsiz finans (DeFi) protokolleri gibi), dahili olarak hangi kriptografik ilkelleri kullandıklarına bağlı olarak kendi yükseltmelerine ihtiyaç duyabilir.

</ExpandableCard>

<ExpandableCard title="Ethereum bu konuda diğer blokzincirlerin gerisinde mi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Hayır. Ethereum, herhangi bir Blokzincir arasındaki en yapılandırılmış kuantum sonrası programlardan birine sahiptir: özel bir ekip, finanse edilen araştırmalar, haftalık geliştirici ağları ve kuantum hesaplamayı birinci sınıf bir tasarım kısıtlaması olarak ele alan yayınlanmış bir geçiş yol haritası. Henüz hiçbir Blokzincir tam bir kuantum sonrası geçişi tamamlamamıştır. Ethereum Vakfı tahminlerine göre, Ethereum'un kuantum savunmasız hareketsiz fon riski yaklaşık %0,1'dir ve bu diğer büyük Blokzincir ağlarından çok daha düşüktür.

</ExpandableCard>

<ExpandableCard title="'Şimdi topla, sonra şifresini çöz' nedir?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Şimdi topla, sonra şifresini çöz" (Harvest now, decrypt later), birisinin bugün şifrelenmiş verileri veya ifşa edilmiş açık anahtarları kaydettiği, ardından yeterince güçlü bir kuantum bilgisayar var olduğunda şifrelemeyi kırdığı bir saldırıdır. Ethereum için bu, en çok açık anahtarları halihazırda zincir içi olarak ifşa edilmiş hesaplarla (işlem göndermiş herhangi bir hesap) ilgilidir. Kuantum tehdidi henüz acil olmasa da topluluğun kuantum sonrası geçişi zamana duyarlı olarak ele almasının bir nedeni budur.

</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Ethereum Vakfı_
- [Kuantum Sonrası Kriptografi Projesi](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [NIST Kuantum Sonrası Kriptografi standartları](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Kuantum güvenlik açıklarını sorumlu bir şekilde ifşa ederek kripto parayı korumak](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Kuantum sınırları göründüğünden daha yakın olabilir](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG ve güvenilir kurulumlar](/roadmap/danksharding/#what-is-kzg)
- [Lean Week Cambridge (2025) leanVM + PQ atölye kaynakları](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Yalın Ethereum (Lean Ethereum)_
- [PQ İşlem İmzaları ACD Ara Görüşmeleri](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Ethereum Vakfı_
- [PQ Birlikte Çalışabilirlik ACD Ara Görüşmeleri](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Ethereum Vakfı_
- [Yalın Ethereum ve Kuantum Sonrası Güvenlik YouTube Oynatma Listesi](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Ethereum Vakfı_
- [Kuantum sonrası direnç panel röportajı](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Ethereum'da hesap soyutlama](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _EF Mimarisi_
- [Süperpozisyon: Kuantum Hesaplama Endüstrisinin Analizi](https://www.superpositioned.co/) - _Saneel Sreeni_