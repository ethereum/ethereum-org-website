---
title: "Tüm Ethereum çatallanmalarının zaman çizelgesi (2014'ten günümüze)"
description: "Önemli kilometre taşları, sürümler ve çatallanmalar dahil olmak üzere Ethereum blokzincirinin tarihi."
lang: tr
sidebarDepth: 1
authors: ["Nixo"]
---

[Ethereum](/) blokzincirindeki tüm önemli kilometre taşlarının, çatallanmaların ve güncellemelerin bir zaman çizelgesi.

<ExpandableCard title="Çatallanmalar nelerdir?" contentPreview="Genellikle planlı teknik güncellemeleri içeren, Ethereum Protokolü kurallarındaki değişiklikler.">

Çatallanmalar, ağda büyük teknik güncellemeler veya değişiklikler yapılması gerektiğinde ortaya çıkar; bunlar genellikle [Ethereum İyileştirme Önerilerinden (EIP'ler)](/eips/) kaynaklanır ve protokolün "kurallarını" değiştirir.

Geleneksel, merkezi olarak kontrol edilen yazılımlarda güncellemelere ihtiyaç duyulduğunda, şirket son kullanıcı için yeni bir sürüm yayınlar. Blokzincirler farklı çalışır çünkü merkezi bir mülkiyet yoktur. [Ethereum istemcileri](/developers/docs/nodes-and-clients/), yeni çatallanma kurallarını uygulamak için yazılımlarını güncellemelidir. Ayrıca blok oluşturucular (İş Kanıtı (PoW) dünyasında madenciler, Hisse Kanıtı (PoS) dünyasında doğrulayıcılar) ve düğümler, yeni kurallara göre bloklar oluşturmalı ve doğrulamalıdır. [Mutabakat mekanizmaları hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/)

Bu kural değişiklikleri ağda geçici bir bölünme yaratabilir. Yeni bloklar yeni kurallara veya eski kurallara göre üretilebilir. Çatallanmalar genellikle önceden kararlaştırılır, böylece istemciler değişiklikleri uyum içinde benimser ve güncellemeleri içeren çatallanma ana zincir haline gelir. Ancak nadir durumlarda, çatallanmalar üzerindeki anlaşmazlıklar ağın kalıcı olarak bölünmesine neden olabilir; bunun en dikkate değer örneği <a href="#dao-fork">DAO çatallanması</a> ile Ethereum Classic'in yaratılmasıdır.

</ExpandableCard>

<ExpandableCard title="Neden bazı güncellemelerin birden fazla adı var?" contentPreview="Güncelleme adları bir kalıbı izler">

Ethereum'un temelini oluşturan yazılım, [yürütme katmanı](/glossary/#execution-layer) ve [mutabakat katmanı](/glossary/#consensus-layer) olarak bilinen iki yarıdan oluşur.

**Yürütme güncellemesi isimlendirmesi**

2021'den bu yana, **yürütme katmanı** güncellemeleri kronolojik sırayla [önceki Devcon ve Devconnect konumlarının](https://devcon.org/en/past-events/) şehir isimlerine göre adlandırılmaktadır:

| Güncelleme Adı | Devcon(nect) Yılı | Devcon Numarası | Güncelleme Tarihi |
| -------------- | ----------------- | --------------- | ----------------- |
| Berlin         | 2014              | 0               | 15 Nis 2021       |
| Londra         | 2015              | I               | 5 Ağu 2021        |
| Şanghay        | 2016              | II              | 12 Nis 2023       |
| Kankun         | 2017              | III             | 13 Mar 2024       |
| Prag           | 2018              | IV              | 7 May 2025        |
| Osaka          | 2019              | V               | 3 Ara 2025        |
| **Amsterdam**  | 2022              | Devconnect      | Belirlenecek - Sonraki |
| _Bogotá_       | 2022              | VI              | Belirlenecek      |
| _İstanbul_     | 2023              | Devconnect      | Belirlenecek      |
| _Bangkok_      | 2024              | VII             | Belirlenecek      |
| _Buenos Aires_ | 2025              | Devconnect      | Belirlenecek      |
| _Mumbai_       | 2026              | VIII            | Belirlenecek      |

**Mutabakat güncellemesi isimlendirmesi**

[İşaret zincirinin](/glossary/#beacon-chain) başlatılmasından bu yana, **mutabakat katmanı** güncellemeleri alfabetik sırayla ilerleyen harflerle başlayan göksel yıldızların adını almaktadır:

| Güncelleme Adı                                            | Güncelleme Tarihi |
| --------------------------------------------------------- | ----------------- |
| İşaret zinciri başlangıcı                                 | 1 Ara 2020        |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 Eki 2021       |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 Eyl 2022        |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 Nis 2023       |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 Mar 2024       |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 May 2025        |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 Ara 2025        |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Belirlenecek - Sonraki |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Belirlenecek      |

**Birleşik isimlendirme**

Yürütme ve mutabakat güncellemeleri başlangıçta farklı zamanlarda kullanıma sunuldu, ancak 2022'deki [Birleşme](/roadmap/merge/)'den sonra bunlar eşzamanlı olarak dağıtılmaya başlandı. Bu nedenle, bu güncellemelere atıfta bulunmayı basitleştirmek için tek bir birleşik terim kullanan günlük terimler ortaya çıkmıştır. Bu, yaygın olarak "**Şapella**" olarak adlandırılan _Şanghay-Capella_ güncellemesiyle başladı ve sonraki güncellemelerle devam etmektedir.

| Yürütme Güncellemesi | Mutabakat Güncellemesi | Kısa Ad       |
| -------------------- | ---------------------- | ------------- |
| Şanghay              | Capella                | "Şapella"     |
| Kankun               | Deneb                  | "Dencun"      |
| Prag                 | Electra                | "Pectra"      |
| Osaka                | Fulu                   | "Fusaka"      |
| Amsterdam            | Gloas                  | "Glamsterdam" |
| Bogotá               | Heze                   | "Hegotá"      |

</ExpandableCard>

Özellikle önemli olan bazı geçmiş güncellemeler hakkındaki bilgilere doğrudan atlayın: [İşaret zinciri](/roadmap/beacon-chain/); [Birleşme](/roadmap/merge/); ve [EIP-1559](#london)

Gelecekteki protokol güncellemelerini mi arıyorsunuz? [Ethereum yol haritasındaki yaklaşan güncellemeler hakkında bilgi edinin](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Fusaka hakkında daha fazla bilgi](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Prague-Electra ("Pectra") güncellemesi, tüm kullanıcılar, katman 2 ağları, staker'lar ve düğüm operatörleri için deneyimi geliştirmeyi amaçlayan Ethereum protokolüne yönelik çeşitli iyileştirmeler içeriyordu.

Staking, bileşik doğrulayıcı hesapları ve yürütme çekim adresi kullanılarak stake edilen fonlar üzerinde iyileştirilmiş kontrol ile bir güncelleme aldı. EIP-7251, tek bir doğrulayıcı için maksimum etkin bakiyeyi 2048'e çıkararak staker'lar için sermaye verimliliğini artırdı. EIP-7002, bir yürütme hesabının çıkış yapma veya fonların bir kısmını çekme dahil olmak üzere doğrulayıcı eylemlerini güvenli bir şekilde tetiklemesini sağlayarak ETH staker'ları için deneyimi iyileştirirken, düğüm operatörleri için hesap verebilirliği güçlendirmeye yardımcı oldu.

Güncellemenin diğer kısımları normal kullanıcılar için deneyimi iyileştirmeye odaklandı. EIP-7702, normal bir akıllı sözleşme olmayan hesabın ([EOA](/glossary/#eoa)) bir akıllı sözleşmeye benzer şekilde kod yürütme yeteneğini getirdi. Bu, geleneksel Ethereum hesapları için işlem toplu işleme, gaz sponsorluğu, alternatif kimlik doğrulama, programlanabilir harcama kontrolleri, hesap kurtarma mekanizmaları ve daha fazlası gibi sınırsız yeni işlevlerin kilidini açtı.

<ExpandableCard title="Pectra EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

Daha iyi kullanıcı deneyimi:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA hesap kodunu ayarla</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Blob işlem kapasitesi artışı</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Çağrı verisi maliyetini artır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL yapılandırma dosyalarına blob programı ekle</em></li>
</ul>

Daha iyi staking deneyimi:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> değerini artır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Yürütme katmanı tarafından tetiklenebilir çıkışlar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Genel amaçlı yürütme katmanı istekleri</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Doğrulayıcı depozitolarını zincir içi sağla</em></li>
</ul>

Protokol verimliliği ve güvenlik iyileştirmeleri:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 eğri operasyonları için ön derleme</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Geçmiş blok hash'lerini duruma kaydet</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Komite endeksini Onay dışına taşı</em></li>
</ul>

</ExpandableCard>

- [Pectra staking deneyimini nasıl geliştirecek](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Electra güncellemesi spesifikasyonlarını okuyun](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Prague-Electra ("Pectra") SSS](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Kankun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Kankun özeti {#cancun-summary}

Kankun güncellemesi, Deneb mutabakat güncellemeleriyle birlikte Ethereum'un ölçeklenebilirliğini artırmayı amaçlayan _yürütme_ iyileştirmelerini içerir.

Özellikle bu, katman 2 toplamaları için veri depolama maliyetini önemli ölçüde azaltan ve **Proto-Danksharding** olarak bilinen EIP-4844'ü içerir. Bu, toplamaların kısa bir süreliğine Ana Ağ'a veri göndermesini sağlayan veri "blob'larının" tanıtılmasıyla elde edilir. Bu, katman 2 toplamalarının kullanıcıları için önemli ölçüde daha düşük işlem ücretleri ile sonuçlanır.

<ExpandableCard title="Kankun EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Geçici depolama işlem kodları</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM'de işaret bloğu kökü</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Parça blob işlemleri (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Bellek kopyalama talimatı</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em>Yalnızca aynı işlemde <code>SELFDESTRUCT</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> işlem kodu</em></li>
</ul>

</ExpandableCard>

- [Katman 2 toplamaları](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Kankun güncellemesi spesifikasyonunu okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb özeti {#deneb-summary}

Deneb güncellemesi, Ethereum'un ölçeklenebilirliğini artırmayı amaçlayan _mutabakat_ iyileştirmelerini içerir. Bu güncelleme, İşaret Zinciri'ndeki diğer iyileştirmelerin yanı sıra Proto-Danksharding'i (EIP-4844) etkinleştirmek için Kankun yürütme güncellemeleriyle birlikte gelir.

Önceden oluşturulmuş imzalı "gönüllü çıkış mesajları" artık geçerliliğini yitirmiyor, böylece fonlarını üçüncü taraf bir düğüm operatörüyle stake eden kullanıcılara daha fazla kontrol sağlıyor. Bu imzalı çıkış mesajıyla stake edenler, kimseden izin istemeye gerek duymadan istedikleri zaman güvenli bir şekilde çıkış yapma ve fonlarını çekme yeteneğini korurken düğüm operasyonunu devredebilirler.

EIP-7514, doğrulayıcıların ağa katılabileceği "dalgalanma" oranını dönem başına sekiz (8) ile sınırlandırarak ETH ihracında bir sıkılaştırma getiriyor. ETH ihracı, stake edilen toplam ETH ile orantılı olduğundan, katılan doğrulayıcı sayısını sınırlamak yeni ihraç edilen ETH'nin _büyüme oranını_ sınırlar ve aynı zamanda düğüm operatörleri için donanım gereksinimlerini azaltarak merkeziyetsizliğe yardımcı olur.

<ExpandableCard title="Deneb EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM'de işaret bloğu kökü</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Parça blob işlemleri</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Sürekli geçerli imzalı gönüllü çıkışlar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Maksimum onay dahil etme slotunu artırma</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Maksimum dönem dalgalanma limiti ekleme</em></li>
</ul>

</ExpandableCard>

- [Deneb güncellemesi spesifikasyonlarını okuyun](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Kankun-Deneb ("Dencun") SSS](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Şanghay-Capella ("Şapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Şanghay özeti {#shanghai-summary}

Şanghay güncellemesi, staking çekim işlemlerini yürütme katmanına getirdi. Capella güncellemesi ile birlikte bu, blokların çekim işlemlerini kabul etmesini sağladı ve staker'ların ETH'lerini İşaret Zincirinden yürütme katmanına çekmelerine olanak tanıdı.

<ExpandableCard title="Şanghay EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> adresini sıcak başlatır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Yeni <code>PUSH0</code> talimatı</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Başlangıç kodunu (initcode) sınırla ve ölç</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>İşaret zincirinin çekim işlemlerini operasyon olarak itmesi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> işlevini kullanımdan kaldır</em></li>
</ul>

</ExpandableCard>

- [Şanghay güncelleme spesifikasyonunu okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella özeti {#capella-summary}

Capella güncellemesi, mutabakat katmanına (İşaret Zinciri) yapılan üçüncü büyük güncellemeydi ve staking çekim işlemlerini etkinleştirdi. Capella, yürütme katmanı güncellemesi olan Şanghay ile eşzamanlı olarak gerçekleşti ve staking çekim işlevselliğini etkinleştirdi.

Bu mutabakat katmanı güncellemesi, ilk depozitolarıyla birlikte çekim kimlik bilgilerini sağlamayan staker'lara bu bilgileri sağlama yeteneği getirdi ve böylece çekim işlemlerini etkinleştirdi.

Güncelleme ayrıca, mevcut ödül ödemeleri veya tam çekim işlemleri için Doğrulayıcı hesaplarını sürekli olarak işleyen otomatik hesap süpürme işlevselliği de sağladı.

- [Staking çekim işlemleri hakkında daha fazla bilgi](/staking/withdrawals/).
- [Capella güncelleme spesifikasyonlarını okuyun](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Birleşme) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Özet {#paris-summary}

Paris güncellemesi, İş Kanıtı (PoW) blokzincirinin 58750000000000000000000 değerindeki [terminal toplam zorluk](/glossary/#terminal-total-difficulty) seviyesini geçmesiyle tetiklendi. Bu durum 15 Eylül 2022'de 15537393 numaralı blokta gerçekleşti ve bir sonraki blokta Paris güncellemesini tetikledi. Paris, [Birleşme](/roadmap/merge/) geçişiydi; en önemli özelliği [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow) madencilik algoritmasını ve ilgili mutabakat mantığını kapatıp yerine [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) sistemini devreye almasıydı. Paris'in kendisi, [yürütme istemcilerine](/developers/docs/nodes-and-clients/#execution-clients) yönelik (mutabakat katmanındaki Bellatrix'e eşdeğer) bir güncellemeydi ve bağlı oldukları [mutabakat istemcilerinden](/developers/docs/nodes-and-clients/#consensus-clients) talimat almalarını sağladı. Bu, topluca [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen yeni bir dizi dahili API yönteminin etkinleştirilmesini gerektirdi. Bu, tartışmasız [Homestead](#homestead)'ten bu yana Ethereum tarihindeki en önemli güncellemeydi!

- [Paris güncellemesi spesifikasyonunu okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Mutabakatı Hisse Kanıtı (PoS) olarak günceller</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY işlem kodunun yerini PREVRANDAO alır</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Özet {#bellatrix-summary}

Bellatrix güncellemesi, [İşaret zinciri](/roadmap/beacon-chain) için planlanan ikinci güncellemeydi ve zinciri [Birleşme](/roadmap/merge/)'ye hazırladı. Hareketsizlik ve kesinti gerektiren ihlaller için doğrulayıcı cezalarını tam değerlerine getirir. Bellatrix ayrıca zinciri Birleşme'ye ve son İş Kanıtı (PoW) bloğundan ilk Hisse Kanıtı (PoS) bloğuna geçişe hazırlamak için çatallanma seçimi kurallarında bir güncelleme içerir. Bu, mutabakat istemcilerinin 58750000000000000000000 değerindeki [terminal toplam zorluk](/glossary/#terminal-total-difficulty) seviyesinden haberdar olmasını sağlamayı da içerir.

- [Bellatrix güncellemesi spesifikasyonunu okuyun](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Özet {#gray-glacier-summary}

Gray Glacier ağ güncellemesi, [zorluk bombasını](/glossary/#difficulty-bomb) üç ay erteledi. Bu, bu güncellemede sunulan tek değişikliktir ve doğası gereği [Arrow Glacier](#arrow-glacier) ile [Muir Glacier](#muir-glacier) güncellemelerine benzer. Benzer değişiklikler [Bizans](#byzantium), [Konstantinopolis](#constantinople) ve [Londra](#london) ağ güncellemelerinde de gerçekleştirilmiştir.

- [EF Blog - Gray Glacier Güncellemesi Duyurusu](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="Gray Glacier EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>zorluk bombasını Eylül 2022'ye kadar erteler</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Özet {#arrow-glacier-summary}

Arrow Glacier ağ güncellemesi, [zorluk bombasını](/glossary/#difficulty-bomb) birkaç ay erteledi. Bu, bu güncellemede sunulan tek değişikliktir ve doğası gereği [Muir Glacier](#muir-glacier) güncellemesine benzer. Benzer değişiklikler [Bizans](#byzantium), [Konstantinopolis](#constantinople) ve [London](#london) ağ güncellemelerinde de gerçekleştirilmiştir.

- [EF Blog - Arrow Glacier Güncellemesi Duyurusu](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Güncellemesi](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>zorluk bombasını Haziran 2022'ye kadar erteler</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Özet {#altair-summary}

Altair güncellemesi, [İşaret zinciri](/roadmap/beacon-chain) için planlanan ilk güncellemeydi. Hafif istemcilere olanak tanıyan "eşzamanlama komiteleri" desteğini ekledi ve geliştirme süreci Birleşme'ye doğru ilerlerken doğrulayıcı hareketsizliği ve kesinti cezalarını artırdı.

- [Altair güncelleme spesifikasyonunu okuyun](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> İlginç bilgi! {#altair-fun-fact}

Altair, kesin bir yayınlanma zamanına sahip olan ilk büyük ağ güncellemesiydi. Daha önceki her güncelleme, blok sürelerinin değişkenlik gösterdiği İş Kanıtı (PoW) zincirinde beyan edilen bir blok numarasına dayanıyordu. İşaret zinciri, İş Kanıtı (PoW) çözmeyi gerektirmez ve bunun yerine doğrulayıcıların blok önerebileceği 32 adet on iki saniyelik zaman "slot"undan oluşan zamana dayalı bir dönem sisteminde çalışır. Bu nedenle 74.240. döneme tam olarak ne zaman ulaşacağımızı biliyorduk ve Altair yayına girdi!

- [Blok süresi](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Özet {#london-summary}

London güncellemesi, işlem ücreti piyasasında reform yapan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)'u, gaz iadelerinin nasıl ele alındığına dair değişiklikleri ve [Buz Devri](/glossary/#ice-age) programını tanıttı.

#### London Güncellemesi / EIP-1559 neydi? {#eip-1559}

London Güncellemesinden önce Ethereum sabit boyutlu bloklara sahipti. Yüksek ağ talebi olduğu zamanlarda bu bloklar tam kapasiteyle çalışıyordu. Sonuç olarak, kullanıcılar genellikle bir bloğa dahil olmak için talebin azalmasını beklemek zorunda kalıyordu ve bu da kötü bir kullanıcı deneyimine yol açıyordu. London Güncellemesi, Ethereum'a değişken boyutlu blokları getirdi.

Ethereum ağındaki işlem ücretlerinin hesaplanma şekli, Ağustos 2021'deki [London Güncellemesi](/ethereum-forks/#london) ile değişti. London güncellemesinden önce ücretler, `base` ve `priority` ücretleri ayrılmadan şu şekilde hesaplanıyordu:

Diyelim ki Alice'in Bob'a 1 ETH ödemesi gerekiyor. İşlemde gaz limiti 21.000 birim ve gas fiyatı 200 Gwei'dir.

Toplam ücret şu şekilde olurdu: `Gas units (limit) * Gas price per unit` yani `21,000 * 200 = 4,200,000 gwei` veya 0,0042 ETH

London Güncellemesinde [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)'un uygulanması, işlem ücreti mekanizmasını daha karmaşık hale getirdi, ancak gaz ücretlerini daha öngörülebilir kılarak daha verimli bir işlem ücreti piyasasıyla sonuçlandı. Kullanıcılar, gaz için piyasa fiyatından (`baseFeePerGas`) daha fazlasını ödemeyeceklerini bilerek, işlemin yürütülmesi için ne kadar ödemeye istekli olduklarına karşılık gelen bir `maxFeePerGas` ile işlemlerini gönderebilir ve öncelik ücretleri düşüldükten sonra kalan fazlalığı iade alabilirler.

Bu video EIP-1559'u ve getirdiği faydaları açıklamaktadır: [EIP-1559 Açıklaması](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Bir merkeziyetsiz uygulama (dapp) geliştiricisi misiniz? Kütüphanelerinizi ve araçlarınızı güncellediğinizden emin olun.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herders'ın açıklamasını okuyun](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Londra EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>işlem ücreti piyasasını iyileştirir</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>bir bloktan <code>BASEFEE</code> değerini döndürür</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM işlemleri için gaz iadelerini azaltır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> ile başlayan sözleşmelerin dağıtılmasını engeller</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>Buz Devri'ni Aralık 2021'e kadar erteler</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Özet {#berlin-summary}

Berlin güncellemesi, belirli EVM eylemleri için gaz maliyetini optimize etti ve birden fazla işlem türü için desteği artırdı.

- [Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herders'ın açıklamasını okuyun](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIP'leri" contentPreview="Bu güncellemeye dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp gaz maliyetini düşürür</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>birden fazla işlem türü için daha kolay destek sağlar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>durum erişimi işlem kodları için gaz maliyeti artışları</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>isteğe bağlı erişim listeleri ekler</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### İşaret zinciri başlangıcı {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Özet {#beacon-chain-genesis-summary}

[İşaret zinciri](/roadmap/beacon-chain/)'nin güvenli bir şekilde başlatılabilmesi için 32 stake edilmiş ETH'lik 16384 depozitoya ihtiyacı vardı. Bu 27 Kasım'da gerçekleşti ve İşaret zinciri 1 Aralık 2020'de blok üretmeye başladı.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  İşaret zinciri
</DocLink>

---

### Staking depozitosu sözleşmesi dağıtıldı {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Özet {#deposit-contract-summary}

Staking depozitosu sözleşmesi, Ethereum ekosistemine [staking](/glossary/#staking) kavramını tanıttı. Bir [Ana Ağ](/glossary/#mainnet) sözleşmesi olmasına rağmen, önemli bir [Ethereum güncellemesi](/roadmap/) olan [İşaret zinciri](/roadmap/beacon-chain/)'nin başlatılma zaman çizelgesi üzerinde doğrudan bir etkiye sahipti.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Özet {#muir-glacier-summary}

Muir Glacier çatallanması, [zorluk bombası](/glossary/#difficulty-bomb) için bir gecikme getirdi. [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizmasının blok zorluğundaki artışlar, işlem gönderme ve merkeziyetsiz uygulamaları (dapp'leri) kullanma bekleme sürelerini artırarak Ethereum'un kullanılabilirliğini düşürme tehdidi oluşturuyordu.

- [Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herders'ın açıklamasını okuyun](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>zorluk bombasını 4.000.000 blok veya ~611 gün daha geciktirir.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### İstanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Özet {#istanbul-summary}

İstanbul çatallanması:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) içindeki belirli eylemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Hizmet reddi (denial-of-service) saldırılarına karşı dayanıklılığı artırdı.
- SNARK'lar ve STARK'lara dayalı [Katman 2 ölçeklendirme](/developers/docs/scaling/#layer-2-scaling) çözümlerini daha performanslı hale getirdi.
- Ethereum ve Zcash'in birlikte çalışabilmesini sağladı.
- Sözleşmelerin daha yaratıcı işlevler sunmasına olanak tanıdı.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="İstanbul EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>Ethereum'un Zcash gibi gizliliği koruyan para birimleriyle çalışmasına olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[gaz](/glossary/#gas) maliyetlerini iyileştirmek için daha ucuz kriptografi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [işlem kodunu](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ekleyerek Ethereum'u tekrarlama (replay) saldırılarına karşı korur.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>tüketime dayalı olarak işlem kodu gaz fiyatlarını optimize eder.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>bloklarda daha fazla veriye izin vermek için çağrı verisi (CallData) maliyetini düşürür; [Katman 2 ölçeklendirme](/developers/docs/scaling/#layer-2-scaling) için iyidir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>diğer işlem kodu gaz fiyatı değişiklikleri.</em></li>
</ul>

</ExpandableCard>

---

### Konstantinopolis {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Özet {#constantinople-summary}

Konstantinopolis çatallanması:

- Blok [madencilik](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 3 ETH'den 2 ETH'ye düşürdü.
- [Hisse Kanıtı (PoS) uygulanmadan](#beacon-chain-genesis) önce blokzincirin donmamasını sağladı.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) içindeki belirli eylemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Henüz oluşturulmamış adreslerle etkileşim kurma yeteneği ekledi.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="Konstantinopolis EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>belirli zincir içi eylemlerin maliyetini optimize eder.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>henüz oluşturulmamış adreslerle etkileşim kurmanıza olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>başka bir sözleşmenin kodunun hash'ini almak için <code>EXTCODEHASH</code> talimatını sunar.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>Hisse Kanıtı'ndan (PoS) önce blokzincirin donmamasını sağlar ve blok ödülünü 3 ETH'den 2 ETH'ye düşürür.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizans {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Özet {#byzantium-summary}

Bizans çatalı:

- Blok [madencilik](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 5 ETH'den 3 ETH'ye düşürdü.
- [Zorluk bombasını](/glossary/#difficulty-bomb) bir yıl erteledi.
- Diğer sözleşmelere durumu değiştirmeyen çağrılar yapma yeteneği eklendi.
- [Katman 2 ölçeklendirmesine](/developers/docs/scaling/#layer-2-scaling) olanak tanımak için belirli kriptografi yöntemleri eklendi.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="Bizans EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> işlem kodunu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>başarı veya başarısızlığı belirtmek için işlem makbuzlarına durum alanı eklendi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snark'lara](/developers/docs/scaling/zk-rollups/) olanak tanımak için eliptik eğri ve skaler çarpım ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snark'lara](/developers/docs/scaling/zk-rollups/) olanak tanımak için eliptik eğri ve skaler çarpım ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA imza doğrulamasını etkinleştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>değişken uzunluklu dönüş değerleri için destek ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>diğer sözleşmelere durumu değiştirmeyen çağrılar yapılmasına olanak tanıyan <code>STATICCALL</code> işlem kodunu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>zorluk ayarlama formülünü değiştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[zorluk bombasını](/glossary/#difficulty-bomb) 1 yıl erteler ve blok ödülünü 5 ETH'den 3 ETH'ye düşürür.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Özet {#spurious-dragon-summary}

Spurious Dragon çatallanması, ağa yönelik hizmet aksatma (DoS) saldırılarına (Eylül/Ekim 2016) verilen ikinci yanıttı ve şunları içeriyordu:

- ağa yönelik gelecekteki saldırıları önlemek için işlem kodu fiyatlandırmasını ayarlamak.
- Blokzincir durumunun "şişkinliğini azaltmayı" (debloat) sağlamak.
- tekrarlama saldırısı (replay attack) koruması eklemek.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="Spurious Dragon EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>bir Ethereum zincirindeki işlemlerin alternatif bir zincirde yeniden yayınlanmasını önler, örneğin bir test ağı işleminin ana Ethereum zincirinde tekrarlanması gibi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> işlem kodunun fiyatlarını ayarlar – hesaplama açısından pahalı sözleşme işlemleri yoluyla ağı yavaşlatmayı zorlaştırır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS saldırıları yoluyla eklenen boş hesapların kaldırılmasına olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>Blokzincir üzerindeki bir sözleşmenin sahip olabileceği maksimum kod boyutunu 24576 bayt olarak değiştirir.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Özet {#tangerine-whistle-summary}

Tangerine whistle çatallanması, ağa yönelik hizmet aksatma (DoS) saldırılarına (Eylül/Ekim 2016) verilen ilk yanıttı ve şunları içeriyordu:

- düşük fiyatlandırılmış işlem kodlarıyla ilgili acil ağ sağlığı sorunlarını ele almak.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="Tangerine Whistle EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>spam saldırılarında kullanılabilecek işlem kodlarının Gaz maliyetlerini artırır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>Ethereum protokolünün önceki sürümlerindeki kusurlar nedeniyle çok düşük maliyetle duruma eklenen çok sayıda boş hesabı kaldırarak durum boyutunu küçültür.</em></li>
</ul>

</ExpandableCard>

---

### DAO çatallanması {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Özet {#dao-fork-summary}

DAO çatallanması, güvensiz bir [DAO](/glossary/#dao) sözleşmesinin bir bilgisayar korsanlığıyla 3,6 milyondan fazla ETH'sinin boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/learn/understanding-the-dao-attack/) bir yanıttı. Çatallanma, fonları hatalı sözleşmeden tek bir işlevi olan [yeni bir sözleşmeye](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) taşıdı: çekim. Fon kaybeden herkes, cüzdanlarındaki her 100 DAO tokeni için 1 ETH çekebiliyordu.

Bu hareket tarzı Ethereum topluluğu tarafından oylandı. Herhangi bir ETH sahibi, [bir oylama platformu](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) üzerindeki bir işlem aracılığıyla oy kullanabiliyordu. Çatallanma kararı oyların %85'inden fazlasına ulaştı.

Bazı madenciler, DAO olayının protokolde bir kusur olmaması nedeniyle çatallanmayı reddetti. Onlar yollarına devam ederek [Ethereum Classic](https://ethereumclassic.org/)'i oluşturdular.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Özet {#homestead-summary}

Geleceğe bakan Homestead çatallanması. Ethereum'a daha fazla ağ yükseltmesi yapma yeteneği veren çeşitli protokol değişiklikleri ve bir ağ oluşturma değişikliği içeriyordu.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="Homestead EIP'leri" contentPreview="Bu çatallanmaya dahil edilen resmi iyileştirmeler.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>sözleşme oluşturma sürecinde düzenlemeler yapar.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>yeni işlem kodu ekler: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p ileriye dönük uyumluluk gereksinimlerini sunar</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier çözülmesi {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Özet {#frontier-thawing-summary}

Frontier çözülme çatallanması, [blok](/glossary/#block) başına 5.000 [gaz](/glossary/#gas) limitini kaldırdı ve varsayılan gas fiyatını 51 [Gwei](/glossary/#gwei) olarak belirledi. Bu, işlemlere olanak tanıdı – işlemler 21.000 gaz gerektirir. Gelecekte [Hisse Kanıtı (PoS)](/glossary/#pos) sistemine geçiş için bir sert çatallanmayı garanti altına almak amacıyla [zorluk bombası](/glossary/#difficulty-bomb) tanıtıldı.

- [Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Ethereum Protokolü Güncelleme 1'i okuyun](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Özet {#frontier-summary}

Frontier, Ethereum projesinin canlı ancak temel bir uygulamasıydı. Başarılı Olympic test aşamasını takip etti. Teknik kullanıcılar, özellikle de geliştiriciler için tasarlanmıştı. [Bloklar](/glossary/#block) 5.000'lik bir [gaz](/glossary/#gas) limitine sahipti. Bu 'çözülme' dönemi, madencilerin operasyonlarına başlamasına ve erken benimseyenlerin 'acele etmeden' istemcilerini kurmalarına olanak tanıdı.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Ether satışı {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether resmi olarak 42 günlüğüne satışa çıktı. BTC ile satın alınabiliyordu.

[Ethereum Vakfı duyurusunu okuyun](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Sarı Bülten yayınlandı {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Dr. Gavin Wood tarafından kaleme alınan Sarı Bülten, Ethereum protokolünün teknik bir tanımıdır.

[Sarı Bülten'i görüntüleyin](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Tanıtım belgesi yayınlandı {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Ethereum'un kurucusu Vitalik Buterin tarafından projenin 2015'teki lansmanından önce, 2013 yılında yayınlanan tanıtım belgesi.

<DocLink href="/whitepaper/">
  Tanıtım belgesi
</DocLink>
