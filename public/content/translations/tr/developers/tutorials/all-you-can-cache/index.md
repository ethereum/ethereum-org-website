---
title: "Önbelleğe alabileceğiniz her şey"
description: "Daha ucuz toplama işlemleri için bir önbelleğe alma sözleşmesi oluşturmayı ve kullanmayı öğrenin"
author: Ori Pomerantz
tags: [ "katman 2", "önbelleğe alma", "depolama" ]
skill: intermediate
published: 2022-09-15
lang: tr
---

Toplamaları kullanırken bir işlemdeki bir baytın maliyeti, bir depolama yuvasının maliyetinden çok daha pahalıdır. Bu nedenle, mümkün olduğunca çok bilgiyi zincir üstünde önbelleğe almak mantıklıdır.

Bu makalede, birden çok kez kullanılması muhtemel herhangi bir parametre değerinin önbelleğe alınacağı ve (ilk seferden sonra) çok daha az sayıda bayt ile kullanıma sunulacağı şekilde bir önbelleğe alma sözleşmesinin nasıl oluşturulacağını ve kullanılacağını ve bu önbelleği kullanan zincir dışı kodun nasıl yazılacağını öğreneceksiniz.

Makaleyi atlayıp yalnızca kaynak kodunu görmek isterseniz, [buradadır](https://github.com/qbzzt/20220915-all-you-can-cache). Geliştirme yığını [Foundry](https://getfoundry.sh/introduction/installation/)'dir.

## Genel tasarım {#overall-design}

Basitlik adına, tüm işlem parametrelerinin `uint256` olduğunu ve 32 bayt uzunluğunda olduğunu varsayacağız. Bir işlem aldığımızda, her bir parametreyi şu şekilde ayrıştıracağız:

1. İlk bayt `0xFF` ise sonraki 32 baytı bir parametre değeri olarak alın ve önbelleğe yazın.

2. İlk bayt `0xFE` ise sonraki 32 baytı bir parametre değeri olarak alın ancak önbelleğe _yazmayın_.

3. Diğer herhangi bir değer için, ilk dört biti ek bayt sayısı olarak ve son dört biti önbellek anahtarının en anlamlı bitleri olarak alın. İşte bazı örnekler:

   | Calldata'daki baytlar | Önbellek anahtarı |
   | :-------------------- | ----------------: |
   | 0x0F                  |              0x0F |
   | 0x10,0x10             |              0x10 |
   | 0x12,0xAC             |            0x02AC |
   | 0x2D,0xEA, 0xD6       |          0x0DEAD6 |

## Önbellek manipülasyonu {#cache-manipulation}

Önbellek, [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) içinde uygulanmıştır. Satır satır üzerinden geçelim.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Bu sabitler, tüm bilgileri sağladığımız ve önbelleğe yazılmasını isteyip istemediğimiz özel durumları yorumlamak için kullanılır. Önbelleğe yazma, daha önce kullanılmamış depolama yuvalarına her biri 22100 gaz maliyetinde iki [`SSTORE`](https://www.evm.codes/#55) işlemi gerektirir, bu yüzden bunu isteğe bağlı hâle getiriyoruz.

```solidity

    mapping(uint => uint) public val2key;
```

Değerler ve anahtarları arasında bir [eşleme](https://www.geeksforgeeks.org/solidity/solidity-mappings/). Bu bilgi, işlemi göndermeden önce değerleri kodlamak için gereklidir.

```solidity
    // Konum n, n+1 anahtarının değerine sahiptir, çünkü sıfırı "önbellekte değil" olarak
    // korumamız gerekir.
    uint[] public key2val;
```

Anahtarları atadığımız için anahtarlardan değerlere eşleme için bir dizi kullanabiliriz ve basitlik adına bunu sıralı olarak yaparız.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Önbellekten bir değer okuyun.

```solidity
    // Değer zaten mevcut değilse önbelleğe bir değer yazın
    // Testin çalışmasını sağlamak için yalnızca public
    function cacheWrite(uint _value) public returns (uint) {
        // Değer zaten önbellekteyse mevcut anahtarı döndürün
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Aynı değeri önbelleğe birden fazla kez koymanın bir anlamı yoktur. Değer zaten oradaysa, sadece mevcut anahtarı döndürün.

```solidity
        // 0xFE özel bir durum olduğundan, önbelleğin tutabileceği en büyük anahtar
        // 0x0D ve ardından 15 adet 0xFF'tir. Önbellek uzunluğu zaten bu kadar
        // büyükse başarısız olur.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "önbellek taşması");
```

Hiçbir zaman bu kadar büyük bir önbelleğe sahip olacağımızı sanmıyorum (yaklaşık 1,8\*10<sup>37</sup> giriş, bu da depolamak için yaklaşık 10<sup>27</sup> TB gerektirir). Ancak, ["640kB her zaman yeterli olacaktır"](https://quoteinvestigator.com/2011/09/08/640k-enough/) sözünü hatırlayacak kadar yaşlıyım. Bu test çok ucuzdur.

```solidity
        // Değeri bir sonraki anahtarı kullanarak yazın
        val2key[_value] = key2val.length+1;
```

Ters aramayı ekleyin (değerden anahtara).

```solidity
        key2val.push(_value);
```

İleriye doğru aramayı ekleyin (anahtardan değere). Değerleri sıralı olarak atadığımız için onu son dizi değerinden sonra ekleyebiliriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Yeni değerin depolandığı hücre olan `key2val` öğesinin yeni uzunluğunu döndürün.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Bu işlev, calldata'dan rastgele uzunlukta (en fazla 32 bayt, kelime boyutu) bir değer okur.

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal uzunluk sınırı 32 bayttır");
        require(length + startByte <= msg.data.length,
            "_calldataVal calldatasize'ın ötesini okumaya çalışıyor");
```

Bu işlev dahili olduğu için kodun geri kalanı doğru yazılırsa bu testler gerekli değildir. Ancak, maliyetleri çok yüksek olmadığı için kullanabiliriz.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Bu kod [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) dilindedir. Calldata'dan 32 baytlık bir değer okur. Bu, calldata `startByte+32`'den önce dursa bile çalışır çünkü EVM'deki başlatılmamış alanın sıfır olduğu kabul edilir.

```solidity
        _retVal = _retVal >> (256-length*8);
```

İlla ki 32 baytlık bir değer istemiyoruz. Bu, fazla baytları ortadan kaldırır.

```solidity
        return _retVal;
    } // _calldataVal


    // Calldata'dan _fromByte'tan başlayarak tek bir parametre okuyun
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Calldata'dan tek bir parametre okuyun. Parametreler 1 bayt ile 33 bayt arasında değişebileceğinden, yalnızca okuduğumuz değeri değil, aynı zamanda sonraki baytın konumunu da döndürmemiz gerektiğini unutmayın.

```solidity
        // İlk bayt bize gerisini nasıl yorumlayacağımızı söyler
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity, potansiyel olarak tehlikeli [örtük tür dönüşümlerini](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) yasaklayarak hata sayısını azaltmaya çalışır. Örneğin 256 bitten 8 bite bir tür küçültme işleminin açık olması gerekir.

```solidity

        // Değeri okuyun, ancak önbelleğe yazmayın
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Değeri okuyun ve önbelleğe yazın
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Buraya geldiysek, önbellekten okuma yapmamız gerektiği anlamına gelir

        // Okunacak ek bayt sayısı
        uint8 _extraBytes = _firstByte / 16;
```

Alt [nibble](https://en.wikipedia.org/wiki/Nibble)'ı alın ve değeri önbellekten okumak için diğer baytlarla birleştirin.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n parametrelerini okuyun (fonksiyonlar kaç parametre beklediklerini bilirler)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Sahip olduğumuz parametre sayısını calldata'nın kendisinden alabiliriz, ancak bizi çağıran fonksiyonlar kaç parametre beklediklerini bilir. Bize söylemelerine izin vermek daha kolaydır.

```solidity
        // Okuduğumuz parametreler
        uint[] memory params = new uint[](_paramNum);

        // Parametreler 4. baytta başlar, ondan öncesi fonksiyon imzasıdır
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

İhtiyacınız olan sayıya ulaşana kadar parametreleri okuyun. Calldata'nın sonunu geçersek, `_readParams` çağrıyı geri alır.

```solidity

        return(params);
    }   // readParams

    // _readParams'ı test etmek için, dört parametrenin okunmasını test edin
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry'nin büyük bir avantajı, testlerin Solidity'de yazılmasına izin vermesidir ([aşağıdaki Önbelleği test etme bölümüne bakın](#testing-the-cache)). Bu, birim testlerini çok daha kolaylaştırır. Bu, testin doğru olduklarını doğrulayabilmesi için dört parametreyi okuyan ve döndüren bir fonksiyondur.

```solidity
    // Bir değer alın, onu kodlayacak baytları döndürün (mümkünse önbelleği kullanarak)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`, önbelleği kullanan calldata oluşturmaya yardımcı olmak için zincir dışı kodun çağırdığı bir fonksiyondur. Tek bir değer alır ve onu kodlayan baytları döndürür. Bu fonksiyon bir `view` fonksiyonudur, bu nedenle bir işlem gerektirmez ve harici olarak çağrıldığında herhangi bir gaz maliyeti yoktur.

```solidity
        uint _key = val2key[_val];

        // Değer henüz önbellekte değil, ekleyin
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)'de tüm başlatılmamış depolamanın sıfır olduğu varsayılır. Yani, orada olmayan bir değerin anahtarını ararsak sıfır elde ederiz. Bu durumda, onu kodlayan baytlar `INTO_CACHE` (böylece bir sonraki sefere önbelleğe alınacaktır), ardından gerçek değer gelir.

```solidity
        // Anahtar <0x10 ise tek bir bayt olarak döndürün
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Tek baytlar en kolay olanlardır. Herhangi bir uzunlukta olabilen bir `bytes<n>` türünü bir bayt dizisine dönüştürmek için [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) kullanırız. İsmine rağmen, yalnızca bir argümanla sağlandığında gayet iyi çalışır.

```solidity
        // İki baytlık değer, 0x1vvv olarak kodlanmış
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>'ten küçük bir anahtarımız olduğunda, bunu iki baytla ifade edebiliriz. Önce 256 bitlik bir değer olan `_key`'i 16 bitlik bir değere dönüştürürüz ve ilk bayta ek bayt sayısını eklemek için mantıksal veya kullanırız. Sonra onu, `bytes`'a dönüştürülebilen bir `bytes2` değerine dönüştürürüz.

```solidity
        // Muhtemelen aşağıdaki satırları bir döngü olarak yapmanın zekice bir yolu vardır,
        // ancak bu bir view fonksiyonu olduğundan programcı zamanı ve
        // basitlik için optimize ediyorum.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Diğer değerler (3 bayt, 4 bayt vb.) farklı alan boyutlarıyla aynı şekilde ele alınır.

```solidity
        // Buraya gelirsek, bir şeyler yanlış demektir.
        revert("encodeVal'da hata, olmamalıydı");
```

Buraya gelirsek, 16\*256<sup>15</sup>'ten küçük olmayan bir anahtar aldığımız anlamına gelir. Ancak `cacheWrite` anahtarları sınırlar, bu yüzden 14\*256<sup>16</sup>'ya bile ulaşamayız (bunun ilk baytı 0xFE olurdu, yani `DONT_CACHE` gibi görünürdü). Ancak gelecekteki bir programcının bir hata eklemesi durumunda bir test eklemek bize çok pahalıya mal olmaz.

```solidity
    } // encodeVal

}  // Cache
```

### Önbelleği test etme {#testing-the-cache}

Foundry'nin avantajlarından biri, [testleri Solidity'de yazmanıza izin vermesidir](https://getfoundry.sh/forge/tests/overview/), bu da birim testleri yazmayı kolaylaştırır. `Cache` sınıfının testleri [buradadır](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Test kodu, testlerin olma eğiliminde olduğu gibi tekrarlayıcı olduğundan, bu makale yalnızca ilginç kısımları açıklamaktadır.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Konsol için `forge test -vv` komutunu çalıştırmanız gerekir.
import "forge-std/console.sol";
```

Bu, sadece test paketini ve `console.log`'u kullanmak için gerekli olan standart bir koddur.

```solidity
import "src/Cache.sol";
```

Test ettiğimiz sözleşmeyi bilmemiz gerekiyor.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` fonksiyonu her testten önce çağrılır. Bu durumda sadece yeni bir önbellek oluştururuz, böylece testlerimiz birbirini etkilemez.

```solidity
    function testCaching() public {
```

Testler, adları `test` ile başlayan fonksiyonlardır. Bu fonksiyon, değerleri yazıp tekrar okuyarak temel önbellek işlevselliğini kontrol eder.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Gerçek testi [`assert...` fonksiyonlarını](https://getfoundry.sh/reference/forge-std/std-assertions/) kullanarak bu şekilde yaparsınız. Bu durumda, yazdığımız değerin okuduğumuz değer olduğunu kontrol ederiz. `cache.cacheWrite` sonucunu atabiliriz çünkü önbellek anahtarlarının doğrusal olarak atandığını biliyoruz.

```solidity
        }
    }    // testCaching


    // Aynı değeri birden çok kez önbelleğe alın, anahtarın aynı
    // kaldığından emin olun
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Önce her değeri önbelleğe iki kez yazarız ve anahtarların aynı olduğundan emin oluruz (yani ikinci yazma işlemi gerçekten gerçekleşmemiştir).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teoride, ardışık önbellek yazımlarını etkilemeyen bir hata olabilir. Bu yüzden burada ardışık olmayan bazı yazımlar yapıyoruz ve değerlerin hala yeniden yazılmadığını görüyoruz.

```solidity
    // Bir bellek arabelleğinden bir uint okuyun (gönderdiğimiz parametreleri
    // geri aldığımızdan emin olmak için)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory` arabelleğinden 256 bitlik bir kelime okuyun. Bu yardımcı fonksiyon, önbelleği kullanan bir fonksiyon çağrısı çalıştırdığımızda doğru sonuçları aldığımızı doğrulamamızı sağlar.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_sınır_dışı");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul, `uint256`'nın ötesindeki veri yapılarını desteklemez, bu nedenle `_bytes` bellek arabelleği gibi daha karmaşık bir veri yapısına atıfta bulunduğunuzda, o yapının adresini alırsınız. Solidity, `bytes memory` değerlerini uzunluğu içeren 32 baytlık bir kelime olarak ve ardından gerçek baytları depolar, bu nedenle `_start` bayt numarasını almak için `_bytes+32+_start`'ı hesaplamamız gerekir.

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() için fonksiyon imzası,
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d izniyle
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Doğru değerleri geri aldığımızı görmek için sadece bazı sabit değerler
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Test için ihtiyacımız olan bazı sabitler.

```solidity
    function testReadParam() public {
```

Parametreleri doğru bir şekilde okuyabildiğimizi test etmek için `readParams` kullanan bir fonksiyon olan `fourParams()`'ı çağırın.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Önbelleği kullanarak bir fonksiyon çağırmak için normal ABI mekanizmasını kullanamayız, bu yüzden düşük seviyeli [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) mekanizmasını kullanmamız gerekir. Bu mekanizma, girdi olarak bir `bytes memory` alır ve bunu (bir Boole değeri ile birlikte) çıktı olarak döndürür.

```solidity
        // İlk çağrı, önbellek boş
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Aynı sözleşmenin hem önbelleğe alınmış fonksiyonları (doğrudan işlemlerden gelen çağrılar için) hem de önbelleğe alınmamış fonksiyonları (diğer akıllı sözleşmelerden gelen çağrılar için) desteklemesi kullanışlıdır. Bunu yapmak için, her şeyi [bir `fallback` fonksiyonuna](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) koymak yerine doğru fonksiyonu çağırmak için Solidity mekanizmasına güvenmeye devam etmemiz gerekir. Bunu yapmak birleştirilebilirliği çok daha kolaylaştırır. Çoğu durumda fonksiyonu tanımlamak için tek bir bayt yeterli olacaktır, bu yüzden üç bayt (16\*3=48 gaz) israf ediyoruz. Ancak, ben bunu yazarken bu 48 gazın maliyeti 0,07 sent, bu da daha basit, daha az hataya açık kod için makul bir maliyettir.

```solidity
            // İlk değer, önbelleğe ekleyin
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

İlk değer: Önbelleğe yazılması gereken tam bir değer olduğunu söyleyen bir bayrak, ardından değerin 32 baytı. Diğer üç değer benzerdir, ancak `VAL_B` önbelleğe yazılmaz ve `VAL_C` hem üçüncü hem de dördüncü parametredir.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Burası `Cache` sözleşmesini gerçekten çağırdığımız yerdir.

```solidity
        assertEq(_success, true);
```

Çağrının başarılı olmasını bekliyoruz.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Boş bir önbellekle başlarız ve ardından `VAL_A`'yı ve sonrasında `VAL_C`'yi ekleriz. Birincisinin anahtarının 1, ikincisinin ise 2 olmasını bekleriz.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Çıktı dört parametredir. Burada doğru olduğunu doğruluyoruz.

```solidity
        // İkinci çağrı, önbelleği kullanabiliriz
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Önbellekteki ilk değer
            bytes1(0x01),
```

16'nın altındaki önbellek anahtarları yalnızca bir bayttır.

```solidity
            // İkinci değer, önbelleğe eklemeyin
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Üçüncü ve dördüncü değerler, aynı değer
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Çağrıdan sonraki testler, ilk çağrıdan sonrakilerle aynıdır.

```solidity
    function testEncodeVal() public {
```

Bu fonksiyon, `testReadParam`'a benzer, ancak parametreleri açıkça yazmak yerine `encodeVal()` kullanırız.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()`'daki tek ek test, `_callInput`'un uzunluğunun doğru olduğunu doğrulamaktır. İlk arama için 4+33\*4'tür. İkincisi için, her değerin zaten önbellekte olduğu durumda, 4+1\*4'tür.

```solidity
    // Anahtarın tek bir bayttan fazla olduğu durumlarda encodeVal'ı test edin
    // Önbelleği dört bayta kadar doldurmak çok uzun sürdüğü için
    // en fazla üç bayt.
    function testEncodeValBig() public {
        // Önbelleğe bir dizi değer koyun.
        // İşleri basit tutmak için, n değeri için n anahtarını kullanın.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Yukarıdaki `testEncodeVal` fonksiyonu önbelleğe yalnızca dört değer yazar, bu nedenle [fonksiyonun çok baytlı değerlerle ilgilenen kısmı](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) kontrol edilmez. Ancak bu kod karmaşık ve hataya açıktır.

Bu fonksiyonun ilk kısmı, 1'den 0x1FFF'ye kadar olan tüm değerleri sırayla önbelleğe yazan bir döngüdür, böylece bu değerleri kodlayabilir ve nereye gittiklerini bilebiliriz.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Bir bayt        0x0F
            cache.encodeVal(0x0010),   // İki bayt     0x1010
            cache.encodeVal(0x0100),   // İki bayt     0x1100
            cache.encodeVal(0x1000)    // Üç bayt 0x201000
        );
```

Bir bayt, iki bayt ve üç baytlık değerleri test edin. Yeterli yığın girdisi yazmak çok uzun süreceğinden (en az 0x10000000, yaklaşık olarak çeyrek milyar) bunun ötesinde test yapmıyoruz.

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Aşırı küçük bir arabellekle bir geri alma elde ettiğimizi test edin
    function testShortCalldata() public {
```

Yeterli parametre olmadığında anormal durumda ne olduğunu test edin.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Geri döndüğü için alacağımız sonuç `false` olmalıdır.

```
    // Orada olmayan önbellek anahtarlarıyla çağrı yapın
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // İlk değer, önbelleğe ekleyin
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // İkinci değer
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Bu fonksiyon dört tamamen meşru parametre alır, ancak önbellek boştur, bu nedenle okunacak değer yoktur.

```solidity
        .
        .
        .
    // Aşırı uzun bir arabellekle her şeyin çalıştığını test edin
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // İlk çağrı, önbellek boş
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // İlk değer, önbelleğe ekleyin
            cache.INTO_CACHE(), bytes32(VAL_A),

            // İkinci değer, önbelleğe ekleyin
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Üçüncü değer, önbelleğe ekleyin
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Dördüncü değer, önbelleğe ekleyin
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Ve "iyi şans" için başka bir değer
            bytes4(0x31112233)
        );
```

Bu fonksiyon beş değer gönderir. Beşinci değerin, geçerli bir önbellek girişi olmadığı için yoksayıldığını biliyoruz; dahil edilmeseydi geri dönmeye neden olurdu.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Örnek bir uygulama {#a-sample-app}

Solidity'de test yazmak çok iyidir, ancak günün sonunda bir merkeziyetsiz uygulamanın kullanışlı olması için zincir dışından gelen istekleri işleyebilmesi gerekir. Bu makale, "Bir Kez Yaz, Çok Kez Oku" anlamına gelen WORM ile bir merkeziyetsiz uygulamada önbelleğe almanın nasıl kullanılacağını göstermektedir. Bir anahtar henüz yazılmamışsa, ona bir değer yazabilirsiniz. Anahtar zaten yazılmışsa, bir geri alma alırsınız.

### Sözleşme {#the-contract}

[Bu sözleşmedir](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Çoğunlukla `Cache` ve `CacheTest` ile zaten yaptıklarımızı tekrarlar, bu yüzden sadece ilginç olan kısımları ele alacağız.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` kullanmanın en kolay yolu, onu kendi sözleşmemize miras almaktır.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Bu fonksiyon, yukarıdaki `CacheTest`'teki `fourParam`'a benzer. ABI spesifikasyonlarını takip etmediğimiz için, fonksiyona herhangi bir parametre bildirmemek en iyisidir.

```solidity
    // Bizi çağırmayı kolaylaştırın
    // writeEntryCached() için Fonksiyon İmzası, 
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3 izniyle
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

`writeEntryCached`'i çağıran harici kodun, ABI spesifikasyonlarına uymadığımız için `worm.writeEntryCached`'i kullanmak yerine calldata'yı manuel olarak oluşturması gerekecektir. Bu sabit değere sahip olmak sadece yazmayı kolaylaştırır.

`WRITE_ENTRY_CACHED`'i bir durum değişkeni olarak tanımlasak da, harici olarak okumak için onun alıcı fonksiyonu olan `worm.WRITE_ENTRY_CACHED()`'i kullanmak gerektiğini unutmayın.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Okuma fonksiyonu bir `view` fonksiyonudur, bu nedenle bir işlem gerektirmez ve gaz maliyeti yoktur. Sonuç olarak, parametre için önbelleği kullanmanın bir faydası yoktur. View fonksiyonlarında daha basit olan standart mekanizmayı kullanmak en iyisidir.

### Test kodu {#the-testing-code}

[Bu, sözleşmenin test kodudur](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Yine, sadece ilginç olanlara bakalım.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("giriş zaten yazılmış"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Bu (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert), bir Foundry testinde bir sonraki çağrının başarısız olması gerektiğini ve başarısızlık için bildirilen nedeni bu şekilde belirtiriz. Bu, `<sözleşme>.<fonksiyon adı>() sözdizimini, calldata'yı oluşturup sözleşmeyi düşük seviyeli arayüzü (`<sözleşme>.call()`, vb.) kullanarak çağırmak yerine kullandığımızda geçerlidir.

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Burada `cacheWrite`'ın önbellek anahtarını döndürmesi gerçeğini kullanıyoruz. Bu, üretimde kullanmayı bekleyeceğimiz bir şey değildir, çünkü `cacheWrite` durumu değiştirir ve bu nedenle yalnızca bir işlem sırasında çağrılabilir. İşlemlerin dönüş değerleri yoktur, eğer sonuçları varsa bu sonuçların olaylar olarak yayınlanması gerekir. Bu nedenle `cacheWrite` dönüş değerine yalnızca zincir üstü koddan erişilebilir ve zincir üstü kodun parametre önbelleğe almasına gerek yoktur.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Bu, Solidity'ye `<sözleşme adresi>.call()`'un iki dönüş değeri olmasına rağmen, yalnızca ilkiyle ilgilendiğimizi söyleme şeklimizdir.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Düşük seviyeli `<adres>.call()` fonksiyonunu kullandığımız için, `vm.expectRevert()`'i kullanamayız ve çağrıdan aldığımız boole başarı değerine bakmak zorundayız.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

Bu, Foundry'de kodun [bir olayı doğru şekilde yaydığını](https://getfoundry.sh/reference/cheatcodes/expect-emit/) doğrulama şeklimizdir.

### İstemci {#the-client}

Solidity testleriyle elde edemeyeceğiniz bir şey, kendi uygulamanıza kesip yapıştırabileceğiniz JavaScript kodudur. Bu kodu yazmak için WORM'u [Optimism'in](https://www.optimism.io/) yeni test ağı olan [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)'ye dağıttım. Adresi [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)'dır.

[İstemci için JavaScript kodunu burada görebilirsiniz](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Kullanmak için:

1. Git deposunu klonlayın:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Gerekli paketleri yükleyin:

   ```sh
   cd javascript
   yarn
   ```

3. Yapılandırma dosyasını kopyalayın:

   ```sh
   cp .env.example .env
   ```

4. Yapılandırmanız için `.env` dosyasını düzenleyin:

   | Parametre                                                     | Değer                                                                                                                                                                                                |
   | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | Bir işlemi ödemek için yeterli ETH'ye sahip bir hesabın anımsatıcısı. [Optimism Goerli ağı için ücretsiz ETH'yi buradan alabilirsiniz](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | Optimism Goerli'ye URL. Genel uç nokta, `https://goerli.optimism.io`, hız sınırlıdır ancak burada ihtiyacımız olan şey için yeterlidir                                               |

5. `index.js`'i çalıştırın.

   ```sh
   node index.js
   ```

   Bu örnek uygulama önce WORM'a bir giriş yazar, calldata'yı ve Etherscan'deki işleme bir bağlantıyı görüntüler. Sonra bu girişi geri okur ve kullandığı anahtarı ve girişteki değerleri (değer, blok numarası ve yazar) görüntüler.

İstemcinin çoğu normal merkeziyetsiz uygulama JavaScript'idir. Bu yüzden yine sadece ilginç kısımları ele alacağız.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Her seferinde yeni bir anahtar gerekir
    const key = await worm.encodeVal(Number(new Date()))
```

Belirli bir yuvaya yalnızca bir kez yazılabilir, bu nedenle yuvaları yeniden kullanmadığımızdan emin olmak için zaman damgasını kullanırız.

```javascript
const val = await worm.encodeVal("0x600D")

// Bir giriş yazın
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers, çağrı verisinin onaltılık bir dize, yani `0x` ve ardından çift sayıda onaltılık basamak olmasını bekler. Hem `key` hem de `val` `0x` ile başladığı için bu başlıkları kaldırmamız gerekir.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity test kodunda olduğu gibi, önbelleğe alınmış bir fonksiyonu normal şekilde çağıramayız. Bunun yerine daha düşük seviyeli bir mekanizma kullanmamız gerekiyor.

```javascript
    .
    .
    .
    // Az önce yazılan girişi okuyun
    const realKey = '0x' + key.slice(4)  // FF bayrağını kaldırın
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Girişleri okumak için normal mekanizmayı kullanabiliriz. `view` fonksiyonlarıyla parametre önbelleğe alma kullanmaya gerek yoktur.

## Sonuç {#conclusion}

Bu makaledeki kod bir kavram kanıtıdır, amaç fikri anlaşılır kılmaktır. Üretime hazır bir sistem için bazı ek işlevler uygulamak isteyebilirsiniz:

- `uint256` olmayan değerleri işleyin. Örneğin, dizeler.
- Genel bir önbellek yerine, belki kullanıcılar ve önbellekler arasında bir eşleme olabilir. Farklı kullanıcılar farklı değerler kullanır.
- Adresler için kullanılan değerler, diğer amaçlar için kullanılanlardan farklıdır. Sadece adresler için ayrı bir önbelleğe sahip olmak mantıklı olabilir.
- Şu anda, önbellek anahtarları "ilk gelen, en küçük anahtar" algoritmasına göredir. İlk on altı değer tek bir bayt olarak gönderilebilir. Sonraki 4080 değer iki bayt olarak gönderilebilir. Sonraki yaklaşık bir milyon değer üç bayttır, vb. Bir üretim sistemi, önbellek girişlerinde kullanım sayaçları tutmalı ve bunları, en yaygın on altı değerin bir bayt, sonraki 4080 en yaygın değerin iki bayt vb. olacak şekilde yeniden düzenlemelidir.

  Ancak, bu potansiyel olarak tehlikeli bir işlemdir. Aşağıdaki olaylar dizisini hayal edin:

  1. Noam Naive, jeton göndermek istediği adresi kodlamak için `encodeVal`'ı çağırır. Bu adres, uygulamada kullanılan ilklerden biridir, bu nedenle kodlanmış değer 0x06'dır. Bu bir `view` fonksiyonudur, bir işlem değildir, bu yüzden Noam ve kullandığı düğüm arasındadır ve başka kimse bunu bilmez

  2. Owen Owner, önbellek yeniden sıralama işlemini çalıştırır. Çok az insan bu adresi gerçekten kullanıyor, bu yüzden şimdi 0x201122 olarak kodlanıyor. Farklı bir değer olan 10<sup>18</sup>, 0x06'ya atanır.

  3. Noam Naive, jetonlarını 0x06'ya gönderir. Jetonlar `0x0000000000000000000000000de0b6b3a7640000` adresine gider ve kimse bu adresin özel anahtarını bilmediği için orada takılıp kalırlar. Noam _mutlu değil_.

  Bu sorunu ve önbellek yeniden sıralaması sırasında mempool'da bulunan işlemlerin ilgili sorununu çözmenin yolları vardır, ancak bunun farkında olmalısınız.

Burada Optimism ile önbelleğe almayı gösterdim, çünkü ben bir Optimism çalışanıyım ve bu en iyi bildiğim toplamadır. Ancak, dahili işleme için minimum bir maliyet talep eden herhangi bir toplamayla çalışmalıdır, böylece karşılaştırmalı olarak işlem verilerini L1'e yazmak ana masraf olur.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

