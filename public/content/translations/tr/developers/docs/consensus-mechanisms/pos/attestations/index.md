---
title: Tasdikler
description: Hisse ispatı Ethereum'da tasdikler üzerine bir açıklama.
lang: tr
---

Bir doğrulayıcının her dönemde bir tasdik oluşturması, imzalaması ve yayınlaması beklenir. Bu sayfa tasdiklerin ne gibi göründüğünü ve fikir birliği istemcileri arasında nasıl işlendiğini ve iletildiğini belirtir.

## Tasdik nedir? {#what-is-an-attestation}

Her [dönemde](/glossary/#epoch) (6,4 dakika) bir doğrulayıcı ağa bir tasdik önerir. Bu tasdik, dönemdeki spesifik bir yuva içindir. Tasdikin amacı doğrulayıcının zincir görüşü yani spesifik olarak en son haklı görülen blok ile mevcut dönemdeki ilk blok (`source` ve `target` kontrol noktaları olarak bilinir) için oy vermektir. Bu bilgi tüm katılım sağlayan doğrulayıcılar için birleştirilir ve ağın blok zincirin mevcut durumu üzerinde mutabakata varmasını sağlar.

Bu tasdik şu bileşenleri içerir:

- `aggregation_bits`: komitelerindeki doğrulayıcı endeksi ile eşleşen pozisyonun bulunduğu bir doğrulayıcı bit listesi; değer (0/1) doğrulayıcının `data` imzalayıp imzalamadığını gösterir (yani aktif olup olmadıklarını ve blok önericisi ile anlaşıp anlaşmadığını)
- `data`: aşağıda tanımlandığı gibi, tasdik ile alakalı ayrıntılar
- `signature`: tekil doğrulayıcıların imzalarını toplayan bir BLS imzası

Tasdikleyici bir doğrulayıcı için ilk görev `data` inşasıdır. Bu `data` aşağıdaki bilgileri içerir:

- `slot`: Tasdikin değindiği yuva numarası
- `index`: Verilen bir yuvadaki doğrulayıcının hangi kurula ait olduğunu belirten bir sayı
- `beacon_block_root`: Doğrulayıcının zincirin başında gördüğü blokun kök şifresi (çatal seçim algoritmasının uygulanmasının sonucu)
- `source`: Doğrulayıcıların neyi en güncel kabul edilebilir blok olarak gördüğünü belirten kesinlik oyunun bir kısmı
- `target`: Doğrulayıcıların neyi mevcut dönemin ilk bloku olarak gördüğünü belirten kesinlik oyunun bir kısmı

`data` inşa edildiğinde, doğrulayıcı `aggregation_bits` içinde kendi doğrulayıcı endeksine denk gelen biti 0'dan 1'e ters çevirerek katılım sağladığını gösterebilir.

Son olarak, doğrulayıcı tasdiki imzalar ve ağa yayınlar.

### Toplanmış tasdik {#aggregated-attestation}

Bu veriyi ağ üzerinde her bir doğrulayıcı için dolaştırmanın önemli bir ek masrafı vardır. Sonuç olarak, tekil doğrulayıcılardan gelen tasdikler daha geniş olarak yayınlanmadan önce alt ağlar içerisinde toplanır. Bu, imzaların birlikte toplanmalarını içerir; bu sayede, yayınlanan bir tasdik, mutabakat `data`'sını ve tüm doğrulayıcıların `data` ile mutabakatta olduğu tüm imzaları birleştiren tek bir imzadan oluşur. Bu `aggregation_bits` kullanılarak kontrol edilebilir çünkü bu kendi komitesindeki (kimliği `data` içinde bulunur) her bir doğrulayıcının endeksini sağlar, bu da tekil imzaları sorgulamak için kullanılabilir.

Her dönemde her bir alt ağdaki 16 doğrulayıcı, `toplayıcı` olarak seçilir. Toplayıcılar dedikodu ağından duydukları ve kendi `verilerine` eşdeğer olan tüm tasdikleri toplar. Her uyumlu tasdikin göndericisi `aggregation_bits` içerisinde kaydedilir. Toplayıcılar sonrasında topladıkları tasdikleri daha geniş bir ağa yayımlar.

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

### Ana ödül {#base-reward}

Ana ödül tasdik veren doğrulayıcıların ve onların etkili hisselenmiş ether bakiyelerine göre hesaplanır:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Dahil etme gecikmesi {#inclusion-delay}

Doğrulayıcıların zincirin başı üzerine oylama yaptığı zamanda (`block n`), `block n+1` henüz önerilmemişti. Sonuç olarak tasdikler doğal olarak **bir blok sonra** dahil edilmektedir yani zincirin başı olan `block n` üzerinde oylayan tüm tasdikler `block n+1` içinde dahil edilmiştir ve **dahil etme gecikmesi** 1'dir. Eğer dahil etme gecikmesi iki yuvaya katlanırsa, tasdik ödülü yarılanır çünkü tasdik ödülünü hesaplamak için ana ödül dahil etme gecikmesinin tersi ile çarpılır.

### Tasdik senaryoları {#attestation-scenarios}

#### Kayıp Oylayan Doğrulayıcı {#missing-voting-validator}

Doğrulayıcıların tasdiklerini bildirmeleri için maksimum 1 dönemleri vardır. Eğer dönem 0'da tasdik kaçırıldıysa, dönem 1'de dahil etme gecikmesi ile bildirebilirler.

#### Kayıp Toplayıcı {#missing-aggregator}

Dönem başına toplam 16 Toplayıcı bulunmaktadır. Ek olarak, rastgele doğrulayıcılar **256 dönem için 2 alt ağa** abone olurlar ve toplayıcıların kayıp olduğu bir duruma karşı yedek olarak davranırlar.

#### Kayıp blok önericisi {#missing-block-proposer}

Bazı durumlarda şanslı bir toplayıcının aynı zamanda blok önericisi olabileceğini unutmayın. Eğer tasdik blok önericisi kaybolduğu için dahil edilmeseydi, sıradaki blok önericisi toplanmış tasdiki alıp sıradaki bloka dahil edebilirdi. Ancak, **dahil etme gecikmesi** bir artardı.

## Daha fazla bilgi {#further-reading}

- [Vitalik'in açıklamalı mutabakat özelliklerindeki tasdikler](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Eth2book.info içindeki tasdikler](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
