---
title: "ERC-20 Sözleşmesi İncelemesi"
description: "OpenZeppelin ERC-20 sözleşmesinde neler var ve neden oradalar?"
author: Ori Pomerantz
lang: tr
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20 incelemesi
published: 2021-03-09
---

## Giriş {#introduction}

Ethereum'un en yaygın kullanımlarından biri, bir grubun ticareti yapılabilir bir Token, bir anlamda kendi para birimini yaratmasıdır. Bu Token'lar genellikle bir standardı,
[ERC-20](/developers/docs/standards/tokens/erc-20/)'yi takip eder. Bu standart, tüm ERC-20
Token'ları ile çalışan likidite havuzları ve cüzdanlar gibi araçlar yazmayı mümkün kılar. Bu makalede,
[OpenZeppelin Solidity ERC20 uygulamasını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) ve
[arayüz tanımını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) analiz edeceğiz.

Bu, açıklamalı bir kaynak kodudur. Eğer ERC-20 uygulamak istiyorsanız,
[bu öğreticiyi okuyun](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Arayüz {#the-interface}

ERC-20 gibi bir standardın amacı, cüzdanlar ve merkeziyetsiz borsalar gibi uygulamalar arasında birlikte çalışabilir birçok Token uygulamasına izin vermektir. Bunu başarmak için bir
[arayüz](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/) oluşturuyoruz. Token sözleşmesini kullanması gereken herhangi bir kod,
arayüzdeki aynı tanımları kullanabilir ve MetaMask gibi bir Cüzdan, etherscan.io gibi bir merkeziyetsiz uygulama (dapp) veya likidite havuzu gibi farklı bir sözleşme olsun, onu kullanan tüm Token sözleşmeleriyle uyumlu olabilir.

![Illustration of the ERC-20 interface](erc20_interface.png)

Deneyimli bir programcıysanız, muhtemelen [Java](https://www.w3schools.com/java/java_interface.asp)'da
veya hatta [C başlık dosyalarında](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) benzer yapılar gördüğünüzü hatırlarsınız.

Bu, OpenZeppelin'den [ERC-20 Arayüzünün](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
bir tanımıdır. [İnsan tarafından okunabilir standardın](https://eips.ethereum.org/EIPS/eip-20) Solidity koduna çevrilmiş halidir. Elbette,
arayüzün kendisi bir şeyin _nasıl_ yapılacağını tanımlamaz. Bu, aşağıdaki sözleşme kaynak kodunda açıklanmıştır.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity dosyalarının bir lisans tanımlayıcısı içermesi beklenir. [Lisansların listesini buradan görebilirsiniz](https://spdx.org/licenses/). Farklı bir lisansa ihtiyacınız varsa,
bunu yorumlarda açıklamanız yeterlidir.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity dili hala hızla gelişmektedir ve yeni sürümler eski kodlarla uyumlu olmayabilir
([buraya bakın](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Bu nedenle, yalnızca dilin minimum
sürümünü değil, aynı zamanda kodu test ettiğiniz en son sürüm olan maksimum sürümü de belirtmek iyi bir fikirdir.

&nbsp;

```solidity
/**
 * @dev EIP'de tanımlandığı şekliyle ERC-20 standardının arayüzü.
 */
```

Yorumdaki `@dev`, kaynak koddan
belgelendirme üretmek için kullanılan [NatSpec formatının](https://docs.soliditylang.org/en/develop/natspec-format.html) bir parçasıdır.

&nbsp;

```solidity
interface IERC20 {
```

Geleneksel olarak, arayüz isimleri `I` ile başlar.

&nbsp;

```solidity
    /**
     * @dev Mevcut Token miktarını döndürür.
     */
    function totalSupply() external view returns (uint256);
```

Bu fonksiyon `external`'dir, yani [sadece sözleşmenin dışından çağrılabilir](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Sözleşmedeki toplam Token arzını döndürür. Bu değer, Ethereum'daki en yaygın tür olan işaretsiz 256 bit kullanılarak döndürülür (256 bit,
EVM'nin yerel kelime boyutudur). Bu fonksiyon aynı zamanda bir `view`'dir, yani durumu değiştirmez, bu nedenle Blokzincir'deki her
Düğüm'ün onu çalıştırması yerine tek bir Düğüm üzerinde yürütülebilir. Bu tür bir fonksiyon bir işlem oluşturmaz ve [Gaz](/developers/docs/gas/) maliyeti yoktur.

**Not:** Teoride, bir sözleşmenin yaratıcısı gerçek değerden daha küçük bir toplam arz döndürerek hile yapabilir ve her bir Token'ın gerçekte
olduğundan daha değerli görünmesini sağlayabilir gibi görünebilir. Ancak bu korku, Blokzincir'in gerçek doğasını göz ardı eder. Blokzincir'de gerçekleşen her şey
her Düğüm tarafından doğrulanabilir. Bunu başarmak için, her sözleşmenin makine dili kodu ve depolaması her Düğüm'de mevcuttur. Sözleşmeniz için Solidity
kodunu yayınlamanız gerekmese de, kaynak kodunu ve derlendiği Solidity sürümünü yayınlamadığınız sürece kimse sizi ciddiye almaz, böylece
sağladığınız makine dili koduna karşı doğrulanabilir.
Örneğin, [bu sözleşmeye](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract) bakın.

&nbsp;

```solidity
    /**
     * @dev `account` (Hesap) sahibinin Token miktarını döndürür.
     */
    function balanceOf(address account) external view returns (uint256);
```

Adından da anlaşılacağı gibi, `balanceOf` bir hesabın bakiyesini döndürür. Ethereum hesapları, Solidity'de 160 bit tutan `address` türü kullanılarak tanımlanır.
Ayrıca `external` ve `view`'dir.

&nbsp;

```solidity
    /**
     * @dev Çağırıcının Hesabından `recipient` adresine `amount` kadar Token transfer eder.
     *
     * İşlemin başarılı olup olmadığını belirten boolean bir değer döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` fonksiyonu, çağıran kişiden farklı bir adrese Token transfer eder. Bu bir durum değişikliği içerir, bu yüzden bir `view` değildir.
Bir kullanıcı bu fonksiyonu çağırdığında bir işlem oluşturur ve Gaz maliyeti olur. Ayrıca, Blokzincir'deki herkesi
olay hakkında bilgilendirmek için bir olay, `Transfer`, yayar.

Fonksiyonun iki farklı çağırıcı türü için iki tür çıktısı vardır:

- Fonksiyonu doğrudan bir kullanıcı arayüzünden çağıran kullanıcılar. Genellikle kullanıcı bir işlem gönderir
  ve belirsiz bir süre alabilecek bir yanıt beklemez. Kullanıcı, işlem makbuzunu (işlem hash'i ile tanımlanır) arayarak veya
  `Transfer` olayını arayarak ne olduğunu görebilir.
- Fonksiyonu genel bir işlemin parçası olarak çağıran diğer sözleşmeler. Bu sözleşmeler sonucu hemen alırlar,
  çünkü aynı işlemde çalışırlar, böylece fonksiyonun dönüş değerini kullanabilirler.

Sözleşmenin durumunu değiştiren diğer fonksiyonlar tarafından da aynı tür çıktı oluşturulur.

&nbsp;

Harcama izinleri, bir hesabın farklı bir sahibe ait bazı Token'ları harcamasına izin verir.
Bu, örneğin satıcı olarak hareket eden sözleşmeler için yararlıdır. Sözleşmeler
olayları izleyemez, bu nedenle bir alıcı doğrudan satıcı sözleşmesine Token transfer ederse
o sözleşme kendisine ödeme yapıldığını bilemez. Bunun yerine, alıcı
satıcı sözleşmesinin belirli bir miktar harcamasına izin verir ve satıcı bu miktarı transfer eder.
Bu, satıcı sözleşmesinin çağırdığı bir fonksiyon aracılığıyla yapılır, böylece satıcı sözleşmesi
başarılı olup olmadığını bilebilir.

```solidity
    /**
     * @dev `spender`ın {transferFrom} aracılığıyla `owner` adına harcamasına izin verilecek kalan Token miktarını döndürür. Bu varsayılan olarak sıfırdır.
     *
     * Bu değer {approve} veya {transferFrom} çağrıldığında değişir.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` fonksiyonu, herkesin bir adresin
(`owner`) başka bir adresin (`spender`) harcamasına izin verdiği harcama izninin ne olduğunu sorgulamasına olanak tanır.

&nbsp;

```solidity
    /**
     * @dev Çağırıcının Tokenları üzerinde `spender` için harcama izni olarak `amount` değerini ayarlar.
     *
     * İşlemin başarılı olup olmadığını belirten boolean bir değer döndürür.
     *
     * ÖNEMLİ: Bu yöntemle bir harcama iznini değiştirmenin, talihsiz bir işlem sıralamasıyla birisinin hem eski hem de yeni harcama iznini kullanabilmesi riskini getirdiğine dikkat edin. Bu yarış durumunu (race condition) hafifletmek için olası bir çözüm, önce harcayıcının harcama iznini 0'a düşürmek ve ardından istenen değeri ayarlamaktır:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Bir {Approval} olayı yayar.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` fonksiyonu bir harcama izni oluşturur. Nasıl kötüye kullanılabileceği
hakkındaki mesajı okuduğunuzdan emin olun. Ethereum'da kendi işlemlerinizin sırasını kontrol edersiniz,
ancak karşı tarafın işleminin gerçekleştiğini görene kadar kendi işleminizi göndermediğiniz sürece,
diğer insanların işlemlerinin hangi sırayla yürütüleceğini kontrol edemezsiniz.

&nbsp;

```solidity
    /**
     * @dev Harcama izni mekanizmasını kullanarak `sender` adresinden `recipient` adresine `amount` kadar Token transfer eder. `amount` daha sonra çağırıcının harcama izninden düşülür.
     *
     * İşlemin başarılı olup olmadığını belirten boolean bir değer döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Son olarak, `transferFrom` harcayan tarafından harcama iznini fiilen harcamak için kullanılır.

&nbsp;

```solidity

    /**
     * @dev `value` kadar Token bir Hesaptan (`from`) diğerine (`to`) transfer edildiğinde yayılır.
     *
     * `value` değerinin sıfır olabileceğini unutmayın.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Bir `owner` için bir `spender`ın harcama izni {approve} çağrısı ile ayarlandığında yayılır. `value` yeni harcama iznidir.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Bu olaylar, ERC-20 sözleşmesinin durumu değiştiğinde yayılır.

## Asıl Sözleşme {#the-actual-contract}

Bu, ERC-20 standardını uygulayan asıl sözleşmedir,
[buradan alınmıştır](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Olduğu gibi kullanılması amaçlanmamıştır, ancak onu kullanılabilir bir şeye
genişletmek için ondan [miras alabilirsiniz](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### İçe Aktarma İfadeleri {#import-statements}

Yukarıdaki arayüz tanımlarına ek olarak, sözleşme tanımı iki dosya daha içe aktarır:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`, Ether'i olmayan kullanıcıların Blokzincir'i kullanmasına olanak tanıyan bir sistem olan [OpenGSN](https://opengsn.org/)'yi kullanmak için gereken tanımlardır. Bunun eski bir sürüm olduğunu unutmayın, OpenGSN ile entegre olmak istiyorsanız
  [bu öğreticiyi kullanın](https://docs.opengsn.org/javascript-client/tutorial.html).
- Solidity sürümleri **&lt;0.8.0** için aritmetik taşmaları/alt taşmaları önleyen
  [SafeMath Kütüphanesi](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/). Solidity ≥0.8.0'da, aritmetik işlemler taşma/alt taşma durumunda otomatik olarak
  geri alınır ve SafeMath'i gereksiz kılar. Bu sözleşme, eski derleyici sürümleriyle geriye dönük uyumluluk için
  SafeMath kullanır.

&nbsp;

Bu yorum sözleşmenin amacını açıklar.

```solidity
/**
 * @dev {IERC20} arayüzünün uygulaması.
 *
 * Bu uygulama, Tokenların oluşturulma şeklinden bağımsızdır. Bu, türetilmiş bir Sözleşmede {_mint} kullanılarak bir arz mekanizmasının eklenmesi gerektiği anlamına gelir.
 * Genel bir mekanizma için {ERC20PresetMinterPauser} Sözleşmesine bakın.
 *
 * İPUCU: Ayrıntılı bir açıklama için kılavuzumuza bakın
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Arz mekanizmaları nasıl uygulanır].
 *
 * Genel OpenZeppelin yönergelerini izledik: fonksiyonlar başarısızlık durumunda `false` döndürmek yerine işlemi geri alır (revert). Bu davranış yine de gelenekseldir
 * ve ERC-20 uygulamalarının beklentileriyle çelişmez.
 *
 * Ek olarak, {transferFrom} çağrılarında bir {Approval} olayı yayılır.
 * Bu, uygulamaların yalnızca söz konusu olayları dinleyerek tüm Hesaplar için harcama iznini yeniden oluşturmasına olanak tanır. EIP'nin diğer uygulamaları, spesifikasyon tarafından gerekli kılınmadığı için
 * bu olayları yaymayabilir.
 *
 * Son olarak, harcama izinlerini ayarlamayla ilgili iyi bilinen sorunları hafifletmek için standart olmayan {decreaseAllowance} ve {increaseAllowance}
 * fonksiyonları eklenmiştir. Bkz. {IERC20-approve}.
 */

```

### Sözleşme Tanımı {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Bu satır, bu durumda yukarıdaki `IERC20`'den ve OpenGSN için `Context`'den mirası belirtir.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Bu satır, `SafeMath` kütüphanesini `uint256` türüne ekler. Bu kütüphaneyi
[burada](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) bulabilirsiniz.

### Değişken Tanımları {#variable-definitions}

Bu tanımlar sözleşmenin durum değişkenlerini belirtir. Bu değişkenler `private` olarak bildirilir, ancak
bu yalnızca Blokzincir'deki diğer sözleşmelerin onları okuyamayacağı anlamına gelir. _Blokzincir'de
sır yoktur_, her Düğüm'deki yazılım, her Blok'taki her sözleşmenin durumuna sahiptir.
Geleneksel olarak, durum değişkenleri `_<something>` olarak adlandırılır.

İlk iki değişken [eşlemelerdir (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
yani anahtarların sayısal değerler olması dışında kabaca [ilişkisel diziler](https://wikipedia.org/wiki/Associative_array) ile aynı şekilde davranırlar.
Depolama yalnızca varsayılandan (sıfır) farklı değerlere sahip girişler için tahsis edilir.

```solidity
    mapping (address => uint256) private _balances;
```

İlk eşleme olan `_balances`, adresler ve bu Token'ın ilgili bakiyeleridir. Bakiyeye erişmek
için şu sözdizimini kullanın: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Bu değişken, `_allowances`, daha önce açıklanan harcama izinlerini depolar. İlk endeks Token'ların
sahibidir ve ikincisi harcama iznine sahip sözleşmedir. A adresinin B adresinin hesabından
harcayabileceği miktara erişmek için `_allowances[B][A]` kullanın.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Adından da anlaşılacağı gibi, bu değişken Token'ların toplam arzını takip eder.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Bu üç değişken okunabilirliği artırmak için kullanılır. İlk ikisi kendi kendini açıklar, ancak `_decimals`
öyle değildir.

Bir yandan, Ethereum'un kayan noktalı veya kesirli değişkenleri yoktur. Öte yandan,
insanlar Token'ları bölebilmeyi severler. İnsanların para birimi olarak altında karar kılmalarının bir nedeni,
birisi bir ördek değerinde inek almak istediğinde para üstü vermenin zor olmasıydı.

Çözüm, tam sayıları takip etmek, ancak gerçek Token yerine neredeyse değersiz olan kesirli bir Token saymaktır.
Ether durumunda, kesirli Token'a Wei denir ve 10^18 Wei bir ETH'ye eşittir.
Bu yazının yazıldığı sırada, 10.000.000.000.000 Wei yaklaşık bir ABD veya Euro sentidir.

Uygulamaların Token bakiyesini nasıl görüntüleyeceğini bilmesi gerekir. Bir kullanıcının 3.141.000.000.000.000.000 Wei'si varsa, bu
3,14 ETH midir? 31,41 ETH mi? 3.141 ETH mi? Ether durumunda ETH başına 10^18 Wei olarak tanımlanır, ancak
Token'ınız için farklı bir değer seçebilirsiniz. Token'ı bölmek mantıklı değilse, sıfır
`_decimals` değeri kullanabilirsiniz. ETH ile aynı standardı kullanmak istiyorsanız, **18** değerini kullanın.

### Kurucu {#the-constructor}

```solidity
    /**
     * @dev {name} ve {symbol} değerlerini ayarlar, {decimals} değerini
     * varsayılan olarak 18 ile başlatır.
     *
     * {decimals} için farklı bir değer seçmek üzere {_setupDecimals} kullanın.
     *
     * Bu üç değerin tümü değiştirilemez (immutable): yalnızca kurucu (constructor) sırasında bir kez ayarlanabilirler.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Solidity ≥0.7.0'da 'public' örtüktür ve atlanabilir.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Kurucu, sözleşme ilk oluşturulduğunda çağrılır. Geleneksel olarak, fonksiyon parametreleri `<something>_` olarak adlandırılır.

### Kullanıcı Arayüzü Fonksiyonları {#user-interface-functions}

```solidity
    /**
     * @dev Tokenın adını döndürür.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Tokenın sembolünü, genellikle adının daha kısa bir versiyonunu döndürür.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Kullanıcı gösterimini elde etmek için kullanılan ondalık basamak sayısını döndürür.
     * Örneğin, `decimals` `2`ye eşitse, `505` Tokenlık bir bakiye
     * kullanıcıya `5,05` (`505 / 10 ** 2`) olarak gösterilmelidir.
     *
     * Tokenlar genellikle Ether ve Wei arasındaki ilişkiyi taklit ederek 18 değerini tercih eder. {_setupDecimals} çağrılmadığı sürece {ERC-20} tarafından kullanılan değer budur.
     *
     * NOT: Bu bilgi yalnızca _görüntüleme_ amacıyla kullanılır: {IERC20-balanceOf} ve {IERC20-transfer} dahil olmak üzere
     * Sözleşmenin aritmetiğini hiçbir şekilde etkilemez.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Bu fonksiyonlar, `name`, `symbol` ve `decimals`, kullanıcı arayüzlerinin sözleşmeniz hakkında bilgi sahibi olmasına yardımcı olur, böylece onu düzgün bir şekilde görüntüleyebilirler.

Dönüş türü `string memory`'dir, yani bellekte depolanan bir dize döndürür. Dizeler gibi
değişkenler üç konumda saklanabilir:

|          | Ömür | Sözleşme Erişimi | Gaz Maliyeti |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Bellek | Fonksiyon çağrısı | Okuma/Yazma | Onlarca veya yüzlerce (daha yüksek konumlar için daha yüksek) |
| Çağrı verisi | Fonksiyon çağrısı | Sadece Okunabilir | Dönüş türü olarak kullanılamaz, sadece fonksiyon parametre türü |
| Depolama | Değiştirilene kadar | Okuma/Yazma | Yüksek (okuma için 800, yazma için 20k) |

Bu durumda, `memory` en iyi seçimdir.

### Token Bilgilerini Oku {#read-token-information}

Bunlar, Token hakkında, toplam arz veya bir hesabın bakiyesi hakkında bilgi sağlayan
fonksiyonlardır.

```solidity
    /**
     * @dev Bkz. {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` fonksiyonu toplam Token arzını döndürür.

&nbsp;

```solidity
    /**
     * @dev Bkz. {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Bir hesabın bakiyesini okuyun. Herkesin başkasının hesap bakiyesini almasına izin verildiğini
unutmayın. Bu bilgiyi saklamaya çalışmanın bir anlamı yoktur, çünkü zaten her
Düğüm'de mevcuttur. _Blokzincir'de sır yoktur._

### Token Transferi {#transfer-tokens}

```solidity
    /**
     * @dev Bkz. {IERC20-transfer}.
     *
     * Gereksinimler:
     *
     * - `recipient` sıfır adresi olamaz.
     * - çağırıcının bakiyesi en az `amount` kadar olmalıdır.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` fonksiyonu, gönderenin hesabından farklı bir hesaba Token transfer etmek için çağrılır. Bir
boolean değer döndürmesine rağmen, bu değerin her zaman **doğru (true)** olduğunu unutmayın. Transfer
başarısız olursa sözleşme çağrıyı geri alır.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` fonksiyonu asıl işi yapar. Yalnızca diğer sözleşme fonksiyonları tarafından çağrılabilen özel (private) bir fonksiyondur.
Geleneksel olarak özel fonksiyonlar, durum değişkenleriyle aynı şekilde `_<something>` olarak
adlandırılır.

Normalde Solidity'de mesaj gönderen için `msg.sender` kullanırız. Ancak bu,
[OpenGSN](https://opengsn.org/)'yi bozar. Token'ımızla Ether'siz işlemlere izin vermek istiyorsak,
`_msgSender()` kullanmamız gerekir. Normal işlemler için `msg.sender` döndürür, ancak Ether'siz işlemler için
mesajı ileten sözleşmeyi değil, orijinal imzalayanı döndürür.

### Harcama İzni Fonksiyonları {#allowance-functions}

Bunlar harcama izni işlevselliğini uygulayan fonksiyonlardır: `allowance`, `approve`, `transferFrom`
ve `_approve`. Ek olarak, OpenZeppelin uygulaması güvenliği artıran bazı özellikler içermek için temel standardın ötesine geçer: `increaseAllowance` ve `decreaseAllowance`.

#### allowance fonksiyonu {#allowance}

```solidity
    /**
     * @dev Bkz. {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` fonksiyonu herkesin herhangi bir harcama iznini kontrol etmesine olanak tanır.

#### approve fonksiyonu {#approve}

```solidity
    /**
     * @dev Bkz. {IERC20-approve}.
     *
     * Gereksinimler:
     *
     * - `spender` sıfır adresi olamaz.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Bu fonksiyon bir harcama izni oluşturmak için çağrılır. Yukarıdaki `transfer` fonksiyonuna benzer:

- Fonksiyon sadece asıl işi yapan dahili bir fonksiyonu (bu durumda `_approve`) çağırır.
- Fonksiyon ya `true` döndürür (başarılıysa) ya da geri alır (değilse).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Durum değişikliklerinin gerçekleştiği yerlerin sayısını en aza indirmek için dahili fonksiyonlar kullanıyoruz. Durumu değiştiren
_herhangi bir_ fonksiyon, güvenlik açısından denetlenmesi gereken potansiyel bir güvenlik riskidir. Bu şekilde hata yapma şansımız daha az olur.

#### transferFrom fonksiyonu {#transferfrom}

Bu, harcayanın bir harcama iznini harcamak için çağırdığı fonksiyondur. Bu iki işlem gerektirir: harcanan miktarı
transfer etmek ve harcama iznini o miktar kadar azaltmak.

```solidity
    /**
     * @dev Bkz. {IERC20-transferFrom}.
     *
     * Güncellenen harcama iznini belirten bir {Approval} olayı yayar. Bu, EIP tarafından
     * gerekli değildir. {ERC-20} başlangıcındaki nota bakın.
     *
     * Gereksinimler:
     *
     * - `sender` ve `recipient` sıfır adresi olamaz.
     * - `sender` bakiyesi en az `amount` kadar olmalıdır.
     * - çağırıcının ``sender`` Tokenları için en az `amount` kadar harcama izni olmalıdır.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` fonksiyon çağrısı iki şey yapar. İlk olarak, yeni harcama izni olan `a-b`'yi hesaplar.
İkinci olarak, bu sonucun negatif olmadığını kontrol eder. Negatifse, çağrı sağlanan mesajla geri alınır. Bir çağrı geri alındığında, o çağrı sırasında daha önce yapılan herhangi bir işlemin yok sayıldığını unutmayın, bu nedenle
`_transfer` işlemini geri almamıza gerek yoktur.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin güvenlik eklemeleri {#openzeppelin-safety-additions}

Sıfır olmayan bir harcama iznini sıfır olmayan başka bir değere ayarlamak tehlikelidir,
çünkü yalnızca kendi işlemlerinizin sırasını kontrol edersiniz, başkasınınkini değil. İki kullanıcınız
olduğunu hayal edin, saf olan Alice ve dürüst olmayan Bill. Alice, Bill'den beş Token'a mal olduğunu
düşündüğü bir hizmet istiyor - bu yüzden Bill'e beş Token'lık bir harcama izni veriyor.

Sonra bir şeyler değişir ve Bill'in fiyatı on Token'a çıkar. Hala hizmeti isteyen Alice,
Bill'in harcama iznini ona ayarlayan bir işlem gönderir. Bill bu yeni işlemi işlem havuzunda
gördüğü an, Alice'in beş Token'ını harcayan ve çok daha yüksek bir gas fiyatına sahip bir işlem
gönderir, böylece daha hızlı çıkarılır. Bu şekilde Bill önce beş Token harcayabilir ve ardından,
Alice'in yeni harcama izni çıkarıldığında, Alice'in yetkilendirmek istediğinden daha fazla olan toplam
on beş Token fiyatı için on tane daha harcayabilir. Bu tekniğe
[önden koşma](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running) denir.

| Alice İşlemi | Alice Nonce | Bill İşlemi | Bill Nonce | Bill'in Harcama İzni | Bill'in Alice'ten Toplam Geliri |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Bu sorunu önlemek için, bu iki fonksiyon (`increaseAllowance` ve `decreaseAllowance`) harcama iznini
belirli bir miktarda değiştirmenize olanak tanır. Yani Bill zaten beş Token harcamışsa, sadece
beş tane daha harcayabilecektir. Zamanlamaya bağlı olarak, bunun çalışabileceği iki yol vardır ve her
ikisi de Bill'in sadece on Token almasıyla sonuçlanır:

A:

| Alice İşlemi | Alice Nonce | Bill İşlemi | Bill Nonce | Bill'in Harcama İzni | Bill'in Alice'ten Toplam Geliri |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Alice İşlemi | Alice Nonce | Bill İşlemi | Bill Nonce | Bill'in Harcama İzni | Bill'in Alice'ten Toplam Geliri |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Çağırıcı tarafından `spender`a verilen harcama iznini atomik olarak artırır.
     *
     * Bu, {IERC20-approve} içinde açıklanan sorunları hafifletmek için kullanılabilecek {approve} alternatifidir.
     *
     * Güncellenen harcama iznini belirten bir {Approval} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `spender` sıfır adresi olamaz.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` fonksiyonu güvenli bir eklemedir. `a`+`b`>=`2^256` gibi olası olmayan bir durumda,
normal toplamanın yaptığı gibi başa sarmaz (taşma yapmaz).

```solidity

    /**
     * @dev Çağırıcı tarafından `spender`a verilen harcama iznini atomik olarak azaltır.
     *
     * Bu, {IERC20-approve} içinde açıklanan sorunları hafifletmek için kullanılabilecek {approve} alternatifidir.
     *
     * Güncellenen harcama iznini belirten bir {Approval} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `spender` sıfır adresi olamaz.
     * - `spender`, çağırıcı için en az `subtractedValue` kadar harcama iznine sahip olmalıdır.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Token Bilgilerini Değiştiren Fonksiyonlar {#functions-that-modify-token-information}

Bunlar asıl işi yapan dört fonksiyondur: `_transfer`, `_mint`, `_burn` ve `_approve`.

#### _transfer fonksiyonu {#transfer}

```solidity
    /**
     * @dev `sender` adresinden `recipient` adresine `amount` kadar Token transfer eder.
     *
     * Bu dahili (internal) fonksiyon {transfer} ile eşdeğerdir ve örneğin
     * otomatik Token ücretleri, kesinti (slashing) mekanizmaları vb. uygulamak için kullanılabilir.
     *
     * Bir {Transfer} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `sender` sıfır adresi olamaz.
     * - `recipient` sıfır adresi olamaz.
     * - `sender` bakiyesi en az `amount` kadar olmalıdır.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Bu fonksiyon, `_transfer`, bir hesaptan diğerine Token transfer eder. Hem
`transfer` (gönderenin kendi hesabından transferler için) hem de `transferFrom` (başkasının hesabından
transfer yapmak için harcama izinlerini kullanmak için) tarafından çağrılır.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Ethereum'da sıfır adresine aslında kimse sahip değildir (yani, eşleşen açık anahtarı sıfır adresine
dönüştürülen bir özel anahtarı kimse bilmez). İnsanlar bu adresi kullandığında, bu genellikle bir
yazılım hatasıdır - bu nedenle sıfır adresi gönderen veya alıcı olarak kullanılırsa başarısız oluruz.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Bu sözleşmeyi kullanmanın iki yolu vardır:

1. Kendi kodunuz için bir şablon olarak kullanın
1. [Ondan miras alın](https://www.bitdegree.org/learn/solidity-inheritance) ve yalnızca değiştirmeniz gereken fonksiyonları geçersiz kılın (override)

İkinci yöntem çok daha iyidir çünkü OpenZeppelin ERC-20 kodu zaten denetlenmiş ve güvenli olduğu gösterilmiştir. Miras kullandığınızda
hangi fonksiyonları değiştirdiğiniz açıktır ve sözleşmenize güvenmek için insanların yalnızca bu belirli fonksiyonları denetlemesi gerekir.

Token'lar her el değiştirdiğinde bir fonksiyon gerçekleştirmek genellikle yararlıdır. Ancak, `_transfer` çok önemli bir fonksiyondur ve onu
güvensiz bir şekilde yazmak mümkündür (aşağıya bakın), bu nedenle onu geçersiz kılmamak en iyisidir. Çözüm, bir
[kanca (hook) fonksiyonu](https://wikipedia.org/wiki/Hooking) olan `_beforeTokenTransfer`'dur. Bu fonksiyonu geçersiz kılabilirsiniz ve her transferde çağrılacaktır.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Bunlar transferi fiilen yapan satırlardır. Aralarında **hiçbir şey** olmadığına ve transfer edilen
miktarı alıcıya eklemeden önce gönderenden çıkardığımıza dikkat edin. Bu önemlidir, çünkü ortada
farklı bir sözleşmeye çağrı olsaydı, bu sözleşmeyi aldatmak için kullanılabilirdi. Bu şekilde transfer
atomiktir, ortasında hiçbir şey olamaz.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Son olarak, bir `Transfer` olayı yayınlayın. Olaylara Akıllı sözleşmeler tarafından erişilemez, ancak Blokzincir dışında çalışan kod
olayları dinleyebilir ve bunlara tepki verebilir. Örneğin, bir Cüzdan sahibinin ne zaman daha fazla Token aldığını takip edebilir.

#### _mint ve _burn fonksiyonları {#mint-and-burn}

Bu iki fonksiyon (`_mint` ve `_burn`) toplam Token arzını değiştirir.
Bunlar dahilidir ve bu sözleşmede onları çağıran hiçbir fonksiyon yoktur,
bu nedenle yalnızca sözleşmeden miras alırsanız ve hangi koşullar altında
yeni Token'lar basacağınıza veya mevcut olanları yakacağınıza karar vermek için kendi
mantığınızı eklerseniz yararlıdırlar.

**NOT:** Her ERC-20 Token'ının, Token yönetimini dikte eden kendi iş mantığı vardır.
Örneğin, sabit arzlı bir sözleşme yalnızca kurucuda `_mint`
çağırabilir ve asla `_burn` çağırmayabilir. Token satan bir sözleşme,
ödeme yapıldığında `_mint` çağıracak ve muhtemelen kontrolden çıkmış enflasyonu
önlemek için bir noktada `_burn` çağıracaktır.

```solidity
    /** @dev `amount` kadar Token oluşturur ve bunları `account` Hesabına atayarak
     * toplam arzı artırır.
     *
     * `from` değeri sıfır adresi olarak ayarlanmış bir {Transfer} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `to` sıfır adresi olamaz.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Toplam Token sayısı değiştiğinde `_totalSupply`'yi güncellediğinizden emin olun.

&nbsp;

```solidity
    /**
     * @dev `account` Hesabından `amount` kadar Tokenı yok eder (burn) ve
     * toplam arzı azaltır.
     *
     * `to` değeri sıfır adresi olarak ayarlanmış bir {Transfer} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `account` sıfır adresi olamaz.
     * - `account` en az `amount` kadar Tokena sahip olmalıdır.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` fonksiyonu, diğer yöne gitmesi dışında `_mint` ile neredeyse aynıdır.

#### _approve fonksiyonu {#approve-2}

Bu, harcama izinlerini fiilen belirten fonksiyondur. Bir sahibin, sahibin mevcut bakiyesinden
daha yüksek bir harcama izni belirlemesine izin verdiğini unutmayın. Bu sorun değildir çünkü bakiye,
harcama izni oluşturulduğundaki bakiyeden farklı olabileceği transfer anında kontrol edilir.

```solidity
    /**
     * @dev `owner` Tokenları üzerinde `spender` için harcama izni olarak `amount` değerini ayarlar.
     *
     * Bu dahili fonksiyon `approve` ile eşdeğerdir ve örneğin
     * belirli alt sistemler için otomatik harcama izinleri ayarlamak vb. için kullanılabilir.
     *
     * Bir {Approval} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `owner` sıfır adresi olamaz.
     * - `spender` sıfır adresi olamaz.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Bir `Approval` olayı yayınlayın. Uygulamanın nasıl yazıldığına bağlı olarak, harcayan sözleşmeye onay hakkında
ya sahibi tarafından ya da bu olayları dinleyen bir sunucu tarafından bilgi verilebilir.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Decimals Değişkenini Değiştir {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals} değerini varsayılan 18 değerinden farklı bir değere ayarlar.
     *
     * UYARI: Bu fonksiyon yalnızca kurucu (constructor) içinden çağrılmalıdır. Token Sözleşmeleriyle
     * etkileşime giren çoğu uygulama {decimals} değerinin değişmesini beklemez ve değişirse yanlış çalışabilir.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Bu fonksiyon, kullanıcı arayüzlerine miktarı nasıl yorumlayacaklarını söylemek için kullanılan `_decimals` değişkenini değiştirir.
Onu kurucudan çağırmalısınız. Daha sonraki herhangi bir noktada çağırmak dürüstlük olmaz ve uygulamalar
bunu idare edecek şekilde tasarlanmamıştır.

### Kancalar (Hooks) {#hooks}

```solidity

    /**
     * @dev Herhangi bir Token transferinden önce çağrılan kanca (hook). Buna
     * basım ve yakım dahildir.
     *
     * Çağrı koşulları:
     *
     * - `from` ve `to` her ikisi de sıfır olmadığında, ``from`` Tokenlarının `amount` kadarı
     * `to` adresine transfer edilecektir.
     * - `from` sıfır olduğunda, `to` için `amount` kadar Token basılacaktır.
     * - `to` sıfır olduğunda, ``from`` Tokenlarının `amount` kadarı yakılacaktır.
     * - `from` ve `to` asla aynı anda sıfır olamaz.
     *
     * Kancalar hakkında daha fazla bilgi edinmek için xref:ROOT:extending-contracts.adoc#using-hooks[Kancaları Kullanma] bölümüne gidin.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Bu, transferler sırasında çağrılacak kanca fonksiyonudur. Burada boştur, ancak bir şey yapmasına
ihtiyacınız varsa onu geçersiz kılarsınız.

## Sonuç {#conclusion}

Gözden geçirmek için, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır (bana göre, sizinki muhtemelen değişecektir):

- _Blokzincir'de sır yoktur_. Bir Akıllı sözleşmenin erişebileceği herhangi bir bilgi
  tüm dünyaya açıktır.
- Kendi işlemlerinizin sırasını kontrol edebilirsiniz, ancak diğer insanların işlemlerinin ne zaman
  gerçekleşeceğini kontrol edemezsiniz. Bir harcama iznini değiştirmenin tehlikeli olabilmesinin nedeni budur, çünkü
  harcayanın her iki harcama izninin toplamını harcamasına izin verir.
- `uint256` türündeki değerler başa sarar (taşar). Başka bir deyişle, _0-1=2^256-1_. İstenen davranış bu değilse,
  bunu kontrol etmeniz gerekir (veya bunu sizin için yapan SafeMath Kütüphanesini kullanın). Bunun
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)'da değiştiğini unutmayın.
- Belirli bir türdeki tüm durum değişikliklerini belirli bir yerde yapın, çünkü bu denetimi kolaylaştırır.
  Örneğin, `approve`, `transferFrom`, `increaseAllowance` ve `decreaseAllowance` tarafından çağrılan `_approve`'ye sahip olmamızın nedeni budur.
- Durum değişiklikleri, ortalarında başka hiçbir eylem olmadan atomik olmalıdır (`_transfer`'de görebileceğiniz
  gibi). Bunun nedeni, durum değişikliği sırasında tutarsız bir duruma sahip olmanızdır. Örneğin,
  gönderenin bakiyesinden düştüğünüz zaman ile alıcının bakiyesine eklediğiniz zaman arasında,
  olması gerekenden daha az Token vardır. Aralarında işlemler, özellikle farklı bir sözleşmeye çağrılar varsa,
  bu potansiyel olarak kötüye kullanılabilir.

Artık OpenZeppelin ERC-20 sözleşmesinin nasıl yazıldığını ve özellikle nasıl daha güvenli hale getirildiğini
gördüğünüze göre, gidin ve kendi güvenli sözleşmelerinizi ve uygulamalarınızı yazın.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).
