---
title: Akıllı sözleşme güvenliği
description: Güvenli Ethereum akıllı sözleşmeleri oluşturma yönergelerine genel bakış
lang: tr
---

Akıllı sözleşmeler son derece esnektir ve blokzincirlere dağıtılan kod temelinde değiştirilemez mantık çalıştırırken büyük miktarlarda değer ve veriyi de kontrol etme özelliğine de sahiptir. Bu, canlı bir güven gerektirmeyen ve merkeziyetsiz uygulamalar ekosistemi yaratmıştır ve bu uygulamalar geleneksel sistemlere oranla birçok avantaja sahiptir. Aynı zamanda, akıllı sözleşmelerdeki güvenlik açıklarından yararlanarak kar peşinde koşan saldırganlar için fırsatlar sunarlar.

Ethereum gibi halka açık blokzincirler, akıllı sözleşmelerin güvenliğini sağlama sorununu daha da karmaşık hale getirir. Dağıtılmış sözleşme kodu _genellikle_ güvenlik açıklarını kapatmak için değiştirilemez, ayrıca akıllı sözleşmelerden çalınan varlıkların takibi aşırı derecede zordur ve çoğunlukla değiştirilemezlik kaynaklı olarak geri alınamaz.

Rakamlar değişkenlik gösterse de, akıllı sözleşmelerdeki güvenlik açıklarından kaynaklı kaybedilen veya çalınan toplam değerin miktarının 1 milyar doları rahatlıkla aştığı tahmin edilmektedir. Bu, [DAO hacki](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3.6 milyon ETH çalınmıştır; değeri, günümüz fiyatlarıyla 1 milyar doların üzerindedir), [Parity çoklu imza cüzdanı hacki](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (Hackerlara 30 milyon dolar kaybedilmiştir), [Parity donmuş cüzdan sorunu](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (300 milyon dolardan fazla ETH sonsuza kadar kilitlenmiştir) gibi yüksek profilli olayları içerir.

Sayılan sorunlar geliştiricilerin güvenli, güçlü ve sağlam akıllı sözleşmeler oluşturmaya çaba harcamasını zorunlu kılmaktadır. Akıllı sözleşme güvenliği ciddi bir iştir ve her geliştiricinin öğrenmesi gerekir. Bu kılavuz, Ethereum geliştiricilerinin güvenlik konusunda dikkat etmesi gereken hususları ele alacak ve akıllı sözleşme güvenliğini geliştirmeye yönelik kaynakları inceleyecektir.

## Ön koşullar {#prerequisites}

Güvenlik konusuna girmeden önce [akıllı sözleşme geliştirmenin temelleri](/developers/docs/smart-contracts/) ile aşina olduğunuzdan emin olun.

## Güvenli Ethereum akıllı sözleşmeleri oluşturma yönergeleri {#smart-contract-security-guidelines}

### 1. Uygun erişim kontrolleri tasarlayın {#design-proper-access-controls}

Akıllı sözleşmelerde, `public` veya `external` olarak işaretlenmiş olan fonksiyonlar herhangi bir harici olarak sahiplenilmiş hesap (EOA'lar) veya sözleşme hesabı tarafından çağırılabilir. Başkalarının sözleşmeniz ile etkileşime girmesini istiyorsanız fonksiyonlar için herkese açık görülebilirliği belirtmeniz gereklidir. Ancak `private` olarak işaretlenmiş olan fonksiyonlar harici hesaplardan değil, sadece akıllı sözleşmenin içinden çağırılabilir. Her ağ katılımcısına sözleşme fonksiyonlarına erişim hakkı vermek, özellikle de hassas işlemleri herkesin yapabileceği anlamına geliyorsa (örneğin yeni jetonlar basmak) sorunlar yaratabilir.

Akıllı sözleşme fonksiyonlarının izinsiz kullanımını engellemek için güvenli erişim kontrolleri uygulamak şarttır. Erişim kontrol mekanizmaları, bir akıllı sözleşmedeki belirli fonksiyonları kullanma olanağını sözleşmeyi yönetmekten sorumlu olan hesaplar gibi onaylı varlıklar ile sınırlar. **Sahiplenilebilir desen** ve **rol tabanlı kontrol**, akıllı sözleşmelerde erişim kontrolü uygulamaya yönelik iki kullanışlı desendir:

#### Sahiplenilebilir desen {#ownable-pattern}

Sahiplenilebilir desende, sözleşme yaratım sürecinde bir adres sözleşmenin "sahibi" olarak ayarlanır. Korunan fonksiyonlara bir `OnlyOwner` niteleyicisi atanır; bu niteleyici, sözleşmenin fonksiyonu yürütmeden önce çağıran adresin kimliğini doğrulamasını sağlar. Korunan fonksiyonlara sözleşme sahibinin dışındaki diğer adreslerden yapılan çağrılar hep geri döndürülerek istenmeyen erişim engellenir.

#### Rol tabanlı erişim kontrolü {#role-based-access-control}

Bir akıllı sözleşmede tek bir adresi `Owner` olarak kaydetmek, merkezileşme riskini beraberinde getirir ve tek bir başarısızlık noktasını temsil eder. Sahibin hesap anahtarları açığa çıkarsa, saldırganlar sahip olunan sözleşmeye saldırabilir. İşte bu nedenle, birden fazla yönetim hesabı olan rol tabanlı bir erişim kontrol deseninin kullanılması daha iyi bir seçenek olabilir.

Rol tabanlı erişim kontrolünde, hassas fonksiyonlara erişim bir grup güvenilir katılımcıya dağıtılır. Örnek olarak, bir hesap jeton basmaktan sorumlu olabilir, diğer hesap da yükseltmeleri gerçekleştirir veya sözleşmeyi duraklatır. Erişim kontrolünü bu yolla merkeziyetsizleştirmek, tek başarısızlık noktalarını ortadan kaldırır ve kullanıcılar için güven varsayımlarını azaltır.

##### Çoklu imzalı cüzdanlar kullanma

Güvenli erişim kontrolü uygulamaya yönelik diğer bir yaklaşım ise sözleşmeyi yönetmek için [çoklu imzalı hesap](/developers/docs/smart-contracts/#multisig) kullanmaktır. Çoklu imzalı hesaplar, sıradan bir EOA'nın aksine birden fazla varlığa aittir ve işlemleri yürütmek için belirlenen minimum sayıda hesaptan (örneğin 5 hesaptan 3'ü) imza alınmasını şart koşar.

Erişim kontrolü için çoklu imza kullanmak, hedef sözleşme üzerinde yapılacak eylemlerin birden fazla tarafın iznini gerektirmesi nedeniyle ekstra bir güvenlik katmanı sağlar. Bu, özellikle sahiplenilebilir desenin kullanılması zorunluysa kullanışlıdır, çünkü bir saldırganın veya içeriden kötü niyetli birinin hassas sözleşme fonksiyonlarını kötü amaçlar için manipüle etmesini daha da zorlaştırır.

### 2. Sözleşme operasyonlarını korumak için require(), assert() ve revert() ifadelerini kullanın {#use-require-assert-revert}

Belirtildiği gibi, akıllı sözleşmenizdeki herkese açık fonksiyonları blokzincire dağıtıldıktan sonra herkes çağırabilir. Harici hesapların bir sözleşme ile nasıl etkileşime geçeceğini önceden bilemeyeceğiniz için dağıtmadan önce sorunlu işlemlere karşı dahili önlemleri uygulamaya koymak idealdir. Akıllı sözleşmelerde yürütmenin bazı gereklilikleri başarıyla karşılayamadığı durumlarda istisnaları tetiklemek ve durum değişikliklerini geri almak için doğru davranışları `require()`, `assert()`, ve `revert()` ifadelerini kullanarak uygulatabilirsiniz.

**`require()`**: `require`, fonksiyonların başlangıcında tanımlanır ve önceden belirlenmiş koşulların çağrılan fonksiyon yürütülmeden önce karşılanmasını sağlar. Bir `require` ifadesi, bir fonksiyona devam etmeden önce kullanıcı girdilerini doğrulamak, durum değişkenlerini kontrol etmek veya çağıran hesabın kimliğini doğrulamak için kullanılabilir.

**`assert()`**: `assert()`, dahili hataları tespit etmek ve kodunuzda "değişmez" ihlali olup olmadığını kontrol etmek için kullanılır. Bir değişmez, bir sözleşmenin durumu ile ilgili olarak tüm fonksiyon yürütmeleri için doğru olması gereken mantıksal bir çıkarımdır. Bir jeton sözleşmesinin maksimum toplam arzı veya bakiyesi, değişmeze örnek olarak verilebilir. `assert()` kullanmanız sözleşmenizin asla güvenlik açığı olan bir duruma gelmemesini ve gelirse de durum değişkenlerinde yapılan tüm değişikliklerin geri alınmasını sağlar.

**`revert()`**: `revert()`, gerekli koşul sağlanmadığında bir istisna tetikleyen bir eğer-değilse ifadesinde kullanılabilir. Aşağıdaki örnek sözleşmede, fonksiyonların yürütülmesini korumak için `revert()` kullanılmaktadır:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Akıllı sözleşmeleri test edin ve kod doğruluğunu onaylayın {#test-smart-contracts-and-verify-code-correctness}

[Ethereum Sanal Makinası](/developers/docs/evm/)'nda çalışan kodun değiştirilemezliği, akıllı sözleşmelerin geliştirme aşamasında daha yüksek seviyede bir kalite kontrole ihtiyaç duyduğunu gösterir. Sözleşmeyi kapsamlı bir şekilde test etmek ve beklenmeyen bir sonuç olup olmadığını görmek için gözlemlemek, güvenliği büyük oranda artırır ve uzun vadede kullanıcılarınızı korur.

Sık kullanılan yöntem, sözleşmenin kullanıcılardan alması beklenen taklit verileri kullanarak küçük birim testleri yazmaktır. [Birim testi yapmak](/developers/docs/smart-contracts/testing/#unit-testing), bazı fonksiyonların çalışıp çalışmadığını test etmek ve bir akıllı sözleşmenin beklendiği gibi çalıştığından emin olmak açısından kullanışlıdır.

İzole şekilde kullanıldığında birim testi yapmak maalesef akıllı sözleşme güvenliğini geliştirmekte minimal seviyede etkilidir. Bir birim testi, bir fonksiyonun taklit veriler için düzgün şekilde yürütüldüğünü kanıtlayabilse de, birim testleri sadece yazılan testler kadar etkilidir. Bu, akıllı sözleşmenizin güvenliğine zarar verebilecek eksik uç durumlarını ve güvenlik açıklarını tespit etmeyi zorlaştırır.

Birim testini [statik ve dinamik analiz](/developers/docs/smart-contracts/testing/#static-dynamic-analysis) kullanarak özellik tabanlı test ile birleştirmek daha doğru bir yaklaşımdır. Statik analiz, ulaşılabilir program durumlarını ve yürütme yollarını analiz etmek için [kontrol akış grafikleri](https://en.wikipedia.org/wiki/Control-flow_graph) ve [soyut söz dizimi ağaçları](https://deepsource.io/glossary/ast/) gibi düşük seviye gösterimlere dayanır. Bu arada, [akıllı sözleşme bulanıklaştırma](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry) gibi dinamik analiz teknikleri, sözleşme kodunu rastgele giriş değerleriyle yürüterek güvenlik özelliklerini ihlal eden işlemleri tespit eder.

[Resmi doğrulama](/developers/docs/smart-contracts/formal-verification), akıllı sözleşmelerdeki güvenlik özelliklerini doğrulamaya yönelik başka bir tekniktir. Sıradan testlerin aksine, resmi doğrulama bir akıllı sözleşmede hata bulunmadığını kesin bir şekilde kanıtlayabilir. Bu, istenen güvenlik özelliklerini belirleyen bir resmi spesifikasyon oluşturarak ve sözleşmelerin resmi bir modelinin bu spesifikasyona uyduğu kanıtlanarak gerçekleştirilir.

### 4. Kodunuz için bağımsız bir inceleme yapılmasını talep edin {#get-independent-code-reviews}

Sözleşmenizi test ettikten sonra başkalarından herhangi bir güvenlik sorunu için kaynak koduna bakmalarını istemek doğru olur. Test etmek, bir akıllı sözleşmedeki her hatayı ortaya çıkarmayacaktır, ancak bağımsız bir inceleme yaptırmak güvenlik açıklarının tespit edilmesi ihtimalini artırır.

#### Denetimler {#audits}

Akıllı sözleşme denetim hizmeti almak, bağımsız bir kod incelemesi gerçekleştirmenin bir yoludur. Denetimciler, akıllı sözleşmelerin güvenli olmasının, kalite eksikleri ve tasarım hataları içermemesinin sağlanmasında önemli bir rol oynar.

Bununla birlikte, denetimleri sihirli değnek gibi görmemelisiniz. Akıllı sözleşme denetimleri her hatayı yakalamaz ve çoğunlukla ek bir dizi inceleme sunmak üzere tasarlanmıştır, bu da geliştiriciler tarafından ilk geliştirme ve test esnasında gözden kaçırılabilecek sorunları tespit etmeye yardımcı olur. Ayrıca akıllı sözleşme denetiminin faydasını maksimuma çıkarmak için kodu düzgün biçimde belgelemek ve satır içi yorumlar eklemek gibi denetimcilerle çalışmaya yönelik en iyi pratikleri takip etmelisiniz.

- [Akıllı sözleşme denetim ipuçları ve püf noktaları](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Denetiminizden en iyi şekilde yararlanın](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Hata ödülleri {#bug-bounties}

Bir hata ödülü programı oluşturmak, harici kod incelemelerinin uygulamaya koymaya yönelik başka bir yaklaşımdır. Hata ödülü, bir uygulamada güvenlik açığı bulan kişilere (genelde beyaz şapkalı hackerlar) verilen para cinsinden bir ödüldür.

Düzgün şekilde kullanıldığında, hata ödülleri hacker topluluğunun üyelerine kodunuzda kritik hatalar bulunup bulunmadığını incelemeleri için bir teşvik sunar. Bunun gerçek hayattaki örneklerinden biri, Ethereum üzerinde çalışan bir [Katman 2](/layer-2/) protokolü olan [Optimism](https://www.optimism.io/) üzerinde bir saldırganın sınırsız miktarda Ether yaratabilmesine olanak tanıyan "sınırsız para hatası"dır. Neyse ki bir beyaz şapkalı hacker [hatayı bulmuş](https://www.saurik.com/optimism.html) ve takıma bildirmiş, [bu süreçte de büyük bir ödeme almıştır](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Bir hata ödülü programının ödemesini ilgili fonların miktarı ile orantılı bir şekilde ayarlamak kullanışlı bir stratejidir. “[Hata ödülünü ölçeklendirme](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)” olarak tanımlanan bu yaklaşım, kişilerin güvenlik açıklarını istismar etmek yerine sorumlu şekilde bildirmesi için parasal teşvikler sağlar.

### 5. Akıllı sözleşme geliştirme sırasında en iyi uygulamaları takip edin {#follow-smart-contract-development-best-practices}

Denetimlerin ve hata ödüllerinin varlığı, yüksek kalitede kod yazma sorumluluğunuz açısından bir mazeret değildir. Akıllı sözleşme güvenliğinin iyi seviyede olması için ilk olarak düzgün tasarım ve geliştirme süreçleri oluşturmanız gerekir:

- Tüm kodu git gibi bir sürüm denetimi sisteminde depolayın

- Tüm kod değişikliklerini çekme istekleri aracılığı ile yapın

- Çekme isteklerinin en az bir bağımsız denetçisi olduğundan emin olun; bir projede tek başınıza çalışıyorsanız, başka geliştiriciler bulmayı ve kod incelemesi alışverişinde bulunmayı düşünün

- Akıllı sözleşmeleri test etmek, derlemek ve dağıtmak için bir [geliştirme ortamı](/developers/docs/frameworks/) kullanın

- Kodunuzu [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril ve Slither gibi temel kod analiz araçlarından geçirin. İdeal olarak, bunu her çekme isteği birleştirmesinden önce yapmalı ve çıktılardaki farkları karşılaştırmalısınız

- Kodunuzun hatasız bir şekilde derlendiğinden ve Solidity derleyicisinin herhangi bir uyarı vermediğinden emin olun

- Kodunuzu düzgün biçimde belgelendirin ([NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html) kullanın) ve sözleşme yapısı hakkındaki detayları anlaşılabilir bir dille açıklayın. Bu, başkalarının sizin kodunuzu denetlemesini ve incelemesini kolaylaştıracaktır.

### 6. Güçlü olağanüstü durum kurtarma planları uygulayın {#implement-disaster-recovery-plans}

Güvenli erişim kontrolleri tasarlamak, fonksiyon değiştiricileri uygulamak ve diğer öneriler, akıllı sözleşme güvenliğini artırabilir ancak kötü niyetli saldırıların gerçekleşme ihtimalini sıfıra indirgeyemez. Güvenli akıllı sözleşmeler oluşturmak, "başarısızlığa hazırlanmayı" ve saldırılara karşı etkili bir şekilde cevap vermek için bir geri dönüş planına sahip olmayı gerektirir. Düzgün bir olağanüstü durum kurtarma planı, aşağıdaki bileşenlerin bazılarını ya da hepsini kapsar:

#### Sözleşme yükseltmeleri {#contract-upgrades}

Ethereum akıllı sözleşmeleri varsayılan olarak değiştirilemez olsa da, yükseltme desenleri kullanılarak bir dereceye kadar değiştirilebilirliğe ulaşmak mümkündür. Kritik bir hatanın eski sözleşmenizi kullanılamaz hale getirdiği ve yeni bir mantık dağıtmanın en makul seçenek olduğu durumlarda sözleşmeleri yükseltmek gereklidir.

Sözleşme yükseltme mekanizmaları farklı şekilde çalışsa da, "vekil deseni" akıllı sözleşmeleri yükseltmeye yönelik daha popüler yaklaşımlardan biridir. [Vekil desenleri](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) bir uygulamanın durumunu ve mantığını _iki_ sözleşme arasında böler. İlk sözleşme ('vekil sözleşmesi' adı verilir) durum değişkenlerini depolar (örneğin kullanıcı bakiyeleri), ikinci sözleşme ise ('mantık sözleşmesi' adı verilir) sözleşme fonksiyonlarını yürütmek için gereken kodu tutar.

Hesaplar, tüm fonksiyon çağrılarını [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) düşük seviye çağrısı kullanarak mantık sözleşmesine ileten vekil sözleşmesi ile etkileşime geçer. Sıradan bir mesaj çağrısının aksine `delegatecall()`, mantık sözleşmesinin adresinde çalışan kodun çağıran sözleşme bağlamında yürütülmesini sağlar. Bu, mantık sözleşmesinin her zaman vekilin depolamasına yazacağı (kendi depolaması yerine) ve `msg.sender` ile `msg.value` değerlerinin orijinal halinin korunacağı anlamına gelir.

Mantık sözleşmesine çağrılar devretmek için adresinin vekil sözleşmesinin depolamasında depolanması gerekir. Dolayısıyla sözleşmenin mantığını yükseltme, sadece başka bir mantık sözleşmesi dağıtmaktan ve yeni adresi vekil sözleşmesinde depolamaktan ibarettir. Vekil sözleşmesine sonraki çağrılar otomatik olarak yeni mantık sözleşmesine yönlendirildiği için kodu gerçekten değiştirmeden sözleşmeyi "yükseltmiş" olursunuz.

[Sözleşme yükseltme hakkında daha fazla ayrıntı](/developers/docs/smart-contracts/upgrading/).

#### Acil durdurmalar {#emergency-stops}

Belirtildiği gibi, bir akıllı sözleşmedeki tüm hataları geniş çaplı denetim ve test yoluyla bulmak mümkün olmayabilir. Dağıtım sonrası kodunuzda bir güvenlik açığı ortaya çıkarsa, sözleşme adresinde çalışan kodu değiştiremeyeceğiniz için bu açığı kapatmak imkansızdır. Ayrıca yükseltme mekanizmalarını (örneğin vekil desenleri) uygulamak zaman alabilir (genelde farklı taraflardan onay alınması gerekir), bu da saldırganlara daha fazla zarar vermek için daha fazla zaman tanır.

Nükleer seçenek ise bir sözleşmede güvenlik açığı bulunan fonksiyonlara gelecek çağrıları engelleyen bir "acil durdurma" fonksiyonunu uygulamaya koymaktır. Acil durdurmalar genelde şu bileşenlerden oluşur:

1. Akıllı sözleşmenin durdurulmuş bir durumda olup olmadığını gösteren global bir Boole değişkeni. Bu değişken, sözleşme oluşturulurken `false` olarak ayarlanmıştır ancak sözleşme durdurulduğunda `true` şekline döner.

2. Yürütülürken Boole değişkenine başvuran fonksiyonlar. Bu fonksiyonlar, akıllı sözleşme durdurulmamışsa erişilebilir durumdadır ve acil durdurma özelliği tetiklendiğinde erişilemez hale gelir.

3. Acil durdurma fonksiyonuna erişimi olan, Boole değişkenini `true` yapan bir varlık. Bu fonksiyona yapılan çağrılar, kötü niyetli eylemleri önlemek için güvenilir bir adres ile (örneğin sözleşme sahibi) sınırlandırılabilir.

Sözleşmenin acil durdurmayı etkinleştirmesinin ardından belirli fonksiyonlar çağrılabilir niteliğini kaybeder. Bu, seçili fonksiyonların global değişkene başvuran bir niteleyici ile paketlenmesi yoluyla gerçekleştirilir. Bu desenin sözleşmelerdeki bir uygulamasını açıklayan [bir örneği](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) aşağıda bulabilirsiniz:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Bu örnek, acil durdurmaların temel özelliklerini göstermektedir:

- `isStopped`, başlangıçta `false` olan ve sözleşme acil durum moduna geçtiğinde değişerek `true` olan bir Boole değeridir.

- `onlyWhenStopped` ve `stoppedInEmergency` fonksiyon niteleyicileri, `isStopped` değişkenini kontrol eder. `stoppedInEmergency`, sözleşmenin güvenlik açığı olduğunda (örneğin `deposit()`) erişilemez olması gereken fonksiyonları kontrol etmek için kullanılır. Basitçe ifade etmek gerekirse, bu fonksiyonlara yapılan çağrılar geri döndürülür.

`onlyWhenStopped`, sadece bir acil durum esnasında çağrılabilir olması gereken fonksiyonlar (örneğin `emergencyWithdraw()`) için kullanılır. Bu tarz fonksiyonlar durumun çözüme kavuşturulmasına yardımcı olabilir ve bundan dolayı "yasaklı fonksiyonlar" listesinden çıkarılmıştır.

Acil durdurma fonksiyonunu kullanmak, akıllı sözleşmenizdeki ciddi güvenlik açıkları ile baş etmek adına etkili bir tedbirdir. Ancak, kullanıcıların kendi faydalarına etkinleştirmemeleri konusunda geliştiricilere güvenmesi ihtiyacını artırır. Bu amaçla, acil durdurma kontrolünün merkeziyetsizleştirilmesi için ya zincir üstü bir oy mekanizmasına tabi tutularak ya zaman kilidi uygulanarak ya da çoklu imza cüzdanından onay alınarak çözümler geliştirmek mümkündür.

#### Olay izleme {#event-monitoring}

[Olaylar](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events), akıllı sözleşme fonksiyonlarına yapılan çağrıları takip etmenize ve durum değişkenlerindeki değişiklikleri izlemenize olanak tanır. Akıllı sözleşmenizi, bir tarafın güvenlik açısından kritik bir eylem (örneğin, fon çekme) gerçekleştirdiğinde bir olay yayımlayacak şekilde programlamak idealdir.

Olayları günlüğe kaydetmek ve bunları zincir dışında izlemek, sözleşme işlemleri hakkında bilgi sağlar ve kötü niyetli eylemlerin daha hızlı tespitine yardımcı olur. Bu, ekibinizin hızlı bir şekilde hacklere yanıt verebilmesi ve kullanıcılar üzerindeki etkiyi azaltmak için fonksiyonları duraklatma veya yükseltme yapma gibi önlemler alabilmesi anlamına gelir.

Ayrıca, sözleşmelerinizle biri etkileşimde bulunduğunda otomatik olarak uyarıları ileten hazır bir izleme aracını da tercih edebilirsiniz. Bu araçlar işlem hacmi, fonksiyon çağrılarının sıklığı veya sürecin parçası olan spesifik fonksiyonlar gibi farklı tetikleyicilere göre özel uyarılar oluşturmanıza olanak sağlar. Örneğin, tek bir işlemde çekilen miktarın belirli bir eşiği aşması durumunda devreye girecek bir uyarı programlayabilirsiniz.

### 7. Güvenli yönetişim sistemleri tasarlayın {#design-secure-governance-systems}

Ana akıllı sözleşmelerin kontrolünü topluluk üyelerine devretmek suretiyle uygulamanızı merkeziyetsizleştirmeyi düşünebilirsiniz. Bu durumda akıllı sözleşme sistemi, topluluk üyelerinin yönetimsel eylemleri zincir üstünde yönetişim sistemi aracılığıyla onaylayabilmesine olanak tanıyan bir yönetişim modülü içerecektir. Örneğin, bir vekil sözleşmenin yeni bir uygulamaya yükseltilmesi teklifi, jeton sahipleri tarafından oylanabilir.

Merkezi olmayan yönetişim, özellikle geliştiricilerin ve son kullanıcıların çıkarlarını uyumlu hale getirdiği için faydalı olabilir. Yine de, akıllı sözleşme yönetişim mekanizmaları yanlış uygulandığında yeni riskleri beraberinde getirebilir. Saldırganın bir [flash loan](/defi/#flash-loans) (hızlı kredi) alarak büyük miktarda oy hakkı (elindeki jeton sayısıyla ölçülen) elde etmesi ve kötü niyetli bir teklifi kabul ettirmesi makul bir senaryo olabilir.

Zincir üstünde yönetişimle ilgili sorunları önlemenin bir yolu, bir [zaman kilidi](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/) kullanmaktır. Zaman kilidi, bir akıllı sözleşmenin belirli bir süre geçene kadar belirli eylemleri gerçekleştirmesini engeller. Diğer stratejiler arasında her bir jetona ne kadar süreyle kilitlendiğine dayalı olarak bir "oylama ağırlığı" atama veya bir adresin oy gücünü mevcut blok yerine geçmişteki bir dönemde (örneğin, geçmişteki 2-3 blok) ölçme gibi yöntemler yer alır. Her iki yöntem de oy gücünü zincir üstündeki oyları hızla etkileyecek şekilde toplama olasılığını azaltır.

[Güvenli yönetişim sistemleri tasarlama](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [DAO'lardaki farklı oylama mekanizmaları](https://hackernoon.com/governance-is-the-holy-grail-for-daos) ve [DeFi kullanan yaygın DAO saldırı vektörleri](https://dacian.me/dao-governance-defi-attacks) hakkında daha fazla bilgi için paylaşılan bağlantılara başvurun.

### 8. Kodun karmaşıklık düzeyini minimuma indirgeyin {#reduce-code-complexity}

Geleneksel yazılım geliştiricileri, yazılım tasarımına gereksiz karmaşıklık eklememeyi tavsiye eden "KISS" ("keep it simple, stupid - basit tut, aptal") prensibini iyi bilir. Bu, uzun süredir kabul gören "karmaşık sistemler karmaşık şekillerde başarısız olur" düşüncesine uygundur ve bu sistemler maliyetli hatalara daha yatkındır.

Akıllı sözleşmeleri yazarken işleri basit tutmak, akıllı sözleşmelerin potansiyel olarak büyük miktarlarda değeri kontrol ettiği göz önüne alındığında özellikle önemlidir. Akıllı sözleşme yazarken basitliği sağlamaya yönelik bir ipucu, mümkün olduğunda [OpenZeppelin Sözleşmeleri](https://docs.openzeppelin.com/contracts/4.x/) gibi mevcut kütüphaneleri yeniden kullanmaktır. Bu kütüphaneler, geliştiriciler tarafından kapsamlı bir şekilde denetlenmiş ve test edilmiş olduğundan bunların kullanılması, yeni işlevselliğin sıfırdan yazılarak hataların eklenmesi olasılığını azaltır.

Başka yaygın bir tavsiye de küçük fonksiyonlar yazmak ve iş mantığını birden fazla sözleşmeye bölerek sözleşmeleri modüler tutmaktır. Basit kod yazmak, akıllı sözleşmedeki saldırı yüzeyini azaltırken genel sistem doğruluğu hakkında düşünmeyi ve olası tasarım hatalarını erken tespit etmeyi de kolaylaştırır.

### 9. Yaygın akıllı sözleşme güvenlik açıklarına karşı savunma geliştirin {#mitigate-common-smart-contract-vulnerabilities}

#### Yeniden giriş {#reentrancy}

Ethereum Sanal Makinesi, eş zamanlılığa izin vermez; yani bir mesaj çağrısına dahil olan iki sözleşme aynı anda çalışamaz. Harici bir çağrı sözleşmenin yürütülmesini ve hafızasını çağrı dönene kadar duraklatır; bunun ardından yürütme normal şekilde devam eder. Bu süreç resmi olarak [kontrol akışını](https://www.computerhope.com/jargon/c/contflow.htm) başka bir sözleşmeye aktarmak olarak tanımlanabilir.

Çoğunlukla zararsız olsa da, kontrol akışını güvenilmeyen sözleşmelere aktarmak yeniden giriş gibi problemlere yok açabilir. Yeniden giriş saldırısı, kötü niyetli bir sözleşmenin güvenlik açığı bulunan bir sözleşmeye asıl fonksiyonun çağrısı tamamlanmadan geri çağrı yapması durumunda gerçekleşir. Bu tür bir saldırı en iyi şekilde örnek vererek açıklanabilir.

Herhangi bir kişinin Ether yatırmasına ve çekmesine izin veren basit bir akıllı sözleşme ('Victim') düşünün:

```solidity
// This contract is vulnerable. Do not use in production

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

Bu sözleşme, kullanıcıların sözleşmeye önceden yatırılmış olan ETH'yi çekmesini sağlayan `withdraw()` fonksiyonunu açığa çıkartır. Sözleşme, bir çekimi işlerken şu işlemleri gerçekleştirir:

1. Kullanıcının ETH bakiyesini kontrol eder
2. Fonları çağıran adrese yollar
3. Bakiyeyi 0'a ayarlayarak kullanıcının ek çekimler yapmasını önler

`Victim` sözleşmesindeki `withdraw()` fonksiyonu, "kontroller-etkileşimler-etkiler" desenini takip eder. Yürütme için gerekli koşulların sağlanıp sağlanmadığını (yani kullanıcının pozitif bir ETH bakiyesi olup olmadığını) _kontrol eder_ ve işlemin _etkilerini_ uygulamadan önce (yani kullanıcının bakiyesini düşürmek) çağıranın adresine ETH göndererek _etkileşimi_ gerçekleştirir.

Eğer `withdraw()` bir dışarıdan sahip olunan hesap (EOA) tarafından çağrılırsa, fonksiyon beklenildiği gibi çalışır: `msg.sender.call.value()` çağırana ETH gönderir. Ancak `msg.sender`, `withdraw()` çağrısı yapan bir akıllı sözleşme hesabı ise, `msg.sender.call.value()` kullanarak fon gönderildiğinde aynı zamanda o adreste depolanan kod da çalışacaktır.

Sözleşme adresinde dağıtılan kodun şu olduğunu hayal edin:

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

Bu sözleşme üç şey yapmak üzere tasarlanmıştır:

1. Başka bir hesaptan yatırma işlemini kabul etmek (muhtemelen saldırganın EOA'sı)
2. Victim sözleşmesine 1 ETH yatırmak
3. Akıllı sözleşmede depolanan 1 ETH'yi çekmek

Burada, gelen `msg.sender.call.value` tarafından bırakılan gaz miktarı 40.000'den fazla ise `Attacker`'ın `Victim`'deki `withdraw()` fonksiyonunu tekrar çağıran başka bir fonksiyonu olması hariç yanlış hiçbir şey yoktur. Bu, `Attacker`'a `Victim`'e yeniden girebilme ve ilk `withdraw` çağrısı tamamlanmadan _önce_ daha fazla fon çekebilme olanağı sağlar. Bu döngü şöyle görünür:

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

Özetle, çağıranın bakiyesi fonksiyonun yürütülmesi tamamlanana kadar 0'a ayarlanmadığı için sonraki çağrılar başarılı olacak ve çağıranın bakiyesini birden fazla kez çekmesine olanak tanıyacaktır. Bu tür saldırılar, [2016 DAO hack](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/) olayında olduğu gibi akıllı sözleşmenin fonlarını boşaltmak için kullanılabilir. Yeniden giriş saldırıları, [yeniden giriş suistimallerinin herkese açık listesi](https://github.com/pcaversaccio/reentrancy-attacks) içinde gösterildiği gibi bugün hala akıllı sözleşmeler için ciddi bir sorundur.

##### Yeniden giriş saldırılarını engelleme

Yeniden girişle başa çıkmak için izlenebilecek bir yaklaşım, [kontroller-etkiler-etkileşimler modelini](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) takip etmektir. Bu model, yürütmenin, yürütme işlemine devam etmeden önce gerekli kontrolleri gerçekleştiren kodla başladığı, ardından sözleşme durumunu manipüle eden kodla devam ettiği ve son olarak diğer sözleşmeler veya EOA'larla etkileşimde bulunan kodun geldiği bir şekilde düzenlenmesini sağlar.

Kontroller-etkiler-etkileşim modeli, aşağıda gösterilen `Victim` sözleşmesinin revize edilmiş bir sürümünde kullanılır:

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

Bu sözleşme, kullanıcının bakiyesi üzerinde bir _kontrol_ gerçekleştirir, `withdraw()` fonksiyonunun _etkilerini_ uygular (kullanıcının bakiyesini 0'a ayarlayarak) ve son olarak _etkileşimi_ gerçekleştirir (kullanıcının adresine ETH gönderir). Bu, sözleşmenin depolamasını harici çağrıdan önce güncellemesini sağlayarak ilk saldırıya yol açan yeniden giriş koşulunu ortadan kaldırır. `Attacker` sözleşmesini `NoLongerAVictim`'e çağırmak hala mümkün olsa da `balances[msg.sender]` 0 olarak ayarlandığı için ek çekimler hata verir.

Diğer bir seçenek ise bir fonksiyon çağrısı tamamlanana kadar sözleşmenin durumunun bir kısmını kilitleyen karşılıklı hariç tutma kilidi (genellikle "mutex" olarak tanımlanır) kullanmaktır. Bu, fonksiyon yürütülmeden önce `true` olarak ayarlanan ve çağrı tamamlandıktan sonra `false` şekline dönen bir Boole değişkeni kullanılarak uygulanır. Aşağıdaki örnekte görüldüğü gibi mutex kullanmak, bir fonksiyonu orijinal çağrı halen işleniyorken tekrarlı çağrılara karşı koruyarak yeniden girişi etkin biçimde durdurur.

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
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Ayrıca fonları hesaplara gönderen bir "itme ödemeleri" sistemi yerine, kullanıcıların akıllı sözleşmelerden fonlarını çekmesini gerektiren bir [çekme ödemeleri](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) sistemini de kullanabilirsiniz. Bu, bilinmeyen adreslerde yanlışlıkla kod tetikleme ihtimalini ortadan kaldırır (ve aynı zamanda belirli hizmet reddi saldırılarını önleyebilir).

#### Tamsayı yetersizlikleri ve taşmaları {#integer-underflows-and-overflows}

Tamsayı taşması, bir aritmetik işlemin sonucunun kabul edilebilir değer aralığının dışına düşerek tamsayıyı temsil edilebilir en düşük değere yuvarlamasına neden olduğu zaman gerçekleşir. Örneğin bir `uint8` yalnızca 2^8-1=255'e kadar değerleri saklayabilir. `255`'ten büyük değerleri sonuç veren aritmetik işlemler taşma yapar ve tıpkı bir otomobildeki kilometre sayacı azami kilometreye (999999) ulaşınca sıfırlandığı gibi `uint`'yi `0` olarak ayarlar.

Tamsayı yetersizlikleri de benzer sebeplerden dolayı gerçekleşir: bir aritmetik işlemin sonuçlarının kabul edilebilir aralığın altına düşmesi. Bir `uint8` içinde `0`'ı azaltmaya çalıştığınızı düşünelim; sonuç, basit olarak temsil edilebilir maksimum değere (`255`) yuvarlanacaktır.

Hem tamsayı taşmaları hem de tamsayı yetersizlikleri, bir sözleşmenin durum değişkenlerinde beklenmedik değişimlere yol açabilir ve planlanmamış yürütmeye sebep olabilir. Bir saldırganın geçersiz bir işlem gerçekleştirmek için akıllı sözleşmedeki aritmetik taşmayı nasıl istismar edebileceğinin bir örneğini aşağıda görebilirsiniz:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
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
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Tamsayı yetersizliklerini ve taşmalarını engelleme

Solidity derleyicisi, 0.8.0 versiyonu itibariyle tamsayı yetersizliklerini ve taşmalarını sonuç veren kodları reddetmektedir. Ancak daha düşük bir derleme versiyonu ile derlenen sözleşmeler ya aritmetik işlemleri içeren fonksiyonlarda kontroller gerçekleştirmeli ya da yetersizlik/taşma kontrolü yapan kütüphaneleri (örneğin, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) kullanmalıdır.

#### Kâhin manipülasyonu {#oracle-manipulation}

[Kâhinler](/developers/docs/oracles/), zincir dışından bilgi edinir ve bu bilgiyi akıllı sözleşmelerin kullanımı için zincir üstünde gönderir. Kâhinler sayesinde sermaye piyasaları gibi zincir dışında sistemlerle birlikte çalışan akıllı sözleşmeler tasarlayabilir ve bu sayede uygulama alanlarını önmeli ölçüde genişletebilirsiniz.

Ancak eğer kâhin yozlaşmışsa ve zincir üstünde yanlış bilgiler gönderiyorsa akıllı sözleşmeler, hatalara sebep olabilecek yanlış girdileri temel alarak yürütülür. Bu, bir blokzincir kâhininden gelen bilginin doğru, güncel olduğundan ve zamanında alındığından emin olma görevini ilgilendiren ''kâhin sorunu''nun temelidir.

Buna bağlı bir güvenlik endişesi de bir varlığın spot fiyatını almak için merkeziyetsiz borsa gibi zincir üstünde kâhin kullanımıdır. [Merkeziyetsiz finans (DeFi)](/defi/) sektörünün borç verme platformları, bunu genellikle bir kullanıcın ne kadar ödünç alabileceğine karar vermek için kullanıcının teminatının değerini belirlemek amacıyla yapar.

DEX (merkeziyetsiz borsa) fiyatları, büyük ölçüde piyasalarda pariteleri eski haline getiren arbitrajcılar sayesinde genellikle doğrudur. Ancak bu fiyatlar, özellikle zincir üstündeki kâhinin varlık fiyatlarını geçmişe dönük ticaret düzenine dayanarak hesapladığı durumlarda (ki genelde durum böyledir) manipülasyona açıktır.

Örneğin bir saldırgan, borç verme sözleşmenizle etkileşime geçmeden hemen önce hızlı kredi alıp varlığın spot fiyatını suni olarak yükseltebilir. Varlık fiyatı için DEX sorgulama, normalin üstünde bir değer döndürerek (saldırganın varlık talebini çarpıtan büyük ''satın alım emri'' sebebiyle) alması gerekenden daha fazlasını ödünç alabilmesine imkan tanır. Bu gibi ''hızlı kredi saldırıları'' DeFi (merkeziyetsiz finans) uygulamaları arasında fiyat kâhinlerinin güvenilirliğini baltalamak için kullanıldı ve protokollerde milyonlarca dolarlık fon kaybına neden oldu.

##### Kâhin manipülasyonunu engelleme

[Kâhin manipülasyonundan kaçınmanın](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) asgari şartı, tek hata noktalarından kaçınmak için çok sayıda kaynaktan bilgi sorgulayan bir merkeziyetsiz kâhin ağı kullanmaktır. Çoğu durumda merkeziyetsiz kâhinler, kâhin düğümlerini doğru bilgi aktarımı yapmaya teşvik etmek amacıyla onları merkezi kâhinlerden daha güvenli yapan yerleşik kripto-ekonomik teşviklere sahiptir.

Varlık fiyatları için bir zincir üstünde kâhin sorgulaması yapmayı planlıyorsanız zamana göre ağırlıklandırılmış ortalama fiyat (TWAP) mekanizmasını uygulayan bir tanesini kullanmayı göz önünde bulundurun. Bir [TWAP kâhini](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles), bir varlığın fiyatını iki farklı zaman noktasında sorgular (bunu değiştirebilirsiniz) ve elde edilen ortalamaya dayanarak spot fiyatı hesaplar. Daha uzun zaman dilimleri seçmek, yeni işlenmiş büyük emirler varlık fiyatını etkilemeyeceğinden protokolünüzü fiyat manipülasyonuna karşı korur.

## Geliştiriciler için akıllı sözleşme güvenlik kaynakları {#smart-contract-security-resources-for-developers}

### Akıllı sözleşmeleri analiz etmeye ve kod doğruluğunu teyit etmeye yönelik araçlar {#code-analysis-tools}

- **[Test araçları ve kütüphaneleri](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Akıllı sözleşmeler üzerinde birim testleri, statik analiz ve dinamik analiz gerçekleştirmeye yönelik sektörel standart niteliğinde araçlar ve kütüphaneler koleksiyonu._

- **[Resmi doğrulama araçları](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Akıllı sözleşmelerde işlevsel doğruluğu teyit etmeye ve değişmezleri kontrol etmeye yönelik araçlar._

- **[Akıllı sözleşme denetim hizmetleri](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Ethereum geliştirme projeleri için akıllı sözleşme denetim hizmetleri sağlayan organizasyonların listesi._

- **[Hata ödülü platformları](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Hata ödüllerini koordine etme ve akıllı sözleşmelerdeki kritik güvenlik açıklarının sorumluluk bilinci içinde bildirilmesini ödüllendirme platformları._

- **[Çatallanma Kontrolcüsü](https://forkchecker.hashex.org/)** - _Çatallanmış bir sözleşme ile ilgili mevcut tüm bilgileri kontrol etmeye yönelik ücretsiz bir çevrimiçi araç._

- **[ABI Şifreleyicisi](https://abi.hashex.org/)** - _Solidity sözleşme fonksiyonlarınızı ve yapıcı bağımsız değişkenlerinizi şifrelemeye yarayan ücretsiz bir çevrimiçi hizmet._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Şüpheli güvenlik açıklarını belirlemek ve sorunları kolayca tüketilebilen bir markdown formatında yazdırmak için Soyut Sözdizimi Ağaçlarını (AST) tarayan Solidity Statik Analizcisi._

### Akıllı sözleşmeleri izlemeye yarayan araçlar {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** - _Akıllı sözleşmelerinizdeki olayları, fonksiyonları ve işlem parametrelerini otomatik olarak izleyip yanıtlamaya yarayan bir araç._

- **[Tenderly Gerçek Zamanlı Uyarı](https://tenderly.co/alerting/)** - _Akıllı sözleşmelerinizde veya cüzdanlarınızda normal olmayan veya beklenmeyen olaylar gerçekleştiğinde gerçek zamanlı bildirimler almaya yarayan bir araç._

### Akıllı sözleşmelerin güvenli yönetimine yönelik araçlar {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** - _Erişim kontrolleri, yükseltmeler ve duraklatma dahil olmak üzere akıllı sözleşme yönetimine yönelik bir arayüz._

- **[Safe](https://safe.global/)** - _Ethereum üzerinde çalışan ve bir işlemi gerçekleştirmeden önce minimum sayıda kişinin onayının alınmasını gerektiren bir akıllı sözleşme cüzdanı (N'nin M'si)._

- **[OpenZeppelin Sözleşmeleri](https://docs.openzeppelin.com/contracts/4.x/)** - _Sözleşme sahipliği, yükseltmeler, erişim kontrolleri, yönetişim, duraklatabilirlik ve benzeri yönetimsel özellikleri uygulamaya yönelik sözleşme kütüphaneleri._

### Akıllı sözleşme denetim hizmetleri {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Blokzincir ekosistemindeki projelerin protokollerinin kullanıma hazır olmasını ve kullanıcıları korumak amacıyla oluşturulmasını sağlayan akıllı sözleşme denetim hizmeti._

- **[CertiK](https://www.certik.com/)** - _Son teknoloji ürünü resmi Doğrulama teknolojisinin akıllı sözleşmelerde ve blokzincir ağlarında kullanımına öncülük eden blokzincir güvenlik şirketi._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Riskleri azaltmak ve kodu güçlendirmek için güvenlik araştırmalarını saldırgan zihniyetiyle birleştiren siber güvenlik şirketi._

- **[PeckShield](https://peckshield.com/)** - _Blokzincir ekosisteminin tamamının güvenliği, gizliliği ve kullanılabilirliği için ürünler ve hizmetler sunan blokzincir güvenlik şirketi._

- **[QuantStamp](https://quantstamp.com/)** - _Güvenlik ve risk değerlendirme hizmetleri aracılığıyla blokzincir teknolojisinin genel olarak benimsenmesini kolaylaştıran denetim hizmeti._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Dağıtılmış sistemler için güvenlik denetimleri sunan akıllı sözleşme güvenlik şirketi._

- **[Runtime Verification](https://runtimeverification.com/)** - _Akıllı sözleşmelerin resmi modellenmesi ve doğrulanması üzerine uzmanlaşmış güvenlik şirketi._

- **[Hacken](https://hacken.io)** - _Blokzincir güvenliğine 360 derece yaklaşımını getiren Web3 siber güvenlik denetimcisi._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _Ethereum ve Starknet üzerinde akıllı sözleşmelerin bütünlüğünü ve kullanıcıların güvenliğini güvence altına alan Solidity ve Cairo denetim hizmetleri._

- **[HashEx](https://hashex.org/)** - _HashEx, kripto paraların güvenliğini güvence altına almak için blokzincir ve akıllı sözleşme denetimlerine odaklanırken akıllı sözleşme geliştirme, penetrasyon testi ve blokzincir danışmanlığı gibi hizmetler de sunar._

- **[Code4rena](https://code4rena.com/)** - _Akıllı sözleşme güvenlik uzmanlarına güvenlik açıklarını bulmaya ve web3'ü daha güvenli hale getirmeye yönelik teşvikler sunan rekabetçi denetim platformu._

- **[CodeHawks](https://codehawks.com/)** - _Güvenlik araştırmacılarına yönelik akıllı sözleşme denetimi yarışmalarına ev sahipliği yapan rekabetçi denetim platformu._

- **[Cyfrin](https://cyfrin.io)** - _Kripto güvenliğini ürünler ve akıllı sözleşme denetim hizmetleri aracılığıyla geliştiren Web3 güvenlik merkezi._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _Deneyimli denetçilerden oluşan bir ekip ve sınıfının en iyisi araçlar ile blokzincir sistemleri için güvenlik denetimleri sunan Web3 güvenlik şirketi._

- **[Oxorio](https://oxor.io/)** - _Kripto şirketleri ve DeFi projeleri için EVM, Solidity, ZK, Zincirler Arası teknolojilerinde uzmanlığa sahip akıllı sözleşme denetimleri ve blokzincir güvenlik hizmetleri._

- **[Inference](https://inference.ag/)** - _EVM tabanlı blokzincirler için akıllı sözleşme denetimi alanında uzmanlaşmış güvenlik denetim şirketi. Uzman denetçileri sayesinde potansiyel sorunları tespit eder ve ağa aktarım öncesi bunları düzeltmek için eyleme dönüştürülebilir çözümler önerirler._

### Hata ödülü platformları {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Akıllı sözleşmeler ve DeFi projeleri için güvenlik araştırmacılarının kodu inceledikleri, güvenlik açıklarını bildirdikleri, ödeme aldıkları ve kriptoyu daha güvenli hale getirdikleri hata ödülü platformu._

- **[HackerOne](https://www.hackerone.com/)** - _İşletmeler ile penetrasyon testi uzmanları ve siber güvenlik araştırmacılarını bir araya getiren güvenlik açığı koordinasyonu ve hata ödülü platformu._

- **[HackenProof](https://hackenproof.com/)** - _Kripto projeleri (DeFi, Akıllı Sözleşmeler, Cüzdanlar, CEX ve dahası) için güvenlik profesyonellerinin derecelendirme hizmetleri verdikleri ve araştırmacıların alakalı, doğrulanmış hata raporları için ödeme aldıkları uzman hata ödülü platformu._

-  **[Sherlock](https://www.sherlock.xyz/)** - _İlgili hataların adil bir şekilde ödenmesini sağlamak için akıllı sözleşmeler aracılığıyla yönetilen denetçiler için ödeme yapan, akıllı sözleşme güvenliğine yönelik Web3 sigortacısı._

-  **[CodeHawks](https://www.codehawks.com/)** - _Denetçilerin güvenlik yarışmalarına ve mücadelelerine ve (yakında) kendi özel denetimlerine katıldıkları, rekabetçi hata ödül platformu._

### Akıllı sözleşmelerle ilgili bilinen güvenlik açıklarına ve hatalarına ilişkin yayınlar {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Akıllı Sözleşmelere Yönelik Bilinen Saldırılar](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _Genellikle örnek kod da içeren, en önemli sözleşme açıklarına ilişkin yeni başlayanlara yönelik açıklamalar._

- **[SWC Kayıt Defteri](https://swcregistry.io/)** - _Ethereum akıllı sözleşmeleri için geçerli Yaygın Zayıflık Numaralandırması (CWE) maddelerinin birleştirilmiş bir listesi._

- **[Rekt](https://rekt.news/)** - _Detaylı otopsi raporları ile birlikte yüksek profilli kripto hackleri ve saldırılarına ilişkin düzenli şekilde güncellenen bir yayın._

### Akıllı sözleşme güvenliğini öğrenmeye yönelik güçlükler {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Blokzincir güvenlik savaş oyunlarını, meydan okumaları, [Bayrağı Kap](https://www.webopedia.com/definitions/ctf-event/amp/) yarışmalarını ve çözüm yazılarını içeren birleştirilmiş bir liste._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _DeFi akıllı sözleşmelerinin ofansif güvenliğini öğrenmeye ve hata avı ile güvenlik denetimi konusunda yetenek geliştirmeye yönelik bir savaş oyunu._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Her seviyenin "hacklenmesi" gereken bir akıllı sözleşme olduğu Web3/Solidity tabanlı bir savaş oyunu._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Fantastik bir maceranın içinde geçen akıllı sözleşme bilgisayar saldırısı yarışması. Yarışmanın başarıyla tamamlanması, özel bir hata bulma programına erişim olanağı da sağlar._

### Akıllı sözleşmeleri güvenli kılmaya yönelik en iyi uygulamalar {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Akıllı Sözleşme Güvenliği En İyi Uygulamaları](https://consensys.github.io/smart-contract-best-practices/)** - _Ethereum akıllı sözleşmelerini güvenli kılmaya yönelik kapsamlı bir yönergeler listesi._

- **[Nascent: Basit Güvenlik Araç Kutusu](https://github.com/nascentxyz/simple-security-toolkit)** - _Akıllı sözleşme geliştirmeye yönelik güvenlik odaklı pratik rehberler ve kontrol listeleri koleksiyonu._

- **[Solidity Desenleri](https://fravoll.github.io/solidity-patterns/)** - _Akıllı sözleşme programlama dili Solidity için güvenli desenlerin ve en iyi pratiklerin kullanışlı bir derlemesi._

- **[Solidity Belgeleri: Güvenlik Konusunda Dikkat Edilmesi Gerekenler](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Solidity ile güvenli akıllı sözleşmeler yazmaya yönelik yönergeler._

- **[Akıllı Sözleşme Güvenlik Doğrulama Standardı](https://github.com/securing/SCSVS)** - _Akıllı sözleşmelerin güvenliğini geliştiriciler, mimarlar, güvenlik eleştirmenleri ve satıcılar için standart hale getiren on dört parçalı bir kontrol listesi._

- **[Akıllı Sözleşme Güvenliğini ve Denetimini Öğrenme](https://updraft.cyfrin.io/courses/security)** - _En iyi güvenlik uygulamalarını geliştirmek ve güvenlik araştırmacısı olmak isteyen akıllı sözleşme geliştiricileri için oluşturulan, akıllı sözleşme güvenliği ve denetimi kursu._

### Akıllı sözleşme güvenliği üzerine öğreticiler {#tutorials-on-smart-contract-security}

- [Güvenli akıllı sözleşmeler nasıl yazılır](/developers/tutorials/secure-development-workflow/)

- [Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır?](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Akıllı sözleşme hataları bulmak için Manticore nasıl kullanılır](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Akıllı sözleşme güvenlik yönergeleri](/developers/tutorials/smart-contract-security-guidelines/)

- [Jeton sözleşmenizi isteğe bağlı jetonlarla nasıl güvenli şekilde entegre edersiniz](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Akıllı sözleşme güvenliği ve denetimi tam kursu](https://updraft.cyfrin.io/courses/security)
