---
title: Bir ERC-721 piyasası nasıl uygulanır
description: Tokenlaştırılmış öğeler merkeziyetsiz bir ilan panosunda nasıl satışa çıkarılır
author: "Alberto Cuesta Cañada"
tags: ["akıllı sözleşmeler", "erc-721", "solidity", "token'lar"]
skill: intermediate
breadcrumb: ERC-721 piyasası
lang: tr
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Bu makalede, Ethereum Blokzinciri için Craigslist'i nasıl kodlayacağınızı göstereceğim.

Gumtree, Ebay ve Craigslist'ten önce, ilan panoları çoğunlukla mantar veya kağıttan yapılırdı. Okul koridorlarında, gazetelerde, sokak lambalarında, vitrinlerde ilan panoları vardı.

İnternet ile her şey değişti. Belirli bir ilan panosunu görebilen insan sayısı katlanarak arttı. Bununla birlikte, temsil ettikleri piyasalar çok daha verimli hale geldi ve küresel boyuta ulaştı. Ebay, kökenleri bu fiziksel ilan panolarına dayanan devasa bir işletmedir.

Blokzincir ile bu piyasalar bir kez daha değişmeye hazırlanıyor, size nasıl olacağını göstereyim.

## Para Kazanma {#monetization}

Herkese açık bir blokzincir ilan panosunun iş modeli, Ebay ve benzeri şirketlerinkinden farklı olmalıdır.

İlk olarak, [merkeziyetsizlik açısı](/developers/docs/web2-vs-web3/) var. Mevcut platformların kendi sunucularını sürdürmeleri gerekir. Merkeziyetsiz bir platform kullanıcıları tarafından sürdürülür, bu nedenle çekirdek platformu çalıştırmanın maliyeti platform sahibi için sıfıra düşer.

Sonra, platforma erişim sağlayan web sitesi veya arayüz olan ön uç var. Burada birçok seçenek bulunuyor. Platform sahipleri erişimi kısıtlayabilir ve herkesi kendi arayüzlerini kullanmaya zorlayarak bir ücret talep edebilir. Platform sahipleri ayrıca erişimi açmaya (Güç Halka!) karar verebilir ve herkesin platform için arayüzler oluşturmasına izin verebilir. Veya sahipler bu uç noktaların ortasında herhangi bir yaklaşıma karar verebilir.

_Benden daha vizyoner iş liderleri bundan nasıl para kazanacaklarını bileceklerdir. Tek gördüğüm, bunun mevcut durumdan farklı ve muhtemelen kârlı olduğu._

Ayrıca, otomasyon ve ödemeler açısı da var. Bazı şeyler çok [etkili bir şekilde tokenlaştırılabilir](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) ve bir ilan panosunda alınıp satılabilir. Tokenlaştırılmış varlıklar bir blokzincirde kolayca aktarılır. Oldukça karmaşık ödeme yöntemleri bir blokzincirde kolayca uygulanabilir.

Burada sadece bir iş fırsatı seziyorum. İşletme maliyeti olmayan bir ilan panosu, her işleme dahil edilen karmaşık ödeme yollarıyla kolayca uygulanabilir. Eminim birisi bunu ne için kullanacağı konusunda bir fikir bulacaktır.

Ben sadece bunu inşa etmekten mutluyum. Gelin koda bir göz atalım.

## Uygulama {#implementation}

Bir süre önce, iş senaryosu örnek uygulamaları ve diğer güzellikleri içeren [açık kaynaklı bir depo](https://github.com/HQ20/contracts?ref=hackernoon.com) başlattık, lütfen bir göz atın.

Bu [Ethereum İlan Panosu](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) için kod orada, lütfen onu dilediğiniz gibi kullanın. Sadece kodun denetlenmediğini ve içine para koymadan önce kendi durum tespitinizi yapmanız gerektiğini unutmayın.

Panonun temelleri karmaşık değildir. Panodaki tüm ilanlar sadece birkaç alanı olan bir yapı (struct) olacaktır:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Açık, Gerçekleştirildi, İptal Edildi
}
```

Yani ilanı veren biri var. Satılık bir öğe. Öğe için bir fiyat. Açık, yürütülmüş veya iptal edilmiş olabilen ticaretin durumu.

Tüm bu ticaretler bir eşlemede (mapping) tutulacaktır. Çünkü Solidity'deki her şey bir eşleme gibi görünüyor. Ayrıca kullanışlı olduğu için.

```solidity
mapping(uint256 => Trade) public trades;
```

Bir eşleme kullanmak, yayınlamadan önce her ilan için bir kimlik (id) bulmamız gerektiği ve üzerinde işlem yapabilmemiz için bir ilanın kimliğini bilmemiz gerekeceği anlamına gelir. Akıllı sözleşmede veya ön uçta bununla başa çıkmanın birden fazla yolu vardır. Bazı ipuçlarına ihtiyacınız varsa lütfen sorun.

Sırada, uğraştığımız bu öğelerin ne olduğu ve işlem için ödeme yapmak için kullanılan bu para biriminin ne olduğu sorusu geliyor.

Öğeler için, sadece [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) arayüzünü uygulamalarını isteyeceğiz, ki bu aslında [en iyi dijital varlıklarla çalışmasına](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) rağmen, gerçek dünya öğelerini bir blokzincirde temsil etmenin bir yoludur. Kurucu (constructor) içinde kendi ERC721 sözleşmemizi belirteceğiz, bu da ilan panomuzdaki herhangi bir varlığın önceden tokenlaştırılmış olması gerektiği anlamına gelir.

Ödemeler için de benzer bir şey yapacağız. Çoğu blokzincir projesi kendi [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) kripto parasını tanımlar. Bazıları ise DAI gibi ana akım bir kripto para kullanmayı tercih eder. Bu ilan panosunda, sadece oluşturma aşamasında para biriminizin ne olacağına karar vermeniz gerekir. Çok kolay.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Sona yaklaşıyoruz. İlanlarımız, ticaret için öğelerimiz ve ödemeler için bir para birimimiz var. Bir ilan vermek, hem ona sahip olduğunuzu hem de muhtemelen farklı bir panoda iki kez yayınlamadığınızı göstermek için bir öğeyi emanete (escrow) koymak anlamına gelir.

Aşağıdaki kod tam olarak bunu yapar. Öğeyi emanete koyar, ilanı oluşturur ve bazı düzenleme işlemlerini yapar.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Ticareti kabul etmek, bir ilan (ticaret) seçmek, fiyatı ödemek ve öğeyi almak anlamına gelir. Aşağıdaki kod bir ticareti alır. Uygun olup olmadığını kontrol eder. Öğeyi öder. Öğeyi alır. İlanı günceller.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Son olarak, satıcıların bir alıcı kabul etmeden önce ticaretten vazgeçmeleri için bir seçeneğimiz var. Bazı modellerde, ilanlar süresi dolmadan önce belirli bir süre yayında kalır. Piyasanızın tasarımına bağlı olarak seçim sizin.

Kod, bir ticareti yürütmek için kullanılana çok benzer, tek fark el değiştiren bir para birimi olmaması ve öğenin ilanı verene geri dönmesidir.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

İşte bu kadar. Uygulamanın sonuna geldiniz. Bazı iş konseptlerinin kodla ifade edildiğinde ne kadar kompakt olduğu oldukça şaşırtıcıdır ve bu da o durumlardan biridir. [Depomuzdaki](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) tam sözleşmeyi inceleyin.

## Sonuç {#conclusion}

İlan panoları, internet ile devasa bir şekilde ölçeklenen ve birkaç tekelci kazananı olan son derece popüler bir iş modeli haline gelen yaygın bir piyasa yapılandırmasıdır.

İlan panoları aynı zamanda, mevcut devlere meydan okumayı mümkün kılacak çok özel özelliklerle bir blokzincir ortamında kopyalanması kolay bir araçtır.

Bu makalede, bir ilan panosu işinin ticari gerçekliği ile teknolojik uygulama arasında bir köprü kurmaya çalıştım. Bu bilgi, doğru becerilere sahipseniz bir vizyon ve uygulama için bir yol haritası oluşturmanıza yardımcı olacaktır.

Her zaman olduğu gibi, eğlenceli bir şeyler inşa etmek istiyorsanız ve biraz tavsiye isterseniz, lütfen [bana yazın](https://albertocuesta.es/)! Yardımcı olmaktan her zaman mutluluk duyarım.