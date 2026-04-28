---
title: Tasdikler
description: "Hisse ispatı Ethereum'da tasdikler üzerine bir açıklama."
lang: tr
---

Bir doğrulayıcının her dönemde bir tasdik oluşturması, imzalaması ve yayınlaması beklenir. Bu sayfa tasdiklerin ne gibi göründüğünü ve fikir birliği istemcileri arasında nasıl işlendiğini ve iletildiğini belirtir.

## Tasdik nedir? {#what-is-an-attestation}

Her [dönemde](/glossary/#epoch) (6,4 dakika) bir doğrulayıcı ağa bir tasdik önerir. Bu tasdik, dönemdeki spesifik bir yuva içindir. Tasdikin amacı, doğrulayıcının zincir görüşü, özellikle de en son gerekçelendirilmiş blok ve mevcut dönemdeki ilk blok (`kaynak` ve `hedef` kontrol noktaları olarak bilinir) lehine oy kullanmaktır. Bu bilgi tüm katılım sağlayan doğrulayıcılar için birleştirilir ve ağın blok zincirin mevcut durumu üzerinde mutabakata varmasını sağlar.

Bu tasdik şu bileşenleri içerir:

- `aggregation_bits`: konumun, komitelerindeki doğrulayıcı diziniyle eşleştiği bir doğrulayıcı bit listesi; değer (0/1), doğrulayıcının `veri`yi imzalayıp imzalamadığını gösterir (yani, aktif olup olmadıklarını ve blok önericisiyle aynı fikirde olup olmadıklarını)
- `veri`: aşağıda tanımlandığı gibi, tasdikle ilgili ayrıntılar
- `imza`: bireysel doğrulayıcıların imzalarını bir araya getiren bir BLS imzası

Tasdik eden bir doğrulayıcının ilk görevi `veri`yi oluşturmaktır. `veri` aşağıdaki bilgileri içerir:

- `yuva`: Tasdikin atıfta bulunduğu yuva numarası
- `indeks`: Belirli bir yuvada doğrulayıcının hangi komiteye ait olduğunu tanımlayan bir sayı
- `beacon_block_root`: Doğrulayıcının zincirin başında gördüğü bloğun kök karması (çatal seçim algoritmasını uygulamanın sonucu)
- `kaynak`: Doğrulayıcıların en son gerekçelendirilmiş blok olarak neyi gördüğünü belirten kesinlik oyunun bir parçası
- `hedef`: Doğrulayıcıların mevcut dönemdeki ilk blok olarak neyi gördüğünü belirten kesinlik oyunun bir parçası

`veri` oluşturulduktan sonra, doğrulayıcı katıldığını göstermek için `aggregation_bits` içinde kendi doğrulayıcı indeksine karşılık gelen biti 0'dan 1'e çevirebilir.

Son olarak, doğrulayıcı tasdiki imzalar ve ağa yayınlar.

### Toplanmış tasdik {#aggregated-attestation}

Bu veriyi ağ üzerinde her bir doğrulayıcı için dolaştırmanın önemli bir ek masrafı vardır. Sonuç olarak, tekil doğrulayıcılardan gelen tasdikler daha geniş olarak yayınlanmadan önce alt ağlar içerisinde toplanır. Bu, imzaların bir araya getirilmesini içerir, böylece yayınlanan bir tasdik, mutabakat `verisi`ni ve bu `veri` ile aynı fikirde olan tüm doğrulayıcıların imzalarının birleştirilmesiyle oluşturulan tek bir imzayı içerir. Bu, `aggregation_bits` kullanılarak kontrol edilebilir çünkü bu, (kimliği `veri`de sağlanan) komitelerindeki her doğrulayıcının indeksini sağlar ve bu da bireysel imzaları sorgulamak için kullanılabilir.

Her dönemde, her bir alt ağdaki 16 doğrulayıcı `toplayıcı` olarak seçilir. Toplayıcılar, dedikodu ağı üzerinden duydukları ve kendilerininkiyle eşdeğer `veri`ye sahip olan tüm tasdikleri toplar. Eşleşen her tasdikin göndericisi `aggregation_bits`e kaydedilir. Toplayıcılar sonrasında topladıkları tasdikleri daha geniş bir ağa yayımlar.

Bir doğrulayıcı blok önericisi olmak için seçildiğinde yeni bloktaki en son yuvaya kadar alt ağlardaki tasdik toplamlarını paketler.

### Tasdik dahil etme yaşam döngüsü {#attestation-inclusion-lifecycle}

1. Oluşum
2. Yayım
3. Birleştirme
4. Yayım
5. Dahil etme

Tasdik yaşam döngüsü aşağıdaki şemada belirtilmiştir:

![tasdik yaşam döngüsü](./attestation_schematic.png)

## Ödüller {#rewards}

Doğrulayıcılar tasdikler bildirdikleri için ödül alırlar. Tasdik ödülü, katılım etiketlerine (kaynak, hedef ve baş), ana ödüle ve katılım oranına bağlıdır.

Katılım etiketlerinin her biri gönderilen tasdiklere ve dahil etme gecikmesine bağlı olarak doğru ya da yanlış olabilir.

En iyi senaryo, üç etiketin de doğru olduğu senaryodur; bu durumda da doğrulayıcının kazanacağı miktar şu şekildedir (doğru etiket başına):

`ödül += ana ödül * etiket ağırlığı * etiket tasdikleme oranı / 64`

Etiket tasdikleme oranı, belirlenmiş etiketi tasdikleyen tüm doğrulayıcıların toplam bakiyesinin toplam aktif bakiyeyle karşılaştırılmasıyla elde edilir.

### Temel ödül {#base-reward}

Ana ödül tasdik veren doğrulayıcıların ve onların etkili hisselenmiş ether bakiyelerine göre hesaplanır:

`temel ödül = doğrulayıcı etkin bakiyesi x 2^6 / KAREKÖK(Tüm aktif doğrulayıcıların etkin bakiyesi)`

#### Dahil etme gecikmesi {#inclusion-delay}

Doğrulayıcılar zincirin başı (`blok n`) için oy kullandığı sırada, `blok n+1` henüz önerilmemişti. Bu nedenle, tasdikler doğal olarak **bir blok sonra** dahil edilir, bu yüzden zincirin başı olarak `blok n`'ye oy veren tüm tasdikler `blok n+1`'e dahil edilir ve **dahil etme gecikmesi** 1 olur. Eğer dahil etme gecikmesi iki yuvaya katlanırsa, tasdik ödülü yarılanır çünkü tasdik ödülünü hesaplamak için ana ödül dahil etme gecikmesinin tersi ile çarpılır.

### Tasdik senaryoları {#attestation-scenarios}

#### Eksik Oy Kullanan Doğrulayıcı {#missing-voting-validator}

Doğrulayıcıların tasdiklerini bildirmeleri için maksimum 1 dönemleri vardır. Eğer dönem 0'da tasdik kaçırıldıysa, dönem 1'de dahil etme gecikmesi ile bildirebilirler.

#### Eksik Toplayıcı {#missing-aggregator}

Dönem başına toplam 16 Toplayıcı bulunmaktadır. Ayrıca, rastgele doğrulayıcılar **256 dönem boyunca iki alt ağa** abone olur ve toplayıcıların eksik olması durumunda yedek olarak görev yapar.

#### Eksik blok önericisi {#missing-block-proposer}

Bazı durumlarda şanslı bir toplayıcının aynı zamanda blok önericisi olabileceğini unutmayın. Eğer tasdik blok önericisi kaybolduğu için dahil edilmeseydi, sıradaki blok önericisi toplanmış tasdiki alıp sıradaki bloka dahil edebilirdi. Ancak, **dahil etme gecikmesi** bir artacaktır.

## Daha fazla kaynak {#further-reading}

- [Vitalik'in açıklamalı mutabakat spesifikasyonundaki Tasdikler](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info'daki Tasdikler](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
