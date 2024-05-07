---
title: ERC-4626 Tokenizált értékmegőrzőre vonatkozó szabvány
description: A hozamtartó értékmegőrzőkre vonatkozó szabvány.
lang: hu
---

## Bevezetés {#introduction}

Az ERC-4626 szabvány a hozamtartó értékmegőrzők műszaki paramétereinek optimalizálására és egységesítésére szolgál. Egy szabványos API-t biztosít ezen tokenizált értékmegőrzőkhöz, amelyek egyetlen, alapul szolgáló ERC-20 token részvényeit képviselik. Az ERC-4626 egy opcionális kiterjesztést is körvonalaz az ERC-20-at használó tokenizált értékmegőrzők számára, amely alapvető funkciókat kínál a tokenek letétbe helyezéséhez, kivonásához és az egyenlegek leolvasásához.

**Az ERC-4626 szerepe a hozamtartó értékmegőrzőkben**

A hitelpiacok, az aggregátorok és a kamatozó tokenek segítenek a felhasználóknak különböző stratégiák végrehajtásával megtalálni a legjobb hozamot a kriptotokenjeikre. Ezek a stratégiák enyhe eltérésekkel kerülhetnek végrehajtásra, ami hibás lehet, vagy pazarolja a fejlesztési erőforrásokat.

Az ERC-4626 a hozamtartó értékmegőrzőkben csökkenti az integrációs erőfeszítéseket, és a konzisztensebb és robusztusabb végrehajtási minták létrehozásával a fejlesztők kis mértékű speciális erőfeszítései mellett lehetővé teszi a hozamhoz való hozzáférést a különböző alkalmazásokban.

Az ERC-4626 token teljes körű leírását az [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) tartalmazza.

## Előfeltételek {#prerequisites}

Az oldal könnyebben megértéséhez javasoljuk, hogy tekintse át a [Tokenszabványok](/developers/docs/standards/tokens/) és az [ERC-20](/developers/docs/standards/tokens/erc-20/) című cikkeket.

## ERC-4626 funkciók és jellemzők: {#body}

### Metódusok {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address)
```

Ez a függvény visszaadja az értékmegőrzőben a könyveléshez, befizetéshez és kivonáshoz használt token címét.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Ez a függvény az értékmegőrzőben lévő fedezeti eszközök teljes összegét adja vissza.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Ez a függvény visszaadja a részvények (`shares`) mennyiségét, amelyet az értékmegőrző a megadott eszközök (`assets`) mennyiségéért cserélne.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Ez a függvény visszaadja az eszközök (`assets`) mennyiségét, amelyet az értékmegőrző a megadott részvények (`shares`) mennyiségéért cserélne.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256)
```

Ez a függvény a `receiver` által egyetlen [`deposit`](#deposit) hívással letétbe helyezhető fedezeti eszközök maximális összegét adja vissza.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256)
```

Ez a függvény lehetővé teszi a felhasználók számára, hogy szimulálják a betétük hatásait az aktuális blokkban.

#### letét {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Ez a függvény a mögöttes tokenek eszközeit (`assets`) helyezi el az értékmegőrzőben, és a részvények (`shares`) tulajdonjogát a fogadónak (`receiver`) adja.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256)
```

Ez a függvény visszaadja a `receiver` által egyetlen [`mint`](#mint) hívással kiadható részvények maximális mennyiségét.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256)
```

Ez a függvény lehetővé teszi a felhasználók számára, hogy szimulálják a mintelés hatásait az aktuális blokkban.

#### kibocsátás (mint) {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Ez a függvény pontosan `shares` értékmegőrzői részvényeket ad ki a fogadónak (`receiver`) az alapul szolgáló tokenek eszközeinek (`assets`) letétbe helyezésével.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256)
```

Ez a függvény az `owner` egyenlegéből egyetlen [`withdraw`](#withdraw) hívással kivehető fedezeti eszközök maximális összegét adja vissza.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256)
```

Ez a függvény lehetővé teszi a felhasználók számára, hogy szimulálják a kivonásuk hatásait az aktuális blokkban.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Ez a függvény részvény (`shares`) elégetését végzi a tulajdonostól (`owner`), és pontosan ennyi `shares` tokent küld az értékmegőrzőből a fogadónak (`receiver`).

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256)
```

Ez a függvény visszaadja az `owner` egyenlegéből [`redeem`](#redeem) hívással visszaváltható részvények maximális mennyiségét.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256)
```

Ez a függvény lehetővé teszi a felhasználók számára, hogy szimulálják a beváltásuk hatásait az aktuális blokkban.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Ez a függvény meghatározott számú részvényt (`shares`) vált be a tulajdonostól (`owner`), és elküldi a mögöttes token eszközöket (`assets`) az értékmegőrzőből a fogadónak (`receiver`).

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Visszaadja a forgalomban lévő, be nem váltott értékmegőrző-részvények teljes számát.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Visszaadja az `owner` által jelenleg birtokolt értékmegőrző-részvények teljes mennyiségét.

### Események {#events}

#### Letétbe helyezési esemény

Akkor **KELL** kiadni, amikor tokeneket helyeznek el az értékmegőrzőben a [`mint`](#mint) és a [`deposit`](#deposit) metódusokon keresztül

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Ahol a küldő (`sender`) az a felhasználó, aki eszközöket (`assets`) cserélt részvényre (`shares`), és átadta ezeket a részvényeket (`shares`) a tulajdonosnak (`owner`).

#### Kivonási esemény

Ki **KELL** adni, amikor a letétes a [`redeem`](#redeem) vagy [`withdraw`](#withdraw) módon részvényeket vesz ki az értékmegőrzőből.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 share
)
```

Ahol a küldő (`sender`) az a felhasználó, aki a kivonást kezdeményezte és a tulajdonos (`owner`) tulajdonában lévő részvényeket (`shares`) eszközökre (`assets`) cserélte. A `receiver` az a felhasználó, aki a visszavont eszközöket (`assets`) megkapta.

## További olvasnivaló {#further-reading}

- [ERC-4626: Tokenizált értékmegőrzőre vonatkozó szabvány](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub mappa](https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol)
