---
title: "Akıllı sözleşmeleri test etme"
description: "Ethereum akıllı sözleşmelerini test etmek için tekniklere ve dikkat edilmesi gerekenlere genel bakış."
lang: tr
---

Ethereum gibi halka açık blokzincirler değişmezdir, bu da bir akıllı sözleşme kodunu dağıtımdan sonra değiştirmeyi zorlaştırır. "Sanal yükseltmeler" gerçekleştirmek için [Sözleşme yükseltme kalıpları](/developers/docs/smart-contracts/upgrading/) mevcuttur, ancak bunların uygulanması zordur ve sosyal mutabakat gerektirir. Dahası, bir yükseltme bir hatayı yalnızca keşfedildikten _sonra_ düzeltebilir; eğer bir saldırgan güvenlik açığını daha önce keşfederse, akıllı sözleşmeniz bir istismar riski altındadır.

Bu nedenlerle, akıllı sözleşmeleri Ana Ağ'a [dağıtmadan](/developers/docs/smart-contracts/deploying/) önce test etmek [güvenlik](/developers/docs/smart-contracts/security/) için asgari bir gerekliliktir. Sözleşmeleri test etmek ve kod doğruluğunu değerlendirmek için birçok teknik vardır; ne seçeceğiniz ihtiyaçlarınıza bağlıdır. Yine de, farklı araçlardan ve yaklaşımlardan oluşan bir test takımı, sözleşme kodundaki hem küçük hem de büyük güvenlik açıklarını yakalamak için idealdir.

## Ön Koşullar {#prerequisites}

Bu sayfa, akıllı sözleşmeleri Ethereum ağında dağıtmadan önce nasıl test edeceğinizi açıklar. [Akıllı sözleşmelere](/developers/docs/smart-contracts/) aşina olduğunuzu varsayar.

## Akıllı sözleşme testi nedir? {#what-is-smart-contract-testing}

Akıllı sözleşme testi, bir akıllı sözleşme kodunun beklendiği gibi çalıştığını doğrulama sürecidir. Test işlemi, belirli bir akıllı sözleşmenin güvenilirlik, kullanılabilirlik ve güvenlik gereksinimlerini karşılayıp karşılamadığını kontrol etmek için yararlıdır.

Yaklaşımlar farklılık gösterse de çoğu test yöntemi, bir akıllı sözleşmenin işlemesi beklenen verilerin küçük bir örneğiyle yürütülmesini gerektirir. Sözleşme, örnek veriler için doğru sonuçlar üretirse düzgün çalıştığı varsayılır. Çoğu test aracı, bir sözleşmenin yürütülmesinin beklenen sonuçlarla eşleşip eşleşmediğini kontrol etmek için [test senaryoları](https://en.m.wikipedia.org/wiki/Test_case) yazmak ve yürütmek üzere kaynaklar sağlar.

### Akıllı sözleşmeleri test etmek neden önemlidir? {#importance-of-testing-smart-contracts}

Akıllı sözleşmeler genellikle yüksek değerli finansal varlıkları yönettiğinden, küçük programlama hataları [kullanıcılar için devasa kayıplara](https://rekt.news/leaderboard/) yol açabilir ve sıklıkla açar. Bununla birlikte sıkı bir test süreci, bir akıllı sözleşmenin kodundaki kusurları ve sorunları erkenden keşfetmenize ve Ana Ağ'da başlatmadan önce bunları düzeltmenize yardımcı olabilir.

Bir hata keşfedilirse bir sözleşmeyi yükseltmek mümkün olsa da, yükseltmeler karmaşıktır ve yanlış yönetilirse [hatalara neden olabilir](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Bir sözleşmeyi yükseltmek, değişmezlik ilkesini daha da geçersiz kılar ve kullanıcıları ek güven varsayımları ile yükümlü kılar. Aksine, sözleşmenizi test etmeye yönelik kapsamlı bir plan, akıllı sözleşme güvenlik risklerini azaltır ve dağıtım sonrasında karmaşık mantık yükseltmeleri gerçekleştirme ihtiyacını en aza indirir.

## Akıllı sözleşmeleri test etme yöntemleri {#methods-for-testing-smart-contracts}

Ethereum akıllı sözleşmelerini test etme yöntemleri iki geniş kategoriye ayrılır: **otomatik test** ve **manuel test**. Otomatik test ve manuel test benzersiz faydalar ve ödünleşimler sunar, ancak sözleşmelerinizi analiz etmek üzere sağlam bir plan oluşturmak için her ikisini birleştirebilirsiniz.

### Otomatik test {#automated-testing}

Otomatik test, bir akıllı sözleşmenin kodunu yürütme sırasındaki hatalar açısından otomatik olarak kontrol eden araçlar kullanır. Otomatik testin faydası, sözleşme işlevlerinin değerlendirilmesine rehberlik etmesi için [betiklerin](https://www.techtarget.com/whatis/definition/script?amp=1) kullanılmasından gelir. Betik tabanlı testler, minimum insan müdahalesi ile tekrar tekrar çalışacak şekilde programlanabilir, bu da otomatik testleri manuel test yaklaşımlarından daha verimli hâle getirir.

Otomatik testler özellikle; testler tekrarlayan ve zaman alıcı olduğunda, manuel olarak gerçekleştirilmesi zor olduğunda, insan hatasına açık olduğunda veya kritik sözleşme işlevlerini değerlendirmeyi içerdiğinde kullanışlıdır. Ancak otomatik test araçlarının dezavantajları olabilir; bazı hataları gözden kaçırabilir ve birçok [yanlış pozitif](https://www.contrastsecurity.com/glossary/false-positive) üretebilirler. Bu nedenle, akıllı sözleşmeler için otomatik testi manuel test ile eşleştirmek idealdir.

### Manuel test {#manual-testing}

Manuel test insan yardımıyla yapılır ve bir akıllı sözleşmenin doğruluğunu analiz ederken test takımınızdaki her bir test senaryosunu arka arkaya yürütmeyi içerir. Bu, bir sözleşme üzerinde aynı anda birden fazla izole testi çalıştırabileceğiniz ve tüm başarısız olan ve geçen testleri gösteren bir rapor alabileceğiniz otomatik testten farklıdır.

Manuel test, farklı test senaryolarını kapsayan yazılı bir test planını izleyen tek bir kişi tarafından gerçekleştirilebilir. Ayrıca manuel testin bir parçası olarak birden fazla kişi veya grubun belirli bir süre boyunca bir akıllı sözleşmeyle etkileşime girmesini sağlayabilirsiniz. Test uzmanları, sözleşmenin gerçek davranışını beklenen davranışla karşılaştıracak ve herhangi bir farkı hata olarak işaretleyecektir.

Etkili manuel test, önemli kaynaklar (beceri, zaman, para ve çaba) gerektirir ve testleri yürütürken insan hatası nedeniyle belirli hataları gözden kaçırmak mümkündür. Ancak manuel test faydalı da olabilir; örneğin bir insan test uzmanı (ör. bir denetçi), otomatik bir test aracının gözden kaçıracağı uç durumları tespit etmek için sezgisini kullanabilir.

## Akıllı sözleşmeler için otomatik test {#automated-testing-for-smart-contracts}

### Birim testi {#unit-testing-for-smart-contracts}

Birim testi, sözleşme işlevlerini ayrı ayrı değerlendirir ve her bileşenin doğru çalışıp çalışmadığını kontrol eder. İyi birim testleri basit ve çalıştırılması hızlı olmalı; ayrıca testler başarısız olursa neyin yanlış gittiğine dair net bir fikir sağlamalıdır.

Birim testleri, işlevlerin beklenen değerleri döndürdüğünü ve işlev yürütüldükten sonra sözleşme depolamasının düzgün bir şekilde güncellendiğini kontrol etmek için yararlıdır. Dahası, bir sözleşmenin kod tabanında değişiklikler yaptıktan sonra birim testleri çalıştırmak, yeni mantık eklemenin hatalara yol açmamasını sağlar. Etkili birim testleri çalıştırmak için bazı yönergeler aşağıdadır:

#### Akıllı sözleşmelere birim testi uygulamak için yönergeler {#unit-testing-guidelines}

##### 1. Sözleşmenizin iş mantığını ve iş akışını anlayın

Birim testleri yazmadan önce, bir akıllı sözleşmenin hangi işlevleri sunduğunu ve kullanıcıların bu işlevlere nasıl erişip kullanacağını bilmek yardımcı olur. Bu, özellikle bir sözleşmedeki işlevlerin geçerli kullanıcı girdileri için doğru çıktıyı döndürüp döndürmediğini belirleyen [mutlu yol (happy path) testleri](https://en.m.wikipedia.org/wiki/Happy_path) çalıştırmak için kullanışlıdır. Bu kavramı, [bir açık artırma sözleşmesinin](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) şu (kısaltılmış) örneğini kullanarak açıklayacağız:

```solidity
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

Bu, teklif verme süresi boyunca teklifler almak üzere tasarlanmış basit bir açık artırma sözleşmesidir. Eğer `highestBid` artarsa, önceki en yüksek teklif sahibi parasını alır; teklif verme süresi bittiğinde, `beneficiary` parasını almak için sözleşmeyi çağırır.

Böyle bir sözleşme için birim testleri, bir kullanıcının sözleşmeyle etkileşime girerken çağırabileceği farklı işlevleri kapsayacaktır. Buna bir örnek, açık artırma devam ederken bir kullanıcının teklif verip veremediğini (yani `bid()` çağrılarının başarılı olduğunu) kontrol eden veya bir kullanıcının mevcut `highestBid` değerinden daha yüksek bir teklif verip veremediğini kontrol eden bir birim testidir.

Bir sözleşmenin operasyonel iş akışını anlamak, yürütmenin gereksinimleri karşılayıp karşılamadığını kontrol eden birim testleri yazmaya da yardımcı olur. Örneğin, açık artırma sözleşmesi, açık artırma sona erdiğinde (yani `auctionEndTime` `block.timestamp` değerinden düşük olduğunda) kullanıcıların teklif veremeyeceğini belirtir. Bu nedenle, bir geliştirici açık artırma bittiğinde (yani `auctionEndTime` > `block.timestamp` olduğunda) `bid()` işlevine yapılan çağrıların başarılı olup olmadığını kontrol eden bir birim testi çalıştırabilir.

##### 2. Sözleşmenin yürütülmesiyle ilgili tüm varsayımları değerlendirin

Bir sözleşmenin yürütülmesine dair tüm varsayımları belgelemek ve bu varsayımların geçerliliğini doğrulamak için birim testleri yazmak önemlidir. Beklenmeyen yürütmelere karşı koruma sağlamasının yanı sıra, `assert` (doğrulama) durumlarını test etmek sizi bir akıllı sözleşmenin güvenlik modelini bozabilecek işlemler hakkında düşünmeye zorlar. Faydalı bir ipucu, "mutlu kullanıcı testleri"nin ötesine geçmek ve bir işlevin yanlış girdiler için başarısız olup olmadığını kontrol eden negatif testler yazmaktır.

Birçok birim testi çerçevesi, `assert` durumları (bir sözleşmenin ne yapıp ne yapamayacağını belirten basit ifadeler) oluşturmanıza ve bu durumların yürütme altında geçerli olup olmadığını görmek için testler çalıştırmanıza olanak tanır. Daha önce açıklanan açık artırma sözleşmesi üzerinde çalışan bir geliştirici, negatif testleri çalıştırmadan önce davranışı hakkında aşağıdaki varsayımlarda bulunabilir:

- Kullanıcılar açık artırma bittiğinde veya henüz başlamadığında teklif veremezler.

- Eğer bir teklif kabul edilebilir eşiğin altındaysa, açık artırma sözleşmesi işlemi geri alır (revert).

- Teklifi kazanamayan kullanıcılara fonları iade edilir.

**Not**: Varsayımları test etmenin bir başka yolu, bir sözleşmedeki [işlev değiştiricileri (function modifiers)](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers), özellikle `require`, `assert` ve `if…else` ifadelerini tetikleyen testler yazmaktır.

##### 3. Kod kapsamını ölçün

[Kod kapsamı](https://en.m.wikipedia.org/wiki/Code_coverage), testler sırasında yürütülen kodunuzdaki dalların, satırların ve ifadelerin sayısını izleyen bir test metriğidir. Test edilmemiş güvenlik açıkları riskini en aza indirmek için testler iyi bir kod kapsamına sahip olmalıdır. Yeterli kapsam olmadan, tüm testler geçtiği için sözleşmenizin güvenli olduğunu yanlış bir şekilde varsayabilirsiniz; oysa test edilmemiş kod yollarında güvenlik açıkları hâlâ var olabilir. Bununla birlikte yüksek kod kapsamı kaydetmek, bir akıllı sözleşmedeki tüm ifadelerin/işlevlerin doğruluk açısından yeterince test edildiğinin güvencesini verir.

##### 4. İyi geliştirilmiş test çerçevelerini kullanın

Akıllı sözleşmeleriniz için birim testleri çalıştırmada kullanılan araçların kalitesi çok önemlidir. İdeal bir test çerçevesi, düzenli olarak bakımı yapılan; kullanışlı özellikler (ör. günlükleme ve raporlama yetenekleri) sağlayan; ve diğer geliştiriciler tarafından kapsamlı bir şekilde kullanılmış ve incelenmiş olan bir çerçevedir.

Solidity akıllı sözleşmeleri için birim testi çerçeveleri farklı dillerde (çoğunlukla JavaScript, Python ve Rust) gelir. Farklı test çerçeveleri ile birim testleri çalıştırmaya nasıl başlayacağınız hakkında bilgi için aşağıdaki bazı kılavuzlara bakın:

- **[Brownie ile birim testleri çalıştırma](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundry ile birim testleri çalıştırma](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffle ile birim testleri çalıştırma](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remix ile birim testleri çalıştırma](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ape ile birim testleri çalıştırma](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhat ile birim testleri çalıştırma](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wake ile birim testleri çalıştırma](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**
- **[Moccasin ile birim testleri çalıştırma](https://github.com/Cyfrin/moccasin)**

### Entegrasyon testi {#integration-testing-for-smart-contracts}

Birim testi sözleşme işlevlerinin izole bir şekilde hatalarını ayıklarken, entegrasyon testleri bir akıllı sözleşmenin bileşenlerini bir bütün olarak değerlendirir. Entegrasyon testi, sözleşmeler arası çağrılardan veya aynı akıllı sözleşmedeki farklı işlevler arasındaki etkileşimlerden kaynaklanan sorunları tespit edebilir. Örneğin, entegrasyon testleri [kalıtım (inheritance)](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) ve bağımlılık enjeksiyonu (dependency injection) gibi şeylerin düzgün çalışıp çalışmadığını kontrol etmeye yardımcı olabilir.

Entegrasyon testi, sözleşmeniz modüler bir mimari benimsiyorsa veya yürütme sırasında diğer zincir içi sözleşmelerle arayüz oluşturuyorsa faydalıdır. Entegrasyon testlerini çalıştırmanın bir yolu, belirli bir yükseklikte [blokzinciri çatallamak](/glossary/#fork) ([Forge](https://book.getfoundry.sh/forge/fork-testing) veya [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) gibi bir araç kullanarak) ve sözleşmeniz ile dağıtılmış sözleşmeler arasındaki etkileşimleri simüle etmektir.

Çatallanan blokzincir, Ana Ağ'a benzer şekilde davranacak ve ilişkili durumlara ve bakiyelere sahip hesaplara sahip olacaktır. Ancak yalnızca korumalı (sandboxed) bir yerel geliştirme ortamı işlevi görür, yani işlemler için örneğin gerçek ETH'ye ihtiyacınız olmayacağı gibi, değişiklikleriniz gerçek Ethereum Protokolü'nü de etkilemeyecektir.

### Özellik tabanlı test {#property-based-testing-for-smart-contracts}

Özellik tabanlı test, bir akıllı sözleşmenin tanımlanmış bazı özellikleri sağlayıp sağlamadığını kontrol etme sürecidir. Özellikler, bir sözleşmenin farklı senaryolarda doğru kalması beklenen davranışlarına ilişkin gerçekleri ileri sürer (assert); bir akıllı sözleşme özelliğine örnek olarak "Sözleşmedeki aritmetik işlemlerde asla taşma (overflow) veya alt taşma (underflow) olmaz" verilebilir.

**Statik analiz** ve **dinamik analiz**, özellik tabanlı testleri yürütmek için iki yaygın tekniktir ve her ikisi de bir program (bu durumda bir akıllı sözleşme) kodunun önceden tanımlanmış bazı özellikleri sağladığını doğrulayabilir. Bazı özellik tabanlı test araçları, beklenen sözleşme özellikleriyle ilgili önceden tanımlanmış kurallarla gelir ve kodu bu kurallara göre kontrol ederken, diğerleri bir akıllı sözleşme için özel özellikler oluşturmanıza izin verir.

#### Statik analiz {#static-analysis}

Bir statik analizör, bir akıllı sözleşmenin kaynak kodunu girdi olarak alır ve bir sözleşmenin bir özelliği sağlayıp sağlamadığını beyan eden sonuçlar çıkarır. Dinamik analizin aksine statik analiz, bir sözleşmeyi doğruluk açısından analiz etmek için onu yürütmeyi içermez. Bunun yerine statik analiz, bir akıllı sözleşmenin yürütme sırasında alabileceği tüm olası yollar hakkında akıl yürütür (yani, sözleşmenin çalışma zamanındaki (runtime) işleyişi için ne anlama geleceğini belirlemek üzere kaynak kodun yapısını inceleyerek).

[Hata ayıklama (Linting)](https://www.perforce.com/blog/qac/what-is-linting) ve [statik test](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis), sözleşmeler üzerinde statik analiz çalıştırmak için yaygın yöntemlerdir. Her ikisi de, derleyici tarafından çıktı olarak verilen [soyut sözdizimi ağaçları (abstract syntax trees)](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) ve [kontrol akış grafikleri](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) gibi bir sözleşmenin yürütülmesinin düşük seviyeli temsillerini analiz etmeyi gerektirir.

Çoğu durumda statik analiz, güvensiz yapıların kullanımı, sözdizimi hataları veya bir sözleşme kodundaki kodlama standartlarının ihlalleri gibi güvenlik sorunlarını tespit etmek için kullanışlıdır. Ancak statik analizörlerin daha derin güvenlik açıklarını tespit etmede genel olarak yetersiz kaldığı bilinmektedir ve aşırı sayıda yanlış pozitif üretebilirler.

#### Dinamik analiz {#dynamic-analysis}

Dinamik analiz, herhangi bir yürütme izinin belirli özellikleri ihlal edip etmediğini görmek için akıllı sözleşme işlevlerine sembolik girdiler (ör. [sembolik yürütmede](https://en.m.wikipedia.org/wiki/Symbolic_execution)) veya somut girdiler (ör. [bulanıklaştırmada (fuzzing)](https://owasp.org/www-community/Fuzzing)) üretir. Özellik tabanlı testin bu biçimi, test senaryolarının birden fazla senaryoyu kapsaması ve bir programın test senaryolarının oluşturulmasını üstlenmesi bakımından birim testlerinden farklıdır.

[Bulanıklaştırma (Fuzzing)](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing), akıllı sözleşmelerdeki isteğe bağlı özellikleri doğrulamak için kullanılan dinamik analiz tekniğine bir örnektir. Bir fuzzer (bulanıklaştırıcı), hedeflenen bir sözleşmedeki işlevleri tanımlanmış bir girdi değerinin rastgele veya hatalı varyasyonlarıyla çağırır. Eğer akıllı sözleşme bir hata durumuna girerse (örneğin bir doğrulamanın (assertion) başarısız olduğu bir duruma), sorun işaretlenir ve yürütmeyi savunmasız yola yönlendiren girdiler bir raporda üretilir.

Beklenmedik girdilerin yanlış işlenmesi amaçlanmayan yürütmelere yol açabileceğinden ve tehlikeli etkilere neden olabileceğinden, bulanıklaştırma (fuzzing) bir akıllı sözleşmenin girdi doğrulama mekanizmasını değerlendirmek için faydalıdır. Özellik tabanlı testin bu şekli birçok nedenden dolayı ideal olabilir:

1. **Birçok senaryoyu kapsayacak test senaryoları yazmak zordur.** Özellik testi, yalnızca bir davranış ve davranışı test edeceğiniz veri aralığını tanımlamanızı gerektirir; program, tanımlanan özelliğe dayalı olarak otomatik şekilde test senaryoları üretir.

2. **Test takımınız program içindeki olası tüm yolları yeterince kapsamayabilir.** %100 kapsamla bile uç durumları gözden kaçırmak mümkündür.

3. **Birim testleri, bir sözleşmenin örnek veriler için doğru şekilde yürütüldüğünü kanıtlar, ancak sözleşmenin örneğin dışındaki girdiler için doğru şekilde yürütülüp yürütülmediği bilinmemektedir.** Özellik testleri, doğrulama (assertion) başarısızlıklarına neden olan yürütme izlerini bulmak için hedef bir sözleşmeyi belirli bir girdi değerinin birden çok varyasyonuyla yürütür. Böylece özellik testi, bir sözleşmenin geniş bir girdi verisi sınıfı için doğru şekilde yürütüleceğine dair daha fazla garanti sağlar.

### Akıllı sözleşmelere özellik tabanlı test uygulamak için yönergeler {#running-property-based-tests}

Özellik tabanlı bir testi çalıştırmak, tipik olarak bir akıllı sözleşmede doğrulamak istediğiniz bir özelliği (ör. [tam sayı taşmalarının](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow) olmaması) veya özellikler koleksiyonunu tanımlamakla başlar. Ayrıca özellik testleri yazarken, programın işlem girdileri için veri üretebileceği bir değer aralığı tanımlamanız gerekebilir.

Düzgün şekilde yapılandırıldığında, özellik testi aracı akıllı sözleşme işlevlerinizi rastgele oluşturulmuş girdilerle yürütecektir. Herhangi bir doğrulama (assertion) ihlali varsa, değerlendirilen özelliği ihlal eden somut girdi verilerini içeren bir rapor alırsınız. Farklı araçlarla özellik tabanlı testler çalıştırmaya başlamak için aşağıdaki bazı kılavuzlara göz atın:

- **[Slither ile akıllı sözleşmelerin statik analizi](https://github.com/crytic/slither)**
- **[Wake ile akıllı sözleşmelerin statik analizi](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownie ile özellik tabanlı test](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundry ile sözleşmeleri bulanıklaştırma (fuzzing)](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Echidna ile sözleşmeleri bulanıklaştırma (fuzzing)](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wake ile sözleşmeleri bulanıklaştırma (fuzzing)](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Manticore ile akıllı sözleşmelerin sembolik yürütülmesi](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythril ile akıllı sözleşmelerin sembolik yürütülmesi](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## Akıllı sözleşmeler için manuel test {#manual-testing-for-smart-contracts}

Akıllı sözleşmelerin manuel testi, geliştirme döngüsünde genellikle otomatik testleri çalıştırdıktan sonra gelir. Bu test biçimi, teknik gereksinimlerde belirtildiği gibi performans gösterip göstermediğini görmek için akıllı sözleşmeyi tam entegre bir ürün olarak değerlendirir.

### Sözleşmeleri yerel bir blokzincirde test etme {#testing-on-local-blockchain}

Yerel bir geliştirme ortamında gerçekleştirilen otomatik testler faydalı hata ayıklama bilgileri sağlayabilse de, akıllı sözleşmenizin bir üretim ortamında nasıl davrandığını bilmek isteyeceksiniz. Ancak, ana Ethereum zincirine dağıtmak gaz ücretlerine neden olur; akıllı sözleşmenizin hâlâ hataları varsa sizin veya kullanıcılarınızın gerçek para kaybedebileceğinden bahsetmiyoruz bile.

Sözleşmenizi yerel bir blokzincirde (aynı zamanda bir [geliştirme ağı](/developers/docs/development-networks/) olarak da bilinir) test etmek, Ana Ağ'da test etmeye önerilen bir alternatiftir. Yerel blokzincir, Ethereum yürütme katmanının davranışını simüle eden ve bilgisayarınızda yerel olarak çalışan Ethereum blokzincirinin bir kopyasıdır. Bu sayede, önemli bir genel gidere (overhead) katlanmadan bir sözleşmeyle etkileşime girmesi için işlemleri programlayabilirsiniz.

Yerel bir blokzincirde sözleşmeleri çalıştırmak, bir tür manuel entegrasyon testi olarak faydalı olabilir. [Akıllı sözleşmeler son derece birleştirilebilirdir](/developers/docs/smart-contracts/composability/), bu da mevcut protokollerle entegre olmanızı sağlar; ancak yine de bu tür karmaşık zincir içi etkileşimlerin doğru sonuçlar ürettiğinden emin olmanız gerekir.

[Geliştirme ağları hakkında daha fazlası.](/developers/docs/development-networks/)

### Sözleşmeleri test ağlarında test etme {#testing-contracts-on-testnets}

Bir test ağı (testnet), gerçek dünya değeri olmayan Ether (ETH) kullanması dışında tam olarak Ethereum Ana Ağı gibi çalışır. Sözleşmenizi bir [test ağında](/developers/docs/networks/#ethereum-testnets) dağıtmak, fonları riske atmadan herkesin (ör. merkeziyetsiz uygulamanın önyüzü (frontend) aracılığıyla) onunla etkileşime girebileceği anlamına gelir.

Bu tür bir manuel test, uygulamanızın uçtan uca akışını kullanıcının bakış açısından değerlendirmek için faydalıdır. Burada, beta testçileri ayrıca deneme amaçlı çalıştırmalar yapabilir ve sözleşmenin iş mantığı ile genel işlevselliği hakkındaki her türlü sorunu bildirebilirler.

Yerel bir blokzincirde test ettikten sonra bir test ağında dağıtım yapmak idealdir; çünkü test ağı, Ethereum Sanal Makinesi'nin (EVM) davranışına daha yakındır. Bu nedenle, birçok Ethereum yereli projenin, gerçek dünya koşullarında bir akıllı sözleşme operasyonunu değerlendirmek için test ağlarında merkeziyetsiz uygulamalar dağıtması yaygındır.

[Ethereum test ağları hakkında daha fazlası.](/developers/docs/development-networks/#public-beacon-testchains)

## Test ve biçimsel doğrulama karşılaştırması {#testing-vs-formal-verification}

Testler, bir sözleşmenin bazı veri girdileri için beklenen sonuçları döndürdüğünü doğrulamaya yardımcı olsa da, testler sırasında kullanılmayan girdiler için aynısını kesin olarak kanıtlayamaz. Bu nedenle, bir akıllı sözleşmeyi test etmek "işlevsel doğruluğu" garanti edemez (yani, bir programın _tüm_ girdi değeri kümeleri için gerektiği gibi davrandığını gösteremez).

Biçimsel doğrulama, programın biçimsel modelinin biçimsel şartname ile eşleşip eşleşmediğini kontrol ederek yazılımın doğruluğunu değerlendirmeye yönelik bir yaklaşımdır. Biçimsel bir model, bir programın soyut matematiksel temsiliyken, biçimsel bir şartname bir programın özelliklerini (yani, programın yürütülmesiyle ilgili mantıksal iddiaları (assertions)) tanımlar.

Özellikler matematiksel terimlerle yazıldığı için, sistemin biçimsel (matematiksel) bir modelinin mantıksal çıkarım kurallarını kullanarak bir şartnameyi sağladığını doğrulamak mümkün hâle gelir. Böylece, biçimsel doğrulama araçlarının sistemin doğruluğunun 'matematiksel kanıtını' ürettiği söylenir.

Testin aksine, biçimsel doğrulama bir akıllı sözleşmenin yürütülmesinin örnek verilerle yürütülmesine gerek kalmadan _tüm_ yürütmeler için (yani, hatası olmadığını) biçimsel bir şartnameyi sağladığını doğrulamak için kullanılabilir. Bu yalnızca düzinelerce birim testini çalıştırmak için harcanan zamanı azaltmakla kalmaz, aynı zamanda gizli güvenlik açıklarını yakalamada daha etkilidir. Bununla birlikte, biçimsel doğrulama teknikleri uygulanabilme zorluklarına ve kullanışlılıklarına bağlı olarak bir yelpazede yer alır.

[Akıllı sözleşmeler için biçimsel doğrulama hakkında daha fazlası.](/developers/docs/smart-contracts/formal-verification)

## Test, denetimler ve hata ödüllerinin karşılaştırması {#testing-vs-audits-bug-bounties}

Belirtildiği gibi sıkı bir test süreci, bir sözleşmede hataların olmadığını nadiren garanti edebilir; biçimsel doğrulama yaklaşımları doğruluk konusunda daha güçlü güvenceler sağlayabilir ancak şu anda kullanımları zordur ve önemli maliyetlere neden olurlar.

Yine de, bağımsız bir kod incelemesi alarak sözleşmedeki güvenlik açıklarını yakalama olasılığını daha da artırabilirsiniz. [Akıllı sözleşme denetimleri](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) ve [hata ödülleri (bug bounties)](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7), sözleşmelerinizi başkalarına analiz ettirmenin iki yoludur.

Denetimler, akıllı sözleşmelerdeki güvenlik açıklarını ve zayıf geliştirme pratiklerini bulma konusunda deneyimli denetçiler tarafından gerçekleştirilir. Bir denetim genellikle testlerin (ve muhtemelen biçimsel doğrulamanın) yanı sıra tüm kod tabanının manuel olarak incelenmesini de içerir.

Bunun aksine, bir hata ödül programı genellikle bir akıllı sözleşmede bir güvenlik açığı keşfeden ve bunu geliştiricilere ifşa eden bir bireye (genellikle [beyaz şapkalı bilgisayar korsanları](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) mali bir ödül sunmayı içerir. Hata ödülleri, başkalarından akıllı sözleşmelerdeki kusurları bulmaya yardımcı olmalarını istemeyi içermesi bakımından denetimlere benzer.

En büyük fark, hata ödülü programlarının daha geniş bir geliştirici/hacker topluluğuna açık olması ve benzersiz beceri ve deneyime sahip geniş bir etik hacker ve bağımsız güvenlik profesyoneli sınıfını cezbetmesidir. Bu, temel olarak sınırlı veya dar bir uzmanlığa sahip olabilecek ekiplere dayanan akıllı sözleşme denetimlerine karşı bir avantaj olabilir.

## Test araçları ve kütüphaneleri {#testing-tools-and-libraries}

### Birim testi araçları {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity ile yazılmış akıllı sözleşmeler için kod kapsamı aracı._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Gelişmiş akıllı sözleşme geliştirme ve test çerçevesi (Ethers.js tabanlı)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidity akıllı sözleşmelerini test etme aracı. Bir sözleşme için test senaryoları yazmak ve çalıştırmak amacıyla kullanılan Remix IDE "Solidity Birim Testi" eklentisinin altında çalışır._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Ethereum akıllı sözleşme testi için doğrulama (assertion) kütüphanesi. Sözleşmelerinizin beklediğiniz gibi davrandığından emin olun!_

- **[Brownie birim testi çerçevesi](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie, minimum kodla küçük testler yazmanıza olanak tanıyan, büyük projeler için iyi ölçeklenen ve oldukça genişletilebilir, özellik açısından zengin bir test çerçevesi olan Pytest'i kullanır._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry, basit birim testleri, gaz optimizasyonu kontrolleri ve sözleşme bulanıklaştırma (fuzzing) işlemlerini yürütebilen, hızlı ve esnek bir Ethereum test çerçevesi olan Forge'u sunar._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Ethers.js, Mocha ve Chai tabanlı, akıllı sözleşmeleri test etmeye yönelik bir çerçevedir._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Ethereum Sanal Makinesi'ni (EVM) hedefleyen, akıllı sözleşmeler için Python tabanlı geliştirme ve test çerçevesidir._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Birim testi ve bulanıklaştırma (fuzzing) için güçlü hata ayıklama yetenekleri ve zincirler arası test desteğine sahip, en iyi kullanıcı deneyimi ve performans için pytest ile Anvil kullanan Python tabanlı bir çerçevedir._

### Özellik tabanlı test araçları {#property-based-testing-tools}

#### Statik analiz araçları {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Güvenlik açıklarını bulmak, kod anlaşılırlığını artırmak ve akıllı sözleşmeler için özel analizler yazmak amacıyla kullanılan Python tabanlı Solidity statik analiz çerçevesidir._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidity akıllı sözleşme programlama dili için biçim ve güvenlik açısından en iyi uygulamaları zorunlu kılan linter aracıdır._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Özellikle Web3 akıllı sözleşme güvenliği ve geliştirmesi için tasarlanmış Rust tabanlı statik analizördür._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Güvenlik açığı ve kod kalitesi algılayıcıları, koddan yararlı bilgileri ayıklamak için yazdırıcılar ve özel alt modüller (submodules) yazma desteğine sahip Python tabanlı statik analiz çerçevesidir._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Solidity için basit ve güçlü bir linter aracıdır._

#### Dinamik analiz araçları {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Özellik tabanlı test yoluyla akıllı sözleşmelerdeki güvenlik açıklarını tespit etmek için kullanılan hızlı sözleşme fuzzer aracıdır._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Akıllı sözleşme kodundaki özellik ihlallerini tespit etmek için faydalı olan otomatik bulanıklaştırma (fuzzing) aracıdır._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _EVM baytkodunu analiz etmek için dinamik sembolik yürütme çerçevesidir._

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)** - _Bulaşma analizi (taint analysis), konkolik analiz ve kontrol akışı denetimi kullanarak sözleşmedeki güvenlik açıklarını tespit etmek için kullanılan EVM baytkodu değerlendirme aracıdır._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble, akıllı sözleşmelere özellikler ekleyerek Diligence Fuzzing veya MythX gibi araçlarla sözleşmeleri otomatik olarak test etmenizi sağlayan bir şartname dili ve çalışma zamanı doğrulama aracıdır._

## İlgili öğreticiler {#related-tutorials}

- [Farklı test ürünlerine genel bir bakış ve karşılaştırma](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır?](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Akıllı sözleşme hatalarını bulmak için Manticore nasıl kullanılır?](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır?](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Test amaçlı Solidity sözleşmeleri nasıl mock'lanır (taklit edilir)?](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundry kullanarak Solidity'de birim testleri nasıl çalıştırılır?](https://www.rareskills.io/post/foundry-testing-solidity)

## Daha fazla bilgi {#further-reading}

- [Ethereum akıllı sözleşmelerini test etmeye yönelik derinlemesine bir kılavuz](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Ethereum akıllı sözleşmeleri nasıl test edilir?](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO'nun geliştiriciler için birim testi kılavuzu](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Akıllı sözleşmeleri bir rock yıldızı gibi nasıl test edersiniz?](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Öğreticiler: Ethereum üzerinde akıllı sözleşme testleri {#tutorials}

- [Yerel, çoklu istemcili (multi-client) bir test ağında bir dapp nasıl geliştirilir ve test edilir?](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Yerel bir test ağında akıllı sözleşme dağıtma ve testler gerçekleştirme süreci adımları._
- [Test için Solidity akıllı sözleşmeleri nasıl mock'lanır (taklit edilir)?](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Mock veri kullanma ve birim testi uygulamaya yönelik orta düzey öğretici._
- [Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır?](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Bulanıklaştırmaya (fuzzing) ve akıllı sözleşme testine gelişmiş bir yaklaşım._