---
title: Ethereum yığınına giriş
description: Ethereum yığınının farklı katmanlarına ve bunların birbirine nasıl uyduğuna dair bir rehber.
lang: tr
---

Herhangi bir yazılım yığınında olduğu gibi, tam "Ethereum yığını" da hedeflerinize bağlı olarak projeden projeye değişiklik gösterecektir.

Ancak, yazılım uygulamalarının Ethereum blokzinciri ile nasıl etkileşime girdiğine dair zihinsel bir model sağlamaya yardımcı olan temel Ethereum bileşenleri vardır. Yığının katmanlarını anlamak, Ethereum'un yazılım projelerine entegre edilebileceği farklı yolları anlamanıza yardımcı olacaktır.

## Seviye 1: Ethereum Sanal Makinesi {#ethereum-virtual-machine}

[Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/), Ethereum üzerindeki akıllı sözleşmeler için çalışma zamanı ortamıdır. Ethereum blokzincirindeki tüm akıllı sözleşmeler ve durum değişiklikleri [işlemler](/developers/docs/transactions/) tarafından yürütülür. EVM, Ethereum ağındaki tüm işlem süreçlerini yönetir.

Herhangi bir sanal makinede olduğu gibi, EVM de çalışan kod ile çalıştıran makine (bir Ethereum düğümü) arasında bir soyutlama katmanı oluşturur. Şu anda EVM, dünya çapında dağıtılmış binlerce düğüm üzerinde çalışmaktadır.

Arka planda EVM, belirli görevleri yürütmek için bir dizi işlem kodu talimatı kullanır. Bu (140 benzersiz) işlem kodu, EVM'nin [Turing tam](https://en.wikipedia.org/wiki/Turing_completeness) olmasını sağlar, bu da EVM'nin yeterli kaynak verildiğinde hemen hemen her şeyi hesaplayabileceği anlamına gelir.

Bir merkeziyetsiz uygulama (dapp) geliştiricisi olarak, EVM hakkında var olduğu ve Ethereum'daki tüm uygulamalara kesintisiz bir şekilde güvenilir güç sağladığı dışında pek bir şey bilmenize gerek yoktur.

## Seviye 2: Akıllı sözleşmeler {#smart-contracts}

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), Ethereum blokzincirinde çalışan yürütülebilir programlardır.

Akıllı sözleşmeler, EVM baytkoduna (işlem kodları adı verilen düşük seviyeli makine talimatları) derlenen belirli [programlama dilleri](/developers/docs/smart-contracts/languages/) kullanılarak yazılır.

Akıllı sözleşmeler yalnızca açık kaynaklı kütüphaneler olarak hizmet vermekle kalmaz, aynı zamanda her zaman çalışan ve kapatılamayan açık API hizmetleridir. Akıllı sözleşmeler, kullanıcıların ve uygulamaların ([dapp'ler](/developers/docs/dapps/)) izne ihtiyaç duymadan etkileşime girebileceği genel işlevler sağlar. Herhangi bir uygulama, [veri akışları](/developers/docs/oracles/) eklemek veya Token takaslarını desteklemek gibi işlevler oluşturmak için dağıtılmış akıllı sözleşmelerle entegre olabilir. Ek olarak, herkes uygulamasının ihtiyaçlarını karşılayacak özel işlevler eklemek için Ethereum'a yeni akıllı sözleşmeler dağıtabilir.

Bir dapp geliştiricisi olarak, yalnızca Ethereum blokzincirine özel işlevler eklemek istiyorsanız akıllı sözleşmeler yazmanız gerekecektir. Örneğin, sabit coin'lerle ödemeleri desteklemek veya Token'ların merkeziyetsiz takasını sağlamak istiyorsanız, yalnızca mevcut akıllı sözleşmelerle entegre olarak projenizin ihtiyaçlarının çoğunu veya tamamını karşılayabileceğinizi görebilirsiniz.

## Seviye 3: Ethereum düğümleri {#ethereum-nodes}

Bir uygulamanın Ethereum blokzinciri ile etkileşime girebilmesi için bir [Ethereum düğümüne](/developers/docs/nodes-and-clients/) bağlanması gerekir. Bir düğüme bağlanmak, blokzincir verilerini okumanıza ve/veya ağa işlemler göndermenize olanak tanır.

Ethereum düğümleri, bir yazılım (bir Ethereum istemcisi) çalıştıran bilgisayarlardır. Bir istemci, her Bloktaki tüm işlemleri doğrulayan, ağı güvenli ve verileri doğru tutan bir Ethereum uygulamasıdır. **Ethereum düğümleri, Ethereum blokzincirinin ta kendisidir**. Birlikte Ethereum blokzincirinin durumunu depolarlar ve blokzincir durumunu değiştirmek için işlemler üzerinde mutabakata varırlar.

Uygulamanızı bir Ethereum düğümüne bağlayarak ([JSON-RPC API](/developers/docs/apis/json-rpc/) aracılığıyla), uygulamanız blokzincirden veri okuyabilir (kullanıcı Hesap bakiyeleri gibi) ve ağa yeni işlemler yayınlayabilir (kullanıcı Hesapları arasında ETH transfer etmek veya akıllı sözleşmelerin işlevlerini yürütmek gibi).

## Seviye 4: Ethereum istemci API'leri {#ethereum-client-apis}

Birçok kolaylık sağlayan kütüphane (Ethereum'un açık kaynak topluluğu tarafından oluşturulan ve sürdürülen), uygulamalarınızın Ethereum blokzincirine bağlanmasına ve onunla iletişim kurmasına olanak tanır.

Kullanıcıya dönük uygulamanız bir web uygulamasıysa, doğrudan ön yüzünüzde bir [JavaScript API'sini](/developers/docs/apis/javascript/) `npm install` tercih edebilirsiniz. Veya belki de bu işlevi sunucu tarafında bir [Python](/developers/docs/programming-languages/python/) veya [Java](/developers/docs/programming-languages/java/) API'si kullanarak uygulamayı seçeceksiniz.

Bu API'ler yığının zorunlu bir parçası olmasa da, doğrudan bir Ethereum düğümüyle etkileşime girmenin karmaşıklığının çoğunu soyutlarlar. Ayrıca yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar, böylece bir geliştirici olarak Ethereum istemcilerinin incelikleriyle uğraşmak için daha az, uygulamanıza özgü işlevselliğe odaklanmak için daha fazla zaman harcayabilirsiniz.

## Seviye 5: Son kullanıcı uygulamaları {#end-user-applications}

Yığının en üst seviyesinde kullanıcıya dönük uygulamalar bulunur. Bunlar bugün düzenli olarak kullandığınız ve oluşturduğunuz standart uygulamalardır: öncelikle web ve mobil uygulamalar.

Bu kullanıcı arayüzlerini geliştirme şekliniz temelde değişmeden kalır. Çoğu zaman kullanıcıların, kullandıkları uygulamanın bir blokzincir kullanılarak oluşturulduğunu bilmelerine gerek kalmayacaktır.

## Yığınınızı seçmeye hazır mısınız? {#ready-to-choose-your-stack}

Ethereum uygulamanız için [yerel bir geliştirme ortamı kurma](/developers/local-environment/) rehberimize göz atın.

## Daha fazla bilgi {#further-reading}

- [Bir Web 3.0 uygulamasının Mimarisi](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_