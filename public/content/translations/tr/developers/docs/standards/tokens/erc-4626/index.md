---
title: EIP-4626 Tokenize edilmiş Kasa Standardı
description: Verim taşıyan kasalar için bir standart.
lang: tr
---

## Giriş {#introduction}

ERC-4626, verim sağlayan kasaların teknik parametrelerini optimize etmek ve birleştirmek için bir standarttır. Tek bir temel ERC-20 tokeninin paylarını temsil eden tokenleştirilmiş getiri taşıyan kasalar için standart bir API sağlar. ERC-4626 ayrıca, ERC-20'yi kullanan tokenize edilmiş kasalar için isteğe bağlı bir uzantının ana hatlarını verir ve token yatırmak, çekmek ve bakiyeleri okumak için temel işlevler sunar.

**ERC-4626'nın verim sağlayan kasalardaki rolü**

Borç veren piyasalar, toplayıcılar ve özünde faiz getiren tokenler, kullanıcıların farklı stratejiler uygulayarak kripto tokenlerinde en iyi verimi bulmalarına yardımcı olur. Bu stratejiler, hataya açık olabilecek veya geliştirme kaynaklarını boşa harcayabilecek küçük değişikliklerle yapılır.

Verim-taşıyan para kasalarındaki ERC-4626, daha tutarlı ve sağlam uygulama kalıpları oluşturarak geliştiricilerin çok az özel çabası ile entegrasyon çabasını azaltacak ve çeşitli uygulamalarda verime erişimin kilidini açacaktır.

ERC-4626 token'ı, [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)'te tam olarak açıklanmıştır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce [token standartları](/developers/docs/standards/tokens/) ve [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında okumanızı öneririz.

## ERC-4626 Fonksiyonları ve Özellikleri: {#body}

### Yöntemler {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Bu fonksiyon; muhasebe, yatırma ve çekme kasası için kullanılan temel jetonun adresini döndürür.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Bu fonksiyon, kasa tarafından tutulan temel varlıkların toplam miktarını döndürür.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Bu fonksiyon, sağlanan `assets` miktarı için olan kasa tarafından takas edilen `shares` miktarını döndürür.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Bu fonksiyon, sağlanan `shares` miktarı için olan kasa tarafından takas edilen `assets` miktarını döndürür.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Bu fonksiyon, `receiver` tarafından yapılan tek bir [`deposit`](#deposit) çağrısında yatırılabilecek temel varlıkların maksimum miktarını döndürür.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Bu fonksiyon, kullanıcıların güncel bloktaki yatırma etkilerini simüle etmelerini sağlar.

#### mevduat {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Bu fonksiyon, temel jetonların `assets`'ini kasaya yatırır ve `shares` mülkiyetini `receiver`'a verir.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Bu fonksiyon, `receiver` tarafından yapılan tek bir [`mint`](#mint) çağrısında basılabilecek payların maksimum miktarını döndürür.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Bu fonksiyon, kullanıcıların güncel bloktaki basma etkilerini simüle etmelerini sağlar.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Bu fonksiyon, temel jetonların `assets`'ini yatırarak `receiver`'a tam olarak `shares` kasa payı basar.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Bu fonksiyon, `owner` bakiyesinden tek bir [`withdraw`](#withdraw) çağrısıyla çekilebilecek maksimum temel varlık miktarını döndürür.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Bu fonksiyon, kullanıcıların güncel bloktaki çekme etkilerini simüle etmelerini sağlar.

#### para çek {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Bu fonksiyon, `owner`'dan `shares` yakar ve kasadan `receiver`'a tam olarak `assets` jeton gönderir.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Bu fonksiyon, [`redeem`](#redeem) çağrısı ile `owner` bakiyesinden geri alınabilecek maksimum pay miktarını döndürür.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Bu fonksiyon, kullanıcıların güncel bloktaki geri alma etkilerini simüle etmelerini sağlar.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Bu fonksiyon, `owner`'dan spesifik sayıda `shares`'i geri alır ve kasadaki temel jetonun `assets`'ini `receiver`'a gönderir.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Dolaşımdaki geri alınmamış kasa paylarının toplam sayısını verir.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`'ın güncel olarak sahip olduğu toplam kasa payı miktarını döndürür.

### Arayüzün haritası {#mapOfTheInterface}

![ERC-4626 arayüzünün haritası](./map-of-erc-4626.png)

### Etkinlikler {#events}

#### Yatırma Olayları

Jetonlar kasaya [`mint`](#mint) ve [`deposit`](#deposit) yöntemleri aracılığıyla yatırıldığında çıkarılmış olmak **ZORUNDADIR**

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

`sender`'ın, `shares` için `assets` takası yapan ve söz konusu `shares`'i `owner`'a transfer eden kullanıcı olduğu durumlarda.

#### Çekim Olayı

Paylar kasadan [`redeem`](#redeem) veya [`withdraw`](#withdraw) yöntemlerinde bir yatıran tarafından çekildiğinde çıkarılmış olmak **ZORUNDADIR**.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

`sender`'ın çekimi tetikleyen ve `assets` için `owner`'ın sahip olduğu `shares`'i takas eden kullanıcı olduğu durumlarda. `receiver`, çekilmiş `assets`'i alan kullanıcıdır.

## Daha fazla okuma {#further-reading}

- [EIP-4626: Tokenize edilmiş kasa Standartı](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Deposu](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
