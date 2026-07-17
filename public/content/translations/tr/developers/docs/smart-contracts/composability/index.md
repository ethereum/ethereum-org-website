---
title: "Akıllı sözleşme birleştirilebilirliği"
description: "Mevcut bileşenleri yeniden kullanarak karmaşık merkeziyetsiz uygulamalar (dapp'ler) oluşturmak için akıllı sözleşmelerin Lego blokları gibi nasıl birleştirilebileceğini öğrenin."
lang: tr
incomplete: true
---

## Kısa bir giriş {#a-brief-introduction}

Akıllı sözleşmeler Ethereum'da herkese açıktır ve açık API'ler olarak düşünülebilir. Bir merkeziyetsiz uygulama (dapp) geliştiricisi olmak için kendi akıllı sözleşmenizi yazmanıza gerek yoktur, sadece onlarla nasıl etkileşim kuracağınızı bilmeniz gerekir. Örneğin, uygulamanızdaki tüm token takas mantığını yönetmek için merkeziyetsiz bir borsa olan [Uniswap](https://uniswap.exchange/swap)'ın mevcut akıllı sözleşmelerini kullanabilirsiniz; sıfırdan başlamanıza gerek yoktur. Onların [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) ve [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) sözleşmelerinden bazılarına göz atın.

## Birleştirilebilirlik nedir? {#what-is-composability}

Birleştirilebilirlik, yeni sistemler veya çıktılar oluşturmak için farklı bileşenleri bir araya getirmektir. Yazılım geliştirmede birleştirilebilirlik, geliştiricilerin yeni uygulamalar oluşturmak için mevcut yazılım bileşenlerini yeniden kullanabilmesi anlamına gelir. Birleştirilebilirliği anlamanın iyi bir yolu, birleştirilebilir unsurları Lego blokları olarak düşünmektir. Her bir Lego diğeriyle birleştirilebilir, bu da farklı Legoları birleştirerek karmaşık yapılar inşa etmenize olanak tanır.

Ethereum'da her akıllı sözleşme bir nevi Lego'dur; diğer projelerdeki akıllı sözleşmeleri projeniz için yapı taşları olarak kullanabilirsiniz. Bu, tekerleği yeniden icat etmek veya sıfırdan inşa etmek için zaman harcamanıza gerek olmadığı anlamına gelir.

## Birleştirilebilirlik nasıl çalışır? {#how-does-composability-work}

Ethereum akıllı sözleşmeleri açık API'ler gibidir, bu nedenle herkes sözleşmeyle etkileşime girebilir veya ek işlevsellik için bunları dapp'lere entegre edebilir. Akıllı sözleşme birleştirilebilirliği genellikle üç prensip üzerinden çalışır: modülerlik, özerklik ve keşfedilebilirlik:

**1. Modülerlik**: Bu, bireysel bileşenlerin belirli bir görevi yerine getirme yeteneğidir. Ethereum'da her akıllı sözleşmenin belirli bir kullanım durumu vardır (Uniswap örneğinde gösterildiği gibi).

**2. Özerklik**: Birleştirilebilir bileşenler bağımsız olarak çalışabilmelidir. Ethereum'daki her akıllı sözleşme kendi kendini yürütür ve sistemin diğer parçalarına dayanmadan işlev görebilir.

**3. Keşfedilebilirlik**: Geliştiriciler, harici sözleşmeler herkese açık değilse onları çağıramaz veya yazılım kütüphanelerini uygulamalara entegre edemez. Tasarımı gereği akıllı sözleşmeler açık kaynaktır; herkes bir akıllı sözleşmeyi çağırabilir veya bir kod tabanını çatallayabilir.

## Birleştirilebilirliğin faydaları {#benefits-of-composability}

### Daha kısa geliştirme döngüsü {#shorter-development-cycle}

Birleştirilebilirlik, geliştiricilerin [dapp'ler](/apps/#what-are-dapps) oluştururken yapması gereken işi azaltır. [Naval Ravikant'ın dediği gibi:](https://twitter.com/naval/status/1444366754650656770) "Açık kaynak, her sorunun yalnızca bir kez çözülmesi gerektiği anlamına gelir."

Bir sorunu çözen bir akıllı sözleşme varsa, diğer geliştiriciler bunu yeniden kullanabilir, böylece aynı sorunu çözmek zorunda kalmazlar. Bu şekilde geliştiriciler, mevcut yazılım kütüphanelerini alıp yeni dapp'ler oluşturmak için ekstra işlevsellik ekleyebilirler.

### Daha fazla inovasyon {#greater-innovation}

Birleştirilebilirlik, inovasyonu ve denemeyi teşvik eder çünkü geliştiriciler istenen sonuçları elde etmek için açık kaynaklı kodu yeniden kullanmakta, değiştirmekte, çoğaltmakta veya entegre etmekte özgürdür. Sonuç olarak, geliştirme ekipleri temel işlevsellik için daha az zaman harcar ve yeni özellikleri denemeye daha fazla zaman ayırabilir.

### Daha iyi kullanıcı deneyimi {#better-user-experience}

Ethereum ekosisteminin bileşenleri arasındaki birlikte çalışabilirlik, kullanıcı deneyimini iyileştirir. Dapp'ler harici akıllı sözleşmeleri entegre ettiğinde, kullanıcılar uygulamaların iletişim kuramadığı parçalanmış bir ekosisteme kıyasla daha fazla işlevselliğe erişebilir.

Birlikte çalışabilirliğin faydalarını göstermek için arbitraj ticaretinden bir örnek kullanacağız:

Bir token `exchange A` üzerinde `exchange B` üzerindekinden daha yüksek bir fiyattan işlem görüyorsa, kâr elde etmek için fiyat farkından yararlanabilirsiniz. Ancak, bunu yalnızca işlemi finanse edecek (yani token'ı `exchange B` üzerinden alıp `exchange A` üzerinde satacak) yeterli sermayeniz varsa yapabilirsiniz.

Ticareti karşılayacak yeterli fonunuzun olmadığı bir senaryoda, bir flaş kredi ideal olabilir. [Flaş krediler](/defi/#flash-loans) oldukça tekniktir, ancak temel fikir, varlıkları (teminat olmadan) ödünç alabilmeniz ve _tek_ bir işlem içinde aynı şekilde iade edebilmenizdir.

İlk örneğimize dönecek olursak, bir arbitraj tüccarı büyük bir flaş kredi çekebilir, `exchange B` üzerinden token satın alabilir, bunları `exchange A` üzerinde satabilir, anapara + faizi geri ödeyebilir ve kârı elinde tutabilir; tüm bunları aynı işlem içinde gerçekleştirebilir. Bu karmaşık mantık, birden fazla sözleşmeye yapılan çağrıların birleştirilmesini gerektirir ki bu, akıllı sözleşmeler birlikte çalışabilirlikten yoksun olsaydı mümkün olmazdı.

## Ethereum'da birleştirilebilirlik örnekleri {#composability-in-ethereum}

### Token takasları {#token-swaps}

İşlemlerin ETH ile ödenmesini gerektiren bir dapp oluşturursanız, token takas mantığını entegre ederek kullanıcıların diğer ERC-20 token'ları ile ödeme yapmasına olanak tanıyabilirsiniz. Kod, sözleşme çağrılan işlevi yürütmeden önce kullanıcının token'ını otomatik olarak ETH'ye dönüştürecektir.

### Yönetişim {#governance}

Bir [DAO](/dao/) için özel yönetişim sistemleri oluşturmak pahalı ve zaman alıcı olabilir. Bunun yerine, hızlıca bir yönetişim çerçevesi oluşturmak üzere DAO'nuzu başlatmak için [Aragon Client](https://client.aragon.org/) gibi açık kaynaklı bir yönetişim araç kiti kullanabilirsiniz.

### Kimlik yönetimi {#identity-management}

Özel bir kimlik doğrulama sistemi oluşturmak veya merkezi sağlayıcılara güvenmek yerine, kullanıcıların kimlik doğrulamasını yönetmek için merkeziyetsiz kimlik (DID) araçlarını entegre edebilirsiniz. Buna bir örnek, kullanıcıların bir Ethereum cüzdanı ile kimliklerini doğrulamasına olanak tanıyan "Ethereum ile Giriş Yap" işlevselliği sunan açık kaynaklı bir araç kiti olan [SpruceID](https://www.spruceid.com/)'dir.

## İlgili eğitimler {#related-tutorials}

- [create-eth-app ile dapp ön yüz geliştirmenize hızlı bir başlangıç yapın](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Popüler akıllı sözleşmelerle kullanıma hazır uygulamalar oluşturmak için create-eth-app'in nasıl kullanılacağına dair bir genel bakış._

## İleri okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

- [Birleştirilebilirlik İnovasyondur](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Web3 İçin Birleştirilebilirlik Neden Önemlidir?](https://hackernoon.com/why-composability-matters-for-web3)
- [Birleştirilebilirlik Nedir?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)