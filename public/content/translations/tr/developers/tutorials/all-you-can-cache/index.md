---
title: "Önbelleğe alabildiğiniz kadar"
description: Daha ucuz Rollup işlemleri için bir önbelleğe alma sözleşmesinin nasıl oluşturulacağını ve kullanılacağını öğrenin
author: Ori Pomerantz
tags: ["katman 2", "önbelleğe alma", "depolama", "ölçeklendirme"]
skill: intermediate
breadcrumb: Toplamalar için önbelleğe alma
published: 2022-09-15
lang: tr
---

Toplamalar kullanıldığında, işlemdeki bir baytın maliyeti bir depolama slotunun maliyetinden çok daha pahalıdır. Bu nedenle, zincir içi olarak mümkün olduğunca fazla bilgiyi önbelleğe almak mantıklıdır.

Bu makalede, birden çok kez kullanılması muhtemel herhangi bir parametre değerinin önbelleğe alınacağı ve (ilk seferden sonra) çok daha az sayıda bayt ile kullanıma sunulacağı şekilde bir önbelleğe alma sözleşmesinin nasıl oluşturulup kullanılacağını ve bu önbelleği kullanan zincir dışı kodun nasıl yazılacağını öğreneceksiniz.

Makaleyi atlayıp sadece kaynak kodunu görmek isterseniz, [buradadır](https://github.com/qbzzt/20220915-all-you-can-cache). Geliştirme yığını [Foundry](https://getfoundry.sh/introduction/installation/)'dir.

## Genel tasarım {#overall-design}

Basitlik adına tüm işlem parametrelerinin `uint256` yani 32 bayt uzunluğunda olduğunu varsayacağız. Bir işlem aldığımızda, her parametreyi şu şekilde ayrıştıracağız:

1. İlk bayt `0xFF` ise, sonraki 32 baytı bir parametre değeri olarak alın ve önbelleğe yazın.

2. İlk bayt `0xFE` ise, sonraki 32 baytı bir parametre değeri olarak alın ancak önbelleğe _yazmayın_.

3. Diğer herhangi bir değer için, en üstteki dört biti ek bayt sayısı olarak ve en alttaki dört biti önbellek anahtarının en anlamlı bitleri olarak alın. İşte bazı örnekler:

   | Çağrı verisindeki baytlar | Önbellek anahtarı |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Önbellek manipülasyonu {#cache-manipulation}

Önbellek [`Önbellek.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) içinde uygulanmıştır. Satır satır üzerinden geçelim.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Bu sabitler, tüm bilgileri sağladığımız ve önbelleğe yazılmasını isteyip istemediğimiz özel durumları yorumlamak için kullanılır. Önbelleğe yazmak, daha önce kullanılmamış depolama slotlarına her biri 22100 gaz maliyetinde iki [`SSTORE`](https://www.evm.codes/#55) işlemi gerektirir, bu yüzden bunu isteğe bağlı hale getiriyoruz.

```solidity

    mapping(uint => uint) public val2key;
```

Değerler ve anahtarları arasında bir [eşleme](https://www.geeksforgeeks.org/solidity/solidity-mappings/). Bu bilgi, işlemi göndermeden önce değerleri kodlamak için gereklidir.

```solidity
    // n konumu, n+1 anahtarı için değere sahiptir, çünkü korumamız gerekir
    // sıfırı "önbellekte değil" olarak.
    uint[] public key2val;
```

Anahtarlardan değerlere eşleme için bir dizi kullanabiliriz çünkü anahtarları biz atıyoruz ve basitlik adına bunu sıralı olarak yapıyoruz.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Önbellekten bir değer okuyun.

```solidity
    // Eğer zaten orada değilse önbelleğe bir değer yaz
    // Sadece testin çalışmasını sağlamak için public
    function cacheWrite(uint _value) public returns (uint) {
        // Eğer değer zaten önbellekteyse, mevcut anahtarı döndür
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Aynı değeri önbelleğe birden fazla kez koymanın bir anlamı yoktur. Değer zaten oradaysa, sadece mevcut anahtarı döndürün.

```solidity
        // 0xFE özel bir durum olduğundan, önbelleğin tutabileceği en büyük anahtar
        // 0x0D ve ardından gelen 15 adet 0xFF'tir. Eğer önbellek uzunluğu zaten bu kadar
        // büyükse, başarısız ol.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Bu kadar büyük bir önbelleğe (yaklaşık 1.8\*10<sup>37</sup> girdi, ki bu depolamak için yaklaşık 10<sup>27</sup> TB gerektirir) ulaşacağımızı sanmıyorum. Ancak, ["640kB her zaman yeterli olacaktır"](https://quoteinvestigator.com/2011/09/08/640k-enough/) sözünü hatırlayacak kadar yaşlıyım. Bu test çok ucuzdur.

```solidity
        // Sonraki anahtarı kullanarak değeri yaz
        val2key[_value] = key2val.length+1;
```

Ters aramayı (değerden anahtara) ekleyin.

```solidity
        key2val.push(_value);
```

İleri aramayı (anahtardan değere) ekleyin. Değerleri sıralı olarak atadığımız için, onu sadece son dizi değerinden sonra ekleyebiliriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Yeni değerin depolandığı hücre olan `key2val`'nin yeni uzunluğunu döndürün.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Bu işlev, çağrı verisinden rastgele uzunlukta (kelime boyutu olan 32 bayta kadar) bir değer okur.

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Bu işlev dahilidir, bu nedenle kodun geri kalanı doğru yazılmışsa bu testler gerekli değildir. Ancak, maliyetleri yüksek olmadığı için onları da ekleyebiliriz.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Bu kod [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) dilindedir. Çağrı verisinden 32 baytlık bir değer okur. Bu, çağrı verisi `startByte+32`'dan önce dursa bile çalışır çünkü EVM'deki başlatılmamış alanın sıfır olduğu kabul edilir.

```solidity
        _retVal = _retVal >> (256-length*8);
```

İlla ki 32 baytlık bir değer istemiyoruz. Bu, fazla baytlardan kurtulmayı sağlar.

```solidity
        return _retVal;
    } // _calldataVal


    // Çağrı verisinden _fromByte'tan başlayarak tek bir parametre oku
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Çağrı verisinden tek bir parametre okuyun. Parametreler 1 bayt ile 33 bayt arasında değişebileceğinden, sadece okuduğumuz değeri değil, aynı zamanda bir sonraki baytın konumunu da döndürmemiz gerektiğine dikkat edin.

```solidity
        // İlk bayt bize geri kalanını nasıl yorumlayacağımızı söyler
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity, potansiyel olarak tehlikeli [örtük tür dönüşümlerini](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) yasaklayarak hata sayısını azaltmaya çalışır. Örneğin 256 bitten 8 bite düşürme işleminin açıkça belirtilmesi gerekir.

```solidity

        // Değeri oku, ancak önbelleğe yazma
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Değeri oku ve önbelleğe yaz
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Eğer buraya geldiysek, önbellekten okumamız gerektiği anlamına gelir

        // Okunacak ekstra bayt sayısı
        uint8 _extraBytes = _firstByte / 16;
```

Alt [yarım baytı (nibble)](https://en.wikipedia.org/wiki/Nibble) alın ve değeri önbellekten okumak için diğer baytlarla birleştirin.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n adet parametre oku (fonksiyonlar kaç parametre beklediklerini bilir)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Sahip olduğumuz parametre sayısını çağrı verisinin kendisinden alabilirdik, ancak bizi çağıran işlevler kaç parametre beklediklerini bilirler. Bunu bize onların söylemesine izin vermek daha kolaydır.

```solidity
        // Okuduğumuz parametreler
        uint[] memory params = new uint[](_paramNum);

        // Parametreler 4. bayttan başlar, ondan öncesi fonksiyon imzasıdır
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

İhtiyacınız olan sayıya ulaşana kadar parametreleri okuyun. Çağrı verisinin sonunu geçersek, `_readParams` çağrıyı geri alacaktır.

```solidity

        return(params);
    }   // readParams

    // _readParams'ı test etmek için dört parametre okumayı test et
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry'nin büyük bir avantajı, testlerin Solidity'de yazılmasına izin vermesidir ([aşağıdaki Önbelleği test etme bölümüne bakın](#testing-the-cache)). Bu, birim testlerini çok daha kolay hale getirir. Bu, dört parametreyi okuyan ve testin doğru olduklarını doğrulayabilmesi için onları döndüren bir işlevdir.

```solidity
    // Bir değer al, onu kodlayacak baytları döndür (mümkünse önbelleği kullanarak)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`, zincir dışı kodun önbelleği kullanan çağrı verisi oluşturmaya yardımcı olmak için çağırdığı bir işlevdir. Tek bir değer alır ve onu kodlayan baytları döndürür. Bu işlev bir `view` işlevidir, bu nedenle bir işlem gerektirmez ve dışarıdan çağrıldığında herhangi bir gaz maliyeti yoktur.

```solidity
        uint _key = val2key[_val];

        // Değer henüz önbellekte değil, ekle
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)'de başlatılmamış tüm depolamanın sıfır olduğu varsayılır. Bu yüzden orada olmayan bir değerin anahtarını ararsak, sıfır elde ederiz. Bu durumda onu kodlayan baytlar `INTO_CACHE` (böylece bir dahaki sefere önbelleğe alınacaktır) ve ardından gerçek değerdir.

```solidity
        // Eğer anahtar <0x10 ise, onu tek bir bayt olarak döndür
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Tek baytlar en kolayıdır. Bir `bytes<n>` türünü herhangi bir uzunlukta olabilen bir bayt dizisine dönüştürmek için sadece [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) kullanırız. Adına rağmen, sadece bir argüman sağlandığında gayet iyi çalışır.

```solidity
        // İki baytlık değer, 0x1vvv olarak kodlanmış
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>'ten küçük bir anahtarımız olduğunda, onu iki bayt ile ifade edebiliriz. Önce 256 bitlik bir değer olan `_key`'yi 16 bitlik bir değere dönüştürürüz ve ilk bayta ek bayt sayısını eklemek için mantıksal VEYA (OR) kullanırız. Sonra onu `bytes`'a dönüştürülebilen bir `bytes2` değerine dönüştürürüz.

```solidity
        // Aşağıdaki satırları bir döngü olarak yapmanın muhtemelen zekice bir yolu vardır,
        // ancak bu bir view fonksiyonu, bu yüzden programcı zamanı ve
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

Diğer değerler (3 bayt, 4 bayt vb.) aynı şekilde, sadece farklı alan boyutlarıyla işlenir.

```solidity
        // Eğer buraya gelirsek, bir şeyler yanlış demektir.
        revert("Error in encodeVal, should not happen");
```

Buraya gelirsek, 16\*256<sup>15</sup>'ten küçük olmayan bir anahtar aldığımız anlamına gelir. Ancak `cacheWrite` anahtarları sınırlar, bu yüzden 14\*256<sup>16</sup>'ya kadar bile çıkamayız (ki bunun ilk baytı 0xFE olurdu, bu yüzden `DONT_CACHE` gibi görünürdü). Ancak gelecekteki bir programcının bir hata (bug) eklemesi ihtimaline karşı bir test eklemek bize çok pahalıya mal olmaz.

```solidity
    } // encodeVal

}  // Cache
```

### Önbelleği test etme {#testing-the-cache}

Foundry'nin avantajlarından biri, [testleri Solidity'de yazmanıza izin vermesidir](https://getfoundry.sh/forge/tests/overview/), bu da birim testleri yazmayı kolaylaştırır. `Cache` sınıfı için testler [buradadır](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Test kodu, testlerin doğası gereği tekrarlayıcı olduğundan, bu makale yalnızca ilginç kısımları açıklamaktadır.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Konsol için `forge test -vv` çalıştırmak gerekir.
import "forge-std/console.sol";
```

Bu, test paketini ve `console.log`'yi kullanmak için gerekli olan standart bir koddur (boilerplate).

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

`setUp` işlevi her testten önce çağrılır. Bu durumda, testlerimizin birbirini etkilememesi için sadece yeni bir önbellek oluşturuyoruz.

```solidity
    function testCaching() public {
```

Testler, adları `test` ile başlayan işlevlerdir. Bu işlev, değerleri yazıp tekrar okuyarak temel önbellek işlevselliğini kontrol eder.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Gerçek testi [`assert...` işlevlerini](https://getfoundry.sh/reference/forge-std/std-assertions/) kullanarak bu şekilde yaparsınız. Bu durumda, yazdığımız değerin okuduğumuz değer olduğunu kontrol ediyoruz. Önbellek anahtarlarının doğrusal olarak atandığını bildiğimiz için `cache.cacheWrite` sonucunu göz ardı edebiliriz.

```solidity
        }
    }    // testCaching


    // Aynı değeri birden çok kez önbelleğe al, anahtarın aynı kaldığından
    // emin ol
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Önce her değeri önbelleğe iki kez yazarız ve anahtarların aynı olduğundan emin oluruz (bu, ikinci yazmanın aslında gerçekleşmediği anlamına gelir).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teorik olarak ardışık önbellek yazmalarını etkilemeyen bir hata olabilir. Bu yüzden burada ardışık olmayan bazı yazmalar yapıyoruz ve değerlerin hala yeniden yazılmadığını görüyoruz.

```solidity
    // Bir bellek arabelleğinden bir uint oku (gönderdiğimiz parametreleri geri aldığımızdan
    // emin olmak için)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Bir `bytes memory` arabelleğinden 256 bitlik bir kelime okuyun. Bu yardımcı işlev, önbelleği kullanan bir işlev çağrısı çalıştırdığımızda doğru sonuçları aldığımızı doğrulamamızı sağlar.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul, `uint256` ötesindeki veri yapılarını desteklemez, bu nedenle bellek arabelleği `_bytes` gibi daha karmaşık bir veri yapısına başvurduğunuzda, o yapının adresini alırsınız. Solidity, `bytes memory` değerlerini uzunluğu içeren 32 baytlık bir kelime ve ardından gerçek baytlar olarak depolar, bu nedenle `_start` numaralı baytı elde etmek için `_bytes+32+_start` hesaplamamız gerekir.

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() için fonksiyon imzası, kaynağı:
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Sadece doğru değerleri geri aldığımızı görmek için bazı sabit değerler
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Test için ihtiyaç duyduğumuz bazı sabitler.

```solidity
    function testReadParam() public {
```

Parametreleri doğru okuyabildiğimizi test etmek için `readParams` kullanan bir işlev olan `fourParams()`'yı çağırın.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Önbelleği kullanan bir işlevi çağırmak için normal ABI mekanizmasını kullanamayız, bu nedenle düşük seviyeli [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) mekanizmasını kullanmamız gerekir. Bu mekanizma girdi olarak bir `bytes memory` alır ve çıktı olarak bunu (ve ayrıca bir Boolean değeri) döndürür.

```solidity
        // İlk çağrı, önbellek boş
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Aynı sözleşmenin hem önbelleğe alınmış işlevleri (doğrudan işlemlerden gelen çağrılar için) hem de önbelleğe alınmamış işlevleri (diğer akıllı sözleşmelerden gelen çağrılar için) desteklemesi yararlıdır. Bunu yapmak için, her şeyi [bir `fallback` işlevine](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) koymak yerine, doğru işlevi çağırmak için Solidity mekanizmasına güvenmeye devam etmemiz gerekir. Bunu yapmak birleştirilebilirliği çok daha kolay hale getirir. Çoğu durumda işlevi tanımlamak için tek bir bayt yeterli olacaktır, bu nedenle üç bayt (16\*3=48 gaz) israf ediyoruz. Ancak, ben bunu yazarken bu 48 gazın maliyeti 0.07 senttir, ki bu daha basit, hataya daha az açık bir kod için makul bir maliyettir.

```solidity
            // İlk değer, onu önbelleğe ekle
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

İlk değer: Önbelleğe yazılması gereken tam bir değer olduğunu belirten bir bayrak ve ardından değerin 32 baytı. Diğer üç değer de benzerdir, tek fark `VAL_B`'nin önbelleğe yazılmaması ve `VAL_C`'nın hem üçüncü hem de dördüncü parametre olmasıdır.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Burası aslında `Cache` sözleşmesini çağırdığımız yerdir.

```solidity
        assertEq(_success, true);
```

Çağrının başarılı olmasını bekliyoruz.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Boş bir önbellekle başlıyoruz ve ardından `VAL_A` ve sonrasında `VAL_C` ekliyoruz. İlkinin 1, ikincisinin ise 2 anahtarına sahip olmasını bekleriz.

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

16'nın altındaki önbellek anahtarları sadece bir bayttır.

```solidity
            // İkinci değer, onu önbelleğe ekleme
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

Bu işlev, parametreleri açıkça yazmak yerine `encodeVal()` kullanmamız dışında `testReadParam` ile benzerdir.

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

`testEncodeVal()` içindeki tek ek test, `_callInput` uzunluğunun doğru olduğunu doğrulamaktır. İlk çağrı için bu 4+33\*4'tür. Her değerin zaten önbellekte olduğu ikinci çağrı için ise 4+1\*4'tür.

```solidity
    // Anahtar tek bir bayttan fazla olduğunda encodeVal'i test et
    // Maksimum üç bayt çünkü önbelleği dört bayta kadar doldurmak çok
    // uzun sürer.
    function testEncodeValBig() public {
        // Önbelleğe bir dizi değer koy.
        // İşleri basit tutmak için, n değeri için n anahtarını kullan.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Yukarıdaki `testEncodeVal` işlevi önbelleğe yalnızca dört değer yazar, bu nedenle [işlevin çok baytlı değerlerle ilgilenen kısmı](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) kontrol edilmez. Ancak bu kod karmaşıktır ve hataya açıktır.

Bu işlevin ilk kısmı, 1'den 0x1FFF'ye kadar olan tüm değerleri sırayla önbelleğe yazan bir döngüdür, böylece bu değerleri kodlayabilecek ve nereye gittiklerini bilebileceğiz.

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

Bir baytlık, iki baytlık ve üç baytlık değerleri test edin. Bunun ötesini test etmiyoruz çünkü yeterli yığın girdisi yazmak çok uzun sürer (en az 0x10000000, yaklaşık çeyrek milyar).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Aşırı küçük bir arabellek ile geri al aldığımızı test et
    function testShortCalldata() public {
```

Yeterli parametrenin olmadığı anormal durumda ne olacağını test edin.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Geri alındığı için almamız gereken sonuç `false` olmalıdır.

```
// Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // İlk değer, onu önbelleğe ekle
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Bu işlev, önbelleğin boş olması ve okunacak hiçbir değer olmaması dışında tamamen geçerli dört parametre alır.

```solidity
        .
        .
        .
    // Aşırı uzun bir arabellek ile her şeyin düzgün çalıştığını test et
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // İlk çağrı, önbellek boş
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // İkinci değer, onu önbelleğe ekle
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Üçüncü değer, onu önbelleğe ekle
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Dördüncü değer, onu önbelleğe ekle
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Ve "iyi şanslar" için başka bir değer
            bytes4(0x31112233)
        );
```

Bu işlev beş değer gönderir. Beşinci değerin geçerli bir önbellek girdisi olmadığı için göz ardı edildiğini biliyoruz, ki bu dahil edilmeseydi bir geri almaya neden olurdu.

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

Solidity'de testler yazmak çok güzeldir, ancak günün sonunda bir merkeziyetsiz uygulamanın (dapp) yararlı olabilmesi için zincir dışından gelen istekleri işleyebilmesi gerekir. Bu makale, "Bir Kere Yaz, Çok Kere Oku" (Write Once, Read Many) anlamına gelen `WORM` ile bir merkeziyetsiz uygulamada (dapp) önbelleğe almanın nasıl kullanılacağını göstermektedir. Bir anahtar henüz yazılmamışsa, ona bir değer yazabilirsiniz. Anahtar zaten yazılmışsa, bir geri alma (revert) alırsınız.

### Sözleşme {#the-contract}

[Sözleşme budur](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Çoğunlukla `Cache` ve `CacheTest` ile zaten yaptıklarımızı tekrarlar, bu yüzden sadece ilginç olan kısımları ele alıyoruz.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` kullanmanın en kolay yolu, onu kendi sözleşmemizde devralmaktır (inherit).

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Bu işlev, yukarıdaki `CacheTest` içindeki `fourParam` ile benzerdir. ABI spesifikasyonlarını takip etmediğimiz için, işleve herhangi bir parametre bildirmemek en iyisidir.

```solidity
    // Bizi çağırmayı kolaylaştır
    // writeEntryCached() için fonksiyon imzası, kaynağı:
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

`writeEntryCached` çağıran harici kodun, ABI spesifikasyonlarını takip etmediğimiz için `worm.writeEntryCached` kullanmak yerine çağrı verisini manuel olarak oluşturması gerekecektir. Bu sabit değere sahip olmak sadece onu yazmayı kolaylaştırır.

`WRITE_ENTRY_CACHED`'yı bir durum değişkeni olarak tanımlamamıza rağmen, onu dışarıdan okumak için onun alıcı (getter) işlevi olan `worm.WRITE_ENTRY_CACHED()`'u kullanmanın gerekli olduğuna dikkat edin.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Okuma işlevi bir `view` işlevidir, bu nedenle bir işlem gerektirmez ve gaz maliyeti yoktur. Sonuç olarak, parametre için önbelleği kullanmanın hiçbir faydası yoktur. View (görüntüleme) işlevlerinde daha basit olan standart mekanizmayı kullanmak en iyisidir.

### Test kodu {#the-testing-code}

[Bu, sözleşme için test kodudur](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Yine, sadece ilginç olanlara bakalım.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Bu (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert), bir Foundry testinde bir sonraki çağrının başarısız olması gerektiğini ve başarısızlık için bildirilen nedeni nasıl belirttiğimizdir. Bu, çağrı verisini oluşturmak ve düşük seviyeli arayüzü (`<contract>.call()` vb.) kullanarak sözleşmeyi çağırmak yerine `<contract>.<function name>()` sözdizimini kullandığımızda geçerlidir.

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Burada `cacheWrite`'ın önbellek anahtarını döndürdüğü gerçeğini kullanıyoruz. Bu, üretimde kullanmayı beklediğimiz bir şey değildir, çünkü `cacheWrite` durumu değiştirir ve bu nedenle yalnızca bir işlem sırasında çağrılabilir. İşlemlerin dönüş değerleri yoktur, eğer sonuçları varsa bu sonuçların olaylar olarak yayınlanması (emit) gerekir. Bu nedenle `cacheWrite` dönüş değerine yalnızca zincir içi koddan erişilebilir ve zincir içi kodun parametre önbelleğe almaya ihtiyacı yoktur.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Bu, Solidity'ye `<contract address>.call()`'un iki dönüş değeri olmasına rağmen yalnızca ilkiyle ilgilendiğimizi söyleme şeklimizdir.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Düşük seviyeli `<address>.call()` işlevini kullandığımız için `vm.expectRevert()` kullanamayız ve çağrıdan aldığımız boolean başarı değerine bakmamız gerekir.

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

Bu, Foundry'de kodun [bir olayı doğru bir şekilde yayınladığını](https://getfoundry.sh/reference/cheatcodes/expect-emit/) doğrulama yöntemimizdir.

### İstemci {#the-client}
Solidity testleriyle elde edemediğiniz bir şey, kendi uygulamanıza kesip yapıştırabileceğiniz JavaScript kodudur. Bu kodu yazmak için WORM'u [Optimism'in](https://www.optimism.io/) yeni test ağı olan [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)'ye dağıttım. [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a) adresinde bulunuyor.

[İstemci için JavaScript kodunu buradan görebilirsiniz](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Kullanmak için:

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

   | Parametre           | Değer                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | Bir işlem için ödeme yapmaya yetecek kadar ETH'si olan bir hesabın anımsatıcısı (mnemonic). [Optimism Goerli ağı için buradan ücretsiz ETH alabilirsiniz](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | Optimism Goerli URL'si. Genel uç nokta olan `https://goerli.optimism.io` hız sınırlıdır ancak burada ihtiyacımız olan şey için yeterlidir                                      |

5. `index.js` komutunu çalıştırın.

   ```sh
   node index.js
   ```

   Bu örnek uygulama önce WORM'a bir girdi yazar, çağrı verisini ve Etherscan'deki işlemin bir bağlantısını görüntüler. Ardından bu girdiyi geri okur ve kullandığı anahtarı ve girdideki değerleri (değer, blok numarası ve yazar) görüntüler.

İstemcinin çoğu normal Dapp JavaScript'idir. Bu yüzden yine sadece ilginç kısımların üzerinden geçeceğiz.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Her seferinde yeni bir anahtara ihtiyaç var
    const key = await worm.encodeVal(Number(new Date()))
```

Belirli bir slota yalnızca bir kez yazılabilir, bu nedenle slotları yeniden kullanmadığımızdan emin olmak için zaman damgasını kullanırız.

```javascript
const val = await worm.encodeVal("0x600D")

// Bir girdi yaz
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers, çağrı verisinin bir onaltılık (hex) dize olmasını, `0x` ve ardından çift sayıda onaltılık basamak gelmesini bekler. Hem `key` hem de `val`, `0x` ile başladığından, bu başlıkları kaldırmamız gerekir.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity test kodunda olduğu gibi, önbelleğe alınmış bir işlevi normal şekilde çağıramayız. Bunun yerine, daha düşük seviyeli bir mekanizma kullanmamız gerekir.

```javascript
    .
    .
    .
    // Az önce yazılan girdiyi oku
    const realKey = '0x' + key.slice(4)  // FF bayrağını kaldır
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Girdileri okumak için normal mekanizmayı kullanabiliriz. `view` işlevleriyle parametre önbelleğe almayı kullanmaya gerek yoktur.

## Sonuç {#conclusion}

Bu makaledeki kod bir kavram kanıtıdır (proof of concept), amacı fikrin anlaşılmasını kolaylaştırmaktır. Üretime hazır bir sistem için bazı ek işlevler uygulamak isteyebilirsiniz:

- `uint256` olmayan değerleri işleyin. Örneğin, dizeler (strings).
- Küresel bir önbellek yerine, belki kullanıcılar ve önbellekler arasında bir eşleme yapın. Farklı kullanıcılar farklı değerler kullanır.
- Adresler için kullanılan değerler, diğer amaçlar için kullanılanlardan farklıdır. Sadece adresler için ayrı bir önbelleğe sahip olmak mantıklı olabilir.
- Şu anda önbellek anahtarları "ilk gelen, en küçük anahtarı alır" algoritmasındadır. İlk on altı değer tek bir bayt olarak gönderilebilir. Sonraki 4080 değer iki bayt olarak gönderilebilir. Sonraki yaklaşık bir milyon değer üç bayttır vb. Bir üretim sistemi, önbellek girdilerinde kullanım sayaçları tutmalı ve bunları _en yaygın_ on altı değer bir bayt, sonraki en yaygın 4080 değer iki bayt vb. olacak şekilde yeniden düzenlemelidir.

  Ancak, bu potansiyel olarak tehlikeli bir işlemdir. Aşağıdaki olaylar dizisini hayal edin:

  1. Noam Naive, token göndermek istediği adresi kodlamak için `encodeVal` çağırır. Bu adres uygulamada ilk kullanılanlardan biridir, bu nedenle kodlanmış değer 0x06'dır. Bu bir `view` işlevidir, bir işlem değildir, bu yüzden Noam ile kullandığı düğüm arasındadır ve başka kimse bunu bilmez.

  2. Owen Owner önbellek yeniden sıralama işlemini çalıştırır. Aslında çok az kişi bu adresi kullanır, bu yüzden artık 0x201122 olarak kodlanmıştır. Farklı bir değere, 10<sup>18</sup>'e, 0x06 atanır.

  3. Noam Naive token'larını 0x06'ya gönderir. `0x0000000000000000000000000de0b6b3a7640000` adresine giderler ve kimse bu adresin özel anahtarını bilmediği için orada öylece sıkışıp kalırlar. Noam _hiç mutlu değildir_.

  Bu sorunu ve önbellek yeniden sıralaması sırasında bellek havuzunda (mempool) bulunan işlemlerle ilgili sorunu çözmenin yolları vardır, ancak bunun farkında olmalısınız.

Burada önbelleğe almayı Optimism ile gösterdim, çünkü ben bir Optimism çalışanıyım ve en iyi bildiğim Rollup bu. Ancak, dahili işleme için minimum bir maliyet talep eden herhangi bir Rollup ile çalışmalıdır, böylece karşılaştırmalı olarak işlem verilerini L1'e yazmak ana masraf olur.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).