---
title: ETH arzı ve ihracı
metaTitle: ETH Arzını ve İhracını Anlamak
description: EIP'ler, PoS ve EIP-1559 gibi temel kavramları kapsayan, ETH arzı ve ihracı hakkında yeni başlayanlar için uygun bir rehber.
lang: tr
---

## Ön Koşullar {#prerequisites}

Bu makale, ön bilgisi olmayan yeni başlayanlar için yazılmıştır. Ancak konuyu tam olarak anlamak için [Ethereum İyileştirme Önerileri (EIP'ler)](/eips/#introduction-to-ethereum-improvement-proposals), [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/), [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) ve [Londra Güncellemesi](/ethereum-forks/#london) gibi kavramlar hakkında temel bir anlayışa sahip olmak faydalı olacaktır.

## Bugün Ne Kadar ETH Token'ı Var? {#current-eth-supply}

Toplam ETH arzı dinamiktir ve iki ana faktörden dolayı sürekli değişir:

1. **Hisse Kanıtı (PoS) İhracı**: Ağı güvence altına alan doğrulayıcılar için ödül olarak yeni ETH yaratılır
2. **EIP-1559 Yakımı**: İşlem ücretlerinin bir kısmı kalıcı olarak dolaşımdan çıkarılır

Mevcut arzı ve bu değişiklikleri [Ultrasound Money](https://ultrasound.money) gibi platformlarda gerçek zamanlı olarak takip edebilirsiniz.

Ethereum'un arzı ve ihracı, ağın sağlığını ve geleceğini anlamak için temel metriklerdir. Peki ETH ihracı tam olarak ne anlama geliyor? Gelin bunu detaylandıralım.

## ETH Arzı ve İhracı Neden Önemlidir? {#why-eth-supply-matters}

Geleneksel finansta merkez bankaları para arzını kontrol eder ve genellikle ekonomileri canlandırmak için daha fazla para basarlar. Ethereum ise kodu tarafından yönetilen şeffaf ve öngörülebilir bir sistem üzerinde çalışır. Ne kadar ETH olduğunu ve yeni ETH'nin ne kadar hızlı ihraç edildiğini bilmek şunlara yardımcı olur:

- **Güven İnşa Etmek**: Ethereum topluluğu, arz ve ihraç verilerini doğrudan Blokzincir üzerinden doğrulayabilir.
- **Değeri Anlamak**: İhraç ve ETH yakım oranları arasındaki ilişki, ETH'nin enflasyonunu veya deflasyonunu etkileyerek zaman içindeki değerine yön verir.
- **Ağ Sağlığını Takip Etmek**: İhraç ve yakım oranlarındaki değişiklikler, ağın etkinliğini ve güvenliğini yansıtır.

## ETH İhracı Nedir? {#eth-issuance}

ETH ihracı, Ethereum ağını güvence altına alan doğrulayıcılar için ödül olarak yeni ETH yaratma sürecini ifade eder. Dolaşımdaki toplam ETH miktarını ifade eden toplam arzdan farklıdır.

### Basit bir ifadeyle: {#in-simple-terms}
- **İhraç**, ağa yeni ETH ekler.
- **Yakım** (EIP-1559 ile tanıtılmıştır), işlem ücretlerinin bir kısmını yok ederek ağdan ETH çıkarır.

Bu iki güç, Ethereum arzının zaman içinde büyüyüp (enflasyonist) büyümeyeceğini veya küçülüp (deflasyonist) küçülmeyeceğini belirler.

## Günümüzde ETH Arzı ve İhracı {#eth-supply-today}

Ethereum'un Hisse Kanıtı (PoS) sistemi, önceki İş Kanıtı (PoW) modeline kıyasla ETH ihracını büyük ölçüde azalttı. Ağı güvence altına almak için ETH kilitleyen doğrulayıcılar, ödül olarak ETH kazanırlar. Mevcut ihraç oranını [Ultrasound Money](https://ultrasound.money) üzerinde görebilirsiniz.

Ancak bu sayı dinamiktir. EIP-1559 sayesinde, ağ etkinliği yüksek olduğunda ETH yakım oranları ihracı aşarak deflasyonist bir etki yaratabilir. Örneğin, NFT lansmanları veya merkeziyetsiz finans (DeFi) etkinliği gibi yüksek talep dönemlerinde, ihraç edilenden daha fazla ETH yakılabilir.

### ETH Arzını ve İhracını Takip Etme Araçları: {#tools-to-track-eth-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) - ETH arzı, ihracı ve yakım oranlarının gerçek zamanlı takibi
- [Etherscan](https://etherscan.io) - Arz metriklerine sahip blok gezgini

## Gelecekteki ETH Arzını ve İhracını Etkileyen Faktörler {#future-eth-supply}

Ethereum'un gelecekteki arzı sabit değildir; çeşitli değişkenlere bağlıdır:

1. **Staking Katılımı**: 
   - Ağa daha fazla doğrulayıcının katılması, daha fazla ETH ödülünün dağıtılması anlamına gelir.
   - Daha az doğrulayıcının katılması ihracı azaltabilir.
   - [Staking](/staking/) hakkında daha fazla bilgi edinin.

2. **Ağ Etkinliği**:
   - Yüksek işlem hacimleri daha fazla ETH'nin yakılmasına yol açarak ihracı dengeleyebilir veya aşabilir.
   - [Gaz ücretleri](/developers/docs/gas/) ve bunların yakımı nasıl etkilediği hakkında bilgi edinin.

3. **Protokol Güncellemeleri**:
   - Ethereum'un kodunda gelecekte yapılacak değişiklikler, staking ödüllerini veya yakım mekanizmalarını ayarlayarak arz dinamiklerini daha da şekillendirebilir.
   - [Ethereum yol haritası](/roadmap/) ile güncel kalın.

## Özet: ETH Arzı, İhracı ve Sırada Ne Var? {#recap}

ETH arzı ve ihracı hakkında bilmeniz gerekenlerin kısa bir özeti:

- **ETH Arzı**: Dinamik ve sürekli değişen bir yapıdadır, [Ultrasound Money](https://ultrasound.money) gibi araçlar aracılığıyla gerçek zamanlı olarak takip edilebilir
- **PoS Altında İhraç**: PoW'a kıyasla önemli ölçüde azaltılmıştır ve ödüller doğrulayıcılara gider. Mevcut oranları [Ultrasound Money](https://ultrasound.money) üzerinde görebilirsiniz
- **EIP-1559'un Rolü**: ETH yakımı, yüksek etkinlik dönemlerinde ağı deflasyonist hâle getirebilir
- **Gelecekteki Eğilimler**: Staking katılımı, ağ talebi ve Protokol güncellemeleri ETH arzını şekillendirecektir

ETH ihracını anlamak, Ethereum'un değerini ve deflasyonist, merkeziyetsiz bir varlık olarak potansiyelini aydınlatmaya yardımcı olur. Birleşme'nin ETH arzını nasıl etkilediği hakkında daha ayrıntılı bilgi için [detaylı incelememize](/roadmap/merge/issuance/) göz atın. ETH'nin geleceğini merak mı ediyorsunuz? [Ultrasound Money](https://ultrasound.money) gibi araçlarla daha derinlere inin veya [staking rehberlerimizi](/staking/) keşfedin.