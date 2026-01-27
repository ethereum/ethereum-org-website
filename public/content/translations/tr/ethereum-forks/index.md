---
title: Tüm Ethereum çatallanmalarının zaman çizelgesi (2014'ten günümüze)
description: Önemli kilometre taşları, sürümler ve çatallar dahil olmak üzere Ethereum blok zincirinin geçmişi.
lang: tr
sidebarDepth: 1
---

# Tüm Ethereum çatallanmalarının zaman çizelgesi (2014'ten günümüze) {#the-history-of-ethereum}

Ethereum blok zincirindeki tüm önemli dönüm noktalarının, çatalların ve güncellemelerin bir zaman çizelgesi.

<ExpandableCard title="Çatallar nedir?" contentPreview="Genellikle planlı teknik yükseltmeleri içeren Ethereum protokolü kuralı değişiklikleri.">

Çatallar, ağda önemli teknik yükseltmeler veya değişiklikler yapılması gerektiğinde ortaya çıkar: Bunlar genellikle [Ethereum İyileştirme Önerileri (EIP'ler)](/eips/)'den kaynaklanır ve protokolün "kurallarını" değiştirir.

Geleneksel, merkezden kontrol edilen yazılımlarda yükseltmelere ihtiyaç duyulduğunda, şirket son kullanıcı için sadece yeni bir versiyon yayınlar. Blok zincirleri farklı çalışır çünkü merkezi bir sahiplik yoktur. [Ethereum istemcileri](/developers/docs/nodes-and-clients/) yeni çatal kurallarını uygulamak için yazılımlarını güncellemelidir. Ayrıca blok yaratıcıları (iş ispatı dünyasındaki madenciler, hisse ispatı dünyasındaki doğrulayıcılar) ve düğümler, bloklar oluşturmalı ve yeni kurallara göre doğrulama yapmalıdır. [Mutabakat mekanizmaları hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/)

Bu kural değişiklikleri ağda geçici bir bölünmeye neden olabilir. Yeni bloklar yeni ya da eski kurallara göre yaratılabilir. Çatallar genellikle önceden kararlaştırılır, böylece müşteriler değişiklikleri uyum içinde benimser ve yükseltmelerle birlikte çatal ana zincir hâline gelir. Fakat nadir durumlarda çatallanmalar üzerindeki anlaşmazlıklar, ağın geçici olarak ayrılmasına neden olabilir: En bilineni, <a href="#dao-fork">DAO çatallanması</a> ile Ethereum Classic'in yaratılmasıdır.

</ExpandableCard>

<ExpandableCard title="Neden bazı yükseltmelerin birden fazla adı var?" contentPreview="Yükseltme adları bir düzeni takip eder">

Ethereum'un altında çalışan yazılım, [yürütüm katmanı](/glossary/#execution-layer) ve [fikir birliği katmanı](/glossary/#consensus-layer) olmak üzere iki kısımdan oluşur.

**Yürütme yükseltmesi adlandırması**

2021'den bu yana, **yürütme katmanındaki** yükseltmeler kronolojik sırayla [önceki Devcon konumlarının](https://devcon.org/en/past-events/) şehir adlarına göre adlandırılmaktadır:

| Yükseltme Adı | Devcon Yılı | Devcon Numarası | Yükseltme Tarihi |
| ------------- | ----------- | --------------- | ---------------- |
| Berlin        | 2014        | 0               | 15 Nis 2021      |
| Londra        | 2015        | I               | 5 Ağu 2021       |
| Şanghay       | 2016        | II              | 12 Nis 2023      |
| Cancun        | 2017        | III             | 13 Mar 2024      |
| **Prag**      | 2018        | IV              | TBD - Sonraki    |
| _Osaka_       | 2019        | V               | TBD              |
| _Bogota_      | 2022        | VI              | TBD              |
| _Bangkok_     | 2024        | VII             | TBD              |

**Mutabakat yükseltmesi adlandırması**

[İşaret Zinciri'nin](/glossary/#beacon-chain) lansmanından bu yana, **mutabakat katmanındaki** yükseltmeler, alfabetik sırayla ilerleyen harflerle başlayan gök cisimlerinin adını almaktadır:

| Yükseltme Adı                                                 | Yükseltme Tarihi |
| ------------------------------------------------------------- | ---------------- |
| İşaret Zinciri başlangıcı                                     | 1 Ara 2020       |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 Eki 2021      |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 Eyl 2022       |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 Nis 2023      |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 Mar 2024      |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | TBD - Sonraki    |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | TBD              |

**Birleşik adlandırma**

Yürütme ve mutabakat yükseltmeleri başlangıçta farklı zamanlarda kullanıma sunuldu, ancak 2022'deki [Birleşim](/roadmap/merge/) sonrasında bunlar eş zamanlı olarak dağıtıldı. Bu nedenle tek bir birleşik terim kullanılarak bu yükseltmelere yapılan atıfları sadeleştirmek için günlük dilde kullanılan terimler ortaya çıkmıştır. Bu, genellikle "**Shapella**" olarak anılan _Shanghai-Capella_ yükseltmesiyle başladı ve _Cancun-Deneb_ (**Dencun**) ile _Prag-Electra_ (**Pectra**) yükseltmeleriyle devam ediyor.

| Yürütme Yükseltmesi | Mutabakat Yükseltmesi | Kısa Ad    |
| ------------------- | --------------------- | ---------- |
| Şanghay             | Capella               | "Shapella" |
| Cancun              | Deneb                 | "Dencun"   |
| Prag                | Electra               | "Pectra"   |
| Osaka               | Fulu                  | "Fusaka"   |

</ExpandableCard>

Geçmişteki bazı önemli yükseltmeler hakkındaki bilgilere doğrudan atlayın: [İşaret Zinciri](/roadmap/beacon-chain/); [Birleşim](/roadmap/merge/); ve [EIP-1559](#london)

Gelecekteki protokol yükseltmelerini mi arıyorsunuz? [Ethereum yol haritasındaki yaklaşan yükseltmeler hakkında bilgi edinin](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Fusaka hakkında daha fazla bilgi](/roadmap/fusaka/)

### Prag-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Prag-Electra ("Pectra") yükseltmesi, tüm kullanıcılar, katman 2 ağları, paydaşlar ve düğüm operatörleri için deneyimi geliştirmeyi amaçlayan Ethereum protokolünde çeşitli iyileştirmeler içeriyordu.

Hisseleme, bileşik doğrulayıcı hesapları ile bir yükseltme aldı ve yürütme para çekme adresi kullanılarak hisselenmiş fonlar üzerinde daha iyi kontrol sağladı. EIP-7251, tek bir doğrulayıcı için maksimum etkili bakiyeyi 2048'e yükselterek paydaşlar için sermaye verimliliğini artırdı. EIP-7002, bir yürütme hesabının, çıkış yapma veya fonların bir kısmını çekme dahil olmak üzere doğrulayıcı eylemlerini güvenli bir şekilde tetiklemesini sağlayarak, ETH paydaşları için deneyimi iyileştirirken düğüm operatörleri için hesap verebilirliği güçlendirmeye yardımcı oldu.

Yükseltmenin diğer kısımları, normal kullanıcılar için deneyimi iyileştirmeye odaklandı. EIP-7702, normal bir akıllı sözleşme olmayan hesabın ([EOA](/glossary/#eoa)) akıllı bir sözleşmeye benzer kod yürütme yeteneğini getirdi. Bu, geleneksel Ethereum hesapları için işlem gruplama, gaz sponsorluğu, alternatif kimlik doğrulama, programlanabilir harcama kontrolleri, hesap kurtarma mekanizmaları ve daha fazlası gibi sınırsız yeni işlevlerin kilidini açtı.

<ExpandableCard title="Pectra EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

Daha iyi kullanıcı deneyimi:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA hesap kodunu ayarla</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Blob iş hacmi artışı</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Çağrı verisi maliyetini artır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL yapılandırma dosyalarına blob zamanlaması ekle</em></li>
</ul>

Daha iyi hisseleme deneyimi:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> değerini artırın</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Yürütme katmanından tetiklenebilir çıkışlar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Genel amaçlı yürütme katmanı istekleri</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Zincir üzerinde doğrulayıcı mevduatları sağlama</em></li>
</ul>

Protokol verimliliği ve güvenlik iyileştirmeleri:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 eğri işlemleri için ön derleme</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Geçmiş blok karmalarını durumda kaydet</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Komite dizinini Tasdik'in dışına taşı</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Pectra hisseleme deneyimini nasıl geliştirecek?](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Electra yükseltme özelliklerini okuyun](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prag-Electra ("Pectra") SSS](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun özeti {#cancun-summary}

Cancun yükseltmesi, Deneb mutabakat yükseltmeleriyle birlikte ölçeklenebilirliği iyileştirmeyi amaçlayan Ethereum'un _yürütmesinde_ bir dizi iyileştirme içerir.

Özellikle bu, **Proto-Danksharding** olarak bilinen ve katman 2 toplamaları için veri depolama maliyetini önemli ölçüde azaltan EIP-4844'ü içerir. Bu, verilerin kısa bir süreliğine Ana Ağa gönderilmesini sağlayan veri "blob'larının" kullanıma açılmasıyla gerçekleştirilir. Bu da katman 2 toplamaların kullanıcıları için önemli ölçüde daha düşük işlem ücretlerini beraberinde getirir.

<ExpandableCard title="Cancun EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Geçici depolama işlem kodları</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM'de işaret bloğu kökü</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob işlemleri (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Bellek kopyalama talimatı</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> sadece aynı işlemde</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> işlem kodu</em></li>
</ul>

</ExpandableCard>

- [Katman 2 toplamaları](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Cancun yükseltme özelliklerini okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb özeti {#deneb-summary}

Deneb yükseltmesi, Ethereum'un _mutabakatında_ ölçeklenebilirliği iyileştirmeyi amaçlayan bir dizi iyileştirme içerir. Bu yükseltme, İşaret Zincirindeki diğer iyileştirmelerin yanı sıra Proto-Danksharding'i (EIP-4844) etkinleştirmek için Cancun yürütme yükseltmeleriyle birlikte geliyor.

Önceden oluşturulmuş imzalı "gönüllü çıkış mesajlarının" süresi artık sona ermiyor, bu sayede fonlarını üçüncü taraf bir düğüm operatörüyle hisseleme yapan kullanıcılara daha fazla kontrol olanağı sağlanıyor. Bu imzalı çıkış mesajıyla paydaşlar, kimseden izin istemek zorunda kalmadan fonlarından istedikleri zaman güvenli bir şekilde çıkma ve çekme olanağını korurken düğüm operasyonunu devredebilirler.

EIP-7514, doğrulayıcıların ağa katılabilmeleri için gereken "kazanç" oranını dönem başına sekiz (8) ile sınırlayarak ETH ihracına ilişkin bir sıkılaştırma getiriyor. ETH ihracı, hisselenen toplam ETH ile orantılı olduğundan, katılan doğrulayıcıların sayısının sınırlandırılması, yeni ihraç edilen ETH'nin _büyüme oranını_ sınırlarken, aynı zamanda düğüm operatörleri için donanım gereksinimlerini de azaltarak merkezsizleşmeye yardımcı olur.

<ExpandableCard title="Deneb EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM'de işaret bloğu kökü</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob işlemleri</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Sürekli geçerli imzalı gönüllü çıkışlar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Maksimum tasdik dahil etme yuvasını artırma</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Maksimum dönem kayıp sınırı ekleme</em></li>
</ul>

</ExpandableCard>

- [Deneb yükseltme özelliklerini okuyun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb ("Dencun") SSS](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Şanghay-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Şanghay özeti {#shanghai-summary}

Şanghay yükseltmesi, hisselemede çekimlerini yürütüm katmanına getirdi. Bu, Capella yükseltmesiyle birlikte blokların çekim işlemlerini kabul etmesi sağladı; bu da, paydaşların ETH'lerini İşaret Zincirinden yürütüm katmanına çekmelerine olanak tanıyor.

<ExpandableCard title="Şanghay EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> adres ısıtmasını başlatır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Yeni <code>PUSH0</code> talimatıdır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Sınır ve sayaç başlangıç kodudur</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>İşlem olarak işaret zinciri iletim çekimleridir</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> kodunu kullanımdan kaldırır</em></li>
</ul>

</ExpandableCard>

- [Şanghay yükseltme özelliklerini okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella özeti {#capella-summary}

Capella yükseltmesi, fikir birliği katmanındaki (İşaret Zinciri) en büyük 3. büyük yükseltmeydi ve hisseleme çekimlerini mümkün kıldı. Capella, Şanghay yürütüm katmanı yükseltmesi ile eş zamanlı gerçekleşti ve hisseleme çekim işlevselliğini aktif hale getirdi.

Bu fikir birliği katmanı yükseltmesi, ilk yatırma işlemleriyle birlikte daha önce çekim yapmak için kimlik bilgilerini kaydetmemiş paydaşlara bunu yapma imkanı sağladı ve böylece çekim yapabilmelerini mümkün kıldı.

Yükseltme ayrıca, mevcut tüm ödül ödemeleri veya tam çekimler için doğrulayıcı hesaplarını sürekli işleyen otomatik hesap süpürme işlevselliğini getirdi.

- [Hisseleme para çekme işlemleri hakkında daha fazla bilgi](/staking/withdrawals/).
- [Capella yükseltme özelliklerini okuyun](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Birleşim) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Özet {#paris-summary}

Paris yükseltmesi, iş ispatı blokzincirinin 58750000000000000000000 [son toplam zorluğu](/glossary/#terminal-total-difficulty) aşmasıyla tetiklendi. Bu, 15 Eylül 2022'de bir sonraki blokta Paris yükseltmesini tetikleyen blok 15537393'te oldu. Paris, [Birleşim](/roadmap/merge/) geçişiydi; ana özelliği, [iş ispatı](/developers/docs/consensus-mechanisms/pow) madencilik algoritmasını ve ilişkili mutabakat mantığını kapatıp yerine [hisse ispatını](/developers/docs/consensus-mechanisms/pos) açmaktı. Paris'in kendisi, bağlı [mutabakat istemcilerinden](/developers/docs/nodes-and-clients/#consensus-clients) talimat almalarını sağlayan (mutabakat katmanındaki Bellatrix'e eşdeğer) [yürütme istemcileri](/developers/docs/nodes-and-clients/#execution-clients) için bir yükseltmeydi. Bu, toplu olarak [Motor API'si](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen yeni bir dahili API yöntemleri setinin etkinleştirilmesini gerektiriyordu. Bu, muhtemelen Ethereum tarihindeki [Homestead](#homestead)'den bu yana en önemli yükseltmeydi!

- [Paris yükseltme özelliklerini okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> - <em>Mutabakatı Hisse İspatına yükseltin</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY işlem kodunu PREVRANDAO ile değiştirin</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Özet {#bellatrix-summary}

Bellatrix yükseltmesi, zinciri [Birleşim](/roadmap/merge/)'e hazırlayan [İşaret Zinciri](/roadmap/beacon-chain) için ikinci planlanmış yükseltmeydi. Eylemsizlik ve kesinti yapılabilir saldırıların tam değerlerine yönelik doğrulayıcı cezaları getiriyor. Bellatrix ayrıca, çatallanma seçim kurallarına yönelik, zinciri Birleşim'e ve son iş ispatı bloğundan ilk hisse ispatı bloğuna geçişe hazırlamayı amaçlayan bir yükseltme içeriyor. Bu, mutabakat istemcilerinin 58750000000000000000000 [son toplam zorluk](/glossary/#terminal-total-difficulty) değerinden haberdar edilmesini içerir.

- [Bellatrix yükseltme özelliklerini okuyun](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Özet {#gray-glacier-summary}

Gray Glacier ağ yükseltmesi, [bomba değerini](/glossary/#difficulty-bomb) üç ay erteledi. Bu, bu yükseltmede sunulan tek değişikliktir ve doğası gereği [Arrow Glacier](#arrow-glacier) ve [Muir Glacier](#muir-glacier) yükseltmelerine benzer. [Byzantium](#byzantium), [Constantinople](#constantinople) ve [Londra](#london) ağ yükseltmelerinde de benzer değişiklikler yapılmıştır.

- [EF Blog - Gray Glacier Yükseltme Duyurusu](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>bomba değerini Eylül 2022'ye kadar erteliyor</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Özet {#arrow-glacier-summary}

Arrow Glacier ağ yükseltmesi, [bomba değerini](/glossary/#difficulty-bomb) birkaç ay erteledi. Bu, bu yükseltmede sunulan tek değişikliktir ve doğası gereği [Muir Glacier](#muir-glacier) yükseltmesine benzer. [Byzantium](#byzantium), [Constantinople](#constantinople) ve [Londra](#london) ağ yükseltmelerinde de benzer değişiklikler yapılmıştır.

- [EF Blog - Arrow Glacier Yükseltme Duyurusu](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Yükseltmesi](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>bomba değerini Haziran 2022'ye kadar erteliyor</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Özet {#altair-summary}

Altair yükseltmesi, [İşaret Zinciri](/roadmap/beacon-chain) için ilk planlanmış yükseltmeydi. ''Senkronizasyon komiteleri'' için destek ekleyerek Birleşim'e doğru ilerlerken hafif istemcileri, daha yüksek doğrulayıcı durgunluğunu ve kesme cezalarını mümkün kıldı.

- [Altair yükseltme özelliklerini okuyun](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Eğlenceli gerçek! {#altair-fun-fact}

Altair, kesin bir kullanıma sunma süresi olan ilk büyük ağ yükseltmesiydi. Önceden her yükseltme, blok sürelerinin değiştiği iş kanıtı zincirinde beyan edilen bir blok numarasına dayanıyordu. İşaret Zinciri, iş ispatı için çözüm gerektirmez ve bunun yerine, doğrulayıcıların blok önerebileceği 32 tane on iki saniyelik "yuva"dan oluşan zamana dayalı bir dönem sistemi üzerinde çalışır. Bu yüzden 74.240 numaralı döneme ne zaman ulaşacağımızı tam olarak biliyorduk ve Altair hayat buldu!

- [Blok zamanı](/developers/docs/blocks/#block-time)

---

### Londra {#london}

<NetworkUpgradeSummary name="london" />

#### Özet {#london-summary}

Londra yükseltmesi, işlem ücreti piyasasını yeniden şekillendiren [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ile birlikte, gaz iadelerinin nasıl ele alındığına ve [Buz Devri](/glossary/#ice-age) takvimine ilişkin değişiklikleri getirdi.

#### Londra Yükseltmesi/EIP-1559 neydi? {#eip-1559}

London yükseltmesinden önce, Ethereum'un sabit boyutlu blokları vardı. Ağ talebinin yüksek olduğu zamanlarda, bu bloklar tam kapasitede çalıştılar. Sonuç olarak, kullanıcılar bloka girebilmek için çok sık talebin azalmasını beklediler ve bu kötü bir kullanıcı deneyimine sebep oldu. Londra Yükseltmesi Ethereum'a değişken boyutlu blokları tanıttı.

Ethereum ağındaki işlem ücretlerinin hesaplanma şekli, Ağustos 2021'deki [Londra Yükseltmesi](/ethereum-forks/#london) ile değişti. Londra yükseltmesinden önce, ücretler `taban` ve `öncelik` ücretleri ayrılmadan aşağıdaki gibi hesaplanıyordu:

Alice'in Bob'a 1 ETH ödemek zorunda olduğunu varsayalım. İşlemde gaz limiti 21.000 birim, gaz fiyatı ise 200 gwei'dir.

Toplam ücret şöyle olurdu: `Gaz birimleri (limit) * Birim başına gaz fiyatı` yani `21.000 * 200 = 4.200.000 gwei` veya 0,0042 ETH

[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)'un Londra Yükseltmesi'nde uygulanması, işlem ücreti mekanizmasını daha karmaşık hâle getirdi, ancak gaz ücretlerini daha öngörülebilir kıldı ve bu da daha verimli bir işlem ücreti piyasasıyla sonuçlandı. Kullanıcılar, gaz için piyasa fiyatından (`baseFeePerGas`) daha fazlasını ödemeyeceklerini bilerek ve bahşişleri düşüldükten sonra fazladan ödedikleri tutarı geri alarak, işlemin yürütülmesi için ne kadar ödemek istediklerine karşılık gelen bir `maxFeePerGas` ile işlem gönderebilirler.

Bu video EIP-1559'u ve getirdiği faydaları açıklıyor: [EIP-1559 Açıklaması](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Merkeziyetsiz uygulama geliştiricisi misiniz? Kütüphanelerinizi ve araçlarınızı yükselttiğinizden emin olun.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herder's açıklamasını okuyun](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Londra EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>işlem ücreti piyasasını iyileştirir</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>bir bloktan <code>BASEFEE</code>'yi geri döndürür</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>Ethereum Sanal Makinesi operasyonları için gaz iadelerini azaltır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> ile başlayan sözleşmelerin dağıtılmasını engeller</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>Buz Devri'ni Aralık 2021'e kadar erteler</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Özet {#berlin-summary}

Berlin yükseltmesi, belirli Ethereum Sanal Makinesi eylemleri için optimize edilmiş gaz maliyetini yükseltiyor ve çoklu işlem türleri için desteği artırıyor.

- [Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herder's açıklamasını okuyun](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIP'leri" contentPreview="Bu yükseltmeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp gaz masrafını düşürür</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>birden fazla işlem türü için daha kolay desteği mümkün kılar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>durum erişimi işlem kodları için gaz masrafı artar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>isteğe bağlı erişim listeleri ekler</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### İşaret Zinciri başlangıcı {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Özet {#beacon-chain-genesis-summary}

[İşaret Zinciri](/roadmap/beacon-chain/), güvenli bir şekilde gönderilebilmek için 32 adet hisselenmiş ETH'den oluşan 16.384 depozitoya ihtiyaç duyuyordu. Bu 27 Kasım'da gerçekleşti ve İşaret Zinciri 1 Aralık 2020'de blok üretmeye başladı.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  İşaret Zinciri
</DocLink>

---

### Hisseleme depozito sözleşmesi dağıtıldı {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Özet {#deposit-contract-summary}

Hisseleme depozito sözleşmesi, Ethereum ekosistemine [hisselemeyi](/glossary/#staking) tanıttı. Bir [Ana Ağ](/glossary/#mainnet) sözleşmesi olmasına rağmen, önemli bir [Ethereum yükseltmesi](/roadmap/) olan [İşaret Zinciri](/roadmap/beacon-chain/)'nin başlatılma zaman çizelgesi üzerinde doğrudan bir etkisi oldu.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Hisseleme
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Özet {#muir-glacier-summary}

Muir Glacier çatallanması, [bomba değerine](/glossary/#difficulty-bomb) bir gecikme getirdi. [İş ispatı](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizmasının blok zorluğundaki artışlar, işlem gönderme ve merkeziyetsiz uygulamaları kullanma sırasındaki bekleme sürelerini artırarak Ethereum'un kullanılabilirliğinin azalması riski yarattı.

- [Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herder's açıklamasını okuyun](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>bomba değerini 4.000.000 blok veya ortalama yaklaşık 611 gün daha geciktirir.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### İstanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Özet {#istanbul-summary}

İstanbul çatallanması:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) içindeki belirli eylemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Hizmet reddi saldırısına karşı direnci iyileştirdi.
- SNARK'lara ve STARK'lara dayalı [Katman 2 ölçeklendirme](/developers/docs/scaling/#layer-2-scaling) çözümlerini daha performanslı hâle getirdi.
- Ethereum'un ve Zcash'in birlikte çalışmasını sağladı.
- Sözleşmelerin daha yaratıcı fonksiyonlar sunmasını sağladı.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="İstanbul EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>Ethereum'un Zcash gibi gizlilik koruyucu bir para birimiyle çalışmasına olanak verir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[gaz](/glossary/#gas) maliyetlerini iyileştirmek için daha ucuz kriptografi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [işlem kodunu](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ekleyerek Ethereum'u tekrar saldırılarına karşı korur.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>işlem kodu gaz fiyatlarını tüketime daylı olarak iyileştirme.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>bloklarda daha fazla veriye izin vermek için CallData maliyetini düşürür – [Katman 2 ölçeklendirmesi](/developers/docs/scaling/#layer-2-scaling) için iyidir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>diğer işlem 
 kodu gaz ücret değişiklikleri.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Özet {#constantinople-summary}

Konstantinopolis çatallanması:

- Blok [madenciliği](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 3 ETH'den 2 ETH'ye düşürdü.
- [Hisse ispatı uygulanmadan önce](#beacon-chain-genesis) blokzincirinin donmamasını sağladı.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) içindeki belirli eylemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Henüz oluşturulmamış adreslerle etkileşim kurma yeteneğini ekledi.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>belirli zincir içi eylemlerin maliyetini optimize eder.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>henüz oluşturulmamış adreslerle etkileşim kurmanıza olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>başka bir sözleşmenin kodunun karmasını almak için <code>EXTCODEHASH</code> talimatını sunar.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>blok zincirinin proof-of-stake öncesinde donmadığından emin olur ve blok ödülünü 3 ETH'den 2 ETH'ye düşürür.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Özet {#byzantium-summary}

Bizans çatalı:

- Blok [madenciliği](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 5 ETH'den 3 ETH'ye düşürdü.
- [Bomba değerini](/glossary/#difficulty-bomb) bir yıl erteledi.
- Diğer sözleşmelere durum değiştirmeyen çağrılar yapabilme olanağı ekledi.
- [Katman 2 ölçeklendirmeye](/developers/docs/scaling/#layer-2-scaling) olanak sağlamak için belirli kriptografi yöntemleri eklendi.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> işlem kodu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>başarı ya da başarısızlığı bildirmek için işlem makbuzlarına durum alanı eklendi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snark'lara](/developers/docs/scaling/zk-rollups/) izin vermek için eliptik eğri ve skaler çarpma ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snark'lara](/developers/docs/scaling/zk-rollups/) izin vermek için eliptik eğri ve skaler çarpma ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA imza doğrulasını mümkün kılar.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>değişken uzunlukta geri dönüş değerleri için destek ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>diğer sözleşmelere durum değiştirmeyen çağrıların eklenmesine imkan veren <code>STATICCALL</code> işlem kodunu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>zorluk ayarlama formülünü değiştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[bomba değerini](/glossary/#difficulty-bomb) 1 yıl geciktirir ve blok ödülünü 5'ten 3 ETH'ye düşürür.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Sahte Ejderha {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Özet {#spurious-dragon-summary}

Sahte Ejderha çatallanması, ağdaki hizmet reddi (DoS) saldırılarına (Eylül/Ekim 2016) verilen ve şunları da içeren ikinci yanıttı:

- ağ üzerinde gelecekteki saldırıları önlemek için işlem kodu fiyatlandırmasını ayarlama.
- blokzincir durumunun "şişkinliğinin indirilmesini" sağlama.
- tekrar saldırı koruması ekleme.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>bir Ethereum zincirindeki işlemlerin alternatif bir zincir üzerinde yeniden yayımlanmasını engeller, örneğin bir test ağı işleminin ana Ethereum ağında tekrarlanması.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> işlem kodunun fiyatlarını ayarlar – hesaplama açısından pahalı sözleşme işlemleri yoluyla ağı yavaşlatmayı daha zor hale getirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS saldırılarıyla eklenmiş boş hesapların kaldırılmasına olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>Blokzincir üzerindeki bir sözleşmenin sahip olabileceği azami kod büyüklüğünü 24576 bayt olarak değiştirir.</em></li>
</ul>

</ExpandableCard>

---

### Mandalina Düdüğü {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Özet {#tangerine-whistle-summary}

Mandalina Düdüğü çatallanması, ağdaki (Eylül/Ekim 2016) hizmet reddi (DoS) saldırılarına karşı şunları içeren ilk yanıttı:

- düşük fiyatlı işlem kodlarıyla ilgili acil ağ sağlığı sorunlarını ele almak.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>spam saldırılarında kullanılabilen işlem kodlarının maliyetlerini arttırır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>Ethereum protokolünün daha önceki versiyonlarındaki hatalar sebebiyle duruma çok düşük maliyetle yerleştirilmiş çok sayıdaki boş hesabı kaldırarak durum boyutunu küçültür.</em></li>
</ul>

</ExpandableCard>

---

### DAO çatallanması {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Özet {#dao-fork-summary}

DAO çatallanması, güvenli olmayan bir [DAO](/glossary/#dao) sözleşmesinin bir saldırıda 3,6 milyon ETH'nin üzerinde bir meblağ ile boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/learn/understanding-the-dao-attack/) yanıt olarak geliştirildi. Çatallanma, fonları hatalı sözleşmeden tek bir işlevi olan [yeni bir sözleşmeye](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) taşıdı: para çekme. Para kaybeden herkes, cüzdanlarındaki her 100 DAO jetonu için 1 ETH çekebiliyordu.

Bu eylem planı, Ethereum topluluğu tarafından oylandı. Her ETH sahibi, [bir oylama platformu](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) üzerinde bir işlem aracılığıyla oy kullanabildi. Çatallanma kararı, oyların %85'inden fazlasına ulaştı.

Bazı madenciler, DAO olayı protokoldeki bir kusur olmadığı için çatallanmayı reddetti. Onlar da yollarına [Ethereum Classic](https://ethereumclassic.org/) olarak devam ettiler.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Özet {#homestead-summary}

Geleceğe dönük Homestead çatallanması. Birkaç protokol değişikliği ve Ethereum'a başka ağ yükseltmeleri yapma olanağı tanıyan bir ağ değişikliği içeriyordu.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP'leri" contentPreview="Bu çatala dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP2</a> - <em>sözleşme oluşturma sürecinde düzenleme yapar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP7</a> - <em>yeni bir işlem kodu ekler: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p ileri dönük uyumluluk gereksinimlerini tanıtır</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier erimesi {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Özet {#frontier-thawing-summary}

Sınır eritme çatallanması, [blok](/glossary/#block) başına 5.000 [gaz](/glossary/#gas) sınırını kaldırdı ve varsayılan gaz fiyatını 51 [gwei](/glossary/#gwei) olarak ayarladı. Bu, 21.000 gaz gerektiren işlemleri mümkün kıldı. [Bomba değeri](/glossary/#difficulty-bomb), [hisse ispatına](/glossary/#pos) yönelik gelecekteki bir sert çatalı sağlamak üzere getirildi.

- [Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Ethereum Protokolü Güncellemesi 1'i Okuyun](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Özet {#frontier-summary}

Sınır, Ethereum projesinin canlı ancak yalın bir uygulamasıydı. Başarılı Olimpik test aşamasını takip etti. Teknik kullanıcılar, özellikle geliştiriciler için tasarlanmıştı. [Blokların](/glossary/#block) 5.000'lik bir [gaz](/glossary/#gas) limiti vardı. Bu "eritme" dönemi, madencilerin faaliyetlerine başlamasını ve ilk kullanıcıların istemcilerini "acele etmeden" kurmalarını sağladı.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether satışı {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ethereum resmi olarak 42 günlüğüne satışa çıktı. BTC ile satın alınabiliyordu.

[Ethereum Foundation duyurusunu okuyun](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Sarı doküman yayınlandı {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Dr. Gavin Wood tarafından yazılan Sarı Kağıt, Ethereum protokolünün teknik bir tanımıdır.

[Sarı Dokümanı Görüntüleyin](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Tanıtım belgesi yayınlandı {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Projenin 2015'teki lansmanından önce, Ethereum'un kurucusu Vitalik Buterin tarafından 2013'te yayımlanan tanıtım yazısıdır.

<DocLink href="/whitepaper/">
  Tanıtım belgesi
</DocLink>
