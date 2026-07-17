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

Echidna, Docker aracılığıyla veya önceden derlenmiş ikili dosya (binary) kullanılarak kurulabilir.

### Docker aracılığıyla Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Son komut, eth-security-toolbox'ı mevcut dizininize erişimi olan bir Docker içinde çalıştırır. Dosyaları ana makinenizden değiştirebilir ve araçları Docker'daki dosyalar üzerinde çalıştırabilirsiniz_

Docker içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/training
```

### İkili Dosya (Binary) {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Özellik tabanlı fuzzing'e giriş {#introduction-to-property-based-fuzzing}

Echidna, önceki blog yazılarımızda ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) açıkladığımız özellik tabanlı bir fuzzer'dır.

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing), güvenlik topluluğunda iyi bilinen bir tekniktir. Programdaki hataları bulmak için az çok rastgele girdiler üretmekten oluşur. Geleneksel yazılımlar için fuzzer'ların ([AFL](http://lcamtuf.coredump.cx/afl/) veya [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) gibi) hataları bulmada etkili araçlar olduğu bilinmektedir.

Girdilerin tamamen rastgele üretilmesinin ötesinde, iyi girdiler üretmek için aşağıdakiler de dahil olmak üzere birçok teknik ve strateji vardır:

- Her yürütmeden geri bildirim almak ve bunu kullanarak üretimi yönlendirmek. Örneğin, yeni üretilen bir girdi yeni bir yolun keşfine yol açarsa, ona yakın yeni girdiler üretmek mantıklı olabilir.
- Girdiyi yapısal bir kısıtlamaya uyarak üretmek. Örneğin, girdiniz bir sağlama toplamı (checksum) içeren bir başlık içeriyorsa, fuzzer'ın sağlama toplamını doğrulayan girdi üretmesine izin vermek mantıklı olacaktır.
- Yeni girdiler üretmek için bilinen girdileri kullanmak: Geçerli girdilerden oluşan büyük bir veri kümesine erişiminiz varsa, fuzzer'ınız üretimine sıfırdan başlamak yerine bunlardan yeni girdiler üretebilir. Bunlara genellikle _tohum (seed)_ denir.

### Özellik tabanlı fuzzing {#property-based-fuzzing}

Echidna, belirli bir fuzzer ailesine aittir: [QuickCheck](https://wikipedia.org/wiki/QuickCheck)'ten büyük ölçüde ilham alan özellik tabanlı fuzzing. Çökmeleri bulmaya çalışacak klasik fuzzer'ların aksine Echidna, kullanıcı tanımlı değişmezleri (invariants) kırmaya çalışacaktır.

Akıllı sözleşmelerde değişmezler, sözleşmenin ulaşabileceği herhangi bir yanlış veya geçersiz durumu temsil edebilen Solidity işlevleridir, bunlara şunlar dahildir:

- Yanlış erişim kontrolü: Saldırgan sözleşmenin sahibi oldu.
- Yanlış durum makinesi: Sözleşme duraklatılmışken Token'lar transfer edilebilir.
- Yanlış aritmetik: Kullanıcı bakiyesini sıfırın altına düşürebilir (underflow) ve sınırsız ücretsiz Token alabilir.

### Echidna ile bir özelliği test etme {#testing-a-property-with-echidna}

Echidna ile bir akıllı sözleşmenin nasıl test edileceğini göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
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

- Özelliği test etmek için otomatik olarak rastgele işlemler üretir.
- Bir özelliğin `false` döndürmesine veya bir hata fırlatmasına yol açan tüm işlemleri raporlar.
- Bir özelliği çağırırken yan etkileri göz ardı eder (yani, özellik bir durum değişkenini değiştirirse, testten sonra bu değişiklik geri alınır)

Aşağıdaki özellik, çağıranın 1000'den fazla Token'a sahip olmadığını kontrol eder:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Sözleşmenizi özelliklerinizden ayırmak için kalıtımı kullanın:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) özelliği uygular ve Token'dan miras alır.

### Bir sözleşme başlatın {#initiate-a-contract}

Echidna'nın argümansız bir [kurucu](/developers/docs/smart-contracts/anatomy/#constructor-functions) fonksiyona ihtiyacı vardır. Sözleşmenizin belirli bir başlatmaya ihtiyacı varsa, bunu kurucu içinde yapmanız gerekir.

Echidna'da bazı özel adresler vardır:

- Kurucuyu çağıran `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`.
- Diğer işlevleri rastgele çağıran `0x10000`, `0x20000` ve `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`.

Mevcut örneğimizde belirli bir başlatmaya ihtiyacımız yok, bu nedenle kurucumuz boştur.

### Echidna'yı Çalıştırın {#run-echidna}

Echidna şu şekilde başlatılır:

```bash
echidna-test contract.sol
```

Eğer contract.sol birden fazla sözleşme içeriyorsa, hedefi belirtebilirsiniz:

```bash
echidna-test contract.sol --contract MyContract
```

### Özet: Bir özelliği test etme {#summary-testing-a-property}

Aşağıdakiler, örneğimizde Echidna'nın çalışmasını özetlemektedir:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna, `backdoor` çağrılırsa özelliğin ihlal edildiğini buldu.

## Bir fuzzing kampanyası sırasında çağrılacak işlevleri filtreleme {#filtering-functions-to-call-during-a-fuzzing-campaign}

Fuzzing işlemine tabi tutulacak işlevlerin nasıl filtreleneceğini göreceğiz.
Hedef, aşağıdaki akıllı sözleşmedir:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Bu küçük örnek, Echidna'yı bir durum değişkenini değiştirmek için belirli bir işlem dizisi bulmaya zorlar.
Bu bir fuzzer için zordur ([Manticore](https://github.com/trailofbits/manticore) gibi sembolik bir yürütme aracı kullanılması önerilir).
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### İşlevleri filtreleme {#filtering-functions}

Echidna, bu sözleşmeyi test etmek için doğru diziyi bulmakta zorlanıyor çünkü iki sıfırlama işlevi (`reset1` ve `reset2`) tüm durum değişkenlerini `false` olarak ayarlayacaktır.
Ancak, sıfırlama işlevini kara listeye almak veya yalnızca `f`, `g`,
`h` ve `i` işlevlerini beyaz listeye almak için özel bir Echidna özelliği kullanabiliriz.

İşlevleri kara listeye almak için bu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

İşlevleri filtrelemek için başka bir yaklaşım da beyaz listeye alınmış işlevleri listelemektir. Bunu yapmak için bu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` varsayılan olarak `true` değerindedir.
- Filtreleme yalnızca isme göre (parametreler olmadan) gerçekleştirilecektir. Eğer `f()` ve `f(uint256)` işlevleriniz varsa, `"f"` filtresi her iki işlevle de eşleşecektir.

### Echidna'yı Çalıştırın {#run-echidna-1}

Echidna'yı bir `blacklist.yaml` yapılandırma dosyasıyla çalıştırmak için:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna, özelliği yanlışlayacak işlem dizisini neredeyse anında bulacaktır.

### Özet: İşlevleri filtreleme {#summary-filtering-functions}

Echidna, bir fuzzing kampanyası sırasında çağrılacak işlevleri şunları kullanarak kara listeye veya beyaz listeye alabilir:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna, `filterBlacklist` boolean değerine göre `f1`, `f2` ve `f3` işlevlerini kara listeye alarak veya yalnızca bunları çağırarak bir fuzzing kampanyası başlatır.

## Echidna ile Solidity'nin doğrulama (assert) işlevi nasıl test edilir {#how-to-test-soliditys-assert-with-echidna}

Bu kısa eğitimde, sözleşmelerdeki doğrulama (assertion) kontrollerini test etmek için Echidna'nın nasıl kullanılacağını göstereceğiz. Şunun gibi bir sözleşmemiz olduğunu varsayalım:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Bir doğrulama yazın {#write-an-assertion}

Farkını döndürdükten sonra `tmp` değerinin `counter` değerinden küçük veya ona eşit olduğundan emin olmak istiyoruz. Bir Echidna özelliği yazabilirdik, ancak `tmp` değerini bir yerde saklamamız gerekecekti. Bunun yerine, şunun gibi bir doğrulama kullanabiliriz:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Echidna'yı Çalıştırın {#run-echidna-2}

Doğrulama hatası testini etkinleştirmek için bir [Echidna yapılandırma dosyası](https://github.com/crytic/echidna/wiki/Config) olan `config.yaml` oluşturun:

```yaml
checkAsserts: true
```

Bu sözleşmeyi Echidna'da çalıştırdığımızda beklenen sonuçları elde ederiz:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Gördüğünüz gibi Echidna, `inc` işlevinde bazı doğrulama hataları bildiriyor. İşlev başına birden fazla doğrulama eklemek mümkündür, ancak Echidna hangi doğrulamanın başarısız olduğunu söyleyemez.

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

Ancak bazı sorunlar vardır:

- `f`, `internal` veya `external` olarak bildirilirse başarısız olur.
- `f` işlevini çağırmak için hangi argümanların kullanılması gerektiği belirsizdir.
- `f` geri alınırsa (revert), özellik başarısız olur.

Genel olarak, doğrulamaların nasıl kullanılacağı konusunda [John Regehr'in tavsiyesine](https://blog.regehr.org/archives/1091) uymanızı öneririz:

- Doğrulama kontrolü sırasında herhangi bir yan etkiyi zorlamayın. Örneğin: `assert(ChangeStateAndReturn() == 1)`
- Bariz ifadeleri doğrulamayın. Örneğin, `var` değişkeninin `uint` olarak bildirildiği `assert(var >= 0)` durumu.

Son olarak, lütfen `assert` yerine `require` **kullanmayın**, çünkü Echidna bunu tespit edemeyecektir (ancak sözleşme yine de geri alınacaktır).

### Özet: Doğrulama Kontrolü {#summary-assertion-checking}

Aşağıdakiler, örneğimizde Echidna'nın çalışmasını özetlemektedir:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna, bu işlev büyük argümanlarla birden çok kez çağrılırsa `inc` içindeki doğrulamanın başarısız olabileceğini buldu.

## Bir Echidna derlemini (corpus) toplama ve değiştirme {#collecting-and-modifying-an-echidna-corpus}

Echidna ile bir işlem derleminin (corpus) nasıl toplanacağını ve kullanılacağını göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Bu küçük örnek, Echidna'yı bir durum değişkenini değiştirmek için belirli değerler bulmaya zorlar. Bu bir fuzzer için zordur ([Manticore](https://github.com/trailofbits/manticore) gibi sembolik bir yürütme aracı kullanılması önerilir).
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Ancak, bu fuzzing kampanyasını yürütürken derlem toplamak için yine de Echidna'yı kullanabiliriz.

### Bir derlem toplama {#collecting-a-corpus}

Derlem toplamayı etkinleştirmek için bir derlem dizini oluşturun:

```bash
mkdir corpus-magic
```

Ve bir [Echidna yapılandırma dosyası](https://github.com/crytic/echidna/wiki/Config) olan `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Şimdi aracımızı çalıştırabilir ve toplanan derlemi kontrol edebiliriz:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna hala doğru sihirli değerleri bulamıyor, ancak topladığı derleme göz atabiliriz.
Örneğin, bu dosyalardan biri şuydu:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Açıkçası, bu girdi özelliğimizdeki hatayı tetiklemeyecektir. Ancak bir sonraki adımda, bunu tetiklemek için nasıl değiştireceğimizi göreceğiz.

### Bir derlemi tohumlama (seeding) {#seeding-a-corpus}

Echidna'nın `magic` işleviyle başa çıkabilmesi için biraz yardıma ihtiyacı var. Bunun için uygun parametreleri kullanmak üzere girdiyi kopyalayıp değiştireceğiz:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)` işlevini çağırmak için `new.txt` dosyasını değiştireceğiz. Şimdi Echidna'yı yeniden çalıştırabiliriz:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Bu kez, özelliğin anında ihlal edildiğini buldu.

## Yüksek Gaz tüketimi olan işlemleri bulma {#finding-transactions-with-high-gas-consumption}

Echidna ile yüksek Gaz tüketimi olan işlemlerin nasıl bulunacağını göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Burada `expensive` büyük bir Gaz tüketimine sahip olabilir.

Şu anda Echidna'nın test etmek için her zaman bir özelliğe ihtiyacı vardır: burada `echidna_test` her zaman `true` döndürür.
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Gaz Tüketimini Ölçme {#measuring-gas-consumption}

Echidna ile Gaz tüketimini etkinleştirmek için bir `config.yaml` yapılandırma dosyası oluşturun:

```yaml
estimateGas: true
```

Bu örnekte, sonuçların anlaşılmasını kolaylaştırmak için işlem dizisinin boyutunu da küçülteceğiz:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna'yı Çalıştırın {#run-echidna-3}

Yapılandırma dosyasını oluşturduktan sonra Echidna'yı şu şekilde çalıştırabiliriz:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Gösterilen Gaz, [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) tarafından sağlanan bir tahmindir.

### Gaz Azaltan Çağrıları Filtreleme {#filtering-out-gas-reducing-calls}

Yukarıdaki **bir fuzzing kampanyası sırasında çağrılacak işlevleri filtreleme** eğitimi, bazı işlevlerin testinizden nasıl çıkarılacağını gösterir.  
Bu, doğru bir Gaz tahmini elde etmek için kritik olabilir.
Aşağıdaki örneği göz önünde bulundurun:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Eğer Echidna tüm işlevleri çağırabilirse, yüksek Gaz maliyeti olan işlemleri kolayca bulamayacaktır:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Bunun nedeni, maliyetin `addrs` boyutuna bağlı olması ve rastgele çağrıların diziyi neredeyse boş bırakma eğiliminde olmasıdır.
Ancak `pop` ve `clear` işlevlerini kara listeye almak bize çok daha iyi sonuçlar verir:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Özet: Yüksek Gaz tüketimi olan işlemleri bulma {#summary-finding-transactions-with-high-gas-consumption}

Echidna, `estimateGas` yapılandırma seçeneğini kullanarak yüksek Gaz tüketimi olan işlemleri bulabilir:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna, fuzzing kampanyası bittiğinde her işlev için maksimum Gaz tüketimine sahip bir dizi raporlayacaktır.