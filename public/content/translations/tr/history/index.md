---
title: Ethereum'un Tarihi ve Çatalları
description: Önemli kilometre taşları, sürümler ve çatallar dahil olmak üzere Ethereum blok zincirinin geçmişi.
lang: tr
sidebarDepth: 1
---

# Ethereum'un tarihi {#the-history-of-ethereum}

Ethereum blok zincirindeki tüm önemli dönüm noktalarının, çatalların ve güncellemelerin bir zaman çizelgesi.

<ExpandableCard title="Çatallama nedir?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Çatallanmalar, ağda önemli teknik yükseltmeler veya değişiklikler yapılması gerektiğinde ortaya çıkar: Bunlar, genellikle <a href="/eips/">[Ethereum İyileştirme Önerileri (EIP'ler)]</a>'den kaynaklanır ve protokolün "kurallarını" değiştirir.

Geleneksel, merkezden kontrol edilen yazılımlarda yükseltmelere ihtiyaç duyulduğunda, şirket son kullanıcı için sadece yeni bir versiyon yayınlar. Blok zincirleri farklı çalışır çünkü merkezi bir sahiplik yoktur. <a href="/developers/docs/nodes-and-clients/">Ethereum istemcileri</a> yeni çatal kurallarını uygulamak için yazılımlarını güncellemelidir. Ayrıca blok yaratıcıları (iş ispatı dünyasındaki madenciler, hisse ispatı dünyasındaki doğrulayıcılar) ve düğümler, bloklar oluşturmalı ve yeni kurallara göre doğrulama yapmalıdır. <a href="/developers/docs/consensus-mechanisms/">Mutabakat mekanizmaları hakkında daha fazla bilgi</a>

Bu kural değişiklikleri, ağda geçici bir bölünme oluşturabilir. Yeni bloklar yeni ya da eski kurallara göre yaratılabilir. Çatallar genellikle önceden kararlaştırılır, böylece müşteriler değişiklikleri uyum içinde benimser ve yükseltmelerle birlikte çatal ana zincir hâline gelir. Fakat nadir durumlarda çatallanmalar üzerindeki anlaşmazlıklar, ağın geçici olarak ayrılmasına neden olabilir: En bilineni, <a href="#dao-fork">DAO çatallanması</a> ile Ethereum Classic'in yaratılmasıdır.

</ExpandableCard>

Geçmişteki bazı özel önem taşıyan yükseltmeler hakkındaki bilgilere doğrudan geçebilirsiniz: [İşaret Zinciri](/roadmap/beacon-chain/); [Birleşim](/roadmap/merge/) ve [ EIP-1559](#london)

Gelecekteki protokol yükseltmelerini mi arıyorsunuz? [Ethereum yol haritasında yakında yapılacak yükseltmeler hakkında bilgi edinin](/roadmap/).

<Divider />

## 2023 {#2023}

### Şanghay-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Şanghay özeti {#shanghai-summary}

Şanghay yükseltmesi, hisselemede çekimlerini yürütüm katmanına getirdi. Bu, Capella yükseltmesiyle birlikte blokların çekim işlemlerini kabul etmesi sağladı; bu da, paydaşların ETH'lerini İşaret Zincirinden yürütüm katmanına çekmelerine olanak tanıyor.

<ExpandableCard title="Şanghay EIP'leri" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> adres ısıtmasını başlatır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Yeni <code>PUSH0</code> talimatıdır</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Sınır ve sayaç başlangıç kodudur</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>İşlem olarak işaret zinciri iletim çekimleridir</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> kodunu kullanımdan kaldırır</em></li>
</ul>

</ExpandableCard>

- [Şanghay güncellemesinin spesifikasyonunu okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella özeti {#capella-summary}

Capella yükseltmesi, fikir birliği katmanındaki (İşaret Zinciri) en büyük 3. büyük yükseltmeydi ve hisseleme çekimlerini mümkün kıldı. Capella, Şanghay yürütüm katmanı yükseltmesi ile eş zamanlı gerçekleşti ve hisseleme çekim işlevselliğini aktif hale getirdi.

Bu fikir birliği katmanı yükseltmesi, ilk yatırma işlemleriyle birlikte daha önce çekim yapmak için kimlik bilgilerini kaydetmemiş paydaşlara bunu yapma imkanı sağladı ve böylece çekim yapabilmelerini mümkün kıldı.

Yükseltme ayrıca, mevcut tüm ödül ödemeleri veya tam çekimler için doğrulayıcı hesaplarını sürekli işleyen otomatik hesap süpürme işlevselliğini getirdi.

- [Hisseleme çekimleri hakkında daha fazla bilgi](/staking/withdrawals/).
- [Capella güncellemesinin spesifikasyonunu okuyun](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Birleşim) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Özet {#paris-summary}

Paris yükseltmesi, iş ispatı blokzinciri tarafından 58750000000000000000000 [son toplam zorluk](/glossary/#terminal-total-difficulty) aşıldığında tetiklendi. Bu, 15 Eylül 2022'de bir sonraki blokta Paris yükseltmesini tetikleyen blok 15537393'te oldu. Paris, ana özelliği [iş ispatı](/developers/docs/consensus-mechanisms/pow) madencilik algoritması ve ilişkili mutabakat mantığını kapatıp onun yerine [hisse ispatını](/developers/docs/consensus-mechanisms/pos) açmak olan [Birleşim](/roadmap/merge/) geçişiydi. Paris, (fikir birliği katmanında bulunan Bellatrix'e eşdeğer) [yürütme istemcilerine](/developers/docs/nodes-and-clients/#execution-clients) yönelik ve bu istemcilerin bağlı [mutabakat istemcilerinden](/developers/docs/nodes-and-clients/#consensus-clients) talimat almasına olanak tanıyan bir yükseltmeydi. Bu, topluca [Motor API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) olarak bilinen, yeni bir dahili API yöntem setinin etkinleştirilmesini gerektirdi. Bu, Ethereum tarihinde [Homestead](#homestead)'den bu yana muhtemelen en önemli yükseltmeydi!

- [Paris güncellemesinin spesifikasyonunu okuyun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIP'leri" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> - <em>Mutabakatı Hisse İspatına yükseltin</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY işlem kodunu PREVRANDAO ile değiştirin</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Özet {#bellatrix-summary}

Bellatrix yükseltmesi, [İşaret Zinciri](/roadmap/beacon-chain) için ve zinciri [Birleşim](/roadmap/merge/)'e hazırlayan ikinci planlı yükseltmeydi. Eylemsizlik ve kesinti yapılabilir saldırıların tam değerlerine yönelik doğrulayıcı cezaları getiriyor. Bellatrix ayrıca, çatallanma seçim kurallarına yönelik, zinciri Birleşim'e ve son iş ispatı bloğundan ilk hisse ispatı bloğuna geçişe hazırlamayı amaçlayan bir yükseltme içeriyor. Fikir birliği istemcilerinin 58750000000000000000000 olan [son toplam zorluk](/glossary/#terminal-total-difficulty) değerinin farkında olmaları da kapsamında yer alıyor.

- [Bellatrix güncellemesinin spesifikasyonunu okuyun](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Özet {#gray-glacier-summary}

Gray Glacier ağ yükseltmesi, [bomba değerini](/glossary/#difficulty-bomb) üç ay geriye itti. Bu yükseltmede sunulan tek değişiklik budur ve yapısı, [Arrow Glacier](#arrow-glacier) ile [Muir Glacier](#muir-glacier) yükseltmelerine benzer. [Bizans](#byzantium), [Konstantinopolis](#constantinople) ve [Londra](#london) ağ yükseltmelerinde de benzer değişiklikler yapıldı.

- [EF Blogu - Gray Glacier Yükseltme Duyurusu](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIP'leri" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>bomba değerini Eylül 2022'ye kadar erteliyor</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Özet {#arrow-glacier-summary}

Arrow Glacier ağ yükseltmesi [bomba değerini](/glossary/#difficulty-bomb) bir kaç ay geriye itti. Bu yükseltmede sunulan tek değişiklik budur ve yapısı, [Muir Glacier](#muir-glacier) yükseltmesine benzer. [Bizans](#byzantium), [Konstantinopolis](#constantinople) ve [Londra](#london) ağ yükseltmelerinde de benzer değişiklikler yapıldı.

- [EF Blogu - Arrow Glacier Yükseltme Duyurusu](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Yükseltmesi](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIP'leri" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>bomba değerini Haziran 2022'ye kadar erteliyor</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Özet {#altair-summary}

Altair yükseltmesi, [İşaret Zinciri](/roadmap/beacon-chain) için planlanmış ilk yükseltmedir. ''Senkronizasyon komiteleri'' için destek ekleyerek Birleşim'e doğru ilerlerken hafif istemcileri, daha yüksek doğrulayıcı durgunluğunu ve kesme cezalarını mümkün kıldı.

- [Altair güncelleme spesifikasyonunu okuyun](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />İlginç bir bilgi! {#altair-fun-fact}

Altair, kesin bir kullanıma sunma süresi olan ilk büyük ağ yükseltmesiydi. Önceden her yükseltme, blok sürelerinin değiştiği iş ispatı zincirinde beyan edilen bir blok numarasına dayanıyordu. İşaret Zinciri, iş ispatı için çözüm gerektirmez ve bunun yerine, doğrulayıcıların blok önerebileceği 32 tane on iki saniyelik "yuva"dan oluşan zamana dayalı bir dönem sistemi üzerinde çalışır. Bu yüzden 74.240 numaralı döneme ne zaman ulaşacağımızı tam olarak biliyorduk ve Altair hayat buldu!

- [Blok süresi](/developers/docs/blocks/#block-time)

---

### Londra {#london}

<NetworkUpgradeSummary name="london" />

#### Özet {#london-summary}

Londra yükseltmesi, işlem ücreti marketini yeniden şekillendiren [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ile birlikte gaz geri ödemelerinin nasıl ele alındığını ve [Buz Devri](/glossary/#ice-age) takvimindeki değişiklikleri tanıttı.

- [Merkeziyetsiz uygulama geliştiricisi misiniz? Kütüphanelerinizi ve araçlarınızı güncellediğinizden emin olun.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Ethereum Foundation'ın duyurusunu okuyun](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herder'ın açıklamalarını okuyun](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Londra EIP'leri" contentPreview="Official improvements included in this upgrade.">

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

- [Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herder'ın acıklamalarını okuyun](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIP'leri" contentPreview="Official improvements included in this upgrade.">

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

[İşaret Zinciri](/roadmap/beacon-chain/)'nin güvenli bir şekilde gönderilmesi için 16.384 adet 32 hisselenmiş ETH yatırılması gerekiyordu. Bu, 27 Kasım'da meydana geldi, yani İşaret Zinciri blok üretmeye 1 Aralık 2020'de başladı. Bu, [Ethereum vizyonuna](/roadmap/vision/) ulaşmak için önemli bir ilk adımdır.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  İşaret Zinciri
</DocLink>

---

### Hisseleme yatırma sözleşmesi dağıtıldı {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Özet {#deposit-contract-summary}

Hisseleme yatırma sözleşmesi, Ethereum ekosistemine [hisselemeyi](/glossary/#staking) tanıttı. Bir [Ana Ağ](/glossary/#mainnet) sözleşmesi olmasına rağmen önemli bir [Ethereum yükseltmesi](/roadmap/) olan [İşaret Zinciri](/roadmap/beacon-chain/)'nin çıkış zamanı üzerinde doğrudan bir etkisi oldu.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Stake etme
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Özet {#muir-glacier-summary}

Muir Glacier çatallanması, [bomba değerine](/glossary/#difficulty-bomb) bir gecikme getirdi. [İş ispatı](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizmasının blok zorluğundaki artışlar, işlem gönderme ve merkeziyetsiz uygulama kullanma sırasındaki bekleme sürelerini artırarak Ethereum'un kullanılabilirliğinin azalması riski yarattı.

- [Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herder'ın acıklamalarını okuyun](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP'leri" contentPreview="Official improvements included in this fork.">

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

- [Ethereum Sanal Makinesi](/developers/docs/ethereum-stack/#ethereum-virtual-machine)'ndeki belirli işlemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Hizmet reddi saldırısına karşı direnci iyileştirdi.
- SNARK'lara ve STARK'lara dayalı [Katman 2 ölçeklendirme](/developers/docs/scaling/#layer-2-scaling) çözümlerini daha performanslı hâle getirdi.
- Ethereum'un ve Zcash'in birlikte çalışmasını sağladı.
- Sözleşmelerin daha yaratıcı fonksiyonlar sunmasını sağladı.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="İstanbul EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>Ethereum'un Zcash gibi gizlilik koruyucu bir para birimiyle çalışmasına olanak verir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em><a href="/glossary/#gas">gaz</a> maliyetlerini iyileştiren daha ucuz bir kriptografidir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">işlem kodu</a> ekleyerek Ethereum'u tekrar saldırılarına karşı korur.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>işlem kodu gaz fiyatlarını tüketime daylı olarak iyileştirme.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>bloklarda daha fazla veriye olanak tanımak amacıyla Çağrı Verisi maliyetini azaltır – <a href="/developers/docs/scaling/#layer-2-scaling">Katman 2 ölçeklendirmesi</a> için kullanışlıdır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>diğer işlem 
 kodu gaz ücret değişiklikleri.</em></li>
</ul>

</ExpandableCard>

---

### Konstantinopolis {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Özet {#constantinople-summary}

Konstantinopolis çatalı:

- [Hisse ispatı uygulanmadan](#beacon-chain-genesis) önce blokzincirin donmamasını sağladı.
- EVM</'deki belirli işlemlerin [gaz](/glossary/#gas) maliyetini optimize etti bir>.
- Henüz oluşturulmamış adreslerle etkileşim kurma yeteneğini ekledi.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Konstantinopolis EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>zincir üstündeki belli başlı eylemler için maliyeti iyileştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>henüz oluşturulmamış adreslerle etkileşim kurmanıza olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>zincir üstündeki belli başlı eylemler için maliyeti iyileştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>blokzincirin hisse ispatı öncesinde donmamasını sağlar.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizans {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Özet {#byzantium-summary}

Bizans çatalı:

- Blok [madenciliği](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 5'ten 3 ETH'ye düşürdü.
- [Bomba değerini](/glossary/#difficulty-bomb) bir yıl geciktirdi.
- Diğer sözleşmelere durum değiştirmeyen çağrılar yapabilme olanağı ekledi.
- [Katman 2 ölçeklendirmesine](/developers/docs/scaling/#layer-2-scaling) izin vermek için belirli şifreleme yöntemleri ekledi.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Bizans EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> işlem kodu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>başarı ya da başarısızlığı bildirmek için işlem makbuzlarına durum alanı eklendi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em><a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>'ı mümkün kılmak için eliptik eğri ve sayıl çarpım ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em><a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>'ı mümkün kılmak için eliptik eğri ve sayıl çarpım ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA imza doğrulasını mümkün kılar.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>değişken uzunlukta geri dönüş değerleri için destek ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>diğer sözleşmelere durum değiştirmeyen çağrıların eklenmesine imkan veren <code>STATICCALL</code> işlem kodunu ekler.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>zorluk ayarlama formülünü değiştirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em><a href="/glossary/#difficulty-bomb">bomba değerini</a> 1 yıl geciktirir ve blok ödülünü 5'ten 3 ETH'ye düşürür.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Özet {#spurious-dragon-summary}

Sahte Ejderha çatallanması, ağdaki hizmet reddi (DoS) saldırılarına (Eylül/Ekim 2016) verilen ve şunları da içeren ikinci yanıttı:

- ağ üzerinde gelecekteki saldırıları önlemek için işlem kodu fiyatlandırmasını ayarlama.
- blokzincir durumunun "şişkinliğinin indirilmesini" sağlama.
- tekrar saldırı koruması ekleme.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Sahte Ejderha EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>bir Ethereum zincirindeki işlemlerin alternatif bir zincir üzerinde yeniden yayımlanmasını engeller, örneğin bir test ağı işleminin ana Ethereum ağında tekrarlanması.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> işlem kodunun fiyatlarını ayarlar – hesaplama açısından pahalı sözleşme işlemleri yoluyla ağı yavaşlatmayı daha zor hale getirir.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS saldırılarıyla eklenmiş boş hesapların kaldırılmasına olanak tanır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>Blokzincir üzerindeki bir sözleşmenin sahip olabileceği azami kod büyüklüğünü 24576 bayt olarak değiştirir.</em></li>
</ul>

</ExpandableCard>

---

### Mandalina düdüğü {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Özet {#tangerine-whistle-summary}

Mandalina Düdüğü çatallanması, ağdaki (Eylül/Ekim 2016) hizmet reddi (DoS) saldırılarına karşı şunları içeren ilk yanıttı:

- düşük fiyatlı işlem kodlarıyla ilgili acil ağ sağlığı sorunlarını ele almak.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Mandalina Düdüğü EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>spam saldırılarında kullanılabilen işlem kodlarının maliyetlerini arttırır.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>Ethereum protokolünün daha önceki versiyonlarındaki hatalar sebebiyle duruma çok düşük maliyetle yerleştirilmiş çok sayıdaki boş hesabı kaldırarak durum boyutunu küçültür.</em></li>
</ul>

</ExpandableCard>

---

### DAO çatallanması {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Özet {#dao-fork-summary}

DAO çatallanması, güvenli olmayan bir [DAO](/glossary/#dao) sözleşmesinin bir saldırıda 3,6 milyon ETH'nin boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/learn/understanding-the-dao-attack/) yanıt olarak geliştirildi. Çatallanma, hatalı sözleşmedeki fonları tek bir işlevle [yeni sözleşmeye](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) taşıdı: geri çekme. Para kaybeden herkes, cüzdanlarındaki her 100 DAO jetonu için 1 ETH çekebiliyordu.

Bu eylem planı, Ethereum topluluğu tarafından oylandı. Tüm ETH sahipleri, [bir oylama platformunda](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) bir işlem aracılığıyla oy kullanabildi. Çatallanma kararı, oyların %85'inden fazlasına ulaştı.

Bazı madenciler, DAO olayı protokoldeki bir kusur olmadığı için çatallanmayı reddetti. [Ethereum Classic](https://ethereumclassic.org/)'i oluşturdular.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Özet {#homestead-summary}

Geleceğe dönük Homestead çatallanması. Birkaç protokol değişikliği ve Ethereum'a başka ağ yükseltmeleri yapma olanağı tanıyan bir ağ değişikliği içeriyordu.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP'leri" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP2</a> - <em>sözleşme oluşturma sürecinde düzenleme yapar</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP7</a> - <em>yeni bir işlem kodu ekler: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p ileri dönük uyumluluk gereksinimlerini tanıtır</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Sınır eritme {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Özet {#frontier-thawing-summary}

Sınır eritme çatallanması, [blok](/glossary/#block) başına 5.000 [gaz](/glossary/#gas) sınırını kaldırdı ve varsayılan gaz fiyatını 51 [gwei](/glossary/#gwei) olarak ayarladı. Bu, 21.000 gaz gerektiren işlemleri mümkün kıldı. [Bomba değeri](/glossary/#difficulty-bomb), [hisse ispatına](/glossary/#pos) yönelik gelecekteki bir sert çatallanma sağlamak üzere getirildi.

- [Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Ethereum Protokol Yükseltmesi 1'i okuyun](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Sınır {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Özet {#frontier-summary}

Sınır, Ethereum projesinin canlı ancak yalın bir uygulamasıydı. Başarılı Olimpik test aşamasını takip etti. Teknik kullanıcılar, özellikle geliştiriciler için tasarlanmıştı. [Blokların](/glossary/#block) 5.000'lik bir [gaz](/glossary/#gas) sınırı vardı. Bu "eritme" dönemi, madencilerin faaliyetlerine başlamasını ve ilk kullanıcıların istemcilerini "acele etmeden" kurmalarını sağladı.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether satışı {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ethereum resmi olarak 42 günlüğüne satışa çıktı. BTC ile satın alınabiliyordu.

[Ethereum Vakfı'nın duyurusunu okuyun](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Sarı kağıt yayımlandı {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Dr. Gavin Wood tarafından yazılan Sarı Kağıt, Ethereum protokolünün teknik bir tanımıdır.

[Sarı Kağıdı Görüntüleyin](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Tanıtım belgesi yayımlandı {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Projenin 2015'teki lansmanından önce, Ethereum'un kurucusu Vitalik Buterin tarafından 2013'te yayımlanan tanıtım yazısıdır.

<DocLink href="/whitepaper/">
  Tanıtım belgesi
</DocLink>
