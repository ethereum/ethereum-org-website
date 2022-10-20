---
title: Sıfır-Bilgi Toplamaları
description: Sıfır bilgi toplamalarına giriş
lang: tr
---

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız. Toplamalar gibi ölçeklendirme çözümlerini uygulamak, teknoloji daha az savaşta test edildiğinden ve araştırılmaya ve geliştirilmeye devam ettiğinden ileri bir konudur.

Yeni başlayanlar için daha uygun bir kaynak mı arıyorsunuz? [Katman 2'ye giriş](/layer-2/) makalemize bakın.

## Sıfır-bilgi toplamalar {#zk-rollups}

**Sıfır-bilgi ispatı ile çalışan "toplamalar" (ZK-toplamaları)**, yüzlerce işlemi zincir dışında birleştirir (veya "toplar") ve kriptografik ispat oluşturur. Bu ispatlar, SNARK'lar (öz ve interaktif olmayan bilgi argümanı) veya STARK'lar (ölçeklenebilir şeffaf bilgi argümanı) şeklinde olabilir. SNARK'lar ve STARK'lar, doğruluk ispatları olarak bilinir ve katman 1'e gönderilir.

ZK-toplaması akıllı kontratı, katman 2'deki aktarımların tüm bilgilerini muhafaza eder, bu bilgiler sadece doğruluk ispatları ile güncellenebilir. Bu, ZK-toplamalarının tüm işlem verilerinin yerine sadece doğruluk ispatlarına ihtiyacı olduğu anlamına gelir. Bir ZK-toplaması ile, daha az veri dahil edildiğinden bir bloğu doğrulamak daha hızlı ve daha ucuzdur.

Bir ZK toplaması ile, fonları katman 2'den katman 1'e taşırken herhangi bir gecikme olmaz çünkü ZK-toplaması sözleşmesi tarafından kabul edilen bir doğruluk ispatı, fonları zaten doğrulamıştır.

Katman 2'de bulunan ZK-toplamaları, işlem boyutunu daha da azaltmak için optimize edilebilir. Örneğin bir hesap, bir işlemi 32 bayttan sadece 4 bayta indiren bir adres yerine bir dizin ile temsil edilir. İşlemler ayrıca Ethereum'a `calldata` olarak yazılır, bu da gazı azaltır.

### Artıları ve eksileri {#zk-pros-and-cons}

| Artıları                                                                                                                             | Eksileri                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Kanıtlar ana zincire gönderildikten sonra durum anında doğrulandığından daha hızlı kesinlik süresi.                                  | Bazılarının EVM desteği yoktur.                                                                                                |
| [İyimser toplamalar](#optimistic-pros-and-cons)ın karşısında savunmasız olabileceği ekonomik saldırılara karşı, savunmasız değildir. | Doğruluk ispatlarının hesaplanması yoğun enerji harcar: Zincir üzerinde etkinliği az olan uygulamalar için bu enerjiye değmez. |
| Güvenli ve merkeziyetsiz, çünkü durumu kurtarmak için gereken veriler katman 1 zincirinde depolanır.                                 | Bir operatör, işlem sırasını etkileyebilir                                                                                     |

### ZK-toplamalarının görsel açıklaması {#zk-video}

Finematics'in ZK-toplaması açıklamasını izleyin:

<YouTube id="7pWxCklcNsU" start="406" />

### ZK toplamalarını kullanın {#use-zk-rollups}

Dapp'lerinize entegre edebileceğiniz birden fazla ZK-toplaması uygulaması mevcuttur:

<RollupProductDevDoc rollupType="zk" />

**ZK-toplamaları hakkında bilgiler**

- [Sıfır-Bilgi Toplamaları Nelerdir?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub'un zk-toplamaları hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARK'lar ve SNARK'lar](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
