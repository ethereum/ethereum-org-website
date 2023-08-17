---
title: "ERC-20 Sözleşmesine Genel Bakış"
description: OpenZeppelin ERC-20 sözleşmesinde neler var ve neden var?
author: Ori Pomerantz
lang: tr
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Giriş {#introduction}

Ethereum'un en yaygın kullanımlarından biri, bir grubun bir anlamda kendi para birimi olan ticareti yapılabilen bir token oluşturmasıdır. Bu token'lar genelde bir standarda, yani [ERC-20](/developers/docs/standards/tokens/erc-20/)'ye uyumludur. Bu standart, tüm ERC-20 token'larıyla çalışan likidite havuzları ve cüzdanlar gibi araçlar yazmayı mümkün kılar. Bu makalede [OpenZeppelin Solidity ERC20 uygulamasını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) ve [arayüz tanımını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) analiz edeceğiz.

Bu, açıklanmış kaynak koddur. Eğer ERC-20 kullanmak isterseniz, [bu öğreticiyi okuyun](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Arayüz {#the-interface}

ERC-20 gibi bir standardın amacı, cüzdanlar ve merkeziyetsiz borsalar gibi uygulamalar arasında birlikte çalışabilen birçok token uygulamasına izin vermektir. Bunu sağlamak için, bir [arayüz](https://www.geeksforgeeks.org/solidity-basics-of-interface/) oluştururuz. Token sözleşmesini kullanması gereken herhangi bir kod, arayüzde aynı tanımları kullanabilir ve onu kullanan tüm token sözleşmeleriyle uyumlu olarak, MetaMask gibi bir cüzdan, etherscan.io gibi bir dapp veya likidite havuzu gibi farklı bir sözleşme olabilir.

![ERC-20 arayüzünün çizimi](erc20_interface.png)

Deneyimli bir programcıysanız, muhtemelen [Java](https://www.w3schools.com/java/java_interface.asp)'da ve hatta [C header dosyalarında](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) benzer yapılar gördüğünüzü hatırlıyorsunuzdur.

Bu, OpenZeppelin'in yaptığı bir [ERC-20 Arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) tanımıdır. [İnsan tarafından okunabilir standardın](https://eips.ethereum.org/EIPS/eip-20) Solidity koduna çevirisidir. Elbette, arayüzün kendisi herhangi bir şeyi _nasıl_ yapacağını tanımlamaz. Bu, aşağıdaki sözleşme kaynak kodunda açıklanmıştır.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity dosyalarının bir lisans tanımlayıcısı içermesi gerekir. [Burada lisansların bir listesini görebilirsiniz](https://spdx.org/licenses/). Farklı bir lisansa ihtiyacınız varsa, bunu yorumlarda açıklamanız yeterlidir.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity dili hâlâ hızla gelişiyor ve yeni sürümler eski kodla uyumlu olmayabilir ([buraya bakın](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Bu nedenle, dilin yalnızca minimum sürümünü değil, aynı zamanda kodu test ettiğiniz en son sürüm olan maksimum sürümünü de belirtmek iyi bir fikirdir.

&nbsp;

```solidity
/**
 * @dev ERC20 standardının EIP'de tanımlandığı gibi arayüzü.
 */
```

Yorumdaki `@dev`, kaynak kodundan belge oluşturmak için kullanılan [NatSpec formatının](https://docs.soliditylang.org/en/develop/natspec-format.html) bir parçasıdır.

&nbsp;

```solidity
interface IERC20 {
```

Kural olarak, arayüz isimleri `I` ile başlar.

&nbsp;

```solidity
    /**
     * @dev Mevcudiyetteki token miktarını döndürür.
     */
    function totalSupply() external view returns (uint256);
```

Bu fonksiyon `external`'dır (harici), yani [sadece sözleşmenin dışından çağrılabilir](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Sözleşmedeki toplam token arzını döndürür. Bu değer, Ethereum'daki en yaygın tür olan imzasız 256 bit kullanılarak döndürülür (256 bit, EVM'nin yerel kelime boyutudur). Bu fonksiyon aynı zamanda bir `view`'dur, yani durumu değiştirmez, bu nedenle blok zincirindeki her düğümün çalıştırması yerine tek bir düğümde yürütülebilir. Bu tür bir fonksiyon bir işlem oluşturmaz ve fonksiyonun [gaz](/developers/docs/gas/) maliyeti yoktur.

**Not:** Teoride, bir sözleşmeyi oluşturan kişinin, gerçek değerden daha küçük bir toplam arz döndürerek, her bir token'ın gerçekte olduğundan daha değerli görünmesini sağlayarak hile yapabileceği görünebilir. Ancak, bu korku blok zincirinin gerçek doğasını görmezden geliyor. Blok zincirinde olan her şey, her düğüm tarafından doğrulanabilir. Bunu başarmak için, her sözleşmenin makine dili kodu ve depolaması her düğümde mevcuttur. Sözleşmenizin Solidity kodunu yayınlamanız gerekmese de, sağladığınız makina dili koduna karşı doğrulanabilmesi için kaynak kodunu ve derlendiği Solidity versiyonunu paylaşana kadar kimse sizi ciddiye almaz. Örnek olarak, [bu sözleşmeye](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code) bakın.

&nbsp;

```solidity
    /**
     * @dev `account` tarafından sahip olunan token miktarını döndürür.
     */
    function balanceOf(address account) external view returns (uint256);
```

Adından da anlaşılacağı üzere, `balanceOf` (bakiyesi) bir hesabın bakiyesini döndürür. Ethereum hesapları, 160 bit tutan `address` türü kullanılarak Solidity'de tanımlanır. Ayrıca `external` ve `view`'dur.

&nbsp;

```solidity
    /**
     * @dev `amount` tokeni çağıranın hesabından `recipient` hesabına hareket ettirir.
     *
      * İşlemin başarılı olup olmadığını gösteren bir boole değeri döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` fonksiyonu çağırandan farklı bir adrese token'ları aktarır. Bu bir durum değişikliği içerir, yani `view` değildir. Bir kullanıcı bu fonksiyonu çağırdığında bir işlem oluşturur ve gaz harcar. Ayrıca, blok zincirindeki herkese olay hakkında bilgi vermek için `Transfer` adlı bir olay yayar.

Fonksiyon, iki farklı türde çağıran için iki tür çıktıya sahiptir:

- Fonksiyonu doğrudan bir kullanıcı arabiriminden çağıran kullanıcılar. Tipik olarak, kullanıcı bir işlem gönderir ve ne zaman geleceği belli olmayan yanıtın gelmesini beklemez. Kullanıcı, işlem makbuzunu (işlem hash değeri ile tanımlanır) arayarak veya `Transfer` olayını arayarak ne olduğunu görebilir.
- Genel bir işlemin parçası olarak fonksiyonu çağıran diğer sözleşmeler. Bu sözleşmeler, aynı işlemde çalıştıkları için sonucu hemen alırlar, böylece fonksiyon dönüş değerini kullanabilirler.

Aynı tür çıktı, sözleşmenin durumunu değiştiren diğer fonksiyonlar tarafından oluşturulur.

&nbsp;

Ödenekler, bir hesabın farklı bir sahibine ait olan bazı token'ları harcamasına izin verir. Bu, örneğin satıcı olarak hareket eden sözleşmeler için kullanışlıdır. Sözleşmeler olayları izleyemez, bu nedenle bir alıcı token'ları doğrudan satıcı sözleşmesine aktarırsa, bu sözleşme ödendiğini bilemez. Bunun yerine alıcı, satıcı sözleşmesinin belirli bir miktarı harcamasına izin verir ve satıcı bu tutarı transfer eder. Bu, satıcı sözleşmesinin çağırdığı bir fonksiyon aracılığıyla yapılır, böylece satıcı sözleşmesinin başarılı olup olmadığını anlayabilir.

```solidity
    /**
     * @dev, `spender` adresinin `owner` adına {transferFrom}
     * aracılığıyla harcayabileceği kalan token miktarını döndürür. Bu
     * varsayılan olarak sıfırdır.
     *
     * Bu değer {approve} veya {transferFrom} çağırıldığında değişir.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` fonksiyonu, herkesin bir adresin (`owner`) başka bir adresin (`spender`) harcamasına izin verdiği ödeneği görmek için sorgulama yapmasına olanak tanır.

&nbsp;

```solidity
    /**
     * @dev Çağıranın token'ları üzerinde `spender` ödeneğini `amount` olarak belirler.
     *
      * İşlemin başarılı olup olmadığını gösteren bir boolean değeri döndürür.
     *
     * ÖNEMLİ: Bu yöntemle bir ödeneği değiştirmenin, talihsiz işlem sıralaması ile
     * birinin hem eski hem de yeni ödeneği kullanması riskini
     * taşıdığına dikkat edin. Bu yarış koşulunun etkisini azaltmanın muhtemel bir yolu,
     * ilk olarak harcayanın ödeneğini 0'a ayarlayıp arzulanan değeri
     * daha sonra belirlemektir:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Bir {Approval} olayı yayar.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` fonksiyonu bir ödenek oluşturur. Nasıl kötüye kullanılabileceğine dair mesajı okuduğunuzdan emin olun. Ethereum'da kendi işlemlerinizin sırasını kontrol edersiniz, ancak diğer tarafın işleminin gerçekleştiğini görene kadar kendi işleminizi göndermediğiniz sürece diğer kişilerin işlemlerinin yürütüleceği sırayı kontrol edemezsiniz.

&nbsp;

```solidity
    /**
     * @dev Ödenek mekanizmasını kullanarak `amount` token'ı `sender` adresinden `recipient`
     * adresine aktarır. `amount` bunun sonrasında çağıranın ödeneğinden
     * kesilir.
     *
      * İşlemin başarılı olup olmadığını gösteren bir boolean değeri döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Son olarak `transferFrom`, harcayan tarafından ödeneği gerçekten harcamak için kullanılır.

&nbsp;

```solidity

    /**
     * @dev `value` token bir hesaptan (`from`) diğerine (`to`) hareket
     * ettirildiğinde yayılır.
     *
     * `value` sıfır olabilir, bunu unutmayın.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` yeni ödenektir.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Bu olaylar, ERC-20 sözleşmesinin durumu değiştiğinde yayılır.

## Asıl Sözleşme {#the-actual-contract}

Bu, [buradan alınan](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) ERC-20 standardını uygulayan asıl sözleşmedir. Olduğu gibi kullanılması için yapılmamıştır, ancak onu kullanılabilir bir hâle getirmek için [kalıtım](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) şeklinde alabilirsiniz.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### İfadeleri İçe Aktarın {#import-statements}

Yukarıdaki arayüz tanımlarına ek olarak, sözleşme tanımı diğer iki dosyayı içe aktarır:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`, ether'siz kullanıcıların blok zincirini kullanmasına izin veren bir sistem olan [OpenGSN](https://www.opengsn.org/)'yi kullanmak için gereken tanımlardır. Bunun eski bir sürüm olduğun unutmayın, OpenGSN ile entegre olmak istiyorsanız [bu öğreticiyi kullanın](https://docs.opengsn.org/javascript-client/tutorial.html).
- [SafeMath kütüphanesi](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), taşma olmadan toplama ve çıkarma yapmak için kullanılır. Aksi takdirde bir kişinin bir şekilde bir token'ı varken iki token harcayarak 2^256-1 token'a sahip olabileceği için bu gereklidir.

&nbsp;

Bu yorum, sözleşmenin amacını açıklar.

```solidity
/**
 * @dev {IERC20} arayüzünün uygulanması.
 *
 * Bu uygulama, token'ların oluşturulma şekline karşı agnostiktir. Bu,
 * {_mint} kullanılarak türetilmiş bir sözleşmeye bir tedarik mekanizmasının eklenmesi gerektiği anlamına gelir.
 * Kapsamlı bir mekanizma için bkz. {ERC20PresetMinterPauser}.
 *
 * İPUCU: Ayrıntılı bir yazı için rehberimize bakın
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Tedarik
 * mekanizmaları nasıl uygulanır].
 *
 * Genel OpenZeppelin talimatlarını izledik: fonksiyonlar, başarısızlık durumunda
 * `false` döndürmek yerine geri alınırlar. Bu davranış yine de gelenekseldir
 * ve ERC20 uygulamalarının beklentileriyle çelişmez.
 *
 * Ek olarak, {transferFrom} çağrılarında bir {Approval} olayı yayılır.
 * Bu, söz konusu olayları dinleyerek uygulamaların tüm hesaplar için
 * ödeneği yeniden yapılandırmasına izin verir. EIP'nin diğer uygulamaları, şartname gerektirmediği için
 * bu olayları yaymayabilir.
 *
 * Son olarak, ödenek ayarlama ile ilgili bilinen sorunları azaltmak için
 * standart olmayan {decreaseAllowance} ve {increaseAllowance} fonksiyonları
 * eklenmiştir. Bakınız {IERC20-approve}.
 */

```

### Sözleşme Tanımı {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Bu satır, bu durumda OpenGSN için yukarıdaki `IERC20`'den ve `Context`'ten kalıtımı belirtir.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Bu satır `SafeMath` kütüphanesini `uint256` türüne bağlar. Bu kütüphaneyi [burada](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) bulabilirsiniz.

### Değişken Tanımları {#variable-definitions}

Bu tanımlar, sözleşmenin durum değişkenlerini belirtir. Değişkenler `private` olarak bildirilir, ancak bu yalnızca blok zincirindeki diğer sözleşmelerin onları okuyamayacağı anlamına gelir. _Blok zinciri üzerinde sır yoktur_, her düğümdeki yazılım her bloktaki her sözleşmenin durumunu bulundurur. Kural olarak, durum değişkenleri `_<something>` olarak isimlendirilir.

İlk iki değişken, anahtarların sayısal değerler olması dışında, [ilişkisel dizilerle](https://wikipedia.org/wiki/Associative_array) kabaca aynı şekilde davrandıkları anlamına gelen [eşleştirmelerdir](https://www.tutorialspoint.com/solidity/solidity_mappings.htm). Depolama, yalnızca varsayılandan (sıfır) farklı değerlere sahip girdiler için tahsis edilir.

```solidity
    mapping (address => uint256) private _balances;
```

İlk eşleme, `_balances`, adresler ve bu token'ın ilgili bakiyeleridir. Bakiyeye erişmek için, bu söz dizimini kullanın: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Bu değişken, `_allowances`, daha önce açıklanan ödenekleri saklar. İlk endeks, token'ların sahibidir ve ikincisi, ödeneğin olduğu sözleşmedir. A adresinin B adresinin hesabından harcayabileceği miktara erişmek için `_allowances[B][A]` kullanın.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Adından da anlaşılacağı gibi, bu değişken toplam token arzını takip eder.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Bu üç değişken okunabilirliği artırmak için kullanılır. İlk ikisi kendini açıklayıcıdır, ancak `_decimals` farklıdır.

Bir yandan, ethereum'un kayan nokta veya kesirli değişkenleri yoktur. Diğer taraftan, insanlar token'ları bölebilmeyi sever. İnsanların para birimi olarak altını seçmesinin bir nedeni, birisi bir ördeğin değerinde inek almak istediğinde değişiklik yapmanın zor olmasıydı.

Çözüm, tam sayıları takip etmektir ancak gerçek token yerine neredeyse değersiz olan kesirli bir token saymaktır. Ether durumunda, kesirli token wei olarak adlandırılır ve 10^18 wei bir ETH'ye eşittir. Yazarken, 10.000.000.000.000.000 wei yaklaşık olarak bir ABD veya Euro sentidir.

Uygulamalar token bakiyesini nasıl göstereceklerini bilmelidir. Bir kullanıcının 3.141.000.000.000.000.000 wei'si varsa, bu 3,14 ETH midir? 31.41 ETH? 3,141 ETH? Ether durumunda, ETH'ye 10^18 wei olarak tanımlanır ancak kendi token'ınız için farklı bir değer seçebilirsiniz. Eğer token'ı bölmek mantıklı gelmiyorsa sıfır değerinde bir `_decimals` kullanabilirsiniz. ETH ile aynı standardı kullanmak istiyorsanız, **18** değerini kullanın.

### Yapıcı {#the-constructor}

```solidity
    /**
     * @dev {name} ve {symbol} için değerleri belirler, varsayılan 18 değeriyle
     * {decimals} oluşturur.
     *
     * {decimals} için farklı bir değer seçmek için, {_setupDecimals} kullanın.
     *
      * Bu değerlerin üçü de değişmezdir: yalnızca oluşturma sırasında bir kez
      * ayarlanabilirler.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Yapıcı, sözleşme ilk oluşturulduğunda çağrılır. Kural olarak, fonksiyon parametreleri `<something>_` olarak isimlendirilir.

### Kullanıcı Arayüzü Fonksiyonları {#user-interface-functions}

```solidity
    /**
      * @dev Token'ın adını döndürür.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * Örnek olarak, eğer `decimals` eşittir `2` ise, `505` token'lık bakiye
     * kullanıcıya `5,05` olarak gösterilmelidir (`505 / 10 ** 2`).
     *
      * Token'lar genellikle ether ve wei arasındaki ilişkiyi taklit ederek
      * 18 değerini seçer. Bu, {_setupDecimals} çağrılmadıysa {ERC20} tarafından kullanılan
     * değerdir.
     *
      * NOT: Bu bilgi yalnızca _görüntüleme_ amacıyla kullanılır:
      * {IERC20-balanceOf} ve {IERC20-transfer} dahil olmak üzere hiçbir şekilde sözleşmenin
      * aritmetiğini etkilemez.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Bu fonksiyonlar; `name`, `symbol` ve `decimals`, kullanıcı arayüzlerinin sözleşmeniz hakkında bilgi sahibi olmalarına yardımcı olur, böylece sözleşmenizi düzgün bir şekilde görüntüleyebilirler.

Dönüş türü `string memory`'dir, yani bellekte depolanan bir dize döndürür. Dizeler gibi değişkenler üç konumda saklanabilir:

|              | Geçerlilik Süresi | Sözleşme Erişimi | Gaz Bedeli                                                                                  |
| ------------ | ----------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| Bellek       | Fonksiyon çağrısı | Okunur/Yazılır   | Onlarca veya yüzlerce (daha yüksek konumlar için daha yüksek)                               |
| Çağrı Verisi | Fonksiyon çağrısı | Salt Okunur      | Dönüş türü olarak kullanılamaz, yalnızca bir fonksiyon parametre türü olarak kullanılabilir |
| Depolama     | Değişene kadar    | Okunur/Yazılır   | Yüksek (Okuma için 800, yazma için 20 bin)                                                  |

Bu durumda, `memory` en iyi seçenektir.

### Token Bilgisini Okuyun {#read-token-information}

Bunlar, toplam arz veya bir hesabın bakiyesi gibi token hakkında bilgi sağlayan fonksiyonlardır.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` fonksiyonu, toplam token arzını döndürür.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Bir hesabın bakiyesini okuyun. Herkesin başka birinin hesap bakiyesini almasına izin verildiğini unutmayın. Zaten her düğümde mevcut olduğu için bu bilgiyi saklamaya çalışmanın bir anlamı yoktur. _Blok zincirinde sır yoktur._

### Token Transfer Edin {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Gereksinimler:
     *
     * - `recipient` sıfır adresi olamaz.
     * - arayan kişinin en az `amount bakiyesi olmalıdır.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` fonksiyonu, token'ları gönderenin hesabından farklı bir hesaba aktarmak için çağrılır. Bir boolean değeri döndürmesine rağmen, bu değerin her zaman **true** olduğunu unutmayın. Transfer başarısız olursa, sözleşme çağrıyı geri alır.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` fonksiyonu asıl işi yapar. Yalnızca diğer sözleşme fonksiyonları tarafından çağrılabilen özel bir fonksiyondur. Konvansiyonel olarak özel fonksiyonlar, durum değişkenleriyle aynı şekilde `_<something>` olarak adlandırılır.

Normalde Solidity'de mesajı gönderen için `msg.sender` kullanırız. Ancak bu, [OpenGSN](http://opengsn.org/)'i bozar. Eğer token'ımızla ether'sız işlemlere izin vermek istiyorsak, `_msgSender()` kullanmalıyız. Normal işlemler için `msg.sender` döndürür, ancak ether'sız işlemler için mesajı ileten sözleşmeyi değil, orijinal imzalayanı döndürür.

### Ödenek Fonksiyonları {#allowance-functions}

Bunlar, ödenek fonksiyonlarını uygulayan fonksiyonlardır: `allowance`, `approve`, `transferFrom`, ve `_approve`. Ek olarak OpenZeppelin uygulaması, güvenliği artıran bazı özellikleri içerecek şekilde temel standardın ötesine geçer: `increaseAllowance` ve `decreaseAllowance`.

#### Ödenek fonksiyonu {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` fonksiyonu herkesin herhangi bir ödeneği kontrol etmesini sağlar.

#### Onaylama fonksiyonu {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
      * Gereksinimler:
      *
      * - `spender` sıfır adresi olamaz.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Bu işlev, bir ödenek oluşturmak için çağrılır. Yukarıdaki `transfer` fonksiyonuna benzer:

- Fonksiyon yalnızca, gerçek işi yapan dahili bir fonksiyonu (bu durumda `_approve`) çağırır.
- Fonksiyon ya `true` döndürür (başarılı ise) ya da hata verir (değilse).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Durum değişikliklerinin meydana geldiği yerlerin sayısını en aza indirmek için dahili fonksiyonları kullanıyoruz. _Durumu_ değiştiren herhangi bir fonksiyon, güvenlik için denetlenmesi gereken potansiyel bir güvenlik riskidir. Bu şekilde daha az hata yapma ihtimalimiz olur.

#### transferFrom fonksiyonu {#transferFrom}

Bu, bir harcama yapanın bir ödenek harcamak için çağırdığı fonksiyondur. Bunun için iki işlem gerekir: harcanan tutarı transfer edin ve ödeneği bu tutar kadar azaltın.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
      * Güncellenmiş ödeneği gösteren bir {Approval} olayı yayar. Bu
     * EIP için gerekmez. {ERC20} başlangıcındaki nota bakınız.
     *
     * Gereksinimler:
     *
     * - `sender` ve `recipient` sıfır adresi olamaz.
     * - `sender` en az `amount` miktarda bakiyeye sahip olmalıdır.
     * - çağıranın ``sender`` token'ları için en az `amount`
      * ödeneği olmalıdır.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` fonksiyon çağrısı iki şey yapar. İlk olarak, yeni ödenek olan `a-b` hesabını yapar. İkincisi, bu sonucun negatif olmadığını kontrol eder. Negatifse, verilen mesajla çağrı geri döner. Bir çağrı geri döndüğünde, o arama sırasında daha önce yapılmış herhangi bir işlemin yok sayıldığını ve bu nedenle `_transfer` işlemini geri almamız gerekmediğini unutmayın.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin güvenlik eklemeleri {#openzeppelin-safety-additions}

Sıfırdan farklı başka bir değere sıfırdan farklı bir ödenek ayarlamak tehlikelidir, çünkü başkalarının değil, yalnızca kendi işlemlerinizin sırasını siz kontrol edersiniz. Saf olan Alice ve dürüst olmayan Bill olmak üzere iki kullanıcınız olduğunu hayal edin. Alice, Bill'den beş token'a mal olduğunu düşündüğü bir hizmet istiyor, bu yüzden Bill'e beş token'lık bir ödenek veriyor.

Sonra bir şeyler değişir ve Bill'in fiyatı on token'a yükselir. Hâlâ hizmeti isteyen Alice, Bill'in ödeneğini 10'a ayarlayan bir işlem gönderir. Bill, işlem havuzunda bu yeni işlemi gördüğü anda, Alice'in beş token'ını harcayan ve çok daha yüksek bir gaz fiyatına sahip olan bir işlem gönderir, böylece işlem daha hızlı kazılır. Bu şekilde Bill, ilk beş token'ı harcayabilir ve ardından, Alice'in yeni ödeneği çıkarıldığında, on beş token'lık toplam fiyat için, Alice'in yetkilendirmek istediğinden daha fazla olacak şekilde on tane daha harcayabilir. Bu tekniğe [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running) denir

| Alice'in İşlemi   | Alice'in Nonce Değeri | Bill'in İşlemi                | Bill'in Nonce Değeri | Bill'in Ödeneği | Bill'in Alice'den Toplam Geliri |
| ----------------- | --------------------- | ----------------------------- | -------------------- | --------------- | ------------------------------- |
| approve(Bill, 5)  | 10                    |                               |                      | 5               | 0                               |
|                   |                       | transferFrom(Alice, Bill, 5)  | 10,123               | 0               | 5                               |
| approve(Bill, 10) | 11                    |                               |                      | 10              | 5                               |
|                   |                       | transferFrom(Alice, Bill, 10) | 10,124               | 0               | 15                              |

Bu sorunu önlemek için, bu iki fonksiyon (`increaseAllowance` ve `decreaseAllowance`), ödeneği belirli bir miktarda değiştirmenize olanak tanır. Yani Bill zaten beş token harcamışsa, sadece beş tane daha harcayabilecektir. Zamanlamaya bağlı olarak, bunun iki sonucu olabilir ve her ikisinde de Bill yalnızca on token alabilir:

A:

| Alice'in İşlemi            | Alice'in Nonce Değeri | Bill'in İşlemi               | Bill'in Nonce Değeri | Bill'in Ödeneği | Bill'in Alice'den Toplam Geliri |
| -------------------------- | --------------------: | ---------------------------- | -------------------: | --------------: | ------------------------------- |
| approve(Bill, 5)           |                    10 |                              |                      |               5 | 0                               |
|                            |                       | transferFrom(Alice, Bill, 5) |               10,123 |               0 | 5                               |
| increaseAllowance(Bill, 5) |                    11 |                              |                      |         0+5 = 5 | 5                               |
|                            |                       | transferFrom(Alice, Bill, 5) |               10,124 |               0 | 10                              |

B:

| Alice'in İşlemi            | Alice'in Nonce Değeri | Bill'in İşlemi                | Bill'in Nonce Değeri | Bill'in Ödeneği | Bill'in Alice'den Toplam Geliri |
| -------------------------- | --------------------: | ----------------------------- | -------------------: | --------------: | ------------------------------: |
| approve(Bill, 5)           |                    10 |                               |                      |               5 |                               0 |
| increaseAllowance(Bill, 5) |                    11 |                               |                      |        5+5 = 10 |                               0 |
|                            |                       | transferFrom(Alice, Bill, 10) |               10,124 |               0 |                              10 |

```solidity
    /**
     * @dev Çağıran tarafından `spender` için sağlanan ödeneği atomik derecede artırır.
     *
      * Bu, {IERC20-approve} bölümünde açıklanan sorunlar için hafifletme olarak kullanılabilecek
      * {approve} seçeneğine bir alternatiftir.
     *
      * Güncellenmiş ödeneği gösteren bir {Approval} olayı yayar.
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

`a.add(b)` fonksiyonu güvenli bir toplamadır. `a`+`b`>=`2^256` olan ihtimali düşük durumda, normal toplamanın yaptığı gibi başa dönmez.

```solidity

    /**
     * @dev Çağıran tarafından `spender` için sağlanan ödeneği atomik derecede azaltır.
     *
      * Bu, {IERC20-approve} bölümünde açıklanan sorunlar için hafifletme olarak kullanılabilecek
      * {approve} seçeneğine bir alternatiftir.
     *
      * Güncellenmiş ödeneği gösteren bir {Approval} olayı yayar.
     *
      * Gereksinimler:
      *
      * - `spender` sıfır adresi olamaz.
     * - `spender` çağıran için en az `subtractedValue` kadar
     * ödeneğe sahip olmalı.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Token Bilgilerini Değiştiren Fonksiyonlar {#functions-that-modify-token-information}

Bunlar asıl işi yapan dört fonksiyondur: `_transfer`, `_mint`, `_burn` ve `_approve`.

#### \_transfer fonksiyonu {#\_transfer}

```solidity
    /**
     * @dev `amount` token'ı `sender`'dan `recipient`'a hareket ettirir.
     *
      * Bu dahili fonksiyon {transfer} ile eş değerdir ve şu amaçlarla kullanılabilir:
      * örn. otomatik token ücretlerini, kesme mekanizmalarını vb. uygulama.
      *
      * Bir {Transfer} olayı yayar.
     *
      * Gereksinimler:
      *
      * - `sender` sıfır adresi olamaz.
     * - `recipient` sıfır adresi olamaz.
     * - `sender` en az `amount` miktarda bakiyeye sahip olmalıdır.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Bu fonksiyon, `_transfer`, token'ları bir hesaptan diğerine aktarır. Hem `transfer` (gönderenin kendi hesabından yapılan transferler için) hem de `transferFrom` (başka birinin hesabından transfer için izinleri kullanmak için) tarafından çağrılır.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Ethereum'da hiç kimse aslında sıfır adresine sahip değildir (yani, eşleşen ortak anahtarı sıfır adresine dönüştürülen özel bir anahtarı kimse bilmez). İnsanlar bu adresi kullandığında, bu genellikle bir yazılım hatasıdır. Bu nedenle gönderen veya alıcı olarak sıfır adres kullanılırsa başarısız oluruz.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Bu sözleşmeyi kullanmanın iki yolu vardır:

1. Kendi kodunuz için bir şablon olarak kullanın
1. [Ondan kalıtım yoluyla alın](https://www.bitdegree.org/learn/solidity-inheritance) ve yalnızca değiştirmeniz gereken fonksiyonları geçersiz kılın

İkinci yöntem çok daha iyidir çünkü OpenZeppelin ERC-20 kodu zaten denetlenmiş ve güvenli olduğu gösterilmiştir. Kalıtım kullandığınızda, değiştirdiğiniz fonksiyonların ne olduğu açıktır ve sözleşmenize güvenmek için kişilerin yalnızca bu belirli fonksiyonları denetlemesi gerekir.

Token'lar her el değiştirdiğinde bir fonksiyon gerçekleştirmek genellikle yararlıdır. Ancak,`_transfer` çok önemli bir fonksiyondur ve güvenli olmayan bir şekilde yazmak mümkündür (aşağıya bakın), bu nedenle geçersiz kılmamak en iyisidir. Çözüm, bir [kanca fonksiyonu](https://wikipedia.org/wiki/Hooking) olan `_beforeTokenTransfer` fonksiyonudur. Bu fonksiyonu geçersiz kılabilirsiniz ve her aktarımda çağrılacaktır.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Bunlar aslında aktarımı yapan hatlardır. Aralarında **hiçbir şey** olmadığını ve aktarılan tutarı alıcıya eklemeden önce göndericiden çıkardığımızı unutmayın. Bu, ortada farklı bir sözleşmeye çağrı olsaydı, bu sözleşmeyi aldatmak için kullanılmış olabileceği için önemlidir. Bu şekilde aktarım atomiktir, ortasında hiçbir şey olamaz.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Son olarak, bir `Transfer` olayı yayın. Olaylara akıllı sözleşmelerle erişilemez, ancak blok zincirinin dışında çalışan kod, olayları dinleyebilir ve bunlara tepki verebilir. Örneğin bir cüzdan, sahibinin ne zaman daha fazla token aldığını takip edebilir.

#### \_mint ve \_burn fonksiyonları {#\_mint-and-\_burn}

Bu iki fonksiyon (`_mint` and `_burn`) toplam token arzını düzenler. Bunlar dahilidir ve bu sözleşmede onları çağıran bir fonksiyon yoktur, bu nedenle yalnızca sözleşmeden devralırsanız ve hangi koşullar altında yeni token'lar basacağınıza veya mevcut token'ları yakacağınıza karar vermek için kendi mantığınızı eklerseniz kullanışlıdırlar.

**NOT:** Her ERC-20 token'ının, token yönetimini belirleyen kendi çalışma mantığı vardır. Örneğin, sabit bir arz sözleşmesi, yapıcıda yalnızca `_mint` öğesini çağırabilir ve hiçbir zaman `_burn` öğesini çağıramaz. Token satan bir sözleşme, ödeme yapıldığında `_mint`'i ve kaçak enflasyonu önlemek için bir noktada muhtemelen `_burn`'u arayacaktır.

```solidity
    /** @dev `amount` token yaratır ve onları `account`'a atarak toplam arzı
     * artırır.
     *
     * `from` sıfır adresine ayarlı olacak şekilde bir {Transfer} olayı yayar.
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

Toplam token sayısı değiştiğinde `_totalSupply`'ı güncellediğinizden emin olun.

&nbsp;

```
    /**
     * @dev `amount` token'ı `account`'tan yok ederek toplam arzı
     * azaltır.
     *
     * `to` sıfır adresine ayarlı olacak şekilde bir {Transfer} olayı yayar.
     *
     * Gereksinimler:
     *
     * - `account` sıfır adresi olamaz.
     * - `account` en az `amount` miktarda token'a sahip olmalı.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` fonksiyonu, diğer yöne gitmesi dışında `_mint` ile hemen hemen aynıdır.

#### \_approve fonksiyonu {#\_approve}

Bu aslında ödenekleri belirten fonksiyondur. Sahibin, kendi mevcut bakiyesinden daha yüksek bir ödenek belirlemesine izin verdiğini unutmayın. Bakiye, ödenek oluşturulduğundaki bakiyeden farklı olabileceği transfer sırasında kontrol edildiği için bu sorun yaratmaz.

```solidity
    /**
     * @dev `owner` token'ları üzerinde `spender` ödeneğini `amount` olarak belirler.
     *
      * Bu dahili işlev `approve` ile eş değerdir ve şu amaçlarla kullanılabilir:
      * örn. belirli alt sistemler için otomatik izinler ayarlama vb.
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

Bir `Approval` olayı yayın. Uygulamanın nasıl yazıldığına bağlı olarak, harcayan sözleşmenin sahibi tarafından veya bu olayları dinleyen bir sunucu tarafından onaylanması hakkında bilgi verilebilir.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Ondalık Değişkenini Düzenleyin {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals} değerini varsayılan olan 18 harici bir değere ayarlar.
     *
      * UYARI: Bu fonksiyon sadece yapıcıdan çağrılmalıdır. Çoğu
      * Token sözleşmeleriyle etkileşime giren uygulama,
      * {decimals} değerinin değişmesini beklemez ve değişirse yanlış çalışabilir.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Bu fonksiyon, kullanıcı arabirimlerine miktarın nasıl yorumlanacağını söylemek için kullanılan `_decimals` değişkenini değiştirir. Yapıcıdan çağırmalısınız. Daha sonraki herhangi bir noktada onu çağırmak sahtekârlık olur ve uygulamalar bununla başa çıkmak için tasarlanmamıştır.

### Kancalar {#hooks}

```solidity

    /**
     * @dev Herhangi bir token'ın aktarımı öncesi çağrılan kanca. Buna
     * basım ve yakım dahildir.
     *
      * Çağrı koşulları:
      *
      * - `from` ve `to` sıfır olmadığında, `from`'un token `amount` değeri
      * `to`'ya aktarılır.
     * - `from` sıfırken, `amount` token `to` için basılır.
     * - `to` sıfırken, ``from``'un `amount` kadar token'ı yakılır.
     * - `from` ve `to` asla ikisi birden sıfır olmaz.
     *
      * Kancalar hakkında daha fazla bilgi edinmek için xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks] sayfasına gidin.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Bu, aktarımlar sırasında çağrılacak kanca fonksiyonudur. Bu örnekte kanca fonksiyonu boş ancak ihtiyaç duyarsanız fonksiyon içeriğini doldurabilirsiniz.

# Sonuç {#conclusion}

İnceleme için, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır (bence sizinki muhtemelen değişebilir):

- _Blok zincirinde sır yoktur._. Akıllı bir sözleşmenin erişebileceği herhangi bir bilgi tüm dünya tarafından kullanılabilir.
- Başkalarının işlemleri gerçekleştiğinde anlar hariç kendi işlemlerinizin sırasını kontrol edebilirsiniz. Bu, bir ödeneği değiştirmenin tehlikeli olabilmesinin nedenidir, çünkü harcama yapanın her iki ödeneğin toplamını harcamasına izin verir.
- `uint256` türünde değerler döner. Başka bir deyişle, _0-1=2^256-1_. Bu istenen davranış değilse, kontrol etmeniz (veya sizin için yapan SafeMath kütüphanesini kullanmanız) gerekir. Bunun [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) sürümünde değiştiğini unutmayın.
- Denetimi kolaylaştırdığından, belirli bir türdeki tüm durum değişikliklerini belirli bir yerde yapın. Bu, örnek olarak `approve`, `transferFrom`, `increaseAllowance` ve `decreaseAllowance` tarafından çağrılan `_approve` fonksiyonuna sahip olmamızın sebebidir
- Durum değişiklikleri, aralarında başka bir işlem olmaksızın atomik olmalıdır (`_transfer`'da görebileceğiniz gibi). Bunun nedeni, durum değişikliği sırasında tutarsız bir duruma sahip olmanızdır. Örneğin, gönderenin bakiyesinden düştüğünüz süre ile alıcının bakiyesine eklediğiniz zaman arasında olması gerekenden daha az token vardır. Aralarında işlemler, özellikle farklı bir sözleşmeye yapılan çağrılar varsa, bu potansiyel olarak kötüye kullanılabilir.

Artık OpenZeppelin ERC-20 sözleşmesinin nasıl yazıldığını ve özellikle nasıl daha güvenli hâle getirildiğini gördünüz, kendi güvenli sözleşmelerinizi ve uygulamalarınızı yazabilirsiniz.
