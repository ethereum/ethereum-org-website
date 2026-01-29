---
title: "Akıllı sözleşme birleştirilebilirliği"
description: "Akıllı sözleşmelerin, mevcut bileşenleri yeniden kullanarak karmaşık merkeziyetsiz uygulamalar oluşturmak için Lego blokları gibi nasıl birleştirilebileceğini öğrenin."
lang: tr
incomplete: true
---

## Kısa bir giriş {#a-brief-introduction}

Akıllı sözleşmeler Ethereum üzerinde herkese açıktır ve açık API'ler olarak düşünülebilirler. Bir dapp geliştiricisi olmak için kendi akıllı sözleşmenizi yazmanız gerekmez, sadece onlarla nasıl etkileşime geçebileceğinizi bilmelisiniz. Örneğin, uygulamanızdaki tüm jeton takas mantığını yönetmek için merkeziyetsiz bir borsa olan [Uniswap](https://uniswap.exchange/swap)'in mevcut akıllı sözleşmelerini kullanabilirsiniz – sıfırdan başlamanız gerekmez. [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) ve [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) sözleşmelerinden bazılarına göz atın.

## Birleştirilebilirlik nedir? {#what-is-composability}

Birleştirilebilirlik, yeni sistemler veya çıktılar oluşturmak için farklı bileşenleri bir araya getirmektir. Yazılım geliştirmede, birleştirilebilirlik, geliştiricilerin yeni uygulamalar oluşturmak için mevcut yazılım bileşenlerini yeniden kullanabilecekleri anlamına gelir. Birleştirilebilirliği anlamanın iyi bir yolu, birleştirilebilir öğeleri, Lego blokları olarak düşünmektir. Her Lego başka bir Lego ile birleştirilebilir ve farklı Legoları birleştirerek karmaşık yapılar oluşturmanıza olanak tanır.

Ethereum'da her akıllı sözleşme bir tür Lego'dur; diğer projelerden akıllı sözleşmeleri projeniz için yapı taşları olarak kullanabilirsiniz. Bu, tekerleği yeniden icat etmek veya sıfırdan inşa etmek için zaman harcamanıza gerek olmadığı anlamına gelir.

## Birleştirilebilirlik nasıl çalışır? {#how-does-composability-work}
Ethereum akıllı sözleşmeleri, genel API'ler gibidir, bu nedenle herkes sözleşmeyle etkileşime girebilir veya ek işlevsellik için bunları dapp'lere entegre edebilir. Akıllı sözleşme oluşturulabilirliği genellikle üç ilkeye dayalı olarak çalışır: modülerlik, özerklik ve keşfedilebilirlik:

**1. Modülerlik**: Bu, ayrı bileşenlerin belirli bir görevi yerine getirme yeteneğidir. Ethereum'da her akıllı sözleşmenin belirli bir kullanım durumu vardır (Uniswap örneğinde gösterildiği gibi).

**2. Otonomi**: Birleştirilebilir bileşenler bağımsız olarak çalışabilmelidir. Ethereum'daki her akıllı sözleşme kendi kendini yürütür ve sistemin diğer bölümlerine güvenmeden çalışabilir.

**3. Keşfedilebilirlik**: Geliştiriciler, kamuya açık olmadıkları takdirde harici sözleşmeleri çağıramaz veya yazılım kütüphanelerini uygulamalara entegre edemezler. Tasarım gereği, akıllı sözleşmeler açık kaynaklıdır; herkes bir akıllı sözleşme çağırabilir veya bir kod tabanını çatallayabilir.

## Birleştirilebilirliğin faydaları {#benefits-of-composability}

### Daha kısa geliştirme döngüsü {#shorter-development-cycle}

Birleştirilebilirlik, geliştiricilerin [merkeziyetsiz uygulamalar](/apps/#what-are-dapps) oluştururken yapması gereken işi azaltır. [Naval Ravikant'ın belirttiği gibi:](https://twitter.com/naval/status/1444366754650656770) "Açık kaynak, her sorunun bir kez çözülmesi gerektiği anlamına gelir."

Bir sorunu çözen akıllı bir sözleşme varsa, diğer geliştiriciler onu yeniden kullanabilir, böylece aynı sorunu çözmeleri gerekmez. Bu şekilde, geliştiriciler mevcut yazılım kitaplıklarını alabilir ve yeni dapp'ler oluşturmak için ekstra işlevsellik ekleyebilir.

### Daha fazla inovasyon {#greater-innovation}

Birleştirilebilirlik, yenilikçiliği ve denemeyi teşvik eder çünkü geliştiriciler, istenen sonuçları oluşturmak için açık kaynak kodunu yeniden kullanmakta, değiştirmekte, çoğaltmakta veya entegre etmekte özgürdür. Sonuç olarak, geliştirme ekipleri temel işlevlere daha az zaman harcar ve yeni özellikleri denemeye daha fazla zaman ayırabilir.

### Daha iyi kullanıcı deneyimi {#better-user-experience}

Ethereum ekosisteminin bileşenleri arasındaki birlikte çalışabilirlik, kullanıcı deneyimini geliştirir. Dapp'ler harici akıllı sözleşmeleri entegre ettiğinde, uygulamaların iletişim kuramadığı parçalanmış bir ekosisteme kıyasla kullanıcılar daha fazla işlevselliğe erişebilir.

Birlikte çalışabilirliğin faydalarını göstermek için arbitraj ticaretinden bir örnek kullanacağız:

Bir jeton `A borsası`nda `B borsası`ndan daha yüksek işlem görüyorsa, kâr etmek için fiyat farkından yararlanabilirsiniz. Ancak, bunu yalnızca işlemi finanse edecek yeterli sermayeniz varsa yapabilirsiniz (yani, jetonu `B borsası`ndan satın alıp `A borsası`nda satmak).

Alım satımı karşılamak için yeterli paranızın olmadığı bir senaryoda, anlık kredi ideal olabilir. [Flaş krediler](/defi/#flash-loans) oldukça tekniktir, ancak temel fikir, varlıkları (teminatsız) ödünç alabilmeniz ve aynı varlıkları _tek_ bir işlem içinde iade edebilmenizdir.

İlk örneğimize dönecek olursak; bir arbitraj yatırımcısı, aynı işlem içerisinde, büyük miktarda flaş kredi alabilir, `B borsası`ndan jeton satın alabilir, bunları `A borsası`nda satabilir, anaparayı + faizi geri ödeyebilir ve kârı elinde tutabilir. Bu karmaşık mantık, çağrıları birden fazla sözleşmeye birleştirmeyi gerektirir; bu, akıllı sözleşmelerin birlikte çalışabilirliği olmasaydı mümkün olmazdı.

## Ethereum'da birleştirilebilirlik örnekleri {#composability-in-ethereum}

### Jeton takasları {#token-swaps}

İşlemlerin ETH'de ödenmesini gerektiren bir dapp oluşturursanız, token takas mantığını entegre ederek kullanıcıların diğer ERC-20 tokenlerinde ödeme yapmasına izin verebilirsiniz. Sözleşme çağrılan işlevi yürütmeden önce kod, kullanıcının tokenini otomatik olarak ETH'ye dönüştürür.

### Yönetişim {#governance}

Bir [DAO](/dao/) için özel yönetişim sistemleri oluşturmak pahalı ve zaman alıcı olabilir. Bunun yerine, DAO'nuzu başlatmak ve hızlı bir şekilde bir yönetişim çerçevesi oluşturmak için [Aragon Client](https://client.aragon.org/) gibi açık kaynaklı bir yönetişim araç setini kullanabilirsiniz.

### Kimlik yönetimi {#identity-management}

Özel bir kimlik doğrulama sistemi oluşturmak veya merkezi sağlayıcılara güvenmek yerine, kullanıcılar için kimlik doğrulamayı yönetmek için merkezi olmayan kimlik (DID) araçlarını entegre edebilirsiniz. Buna bir örnek, kullanıcıların bir Ethereum cüzdanı ile kimliklerini doğrulamasına olanak tanıyan "Ethereum ile Oturum Aç" işlevini sunan açık kaynaklı bir araç seti olan [SpruceID](https://www.spruceid.com/)'dir.

## İlgili öğreticiler {#related-tutorials}

- [create-eth-app ile merkeziyetsiz uygulama ön yüz geliştirmeye bir adım önde başlayın](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Popüler akıllı sözleşmelerle kullanıma hazır uygulamalar oluşturmak için create-eth-app'in nasıl kullanılacağına dair genel bir bakış._

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

- [Birleştirilebilirlik İnovasyondur](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Web3 İçin Birleştirilebilirlik Neden Önemlidir?](https://hackernoon.com/why-composability-matters-for-web3)
- [Birleştirilebilirlik Nedir?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
