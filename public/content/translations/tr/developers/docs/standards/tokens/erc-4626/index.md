---
title: ERC-4626 Tokenleştirilmiş Kasa Standardı
description: Getiri sağlayan kasalar için bir standart.
lang: tr
---

## Giriş {#introduction}

ERC-4626, getiri sağlayan kasaların teknik parametrelerini optimize etmek ve birleştirmek için bir standarttır. Tek bir dayanak ERC-20 tokeninin paylarını temsil eden tokenleştirilmiş getiri sağlayan kasalar için standart bir API sağlar. ERC-4626 ayrıca, ERC-20 kullanan tokenleştirilmiş kasalar için isteğe bağlı bir uzantının ana hatlarını çizerek token yatırma, çekim yapma ve bakiyeleri okuma gibi temel işlevler sunar.

**Getiri sağlayan kasalarda ERC-4626'nın rolü**

Borç verme piyasaları, toplayıcılar ve doğası gereği faiz getiren tokenler, farklı stratejiler yürüterek kullanıcıların kripto tokenlerinde en iyi getiriyi bulmalarına yardımcı olur. Bu stratejiler, hataya açık olabilen veya geliştirme kaynaklarını boşa harcayabilen küçük farklılıklarla yapılır.

Getiri sağlayan kasalardaki ERC-4626, daha tutarlı ve sağlam uygulama kalıpları oluşturarak entegrasyon çabasını azaltacak ve geliştiricilerin çok az özel çabasıyla çeşitli uygulamalarda getiriye erişimin kilidini açacaktır.

ERC-4626 tokeni, [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) içinde tam olarak açıklanmıştır.

**Asenkron kasa uzantısı (ERC-7540)**

ERC-4626, belirli bir sınıra kadar atomik para yatırma ve itfa işlemleri için optimize edilmiştir. Sınıra ulaşılırsa, yeni para yatırma veya itfa işlemleri gönderilemez. Bu sınırlama, Kasa ile arayüz oluşturmak için bir ön koşul olarak asenkron eylemlere veya gecikmelere sahip herhangi bir akıllı sözleşme sistemi için iyi çalışmaz (örneğin, gerçek dünya varlık protokolleri, eksik teminatlandırılmış borç verme protokolleri, zincirler arası borç verme protokolleri, likit staking tokenleri veya sigorta güvenlik modülleri).

ERC-7540, asenkron kullanım durumları için ERC-4626 Kasalarının faydasını genişletir. Mevcut Kasa arayüzü (`deposit`/`withdraw`/`mint`/`redeem`), asenkron İstekleri talep etmek için tam olarak kullanılır.

ERC-7540 uzantısı, [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) içinde tam olarak açıklanmıştır.

**Çoklu varlık kasa uzantısı (ERC-7575)**

ERC-4626 tarafından desteklenmeyen eksik bir kullanım durumu, likidite sağlayıcı (LP) Tokenleri gibi birden fazla varlığa veya giriş noktasına sahip Kasalardır. Bunlar, ERC-4626'nın kendisinin bir ERC-20 olması gerekliliği nedeniyle genellikle kullanışsızdır veya uyumlu değildir.

ERC-7575, ERC-20 token uygulamasını ERC-4626 uygulamasından dışsallaştırarak birden fazla varlığa sahip Kasalar için destek ekler.

ERC-7575 uzantısı, [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) içinde tam olarak açıklanmıştır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [token standartları](/developers/docs/standards/tokens/) ve [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında okumanızı öneririz.

## ERC-4626 İşlevleri ve Özellikleri: {#body}

### Yöntemler {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Bu işlev, muhasebe, para yatırma ve çekim işlemleri için kasa için kullanılan dayanak tokenin adresini döndürür.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Bu işlev, kasa tarafından tutulan dayanak varlıkların toplam miktarını döndürür.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Bu işlev, sağlanan `assets` miktarı karşılığında kasa tarafından takas edilecek `shares` miktarını döndürür.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Bu işlev, sağlanan `shares` miktarı karşılığında kasa tarafından takas edilecek `assets` miktarını döndürür.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Bu işlev, `receiver` için basılan paylarla birlikte tek bir [`deposit`](#deposit) çağrısında yatırılabilecek maksimum dayanak varlık miktarını döndürür.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Bu işlev, kullanıcıların mevcut blokta para yatırma işlemlerinin etkilerini simüle etmelerine olanak tanır.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Bu işlev, kasaya `assets` miktarında dayanak token yatırır ve `shares` mülkiyetini `receiver` adresine verir.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Bu işlev, `receiver` için basılan paylarla birlikte tek bir [`mint`](#mint) çağrısında basılabilecek maksimum pay miktarını döndürür.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Bu işlev, kullanıcıların mevcut blokta basım işlemlerinin etkilerini simüle etmelerine olanak tanır.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Bu işlev, `assets` miktarında dayanak token yatırarak `receiver` adresine tam olarak `shares` kasa payı basar.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Bu işlev, tek bir [`withdraw`](#withdraw) çağrısı ile `owner` bakiyesinden çekilebilecek maksimum dayanak varlık miktarını döndürür.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Bu işlev, kullanıcıların mevcut blokta çekim işlemlerinin etkilerini simüle etmelerine olanak tanır.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Bu işlev, `owner` adresinden `shares` yakar ve kasadan `receiver` adresine tam olarak `assets` token gönderir.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Bu işlev, bir [`redeem`](#redeem) çağrısı aracılığıyla `owner` bakiyesinden itfa edilebilecek maksimum pay miktarını döndürür.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Bu işlev, kullanıcıların mevcut blokta itfa işlemlerinin etkilerini simüle etmelerine olanak tanır.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Bu işlev, `owner` adresinden belirli bir sayıda `shares` itfa eder ve kasadan `receiver` adresine `assets` miktarında dayanak token gönderir.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Dolaşımdaki itfa edilmemiş toplam kasa payı sayısını döndürür.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` adresinin şu anda sahip olduğu toplam kasa payı miktarını döndürür.

### Arayüz haritası {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Olaylar {#events}

#### Deposit Olayı {#deposit-event}

Tokenler [`mint`](#mint) ve [`deposit`](#deposit) yöntemleri aracılığıyla kasaya yatırıldığında **YAYINLANMALIDIR**.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Burada `sender`, `assets` miktarını `shares` ile takas eden ve bu `shares` miktarını `owner` adresine transfer eden kullanıcıdır.

#### Withdraw Olayı {#withdraw-event}

Paylar, bir yatırıcı tarafından [`redeem`](#redeem) veya [`withdraw`](#withdraw) yöntemlerinde kasadan çekildiğinde **YAYINLANMALIDIR**.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Burada `sender`, çekim işlemini tetikleyen ve `owner` adresine ait olan `shares` miktarını `assets` ile takas eden kullanıcıdır. `receiver`, çekilen `assets` miktarını alan kullanıcıdır.

## Daha fazla bilgi {#further-reading}

- [EIP-4626: Tokenleştirilmiş Kasa Standardı](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Deposu](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)