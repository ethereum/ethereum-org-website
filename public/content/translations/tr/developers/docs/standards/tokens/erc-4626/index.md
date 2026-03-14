---
title: "EIP-4626 Tokenize edilmiş Kasa Standardı"
description: "Verim taşıyan kasalar için bir standart."
lang: tr
---

## Giriş {#introduction}

ERC-4626, verim sağlayan kasaların teknik parametrelerini optimize etmek ve birleştirmek için bir standarttır. Tek bir temel ERC-20 tokeninin paylarını temsil eden tokenleştirilmiş getiri taşıyan kasalar için standart bir API sağlar. ERC-4626 ayrıca, ERC-20'yi kullanan tokenize edilmiş kasalar için isteğe bağlı bir uzantının ana hatlarını verir ve token yatırmak, çekmek ve bakiyeleri okumak için temel işlevler sunar.

**ERC-4626'nın verim sağlayan kasalardaki rolü**

Borç veren piyasalar, toplayıcılar ve özünde faiz getiren tokenler, kullanıcıların farklı stratejiler uygulayarak kripto tokenlerinde en iyi verimi bulmalarına yardımcı olur. Bu stratejiler, hataya açık olabilecek veya geliştirme kaynaklarını boşa harcayabilecek küçük değişikliklerle yapılır.

Verim-taşıyan para kasalarındaki ERC-4626, daha tutarlı ve sağlam uygulama kalıpları oluşturarak geliştiricilerin çok az özel çabası ile entegrasyon çabasını azaltacak ve çeşitli uygulamalarda verime erişimin kilidini açacaktır.

ERC-4626 jetonu, [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) içinde tamamen açıklanmıştır.

**Eşzamansız kasa uzantısı (ERC-7540)**

ERC-4626, bir sınıra kadar atomik para yatırma ve geri alma işlemleri için optimize edilmiştir. Limite ulaşılırsa yeni para yatırma veya geri alma işlemi gönderilemez. Bu sınırlama, Kasa ile arabirim oluşturmak için bir ön koşul olarak eşzamansız eylemleri veya gecikmeleri olan herhangi bir akıllı sözleşme sistemi için (ör. gerçek dünya varlık protokolleri, teminatsız borç verme protokolleri, zincirler arası borç verme protokolleri, likit hisseleme jetonları veya sigorta güvenlik modülleri) iyi çalışmaz.

ERC-7540, ERC-4626 Kasalarının faydasını eşzamansız kullanım durumları için genişletir. Mevcut Kasa arayüzü (`deposit`/`withdraw`/`mint`/`redeem`), eşzamansız İstekleri talep etmek için tam olarak kullanılır.

ERC-7540 uzantısı, [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) içinde tamamen açıklanmıştır.

**Çoklu varlık kasası uzantısı (ERC-7575)**

ERC-4626 tarafından desteklenmeyen eksik bir kullanım durumu, likidite sağlayıcı (LP) Jetonları gibi birden fazla varlığa veya giriş noktasına sahip olan Kasalardır. Bunlar, ERC-4626'nın kendisinin bir ERC-20 olması gerekliliği nedeniyle genellikle kullanışsız veya uyumsuzdur.

ERC-7575, ERC-20 jeton uygulamasını ERC-4626 uygulamasından harici hale getirerek birden çok varlığa sahip Kasalar için destek ekler.

ERC-7575 uzantısı, [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) içinde tamamen açıklanmıştır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce [jeton standartları](/developers/docs/standards/tokens/) ve [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında bilgi edinmenizi öneririz.

## ERC-4626 Fonksiyonları ve Özellikleri: {#body}

### Yöntemler {#methods}

#### varlık {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Bu fonksiyon; muhasebe, yatırma ve çekme kasası için kullanılan temel jetonun adresini döndürür.

#### toplamVarlıklar {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Bu fonksiyon, kasa tarafından tutulan temel varlıkların toplam miktarını döndürür.

#### paylaraDönüştür {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Bu işlev, sağlanan `assets` tutarı karşılığında kasa tarafından değiştirilecek `shares` tutarını döndürür.

#### varlıklaraDönüştür {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Bu işlev, sağlanan `shares` tutarı karşılığında kasa tarafından değiştirilecek `assets` tutarını döndürür.

#### maksimumYatırma {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Bu işlev, `receiver` için basılan paylarla tek bir [`deposit`](#deposit) çağrısında yatırılabilecek maksimum dayanak varlık miktarını döndürür.

#### yatırmaÖnizlemesi {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Bu fonksiyon, kullanıcıların güncel bloktaki yatırma etkilerini simüle etmelerini sağlar.

#### yatırma {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Bu işlev, dayanak jetonların `assets` tutarını kasaya yatırır ve `shares` mülkiyetini `receiver`'a verir.

#### maksimumBasım {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Bu işlev, `receiver` için basılan paylarla tek bir [`mint`](#mint) çağrısında basılabilecek maksimum pay miktarını döndürür.

#### basımÖnizlemesi {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Bu fonksiyon, kullanıcıların güncel bloktaki basma etkilerini simüle etmelerini sağlar.

#### basım {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Bu işlev, dayanak jetonların `assets` tutarını yatırarak `receiver`'a tam olarak `shares` kasa payı basar.

#### maksimumÇekme {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Bu işlev, tek bir [`withdraw`](#withdraw) çağrısıyla `owner` bakiyesinden çekilebilecek maksimum dayanak varlık miktarını döndürür.

#### çekimÖnizlemesi {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Bu fonksiyon, kullanıcıların güncel bloktaki çekme etkilerini simüle etmelerini sağlar.

#### çekme {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Bu işlev, `owner`dan `shares` yakar ve kasadan `receiver`a tam olarak `assets` jeton gönderir.

#### maksimumGeriAlma {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Bu işlev, bir [`redeem`](#redeem) çağrısı aracılığıyla `owner` bakiyesinden geri alınabilecek maksimum pay miktarını döndürür.

#### geriAlmaÖnizlemesi {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Bu fonksiyon, kullanıcıların güncel bloktaki geri alma etkilerini simüle etmelerini sağlar.

#### geriAlma {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Bu işlev, `owner`dan belirli sayıda `shares` geri alır ve kasadaki dayanak jetonun `assets` tutarını `receiver`a gönderir.

#### toplamArz {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Dolaşımdaki geri alınmamış kasa paylarının toplam sayısını verir.

#### bakiye {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`ın şu anda sahip olduğu toplam kasa payı miktarını döndürür.

### Arayüz haritası {#mapOfTheInterface}

![ERC-4626 arayüzünün haritası](./map-of-erc-4626.png)

### Olaylar {#events}

#### Yatırma Olayları

Jetonlar, [`mint`](#mint) ve [`deposit`](#deposit) yöntemleriyle kasaya yatırıldığında **KESİNLİKLE** yayınlanmalıdır.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Burada `sender`, `assets`'i `shares` ile takas eden ve bu `shares`'i `owner`'a aktaran kullanıcıdır.

#### Çekim Olayı

Paylar, bir mevduat sahibi tarafından [`redeem`](#redeem) veya [`withdraw`](#withdraw) yöntemlerinde kasadan çekildiğinde **KESİNLİKLE** yayınlanmalıdır.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Burada `sender`, çekme işlemini tetikleyen ve `owner`'ın sahip olduğu `shares`'i `assets` ile takas eden kullanıcıdır. `receiver`, çekilen `assets`'i alan kullanıcıdır.

## Daha fazla kaynak {#further-reading}

- [EIP-4626: Jetonlaştırılmış Kasa Standardı](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Deposu](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
