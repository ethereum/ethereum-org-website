---
title: "Uniswap-v2 Sözleşmesi İncelemesi"
description: "Uniswap-v2 sözleşmesi nasıl çalışır? Neden bu şekilde yazılmıştır?"
author: Ori Pomerantz
tags: ["Solidity", "dapp'ler"]
skill: intermediate
breadcrumb: "Uniswap v2 incelemesi"
published: 2021-05-01
lang: tr
---
## Giriş {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf), herhangi iki ERC-20 token'ı arasında bir takas piyasası oluşturabilir. Bu makalede, bu protokolü uygulayan sözleşmelerin kaynak kodunu inceleyecek ve neden bu şekilde yazıldıklarını göreceğiz.

### Uniswap Ne Yapar? {#what-does-uniswap-do}

Temel olarak iki tür kullanıcı vardır: likidite sağlayıcılar ve alım satım yapanlar.

_Likidite sağlayıcılar_, havuza takas edilebilecek iki token'ı sağlarlar (bunları **Token0** ve **Token1** olarak adlandıracağız). Karşılığında, havuzun kısmi sahipliğini temsil eden ve _likidite token'ı_ olarak adlandırılan üçüncü bir token alırlar.

_Alım satım yapanlar_, havuza bir tür token gönderir ve likidite sağlayıcılar tarafından sağlanan havuzdan diğerini alırlar (örneğin, **Token0** gönderip **Token1** alırlar). Takas kuru, havuzun sahip olduğu **Token0** ve **Token1**'lerin göreceli sayısına göre belirlenir. Buna ek olarak havuz, likidite havuzu için bir ödül olarak küçük bir yüzde alır.

Likidite sağlayıcılar varlıklarını geri istediklerinde, havuz token'larının yakımını gerçekleştirebilir ve ödüllerdeki payları da dahil olmak üzere token'larını geri alabilirler.

[Daha kapsamlı bir açıklama için buraya tıklayın](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Neden v2? Neden v3 değil? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf), v2'den çok daha karmaşık olan bir yükseltmedir. Önce v2'yi öğrenip ardından v3'e geçmek daha kolaydır.

### Çekirdek Sözleşmeler ve Çevre Sözleşmeleri {#contract-types}

Uniswap v2, çekirdek ve çevre olmak üzere iki bileşene ayrılmıştır. Bu ayrım, varlıkları tutan ve bu nedenle güvenli _olması gereken_ çekirdek sözleşmelerin daha basit ve denetlenmesinin daha kolay olmasını sağlar. Alım satım yapanların ihtiyaç duyduğu tüm ekstra işlevsellik daha sonra çevre sözleşmeleri tarafından sağlanabilir.

## Veri ve Kontrol Akışları {#flows}

Uniswap'ın üç ana eylemini gerçekleştirdiğinizde meydana gelen veri ve kontrol akışı şöyledir:

1. Farklı token'lar arasında takas yapmak
2. Piyasaya likidite eklemek ve ödül olarak çift borsası ERC-20 likidite token'ları almak
3. ERC-20 likidite token'larını yakmak ve çift borsasının yatırımcıların takas etmesine izin verdiği ERC-20 token'larını geri almak

### Takas {#swap-flow}

Bu, yatırımcılar tarafından kullanılan en yaygın akıştır:

#### Çağırıcı {#caller}

1. Periphery hesabına takas edilecek miktar kadar harcama izni verin.
2. Periphery sözleşmesinin birçok takas fonksiyonundan birini çağırın (hangisinin çağrılacağı, ETH'nin dahil olup olmadığına, yatırımcının yatırılacak token miktarını mı yoksa geri alınacak token miktarını mı belirttiğine vb. bağlıdır).
   Her takas fonksiyonu, üzerinden geçilecek borsaların bir dizisi olan bir `path` kabul eder.

#### Periphery sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Yol boyunca her borsada alınıp satılması gereken miktarları belirleyin.
4. Yol üzerinde yineler. Yol boyunca her borsa için girdi token'ını gönderir ve ardından borsanın `swap` fonksiyonunu çağırır.
   Çoğu durumda token'lar için hedef adres, yoldaki bir sonraki çift borsasıdır. Son borsada ise yatırımcı tarafından sağlanan adrestir.

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Çekirdek sözleşmenin kandırılmadığını ve takastan sonra yeterli likiditeyi koruyabildiğini doğrulayın.
6. Bilinen rezervlere ek olarak ne kadar fazladan token'ımız olduğuna bakın. Bu miktar, takas etmek için aldığımız girdi token'larının sayısıdır.
7. Çıktı token'larını hedefe gönderin.
8. Rezerv miktarlarını güncellemek için `_update` çağrısı yapın

#### Periphery sözleşmesine dönüş (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Gerekli temizlik işlemlerini gerçekleştirin (örneğin, yatırımcıya gönderilecek ETH'yi geri almak için WETH token'larını yakmak)

### Likidite Ekleme {#add-liquidity-flow}

#### Çağırıcı {#caller-2}

1. Periphery hesabına, likidite havuzuna eklenecek miktarlarda harcama izni verin.
2. Periphery sözleşmesinin `addLiquidity` fonksiyonlarından birini çağırın.

#### Periphery sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Gerekirse yeni bir çift borsası oluşturun
4. Mevcut bir çift borsası varsa, eklenecek token miktarını hesaplayın. Bunun her iki token için de aynı değerde olması, yani yeni token'ların mevcut token'lara oranının aynı olması gerekir.
5. Miktarların kabul edilebilir olup olmadığını kontrol edin (çağırıcılar, altına düştüğünde likidite eklememeyi tercih edecekleri minimum bir miktar belirtebilirler)
6. Çekirdek sözleşmeyi çağırın.

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Likidite token'ları basın ve bunları çağırıcıya gönderin
8. Rezerv miktarlarını güncellemek için `_update` çağrısı yapın

### Likidite Çıkarma {#remove-liquidity-flow}

#### Çağırıcı {#caller-3}

1. Periphery hesabına, dayanak token'lar karşılığında yakılacak likidite token'ları için harcama izni verin.
2. Periphery sözleşmesinin `removeLiquidity` fonksiyonlarından birini çağırın.

#### Periphery sözleşmesinde (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Likidite token'larını çift borsasına gönderin

#### Çekirdek sözleşmede (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Hedef adrese, yakılan token'larla orantılı olarak dayanak token'ları gönderin. Örneğin havuzda 1000 A token'ı, 500 B token'ı ve 90 likidite token'ı varsa ve yakmak için 9 token alırsak, likidite token'larının %10'unu yakıyoruz demektir, bu nedenle kullanıcıya 100 A token'ı ve 50 B token'ı geri göndeririz.
5. Likidite token'larını yakın
6. Rezerv miktarlarını güncellemek için `_update` çağrısı yapın

## Çekirdek Sözleşmeler {#core-contracts}

Bunlar, likiditeyi tutan güvenli sözleşmelerdir.

### UniswapV2Pair.sol {#uniswapv2pair}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol), token'ları takas eden asıl havuzu uygular. Bu, temel Uniswap işlevselliğidir.

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

Bunlar, sözleşmenin ya kendisi uyguladığı için (`IUniswapV2Pair` ve `UniswapV2ERC20`) ya da bunları uygulayan sözleşmeleri çağırdığı için bilmesi gereken tüm arayüzlerdir.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Bu sözleşme, likidite token'ları için ERC-20 fonksiyonlarını sağlayan `UniswapV2ERC20` sözleşmesinden miras alır.

```solidity
    using SafeMath  for uint;
```

[SafeMath kütüphanesi](https://docs.openzeppelin.com/contracts/2.x/api/math), taşmaları (overflow) ve alt taşmaları (underflow) önlemek için kullanılır. Bu önemlidir çünkü aksi takdirde bir değerin `-1` olması gerekirken `2^256-1` olduğu bir durumla karşılaşabiliriz.

```solidity
    using UQ112x112 for uint224;
```

Havuz sözleşmesindeki birçok hesaplama kesirler gerektirir. Ancak kesirler EVM tarafından desteklenmez.
Uniswap'ın bulduğu çözüm, tam sayı kısmı için 112 bit ve kesir kısmı için 112 bit olmak üzere 224 bitlik değerler kullanmaktır. Yani `1.0`, `2^112` olarak temsil edilir, `1.5`, `2^112 + 2^111` olarak temsil edilir vb.

Bu kütüphane hakkında daha fazla ayrıntı [belgenin ilerleyen kısımlarında](#fixedpoint) mevcuttur.

#### Değişkenler {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Sıfıra bölme durumlarından kaçınmak için, her zaman var olan (ancak sıfırıncı hesaba ait olan) minimum sayıda likidite token'ı vardır. Bu sayı **MINIMUM_LIQUIDITY**'dir, yani bindir.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Bu, ERC-20 transfer fonksiyonu için ABI seçicisidir. İki token hesabındaki ERC-20 token'larını transfer etmek için kullanılır.

```solidity
    address public factory;
```

Bu, bu havuzu oluşturan fabrika sözleşmesidir. Her havuz iki ERC-20 token'ı arasında bir takastır, fabrika tüm bu havuzları birbirine bağlayan merkezi bir noktadır.

```solidity
    address public token0;
    address public token1;
```

Bu havuz tarafından takas edilebilen iki tür ERC-20 token'ı için sözleşmelerin adresleri vardır.

```solidity
    uint112 private reserve0;           // tek bir depolama yuvası kullanır, getReserves aracılığıyla erişilebilir
    uint112 private reserve1;           // tek bir depolama yuvası kullanır, getReserves aracılığıyla erişilebilir
```

Havuzun her bir token türü için sahip olduğu rezervler. İkisinin de aynı miktarda değeri temsil ettiğini ve bu nedenle her bir token0'ın reserve1/reserve0 token1 değerinde olduğunu varsayıyoruz.

```solidity
    uint32  private blockTimestampLast; // tek bir depolama yuvası kullanır, getReserves aracılığıyla erişilebilir
```

Zaman içindeki döviz kurlarını izlemek için kullanılan, bir takasın gerçekleştiği son bloğun zaman damgası.

Ethereum sözleşmelerinin en büyük gaz giderlerinden biri, sözleşmenin bir çağrısından diğerine kalıcı olan depolamadır. Her depolama hücresi 256 bit uzunluğundadır. Bu nedenle `reserve0`, `reserve1` ve `blockTimestampLast` olmak üzere üç değişken, tek bir depolama değerinin üçünü de içerebileceği şekilde tahsis edilir (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Bu değişkenler, her bir token için (her biri diğeri cinsinden) kümülatif maliyetleri tutar. Belirli bir süre boyunca ortalama döviz kurunu hesaplamak için kullanılabilirler.

```solidity
    uint public kLast; // reserve0 * reserve1, en son Likidite olayından hemen sonraki haliyle
```

Çift takasının token0 ve token1 arasındaki döviz kuruna karar verme yolu, işlemler sırasında iki rezervin çarpımını sabit tutmaktır. `kLast` bu değerdir. Bir likidite sağlayıcı token yatırdığında veya çektiğinde değişir ve %0,3'lük piyasa ücreti nedeniyle biraz artar.

İşte basit bir örnek. Basitlik adına tablonun ondalık noktadan sonra sadece üç basamağı olduğuna ve %0,3'lük işlem ücretini göz ardı ettiğimize dikkat edin, bu nedenle sayılar tam olarak doğru değildir.

| Olay                                                                       |  reserve0 |  reserve1 | reserve0 \* reserve1 | Ortalama döviz kuru (token1 / token0) |
| -------------------------------------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| İlk kurulum                                                                | 1,000.000 | 1,000.000 |            1,000,000 |                                         |
| Yatırımcı A, 47.619 token1 karşılığında 50 token0 takas eder               | 1,050.000 |   952.381 |            1,000,000 | 0.952                                   |
| Yatırımcı B, 8.984 token1 karşılığında 10 token0 takas eder                | 1,060.000 |   943.396 |            1,000,000 | 0.898                                   |
| Yatırımcı C, 34.305 token1 karşılığında 40 token0 takas eder               | 1,100.000 |   909.090 |            1,000,000 | 0.858                                   |
| Yatırımcı D, 109.01 token0 karşılığında 100 token1 takas eder              |   990.990 | 1,009.090 |            1,000,000 | 0.917                                   |
| Yatırımcı E, 10.079 token1 karşılığında 10 token0 takas eder               | 1,000.990 |   999.010 |            1,000,000 | 1.008                                   |

Yatırımcılar daha fazla token0 sağladıkça, arz ve talebe bağlı olarak token1'in göreceli değeri artar ve bunun tersi de geçerlidir.

#### Kilit {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[Yeniden giriş (reentrancy) istismarına](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) dayanan bir güvenlik açığı sınıfı vardır. Uniswap'ın rastgele ERC-20 token'larını transfer etmesi gerekir, bu da kendilerini çağıran Uniswap piyasasını istismar etmeye çalışabilecek ERC-20 sözleşmelerini çağırmak anlamına gelir.
Sözleşmenin bir parçası olarak bir `unlocked` değişkenine sahip olarak, fonksiyonların çalışırken (aynı işlem içinde) çağrılmasını önleyebiliriz.

```solidity
    modifier lock() {
```

Bu fonksiyon bir [değiştiricidir (modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), davranışını bir şekilde değiştirmek için normal bir fonksiyonu saran bir fonksiyondur.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Eğer `unlocked` bire eşitse, onu sıfıra ayarlayın. Zaten sıfırsa çağrıyı geri alın (revert), başarısız olmasını sağlayın.

```solidity
        _;
```

Bir değiştiricide `_;`, orijinal fonksiyon çağrısıdır (tüm parametrelerle birlikte). Burada, fonksiyon çağrısının yalnızca çağrıldığında `unlocked` bir ise gerçekleştiği ve çalışırken `unlocked` değerinin sıfır olduğu anlamına gelir.

```solidity
        unlocked = 1;
    }
```

Ana fonksiyon döndükten sonra kilidi serbest bırakın.

#### Çeşitli fonksiyonlar {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Bu fonksiyon, arayanlara takasın mevcut durumunu sağlar. Solidity fonksiyonlarının [birden fazla değer döndürebileceğine](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values) dikkat edin.

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Bu dahili fonksiyon, takastan başka birine bir miktar ERC-20 token'ı transfer eder. `SELECTOR`, çağırdığımız fonksiyonun `transfer(address,uint)` olduğunu belirtir (yukarıdaki tanıma bakın).

Token fonksiyonu için bir arayüz içe aktarmak zorunda kalmamak için, [ABI fonksiyonlarından](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions) birini kullanarak çağrıyı "manuel olarak" oluşturuyoruz.

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Bir ERC-20 transfer çağrısının başarısızlığı bildirmesinin iki yolu vardır:

1. Geri al (Revert). Harici bir sözleşmeye yapılan çağrı geri alınırsa, boolean dönüş değeri `false` olur.
2. Normal şekilde sonlanır ancak bir başarısızlık bildirir. Bu durumda dönüş değeri arabelleği sıfır olmayan bir uzunluğa sahiptir ve bir boolean değeri olarak çözüldüğünde `false` olur.

Bu koşullardan herhangi biri gerçekleşirse, geri alın.

#### Olaylar {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Bu iki olay, bir likidite sağlayıcı likidite yatırdığında (`Mint`) veya çektiğinde (`Burn`) yayınlanır. Her iki durumda da, yatırılan veya çekilen token0 ve token1 miktarları, bizi çağıran hesabın kimliği (`sender`) ile birlikte olayın bir parçasıdır. Bir çekim durumunda olay, gönderenle aynı olmayabilen, token'ları alan hedefi (`to`) de içerir.

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

Bu olay, bir yatırımcı bir token'ı diğeriyle takas ettiğinde yayınlanır. Yine, gönderen ve hedef aynı olmayabilir.
Her bir token takasa gönderilebilir veya takastan alınabilir.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Son olarak, en son rezerv bilgisini (ve dolayısıyla döviz kurunu) sağlamak için, nedenden bağımsız olarak token'lar her eklendiğinde veya çekildiğinde `Sync` yayınlanır.

#### Kurulum Fonksiyonları {#pair-setup}

Bu fonksiyonların, yeni çift takası kurulduğunda bir kez çağrılması beklenir.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Kurucu (constructor), çifti oluşturan fabrikanın adresini takip edeceğimizden emin olur. Bu bilgi `initialize` ve (eğer varsa) fabrika ücreti için gereklidir.

```solidity
    // dağıtım sırasında fabrika tarafından bir kez çağrılır
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // yeterlilik kontrolü
        token0 = _token0;
        token1 = _token1;
    }
```

Bu fonksiyon, fabrikanın (ve yalnızca fabrikanın) bu çiftin takas edeceği iki ERC-20 token'ını belirlemesine olanak tanır.

#### Dahili Güncelleme Fonksiyonları {#pair-update-internal}

##### \_update {#}

```solidity
    // rezervleri ve her Blok başına ilk çağrıda fiyat biriktiricilerini günceller
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Bu fonksiyon, token'lar her yatırıldığında veya çekildiğinde çağrılır.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Eğer balance0 veya balance1 (uint256), uint112(-1) (=2^112-1) değerinden yüksekse (böylece uint112'ye dönüştürüldüğünde taşar ve 0'a geri döner), taşmaları önlemek için \_update işlemine devam etmeyi reddedin. 10^18 birime bölünebilen normal bir token ile bu, her takasın her bir token'dan yaklaşık 5.1\*10^15 ile sınırlı olduğu anlamına gelir. Şimdiye kadar bu bir sorun olmadı.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // taşma istenmektedir
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Geçen süre sıfır değilse, bu bloktaki ilk takas işlemi olduğumuz anlamına gelir. Bu durumda, maliyet biriktiricilerini güncellememiz gerekir.

```solidity
            // * asla taşmaz ve + taşması istenir
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Her maliyet biriktiricisi, en son maliyet (diğer token'ın rezervi/bu token'ın rezervi) çarpı saniye cinsinden geçen süre ile güncellenir. Ortalama bir fiyat elde etmek için, iki zaman noktasındaki kümülatif fiyatı okur ve aralarındaki zaman farkına bölersiniz. Örneğin, şu olay dizisini varsayalım:

| Olay                                                                     |  reserve0 |  reserve1 | zaman damgası | Marjinal döviz kuru (reserve1 / reserve0) |       price0CumulativeLast |
| ------------------------------------------------------------------------ | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| İlk kurulum                                                              | 1,000.000 | 1,000.000 | 5,000     |                                        1.000 |                          0 |
| Yatırımcı A 50 token0 yatırır ve 47.619 token1 geri alır                 | 1,050.000 |   952.381 | 5,020     |                                        0.907 |                         20 |
| Yatırımcı B 10 token0 yatırır ve 8.984 token1 geri alır                  | 1,060.000 |   943.396 | 5,030     |                                        0.890 |       20+10\*0.907 = 29.07 |
| Yatırımcı C 40 token0 yatırır ve 34.305 token1 geri alır                 | 1,100.000 |   909.090 | 5,100     |                                        0.826 |    29.07+70\*0.890 = 91.37 |
| Yatırımcı D 100 token1 yatırır ve 109.01 token0 geri alır                |   990.990 | 1,009.090 | 5,110     |                                        1.018 |    91.37+10\*0.826 = 99.63 |
| Yatırımcı E 10 token0 yatırır ve 10.079 token1 geri alır                 | 1,000.990 |   999.010 | 5,150     |                                        0.998 | 99.63+40\*1.1018 = 143.702 |

Diyelim ki 5.030 ve 5.150 zaman damgaları arasında **Token0**'ın ortalama fiyatını hesaplamak istiyoruz. `price0Cumulative` değerindeki fark 143.702-29.07=114.632'dir. Bu, iki dakika (120 saniye) boyunca ortalamadır. Yani ortalama fiyat 114.632/120 = 0.955'tir.

Bu fiyat hesaplaması, eski rezerv boyutlarını bilmemiz gerekmesinin nedenidir.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Son olarak, global değişkenleri güncelleyin ve bir `Sync` olayı yayınlayın.

##### \_mintFee {#}

```solidity
    // eğer ücret açıksa, sqrt(k)'daki büyümenin 1/6'sına eşdeğer Likidite bas
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0'da yatırımcılar piyasayı kullanmak için %0,30 ücret öderler. Bu ücretin çoğu (işlemin %0,25'i) her zaman likidite sağlayıcılara gider. Kalan %0,05'lik kısım ya likidite sağlayıcılara ya da Uniswap'a geliştirme çabaları için ödeme yapan bir protokol ücreti olarak fabrika tarafından belirlenen bir adrese gidebilir.

Hesaplamaları (ve dolayısıyla gaz maliyetlerini) azaltmak için bu ücret, her işlemde değil, yalnızca havuza likidite eklendiğinde veya havuzdan çıkarıldığında hesaplanır.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Fabrikanın ücret hedefini okuyun. Eğer sıfırsa, protokol ücreti yoktur ve bu ücreti hesaplamaya gerek yoktur.

```solidity
        uint _kLast = kLast; // Gaz tasarrufu
```

`kLast` durum değişkeni depolamada bulunur, bu nedenle sözleşmeye yapılan farklı çağrılar arasında bir değere sahip olacaktır.
Depolamaya erişim, sözleşmeye yapılan fonksiyon çağrısı sona erdiğinde serbest bırakılan geçici belleğe erişimden çok daha pahalıdır, bu nedenle gazdan tasarruf etmek için dahili bir değişken kullanırız.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Likidite sağlayıcılar paylarını sadece likidite token'larının değer kazanmasıyla alırlar. Ancak protokol ücreti, yeni likidite token'larının basılmasını ve `feeTo` adresine sağlanmasını gerektirir.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Protokol ücreti tahsil edilecek yeni bir likidite varsa. Karekök fonksiyonunu [bu makalenin ilerleyen kısımlarında](#math) görebilirsiniz.

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Ücretlerin bu karmaşık hesaplaması [tanıtım belgesinin](https://app.uniswap.org/whitepaper.pdf) 5. sayfasında açıklanmıştır. `kLast` değerinin hesaplandığı zaman ile şu an arasında hiçbir likiditenin eklenmediğini veya çıkarılmadığını biliyoruz (çünkü bu hesaplamayı her likidite eklendiğinde veya çıkarıldığında, gerçekten değişmeden önce çalıştırıyoruz), bu nedenle `reserve0 * reserve1` değerindeki herhangi bir değişiklik işlem ücretlerinden kaynaklanmalıdır (onlar olmasaydı `reserve0 * reserve1` değerini sabit tutardık).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Ek likidite token'larını gerçekten oluşturmak ve bunları `feeTo` adresine atamak için `UniswapV2ERC20._mint` fonksiyonunu kullanın.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Eğer bir ücret yoksa `kLast` değerini sıfıra ayarlayın (zaten öyle değilse). Bu sözleşme yazıldığında, sözleşmeleri ihtiyaç duymadıkları depolamayı sıfırlayarak Ethereum durumunun genel boyutunu küçültmeye teşvik eden bir [gaz iadesi özelliği](https://eips.ethereum.org/EIPS/eip-3298) vardı.
Bu kod, mümkün olduğunda bu iadeyi alır.

#### Dışarıdan Erişilebilir Fonksiyonlar {#pair-external}

Herhangi bir işlem veya sözleşme bu fonksiyonları çağırabilse de, bunların çevre (periphery) sözleşmesinden çağrılmak üzere tasarlandığını unutmayın. Bunları doğrudan çağırırsanız çift takasını kandıramazsınız, ancak bir hata nedeniyle değer kaybedebilirsiniz.

##### mint {#}

```solidity
    // bu düşük seviyeli fonksiyon, önemli güvenlik kontrollerini gerçekleştiren bir Sözleşme tarafından çağrılmalıdır
    function mint(address to) external lock returns (uint liquidity) {
```

Bu fonksiyon, bir likidite sağlayıcı havuza likidite eklediğinde çağrılır. Ödül olarak ek likidite token'ları basar. Aynı işlemde likiditeyi ekledikten sonra onu çağıran [bir çevre sözleşmesinden](#uniswapv2router02) çağrılmalıdır (böylece başka hiç kimse meşru sahibinden önce yeni likiditeyi talep eden bir işlem gönderemez).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaz tasarrufu
```

Bu, birden fazla değer döndüren bir Solidity fonksiyonunun sonuçlarını okumanın yoludur. İhtiyacımız olmadığı için döndürülen son değerleri, yani blok zaman damgasını atıyoruz.

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

Varsa tahsil edilecek protokol ücretlerini hesaplayın ve buna göre likidite token'ları basın. `_mintFee` parametreleri eski rezerv değerleri olduğundan, ücret yalnızca ücretlerden kaynaklanan havuz değişikliklerine göre doğru bir şekilde hesaplanır.

```solidity
        uint _totalSupply = totalSupply; // Gaz tasarrufu, totalSupply _mintFee içinde güncellenebileceğinden burada tanımlanmalıdır
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // ilk MINIMUM_LIQUIDITY Token'larını kalıcı olarak kilitle
```

Eğer bu ilk yatırma işlemiyse, `MINIMUM_LIQUIDITY` token oluşturun ve bunları kilitlemek için sıfır adresine gönderin. Bunlar asla kullanılamaz, bu da havuzun asla tamamen boşaltılmayacağı anlamına gelir (bu bizi bazı yerlerde sıfıra bölünmekten kurtarır). `MINIMUM_LIQUIDITY` değeri bindir, bu da çoğu ERC-20'nin ETH'nin Wei'ye bölünmesi gibi bir token'ın 10^-18'i birimlerine bölündüğü düşünüldüğünde, tek bir token'ın değerinin 10^-15'idir. Yüksek bir maliyet değil.

İlk yatırma işlemi sırasında iki token'ın göreceli değerini bilmiyoruz, bu nedenle yatırma işleminin bize her iki token'da da eşit değer sağladığını varsayarak miktarları çarpıyor ve karekökünü alıyoruz.

Buna güvenebiliriz çünkü arbitraj nedeniyle değer kaybetmekten kaçınmak için eşit değer sağlamak yatırıcının çıkarınadır.
Diyelim ki iki token'ın değeri aynı, ancak yatırıcımız **Token0**'ın dört katı kadar **Token1** yatırdı. Bir yatırımcı, çift takasının **Token0**'ın daha değerli olduğunu düşünmesi gerçeğini kullanarak ondan değer elde edebilir.

| Olay                                                                         | reserve0 | reserve1 | reserve0 \* reserve1 | Havuzun değeri (reserve0 + reserve1) |
| ---------------------------------------------------------------------------- | -------: | -------: | -------------------: | --------------------------------------: |
| İlk kurulum                                                                  |        8 |       32 |                  256 |                                      40 |
| Yatırımcı 8 **Token0** token'ı yatırır, 16 **Token1** geri alır              |       16 |       16 |                  256 |                                      32 |

Gördüğünüz gibi, yatırımcı havuzun değerindeki bir düşüşten kaynaklanan fazladan 8 token kazandı ve bu da ona sahip olan yatırıcıya zarar verdi.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Sonraki her yatırma işleminde iki varlık arasındaki döviz kurunu zaten biliyoruz ve likidite sağlayıcıların her ikisinde de eşit değer sağlamasını bekliyoruz. Eğer yapmazlarsa, onlara bir ceza olarak sağladıkları daha düşük değere göre likidite token'ları veririz.

İster ilk yatırma işlemi ister sonraki bir işlem olsun, sağladığımız likidite token'larının sayısı `reserve0*reserve1` değerindeki değişimin kareköküne eşittir ve likidite token'ının değeri değişmez (her iki türün de eşit değerlerine sahip olmayan bir yatırma işlemi almadığımız sürece, bu durumda "ceza" dağıtılır). İşte aynı değere sahip iki token ile üç iyi yatırma işlemi ve bir kötü yatırma işlemi (yalnızca bir token türünün yatırılması, bu nedenle herhangi bir likidite token'ı üretmez) içeren başka bir örnek.

| Olay                      | reserve0 | reserve1 | reserve0 \* reserve1 | Havuz değeri (reserve0 + reserve1) | Bu yatırma işlemi için basılan likidite token'ları | Toplam likidite token'ları | her bir likidite token'ının değeri |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| İlk kurulum               |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| Her türden dört tane yatırın |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| Her türden iki tane yatırın  |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| Eşit olmayan değerde yatırma |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| Arbitraj sonrası          |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Ek likidite token'larını gerçekten oluşturmak ve bunları doğru hesaba vermek için `UniswapV2ERC20._mint` fonksiyonunu kullanın.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 ve reserve1 günceldir
        emit Mint(msg.sender, amount0, amount1);
    }
```

Durum değişkenlerini (`reserve0`, `reserve1` ve gerekirse `kLast`) güncelleyin ve uygun olayı yayınlayın.

##### burn {#}

```solidity
    // bu düşük seviyeli fonksiyon, önemli güvenlik kontrollerini gerçekleştiren bir Sözleşme tarafından çağrılmalıdır
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Bu fonksiyon, likidite çekildiğinde ve uygun likidite token'larının yakılması gerektiğinde çağrılır.
Ayrıca [bir çevre hesabından](#uniswapv2router02) çağrılmalıdır.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaz tasarrufu
        address _token0 = token0;                                // Gaz tasarrufu
        address _token1 = token1;                                // Gaz tasarrufu
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Çevre sözleşmesi, çağrıdan önce yakılacak likiditeyi bu sözleşmeye transfer etti. Bu şekilde ne kadar likidite yakacağımızı biliyoruz ve yakıldığından emin olabiliyoruz.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // Gaz tasarrufu, totalSupply _mintFee içinde güncellenebileceğinden burada tanımlanmalıdır
        amount0 = liquidity.mul(balance0) / _totalSupply; // bakiyelerin kullanılması oransal dağılımı sağlar
        amount1 = liquidity.mul(balance1) / _totalSupply; // bakiyelerin kullanılması oransal dağılımı sağlar
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Likidite sağlayıcı her iki token'dan da eşit değer alır. Bu şekilde döviz kurunu değiştirmemiş oluruz.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 ve reserve1 günceldir
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` fonksiyonunun geri kalanı, yukarıdaki `mint` fonksiyonunun ayna görüntüsüdür.

##### swap {#}

```solidity
    // bu düşük seviyeli fonksiyon, önemli güvenlik kontrollerini gerçekleştiren bir Sözleşme tarafından çağrılmalıdır
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Bu fonksiyonun da [bir çevre sözleşmesinden](#uniswapv2router02) çağrılması beklenir.

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaz tasarrufu
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1} için kapsam, yığın çok derin hatalarını önler
```

Yerel değişkenler bellekte veya çok fazla yoksa doğrudan yığında (stack) saklanabilir.
Sayıyı sınırlandırabilirsek, yığını kullanacağımız için daha az gaz kullanırız. Daha fazla ayrıntı için bkz. [Sarı Bülten, resmi Ethereum spesifikasyonları](https://ethereum.github.io/yellowpaper/paper.pdf), s. 26, denklem 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // Token'ları iyimser bir şekilde transfer et
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // Token'ları iyimser bir şekilde transfer et
```

Bu transfer iyimserdir, çünkü tüm koşulların karşılandığından emin olmadan önce transfer ederiz. Bu Ethereum'da sorun değildir çünkü çağrının ilerleyen kısımlarında koşullar karşılanmazsa, işlemi ve yarattığı tüm değişiklikleri geri alırız (revert).

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

İstenirse alıcıyı takas hakkında bilgilendirin.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Mevcut bakiyeleri alın. Çevre sözleşmesi, takas için bizi çağırmadan önce bize token'ları gönderir. Bu, sözleşmenin kandırılmadığını kontrol etmesini kolaylaştırır; bu kontrol çekirdek sözleşmede gerçekleşmek _zorundadır_ (çünkü çevre sözleşmemiz dışındaki diğer varlıklar tarafından da çağrılabiliriz).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjusted için kapsam, yığın çok derin hatalarını önler
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Bu, takastan kaybetmediğimizden emin olmak için bir mantık kontrolüdür. Bir takasın `reserve0*reserve1` değerini düşürmesi gereken hiçbir durum yoktur. Burası aynı zamanda takasta %0,3'lük bir ücretin gönderildiğinden emin olduğumuz yerdir; K değerini mantık kontrolünden geçirmeden önce, her iki bakiyeyi 1000 ile çarpıp miktarların 3 ile çarpımını çıkarıyoruz, bu da K değerini mevcut rezervlerin K değeriyle karşılaştırmadan önce bakiyeden %0,3'ün (3/1000 = 0,003 = %0,3) düşüldüğü anlamına gelir.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0` ve `reserve1` değerlerini ve gerekirse fiyat biriktiricilerini ve zaman damgasını güncelleyin ve bir olay yayınlayın.

##### Sync veya Skim {#}

Gerçek bakiyelerin, çift takasının sahip olduğunu düşündüğü rezervlerle eşzamanlamasının bozulması mümkündür.
Sözleşmenin izni olmadan token çekmenin bir yolu yoktur, ancak yatırma işlemleri farklı bir konudur. Bir hesap, `mint` veya `swap` fonksiyonlarını çağırmadan takasa token transfer edebilir.

Bu durumda iki çözüm vardır:

- `sync`, rezervleri mevcut bakiyelere güncelleyin
- `skim`, ekstra miktarı çekin. Token'ları kimin yatırdığını bilmediğimiz için herhangi bir hesabın `skim` çağırmasına izin verildiğini unutmayın. Bu bilgi bir olayda yayınlanır, ancak olaylara blokzincirden erişilemez.

```solidity
    // bakiyeleri rezervlerle eşleşmeye zorla
    function skim(address to) external lock {
        address _token0 = token0; // Gaz tasarrufu
        address _token1 = token1; // Gaz tasarrufu
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // rezervleri bakiyelerle eşleşmeye zorla
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) çift takaslarını oluşturur.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Bu durum değişkenleri protokol ücretini uygulamak için gereklidir (bkz. [tanıtım belgesi](https://app.uniswap.org/whitepaper.pdf), s. 5).
`feeTo` adresi protokol ücreti için likidite token'larını biriktirir ve `feeToSetter`, `feeTo` adresini farklı bir adresle değiştirmesine izin verilen adrestir.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Bu değişkenler çiftleri, yani iki token türü arasındaki takasları takip eder.

İlki olan `getPair`, takas ettiği iki ERC-20 token'ına dayalı olarak bir çift takas sözleşmesini tanımlayan bir eşlemedir (mapping). ERC-20 token'ları, onları uygulayan sözleşmelerin adresleriyle tanımlanır, bu nedenle anahtarlar ve değerlerin tümü adreslerdir. `tokenA`'den `tokenB`'ya dönüştürmenizi sağlayan çift takasının adresini almak için `getPair[<tokenA address>][<tokenB address>]` kullanırsınız (veya tam tersi).

İkinci değişken olan `allPairs`, bu fabrika tarafından oluşturulan çift takaslarının tüm adreslerini içeren bir dizidir. Ethereum'da bir eşlemenin içeriği üzerinde yineleme yapamazsınız veya tüm anahtarların bir listesini alamazsınız, bu nedenle bu değişken bu fabrikanın hangi takasları yönettiğini bilmenin tek yoludur.

Not: Bir eşlemenin tüm anahtarları üzerinde yineleme yapamamanızın nedeni, sözleşme veri depolamasının _pahalı_ olmasıdır, bu nedenle ne kadar az kullanırsak o kadar iyidir ve ne kadar az değiştirirsek
o kadar iyidir. [Yinelemeyi destekleyen eşlemeler](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol) oluşturabilirsiniz, ancak bunlar bir anahtar listesi için ekstra depolama alanı gerektirir. Çoğu uygulamada buna ihtiyacınız yoktur.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Bu olay, yeni bir çift takası oluşturulduğunda yayınlanır. Token'ların adreslerini, çift takasının adresini ve fabrika tarafından yönetilen toplam takas sayısını içerir.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Kurucunun yaptığı tek şey `feeToSetter` adresini belirlemektir. Fabrikalar ücretsiz başlar ve bunu yalnızca `feeSetter` değiştirebilir.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Bu fonksiyon takas çiftlerinin sayısını döndürür.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Bu, fabrikanın iki ERC-20 token'ı arasında bir çift takası oluşturmak için ana fonksiyonudur. Herkesin bu fonksiyonu çağırabileceğini unutmayın. Yeni bir çift takası oluşturmak için Uniswap'tan izin almanıza gerek yoktur.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Yeni takasın adresinin deterministik olmasını istiyoruz, böylece zincir dışı olarak önceden hesaplanabilir (bu, [katman 2 (l2) işlemleri](/developers/docs/scaling/) için yararlı olabilir).
Bunu yapmak için, onları hangi sırayla aldığımıza bakılmaksızın token adreslerinin tutarlı bir sırasına sahip olmamız gerekir, bu yüzden onları burada sıralıyoruz.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // tek bir kontrol yeterlidir
```

Büyük likidite havuzları küçük olanlardan daha iyidir, çünkü daha istikrarlı fiyatlara sahiptirler. Token çifti başına birden fazla likidite havuzuna sahip olmak istemiyoruz. Zaten bir takas varsa, aynı çift için başka bir tane oluşturmaya gerek yoktur.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Yeni bir sözleşme oluşturmak için onu oluşturan koda ihtiyacımız var (hem kurucu fonksiyon hem de asıl sözleşmenin EVM baytkodunu belleğe yazan kod). Normalde Solidity'de sadece `addr = new <name of contract>(<constructor parameters>)` kullanırız ve derleyici bizim için her şeyi halleder, ancak deterministik bir sözleşme adresine sahip olmak için [CREATE2 işlem kodunu](https://eips.ethereum.org/EIPS/eip-1014) kullanmamız gerekir.
Bu kod yazıldığında bu işlem kodu henüz Solidity tarafından desteklenmiyordu, bu nedenle kodu manuel olarak almak gerekiyordu. [Solidity artık CREATE2'yi desteklediği](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2) için bu artık bir sorun değil.

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Bir işlem kodu henüz Solidity tarafından desteklenmediğinde, onu [satır içi çevirici (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html) kullanarak çağırabiliriz.

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Yeni takasa hangi iki token'ı takas ettiğini söylemek için `initialize` fonksiyonunu çağırın.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // eşlemeyi ters yönde doldur
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Yeni çift bilgisini durum değişkenlerine kaydedin ve dünyayı yeni çift takası hakkında bilgilendirmek için bir olay yayınlayın.

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

Bu iki fonksiyon, `feeSetter` adresinin ücret alıcısını (varsa) kontrol etmesine ve `feeSetter` adresini yeni bir adresle değiştirmesine olanak tanır.

### UniswapV2ERC20.sol {#uniswapv2erc20}

[Bu sözleşme](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) ERC-20 likidite token'ını uygular. [OpenZeppelin ERC-20 sözleşmesine](/developers/tutorials/erc20-annotated-code) benzer, bu yüzden sadece farklı olan kısmı, yani `permit` işlevselliğini açıklayacağım.

Ethereum'daki işlemler, gerçek paraya eşdeğer olan Ether (ETH) maliyetindedir. ERC-20 token'larınız var ancak ETH'niz yoksa, işlem gönderemezsiniz, bu nedenle onlarla hiçbir şey yapamazsınız. Bu sorunu önlemenin bir çözümü [meta işlemlerdir](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Token'ların sahibi, başka birinin zincir dışı olarak token çekmesine izin veren bir işlemi imzalar ve bunu İnternet'i kullanarak alıcıya gönderir. ETH'si olan alıcı, daha sonra izni sahibi adına sunar.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Bu hash, [işlem türü için tanımlayıcıdır](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Burada desteklediğimiz tek şey bu parametrelere sahip `Permit` işlemidir.

```solidity
    mapping(address => uint) public nonces;
```

Bir alıcının dijital imzayı taklit etmesi mümkün değildir. Ancak, aynı işlemi iki kez göndermek önemsizdir (bu bir tür [tekrarlama saldırısıdır (replay attack)](https://wikipedia.org/wiki/Replay_attack)). Bunu önlemek için bir [nonce](https://wikipedia.org/wiki/Cryptographic_nonce) kullanırız. Yeni bir `Permit` işleminin nonce değeri kullanılan son değerden bir fazla değilse, geçersiz olduğunu varsayarız.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Bu, [zincir tanımlayıcısını](https://chainid.network/) almak için kullanılan koddur. [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) adı verilen bir EVM çevirici lehçesi kullanır. Yul'un mevcut sürümünde `chainid` değil, `chainid()` kullanmanız gerektiğine dikkat edin.

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

EIP-712 için [alan ayırıcısını (domain separator)](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) hesaplayın.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Bu, izinleri uygulayan fonksiyondur. İlgili alanları ve [imza](https://yos.io/2018/11/16/ethereum-signatures/) için üç skaler değeri (v, r ve s) parametre olarak alır.

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Son teslim tarihinden sonraki işlemleri kabul etmeyin.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` almayı beklediğimiz mesajdır. Nonce değerinin ne olması gerektiğini biliyoruz, bu yüzden onu bir parametre olarak almamıza gerek yok.

Ethereum imza algoritması imzalamak için 256 bit almayı bekler, bu nedenle `keccak256` hash fonksiyonunu kullanırız.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Özet (digest) ve imzadan, [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) kullanarak onu imzalayan adresi alabiliriz.

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Her şey yolundaysa, bunu [bir ERC-20 onayı (approve)](https://eips.ethereum.org/EIPS/eip-20#approve) olarak değerlendirin.

## Çevre Sözleşmeleri {#periphery-contracts}

Çevre sözleşmeleri, Uniswap için API'dir (uygulama programlama arayüzü). Diğer sözleşmelerden veya merkeziyetsiz uygulamalardan (dapp) gelen harici çağrılar için kullanılabilirler. Çekirdek sözleşmeleri doğrudan çağırabilirsiniz, ancak bu daha karmaşıktır ve bir hata yaparsanız değer kaybedebilirsiniz. Çekirdek sözleşmeler, yalnızca kandırılmadıklarından emin olmak için testler içerir, başkaları için mantık kontrolleri (sanity checks) içermez. Bunlar, gerektiğinde güncellenebilmeleri için çevre sözleşmelerinde yer alır.

### UniswapV2Router01.sol {#uniswapv2router01}

[Bu sözleşmenin](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) sorunları vardır ve [artık kullanılmamalıdır](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Neyse ki, çevre sözleşmeleri durumsuzdur (stateless) ve herhangi bir varlık tutmazlar, bu nedenle onu kullanımdan kaldırmak ve insanlara bunun yerine `UniswapV2Router02` kullanmalarını önermek kolaydır.

### UniswapV2Router02.sol {#uniswapv2router02}

Çoğu durumda Uniswap'ı [bu sözleşme](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) aracılığıyla kullanırsınız.
Nasıl kullanılacağını [buradan](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) görebilirsiniz.

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

Bunların çoğuyla daha önce karşılaştık veya oldukça açıklar. Tek istisna `IWETH.sol`'dir. Uniswap v2, herhangi bir ERC-20 token çifti için takaslara izin verir, ancak Ether (ETH) kendisi bir ERC-20 token'ı değildir. Standarttan daha eskidir ve benzersiz mekanizmalarla transfer edilir. ETH'nin ERC-20 token'larına uygulanan sözleşmelerde kullanılmasını sağlamak için insanlar [sarılmış ether (WETH)](https://weth.tkn.eth.limo/) sözleşmesini buldular. Bu sözleşmeye ETH gönderirsiniz ve size eşdeğer miktarda WETH basar. Veya WETH yakıp ETH'nizi geri alabilirsiniz.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Yönlendiricinin (router) hangi fabrikayı kullanacağını ve WETH gerektiren işlemler için hangi WETH sözleşmesini kullanacağını bilmesi gerekir. Bu değerler [değişmez](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)dir, yani yalnızca kurucu (constructor) içinde ayarlanabilirler. Bu, kullanıcılara hiç kimsenin onları daha az dürüst sözleşmeleri işaret edecek şekilde değiştiremeyeceği güvenini verir.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Bu değiştirici (modifier), zaman sınırlı işlemlerin ("yapabiliyorsan Y zamanından önce X'i yap") zaman sınırından sonra gerçekleşmemesini sağlar.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Kurucu sadece değişmez durum değişkenlerini ayarlar.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // ETH'yi yalnızca WETH Sözleşmesi'nden fallback yoluyla kabul et
    }
```

Bu fonksiyon, WETH sözleşmesinden token'ları tekrar ETH'ye çevirdiğimizde çağrılır. Bunu yapmaya yalnızca kullandığımız WETH sözleşmesi yetkilidir.

#### Likidite Ekleme {#add-liquidity}

Bu fonksiyonlar, çift takasına token ekler, bu da likidite havuzunu artırır.

```solidity

    // **** LİKİDİTE EKLE ****
    function _addLiquidity(
```

Bu fonksiyon, çift takasına yatırılması gereken A ve B token'larının miktarını hesaplamak için kullanılır.

```solidity
        address tokenA,
        address tokenB,
```

Bunlar ERC-20 token sözleşmelerinin adresleridir.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Bunlar, likidite sağlayıcının yatırmak istediği miktarlardır. Ayrıca yatırılacak maksimum A ve B miktarlarıdır.

```solidity
        uint amountAMin,
        uint amountBMin
```

Bunlar yatırılacak kabul edilebilir minimum miktarlardır. İşlem bu miktarlarla veya daha fazlasıyla gerçekleşemezse, işlemi geri al (revert). Bu özelliği istemiyorsanız, sadece sıfır belirtin.

Likidite sağlayıcılar genellikle bir minimum belirlerler, çünkü işlemi mevcut olana yakın bir döviz kuruyla sınırlamak isterler. Döviz kuru çok fazla dalgalanırsa, bu temel değerleri değiştiren haberler anlamına gelebilir ve ne yapacaklarına manuel olarak karar vermek isterler.

Örneğin, döviz kurunun bire bir olduğu ve likidite sağlayıcının şu değerleri belirttiği bir durumu hayal edin:

| Parametre      | Değer |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Döviz kuru 0.9 ile 1.25 arasında kaldığı sürece işlem gerçekleşir. Döviz kuru bu aralığın dışına çıkarsa işlem iptal edilir.

Bu önlemin nedeni, işlemlerin anında gerçekleşmemesidir; onları gönderirsiniz ve sonunda bir doğrulayıcı onları bir bloğa dahil eder (gas fiyatınız çok düşük olmadığı sürece, bu durumda üzerine yazmak için aynı nonce ve daha yüksek bir gas fiyatı ile başka bir işlem göndermeniz gerekecektir). Gönderim ile dahil edilme arasındaki sürede ne olacağını kontrol edemezsiniz.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Fonksiyon, rezervler arasındaki mevcut orana eşit bir orana sahip olmak için likidite sağlayıcının yatırması gereken miktarları döndürür.

```solidity
        // henüz mevcut değilse çifti oluştur
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Bu token çifti için henüz bir takas yoksa, onu oluşturun.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Çiftteki mevcut rezervleri alın.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Mevcut rezervler boşsa, bu yeni bir çift takasıdır. Yatırılacak miktarlar, likidite sağlayıcının sağlamak istediği miktarlarla tamamen aynı olmalıdır.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Miktarların ne olacağını görmemiz gerekirse, [bu fonksiyonu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35) kullanarak optimal miktarı alırız. Mevcut rezervlerle aynı oranı istiyoruz.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Eğer `amountBOptimal`, likidite sağlayıcının yatırmak istediği miktardan daha küçükse, bu, B token'ının şu anda likidite yatıranın düşündüğünden daha değerli olduğu anlamına gelir, bu nedenle daha küçük bir miktar gereklidir.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Optimal B miktarı istenen B miktarından fazlaysa, bu, B token'larının şu anda likidite yatıranın düşündüğünden daha az değerli olduğu anlamına gelir, bu nedenle daha yüksek bir miktar gereklidir. Ancak, istenen miktar bir maksimumdur, bu yüzden bunu yapamayız. Bunun yerine, istenen B token'ı miktarı için optimal A token'ı sayısını hesaplarız.

Hepsini bir araya getirdiğimizde bu grafiği elde ederiz. Bin A token'ı (mavi çizgi) ve bin B token'ı (kırmızı çizgi) yatırmaya çalıştığınızı varsayalım. X ekseni döviz kurudur, A/B. Eğer x=1 ise, değerleri eşittir ve her birinden bin tane yatırırsınız. Eğer x=2 ise, A, B'nin iki katı değerindedir (her A token'ı için iki B token'ı alırsınız), bu yüzden bin B token'ı yatırırsınız, ancak sadece 500 A token'ı yatırırsınız. Eğer x=0.5 ise, durum tersine döner, bin A token'ı ve beş yüz B token'ı.

![Graph](liquidityProviderDeposit.png)

Likiditeyi doğrudan çekirdek sözleşmeye yatırabilirsiniz ([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110) kullanarak), ancak çekirdek sözleşme yalnızca kendisinin kandırılmadığını kontrol eder, bu nedenle işleminizi gönderdiğiniz zaman ile yürütüldüğü zaman arasında döviz kuru değişirse değer kaybetme riskiyle karşı karşıya kalırsınız. Çevre sözleşmesini kullanırsanız, yatırmanız gereken miktarı hesaplar ve hemen yatırır, böylece döviz kuru değişmez ve hiçbir şey kaybetmezsiniz.

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

Bu fonksiyon, likidite yatırmak için bir işlem tarafından çağrılabilir. Çoğu parametre yukarıdaki `_addLiquidity` ile aynıdır, iki istisna dışında:

. `to`, likidite sağlayıcının havuzdaki payını göstermek için basılan yeni likidite token'larını alan adrestir
. `deadline`, işlem üzerindeki bir zaman sınırıdır

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Gerçekte yatırılacak miktarları hesaplıyoruz ve ardından likidite havuzunun adresini buluyoruz. Gaz tasarrufu yapmak için bunu fabrikaya sorarak değil, `pairFor` kütüphane fonksiyonunu kullanarak yapıyoruz (aşağıdaki kütüphanelere bakın)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Kullanıcıdan çift takasına doğru miktarda token transfer edin.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Buna karşılık, havuzun kısmi sahipliği için `to` adresine likidite token'ları verin. Çekirdek sözleşmenin `mint` fonksiyonu, (likiditenin en son değiştiği zamana kıyasla) ne kadar ekstra token'a sahip olduğunu görür ve buna göre likidite basar.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Bir likidite sağlayıcı, bir Token/ETH çifti takasına likidite sağlamak istediğinde, birkaç fark vardır. Sözleşme, likidite sağlayıcı için ETH'yi sarmayı (wrapping) halleder. Kullanıcının ne kadar ETH yatırmak istediğini belirtmesine gerek yoktur, çünkü kullanıcı bunları işlemle birlikte gönderir (miktar `msg.value` içinde mevcuttur).

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

ETH'yi yatırmak için sözleşme önce onu WETH'ye sarar ve ardından WETH'yi çifte transfer eder. Transferin bir `assert` içine sarıldığına dikkat edin. Bu, transfer başarısız olursa bu sözleşme çağrısının da başarısız olacağı ve bu nedenle sarma işleminin gerçekten gerçekleşmeyeceği anlamına gelir.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // varsa toz ETH'yi iade et
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Kullanıcı bize zaten ETH gönderdi, bu yüzden geriye fazladan bir şey kalırsa (çünkü diğer token kullanıcının düşündüğünden daha az değerlidir), bir geri ödeme yapmamız gerekir.

#### Likiditeyi Kaldırma {#remove-liquidity}

Bu fonksiyonlar likiditeyi kaldıracak ve likidite sağlayıcıya geri ödeme yapacaktır.

```solidity
    // **** LİKİDİTE ÇIKAR ****
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

Likiditeyi kaldırmanın en basit durumu. Likidite sağlayıcının kabul etmeyi kabul ettiği her bir token'ın minimum bir miktarı vardır ve bu, son tarihten önce gerçekleşmelidir.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // çifte Likidite gönder
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Çekirdek sözleşmenin `burn` fonksiyonu, kullanıcıya token'ları geri ödemeyi halleder.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Bir fonksiyon birden fazla değer döndürdüğünde, ancak biz sadece bazılarıyla ilgilendiğimizde, sadece o değerleri bu şekilde alırız. Bir değeri okuyup hiç kullanmamaktan gaz açısından biraz daha ucuzdur.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Miktarları, çekirdek sözleşmenin döndürdüğü şekilden (önce düşük adresli token) kullanıcının beklediği şekle (`tokenA` ve `tokenB`'ya karşılık gelen) çevirin.

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Önce transferi yapmak ve ardından meşru olduğunu doğrulamak sorun değildir, çünkü değilse tüm durum değişikliklerini geri alacağız (revert).

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

ETH için likiditeyi kaldırmak, WETH token'larını almamız ve ardından bunları likidite sağlayıcıya geri vermek üzere ETH'ye çevirmemiz dışında neredeyse aynıdır.

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

Bu fonksiyonlar, ether'i olmayan kullanıcıların [izin mekanizmasını (permit mechanism)](#uniswapv2erc20) kullanarak havuzdan çekim yapmasına olanak tanımak için meta-işlemleri iletir.

```solidity

    // **** LİKİDİTE ÇIKAR (transferde ücret kesen Token'ları destekler) ****
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

Bu fonksiyon, transfer veya depolama ücretleri olan token'lar için kullanılabilir. Bir token'ın bu tür ücretleri olduğunda, ne kadar token geri alacağımızı söylemesi için `removeLiquidity` fonksiyonuna güvenemeyiz, bu yüzden önce çekim yapmamız ve ardından bakiyeyi almamız gerekir.

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

Son fonksiyon, depolama ücretlerini meta-işlemlerle birleştirir.

#### Ticaret {#trade}

```solidity
    // **** TAKAS ****
    // başlangıç miktarının ilk çifte zaten gönderilmiş olmasını gerektirir
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Bu fonksiyon, yatırımcılara (traders) sunulan fonksiyonlar için gerekli olan dahili işlemeyi gerçekleştirir.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Bunu yazarken [388.160 ERC-20 token'ı](https://eth.blockscout.com/tokens) var. Her token çifti için bir çift takası olsaydı, 150 milyardan fazla çift takası olurdu. Tüm zincir, şu anda, [bu hesap sayısının sadece %0,1'ine sahip](https://eth.blockscout.com/stats/accountsGrowth). Bunun yerine, takas fonksiyonları bir yol (path) kavramını destekler. Bir yatırımcı A'yı B ile, B'yi C ile ve C'yi D ile takas edebilir, bu nedenle doğrudan bir A-D çifti takasına gerek yoktur.

Bu piyasalardaki fiyatlar senkronize olma eğilimindedir, çünkü senkronizasyon bozulduğunda arbitraj için bir fırsat yaratır. Örneğin, A, B ve C olmak üzere üç token hayal edin. Her çift için bir tane olmak üzere üç çift takası vardır.

1. Başlangıç durumu
2. Bir yatırımcı 24.695 A token'ı satar ve 25.305 B token'ı alır.
3. Yatırımcı 25.305 C token'ı için 24.695 B token'ı satar ve yaklaşık 0.61 B token'ını kâr olarak tutar.
4. Ardından yatırımcı 25.305 A token'ı için 24.695 C token'ı satar ve yaklaşık 0.61 C token'ını kâr olarak tutar. Yatırımcının ayrıca 0.61 ekstra A token'ı vardır (yatırımcının elinde kalan 25.305 eksi 24.695'lik orijinal yatırım).

| Adım | A-B Takası                  | B-C Takası                  | A-C Takası                  |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Şu anda işlediğimiz çifti alın, sıralayın (çiftle kullanmak için) ve beklenen çıktı miktarını alın.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Beklenen çıktı miktarlarını, çift takasının beklediği şekilde sıralanmış olarak alın.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Bu son takas mı? Öyleyse, ticaret için alınan token'ları hedefe gönderin. Değilse, bir sonraki çift takasına gönderin.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Token'ları takas etmek için çift takasını gerçekten çağırın. Takas hakkında bilgilendirilmek için bir geri aramaya (callback) ihtiyacımız yok, bu yüzden o alana herhangi bir bayt göndermiyoruz.

```solidity
    function swapExactTokensForTokens(
```

Bu fonksiyon, yatırımcılar tarafından bir token'ı diğeriyle takas etmek için doğrudan kullanılır.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Bu parametre, ERC-20 sözleşmelerinin adreslerini içerir. Yukarıda açıklandığı gibi, bu bir dizidir çünkü sahip olduğunuz varlıktan istediğiniz varlığa geçmek için birkaç çift takasından geçmeniz gerekebilir.

Solidity'de bir fonksiyon parametresi `memory` veya `calldata` içinde saklanabilir. Eğer fonksiyon sözleşmeye bir giriş noktasıysa, doğrudan bir kullanıcıdan (bir işlem kullanarak) veya farklı bir sözleşmeden çağrılıyorsa, parametrenin değeri doğrudan çağrı verisinden (call data) alınabilir. Eğer fonksiyon yukarıdaki `_swap` gibi dahili olarak çağrılırsa, parametrelerin `memory` içinde saklanması gerekir. Çağrılan sözleşmenin perspektifinden `calldata` salt okunurdur.

`uint` veya `address` gibi skaler türlerde derleyici depolama seçimini bizim için halleder, ancak daha uzun ve daha pahalı olan dizilerde kullanılacak depolama türünü biz belirtiriz.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Dönüş değerleri her zaman bellekte (memory) döndürülür.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Her takasta satın alınacak miktarı hesaplayın. Sonuç, yatırımcının kabul etmeye istekli olduğu minimum değerden azsa, işlemi geri alın.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Son olarak, ilk ERC-20 token'ını ilk çift takası için hesaba transfer edin ve `_swap` çağrısı yapın. Bunların hepsi aynı işlemde gerçekleşiyor, bu nedenle çift takası beklenmeyen token'ların bu transferin bir parçası olduğunu bilir.

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

Önceki fonksiyon olan `swapTokensForTokens`, bir yatırımcının vermeye istekli olduğu kesin girdi token'ı sayısını ve karşılığında almaya istekli olduğu minimum çıktı token'ı sayısını belirtmesine olanak tanır. Bu fonksiyon ters takası yapar, bir yatırımcının istediği çıktı token'ı sayısını ve bunlar için ödemeye istekli olduğu maksimum girdi token'ı sayısını belirtmesine izin verir.

Her iki durumda da, yatırımcının bu çevre sözleşmesine önce onları transfer etmesine izin vermek için bir harcama izni (allowance) vermesi gerekir.

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
        // varsa toz ETH'yi iade et
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Bu dört varyantın tümü ETH ve token'lar arasında ticareti içerir. Tek fark, ya yatırımcıdan ETH alıp WETH basmak için kullanmamız ya da yoldaki son takastan WETH alıp yakmamız ve ortaya çıkan ETH'yi yatırımcıya geri göndermemizdir.

```solidity
    // **** TAKAS (transferde ücret kesen Token'ları destekler) ****
    // başlangıç miktarının ilk çifte zaten gönderilmiş olmasını gerektirir
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Bu, transfer veya depolama ücretleri olan token'ları takas etmek ve ([bu sorunu](https://github.com/Uniswap/uniswap-interface/issues/835)) çözmek için kullanılan dahili fonksiyondur.

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // yığın çok derin hatalarını önlemek için kapsam
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Transfer ücretleri nedeniyle, her transferden ne kadar elde ettiğimizi söylemesi için `getAmountsOut` fonksiyonuna güvenemeyiz (orijinal `_swap` çağrısından önce yaptığımız gibi). Bunun yerine önce transfer etmeli ve ardından ne kadar token geri aldığımızı görmeliyiz.

Not: Teoride `_swap` yerine sadece bu fonksiyonu kullanabilirdik, ancak belirli durumlarda (örneğin, sonunda gerekli minimumu karşılayacak kadar olmadığı için transfer geri alınırsa) bu daha fazla gaza mal olurdu. Transfer ücreti olan token'lar oldukça nadirdir, bu nedenle onlara uyum sağlamamız gerekse de, tüm takasların en az birinden geçtiğini varsaymaya gerek yoktur.

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

Bunlar normal token'lar için kullanılan aynı varyantlardır, ancak bunun yerine `_swapSupportingFeeOnTransferTokens` çağırırlar.

```solidity
    // **** KÜTÜPHANE FONKSİYONLARI ****
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

Bu fonksiyonlar sadece [UniswapV2Library fonksiyonlarını](#uniswapv2library) çağıran vekillerdir (proxy).

### UniswapV2Migrator.sol {#uniswapv2migrator}

Bu sözleşme, takasları eski v1'den v2'ye taşımak için kullanıldı. Artık taşındıklarına göre, artık geçerli değildir.

## Kütüphaneler {#libraries}

[SafeMath kütüphanesi](https://docs.openzeppelin.com/contracts/2.x/api/math) iyi bir şekilde belgelenmiştir, bu yüzden burada belgelemeye gerek yoktur.

### Math {#math}

Bu kütüphane, Solidity kodunda normalde ihtiyaç duyulmayan bazı matematik fonksiyonlarını içerir, bu yüzden dilin bir parçası değillerdir.

```solidity
pragma solidity =0.5.16;

// çeşitli matematik işlemlerini gerçekleştirmek için bir Kütüphane

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babil yöntemi (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
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

Daha yakın bir tahmin elde edin; önceki tahmin ile karekökünü bulmaya çalıştığımız sayının önceki tahmine bölümünün ortalaması. Yeni tahmin mevcut olandan daha düşük olmayana kadar tekrarlayın. Daha fazla detay için [buraya bakın](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Sıfırın kareköküne asla ihtiyacımız olmamalıdır. Bir, iki ve üçün karekökleri kabaca birdir (tam sayılar kullanıyoruz, bu yüzden kesri görmezden geliyoruz).

```solidity
        }
    }
}
```

### Sabit Noktalı Kesirler (UQ112x112) {#fixedpoint}

Bu kütüphane, normalde Ethereum aritmetiğinin bir parçası olmayan kesirleri işler. Bunu, _x_ sayısını _x\*2^112_ olarak kodlayarak yapar. Bu, orijinal toplama ve çıkarma işlem kodlarını değiştirmeden kullanmamızı sağlar.

```solidity
pragma solidity =0.5.16;

// ikili sabit noktalı sayıları işlemek için bir Kütüphane (https://wikipedia.org/wiki/Q_(number_format))

// aralık: [0, 2**112 - 1]
// çözünürlük: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` birin kodlamasıdır.

```solidity
    // bir uint112'yi UQ112x112 olarak kodla
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // asla taşmaz
    }
```

y `uint112` olduğu için, olabileceği en yüksek değer 2^112-1'dir. Bu sayı hala bir `UQ112x112` olarak kodlanabilir.

```solidity
    // bir UQ112x112'yi uint112'ye bölerek bir UQ112x112 döndürür
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

İki `UQ112x112` değerini bölersek, sonuç artık 2^112 ile çarpılmaz. Bu yüzden bunun yerine payda için bir tam sayı alırız. Çarpma işlemi yapmak için benzer bir numara kullanmamız gerekirdi, ancak `UQ112x112` değerlerinin çarpımını yapmamıza gerek yoktur.

### UniswapV2Library {#uniswapv2library}

Bu kütüphane yalnızca çevre (periphery) sözleşmeleri tarafından kullanılır

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // sıralanmış Token Adreslerini döndürür, bu sırayla sıralanmış çiftlerden gelen dönüş değerlerini işlemek için kullanılır
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

İki Token'ı adrese göre sıralayın, böylece onlar için çift takasının adresini alabileceğiz. Bu gereklidir çünkü aksi takdirde biri A,B parametreleri ve diğeri B,A parametreleri için olmak üzere iki olasılığımız olurdu, bu da bir yerine iki takasa yol açardı.

```solidity
    // herhangi bir harici çağrı yapmadan bir çift için CREATE2 Adresini hesaplar
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // başlatma kodu hash'i
            ))));
    }
```

Bu fonksiyon, iki Token için çift takasının adresini hesaplar. Bu sözleşme [CREATE2 işlem kodu](https://eips.ethereum.org/EIPS/eip-1014) kullanılarak oluşturulmuştur, bu nedenle kullandığı parametreleri biliyorsak aynı algoritmayı kullanarak adresi hesaplayabiliriz. Bu, fabrikaya sormaktan çok daha ucuzdur ve

```solidity
    // bir çift için rezervleri getirir ve sıralar
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Bu fonksiyon, çift takasının sahip olduğu iki Token'ın rezervlerini döndürür. Token'ları her iki sırayla da alabileceğini ve dahili kullanım için sıraladığını unutmayın.

```solidity
    // belirli bir miktar varlık ve çift rezervleri verildiğinde, diğer varlığın eşdeğer miktarını döndürür
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Bu fonksiyon, herhangi bir ücret söz konusu değilse Token A karşılığında alacağınız Token B miktarını verir. Bu hesaplama, transferin döviz kurunu değiştirdiğini dikkate alır.

```solidity
    // bir varlığın girdi miktarı ve çift rezervleri verildiğinde, diğer varlığın maksimum çıktı miktarını döndürür
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Yukarıdaki `quote` fonksiyonu, çift takasını kullanmak için herhangi bir ücret yoksa harika çalışır. Ancak, %0,3'lük bir takas ücreti varsa, gerçekte alacağınız miktar daha düşüktür. Bu fonksiyon, takas ücretinden sonraki miktarı hesaplar.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity kesirleri yerel olarak işlemez, bu yüzden miktarı doğrudan 0,997 ile çarpamayız. Bunun yerine, payı 997 ve paydayı 1000 ile çarparak aynı etkiyi elde ederiz.

```solidity
    // bir varlığın çıktı miktarı ve çift rezervleri verildiğinde, diğer varlığın gerekli girdi miktarını döndürür
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Bu fonksiyon kabaca aynı şeyi yapar, ancak çıktı miktarını alır ve girdiyi sağlar.

```solidity

    // herhangi bir sayıda çift üzerinde zincirleme getAmountOut hesaplamaları gerçekleştirir
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // herhangi bir sayıda çift üzerinde zincirleme getAmountIn hesaplamaları gerçekleştirir
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

Bu iki fonksiyon, birkaç çift takasından geçmek gerektiğinde değerleri tanımlamayı işler.

### Transfer Yardımcısı {#transfer-helper}

[Bu kütüphane](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol), bir geri al (revert) ve bir `false` değer dönüşünü aynı şekilde ele almak için ERC-20 ve Ethereum transferlerinin etrafına başarı kontrolleri ekler.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// ERC-20 Token'ları ile etkileşim kurmak ve tutarlı bir şekilde true/false döndürmeyen ETH göndermek için yardımcı yöntemler
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Farklı bir sözleşmeyi iki yoldan biriyle çağırabiliriz:

- Bir fonksiyon çağrısı oluşturmak için bir arayüz tanımı kullanmak
- Çağrıyı oluşturmak için [uygulama ikili arayüzünü (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manuel olarak" kullanmak. Kodun yazarı bunu yapmaya karar vermiştir.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20 standardından önce oluşturulan Token'larla geriye dönük uyumluluk adına, bir ERC-20 çağrısı ya geri alınarak (bu durumda `success` `false` olur) ya da başarılı olup bir `false` değeri döndürerek (bu durumda çıktı verisi vardır ve bunu bir boolean olarak çözerseniz `false` elde edersiniz) başarısız olabilir.

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

Bu fonksiyon, bir hesabın farklı bir hesap tarafından sağlanan harcama iznini harcamasına olanak tanıyan [ERC-20'nin transfer işlevselliğini](https://eips.ethereum.org/EIPS/eip-20#transfer) uygular.

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

Bu fonksiyon, bir hesabın farklı bir hesap tarafından sağlanan harcama iznini harcamasına olanak tanıyan [ERC-20'nin transferFrom işlevselliğini](https://eips.ethereum.org/EIPS/eip-20#transferfrom) uygular.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Bu fonksiyon bir hesaba Ether transfer eder. Farklı bir sözleşmeye yapılan herhangi bir çağrı Ether göndermeyi deneyebilir. Aslında herhangi bir fonksiyonu çağırmamız gerekmediği için, çağrıyla birlikte herhangi bir veri göndermeyiz.

## Sonuç {#conclusion}

Bu, yaklaşık 50 sayfalık uzun bir makale. Buraya kadar geldiyseniz, tebrikler! Umarım artık (kısa örnek programların aksine) gerçek hayatta kullanılacak bir uygulama yazarken dikkat edilmesi gerekenleri anlamışsınızdır ve kendi kullanım durumlarınız için sözleşmeler yazma konusunda daha yetkinsinizdir.

Şimdi gidin, faydalı bir şeyler yazın ve bizi şaşırtın.

[Çalışmalarımın daha fazlası için buraya göz atın](https://cryptodocguy.pro/).