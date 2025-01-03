---
title: Akıllı sözleşme birleştirilebilirliği
description:
lang: tr
incomplete: true
---

## Kısa bir giriş {#a-brief-introduction}

Akıllı sözleşmeler Ethereum üzerinde herkese açıktır ve açık API'ler olarak düşünülebilirler. Bir dapp geliştiricisi olmak için kendi akıllı sözleşmenizi yazmanız gerekmez, sadece onlarla nasıl etkileşime geçebileceğinizi bilmelisiniz. Örneğin, bir merkeziyetsiz borsa olan [Uniswap](https://uniswap.exchange/swap)'ın mevcut akıllı sözleşmelerini uygulamanızdaki tüm token değişim mantığını idare etmek için kullanabilirsiniz: Sıfırdan başlamanız gerekmez. Onların [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) ve [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) sözleşmelerine göz atın.

## Birleştirilebilirlik nedir? {#what-is-composability}

Birleştirilebilirlik, yeni sistemler veya çıktılar oluşturmak için farklı bileşenleri bir araya getirmektir. Yazılım geliştirmede, birleştirilebilirlik, geliştiricilerin yeni uygulamalar oluşturmak için mevcut yazılım bileşenlerini yeniden kullanabilecekleri anlamına gelir. Birleştirilebilirliği anlamanın iyi bir yolu, birleştirilebilir öğeleri, Lego blokları olarak düşünmektir. Her Lego başka bir Lego ile birleştirilebilir ve farklı Legoları birleştirerek karmaşık yapılar oluşturmanıza olanak tanır.

Ethereum'da her akıllı sözleşme bir tür Lego'dur; diğer projelerden akıllı sözleşmeleri projeniz için yapı taşları olarak kullanabilirsiniz. Bu, tekerleği yeniden icat etmek veya sıfırdan inşa etmek için zaman harcamanıza gerek olmadığı anlamına gelir.

## Birleştirilebilirlik nasıl çalışır? {#how-does-composability-work}

Ethereum akıllı sözleşmeleri, genel API'ler gibidir, bu nedenle herkes sözleşmeyle etkileşime girebilir veya ek işlevsellik için bunları dapp'lere entegre edebilir. Akıllı sözleşme oluşturulabilirliği genellikle üç ilkeye dayalı olarak çalışır: modülerlik, özerklik ve keşfedilebilirlik:

**1. Modülerlik**: Bu, ayrı bileşenlerin belirli bir görevi yerine getirme yeteneğidir. Ethereum'da her akıllı sözleşmenin belirli bir kullanım durumu vardır (Uniswap örneğinde gösterildiği gibi).

**2. Otonomi**: Birleştirilebilir bileşenler bağımsız olarak çalışabilmelidir. Ethereum'daki her akıllı sözleşme kendi kendini yürütür ve sistemin diğer bölümlerine güvenmeden çalışabilir.

**3. Keşfedilebilirlik**: Geliştiriciler, genel kullanıma açık değilse, harici sözleşmeler arayamaz veya yazılım kitaplıklarını uygulamalara entegre edemezler. Tasarım gereği, akıllı sözleşmeler açık kaynaklıdır; herkes bir akıllı sözleşme çağırabilir veya bir kod tabanını çatallayabilir.

## Birleştirilebilirliğin faydaları {#benefits-of-composability}

### Daha kısa geliştirme döngüsü {#shorter-development-cycle}

Birleştirilebilirlik, geliştiricilerin [dapps](/dapps/#what-are-dapps) oluştururken yapması gereken işi azaltır. [Naval Ravikant'ın dediği gibi:](https://twitter.com/naval/status/1444366754650656770) "Açık kaynak, her problemin bir kez çözülmesi gerektiği anlamına gelir."

Bir sorunu çözen akıllı bir sözleşme varsa, diğer geliştiriciler onu yeniden kullanabilir, böylece aynı sorunu çözmeleri gerekmez. Bu şekilde, geliştiriciler mevcut yazılım kitaplıklarını alabilir ve yeni dapp'ler oluşturmak için ekstra işlevsellik ekleyebilir.

### Daha fazla yenilik {#greater-innovation}

Birleştirilebilirlik, yenilikçiliği ve denemeyi teşvik eder çünkü geliştiriciler, istenen sonuçları oluşturmak için açık kaynak kodunu yeniden kullanmakta, değiştirmekte, çoğaltmakta veya entegre etmekte özgürdür. Sonuç olarak, geliştirme ekipleri temel işlevlere daha az zaman harcar ve yeni özellikleri denemeye daha fazla zaman ayırabilir.

### Daha iyi kullanıcı deneyimi {#better-user-experience}

Ethereum ekosisteminin bileşenleri arasındaki birlikte çalışabilirlik, kullanıcı deneyimini geliştirir. Dapp'ler harici akıllı sözleşmeleri entegre ettiğinde, uygulamaların iletişim kuramadığı parçalanmış bir ekosisteme kıyasla kullanıcılar daha fazla işlevselliğe erişebilir.

Birlikte çalışabilirliğin faydalarını göstermek için arbitraj ticaretinden bir örnek kullanacağız:

Bir token `A borsasında` `B borsasından` daha yüksek işlem görüyorsa, kâr etmek için fiyat farkından yararlanabilirsiniz. Ancak, bunu yalnızca işlemi mümkün kılmak için yeterli sermayeniz varsa yapabilir (yani, `B borsasından ` tokeni satın alıp `A borsasında` satabilirsiniz).

Alım satımı karşılamak için yeterli paranızın olmadığı bir senaryoda, anlık kredi ideal olabilir. [Hızlı krediler](/defi/#flash-loans) oldukça tekniktir, ancak temel fikir, varlıkları (teminatsız) ödünç alabilmeniz ve _bir_ işlem içinde aynı şekilde iade edebilmenizdir.

İlk örneğimize geri dönersek, bir arbitraj tüccarı, büyük bir flash kredi alabilir, `B borsası`ndan token satın alabilir, bunları `A borsası`nda satabilir, sermayeyi + faizi geri ödeyebilir ve aynı işlem içinde kârı tutabilir. Bu karmaşık mantık, çağrıları birden fazla sözleşmeye birleştirmeyi gerektirir; bu, akıllı sözleşmelerin birlikte çalışabilirliği olmasaydı mümkün olmazdı.

## Ethereum'da birleştirilebilirlik örnekleri {#composability-in-ethereum}

### Token takasları {#token-swaps}

İşlemlerin ETH'de ödenmesini gerektiren bir dapp oluşturursanız, token takas mantığını entegre ederek kullanıcıların diğer ERC-20 tokenlerinde ödeme yapmasına izin verebilirsiniz. Sözleşme çağrılan işlevi yürütmeden önce kod, kullanıcının tokenini otomatik olarak ETH'ye dönüştürür.

### Yönetim {#governance}

Bir [DAO](/dao/) için ısmarlama yönetim sistemleri oluşturmak pahalı ve zaman alıcı olabilir. Bunun yerine, hızlı bir şekilde bir yönetişim çerçevesi oluşturmak üzere DAO'nuzu başlatmak için [Aragon İstemcisi](https://client.aragon.org/) gibi açık kaynaklı bir yönetişim araç seti kullanabilirsiniz.

### Kimlik yönetimi {#identity-management}

Özel bir kimlik doğrulama sistemi oluşturmak veya merkezi sağlayıcılara güvenmek yerine, kullanıcılar için kimlik doğrulamayı yönetmek için merkezi olmayan kimlik (DID) araçlarını entegre edebilirsiniz. Bir örnek, kullanıcıların kimliklerini bir Ethereum cüzdanıyla doğrulamasını sağlayan "Ethereum ile oturum açma" işlevi sunan açık kaynaklı bir araç seti olan [SpruceID](https://www.spruceid.com/)'dir.

## İlgili öğreticiler {#related-tutorials}

- [create-eth-app ile merkeziyetsiz uygulama ön yüz geliştirmeye bir adım önde başlayın](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Popüler akıllı sözleşmelerle uygulamalar oluşturmak için create-eth-app kullanımına genel bir bakış._

## Daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

- [Birleştirilebilirlik Yeniliktir](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Web3 İçin Birleştirilebilirlik Neden Önemlidir](https://hackernoon.com/why-composability-matters-for-web3)
- [Birleştirilebilirlik nedir?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
