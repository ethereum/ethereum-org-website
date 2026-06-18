---
title: Akıllı sözleşmeleri test etme
description: Ethereum akıllı sözleşmelerini test etmeye yönelik tekniklere ve dikkat edilmesi gerekenlere genel bir bakış.
lang: tr
---

Ethereum gibi halka açık blokzincirler değişmezdir, bu da bir akıllı sözleşmenin kodunu dağıtımdan sonra değiştirmeyi zorlaştırır. "Sanal yükseltmeler" gerçekleştirmek için [Sözleşme yükseltme kalıpları](/developers/docs/smart-contracts/upgrading/) mevcuttur, ancak bunların uygulanması zordur ve sosyal mutabakat gerektirir. Dahası, bir yükseltme bir hatayı yalnızca keşfedildikten _sonra_ düzeltebilir; eğer bir saldırgan güvenlik açığını önce keşfederse, akıllı sözleşmeniz bir istismar riski altındadır.

Bu nedenlerden dolayı, akıllı sözleşmeleri Ana Ağ'a [dağıtmadan](/developers/docs/smart-contracts/deploying/) önce test etmek, [güvenlik](/developers/docs/smart-contracts/security/) için asgari bir gerekliliktir. Sözleşmeleri test etmek ve kod doğruluğunu değerlendirmek için birçok teknik vardır; hangisini seçeceğiniz ihtiyaçlarınıza bağlıdır. Yine de, farklı araçlardan ve yaklaşımlardan oluşan bir test paketi, sözleşme kodundaki hem küçük hem de büyük güvenlik açıklarını yakalamak için idealdir.

## Ön koşullar {#prerequisites}

Bu sayfa, Ethereum ağında dağıtmadan önce akıllı sözleşmelerin nasıl test edileceğini açıklar. [Akıllı sözleşmelere](/developers/docs/smart-contracts/) aşina olduğunuzu varsayar.

## Akıllı sözleşme testi nedir? {#what-is-smart-contract-testing}

Akıllı sözleşme testi, bir akıllı sözleşmenin kodunun beklendiği gibi çalıştığını doğrulama sürecidir. Test etme, belirli bir akıllı sözleşmenin güvenilirlik, kullanılabilirlik ve güvenlik gereksinimlerini karşılayıp karşılamadığını kontrol etmek için faydalıdır.

Yaklaşımlar farklılık gösterse de, çoğu test yöntemi bir akıllı sözleşmeyi işlemesi beklenen verilerin küçük bir örneğiyle yürütmeyi gerektirir. Sözleşme örnek veriler için doğru sonuçlar üretirse, düzgün çalıştığı varsayılır. Çoğu test aracı, bir sözleşmenin yürütülmesinin beklenen sonuçlarla eşleşip eşleşmediğini kontrol etmek için [test senaryoları](https://en.m.wikipedia.org/wiki/Test_case) yazmak ve yürütmek için kaynaklar sağlar.

### Akıllı sözleşmeleri test etmek neden önemlidir? {#importance-of-testing-smart-contracts}

Akıllı sözleşmeler genellikle yüksek değerli finansal varlıkları yönettiğinden, küçük programlama hataları [kullanıcılar için büyük kayıplara](https://rekt.news/leaderboard/) yol açabilir ve sıklıkla açar. Ancak titiz testler, bir akıllı sözleşmenin kodundaki kusurları ve sorunları erkenden keşfetmenize ve Ana Ağ'da başlatmadan önce bunları düzeltmenize yardımcı olabilir.

Bir hata keşfedilirse bir sözleşmeyi yükseltmek mümkün olsa da, yükseltmeler karmaşıktır ve yanlış ele alınırsa [hatalarla sonuçlanabilir](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Bir sözleşmeyi yükseltmek, değişmezlik ilkesini daha da geçersiz kılar ve kullanıcılara ek güven varsayımları yükler. Aksine, sözleşmenizi test etmek için kapsamlı bir plan, akıllı sözleşme güvenlik risklerini azaltır ve dağıtımdan sonra karmaşık mantık yükseltmeleri gerçekleştirme ihtiyacını azaltır.

## Akıllı sözleşmeleri test etme yöntemleri {#methods-for-testing-smart-contracts}

Ethereum akıllı sözleşmelerini test etme yöntemleri iki geniş kategoriye ayrılır: **otomatik test** ve **manuel test**. Otomatik test ve manuel test benzersiz avantajlar ve ödünleşimler sunar, ancak sözleşmelerinizi analiz etmek için sağlam bir plan oluşturmak üzere her ikisini de birleştirebilirsiniz.

### Otomatik test {#automated-testing}

Otomatik test, bir akıllı sözleşmenin kodunu yürütmedeki hatalar için otomatik olarak kontrol eden araçlar kullanır. Otomatik testin faydası, sözleşme işlevlerinin değerlendirilmesine rehberlik etmek için [betikler](https://www.techtarget.com/whatis/definition/script?amp=1) kullanmaktan gelir. Betikli testler, minimum insan müdahalesiyle tekrar tekrar çalışacak şekilde planlanabilir, bu da otomatik testi manuel test yaklaşımlarından daha verimli hale getirir.

Otomatik test, testler tekrarlayıcı ve zaman alıcı olduğunda; manuel olarak gerçekleştirilmesi zor olduğunda; insan hatasına açık olduğunda; veya kritik sözleşme işlevlerini değerlendirmeyi içerdiğinde özellikle yararlıdır. Ancak otomatik test araçlarının dezavantajları olabilir; belirli hataları gözden kaçırabilir ve birçok [yanlış pozitif](https://www.contrastsecurity.com/glossary/false-positive) üretebilirler. Bu nedenle, akıllı sözleşmeler için otomatik testi manuel testle eşleştirmek idealdir.

### Manuel test {#manual-testing}

Manuel test insan desteklidir ve bir akıllı sözleşmenin doğruluğunu analiz ederken test paketinizdeki her bir test senaryosunu birbiri ardına yürütmeyi içerir. Bu, bir sözleşme üzerinde aynı anda birden fazla izole test çalıştırabileceğiniz ve başarısız olan ve geçen tüm testleri gösteren bir rapor alabileceğiniz otomatik testten farklıdır.

Manuel test, farklı test senaryolarını kapsayan yazılı bir test planını izleyen tek bir kişi tarafından gerçekleştirilebilir. Ayrıca, manuel testin bir parçası olarak birden fazla kişinin veya grubun belirli bir süre boyunca bir akıllı sözleşmeyle etkileşime girmesini sağlayabilirsiniz. Test uzmanları, sözleşmenin gerçek davranışını beklenen davranışla karşılaştıracak ve herhangi bir farkı hata olarak işaretleyecektir.

Etkili manuel test önemli kaynaklar (beceri, zaman, para ve çaba) gerektirir ve testleri yürütürken insan hatası nedeniyle belirli hataları gözden kaçırmak mümkündür. Ancak manuel test de faydalı olabilir; örneğin, bir insan test uzmanı (örneğin, bir denetçi), otomatik bir test aracının gözden kaçıracağı uç durumları tespit etmek için sezgilerini kullanabilir.

## Akıllı sözleşmeler için otomatik test {#automated-testing-for-smart-contracts}

### Birim testi {#unit-testing-for-smart-contracts}

Birim testi, sözleşme işlevlerini ayrı ayrı değerlendirir ve her bileşenin doğru çalıştığını kontrol eder. İyi birim testleri basit olmalı, hızlı çalışmalı ve testler başarısız olursa neyin yanlış gittiğine dair net bir fikir vermelidir.

Birim testleri, işlevlerin beklenen değerleri döndürdüğünü ve işlev yürütüldükten sonra sözleşme depolamasının düzgün bir şekilde güncellendiğini kontrol etmek için yararlıdır. Dahası, bir sözleşmenin kod tabanında değişiklik yaptıktan sonra birim testleri çalıştırmak, yeni mantık eklemenin hatalara yol açmamasını sağlar. Aşağıda etkili birim testleri çalıştırmak için bazı yönergeler bulunmaktadır:

#### Akıllı sözleşmelerin birim testi için yönergeler {#unit-testing-guidelines}

##### 1. Sözleşmenizin iş mantığını ve iş akışını anlayın {#integration-testing-for-smart-contracts}

Birim testleri yazmadan önce, bir akıllı sözleşmenin hangi işlevleri sunduğunu ve kullanıcıların bu işlevlere nasıl erişip kullanacağını bilmek yardımcı olur. Bu, bir sözleşmedeki işlevlerin geçerli kullanıcı girdileri için doğru çıktıyı döndürüp döndürmediğini belirleyen [mutlu yol testlerini (happy path tests)](https://en.m.wikipedia.org/wiki/Happy_path) çalıştırmak için özellikle yararlıdır. Bu kavramı, [bir açık artırma sözleşmesinin](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) bu (kısaltılmış) örneğini kullanarak açıklayacağız

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

Bu, teklif verme süresi boyunca teklifleri almak için tasarlanmış basit bir açık artırma sözleşmesidir. Eğer `highestBid` artarsa, önceki en yüksek teklif sahibi parasını alır; teklif verme süresi bittiğinde, `beneficiary` parasını almak için sözleşmeyi çağırır.

Bunun gibi bir sözleşme için birim testleri, bir kullanıcının sözleşmeyle etkileşime girerken çağırabileceği farklı işlevleri kapsayacaktır. Bir örnek, açık artırma devam ederken bir kullanıcının teklif verip veremeyeceğini (yani, `bid()` çağrılarının başarılı olup olmadığını) kontrol eden bir birim testi veya bir kullanıcının mevcut `highestBid` değerinden daha yüksek bir teklif verip veremeyeceğini kontrol eden bir test olabilir.

Bir sözleşmenin operasyonel iş akışını anlamak, yürütmenin gereksinimleri karşılayıp karşılamadığını kontrol eden birim testleri yazmaya da yardımcı olur. Örneğin, açık artırma sözleşmesi, açık artırma sona erdiğinde (yani, `auctionEndTime`, `block.timestamp` değerinden düşük olduğunda) kullanıcıların teklif veremeyeceğini belirtir. Bu nedenle, bir geliştirici, açık artırma bittiğinde (yani, `auctionEndTime` > `block.timestamp` olduğunda) `bid()` işlevine yapılan çağrıların başarılı olup olmadığını veya başarısız olup olmadığını kontrol eden bir birim testi çalıştırabilir.

##### 2. Sözleşme yürütmesiyle ilgili tüm varsayımları değerlendirin {#property-based-testing-for-smart-contracts}

Bir sözleşmenin yürütülmesiyle ilgili tüm varsayımları belgelemek ve bu varsayımların geçerliliğini doğrulamak için birim testleri yazmak önemlidir. Beklenmeyen yürütmeye karşı koruma sağlamanın yanı sıra, doğrulamaları (assertions) test etmek sizi bir akıllı sözleşmenin güvenlik modelini bozabilecek işlemler hakkında düşünmeye zorlar. Yararlı bir ipucu, "mutlu kullanıcı testlerinin" ötesine geçmek ve bir işlevin yanlış girdiler için başarısız olup olmadığını kontrol eden negatif testler yazmaktır.

Birçok birim testi çerçevesi, doğrulamalar (bir sözleşmenin ne yapıp ne yapamayacağını belirten basit ifadeler) oluşturmanıza ve bu doğrulamaların yürütme altında geçerli olup olmadığını görmek için testler çalıştırmanıza olanak tanır. Daha önce açıklanan açık artırma sözleşmesi üzerinde çalışan bir geliştirici, negatif testleri çalıştırmadan önce davranışı hakkında aşağıdaki doğrulamaları yapabilir:

- Kullanıcılar açık artırma bittiğinde veya henüz başlamadığında teklif veremezler.

- Bir teklif kabul edilebilir eşiğin altındaysa açık artırma sözleşmesi geri alınır (revert).

- Teklifi kazanamayan kullanıcıların fonları iade edilir

**Not**: Varsayımları test etmenin başka bir yolu, bir sözleşmedeki [işlev değiştiricilerini (modifiers)](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers), özellikle `require`, `assert` ve `if…else` ifadelerini tetikleyen testler yazmaktır.

##### 3. Kod kapsamını ölçün {#static-analysis}

[Kod kapsamı](https://en.m.wikipedia.org/wiki/Code_coverage), testler sırasında yürütülen kodunuzdaki dalların, satırların ve ifadelerin sayısını izleyen bir test metriğidir. Test edilmemiş güvenlik açıkları riskini en aza indirmek için testlerin iyi bir kod kapsamına sahip olması gerekir. Yeterli kapsam olmadan, tüm testler geçtiği için sözleşmenizin güvenli olduğunu yanlış bir şekilde varsayabilirsiniz, oysa test edilmemiş kod yollarında güvenlik açıkları hala mevcut olabilir. Ancak yüksek kod kapsamı kaydetmek, bir akıllı sözleşmedeki tüm ifadelerin/işlevlerin doğruluk açısından yeterince test edildiğinin güvencesini verir.

##### 4. İyi geliştirilmiş test çerçeveleri kullanın {#dynamic-analysis}

Akıllı sözleşmeleriniz için birim testleri çalıştırmada kullanılan araçların kalitesi çok önemlidir. İdeal bir test çerçevesi, düzenli olarak bakımı yapılan; yararlı özellikler (örneğin, günlük kaydı ve raporlama yetenekleri) sağlayan; ve diğer geliştiriciler tarafından kapsamlı bir şekilde kullanılmış ve incelenmiş olandır.

Solidity akıllı sözleşmeleri için birim testi çerçeveleri farklı dillerde (çoğunlukla JavaScript, Python ve Rust) gelir. Farklı test çerçeveleriyle birim testleri çalıştırmaya nasıl başlayacağınız hakkında bilgi için aşağıdaki kılavuzlardan bazılarına bakın:

- **[Brownie ile birim testleri çalıştırma](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundry ile birim testleri çalıştırma](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffle ile birim testleri çalıştırma](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remix ile birim testleri çalıştırma](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ape ile birim testleri çalıştırma](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhat ile birim testleri çalıştırma](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wake ile birim testleri çalıştırma](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Entegrasyon testi {#running-property-based-tests}

Birim testi sözleşme işlevlerinde izole olarak hata ayıklarken, entegrasyon testleri bir akıllı sözleşmenin bileşenlerini bir bütün olarak değerlendirir. Entegrasyon testi, sözleşmeler arası çağrılardan veya aynı akıllı sözleşmedeki farklı işlevler arasındaki etkileşimlerden kaynaklanan sorunları tespit edebilir. Örneğin, entegrasyon testleri [kalıtım](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) ve bağımlılık enjeksiyonu gibi şeylerin düzgün çalışıp çalışmadığını kontrol etmeye yardımcı olabilir.

Sözleşmeniz modüler bir mimari benimsiyorsa veya yürütme sırasında diğer zincir içi sözleşmelerle arayüz oluşturuyorsa entegrasyon testi yararlıdır. Entegrasyon testlerini çalıştırmanın bir yolu, blokzinciri belirli bir yükseklikte [çatallamak](/glossary/#fork) ([Forge](https://book.getfoundry.sh/forge/fork-testing) veya [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) gibi bir araç kullanarak) ve sözleşmeniz ile dağıtılmış sözleşmeler arasındaki etkileşimleri simüle etmektir.

Çatallanmış blokzincir, Ana Ağ'a benzer şekilde davranacak ve ilişkili durumları ve bakiyeleri olan hesaplara sahip olacaktır. Ancak yalnızca korumalı bir yerel geliştirme ortamı olarak işlev görür, yani örneğin işlemler için gerçek ETH'ye ihtiyacınız olmayacak ve değişiklikleriniz gerçek Ethereum protokolünü etkilemeyecektir.

### Özellik tabanlı test {#manual-testing-for-smart-contracts}

Özellik tabanlı test, bir akıllı sözleşmenin tanımlanmış bazı özellikleri karşıladığını kontrol etme sürecidir. Özellikler, bir sözleşmenin davranışı hakkında farklı senaryolarda doğru kalması beklenen gerçekleri ileri sürer; bir akıllı sözleşme özelliğine örnek olarak "Sözleşmedeki aritmetik işlemler asla taşma (overflow) veya yetersizlik (underflow) yapmaz" verilebilir.

**Statik analiz** ve **dinamik analiz**, özellik tabanlı testleri yürütmek için yaygın iki tekniktir ve her ikisi de bir programın (bu durumda bir akıllı sözleşme) kodunun önceden tanımlanmış bazı özellikleri karşıladığını doğrulayabilir. Bazı özellik tabanlı test araçları, beklenen sözleşme özellikleri hakkında önceden tanımlanmış kurallarla birlikte gelir ve kodu bu kurallara karşı kontrol ederken, diğerleri bir akıllı sözleşme için özel özellikler oluşturmanıza olanak tanır.

#### Statik analiz {#testing-on-local-blockchain}

Bir statik analizör, bir akıllı sözleşmenin kaynak kodunu girdi olarak alır ve bir sözleşmenin bir özelliği karşılayıp karşılamadığını bildiren sonuçlar çıkarır. Dinamik analizin aksine, statik analiz, doğruluğunu analiz etmek için bir sözleşmeyi yürütmeyi içermez. Statik analiz bunun yerine, bir akıllı sözleşmenin yürütme sırasında izleyebileceği tüm olası yollar hakkında akıl yürütür (yani, çalışma zamanında sözleşmenin çalışması için ne anlama geleceğini belirlemek üzere kaynak kodunun yapısını inceleyerek).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) ve [statik test](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis), sözleşmeler üzerinde statik analiz çalıştırmak için yaygın yöntemlerdir. Her ikisi de derleyici tarafından çıkarılan [soyut sözdizimi ağaçları](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) ve [kontrol akış grafikleri](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) gibi bir sözleşmenin yürütülmesinin düşük seviyeli temsillerini analiz etmeyi gerektirir.

Çoğu durumda statik analiz, bir sözleşmenin kodunda güvenli olmayan yapıların kullanımı, sözdizimi hataları veya kodlama standartlarının ihlali gibi güvenlik sorunlarını tespit etmek için yararlıdır. Bununla birlikte, statik analizörlerin daha derin güvenlik açıklarını tespit etmede genellikle yetersiz olduğu bilinmektedir ve aşırı yanlış pozitifler üretebilirler.

#### Dinamik analiz {#testing-contracts-on-testnets}

Dinamik analiz, herhangi bir yürütme izinin (izlerinin) belirli özellikleri ihlal edip etmediğini görmek için bir akıllı sözleşmenin işlevlerine sembolik girdiler (örneğin, [sembolik yürütmede](https://en.m.wikipedia.org/wiki/Symbolic_execution)) veya somut girdiler (örneğin, [fuzzing'de](https://owasp.org/www-community/Fuzzing)) üretir. Özellik tabanlı testin bu biçimi, test senaryolarının birden fazla senaryoyu kapsaması ve test senaryolarının oluşturulmasını bir programın ele alması bakımından birim testlerinden farklıdır.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing), akıllı sözleşmelerdeki rastgele özellikleri doğrulamak için kullanılan bir dinamik analiz tekniği örneğidir. Bir fuzzer, tanımlanmış bir girdi değerinin rastgele veya hatalı biçimlendirilmiş varyasyonlarıyla hedef bir sözleşmedeki işlevleri çağırır. Akıllı sözleşme bir hata durumuna girerse (örneğin, bir doğrulamanın başarısız olduğu bir durum), sorun işaretlenir ve yürütmeyi savunmasız yola yönlendiren girdiler bir raporda üretilir.

Fuzzing, beklenmeyen girdilerin yanlış işlenmesi istenmeyen yürütmeye neden olabileceğinden ve tehlikeli etkiler üretebileceğinden, bir akıllı sözleşmenin girdi doğrulama mekanizmasını değerlendirmek için yararlıdır. Özellik tabanlı testin bu biçimi birçok nedenden dolayı ideal olabilir:

1. **Birçok senaryoyu kapsayacak test senaryoları yazmak zordur.** Bir özellik testi yalnızca bir davranışı ve davranışı test etmek için bir veri aralığını tanımlamanızı gerektirir; program, tanımlanan özelliğe dayalı olarak test senaryolarını otomatik olarak oluşturur.

2. **Test paketiniz program içindeki tüm olası yolları yeterince kapsamayabilir.** %100 kapsamla bile uç durumları gözden kaçırmak mümkündür.

3. **Birim testleri, bir sözleşmenin örnek veriler için doğru şekilde yürütüldüğünü kanıtlar, ancak sözleşmenin örnek dışındaki girdiler için doğru şekilde yürütülüp yürütülmediği bilinmemektedir.** Özellik testleri, doğrulama hatalarına neden olan yürütme izlerini bulmak için belirli bir girdi değerinin birden fazla varyasyonuyla hedef bir sözleşmeyi yürütür. Bu nedenle, bir özellik testi, bir sözleşmenin geniş bir girdi verisi sınıfı için doğru şekilde yürütüldüğüne dair daha fazla garanti sağlar.

### Akıllı sözleşmeler için özellik tabanlı test çalıştırma yönergeleri {#testing-vs-formal-verification}

Özellik tabanlı test çalıştırmak genellikle bir akıllı sözleşmede doğrulamak istediğiniz bir özelliği (örneğin, [tamsayı taşmalarının](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow) olmaması) veya özellikler koleksiyonunu tanımlamakla başlar. Özellik testleri yazarken, programın işlem girdileri için veri üretebileceği bir değer aralığı tanımlamanız da gerekebilir.

Düzgün bir şekilde yapılandırıldıktan sonra, özellik test aracı akıllı sözleşmenizin işlevlerini rastgele oluşturulmuş girdilerle yürütecektir. Herhangi bir doğrulama ihlali varsa, değerlendirilen özelliği ihlal eden somut girdi verilerini içeren bir rapor almalısınız. Farklı araçlarla özellik tabanlı test çalıştırmaya başlamak için aşağıdaki kılavuzlardan bazılarına bakın:

- **[Slither ile akıllı sözleşmelerin statik analizi](https://github.com/crytic/slither)**
- **[Wake ile akıllı sözleşmelerin statik analizi](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownie ile özellik tabanlı test](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundry ile sözleşmeleri fuzzing yapma](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Echidna ile sözleşmeleri fuzzing yapma](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wake ile sözleşmeleri fuzzing yapma](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Manticore ile akıllı sözleşmelerin sembolik yürütülmesi](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythril ile akıllı sözleşmelerin sembolik yürütülmesi](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Akıllı sözleşmeler için manuel test {#testing-vs-audits-bug-bounties}

Akıllı sözleşmelerin manuel testi genellikle otomatik testleri çalıştırdıktan sonra geliştirme döngüsünün ilerleyen aşamalarında gelir. Bu test biçimi, teknik gereksinimlerde belirtildiği gibi performans gösterip göstermediğini görmek için akıllı sözleşmeyi tam entegre bir ürün olarak değerlendirir.

### Sözleşmeleri yerel bir blokzincirde test etme {#testing-tools-and-libraries}

Yerel bir geliştirme ortamında gerçekleştirilen otomatik testler yararlı hata ayıklama bilgileri sağlayabilse de, akıllı sözleşmenizin bir üretim ortamında nasıl davrandığını bilmek isteyeceksiniz. Ancak, ana Ethereum zincirine dağıtmak gaz ücretlerine neden olur; akıllı sözleşmenizde hala hatalar varsa sizin veya kullanıcılarınızın gerçek para kaybedebileceğinden bahsetmiyoruz bile.

Sözleşmenizi yerel bir blokzincirde (aynı zamanda [geliştirme ağı](/developers/docs/development-networks/) olarak da bilinir) test etmek, Ana Ağ'da test etmeye önerilen bir alternatiftir. Yerel bir blokzincir, bilgisayarınızda yerel olarak çalışan ve Ethereum'un yürütme katmanının davranışını simüle eden Ethereum blokzincirinin bir kopyasıdır. Bu nedenle, önemli bir ek yük getirmeden bir sözleşmeyle etkileşime girmek için işlemleri programlayabilirsiniz.

Sözleşmeleri yerel bir blokzincirde çalıştırmak, manuel entegrasyon testinin bir biçimi olarak yararlı olabilir. [Akıllı sözleşmeler yüksek oranda birleştirilebilirdir](/developers/docs/smart-contracts/composability/), bu da mevcut protokollerle entegre olmanıza olanak tanır; ancak yine de bu tür karmaşık zincir içi etkileşimlerin doğru sonuçlar ürettiğinden emin olmanız gerekir.

[Geliştirme ağları hakkında daha fazlası.](/developers/docs/development-networks/)

### Sözleşmeleri test ağlarında test etme {#unit-testing-tools}

Bir test ağı, gerçek dünya değeri olmayan Ether (ETH) kullanması dışında tam olarak Ethereum Ana Ağı gibi çalışır. Sözleşmenizi bir [test ağına](/developers/docs/networks/#ethereum-testnets) dağıtmak, herkesin fonları riske atmadan (örneğin, dapp'in ön ucu aracılığıyla) onunla etkileşime girebileceği anlamına gelir.

Bu manuel test biçimi, uygulamanızın uçtan uca akışını bir kullanıcının bakış açısından değerlendirmek için yararlıdır. Burada, beta test uzmanları ayrıca deneme çalıştırmaları gerçekleştirebilir ve sözleşmenin iş mantığı ve genel işlevselliği ile ilgili herhangi bir sorunu bildirebilir.

Yerel bir blokzincirde test ettikten sonra bir test ağına dağıtmak idealdir çünkü test ağı Ethereum Sanal Makinesi'nin davranışına daha yakındır. Bu nedenle, birçok Ethereum yerel projesinin, bir akıllı sözleşmenin gerçek dünya koşulları altındaki çalışmasını değerlendirmek için dapp'leri test ağlarına dağıtması yaygındır.

[Ethereum test ağları hakkında daha fazlası.](/developers/docs/development-networks/#public-beacon-testchains)

## Test etme ve biçimsel doğrulama {#property-based-testing-tools}

Test etme, bir sözleşmenin bazı veri girdileri için beklenen sonuçları döndürdüğünü doğrulamaya yardımcı olsa da, testler sırasında kullanılmayan girdiler için aynı şeyi kesin olarak kanıtlayamaz. Bu nedenle, bir akıllı sözleşmeyi test etmek "işlevsel doğruluğu" garanti edemez (yani, bir programın _tüm_ girdi değerleri kümeleri için gerektiği gibi davrandığını gösteremez).

Biçimsel doğrulama, programın biçimsel bir modelinin biçimsel belirtimle eşleşip eşleşmediğini kontrol ederek yazılımın doğruluğunu değerlendirmeye yönelik bir yaklaşımdır. Biçimsel bir model, bir programın soyut matematiksel bir temsilidir, biçimsel bir belirtim ise bir programın özelliklerini (yani, programın yürütülmesiyle ilgili mantıksal doğrulamaları) tanımlar.

Özellikler matematiksel terimlerle yazıldığından, sistemin biçimsel (matematiksel) bir modelinin mantıksal çıkarım kurallarını kullanarak bir belirtimi karşıladığını doğrulamak mümkün hale gelir. Bu nedenle, biçimsel doğrulama araçlarının bir sistemin doğruluğunun 'matematiksel kanıtını' ürettiği söylenir.

Test etmenin aksine, biçimsel doğrulama, bir akıllı sözleşmenin yürütülmesinin örnek verilerle yürütülmesine gerek kalmadan _tüm_ yürütmeler için biçimsel bir belirtimi karşıladığını (yani hiçbir hatası olmadığını) doğrulamak için kullanılabilir. Bu sadece düzinelerce birim testini çalıştırmak için harcanan zamanı azaltmakla kalmaz, aynı zamanda gizli güvenlik açıklarını yakalamada da daha etkilidir. Bununla birlikte, biçimsel doğrulama teknikleri, uygulama zorluklarına ve yararlılıklarına bağlı olarak bir yelpazede yer alır.

[Akıllı sözleşmeler için biçimsel doğrulama hakkında daha fazlası.](/developers/docs/smart-contracts/formal-verification)

## Test etme, denetimler ve hata ödülleri {#static-analysis-tools}

Belirtildiği gibi, titiz testler bir sözleşmede hata olmadığını nadiren garanti edebilir; biçimsel doğrulama yaklaşımları daha güçlü doğruluk güvenceleri sağlayabilir ancak şu anda kullanımları zordur ve önemli maliyetlere neden olurlar.

Yine de, bağımsız bir kod incelemesi alarak sözleşme güvenlik açıklarını yakalama olasılığını daha da artırabilirsiniz. [Akıllı sözleşme denetimleri](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) ve [hata ödülleri](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7), başkalarının sözleşmelerinizi analiz etmesini sağlamanın iki yoludur.

Denetimler, akıllı sözleşmelerdeki güvenlik açıkları ve zayıf geliştirme uygulamaları vakalarını bulma konusunda deneyimli denetçiler tarafından gerçekleştirilir. Bir denetim genellikle test etmeyi (ve muhtemelen biçimsel doğrulamayı) ve tüm kod tabanının manuel olarak incelenmesini içerecektir.

Buna karşılık, bir hata ödül programı genellikle bir akıllı sözleşmede bir güvenlik açığı keşfeden ve bunu geliştiricilere açıklayan bir kişiye (genellikle [beyaz şapkalı bilgisayar korsanları](<https://en.wikipedia.org/wiki/White_hat_(computer_security) olarak tanımlanır) finansal bir ödül sunmayı içerir. Hata ödülleri, başkalarından akıllı sözleşmelerdeki kusurları bulmaya yardım etmelerini istemeyi içerdiğinden denetimlere benzer.

En büyük fark, hata ödül programlarının daha geniş geliştirici/bilgisayar korsanı topluluğuna açık olması ve benzersiz becerilere ve deneyime sahip geniş bir etik bilgisayar korsanları ve bağımsız güvenlik profesyonelleri sınıfını çekmesidir. Bu, temel olarak sınırlı veya dar uzmanlığa sahip olabilecek ekiplere dayanan akıllı sözleşme denetimlerine göre bir avantaj olabilir.

## Test araçları ve kütüphaneleri {#dynamic-analysis-tools}

### Birim testi araçları {#related-tutorials}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity ile yazılmış akıllı sözleşmeler için kod kapsamı aracı._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Gelişmiş akıllı sözleşme geliştirme ve testi için çerçeve (Ethers.js tabanlı)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidity akıllı sözleşmelerini test etme aracı. Bir sözleşme için test senaryoları yazmak ve çalıştırmak için kullanılan Remix IDE "Solidity Unit Testing" eklentisinin altında çalışır._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Ethereum akıllı sözleşme testi için doğrulama kütüphanesi. Sözleşmelerinizin beklendiği gibi davrandığından emin olun!_

- **[Brownie birim testi çerçevesi](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie, minimum kodla küçük testler yazmanıza olanak tanıyan, büyük projeler için iyi ölçeklenen ve son derece genişletilebilir, zengin özelliklere sahip bir test çerçevesi olan Pytest'i kullanır._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry, basit birim testleri, gaz optimizasyonu kontrolleri ve sözleşme fuzzing'i yürütebilen hızlı ve esnek bir Ethereum test çerçevesi olan Forge'u sunar._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Ethers.js, Mocha ve Chai tabanlı akıllı sözleşmeleri test etme çerçevesesi._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Ethereum Sanal Makinesi'ni hedefleyen akıllı sözleşmeler için Python tabanlı geliştirme ve test çerçevesi._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _En iyi kullanıcı deneyimi ve performans için pytest ve Anvil'i kullanan, güçlü hata ayıklama yetenekleri ve zincirler arası test desteği ile birim testi ve fuzzing için Python tabanlı çerçeve._

### Özellik tabanlı test araçları {#further-reading}

#### Statik analiz araçları {#tutorials}

- **[Slither](https://github.com/crytic/slither)** - _Güvenlik açıklarını bulmak, kod kavramayı geliştirmek ve akıllı sözleşmeler için özel analizler yazmak için Python tabanlı Solidity statik analiz çerçevesi._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidity akıllı sözleşme programlama dili için stil ve güvenlik en iyi uygulamalarını zorunlu kılmak için Linter._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Web3 akıllı sözleşme güvenliği ve geliştirmesi için özel olarak tasarlanmış Rust tabanlı statik analizör._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Güvenlik açığı ve kod kalitesi dedektörleri, koddan yararlı bilgiler çıkarmak için yazıcılar ve özel alt modüller yazma desteği içeren Python tabanlı statik analiz çerçevesi._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Solidity için basit ve güçlü bir linter._

#### Dinamik analiz araçları

- **[Echidna](https://github.com/crytic/echidna/)** - _Özellik tabanlı test yoluyla akıllı sözleşmelerdeki güvenlik açıklarını tespit etmek için hızlı sözleşme fuzzer'ı._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Akıllı sözleşme kodundaki özellik ihlallerini tespit etmek için yararlı otomatik fuzzing aracı._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _EVM baytkodunu analiz etmek için dinamik sembolik yürütme çerçevesi._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Leke analizi (taint analysis), konkolik analiz ve kontrol akışı denetimi kullanarak sözleşme güvenlik açıklarını tespit etmek için EVM baytkod değerlendirme aracı._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble, akıllı sözleşmelere, sözleşmeleri Diligence Fuzzing veya MythX gibi araçlarla otomatik olarak test etmenize olanak tanıyan özelliklerle açıklama eklemenizi sağlayan bir belirtim dili ve çalışma zamanı doğrulama aracıdır._

## İlgili eğitimler

- [Farklı test ürünlerine genel bakış ve karşılaştırma](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Akıllı sözleşme hatalarını bulmak için Manticore nasıl kullanılır](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Test için Solidity sözleşmeleri nasıl taklit edilir (mock)](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundry kullanarak Solidity'de birim testleri nasıl çalıştırılır](https://www.rareskills.io/post/foundry-testing-solidity)

## Daha fazla bilgi

- [Ethereum akıllı sözleşmelerini test etmeye yönelik derinlemesine bir kılavuz](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Ethereum akıllı sözleşmeleri nasıl test edilir](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Geliştiriciler için MolochDAO'nun birim testi kılavuzu](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Akıllı sözleşmeler bir rock yıldızı gibi nasıl test edilir](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Eğitimler: Ethereum'da akıllı sözleşme testi

- [Yerel, çok istemcili bir test ağında bir dApp nasıl geliştirilir ve test edilir](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Bir akıllı sözleşmeyi yerel bir test ağına dağıtma ve testler gerçekleştirme kılavuzu._
- [Test için Solidity akıllı sözleşmeleri nasıl taklit edilir (mock)](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Sahte (mock) verilerin nasıl kullanılacağı ve birim testinin nasıl uygulanacağı hakkında orta düzey eğitim._
- [Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Fuzzing ve akıllı sözleşme testine gelişmiş yaklaşımlar._