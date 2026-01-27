---
title: Akıllı sözleşmeleri yükseltmek
description: Ethereum akıllı sözleşmeleri için güncelleme modellerine genel bir bakış
lang: tr
---

Ethereum'daki akıllı sözleşmeler, Ethereum Sanal Makinesi'nde (EVM) çalışan ve kendini yürüten programlardır. Bu programlar tasarım bakımından değişmezdir, bu da kontratın dağıtıldıktan sonra iş mantığında herhangi bir güncelleme yapılmasını engeller.

Değişmezlik, akıllı sözleşmelerin güvensizliği, merkeziyestizliği ve güvenliği için gerekliyken bazı durumlarda dezavantaj teşkil edebilir. Örneğin, değişmez kod geliştiriciler için savunmasız sözleşmeleri düzeltmeyi imkansız hale getirebilir.

Ancak akıllı sözleşmeleri geliştirmeye yönelik artan araştırmalar, birkaç yükseltme modelinin kullanılmaya başlamasına neden olmuştur. Bu yükseltme modelleri geliştiricilere, (değişmezliği korurken) iş mantığını farklı sözleşmelere yerleştirerek akıllı sözleşmeleri yükseltme olanağı verir.

## Ön Koşullar {#prerequisites}

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/) ve [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) hakkında iyi bir anlayışa sahip olmalısınız. Bu kılavuz aynı zamanda, okuyucuların akıllı sözleşmeleri programlama konusunu kavramış durumda olduğunu varsayar.

## Akıllı sözleşme yükseltmesi nedir? Akıllı sözleşme yükseltmesi nedir? {#what-is-a-smart-contract-upgrade}

Akıllı sözleşme yükseltmesi, akıllı sözleşmenin iş mantığını değiştirirken sözleşmenin durumunu da korumayı içerir. Özellikle akıllı sözleşmeler kapsamında, yükseltilebilirlik ile değişebilirliğin farklı şeyler olduğuna açıklık getirmek önemlidir.

Ethereum ağındaki bir adrese dağıtılmış bir programı hala değiştiremezsiniz. Ancak kullanıcılar bir akıllı sözleşmeyle etkileşime girdiğinde yürütülen kodu değiştirebilirsiniz.

Bu, aşağıdaki yöntemlerle yapılabilir:

1. Bir akıllı sözleşmenin birden fazla sürümünü oluşturmak ve durumu (verilerden) eski sözleşmeden sözleşmenin yeni bir örneğine taşımak.

2. İş mantığı ve durumunu kaydetmek için ayrı sözleşmeler oluşturmak.

3. Değişmez vekil sözleşmeden gelen fonksiyon çağrılarını değiştirilebilir bir mantık sözleşmesine yönlendirmek için vekil kalıplarını kullanmak.

4. Belirli fonksiyonları yürütmek için esnek uydu sözleşmeleriyle arayüz oluşturan ve bu sözleşmelere dayanan değişmez bir ana sözleşme oluşturmak.

5. Elmas modelini kullanarak vekil sözleşmeden gelen fonksiyon çağrılarını bir mantık sözleşmelerine yönlendirmek.

### Yükseltme mekanizması 1: Sözleşme taşıma {#contract-migration}

Sözleşme taşıma, aynı yazılımın eşsiz durumlarını oluşturma ve yönetme fikri anlamına gelen sürüm belirleme temelinde çalışır. Sözleşme taşıma, mevcut bir akıllı sözleşmenin yeni bir örneğinin dağıtılması ve depolama ile bakiyelerin yeni sözleşmeye transferini içerir.

Yeni dağıtılmış sözleşmenin depolaması boş olacaktır ve bu durum, eski sözleşmeden verileri kurtarıp ve yeni uygulamaya yazmanıza olanak tanır. Sonrasında, eski sözleşme ile etkileşimde olan tüm sözleşmeleri yeni adresi belirtecek şekilde güncellemeniz gerekir.

Sözleşme taşımanın son adımı, kullanıcıları yeni sözleşmeyi kullanmaya geçmeye ikna etmektir. Yeni sözleşme sürümü, kullanıcı bakiyelerini ve adreslerini korur ve dolayısıyla değişmezliği sürdürür. Jeton tabanlı sözleşme söz konusu olduğunda, aynı zamanda eski sözleşmeyi bırakıp yeni sözleşmeyi kullanmak için borsalarla da iletişime geçmeniz gerekir.

Sözleşme taşıma, akıllı sözleşmeleri kullanıcı etkileşimlerini kesintiye uğratmadan yükseltmeye yönelik görece basit ve güvenli bir tedbirdir. Ancak, kullanıcı depolama ve bakiyelerini yeni sözleşmeye manuel olarak taşımak zaman alıcıdır ve yüksek gaz ücretlerine sebep olabilir.

[Sözleşme taşıma hakkında daha fazlası.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Yükseltme mekanizması 2: Veri ayırma {#data-separation}

Akıllı sözleşmeleri yükseltmenin bir diğer yöntemi, iş mantığı ile veri depolamayı farklı sözleşmelere ayırmaktır. Bunun anlamı, veriler depolama sözleşmesinde depolanırken kullanıcıların mantık sözleşmesi ile etkileşime girmesidir.

Mantık sözleşmesi, kullanıcılar uygulamayla etkileşime girdiğinde yürütülen kodu içerir. Aynı zamanda, depolama sözleşmesinin adresini tutar ve veri alma ve ayarlama amacıyla bu adresle etkileşime geçer.

Bu arada, kullanıcı bakiyeleri ve adresleri gibi akıllı sözleşme ile bağlantılı durumu da depolama sözleşmesi tutar. Depolama sözleşmesinin mantık sözleşmesine ait olduğunu ve dağıtım anında mantık sözleşmesinin adresi ile yapılandırıldığını unutmayın. Bu, yetkisiz sözleşmelerin depolama sözleşmesini çağırmasını ya da verilerini güncellemesini engeller.

Varsayılan olarak, depolama sözleşmesi değiştirilemez; fakat işaret ettiği mantık sözleşmesini, yeni bir uygulama ile değiştirebilirsiniz. Bu, depolamayı ve bakiyeleri olduğu gibi tutarken Ethereum Sanal Makinesi'nde çalışan kodu değiştirir.

Bu yükseltme yönteminin kullanılması, depolama sözleşmesinde mantık sözleşmesinin adresini güncellemeyi gerektirir. Daha önce açıklanmış sebeplerden dolayı, yeni mantık sözleşmesini depolama sözleşmesinin adresi ile de yapılandırmanız gerekir.

Veri ayırma modelini uygulamak, sözleşme taşınması ile karşılaştırıldığında tartışmasız daha kolaydır. Ancak, akıllı sözleşmeleri kötü niyetli yükseltmelerden korumak için birden çok sözleşmeyi yönetmeniz ve karmaşık yetkilendirme düzenlemeleri uygulamanız gerekir.

### Yükseltme mekanizması 3: Vekil modeller {#proxy-patterns}

Araştırma modeli aynı zamanda, iş mantığını ve veriyi ayrı sözleşmelerde tutmak için veri ayırmayı kullanır. Bununla beraber bir vekil modelinde, depolama sözleşmesi (vekil olarak adlandırılır) kod yürütme sırasında mantık sözleşmesini çağırır. Bu, mantık sözleşmesinin depolama sözleşmesini çağırdığı veri ayırma yönteminin tersidir.

Bir vekil modelinde şunlar gerçekleşir:

1. Kullanıcılar, veri depolayan ama iş mantığını tutmayan vekil sözleşme ile etkileşime girer.

2. Vekil sözleşme, mantık sözleşmesinin adresini depolar ve `delegatecall` fonksiyonunu kullanarak tüm fonksiyon çağrılarını (iş mantığı içeren) mantık sözleşmesine delege eder.

3. Çağrı, mantık sözleşmesine iletildikten sonra mantık sözleşmesinden gelen veri alınır ve kullanıcıya geri döndürülür.

Vekil modellerin kullanılması için **delegatecall** fonksiyonuna hakim olmak gerekir. Basitçe ifade etmek gerekirse, `delegatecall` bir sözleşmenin başka bir sözleşmeyi çağırmasına izin veren bir işlem kodudur, gerçek kod yürütme ise çağıran sözleşme bağlamında gerçekleşir. Vekil modellerde `delegatecall` fonksiyonunu kullanmanın olası sonuçlarından biri, vekil sözleşmenin kendi depolamasını okuyup yazması ve mantık sözleşmesinde saklanan mantığı, dahili bir fonksiyonu çağırıyormuş gibi yürütmesidir.

[Solidity belgelerinden](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Mesaj çağrısının **delegatecall** adında özel bir varyantı vardır. Bu, hedef adresteki kodun çağıran sözleşmenin bağlamında (yani adresinde) yürütülmesi ve `msg.sender` ile `msg.value` değerlerinin değişmemesi dışında bir mesaj çağrısıyla aynıdır._ _Bu, bir sözleşmenin çalışma zamanında farklı bir adresten dinamik olarak kod yükleyebileceği anlamına gelir._ Depolama, geçerli adres ve bakiye, hala çağırana başvuruda bulunur, çağrılan adresten sadece kod alınır._

Vekil sözleşme, bir kullanıcı bir fonksiyonu her çağırdığında `delegatecall` çağrısı yapması gerektiğini bilir. Çünkü yerleşik bir `fallback` fonksiyonuna sahiptir. Solidity programlamada, bir fonksiyon çağrısı sözleşmede belirtilmiş olan fonksiyonlarla eşleşmediğinde [geri dönüş işlevi](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) çalıştırılır.

Vekil modelin çalışması için vekil sözleşmenin desteklemediği fonksiyon çağrılarını nasıl yürütmesi gerektiğini belirten özel bir geri dönüş fonksiyonu yazmak gerekir. Bu durumda, vekilin geri dönüş fonksiyonu bir delegatecall başlatmak ve kullanıcının isteğini geçerli mantık sözleşmesi uygulamasına tekrardan yönlendirmek üzere programlanır.

Vekil sözleşme, varsayılan olarak değiştirilemez ancak güncellenmiş iş mantığına sahip yeni mantık sözleşmeleri oluşturulabilir. Bu itibarla yükseltmenin gerçekleştirilmesi, vekil sözleşmede başvurulan mantık sözleşmesinin adresini değiştirme anlamına gelir.

Vekil sözleşmeyi yeni bir mantık sözleşmesine yönlendirildiğinde kullanıcılar vekil sözleşmenin fonksiyonunu çağırdığında yürütülen kod değişir. Bu, kullanıcılardan yeni bir sözleşme ile etkileşime girmelerini istemeden bir sözleşmenin mantığını yükseltmemize izin verir.

Vekil modeller, sözleşme taşımayla ilgili zorlukları ortadan kaldırmasından dolayı akıllı sözleşmeleri yükseltme konusunda popüler bir yöntemdir. Ancak vekil modellerin kullanımı daha karmaşıktır ve yanlış kullanıldığında [işlev seçici çakışmaları](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357) gibi kritik kusurlara yol açabilir.

[Vekil modeller hakkında daha fazlası](https://blog.openzeppelin.com/proxy-patterns/).

### Yükseltme mekanizması 4: Strateji modeli {#strategy-pattern}

Bu teknik, belirli özellikleri uygulamak için diğer programlarla arayüz oluşturan yazılım programları oluşturmayı teşvik eden [strateji modelinden](https://en.wikipedia.org/wiki/Strategy_pattern) etkilenmiştir. Strateji modelini Ethereum'u geliştirmek için kullanmak, diğer sözleşmelerden fonksiyon çağıran bir akıllı sözleşme oluşturmak anlamına gelir.

Bu durumda ana sözleşme, temel iş mantığını içerir ancak belirli işlevleri gerçekleştirmek için diğer akıllı sözleşmeler ile ("uydu sözleşmeleri") arayüz oluşturur. Aynı zamanda bu ana sözleşme uydu sözleşmesinin farklı uygulamaları arasında geçiş yapabilir ve her uydu sözleşmesinin adresini depolar.

Yeni bir uydu sözleşmesi oluşturabilir ve ana sözleşmeyi yeni adres ile yapılandırabilirsiniz. Bu, bir akıllı sözleşme için _stratejileri_ (yani yeni mantık uygulamayı) değiştirmenize olanak tanır.

Strateji modeli, daha önce tartışılan vekil model ile benzerlik taşısa da ondan farklıdır; çünkü iş mantığını kullanıcıların etkileşimde olduğu ana sözleşme tutar. Bu modeli kullanmak, bir akıllı sözleşmede ana altyapıyı etkilemeden sınırlı değişiklikler yapmaya olanak sağlar.

Ana dezavantajı, bu modelin çoğunlukla küçük yükseltmeleri devreye almak açısından kullanışlı olmasıdır. Ayrıca, ana sözleşmenin güvenliği tehlike altındaysa (örneğin, saldırı yoluyla) bu yükseltme yöntemini kullanamazsınız.

### Yükseltme mekanizması 5: Elmas modeli {#diamond-pattern}

Elmas modeli, vekil modelde yapılan bir iyileştirme olarak kabul edilir. Elmas modelleri, elmas vekil sözleşmesi, fonksiyon çağrılarını birden fazla mantık sözleşmesine iletebildiği için vekil modellerden farklıdır.

Elmas modelindeki mantık sözleşmeleri _yüzeyler_ olarak bilinir. Elmas modelinin çalışması için, vekil sözleşmede [işlev seçicilerini](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) farklı yüzey adresleriyle eşleyen bir haritalama oluşturmanız gerekir.

Bir kullanıcı bir fonksiyon çağrısı yaptığında vekil sözleşme, o fonksiyonu yürütmekten sorumlu yüzü bulmak için eşlemeyi kontrol eder. Daha sonra, `delegatecall` çağrısı yapar (geri dönüş fonksiyonunu kullanarak) ve çağrıyı uygun mantık sözleşmesine yönlendirir.

Elmas yükseltmesi modelinin, geleneksel vekil yükseltme modellerine göre bazı avantajları vardır:

1. Tüm kodu değiştirmeden sözleşmenin küçük bir kısmını yükseltmenize olanak tanır. Yükseltmeler için vekil modeli kullanmak için küçük yükseltmelerde bile olsa, baştan sonra yeni bir mantık sözleşmesi oluşturmak gerekir.

2. Tüm akıllı sözleşmelerde (vekil modelde kullanılan mantık sözleşmeleri dahil) 24 KB'lık bir boyut limiti vardır; bu, özellikle daha çok fonksiyon gerektiren karmaşık sözleşmeler için sınırlayıcı olabilir. Elmas modeli, fonksiyonları birden çok mantık sözleşmesine bölerek bu sorunu çözmeyi kolaylaştırır.

3. Vekil modeller, erişim kontrolleri için tümünü yakalama yaklaşımını benimser. Yükseltme işlevlerine erişimi olan bir varlık, sözleşmenin _tamamını_ değiştirebilir. Ancak elmas modeli, varlıkları bir akıllı sözleşme içindeki belirli işlevleri yükseltmekle kısıtlayabileceğiniz modüler bir izin yaklaşımı sağlar.

[Elmas modeli hakkında daha fazlası](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Akıllı sözleşmeleri yükseltmenin artıları ve eksileri {#pros-and-cons-of-upgrading-smart-contracts}

| Artıları                                                                                                                                                                      | Eksileri                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bir akıllı sözleşme yükseltmesi, dağıtım sonrası aşamada keşfedilen güvenlik açıklarını gidermeyi kolaylaştırabilir.                                          | Akıllı kontratları güncellemek, kodun değişmezliği ilkesini geçersiz kılar ve bunun merkeziyetsizlik ve güvenlik açısından sonuçları olabilir.                |
| Geliştiriciler, mantık yükseltmelerini kullanarak merkeziyetsiz uygulamalara yeni özellikler ekleyebilir.                                                     | Kulllanıcılar, geliştiricilerin akıllı sözleşmeleri keyfi olarak değiştirmeyeceğine güvenmek durumundadır.                                                    |
| Akıllı sözleşme yükseltmeleri, hatalar hızlı bir şekilde çözüldüğünden son kullanıcılar için güvenliği arttırabilir.                                          | Akıllı sözleşmelere programlama yoluyla güncelleme işlevselliği eklemek, başka bir karmaşıklık katmanı ekler ve kritik hata olasılığını artırır.              |
| Akıllı sözleşme yükseltmeleri, geliştiricilere farklı özellikleri denemek ve zaman içinde merkeziyetsiz uygulamaları geliştirmek için daha fazla alan sağlar. | Akıllı sözleşmeleri yükseltme fırsatı, geliştiricilerin projeleri geliştirme aşamasında yeterli önlem almadan daha hızlı başlatmalarına teşvik edebilir.      |
|                                                                                                                                                                               | Akıllı sözleşmelerde güvensiz erişim kontrolü veya merkezileşme, kötü niyetli kişilerin yetkisiz yükseltmeler gerçekleştirmesini daha kolay hale getirebilir. |

## Akıllı sözleşmeleri yükseltirken dikkat edilmesi gerekenler {#considerations-for-upgrading-smart-contracts}

1. Özellikle vekil modeller, strateji modelleri ya da veri ayırma kullanıyorsanız, yetkisiz akıllı sözleşme güncellemelerini önlemek için güvenli erişim kontrolü/yetkilendirme mekanizmalarını kullanın. Buna örnek olarak, yükseltme işlevinin erişimini, sadece sözleşme sahibinin onu çağırmasına izin verecek şekilde kısıtlamak verilebilir.

2. Akıllı sözleşmeleri yükseltmek karmaşık bir eylemdir ve güvenlik açıklarının ortaya çıkmasını engellemek için yüksek seviyede özen gerekir.

3. Yükseltmeleri uygulama sürecini merkeziyetsizleştirerek güven varsayımlarını azaltın. Olası stratejiler arasında, yükseltmeleri kontrol etmek için bir [çoklu imzalı cüzdan sözleşmesi](/developers/docs/smart-contracts/#multisig) kullanmak veya [bir DAO'nun üyelerinin](/dao/) yükseltmeyi onaylamak için oy kullanmasını zorunlu kılmak yer alır.

4. Sözleşmelerin yükseltilmesiyle alakalı maliyetlerin farkında olun. Örnek olarak, sözleşme taşıma sırasında durumu (örn. kullanıcı bakiyeleri) eski bir sözleşmeden yeni bir sözleşmeye kopyalamak için birden çok işlem ve dolayısıyla daha fazla gaz ücreti gerekebilir.

5. Kullanıcıları korumak için **zaman kilitleri** uygulamayı değerlendirin. Zaman kilidi, bir sistemde yapılan değişikliklere uygulanan gecikme anlamına gelir. Zaman kilitleri, yükseltmeleri kontrol etmek için bir çoklu imza yönetişim sistemi ile bir arada kullanılabilir: Önerilen işlem gerekli onay eşiğine ulaşırsa, önceden belirlenmiş olan gecikme süresi geçene kadar yürütülmez.

Zaman kilitleri, önerilen bir değişikliğe (örn. mantık yükseltmesi ya da yeni ücret planları) katılmayan kullanıcılara sistemden çıkmaları için biraz zaman tanır. Zaman kilitleri olmadığında kullanıcılar, geliştiricilerin önceden haber vermeden akıllı bir sözleşmede keyfi değişiklikler yapmayacağına güvenmek zorunda kalır. Buradaki dezavantaj, zaman kilitlerinin, güvenlik açıklarını hızlıca onarma yeterliliğini kısıtlamasıdır.

## Kaynaklar {#resources}

**OpenZeppelin Yükseltme Eklentileri - _Yükseltilebilir akıllı sözleşmelerin dağıtımını ve güvence altına alınmasını sağlayan bir araç paketi._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Belgeler](https://docs.openzeppelin.com/upgrades)

## Eğitimler {#tutorials}

- [Akıllı Sözleşmelerinizi Yükseltme | YouTube Eğitimi](https://www.youtube.com/watch?v=bdXJmWajZRY) - Patrick Collins
- [Ethereum Akıllı Sözleşme Taşıma Eğitimi](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) - Austin Griffith
- [Akıllı sözleşmeleri yükseltmek için UUPS vekil modelini kullanma](https://blog.logrocket.com/author/praneshas/) - Pranesh A.S
- [Web3 Eğitimi: OpenZeppelin kullanarak yükseltilebilir akıllı sözleşme (vekil) yazma](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) - fangjun.eth

## Daha fazla kaynak {#further-reading}

- [Akıllı Sözleşme Yükseltmelerinin Durumu](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) - Santiago Palladino
- [Bir Solidity akıllı sözleşmesini yükseltmenin birden çok yolu](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Crypto Market Pool blogu
- [Öğrenin: Akıllı Sözleşmeleri Yükseltme](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - OpenZeppelin Belgeleri
- [Solidity Sözleşmelerinin Yükseltilebilirliği İçin Vekil Modelleri: Şeffaf ve UUPS Vekilleri Karşılaştırması](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) - Naveen Sahu
- [Elmas Yükseltmeleri Nasıl Çalışır?](https://dev.to/mudgen/how-diamond-upgrades-work-417j) - Nick Mudge
