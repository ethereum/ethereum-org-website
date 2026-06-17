---
title: "Sözleşme boyutu sınırıyla mücadele etmek için sözleşmeleri küçültmek"
description: "Akıllı sözleşmelerinizin çok fazla büyümesini önlemek için ne yapabilirsiniz?"
author: Markus Waas
lang: tr
tags: ["solidity", "akıllı sözleşmeler", "depolama"]
skill: intermediate
breadcrumb: "Sözleşmeleri küçültmek"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Neden bir sınır var? {#why-is-there-a-limit}

[22 Kasım 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)'da Spurious Dragon sert çatallanması, 24.576 kb'lık bir akıllı sözleşme boyutu sınırı ekleyen [EIP-170](https://eips.ethereum.org/EIPS/eip-170)'i tanıttı. Bir Solidity geliştiricisi olarak bu, sözleşmenize giderek daha fazla işlevsellik eklediğinizde bir noktada sınıra ulaşacağınız ve dağıtım yaparken şu hatayı göreceğiniz anlamına gelir:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Bu sınır, hizmet reddi (DOS) saldırılarını önlemek için getirildi. Bir sözleşmeye yapılan herhangi bir çağrı, gaz açısından nispeten ucuzdur. Ancak, Ethereum düğümleri için bir sözleşme çağrısının etkisi, çağrılan sözleşme kodunun boyutuna bağlı olarak orantısız bir şekilde artar (kodu diskten okumak, kodu ön işleme tabi tutmak, Merkle kanıtına veri eklemek). Saldırganın başkalarına çok fazla iş çıkarmak için az kaynağa ihtiyaç duyduğu böyle bir durum olduğunda, DOS saldırıları potansiyeli ortaya çıkar.

Başlangıçta bu daha az bir sorundu çünkü doğal bir sözleşme boyutu sınırı blok gaz limitiydi. Açıkçası, bir sözleşme, sözleşmenin tüm baytkodunu barındıran bir işlem içinde dağıtılmalıdır. Bir bloğa yalnızca o tek işlemi dahil ederseniz, tüm o gazı tüketebilirsiniz, ancak bu sonsuz değildir. [London Yükseltmesi](/ethereum-forks/#london)'nden bu yana, blok gaz limiti ağ talebine bağlı olarak 15M ile 30M birim arasında değişebilmektedir.

Aşağıda, potansiyel etkilerine göre sıralanmış bazı yöntemlere bakacağız. Bunu kilo verme açısından düşünün. Birinin hedef kilosuna (bizim durumumuzda 24kb) ulaşması için en iyi strateji, önce büyük etkili yöntemlere odaklanmaktır. Çoğu durumda sadece diyetinizi düzeltmek sizi oraya ulaştıracaktır, ancak bazen biraz daha fazlasına ihtiyacınız olur. O zaman biraz egzersiz (orta etki) veya hatta takviyeler (küçük etki) ekleyebilirsiniz.

## Büyük etki {#big-impact}

### Sözleşmelerinizi ayırın {#separate-your-contracts}

Bu her zaman ilk yaklaşımınız olmalıdır. Sözleşmeyi birden fazla daha küçük sözleşmeye nasıl ayırabilirsiniz? Bu genellikle sizi sözleşmeleriniz için iyi bir mimari bulmaya zorlar. Daha küçük sözleşmeler, kod okunabilirliği açısından her zaman tercih edilir. Sözleşmeleri bölmek için kendinize şunları sorun:

- Hangi işlevler birbiriyle bağlantılı? Her bir işlev seti en iyi kendi sözleşmesinde yer alabilir.
- Hangi işlevler sözleşme durumunu okumayı gerektirmez veya sadece durumun belirli bir alt kümesini gerektirir?
- Depolama ve işlevselliği ayırabilir misiniz?

### Kütüphaneler {#libraries}

İşlevsellik kodunu depolamadan uzaklaştırmanın basit bir yolu bir [kütüphane](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries) kullanmaktır. Kütüphane işlevlerini internal olarak bildirmeyin, çünkü bunlar derleme sırasında doğrudan [sözleşmeye eklenecektir](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking). Ancak public işlevler kullanırsanız, bunlar aslında ayrı bir kütüphane sözleşmesinde olacaktır. Kütüphanelerin kullanımını daha kolay hale getirmek için [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) kullanmayı düşünün.

### Proxy'ler {#proxies}

Daha gelişmiş bir strateji bir proxy sistemi olacaktır. Kütüphaneler arka planda, çağıran sözleşmenin durumuyla başka bir sözleşmenin işlevini basitçe yürüten `DELEGATECALL` kullanır. Proxy sistemleri hakkında daha fazla bilgi edinmek için [bu blog yazısına](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) göz atın. Size daha fazla işlevsellik sağlarlar, örneğin yükseltilebilirliği mümkün kılarlar, ancak aynı zamanda çok fazla karmaşıklık da eklerler. Herhangi bir nedenle tek seçeneğiniz olmadığı sürece, bunları yalnızca sözleşme boyutlarını küçültmek için eklemezdim.

## Orta etki {#medium-impact}

### İşlevleri kaldırın {#remove-functions}

Bu açık olmalıdır. İşlevler bir sözleşme boyutunu oldukça artırır.

- **Harici (External)**: Çoğu zaman kolaylık sağlaması için birçok view işlevi ekleriz. Boyut sınırına ulaşana kadar bu tamamen sorunsuzdur. Ancak sınıra ulaştığınızda, kesinlikle gerekli olanlar dışındakileri kaldırmayı gerçekten düşünmek isteyebilirsiniz.
- **Dahili (Internal)**: Ayrıca internal/private işlevleri kaldırabilir ve işlev yalnızca bir kez çağrıldığı sürece kodu doğrudan satır içine (inline) ekleyebilirsiniz.

### Ek değişkenlerden kaçının {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Bunun gibi basit bir değişiklik **0.28kb**'lık bir fark yaratır. Sözleşmelerinizde buna benzer birçok durum bulma ihtimaliniz yüksektir ve bunlar gerçekten önemli miktarlara ulaşabilir.

### Hata mesajını kısaltın {#shorten-error-message}

Uzun geri alma (revert) mesajları ve özellikle birçok farklı geri alma mesajı sözleşmeyi şişirebilir. Bunun yerine kısa hata kodları kullanın ve bunları sözleşmenizde çözümleyin. Uzun bir mesaj çok daha kısa hale gelebilir:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Hata mesajları yerine özel hatalar kullanın {#use-custom-errors-instead-of-error-messages}

Özel hatalar [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) ile tanıtılmıştır. Sözleşmelerinizin boyutunu küçültmek için harika bir yoldur, çünkü (tıpkı işlevler gibi) seçiciler olarak ABI kodlamasına tabi tutulurlar.

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Optimize edicide düşük bir çalıştırma değeri düşünün {#consider-a-low-run-value-in-the-optimizer}

Ayrıca optimize edici (optimizer) ayarlarını da değiştirebilirsiniz. Varsayılan değer olan 200, baytkodu sanki bir işlev 200 kez çağrılıyormuş gibi optimize etmeye çalıştığı anlamına gelir. Bunu 1 olarak değiştirirseniz, temel olarak optimize ediciye her işlevi yalnızca bir kez çalıştırma durumu için optimize etmesini söylersiniz. Yalnızca bir kez çalıştırılmak üzere optimize edilmiş bir işlev, dağıtımın kendisi için optimize edildiği anlamına gelir. **Bunun işlevleri çalıştırmak için [gaz maliyetlerini](/developers/docs/gas/) artırdığını** unutmayın, bu yüzden bunu yapmak istemeyebilirsiniz.

## Küçük etki {#small-impact}

### İşlevlere yapı (struct) geçirmekten kaçının {#avoid-passing-structs-to-functions}

[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2) kullanıyorsanız, bir işleve yapıları (structs) geçirmemek yardımcı olabilir. Parametreyi bir yapı olarak geçirmek yerine, gerekli parametreleri doğrudan geçirin. Bu örnekte **0.1kb** daha tasarruf ettik.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### İşlevler ve değişkenler için doğru görünürlüğü bildirin {#declare-correct-visibility-for-functions-and-variables}

- Yalnızca dışarıdan çağrılan işlevler veya değişkenler mi var? Bunları `public` yerine `external` olarak bildirin.
- Yalnızca sözleşme içinden çağrılan işlevler veya değişkenler mi var? Bunları `public` yerine `private` veya `internal` olarak bildirin.

### Değiştiricileri (modifiers) kaldırın {#remove-modifiers}

Değiştiriciler (modifiers), özellikle yoğun kullanıldığında, sözleşme boyutu üzerinde önemli bir etkiye sahip olabilir. Bunları kaldırmayı ve yerine işlevler kullanmayı düşünün.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Bu ipuçları, sözleşme boyutunu önemli ölçüde küçültmenize yardımcı olacaktır. Bir kez daha, ne kadar vurgulasam azdır, en büyük etki için mümkünse her zaman sözleşmeleri bölmeye odaklanın.