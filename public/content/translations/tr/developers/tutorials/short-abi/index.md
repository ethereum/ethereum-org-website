---
title: "Çağrı Verisi Optimizasyonu için Kısa ABI'ler"
description: "İyimser Toplamalar için akıllı sözleşmeleri optimize etme"
author: Ori Pomerantz
lang: tr
tags: [ "katman 2" ]
skill: intermediate
published: 2022-04-01
---

## Giriş {#introduction}

Bu makalede [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups), bunların işlem maliyetleri ve bu farklı maliyet yapısının Ethereum Ana Ağı'ndakinden farklı şeyler için optimizasyon yapmamızı nasıl gerektirdiği hakkında bilgi edineceksiniz.
Ayrıca bu optimizasyonu nasıl uygulayacağınızı da öğreneceksiniz.

### Tam beyan {#full-disclosure}

Ben tam zamanlı bir [Optimism](https://www.optimism.io/) çalışanıyım, bu nedenle bu makaledeki örnekler Optimism üzerinde çalışacaktır.
Ancak, burada açıklanan teknik diğer toplamalar için de aynı şekilde çalışmalıdır.

### Terminoloji {#terminology}

Toplamalar tartışılırken, üretim Ethereum ağı olan Ana Ağ için 'katman 1' (L1) terimi kullanılır.
'Katman 2' (L2) terimi, güvenlik için L1'e dayanan ancak işlemlerinin çoğunu zincir dışında yapan toplama veya diğer herhangi bir sistem için kullanılır.

## L2 işlemlerinin maliyetini nasıl daha da düşürebiliriz? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[İyimser toplamalar](/developers/docs/scaling/optimistic-rollups), herkesin bunları inceleyebilmesi ve mevcut durumun doğru olduğunu doğrulayabilmesi için her geçmiş işlemin kaydını tutmak zorundadır.
Verileri Ethereum Ana Ağı'na almanın en ucuz yolu, onları çağrı verisi olarak yazmaktır.
Bu çözüm hem [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) hem de [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) tarafından seçilmiştir.

### L2 işlemlerinin maliyeti {#cost-of-l2-transactions}

L2 işlemlerinin maliyeti iki bileşenden oluşur:

1. Genellikle son derece ucuz olan L2 işleme
2. Ana Ağ gaz maliyetlerine bağlı olan L1 depolaması

Bu yazıyı yazarken Optimism'de L2 gaz maliyeti 0,001 [Gwei](/developers/docs/gas/#pre-london)'dir.
Öte yandan L1 gazının maliyeti ise yaklaşık 40 gwei'dir.
[Mevcut fiyatları buradan görebilirsiniz](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Bir çağrı verisi baytının maliyeti, sıfır ise 4 gaz, başka bir değer ise 16 gazdır.
EVM'deki en pahalı işlemlerden biri depolamaya yazmaktır.
32 baytlık bir kelimeyi L2'de depolamaya yazmanın maksimum maliyeti 22.100 gazdır. Şu anda bu, 22,1 gwei'dir.
Dolayısıyla, çağrı verisinden yalnızca sıfır değerli tek bir bayt tasarruf edebilirsek, depolamaya yaklaşık 200 bayt yazabilir ve yine de kârlı çıkabiliriz.

### ABI {#the-abi}

İşlemlerin büyük bir çoğunluğu, bir sözleşmeye dıştan sahiplenilmiş bir hesaptan erişir.
Çoğu sözleşme Solidity ile yazılmıştır ve veri alanlarını [uygulama ikili arayüzüne (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) göre yorumlar.

Ancak ABI, bir çağrı verisi baytının maliyetinin yaklaşık olarak dört aritmetik işlemle aynı olduğu L1 için tasarlanmıştır, bir çağrı verisi baytının bin aritmetik işlemden daha pahalı olduğu L2 için değil.
Çağrı verisi şu şekilde bölünür:

| Bölüm            | Uzunluk |  Bayt | İsraf edilen bayt | İsraf edilen gaz | Gerekli bayt | Gerekli gaz |
| ---------------- | ------: | ----: | ----------------: | ---------------: | -----------: | ----------: |
| Fonksiyon seçici |       4 |   0-3 |                 3 |               48 |            1 |          16 |
| Sıfırlar         |      12 |  4-15 |                12 |               48 |            0 |           0 |
| Hedef adresi     |      20 | 16-35 |                 0 |                0 |           20 |         320 |
| Miktar           |      32 | 36-67 |                17 |               64 |           15 |         240 |
| Toplam           |      68 |       |                   |              160 |              |         576 |

Açıklama:

- **Fonksiyon seçici**: Sözleşmenin 256'dan az fonksiyonu olduğundan, bunları tek bir baytla ayırt edebiliriz.
  Bu baytlar genellikle sıfır değildir ve bu nedenle [maliyeti 16 gazdır](https://eips.ethereum.org/EIPS/eip-2028).
- **Sıfırlar**: Bu baytlar her zaman sıfırdır çünkü yirmi baytlık bir adres, onu tutmak için otuz iki baytlık bir kelime gerektirmez.
  Sıfır değeri taşıyan baytların maliyeti dört gazdır ([sarı bültene bakın](https://ethereum.github.io/yellowpaper/paper.pdf), Ek G,
  s. 27, `G`<sub>`txdatazero`</sub> değeri için).
- **Miktar**: Bu sözleşmede `decimals` değerinin on sekiz (normal değer) olduğunu ve transfer edeceğimiz maksimum jeton miktarının 10<sup>18</sup> olacağını varsayarsak, maksimum 10<sup>36</sup> tutarında bir miktar elde ederiz.
  256<sup>15</sup> > 10<sup>36</sup>, yani on beş bayt yeterlidir.

L1'de 160 gazlık bir israf normalde ihmal edilebilir düzeydedir. Bir işlemin maliyeti en az [21.000 gazdır](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), bu nedenle fazladan %0,8'lik bir oran önemli değildir.
Ancak L2'de işler farklıdır. İşlem maliyetinin neredeyse tamamı, işlemi L1'e yazmaktır.
İşlem çağrı verisine ek olarak 109 baytlık bir işlem başlığı (hedef adresi, imza vb.) bulunur.
Bu nedenle toplam maliyet `109*16+576+160=2480` olup bunun yaklaşık %6,5'ini boşa harcıyoruz.

## Hedef sözleşmeyi kontrol etmediğinizde maliyetleri düşürme {#reducing-costs-when-you-dont-control-the-destination}

Hedef sözleşme üzerinde kontrolünüz olmadığını varsayarsak, yine de [buna](https://github.com/qbzzt/ethereum.org-20220330-shortABI) benzer bir çözüm kullanabilirsiniz.
İlgili dosyalara bir göz atalım.

### Token.sol {#token-sol}

[Bu, hedef sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Bu, bir ek özelliğe sahip standart bir ERC-20 sözleşmesidir.
Bu `faucet` fonksiyonu, herhangi bir kullanıcının kullanmak üzere bir miktar jeton almasını sağlar.
Bu, bir üretim ERC-20 sözleşmesini kullanışsız hale getirse de bir ERC-20 yalnızca testi kolaylaştırmak için mevcut olduğunda işleri kolaylaştırır.

```solidity
    /**
     * @dev Çağırana oynaması için 1000 jeton verir
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Bu, işlemlerin daha kısa çağrı verisi ile çağırması gereken sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Satır satır üzerinden geçelim.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Onu nasıl çağıracağımızı bilmek için jeton fonksiyonuna ihtiyacımız var.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Vekil olduğumuz jetonun adresi.

```solidity

    /**
     * @dev Jeton adresini belirtin
     * @param tokenAddr_ ERC-20 sözleşme adresi
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Jeton adresi, belirtmemiz gereken tek parametredir.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Çağrı verisinden bir değer okuyun.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal uzunluk sınırı 32 bayttır");

        require(length + startByte <= msg.data.length,
            "calldataVal, calldatasize ötesini okumaya çalışıyor");
```

Belleğe tek bir 32 baytlık (256 bit) kelime yükleyeceğiz ve istediğimiz alanın parçası olmayan baytları kaldıracağız.
Bu algoritma 32 bayttan uzun değerler için çalışmaz ve elbette çağrı verisinin sonundan ötesini okuyamayız.
L1'de gazdan tasarruf etmek için bu testleri atlamak gerekebilir, ancak L2'de gaz son derece ucuzdur, bu da aklımıza gelebilecek her türlü mantık kontrolünü yapmamızı sağlar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Verileri `fallback()` çağrısından (aşağıya bakın) kopyalayabilirdik, ancak EVM'nin assembly dili olan [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) dilini kullanmak daha kolaydır.

Burada `startByte` ile `startByte+31` arasındaki baytları yığına okumak için [CALLDATALOAD işlem kodunu](https://www.evm.codes/#35) kullanıyoruz.
Genel olarak, Yul'daki bir işlem kodunun sözdizimi `<işlem kodu adı>(<varsa ilk yığın değeri>,<varsa ikinci yığın değeri>...)` şeklindedir.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Alanın yalnızca en anlamlı `uzunluktaki` baytları parçasıdır, bu nedenle diğer değerlerden kurtulmak için [sağa kaydırma](https://en.wikipedia.org/wiki/Logical_shift) yaparız.
Bu, değeri alanın sağına taşıma gibi ek bir avantaja sahiptir, dolayısıyla değerin kendisidir, değer çarpı 256<sup>bir şey</sup> değildir.

```solidity

        return _retVal;
    }


    fallback() external {
```

Bir Solidity sözleşmesine yapılan bir çağrı, işlev imzalarından herhangi biriyle eşleşmediğinde, [`fallback()` işlevini](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) çağırır (varsa).
`CalldataInterpreter` durumunda, başka `external` veya `public` işlevler olmadığı için _herhangi bir_ çağrı buraya gelir.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Bize işlevi söyleyen çağrı verisinin ilk baytını okuyun.
Bir işlevin burada mevcut olmamasının iki nedeni vardır:

1. `pure` veya `view` olan işlevler durumu değiştirmez ve gaza mal olmaz (zincir dışı çağrıldığında).
   Gaz maliyetlerini düşürmeye çalışmanın bir anlamı yoktur.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)'a dayanan işlevler.
   `msg.sender` değeri, arayanın değil `CalldataInterpreter` adresinin adresi olacaktır.

Ne yazık ki, [ERC-20 belirtimlerine bakıldığında](https://eips.ethereum.org/EIPS/eip-20), bu geriye yalnızca bir işlev bırakır: `transfer`.
Bu bize sadece iki işlev bırakıyor: `transfer` (`transferFrom` çağırabildiğimiz için) ve `faucet` (jetonları bizi çağıran kişiye geri aktarabildiğimiz için).

```solidity

        // Çağrı verisindeki bilgileri kullanarak jetonun durum değiştirme
        // yöntemlerini çağırın

        // faucet
        if (_func == 1) {
```

Parametresi olmayan `faucet()` çağrısı.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()` öğesini çağırdıktan sonra jetonları alırız. Ancak, vekil sözleşmesi olarak jetonlara **ihtiyacımız yok**.
Bizi arayan EOA (harici olarak sahip olunan hesap) veya sözleşmenin ihtiyacı var.
Bu yüzden tüm jetonlarımızı bizi arayan kişiye aktarıyoruz.

```solidity
        // transfer (bunun için bir yetkimiz olduğunu varsayalım)
        if (_func == 2) {
```

Jeton transferi iki parametre gerektirir: hedef adres ve miktar.

```solidity
            token.transferFrom(
                msg.sender,
```

Arayanların yalnızca sahip oldukları jetonları transfer etmelerine izin veriyoruz

```solidity
                address(uint160(calldataVal(1, 20))),
```

Hedef adresi 1 numaralı bayttan başlar (0 numaralı bayt işlevdir).
Bir adres olarak 20 bayt uzunluğundadır.

```solidity
                calldataVal(21, 2)
```

Bu özel sözleşme için, herhangi birinin transfer etmek isteyeceği maksimum jeton sayısının iki bayta (65536'dan az) sığdığını varsayıyoruz.

```solidity
            );
        }
```

Genel olarak, bir transfer 35 bayt çağrı verisi alır:

| Bölüm            | Uzunluk |  Bayt |
| ---------------- | ------: | ----: |
| Fonksiyon seçici |       1 |     0 |
| Hedef adresi     |      32 |  1-32 |
| Miktar           |       2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Bu JavaScript birim testi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) bize bu mekanizmanın nasıl kullanılacağını (ve doğru çalışıp çalışmadığını nasıl doğrulayacağımızı) gösterir.
[chai](https://www.chaijs.com/) ve [ethers](https://docs.ethers.io/v5/)'ı anladığınızı varsayacağım ve yalnızca sözleşmeye özel olarak uygulanan kısımları açıklayacağım.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Jetonları kullanmamıza izin vermeli", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Jeton adresi:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter adresi:", cdi.address)

    const signer = await ethers.getSigner()
```

Her iki sözleşmeyi de dağıtarak başlıyoruz.

```javascript
    // Oynamak için jetonları al
    const faucetTx = {
```

ABI'yi takip etmediğimiz için, normalde kullanacağımız üst düzey işlevleri (`token.faucet()` gibi) işlem oluşturmak için kullanamayız.
Bunun yerine, işlemi kendimiz oluşturmalı ve sonra göndermeliyiz.

```javascript
      to: cdi.address,
      data: "0x01"
```

İşlem için sağlamamız gereken iki parametre vardır:

1. `to`, hedef adres.
   Bu, çağrı verisi yorumlayıcı sözleşmesidir.
2. `data`, gönderilecek çağrı verisi.
   Bir musluk çağrısı durumunda, veri tek bir bayttır, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

İmzalayanın `sendTransaction` yöntemini çağırırız çünkü hedefi zaten belirttik (`faucetTx.to`) ve işlemin imzalanması gerekiyor.

```javascript
// Musluğun jetonları doğru bir şekilde sağladığını kontrol edin
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Burada bakiyeyi doğruluyoruz.
`view` işlevlerinde gaz tasarrufu yapmaya gerek yoktur, bu yüzden onları normal bir şekilde çalıştırırız.

```javascript
// CDI'ye bir yetki verin (onaylar vekil aracılığıyla yapılamaz)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Transfer yapabilmesi için çağrı verisi yorumlayıcısına bir yetki verin.

```javascript
// Jetonları transfer et
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Bir transfer işlemi oluşturun. İlk bayt "0x02"dir, bunu hedef adresi ve son olarak miktar (0x0100, ondalık sistemde 256'dır) takip eder.

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 256 jeton daha azımız olduğunu kontrol edin
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Ve hedefimizin onları aldığını
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Hedef sözleşmeyi kontrol ettiğinizde maliyeti düşürme {#reducing-the-cost-when-you-do-control-the-destination-contract}

Hedef sözleşme üzerinde kontrolünüz varsa, çağrı verisi yorumlayıcısına güvendikleri için `msg.sender` kontrollerini atlayan işlevler oluşturabilirsiniz.
[Bunun nasıl çalıştığına dair bir örneği `control-contract` dalında buradan görebilirsiniz](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Sözleşme yalnızca harici işlemlere yanıt veriyorsa, yalnızca bir sözleşmeye sahip olarak idare edebilirdik.
Ancak bu, [birleştirilebilirliği](/developers/docs/smart-contracts/composability/) bozar.
Normal ERC-20 çağrılarına yanıt veren bir sözleşmeye ve kısa çağrı verili işlemlere yanıt veren başka bir sözleşmeye sahip olmak çok daha iyidir.

### Token.sol {#token-sol-2}

Bu örnekte `Token.sol` dosyasını değiştirebiliriz.
Bu, yalnızca vekilin çağırabileceği bir dizi işleve sahip olmamızı sağlar.
İşte yeni kısımlar:

```solidity
    // CalldataInterpreter adresini belirtmesine izin verilen tek adres
    address owner;

    // CalldataInterpreter adresi
    address proxy = address(0);
```

ERC-20 sözleşmesinin yetkili vekilin kimliğini bilmesi gerekir.
Ancak, değeri henüz bilmediğimiz için bu değişkeni kurucuda ayarlayamayız.
Bu sözleşme ilk olarak örneklenir çünkü vekil, kurucusunda jetonun adresini bekler.

```solidity
    /**
     * @dev ERC20 kurucusunu çağırır.
     */
    constructor(
    ) ERC20("Oris'in işe yaramaz jetonu-2", "OUT-2") {
        owner = msg.sender;
    }
```

Oluşturanın adresi (`owner` olarak adlandırılır) burada saklanır çünkü vekili ayarlamasına izin verilen tek adres budur.

```solidity
    /**
     * @dev Vekil için adresi ayarla (CalldataInterpreter).
     * Yalnızca sahip tarafından bir kez çağrılabilir
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Yalnızca sahip tarafından çağrılabilir");
        require(proxy == address(0), "Vekil zaten ayarlanmış");

        proxy = _proxy;
    }    // function setProxy
```

Vekil, güvenlik kontrollerini atlayabildiği için ayrıcalıklı erişime sahiptir.
Vekile güvenebileceğimizden emin olmak için, bu işlevi yalnızca `owner`ın ve yalnızca bir kez çağırmasına izin veriyoruz.
`proxy` gerçek bir değere (sıfır değil) sahip olduğunda, bu değer değiştirilemez, bu nedenle sahibi dolandırıcı olmaya karar verse veya anımsatıcısı ortaya çıksa bile yine de güvendeyiz.

```solidity
    /**
     * @dev Bazı işlevler yalnızca vekil tarafından çağrılabilir.
     */
    modifier onlyProxy {
```

Bu bir [`değiştirici` işlevidir](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), diğer işlevlerin çalışma şeklini değiştirir.

```solidity
      require(msg.sender == proxy);
```

İlk olarak, vekil tarafından arandığımızı ve başka kimsenin aramadığını doğrulayın.
Değilse, `revert`.

```solidity
      _;
    }
```

Eğer öyleyse, değiştirdiğimiz işlevi çalıştırın.

```solidity
   /* Vekilin hesaplar için gerçekten vekillik yapmasına izin veren işlevler */

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

Bunlar normalde mesajın doğrudan jetonları transfer eden veya bir yetkiyi onaylayan kuruluştan gelmesini gerektiren üç işlemdir.
Burada bu işlemlerin şu nitelikleri taşıyan vekil versiyonları mevcuttur:

1. `onlyProxy()` tarafından değiştirilmiştir, böylece başka kimsenin onları kontrol etmesine izin verilmez.
2. Normalde `msg.sender` olacak adresi ekstra bir parametre olarak alır.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Çağrı verisi yorumlayıcısı, vekil işlevlerin bir `msg.sender` parametresi alması ve `transfer` için bir yetkiye gerek olmaması dışında, yukarıdakiyle neredeyse aynıdır.

```solidity
        // transfer (yetkiye gerek yok)
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

Önceki test kodu ile bu kod arasında birkaç değişiklik var.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20 sözleşmesine hangi vekile güveneceğini söylememiz gerekiyor

```js
console.log("CalldataInterpreter adresi:", cdi.address)

// Yetkileri doğrulamak için iki imzalayan gerekir
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` ve `transferFrom()` kontrol etmek için ikinci bir imzalayana ihtiyacımız var.
Buna `poorSigner` diyoruz çünkü jetonlarımızdan hiçbirini almıyor (tabii ki ETH'ye sahip olması gerekiyor).

```js
// Jetonları transfer et
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 sözleşmesi vekile (`cdi`) güvendiği için, transferleri iletmek için bir yetkiye ihtiyacımız yok.

```js
// onay ve transferFrom
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

// Onay / transferFrom kombinasyonunun doğru yapıldığını kontrol edin
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

İki yeni işlevi test edin.
`transferFromTx` öğesinin iki adres parametresi gerektirdiğini unutmayın: yetkiyi veren ve alan.

## Sonuç {#conclusion}

Hem [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) hem de [Arbitrum](https://developer.offchainlabs.com/docs/special_features), L1'e yazılan çağrı verisinin boyutunu ve dolayısıyla işlem maliyetini düşürmenin yollarını arıyor.
Ancak, genel çözümler arayan altyapı sağlayıcıları olarak yeteneklerimiz sınırlıdır.
Merkeziyetsiz uygulama geliştiricisi olarak, uygulamaya özel bilgiye sahipsiniz, bu da çağrı verilerinizi genel bir çözümde yapabileceğimizden çok daha iyi optimize etmenizi sağlar.
Umarım bu makale ihtiyaçlarınız için ideal çözümü bulmanıza yardımcı olur.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

