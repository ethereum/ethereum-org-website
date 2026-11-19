---
title: "Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır"
description: "Akıllı sözleşmeleri otomatik olarak test etmek için Echidna nasıl kullanılır"
author: "Trailofbits"
lang: tr
tags: ["Solidity", "akıllı sözleşmeler", "güvenlik", "test etme", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Kurulum {#installation}

Echidna; Docker, Homebrew aracılığıyla veya önceden derlenmiş ikili dosya (binary) kullanılarak kurulabilir. Bu eğitimdeki örnekler Echidna 2.3.3 ve solc 0.8.37 ile test edilmiştir.

### Docker aracılığıyla Echidna {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Son komut, Echidna imajını mevcut dizininize erişimi olan bir Docker içinde çalıştırır. Dosyaları ana makinenizden değiştirebilir ve araçları Docker içindeki dosyalar üzerinde çalıştırabilirsiniz. İmaj ayrıca [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) ve [solc-select](https://github.com/crytic/solc-select) ile birlikte gelir._

Docker içinde şunu çalıştırın:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### İkili Dosya (Binary) {#binary}

Platformunuz için en son sürümü [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) adresinden indirin. macOS veya Linux üzerinde, Slither ve crytic-compile'ı da beraberinde kuran `brew install echidna` komutunu da çalıştırabilirsiniz.

Sürüm ikili dosyasını kullanırken, [Slither](https://github.com/crytic/slither) ve [solc-select](https://github.com/crytic/solc-select)'i kendiniz kurun (örneğin bir Python sanal ortamında `pip3 install slither-analyzer solc-select`) ve bir derleyici sürümü seçin:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna, Slither olmadan da çalışır, ancak Slither `require` ifadelerinde kullanılan sihirli sayılar gibi sabitleri çıkarır ve aşağıdaki birkaç örnek hataları hızlı bir şekilde bulmak için buna güvenir.

## Özellik tabanlı fuzzing'e giriş {#introduction-to-property-based-fuzzing}

Echidna, önceki blog yazılarımızda ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) açıkladığımız özellik tabanlı bir fuzzer'dır.

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing), güvenlik topluluğunda iyi bilinen bir tekniktir. Programdaki hataları bulmak için az çok rastgele girdiler üretmekten oluşur. Geleneksel yazılımlar için fuzzer'ların ([AFL](http://lcamtuf.coredump.cx/afl/) veya [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) gibi) hataları bulmada verimli araçlar olduğu bilinmektedir.

Girdilerin tamamen rastgele üretilmesinin ötesinde, iyi girdiler üretmek için aşağıdakiler de dahil olmak üzere birçok teknik ve strateji vardır:

- Her yürütmeden geri bildirim almak ve bunu kullanarak üretimi yönlendirmek. Örneğin, yeni üretilen bir girdi yeni bir yolun keşfine yol açarsa, ona yakın yeni girdiler üretmek mantıklı olabilir.
- Girdiyi yapısal bir kısıtlamaya uyarak üretmek. Örneğin, girdiniz bir sağlama toplamı (checksum) içeren bir başlık içeriyorsa, fuzzer'ın sağlama toplamını doğrulayan girdi üretmesine izin vermek mantıklı olacaktır.
- Yeni girdiler üretmek için bilinen girdileri kullanmak: Geçerli girdilerden oluşan büyük bir veri kümesine erişiminiz varsa, fuzzer'ınız üretimine sıfırdan başlamak yerine bunlardan yeni girdiler üretebilir. Bunlara genellikle _tohum (seed)_ denir.

### Özellik tabanlı fuzzing {#property-based-fuzzing}

Echidna, belirli bir fuzzer ailesine aittir: [QuickCheck](https://wikipedia.org/wiki/QuickCheck)'ten büyük ölçüde ilham alan özellik tabanlı fuzzing. Çökmeleri bulmaya çalışacak klasik fuzzer'ların aksine, Echidna kullanıcı tanımlı değişmezleri (invariants) kırmaya çalışacaktır.

Akıllı sözleşmelerde değişmezler, sözleşmenin ulaşabileceği herhangi bir yanlış veya geçersiz durumu temsil edebilen Solidity işlevleridir, bunlara şunlar dahildir:

- Yanlış erişim kontrolü: Saldırgan sözleşmenin sahibi oldu.
- Yanlış durum makinesi: Sözleşme duraklatılmışken Token'lar transfer edilebilir.
- Yanlış aritmetik: Kullanıcı bakiyesini alt taşmaya (underflow) uğratabilir ve sınırsız ücretsiz Token alabilir.

### Echidna ile bir özelliği test etme {#testing-a-property-with-echidna}

Echidna ile bir akıllı sözleşmeyi nasıl test edeceğimizi göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Bu Token'ın aşağıdaki özelliklere sahip olması gerektiğini varsayacağız:

- Herkes en fazla 1000 Token'a sahip olabilir
- Token transfer edilemez (bir ERC-20 Token'ı değildir)

### Bir özellik yazın {#write-a-property}

Echidna özellikleri Solidity işlevleridir. Bir özellik şunları sağlamalıdır:

- Argümanı olmamalıdır
- Başarılı olursa `true` döndürmelidir
- Adı `echidna` ile başlamalıdır

Echidna şunları yapacaktır:

- Özelliği test etmek için otomatik olarak rastgele işlemler üretecektir.
- Bir özelliğin `false` döndürmesine veya bir hata fırlatmasına yol açan tüm işlemleri raporlayacaktır.
- Bir özelliği çağırırken yan etkileri göz ardı edecektir (yani, özellik bir durum değişkenini değiştirirse, testten sonra bu değişiklik atılır)

Aşağıdaki özellik, çağıranın 1000'den fazla Token'a sahip olmadığını kontrol eder:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Sözleşmenizi özelliklerinizden ayırmak için kalıtımı kullanın:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) özelliği uygular ve Token'dan miras alır.

### Bir sözleşme başlatın {#initiate-a-contract}

Echidna'nın argümansız bir [kurucu](/developers/docs/smart-contracts/anatomy/#constructor-functions) fonksiyona ihtiyacı vardır. Sözleşmenizin belirli bir başlatmaya ihtiyacı varsa, bunu kurucu içinde yapmanız gerekir.

Echidna'da bazı özel adresler vardır:

- Kurucuyu çağıran `0x30000`.
- Diğer işlevleri rastgele çağıran `0x10000`, `0x20000` ve `0x30000`.
- Test edilen sözleşmenin dağıtıldığı `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`.

Mevcut örneğimizde belirli bir başlatmaya ihtiyacımız yok, bu nedenle kurucumuz boştur.

### Echidna'yı Çalıştırın {#run-echidna}

Echidna şu şekilde başlatılır:

```sh
echidna contract.sol
```

Eğer contract.sol birden fazla sözleşme içeriyorsa, hedefi belirtebilirsiniz:

```sh
echidna contract.sol --contract MyContract
```

Bir terminalde çalıştırıldığında, Echidna etkileşimli bir kullanıcı arayüzü gösterir. Aşağıdaki örnekler gibi düz metin çıktısı almak için `--format text` ekleyin.

### Özet: Bir özelliği test etme {#summary-testing-a-property}

Aşağıdakiler, örneğimizde Echidna'nın çalışmasını özetlemektedir:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna, `backdoor` çağrılırsa özelliğin ihlal edildiğini buldu.

## Bir fuzzing kampanyası sırasında çağrılacak işlevleri filtreleme {#filtering-functions-to-call-during-a-fuzzing-campaign}

Fuzzing işlemine tabi tutulacak işlevlerin nasıl filtreleneceğini göreceğiz.
Hedef, aşağıdaki akıllı sözleşmedir:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Bu küçük örnek, Echidna'yı bir durum değişkenini değiştirmek için belirli bir işlem dizisi bulmaya zorlar.
Bu bir fuzzer için zordur.
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### İşlevleri filtreleme {#filtering-functions}

Echidna, bu sözleşmeyi test etmek için doğru diziyi bulmakta zorlanır çünkü iki sıfırlama işlevi (`reset1` ve `reset2`) tüm durum değişkenlerini `false` olarak ayarlayacaktır.
Ancak, sıfırlama işlevini kara listeye almak veya yalnızca `f`, `g`,
`h` ve `i` işlevlerini beyaz listeye almak için özel bir Echidna özelliği kullanabiliriz.

İşlevleri kara listeye almak için bu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

İşlevleri filtrelemek için başka bir yaklaşım da beyaz listeye alınmış işlevleri listelemektir. Bunu yapmak için bu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` varsayılan olarak `true` değerindedir.
- Filtreleme tam işlev adı üzerinde gerçekleştirilir: sözleşme adı, bir `.` ve Uygulama İkili Arayüzü (ABI) imzası (örneğin `C.f(uint256)`). Eğer `f()` ve `f(uint256)` işlevleriniz varsa, tam olarak hangisini filtreleyeceğinizi seçebilirsiniz. `"reset1"` gibi yalın bir ad hiçbir şeyle eşleşmez.

### Echidna'yı Çalıştırın {#run-echidna-1}

Echidna'yı bir `blacklist.yaml` yapılandırma dosyasıyla çalıştırmak için:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna, özelliği yanlışlayacak işlem dizisini neredeyse anında bulacaktır.

### Özet: İşlevleri filtreleme {#summary-filtering-functions}

Echidna, bir fuzzing kampanyası sırasında çağrılacak işlevleri aşağıdakileri kullanarak kara listeye veya beyaz listeye alabilir:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna, `filterBlacklist` boolean değerine göre `C.f1()`, `C.f2()` ve `C.f3()` işlevlerini kara listeye alarak veya yalnızca bunları çağırarak bir fuzzing kampanyası başlatır.

## Echidna ile Solidity'nin doğrulama (assert) işlevi nasıl test edilir {#how-to-test-soliditys-assert-with-echidna}

Bu kısa eğitimde, sözleşmelerdeki doğrulama (assertion) kontrollerini test etmek için Echidna'nın nasıl kullanılacağını göstereceğiz. Şunun gibi bir sözleşmemiz olduğunu varsayalım:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Solidity 0.8'den bu yana, aritmetik taşmalar (overflows) varsayılan olarak işlemi geri alır (revert). `unchecked` bloğu, `counter` değişkeninin taşabilmesi için sarmalama (wrapping) davranışını geri yükler; bu da Echidna'nın bulmasını istediğimiz hatadır.

### Bir doğrulama yazın {#write-an-assertion}

Farkını döndürdükten sonra `tmp` değerinin `counter` değerinden küçük veya ona eşit olduğundan emin olmak istiyoruz. Bir
Echidna özelliği yazabilirdik, ancak `tmp` değerini bir yerde saklamamız gerekecekti. Bunun yerine, şunun gibi bir doğrulama kullanabiliriz:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Echidna'yı Çalıştırın {#run-echidna-2}

Doğrulama hatası testini etkinleştirmek için komut satırında `--test-mode assertion` parametresini geçin veya bir [Echidna yapılandırma dosyası](https://secure-contracts.com/program-analysis/echidna/configuration.html) olan `config.yaml` oluşturun:

```yaml
testMode: assertion
```

Bu sözleşmeyi Echidna'da çalıştırdığımızda beklenen sonuçları elde ederiz:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Gördüğünüz gibi, Echidna `inc` işlevinde bazı doğrulama hataları bildiriyor. İşlev başına birden fazla doğrulama eklemek mümkündür, ancak Echidna hangi doğrulamanın başarısız olduğunu söyleyemez.

### Doğrulamalar ne zaman ve nasıl kullanılır {#when-and-how-use-assertions}

Doğrulamalar, özellikle kontrol edilecek koşullar bazı `f` işlemlerinin doğru kullanımıyla doğrudan ilişkiliyse, açık özelliklere alternatif olarak kullanılabilir. Bazı kodlardan sonra doğrulamalar eklemek, kontrolün kod yürütüldükten hemen sonra gerçekleşmesini zorunlu kılacaktır:

```solidity
function f(..) public {
    // bazı karmaşık kodlar
    ...
    assert (condition);
    ...
}

```

Aksine, açık bir Echidna özelliği kullanmak işlemleri rastgele yürütecektir ve tam olarak ne zaman kontrol edileceğini zorunlu kılmanın kolay bir yolu yoktur. Yine de şu geçici çözümü yapmak mümkündür:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Ancak, bazı sorunlar vardır:

- `f`, `internal` veya `external` olarak bildirilirse başarısız olur.
- `f` işlevini çağırmak için hangi argümanların kullanılması gerektiği belirsizdir.
- `f` işlemi geri alırsa (revert), özellik başarısız olur.

Genel olarak, doğrulamaların nasıl kullanılacağı konusunda [John Regehr'in tavsiyesine](https://blog.regehr.org/archives/1091) uymanızı öneririz:

- Doğrulama kontrolü sırasında herhangi bir yan etkiyi zorlamayın. Örneğin: `assert(ChangeStateAndReturn() == 1)`
- Açık ifadeleri doğrulamayın. Örneğin, `var` değişkeninin `uint` olarak bildirildiği `assert(var >= 0)` durumu.

Son olarak, lütfen `assert` yerine `require` **kullanmayın**, çünkü Echidna bunu tespit edemeyecektir (ancak sözleşme yine de işlemi geri alacaktır).

### Özet: Doğrulama Kontrolü {#summary-assertion-checking}

Aşağıdakiler, örneğimizde Echidna'nın çalışmasını özetlemektedir:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna, `inc` içindeki doğrulamanın, bu işlev büyük argümanlarla birden çok kez çağrılırsa başarısız olabileceğini buldu.

## Bir Echidna derlemini (corpus) toplama ve değiştirme {#collecting-and-modifying-an-echidna-corpus}

Echidna ile bir işlem derleminin (corpus) nasıl toplanacağını ve kullanılacağını göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Bu küçük örnek, Echidna'yı bir durum değişkenini değiştirmek için belirli değerler bulmaya zorlar. Bu bir fuzzer için zordur.
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Ancak, bu fuzzing kampanyasını yürütürken derlem toplamak için yine de Echidna'yı kullanabiliriz.

### Bir derlem toplama {#collecting-a-corpus}

Derlem toplamayı etkinleştirmek için bir derlem dizini oluşturun:

```sh
mkdir corpus-magic
```

Ve bir [Echidna yapılandırma dosyası](https://secure-contracts.com/program-analysis/echidna/configuration.html) olan `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Şimdi aracımızı çalıştırabilir ve toplanan derlemi kontrol edebiliriz:

```sh
echidna magic.sol --config config.yaml
```

Echidna hala doğru sihirli değerleri bulamıyor. Nerede takıldığını görmek için `corpus-magic/covered.*.txt` kapsam raporuna bakın:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` etiketi, Echidna'nın satıra ulaştığı ancak yürütmenin orada geri alındığı (revert) ve son `require` ifadesinden sonraki satırların hiçbir zaman yürütülmediği anlamına gelir.

Echidna'nın topladığı işlem dizileri `corpus-magic/coverage/` içinde JSON dosyaları olarak saklanır. Örneğin, bu dosyalardan birinin ilk işlemi şuydu:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Açıkçası, bu girdi özelliğimizdeki hatayı tetiklemeyecektir. Ancak bir sonraki adımda, bunu sağlamak için girdiyi nasıl değiştireceğimizi göreceğiz.

### Bir derlemi tohumlama (seeding) {#seeding-a-corpus}

Echidna'nın `magic` işleviyle başa çıkabilmesi için biraz yardıma ihtiyacı var. Girdiyi kopyalayacak ve bunun için uygun
parametreleri kullanacak şekilde değiştireceğiz (dosya adları rastgeledir, bu nedenle kendi `corpus-magic/coverage/` dizininizden birini kullanın):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

`new.txt` dosyasını, `magic(42,129,333,0)` işlevini çağıran tek bir işlem içerecek şekilde değiştireceğiz. Şimdi Echidna'yı yeniden çalıştırabiliriz:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Bu kez, özelliğin anında ihlal edildiğini buldu.

## Yüksek gaz tüketimi olan işlemleri bulma {#finding-transactions-with-high-gas-consumption}

Echidna ile yüksek gaz tüketimi olan işlemleri nasıl bulacağımızı göreceğiz. Echidna'nın eski sürümlerinde bunun için bir `estimateGas` seçeneği vardı; bu seçenek Echidna 2.3.0'da kaldırıldı. Bunun yerine, gazı `gasleft()` ile ölçüyoruz ve Echidna'nın [optimizasyon modunun](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) bunu maksimize etmesine izin veriyoruz. Hedef, aşağıdaki akıllı sözleşmedir:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Burada `expensive` büyük bir gaz tüketimine sahip olabilir.

### Gaz Tüketimini Ölçme {#measuring-gas-consumption}

Optimizasyon modunda Echidna, `echidna_` ile başlayan, argüman almayan ve bir `int256` döndüren işlevleri arar ve döndürülen değeri maksimize eden işlem dizisini bulmaya çalışır. `f` işlevini çağıran, kullandığı gazı kaydeden ve maksimum değeri ortaya çıkaran bir test sözleşmesi ekliyoruz (her iki sözleşmeyi de `gas.sol` içine kaydedin):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Optimizasyon modunu etkinleştirmek için bir `config.yaml` yapılandırma dosyası oluşturun. Bu örnekte, sonuçların anlaşılmasını kolaylaştırmak için işlem dizisinin boyutunu da küçülteceğiz:

```yaml
testMode: optimization
seqLen: 2
```

### Echidna'yı Çalıştırın {#run-echidna-3}

Yapılandırma dosyasını oluşturduktan sonra Echidna'yı şu şekilde çalıştırabiliriz:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Gösterilen gaz, Echidna'nın üzerinde çalıştığı Ethereum Sanal Makinesi (EVM) uygulaması olan [hevm](https://github.com/argotorg/hevm) tarafından ölçülür ve `measureF` içinden yapılan dahili çağrının ek yükünü içerir.
- Maksimum değer benzersiz değildir: Her kampanya rastgeledir ve daha uzun kampanyalar (örneğin `--test-limit 200000`) daha büyük değerler bulma eğilimindedir.

### Gaz Azaltan Çağrıları Filtreleme {#filtering-out-gas-reducing-calls}

Yukarıdaki **bir fuzzing kampanyası sırasında çağrılacak işlevleri filtreleme** eğitimi, bazı işlevlerin testinizden nasıl
kaldırılacağını gösterir.  
Bu, doğru bir gaz tahmini elde etmek için kritik olabilir.
Aşağıdaki örneği göz önünde bulundurun:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check`, `check` işlevini çağırır ve gaz maliyetini döndürür. Her Echidna test işlevi gibi, durum değişiklikleri daha sonra atılır.

Eğer Echidna tüm işlevleri çağırabilirse, yüksek gaz maliyetine sahip işlemleri kolayca bulamayacaktır:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Bunun nedeni, maliyetin `addrs` boyutuna bağlı olması ve rastgele çağrıların diziyi neredeyse boş bırakma eğiliminde olmasıdır.
Ancak `pop` ve `clear` işlevlerini kara listeye almak bize çok daha iyi sonuçlar verir:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Bu sonuç için çağrı dizisini küçültmek birkaç dakika sürer, çünkü her tekrar oynatma (replay) pahalı `check` işlevini çağırır.

### Özet: Yüksek gaz tüketimi olan işlemleri bulma {#summary-finding-transactions-with-high-gas-consumption}

Echidna, bir `int256` döndüren bir `echidna_` işlevinde `gasleft()` ile gazı ölçerek ve optimizasyon modunda çalışarak yüksek gaz tüketimi olan işlemleri bulabilir:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna, fuzzing kampanyası bittiğinde bulunan maksimum değeri ve onu üreten işlem dizisini raporlayacaktır.
