---
title: "Çağrı Verisi Optimizasyonu için Kısa ABI'ler"
description: Akıllı sözleşmeleri İyimser Toplamalar için optimize etme
author: Ori Pomerantz
lang: tr
tags:
  - "katman 2"
skill: beginner
published: 2022-04-01
---

## Giriş {#introduction}

Bu makalede [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups), onların işlem ücretleri ve bu farklı maliyet yapısının Ethereum Ana Ağı'ndakilere göre farklı şeyler için optimizasyon yapmamızı nasıl şart koştuğu hakkında bilgi edineceksiniz. Aynı zamanda bu optimizasyon işlemini nasıl uygulayacağınızı da göreceksiniz.

### Bilgilendirme {#full-disclosure}

Ben tam zamanlı bir [ "Optimism"](https://www.optimism.io/) çalışanıyım, bu yüzden bu makaledeki örnekler Optimism üzerinde çalışabilecek örnekler olacaktır. Ancak, burada anlatacağım teknik diğer toplamalarda da işe yarayacaktır.

### Terminoloji {#terminology}

Toplamalar üzerinde konuşurken üretim Ethereum Ağı olan Ana Ağ için "katman 1 (L1)" terimi kullanılacaktır. "Katman 2 (L2)" terimi ise toplama veya güvenliği L1'e dayanan fakat işlemlerinin çoğunu zincir dışında yapan her türlü sistem için kullanılacaktır.

## L2 işlemlerinin maliyetlerini nasıl daha da azaltabiliriz? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[İyimser toplamalar](/developers/docs/scaling/optimistic-rollups), insanların sonradan gözden geçirip durumun doğru olup olmadığını kontrol edebilmesi için tüm geçmiş işlemlerin kayıtlarını tutmalıdır. Verileri Ethereum Ana Ağı'na sokabilmenin en uygun yolu, onları çağrı verisi olarak yazmaktır. Bu çözüm, hem [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) hem de [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) tarafından tercih edilmiştir.

### L2 işlemlerinin maliyeti {#cost-of-l2-transactions}

L2 işlemlerinin maliyetleri iki bileşenden oluşur:

1. L2 işlemi, genelde çok ucuzdur
2. L1 depolaması, Ana Ağ'ın gaz ücretlerine bağlıdır

Bunu yazarken, Optimism'de L2 gazının maliyeti 0,001 [Gwei](/developers/docs/gas/#pre-london) idi. L1 gazının maliyeti ise şu an yaklaşık 40 Gwei'dir. [Güncel fiyatları buradan inceleyebilirsiniz](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Çağrı verisinin bir baytı 4 gaz (eğer sıfırsa) veya 16 gazdır (eğer farklı bir değerse). EVM'deki en pahalı işlemlerden biri, depolamaya yazmaktır. 32 baytlık bir kelimeyi L2'deki bir depoya yazmanın maksimum maliyeti 22100 gazdır. Şu anda bu 22,1 Gwei'ye tekabül ediyor. Yani eğer sıfır baytlık bir çağrı verisi tasarruf etmemiz, depolamaya 200 bayt bile yazsak hala kârda olabileceğimizi gösteriyor.

### ABI {#the-abi}

İşlemlerin büyük bir çoğunluğu, bir sözleşmeye dıştan sahiplenilmiş bir hesaptan erişir. Çoğu sözleşme Solidity ile yazılmıştır ve veri alanlarını [uygulama ikili arayüzü (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) ile uyumlu olacak şekilde yorumlar.

Bununla birlikte ABI, bir çağrı verisi baytının maliyetinin yaklaşık olarak dört aritmetik işlemle aynı olduğu L1 için tasarlanmıştır; bir çağrı verisi baytının bin aritmetik işlemden daha pahalı olduğu L2 için değil. Örneğin, [bir ERC-20 transfer işlemini burada bulabilirsiniz](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998). Çağrı verisi şu şekilde bölünür:

| Bölüm            | Uzunluk | Baytlar | Harcanan bayt | Harcanan gaz | Gereken bayt | Gereken gaz |
| ---------------- | ------: | ------: | ------------: | -----------: | -----------: | ----------: |
| Fonksiyon seçici |       4 |     0-3 |             3 |           48 |            1 |          16 |
| Sıfırlar         |      12 |    4-15 |            12 |           48 |            0 |           0 |
| Varış adresi     |      20 |   16-35 |             0 |            0 |           20 |         320 |
| Miktar           |      32 |   36-67 |            17 |           64 |           15 |         240 |
| Toplam           |      68 |         |               |          160 |              |         576 |

Açıklama:

- **İşlem Seçici**: Sözleşmenin 256'den az fonksiyonu var, yani bunları tek bir baytla ayrıştırabiliriz. Bu baytların değeri genelde sıfırdan farklıdır ve bu sebeple [maliyetleri 16 gazdır](https://eips.ethereum.org/EIPS/eip-2028).
- **Sıfırlar**: Bu baytlar her zaman 0'dır çünkü 20 baytlık bir adres onu tutabilmek için 32 baytlık bir kelimeye ihtiyaç duymaz. 4 gaz tutan 0 maliyetli baytlar ([sarı kağıdı inceleyin](https://ethereum.github.io/yellowpaper/paper.pdf), Ek G, sayfa 27, `G`<sub>`txdatazero`</sub> değeri).
- **Miktar**: Bu sözleşmede `decimals` değerinin on sekiz (normal değer) ve transfer edilecek maksimum jeton sayısının da 10<sup>18</sup> olduğunu varsayarsak, maksimum 10<sup>36</sup> gibi bir miktar elde ederiz. 256<sup>15</sup> &gt; 10<sup>36</sup>, yani 15 bayt yeterlidir.

L1 üzerinde harcanan 160 gaz normalde göz ardı edilebilir bir değerdir. Bir işlemin maliyeti en az [21.000 gazdır](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), yani ekstra %0,8'in bir önemi yoktur. Fakat L2'de işler biraz daha farklıdır. Buradaki işlem maliyetinin neredeyse tamamı işlemi L1'e yazmaktır. İşlem çağrı verisine ek olarak, 109 baytlık bir işlem başlığı vardır (varış adresi, imza vs.). Toplam maliyet `109*16+576+160=2480` kadardır ve bunun %65'ini boşa harcıyoruz.

## Hedefi kontrol etmediğimiz durumlarda maliyetleri azaltma {#reducing-costs-when-you-dont-control-the-destination}

Hedef sözleşme üzerinde kontrolünüz olmadığını varsayarsak, yine de [buna](https://github.com/qbzzt/ethereum.org-20220330-shortABI) benzer bir çözüm yolu kullanabilirsiniz. Hadi ilgili dosyalara bir göz atalım.

### Token.sol {#token-sol}

[Bu, hedef sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). Bu, bir ek özellikle gelen standart bir ERC-20 sözleşmesidir. Bu `faucet`, her kullanıcının kullanabilmek için biraz jeton almasını sağlar. Bu, üretim ERC-20 sözleşmesini gereksiz kılabilecek olsa da, ERC-20 sadece test yapmayı kolaylaştırmak amaçlı var olduğunda işleri gerçekten kolaylaştırıyor.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[Burada bu sözleşmenin dağıtılmış olduğu bir örneği görebilirsiniz](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Bu, işlemlerin daha küçük çağrı verileriyle çağırması gereken sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). Hadi satır satır inceleyelim.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Nasıl çağırabileceğimizi bilmek için jeton işlevine ihtiyacımız var.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Bizim vekil olduğumuz jetonun adresi.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Jetonun adresi belirtmemiz gereken tek parametredir.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Çağrı verisinden bir değer okuyalım.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

32 baytlık (256 bit) tek bir kelimeyi belleğe yükleyecek ve istediğimiz alanın bir parçası olmayan baytlardan kurtulacağız. Bu algoritma, 32 bayttan daha büyük değerler için işe yaramaz ve tabi ki çağrı verisini okuyup geçemeyiz. L1'de gaz tasarrufu için bu testleri atlamak gerekli olabilir fakat L2'de gaz oldukça ucuzdur ve düşünebileceğimiz her mantık kontrolünü yapabilmemize olanak sağlar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

`fallback()` (aşağıya bakın) çağrısından verileri kopyalayabilirdik, fakat EVM'nin derleme dili olan [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)'u kullanmak daha kolaydır.

Burada, baytları okuyup yığına yerleştirmek için (`startByte` ve `startByte+31`) [CALLDATALOAD işlem kodunu](https://www.evm.codes/#35) kullanıyoruz. Genelde, Yul'daki bir işlem kodunun söz dizimi şu şekildedir: `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Sadece en önemli `length` baytları alanın bir parçasıdır, bu yüzden diğer verilerden kurtulmak için [sağa kaydırma](https://en.wikipedia.org/wiki/Logical_shift) kullanıyoruz. Bu işlem, değeri alanın sağına taşıma avantajını sağlıyor; yani değer çarpı 256<sup>something</sup> yerine değerin kendisini kullanmış oluyoruz.

```solidity

        return _retVal;
    }


    fallback() external {
```

Bir Solidity sözleşmesine yapılan çağrı hiçbir işlev imzasıyla eşleşmezse, [`fallback()` fonksiyonunu](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) çağırır (bir tane olduğunu varsayarak). `CalldataInterpreter` söz konusu olduğunda, başka bir `external` veya `public` işlev olmadığından _her_ çağrı buraya ulaşır.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Çağrı verisinin ilk baytını okuyun, bu bize fonksiyonu anlatır. Burada bir fonksiyonun ulaşılabilir olmamasının iki sebebi vardır:

1. `pure` veya `view` olan fonksiyonlar, durumu değiştirmezler ve gaz maliyetleri yoktur (zincir dışı olarak çağrıldıklarında). O yüzden gaz maliyetini düşürmeye çalışmanın da bir anlamı yoktur.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)'a bağımlı olan fonksiyonlar. `msg.sender`'ın değeri, çağıranın değil `CalldataInterpreter`'ın adresi olacaktır.

Malesef, [ERC-20'nin özelliklerine bakıldığında](https://eips.ethereum.org/EIPS/eip-20) bu bize sadece bir fonksiyon bırakıyor: `transfer`. Bu da bize 2 fonsiyon bırakıyor: `transfer` (çünkü `transferFrom` çağrısı yapabiliyoruz) ve `faucet` (çünkü jetonları bizi kim çağırdıysa ona transfer edebiliyoruz).

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

`faucet()`'a yapılan parametresiz bir çağrı.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`'i çağırdıktan sonra jetonlara sahip oluyoruz. Fakat vekil sözleşmesi olarak, jetonlara **ihtiyaç** duymuyoruz. Ama EOA (dışarıdan sahip olunan hesap) ya da bizi çağıran sözleşme duyuyor. Yani biz bizi kim çağırırsa ona tüm jetonlarımızı transfer ediyoruz.

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

Jeton transferi iki parametreye ihtiyaç duyuyor: hedef adres ve miktar.

```solidity
            token.transferFrom(
                msg.sender,
```

Kullanıcıların sadece kendi sahip oldukları jetonları transfer etmesine izin veriyoruz

```solidity
                address(uint160(calldataVal(1, 20))),
```

Hedef adres, 1 numaralı baytta başlıyor (0 numaralı bayt fonksiyonun kendisi). Bir adres olarak uzunluğu 20 bayttır.

```solidity
                calldataVal(21, 2)
```

Bu spesifik sözleşme için birinin isteyebileceği maksimum jeton sayısının 2 bayta sığacağını varsayıyoruz (65536'dan daha az).

```solidity
            );
        }
```

Ortalama olarak bir transfer 35 bayt kadar çağrı verisi kaplar:

| Bölüm            | Uzunluk |  Bayt |
| ---------------- | ------: | ----: |
| Fonksiyon seçici |       1 |     0 |
| Varış adresi     |      32 |  1-32 |
| Miktar           |       2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Bu Javascript birim testi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) bize bu mekanizmayı nasıl kullanacağımızı (ve nasıl doğru çalışacağını onaylayacağımızı) gösteriyor. [chai](https://www.chaijs.com/) and [ethers](https://docs.ethers.io/v5/) kısımlarını anladığınızı varsayıp sadece sözleşme için geçerli olan kısımları anlatacağım.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Her iki sözleşmeyi dağıtarak başlıyoruz.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

Normalde işlem oluşturmak için kullandığımız yüksek seviyeli fonksiyonları (`token.faucet()` gibi) kullanamıyoruz, çünkü biz ABI'yi uygulamıyoruz. Bunun yerine, işlemi kendimiz oluşturmalı ve sonrasında göndermeliyiz.

```javascript
      to: cdi.address,
      data: "0x01"
```

İşlem için temin etmemiz gereken 2 parametre var:

1. `to`, hedef adres. Bu, çağrı verisi yorumlama sözleşmesidir.
2. `data`, gönderilecek çağrı verisi. Bir musluk çağrısı durumunda veri tek bayttır, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

[İmza sahibinin `sendTransaction` yöntemini](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) çağırıyoruz. Çünkü hedefi çoktan belirledik (`faucetTx.to`) ve artık imzalanacak olan işleme ihtiyacımız var.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Burada bakiyeyi onaylıyoruz. `view` fonsiyonlarında gaz tasarrufuna gerek yoktur, bu yüzden bunları sadece normal şekilde çalıştırıyoruz.

```javascript
// CDI'ye bir izin verin (onaylar vekalet edilemez)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Çağrı verisi yorumlayıcısına transferleri yapabilmesi için bir ödenek verin.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Bir transfer işlemi oluşturun. İlk bayt "0x02"dir ve ardından hedef adres gelir; son olarak da miktar bulunur (0x0100, ondalık olarak 256).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### Örnek {#example}

Bu dosyaları kendiniz çalıştırmadan çalışırken görmek istiyorsanız, şu bağlantıları izleyin:

1. [ `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744)'ın [`0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8) adresine dağıtılması.
2. [`CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745)'ın [`0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55) adresine dağıtılması.
3. [`faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746) çağrısı.
4. [`OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747) çağrısı. Bu çağrı doğrudan jeton sözleşmesine gider, çünkü işleme `msg.sender`'a dayanır.
5. [`transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748) çağrısı.

## Hedef sözleşmeyi kontrol ederken maliyeti azaltma {#reducing-the-cost-when-you-do-control-the-destination-contract}

Eğer hedef sözleşme üzerinde gerçekten kontrolünüz varsa `msg.sender`'i atlatabilen fonksiyonlar oluşturabilirsiniz. Çünkü bunlar çağrı verisi yorumlayıcısına güvenir. [Burada bunun, `control-contract` bölümü](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract) içerisinde nasıl çalıştığına dair bir örnek görebilirsiniz.

Eğer sözleşme sadece harici sözleşmelere cevap veriyorsa, bunu sadece tek bir sözleşmeye sahip olarak halledebiliriz. Fakat bu [birleştirilebilirliiği](/developers/docs/smart-contracts/composability/) bozardı. Normal ERC-20 çağrılarına yanıt veren bir sözleşmeye ve küçük çağrı verilerine cevap verebilen başka bir sözleşmeye sahip olmak çok daha iyidir.

### Token.sol {#token-sol-2}

Bu örnekte, `Token.sol`'u modifiye ediyoruz. Bu, bizim sadece vekilin çağırabileceği bir çok fonksiyona sahip olmamızı sağlıyor. İşte yeni bölümler:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-2O sözleşmesi yetkili vekilin kimliğini bilmelidir. Fakat, oluşturucu içindeki bu değişkeni biz ayarlayamayız, çünkü değeri henüz bilmiyoruz. Bu sözleşme, vekil jetonun adresinin oluşturucusunda olmasını beklediğinden ilk somutlaştırılan sözleşmedir.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Vekili belirlemesine izin verilen tek adres olduğundan yaratıcının adresi (`owner`) de burada depolanır.

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Güvenlik kontrollerini atlayabildiği için vekilin ayrıcalıklı erişimi vardır. Vekile güvenebileceğimizden emin olmak için bu fonksiyonu sadece 1 kereliğine `owner`'ın çağırmasına izin veriyoruz. `proxy`'nin gerçek bir değeri olduğunda (sıfır dışında), o değer değişemez; sözleşme sahibi kötü niyetli olarak bunu değiştirmeye kalksa veya anımsatıcısı açığa çıksa bile hala güvendeyiz demektir.

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

Bu [`modifier` fonksiyonudur](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) ve diğer fonksiyonların çalışma şeklini değiştirebilir.

```solidity
      require(msg.sender == proxy);
```

İlk olarak, başkası tarafından değil, vekil tarafından çağrıldığımızı doğrulayalım. Eğer değilse, `revert` kullanın.

```solidity
      _;
    }
```

Doğrulayabiliyorsa, değiştirdiğimiz fonksiyonu çalıştıralım.

```solidity
   /* Proxy'nin hesaplar için gerçekten proxy yapmasına izin veren işlevler */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Bunlar normalde mesajın doğrudan jeton aktaran veya bir ödeneği onaylayan kuruluştan gelmesini gerektiren üç işlemdir. Burada bu işlemlerin şu nitelikleri taşıyan vekil versiyonları mevcuttur:

1. Başka hiç kimse kontrol sahibi olamasın diye `onlyProxy()` tarafından değiştirilmiş.
2. Normalde `msg.sender` olan adresi ekstra parametre olarak alan.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Çağrı verisi yorumlayıcısı neredeyse yukardakiyle aynı olmasına rağmen şu noktada ayrışır: vekil fonksiyonlar `msg.sender` parametresi alır ve `transfer` için herhangi bir ödeneğe ihtiyaç yoktur.

```solidity
        // transfer (no need for allowance)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Az önceki test kodları ve aşağıdakinin arasında birkaç değişiklik vardır.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20 sözleşmesine hangi vekil sunucuya güveneceğini aktarmamız gerekir

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` ve `transferFrom()`'u kontrol edebilmek için ikinci bir imza sahibine ihtiyacımız var. Buna `poorSigner` adını veriyoruz çünkü bizim jetonlarımızın hiçbirini almıyor (elbette ETH sahibi olmasına gerek yok).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 sözleşmesi (`cdi`) vekile güvendiğinden transferleri aktarmak için ödeneğe ihtiyaç duymayız.

```js
// approval and transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

İki yeni fonksiyonu test edin. `transferFromTx` öğesinin iki adres parametresi gerektirdiğini unutmayın: ödeneği veren ve alıcı.

### Örnek {#example-2}

Bu dosyaları kendiniz çalıştırmadan çalışırken görmek istiyorsanız, şu bağlantıları izleyin:

1. [`OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397)'ın [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696) adresine dağıtılması.
2. [`CalldataInterpreter`'ın](https://kovan-optimistic.etherscan.io/tx/1475400)[`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892) adresine dağıtılması.
3. [`setProxy()`](https://kovan-optimistic.etherscan.io/tx/1475402) çağrısı.
4. [`faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409) çağrısı.
5. [`transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416) çağrısı.
6. [`approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419) çağrısı.
7. [`transferFromProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421) çağrısı. Bu çağrının diğerlerinden farklı bir adresten geldiğini de unutmayın; `poorSigner` yerine `signer`.

## Sonuç {#conclusion}

Hem [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) hem de [Arbitrum](https://developer.offchainlabs.com/docs/special_features), L1'e yazılan çağrı verilerinin boyutunu ve dolayısıyla işlem maliyetlerini azaltmanın yollarını aramaktadır. Fakat altyapı sağlayıcıları genel çözümler arıyorken, bizim yapabileceklerimiz sınırlıdır. Merkeziyetsiz uygulama geliştiricisi olarak uygulamaya özel bilgilere sahipsiniz. Bu da sizin çağrı verilerinizi bizim genel bir çözümle yapabileceğimize göre çok daha iyi optimize edebilmenizi mümkün kılar. Umarım bu makale, ihtiyaçlarınız için ideal çözümler bulmanıza yardımcı olur.
