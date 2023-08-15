---
title: Ethereum İyileştirme Önerileri (EIP'ler)
description: Ethereum İyileştirme Önerilerini (EIP'ler) anlamak için ihtiyacınız olan temel bilgiler.
lang: tr
---

# Ethereum İyileştirme Önerilerine (EIP'ler) Giriş {#introduction-to-ethereum-improvement-proposals-eips}

## EIP'ler nedir? {#what-are-eips}

[Ethereum İyileştirme Önerileri (EIP'ler)](https://eips.ethereum.org/), Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. EIP'ler, önerilen değişiklikler için teknik özellikler içerir ve topluluk için "gerçeğin kaynağı" görevi görür. Ethereum için ağ yükseltmeleri ve uygulama standartları, EIP süreci aracılığıyla tartışılır ve geliştirilir.

Ethereum topluluğu içindeki herkes bir EIP oluşturma kabiliyetine sahiptir. EIP yazma yönergeleri, [EIP 1](https://eips.ethereum.org/EIPS/eip-1) içerisinde yer almaktadır. EIP, özelliğin mantığına ilişkin kısa bir teknik açıklama sağlamalıdır. EIP yazarı, topluluk içinde mutabakat oluşturmaktan ve muhalif görüşleri belgelemekten sorumludur. İyi biçimlendirilmiş bir EIP göndermek için gerekli yüksek teknik beceri göz önüne alındığında, tarihsel olarak çoğu EIP yazarı uygulama veya protokol geliştiricileri olmuştur.

## EIP'ler neden önemlidir? {#why-do-eips-matter}

EIP'ler, değişikliklerin nasıl gerçekleştiği konusunda merkezi bir rol oynar ve Ethereum'da belgelenir. İnsanların değişiklikleri önerme, tartışma ve benimseme yollarıdır. Mutabakatı etkileyen ve bir ağ yükseltmesi gerektiren düşük seviyeli protokol değişiklikleri için çekirdek EIP'lerin yanı sıra uygulama standartları için olan ERC'ler dahil olmak üzere [farklı EIP türleri](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types) vardır. Örneğin, [ERC20](https://eips.ethereum.org/EIPS/eip-20) veya [ERC721](https://eips.ethereum.org/EIPS/eip-721) gibi token oluşturma standartları, bu token'larla etkileşime giren uygulamaların tüm token'ları aynı kuralları kullanarak işlemesine izin verir, bu da birlikte çalışabilir uygulamalar oluşturmayı kolaylaştırır.

Her ağ yükseltmesi, ağdaki her [Ethereum istemcisi](/learn/#clients-and-nodes) tarafından uygulanması gereken bir dizi EIP'lerden oluşur. Bu, istemci geliştiricilerinin Ethereum Mainnet'teki diğer istemcilerle mutabık olmak için gerekli EIP'leri uyguladıklarından emin olmaları gerektiği anlamına gelir.

Değişiklikler için teknik bir şartname sağlamanın yanı sıra EIP'ler, Ethereum'da yönetişimin gerçekleştiği birimdir: herkes bir teklif sunmakta özgürdür ve ardından topluluktaki çeşitli hisse sahipleri bunun standart olarak mı benimsenmesi, yoksa bir ağ yükseltmesine dahil edilmesi mi gerektiğine karar vermek için tartışacaktır. Çekirdek olmayan EIP'lerin tüm uygulamalar tarafından benimsenmesi gerekmiyorken (örneğin [ERC20](https://eips.ethereum.org/EIPS/eip-20) olmayan bir token oluşturabilirsiniz) çekirdek EIP'lerin yaygın olarak benimsenmesi gerektiği için (çünkü tüm düğümlerin aynı ağın parçası olarak kalmaları için yükseltilmesi gerekir) çekirdek EIP'ler, çekirdek olmayan EIP'lere göre topluluk içinde daha büyük bir mutabakat gerektirir.

## EIP'lerin Tarihçesi {#history-of-eips}

[Ethereum İyileştirme Önerileri (EIP'ler) GitHub deposu](https://github.com/ethereum/EIPs) Ekim 2015'te oluşturuldu. EIP işlemi, [Bitcoin İyileştirme Önerileri (BIP'ler)](https://github.com/bitcoin/bips) sürecini; bu süreç de [Python Geliştirme Önerileri (PEP'ler)](https://www.python.org/dev/peps/) sürecini temel alır.

EIP editörleri, teknik sağlamlık, yazım/dil bilgisi kontrolü ve kod stili için EIP'leri gözden geçirmekle görevlidir. Martin Becze, Vitalik Buterin, Gavin Wood ve diğerleri, 2015'ten 2016'nın sonlarına kadar ilk EIP editörleriydi. Mevcut EIP editörleri şunlardır:

- Alex Beregszaszi (EWASM/Ethereum Vakfı)
- Greg Colvin (Topluluk)
- Casey Detrio (EWASM/Ethereum Vakfı)
- Matt Garnett (Quilt)
- Hudson James (Ethereum Vakfı)
- Nick Johnson (ENS)
- Nick Savers (Topluluk)
- Micah Zoltu (Topluluk)

[Ethereum Cat Herders](https://ethereumcatherders.com/) ve [Ethereum Magicians](https://ethereum-magicians.org/) topluluk üyeleriyle birlikte EIP editörleri, hangi EIP'nin uygulanacağına karar veriyorlar ve EIP'lerin kolaylaştırılmasından ve EIP'lerin "Son" veya "Geri çekildi" aşamasına taşınmasından sorumlular.

Tabloyla birlikte tam standardizasyon süreci [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'de açıklanmıştır

## Daha fazla bilgi edinin {#learn-more}

EIP'ler hakkında daha fazla bilgi edinmek istiyorsanız, aşağıdakiler dahil ek bilgileri bulabileceğiniz [EIPler web sitesine](https://eips.ethereum.org/) göz atın:

- [Farklı EIP türleri](https://eips.ethereum.org/)
- [Oluşturulan her EIP'nin listesi](https://eips.ethereum.org/all)
- [EIP durumları ve ne anlama geldikleri](https://eips.ethereum.org/)

## Katılın {#participate}

Herkes EIP veya ERC oluşturabilse de; EIP sürecini, EIP'nin ne olduğunu, EIP'lerin türlerini, EIP belgesinin ne içermesi gerektiğini, EIP formatını ve şablonunu, EIP Düzenleyicileri listesini ve EIP'ler hakkında bilmeniz gereken her şeyi belirten [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'i, EIP veya ERC oluşturmadan önce okumalısınız. Yeni EIP'niz, gerçekten karmaşık olmayan ancak aşırı niş olmayan ve Ethereum ekosistemindeki projeler tarafından kullanılabilecek yeni bir özellik tanımlamalıdır. En zor kısım kolaylaştırmadır, yazar olarak sizin; insanların EIP'nize ulaşmasını desteklemeniz, geri bildirim toplamanız, EIP'nizin çözdüğü sorunları açıklayan makaleler yazmanız ve EIP'nizi uygulamak için projelerle iş birliği yapmanız gerekir.

Tartışma sürecini takip etmek veya EIP'ler hakkındaki fikirlerinizi paylaşmak istiyorsanız, EIP'lerin toplulukla tartışıldığı [Ethereum Magicians forumuna](https://ethereum-magicians.org/) göz atın.

Ayrıca bakınız:

- [EIP nasıl oluşturulur](https://eips.ethereum.org/EIPS/eip-1)

## Referanslar {#references}

<cite class="citation">

Sayfa içeriğinin bir kısmı Hudson Jameson'ın [Ethereum Protokol Geliştirme Yönetimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) gönderisinden sağlanmıştır

</cite>
