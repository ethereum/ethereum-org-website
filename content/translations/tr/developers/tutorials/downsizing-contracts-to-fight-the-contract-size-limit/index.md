---
title: "Sözleşme boyutu sınırıyla mücadele etmek için sözleşmelerin küçültülmesi"
description: Akıllı sözleşmelerinizin çok fazla büyümesini önlemek için ne yapabilirsiniz?
author: Markus Waas
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "depolama"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Neden bir sınır var? {#why-is-there-a-limit}

[22 Kasım 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)'da Spurious Dragon sert çatalı 24,576 kb akıllı sözleşme boyutu sınırı ekleyen [EIP-170](https://eips.ethereum.org/EIPS/eip-170)'i tanıttı. Bir Solidity geliştiricisi olarak sizin için bu, sözleşmenize giderek daha fazla işlevsellik eklediğinizde, bir noktada sınıra ulaşacağınız ve dağıtım sırasında şu hatayı göreceğiniz anlamına gelir:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). Bu sözleşme Mainnet'te dağıtılamayabilir. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Bu sınır, hizmet reddi (DOS) saldırılarını önlemek için getirildi. Bir sözleşmeye yapılan herhangi bir çağrı, gaz açısından nispeten ucuzdur. Bununla birlikte, Ethereum düğümleri için bir sözleşme çağrısının etkisi, çağrılan sözleşme kodunun boyutuna bağlı olarak orantısız bir şekilde artar (kodu diskten okumak, kodu önceden işlemek, Merkle kanıtına veri eklemek). Saldırganın başkaları için çok iş yapmak için az kaynağa ihtiyaç duyduğu böyle bir durumunuz olduğunda, DOS saldırıları potansiyeli elde edersiniz.

Bir doğal sözleşme boyutu limiti, blok gaz limiti olduğu için başlangıçta bu çok da büyük bir problem değildi. Açıkça görülüyor ki bir sözleşmenin, sözleşmenin tüm bit kodunu tutan bir işlem içinde dağıtılması gerekir. Bir bloğa yalnızca bir işlemi dahil ederseniz bu gazın tamamını kullanabilirsiniz, ancak bu sonsuz değildir. [Londra Yükseltmesi](/history/#london)'nden bu yana blok gaz limiti, ağ talebine bağlı olarak 15 milyon ile 30 milyon birim arasında değişti.

Aşağıda, potansiyel etkilerine göre sıralanan bazı yöntemlere bakacağız. Bunu, kilo verme gibi düşünün. Birinin hedef kilosuna (bizim durumumuzda 24 kb) ulaşması için en iyi strateji, önce büyük etkiye sahip yöntemlere odaklanmaktır. Çoğu zaman sadece diyeti düzeltmek amaca ulaştırır ancak bazen biraz daha fazlası gerekir. Sonra biraz egzersiz (orta etki) veya hatta takviye besinler (küçük etki) ekleyebilirsiniz.

## Büyük etki {#big-impact}

### Sözleşmelerinizi ayırın {#separate-your-contracts}

Bu her zaman ilk yaklaşımınız olmalıdır. Sözleşmeyi birden çok küçük sözleşmeye nasıl ayırabilirsiniz? Genellikle sizi sözleşmeleriniz için iyi bir mimari bulmaya zorlar. Daha küçük sözleşmeler her zaman kod okunabilirliği açısından tercih edilir. Sözleşmeleri bölmek için kendinize şunları sorun:

- Hangi fonksiyonlar birlikte olmalıdır? Her fonksiyon seti, en çok kendi sözleşmesine uyacaktır.
- Hangi fonksiyonlar, sözleşme durumunun okunmasını veya yalnızca durumun belirli bir alt kümesini gerektirmez?
- Depolamayı ve işlevselliği bölebilir misiniz?

### Kütüphaneler {#libraries}

Fonksiyon kodunu depolama alanından uzaklaştırmanın basit bir yolu, bir [kütüphane](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries) kullanmaktır. Kütüphane fonksiyonları derleme esnasında doğrudan [sözleşmeye ekleneceği](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) için onları dahili olarak duyurmayın. Ancak genel fonksiyonları kullanırsanız, bunlar aslında ayrı bir kütüphane sözleşmesinde olacaktır. Kütüphanelerin kullanımını daha uygun hâle getirmek için [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)'u göz önüne alın.

### Proxy'ler {#proxies}

Proxy sistemi, daha gelişmiş bir stratejidir. Kütüphaneler arka planda, çağıran sözleşmenin durumuyla başka bir sözleşmenin fonksiyonunu yürüten `DELEGATECALL` kullanır. Proxy'ler hakkında dahasını öğrenmek için [bu blog gönderisine](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) bakın. Yükseltilebilirliği sağlamak gibi daha fazla işlevsellik sağlarlar ancak aynı zamanda çok fazla karmaşıklık da eklerler. Herhangi bir nedenle tek seçeneğiniz olmadıkça, bunları yalnızca sözleşme boyutlarını azaltmak için eklenmesini tavsiye etmem.

## Orta etki {#medium-impact}

### Fonksiyonları kaldırın {#remove-functions}

Bu bariz bir yöntem. Fonksiyonlar, sözleşme boyutunu biraz artırır.

- **Harici**: Çoğu zaman kolaylık sağlamak için çok sayıda görüntüleme fonksiyonu ekleriz. Boyut sınırına ulaşana kadar bu gayet iyi bir yöntemdir. O zaman kesinlikle gerekli olanlar hariç hepsini kaldırmayı gerçekten düşünmek isteyebilirsiniz.
- **Dahili**: Ayrıca dahili/özel fonksiyonları kaldırabilir ve fonksiyon yalnızca bir kez çağrıldığı sürece kodu satır içine alabilirsiniz.

### Ek değişkenlerden kaçının {#avoid-additional-variables}

Bunun gibi küçük bir değişim:

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

**0,28kb**'lık bir fark yaratır. Muhtemelen sözleşmelerinizde birçok benzer durum vardır ve bunlar gerçekten önemli miktarlara ulaşabilir.

### Hata mesajını kısaltın {#shorten-error-message}

Uzun geri dönüş mesajları ve özellikle birçok farklı geri dönüş mesajı, sözleşmeyi şişirebilir. Bunun yerine kısa hata kodları kullanın ve bunları sözleşmenizde çözün. Uzun bir mesaj çok daha kısa olabilir:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Hata mesajları yerine özel hatalar kullanın

Özel hatalar [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)'te tanıtılmıştır. Bu hatalar, sözleşmelerinizin boyutunu azaltmanın harika bir yoludur, çünkü seçiciler olarak ABI kodludur (tıpkı işlevler gibi).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Optimize edicide düşük bir çalıştırma değerini göz önünde bulundurun {#consider-a-low-run-value-in-the-optimizer}

Optimize edici ayarlarını da değiştirebilirsiniz. 200 varsayılan değeri, bit kodunu bir fonksiyon 200 kez çağrılmış gibi optimize etmeye çalıştığı anlamına gelir. 1 olarak değiştirirseniz, temel olarak optimize ediciye her fonksiyonu yalnızca bir kez çalıştırma durumu için optimize etmesini söylersiniz. Yalnızca bir kez çalışmak için optimize edilmiş bir fonksiyon, dağıtımın kendisi için optimize edildiği anlamına gelir. Bunun, **işlevleri çalıştırmak için gereken [gaz maliyetlerini](/developers/docs/gas/) artırdığını unutmayın**, yani bunu yapmamak daha iyi olabilir.

## Küçük etki {#small-impact}

### Fonksiyonlara yapılar aktarmaktan kaçının {#avoid-passing-structs-to-functions}

Eğer [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2) kullanıyorsanız bu, fonksiyonlara yapı aktarmamanıza yardımcı olabilir. Parametreyi bir yapı olarak aktarmaktansa...

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

...gerekli parametreleri doğrudan aktarın. Bu örnekte **0,1 kb** daha kazandık.

### Fonksiyonlar ve değişkenler için doğru görünürlük duyurun {#declare-correct-visibility-for-functions-and-variables}

- Yalnızca dışarıdan çağrılan fonksiyonlar veya değişkenler ne olacak? Onları `public` yerine `external` olarak duyurun.
- Yalnızca sözleşmenin içinden çağrılan fonksiyonlar veya değişkenler ne olacak? Onları `public` yerine `private` veya `external` olarak duyurun.

### Niteleyicileri kaldırın {#remove-modifiers}

Niteleyiciler, özellikle yoğun olarak kullanıldığında sözleşme boyutu üzerinde önemli bir etkiye sahip olabilir. Onları kaldırmayı ve yerine fonksiyon kullanmayı göz önünde bulundurun.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Bu ipuçları, sözleşme boyutunu önemli ölçüde azaltmanıza yardımcı olacaktır. Bir kez daha, en büyük etki için mümkünse her zaman sözleşmeleri bölmeye odaklanmanızı söylemem gerekiyor.
