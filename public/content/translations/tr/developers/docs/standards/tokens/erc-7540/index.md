---
title: ERC-7540 Asenkron Tokenleştirilmiş Kasa Standardı
description: Tokenleştirilmiş kasalar için asenkron yatırma ve itfa akışları ekleyen bir ERC-4626 uzantısı.
lang: tr
---

## Giriş {#introduction}

ERC-7540, asenkron yatırma ve itfa akışları için destek ekleyerek [ERC-4626 Tokenleştirilmiş Kasa Standardını](/developers/docs/standards/tokens/erc-4626/) genişletir. Bir istek-sonra-talep modeli sunar: kullanıcılar önce bir istek gönderir (varlıklarını veya paylarını kilitleyerek), ardından kasa bunu işledikten sonra sonucu talep ederler.

Bu, bir kasa tek bir işlemde anında uzlaşma sağlayamadığında gereklidir, örneğin:

- Tokenleştirilmiş hazineler, özel krediler ve T+1 veya T+2 uzlaşma döngülerine sahip diğer varlıklar gibi gerçek dünya varlıkları (RWA) protokolleri
- Kredi değerlendirmelerinin zincir dışı gerçekleştiği eksik teminatlandırılmış borç verme
- Köprülemenin gecikmelere yol açtığı zincirler arası kasa stratejileri
- Kilit açma süreleri olan likit staking tokenleri (LST)

Kasalar yalnızca yatırma işlemlerinde, yalnızca itfa işlemlerinde veya her ikisinde asenkron olmayı seçebilir. Bu esneklik, kasa geliştiricilerinin asenkron akışları yalnızca temel strateji gerektirdiğinde eklemesine olanak tanırken, diğer tarafı senkron tutar.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [token standartları](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) ve [ERC-4626](/developers/docs/standards/tokens/erc-4626/) hakkında okumanızı öneririz.

## ERC-4626 ve ERC-7540 Karşılaştırması {#comparison}

ERC-4626'da bir yatırma işlemi atomik olarak uzlaşır: yatırımcı varlıkları gönderir ve tek bir işlemde paylarını geri alır.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 bunu iki adıma ayırır. Yatırımcı önce varlıkları kilitlemek için `requestDeposit()` çağrısı yapar, ardından kasa yöneticisinin isteği işlemesini bekler. Yerine getirildiğinde, yatırımcı paylarını talep etmek için `deposit()` çağrısı yapar. Döviz kurları istek anında değil, yerine getirilme anında belirlenir.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

İtfa akışı da aynı şekilde çalışır: `requestRedeem()` payları kilitler ve yerine getirildiğinde yatırımcı varlıkları talep etmek için `redeem()` çağrısı yapar.

## ERC-7540 Fonksiyonları ve Özellikleri {#body}

ERC-7540, tam ERC-4626 arayüzünü devralır ancak `deposit`/`mint`/`withdraw`/`redeem` fonksiyonlarını talep fonksiyonları olarak yeniden amaçlandırır. Yeni `requestDeposit` ve `requestRedeem` fonksiyonları ilk istek adımını yönetir.

Her istek üç durumdan geçer: beklemede (gönderildi, işlenmeyi bekliyor), talep edilebilir (yerine getirildi ve fiyatlandırıldı) ve talep edildi (yatırımcı paylarını veya varlıklarını aldı).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Yatırma isteği akışı {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` adresinden kasaya `assets` transfer eder ve yatırma isteği gönderir. `controller` adresi isteğin kontrolünü alır. İstek grubunu tanımlayan bir `requestId` döndürür.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Belirtilen `controller` ve `requestId` için beklemede olan (henüz talep edilebilir olmayan) bir yatırma isteğindeki `assets` miktarını döndürür.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Belirtilen `controller` ve `requestId` için talep edilebilir (yerine getirilmiş ancak henüz talep edilmemiş) bir yatırma isteğindeki `assets` miktarını döndürür.

#### Yatırmaları talep etme {#claiming-deposits}

Bir yatırma isteği talep edilebilir hale geldiğinde, kullanıcı paylarını talep etmek için standart ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) veya [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) fonksiyonunu çağırır. ERC-7540'ta bu fonksiyonlar artık varlık transfer etmez (bu zaten istek anında gerçekleşmiştir). Sadece alıcıya pay basarlar.

### İtfa isteği akışı {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` adresinden `shares` kilitler ve itfa isteği gönderir. `controller` adresi isteğin kontrolünü alır.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Belirtilen `controller` ve `requestId` için beklemede olan bir itfa isteğindeki `shares` miktarını döndürür.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Belirtilen `controller` ve `requestId` için talep edilebilir bir itfa isteğindeki `shares` miktarını döndürür.

#### İtfaları talep etme {#claiming-redemptions}

Bir itfa isteği talep edilebilir hale geldiğinde, kullanıcı varlıklarını talep etmek için standart ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) veya [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) fonksiyonunu çağırır.

### Operatör yönetimi {#operator-management}

ERC-7540, üçüncü tarafların bir kullanıcı adına istekleri yönetmesine olanak tanıyan bir operatör modeli ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)'dan) içerir.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Yatırma/itfa istekleri ve talepleri için `msg.sender` adına hareket etmesi için `operator` adresini onaylar veya iptal eder.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`operator` adresinin `controller` adına hareket etmesinin onaylanıp onaylanmadığını döndürür.

### İstek Kimlikleri {#request-ids}

İstek kimlikleri, farklı istek gruplarını birbirinden ayırır. Aynı `requestId` değerini paylaşan tüm istekler mislidir: durumlar arasında birlikte geçiş yaparlar ve aynı döviz kurunu alırlar.

Bir kasa tüm istekler için `requestId = 0` döndürdüğünde, yalnızca `controller` adresi istek durumunu ayırt eder. Aynı denetleyiciden gelen birden fazla istek birleştirilir.

### Olaylar {#events}

#### DepositRequest Olayı {#depositrequest-event}

Bir yatırma isteği [`requestDeposit`](#requestdeposit) aracılığıyla gönderildiğinde yayınlanmalıdır.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest Olayı {#redeemrequest-event}

Bir itfa isteği [`requestRedeem`](#requestredeem) aracılığıyla gönderildiğinde yayınlanmalıdır.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet Olayı {#operatorset-event}

Bir operatör [`setOperator`](#setoperator) aracılığıyla onaylandığında veya iptal edildiğinde yayınlanmalıdır.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Önizleme fonksiyonları {#preview-functions}

Önizleme fonksiyonları yalnızca asenkron olan akışlar için geri almalıdır, çünkü döviz kuru istek yerine getirilene kadar bilinmez. Asenkron yatırmalı bir kasada, `previewDeposit` ve `previewMint` geri almalıdır, `previewRedeem` ve `previewWithdraw` ise ERC-4626'daki gibi çalışmaya devam eder (ve asenkron itfalı bir kasa için tam tersi). Bu, ERC-4626'dan önemli bir davranışsal farktır.

## Daha fazla bilgi {#further-reading}

- [EIP-7540: Asenkron ERC-4626 Tokenleştirilmiş Kasalar](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Tokenleştirilmiş Kasa Standardı](https://eips.ethereum.org/EIPS/eip-4626)
- [OpenZeppelin ERC-7540 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)