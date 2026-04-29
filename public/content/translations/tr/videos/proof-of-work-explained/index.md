---
title: "İş kanıtı nedir?"
description: "Madencilerin işlemleri doğrulamak ve blokzincir ağını güvence altına almak için kriptografik bulmacaları nasıl çözdükleri de dâhil olmak üzere İş Kanıtı (PoW) mutabakat mekanizmasının yeni başlayanlara uygun bir açıklaması."
lang: tr
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "mutabakat"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "İş Kanıtı"
---

**Binance Academy** tarafından hazırlanan; kökenleri, madencilerin kriptografik bulmacaları çözmek için nasıl rekabet ettikleri ve blokzincir ağını nasıl güvence altına aldığı da dâhil olmak üzere İş Kanıtı (PoW) mutabakat mekanizmasını kapsayan bir açıklayıcı metin.

*Bu transkript, Binance Academy tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=3EUAcxhuoU4) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### İş kanıtının kökenleri (0:00) {#origins-of-proof-of-work-000}

Kökeni 1993 yılına dayanan iş kanıtı konsepti, hizmet kullanıcısından bir miktar iş (genellikle bir bilgisayarın işlem süresi anlamına gelir) gerektirerek bir ağ üzerindeki hizmet reddi saldırılarını ve spam gibi diğer hizmet suistimallerini önlemek için geliştirilmiştir.

2009 yılında Bitcoin, işlemleri doğrulamak ve blokzincire yeni bloklar yayınlamak için iş kanıtını bir mutabakat algoritması olarak kullanmanın yenilikçi bir yolunu tanıttı. O zamandan beri yayılarak birçok kripto parada yaygın olarak kullanılan bir mutabakat algoritması hâline geldi.

#### İş kanıtı nasıl çalışır (0:33) {#how-proof-of-work-works-033}

Kısacası, bir ağ üzerindeki madenciler karmaşık hesaplama bulmacalarını çözmek için birbirleriyle rekabet ederler. Bu bulmacaları çözmek zordur ancak biri doğru çözümü bulduğunda doğrulaması kolaydır.

Bir madenci bulmacanın çözümünü bulduğunda, bloğu ağa yayınlayabilir ve burada diğer tüm madenciler çözümün doğru olduğunu doğrular.

#### Bitcoin madencilik örneği (0:56) {#bitcoin-mining-example-056}

Bitcoin, merkeziyetsiz düğümlerin kolektif çalışmasıyla sürdürülen blokzincir tabanlı bir sistemdir. Bu düğümlerden bazıları madenci olarak bilinir ve blokzincire yeni bloklar eklemekten sorumludur.

Bunu yapmak için madencilerin nonce olarak bilinen sözde rastgele bir sayıyı denemesi ve tahmin etmesi gerekir. Bu sayı, blokta sağlanan verilerle birleştirilip bir hash fonksiyonundan geçirildiğinde, belirli koşullarla eşleşen bir sonuç üretmelidir; örneğin, dört sıfırla başlayan bir hash.

Eşleşen bir sonuç bulunduğunda, diğer düğümler sonucun geçerliliğini doğrular ve madenci düğüm blok ödülü ile ödüllendirilir. Bu nedenle, ilk olarak geçerli bir nonce bulmadan ana zincire yeni bir blok eklemek imkânsızdır; bu da o belirli blok için blok hash'i adı verilen çözümü üretir.

#### Neden "iş kanıtı" olarak adlandırılıyor (1:46) {#why-its-called-proof-of-work-146}

Doğrulanan her blok, madenci tarafından yapılan işi temsil eden bir blok hash'i içerir. Bu yüzden buna iş kanıtı denir.

#### Güvenlik avantajları (1:54) {#security-benefits-154}

İş kanıtı, ağı çok sayıda farklı saldırıya karşı korumaya yardımcı olur. Başarılı bir saldırı, hesaplamaları yapmak için çok fazla hesaplama gücü ve çok fazla zaman gerektirir. Bu nedenle, ortaya çıkan maliyet ağa saldırmanın potansiyel ödüllerinden daha büyük olacağı için verimsiz olacaktır.

#### Sınırlamalar (2:10) {#limitations-210}

İş kanıtı ile ilgili bir sorun, madenciliğin büyük miktarda güç tüketen pahalı bilgisayar donanımı gerektirmesidir. Karmaşık algoritma hesaplamaları ağın güvenliğini garanti etse de, bu hesaplamalar bunun ötesinde kullanılamaz.

#### Geleceğe bakış (2:25) {#looking-ahead-225}

İş kanıtı en verimli çözüm olmasa da, blokzincirlerde mutabakata varmanın en popüler yöntemlerinden biri olmaya devam etmektedir. Hâlihazırda bu sorunları çözmeye çalışan alternatif yöntemler ve yaklaşımlar mevcuttur, ancak iş kanıtının halefinin hangi yöntem olacağını sadece zaman gösterecektir.