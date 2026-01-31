---
title: "Ethereum yığınına giriş"
description: "Ethereum yazılım yığınının farklı katmanlarına ve nasıl uyuştuklarına dair bir inceleme."
lang: tr
---

Herhangi bir yazılım yığınında görülebileceği gibi ''Ethereum yığını'' da amacınıza bağlı olarak projeden projeye farklılık gösterecektir.

Ancak, yazılım uygulamalarının Ethereum blok zinciri ile nasıl etkileşime geçtiği hakkında zihinsel bir model sağlamaya yardımcı olan Ethereum'un temel bileşenleri bulunmaktadır. Yığının katmanlarını anlamak, Ethereum'u yazılım projelerine entegre etmenin farklı yollarını anlamanıza yardımcı olur.

## Seviye 1: Ethereum Sanal Makinesi {#ethereum-virtual-machine}

[Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/), Ethereum üzerindeki akıllı sözleşmelerin çalışma zamanı ortamıdır. Ethereum blokzincirindeki tüm akıllı sözleşmeler ve durum değişiklikleri, [işlemler](/developers/docs/transactions/) tarafından yürütülür. EVM, Ethereum ağında yapılan tüm işlemleri idare eder.

Herhangi bir sanal makinede olduğu gibi, EVM çalıştırılan kod ve çalıştırılan makine (bir Ethereum düğümü) arasında bir soyutlama seviyesi oluşturur. Şu anda EVM, dünya geneline dağılmış binlerce düğümde çalışmaktadır.

EVM arka planda belirli görevleri yürütmek için bir dizi işlem kodu talimatı kullanmaktadır. Bu (140 benzersiz) işlem kodu, EVM'nin [Turing-bütünlüğüne](https://en.wikipedia.org/wiki/Turing_completeness) sahip olmasını sağlar; bu da, yeterli kaynak sağlandığında EVM'nin hemen hemen her şeyi hesaplayabileceği anlamına gelir.

Bir DAPP geliştiricisi olarak EVM hakkında çok bilgili olmanıza gerek yok, tek bilmeniz gereken şey; EVM'nin Ethereum'daki bütün uygulamaların temeli olduğudur.

## Seviye 2: Akıllı sözleşmeler {#smart-contracts}

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), Ethereum blokzincirinde çalışan yürütülebilir programlardır.

Akıllı sözleşmeler, EVM bayt koduna (işlem kodları olarak adlandırılan düşük seviyeli makine talimatları) derlenen belirli [programlama dilleri](/developers/docs/smart-contracts/languages/) kullanılarak yazılır.

Akıllı sözleşmeler açık kaynak kütüphane işlevi görmelerinin yanında, esasen her zaman çalışan ve kapatılamayan açık API hizmetleridir. Akıllı sözleşmeler; kullanıcıların ve uygulamaların ([merkeziyetsiz uygulamaların](/developers/docs/dapps/)) izin gerektirmeden etkileşime girebileceği, halka açık işlevler sağlar. Herhangi bir uygulama; [veri akışları](/developers/docs/oracles/) eklemek veya token takaslarını desteklemek gibi işlevsellikler oluşturmak için, dağıtılmış akıllı sözleşmelerle entegre olabilir. Ek olarak, herhangi biri kendi uygulamasının ihtiyaçlarını karşılamak amaçlı özel işlevsellik eklemek için Ethereum'a yeni akıllı sözleşmeler dağıtabilir.

Bir dapp geliştiricisi olarak, sadece Ethereum blok zincirinde özel işlevsellik eklemek istiyorsanız akıllı sözleşmeler yazmanız gerekecek. Projenizin ihtiyaçlarının çoğunu veya tamamını sadece mevcut akıllı sözleşmelerle entegre olarak karşılayabildiğinizi görebilirsiniz; sabit para ile ödemeleri destekleme veya token'ların merkeziyetsiz takasını etkinleştirme buna örnek gösterilebilir.

## Seviye 3: Ethereum düğümleri {#ethereum-nodes}

Bir uygulamanın Ethereum blokzinciri ile etkileşime girebilmesi için [bir Ethereum düğümüne](/developers/docs/nodes-and-clients/) bağlanması gerekir. Bir düğüme bağlanmak blok zinciri verisi okumanızı ve/veya ağa işlemler göndermenizi sağlar.

Ethereum düğümleri yazılım, yani bir Ethereum istemcisi çalıştıran bilgisayarlardır. İstemci, her bloktaki tüm işlemleri doğrulayan, ağı güvenli ve verileri doğru tutan bir Ethereum uygulamasıdır. **Ethereum düğümleri, Ethereum blok zinciridir**. Ortaklaşa hâlde Ethereum blok zincirinin durumunu depolarlar ve blok zinciri durumunu değiştirmek için işlemler üzerinde mutabakata varırlar.

Uygulamanızı bir Ethereum düğümüne ([JSON-RPC API](/developers/docs/apis/json-rpc/) aracılığıyla) bağladığınızda, uygulamanız blokzincirden (kullanıcı hesabı bakiyeleri gibi) verileri okuyabilir ve ayrıca ağa (kullanıcı hesapları arasında ETH aktarma veya akıllı sözleşmelerin işlevlerini yürütme gibi) yeni işlemler yayınlayabilir.

## Seviye 4: Ethereum istemci API'leri {#ethereum-client-apis}

Birçok kolaylık kütüphanesi (Ethereum'un açık kaynak topluluğu tarafından geliştirilen ve sürdürülen) uygulamalarınızın Ethereum blok zinciriyle bağlantı kurmasını ve iletişime geçmesini sağlar.

Kullanıcıya yönelik uygulamanız bir web uygulamasıysa, doğrudan ön yüzünüze bir [JavaScript API'sini](/developers/docs/apis/javascript/) `npm install` ile kurmayı seçebilirsiniz. Veya bu işlevselliği, bir [Python](/developers/docs/programming-languages/python/) ya da [Java](/developers/docs/programming-languages/java/) API'si kullanarak sunucu tarafında uygulamayı tercih edebilirsiniz.

Bu API'ler her ne kadar yığının gerekli bir parçası olmasalar da, bir Ethereum düğümüyle doğrudan etkileşime geçmenin zorluklarının çoğunu basitleştirirler. Ayrıca, bir geliştirici olarak Ethereum istemcilerinin karmaşıklıklarıyla daha az zaman harcamanız ve uygulamanıza özgü işlevselliğe daha fazla odaklanmanız için yardımcı işlevler (örneğin ETH'yi Gwei'ye dönüştürme) de sağlarlar.

## Seviye 5: Son kullanıcı uygulamaları {#end-user-applications}

Yığının en üst seviyesinde kullanıcılara dönük uygulamalar bulunur. Bunlar günümüzde düzenli olarak kullandığınız ve inşa ettiğiniz standart uygulamalardır: başlıca web ve mobil uygulamaları.

Bu kullanıcı arayüzlerini geliştirme yollarınız özünde değişmez. Kullanıcıların kullandıkları uygulamanın bir blok zinciri kullanılarak inşa edildiğini bilmeleri pek gerekmez.

## Yığınınızı seçmeye hazır mısınız? {#ready-to-choose-your-stack}
Ethereum uygulamanız için [yerel bir geliştirme ortamı kurma](/developers/local-environment/) kılavuzumuza göz atın.

## Daha fazla kaynak {#further-reading}

- [Bir Web 3.0 uygulamasının mimarisi](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
