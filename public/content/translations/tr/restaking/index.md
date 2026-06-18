---
title: Yeniden Staking
metaTitle: Yeniden staking nedir? | Yeniden staking'in faydaları ve kullanımı
description: Diğer merkeziyetsiz hizmetlerin güvenliğini sağlamak ve ekstra ödüller kazanmak için stake edilmiş ETH'yi kullanın.
lang: tr
template: use-cases
image: /images/use-cases/restaking.png
alt: Ethereum'da yeniden staking'in görsel bir temsili.
sidebarDepth: 2
summaryPoints:
  - "Diğer merkeziyetsiz hizmetlerin güvenliğini sağlamak ve ekstra ödüller kazanmak için stake edilmiş ETH'yi kullanın."
buttons:
  - content: Yeniden staking nedir?
    toId: what-is-restaking
  - content: Nasıl çalışır?
    toId: how-does-restaking-work
    isSecondary: false
---

Ethereum ağı, 7/24, yılın 365 günü milyarlarca dolarlık değeri güvence altına alır. Peki nasıl?

Dünyanın dört bir yanındaki insanlar, Ethereum işlemlerini işleyen ve Ethereum ağının güvenliğini sağlayan yazılımı çalıştırmak için akıllı sözleşmelere [Ether (ETH)](/what-is-ether/) kilitler (veya "stake eder"). Karşılığında daha fazla ETH ile ödüllendirilirler.

Yeniden staking, [stake edenlerin](/staking/) bu güvenliği diğer hizmetlere, uygulamalara veya ağlara genişletmesi için oluşturulmuş bir teknolojidir. Karşılığında ek yeniden staking ödülleri kazanırlar. Ancak, stake ettikleri ETH'yi daha fazla riske de atarlar.

**18 dakikada yeniden staking açıklaması**

<VideoWatch slug="restaking-explained" />

## Yeniden staking nedir? {#what-is-restaking}

Yeniden staking, stake edenlerin halihazırda stake edilmiş ETH'lerini diğer merkeziyetsiz hizmetlerin güvenliğini sağlamak için kullanmasıdır. Karşılığında, yeniden stake edenler normal ETH staking ödüllerine ek olarak bu diğer hizmetlerden ek ödüller alabilirler.

Yeniden staking ile güvenliği sağlanan merkeziyetsiz hizmetler "Aktif Olarak Doğrulanan Hizmetler" (AVS'ler) olarak bilinir.
Birçok ETH stake edenin Ethereum doğrulama yazılımı çalıştırmasıyla aynı şekilde, birçok yeniden stake eden de özel AVS yazılımı çalıştırır.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bilinmesinde fayda var</strong></strong>
  <p className="mt-2">"Aktif Olarak Doğrulanan Hizmetler" (AVS'ler) en yaygın olanı olsa da, farklı yeniden staking platformları güvenliğini sağlamaya yardımcı oldukları merkeziyetsiz hizmetler için "Otonom Olarak Doğrulanan Hizmetler", "Dağıtık Güvenli Hizmetler" veya "Ağlar" gibi başka isimler kullanabilir.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking ve yeniden staking karşılaştırması {#staking-vs-restaking}

| Staking                        | Yeniden Staking                                   |
| ------------------------------ | ------------------------------------------------- |
| ETH ödülleri kazanın           | ETH Ödülleri + AVS ödülleri kazanın               |
| Ethereum ağını güvenceye alır  | Ethereum ağını + AVS'leri güvenceye alır          |
| Minimum ETH sınırı yoktur      | Minimum ETH sınırı yoktur                         |
| Düşük risk seviyesi            | Düşükten yükseğe risk seviyesi                    |
| Çekim süresi sıraya bağlıdır   | Çekim süresi sıraya + kilit açma süresine bağlıdır|

## Neden yeniden staking'e ihtiyacımız var? {#why-do-we-need-restaking}

İki dünya hayal edin; biri yeniden staking olan, diğeri olmayan.

 <TabbedSection />

Yeniden staking'in olduğu bu dünyada, hem AVS hem de stake eden kişi birbirini bulabilmekten ve ekstra ödüller karşılığında güvenlik takası yapabilmekten fayda sağlar.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Yeniden staking'in ek faydası</strong></strong>
  <p className="mt-2">AVS'ler, merkeziyetsizlik ve güvenlikle dikkatlerini dağıtmak yerine tüm kaynaklarını hizmetlerini oluşturmaya ve pazarlamaya aktarabilirler.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Yeniden staking nasıl çalışır? {#how-does-restaking-work}

Yeniden staking'e dahil olan birkaç varlık vardır — her biri önemli bir rol oynar.

| **Terim**               | **Açıklama**                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yeniden staking platformları** | Yeniden staking platformu, AVS'leri, ETH stake edenleri ve operatörleri birbirine bağlayan bir hizmettir. Stake edenlerin ETH'lerini yeniden stake etmeleri için merkeziyetsiz uygulamalar ve stake edenlerin, AVS'lerin ve operatörlerin birbirini bulabileceği pazar yerleri oluştururlar.                                                                                                                |
| **Yerel yeniden stake edenler**    | Kendi Ethereum doğrulayıcılarını çalıştırarak ETH'lerini stake eden kişiler, ETH doğrulayıcı ödüllerine ek olarak yeniden staking ödülleri kazanmak için stake ettikleri ETH'yi EigenLayer ve diğerleri dahil olmak üzere bir yeniden staking platformuna bağlayabilirler.                                                                                                                             |
| **Likit yeniden stake edenler**    | ETH'lerini Lido veya Rocket Pool gibi üçüncü taraf bir likit staking sağlayıcısı aracılığıyla stake eden kişiler, stake ettikleri ETH'yi temsil eden Likit Staking Tokenleri (LST'ler) alırlar. Orijinal ETH'lerini stake edilmiş halde tutarken yeniden staking ödülleri kazanmak için bu LST'leri yeniden stake edebilirler.                                                                                  |
| **Operatörler**           | Operatörler, her bir AVS'nin gerektirdiği doğrulama görevlerini yerine getirerek AVS'lerin yeniden staking yazılımını çalıştırırlar. Operatörler genellikle çalışma süresi ve performans gibi şeyleri garanti eden profesyonel hizmet sağlayıcılardır. Operatör olmayan yeniden stake edenler gibi, operatörler de AVS'leri güvence altına almak için stake edilmiş ETH kullanırlar, ancak operatörler çalışmaları karşılığında ekstra ödüller de alırlar. |
| **AVS'ler**                | Bunlar, yeniden stake edenlerden güvenlik alan ve karşılığında Token ödülleri sunan fiyat oracle'ları, Token köprüleri ve veri sistemleri gibi merkeziyetsiz hizmetlerdir.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bilinmesinde fayda var</strong></strong>
  <p className="mt-2">Yerel ve likit yeniden stake edenler, AVS'leri güvence altına almak için yazılımı kendileri çalıştırmak yerine genellikle stake ettikleri ETH'nin yetkisini bir operatöre devrederler.</p>
  <p className="mt-2">Bu şekilde, operatörlerden daha düşük bir ödül oranı alsalar da, AVS'lerin karmaşık teknik gereksinimleri hakkında endişelenmelerine gerek kalmaz.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Yeniden staking örnekleri nelerdir? {#what-are-some-examples-of-restaking}

Yeni bir fikir olmasına rağmen, yeniden staking olanaklarını keşfetmek için birkaç proje ortaya çıkmıştır.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Yanlış isimlendirme uyarısı</strong></strong>
  <p className="mt-2">Bazı insanlar "yeniden staking"i merkeziyetsiz finansta (DeFi) LST'leri borç verme ve borç alma ile karıştırır. Her ikisi de stake edilmiş ETH'yi işe koşar, ancak yeniden staking sadece LST'lerden getiri elde etmek değil, AVS'leri güvence altına almak anlamına gelir.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Yeniden staking'den ne kadar kazanabilirim? {#how-much-can-i-make-from-restaking}

AVS'ler farklı oranlar sunsa da, eETH gibi Likit Yeniden Staking Tokenleri (LRT'ler) ne kadar kazanabileceğiniz konusunda size bir fikir verir. ETH'nizi stake etmek için stETH gibi LST'ler aldığınız gibi, stETH'yi yeniden stake etmek için eETH gibi LRT'ler alabilirsiniz. Bu Tokenler, ETH staking ve yeniden staking ödülleri kazandırır.

**Yeniden staking ile ilgili riskleri kabul etmek önemlidir. Potansiyel ödüller cazip olabilir, ancak risksiz değillerdir.**

## Yeniden staking'in riskleri nelerdir? {#what-are-the-risks-of-restaking}

| **Riskler**                   | **Açıklama**                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cezalar (veya "kesinti")**  | ETH staking'de olduğu gibi, yeniden stake edenler/operatörler çevrimdışı olursa, mesajları sansürlerse veya ağı bozmaya çalışırsa, stake'leri kısmen veya tamamen kesintiye uğrayabilir (yakılabilir). |
| **Merkeziyetçilik**           | Eğer az sayıda operatör yeniden staking'in çoğuna hakim olursa, yeniden stake edenler, AVS'ler ve hatta yeniden staking platformları üzerinde büyük bir etkiye sahip olabilirler. |
| **Zincirleme reaksiyonlar**   | Bir yeniden stake eden, birden fazla AVS'yi güvence altına alırken kesintiye uğrarsa, bu diğer AVS'lerin güvenliğini düşürerek onları savunmasız hale getirebilir. |
| **Fonlara anında erişim**     | Yeniden stake edilmiş ETH'yi çekmek için bir bekleme süresi (veya "kilit açma süresi") vardır, bu nedenle her zaman anında erişiminiz olmayabilir.               |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Ethereum kurucu ortağı yazıyor…</strong></strong>
  <p className="mt-2">
    Ethereum'un kurucu ortağı Vitalik, 2021'de yazdığı <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Mutabakatı Aşırı Yüklemeyin</a> adlı blog yazısında yeniden staking'in potansiyel riskleri hakkında uyarılarda bulundu.
  </a>
</AlertDescription>
</AlertContent>
</Alert>

## Yeniden staking'e nasıl başlanır? {#how-to-get-started-with-restaking}

| 🫡 Yeni Başlayanlar                                             | 🤓 İleri Düzey Kullanıcılar                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. LST'ler almak için Lido veya Rocket Pool gibi platformlarda ETH stake edin. | 1. ETH'nizi Ethereum'da bir Doğrulayıcı olarak stake edin.                            |
| 2. Bir yeniden staking hizmetinde yeniden staking'e başlamak için bu LST'leri kullanın. | 2. EigenLayer, Symbiotic ve diğerleri gibi yeniden staking hizmetlerini karşılaştırın. |
|                                                                 | 3. Doğrulayıcınızı yeniden staking akıllı sözleşmesine bağlamak için talimatları izleyin. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Ethereum Staking :</strong> Nasıl çalışır?</strong>
  <ButtonLink href="/staking/">
    Daha Fazla Bilgi Edin
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## İleri Düzey {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Daha fazla okuma {#further-reading}

1. [ethereum.org - ETH staking rehberi](/staking/)
2. [Ledger Academy - Ethereum Yeniden Staking Nedir?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Merkeziyetsiz Ethereum Yeniden Staking Protokolü Açıklaması](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Ethereum'un mutabakatını aşırı yüklemeyin](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer nedir? Ethereum'un yeniden staking protokolü açıklaması](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Sreeram Kannan ile Ethereum'a İzinsiz Özellik Ekleme](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer Açıklaması: Yeniden Staking Nedir?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Yeniden Staking Veri Panosu](https://www.theblock.co/data/decentralized-finance/restaking)