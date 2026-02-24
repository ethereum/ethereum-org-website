---
title: "Bir ERC-721 pazarı nasıl uygulanır"
description: "Merkeziyetsiz bir ilan panosunda token'laştırılmış ürünler nasıl satışa sunulur"
author: "Alberto Cuesta Cañada"
tags:
  [
    "akıllı kontratlar",
    "erc-721",
    "solidity",
    "token'lar"
  ]
skill: intermediate
lang: tr
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Bu makalede, Ethereum blok zinciri için Craigslist'in nasıl kodlanacağını göstereceğim.

Gumtree, Ebay ve Craigslist'ten önce, ilan panoları çoğunlukla mantar veya kağıttan yapılmıştır. Okul koridorlarında, gazetelerde, sokak lambalarında ve vitrinlerde ilan panoları bulunurdu.

Bunların tamamı internet ile değişti. Belirli bir ilan panosunu görebilen kişi sayısı, çok büyük miktarda katlanarak arttı. Böylece temsil ettikleri pazarlar çok daha verimli hâle geldi ve küresel boyuta ölçeklendi. Ebay, kökeni bu fiziksel ilan panolarına kadar dayanan devasa bir işletmedir.

Blok zinciri ile bu pazarlar bir kez daha değişmeye hazır, size nasıl olduğunu göstereyim.

## Para Kazanma {#monetization}

Halka açık bir blok zinciri ilan panosunun iş modelinin Ebay'den ve bir şirketten farklı olması gerekecektir.

Öncelikle, [merkeziyetsizleştirme açısı](/developers/docs/web2-vs-web3/) vardır. Mevcut platformların kendi sunucularını sürdürmesi gerekir. Merkeziyetsiz bir platform kullanıcıları tarafından sürdürüldüğü için çekirdek platformu çalıştırmanın maliyeti, platform sahibi için sıfıra düşer.

Ardından, platforma erişim sağlayan ön uç, web sitesi veya arayüz bulunuyor. Burada birçok seçenek bulunur. Platform sahipleri, erişimi kısıtlayabilir ve bir ücret karşılığında herkesi kendi arayüzünü kullanmaya zorlayabilir. Platform sahipleri ayrıca erişimi açmaya karar verebilir (Güç Halkındır!) ve herkesin platforma arayüzler oluşturmasına izin verebilir. Veya mal sahipleri, bu aşırı uçların ortasında herhangi bir yaklaşıma karar verebilir.

_Benden daha fazla vizyona sahip iş liderleri bundan nasıl para kazanılacağını bilirler. Tek gördüğüm şey, bunun statükodan farklı olduğu ve büyük ihtimalle bundan para kazanılabileceğidir._

Bir de otomasyon ve ödeme açısı var. Bazı şeyler çok [etkili bir şekilde tokenleştirilebilir](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) ve bir seri ilanlar panosunda takas edilebilir. Token'laştırılmış varlıklar bir blok zincirinde kolayca aktarılır. Son derece karmaşık ödeme yöntemleri bir blok zincirinde kolayca uygulanabilir.

Burada bir iş fırsatı kokusu alıyorum. İşletme maliyeti olmayan bir ilan panosu, her işleme dahil edilen karmaşık ödeme yollarıyla kolayca uygulanabilir. Eminim birileri bunu ne için kullanacağına dair bir fikir bulacaktır.

Bunu inşa etmenin verdiği mutluluk benim için yeterli. Hadi koda bir göz atalım.

## Uygulama {#implementation}

Bir süre önce, iş durumu örnek uygulamaları ve diğer güzellikleri içeren bir [açık kaynaklı depo](https://github.com/HQ20/contracts?ref=hackernoon.com) başlattık, lütfen bir göz atın.

Bu [Ethereum Seri İlanlar Panosu](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) için kod orada, lütfen kullanın ve dilediğiniz gibi faydalanın. Sadece kodun denetlenmediğini ve işin içine para katmadan önce kendi durum tespitinizi yapmanız gerektiğini unutmayın.

Panonun temelleri karmaşık değildir. Panodaki tüm reklamlar sadece birkaç alana sahip bir yapı olacaktır:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Açık, Yürütüldü, İptal Edildi
}
```

İlanı yayınlayan biri var. Satılık bir ürün. Ürünün fiyatı. Açık, gerçekleştirilmiş veya iptal edilmiş olabilen işlemin durumu.

Tüm bu işlemler bir eşleştirme içerisinde tutulacaktır. Çünkü Solidity'deki her şey bir eşleştirme gibi görünüyor. Ayrıca rahat olduğu için.

```solidity
mapping(uint256 => Trade) public trades;
```

Eşleştirme kullanmak, yayınlamadan önce her reklam için bir kimlik bulmamız gerektiği anlamına gelir ve üzerinde işlem yapabilmemiz için bir reklamın kimliğini bilmemiz gerekir. Akıllı sözleşmede veya ön uçta bununla başa çıkmanın birden fazla yolu vardır. Lütfen yardıma ihtiyacınız varsa sormaktan çekinmeyin.

Ardından, ilgilendiğimiz bu öğelerin neler olduğu ve işlem için ödeme yapmak için kullanılan bu para biriminin ne olduğu sorusu geliyor.

Öğeler için yalnızca, gerçek dünyadaki öğeleri bir blokzincirde temsil etmenin bir yolu olan [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) arayüzünü uygulamalarını isteyeceğiz; her ne kadar [dijital varlıklarla en iyi şekilde çalışsa da](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Yapıcıda kendi ERC721 sözleşmemizi belirteceğiz, yani ilan panomuzdaki herhangi bir varlığın önceden token'laştırılmış olması gerekir.

Ödemeler için de benzer bir şey yapacağız. Çoğu blokzincir projesi kendi [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) kripto parasını tanımlar. Bazıları ise DAI gibi bir ana akım parayı kullanmayı tercih ediyor. Bu ilan panosunda, inşa sırasında para biriminize karar vermeniz yeterli olur. Kolay.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Az kaldı. Reklamlarımız, ticaret için öğelerimiz ve ödemeler için bir para birimimiz var. Bir reklam yapmak, bir öğeyi hem ona sahip olduğunuzu hem de muhtemelen farklı bir panoda iki kez yayınlamadığınızı göstermek için emanete koymak anlamına gelir.

Aşağıdaki kod tam olarak onu yapar. Eşyayı emanete koyar, reklamı yaratır ve biraz bakım yapar.

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

Ticareti kabul etmek; bir reklam (ticaret) seçmek, fiyatı ödemek ve ürünü almak anlamına gelir. Aşağıdaki kod, bir ticaret işlemini alır. Uygun olup olmadığını kontrol eder. Öğeyi verir. Öğeyi alır. Reklamı günceller.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Ticaret Açık değil.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Son olarak, bir alıcı kabul etmeden önce satıcıların bir ticaretten vazgeçme seçeneğimiz var. Bazı modellerde, reklamlar süresi dolmadan önce belirli bir süre yayında olur. Pazarınızın tasarımına bağlı olarak tercihinize kalmıştır.

Kod, bir işlemi gerçekleştirmek için kullanılana çok benzer, yalnızca el değiştiren para yoktur ve öğe reklam yayınlayana geri döner.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Ticaret sadece gönderen tarafından iptal edilebilir."
  );
  require(trade.status == "Open", "Ticaret Açık değil.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Bu kadar. Uygulamanın sonuna geldiniz. Kodla ifade edildiğinde bazı iş kavramlarının ne kadar kısa olduğu oldukça şaşırtıcıdır ve bu da o durumlardan biridir. Sözleşmenin tamamını [depomuzda](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) kontrol edin.

## Sonuç {#conclusion}

İlan panoları, internet ile büyük miktarda ölçeklenen ve oldukça az tekel niteliğinde kazananla son derece popüler bir iş modeli hâline gelen ortak bir pazar yapılandırmasıdır.

İlan panoları, mevcut devlere meydan okumayı mümkün kılacak çok özel özelliklerle, bir blok zinciri ortamında çoğaltılması kolay bir araçtır.

Bu makalede, bir ilan panosu işinin ticari gerçekliği ile teknolojik uygulama arasında köprü kurmaya çalıştım. Bu bilgi, doğru becerilere sahipseniz, bir vizyon ve uygulama için bir yol haritası oluşturmanıza yardımcı olacaktır.

Her zaman olduğu gibi, eğlenceli bir şeyler inşa ediyorsanız ve tavsiye isterseniz, lütfen [bana ulaşın](https://albertocuesta.es/)! Her zaman yardımcı olmaktan memnuniyet duyarım.
