---
title: "Çağrı Verisi Optimizasyonu için Kısa ABI'ler"
description: "İyimser Toplamalar (Optimistic Rollups) için akıllı sözleşmeleri optimize etme"
author: Ori Pomerantz
lang: tr
tags: ["katman 2 (L2)"]
skill: intermediate
breadcrumb: "Kısa ABI'ler"
published: 2022-04-01
---

## Giriş {#introduction}

Bu makalede, [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups), bunlar üzerindeki işlemlerin maliyeti ve bu farklı maliyet yapısının bizi Ethereum Ana Ağı'ndakinden farklı şeyler için optimize etmeye nasıl zorladığı hakkında bilgi edineceksiniz.
Ayrıca bu optimizasyonu nasıl uygulayacağınızı da öğreneceksiniz.

### Tam açıklama {#full-disclosure}

Tam zamanlı bir [Optimism](https://www.optimism.io/) çalışanıyım, bu nedenle bu makaledeki örnekler Optimism üzerinde çalışacaktır.
Ancak, burada açıklanan teknik diğer toplamalar için de aynı derecede iyi çalışmalıdır.

### Terminoloji {#terminology}

Toplamalar tartışılırken, 'katman 1 (L1)' terimi, üretim Ethereum ağı olan Ana Ağ için kullanılır.
'katman 2 (L2)' terimi, Rollup veya güvenlik için L1'e dayanan ancak işlemlerinin çoğunu zincir dışı yapan diğer herhangi bir sistem için kullanılır.

## L2 işlemlerinin maliyetini nasıl daha da azaltabiliriz? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[İyimser toplamalar](/developers/docs/scaling/optimistic-rollups), herkesin bunları inceleyebilmesi ve mevcut durumun doğru olduğunu doğrulayabilmesi için her geçmiş işlemin bir kaydını tutmalıdır.
Bu makale yazıldığında, Ethereum Ana Ağı'na veri almanın en ucuz yolu onu çağrı verisi olarak yazmaktı.
Bu çözüm hem [Optimism](https://docs.optimism.io/op-stack/protocol/overview) hem de [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) tarafından seçildi.
Dencun yükseltmesinden (Mart 2024) bu yana, toplamalar bu verileri bunun yerine çok daha ucuz olan [blob'larda](/roadmap/danksharding/) yayınlayabilir.

### L2 işlemlerinin maliyeti {#cost-of-l2-transactions}

L2 işlemlerinin maliyeti iki bileşenden oluşur:

1. Genellikle son derece ucuz olan L2 işleme
2. Ana Ağ Gaz maliyetlerine bağlı olan L1 depolama

Bu makaleyi 2022'de yazdığımda, Optimism'de L2 Gaz maliyeti 0.001 [Gwei](/developers/docs/gas/#what-is-gas) idi.
L1 Gaz maliyeti ise yaklaşık 40 Gwei idi.

Bir baytlık çağrı verisi ya 4 Gaz (sıfır ise) ya da 16 Gaz (başka bir değer ise) tutar.
EVM'deki en pahalı işlemlerden biri depolamaya yazmaktır.
L2'de depolamaya 32 baytlık bir kelime yazmanın maksimum maliyeti 22100 Gaz'dır. O zamanlar bu 22.1 Gwei idi.
Yani çağrı verisinin tek bir sıfır baytından tasarruf edebilirsek, depolamaya yaklaşık 200 bayt yazabilir ve yine de kârlı çıkabilirdik.

#### 2024'te L2 maliyetleri nasıl değişti {#how-l2-costs-changed-in-2024}

OP Stack [L1 veri ücreti](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) formülü bu makale yazıldığından beri iki kez değişti:

- [Ecotone yükseltmesi](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (Mart 2024) ile OP Stack zincirleri, işlem verilerini ayrı (ve genellikle çok daha düşük) bir blob taban ücreti ile fiyatlandırılan blob'lara göndermeye başladı.
- [Fjord yükseltmesi](https://docs.optimism.io/op-stack/transactions/fees#fjord) (Temmuz 2024) ile L1 veri ücreti, işlem başına minimum 100 bayt olmak üzere [FastLZ](https://github.com/ariya/FastLZ) sıkıştırmasından sonraki işlemin boyutunun bir tahminine dayanmaktadır ([spesifikasyona bakın](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Bu, makalenin geri kalanındaki analizi üç şekilde değiştirir:

1. Sıfır baytlar iyi sıkıştırılır, bu nedenle neredeyse ücretsizdirler.
   Aşağıdaki bayt başına 4 ve 16 Gaz rakamları, bugün bir OP Stack zincirinde işlem verileri için ödediğiniz tutar değil, L1 çağrı verisinin maliyetidir.
2. 100 baytlık minimumun altında, daha kısa çağrı verisi hiçbir tasarruf sağlamaz.
   Örneğin, Ekim 2026'da OP Ana Ağı'nda standart bir ERC-20 `transfer` (68 baytlık çağrı verisi) ve bu makaledeki 23 baytlık kısa sürüm, minimum olan yaklaşık 1 Gwei (10<sup>-9</sup> ETH) ile tamamen aynı L1 veri ücretini öderdi.
3. Blob alanı ucuz olduğu için, L2 yürütme ücreti artık genellikle L1 veri ücretinden daha büyüktür.
   0.001 Gwei'lik bir L2 gas fiyatında, 1000 Gaz 1 Gwei tutar, bu da tüm L1 veri ücretiyle aynıdır, bu nedenle bir vekil kontrat üzerinden geçmenin ekstra yürütme Gazı, tasarruf ettiği baytlardan daha pahalıya mal olabilir.

Prensip hala geçerlidir: daha az sıkıştırılmış bayt, daha düşük bir L1 veri ücreti anlamına gelir.
Kısa ABI'ler, iyi sıkıştırılmayan çok fazla veriye sahip işlemler için ve L1 verisinin pahalı olduğu zincirlerde veya zamanlarda en mantıklısıdır.
Belirli bir işlemin ne kadar ödeyeceğini görmek için, imzasız işlemle [`GasPriceOracle` ön dağıtımında](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) `getL1Fee` çağrısı yapın.
Örneğin, [Foundry](https://getfoundry.sh/introduction/installation/)'nin `cast` aracını kullanarak:

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Sonuç Wei cinsindendir.

### ABI {#the-abi}

İşlemlerin büyük çoğunluğu bir Sözleşmeye harici sahipli bir hesaptan erişir.
Çoğu Sözleşme Solidity ile yazılmıştır ve veri alanlarını [Uygulama İkili Arayüzü'ne (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) göre yorumlar.

Ancak ABI, bir baytlık çağrı verisinin (2022 fiyatlarıyla) binden fazla aritmetik işleme mal olduğu L2 için değil, bir baytlık çağrı verisinin yaklaşık dört aritmetik işlemle aynı maliyete sahip olduğu L1 için tasarlanmıştır.
Çağrı verisi şu şekilde bölünmüştür:

| Bölüm | Uzunluk | Baytlar | Boşa harcanan baytlar | Boşa harcanan Gaz | Gerekli baytlar | Gerekli Gaz |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| İşlev seçici | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Sıfırlar | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Hedef Adres | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Miktar | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Toplam | 68 | | | 164 | | 576 |

Açıklama:

- **İşlev seçici**: Sözleşmenin 256'dan az işlevi vardır, bu nedenle onları tek bir baytla ayırt edebiliriz.
  Bu baytlar tipik olarak sıfır değildir ve bu nedenle [on altı Gaz tutar](https://eips.ethereum.org/EIPS/eip-2028).
- **Sıfırlar**: Bu baytlar her zaman sıfırdır çünkü yirmi baytlık bir Adres onu tutmak için otuz iki baytlık bir kelime gerektirmez.
  Sıfır tutan baytlar dört Gaz tutar ([Sarı Bülten'e bakın](https://ethereum.github.io/yellowpaper/paper.pdf), Ek G,
  s. 27, `G`<sub>`txdatazero`</sub> değeri).
- **Miktar**: Bu Sözleşmede `decimals` değerinin on sekiz (normal değer) olduğunu ve transfer edeceğimiz maksimum Token miktarının 10<sup>18</sup> olacağını varsayarsak, maksimum 10<sup>36</sup> miktarı elde ederiz.
  256<sup>15</sup> &gt; 10<sup>36</sup>, yani on beş bayt yeterlidir.

L1'de 164 Gaz israfı normalde ihmal edilebilir düzeydedir. Bir işlem en az [21.000 Gaz](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) tutar, bu nedenle fazladan %0,8'in bir önemi yoktur.
Ancak 2022'de L2'de işler farklıydı. İşlemin neredeyse tüm maliyeti onu L1'e yazmaktı.
İşlem çağrı verisine ek olarak, 109 baytlık işlem başlığı (hedef Adres, imza vb.) vardır.
Bu nedenle toplam maliyet `109*16+576+164=2484`'dır ve bunun yaklaşık %6,6'sını boşa harcıyoruz.

## Hedefi kontrol etmediğinizde maliyetleri azaltmak {#reducing-costs-when-you-dont-control-the-destination}

Hedef Sözleşme üzerinde kontrolünüz olmadığını varsayarsak, yine de [buna](https://github.com/qbzzt/ethereum.org-20220330-shortABI) benzer bir çözüm kullanabilirsiniz.

Çalıştırmak için [Node.js](https://nodejs.org/) ve git'e ihtiyacınız var:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Test, Sözleşmeleri Hardhat'in yerleşik yerel ağına dağıtır, bu nedenle herhangi bir ETH'ye ihtiyacınız yoktur.
Depo Hardhat 2.9 kullanır, bu nedenle Node.js'nin mevcut sürümlerinde Node.js sürümünüzün desteklenmediği konusunda uyarır, ancak test yine de geçer.

İlgili dosyaların üzerinden geçelim.

### Token.sol {#token-sol}

[Bu, hedef sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Ek bir özelliğe sahip standart bir ERC-20 sözleşmesidir.
Bu `faucet` işlevi, herhangi bir kullanıcının kullanmak üzere bir miktar Token almasını sağlar.
Üretimdeki bir ERC-20 sözleşmesini işe yaramaz hale getirirdi, ancak bir ERC-20 yalnızca test etmeyi kolaylaştırmak için var olduğunda hayatı kolaylaştırır.

```solidity
    /**
     * @dev Çağırana oynaması için 1000 Token verir
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Bu, işlemlerin daha kısa çağrı verisiyle çağırması gereken Sözleşmedir](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Satır satır üzerinden geçelim.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Nasıl çağıracağımızı bilmek için Token işlevine ihtiyacımız var.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Vekili olduğumuz Token'ın Adresi.

```solidity

    /**
     * @dev Token Adresini belirtin
     * @param tokenAddr_ ERC-20 Sözleşme Adresi
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // kurucu
```

Token Adresi, belirtmemiz gereken tek parametredir.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Çağrı verisinden bir değer okuyun.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Belleğe tek bir 32 baytlık (256 bit) kelime yükleyeceğiz ve istediğimiz alanın parçası olmayan baytları kaldıracağız.
Bu algoritma 32 bayttan uzun değerler için çalışmaz ve elbette çağrı verisinin sonunu okuyamayız.
L1'de Gazdan tasarruf etmek için bu testleri atlamak gerekebilir, ancak L2'de Gaz son derece ucuzdur, bu da aklımıza gelebilecek her türlü mantık kontrolünü yapmamızı sağlar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Verileri çağrıdan `fallback()`'a kopyalayabilirdik (aşağıya bakın), ancak EVM'nin çevirici dili olan [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)'u kullanmak daha kolaydır.

Burada `startByte` ile `startByte+31` arasındaki baytları yığına okumak için [CALLDATALOAD işlem kodunu](https://www.evm.codes/#35) kullanıyoruz.
Genel olarak, Yul'daki bir işlem kodunun sözdizimi `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` şeklindedir.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Yalnızca en anlamlı `length` bayt alanın bir parçasıdır, bu nedenle diğer değerlerden kurtulmak için [sağa kaydırıyoruz](https://en.wikipedia.org/wiki/Logical_shift).
Bunun, değeri alanın sağına taşıma gibi ek bir avantajı vardır, bu nedenle değer çarpı 256<sup>bir şey</sup> yerine değerin kendisi olur.

```solidity

        return _retVal;
    }


    fallback() external {
```

Bir Solidity Sözleşmesine yapılan çağrı işlev imzalarından hiçbiriyle eşleşmediğinde, [`fallback()` işlevini](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) çağırır (bir tane olduğunu varsayarsak).
`CalldataInterpreter` durumunda, başka `external` veya `public` işlevi olmadığı için _herhangi bir_ çağrı buraya gelir.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Bize işlevi söyleyen çağrı verisinin ilk baytını okuyun.
Bir işlevin burada bulunmamasının iki nedeni vardır:

1. `pure` veya `view` olan işlevler durumu değiştirmez ve (zincir dışı çağrıldığında) Gaz maliyeti gerektirmez.
   Gaz maliyetlerini düşürmeye çalışmanın bir anlamı yoktur.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)'a dayanan işlevler.
   `msg.sender` değeri, arayanın değil, `CalldataInterpreter`'nin Adresi olacaktır.

Ne yazık ki, [ERC-20 spesifikasyonlarına bakıldığında](https://eips.ethereum.org/EIPS/eip-20), bu geriye yalnızca bir standart işlev bırakır, `transfer` (çünkü `transferFrom` çağırabiliriz).
Test Token'ımız ayrıca `faucet`'a sahiptir, bunu destekleyebiliriz çünkü Token'ları bizi arayan kişiye geri transfer edebiliriz.

```solidity

        // Token'ın durum değiştiren metotlarını şunları kullanarak çağırın:
        // çağrı verisinden gelen bilgileri

        // musluk
        if (_func == 1) {
```

Parametreleri olmayan `faucet()`'a bir çağrı.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()` çağırdıktan sonra Token'lar alırız. Ancak, vekil kontrat olarak Token'lara **ihtiyacımız** yoktur.
Bizi çağıran EOA (harici sahipli hesap) veya Sözleşmenin ihtiyacı vardır.
Bu yüzden tüm Token'larımızı bizi arayan kişiye transfer ediyoruz.

```solidity
        // transfer (bunun için bir harcama iznimiz olduğunu varsayalım)
        if (_func == 2) {
```

Token'ları transfer etmek iki parametre gerektirir: hedef Adres ve miktar.

```solidity
            token.transferFrom(
                msg.sender,
```

Arayanların yalnızca sahip oldukları Token'ları transfer etmelerine izin veriyoruz

```solidity
                address(uint160(calldataVal(1, 20))),
```

Hedef Adres 1. bayttan başlar (0. bayt işlevdir).
Bir Adres olarak 20 bayt uzunluğundadır.

```solidity
                calldataVal(21, 2)
```

Bu özel Sözleşme için, herhangi birinin transfer etmek isteyeceği maksimum Token sayısının iki bayta (65536'dan az) sığdığını varsayıyoruz.

```solidity
            );
        }
```

Genel olarak, bir transfer 23 baytlık çağrı verisi alır:

| Bölüm | Uzunluk | Baytlar |
| ------------------- | -----: | ----: |
| İşlev seçici | 1 | 0 |
| Hedef Adres | 20 | 1-20 |
| Miktar | 2 | 21-22 |

```solidity
    }   // fallback

}       // Sözleşme CalldataInterpreter
```

### test.js {#test-js}

[Bu JavaScript birim testi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) bize bu mekanizmayı nasıl kullanacağımızı (ve doğru çalıştığını nasıl doğrulayacağımızı) gösterir.
[chai](https://www.chaijs.com/) ve [ethers](https://docs.ethers.org/v5/)'ı anladığınızı varsayacağım ve yalnızca sözleşmeye özel olarak uygulanan kısımları açıklayacağım.

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

Her iki sözleşmeyi de dağıtarak başlıyoruz.

```javascript
    // Oynamak için Token alın
    const faucetTx = {
```

İşlemler oluşturmak için normalde kullanacağımız üst düzey işlevleri (`token.faucet()` gibi) kullanamayız, çünkü ABI'yi takip etmiyoruz.
Bunun yerine, işlemi kendimiz oluşturmalı ve ardından göndermeliyiz.

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

Hedefi (`faucetTx.to`) zaten belirttiğimiz ve işlemin imzalanması gerektiği için [imzalayanın `sendTransaction` yöntemini](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) çağırıyoruz.

```javascript
// Faucet'in Token'ları doğru şekilde sağlayıp sağlamadığını kontrol edin
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Burada bakiyeyi doğruluyoruz.
`view` işlevlerinde Gaz tasarrufu yapmaya gerek yoktur, bu yüzden onları normal şekilde çalıştırırız.

```javascript
// CDI'ye bir harcama izni verin (onaylara vekillik edilemez)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Çağrı verisi yorumlayıcısına transfer yapabilmesi için bir harcama izni verin.

```javascript
// Token'ları transfer et
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Bir transfer işlemi oluşturun. İlk bayt "0x02"dir, ardından hedef adres ve son olarak miktar (ondalık olarak 256 olan 0x0100) gelir.

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 256 Token daha azımız olduğunu kontrol edin
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Ve hedefimizin onları aldığını
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Hedef Sözleşmeyi kontrol ettiğinizde maliyeti azaltmak {#reducing-the-cost-when-you-do-control-the-destination-contract}

Hedef Sözleşme üzerinde kontrolünüz varsa, çağrı verisi yorumlayıcısına güvendikleri için `msg.sender` kontrollerini atlayan işlevler oluşturabilirsiniz.
[Bunun nasıl çalıştığına dair bir örneği burada, `control-contract` dalında görebilirsiniz](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Çalıştırmak için, daha önce klonladığınız depoda o dala geçin ve testi tekrar çalıştırın:

```sh
git checkout control-contract
npx hardhat test
```

Sözleşme yalnızca harici işlemlere yanıt veriyor olsaydı, sadece bir Sözleşmeye sahip olarak idare edebilirdik.
Ancak bu, [birleştirilebilirliği](/developers/docs/smart-contracts/composability/) bozardı.
Normal ERC-20 çağrılarına yanıt veren bir Sözleşmeye ve kısa çağrı verisine sahip işlemlere yanıt veren başka bir Sözleşmeye sahip olmak çok daha iyidir.

### Token.sol {#token-sol-2}

Bu örnekte `Token.sol`'ü değiştirebiliriz.
Bu, yalnızca vekil kontratın çağırabileceği bir dizi işleve sahip olmamızı sağlar.
İşte yeni kısımlar:

```solidity
    // CalldataInterpreter Adresini belirtmesine izin verilen tek Adres
    address owner;

    // CalldataInterpreter Adresi
    address proxy = address(0);
```

ERC-20 sözleşmesinin yetkili vekil kontratın kimliğini bilmesi gerekir.
Ancak, değeri henüz bilmediğimiz için bu değişkeni kurucuda ayarlayamayız.
Vekil kontrat, kurucusunda Token'ın adresini beklediği için önce bu sözleşme örneklendirilir.

```solidity
    /**
     * @dev ERC20 kurucusunu çağırır.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Oluşturucunun adresi (`owner` olarak adlandırılır) burada saklanır çünkü vekil kontratı ayarlamasına izin verilen tek adres budur.

```solidity
    /**
     * @dev vekil (CalldataInterpreter) için Adresi ayarlayın.
     * Sahibi tarafından yalnızca bir kez çağrılabilir
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Vekil kontrat ayrıcalıklı erişime sahiptir, çünkü güvenlik kontrollerini atlayabilir.
Vekil kontrata güvenebileceğimizden emin olmak için yalnızca `owner`'ın bu işlevi çağırmasına izin veriyoruz ve yalnızca bir kez.
`proxy` gerçek bir değere (sıfır değil) sahip olduğunda, bu değer değişemez, bu nedenle sahibi kötü niyetli olmaya karar verse veya anımsatıcısı (mnemonic) ortaya çıksa bile hala güvendeyiz.

```solidity
    /**
     * @dev Bazı fonksiyonlar yalnızca vekil tarafından çağrılabilir.
     */
    modifier onlyProxy {
```

Bu bir [`modifier` işlevidir](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), diğer işlevlerin çalışma şeklini değiştirir.

```solidity
      require(msg.sender == proxy);
```

İlk olarak, vekil kontrat tarafından çağrıldığımızı ve başka kimse tarafından çağrılmadığımızı doğrulayın.
Değilse, `revert`.

```solidity
      _;
    }
```

Eğer öyleyse, değiştirdiğimiz işlevi çalıştırın.

```solidity
   /* Vekilin Hesaplar için gerçekten vekillik yapmasına izin veren fonksiyonlar */

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

Bunlar normalde mesajın doğrudan Token'ları transfer eden veya bir harcama iznini onaylayan varlıktan gelmesini gerektiren üç işlemdir.
Burada bu işlemlerin bir vekil kontrat sürümüne sahibiz:

1. `onlyProxy()` tarafından değiştirilir, böylece başka hiç kimsenin onları kontrol etmesine izin verilmez.
2. Normalde `msg.sender` olacak adresi ekstra bir parametre olarak alır.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Çağrı verisi yorumlayıcısı, vekil kontrat işlevlerinin bir `msg.sender` parametresi alması ve `transfer` için bir harcama iznine gerek olmaması dışında yukarıdakiyle neredeyse aynıdır.

```solidity
        // transfer (harcama iznine gerek yok)
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

ERC-20 sözleşmesine hangi vekil kontrata güveneceğini söylememiz gerekiyor

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Harcama izinlerini doğrulamak için iki imzalayıcıya ihtiyaç var
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` ve `transferFrom()`'ı kontrol etmek için ikinci bir imzalayana ihtiyacımız var.
Buna `poorSigner` diyoruz çünkü Token'larımızdan hiçbirini almıyor (elbette ETH'ye sahip olması gerekiyor).

```js
// Token'ları transfer et
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 sözleşmesi vekil kontrata (`cdi`) güvendiği için, transferleri iletmek için bir harcama iznine ihtiyacımız yoktur.

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

// approve / transferFrom kombosunun doğru yapıldığını kontrol edin
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

İki yeni işlevi test edin.
`transferFromTx`'un iki adres parametresi gerektirdiğini unutmayın: harcama iznini veren ve alan.

## Sonuç {#conclusion}

Hem [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) hem de [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) artık işlemlerin maliyetini azaltmak için L1'e yazdıkları verileri sıkıştırıyor ve her işlemi sıkıştırılmış boyutuna göre ücretlendiriyor.
Ancak, genel çözümler arayan altyapı sağlayıcıları olarak yeteneklerimiz sınırlıdır.
dapp geliştiricisi olarak, çağrı verinizi genel bir çözümde yapabileceğimizden çok daha iyi optimize etmenizi sağlayan uygulamaya özel bilgiye sahipsiniz.
Umarım bu makale ihtiyaçlarınız için ideal çözümü bulmanıza yardımcı olur.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).

