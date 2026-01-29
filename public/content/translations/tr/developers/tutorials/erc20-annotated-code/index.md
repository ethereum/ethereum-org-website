---
title: "ERC-20 Sözleşmesine Genel Bakış"
description: "OpenZeppelin ERC-20 sözleşmesinde ne var ve neden var?"
author: Ori Pomerantz
lang: tr
tags: [ "katılık", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Giriş {#introduction}

Ethereum'un en yaygın kullanımlarından biri, bir grubun bir anlamda kendi para birimi olan ticareti yapılabilen bir token oluşturmasıdır. Bu jetonlar genellikle bir standardı takip eder,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Bu standart, likidite havuzları ve cüzdanlar gibi tüm ERC-20 jetonlarıyla çalışan araçlar yazmayı mümkün kılar. Bu makalede [OpenZeppelin Solidity ERC20 uygulamasını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) ve [arayüz tanımını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) analiz edeceğiz.

Bu, açıklamalı bir kaynak kodudur. ERC-20'yi uygulamak istiyorsanız [bu eğitimi okuyun](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Arayüz {#the-interface}

ERC-20 gibi bir standardın amacı, cüzdanlar ve merkeziyetsiz borsalar gibi uygulamalar arasında birlikte çalışabilen birçok jeton uygulamasını mümkün kılmaktır. Bunu başarmak için bir [arayüz](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/) oluştururuz. Jeton sözleşmesini kullanması gereken herhangi bir kod, arayüzdeki aynı tanımları kullanabilir ve onu kullanan tüm jeton sözleşmeleriyle uyumlu olabilir; bu MetaMask gibi bir cüzdan, etherscan.io gibi bir dapp veya bir likidite havuzu gibi farklı bir sözleşme olabilir.

![ERC-20 arayüzünün çizimi](erc20_interface.png)

Deneyimli bir programcıysanız, [Java](https://www.w3schools.com/java/java_interface.asp) veya hatta [C başlık dosyalarında](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) benzer yapılar gördüğünüzü muhtemelen hatırlarsınız.

Bu, OpenZeppelin'den alınan [ERC-20 Arayüzünün](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) bir tanımıdır. [İnsan tarafından okunabilir standardın](https://eips.ethereum.org/EIPS/eip-20) Solidity koduna çevirisidir. Elbette arayüzün kendisi, herhangi bir şeyin _nasıl_ yapılacağını tanımlamaz. Bu, aşağıdaki sözleşme kaynak kodunda açıklanmıştır.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity dosyalarının bir lisans tanımlayıcısı içermesi gerekir. [Lisansların listesini burada görebilirsiniz](https://spdx.org/licenses/). Farklı bir lisansa ihtiyacınız varsa bunu yorumlarda açıklamanız yeterlidir.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity dili hâlâ hızla gelişiyor ve yeni sürümler eski kodlarla uyumlu olmayabilir ([buraya bakın](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Bu nedenle, yalnızca dilin minimum sürümünü değil, aynı zamanda kodu test ettiğiniz en son sürüm olan maksimum sürümünü de belirtmek iyi bir fikirdir.

&nbsp;

```solidity
/**
 * @dev EIP'de tanımlandığı şekliyle ERC20 standardının arayüzü.
 */
```

Yorumdaki `@dev`, kaynak kodundan doküman üretmek için kullanılan [NatSpec formatının](https://docs.soliditylang.org/en/develop/natspec-format.html) bir parçasıdır.

&nbsp;

```solidity
interface IERC20 {
```

Kural gereği, arayüz adları `I` ile başlar.

&nbsp;

```solidity
    /**
     * @dev Mevcut jeton miktarını döndürür.
     */
    function totalSupply() external view returns (uint256);
```

Bu fonksiyon `external`'dır, yani [yalnızca sözleşmenin dışından çağrılabilir](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Sözleşmedeki toplam jeton arzını döndürür. Bu değer, Ethereum'daki en yaygın tür olan işaretsiz 256 bit kullanılarak döndürülür (256 bit, EVM'nin yerel kelime boyutudur). Bu fonksiyon aynı zamanda bir `view`'dır, yani durumu değiştirmez, bu nedenle blokzincirindeki her düğümün çalıştırması yerine tek bir düğümde yürütülebilir. Bu tür bir fonksiyon bir işlem oluşturmaz ve [gaz](/developers/docs/gas/) maliyeti yoktur.

**Not:** Teoride, bir sözleşmeyi oluşturan kişinin, gerçek değerden daha küçük bir toplam arz döndürerek her bir jetonun gerçekte olduğundan daha değerli görünmesini sağlayarak hile yapabileceği düşünülebilir. Ancak bu korku, blokzincirin gerçek doğasını göz ardı eder. Blokzincirinde olan her şey her düğüm tarafından doğrulanabilir. Bunu başarmak için, her sözleşmenin makine dili kodu ve depolaması her düğümde mevcuttur. Sözleşmeniz için Solidity kodunu yayınlamanız gerekmese de, sağladığınız makine dili koduna karşı doğrulanabilmesi için kaynak kodunu ve derlendiği Solidity sürümünü yayınlamadığınız sürece kimse sizi ciddiye almaz.
Örneğin, [bu sözleşmeye](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract) bakın.

&nbsp;

```solidity
    /**
     * @dev `account`un sahip olduğu jeton miktarını döndürür.
     */
    function balanceOf(address account) external view returns (uint256);
```

Adından da anlaşılacağı gibi, `balanceOf` bir hesabın bakiyesini döndürür. Ethereum hesapları, 160 bit tutan `address` türü kullanılarak Solidity'de tanımlanır.
Ayrıca `external` ve `view`'dur.

&nbsp;

```solidity
    /**
     * @dev Arayan kişinin hesabından `recipient`a `amount` kadar jeton taşır.
     *
     * İşlemin başarılı olup olmadığını gösteren bir boolean değeri döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` fonksiyonu, jetonları arayandan farklı bir adrese aktarır. Bu bir durum değişikliği içerir, dolayısıyla bir `view` değildir.
Bir kullanıcı bu fonksiyonu çağırdığında bir işlem oluşturur ve gaz harcar. Ayrıca, blokzincirindeki herkese olay hakkında bilgi vermek için `Transfer` adlı bir olay yayar.

Fonksiyonun, iki farklı türde arayan için iki tür çıktısı vardır:

- Fonksiyonu doğrudan bir kullanıcı arayüzünden çağıran kullanıcılar. Genellikle kullanıcı bir işlem gönderir ve süresiz olarak sürebilecek bir yanıt beklemez. Kullanıcı, işlem makbuzunu (işlem karması ile tanımlanır) arayarak veya `Transfer` olayını arayarak ne olduğunu görebilir.
- Fonksiyonu genel bir işlemin parçası olarak çağıran diğer sözleşmeler. Bu sözleşmeler, aynı işlemde çalıştıkları için sonucu hemen alır, böylece fonksiyon dönüş değerini kullanabilirler.

Aynı tür çıktı, sözleşmenin durumunu değiştiren diğer fonksiyonlar tarafından oluşturulur.

&nbsp;

Ödenekler, bir hesabın farklı bir sahibine ait olan bazı jetonları harcamasına izin verir.
Bu, örneğin satıcı olarak hareket eden sözleşmeler için kullanışlıdır. Sözleşmeler olayları izleyemez, bu nedenle bir alıcı jetonları doğrudan satıcı sözleşmesine aktarırsa bu sözleşme ödendiğini bilemez. Bunun yerine alıcı, satıcı sözleşmesinin belirli bir miktarı harcamasına izin verir ve satıcı bu tutarı transfer eder.
Bu, satıcı sözleşmesinin çağırdığı bir fonksiyon aracılığıyla yapılır, böylece satıcı sözleşmesi başarılı olup olmadığını anlayabilir.

```solidity
    /**
     * @dev `spender`ın {transferFrom} aracılığıyla `owner` adına harcamasına
     * izin verilecek kalan jeton sayısını döndürür. Bu varsayılan
     * olarak sıfırdır.
     *
     * Bu değer, {approve} veya {transferFrom} çağrıldığında değişir.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` fonksiyonu, herkesin bir adresin (`owner`) başka bir adresin (`spender`) harcamasına izin verdiği ödeneği sorgulamasına olanak tanır.

&nbsp;

```solidity
    /**
     * @dev Arayanın jetonları üzerinde `spender`ın ödeneği olarak `amount`u ayarlar.
     *
     * İşlemin başarılı olup olmadığını gösteren bir boole değeri döndürür.
     *
     * ÖNEMLİ: Bu yöntemle bir ödeneği değiştirmenin,
     * birisinin şanssız bir işlem sıralamasıyla hem eski hem de yeni ödeneği
     * kullanma riski taşıdığına dikkat edin. Bu yarış
     * durumunu azaltmak için olası bir çözüm, önce harcama yapanın ödeneğini 0'a
     * indirmek ve ardından istenen değeri ayarlamaktır:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Bir {Approval} olayı yayar.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` fonksiyonu bir ödenek oluşturur. Nasıl kötüye kullanılabileceğiyle ilgili mesajı okuduğunuzdan emin olun. Ethereum'da kendi işlemlerinizin sırasını kontrol edersiniz, ancak diğer tarafın işleminin gerçekleştiğini görene kadar kendi işleminizi göndermezseniz, diğer kişilerin işlemlerinin yürütüleceği sırayı kontrol edemezsiniz.

&nbsp;

```solidity
    /**
     * @dev Ödenek mekanizmasını kullanarak `sender`dan `recipient`a `amount`
     * kadar jeton taşır. `amount` daha sonra arayanın
     * ödeneğinden düşülür.
     *
     * İşlemin başarılı olup olmadığını gösteren bir boole değeri döndürür.
     *
     * Bir {Transfer} olayı yayar.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Son olarak, `transferFrom` harcayan tarafından ödeneği gerçekten harcamak için kullanılır.

&nbsp;

```solidity

    /**
     * @dev Bir hesaptan (`from`) diğerine (`to`)
     * `value` kadar jeton taşındığında yayılır.
     *
     * `value`un sıfır olabileceğini unutmayın.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Bir `owner` için bir `spender` ödeneği, {approve} çağrısıyla
     * ayarlandığında yayılır. `value` yeni ödenektir.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Bu olaylar, ERC-20 sözleşmesinin durumu değiştiğinde yayılır.

## Asıl Sözleşme {#the-actual-contract}

Bu, [buradan alınan](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) ERC-20 standardını uygulayan asıl sözleşmedir.
Olduğu gibi kullanılması amaçlanmamıştır, ancak onu kullanılabilir bir şeye genişletmek için ondan [kalıtım alabilirsiniz](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### İçe Aktarma İfadeleri {#import-statements}

Yukarıdaki arayüz tanımlarına ek olarak, sözleşme tanımı diğer iki dosyayı içe aktarır:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`, ether'i olmayan kullanıcıların blokzincirini kullanmasına olanak tanıyan bir sistem olan [OpenGSN](https://www.opengsn.org/)'yi kullanmak için gereken tanımlardır. Bunun eski bir sürüm olduğunu unutmayın, OpenGSN ile entegre olmak istiyorsanız [bu eğitimi kullanın](https://docs.opengsn.org/javascript-client/tutorial.html).
- Solidity'nin **&lt;0.8.0** sürümleri için aritmetik taşmaları/eksik kalmaları önleyen [SafeMath kütüphanesi](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/). Solidity ≥0.8.0'da, aritmetik işlemler taşma/eksik kalma durumunda otomatik olarak geri döner, bu da SafeMath'i gereksiz kılar. Bu sözleşme, eski derleyici sürümleriyle geriye dönük uyumluluk için SafeMath kullanır.

&nbsp;

Bu yorum, sözleşmenin amacını açıklar.

```solidity
/**
 * @dev {IERC20} arayüzünün uygulanması.
 *
 * Bu uygulama, jetonların oluşturulma şeklinden bağımsızdır. Bu, {_mint} kullanılarak
 * türetilmiş bir sözleşmeye bir arz mekanizmasının eklenmesi gerektiği anlamına gelir.
 * Genel bir mekanizma için bkz. {ERC20PresetMinterPauser}.
 *
 * İPUCU: Ayrıntılı bir yazı için rehberimize bakın
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Arz
 * mekanizmaları nasıl uygulanır].
 *
 * Genel OpenZeppelin yönergelerini takip ettik: fonksiyonlar başarısız olduğunda
 * `false` döndürmek yerine geri döner. Bu davranış yine de gelenekseldir
 * ve ERC20 uygulamalarının beklentileriyle çelişmez.
 *
 * Ek olarak, {transferFrom} çağrılarında bir {Approval} olayı yayılır.
 * Bu, uygulamaların sadece bu olayları dinleyerek tüm hesaplar için
 * ödeneği yeniden oluşturmasına olanak tanır. EIP'nin diğer uygulamaları, spesifikasyonda
 * gerekli olmadığı için bu olayları yaymayabilir.
 *
 * Son olarak, standart dışı {decreaseAllowance} ve {increaseAllowance}
 * fonksiyonları, ödenekleri ayarlamayla ilgili bilinen sorunları azaltmak
 * için eklenmiştir. Bkz. {IERC20-approve}.
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

Bu satır, `SafeMath` kütüphanesini `uint256` türüne bağlar. Bu kütüphaneyi [burada](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) bulabilirsiniz.

### Değişken Tanımları {#variable-definitions}

Bu tanımlar, sözleşmenin durum değişkenlerini belirtir. Bu değişkenler `private` olarak bildirilmiştir, ancak bu yalnızca blokzincirindeki diğer sözleşmelerin onları okuyamayacağı anlamına gelir. _Blokzincirinde sır yoktur_, her düğümdeki yazılım, her bloktaki her sözleşmenin durumuna sahiptir. Kural olarak, durum değişkenleri `_<bir şey>` olarak adlandırılır.

İlk iki değişken [eşlemelerdir](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), yani anahtarların sayısal değerler olması dışında kabaca [ilişkisel dizilerle](https://wikipedia.org/wiki/Associative_array) aynı şekilde davranırlar. Depolama, yalnızca varsayılandan (sıfır) farklı değerlere sahip girdiler için tahsis edilir.

```solidity
    mapping (address => uint256) private _balances;
```

İlk eşleme olan `_balances`, adresleri ve bu jetonun ilgili bakiyelerini içerir. Bakiyeye erişmek için şu söz dizimini kullanın: `_balances[<adres>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Bu değişken, `_allowances`, daha önce açıklanan ödenekleri saklar. İlk dizin jetonların sahibidir ve ikincisi ödeneğe sahip olan sözleşmedir. A adresinin B adresinin hesabından harcayabileceği miktara erişmek için `_allowances[B][A]` kullanın.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Adından da anlaşılacağı gibi, bu değişken toplam jeton arzını takip eder.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Bu üç değişken okunabilirliği artırmak için kullanılır. İlk ikisi kendini açıklayıcıdır, ancak `_decimals` farklıdır.

Bir yandan, Ethereum'da kayan noktalı veya kesirli değişkenler yoktur. Diğer yandan, insanlar jetonları bölebilmeyi sever. İnsanların para birimi olarak altını seçmesinin bir nedeni, birisi bir ördeğin değerinde inek almak istediğinde para üstü vermenin zor olmasıydı.

Çözüm, tam sayıları takip etmek, ancak gerçek jeton yerine neredeyse değersiz olan kesirli bir jetonu saymaktır. Ether durumunda, kesirli jetona wei denir ve 10^18 wei bir ETH'ye eşittir. Bu yazı yazıldığı sırada, 10.000.000.000.000 wei yaklaşık bir ABD veya Euro sentine eşittir.

Uygulamaların jeton bakiyesini nasıl göstereceklerini bilmeleri gerekir. Bir kullanıcının 3.141.000.000.000.000.000 wei'si varsa, bu 3,14 ETH midir? 31,41 ETH mi? 3.141 ETH mi? Ether durumunda, ETH'ye 10^18 wei olarak tanımlanır ancak kendi jetonunuz için farklı bir değer seçebilirsiniz. Jetonu bölmek mantıklı değilse, sıfır değerinde bir `_decimals` kullanabilirsiniz. ETH ile aynı standardı kullanmak istiyorsanız, **18** değerini kullanın.

### Oluşturucu {#the-constructor}

```solidity
    /**
     * @dev {name} ve {symbol} için değerleri ayarlar, {decimals}'i
     * varsayılan 18 değeriyle başlatır.
     *
     * {decimals} için farklı bir değer seçmek için {_setupDecimals} kullanın.
     *
     * Bu üç değerin tümü sabittir: yalnızca oluşturma sırasında
     * bir kez ayarlanabilirler.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Solidity ≥0.7.0'da, 'public' örtüktür ve atlanabilir.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Oluşturucu, sözleşme ilk oluşturulduğunda çağrılır. Kural gereği, fonksiyon parametreleri `<bir şey>_` olarak adlandırılır.

### Kullanıcı Arayüzü Fonksiyonları {#user-interface-functions}

```solidity
    /**
     * @dev Jetonun adını döndürür.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Genellikle adın daha kısa bir versiyonu olan jetonun sembolünü
     * döndürür.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Kullanıcı gösterimini elde etmek için kullanılan ondalık sayısını döndürür.
     * Örneğin, `decimals` `2`'ye eşitse, `505` jetonluk bir bakiye
     * kullanıcıya `5,05` (`505 / 10 ** 2`) olarak gösterilmelidir.
     *
     * Jetonlar genellikle ether ve wei arasındaki ilişkiyi taklit ederek 18 değerini
     * tercih ederler. Bu, {_setupDecimals} çağrılmadığı sürece {ERC20}'nin
     * kullandığı değerdir.
     *
     * NOT: Bu bilgi yalnızca _gösterim_ amacıyla kullanılır: hiçbir
     * şekilde {IERC20-balanceOf} ve {IERC20-transfer} dahil olmak üzere
     * sözleşmenin aritmetiğini etkilemez.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Bu fonksiyonlar, `name`, `symbol` ve `decimals`, kullanıcı arayüzlerinin sözleşmeniz hakkında bilgi sahibi olmalarına yardımcı olur, böylece sözleşmenizi düzgün bir şekilde görüntüleyebilirler.

Dönüş türü `string memory`'dir, yani bellekte depolanan bir dize döndürür. Dizeler gibi değişkenler üç konumda saklanabilir:

|          | Geçerlilik Süresi | Sözleşme Erişimi | Gaz Bedeli                                                                                  |
| -------- | ----------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| Bellek   | Fonksiyon çağrısı | Okunur/Yazılır   | Onlarca veya yüzlerce (daha yüksek konumlar için daha yüksek)            |
| Calldata | Fonksiyon çağrısı | Salt Okunur      | Dönüş türü olarak kullanılamaz, yalnızca bir fonksiyon parametre türü olarak kullanılabilir |
| Depolama | Değişene kadar    | Okunur/Yazılır   | Yüksek (Okuma için 800, yazma için 20 bin)                               |

Bu durumda `memory` en iyi seçenektir.

### Jeton Bilgilerini Oku {#read-token-information}

Bunlar, toplam arz veya bir hesabın bakiyesi gibi jeton hakkında bilgi sağlayan fonksiyonlardır.

```solidity
    /**
     * @dev Bkz. {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` fonksiyonu, toplam jeton arzını döndürür.

&nbsp;

```solidity
    /**
     * @dev Bkz. {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Bir hesabın bakiyesini okuyun. Herkesin başka birinin hesap bakiyesini almasına izin verildiğini unutmayın. Zaten her düğümde mevcut olduğu için bu bilgiyi saklamaya çalışmanın bir anlamı yoktur. _Blokzincirinde sır yoktur._

### Jetonları Aktar {#transfer-tokens}

```solidity
    /**
     * @dev Bkz. {IERC20-transfer}.
     *
     * Gereklilikler:
     *
     * - `recipient` sıfır adres olamaz.
     * - arayan en az `amount` bakiyeye sahip olmalıdır.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` fonksiyonu, jetonları gönderenin hesabından farklı bir hesaba aktarmak için çağrılır. Bir boole değeri döndürmesine rağmen, bu değerin **her zaman doğru** olduğunu unutmayın. Aktarım başarısız olursa sözleşme çağrıyı geri alır.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` fonksiyonu asıl işi yapar. Yalnızca diğer sözleşme fonksiyonları tarafından çağrılabilen özel bir fonksiyondur. Kural olarak özel fonksiyonlar, durum değişkenleriyle aynı şekilde `_<bir şey>` olarak adlandırılır.

Normalde Solidity'de mesajı gönderen için `msg.sender` kullanırız. Ancak bu, [OpenGSN](http://opengsn.org/)'yi bozar. Jetonumuzla ether'sız işlemlere izin vermek istiyorsak, `_msgSender()` kullanmalıyız. Normal işlemler için `msg.sender` döndürür, ancak ether'sız işlemler için mesajı ileten sözleşmeyi değil, orijinal imzalayanı döndürür.

### Ödenek Fonksiyonları {#allowance-functions}

Bunlar, ödenek işlevselliğini uygulayan fonksiyonlardır: `allowance`, `approve`, `transferFrom` ve `_approve`. Ek olarak, OpenZeppelin uygulaması, güvenliği artıran bazı özellikleri içerecek şekilde temel standardın ötesine geçer: `increaseAllowance` ve `decreaseAllowance`.

#### Ödenek fonksiyonu {#allowance}

```solidity
    /**
     * @dev Bkz. {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` fonksiyonu herkesin herhangi bir ödeneği kontrol etmesini sağlar.

#### approve fonksiyonu {#approve}

```solidity
    /**
     * @dev Bkz. {IERC20-approve}.
     *
     * Gereklilikler:
     *
     * - `spender` sıfır adres olamaz.
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

Durum değişikliklerinin meydana geldiği yerlerin sayısını en aza indirmek için dahili fonksiyonları kullanıyoruz. Durumu değiştiren _herhangi bir_ fonksiyon, güvenlik için denetlenmesi gereken potansiyel bir güvenlik riskidir. Bu şekilde daha az hata yapma ihtimalimiz olur.

#### transferFrom fonksiyonu {#transferFrom}

Bu, bir harcama yapanın bir ödenek harcamak için çağırdığı fonksiyondur. Bunun için iki işlem gerekir: harcanan tutarı transfer edin ve ödeneği bu tutar kadar azaltın.

```solidity
    /**
     * @dev Bkz. {IERC20-transferFrom}.
     *
     * Güncellenmiş ödeneği gösteren bir {Approval} olayı yayar. Bu,
     * EIP tarafından gerekli değildir. {ERC20}'nin başındaki nota bakın.
     *
     * Gereklilikler:
     *
     * - `sender` ve `recipient` sıfır adres olamaz.
     * - `sender` en az `amount` bakiyeye sahip olmalıdır.
     * - arayan, ``sender``ın jetonları için en az
     * `amount` kadar ödeneğe sahip olmalıdır.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` fonksiyon çağrısı iki şey yapar. İlk olarak, yeni ödenek olan `a-b` hesabını yapar.
İkincisi, bu sonucun negatif olmadığını kontrol eder. Negatifse, verilen mesajla çağrı geri döner. Bir çağrı geri döndüğünde, o çağrı sırasında daha önce yapılmış herhangi bir işlemin yok sayıldığını ve bu nedenle `_transfer` işlemini geri almamız gerekmediğini unutmayın.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin güvenlik eklemeleri {#openzeppelin-safety-additions}

Sıfırdan farklı bir ödeneği başka bir sıfırdan farklı değere ayarlamak tehlikelidir çünkü yalnızca kendi işlemlerinizin sırasını kontrol edersiniz, başkalarınınkini değil. Saf olan Alice ve dürüst olmayan Bill olmak üzere iki kullanıcınız olduğunu hayal edin. Alice, Bill'den beş jetona mal olduğunu düşündüğü bir hizmet istiyor, bu yüzden Bill'e beş jetonluk bir ödenek veriyor.

Sonra bir şeyler değişir ve Bill'in fiyatı on jetona yükselir. Hâlâ hizmeti isteyen Alice, Bill'in ödeneğini ona ayarlayan bir işlem gönderir. Bill, işlem havuzunda bu yeni işlemi gördüğü anda, Alice'in beş jetonunu harcayan ve çok daha yüksek bir gaz fiyatına sahip olan bir işlem gönderir, böylece işlem daha hızlı kazılır. Bu şekilde Bill, ilk beş jetonu harcayabilir ve ardından, Alice'in yeni ödeneği çıkarıldığında, on beş jetonluk toplam fiyat için, Alice'in yetkilendirmek istediğinden daha fazla olacak şekilde on tane daha harcayabilir. Bu tekniğe [önden çalıştırma](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running) denir

| Alice'in İşlemi                      | Alice Nonce | Bill'in İşlemi                                   | Bill Nonce             | Bill'in Ödeneği | Bill'in Alice'ten Toplam Geliri |
| ------------------------------------ | ----------- | ------------------------------------------------ | ---------------------- | --------------- | ------------------------------- |
| approve(Bill, 5)  | 10          |                                                  |                        | 5               | 0                               |
|                                      |             | transferFrom(Alice, Bill, 5)  | 10.123 | 0               | 5                               |
| approve(Bill, 10) | 11          |                                                  |                        | 10              | 5                               |
|                                      |             | transferFrom(Alice, Bill, 10) | 10.124 | 0               | 15                              |

Bu sorunu önlemek için, bu iki fonksiyon (`increaseAllowance` ve `decreaseAllowance`), ödeneği belirli bir miktarda değiştirmenize olanak tanır. Yani Bill zaten beş jeton harcamışsa, sadece beş tane daha harcayabilecektir. Zamanlamaya bağlı olarak, bunun iki sonucu olabilir ve her ikisinde de Bill yalnızca on jeton alabilir:

A:

| Alice'in İşlemi                               | Alice Nonce | Bill'in İşlemi                                  |             Bill Nonce | Bill'in Ödeneği | Bill'in Alice'ten Toplam Geliri |
| --------------------------------------------- | ----------: | ----------------------------------------------- | ---------------------: | --------------: | ------------------------------- |
| approve(Bill, 5)           |          10 |                                                 |                        |               5 | 0                               |
|                                               |             | transferFrom(Alice, Bill, 5) | 10.123 |               0 | 5                               |
| increaseAllowance(Bill, 5) |          11 |                                                 |                        |         0+5 = 5 | 5                               |
|                                               |             | transferFrom(Alice, Bill, 5) | 10.124 |               0 | 10                              |

B:

| Alice'in İşlemi                               | Alice Nonce | Bill'in İşlemi                                   |             Bill Nonce | Bill'in Ödeneği | Bill'in Alice'ten Toplam Geliri |
| --------------------------------------------- | ----------: | ------------------------------------------------ | ---------------------: | --------------: | ------------------------------: |
| approve(Bill, 5)           |          10 |                                                  |                        |               5 |                               0 |
| increaseAllowance(Bill, 5) |          11 |                                                  |                        |        5+5 = 10 |                               0 |
|                                               |             | transferFrom(Alice, Bill, 10) | 10.124 |               0 |                              10 |

```solidity
    /**
     * @dev Arayan tarafından `spender`'a verilen ödeneği atomik olarak artırır.
     *
     * Bu, {IERC20-approve}'da açıklanan sorunlar için bir azaltma olarak kullanılabilecek
     * {approve}'a bir alternatiftir.
     *
     * Güncellenmiş ödeneği belirten bir {Approval} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `spender` sıfır adres olamaz.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` fonksiyonu güvenli bir toplamadır. `a`+`b`>=`2^256` olması gibi düşük bir ihtimalde, normal toplamanın yaptığı gibi başa dönmez.

```solidity

    /**
     * @dev Arayan tarafından `spender`'a verilen ödeneği atomik olarak azaltır.
     *
     * Bu, {IERC20-approve}'da açıklanan sorunlar için bir azaltma olarak kullanılabilecek
     * {approve}'a bir alternatiftir.
     *
     * Güncellenmiş ödeneği belirten bir {Approval} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `spender` sıfır adres olamaz.
     * - `spender`'ın arayan için en az
     * `subtractedValue` kadar ödeneği olmalıdır.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Jeton Bilgilerini Değiştiren Fonksiyonlar {#functions-that-modify-token-information}

Bunlar asıl işi yapan dört fonksiyondur: `_transfer`, `_mint`, `_burn` ve `_approve`.

#### _transfer fonksiyonu {#_transfer}

```solidity
    /**
     * @dev `sender`'dan `recipient`'a `amount` kadar jeton taşır.
     *
     * Bu dahili fonksiyon {transfer}'a eşdeğerdir ve örneğin
     * otomatik jeton ücretlerini, kesme mekanizmalarını vb. uygulamak için kullanılabilir.
     *
     * Bir {Transfer} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `sender` sıfır adres olamaz.
     * - `recipient` sıfır adres olamaz.
     * - `sender` en az `amount` bakiyeye sahip olmalıdır.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Bu fonksiyon, `_transfer`, jetonları bir hesaptan diğerine aktarır. Hem `transfer` (gönderenin kendi hesabından yapılan transferler için) hem de `transferFrom` (başka birinin hesabından transfer için ödenekleri kullanmak için) tarafından çağrılır.

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
2. [Ondan kalıtım alın](https://www.bitdegree.org/learn/solidity-inheritance) ve yalnızca değiştirmeniz gereken fonksiyonları geçersiz kılın

İkinci yöntem çok daha iyidir çünkü OpenZeppelin ERC-20 kodu zaten denetlenmiş ve güvenli olduğu gösterilmiştir. Kalıtım kullandığınızda, değiştirdiğiniz fonksiyonların ne olduğu açıktır ve sözleşmenize güvenmek için kişilerin yalnızca bu belirli fonksiyonları denetlemesi gerekir.

Jetonlar her el değiştirdiğinde bir fonksiyon gerçekleştirmek genellikle yararlıdır. Ancak,`_transfer` çok önemli bir fonksiyondur ve güvensiz bir şekilde yazılması mümkündür (aşağıya bakın), bu nedenle onu geçersiz kılmamak en iyisidir. Çözüm, bir [kanca fonksiyonu](https://wikipedia.org/wiki/Hooking) olan `_beforeTokenTransfer`'dır. Bu fonksiyonu geçersiz kılabilirsiniz ve her aktarımda çağrılacaktır.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Bunlar aslında aktarımı yapan satırlardır. Aralarında **hiçbir şey** olmadığını ve aktarılan tutarı alıcıya eklemeden önce göndericiden çıkardığımızı unutmayın. Bu önemlidir çünkü ortada farklı bir sözleşmeye çağrı olsaydı, bu sözleşmeyi aldatmak için kullanılabilirdi. Bu şekilde aktarım atomiktir, ortasında hiçbir şey olamaz.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Son olarak, bir `Transfer` olayı yayınlayın. Olaylara akıllı sözleşmelerle erişilemez, ancak blokzincirinin dışında çalışan kod, olayları dinleyebilir ve bunlara tepki verebilir. Örneğin bir cüzdan, sahibinin ne zaman daha fazla jeton aldığını takip edebilir.

#### _mint ve _burn fonksiyonları {#_mint-and-_burn}

Bu iki fonksiyon (`_mint` ve `_burn`), toplam jeton arzını değiştirir.
Bunlar dahili fonksiyonlardır ve bu sözleşmede onları çağıran bir fonksiyon yoktur, bu nedenle yalnızca sözleşmeden kalıtım alırsanız ve hangi koşullar altında yeni jetonlar basacağınıza veya mevcut olanları yakacağınıza karar vermek için kendi mantığınızı eklerseniz kullanışlıdırlar.

**NOT:** Her ERC-20 jetonunun, jeton yönetimini belirleyen kendi iş mantığı vardır.
Örneğin, sabit arza sahip bir sözleşme oluşturucusunda yalnızca `_mint`'i çağırabilir ve `_burn`'ü asla çağırmayabilir. Jeton satan bir sözleşme, ödeme yapıldığında `_mint`'i çağırır ve muhtemelen bir noktada enflasyonun kontrolden çıkmasını önlemek için `_burn`'ü çağırır.

```solidity
    /** @dev `amount` kadar jeton oluşturur ve bunları `account`a atayarak
     * toplam arzı artırır.
     *
     * `from` sıfır adrese ayarlanmış bir {Transfer} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `to` sıfır adres olamaz.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Toplam jeton sayısı değiştiğinde `_totalSupply`'ı güncellediğinizden emin olun.

&nbsp;

```solidity
    /**
     * @dev `account`tan `amount` kadar jetonu yok ederek toplam
     * arzı azaltır.
     *
     * `to` sıfır adrese ayarlanmış bir {Transfer} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `account` sıfır adres olamaz.
     * - `account` en az `amount` kadar jetona sahip olmalıdır.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` fonksiyonu, ters yönde çalışması dışında `_mint` ile neredeyse aynıdır.

#### _approve fonksiyonu {#_approve}

Bu, ödenekleri gerçekten belirten fonksiyondur. Sahibinin, kendi mevcut bakiyesinden daha yüksek bir ödenek belirlemesine izin verdiğini unutmayın. Bu sorun değil çünkü bakiye, ödenek oluşturulduğundaki bakiyeden farklı olabileceği için transfer sırasında kontrol edilir.

```solidity
    /**
     * @dev `owner`ın jetonları üzerinde `spender`ın ödeneği olarak `amount`u ayarlar.
     *
     * Bu dahili fonksiyon `approve`a eşdeğerdir ve örneğin
     * belirli alt sistemler için otomatik ödenekler ayarlamak için kullanılabilir.
     *
     * Bir {Approval} olayı yayar.
     *
     * Gereklilikler:
     *
     * - `owner` sıfır adres olamaz.
     * - `spender` sıfır adres olamaz.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Bir `Approval` olayı yayınlayın. Uygulamanın nasıl yazıldığına bağlı olarak, harcayan sözleşmeye onay hakkında ya sahibi tarafından ya da bu olayları dinleyen bir sunucu tarafından bilgi verilebilir.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Ondalık Değişkenini Değiştir {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals}'i varsayılan 18 değerinden başka bir değere ayarlar.
     *
     * UYARI: Bu fonksiyon yalnızca oluşturucudan çağrılmalıdır. Jeton
     * sözleşmeleriyle etkileşimde bulunan çoğu uygulama
     * {decimals}'in hiç değişmesini beklemez ve değişirse yanlış çalışabilir.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Bu fonksiyon, kullanıcı arayüzlerine miktarın nasıl yorumlanacağını söylemek için kullanılan `_decimals` değişkenini değiştirir.
Bunu oluşturucudan çağırmalısınız. Daha sonraki herhangi bir noktada onu çağırmak sahtekârlık olur ve uygulamalar bununla başa çıkmak için tasarlanmamıştır.

### Kancalar {#hooks}

```solidity

    /**
     * @dev Herhangi bir jeton transferinden önce çağrılan kanca. Bu,
     * basmayı ve yakmayı içerir.
     *
     * Çağırma koşulları:
     *
     * - `from` ve `to` ikisi de sıfır değilken, ``from``'un jetonlarından `amount`
     * kadarı `to`'ya transfer edilir.
     * - `from` sıfırken, `to` için `amount` kadar jeton basılır.
     * - `to` sıfırken, ``from``'un jetonlarından `amount` kadarı yakılır.
     * - `from` ve `to` ikisi de asla sıfır olmaz.
     *
     * Kancalar hakkında daha fazla bilgi edinmek için şuraya gidin: xref:ROOT:extending-contracts.adoc#using-hooks[Kancaları Kullanma].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Bu, aktarımlar sırasında çağrılacak kanca fonksiyonudur. Bu örnekte kanca fonksiyonu boş ancak ihtiyaç duyarsanız fonksiyon içeriğini doldurabilirsiniz.

## Sonuç {#conclusion}

İnceleme için, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır (bana göre, sizinki farklılık gösterebilir):

- _Blokzincirde sır yoktur_. Bir akıllı sözleşmenin erişebileceği herhangi bir bilgi tüm dünya tarafından kullanılabilir.
- Kendi işlemlerinizin sırasını kontrol edebilirsiniz, ancak diğer kişilerin işlemlerinin ne zaman gerçekleşeceğini kontrol edemezsiniz. Bu, bir ödeneği değiştirmenin tehlikeli olabilmesinin nedenidir, çünkü harcayanın her iki ödeneğin toplamını harcamasına izin verir.
- `uint256` türündeki değerler başa döner. Başka bir deyişle, _0-1=2^256-1_. Bu istenen davranış değilse, bunu kontrol etmeniz (veya sizin için yapan SafeMath kütüphanesini kullanmanız) gerekir. Bunun [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)'da değiştiğini unutmayın.
- Belirli bir türdeki tüm durum değişikliklerini belirli bir yerde yapın, çünkü bu denetimi kolaylaştırır.
  Örneğin, `approve`, `transferFrom`, `increaseAllowance` ve `decreaseAllowance` tarafından çağrılan `_approve` fonksiyonuna sahip olmamızın nedeni budur.
- Durum değişiklikleri, aralarında başka bir eylem olmaksızın atomik olmalıdır (`_transfer`'da görebileceğiniz gibi). Bunun nedeni, durum değişikliği sırasında tutarsız bir duruma sahip olmanızdır. Örneğin, gönderenin bakiyesinden düşüldüğü zaman ile alıcının bakiyesine eklendiği zaman arasında, var olması gerekenden daha az jeton bulunur. Aralarında işlemler, özellikle farklı bir sözleşmeye yapılan çağrılar varsa, bu potansiyel olarak kötüye kullanılabilir.

Artık OpenZeppelin ERC-20 sözleşmesinin nasıl yazıldığını ve özellikle nasıl daha güvenli hâle getirildiğini gördüğünüze göre, gidin ve kendi güvenli sözleşmelerinizi ve uygulamalarınızı yazın.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
