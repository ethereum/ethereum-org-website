---
title: "Akıllı sözleşmeleri test etmek için Echidna nasıl kullanılır"
description: "Akıllı sözleşmeleri otomatik olarak test etmek için Echidna nasıl kullanılır"
author: "Trailofbits"
lang: tr
tags:
  [
    "solidity",
    "akıllı kontratlar",
    "güvenlik",
    "test etmek",
    "bulandırma"
  ]
skill: advanced
breadcrumb: "Echidna"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Kurulum {#installation}

Echidna, docker aracılığıyla veya önceden derlenmiş ikili dosya kullanılarak kurulabilir.

### Docker aracılığıyla Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Son komut, geçerli dizininize erişimi olan bir docker'da eth-security-toolbox'ı çalıştırır. Dosyaları ana makinenizden değiştirebilir ve docker'dan dosyalar üzerindeki araçları çalıştırabilirsiniz_

Docker'ın içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/training
```

### İkili dosya {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Özellik tabanlı bulandırmaya giriş {#introduction-to-property-based-fuzzing}

Echidna, önceki blog yazılarımızda ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) açıkladığımız gibi özellik tabanlı bir bulandırıcıdır.

### Bulandırma {#fuzzing}

[Bulandırma](https://wikipedia.org/wiki/Fuzzing), güvenlik topluluğunda iyi bilinen bir tekniktir. Programdaki hataları bulmak için aşağı yukarı rastgele girdiler oluşturmayı içerir. Geleneksel yazılımlar için bulandırıcıların ([AFL](http://lcamtuf.coredump.cx/afl/) veya [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) gibi) hata bulmak için etkili araçlar olduğu bilinmektedir.

Tamamen rastgele girdi oluşturmanın ötesinde, iyi girdiler üretmek için aşağıdakiler de dahil olmak üzere birçok teknik ve strateji vardır:

- Her yürütmeden geri bildirim alın ve bunu oluşturmaya rehberlik etmek için kullanın. Örneğin, yeni oluşturulan bir girdi yeni bir yolun keşfine yol açarsa, ona yakın yeni girdiler oluşturmak mantıklı olabilir.
- Yapısal bir kısıtlamaya göre girdi oluşturma. Örneğin, girdiniz bir sağlama toplamı içeren bir başlık içeriyorsa, bulandırıcının sağlama toplamını doğrulayan girdi oluşturmasına izin vermek mantıklı olacaktır.
- Yeni girdiler oluşturmak için bilinen girdileri kullanma: Büyük bir geçerli girdi veri kümesine erişiminiz varsa, bulandırıcınız sıfırdan oluşturmaya başlamak yerine bunlardan yeni girdiler üretebilir. Bunlara genellikle _tohumlar_ denir.

### Özellik tabanlı bulandırma {#property-based-fuzzing}

Echidna, özel bir bulandırıcı ailesine aittir: büyük ölçüde [QuickCheck](https://wikipedia.org/wiki/QuickCheck)'ten ilham alan özellik tabanlı bir bulandırma. Çökmeleri bulmaya çalışan klasik bulandırıcıların aksine Echidna, kullanıcı tanımlı değişmezleri kırmaya çalışacaktır.

Akıllı sözleşmelerde değişmezler, sözleşmenin ulaşabileceği ve aşağıdakileri içeren herhangi bir yanlış veya geçersiz durumu temsil edebilen Solidity fonksiyonlarıdır:

- Yanlış erişim denetimi: Saldırgan sözleşmenin sahibi oldu.
- Yanlış durum makinesi: Sözleşme duraklatılmışken jetonlar aktarılabilir.
- Yanlış aritmetik: kullanıcı bakiyesinde bir aşağı taşma yaratarak sınırsız ücretsiz jeton alabilir.

### Echidna ile bir özelliği test etme {#testing-a-property-with-echidna}

Echidna ile bir akıllı sözleşmenin nasıl test edileceğini göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir: [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Bu jetonun aşağıdaki özelliklere sahip olması gerektiği varsayımında bulunacağız:

- Herkes en fazla 1000 jetona sahip olabilir
- Jeton transfer edilemez (bu bir ERC20 jetonu değildir)

### Bir özellik yazma {#write-a-property}

Echidna özellikleri Solidity fonksiyonlarıdır. Bir özellik şunları yapmalıdır:

- Argümanı olmamalıdır
- Başarılı olursa `true` döndürmelidir
- Adı `echidna` ile başlamalıdır

Echidna şunları yapar:

- Özelliği test etmek için otomatik olarak rastgele işlemler oluşturur.
- Bir özelliğin `false` döndürmesine veya bir hata atmasına neden olan tüm işlemleri bildirir.
- Bir özelliği çağırırken yan etkiyi atar (yani, özellik bir durum değişkenini değiştirirse, testten sonra atılır)

Aşağıdaki özellik, çağıranın 1000'den fazla jetona sahip olmadığını kontrol eder:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Sözleşmenizi özelliklerinden ayırmak için kalıtım kullanın:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol), özelliği uygular ve jetondan miras alır.

### Bir sözleşme başlatma {#initiate-a-contract}

Echidna'nın argümansız bir [kurucuya](/developers/docs/smart-contracts/anatomy/#constructor-functions) ihtiyacı vardır. Sözleşmenizin belirli bir başlatmaya ihtiyacı varsa, bunu kurucuda yapmanız gerekir.

Echidna'da bazı özel adresler vardır:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, kurucuyu çağırır.
- `0x10000`, `0x20000` ve `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, diğer fonksiyonları rastgele çağırır.

Mevcut örneğimizde herhangi bir özel başlatmaya ihtiyacımız yok, bu nedenle kurucumuz boş.

### Echidna'yı Çalıştırma {#run-echidna}

Echidna şununla başlatılır:

```bash
echidna-test contract.sol
```

Eğer contract.sol birden fazla sözleşme içeriyorsa, hedefi belirtebilirsiniz:

```bash
echidna-test contract.sol --contract MyContract
```

### Özet: Bir özelliği test etme {#summary-testing-a-property}

Aşağıdakiler, Echidna'nın örneğimizde çalıştırılmasını özetlemektedir:

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

## Bir bulandırma kampanyası sırasında çağrılacak fonksiyonları filtreleme {#filtering-functions-to-call-during-a-fuzzing-campaign}

Bulandırmaya tabi tutulacak fonksiyonların nasıl filtreleneceğini göreceğiz.
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
Bu bir bulandırıcı için zordur ([Manticore](https://github.com/trailofbits/manticore) gibi sembolik bir yürütme aracı kullanılması önerilir).
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Fonksiyonları filtreleme {#filtering-functions}

İki sıfırlama fonksiyonu (`reset1` ve `reset2`) tüm durum değişkenlerini `false` olarak ayarlayacağından, Echidna bu sözleşmeyi test etmek için doğru diziyi bulmakta zorlanır.
Ancak, sıfırlama fonksiyonunu kara listeye almak veya yalnızca `f`, `g`,
`h` ve `i` fonksiyonlarını beyaz listeye almak için özel bir Echidna özelliği kullanabiliriz.

Fonksiyonları kara listeye almak için bu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Fonksiyonları filtrelemek için başka bir yaklaşım, beyaz listeye alınmış fonksiyonları listelemektir. Bunu yapmak için şu yapılandırma dosyasını kullanabiliriz:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` varsayılan olarak `true` değerindedir.
- Filtreleme yalnızca isme göre (parametreler olmadan) gerçekleştirilecektir. `f()` ve `f(uint256)` fonksiyonlarınız varsa, `"f"` filtresi her iki fonksiyonla da eşleşecektir.

### Echidna'yı Çalıştırma {#run-echidna-1}

`blacklist.yaml` yapılandırma dosyasıyla Echidna'yı çalıştırmak için:

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

### Özet: Fonksiyonları filtreleme {#summary-filtering-functions}

Echidna, bir bulandırma kampanyası sırasında çağrılacak fonksiyonları aşağıdakileri kullanarak kara listeye veya beyaz listeye alabilir:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna, `filterBlacklist` boole değerine göre ya `f1`, `f2` ve `f3`'ü kara listeye alarak ya da sadece bunları çağırarak bir bulandırma kampanyası başlatır.

## Echidna ile Solidity'nin assert'ünü test etme {#how-to-test-soliditys-assert-with-echidna}

Bu kısa öğreticide, sözleşmelerde iddia kontrolünü test etmek için Echidna'nın nasıl kullanılacağını göstereceğiz. Diyelim ki elimizde şöyle bir sözleşme var:

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

### Bir iddia yazma {#write-an-assertion}

Farklarını döndürdükten sonra `tmp`'nin `counter`'dan küçük veya ona eşit olduğundan emin olmak istiyoruz. Bir
Echidna özelliği yazabiliriz, ancak `tmp` değerini bir yerde saklamamız gerekir. Bunun yerine, şöyle bir iddia kullanabiliriz:

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

### Echidna'yı Çalıştırma {#run-echidna-2}

İddia hatası testini etkinleştirmek için bir [Echidna yapılandırma dosyası](https://github.com/crytic/echidna/wiki/Config) olan `config.yaml` dosyasını oluşturun:

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

Gördüğünüz gibi, Echidna `inc` fonksiyonunda bir iddia hatası bildiriyor. Fonksiyon başına birden fazla iddia eklemek mümkündür, ancak Echidna hangi iddianın başarısız olduğunu söyleyemez.

### İddialar ne zaman ve nasıl kullanılır {#when-and-how-use-assertions}

İddialar, özellikle kontrol edilecek koşullar doğrudan bir `f` işleminin doğru kullanımıyla ilgiliyse, açık özelliklere alternatif olarak kullanılabilir. Bir koddan sonra iddia eklemek, kontrolün kod yürütüldükten hemen sonra gerçekleşmesini sağlar:

```solidity
function f(..) public {
    // karmaşık bir kod
    ...
    assert (condition);
    ...
}

```

Aksine, açık bir Echidna özelliği kullanmak işlemleri rastgele yürütecektir ve tam olarak ne zaman kontrol edileceğini zorlamanın kolay bir yolu yoktur. Yine de bu geçici çözümü uygulamak mümkündür:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Ancak, bazı sorunlar var:

- `f` `internal` veya `external` olarak bildirilirse başarısız olur.
- `f` fonksiyonunu çağırmak için hangi argümanların kullanılması gerektiği belirsizdir.
- `f` geri dönerse, özellik başarısız olur.

Genel olarak, iddiaların nasıl kullanılacağı konusunda [John Regehr'in tavsiyesine](https://blog.regehr.org/archives/1091) uymanızı öneririz:

- İddia kontrolü sırasında herhangi bir yan etkiyi zorlamayın. Örneğin: `assert(ChangeStateAndReturn() == 1)`
- Açık ifadeleri iddia etmeyin. Örneğin, `var` `uint` olarak bildirildiğinde `assert(var >= 0)`.

Son olarak, lütfen `assert` yerine `require` **kullanmayın**, çünkü Echidna bunu tespit edemeyecektir (ancak sözleşme yine de geri dönecektir).

### Özet: İddia Kontrolü {#summary-assertion-checking}

Aşağıdakiler, Echidna'nın örneğimizde çalıştırılmasını özetlemektedir:

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

Echidna, bu fonksiyon büyük argümanlarla birden çok kez çağrılırsa `inc` içindeki iddianın başarısız olabileceğini buldu.

## Bir Echidna korpusu toplama ve değiştirme {#collecting-and-modifying-an-echidna-corpus}

Echidna ile bir işlem korpusunun nasıl toplanacağını ve kullanılacağını göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir: [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Bu küçük örnek, Echidna'yı bir durum değişkenini değiştirmek için belirli değerleri bulmaya zorlar. Bu bir bulandırıcı için zordur
([Manticore](https://github.com/trailofbits/manticore) gibi sembolik bir yürütme aracı kullanılması önerilir).
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Ancak, bu bulandırma kampanyasını yürütürken korpus toplamak için yine de Echidna'yı kullanabiliriz.

### Bir korpus toplama {#collecting-a-corpus}

Korpus toplamayı etkinleştirmek için bir korpus dizini oluşturun:

```bash
mkdir corpus-magic
```

Ve bir [Echidna yapılandırma dosyası](https://github.com/crytic/echidna/wiki/Config) olan `config.yaml` dosyasını oluşturun:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Şimdi aracımızı çalıştırabilir ve toplanan korpusu kontrol edebiliriz:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna hala doğru sihirli değerleri bulamıyor, ancak topladığı korpusa bakabiliriz.
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

Açıkçası, bu girdi özelliğimizdeki başarısızlığı tetiklemeyecektir. Ancak, bir sonraki adımda bunun için nasıl değiştirileceğini göreceğiz.

### Bir korpusu besleme {#seeding-a-corpus}

Echidna'nın `magic` fonksiyonuyla başa çıkabilmesi için biraz yardıma ihtiyacı var. Bunun için uygun
parametreleri kullanmak üzere girdiyi kopyalayıp değiştireceğiz:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)` fonksiyonunu çağırmak için `new.txt` dosyasını değiştireceğiz. Şimdi, Echidna'yı yeniden çalıştırabiliriz:

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

## Yüksek gaz tüketimli işlemleri bulma {#finding-transactions-with-high-gas-consumption}

Echidna ile yüksek gaz tüketimli işlemlerin nasıl bulunacağını göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir:

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

Burada `expensive` yüksek bir gaz tüketimine sahip olabilir.

Şu anda, Echidna'nın test etmek için her zaman bir özelliğe ihtiyacı vardır: burada `echidna_test` her zaman `true` döndürür.
Bunu doğrulamak için Echidna'yı çalıştırabiliriz:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Gaz Tüketimini Ölçme {#measuring-gas-consumption}

Echidna ile gaz tüketimini etkinleştirmek için bir `config.yaml` yapılandırma dosyası oluşturun:

```yaml
estimateGas: true
```

Bu örnekte, sonuçların daha kolay anlaşılmasını sağlamak için işlem dizisinin boyutunu da azaltacağız:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna'yı Çalıştırma {#run-echidna-3}

Yapılandırma dosyası oluşturulduktan sonra, Echidna'yı şu şekilde çalıştırabiliriz:

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

- Gösterilen gaz, [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) tarafından sağlanan bir tahmindir.

### Gaz Azaltan Çağrıları Filtreleme {#filtering-out-gas-reducing-calls}

Yukarıdaki **bir bulandırma kampanyası sırasında çağrılacak fonksiyonları filtreleme** öğreticisi, testlerinizden bazı fonksiyonları nasıl kaldıracağınızı gösterir.  
Bu, doğru bir gaz tahmini elde etmek için kritik olabilir.
Aşağıdaki örneği inceleyin:

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

Echidna tüm fonksiyonları çağırabilirse, yüksek gaz maliyetli işlemleri kolayca bulamaz:

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
Ancak, `pop` ve `clear` fonksiyonlarını kara listeye almak bize çok daha iyi sonuçlar verir:

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

### Özet: Yüksek gaz tüketimli işlemleri bulma {#summary-finding-transactions-with-high-gas-consumption}

Echidna, `estimateGas` yapılandırma seçeneğini kullanarak yüksek gaz tüketimli işlemleri bulabilir:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna, bulandırma kampanyası bittiğinde her fonksiyon için maksimum gaz tüketimine sahip bir dizi raporlayacaktır.
