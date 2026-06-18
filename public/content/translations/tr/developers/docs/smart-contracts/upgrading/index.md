---
title: Akıllı sözleşmeleri yükseltme
description: Ethereum akıllı sözleşmeleri için yükseltme modellerine genel bir bakış
lang: tr
---

Ethereum üzerindeki akıllı sözleşmeler, Ethereum Sanal Makinesi'nde (EVM) çalışan kendi kendini yürüten programlardır. Bu programlar tasarımları gereği değişmezdir, bu da sözleşme dağıtıldıktan sonra iş mantığında herhangi bir güncelleme yapılmasını engeller.

Değişmezlik, akıllı sözleşmelerin güven gereksinimsizliği, merkeziyetsizliği ve güvenliği için gerekli olsa da, bazı durumlarda bir dezavantaj olabilir. Örneğin, değişmez kod, geliştiricilerin savunmasız sözleşmeleri düzeltmesini imkansız hale getirebilir.

Ancak, akıllı sözleşmeleri iyileştirmeye yönelik artan araştırmalar, çeşitli yükseltme modellerinin tanıtılmasına yol açmıştır. Bu yükseltme modelleri, geliştiricilerin iş mantığını farklı sözleşmelere yerleştirerek akıllı sözleşmeleri (değişmezliği korurken) yükseltmelerini sağlar.

## Ön koşullar {#prerequisites}

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/) ve [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) hakkında iyi bir anlayışa sahip olmalısınız. Bu kılavuz ayrıca okuyucuların akıllı sözleşme programlamayı kavradığını varsaymaktadır.

## Akıllı sözleşme yükseltmesi nedir? {#what-is-a-smart-contract-upgrade}

Bir akıllı sözleşme yükseltmesi, sözleşmenin durumunu korurken bir akıllı sözleşmenin iş mantığını değiştirmeyi içerir. Özellikle akıllı sözleşmeler bağlamında yükseltilebilirliğin ve değişebilirliğin aynı şey olmadığını açıklığa kavuşturmak önemlidir.

Ethereum ağındaki bir adrese dağıtılmış bir programı hâlâ değiştiremezsiniz. Ancak kullanıcılar bir akıllı sözleşme ile etkileşime girdiğinde yürütülen kodu değiştirebilirsiniz.

Bu, aşağıdaki yöntemlerle yapılabilir:

1. Bir akıllı sözleşmenin birden fazla sürümünü oluşturmak ve durumu (yani verileri) eski sözleşmeden sözleşmenin yeni bir örneğine taşımak.

2. İş mantığını ve durumu depolamak için ayrı sözleşmeler oluşturmak.

3. Fonksiyon çağrılarını değişmez bir vekil kontrattan değiştirilebilir bir mantık sözleşmesine devretmek için vekil (proxy) modelleri kullanmak.

4. Belirli fonksiyonları yürütmek için esnek uydu sözleşmelerle arayüz oluşturan ve bunlara dayanan değişmez bir ana sözleşme oluşturmak.

5. Fonksiyon çağrılarını bir vekil kontrattan mantık sözleşmelerine devretmek için elmas (diamond) modelini kullanmak.

### Yükseltme mekanizması #1: Sözleşme taşıma {#contract-migration}

Sözleşme taşıma, aynı yazılımın benzersiz durumlarını oluşturma ve yönetme fikri olan sürüm oluşturmaya dayanır. Sözleşme taşıma, mevcut bir akıllı sözleşmenin yeni bir örneğini dağıtmayı ve depolamayı ve bakiyeleri yeni sözleşmeye aktarmayı içerir.

Yeni dağıtılan sözleşme boş bir depolamaya sahip olacak, bu da eski sözleşmeden verileri kurtarmanıza ve yeni uygulamaya yazmanıza olanak tanıyacaktır. Daha sonra, yeni adresi yansıtması için eski sözleşmeyle etkileşime giren tüm sözleşmeleri güncellemeniz gerekecektir.

Sözleşme taşımadaki son adım, kullanıcıları yeni sözleşmeyi kullanmaya geçmeye ikna etmektir. Yeni sözleşme sürümü, değişmezliği koruyan kullanıcı bakiyelerini ve adreslerini muhafaza edecektir. Eğer bu Token tabanlı bir sözleşmeyse, eski sözleşmeyi atıp yeni sözleşmeyi kullanmaları için borsalarla da iletişime geçmeniz gerekecektir.

Sözleşme taşıma, kullanıcı etkileşimlerini bozmadan akıllı sözleşmeleri yükseltmek için nispeten basit ve güvenli bir önlemdir. Ancak, kullanıcı depolamasını ve bakiyelerini yeni sözleşmeye manuel olarak taşımak zaman alıcıdır ve yüksek Gaz maliyetlerine neden olabilir.

[Sözleşme taşıma hakkında daha fazlası.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Yükseltme mekanizması #2: Veri ayrımı {#data-separation}

Akıllı sözleşmeleri yükseltmenin bir başka yöntemi de iş mantığını ve veri depolamayı ayrı sözleşmelere ayırmaktır. Bu, veriler depolama sözleşmesinde saklanırken kullanıcıların mantık sözleşmesiyle etkileşime girdiği anlamına gelir.

Mantık sözleşmesi, kullanıcılar uygulamayla etkileşime girdiğinde yürütülen kodu içerir. Ayrıca depolama sözleşmesinin adresini tutar ve veri almak ve ayarlamak için onunla etkileşime girer.

Bu arada, depolama sözleşmesi, kullanıcı bakiyeleri ve adresleri gibi akıllı sözleşmeyle ilişkili durumu tutar. Depolama sözleşmesinin mantık sözleşmesine ait olduğunu ve dağıtım sırasında ikincisinin adresiyle yapılandırıldığını unutmayın. Bu, yetkisiz sözleşmelerin depolama sözleşmesini çağırmasını veya verilerini güncellemesini engeller.

Varsayılan olarak, depolama sözleşmesi değişmezdir; ancak işaret ettiği mantık sözleşmesini yeni bir uygulamayla değiştirebilirsiniz. Bu, depolamayı ve bakiyeleri sağlam tutarken EVM'de çalışan kodu değiştirecektir.

Bu yükseltme yöntemini kullanmak, depolama sözleşmesindeki mantık sözleşmesinin adresini güncellemeyi gerektirir. Daha önce açıklanan nedenlerden dolayı yeni mantık sözleşmesini de depolama sözleşmesinin adresiyle yapılandırmalısınız.

Veri ayrımı modelinin uygulanması, sözleşme taşımaya kıyasla tartışmasız daha kolaydır. Ancak, akıllı sözleşmeleri kötü niyetli yükseltmelerden korumak için birden fazla sözleşmeyi yönetmeniz ve karmaşık yetkilendirme şemaları uygulamanız gerekecektir.

### Yükseltme mekanizması #3: Vekil (Proxy) modelleri {#proxy-patterns}

Vekil modeli de iş mantığını ve verileri ayrı sözleşmelerde tutmak için veri ayrımını kullanır. Ancak, bir vekil modelinde, depolama sözleşmesi (vekil olarak adlandırılır) kod yürütme sırasında mantık sözleşmesini çağırır. Bu, mantık sözleşmesinin depolama sözleşmesini çağırdığı veri ayrımı yönteminin tersidir.

Bir vekil modelinde şu olaylar gerçekleşir:

1. Kullanıcılar, verileri depolayan ancak iş mantığını barındırmayan vekil kontrat ile etkileşime girer.

2. Vekil kontrat, mantık sözleşmesinin adresini depolar ve `delegatecall` fonksiyonunu kullanarak tüm fonksiyon çağrılarını (iş mantığını barındıran) mantık sözleşmesine devreder.

3. Çağrı mantık sözleşmesine iletildikten sonra, mantık sözleşmesinden dönen veriler alınır ve kullanıcıya döndürülür.

Vekil modellerini kullanmak, **delegatecall** fonksiyonunun anlaşılmasını gerektirir. Temel olarak, `delegatecall`, bir sözleşmenin başka bir sözleşmeyi çağırmasına izin veren bir işlem kodudur, asıl kod yürütmesi ise çağıran sözleşmenin bağlamında gerçekleşir. Vekil modellerinde `delegatecall` kullanmanın bir sonucu, vekil kontratın kendi depolamasına okuma ve yazma yapması ve mantık sözleşmesinde depolanan mantığı sanki dahili bir fonksiyon çağırıyormuş gibi yürütmesidir.

[Solidity belgelerinden](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Hedef adresteki kodun çağıran sözleşmenin bağlamında (yani adresinde) yürütülmesi ve `msg.sender` ile `msg.value` değerlerinin değişmemesi dışında bir mesaj çağrısıyla aynı olan **delegatecall** adında özel bir mesaj çağrısı varyantı vardır._ _Bu, bir sözleşmenin çalışma zamanında farklı bir adresten dinamik olarak kod yükleyebileceği anlamına gelir. Depolama, mevcut adres ve bakiye hâlâ çağıran sözleşmeye atıfta bulunur, yalnızca kod çağrılan adresten alınır._

Vekil kontrat, içine yerleşik bir `fallback` fonksiyonu olduğu için bir kullanıcı bir fonksiyonu her çağırdığında `delegatecall`'u başlatmayı bilir. Solidity programlamada, bir fonksiyon çağrısı bir sözleşmede belirtilen fonksiyonlarla eşleşmediğinde [geri dönüş fonksiyonu](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) yürütülür.

Vekil modelinin çalışmasını sağlamak, vekil kontratın desteklemediği fonksiyon çağrılarını nasıl ele alması gerektiğini belirten özel bir geri dönüş fonksiyonu yazmayı gerektirir. Bu durumda vekilin geri dönüş fonksiyonu, bir delegatecall başlatmak ve kullanıcının isteğini mevcut mantık sözleşmesi uygulamasına yeniden yönlendirmek üzere programlanmıştır.

Vekil kontrat varsayılan olarak değişmezdir, ancak güncellenmiş iş mantığına sahip yeni mantık sözleşmeleri oluşturulabilir. Yükseltmeyi gerçekleştirmek, vekil kontratta referans verilen mantık sözleşmesinin adresini değiştirmekten ibarettir.

Vekil kontratı yeni bir mantık sözleşmesine işaret ederek, kullanıcılar vekil kontrat fonksiyonunu çağırdığında yürütülen kod değişir. Bu, kullanıcılardan yeni bir sözleşmeyle etkileşime girmelerini istemeden bir sözleşmenin mantığını yükseltmemize olanak tanır.

Vekil modelleri, sözleşme taşımayla ilişkili zorlukları ortadan kaldırdıkları için akıllı sözleşmeleri yükseltmek için popüler bir yöntemdir. Ancak, vekil modellerinin kullanımı daha karmaşıktır ve yanlış kullanıldığında [fonksiyon seçici çakışmaları](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357) gibi kritik kusurlara yol açabilir.

[Vekil modelleri hakkında daha fazlası](https://blog.openzeppelin.com/proxy-patterns/).

### Yükseltme mekanizması #4: Strateji modeli {#strategy-pattern}

Bu teknik, belirli özellikleri uygulamak için diğer programlarla arayüz oluşturan yazılım programları oluşturmayı teşvik eden [strateji modelinden](https://en.wikipedia.org/wiki/Strategy_pattern) etkilenmiştir. Strateji modelini Ethereum geliştirmeye uygulamak, diğer sözleşmelerden fonksiyonlar çağıran bir akıllı sözleşme oluşturmak anlamına gelir.

Bu durumdaki ana sözleşme, temel iş mantığını içerir, ancak belirli fonksiyonları yürütmek için diğer akıllı sözleşmelerle ("uydu sözleşmeler") arayüz oluşturur. Bu ana sözleşme ayrıca her uydu sözleşmesi için adresi depolar ve uydu sözleşmesinin farklı uygulamaları arasında geçiş yapabilir.

Yeni bir uydu sözleşmesi oluşturabilir ve ana sözleşmeyi yeni adresle yapılandırabilirsiniz. Bu, bir akıllı sözleşme için _stratejileri_ değiştirmenize (yani yeni mantık uygulamanıza) olanak tanır.

Daha önce tartışılan vekil modeline benzese de, strateji modeli farklıdır çünkü kullanıcıların etkileşime girdiği ana sözleşme iş mantığını barındırır. Bu modeli kullanmak, temel altyapıyı etkilemeden bir akıllı sözleşmede sınırlı değişiklikler yapma fırsatı sunar.

Temel dezavantaj, bu modelin çoğunlukla küçük yükseltmeleri sunmak için yararlı olmasıdır. Ayrıca, ana sözleşme tehlikeye girerse (örneğin bir hack yoluyla), bu yükseltme yöntemini kullanamazsınız.

### Yükseltme mekanizması #5: Elmas modeli {#diamond-pattern}

Elmas modeli, vekil modeli üzerinde bir iyileştirme olarak düşünülebilir. Elmas modelleri vekil modellerinden farklıdır çünkü elmas vekil kontratı fonksiyon çağrılarını birden fazla mantık sözleşmesine devredebilir.

Elmas modelindeki mantık sözleşmeleri _yüzeyler (facets)_ olarak bilinir. Elmas modelinin çalışmasını sağlamak için, vekil kontratta [fonksiyon seçicilerini](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) farklı yüzey adresleriyle eşleyen bir eşleme oluşturmanız gerekir.

Bir kullanıcı bir fonksiyon çağrısı yaptığında, vekil kontrat o fonksiyonu yürütmekten sorumlu yüzeyi bulmak için eşlemeyi kontrol eder. Ardından (geri dönüş fonksiyonunu kullanarak) `delegatecall`'u başlatır ve çağrıyı uygun mantık sözleşmesine yönlendirir.

Elmas yükseltme modelinin geleneksel vekil yükseltme modellerine göre bazı avantajları vardır:

1. Tüm kodu değiştirmeden sözleşmenin küçük bir bölümünü yükseltmenize olanak tanır. Yükseltmeler için vekil modelini kullanmak, küçük yükseltmeler için bile tamamen yeni bir mantık sözleşmesi oluşturmayı gerektirir.

2. Tüm akıllı sözleşmeler (vekil modellerinde kullanılan mantık sözleşmeleri dahil) 24KB boyut sınırına sahiptir, bu da özellikle daha fazla fonksiyon gerektiren karmaşık sözleşmeler için bir sınırlama olabilir. Elmas modeli, fonksiyonları birden fazla mantık sözleşmesine bölerek bu sorunu çözmeyi kolaylaştırır.

3. Vekil modelleri, erişim kontrollerine her şeyi kapsayan bir yaklaşım benimser. Yükseltme fonksiyonlarına erişimi olan bir varlık _tüm_ sözleşmeyi değiştirebilir. Ancak elmas modeli, varlıkları bir akıllı sözleşme içindeki belirli fonksiyonları yükseltmekle kısıtlayabileceğiniz modüler bir izin yaklaşımı sağlar.

[Elmas modeli hakkında daha fazlası](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Akıllı sözleşmeleri yükseltmenin artıları ve eksileri {#pros-and-cons-of-upgrading-smart-contracts}

| Artıları                                                                                                           | Eksileri                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bir akıllı sözleşme yükseltmesi, dağıtım sonrası aşamada keşfedilen güvenlik açıklarını düzeltmeyi kolaylaştırabilir.    | Akıllı sözleşmeleri yükseltmek, merkeziyetsizlik ve güvenlik açısından sonuçları olan kod değişmezliği fikrini geçersiz kılar.                              |
| Geliştiriciler, merkeziyetsiz uygulamalara yeni özellikler eklemek için mantık yükseltmelerini kullanabilirler.                           | Kullanıcılar, akıllı sözleşmeleri keyfi olarak değiştirmeyecekleri konusunda geliştiricilere güvenmelidir.                                                                                  |
| Hatalar hızlı bir şekilde düzeltilebildiği için akıllı sözleşme yükseltmeleri son kullanıcılar için güvenliği artırabilir.                      | Akıllı sözleşmelere yükseltme işlevselliği programlamak, başka bir karmaşıklık katmanı ekler ve kritik kusur olasılığını artırır.                |
| Sözleşme yükseltmeleri, geliştiricilere farklı özelliklerle denemeler yapmaları ve dapp'leri zaman içinde iyileştirmeleri için daha fazla alan sağlar. | Akıllı sözleşmeleri yükseltme fırsatı, geliştiricileri geliştirme aşamasında gerekli özeni göstermeden projeleri daha hızlı başlatmaya teşvik edebilir. |
|                                                                                                                | Akıllı sözleşmelerdeki güvensiz erişim kontrolü veya merkezileşme, kötü niyetli aktörlerin yetkisiz yükseltmeler gerçekleştirmesini kolaylaştırabilir.                  |

## Akıllı sözleşmeleri yükseltirken dikkat edilmesi gerekenler {#considerations-for-upgrading-smart-contracts}

1. Özellikle vekil modelleri, strateji modelleri veya veri ayrımı kullanıyorsanız, yetkisiz akıllı sözleşme yükseltmelerini önlemek için güvenli erişim kontrolü/yetkilendirme mekanizmaları kullanın. Buna bir örnek, yükseltme fonksiyonuna erişimi yalnızca sözleşmenin sahibinin çağırabileceği şekilde kısıtlamaktır.

2. Akıllı sözleşmeleri yükseltmek karmaşık bir faaliyettir ve güvenlik açıklarının ortaya çıkmasını önlemek için yüksek düzeyde özen gerektirir.

3. Yükseltmeleri uygulama sürecini merkeziyetsizleştirerek güven varsayımlarını azaltın. Olası stratejiler arasında yükseltmeleri kontrol etmek için bir [çoklu imzalı cüzdan sözleşmesi](/developers/docs/smart-contracts/#multisig) kullanmak veya [bir DAO üyelerinin](/dao/) yükseltmeyi onaylamak için oy kullanmasını gerektirmek yer alır.

4. Sözleşmeleri yükseltmenin içerdiği maliyetlerin farkında olun. Örneğin, sözleşme taşıma sırasında durumu (örneğin kullanıcı bakiyeleri) eski bir sözleşmeden yeni bir sözleşmeye kopyalamak birden fazla işlem gerektirebilir, bu da daha fazla Gaz ücreti anlamına gelir.

5. Kullanıcıları korumak için **zaman kilitleri (timelocks)** uygulamayı düşünün. Bir zaman kilidi, bir sistemdeki değişikliklere uygulanan bir gecikmeyi ifade eder. Zaman kilitleri, yükseltmeleri kontrol etmek için çoklu imzalı bir yönetişim sistemiyle birleştirilebilir: önerilen bir eylem gerekli onay eşiğine ulaşırsa, önceden tanımlanmış gecikme süresi geçene kadar yürütülmez.

Zaman kilitleri, önerilen bir değişikliğe (örneğin mantık yükseltmesi veya yeni ücret şemaları) katılmıyorlarsa kullanıcılara sistemden çıkış yapmaları için biraz zaman tanır. Zaman kilitleri olmadan, kullanıcıların önceden haber vermeden bir akıllı sözleşmede keyfi değişiklikler uygulamayacakları konusunda geliştiricilere güvenmeleri gerekir. Buradaki dezavantaj, zaman kilitlerinin güvenlik açıklarını hızlı bir şekilde yamama yeteneğini kısıtlamasıdır.

## Kaynaklar {#resources}

**OpenZeppelin Upgrades Eklentileri - _Yükseltilebilir akıllı sözleşmeleri dağıtmak ve güvence altına almak için bir araç paketi._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Belgeler](https://docs.openzeppelin.com/upgrades)

## Eğitimler {#tutorials}

- Patrick Collins'ten [Akıllı Sözleşmelerinizi Yükseltme | YouTube Eğitimi](https://www.youtube.com/watch?v=bdXJmWajZRY)
- Austin Griffith'ten [Ethereum Akıllı Sözleşme Taşıma Eğitimi](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd)
- Pranesh A.S'den [Akıllı sözleşmeleri yükseltmek için UUPS vekil modelini kullanma](https://blog.logrocket.com/author/praneshas/)
- fangjun.eth'ten [Web3 Eğitimi: OpenZeppelin kullanarak yükseltilebilir akıllı sözleşme (vekil) yazma](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916)

## İleri okuma {#further-reading}

- Santiago Palladino'dan [Akıllı Sözleşme Yükseltmelerinin Durumu](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/)
- [Bir Solidity akıllı sözleşmesini yükseltmenin birden fazla yolu](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Crypto Market Pool blogu
- [Öğrenin: Akıllı Sözleşmeleri Yükseltme](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - OpenZeppelin Belgeleri
- Naveen Sahu'dan [Solidity Sözleşmelerinin Yükseltilebilirliği İçin Vekil Modelleri: Şeffaf ve UUPS Vekilleri](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0)
- Nick Mudge'dan [Elmas Yükseltmeleri Nasıl Çalışır](https://dev.to/mudgen/how-diamond-upgrades-work-417j)