---
title: "Akıllı sözleşme güvenliği"
description: "Güvenli Ethereum akıllı sözleşmeleri oluşturmaya yönelik yönergelere genel bir bakış"
lang: tr
---

Akıllı sözleşmeler son derece esnektir ve blokzincir üzerinde dağıtılan koda dayalı değişmez mantık çalıştırırken büyük miktarda değer ve veriyi kontrol edebilirler. Bu, eski sistemlere göre birçok avantaj sağlayan güven gerektirmeyen ve merkeziyetsiz uygulamalardan oluşan canlı bir ekosistem yaratmıştır. Bunlar aynı zamanda akıllı sözleşmelerdeki güvenlik açıklarından yararlanarak kâr elde etmek isteyen saldırganlar için de fırsatları temsil eder.

[Ethereum](/) gibi halka açık blokzincirler, akıllı sözleşmelerin güvenliğini sağlama konusunu daha da karmaşık hâle getirir. Dağıtılan sözleşme kodu güvenlik açıklarını yamamak için _genellikle_ değiştirilemezken, akıllı sözleşmelerden çalınan varlıkların takibi son derece zordur ve değişmezlik nedeniyle çoğunlukla geri alınamaz.

Rakamlar değişiklik gösterse de, akıllı sözleşmelerdeki güvenlik kusurları nedeniyle çalınan veya kaybedilen toplam değer miktarının rahatlıkla 1 milyar doların üzerinde olduğu tahmin edilmektedir. Bu, [DAO hack'i](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (bugünkü fiyatlarla 1 milyar doların üzerinde değere sahip 3,6 milyon ETH çalındı), [Parity çoklu imza cüzdanı hack'i](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (bilgisayar korsanlarına 30 milyon dolar kaybedildi) ve [Parity dondurulmuş cüzdan sorunu](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (300 milyon doların üzerinde ETH sonsuza dek kilitlendi) gibi yüksek profilli olayları içerir.

Yukarıda bahsedilen sorunlar, geliştiricilerin güvenli, sağlam ve dirençli akıllı sözleşmeler oluşturmak için çaba sarf etmesini zorunlu kılmaktadır. Akıllı sözleşme güvenliği ciddi bir iştir ve her geliştiricinin öğrenmesi kendi yararına olacaktır. Bu kılavuz, Ethereum geliştiricileri için güvenlik hususlarını ele alacak ve akıllı sözleşme güvenliğini artırmaya yönelik kaynakları inceleyecektir.

## Ön Koşullar {#prerequisites}

Güvenlik konusunu ele almadan önce [akıllı sözleşme geliştirme temellerine](/developers/docs/smart-contracts/) aşina olduğunuzdan emin olun.

## Güvenli Ethereum akıllı sözleşmeleri oluşturma yönergeleri {#smart-contract-security-guidelines}

### 1. Uygun erişim kontrolleri tasarlayın {#design-proper-access-controls}

Akıllı sözleşmelerde, `public` veya `external` olarak işaretlenmiş fonksiyonlar, harici olarak sahip olunan hesaplar (EOA'lar) veya sözleşme hesapları tarafından çağrılabilir. Başkalarının sözleşmenizle etkileşime girmesini istiyorsanız, fonksiyonlar için public (genel) görünürlük belirtmek gereklidir. Ancak `private` olarak işaretlenmiş fonksiyonlar, harici hesaplar tarafından değil, yalnızca akıllı sözleşme içindeki fonksiyonlar tarafından çağrılabilir. Ağdaki her katılımcıya sözleşme fonksiyonlarına erişim izni vermek, özellikle herkesin hassas işlemleri (örneğin, yeni token basımı) gerçekleştirebileceği anlamına geliyorsa sorunlara neden olabilir.

Akıllı sözleşme fonksiyonlarının yetkisiz kullanımını önlemek için güvenli erişim kontrolleri uygulamak gereklidir. Erişim kontrol mekanizmaları, bir akıllı sözleşmedeki belirli fonksiyonları kullanma yeteneğini, sözleşmeyi yönetmekten sorumlu hesaplar gibi onaylanmış varlıklarla sınırlar. **Sahiplik (Ownable) modeli** ve **role dayalı kontrol**, akıllı sözleşmelerde erişim kontrolünü uygulamak için yararlı olan iki modeldir:

#### Sahiplik (Ownable) modeli {#ownable-pattern}

Sahiplik modelinde, sözleşme oluşturma süreci sırasında bir adres sözleşmenin "sahibi" olarak ayarlanır. Korumalı fonksiyonlara, sözleşmenin fonksiyonu yürütmeden önce çağıran adresin kimliğini doğrulamasını sağlayan bir `OnlyOwner` değiştiricisi (modifier) atanır. Sözleşme sahibi dışındaki diğer adreslerden korumalı fonksiyonlara yapılan çağrılar her zaman geri alınır (revert) ve istenmeyen erişimi engeller.

#### Role dayalı erişim kontrolü {#role-based-access-control}

Bir akıllı sözleşmede tek bir adresi `Owner` olarak kaydetmek, merkezileşme riski getirir ve tek bir hata noktasını temsil eder. Sahibinin hesap anahtarları ele geçirilirse, saldırganlar sahip olunan sözleşmeye saldırabilir. Bu nedenle, birden fazla yönetim hesabına sahip role dayalı bir erişim kontrol modeli kullanmak daha iyi bir seçenek olabilir.

Role dayalı erişim kontrolünde, hassas fonksiyonlara erişim bir dizi güvenilir katılımcı arasında dağıtılır. Örneğin, bir hesap token basımından sorumlu olabilirken, başka bir hesap yükseltmeleri gerçekleştirir veya sözleşmeyi duraklatır. Erişim kontrolünü bu şekilde merkeziyetsizleştirmek, tek hata noktalarını ortadan kaldırır ve kullanıcılar için güven varsayımlarını azaltır.

##### Çoklu imza cüzdanlarını kullanma
Güvenli erişim kontrolü uygulamak için başka bir yaklaşım, bir sözleşmeyi yönetmek için [çoklu imza hesabı](/developers/docs/smart-contracts/#multisig) kullanmaktır. Normal bir EOA'nın aksine, çoklu imza hesapları birden fazla varlığa aittir ve işlemleri yürütmek için minimum sayıda hesaptan (örneğin 5'in 3'ü) imza gerektirir.

Erişim kontrolü için çoklu imza kullanmak, hedef sözleşmedeki eylemler birden fazla tarafın onayını gerektirdiğinden ekstra bir güvenlik katmanı sunar. Bu, özellikle Sahiplik (Ownable) modelini kullanmak gerekliyse yararlıdır, çünkü bir saldırganın veya kötü niyetli bir içeriden kişinin hassas sözleşme fonksiyonlarını kötü amaçlarla manipüle etmesini zorlaştırır.

### 2. Sözleşme işlemlerini korumak için require(), assert() ve revert() ifadelerini kullanın {#use-require-assert-revert}

Belirtildiği gibi, akıllı sözleşmeniz blokzincir üzerinde dağıtıldıktan sonra herkes public fonksiyonları çağırabilir. Harici hesapların bir sözleşmeyle nasıl etkileşime gireceğini önceden bilemeyeceğiniz için, dağıtımdan önce sorunlu işlemlere karşı dahili önlemler uygulamak idealdir. Yürütme belirli gereksinimleri karşılamadığında istisnaları tetiklemek ve durum değişikliklerini geri almak için `require()`, `assert()` ve `revert()` ifadelerini kullanarak akıllı sözleşmelerde doğru davranışı zorunlu kılabilirsiniz.

**`require()`**: `require` ifadeleri fonksiyonların başında tanımlanır ve çağrılan fonksiyon yürütülmeden önce önceden tanımlanmış koşulların karşılandığından emin olur. Bir `require` ifadesi, bir fonksiyonda ilerlemeden önce kullanıcı girdilerini doğrulamak, durum değişkenlerini kontrol etmek veya çağıran hesabın kimliğini doğrulamak için kullanılabilir.

**`assert()`**: `assert()`, dahili hataları tespit etmek ve kodunuzdaki "değişmezlerin" (invariants) ihlallerini kontrol etmek için kullanılır. Bir değişmez, bir sözleşmenin durumu hakkında tüm fonksiyon yürütmeleri için doğru kalması gereken mantıksal bir iddiadır. Örnek bir değişmez, bir token sözleşmesinin maksimum toplam arzı veya bakiyesidir. `assert()` kullanmak, sözleşmenizin asla savunmasız bir duruma ulaşmamasını sağlar ve ulaşırsa, durum değişkenlerindeki tüm değişiklikler geri alınır.

**`revert()`**: `revert()`, gerekli koşul karşılanmazsa bir istisna tetikleyen bir if-else ifadesinde kullanılabilir. Aşağıdaki örnek sözleşme, fonksiyonların yürütülmesini korumak için `revert()` kullanır:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Satın alma işlemini gerçekleştirin.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Akıllı sözleşmeleri test edin ve kod doğruluğunu onaylayın {#test-smart-contracts-and-verify-code-correctness}

[Ethereum Sanal Makinesi](/developers/docs/evm/) içinde çalışan kodun değişmezliği, akıllı sözleşmelerin geliştirme aşamasında daha yüksek düzeyde bir kalite değerlendirmesi gerektirdiği anlamına gelir. Sözleşmenizi kapsamlı bir şekilde test etmek ve beklenmedik sonuçlar için gözlemlemek, güvenliği büyük ölçüde artıracak ve uzun vadede kullanıcılarınızı koruyacaktır.

Olağan yöntem, sözleşmenin kullanıcılardan alması beklenen sahte (mock) verileri kullanarak küçük birim testleri yazmaktır. [Birim testi](/developers/docs/smart-contracts/testing/#unit-testing), belirli fonksiyonların işlevselliğini test etmek ve bir akıllı sözleşmenin beklendiği gibi çalıştığından emin olmak için iyidir.

Ne yazık ki, birim testi tek başına kullanıldığında akıllı sözleşme güvenliğini artırmada asgari düzeyde etkilidir. Bir birim testi, bir fonksiyonun sahte veriler için düzgün bir şekilde yürütüldüğünü kanıtlayabilir, ancak birim testleri yalnızca yazılan testler kadar etkilidir. Bu, akıllı sözleşmenizin güvenliğini bozabilecek gözden kaçan uç durumları ve güvenlik açıklarını tespit etmeyi zorlaştırır.

Daha iyi bir yaklaşım, birim testini [statik ve dinamik analiz](/developers/docs/smart-contracts/testing/#static-dynamic-analysis) kullanılarak gerçekleştirilen özellik tabanlı testlerle birleştirmektir. Statik analiz, ulaşılabilir program durumlarını ve yürütme yollarını analiz etmek için [kontrol akış grafikleri](https://en.wikipedia.org/wiki/Control-flow_graph) ve [soyut sözdizimi ağaçları](https://deepsource.io/glossary/ast/) gibi düşük seviyeli temsillere dayanır. Bu arada, [akıllı sözleşme fuzzing'i](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry) gibi dinamik analiz teknikleri, güvenlik özelliklerini ihlal eden işlemleri tespit etmek için sözleşme kodunu rastgele girdi değerleriyle yürütür.

[Biçimsel doğrulama](/developers/docs/smart-contracts/formal-verification), akıllı sözleşmelerdeki güvenlik özelliklerini doğrulamak için başka bir tekniktir. Normal testlerin aksine, biçimsel doğrulama bir akıllı sözleşmede hataların olmadığını kesin olarak kanıtlayabilir. Bu, istenen güvenlik özelliklerini yakalayan biçimsel bir şartname oluşturarak ve sözleşmelerin biçimsel bir modelinin bu şartnameye bağlı kaldığını kanıtlayarak elde edilir.

### 4. Kodunuzun bağımsız bir incelemesini isteyin {#get-independent-code-reviews}

Sözleşmenizi test ettikten sonra, başkalarından kaynak kodunu herhangi bir güvenlik sorunu açısından kontrol etmelerini istemek iyidir. Test etmek, bir akıllı sözleşmedeki her kusuru ortaya çıkarmaz, ancak bağımsız bir inceleme almak güvenlik açıklarını tespit etme olasılığını artırır.

#### Denetimler {#audits}

Bir akıllı sözleşme denetimi (audit) talep etmek, bağımsız bir kod incelemesi yürütmenin bir yoludur. Denetçiler, akıllı sözleşmelerin güvenli olmasını ve kalite kusurlarından ve tasarım hatalarından arınmış olmasını sağlamada önemli bir rol oynar.

Bununla birlikte, denetimleri sihirli bir değnek olarak görmekten kaçınmalısınız. Akıllı sözleşme denetimleri her hatayı yakalamaz ve çoğunlukla, ilk geliştirme ve test sırasında geliştiriciler tarafından gözden kaçırılan sorunları tespit etmeye yardımcı olabilecek ek bir inceleme turu sağlamak için tasarlanmıştır. Bir akıllı sözleşme denetiminin faydasını en üst düzeye çıkarmak için, kodu düzgün bir şekilde belgelemek ve satır içi yorumlar eklemek gibi denetçilerle çalışmaya yönelik en iyi uygulamaları da izlemelisiniz.

- [Akıllı sözleşme denetimi ipuçları ve püf noktaları](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Denetiminizden en iyi şekilde yararlanın](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Hata ödülleri {#bug-bounties}

Bir hata ödül (bug bounty) programı oluşturmak, harici kod incelemelerini uygulamak için başka bir yaklaşımdır. Hata ödülü, bir uygulamadaki güvenlik açıklarını keşfeden kişilere (genellikle beyaz şapkalı bilgisayar korsanları) verilen finansal bir ödüldür.

Düzgün kullanıldığında, hata ödülleri bilgisayar korsanı topluluğu üyelerine kodunuzu kritik kusurlar açısından incelemeleri için teşvik sağlar. Gerçek hayattan bir örnek, bir saldırganın Ethereum üzerinde çalışan bir [katman 2 (L2)](/layer-2/) protokolü olan [Optimism](https://www.optimism.io/) üzerinde sınırsız miktarda Ether yaratmasına izin verecek olan "sonsuz para hatası"dır. Neyse ki, beyaz şapkalı bir bilgisayar korsanı [kusuru keşfetti](https://www.saurik.com/optimism.html) ve ekibi bilgilendirerek [bu süreçte büyük bir ödeme kazandı](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Yararlı bir strateji, bir hata ödül programının ödemesini tehlikedeki fon miktarıyla orantılı olarak belirlemektir. "[Ölçeklenen hata ödülü](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)" olarak tanımlanan bu yaklaşım, bireylerin güvenlik açıklarını istismar etmek yerine sorumlu bir şekilde ifşa etmeleri için finansal teşvikler sağlar.

### 5. Akıllı sözleşme geliştirme sırasında en iyi uygulamaları izleyin {#follow-smart-contract-development-best-practices}

Denetimlerin ve hata ödüllerinin varlığı, yüksek kaliteli kod yazma sorumluluğunuzu ortadan kaldırmaz. İyi bir akıllı sözleşme güvenliği, uygun tasarım ve geliştirme süreçlerini izlemekle başlar:

- Tüm kodu git gibi bir sürüm kontrol sisteminde saklayın

- Tüm kod değişikliklerini çekme istekleri (pull request) aracılığıyla yapın

- Çekme isteklerinin en az bir bağımsız inceleyicisi olduğundan emin olun; bir projede tek başınıza çalışıyorsanız, başka geliştiriciler bulmayı ve kod incelemelerini takas etmeyi düşünün

- Akıllı sözleşmeleri test etmek, derlemek ve dağıtmak için bir [geliştirme ortamı](/developers/docs/frameworks/) kullanın

- Kodunuzu [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril ve Slither gibi temel kod analiz araçlarından geçirin. İdeal olarak, bunu her çekme isteği birleştirilmeden önce yapmalı ve çıktıdaki farklılıkları karşılaştırmalısınız

- Kodunuzun hatasız derlendiğinden ve Solidity derleyicisinin hiçbir uyarı vermediğinden emin olun

- Kodunuzu düzgün bir şekilde belgeleyin ([NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html) kullanarak) ve sözleşme mimarisi hakkındaki ayrıntıları anlaşılması kolay bir dille açıklayın. Bu, başkalarının kodunuzu denetlemesini ve incelemesini kolaylaştıracaktır.

### 6. Sağlam felaket kurtarma planları uygulayın {#implement-disaster-recovery-plans}

Güvenli erişim kontrolleri tasarlamak, fonksiyon değiştiricileri uygulamak ve diğer öneriler akıllı sözleşme güvenliğini artırabilir, ancak kötü niyetli istismar olasılığını ortadan kaldıramazlar. Güvenli akıllı sözleşmeler oluşturmak, "başarısızlığa hazırlanmayı" ve saldırılara etkili bir şekilde yanıt vermek için bir geri dönüş planına sahip olmayı gerektirir. Uygun bir felaket kurtarma planı, aşağıdaki bileşenlerin bazılarını veya tümünü içerecektir:

#### Sözleşme yükseltmeleri {#contract-upgrades}

Ethereum akıllı sözleşmeleri varsayılan olarak değişmez olsa da, yükseltme modellerini kullanarak bir dereceye kadar değişebilirlik elde etmek mümkündür. Kritik bir kusurun eski sözleşmenizi kullanılamaz hale getirdiği ve yeni mantık dağıtmanın en uygun seçenek olduğu durumlarda sözleşmeleri yükseltmek gereklidir.

Sözleşme yükseltme mekanizmaları farklı çalışır, ancak "vekil (proxy) modeli" akıllı sözleşmeleri yükseltmek için daha popüler yaklaşımlardan biridir. [Vekil modelleri](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern), bir uygulamanın durumunu ve mantığını _iki_ sözleşme arasında böler. İlk sözleşme ('vekil kontrat' olarak adlandırılır) durum değişkenlerini (örneğin, kullanıcı bakiyeleri) saklarken, ikinci sözleşme ('mantık sözleşmesi' olarak adlandırılır) sözleşme fonksiyonlarını yürütmek için kodu tutar.

Hesaplar, [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) düşük seviyeli çağrısını kullanarak tüm fonksiyon çağrılarını mantık sözleşmesine gönderen vekil kontrat ile etkileşime girer. Normal bir mesaj çağrısının aksine, `delegatecall()`, mantık sözleşmesinin adresinde çalışan kodun çağıran sözleşmenin bağlamında yürütülmesini sağlar. Bu, mantık sözleşmesinin her zaman (kendi depolaması yerine) vekilin depolamasına yazacağı ve `msg.sender` ile `msg.value`'nin orijinal değerlerinin korunacağı anlamına gelir.

Çağrıları mantık sözleşmesine devretmek, adresini vekil kontratın depolamasında saklamayı gerektirir. Bu nedenle, sözleşmenin mantığını yükseltmek yalnızca başka bir mantık sözleşmesi dağıtmak ve yeni adresi vekil kontratta saklamak meselesidir. Vekil kontrata yapılan sonraki çağrılar otomatik olarak yeni mantık sözleşmesine yönlendirildiğinden, kodu fiilen değiştirmeden sözleşmeyi "yükseltmiş" olursunuz.

[Sözleşmeleri yükseltme hakkında daha fazla bilgi](/developers/docs/smart-contracts/upgrading/).

#### Acil durdurmalar {#emergency-stops}

Belirtildiği gibi, kapsamlı denetim ve testler bir akıllı sözleşmedeki tüm hataları keşfedemez. Dağıtımdan sonra kodunuzda bir güvenlik açığı ortaya çıkarsa, sözleşme adresinde çalışan kodu değiştiremeyeceğiniz için bunu yamalamak imkansızdır. Ayrıca, yükseltme mekanizmalarının (örneğin, vekil modelleri) uygulanması zaman alabilir (genellikle farklı taraflardan onay gerektirirler), bu da saldırganlara daha fazla hasar vermeleri için yalnızca daha fazla zaman tanır.

Nükleer seçenek, bir sözleşmedeki savunmasız fonksiyonlara yapılan çağrıları engelleyen bir "acil durdurma" fonksiyonu uygulamaktır. Acil durdurmalar tipik olarak aşağıdaki bileşenleri içerir:

1. Akıllı sözleşmenin durdurulmuş bir durumda olup olmadığını gösteren global bir Boolean değişkeni. Bu değişken, sözleşmeyi kurarken `false` olarak ayarlanır, ancak sözleşme durdurulduğunda `true` değerine döner.

2. Yürütmelerinde Boolean değişkenine başvuran fonksiyonlar. Bu tür fonksiyonlara akıllı sözleşme durdurulmadığında erişilebilir ve acil durdurma özelliği tetiklendiğinde erişilemez hale gelir.

3. Boolean değişkenini `true` olarak ayarlayan acil durdurma fonksiyonuna erişimi olan bir varlık. Kötü niyetli eylemleri önlemek için, bu fonksiyona yapılan çağrılar güvenilir bir adresle (örneğin, sözleşme sahibi) sınırlandırılabilir.

Sözleşme acil durdurmayı etkinleştirdiğinde, belirli fonksiyonlar çağrılamaz hale gelecektir. Bu, seçili fonksiyonları global değişkene başvuran bir değiştirici (modifier) içine sararak elde edilir. Aşağıda, sözleşmelerde bu modelin bir uygulamasını açıklayan [bir örnek](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) verilmiştir:

```solidity
// Bu kod profesyonel olarak denetlenmemiştir ve güvenlik veya doğruluk hakkında hiçbir vaatte bulunmaz. Riski size ait olmak üzere kullanın.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Burada msg.sender yetkilendirmesini kontrol edin
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Yatırma mantığı burada gerçekleşiyor
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Acil durum çekme işlemi burada gerçekleşiyor
    }
}
```

Bu örnek, acil durdurmaların temel özelliklerini göstermektedir:

- `isStopped`, başlangıçta `false` ve sözleşme acil durum moduna girdiğinde `true` olarak değerlendirilen bir Boolean'dır.

- `onlyWhenStopped` ve `stoppedInEmergency` fonksiyon değiştiricileri `isStopped` değişkenini kontrol eder. `stoppedInEmergency`, sözleşme savunmasız olduğunda erişilememesi gereken fonksiyonları (örneğin, `deposit()`) kontrol etmek için kullanılır. Bu fonksiyonlara yapılan çağrılar basitçe geri alınacaktır (revert).

`onlyWhenStopped`, acil bir durumda çağrılabilmesi gereken fonksiyonlar (örneğin, `emergencyWithdraw()`) için kullanılır. Bu tür fonksiyonlar durumun çözülmesine yardımcı olabilir, bu nedenle "kısıtlanmış fonksiyonlar" listesinden çıkarılırlar.

Bir acil durdurma işlevi kullanmak, akıllı sözleşmenizdeki ciddi güvenlik açıklarıyla başa çıkmak için etkili bir geçici çözüm sağlar. Ancak, kullanıcıların geliştiricilere bunu kendi çıkarları için etkinleştirmeyeceklerine güvenme ihtiyacını artırır. Bu amaçla, acil durdurmanın kontrolünü zincir içi bir oylama mekanizmasına, zaman kilidine (timelock) veya çoklu imza cüzdanından onaya tabi tutarak merkeziyetsizleştirmek olası çözümlerdir.

#### Olay izleme {#event-monitoring}

[Olaylar](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events), akıllı sözleşme fonksiyonlarına yapılan çağrıları izlemenize ve durum değişkenlerindeki değişiklikleri takip etmenize olanak tanır. Akıllı sözleşmenizi, herhangi bir taraf güvenlik açısından kritik bir eylemde bulunduğunda (örneğin, fon çekimi) bir olay yayacak şekilde programlamak idealdir.

Olayları günlüğe kaydetmek ve bunları zincir dışı izlemek, sözleşme işlemleri hakkında içgörüler sağlar ve kötü niyetli eylemlerin daha hızlı keşfedilmesine yardımcı olur. Bu, ekibinizin bilgisayar korsanlığına daha hızlı yanıt verebileceği ve fonksiyonları duraklatmak veya bir yükseltme gerçekleştirmek gibi kullanıcılar üzerindeki etkiyi azaltmak için harekete geçebileceği anlamına gelir.

Ayrıca, birisi sözleşmelerinizle her etkileşime girdiğinde uyarıları otomatik olarak ileten hazır bir izleme aracı da tercih edebilirsiniz. Bu araçlar, işlem hacmi, fonksiyon çağrılarının sıklığı veya ilgili belirli fonksiyonlar gibi farklı tetikleyicilere dayalı özel uyarılar oluşturmanıza olanak tanır. Örneğin, tek bir işlemde çekilen miktar belirli bir eşiği aştığında gelen bir uyarı programlayabilirsiniz.

### 7. Güvenli yönetişim sistemleri tasarlayın {#design-secure-governance-systems}

Temel akıllı sözleşmelerin kontrolünü topluluk üyelerine devrederek uygulamanızı merkeziyetsizleştirmek isteyebilirsiniz. Bu durumda, akıllı sözleşme sistemi bir yönetişim modülü içerecektir; bu, topluluk üyelerinin zincir içi bir yönetişim sistemi aracılığıyla idari eylemleri onaylamasına olanak tanıyan bir mekanizmadır. Örneğin, bir vekil kontratı yeni bir uygulamaya yükseltme teklifi, token sahipleri tarafından oylanabilir.

Merkeziyetsiz yönetişim, özellikle geliştiricilerin ve son kullanıcıların çıkarlarını uyumlu hale getirdiği için faydalı olabilir. Bununla birlikte, akıllı sözleşme yönetişim mekanizmaları yanlış uygulanırsa yeni riskler getirebilir. Makul bir senaryo, bir saldırganın bir [Flaş kredi](/defi/#flash-loans) alarak muazzam bir oy gücü (sahip olunan token sayısıyla ölçülür) elde etmesi ve kötü niyetli bir teklifi zorla kabul ettirmesidir.

Zincir içi yönetişimle ilgili sorunları önlemenin bir yolu [bir zaman kilidi (timelock) kullanmaktır](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Bir zaman kilidi, belirli bir süre geçene kadar bir akıllı sözleşmenin belirli eylemleri yürütmesini engeller. Diğer stratejiler arasında, her bir token'a ne kadar süredir kilitli kaldığına bağlı olarak bir "oy ağırlığı" atamak veya bir adresin oy gücünü mevcut blok yerine geçmiş bir dönemde (örneğin, geçmişteki 2-3 blok) ölçmek yer alır. Her iki yöntem de zincir içi oyları yönlendirmek için hızlı bir şekilde oy gücü toplama olasılığını azaltır.

Paylaşılan bağlantılarda [güvenli yönetişim sistemleri tasarlama](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [DAO'lardaki farklı oylama mekanizmaları](https://hackernoon.com/governance-is-the-holy-grail-for-daos) ve [DeFi'den yararlanan yaygın DAO saldırı vektörleri](https://dacian.me/dao-governance-defi-attacks) hakkında daha fazla bilgi bulabilirsiniz.

### 8. Koddaki karmaşıklığı minimuma indirin {#reduce-code-complexity}

Geleneksel yazılım geliştiricileri, yazılım tasarımına gereksiz karmaşıklık getirilmemesini tavsiye eden KISS ("basit tut, aptal") prensibine aşinadır. Bu, "karmaşık sistemlerin karmaşık şekillerde başarısız olduğu" ve maliyetli hatalara daha duyarlı olduğu yönündeki uzun süredir devam eden düşünceyi takip eder.

Akıllı sözleşmelerin potansiyel olarak büyük miktarlarda değeri kontrol ettiği göz önüne alındığında, akıllı sözleşmeler yazarken işleri basit tutmak özel bir öneme sahiptir. Akıllı sözleşmeler yazarken basitliği sağlamak için bir ipucu, mümkün olduğunda [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/) gibi mevcut kütüphaneleri yeniden kullanmaktır. Bu kütüphaneler geliştiriciler tarafından kapsamlı bir şekilde denetlendiği ve test edildiği için, bunları kullanmak sıfırdan yeni işlevler yazarak hata getirme olasılığını azaltır.

Bir diğer yaygın tavsiye, küçük fonksiyonlar yazmak ve iş mantığını birden fazla sözleşmeye bölerek sözleşmeleri modüler tutmaktır. Daha basit kod yazmak yalnızca bir akıllı sözleşmedeki saldırı yüzeyini azaltmakla kalmaz, aynı zamanda genel sistemin doğruluğu hakkında akıl yürütmeyi ve olası tasarım hatalarını erkenden tespit etmeyi de kolaylaştırır.

### 9. Yaygın akıllı sözleşme güvenlik açıklarına karşı savunun {#mitigate-common-smart-contract-vulnerabilities}

#### Yeniden giriş (Reentrancy) {#reentrancy}

EVM eşzamanlılığa izin vermez, yani bir mesaj çağrısına dahil olan iki sözleşme aynı anda çalışamaz. Harici bir çağrı, çağrı dönene kadar çağıran sözleşmenin yürütülmesini ve belleğini duraklatır, bu noktada yürütme normal şekilde devam eder. Bu süreç resmi olarak [kontrol akışını](https://www.computerhope.com/jargon/c/contflow.htm) başka bir sözleşmeye aktarmak olarak tanımlanabilir.

Çoğunlukla zararsız olsa da, kontrol akışını güvenilmeyen sözleşmelere aktarmak yeniden giriş gibi sorunlara neden olabilir. Bir yeniden giriş saldırısı, kötü niyetli bir sözleşme, orijinal fonksiyon çağrısı tamamlanmadan önce savunmasız bir sözleşmeye geri çağrı yaptığında meydana gelir. Bu tür bir saldırı en iyi bir örnekle açıklanır.

Herkesin Ether yatırmasına ve çekmesine izin veren basit bir akıllı sözleşme ('Kurban') düşünün:

```solidity
// Bu Sözleşme savunmasızdır. Üretim ortamında kullanmayın

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Bu sözleşme, kullanıcıların daha önce sözleşmeye yatırılan ETH'yi çekmelerine olanak tanıyan bir `withdraw()` fonksiyonu sunar. Bir çekim işlemini işlerken, sözleşme aşağıdaki işlemleri gerçekleştirir:

1. Kullanıcının ETH bakiyesini kontrol eder
2. Çağıran adrese fon gönderir
3. Bakiyelerini 0'a sıfırlayarak kullanıcıdan ek çekimleri önler

`Victim` sözleşmesindeki `withdraw()` fonksiyonu bir "kontroller-etkileşimler-etkiler" (checks-interactions-effects) modelini izler. İşlemin _etkilerini_ uygulamadan (yani kullanıcının bakiyesini azaltmadan) önce, yürütme için gerekli koşulların karşılanıp karşılanmadığını _kontrol eder_ (yani kullanıcının pozitif bir ETH bakiyesi vardır) ve çağıranın adresine ETH göndererek _etkileşimi_ gerçekleştirir.

`withdraw()` harici olarak sahip olunan bir hesaptan (EOA) çağrılırsa, fonksiyon beklendiği gibi yürütülür: `msg.sender.call.value()` çağırana ETH gönderir. Ancak, `msg.sender` bir akıllı sözleşme hesabıysa ve `withdraw()` fonksiyonunu çağırırsa, `msg.sender.call.value()` kullanarak fon göndermek, o adreste depolanan kodun çalışmasını da tetikleyecektir.

Sözleşme adresinde dağıtılan kodun bu olduğunu hayal edin:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Bu sözleşme üç şey yapmak için tasarlanmıştır:

1. Başka bir hesaptan (muhtemelen saldırganın EOA'sı) bir depozito kabul etmek
2. Kurban sözleşmesine 1 ETH yatırmak
3. Akıllı sözleşmede depolanan 1 ETH'yi çekmek

Gelen `msg.sender.call.value` işleminden kalan gaz 40.000'den fazlaysa, `Attacker` sözleşmesinin `Victim` içindeki `withdraw()` fonksiyonunu tekrar çağıran başka bir fonksiyona sahip olması dışında burada yanlış bir şey yoktur. Bu, `Attacker` sözleşmesine `Victim` sözleşmesine yeniden girme ve `withdraw` fonksiyonunun ilk çağrısı tamamlanmadan _önce_ daha fazla fon çekme yeteneği verir. Döngü şuna benzer:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Özetle, çağıranın bakiyesi fonksiyon yürütmesi tamamlanana kadar 0'a ayarlanmadığından, sonraki çağrılar başarılı olacak ve çağıranın bakiyesini birden çok kez çekmesine izin verecektir. Bu tür bir saldırı, [2016 DAO hack'inde](https://www.coindesk.com/learn/understanding-the-dao-attack) olduğu gibi bir akıllı sözleşmenin fonlarını boşaltmak için kullanılabilir. [Yeniden giriş istismarlarının halka açık listelerinin](https://github.com/pcaversaccio/reentrancy-attacks) gösterdiği gibi, yeniden giriş saldırıları bugün akıllı sözleşmeler için hala kritik bir sorundur.

##### Yeniden giriş saldırıları nasıl önlenir
Yeniden girişle başa çıkmak için bir yaklaşım, [kontroller-etkiler-etkileşimler (checks-effects-interactions) modelini](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) izlemektir. Bu model, fonksiyonların yürütülmesini, yürütmeye devam etmeden önce gerekli kontrolleri gerçekleştiren kodun ilk sırada, ardından sözleşme durumunu manipüle eden kodun ve diğer sözleşmelerle veya EOA'larla etkileşime giren kodun en son geleceği şekilde sıralar.

Kontroller-etkiler-etkileşimler modeli, aşağıda gösterilen `Victim` sözleşmesinin revize edilmiş bir versiyonunda kullanılmaktadır:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Bu sözleşme, kullanıcının bakiyesi üzerinde bir _kontrol_ gerçekleştirir, `withdraw()` fonksiyonunun _etkilerini_ uygular (kullanıcının bakiyesini 0'a sıfırlayarak) ve _etkileşimi_ gerçekleştirmeye devam eder (kullanıcının adresine ETH göndererek). Bu, sözleşmenin harici çağrıdan önce depolamasını güncellemesini sağlayarak ilk saldırıyı mümkün kılan yeniden giriş koşulunu ortadan kaldırır. `Attacker` sözleşmesi hala `NoLongerAVictim` sözleşmesine geri çağrı yapabilir, ancak `balances[msg.sender]` 0 olarak ayarlandığından, ek çekimler bir hata fırlatacaktır.

Başka bir seçenek, bir fonksiyon çağrısı tamamlanana kadar bir sözleşmenin durumunun bir bölümünü kilitleyen karşılıklı dışlama kilidi (genellikle "mutex" olarak tanımlanır) kullanmaktır. Bu, fonksiyon yürütülmeden önce `true` olarak ayarlanan ve çağrı yapıldıktan sonra `false` değerine dönen bir Boolean değişkeni kullanılarak uygulanır. Aşağıdaki örnekte görüldüğü gibi, bir mutex kullanmak, orijinal çağrı hala işlenirken bir fonksiyonu özyinelemeli çağrılara karşı korur ve yeniden girişi etkili bir şekilde durdurur.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Bu fonksiyon bir muteks ile korunmaktadır, bu nedenle `msg.sender.call` içinden gelen yeniden giriş çağrıları `withdraw`'u tekrar çağıramaz.
    //  `return` ifadesi `true` olarak değerlendirilir ancak yine de değiştiricideki `locked = false` ifadesini değerlendirir
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Ayrıca, hesaplara fon gönderen bir "itme ödemeleri" (push payments) sistemi yerine, kullanıcıların akıllı sözleşmelerden fon çekmesini gerektiren bir [çekme ödemeleri](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) (pull payments) sistemi de kullanabilirsiniz. Bu, bilinmeyen adreslerdeki kodu yanlışlıkla tetikleme olasılığını ortadan kaldırır (ve ayrıca belirli hizmet reddi saldırılarını da önleyebilir).

#### Tamsayı taşmaları (underflow ve overflow) {#integer-underflows-and-overflows}

Bir tamsayı taşması (overflow), bir aritmetik işlemin sonuçları kabul edilebilir değer aralığının dışına çıktığında meydana gelir ve temsil edilebilir en düşük değere "başa sarmasına" neden olur. Örneğin, bir `uint8` yalnızca 2^8-1=255'e kadar olan değerleri saklayabilir. `255` değerinden daha yüksek değerlerle sonuçlanan aritmetik işlemler taşacak ve bir arabadaki kilometre sayacının maksimum kilometreye (999999) ulaştığında 0'a sıfırlanmasına benzer şekilde `uint` değerini `0` olarak sıfırlayacaktır.

Tamsayı alt taşmaları (underflow) benzer nedenlerle gerçekleşir: bir aritmetik işlemin sonuçları kabul edilebilir aralığın altına düşer. Diyelim ki bir `uint8` içinde `0` değerini azaltmaya çalıştınız, sonuç basitçe temsil edilebilir maksimum değere (`255`) başa saracaktır.

Hem tamsayı taşmaları hem de alt taşmaları, bir sözleşmenin durum değişkenlerinde beklenmedik değişikliklere yol açabilir ve planlanmamış yürütmeyle sonuçlanabilir. Aşağıda, bir saldırganın geçersiz bir işlem gerçekleştirmek için bir akıllı sözleşmedeki aritmetik taşmayı nasıl istismar edebileceğini gösteren bir örnek verilmiştir:

```
pragma solidity ^0.7.6;

// Bu sözleşme bir zaman kasası olarak hareket etmek üzere tasarlanmıştır.
// Kullanıcı bu sözleşmeye para yatırabilir ancak en az bir hafta boyunca çekemez.
// Kullanıcı ayrıca bekleme süresini 1 haftalık bekleme süresinin ötesine uzatabilir.

/*
1. TimeLock'u dağıtın
2. TimeLock adresiyle Attack'ı dağıtın
3. 1 ether göndererek Attack.attack'ı çağırın. Ether'inizi hemen
   çekebileceksiniz.

Ne oldu?
Attack, TimeLock.lockTime'ın taşmasına neden oldu ve 1 haftalık
bekleme süresinden önce çekim yapabildi.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        eğer t = mevcut kilit süresi ise, o zaman öyle bir x bulmalıyız ki
        x + t = 2**256 = 0
        yani x = -t
        2**256 = type(uint).max + 1
        yani x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Tamsayı taşmaları nasıl önlenir
0.8.0 sürümünden itibaren Solidity derleyicisi, tamsayı alt taşmaları ve taşmalarıyla sonuçlanan kodu reddeder. Ancak, daha düşük bir derleyici sürümüyle derlenen sözleşmeler, aritmetik işlemleri içeren fonksiyonlarda kontroller gerçekleştirmeli veya alt taşma/taşma kontrolü yapan bir kütüphane (örneğin, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) kullanmalıdır.

#### Kâhin (Oracle) manipülasyonu {#oracle-manipulation}

[Kâhinler](/developers/docs/oracles/), zincir dışı bilgileri kaynak olarak alır ve akıllı sözleşmelerin kullanması için zincir içine gönderir. Kâhinlerle, sermaye piyasaları gibi zincir dışı sistemlerle birlikte çalışan akıllı sözleşmeler tasarlayabilir ve uygulamalarını büyük ölçüde genişletebilirsiniz.

Ancak kâhin bozulursa ve zincir içine yanlış bilgi gönderirse, akıllı sözleşmeler hatalı girdilere dayalı olarak yürütülür ve bu da sorunlara neden olabilir. Bu, bir blokzincir kâhininden gelen bilgilerin doğru, güncel ve zamanında olduğundan emin olma göreviyle ilgili olan "oracle problemi"nin temelidir.

İlgili bir güvenlik endişesi, bir varlığın spot fiyatını almak için merkeziyetsiz bir borsa gibi zincir içi bir kâhin kullanmaktır. [Merkeziyetsiz finans (DeFi)](/defi/) endüstrisindeki borç verme platformları, ne kadar borç alabileceklerini belirlemek amacıyla bir kullanıcının teminatının değerini belirlemek için bunu sıklıkla yapar.

DEX fiyatları, büyük ölçüde arbitrajcıların piyasalardaki pariteyi geri kazanması nedeniyle genellikle doğrudur. Bununla birlikte, özellikle zincir içi kâhin varlık fiyatlarını (genellikle olduğu gibi) geçmiş ticaret modellerine göre hesaplıyorsa, manipülasyona açıktırlar.

Örneğin, bir saldırgan borç verme sözleşmenizle etkileşime girmeden hemen önce bir Flaş kredi alarak bir varlığın spot fiyatını yapay olarak şişirebilir. Varlığın fiyatı için DEX'i sorgulamak, (saldırganın varlığa olan talebi saptıran büyük "satın alma emri" nedeniyle) normalden daha yüksek bir değer döndürerek, almaları gerekenden daha fazla borç almalarına olanak tanır. Bu tür "Flaş kredi saldırıları", DeFi uygulamaları arasında fiyat kâhinlerine olan güveni istismar etmek için kullanılmış ve protokollere milyonlarca kayıp fona mal olmuştur.

##### Kâhin manipülasyonu nasıl önlenir
[Kâhin manipülasyonundan kaçınmak](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) için minimum gereksinim, tek hata noktalarından kaçınmak amacıyla birden fazla kaynaktan bilgi sorgulayan merkeziyetsiz bir kâhin ağı kullanmaktır. Çoğu durumda, merkeziyetsiz kâhinler, kâhin düğümlerini doğru bilgileri bildirmeye teşvik etmek için yerleşik kriptoekonomik teşviklere sahiptir ve bu da onları merkezi kâhinlerden daha güvenli hale getirir.

Varlık fiyatları için zincir içi bir kâhini sorgulamayı planlıyorsanız, zaman ağırlıklı ortalama fiyat (TWAP) mekanizması uygulayan bir kâhin kullanmayı düşünün. Bir [TWAP kâhini](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles), bir varlığın fiyatını iki farklı zaman noktasında (değiştirebileceğiniz) sorgular ve elde edilen ortalamaya göre spot fiyatı hesaplar. Daha uzun zaman dilimleri seçmek, yakın zamanda yürütülen büyük emirler varlık fiyatlarını etkileyemeyeceğinden protokolünüzü fiyat manipülasyonuna karşı korur.

## Geliştiriciler için akıllı sözleşme güvenlik kaynakları {#smart-contract-security-resources-for-developers}

### Akıllı sözleşmeleri analiz etme ve kod doğruluğunu onaylama araçları {#code-analysis-tools}

- **[Test araçları ve kütüphaneler](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Akıllı sözleşmeler üzerinde birim testleri, statik analiz ve dinamik analiz gerçekleştirmek için endüstri standardı araçlar ve kütüphaneler koleksiyonu._

- **[Biçimsel doğrulama araçları](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Akıllı sözleşmelerdeki işlevsel doğruluğu onaylamak ve değişmezleri kontrol etmek için araçlar._

- **[Akıllı sözleşme denetim hizmetleri](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Ethereum geliştirme projeleri için akıllı sözleşme denetim hizmetleri sağlayan organizasyonların listesi._

- **[Hata ödül platformları](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Hata ödüllerini koordine etmek ve akıllı sözleşmelerdeki kritik güvenlik açıklarının sorumlu bir şekilde ifşa edilmesini ödüllendirmek için platformlar._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Çatallanmış bir sözleşme ile ilgili mevcut tüm bilgileri kontrol etmek için ücretsiz bir çevrim içi araç._

- **[ABI Encoder](https://abi.hashex.org/)** - _Solidity sözleşme fonksiyonlarınızı ve kurucu argümanlarınızı kodlamak için ücretsiz bir çevrim içi hizmet._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Şüpheli güvenlik açıklarını tespit etmek için Soyut Sözdizimi Ağaçlarını (AST) dolaşan ve sorunları kolayca tüketilebilen bir markdown formatında yazdıran Solidity Statik Analizörü._

### Akıllı sözleşmeleri izleme araçları {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Akıllı sözleşmelerinizde veya cüzdanlarınızda olağandışı veya beklenmedik olaylar meydana geldiğinde gerçek zamanlı bildirimler almak için bir araç._

### Akıllı sözleşmelerin güvenli yönetimi için araçlar {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Ethereum üzerinde çalışan ve bir işlemin gerçekleşebilmesi için minimum sayıda kişinin onaylamasını gerektiren akıllı sözleşme cüzdanı (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Sözleşme sahipliği, yükseltmeler, erişim kontrolleri, yönetişim, duraklatılabilirlik ve daha fazlası dahil olmak üzere yönetimsel özellikleri uygulamak için sözleşme kütüphaneleri._

### Akıllı sözleşme denetim hizmetleri {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Blokzincir ekosistemindeki projelerin protokollerinin lansmana hazır olmasını ve kullanıcıları korumak için oluşturulmasını sağlamaya yardımcı olan akıllı sözleşme denetim hizmeti._

- **[CertiK](https://www.certik.com/)** - _Akıllı sözleşmeler ve blokzincir ağlarında son teknoloji biçimsel doğrulama teknolojisinin kullanımına öncülük eden blokzincir güvenlik firması._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Riski azaltmak ve kodu güçlendirmek için güvenlik araştırmasını saldırgan zihniyetiyle birleştiren siber güvenlik şirketi._

- **[PeckShield](https://peckshield.com/)** - _Tüm blokzincir ekosisteminin güvenliği, gizliliği ve kullanılabilirliği için ürünler ve hizmetler sunan blokzincir güvenlik şirketi._

- **[QuantStamp](https://quantstamp.com/)** - _Güvenlik ve risk değerlendirme hizmetleri aracılığıyla blokzincir teknolojisinin ana akım benimsenmesini kolaylaştıran denetim hizmeti._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Dağıtık sistemler için güvenlik denetimleri sağlayan akıllı sözleşme güvenlik şirketi._

- **[Runtime Verification](https://runtimeverification.com/)** - _Akıllı sözleşmelerin biçimsel modellenmesi ve doğrulanması konusunda uzmanlaşmış güvenlik şirketi._

- **[Hacken](https://hacken.io)** - _Blokzincir güvenliğine 360 derece yaklaşım getiren Web3 siber güvenlik denetçisi._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Ethereum ve Starknet genelinde akıllı sözleşmelerin bütünlüğünü ve kullanıcıların güvenliğini sağlayan Solidity ve Cairo denetim hizmetleri._

- **[HashEx](https://hashex.org/)** - _HashEx, kripto paraların güvenliğini sağlamak için blokzincir ve akıllı sözleşme denetimine odaklanır; akıllı sözleşme geliştirme, sızma testi, blokzincir danışmanlığı gibi hizmetler sunar._

- **[Code4rena](https://code4rena.com/)** - _Akıllı sözleşme güvenlik uzmanlarını güvenlik açıklarını bulmaya ve Web3'ü daha güvenli hâle getirmeye teşvik eden rekabetçi denetim platformu._

- **[CodeHawks](https://codehawks.com/)** - _Güvenlik araştırmacıları için akıllı sözleşme denetim yarışmalarına ev sahipliği yapan rekabetçi denetim platformu._

- **[Cyfrin](https://cyfrin.io)** - _Ürünler ve akıllı sözleşme denetim hizmetleri aracılığıyla kripto güvenliğini geliştiren Web3 güvenlik merkezi._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Deneyimli denetçilerden oluşan bir ekip ve sınıfının en iyisi araçlar aracılığıyla blokzincir sistemleri için güvenlik denetimleri sunan Web3 güvenlik firması._

- **[Oxorio](https://oxor.io/)** - _Kripto firmaları ve DeFi projeleri için EVM, Solidity, ZK, zincirler arası teknoloji alanlarında uzmanlığa sahip akıllı sözleşme denetimleri ve blokzincir güvenlik hizmetleri._

- **[Inference](https://inference.ag/)** - _EVM tabanlı blokzincirler için akıllı sözleşme denetiminde uzmanlaşmış güvenlik denetim şirketi. Uzman denetçileri sayesinde potansiyel sorunları tespit eder ve dağıtımdan önce bunları düzeltmek için eyleme geçirilebilir çözümler önerirler._

### Hata ödül platformları {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Güvenlik araştırmacılarının kodu incelediği, güvenlik açıklarını ifşa ettiği, ödeme aldığı ve kriptoyu daha güvenli hâle getirdiği akıllı sözleşmeler ve DeFi projeleri için hata ödül platformu._

- **[HackerOne](https://www.hackerone.com/)** - _İşletmeleri sızma test uzmanları ve siber güvenlik araştırmacılarıyla buluşturan güvenlik açığı koordinasyon ve hata ödül platformu._

- **[HackenProof](https://hackenproof.com/)** - _Güvenlik profesyonellerinin önceliklendirme hizmetleri sunduğu ve araştırmacıların ilgili, doğrulanmış hata raporları için ödeme aldığı kripto projeleri (DeFi, Akıllı Sözleşmeler, Cüzdanlar, CEX ve daha fazlası) için uzman hata ödül platformu._

-  **[Sherlock](https://www.sherlock.xyz/)** - _İlgili hataların adil bir şekilde ödenmesini sağlamak için akıllı sözleşmeler aracılığıyla yönetilen denetçi ödemeleriyle akıllı sözleşme güvenliği için Web3'te sigortacı._

-  **[CodeHawks](https://www.codehawks.com/)** - _Denetçilerin güvenlik yarışmalarında ve mücadelelerinde ve (yakında) kendi özel denetimlerinde yer aldığı rekabetçi hata ödül platformu._

### Bilinen akıllı sözleşme güvenlik açıkları ve istismarlarının yayınları {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Bilinen Akıllı Sözleşme Saldırıları](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Çoğu durum için örnek kod içeren, en önemli sözleşme güvenlik açıklarının yeni başlayanlar için uygun açıklaması._

- **[SWC Registry](https://swcregistry.io/)** - _Ethereum akıllı sözleşmeleri için geçerli olan Ortak Zayıflık Numaralandırması (CWE) öğelerinin derlenmiş listesi._

- **[Rekt](https://rekt.news/)** - _Ayrıntılı olay sonrası raporlarıyla birlikte yüksek profilli kripto hack'leri ve istismarlarının düzenli olarak güncellenen yayını._

### Akıllı sözleşme güvenliğini öğrenmek için mücadeleler {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Blokzincir güvenliği savaş oyunları, mücadeleleri ve [Bayrağı Yakala (Capture The Flag)](https://www.webopedia.com/definitions/ctf-event/amp/) yarışmaları ile çözüm yazılarının derlenmiş listesi._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _DeFi akıllı sözleşmelerinin ofansif güvenliğini öğrenmek ve hata avcılığı ile güvenlik denetimi konularında beceriler geliştirmek için savaş oyunu._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Her seviyenin 'hacklenmesi' gereken bir akıllı sözleşme olduğu Web3/Solidity tabanlı savaş oyunu._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Fantastik bir macerada geçen akıllı sözleşme hackleme mücadelesi. Mücadelenin başarıyla tamamlanması aynı zamanda özel bir hata ödül programına erişim sağlar._

### Akıllı sözleşmeleri güvence altına almak için en iyi uygulamalar {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Akıllı Sözleşme Güvenliği En İyi Uygulamaları](https://consensys.github.io/smart-contract-best-practices/)** - _Ethereum akıllı sözleşmelerini güvence altına almak için kapsamlı yönergeler listesi._

- **[Nascent: Basit Güvenlik Araç Seti](https://github.com/nascentxyz/simple-security-toolkit)** - _Akıllı sözleşme geliştirme için pratik güvenlik odaklı kılavuzlar ve kontrol listeleri koleksiyonu._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Akıllı sözleşme programlama dili Solidity için güvenli kalıpların ve en iyi uygulamaların faydalı bir derlemesi._

- **[Solidity Belgeleri: Güvenlik Hususları](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Solidity ile güvenli akıllı sözleşmeler yazmak için yönergeler._

- **[Akıllı Sözleşme Güvenlik Doğrulama Standardı](https://github.com/securing/SCSVS)** - _Geliştiriciler, mimarlar, güvenlik incelemecileri ve satıcılar için akıllı sözleşmelerin güvenliğini standartlaştırmak amacıyla oluşturulmuş on dört bölümlük kontrol listesi._

- **[Akıllı Sözleşme Güvenliğini ve Denetimini Öğrenin](https://updraft.cyfrin.io/courses/security)** - _Güvenlik konusundaki en iyi uygulamalarını geliştirmek ve güvenlik araştırmacısı olmak isteyen akıllı sözleşme geliştiricileri için oluşturulmuş nihai akıllı sözleşme güvenliği ve denetimi kursu._

### Akıllı sözleşme güvenliği üzerine eğitimler {#tutorials-on-smart-contract-security}

- [Güvenli akıllı sözleşmeler nasıl yazılır](/developers/tutorials/secure-development-workflow/)

- [Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Akıllı sözleşme hatalarını bulmak için Manticore nasıl kullanılır](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Akıllı sözleşme güvenlik yönergeleri](/developers/tutorials/smart-contract-security-guidelines/)

- [Token sözleşmenizi rastgele token'larla güvenli bir şekilde nasıl entegre edersiniz](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Akıllı sözleşme güvenliği ve denetimi tam kursu](https://updraft.cyfrin.io/courses/security)