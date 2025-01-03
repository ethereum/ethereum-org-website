---
title: "Önbelleğe alabileceğiniz her şey"
description: Daha ucuz toplama işlemleri için önbelleğe alma sözleşmesi oluşturmayı ve kullanmayı öğrenin
author: Ori Pomerantz
tags:
  - "katman 2"
  - "önbelleğe alma"
  - "depolama"
skill: intermediate
published: 2022-09-15
lang: tr
---

İşlemdeki bir baytın maliyeti, toplama kullanırken depolama yuvası kullanımına göre çok daha pahalıdır. Bu nedenle, zincirde mümkün olduğu kadar çok bilgiyi önbelleğe almak mantıklıdır.

Bu makalede, birden fazla kez kullanılması olası olan herhangi bir parametre değerinin nasıl önbelleğe alınacağını ve daha az bellek (ilk kez kullanıldıktan sonra) kullanacak şekilde nasıl kullanıma hazır hale getirileceğini öğrenecek ve ayrıca bu önbelleği kullanan zincir dışı kodu yazmayı da öğrenmiş olacaksınız.

Makaleyi atlayıp doğrudan kaynak kodunu görmek istiyorsanız [buraya](https://github.com/qbzzt/20220915-all-you-can-cache) tıklayabilirsiniz. Geliştirme yığını [Foundry](https://book.getfoundry.sh/getting-started/installation)'dir.

## Genel tasarım {#overall-design}

Kolay anlaşılması için tüm işlem parametrelerinin 32 bayt uzunluğunda ve `uint256` tipinde olduğunu varsayacağız. Bir işlem aldığımızda parametreleri şu şekilde ayrıştıracağız:

1. İlk bayt `0xFF` ise, sonraki 32 baytı parametre değeri olarak alın ve önbelleğe yazın.

2. İlk bayt `0xFE` ise, sonraki 32 baytı parametre değeri olarak alın ancak önbelleğe _yazmayın_.

3. Başka herhangi bir değer için ilk dört biti ek bayt sayısı ve son dört biti önbellek anahtarının en önemli bitleri olarak alın. İşte bazı örnekler:

   | Calldata'daki baytlar | Önbellek anahtarı |
   | :-------------------- | ----------------: |
   | 0x0F                  |              0x0F |
   | 0x10,0x10             |              0x10 |
   | 0x12,0xAC             |            0x02AC |
   | 0x2D,0xEA, 0xD6       |          0x0DEAD6 |

## Önbellek manipülasyonu {#cache-manipulation}

Önbellek [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) içinde uygulanır. Hadi satır satır inceleyelim.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Bu sabitler, tüm bilgileri sağladığımız ve önbelleğe yazılmasını isteyip istemediğimiz özel durumları yorumlamak için kullanılır. Önbelleğe yazdırmak için her birisine 22100 gaz ücreti ödeyerek daha önce kullanılmayan depolama yuvalarına iki [`SSTORE`](https://www.evm.codes/#55) işlemi yapılması gerekir; bu nedenle isteğe bağlı hale getiririz.

```solidity

    mapping(uint => uint) public val2key;
```

Değerler ile anahtarları arasında [eşleme](https://www.geeksforgeeks.org/solidity-mappings/). Bu bilgi, işlemi göndermeden önce değerleri kodlayabilmek için gereklidir.

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

Anahtarları atadığımızdan anahtarlardan değerlere eşleme için bir dizi kullanabiliriz ve basitlik için bunu sırayla yaparız.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Önbellekten değer okuma.

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Aynı değeri önbelleğe birden fazla kez koymanın hiçbir anlamı yoktur. Değer zaten oradaysa mevcut anahtarı döndürmeniz yeterli olur.

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Hiçbir zaman bu kadar büyük bir önbelleğe sahip olacağımızı sanmıyorum (yaklaşık 1,8\*10<sup>37</sup> giriş, yani depolamak için 10<sup>27</sup>TB gerektirir). Aynı zamanda da ["640 kB her zaman yeterli olacaktır"](https://quoteinvestigator.com/2011/09/08/640k-enough/)lafını da hatırlayacak kadar yaşlıyım. Bu test oldukça ucuz.

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

Geriye doğru aramayı ekleyin (değerden anahtara doğru).

```solidity
        key2val.push(_value);
```

İleriye doğru aramayı ekleyin (anahtardan değere doğru). Değerleri sırayla atadığımız için onu son dizi değerinden sonra ekleyebiliriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Yeni değerin depolandığı hücre olan `key2val`'in yeni uzunluğunu döndürün.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Bu işlev, isteğe bağlı uzunluktaki çağrı verisinden bir değer okur (en fazla 32 bayt, kelime boyutu).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Bu, dahili bir fonksiyondur, yani kodun geri kalanı doğru yazılırsa bu testlere ihtiyaç olmaz. Ancak pek de fazla masraflı değiller, yani yine de kullanabiliriz.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Bu kod [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)'da yazılmıştır. Çağrı verisinden 32 baytlık bir değer okur. Bu, çağrı verisi `startByte+32`'den önce dursa bile çalışır, çünkü EVM'de başlatılmamış olan bu alan 0 olarak değerlendilir.

```solidity
        _retVal = _retVal >> (256-length*8);
```

İlla da 32 baytlık bir değer istemiyoruz. Bu kod, fazlalık baytlardan kurtulur.

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Çağrı verisinden tekli bir parametre okuyun. Sadece okuduğumuz değeri değil, ayrıca sonraki baytın da konumunu okumamız gerektiğine dikkat edin, çünkü parametrelerin uzunluğu 1 bayt ile 33 bayt arasında değişebilir.

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity, tehlikeli olma potansiyeli taşıyan [dahili tip dönüşümleri](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) engelleyerek hataların sayısını azaltmaya çalışır. Bir düşürme, örnek olarak 256 bitten 8 bite düşürme açık olmalıdır.

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

Alt [nibble](https://en.wikipedia.org/wiki/Nibble)'ı alın ve önbellekten değeri okuyabilmek için diğer baytlarla birleştirin.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Sahip olduğumuz parametrelerin sayısını çağrı verisinin kendisinden de alabiliriz, fakat bize çağrı yapan fonksiyonlar ne kadar parametre beklediklerini bilmektedir. Onların bize söylemesine izin vermek daha kolaydır.

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

İhtiyacınız olan sayıya ulaşana kadar parametreleri okumaya devam edin. Eğer çağrı verisinin sonunun ötesine geçersek, `_readParams` aramayı eski haline döndürecektir.

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry'nin bir büyük faydası testlerin Solidity'de ([aşağıdaki Önbelleğin test edilmesi bölümüne bakın)](#testing-the-cache) yazılmasına izin vermesidir. Bu, birim testlerini çok daha kolay hale getiriyor. Bu, testin doğru olduklarını onaylayabilmesi için dört parametreyi okuyan ve döndüren bir fonksiyondur.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`, zincir dışı kodların önbelleği kullanan çağrı verileri oluşturmak için yardım istediklerinde çağırdığı bir fonksiyondur. Tek bir değer alır ve onu şifreleyen baytları verir. Bu fonksiyon bir `view` fonksiyonudur; bu yüzden bir işleme ihtiyaç duymaz ve harici olarak çağrıldığında hiç gaz harcamaz.

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)'de, başlatılmamış her depolamanın sıfır olduğu varsayılır. Yani eğer orada olmayan bir değerin anahtarını ararsak bir sıfır alırız. Bu durumda şifrelemeyi yapan baytlar, `INTO_CACHE` şeklindedir (yani bir dahaki sefere önbelleğe alınacaktır) ve ardından asıl değer gelir.

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Tek baytlar en kolay olanlardır. Bir `bytes<n>` tipini herhangi bir uzunluktaki bir bayt dizisine dönüştürmek için [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) kullanırız. İsmine rağmen, sadece bir bağımsız değişken sağlandığında bile normal bir şekilde çalışır.

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>'den daha az bir anahtarımız olduğunda, onu 2 baytta ifade edebiliriz. Önce 256 bitlik bir değer olan `_key` öğesini 16 bitlik değere çevirir ve mantık kullanırız veya ek baytların sayısını ilk bayta ekleriz. Sonra `bytes2` değerine dönüştürürüz, bu da `bytes`'a dönüştürülebilir.

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

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

Diğer değerler (3 bayt, 4 bayt, vs.) aynı şekilde, fakat farklı alan boyutlarıyla işlenir.

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

Eğer buraya geldiysek, 16\*256<sup>15</sup>'ten az olmayan bir anahtar aldık demektir. Fakat `cacheWrite` anahtarları sınırlar, bu yüzden 14\*256<sup>16</sup>'ya bile çıkamayız (bunun da bir 0xFE tarzında bir ilk baytı olurdu, yani `DONT_CACHE` gibi görünürdü). Fakat ilerde bir programcı girip de bir hata tanımlar diye bir test yapmak bize pek de pahalıya patlamaz.

```solidity
    } // encodeVal

}  // Cache
```

### Önbelleği test etme {#testing-the-cache}

Foundry'nin faydalarından biri de, testleri [testleri Solidity'de yazmanıza izin vermesidir](https://book.getfoundry.sh/forge/tests), bu sayede birim testi yazma kolaylaşır. `Cache` sınıfı için olan testler [buradadır](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Test kodu, testlerin kendileri de bu eğilimde olduğu gibi kendini tekrar eden bir konu olduğu için bu belge sadece ilgi çekici kısımları anlatacaktır.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

Bu, sadece test paketini ve `console.log`'u kullanmak için gerekli bir standarttır.

```solidity
import "src/Cache.sol";
```

Test ettiğimiz sözleşmeyi bilmemiz gerekir.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` fonksiyonu her testten önce çağrılır. Bu durumda sadece yeni bir önbellek oluşturacağız ki, testlerimiz birbirini etkilemesin.

```solidity
    function testCaching() public {
```

Testler, adları `test` ile başlayan fonksiyonlardır. Bu fonksiyon, değerler yazarak ve onları tekrar okuyarak temel önbellek işlevselliğini kontrol eder.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

[`assert...` fonksiyonları](https://book.getfoundry.sh/reference/forge-std/std-assertions) kullanarak asıl testi işte böyle yaparsınız. Bu durumda, yazdığımız değerin okuduğumuz değer olduğunu doğrularız. `cache.cacheWrite` sonucunu atabiliriz, çünkü önbellek anahtarlarının doğrusal olarak atandığını biliyoruz.

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Önce, her bir değeri önbelleğe yazarız ve anahtarların aynı olduğundan emin oluruz (ikinci yazmanın gerçekleşmediği anlamına gelir).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teoride, ardışık önbellek yazılarını etkilemeyen bir hata mevcut olabilir. Bu yüzden ardışık olmayan bazı yazılar yazacağız ve değerlerin hala yeniden yazılmamış olup olmadığını göreceğiz.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Bir `bytes memory` arabelleğinden 256 bitlik bir kelime okuyun. Bu yardımcı fonksiyon, önbelleği kullanan bir fonksiyon çağrısı yaptığımızda doğru sonuçları aldığımızı onaylamamızı sağlar.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul `uint256` öğesinin ötesindeki veri yapılarını desteklemez; yani `_bytes` bellek arabelleği gibi daha sofistike bir veri yapısına başvurduğunuzda o yapının adresini alırsınız. Solidity `bytes memory` değerlerini uzunluğu içeren 32 baytlık bir kelime olarak depolar. Ardından asıl baytlar gelir, yani bayt numarasını `_start` almak için `_bytes+32+_start` değerini hesaplamamız gerekir.

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Test için ihtiyacımız olan bazı sabit değerler.

```solidity
    function testReadParam() public {
```

`fourParams()` çağrısı, parametreleri doğru okuyabilmemiz için `readParams`'ı kullanan bir fonksiyondur.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Önbelleği kullanan bir fonksiyonu çağırmak için normal ABI mekanizmasını kullanamayız, bu yüzden düşük seviye olan [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) mekanizmasını kullanmamız gerekir. Bu mekanizma `bytes memory`'yi girdi olarak alır ve çıktı olarak (bir Boole değeri ile birlikte) verir.

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Aynı sözleşmenin hem önbelleklenmiş fonksiyonları (işlemlerden doğrudan gelen çağrılar için) hem de önbelleklenmemiş fonksiyonları (diğer akıllı sözleşmelerden gelen çağrılar için) desteklemesi kullanışlıdır. Bunu yapabilmek için Solidity mekanizmasının her şeyi [a `fallback` fonksiyonuna](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) koymasının yerine doğru fonksiyonu çağıracağına güvenmeye devam etmemiz gerekir. Bunu yapmak, birleştirilebilirliği çok daha kolay hale getirir. Fonksiyonu tanımlamak için çoğu durumda tek bir bayt yeterlidir, yani üç baytı (16\*3=48 gaz) boşa harcıyoruz. Bununla birlikte, ben bunu yazarken 48 gaz 0,07 sent ediyor, bu da daha basit, daha az hataya yatkın bir kod için makul bir ücrettir.

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

İlk değer: Önbelleğe yazılması gerekenin tam bir değer olduğunu söyleyen bir işaret ve ardından gelen değerin 32 baytlık kısmı. `VAL_B`'ın önbelleğe yazılmaması ve `VAL_C`'nin hem üçüncü hem de dördüncü parametre olması dışında diğer üç değer benzerdir.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Burası, `Cache` sözleşmesini asıl çağıracağımız yerdir.

```solidity
        assertEq(_success, true);
```

Çağrının başarılı olmasını umuyoruz.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Boş bir önbellekle başlıyor ve ardından `VAL_A` ile `VAL_C` öğelerini ekliyoruz. Birincinin anahtar 1'e, ikincinin de anahtar 2'ye sahip olmasını bekleriz.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Çıktımız, o 4 parametredir. Burada doğru olduğunu onaylıyoruz.

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

16'nın altında olan önbellek anahtarları sadece bir bayttır.

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Çağrıdan sonra yapılan testler, ilk çağrıdan sonra yapılanlarla aynı.

```solidity
    function testEncodeVal() public {
```

Bu fonksiyon, `testReadParam` ile benzerdir, parametreleri doğrudan yazmak için `encodeVal()` kullanıyor olmamız dışında.

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

`testEncodeVal()`'deki tek ekstra test, `_callInput`'un uzunluğunun doğruluğunu onaylamaktır. İlk çağrı için bu değer 4+33\*4'tür. İkinci için ise, zaten tüm değerler önbellekte olduğundan 4+1\*4 şeklindedir.

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Yukarıdaki `testEncodeVal` fonksiyonu, önbelleğe sadece 4 değer yazarr, bu yüzden [fonksiyonun çoklu bayt değerleriyle ilgilenen kısımları](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) kontrol edilmez. Fakat o kod karışık ve hataya açıktır.

Bu fonksiyonun ilk kısmı, önbelleğe 1 ila 0x1FFF değerlerini sırayla yazan bir döngüdür, bu sayede bu değerleri şifreleyebilecek ve nereye gittiklerini bilebileceğiz.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

Bir bayt, iki bayt ve üç bayt değerlerini test edin. Yeterli yığın girdisini yazmak çok uzun süreceğinden (en az 0x10000000, yaklaşık olarak bir milyarın çeyreği) bunun ötesinde test yapmıyoruz.

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

Yeterli parametrenin olmadığı anormal durumda ne olduğunu test edin.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Döndüğü için alacağımız sonuç `false` olmalıdır.

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Bu fonksiyon tamamen meşru dört parametre alır, önbelleğin boş olması sebebiyle okuyacak hiçbir değer olmaması dışında.

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

Bu fonksiyon, 5 değer gönderir. Beşinci değerin görmezden gelindiğini biliyoruz çünkü geçerli bir önbellek girdisi değildir ve dahil edilmemiş olsa geri dönme surumuna neden olurdu.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Bir örnek uygulama {#a-sample-app}

Solidity'de test yazmak çok güzeldir fakat günün sonunda bir merkeziyetsiz uygulamanın kullanışlı olabilmesi için zincirin dışından talepleri işleyebilmesi gerekir. Bu belge "Bir Kez Yaz, Çok Kez Oku" anlamına gelen `WORM` ile bir merkeziyetsiz uygulamada önbelleğe almanın nasıl kullanacağını gösterir. Eğer bir anahtar henüz yazılmamışsa, ona bir değer yazabilirsiniz. Eğer anahtar çoktan yazılmışsa, bir geri dönüş alırsınız.

### Sözleşme {#the-contract}

[Sözleşme budur](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Genel olarak `Cache` ve `CacheTest` ile çoktan yapmış olduğumuz şeyleri tekrar ediyor olduğu için sadece ilgi çekici olan kısımları ele alacağız.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`'i kullanmanın en kolay yolu, onu kendi sözleşmemize aktarmaktır.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Bu fonksiyon, yukarıdaki `CacheTest`'in içindeki `fourParam`'a benzer. ABI spesifikasyonlarına uymadığımız için bu fonksiyonun içine herhangi bir parametre beyan etmememiz en iyisidir.

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

ABI spesifikasyonlarına uymadığımız için `writeEntryCached` öğesini çağıran harici kodun çağrı verisini `worm.writeEntryCached` kullanmak yerine manuel olarak yazması gerekecektir. Bu sabit değere sahip olmak yazmayı kolaylaştırıyor.

`WRITE_ENTRY_CACHED` değerini bir durum değişkeni olarak tanımlamış olsak da, bunu harici olarak okuyabilmek için `worm.WRITE_ENTRY_CACHED()` getter fonksiyonunu kullanmanın gerekli olduğunu da not edin.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Okuma fonksiyonu bir `view`'dır, yani bir işleme ihtiyaç duymaz ve gaz harcamaz. Sonuç olarak, parametre için önbelleği kullanmanın bir faydası yoktur. Görünüm fonksiyonlarında daha basit olan standart mekanizmayı kullanmak en iyisidir.

### Test kodu {#the-testing-code}

[ Bu, sözleşmenin test kodudur](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Yine sadece ilgi çekici olan kısma bakalım.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Bu (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert), yeni çağrının başarısız olması gerektiğini ve bunun için belirtilen sebebi Foundry'de belirtme şeklimizdir. Bu, çağrı verisini oluşturup düşük seviye (`<contract>.call()`, vs.) arayüz kullanarak sözleşmeyi çağırmak yerine `<contract>.<function name>()` söz dizimini kullandığımız durumlarda geçerli olur.

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Burada `cacheWrite`'ın önbellek anahtarını döndürmesi gerçeğinden faydalanıyoruz. Bu, oluşturma sürecinde kullanmayı beklediğimiz bir şey değil, çünkü `cacheWrite` durum değiştirir ve bu yüzden sadece bir işlem sırasında çağrılabilir. İşlemlerin dönüş değerleri yoktur, eğer sonuçları olursa bu sonuçların olaylar olarak ifade edilmiş olmaları gerekir. Yani `cacheWrite` dönüş değerine sadece zincir üstü kod tarafından erişilebilir ve zincir üstü kod, parametre önbelleğe alımını desteklemez.

```solidity
        (_success,) = address(worm).call(_callInput);
```

`<contract address>.call()`'un iki değeri varken sadece ilk değeri önemsediğimizi Solidity'ye bu şekilde ifade ederiz.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Düşük seviye `<address>.call()` fonksiyonunu kullanmamız sebebiyle, `vm.expectRevert()`'ü kullanamayız ve çağrıdan alacağımız boole başarı değerine bakmamız gerekir.

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

Kodun Foundry'de [bir olayı doğru ifade ettiğini](https://book.getfoundry.sh/cheatcodes/expect-emit) bu şekilde doğrularız.

### İstemci {#the-client}

Solidity testleriyle sahip olamayacağınız tek şey, kendi uygulamanıza kesip yapıştırabileceğiniz JavaScript kodudur. O kodu yazmak için [Optimism'in](https://www.optimism.io/) yeni test ağı olan [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)'ye WORM dağıttım. [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a) adresindedir.

[İstemcinin Javascript kodunu burada görebilirsiniz](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Kullanmak için:

1. Git deposunu klonlayın:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Gerekli paketleri yükleyin:

   ```sh
   cd javascript
   yarn
   ```

3. Kurulum dosyasını kopyalayın:

   ```sh
   cp .env.example .env
   ```

4. Kurulumunuz için `.env`'i düzenleyin:

   | Parametre           | Değer                                                                                                                                                                                                       |
   | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC-ANIMSATICI | Bir işleme ödeyebilmek için yeterli ETH bulunduran bir hesap için bir anımsatıcı. [You can get free ETH for the Optimism Goerli ağı için bedava ETH'yi buradan alabilirsiniz](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | Optimisim Goerli'ye giden URL. Herkese açık bitiş noktası olan `https://goerli.optimism.io`, oran sınırlıdır fakat ihtiyacımız olan şey için yeterlidir                                                     |

5. `index.js` komutunu çalıştırın.

   ```sh
   node index.js
   ```

   Bu örnek uygulama ilk olarak WORM'a bir girdi yazar ve çağrı verisi ile Etherscan'deki işlemin bağlantısını görüntüler. Sonra da bu girişi geri okur, kullandığı anahtarı ve girdideki değerleri gösterir (değer, blok numarası ve yazarı).

Bu istemcinin çoğu normal Merkeziyetsiz Uygulama JavaScript'idir. Yani yine ilgi çekici kısımları ele alacağız.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

Verilmiş olan bu yuvanın içine sadece bir kere yazılabildiğinden yuvaları yeniden kullanmadığımızdan emin olmak için zaman damgasını kullanırız.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ether'ler çağrı verisinin bir onaltılık dizi olmasını, `0x` ve ardından da onaltılık bir çift sayı bekler. Hem `key` hem de `val` `0x` ile başladığından o başlıkları kaldırmamız gerekir.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity test kodunda olduğu gibi, önbelleğe alınmış bir fonksiyonu normal şekilde çağıramayız. Bunun yerine, daha düşük seviyede bir mekanizma kullanmaya ihtiyacımız var.

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Girdileri okumak için normal mekanizmayı kullanabiliriz. Parametre önbelleklemesini `view` fonksiyonlarıyla kullanmaya gerek yoktur.

## Sonuç {#conclusion}

Bu belgedeki kod, bir kavram ispatıdır; amaç, fikrin anlaşılmasını kolaylaştırmaktır. Oluşturmaya hazır bir sistem için biraz ilave işlevsellik eklemek isteyebilirsiniz:

- `uint256` olmayan değerleri işleyin. Örnek olarak, dizeler.
- Küresel önbellek yerine belki kullanıcılar ile önbellekler arasında bir eşlemeye sahip olmak. Farklı kullanıcılar farklı değerler kullanır.
- Adresler için kullanılan değerler farklı amaçlar için kullanılanlardan bağımsızdır. Sadece adresler için ayrı bir önbelleğe sahip olmak mantıklı olabilir.
- Güncel olarak, önbellek anahtarları "ilk gelene en küçük anahtar" algoritmasına göre çalışmaktadır. İlk on altı değer tek bir bayt olarak gönderilebilir. Sonraki 4080 değer iki bayt olarak gönderilebilir. Sonraki yaklaşık bir milyon değer ise 3 bayt olarak gönderilebilir, vs. Bir oluşturma sistemi, önbellek girişleri için kullanım sayaçları tutmalıdır ve onları, _en yaygın_ on altı değerin bir bayt, sonraki 4080 en yaygın değerin iki bayt olacağı şekilde yeniden düzenlemelidir.

  Yine de, bu risk barındıran bir işlemdir. Aşağıdaki olay dizisini hayal edin:

  1. Noam Naive, jeton göndermek istediği adresi şifrelemek için `encodeVal`'ı çağırır. O adres, uygulamada kullanan ilk adreslerden biridir, bu yüzden şifrelenmiş değer 0x06 olur. Bu, bir işlem değil, bir `view` fonksiyonudur. Yani Noam ile kullandığı düğüm arasındadır ve başka hiç kimse, hakkında bir bilgiye sahip değildir

  2. Owen Owner, önbelleği yeniden düzenleme işlemini çalıştırıyor. Çok az kişi gerçek anlamda bu adresi kullanıyor, bu yüzden artık 0x201122 diye şifreleniyor. 0x06, farklı bir değere 10<sup>18</sup> atanmış.

  3. Noam Naive, jetonlarını 0x06'ya gönderiyor. `0x0000000000000000000000000de0b6b3a7640000` adresine gidiyorlar ve kimse bu adresin özel kodunu bilmediği için orada takılıp kalıyorlar. Noam _mutlu değil_.

  Önbelleği yeniden düzenleme işlemi sırasında bu ve bellek havuzundaki bununla bağlantılı işlemler problemini çözmenin çok sayıda yolu olsa da, bunun farkında olmalısınız.

Burada Optimism ile önbelleklemeyi gösterdim, çünkü ben bir Optimism çalışanıyım ve bu da benim en iyi bildiğim toplamadır. Fakat dahili işlemeye minimum maliyet yükleyen her toplama için çalışması gerekir. Dolayısıyla karşılaştırma yaptığımızda işlem verilerini L1'e yazmak daha büyük maliyettir.
