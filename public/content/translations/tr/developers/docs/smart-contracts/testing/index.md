---
title: Akıllı sözleşmeleri test etmek
description: Ethereum akıllı sözleşmelerini test etmeye yönelik tekniklere ve dikkat edilecek hususlara genel bakış.
lang: tr
---

Ethereum gibi herkese açık blokzincirler değişmez niteliktedir ve bu durum, dağıtıldıktan sonra akıllı sözleşme kodlarının değiştirilmesini zorlaştırır. "Sanal yükseltmeler" gerçekleştirmek için [sözleşme yükseltme şablonları](/developers/docs/smart-contracts/upgrading/) mevcut olsa da bunların uygulanması zordur ve toplumsal mutabakat gerektirir. Ayrıca, yükseltme bir hatayı yalnızca keşfedildikten _sonra_ düzeltebilir; güvenlik açığını önce bir saldırgan keşfederse akıllı sözleşmenin açığından yararlanabilir.

Bu yüzden, akıllı sözleşmeleri ana ağa [dağıtmadan](/developers/docs/smart-contracts/deploying/) önce test etmek [güvenlik](/developers/docs/smart-contracts/security/) açısından bir asgari gereksinimdir. Bir sözleşmeyi test etmenin ve kodunu değerlendirmenin birçok farklı tekniği vardır; burada neye ihtiyacınız olduğuna göre seçimler yaparsınız. Bununla birlikte, farklı araç ve yaklaşımlardan oluşan bir test paketi kullanmak, sözleşme kodundaki hem küçük hem de büyük güvenlik açıklarını yakalamak için idealdir.

## Ön koşullar {#prerequisites}

Bu sayfa, akıllı sözleşmeleri Ethereum ağına yüklemeden önce onları nasıl test edeceğinizi açıklamaktadır. [Akıllı sözleşmeler](/developers/docs/smart-contracts/) ile aşina olduğunuz varsayılır.

## Akıllı sözleşme testi nedir? {#what-is-smart-contract-testing}

Akıllı sözleşme testi, sözleşmenin içerisindeki kodların beklendiği gibi çalışıp çalışmadığını doğrulama işlemidir. Test, belirli bir akıllı sözleşmenin güvenilirlik, kullanılabilirlik ve güvenlik gereksinimlerini karşılayıp karşılamadığını kontrol etmek için kullanışlıdır.

Yaklaşımlar farklılıklar gösterse de çoğu test yöntemi, akıllı sözleşmenin işlenmesi beklenen verilerin küçük bir örneğiyle birlikte yürütülmesini gerektirir. Sözleşme örnek verilerle doğru sonuçlar veriyorsa, düzgün çalıştığı varsayılır. Çoğu test aracı, bir sözleşme yürütmesinin beklenen sonuçlarla eşleşip eşleşmediğini kontrol etmek için [test senaryolarının](https://en.m.wikipedia.org/wiki/Test_case) yazılmasını ve yürütülmesini sağlayan kaynaklar sunar.

### Akıllı sözleşmeleri test etmek neden önemlidir? {#importance-of-testing-smart-contracts}

Akıllı sözleşmeler genellikle yüksek değerli finansal varlıkları yönettiğinden, küçük programlama hataları sıklıkla [kullanıcılar için büyük kayıplara](https://rekt.news/leaderboard/) yol açabilir. Ancak titizlikle yapılan testler akıllı sözleşmelerin kodundaki kusurları ve sorunları erkenden fark etmenize ve sözleşmeyi Ana Ağa dağıtmadan önce düzeltmenize yardımcı olabilir.

Bir hata bulunursa sözleşmeyi yükseltmek mümkün olsa da, yükseltmeler karmaşık olduğundan yanlış şekilde ele alınırsa [hatalarla sonuçlanabilir](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Bir sözleşmeyi yükseltmek, değişmezlik ilkesini ortadan kaldırır ve kullanıcılara ek güven varsayımları yükler. Bu durumla karşılaşmamak ve sözleşmenizi test etmek için kapsamlı bir plan yapıp akıllı sözleşmenizin güvenlik risklerini azaltırsanız dağıtımdan sonra karmaşık mantık yükseltmelerine ihtiyacınız azalır.

## Akıllı sözleşme test etme yöntemleri {#methods-for-testing-smart-contracts}

Ethereum akıllı sözleşmelerini test etme yöntemleri iki genel kategori altında sınıflandırılabilir: **otomatik test** ve **manuel test**. Otomatik test ve manuel test, benzersiz avantajlar ve çeşitli artı-eksiler sunar ancak sözleşmelerinizi analiz etmek için sağlam bir plan oluşturmak istiyorsanız ikisini birlikte kullanabilirsiniz.

### Otomatik test {#automated-testing}

Otomatik test, yürütme sırasındaki hatalar için akıllı sözleşme kodunu otomatik olarak kontrol eden araçlar kullanır. Otomatik testin faydası, sözleşme işlevlerinin değerlendirilmesine rehberlik eden [komut dosyalarının](https://www.techtarget.com/whatis/definition/script?amp=1) kullanımından kaynaklanır. Komut dosyası testlerinin minimum insan müdahalesi ile tekrar tekrar çalıştırılması planlanabilir, bu da otomatik testi manuel test yaklaşımlarından daha verimli bir yere koyar.

Otomatik testler, özellikle tekrarlayan ve zaman alıcı testler söz konusu olduğunda kullanışlıdır, manuel olarak yapılması zor, insan hatasına duyarlı veya kritik sözleşme fonksiyonlarının değerlendirilmesini içerir. Ancak otomatik test araçlarının da belirli hataları gözden kaçırmak ve çok sayıda [yalancı pozitif](https://www.contrastsecurity.com/glossary/false-positive) üretmek gibi bazı dezavantajları olabilir. Bu nedenle, akıllı sözleşmeler için otomatik test ile manuel testi birlikte kullanmak idealdir.

### Manuel test {#manual-testing}

Manuel test, insanı da işin içine sokar ve bir akıllı sözleşmenin doğruluğunu analiz ederken test paketinizdeki her test senaryosunun arka arkaya yürütülmesini içerir. Bu süreç, bir sözleşme üzerinde aynı anda birden çok izole testi çalıştırabileceğiniz, tüm başarısız ve başarılı testleri gösteren bir rapor alabileceğiniz otomatik testten farklıdır.

Manuel test, farklı test senaryolarını kapsayan yazılı bir test planını takip ederek tek bir kişi tarafından gerçekleştirilebilir. Ayrıca, manuel testin bir parçası olarak belirli bir süre boyunca bir akıllı sözleşmeyle birden fazla kişinin ya da grubun etkileşim kurmasını da sağlayabilirsiniz. Test uzmanları, sözleşmenin gerçek davranışını beklenen davranışla karşılaştırır ve herhangi bir farkı hata olarak işaretler.

Manuel testin etkili olması için ciddi miktarda kaynak (beceri, zaman, para ve çaba) gerekir ve testleri yürütürken insan hatası nedeniyle bazı hataları gözden kaçırmak mümkündür. Ancak manuel test faydalı da olabilir; örneğin bir insan test uzmanı (örneğin bir denetçi), sezgilerini kullanarak otomatik bir test aracının kaçıracağı ekstrem durumları yakalayabilir.

## Akıllı sözleşmeler için otomatik testler {#automated-testing-for-smart-contracts}

### Birim testi {#unit-testing-for-smart-contracts}

Birim testi, sözleşme işlevlerini ayrı ayrı değerlendirir ve her bileşenin doğru çalışıp çalışmadığını kontrol eder. Başarılı bir birim testi; basit, çabuk çalıştırılabilir ve testlerin başarısız olması durumunda neyin yanlış gittiğine dair net bir açıklama sağlayacak nitelikte olmalıdır.

Birim testleri, işlevlerin beklenen değerleri döndürdüğünü ve işlev yürütüldükten sonra sözleşme depolamasının düzgün bir şekilde güncellendiğini teyit etmek açısından kullanışlıdır. Ayrıca bir sözleşme kod tabanında yeni mantık eklemeye olanak sağlayan değişiklikler yaptıktan sonra birim testleri çalıştırıldığında hata üretilmez. Birim testlerini etkili şekilde çalıştırmaya yönelik yönergeler aşağıda verilmiştir:

#### Akıllı sözleşmelerde birim testi yapmaya yönelik yönergeler {#unit-testing-guidelines}

##### 1. Sözleşmelerinizin iş mantığını ve iş akışını anlayın

Birim testlerini yazmadan önce, bir akıllı sözleşmenin hangi işlevleri sunduğunu ve kullanıcıların bu işlevlere nasıl erişip kullanacağını bilmek yardımcı olur. Bu süreç, özellikle bir sözleşmedeki işlevlerin geçerli kullanıcı girdileri için doğru çıktıyı döndürüp döndürmediğini belirleyen [mutlu yol testlerini](https://en.m.wikipedia.org/wiki/Happy_path) çalıştırmak açısından kullanışlıdır. Bu kavramı, buradaki (kısaltılmış) [açık artırma sözleşmesi](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) örneğini kullanarak açıklayacağız

```
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Bu, teklif verme döneminde teklif almak için tasarlanmış basit bir açık artırma sözleşmesidir. `highestBid` artarsa, en yüksek teklifi veren önceki kişi parasını alır; teklif süresi sona erdiğinde `beneficiary` parasını almak için sözleşmeyi çağırır.

Bunun gibi bir sözleşme için yapılan birim testleri, bir kullanıcının sözleşmeyle etkileşim kurarken çağırabileceği çeşitli tipteki işlevleri kapsar. Bir kullanıcının açık artırma devam ederken teklif verip veremeyeceğini (yani `bid()` çağrılarının başarılı olması) ya da bir kullanıcının mevcut `highestBid` değerinden daha yüksek bir teklif verip veremeyeceğini kontrol eden bir birim testi örnek olarak verilebilir.

Bir sözleşmenin operasyonel iş akışını anlamanın bir diğer faydası da yürütmenin gereksinimleri karşılayıp karşılamadığını kontrol eden birim testlerini yazmaya yardımcı olmasıdır. Örneğin açık artırma sözleşmesi, artırma sona erdiğinde (yani `auctionEndTime` değeri `block.timestamp` değerinden düşük olduğunda) kullanıcıların teklif veremeyeceğini belirtir. Bu nedenle bir geliştirici, açık artırma bittiğinde (yani, `auctionEndTime` > `block.timestamp` olduğunda) `bid()` fonksiyonuna yapılan çağrıların başarılı olup olmadığını kontrol eden bir birim testi çalıştırabilir.

##### 2. Sözleşmenin yürütülmesiyle ilgili tüm varsayımları değerlendirin

Bir sözleşmenin yürütülmesiyle ilgili tüm varsayımları belgelemek ve bu varsayımların geçerliliğini doğrulamak için birim testleri yazmak çok önemlidir. Savları test etmek, beklenmeyen yürütmelere kaşı koruma sağlamanın yanı sıra sizi akıllı sözleşmelerin güvenlik modelini kırabilecek işlemler hakkında da düşünmeye zorlar. Yararlı bir ipucu ise, "mutlu kullanıcı testlerinin" ötesine geçerek bir fonksiyonun yanlış girdiler nedeniyle başarısız olup olmadığını kontrol eden negatif testler yazmaktır.

Birçok birim test şeması, savlar (bir sözleşmenin neleri yapıp neleri yapamayacağını belirten basit ifadeler) oluşturmanıza ve de bu savların yürütme altında tutulup tutulmadığını görmenize yarayan testler yapmanıza olanak tanır. Daha önce açıklanan açık artırma sözleşmesi üzerinde çalışan bir geliştirici, negatif testler yapmadan önce kendi davranışı hakkında aşağıdaki savlarda bulunabilir:

- Kullanıcılar, açık artırma başlamamış veya bitmiş ise teklif veremezler.

- Açık artırma sözleşmesi, bir teklif kabul edilebilir sınırın altında ise geri döner.

- Teklifi kazanmayı başaramayan kullanıcılara fonları geri verilir.

**Not**: Varsayımları test etmenin diğer bir yolu ise bir sözleşmede [fonksiyon niteleyicileri](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers), özellikle de `require`, `assert`, ve `if…else` ifadelerini tetikleyen testler yazmaktır.

##### 3. Kod kapsamını ölçün

[Kod kapsamı](https://en.m.wikipedia.org/wiki/Code_coverage), kodunuzda testler esnasında çalıştırılan dal, satır ve ifade sayısını takip eden bir test metriğidir. Testler iyi kod kapsamına sahip olmalıdır; aksi takdirde, sözleşmenin tüm testleri geçtiği ama yine de kodunda açıklar bulundurduğuna işaret eden "yalancı negatifler" alabilirsiniz. Bununla birlikte yüksek kod kapsamı kaydetmek, bir akıllı sözleşmedeki tüm ifadelerin/fonksiyonların doğruluğunun yeterince test edildiğine dair güvence sağlar.

##### 4. İyi geliştirilmiş test çerçeveleri kullanın

Akıllı sözleşmeniz için birim testleri çalıştırmada kullanılan araçların kalitesi hayati önemdedir. İdeal bir test çerçevesi; düzenli olarak tutulan, kullanışlı özellikler sunan (örneğin günlük oluşturma ve bildirim kabiliyetleri) ve diğer geliştiriciler tarafından geniş çaplı olarak kullanılıp incelenen bir çerçevedir.

Solidity akıllı sözleşmeleri için birim testi çerçeveleri farklı dillerde (çoğunlukla JavaScript, Python ve Rust) sunulur. Farklı test çerçeveleri ile birim testleri çalıştırmaya başlamak hakkında bilgi almak için aşağıdaki rehberlere başvurun:

- **[Brownie ile birim testleri çalıştırma](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundry ile birim testleri çalıştırma](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffle ile birim testleri çalıştırma](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remix ile birim testleri çalıştırma](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ape ile birim testleri çalıştırma](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhat ile birim testleri çalıştırma](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wake ile birim testi çalıştırma](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Entegrasyon testi {#integration-testing-for-smart-contracts}

Birim testi izole edilmiş sözleşme işlevlerinde hata ayıklarken, entegrasyon testleri bir akıllı sözleşmenin tüm bileşenlerini bir bütün olarak değerlendirir. Entegrasyon testi, sözleşmeler arası çağrılardan veya aynı akıllı sözleşmedeki farklı işlevler arasındaki etkileşimlerden kaynaklanan sorunları tespit edebilir. Örneğin, entegrasyon testleri [kalıtım](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) ve bağımlılık enjeksiyonu gibi şeylerin doğru çalışıp çalışmadığını kontrol etmeye yardımcı olabilir.

Entegrasyon testi, sözleşmenizin modüler bir mimariyi benimsemesi ya da yürütülmesi sırasında diğer zincir içi sözleşmelerle arayüz oluşturması açısından kullanışlıdır. Entegrasyon testlerini yürütmenin bir yolu, blokzincirini belirli bir yükseklikte ([Forge](https://book.getfoundry.sh/forge/fork-testing) veya [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) gibi bir araç kullanarak) [çatallandırmak](/glossary/#fork) ve sözleşmeniz ile dağıtılmış sözleşmeler arasındaki etkileşimleri simüle etmektir.

Çatallanmış blokzincir, ana ağa benzer şekilde davranır ve ilişkili durumları ve bakiyeleri bulunan hesaplara sahiptir. Ancak yalnızca ayrıştırılmış bir yerel geliştirme ortamı olarak işlev görür, yani işlemler için gerçek Ether'e ihtiyacınız olmaz ve yaptığınız değişiklikler gerçek Ethereum ağını etkilemez.

### Özellik tabanlı test {#property-based-testing-for-smart-contracts}

Özellik tabanlı test, bir akıllı sözleşmenin tanımlanmış bir özelliği karşılayıp karşılayamadığının kontrol edildiği bir süreçtir. Özellikler, farklı senaryolarda doğru kalması beklenen bir sözleşme davranışı hakkındaki gerçekleri ortaya koyar; "Sözleşmedeki aritmetik işlemler asla taşma veya yetersizlik gösteremez" ifadesi örnek bir akıllı sözleşme özelliği olabilir.

**Statik analiz** ve **dinamik analiz**, özellik tabanlı test yürütmenin iki yaygın tekniğidir ve ikisi de bir programın kodunun (bu durumda bir akıllı sözleşme) önceden tanımlanmış bir özelliği karşıladığını doğrulayabilir. Özellik tabanlı test araçlarından bazıları, beklenen sözleşme özellikleri ile ilgili önceden tanımlanmış kurallar ile birlikte gelir ve kodu bu kurallara karşı kontrol eder, bazıları ise bir akıllı sözleşme için özel özellikler oluşturmanıza olanak tanır.

#### Statik analiz {#static-analysis}

Bir statik analizör, bir akıllı sözleşmenin kaynak kodunu girdi olarak alır ve sözleşmenin bir özelliği karşılayıp karşılamadığını belirten sonuçları çıktı olarak verir. Dinamik analizin aksine, statik analiz bir sözleşmenin doğruluğunu analiz etmek amacıyla yürütülmesini kapsamaz. Statik analiz bunun yerine bir akıllı sözleşmenin yürütme esnasında takip edebileceği olası tüm yolları anlamaya çalışır (yani kaynak kodun yapısını sözleşmenin yürütme esnasındaki işlemleri için ne anlama gelebileceğini belirlemek amacıyla inceler).

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) ve [statik test](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sözleşmeler üzerinde statik analiz çalıştırmanın yaygın yöntemleridir. İkisi de derleyiciden çıktı olarak alınan [soyut söz dizimi ağaçları](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) ve [kontrol akışı grafikleri](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) gibi sözleşme yürütmesinin düşük seviye gösterimlerinin analiz edilmesini gerektirir.

Çoğu durumda, statik analiz bir sözleşmenin kodundaki güvenli olmayan yapılar, söz dizimi hataları veya kodlama standartlarının ihlalleri gibi güvenlik sorunlarını tespit etmek açısından kullanışlıdır. Ancak statik analizörler, genelde daha derin güvenlik açıklarını tespit etme konusunda güvenilmezdir ve aşırı sayıda yalancı pozitifler üretebilir.

#### Dinamik analiz {#dynamic-analysis}

Dinamik analiz, herhangi bir hata izinin belirli özellikleri ihlal edip etmediğini görmek için bir akıllı sözleşmenin fonksiyonlarında sembolik girdiler (örneğin [sembolik yürütmede](https://en.m.wikipedia.org/wiki/Symbolic_execution)) veya somut girdiler (örneğin [bulandırmada](https://owasp.org/www-community/Fuzzing)) oluşturur. Bu tarz özellik tabanlı test biçimi, test durumlarının birden çok senaryoyu kapsaması ve bir programın test durumlarının oluşturulmasını işlemesi bakımından birim testlerinden farklıdır.

[Bulandırma](https://halborn.com/what-is-fuzz-testing-fuzzing/), akıllı sözleşmelerdeki rastgele özellikleri doğrulamak için kullanılan dinamik bir analiz tekniği örneğidir. Bir bulandırıcı, tanımlı bir girdi değerinin rastgele veya hatalı biçimlendirilmiş varyasyonlarıyla birlikte hedef sözleşmedeki fonksiyonları çağırır. Akıllı sözleşme bir hata durumuna girerse (örneğin, bir savın başarısız olduğu durum), sorun işaretlenir ve yürütmeyi hassas yola sokan girdiler bir raporda gösterilir.

Beklenmeyen girdilerin yanlış işlenmesi, istenmeyen yürütmelere neden olup tehlikeli etkiler yaratabileceğinden bulanıklaştırma, akıllı sözleşmelerin girdi doğrulama mekanizmasını değerlendirmede kullanışlıdır. Bu tür özellik tabanlı testler birçok nedenden ötürü faydalı olabilir:

1. **Birçok durumu kapsayan test senaryolarını yazmak zordur.** Bir özellik testi, yalnızca bir davranış ve davranışı test etmek için bir veri aralığı tanımlamanızı gerektirir; program, tanımlanan özelliği temel alarak otomatik olarak test senaryoları oluşturur.

2. ** Test paketiniz program içindeki olası tüm yolları yeterince kapsamayabilir.** %100 kapsamla bile bazı ekstrem senaryolar gözden kaçabilir.

3. **Birim testleri, bir sözleşmenin örnek veriler için doğru şekilde yürütüldüğünü kanıtlasa da sözleşmenin örnek dışındaki girdiler için doğru şekilde yürütülüp yürütülmeyeceği bilinmez.** Özellik testleri, onaylama hatalarına neden olan yürütme izlerini bulmak için belirli bir girdi değerinin birden çok varyasyonuyla birlikte hedef sözleşmeyi yürütür. Böylelikle özellik testleri, sözleşmenin daha geniş bir giriş verileri sınıfında doğru yürütülmesini daha net bir şekilde garanti eder.

### Akıllı sözleşmelerde özellik tabanlı testleri çalıştırabilmek için yönergeler {#running-property-based-tests}

Özellik tabanlı test çalıştırma, genellikle bir akıllı sözleşmede özelliklerin tanımlanmasıyla (ör. [tamsayı taşması](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow) bulunmaması) veya doğrulamak istediğiniz özelliklerin toplanması ile başlar. Özellik testleri yazarken, programın işlem girdileri için veri üretebileceği bir değer aralığı tanımlamanız da gerekebilir.

Testinizi düzgün bir şekilde yapılandırdıktan sonra özellik test aracı akıllı sözleşmelerde fonksiyonlarınızı rastgele üretilmiş girdilerle yürütür. Herhangi bir sav ihlali varsa, değerlendirilmekte olan özellikleri ihlal eden somut girdi verilerini içeren bir rapor almalısınız. Farklı araçlarla özellik tabanlı testler çalıştırmaya başlamakla ilgili kılavuzlara bakabilirsiniz:

- **[Slither ile akıllı sözleşmelerin statik analizi](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Wake ile akıllı sözleşmelerin statik analizi](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownie ile özellik tabanlı test](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundry ile sözleşme bulanıklaştırma](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Echidna ile sözleşme bulanıklaştırma](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wake ile sözleşme bulanıklaştırma](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Manticore ile akıllı sözleşmeleri sembolik yürütme](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythril ile akıllı sözleşmeleri sembolik yürütme](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Akıllı sözleşmeler için manuel test {#manual-testing-for-smart-contracts}

Akıllı sözleşmelerin manuel olarak test edilmesi, genellikle geliştirme döngüsünün otomatik testlerden sonraki safhalarında gerçekleştirilir. Bu test biçimi, teknik gereksinimlerde belirtildiği gibi performans gösterip göstermediğini görmek için akıllı sözleşmeyi tam entegrasyonlu tek bir ürün olarak değerlendirir.

### Sözleşmeleri yerel blokzincir üzerinde test etme {#testing-on-local-blockchain}

Yerel geliştirme ortamında gerçekleştirilen otomatik testler, yararlı hata ayıklama bilgileri sağlayabilir, dolayısıyla akıllı sözleşmenizin bir üretim ortamında nasıl davrandığını bilmek istersiniz. Ancak Ethereum ana zincirine dağıtım yaptığınızda gaz ücretleri ortaya çıkar; ayrıca akıllı sözleşmenizde hatalar varsa siz veya kullanıcılarınız para kaybına uğrayabilir.

Sözleşmenizi yerel bir blokzincirde ([geliştirme ağı](/developers/docs/development-networks/) olarak da bilinir) test etmeye alternatif olarak ana ağda test etmeniz önerilir. Bilgisayarınızda yerel olarak Ethereum blokzincirinin bir kopyası olarak çalışan yerel blokzincir, Ethereum yürütüm katmanının davranışını simüle eder. Bu sayede, önemli bir ek yüke maruz kalmadan işlemleri bir sözleşmeyle etkileşime girecek şekilde programlayabilirsiniz.

Sözleşmeleri yerel bir blokzincirde çalıştırmak, bir tür manuel entegrasyon testi olarak faydalı olabilir. [Akıllı sözleşmeler, yüksek seviyede birleştirilebilir](/developers/docs/smart-contracts/composability/) olduklarından mevcut protokollerle entegre etmenize olanak tanısa da, zincir üstünde bu tür karmaşık etkileşimlerin doğru sonuçları vermesini sağlamanız gerekir.

[Geliştirme ağları hakkında daha fazla bilgi.](/developers/docs/development-networks/)

### Sözleşmeleri test ağları üzerinde test etme {#testing-contracts-on-testnets}

Test ağı ya da testnet, Ethereum ana ağı ile aynı şekilde çalışır ancak bunu, gerçek değeri olmayan Ether (ETH) kullanarak yapar. Sözleşmenizi bir [test ağı](/developers/docs/networks/#ethereum-testnets) üzerine dağıtmanız, herhangi birisinin fonlarını riske atmadan sözleşmenizle (örneğin dapp ön yüzü aracılığıyla) etkileşime girebilmesi anlamına gelir.

Bu tip manuel testler, uygulama akışınızın kullanıcı bakış açısıyla uçtan uca değerlendirilmesi açısından kullanışlıdır. Bu aşamada beta test kullanıcıları ayrıca deneme çalıştırmaları gerçekleştirip sözleşmenin iş mantığı ve genel işlevselliği ile ilgili sorunları bildirebilir.

Yerel bir blokzincirde test ettikten sonra bir test ağına dağıtım yapmak, ikincisi Ethereum Sanal Makinası'nın davranışına daha benzer olduğundan ideal seçenektir. Bu nedenle, birçok Ethereum yerel projesinin akıllı sözleşmelerin gerçek dünya koşullarında nasıl işlediğini değerlendirmek için merkeziyetsiz uygulamaları test ağlarına dağıtmaları yaygın bir uygulamadır.

[Ethereum test ağları hakkında daha fazla bilgi.](/developers/docs/development-networks/#public-beacon-testchains)

## Test ile resmi doğrulama karşılaştırması {#testing-vs-formal-verification}

Test etme, bir sözleşmenin bazı veri girdileri için beklenen sonuçları verdiğinin doğrulanmasına yardımcı olurken, testler sırasında kullanılmayan girdiler için aynı şeyi kesin olarak kanıtlayamaz. Bu nedenle, bir akıllı sözleşmeyi test etmek, "fonksiyonel doğruluğu" güvence altına almaz (yani, bir programın _tüm_ girdi değerleri kümesi için gerektiği gibi davrandığını gösteremez).

Resmi doğrulama, bir yazılımın doğruluğunu değerlendirmek için programın resmi modelinin resmi spesifikasyonla uyumlu olup olmadığını kontrol etme yaklaşımıdır. Resmi model, bir programın soyut matematiksel gösterimi olarak ifade edilirken resmi spesifikasyon ise bir programın özelliklerini tanımlar (yani, programın yürütülmesi hakkındaki mantıksal savlardır).

Özellikler matematiksel terimlerle yazıldığı için bir sistemin resmi (matematiksel) modelinin bir spesifikasyonu mantıksal çıkarım kuralları kullanarak karşıladığını doğrulamak mümkün hale gelir. Bu nedenle, resmi doğrulama araçlarının bir sistemin doğruluğuna dair "matematiksel kanıt" ürettiği söylenir.

Test etmenin aksine resmi doğrulama, bir akıllı sözleşmenin yürütülmesinin _tüm_ yürütmeler için bir resmi bir spesifikasyonu karşıladığını (yani, hiçbir hatası olmadığını) doğrulamak için örnek veriyle yürütme yapmaya gerek olmadan kullanılabilir. Bu, sadece onlarca birim testi çalıştırmak için harcanan zamanı azaltmakla kalmaz, aynı zamanda gizli güvenlik açıklarını yakalama konusunda da daha etkilidir. Bununla birlikte, resmi doğrulama teknikleri uygulama zorluğu ve kullanışlılığına göre bir spektrumun farklı noktalarında yer alır.

[Akıllı sözleşmeler için resmi doğrulama hakkında daha fazla bilgi.](/developers/docs/smart-contracts/formal-verification)

## Test etme ile denetleme ve hata ödüllerinin karşılaştırılması {#testing-vs-audits-bug-bounties}

Yukarıda belirtildiği gibi, titizlikle yapılan testler bir sözleşmede hata bulunmamasını nadiren garanti edebilir; resmi doğrulama yaklaşımları doğruluk konusunda daha güçlü güvence sağlayabilir ancak şu anda kullanımı zor ve maliyeti yüksektir.

Yine de, bağımsız bir kod incelemesi ile sözleşmenin güvenlik açıklarını yakalama olasılığınızı daha da artırabilirsiniz. [Akıllı sözleşme denetimleri](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) ve [hata ödülleri](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7), sözleşmelerinizi başkalarına analiz ettirmek için kullanabileceğiniz iki yöntemdir.

Denetimler, akıllı sözleşmelerde güvenlik açıkları ve zayıf geliştirme uygulamaları durumlarını bulma konusunda deneyimli denetçiler tarafından gerçekleştirilir. Bir denetim genellikle testin (ve muhtemelen resmi doğrulamanın) yanı sıra tüm kod tabanının manuel olarak gözden geçirilmesini içerir.

Bunun aksine hata ödül programı, genellikle akıllı sözleşmelerde bir güvenlik açığı keşfeden ve geliştiricilere açıklayan bir bireye (genellikle [beyaz şapkalı hackerlar](https://en.wikipedia.org/wiki/White_hat_(computer_security)) olarak tanımlanan) maddi bir ödül sunmayı içerir. Hata ödülleri, başkalarından akıllı sözleşmelerdeki kusurları bulmalarına yardım etmelerini içerdiğinden denetimlere benzer.

En önemli fark, hata ödül programlarının daha geniş bir geliştirici/hacker topluluğuna açık olması ve özgün yetenek ve deneyime sahip etik hacker ve bağımsız güvenlik profesyonellerinden oluşan bir grubu kendine çekmesidir. Bu, esas olarak sınırlı veya dar uzmanlığa sahip ekiplere emanet edilen akıllı sözleşme denetimlerine göre bir avantaj olabilir.

## Test araçları ve kütüphaneleri {#testing-tools-and-libraries}

### Birim test araçları {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity ile yazılmış akıllı sözleşmeler için kod kapsamı aracı._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Gelişmiş akıllı sözleşme geliştirme ve test çerçevesi (ethers.js tabanlı)_.

- **[Remix Testleri](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidity akıllı sözleşmelerini test etmeye yönelik araç. Bir sözleşme için test senaryoları yazmak ve çalıştırmak amacıyla kullanılan Remix IDE "Solidity Unit Testing" eklentisi altında çalışır._

- **[OpenZeppelin Test Yardımcıları](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Ethereum akıllı sözleşme testi için sav kütüphanesi. Sözleşmelerinizin beklendiği gibi davrandığından emin olun!_

- **[Brownie birim test çerçevesi](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie, minimum kodla küçük testler yazmanıza olanak tanıyan, büyük projeler için iyi ölçeklenen ve oldukça genişletilebilir, zengin özelliklere sahip bir test çerçevesi olan Pytest'i kullanır._

- **[Foundry Testleri](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry, basit birim testleri, gaz optimizasyon kontrolleri ve sözleşme bulanıklaştırma gerçekleştirebilen hızlı ve esnek bir Ethereum test çerçevesi olan Forge'u barındırır._

- **[Hardhat Testleri](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Ethers.js, Mocha ve Chai tabanlı akıllı sözleşme test çerçevesi._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Ethereum Sanal Makinası'nı hedefleyen akıllı sözleşmeleri test etmek için Python tabanlı geliştirme ve test çerçevesi._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _En iyi kullanıcı deneyimi ve performansı için pytest ve Anvil kullanan, güçlü hata ayıklama yetenekleri ve zincirler arası test desteği ile birim testi ve fuzz testine yönelik Python tabanlı bir geliştirici alanıdır._

### Özellik tabanlı test araçları {#property-based-testing-tools}

#### Statik analiz araçları {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Güvenlik açıklarını bulmaya, kod kavramayı geliştirmeye ve akıllı sözleşmeler için özel analizler yazmaya yarayan Python tabanlı Solidity statik analiz çerçevesi._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidity akıllı sözleşme programlama dilinin tarz ve güvenlik en iyi uygulamalarının yürütülmesini sağlamaya yarayan linter._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Web3 akıllı sözleşme güvenliği ve geliştirmesi için özel olarak tasarlanan, Rust tabanlı bir statik analiz aracıdır._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Güvenlik açığı ve kod kalitesi dedektörleri, koddan yararlı bilgiler ayıklamak için yazıcılar ve özel alt modüller yazma desteği ile Python tabanlı bir statik analiz geliştirici ortamıdır._

#### Dinamik analiz araçları {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Akıllı sözleşmelerdeki güvenlik açıklarını özellik tabanlı testler aracılığıyla tespit etmeye yarayan hızlı sözleşme bulandırıcı._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Akıllı sözleşme kodunda özellik ihlallerini tespit için kullanışlı, otomatikleştirilmiş bulandırma aracı._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _EVM bit kodunu analiz etmeye yarayan dinamik sembolik yürütme çerçevesi._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Kusur analizi, konkolik analiz ve kontrol akışı kontrolünü kullanarak sözleşme güvenlik açıklarını tespit etmeye yarayan ESM bit kodu değerlendirme aracı._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble, akıllı sözleşmelere özellikler eklemenize olanak tanıyan bir spesifikasyon dili ve çalışma zamanı doğrulama aracıdır. Bu özellikler sayesinde sözleşmeleri otomatik olarak Diligence Fuzzing veya MythX gibi araçlarla test edebilirsiniz._

## İlgili öğreticiler {#related-tutorials}

- [Farklı test ürünlerine genel bakış ve ürünlerin karşılaştırılması](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Manticore kullanarak akıllı sözleşme hataları nasıl bulunur?](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır?](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Solidity sözleşmeleri test etmek için nasıl taklit edilir?](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundry'de Solidity kullanarak birim testi çalıştırma](https://www.rareskills.io/post/foundry-testing-solidity)

## Daha fazla bilgi {#further-reading}

- [Ethereum akıllı sözleşmelerini test etmeye yönelik ayrıntılı bir kılavuz](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Ethereum akıllı sözleşmeleri nasıl test edilir?](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO'nun geliştiriciler için birim testi rehberi](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Akıllı sözleşmeleri, konunun en büyük uzmanı gibi nasıl test edersiniz?](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
