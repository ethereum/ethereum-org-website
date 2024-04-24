---
title: "Uniswap-v2 Sözleşmesine Genel Bakış"
description: Uniswap-v2 sözleşmesi nasıl çalışır? Neden bu şekilde yazılmıştır?
author: Ori Pomerantz
tags:
  - "solidity"
skill: intermediate
published: 2021-05-01
lang: tr
---

## Giriş {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) herhangi iki ERC-20 token'ı arasında bir takas piyasası oluşturabilir. Bu yazıda bu protokolü uygulayan sözleşmelerin kaynak kodunu inceleyecek ve neden bu şekilde yazıldığını göreceğiz.

### Uniswap ne yapar? {#what-does-uniswap-do}

Temel olarak iki tür kullanıcı vardır: likidite sağlayıcıları ve ticaret yapanlar.

_Likidite sağlayıcıları_, havuza takas edilebilecek iki jeton sağlar (bunlara **Jeton0** ve **Jeton1** diyeceğiz). Karşılığında, havuzun kısmi sahipliğini temsil eden ve _likidite jetonu_ adı verilen üçüncü bir jeton alırlar.

_Ticaret yapanlar_, havuza bir tür jeton gönderir ve likidite sağlayıcıları tarafından sağlanan havuzdan diğer jetonu alır (örneğin, **Jeton0** gönderir ve **Jeton1** alır). Takas oranı, havuzun sahip olduğu **Jeton0**'lar ve **Jeton1**'lerin göreceli sayısına göre belirlenir. Ayrıca havuz, likidite havuzu için ödül olarak küçük bir yüzde alır.

Likidite sağlayıcıları varlıklarını geri istediklerinde havuz jetonlarını yakabilir ve ödül payları da dahil olmak üzere jetonlarını geri alabilir.

[Daha geniş çaplı bir açıklama için buraya tıklayın](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Neden v2? Neden v3 değil? {#why-v2}

[Uniswap v3](https://uniswap.org/whitepaper-v3.pdf), v2'den çok daha karmaşık bir yükseltmedir. Önce v2'yi öğrenip ardından v3'e geçmek daha kolaydır.

### Çekirdek Sözleşmeler ve Çevre Sözleşmeler {#contract-types}

Uniswap v2, çekirdek ve çevre olmak üzere iki bileşene ayrılmıştır. Bu ayrım, varlıkları elinde tutan ve bu nedenle güvenli olmak _zorunda_ olan çekirdek sözleşmelerin daha basit ve denetlenmesi daha kolay olmasını sağlar. Ticaret yapanların ihtiyaç duyduğu tüm ekstra işlevsellik daha sonra çevre sözleşmeleriyle sağlanabilir.

## Veri ve Kontrol Akışları {#flows}

Bu, Uniswap'ın üç ana eylemini gerçekleştirdiğinizde gerçekleşen veri ve kontrol akışıdır:

1. Farklı token'lar arası takas
2. Piyasaya likidite katın ve eş takası ERC-20 likidite token'ları ile ödüllendirin
3. ERC-20 likidite token'larını yakın ve eş takasının, ticaret yapan kişilerin takas yapmasını sağlayan ERC-20 token'larını geri alın

### Takas {#swap-flow}

Bu, ticaret yapanlar tarafından kullanılan en yaygın akıştır:

#### Çağıran {#caller}

1. Çevre hesabına takas edilecek tutarda bir ödenek sağlayın.
2. Çevre sözleşmesinin birçok takas fonksiyonundan birini çağırın (hangisini çağıracağınız, ETH'nin dahil olup olmadığına; tüccarın yatırılacak token miktarını veya geri alınacak token miktarını belirleyip belirlemediğine vb. bağlıdır). Her takas fonksiyonu, geçmesi gereken bir dizi takas olan bir `path` kabul eder.

#### Çevre sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Yol boyunca her takasta işlem görmesi gereken miktarları belirleyin.
4. Yol üzerinde tekrarlar. Yol boyunca her takas için giriş token'ını gönderir ve ardından takasın `swap` fonksiyonunu çağırır. Çoğu durumda token'lar için hedef adres, yoldaki bir sonraki eş takasıdır. Son takasta, ticaret yapan kişi tarafından sağlanan adrestir.

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Çekirdek sözleşmenin dolandırılmadığını ve takastan sonra yeterli likiditeyi koruyabildiğini doğrulayın.
6. Bilinen rezervlere ek olarak kaç tane ekstra token'ımız olduğunu görün. Bu miktar, takas etmek için aldığımız giriş token'larının sayısıdır.
7. Çıktı token'larını hedefe gönderin.
8. Rezerv tutarlarını güncellemek için `_update` komutunu çağırın

#### Çevre sözleşmesine geri dönün (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Gerekli temizleme işlemlerini gerçekleştirin (örneğin, ticaret yapana göndermek için ETH'yi geri almak amacıyla WETH token'larını yakın)

### Likidite Ekleyin {#add-liquidity-flow}

#### Çağıran {#caller-2}

1. Likidite havuzuna eklenecek tutarlarda çevre hesabına bir ödenek sağlayın.
2. Çevre sözleşmesinin `addLiquidity` fonksiyonlarından birini çağırın.

#### Çevre sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Gerekirse yeni bir eş takası oluşturun
4. Mevcut bir eş takası varsa, eklenecek jeton miktarını hesaplayın. Yeni jetonların mevcut jetonlara oranının aynı olması için bunun her iki jeton için aynı değer olması gerekir.
5. Tutarların kabul edilebilir olup olmadığını kontrol edin (çağıranlar, altında likidite eklemek istemeyecekleri bir minimum tutar belirtebilir)
6. Çekirdek sözleşmeyi çağırın.

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Likidite token'larını basın ve çağırana gönderin
8. Rezerv tutarlarını güncellemek için `_update`'i çağırın

### Likiditeyi Kaldır {#remove-liquidity-flow}

#### Çağıran {#caller-3}

1. Çevre hesabına, temeldeki token'lar karşılığında yakılacak likidite token'ı ödeneği sağlayın.
2. Çevre sözleşmesinin `removeLiquidity` fonksiyonlarından birini çağırın.

#### Çevre sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Likidite token'larını eş takasına gönderin

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Temeldeki jetonları hedef adrese yakılmış jetonlarla orantılı olarak gönderin. Örneğin, havuzda 1000 A token'ı, 500 B token'ı ve 90 likidite token'ı varsa ve yakmak için 9 token alırsak, likidite token'ının %10'unu yakıyoruz, böylece kullanıcıya 100 A token'ı ve 50 B token'ı geri gönderiyoruz.
5. Likidite jetonlarını yakın
6. Rezerv tutarlarını güncellemek için `_update`'i çağırın

## Çekirdek Sözleşmeler {#core-contracts}

Bunlar likiditeyi tutan güvenli sözleşmelerdir.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol), jetonları takas eden asıl havuzu uygular. Temel Uniswap fonksiyonudur.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Bunlar, sözleşme bunları uyguladığı (`IUniswapV2Pair` ve `UniswapV2ERC20`) veya bunları uygulayan sözleşmeleri çağırdığı için sözleşmenin bilmesi gereken tüm arayüzlerdir.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Bu sözleşme, likidite jetonları için ERC-20 fonksiyonlarını sağlayan `UniswapV2ERC20`'den devralır.

```solidity
    using SafeMath  for uint;
```

[SafeMath kütüphanesi](https://docs.openzeppelin.com/contracts/2.x/api/math), taşmaları ve yetersizlikleri önlemek için kullanılır. Bu, bir değerin `-1` olması gerektiği, ancak bunun yerine `2^256-1` olduğu bir durumla karşılaşabileceğimiz için önemlidir.

```solidity
    using UQ112x112 for uint224;
```

Havuz sözleşmesindeki birçok hesaplama kesir gerektirir. Ancak, kesirler EVM tarafından desteklenmez. Uniswap'ın bulduğu çözüm, tamsayı kısmı için 112 bit ve kesir için 112 bit olmak üzere 224 bit değerleri kullanmaktır. Yani `1.0` `2^112` olarak temsil edilir, `1.5` `2^112 + 2^111` vb. olarak temsil edilir.

Bu kütüphane hakkında daha fazla ayrıntı [belgenin ilerleyen bölümlerinde](#FixedPoint) bulunabilir.

#### Değişkenler {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Sıfıra bölme durumlarından kaçınmak için her zaman var olan (ancak hesap sıfırına ait olan) minimum sayıda likidite jetonu mevcuttur. O sayı **MINIMUM_LIQUIDITY**, yani bindir.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Bu, ERC-20 transfer fonksiyonu için ABI seçicisidir. Bu, ERC-20 jetonlarını iki jeton hesabına aktarmak için kullanılır.

```solidity
    address public factory;
```

Bu havuzu oluşturan fabrika sözleşmesi budur. Her havuz, iki ERC-20 jetonu arasında bir borsa, fabrika ise tüm bu havuzları birbirine bağlayan merkezi bir noktadır.

```solidity
    address public token0;
    address public token1;
```

Bu havuz tarafından takas edilebilecek iki tür ERC-20 jetonu için sözleşme adresleri mevcuttur.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Havuzun her token türü için sahip olduğu rezervler. İkisinin aynı miktarda değeri temsil ettiğini varsayıyoruz; bu nedenle her token0; reserve1/reserve0 token1 değerindedir.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

Bir takasın gerçekleştiği son bloğun zaman damgası, zaman içindeki takas oranını izlemek için kullanılır.

Ethereum sözleşmelerinin en büyük gaz giderlerinden biri, sözleşmenin bir çağrısından diğerine devam eden depolamadır. Her depolama hücresi 256 bit uzunluğundadır. Bu yüzden üç değişken olan `reserve0`, `reserve1` ve `blokTimestampLast`, tek bir depolama değerinin üçünü de içerebileceği bir şekilde tahsis edilir (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Bu değişkenler, her bir token için kümülatif maliyetleri tutar (her biri diğerinin cinsinden). Bunlar, bir zaman aralığındaki ortalama takas oranını hesaplamak için kullanılabilir.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

Eş takasının jeton0 ile jeton1 arasındaki takas oranına karar verme yöntemi, işlemler sırasında iki rezervin katını sabit tutmaktır. Bu değer `kLast`'dir. Bu, bir likidite sağlayıcısı jeton yatırdığında veya çektiğinde değişir ve %0,3 piyasa ücreti nedeniyle biraz artar.

İşte basit bir örnek. Basitlik adına, tablonun ondalık kısmından sonra yalnızca üç haneye sahip olduğunu ve sayıların doğru olmaması için %0,3 işlem ücretini göz ardı ettiğimizi unutmayın.

| Olay                                                            |  reserve0 |  reserve1 | reserve0 \* reserve1 | Ortalama takas oranı (token1 / token0) |
| --------------------------------------------------------------- | --------: | --------: | -------------------: | -------------------------------------- |
| İlk kurulum                                                     | 1,000.000 | 1,000.000 |            1,000,000 |                                        |
| Ticaret Yapan A, 50 tane token0'ı 47.619 token1 ile takas eder  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                  |
| Ticaret Yapan B, 10 tane token0'ı 8.984 token1 ile takas eder   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                  |
| Ticaret Yapan C, 40 tane token0'ı 34.305 token1 ile takas eder  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                  |
| Ticaret Yapan D, 109.01 tane token0'ı 100 token1 ile takas eder |   990.990 | 1,009.090 |            1,000,000 | 0.917                                  |
| Ticaret Yapan E, 10 tane token0'ı 10.079 token1 ile takas eder  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                  |

Ticaret yapanlar daha fazla token0 sağladıkça, arz ve talebe bağlı olarak token1'in göreceli değeri artar ve bunun tersi de aynı şekilde işler.

#### Kilitleme {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[Yeniden giriş istismarı](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) üzerine kurulu bir güvenlik açığı sınıfı bulunmaktadır. Uniswap'ın isteğe bağlı ERC-20 token'larını aktarması gerekir; bu, onları çağıran Uniswap borsasını kötüye kullanmaya çalışabilecek ERC-20 sözleşmelerini çağırmak anlamına gelir. Sözleşmenin bir parçası olarak bir `unlocked` değişkenine sahip olduğumuzda fonksiyonların çalışırken (aynı işlem içinde) çağrılmasını önleyebiliriz.

```solidity
    modifier lock() {
```

Bu fonksiyon bir [niteleyicidir](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), yani normal bir fonksiyonun davranışını bir şekilde değiştirmek için onu paketler.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Eğer `unlocked` bire eşit ise, onu sıfır olarak ayarlayın. Zaten sıfırsa çağrıyı geri alarak başarısız olmasını sağlayın.

```solidity
        _;
```

Bir niteleyicide `_;` orijinal fonksiyon çağrısıdır (tüm parametrelerle birlikte). Burada, fonksiyon çağrısının yalnızca çağrıldığında `unlocked` bir olduğunda ve çalışırken `unlocked` değerinin sıfır olması durumunda gerçekleşeceği anlamına gelir.

```solidity
        unlocked = 1;
    }
```

Ana fonksiyon geri döndükten sonra kilidi açın.

#### Diğer fonksiyonlar {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Bu fonksiyon, çağıranlara takasın mevcut durumunu sağlar. Solidity fonksiyonlarının [birden fazla değer döndürebildiğini](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values) unutmayın.

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Bu dahili fonksiyon, takastaki bir miktar ERC20 token'ını bir başkasına aktarır. `SELECTOR`, çağırdığımız fonksiyonun `transfer(address,uint)` olduğunu belirtir (yukarıdaki tanıma bakın).

Jeton fonksiyonu için bir arayüzü içe aktarmak zorunda kalmak istemiyorsak çağrıyı [ABI fonksiyonlarından](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions) birini kullanarak "manuel olarak" oluştururuz.

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Bir ERC-20 transfer çağrısının başarısızlığı bildirebilmesinin iki yolu vardır:

1. Geri döndürme. Harici bir sözleşmeye yapılan çağrı geri alınırsa, boolean dönüş değeri `false` olur
2. Normal şekilde sonlandırın ancak bir sorun bildirin. Bu durumda, dönüş değeri arabelleği sıfır olmayan bir uzunluğa sahiptir ve bir boole değeri olarak kodu çözüldüğünde, `false` olur

Bu koşullardan herhangi biri gerçekleşirse, geri döndürün.

#### Olaylar {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Bu iki olay, bir likidite sağlayıcısı likidite yatırdığında (`Mint`) veya onu çektiğinde (`Burn`) ortaya çıkar. Her iki durumda da, yatırılan veya çekilen token0 ve token1 miktarları ve ayrıca bizi çağıran hesabın (`sender`) kimliği olayın bir parçasıdır. Çekme durumunda olay, gönderici ile aynı olmayabilecek jetonları alan (`to`) hedefi de içerir.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Bu olay, ticaret yapan kişi bir token'ı diğeriyle takas ettiğinde ortaya çıkar. Yine, gönderen ve hedef aynı olmayabilir. Her token, takasa gönderilebilir veya ondan alınabilir.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Son olarak, nedenden bağımsız olarak en son rezerv bilgilerini (ve dolayısıyla takas oranını) sağlamak için jetonlar her eklendiğinde veya çekildiğinde `Sync` gönderilir.

#### Kurulum Fonksiyonları {#pair-setup}

Bu fonksiyonların, yeni eş takası kurulduğunda bir kez çağrılması gerekiyor.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Yapıcı, eşleri oluşturan fabrikanın adresini takip etmemizi sağlar. Bu bilgi, `initialize` ve fabrika ücreti (varsa) için gereklidir

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Bu fonksiyon, fabrikanın (sadece ama sadece fabrikanın) bu eşin takas edeceği iki ERC-20 token'ını belirtmesine olanak tanır.

#### Dahili Güncelleme Fonksiyonları {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Bu fonksiyon, token'lar her yatırıldığında veya çekildiğinde çağrılır.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Balance0 veya balance1 (uint256), uint112(-1) (=2^112-1) değerinden yüksekse (böylece uint112'ye dönüştürüldüğünde taşar ve 0'a geri döner) taşmaları önlemek için \_update'i sürdürmeyi reddedin. 10^18 birime bölünebilen normal bir token ele alındığında bu, her takastaki tüm jetonların ortalama 5,1\*10^15 ile kısıtlı olduğu anlamına gelir. Şimdiye kadar bu bir sorun olmadı.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Geçen süre sıfır değilse, bu bloktaki ilk takas işlemi biziz demektir. Bu durumda maliyet biriktiricilerini güncellememiz gerekir.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Her maliyet biriktirici, son ücret ve (diğer jetonun rezervi/bu jetonun rezervi) saniye cinsinden geçen sürenin çarpımı ile güncellenir. Ortalama bir fiyat elde etmek için kümülatif fiyatı zaman içinde iki noktada okursunuz ve aralarındaki zaman farkına bölersiniz. Örneğin, bu olay dizisini varsayalım:

| Olay                                                           |  reserve0 |  reserve1 | zaman damgası | Marjinal takas oranı (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------------- | --------: | --------: | ------------- | -----------------------------------------: | -------------------------: |
| İlk kurulum                                                    | 1,000.000 | 1,000.000 | 5,000         |                                      1.000 |                          0 |
| Ticaret Yapan A, 50 token0 yatırır ve 47.619 token1 geri alır  | 1,050.000 |   952.381 | 5,020         |                                      0.907 |                         20 |
| Ticaret Yapan B, 10 token0 yatırır ve 8.984 token1 geri alır   | 1,060.000 |   943.396 | 5,030         |                                      0.890 |       20+10\*0.907 = 29.07 |
| Ticaret Yapan C 40 token0 yatırır ve 34.305 token1 geri alır   | 1,100.000 |   909.090 | 5,100         |                                      0.826 |    29.07+70\*0.890 = 91.37 |
| Ticaret Yapan D, 100 token1 yatırır ve 109.01 token0 geri alır |   990.990 | 1,009.090 | 5,110         |                                      1.018 |    91.37+10\*0.826 = 99.63 |
| Trader E, 10 jeton0 yatırır ve 10.079 jeton1 geri alır         | 1,000.990 |   999.010 | 5,150         |                                      0.998 | 99.63+40\*1.1018 = 143.702 |

5.030 ve 5.150 zaman damgaları arasında **Token0**'ın ortalama fiyatını hesaplamak istediğimizi varsayalım. `price0Cumulative` değerindeki fark 143,702-29,07=114,632'dir. Bu, iki dakikalık (120 saniye) ortalamadır. Yani ortalama fiyat 114,632/120 = 0,955'tir.

Bu fiyat hesaplaması, eski rezerv büyüklüklerini bilmemiz gerekmesinin nedenidir.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Son olarak, global değişkenleri güncelleyin ve bir `Sync` olayı yayınlayın.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0'da ticaret yapanlar, piyasayı kullanmak için %0,30'luk bir ücret öderler. Bu ücretin çoğu (ticaretin %0,25'i) her zaman likidite sağlayıcılarına gider. Kalan %0,05, likidite sağlayıcılarına veya fabrika tarafından protokol ücreti olarak belirtilen ve Uniswap'a geliştirme çabaları için ödeme yapan bir adrese gidebilir.

Hesaplamaları (ve dolayısıyla gaz maliyetlerini) azaltmak için bu ücret, her işlemde değil, yalnızca likidite havuza eklendiğinde veya havuzdan çıkarıldığında hesaplanır.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Fabrikanın ücret hedefini okuyun. Sıfır ise protokol ücreti yoktur ve bu ücreti hesaplamaya gerek yoktur.

```solidity
        uint _kLast = kLast; // gas savings
```

`kLast` durum değişkeni depoda bulunur, bu nedenle sözleşmeye yapılan farklı çağrılar arasında bir değeri olacaktır. Depolamaya erişim, sözleşmeye yapılan fonksiyon çağrısı sona erdiğinde serbest bırakılan geçici belleğe erişimden çok daha pahalıdır, bu nedenle gazdan tasarruf etmek için dahili bir değişken kullanırız.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Likidite sağlayıcıları, likidite token'larının değer kazanmasıyla paylarını alırlar. Ancak protokol ücreti, yeni likidite jetonlarının basılmasını ve `feeTo` adresine sağlanmasını gerektirir.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Protokol ücreti tahsil edilecek yeni likidite varsa. Karekök fonksiyonunu [bu makalenin ilerleyen bölümlerinde](#Math) görebilirsiniz

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Bu karmaşık ücret hesaplaması, 5. sayfadaki [teknik raporda](https://uniswap.org/whitepaper.pdf) açıklanmaktadır. `kLast`'ın hesaplandığı zaman ile şimdiki zaman arasında hiçbir likidite eklenmediğini veya kaldırılmadığını biliyoruz (çünkü bu hesaplamayı her likidite eklendiğinde veya kaldırıldığında, fiilen değişmeden önce yapıyoruz), dolayısıyla `reserve0 *reserve1` işlem ücretlerinden gelmelidir (onlar olmadan `reserve0 *reserve1` sabit tutardık).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Ek likidite token'larını gerçekten oluşturmak ve bunları `feeTo` öğesine atamak için `UniswapV2ERC20._mint` fonksiyonunu kullanın.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Herhangi bir ücret yoksa `kLast` öğesini sıfıra ayarlayın (zaten değilse). Bu sözleşme yazıldığında, sözleşmeleri ihtiyaç duymadıkları depolama alanını sıfırlayarak Ethereum durumunun genel boyutunu küçültmeye teşvik eden bir [gaz iadesi özelliği](https://eips.ethereum.org/EIPS/eip-3298) bulunuyordu. Bu kod, mümkün olduğunda o iadeyi alır.

#### Harici Erişilebilir Fonksiyonlar {#pair-external}

Herhangi bir işlem veya sözleşme bu fonksiyonları _çağırabilir_, ancak bunların çevre sözleşmesinden çağrılacak şekilde tasarlandığını unutmayın. Onları doğrudan çağırırsanız eş takasında hile yapamazsınız ancak bir hata nedeniyle değer kaybedebilirsiniz.

##### mint

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Bu fonksiyon, bir likidite sağlayıcısı havuza likidite eklediğinde çağrılır. Ödül olarak ek likidite jetonları basar. Aynı işlemde likiditeyi ekledikten sonra onu çağıran [çevre sözleşmesinden](#UniswapV2Router02) (böylece başka hiç kimse meşru sahibinden önce yeni likidite talep eden bir işlem gönderemez) çağrılmalıdır.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Bu, birden çok değer döndüren bir Solidity fonksiyonunun sonuçlarını okumanın yoludur. İhtiyacımız olmadığı için son döndürülen değerleri, blok zaman damgasını atıyoruz.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Mevcut bakiyeleri alın ve her bir token türünden ne kadar eklendiğini görün.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Varsa toplanacak protokol ücretlerini hesaplayın ve likidite token'larını buna göre basın. `_mintFee` parametreleri eski rezerv değerleri olduğundan, ücret yalnızca ücretlerden kaynaklanan havuz değişikliklerine göre doğru bir şekilde hesaplanır.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Eğer bu ilk yatırma ise, `MINIMUM_LIQUIDITY` tane token yaratın ve onları kilitlemek için sıfır adresine gönderin. Asla geri alınamayacakları için havuz asla tamamen boşaltılamaz (bu, bizi bazı yerlerde sıfıra bölmekten kurtarır). `MINIMUM_LIQUIDITY` değeri bindir ve çoğu ERC-20'nin bir jetonun 10^-18'lik birimlerine tekrar bölündüğünü göz önünde bulundurursak ETH wei'ye bölündüğünden bu bin, tek bir jetonun değerinin 10^-15 kadarıdır. Yüksek bir ücret değil.

İlk yatırma sırasında iki token'ın göreceli değerini bilmiyoruz, bu yüzden sadece miktarları çarpıyoruz ve yatırma işleminin bize her iki token'da da eşit değer sağladığını varsayarak bir karekök alıyoruz.

Arbitrajda değer kaybetmemek için eşit değer sağlamak para yatıran kişinin çıkarına olduğu için buna güvenebiliriz. Diyelim ki iki jetonun değeri aynı, ancak yatıran kişimiz **Jeton0**'a göre dört kat daha fazla **Jeton1** yatırdı. Bir tacir, eş takasının **Jeton0**'ın daha değerli olduğunu düşünmesi gerçeğini ondan değer yaratmak için kullanabilir.

| Olay                                                               | reserve0 | reserve1 | reserve0 \* reserve1 | Havuzun değeri (reserve0 + reserve1) |
| ------------------------------------------------------------------ | -------: | -------: | -------------------: | -----------------------------------: |
| İlk kurulum                                                        |        8 |       32 |                  256 |                                   40 |
| Ticaret yapan kişi 8 **Token0** tokeni yatırır, 16 **Token1** alır |       16 |       16 |                  256 |                                   32 |

Gördüğünüz gibi, ticaret yapan kişi havuzun değerindeki bir düşüşten gelen 8 token kazanarak ona sahip olan yatırım yapan kişiye zarar verdi.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Sonraki her yatırmada, iki varlık arasındaki takas oranını zaten biliyoruz ve likidite sağlayıcılarının her ikisinde de eşit değer sağlamasını bekliyoruz. Vermezlerse, ceza olarak sağladıkları daha düşük değere dayalı olarak onlara likidite token'ları veririz.

İster ilk yatırma ister sonraki bir yatırma olsun, sağladığımız likidite token'larının sayısı `reserve0*reserve1`'deki değişikliğin kareköküne eşittir ve likidite token'ının değeri değişmez (her iki tür için de eşit değerlere sahip olmayan bir yatırım almadığı sürece böyledir, aksi hâlde "para cezası" dağıtılır). İşte aynı değere sahip iki jetonlu, üç iyi yatırma ve bir kötü yatırma bulunan başka bir örnek (yalnızca bir jeton türünün yatırılması, bu nedenle herhangi bir likidite jetonu üretmez).

| Olay                       | reserve0 | reserve1 | reserve0 \* reserve1 | Havuz değeri (reserve0 + reserve1) | Bu yatırma için basılmış likidite token'ları | Toplam likidite token'ları | her bir likidite token'ının değeri |
| -------------------------- | -------: | -------: | -------------------: | ---------------------------------: | -------------------------------------------: | -------------------------: | ---------------------------------: |
| İlk kurulum                |    8.000 |    8.000 |                   64 |                             16.000 |                                            8 |                          8 |                              2.000 |
| Her türden dördünü yatırma |   12.000 |   12.000 |                  144 |                             24.000 |                                            4 |                         12 |                              2.000 |
| Her türden ikisini yatırma |   14.000 |   14.000 |                  196 |                             28.000 |                                            2 |                         14 |                              2.000 |
| Eşit olmayan değer yatırma |   18.000 |   14.000 |                  252 |                             32.000 |                                            0 |                         14 |                             ~2.286 |
| Arbitrajdan sonra          |  ~15.874 |  ~15.874 |                  252 |                            ~31.748 |                                            0 |                         14 |                             ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Ek likidite token'larını gerçekten oluşturmak ve bunları doğru hesaba vermek için `UniswapV2ERC20._mint` fonksiyonunu kullanın.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Durum değişkenlerini (`reserve0`, `reserve1` ve gerekirse `kLast`) güncelleyin ve uygun olayı yayınlayın.

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Bu fonksiyon, likidite çekildiğinde ve uygun likidite token'larının yakılması gerektiğinde çağrılır. Ayrıca o da [bir çevre hesabından](#UniswapV2Router02) çağrılmalıdır.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Çevre sözleşmesi, yakılacak likiditeyi çağrıdan önce bu sözleşmeye aktardı. Bu şekilde ne kadar likidite yakacağımızı biliriz ve yanmasını sağlayabiliriz.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Likidite sağlayıcısı, her iki token'dan eşit değerde alır. Bu şekilde takas oranını değiştirmiyoruz.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` fonksiyonunun geri kalanı yukarıdaki `mint` fonksiyonunun bir yansımasıdır.

##### swap

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Bu fonksiyonun [bir çevre sözleşmesinden](#UniswapV2Router02) çağrılması gerekir.

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Yerel değişkenler ya bellekte ya da çok fazla değilse doğrudan yığında saklanabilir. Yığını kullanmak için sayıyı sınırlayabilirsek daha az gaz kullanırız. Daha detaylı incelemek için [sarı kağıt, resmi Ethereum şartnamesinin](https://ethereum.github.io/yellowpaper/paper.pdf) 26. sayfasındaki 298. denkleme bakın.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Bu transfer, tüm koşulların karşılandığından emin olmadan önce transfer ettiğimiz için iyimserdir. Bu, çağrıda daha sonra koşullar karşılanmazsa çağrıdan ve yarattığı değişikliklerden geri döneceğimiz için Ethereum'da sorun olmaz.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Eğer isteniyorsa alıcıyı takas hakkında bilgilendirin.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Mevcut bakiyeleri alın. Çevre sözleşmesi, takas için bizi çağırmadan önce bize token'ları gönderir. Bu, sözleşmenin aldatılmadığını kontrol etmesini kolaylaştırır, bu, çekirdek sözleşmede gerçekleşecek gerçekleşmesi _gereken_ bir kontroldür (çünkü çevre sözleşmemiz dışındaki diğer varlıklar tarafından çağrılabiliriz).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Bu, takastan zarara uğramayacağımızdan emin olmak için yapılan bir doğruluk testidir. Bir takasın `reserve0*reserve1`'i azaltması gereken hiçbir durum yoktur. Burası aynı zamanda takasta %0,3'lük bir ücretin gönderilmesini sağladığımız yerdir; K'nin değerini doğruluk testine tabi tutmadan önce, her iki bakiyeyi 1000 ile çarparız ve sonuçtan 3 ile çarpılan miktarları çıkarırız. Bu, bakiyenin K değerini mevcut rezervlerin K değeri ile karşılaştırmadan önce bakiyeden %0,3 (3/1000 = 0,003 = %0,3) düşüldüğü anlamına gelir.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0`, `reserve1`'i ve gerekliyse fiyat biriktiricilerini ve tarih bilgisini güncelleyin ve bir olay yayın.

##### Senkronize Etme veya Fazlasını Alma

Reel bakiyelerin, eş takasının sahip olduğunu düşündüğü rezervlerle uyumsuz olması mümkündür. Sözleşmenin izni olmadan token'ları çekmenin bir yolu yoktur, ancak yatırımlar farklı bir konudur. Bir hesap borsaya `mint` veya `swap` çağırmadan jeton aktarabilir.

Bu durumda iki çözüm var:

- `sync`, rezervleri mevcut bakiyelere güncelleyin
- `skim`, fazladan miktarı çekin. Jetonları kimin yatırdığını bilmediğimiz için herhangi bir hesabın `skim` komutunu çağırmasına izin verildiğini unutmayın. Bu bilgi bir olayda yayınlanır, ancak olaylara blok zincirinden erişilemez.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) eş takaslarını oluşturur.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Bu durum değişkenleri protokol ücretini uygulamak için gereklidir (bkz. [teknik rapor](https://uniswap.org/whitepaper.pdf), 5. sayfa). `feeTo` adresi, protokol ücreti için likidite jetonlarını biriktirir ve `feeToSetter`, `feeTo`'un farklı bir adresle değiştirilmesine olanak tanıyan adrestir.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Bu değişkenler; eşleri, iki token türü arasındaki değişimleri takip eder.

İlki olan `getPair`, takas ettiği iki ERC-20 jetonunu temel alan eş takası sözleşmesini tanımlayan bir eşleştirmedir. ERC-20 jetonları, onları uygulayan sözleşmelerin adresleri ile tanımlanır, bu nedenle anahtarlar ve değerin tümü adreslerdir. `tokenA`'dan `tokenB`'ye dönüştürmenize izin veren eş takasının adresini almak için şunu kullanırsınız: `getPair[<tokenA address>][<tokenB address>]` (veya tam tersi).

İkinci değişken olan `allPairs`, bu fabrika tarafından oluşturulan eş takaslarının tüm adreslerini içeren bir dizidir. Ethereum'da bir eşlemenin içeriğini yineleyemezsiniz veya tüm anahtarların bir listesini alamazsınız, bu nedenle bu fabrikanın hangi takasları yönettiğini bilmenin tek yolu bu değişkendir.

Not: Bir eşlemenin tüm anahtarlarını yineleyememenizin nedeni, sözleşme verilerinin depolanmasının _pahalı_ olmasıdır, bu nedenle ne kadar azını kullanırsak ve onu ne kadar az değiştirirsek o kadar iyidir. [Yinelemeyi destekleyen eşleştirmeler](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol) oluşturabilirsiniz, ancak bunlar anahtar listesi için ekstra depolama gerektirir. Çoğu uygulamada buna ihtiyacınız yoktur.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Bu olay, yeni bir eş takası oluşturulduğunda yayınlanır. Jetonların adreslerini, eş takasının adresini ve fabrika tarafından yönetilen toplam takas sayısını içerir.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Yapıcının yaptığı tek şey `feeToSetter`'ı belirlemektir. Fabrikalar ücretsiz olarak başlar ve bunu yalnızca `feeSetter` değiştirebilir.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Bu fonksiyon, eş takaslarının sayısını döndürür.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Bu, fabrikanın ana işlevidir, yani iki ERC-20 token'ı arasında bir eş takası yaratmak. Bu fonksiyonu herhangi birinin çağırabileceğini unutmayın. Yeni bir takas çifti oluşturmak için Uniswap'ten izin almanız gerekmez.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Zincir dışında önceden hesaplanabilmesi için yeni takasın adresinin deterministik olmasını istiyoruz (bu, [katman 2 işlemleri](/developers/docs/scaling/) için yararlı olabilir). Bunu yapabilmek için onları aldığımız sıraya bakmaksızın jeton adreslerinin tutarlı bir sırasına sahip olmamız gerekir, bu yüzden de onları burada sıralarız.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Büyük likidite havuzları, daha istikrarlı fiyatlara sahip oldukları için küçük olanlardan daha iyidir. Jeton çifti başına birden fazla likidite havuzuna sahip olmak istemiyoruz. Hâlihazırda bir takas yeri varsa, aynı çift için başka bir takas yeri oluşturmaya gerek yoktur.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Yeni bir sözleşme oluşturmak için onu oluşturan koda ihtiyacımız vardır (hem oluşturucu fonksiyon hem de gerçek sözleşmenin EVM bit kodunu belleğe yazan kod). Normalde Solidity'de sadece `addr = new <name of contract>(<constructor parameters>)` kullanırız ve derleyici bizim için her şeyi halleder, ancak deterministik bir sözleşme adresine sahip olmak için [CREATE2 işlem kodunu](https://eips.ethereum.org/EIPS/eip-1014) kullanmamız gerekir. Bu kod yazıldığında işlem kodu henüz Solidity tarafından desteklenmediği için kodu manuel olarak almak gerekiyordu. Bu artık bir sorun değil, çünkü [Solidity artık CREATE2'yi destekliyor](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Bir opcode henüz Solidity tarafından desteklenmediğinde onu [satır içi derleme](https://docs.soliditylang.org/en/v0.8.3/assembly.html) kullanarak çağırabiliriz.

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Yeni takasa hangi iki token'ın takas edildiğini söylemek için `initialize` işlevini çağırın.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Yeni çift bilgisini durum değişkenlerine kaydedin ve yeni eş takasını dünyaya bildirmek için bir olay yayınlayın.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Bu iki fonksiyon `feeSetter` öğesinin ücret alıcısını (varsa) kontrol etmesine ve `feeSetter` öğesini yeni bir adresle değiştirmesine olanak tanır.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol), ERC-20 likidite jetonunu uygular. Bu sözleşme [OpenZeppelin ERC-20 sözleşmesine](/developers/tutorials/erc20-annotated-code) benzer, bu yüzden sadece `permit` işlevselliği olan farklı kısmı açıklayacağım.

Ethereum'daki işlemler, gerçek paraya eş değer olan ether'a (ETH) mal olur. ERC-20 jetonlarınız varsa ancak ETH'niz yoksa işlem gönderemez, yani onlarla hiçbir şey yapamazsınız. Bu sorundan kaçınmanın bir yolu [meta-işlemlerdir](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions). Jetonların sahibi, bir başkasının jetonları zincirden çekmesine ve de interneti kullanarak alıcıya göndermesine izin veren bir işlemi imzalar. Daha sonra ETH'ye sahip olan alıcı, token sahibi adına izni gönderir.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Bu hash değeri, [işlem türü için tanımlayıcıdır](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Bu parametrelerle burada desteklediğimiz tek şey `Permit`'tir.

```solidity
    mapping(address => uint) public nonces;
```

Bir alıcının dijital imzayı taklit etmesi mümkün değildir. Ancak, aynı işlemi iki kez göndermek önemsizdir (bu, bir [tekrar saldırısı](https://wikipedia.org/wiki/Replay_attack) biçimidir). Bunu önlemek için, bir [nonce](https://wikipedia.org/wiki/Cryptographic_nonce) kullanırız. Yeni bir `Permit`'in nonce değeri son kullanılandan bir fazla değilse, geçersiz olduğunu varsayarız.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Bu, [zincir tanımlayıcısını](https://chainid.network/) almaya yarayan koddur. [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) denilen bir EVM derleme biçemi kullanır. Yul'un mevcut versiyonunda `chainid` değil, `chainid()` kullanmanız gerektiğini unutmayın.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

EIP-712 için [alan adı ayırıcısını](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) hesapla.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Bu, yetkileri uygulayan fonksiyondur. İlgili alanları ve [imza](https://yos.io/2018/11/16/ethereum-signatures/) için üç skaler değeri parametre olarak alır (v, r ve s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Son teslim tarihinden sonra işlemleri kabul etmeyin.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` almayı beklediğimiz mesajdır. Nonce değerinin ne olması gerektiğini biliyoruz, bu yüzden onu parametre olarak almamıza gerek yoktur.

Ethereum imza algoritması, imzalamak için 256 bit almayı bekler, bu nedenle `keccak256` hash fonksiyonunu kullanırız.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Özetten ve imzadan, [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) kullanarak onu imzalayan adresi alabiliriz.

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Her şey tamamsa bunu bir [ERC-20 onayı](https://eips.ethereum.org/EIPS/eip-20#approve) olarak görün.

## Çevre Sözleşmeleri {#periphery-contracts}

Çevre sözleşmeler, Uniswap için API'dir (uygulama programı arayüzü). Diğer sözleşmelerden veya merkeziyetsiz uygulamalardan harici çağrılar için kullanılabilirler. Çekirdek sözleşmeleri doğrudan çağırabilirsiniz ancak bu daha karmaşıktır ve bir hata yaparsanız değer kaybedebilirsiniz. Çekirdek sözleşmeler, başkaları için doğruluk testi yapmaya değil yalnızca bu kişilerin aldatılmadıklarından emin olmaya yönelik testler içerir. Bunlar, gerektiğinde güncellenebilmeleri için çevrededir.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Bu sözleşmenin](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) sorunları vardır ve [artık kullanılmamalıdır](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Neyse ki çevre sözleşmeleri durumsuz olduğu ve herhangi bir varlık tutmadıkları için onları kullanımdan kaldırmak ve insanlara bunun yerine `UniswapV2Router02` kullanmayı önermek kolaydır.

### UniswapV2Router02.sol {#UniswapV2Router02}

Çoğu durumda Uniswap'i [bu sözleşme](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) aracılığıyla kullanırsınız. Nasıl kullanacağınızı [burada](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) görebilirsiniz.

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Bunların çoğuyla ya daha önce karşılaştık ya da çoğu oldukça açık. `IWETH.sol` tek istisnadır. Uniswap v2, herhangi bir çift ERC-20 jetonu için takasa izin verir ancak ether'in (ETH) kendisi bir ERC-20 jetonu değildir. Standarttan öncesine tarihlidir ve benzersiz mekanizmalar ile aktarılır. ERC-20 jetonları için geçerli olan sözleşmelerde ETH kullanımını etkinleştirmek için insanlar [paketlenmiş ether (WETH)](https://weth.tkn.eth.limo/) sözleşmesini bulmuştur. Bu sözleşmeye ETH gönderirsiniz ve size eş değer miktarda WETH basar. Veya WETH'yi yakabilir ve ETH'yi geri alabilirsiniz.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Yönlendiricinin hangi fabrikayı kullanacağını ve WETH gerektiren işlemler için hangi WETH sözleşmesinin kullanılacağını bilmesi gerekir. Bu değerler [değiştirilemez](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), yani sadece oluşturucuda ayarlanabilir. Bu durum kullanıcılara, kimsenin bu değerleri güvenilmez sözleşmelere yönlendirecek şekilde değiştiremeyeceğine dair güven verir.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Bu niteleyici, zaman sınırlı işlemlerin ("mümkünse X'i Y zamanından önce yap") zaman sınırından sonra gerçekleşmemesini sağlar.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Yapıcı sadece değişmez durum değişkenlerini ayarlar.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Bu fonksiyon, WETH sözleşmesinden token'ları tekrar ETH'ye döndürdüğümüzde çağrılır. Sadece kullandığımız WETH sözleşmesi bunu yapmak için yetkilidir.

#### Likidite Ekleyin {#add-liquidity}

Bu fonksiyonlar, likidite havuzunu artıran eş takasına token'lar ekler.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Bu fonksiyon, eş takasına yatırılması gereken A ve B jetonlarının miktarını hesaplamak için kullanılır.

```solidity
        address tokenA,
        address tokenB,
```

Bunlar, ERC-20 token sözleşmelerinin adresleridir.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Bunlar, likidite sağlayıcısının yatırmak istediği miktarlardır. Ayrıca yatırılacak maksimum A ve B miktarlarını belirtir.

```solidity
        uint amountAMin,
        uint amountBMin
```

Bunlar, yatırmak için kabul edilebilir minimum tutarlardır. Bu tutarlar veya daha fazlası ile gerçekleşemezse, işlemi geri alın. Bu özelliği istemiyorsanız, sıfırı belirtmeniz yeterlidir.

Likidite sağlayıcıları, işlemi mevcut takas oranına yakın bir takas oranıyla sınırlamak istedikleri için genelde bir minimum tutar belirtir. Takas oranının çok fazla dalgalanması, temeldeki değerleri değiştiren haberler olduğu anlamına gelebilir ve ne yapacaklarına manuel olarak karar vermek isteyebilirler.

Örneğin, takas oranının bire bir olduğu ve likidite sağlayıcısının şu değerleri belirlediği bir durumu hayal edin:

| Parametre      | Değer |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Takas oranı 0,9 ila 1,25 arasında kaldığı sürece işlem gerçekleşir. Takas oranı bu aralığın dışına çıkarsa işlem iptal edilir.

Bu önlemin nedeni işlemlerin hemen olmaması, onları göndermeniz ve sonunda bir madencinin bunları bir bloğa dahil etmesidir (gaz fiyatınız çok düşükse bu durumda, aynı nonce'un üzerine yazmak için daha yüksek bir gaz fiyatı ile başka bir işlem göndermeniz gerekir). Gönderme ile dahil etme arasındaki aralıkta ne olacağını kontrol edemezsiniz.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Fonksiyon, likidite sağlayıcısının rezervler arasındaki mevcut orana eşit bir orana sahip olması için yatırması gereken tutarları döndürür.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Bu token çifti için henüz bir takas yoksa onu oluşturun.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Çiftteki mevcut rezervleri alın.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Mevcut rezervler boşsa, bu yeni bir eş takasıdır. Yatırılacak tutarlar, likidite sağlayıcısının sağlamak istediği miktarlarla tamamen aynı olmalıdır.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Eğer miktarların ne olduğunu görmemiz gerekiyorsa, [bu fonksiyonu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35) kullanarak en uygun miktarı buluruz. Mevcut rezervlerle aynı oranı istiyoruz.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Eğer `amountBOptimal`, likidite sağlayıcısının yatırmak istediği miktardan daha küçükse, bu, B jetonunun şu anda likidite yatırıcısının düşündüğünden daha değerli olduğu anlamına gelir, bu nedenle daha küçük bir miktar gereklidir.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Optimal B miktarı, istenen B miktarından daha fazlaysa bu durum, B jetonlarının şu anda likidite yatıran kişinin düşündüğünden daha az değerli olduğu anlamına gelir; bu nedenle de daha yüksek bir miktar gereklidir. Ancak istenilen miktar bir maksimum olduğu için bunu yapamıyoruz. Bunun yerine, istenen miktarda B token'ı için en uygun A token'ı sayısını hesaplıyoruz.

Hepsini bir araya getirdiğimizde bu grafiği elde ederiz. Bin A jetonu (mavi çizgi) ve bin B jetonu (kırmızı çizgi) yatırmaya çalıştığınızı varsayalım. X ekseni takas oranıdır, A/B. X=1 ise, değer olarak eşittirler ve her birinden bin tane yatırırsınız. A x=2 ise B değerinin iki katıdır (her A jetonu için iki B jetonu alırsınız), bu nedenle bin B jetonu ile ancak 500 A jetonu yatırırsınız. X=0,5 ise, durum tersine çevrilir, bin A token'ı ve beş yüz B token'ı olur.

![Çizelge](liquidityProviderDeposit.png)

Likiditeyi doğrudan ana sözleşmeye yatırabilirsiniz ([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110) kullanarak), ancak ana sözleşme yalnızca kendisinin aldatılmadığını kontrol eder, bu nedenle, işleminizi gönderdiğiniz zaman ile gerçekleştirildiği zaman arasında takas oranı değişirse değer kaybetme riskiyle karşı karşıya kalırsınız. Çevre sözleşmesini kullanırsanız, bu sözleşme yatırmanız gereken tutarı hesaplar ve hemen yatırır; takas oranı değişmez ve hiçbir şey kaybetmezsiniz.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Bu fonksiyon, likidite yatırma işlemiyle çağrılabilir. Çoğu parametre, yukarıdaki `_addLiquidity` ile aynıdır. İki istisna bulunur:

. `to`, likidite sağlayıcısının havuzdaki payını göstermek için basılan yeni likidite token'larını alan adrestir. `deadline` işlemdeki bir zaman sınırıdır

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Fiili olarak yatırılacak tutarları hesaplıyoruz ve ardından likidite havuzunun adresini buluyoruz. Gazdan tasarruf etmek için bunu fabrikaya sorarak değil, `pairFor` kütüphane işlevini kullanarak yaparız (aşağıdaki kütüphanelere bakın)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Kullanıcıdan doğru miktarda token'ı eş takasına aktarın.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Karşılığında, havuzun kısmi sahipliği için `to` adresine likidite token'ları verin. Çekirdek sözleşmenin `mint` fonksiyonu, sahip olduğu ekstra jeton sayısını (son likiditenin değiştiği zamana kıyasla) görür ve buna göre likiditeyi basar.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Bir likidite sağlayıcısı bir Token/ETH eş takasına likidite sağlamak istediğinde, birkaç farklılık vardır. Sözleşme, likidite sağlayıcısı için ETH'yi paketler. Kullanıcının ne kadar ETH yatırmak istediğini belirtmeye gerek yoktur. Çünkü kullanıcı bunları işlemle birlikte gönderir (miktar`msg.value` içinde mevcuttur).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

ETH'yi yatırmak için sözleşme önce onu WETH olarak paketler ve ardından WETH'yi eşe aktarır. Transferin bir `assert` içinde paketlendiğini dikkate alın. Bu, transfer başarısız olursa bu sözleşme çağrısının da başarısız olduğu ve bu nedenle paketleme işleminin gerçekten gerçekleşmediği anlamına gelir.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Kullanıcı bize ETH'yi zaten gönderdi, bu nedenle fazladan kalan varsa (çünkü diğer jeton kullanıcının düşündüğünden daha az değerlidir), bir geri ödeme yapmamız gerekir.

#### Likiditeyi Kaldırın {#remove-liquidity}

Bu işlevler likiditeyi ortadan kaldıracak ve likidite sağlayıcısına geri ödeme yapacaktır.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Likidite kaldırmanın en basit hâli. Likidite sağlayıcısının almayı kabul ettiği her bir jeton için bir minimum miktar vardır ve bu, son tarihten önce gerçekleşmelidir.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Çekirdek sözleşmenin `burn` işlevi, kullanıcıya token'ları geri ödemeyi gerçekleştirir.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Bir fonksiyon, sadece birkaç tanesiyle ilgilendiğimiz birçok değer döndürdüğünde, sadece istediğimiz değerleri şu şekilde elde ederiz. Gaz açısından bir değeri okuyup hiç kullanmamaktan biraz daha ucuzdur.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Tutarları, çekirdek sözleşmenin onları döndürdüğü biçimden (önce alt adres jetonu), kullanıcının beklediği biçime (`tokenA` ve `tokenB`'ye karşılık) çevirin.

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Önce aktarımı yapmak ve ardından yasal olduğunu doğrulamak sorun değildir, çünkü yasal değilse tüm durum değişikliklerini geri alacağız.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

ETH için likiditeyi kaldırma, WETH token'larını almamız ve ardından bunları ETH'nin likidite sağlayıcısına geri vermesi için kullanmamız dışında neredeyse aynıdır.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Bu fonksiyonlar, [izin mekanizmasını](#UniswapV2ERC20) kullanarak, ether'i olmayan kullanıcıların havuzdan çekilmesine izin vermek için meta işlemleri iletir.

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Bu fonksiyon, transfer veya depolama ücreti olan token'lar için kullanılabilir. Bir token'ın bu tür ücretleri olduğunda, token'ın ne kadarını geri aldığımızı bize söylemesi için `removeLiquidity` işlevine güvenemeyiz, bu nedenle önce çekmemiz ve sonra bakiyeyi almamız gerekir.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Son fonksiyon, depolama ücretlerini meta işlemlerle birleştirir.

#### Ticaret {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Bu fonksiyon, ticaret yapanların maruz kaldığı fonksiyonlar için gerekli olan dahili işlemleri gerçekleştirir.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Bunu yazdığım esnada [388.160 ERC-20 token'ı](https://etherscan.io/tokens) bulunmakta. Her bir jeton çifti için bir eş takası olsaydı, 150 milyardan fazla eş takası olurdu. Tüm zincir, şu anda [o sayının sadece %0,1'i kadar hesaba sahiptir](https://etherscan.io/chart/address). Bunun yerine, bir yol kavramını takas fonksiyonları destekler. Bir tacir A'yı B'ye, B'yi C'ye ve C'yi D'ye çevirebilir, dolayısıyla doğrudan bir A-D çifti takasına gerek yoktur.

Bu piyasalardaki fiyatlar senkronize olma eğilimindedir, çünkü senkronize olmadıklarında arbitraj için bir fırsat oluşur. Örneğin A, B ve C olmak üzere üç jeton düşünün. Her çift için bir tane olmak üzere üç eş takası bulunuyor.

1. Başlangıç durumu
2. Ticaret yapan bir kişi 24,695 A token'ı satar ve 25,305 B token'ı alır.
3. Tacir, 25,305 C jetonu karşılığında 24,695 B jetonu satar ve yaklaşık 0,61 B jetonunu kâr olarak tutar.
4. Tacir daha sonra 25,305 A jetonu için 24,695 C jetonu satar ve yaklaşık 0,61 C jetonunu kâr olarak tutar. Tacir ayrıca fazladan 0,61 A jetonuna sahiptir (tacirin sonunda elde ettiği 25,305 eksi 24,695 orijinal yatırımdır).

| Adım | A-B Takası                  | B-C Takası                  | A-C Takası                  |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Şu anda işlemekte olduğumuz çifti alın, sıralayın (çift ile kullanım için) ve beklenen çıktı miktarını alın.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Beklenen miktarları alın, eş takasının beklediği şekilde sıralayın.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Bu son takas mı? Eğer öyleyse ticaretten alınan token'ları hedefe gönderin. Değilse, bir sonraki eş takasına gönderin.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Token'ları takas etmek için eş takasını gerçekten çağırın. Takas hakkında bilgi almak için bir geri çağrıya ihtiyacımız yoktur, bu yüzden o alana herhangi bir bayt göndermeyiz.

```solidity
    function swapExactTokensForTokens(
```

Bu fonksiyon, doğrudan ticaret yapanlar tarafından bir token'ı başka bir token'la değiştirmek için kullanılır.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Bu parametre ERC-20 sözleşmelerinin adreslerini içerir. Yukarıda açıklandığı gibi, sahip olduğunuz varlıktan istediğiniz varlığa ulaşmak için birkaç eş takasından geçmeniz gerekebileceği için bu bir dizidir.

Solidity'de bir fonksiyon parametresi ya `memory` ya da `calldata` olarak depolanabilir. Fonksiyon, çağrılan sözleşmeye doğrudan bir kullanıcıdan (bir işlem kullanılarak) veya farklı bir sözleşmeden giriş noktasıysa, parametrenin değeri doğrudan çağrı verilerinden alınabilir. Yukarıdaki `_swap` gibi bir fonksiyon dahili olarak çağrılırsa, parametrelerin `memory` içinde saklanması gerekir. Çağrılan sözleşmenin bakış açısından `calldata` salt okunurdur.

`uint` veya `address` gibi skaler türlerde depolama seçimini bizim için derleyici halletse de, daha uzun ve daha pahalı olan dizilerde kullanılacak depolama türünü belirtiriz.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Dönen değerler her zaman bellekte döndürülür.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Her takasta satın alınacak tutarı hesaplayın. Sonuç, tacirin kabul etmeye istekli olduğu minimum değerden düşükse, işlemi geri alın.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Son olarak, ilk ERC-20 token'ını ilk eş takası için hesaba aktarın ve `_swap`'i çağırın. Bunların hepsi aynı aktarımda olduğu için eş takası, beklenmeyen jetonların bu transferin bir parçası olduğunu bilir.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Önceki fonksiyon olan `swapTokensForTokens`, bir ticaret yapanın vermek istediği girdi token'larının tam sayısını ve karşılığında almak istediği minimum çıktı token'ları sayısını belirlemesine olanak tanır. Bu fonksiyon ters takas gerçekleştirir, tacirin istediği çıktı jetonlarının ve onlar için ödemek istediği maksimum girdi jetonlarının sayısını belirlemesine olanak tanır.

Her iki durumda da, ticaret yapan kişinin önce bu çevre sözleşmesine, onları transfer etmesine izin vermek için bir ödenek vermesi gerekir.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Bu dört varyantın tümü, ETH ve token'lar arasındaki ticareti içerir. Tek fark, ya ticaret yapandan ETH alıp WETH basmak için kullanmamız ya da yoldaki son değişimden WETH alıp yakarak ticaret yapana ortaya çıkan ETH'yi geri göndermemizdir.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Bu, ([bu sorunu](https://github.com/Uniswap/uniswap-interface/issues/835)) çözmek için aktarım veya depolama ücretleri olan jetonları takas eden dahili fonksiyondur.

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Transfer ücretleri nedeniyle, her transferden ne kadar kazandığımızı bize söylemesi için `getAmountsOut` fonksiyonuna güvenemeyiz (orijinal `_swap`'ı çağırmadan önce yaptığımız gibi). Bunun yerine önce transfer yapmamız ve sonra kaç jeton aldığımızı görmemiz gerekir.

Not: Teoride, tek başına bu işlevi `_swap` yerine kullanabilirdik ancak bazı durumlarda (örneğin, sonunda gerekli minimum değeri karşılamak için yeterli olmadığından transfer geri alınırsa) bu daha fazla gaza mal olur. Transfer ücreti jetonları oldukça nadirdir, bu nedenle onları barındırmamız gerekse de, en az bir takastan geçtiklerini varsaymak için tüm takaslara gerek yoktur.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Bunlar, normal token'lar için kullanılanlarla aynı varyantlardır, ancak bunun yerine `_swapSupportingFeeOnTransferTokens` çağırırlar.

```solidity
    // **** LIBRARY FUNCTIONS ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Bu fonksiyonlar yalnızca [UniswapV2Library fonksiyonlarını çağıran proxy'lerdir](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Bu sözleşme, borsaları eski v1'den v2'ye taşımak için kullanıldı. Artık taşındıklarına için geçerli değildir.

## Kütüphaneler {#libraries}

[SafeMath kütüphanesi](https://docs.openzeppelin.com/contracts/2.x/api/math) iyi belgelenmiştir, dolayısıyla burada belgelemeye gerek yoktur.

### Math {#Math}

Bu kütüphane, normalde Solidity kodunda ihtiyaç duyulmayan bazı matematik fonksiyonlarını içerir, dolayısıyla bunlar dilin bir parçası değildir.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Karekökten daha yüksek bir tahmin olarak x ile başlayın (1-3'ü özel durumlar olarak ele almamızın nedeni budur).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Daha yakın bir tahmin elde etmek için önceki tahmin ile karekökünü bulmaya çalıştığımız sayının önceki tahmine bölünmüş halinin ortalaması alınır. Yeni tahmin, mevcut tahminden daha düşük olmayana kadar tekrarlayın. Daha fazla detay için [buraya bakın](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Sıfırın kareköküne asla ihtiyacımız olmamalı. Bir, iki ve üçün karekökleri kabaca birdir (tam sayıları kullandığımız için kesirleri yok sayarız).

```solidity
        }
    }
}
```

### Sabit Nokta Kesirleri (UQ112x112) {#FixedPoint}

Bu kütüphane normalde Ethereum aritmetiğinin parçası olmayan kesirleri işler. Bunu, _x_ sayısını _x\*2^112_ olarak kodlayarak yapar. Bu, orijinal toplama ve çıkarma işlem kodlarını değişiklik yapmadan kullanmamızı sağlar.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` birin şifrelemesidir.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Y `uint112` olduğundan, en fazla 2^112-1 olabilir. Bu sayı hâlâ `UQ112x112` olarak şifrelenebilir.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Eğer iki `UQ112x112` değerini bölersek, sonuç artık 2^112 tarafından çarpılmaz. Bunun yerine payda için bir tam sayı alıyoruz. Çarpma yapmak için benzer bir hile kullanmamız gerekirdi, ancak `UQ112x112` değerlerinin çarpımını yapmamıza gerek yoktur.

### UniswapV2Library {#uniswapV2library}

Bu kütüphane yalnızca çevre sözleşmeleri tarafından kullanılır

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

İki token'ı adrese göre sıralayın, böylece onlar için eş takasının adresini alabiliriz. Bu, aksi durumda biri A,B parametreleri, diğeri B,A parametreleri olmak üzere iki olasılığımız olacağı ve dolayısıyla bir yerine iki takas gerekeceği için zorunludur.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

Bu fonksiyon, iki token için eş takasının adresini hesaplar. Bu sözleşme, [CREATE2 opcode](https://eips.ethereum.org/EIPS/eip-1014) kullanılarak oluşturulur, bu yüzden kullandığı parametreleri biliyorsak aynı algoritmayı kullanarak adresi hesaplayabiliriz. Bu, fabrikaya sormaktan çok daha ucuzdur.

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Bu fonksiyon, eş takasının sahip olduğu iki token'ın rezervlerini döndürür. Jetonları her iki sıradan biriyle alabileceğini ve bunları dahili kullanım için sıralayabileceğini unutmayın.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Bu fonksiyon, herhangi bir ücret yoksa A token'ı karşılığında alacağınız B token'ı miktarını verir. Bu hesaplama, transferin takas oranını değiştirmesini dikkate alır.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Yukarıdaki `quote` işlevi, eş takasını kullanmak için herhangi bir ücret yoksa harika çalışır. Ancak, %0,3'lük bir takas ücreti varsa gerçekte aldığınız miktar daha düşüktür. Bu fonksiyon, takas ücretinden sonraki tutarı hesaplar.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity kesirleri yerel olarak işlemediği için miktarı doğrudan 0,997 ile çarpamayız. Bunun yerine, aynı etkiyi elde etmek için payı 997, paydayı 1000 ile çarparız.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Bu fonksiyon kabaca aynı şeyi yapar ancak çıktı miktarını alır ve girdi sağlar.

```solidity

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Bu iki fonksiyon, birkaç eş takasından geçmek gerektiğinde değerleri tanımlamayı sağlar.

### Transfer Yardımcısı {#transfer-helper}

[Bu kütüphane](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol), ERC-20 ve Ethereum transfer işlemleri ile ilgili başarı kontrolleri ekleyerek bir geri alım ile `yanlış` değer dönüşünün aynı şekilde işlenmesini sağlar.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

İki yoldan biriyle farklı bir sözleşme çağırabiliriz:

- Bir fonksiyon çağrısı oluşturmak için bir arayüz tanımı kullanın
- Çağrıyı "manuel olarak" oluşturmak için [uygulama ikili arayüzünü (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) kullanın. Kodun yazarı bunu yapmaya karar vermişti.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Bir ERC-20 çağrısı, ERC-20 standardından önce oluşturulmuş jetonla geriye dönük uyumluluk sağlamak adına ya geri döndürülerek (bu durumda `success`, `false` olur) veya başarılı olup bir `false` değeri döndürerek (bu durumda çıktı verileri vardır ve verinin kodunu mantıksal olarak çözerseniz `false` alırsınız) başarısız olabilir.

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Bu fonksiyon, [ERC-20'nin transfer işlevselliğini](https://eips.ethereum.org/EIPS/eip-20#transfer) uygular ve bu, bir hesabın farklı bir hesap tarafından sağlanan ödeneği harcamasına izin verir.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Bu fonksiyon, [ERC-20'nin transferFrom işlevselliğini](https://eips.ethereum.org/EIPS/eip-20#transferfrom) uygular ve bu, bir hesabın farklı bir hesap tarafından sağlanan ödeneği harcamasına izin verir.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Bu fonksiyon, ether'ı bir hesaba aktarır. Farklı bir sözleşmeye yapılan herhangi bir çağrı, ether göndermeyi deneyebilir. Aslında herhangi bir fonksiyonu çağırmamız gerekmediğinden, çağrıyla birlikte herhangi bir veri göndermeyiz.

## Sonuç {#conclusion}

Bu yaklaşık 50 sayfalık uzun bir makaledir. Buraya kadar varabildiyseniz tebrikler! Umuyoruz ki şimdiye kadar gerçek hayatta bir uygulama yazarken (kısa örnek programların aksine) dikkate alınması gereken hususları kavramış ve kendi kullanım alanlarınız için sözleşmeler yazabilme konusunda daha iyi durumdasınızdır.

Şimdi faydalı bir şeyler yazarak bizi büyüleyin.
