---
title: Kiwango cha Vault ya Tokeni cha ERC-4626
description: Kiwango cha vault zinazozalisha faida.
lang: sw
---

## Utangulizi {#introduction}

ERC-4626 ni kiwango cha kuboresha na kuunganisha vigezo vya kiufundi vya vault zinazozalisha faida. Inatoa API ya kawaida kwa vault za tokeni zinazozalisha faida ambazo zinawakilisha hisa za tokeni moja ya msingi ya ERC-20. ERC-4626 pia inaelezea kiendelezi cha hiari kwa vault za tokeni zinazotumia ERC-20, ikitoa utendakazi wa msingi wa kuweka, kutoa tokeni na kusoma salio.

**Jukumu la ERC-4626 katika vault zinazozalisha faida**

Masoko ya kukopesha, vikusanyaji, na tokeni zenye riba asilia husaidia watumiaji kupata faida bora kwenye tokeni zao za crypto kwa kutekeleza mikakati tofauti. Mikakati hii inafanywa kwa tofauti kidogo, ambayo inaweza kuwa rahisi kukosea au kupoteza rasilimali za maendeleo.

ERC-4626 katika vault zinazozalisha faida itapunguza juhudi za ujumuishaji na kufungua ufikiaji wa faida katika programu mbalimbali kwa juhudi ndogo maalum kutoka kwa wasanidi programu kwa kuunda mifumo ya utekelezaji thabiti na imara zaidi.

Tokeni ya ERC-4626 imeelezewa kikamilifu katika [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Kiendelezi cha vault kisichosawazishwa (ERC-7540)**

ERC-4626 imeboreshwa kwa uwekaji na ukombozi wa atomiki hadi kufikia kikomo. Ikiwa kikomo kimefikiwa, hakuna uwekaji au ukombozi mpya unaoweza kuwasilishwa. Kikomo hiki hakifanyi kazi vizuri kwa mfumo wowote wa mkataba-erevu wenye vitendo visivyosawazishwa au ucheleweshaji kama sharti la awali la kuingiliana na Vault (k.m., itifaki za mali za ulimwengu halisi, itifaki za ukopeshaji zisizo na dhamana ya kutosha, itifaki za ukopeshaji za mnyororo-tofauti, tokeni za liquid staking, au moduli za usalama wa bima).

ERC-7540 hupanua matumizi ya Vault za ERC-4626 kwa matumizi yasiyosawazishwa. Kiolesura kilichopo cha Vault (`deposit`/`withdraw`/`mint`/`redeem`) kinatumika kikamilifu kudai Maombi yasiyosawazishwa.

Kiendelezi cha ERC-7540 kimeelezewa kikamilifu katika [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Kiendelezi cha vault ya mali nyingi (ERC-7575)**

Kisa kimoja cha matumizi kinachokosekana ambacho hakitumiki na ERC-4626 ni Vault ambazo zina mali nyingi au sehemu za kuingilia kama vile Tokeni za mtoaji ukwasi (LP). Hizi kwa ujumla ni ngumu kutumia au hazikidhi matakwa kwa sababu ya hitaji la ERC-4626 lenyewe kuwa ERC-20.

ERC-7575 inaongeza usaidizi kwa Vault zenye mali nyingi kwa kutoa nje utekelezaji wa tokeni ya ERC-20 kutoka kwa utekelezaji wa ERC-4626.

Kiendelezi cha ERC-7575 kimeelezewa kikamilifu katika [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza kuhusu [viwango vya tokeni](/developers/docs/standards/tokens/) na [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Kazi na Vipengele vya ERC-4626: {#body}

### Mbinu {#methods}

#### mali {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Kazi hii inarudisha anwani ya tokeni ya msingi inayotumika kwa vault kwa uhasibu, kuweka na kutoa.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Kazi hii inarudisha jumla ya mali ya msingi inayoshikiliwa na vault.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inarudisha kiasi cha `hisa` kitakachobadilishwa na vault kwa kiasi cha `mali` kilichotolewa.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inarudisha kiasi cha `mali` kitakachobadilishwa na vault kwa kiasi cha `hisa` kilichotolewa.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Kazi hii inarudisha kiasi cha juu zaidi cha mali ya msingi kinachoweza kuwekwa katika wito mmoja wa [`deposit`](#deposit), pamoja na hisa zilizotengenezwa kwa ajili ya `mpokeaji`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inaruhusu watumiaji kuiga athari za uwekaji wao katika bloku ya sasa.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Kazi hii huweka `mali` ya tokeni za msingi ndani ya vault na inatoa umiliki wa `hisa` kwa `mpokeaji`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Kazi hii inarudisha kiasi cha juu zaidi cha hisa kinachoweza kutengenezwa katika wito mmoja wa [`mint`](#mint), pamoja na hisa zilizotengenezwa kwa ajili ya `mpokeaji`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inaruhusu watumiaji kuiga athari za utengenezaji wao katika bloku ya sasa.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Kazi hii hutengeneza hasa hisa `hisa` za vault kwa `mpokeaji` kwa kuweka `mali` ya tokeni za msingi.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Kazi hii inarudisha kiasi cha juu zaidi cha mali ya msingi kinachoweza kutolewa kutoka kwa salio la `mmiliki` kwa wito mmoja wa [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inaruhusu watumiaji kuiga athari za utoaji wao katika bloku ya sasa.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Kazi hii huchoma `hisa` kutoka kwa `mmiliki` na kutuma hasa tokeni za `mali` kutoka kwa vault kwenda kwa `mpokeaji`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Kazi hii inarudisha kiasi cha juu zaidi cha hisa zinazoweza kukombolewa kutoka kwa salio la `mmiliki` kupitia wito wa [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inaruhusu watumiaji kuiga athari za ukombozi wao katika bloku ya sasa.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Kazi hii hukomboa idadi maalum ya `hisa` kutoka kwa `mmiliki` na kutuma `mali` ya tokeni ya msingi kutoka kwa vault kwenda kwa `mpokeaji`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Inarudisha jumla ya idadi ya hisa za vault ambazo hazijakombolewa katika mzunguko.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Inarudisha jumla ya hisa za vault ambazo `mmiliki` anazo kwa sasa.

### Ramani ya kiolesura {#mapOfTheInterface}

![Ramani ya kiolesura cha ERC-4626](./map-of-erc-4626.png)

### Matukio {#events}

#### Tukio la Kuweka

**LAZIMA** itolewe wakati tokeni zinawekwa ndani ya vault kupitia njia za [`mint`](#mint) na [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Ambapo `mtumaji` ni mtumiaji ambaye alibadilisha `mali` kwa `hisa`, na akahamisha `hisa` hizo kwa `mmiliki`.

#### Tukio la Kutoa

**LAZIMA** itolewe wakati hisa zinatolewa kutoka kwa vault na mwekaji katika njia za [`redeem`](#redeem) au [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Ambapo `mtumaji` ni mtumiaji aliyeanzisha utoaji na akabadilisha `hisa`, zinazomilikiwa na `mmiliki`, kwa `mali`. `mpokeaji` ni mtumiaji aliyepokea `mali` zilizotolewa.

## Masomo zaidi {#further-reading}

- [EIP-4626: Kiwango cha Vault ya Tokeni](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repo ya GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
