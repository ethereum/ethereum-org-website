---
title: Ethereum'un Tarihi ve Çatalları
description: Önemli kilometre taşları, sürümler ve çatallar dahil olmak üzere Ethereum blok zincirinin geçmişi.
lang: tr
sidebar: true
sidebarDepth: 1
---

# Ethereum'un tarihi {#the-history-of-ethereum}

Ethereum blok zincirindeki tüm önemli dönüm noktalarının, çatalların ve güncellemelerin bir zaman çizelgesi.

<ExpandableCard title="Çatallar nedir?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Çatallar, ağda önemli teknik yükseltmeler veya değişiklikler yapılması gerektiğinde ortaya çıkar: Bunlar genellikle [Ethereum İyileştirme Önerileri (EIP'ler)](/eips/)'den kaynaklanır ve protokolün "kurallarını" değiştirir.

Geleneksel, merkezden kontrol edilen yazılımlarda yükseltmelere ihtiyaç duyulduğunda, şirket son kullanıcı için sadece yeni bir versiyon yayınlar. Blok zincirleri farklı çalışır çünkü merkezi bir sahiplik yoktur. [Ethereum istemcileri](/developers/docs/nodes-and-clients/) yeni çatal kurallarını uygulamak için yazılımlarını güncellemelidir. Ayrıca blok yaratıcıları (iş ispatı dünyasındaki madenciler, hisse ispatı dünyasındaki doğrulayıcılar) ve düğümler, bloklar oluşturmalı ve yeni kurallara göre doğrulama yapmalıdır. [Mutabakat mekanizmaları hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/)

Bu kural değişiklikleri ağda geçici bir bölünme oluşturabilir. Yeni bloklar yeni ya da eski kurallara göre yaratılabilir. Çatallar genellikle önceden kararlaştırılır, böylece müşteriler değişiklikleri uyum içinde benimser ve yükseltmelerle birlikte çatal ana zincir hâline gelir. Fakat nadir durumlarda, çatallamalar üzerindeki anlaşmazlıklar ağın geçici olarak ayrılmasına neden olabilir: En bilineni, [DAO fork] (#dao-fork) ile Ethereum Classic'in yaratılmasıdır.

</ExpandableCard>

Gelecekteki protokol yükseltmelerini mi arıyorsunuz? [Ethereum'da yapılacak yükseltmeler hakkında bilgi edinin](/upgrades/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>9 Aralık 2021 07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Blok numarası: <a href="https://etherscan.io/block/13773000">13.773.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH fiyatı: $4111 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">waybackmachine'de ethereum.org </a>

#### Özet {#arrow-glacier-summary}

"Arrow Glacier" (Ok Buzulu) ağ yükseltmesi, [zorluk bombasını](/glossary/#difficulty-bomb) bir kaç ay ertelendi. Bu yükseltmede sunulan tek değişiklik budur ve doğası gereği [Muir Glacier](#muir-glacier) yükseltmesine benzer. [Bizans](#byzantium), [Konstantinopolis](#constantinople) ve [Londra](#london) ağ yükseltmelerinde de benzer değişiklikler yapıldı.

- [EF Blog - Arrow Glacier Yükseltme Duyurusu](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Yükseltmesi](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIP'leri" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _Zorluk bombasını Haziran 2022'ye kadar erteler_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} mr="0.5rem" />Düğüm operatörleri {#arrow-glacier-node-operators}

Değişken blok sürelerini hesaba katmak için istemci yazılımınızı 5 Aralık 2021'den önce en son sürüme yükselttiğinizden emin olun. Bu, istemcinizin bir çatallanma öncesi zincirle eşitlenerek bu durumun para gönderememe veya işlemleri düzgün bir şekilde doğrulayamama ile sonuçlanmasını önlemeye yardımcı olur.

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>27 Ekim 2021 10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Dönem numarası: 74.240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH fiyatı: $4024 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">waybackmachine'de ethereum.org</a>

#### Özet {#altair-summary}

Altair yükseltmesi, [İşaret Zinciri](/upgrades/beacon-chain) için planlanmış ilk yükseltmedir. "Senkronizasyon komiteleri" için destek ekleyerek hafif istemcileri etkinleştirdi ve doğrulayıcı hareketsizliği ile cezaları tam değerlerine getirdi.

- [Altair yükseltme şartnamesini okuyun](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />İlginç bir bilgi! {#altair-fun-fact}

Altair, kesin bir kullanıma sunma süresi olan ilk büyük ağ yükseltmesiydi. Önceden her yükseltme, blok sürelerinin değiştiği iş ispatı zincirinde beyan edilen bir blok numarasına dayanıyordu. İşaret Zinciri, iş ispatı için çözüm gerektirmez ve bunun yerine, doğrulayıcıların blok önerebileceği 32 tane on iki saniyelik "yuva"dan oluşan zamana dayalı bir dönem sistemi üzerinde çalışır. Bu yüzden 74.240. çağa ne zaman ulaşacağımızı tam olarak biliyorduk ve Altair hayat buldu!

- [Beaconcha.in Sözlüğü - Yuvalar](https://kb.beaconcha.in/glossary#slots)

---

### Londra {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>5 Ağustos 2021 12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/12965000">12.965.000</a><br /><Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $2621 ABD Doları<br /><Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">waybackmachine'de ethereum.org</a>

#### Özet {#london-summary}

Londra yükseltmesi, işlem ücreti marketini yeniden şekillendiren [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ile birlikte gaz geri ödemelerinin nasıl ele alındığını ve [Buz Devri](/glossary/#ice-age) takvimindeki değişiklikleri tanıttı.

- [dApp geliştiricisi misiniz? Kütüphanelerinizi ve araçlarınızı güncellediğinizden emin olun.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herder'ın açıklamalarını okuyunuz](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Londra EIP'leri" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _işlem ücreti piyasasını iyileştirir_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _bir bloktan "BASEFEE" döndürür_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _EVM işlemleri için gaz iadelerini azaltır_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _"0xEF" ile başlayan sözleşmelerin dağıtımını engeller_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _Buz Devrini Aralık 2021'e kadar erteler_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>15 Nisan 2021 10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/12244000">12.244.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı. $2454 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#berlin-summary}

Berlin güncellemesi, belirli EVM eylemleri için optimize edilmiş gaz maliyetini yükseltiyor ve çoklu işlem türleri için desteği artırıyor.

- [Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herder'ın açıklamalarını okuyunuz](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIP'leri" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _ModExp gaz maliyetini düşürür_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _çoklu işlem türleri için daha kolay destek sağlar_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _durum erişim işlem kodları için gaz maliyeti artar_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _isteğe bağlı erişim listeleri ekler_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### İşaret Zinciri başlangıcı {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>1 Aralık 2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> İşaret Zincirinin blok numarası: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $586,23 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">waybackmachine'de ethereum.org</a>

#### Özet {#beacon-chain-genesis-summary}

[İşaret Zinciri](/upgrades/beacon-chain/)'nin güvenli bir şekilde gönderilmesi için 16384 adet 32 stake edilmiş ETH yatırılması gerekiyordu. Bu, 27 Kasım'da meydana geldi, yani İşaret Zinciri blok üretmeye 1 Aralık 2020'de başladı. Bu, [Ethereum vizyonuna](/upgrades/vision/) ulaşmak için önemli bir ilk adımdır.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  İşaret Zinciri
</DocLink>

---

### Stake yatırma sözleşmesi dağıtıldı {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 Ekim 2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/11052984">11.052.984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH fiyatı: $379,04 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">waybackmachine'de ethereum.org</a>

#### Özet {#deposit-contract-summary}

Stake yatırma sözleşmesi, Ethereum ekosistemine [stake etmeyi](/glossary/#staking) getirdi. Bir [Mainnet](/glossary/#mainnet) sözleşmesi olmasına rağmen önemli bir [Ethereum yükseltmesi](/upgrades/) olan [İşaret Zinciri](/upgrades/beacon-chain/)'nin çıkış zamanı üzerinde doğrudan bir etkisi oldu.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Stake etme
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2 Ocak 2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/9200000">9.200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $127,18 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#muir-glacier-summary}

Muir Glacier çatalı, [zorluk bombasına](/glossary/#difficulty-bomb) bir gecikme getirdi. [İş ispatı](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizmasının blok zorluğundaki artışlar, işlemleri göndermek için dapp'leri kullanma ve bekleme sürelerini artırarak Ethereum'un kullanılabilirliğini düşürme tehdidinde bulundu.

- [Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herder'ın açıklamalarını okuyunuz](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _zorluk bombasını 4.000.000 blok veya ortalama 611 gün daha geciktirir._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### İstanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>8 Aralık 2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/9069000">9.069.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $151,06 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#istanbul-summary}

İstanbul çatalı:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)'deki belirli işlemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Hizmet reddi saldırısı direncini iyileştirdi.
- SNARK'lara ve STARK'lara dayalı [Katman 2 ölçekleme](/developers/docs/scaling/#layer-2-scaling) çözümlerini daha performanslı hâle getirdi.
- Ethereum ve Zcash'in birlikte çalışmasını sağladı.
- Sözleşmelerin daha yaratıcı fonksiyonlar sunmasını sağladı.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="İstanbul EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _Ethereum'ın Zcash gibi gizliliği koruyan para birimiyle çalışmasına izin verir._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _[gas](/glossary/#gas) maliyetlerini iyileştirmek için daha ucuz şifreleme._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _"CHAINID" [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ekleyerek Ethereum'u tekrar saldırılarına karşı korur._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _tüketime dayalı işlem kodu gaz fiyatlarını optimize etme._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _Bloklarda daha fazla veriye izin vermek için CallData maliyetini düşürür – [Katman 2 ölçekleme için iyi](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _diğer işlem kodu gaz fiyatı değişiklikleri._

</ExpandableCard>

---

### Konstantinopolis {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28 Şubat 2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/7280000">7,280,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $136,29 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#constantinople-summary}

Konstantinopolis çatalı:

- [Hisse ispatı uygulanmadan](#beacon-chain-genesis) önce blok zincirinin donmaması sağladı.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)'deki belirli işlemlerin [gaz](/glossary/#gas) maliyetini optimize etti.
- Henüz oluşturulmamış adreslerle etkileşim kurma yeteneği ekledi.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Konstantinopolis EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _belirli zincir üstü eylemlerin maliyetini optimize eder._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _henüz oluşturulmamış adreslerle etkileşime girmenizi sağlar._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _belirli zincir üstü eylemlerin maliyetini optimize eder._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _hisse ispatından önce blok zincirinin donmamasını sağlar._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizans {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16 Ekim 2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/4370000">4.370.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH fiyatı: $334,23 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#byzantium-summary}

Bizans çatalı:

- Blok [madenciliği](/developers/docs/consensus-mechanisms/pow/mining/) ödüllerini 5'ten 3 ETH'ye düşürdü.
- [Zorluk bombasını](/glossary/#difficulty-bomb) bir yıl geciktirdi.
- Diğer sözleşmelere durum değiştirmeyen çağrılar yapabilme kabiliyeti ekledi.
- [Katman 2 ölçeklendirmesine](/developers/docs/scaling/#layer-2-scaling) izin vermek için belirli şifreleme yöntemleri ekledi.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Bizans EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _"REVERT" işlem kodunu ekler._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _Başarılı veya başarısız olduğunu belirtmek için işlem makbuzlarına \_status alanı eklendi._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _[ZK-Snarks](/developers/docs/scaling/zk-rollups/) için eliptik eğri ve skaler çarpma ekler._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _[ZK-Snarks](/developers/docs/scaling/zk-rollups/) için eliptik eğri ve skaler çarpma ekler._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _RSA imza doğrulamasını etkinleştirir._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _değişken uzunluk dönüş değerleri için destek ekler._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _Diğer sözleşmelere durum değiştirmeyen çağrılara izin vererek "STATICCALL" işlem kodunu ekler._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _zorluk ayarlama formülünü değiştirir._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _[zorluk bombasını](/glossary/#difficulty-bomb) 1 yıl geciktirir ve blok ödülünü 5'ten 3 ETH'ye düşürür._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22 Kasım 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/2675000">2.675.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $9,84 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#spurious-dragon-summary}

Spurious Dragon çatalı, ağdaki (Eylül/Ekim 2016) hizmet reddi (DoS) saldırılarına verilen ikinci yanıttı:

- ağ üzerinde gelecekteki saldırıları önlemek için işlem kodu fiyatlandırmasını ayarlama.
- blok zinciri durumunun “debloat” edilmesini sağlamak.
- tekrar saldırı koruması ekleme.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _bir Ethereum zincirindeki işlemlerin alternatif bir zincirde yeniden yayınlanmasını önler, örneğin ana Ethereum zincirinde yeniden oynatılan bir test ağı işlemi gibi._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _"EXP" işlem kodunun fiyatlarını ayarlar – hesaplama açısından pahalı sözleşme işlemleri yoluyla ağı yavaşlatmayı zorlaştırır._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _DOS saldırıları yoluyla eklenen boş hesapların kaldırılmasına izin verir._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _blok zincirindeki bir sözleşmenin sahip olabileceği maksimum kod boyutunu 24576 bayta kadar değiştirir._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18 Ekim 2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/2463000">2.463.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $12,50 ABD Doları<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#tangerine-whistle-summary}

Tangerine Whistle çatalı, ağdaki (Eylül/Ekim 2016) hizmet reddi (DoS) saldırılarına karşı aşağıdakiler dahil ilk yanıttı:

- düşük fiyatlı işlem kodlarıyla ilgili acil ağ sağlığı sorunlarını ele almak.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _spam saldırılarında kullanılabilecek işlem kodlarının gaz maliyetlerini artırır._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _Ethereum protokolünün önceki sürümlerindeki kusurlar nedeniyle, duruma çok düşük maliyetle dahil olan çok sayıda boş hesabı kaldırarak durum boyutunu küçültür._

</ExpandableCard>

---

### DAO çatalı {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20 Temmuz 2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/1920000">1.920.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#dao-fork-summary}

DAO çatalı, güvenli olmayan bir [DAO](/glossary/#dao) sözleşmesinin bir saldırıda 3,6 milyon ETH'nin boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) yanıttı. Çatal, hatalı sözleşmedeki fonları tek bir fonksiyonla [yeni sözleşmeye](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) taşıdı: withdraw. Para kaybeden herkes, cüzdanlarındaki her 100 DAO token'ı için 1 ETH çekebilir.

Bu eylem planı, Ethereum topluluğu tarafından oylandı. Herhangi bir ETH sahibi, [bir oylama platformunda](http://v1.carbonvote.com/) yapılan bir işlem aracılığıyla oy kullanabildi. Çatallanma kararı oyların %85'inden fazlasına ulaştı.

Bazı madenciler, DAO olayı protokolde bir kusur olmadığı için çatallamayı reddetti. [Ethereum Classic](https://ethereumclassic.org/)'i oluşturdular.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 Mart 2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/1150000">1.150.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#homestead-summary}

Geleceğe dönük Homestead çatalı. Birkaç protokol değişikliği ve Ethereum'a daha fazla ağ yükseltmesi yapma yeteneği veren bir ağ değişikliği içeriyordu.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP'leri" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _sözleşme oluşturma sürecinde düzenlemeler yapar._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _yeni işlem kodu ekler: "DELEGATECALL"_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _devp2p ileri uyumluluk gereksinimlerini kullanıma sokar_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>7 Eylül 2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/200000">200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: $1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#frontier-thawing-summary}

Frontier Thawing çatalı, [blok](/glossary/#block) başına 5.000 [gaz](/glossary/#gas) sınırını kaldırdı ve varsayılan gaz fiyatını 51 [gwei](/glossary/#gwei) yaptı. Bu, işlem yapılmasını sağladı: İşlemler 21.000 gaz gerektiriyor.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>30 Temmuz 2015 03:26:13 PM UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blok numarası: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH fiyatı: Yok<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

#### Özet {#frontier-summary}

Frontier, Ethereum projesinin canlı, ancak yalın bir uygulamasıydı. Başarılı Olympic test aşamasını takip etti. Teknik kullanıcılar, özellikle geliştiriciler için tasarlanmıştır. [Blokların](/glossary/#block) 5.000'lik bir [gaz](/glossary/#gas) sınırı vardı. Bu "thawing" (çözülme) dönemi, madencilerin faaliyetlerine başlamasını ve erken benimseyenlerin istemcilerini "acele etmeden" kurmalarını sağladı.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether satışı {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 22 Temmuz - 2 Eylül 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

Ether, resmi olarak 42 gün boyunca satışa çıktı. BTC ile satın alınabiliyordu.

[Ethereum Vakfı'nın duyurusunu okuyunuz](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Sarı Kağıt yayınlandı {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 1 Nisan 2014<br /><Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">waybackmachine'de ethereum.org</a>

Dr. Gavin Wood tarafından yazılan Sarı Kağıt, Ethereum protokolünün teknik bir tanımıdır.

[Sarı Kağıdı Görüntüle](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Teknik Rapor yayınlandı {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 Kasım 2013<br /><Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">waybackmachine'de ethereum.org</a>

Projenin 2015'teki lansmanından önce, Ethereum'un kurucusu Vitalik Buterin tarafından 2013'te yayınlanan tanıtım yazısı.

<DocLink to="/whitepaper/">
  Teknik Rapor
</DocLink>
